/* =====================================================================
   CHUNK « pmc » — registre PMC_CHAPTERS / PMC_NOVA_KB
   Matière(s) : Physique|Propriétés de la matière condensée
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   PMC_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — PROPRIÉTÉS DE LA MATIÈRE CONDENSÉE (L3 Physique Fondamentale)
   6 chapitres : structure cristalline, liaisons et cohésion, diffraction X, phonons et
   capacité thermique, électrons libres et bandes d'énergie, semi-conducteurs. S'appuie
   sur la mécanique quantique non relativiste et sur les petites oscillations
   (mécanique analytique). ===================================================================================== */
const PMC_MATIERE = 'Propriétés de la matière condensée';
function pmcKey(chapterTitle){ return `Physique|${PMC_MATIERE}|${chapterTitle}`; }
const PMC_CHAPTERS = {};
const PMC_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
PMC_CHAPTERS[pmcKey("Structure cristalline : réseau de Bravais et maille élémentaire")] = {
  objectives: [
    "Définir un réseau de Bravais et une maille élémentaire",
    "Distinguer réseau et motif (base) dans la construction d'un cristal",
    "Identifier les principaux systèmes cristallins et réseaux cubiques",
    "Calculer la compacité et la coordinence d'une structure cubique simple"
  ],
  prereqs: ["Éléments de cristallographie", "Théorie générale du moment cinétique (Mécanique quantique non relativiste)"],
  bodyHtml: `
    <p>La matière condensée (solides cristallins, mais aussi liquides denses et amorphes) doit ses propriétés macroscopiques — mécaniques, électriques, thermiques, optiques — à l'organisation de sa structure à l'échelle atomique. Ce premier chapitre pose le langage géométrique de base : le <strong>réseau cristallin</strong>.</p>

    <h3>1. Réseau de Bravais</h3>
    <p>Un <strong>réseau de Bravais</strong> est un ensemble infini et périodique de points de l'espace, engendré par répétition de trois vecteurs de base $\\vec a_1,\\vec a_2,\\vec a_3$ non coplanaires :</p>
    <div class="formula-box">$$\\vec R = n_1\\vec a_1 + n_2\\vec a_2 + n_3\\vec a_3, \\qquad n_1,n_2,n_3 \\in \\mathbb Z$$</div>
    <p>Chaque point $\\vec R$ du réseau voit rigoureusement le même environnement que tout autre point — c'est la définition même de la périodicité. La <strong>maille élémentaire</strong> est le plus petit volume qui, répété par translation sur tout le réseau, reconstitue l'espace entier sans recouvrement ni lacune.</p>

    <h3>2. Réseau et motif : la construction d'un cristal réel</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Un cristal réel = un <strong>réseau de Bravais</strong> (la géométrie périodique, purement mathématique) + un <strong>motif</strong> (ou base : un ou plusieurs atomes attachés à chaque nœud). Deux cristaux très différents chimiquement (diamant, sel) peuvent partager le même réseau sous-jacent tout en ayant des motifs distincts.
    </div>

    <h3>3. Systèmes cristallins et réseaux cubiques</h3>
    <p>Il existe 14 réseaux de Bravais distincts en trois dimensions, regroupés en 7 systèmes cristallins selon les symétries de leur maille. Le <strong>système cubique</strong>, le plus simple et le plus fréquent en L3, comprend trois réseaux : cubique simple (CS), cubique centré (CC), cubique à faces centrées (CFC).</p>
    <table class="mini-table">
      <tr><th>Réseau</th><th>Coordinence</th><th>Compacité</th></tr>
      <tr><td>Cubique simple (CS)</td><td>6</td><td>$\\pi/6 \\approx 0{,}52$</td></tr>
      <tr><td>Cubique centré (CC)</td><td>8</td><td>$\\pi\\sqrt3/8 \\approx 0{,}68$</td></tr>
      <tr><td>Cubique à faces centrées (CFC)</td><td>12</td><td>$\\pi\\sqrt2/6 \\approx 0{,}74$</td></tr>
    </table>
    <p>La <strong>coordinence</strong> est le nombre de plus proches voisins d'un atome ; la <strong>compacité</strong> est la fraction du volume occupée par des sphères dures tangentes centrées sur chaque nœud.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour une structure cubique simple de paramètre de maille $a$, calculer la compacité (les atomes sont des sphères de rayon $r$ tangentes le long de l'arête).</p>
      <p><strong>Solution :</strong> tangence le long de l'arête : $2r=a$. Un seul atome par maille (8 coins partagés par 8 mailles, $8\\times\\frac18=1$). Compacité $= \\dfrac{\\frac43\\pi r^3}{a^3} = \\dfrac{\\frac43\\pi (a/2)^3}{a^3} = \\dfrac{\\pi}{6}$.</p>
      <p class="example-answer">Compacité $\\approx 0{,}52$ — une structure peu compacte, ce qui explique sa rareté parmi les métaux réels (le polonium est l'un des seuls exemples).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Réseau de Bravais : ensemble périodique de points $\\vec R=n_1\\vec a_1+n_2\\vec a_2+n_3\\vec a_3$</li>
      <li>Cristal = réseau + motif (base d'atomes attachée à chaque nœud)</li>
      <li>CS, CC, CFC : coordinences 6, 8, 12 ; compacités 0,52 / 0,68 / 0,74</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre réseau (géométrie) et cristal (réseau + motif chimique)</li>
      <li>Oublier de pondérer les atomes partagés entre plusieurs mailles (coin : 1/8, face : 1/2, arête : 1/4)</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Un cristal est entièrement défini par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc1e1" value="wrong">le réseau seul</label>
          <label class="option"><input type="radio" name="pmc1e1" value="right">le réseau et le motif</label>
          <label class="option"><input type="radio" name="pmc1e1" value="wrong">le motif seul</label>
          <label class="option"><input type="radio" name="pmc1e1" value="wrong">la maille seule</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc1e1','pmc1fb1','Correct — cristal = réseau (géométrie) + motif (atomes).','Relis le point clé du cours.')">Vérifier</button>
        <div class="feedback" id="pmc1fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">La coordinence d'une structure CFC est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc1e2" value="wrong">6</label>
          <label class="option"><input type="radio" name="pmc1e2" value="wrong">8</label>
          <label class="option"><input type="radio" name="pmc1e2" value="right">12</label>
          <label class="option"><input type="radio" name="pmc1e2" value="wrong">4</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc1e2','pmc1fb2','Correct — 12 plus proches voisins pour le CFC, la structure la plus compacte parmi les cubiques.','Relis le tableau du cours.')">Vérifier</button>
        <div class="feedback" id="pmc1fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">La compacité d'une structure cubique simple est environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc1e3" value="right">0,52</label>
          <label class="option"><input type="radio" name="pmc1e3" value="wrong">0,68</label>
          <label class="option"><input type="radio" name="pmc1e3" value="wrong">0,74</label>
          <label class="option"><input type="radio" name="pmc1e3" value="wrong">1,00</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc1e3','pmc1fb3','Correct — π/6≈0,52, comme calculé dans l\\'exemple corrigé.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="pmc1fb3"></div>
      </div>
    </div>
  `
};
PMC_NOVA_KB[pmcKey("Structure cristalline : réseau de Bravais et maille élémentaire")] = {
  intro: "Salut, moi c'est Nova ! On démarre la matière condensée avec les réseaux cristallins. Demande-moi une explication ou un indice.",
  rules: [
    { test:/bravais|r[ée]seau/i, replies:["Un réseau de Bravais est un ensemble périodique de points R=n1a1+n2a2+n3a3. Le cristal réel = réseau + motif d'atomes."]},
    { test:/coordinence|compacit[ée]/i, replies:["CS: coordinence 6, compacité 0,52. CC: coordinence 8, compacité 0,68. CFC: coordinence 12, compacité 0,74 (la plus dense)."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le point clé sur réseau + motif.","C'est une combinaison des deux.","Réseau et motif ensemble définissent le cristal."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le tableau du cours.","Cherche la ligne CFC.","Coordinence 12."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends le calcul de l'exemple corrigé.","π/6 est la formule.","≈0,52."]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
PMC_CHAPTERS[pmcKey("Liaisons dans les solides et énergie de cohésion")] = {
  objectives: [
    "Classer les grands types de liaisons cohésives dans les solides",
    "Relier le type de liaison aux propriétés macroscopiques observées",
    "Établir l'expression de l'énergie de cohésion d'un cristal ionique",
    "Distinguer solides covalents, ioniques, métalliques et moléculaires"
  ],
  prereqs: ["Structure cristalline : réseau de Bravais et maille élémentaire"],
  bodyHtml: `
    <p>Ce qui distingue un métal, un sel, un diamant et un cristal de glace n'est pas seulement leur structure géométrique (chapitre 1), mais la <strong>nature de la liaison</strong> qui maintient les atomes ou ions ensemble. Ce chapitre classe les quatre grandes familles de solides selon leur type de cohésion.</p>

    <table class="mini-table">
      <tr><th>Type</th><th>Origine physique</th><th>Propriétés typiques</th><th>Exemple</th></tr>
      <tr><td>Ionique</td><td>attraction coulombienne entre ions de charges opposées</td><td>dur, cassant, isolant, point de fusion élevé</td><td>NaCl</td></tr>
      <tr><td>Covalent</td><td>mise en commun d'électrons (liaisons directionnelles)</td><td>très dur, isolant ou semi-conducteur</td><td>diamant, Si</td></tr>
      <tr><td>Métallique</td><td>« gaz » d'électrons délocalisés entre cœurs ioniques</td><td>malléable, bon conducteur électrique et thermique</td><td>Cu, Fe</td></tr>
      <tr><td>Moléculaire (van der Waals)</td><td>interactions dipolaires faibles entre molécules</td><td>mou, point de fusion bas</td><td>glace sèche (CO₂)</td></tr>
    </table>

    <h3>1. Énergie de cohésion d'un cristal ionique</h3>
    <p>Pour un cristal ionique, l'énergie potentielle électrostatique d'un ion avec <em>tous</em> les autres ions du cristal (pas seulement ses voisins immédiats) fait intervenir la <strong>constante de Madelung</strong> $\\alpha_M$, qui dépend uniquement de la géométrie du réseau :</p>
    <div class="formula-box">$$E_{coh} = -\\alpha_M\\,\\frac{e^2}{4\\pi\\varepsilon_0 r_0} + \\frac{B}{r_0^n}$$</div>
    <p>Le premier terme est l'attraction électrostatique à longue portée (sommée sur tout le cristal) ; le second, un terme de <strong>répulsion à courte portée</strong> (recouvrement des nuages électroniques, décroissance rapide, $n\\approx 9$–$12$), empêche l'effondrement du cristal. La distance d'équilibre $r_0$ minimise $E_{coh}$.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La constante de Madelung ($\\alpha_M\\approx 1{,}748$ pour la structure NaCl) résulte d'une somme infinie alternée sur tout le réseau — un calcul délicat (la série ne converge pas absolument), mais dont le résultat physique est bien défini et mesurable via l'énergie de cohésion expérimentale.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi un métal est-il malléable (se déforme sans se briser) alors qu'un cristal ionique est cassant ?</p>
      <p><strong>Solution :</strong> dans un métal, la liaison (mer d'électrons délocalisés) est non directionnelle : faire glisser un plan d'atomes sur un autre ne rompt aucune liaison spécifique. Dans un cristal ionique, un tel glissement rapproche des ions de <em>même</em> signe, créant une forte répulsion électrostatique locale.</p>
      <p class="example-answer">La malléabilité (ou sa fragilité) est une conséquence directe de la nature de la liaison — non de la « dureté » intrinsèque du matériau prise isolément.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Quatre grandes familles : ionique, covalent, métallique, moléculaire (van der Waals)</li>
      <li>$E_{coh}=-\\alpha_M e^2/(4\\pi\\varepsilon_0 r_0) + B/r_0^n$ pour un cristal ionique, avec $\\alpha_M$ la constante de Madelung</li>
      <li>Le type de liaison détermine directement les propriétés mécaniques et électriques macroscopiques</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Oublier le terme répulsif à courte portée : sans lui, le cristal s'effondrerait</li>
      <li>Croire que la liaison métallique est directionnelle comme la covalente : c'est l'inverse qui explique la malléabilité</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Un solide malléable et bon conducteur électrique a probablement une liaison :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc2e1" value="wrong">ionique</label>
          <label class="option"><input type="radio" name="pmc2e1" value="right">métallique</label>
          <label class="option"><input type="radio" name="pmc2e1" value="wrong">covalente</label>
          <label class="option"><input type="radio" name="pmc2e1" value="wrong">moléculaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc2e1','pmc2fb1','Correct — malléabilité et conduction électrique sont les signatures typiques de la liaison métallique.','Relis le tableau du cours.')">Vérifier</button>
        <div class="feedback" id="pmc2fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Le terme répulsif $B/r_0^n$ dans $E_{coh}$ sert à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc2e2" value="wrong">augmenter l'attraction</label>
          <label class="option"><input type="radio" name="pmc2e2" value="right">empêcher l'effondrement du cristal à courte distance</label>
          <label class="option"><input type="radio" name="pmc2e2" value="wrong">annuler la constante de Madelung</label>
          <label class="option"><input type="radio" name="pmc2e2" value="wrong">rien, il est négligeable</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc2e2','pmc2fb2','Correct — sans ce terme à courte portée, rien n\\'empêcherait les ions de s\\'écraser les uns sur les autres.','Relis la section sur l\\'énergie de cohésion.')">Vérifier</button>
        <div class="feedback" id="pmc2fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Un cristal ionique est cassant car un glissement de plans :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc2e3" value="wrong">ne change rien</label>
          <label class="option"><input type="radio" name="pmc2e3" value="right">rapproche des ions de même signe, créant une forte répulsion</label>
          <label class="option"><input type="radio" name="pmc2e3" value="wrong">augmente l'attraction</label>
          <label class="option"><input type="radio" name="pmc2e3" value="wrong">fait fondre le cristal</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc2e3','pmc2fb3','Correct — exactement l\\'explication de l\\'exemple corrigé du cours.','Reprends l\\'exemple corrigé sur malléabilité vs fragilité.')">Vérifier</button>
        <div class="feedback" id="pmc2fb3"></div>
      </div>
    </div>
  `
};
PMC_NOVA_KB[pmcKey("Liaisons dans les solides et énergie de cohésion")] = {
  intro: "Salut, c'est Nova ! On classe les types de liaisons dans les solides. Demande-moi une explication ou un indice.",
  rules: [
    { test:/ionique|covalent|m[ée]tallique|mol[ée]culaire/i, replies:["4 familles: ionique (coulombien), covalent (directionnel), métallique (électrons délocalisés), moléculaire (van der Waals, faible)."]},
    { test:/madelung/i, replies:["La constante de Madelung αM résume géométriquement la somme électrostatique sur tout le réseau ionique infini — αM≈1,748 pour NaCl."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le tableau du cours.","Cherche la ligne avec 'malléable' et 'conducteur'.","C'est la liaison métallique."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la section énergie de cohésion.","Pense à ce qui empêche l'effondrement.","Le terme répulsif à courte portée."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense aux ions de même signe.","Répulsion électrostatique locale."]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
PMC_CHAPTERS[pmcKey("Diffraction des rayons X et loi de Bragg")] = {
  objectives: [
    "Établir la loi de Bragg à partir des interférences entre plans réticulaires",
    "Définir le réseau réciproque et son lien avec la diffraction",
    "Interpréter un diffractogramme pour déterminer une distance interréticulaire",
    "Relier la méthode à l'identification expérimentale de structures cristallines"
  ],
  prereqs: ["Structure cristalline : réseau de Bravais et maille élémentaire", "Ondes planes progressives sinusoïdales et vitesse de phase (Ondes et vibrations)"],
  bodyHtml: `
    <p>Comment « voir » un arrangement d'atomes séparés de quelques dixièmes de nanomètre, bien en-dessous de la résolution de tout microscope optique ? La réponse historique (von Laue, W. H. et W. L. Bragg, 1912-1913) : utiliser un rayonnement de longueur d'onde comparable à cette distance — les <strong>rayons X</strong> — et exploiter les interférences de la lumière diffusée par les plans d'atomes.</p>

    <h3>1. Interférences entre plans réticulaires</h3>
    <p>Considérons une famille de plans atomiques parallèles, espacés d'une distance $d$ (la <strong>distance interréticulaire</strong>), sur lesquels arrive un faisceau de rayons X de longueur d'onde $\\lambda$, sous un angle rasant $\\theta$. Chaque plan réfléchit une petite partie du faisceau (comme un miroir semi-transparent). La différence de marche entre deux rayons réfléchis par deux plans successifs est $\\delta = 2d\\sin\\theta$ (une démonstration géométrique simple, omise ici).</p>

    <h3>2. La loi de Bragg</h3>
    <p>L'interférence est <strong>constructive</strong> — un pic de diffraction intense est observé — seulement quand cette différence de marche est un multiple entier de $\\lambda$ :</p>
    <div class="formula-box">$$\\boxed{\\ 2d\\sin\\theta = n\\lambda\\ }, \\qquad n=1,2,3,\\ldots$$</div>
    <p>C'est la <strong>loi de Bragg</strong>. Pour toute autre valeur de $\\theta$, les ondes réfléchies par les différents plans interfèrent de façon destructive (en moyenne, sur un grand nombre de plans) et aucun signal n'est détecté.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La loi de Bragg exige $\\lambda \\lesssim 2d$ pour qu'une solution en $\\theta$ existe : c'est pourquoi il faut des rayons X (longueur d'onde $\\sim 0{,}1\\,\\text{nm}$, comparable aux distances interatomiques) et non de la lumière visible ($\\sim 500\\,\\text{nm}$, bien trop grande) pour sonder la structure cristalline.
    </div>

    <h3>3. Réseau réciproque (aperçu)</h3>
    <p>Une formulation plus générale et plus puissante de la diffraction (due à von Laue) utilise le <strong>réseau réciproque</strong>, engendré par des vecteurs $\\vec b_i$ tels que $\\vec a_i\\cdot\\vec b_j = 2\\pi\\delta_{ij}$. La condition de diffraction constructive s'écrit alors $\\Delta\\vec k = \\vec G$, où $\\Delta\\vec k$ est la variation du vecteur d'onde et $\\vec G$ un vecteur du réseau réciproque — une reformulation vectorielle équivalente à la loi de Bragg, mais qui se généralise plus naturellement aux structures complexes et à la diffraction électronique.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un pic de diffraction du premier ordre ($n=1$) apparaît à $\\theta=15°$ pour des rayons X de longueur d'onde $\\lambda=0{,}154\\,\\text{nm}$ (raie $K_\\alpha$ du cuivre). Calculer $d$.</p>
      <p><strong>Solution :</strong> $d = \\dfrac{n\\lambda}{2\\sin\\theta} = \\dfrac{0{,}154}{2\\sin(15°)} = \\dfrac{0{,}154}{2\\times 0{,}259}$.</p>
      <p class="example-answer">$d \\approx 0{,}297\\,\\text{nm}$ — cette mesure, répétée pour différents pics, permet de reconstruire entièrement la géométrie du réseau cristallin.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Loi de Bragg : $2d\\sin\\theta=n\\lambda$, condition d'interférence constructive entre plans réticulaires</li>
      <li>Nécessite $\\lambda$ comparable aux distances interatomiques, d'où l'usage des rayons X</li>
      <li>Le réseau réciproque généralise la condition de diffraction à toute géométrie cristalline</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre l'angle de Bragg $\\theta$ (rasant, mesuré par rapport au plan) avec l'angle d'incidence usuel (par rapport à la normale)</li>
      <li>Oublier l'ordre $n$ : plusieurs pics de diffraction peuvent correspondre à la même famille de plans</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La loi de Bragg s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc3e1" value="wrong">$d\\sin\\theta=n\\lambda$</label>
          <label class="option"><input type="radio" name="pmc3e1" value="right">$2d\\sin\\theta=n\\lambda$</label>
          <label class="option"><input type="radio" name="pmc3e1" value="wrong">$d\\cos\\theta=n\\lambda$</label>
          <label class="option"><input type="radio" name="pmc3e1" value="wrong">$2d=n\\lambda\\sin\\theta$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc3e1','pmc3fb1','Correct — 2dsinθ=nλ, avec le facteur 2 issu de la différence de marche entre deux plans.','Relis la formule encadrée du cours.')">Vérifier</button>
        <div class="feedback" id="pmc3fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">On utilise des rayons X (et non de la lumière visible) pour la diffraction cristalline car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc3e2" value="wrong">ils sont moins dangereux</label>
          <label class="option"><input type="radio" name="pmc3e2" value="right">leur longueur d'onde est comparable aux distances interatomiques</label>
          <label class="option"><input type="radio" name="pmc3e2" value="wrong">ils sont moins chers à produire</label>
          <label class="option"><input type="radio" name="pmc3e2" value="wrong">ils ne s'atténuent pas dans la matière</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc3e2','pmc3fb2','Correct — il faut λ comparable à d pour que la loi de Bragg ait une solution en θ.','Relis le point clé du cours.')">Vérifier</button>
        <div class="feedback" id="pmc3fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $\\theta=15°$ et $\\lambda=0{,}154\\,\\text{nm}$ ($n=1$), $d$ vaut environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc3e3" value="right">0,30 nm</label>
          <label class="option"><input type="radio" name="pmc3e3" value="wrong">0,15 nm</label>
          <label class="option"><input type="radio" name="pmc3e3" value="wrong">0,60 nm</label>
          <label class="option"><input type="radio" name="pmc3e3" value="wrong">1,5 nm</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc3e3','pmc3fb3','Correct — exactement le résultat de l\\'exemple corrigé, d≈0,297 nm.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="pmc3fb3"></div>
      </div>
    </div>
  `
};
PMC_NOVA_KB[pmcKey("Diffraction des rayons X et loi de Bragg")] = {
  intro: "Salut, c'est Nova ! On étudie la diffraction des rayons X et la loi de Bragg. Demande-moi une explication ou un indice.",
  rules: [
    { test:/bragg/i, replies:["La loi de Bragg 2dsinθ=nλ donne les angles où l'interférence entre plans réticulaires est constructive."]},
    { test:/r[ée]seau r[ée]ciproque/i, replies:["Le réseau réciproque (vecteurs bi avec ai·bj=2πδij) généralise Bragg via la condition Δk=G, plus adaptée aux structures complexes."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la formule encadrée.","Il y a un facteur 2.","2dsinθ=nλ."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé du cours.","Pense à l'échelle des distances.","λ doit être comparable à d."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends le calcul de l'exemple corrigé.","d=nλ/(2sinθ).","≈0,30 nm."]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
PMC_CHAPTERS[pmcKey("Vibrations du réseau : phonons et capacité thermique des solides")] = {
  objectives: [
    "Relier les vibrations du réseau cristallin aux modes normaux d'une chaîne d'atomes",
    "Introduire la notion de phonon comme quantum de vibration",
    "Présenter le modèle de Debye et sa prédiction en T³ à basse température",
    "Expliquer la loi de Dulong et Petit comme limite haute température"
  ],
  prereqs: ["De la chaîne d'oscillateurs couplés au milieu continu (Ondes et vibrations)", "L'oscillateur harmonique quantique : méthode algébrique (Mécanique quantique non relativiste)"],
  bodyHtml: `
    <p>Les atomes d'un cristal ne sont jamais parfaitement immobiles : ils vibrent autour de leur position d'équilibre. Le cours d'ondes et vibrations a montré comment une chaîne d'oscillateurs couplés donne, à la limite continue, une équation d'onde ; ici, on quantifie ces vibrations et on en tire une conséquence macroscopique directement mesurable : la <strong>capacité thermique</strong> des solides.</p>

    <h3>1. Des modes normaux aux phonons</h3>
    <p>Un cristal de $N$ atomes possède $3N$ modes normaux de vibration (chapitre 6 de mécanique analytique), chacun quantifié comme un oscillateur harmonique quantique (chapitre 3 de mécanique quantique non relativiste) : $E_n = (n+\\frac12)\\hbar\\omega$. Le quantum d'énergie de vibration $\\hbar\\omega$ associé à un mode donné est appelé <strong>phonon</strong> — la « particule » élémentaire des vibrations du réseau, au même titre que le photon pour le champ électromagnétique.</p>

    <h3>2. Modèle d'Einstein et modèle de Debye</h3>
    <p>Le modèle le plus simple (Einstein, 1907) suppose que tous les modes vibrent à la même fréquence $\\omega_E$ — une approximation grossière mais qui capture déjà l'essentiel de la physique quantique du problème. Le modèle de <strong>Debye</strong> (1912), plus réaliste, prend en compte la distribution continue des fréquences de vibration, bornée par une fréquence de coupure $\\omega_D$ (la <strong>température de Debye</strong> $\\Theta_D=\\hbar\\omega_D/k_B$ caractérise chaque matériau).</p>

    <h3>3. Deux régimes limites de la capacité thermique</h3>
    <table class="mini-table">
      <tr><th>Régime</th><th>Comportement de $C_V$</th><th>Interprétation</th></tr>
      <tr><td>Haute température ($T\\gg\\Theta_D$)</td><td>$C_V \\to 3Nk_B$ (loi de Dulong-Petit)</td><td>chaque mode, excité classiquement, contribue $k_B$ (équipartition)</td></tr>
      <tr><td>Basse température ($T\\ll\\Theta_D$)</td><td>$C_V \\propto T^3$ (loi de Debye en $T^3$)</td><td>seuls les modes de basse fréquence sont thermiquement excités</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La loi de Dulong-Petit ($C_V=3Nk_B$, indépendante de $T$) était connue expérimentalement dès 1819, bien avant la mécanique quantique — mais elle échoue totalement à basse température, où $C_V\\to 0$ expérimentalement. C'est précisément cette anomalie basse température, inexplicable classiquement, que la quantification des vibrations (modèle de Debye) résout : à basse $T$, l'énergie thermique $k_BT$ devient insuffisante pour exciter les modes de haute fréquence, « gelés » quantiquement — un phénomène analogue au gel des degrés de liberté vibrationnels d'une molécule diatomique.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi la capacité thermique d'un solide tend-elle vers zéro quand $T\\to 0$, plutôt que de rester constante comme le prédit la physique classique ?</p>
      <p><strong>Solution :</strong> classiquement (équipartition de l'énergie), chaque mode contribue $k_B$ à $C_V$ quelle que soit la température. Quantiquement, un mode de pulsation $\\omega$ n'est thermiquement excité que si $k_BT \\gtrsim \\hbar\\omega$ ; à $T\\to0$, tous les modes deviennent « gelés ».</p>
      <p class="example-answer">$C_V\\to0$ à $T\\to0$ : un résultat expérimental incompréhensible sans la quantification des vibrations, l'une des premières confirmations historiques de la nécessité de la mécanique quantique en physique du solide.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Un phonon est le quantum d'énergie $\\hbar\\omega$ associé à un mode normal de vibration du réseau</li>
      <li>Dulong-Petit : $C_V\\to3Nk_B$ à haute température (limite classique)</li>
      <li>Debye : $C_V\\propto T^3$ à basse température (modes de haute fréquence gelés)</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que $C_V=3Nk_B$ est toujours valable : ce n'est vrai qu'à haute température</li>
      <li>Confondre phonon (quantum de vibration, quasi-particule) et photon (quantum du champ électromagnétique)</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Un phonon est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc4e1" value="wrong">une particule élémentaire du modèle standard</label>
          <label class="option"><input type="radio" name="pmc4e1" value="right">le quantum d'énergie d'un mode de vibration du réseau</label>
          <label class="option"><input type="radio" name="pmc4e1" value="wrong">un électron libre</label>
          <label class="option"><input type="radio" name="pmc4e1" value="wrong">un défaut cristallin</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc4e1','pmc4fb1','Correct — le phonon est le quantum ℏω associé à un mode normal de vibration.','Relis la définition du phonon dans le cours.')">Vérifier</button>
        <div class="feedback" id="pmc4fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">À haute température, la capacité thermique d'un solide tend vers :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc4e2" value="wrong">0</label>
          <label class="option"><input type="radio" name="pmc4e2" value="right">$3Nk_B$ (Dulong-Petit)</label>
          <label class="option"><input type="radio" name="pmc4e2" value="wrong">l'infini</label>
          <label class="option"><input type="radio" name="pmc4e2" value="wrong">$Nk_B/3$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc4e2','pmc4fb2','Correct — c\\'est la loi de Dulong-Petit, la limite classique à haute température.','Relis le tableau du cours sur les deux régimes.')">Vérifier</button>
        <div class="feedback" id="pmc4fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">$C_V\\to0$ quand $T\\to0$ s'explique par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc4e3" value="wrong">la disparition des atomes</label>
          <label class="option"><input type="radio" name="pmc4e3" value="right">le gel quantique des modes de haute fréquence</label>
          <label class="option"><input type="radio" name="pmc4e3" value="wrong">une erreur de mesure systématique</label>
          <label class="option"><input type="radio" name="pmc4e3" value="wrong">l'équipartition classique de l'énergie</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc4e3','pmc4fb3','Correct — exactement l\\'explication de l\\'exemple corrigé : k_BT devient insuffisant pour exciter les modes.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="pmc4fb3"></div>
      </div>
    </div>
  `
};
PMC_NOVA_KB[pmcKey("Vibrations du réseau : phonons et capacité thermique des solides")] = {
  intro: "Salut, c'est Nova ! On étudie les phonons et la capacité thermique des solides. Demande-moi une explication ou un indice.",
  rules: [
    { test:/phonon/i, replies:["Un phonon est le quantum d'énergie ℏω associé à un mode normal de vibration du réseau cristallin, l'analogue vibrationnel du photon."]},
    { test:/dulong|petit/i, replies:["La loi de Dulong-Petit, CV→3NkB à haute T, est la limite classique où chaque mode contribue kB par équipartition."]},
    { test:/debye|T.?cube|T3/i, replies:["Le modèle de Debye prédit CV∝T³ à basse température : les modes de haute fréquence sont 'gelés' quantiquement, seuls les modes de basse fréquence contribuent."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la définition du phonon.","C'est un quantum, pas une particule du modèle standard.","Le quantum d'un mode de vibration."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le tableau des deux régimes.","C'est la limite haute température.","3NkB."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense à kBT comparé à ℏω.","Le gel quantique des modes de haute fréquence."]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
PMC_CHAPTERS[pmcKey("Électrons dans les solides : électron libre et bandes d'énergie")] = {
  objectives: [
    "Présenter le modèle de l'électron libre (Sommerfeld) et la notion de sphère de Fermi",
    "Introduire l'énergie de Fermi et son ordre de grandeur dans un métal",
    "Comprendre l'origine des bandes d'énergie à partir du potentiel périodique du réseau",
    "Distinguer conducteurs, isolants et semi-conducteurs par leur structure de bandes"
  ],
  prereqs: ["Vibrations du réseau : phonons et capacité thermique des solides", "L'atome d'hydrogène : potentiel central et quantification (Mécanique quantique non relativiste)"],
  bodyHtml: `
    <p>Après les vibrations du réseau (chapitre 4), ce chapitre s'intéresse aux <strong>électrons</strong> — responsables des propriétés électriques des solides. Le traitement quantique des électrons dans un cristal explique, en particulier, la distinction fondamentale entre métaux, isolants et semi-conducteurs.</p>

    <h3>1. Modèle de l'électron libre et sphère de Fermi</h3>
    <p>Dans le modèle le plus simple (Sommerfeld), les électrons de conduction d'un métal sont traités comme un gaz de particules quantiques libres, confinées dans le volume du métal, obéissant au principe d'exclusion de Pauli (chapitre 6 de mécanique quantique non relativiste, addition de moments cinétiques — ici appliqué au spin des électrons, des fermions). À $T=0$, les électrons remplissent tous les états d'énergie disponibles jusqu'à une énergie maximale, l'<strong>énergie de Fermi</strong> $E_F$, définissant dans l'espace des impulsions une <strong>sphère de Fermi</strong> de rayon $k_F$ :</p>
    <div class="formula-box">$$E_F = \\frac{\\hbar^2 k_F^2}{2m_e}, \\qquad k_F = (3\\pi^2 n)^{1/3}$$</div>
    <p>où $n$ est la densité électronique. Pour un métal typique (cuivre), $E_F \\sim 7\\,\\text{eV}$ — bien supérieure à l'énergie thermique $k_BT\\sim 0{,}025\\,\\text{eV}$ à température ambiante : l'agitation thermique ne perturbe qu'une mince couche d'électrons proches de $E_F$, expliquant pourquoi le modèle classique du gaz d'électrons (chaque électron contribuant $\\frac32k_B$ à $C_V$) échoue expérimentalement.</p>

    <h3>2. Origine des bandes d'énergie</h3>
    <p>Le modèle de l'électron libre néglige le potentiel périodique créé par les ions du réseau. En le prenant en compte (théorème de Bloch, admis ici), les niveaux d'énergie autrefois continus (électron libre) se réorganisent en <strong>bandes d'énergie</strong> permises, séparées par des <strong>bandes interdites</strong> (gaps), à des valeurs particulières du vecteur d'onde correspondant aux conditions de diffraction de Bragg (chapitre 3) des électrons sur le réseau lui-même.</p>

    <h3>3. Conducteurs, isolants, semi-conducteurs</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Structure de bandes</th></tr>
      <tr><td>Conducteur (métal)</td><td>bande de conduction partiellement remplie : les électrons proches de $E_F$ peuvent circuler librement</td></tr>
      <tr><td>Isolant</td><td>bande de valence pleine, bande de conduction vide, séparées par un large gap ($E_g \\gtrsim 4\\,\\text{eV}$)</td></tr>
      <tr><td>Semi-conducteur</td><td>même structure qu'un isolant, mais gap étroit ($E_g \\sim 1\\,\\text{eV}$), franchissable thermiquement (chapitre 6)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      C'est la position du <strong>niveau de Fermi</strong> par rapport aux bandes permises — et non une propriété « intrinsèque » de chaque matériau prise isolément — qui détermine son caractère conducteur ou isolant : un même type de structure de bandes peut, selon la largeur du gap, donner un isolant ou un semi-conducteur.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi la capacité thermique électronique d'un métal ($C_{el}\\propto T$) est-elle beaucoup plus petite que la prédiction classique $\\frac32Nk_B$ à température ambiante ?</p>
      <p><strong>Solution :</strong> seuls les électrons dans une fine couche d'énergie $\\sim k_BT$ autour de $E_F$ peuvent être thermiquement excités (les autres sont bloqués par le principe de Pauli, tous les états en-dessous étant déjà occupés). La fraction d'électrons concernés est $\\sim k_BT/E_F \\ll 1$.</p>
      <p class="example-answer">$C_{el} \\sim Nk_B \\times (k_BT/E_F) \\ll \\frac32 Nk_B$ — exactement l'analogue électronique du gel quantique des phonons (chapitre 4), ici dû au principe d'exclusion de Pauli plutôt qu'à la quantification des niveaux.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Énergie de Fermi $E_F=\\hbar^2k_F^2/2m_e$ : énergie maximale occupée à $T=0$ dans le modèle de l'électron libre</li>
      <li>Le potentiel périodique du réseau ouvre des bandes interdites (gaps) dans le spectre d'énergie électronique</li>
      <li>Conducteur : bande partiellement remplie ; isolant : gap large ; semi-conducteur : gap étroit</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que tous les électrons contribuent également à $C_V$ : seuls ceux proches de $E_F$ le font (principe de Pauli)</li>
      <li>Confondre isolant et semi-conducteur : c'est la largeur du gap qui les distingue, pas la structure de bandes elle-même</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">L'énergie de Fermi $E_F$ représente :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc5e1" value="wrong">l'énergie thermique ambiante</label>
          <label class="option"><input type="radio" name="pmc5e1" value="right">l'énergie maximale occupée par les électrons à T=0</label>
          <label class="option"><input type="radio" name="pmc5e1" value="wrong">l'énergie de liaison du noyau</label>
          <label class="option"><input type="radio" name="pmc5e1" value="wrong">l'énergie d'un phonon</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc5e1','pmc5fb1','Correct — EF est l\\'énergie du dernier état occupé à T=0 dans le modèle de l\\'électron libre.','Relis la définition de EF dans le cours.')">Vérifier</button>
        <div class="feedback" id="pmc5fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Un semi-conducteur diffère d'un isolant par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc5e2" value="wrong">l'absence de bandes interdites</label>
          <label class="option"><input type="radio" name="pmc5e2" value="right">un gap plus étroit, franchissable thermiquement</label>
          <label class="option"><input type="radio" name="pmc5e2" value="wrong">une bande de conduction toujours pleine</label>
          <label class="option"><input type="radio" name="pmc5e2" value="wrong">l'absence d'électrons</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc5e2','pmc5fb2','Correct — même structure de bandes qu\\'un isolant, mais gap étroit (~1 eV), franchissable par agitation thermique.','Relis le tableau du cours sur les trois types.')">Vérifier</button>
        <div class="feedback" id="pmc5fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">La capacité thermique électronique d'un métal est petite car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc5e3" value="wrong">les électrons n'existent pas dans un métal</label>
          <label class="option"><input type="radio" name="pmc5e3" value="right">seuls les électrons proches de EF peuvent être excités (Pauli)</label>
          <label class="option"><input type="radio" name="pmc5e3" value="wrong">le métal est toujours froid</label>
          <label class="option"><input type="radio" name="pmc5e3" value="wrong">les phonons bloquent tous les électrons</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc5e3','pmc5fb3','Correct — exactement l\\'explication de l\\'exemple corrigé, l\\'analogue électronique du gel quantique des phonons.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="pmc5fb3"></div>
      </div>
    </div>
  `
};
PMC_NOVA_KB[pmcKey("Électrons dans les solides : électron libre et bandes d'énergie")] = {
  intro: "Salut, c'est Nova ! On étudie l'électron libre, l'énergie de Fermi et les bandes d'énergie. Demande-moi une explication ou un indice.",
  rules: [
    { test:/fermi/i, replies:["EF=ℏ²kF²/2me est l'énergie maximale occupée à T=0 par les électrons dans le modèle de l'électron libre. Typiquement ~7 eV pour un métal."]},
    { test:/bandes? d.[ée]nergie|gap/i, replies:["Le potentiel périodique du réseau ouvre des bandes interdites (gaps). Conducteur: bande partiellement pleine. Isolant: gap large. Semi-conducteur: gap étroit."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la définition de EF.","C'est une énergie maximale à T=0.","L'énergie du dernier état occupé."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le tableau des trois types.","C'est une différence de largeur.","Gap étroit, franchissable thermiquement."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense au principe de Pauli.","Seuls les électrons proches de EF contribuent."]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
PMC_CHAPTERS[pmcKey("Semi-conducteurs et propriétés de transport")] = {
  objectives: [
    "Distinguer semi-conducteurs intrinsèques et extrinsèques (dopage n et p)",
    "Comprendre le rôle des porteurs de charge (électrons, trous)",
    "Établir la loi d'action de masse et la dépendance en température de la conductivité",
    "Introduire le principe de la jonction p-n"
  ],
  prereqs: ["Électrons dans les solides : électron libre et bandes d'énergie"],
  bodyHtml: `
    <p>Ce dernier chapitre approfondit les semi-conducteurs, introduits au chapitre précédent, dont la maîtrise a rendu possible toute l'électronique moderne (transistors, diodes, cellules solaires). L'ingrédient clé, absent des métaux et des isolants, est le contrôle fin de la densité de porteurs de charge par <strong>dopage</strong>.</p>

    <h3>1. Semi-conducteur intrinsèque</h3>
    <p>Un semi-conducteur <strong>intrinsèque</strong> (pur, non dopé) a, à $T=0$, une bande de valence pleine et une bande de conduction vide — un isolant parfait. À température finie, l'agitation thermique fait passer une petite fraction d'électrons de la bande de valence vers la bande de conduction, à travers le gap $E_g$, créant deux types de <strong>porteurs de charge</strong> :</p>
    <ul>
      <li><strong>Électrons</strong> de conduction (charge $-e$), dans la bande de conduction</li>
      <li><strong>Trous</strong> (charge $+e$), les états vacants laissés dans la bande de valence, qui se comportent comme des porteurs de charge positive mobiles</li>
    </ul>
    <p>La densité de porteurs croît exponentiellement avec la température : $n_i \\propto e^{-E_g/(2k_BT)}$ — une loi d'activation thermique caractéristique.</p>

    <h3>2. Dopage : semi-conducteurs extrinsèques</h3>
    <p>En pratique, on contrôle la densité de porteurs bien plus finement par <strong>dopage</strong> : introduction d'impuretés en très faible concentration ($\\sim 1$ atome sur $10^6$–$10^9$) dans le cristal (par exemple du silicium, colonne IV).</p>
    <table class="mini-table">
      <tr><th>Type de dopage</th><th>Impureté</th><th>Porteur majoritaire</th></tr>
      <tr><td>Type $n$</td><td>donneur (colonne V, ex. phosphore) : un électron en excès, faiblement lié</td><td>électrons</td></tr>
      <tr><td>Type $p$</td><td>accepteur (colonne III, ex. bore) : un électron manquant</td><td>trous</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — la loi d'action de masse</span>
      Quel que soit le dopage, à l'équilibre thermique, le produit des concentrations d'électrons $n$ et de trous $p$ reste constant : $np = n_i^2$ (loi d'action de masse). Doper fortement en type $n$ (beaucoup d'électrons) réduit donc automatiquement la concentration de trous — les deux populations de porteurs ne sont jamais indépendantes.
    </div>

    <h3>3. La jonction p-n</h3>
    <p>La brique de base de toute l'électronique à semi-conducteurs est la <strong>jonction p-n</strong> : la mise en contact d'une région dopée $p$ et d'une région dopée $n$ dans un même cristal. À l'interface, les électrons (majoritaires côté $n$) diffusent vers la région $p$, et les trous vers la région $n$, créant une <strong>zone de charge d'espace</strong> dépourvue de porteurs mobiles et un champ électrique interne qui s'oppose à la diffusion supplémentaire — jusqu'à l'établissement d'un équilibre. Cette jonction se comporte comme une <strong>diode</strong> : elle laisse passer le courant dans un sens, le bloque dans l'autre — le principe de base de tous les composants électroniques à semi-conducteurs (diodes, transistors, cellules photovoltaïques).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi la conductivité électrique d'un semi-conducteur <em>augmente</em>-t-elle avec la température, contrairement à celle d'un métal (qui diminue) ?</p>
      <p><strong>Solution :</strong> dans un métal, le nombre de porteurs (électrons de conduction) est fixé et quasi-indépendant de $T$ ; seule leur mobilité diminue avec $T$ (plus de collisions sur les phonons, chapitre 4), d'où une conductivité décroissante. Dans un semi-conducteur, la densité de porteurs $n_i\\propto e^{-E_g/2k_BT}$ croît très rapidement avec $T$, un effet qui domine largement la diminution de mobilité.</p>
      <p class="example-answer">L'effet dominant — création exponentielle de nouveaux porteurs — l'emporte sur la baisse de mobilité, d'où l'augmentation nette de la conductivité avec $T$ pour un semi-conducteur, à l'opposé exact du comportement métallique.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Semi-conducteur intrinsèque : porteurs (électrons + trous) créés par activation thermique, $n_i\\propto e^{-E_g/2k_BT}$</li>
      <li>Dopage $n$ (donneurs) ou $p$ (accepteurs) : contrôle fin de la densité de porteurs, avec $np=n_i^2$ (loi d'action de masse)</li>
      <li>Jonction p-n : brique de base de l'électronique, se comporte comme une diode</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que la conductivité d'un semi-conducteur diminue avec $T$ comme un métal : c'est l'inverse</li>
      <li>Oublier que $np=n_i^2$ reste valable même après dopage : les deux populations de porteurs restent couplées</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Un dopage de type $n$ introduit majoritairement des porteurs de type :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc6e1" value="right">électrons</label>
          <label class="option"><input type="radio" name="pmc6e1" value="wrong">trous</label>
          <label class="option"><input type="radio" name="pmc6e1" value="wrong">phonons</label>
          <label class="option"><input type="radio" name="pmc6e1" value="wrong">photons</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc6e1','pmc6fb1','Correct — un donneur (dopage n) libère un électron faiblement lié.','Relis le tableau du cours sur les types de dopage.')">Vérifier</button>
        <div class="feedback" id="pmc6fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">La loi d'action de masse énonce que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc6e2" value="wrong">$n+p=n_i$</label>
          <label class="option"><input type="radio" name="pmc6e2" value="right">$np=n_i^2$</label>
          <label class="option"><input type="radio" name="pmc6e2" value="wrong">$n=p$ toujours</label>
          <label class="option"><input type="radio" name="pmc6e2" value="wrong">$n-p=0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc6e2','pmc6fb2','Correct — np=ni² reste valable quel que soit le dopage, à l\\'équilibre thermique.','Relis le point clé du cours sur la loi d\\'action de masse.')">Vérifier</button>
        <div class="feedback" id="pmc6fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">La conductivité d'un semi-conducteur, contrairement à celle d'un métal, ... quand $T$ augmente :</p>
        <div class="options">
          <label class="option"><input type="radio" name="pmc6e3" value="right">augmente</label>
          <label class="option"><input type="radio" name="pmc6e3" value="wrong">diminue</label>
          <label class="option"><input type="radio" name="pmc6e3" value="wrong">reste constante</label>
          <label class="option"><input type="radio" name="pmc6e3" value="wrong">devient nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('pmc6e3','pmc6fb3','Correct — la création exponentielle de porteurs domine la baisse de mobilité, contrairement au métal.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="pmc6fb3"></div>
      </div>
    </div>
  `
};
PMC_NOVA_KB[pmcKey("Semi-conducteurs et propriétés de transport")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : semi-conducteurs, dopage et jonction p-n. Demande-moi une explication ou un indice.",
  rules: [
    { test:/dopage|donneur|accepteur/i, replies:["Dopage n (donneurs, colonne V) → excès d'électrons. Dopage p (accepteurs, colonne III) → excès de trous. Loi d'action de masse : np=ni² toujours."]},
    { test:/jonction/i, replies:["La jonction p-n crée une zone de charge d'espace et se comporte comme une diode : elle laisse passer le courant dans un sens seulement."]},
    { test:/conductivit[ée]/i, replies:["Contrairement à un métal, la conductivité d'un semi-conducteur augmente avec T : la création exponentielle de porteurs (ni∝e^-Eg/2kBT) domine la baisse de mobilité."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le tableau des types de dopage.","n = 'négatif' = électrons.","Électrons."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé sur la loi d'action de masse.","C'est un produit, pas une somme.","np=ni²."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense à la création de porteurs vs mobilité.","La conductivité augmente avec T."]}
  ]
};

/* fusionne le module Propriétés de la matière condensée dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, PMC_CHAPTERS);
Object.assign(NOVA_KB, PMC_NOVA_KB);