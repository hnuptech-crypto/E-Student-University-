/* =====================================================================
   CHUNK « atom » — registre ATOM_CHAPTERS / ATOM_NOVA_KB
   Matière(s) : Chimie|Atomistique et liaisons chimiques
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   ATOM_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */




/* ===================================================================================
   COURS "ATOMISTIQUE ET LIAISONS CHIMIQUES" — contenu rédigé + exercices
   Source : polycopié USTO Tlemcen, Faculté de Technologie, "Atomistique et Chimie
   Organique — Cours et exercices corrigés (Chimie 1 en Génie Industriel)" (Dr Zenasni
   Mohamed Amine, Dr Meroufel Bahia, 2019-2020), réécrit et réorganisé en 10 chapitres
   détaillés. Seule la partie « atomistique et liaisons chimiques » du polycopié (ses
   chapitres I et II) est reprise ici ; la nomenclature organique et la stéréochimie
   (chapitres III et IV du polycopié) relèvent du module « Chimie organique générale »
   déjà présent sur la plateforme et n'ont pas été dupliquées.
=================================================================================== */

const ATOM_MATIERE = 'Atomistique et liaisons chimiques';
function atomKey(chapterTitle){ return `Chimie|${ATOM_MATIERE}|${chapterTitle}`; }
const ATOM_CHAPTERS = {};
const ATOM_NOVA_KB = {};


/* =========================== CHAPITRE 1 — Structure de l'atome : noyau, électron et identification des éléments =========================== */
ATOM_CHAPTERS[atomKey('Structure de l\'atome : noyau, électron et identification des éléments')] = {
  objectives: [
    "Décrire la constitution de l'atome (noyau, électrons) et situer où se concentre l'essentiel de sa masse",
    "Donner la charge et la masse du proton, du neutron et de l'électron",
    "Utiliser la représentation symbolique \${}^A_ZX$ pour identifier un élément et calculer son nombre de neutrons",
    "Définir la notion d'isotopes et expliquer pourquoi on ne peut pas les séparer par voie chimique",
    "Évaluer pourquoi la découverte du noyau atomique par Rutherford, en 1911, a représenté une rupture aussi radicale avec le modèle atomique qui prévalait jusqu'alors"
  ],
  prereqs: ["Aucun — premier chapitre du cours"],
  bodyHtml: `
    <p>En 1911, Ernest Rutherford bombarde une fine feuille d'or avec des particules alpha, s'attendant à les voir traverser la matière presque sans déviation — conformément au modèle atomique alors dominant, celui du « pudding aux prunes » de J. J. Thomson, où la charge positive serait diffuse dans tout l'atome. À sa grande stupéfaction, une infime fraction des particules rebondit violemment, parfois presque à 180°. Rutherford décrira plus tard ce résultat comme aussi incroyable « que si vous tiriez un obus de 15 pouces sur un morceau de papier de soie et qu'il revenait vous frapper ». Cette expérience, en apparence simple, révèle que la charge positive de l'atome — et l'essentiel de sa masse — est concentrée dans un noyau minuscule, 10 000 fois plus petit que l'atome lui-même : l'atome est presque entièrement du vide.</p>
    <p>Cette découverte, vieille de plus d'un siècle, reste le point de départ obligé de toute la chimie moderne : chaque réaction chimique, chaque liaison entre atomes, chaque propriété de la matière que tu étudieras dans ce module découle, in fine, de cette structure fondamentale — un noyau minuscule et massif, entouré d'électrons qui, eux, déterminent presque toute la chimie observable.</p>
    <p>La matière est constituée de grains élémentaires appelés atomes : on connaît aujourd'hui 118 éléments chimiques, chacun désigné par un nom et un symbole (par exemple Carbone : C, Azote : N). Ce premier chapitre pose la structure de base de l'atome, avant d'aborder, dans les chapitres suivants, la façon dont ses électrons s'organisent et dont les atomes se lient entre eux. À la fin de ce chapitre, tu sauras identifier n'importe quel atome ou isotope à partir de sa représentation symbolique, et comprendre pourquoi la chimie d'un élément ne dépend jamais de son nombre de neutrons.</p>

    <h3>1. Constitution de l'atome</h3>
    <p>L'atome est un édifice électriquement neutre, formé d'une partie centrale — le <strong>noyau</strong>, où est concentrée pratiquement toute la masse — et d'<strong>électrons</strong> qui l'entourent. À l'état libre, l'atome est rare : il s'associe le plus souvent à d'autres atomes pour former des molécules.</p>

    <h3>2. Le noyau : protons et neutrons</h3>
    <p>Le noyau est formé de particules stables appelées <strong>nucléons</strong>, qui existent sous deux formes :</p>
    <table class="mini-table">
      <tr><th>Particule</th><th>Charge</th><th>Masse</th></tr>
      <tr><td>Proton</td><td>$q_p = +e = 1{,}602\\times 10^{-19}\\ \\text{C}$</td><td>$m_p = 1{,}673\\times 10^{-27}\\ \\text{kg} \\approx 1836\\,m_e$</td></tr>
      <tr><td>Neutron</td><td>nulle</td><td>$m_n = 1{,}675\\times 10^{-27}\\ \\text{kg}$</td></tr>
    </table>
    <p>Conséquence directe : toute la masse de l'atome est concentrée dans le noyau, les électrons y contribuant de façon négligeable.</p>

    <h3>3. L'électron</h3>
    <p>L'électron porte une charge négative fondamentale $q_e = -e = -1{,}6\\times 10^{-19}\\ \\text{C}$. Sa masse, $m_e \\approx 9{,}11\\times 10^{-31}\\ \\text{kg}$, ne représente qu'environ $1/1800$ de celle du proton. L'électron appartient à la famille des particules dites <strong>leptons</strong>.</p>

    <h3>4. Identification d'un élément : représentation \${}^A_ZX$</h3>
    <p>Chaque élément chimique est associé à un symbole, toujours écrit avec une majuscule (éventuellement suivie d'une minuscule), et représenté sous la forme :</p>
    <p>$\${}^A_ZX$$</p>
    <table class="mini-table">
      <tr><th>Symbole</th><th>Nom</th><th>Signification</th></tr>
      <tr><td>$Z$</td><td>Numéro atomique (nombre de charge)</td><td>Nombre de protons du noyau — c'est aussi le nombre d'électrons pour un atome neutre</td></tr>
      <tr><td>$A$</td><td>Nombre de masse</td><td>Nombre total de nucléons (protons + neutrons)</td></tr>
    </table>
    <p>La charge du noyau vaut $+Ze$, celle du cortège électronique $-Ze$ pour un atome neutre. Si $N$ désigne le nombre de neutrons, on a la relation fondamentale :</p>
    <p>$$A = Z + N$$</p>

    <h3>5. Isotopes</h3>
    <p>Deux atomes sont dits <strong>isotopes</strong> lorsqu'ils ont le même numéro atomique $Z$ (donc les mêmes propriétés chimiques) mais un nombre de masse $A$ différent — c'est-à-dire un nombre de neutrons différent. Un même élément peut posséder un ou plusieurs isotopes naturels. Comme les isotopes ont un comportement chimique identique, il est <strong>impossible de les séparer par des réactions chimiques</strong> : seules des techniques physiques, notamment la spectroscopie de masse, permettent de les distinguer et de les séparer.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Deux isotopes d'un même élément ont exactement la même configuration électronique et donc, en première approximation, la même chimie. Pourtant, l'eau lourde (D₂O, où l'hydrogène est remplacé par son isotope deutérium) a des propriétés physiques légèrement différentes de l'eau ordinaire (point d'ébullition, densité). Comment concilies-tu cette légère différence avec le principe selon lequel les isotopes ont la même chimie ?
    </div>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      L'atome est neutre : $Z$ protons dans le noyau, $Z$ électrons autour. Le nombre de masse $A=Z+N$ compte tous les nucléons. Deux isotopes partagent le même $Z$ (mêmes propriétés chimiques) mais diffèrent par $A$ (donc par $N$), et ne se séparent que par des méthodes physiques.
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La datation au carbone 14, technique fondée directement sur les propriétés des isotopes, a révolutionné l'archéologie et la paléontologie depuis son invention par Willard Libby en 1949 (prix Nobel de chimie 1960) : en mesurant la proportion de carbone 14 radioactif restant dans un échantillon organique, on peut estimer son âge avec une précision remarquable sur des dizaines de milliers d'années. Plus récemment, l'analyse isotopique de l'oxygène et de l'hydrogène dans des carottes de glace polaire permet de reconstituer les températures terrestres passées, une donnée cruciale pour la recherche sur le changement climatique.</p>
    <p><strong>Question ouverte :</strong> peut-on exploiter des isotopes stables (non radioactifs) pour tracer avec une précision croissante l'origine géographique de matériaux ou de denrées alimentaires, un domaine en plein essor appelé « géochimie isotopique forensique » ? C'est un axe de recherche actif à l'interface de la chimie, de la géologie et des sciences judiciaires.</p>
    <p><strong>Technologie émergente :</strong> les spectromètres de masse à très haute résolution, capables de distinguer des isotopes dont la différence de masse est infime, sont aujourd'hui utilisés en médecine pour tracer le métabolisme de médicaments marqués isotopiquement, sans recourir à des traceurs radioactifs potentiellement dangereux.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Expérience de Rutherford (1911) → noyau minuscule et massif, chargé positivement → électrons en périphérie → notation \${}^A_ZX$ → isotopes (même Z, A différent) → séparables uniquement par des méthodes physiques
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$A = Z + N$$
      Cette relation, d'une simplicité trompeuse, est la clé de voûte de toute l'identification atomique : elle relie le nombre total de nucléons (A), le nombre de protons qui détermine l'identité chimique de l'élément (Z), et le nombre de neutrons qui distingue ses isotopes (N).
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Noyau = protons ($+e$, $m_p\\approx 1836\\,m_e$) + neutrons (charge nulle) ; il concentre toute la masse de l'atome</li>
        <li>Électron : charge $-e$, masse $m_e \\approx 9{,}11\\times 10^{-31}$ kg (environ 1/1800 de celle du proton)</li>
        <li>Représentation \${}^A_ZX$ : $Z$ = numéro atomique (protons = électrons pour un atome neutre), $A$ = nombre de masse (nucléons)</li>
        <li>Relation fondamentale : $A = Z + N$</li>
        <li>Isotopes : même $Z$, $A$ différent ; séparables uniquement par des méthodes physiques (spectroscopie de masse), pas chimiques</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre $A$ (nombre de masse, nucléons) et $Z$ (numéro atomique, protons) : $A$ est toujours $\\ge Z$</li>
        <li>Oublier que le nombre d'électrons n'égale le numéro atomique que pour un atome <strong>neutre</strong> — un ion a plus ou moins d'électrons que $Z$</li>
        <li>Croire que des isotopes ont des propriétés chimiques différentes : ils ont le même $Z$, donc la même structure électronique de valence, donc la même chimie</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un atome est représenté par \${}^{23}_{11}\\text{Na}$. Son nombre de neutrons vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom1e1" value="wrong"> 23</label>
          <label class="option"><input type="radio" name="atom1e1" value="wrong"> 11</label>
          <label class="option"><input type="radio" name="atom1e1" value="right"> 12</label>
          <label class="option"><input type="radio" name="atom1e1" value="wrong"> 34</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom1e1','atom1fb1','Correct — N=A-Z=23-11=12 neutrons.','Utilise la relation A=Z+N, donc N=A-Z=23-11.')">Vérifier</button>
        <div class="feedback" id="atom1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Deux isotopes d'un même élément ont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom1e2" value="wrong"> le même nombre de neutrons</label>
          <label class="option"><input type="radio" name="atom1e2" value="right"> le même numéro atomique Z, mais un nombre de masse A différent</label>
          <label class="option"><input type="radio" name="atom1e2" value="wrong"> des propriétés chimiques différentes</label>
          <label class="option"><input type="radio" name="atom1e2" value="wrong"> un nombre de protons différent</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom1e2','atom1fb2','Correct — même Z (donc même chimie), A différent (donc N différent).','Relis la section 5 : les isotopes partagent une des deux grandeurs Z ou A, mais pas l\'autre.')">Vérifier</button>
        <div class="feedback" id="atom1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'essentiel de la masse d'un atome est concentré :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom1e3" value="wrong"> dans le nuage électronique</label>
          <label class="option"><input type="radio" name="atom1e3" value="right"> dans le noyau</label>
          <label class="option"><input type="radio" name="atom1e3" value="wrong"> également répartie entre noyau et électrons</label>
          <label class="option"><input type="radio" name="atom1e3" value="wrong"> dans les électrons de valence uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom1e3','atom1fb3','Correct — le proton et le neutron sont environ 1800 fois plus massifs que l\'électron : la masse est concentrée dans le noyau.','Compare les masses du proton et de l\'électron données dans la section 2 et 3 : le rapport est énorme.')">Vérifier</button>
        <div class="feedback" id="atom1fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'atome était réellement rempli de matière (comme le pensait Thomson), sans noyau concentré : comment cela aurait-il changé les résultats de l'expérience de Rutherford ?</li>
        <li>Pourquoi la datation au carbone 14 fonctionne-t-elle pour des matériaux organiques vieux de quelques milliers à quelques dizaines de milliers d'années, mais pas au-delà (ni pour des matériaux inorganiques) ?</li>
        <li>Quelle serait la conséquence, pour l'archéologie et la paléoclimatologie, si l'on ne disposait d'aucune méthode de datation isotopique ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>E. Rutherford, « The Scattering of α and β Particles by Matter and the Structure of the Atom », Philosophical Magazine, 1911 — l'article fondateur du modèle nucléaire de l'atome.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard pour la structure de l'atome en licence.</li>
        <li>W. F. Libby, « Radiocarbon Dating », Nobel Lecture, prix Nobel de chimie 1960.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes maintenant de la structure fondamentale de l'atome — le socle sur lequel repose toute la chimie que tu étudieras dans ce module et bien au-delà. Le chapitre suivant, « Le modèle de Bohr et la quantification de l'énergie », va s'intéresser de plus près à ces électrons que nous n'avons fait qu'évoquer ici, et découvrir pourquoi leur comportement échappe radicalement aux lois de la physique classique. Comme le disait Rutherford lui-même, avec l'humour propre aux grands scientifiques face à une découverte qui a bouleversé sa propre vision du monde : « C'était tout à fait la chose la plus incroyable qui me soit jamais arrivée dans ma vie. » Tu viens de comprendre, à ton tour, pourquoi.</p>
  `
};

