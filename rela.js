/* =====================================================================
   CHUNK « rela » — registre RELA_CHAPTERS / RELA_NOVA_KB
   Matière(s) : Physique|Ondes électromagnétiques et relativité restreinte
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   RELA_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ============================================================================
   MODULE — Ondes électromagnétiques et relativité restreinte (Physique, L2)
   Structure identique aux autres modules : RELA_CHAPTERS / RELA_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const RELA_MATIERE = 'Ondes électromagnétiques et relativité restreinte';
function relaKey(chapterTitle){ return `Physique|${RELA_MATIERE}|${chapterTitle}`; }
const RELA_CHAPTERS = {};
const RELA_NOVA_KB = {};

/* =========================== CHAPITRE 1 — Mécanique classique et ses limites =========================== */
RELA_CHAPTERS[relaKey('Mécanique classique et ses limites')] = {
  objectives: [
    "Écrire les transformations de Galilée entre deux référentiels galiléens en translation uniforme",
    "En déduire la loi de composition classique des vitesses et des accélérations",
    "Expliquer pourquoi les équations de Maxwell entrent en conflit avec les transformations de Galilée",
    "Décrire le principe et la conclusion de l'expérience de Michelson et Morley"
  ],
  prereqs: ["Mécanique générale"],
  bodyHtml: `
    <p>Avant 1905, la physique newtonienne repose sur un postulat implicite : l'espace et le temps sont des cadres absolus, identiques pour tous les observateurs, quel que soit leur mouvement. Ce chapitre montre comment ce postulat, parfaitement raisonnable à l'échelle des vitesses usuelles, se heurte frontalement à l'électromagnétisme de Maxwell dès qu'on approche la vitesse de la lumière.</p>

    <h3>1. Transformations de Galilée</h3>
    <p>Considérons deux référentiels galiléens $R$ et $R'$, ce dernier animé d'une translation rectiligne uniforme de vitesse $u$ le long de l'axe commun $Ox$, avec $O\\equiv O'$ à $t=t'=0$. En mécanique classique, le temps est universel : $t=t'$. Les coordonnées d'un même événement se relient alors par :</p>
    <div class="formula-box">$$x=x'+ut' \\quad ; \\quad y=y' \\quad ; \\quad z=z' \\quad ; \\quad t=t'$$</div>
    <p>Sous forme matricielle, ces transformations de Galilée s'écrivent comme une simple translation dans l'espace, le temps restant un paramètre extérieur, identique pour tous.</p>

    <h3>2. Composition classique des vitesses et des accélérations</h3>
    <p>En dérivant ces relations par rapport au temps (commun), on obtient la loi de composition galiléenne des vitesses et le caractère invariant de l'accélération :</p>
    <div class="formula-box">$$\\vec v = \\vec v\\,' + \\vec u \\qquad ; \\qquad \\vec a = \\vec a\\,'$$</div>
    <div class="key-point">
      <span class="eyebrow">Principe de relativité galiléen</span>
      L'accélération étant la même dans tous les référentiels galiléens, le principe fondamental de la dynamique $m\\vec a=\\vec f$ garde la même forme dans tous ces référentiels : aucun d'entre eux n'est privilégié pour écrire les lois de la mécanique.
    </div>
    <p>Une conséquence immédiate : deux événements simultanés dans un référentiel le restent dans tout autre référentiel galiléen, et la distance spatiale entre deux événements simultanés est la même pour tous les observateurs inertiels. Ces deux propriétés, qui paraissent d'évidence en mécanique classique, sont en réalité des conséquences du caractère absolu du temps newtonien — et c'est précisément ce que la relativité restreinte va remettre en cause.</p>

    <h3>3. Le conflit avec l'électromagnétisme</h3>
    <p>Au XIX<sup>e</sup> siècle, les équations de Maxwell montrent que la lumière est une onde électromagnétique se propageant dans le vide à la vitesse $c=1/\\sqrt{\\varepsilon_0\\mu_0}$. Or, si l'on applique la composition galiléenne des vitesses à un rayon lumineux émis à la vitesse $c$ dans $R'$, sa vitesse mesurée dans $R$ vaudrait $c+u$, donc supérieure à $c$. Deux issues semblaient possibles : soit les équations de Maxwell ne sont valables que dans un référentiel privilégié — celui d'un milieu de propagation hypothétique, <strong>l'éther</strong> — soit les transformations de Galilée elles-mêmes doivent être révisées.</p>
    <table class="mini-table">
      <tr><th>Hypothèse de l'éther</th><th>Difficulté</th></tr>
      <tr><td>Milieu matériel porteur des ondes lumineuses, au repos absolu</td><td>Devrait être infiniment rigide (ondes transverses rapides) tout en étant totalement transparent au mouvement des planètes</td></tr>
      <tr><td>Référentiel privilégié où $c$ est la vitesse de la lumière</td><td>Contredit le principe de relativité : aucune expérience mécanique ne distingue de référentiel galiléen privilégié</td></tr>
    </table>

    <h3>4. L'expérience de Michelson et Morley</h3>
    <p>Si l'éther existe et si la Terre s'y déplace, un interféromètre orienté tantôt parallèlement, tantôt perpendiculairement à ce mouvement devrait détecter une différence de temps de parcours entre deux faisceaux lumineux, donc un déplacement des franges d'interférence. L'expérience, réalisée par Michelson (1881) puis avec Morley (1887), ne détecte <strong>aucun</strong> déplacement, quelle que soit l'orientation de l'appareil. La vitesse de la lumière apparaît donc identique dans toutes les directions, indépendamment du mouvement de la Terre.</p>
    <div class="key-point">
      <span class="eyebrow">Conclusion</span>
      L'éther n'existe pas en tant que référentiel privilégié. Ce résultat, en apparence négatif, est l'un des piliers expérimentaux qui prépareront (indépendamment du raisonnement d'Einstein, qui s'appuie surtout sur la cohérence interne de l'électromagnétisme) la naissance de la relativité restreinte en 1905.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Transformations de Galilée : $x=x'+ut'$, temps universel $t=t'$ ; elles impliquent $\\vec v=\\vec v\\,'+\\vec u$ et $\\vec a=\\vec a\\,'$</li>
        <li>La composition galiléenne des vitesses appliquée à la lumière donnerait une vitesse $c+u>c$, en contradiction avec les équations de Maxwell qui prédisent une vitesse $c$ universelle</li>
        <li>L'hypothèse de l'éther, milieu de propagation absolu de la lumière, entrait en conflit avec ses propriétés physiques nécessaires (rigidité extrême et transparence totale)</li>
        <li>L'expérience de Michelson-Morley (1881-1887) n'a détecté aucune variation de la vitesse de la lumière avec la direction : l'éther, comme référentiel privilégié, n'existe pas</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre « transformations de Galilée » (mécanique classique) et « transformations de Lorentz » (relativité restreinte, chapitre suivant)</li>
        <li>Croire que Michelson-Morley a mesuré la vitesse de la Terre : l'expérience a en réalité montré l'<em>absence</em> de variation attendue, ce qui invalide l'existence même de l'éther</li>
        <li>Penser que le conflit vient d'une erreur dans les équations de Maxwell : ce sont au contraire les transformations de Galilée qui se révèlent inadaptées aux vitesses proches de $c$</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans les transformations de Galilée, l'intervalle de temps entre deux événements est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela1e1" value="wrong"> différent dans chaque référentiel galiléen</label>
          <label class="option"><input type="radio" name="rela1e1" value="right"> invariant, identique dans tous les référentiels galiléens</label>
          <label class="option"><input type="radio" name="rela1e1" value="wrong"> nul par définition</label>
          <label class="option"><input type="radio" name="rela1e1" value="wrong"> proportionnel à la vitesse relative u</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela1e1','rela1fb1','Correct — en mécanique classique t=t\\', donc t2-t1=t2\\'-t1\\' : le temps est absolu.','Repars de t=t\\' : que peut-on en déduire pour un intervalle t2-t1 ?')">Vérifier</button>
        <div class="feedback" id="rela1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un rayon lumineux se propage à c dans R'. En appliquant la composition galiléenne des vitesses, sa vitesse dans R (qui se déplace à u par rapport à R') serait :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela1e2" value="wrong"> c</label>
          <label class="option"><input type="radio" name="rela1e2" value="right"> c+u</label>
          <label class="option"><input type="radio" name="rela1e2" value="wrong"> c−u</label>
          <label class="option"><input type="radio" name="rela1e2" value="wrong"> u</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela1e2','rela1fb2','Correct — c\\'est précisément ce résultat, en contradiction avec l\\'invariance de c, qui pose problème.','Applique vx = v\\'x + u avec v\\'x = c.')">Vérifier</button>
        <div class="feedback" id="rela1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le résultat principal de l'expérience de Michelson et Morley est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela1e3" value="wrong"> la mesure précise de la vitesse de l'éther</label>
          <label class="option"><input type="radio" name="rela1e3" value="right"> l'absence de déplacement des franges, quelle que soit l'orientation de l'interféromètre</label>
          <label class="option"><input type="radio" name="rela1e3" value="wrong"> la confirmation que c dépend de la direction d'observation</label>
          <label class="option"><input type="radio" name="rela1e3" value="wrong"> la découverte des rayons X</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela1e3','rela1fb3','Correct — aucun déplacement de frange n\\'a été observé, ce qui invalide l\\'hypothèse d\\'un éther au repos absolu.','Réfléchis à ce que l\\'expérience n\\'a PAS détecté plutôt qu\\'à ce qu\\'elle aurait dû détecter.')">Vérifier</button>
        <div class="feedback" id="rela1fb3"></div>
      </div>
    </div>
  `
};
RELA_NOVA_KB[relaKey('Mécanique classique et ses limites')] = {
  intro: "Salut, moi c'est Nova ! On attaque « Mécanique classique et ses limites ». Demande-moi les transformations de Galilée, l'expérience de Michelson-Morley, ou un indice sur un exercice.",
  rules: [
    { test:/galil[ée]e/i, replies:["Les transformations de Galilée relient les coordonnées d'un événement entre deux référentiels en translation uniforme, avec un temps universel t=t' : x=x'+ut', y=y', z=z', t=t'."] },
    { test:/[ée]ther/i, replies:["L'éther était le milieu hypothétique censé porter les ondes lumineuses, à l'image de l'air pour le son. Il aurait dû être à la fois infiniment rigide et parfaitement transparent au mouvement — des propriétés contradictoires."] },
    { test:/michelson|morley/i, replies:["L'interféromètre de Michelson-Morley (1881-1887) devait détecter une variation de la vitesse de la lumière selon la direction, due au mouvement de la Terre dans l'éther. Aucune variation n'a été observée."] },
    { test:/composition.*vitess|vx.*u/i, replies:["En mécanique classique, la composition des vitesses est simplement additive : v=v'+u. Appliquée à la lumière, elle donnerait c+u>c, ce qui contredit l'invariance de c prédite par Maxwell."] },
    { test:/maxwell/i, replies:["Les équations de Maxwell prédisent une vitesse de propagation de la lumière c=1/√(ε₀μ₀) constante dans le vide, indépendante du référentiel — ce qui est incompatible avec la composition galiléenne des vitesses."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repars de la relation t=t' des transformations de Galilée.","Indice niveau 2 : si t=t', alors t2-t1=t2'-t1' automatiquement.","Indice niveau 3 : l'intervalle de temps est invariant."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : applique la loi d'addition classique des vitesses.","Indice niveau 2 : vx = v'x + u avec v'x=c.","Indice niveau 3 : vx = c+u."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : que cherchait-on à observer, et qu'a-t-on réellement observé ?","Indice niveau 2 : on cherchait un déplacement de frange lié au mouvement dans l'éther.","Indice niveau 3 : aucun déplacement n'a été détecté."] }
  ]
};

