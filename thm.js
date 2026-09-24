/* =====================================================================
   CHUNK « thm » — registre THM_CHAPTERS / THM_NOVA_KB
   Matière(s) : Physique|Thermodynamique macroscopique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   THM_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — THERMODYNAMIQUE MACROSCOPIQUE (L3 Physique Fondamentale)
   8 chapitres : principes fondamentaux, premier principe (énergie interne, enthalpie),
   second principe (entropie), identité thermodynamique et potentiels thermodynamiques,
   relations de Maxwell, conditions d'équilibre et de stabilité, changement d'état des
   corps purs, systèmes ouverts et potentiel chimique — conforme aux maquettes LMD de
   L3 Physique Fondamentale. Ce cours reste résolument PHÉNOMÉNOLOGIQUE (à l'échelle
   macroscopique) ; l'interprétation microscopique des mêmes grandeurs (entropie
   statistique, facteur de Boltzmann...) est développée dans la matière séparée
   « Physique statistique ». S'appuie sur les fonctions de plusieurs variables et les
   différentielles (méthodes mathématiques pour la physique).
   Rédigé sur le même modèle que les autres modules (objectives/prereqs/bodyHtml/
   extraHtml + registre NOVA_KB). Références de fond : É. Brunet, T. Hocquet, X. Leyronas,
   Cours de thermodynamique (ENS/Sorbonne Université) ; programme d'UE 3P011 —
   Thermodynamique et thermostatistique (Sorbonne Université).
   ===================================================================================== */
const THM_MATIERE = 'Thermodynamique macroscopique';
function thmKey(chapterTitle){ return `Physique|${THM_MATIERE}|${chapterTitle}`; }
const THM_CHAPTERS = {};
const THM_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
THM_CHAPTERS[thmKey("Équilibre thermodynamique, variables d'état et transformations")] = {
  objectives: [
    "Définir un système thermodynamique et distinguer variables extensives et intensives",
    "Caractériser un état d'équilibre thermodynamique",
    "Distinguer transformations quasi-statique, réversible et irréversible",
    "Manipuler les coefficients calorimétriques et thermoélastiques usuels"
  ],
  prereqs: ["Thermodynamique (L2)", "Fonctions de plusieurs variables et différentielles — Méthodes mathématiques pour la physique"],
  bodyHtml: `
    <p>Le cours de L2 a introduit les bases de la thermodynamique (premier et second principes, gaz parfait). Ce cours de L3 reprend ces fondations pour les formaliser complètement à l'échelle <strong>macroscopique</strong> — sans faire appel à la structure microscopique de la matière (réservée à la matière « Physique statistique ») — et les pousse jusqu'aux <strong>potentiels thermodynamiques</strong> et aux <strong>équilibres de phase</strong>, les outils qui permettent de traiter des situations physiques bien plus riches que le seul gaz parfait.</p>

    <h3>1. Système thermodynamique et variables d'état</h3>
    <p>Un <strong>système thermodynamique</strong> est une portion de matière ou de rayonnement délimitée par une frontière (réelle ou fictive), séparée de son <strong>milieu extérieur</strong>, avec lequel il peut échanger énergie (travail, chaleur) et éventuellement matière. On distingue système <strong>fermé</strong> (échange d'énergie seulement), <strong>ouvert</strong> (échange aussi de matière, chapitre 8) et <strong>isolé</strong> (aucun échange).</p>
    <p>Une <strong>variable d'état</strong> est une grandeur macroscopique mesurable caractérisant l'état du système à l'équilibre (pression $P$, volume $V$, température $T$, nombre de moles $n$...). On distingue :</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Définition</th><th>Exemples</th></tr>
      <tr><td><strong>Extensive</strong></td><td>proportionnelle à la « quantité de matière » du système (additive lors de la réunion de deux sous-systèmes identiques)</td><td>$V$, $n$, énergie interne $U$, entropie $S$</td></tr>
      <tr><td><strong>Intensive</strong></td><td>indépendante de la taille du système, définie localement</td><td>$P$, $T$, masse volumique $\\rho$, potentiel chimique $\\mu$ (chapitre 8)</td></tr>
    </table>

    <h3>2. Équilibre thermodynamique</h3>
    <p>Un système est à l'<strong>équilibre thermodynamique</strong> si ses variables d'état macroscopiques n'évoluent plus au cours du temps, en l'absence de toute contrainte extérieure variable. Cet équilibre global se décompose en trois équilibres partiels, tous nécessaires simultanément : <strong>équilibre thermique</strong> (température uniforme, ou égale à celle de l'extérieur si échange possible), <strong>équilibre mécanique</strong> (pression uniforme, ou forces équilibrées aux frontières), et <strong>équilibre chimique</strong> (potentiel chimique uniforme, chapitre 8, pertinent quand plusieurs phases ou espèces sont en présence).</p>

    <h3>3. Transformations : quasi-statique, réversible, irréversible</h3>
    <p>Une <strong>transformation</strong> fait passer le système d'un état d'équilibre initial à un état d'équilibre final. On distingue :</p>
    <ul>
      <li><strong>Transformation quasi-statique</strong> : une succession continue d'états <em>infiniment proches</em> de l'équilibre — le système reste, à chaque instant, quasiment à l'équilibre. C'est une idéalisation utile qui permet de définir une pression et une température bien définies à chaque instant de la transformation.</li>
      <li><strong>Transformation réversible</strong> : quasi-statique, et de plus <strong>renversable</strong> — on peut revenir en arrière en repassant exactement par les mêmes états intermédiaires, sans laisser de trace dans l'univers (système + extérieur). C'est la condition la plus exigeante.</li>
      <li><strong>Transformation irréversible</strong> : toute transformation réelle, dans laquelle apparaissent des phénomènes dissipatifs (frottements, diffusion, réactions chimiques hors équilibre) qui empêchent tout retour en arrière sans trace.</li>
    </ul>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Quasi-statique n'implique pas réversible : une détente quasi-statique contre une pression extérieure différente de la pression du système (par exemple à travers une paroi peu conductrice avec un léger frottement) peut rester quasi-statique (le système reste proche de l'équilibre à chaque instant) tout en étant irréversible (le frottement dissipe de l'énergie de façon non renversable). La réversibilité est une condition plus forte.
    </div>

    <h3>4. Coefficients calorimétriques et thermoélastiques</h3>
    <p>Pour caractériser quantitativement la réponse d'un système à de petites variations de ses variables d'état, on introduit des <strong>coefficients</strong>, mesurés expérimentalement :</p>
    <table class="mini-table">
      <tr><th>Coefficient</th><th>Définition</th><th>Nom</th></tr>
      <tr><td>$\\alpha$</td><td>$\\dfrac{1}{V}\\left(\\dfrac{\\partial V}{\\partial T}\\right)_P$</td><td>coefficient de dilatation isobare</td></tr>
      <tr><td>$\\chi_T$</td><td>$-\\dfrac{1}{V}\\left(\\dfrac{\\partial V}{\\partial P}\\right)_T$</td><td>coefficient de compressibilité isotherme</td></tr>
      <tr><td>$C_V$</td><td>$\\left(\\dfrac{\\partial U}{\\partial T}\\right)_V$</td><td>capacité thermique à volume constant</td></tr>
      <tr><td>$C_P$</td><td>$\\left(\\dfrac{\\partial H}{\\partial T}\\right)_P$</td><td>capacité thermique à pression constante</td></tr>
    </table>
    <p>Ces coefficients — définis ici de façon purement macroscopique et expérimentale — trouveront, au fil de ce cours, des relations remarquables entre eux (chapitre 5), et une interprétation microscopique complète dans le cours de physique statistique.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour un gaz parfait, $PV=nRT$. Calculer le coefficient de dilatation isobare $\\alpha$.</p>
      <p><strong>Solution :</strong> à $P$ fixé, $V = nRT/P$, donc $\\left(\\dfrac{\\partial V}{\\partial T}\\right)_P = \\dfrac{nR}{P} = \\dfrac{V}{T}$.</p>
      <p class="example-answer">$\\alpha = \\dfrac1V \\times \\dfrac{V}{T} = \\dfrac{1}{T}$ — un résultat simple et caractéristique du gaz parfait, à retenir comme référence de comparaison pour des gaz réels ou d'autres phases.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Variables extensives (proportionnelles à la quantité de matière) vs intensives (indépendantes de la taille du système)</li>
        <li>Équilibre thermodynamique = équilibres thermique + mécanique + chimique simultanés</li>
        <li>Quasi-statique (succession d'états d'équilibre) $\\neq$ réversible (en plus, renversable sans trace) : la réversibilité est plus exigeante</li>
        <li>Coefficients calorimétriques et thermoélastiques usuels : $\\alpha,\\chi_T,C_V,C_P$, mesurables expérimentalement</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre variable extensive et intensive : la température n'est jamais extensive, même si le système est deux fois plus grand</li>
        <li>Croire que quasi-statique implique automatiquement réversible : une transformation peut être quasi-statique et dissipative (donc irréversible) à la fois</li>
        <li>Confondre $C_V$ et $C_P$ : ce sont des dérivées de fonctions d'état <em>différentes</em> ($U$ et $H$), à des conditions différentes ($V$ ou $P$ constant)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Parmi les grandeurs suivantes, laquelle est extensive ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm1e1" value="wrong"> la température</label>
          <label class="option"><input type="radio" name="thm1e1" value="right"> le volume</label>
          <label class="option"><input type="radio" name="thm1e1" value="wrong"> la pression</label>
          <label class="option"><input type="radio" name="thm1e1" value="wrong"> la masse volumique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm1e1','thm1fb1','Correct — le volume double si l\\'on réunit deux systèmes identiques : c\\'est une grandeur extensive, contrairement à T, P ou ρ qui sont intensives.','Repense à ce qui se passe si tu réunis deux systèmes identiques : quelle grandeur double ?')">Vérifier</button>
        <div class="feedback" id="thm1fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une transformation quasi-statique est nécessairement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm1e2" value="wrong"> réversible</label>
          <label class="option"><input type="radio" name="thm1e2" value="right"> une succession d'états proches de l'équilibre, mais pas forcément réversible</label>
          <label class="option"><input type="radio" name="thm1e2" value="wrong"> instantanée</label>
          <label class="option"><input type="radio" name="thm1e2" value="wrong"> isotherme</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm1e2','thm1fb2','Correct — quasi-statique décrit la lenteur de la transformation (proche de l\\'équilibre à chaque instant), pas l\\'absence de dissipation : la réversibilité est une condition plus forte.','Relis le point clé du cours sur la différence entre quasi-statique et réversible.')">Vérifier</button>
        <div class="feedback" id="thm1fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour un gaz parfait, le coefficient de dilatation isobare $\\alpha$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm1e3" value="wrong"> $\\alpha = T$</label>
          <label class="option"><input type="radio" name="thm1e3" value="right"> $\\alpha = 1/T$</label>
          <label class="option"><input type="radio" name="thm1e3" value="wrong"> $\\alpha = P$</label>
          <label class="option"><input type="radio" name="thm1e3" value="wrong"> $\\alpha = 0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm1e3','thm1fb3','Correct — α=1/T, exactement le résultat de l\\'exemple corrigé du cours pour le gaz parfait.','Reprends le calcul de l\\'exemple corrigé du cours avec PV=nRT.')">Vérifier</button>
        <div class="feedback" id="thm1fb3"></div>
      </div>
    </div>
  `
};

