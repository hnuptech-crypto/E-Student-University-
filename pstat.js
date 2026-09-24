/* =====================================================================
   CHUNK « pstat » — registre PSTAT_CHAPTERS / PSTAT_NOVA_KB
   Matière(s) : Physique|Physique statistique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   PSTAT_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — PHYSIQUE STATISTIQUE (L3 Physique Fondamentale)
   6 chapitres : description statistique et postulat fondamental, ensemble microcanonique
   et entropie de Boltzmann, ensemble canonique et fonction de partition, distribution de
   Boltzmann (gaz parfait classique), statistiques quantiques (bosons/fermions), gaz de
   photons et gaz de Fermi. Fournit le socle microscopique de la thermodynamique
   macroscopique et de la matière condensée déjà présentes sur la plateforme.
   ===================================================================================== */
const PSTAT_MATIERE = 'Physique statistique';
function pstatKey(chapterTitle){ return `Physique|${PSTAT_MATIERE}|${chapterTitle}`; }
const PSTAT_CHAPTERS = {};
const PSTAT_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
PSTAT_CHAPTERS[pstatKey("Description statistique : microétats, macroétats et postulat fondamental")] = {
  objectives: [
    "Distinguer microétat et macroétat d'un système à grand nombre de particules",
    "Énoncer le postulat fondamental de la physique statistique",
    "Comprendre pourquoi certains macroétats sont infiniment plus probables que d'autres",
    "Relier ce postulat à l'irréversibilité macroscopique"
  ],
  prereqs: ["Second principe : entropie et sens d'évolution (Thermodynamique macroscopique)", "Les postulats de la mécanique quantique"],
  bodyHtml: `
    <p>La thermodynamique macroscopique (déjà présente sur la plateforme) décrit la matière à travers quelques variables globales ($P,V,T,S$...), sans jamais faire référence aux $\\sim10^{23}$ particules qui la composent réellement. La <strong>physique statistique</strong> comble ce fossé : elle <em>dérive</em> les lois macroscopiques à partir d'un raisonnement probabiliste sur le comportement microscopique — et explique enfin <em>pourquoi</em> ces lois prennent la forme qu'on leur connaît.</p>

    <h3>1. Microétat et macroétat</h3>
    <p>Un <strong>microétat</strong> est une description complète et détaillée du système à l'échelle microscopique : en mécanique quantique, un ket $|\\psi\\rangle$ précis (ou, pour un système à $N$ particules, l'état quantique complet du système entier). Un <strong>macroétat</strong> est décrit par les seules variables macroscopiques observables ($E,V,N$...) — un macroétat donné est compatible avec un nombre <strong>gigantesque</strong> de microétats microscopiquement différents mais macroscopiquement indiscernables.</p>

    <h3>2. Le postulat fondamental</h3>
    <div class="key-point">
      <span class="eyebrow">Postulat fondamental de la physique statistique</span>
      Pour un système isolé à l'équilibre, tous les microétats accessibles compatibles avec les contraintes macroscopiques imposées (énergie $E$, volume $V$, nombre de particules $N$ fixés) sont <strong>équiprobables</strong>.
    </div>
    <p>Ce postulat, d'une simplicité trompeuse, est la pierre angulaire de toute la physique statistique — il ne se démontre pas à partir de principes plus fondamentaux (bien qu'il soit cohérent avec, et en partie justifié par, l'ergodicité des systèmes chaotiques complexes), mais ses conséquences sont vérifiées expérimentalement avec une précision extraordinaire.</p>

    <h3>3. Pourquoi certains macroétats dominent-ils écrasamment ?</h3>
    <p>Si tous les microétats sont équiprobables, la probabilité d'observer un <strong>macroétat</strong> donné est proportionnelle au <strong>nombre de microétats</strong> qui lui correspondent — son « poids statistique » $\\Omega$. Pour un système de $N\\sim10^{23}$ particules, ce nombre varie de façon <strong>extraordinairement</strong> rapide entre macroétats : le macroétat d'équilibre (le plus « désordonné », correspondant par exemple à une répartition uniforme du gaz dans tout le volume disponible) a un $\\Omega$ colossalement plus grand que tout macroétat hors d'équilibre (gaz concentré dans un coin).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — un modèle jouet</span>
      <p><strong>Énoncé :</strong> $N=4$ particules discernables, chacune pouvant être dans la moitié gauche ou droite d'une boîte. Combien de microétats correspondent au macroétat « 2 particules à gauche, 2 à droite » ? Et au macroétat « 4 particules à gauche, 0 à droite » ?</p>
      <p><strong>Solution :</strong> pour « 2-2 » : $\\binom{4}{2}=6$ microétats. Pour « 4-0 » : $\\binom{4}{0}=1$ seul microétat (toutes les particules identifiées comme étant à gauche).</p>
      <p class="example-answer">Le macroétat équilibré « 2-2 » est <strong>6 fois</strong> plus probable que « 4-0 », même avec seulement 4 particules. Avec $N\\sim10^{23}$, ce rapport devient astronomiquement plus grand : c'est cette domination écrasante du macroétat le plus probable qui explique, statistiquement, l'irréversibilité macroscopique (un gaz ne se concentre jamais spontanément dans un coin).</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">Point clé — le lien avec le second principe</span>
      Ce raisonnement donne une interprétation entièrement nouvelle du second principe de la thermodynamique (déjà rencontré en thermodynamique macroscopique) : l'évolution spontanée d'un système isolé vers l'équilibre n'est pas régie par une loi mystérieuse, mais simplement par le fait que le macroétat d'équilibre est <em>de très loin</em> le plus probable statistiquement. Le chapitre suivant précise cette idée en construisant l'entropie statistique de Boltzmann.
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Microétat : description microscopique complète ; macroétat : description via les variables macroscopiques seulement</li>
      <li>Postulat fondamental : tous les microétats accessibles d'un système isolé à l'équilibre sont équiprobables</li>
      <li>Le macroétat d'équilibre correspond à un nombre de microétats $\\Omega$ écrasamment plus grand que tout autre macroétat</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre microétat (description complète) et macroétat (description grossière, macroscopique)</li>
      <li>Croire que le postulat fondamental s'applique à un système <em>non isolé</em> : il concerne un système isolé à l'équilibre</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le postulat fondamental énonce que les microétats accessibles d'un système isolé à l'équilibre sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat1e1" value="wrong">tous impossibles sauf un</label>
          <label class="option"><input type="radio" name="pstat1e1" value="right">tous équiprobables</label>
          <label class="option"><input type="radio" name="pstat1e1" value="wrong">de probabilité décroissante avec l'énergie</label>
          <label class="option"><input type="radio" name="pstat1e1" value="wrong">inconnus</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat1e1','pstat1fb1','Correct — c\\'est l\\'énoncé exact du postulat fondamental.','Relis l\\'encadré du cours sur le postulat fondamental.')">Vérifier</button>
        <div class="feedback" id="pstat1fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Dans l'exemple des 4 particules, le macroétat « 2-2 » est plus probable que « 4-0 » car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat1e2" value="wrong">il a une énergie plus faible</label>
          <label class="option"><input type="radio" name="pstat1e2" value="right">il correspond à plus de microétats</label>
          <label class="option"><input type="radio" name="pstat1e2" value="wrong">les particules préfèrent le milieu</label>
          <label class="option"><input type="radio" name="pstat1e2" value="wrong">ce n'est pas vrai, ils sont équiprobables</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat1e2','pstat1fb2','Correct — 6 microétats contre 1 seul : c\\'est le nombre de microétats compatibles qui détermine la probabilité du macroétat.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="pstat1fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">L'irréversibilité macroscopique s'interprète statistiquement comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat1e3" value="wrong">une loi indépendante de la physique statistique</label>
          <label class="option"><input type="radio" name="pstat1e3" value="right">l'évolution vers le macroétat le plus probable (le plus grand $\\Omega$)</label>
          <label class="option"><input type="radio" name="pstat1e3" value="wrong">une illusion, tout est réversible en réalité</label>
          <label class="option"><input type="radio" name="pstat1e3" value="wrong">une conséquence de la gravité</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat1e3','pstat1fb3','Correct — c\\'est le point clé du cours reliant le postulat fondamental au second principe.','Relis le point clé du cours sur le lien avec le second principe.')">Vérifier</button>
        <div class="feedback" id="pstat1fb3"></div>
      </div>
    </div>
  `
};
PSTAT_NOVA_KB[pstatKey("Description statistique : microétats, macroétats et postulat fondamental")] = {
  intro: "Salut, moi c'est Nova ! On démarre la physique statistique avec le postulat fondamental. Demande-moi une explication ou un indice.",
  rules: [
    { test:/microétat|macro[ée]tat/i, replies:["Microétat = description microscopique complète. Macroétat = description via les variables macroscopiques (E,V,N). Un macroétat correspond à un très grand nombre de microétats."]},
    { test:/postulat fondamental/i, replies:["Le postulat fondamental : pour un système isolé à l'équilibre, tous les microétats accessibles sont équiprobables. C'est la base de toute la physique statistique."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis l'encadré du postulat fondamental.","C'est une égalité de probabilité.","Tous équiprobables."]},
    { test:/exercice\s*2/i, hint:true, replies:["Reprends le calcul avec les coefficients binomiaux.","Compare 6 et 1.","Plus de microétats = plus probable."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis le point clé sur le lien avec le second principe.","Pense au macroétat le plus probable.","L'évolution vers le macroétat le plus probable."]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
PSTAT_CHAPTERS[pstatKey("Ensemble microcanonique et entropie statistique de Boltzmann")] = {
  objectives: [
    "Définir l'ensemble microcanonique",
    "Établir la formule de Boltzmann reliant entropie et nombre de microétats",
    "Retrouver l'additivité de l'entropie à partir de la multiplicativité de Ω",
    "Relier ce cadre statistique au principe de croissance de l'entropie"
  ],
  prereqs: ["Description statistique : microétats, macroétats et postulat fondamental"],
  bodyHtml: `
    <p>Le chapitre précédent a introduit $\\Omega$, le nombre de microétats compatibles avec un macroétat donné. Ce chapitre construit, à partir de $\\Omega$, une grandeur physique directement identifiable à l'<strong>entropie</strong> thermodynamique — donnant enfin un sens microscopique concret à cette notion abstraite.</p>

    <h3>1. L'ensemble microcanonique</h3>
    <p>On appelle <strong>ensemble microcanonique</strong> la description statistique d'un système <strong>isolé</strong>, d'énergie $E$, de volume $V$ et de nombre de particules $N$ fixés (à une tolérance $\\delta E$ près, techniquement nécessaire). Le postulat fondamental (chapitre 1) s'y applique directement : tous les $\\Omega(E,V,N)$ microétats compatibles sont équiprobables.</p>

    <h3>2. La formule de Boltzmann</h3>
    <div class="key-point">
      <span class="eyebrow">Formule de Boltzmann (gravée sur sa tombe à Vienne)</span>
      $$S = k_B \\ln \\Omega$$
      où $k_B$ est la constante de Boltzmann. Cette relation, l'une des plus célèbres de toute la physique, identifie l'entropie thermodynamique $S$ (chapitre du second principe, thermodynamique macroscopique) au logarithme du nombre de microétats accessibles.
    </div>
    <p>Le choix d'un <strong>logarithme</strong> n'est pas arbitraire : c'est la seule fonction (à une constante multiplicative près) qui transforme la <strong>multiplicativité</strong> naturelle de $\\Omega$ (chapitre suivant) en <strong>additivité</strong>, propriété indispensable pour une grandeur extensive comme l'entropie (thermodynamique macroscopique, chapitre 1).</p>

    <h3>3. Additivité de l'entropie</h3>
    <p>Pour deux sous-systèmes indépendants 1 et 2 (par exemple deux gaz dans des récipients séparés, chacun isolé), le nombre de microétats du système global est le <strong>produit</strong> $\\Omega = \\Omega_1 \\times \\Omega_2$ (chaque microétat de 1 est compatible avec chaque microétat de 2, indépendamment). Avec la formule de Boltzmann :</p>
    <div class="formula-box">$$S = k_B\\ln(\\Omega_1\\Omega_2) = k_B\\ln\\Omega_1 + k_B\\ln\\Omega_2 = S_1+S_2$$</div>
    <p>On retrouve exactement l'<strong>extensivité</strong> de l'entropie, postulée sans démonstration en thermodynamique macroscopique — ici, elle découle directement de la formule de Boltzmann et de la multiplicativité de $\\Omega$.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> reprendre l'exemple des 4 particules (chapitre 1) : calculer $S$ pour le macroétat « 2-2 » et pour « 4-0 », et interpréter la différence.</p>
      <p><strong>Solution :</strong> $S_{2\\text{-}2} = k_B\\ln 6 \\approx 1{,}79\\,k_B$ ; $S_{4\\text{-}0} = k_B\\ln 1 = 0$.</p>
      <p class="example-answer">$S_{2\\text{-}2} > S_{4\\text{-}0}$ : le macroétat le plus probable (chapitre 1) est aussi celui de plus grande entropie — exactement la traduction statistique du second principe, $S$ maximale à l'équilibre pour un système isolé.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Ensemble microcanonique : système isolé, $(E,V,N)$ fixés, tous les $\\Omega$ microétats équiprobables</li>
      <li>Formule de Boltzmann : $S=k_B\\ln\\Omega$</li>
      <li>Le logarithme transforme la multiplicativité de $\\Omega$ en additivité de $S$ (extensivité)</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Oublier le logarithme et croire que $S\\propto\\Omega$ directement : c'est $\\ln\\Omega$ qui intervient</li>
      <li>Appliquer l'ensemble microcanonique à un système non isolé (voir chapitre 3 pour ce cas)</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La formule de Boltzmann s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat2e1" value="wrong">$S=k_B\\Omega$</label>
          <label class="option"><input type="radio" name="pstat2e1" value="right">$S=k_B\\ln\\Omega$</label>
          <label class="option"><input type="radio" name="pstat2e1" value="wrong">$S=\\Omega/k_B$</label>
          <label class="option"><input type="radio" name="pstat2e1" value="wrong">$S=k_B/\\Omega$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat2e1','pstat2fb1','Correct — S=kBlnΩ, la formule gravée sur la tombe de Boltzmann.','Relis l\\'encadré du cours.')">Vérifier</button>
        <div class="feedback" id="pstat2fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Pourquoi utilise-t-on un logarithme dans la formule de Boltzmann ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat2e2" value="wrong">par convention arbitraire</label>
          <label class="option"><input type="radio" name="pstat2e2" value="right">pour transformer la multiplicativité de Ω en additivité de S</label>
          <label class="option"><input type="radio" name="pstat2e2" value="wrong">pour rendre S négative</label>
          <label class="option"><input type="radio" name="pstat2e2" value="wrong">pour simplifier le calcul numérique uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat2e2','pstat2fb2','Correct — c\\'est la seule fonction qui rend S extensive, exigence physique fondamentale.','Relis la section du cours sur l\\'additivité de l\\'entropie.')">Vérifier</button>
        <div class="feedback" id="pstat2fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour le macroétat « 4-0 » de l'exemple corrigé, l'entropie vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat2e3" value="right">0</label>
          <label class="option"><input type="radio" name="pstat2e3" value="wrong">$k_B$</label>
          <label class="option"><input type="radio" name="pstat2e3" value="wrong">$k_B\\ln 6$</label>
          <label class="option"><input type="radio" name="pstat2e3" value="wrong">l'infini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat2e3','pstat2fb3','Correct — Ω=1 pour ce macroétat, donc S=kBln1=0.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="pstat2fb3"></div>
      </div>
    </div>
  `
};
PSTAT_NOVA_KB[pstatKey("Ensemble microcanonique et entropie statistique de Boltzmann")] = {
  intro: "Salut, c'est Nova ! On établit la formule de Boltzmann reliant entropie et microétats. Demande-moi une explication ou un indice.",
  rules: [
    { test:/boltzmann|s=k/i, replies:["S=kBlnΩ : la formule de Boltzmann, qui identifie l'entropie thermodynamique au logarithme du nombre de microétats accessibles."]},
    { test:/microcanonique/i, replies:["L'ensemble microcanonique décrit un système isolé à (E,V,N) fixés, où tous les microétats compatibles sont équiprobables."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis l'encadré de la formule de Boltzmann.","Il y a un logarithme.","S=kBlnΩ."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la section sur l'additivité.","Pense à ce qui transforme un produit en somme.","Le logarithme."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Ω=1 pour ce macroétat.","S=kBln1=0."]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
PSTAT_CHAPTERS[pstatKey("Ensemble canonique et fonction de partition")] = {
  objectives: [
    "Définir l'ensemble canonique pour un système en contact avec un thermostat",
    "Établir la distribution de Boltzmann à partir du postulat fondamental appliqué au système global",
    "Introduire la fonction de partition et son rôle central",
    "Retrouver l'énergie libre F à partir de la fonction de partition"
  ],
  prereqs: ["Ensemble microcanonique et entropie statistique de Boltzmann", "Identité thermodynamique et potentiels thermodynamiques (Thermodynamique macroscopique)"],
  bodyHtml: `
    <p>L'ensemble microcanonique (chapitre 2) s'applique à un système <strong>isolé</strong> — une situation académique, rarement rencontrée en pratique. Ce chapitre traite le cas bien plus courant d'un système en contact avec un <strong>thermostat</strong> à température $T$ fixée : l'<strong>ensemble canonique</strong>, l'outil le plus utilisé de toute la physique statistique.</p>

    <h3>1. Système + thermostat = un système isolé plus grand</h3>
    <p>L'astuce centrale : considérer l'ensemble {système $S$ étudié} + {thermostat $R$, un immense « réservoir » de chaleur} comme un <strong>système global isolé</strong>, auquel le postulat fondamental (chapitre 1) s'applique directement. En appliquant la formule de Boltzmann au réservoir (dont la taille tend vers l'infini) et en développant au premier ordre, on montre que la probabilité que le système $S$ soit dans un microétat particulier d'énergie $E_i$ est :</p>
    <div class="formula-box">$$\\boxed{\\ P_i = \\frac{1}{Z}\\,e^{-E_i/k_BT}\\ }$$</div>
    <p>C'est la <strong>distribution de Boltzmann</strong> (ou loi canonique) : la probabilité d'un microétat décroît <strong>exponentiellement</strong> avec son énergie, avec un taux fixé par la température.</p>

    <h3>2. La fonction de partition</h3>
    <p>Le facteur de normalisation $Z$, appelé <strong>fonction de partition</strong>, assure $\\sum_i P_i = 1$ :</p>
    <div class="formula-box">$$Z = \\sum_i e^{-E_i/k_BT}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi Z est si central</span>
      $Z$ n'est pas qu'une simple constante de normalisation : c'est un objet mathématique d'où l'on peut extraire <strong>toutes</strong> les grandeurs thermodynamiques du système, par simple dérivation — sans jamais avoir à calculer la somme statistique explicitement pour chaque grandeur d'intérêt.
    </div>

    <h3>3. Relation avec l'énergie libre $F$</h3>
    <p>Un résultat fondamental (obtenu en combinant la distribution de Boltzmann avec la formule d'entropie de Boltzmann appliquée au système $S$, calcul standard omis ici) relie directement $Z$ à l'<strong>énergie libre de Helmholtz</strong> $F$ déjà rencontrée en thermodynamique macroscopique (chapitre 4, potentiels thermodynamiques) :</p>
    <div class="formula-box">$$F = -k_BT \\ln Z$$</div>
    <p>Puisque $F$ détermine toutes les autres grandeurs thermodynamiques par dérivation ($S=-(\\partial F/\\partial T)_V$, $P=-(\\partial F/\\partial V)_T$...), connaître $Z(T,V,N)$ pour un système donné suffit, en principe, à en déduire <strong>toute</strong> sa thermodynamique — c'est le programme central de la physique statistique.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — système à deux niveaux</span>
      <p><strong>Énoncé :</strong> un système à deux microétats d'énergie $0$ et $\\varepsilon$. Calculer $Z$ et la probabilité $P_1$ du niveau excité $\\varepsilon$.</p>
      <p><strong>Solution :</strong> $Z = e^{0} + e^{-\\varepsilon/k_BT} = 1+e^{-\\varepsilon/k_BT}$. $P_1 = \\dfrac{e^{-\\varepsilon/k_BT}}{Z} = \\dfrac{e^{-\\varepsilon/k_BT}}{1+e^{-\\varepsilon/k_BT}} = \\dfrac{1}{1+e^{\\varepsilon/k_BT}}$.</p>
      <p class="example-answer">À basse température ($k_BT\\ll\\varepsilon$), $P_1\\to0$ : le système reste presque toujours dans l'état fondamental. À haute température ($k_BT\\gg\\varepsilon$), $P_1\\to\\frac12$ : les deux niveaux deviennent équiprobables — un modèle minimal, mais à la base de la description de nombreux systèmes physiques (spins, défauts cristallins...).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Ensemble canonique : système en contact avec un thermostat à $T$ fixée</li>
      <li>Distribution de Boltzmann : $P_i = e^{-E_i/k_BT}/Z$</li>
      <li>Fonction de partition $Z=\\sum_ie^{-E_i/k_BT}$, reliée à $F=-k_BT\\ln Z$ : d'où toute la thermodynamique se déduit par dérivation</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre ensemble microcanonique (système isolé) et canonique (système en contact thermique avec un réservoir)</li>
      <li>Oublier le signe $-$ dans l'exponentielle : $P_i$ décroît, pas croît, avec l'énergie</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La distribution de Boltzmann $P_i$ est proportionnelle à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat3e1" value="wrong">$E_i$</label>
          <label class="option"><input type="radio" name="pstat3e1" value="right">$e^{-E_i/k_BT}$</label>
          <label class="option"><input type="radio" name="pstat3e1" value="wrong">$e^{+E_i/k_BT}$</label>
          <label class="option"><input type="radio" name="pstat3e1" value="wrong">$1/E_i$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat3e1','pstat3fb1','Correct — Pi∝e^(−Ei/kBT), décroissante avec l\\'énergie.','Relis la formule encadrée du cours.')">Vérifier</button>
        <div class="feedback" id="pstat3fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">La fonction de partition $Z$ est reliée à l'énergie libre $F$ par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat3e2" value="wrong">$F=k_BTZ$</label>
          <label class="option"><input type="radio" name="pstat3e2" value="right">$F=-k_BT\\ln Z$</label>
          <label class="option"><input type="radio" name="pstat3e2" value="wrong">$F=Z/k_BT$</label>
          <label class="option"><input type="radio" name="pstat3e2" value="wrong">$F=\\ln Z$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat3e2','pstat3fb2','Correct — F=−kBTlnZ, la relation centrale qui permet de tout déduire de Z.','Relis la formule encadrée du cours reliant F et Z.')">Vérifier</button>
        <div class="feedback" id="pstat3fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour le système à deux niveaux, à haute température ($k_BT\\gg\\varepsilon$), $P_1$ tend vers :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat3e3" value="wrong">0</label>
          <label class="option"><input type="radio" name="pstat3e3" value="right">1/2</label>
          <label class="option"><input type="radio" name="pstat3e3" value="wrong">1</label>
          <label class="option"><input type="radio" name="pstat3e3" value="wrong">2</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat3e3','pstat3fb3','Correct — à haute température, les deux niveaux deviennent équiprobables.','Reprends l\\'exemple corrigé du cours à la limite haute température.')">Vérifier</button>
        <div class="feedback" id="pstat3fb3"></div>
      </div>
    </div>
  `
};
PSTAT_NOVA_KB[pstatKey("Ensemble canonique et fonction de partition")] = {
  intro: "Salut, c'est Nova ! On étudie l'ensemble canonique et la fonction de partition. Demande-moi une explication ou un indice.",
  rules: [
    { test:/distribution de boltzmann|Pi/i, replies:["Pi=e^(−Ei/kBT)/Z : la probabilité d'un microétat décroît exponentiellement avec son énergie."]},
    { test:/fonction de partition|\\bZ\\b/i, replies:["Z=Σe^(−Ei/kBT) permet de tout calculer par dérivation, via F=−kBTlnZ."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la formule encadrée.","C'est une exponentielle décroissante.","e^(−Ei/kBT)."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la relation F-Z du cours.","Il y a un logarithme et un signe moins.","F=−kBTlnZ."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple à haute température.","Les deux niveaux deviennent égaux.","P1→1/2."]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
PSTAT_CHAPTERS[pstatKey("Distribution de Boltzmann et gaz parfait classique")] = {
  objectives: [
    "Calculer la fonction de partition d'une particule libre dans une boîte",
    "Retrouver l'équation d'état du gaz parfait à partir de la physique statistique",
    "Établir la distribution des vitesses de Maxwell-Boltzmann",
    "Retrouver le théorème d'équipartition de l'énergie"
  ],
  prereqs: ["Ensemble canonique et fonction de partition"],
  bodyHtml: `
    <p>Ce chapitre applique le formalisme canonique (chapitre 3) au système le plus emblématique de la thermodynamique macroscopique : le <strong>gaz parfait</strong>. L'objectif est de <em>retrouver</em>, à partir des premiers principes microscopiques, l'équation d'état $PV=Nk_BT$ — jusqu'ici simplement admise ou mesurée expérimentalement.</p>

    <h3>1. Fonction de partition d'une particule libre</h3>
    <p>Pour une particule de masse $m$ libre dans une boîte de volume $V$, les niveaux d'énergie quantifiés (analogues du puits infini 3D, cours de mécanique quantique) sont si rapprochés à température ordinaire qu'on peut remplacer la somme discrète de la fonction de partition par une intégrale continue sur l'espace des phases (approximation semi-classique). Le calcul (classique, omis ici) donne :</p>
    <div class="formula-box">$$z_1 = \\frac{V}{\\lambda_T^3}, \\qquad \\lambda_T = \\sqrt{\\frac{2\\pi\\hbar^2}{mk_BT}}$$</div>
    <p>où $\\lambda_T$ est la <strong>longueur d'onde thermique de de Broglie</strong>, l'échelle caractéristique en-dessous de laquelle les effets quantiques deviennent importants (elle diminue quand $T$ augmente, retrouvant naturellement la limite classique à haute température).</p>

    <h3>2. Fonction de partition du gaz parfait et équation d'état</h3>
    <p>Pour $N$ particules indépendantes et indiscernables, $Z_N = z_1^N/N!$ (le facteur $N!$ corrige le sur-comptage dû à l'indiscernabilité quantique des particules identiques). En utilisant $F=-k_BT\\ln Z_N$ (chapitre 3) puis $P=-(\\partial F/\\partial V)_T$ (thermodynamique macroscopique, chapitre 4), on retrouve directement :</p>
    <div class="formula-box">$$\\boxed{\\ PV = Nk_BT\\ }$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      L'équation d'état du gaz parfait, connue depuis le XIX<sup>e</sup> siècle par des mesures macroscopiques, se déduit ici <strong>entièrement</strong> à partir de la seule hypothèse de particules libres et indépendantes, sans aucun ajustement empirique — l'une des grandes réussites historiques de la physique statistique naissante (Boltzmann, Gibbs, fin du XIX<sup>e</sup> siècle).
    </div>

    <h3>3. Distribution des vitesses de Maxwell-Boltzmann</h3>
    <p>Le même calcul fournit, comme sous-produit, la <strong>distribution des vitesses</strong> des molécules du gaz : la probabilité qu'une molécule ait une vitesse dans $[\\vec v,\\vec v+d\\vec v]$ est proportionnelle à $e^{-mv^2/2k_BT}$ (une gaussienne en chaque composante de vitesse) — la <strong>distribution de Maxwell-Boltzmann</strong>, qui explique quantitativement la répartition des vitesses moléculaires observée expérimentalement (jet moléculaire, effusion).</p>

    <h3>4. Théorème d'équipartition de l'énergie</h3>
    <p>Un résultat général (admis ici), valable pour tout degré de liberté apparaissant <strong>quadratiquement</strong> dans l'énergie (comme $\\frac12mv_x^2$), énonce que sa contribution moyenne à l'énergie est $\\frac12k_BT$ — le <strong>théorème d'équipartition</strong>. Pour un gaz parfait monoatomique (3 degrés de liberté de translation), $U = 3\\times\\frac12Nk_BT = \\frac32Nk_BT$, redonnant directement $C_V=\\frac32Nk_B$ — le résultat classique déjà utilisé, sans démonstration microscopique, en thermodynamique macroscopique.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi le théorème d'équipartition échoue-t-il à prédire la capacité thermique des solides à basse température (chapitre sur les phonons, matière condensée), alors qu'il fonctionne bien pour le gaz parfait ?</p>
      <p><strong>Solution :</strong> l'équipartition suppose une énergie <em>continue</em>, où l'agitation thermique $k_BT$ peut toujours exciter n'importe quel degré de liberté, aussi petite que soit sa contribution énergétique. Pour les modes de vibration d'un solide (quantifiés en phonons, $E_n=(n+\\frac12)\\hbar\\omega$), cette hypothèse échoue dès que $k_BT \\lesssim \\hbar\\omega$.</p>
      <p class="example-answer">L'équipartition n'est valable que dans la <strong>limite classique</strong> (spectre d'énergie quasi-continu à l'échelle de $k_BT$) — exactement la même limite que celle où $z_1$ se calcule par une intégrale plutôt qu'une somme discrète, au tout début de ce chapitre.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Fonction de partition d'une particule libre : $z_1=V/\\lambda_T^3$, avec $\\lambda_T$ longueur d'onde thermique</li>
      <li>Le gaz parfait $PV=Nk_BT$ se déduit entièrement du formalisme canonique, sans ajustement empirique</li>
      <li>Distribution de Maxwell-Boltzmann des vitesses : $\\propto e^{-mv^2/2k_BT}$</li>
      <li>Équipartition : chaque degré de liberté quadratique contribue $\\frac12k_BT$ — valable seulement dans la limite classique</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Oublier le facteur $N!$ dans $Z_N=z_1^N/N!$ (indiscernabilité des particules identiques)</li>
      <li>Appliquer l'équipartition à un système où l'énergie est fortement quantifiée ($k_BT\\ll\\hbar\\omega$) : elle échoue dans ce régime</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">L'équation d'état du gaz parfait $PV=Nk_BT$ se déduit de la physique statistique à partir de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat4e1" value="wrong">mesures expérimentales ajustées</label>
          <label class="option"><input type="radio" name="pstat4e1" value="right">la fonction de partition d'une particule libre, sans ajustement empirique</label>
          <label class="option"><input type="radio" name="pstat4e1" value="wrong">le second principe seul</label>
          <label class="option"><input type="radio" name="pstat4e1" value="wrong">la mécanique classique newtonienne</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat4e1','pstat4fb1','Correct — c\\'est l\\'une des grandes réussites historiques : PV=NkBT découle entièrement du formalisme canonique.','Relis le point clé du cours.')">Vérifier</button>
        <div class="feedback" id="pstat4fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Le théorème d'équipartition attribue à chaque degré de liberté quadratique une énergie moyenne de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat4e2" value="wrong">$k_BT$</label>
          <label class="option"><input type="radio" name="pstat4e2" value="right">$\\frac12 k_BT$</label>
          <label class="option"><input type="radio" name="pstat4e2" value="wrong">$2k_BT$</label>
          <label class="option"><input type="radio" name="pstat4e2" value="wrong">$k_BT^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat4e2','pstat4fb2','Correct — chaque degré de liberté quadratique contribue ½kBT.','Relis l\\'énoncé du théorème d\\'équipartition.')">Vérifier</button>
        <div class="feedback" id="pstat4fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">L'équipartition échoue pour les phonons à basse température car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat4e3" value="wrong">les phonons n'existent pas</label>
          <label class="option"><input type="radio" name="pstat4e3" value="right">le spectre d'énergie est fortement quantifié, $k_BT\\ll\\hbar\\omega$</label>
          <label class="option"><input type="radio" name="pstat4e3" value="wrong">la température devient négative</label>
          <label class="option"><input type="radio" name="pstat4e3" value="wrong">le volume devient nul</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat4e3','pstat4fb3','Correct — l\\'équipartition suppose un spectre quasi-continu, ce qui échoue dès que kBT devient petit devant ℏω.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="pstat4fb3"></div>
      </div>
    </div>
  `
};
PSTAT_NOVA_KB[pstatKey("Distribution de Boltzmann et gaz parfait classique")] = {
  intro: "Salut, moi c'est Nova ! On retrouve le gaz parfait à partir de la physique statistique. Demande-moi une explication ou un indice.",
  rules: [
    { test:/gaz parfait|PV=NkT/i, replies:["PV=NkBT se déduit entièrement de la fonction de partition d'une particule libre z1=V/λT³, sans aucun ajustement empirique — une grande réussite historique."]},
    { test:/[ée]quipartition/i, replies:["Le théorème d'équipartition : chaque degré de liberté quadratique dans l'énergie contribue ½kBT en moyenne — valable seulement dans la limite classique (spectre quasi-continu)."]},
    { test:/maxwell.?boltzmann|distribution des vitesses/i, replies:["La distribution de Maxwell-Boltzmann des vitesses est proportionnelle à e^(−mv²/2kBT), une gaussienne en chaque composante de vitesse."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le point clé du cours.","C'est une déduction, pas un ajustement.","Ça vient de la fonction de partition seule."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis l'énoncé de l'équipartition.","Il y a un facteur ½.","½kBT par degré de liberté."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Compare kBT et ℏω.","kBT devient petit devant ℏω."]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
PSTAT_CHAPTERS[pstatKey("Statistiques quantiques : bosons et fermions")] = {
  objectives: [
    "Distinguer bosons et fermions par leur comportement sous échange de particules",
    "Énoncer le principe d'exclusion de Pauli pour les fermions",
    "Établir les distributions de Fermi-Dirac et de Bose-Einstein",
    "Identifier la limite classique commune aux deux statistiques"
  ],
  prereqs: ["Distribution de Boltzmann et gaz parfait classique", "Le spin 1/2 et l'addition de moments cinétiques (Mécanique quantique non relativiste)"],
  bodyHtml: `
    <p>Le chapitre 4 a traité les particules comme <strong>discernables</strong> puis corrigé grossièrement (facteur $N!$) pour leur indiscernabilité. Ce chapitre approfondit ce point : la mécanique quantique impose une distinction fondamentale entre deux familles de particules — <strong>fermions</strong> et <strong>bosons</strong> — dont le comportement statistique diffère radicalement, avec des conséquences physiques majeures.</p>

    <h3>1. Fermions et bosons : classification par le spin</h3>
    <p>Toute particule quantique appartient à l'une de ces deux familles, selon son spin (chapitre 6 de mécanique quantique non relativiste) :</p>
    <table class="mini-table">
      <tr><th>Famille</th><th>Spin</th><th>Fonction d'onde à l'échange de 2 particules</th><th>Exemples</th></tr>
      <tr><td><strong>Fermions</strong></td><td>demi-entier ($\\frac12,\\frac32,\\ldots$)</td><td>antisymétrique</td><td>électrons, protons, neutrons</td></tr>
      <tr><td><strong>Bosons</strong></td><td>entier ($0,1,2,\\ldots$)</td><td>symétrique</td><td>photons, phonons, atomes d'hélium 4</td></tr>
    </table>

    <h3>2. Le principe d'exclusion de Pauli</h3>
    <div class="key-point">
      <span class="eyebrow">Principe d'exclusion de Pauli</span>
      Deux fermions <strong>identiques</strong> ne peuvent jamais occuper le même état quantique individuel simultanément — une conséquence directe de l'antisymétrie de leur fonction d'onde (si deux fermions occupaient le même état, la fonction d'onde totale s'annulerait identiquement).
    </div>
    <p>Ce principe, déjà exploité implicitement au chapitre 5 de la matière condensée (électron libre, sphère de Fermi), n'a <strong>aucun</strong> équivalent pour les bosons, qui peuvent au contraire s'accumuler en nombre arbitraire dans un même état — le principe à la base de la condensation de Bose-Einstein et du fonctionnement du laser.</p>

    <h3>3. Les distributions statistiques quantiques</h3>
    <p>Le nombre moyen d'occupation $\\langle n_i\\rangle$ d'un état individuel d'énergie $\\varepsilon_i$, à l'équilibre thermique avec un thermostat (et, pour un système ouvert, un réservoir de particules à potentiel chimique $\\mu$, chapitre 8 de thermodynamique macroscopique), suit deux lois distinctes :</p>
    <div class="formula-box">$$\\text{Fermi-Dirac (fermions) : } \\langle n_i\\rangle = \\frac{1}{e^{(\\varepsilon_i-\\mu)/k_BT}+1}, \\qquad \\text{Bose-Einstein (bosons) : } \\langle n_i\\rangle = \\frac{1}{e^{(\\varepsilon_i-\\mu)/k_BT}-1}$$</div>
    <p>La distribution de Fermi-Dirac vérifie toujours $\\langle n_i\\rangle \\leq 1$ (Pauli), tandis que la distribution de Bose-Einstein autorise $\\langle n_i\\rangle$ arbitrairement grand (et diverge même quand $\\varepsilon_i\\to\\mu$, à l'origine de la condensation de Bose-Einstein).</p>

    <h3>4. Limite classique commune</h3>
    <p>Dans la limite $e^{(\\varepsilon_i-\\mu)/k_BT} \\gg 1$ (faible densité de particules ou haute température — le régime « classique » implicitement supposé au chapitre 4), le « $\\pm1$ » au dénominateur devient négligeable devant l'exponentielle, et les <strong>deux</strong> distributions convergent vers la même limite :</p>
    <div class="formula-box">$$\\langle n_i\\rangle \\approx e^{-(\\varepsilon_i-\\mu)/k_BT} \\qquad \\text{(distribution de Maxwell-Boltzmann retrouvée)}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      C'est cette limite qui justifie a posteriori le traitement classique du gaz parfait au chapitre 4 : à température ambiante et densité usuelle, les gaz moléculaires ordinaires sont très loin de la dégénérescence quantique, et la distinction fermion/boson devient invisible statistiquement. Elle redevient essentielle à très basse température ou très haute densité (électrons dans un métal, chapitre suivant ; atomes ultra-froids).
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi deux électrons de même spin ne peuvent-ils jamais occuper la même orbitale atomique, alors que deux photons peuvent parfaitement occuper le même mode du champ électromagnétique (comme dans un faisceau laser cohérent) ?</p>
      <p><strong>Solution :</strong> l'électron est un fermion (spin $\\frac12$) : le principe de Pauli interdit strictement à deux fermions identiques (même état de spin inclus) d'occuper le même état quantique. Le photon est un boson (spin 1) : aucune restriction de ce type ne s'applique, $\\langle n_i\\rangle$ peut être arbitrairement grand.</p>
      <p class="example-answer">C'est exactement cette différence fondamentale qui explique, d'un côté, la structure en couches électroniques des atomes (chimie), et de l'autre, la possibilité d'un faisceau laser hautement cohérent (des milliards de photons dans le même mode).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Fermions (spin demi-entier, fonction d'onde antisymétrique) obéissent au principe d'exclusion de Pauli ; bosons (spin entier, symétrique) non</li>
      <li>Distribution de Fermi-Dirac : $\\langle n_i\\rangle=1/(e^{(\\varepsilon_i-\\mu)/k_BT}+1) \\leq 1$</li>
      <li>Distribution de Bose-Einstein : $\\langle n_i\\rangle=1/(e^{(\\varepsilon_i-\\mu)/k_BT}-1)$, sans limite supérieure</li>
      <li>Les deux convergent vers la distribution de Maxwell-Boltzmann classique à faible densité ou haute température</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre le signe $+1$ (Fermi-Dirac) et $-1$ (Bose-Einstein) au dénominateur : un piège classique</li>
      <li>Oublier que la distinction fermion/boson ne dépend que du spin, pas de la masse ou de la charge</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Une particule de spin entier est un :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat5e1" value="wrong">fermion</label>
          <label class="option"><input type="radio" name="pstat5e1" value="right">boson</label>
          <label class="option"><input type="radio" name="pstat5e1" value="wrong">ni l'un ni l'autre</label>
          <label class="option"><input type="radio" name="pstat5e1" value="wrong">les deux à la fois</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat5e1','pstat5fb1','Correct — spin entier = boson (photon, phonon...) ; spin demi-entier = fermion.','Relis le tableau du cours.')">Vérifier</button>
        <div class="feedback" id="pstat5fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Le principe d'exclusion de Pauli s'applique :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat5e2" value="wrong">aux bosons uniquement</label>
          <label class="option"><input type="radio" name="pstat5e2" value="right">aux fermions uniquement</label>
          <label class="option"><input type="radio" name="pstat5e2" value="wrong">à toutes les particules</label>
          <label class="option"><input type="radio" name="pstat5e2" value="wrong">à aucune particule</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat5e2','pstat5fb2','Correct — le principe de Pauli est spécifique aux fermions ; les bosons peuvent s\\'accumuler sans limite dans un même état.','Relis l\\'encadré du principe d\\'exclusion.')">Vérifier</button>
        <div class="feedback" id="pstat5fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">À faible densité ou haute température, les distributions de Fermi-Dirac et Bose-Einstein convergent vers :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat5e3" value="wrong">zéro</label>
          <label class="option"><input type="radio" name="pstat5e3" value="right">la distribution de Maxwell-Boltzmann classique</label>
          <label class="option"><input type="radio" name="pstat5e3" value="wrong">l'infini</label>
          <label class="option"><input type="radio" name="pstat5e3" value="wrong">elles ne convergent jamais</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat5e3','pstat5fb3','Correct — c\\'est la limite classique, qui justifie a posteriori le traitement du gaz parfait au chapitre précédent.','Relis le point clé du cours sur la limite classique.')">Vérifier</button>
        <div class="feedback" id="pstat5fb3"></div>
      </div>
    </div>
  `
};
PSTAT_NOVA_KB[pstatKey("Statistiques quantiques : bosons et fermions")] = {
  intro: "Salut, c'est Nova ! On distingue fermions et bosons, et leurs statistiques quantiques. Demande-moi une explication ou un indice.",
  rules: [
    { test:/fermion|boson/i, replies:["Fermions (spin demi-entier: électrons...) obéissent à Pauli. Bosons (spin entier: photons...) peuvent s'accumuler sans limite dans un même état."]},
    { test:/pauli/i, replies:["Le principe d'exclusion de Pauli interdit à deux fermions identiques d'occuper le même état quantique — pas de restriction pour les bosons."]},
    { test:/fermi.?dirac|bose.?einstein/i, replies:["Fermi-Dirac: ⟨ni⟩=1/(e^((εi−μ)/kBT)+1)≤1. Bose-Einstein: ⟨ni⟩=1/(e^((εi−μ)/kBT)−1), sans limite supérieure."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le tableau du cours.","Spin entier = ?","Boson."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis l'encadré du principe de Pauli.","C'est spécifique à une famille.","Fermions uniquement."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis le point clé sur la limite classique.","C'est la distribution du chapitre précédent.","Maxwell-Boltzmann."]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
PSTAT_CHAPTERS[pstatKey("Applications : rayonnement du corps noir et gaz de Fermi")] = {
  objectives: [
    "Appliquer la statistique de Bose-Einstein au gaz de photons et retrouver la loi de Planck",
    "Retrouver la loi de Stefan-Boltzmann à partir du rayonnement du corps noir",
    "Appliquer la statistique de Fermi-Dirac au gaz d'électrons libres d'un métal",
    "Relier la pression de dégénérescence de Fermi à la stabilité des naines blanches (aperçu)"
  ],
  prereqs: ["Statistiques quantiques : bosons et fermions", "Électrons dans les solides : électron libre et bandes d'énergie (Propriétés de la matière condensée)"],
  bodyHtml: `
    <p>Ce dernier chapitre applique les statistiques quantiques du chapitre 5 à deux systèmes physiques majeurs : le <strong>gaz de photons</strong> (rayonnement thermique, ou « corps noir ») et le <strong>gaz d'électrons</strong> d'un métal — deux illustrations spectaculaires de la puissance prédictive de la physique statistique, avec des applications allant de l'astrophysique à l'ingénierie thermique.</p>

    <h3>1. Le rayonnement du corps noir : loi de Planck</h3>
    <p>Le champ électromagnétique dans une cavité à l'équilibre thermique peut être décrit comme un gaz de <strong>photons</strong> (bosons de masse nulle, chapitre 5), avec un potentiel chimique $\\mu=0$ (le nombre de photons n'est pas conservé : ils sont sans cesse créés et absorbés par les parois). En appliquant la distribution de Bose-Einstein à chaque mode du champ (un mode = une pulsation $\\omega$ possible dans la cavité), on obtient la <strong>loi de Planck</strong> pour la densité spectrale d'énergie :</p>
    <div class="formula-box">$$u(\\omega,T)\\,d\\omega = \\frac{\\hbar\\omega^3}{\\pi^2c^3}\\,\\frac{1}{e^{\\hbar\\omega/k_BT}-1}\\,d\\omega$$</div>
    <p>C'est précisément cette loi — historiquement, le tout premier succès de la « quantification » (Planck, 1900), avant même la naissance de la mécanique quantique proprement dite — qui a résolu la « catastrophe ultraviolette » de la théorie classique (qui prédisait une énergie infinie).</p>

    <h3>2. Loi de Stefan-Boltzmann</h3>
    <p>En intégrant la loi de Planck sur toutes les fréquences, la puissance totale rayonnée par unité de surface d'un corps noir à température $T$ suit la <strong>loi de Stefan-Boltzmann</strong> :</p>
    <div class="formula-box">$$\\boxed{\\ \\Phi = \\sigma T^4\\ }, \\qquad \\sigma = \\frac{\\pi^2 k_B^4}{60\\hbar^3c^2}$$</div>
    <p>où $\\sigma$ (constante de Stefan-Boltzmann) se déduit <strong>entièrement</strong> des constantes fondamentales $k_B,\\hbar,c$ — sans aucun paramètre ajustable — un résultat remarquable, utilisé notamment pour estimer la température de surface des étoiles à partir de leur luminosité.</p>

    <h3>3. Le gaz d'électrons libres : distribution de Fermi-Dirac appliquée</h3>
    <p>Les électrons de conduction d'un métal (chapitre matière condensée, modèle de l'électron libre) sont des fermions ; leur nombre d'occupation moyen suit la distribution de Fermi-Dirac (chapitre 5). À $T=0$, cette distribution devient une simple fonction en escalier ($\\langle n_i\\rangle=1$ pour $\\varepsilon_i<E_F$, $0$ au-delà) — retrouvant exactement la sphère de Fermi déjà décrite qualitativement en matière condensée, ici justifiée rigoureusement par la statistique quantique.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — la pression de dégénérescence</span>
      Même à $T=0$, un gaz de fermions exerce une <strong>pression non nulle</strong> (dite « pression de dégénérescence »), purement due au principe d'exclusion de Pauli qui force les fermions à occuper des états d'énergie de plus en plus élevée à mesure que la densité augmente — sans aucune agitation thermique. Cette pression, absente pour un gaz classique ou un gaz de bosons, est ce qui contre-balance la gravité dans une <strong>naine blanche</strong> (étoile effondrée, stabilisée par la pression de dégénérescence de son gaz d'électrons) — une application directe et spectaculaire de ce chapitre à l'astrophysique.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> le Soleil a une température de surface $T\\approx 5800\\,\\text{K}$. Estimer sa puissance rayonnée par unité de surface.</p>
      <p><strong>Solution :</strong> $\\Phi = \\sigma T^4$ avec $\\sigma\\approx 5{,}67\\times10^{-8}\\,\\text{W}\\cdot\\text{m}^{-2}\\cdot\\text{K}^{-4}$ : $\\Phi \\approx 5{,}67\\times10^{-8}\\times(5800)^4$.</p>
      <p class="example-answer">$\\Phi \\approx 6{,}4\\times10^7\\,\\text{W/m}^2$ — un ordre de grandeur cohérent avec les mesures astrophysiques, obtenu ici à partir d'un modèle statistique de gaz de photons, sans aucune donnée empirique sur le Soleil lui-même autre que sa température de surface.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Loi de Planck : densité spectrale d'énergie du corps noir, dérivée de Bose-Einstein appliquée aux photons ($\\mu=0$)</li>
      <li>Loi de Stefan-Boltzmann $\\Phi=\\sigma T^4$, avec $\\sigma$ entièrement déterminée par $k_B,\\hbar,c$</li>
      <li>À $T=0$, la distribution de Fermi-Dirac redonne la sphère de Fermi (matière condensée)</li>
      <li>Pression de dégénérescence de Fermi : conséquence pure du principe de Pauli, stabilise les naines blanches</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que la pression de dégénérescence nécessite une température non nulle : elle existe même à $T=0$</li>
      <li>Confondre le rayonnement du corps noir (gaz de photons, $\\mu=0$) avec un gaz de particules massives conservées</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le potentiel chimique des photons dans un gaz de rayonnement thermique est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat6e1" value="right">nul</label>
          <label class="option"><input type="radio" name="pstat6e1" value="wrong">positif</label>
          <label class="option"><input type="radio" name="pstat6e1" value="wrong">négatif</label>
          <label class="option"><input type="radio" name="pstat6e1" value="wrong">infini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat6e1','pstat6fb1','Correct — μ=0 car le nombre de photons n\\'est pas conservé (créés et absorbés en permanence par les parois).','Relis la section du cours sur le rayonnement du corps noir.')">Vérifier</button>
        <div class="feedback" id="pstat6fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">La loi de Stefan-Boltzmann s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat6e2" value="wrong">$\\Phi=\\sigma T$</label>
          <label class="option"><input type="radio" name="pstat6e2" value="wrong">$\\Phi=\\sigma T^2$</label>
          <label class="option"><input type="radio" name="pstat6e2" value="right">$\\Phi=\\sigma T^4$</label>
          <label class="option"><input type="radio" name="pstat6e2" value="wrong">$\\Phi=\\sigma \\ln T$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat6e2','pstat6fb2','Correct — Φ=σT⁴, avec σ entièrement déterminée par les constantes fondamentales.','Relis la formule encadrée du cours.')">Vérifier</button>
        <div class="feedback" id="pstat6fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">La pression de dégénérescence d'un gaz de fermions :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pstat6e3" value="wrong">n'existe qu'à haute température</label>
          <label class="option"><input type="radio" name="pstat6e3" value="right">existe même à T=0, à cause du principe de Pauli</label>
          <label class="option"><input type="radio" name="pstat6e3" value="wrong">n'existe jamais</label>
          <label class="option"><input type="radio" name="pstat6e3" value="wrong">est identique pour les bosons</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pstat6e3','pstat6fb3','Correct — c\\'est une pression purement quantique, sans équivalent classique, qui stabilise notamment les naines blanches.','Relis le point clé du cours sur la pression de dégénérescence.')">Vérifier</button>
        <div class="feedback" id="pstat6fb3"></div>
      </div>
    </div>
  `
};
PSTAT_NOVA_KB[pstatKey("Applications : rayonnement du corps noir et gaz de Fermi")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : corps noir et gaz de Fermi, deux applications spectaculaires. Demande-moi une explication ou un indice.",
  rules: [
    { test:/planck|corps noir/i, replies:["La loi de Planck décrit le spectre du rayonnement thermique, dérivée en appliquant Bose-Einstein aux photons (μ=0). C'est le premier succès historique de la quantification (1900)."]},
    { test:/stefan.?boltzmann|sigma/i, replies:["La loi de Stefan-Boltzmann Φ=σT⁴ donne la puissance rayonnée totale par un corps noir, avec σ entièrement déduite de kB, ℏ, c."]},
    { test:/d[ée]g[ée]n[ée]rescence|naine blanche/i, replies:["La pression de dégénérescence de Fermi existe même à T=0, purement due au principe de Pauli — c'est elle qui stabilise les naines blanches contre l'effondrement gravitationnel."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la section sur le rayonnement du corps noir.","Le nombre de photons n'est pas conservé.","μ=0."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la formule encadrée.","La puissance de T est 4.","Φ=σT⁴."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis le point clé sur la pression de dégénérescence.","Pense à ce qui se passe à T=0.","Elle existe même à T=0."]}
  ]
};

/* fusionne le module Physique statistique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, PSTAT_CHAPTERS);
Object.assign(NOVA_KB, PSTAT_NOVA_KB);