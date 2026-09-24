/* =====================================================================
   CHUNK « met » — registre MET_CHAPTERS / MET_NOVA_KB
   Matière(s) : Chimie|Métallurgie et transitions de phases
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   MET_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — MÉTALLURGIE ET TRANSITIONS DE PHASES (L3 Chimie Fondamentale)
   6 chapitres : élaboration des métaux, alliages et diagrammes binaires solide-solide,
   transformations allotropiques et martensitiques, traitements thermiques, mécanismes
   de diffusion à l'état solide, essais mécaniques et propriétés des alliages. S'appuie
   sur les diagrammes binaires déjà rédigés en thermodynamique chimique et sur les
   propriétés de la matière condensée côté Physique.
   ===================================================================================== */
const MET_MATIERE = 'Métallurgie et transitions de phases';
function metKey(chapterTitle){ return `Chimie|${MET_MATIERE}|${chapterTitle}`; }
const MET_CHAPTERS = {};
const MET_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
MET_CHAPTERS[metKey("De l'élaboration des métaux aux alliages")] = {
  objectives: [
    "Décrire les grandes étapes de l'élaboration d'un métal à partir de son minerai",
    "Comprendre le principe de la réduction métallurgique",
    "Définir un alliage et justifier l'intérêt de l'alliage par rapport au métal pur",
    "Distinguer solution solide et composé intermétallique"
  ],
  prereqs: ["Chimie des matériaux inorganiques (L2)", "Diagrammes binaires liquide-solide et eutectiques (Thermodynamique chimique)"],
  bodyHtml: `
    <p>La <strong>métallurgie</strong> étudie l'obtention des métaux à partir de leurs minerais et l'optimisation de leurs propriétés par la maîtrise de leur microstructure. Ce premier chapitre pose les bases : comment un métal est-il extrait, et pourquoi presque aucun métal utilisé industriellement n'est-il pur, mais toujours <strong>allié</strong> ?</p>

    <h3>1. De la réduction du minerai au métal</h3>
    <p>Un minerai métallique contient le métal sous forme <strong>oxydée</strong> (oxyde, sulfure, carbonate). L'étape de <strong>réduction</strong> convertit cette forme oxydée en métal ($\\text{M}^{n+} + ne^- \\to \\text{M}$, chapitre 1 d'électrochimie), par différentes voies :</p>
    <table class="mini-table">
      <tr><th>Voie</th><th>Principe</th><th>Exemple</th></tr>
      <tr><td>Pyrométallurgie</td><td>réduction thermique par un réducteur chimique (carbone, monoxyde de carbone) à haute température</td><td>haut fourneau (fer)</td></tr>
      <tr><td>Hydrométallurgie</td><td>dissolution du minerai en solution aqueuse, puis récupération du métal (précipitation, cémentation)</td><td>extraction du cuivre par lixiviation</td></tr>
      <tr><td>Électrométallurgie</td><td>réduction par électrolyse (chapitre 4 d'électrochimie)</td><td>aluminium (procédé Hall-Héroult)</td></tr>
    </table>

    <h3>2. Pourquoi allier plutôt qu'utiliser un métal pur ?</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Un métal pur a en général des propriétés mécaniques (dureté, résistance) modestes. L'ajout contrôlé d'éléments d'alliage — même en faible proportion — perturbe l'arrangement cristallin régulier (mécanique des solides déformables, matière condensée) et gêne le mouvement des dislocations responsables de la déformation plastique, augmentant considérablement la résistance mécanique. C'est ce principe qui explique, par exemple, pourquoi l'acier (fer + carbone, quelques %) est bien plus résistant que le fer pur.
    </div>

    <h3>3. Solution solide et composé intermétallique</h3>
    <p>Un <strong>alliage</strong> associe un métal de base (le <strong>solvant</strong>) à un ou plusieurs éléments d'addition (les <strong>solutés</strong>). Deux grandes structures possibles :</p>
    <table class="mini-table">
      <tr><th>Structure</th><th>Description</th></tr>
      <tr><td>Solution solide</td><td>les atomes de soluté s'insèrent dans le réseau cristallin du solvant, soit en <strong>substitution</strong> (atomes de taille comparable, remplaçant un atome du solvant), soit en <strong>insertion</strong> (petits atomes comme C, N, H, logés dans les sites interstitiels du réseau)</td></tr>
      <tr><td>Composé intermétallique</td><td>structure cristalline propre, distincte de celle des deux constituants, de stœchiométrie fixe ou variable (comme un composé chimique)</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> l'acier est un alliage fer-carbone. Le carbone, de très petite taille atomique, forme-t-il une solution solide de substitution ou d'insertion avec le fer ?</p>
      <p><strong>Solution :</strong> le rayon atomique du carbone ($\\approx77\\,\\text{pm}$) est bien plus petit que celui du fer ($\\approx126\\,\\text{pm}$), trop petit pour remplacer un atome de fer dans le réseau, mais suffisamment petit pour se loger dans les sites interstitiels de la structure cristalline du fer.</p>
      <p class="example-answer">C'est une solution solide d'<strong>insertion</strong> — exactement le mécanisme qui rend l'acier bien plus dur que le fer pur : les atomes de carbone interstitiels bloquent localement le mouvement des dislocations.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Trois voies d'élaboration : pyrométallurgie, hydrométallurgie, électrométallurgie</li>
      <li>Allier un métal perturbe le réseau cristallin et gêne les dislocations, augmentant la résistance mécanique</li>
      <li>Solution solide (substitution ou insertion) vs composé intermétallique (structure cristalline propre)</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre solution solide de substitution (atomes de taille comparable) et d'insertion (petits atomes en sites interstitiels)</li>
      <li>Croire qu'un métal pur est toujours mécaniquement plus résistant qu'un alliage : c'est généralement l'inverse</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le procédé Hall-Héroult pour l'aluminium relève de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met1e1" value="wrong">la pyrométallurgie</label>
          <label class="option"><input type="radio" name="met1e1" value="right">l'électrométallurgie</label>
          <label class="option"><input type="radio" name="met1e1" value="wrong">l'hydrométallurgie</label>
          <label class="option"><input type="radio" name="met1e1" value="wrong">aucune de ces voies</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met1e1','met1fb1','Correct — c\\'est une réduction par électrolyse.','Relis le tableau des voies d\\'élaboration.')">Vérifier</button>
        <div class="feedback" id="met1fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Allier un métal augmente généralement sa résistance mécanique car cela :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met1e2" value="right">gêne le mouvement des dislocations</label>
          <label class="option"><input type="radio" name="met1e2" value="wrong">rend le réseau plus régulier</label>
          <label class="option"><input type="radio" name="met1e2" value="wrong">diminue la densité</label>
          <label class="option"><input type="radio" name="met1e2" value="wrong">n'a aucun effet mécanique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met1e2','met1fb2','Correct — c\\'est le mécanisme central expliquant pourquoi les alliages sont plus résistants que les métaux purs.','Relis le point clé du cours.')">Vérifier</button>
        <div class="feedback" id="met1fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Le carbone dans l'acier forme une solution solide de type :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met1e3" value="wrong">substitution</label>
          <label class="option"><input type="radio" name="met1e3" value="right">insertion</label>
          <label class="option"><input type="radio" name="met1e3" value="wrong">composé intermétallique</label>
          <label class="option"><input type="radio" name="met1e3" value="wrong">aucune de ces réponses</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met1e3','met1fb3','Correct — exactement le résultat de l\\'exemple corrigé du cours.','Reprends l\\'exemple corrigé sur l\\'acier.')">Vérifier</button>
        <div class="feedback" id="met1fb3"></div>
      </div>
    </div>
  `
};
MET_NOVA_KB[metKey("De l'élaboration des métaux aux alliages")] = {
  intro: "Salut, moi c'est Nova ! On démarre la métallurgie avec l'élaboration des métaux et les alliages. Demande-moi une explication ou un indice.",
  rules: [
    { test:/pyrom[ée]tallurgie|hydrom[ée]tallurgie|[ée]lectrom[ée]tallurgie/i, replies:["Trois voies d'élaboration : pyrométallurgie (réduction thermique), hydrométallurgie (voie aqueuse), électrométallurgie (électrolyse, comme l'aluminium)."]},
    { test:/solution solide|substitution|insertion/i, replies:["Solution solide de substitution : atomes de taille comparable remplacent le solvant. Solution solide d'insertion : petits atomes (C, N, H) logés dans les sites interstitiels."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le tableau des voies d'élaboration.","C'est une réduction électrolytique.","L'électrométallurgie."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé du cours.","Pense aux défauts du réseau cristallin.","Ça gêne le mouvement des dislocations."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Compare les tailles atomiques.","Insertion."]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
MET_CHAPTERS[metKey("Diagrammes binaires solide-solide : solutions solides et composés définis")] = {
  objectives: [
    "Lire un diagramme binaire à miscibilité totale à l'état solide",
    "Interpréter un diagramme avec miscibilité partielle et lacune de miscibilité",
    "Identifier un composé défini sur un diagramme binaire",
    "Appliquer le théorème des moments à un alliage biphasé"
  ],
  prereqs: ["De l'élaboration des métaux aux alliages", "Diagrammes binaires liquide-solide et eutectiques (Thermodynamique chimique)"],
  bodyHtml: `
    <p>Le chapitre 6 de thermodynamique chimique a traité le cas le plus simple : deux constituants totalement <strong>non miscibles</strong> à l'état solide. Ce chapitre généralise aux cas, très courants en métallurgie, où les deux métaux sont au moins partiellement miscibles à l'état solide — donnant des diagrammes de phase bien plus riches.</p>

    <h3>1. Miscibilité totale à l'état solide</h3>
    <p>Quand deux métaux ont des rayons atomiques proches, la même structure cristalline et une électronégativité similaire (règles de Hume-Rothery), ils peuvent former une <strong>solution solide de substitution</strong> sur toute la gamme de composition — un diagramme « en fuseau », analogue en forme au diagramme liquide-vapeur du chapitre 5 de thermodynamique chimique, mais ici entre un liquide et un solide totalement miscibles l'un dans l'autre (comme le système cuivre-nickel).</p>

    <h3>2. Miscibilité partielle : la lacune de miscibilité</h3>
    <p>Plus fréquemment, la miscibilité à l'état solide n'est que <strong>partielle</strong> : au-delà d'une certaine concentration en soluté, le réseau cristallin du solvant ne peut plus accueillir davantage d'atomes étrangers sans se déstabiliser. Le diagramme présente alors une <strong>lacune de miscibilité</strong> — une région où deux solutions solides distinctes ($\\alpha$ et $\\beta$, chacune riche en l'un des deux constituants) coexistent, plutôt qu'une seule solution homogène.</p>

    <h3>3. Composés définis</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Certains systèmes binaires forment, à une composition précise (souvent stœchiométrique simple, comme $\\text{Mg}_2\\text{Si}$), un <strong>composé défini</strong> — une structure cristalline propre, distincte des deux métaux purs, qui apparaît sur le diagramme comme un point (ou une ligne verticale étroite) à composition fixe, souvent associé à un maximum local de température de fusion (congruent) sur le diagramme.
    </div>

    <h3>4. Théorème des moments en alliage biphasé</h3>
    <p>Exactement comme pour les diagrammes liquide-vapeur ou liquide-solide simples (thermodynamique chimique), dans toute zone de coexistence de deux phases $\\alpha$ et $\\beta$, le théorème des moments donne la fraction massique (ou molaire) de chaque phase :</p>
    <div class="formula-box">$$f_\\beta = \\frac{x-x_\\alpha}{x_\\beta-x_\\alpha}$$</div>
    <p>où $x$ est la composition globale de l'alliage, $x_\\alpha$ et $x_\\beta$ les compositions des deux phases en équilibre à la température considérée.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> à une température donnée, un alliage de composition globale $x=30\\%$ (en soluté) se trouve dans une zone biphasée $\\alpha+\\beta$, où $x_\\alpha=5\\%$ et $x_\\beta=80\\%$. Calculer $f_\\beta$.</p>
      <p><strong>Solution :</strong> $f_\\beta = \\dfrac{30-5}{80-5} = \\dfrac{25}{75}$.</p>
      <p class="example-answer">$f_\\beta \\approx 33\\%$ : l'alliage est constitué d'environ un tiers de phase $\\beta$ et deux tiers de phase $\\alpha$, à cette température — un calcul essentiel pour prévoir la microstructure d'un alliage refroidi.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Miscibilité totale à l'état solide : diagramme « en fuseau » (règles de Hume-Rothery)</li>
      <li>Miscibilité partielle : lacune de miscibilité, coexistence de deux solutions solides $\\alpha,\\beta$</li>
      <li>Composé défini : structure cristalline propre à composition fixe</li>
      <li>Théorème des moments : $f_\\beta=(x-x_\\alpha)/(x_\\beta-x_\\alpha)$ dans une zone biphasée</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre solution solide (structure du solvant conservée) et composé défini (structure cristalline propre)</li>
      <li>Oublier que la lacune de miscibilité signifie deux phases distinctes, pas une seule solution homogène</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Une lacune de miscibilité correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met2e1" value="wrong">une miscibilité totale</label>
          <label class="option"><input type="radio" name="met2e1" value="right">la coexistence de deux solutions solides distinctes</label>
          <label class="option"><input type="radio" name="met2e1" value="wrong">l'absence de tout solide</label>
          <label class="option"><input type="radio" name="met2e1" value="wrong">un composé défini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met2e1','met2fb1','Correct — c\\'est exactement la définition de la lacune de miscibilité.','Relis la section sur la miscibilité partielle.')">Vérifier</button>
        <div class="feedback" id="met2fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Un composé défini apparaît sur un diagramme binaire comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met2e2" value="right">un point ou une ligne verticale à composition fixe</label>
          <label class="option"><input type="radio" name="met2e2" value="wrong">une zone très large de composition</label>
          <label class="option"><input type="radio" name="met2e2" value="wrong">l'ensemble du diagramme</label>
          <label class="option"><input type="radio" name="met2e2" value="wrong">une phase liquide uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met2e2','met2fb2','Correct — un composé défini a une stœchiométrie fixe, donc une composition précise sur le diagramme.','Relis le point clé du cours sur les composés définis.')">Vérifier</button>
        <div class="feedback" id="met2fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $x=30\\%$, $x_\\alpha=5\\%$, $x_\\beta=80\\%$, la fraction $f_\\beta$ vaut environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met2e3" value="right">33%</label>
          <label class="option"><input type="radio" name="met2e3" value="wrong">67%</label>
          <label class="option"><input type="radio" name="met2e3" value="wrong">30%</label>
          <label class="option"><input type="radio" name="met2e3" value="wrong">5%</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met2e3','met2fb3','Correct — exactement le résultat de l\\'exemple corrigé.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="met2fb3"></div>
      </div>
    </div>
  `
};
MET_NOVA_KB[metKey("Diagrammes binaires solide-solide : solutions solides et composés définis")] = {
  intro: "Salut, c'est Nova ! On étudie les diagrammes binaires solide-solide et les composés définis. Demande-moi une explication ou un indice.",
  rules: [
    { test:/lacune de miscibilit[ée]/i, replies:["Une lacune de miscibilité correspond à la coexistence de deux solutions solides distinctes α et β, au-delà de la limite de solubilité mutuelle."]},
    { test:/compos[ée] d[ée]fini/i, replies:["Un composé défini a une structure cristalline propre à composition fixe (stœchiométrique), apparaissant comme un point sur le diagramme binaire."]},
    { test:/hume.?rothery/i, replies:["Les règles de Hume-Rothery (rayons atomiques proches, même structure cristalline, électronégativité similaire) prédisent une miscibilité totale à l'état solide."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la section sur la miscibilité partielle.","C'est deux phases, pas une.","La coexistence de deux solutions solides distinctes."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé sur les composés définis.","Pense à la stœchiométrie fixe.","Un point à composition fixe."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends le calcul de l'exemple corrigé.","(30-5)/(80-5).","≈33%."]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
MET_CHAPTERS[metKey("Transformations allotropiques et transformation martensitique")] = {
  objectives: [
    "Définir l'allotropie et donner l'exemple du fer",
    "Décrire le diagramme fer-carbone dans ses grandes lignes",
    "Comprendre le principe de la transformation martensitique",
    "Expliquer pourquoi la trempe durcit un acier"
  ],
  prereqs: ["Diagrammes binaires solide-solide : solutions solides et composés définis"],
  bodyHtml: `
    <p>Ce chapitre aborde un phénomène central de la métallurgie de l'acier : certains métaux changent de <strong>structure cristalline</strong> selon la température, sans changer d'état physique — un phénomène appelé <strong>allotropie</strong>, dont la maîtrise est à l'origine du traitement thermique des aciers.</p>

    <h3>1. L'allotropie du fer</h3>
    <table class="mini-table">
      <tr><th>Forme</th><th>Structure cristalline</th><th>Domaine de température</th></tr>
      <tr><td>Fer $\\alpha$ (ferrite)</td><td>cubique centré</td><td>$T<912\\,°\\text{C}$</td></tr>
      <tr><td>Fer $\\gamma$ (austénite)</td><td>cubique à faces centrées</td><td>$912\\,°\\text{C}<T<1394\\,°\\text{C}$</td></tr>
      <tr><td>Fer $\\delta$</td><td>cubique centré</td><td>$T>1394\\,°\\text{C}$ (jusqu'à la fusion)</td></tr>
    </table>
    <p>Cette transformation allotropique modifie fortement la <strong>solubilité du carbone</strong> dans le fer : l'austénite (CFC, plus compacte, mais avec des sites interstitiels plus grands) dissout jusqu'à environ $2\\%$ de carbone, contre seulement $0{,}02\\%$ pour la ferrite (CC) — une différence essentielle pour tout le traitement thermique des aciers.</p>

    <h3>2. Le diagramme fer-carbone (aperçu)</h3>
    <p>Le diagramme binaire fer-carbone combine les notions des chapitres précédents (chapitre 2 : solutions solides, composé défini $\\text{Fe}_3\\text{C}$ — la <strong>cémentite</strong> ; thermodynamique chimique chapitre 6 : point eutectique, ici appelé point <strong>eutectoïde</strong> quand la transformation a lieu entre deux phases solides plutôt que liquide-solide) — un des diagrammes les plus étudiés de toute la métallurgie, base de la classification des aciers (par teneur en carbone) et des fontes.</p>

    <h3>3. La transformation martensitique</h3>
    <div class="key-point">
      <span class="eyebrow">Transformation martensitique</span>
      Si l'austénite (riche en carbone dissous) est refroidie <strong>très rapidement</strong> (trempe), le carbone n'a pas le temps de diffuser hors de la structure pour former les phases d'équilibre attendues (ferrite + cémentite). La structure CFC se transforme alors, par un mécanisme <strong>displacif</strong> (sans diffusion, réarrangement collectif quasi instantané des atomes) plutôt que <strong>diffusif</strong>, en une structure métastable très déformée appelée <strong>martensite</strong>, sursaturée en carbone.
    </div>

    <h3>4. Pourquoi la trempe durcit l'acier</h3>
    <p>La martensite, avec sa structure cristalline fortement distordue par le carbone piégé en sursaturation, est <strong>extrêmement dure</strong> mais <strong>fragile</strong> — la distorsion du réseau bloque très efficacement le mouvement des dislocations (chapitre 1). C'est ce principe qui explique le durcissement des aciers par <strong>trempe</strong>, une opération industrielle fondamentale (souvent suivie d'un <strong>revenu</strong>, chapitre suivant, pour réduire la fragilité excessive).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi la vitesse de refroidissement est-elle le paramètre clé pour obtenir de la martensite plutôt que de la ferrite+cémentite ?</p>
      <p><strong>Solution :</strong> la transformation en ferrite+cémentite nécessite la <strong>diffusion</strong> du carbone (chapitre 5) sur une distance suffisante, un processus intrinsèquement lent. La transformation martensitique, elle, est displacive et quasi instantanée, ne nécessitant aucune diffusion.</p>
      <p class="example-answer">Un refroidissement suffisamment rapide ne laisse pas le temps à la diffusion de se produire : la seule voie de transformation restante est la transformation martensitique — d'où l'importance cruciale de la vitesse de trempe en pratique industrielle.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Le fer présente trois formes allotropiques (α, γ, δ), avec des solubilités du carbone très différentes</li>
      <li>Le diagramme fer-carbone combine solutions solides, composé défini (cémentite) et point eutectoïde</li>
      <li>La transformation martensitique est displacive (sans diffusion), obtenue par trempe rapide</li>
      <li>La martensite est dure mais fragile : distorsion du réseau qui bloque les dislocations</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre transformation allotropique (changement de structure cristalline) et changement d'état physique (fusion, vaporisation)</li>
      <li>Croire que la martensite se forme par diffusion lente : c'est au contraire un mécanisme rapide, sans diffusion</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">L'austénite (fer γ) dissout beaucoup plus de carbone que la ferrite (fer α) car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met3e1" value="right">sa structure CFC offre des sites interstitiels plus grands</label>
          <label class="option"><input type="radio" name="met3e1" value="wrong">elle est plus froide</label>
          <label class="option"><input type="radio" name="met3e1" value="wrong">elle ne contient pas de fer</label>
          <label class="option"><input type="radio" name="met3e1" value="wrong">c'est un composé défini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met3e1','met3fb1','Correct — c\\'est la différence de structure cristalline (CFC vs CC) qui explique cette différence de solubilité.','Relis le tableau du cours sur l\\'allotropie du fer.')">Vérifier</button>
        <div class="feedback" id="met3fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">La transformation martensitique est de type :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met3e2" value="wrong">diffusif, lent</label>
          <label class="option"><input type="radio" name="met3e2" value="right">displacif, sans diffusion</label>
          <label class="option"><input type="radio" name="met3e2" value="wrong">chimique, avec réaction</label>
          <label class="option"><input type="radio" name="met3e2" value="wrong">purement liquide</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met3e2','met3fb2','Correct — c\\'est précisément ce qui la distingue de la transformation en ferrite+cémentite, qui nécessite la diffusion.','Relis l\\'encadré sur la transformation martensitique.')">Vérifier</button>
        <div class="feedback" id="met3fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">La martensite est caractérisée par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met3e3" value="right">une grande dureté mais une fragilité importante</label>
          <label class="option"><input type="radio" name="met3e3" value="wrong">une grande mollesse</label>
          <label class="option"><input type="radio" name="met3e3" value="wrong">l'absence totale de carbone</label>
          <label class="option"><input type="radio" name="met3e3" value="wrong">une structure parfaitement régulière</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met3e3','met3fb3','Correct — la distorsion du réseau bloque les dislocations, d\\'où dureté et fragilité simultanées.','Relis la section du cours sur pourquoi la trempe durcit l\\'acier.')">Vérifier</button>
        <div class="feedback" id="met3fb3"></div>
      </div>
    </div>
  `
};
MET_NOVA_KB[metKey("Transformations allotropiques et transformation martensitique")] = {
  intro: "Salut, moi c'est Nova ! On étudie l'allotropie du fer et la transformation martensitique. Demande-moi une explication ou un indice.",
  rules: [
    { test:/allotropie|ferrite|aust[ée]nite/i, replies:["Le fer a 3 formes allotropiques : α (ferrite, CC, <912°C), γ (austénite, CFC, 912-1394°C), δ (CC, >1394°C) — avec des solubilités du carbone très différentes."]},
    { test:/martensite|trempe/i, replies:["La transformation martensitique est displacive (sans diffusion), obtenue par trempe rapide de l'austénite. La martensite résultante est très dure mais fragile."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le tableau de l'allotropie du fer.","Compare les structures CFC et CC.","Sites interstitiels plus grands en CFC."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis l'encadré sur la transformation martensitique.","Il n'y a pas de diffusion.","Displacif, sans diffusion."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis la section sur pourquoi la trempe durcit.","Deux propriétés simultanées.","Grande dureté mais fragilité."]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
MET_CHAPTERS[metKey("Traitements thermiques des alliages")] = {
  objectives: [
    "Décrire les principaux traitements thermiques des aciers (trempe, revenu, recuit)",
    "Comprendre le principe du durcissement structural des alliages d'aluminium",
    "Interpréter une courbe de refroidissement continu (diagramme TRC, aperçu qualitatif)",
    "Relier microstructure et propriétés mécaniques recherchées"
  ],
  prereqs: ["Transformations allotropiques et transformation martensitique"],
  bodyHtml: `
    <p>Le chapitre précédent a introduit la martensite, obtenue par trempe. Ce chapitre élargit à l'ensemble des <strong>traitements thermiques</strong> utilisés pour ajuster finement les propriétés mécaniques d'un alliage, en contrôlant sa microstructure par des cycles précis de chauffage et de refroidissement.</p>

    <h3>1. Les trois traitements thermiques classiques de l'acier</h3>
    <table class="mini-table">
      <tr><th>Traitement</th><th>Principe</th><th>Effet recherché</th></tr>
      <tr><td>Trempe</td><td>chauffage en austénite, refroidissement très rapide</td><td>formation de martensite : dureté maximale, mais fragilité</td></tr>
      <tr><td>Revenu</td><td>réchauffage modéré d'un acier trempé, puis refroidissement lent</td><td>relâche partiellement les contraintes internes de la martensite, réduit la fragilité au prix d'une légère baisse de dureté</td></tr>
      <tr><td>Recuit</td><td>chauffage suivi d'un refroidissement très lent</td><td>structure d'équilibre (ferrite+cémentite), maximise la ductilité, minimise les contraintes internes</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La séquence <strong>trempe puis revenu</strong> est le traitement thermique le plus utilisé en pratique industrielle : elle combine la dureté de la martensite (trempe) avec une ténacité restaurée (revenu), offrant le meilleur compromis dureté/fragilité pour la plupart des applications structurelles (outils, pièces mécaniques sollicitées).
    </div>

    <h3>2. Durcissement structural des alliages d'aluminium</h3>
    <p>Les alliages d'aluminium (qui ne présentent pas de transformation martensitique) utilisent un mécanisme différent : le <strong>durcissement structural</strong> (ou durcissement par précipitation). On dissout à haute température un élément d'alliage en solution solide (mise en solution), on trempe pour figer cette solution solide sursaturée, puis on effectue un <strong>vieillissement</strong> (maturation à température modérée, contrôlée) qui fait précipiter de très fines particules dispersées dans la matrice — ces précipités, comme les atomes de carbone en solution d'insertion, gênent efficacement le mouvement des dislocations et durcissent l'alliage.</p>

    <h3>3. Courbes de refroidissement continu (aperçu)</h3>
    <p>La microstructure finale obtenue dépend fortement de la <strong>vitesse de refroidissement</strong>, pas seulement de la température atteinte : un <strong>diagramme TRC</strong> (Transformation en Refroidissement Continu) représente, pour un acier donné, les domaines de microstructure obtenus (ferrite+perlite, bainite, martensite) en fonction de la vitesse de refroidissement — un outil essentiel pour choisir le traitement thermique adapté à une pièce industrielle réelle.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi un acier fraîchement trempé (martensite pure) est-il rarement utilisé directement en pratique, sans revenu ultérieur ?</p>
      <p><strong>Solution :</strong> la martensite pure, bien qu'extrêmement dure, est aussi très <strong>fragile</strong> — elle peut se rompre brutalement sous choc, sans déformation plastique préalable, à cause des fortes contraintes internes générées par la transformation displacive.</p>
      <p class="example-answer">Le revenu, en relâchant partiellement ces contraintes internes (par une légère diffusion contrôlée du carbone en excès), restaure une ténacité minimale indispensable pour la plupart des usages structurels — un compromis pratique entre dureté et résistance au choc.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Trempe (dureté max, fragile), revenu (restaure la ténacité), recuit (ductilité maximale) — trois traitements complémentaires</li>
      <li>Le durcissement structural des alliages d'aluminium repose sur la précipitation de fines particules après mise en solution et trempe</li>
      <li>Un diagramme TRC relie microstructure finale et vitesse de refroidissement</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que la trempe seule suffit pour une pièce en usage réel : le revenu est presque toujours nécessaire ensuite</li>
      <li>Confondre le durcissement structural (précipitation, aluminium) avec la transformation martensitique (aciers)</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le recuit vise principalement à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met4e1" value="wrong">maximiser la dureté</label>
          <label class="option"><input type="radio" name="met4e1" value="right">maximiser la ductilité et minimiser les contraintes internes</label>
          <label class="option"><input type="radio" name="met4e1" value="wrong">former de la martensite</label>
          <label class="option"><input type="radio" name="met4e1" value="wrong">fondre l'acier</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met4e1','met4fb1','Correct — c\\'est l\\'objectif du recuit, par opposition à la trempe qui maximise la dureté.','Relis le tableau des traitements thermiques.')">Vérifier</button>
        <div class="feedback" id="met4fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Le durcissement structural des alliages d'aluminium repose sur :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met4e2" value="right">la précipitation de fines particules après mise en solution et trempe</label>
          <label class="option"><input type="radio" name="met4e2" value="wrong">la transformation martensitique</label>
          <label class="option"><input type="radio" name="met4e2" value="wrong">la fusion complète de l'alliage</label>
          <label class="option"><input type="radio" name="met4e2" value="wrong">l'ajout de carbone en insertion</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met4e2','met4fb2','Correct — c\\'est le mécanisme spécifique aux alliages d\\'aluminium, différent de la trempe martensitique des aciers.','Relis la section sur le durcissement structural.')">Vérifier</button>
        <div class="feedback" id="met4fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Le revenu, appliqué après trempe, permet de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met4e3" value="right">restaurer une ténacité minimale en réduisant la fragilité</label>
          <label class="option"><input type="radio" name="met4e3" value="wrong">augmenter encore la fragilité</label>
          <label class="option"><input type="radio" name="met4e3" value="wrong">refondre complètement la pièce</label>
          <label class="option"><input type="radio" name="met4e3" value="wrong">annuler tout effet de la trempe</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met4e3','met4fb3','Correct — exactement l\\'explication de l\\'exemple corrigé du cours.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="met4fb3"></div>
      </div>
    </div>
  `
};
MET_NOVA_KB[metKey("Traitements thermiques des alliages")] = {
  intro: "Salut, c'est Nova ! On étudie les traitements thermiques : trempe, revenu, recuit, durcissement structural. Demande-moi une explication ou un indice.",
  rules: [
    { test:/revenu/i, replies:["Le revenu, après trempe, relâche partiellement les contraintes internes de la martensite pour restaurer une ténacité minimale, au prix d'une légère baisse de dureté."]},
    { test:/recuit/i, replies:["Le recuit (refroidissement très lent) donne la structure d'équilibre, maximisant la ductilité et minimisant les contraintes internes."]},
    { test:/durcissement structural|pr[ée]cipitation/i, replies:["Le durcissement structural (alliages d'aluminium) repose sur la précipitation de fines particules après mise en solution et trempe, qui gênent les dislocations."]},
    { test:/trc|refroidissement continu/i, replies:["Un diagramme TRC montre les microstructures obtenues (ferrite+perlite, bainite, martensite) selon la vitesse de refroidissement, pas seulement la température atteinte."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le tableau des traitements thermiques.","C'est l'opposé de la trempe.","Maximiser la ductilité."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la section sur le durcissement structural.","Pense à des particules dispersées.","La précipitation après mise en solution."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense à la fragilité de la martensite pure.","Restaurer une ténacité minimale."]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
MET_CHAPTERS[metKey("Diffusion à l'état solide")] = {
  objectives: [
    "Établir la première loi de Fick pour la diffusion à l'état solide",
    "Distinguer diffusion en volume, aux joints de grains et en surface",
    "Introduire la loi d'Arrhenius pour le coefficient de diffusion",
    "Estimer une profondeur de diffusion caractéristique"
  ],
  prereqs: ["Traitements thermiques des alliages"],
  bodyHtml: `
    <p>Les chapitres précédents ont évoqué à plusieurs reprises la <strong>diffusion</strong> des atomes (formation de ferrite+cémentite, précipitation en durcissement structural) sans la formaliser. Ce chapitre en pose les bases quantitatives, indispensables pour comprendre la cinétique — pas seulement la thermodynamique — des transformations métallurgiques.</p>

    <h3>1. Première loi de Fick</h3>
    <p>La diffusion est le transport de matière sous l'effet d'un gradient de concentration, tendant à l'homogénéiser. La <strong>première loi de Fick</strong>, analogue formel de la loi de Fourier pour la chaleur, relie le flux de matière $\\vec J$ au gradient de concentration $c$ :</p>
    <div class="formula-box">$$\\vec J = -D\\,\\vec\\nabla c$$</div>
    <p>où $D$ est le <strong>coefficient de diffusion</strong> (en $\\text{m}^2/\\text{s}$), caractéristique du couple espèce diffusante/matériau hôte, à une température donnée.</p>

    <h3>2. Chemins de diffusion privilégiés</h3>
    <table class="mini-table">
      <tr><th>Type de diffusion</th><th>Chemin</th><th>Vitesse relative</th></tr>
      <tr><td>Volumique</td><td>à travers le réseau cristallin (lacunes, interstitiels)</td><td>la plus lente</td></tr>
      <tr><td>Aux joints de grains</td><td>le long des interfaces entre grains cristallins</td><td>intermédiaire</td></tr>
      <tr><td>En surface</td><td>le long d'une surface libre</td><td>la plus rapide</td></tr>
    </table>
    <p>Un matériau à grains très fins (grande surface totale de joints de grains) diffuse donc globalement plus vite qu'un matériau à gros grains — un paramètre microstructural important pour contrôler la cinétique des traitements thermiques.</p>

    <h3>3. Loi d'Arrhenius du coefficient de diffusion</h3>
    <p>Le coefficient de diffusion dépend très fortement de la température, selon une loi d'<strong>Arrhenius</strong> :</p>
    <div class="formula-box">$$D(T) = D_0\\,e^{-E_a/RT}$$</div>
    <p>où $E_a$ est l'<strong>énergie d'activation</strong> de la diffusion (l'énergie nécessaire pour qu'un atome saute d'un site à un site voisin) et $D_0$ un facteur préexponentiel. Cette dépendance exponentielle explique pourquoi les traitements thermiques opèrent à haute température : une augmentation modeste de $T$ accélère considérablement la diffusion.</p>

    <h3>4. Profondeur de diffusion caractéristique</h3>
    <p>Pour un temps de diffusion $t$, la distance caractéristique parcourue par diffusion s'estime par :</p>
    <div class="formula-box">$$\\ell \\sim \\sqrt{Dt}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Cette loi en <strong>racine carrée du temps</strong> (et non proportionnelle à $t$, comme pour un mouvement balistique) est caractéristique de tout processus diffusif — déjà rencontrée sous une forme analogue dans d'autres contextes de physique statistique. Elle implique que doubler la profondeur de diffusion recherchée nécessite de <strong>quadrupler</strong> le temps de traitement, à température fixée.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour une cémentation (enrichissement superficiel en carbone), $D=2\\times10^{-11}\\,\\text{m}^2/\\text{s}$ à la température de traitement. Estimer le temps nécessaire pour une profondeur de diffusion de $1\\,\\text{mm}$.</p>
      <p><strong>Solution :</strong> $\\ell=\\sqrt{Dt} \\Rightarrow t = \\ell^2/D = (10^{-3})^2/(2\\times10^{-11}) = 10^{-6}/(2\\times10^{-11})$.</p>
      <p class="example-answer">$t \\approx 5\\times10^4\\,\\text{s} \\approx 14\\,\\text{h}$ — un ordre de grandeur cohérent avec la durée typique d'une cémentation industrielle, qui dure en effet plusieurs heures.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Première loi de Fick : $\\vec J=-D\\vec\\nabla c$, transport de matière proportionnel au gradient de concentration</li>
      <li>Diffusion volumique < joints de grains < surface, en vitesse relative</li>
      <li>Loi d'Arrhenius : $D(T)=D_0e^{-E_a/RT}$, très sensible à la température</li>
      <li>Profondeur de diffusion $\\ell\\sim\\sqrt{Dt}$ : quadrupler le temps pour doubler la profondeur</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que la profondeur de diffusion est proportionnelle au temps : c'est sa racine carrée</li>
      <li>Oublier que la diffusion aux joints de grains est plus rapide que la diffusion volumique</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La première loi de Fick relie le flux de matière au :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met5e1" value="right">gradient de concentration</label>
          <label class="option"><input type="radio" name="met5e1" value="wrong">gradient de pression</label>
          <label class="option"><input type="radio" name="met5e1" value="wrong">gradient de vitesse</label>
          <label class="option"><input type="radio" name="met5e1" value="wrong">volume total</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met5e1','met5fb1','Correct — J=−D∇c, exactement comme la loi de Fourier pour la chaleur.','Relis la formule encadrée du cours.')">Vérifier</button>
        <div class="feedback" id="met5fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Pour doubler la profondeur de diffusion (à $D,T$ fixés), il faut multiplier le temps par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met5e2" value="wrong">2</label>
          <label class="option"><input type="radio" name="met5e2" value="right">4</label>
          <label class="option"><input type="radio" name="met5e2" value="wrong">8</label>
          <label class="option"><input type="radio" name="met5e2" value="wrong">0,5</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met5e2','met5fb2','Correct — ℓ∝√t, donc doubler ℓ nécessite de multiplier t par 4.','Relis le point clé du cours sur la loi en racine carrée du temps.')">Vérifier</button>
        <div class="feedback" id="met5fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $D=2\\times10^{-11}\\,\\text{m}^2/\\text{s}$ et $\\ell=1\\,\\text{mm}$, le temps de diffusion est environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met5e3" value="right">14 h</label>
          <label class="option"><input type="radio" name="met5e3" value="wrong">14 s</label>
          <label class="option"><input type="radio" name="met5e3" value="wrong">14 min</label>
          <label class="option"><input type="radio" name="met5e3" value="wrong">14 jours</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met5e3','met5fb3','Correct — exactement le résultat de l\\'exemple corrigé du cours.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="met5fb3"></div>
      </div>
    </div>
  `
};
MET_NOVA_KB[metKey("Diffusion à l'état solide")] = {
  intro: "Salut, moi c'est Nova ! On étudie la diffusion à l'état solide : loi de Fick, Arrhenius. Demande-moi une explication ou un indice.",
  rules: [
    { test:/fick/i, replies:["La première loi de Fick J=−D∇c relie le flux de matière au gradient de concentration, analogue formel de la loi de Fourier pour la chaleur."]},
    { test:/arrhenius/i, replies:["D(T)=D0·e^(−Ea/RT) : le coefficient de diffusion dépend très fortement de la température, d'où l'usage de hautes températures en traitement thermique."]},
    { test:/racine carr[ée]e|√\\(Dt\\)|profondeur de diffusion/i, replies:["ℓ~√(Dt) : la profondeur de diffusion croît comme la racine carrée du temps — doubler ℓ demande de quadrupler t."]},
    { test:/joints de grains/i, replies:["La diffusion aux joints de grains est plus rapide que la diffusion volumique, mais plus lente que la diffusion en surface."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la formule encadrée.","Compare avec la loi de Fourier.","Le gradient de concentration."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé sur la racine carrée du temps.","ℓ est proportionnelle à √t.","Multiplier t par 4."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends le calcul de l'exemple corrigé.","t=ℓ²/D.","≈14 h."]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
MET_CHAPTERS[metKey("Essais mécaniques et relation structure-propriétés")] = {
  objectives: [
    "Interpréter une courbe contrainte-déformation d'un essai de traction",
    "Définir limite d'élasticité, résistance à la traction et allongement à la rupture",
    "Décrire le principe de l'essai de dureté (Vickers, Brinell)",
    "Relier taille de grain et limite d'élasticité (loi de Hall-Petch)"
  ],
  prereqs: ["Diffusion à l'état solide", "Énergie de déformation élastique et critères de rupture (Mécanique des solides déformables)"],
  bodyHtml: `
    <p>Ce dernier chapitre boucle la boucle entre microstructure (chapitres 1 à 5) et propriétés mécaniques mesurables : comment caractériser expérimentalement la résistance d'un alliage, et comment cette résistance dépend-elle quantitativement de sa microstructure ?</p>

    <h3>1. L'essai de traction et sa courbe caractéristique</h3>
    <p>L'<strong>essai de traction</strong> — déjà évoqué en mécanique des solides déformables (chapitre 8, domaines élastique/plastique/rupture) — reste l'essai mécanique le plus informatif en métallurgie. On y lit :</p>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Définition</th></tr>
      <tr><td>Limite d'élasticité $R_e$</td><td>contrainte marquant la fin du domaine élastique réversible (mécanique des solides déformables, chapitre 8)</td></tr>
      <tr><td>Résistance à la traction $R_m$</td><td>contrainte maximale supportée avant striction et rupture</td></tr>
      <tr><td>Allongement à la rupture $A\\%$</td><td>déformation plastique totale avant rupture, mesure de la ductilité</td></tr>
    </table>

    <h3>2. Essais de dureté</h3>
    <p>Les essais de <strong>dureté</strong> (Vickers, Brinell, Rockwell) mesurent la résistance d'un matériau à la pénétration locale d'un indenteur normalisé (pyramide de diamant pour Vickers, bille pour Brinell), sous une charge donnée. Plus rapides et moins destructifs qu'un essai de traction complet, ils sont très utilisés pour un contrôle qualité rapide, la dureté étant généralement corrélée à la résistance mécanique (avec des formules de conversion empiriques entre échelles).</p>

    <h3>3. La loi de Hall-Petch</h3>
    <p>Un résultat empirique majeur relie la limite d'élasticité $R_e$ à la <strong>taille de grain</strong> $d$ du matériau polycristallin (matière condensée, chapitre 1 : structure cristalline) :</p>
    <div class="formula-box">$$\\boxed{\\ R_e = R_0 + \\frac{k}{\\sqrt d}\\ }$$</div>
    <p>où $R_0$ et $k$ sont des constantes du matériau. Cette relation en $1/\\sqrt d$ traduit le rôle des <strong>joints de grains</strong> (chapitre 5) comme obstacles au mouvement des dislocations : plus les grains sont petits (donc plus la densité de joints de grains est élevée), plus il est difficile pour une dislocation de traverser le matériau, et plus la limite d'élasticité est élevée.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — le raffinement de grain, un levier universel</span>
      Contrairement au durcissement par solution solide (chapitre 1) ou par précipitation (chapitre 4), qui nécessitent d'ajouter des éléments d'alliage, le <strong>raffinement de la taille de grain</strong> (par contrôle du procédé de solidification ou par traitement thermomécanique) durcit un matériau sans changer sa composition chimique — un levier d'optimisation microstructurale à la fois puissant et économique, très exploité en métallurgie moderne.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un acier a $R_0=100\\,\\text{MPa}$, $k=15\\,\\text{MPa}\\cdot\\text{mm}^{1/2}$. Comparer $R_e$ pour une taille de grain $d_1=100\\,\\mu\\text{m}$ et $d_2=1\\,\\mu\\text{m}$.</p>
      <p><strong>Solution :</strong> $R_e(d_1) = 100+15/\\sqrt{0{,}1} \\approx 100+47{,}4 \\approx 147{,}4\\,\\text{MPa}$ (avec $d$ en mm). $R_e(d_2) = 100+15/\\sqrt{0{,}001} \\approx 100+474$.</p>
      <p class="example-answer">$R_e(d_2) \\approx 574\\,\\text{MPa}$ — un affinement du grain d'un facteur 100 (de $100\\,\\mu\\text{m}$ à $1\\,\\mu\\text{m}$, technique moderne de « nanostructuration ») multiplie la limite d'élasticité par presque 4, une illustration spectaculaire de la loi de Hall-Petch.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Essai de traction : $R_e$ (limite d'élasticité), $R_m$ (résistance max), $A\\%$ (ductilité)</li>
      <li>Essais de dureté (Vickers, Brinell) : rapides, corrélés à la résistance mécanique</li>
      <li>Loi de Hall-Petch : $R_e=R_0+k/\\sqrt d$ — les grains fins durcissent le matériau via les joints de grains, obstacles aux dislocations</li>
      <li>Le raffinement de grain durcit sans changer la composition chimique — un levier distinct de l'alliage ou de la précipitation</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre $R_e$ (limite d'élasticité, réversibilité) et $R_m$ (résistance maximale, avant rupture)</li>
      <li>Oublier que Hall-Petch est en $1/\\sqrt d$, pas $1/d$ : l'effet est moins que proportionnel à l'inverse de la taille de grain</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La loi de Hall-Petch relie la limite d'élasticité à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met6e1" value="wrong">la température de fusion</label>
          <label class="option"><input type="radio" name="met6e1" value="right">la taille de grain</label>
          <label class="option"><input type="radio" name="met6e1" value="wrong">la couleur du métal</label>
          <label class="option"><input type="radio" name="met6e1" value="wrong">le poids de l'échantillon</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met6e1','met6fb1','Correct — Re=R0+k/√d, avec d la taille de grain.','Relis la formule encadrée de Hall-Petch.')">Vérifier</button>
        <div class="feedback" id="met6fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Un matériau à grains plus fins a, d'après Hall-Petch, une limite d'élasticité :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met6e2" value="right">plus élevée</label>
          <label class="option"><input type="radio" name="met6e2" value="wrong">plus faible</label>
          <label class="option"><input type="radio" name="met6e2" value="wrong">identique</label>
          <label class="option"><input type="radio" name="met6e2" value="wrong">nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met6e2','met6fb2','Correct — plus de joints de grains, plus d\\'obstacles aux dislocations, donc une limite d\\'élasticité plus élevée.','Relis le point clé du cours sur le raffinement de grain.')">Vérifier</button>
        <div class="feedback" id="met6fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Le raffinement de la taille de grain durcit un matériau :</p>
        <div class="options">
          <label class="option"><input type="radio" name="met6e3" value="right">sans changer sa composition chimique</label>
          <label class="option"><input type="radio" name="met6e3" value="wrong">en ajoutant systématiquement des éléments d'alliage</label>
          <label class="option"><input type="radio" name="met6e3" value="wrong">en le faisant fondre</label>
          <label class="option"><input type="radio" name="met6e3" value="wrong">jamais, cela n'a aucun effet</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('met6e3','met6fb3','Correct — c\\'est exactement l\\'intérêt de ce levier d\\'optimisation, distinct de l\\'alliage ou de la précipitation.','Relis le point clé du cours sur le raffinement de grain.')">Vérifier</button>
        <div class="feedback" id="met6fb3"></div>
      </div>
    </div>
  `
};
MET_NOVA_KB[metKey("Essais mécaniques et relation structure-propriétés")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : essais mécaniques et loi de Hall-Petch. Demande-moi une explication ou un indice.",
  rules: [
    { test:/traction|Re|Rm/i, replies:["L'essai de traction donne Re (limite d'élasticité), Rm (résistance max avant rupture), et A% (allongement, mesure de ductilité)."]},
    { test:/hall.?petch/i, replies:["La loi de Hall-Petch, Re=R0+k/√d, relie la limite d'élasticité à la taille de grain d : plus les grains sont fins, plus le matériau est résistant (plus de joints de grains, plus d'obstacles aux dislocations)."]},
    { test:/duret[ée]|vickers|brinell/i, replies:["Les essais de dureté (Vickers, Brinell) mesurent la résistance à la pénétration d'un indenteur — plus rapides qu'un essai de traction complet, corrélés à la résistance mécanique."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la formule encadrée de Hall-Petch.","Une variable microstructurale précise.","La taille de grain."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé sur le raffinement de grain.","Pense aux joints de grains comme obstacles.","Plus élevée."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis le point clé sur le raffinement de grain.","C'est un levier distinct de l'alliage.","Sans changer sa composition chimique."]}
  ]
};

/* fusionne le module Métallurgie et transitions de phases dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, MET_CHAPTERS);
Object.assign(NOVA_KB, MET_NOVA_KB);