THM_NOVA_KB[thmKey("Équilibre thermodynamique, variables d'état et transformations")] = {
  intro: "Salut, moi c'est Nova ! On reprend les bases de la thermodynamique : variables d'état, équilibre, transformations. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/extensive|intensive/i, replies:[
      "Une variable extensive (V, n, U, S) est proportionnelle à la quantité de matière ; une variable intensive (P, T, ρ) est indépendante de la taille du système."
    ]},
    { test:/quasi.?statique|r[ée]versible/i, replies:[
      "Quasi-statique = succession d'états proches de l'équilibre ; réversible = quasi-statique ET renversable sans trace. Une transformation peut être quasi-statique sans être réversible (dissipation lente)."
    ]},
    { test:/coefficient|dilatation|compressibilit[ée]/i, replies:[
      "Les coefficients usuels : α (dilatation isobare), χT (compressibilité isotherme), CV et CP (capacités thermiques). Pour un gaz parfait, α=1/T."
    ]},
    { test:/[ée]quilibre thermodynamique/i, replies:[
      "L'équilibre thermodynamique combine trois équilibres simultanés : thermique (température uniforme), mécanique (pression équilibrée), et chimique (potentiel chimique uniforme, chapitre 8)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : repense à ce qui se passe si tu réunis deux systèmes identiques.",
      "Indice niveau 2 : quelle grandeur double dans ce cas ?",
      "Indice niveau 3 : c'est le volume, une grandeur extensive."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le point clé du cours sur la différence entre quasi-statique et réversible.",
      "Indice niveau 2 : la réversibilité est une condition plus forte que la quasi-staticité.",
      "Indice niveau 3 : quasi-statique n'implique pas forcément réversible."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : reprends le calcul de l'exemple corrigé avec PV=nRT.",
      "Indice niveau 2 : calcule (∂V/∂T)P puis divise par V.",
      "Indice niveau 3 : α=1/T."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
THM_CHAPTERS[thmKey("Premier principe : énergie interne et enthalpie")] = {
  objectives: [
    "Énoncer le premier principe de la thermodynamique pour un système fermé",
    "Distinguer travail et transfert thermique (chaleur) comme deux modes d'échange d'énergie",
    "Introduire l'enthalpie et justifier son intérêt pour les transformations isobares",
    "Appliquer le premier principe à des transformations usuelles d'un gaz parfait"
  ],
  prereqs: ["Équilibre thermodynamique, variables d'état et transformations"],
  bodyHtml: `
    <p>Le <strong>premier principe</strong> de la thermodynamique exprime la conservation de l'énergie, appliquée spécifiquement aux systèmes thermodynamiques : il postule l'existence d'une fonction d'état, l'<strong>énergie interne</strong>, dont la variation ne dépend que des états initial et final — jamais du chemin suivi.</p>

    <h3>1. Énoncé du premier principe</h3>
    <p>Pour un système fermé (chapitre 1), il existe une fonction d'état extensive $U$, l'<strong>énergie interne</strong>, telle que sa variation au cours d'une transformation soit égale à la somme du <strong>travail</strong> $W$ et du <strong>transfert thermique</strong> (ou chaleur) $Q$ reçus par le système :</p>
    <div class="formula-box">$$\\Delta U = W + Q$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — fonction d'état vs grandeurs de transfert</span>
      $U$ est une <strong>fonction d'état</strong> : $\\Delta U$ ne dépend que de l'état initial et de l'état final, jamais du chemin parcouru. $W$ et $Q$, en revanche, ne sont <strong>pas</strong> des fonctions d'état : leurs valeurs individuelles dépendent du chemin suivi (seule leur somme, $\\Delta U$, en est indépendante). On note souvent cette distinction en écrivant $dU$ (différentielle exacte) mais $\\delta W,\\delta Q$ (formes différentielles quelconques, non exactes en général).
    </div>

    <h3>2. Travail des forces de pression</h3>
    <p>Pour un système fluide subissant une variation de volume $dV$ sous une pression extérieure $P_{ext}$, le travail élémentaire reçu est :</p>
    <div class="formula-box">$$\\delta W = -P_{ext}\\,dV$$</div>
    <p>Le signe $-$ traduit la convention thermodynamicienne usuelle (compter positivement ce que le système <em>reçoit</em>) : une compression ($dV<0$) fournit du travail au système ($\\delta W>0$), une détente ($dV>0$) en fournit au milieu extérieur ($\\delta W<0$ pour le système). Pour une transformation <strong>quasi-statique</strong> (chapitre 1), $P_{ext}\\approx P$ (pression du système lui-même), et $W = -\\displaystyle\\int P\\,dV$ le long du chemin suivi — c'est précisément cette dépendance au chemin qui rend $W$ non-fonction d'état.</p>

    <h3>3. L'enthalpie</h3>
    <p>Pour une transformation à <strong>pression extérieure constante</strong> $P_{ext}=P_0$ (le cas le plus fréquent en pratique : un système ouvert à l'atmosphère), le travail des forces de pression s'intègre simplement : $W = -P_0\\,\\Delta V$. Le premier principe donne alors $\\Delta U = -P_0\\Delta V + Q$, soit $Q = \\Delta(U+P_0V) = \\Delta(U+PV)$ si de plus $P=P_0$ à l'équilibre initial et final. On définit ainsi une nouvelle fonction d'état, l'<strong>enthalpie</strong> :</p>
    <div class="formula-box">$$H = U + PV$$</div>
    <p>d'où, pour une transformation <strong>isobare</strong> (à pression constante) :</p>
    <div class="formula-box">$$\\boxed{\\ \\Delta H = Q_P\\ } \\qquad \\text{(à pression constante)}$$</div>
    <div class="key-point">
      <span class="eyebrow">Pourquoi l'enthalpie est si utile</span>
      La plupart des transformations physiques et chimiques usuelles (réactions en bécher ouvert, changements d'état à l'air libre) se font à pression atmosphérique constante. L'enthalpie permet alors d'identifier <strong>directement</strong> le transfert thermique échangé à une simple variation de fonction d'état — sans avoir à calculer séparément $W$ et $Q$ — d'où son usage massif en calorimétrie et en thermochimie (enthalpies de réaction, de fusion, de vaporisation...).
    </div>

    <h3>4. Application au gaz parfait : lois de Joule</h3>
    <p>Pour un <strong>gaz parfait</strong>, deux résultats expérimentaux remarquables (les <strong>lois de Joule</strong>, admises ici) énoncent que $U$ et $H$ ne dépendent que de la température, pas du volume ni de la pression séparément :</p>
    <div class="formula-box">$$U = U(T) \\text{ seulement}, \\qquad H = H(T) \\text{ seulement}$$</div>
    <p>d'où $dU = C_V\\,dT$ et $dH=C_P\\,dT$ quelle que soit la transformation (pas seulement à $V$ ou $P$ constant), avec de plus la <strong>relation de Mayer</strong> $C_P - C_V = nR$ pour une mole de gaz parfait.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — détente isotherme réversible</span>
      <p><strong>Énoncé :</strong> $n$ moles de gaz parfait subissent une détente isotherme réversible de $V_1$ à $V_2>V_1$, à température $T$ fixée. Calculer $W$, $\\Delta U$ et $Q$.</p>
      <p><strong>Solution :</strong> transformation isotherme d'un gaz parfait $\\Rightarrow \\Delta U = 0$ (loi de Joule). Réversible $\\Rightarrow$ $W = -\\displaystyle\\int_{V_1}^{V_2} P\\,dV = -\\displaystyle\\int_{V_1}^{V_2}\\dfrac{nRT}{V}\\,dV = -nRT\\ln\\dfrac{V_2}{V_1}$ (négatif, car $V_2>V_1$ : le système fournit du travail au milieu extérieur).</p>
      <p class="example-answer">$W = -nRT\\ln(V_2/V_1) < 0$ ; $\\Delta U=0$ ; d'après le premier principe, $Q = \\Delta U - W = nRT\\ln(V_2/V_1) > 0$ : le gaz reçoit exactement la chaleur nécessaire pour compenser le travail qu'il fournit, sa température restant constante.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Premier principe : $\\Delta U = W+Q$, avec $U$ fonction d'état (mais pas $W$ ni $Q$ séparément)</li>
        <li>Travail des forces de pression : $\\delta W = -P_{ext}\\,dV$</li>
        <li>Enthalpie $H=U+PV$ : à pression constante, $\\Delta H = Q_P$ directement</li>
        <li>Gaz parfait (lois de Joule) : $U(T)$ et $H(T)$ seulement, avec $C_P-C_V=nR$ (relation de Mayer)</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le signe $-$ dans $\\delta W=-P_{ext}dV$ : une détente ($dV>0$) correspond à un travail <em>reçu négatif</em>, pas positif</li>
        <li>Appliquer $\\Delta H=Q_P$ à une transformation qui n'est pas à pression constante</li>
        <li>Confondre pression extérieure $P_{ext}$ (qui intervient toujours dans $\\delta W$) et pression du système $P$ (qui ne coïncide avec $P_{ext}$ que pour une transformation quasi-statique)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Parmi $U$, $W$, $Q$, laquelle (lesquelles) est (sont) une fonction d'état ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm2e1" value="wrong"> $W$ et $Q$ seulement</label>
          <label class="option"><input type="radio" name="thm2e1" value="right"> $U$ seulement</label>
          <label class="option"><input type="radio" name="thm2e1" value="wrong"> les trois</label>
          <label class="option"><input type="radio" name="thm2e1" value="wrong"> aucune</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm2e1','thm2fb1','Correct — seule U ne dépend que de l\\'état initial et final ; W et Q dépendent individuellement du chemin suivi.','Relis le point clé du cours sur fonction d\\'état vs grandeurs de transfert.')">Vérifier</button>
        <div class="feedback" id="thm2fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour une transformation à pression constante, le transfert thermique reçu $Q_P$ est égal à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm2e2" value="wrong"> $\\Delta U$</label>
          <label class="option"><input type="radio" name="thm2e2" value="right"> $\\Delta H$</label>
          <label class="option"><input type="radio" name="thm2e2" value="wrong"> $W$</label>
          <label class="option"><input type="radio" name="thm2e2" value="wrong"> $0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm2e2','thm2fb2','Correct — c\\'est exactement l\\'intérêt pratique de l\\'enthalpie : ΔH=QP à pression constante.','Relis la formule encadrée du cours pour ΔH à pression constante.')">Vérifier</button>
        <div class="feedback" id="thm2fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour une détente isotherme réversible d'un gaz parfait, $\\Delta U$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm2e3" value="right"> 0</label>
          <label class="option"><input type="radio" name="thm2e3" value="wrong"> $nRT$</label>
          <label class="option"><input type="radio" name="thm2e3" value="wrong"> $-nRT\\ln(V_2/V_1)$</label>
          <label class="option"><input type="radio" name="thm2e3" value="wrong"> $P\\Delta V$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm2e3','thm2fb3','Correct — pour un gaz parfait, U ne dépend que de T (loi de Joule) : une transformation isotherme a donc ΔU=0, quel que soit le chemin suivi.','Relis les lois de Joule pour le gaz parfait dans le cours.')">Vérifier</button>
        <div class="feedback" id="thm2fb3"></div>
      </div>
    </div>
  `
};

THM_NOVA_KB[thmKey("Premier principe : énergie interne et enthalpie")] = {
  intro: "Salut, c'est Nova ! On étudie le premier principe, l'énergie interne et l'enthalpie. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/premier principe/i, replies:[
      "Le premier principe s'écrit ΔU=W+Q : U est une fonction d'état (ne dépend que des états initial/final), contrairement à W et Q pris séparément (qui dépendent du chemin suivi)."
    ]},
    { test:/enthalpie/i, replies:[
      "L'enthalpie H=U+PV est très utile car, à pression constante, ΔH=QP directement — pratique pour toute transformation à l'air libre (calorimétrie, thermochimie)."
    ]},
    { test:/joule|gaz parfait/i, replies:[
      "Les lois de Joule pour le gaz parfait : U et H ne dépendent que de T, jamais de V ou P séparément. D'où dU=CVdT et dH=CPdT en toute transformation, avec CP−CV=nR (relation de Mayer)."
    ]},
    { test:/travail/i, replies:[
      "Le travail des forces de pression est δW=−Pext·dV : le signe moins traduit qu'une détente (dV>0) fournit du travail au milieu extérieur, donc un travail reçu négatif pour le système."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le point clé du cours sur fonction d'état vs grandeurs de transfert.",
      "Indice niveau 2 : une seule des trois grandeurs ne dépend pas du chemin suivi.",
      "Indice niveau 3 : c'est U seulement."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la formule encadrée du cours pour ΔH à pression constante.",
      "Indice niveau 2 : c'est exactement l'intérêt pratique de l'enthalpie.",
      "Indice niveau 3 : ΔH=QP."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis les lois de Joule pour le gaz parfait.",
      "Indice niveau 2 : U ne dépend que de T pour un gaz parfait.",
      "Indice niveau 3 : donc à T constante, ΔU=0."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
THM_CHAPTERS[thmKey("Second principe : entropie et sens d'évolution")] = {
  objectives: [
    "Énoncer le second principe de la thermodynamique et introduire l'entropie",
    "Distinguer entropie échangée et entropie créée",
    "Établir le bilan entropique et son lien avec l'irréversibilité",
    "Appliquer le second principe à des cas simples (contact thermique, machine thermique)"
  ],
  prereqs: ["Premier principe : énergie interne et enthalpie"],
  bodyHtml: `
    <p>Le premier principe (chapitre 2) autorise, en principe, toute transformation conservant l'énergie totale — y compris des transformations que l'expérience quotidienne juge absurdes (la chaleur passant spontanément d'un corps froid vers un corps chaud). Le <strong>second principe</strong>, en introduisant l'<strong>entropie</strong>, fournit le critère manquant qui distingue les transformations physiquement possibles de celles qui ne le sont pas.</p>

    <h3>1. Énoncé du second principe</h3>
    <p>Il existe une fonction d'état extensive $S$, l'<strong>entropie</strong>, dont la variation lors d'une transformation se décompose en deux contributions :</p>
    <div class="formula-box">$$\\Delta S = S_{\\text{éch}} + S_{\\text{créée}}, \\qquad S_{\\text{créée}} \\geq 0$$</div>
    <ul>
      <li><strong>Entropie échangée</strong> $S_{\\text{éch}} = \\displaystyle\\int \\dfrac{\\delta Q}{T_{ext}}$ : liée aux transferts thermiques avec l'extérieur, à la température $T_{ext}$ de la source de chaleur au moment de l'échange</li>
      <li><strong>Entropie créée</strong> $S_{\\text{créée}} \\geq 0$ : toujours <strong>positive ou nulle</strong>, elle quantifie l'irréversibilité de la transformation. Elle est <strong>nulle</strong> si et seulement si la transformation est réversible (chapitre 1).</li>
    </ul>
    <div class="key-point">
      <span class="eyebrow">Point clé — le second principe comme flèche du temps</span>
      C'est l'inégalité $S_{\\text{créée}} \\geq 0$ qui interdit certaines transformations, pourtant permises par le premier principe : elle donne un <strong>sens privilégié</strong> à l'écoulement du temps en physique macroscopique — d'où l'expression usuelle de « flèche du temps » associée à l'entropie.
    </div>

    <h3>2. Cas d'un système isolé</h3>
    <p>Pour un système <strong>isolé</strong> (chapitre 1, aucun échange avec l'extérieur), $S_{\\text{éch}}=0$ (pas de transfert thermique), donc :</p>
    <div class="formula-box">$$\\Delta S_{\\text{isolé}} = S_{\\text{créée}} \\geq 0$$</div>
    <p>L'entropie d'un système isolé ne peut donc que <strong>croître ou rester constante</strong> — jamais décroître. C'est l'énoncé le plus souvent retenu du second principe : le fameux « principe de croissance de l'entropie ». À l'équilibre thermodynamique final, l'entropie d'un système isolé est <strong>maximale</strong>, compte tenu des contraintes qui lui sont imposées — un critère puissant, exploité au chapitre 6 pour caractériser les conditions d'équilibre.</p>

    <h3>3. Bilan entropique d'un contact thermique</h3>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — contact thermique entre deux corps</span>
      <p><strong>Énoncé :</strong> deux corps identiques, de capacité thermique $C$ (constante), aux températures initiales $T_1$ et $T_2 < T_1$, sont mis en contact thermique dans une enceinte isolée, jusqu'à l'équilibre à température finale $T_f$. Trouver $T_f$ et vérifier que $\\Delta S \\geq 0$.</p>
      <p><strong>Solution :</strong> le système global (les deux corps) est isolé : conservation de l'énergie $\\Rightarrow C(T_f-T_1)+C(T_f-T_2)=0 \\Rightarrow T_f = \\dfrac{T_1+T_2}{2}$. La variation d'entropie de chaque corps s'obtient en intégrant $dS=C\\,dT/T$ le long d'une transformation fictive réversible reliant les mêmes états (l'entropie étant une fonction d'état, peu importe le chemin réel) : $\\Delta S = C\\ln\\dfrac{T_f}{T_1} + C\\ln\\dfrac{T_f}{T_2} = C\\ln\\dfrac{T_f^2}{T_1T_2}$.</p>
      <p class="example-answer">Comme $T_f=(T_1+T_2)/2$ est la moyenne <strong>arithmétique</strong> et que la moyenne arithmétique est toujours supérieure ou égale à la moyenne géométrique $\\sqrt{T_1T_2}$, on a $T_f^2 \\geq T_1T_2$, donc $\\Delta S \\geq 0$ — le second principe est vérifié, avec égalité seulement si $T_1=T_2$ (pas de transformation, donc réversible trivialement).</p>
    </div>

    <h3>4. Machines thermiques et rendement de Carnot</h3>
    <p>Une <strong>machine thermique</strong> fonctionnant en cycle entre une source chaude ($T_c$) et une source froide ($T_f<T_c$), produisant un travail $W$ à partir d'une chaleur $Q_c$ prélevée à la source chaude, a un <strong>rendement</strong> $\\eta = -W/Q_c$ (travail utile produit sur chaleur consommée). Le second principe, appliqué sur un cycle complet ($\\Delta S_{\\text{machine}}=0$ car $S$ est une fonction d'état et le cycle revient au même état), impose une limite supérieure théorique — le <strong>rendement de Carnot</strong> :</p>
    <div class="formula-box">$$\\eta \\leq \\eta_{Carnot} = 1 - \\frac{T_f}{T_c}$$</div>
    <p>avec égalité si et seulement si le cycle est réversible (cycle de Carnot). Ce résultat, entièrement issu du second principe, fixe une limite fondamentale à l'efficacité de <em>toute</em> machine thermique (moteur, centrale électrique), quelle que soit sa technologie.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Second principe : $\\Delta S = S_{\\text{éch}}+S_{\\text{créée}}$, avec $S_{\\text{créée}}\\geq 0$ (nulle ssi réversible)</li>
        <li>Système isolé : $\\Delta S \\geq 0$ (l'entropie ne peut que croître ou rester constante)</li>
        <li>Pour calculer $\\Delta S$, on peut toujours utiliser un chemin fictif réversible (S est une fonction d'état)</li>
        <li>Rendement de Carnot $\\eta_{Carnot}=1-T_f/T_c$ : limite théorique supérieure de toute machine thermique</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer $\\Delta S \\geq 0$ à un système <em>non isolé</em> : ce n'est vrai que pour le système isolé (ou l'univers entier, système + extérieur) ; un sous-système peut voir son entropie diminuer s'il évacue suffisamment d'entropie vers l'extérieur</li>
        <li>Confondre entropie échangée (peut être positive ou négative) et entropie créée (toujours $\\geq 0$)</li>
        <li>Croire que le rendement de Carnot est atteignable en pratique : c'est une limite théorique, seulement approchée par des machines réelles, jamais atteinte (frottements, irréversibilités)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'entropie créée $S_{\\text{créée}}$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm3e1" value="wrong"> toujours négative</label>
          <label class="option"><input type="radio" name="thm3e1" value="right"> toujours positive ou nulle</label>
          <label class="option"><input type="radio" name="thm3e1" value="wrong"> toujours nulle</label>
          <label class="option"><input type="radio" name="thm3e1" value="wrong"> de signe quelconque</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm3e1','thm3fb1','Correct — Scréée≥0 est l\\'énoncé même du second principe, avec égalité seulement pour une transformation réversible.','Relis l\\'énoncé du second principe dans le cours.')">Vérifier</button>
        <div class="feedback" id="thm3fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour un système isolé, l'entropie au cours du temps :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm3e2" value="wrong"> ne peut que diminuer</label>
          <label class="option"><input type="radio" name="thm3e2" value="right"> ne peut que croître ou rester constante</label>
          <label class="option"><input type="radio" name="thm3e2" value="wrong"> reste toujours constante</label>
          <label class="option"><input type="radio" name="thm3e2" value="wrong"> peut varier dans n'importe quel sens</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm3e2','thm3fb2','Correct — pour un système isolé, Séch=0, donc ΔS=Scréée≥0 : c\\'est le principe de croissance de l\\'entropie.','Relis la section du cours sur le cas d\\'un système isolé.')">Vérifier</button>
        <div class="feedback" id="thm3fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une machine thermique fonctionnant entre $T_c=600\\,\\text{K}$ et $T_f=300\\,\\text{K}$ a un rendement de Carnot maximal de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm3e3" value="wrong"> 100%</label>
          <label class="option"><input type="radio" name="thm3e3" value="right"> 50%</label>
          <label class="option"><input type="radio" name="thm3e3" value="wrong"> 200%</label>
          <label class="option"><input type="radio" name="thm3e3" value="wrong"> 0%</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm3e3','thm3fb3','Correct — ηCarnot=1−Tf/Tc=1−300/600=1−0,5=0,5, soit 50%.','Applique ηCarnot=1−Tf/Tc avec les valeurs données.')">Vérifier</button>
        <div class="feedback" id="thm3fb3"></div>
      </div>
    </div>
  `
};

THM_NOVA_KB[thmKey("Second principe : entropie et sens d'évolution")] = {
  intro: "Salut, moi c'est Nova ! On étudie le second principe et l'entropie, qui donnent un sens privilégié au temps. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/second principe|entropie cr[ée][ée]e/i, replies:[
      "Le second principe : ΔS=Séch+Screée, avec Screée≥0 toujours (nulle ssi réversible). C'est cette inégalité qui interdit certaines transformations pourtant permises par le premier principe."
    ]},
    { test:/isol[ée]/i, replies:[
      "Pour un système isolé, Séch=0 donc ΔS=Screée≥0 : l'entropie d'un système isolé ne peut que croître ou rester constante — le fameux principe de croissance de l'entropie."
    ]},
    { test:/carnot|rendement/i, replies:[
      "Le rendement de Carnot ηCarnot=1−Tf/Tc est la limite théorique supérieure de toute machine thermique, atteinte seulement pour un cycle réversible — jamais en pratique."
    ]},
    { test:/fonction d.[ée]tat.*entropie|calculer.*entropie/i, replies:[
      "Pour calculer ΔS entre deux états, on peut toujours imaginer un chemin fictif réversible reliant ces états : S étant une fonction d'état, le résultat ne dépend pas du chemin choisi."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis l'énoncé du second principe.",
      "Indice niveau 2 : c'est une inégalité, dans un sens précis.",
      "Indice niveau 3 : Screée≥0 toujours."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la section du cours sur le système isolé.",
      "Indice niveau 2 : Séch=0 pour un système isolé.",
      "Indice niveau 3 : donc ΔS≥0, l'entropie ne peut que croître."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : applique ηCarnot=1−Tf/Tc.",
      "Indice niveau 2 : calcule Tf/Tc=300/600.",
      "Indice niveau 3 : η=1−0,5=0,5, soit 50%."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
THM_CHAPTERS[thmKey("Identité thermodynamique et potentiels thermodynamiques")] = {
  objectives: [
    "Établir l'identité thermodynamique reliant U, S et V",
    "Construire les potentiels thermodynamiques F et G par transformation de Legendre",
    "Identifier les variables naturelles de chaque potentiel",
    "Choisir le potentiel adapté selon les contraintes expérimentales imposées au système"
  ],
  prereqs: ["Second principe : entropie et sens d'évolution"],
  bodyHtml: `
    <p>Les chapitres précédents ont introduit $U$ (chapitre 2) et $S$ (chapitre 3) séparément. Ce chapitre les réunit dans une seule relation fondamentale — l'<strong>identité thermodynamique</strong> — puis construit, par une méthode déjà rencontrée en mécanique analytique (la <strong>transformation de Legendre</strong>, chapitre 7 de ce cours, pour passer du lagrangien à l'hamiltonien), une famille de <strong>potentiels thermodynamiques</strong> adaptés à différentes situations expérimentales.</p>

    <h3>1. L'identité thermodynamique</h3>
    <p>En combinant le premier principe ($dU = \\delta W+\\delta Q$) et le second principe pour une transformation <strong>réversible</strong> ($\\delta Q = T\\,dS$, $S_{\\text{créée}}=0$, chapitre 3) avec $\\delta W=-P\\,dV$ (chapitre 2), on obtient, pour un système fermé à composition fixée :</p>
    <div class="formula-box">$$\\boxed{\\ dU = T\\,dS - P\\,dV\\ }$$</div>
    <p>C'est l'<strong>identité thermodynamique</strong> (ou relation de Gibbs). Bien qu'établie à partir d'une transformation réversible, cette relation reste valable pour relier les variations de fonctions d'état entre deux états d'équilibre <strong>quelconques</strong> — réversible ou non — puisque $U$, $S$ et $V$ sont des fonctions d'état : c'est une relation entre différentielles de fonctions d'état, indépendante du chemin.</p>
    <p>Cette écriture révèle les <strong>variables naturelles</strong> de $U$ : c'est en fonction de $S$ et $V$ que $U$ s'exprime le plus simplement, avec $T=(\\partial U/\\partial S)_V$ et $-P=(\\partial U/\\partial V)_S$.</p>

    <h3>2. Le problème pratique : $S$ n'est pas facile à contrôler</h3>
    <p>En pratique expérimentale, on contrôle bien plus souvent la <strong>température</strong> $T$ (thermostat) que l'entropie $S$ (qui n'est pas directement mesurable ni imposable). Travailler avec $U(S,V)$ est donc peu pratique dans les situations courantes (transformation isotherme, isobare). La <strong>transformation de Legendre</strong> permet de construire de nouvelles fonctions d'état, dont les variables naturelles sont mieux adaptées à ces contraintes expérimentales.</p>

    <h3>3. L'énergie libre de Helmholtz $F$</h3>
    <p>On définit $F = U - TS$ (transformation de Legendre par rapport à $S$, échangeant $S$ contre sa variable conjuguée $T$). En différentiant et en utilisant l'identité thermodynamique :</p>
    <div class="formula-box">$$dF = dU - T\\,dS - S\\,dT = -S\\,dT - P\\,dV$$</div>
    <p>Les variables naturelles de $F$ sont donc $(T,V)$ : $F$ est le potentiel adapté aux transformations à <strong>température et volume constants</strong> (système en contact avec un thermostat, à volume fixé). On montre, à partir du second principe, que $F$ ne peut que <strong>décroître</strong> au cours d'une transformation spontanée à $T,V$ fixés, et qu'elle est <strong>minimale</strong> à l'équilibre sous ces contraintes.</p>

    <h3>4. L'enthalpie libre de Gibbs $G$</h3>
    <p>On définit $G = H - TS = U+PV-TS$ (transformation de Legendre par rapport à $S$ <em>et</em> $V$). En différentiant :</p>
    <div class="formula-box">$$dG = -S\\,dT + V\\,dP$$</div>
    <p>Les variables naturelles de $G$ sont $(T,P)$ : c'est le potentiel adapté aux transformations à <strong>température et pression constantes</strong> — de loin la situation la plus fréquente en chimie et en physique des matériaux (laboratoire ouvert à l'air, pression atmosphérique constante). De même que $F$, $G$ décroît spontanément et est minimale à l'équilibre, à $T,P$ fixés.</p>

    <table class="mini-table">
      <tr><th>Potentiel</th><th>Définition</th><th>Variables naturelles</th><th>Contrainte expérimentale adaptée</th></tr>
      <tr><td>$U$</td><td>—</td><td>$(S,V)$</td><td>système isolé</td></tr>
      <tr><td>$H=U+PV$</td><td>Legendre / $V$</td><td>$(S,P)$</td><td>transformation isobare (chapitre 2)</td></tr>
      <tr><td>$F=U-TS$</td><td>Legendre / $S$</td><td>$(T,V)$</td><td>thermostat, volume fixé</td></tr>
      <tr><td>$G=U+PV-TS$</td><td>Legendre / $S,V$</td><td>$(T,P)$</td><td>thermostat et pression fixés (le cas le plus courant)</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé — même logique qu'en mécanique analytique</span>
      Cette construction est mathématiquement identique à celle qui, en mécanique analytique, permet de passer du lagrangien $L(q,\\dot q)$ à l'hamiltonien $H(q,p)=\\dot qp-L$ : dans les deux cas, une transformation de Legendre remplace une variable (ici $S$ ou $V$) par sa variable conjuguée (ici $T$ ou $-P$), pour obtenir un potentiel dont les variables naturelles sont plus commodes à contrôler expérimentalement.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> à partir de $dG=-S\\,dT+V\\,dP$, retrouver l'expression de $S$ et $V$ en fonction de $G$.</p>
      <p><strong>Solution :</strong> par identification directe de la différentielle (comme pour $dU$ au chapitre 1), $S = -\\left(\\dfrac{\\partial G}{\\partial T}\\right)_P$ et $V = \\left(\\dfrac{\\partial G}{\\partial P}\\right)_T$.</p>
      <p class="example-answer">Connaître $G(T,P)$ pour un système donné permet donc de retrouver <em>toutes</em> ses autres propriétés thermodynamiques par simple dérivation — c'est tout l'intérêt pratique des potentiels thermodynamiques, exploité systématiquement au chapitre suivant.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Identité thermodynamique : $dU = T\\,dS - P\\,dV$, valable entre états d'équilibre quelconques</li>
        <li>Énergie libre $F=U-TS$, variables naturelles $(T,V)$, $dF=-S\\,dT-P\\,dV$</li>
        <li>Enthalpie libre $G=U+PV-TS$, variables naturelles $(T,P)$, $dG=-S\\,dT+V\\,dP$ — le potentiel le plus utilisé en pratique</li>
        <li>Chaque potentiel est minimal à l'équilibre, sous les contraintes correspondant à ses variables naturelles fixées</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser $F$ pour une transformation à pression constante (c'est $G$ qu'il faut utiliser) ou l'inverse</li>
        <li>Oublier que l'identité thermodynamique, bien qu'établie via une transformation réversible, relie des fonctions d'état et reste donc valable en toute généralité</li>
        <li>Confondre les signes dans les différentielles de $F$ et $G$ (le signe devant $S\\,dT$ est toujours négatif, celui devant $P\\,dV$ ou $V\\,dP$ dépend du potentiel)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'identité thermodynamique s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm4e1" value="wrong"> $dU = P\\,dS - T\\,dV$</label>
          <label class="option"><input type="radio" name="thm4e1" value="right"> $dU = T\\,dS - P\\,dV$</label>
          <label class="option"><input type="radio" name="thm4e1" value="wrong"> $dU = -T\\,dS + P\\,dV$</label>
          <label class="option"><input type="radio" name="thm4e1" value="wrong"> $dU = S\\,dT - V\\,dP$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm4e1','thm4fb1','Correct — dU=TdS−PdV, obtenue en combinant les deux principes pour une transformation réversible.','Relis la formule encadrée du cours pour l\\'identité thermodynamique.')">Vérifier</button>
        <div class="feedback" id="thm4fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le potentiel thermodynamique adapté à une transformation à température et pression constantes est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm4e2" value="wrong"> $U$</label>
          <label class="option"><input type="radio" name="thm4e2" value="wrong"> $F$</label>
          <label class="option"><input type="radio" name="thm4e2" value="right"> $G$</label>
          <label class="option"><input type="radio" name="thm4e2" value="wrong"> $S$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm4e2','thm4fb2','Correct — G a pour variables naturelles (T,P), exactement les contraintes expérimentales les plus courantes.','Relis le tableau du cours associant chaque potentiel à ses variables naturelles.')">Vérifier</button>
        <div class="feedback" id="thm4fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La construction des potentiels $F$ et $G$ à partir de $U$ utilise la même méthode mathématique que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm4e3" value="wrong"> l'équation de Schrödinger</label>
          <label class="option"><input type="radio" name="thm4e3" value="right"> le passage du lagrangien à l'hamiltonien en mécanique analytique</label>
          <label class="option"><input type="radio" name="thm4e3" value="wrong"> le théorème de Pythagore</label>
          <label class="option"><input type="radio" name="thm4e3" value="wrong"> la loi de Newton</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm4e3','thm4fb3','Correct — c\\'est la même transformation de Legendre qui relie L(q,q̇) à H(q,p) en mécanique analytique, et U(S,V) à F(T,V) ou G(T,P) en thermodynamique.','Relis le point clé du cours faisant le lien avec la mécanique analytique.')">Vérifier</button>
        <div class="feedback" id="thm4fb3"></div>
      </div>
    </div>
  `
};

THM_NOVA_KB[thmKey("Identité thermodynamique et potentiels thermodynamiques")] = {
  intro: "Salut, c'est Nova ! On construit l'identité thermodynamique et les potentiels F et G par transformation de Legendre. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/identit[ée] thermodynamique/i, replies:[
      "L'identité thermodynamique dU=TdS−PdV combine les deux principes ; elle reste valable entre deux états d'équilibre quelconques, pas seulement pour une transformation réversible."
    ]},
    { test:/[ée]nergie libre|helmholtz|\\bF\\b/i, replies:[
      "F=U−TS (énergie libre de Helmholtz) a pour variables naturelles (T,V) : c'est le potentiel adapté à un système en contact avec un thermostat, à volume fixé."
    ]},
    { test:/enthalpie libre|gibbs|\\bG\\b/i, replies:[
      "G=U+PV−TS (enthalpie libre de Gibbs) a pour variables naturelles (T,P) : c'est le potentiel le plus utilisé en pratique, adapté aux conditions de laboratoire (T,P fixées)."
    ]},
    { test:/legendre/i, replies:[
      "La transformation de Legendre remplace une variable par sa variable conjuguée — c'est exactement la même méthode qui transforme le lagrangien en hamiltonien en mécanique analytique."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la formule encadrée du cours pour l'identité thermodynamique.",
      "Indice niveau 2 : c'est TdS moins quelque chose.",
      "Indice niveau 3 : dU=TdS−PdV."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le tableau du cours associant chaque potentiel à ses variables naturelles.",
      "Indice niveau 2 : cherche le potentiel dont les variables sont (T,P).",
      "Indice niveau 3 : c'est G."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis le point clé du cours faisant le lien avec la mécanique analytique.",
      "Indice niveau 2 : ça concerne le passage entre deux fonctions liées par transformation de Legendre.",
      "Indice niveau 3 : c'est le passage du lagrangien à l'hamiltonien."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
THM_CHAPTERS[thmKey("Relations de Maxwell et coefficients thermoélastiques")] = {
  objectives: [
    "Établir les relations de Maxwell à partir de l'égalité des dérivées croisées des potentiels",
    "Utiliser les relations de Maxwell pour relier des grandeurs a priori indépendantes",
    "Relier les coefficients calorimétriques du chapitre 1 aux dérivées des potentiels",
    "Exprimer la différence CP − CV en fonction de coefficients mesurables"
  ],
  prereqs: ["Identité thermodynamique et potentiels thermodynamiques"],
  bodyHtml: `
    <p>Chaque potentiel thermodynamique du chapitre précédent est une <strong>différentielle exacte</strong> — une conséquence directe du fait que $U,H,F,G$ sont des fonctions d'état. Ce simple fait mathématique, combiné au théorème de Schwarz sur l'égalité des dérivées croisées, engendre les <strong>relations de Maxwell</strong> : des égalités a priori surprenantes entre des grandeurs qui semblent, à première vue, sans rapport direct.</p>

    <h3>1. Rappel : différentielle exacte et théorème de Schwarz</h3>
    <p>Pour une fonction $\\psi(x,y)$ de différentielle $d\\psi = A(x,y)\\,dx + B(x,y)\\,dy$, le théorème de Schwarz impose (cours de méthodes mathématiques pour la physique) :</p>
    <div class="formula-box">$$\\left(\\frac{\\partial A}{\\partial y}\\right)_x = \\left(\\frac{\\partial B}{\\partial x}\\right)_y$$</div>
    <p>C'est cette condition, appliquée successivement à $U(S,V)$, $H(S,P)$, $F(T,V)$ et $G(T,P)$ (chapitre 4), qui engendre les quatre relations de Maxwell.</p>

    <h3>2. Les quatre relations de Maxwell</h3>
    <p>En appliquant le théorème de Schwarz à $dG=-S\\,dT+V\\,dP$ par exemple : $\\left(\\dfrac{\\partial(-S)}{\\partial P}\\right)_T = \\left(\\dfrac{\\partial V}{\\partial T}\\right)_P$, d'où l'une des quatre relations. En procédant de même pour $U$, $H$ et $F$ :</p>
    <table class="mini-table">
      <tr><th>Potentiel</th><th>Relation de Maxwell</th></tr>
      <tr><td>$U(S,V)$</td><td>$\\left(\\dfrac{\\partial T}{\\partial V}\\right)_S = -\\left(\\dfrac{\\partial P}{\\partial S}\\right)_V$</td></tr>
      <tr><td>$H(S,P)$</td><td>$\\left(\\dfrac{\\partial T}{\\partial P}\\right)_S = \\left(\\dfrac{\\partial V}{\\partial S}\\right)_P$</td></tr>
      <tr><td>$F(T,V)$</td><td>$\\left(\\dfrac{\\partial S}{\\partial V}\\right)_T = \\left(\\dfrac{\\partial P}{\\partial T}\\right)_V$</td></tr>
      <tr><td>$G(T,P)$</td><td>$\\left(\\dfrac{\\partial S}{\\partial P}\\right)_T = -\\left(\\dfrac{\\partial V}{\\partial T}\\right)_P$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi c'est si utile</span>
      Ces relations permettent de remplacer une dérivée impliquant l'<strong>entropie</strong> $S$ (difficile à mesurer directement) par une dérivée impliquant seulement $P,V,T$ (facilement mesurables) — ou inversement. C'est un outil de calcul très puissant pour établir des relations entre grandeurs mesurables, sans jamais avoir à mesurer $S$ elle-même.
    </div>

    <h3>3. Application : relation de Mayer généralisée</h3>
    <p>Un exemple d'application classique des relations de Maxwell consiste à établir la différence $C_P-C_V$ pour un système <strong>quelconque</strong> (pas seulement le gaz parfait, où l'on avait admis $C_P-C_V=nR$ au chapitre 2). Un calcul standard, combinant la relation de Maxwell issue de $F(T,V)$ et la définition de $\\alpha,\\chi_T$ (chapitre 1), donne le résultat général :</p>
    <div class="formula-box">$$C_P - C_V = \\frac{T\\,V\\,\\alpha^2}{\\chi_T}$$</div>
    <p>Cette relation, valable pour <em>tout</em> système fluide (pas seulement le gaz parfait), redonne bien $C_P-C_V=nR$ dans le cas particulier du gaz parfait ($\\alpha=1/T$, chapitre 1, et $\\chi_T=1/P$ pour le gaz parfait) — mais elle s'applique aussi à un liquide, un solide, ou un gaz réel, dont les coefficients $\\alpha,\\chi_T$ sont mesurés expérimentalement.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> retrouver $C_P-C_V=nR$ pour le gaz parfait à partir de la formule générale, sachant $\\alpha=1/T$ (chapitre 1) et $\\chi_T=1/P$ (calcul analogue, à partir de $V=nRT/P$).</p>
      <p><strong>Solution :</strong> $C_P-C_V = \\dfrac{TV\\alpha^2}{\\chi_T} = TV\\times\\dfrac{1}{T^2}\\times P = \\dfrac{PV}{T}$.</p>
      <p class="example-answer">Avec $PV=nRT$, on obtient $C_P-C_V = \\dfrac{nRT}{T}=nR$ — on retrouve exactement la relation de Mayer, désormais comprise comme un cas particulier d'une loi bien plus générale, valable pour tout système thermodynamique.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Les relations de Maxwell résultent de l'égalité des dérivées croisées (théorème de Schwarz) appliquée à chaque potentiel thermodynamique</li>
        <li>Elles permettent de remplacer une dérivée impliquant $S$ (difficile à mesurer) par une dérivée impliquant $P,V,T$ (mesurables)</li>
        <li>Relation générale $C_P-C_V = TV\\alpha^2/\\chi_T$, valable pour tout système fluide, redonnant $nR$ pour le gaz parfait</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Se tromper de signe dans une relation de Maxwell : certaines ont un signe $-$, d'autres non — il faut toujours les redériver ou les vérifier soigneusement</li>
        <li>Oublier que $C_P-C_V=nR$ est un cas particulier du gaz parfait, pas une loi universelle (la formule générale fait intervenir $\\alpha$ et $\\chi_T$)</li>
        <li>Confondre quelle variable est maintenue constante dans chaque dérivée partielle (le sous-indice a toute son importance)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Les relations de Maxwell découlent directement de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm5e1" value="wrong"> le premier principe seul</label>
          <label class="option"><input type="radio" name="thm5e1" value="right"> l'égalité des dérivées croisées d'une différentielle exacte (théorème de Schwarz)</label>
          <label class="option"><input type="radio" name="thm5e1" value="wrong"> la loi des gaz parfaits</label>
          <label class="option"><input type="radio" name="thm5e1" value="wrong"> le principe zéro de la thermodynamique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm5e1','thm5fb1','Correct — c\\'est le théorème de Schwarz, appliqué au fait que U, H, F, G sont des fonctions d\\'état (différentielles exactes), qui engendre les relations de Maxwell.','Relis l\\'introduction du cours sur l\\'origine mathématique des relations de Maxwell.')">Vérifier</button>
        <div class="feedback" id="thm5fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'intérêt principal des relations de Maxwell est de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm5e2" value="wrong"> remplacer une mesure de pression par une mesure de volume</label>
          <label class="option"><input type="radio" name="thm5e2" value="right"> remplacer une dérivée impliquant l'entropie par une dérivée impliquant seulement P, V, T</label>
          <label class="option"><input type="radio" name="thm5e2" value="wrong"> calculer directement la température</label>
          <label class="option"><input type="radio" name="thm5e2" value="wrong"> mesurer la masse du système</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm5e2','thm5fb2','Correct — c\\'est exactement le point clé du cours : contourner la difficulté de mesurer S directement.','Relis le point clé du cours sur l\\'utilité pratique des relations de Maxwell.')">Vérifier</button>
        <div class="feedback" id="thm5fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La formule générale $C_P-C_V=TV\\alpha^2/\\chi_T$ appliquée au gaz parfait redonne :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm5e3" value="wrong"> $C_P-C_V=0$</label>
          <label class="option"><input type="radio" name="thm5e3" value="right"> $C_P-C_V=nR$</label>
          <label class="option"><input type="radio" name="thm5e3" value="wrong"> $C_P-C_V=nRT$</label>
          <label class="option"><input type="radio" name="thm5e3" value="wrong"> $C_P-C_V=P$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm5e3','thm5fb3','Correct — c\\'est exactement le résultat de l\\'exemple corrigé du cours, la relation de Mayer retrouvée comme cas particulier.','Reprends le calcul de l\\'exemple corrigé du cours avec α=1/T et χT=1/P.')">Vérifier</button>
        <div class="feedback" id="thm5fb3"></div>
      </div>
    </div>
  `
};

THM_NOVA_KB[thmKey("Relations de Maxwell et coefficients thermoélastiques")] = {
  intro: "Salut, c'est Nova ! On établit les relations de Maxwell, un outil puissant pour relier des grandeurs thermodynamiques mesurables. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/maxwell/i, replies:[
      "Les relations de Maxwell viennent de l'égalité des dérivées croisées (théorème de Schwarz) appliquée à U, H, F, G — elles permettent de remplacer une dérivée impliquant S par une dérivée impliquant seulement P, V, T."
    ]},
    { test:/schwarz|d[ée]riv[ée]es crois[ée]es/i, replies:[
      "Pour une différentielle exacte dψ=Adx+Bdy, le théorème de Schwarz impose (∂A/∂y)x=(∂B/∂x)y — c'est la source mathématique de toutes les relations de Maxwell."
    ]},
    { test:/cp.?cv|mayer/i, replies:[
      "La formule générale CP−CV=TVα²/χT est valable pour tout système fluide, et redonne CP−CV=nR (relation de Mayer) dans le cas particulier du gaz parfait."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis l'introduction du cours sur l'origine mathématique des relations de Maxwell.",
      "Indice niveau 2 : ça concerne une propriété des dérivées partielles d'une fonction d'état.",
      "Indice niveau 3 : c'est le théorème de Schwarz (égalité des dérivées croisées)."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le point clé du cours sur l'utilité pratique.",
      "Indice niveau 2 : ça concerne une grandeur difficile à mesurer directement.",
      "Indice niveau 3 : c'est l'entropie S, remplacée par des dérivées de P, V, T."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : reprends le calcul de l'exemple corrigé avec α=1/T et χT=1/P.",
      "Indice niveau 2 : simplifie TVα²/χT avec ces expressions.",
      "Indice niveau 3 : tu retrouves CP−CV=nR."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
THM_CHAPTERS[thmKey("Conditions d'équilibre et de stabilité thermodynamique")] = {
  objectives: [
    "Établir les conditions générales d'équilibre thermodynamique sous différentes contraintes",
    "Relier minimum d'un potentiel et stabilité de l'équilibre",
    "Déduire des conditions de stabilité mécanique et thermique (signes de χT et CV)",
    "Interpréter physiquement une instabilité thermodynamique"
  ],
  prereqs: ["Relations de Maxwell et coefficients thermoélastiques"],
  bodyHtml: `
    <p>Le second principe (chapitre 3) a montré que l'entropie d'un système isolé est maximale à l'équilibre. Ce chapitre généralise ce résultat aux potentiels du chapitre 4 ($F$, $G$), sous d'autres contraintes expérimentales, puis en tire des conditions de <strong>stabilité</strong> — des inégalités que doit nécessairement vérifier tout système à l'équilibre stable, avec des conséquences physiques immédiates et parfois surprenantes.</p>

    <h3>1. Principe de minimum d'énergie généralisé</h3>
    <p>Pour un système isolé, on a montré (chapitre 3) que $S$ est maximale à l'équilibre. Un raisonnement analogue, appliqué cette fois à un système en contact avec un thermostat à $T$ fixée (à volume fixé), montre que c'est l'énergie libre $F$ qui est <strong>minimale</strong> à l'équilibre :</p>
    <div class="key-point">
      <span class="eyebrow">Principes de minimum (résumé)</span>
      <ul style="margin:6px 0 0 18px; padding:0;">
        <li>Système isolé (S,V fixés) : $S$ est <strong>maximale</strong> à l'équilibre</li>
        <li>Système à $T,V$ fixés (thermostat) : $F$ est <strong>minimale</strong> à l'équilibre</li>
        <li>Système à $T,P$ fixés (thermostat + piston) : $G$ est <strong>minimale</strong> à l'équilibre</li>
      </ul>
    </div>
    <p>Ces trois énoncés sont en réalité une seule et même idée physique, exprimée sous trois formes équivalentes selon les contraintes imposées au système — exactement comme les trois formes de la loi de Hooke isotrope (mécanique des solides déformables) sont une seule et même relation, exprimée avec des constantes différentes selon l'essai considéré.</p>

    <h3>2. De la condition d'extremum à la condition de stabilité</h3>
    <p>Un extremum ne garantit pas, à lui seul, un équilibre <strong>stable</strong> : de même qu'en mécanique (petites oscillations, mécanique analytique, chapitre 6), il faut vérifier qu'il s'agit bien d'un <strong>minimum</strong> (et non d'un maximum ou d'un point-selle) de l'énergie libre ou de l'enthalpie libre appropriée, ce qui se traduit par des conditions sur les <strong>dérivées secondes</strong> de ces potentiels.</p>

    <h3>3. Stabilité mécanique : signe de la compressibilité</h3>
    <p>La condition de stabilité par rapport aux fluctuations de volume, appliquée à $F(T,V)$, impose que $F$ soit une fonction <strong>convexe</strong> de $V$ à $T$ fixée : $(\\partial^2F/\\partial V^2)_T > 0$. Compte tenu de $(\\partial F/\\partial V)_T=-P$ (chapitre 4), cette condition se réécrit :</p>
    <div class="formula-box">$$\\left(\\frac{\\partial P}{\\partial V}\\right)_T < 0 \\quad \\Longleftrightarrow \\quad \\chi_T > 0$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — signification physique de $\\chi_T>0$</span>
      Cette condition (chapitre 1) traduit une <strong>stabilité mécanique</strong> évidente : si l'on comprime légèrement un système stable (volume qui diminue, $dV<0$), sa pression doit <strong>augmenter</strong> (pour repousser vers l'équilibre initial) — pas diminuer. Un système avec $\\chi_T<0$ serait mécaniquement instable : la moindre fluctuation de volume s'amplifierait spontanément, plutôt que d'être ramenée vers l'équilibre. C'est exactement cette instabilité qui se manifeste, par exemple, dans la zone interdite d'un diagramme $(P,V)$ lors d'une transition de phase (chapitre 7).
    </div>

    <h3>4. Stabilité thermique : signe de la capacité thermique</h3>
    <p>Un raisonnement analogue, appliqué cette fois aux fluctuations d'entropie (ou de température) à volume fixé, impose :</p>
    <div class="formula-box">$$C_V > 0$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — signification physique de $C_V>0$</span>
      Si un système stable reçoit spontanément un peu de chaleur (par une fluctuation thermique), sa température doit <strong>augmenter</strong> — pas diminuer. Un système avec $C_V<0$ serait thermiquement instable : plus il recevrait de chaleur, plus il refroidirait, ce qui l'inciterait à en recevoir encore davantage — un emballement incontrôlable, jamais observé pour un système à l'équilibre stable.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi la portion « en S » de certaines isothermes théoriques du modèle de van der Waals (où $(\\partial P/\\partial V)_T>0$ sur un intervalle) n'est-elle jamais observée expérimentalement telle quelle ?</p>
      <p><strong>Solution :</strong> sur cette portion, $\\chi_T<0$ : le système y serait mécaniquement instable, en violation directe de la condition de stabilité établie dans ce chapitre.</p>
      <p class="example-answer">Le système réel ne suit jamais cette portion instable : il se sépare en deux phases coexistantes (liquide et vapeur), chacune stable séparément, remplaçant la portion instable par un palier de pression constante — c'est précisément l'objet du chapitre suivant, le changement d'état.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Selon les contraintes imposées, le potentiel adapté est extremal à l'équilibre : $S$ maximale (isolé), $F$ minimale ($T,V$ fixés), $G$ minimale ($T,P$ fixés)</li>
        <li>Stabilité mécanique : $\\chi_T > 0$ (compresser doit augmenter la pression)</li>
        <li>Stabilité thermique : $C_V > 0$ (recevoir de la chaleur doit augmenter la température)</li>
        <li>Une région où ces conditions sont violées correspond à un état physiquement non observable — le système se sépare en phases stables (chapitre 7)</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre extremum et minimum : un potentiel thermodynamique doit être <em>minimal</em> (pas seulement stationnaire) à l'équilibre stable, sous ses contraintes naturelles</li>
        <li>Oublier que le potentiel pertinent dépend des contraintes imposées : $S$ pour un système isolé, $F$ ou $G$ sinon</li>
        <li>Croire que $\\chi_T<0$ ou $C_V<0$ décrivent un système réel à l'équilibre : ce sont des signatures d'instabilité, jamais observées telles quelles expérimentalement</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour un système en contact avec un thermostat à volume fixé, le potentiel qui doit être minimal à l'équilibre est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm6e1" value="wrong"> $S$</label>
          <label class="option"><input type="radio" name="thm6e1" value="right"> $F$</label>
          <label class="option"><input type="radio" name="thm6e1" value="wrong"> $G$</label>
          <label class="option"><input type="radio" name="thm6e1" value="wrong"> $H$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm6e1','thm6fb1','Correct — F, dont les variables naturelles sont (T,V), est minimale à l\\'équilibre sous ces contraintes précises.','Relis le résumé des principes de minimum dans le cours.')">Vérifier</button>
        <div class="feedback" id="thm6fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La condition de stabilité mécanique impose :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm6e2" value="wrong"> $\\chi_T < 0$</label>
          <label class="option"><input type="radio" name="thm6e2" value="right"> $\\chi_T > 0$</label>
          <label class="option"><input type="radio" name="thm6e2" value="wrong"> $\\chi_T = 0$</label>
          <label class="option"><input type="radio" name="thm6e2" value="wrong"> $\\chi_T = 1$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm6e2','thm6fb2','Correct — χT>0 : comprimer un système stable doit augmenter sa pression, pas la diminuer.','Relis la formule encadrée du cours pour la stabilité mécanique.')">Vérifier</button>
        <div class="feedback" id="thm6fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une portion d'isotherme théorique où $(\\partial P/\\partial V)_T > 0$ correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm6e3" value="wrong"> un état stable et observable</label>
          <label class="option"><input type="radio" name="thm6e3" value="right"> un état mécaniquement instable, jamais observé tel quel</label>
          <label class="option"><input type="radio" name="thm6e3" value="wrong"> un point critique</label>
          <label class="option"><input type="radio" name="thm6e3" value="wrong"> une transition de phase directement observable</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm6e3','thm6fb3','Correct — cette portion viole la condition χT>0 : le système réel s\\'en écarte en se séparant en deux phases coexistantes, comme expliqué dans l\\'exemple corrigé du cours.','Relis l\\'exemple corrigé du cours sur les isothermes de van der Waals.')">Vérifier</button>
        <div class="feedback" id="thm6fb3"></div>
      </div>
    </div>
  `
};

THM_NOVA_KB[thmKey("Conditions d'équilibre et de stabilité thermodynamique")] = {
  intro: "Salut, moi c'est Nova ! On étudie les conditions d'équilibre et de stabilité thermodynamique. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/minimum|extremum/i, replies:[
      "Selon les contraintes : S maximale (système isolé), F minimale (T,V fixés), G minimale (T,P fixés) — trois formes équivalentes du même principe physique."
    ]},
    { test:/stabilit[ée] m[ée]canique|χT/i, replies:[
      "La stabilité mécanique impose χT>0 : comprimer un système stable doit augmenter sa pression, jamais la diminuer — sinon la moindre fluctuation s'amplifierait."
    ]},
    { test:/stabilit[ée] thermique|CV/i, replies:[
      "La stabilité thermique impose CV>0 : recevoir de la chaleur doit augmenter la température d'un système stable, jamais la diminuer."
    ]},
    { test:/van der waals|instabilit[ée]/i, replies:[
      "Une région où χT<0 ou CV<0 est physiquement instable et jamais observée telle quelle — c'est exactement ce qui se passe sur la portion en S des isothermes de van der Waals, remplacée par une coexistence de phases (chapitre suivant)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le résumé des principes de minimum.",
      "Indice niveau 2 : cherche le potentiel dont les variables naturelles sont (T,V).",
      "Indice niveau 3 : c'est F."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la formule encadrée du cours pour la stabilité mécanique.",
      "Indice niveau 2 : c'est un signe positif qui est requis.",
      "Indice niveau 3 : χT>0."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis l'exemple corrigé sur les isothermes de van der Waals.",
      "Indice niveau 2 : cette condition viole la stabilité mécanique.",
      "Indice niveau 3 : c'est un état instable, jamais observé tel quel."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
THM_CHAPTERS[thmKey("Changement d'état des corps purs et diagrammes de phase")] = {
  objectives: [
    "Lire un diagramme de phase (P,T) d'un corps pur et identifier ses éléments caractéristiques",
    "Établir la condition d'équilibre entre deux phases à partir de l'égalité des enthalpies libres molaires",
    "Démontrer et utiliser la relation de Clausius-Clapeyron",
    "Interpréter le théorème des moments (règle des leviers) dans un diagramme (P,V) biphasé"
  ],
  prereqs: ["Conditions d'équilibre et de stabilité thermodynamique"],
  bodyHtml: `
    <p>Ce chapitre applique les outils des chapitres précédents (potentiel de Gibbs, conditions d'équilibre) à l'une des situations les plus riches et les plus visuellement parlantes de la thermodynamique macroscopique : le <strong>changement d'état</strong> d'un corps pur (fusion, vaporisation, sublimation) et sa représentation dans un <strong>diagramme de phase</strong>.</p>

    <h3>1. Le diagramme de phase $(P,T)$</h3>
    <p>Le diagramme $(P,T)$ d'un corps pur découpe le plan en trois <strong>domaines</strong> (solide, liquide, gaz), séparés par des <strong>courbes de coexistence</strong> (courbe de fusion, de vaporisation, de sublimation) le long desquelles deux phases coexistent en équilibre. Deux points remarquables organisent ce diagramme :</p>
    <table class="mini-table">
      <tr><th>Point</th><th>Définition</th></tr>
      <tr><td><strong>Point triple</strong></td><td>unique point $(P_t,T_t)$ où les trois phases (solide, liquide, gaz) coexistent simultanément</td></tr>
      <tr><td><strong>Point critique</strong></td><td>extrémité de la courbe de vaporisation, au-delà de laquelle la distinction liquide/gaz disparaît (fluide supercritique) ; on y retrouve $\\chi_T\\to\\infty$, à la frontière de l'instabilité du chapitre précédent</td></tr>
    </table>

    <h3>2. Condition d'équilibre entre deux phases</h3>
    <p>Considérons deux phases $\\alpha$ et $\\beta$ (par exemple liquide et vapeur) en équilibre, à $T$ et $P$ fixées. D'après le chapitre 6, l'enthalpie libre $G$ totale du système biphasé est minimale à l'équilibre. Un calcul de minimisation (échange virtuel d'une petite quantité de matière $dn$ de la phase $\\alpha$ vers $\\beta$, à $G$ totale stationnaire) impose l'égalité des <strong>enthalpies libres molaires</strong> $g_\\alpha = G_\\alpha/n_\\alpha$ des deux phases :</p>
    <div class="formula-box">$$g_\\alpha(T,P) = g_\\beta(T,P) \\qquad \\text{(équilibre des deux phases)}$$</div>
    <p>Cette égalité, une relation entre $T$ et $P$ seulement (une fois les fonctions $g_\\alpha,g_\\beta$ connues), définit précisément la <strong>courbe de coexistence</strong> $P_{coex}(T)$ dans le diagramme de phase.</p>

    <h3>3. La relation de Clausius-Clapeyron</h3>
    <p>En différentiant la condition $g_\\alpha=g_\\beta$ le long de la courbe de coexistence, et en utilisant $dg = -s\\,dT+v\\,dP$ (version molaire de $dG$, chapitre 4, avec $s,v$ entropie et volume molaires), on obtient, après quelques lignes de calcul :</p>
    <div class="formula-box">$$\\boxed{\\ \\frac{dP_{coex}}{dT} = \\frac{s_\\beta - s_\\alpha}{v_\\beta - v_\\alpha} = \\frac{L_{\\alpha\\to\\beta}}{T\\,(v_\\beta-v_\\alpha)}\\ }$$</div>
    <p>où $L_{\\alpha\\to\\beta} = T(s_\\beta-s_\\alpha)$ est la <strong>chaleur latente</strong> molaire (ou massique) de la transition $\\alpha\\to\\beta$ (par exemple la chaleur latente de vaporisation) — c'est la <strong>relation de Clausius-Clapeyron</strong>, qui relie directement la pente de la courbe de coexistence à cette chaleur latente et à la variation de volume lors de la transition.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — le cas particulier de l'eau</span>
      Pour la quasi-totalité des corps purs, le liquide est plus dense que le solide ($v_{liq}<v_{solide}$), donc la pente de la courbe de fusion est positive. L'<strong>eau</strong> est une exception célèbre : la glace flotte, donc $v_{liq}<v_{solide}$ est inversé ($v_{glace}>v_{liq}$), ce qui donne une pente de fusion <strong>négative</strong> — augmenter la pression sur de la glace peut la faire fondre à température fixée, un phénomène directement exploité (entre autres explications concurrentes) pour le glissement d'un patin à glace.
    </div>

    <h3>4. Le théorème des moments dans un diagramme $(P,V)$ biphasé</h3>
    <p>Dans un diagramme $(P,V)$ à température fixée, la zone de coexistence liquide-vapeur apparaît comme un <strong>palier horizontal</strong> à $P=P_{coex}(T)$ (conséquence directe du chapitre 6 : la portion instable de l'isotherme théorique y est remplacée par cette coexistence). Pour un système de volume molaire moyen $v$ compris entre le volume molaire du liquide $v_L$ et celui de la vapeur $v_G$, le <strong>théorème des moments</strong> (ou règle des leviers) donne la <strong>fraction molaire de vapeur</strong> $x_G$ :</p>
    <div class="formula-box">$$x_G = \\frac{v - v_L}{v_G - v_L}$$</div>
    <p>— une simple règle de proportionnalité, analogue à la formule du barycentre, très utilisée pour quantifier la composition d'un mélange diphasé à partir de son volume global mesuré.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour l'eau à $100\\,°\\text{C}$, $v_L \\approx 1{,}0\\,\\text{cm}^3/\\text{g}$, $v_G \\approx 1670\\,\\text{cm}^3/\\text{g}$. Un système biphasé a un volume massique moyen $v=500\\,\\text{cm}^3/\\text{g}$. Quelle est la fraction massique de vapeur ?</p>
      <p><strong>Solution :</strong> $x_G = \\dfrac{v-v_L}{v_G-v_L} = \\dfrac{500-1{,}0}{1670-1{,}0} \\approx \\dfrac{499}{1669}$.</p>
      <p class="example-answer">$x_G \\approx 0{,}30$, soit environ $30\\%$ de vapeur en masse (et donc $70\\%$ de liquide) — un exemple concret de l'utilisation du théorème des moments pour caractériser un mélange diphasé.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Diagramme $(P,T)$ : trois domaines séparés par des courbes de coexistence, avec point triple et point critique</li>
        <li>Équilibre de deux phases : égalité des enthalpies libres molaires $g_\\alpha=g_\\beta$</li>
        <li>Relation de Clausius-Clapeyron : $dP_{coex}/dT = L_{\\alpha\\to\\beta}/[T(v_\\beta-v_\\alpha)]$</li>
        <li>Théorème des moments dans un palier biphasé : $x_G = (v-v_L)/(v_G-v_L)$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que la pente de la courbe de fusion est toujours positive : l'eau (et quelques autres corps) fait exception</li>
        <li>Confondre point triple (coexistence des 3 phases, à $P,T$ fixées uniques) et point critique (fin de la distinction liquide/gaz)</li>
        <li>Oublier que le théorème des moments s'applique au volume <em>moyen</em> du système biphasé, pas au volume d'une seule des deux phases</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La condition d'équilibre entre deux phases $\\alpha$ et $\\beta$ à $T,P$ fixées s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm7e1" value="wrong"> $v_\\alpha = v_\\beta$</label>
          <label class="option"><input type="radio" name="thm7e1" value="right"> $g_\\alpha = g_\\beta$</label>
          <label class="option"><input type="radio" name="thm7e1" value="wrong"> $s_\\alpha = s_\\beta$</label>
          <label class="option"><input type="radio" name="thm7e1" value="wrong"> $T_\\alpha = T_\\beta$ seulement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm7e1','thm7fb1','Correct — c\\'est l\\'égalité des enthalpies libres molaires qui traduit le minimum de G total à l\\'équilibre biphasé.','Relis la formule encadrée du cours pour la condition d\\'équilibre entre phases.')">Vérifier</button>
        <div class="feedback" id="thm7fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Contrairement à la plupart des corps purs, l'eau a une courbe de fusion de pente :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm7e2" value="right"> négative</label>
          <label class="option"><input type="radio" name="thm7e2" value="wrong"> positive</label>
          <label class="option"><input type="radio" name="thm7e2" value="wrong"> nulle</label>
          <label class="option"><input type="radio" name="thm7e2" value="wrong"> infinie</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm7e2','thm7fb2','Correct — la glace étant moins dense que l\\'eau liquide, la pente de Clausius-Clapeyron est négative pour l\\'eau, contrairement à la plupart des corps purs.','Relis le point clé du cours sur le cas particulier de l\\'eau.')">Vérifier</button>
        <div class="feedback" id="thm7fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans un mélange liquide-vapeur, le théorème des moments donne la fraction de vapeur $x_G$ comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm7e3" value="wrong"> $x_G = v_G/v_L$</label>
          <label class="option"><input type="radio" name="thm7e3" value="right"> $x_G = (v-v_L)/(v_G-v_L)$</label>
          <label class="option"><input type="radio" name="thm7e3" value="wrong"> $x_G = v/v_G$</label>
          <label class="option"><input type="radio" name="thm7e3" value="wrong"> $x_G = v_L/v$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm7e3','thm7fb3','Correct — c\\'est exactement le théorème des moments (règle des leviers), utilisé dans l\\'exemple corrigé du cours pour l\\'eau à 100°C.','Relis la formule encadrée du cours pour le théorème des moments.')">Vérifier</button>
        <div class="feedback" id="thm7fb3"></div>
      </div>
    </div>
  `
};

THM_NOVA_KB[thmKey("Changement d'état des corps purs et diagrammes de phase")] = {
  intro: "Salut, c'est Nova ! On étudie les diagrammes de phase et les changements d'état des corps purs. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/point triple|point critique/i, replies:[
      "Le point triple est l'unique point où les trois phases (solide, liquide, gaz) coexistent. Le point critique est l'extrémité de la courbe de vaporisation, au-delà de laquelle liquide et gaz deviennent indiscernables."
    ]},
    { test:/clausius.?clapeyron/i, replies:[
      "La relation de Clausius-Clapeyron dPcoex/dT=L/[T(vβ−vα)] relie la pente de la courbe de coexistence à la chaleur latente de la transition et à la variation de volume molaire."
    ]},
    { test:/th[ée]or[èe]me des moments|r[èe]gle des leviers/i, replies:[
      "Le théorème des moments xG=(v−vL)/(vG−vL) donne la fraction de vapeur dans un mélange diphasé à partir du volume moyen mesuré — une simple règle de proportionnalité, comme un barycentre."
    ]},
    { test:/eau|glace/i, replies:[
      "L'eau est une exception célèbre : la glace étant moins dense que l'eau liquide, la pente de la courbe de fusion est négative — contrairement à la quasi-totalité des autres corps purs."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la formule encadrée du cours pour la condition d'équilibre entre phases.",
      "Indice niveau 2 : c'est une égalité entre des enthalpies libres molaires.",
      "Indice niveau 3 : gα=gβ."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le point clé du cours sur le cas particulier de l'eau.",
      "Indice niveau 2 : la glace flotte sur l'eau liquide, qu'est-ce que ça implique pour les volumes molaires ?",
      "Indice niveau 3 : la pente de la courbe de fusion est négative pour l'eau."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis la formule encadrée du cours pour le théorème des moments.",
      "Indice niveau 2 : c'est un rapport de deux écarts de volume.",
      "Indice niveau 3 : xG=(v−vL)/(vG−vL)."
    ]}
  ]
};


/* =========================== CHAPITRE 8 =========================== */
THM_CHAPTERS[thmKey("Systèmes ouverts : potentiel chimique et équilibre de phases")] = {
  objectives: [
    "Étendre l'identité thermodynamique à un système ouvert en introduisant le potentiel chimique",
    "Interpréter physiquement le potentiel chimique comme énergie par particule ajoutée",
    "Retrouver la condition d'équilibre de phase du chapitre 7 comme égalité des potentiels chimiques",
    "Énoncer la relation de Gibbs-Duhem et son rôle dans les systèmes à plusieurs constituants"
  ],
  prereqs: ["Changement d'état des corps purs et diagrammes de phase"],
  bodyHtml: `
    <p>Tout ce cours, jusqu'ici, a traité des systèmes <strong>fermés</strong> (chapitre 1) : la quantité de matière $n$ était fixée. Ce dernier chapitre lève cette restriction et introduit le <strong>potentiel chimique</strong>, la variable manquante pour décrire les systèmes <strong>ouverts</strong> — un concept indispensable dès qu'on s'intéresse aux mélanges, aux réactions chimiques, ou (comme au chapitre 7) à l'équilibre entre deux phases, qui échangent en réalité de la matière l'une avec l'autre.</p>

    <h3>1. Extension de l'identité thermodynamique</h3>
    <p>Pour un système ouvert, l'énergie interne dépend aussi du nombre de moles $n$ (ou plus généralement, des nombres de moles $n_i$ de chaque espèce chimique $i$ présente). L'identité thermodynamique du chapitre 4 se généralise en ajoutant un terme :</p>
    <div class="formula-box">$$dU = T\\,dS - P\\,dV + \\mu\\,dn$$</div>
    <p>où $\\mu$, le <strong>potentiel chimique</strong>, est défini comme la variable conjuguée de $n$ :</p>
    <div class="formula-box">$$\\mu = \\left(\\frac{\\partial U}{\\partial n}\\right)_{S,V}$$</div>
    <p>Pour un système à plusieurs constituants $i=1,\\ldots,k$, chacun a son propre potentiel chimique $\\mu_i = (\\partial U/\\partial n_i)_{S,V,n_{j\\neq i}}$, et $dU = T\\,dS-P\\,dV+\\sum_i \\mu_i\\,dn_i$.</p>

    <h3>2. Interprétation physique du potentiel chimique</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le potentiel chimique $\\mu$ représente l'<strong>énergie qu'il faut fournir au système</strong> (à $S,V$ fixés) pour lui <strong>ajouter une particule</strong> (ou une mole) supplémentaire — un rôle analogue à celui de $T$ pour l'échange d'entropie, ou de $-P$ pour l'échange de volume. En transformant $U$ vers $G$ (transformation de Legendre complète par rapport à $S$ et $V$, chapitre 4), on montre que $\\mu$ coïncide exactement avec l'<strong>enthalpie libre molaire</strong> :
      $$\\mu = \\left(\\frac{\\partial G}{\\partial n}\\right)_{T,P} = g = \\frac{G}{n} \\quad \\text{(pour un corps pur)}$$
    </div>
    <p>Cette identification est extrêmement utile : elle relie directement le potentiel chimique — une notion abstraite — à l'enthalpie libre molaire, une grandeur déjà familière depuis le chapitre 7.</p>

    <h3>3. Retrouver la condition d'équilibre de phase</h3>
    <p>Avec cette identification $\\mu=g$, la condition d'équilibre entre deux phases établie au chapitre 7 ($g_\\alpha=g_\\beta$) se réécrit immédiatement en termes de potentiel chimique :</p>
    <div class="formula-box">$$\\boxed{\\ \\mu_\\alpha(T,P) = \\mu_\\beta(T,P)\\ } \\qquad \\text{(équilibre de deux phases)}$$</div>
    <p>Cette formulation se généralise directement, contrairement à celle du chapitre 7, à l'équilibre entre <strong>plusieurs constituants</strong> ou plusieurs phases d'un mélange : à l'équilibre, le potentiel chimique de chaque espèce doit être <strong>identique</strong> dans toutes les phases où elle est présente — c'est la condition d'<strong>équilibre chimique</strong> déjà mentionnée, sans détail, au chapitre 1.</p>

    <h3>4. La relation de Gibbs-Duhem</h3>
    <p>Pour un système à un seul constituant, $G$ est une fonction homogène de degré 1 en $n$ (doubler la quantité de matière à $T,P$ fixées double $G$) : $G(T,P,n) = n\\,g(T,P) = n\\,\\mu(T,P)$. En différentiant cette relation et en la comparant à $dG=-S\\,dT+V\\,dP+\\mu\\,dn$ (version étendue de $dG$, chapitre 4), on obtient, après simplification, la <strong>relation de Gibbs-Duhem</strong> :</p>
    <div class="formula-box">$$S\\,dT - V\\,dP + n\\,d\\mu = 0$$</div>
    <p>Cette relation montre que les variables intensives $T,P,\\mu$ ne sont <strong>pas indépendantes</strong> pour un corps pur : fixer deux d'entre elles détermine automatiquement la troisième (le long d'une variation compatible avec l'équilibre) — une contrainte supplémentaire, utile en particulier pour l'étude des mélanges à plusieurs constituants (hors du cadre de ce cours, mais développée par exemple en thermodynamique chimique, matière L3-CF).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> à la traversée du point triple de l'eau, les trois phases (glace, eau liquide, vapeur) coexistent. Combien de relations d'égalité de potentiel chimique cette coexistence impose-t-elle ?</p>
      <p><strong>Solution :</strong> la condition d'équilibre entre phases s'écrit $\\mu_\\alpha=\\mu_\\beta$ pour chaque paire de phases en présence. Avec 3 phases (solide S, liquide L, gaz G), il y a 3 paires possibles, mais l'égalité $\\mu_S=\\mu_L=\\mu_G$ ne fournit que $3-1=2$ relations <strong>indépendantes</strong> (la troisième égalité découle automatiquement des deux premières par transitivité).</p>
      <p class="example-answer">2 relations indépendantes entre les 2 variables intensives libres $(T,P)$ : c'est précisément ce qui fixe le point triple à un point <strong>unique</strong> et isolé du diagramme de phase — exactement l'observation faite, sans démonstration, au chapitre 7.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Système ouvert : $dU = T\\,dS-P\\,dV+\\mu\\,dn$, avec $\\mu$ le potentiel chimique, variable conjuguée de $n$</li>
        <li>Pour un corps pur, $\\mu = g$ (enthalpie libre molaire) : interprétation comme énergie nécessaire pour ajouter une particule</li>
        <li>Équilibre de phase : $\\mu_\\alpha=\\mu_\\beta$, généralisation directe de $g_\\alpha=g_\\beta$ (chapitre 7)</li>
        <li>Relation de Gibbs-Duhem $S\\,dT-V\\,dP+n\\,d\\mu=0$ : $T,P,\\mu$ ne sont pas indépendantes pour un corps pur</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre potentiel chimique $\\mu$ (énergie par particule ajoutée) et énergie interne totale $U$ (extensive, dépend de la taille du système)</li>
        <li>Oublier que pour un corps pur, $\\mu$ coïncide exactement avec l'enthalpie libre molaire $g$ — une identification très utile en pratique</li>
        <li>Croire que l'égalité $\\mu_S=\\mu_L=\\mu_G$ au point triple donne 3 relations indépendantes : elle n'en donne que 2, par transitivité</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le potentiel chimique $\\mu$ est défini comme la variable conjuguée de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm8e1" value="wrong"> $S$</label>
          <label class="option"><input type="radio" name="thm8e1" value="wrong"> $V$</label>
          <label class="option"><input type="radio" name="thm8e1" value="right"> $n$ (le nombre de moles)</label>
          <label class="option"><input type="radio" name="thm8e1" value="wrong"> $T$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm8e1','thm8fb1','Correct — μ=(∂U/∂n)S,V, exactement comme T est la variable conjuguée de S et −P celle de V.','Relis la formule encadrée du cours pour l\\'identité thermodynamique étendue.')">Vérifier</button>
        <div class="feedback" id="thm8fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour un corps pur, le potentiel chimique $\\mu$ est égal à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm8e2" value="wrong"> l'énergie interne totale $U$</label>
          <label class="option"><input type="radio" name="thm8e2" value="right"> l'enthalpie libre molaire $g=G/n$</label>
          <label class="option"><input type="radio" name="thm8e2" value="wrong"> l'entropie molaire</label>
          <label class="option"><input type="radio" name="thm8e2" value="wrong"> la température</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm8e2','thm8fb2','Correct — μ=g pour un corps pur, une identification très utile qui relie directement le potentiel chimique à l\\'enthalpie libre molaire.','Relis le point clé du cours sur l\\'interprétation physique de μ.')">Vérifier</button>
        <div class="feedback" id="thm8fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Au point triple, l'égalité des potentiels chimiques des trois phases donne :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thm8e3" value="wrong"> 3 relations indépendantes</label>
          <label class="option"><input type="radio" name="thm8e3" value="right"> 2 relations indépendantes</label>
          <label class="option"><input type="radio" name="thm8e3" value="wrong"> 1 seule relation</label>
          <label class="option"><input type="radio" name="thm8e3" value="wrong"> 0 relation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thm8e3','thm8fb3','Correct — μS=μL=μG ne donne que 2 relations indépendantes par transitivité, ce qui fixe le point triple à un point unique du diagramme (T,P).','Reprends le raisonnement de l\\'exemple corrigé du cours sur le point triple.')">Vérifier</button>
        <div class="feedback" id="thm8fb3"></div>
      </div>
    </div>
  `
};

THM_NOVA_KB[thmKey("Systèmes ouverts : potentiel chimique et équilibre de phases")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : le potentiel chimique et les systèmes ouverts. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/potentiel chimique|\\bμ\\b/i, replies:[
      "Le potentiel chimique μ=(∂U/∂n)S,V est l'énergie qu'il faut fournir pour ajouter une particule au système. Pour un corps pur, μ=g, l'enthalpie libre molaire."
    ]},
    { test:/[ée]quilibre de phase|μα/i, replies:[
      "La condition d'équilibre entre deux phases s'écrit μα=μβ — c'est exactement la généralisation de gα=gβ (chapitre 7), mais qui s'étend directement aux mélanges à plusieurs constituants."
    ]},
    { test:/gibbs.?duhem/i, replies:[
      "La relation de Gibbs-Duhem, SdT−VdP+ndμ=0, montre que T, P et μ ne sont pas indépendantes pour un corps pur : fixer deux d'entre elles détermine la troisième."
    ]},
    { test:/point triple/i, replies:[
      "Au point triple, μS=μL=μG ne donne que 2 relations indépendantes (par transitivité) entre les 2 variables (T,P) — ce qui fixe le point triple à un unique point du diagramme."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la formule encadrée du cours pour l'identité thermodynamique étendue.",
      "Indice niveau 2 : μ est associé au terme μdn.",
      "Indice niveau 3 : μ est la variable conjuguée de n."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le point clé du cours sur l'interprétation physique de μ.",
      "Indice niveau 2 : ça concerne une grandeur molaire, pas totale.",
      "Indice niveau 3 : μ=g, l'enthalpie libre molaire."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : reprends le raisonnement de l'exemple corrigé sur le point triple.",
      "Indice niveau 2 : pense à la transitivité de l'égalité entre 3 grandeurs.",
      "Indice niveau 3 : il n'y a que 2 relations indépendantes."
    ]}
  ]
};
/* fusionne le module Thermodynamique macroscopique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, THM_CHAPTERS);
Object.assign(NOVA_KB, THM_NOVA_KB);