ATOM_NOVA_KB[atomKey('Structure de l\'atome : noyau, électron et identification des éléments')] = {
  intro: "Salut, moi c'est Nova ! On démarre l'Atomistique par la structure de l'atome : noyau, électrons, notation ZAX et isotopes. Demande-moi la relation A=Z+N, la différence entre Z et A, ou ce que sont les isotopes.",
  rules: [
    { test:/proton|neutron/i, replies:["Le proton a une charge +e et une masse d'environ 1836 fois celle de l'électron. Le neutron a une charge nulle et une masse très proche de celle du proton. Ensemble, ce sont les nucléons du noyau."] },
    { test:/électron.*masse|masse.*électron/i, replies:["La masse de l'électron vaut environ 9,11×10⁻³¹ kg, soit environ 1/1800 de la masse du proton : elle est négligeable devant celle du noyau."] },
    { test:/num[ée]ro atomique|\\bZ\\b/i, replies:["Le numéro atomique Z est le nombre de protons du noyau. Pour un atome neutre, c'est aussi le nombre d'électrons. C'est Z qui détermine la nature chimique de l'élément."] },
    { test:/nombre de masse|\\bA\\b\\s*=/i, replies:["Le nombre de masse A est le nombre total de nucléons (protons + neutrons) : A=Z+N."] },
    { test:/isotope/i, replies:["Deux isotopes ont le même numéro atomique Z (donc les mêmes propriétés chimiques) mais un nombre de masse A différent, donc un nombre de neutrons différent. On ne peut les séparer que par des méthodes physiques comme la spectroscopie de masse."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise A=Z+N.","Indice niveau 2 : isole N en écrivant N=A-Z.","Indice niveau 3 : N=23-11=12."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : les isotopes partagent une grandeur et diffèrent sur l'autre.","Indice niveau 2 : c'est Z qui reste identique.","Indice niveau 3 : même Z, A différent."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare les masses du proton et de l'électron.","Indice niveau 2 : le rapport de masse est de l'ordre de 1800.","Indice niveau 3 : la masse est concentrée dans le noyau."] }
  ]
};


/* =========================== CHAPITRE 2 — Le modèle de Bohr et la quantification de l'énergie =========================== */
ATOM_CHAPTERS[atomKey('Le modèle de Bohr et la quantification de l\'énergie')] = {
  objectives: [
    "Énoncer les quatre hypothèses du modèle de Bohr pour l'atome d'hydrogène",
    "Établir le rayon et l'énergie quantifiés d'une orbite de Bohr",
    "Utiliser la relation de Planck-Einstein pour relier absorption/émission d'énergie et longueur d'onde",
    "Appliquer la formule de Rydberg et identifier les séries spectrales de l'atome d'hydrogène, et calculer une énergie d'ionisation",
    "Évaluer les limites du modèle de Bohr et justifier pourquoi il ne s'applique rigoureusement qu'à l'atome d'hydrogène et aux ions hydrogénoïdes"
  ],
  prereqs: ["Structure de l'atome : noyau, électron et identification des éléments"],
  bodyHtml: `
    <p>Niels Bohr n'avait que 27 ans lorsqu'il publie, en 1913, un modèle atomique qui semble presque hérétique du point de vue de la physique classique de son époque : il postule, sans réelle justification théorique à l'époque, que l'électron ne peut occuper que certaines orbites bien précises autour du noyau, contrairement à toute trajectoire classique qui l'aurait vu s'effondrer en spirale sur le noyau en quelques fractions de seconde, en perdant continuellement de l'énergie par rayonnement électromagnétique. Ce postulat audacieux, purement empirique au départ, se révèle capable de prédire avec une précision stupéfiante les longueurs d'onde exactes des raies spectrales de l'hydrogène, observées depuis des décennies sans qu'aucune théorie ne parvienne à les expliquer.</p>
    <p>Ce modèle, aujourd'hui dépassé par la mécanique quantique moderne (que tu étudieras en détail dans un cours ultérieur), reste pourtant un jalon historique et pédagogique incontournable : c'est lui qui introduit pour la première fois l'idée révolutionnaire que l'énergie, à l'échelle atomique, n'est pas continue mais quantifiée — une rupture conceptuelle aussi profonde que celle de Rutherford au chapitre précédent, et qui ouvrira directement la voie à toute la physique quantique du XXe siècle.</p>
    <p>Comment un électron, chargé négativement, peut-il rester en orbite autour d'un noyau chargé positivement sans s'effondrer sur lui ? En 1913, Niels Bohr propose pour l'atome d'hydrogène un modèle qui, en introduisant une quantification, explique pour la première fois le spectre de raies observé expérimentalement. À la fin de ce chapitre, tu sauras calculer précisément l'énergie de n'importe quel niveau électronique de l'hydrogène, et prédire les longueurs d'onde des raies spectrales qu'il émet ou absorbe.</p>

    <h3>1. Les quatre hypothèses de Bohr</h3>
    <p>Pour l'atome d'hydrogène (un proton, un électron), Bohr propose :</p>
    <ol>
      <li>le noyau est immobile, l'électron de masse $m$ tourne autour de lui sur une orbite circulaire de rayon $r$ ;</li>
      <li>l'électron ne peut se trouver que sur certaines orbites privilégiées, dites <strong>orbites stationnaires</strong>, sans émettre d'énergie ;</li>
      <li>lorsque l'électron change de niveau, il émet ou absorbe de l'énergie : $\\Delta E = h\\nu$ ;</li>
      <li>le moment cinétique de l'électron est quantifié : $mvr = n\\dfrac{h}{2\\pi}$, avec $h$ la constante de Planck et $n$ un entier naturel non nul.</li>
    </ol>

    <h3>2. Équilibre du système et énergie totale</h3>
    <p>L'électron est maintenu sur son orbite par l'équilibre entre la force d'attraction coulombienne et la force centrifuge :</p>
    <p>$$|\\vec{F}_a| = \\dfrac{e^2}{4\\pi\\epsilon_0 r^2}, \\qquad |\\vec{F}_c| = \\dfrac{mv^2}{r}$$</p>
    <p>L'égalité $|\\vec{F}_a|=|\\vec{F}_c|$ donne $mv^2 = \\dfrac{e^2}{4\\pi\\epsilon_0 r}$. L'énergie totale du système, somme de l'énergie cinétique et de l'énergie potentielle électrostatique, s'écrit alors :</p>
    <p>$$E_T = \\dfrac{-e^2}{8\\pi\\epsilon_0 r}$$</p>

    <h3>3. Quantification du rayon et de l'énergie</h3>
    <p>En combinant cette relation d'équilibre avec la quantification du moment cinétique ($mvr=nh/2\\pi$), on obtient le <strong>rayon quantifié</strong> de l'orbite $n$ :</p>
    <p>$$r_n = \\dfrac{\\epsilon_0 h^2 n^2}{\\pi m e^2}$$</p>
    <p>puis, en substituant dans l'expression de l'énergie, l'<strong>énergie quantifiée</strong> :</p>
    <p>$$E_n = \\dfrac{-me^4}{8\\epsilon_0^2 h^2 n^2}$$</p>
    <p>L'énergie de l'électron dans l'atome d'hydrogène est donc <strong>discrète</strong> : elle ne peut prendre que certaines valeurs, indexées par l'entier $n$ appelé nombre quantique principal.</p>
    <table class="mini-table">
      <tr><th>État</th><th>$n$</th><th>Rayon</th><th>Énergie</th></tr>
      <tr><td>Fondamental</td><td>1</td><td>$r_1 = 5{,}29\\times 10^{-11}\\ \\text{m} = 0{,}529\\ \\text{Å}$</td><td>$E_1 = -13{,}6\\ \\text{eV}$</td></tr>
      <tr><td>1er excité</td><td>2</td><td>$r_2 = 4r_1 = 2{,}116\\ \\text{Å}$</td><td>$E_2 = E_1/4 = -3{,}4\\ \\text{eV}$</td></tr>
      <tr><td>2e excité</td><td>3</td><td>$r_3 = 9r_1 = 4{,}761\\ \\text{Å}$</td><td>$E_3 = -1{,}51\\ \\text{eV}$</td></tr>
    </table>
    <p>(avec $1\\,\\text{Å}=10^{-10}\\,\\text{m}$ et $1\\,\\text{eV}=1{,}6\\times10^{-19}\\,\\text{J}$)</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'énergie $E_n=-13{,}6/n^2$ eV est toujours négative pour un état lié, et tend vers zéro (sans jamais l'atteindre) quand $n$ tend vers l'infini. Physiquement, que représente cette limite $E_\\infty=0$, et pourquoi les niveaux d'énergie se resserrent-ils de plus en plus à mesure que $n$ augmente, contrairement à leur espacement initial ($n=1$ à $n=2$) qui est le plus large de tous ?
    </div>

    <h3>4. Absorption et émission d'énergie</h3>
    <p>Un électron ne peut absorber ou libérer de l'énergie qu'en changeant de niveau. La quantité d'énergie échangée est donnée par la relation de Planck :</p>
    <p>$$\\Delta E = |E_f - E_i| = h\\nu$$</p>
    <ul>
      <li><strong>Absorption</strong> : l'électron passe d'un niveau $n$ à un niveau $p>n$ en absorbant une radiation de fréquence $\\nu_{n\\to p}$ ;</li>
      <li><strong>Émission</strong> : l'électron passe d'un niveau $p$ à un niveau $n<p$ en émettant une radiation de fréquence $\\nu_{p\\to n}$.</li>
    </ul>

    <h3>5. Rayonnement électromagnétique et formule de Rydberg</h3>
    <p>Une onde électromagnétique de fréquence $\\nu$ est aussi caractérisée par sa longueur d'onde $\\lambda=c/\\nu$ ou son nombre d'onde $\\sigma=1/\\lambda$. En combinant $\\Delta E=(1/n^2-1/p^2)\\,me^4/8\\epsilon_0^2h^2$ avec $h\\nu=hc/\\lambda$, on obtient la <strong>formule de Rydberg</strong> :</p>
    <p>$$\\dfrac{1}{\\lambda} = R_H\\left(\\dfrac{1}{n^2}-\\dfrac{1}{p^2}\\right), \\qquad R_H = \\dfrac{me^4}{8\\epsilon_0^2h^3c}$$</p>
    <p>Selon le niveau d'arrivée $n$, on distingue plusieurs séries spectrales :</p>
    <table class="mini-table">
      <tr><th>Série</th><th>$n$</th><th>$p$</th><th>Domaine</th></tr>
      <tr><td>Lyman</td><td>1</td><td>$>1$</td><td>Ultraviolet</td></tr>
      <tr><td>Balmer</td><td>2</td><td>$>2$</td><td>Visible (les 4 raies observées : 410, 434, 486, 656 nm)</td></tr>
      <tr><td>Paschen</td><td>3</td><td>$>3$</td><td>Infrarouge</td></tr>
      <tr><td>Brackett</td><td>4</td><td>$>4$</td><td>Infrarouge</td></tr>
      <tr><td>Pfund</td><td>5</td><td>$>5$</td><td>Infrarouge</td></tr>
    </table>

    <h3>6. Généralisation aux ions hydrogénoïdes</h3>
    <p>Un ion hydrogénoïde ne possède qu'un seul électron (par exemple He⁺, Li²⁺). Son énergie totale et le rayon de ses orbites se déduisent simplement de ceux de l'hydrogène en introduisant le numéro atomique $Z$ :</p>
    <p>$$E_T = E_1\\dfrac{Z^2}{n^2}, \\qquad r_n = r_1\\dfrac{n^2}{Z}, \\qquad \\dfrac{1}{\\lambda} = Z^2 R_H\\left(\\dfrac{1}{n^2}-\\dfrac{1}{p^2}\\right)$$</p>

    <h3>7. Énergie d'ionisation</h3>
    <p>L'énergie d'ionisation est l'énergie nécessaire pour amener l'électron de son état fondamental ($n=1$) jusqu'à l'infini ($E_\\infty=0$) :</p>
    <p>$$\\Delta E = h\\nu_L = E_\\infty - E_1 = 13{,}6\\ \\text{eV pour l'hydrogène}$$</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Le modèle de Bohr quantifie le moment cinétique de l'électron, ce qui quantifie automatiquement son rayon et son énergie : $E_n=-13{,}6/n^2$ eV pour l'hydrogène. Les échanges d'énergie entre niveaux ($\\Delta E=h\\nu$) expliquent le spectre de raies observé, organisé en séries (Lyman, Balmer...), et se généralisent aux ions hydrogénoïdes via le facteur $Z^2$.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le modèle de Bohr fonctionne remarquablement bien pour l'hydrogène et les ions hydrogénoïdes (un seul électron), mais échoue à décrire quantitativement des atomes polyélectroniques comme l'hélium neutre. Sachant que le modèle repose sur une simple orbite circulaire d'un seul électron autour d'un noyau, pourquoi la présence d'un second électron rend-elle le problème considérablement plus complexe à traiter de cette façon ?
    </div>

    <h3>8. Frontière de la recherche</h3>
    <p>Le modèle de Bohr, bien que dépassé théoriquement, garde une valeur pédagogique et pratique considérable : les astrophysiciens utilisent encore aujourd'hui la formule de Rydberg pour analyser les spectres d'étoiles et de nébuleuses lointaines, identifiant leur composition chimique et leur vitesse (par effet Doppler) à partir du décalage de leurs raies spectrales caractéristiques. Le développement des lasers à atomes de Rydberg — des atomes excités dans des niveaux $n$ très élevés, où le modèle de Bohr redevient étonnamment précis — constitue aujourd'hui un axe de recherche actif en information quantique, ces atomes présentant des propriétés d'interaction extrêmement fortes exploitables pour construire des ordinateurs quantiques.</p>
    <p><strong>Question ouverte :</strong> pourquoi le modèle de Bohr, pourtant fondamentalement incorrect du point de vue de la mécanique quantique moderne (qui décrit l'électron par une fonction d'onde probabiliste et non une orbite précise), donne-t-il malgré tout des résultats numériquement exacts pour l'énergie de l'atome d'hydrogène ? C'est une question de philosophie des sciences autant que de physique, encore discutée aujourd'hui.</p>
    <p><strong>Technologie émergente :</strong> les horloges atomiques de nouvelle génération exploitent des transitions électroniques extrêmement précises, directement héritées du principe de quantification de l'énergie posé par Bohr, pour atteindre une exactitude telle qu'elles ne dérailleraient que d'une seconde sur l'âge de l'Univers.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Quantification du moment cinétique ($mvr=nh/2\\pi$) → rayon quantifié $r_n$ → énergie quantifiée $E_n$ → transition entre niveaux ($\\Delta E=h\\nu$) → formule de Rydberg → séries spectrales observées
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$E_n = \\frac{-13{,}6}{n^2}\\ \\text{eV}$$
      Cette formule, apparemment simple, a résolu en 1913 une énigme vieille de plusieurs décennies — l'origine du spectre de raies de l'hydrogène — et a ouvert la voie à toute la révolution quantique du XXe siècle.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Quantification du moment cinétique : $mvr = nh/2\\pi$</li>
        <li>Énergie de l'hydrogène : $E_n = -13{,}6/n^2$ eV ; état fondamental $E_1=-13{,}6$ eV, $r_1=0{,}529$ Å</li>
        <li>Absorption/émission : $\\Delta E = h\\nu = hc/\\lambda$</li>
        <li>Formule de Rydberg : $1/\\lambda = R_H(1/n^2-1/p^2)$, avec séries Lyman (UV), Balmer (visible), Paschen/Brackett/Pfund (IR)</li>
        <li>Ions hydrogénoïdes : $E_T=E_1Z^2/n^2$, un seul électron</li>
        <li>Énergie d'ionisation de l'hydrogène : 13,6 eV (transition $n=1\\to\\infty$)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le signe négatif de $E_n$ : les niveaux liés ont toujours une énergie négative (électron lié au noyau)</li>
        <li>Confondre absorption (énergie positive, $n\\to p$ avec $p>n$) et émission (énergie libérée, $p\\to n$ avec $p>n$)</li>
        <li>Appliquer directement les formules de l'hydrogène à un ion hydrogénoïde sans le facteur $Z^2$ (ou $Z$ pour le rayon)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'énergie du niveau $n=2$ de l'atome d'hydrogène vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom2e1" value="wrong"> -13,6 eV</label>
          <label class="option"><input type="radio" name="atom2e1" value="right"> -3,4 eV</label>
          <label class="option"><input type="radio" name="atom2e1" value="wrong"> -1,51 eV</label>
          <label class="option"><input type="radio" name="atom2e1" value="wrong"> +3,4 eV</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom2e1','atom2fb1','Correct — E2=E1/n²=-13,6/4=-3,4 eV.','Utilise En=-13,6/n² eV avec n=2.')">Vérifier</button>
        <div class="feedback" id="atom2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une transition électronique du niveau $n=3$ vers le niveau $n=2$ correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom2e2" value="wrong"> une absorption d'énergie</label>
          <label class="option"><input type="radio" name="atom2e2" value="right"> une émission d'énergie</label>
          <label class="option"><input type="radio" name="atom2e2" value="wrong"> une ionisation</label>
          <label class="option"><input type="radio" name="atom2e2" value="wrong"> aucun échange d'énergie</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom2e2','atom2fb2','Correct — l\'électron descend d\'un niveau supérieur (3) vers un niveau inférieur (2) : c\'est une émission.','Relis la section 4 : le sens du passage entre niveaux (vers le haut ou vers le bas) détermine s\'il y a absorption ou émission.')">Vérifier</button>
        <div class="feedback" id="atom2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La série de Balmer, dans le domaine visible, correspond aux transitions se terminant sur le niveau :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom2e3" value="wrong"> $n=1$</label>
          <label class="option"><input type="radio" name="atom2e3" value="right"> $n=2$</label>
          <label class="option"><input type="radio" name="atom2e3" value="wrong"> $n=3$</label>
          <label class="option"><input type="radio" name="atom2e3" value="wrong"> $n=\\infty$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom2e3','atom2fb3','Correct — la série de Balmer regroupe les transitions p>2 vers n=2, seule série qui tombe dans le visible.','Reviens au tableau de la section 5 : chaque série est associée à un niveau d\'arrivée n précis.')">Vérifier</button>
        <div class="feedback" id="atom2fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la constante de Planck $h$ était beaucoup plus grande qu'elle ne l'est réellement : les niveaux d'énergie de l'atome seraient-ils plus ou moins espacés, et notre monde macroscopique en serait-il changé ?</li>
        <li>Pourquoi Bohr a-t-il dû introduire un postulat (la quantification du moment cinétique) sans justification théorique à l'époque, plutôt que de le déduire d'une théorie physique préexistante ?</li>
        <li>Quelle serait la conséquence, pour l'astrophysique, si l'on ne pouvait pas exploiter la formule de Rydberg pour analyser la lumière des étoiles lointaines ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>N. Bohr, « On the Constitution of Atoms and Molecules », Philosophical Magazine, 1913 — l'article fondateur du modèle atomique de Bohr.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard pour le modèle de Bohr en licence.</li>
        <li>T. F. Gallagher, <em>Rydberg Atoms</em>, Cambridge University Press, 1994 — référence moderne sur les atomes de Rydberg et leurs applications en physique quantique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu viens de comprendre comment un simple postulat de quantification a résolu une énigme spectroscopique vieille de décennies, et ouvert la voie à toute la physique quantique moderne. Le chapitre suivant, « Nombres quantiques et description des orbitales atomiques », va dépasser les limites du modèle de Bohr (rigoureusement valable pour un seul électron) en introduisant le formalisme quantique moderne, capable de décrire n'importe quel atome du tableau périodique. Comme le disait Bohr lui-même, conscient des limites de son propre modèle : « Il est difficile de prédire, surtout l'avenir. » Le sien, pourtant, a remarquablement bien résisté à l'épreuve du temps.</p>
  `
};

ATOM_NOVA_KB[atomKey('Le modèle de Bohr et la quantification de l\'énergie')] = {
  intro: "Salut, moi c'est Nova ! On étudie le modèle de Bohr : quantification du rayon et de l'énergie, spectre de l'hydrogène et énergie d'ionisation. Demande-moi la formule de En, la formule de Rydberg, ou les séries spectrales.",
  rules: [
    { test:/hypoth[èe]ses.*bohr|mod[èe]le de bohr/i, replies:["Les 4 hypothèses de Bohr : noyau immobile et électron sur une orbite circulaire ; orbites stationnaires sans émission d'énergie ; échange d'énergie ΔE=hν entre niveaux ; quantification du moment cinétique mvr=nh/2π."] },
    { test:/[ée]nergie.*niveau|E_?n|formule.*[ée]nergie/i, replies:["L'énergie du niveau n de l'atome d'hydrogène est En=-13,6/n² eV (état fondamental E1=-13,6 eV pour n=1)."] },
    { test:/rayon.*orbite|r_?n/i, replies:["Le rayon de l'orbite n est rn=ε₀h²n²/(πme²), soit rn=r1·n² avec r1=0,529 Å pour l'hydrogène."] },
    { test:/rydberg/i, replies:["La formule de Rydberg est 1/λ=R_H(1/n²-1/p²), avec R_H=me⁴/(8ε₀²h³c), et elle permet de calculer toutes les longueurs d'onde du spectre de l'hydrogène."] },
    { test:/lyman|balmer|paschen|brackett|pfund|s[ée]rie/i, replies:["Les séries spectrales correspondent au niveau d'arrivée n : Lyman (n=1, UV), Balmer (n=2, visible), Paschen (n=3), Brackett (n=4) et Pfund (n=5), ces trois dernières dans l'infrarouge."] },
    { test:/ionisation/i, replies:["L'énergie d'ionisation est l'énergie nécessaire pour amener l'électron de son état fondamental (n=1) jusqu'à l'infini (E∞=0) : elle vaut 13,6 eV pour l'hydrogène."] },
    { test:/hydrog[ée]no[ïi]de/i, replies:["Pour un ion hydrogénoïde (un seul électron, numéro atomique Z), on généralise avec ET=E1·Z²/n² et rn=r1·n²/Z."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise En=-13,6/n².","Indice niveau 2 : avec n=2, calcule -13,6/4.","Indice niveau 3 : E2=-3,4 eV."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde si l'électron monte ou descend en énergie.","Indice niveau 2 : ici il descend de n=3 vers n=2.","Indice niveau 3 : c'est une émission."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : chaque série correspond à un niveau d'arrivée fixe.","Indice niveau 2 : seule une des cinq séries tombe dans le visible.","Indice niveau 3 : Balmer, n=2."] }
  ]
};


/* =========================== CHAPITRE 3 — Nombres quantiques et description des orbitales atomiques =========================== */
ATOM_CHAPTERS[atomKey('Nombres quantiques et description des orbitales atomiques')] = {
  objectives: [
    "Définir les quatre nombres quantiques n, l, m et s et donner leur domaine de valeurs",
    "Associer à chaque valeur de l une sous-couche (s, p, d, f) et une géométrie d'orbitale",
    "Dénombrer les orbitales et le nombre maximal d'électrons d'une couche n donnée",
    "Distinguer couche, sous-couche et case quantique",
    "Analyser pourquoi la mécanique quantique remplace la notion classique de « trajectoire précise » de l'électron par celle, probabiliste, d'orbitale"
  ],
  prereqs: ["Le modèle de Bohr et la quantification de l'énergie"],
  bodyHtml: `
    <p>En 1926, Erwin Schrödinger publie une équation qui va bouleverser irrémédiablement notre façon de penser l'atome : contrairement à l'orbite précise et déterministe de Bohr, sa fonction d'onde ne prédit qu'une <strong>probabilité</strong> de trouver l'électron en tel ou tel point de l'espace. Cette révolution conceptuelle, difficile à accepter même pour certains physiciens de renom de l'époque (Einstein lui-même n'a jamais pleinement adhéré à cette interprétation probabiliste, résumant son scepticisme par la formule célèbre « Dieu ne joue pas aux dés »), s'est pourtant révélée être l'un des cadres théoriques les plus rigoureusement vérifiés de toute l'histoire de la physique.</p>
    <p>Ce changement de paradigme n'a rien d'anecdotique pour la chimie : c'est précisément la forme de ces nuages de probabilité — les orbitales atomiques que ce chapitre te propose de décrire — qui détermine la géométrie des molécules, la nature des liaisons chimiques, et in fine, l'immense diversité de la matière qui t'entoure. Comprendre les orbitales, c'est comprendre pourquoi le carbone forme quatre liaisons et l'oxygène seulement deux, et poser les bases indispensables à toute la chimie structurale des chapitres suivants.</p>
    <p>Le modèle de Bohr, historiquement fondateur, ne suffit pas à décrire des atomes polyélectroniques ni la forme réelle du nuage électronique. La mécanique quantique moderne décrit l'état de chaque électron d'un atome à l'aide de <strong>quatre nombres quantiques</strong>, qui déterminent son énergie, sa distance moyenne au noyau et la forme de la région de l'espace — l'<strong>orbitale atomique</strong> — où l'on a la plus grande probabilité de le trouver. À la fin de ce chapitre, tu sauras décrire complètement n'importe quel électron d'un atome, et prédire le nombre et la forme de ses orbitales.</p>

    <h3>1. Nombre quantique principal $n$</h3>
    <p>$n$ prend les valeurs entières $1,2,3,\\ldots,\\infty$ et définit la <strong>couche</strong> électronique (donc, essentiellement, l'énergie de l'électron dans un atome hydrogénoïde). On appelle couche l'ensemble des orbitales qui partagent la même valeur de $n$ ; ces couches sont traditionnellement désignées par les lettres K ($n=1$), L ($n=2$), M ($n=3$), N ($n=4$)...</p>

    <h3>2. Nombre quantique secondaire (ou azimutal) $l$</h3>
    <p>$l$ peut prendre toutes les valeurs entières comprises entre $0$ et $n-1$ : $0 \\le l \\le n-1$. Il définit la <strong>sous-couche</strong> et détermine la géométrie de l'orbitale. Dans la notation spectroscopique, chaque valeur de $l$ est associée à une lettre :</p>
    <table class="mini-table">
      <tr><th>$l$</th><th>Sous-couche</th><th>Forme de l'orbitale</th></tr>
      <tr><td>0</td><td>s</td><td>Sphérique</td></tr>
      <tr><td>1</td><td>p</td><td>Bilobée (trois orientations)</td></tr>
      <tr><td>2</td><td>d</td><td>Plus complexe (cinq orientations)</td></tr>
      <tr><td>3</td><td>f</td><td>Encore plus complexe (sept orientations)</td></tr>
    </table>

    <h3>3. Nombre quantique magnétique $m$</h3>
    <p>$m$ définit la <strong>case quantique</strong>, c'est-à-dire l'orientation de l'orbitale dans l'espace. Il peut prendre toutes les valeurs entières comprises entre $-l$ et $+l$ : $-l \\le m \\le +l$, soit $2l+1$ valeurs possibles — donc $2l+1$ orbitales distinctes pour une sous-couche donnée. Ainsi, la sous-couche s ($l=0$) ne compte qu'une orbitale ($m=0$), la sous-couche p ($l=1$) en compte trois ($m=-1,0,+1$), la sous-couche d ($l=2$) en compte cinq, et la sous-couche f ($l=3$) en compte sept.</p>

    <h3>4. Nombre quantique de spin $s$</h3>
    <p>Pour décrire complètement un électron, il faut lui attribuer un quatrième nombre quantique, lié à sa rotation propre autour de lui-même, noté $s$ (ou $m_s$). Il ne peut prendre que deux valeurs :</p>
    <p>$$s = +\\dfrac{1}{2}\\ (\\uparrow) \\quad \\text{ou} \\quad s = -\\dfrac{1}{2}\\ (\\downarrow)$$</p>
    <p>Chaque orbitale atomique, définie par la combinaison $(n,l,m)$, ne peut donc accueillir que deux électrons au maximum, distingués par leur spin opposé (voir le principe d'exclusion de Pauli au chapitre suivant).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le spin de l'électron n'a pas d'équivalent classique intuitif direct (ce n'est pas une véritable « rotation » de l'électron sur lui-même au sens mécanique), pourtant il est indispensable pour décrire complètement son état quantique. Pourquoi la mécanique quantique a-t-elle eu besoin d'introduire cette propriété supplémentaire, alors que les trois autres nombres quantiques (n, l, m) suffisaient déjà à décrire la position et l'énergie de l'électron ?
    </div>

    <h3>5. Description des orbitales</h3>
    <p>Chaque type d'orbitale possède une forme géométrique caractéristique dans l'espace :</p>
    <ul>
      <li><strong>Orbitale s</strong> : une seule orientation ($m=0$), de symétrie sphérique ;</li>
      <li><strong>Orbitale p</strong> : trois orientations ($m=-1,0,+1$), chacune formée de deux lobes selon un axe ($p_x$, $p_y$, $p_z$) ;</li>
      <li><strong>Orbitale d</strong> : cinq orientations, de formes plus complexes (quatre lobes pour la plupart) ;</li>
      <li><strong>Orbitale f</strong> : sept orientations, formes encore plus complexes.</li>
    </ul>

    <h3>6. Nombre d'orbitales et d'électrons par couche</h3>
    <p>Pour une couche $n$ donnée, on dénombre :</p>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Formule</th></tr>
      <tr><td>Nombre de sous-couches</td><td>$n$</td></tr>
      <tr><td>Nombre total d'orbitales</td><td>$n^2$</td></tr>
      <tr><td>Nombre maximal d'électrons</td><td>$2n^2$</td></tr>
    </table>
    <p>Par exemple, la quatrième couche électronique ($n=4$) compte $4^2=16$ orbitales et peut contenir au maximum $2\\times4^2=32$ électrons.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Un électron dans un atome est entièrement caractérisé par le quadruplet $(n,l,m,s)$ : $n$ fixe la couche, $l$ ($0\\le l\\le n-1$) la sous-couche et la forme de l'orbitale (s, p, d, f), $m$ ($-l\\le m\\le l$) son orientation dans l'espace, et $s=\\pm1/2$ son spin. Une couche $n$ compte $n^2$ orbitales et accueille au plus $2n^2$ électrons.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les orbitales atomiques ne sont pas des trajectoires précises mais des régions de l'espace où la probabilité de présence de l'électron est significative (typiquement supérieure à 90 %). Comment cette notion probabiliste change-t-elle fondamentalement l'image que l'on peut se faire d'un atome, comparée au modèle planétaire de Bohr où l'électron suit une orbite parfaitement définie ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>La visualisation directe des orbitales atomiques, longtemps considérée comme un simple outil mathématique inaccessible à l'observation, est devenue une réalité expérimentale grâce à la microscopie à effet tunnel et, plus récemment, à des techniques de spectroscopie photoélectronique résolue en angle, qui permettent littéralement de « photographier » la densité électronique de certaines molécules. Ces avancées technologiques confirment de façon spectaculaire les formes prédites depuis un siècle par la seule résolution mathématique de l'équation de Schrödinger.</p>
    <p><strong>Question ouverte :</strong> comment étendre efficacement les calculs d'orbitales atomiques, déjà complexes pour des atomes à plusieurs électrons, à des molécules comportant des centaines voire des milliers d'atomes ? C'est le défi central de la chimie quantique computationnelle, un domaine de recherche en plein essor grâce aux progrès du calcul haute performance.</p>
    <p><strong>Technologie émergente :</strong> les ordinateurs quantiques, dont certaines architectures (qubits supraconducteurs, atomes de Rydberg) exploitent directement des états quantiques analogues à ceux des orbitales atomiques, sont explorés comme outils futurs pour simuler avec une précision inégalée le comportement d'atomes et de molécules complexes.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Équation de Schrödinger → quatre nombres quantiques (n, l, m, s) → couche → sous-couche (forme) → orientation dans l'espace → spin (2 électrons max par orbitale) → structure électronique complète de l'atome
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Nombre maximal d'électrons par couche} = 2n^2$$
      Cette formule, dérivée directement du dénombrement des combinaisons possibles des quatre nombres quantiques, explique la structure même du tableau périodique — le nombre d'éléments de chaque ligne — que tu retrouveras dans quelques chapitres.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>$n$ : couche ($1,2,3,\\ldots$) ; $l$ : sous-couche, $0\\le l\\le n-1$ (s, p, d, f pour $l=0,1,2,3$)</li>
        <li>$m$ : orientation de l'orbitale, $-l\\le m\\le+l$, soit $2l+1$ orbitales par sous-couche</li>
        <li>$s=\\pm1/2$ : spin de l'électron, deux électrons maximum par orbitale</li>
        <li>Une couche $n$ contient $n^2$ orbitales et $2n^2$ électrons au maximum</li>
        <li>Formes : s sphérique, p bilobée (3), d complexe (5), f complexe (7)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que $l$ commence à 0, pas à 1 : pour $n=1$, seule la sous-couche s ($l=0$) existe</li>
        <li>Confondre le nombre de sous-couches ($n$) avec le nombre d'orbitales ($n^2$)</li>
        <li>Croire qu'une orbitale peut accueillir plus de deux électrons : la limite de deux vient directement du nombre de valeurs possibles de $s$</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour $n=3$, les valeurs possibles du nombre quantique secondaire $l$ sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom3e1" value="wrong"> 1, 2, 3</label>
          <label class="option"><input type="radio" name="atom3e1" value="right"> 0, 1, 2</label>
          <label class="option"><input type="radio" name="atom3e1" value="wrong"> 0, 1, 2, 3</label>
          <label class="option"><input type="radio" name="atom3e1" value="wrong"> -3, -2, -1</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom3e1','atom3fb1','Correct — l va de 0 à n-1, donc pour n=3 : l=0, 1, 2 (sous-couches 3s, 3p, 3d).','Utilise 0 ≤ l ≤ n-1 avec n=3.')">Vérifier</button>
        <div class="feedback" id="atom3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le nombre d'orbitales d'une sous-couche d ($l=2$) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom3e2" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="atom3e2" value="wrong"> 3</label>
          <label class="option"><input type="radio" name="atom3e2" value="right"> 5</label>
          <label class="option"><input type="radio" name="atom3e2" value="wrong"> 7</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom3e2','atom3fb2','Correct — le nombre d\'orbitales est 2l+1=2×2+1=5.','Utilise la formule 2l+1 avec l=2.')">Vérifier</button>
        <div class="feedback" id="atom3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le nombre maximal d'électrons que peut contenir la couche $n=3$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom3e3" value="wrong"> 9</label>
          <label class="option"><input type="radio" name="atom3e3" value="wrong"> 12</label>
          <label class="option"><input type="radio" name="atom3e3" value="right"> 18</label>
          <label class="option"><input type="radio" name="atom3e3" value="wrong"> 32</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom3e3','atom3fb3','Correct — 2n²=2×3²=2×9=18 électrons au maximum.','Utilise la formule 2n² avec n=3.')">Vérifier</button>
        <div class="feedback" id="atom3fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'électron avait un spin pouvant prendre trois valeurs au lieu de deux : combien d'électrons chaque orbitale pourrait-elle alors accueillir, et comment le tableau périodique en serait-il changé ?</li>
        <li>Pourquoi Einstein, malgré son rôle pionnier dans la physique quantique (il reçoit le prix Nobel pour l'effet photoélectrique), n'a-t-il jamais pleinement accepté l'interprétation probabiliste de la fonction d'onde ?</li>
        <li>Quelle serait la conséquence, pour la chimie computationnelle, d'une méthode permettant de résoudre exactement l'équation de Schrödinger pour des molécules de plusieurs milliers d'atomes ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>E. Schrödinger, « Quantisierung als Eigenwertproblem », Annalen der Physik, 1926 — l'article fondateur de la mécanique ondulatoire.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur les nombres quantiques et les orbitales atomiques en licence.</li>
        <li>P. Hohenberg, W. Kohn, « Inhomogeneous Electron Gas », Physical Review, 1964 — fondement de la théorie de la fonctionnelle de la densité, outil moderne de calcul des orbitales moléculaires.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais du langage précis de la mécanique quantique pour décrire n'importe quel électron d'un atome. Le chapitre suivant, « Configuration électronique des atomes : règles de remplissage », va t'apprendre à organiser ces électrons dans les orbitales que tu viens de découvrir, en suivant des règles précises qui expliquent la structure entière du tableau périodique. Comme le disait Schrödinger lui-même, conscient du caractère déroutant de sa propre théorie : « Je n'aime pas ça, et je regrette d'y avoir jamais été mêlé. » Un aveu surprenant, pour l'un des pères fondateurs de la physique la mieux vérifiée de l'histoire.</p>
  `
};

ATOM_NOVA_KB[atomKey('Nombres quantiques et description des orbitales atomiques')] = {
  intro: "Salut, moi c'est Nova ! On étudie les quatre nombres quantiques n, l, m, s et la forme des orbitales atomiques. Demande-moi le domaine de valeurs de l, le nombre d'orbitales par sous-couche, ou le nombre maximal d'électrons par couche.",
  rules: [
    { test:/nombre quantique principal|\\bn\\b.*couche/i, replies:["Le nombre quantique principal n (1,2,3,...) définit la couche électronique. On appelle couche l'ensemble des orbitales de même n."] },
    { test:/nombre quantique secondaire|azimutal|\\bl\\b.*sous.couche/i, replies:["Le nombre quantique secondaire l va de 0 à n-1 et définit la sous-couche : l=0 → s, l=1 → p, l=2 → d, l=3 → f."] },
    { test:/nombre quantique magn[ée]tique|\\bm\\b.*orientation/i, replies:["Le nombre quantique magnétique m va de -l à +l, soit 2l+1 valeurs : c'est le nombre d'orbitales de la sous-couche, chacune correspondant à une orientation différente dans l'espace."] },
    { test:/spin/i, replies:["Le nombre quantique de spin s ne prend que deux valeurs : +1/2 ou -1/2. Il permet de distinguer les deux électrons au maximum qu'une même orbitale peut accueillir."] },
    { test:/2n|nombre maximal.*[ée]lectrons|combien d.[ée]lectrons/i, replies:["Une couche n contient n² orbitales et peut accueillir au maximum 2n² électrons."] },
    { test:/forme.*orbitale|orbitale s|orbitale p|orbitale d/i, replies:["L'orbitale s est sphérique (une seule orientation). L'orbitale p a une forme bilobée, avec 3 orientations possibles. L'orbitale d a une forme plus complexe, avec 5 orientations."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise 0≤l≤n-1.","Indice niveau 2 : avec n=3, l va de 0 à 2.","Indice niveau 3 : l=0, 1, 2."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise la formule 2l+1.","Indice niveau 2 : avec l=2, calcule 2×2+1.","Indice niveau 3 : 5 orbitales."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : utilise la formule 2n².","Indice niveau 2 : avec n=3, calcule 2×9.","Indice niveau 3 : 18 électrons."] }
  ]
};


/* =========================== CHAPITRE 4 — Configuration électronique des atomes : règles de remplissage =========================== */
ATOM_CHAPTERS[atomKey('Configuration électronique des atomes : règles de remplissage')] = {
  objectives: [
    "Appliquer la règle de Klechkowski pour établir l'ordre de remplissage des sous-couches",
    "Énoncer le principe d'exclusion de Pauli et la règle de Hund, et les appliquer à une représentation en cases quantiques",
    "Identifier la couche de valence d'un atome et écrire son schéma de Lewis",
    "Énoncer la règle de l'octet et citer ses limites",
    "Évaluer, face à un élément de configuration électronique inhabituelle (comme le chrome ou le cuivre), s'il s'agit d'une erreur ou d'une exception légitime et pourquoi"
  ],
  prereqs: ["Nombres quantiques et description des orbitales atomiques"],
  bodyHtml: `
    <p>En 1925, Wolfgang Pauli, alors âgé de 25 ans seulement, formule un principe d'une simplicité trompeuse qui va pourtant expliquer l'intégralité de la structure du tableau périodique : deux électrons d'un même atome ne peuvent jamais partager exactement le même état quantique. Ce principe d'exclusion, qui vaudra à Pauli le prix Nobel de physique en 1945, n'est pas seulement une curiosité mathématique — c'est lui qui explique pourquoi la matière occupe un volume, pourquoi tu ne traverses pas le sol sur lequel tu marches, et pourquoi les étoiles à neutrons, en fin de vie, ne s'effondrent pas indéfiniment sous leur propre gravité (elles sont stabilisées par la même « pression de dégénérescence » qui découle du principe de Pauli, appliqué cette fois aux neutrons plutôt qu'aux électrons).</p>
    <p>Combiné aux règles de Klechkowski et de Hund, ce principe permet de construire, atome par atome, la configuration électronique complète de n'importe quel élément du tableau périodique — et d'expliquer, par la même occasion, pourquoi ce tableau a précisément la forme qu'on lui connaît (lignes de longueurs différentes, colonnes aux propriétés chimiques similaires). Ce chapitre te donne les trois règles indispensables pour reconstruire cette architecture depuis ses fondements.</p>
    <p>Connaître les nombres quantiques possibles ne suffit pas : il faut encore savoir dans quel ordre les électrons d'un atome polyélectronique occupent réellement les orbitales disponibles. Trois règles gouvernent ce remplissage : Klechkowski, Pauli et Hund. À la fin de ce chapitre, tu sauras écrire la configuration électronique complète de n'importe quel atome, et identifier ses électrons de valence responsables de sa réactivité chimique.</p>

    <h3>1. Règle de Klechkowski</h3>
    <p>On classe toutes les orbitales atomiques par ordre d'énergie croissante : l'énergie croît avec la somme $(n+l)$ ; si deux sous-couches ont la même valeur de $(n+l)$, celle de plus petit $n$ est remplie en premier. L'ordre de remplissage obtenu en suivant les diagonales du tableau des sous-couches est :</p>
    <p>$$1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s < 4d < 5p < 6s < 4f < 5d < 6p < 7s < \\ldots$$</p>
    <p><strong>Exceptions notables</strong> : certains éléments s'écartent de cet ordre pour atteindre une sous-couche d à demi-remplie ou totalement remplie, plus stable. Par exemple :</p>
    <table class="mini-table">
      <tr><th>Élément</th><th>Configuration attendue</th><th>Configuration réelle</th></tr>
      <tr><td>Chrome \${}_{24}\\text{Cr}$</td><td>[Ar] 3d⁴ 4s²</td><td>[Ar] 3d⁵ 4s¹</td></tr>
      <tr><td>Cuivre \${}_{29}\\text{Cu}$</td><td>[Ar] 3d⁹ 4s²</td><td>[Ar] 3d¹⁰ 4s¹</td></tr>
    </table>

    <h3>2. Principe d'exclusion de Pauli</h3>
    <p>Dans un atome, deux électrons ne peuvent jamais avoir le même jeu des quatre nombres quantiques $(n,l,m,s)$. Conséquence directe : une orbitale, définie par $(n,l,m)$, ne peut contenir que <strong>deux électrons au maximum</strong>, nécessairement de spins opposés ($s=+1/2$ et $s=-1/2$).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le principe de Pauli, formulé pour des électrons dans un atome, se généralise à toutes les particules de la famille des fermions (y compris les neutrons) et explique pourquoi les étoiles à neutrons ne s'effondrent pas indéfiniment sous leur propre gravité. Comment un principe aussi « microscopique », portant sur des nombres quantiques individuels, peut-il avoir des conséquences à l'échelle d'un objet astrophysique aussi massif qu'une étoile ?
    </div>

    <h3>3. Règle de Hund</h3>
    <p>Lorsque plusieurs orbitales atomiques ont la même énergie (une même sous-couche p, d...), les électrons occupent d'abord le <strong>maximum d'orbitales avec des spins parallèles</strong>, avant de commencer à s'apparier. Exemple du carbone ($Z=6$), de configuration $1s^2\\,2s^2\\,2p^2$ : les deux électrons de la sous-couche 2p occupent deux cases distinctes avec un spin identique, plutôt que de s'apparier dans une même case.</p>

    <h3>4. Représentation en cases quantiques</h3>
    <p>On représente souvent chaque orbitale par une case, et chaque électron par une flèche vers le haut (spin up) ou vers le bas (spin down). Les règles de remplissage se traduisent alors ainsi :</p>
    <ul>
      <li>les électrons remplissent les cases de gauche à droite, par énergie croissante (Klechkowski) ;</li>
      <li>ils remplissent d'abord chaque case d'une sous-couche avec un spin unique (up), avant de s'apparier (Hund) ;</li>
      <li>une case ne peut contenir que deux électrons, nécessairement de spins opposés (Pauli).</li>
    </ul>
    <p>Une configuration où une case de haute énergie est occupée alors qu'une case de plus basse énergie reste vide viole le principe (a) de Klechkowski et n'est jamais correcte.</p>

    <h3>5. Couche de valence</h3>
    <p>Les <strong>électrons de valence</strong> sont ceux de la couche externe (la couche de plus grand $n$ occupée), susceptibles de participer aux liaisons chimiques entre atomes. Ce sont eux, et eux seuls, qui déterminent le comportement chimique de l'élément.</p>

    <h3>6. Schéma de Lewis</h3>
    <p>Le schéma de Lewis d'un atome ne représente que les électrons de sa couche de valence, groupés en doublets (représentés par un petit trait) ou laissés seuls (électrons célibataires). Par exemple, dans la molécule H–Cl, on distingue un doublet liant (partagé entre H et Cl) et des doublets non liants (propres au chlore).</p>

    <h3>7. Règle de l'octet</h3>
    <p>Règle empirique selon laquelle, dans une molécule, chaque atome tend à s'entourer de 8 électrons (en représentation de Lewis) — c'est-à-dire à acquérir la structure électronique du gaz rare le plus proche, en cédant, en captant ou en partageant des électrons. Si la deuxième couche pleine se limite à 2 électrons pour le premier élément (hydrogène, hélium), c'est la <strong>règle du duet</strong>.</p>
    <p>Cette règle connaît cependant des exceptions, en particulier hors de la deuxième période : certains atomes (bore) peuvent posséder moins de 8 électrons, d'autres (phosphore, soufre, à partir de la 3e période, grâce à la disponibilité des orbitales d) peuvent en posséder davantage.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      La configuration électronique d'un atome se construit en respectant simultanément trois règles : Klechkowski (ordre d'énergie croissante $n+l$), Pauli (deux électrons maximum par orbitale, spins opposés) et Hund (occupation maximale à spins parallèles avant appariement). Seuls les électrons de la couche de valence gouvernent la chimie de l'élément, avec la règle de l'octet comme guide (non absolu) de stabilité.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les exceptions du chrome et du cuivre s'expliquent par une plus grande stabilité d'une sous-couche 3d demi-remplie ou totalement remplie. Sachant que ce gain de stabilité résulte d'un compromis énergétique subtil entre plusieurs effets quantiques, pourquoi ces exceptions restent-elles rares plutôt que systématiques pour tous les éléments proches d'un tel remplissage favorable ?
    </div>

    <h3>8. Frontière de la recherche</h3>
    <p>Le principe d'exclusion de Pauli continue de fasciner les physiciens par la diversité de ses conséquences : au-delà des étoiles à neutrons déjà évoquées, il explique aussi pourquoi les naines blanches (résidus stellaires stabilisés par la pression de dégénérescence électronique) ne peuvent pas dépasser une masse limite précise, la limite de Chandrasekhar, découverte en 1930 et récompensée par le prix Nobel de physique 1983. Ce même principe est aujourd'hui exploité en physique de la matière condensée pour comprendre le comportement des électrons dans les matériaux les plus exotiques, comme les supraconducteurs à haute température critique.</p>
    <p><strong>Question ouverte :</strong> peut-on prédire, par calcul quantique pur (sans recourir à l'observation expérimentale), quels éléments présenteront une configuration électronique exceptionnelle comme celles du chrome et du cuivre ? C'est un test rigoureux pour les méthodes de chimie quantique computationnelle les plus avancées.</p>
    <p><strong>Technologie émergente :</strong> les calculs de structure électronique par intelligence artificielle, entraînés sur des bases de données de configurations électroniques connues, cherchent aujourd'hui à prédire automatiquement le comportement chimique de nouveaux matériaux avant même leur synthèse en laboratoire.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Klechkowski (ordre n+l croissant) → Pauli (2 électrons max/orbitale, spins opposés) → Hund (spins parallèles avant appariement) → configuration électronique complète → couche de valence → règle de l'octet
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Ordre de remplissage} = (n+l) \\text{ croissant, puis } n \\text{ croissant}$$
      Cette règle mnémotechnique, illustrée par le célèbre diagramme en diagonales de Klechkowski, explique à elle seule la structure entière du tableau périodique — ses lignes de longueurs différentes et l'apparition, à partir de la quatrième période, des éléments de transition (blocs d) et des terres rares (blocs f).
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Klechkowski : ordre de remplissage par $(n+l)$ croissant, puis $n$ croissant à $(n+l)$ égal — exceptions Cr et Cu (demi-remplissage/remplissage complet du 3d)</li>
        <li>Pauli : 2 électrons maximum par orbitale, spins obligatoirement opposés</li>
        <li>Hund : occupation maximale à spins parallèles avant tout appariement dans une sous-couche</li>
        <li>Électrons de valence = couche externe = seuls responsables de la réactivité chimique</li>
        <li>Règle de l'octet (ou du duet pour H/He) : tendance, non systématique, à s'entourer de 8 (ou 2) électrons</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Écrire la configuration du chrome ou du cuivre en suivant Klechkowski sans tenir compte de leurs exceptions connues</li>
        <li>Apparier deux électrons dans une case avant d'avoir rempli toutes les cases de même énergie à spin unique (violation de Hund)</li>
        <li>Croire que la règle de l'octet est absolue : elle échoue notamment pour le bore (moins de 8) et pour les éléments à partir de la 3e période (plus de 8, via les orbitales d)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">D'après la règle de Klechkowski, la sous-couche 4s se remplit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom4e1" value="wrong"> après la sous-couche 3d</label>
          <label class="option"><input type="radio" name="atom4e1" value="right"> avant la sous-couche 3d</label>
          <label class="option"><input type="radio" name="atom4e1" value="wrong"> en même temps que 4p</label>
          <label class="option"><input type="radio" name="atom4e1" value="wrong"> après 4p</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom4e1','atom4fb1','Correct — l\'ordre de Klechkowski place 4s (n+l=4) avant 3d (n+l=5).','Compare les valeurs de n+l pour 4s et 3d : la sous-couche de plus petit n+l se remplit en premier.')">Vérifier</button>
        <div class="feedback" id="atom4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La règle de Hund impose que, dans une sous-couche p partiellement remplie, les électrons :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom4e2" value="wrong"> s'apparient d'abord dans la première case</label>
          <label class="option"><input type="radio" name="atom4e2" value="right"> occupent le maximum de cases avec des spins parallèles avant de s'apparier</label>
          <label class="option"><input type="radio" name="atom4e2" value="wrong"> ont tous un spin -1/2</label>
          <label class="option"><input type="radio" name="atom4e2" value="wrong"> occupent une seule case au maximum</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom4e2','atom4fb2','Correct — c\'est exactement l\'énoncé de la règle de Hund, illustré par le carbone 1s²2s²2p².','Relis la section 3 : la règle de Hund concerne l\'ordre d\'occupation des cases de même énergie.')">Vérifier</button>
        <div class="feedback" id="atom4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La règle de l'octet :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom4e3" value="wrong"> s'applique sans aucune exception à tous les atomes</label>
          <label class="option"><input type="radio" name="atom4e3" value="right"> connaît des exceptions, notamment pour le bore et les éléments à partir de la 3e période</label>
          <label class="option"><input type="radio" name="atom4e3" value="wrong"> ne concerne que les électrons de cœur</label>
          <label class="option"><input type="radio" name="atom4e3" value="wrong"> impose exactement 8 électrons de valence pour l'hydrogène</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom4e3','atom4fb3','Correct — le bore peut avoir moins de 8 électrons, et des éléments comme le phosphore ou le soufre peuvent en avoir plus, grâce aux orbitales d disponibles à partir de la 3e période.','Relis la section 7 : la règle de l\'octet est une tendance générale, pas une loi universelle.')">Vérifier</button>
        <div class="feedback" id="atom4fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le principe de Pauli n'existait pas (si plusieurs électrons pouvaient occuper le même état quantique) : à quoi ressemblerait la matière, et le tableau périodique aurait-il encore un sens ?</li>
        <li>Pourquoi seuls quelques éléments comme le chrome et le cuivre présentent-ils une exception à la règle de Klechkowski, alors que d'autres éléments proches d'un remplissage tout aussi « favorable » n'en présentent pas ?</li>
        <li>Quelle serait la conséquence, pour l'astrophysique, si le principe d'exclusion de Pauli ne s'appliquait pas aux neutrons dans une étoile en fin de vie ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>W. Pauli, « Über den Zusammenhang des Abschlusses der Elektronengruppen im Atom mit der Komplexstruktur der Spektren », Zeitschrift für Physik, 1925 — l'article fondateur du principe d'exclusion.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur les règles de remplissage électronique en licence.</li>
        <li>S. Chandrasekhar, « The Maximum Mass of Ideal White Dwarfs », The Astrophysical Journal, 1931 — application du principe de Pauli à l'astrophysique stellaire (prix Nobel de physique 1983).</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais construire la configuration électronique complète de n'importe quel atome, en respectant les trois règles fondamentales qui gouvernent leur remplissage. Le chapitre suivant, « Classification périodique des éléments et propriétés périodiques », va révéler que le tableau périodique n'est autre que la traduction visuelle directe de ces mêmes règles — chaque ligne, chaque colonne y prend enfin tout son sens. Comme le disait Pauli lui-même, avec la rigueur intellectuelle qui l'a toujours caractérisé : « Ce n'est même pas faux » — sa formule favorite pour qualifier une idée si vague qu'elle ne mérite même pas d'être réfutée. Son propre principe, lui, ne souffre d'aucune ambiguïté de ce genre.</p>
  `
};

ATOM_NOVA_KB[atomKey('Configuration électronique des atomes : règles de remplissage')] = {
  intro: "Salut, moi c'est Nova ! On étudie la configuration électronique : règle de Klechkowski, principe de Pauli, règle de Hund, couche de valence et règle de l'octet. Demande-moi l'ordre de remplissage, les exceptions du chrome et du cuivre, ou les limites de la règle de l'octet.",
  rules: [
    { test:/klechkowski|ordre.*remplissage/i, replies:["La règle de Klechkowski classe les sous-couches par (n+l) croissant ; à (n+l) égal, la sous-couche de plus petit n se remplit en premier. Cela donne l'ordre 1s,2s,2p,3s,3p,4s,3d,4p..."] },
    { test:/chrome|cuivre|exception.*klechkowski/i, replies:["Le chrome (Z=24) et le cuivre (Z=29) sont des exceptions classiques : ils adoptent [Ar]3d⁵4s¹ et [Ar]3d¹⁰4s¹ plutôt que la configuration attendue par Klechkowski, pour atteindre une sous-couche 3d demi-remplie ou totalement remplie, plus stable."] },
    { test:/pauli/i, replies:["Le principe de Pauli interdit à deux électrons d'un même atome d'avoir les quatre mêmes nombres quantiques : une orbitale ne peut donc contenir que 2 électrons, de spins opposés."] },
    { test:/hund/i, replies:["La règle de Hund impose, pour des orbitales de même énergie, d'occuper le maximum de cases avec des spins parallèles avant de commencer à apparier les électrons."] },
    { test:/couche de valence|[ée]lectrons de valence/i, replies:["Les électrons de valence sont ceux de la couche externe (le plus grand n occupé) : ce sont eux qui déterminent la réactivité chimique de l'atome."] },
    { test:/lewis/i, replies:["Le schéma de Lewis représente uniquement les électrons de valence, organisés en doublets liants, doublets non liants, ou électrons célibataires."] },
    { test:/octet|duet/i, replies:["La règle de l'octet dit que chaque atome tend à s'entourer de 8 électrons de valence (2 pour H et He, règle du duet). Elle connaît des exceptions : moins de 8 pour le bore, plus de 8 pour des éléments comme P ou S à partir de la 3e période."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare les valeurs de n+l pour 4s et 3d.","Indice niveau 2 : 4s a n+l=4, 3d a n+l=5.","Indice niveau 3 : 4s se remplit avant 3d."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à l'exemple du carbone donné dans le cours.","Indice niveau 2 : les deux électrons 2p du carbone occupent deux cases séparées.","Indice niveau 3 : occupation maximale à spins parallèles avant appariement."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense au bore et aux éléments de la 3e période.","Indice niveau 2 : certains ont moins de 8 électrons, d'autres plus.","Indice niveau 3 : la règle de l'octet connaît des exceptions."] }
  ]
};


/* =========================== CHAPITRE 5 — Classification périodique des éléments et propriétés périodiques =========================== */
ATOM_CHAPTERS[atomKey('Classification périodique des éléments et propriétés périodiques')] = {
  objectives: [
    "Décrire l'organisation du tableau périodique moderne en groupes (colonnes) et périodes (lignes)",
    "Définir les principales propriétés périodiques : électronégativité, rayon atomique, énergie d'ionisation, affinité électronique",
    "Situer les grandes familles chimiques (alcalins, alcalino-terreux, halogènes, gaz rares, métaux de transition...) et leurs propriétés",
    "Relier la position d'un élément dans la classification à la charge de l'ion monoatomique qu'il forme",
    "Évaluer pourquoi Mendeleïev a pu prédire avec succès les propriétés d'éléments encore inconnus de son vivant, simplement en laissant des cases vides dans son tableau"
  ],
  prereqs: ["Configuration électronique des atomes : règles de remplissage"],
  bodyHtml: `
    <p>En 1869, Dmitri Mendeleïev présente à la Société chimique russe un tableau qui va devenir l'un des symboles les plus universellement reconnus de toute la science. Son génie ne réside pas seulement dans le classement des 64 éléments alors connus, mais dans une audace remarquable : là où les propriétés attendues ne correspondaient à aucun élément connu, il laisse délibérément des cases vides, prédisant l'existence future d'éléments inconnus (qu'il baptise provisoirement eka-aluminium, eka-bore, eka-silicium) et annonçant même leurs propriétés chimiques précises. Quelques années plus tard, la découverte du gallium, du scandium et du germanium confirmera ces prédictions avec une exactitude stupéfiante — l'une des validations les plus spectaculaires de l'histoire des sciences.</p>
    <p>Ce tableau, complété et réorganisé depuis sur des bases quantiques rigoureuses (et non plus seulement sur la masse atomique croissante utilisée par Mendeleïev), reste aujourd'hui l'outil de référence absolu de tout chimiste : accroché dans chaque laboratoire du monde, il condense en une seule image l'intégralité des connaissances sur les 118 éléments actuellement connus, et permet de prédire instantanément le comportement chimique d'un élément à partir de sa seule position.</p>
    <p>La classification périodique organise l'ensemble des éléments chimiques connus de façon à faire apparaître, de manière visuelle et prévisible, la périodicité de leurs propriétés physiques et chimiques — une périodicité qui trouve son origine directe dans la structure électronique de chaque atome. À la fin de ce chapitre, tu sauras prédire, à partir de la seule position d'un élément dans le tableau, ses principales propriétés chimiques et la charge de l'ion qu'il forme préférentiellement.</p>

    <h3>1. Bref historique</h3>
    <p>En 1869, Mendeleïev propose une première classification, rangeant par masse croissante les 64 éléments alors connus, avec des cases laissées vides pour des éléments encore à découvrir. On comprend ensuite que la périodicité des propriétés chimiques résulte des analogies de répartition des électrons sur les couches externes des atomes : c'est sur ce principe que repose le tableau périodique moderne.</p>

    <h3>2. Organisation du tableau moderne</h3>
    <p>Les éléments sont rangés par numéro atomique $Z$ croissant :</p>
    <ul>
      <li>les <strong>colonnes</strong> (18 au total) correspondent aux <strong>groupes</strong> (ou familles) : elles rassemblent les éléments ayant le même nombre d'électrons de valence, donc des propriétés chimiques analogues ;</li>
      <li>les <strong>lignes</strong> (7 au total) correspondent aux <strong>périodes</strong> : elles rassemblent les éléments dont les électrons occupent le même nombre de couches à l'état fondamental — le numéro de la période est donc le nombre de couches électroniques occupées.</li>
    </ul>

    <h3>3. Principales propriétés périodiques</h3>
    <table class="mini-table">
      <tr><th>Propriété</th><th>Définition</th></tr>
      <tr><td>Numéro atomique $Z$</td><td>Nombre de protons du noyau ; détermine la nature et la place de l'élément</td></tr>
      <tr><td>Électronégativité (Pauling)</td><td>Tendance d'un atome à attirer vers lui le doublet électronique d'une liaison ; échelle de 0,7 (francium) à 4 (fluor)</td></tr>
      <tr><td>Rayon atomique $r_a$</td><td>Moitié de la distance entre les centres de deux atomes liés par une liaison simple</td></tr>
      <tr><td>Rayon de van der Waals</td><td>Distance d'équilibre entre deux atomes non liés qui s'approchent, entre attraction de van der Waals et répulsion électronique</td></tr>
      <tr><td>Rayon ionique</td><td>Rayon d'un ion dans un cristal ionique, où les orbitales externes des ions voisins sont en contact</td></tr>
      <tr><td>Énergie de 1ère ionisation</td><td>Énergie minimale pour arracher le premier électron d'un atome neutre à l'état fondamental</td></tr>
      <tr><td>Affinité électronique</td><td>Énergie dégagée lorsqu'un atome capte un électron — phénomène inverse de l'ionisation</td></tr>
    </table>
    <p>Ces grandeurs évoluent de façon régulière dans le tableau : le <strong>rayon atomique diminue</strong> le long d'une période (Z croissant) mais <strong>augmente</strong> le long d'une colonne ; à l'inverse, l'<strong>électronégativité</strong> et l'<strong>énergie de première ionisation augmentent</strong> le long d'une période et <strong>diminuent</strong> le long d'une colonne.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le rayon atomique diminue le long d'une période malgré l'ajout continu d'électrons supplémentaires — on pourrait naïvement s'attendre à ce que plus d'électrons signifie un atome plus gros. Comment expliques-tu cette diminution, sachant que ces électrons supplémentaires occupent la MÊME couche externe pendant qu'ils s'ajoutent le long d'une période ?
    </div>

    <h3>4. Les grandes familles chimiques</h3>
    <table class="mini-table">
      <tr><th>Famille</th><th>Électrons de valence</th><th>Comportement</th></tr>
      <tr><td>Alcalins (colonne IA, hors H)</td><td>1</td><td>Cèdent facilement leur électron : cation +1 (Li⁺, Na⁺, K⁺...)</td></tr>
      <tr><td>Alcalino-terreux (IIA)</td><td>2</td><td>Cèdent 2 électrons : cation +2 (Mg²⁺, Ca²⁺...)</td></tr>
      <tr><td>Famille du bore (IIIA)</td><td>3</td><td>Cèdent 3 électrons : cation +3 (Al³⁺...)</td></tr>
      <tr><td>Famille du carbone (IVA)</td><td>4</td><td>Peuvent céder ou capter 4 électrons</td></tr>
      <tr><td>Azotides (VA)</td><td>5</td><td>Captent 3 électrons : anion -3 (N³⁻, P³⁻...)</td></tr>
      <tr><td>Sulfurides (VIA)</td><td>6</td><td>Captent 2 électrons : anion -2 (O²⁻, S²⁻...)</td></tr>
      <tr><td>Halogènes (VIIA)</td><td>7</td><td>Captent 1 électron : anion -1 (F⁻, Cl⁻...)</td></tr>
      <tr><td>Gaz rares (VIIIA)</td><td>8 (sauf He)</td><td>Structure stable, peu réactifs</td></tr>
      <tr><td>Métaux de transition</td><td>variable</td><td>Ne suivent pas la règle de l'octet, forment des alliages</td></tr>
    </table>
    <p>L'hydrogène, bien que situé dans la colonne IA, n'appartient pas à la famille des alcalins : c'est l'élément le plus léger de l'univers, formé d'un seul proton et d'un seul électron, considéré à part.</p>

    <h3>5. Intérêt de la classification : ions et molécules</h3>
    <p>La structure électronique externe détermine à la fois les propriétés chimiques d'un élément et sa place dans la classification. Ainsi :</p>
    <ul>
      <li>les éléments des colonnes 1, 2, 3 ont respectivement 1, 2, 3 électrons de valence et perdent facilement ces électrons pour former des cations $+1$, $+2$, $+3$ (ex. Ca²⁺, Mg²⁺, Al³⁺) ;</li>
      <li>les éléments des colonnes 4, 5, 6, 7 ont respectivement 4, 5, 6, 7 électrons de valence et peuvent former 4, 3, 2, 1 liaisons covalentes pour compléter leur octet — d'où, pour une même colonne, un nombre de liaisons identique dans les molécules formées (HF, HCl, HBr, HI pour les halogènes ; H₂O, H₂S pour la colonne de l'oxygène ; NH₃, PH₃ pour celle de l'azote).</li>
    </ul>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Le tableau périodique classe les éléments par $Z$ croissant : les colonnes (groupes) partagent le même nombre d'électrons de valence, les lignes (périodes) le même nombre de couches occupées. Rayon atomique, électronégativité et énergie d'ionisation varient de façon opposée le long d'une période et d'une colonne, et la position dans le tableau prédit directement la charge des ions monoatomiques formés.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Mendeleïev a pu prédire avec succès l'existence et les propriétés d'éléments encore inconnus, simplement en identifiant des cases vides dans un motif périodique régulier. Qu'est-ce que cette réussite spectaculaire révèle sur la puissance prédictive d'une bonne classification scientifique, même construite avant qu'une théorie complète (ici, la mécanique quantique) n'en explique les fondements ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Le tableau périodique continue de s'étendre : les éléments 113 à 118 (Nihonium, Moscovium, Livermorium, Tennessine, Oganesson...) n'ont été officiellement nommés qu'entre 2016 et aujourd'hui, synthétisés artificiellement dans des accélérateurs de particules et ne survivant, pour certains, que quelques fractions de seconde avant de se désintégrer. Les physiciens et chimistes nucléaires recherchent activement l'« îlot de stabilité », une région théorique de super-lourds éléments qui pourraient présenter une durée de vie inhabituellement longue grâce à des configurations nucléaires particulièrement stables.</p>
    <p><strong>Question ouverte :</strong> existe-t-il une limite fondamentale au nombre d'éléments chimiques pouvant exister, au-delà de laquelle les noyaux deviendraient systématiquement trop instables pour survivre suffisamment longtemps pour être observés ? C'est une question ouverte de la physique nucléaire théorique.</p>
    <p><strong>Technologie émergente :</strong> les accélérateurs de particules de nouvelle génération, comme ceux du laboratoire GSI en Allemagne ou du JINR en Russie, continuent de synthétiser des noyaux toujours plus lourds, repoussant année après année les limites actuelles du tableau périodique.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Numéro atomique Z croissant → structure électronique (couches et sous-couches) → position dans le tableau (période = couches, groupe = valence) → propriétés périodiques (rayon, électronégativité, ionisation) → charge de l'ion préférentiel
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Propriétés chimiques} = f(\\text{configuration électronique de valence})$$
      Cette relation, plus conceptuelle que numérique, est l'idée fondatrice de toute la classification périodique : c'est parce que des éléments partagent le même nombre d'électrons de valence qu'ils partagent des propriétés chimiques analogues, indépendamment de leur masse ou de leur numéro atomique absolu.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Colonnes = groupes (même nombre d'électrons de valence) ; lignes = périodes (même nombre de couches occupées)</li>
        <li>Le long d'une période (Z croissant) : rayon atomique diminue, électronégativité et énergie d'ionisation augmentent</li>
        <li>Le long d'une colonne (Z croissant) : rayon atomique augmente, électronégativité et énergie d'ionisation diminuent</li>
        <li>Alcalins (+1), alcalino-terreux (+2), famille du bore (+3), azotides (-3), sulfurides (-2), halogènes (-1), gaz rares (inertes)</li>
        <li>L'hydrogène, bien que dans la colonne IA, n'est pas un alcalin</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Inverser le sens de variation du rayon atomique le long d'une période et d'une colonne</li>
        <li>Classer l'hydrogène parmi les alcalins parce qu'il est dans la colonne IA</li>
        <li>Confondre énergie de première ionisation (énergie à fournir, toujours positive) et affinité électronique (énergie souvent dégagée)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le long d'une même période, lorsque Z augmente, le rayon atomique :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom5e1" value="wrong"> augmente</label>
          <label class="option"><input type="radio" name="atom5e1" value="right"> diminue</label>
          <label class="option"><input type="radio" name="atom5e1" value="wrong"> reste constant</label>
          <label class="option"><input type="radio" name="atom5e1" value="wrong"> varie de façon imprévisible</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom5e1','atom5fb1','Correct — sur une période, l\'augmentation de la charge nucléaire attire davantage les électrons de valence, ce qui réduit le rayon atomique.','Relis la section 3 : le sens de variation du rayon atomique le long d\'une période est opposé à celui le long d\'une colonne.')">Vérifier</button>
        <div class="feedback" id="atom5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un élément de la colonne des halogènes (VIIA) forme typiquement un ion de charge :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom5e2" value="wrong"> +1</label>
          <label class="option"><input type="radio" name="atom5e2" value="wrong"> -2</label>
          <label class="option"><input type="radio" name="atom5e2" value="right"> -1</label>
          <label class="option"><input type="radio" name="atom5e2" value="wrong"> +3</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom5e2','atom5fb2','Correct — avec 7 électrons de valence, un halogène capte 1 électron pour compléter son octet, formant un anion -1.','Relis le tableau des grandes familles : les halogènes ont 7 électrons de valence.')">Vérifier</button>
        <div class="feedback" id="atom5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'hydrogène, bien que situé dans la colonne IA du tableau périodique :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom5e3" value="wrong"> est un alcalin typique</label>
          <label class="option"><input type="radio" name="atom5e3" value="right"> n'appartient pas à la famille des alcalins</label>
          <label class="option"><input type="radio" name="atom5e3" value="wrong"> est un gaz rare</label>
          <label class="option"><input type="radio" name="atom5e3" value="wrong"> est un métal de transition</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom5e3','atom5fb3','Correct — l\'hydrogène, formé d\'un seul proton et d\'un seul électron, est considéré comme un élément à part, distinct des alcalins.','Relis la section 4 : une remarque explicite précise le statut particulier de l\'hydrogène.')">Vérifier</button>
        <div class="feedback" id="atom5fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Mendeleïev avait classé les éléments par ordre alphabétique plutôt que par propriétés croissantes : aurait-il pu faire les mêmes prédictions spectaculaires sur les éléments manquants ?</li>
        <li>Pourquoi les gaz rares, avec leur couche de valence complète, sont-ils si peu réactifs alors que les halogènes juste à côté dans le tableau sont, eux, parmi les éléments les plus réactifs qui soient ?</li>
        <li>Quelle serait la conséquence, pour la recherche en physique nucléaire, si l'on découvrait un jour un « îlot de stabilité » d'éléments super-lourds à durée de vie exceptionnellement longue ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>D. Mendeleïev, « Соотношение свойств с атомным весом элементов » (« Relation entre les propriétés et les poids atomiques des éléments »), Журнал Русского химического общества, 1869.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur la classification périodique en licence.</li>
        <li>IUPAC, « Names and Symbols of the Elements with Atomic Numbers 113, 115, 117 and 118 », Pure and Applied Chemistry, 2016 — nomenclature officielle des derniers éléments découverts.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais d'une carte complète de la chimie des éléments, capable de prédire instantanément le comportement d'un atome à partir de sa seule position dans le tableau. Le chapitre suivant, « Liaisons chimiques fortes : covalente, ionique et dative », va exploiter directement ces propriétés périodiques pour comprendre comment les atomes s'associent entre eux pour former les innombrables molécules et cristaux qui constituent la matière qui t'entoure. Comme le disait Mendeleïev lui-même, avec une confiance visionnaire dans son propre tableau : « Je vis en rêve un tableau où tous les éléments seraient disposés comme il le fallait. Je m'éveillai et je l'écrivis immédiatement sur un morceau de papier. » Ce rêve, tu viens de le maîtriser à ton tour.</p>
  `
};

ATOM_NOVA_KB[atomKey('Classification périodique des éléments et propriétés périodiques')] = {
  intro: "Salut, moi c'est Nova ! On étudie le tableau périodique : groupes, périodes, propriétés périodiques et grandes familles chimiques. Demande-moi comment varie le rayon atomique, la charge typique d'un ion selon sa colonne, ou le statut particulier de l'hydrogène.",
  rules: [
    { test:/groupe|colonne|p[ée]riode|ligne/i, replies:["Les colonnes du tableau périodique sont les groupes (même nombre d'électrons de valence, propriétés chimiques analogues) ; les lignes sont les périodes (même nombre de couches électroniques occupées)."] },
    { test:/rayon atomique/i, replies:["Le rayon atomique diminue le long d'une période (Z croissant) car la charge nucléaire attire davantage les électrons de valence, mais il augmente le long d'une colonne car de nouvelles couches s'ajoutent."] },
    { test:/[ée]lectron[ée]gativit[ée]/i, replies:["L'électronégativité, sur l'échelle de Pauling, va de 0,7 (francium) à 4 (fluor, le plus électronégatif). Elle augmente le long d'une période et diminue le long d'une colonne."] },
    { test:/[ée]nergie.*ionisation/i, replies:["L'énergie de première ionisation est l'énergie minimale pour arracher le premier électron d'un atome neutre. Elle augmente le long d'une période et diminue le long d'une colonne."] },
    { test:/affinit[ée] [ée]lectronique/i, replies:["L'affinité électronique est le phénomène inverse de l'ionisation : c'est l'énergie dégagée lorsqu'un atome capte un électron supplémentaire."] },
    { test:/alcalin|alcalino.terreux|halog[èe]ne|gaz rare/i, replies:["Les alcalins (1 électron de valence) forment des cations +1, les alcalino-terreux (2) des cations +2, les halogènes (7) des anions -1, et les gaz rares (8, sauf He) sont peu réactifs."] },
    { test:/hydrog[èe]ne.*alcalin|statut.*hydrog[èe]ne/i, replies:["Bien que situé dans la colonne IA, l'hydrogène n'appartient pas à la famille des alcalins : c'est un élément à part, le plus léger et le plus commun de l'univers."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à l'effet de la charge nucléaire croissante sur les électrons de valence.","Indice niveau 2 : plus la charge nucléaire est forte, plus elle attire les électrons vers le noyau.","Indice niveau 3 : le rayon atomique diminue."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compte le nombre d'électrons de valence des halogènes.","Indice niveau 2 : il leur en manque un seul pour compléter l'octet.","Indice niveau 3 : charge -1."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : relis la remarque spécifique sur l'hydrogène dans le cours.","Indice niveau 2 : sa structure (1 proton, 1 électron) le distingue des vrais alcalins.","Indice niveau 3 : il n'appartient pas à la famille des alcalins."] }
  ]
};


/* =========================== CHAPITRE 6 — Liaisons chimiques fortes : covalente, ionique et dative =========================== */
ATOM_CHAPTERS[atomKey('Liaisons chimiques fortes : covalente, ionique et dative')] = {
  objectives: [
    "Définir la liaison covalente et énoncer le critère d'électronégativité qui la caractérise",
    "Distinguer liaison covalente pure, covalente polaire et covalente dative",
    "Définir la liaison ionique et son critère d'électronégativité",
    "Relier le type de liaison à la différence d'électronégativité entre les deux atomes engagés",
    "Évaluer pourquoi la distinction entre liaison covalente et liaison ionique doit être vue comme un continuum plutôt que comme une frontière stricte"
  ],
  prereqs: ["Classification périodique des éléments et propriétés périodiques"],
  bodyHtml: `
    <p>En 1916, Gilbert Newton Lewis publie une théorie qui va révolutionner la façon de représenter les molécules : il propose que les atomes se lient en partageant des paires d'électrons — une idée si simple, mais si féconde, qu'elle donne naissance au schéma de Lewis toujours utilisé aujourd'hui dans tous les cours de chimie du monde. Ironiquement, Lewis n'a jamais reçu le prix Nobel malgré cette contribution majeure et de nombreuses autres à la chimie physique, un fait resté l'une des grandes « injustices » régulièrement citées dans l'histoire des sciences.</p>
    <p>Cette théorie du partage électronique, complétée quelques années plus tard par la notion de liaison ionique, explique aujourd'hui pourquoi le sel de table (NaCl, liaison ionique) se dissout facilement dans l'eau alors que le diamant (carbone pur, liaison covalente) reste l'un des matériaux les plus durs et les plus stables connus. Cette même logique explique la structure de chaque molécule de ton corps, de chaque médicament, et de chaque matériau que tu manipules au quotidien.</p>
    <p>Les atomes s'associent entre eux pour former des molécules ou des cristaux grâce à des <strong>liaisons chimiques</strong>, qui résultent toutes, en dernière analyse, d'interactions entre les électrons de valence. On distingue les liaisons chimiques fortes, qui unissent directement deux atomes voisins, des liaisons intermoléculaires plus faibles étudiées au chapitre suivant. À la fin de ce chapitre, tu sauras prédire, à partir de la seule différence d'électronégativité entre deux atomes, le type de liaison qu'ils formeront.</p>

    <h3>1. Liaison covalente</h3>
    <p>Une <strong>liaison covalente</strong> est une liaison chimique dans laquelle chacun des deux atomes liés met en commun un électron de sa couche externe, afin de former un <strong>doublet d'électrons</strong> partagé qui les maintient ensemble. C'est cette mise en commun qui produit l'attraction mutuelle entre les deux atomes.</p>
    <p>La liaison covalente se forme préférentiellement entre atomes d'électronégativités voisines : le critère usuel est une différence d'électronégativité <strong>inférieure à 1,7</strong> sur l'échelle de Pauling.</p>

    <h3>2. Liaison covalente polaire</h3>
    <p>Lorsque les deux atomes liés ont des électronégativités légèrement différentes (mais insuffisamment pour former une liaison ionique), le doublet liant n'est pas partagé de façon symétrique : il est légèrement déplacé vers l'atome le plus électronégatif, qui porte une charge partielle négative $\\delta^-$, tandis que l'autre porte une charge partielle positive $\\delta^+$. On parle de <strong>liaison covalente polaire</strong>, type intermédiaire entre la liaison covalente pure et la liaison ionique. Dans les théories les plus avancées, on considère d'ailleurs que la quasi-totalité des liaisons réelles présentent un certain degré de polarité.</p>

    <h3>3. Liaison covalente dative</h3>
    <p>Une <strong>liaison covalente dative</strong> (ou de coordination) résulte, comme une liaison covalente ordinaire, de la mise en commun d'un doublet d'électrons entre deux atomes — mais ce doublet est apporté <strong>entièrement par l'un des deux atomes</strong> (l'atome le moins électronégatif, ou « donneur »), l'autre (« accepteur ») ne fournissant aucun électron. On la représente par une flèche allant du donneur vers l'accepteur. C'est le cas, par exemple, de certaines liaisons dans l'acide chloreux HClO₂.</p>

    <h3>4. Liaison ionique</h3>
    <p>Une <strong>liaison ionique</strong> (ou électrovalente) se forme entre une paire d'atomes présentant une grande différence d'électronégativité — le critère usuel est une différence <strong>supérieure à 1,6</strong> sur l'échelle de Pauling. Dans ce cas, l'atome le moins électronégatif cède complètement un ou plusieurs électrons à l'atome le plus électronégatif : il ne s'agit plus d'un partage, mais d'un transfert. Les deux atomes deviennent alors des ions de charges opposées (par exemple Na⁺ et Cl⁻), maintenus ensemble par l'attraction électrostatique entre ces charges.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le chlorure de sodium (NaCl) est un solide ionique qui, une fois dissous dans l'eau, se dissocie complètement en ions Na⁺ et Cl⁻ libres. Le diamant, un solide covalent, ne se dissout dans aucun solvant courant et reste un réseau d'atomes de carbone liés de façon covalente. Comment le type de liaison (transfert d'électrons vs partage) explique-t-il cette différence spectaculaire de comportement face à un solvant comme l'eau ?
    </div>

    <h3>5. Synthèse : quel type de liaison selon $\\Delta\\chi$ ?</h3>
    <table class="mini-table">
      <tr><th>Différence d'électronégativité $\\Delta\\chi$</th><th>Type de liaison</th></tr>
      <tr><td>$\\Delta\\chi < 1{,}7$ (typiquement proche de 0)</td><td>Covalente (pure si $\\Delta\\chi\\approx 0$, polaire sinon)</td></tr>
      <tr><td>$\\Delta\\chi > 1{,}6$</td><td>Ionique</td></tr>
    </table>
    <p>Le léger recouvrement entre ces deux seuils (1,6 à 1,7) traduit le fait que la transition entre liaison covalente polaire et liaison ionique est progressive plutôt que brutale : il n'existe pas de frontière physique nette entre les deux, seulement une évolution continue du caractère ionique d'une liaison avec l'écart d'électronégativité.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Toute liaison forte résulte d'un partage (covalence) ou d'un transfert (ionicité) d'électrons de valence, gouverné par la différence d'électronégativité $\\Delta\\chi$ entre les deux atomes : covalente pour $\\Delta\\chi$ faible (polaire si les électronégativités diffèrent un peu), ionique pour $\\Delta\\chi$ élevé. La liaison dative est un cas particulier de covalence où le doublet est fourni par un seul des deux atomes.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le recouvrement entre les seuils covalent (Δχ<1,7) et ionique (Δχ>1,6) montre qu'il n'existe pas de frontière physique nette entre ces deux types de liaison, mais un continuum de caractère ionique croissant. En quoi cette réalité contredit-elle l'image souvent simplifiée, présentée au lycée, d'une distinction binaire et absolue entre liaison « covalente » et liaison « ionique » ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La compréhension moderne des liaisons chimiques a été révolutionnée par le développement de la chimie quantique computationnelle, qui permet aujourd'hui de calculer avec précision le degré exact de caractère ionique d'une liaison, plutôt que de se contenter d'une classification binaire approximative basée sur l'électronégativité. Ces calculs de pointe sont essentiels pour la conception de nouveaux matériaux (semi-conducteurs, catalyseurs, matériaux pour batteries) où la nature précise de la liaison chimique détermine directement les propriétés macroscopiques recherchées.</p>
    <p><strong>Question ouverte :</strong> peut-on prédire, uniquement à partir de la structure électronique de deux atomes, l'ensemble des propriétés physiques (point de fusion, solubilité, conductivité) du composé qu'ils formeraient, sans avoir à le synthétiser expérimentalement ? C'est l'ambition de la « conception de matériaux assistée par ordinateur », domaine de recherche en pleine expansion.</p>
    <p><strong>Technologie émergente :</strong> les matériaux à liaisons hybrides covalent-ionique, comme certains oxydes utilisés dans les batteries lithium-ion de nouvelle génération, sont activement étudiés pour optimiser à la fois la stabilité structurelle (favorisée par le caractère covalent) et la mobilité ionique (favorisée par le caractère ionique) nécessaires au stockage d'énergie.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Deux atomes de valence disponible → différence d'électronégativité Δχ → covalente (partage, Δχ faible) ou ionique (transfert, Δχ élevé) → cas particulier : liaison dative (doublet fourni par un seul atome)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\Delta\\chi = |\\chi_A - \\chi_B|$$
      Cette simple différence d'électronégativité, bien que ne capturant qu'une partie de la complexité réelle de la liaison chimique, reste l'outil de prédiction le plus rapide et le plus utilisé pour anticiper la nature d'une liaison entre deux atomes quelconques du tableau périodique.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Liaison covalente : mise en commun d'un doublet d'électrons, $\\Delta\\chi<1{,}7$</li>
        <li>Liaison covalente polaire : doublet partagé de façon asymétrique, charges partielles $\\delta^+/\\delta^-$</li>
        <li>Liaison covalente dative : doublet apporté entièrement par un seul atome (donneur → accepteur)</li>
        <li>Liaison ionique : transfert complet d'électron(s), $\\Delta\\chi>1{,}6$, formation d'ions de charges opposées</li>
        <li>La transition covalent/ionique est progressive, pas brutale</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'une liaison covalente est toujours totalement apolaire : dès que $\\Delta\\chi\\ne 0$, elle est polaire</li>
        <li>Confondre liaison covalente dative et liaison ionique : dans la dative, il y a toujours partage (pas de transfert complet), même si le doublet vient d'un seul atome</li>
        <li>Retenir un seuil unique et strict entre covalent et ionique : le passage est progressif autour de $\\Delta\\chi\\approx 1{,}6$–$1{,}7$</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une liaison covalente se forme préférentiellement entre deux atomes dont la différence d'électronégativité est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom6e1" value="right"> inférieure à 1,7</label>
          <label class="option"><input type="radio" name="atom6e1" value="wrong"> supérieure à 1,6</label>
          <label class="option"><input type="radio" name="atom6e1" value="wrong"> toujours nulle</label>
          <label class="option"><input type="radio" name="atom6e1" value="wrong"> supérieure à 4</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom6e1','atom6fb1','Correct — le critère usuel de la liaison covalente est Δχ<1,7 sur l\'échelle de Pauling.','Relis la section 1 : le critère porte sur une valeur maximale de Δχ, pas sur Δχ=0.')">Vérifier</button>
        <div class="feedback" id="atom6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans une liaison covalente dative, le doublet d'électrons partagé est fourni :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom6e2" value="wrong"> à parts égales par les deux atomes</label>
          <label class="option"><input type="radio" name="atom6e2" value="right"> entièrement par l'un des deux atomes</label>
          <label class="option"><input type="radio" name="atom6e2" value="wrong"> par aucun des deux atomes</label>
          <label class="option"><input type="radio" name="atom6e2" value="wrong"> par un troisième atome extérieur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom6e2','atom6fb2','Correct — l\'atome donneur fournit seul le doublet, représenté par une flèche vers l\'atome accepteur.','Relis la section 3 : c\'est précisément ce qui distingue la liaison dative d\'une liaison covalente ordinaire.')">Vérifier</button>
        <div class="feedback" id="atom6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La liaison ionique se caractérise par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom6e3" value="wrong"> un partage égal du doublet d'électrons</label>
          <label class="option"><input type="radio" name="atom6e3" value="right"> un transfert complet d'électron(s) entre atomes de grande différence d'électronégativité</label>
          <label class="option"><input type="radio" name="atom6e3" value="wrong"> l'absence totale d'interaction électrostatique</label>
          <label class="option"><input type="radio" name="atom6e3" value="wrong"> une différence d'électronégativité toujours inférieure à 1</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom6e3','atom6fb3','Correct — au-delà de Δχ≈1,6, le transfert complet d\'électrons devient favorable, formant des ions de charges opposées liés par attraction électrostatique.','Relis la section 4 : la liaison ionique repose sur un transfert, pas un partage, d\'électrons.')">Vérifier</button>
        <div class="feedback" id="atom6fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si tous les atomes avaient exactement la même électronégativité : existerait-il encore une distinction entre liaison covalente et liaison ionique ?</li>
        <li>Pourquoi Gilbert Lewis, malgré des contributions majeures à la chimie (théorie de la liaison covalente, concept d'acide/base de Lewis), n'a-t-il jamais reçu le prix Nobel — qu'est-ce que cela révèle sur les limites du processus de reconnaissance scientifique ?</li>
        <li>Quelle serait la conséquence, pour la conception de nouveaux matériaux, d'une méthode fiable pour ajuster précisément le caractère ionique d'une liaison chimique à volonté ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>G. N. Lewis, « The Atom and the Molecule », Journal of the American Chemical Society, 1916 — l'article fondateur de la théorie de la liaison covalente et du schéma de Lewis.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur les liaisons chimiques fortes en licence.</li>
        <li>L. Pauling, <em>The Nature of the Chemical Bond</em>, Cornell University Press, 1939 — ouvrage de référence ayant établi l'échelle d'électronégativité et la théorie moderne de la liaison chimique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais prédire, à partir de la seule différence d'électronégativité entre deux atomes, quel type de liaison forte ils formeront. Le chapitre suivant, « Liaisons intermoléculaires et moment dipolaire », va compléter ce tableau en abordant les forces bien plus faibles, mais tout aussi essentielles, qui s'exercent entre des molécules déjà formées — celles qui expliquent, par exemple, pourquoi l'eau est liquide à température ambiante. Comme le disait Linus Pauling, double lauréat du prix Nobel et père de l'échelle d'électronégativité que tu viens d'utiliser : « La meilleure façon d'avoir une bonne idée est d'avoir beaucoup d'idées. » Chaque liaison chimique que tu identifieras désormais est, à sa façon, une bonne idée de la Nature.</p>
  `
};

ATOM_NOVA_KB[atomKey('Liaisons chimiques fortes : covalente, ionique et dative')] = {
  intro: "Salut, moi c'est Nova ! On étudie les liaisons chimiques fortes : covalente, covalente polaire, dative et ionique. Demande-moi le critère d'électronégativité pour chaque type de liaison, ou la différence entre covalente et dative.",
  rules: [
    { test:/liaison covalente\\b(?!.*polaire)(?!.*dative)/i, replies:["La liaison covalente résulte du partage d'un doublet d'électrons entre deux atomes d'électronégativités voisines (Δχ<1,7)."] },
    { test:/covalente polaire/i, replies:["La liaison covalente polaire est un partage asymétrique du doublet liant, l'atome le plus électronégatif portant une charge partielle δ⁻ et l'autre δ⁺. C'est un intermédiaire entre covalence pure et liaison ionique."] },
    { test:/dative/i, replies:["Dans une liaison covalente dative, le doublet d'électrons est apporté entièrement par un seul atome (le donneur), l'autre (l'accepteur) n'en fournissant aucun. On la représente par une flèche du donneur vers l'accepteur."] },
    { test:/liaison ionique/i, replies:["La liaison ionique résulte d'un transfert complet d'électron(s) entre deux atomes de grande différence d'électronégativité (Δχ>1,6), formant des ions de charges opposées liés par attraction électrostatique."] },
    { test:/[ée]lectron[ée]gativit[ée].*seuil|1,7|1,6/i, replies:["Le critère usuel : Δχ<1,7 pour une liaison covalente, Δχ>1,6 pour une liaison ionique. La transition entre les deux est progressive, pas brutale."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : reviens au critère numérique de la section 1.","Indice niveau 2 : c'est un seuil maximal, pas minimal.","Indice niveau 3 : Δχ inférieure à 1,7."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à ce qui distingue une liaison dative d'une covalence ordinaire.","Indice niveau 2 : un seul des deux atomes est à l'origine du doublet.","Indice niveau 3 : entièrement par l'un des deux atomes (le donneur)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à ce qui se passe quand Δχ est très grand.","Indice niveau 2 : il n'y a plus de partage, mais un vrai transfert d'électrons.","Indice niveau 3 : transfert complet d'électrons, formant des ions."] }
  ]
};


/* =========================== CHAPITRE 7 — Liaisons intermoléculaires et moment dipolaire =========================== */
ATOM_CHAPTERS[atomKey('Liaisons intermoléculaires et moment dipolaire')] = {
  objectives: [
    "Distinguer liaison hydrogène et forces de van der Waals",
    "Définir le moment dipolaire électrique et son unité, le Debye",
    "Calculer le moment dipolaire d'une molécule à partir des moments de liaison et de la géométrie",
    "Relier le moment dipolaire expérimental d'une molécule à son pourcentage de caractère ionique",
    "Évaluer pourquoi la liaison hydrogène, bien que classée parmi les interactions « faibles », a des conséquences aussi spectaculaires sur les propriétés physiques de l'eau"
  ],
  prereqs: ["Liaisons chimiques fortes : covalente, ionique et dative"],
  bodyHtml: `
    <p>Sans les liaisons hydrogène qui unissent ses molécules entre elles, l'eau — la substance la plus abondante de ton propre corps et de la surface terrestre — serait un gaz à température ambiante, à l'instar du sulfure d'hydrogène (H₂S), une molécule pourtant très proche chimiquement mais dépourvue de cette interaction particulière. C'est cette même liaison, individuellement bien plus faible qu'une liaison covalente, qui explique pourquoi l'eau bout à 100°C et non à -60°C comme le laisserait prévoir une simple comparaison avec des molécules de masse similaire, et pourquoi la glace flotte sur l'eau liquide plutôt que de couler.</p>
    <p>Ces mêmes liaisons hydrogène, multipliées par milliards, maintiennent également la double hélice de ton ADN assemblée, permettent aux protéines de se replier dans leur forme fonctionnelle précise, et donnent au bois, au papier et au coton leur résistance mécanique caractéristique. Comprendre ce chapitre, c'est comprendre pourquoi des interactions individuellement « faibles » peuvent, collectivement, façonner des propriétés macroscopiques aussi essentielles à la vie et à la matière qui t'entoure.</p>
    <p>Au-delà des liaisons fortes qui unissent les atomes au sein d'une molécule, des interactions plus faibles s'exercent également <strong>entre les molécules</strong> elles-mêmes. Ce chapitre étudie ces liaisons intermoléculaires, ainsi que la grandeur physique qui permet de quantifier la polarité d'une molécule : le moment dipolaire. À la fin de ce chapitre, tu comprendras pourquoi une simple différence d'électronégativité, combinée à la géométrie moléculaire, détermine des propriétés physiques aussi variées que le point d'ébullition ou la solubilité d'une substance.</p>

    <h3>1. Liaison hydrogène</h3>
    <p>La <strong>liaison hydrogène</strong> (ou pont hydrogène) est une liaison de faible intensité qui relie deux molécules. Elle implique un atome d'hydrogène, lié de façon covalente et polaire à un atome fortement électronégatif (oxygène, azote, fluor...), et un second atome électronégatif d'une molécule voisine, porteur d'un doublet non liant. C'est cette liaison qui explique, par exemple, les propriétés physiques particulières de l'eau (point d'ébullition anormalement élevé pour sa taille).</p>

    <h3>2. Forces de van der Waals</h3>
    <p>Les <strong>forces de van der Waals</strong> sont des interactions de faible intensité entre atomes, molécules, ou entre une molécule et un cristal, dues aux interactions entre les moments dipolaires électriques instantanés ou permanents des espèces en présence. Contrairement à une liaison covalente, <strong>aucun électron n'est mis en commun</strong> entre les deux partenaires : l'interaction est purement électrostatique, entre dipôles.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Même les gaz rares, dépourvus de moment dipolaire permanent (leur nuage électronique est en moyenne parfaitement symétrique), peuvent malgré tout être liquéfiés à très basse température grâce à des forces de van der Waals — dites, dans ce cas, forces de dispersion de London. Comment une molécule ou un atome globalement apolaire peut-il malgré tout exercer une attraction électrostatique sur un voisin tout aussi apolaire ?
    </div>

    <h3>3. Moment dipolaire : définition</h3>
    <p>On appelle <strong>dipôle</strong> le système formé de deux charges égales et de signe opposé, séparées par une distance $d$. Un dipôle est caractérisé par son <strong>moment dipolaire électrique</strong> $\\vec{\\mu}$, de norme :</p>
    <p>$$\\mu = q\\cdot d$$</p>
    <p>Le moment dipolaire s'exprime en coulomb-mètre (C·m), mais on utilise le plus souvent le <strong>Debye</strong> (D) : $1\\ \\text{D} = 0{,}33\\times 10^{-29}\\ \\text{C}\\cdot\\text{m}$. Par convention, le vecteur moment dipolaire est orienté de la charge négative vers la charge positive.</p>
    <p>Le moment dipolaire d'une liaison — ou d'une molécule — a son origine dans la <strong>différence d'électronégativité</strong> entre les atomes liés : la densité électronique est plus élevée au voisinage de l'atome le plus électronégatif, ce qui crée une dissymétrie dans la répartition des charges. On dit alors que la liaison (ou la molécule) est <strong>polaire</strong>.</p>

    <h3>4. Moments de liaison et moment dipolaire d'une molécule</h3>
    <p>Pour une molécule possédant plus de deux atomes, le moment dipolaire total peut être calculé, en bonne approximation, comme la <strong>somme vectorielle des moments de liaison</strong> — c'est-à-dire des moments dipolaires assimilés à chaque liaison prise individuellement, comme si elle appartenait à une molécule diatomique.</p>
    <p>Exemple de l'eau H₂O : sa structure de Lewis étant H–O–H avec un angle $\\widehat{HOH}$ noté $\\alpha$, la somme vectorielle des deux moments de liaison $\\mu_{OH}$ donne un moment total dirigé selon la bissectrice de l'angle :</p>
    <p>$$\\mu_{H_2O} = 2\\,\\mu_{OH}\\cos\\left(\\dfrac{\\alpha}{2}\\right)$$</p>
    <p>Avec $\\mu_{OH}=1{,}51\\ \\text{D}$ et $\\alpha=105°$, on retrouve $\\mu_{H_2O}=2\\times 1{,}51\\times\\cos(52{,}5°)\\approx 1{,}84\\ \\text{D}$ — valeur en excellent accord avec la mesure expérimentale, ce qui confirme au passage que la molécule d'eau n'est <strong>pas linéaire</strong> (un angle de 180° donnerait un moment dipolaire total nul).</p>

    <h3>5. Pourcentage de caractère ionique d'une liaison</h3>
    <p>La comparaison entre le moment dipolaire mesuré expérimentalement et un moment dipolaire « théorique » (calculé en supposant un transfert complet d'une charge élémentaire $e$ sur la distance internucléaire $d$, soit $\\mu_{\\text{théorique}} = e\\cdot d$) permet d'estimer le <strong>pourcentage de caractère ionique</strong> d'une liaison covalente polaire :</p>
    <p>$$\\%\\ \\text{ionique} = \\dfrac{\\mu_{\\text{expérimental}}}{\\mu_{\\text{théorique}}}\\times 100$$</p>
    <p>Pour la liaison O–H de l'eau ($\\mu_{OH}=1{,}51\\ \\text{D}$, $d_{OH}=0{,}96\\ \\text{Å}$, $\\mu_{\\text{théorique}}=e\\cdot d\\approx 4{,}8\\ \\text{D}$ pour une charge élémentaire complète), on obtient un caractère ionique d'environ 33 % — une valeur qui illustre bien la nature intermédiaire, covalente-polaire, de cette liaison.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Les liaisons intermoléculaires (hydrogène, van der Waals) sont bien plus faibles que les liaisons covalentes ou ioniques, et ne mettent jamais en commun d'électrons. Le moment dipolaire $\\mu=q\\cdot d$ (en Debye) quantifie la polarité d'une liaison ou d'une molécule ; pour une molécule polyatomique, il se calcule comme la somme vectorielle des moments de chaque liaison, et sa comparaison à une valeur théorique donne le pourcentage de caractère ionique d'une liaison.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le pourcentage de caractère ionique de la liaison O–H de l'eau (environ 33 %) montre qu'elle n'est ni purement covalente, ni purement ionique. En reliant cela au chapitre précédent sur les liaisons fortes, comment cette valeur intermédiaire confirme-t-elle que la distinction covalent/ionique est bien un continuum plutôt qu'une catégorie stricte ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La liaison hydrogène est aujourd'hui étudiée bien au-delà de la simple molécule d'eau : c'est elle qui maintient assemblée la double hélice de l'ADN (entre les paires de bases complémentaires), et sa rupture contrôlée, sous l'effet de la chaleur ou d'enzymes spécifiques, est une étape indispensable de la réplication et de la lecture du code génétique dans chaque cellule vivante. Les chercheurs en biologie structurale utilisent également le concept de moment dipolaire pour prédire comment les protéines se replient et interagissent avec d'autres molécules, un enjeu majeur pour la conception rationnelle de nouveaux médicaments.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des matériaux artificiels exploitant des réseaux de liaisons hydrogène programmables, à la manière de l'ADN, pour créer des structures moléculaires auto-assemblées avec des propriétés sur mesure ? C'est un axe de recherche actif en chimie supramoléculaire et en nanotechnologie.</p>
    <p><strong>Technologie émergente :</strong> les hydrogels auto-réparants, des matériaux dont le réseau de liaisons hydrogène se reforme spontanément après une rupture mécanique, sont développés pour des applications allant des pansements intelligents aux revêtements industriels résistants aux dommages.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Molécules polaires ou apolaires → liaisons intermoléculaires (hydrogène si H lié à O/N/F, van der Waals sinon) → moment dipolaire μ=q·d → somme vectorielle sur une molécule polyatomique → pourcentage de caractère ionique
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\vec{\\mu}_{\\text{total}} = \\sum_i \\vec{\\mu}_{\\text{liaison},i}$$
      Cette somme vectorielle, appliquée à l'exemple emblématique de l'eau, explique à elle seule pourquoi cette molécule si familière est coudée et non linéaire — une déduction géométrique tirée d'une simple mesure de polarité électrique, sans jamais avoir eu besoin d'observer directement sa structure.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Liaison hydrogène : implique un H lié à un atome électronégatif, et un doublet non liant d'une molécule voisine</li>
        <li>Van der Waals : interaction dipôle-dipôle, sans aucune mise en commun d'électrons</li>
        <li>Moment dipolaire $\\mu=q\\cdot d$, en Debye ($1\\,\\text{D}=0{,}33\\times10^{-29}\\,\\text{C}\\cdot\\text{m}$), orienté de $-$ vers $+$</li>
        <li>Pour une molécule polyatomique : $\\vec\\mu_{\\text{total}} = \\sum \\vec\\mu_{\\text{liaisons}}$ (somme vectorielle)</li>
        <li>H₂O : $\\mu=2\\mu_{OH}\\cos(\\alpha/2)\\approx 1{,}84$ D, ce qui prouve que la molécule est coudée (non linéaire)</li>
        <li>% ionique = $\\mu_{\\text{exp}}/\\mu_{\\text{théo}} \\times 100$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre liaison hydrogène (intermoléculaire, faible) et liaison covalente polaire O–H (intramoléculaire, forte)</li>
        <li>Additionner les moments de liaison en valeur scalaire plutôt qu'en somme vectorielle, ce qui ignore la géométrie de la molécule</li>
        <li>Oublier que le sens conventionnel du moment dipolaire va de la charge négative vers la charge positive</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une liaison de type van der Waals se caractérise par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom7e1" value="wrong"> une mise en commun d'électrons</label>
          <label class="option"><input type="radio" name="atom7e1" value="right"> une interaction purement électrostatique, sans partage d'électrons</label>
          <label class="option"><input type="radio" name="atom7e1" value="wrong"> un transfert complet d'électrons</label>
          <label class="option"><input type="radio" name="atom7e1" value="wrong"> une intensité supérieure à celle d'une liaison covalente</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom7e1','atom7fb1','Correct — les forces de van der Waals sont des interactions faibles entre dipôles, sans aucune mise en commun d\'électrons.','Relis la section 2 : c\'est le point qui distingue clairement van der Waals d\'une liaison covalente.')">Vérifier</button>
        <div class="feedback" id="atom7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le fait que le moment dipolaire expérimental de l'eau soit non nul prouve que la molécule H₂O est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom7e2" value="wrong"> linéaire</label>
          <label class="option"><input type="radio" name="atom7e2" value="right"> coudée (non linéaire)</label>
          <label class="option"><input type="radio" name="atom7e2" value="wrong"> parfaitement symétrique en 3D (tétraédrique régulière)</label>
          <label class="option"><input type="radio" name="atom7e2" value="wrong"> apolaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom7e2','atom7fb2','Correct — si l\'eau était linéaire (angle 180°), les deux moments de liaison OH s\'annuleraient exactement.','Relis la section 4 : un moment total nul exigerait un angle de 180°, ce qui n\'est pas le cas ici.')">Vérifier</button>
        <div class="feedback" id="atom7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le pourcentage de caractère ionique d'une liaison se calcule par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom7e3" value="wrong"> $\\mu_{\\text{théo}}/\\mu_{\\text{exp}}\\times 100$</label>
          <label class="option"><input type="radio" name="atom7e3" value="right"> $\\mu_{\\text{exp}}/\\mu_{\\text{théo}}\\times 100$</label>
          <label class="option"><input type="radio" name="atom7e3" value="wrong"> $\\mu_{\\text{exp}} - \\mu_{\\text{théo}}$</label>
          <label class="option"><input type="radio" name="atom7e3" value="wrong"> $\\mu_{\\text{exp}} \\times \\mu_{\\text{théo}}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom7e3','atom7fb3','Correct — on compare le moment mesuré au moment théorique d\'un transfert complet de charge, exprimé en pourcentage.','Relis la section 5 : le rapport compare la valeur réelle (mesurée) à la valeur d\'un transfert complet (théorique).')">Vérifier</button>
        <div class="feedback" id="atom7fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'eau ne formait aucune liaison hydrogène : à quelle température bouillirait-elle probablement, et la vie telle que nous la connaissons pourrait-elle exister ?</li>
        <li>Pourquoi les forces de van der Waals, individuellement bien plus faibles qu'une liaison hydrogène, deviennent-elles malgré tout dominantes pour expliquer la cohésion de grosses molécules apolaires comme certains polymères ?</li>
        <li>Quelle serait la conséquence, pour la biologie moléculaire, si les liaisons hydrogène qui maintiennent la double hélice de l'ADN étaient aussi fortes qu'une liaison covalente ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. D. van der Waals, <em>Over de Continuiteit van den Gas- en Vloeistoftoestand</em> (thèse de doctorat), 1873 — travaux fondateurs sur les interactions moléculaires (prix Nobel de physique 1910).</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur les liaisons intermoléculaires et le moment dipolaire.</li>
        <li>J. D. Watson, F. H. C. Crick, « Molecular Structure of Nucleic Acids: A Structure for Deoxyribose Nucleic Acid », Nature, 1953 — description de la double hélice d'ADN stabilisée par liaisons hydrogène.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais expliquer, à partir de simples interactions électrostatiques entre dipôles, des propriétés physiques aussi essentielles que le point d'ébullition de l'eau ou la stabilité de l'ADN. Le chapitre suivant, « Théorie VSEPR et géométrie des molécules », va te donner les outils pour prédire précisément la forme tridimensionnelle de n'importe quelle molécule — la géométrie qui a permis, dans ce chapitre, de confirmer que l'eau est coudée plutôt que linéaire. Comme le disait Johannes Diderik van der Waals lui-même, dont le nom est aujourd'hui associé à ces interactions omniprésentes : les forces les plus discrètes sont parfois celles qui façonnent le plus profondément le monde qui nous entoure.</p>
  `
};

ATOM_NOVA_KB[atomKey('Liaisons intermoléculaires et moment dipolaire')] = {
  intro: "Salut, moi c'est Nova ! On étudie les liaisons intermoléculaires (hydrogène, van der Waals) et le moment dipolaire. Demande-moi la formule μ=q·d, le calcul du moment dipolaire de l'eau, ou le pourcentage de caractère ionique.",
  rules: [
    { test:/liaison hydrog[èe]ne/i, replies:["La liaison hydrogène relie un atome d'hydrogène lié de façon covalente polaire à un atome électronégatif (O, N, F...) au doublet non liant d'un atome électronégatif d'une molécule voisine. C'est une liaison intermoléculaire faible."] },
    { test:/van der waals/i, replies:["Les forces de van der Waals sont des interactions faibles entre dipôles (atomes, molécules ou cristal), sans aucune mise en commun d'électrons — contrairement à une liaison covalente."] },
    { test:/moment dipolaire|\\bmu\\b\\s*=|debye/i, replies:["Le moment dipolaire μ=q·d se mesure en Debye (1 D=0,33×10⁻²⁹ C·m), orienté de la charge négative vers la charge positive."] },
    { test:/eau.*moment|h2o.*dipolaire|angle.*hoh/i, replies:["Pour l'eau, μ(H₂O)=2·μ(OH)·cos(α/2), avec μ(OH)=1,51 D et α=105° (l'angle HOH) : on retrouve μ(H₂O)≈1,84 D, ce qui confirme que la molécule est coudée."] },
    { test:/pourcentage ionique|caract[èe]re ionique/i, replies:["Le pourcentage de caractère ionique d'une liaison est le rapport du moment dipolaire mesuré expérimentalement au moment dipolaire théorique d'un transfert complet de charge (μ_théo=e·d), exprimé en pourcentage."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à ce qui distingue van der Waals d'une liaison covalente.","Indice niveau 2 : il n'y a jamais de partage d'électrons dans van der Waals.","Indice niveau 3 : interaction purement électrostatique, sans mise en commun d'électrons."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à ce qui se passerait si l'angle HOH valait 180°.","Indice niveau 2 : les deux moments de liaison s'annuleraient exactement dans ce cas.","Indice niveau 3 : la molécule est coudée (non linéaire)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le rapport se lit dans le sens mesuré/théorique.","Indice niveau 2 : c'est le moment expérimental qu'on rapporte au moment théorique.","Indice niveau 3 : μ_exp/μ_théo × 100."] }
  ]
};


/* =========================== CHAPITRE 8 — Théorie VSEPR et géométrie des molécules =========================== */
ATOM_CHAPTERS[atomKey('Théorie VSEPR et géométrie des molécules')] = {
  objectives: [
    "Énoncer les hypothèses de la théorie VSEPR de Gillespie",
    "Utiliser la notation $AX_nE_m$ pour décrire l'environnement d'un atome central",
    "Associer à chaque valeur de $(n+m)$ la figure géométrique de base (linéaire, triangulaire, tétraédrique...)",
    "Déterminer, à partir de la structure électronique, la géométrie d'une molécule simple",
    "Analyser pourquoi un modèle aussi simple que VSEPR — fondé sur une seule idée, la répulsion électrostatique entre doublets — parvient à prédire correctement la géométrie de milliers de molécules différentes"
  ],
  prereqs: ["Liaisons intermoléculaires et moment dipolaire"],
  bodyHtml: `
    <p>En 1957, le chimiste britannique Ronald Gillespie formalise et popularise une idée d'une simplicité déconcertante, déjà esquissée quelques années plus tôt par Nevil Sidgwick et Herbert Powell : les doublets d'électrons entourant un atome central, tous porteurs d'une même charge négative, se repoussent mutuellement et s'organisent dans l'espace pour minimiser cette répulsion — exactement comme des ballons de baudruche attachés ensemble par leur extrémité s'écartent naturellement les uns des autres. Cette analogie, presque enfantine, permet pourtant de prédire avec une fiabilité remarquable la géométrie de la quasi-totalité des molécules simples, sans jamais avoir besoin de résoudre la moindre équation de mécanique quantique.</p>
    <p>La théorie VSEPR reste, encore aujourd'hui, l'outil de prédiction géométrique le plus utilisé en début de cursus de chimie, précisément parce qu'elle offre un excellent compromis entre simplicité de mise en œuvre et fiabilité des résultats. Comprendre la forme d'une molécule n'est jamais un détail esthétique : c'est cette géométrie exacte qui détermine sa polarité (chapitre précédent), sa réactivité chimique, et même, dans le cas des molécules biologiques, sa capacité à interagir spécifiquement avec d'autres molécules — un principe fondamental de la pharmacologie moderne.</p>
    <p>Connaître la formule d'une molécule ne suffit pas à prévoir sa forme dans l'espace, pourtant essentielle pour comprendre sa polarité et sa réactivité. La théorie VSEPR (<em>Valence Shell Electronic Pair Repulsion</em>), proposée par Gillespie, permet de prévoir simplement la géométrie de toute molécule simple à partir du seul dénombrement des doublets d'électrons de son atome central. À la fin de ce chapitre, tu sauras prédire, en quelques lignes seulement, la forme tridimensionnelle de n'importe quelle molécule simple.</p>

    <h3>1. Hypothèses de la méthode VSEPR</h3>
    <p>La méthode repose sur les suppositions suivantes :</p>
    <ul>
      <li>les atomes d'une molécule sont liés par des paires (doublets) d'électrons ; deux atomes peuvent être liés par plusieurs doublets (liaisons multiples) ;</li>
      <li>certains atomes possèdent aussi des doublets non impliqués dans une liaison : les <strong>doublets non liants</strong> ;</li>
      <li>tous ces doublets (liants et non liants) se repoussent mutuellement, et s'organisent dans l'espace autour de l'atome central de façon à <strong>minimiser ces répulsions</strong> ;</li>
      <li>les doublets non liants occupent globalement plus de place que les doublets liants ;</li>
      <li>une liaison multiple (double, triple) occupe plus de place qu'une liaison simple, mais est traitée, pour la géométrie, comme une seule direction (un seul « X »).</li>
    </ul>

    <h3>2. Notation $AX_nE_m$</h3>
    <p>On note $A$ l'atome central de la molécule. On appelle $n$ le nombre de doublets liants, c'est-à-dire le nombre d'atomes $X$ directement liés à $A$ (une liaison multiple ne comptant que pour un seul $X$). On note $E$ un doublet non liant porté par $A$, et $m$ leur nombre. Toute molécule simple, centrée sur $A$, se note donc :</p>
    <p>$$AX_nE_m$$</p>

    <h3>3. Méthode AXE : figure géométrique de base</h3>
    <p>La figure géométrique adoptée par l'ensemble des doublets (liants et non liants) ne dépend que de leur nombre total $(n+m)$ :</p>
    <table class="mini-table">
      <tr><th>$n+m$</th><th>Figure géométrique</th><th>Type d'hybridation associé</th></tr>
      <tr><td>2</td><td>Linéaire</td><td>sp</td></tr>
      <tr><td>3</td><td>Triangulaire (plane)</td><td>sp²</td></tr>
      <tr><td>4</td><td>Tétraédrique</td><td>sp³</td></tr>
      <tr><td>5</td><td>Bipyramide à base triangulaire</td><td>sp³d</td></tr>
      <tr><td>6</td><td>Octaédrique</td><td>sp³d²</td></tr>
    </table>
    <p>La géométrie <strong>observée</strong> de la molécule (celle des atomes seulement, sans les doublets non liants qui restent invisibles) découle de cette figure de base en « retirant » les directions occupées par des doublets $E$ : par exemple, un $AX_2E_2$ dérive d'un tétraèdre ($n+m=4$) mais apparaît coudé (en V), les deux doublets non liants n'étant pas visibles dans la géométrie moléculaire observée.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les doublets non liants occupent globalement plus de place que les doublets liants, ce qui déforme légèrement les angles théoriques : l'angle HOH de l'eau (105°) est ainsi inférieur à l'angle tétraédrique idéal (109,5°). Pourquoi, physiquement, un doublet non liant — qui n'est retenu que par un seul noyau plutôt que partagé entre deux — occupe-t-il davantage d'espace angulaire qu'un doublet liant ?
    </div>

    <h3>4. Méthode de détermination pratique</h3>
    <p>Pour une molécule $AX_n$ dont l'atome central $A$ possède $Z$ électrons de valence, engagés dans $n$ liaisons simples (ou équivalent) et $m$ doublets non liants, on peut dénombrer $(n+m)$ à partir de la structure électronique de $A$ :</p>
    <p>$$n + m = \\dfrac{1}{2}\\left(\\text{électrons de valence de A} + \\text{atomes liés} - \\text{charge}\\right) + \\dfrac{1}{2}(\\text{doublets non liants restants})$$</p>
    <p>En pratique, on établit d'abord la configuration électronique de valence de $A$, on détermine combien de liaisons simples les électrons célibataires permettent de former (en tenant compte, si besoin, d'un état excité pour les éléments à partir de la 3e période, qui disposent d'orbitales $d$), puis on en déduit $n$ (atomes liés) et $m$ (doublets non liants restants).</p>

    <h3>5. Exemples de géométries</h3>
    <table class="mini-table">
      <tr><th>Molécule</th><th>Type</th><th>Géométrie</th></tr>
      <tr><td>$\\text{MgF}_2$</td><td>$AX_2$</td><td>Linéaire</td></tr>
      <tr><td>$\\text{AlCl}_3$</td><td>$AX_3$</td><td>Triangulaire plane</td></tr>
      <tr><td>$\\text{CH}_4$</td><td>$AX_4$</td><td>Tétraédrique</td></tr>
      <tr><td>$\\text{PCl}_5$</td><td>$AX_5$</td><td>Bipyramide trigonale</td></tr>
      <tr><td>$\\text{H}_2\\text{O}$</td><td>$AX_2E_2$</td><td>Coudée (en V)</td></tr>
      <tr><td>$\\text{H}_3\\text{O}^+$, $\\text{AsCl}_3$</td><td>$AX_3E$</td><td>Pyramidale</td></tr>
      <tr><td>$\\text{CO}_2$</td><td>$AX_2$ (2 liaisons doubles)</td><td>Linéaire</td></tr>
    </table>
    <p>Notons que, pour CO₂, chaque liaison C=O double ne compte que comme <strong>une seule direction</strong> $X$ dans la méthode AXE : la molécule est bien de type $AX_2$, et donc linéaire, malgré ses deux liaisons doubles.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      La théorie VSEPR prévoit la géométrie d'une molécule à partir de la seule répulsion entre doublets (liants et non liants) de son atome central, notée $AX_nE_m$ : la figure de base ne dépend que de $(n+m)$, et la géométrie observée (visible, sans les doublets non liants) s'en déduit directement — coudée pour $AX_2E_2$, pyramidale pour $AX_3E$, etc.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La géométrie d'une molécule médicamenteuse détermine directement sa capacité à s'insérer dans le site actif d'une protéine cible, un peu comme une clé doit correspondre précisément à sa serrure. En t'appuyant sur ce que tu viens d'apprendre sur VSEPR, pourquoi deux molécules ayant exactement la même formule chimique brute mais une géométrie différente (des isomères) peuvent-elles avoir des effets biologiques radicalement différents ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>La théorie VSEPR, bien que remarquablement efficace pour les molécules simples, montre ses limites face à des systèmes plus complexes (métaux de transition, molécules à liaisons délocalisées) : les chimistes computationnels utilisent aujourd'hui des méthodes de calcul quantique bien plus sophistiquées (théorie de la fonctionnelle de la densité) pour prédire avec précision la géométrie de molécules où la simple répulsion électrostatique de Gillespie ne suffit plus. Ces calculs de pointe sont essentiels dans l'industrie pharmaceutique, où prédire correctement la géométrie tridimensionnelle d'une molécule candidate-médicament, avant même sa synthèse en laboratoire, permet d'accélérer considérablement le développement de nouveaux traitements.</p>
    <p><strong>Question ouverte :</strong> peut-on étendre efficacement des règles géométriques simples, dans l'esprit de VSEPR, aux structures complexes des protéines et des acides nucléiques, dont la géométrie tridimensionnelle résulte de milliers d'interactions simultanées ? C'est un défi majeur de la biologie structurale computationnelle, en partie relevé par des outils d'intelligence artificielle comme AlphaFold.</p>
    <p><strong>Technologie émergente :</strong> les algorithmes d'apprentissage automatique entraînés pour prédire directement la géométrie moléculaire à partir de la seule formule chimique, sans passer par un calcul quantique complet, promettent d'accélérer considérablement la découverte de nouveaux matériaux et médicaments.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Atome central A → dénombrement des doublets liants (n) et non liants (m) → notation AXₙEₘ → figure géométrique de base selon (n+m) → géométrie observée (doublets non liants retirés visuellement)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$AX_nE_m \\quad\\Longrightarrow\\quad \\text{figure géométrique déterminée par } (n+m)$$
      Cette notation, d'une simplicité redoutable, condense en quelques symboles toute la démarche prédictive de la théorie VSEPR — capable, à partir d'un simple dénombrement d'électrons, de prédire la forme tridimensionnelle exacte de milliers de molécules différentes.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Notation $AX_nE_m$ : $n$ doublets liants (atomes liés), $m$ doublets non liants</li>
        <li>Figure de base selon $n+m$ : 2→linéaire, 3→triangulaire, 4→tétraédrique, 5→bipyramide trigonale, 6→octaédrique</li>
        <li>Une liaison multiple ne compte que pour une seule direction $X$</li>
        <li>Les doublets non liants sont invisibles dans la géométrie observée mais occupent de la place et déforment les angles</li>
        <li>$AX_2E_2$ → coudée (H₂O) ; $AX_3E$ → pyramidale (NH₃, H₃O⁺, AsCl₃)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Compter une liaison double ou triple comme plusieurs directions $X$ : elle n'en compte qu'une seule dans la méthode AXE</li>
        <li>Oublier les doublets non liants dans le décompte de $(n+m)$, alors qu'ils déterminent la figure géométrique de base même s'ils restent invisibles dans la molécule observée</li>
        <li>Confondre la figure géométrique de base (celle de tous les doublets) et la géométrie moléculaire réellement observée (celle des atomes seuls)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La molécule CH₄, de type $AX_4$, adopte une géométrie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom8e1" value="wrong"> triangulaire plane</label>
          <label class="option"><input type="radio" name="atom8e1" value="right"> tétraédrique</label>
          <label class="option"><input type="radio" name="atom8e1" value="wrong"> linéaire</label>
          <label class="option"><input type="radio" name="atom8e1" value="wrong"> pyramidale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom8e1','atom8fb1','Correct — avec n+m=4 (4 doublets liants, aucun non liant), la figure de base et la géométrie observée sont tétraédriques.','Utilise le tableau de la section 3 avec n+m=4.')">Vérifier</button>
        <div class="feedback" id="atom8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La molécule H₂O, de type $AX_2E_2$, a une géométrie observée :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom8e2" value="wrong"> tétraédrique</label>
          <label class="option"><input type="radio" name="atom8e2" value="right"> coudée (en V)</label>
          <label class="option"><input type="radio" name="atom8e2" value="wrong"> linéaire</label>
          <label class="option"><input type="radio" name="atom8e2" value="wrong"> pyramidale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom8e2','atom8fb2','Correct — la figure de base est tétraédrique (n+m=4), mais les 2 doublets non liants restent invisibles : la molécule observée est coudée.','Relis la section 3 : la géométrie observée ne montre que les atomes, pas les doublets non liants.')">Vérifier</button>
        <div class="feedback" id="atom8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans la molécule CO₂, chaque liaison double C=O compte, pour la méthode AXE, comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom8e3" value="wrong"> deux directions X distinctes</label>
          <label class="option"><input type="radio" name="atom8e3" value="right"> une seule direction X</label>
          <label class="option"><input type="radio" name="atom8e3" value="wrong"> un doublet non liant E</label>
          <label class="option"><input type="radio" name="atom8e3" value="wrong"> rien du tout</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom8e3','atom8fb3','Correct — une liaison multiple, quel que soit son ordre, ne compte que pour une seule direction X, ce qui rend CO2 linéaire (AX2).','Relis la section 5 : c\'est une règle explicite de la méthode AXE, illustrée par CO2.')">Vérifier</button>
        <div class="feedback" id="atom8fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si les doublets non liants n'occupaient pas plus de place que les doublets liants : les angles de valence observés dans des molécules comme l'eau ou l'ammoniac seraient-ils différents ?</li>
        <li>Pourquoi un modèle aussi simple que VSEPR — sans aucune équation de mécanique quantique — parvient-il à prédire correctement la géométrie de milliers de molécules, alors que la réalité physique sous-jacente est bien plus complexe ?</li>
        <li>Quelle serait la conséquence, pour l'industrie pharmaceutique, d'une méthode fiable pour prédire la géométrie tridimensionnelle de molécules complexes sans jamais avoir à les synthétiser en laboratoire ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>R. J. Gillespie, R. S. Nyholm, « Inorganic Stereochemistry », Quarterly Reviews of the Chemical Society, 1957 — l'article fondateur de la théorie VSEPR.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur la théorie VSEPR en licence.</li>
        <li>J. Jumper et al., « Highly Accurate Protein Structure Prediction with AlphaFold », Nature, 2021 — référence moderne sur la prédiction computationnelle de géométrie moléculaire complexe.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais prédire, en quelques lignes de raisonnement, la forme tridimensionnelle de n'importe quelle molécule simple — une compétence qui éclaire directement la polarité étudiée au chapitre précédent. Le chapitre suivant, « Hybridation des orbitales atomiques », va approfondir cette description géométrique en expliquant, cette fois d'un point de vue quantique, pourquoi les orbitales atomiques se combinent précisément selon les figures géométriques que VSEPR prédit empiriquement. Comme le disait Gillespie lui-même, avec la modestie propre aux grands pédagogues scientifiques : sa théorie n'était pas un modèle quantique rigoureux, mais un outil simple, « qui fonctionne » — un aveu qui n'enlève rien à son incroyable efficacité pédagogique et pratique.</p>
  `
};

ATOM_NOVA_KB[atomKey('Théorie VSEPR et géométrie des molécules')] = {
  intro: "Salut, moi c'est Nova ! On étudie la théorie VSEPR : notation AXnEm et prévision de la géométrie des molécules. Demande-moi la figure géométrique associée à un nombre de doublets donné, ou pourquoi H₂O est coudée.",
  rules: [
    { test:/vsepr|gillespie/i, replies:["La théorie VSEPR (Gillespie) prévoit la géométrie d'une molécule en supposant que tous les doublets d'électrons (liants et non liants) de l'atome central se repoussent et s'organisent pour minimiser cette répulsion."] },
    { test:/axnem|AXE|notation/i, replies:["La notation AXnEm décrit l'atome central A, entouré de n doublets liants (atomes X) et m doublets non liants (E)."] },
    { test:/figure g[ée]om[ée]trique|n\\+m/i, replies:["La figure géométrique de base dépend seulement de n+m : 2→linéaire, 3→triangulaire, 4→tétraédrique, 5→bipyramide trigonale, 6→octaédrique."] },
    { test:/coud[ée]e|h2o.*g[ée]om[ée]trie/i, replies:["H₂O est de type AX2E2 : la figure de base (n+m=4) est tétraédrique, mais les 2 doublets non liants restent invisibles, donnant une géométrie observée coudée (en V)."] },
    { test:/pyramidale/i, replies:["Une molécule AX3E (comme NH₃, H₃O⁺ ou AsCl₃) dérive d'un tétraèdre (n+m=4) avec un doublet non liant invisible : sa géométrie observée est pyramidale."] },
    { test:/liaison double|liaison multiple|co2/i, replies:["Une liaison multiple (double ou triple) ne compte que pour une seule direction X dans la méthode AXE. C'est pourquoi CO₂, avec 2 liaisons doubles, est de type AX2 et donc linéaire."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : détermine n+m pour CH4.","Indice niveau 2 : 4 liaisons simples, aucun doublet non liant.","Indice niveau 3 : géométrie tétraédrique."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : la figure de base et la géométrie observée peuvent différer.","Indice niveau 2 : les doublets non liants restent invisibles dans la molécule.","Indice niveau 3 : géométrie coudée (en V)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à la règle sur les liaisons multiples en VSEPR.","Indice niveau 2 : peu importe l'ordre de la liaison, elle occupe une seule direction.","Indice niveau 3 : une seule direction X."] }
  ]
};


/* =========================== CHAPITRE 9 — Hybridation des orbitales atomiques =========================== */
ATOM_CHAPTERS[atomKey('Hybridation des orbitales atomiques')] = {
  objectives: [
    "Expliquer le principe de l'hybridation des orbitales atomiques",
    "Construire les hybridations sp³, sp² et sp du carbone et les relier à ses molécules types (méthane, éthylène, acétylène)",
    "Distinguer liaisons σ et liaisons π formées à partir des orbitales hybrides et non hybrides",
    "Associer chaque géométrie VSEPR à son type d'hybridation, y compris sp³d et sp³d²",
    "Analyser pourquoi la notion d'hybridation, bien que mathématiquement rigoureuse, reste avant tout un modèle utile plutôt qu'une réalité physique directement observable"
  ],
  prereqs: ["Théorie VSEPR et géométrie des molécules"],
  bodyHtml: `
    <p>En 1931, Linus Pauling propose une solution élégante à un paradoxe qui déroutait les chimistes depuis des années : pourquoi le carbone, dont la configuration électronique fondamentale ne présente que deux électrons célibataires, forme-t-il systématiquement quatre liaisons parfaitement équivalentes dans le méthane, et non deux liaisons de nature différente comme le suggérerait naïvement sa structure électronique ? Sa réponse — l'hybridation des orbitales atomiques — deviendra l'un des concepts les plus enseignés et les plus utiles de toute la chimie structurale, valant à Pauling l'un de ses deux prix Nobel (chimie, 1954).</p>
    <p>Ce concept, bien qu'il s'agisse davantage d'un outil mathématique puissant que d'une réalité physique directement observable (les orbitales hybrides ne sont jamais que des combinaisons linéaires des orbitales atomiques réelles), permet de comprendre de façon extraordinairement intuitive pourquoi le diamant est si dur (carbone entièrement sp³), pourquoi le graphite conduit l'électricité et se délite en feuillets (carbone sp², avec des électrons π délocalisés), ou pourquoi certaines molécules organiques sont rigides et linéaires (carbone sp, comme dans l'acétylène).</p>
    <p>La théorie VSEPR prévoit correctement la géométrie des molécules, mais ne dit rien de la nature quantique des liaisons formées. L'<strong>hybridation des orbitales atomiques</strong> apporte ce complément : elle explique comment les orbitales atomiques d'un même atome se recombinent pour former nouvelles orbitales, mieux adaptées à décrire les liaisons observées. À la fin de ce chapitre, tu sauras expliquer, orbitale par orbitale, la nature exacte des liaisons simples, doubles et triples que forme le carbone — la clé de voûte de toute la chimie organique à venir.</p>

    <h3>1. Principe de l'hybridation</h3>
    <p>L'hybridation consiste à <strong>mélanger</strong> plusieurs orbitales atomiques d'un même atome, appartenant à la même couche électronique et d'énergies voisines, pour former un nombre égal de nouvelles orbitales — les <strong>orbitales hybrides</strong> — toutes équivalentes en énergie et en forme, mais orientées différemment dans l'espace. C'est cette hybridation qui permet, par exemple, d'expliquer la tétravalence du carbone dans le méthane, alors que sa configuration fondamentale $1s^2\\,2s^2\\,2p^2$ ne présente que deux électrons célibataires.</p>

    <h3>2. Hybridation sp³ : le méthane CH₄</h3>
    <p>Le carbone (\${}_6\\text{C}$ : $1s^2\\,2s^2\\,2p^2$) promeut, dans un état excité, un électron de la sous-couche 2s vers la sous-couche 2p, donnant $1s^2\\,2s^1\\,2p^3$ — quatre électrons célibataires. La sous-couche 2s (une orbitale) et les trois sous-couches 2p ($2p_x,2p_y,2p_z$) se mélangent alors pour former <strong>quatre orbitales hybrides sp³</strong>, équivalentes, dirigées vers les sommets d'un tétraèdre régulier (angles de 109,5°) :</p>
    <p>$$1\\ \\text{orbitale}\\ 2s + 3\\ \\text{orbitales}\\ 2p \\longrightarrow 4\\ \\text{orbitales hybrides sp}^3$$</p>
    <p>Chacune de ces quatre orbitales hybrides forme une liaison $\\sigma$ (fusion axiale) avec l'orbitale 1s d'un atome d'hydrogène : la molécule CH₄ compte ainsi quatre liaisons $\\sigma$ identiques, en accord avec sa géométrie tétraédrique prévue par VSEPR.</p>

    <h3>3. Hybridation sp² : l'éthylène C₂H₄</h3>
    <p>Pour l'éthylène, on hybride seulement l'orbitale 2s et deux des trois orbitales 2p (par exemple $2p_x$ et $2p_y$), en laissant volontairement une orbitale 2p ($2p_z$) non hybridée :</p>
    <p>$$1\\ \\text{orbitale}\\ 2s + 2\\ \\text{orbitales}\\ 2p \\longrightarrow 3\\ \\text{orbitales hybrides sp}^2$$</p>
    <p>La molécule C₂H₄ comporte alors : quatre liaisons $\\sigma$ (sp²–1s) avec les hydrogènes, une liaison $\\sigma$ (sp²–sp²) entre les deux carbones, et une liaison $\\pi$ supplémentaire (fusion latérale des deux orbitales $2p_z$ non hybridées restées perpendiculaires au plan de la molécule) — soit, au total, la <strong>double liaison</strong> C=C ($\\sigma+\\pi$).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Contrairement à une liaison σ, qui autorise une libre rotation entre les deux atomes liés, une liaison π rigidifie totalement la molécule autour de cet axe : l'éthylène est ainsi une molécule parfaitement plane, sans rotation possible autour de la double liaison C=C. En repensant à la fusion latérale (et non axiale) des orbitales p qui forme la liaison π, pourquoi cette rotation deviendrait-elle impossible sans briser la liaison π elle-même ?
    </div>

    <h3>4. Hybridation sp : l'acétylène C₂H₂</h3>
    <p>Pour l'acétylène, seules l'orbitale 2s et une orbitale 2p sont hybridées, laissant deux orbitales 2p non hybridées :</p>
    <p>$$1\\ \\text{orbitale}\\ 2s + 1\\ \\text{orbitale}\\ 2p \\longrightarrow 2\\ \\text{orbitales hybrides sp}$$</p>
    <p>La molécule C₂H₂ comporte alors deux liaisons $\\sigma$ (sp–1s) avec les hydrogènes, une liaison $\\sigma$ (sp–sp) entre les deux carbones, et deux liaisons $\\pi$ supplémentaires (une par paire d'orbitales 2p non hybridées restantes) — soit la <strong>triple liaison</strong> C≡C ($\\sigma+2\\pi$).</p>

    <h3>5. Hybridations étendues : sp³d et sp³d²</h3>
    <p>À partir de la 3e période, les atomes disposent d'orbitales $d$ de valence, ce qui permet des hybridations élargies :</p>
    <table class="mini-table">
      <tr><th>Hybridation</th><th>Orbitales combinées</th><th>Géométrie</th><th>Exemple</th></tr>
      <tr><td>sp³d</td><td>1 s + 3 p + 1 d</td><td>Bipyramide trigonale</td><td>PCl₅</td></tr>
      <tr><td>sp³d²</td><td>1 s + 3 p + 2 d</td><td>Octaédrique</td><td>PCl₆⁻, SF₆</td></tr>
    </table>
    <p>Dans le cas de PCl₅, le phosphore (\${}_{15}\\text{P}$ : [Ne] $3s^2\\,3p^3$) promeut un électron 3s vers une orbitale 3d libre, atteignant l'état excité [Ne] $3s^1\\,3p^3\\,3d^1$ — cinq électrons célibataires, qui forment cinq orbitales hybrides sp³d, à l'origine des cinq liaisons $\\sigma$ P–Cl.</p>

    <h3>6. Correspondance hybridation ↔ géométrie VSEPR</h3>
    <p>Chaque type d'hybridation correspond exactement à la figure géométrique de base prévue par la théorie VSEPR pour le même nombre total de directions $(n+m)$ :</p>
    <table class="mini-table">
      <tr><th>$n+m$</th><th>Hybridation</th><th>Géométrie</th></tr>
      <tr><td>2</td><td>sp</td><td>Linéaire</td></tr>
      <tr><td>3</td><td>sp²</td><td>Triangulaire</td></tr>
      <tr><td>4</td><td>sp³</td><td>Tétraédrique</td></tr>
      <tr><td>5</td><td>sp³d</td><td>Bipyramide trigonale</td></tr>
      <tr><td>6</td><td>sp³d²</td><td>Octaédrique</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      L'hybridation mélange des orbitales atomiques d'énergies voisines pour former autant d'orbitales hybrides équivalentes, orientées selon la géométrie VSEPR : sp³ (tétraédrique, CH₄), sp² (triangulaire, avec une liaison $\\pi$ restante, C₂H₄) et sp (linéaire, avec deux liaisons $\\pi$ restantes, C₂H₂). Les liaisons multiples combinent toujours une liaison $\\sigma$ (orbitales hybrides, fusion axiale) et une ou deux liaisons $\\pi$ (orbitales p non hybridées, fusion latérale).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le graphite (carbone entièrement sp²) conduit l'électricité, contrairement au diamant (carbone entièrement sp³), pourtant tous deux constitués exclusivement d'atomes de carbone. En te basant sur ce que tu viens d'apprendre sur les liaisons π (électrons moins fortement localisés qu'une liaison σ), peux-tu esquisser une explication de cette différence de conductivité électrique spectaculaire ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>L'hybridation sp² du carbone, à la base du graphite, a connu un regain d'intérêt spectaculaire avec la découverte du graphène en 2004 par Andre Geim et Konstantin Novoselov (prix Nobel de physique 2010) : ce feuillet de carbone d'un seul atome d'épaisseur, entièrement constitué de carbones sp², présente des propriétés mécaniques et électroniques extraordinaires (plus résistant que l'acier, excellent conducteur électrique) qui suscitent depuis une intense activité de recherche en science des matériaux. Les fullerènes et nanotubes de carbone, également bâtis sur ce même squelette d'hybridation sp², ouvrent quant à eux la voie à des applications allant de l'électronique flexible au stockage d'énergie.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir de nouvelles formes allotropiques du carbone, combinant intelligemment des zones d'hybridation sp², sp³ et sp, pour obtenir des matériaux aux propriétés mécaniques et électroniques sur mesure ? C'est un axe de recherche actif en science des nanomatériaux.</p>
    <p><strong>Technologie émergente :</strong> les transistors à base de graphène et de nanotubes de carbone, exploitant directement la délocalisation des électrons π du carbone sp², sont étudiés comme successeurs potentiels du silicium pour l'électronique de très haute performance.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Orbitales atomiques (s, p) d'énergies voisines → combinaison linéaire → orbitales hybrides équivalentes → liaisons σ (fusion axiale, orbitales hybrides) + liaisons π éventuelles (fusion latérale, orbitales p non hybridées) → géométrie moléculaire conforme à VSEPR
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Liaison multiple} = 1\\,\\sigma + (n-1)\\,\\pi \\quad (n = \\text{ordre de la liaison})$$
      Cette règle simple — une seule liaison σ, quel que soit l'ordre de la liaison, complétée par des liaisons π supplémentaires — explique la structure exacte de toute liaison multiple, de la double liaison de l'éthylène à la triple liaison de l'acétylène.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>sp³ : 1 s + 3 p → 4 orbitales, tétraédrique (CH₄, 4 liaisons σ simples)</li>
        <li>sp² : 1 s + 2 p → 3 orbitales, triangulaire, 1 orbitale p restante → 1 liaison π (C₂H₄, double liaison σ+π)</li>
        <li>sp : 1 s + 1 p → 2 orbitales, linéaire, 2 orbitales p restantes → 2 liaisons π (C₂H₂, triple liaison σ+2π)</li>
        <li>sp³d (PCl₅, bipyramide trigonale) et sp³d² (SF₆/PCl₆⁻, octaédrique) : hybridations étendues avec orbitales d</li>
        <li>Liaison σ : fusion axiale (orbitales hybrides) ; liaison π : fusion latérale (orbitales p non hybridées)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'une double liaison correspond à deux liaisons σ : elle combine toujours une liaison σ et une liaison π, de nature différente</li>
        <li>Oublier que le nombre d'orbitales hybrides formées est toujours égal au nombre d'orbitales atomiques de départ (conservation du nombre total d'orbitales)</li>
        <li>Confondre l'orbitale non hybridée (qui forme la liaison π) avec les orbitales hybrides (qui forment les liaisons σ)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans le méthane CH₄, le carbone adopte une hybridation :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom9e1" value="wrong"> sp</label>
          <label class="option"><input type="radio" name="atom9e1" value="wrong"> sp²</label>
          <label class="option"><input type="radio" name="atom9e1" value="right"> sp³</label>
          <label class="option"><input type="radio" name="atom9e1" value="wrong"> sp³d</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom9e1','atom9fb1','Correct — CH4, de géométrie tétraédrique (4 liaisons σ simples, aucun doublet non liant), correspond à une hybridation sp³.','Relis la section 2 : CH4 forme 4 liaisons σ simples et équivalentes.')">Vérifier</button>
        <div class="feedback" id="atom9fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans l'éthylène C₂H₄, la double liaison C=C est constituée de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom9e2" value="wrong"> deux liaisons σ</label>
          <label class="option"><input type="radio" name="atom9e2" value="right"> une liaison σ et une liaison π</label>
          <label class="option"><input type="radio" name="atom9e2" value="wrong"> deux liaisons π</label>
          <label class="option"><input type="radio" name="atom9e2" value="wrong"> une seule liaison π</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom9e2','atom9fb2','Correct — la liaison σ vient des orbitales hybrides sp² (fusion axiale), la liaison π des orbitales 2p non hybridées restantes (fusion latérale).','Relis la section 3 : une double liaison combine toujours deux types de liaisons différentes.')">Vérifier</button>
        <div class="feedback" id="atom9fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La molécule PCl₅, de géométrie bipyramide trigonale, correspond à une hybridation :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom9e3" value="wrong"> sp³</label>
          <label class="option"><input type="radio" name="atom9e3" value="right"> sp³d</label>
          <label class="option"><input type="radio" name="atom9e3" value="wrong"> sp³d²</label>
          <label class="option"><input type="radio" name="atom9e3" value="wrong"> sp²</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom9e3','atom9fb3','Correct — 5 liaisons σ (n+m=5) correspondent à l\'hybridation sp³d, avec une orbitale d en plus des orbitales s et p.','Relis le tableau de la section 6 : n+m=5 correspond à sp³d.')">Vérifier</button>
        <div class="feedback" id="atom9fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le carbone ne pouvait former que des orbitales hybrides sp³ (jamais sp² ni sp) : les doubles et triples liaisons carbone-carbone existeraient-elles encore, et la chimie organique en serait-elle radicalement différente ?</li>
        <li>Pourquoi l'hybridation, bien qu'elle ne soit pas une réalité physique directement observable, reste-t-elle un outil pédagogique et prédictif aussi puissant en chimie ?</li>
        <li>Quelle serait la conséquence, pour l'électronique moderne, d'une méthode industrielle permettant de produire du graphène à grande échelle et à faible coût ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>L. Pauling, « The Nature of the Chemical Bond. Application of Results Obtained from the Quantum Mechanics and from a Theory of Paramagnetic Susceptibility to the Structure of Molecules », Journal of the American Chemical Society, 1931 — l'article fondateur de la théorie de l'hybridation.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur l'hybridation des orbitales en licence.</li>
        <li>K. S. Novoselov et al., « Electric Field Effect in Atomically Thin Carbon Films », Science, 2004 — l'article fondateur de la découverte expérimentale du graphène (prix Nobel de physique 2010).</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais d'une compréhension complète, orbitale par orbitale, de la nature des liaisons chimiques — un socle indispensable pour aborder la chimie organique qui t'attend dans les modules suivants. Le dernier chapitre de ce cours, « Mésomérie et effets électroniques », va explorer ce qui se passe lorsque les électrons π, loin de rester localisés entre deux atomes, se délocalisent sur plusieurs liaisons à la fois — un phénomène essentiel pour comprendre la stabilité et la réactivité de nombreuses molécules organiques. Comme le disait Linus Pauling lui-même, dont la théorie de l'hybridation continue d'éclairer des générations d'étudiants : « La meilleure façon d'avoir une bonne idée est d'avoir beaucoup d'idées. » Son hybridation en est une, restée d'une fécondité remarquable près d'un siècle plus tard.</p>
  `
};

ATOM_NOVA_KB[atomKey('Hybridation des orbitales atomiques')] = {
  intro: "Salut, moi c'est Nova ! On étudie l'hybridation des orbitales atomiques : sp³, sp², sp et les hybridations étendues sp³d, sp³d². Demande-moi la différence entre liaison σ et liaison π, ou l'hybridation du carbone dans CH4, C2H4 ou C2H2.",
  rules: [
    { test:/hybridation.*principe|qu.est.ce que l.hybridation/i, replies:["L'hybridation mélange plusieurs orbitales atomiques d'un même atome, d'énergies voisines, pour former un nombre égal de nouvelles orbitales hybrides, équivalentes et orientées différemment dans l'espace."] },
    { test:/sp3\\b|sp³|m[ée]thane|ch4/i, replies:["L'hybridation sp³ mélange 1 orbitale s et 3 orbitales p pour former 4 orbitales hybrides tétraédriques, comme dans CH4 (4 liaisons σ simples)."] },
    { test:/sp2\\b|sp²|[ée]thyl[èe]ne|c2h4/i, replies:["L'hybridation sp² mélange 1 orbitale s et 2 orbitales p, formant 3 orbitales hybrides triangulaires ; l'orbitale p restante, non hybridée, forme la liaison π de la double liaison, comme dans C2H4."] },
    { test:/\\bsp\\b(?!\\d)|ac[ée]tyl[èe]ne|c2h2/i, replies:["L'hybridation sp mélange 1 orbitale s et 1 orbitale p, formant 2 orbitales hybrides linéaires ; les deux orbitales p restantes forment les deux liaisons π de la triple liaison, comme dans C2H2."] },
    { test:/liaison sigma|liaison.*σ|liaison pi|liaison.*π/i, replies:["La liaison σ résulte d'une fusion axiale (recouvrement frontal), typiquement entre orbitales hybrides. La liaison π résulte d'une fusion latérale entre orbitales p non hybridées, restées perpendiculaires au plan de la molécule."] },
    { test:/sp3d|sp³d|pcl5/i, replies:["L'hybridation sp³d (1 s + 3 p + 1 d) donne une géométrie bipyramide trigonale, comme dans PCl5 (5 liaisons σ)."] },
    { test:/sp3d2|sp³d²|sf6|pcl6/i, replies:["L'hybridation sp³d² (1 s + 3 p + 2 d) donne une géométrie octaédrique, comme dans SF6 ou l'ion PCl6⁻ (6 liaisons σ)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compte le nombre de liaisons σ simples dans CH4.","Indice niveau 2 : 4 liaisons, aucun doublet non liant.","Indice niveau 3 : hybridation sp³."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense aux deux types de recouvrement (axial et latéral).","Indice niveau 2 : une double liaison n'est jamais faite de deux liaisons du même type.","Indice niveau 3 : une liaison σ et une liaison π."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compte le nombre de liaisons σ dans PCl5.","Indice niveau 2 : 5 liaisons nécessitent une orbitale d en plus de s et p.","Indice niveau 3 : hybridation sp³d."] }
  ]
};


/* =========================== CHAPITRE 10 — Mésomérie et effets électroniques =========================== */
ATOM_CHAPTERS[atomKey('Mésomérie et effets électroniques')] = {
  objectives: [
    "Expliquer le phénomène de délocalisation électronique et de mésomérie dans les systèmes conjugués",
    "Reconnaître les configurations typiques d'un système mésomère (diène conjugué, radical, ion allylique...)",
    "Définir l'effet inductif (+I/-I) et son atténuation le long d'une chaîne",
    "Définir l'effet mésomère (+M/-M) et savoir lequel l'emporte en cas de compétition avec l'effet inductif",
    "Évaluer pourquoi la représentation par structures mésomères, bien qu'utile, reste une simplification pédagogique d'une réalité physique plus profonde : la délocalisation quantique réelle des électrons"
  ],
  prereqs: ["Hybridation des orbitales atomiques"],
  bodyHtml: `
    <p>Le benzène, découvert par Michael Faraday en 1825, a longtemps résisté à toute tentative de représentation cohérente par une simple structure de Lewis : ses six liaisons carbone-carbone, pourtant censées alterner entre simples et doubles selon les structures proposées, se sont révélées expérimentalement rigoureusement identiques, toutes de longueur intermédiaire entre une liaison simple et une liaison double. Cette énigme, restée sans solution satisfaisante pendant des décennies, ne trouvera sa résolution qu'avec le concept de mésomérie, popularisé notamment par Linus Pauling dans les années 1930 : le benzène n'est pas un mélange oscillant entre deux structures, mais une seule et unique molécule dont les électrons sont réellement délocalisés sur l'ensemble du cycle.</p>
    <p>Cette délocalisation électronique, loin d'être une simple curiosité théorique réservée au benzène, explique la stabilité exceptionnelle de nombreuses molécules organiques essentielles — des colorants qui donnent leur couleur aux fruits et aux fleurs, jusqu'aux bases de l'ADN qui codent l'information génétique de toute vie sur Terre. Comprendre la mésomérie et les effets électroniques qui en découlent, c'est acquérir l'un des outils prédictifs les plus puissants pour anticiper la réactivité chimique, un savoir-faire que tu mobiliseras dans chaque cours de chimie organique à venir.</p>
    <p>Au-delà de la structure de Lewis unique enseignée dans les premiers chapitres, certaines molécules ne peuvent être décrites correctement que par la superposition de plusieurs structures limites : c'est le phénomène de <strong>mésomérie</strong>, qui traduit une délocalisation réelle des électrons. Ce dernier chapitre étudie ce phénomène ainsi que les effets électroniques (inductif et mésomère) qui permettent de comparer la réactivité de molécules voisines. À la fin de ce chapitre, tu sauras prédire, à partir de la seule structure d'une molécule, si elle sera stabilisée par délocalisation, et quel effet électronique dominera sa réactivité chimique.</p>

    <h3>1. Le phénomène de délocalisation</h3>
    <p>Lorsque deux atomes voisins d'une même molécule possèdent chacun une orbitale $p$ pure, dont les axes sont parallèles (ou quasi parallèles), un léger rapprochement de ces atomes provoque un <strong>recouvrement latéral</strong> de ces orbitales, qui fusionnent en un ensemble plus étendu. Les électrons peuvent alors se délocaliser dans ce nouvel espace : on dit que le système d'électrons $\\pi$ est <strong>conjugué</strong>. Ce cas se rencontre typiquement lors d'une alternance de liaisons simples et doubles, comme dans le benzène ou le 1,3-butadiène.</p>

    <h3>2. Mésomérie et structures limites</h3>
    <p>On représente la délocalisation par une <strong>combinaison virtuelle</strong> de plusieurs structures de Lewis aux électrons localisés, appelées <strong>formes mésomères</strong> (ou structures de résonance), reliées entre elles par une flèche double ($\\leftrightarrow$) — ce symbole ne signifie <strong>pas</strong> un équilibre chimique entre deux espèces réelles, mais indique que la molécule réelle est un « hybride de résonance », intermédiaire entre ces structures limites. Le déplacement des doublets d'une structure à l'autre se représente par des flèches courbes pleines.</p>
    <p>Des configurations typiques de systèmes mésomères incluent :</p>
    <ul>
      <li>une alternance doublet liant ($\\pi$) – liaison simple – doublet liant ($\\pi$), comme dans un diène conjugué ;</li>
      <li>une alternance doublet libre – liaison simple – doublet liant ($\\pi$), comme dans un éther vinylique ;</li>
      <li>un couple doublet liant ($\\pi$) – liaison simple – orbitale $p$ vide, comme dans l'ion allyle ;</li>
      <li>une alternance électron libre – liaison simple – doublet liant ($\\pi$), comme dans un radical stabilisé par conjugaison (radical benzyle).</li>
    </ul>

    <h3>3. Stabilisation par délocalisation</h3>
    <p>La délocalisation est un <strong>facteur de stabilisation</strong> des molécules, des ions et des intermédiaires réactionnels, d'autant plus importante que la délocalisation est étendue : tout système présentant une possibilité de délocalisation se forme donc préférentiellement à un système équivalent qui n'en présenterait pas. Elle modifie aussi la longueur et l'énergie des liaisons concernées, en leur donnant un caractère intermédiaire entre liaison simple et liaison double : dans le benzène, du fait de cette délocalisation totale, toutes les liaisons C–C sont rigoureusement identiques, et la molécule est stabilisée par une énergie dite <strong>énergie de résonance</strong>.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'énergie de résonance du benzène (environ 150 kJ/mol) explique pourquoi cette molécule est bien moins réactive que ne le laisserait prévoir la présence apparente de trois doubles liaisons C=C dans ses structures limites — le benzène résiste par exemple à l'addition, réaction pourtant typique des alcènes. Comment cette stabilisation supplémentaire, apportée par la délocalisation, modifie-t-elle concrètement la « barrière énergétique » qu'une réaction chimique devrait franchir pour rompre cette structure ?
    </div>

    <h3>4. Effet inductif</h3>
    <p>L'<strong>effet inductif</strong> intervient dès qu'une molécule contient deux atomes liés d'électronégativités différentes — c'est-à-dire presque toujours. Il se symbolise par la pointe d'une flèche positionnée sur la liaison covalente concernée, orientée vers l'atome le plus électronégatif, et se note $+I$ (donneur d'électrons) ou $-I$ (attracteur d'électrons) selon le point de vue adopté :</p>
    <table class="mini-table">
      <tr><th>Effet</th><th>Exemple</th><th>Conséquence</th></tr>
      <tr><td>$-I$ (attracteur)</td><td>Halogènes (F, Cl, Br...), groupe carbonyle</td><td>Appauvrit en électrons le groupe voisin</td></tr>
      <tr><td>$+I$ (donneur)</td><td>Groupes alkyles (chaînes C, H)</td><td>Enrichit en électrons le groupe voisin</td></tr>
    </table>
    <p>L'effet inductif s'<strong>atténue progressivement</strong> le long d'une chaîne carbonée et ne se fait pratiquement plus sentir au-delà de la 3e ou 4e liaison : c'est ce que confirme, par exemple, la diminution progressive du $pK_a$ d'un acide carboxylique lorsqu'un chlore substituant s'éloigne du groupe acide.</p>

    <h3>5. Effet mésomère</h3>
    <p>L'<strong>effet mésomère</strong> résulte, comme la mésomérie, de la délocalisation des électrons $\\pi$ et des doublets non liants, favorisée par l'électronégativité relative des atomes liés. On distingue de même les effets <strong>donneurs</strong> ($+M$) et <strong>attracteurs</strong> ($-M$) d'électrons. Les groupements mésomères donneurs les plus classiques, classés du plus donneur au moins donneur, sont : $-\\text{NH}_2 > -\\text{NHR} > -\\text{NR}_2 > -\\text{OH} > -\\text{OR} > -\\text{F} > -\\text{Cl} > -\\text{Br} > -\\text{I}$.</p>

    <h3>6. Compétition entre effet inductif et effet mésomère</h3>
    <p>Un même substituant peut exercer simultanément un effet inductif et un effet mésomère, parfois de sens opposés (par exemple un halogène : $-I$ mais $+M$). Dans ce cas de compétition, la règle générale est simple :</p>
    <p><strong>c'est l'effet mésomère qui l'emporte</strong> sur l'effet inductif, chaque fois que la délocalisation $\\pi$ est géométriquement possible (atomes engagés dans un système conjugué).</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      La mésomérie décrit, par une combinaison de structures limites reliées par $\\leftrightarrow$, la délocalisation réelle des électrons $\\pi$ dans un système conjugué, source de stabilisation (énergie de résonance). L'effet inductif ($\\pm I$, via les liaisons $\\sigma$, s'atténue vite) et l'effet mésomère ($\\pm M$, via la délocalisation $\\pi$) modulent la répartition électronique d'une molécule ; en cas de compétition entre les deux, c'est toujours l'effet mésomère qui domine.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les structures mésomères, bien qu'utiles pédagogiquement, restent une simplification : la réalité physique est une fonction d'onde unique décrivant une véritable délocalisation quantique des électrons, et non une « moyenne » entre plusieurs molécules distinctes qui existeraient réellement. En quoi cette nuance est-elle importante pour éviter une erreur conceptuelle fréquente chez les étudiants débutants en chimie organique ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>La délocalisation électronique dans les systèmes conjugués est au cœur de technologies parmi les plus prometteuses de la chimie des matériaux contemporaine : les polymères conducteurs (dont la découverte a valu le prix Nobel de chimie 2000 à Heeger, MacDiarmid et Shirakawa) exploitent de longues chaînes de conjugaison pour transporter le courant électrique presque comme un métal, tout en conservant la légèreté et la flexibilité propres aux matériaux organiques. Les diodes électroluminescentes organiques (OLED), aujourd'hui présentes dans la plupart des écrans de smartphones haut de gamme, reposent elles aussi directement sur la délocalisation électronique de molécules conjuguées soigneusement conçues.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des molécules à délocalisation électronique si étendue qu'elles rivaliseraient en conductivité avec les métaux traditionnels, tout en conservant les avantages de légèreté et de flexibilité de la chimie organique ? C'est un axe de recherche majeur en science des matériaux organiques électroniques.</p>
    <p><strong>Technologie émergente :</strong> les cellules photovoltaïques organiques, qui exploitent la délocalisation électronique de polymères conjugués pour convertir la lumière en électricité, sont développées comme alternative légère et flexible aux panneaux solaires en silicium classiques.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Système conjugué (orbitales p parallèles) → délocalisation des électrons π → structures mésomères limites (↔) → stabilisation (énergie de résonance) → effets inductif (σ, atténué) et mésomère (π, dominant en cas de conflit)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Molécule réelle} = \\text{hybride de résonance des structures mésomères}$$
      Cette idée, plus conceptuelle qu'une véritable équation, résume le message central de tout ce module « Atomistique et liaisons chimiques » : la matière, à l'échelle atomique et moléculaire, ne se laisse jamais enfermer dans une image classique unique — elle exige, du modèle de Bohr jusqu'à la mésomérie, d'accepter une réalité fondamentalement quantique, probabiliste et délocalisée.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>La mésomérie décrit une délocalisation réelle des électrons $\\pi$/doublets libres via plusieurs structures limites reliées par $\\leftrightarrow$ (pas un équilibre chimique)</li>
        <li>Plus la délocalisation est étendue, plus la stabilisation (énergie de résonance) est grande</li>
        <li>Effet inductif $\\pm I$ : lié à $\\Delta\\chi$ sur une liaison $\\sigma$, s'atténue vite le long d'une chaîne (au-delà de 3-4 liaisons)</li>
        <li>Effet mésomère $\\pm M$ : lié à la délocalisation $\\pi$, ne s'atténue pas de la même façon dans un système conjugué</li>
        <li>En cas de compétition entre effet inductif et effet mésomère, c'est le mésomère qui l'emporte</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Interpréter la flèche double $\\leftrightarrow$ entre formes mésomères comme un équilibre chimique réel : ce sont des représentations d'une seule et même molécule</li>
        <li>Oublier l'atténuation rapide de l'effet inductif avec la distance, contrairement à l'effet mésomère dans un système conjugué</li>
        <li>Faire prévaloir l'effet inductif sur l'effet mésomère en cas de conflit : c'est toujours l'inverse</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La flèche double $\\leftrightarrow$ entre deux formes mésomères signifie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom10e1" value="wrong"> un équilibre chimique réel entre deux molécules différentes</label>
          <label class="option"><input type="radio" name="atom10e1" value="right"> que la molécule réelle est un hybride de résonance entre ces structures limites</label>
          <label class="option"><input type="radio" name="atom10e1" value="wrong"> une réaction chimique en cours</label>
          <label class="option"><input type="radio" name="atom10e1" value="wrong"> une transformation isomérique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom10e1','atom10fb1','Correct — il s\'agit d\'une seule molécule réelle, décrite par plusieurs structures limites virtuelles, pas d\'un équilibre entre espèces distinctes.','Relis la section 2 : la flèche double de mésomérie n\'a pas le même sens que la flèche double d\'un équilibre chimique.')">Vérifier</button>
        <div class="feedback" id="atom10fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'effet inductif d'un substituant s'atténue :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom10e2" value="wrong"> jamais, quelle que soit la distance</label>
          <label class="option"><input type="radio" name="atom10e2" value="right"> progressivement, et devient négligeable au-delà de 3-4 liaisons</label>
          <label class="option"><input type="radio" name="atom10e2" value="wrong"> immédiatement, dès la deuxième liaison</label>
          <label class="option"><input type="radio" name="atom10e2" value="wrong"> uniquement dans les systèmes conjugués</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom10e2','atom10fb2','Correct — l\'effet inductif décroît progressivement et devient négligeable au-delà de la 3e ou 4e liaison.','Relis la section 4 : le tableau des pKa de l\'acide chloré illustre cette atténuation progressive.')">Vérifier</button>
        <div class="feedback" id="atom10fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Lorsqu'un substituant exerce simultanément un effet inductif et un effet mésomère de sens opposés, c'est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="atom10e3" value="wrong"> l'effet inductif qui l'emporte toujours</label>
          <label class="option"><input type="radio" name="atom10e3" value="right"> l'effet mésomère qui l'emporte</label>
          <label class="option"><input type="radio" name="atom10e3" value="wrong"> les deux effets qui s'annulent exactement</label>
          <label class="option"><input type="radio" name="atom10e3" value="wrong"> aucun effet qui ne s'applique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('atom10e3','atom10fb3','Correct — en cas de compétition entre effet inductif et effet mésomère, c\'est systématiquement l\'effet mésomère qui domine.','Relis la section 6 : la règle de compétition est énoncée explicitement dans le cours.')">Vérifier</button>
        <div class="feedback" id="atom10fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le benzène pouvait réellement exister sous deux formes alternées (comme le suggéraient les premières structures de Kekulé) : quelles propriétés physiques mesurables permettraient de trancher entre cette hypothèse et celle d'une délocalisation réelle ?</li>
        <li>Pourquoi l'effet mésomère, contrairement à l'effet inductif, ne s'atténue-t-il pas rapidement avec la distance dans un système conjugué étendu ?</li>
        <li>Quelle serait la conséquence, pour l'électronique organique (OLED, cellules solaires organiques), d'une meilleure maîtrise de la conception de systèmes à délocalisation électronique très étendue ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>L. Pauling, <em>The Nature of the Chemical Bond</em>, Cornell University Press, 1939 — exposé fondateur de la théorie de la résonance et de la mésomérie.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur la mésomérie et les effets électroniques en licence.</li>
        <li>H. Shirakawa, A. G. MacDiarmid, A. J. Heeger, « Synthesis of Electrically Conducting Polymers », Nobel Lectures, prix Nobel de chimie 2000.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Te voici arrivé au terme de ce module « Atomistique et liaisons chimiques » : parti de l'expérience de Rutherford et d'un simple noyau atomique, tu termines en comprenant comment des électrons peuvent se délocaliser sur toute une molécule pour la stabiliser. Ce parcours — structure de l'atome, quantification de l'énergie, orbitales, configuration électronique, classification périodique, liaisons fortes et faibles, géométrie moléculaire, hybridation, et enfin mésomérie — constitue le socle indispensable de toute la chimie que tu étudieras désormais, en particulier la chimie organique qui t'attend dans les modules suivants. Comme le disait Linus Pauling, dont les idées ont traversé ce module du début à la fin : « La science n'est pas et ne sera jamais achevée. C'est une aventure sans fin. » Ton aventure en chimie ne fait, elle aussi, que commencer.</p>
  `
};

ATOM_NOVA_KB[atomKey('Mésomérie et effets électroniques')] = {
  intro: "Salut, moi c'est Nova ! On termine l'Atomistique et liaisons chimiques par la mésomérie et les effets électroniques (inductif, mésomère). Demande-moi ce que signifie la flèche double de mésomérie, la différence entre effet inductif et effet mésomère, ou lequel l'emporte en cas de compétition.",
  rules: [
    { test:/m[ée]som[ée]rie|d[ée]localisation/i, replies:["La mésomérie décrit la délocalisation réelle des électrons π (ou des doublets libres) dans un système conjugué, représentée par plusieurs structures limites reliées par une flèche double ↔. La molécule réelle est un hybride de résonance entre ces structures, pas un équilibre entre espèces distinctes."] },
    { test:/[ée]nergie de r[ée]sonance/i, replies:["L'énergie de résonance mesure la stabilisation apportée par la délocalisation électronique : plus le système conjugué est étendu, plus cette stabilisation est grande (cas extrême : le benzène, où toutes les liaisons C-C sont identiques)."] },
    { test:/effet inductif|\\+I\\b|-I\\b/i, replies:["L'effet inductif (+I donneur ou -I attracteur) provient d'une différence d'électronégativité sur une liaison σ. Il s'atténue rapidement le long d'une chaîne, devenant négligeable au-delà de 3-4 liaisons."] },
    { test:/effet m[ée]som[èe]re|\\+M\\b|-M\\b/i, replies:["L'effet mésomère (+M donneur ou -M attracteur) résulte de la délocalisation des électrons π. Contrairement à l'effet inductif, il ne s'atténue pas de la même façon dans un système conjugué étendu."] },
    { test:/comp[ée]tition|inductif.*m[ée]som[èe]re|qui l.emporte/i, replies:["En cas de compétition entre effet inductif et effet mésomère, c'est toujours l'effet mésomère qui l'emporte."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à ce que représente vraiment la flèche double de mésomérie.","Indice niveau 2 : il n'y a jamais deux espèces chimiques réelles distinctes.","Indice niveau 3 : c'est un hybride de résonance d'une seule molécule."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à l'exemple des pKa donné dans le cours.","Indice niveau 2 : l'effet diminue avec la distance, sans disparaître brutalement.","Indice niveau 3 : il devient négligeable au-delà de 3-4 liaisons."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : reviens à la règle de compétition énoncée dans le cours.","Indice niveau 2 : ce n'est pas l'effet le long des liaisons σ qui gagne.","Indice niveau 3 : c'est l'effet mésomère qui l'emporte."] }
  ]
};

/* fusionne le module Atomistique et liaisons chimiques dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, ATOM_CHAPTERS);
Object.assign(NOVA_KB, ATOM_NOVA_KB);