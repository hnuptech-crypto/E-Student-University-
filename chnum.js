/* =====================================================================
   CHUNK « chnum » — registre CHNUM_CHAPTERS / CHNUM_NOVA_KB
   Matière(s) : Chimie|Chimie numérique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   CHNUM_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — CHIMIE NUMÉRIQUE (L3 Chimie Fondamentale)
   6 chapitres : de la chimie quantique au calcul numérique, méthode de Hartree-Fock,
   fonctionnelle de la densité (DFT), bases d'orbitales atomiques, optimisation de
   géométrie et surfaces d'énergie potentielle, applications (spectres IR/UV calculés).
   S'appuie sur l'introduction à la chimie quantique déjà rédigée dans ce domaine.
   ===================================================================================== */
const CHNUM_MATIERE = 'Chimie numérique';
function chnumKey(chapterTitle){ return `Chimie|${CHNUM_MATIERE}|${chapterTitle}`; }
const CHNUM_CHAPTERS = {};
const CHNUM_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
CHNUM_CHAPTERS[chnumKey("De la chimie quantique au calcul numérique")] = {
  objectives: [
    "Justifier pourquoi l'équation de Schrödinger moléculaire n'est pas résoluble exactement",
    "Présenter l'approximation de Born-Oppenheimer",
    "Distinguer méthodes ab initio, semi-empiriques et DFT",
    "Situer la chimie numérique dans le paysage de la recherche chimique moderne"
  ],
  prereqs: ["Introduction à la chimie quantique", "Théorie des perturbations stationnaires (Mécanique quantique non relativiste)"],
  bodyHtml: `
    <p>Le cours d'introduction à la chimie quantique a résolu <em>exactement</em> l'atome d'hydrogène. Dès qu'on ajoute un second électron (l'atome d'hélium) ou un second noyau (une molécule), l'équation de Schrödinger devient insoluble analytiquement — un problème à N corps en interaction, sans solution fermée. La <strong>chimie numérique</strong> (ou chimie computationnelle) développe les méthodes d'approximation systématiques, mises en œuvre sur ordinateur, qui permettent malgré tout de prédire structures, énergies et spectres moléculaires avec une précision chimique utile.</p>

    <h3>1. Pourquoi la résolution exacte échoue</h3>
    <p>Pour une molécule à $N$ électrons, la fonction d'onde $\\Psi(\\vec r_1,\\ldots,\\vec r_N)$ dépend de $3N$ coordonnées spatiales. Stocker numériquement une telle fonction sur une grille, même grossière, coûte un nombre d'opérations qui croît <strong>exponentiellement</strong> avec $N$ — le problème dit de la « malédiction de la dimensionnalité ». Toute méthode pratique doit donc introduire des approximations contrôlées.</p>

    <h3>2. L'approximation de Born-Oppenheimer</h3>
    <div class="key-point">
      <span class="eyebrow">Approximation de Born-Oppenheimer</span>
      Les noyaux étant des milliers de fois plus lourds que les électrons (le rapport masse proton/électron $\\approx1836$), ils se déplacent beaucoup plus lentement. On peut donc séparer le problème : résoudre le mouvement électronique pour des positions nucléaires <strong>fixées</strong>, puis étudier séparément le mouvement (plus lent) des noyaux sur la <strong>surface d'énergie potentielle</strong> ainsi obtenue (chapitre 5).
    </div>
    <p>Cette approximation, quasiment toujours excellente (sauf cas particuliers comme les intersections coniques), est le point de départ de <strong>toute</strong> la chimie quantique computationnelle : elle réduit un problème couplé électrons+noyaux à deux problèmes séparés, bien plus abordables.</p>

    <h3>3. Panorama des méthodes</h3>
    <table class="mini-table">
      <tr><th>Famille</th><th>Principe</th><th>Coût / précision</th></tr>
      <tr><td>Ab initio (Hartree-Fock, post-HF)</td><td>résolution approchée à partir des seuls principes premiers, sans paramètre ajusté</td><td>coût élevé, précision systématiquement améliorable</td></tr>
      <tr><td>DFT</td><td>reformulation en termes de la densité électronique plutôt que de la fonction d'onde</td><td>bon compromis coût/précision, très répandue</td></tr>
      <tr><td>Semi-empirique</td><td>simplifications drastiques calibrées sur des données expérimentales</td><td>rapide, précision limitée, utile pour de très grands systèmes</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi l'approximation de Born-Oppenheimer est-elle raisonnable pour une molécule diatomique typique, mais peut échouer près d'une intersection conique (photochimie) ?</p>
      <p><strong>Solution :</strong> l'approximation repose sur une séparation nette d'échelles de temps entre mouvement électronique (rapide) et nucléaire (lent). Près d'une intersection conique, deux surfaces d'énergie potentielle électroniques deviennent quasi-dégénérées : le mouvement nucléaire peut alors induire des transitions électroniques rapides, brisant l'hypothèse de séparation des échelles.</p>
      <p class="example-answer">L'approximation de Born-Oppenheimer reste la règle générale, mais les phénomènes photochimiques ultrarapides (désexcitation non radiative) constituent une exception notable où elle doit être dépassée.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>L'équation de Schrödinger moléculaire n'est pas résoluble exactement dès $N\\geq2$ électrons</li>
      <li>Born-Oppenheimer sépare le mouvement électronique (rapide) du mouvement nucléaire (lent)</li>
      <li>Trois grandes familles de méthodes : ab initio, DFT, semi-empirique — un compromis coût/précision</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que Born-Oppenheimer est toujours valable sans exception : elle échoue près des intersections coniques</li>
      <li>Confondre méthode ab initio (sans paramètre ajusté) et méthode semi-empirique (calibrée sur l'expérience)</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">L'approximation de Born-Oppenheimer sépare :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum1e1" value="wrong">le spin et l'orbite</label>
          <label class="option"><input type="radio" name="chnum1e1" value="right">le mouvement électronique et le mouvement nucléaire</label>
          <label class="option"><input type="radio" name="chnum1e1" value="wrong">l'énergie cinétique et potentielle</label>
          <label class="option"><input type="radio" name="chnum1e1" value="wrong">le passé et le futur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum1e1','chnum1fb1','Correct — c\\'est exactement la séparation permise par la grande différence de masse noyaux/électrons.','Relis l\\'encadré du cours.')">Vérifier</button>
        <div class="feedback" id="chnum1fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Une méthode ab initio se caractérise par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum1e2" value="right">l'absence de paramètre ajusté sur l'expérience</label>
          <label class="option"><input type="radio" name="chnum1e2" value="wrong">une calibration systématique sur des données expérimentales</label>
          <label class="option"><input type="radio" name="chnum1e2" value="wrong">une résolution toujours exacte</label>
          <label class="option"><input type="radio" name="chnum1e2" value="wrong">l'absence totale d'approximation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum1e2','chnum1fb2','Correct — ab initio signifie « à partir des premiers principes », sans paramètre empirique ajusté.','Relis le tableau du cours sur les familles de méthodes.')">Vérifier</button>
        <div class="feedback" id="chnum1fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Born-Oppenheimer peut échouer :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum1e3" value="right">près d'une intersection conique</label>
          <label class="option"><input type="radio" name="chnum1e3" value="wrong">pour toute molécule diatomique</label>
          <label class="option"><input type="radio" name="chnum1e3" value="wrong">uniquement pour l'atome d'hydrogène</label>
          <label class="option"><input type="radio" name="chnum1e3" value="wrong">jamais, elle est toujours exacte</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum1e3','chnum1fb3','Correct — exactement l\\'exemple corrigé du cours sur la photochimie ultrarapide.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="chnum1fb3"></div>
      </div>
    </div>
  `
};
CHNUM_NOVA_KB[chnumKey("De la chimie quantique au calcul numérique")] = {
  intro: "Salut, moi c'est Nova ! On démarre la chimie numérique avec Born-Oppenheimer et le panorama des méthodes. Demande-moi une explication ou un indice.",
  rules: [
    { test:/born.?oppenheimer/i, replies:["Born-Oppenheimer sépare le mouvement électronique (rapide) du mouvement nucléaire (lent), grâce à la grande différence de masse — le point de départ de toute la chimie computationnelle."]},
    { test:/ab initio|dft|semi.?empirique/i, replies:["Ab initio: sans paramètre empirique. DFT: reformulation via la densité électronique. Semi-empirique: simplifications calibrées sur l'expérience, rapide mais moins précis."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis l'encadré de Born-Oppenheimer.","Deux types de mouvement.","Électronique et nucléaire."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le tableau des méthodes.","Pense au sens du mot 'ab initio'.","Sans paramètre ajusté."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense à la photochimie.","Près d'une intersection conique."]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
CHNUM_CHAPTERS[chnumKey("La méthode de Hartree-Fock et le champ moyen")] = {
  objectives: [
    "Comprendre le principe du champ moyen pour un système à plusieurs électrons",
    "Écrire la fonction d'onde comme un déterminant de Slater",
    "Présenter le principe variationnel appliqué aux équations de Hartree-Fock",
    "Identifier l'origine physique de l'énergie de corrélation électronique"
  ],
  prereqs: ["De la chimie quantique au calcul numérique", "Méthode variationnelle et perturbations dépendantes du temps (Mécanique quantique non relativiste)"],
  bodyHtml: `
    <p>Après Born-Oppenheimer (chapitre 1), il reste à résoudre le problème électronique à $N$ corps en interaction. La méthode de <strong>Hartree-Fock</strong> (1930), première approche systématique de ce problème, reste aujourd'hui le point de départ conceptuel de la quasi-totalité des méthodes ab initio plus avancées.</p>

    <h3>1. L'approximation du champ moyen</h3>
    <p>L'idée centrale : remplacer les interactions instantanées et corrélées entre chaque paire d'électrons par un <strong>champ moyen</strong> — chaque électron évolue indépendamment dans le potentiel créé par les noyaux <em>et</em> par la distribution de charge moyenne de tous les autres électrons. Cette approximation découple le problème à $N$ corps en $N$ problèmes à un seul électron, chacun résolu dans un potentiel effectif.</p>

    <h3>2. Le déterminant de Slater</h3>
    <p>Les électrons étant des fermions (mécanique quantique non relativiste, chapitre 5), la fonction d'onde totale doit être <strong>antisymétrique</strong> par échange de deux électrons. On la construit comme un <strong>déterminant de Slater</strong> à partir des orbitales monoélectroniques $\\varphi_i$ (spin-orbitales) :</p>
    <div class="formula-box">$$\\Psi(\\vec r_1,\\ldots,\\vec r_N) = \\frac{1}{\\sqrt{N!}}\\begin{vmatrix}\\varphi_1(\\vec r_1) & \\cdots & \\varphi_N(\\vec r_1)\\\\ \\vdots & & \\vdots\\\\ \\varphi_1(\\vec r_N) & \\cdots & \\varphi_N(\\vec r_N)\\end{vmatrix}$$</div>
    <p>Une propriété du déterminant — s'annuler si deux lignes sont identiques — garantit <strong>automatiquement</strong> le principe d'exclusion de Pauli : deux électrons ne peuvent pas occuper la même spin-orbitale.</p>

    <h3>3. Principe variationnel et équations de Hartree-Fock</h3>
    <p>En minimisant l'énergie $\\langle\\Psi|\\hat H|\\Psi\\rangle$ (théorème variationnel, mécanique quantique non relativiste chapitre 9) sur l'ensemble des déterminants de Slater possibles, on obtient un système d'équations couplées non linéaires — les <strong>équations de Hartree-Fock</strong> — résolues numériquement par une procédure <strong>auto-cohérente</strong> (self-consistent field, SCF) : on part d'orbitales d'essai, on calcule le champ moyen qu'elles engendrent, on résout les équations pour de nouvelles orbitales, et l'on itère jusqu'à convergence.</p>

    <h3>4. L'énergie de corrélation</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — la limite fondamentale de Hartree-Fock</span>
      En remplaçant les interactions instantanées par un champ moyen, Hartree-Fock <strong>néglige</strong> la <strong>corrélation électronique</strong> : le fait que le mouvement de chaque électron dépend, à chaque instant, de la position <em>instantanée</em> des autres (les électrons « s'évitent » activement, pas seulement en moyenne). L'énergie de corrélation, $E_{corr}=E_{exacte}-E_{HF}$, bien que généralement faible en valeur relative, est souvent cruciale pour la précision chimique recherchée — d'où le développement de méthodes « post-Hartree-Fock » qui la réintroduisent, hors du champ de ce cours.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi la méthode Hartree-Fock, malgré ses limites, reste-t-elle un point de départ incontournable de la chimie numérique moderne ?</p>
      <p><strong>Solution :</strong> elle capture correctement l'essentiel de la structure électronique (répulsion coulombienne moyenne, antisymétrie de Pauli via le déterminant de Slater), avec un coût de calcul raisonnable, et fournit un ensemble d'orbitales de départ de bonne qualité.</p>
      <p class="example-answer">La quasi-totalité des méthodes plus précises (post-HF, certaines approches DFT) utilisent Hartree-Fock comme référence ou point de départ, avant d'y ajouter les corrections de corrélation manquantes.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Champ moyen : chaque électron évolue dans le potentiel moyen créé par les autres, découplant le problème à N corps</li>
      <li>Déterminant de Slater : garantit automatiquement l'antisymétrie (principe de Pauli)</li>
      <li>Équations de Hartree-Fock résolues par procédure auto-cohérente (SCF)</li>
      <li>Énergie de corrélation : ce qui manque à Hartree-Fock par rapport à la solution exacte</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que Hartree-Fock donne l'énergie exacte : elle néglige systématiquement la corrélation électronique</li>
      <li>Oublier que le déterminant de Slater est indispensable pour l'antisymétrie, pas juste une commodité de calcul</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le déterminant de Slater garantit automatiquement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum2e1" value="wrong">la conservation de l'énergie</label>
          <label class="option"><input type="radio" name="chnum2e1" value="right">le principe d'exclusion de Pauli</label>
          <label class="option"><input type="radio" name="chnum2e1" value="wrong">la neutralité électrique</label>
          <label class="option"><input type="radio" name="chnum2e1" value="wrong">la symétrie de la molécule</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum2e1','chnum2fb1','Correct — le déterminant s\\'annule si deux électrons occupent la même spin-orbitale, garantissant Pauli.','Relis la propriété du déterminant mentionnée dans le cours.')">Vérifier</button>
        <div class="feedback" id="chnum2fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">L'énergie de corrélation est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum2e2" value="right">ce que Hartree-Fock ne capture pas par rapport à l'énergie exacte</label>
          <label class="option"><input type="radio" name="chnum2e2" value="wrong">l'énergie totale du système</label>
          <label class="option"><input type="radio" name="chnum2e2" value="wrong">toujours nulle en pratique</label>
          <label class="option"><input type="radio" name="chnum2e2" value="wrong">l'énergie cinétique des noyaux</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum2e2','chnum2fb2','Correct — Ecorr=Eexacte−EHF, liée au mouvement corrélé instantané des électrons, négligé par le champ moyen.','Relis le point clé du cours sur la corrélation électronique.')">Vérifier</button>
        <div class="feedback" id="chnum2fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">La procédure SCF (self-consistent field) consiste à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum2e3" value="right">itérer le calcul du champ moyen jusqu'à convergence des orbitales</label>
          <label class="option"><input type="radio" name="chnum2e3" value="wrong">résoudre l'équation en une seule étape exacte</label>
          <label class="option"><input type="radio" name="chnum2e3" value="wrong">ignorer les orbitales</label>
          <label class="option"><input type="radio" name="chnum2e3" value="wrong">ne jamais converger par construction</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum2e3','chnum2fb3','Correct — c\\'est le principe même de la procédure auto-cohérente.','Relis la section du cours sur la procédure SCF.')">Vérifier</button>
        <div class="feedback" id="chnum2fb3"></div>
      </div>
    </div>
  `
};
CHNUM_NOVA_KB[chnumKey("La méthode de Hartree-Fock et le champ moyen")] = {
  intro: "Salut, c'est Nova ! On étudie Hartree-Fock, le champ moyen et l'énergie de corrélation. Demande-moi une explication ou un indice.",
  rules: [
    { test:/champ moyen/i, replies:["Le champ moyen remplace les interactions instantanées entre électrons par un potentiel effectif moyen, découplant le problème à N corps en N problèmes à un électron."]},
    { test:/slater|d[ée]terminant/i, replies:["Le déterminant de Slater garantit automatiquement l'antisymétrie (Pauli) : il s'annule si deux électrons occupent la même spin-orbitale."]},
    { test:/corr[ée]lation/i, replies:["L'énergie de corrélation Ecorr=Eexacte−EHF est ce que Hartree-Fock néglige, liée au mouvement corrélé instantané des électrons."]},
    { test:/scf|auto.?coh[ée]rent/i, replies:["La procédure SCF résout les équations de Hartree-Fock par itérations successives jusqu'à convergence des orbitales et du champ moyen."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la propriété du déterminant.","Un déterminant s'annule dans un cas précis.","Le principe d'exclusion de Pauli."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé sur la corrélation.","C'est une différence d'énergies.","Eexacte moins EHF."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis la section sur SCF.","C'est un processus répété.","Itérer jusqu'à convergence."]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
CHNUM_CHAPTERS[chnumKey("Bases d'orbitales atomiques")] = {
  objectives: [
    "Comprendre pourquoi les orbitales moléculaires sont développées sur une base finie",
    "Distinguer orbitales de type Slater (STO) et de type gaussien (GTO)",
    "Présenter la notion de base minimale et de base étendue",
    "Interpréter les fonctions de polarisation et diffuses"
  ],
  prereqs: ["La méthode de Hartree-Fock et le champ moyen"],
  bodyHtml: `
    <p>Les équations de Hartree-Fock (chapitre 2) sont des équations intégro-différentielles complexes. En pratique, on les résout non pas en cherchant directement la forme des orbitales, mais en les <strong>développant</strong> sur un ensemble fini de fonctions connues — la <strong>base d'orbitales atomiques</strong> — réduisant le problème à de l'algèbre linéaire, bien plus abordable numériquement.</p>

    <h3>1. Développement en base</h3>
    <p>Chaque orbitale moléculaire $\\varphi_i$ s'écrit comme combinaison linéaire d'un ensemble de fonctions de base $\\{\\chi_\\mu\\}$ centrées sur les noyaux (méthode LCAO — Combinaison Linéaire d'Orbitales Atomiques) :</p>
    <div class="formula-box">$$\\varphi_i(\\vec r) = \\sum_\\mu c_{\\mu i}\\,\\chi_\\mu(\\vec r)$$</div>
    <p>Résoudre Hartree-Fock revient alors à déterminer les coefficients $c_{\\mu i}$ — un problème d'algèbre matricielle (équations de Roothaan), bien plus facile à traiter numériquement que l'équation intégro-différentielle originale.</p>

    <h3>2. Orbitales de Slater (STO) et gaussiennes (GTO)</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Forme radiale</th><th>Avantage / inconvénient</th></tr>
      <tr><td>STO (Slater)</td><td>$e^{-\\zeta r}$</td><td>comportement physique correct près du noyau et à grande distance ; intégrales difficiles à calculer analytiquement pour des systèmes polyatomiques</td></tr>
      <tr><td>GTO (gaussienne)</td><td>$e^{-\\alpha r^2}$</td><td>intégrales analytiques très rapides (produit de deux gaussiennes = une gaussienne) ; comportement moins réaliste près du noyau, corrigé en combinant plusieurs GTO</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Malgré leur forme moins physique individuellement, les GTO dominent la chimie numérique moderne car leur simplicité analytique rend les calculs des intégrales biélectroniques (le goulot d'étranglement numérique de Hartree-Fock) des milliers de fois plus rapides. On approxime souvent une STO par une combinaison de plusieurs GTO (base « STO-3G » par exemple : chaque STO représentée par 3 gaussiennes).
    </div>

    <h3>3. Bases minimales et étendues</h3>
    <p>Une <strong>base minimale</strong> (comme STO-3G) n'utilise qu'une seule fonction par orbitale atomique occupée — rapide mais peu précise. Des <strong>bases étendues</strong> (comme 6-31G, cc-pVDZ) ajoutent plusieurs fonctions par orbitale (bases « split-valence »), des <strong>fonctions de polarisation</strong> (moment angulaire supérieur, ex. $d$ sur un atome de carbone) pour décrire la déformation des orbitales lors de la liaison, et des <strong>fonctions diffuses</strong> (exposants faibles, queue étalée) indispensables pour décrire correctement les anions ou les états excités.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi une base minimale comme STO-3G est-elle insuffisante pour calculer précisément l'énergie d'une réaction chimique ?</p>
      <p><strong>Solution :</strong> avec une seule fonction par orbitale atomique, la base est trop rigide pour décrire correctement comment les orbitales se déforment et se polarisent lors de la formation ou de la rupture de liaisons chimiques.</p>
      <p class="example-answer">Une base étendue avec fonctions de polarisation est nécessaire pour capturer cette flexibilité — un choix de base insuffisant est l'une des sources d'erreur les plus fréquentes en chimie numérique appliquée.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Méthode LCAO : $\\varphi_i=\\sum_\\mu c_{\\mu i}\\chi_\\mu$, réduisant Hartree-Fock à un problème d'algèbre linéaire</li>
      <li>GTO ($e^{-\\alpha r^2}$) dominent car leurs intégrales sont analytiques, malgré une forme moins physique que les STO ($e^{-\\zeta r}$)</li>
      <li>Bases étendues : fonctions de polarisation (déformation des orbitales) et diffuses (anions, états excités)</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire qu'une base plus grande est toujours strictement nécessaire : c'est un compromis coût/précision à ajuster au problème</li>
      <li>Oublier les fonctions diffuses pour un calcul sur un anion ou un état excité : erreurs importantes garanties sans elles</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La méthode LCAO consiste à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum3e1" value="right">développer les orbitales moléculaires sur une base de fonctions connues</label>
          <label class="option"><input type="radio" name="chnum3e1" value="wrong">résoudre exactement l'équation de Schrödinger</label>
          <label class="option"><input type="radio" name="chnum3e1" value="wrong">ignorer les orbitales atomiques</label>
          <label class="option"><input type="radio" name="chnum3e1" value="wrong">calculer directement l'énergie de corrélation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum3e1','chnum3fb1','Correct — c\\'est le principe LCAO, réduisant le problème à de l\\'algèbre linéaire.','Relis la formule encadrée du cours pour φi.')">Vérifier</button>
        <div class="feedback" id="chnum3fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Les GTO sont préférées aux STO en pratique car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum3e2" value="right">leurs intégrales sont analytiques et rapides à calculer</label>
          <label class="option"><input type="radio" name="chnum3e2" value="wrong">elles sont plus physiques près du noyau</label>
          <label class="option"><input type="radio" name="chnum3e2" value="wrong">elles n'ont aucun exposant</label>
          <label class="option"><input type="radio" name="chnum3e2" value="wrong">elles sont interdites par Pauli</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum3e2','chnum3fb2','Correct — c\\'est la vitesse de calcul des intégrales, pas le réalisme physique, qui explique la domination des GTO.','Relis le point clé du cours sur les GTO.')">Vérifier</button>
        <div class="feedback" id="chnum3fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour calculer un anion, il faut impérativement inclure :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum3e3" value="right">des fonctions diffuses</label>
          <label class="option"><input type="radio" name="chnum3e3" value="wrong">une base minimale seulement</label>
          <label class="option"><input type="radio" name="chnum3e3" value="wrong">aucune fonction de polarisation</label>
          <label class="option"><input type="radio" name="chnum3e3" value="wrong">des STO uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum3e3','chnum3fb3','Correct — les fonctions diffuses sont indispensables pour décrire correctement les anions.','Reprends la section du cours sur les bases étendues.')">Vérifier</button>
        <div class="feedback" id="chnum3fb3"></div>
      </div>
    </div>
  `
};
CHNUM_NOVA_KB[chnumKey("Bases d'orbitales atomiques")] = {
  intro: "Salut, c'est Nova ! On étudie les bases d'orbitales atomiques : STO, GTO, bases étendues. Demande-moi une explication ou un indice.",
  rules: [
    { test:/lcao/i, replies:["La méthode LCAO développe chaque orbitale moléculaire sur une base de fonctions atomiques : φi=Σc_μiχ_μ, réduisant Hartree-Fock à de l'algèbre linéaire."]},
    { test:/sto|gto|gaussienne|slater/i, replies:["STO (e^-ζr) sont physiquement réalistes mais coûteuses en intégrales. GTO (e^-αr²) sont analytiquement rapides et dominent la pratique moderne."]},
    { test:/fonction diffuse|fonction de polarisation/i, replies:["Les fonctions de polarisation décrivent la déformation des orbitales en liaison ; les fonctions diffuses sont indispensables pour les anions et états excités."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la formule encadrée pour φi.","C'est un développement sur une base.","Développer sur des fonctions connues."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé sur les GTO.","Pense à la vitesse de calcul, pas au réalisme.","Leurs intégrales sont analytiques et rapides."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis la section sur les bases étendues.","Pense aux anions.","Des fonctions diffuses."]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
CHNUM_CHAPTERS[chnumKey("La théorie de la fonctionnelle de la densité (DFT)")] = {
  objectives: [
    "Comprendre le changement de variable fondamental de la DFT (densité vs fonction d'onde)",
    "Énoncer les théorèmes de Hohenberg-Kohn",
    "Présenter le schéma de Kohn-Sham et la fonctionnelle d'échange-corrélation",
    "Situer la DFT par rapport à Hartree-Fock en coût et en précision"
  ],
  prereqs: ["Bases d'orbitales atomiques"],
  bodyHtml: `
    <p>La méthode de Hartree-Fock (chapitre 2) manipule une fonction d'onde $\\Psi(\\vec r_1,\\ldots,\\vec r_N)$ à $3N$ variables — un objet redoutablement complexe. La <strong>théorie de la fonctionnelle de la densité</strong> (DFT), développée par Hohenberg, Kohn et Sham dans les années 1960, propose un changement de perspective radical : reformuler toute la chimie quantique en termes de la <strong>densité électronique</strong> $\\rho(\\vec r)$, une fonction d'une seule variable spatiale — quel que soit le nombre d'électrons $N$.</p>

    <h3>1. Les théorèmes de Hohenberg-Kohn</h3>
    <div class="key-point">
      <span class="eyebrow">Premier théorème de Hohenberg-Kohn</span>
      L'énergie de l'état fondamental d'un système électronique est une <strong>fonctionnelle unique</strong> de la densité électronique $\\rho(\\vec r)$ : $E=E[\\rho]$. En principe, connaître $\\rho(\\vec r)$ (une fonction à 3 variables, indépendamment de $N$) suffit à déterminer <em>toutes</em> les propriétés du système, exactement comme la fonction d'onde complète.
    </div>
    <p>Le <strong>second théorème de Hohenberg-Kohn</strong> établit un principe variationnel analogue à celui du chapitre 9 de mécanique quantique non relativiste : la densité exacte de l'état fondamental minimise la fonctionnelle $E[\\rho]$.</p>

    <h3>2. Le problème pratique : la fonctionnelle exacte est inconnue</h3>
    <p>Ces théorèmes sont d'une élégance remarquable, mais ils sont <strong>existentiels</strong> : ils garantissent qu'une fonctionnelle $E[\\rho]$ existe, sans en donner la <strong>forme explicite</strong>. Toute la difficulté pratique de la DFT réside dans la construction d'approximations de plus en plus fines de cette fonctionnelle inconnue.</p>

    <h3>3. Le schéma de Kohn-Sham</h3>
    <p>L'astuce de Kohn et Sham : introduire un système <strong>fictif</strong> d'électrons <em>sans interaction</em>, ayant exactement la même densité $\\rho(\\vec r)$ que le système réel. Ce système fictif se traite avec des orbitales monoélectroniques (comme en Hartree-Fock), mais l'énergie totale s'écrit :</p>
    <div class="formula-box">$$E[\\rho] = T_s[\\rho] + E_{ext}[\\rho] + E_H[\\rho] + E_{xc}[\\rho]$$</div>
    <p>où $T_s$ est l'énergie cinétique du système fictif sans interaction (calculable exactement à partir des orbitales de Kohn-Sham), $E_{ext}$ l'interaction avec les noyaux, $E_H$ la répulsion électrostatique moyenne (terme de Hartree), et $E_{xc}$, la <strong>fonctionnelle d'échange-corrélation</strong>, qui concentre <em>toute</em> la difficulté restante — c'est elle qu'on approxime en pratique (fonctionnelles LDA, GGA, hybrides comme B3LYP...).</p>

    <h3>4. DFT vs Hartree-Fock : coût et précision</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Contrairement à Hartree-Fock, la DFT (via $E_{xc}$) incorpore une part de <strong>corrélation électronique</strong> — souvent avec un coût de calcul comparable à celui de Hartree-Fock, mais une précision généralement bien meilleure. C'est ce compromis exceptionnel qui a fait de la DFT la méthode la plus utilisée en chimie numérique moderne, malgré l'absence de hiérarchie systématique pour améliorer $E_{xc}$ (contrairement aux méthodes post-Hartree-Fock, qui convergent en principe vers la solution exacte).
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi la DFT est-elle si largement utilisée malgré le caractère approché et non systématique de la fonctionnelle d'échange-corrélation ?</p>
      <p><strong>Solution :</strong> pour de nombreux systèmes chimiques d'intérêt pratique (grosses molécules organiques, catalyseurs, matériaux), les fonctionnelles modernes bien choisies donnent des résultats de précision chimique utile, à un coût de calcul très inférieur aux méthodes post-Hartree-Fock qui incluent explicitement la corrélation.</p>
      <p class="example-answer">Ce rapport coût/précision favorable, plutôt qu'une rigueur mathématique parfaite, explique la domination actuelle de la DFT en chimie numérique appliquée — un choix pragmatique, validé empiriquement sur d'immenses jeux de données.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Théorèmes de Hohenberg-Kohn : $E=E[\\rho]$, la densité (fonction à 3 variables) suffit en principe à tout déterminer</li>
      <li>La fonctionnelle exacte est inconnue : toute la difficulté pratique réside dans son approximation</li>
      <li>Schéma de Kohn-Sham : système fictif sans interaction, avec fonctionnelle d'échange-corrélation $E_{xc}$ concentrant l'approximation</li>
      <li>DFT : coût comparable à Hartree-Fock, précision généralement meilleure grâce à $E_{xc}$</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que la DFT est exacte : elle dépend d'une fonctionnelle $E_{xc}$ approximée, jamais connue exactement</li>
      <li>Confondre la densité électronique $\\rho(\\vec r)$ (une fonction) et la fonction d'onde $\\Psi$ (dépendante de $3N$ variables)</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le premier théorème de Hohenberg-Kohn énonce que l'énergie de l'état fondamental est une fonctionnelle de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum4e1" value="wrong">la fonction d'onde complète</label>
          <label class="option"><input type="radio" name="chnum4e1" value="right">la densité électronique</label>
          <label class="option"><input type="radio" name="chnum4e1" value="wrong">la masse des noyaux</label>
          <label class="option"><input type="radio" name="chnum4e1" value="wrong">le spin total</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum4e1','chnum4fb1','Correct — E=E[ρ], le point de départ de toute la DFT.','Relis l\\'encadré du premier théorème de Hohenberg-Kohn.')">Vérifier</button>
        <div class="feedback" id="chnum4fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">La fonctionnelle d'échange-corrélation $E_{xc}$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum4e2" value="right">connue seulement de façon approchée</label>
          <label class="option"><input type="radio" name="chnum4e2" value="wrong">exactement calculable</label>
          <label class="option"><input type="radio" name="chnum4e2" value="wrong">toujours nulle</label>
          <label class="option"><input type="radio" name="chnum4e2" value="wrong">indépendante du système étudié</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum4e2','chnum4fb2','Correct — c\\'est là que réside toute la difficulté pratique de la DFT.','Relis la section du cours sur le schéma de Kohn-Sham.')">Vérifier</button>
        <div class="feedback" id="chnum4fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Le succès pratique de la DFT s'explique surtout par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum4e3" value="right">un bon compromis coût de calcul / précision</label>
          <label class="option"><input type="radio" name="chnum4e3" value="wrong">une exactitude mathématique parfaite</label>
          <label class="option"><input type="radio" name="chnum4e3" value="wrong">l'absence totale d'approximation</label>
          <label class="option"><input type="radio" name="chnum4e3" value="wrong">son incapacité à traiter les grosses molécules</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum4e3','chnum4fb3','Correct — exactement l\\'explication de l\\'exemple corrigé du cours.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="chnum4fb3"></div>
      </div>
    </div>
  `
};
CHNUM_NOVA_KB[chnumKey("La théorie de la fonctionnelle de la densité (DFT)")] = {
  intro: "Salut, moi c'est Nova ! On étudie la DFT : Hohenberg-Kohn, Kohn-Sham, fonctionnelle d'échange-corrélation. Demande-moi une explication ou un indice.",
  rules: [
    { test:/hohenberg.?kohn/i, replies:["Le premier théorème de Hohenberg-Kohn : E=E[ρ], l'énergie de l'état fondamental est une fonctionnelle unique de la densité électronique — une fonction de 3 variables, quel que soit N."]},
    { test:/kohn.?sham|[ée]change.?corr[ée]lation/i, replies:["Le schéma de Kohn-Sham introduit un système fictif sans interaction ; toute la difficulté est concentrée dans la fonctionnelle d'échange-corrélation Exc, approximée en pratique."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis l'encadré du premier théorème.","C'est une fonction à 3 variables.","La densité électronique."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la section sur Kohn-Sham.","C'est le point difficile de la DFT.","Connue seulement de façon approchée."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense au rapport coût/précision.","Un bon compromis coût/précision."]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
CHNUM_CHAPTERS[chnumKey("Optimisation de géométrie et surfaces d'énergie potentielle")] = {
  objectives: [
    "Définir la surface d'énergie potentielle (SEP) issue de l'approximation de Born-Oppenheimer",
    "Distinguer minima, états de transition et points-selle",
    "Comprendre le principe des algorithmes d'optimisation de géométrie",
    "Relier fréquences de vibration calculées et nature du point stationnaire"
  ],
  prereqs: ["La théorie de la fonctionnelle de la densité (DFT)"],
  bodyHtml: `
    <p>Une fois l'énergie électronique calculée (Hartree-Fock ou DFT) pour une géométrie nucléaire donnée, on obtient un point de la <strong>surface d'énergie potentielle</strong> introduite au chapitre 1 (conséquence de Born-Oppenheimer). Ce chapitre explore comment naviguer sur cette surface pour trouver les structures moléculaires stables et les chemins réactionnels.</p>

    <h3>1. La surface d'énergie potentielle (SEP)</h3>
    <p>Pour une molécule à $M$ noyaux, la SEP $E(\\vec R_1,\\ldots,\\vec R_M)$ est une fonction des $3M-6$ coordonnées internes indépendantes (après élimination des translations et rotations globales). C'est un objet de très haute dimension, mais dont les points remarquables — minima et points-selle — concentrent toute l'information chimique utile.</p>

    <h3>2. Minima, états de transition, points-selle</h3>
    <table class="mini-table">
      <tr><th>Point stationnaire</th><th>Condition</th><th>Signification chimique</th></tr>
      <tr><td>Minimum local</td><td>toutes les valeurs propres de la matrice hessienne positives</td><td>géométrie d'équilibre stable (réactif, produit, intermédiaire)</td></tr>
      <tr><td>État de transition</td><td>exactement une valeur propre négative</td><td>« col » entre deux minima, correspond à la structure activée d'une réaction</td></tr>
      <tr><td>Point-selle d'ordre $n$</td><td>$n$ valeurs propres négatives</td><td>rarement pertinent chimiquement pour $n>1$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      L'énergie d'activation d'une réaction — la grandeur qui détermine sa vitesse — est précisément la différence d'énergie entre le minimum réactif et l'état de transition qui le sépare du minimum produit. Localiser numériquement cet état de transition est l'un des calculs les plus utiles (et les plus délicats) de la chimie numérique appliquée à la cinétique.
    </div>

    <h3>3. Algorithmes d'optimisation de géométrie</h3>
    <p>Trouver un minimum de $E(\\vec R)$ revient à résoudre $\\vec\\nabla E=\\vec 0$ avec une matrice hessienne définie positive. En pratique, on utilise des méthodes itératives de type gradient (calcul analytique ou numérique du gradient $\\vec\\nabla E$, puis déplacement dans la direction de descente, répété jusqu'à convergence) — une procédure numérique conceptuellement proche de la recherche d'un minimum d'énergie potentielle en mécanique classique, mais appliquée ici à une surface de haute dimension issue d'un calcul quantique coûteux à chaque point.</p>

    <h3>4. Fréquences de vibration et nature du point stationnaire</h3>
    <p>Une fois un point stationnaire localisé, le calcul des <strong>fréquences de vibration</strong> (à partir de la matrice hessienne, diagonalisée exactement comme au chapitre 6 de mécanique analytique pour les petites oscillations) confirme sa nature : toutes les fréquences réelles pour un minimum, une seule <strong>fréquence imaginaire</strong> (valeur propre négative de la hessienne) pour un état de transition — le mode de vibration correspondant décrivant précisément le déplacement le long du chemin réactionnel.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> après optimisation de géométrie, un calcul de fréquences donne une seule fréquence imaginaire. Que peut-on en conclure ?</p>
      <p><strong>Solution :</strong> une unique fréquence imaginaire signifie que la matrice hessienne a exactement une valeur propre négative.</p>
      <p class="example-answer">Le point trouvé est un <strong>état de transition</strong> (pas un minimum) : c'est exactement la signature recherchée pour confirmer numériquement une structure activée de réaction, avant d'en déduire l'énergie d'activation.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>La surface d'énergie potentielle (SEP) est fonction des coordonnées nucléaires, conséquence de Born-Oppenheimer</li>
      <li>Minimum : toutes les valeurs propres de la hessienne positives ; état de transition : exactement une négative</li>
      <li>L'énergie d'activation est la différence d'énergie entre un minimum réactif et l'état de transition adjacent</li>
      <li>Une fréquence de vibration imaginaire confirme numériquement un état de transition</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre point-selle d'ordre 1 (état de transition, chimiquement pertinent) et d'ordre supérieur (rarement pertinent)</li>
      <li>Oublier de vérifier les fréquences après optimisation : un minimum peut être confondu avec un état de transition sans ce contrôle</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Un état de transition se caractérise par une matrice hessienne ayant :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum5e1" value="wrong">toutes ses valeurs propres positives</label>
          <label class="option"><input type="radio" name="chnum5e1" value="right">exactement une valeur propre négative</label>
          <label class="option"><input type="radio" name="chnum5e1" value="wrong">toutes ses valeurs propres négatives</label>
          <label class="option"><input type="radio" name="chnum5e1" value="wrong">une valeur propre nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum5e1','chnum5fb1','Correct — c\\'est la définition même d\\'un état de transition sur la SEP.','Relis le tableau du cours sur les points stationnaires.')">Vérifier</button>
        <div class="feedback" id="chnum5fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">L'énergie d'activation d'une réaction est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum5e2" value="right">la différence d'énergie entre le minimum réactif et l'état de transition</label>
          <label class="option"><input type="radio" name="chnum5e2" value="wrong">l'énergie totale du produit</label>
          <label class="option"><input type="radio" name="chnum5e2" value="wrong">toujours nulle</label>
          <label class="option"><input type="radio" name="chnum5e2" value="wrong">indépendante de la SEP</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum5e2','chnum5fb2','Correct — c\\'est exactement le point clé du cours sur l\\'énergie d\\'activation.','Relis le point clé du cours.')">Vérifier</button>
        <div class="feedback" id="chnum5fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Une fréquence de vibration imaginaire unique après optimisation indique :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum5e3" value="right">un état de transition</label>
          <label class="option"><input type="radio" name="chnum5e3" value="wrong">un minimum stable</label>
          <label class="option"><input type="radio" name="chnum5e3" value="wrong">une erreur de calcul systématique</label>
          <label class="option"><input type="radio" name="chnum5e3" value="wrong">une molécule instable chimiquement dans tous les cas</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum5e3','chnum5fb3','Correct — exactement le résultat de l\\'exemple corrigé du cours.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="chnum5fb3"></div>
      </div>
    </div>
  `
};
CHNUM_NOVA_KB[chnumKey("Optimisation de géométrie et surfaces d'énergie potentielle")] = {
  intro: "Salut, c'est Nova ! On étudie les surfaces d'énergie potentielle et l'optimisation de géométrie. Demande-moi une explication ou un indice.",
  rules: [
    { test:/surface d.[ée]nergie potentielle|sep/i, replies:["La SEP E(R1,...,RM) est fonction des coordonnées nucléaires, conséquence de Born-Oppenheimer — minima et états de transition en sont les points clés."]},
    { test:/[ée]tat de transition/i, replies:["Un état de transition a exactement une valeur propre négative de la hessienne (une fréquence imaginaire) — c'est le col entre deux minima sur la SEP."]},
    { test:/[ée]nergie d.activation/i, replies:["L'énergie d'activation est la différence d'énergie entre le minimum réactif et l'état de transition adjacent — elle détermine la vitesse de réaction."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le tableau des points stationnaires.","C'est un cas précis de valeurs propres.","Exactement une négative."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé sur l'énergie d'activation.","C'est une différence entre deux points de la SEP.","Minimum réactif et état de transition."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Une seule fréquence imaginaire signifie quoi ?","Un état de transition."]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
CHNUM_CHAPTERS[chnumKey("Applications : spectres calculés et thermochimie computationnelle")] = {
  objectives: [
    "Relier les fréquences de vibration calculées à un spectre infrarouge prédit",
    "Présenter le principe du calcul des transitions électroniques (spectres UV-visible)",
    "Construire les grandeurs thermochimiques standard à partir d'un calcul de fréquences",
    "Discuter la précision et les limites des méthodes de chimie numérique"
  ],
  prereqs: ["Optimisation de géométrie et surfaces d'énergie potentielle"],
  bodyHtml: `
    <p>Ce dernier chapitre illustre comment les outils des chapitres précédents (Hartree-Fock, DFT, optimisation de géométrie, fréquences) se combinent pour prédire des observables expérimentales directement comparables aux mesures — spectres et grandeurs thermochimiques — bouclant la boucle entre théorie et expérience.</p>

    <h3>1. Spectres infrarouges calculés</h3>
    <p>Les fréquences de vibration harmoniques, déjà utilisées au chapitre 5 pour caractériser un point stationnaire, fournissent directement une prédiction du <strong>spectre infrarouge</strong> : chaque mode normal (mécanique analytique, chapitre 6, appliqué ici à une molécule) correspond à une bande d'absorption, dont l'intensité dépend de la variation du moment dipolaire le long du mode. Un facteur d'échelle empirique (typiquement 0,95-0,98) corrige systématiquement les fréquences harmoniques calculées, qui surestiment légèrement les fréquences réelles (anharmonicité négligée).</p>

    <h3>2. Spectres électroniques (UV-visible)</h3>
    <p>Contrairement aux vibrations (mouvement nucléaire sur une seule SEP), un spectre UV-visible correspond à des <strong>transitions électroniques</strong> entre différentes surfaces d'énergie potentielle. Les méthodes dédiées (TD-DFT — DFT dépendante du temps, extension du chapitre 4 utilisant les perturbations dépendant du temps de mécanique quantique non relativiste chapitre 9) calculent les énergies d'excitation verticales et les forces d'oscillateur associées, permettant de simuler un spectre d'absorption complet.</p>

    <h3>3. Grandeurs thermochimiques standard</h3>
    <p>À partir de la géométrie optimisée (chapitre 5) et des fréquences de vibration calculées, on peut construire, via les formules de la physique statistique (déjà rédigée côté Physique — fonction de partition, chapitre 3 et 4), les corrections thermiques à l'énergie électronique pure :</p>
    <div class="formula-box">$$H^\\circ(T) = E_{elec} + E_{ZPE} + E_{trans}+E_{rot}+E_{vib}(T) + RT$$</div>
    <p>où $E_{ZPE}$ est l'<strong>énergie de point zéro</strong> (mécanique quantique non relativiste, chapitre 3 : $\\frac12\\hbar\\omega$ pour chaque mode, même à $T=0$) et les autres termes proviennent directement des fonctions de partition de translation, rotation et vibration — reliant ainsi directement un calcul de chimie quantique à une enthalpie standard de formation (thermodynamique chimique, chapitre 1), comparable aux tables expérimentales.</p>

    <h3>4. Précision et limites</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — la précision chimique</span>
      L'objectif usuel de la chimie numérique quantitative est la <strong>précision chimique</strong> : une erreur inférieure à environ $1\\,\\text{kcal/mol}$ ($\\approx4\\,\\text{kJ/mol}$) sur les énergies relatives, suffisante pour discriminer entre mécanismes réactionnels concurrents ou prédire des rendements. Cette précision reste difficile à atteindre systématiquement — le choix de la méthode (fonctionnelle DFT, taille de base) et sa validation contre des données expérimentales ou des calculs de référence plus coûteux restent, encore aujourd'hui, un exercice délicat qui demande expertise et prudence.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi applique-t-on systématiquement un facteur d'échelle (< 1) aux fréquences de vibration calculées avant de les comparer à un spectre IR expérimental ?</p>
      <p><strong>Solution :</strong> le calcul de fréquences harmoniques (chapitre 5) traite chaque mode comme un oscillateur harmonique parfait, alors que le potentiel vibrationnel réel est <em>anharmonique</em> (mécanique quantique non relativiste, chapitre 3 : le puits réel n'est jamais exactement parabolique).</p>
      <p class="example-answer">L'approximation harmonique surestime systématiquement les fréquences ; le facteur d'échelle empirique corrige globalement ce biais, sans nécessiter un calcul anharmonique bien plus coûteux — un compromis pragmatique typique de toute la chimie numérique appliquée.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Spectre IR : chaque mode normal donne une bande, fréquences harmoniques corrigées par un facteur d'échelle empirique</li>
      <li>Spectre UV-visible : transitions électroniques entre surfaces, calculées par TD-DFT ou méthodes apparentées</li>
      <li>Thermochimie computationnelle : combine énergie électronique, ZPE et fonctions de partition pour retrouver $H^\\circ(T)$</li>
      <li>Précision chimique visée : $\\sim1\\,\\text{kcal/mol}$, difficile à garantir systématiquement</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Comparer directement des fréquences harmoniques calculées à un spectre expérimental sans facteur d'échelle</li>
      <li>Oublier l'énergie de point zéro $E_{ZPE}$ dans le calcul d'une grandeur thermochimique : elle est non nulle même à $T=0$</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Un facteur d'échelle est appliqué aux fréquences calculées car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum6e1" value="right">l'approximation harmonique surestime systématiquement les fréquences réelles</label>
          <label class="option"><input type="radio" name="chnum6e1" value="wrong">le calcul est toujours faux</label>
          <label class="option"><input type="radio" name="chnum6e1" value="wrong">les unités sont incorrectes</label>
          <label class="option"><input type="radio" name="chnum6e1" value="wrong">la molécule change de structure</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum6e1','chnum6fb1','Correct — c\\'est l\\'anharmonicité négligée par l\\'approximation harmonique qui justifie ce facteur correctif.','Relis l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="chnum6fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Un spectre UV-visible correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum6e2" value="wrong">des vibrations moléculaires</label>
          <label class="option"><input type="radio" name="chnum6e2" value="right">des transitions électroniques entre surfaces d'énergie potentielle</label>
          <label class="option"><input type="radio" name="chnum6e2" value="wrong">des rotations moléculaires</label>
          <label class="option"><input type="radio" name="chnum6e2" value="wrong">le mouvement des noyaux uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum6e2','chnum6fb2','Correct — contrairement aux vibrations (une seule SEP), l\\'UV-visible implique un changement d\\'état électronique.','Relis la section du cours sur les spectres électroniques.')">Vérifier</button>
        <div class="feedback" id="chnum6fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">La « précision chimique » visée en chimie numérique correspond à une erreur d'environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chnum6e3" value="right">1 kcal/mol</label>
          <label class="option"><input type="radio" name="chnum6e3" value="wrong">100 kcal/mol</label>
          <label class="option"><input type="radio" name="chnum6e3" value="wrong">0,001 kcal/mol</label>
          <label class="option"><input type="radio" name="chnum6e3" value="wrong">aucune erreur n'est tolérée</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chnum6e3','chnum6fb3','Correct — c\\'est le seuil usuel visé pour discriminer entre mécanismes réactionnels concurrents.','Relis le point clé du cours sur la précision chimique.')">Vérifier</button>
        <div class="feedback" id="chnum6fb3"></div>
      </div>
    </div>
  `
};
CHNUM_NOVA_KB[chnumKey("Applications : spectres calculés et thermochimie computationnelle")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : spectres calculés et thermochimie computationnelle. Demande-moi une explication ou un indice.",
  rules: [
    { test:/facteur d.[ée]chelle/i, replies:["Le facteur d'échelle (~0,95-0,98) corrige la surestimation systématique des fréquences harmoniques, due à l'anharmonicité négligée par le calcul."]},
    { test:/uv.?visible|td.?dft/i, replies:["Un spectre UV-visible correspond à des transitions électroniques entre surfaces d'énergie potentielle, calculées par TD-DFT (DFT dépendante du temps)."]},
    { test:/pr[ée]cision chimique/i, replies:["La précision chimique visée est ~1 kcal/mol d'erreur sur les énergies relatives — difficile à garantir systématiquement selon la méthode choisie."]},
    { test:/zpe|point z[ée]ro/i, replies:["L'énergie de point zéro EZPE=½ℏω par mode est non nulle même à T=0, indispensable dans le calcul d'une grandeur thermochimique."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis l'exemple corrigé.","Pense à l'approximation harmonique.","Elle surestime systématiquement les fréquences."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la section sur les spectres électroniques.","Ce n'est pas juste du mouvement nucléaire.","Des transitions électroniques entre surfaces."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis le point clé sur la précision chimique.","C'est un ordre de grandeur précis.","Environ 1 kcal/mol."]}
  ]
};

/* fusionne le module Chimie numérique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, CHNUM_CHAPTERS);
Object.assign(NOVA_KB, CHNUM_NOVA_KB);