/* =========================== CHAPITRE 2 — Bases de la relativité restreinte =========================== */
RELA_CHAPTERS[relaKey('Bases de la relativité restreinte')] = {
  objectives: [
    "Énoncer les deux postulats de la relativité restreinte formulés par Einstein en 1905",
    "Établir les transformations spéciales de Lorentz à partir de ces postulats",
    "Décrire les phénomènes de contraction des longueurs et de dilatation du temps",
    "Expliquer pourquoi la simultanéité de deux événements devient relative au référentiel"
  ],
  prereqs: ["Ondes électromagnétiques et relativité restreinte"],
  bodyHtml: `
    <p>Face à l'échec de la notion d'éther, Einstein choisit en 1905 une voie radicale : plutôt que de sauver l'espace et le temps absolus au prix d'un référentiel privilégié, il élève l'invariance de la vitesse de la lumière au rang de postulat, et accepte que l'espace et le temps deviennent relatifs à l'observateur.</p>

    <h3>1. Les deux postulats d'Einstein</h3>
    <table class="mini-table">
      <tr><th>Postulat</th><th>Énoncé</th></tr>
      <tr><td>1 — Principe de relativité (étendu)</td><td>Les lois de la physique — mécanique <strong>et</strong> électromagnétisme — sont identiques dans tous les référentiels galiléens</td></tr>
      <tr><td>2 — Invariance de c</td><td>La vitesse de la lumière dans le vide vaut c dans <strong>tout</strong> référentiel galiléen, indépendamment du mouvement de la source ou du récepteur</td></tr>
    </table>
    <p>Ces postulats ne se démontrent pas : ce sont des axiomes, confirmés depuis avec une précision extraordinaire par l'expérience. Si l'un d'eux était un jour infirmé, l'édifice complet de la relativité restreinte s'effondrerait.</p>

    <h3>2. Établissement des transformations spéciales de Lorentz</h3>
    <p>On cherche la relation entre les coordonnées $(x,y,z,t)$ d'un événement dans $R$ et $(x',y',z',t')$ dans $R'$, ce dernier en translation à la vitesse $u$ selon $Ox$. Les directions transverses ne sont pas affectées : $y'=y$, $z'=z$. Par homogénéité de l'espace-temps, la relation entre $x$ et $x'$ est linéaire : $x'=\\gamma(x-ut)$. Le postulat d'invariance de $c$ (appliqué à un signal lumineux émis à l'origine commune, $x=ct$ et $x'=ct'$) permet de fixer le facteur $\\gamma$ :</p>
    <div class="formula-box">$$\\gamma=\\dfrac{1}{\\sqrt{1-\\beta^2}} \\qquad \\text{avec} \\qquad \\beta=\\dfrac{u}{c}$$</div>
    <p>On obtient finalement les <strong>transformations spéciales de Lorentz</strong> :</p>
    <div class="formula-box">$$x'=\\gamma(x-ut) \\quad;\\quad y'=y \\quad;\\quad z'=z \\quad;\\quad t'=\\gamma\\left(t-\\dfrac{u}{c^2}x\\right)$$</div>
    <p>Sous forme matricielle, avec la matrice de Lorentz spéciale $L$ (symétrique, de déterminant 1) :</p>
    <div class="formula-box">$$\\begin{pmatrix}x\\\\y\\\\z\\\\ct\\end{pmatrix}=\\begin{pmatrix}\\gamma&0&0&\\beta\\gamma\\\\0&1&0&0\\\\0&0&1&0\\\\\\beta\\gamma&0&0&\\gamma\\end{pmatrix}\\begin{pmatrix}x'\\\\y'\\\\z'\\\\ct'\\end{pmatrix}$$</div>
    <div class="key-point">
      <span class="eyebrow">Limite classique</span>
      Pour $u\\ll c$, $\\beta\\to 0$ et $\\gamma\\to 1$ : les transformations de Lorentz redonnent exactement les transformations de Galilée. La mécanique classique est donc le cas limite « basse vitesse » de la relativité restreinte.
    </div>

    <h3>3. Contraction des longueurs</h3>
    <p>Une tige de longueur propre $L_0$ (mesurée au repos, dans $R'$) apparaît, pour un observateur de $R$ par rapport auquel elle se déplace à la vitesse $u$, contractée dans la direction du mouvement :</p>
    <div class="formula-box">$$L=\\dfrac{L_0}{\\gamma}=L_0\\sqrt{1-\\dfrac{u^2}{c^2}}$$</div>
    <p>Cette contraction n'affecte que la dimension parallèle au mouvement ; les dimensions transverses restent inchangées. La mesure de $L$ exige de repérer les deux extrémités <strong>simultanément</strong> dans $R$ — ce qui n'est pas nécessaire dans $R'$ puisque la tige y est immobile.</p>

    <h3>4. Dilatation du temps</h3>
    <p>Le temps propre $\\Delta t_0$ est l'intervalle mesuré par une horloge unique, entre deux événements se produisant au même endroit dans son référentiel. Vu d'un autre référentiel galiléen, cet intervalle est allongé :</p>
    <div class="formula-box">$$\\Delta t=\\gamma\\,\\Delta t_0=\\dfrac{\\Delta t_0}{\\sqrt{1-u^2/c^2}}$$</div>
    <p>Cet effet est confirmé expérimentalement par la durée de vie des muons cosmiques : leur durée de vie propre n'est que de $2{,}2\\,\\mu s$, ce qui à $v=0{,}99c$ ne leur permettrait de parcourir que $\\sim 650$ m avant désintégration — insuffisant pour atteindre le sol. Mais dans le référentiel terrestre, leur durée de vie dilatée ($\\gamma\\approx 7{,}1$) atteint $15{,}6\\,\\mu s$, leur permettant de parcourir plus de $4$ km : c'est pourquoi on les détecte au niveau de la mer.</p>

    <h3>5. Relativité de la simultanéité</h3>
    <p>Deux événements simultanés en des points distincts d'un référentiel $R'$ ($t_1'=t_2'$, $x_1'\\ne x_2'$) ne le sont plus dans $R$ :</p>
    <div class="formula-box">$$t_2-t_1=\\gamma\\dfrac{u}{c^2}(x_2'-x_1')\\ne 0$$</div>
    <div class="key-point">
      <span class="eyebrow">À retenir</span>
      Seule la simultanéité de deux événements se produisant au <strong>même point</strong> de l'espace est absolue (valable dans tous les référentiels). Dès que deux événements sont séparés dans l'espace, leur simultanéité — voire leur ordre chronologique dans certains cas — dépend du référentiel.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Postulats d'Einstein : lois physiques identiques dans tous les référentiels galiléens + vitesse de la lumière c invariante</li>
        <li>Transformations de Lorentz : $x'=\\gamma(x-ut)$, $t'=\\gamma(t-ux/c^2)$, avec $\\gamma=1/\\sqrt{1-u^2/c^2}$ ; redonnent Galilée quand $u\\ll c$</li>
        <li>Contraction des longueurs : $L=L_0/\\gamma$ (uniquement dans la direction du mouvement)</li>
        <li>Dilatation du temps : $\\Delta t=\\gamma\\Delta t_0$ (le temps propre est toujours le plus court)</li>
        <li>La simultanéité de deux événements distants dans l'espace dépend du référentiel galiléen choisi</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que $\\gamma\\ge 1$ toujours : le temps propre est TOUJOURS le plus court, la longueur propre est TOUJOURS la plus grande</li>
        <li>Confondre longueur propre (mesurée au repos) et longueur mesurée en mouvement — bien identifier quel référentiel est « propre » à l'objet étudié</li>
        <li>Croire que la contraction des longueurs s'applique aussi aux dimensions perpendiculaires au mouvement : c'est faux, seule la direction du mouvement est contractée</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une fusée de longueur propre 100 m se déplace à v=0,8c. Sa longueur mesurée depuis la Terre est (avec γ=1/√(1-0,64)=1,667) :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela2e1" value="wrong"> 166,7 m</label>
          <label class="option"><input type="radio" name="rela2e1" value="right"> 60 m</label>
          <label class="option"><input type="radio" name="rela2e1" value="wrong"> 100 m</label>
          <label class="option"><input type="radio" name="rela2e1" value="wrong"> 80 m</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela2e1','rela2fb1','Correct — L=L0/γ=100/1,667≈60 m : la fusée est contractée dans le sens du mouvement.','Utilise L=L0/γ, pas L0×γ : la longueur en mouvement est plus PETITE que la longueur propre.')">Vérifier</button>
        <div class="feedback" id="rela2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une horloge embarquée dans un vaisseau à v=0,6c (γ=1,25) indique 1 heure de temps propre écoulé. Pour un observateur terrestre, la durée écoulée est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela2e2" value="wrong"> 0,8 h</label>
          <label class="option"><input type="radio" name="rela2e2" value="right"> 1,25 h</label>
          <label class="option"><input type="radio" name="rela2e2" value="wrong"> 1 h</label>
          <label class="option"><input type="radio" name="rela2e2" value="wrong"> 1,6 h</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela2e2','rela2fb2','Correct — Δt=γΔt0=1,25×1=1,25 h : la durée est dilatée pour l\\'observateur terrestre.','Utilise Δt=γΔt0 avec Δt0=1h : l\\'observateur externe mesure TOUJOURS une durée plus longue que le temps propre.')">Vérifier</button>
        <div class="feedback" id="rela2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Deux événements simultanés dans R' mais séparés spatialement (x1'≠x2') sont, dans un autre référentiel R en mouvement par rapport à R' :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela2e3" value="wrong"> toujours simultanés aussi</label>
          <label class="option"><input type="radio" name="rela2e3" value="right"> en général non simultanés</label>
          <label class="option"><input type="radio" name="rela2e3" value="wrong"> impossibles à observer</label>
          <label class="option"><input type="radio" name="rela2e3" value="wrong"> séparés d'un temps infini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela2e3','rela2fb3','Correct — la relativité de la simultanéité est l\\'une des conséquences les plus contre-intuitives des transformations de Lorentz.','Applique t2-t1=γ(u/c²)(x2\\'-x1\\') avec t1\\'=t2\\' : ce terme est-il nul si x1\\'≠x2\\' ?')">Vérifier</button>
        <div class="feedback" id="rela2fb3"></div>
      </div>
    </div>
  `
};
RELA_NOVA_KB[relaKey('Bases de la relativité restreinte')] = {
  intro: "Salut, c'est Nova ! On est sur « Bases de la relativité restreinte ». Demande-moi les postulats d'Einstein, les transformations de Lorentz, la contraction des longueurs ou la dilatation du temps.",
  rules: [
    { test:/postulat/i, replies:["Les deux postulats d'Einstein (1905) : 1) les lois physiques sont identiques dans tous les référentiels galiléens ; 2) la vitesse de la lumière c est invariante, la même dans tout référentiel galiléen."] },
    { test:/lorentz/i, replies:["Les transformations de Lorentz relient (x,y,z,t) et (x',y',z',t') avec x'=γ(x-ut), t'=γ(t-ux/c²), où γ=1/√(1-u²/c²). Elles redonnent Galilée quand u≪c."] },
    { test:/contraction.*longueur/i, replies:["La contraction des longueurs : L=L0/γ, où L0 est la longueur propre (au repos). Seule la dimension parallèle au mouvement est contractée ; γ≥1 donc L≤L0 toujours."] },
    { test:/dilatation.*temps|temps propre/i, replies:["La dilatation du temps : Δt=γΔt0, où Δt0 est le temps propre (mesuré par une horloge au même endroit pour les deux événements). Δt≥Δt0 toujours : le temps propre est le plus court."] },
    { test:/simultan[ée]it[ée]/i, replies:["La simultanéité de deux événements distants spatialement est relative au référentiel : deux événements simultanés dans R' ne le sont en général pas dans R."] },
    { test:/gamma|facteur.*lorentz/i, replies:["Le facteur γ=1/√(1-β²) avec β=u/c est toujours ≥1. Il tend vers 1 pour u≪c (limite classique) et diverge quand u→c."] },
    { test:/muon/i, replies:["Les muons cosmiques ont une durée de vie propre de 2,2 μs, insuffisante pour atteindre le sol à vitesse relativiste... sauf que la dilatation du temps allonge leur durée de vie observée depuis la Terre, ce qui leur permet d'être détectés au niveau de la mer."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise L=L0/γ.","Indice niveau 2 : L0=100 m, γ=1,667.","Indice niveau 3 : L=100/1,667≈60 m."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise Δt=γΔt0.","Indice niveau 2 : γ=1,25, Δt0=1h.","Indice niveau 3 : Δt=1,25 h."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : applique la formule de transformation du temps entre référentiels aux deux événements.","Indice niveau 2 : le terme γ(u/c²)(x2'-x1') est-il nul si x1'≠x2' ?","Indice niveau 3 : non, donc les événements ne sont en général pas simultanés dans R."] }
  ]
};

/* =========================== CHAPITRE 3 — Cinématique relativiste =========================== */
RELA_CHAPTERS[relaKey('Cinématique relativiste')] = {
  objectives: [
    "Établir la loi de composition relativiste des vitesses à partir des transformations de Lorentz",
    "Montrer que la composition de deux vitesses inférieures à c reste toujours inférieure à c",
    "Retrouver la loi galiléenne classique comme cas limite de la loi relativiste",
    "Établir la loi de composition relativiste des accélérations"
  ],
  prereqs: ["Ondes électromagnétiques et relativité restreinte"],
  bodyHtml: `
    <p>Tant qu'on reste dans un seul référentiel, la cinématique classique (dérivées de la position) reste parfaitement valable. La difficulté apparaît lorsqu'on veut relier les vitesses et accélérations mesurées dans deux référentiels galiléens différents : la loi d'addition simple $\\vec v=\\vec v\\,'+\\vec u$ n'est plus exacte dès que les vitesses en jeu approchent $c$.</p>

    <h3>1. Loi de composition relativiste des vitesses</h3>
    <p>En différenciant les transformations de Lorentz (à $u$ constant) puis en formant les rapports $dx/dt$, $dy/dt$, $dz/dt$, on obtient :</p>
    <div class="formula-box">$$v_x=\\dfrac{v_x'+u}{1+\\dfrac{uv_x'}{c^2}} \\qquad v_y=\\dfrac{v_y'\\sqrt{1-u^2/c^2}}{1+\\dfrac{uv_x'}{c^2}} \\qquad v_z=\\dfrac{v_z'\\sqrt{1-u^2/c^2}}{1+\\dfrac{uv_x'}{c^2}}$$</div>
    <p>Le dénominateur $\\left(1+uv_x'/c^2\\right)$ est la signature caractéristique de la composition relativiste : il tend vers 1 quand $u$ et $v_x'$ sont petits devant $c$, et l'on retrouve alors la loi classique $v_x=v_x'+u$.</p>

    <h3>2. Une vitesse limite infranchissable</h3>
    <p>Un calcul direct sur l'expression de $v_x$ montre que, si $u<c$ et $v_x'<c$, alors nécessairement $v_x<c$ : on ne peut jamais dépasser $c$ en composant deux vitesses sous-luminiques.</p>
    <div class="key-point">
      <span class="eyebrow">Cas particulier remarquable</span>
      Si la « particule » est un photon se propageant à $v_x'=c$ dans $R'$, alors $v_x=\\dfrac{c+u}{1+u/c}=c$ : la composition d'une vitesse quelconque avec $c$ redonne toujours $c$. C'est exactement l'invariance de la vitesse de la lumière, deuxième postulat d'Einstein, retrouvée ici comme conséquence des transformations de Lorentz.
    </div>
    <table class="mini-table">
      <tr><th>Régime</th><th>Loi de composition</th></tr>
      <tr><td>Vitesses $\\ll c$ (classique)</td><td>$v_x=v_x'+u$ (additive, loi de Galilée)</td></tr>
      <tr><td>Vitesses relativistes</td><td>$v_x=\\dfrac{v_x'+u}{1+uv_x'/c^2}$ (jamais $\\ge c$)</td></tr>
      <tr><td>Photon ($v_x'=c$)</td><td>$v_x=c$ quelle que soit $u$</td></tr>
    </table>

    <h3>3. Loi de composition relativiste des accélérations</h3>
    <p>En dérivant une seconde fois les relations de vitesse (avec $u$ toujours constant), on obtient les transformations des composantes de l'accélération. Elles sont nettement plus lourdes que pour les vitesses car l'accélération, contrairement à la vitesse, <strong>n'est pas invariante</strong> par changement de référentiel galiléen en relativité :</p>
    <div class="formula-box">$$a_x=\\dfrac{\\left(1-\\dfrac{u^2}{c^2}\\right)^{3/2}}{\\left(1+\\dfrac{uv_x'}{c^2}\\right)^{3}}a_x'$$</div>
    <p>Une simplification importante intervient lorsqu'on choisit $R'$ comme <strong>référentiel comobile</strong> (instantanément au repos par rapport à la particule, $v_x'=v_y'=v_z'=0$) : les formules se réduisent alors à</p>
    <div class="formula-box">$$a_x=\\left(1-\\dfrac{u^2}{c^2}\\right)^{3/2}a_x' \\qquad a_y=\\left(1-\\dfrac{u^2}{c^2}\\right)a_y' \\qquad a_z=\\left(1-\\dfrac{u^2}{c^2}\\right)a_z'$$</div>
    <div class="key-point">
      <span class="eyebrow">Conséquence physique</span>
      Un mouvement uniformément accéléré dans le référentiel propre (où $\\vec a\\,'$ est constant) ne l'est <strong>pas</strong> vu depuis un référentiel galiléen fixe : l'accélération y décroît à mesure que la vitesse approche $c$. C'est ce qui empêche justement toute particule matérielle d'atteindre $c$, quelle que soit la durée pendant laquelle on la pousse.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Composition relativiste des vitesses : $v_x=\\dfrac{v_x'+u}{1+uv_x'/c^2}$ — jamais supérieure à c si u et v'x sont inférieures à c</li>
        <li>La composition d'une vitesse quelconque avec c redonne toujours c (invariance de la vitesse de la lumière)</li>
        <li>Pour u et v' petits devant c, on retrouve la loi classique additive v=v'+u</li>
        <li>L'accélération n'est PAS invariante en relativité restreinte — contrairement à la mécanique classique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Additionner directement les vitesses relativistes (v=v'+u) : ce n'est valable qu'en première approximation, pour u,v'≪c</li>
        <li>Oublier le dénominateur $(1+uv_x'/c^2)$, qui est la clé de voûte de la loi relativiste et garantit qu'on ne dépasse jamais c</li>
        <li>Croire que l'accélération reste invariante comme en mécanique classique — en relativité, elle dépend du référentiel</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Deux vaisseaux s'éloignent l'un de l'autre, chacun à 0,9c par rapport à un observateur terrestre médian. La vitesse relative de l'un par rapport à l'autre (loi relativiste) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela3e1" value="wrong"> 1,8c</label>
          <label class="option"><input type="radio" name="rela3e1" value="right"> environ 0,994c</label>
          <label class="option"><input type="radio" name="rela3e1" value="wrong"> 0,9c</label>
          <label class="option"><input type="radio" name="rela3e1" value="wrong"> c</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela3e1','rela3fb1','Correct — v=(0,9c+0,9c)/(1+0,81)=1,8c/1,81≈0,994c : la loi relativiste empêche de dépasser c.','Utilise v=(v\\'+u)/(1+uv\\'/c²) avec u=v\\'=0,9c, jamais l\\'addition simple.')">Vérifier</button>
        <div class="feedback" id="rela3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Composer une vitesse u (u&lt;c) avec la vitesse c d'un photon donne toujours, d'après la loi relativiste :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela3e2" value="wrong"> c+u</label>
          <label class="option"><input type="radio" name="rela3e2" value="right"> c</label>
          <label class="option"><input type="radio" name="rela3e2" value="wrong"> c−u</label>
          <label class="option"><input type="radio" name="rela3e2" value="wrong"> u</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela3e2','rela3fb2','Correct — vx=(c+u)/(1+u/c)=c, exactement l\\'invariance de la vitesse de la lumière.','Remplace v\\'x par c dans la formule de composition et simplifie.')">Vérifier</button>
        <div class="feedback" id="rela3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">En relativité restreinte, l'accélération d'une particule vue depuis deux référentiels galiléens différents est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela3e3" value="wrong"> toujours identique (invariante)</label>
          <label class="option"><input type="radio" name="rela3e3" value="right"> différente en général, contrairement à la mécanique classique</label>
          <label class="option"><input type="radio" name="rela3e3" value="wrong"> toujours nulle</label>
          <label class="option"><input type="radio" name="rela3e3" value="wrong"> égale à c dans tous les cas</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela3e3','rela3fb3','Correct — c\\'est une différence majeure avec la mécanique classique, où a=a\\' toujours.','Compare avec la mécanique classique où a=a\\' : est-ce encore vrai avec les formules relativistes ?')">Vérifier</button>
        <div class="feedback" id="rela3fb3"></div>
      </div>
    </div>
  `
};
RELA_NOVA_KB[relaKey('Cinématique relativiste')] = {
  intro: "Salut, c'est Nova ! On est sur « Cinématique relativiste ». Demande-moi la composition des vitesses, pourquoi on ne dépasse jamais c, ou la composition des accélérations.",
  rules: [
    { test:/composition.*vitess/i, replies:["La composition relativiste des vitesses : vx=(v'x+u)/(1+uv'x/c²). Le dénominateur empêche toute vitesse résultante de dépasser c."] },
    { test:/d[ée]passer c|vitesse limite|sup[ée]rieure.*c/i, replies:["On ne peut jamais dépasser c en composant deux vitesses sous-luminiques : c'est une conséquence directe de la formule de composition relativiste, pas un postulat séparé."] },
    { test:/photon.*vitesse|c\\+u/i, replies:["Composer n'importe quelle vitesse u avec c (vitesse d'un photon) redonne toujours c : vx=(c+u)/(1+u/c)=c. C'est l'invariance de la vitesse de la lumière."] },
    { test:/acc[ée]l[ée]ration/i, replies:["Contrairement à la mécanique classique, l'accélération n'est PAS invariante en relativité restreinte : elle se transforme par des formules plus complexes, faisant intervenir des facteurs (1-u²/c²) et (1+uv'x/c²)."] },
    { test:/r[ée]f[ée]rentiel comobile|r[ée]f[ée]rentiel propre/i, replies:["Le référentiel comobile (ou propre) est instantanément au repos par rapport à la particule (v'=0). Dans ce cas, les formules de transformation de l'accélération se simplifient nettement."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise la formule de composition relativiste, pas l'addition simple.","Indice niveau 2 : u=v'=0,9c, calcule 1+uv'/c²=1,81.","Indice niveau 3 : v=1,8c/1,81≈0,994c."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : remplace v'x par c dans la formule de composition.","Indice niveau 2 : vx=(c+u)/(1+u/c).","Indice niveau 3 : ça se simplifie exactement en c."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare avec le résultat classique a=a'.","Indice niveau 2 : en relativité, les formules de transformation de a font intervenir u et v'.","Indice niveau 3 : l'accélération est donc différente en général, pas invariante."] }
  ]
};

/* =========================== CHAPITRE 4 — Espace-temps et quadrivecteurs =========================== */
RELA_CHAPTERS[relaKey('Espace-temps et quadrivecteurs')] = {
  objectives: [
    "Définir l'espace-temps de Minkowski et l'intervalle d'univers entre deux événements",
    "Interpréter le signe de l'intervalle d'univers en termes de causalité (genre temps, espace, lumière)",
    "Définir un quadrivecteur et calculer sa pseudo-norme invariante",
    "Construire les quadrivecteurs position, vitesse et accélération d'une particule"
  ],
  prereqs: ["Ondes électromagnétiques et relativité restreinte"],
  bodyHtml: `
    <p>Puisque l'espace et le temps, pris séparément, ne sont plus invariants par changement de référentiel galiléen, il est naturel de chercher une combinaison des deux qui, elle, le soit. C'est tout l'objet de l'espace-temps de Minkowski et du formalisme des quadrivecteurs, qui unifie la description relativiste et rend les lois physiques manifestement covariantes.</p>

    <h3>1. L'espace-temps de Minkowski</h3>
    <p>Un événement est repéré par quatre coordonnées $(x,y,z,ct)$ — le facteur $c$ devant $t$ assure l'homogénéité dimensionnelle avec les longueurs. Cet espace à quatre dimensions est appelé <strong>espace-temps</strong> ou <strong>univers de Minkowski</strong>.</p>

    <h3>2. Intervalle d'espace-temps</h3>
    <p>Pour deux événements $E_0(0,0,0,0)$ et $E(x,y,z,ct)$, on définit l'intervalle d'univers par :</p>
    <div class="formula-box">$$s^2=x^2+y^2+z^2-c^2t^2=\\vec r\\,^2-c^2t^2$$</div>
    <p>En substituant les transformations de Lorentz, on vérifie que $s^2=s'^2$ : <strong>l'intervalle d'univers est invariant</strong> par changement de référentiel galiléen, alors que $\\vec r\\,^2$ et $t^2$ pris séparément ne le sont pas.</p>
    <table class="mini-table">
      <tr><th>Signe de $s^2$</th><th>Genre</th><th>Interprétation causale</th></tr>
      <tr><td>$s^2>0$ ($l>c\\tau$)</td><td>genre espace</td><td>aucun signal ne peut relier les deux événements ; pas de lien de causalité possible</td></tr>
      <tr><td>$s^2<0$ ($l<c\\tau$)</td><td>genre temps</td><td>un signal plus lent que la lumière peut les relier ; lien de causalité possible, ordre chronologique conservé</td></tr>
      <tr><td>$s^2=0$ ($l=c\\tau$)</td><td>genre lumière</td><td>seul un signal lumineux peut relier les deux événements ; ils sont sur le même cône de lumière</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Cône de lumière</span>
      L'ensemble des événements tels que $s^2=0$ définit, dans l'espace-temps, un cône appelé cône de lumière. Il sépare, autour de tout événement, le « passé » et le « futur » causalement accessibles (genre temps) de l'« ailleurs » (genre espace), inaccessible sans violer la limite de vitesse c.
    </div>

    <h3>3. Métrique de Minkowski et temps propre</h3>
    <p>Pour deux événements infiniment voisins, la métrique s'écrit $ds^2=dx^2+dy^2+dz^2-c^2dt^2$, de signature $(+,+,+,-)$ : c'est la métrique de Minkowski, dite pseudo-euclidienne car $ds^2$ peut être positif, négatif ou nul. En reliant l'intervalle infinitésimal au référentiel propre d'une particule mobile (où $ds_0^2=-c^2dt_0^2$), on retrouve immédiatement la dilatation du temps :</p>
    <div class="formula-box">$$dt=\\gamma\\,dt_0 \\qquad \\text{avec} \\qquad \\gamma=\\dfrac{1}{\\sqrt{1-v^2/c^2}}$$</div>
    <p>Le <strong>temps propre</strong> est ainsi l'intervalle de temps séparant deux événements se produisant au même endroit dans un même référentiel — c'est le temps le plus court possible entre ces deux événements, quel que soit l'observateur.</p>

    <h3>4. Quadrivecteurs</h3>
    <p>Un quadrivecteur est une grandeur à quatre composantes $\\vec A=(A_1,A_2,A_3,A_4)$ qui se transforme, par changement de référentiel galiléen, exactement comme $(x,y,z,ct)$. Le produit scalaire et la pseudo-norme de deux quadrivecteurs sont invariants par transformation de Lorentz — ce sont les outils centraux pour écrire des lois physiques covariantes.</p>
    <table class="mini-table">
      <tr><th>Quadrivecteur</th><th>Définition</th><th>Pseudo-norme</th></tr>
      <tr><td>Position $\\vec R$</td><td>$(\\vec r,\\,ct)$</td><td>$s^2$, du genre selon le contexte</td></tr>
      <tr><td>Vitesse $\\vec U$</td><td>$\\vec U=d\\vec R/dt_0=(\\gamma\\vec v,\\,\\gamma c)$</td><td>$\\vec U^2=-c^2$ (toujours genre temps)</td></tr>
      <tr><td>Accélération $\\vec\\Gamma$</td><td>$\\vec\\Gamma=d\\vec U/dt_0$</td><td>orthogonale à $\\vec U$ ($\\vec U.\\vec\\Gamma=0$)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Remarque physique</span>
      Même une particule au repos ($\\vec v=\\vec 0$) a une quadrivitesse non nulle, $\\vec U=(\\vec 0,\\,\\gamma c)$ : dans l'espace-temps, le « repos spatial » n'arrête jamais l'écoulement de la composante temporelle. On ne peut jamais être totalement immobile dans l'univers de Minkowski.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Intervalle d'univers $s^2=\\vec r\\,^2-c^2t^2$ : invariant par changement de référentiel galiléen (contrairement à $\\vec r\\,^2$ et $t^2$ séparément)</li>
        <li>Genre espace ($s^2>0$) : pas de causalité possible ; genre temps ($s^2<0$) : causalité possible ; genre lumière ($s^2=0$) : reliés uniquement par la lumière</li>
        <li>Un quadrivecteur se transforme comme $(x,y,z,ct)$ ; sa pseudo-norme est invariante par Lorentz</li>
        <li>Quadrivitesse $\\vec U=(\\gamma\\vec v,\\gamma c)$, de pseudo-norme constante $-c^2$ ; toujours orthogonale à la quadriaccélération</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le signe négatif devant $c^2t^2$ dans la métrique de Minkowski (signature pseudo-euclidienne, pas euclidienne)</li>
        <li>Confondre pseudo-norme (qui peut être négative) et norme euclidienne usuelle (toujours positive)</li>
        <li>Croire qu'une particule au repos a une quadrivitesse nulle : sa composante temporelle $\\gamma c$ ne s'annule jamais</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Deux événements séparés par une distance spatiale l=10 m et un intervalle de temps τ tel que cτ=5 m ont un intervalle d'univers du :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela4e1" value="right"> genre espace (l&gt;cτ)</label>
          <label class="option"><input type="radio" name="rela4e1" value="wrong"> genre temps</label>
          <label class="option"><input type="radio" name="rela4e1" value="wrong"> genre lumière</label>
          <label class="option"><input type="radio" name="rela4e1" value="wrong"> impossible à déterminer</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela4e1','rela4fb1','Correct — l=10 m &gt; cτ=5 m donc s²=l²-c²τ²&gt;0 : genre espace, aucun lien causal possible.','Compare l et cτ : si l&gt;cτ alors s²&gt;0.')">Vérifier</button>
        <div class="feedback" id="rela4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La pseudo-norme de la quadrivitesse U d'une particule quelconque vaut toujours :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela4e2" value="wrong"> 0</label>
          <label class="option"><input type="radio" name="rela4e2" value="wrong"> +c²</label>
          <label class="option"><input type="radio" name="rela4e2" value="right"> −c²</label>
          <label class="option"><input type="radio" name="rela4e2" value="wrong"> dépend de la vitesse v</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela4e2','rela4fb2','Correct — U²=γ²(v²-c²)=-c², un résultat remarquable indépendant de v : la quadrivitesse est toujours du genre temps.','Calcule U²=γ²v²-γ²c² en utilisant γ²(1-v²/c²)=1.')">Vérifier</button>
        <div class="feedback" id="rela4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le temps propre entre deux événements est, par définition, mesuré :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela4e3" value="wrong"> par n'importe quel observateur, peu importe sa position</label>
          <label class="option"><input type="radio" name="rela4e3" value="right"> par une horloge présente aux deux événements, au même endroit</label>
          <label class="option"><input type="radio" name="rela4e3" value="wrong"> uniquement dans le référentiel terrestre</label>
          <label class="option"><input type="radio" name="rela4e3" value="wrong"> uniquement pour des événements du genre espace</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela4e3','rela4fb3','Correct — c\\'est la définition même du temps propre : celui d\\'une horloge unique, immobile par rapport aux deux événements.','Repense à la définition : quel type d\\'horloge donne le temps propre ?')">Vérifier</button>
        <div class="feedback" id="rela4fb3"></div>
      </div>
    </div>
  `
};
RELA_NOVA_KB[relaKey('Espace-temps et quadrivecteurs')] = {
  intro: "Salut, c'est Nova ! On est sur « Espace-temps et quadrivecteurs ». Demande-moi l'intervalle d'univers, le cône de lumière, ou la quadrivitesse.",
  rules: [
    { test:/intervalle.*univers|intervalle.*espace.?temps/i, replies:["L'intervalle d'univers s²=r²-c²t² entre deux événements est invariant par changement de référentiel galiléen — contrairement à r² et t² pris séparément."] },
    { test:/genre espace|genre temps|genre lumi[èe]re|c[oô]ne de lumi[èe]re/i, replies:["Selon le signe de s² : genre espace (s²>0, pas de causalité possible), genre temps (s²<0, causalité possible), genre lumière (s²=0, reliés uniquement par la lumière). Le cône de lumière sépare passé/futur causalement accessibles de l'« ailleurs »."] },
    { test:/quadrivecteur|4.?vecteur/i, replies:["Un quadrivecteur a 4 composantes qui se transforment comme (x,y,z,ct) par changement de référentiel. Sa pseudo-norme (et le produit scalaire de deux quadrivecteurs) sont invariants par Lorentz."] },
    { test:/quadrivitesse/i, replies:["La quadrivitesse U=(γv,γc) est la dérivée du quadrivecteur position par rapport au temps propre. Sa pseudo-norme vaut toujours -c², quelle que soit la vitesse v : elle est toujours du genre temps."] },
    { test:/temps propre/i, replies:["Le temps propre est l'intervalle de temps entre deux événements mesuré par une horloge présente aux deux, au même endroit — c'est toujours le temps le plus court possible entre ces deux événements."] },
    { test:/minkowski|m[ée]trique/i, replies:["La métrique de Minkowski ds²=dx²+dy²+dz²-c²dt² a la signature (+,+,+,-) : pseudo-euclidienne, car ds² peut être positif, négatif ou nul, contrairement à une métrique euclidienne usuelle."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare l et cτ.","Indice niveau 2 : l=10 m, cτ=5 m, donc l>cτ.","Indice niveau 3 : s²=l²-c²τ²>0, genre espace."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : calcule U²=γ²v²-γ²c².","Indice niveau 2 : factorise γ²(v²-c²) et utilise γ²(1-v²/c²)=1.","Indice niveau 3 : U²=-c², constant."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : reviens à la définition du temps propre.","Indice niveau 2 : il faut une horloge unique, présente aux deux événements.","Indice niveau 3 : c'est donc une horloge au même endroit que les deux événements."] }
  ]
};

/* =========================== CHAPITRE 5 — Propagation des ondes et relativité =========================== */
RELA_CHAPTERS[relaKey('Propagation des ondes et relativité')] = {
  objectives: [
    "Définir le quadrivecteur d'onde et montrer que la phase d'une onde est un invariant relativiste",
    "Établir la formule relativiste de l'effet Doppler, dans les cas longitudinal et transversal",
    "Décrire deux applications physiques de l'effet Doppler (astronomie, radar routier)",
    "Établir la formule de l'aberration angulaire de la lumière"
  ],
  prereqs: ["Ondes électromagnétiques et relativité restreinte"],
  bodyHtml: `
    <p>Ce chapitre applique le formalisme des quadrivecteurs à la propagation des ondes lumineuses. On y retrouve deux effets classiques — l'effet Doppler et l'aberration — mais recalculés dans le cadre relativiste, avec des conséquences mesurables en astronomie et en technologie radar.</p>

    <h3>1. Le quadrivecteur d'onde</h3>
    <p>Une onde plane sinusoïdale s'écrit $E=E_0\\cos(\\omega t-\\vec k.\\vec r)$. La phase $\\varphi=\\omega t-\\vec k.\\vec r$ est un invariant relativiste : c'est le produit scalaire (au signe près) de deux quadrivecteurs, le quadrivecteur position $\\vec R=(\\vec r,ct)$ et le <strong>quadrivecteur d'onde</strong> :</p>
    <div class="formula-box">$$\\vec K=\\left(\\vec k,\\dfrac{\\omega}{c}\\right)$$</div>
    <p>Se transformant comme $\\vec R$ sous les transformations de Lorentz, $\\vec K$ permet de calculer directement comment fréquence et direction de propagation changent d'un référentiel à l'autre.</p>

    <h3>2. Effet Doppler relativiste</h3>
    <p>Pour une source à l'origine de $R$ observée depuis $R'$ (en translation $u$ le long de $Ox$), avec $\\theta$ l'angle entre la direction d'émission et $Ox$, les transformations du quadrivecteur d'onde donnent :</p>
    <div class="formula-box">$$\\nu'=\\gamma\\,\\nu\\,(1-\\beta\\cos\\theta)$$</div>
    <table class="mini-table">
      <tr><th>Configuration</th><th>Formule</th><th>Effet</th></tr>
      <tr><td>Longitudinal, source s'éloignant ($\\theta=0$)</td><td>$\\nu'=\\nu\\sqrt{\\dfrac{1-\\beta}{1+\\beta}}$</td><td>$\\nu'<\\nu$ : décalage vers le rouge</td></tr>
      <tr><td>Longitudinal, source se rapprochant</td><td>$\\nu'=\\nu\\sqrt{\\dfrac{1+\\beta}{1-\\beta}}$</td><td>$\\nu'>\\nu$ : décalage vers le bleu</td></tr>
      <tr><td>Transversal ($\\theta=\\pi/2$)</td><td>$\\nu'=\\gamma\\,\\nu$</td><td>effet purement relativiste, sans analogue classique</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Remarque</span>
      L'effet Doppler relativiste ne distingue pas le cas « source en mouvement, récepteur au repos » du cas symétrique inverse — seule la vitesse relative compte, conformément au principe de relativité.
    </div>

    <h3>3. Applications de l'effet Doppler</h3>
    <p><strong>a) Vitesse radiale des étoiles.</strong> La comparaison entre le spectre reçu d'une étoile et le spectre de référence obtenu en laboratoire révèle un décalage $\\Delta\\lambda=\\lambda-\\lambda'$. Pour $u\\ll c$ :</p>
    <div class="formula-box">$$\\dfrac{\\Delta\\lambda}{\\lambda}=\\dfrac{v_r}{c}$$</div>
    <p>où $v_r$ est la vitesse radiale de l'étoile. Un décalage vers le rouge ($\\Delta\\lambda>0$) signale un éloignement — c'est l'un des fondements observationnels de l'expansion de l'univers.</p>
    <p><strong>b) Radars de contrôle routier.</strong> Un radar émet à $\\nu_0$ ; le véhicule reçoit et réémet à une fréquence décalée deux fois (aller puis retour), d'où pour $v\\ll c$ :</p>
    <div class="formula-box">$$\\dfrac{\\Delta\\nu}{\\nu_0}=\\dfrac{2v}{c}$$</div>
    <p>La mesure du décalage $\\Delta\\nu$ par le radar donne directement la vitesse $v$ du véhicule.</p>

    <h3>4. Aberration angulaire</h3>
    <p>Un signal lumineux émis dans une direction faisant l'angle $\\theta$ avec $Ox$ dans $R$ est observé, dans $R'$ en translation $u$ selon $Ox$, sous un angle différent $\\theta'$ :</p>
    <div class="formula-box">$$\\tan\\theta'=\\dfrac{\\sin\\theta}{\\gamma(\\cos\\theta+\\beta)}$$</div>
    <div class="key-point">
      <span class="eyebrow">Application historique</span>
      Ce phénomène, observé dès 1725 par Bradley sur les étoiles, oblige les astronomes à corriger la direction apparente des astres du fait du mouvement orbital de la Terre autour du Soleil : les étoiles ne sont jamais observées exactement dans leur direction réelle.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Quadrivecteur d'onde $\\vec K=(\\vec k,\\omega/c)$, se transformant comme $\\vec R=(\\vec r,ct)$ ; la phase de l'onde est un invariant relativiste</li>
        <li>Effet Doppler relativiste : $\\nu'=\\gamma\\nu(1-\\beta\\cos\\theta)$ ; longitudinal (rouge si éloignement, bleu si rapprochement) ou transversal ($\\nu'=\\gamma\\nu$, sans équivalent classique)</li>
        <li>Applications : mesure de la vitesse radiale des étoiles (Δλ/λ=vr/c), radars routiers (Δν/ν0=2v/c)</li>
        <li>Aberration angulaire : $\\tan\\theta'=\\sin\\theta/[\\gamma(\\cos\\theta+\\beta)]$ — la direction apparente d'une source diffère de sa direction réelle</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le facteur $\\gamma$ dans l'effet Doppler transversal : sans lui, on retomberait sur l'absence d'effet en mécanique classique — c'est un effet purement relativiste</li>
        <li>Confondre décalage vers le rouge (source qui s'éloigne, ν' plus petite) et décalage vers le bleu (source qui se rapproche, ν' plus grande)</li>
        <li>Oublier, dans l'exemple du radar routier, qu'il y a DEUX décalages Doppler successifs (émission puis réémission par le véhicule), d'où le facteur 2 dans Δν/ν0=2v/c</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une source lumineuse s'éloigne du récepteur. La fréquence reçue ν' par rapport à la fréquence émise ν vérifie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela5e1" value="right"> ν' &lt; ν (décalage vers le rouge)</label>
          <label class="option"><input type="radio" name="rela5e1" value="wrong"> ν' &gt; ν (décalage vers le bleu)</label>
          <label class="option"><input type="radio" name="rela5e1" value="wrong"> ν' = ν (pas d'effet)</label>
          <label class="option"><input type="radio" name="rela5e1" value="wrong"> ν' = 0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela5e1','rela5fb1','Correct — quand la source s\\'éloigne, la fréquence reçue diminue : c\\'est le décalage vers le rouge.','Pense à une sirène qui s\\'éloigne : le son perçu est-il plus aigu ou plus grave ?')">Vérifier</button>
        <div class="feedback" id="rela5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'effet Doppler transversal (θ=π/2), purement relativiste, s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela5e2" value="wrong"> ν'=ν (aucun effet)</label>
          <label class="option"><input type="radio" name="rela5e2" value="right"> ν'=γν</label>
          <label class="option"><input type="radio" name="rela5e2" value="wrong"> ν'=ν/γ</label>
          <label class="option"><input type="radio" name="rela5e2" value="wrong"> ν'=2ν</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela5e2','rela5fb2','Correct — ν\\'=γν(1-β·0)=γν : cet effet n\\'existe pas en mécanique classique, c\\'est une signature pure de la relativité.','Remplace θ=π/2 dans ν\\'=γν(1-βcosθ) : que devient cosθ ?')">Vérifier</button>
        <div class="feedback" id="rela5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans un contrôle radar routier, le décalage de fréquence Δν total mesuré par le radar résulte de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela5e3" value="wrong"> un seul effet Doppler (émission uniquement)</label>
          <label class="option"><input type="radio" name="rela5e3" value="right"> deux effets Doppler successifs (émission puis réémission par le véhicule)</label>
          <label class="option"><input type="radio" name="rela5e3" value="wrong"> l'aberration angulaire uniquement</label>
          <label class="option"><input type="radio" name="rela5e3" value="wrong"> aucun effet relativiste, c'est purement classique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela5e3','rela5fb3','Correct — d\\'où le facteur 2 dans Δν/ν0=2v/c : le véhicule reçoit d\\'abord l\\'onde décalée, puis la réémet, décalée une seconde fois.','Le véhicule reçoit l\\'onde du radar (1er décalage) puis la renvoie (2nd décalage) : combien de décalages au total ?')">Vérifier</button>
        <div class="feedback" id="rela5fb3"></div>
      </div>
    </div>
  `
};
RELA_NOVA_KB[relaKey('Propagation des ondes et relativité')] = {
  intro: "Salut, c'est Nova ! On est sur « Propagation des ondes et relativité ». Demande-moi l'effet Doppler, l'aberration angulaire, ou une application (étoiles, radar).",
  rules: [
    { test:/quadrivecteur.*onde/i, replies:["Le quadrivecteur d'onde K=(k,ω/c) se transforme comme le quadrivecteur position R=(r,ct). La phase d'une onde, ωt-k.r, est un invariant relativiste construit à partir de leur produit scalaire."] },
    { test:/doppler/i, replies:["L'effet Doppler relativiste : ν'=γν(1-βcosθ). Longitudinal (θ=0 ou π) : décalage rouge si éloignement, bleu si rapprochement. Transversal (θ=π/2) : ν'=γν, un effet purement relativiste sans équivalent classique."] },
    { test:/rouge|bleu|d[ée]calage/i, replies:["Décalage vers le rouge (ν' < ν, λ' > λ) : la source s'éloigne. Décalage vers le bleu (ν' > ν, λ' < λ) : la source se rapproche. C'est la base de la mesure des vitesses radiales des étoiles."] },
    { test:/[ée]toile|astronomie|expansion/i, replies:["Pour une étoile, on compare le spectre reçu au spectre de référence en labo : Δλ/λ=vr/c. Un décalage vers le rouge indique un éloignement — un argument observationnel majeur pour l'expansion de l'univers."] },
    { test:/radar/i, replies:["Pour un radar routier, il y a deux effets Doppler successifs (émission vers le véhicule, puis réémission vers le radar), d'où Δν/ν0=2v/c pour v≪c : le décalage mesuré donne directement la vitesse du véhicule."] },
    { test:/aberration/i, replies:["L'aberration angulaire : tanθ'=sinθ/[γ(cosθ+β)]. La direction apparente d'une source lumineuse diffère de sa direction réelle à cause du mouvement de l'observateur — observée dès 1725 par Bradley sur les étoiles."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à l'analogie sonore d'une source qui s'éloigne.","Indice niveau 2 : la fréquence perçue diminue.","Indice niveau 3 : ν'<ν, décalage vers le rouge."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : remplace θ=π/2 dans la formule générale.","Indice niveau 2 : cos(π/2)=0.","Indice niveau 3 : ν'=γν."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : combien de fois l'onde change-t-elle de « émetteur-récepteur » ?","Indice niveau 2 : radar → véhicule (1er décalage), véhicule → radar (2nd décalage).","Indice niveau 3 : deux effets Doppler, d'où le facteur 2."] }
  ]
};

/* =========================== CHAPITRE 6 — Dynamique relativiste =========================== */
RELA_CHAPTERS[relaKey('Dynamique relativiste')] = {
  objectives: [
    "Définir la quantité de mouvement relativiste et l'équation fondamentale de la dynamique relativiste",
    "Définir l'énergie relativiste, l'énergie de masse et l'énergie cinétique relativiste",
    "Construire le quadrivecteur énergie-impulsion et la relation E²=(m0c²)²+(pc)²",
    "Appliquer les lois de conservation aux collisions élastiques et inélastiques de particules"
  ],
  prereqs: ["Ondes électromagnétiques et relativité restreinte"],
  bodyHtml: `
    <p>La dynamique relativiste généralise les notions de quantité de mouvement, de force et d'énergie afin qu'elles restent compatibles avec les postulats d'Einstein — en particulier avec le fait qu'aucune vitesse ne peut dépasser $c$. Ce chapitre est central pour la physique des particules, des collisions nucléaires et de l'énergie de masse.</p>

    <h3>1. Quantité de mouvement relativiste</h3>
    <p>La définition classique $\\vec p=m_0\\vec v$ n'est plus conservée dans tous les référentiels galiléens lors d'un choc. On la remplace par la dérivée de la position par rapport au <strong>temps propre</strong> de la particule :</p>
    <div class="formula-box">$$\\vec p=m_0\\dfrac{d\\vec r}{dt_0}=\\gamma m_0\\vec v=\\dfrac{m_0\\vec v}{\\sqrt{1-v^2/c^2}}$$</div>
    <p>Pour $v\\ll c$, on retrouve $\\vec p\\approx m_0\\vec v$ ; avec cette définition, la conservation de la quantité de mouvement totale est valable dans <strong>tous</strong> les référentiels galiléens.</p>

    <h3>2. Équation fondamentale de la dynamique relativiste</h3>
    <div class="formula-box">$$\\vec f=\\dfrac{d\\vec p}{dt}=\\dfrac{m_0}{\\left(1-\\dfrac{v^2}{c^2}\\right)^{3/2}}\\left[\\vec a\\left(1-\\dfrac{v^2}{c^2}\\right)+\\dfrac{\\vec v.\\vec a}{c^2}\\vec v\\right]$$</div>
    <div class="key-point">
      <span class="eyebrow">Différence essentielle avec le cas classique</span>
      Contrairement à la mécanique newtonienne, la force $\\vec f$ et l'accélération $\\vec a$ ne sont, en général, plus colinéaires en relativité restreinte.
    </div>

    <h3>3. Énergie relativiste</h3>
    <p>En calculant la puissance $P=\\vec f.\\vec v=dE/dt$ développée par la force, on identifie l'énergie relativiste de la particule :</p>
    <div class="formula-box">$$E=\\gamma m_0c^2=\\dfrac{m_0c^2}{\\sqrt{1-v^2/c^2}}$$</div>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Formule</th><th>Signification</th></tr>
      <tr><td>Énergie de masse $E_0$</td><td>$E_0=m_0c^2$</td><td>énergie propre à la masse, même au repos ($v=0$)</td></tr>
      <tr><td>Énergie cinétique relativiste $E_c$</td><td>$E_c=E-E_0=(\\gamma-1)m_0c^2$</td><td>tend vers $\\frac12 m_0v^2$ (formule classique) quand $v\\ll c$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Équivalence masse-énergie</span>
      $E_0=m_0c^2$ implique qu'une variation de masse $\\Delta m$ libère (ou requiert) une énergie $\\Delta E=\\Delta m\\,c^2$ : c'est le principe de l'énergie nucléaire. Un défaut de masse d'un milligramme correspond ainsi à $\\Delta E\\approx 9\\times10^{10}\\,$J.
    </div>

    <h3>4. Quadrivecteur énergie-impulsion</h3>
    <p>On associe à $\\vec p$ une quatrième composante $E/c$, formant le <strong>quadrivecteur énergie-impulsion</strong> $\\vec P=(\\vec p,E/c)$. Sa pseudo-norme, invariante, donne la relation masse-énergie-impulsion fondamentale :</p>
    <div class="formula-box">$$E^2=(m_0c^2)^2+(pc)^2$$</div>
    <p>Pour une particule de masse nulle (photon), $E_0=0$ mais $E=pc=h\\nu\\ne 0$ : de telles particules se déplacent nécessairement à $c$.</p>
    <p>Le <strong>quadrivecteur force</strong> $\\vec F=d\\vec P/dt_0=\\left(\\gamma\\vec f,\\dfrac{\\gamma}{c}\\vec f.\\vec v\\right)$ complète le formalisme, en donnant les lois de transformation de la force tridimensionnelle par changement de référentiel galiléen.</p>

    <h3>5. Collisions de particules</h3>
    <p>On distingue le <strong>choc élastique</strong> (mêmes particules avant et après, énergie cinétique totale conservée) et le <strong>choc inélastique</strong> (nature des particules modifiée, comme dans les réactions nucléaires). Trois lois de conservation gouvernent tout problème de collision :</p>
    <ul>
      <li>conservation de la quantité de mouvement totale ;</li>
      <li>conservation de l'énergie totale relativiste ;</li>
      <li>conservation du carré scalaire (pseudo-norme) du quadrivecteur énergie-impulsion total lors d'un changement de référentiel.</li>
    </ul>
    <p>On utilise deux référentiels privilégiés : le <strong>référentiel de laboratoire</strong> $R_L$ (celui de l'expérimentateur) et le <strong>référentiel du centre de masse</strong> $R_B$ (où la quantité de mouvement totale est nulle), reliés par la vitesse $\\vec u=\\vec p\\,c^2/E$.</p>
    <div class="key-point">
      <span class="eyebrow">Bilan énergétique d'une réaction</span>
      Pour $A_1+A_2\\to A_3+A_4$, le bilan $Q=[(m_1+m_2)-(m_3+m_4)]c^2$ mesure la variation d'énergie cinétique totale : $Q>0$ (exoénergétique, défaut de masse) ou $Q<0$ (endoénergétique, il faut fournir une énergie cinétique minimale — le <strong>seuil de réaction</strong> — à la particule incidente).
    </div>
    <p>Un cas particulier important : la diffusion d'un photon sur un électron initialement au repos (<strong>effet Compton</strong>) conduit, par conservation du quadrivecteur énergie-impulsion, à la variation de longueur d'onde du photon diffusé :</p>
    <div class="formula-box">$$\\lambda-\\lambda_0=\\dfrac{h}{m_ec}(1-\\cos\\theta)$$</div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Quantité de mouvement relativiste : $\\vec p=\\gamma m_0\\vec v$ (conservée dans tous les référentiels galiléens)</li>
        <li>Énergie relativiste $E=\\gamma m_0c^2$, énergie de masse $E_0=m_0c^2$, énergie cinétique $E_c=(\\gamma-1)m_0c^2\\to\\frac12 m_0v^2$ pour $v\\ll c$</li>
        <li>Relation fondamentale : $E^2=(m_0c^2)^2+(pc)^2$ ; pour un photon, $E=pc=h\\nu$</li>
        <li>Lois de conservation en collision : quantité de mouvement, énergie totale, pseudo-norme du quadrivecteur énergie-impulsion</li>
        <li>Bilan de réaction $Q=[(m_1+m_2)-(m_3+m_4)]c^2$ ; effet Compton : $\\lambda-\\lambda_0=(h/m_ec)(1-\\cos\\theta)$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser $\\vec p=m_0\\vec v$ (formule classique) dans un problème où les vitesses sont relativistes — il faut le facteur $\\gamma$</li>
        <li>Oublier que l'énergie cinétique relativiste n'est PAS $\\frac12 m_0v^2$ : cette dernière n'est qu'une approximation valable pour $v\\ll c$</li>
        <li>Confondre le référentiel du laboratoire ($R_L$) et le référentiel du centre de masse ($R_B$) dans un problème de collision — bien préciser dans quel référentiel chaque grandeur est exprimée</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'énergie de masse (énergie au repos) d'une particule de masse m0 est donnée par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela6e1" value="wrong"> E0 = m0v²</label>
          <label class="option"><input type="radio" name="rela6e1" value="right"> E0 = m0c²</label>
          <label class="option"><input type="radio" name="rela6e1" value="wrong"> E0 = ½m0v²</label>
          <label class="option"><input type="radio" name="rela6e1" value="wrong"> E0 = m0c</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela6e1','rela6fb1','Correct — E0=m0c² est l\\'énergie de masse, valable même pour une particule au repos (v=0).','Repars de E=γm0c² et pose v=0 : que devient γ ?')">Vérifier</button>
        <div class="feedback" id="rela6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour une particule de masse nulle (comme le photon), la relation E²=(m0c²)²+(pc)² se réduit à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela6e2" value="wrong"> E = m0c²</label>
          <label class="option"><input type="radio" name="rela6e2" value="right"> E = pc</label>
          <label class="option"><input type="radio" name="rela6e2" value="wrong"> E = 0</label>
          <label class="option"><input type="radio" name="rela6e2" value="wrong"> E = p²c</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela6e2','rela6fb2','Correct — pour m0=0, E²=(pc)² donc E=pc=hν : c\\'est le cas du photon.','Remplace m0=0 dans E²=(m0c²)²+(pc)² : que reste-t-il ?')">Vérifier</button>
        <div class="feedback" id="rela6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans une réaction A1+A2→A3+A4 avec Q=[(m1+m2)-(m3+m4)]c² négatif, la réaction est dite :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela6e3" value="wrong"> exoénergétique, avec libération d'énergie cinétique</label>
          <label class="option"><input type="radio" name="rela6e3" value="right"> endoénergétique, nécessitant une énergie cinétique seuil</label>
          <label class="option"><input type="radio" name="rela6e3" value="wrong"> élastique</label>
          <label class="option"><input type="radio" name="rela6e3" value="wrong"> impossible dans tous les cas</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela6e3','rela6fb3','Correct — Q&lt;0 signifie qu\\'il faut fournir de l\\'énergie cinétique (au moins le seuil de réaction) pour produire les masses m3 et m4.','Q<0 signifie-t-il qu\\'on gagne ou qu\\'on perd de l\\'énergie cinétique lors de la réaction ?')">Vérifier</button>
        <div class="feedback" id="rela6fb3"></div>
      </div>
    </div>
  `
};
RELA_NOVA_KB[relaKey('Dynamique relativiste')] = {
  intro: "Salut, c'est Nova ! On est sur « Dynamique relativiste ». Demande-moi la quantité de mouvement relativiste, l'énergie de masse, le quadrivecteur énergie-impulsion, ou les collisions.",
  rules: [
    { test:/quantit[ée].*mouvement|impulsion/i, replies:["La quantité de mouvement relativiste est p=γm0v (et non m0v comme en mécanique classique) : c'est cette définition qui assure la conservation de p dans tous les référentiels galiléens."] },
    { test:/[ée]nergie.*masse|e\s*=\s*mc|repos/i, replies:["L'énergie de masse E0=m0c² est l'énergie que possède une particule même au repos. Elle est à la base de l'énergie nucléaire : une variation de masse Δm libère une énergie ΔE=Δmc²."] },
    { test:/[ée]nergie cin[ée]tique/i, replies:["L'énergie cinétique relativiste Ec=(γ-1)m0c² tend vers ½m0v² (formule classique) uniquement quand v≪c. Pour des vitesses proches de c, elle diverge."] },
    { test:/quadrivecteur.*[ée]nergie|e\s*2\s*=.*p\s*c/i, replies:["Le quadrivecteur énergie-impulsion P=(p,E/c) a pour pseudo-norme invariante E²=(m0c²)²+(pc)². Pour un photon (m0=0), cela donne E=pc=hν."] },
    { test:/collision|choc|[ée]lastique|in[ée]lastique/i, replies:["Un choc élastique conserve l'énergie cinétique totale (mêmes particules avant/après). Un choc inélastique change la nature des particules (réaction nucléaire). Dans les deux cas : conservation de p, de E, et de la pseudo-norme du quadrivecteur énergie-impulsion."] },
    { test:/compton/i, replies:["L'effet Compton est la diffusion d'un photon sur un électron au repos. Le photon perd de l'énergie : λ-λ0=(h/mec)(1-cosθ), où θ est l'angle de diffusion."] },
    { test:/seuil|bilan.*r[ée]action/i, replies:["Le bilan Q=[(m1+m2)-(m3+m4)]c² : Q>0 exoénergétique (libère de l'énergie cinétique), Q<0 endoénergétique (il faut fournir une énergie cinétique seuil à la particule incidente)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repars de E=γm0c² avec v=0.","Indice niveau 2 : γ=1 quand v=0.","Indice niveau 3 : E0=m0c²."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : remplace m0=0 dans la relation générale.","Indice niveau 2 : E²=(m0c²)²+(pc)² devient E²=(pc)².","Indice niveau 3 : E=pc."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : Q est la variation d'énergie cinétique totale de la réaction.","Indice niveau 2 : Q<0 signifie une perte d'énergie cinétique.","Indice niveau 3 : il faut donc fournir de l'énergie — réaction endoénergétique."] }
  ]
};

/* =========================== CHAPITRE 7 — Électromagnétisme relativiste =========================== */
RELA_CHAPTERS[relaKey('Électromagnétisme relativiste')] = {
  objectives: [
    "Rappeler les équations de Maxwell et leur signification physique",
    "Définir le quadrivecteur densité de courant et son lien avec la conservation de la charge",
    "Établir les lois de transformation des champs électrique et magnétique par changement de référentiel galiléen",
    "Montrer qu'une charge en mouvement crée un champ magnétique, absent dans son référentiel propre"
  ],
  prereqs: ["Ondes électromagnétiques et relativité restreinte","Électronique"],
  bodyHtml: `
    <p>Ce dernier chapitre boucle la boucle : c'est en cherchant à rendre les équations de Maxwell compatibles avec le principe de relativité qu'Einstein a été conduit à ses deux postulats. On vérifie ici explicitement cette compatibilité, et l'on découvre que champ électrique et champ magnétique ne sont que deux aspects d'une même réalité, le champ électromagnétique, qui se mélangent par changement de référentiel.</p>

    <h3>1. Rappel des équations de Maxwell</h3>
    <div class="formula-box">$$\\mathrm{div}\\vec D=\\rho_L \\qquad \\mathrm{div}\\vec B=0 \\qquad \\overrightarrow{\\mathrm{rot}}\\vec E=-\\dfrac{\\partial\\vec B}{\\partial t} \\qquad \\overrightarrow{\\mathrm{rot}}\\vec H=\\vec j_L+\\dfrac{\\partial\\vec D}{\\partial t}$$</div>
    <table class="mini-table">
      <tr><th>Équation</th><th>Signification physique</th></tr>
      <tr><td>$\\mathrm{div}\\vec D=\\rho_L$</td><td>le flux de $\\vec D$ à travers une surface fermée égale la charge libre contenue (théorème de Gauss)</td></tr>
      <tr><td>$\\mathrm{div}\\vec B=0$</td><td>le flux de $\\vec B$ à travers toute surface fermée est nul : pas de charge magnétique isolée</td></tr>
      <tr><td>$\\overrightarrow{\\mathrm{rot}}\\vec E=-\\partial\\vec B/\\partial t$</td><td>induction électromagnétique : une f.é.m. apparaît si le flux de $\\vec B$ varie</td></tr>
      <tr><td>$\\overrightarrow{\\mathrm{rot}}\\vec H=\\vec j_L+\\partial\\vec D/\\partial t$</td><td>théorème d'Ampère généralisé (courants de conduction + de déplacement)</td></tr>
    </table>
    <p>Dans le vide, en combinant ces équations, on obtient les équations de propagation $\\square\\vec E=\\vec 0$ et $\\square\\vec B=\\vec 0$ (en l'absence de charges et de courants), où $\\square=\\partial^2/\\partial x^2-\\frac{1}{c^2}\\partial^2/\\partial t^2$ est l'opérateur d'Alembertien : les champs se propagent en ondes planes transversales à la vitesse $c$, avec $\\vec E\\perp\\vec B\\perp\\vec k$.</p>

    <h3>2. Quadrivecteur densité de courant</h3>
    <p>Le vecteur densité de courant $\\vec j=\\rho\\vec v$ s'incorpore, avec la densité de charge, dans le <strong>quadrivecteur densité de courant</strong> :</p>
    <div class="formula-box">$$\\vec J=(\\vec j,\\rho c)$$</div>
    <p>qui se transforme comme le quadrivecteur position sous les transformations de Lorentz. Sa divergence à quatre dimensions redonne l'équation de conservation de la charge électrique, $\\mathrm{div}\\,\\vec j+\\partial\\rho/\\partial t=0$ — la charge électrique elle-même étant un invariant relativiste (indépendant du référentiel).</p>
    <div class="key-point">
      <span class="eyebrow">Conséquence immédiate</span>
      Une charge au repos dans $R$ (donc $\\vec j=\\vec 0$) possède, vue depuis un autre référentiel $R'$ en mouvement, une densité de courant $\\vec j\\,'\\ne\\vec 0$ : elle y crée donc un champ magnétique, absent dans son référentiel propre.
    </div>

    <h3>3. Transformation des champs $\\vec E$ et $\\vec B$</h3>
    <p>En exprimant que la force de Lorentz sur une particule chargée se transforme comme n'importe quelle force (chapitre 6), on établit les lois de transformation du champ électromagnétique entre $R$ et $R'$ (en translation $u$ selon $Ox$) :</p>
    <div class="formula-box">$$E_x'=E_x \\quad E_y'=\\gamma(E_y-uB_z) \\quad E_z'=\\gamma(E_z+uB_y)$$
    $$B_x'=B_x \\quad B_y'=\\gamma\\left(B_y+\\dfrac{u}{c^2}E_z\\right) \\quad B_z'=\\gamma\\left(B_z-\\dfrac{u}{c^2}E_y\\right)$$</div>
    <div class="key-point">
      <span class="eyebrow">Un seul champ, deux visages</span>
      Ces formules montrent que $\\vec E$ et $\\vec B$ ne sont pas des entités indépendantes : ils se mélangent l'un dans l'autre selon le référentiel d'observation. Ce qui apparaît comme un champ purement électrique dans un référentiel peut comporter une composante magnétique dans un autre — le champ électromagnétique est une entité unique, le vrai invariant relativiste étant le quadrivecteur (ou tenseur) du champ.
    </div>

    <h3>4. Application : champ créé par une charge en mouvement</h3>
    <p>Une charge $q$ au repos à l'origine de $R'$ crée dans ce référentiel un champ purement électrostatique, $\\vec E\\,'=\\dfrac{q}{4\\pi\\varepsilon_0}\\dfrac{\\vec r\\,'}{r'^3}$, $\\vec B\\,'=\\vec 0$. Vue depuis $R$, où la charge se déplace à la vitesse constante $u$, elle crée à la fois un champ électrique (légèrement modifié) et un champ magnétique :</p>
    <div class="formula-box">$$\\vec B=\\dfrac{1}{c^2}\\vec u\\wedge\\vec E$$</div>
    <div class="key-point">
      <span class="eyebrow">Portée physique</span>
      Ce résultat explique, dans le cadre relativiste, pourquoi un courant électrique continu — c'est-à-dire des charges en mouvement — est une source de champ magnétique : ce qu'on observait empiriquement depuis Ørsted et Ampère trouve ici son fondement dans la structure même de l'espace-temps.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Équations de Maxwell : théorème de Gauss électrique, absence de charge magnétique, induction (Faraday), théorème d'Ampère généralisé</li>
        <li>Quadrivecteur densité de courant $\\vec J=(\\vec j,\\rho c)$ ; la charge électrique est un invariant relativiste</li>
        <li>Transformations des champs : $E_x'=E_x$, $E_y'=\\gamma(E_y-uB_z)$... et de même pour B — E et B se mélangent selon le référentiel</li>
        <li>Une charge en mouvement crée un champ magnétique $\\vec B=(1/c^2)\\vec u\\wedge\\vec E$, absent dans son référentiel propre</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que $\\vec E$ et $\\vec B$ sont deux champs totalement indépendants : ce sont deux facettes d'une même entité, le champ électromagnétique, qui se transforment l'une dans l'autre</li>
        <li>Oublier que les composantes parallèles au mouvement ($E_x$, $B_x$) restent inchangées ; seules les composantes transverses se transforment</li>
        <li>Confondre l'invariance de la charge électrique (toujours vraie) avec celle du champ électrique ou magnétique (jamais invariants séparément)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">D'après les équations de Maxwell, le flux du champ magnétique B à travers toute surface fermée vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela7e1" value="wrong"> la charge magnétique contenue</label>
          <label class="option"><input type="radio" name="rela7e1" value="right"> toujours zéro</label>
          <label class="option"><input type="radio" name="rela7e1" value="wrong"> proportionnel au courant</label>
          <label class="option"><input type="radio" name="rela7e1" value="wrong"> égal au flux électrique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela7e1','rela7fb1','Correct — div B=0 traduit l\\'absence de charge (monopôle) magnétique isolée.','Repars de l\\'équation div B=0 et applique le théorème de Green-Ostrogradski.')">Vérifier</button>
        <div class="feedback" id="rela7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une charge purement électrostatique dans son référentiel propre R' (B'=0) apparaît, vue d'un référentiel R par rapport auquel elle est en mouvement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela7e2" value="wrong"> toujours sans champ magnétique (B=0)</label>
          <label class="option"><input type="radio" name="rela7e2" value="right"> avec un champ magnétique non nul en général</label>
          <label class="option"><input type="radio" name="rela7e2" value="wrong"> sans champ électrique</label>
          <label class="option"><input type="radio" name="rela7e2" value="wrong"> avec une charge modifiée</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela7e2','rela7fb2','Correct — B=(1/c²)u∧E : le mouvement relatif de la charge crée un champ magnétique dans R.','Utilise B=(1/c²)u∧E : ce produit vectoriel est-il nul si u et E sont non nuls et non colinéaires ?')">Vérifier</button>
        <div class="feedback" id="rela7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans les lois de transformation des champs, la composante Ex (parallèle au mouvement) vérifie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="rela7e3" value="right"> E'x = Ex (inchangée)</label>
          <label class="option"><input type="radio" name="rela7e3" value="wrong"> E'x = γEx</label>
          <label class="option"><input type="radio" name="rela7e3" value="wrong"> E'x = Ex/γ</label>
          <label class="option"><input type="radio" name="rela7e3" value="wrong"> E'x = 0 toujours</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('rela7e3','rela7fb3','Correct — seules les composantes transverses (Ey, Ez) se transforment ; la composante parallèle au mouvement reste inchangée.','Compare avec les transformations de Lorentz classiques : les coordonnées transverses (y,z) changent-elles ?')">Vérifier</button>
        <div class="feedback" id="rela7fb3"></div>
      </div>
    </div>
  `
};
RELA_NOVA_KB[relaKey('Électromagnétisme relativiste')] = {
  intro: "Salut, c'est Nova ! On est sur « Électromagnétisme relativiste », le dernier chapitre du module. Demande-moi les équations de Maxwell, le quadrivecteur densité de courant, ou la transformation des champs E et B.",
  rules: [
    { test:/maxwell/i, replies:["Les 4 équations de Maxwell : div D=ρL (Gauss), div B=0 (pas de monopôle magnétique), rot E=-∂B/∂t (induction de Faraday), rot H=jL+∂D/∂t (Ampère généralisé avec courant de déplacement)."] },
    { test:/quadrivecteur.*courant|densit[ée].*courant/i, replies:["Le quadrivecteur densité de courant J=(j,ρc) se transforme comme (r,ct). Sa divergence à 4 dimensions redonne la conservation de la charge : div j + ∂ρ/∂t = 0. La charge électrique elle-même est un invariant relativiste."] },
    { test:/transformation.*champ|e\s*et\s*b|champ.*[ée]lectrique.*magn[ée]tique/i, replies:["Les champs E et B se transforment l'un dans l'autre par changement de référentiel : E'x=Ex (inchangé), E'y=γ(Ey-uBz), E'z=γ(Ez+uBy), et de même pour B. Un seul champ électromagnétique, deux « visages » selon l'observateur."] },
    { test:/charge.*mouvement|champ magn[ée]tique.*cr[ée][ée]/i, replies:["Une charge en mouvement crée un champ magnétique B=(1/c²)u∧E, absent dans son référentiel propre où elle est au repos. C'est le fondement relativiste du lien entre courant électrique et champ magnétique."] },
    { test:/onde.*[ée]lectromagn[ée]tique|propagation.*champ/i, replies:["Dans le vide sans charge ni courant, E et B vérifient l'équation de propagation □E=0, □B=0 : ce sont des ondes planes transversales (E⊥B⊥k) se propageant à la vitesse c."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repars de l'équation div B=0.","Indice niveau 2 : le théorème de Green-Ostrogradski relie divergence et flux.","Indice niveau 3 : le flux de B à travers une surface fermée est donc toujours nul."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise B=(1/c²)u∧E.","Indice niveau 2 : ce produit vectoriel est nul seulement si u et E sont colinéaires ou l'un des deux nul.","Indice niveau 3 : en général B≠0, un champ magnétique apparaît."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare avec les coordonnées spatiales x,y,z dans Lorentz.","Indice niveau 2 : la coordonnée parallèle au mouvement (x) change, mais qu'en est-il du champ Ex ?","Indice niveau 3 : Ex reste inchangée — seules les composantes transverses se transforment."] }
  ]
};

/* fusionne le module Relativité restreinte dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, RELA_CHAPTERS);
Object.assign(NOVA_KB, RELA_NOVA_KB);