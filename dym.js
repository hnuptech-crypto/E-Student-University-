/* =====================================================================
   CHUNK « dym » — registre DYM_CHAPTERS / DYM_NOVA_KB
   Matière(s) : Chimie|Dynamique moléculaire
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   DYM_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — DYNAMIQUE MOLÉCULAIRE (L3 Chimie Fondamentale)
   6 chapitres : principe de la simulation de dynamique moléculaire, champs de force,
   intégration numérique des équations du mouvement, contrôle de la température et de
   la pression, calcul de grandeurs thermodynamiques et structurales, applications et
   limites. S'appuie sur la mécanique analytique et la physique statistique déjà rédigées.
   ===================================================================================== */
const DYM_MATIERE = 'Dynamique moléculaire';
function dymKey(chapterTitle){ return `Chimie|${DYM_MATIERE}|${chapterTitle}`; }
const DYM_CHAPTERS = {};
const DYM_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
DYM_CHAPTERS[dymKey("Principe de la simulation de dynamique moléculaire")] = {
  objectives: [
    "Comprendre l'idée générale de la simulation de dynamique moléculaire",
    "Situer la dynamique moléculaire par rapport à la chimie numérique quantique",
    "Présenter l'hypothèse ergodique et son rôle central",
    "Identifier les grandeurs accessibles par une simulation de DM"
  ],
  prereqs: ["Chimie numérique", "Équations de Lagrange et applications (Mécanique analytique)", "Ensemble microcanonique et entropie statistique de Boltzmann (Physique statistique)"],
  bodyHtml: `
    <p>La chimie numérique (déjà rédigée dans ce domaine) calcule des énergies et des propriétés pour une géométrie moléculaire <strong>figée</strong>. La <strong>dynamique moléculaire</strong> (DM) fait le pas suivant : elle simule directement le <strong>mouvement</strong> classique des atomes au cours du temps, permettant d'étudier des phénomènes intrinsèquement dynamiques et statistiques — diffusion, changements conformationnels, transitions de phase — inaccessibles à un simple calcul d'énergie ponctuel.</p>

    <h3>1. L'idée générale</h3>
    <p>Le principe de la DM est d'une simplicité trompeuse : on résout numériquement les équations de Newton (ou, de façon équivalente, les équations de Lagrange, mécanique analytique) pour <strong>tous</strong> les atomes du système simultanément, sous l'effet des forces dérivées d'un potentiel d'interaction $U(\\vec r_1,\\ldots,\\vec r_N)$ :</p>
    <div class="formula-box">$$m_i\\,\\frac{d^2\\vec r_i}{dt^2} = -\\vec\\nabla_i U(\\vec r_1,\\ldots,\\vec r_N)$$</div>
    <p>En intégrant ces équations pas à pas dans le temps (chapitre 3), on obtient une <strong>trajectoire</strong> complète du système — les positions et vitesses de tous les atomes à chaque instant.</p>

    <h3>2. DM classique vs chimie quantique</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — une approximation délibérée</span>
      La DM classique traite les <strong>noyaux</strong> comme des particules classiques (Newton), abandonnant la description quantique détaillée des chapitres précédents. En contrepartie de cette approximation (justifiée pour la plupart des noyaux à température ambiante, sauf cas particuliers comme l'hydrogène), elle permet de simuler des systèmes de milliers, voire de millions d'atomes, sur des temps physiques bien plus longs qu'un calcul quantique — un compromis coût/taille de système à l'opposé de celui de la chimie numérique quantique (chapitre 1 de chimie numérique).
    </div>

    <h3>3. L'hypothèse ergodique</h3>
    <p>Une simulation de DM produit une <strong>trajectoire temporelle unique</strong> — mais la physique statistique (déjà rédigée côté Physique) définit les grandeurs thermodynamiques comme des <strong>moyennes d'ensemble</strong> sur tous les microétats accessibles. Le lien entre ces deux points de vue repose sur l'<strong>hypothèse ergodique</strong> :</p>
    <div class="key-point">
      <span class="eyebrow">Hypothèse ergodique</span>
      Pour un système à l'équilibre, la moyenne d'une grandeur physique sur une trajectoire temporelle suffisamment longue est égale à sa moyenne d'ensemble (statistique) sur tous les microétats accessibles à l'équilibre. Cette hypothèse — non démontrée en toute généralité, mais vérifiée dans d'innombrables cas pratiques — est ce qui justifie de calculer des grandeurs thermodynamiques à partir d'une seule trajectoire de simulation.
    </div>

    <h3>4. Grandeurs accessibles</h3>
    <p>Une simulation de DM donne accès directement aux positions et vitesses instantanées de chaque atome, dont on extrait (chapitres 5) des grandeurs structurales (distances, angles, fonctions de distribution radiale) et, via l'hypothèse ergodique, des grandeurs thermodynamiques moyennes (température, pression, énergie) ainsi que des propriétés <strong>dynamiques</strong> (coefficients de diffusion, temps de relaxation) totalement inaccessibles à un calcul de chimie quantique statique.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi ne peut-on pas calculer un coefficient de diffusion par un simple calcul de chimie quantique statique (optimisation de géométrie, chapitre 5 de chimie numérique) ?</p>
      <p><strong>Solution :</strong> le coefficient de diffusion caractérise le mouvement des particules <em>au cours du temps</em> — une grandeur intrinsèquement dynamique. Un calcul statique ne donne qu'une géométrie figée, sans aucune information temporelle.</p>
      <p class="example-answer">Seule une simulation qui suit explicitement le mouvement dans le temps (comme la DM) peut donner accès à une telle grandeur — c'est précisément ce que la DM apporte par rapport à la chimie quantique statique.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>La DM intègre numériquement les équations de Newton pour tous les atomes, sous l'effet d'un potentiel $U$</li>
      <li>Approximation classique des noyaux : permet de grands systèmes et de longs temps, au prix de la description quantique détaillée</li>
      <li>Hypothèse ergodique : moyenne temporelle = moyenne d'ensemble à l'équilibre, justifiant le calcul de grandeurs thermodynamiques</li>
      <li>La DM donne accès à des grandeurs dynamiques (diffusion) inaccessibles à un calcul statique</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que la DM traite les électrons explicitement : elle traite les noyaux classiquement, le potentiel $U$ résumant les effets électroniques</li>
      <li>Oublier que l'hypothèse ergodique nécessite une trajectoire suffisamment longue pour être valide</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La dynamique moléculaire traite les noyaux comme des particules :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym1e1" value="right">classiques (équations de Newton)</label>
          <label class="option"><input type="radio" name="dym1e1" value="wrong">purement quantiques</label>
          <label class="option"><input type="radio" name="dym1e1" value="wrong">immobiles</label>
          <label class="option"><input type="radio" name="dym1e1" value="wrong">sans masse</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym1e1','dym1fb1','Correct — c\\'est l\\'approximation classique qui permet de simuler de grands systèmes.','Relis le point clé du cours sur DM classique vs chimie quantique.')">Vérifier</button>
        <div class="feedback" id="dym1fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">L'hypothèse ergodique énonce que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym1e2" value="right">moyenne temporelle = moyenne d'ensemble à l'équilibre</label>
          <label class="option"><input type="radio" name="dym1e2" value="wrong">le système ne bouge jamais</label>
          <label class="option"><input type="radio" name="dym1e2" value="wrong">l'énergie n'est pas conservée</label>
          <label class="option"><input type="radio" name="dym1e2" value="wrong">la température est toujours nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym1e2','dym1fb2','Correct — c\\'est ce qui relie une simulation temporelle unique aux moyennes statistiques.','Relis l\\'encadré sur l\\'hypothèse ergodique.')">Vérifier</button>
        <div class="feedback" id="dym1fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Un coefficient de diffusion ne peut être calculé que par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym1e3" value="wrong">une optimisation de géométrie statique</label>
          <label class="option"><input type="radio" name="dym1e3" value="right">une simulation suivant le mouvement dans le temps</label>
          <label class="option"><input type="radio" name="dym1e3" value="wrong">un calcul de fréquences seul</label>
          <label class="option"><input type="radio" name="dym1e3" value="wrong">une mesure de couleur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym1e3','dym1fb3','Correct — exactement l\\'explication de l\\'exemple corrigé du cours.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="dym1fb3"></div>
      </div>
    </div>
  `
};
DYM_NOVA_KB[dymKey("Principe de la simulation de dynamique moléculaire")] = {
  intro: "Salut, moi c'est Nova ! On démarre la dynamique moléculaire : principe, ergodicité, grandeurs accessibles. Demande-moi une explication ou un indice.",
  rules: [
    { test:/ergodique|ergodicit[ée]/i, replies:["L'hypothèse ergodique : moyenne temporelle d'une trajectoire = moyenne d'ensemble statistique à l'équilibre — c'est ce qui justifie de calculer des grandeurs thermodynamiques à partir d'une simulation."]},
    { test:/dm classique|noyaux classiques/i, replies:["La DM traite les noyaux comme des particules classiques (Newton), permettant de simuler de grands systèmes sur de longs temps — au prix d'abandonner la description quantique détaillée."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le point clé sur DM vs chimie quantique.","Ce sont des équations bien connues.","Classiques (Newton)."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis l'encadré sur l'hypothèse ergodique.","Deux types de moyennes sont égalisées.","Moyenne temporelle = moyenne d'ensemble."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense à ce qui suit le mouvement dans le temps.","Une simulation dynamique."]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
DYM_CHAPTERS[dymKey("Champs de force et potentiels d'interaction")] = {
  objectives: [
    "Décrire la structure générale d'un champ de force classique",
    "Distinguer termes liés (liaisons, angles, torsions) et non liés (van der Waals, électrostatique)",
    "Présenter le potentiel de Lennard-Jones",
    "Comprendre les enjeux de la paramétrisation d'un champ de force"
  ],
  prereqs: ["Principe de la simulation de dynamique moléculaire"],
  bodyHtml: `
    <p>Le chapitre 1 a introduit le potentiel $U(\\vec r_1,\\ldots,\\vec r_N)$ sans en préciser la forme. Ce chapitre décrit le <strong>champ de force</strong> — l'expression fonctionnelle approchée de $U$, calibrée pour reproduire au mieux les propriétés du système sans recourir à un calcul quantique explicite à chaque pas de temps (bien trop coûteux pour la DM classique).</p>

    <h3>1. Structure générale d'un champ de force</h3>
    <p>Un champ de force classique standard s'écrit comme une somme de contributions physiquement interprétables :</p>
    <div class="formula-box">$$U = \\underbrace{\\sum_{\\text{liaisons}} k_b(r-r_0)^2 + \\sum_{\\text{angles}} k_\\theta(\\theta-\\theta_0)^2 + \\sum_{\\text{torsions}} V_n[1+\\cos(n\\phi-\\gamma)]}_{\\text{termes liés}} + \\underbrace{\\sum_{i<j}\\left[U_{LJ}(r_{ij}) + \\frac{q_iq_j}{4\\pi\\varepsilon_0 r_{ij}}\\right]}_{\\text{termes non liés}}$$</div>
    <table class="mini-table">
      <tr><th>Terme</th><th>Origine physique</th></tr>
      <tr><td>Liaisons, angles</td><td>oscillateurs harmoniques (mécanique analytique, petites oscillations) autour de la géométrie d'équilibre</td></tr>
      <tr><td>Torsions</td><td>barrières de rotation autour des liaisons simples</td></tr>
      <tr><td>Van der Waals</td><td>attraction à longue distance + répulsion à courte distance entre atomes non liés</td></tr>
      <tr><td>Électrostatique</td><td>interaction coulombienne entre charges partielles atomiques</td></tr>
    </table>

    <h3>2. Le potentiel de Lennard-Jones</h3>
    <p>L'interaction de van der Waals est le plus souvent modélisée par le <strong>potentiel de Lennard-Jones</strong> :</p>
    <div class="formula-box">$$U_{LJ}(r) = 4\\varepsilon\\left[\\left(\\frac{\\sigma}{r}\\right)^{12} - \\left(\\frac{\\sigma}{r}\\right)^6\\right]$$</div>
    <p>Le terme en $r^{-12}$ (répulsif, à courte distance) modélise le principe d'exclusion de Pauli entre nuages électroniques qui se recouvrent (physique statistique, mécanique quantique) ; le terme en $r^{-6}$ (attractif) représente les forces de dispersion de London. $\\varepsilon$ est la profondeur du puits de potentiel, $\\sigma$ la distance où $U_{LJ}=0$.</p>

    <h3>3. Paramétrisation</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — la difficulté centrale des champs de force</span>
      Les paramètres ($k_b,r_0,\\varepsilon,\\sigma,q_i$...) doivent être <strong>ajustés</strong> pour chaque type d'atome et de liaison, soit à partir de calculs de chimie quantique de référence (chapitre 2 de chimie numérique), soit à partir de données expérimentales (structures cristallographiques, spectres de vibration, propriétés thermodynamiques). Un champ de force n'est jamais universel : sa fiabilité se limite en général au type de système pour lequel il a été paramétré et validé (protéines, polymères, liquides moléculaires...).
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi le terme répulsif du potentiel de Lennard-Jones varie-t-il en $r^{-12}$ plutôt qu'une autre puissance élevée ?</p>
      <p><strong>Solution :</strong> physiquement, seule la forme générale (répulsion très raide à courte distance) compte ; l'exposant 12 est un choix <strong>pragmatique</strong>, pas une nécessité physique fondamentale.</p>
      <p class="example-answer">Utiliser $r^{-12}=(r^{-6})^2$ permet un calcul numérique légèrement plus rapide (réutilisation du terme $r^{-6}$ déjà calculé), un avantage purement computationnel qui explique ce choix historique, plutôt qu'une dérivation physique rigoureuse.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Un champ de force combine termes liés (liaisons, angles, torsions) et non liés (van der Waals, électrostatique)</li>
      <li>Potentiel de Lennard-Jones : $U_{LJ}=4\\varepsilon[(\\sigma/r)^{12}-(\\sigma/r)^6]$, répulsion Pauli + attraction de dispersion</li>
      <li>La paramétrisation d'un champ de force limite son domaine de validité au type de système pour lequel il a été calibré</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire qu'un champ de force est universel : il n'est fiable que pour les systèmes proches de ceux utilisés pour sa paramétrisation</li>
      <li>Confondre les termes liés (topologie fixe, liaisons chimiques) et non liés (paires d'atomes quelconques, recalculés à chaque pas)</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le terme en $r^{-6}$ du potentiel de Lennard-Jones représente :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym2e1" value="wrong">la répulsion de Pauli</label>
          <label class="option"><input type="radio" name="dym2e1" value="right">l'attraction de dispersion de London</label>
          <label class="option"><input type="radio" name="dym2e1" value="wrong">l'interaction électrostatique</label>
          <label class="option"><input type="radio" name="dym2e1" value="wrong">une liaison covalente</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym2e1','dym2fb1','Correct — le terme attractif en r⁻⁶ modélise les forces de dispersion de London.','Relis la section du cours sur le potentiel de Lennard-Jones.')">Vérifier</button>
        <div class="feedback" id="dym2fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Les paramètres d'un champ de force sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym2e2" value="right">ajustés à partir de calculs quantiques ou de données expérimentales</label>
          <label class="option"><input type="radio" name="dym2e2" value="wrong">universels pour tout système</label>
          <label class="option"><input type="radio" name="dym2e2" value="wrong">toujours nuls</label>
          <label class="option"><input type="radio" name="dym2e2" value="wrong">choisis au hasard</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym2e2','dym2fb2','Correct — c\\'est exactement le point clé sur la paramétrisation des champs de force.','Relis le point clé du cours sur la paramétrisation.')">Vérifier</button>
        <div class="feedback" id="dym2fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">L'exposant 12 du terme répulsif de Lennard-Jones est choisi principalement pour :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym2e3" value="right">des raisons de commodité de calcul numérique</label>
          <label class="option"><input type="radio" name="dym2e3" value="wrong">une dérivation physique exacte et unique</label>
          <label class="option"><input type="radio" name="dym2e3" value="wrong">respecter une loi de conservation</label>
          <label class="option"><input type="radio" name="dym2e3" value="wrong">éviter tout calcul numérique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym2e3','dym2fb3','Correct — exactement l\\'explication de l\\'exemple corrigé du cours.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="dym2fb3"></div>
      </div>
    </div>
  `
};
DYM_NOVA_KB[dymKey("Champs de force et potentiels d'interaction")] = {
  intro: "Salut, c'est Nova ! On étudie les champs de force et le potentiel de Lennard-Jones. Demande-moi une explication ou un indice.",
  rules: [
    { test:/lennard.?jones/i, replies:["Le potentiel de Lennard-Jones ULJ=4ε[(σ/r)¹²−(σ/r)⁶] combine répulsion de Pauli (r⁻¹²) et attraction de dispersion (r⁻⁶)."]},
    { test:/champ de force/i, replies:["Un champ de force combine termes liés (liaisons, angles, torsions, harmoniques) et non liés (van der Waals, électrostatique) — sa fiabilité dépend de sa paramétrisation."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la section sur Lennard-Jones.","C'est le terme attractif.","L'attraction de dispersion de London."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé sur la paramétrisation.","Ce n'est jamais universel.","Ajustés à partir de calculs ou d'expériences."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense au calcul numérique.","Commodité de calcul."]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
DYM_CHAPTERS[dymKey("Intégration numérique des équations du mouvement")] = {
  objectives: [
    "Comprendre pourquoi une intégration numérique discrète est nécessaire",
    "Présenter l'algorithme de Verlet et sa version « vitesse »",
    "Justifier le choix du pas de temps en fonction des vibrations les plus rapides",
    "Identifier les propriétés de conservation recherchées d'un bon intégrateur"
  ],
  prereqs: ["Champs de force et potentiels d'interaction"],
  bodyHtml: `
    <p>Une fois le champ de force défini (chapitre 2), il faut résoudre numériquement les équations de Newton pour des milliers d'atomes couplés — un problème sans solution analytique. Ce chapitre présente l'algorithme le plus utilisé pour cette intégration : le schéma de <strong>Verlet</strong>.</p>

    <h3>1. Discrétisation du temps</h3>
    <p>On découpe le temps en pas discrets $\\Delta t$, et l'on cherche à calculer les positions $\\vec r_i(t+\\Delta t)$ à partir de l'état au temps $t$ (et éventuellement $t-\\Delta t$). Un développement de Taylor de $\\vec r(t\\pm\\Delta t)$ à l'ordre 2 en $\\Delta t$ (méthode déjà rencontrée pour la limite continue de la chaîne d'oscillateurs, ondes et vibrations chapitre 1) est à la base de l'algorithme.</p>

    <h3>2. L'algorithme de Verlet</h3>
    <p>En sommant les développements de Taylor de $\\vec r(t+\\Delta t)$ et $\\vec r(t-\\Delta t)$, les termes impairs en $\\Delta t$ (dont la vitesse) s'éliminent, donnant l'algorithme de <strong>Verlet</strong> :</p>
    <div class="formula-box">$$\\vec r_i(t+\\Delta t) = 2\\vec r_i(t) - \\vec r_i(t-\\Delta t) + \\frac{\\vec F_i(t)}{m_i}\\,\\Delta t^2$$</div>
    <p>Cet algorithme ne nécessite pas de connaître explicitement la vitesse pour avancer d'un pas — un avantage numérique, bien que sa formulation « vitesse de Verlet » (mathématiquement équivalente, mais donnant directement accès aux vitesses à chaque pas, utiles pour la température) soit plus couramment implémentée en pratique.</p>

    <h3>3. Choix du pas de temps</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — la contrainte du pas de temps</span>
      Le pas de temps $\\Delta t$ doit être suffisamment petit pour résoudre correctement le mouvement de vibration <strong>le plus rapide</strong> du système (typiquement l'étirement d'une liaison C-H, de fréquence $\\sim10^{14}\\,\\text{Hz}$) : en pratique, $\\Delta t \\sim 1\\,\\text{fs}$ ($10^{-15}\\,\\text{s}$), soit une fraction de la période de cette vibration la plus rapide. Un pas trop grand rend la simulation instable numériquement (l'énergie totale « explose »).
    </div>
    <p>Une technique fréquente pour autoriser un pas de temps plus grand consiste à <strong>contraindre</strong> les liaisons impliquant l'hydrogène (algorithme SHAKE ou apparentés) — les figer à leur longueur d'équilibre plutôt que de les laisser vibrer librement, éliminant ainsi le mode de vibration le plus rapide et permettant typiquement de doubler le pas de temps.</p>

    <h3>4. Propriétés de conservation</h3>
    <p>Un bon intégrateur, appliqué à un système isolé (ensemble microcanonique, physique statistique chapitre 2), doit conserver l'<strong>énergie totale</strong> sur de longues durées de simulation — une dérive systématique de l'énergie signale un pas de temps trop grand ou une erreur numérique. L'algorithme de Verlet est particulièrement apprécié pour sa bonne conservation de l'énergie à long terme, une conséquence de sa structure symplectique (propriété mathématique hors du cadre de ce cours).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi contraindre les liaisons C-H (algorithme SHAKE) permet-il d'augmenter le pas de temps de simulation ?</p>
      <p><strong>Solution :</strong> les liaisons impliquant l'hydrogène (masse très faible) vibrent aux fréquences les plus élevées du système, imposant la contrainte la plus sévère sur $\\Delta t$ (chapitre 3).</p>
      <p class="example-answer">En figeant ces liaisons à leur longueur d'équilibre, on élimine ce mode de vibration le plus rapide, ce qui permet, sans instabilité, d'augmenter $\\Delta t$ typiquement de $1$ à $2\\,\\text{fs}$ — doublant ainsi la durée physique simulable pour un même coût de calcul.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Algorithme de Verlet : $\\vec r(t+\\Delta t)=2\\vec r(t)-\\vec r(t-\\Delta t)+(\\vec F/m)\\Delta t^2$</li>
      <li>Le pas de temps doit résoudre la vibration la plus rapide du système ($\\Delta t\\sim1\\,\\text{fs}$ typiquement)</li>
      <li>Contraindre les liaisons C-H (SHAKE) permet de doubler le pas de temps</li>
      <li>Un bon intégrateur conserve l'énergie totale sur de longues simulations</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Choisir un pas de temps trop grand : la simulation devient numériquement instable</li>
      <li>Oublier de vérifier la conservation de l'énergie comme test de validité d'une simulation</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le pas de temps typique d'une simulation de DM est de l'ordre de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym3e1" value="right">1 femtoseconde</label>
          <label class="option"><input type="radio" name="dym3e1" value="wrong">1 seconde</label>
          <label class="option"><input type="radio" name="dym3e1" value="wrong">1 microseconde</label>
          <label class="option"><input type="radio" name="dym3e1" value="wrong">1 nanoseconde</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym3e1','dym3fb1','Correct — ~1 fs, imposé par la vibration la plus rapide du système (liaisons C-H).','Relis le point clé du cours sur le choix du pas de temps.')">Vérifier</button>
        <div class="feedback" id="dym3fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Contraindre les liaisons C-H (SHAKE) permet de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym3e2" value="right">augmenter le pas de temps sans instabilité</label>
          <label class="option"><input type="radio" name="dym3e2" value="wrong">diminuer la précision du champ de force</label>
          <label class="option"><input type="radio" name="dym3e2" value="wrong">supprimer tous les atomes d'hydrogène</label>
          <label class="option"><input type="radio" name="dym3e2" value="wrong">ralentir considérablement le calcul</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym3e2','dym3fb2','Correct — exactement l\\'explication de l\\'exemple corrigé du cours.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="dym3fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Un bon test de validité d'une simulation de DM (système isolé) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym3e3" value="right">la conservation de l'énergie totale sur la durée de simulation</label>
          <label class="option"><input type="radio" name="dym3e3" value="wrong">la couleur affichée à l'écran</label>
          <label class="option"><input type="radio" name="dym3e3" value="wrong">le nom du fichier de sortie</label>
          <label class="option"><input type="radio" name="dym3e3" value="wrong">la vitesse du processeur utilisé</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym3e3','dym3fb3','Correct — une dérive de l\\'énergie signale un pas de temps trop grand ou une erreur numérique.','Relis la section du cours sur les propriétés de conservation.')">Vérifier</button>
        <div class="feedback" id="dym3fb3"></div>
      </div>
    </div>
  `
};
DYM_NOVA_KB[dymKey("Intégration numérique des équations du mouvement")] = {
  intro: "Salut, moi c'est Nova ! On étudie l'algorithme de Verlet et le choix du pas de temps. Demande-moi une explication ou un indice.",
  rules: [
    { test:/verlet/i, replies:["L'algorithme de Verlet, r(t+Δt)=2r(t)−r(t−Δt)+(F/m)Δt², intègre les équations de Newton avec une bonne conservation de l'énergie à long terme."]},
    { test:/pas de temps|Δt/i, replies:["Le pas de temps (~1 fs) est limité par la vibration la plus rapide du système (liaisons C-H). Contraindre ces liaisons (SHAKE) permet de doubler Δt."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le point clé sur le pas de temps.","C'est une échelle très courte.","1 femtoseconde."]},
    { test:/exercice\s*2/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense au mode de vibration éliminé.","Augmenter le pas de temps sans instabilité."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis la section sur les propriétés de conservation.","C'est une grandeur physique fondamentale.","La conservation de l'énergie totale."]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
DYM_CHAPTERS[dymKey("Contrôle de la température et de la pression : thermostats et barostats")] = {
  objectives: [
    "Comprendre pourquoi l'ensemble microcanonique naturel de la DM n'est pas toujours souhaité",
    "Présenter le principe d'un thermostat (couplage faible, Nosé-Hoover)",
    "Présenter le principe d'un barostat pour contrôler la pression",
    "Relier température instantanée et énergie cinétique via l'équipartition"
  ],
  prereqs: ["Intégration numérique des équations du mouvement", "Distribution de Boltzmann et gaz parfait classique (Physique statistique)"],
  bodyHtml: `
    <p>En intégrant simplement les équations de Newton (chapitre 3) pour un système isolé, on simule naturellement l'<strong>ensemble microcanonique</strong> (physique statistique, chapitre 2) : énergie, volume et nombre de particules fixés. Mais la plupart des expériences réelles se déroulent à <strong>température</strong> et/ou <strong>pression</strong> contrôlées — ce chapitre présente les méthodes pour simuler ces conditions plus réalistes.</p>

    <h3>1. Température instantanée et équipartition</h3>
    <p>D'après le théorème d'équipartition (physique statistique, chapitre 4), l'énergie cinétique moyenne d'un système à $N$ atomes (donc $3N$ degrés de liberté de translation, moins les contraintes éventuelles) est reliée à la température :</p>
    <div class="formula-box">$$\\left\\langle \\sum_i \\frac12 m_iv_i^2 \\right\\rangle = \\frac{3N-N_c}{2}k_BT$$</div>
    <p>où $N_c$ est le nombre de contraintes (par exemple les liaisons figées par SHAKE, chapitre 3). Cette relation permet de définir une <strong>température instantanée</strong> à chaque pas de simulation, à partir des vitesses calculées.</p>

    <h3>2. Thermostats</h3>
    <p>Un <strong>thermostat</strong> modifie l'algorithme d'intégration pour maintenir la température moyenne autour d'une valeur cible $T_0$, simulant le couplage à un réservoir thermique externe (thermodynamique macroscopique, notion de thermostat déjà rencontrée).</p>
    <table class="mini-table">
      <tr><th>Thermostat</th><th>Principe</th></tr>
      <tr><td>Couplage faible (Berendsen)</td><td>rééchelonne les vitesses à chaque pas pour ramener progressivement $T$ vers $T_0$ ; simple mais ne génère pas rigoureusement l'ensemble canonique statistique</td></tr>
      <tr><td>Nosé-Hoover</td><td>introduit une variable dynamique supplémentaire couplée au système, dérivée d'un formalisme lagrangien étendu (mécanique analytique) ; génère rigoureusement l'ensemble canonique</td></tr>
    </table>

    <h3>3. Barostats</h3>
    <p>De façon analogue, un <strong>barostat</strong> ajuste le volume de la boîte de simulation pour maintenir la pression moyenne autour d'une valeur cible $P_0$ — indispensable pour simuler des conditions expérimentales usuelles (pression atmosphérique). La pression instantanée se calcule à partir du théorème du viriel, une relation reliant pression, énergie cinétique et forces intermoléculaires (analogue statistique de l'équation d'état, thermodynamique macroscopique).</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — quel ensemble statistique simuler ?</span>
      Le choix du thermostat/barostat détermine quel <strong>ensemble statistique</strong> (physique statistique, chapitres 2-3) est effectivement échantillonné : NVE (microcanonique, aucun contrôle), NVT (canonique, thermostat seul), NPT (isotherme-isobare, thermostat + barostat) — ce dernier étant le plus proche des conditions expérimentales usuelles de laboratoire.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi le thermostat de Berendsen, bien que simple et efficace pour amener rapidement un système à la température désirée, n'est-il pas recommandé pour produire les configurations finales d'une simulation de production ?</p>
      <p><strong>Solution :</strong> le rééchelonnement systématique des vitesses supprime artificiellement les fluctuations naturelles de l'énergie cinétique, qui sont pourtant caractéristiques de l'ensemble canonique statistique (physique statistique, chapitre 3).</p>
      <p class="example-answer">Cette suppression fausse les propriétés statistiques fines du système (fluctuations d'énergie, capacité thermique calculée) — d'où la préférence pour un thermostat rigoureux (Nosé-Hoover) lors de la phase de production, en réservant Berendsen à la phase d'équilibration initiale, moins critique.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Sans contrôle, la DM simule naturellement l'ensemble microcanonique (NVE)</li>
      <li>Un thermostat (Berendsen simple, Nosé-Hoover rigoureux) maintient $T$ autour d'une cible</li>
      <li>Un barostat maintient $P$ autour d'une cible, via le théorème du viriel</li>
      <li>NVT (thermostat), NPT (thermostat+barostat) : NPT est le plus proche des conditions expérimentales usuelles</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Utiliser Berendsen pour une phase de production nécessitant des fluctuations statistiquement correctes : préférer Nosé-Hoover</li>
      <li>Oublier de soustraire le nombre de contraintes $N_c$ (liaisons figées) dans le calcul de la température instantanée</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Sans thermostat ni barostat, une simulation de DM échantillonne naturellement l'ensemble :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym4e1" value="right">microcanonique (NVE)</label>
          <label class="option"><input type="radio" name="dym4e1" value="wrong">canonique (NVT)</label>
          <label class="option"><input type="radio" name="dym4e1" value="wrong">grand canonique</label>
          <label class="option"><input type="radio" name="dym4e1" value="wrong">isotherme-isobare (NPT)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym4e1','dym4fb1','Correct — énergie, volume, nombre de particules fixés : c\\'est l\\'ensemble microcanonique naturel de la DM.','Relis l\\'introduction du cours.')">Vérifier</button>
        <div class="feedback" id="dym4fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Le thermostat de Nosé-Hoover, contrairement à Berendsen :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym4e2" value="right">génère rigoureusement l'ensemble canonique statistique</label>
          <label class="option"><input type="radio" name="dym4e2" value="wrong">ne fonctionne jamais</label>
          <label class="option"><input type="radio" name="dym4e2" value="wrong">supprime toute fluctuation d'énergie</label>
          <label class="option"><input type="radio" name="dym4e2" value="wrong">contrôle uniquement la pression</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym4e2','dym4fb2','Correct — c\\'est l\\'avantage de Nosé-Hoover pour une simulation de production rigoureuse.','Relis le tableau du cours sur les thermostats.')">Vérifier</button>
        <div class="feedback" id="dym4fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour simuler les conditions expérimentales usuelles de laboratoire, on utilise le plus souvent l'ensemble :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym4e3" value="right">NPT (isotherme-isobare)</label>
          <label class="option"><input type="radio" name="dym4e3" value="wrong">NVE (microcanonique)</label>
          <label class="option"><input type="radio" name="dym4e3" value="wrong">grand canonique uniquement</label>
          <label class="option"><input type="radio" name="dym4e3" value="wrong">aucun de ces ensembles</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym4e3','dym4fb3','Correct — NPT (thermostat+barostat) est le plus proche des conditions d\\'un laboratoire (T et P contrôlées).','Relis le point clé du cours sur le choix de l\\'ensemble statistique.')">Vérifier</button>
        <div class="feedback" id="dym4fb3"></div>
      </div>
    </div>
  `
};
DYM_NOVA_KB[dymKey("Contrôle de la température et de la pression : thermostats et barostats")] = {
  intro: "Salut, c'est Nova ! On étudie les thermostats et barostats en dynamique moléculaire. Demande-moi une explication ou un indice.",
  rules: [
    { test:/thermostat/i, replies:["Un thermostat maintient T autour d'une cible. Berendsen est simple mais approximatif ; Nosé-Hoover est rigoureux et génère l'ensemble canonique statistique correct."]},
    { test:/barostat/i, replies:["Un barostat ajuste le volume de la boîte de simulation pour maintenir la pression cible, via le théorème du viriel."]},
    { test:/nve|nvt|npt|ensemble/i, replies:["NVE (sans contrôle) = microcanonique. NVT (thermostat) = canonique. NPT (thermostat+barostat) = isotherme-isobare, le plus proche des conditions de labo."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis l'introduction du cours.","Rien n'est contrôlé par défaut.","Microcanonique (NVE)."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le tableau des thermostats.","Un des deux est plus rigoureux.","Nosé-Hoover génère l'ensemble canonique exact."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis le point clé sur le choix de l'ensemble.","T et P sont contrôlées en labo.","NPT."]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
DYM_CHAPTERS[dymKey("Calcul de grandeurs structurales et thermodynamiques")] = {
  objectives: [
    "Définir et interpréter la fonction de distribution radiale g(r)",
    "Calculer un coefficient de diffusion à partir du déplacement quadratique moyen",
    "Estimer une grandeur thermodynamique par moyenne temporelle",
    "Discuter la convergence statistique d'une moyenne calculée en DM"
  ],
  prereqs: ["Contrôle de la température et de la pression : thermostats et barostats"],
  bodyHtml: `
    <p>Ce chapitre montre comment extraire, à partir d'une trajectoire de dynamique moléculaire, des grandeurs physiques directement comparables à l'expérience — bouclant la démarche amorcée au chapitre 1 (l'hypothèse ergodique justifiant ces calculs de moyennes).</p>

    <h3>1. La fonction de distribution radiale $g(r)$</h3>
    <p>La <strong>fonction de distribution radiale</strong> $g(r)$ mesure la probabilité (normalisée par rapport à un gaz idéal de même densité) de trouver un atome à une distance $r$ d'un atome de référence :</p>
    <div class="formula-box">$$g(r) = \\frac{1}{\\rho}\\left\\langle \\frac{1}{N}\\sum_{i\\neq j} \\delta(r-r_{ij}) \\right\\rangle$$</div>
    <p>Pour un liquide, $g(r)$ présente des <strong>oscillations</strong> caractéristiques (premiers, deuxièmes voisins...) qui s'amortissent aux grandes distances vers $g(r)\\to1$ (comportement d'un gaz idéal, absence de corrélation) — une signature directe de l'ordre local (à courte distance), sans ordre à longue distance, caractéristique de l'état liquide, à comparer à la structure cristalline parfaitement ordonnée (matière condensée, chapitre 1).</p>

    <h3>2. Coefficient de diffusion et déplacement quadratique moyen</h3>
    <p>Pour un système où les particules diffusent (mouvement brownien, physique statistique), le <strong>déplacement quadratique moyen</strong> croît linéairement avec le temps aux temps longs — la relation d'Einstein :</p>
    <div class="formula-box">$$\\langle |\\vec r(t)-\\vec r(0)|^2 \\rangle = 6Dt \\qquad (t \\text{ grand})$$</div>
    <p>En traçant le déplacement quadratique moyen calculé sur la trajectoire de simulation en fonction de $t$, la pente de la partie linéaire donne directement le coefficient de diffusion $D$ — exactement la grandeur inaccessible à un calcul statique, mentionnée au chapitre 1.</p>

    <h3>3. Moyennes thermodynamiques</h3>
    <p>D'après l'hypothèse ergodique (chapitre 1), toute grandeur thermodynamique s'obtient comme une <strong>moyenne temporelle</strong> le long de la trajectoire (après une phase d'équilibration initiale, écartée du calcul) :</p>
    <div class="formula-box">$$\\langle A \\rangle \\approx \\frac{1}{M}\\sum_{k=1}^{M} A(t_k)$$</div>
    <p>où les $t_k$ sont les instants échantillonnés le long de la trajectoire.</p>

    <h3>4. Convergence statistique</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Une moyenne calculée sur une trajectoire trop courte n'est pas fiable : il faut vérifier sa <strong>convergence</strong>, généralement en traçant la moyenne cumulée en fonction du temps de simulation et en s'assurant qu'elle se stabilise. L'incertitude statistique sur une moyenne de DM se traite avec les mêmes outils que ceux du chapitre 6 de chimie analytique (moyenne, écart-type), en tenant compte, en plus, des corrélations temporelles entre configurations successives (les configurations proches dans le temps ne sont pas statistiquement indépendantes).
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi la fonction $g(r)$ d'un liquide tend-elle vers 1 aux grandes distances, mais présente des pics nets aux courtes distances ?</p>
      <p><strong>Solution :</strong> à courte distance, la structure locale du liquide (voisins immédiats à des distances préférentielles, liées aux tailles atomiques et aux interactions) crée des corrélations de position marquées.</p>
      <p class="example-answer">À grande distance, ces corrélations s'estompent : la probabilité de trouver un atome devient identique à celle d'un gaz idéal de même densité moyenne — d'où $g(r)\\to1$, signature de l'absence d'ordre à longue distance dans un liquide, contrairement à un cristal.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>$g(r)$ : structure locale d'un liquide, oscille aux courtes distances, tend vers 1 aux grandes distances</li>
      <li>Coefficient de diffusion via la relation d'Einstein : $\\langle|\\vec r(t)-\\vec r(0)|^2\\rangle=6Dt$ aux temps longs</li>
      <li>Grandeurs thermodynamiques : moyennes temporelles, après élimination de la phase d'équilibration</li>
      <li>Vérifier la convergence statistique est indispensable avant de croire une moyenne calculée</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Inclure la phase d'équilibration initiale dans le calcul des moyennes : elle doit être écartée</li>
      <li>Traiter les configurations successives comme statistiquement indépendantes : elles sont corrélées dans le temps</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La fonction $g(r)$ d'un liquide tend vers 1 aux grandes distances car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym5e1" value="right">les corrélations de position disparaissent, comme dans un gaz idéal</label>
          <label class="option"><input type="radio" name="dym5e1" value="wrong">le liquide devient un cristal parfait</label>
          <label class="option"><input type="radio" name="dym5e1" value="wrong">la densité devient nulle</label>
          <label class="option"><input type="radio" name="dym5e1" value="wrong">toutes les molécules se figent</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym5e1','dym5fb1','Correct — exactement l\\'explication de l\\'exemple corrigé du cours.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="dym5fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Le coefficient de diffusion s'obtient à partir de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym5e2" value="right">la pente du déplacement quadratique moyen en fonction du temps</label>
          <label class="option"><input type="radio" name="dym5e2" value="wrong">l'énergie potentielle seule</label>
          <label class="option"><input type="radio" name="dym5e2" value="wrong">g(r) directement</label>
          <label class="option"><input type="radio" name="dym5e2" value="wrong">le nombre d'atomes</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym5e2','dym5fb2','Correct — la relation d\\'Einstein ⟨|r(t)−r(0)|²⟩=6Dt donne D via la pente aux temps longs.','Relis la formule encadrée du cours sur le déplacement quadratique moyen.')">Vérifier</button>
        <div class="feedback" id="dym5fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour calculer une moyenne thermodynamique fiable, il faut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym5e3" value="right">écarter la phase d'équilibration et vérifier la convergence</label>
          <label class="option"><input type="radio" name="dym5e3" value="wrong">utiliser seulement le premier pas de simulation</label>
          <label class="option"><input type="radio" name="dym5e3" value="wrong">ignorer toute vérification statistique</label>
          <label class="option"><input type="radio" name="dym5e3" value="wrong">arrêter la simulation immédiatement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym5e3','dym5fb3','Correct — exactement le point clé du cours sur la convergence statistique.','Relis le point clé du cours sur la convergence.')">Vérifier</button>
        <div class="feedback" id="dym5fb3"></div>
      </div>
    </div>
  `
};
DYM_NOVA_KB[dymKey("Calcul de grandeurs structurales et thermodynamiques")] = {
  intro: "Salut, moi c'est Nova ! On étudie g(r), le coefficient de diffusion et les moyennes thermodynamiques. Demande-moi une explication ou un indice.",
  rules: [
    { test:/g\\(r\\)|distribution radiale/i, replies:["g(r) mesure la structure locale d'un liquide : oscillations aux courtes distances (voisins), puis g(r)→1 aux grandes distances (absence de corrélation, comme un gaz idéal)."]},
    { test:/d[ée]placement quadratique|einstein/i, replies:["La relation d'Einstein ⟨|r(t)−r(0)|²⟩=6Dt (aux temps longs) donne le coefficient de diffusion D via la pente du déplacement quadratique moyen."]},
    { test:/convergence/i, replies:["Il faut vérifier la convergence statistique d'une moyenne de DM (tracer la moyenne cumulée) et écarter la phase d'équilibration initiale."]},
    { test:/exercice\s*1/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense aux corrélations de position.","Elles disparaissent aux grandes distances."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la formule d'Einstein.","C'est une pente en fonction du temps.","Le déplacement quadratique moyen."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis le point clé sur la convergence.","Deux étapes importantes.","Écarter l'équilibration et vérifier la convergence."]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
DYM_CHAPTERS[dymKey("Applications et limites de la dynamique moléculaire")] = {
  objectives: [
    "Identifier les grands domaines d'application de la dynamique moléculaire",
    "Comprendre le problème de l'échelle de temps accessible",
    "Présenter le principe des méthodes d'échantillonnage renforcé (aperçu)",
    "Discuter les limites intrinsèques liées au champ de force et à l'approximation classique"
  ],
  prereqs: ["Calcul de grandeurs structurales et thermodynamiques"],
  bodyHtml: `
    <p>Ce dernier chapitre dresse un bilan critique : dans quels domaines la dynamique moléculaire excelle-t-elle, et quelles sont ses limitations fondamentales — indispensables à connaître pour interpréter correctement les résultats d'une simulation.</p>

    <h3>1. Grands domaines d'application</h3>
    <table class="mini-table">
      <tr><th>Domaine</th><th>Exemple d'application</th></tr>
      <tr><td>Biologie structurale</td><td>repliement des protéines, dynamique des membranes lipidiques, reconnaissance moléculaire (conception de médicaments)</td></tr>
      <tr><td>Science des matériaux</td><td>propriétés mécaniques et thermiques de solides, liquides, verres, nanomatériaux</td></tr>
      <tr><td>Chimie physique</td><td>solvatation, transport ionique, structure de liquides complexes</td></tr>
    </table>

    <h3>2. Le problème de l'échelle de temps</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — la limitation la plus fondamentale de la DM</span>
      Avec un pas de temps $\\Delta t\\sim1$–$2\\,\\text{fs}$ (chapitre 3), simuler ne serait-ce que $1\\,\\mu\\text{s}$ ($10^{-6}\\,\\text{s}$) de dynamique réelle nécessite déjà $\\sim10^9$ pas de calcul — un coût considérable. Or de nombreux processus chimiques et biologiques d'intérêt (repliement complet d'une protéine, transitions de phase lentes, diffusion sur de longues distances) se produisent sur des échelles de temps de la microseconde à la seconde, voire bien au-delà — souvent hors de portée d'une simulation directe, même sur les plus gros supercalculateurs actuels.
    </div>

    <h3>3. Méthodes d'échantillonnage renforcé (aperçu)</h3>
    <p>Pour contourner cette limitation, diverses techniques d'<strong>échantillonnage renforcé</strong> (enhanced sampling) ont été développées : la <strong>métadynamique</strong> ou l'<strong>umbrella sampling</strong> ajoutent un biais contrôlé au potentiel pour forcer le système à explorer des régions rares mais importantes de l'espace des configurations (comme le franchissement d'une barrière énergétique élevée, chimie numérique chapitre 5), tout en permettant, a posteriori, de retrouver les grandeurs thermodynamiques non biaisées par un traitement statistique approprié — un domaine actif de recherche méthodologique.</p>

    <h3>4. Limites intrinsèques</h3>
    <p>Au-delà du problème d'échelle de temps, deux limitations fondamentales restent à garder à l'esprit :</p>
    <ul>
      <li><strong>Précision du champ de force</strong> (chapitre 2) : les résultats d'une simulation ne sont jamais meilleurs que le champ de force utilisé — une paramétrisation inadaptée au système étudié peut donner des résultats qualitativement faux, même après une simulation numériquement parfaite</li>
      <li><strong>Approximation classique des noyaux</strong> (chapitre 1) : les effets quantiques nucléaires (tunnel, énergie de point zéro) sont négligés, ce qui peut être problématique pour des atomes légers (hydrogène) ou à très basse température</li>
    </ul>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi le repliement complet d'une protéine reste-t-il, pour beaucoup de systèmes, difficile à observer directement par DM classique, même sur les plus gros supercalculateurs ?</p>
      <p><strong>Solution :</strong> le repliement d'une protéine typique se produit sur des échelles de temps de la microseconde à la seconde, alors qu'une simulation classique reste, en pratique courante, limitée à la microseconde–milliseconde même sur des supercalculateurs dédiés (matériel spécialisé comme Anton).</p>
      <p class="example-answer">C'est exactement le problème d'échelle de temps du chapitre : le fossé entre le pas de temps imposé ($\\sim1\\,\\text{fs}$) et le temps physique du phénomène étudié (microseconde à seconde) reste, dans de nombreux cas, un obstacle majeur, motivant le développement continu des méthodes d'échantillonnage renforcé.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>La DM s'applique en biologie structurale, science des matériaux, chimie physique</li>
      <li>Le fossé entre pas de temps ($\\sim1\\,\\text{fs}$) et temps physiques d'intérêt (µs-s) est la limitation la plus fondamentale</li>
      <li>Les méthodes d'échantillonnage renforcé (métadynamique, umbrella sampling) contournent partiellement ce problème</li>
      <li>La qualité du champ de force et l'approximation classique des noyaux restent des limites intrinsèques à garder en tête</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire qu'une simulation de DM peut directement atteindre n'importe quelle échelle de temps physique</li>
      <li>Oublier que la fiabilité d'une simulation dépend fondamentalement de la qualité du champ de force utilisé</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La limitation la plus fondamentale de la DM classique concerne :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym6e1" value="right">l'écart entre pas de temps de simulation et échelle de temps des phénomènes étudiés</label>
          <label class="option"><input type="radio" name="dym6e1" value="wrong">l'absence totale d'application pratique</label>
          <label class="option"><input type="radio" name="dym6e1" value="wrong">l'impossibilité de simuler des liquides</label>
          <label class="option"><input type="radio" name="dym6e1" value="wrong">le coût nul de la méthode</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym6e1','dym6fb1','Correct — c\\'est le point clé du chapitre sur le problème d\\'échelle de temps.','Relis le point clé du cours sur le problème d\\'échelle de temps.')">Vérifier</button>
        <div class="feedback" id="dym6fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Les méthodes d'échantillonnage renforcé (métadynamique...) visent à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym6e2" value="right">explorer des régions rares mais importantes de l'espace des configurations</label>
          <label class="option"><input type="radio" name="dym6e2" value="wrong">ralentir volontairement la simulation</label>
          <label class="option"><input type="radio" name="dym6e2" value="wrong">supprimer le champ de force</label>
          <label class="option"><input type="radio" name="dym6e2" value="wrong">remplacer complètement Newton par Schrödinger</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym6e2','dym6fb2','Correct — c\\'est le principe des techniques d\\'échantillonnage renforcé.','Relis la section du cours sur l\\'échantillonnage renforcé.')">Vérifier</button>
        <div class="feedback" id="dym6fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">La qualité des résultats d'une simulation de DM dépend fondamentalement de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="dym6e3" value="right">la qualité du champ de force utilisé</label>
          <label class="option"><input type="radio" name="dym6e3" value="wrong">la couleur de l'écran d'affichage</label>
          <label class="option"><input type="radio" name="dym6e3" value="wrong">rien, elle est toujours parfaite</label>
          <label class="option"><input type="radio" name="dym6e3" value="wrong">le nom du logiciel utilisé uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('dym6e3','dym6fb3','Correct — les résultats ne sont jamais meilleurs que le champ de force sur lequel repose la simulation.','Relis la section du cours sur les limites intrinsèques.')">Vérifier</button>
        <div class="feedback" id="dym6fb3"></div>
      </div>
    </div>
  `
};
DYM_NOVA_KB[dymKey("Applications et limites de la dynamique moléculaire")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : applications, limites et échantillonnage renforcé. Demande-moi une explication ou un indice.",
  rules: [
    { test:/[ée]chelle de temps/i, replies:["Le fossé entre le pas de temps (~1 fs) et l'échelle de temps des phénomènes d'intérêt (µs à s) est la limitation la plus fondamentale de la DM classique directe."]},
    { test:/[ée]chantillonnage renforc[ée]|m[ée]tadynamique/i, replies:["Les méthodes d'échantillonnage renforcé (métadynamique, umbrella sampling) ajoutent un biais contrôlé pour explorer des régions rares de l'espace des configurations, contournant partiellement le problème d'échelle de temps."]},
    { test:/limite|champ de force/i, replies:["Les limites intrinsèques : qualité du champ de force (résultats jamais meilleurs que lui) et approximation classique des noyaux (effets quantiques négligés)."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le point clé sur le problème d'échelle de temps.","C'est un écart entre deux échelles.","Pas de temps vs échelle des phénomènes étudiés."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la section sur l'échantillonnage renforcé.","Pense à explorer l'espace des configurations.","Explorer des régions rares mais importantes."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis la section sur les limites intrinsèques.","C'est l'ingrédient central de la simulation.","La qualité du champ de force."]}
  ]
};

/* fusionne le module Dynamique moléculaire dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, DYM_CHAPTERS);
Object.assign(NOVA_KB, DYM_NOVA_KB);