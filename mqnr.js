/* =====================================================================
   CHUNK « mqnr » — registre MQNR_CHAPTERS / MQNR_NOVA_KB
   Matière(s) : Physique|Mécanique quantique non relativiste
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   MQNR_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — MÉCANIQUE QUANTIQUE NON RELATIVISTE (L3 Physique Fondamentale)
   9 chapitres : formalisme de Dirac, postulats formels, oscillateur harmonique par la
   méthode algébrique, théorie générale du moment cinétique, moment cinétique orbital et
   harmoniques sphériques, spin et addition de moments cinétiques, atome d'hydrogène,
   théorie des perturbations stationnaires, méthode variationnelle et perturbations
   dépendantes du temps — conforme aux maquettes LMD de L3 Physique Fondamentale. Ce
   cours prolonge directement le cours de L2 « Introduction à la mécanique quantique »
   (fonction d'onde, équation de Schrödinger, systèmes modèles, postulats informels) en
   adoptant le formalisme abstrait de Dirac et en traitant les problèmes à trois
   dimensions (moment cinétique, atome d'hydrogène) restés hors de portée en L2.
   Rédigé sur le même modèle que les autres modules (objectives/prereqs/bodyHtml/
   extraHtml + registre NOVA_KB). Références de fond : J.-L. Basdevant, J. Dalibard,
   M. Joffre, Mécanique quantique (Éd. de l'École Polytechnique) ; C. Cohen-Tannoudji,
   B. Diu, F. Laloë, Mécanique quantique (Hermann) ; programmes L3 Paris-Saclay et
   Grenoble Alpes.
   ===================================================================================== */
const MQNR_MATIERE = 'Mécanique quantique non relativiste';
function mqnrKey(chapterTitle){ return `Physique|${MQNR_MATIERE}|${chapterTitle}`; }
const MQNR_CHAPTERS = {};
const MQNR_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
MQNR_CHAPTERS[mqnrKey("Formalisme de Dirac : espace des états, bras, kets et opérateurs")] = {
  objectives: [
    "Passer de la fonction d'onde ψ(x) à la notation abstraite de Dirac |ψ⟩",
    "Manipuler bras, kets et produits scalaires dans un espace de Hilbert",
    "Représenter un opérateur linéaire et distinguer opérateur hermitique et opérateur unitaire",
    "Retrouver la représentation-position comme cas particulier du formalisme abstrait"
  ],
  prereqs: ["La fonction d'onde et l'équation de Schrödinger (Introduction à la mécanique quantique, L2)", "Opérateurs, observables et postulats de la mesure (Introduction à la mécanique quantique, L2)", "Algèbre linéaire (espaces vectoriels, produit scalaire)"],
  bodyHtml: `
    <p>Le cours de L2 a manipulé l'état quantique d'un système à travers sa <strong>fonction d'onde</strong> $\\psi(x,t)$, solution de l'équation de Schrödinger. Cette description, bien qu'efficace pour les problèmes à une dimension (puits, marche, oscillateur), devient vite malcommode dès qu'on aborde des systèmes plus riches (moment cinétique, spin, atome d'hydrogène en trois dimensions). Le physicien Paul Dirac a introduit, dans les années 1930, un <strong>formalisme abstrait</strong> qui libère la mécanique quantique de tout choix de représentation particulier — c'est ce langage, devenu universel, que ce chapitre installe.</p>

    <h3>1. L'espace des états : le ket $|\\psi\\rangle$</h3>
    <p>L'état quantique d'un système est représenté par un vecteur $|\\psi\\rangle$, appelé <strong>ket</strong>, appartenant à un espace vectoriel complexe muni d'un produit scalaire : un <strong>espace de Hilbert</strong> $\\mathcal H$. La fonction d'onde $\\psi(x)$ n'est rien d'autre que l'ensemble des <strong>composantes</strong> du ket $|\\psi\\rangle$ dans une base particulière de $\\mathcal H$ — la base des états de position $\\{|x\\rangle\\}$ — exactement comme un vecteur $\\vec v$ de $\\mathbb R^3$ peut s'écrire par ses composantes $(v_x,v_y,v_z)$ dans une base donnée, sans que le vecteur lui-même dépende de ce choix.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le ket $|\\psi\\rangle$ est l'objet physique fondamental ; la fonction d'onde $\\psi(x) = \\langle x|\\psi\\rangle$ n'en est qu'une <strong>représentation</strong> parmi d'autres (on aurait pu tout aussi bien choisir la représentation en impulsion, $\\tilde\\psi(p)=\\langle p|\\psi\\rangle$). Le formalisme de Dirac permet de raisonner sans se fixer sur une représentation avant d'en avoir besoin.
    </div>

    <h3>2. L'espace dual et le bra $\\langle \\psi|$</h3>
    <p>À chaque ket $|\\psi\\rangle$ de $\\mathcal H$, on associe un <strong>bra</strong> $\\langle \\psi|$, élément de l'espace dual $\\mathcal H^*$ (l'espace des formes linéaires sur $\\mathcal H$). Le nom « bra-ket » vient du découpage du mot anglais <em>bracket</em> (crochet) : le produit scalaire de deux kets $|\\varphi\\rangle$ et $|\\psi\\rangle$ s'écrit $\\langle \\varphi|\\psi\\rangle$ — un « bra-c-ket » complet. Ce produit scalaire vérifie :</p>
    <div class="formula-box">$$\\langle \\varphi|\\psi\\rangle = \\overline{\\langle \\psi|\\varphi\\rangle} \\qquad \\text{(antisymétrie hermitienne)}$$</div>
    <p>ce qui garantit en particulier que la <strong>norme</strong> $\\langle \\psi|\\psi\\rangle$ est toujours un nombre réel positif — condition indispensable pour l'interpréter comme une probabilité totale (postulat de normalisation, chapitre suivant).</p>

    <h3>3. Bases et relation de fermeture</h3>
    <p>Une base orthonormée discrète $\\{|u_n\\rangle\\}$ de $\\mathcal H$ vérifie $\\langle u_n|u_m\\rangle = \\delta_{nm}$ (symbole de Kronecker) et permet de décomposer tout ket :</p>
    <div class="formula-box">$$|\\psi\\rangle = \\sum_n c_n |u_n\\rangle, \\qquad c_n = \\langle u_n|\\psi\\rangle$$</div>
    <p>Pour une base continue comme les états de position $\\{|x\\rangle\\}$ ($\\langle x|x'\\rangle = \\delta(x-x')$, distribution de Dirac), la somme devient une intégrale : $|\\psi\\rangle = \\int \\psi(x)\\,|x\\rangle\\,dx$. Dans les deux cas, on retient la <strong>relation de fermeture</strong> (ou relation de complétude), qui exprime que la base couvre tout l'espace :</p>
    <div class="formula-box">$$\\sum_n |u_n\\rangle\\langle u_n| = \\hat{\\mathbb 1} \\qquad \\text{ou}\\qquad \\int |x\\rangle\\langle x|\\,dx = \\hat{\\mathbb 1}$$</div>
    <div class="key-point">
      <span class="eyebrow">Un outil de calcul redoutable</span>
      La relation de fermeture permet d'insérer « gratuitement » $\\hat{\\mathbb 1}$ n'importe où dans un calcul, pour faire apparaître une représentation particulière. Par exemple, $\\langle \\varphi|\\psi\\rangle = \\langle \\varphi|\\hat{\\mathbb 1}|\\psi\\rangle = \\int \\langle \\varphi|x\\rangle\\langle x|\\psi\\rangle\\,dx = \\int \\overline{\\varphi(x)}\\,\\psi(x)\\,dx$ — on retrouve exactement le produit scalaire usuel des fonctions d'onde de L2, comme cas particulier du formalisme abstrait.
    </div>

    <h3>4. Opérateurs linéaires</h3>
    <p>Une <strong>observable physique</strong> (position, impulsion, énergie...) est représentée par un <strong>opérateur linéaire</strong> $\\hat A$ agissant sur $\\mathcal H$ : $\\hat A|\\psi\\rangle$ est un nouveau ket. L'<strong>élément de matrice</strong> de $\\hat A$ entre deux états est $\\langle \\varphi|\\hat A|\\psi\\rangle$. On définit l'opérateur <strong>adjoint</strong> (ou hermitique conjugué) $\\hat A^\\dagger$ par $\\langle \\varphi|\\hat A^\\dagger|\\psi\\rangle = \\overline{\\langle \\psi|\\hat A|\\varphi\\rangle}$.</p>
    <table class="mini-table">
      <tr><th>Type d'opérateur</th><th>Condition</th><th>Rôle en mécanique quantique</th></tr>
      <tr><td><strong>Hermitique</strong> (auto-adjoint)</td><td>$\\hat A^\\dagger = \\hat A$</td><td>Représente une observable physique (valeurs propres réelles, voir chapitre 2)</td></tr>
      <tr><td><strong>Unitaire</strong></td><td>$\\hat U^\\dagger \\hat U = \\hat{\\mathbb 1}$</td><td>Représente une évolution ou une transformation (rotation, translation) qui conserve la norme</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — le commutateur position-impulsion</span>
      <p><strong>Énoncé :</strong> en représentation position, $\\hat x$ agit par multiplication ($\\hat x\\psi(x)=x\\psi(x)$) et $\\hat p$ par dérivation ($\\hat p\\psi(x)=-i\\hbar\\,d\\psi/dx$). Calculer le commutateur $[\\hat x,\\hat p]=\\hat x\\hat p - \\hat p\\hat x$.</p>
      <p><strong>Solution :</strong> appliqué à une fonction test $\\psi(x)$ : $\\hat x\\hat p\\psi = x\\left(-i\\hbar\\dfrac{d\\psi}{dx}\\right)$, et $\\hat p\\hat x\\psi = -i\\hbar\\dfrac{d}{dx}(x\\psi) = -i\\hbar\\psi - i\\hbar x\\dfrac{d\\psi}{dx}$. La différence : $[\\hat x,\\hat p]\\psi = -i\\hbar x\\psi' -(-i\\hbar\\psi - i\\hbar x\\psi') = i\\hbar\\psi$.</p>
      <p class="example-answer">$[\\hat x,\\hat p] = i\\hbar\\,\\hat{\\mathbb 1}$ — la <strong>relation de commutation canonique</strong>, valable dans n'importe quelle représentation (pas seulement en position) : c'est elle, plus que les expressions explicites de $\\hat x$ et $\\hat p$, qui encode le contenu physique du principe d'incertitude de Heisenberg vu en L2.</p>
    </div>

    <h3>5. Valeurs propres et vecteurs propres</h3>
    <p>Un ket $|a\\rangle$ est <strong>vecteur propre</strong> de $\\hat A$, de <strong>valeur propre</strong> $a$, si $\\hat A|a\\rangle = a|a\\rangle$. Pour un opérateur hermitique, un théorème fondamental (admis ici, démontré en algèbre linéaire) garantit que les valeurs propres sont <strong>réelles</strong> et que les vecteurs propres associés à des valeurs propres distinctes sont <strong>orthogonaux</strong> — deux propriétés indispensables pour que les valeurs propres d'une observable puissent être interprétées comme des <strong>résultats de mesure possibles</strong> (chapitre suivant).</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <line x1="20" y1="75" x2="120" y2="75" stroke="#5A6472" stroke-width="1"/>
          <line x1="20" y1="75" x2="20" y2="15" stroke="#5A6472" stroke-width="1"/>
          <line x1="20" y1="75" x2="90" y2="30" stroke="#4C7CFF" stroke-width="2"/>
          <text x="92" y="28" font-family="IBM Plex Mono" font-size="8" fill="#4C7CFF">|ψ⟩</text>
          <line x1="20" y1="75" x2="60" y2="75" stroke="#2DD4C4" stroke-width="1.4" stroke-dasharray="2,2"/>
          <text x="35" y="88" font-family="IBM Plex Mono" font-size="7" fill="#2DD4C4">⟨u1|ψ⟩</text>
        </svg>
        <span>un ket comme vecteur abstrait, indépendant de sa base de décomposition</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>L'état quantique est un ket $|\\psi\\rangle$ dans un espace de Hilbert ; $\\psi(x)=\\langle x|\\psi\\rangle$ n'est qu'une représentation particulière</li>
        <li>Relation de fermeture $\\sum_n|u_n\\rangle\\langle u_n|=\\hat{\\mathbb 1}$ (ou sa version continue) : outil de calcul central du formalisme</li>
        <li>Une observable physique est un opérateur hermitique ($\\hat A^\\dagger=\\hat A$) ; une évolution/transformation est un opérateur unitaire</li>
        <li>$[\\hat x,\\hat p]=i\\hbar$ : la relation de commutation canonique, valable dans toute représentation</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre le ket $|\\psi\\rangle$ (l'état physique) et la fonction d'onde $\\psi(x)$ (une de ses représentations possibles parmi d'autres)</li>
        <li>Oublier de conjuguer complexe en passant d'un bra à un ket ($\\langle \\psi| \\leftrightarrow |\\psi\\rangle$ implique une conjugaison sur les composantes)</li>
        <li>Croire que tout opérateur linéaire représente une observable physique : seuls les opérateurs <em>hermitiques</em> le font</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La fonction d'onde $\\psi(x)$ est reliée au ket abstrait $|\\psi\\rangle$ par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr1e1" value="wrong"> $\\psi(x) = |\\psi\\rangle$ (ce sont deux notations du même objet)</label>
          <label class="option"><input type="radio" name="mqnr1e1" value="right"> $\\psi(x) = \\langle x|\\psi\\rangle$, une représentation particulière du ket</label>
          <label class="option"><input type="radio" name="mqnr1e1" value="wrong"> $\\psi(x) = \\hat x |\\psi\\rangle$</label>
          <label class="option"><input type="radio" name="mqnr1e1" value="wrong"> $\\psi(x)$ n'a aucun rapport avec $|\\psi\\rangle$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr1e1','mqnr1fb1','Correct — la fonction d\\'onde est la composante du ket dans la base des états de position, exactement comme un vecteur a des composantes dans une base donnée.','Relis le point clé du cours : la fonction d\\'onde est une projection du ket sur une base précise.')">Vérifier</button>
        <div class="feedback" id="mqnr1fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une observable physique (position, énergie...) est représentée par un opérateur :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr1e2" value="wrong"> unitaire</label>
          <label class="option"><input type="radio" name="mqnr1e2" value="right"> hermitique</label>
          <label class="option"><input type="radio" name="mqnr1e2" value="wrong"> antisymétrique</label>
          <label class="option"><input type="radio" name="mqnr1e2" value="wrong"> nilpotent</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr1e2','mqnr1fb2','Correct — un opérateur hermitique (Â†=Â) a des valeurs propres réelles, indispensables pour représenter des résultats de mesure physiques.','Repense au tableau du cours : quel type d\\'opérateur garantit des valeurs propres réelles ?')">Vérifier</button>
        <div class="feedback" id="mqnr1fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le commutateur $[\\hat x,\\hat p]$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr1e3" value="wrong"> 0</label>
          <label class="option"><input type="radio" name="mqnr1e3" value="right"> $i\\hbar$</label>
          <label class="option"><input type="radio" name="mqnr1e3" value="wrong"> $\\hbar$</label>
          <label class="option"><input type="radio" name="mqnr1e3" value="wrong"> $-i\\hbar\\,d/dx$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr1e3','mqnr1fb3','Correct — [x̂,p̂]=iℏ, la relation de commutation canonique, à la base du principe d\\'incertitude de Heisenberg.','Reprends le calcul de l\\'exemple corrigé : applique x̂p̂ puis p̂x̂ à une fonction test et fais la différence.')">Vérifier</button>
        <div class="feedback" id="mqnr1fb3"></div>
      </div>
    </div>
  `
};

MQNR_NOVA_KB[mqnrKey("Formalisme de Dirac : espace des états, bras, kets et opérateurs")] = {
  intro: "Salut, moi c'est Nova ! On démarre la mécanique quantique de L3 avec le formalisme de Dirac : kets, bras, opérateurs. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/ket|bra/i, replies:[
      "Le ket |ψ⟩ représente l'état quantique de façon abstraite, indépendante de toute représentation. La fonction d'onde ψ(x)=⟨x|ψ⟩ n'est qu'une projection du ket sur la base des états de position."
    ]},
    { test:/fermeture|complétude/i, replies:[
      "La relation de fermeture Σ|un⟩⟨un|=1̂ permet d'insérer l'identité n'importe où dans un calcul pour faire apparaître une représentation particulière — un outil de calcul très puissant."
    ]},
    { test:/hermitique|unitaire/i, replies:[
      "Un opérateur hermitique (Â†=Â) représente une observable physique et a des valeurs propres réelles. Un opérateur unitaire (Û†Û=1̂) représente une évolution ou transformation qui conserve la norme."
    ]},
    { test:/commutateur|canonique/i, replies:[
      "Le commutateur [x̂,p̂]=iℏ est la relation de commutation canonique : elle encode le contenu physique du principe d'incertitude de Heisenberg, indépendamment de toute représentation."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le point clé sur la relation entre fonction d'onde et ket.",
      "Indice niveau 2 : la fonction d'onde est une projection du ket sur une base précise.",
      "Indice niveau 3 : ψ(x)=⟨x|ψ⟩."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : quel type d'opérateur garantit des valeurs propres réelles ?",
      "Indice niveau 2 : c'est une propriété liée à l'adjoint de l'opérateur.",
      "Indice niveau 3 : un opérateur hermitique (Â†=Â)."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : applique x̂p̂ puis p̂x̂ à une fonction test ψ(x), en te souvenant que p̂=-iℏd/dx.",
      "Indice niveau 2 : n'oublie pas la dérivée du produit x·ψ pour p̂x̂ψ.",
      "Indice niveau 3 : la différence donne [x̂,p̂]=iℏ."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
MQNR_CHAPTERS[mqnrKey("Les postulats de la mécanique quantique")] = {
  objectives: [
    "Énoncer, dans le formalisme de Dirac, les cinq postulats fondamentaux de la mécanique quantique",
    "Distinguer spectre discret et spectre continu dans le postulat de mesure",
    "Retrouver la règle de Born et le principe de réduction du paquet d'états",
    "Établir l'équation de Schrödinger comme postulat d'évolution temporelle"
  ],
  prereqs: ["Formalisme de Dirac : espace des états, bras, kets et opérateurs"],
  bodyHtml: `
    <p>Le cours de L2 a introduit, de façon progressive et illustrée sur des exemples (puits, marche de potentiel), les grandes idées de la mesure quantique. Ce chapitre les reformule en un ensemble compact et général de <strong>postulats</strong>, dans le langage abstrait du chapitre précédent — la référence sur laquelle s'appuiera tout le reste du cours.</p>

    <h3>Postulat 1 — État quantique</h3>
    <div class="key-point">
      <span class="eyebrow">Postulat de l'état</span>
      À un instant $t$ donné, l'état d'un système physique est entièrement décrit par un ket $|\\psi(t)\\rangle$, appartenant à l'espace des états $\\mathcal H$ du système.
    </div>
    <p>« Entièrement » est le mot important : $|\\psi(t)\\rangle$ contient <em>toute</em> l'information physiquement accessible sur le système — il n'existe, dans le cadre standard de la mécanique quantique, aucune variable cachée supplémentaire qui compléterait cette description (c'est un point qui a suscité un débat historique majeur, associé aux noms d'Einstein, Podolsky, Rosen, et de Bell).</p>

    <h3>Postulat 2 — Observables</h3>
    <div class="key-point">
      <span class="eyebrow">Postulat des observables</span>
      Toute grandeur physique mesurable $\\mathcal A$ est représentée par un opérateur hermitique $\\hat A$ agissant dans $\\mathcal H$, appelé <strong>observable</strong>.
    </div>

    <h3>Postulat 3 — Résultats possibles d'une mesure</h3>
    <div class="key-point">
      <span class="eyebrow">Postulat de quantification</span>
      La mesure de la grandeur $\\mathcal A$ ne peut donner comme résultat qu'une des <strong>valeurs propres</strong> $a_n$ de l'observable $\\hat A$ associée.
    </div>
    <p>C'est ce postulat qui explique le caractère <strong>discret</strong> des spectres d'énergie observés en L2 (puits infini, oscillateur harmonique, atome d'hydrogène) : ces énergies quantifiées sont précisément les valeurs propres de l'opérateur hamiltonien $\\hat H$. Pour une observable à spectre continu (comme la position $\\hat x$), le postulat s'adapte : le résultat de mesure appartient à un intervalle continu de valeurs propres.</p>

    <h3>Postulat 4 — La règle de Born (probabilités de mesure)</h3>
    <p>Pour un état normé $|\\psi\\rangle$ ($\\langle \\psi|\\psi\\rangle=1$), et une observable $\\hat A$ de spectre discret non dégénéré $\\{a_n\\}$ avec vecteurs propres associés $\\{|a_n\\rangle\\}$ :</p>
    <div class="formula-box">$$P(a_n) = |\\langle a_n|\\psi\\rangle|^2$$</div>
    <div class="key-point">
      <span class="eyebrow">Règle de Born</span>
      La probabilité d'obtenir le résultat $a_n$ en mesurant $\\mathcal A$ sur le système dans l'état $|\\psi\\rangle$ est le carré du module de l'amplitude de probabilité $\\langle a_n|\\psi\\rangle$ — la <strong>projection</strong> de l'état sur le vecteur propre correspondant. Pour un spectre dégénéré, on somme $|\\langle a_n^{(i)}|\\psi\\rangle|^2$ sur tous les vecteurs propres $|a_n^{(i)}\\rangle$ associés à la même valeur propre $a_n$.
    </div>
    <p>Le cas particulier familier de L2, $P(x)\\,dx = |\\psi(x)|^2\\,dx$ (densité de probabilité de présence), s'obtient en prenant $\\hat A=\\hat x$ (spectre continu) : $|\\langle x|\\psi\\rangle|^2 = |\\psi(x)|^2$.</p>

    <h3>Postulat 5 — Réduction du paquet d'états</h3>
    <div class="key-point">
      <span class="eyebrow">Postulat de la mesure (réduction)</span>
      Si la mesure de $\\mathcal A$ sur l'état $|\\psi\\rangle$ donne le résultat $a_n$, l'état du système <em>immédiatement après</em> la mesure devient le vecteur propre normé $|a_n\\rangle$ associé à ce résultat.
    </div>
    <p>C'est ce postulat, parfois appelé « collapse » (effondrement) de la fonction d'onde, qui rend la mesure quantique fondamentalement différente d'une simple prise d'information passive : mesurer <strong>perturbe</strong> irréversiblement l'état du système (sauf si celui-ci était déjà vecteur propre du résultat obtenu).</p>

    <h3>Postulat 6 — Évolution temporelle : l'équation de Schrödinger</h3>
    <div class="key-point">
      <span class="eyebrow">Postulat d'évolution</span>
      Entre deux mesures, l'évolution de l'état $|\\psi(t)\\rangle$ d'un système est régie par l'<strong>équation de Schrödinger</strong> :
      $$i\\hbar\\,\\frac{d}{dt}|\\psi(t)\\rangle = \\hat H(t)\\,|\\psi(t)\\rangle$$
      où $\\hat H$ est l'observable hamiltonien du système (opérateur associé à son énergie).
    </div>
    <p>En représentation position, ce postulat redonne exactement l'équation de Schrödinger dépendante du temps du cours de L2, $i\\hbar\\,\\partial\\psi/\\partial t = \\hat H\\psi$. Contrairement au postulat 5 (discontinu, probabiliste), l'évolution de Schrödinger est <strong>continue et déterministe</strong> : connaissant $|\\psi(t_0)\\rangle$, l'équation détermine $|\\psi(t)\\rangle$ à tout instant ultérieur — tant qu'aucune mesure n'intervient.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un système à deux niveaux (comme un spin 1/2, chapitre 6) est dans l'état $|\\psi\\rangle = \\frac{1}{\\sqrt 3}|+\\rangle + \\sqrt{\\frac{2}{3}}\\,|-\\rangle$, avec $|+\\rangle,|-\\rangle$ vecteurs propres orthonormés d'une observable $\\hat A$, de valeurs propres respectives $+a$ et $-a$. Quelle est la probabilité de mesurer $+a$ ? L'état est-il bien normé ?</p>
      <p><strong>Solution :</strong> $P(+a) = |\\langle +|\\psi\\rangle|^2 = \\left|\\dfrac{1}{\\sqrt 3}\\right|^2 = \\dfrac{1}{3}$. Vérification de la normalisation : $\\langle \\psi|\\psi\\rangle = \\dfrac{1}{3} + \\dfrac{2}{3} = 1$. ✓</p>
      <p class="example-answer">$P(+a)=1/3$, $P(-a)=2/3$ ; la somme des probabilités vaut bien 1, confirmant que l'état était correctement normalisé.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>L'état est un ket $|\\psi\\rangle$ ; les grandeurs mesurables sont des observables hermitiques $\\hat A$</li>
        <li>Seules les valeurs propres de $\\hat A$ sont des résultats de mesure possibles (quantification)</li>
        <li>Règle de Born : $P(a_n) = |\\langle a_n|\\psi\\rangle|^2$</li>
        <li>Après une mesure donnant $a_n$, l'état devient $|a_n\\rangle$ (réduction du paquet d'états)</li>
        <li>Entre deux mesures, l'évolution est continue et déterministe : $i\\hbar\\,d|\\psi\\rangle/dt = \\hat H|\\psi\\rangle$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de vérifier la normalisation de l'état ($\\langle \\psi|\\psi\\rangle=1$) avant d'appliquer la règle de Born telle quelle</li>
        <li>Confondre l'évolution de Schrödinger (continue, déterministe, réversible) avec la réduction du paquet d'états lors d'une mesure (discontinue, probabiliste, irréversible)</li>
        <li>Oublier de sommer sur tous les vecteurs propres d'un sous-espace propre dégénéré lors du calcul d'une probabilité de mesure</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La règle de Born énonce que la probabilité de mesurer la valeur propre $a_n$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr2e1" value="wrong"> $\\langle a_n|\\psi\\rangle$</label>
          <label class="option"><input type="radio" name="mqnr2e1" value="right"> $|\\langle a_n|\\psi\\rangle|^2$</label>
          <label class="option"><input type="radio" name="mqnr2e1" value="wrong"> $a_n \\langle \\psi|\\psi\\rangle$</label>
          <label class="option"><input type="radio" name="mqnr2e1" value="wrong"> $\\langle \\psi|\\hat A|\\psi\\rangle$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr2e1','mqnr2fb1','Correct — c\\'est le carré du module de l\\'amplitude de probabilité, la projection de l\\'état sur le vecteur propre correspondant.','Relis l\\'énoncé exact du postulat 4 dans le cours.')">Vérifier</button>
        <div class="feedback" id="mqnr2fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Après une mesure de $\\mathcal A$ ayant donné le résultat $a_n$, l'état du système devient immédiatement après :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr2e2" value="wrong"> inchangé, égal à $|\\psi\\rangle$</label>
          <label class="option"><input type="radio" name="mqnr2e2" value="right"> le vecteur propre $|a_n\\rangle$ associé au résultat obtenu</label>
          <label class="option"><input type="radio" name="mqnr2e2" value="wrong"> une superposition de tous les états propres</label>
          <label class="option"><input type="radio" name="mqnr2e2" value="wrong"> l'état fondamental du système</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr2e2','mqnr2fb2','Correct — c\\'est le postulat de réduction du paquet d\\'états : mesurer perturbe irréversiblement l\\'état, qui devient exactement le vecteur propre associé au résultat obtenu.','Relis le postulat 5 (réduction) du cours.')">Vérifier</button>
        <div class="feedback" id="mqnr2fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un système est dans l'état $|\\psi\\rangle = \\frac{1}{\\sqrt 3}|+\\rangle + \\sqrt{2/3}\\,|-\\rangle$. La probabilité de mesurer la valeur propre associée à $|-\\rangle$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr2e3" value="wrong"> 1/3</label>
          <label class="option"><input type="radio" name="mqnr2e3" value="right"> 2/3</label>
          <label class="option"><input type="radio" name="mqnr2e3" value="wrong"> 1/9</label>
          <label class="option"><input type="radio" name="mqnr2e3" value="wrong"> 1</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr2e3','mqnr2fb3','Correct — P(-a)=|⟨-|ψ⟩|²=(√(2/3))²=2/3, exactement comme calculé dans l\\'exemple corrigé du cours.','Utilise P=|⟨-|ψ⟩|² avec le coefficient de |-⟩ dans ψ.')">Vérifier</button>
        <div class="feedback" id="mqnr2fb3"></div>
      </div>
    </div>
  `
};

MQNR_NOVA_KB[mqnrKey("Les postulats de la mécanique quantique")] = {
  intro: "Salut, c'est Nova ! On formalise ici les postulats fondamentaux de la mécanique quantique. Demande-moi un postulat en particulier, ou un indice sur un exercice.",
  rules: [
    { test:/born|probabilit[ée]/i, replies:[
      "La règle de Born : P(an) = |⟨an|ψ⟩|², le carré du module de la projection de l'état sur le vecteur propre du résultat considéré."
    ]},
    { test:/r[ée]duction|effondrement|collapse/i, replies:[
      "Le postulat de réduction : après une mesure donnant an, l'état devient immédiatement |an⟩. C'est un processus discontinu et probabiliste, contrairement à l'évolution de Schrödinger."
    ]},
    { test:/schr[oö]dinger|[ée]volution/i, replies:[
      "Le postulat d'évolution : iℏ d|ψ⟩/dt = Ĥ|ψ⟩. Entre deux mesures, l'évolution est continue et déterministe — c'est très différent de la réduction lors d'une mesure."
    ]},
    { test:/observable/i, replies:[
      "Une observable est un opérateur hermitique associé à une grandeur physique mesurable. Seules ses valeurs propres peuvent être obtenues comme résultat de mesure."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis l'énoncé exact du postulat 4 (règle de Born).",
      "Indice niveau 2 : c'est un carré de module, pas juste un produit scalaire.",
      "Indice niveau 3 : P(an)=|⟨an|ψ⟩|²."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le postulat 5 du cours (réduction du paquet d'états).",
      "Indice niveau 2 : l'état après mesure n'est plus une superposition.",
      "Indice niveau 3 : il devient exactement le vecteur propre |an⟩ associé au résultat obtenu."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : utilise P=|⟨-|ψ⟩|² avec le coefficient de |-⟩ dans l'état donné.",
      "Indice niveau 2 : le coefficient de |-⟩ est √(2/3).",
      "Indice niveau 3 : son carré donne P=2/3."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
MQNR_CHAPTERS[mqnrKey("L'oscillateur harmonique quantique : méthode algébrique")] = {
  objectives: [
    "Introduire les opérateurs d'échelle (création et annihilation) de l'oscillateur harmonique",
    "Retrouver le spectre d'énergie de l'oscillateur harmonique sans résoudre d'équation différentielle",
    "Construire les états propres |n⟩ par action répétée de l'opérateur de création",
    "Calculer des éléments de matrice de x̂ et p̂ dans la base des états propres"
  ],
  prereqs: ["Formalisme de Dirac : espace des états, bras, kets et opérateurs", "Les postulats de la mécanique quantique", "L'oscillateur harmonique quantique (Introduction à la mécanique quantique, L2)"],
  bodyHtml: `
    <p>En L2, le spectre d'énergie de l'oscillateur harmonique quantique, $E_n = \\left(n+\\frac{1}{2}\\right)\\hbar\\omega$, a été obtenu en résolvant l'équation de Schrödinger stationnaire — une équation différentielle du second ordre menant aux polynômes d'Hermite. La <strong>méthode algébrique</strong>, due à Dirac, retrouve exactement ce résultat par la seule manipulation d'opérateurs, sans jamais résoudre d'équation différentielle : c'est l'un des calculs les plus élégants de toute la mécanique quantique, et le prototype de méthodes utilisées bien au-delà (théorie quantique des champs, physique de la matière condensée).</p>

    <h3>1. Les opérateurs d'échelle</h3>
    <p>L'hamiltonien de l'oscillateur harmonique, $\\hat H = \\dfrac{\\hat p^2}{2m} + \\dfrac{1}{2}m\\omega^2\\hat x^2$, se réécrit en introduisant deux opérateurs, non hermitiques l'un de l'autre :</p>
    <div class="formula-box">$$\\hat a = \\sqrt{\\frac{m\\omega}{2\\hbar}}\\left(\\hat x + \\frac{i}{m\\omega}\\hat p\\right), \\qquad \\hat a^\\dagger = \\sqrt{\\frac{m\\omega}{2\\hbar}}\\left(\\hat x - \\frac{i}{m\\omega}\\hat p\\right)$$</div>
    <p>appelés respectivement <strong>opérateur d'annihilation</strong> et <strong>opérateur de création</strong>. En utilisant $[\\hat x,\\hat p]=i\\hbar$ (chapitre 1), on montre par un calcul direct :</p>
    <div class="formula-box">$$[\\hat a, \\hat a^\\dagger] = 1$$</div>
    <p>On définit ensuite l'<strong>opérateur nombre</strong> $\\hat N = \\hat a^\\dagger \\hat a$ (hermitique, donc observable), et l'on montre que l'hamiltonien s'exprime très simplement en fonction de $\\hat N$ :</p>
    <div class="formula-box">$$\\hat H = \\hbar\\omega\\left(\\hat N + \\frac{1}{2}\\right)$$</div>
    <p>Trouver le spectre de $\\hat H$ revient donc à trouver le spectre de $\\hat N$ — un problème purement algébrique.</p>

    <h3>2. Action des opérateurs d'échelle sur les états propres</h3>
    <p>En utilisant $[\\hat N,\\hat a]=-\\hat a$ et $[\\hat N,\\hat a^\\dagger]=\\hat a^\\dagger$ (obtenus à partir de $[\\hat a,\\hat a^\\dagger]=1$), on montre que si $|n\\rangle$ est vecteur propre de $\\hat N$ avec valeur propre $n$, alors $\\hat a|n\\rangle$ et $\\hat a^\\dagger|n\\rangle$ sont <em>aussi</em> vecteurs propres de $\\hat N$, avec les valeurs propres $n-1$ et $n+1$ respectivement :</p>
    <div class="formula-box">$$\\hat a|n\\rangle = \\sqrt{n}\\,|n-1\\rangle, \\qquad \\hat a^\\dagger|n\\rangle = \\sqrt{n+1}\\,|n+1\\rangle$$</div>
    <div class="key-point">
      <span class="eyebrow">D'où le nom « opérateurs d'échelle »</span>
      $\\hat a^\\dagger$ fait « monter » d'un échelon la valeur propre de $\\hat N$ (il <strong>crée</strong> un quantum d'énergie $\\hbar\\omega$), tandis que $\\hat a$ la fait « descendre » d'un échelon (il <strong>annihile</strong> un quantum). C'est l'origine du vocabulaire de « quanta » : l'énergie de l'oscillateur ne peut changer que par paquets discrets $\\hbar\\omega$.
    </div>

    <h3>3. Quantification du spectre : pourquoi $n$ est un entier positif</h3>
    <p>Puisque $\\hat N=\\hat a^\\dagger\\hat a$ est le produit d'un opérateur par son adjoint, sa valeur moyenne dans n'importe quel état est nécessairement positive ou nulle : $\\langle \\psi|\\hat N|\\psi\\rangle = \\langle \\psi|\\hat a^\\dagger\\hat a|\\psi\\rangle = \\|\\hat a|\\psi\\rangle\\|^2 \\geq 0$. Le spectre de $\\hat N$ est donc borné inférieurement. Comme $\\hat a$ fait décroître la valeur propre d'une unité à chaque application, la seule façon d'éviter une valeur propre négative (interdite) est qu'il existe un état fondamental $|0\\rangle$, <strong>annihilé</strong> par $\\hat a$ :</p>
    <div class="formula-box">$$\\hat a|0\\rangle = 0$$</div>
    <p>Le spectre de $\\hat N$ est alors nécessairement $\\{0,1,2,3,\\ldots\\}$ (les entiers naturels), et celui de $\\hat H$ :</p>
    <div class="formula-box">$$\\boxed{\\ E_n = \\left(n+\\frac{1}{2}\\right)\\hbar\\omega, \\qquad n=0,1,2,\\ldots\\ }$$</div>
    <p>On retrouve exactement le résultat du cours de L2 — obtenu ici sans résoudre la moindre équation différentielle. Les états excités s'obtiennent par action répétée de l'opérateur de création :</p>
    <div class="formula-box">$$|n\\rangle = \\frac{(\\hat a^\\dagger)^n}{\\sqrt{n!}}\\,|0\\rangle$$</div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — élément de matrice de $\\hat x$</span>
      <p><strong>Énoncé :</strong> calculer $\\langle n|\\hat x|n\\rangle$ (position moyenne dans l'état $|n\\rangle$).</p>
      <p><strong>Solution :</strong> en inversant les définitions de $\\hat a,\\hat a^\\dagger$ : $\\hat x = \\sqrt{\\dfrac{\\hbar}{2m\\omega}}(\\hat a + \\hat a^\\dagger)$. Donc $\\langle n|\\hat x|n\\rangle = \\sqrt{\\dfrac{\\hbar}{2m\\omega}}\\big(\\langle n|\\hat a|n\\rangle + \\langle n|\\hat a^\\dagger|n\\rangle\\big)$. Or $\\hat a|n\\rangle \\propto |n-1\\rangle$ et $\\hat a^\\dagger|n\\rangle \\propto |n+1\\rangle$, deux états orthogonaux à $|n\\rangle$.</p>
      <p class="example-answer">$\\langle n|\\hat x|n\\rangle = 0$ pour tout $n$ : la position moyenne d'un état stationnaire de l'oscillateur harmonique est toujours nulle par symétrie — un résultat obtenu ici en trois lignes, sans aucune intégrale sur les polynômes d'Hermite.</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 100" width="100%">
          <line x1="20" y1="85" x2="20" y2="10" stroke="#5A6472" stroke-width="1"/>
          <line x1="15" y1="70" x2="120" y2="70" stroke="#EAF0FB" stroke-width="1" opacity="0.3"/>
          <line x1="15" y1="55" x2="120" y2="55" stroke="#EAF0FB" stroke-width="1" opacity="0.3"/>
          <line x1="15" y1="40" x2="120" y2="40" stroke="#EAF0FB" stroke-width="1" opacity="0.3"/>
          <line x1="15" y1="25" x2="120" y2="25" stroke="#EAF0FB" stroke-width="1" opacity="0.3"/>
          <text x="122" y="73" font-family="IBM Plex Mono" font-size="7" fill="#F0B94D">|0⟩</text>
          <text x="122" y="58" font-family="IBM Plex Mono" font-size="7" fill="#F0B94D">|1⟩</text>
          <text x="122" y="43" font-family="IBM Plex Mono" font-size="7" fill="#F0B94D">|2⟩</text>
          <text x="122" y="28" font-family="IBM Plex Mono" font-size="7" fill="#F0B94D">|3⟩</text>
          <path d="M60,73 L70,63" stroke="#2DD4C4" stroke-width="1.6" marker-end="url(#arr)"/>
          <path d="M75,58 L65,68" stroke="#FF6B6F" stroke-width="1.6"/>
        </svg>
        <span>â† fait monter d'un échelon, â fait descendre d'un échelon</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Opérateurs d'échelle $\\hat a,\\hat a^\\dagger$ avec $[\\hat a,\\hat a^\\dagger]=1$ ; opérateur nombre $\\hat N=\\hat a^\\dagger\\hat a$, et $\\hat H=\\hbar\\omega(\\hat N+\\frac{1}{2})$</li>
        <li>$\\hat a|n\\rangle=\\sqrt n|n-1\\rangle$, $\\hat a^\\dagger|n\\rangle=\\sqrt{n+1}|n+1\\rangle$ : $\\hat a$ annihile, $\\hat a^\\dagger$ crée un quantum $\\hbar\\omega$</li>
        <li>L'existence d'un état fondamental $\\hat a|0\\rangle=0$ impose $n\\in\\mathbb N$, redonnant $E_n=(n+\\frac12)\\hbar\\omega$ sans équation différentielle</li>
        <li>$|n\\rangle = \\dfrac{(\\hat a^\\dagger)^n}{\\sqrt{n!}}|0\\rangle$ ; $\\hat x$ et $\\hat p$ s'expriment simplement en fonction de $\\hat a,\\hat a^\\dagger$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que $\\hat a$ est hermitique : ce n'est pas le cas ($\\hat a^\\dagger \\neq \\hat a$), donc $\\hat a$ seul n'est pas une observable</li>
        <li>Oublier le facteur $\\sqrt n$ (ou $\\sqrt{n+1}$) dans l'action de $\\hat a$ (ou $\\hat a^\\dagger$) — sans ce facteur, les états ne seraient pas correctement normés</li>
        <li>Confondre l'opérateur nombre $\\hat N$ (dont les valeurs propres sont $0,1,2,\\ldots$) avec l'hamiltonien $\\hat H$ lui-même (qui a un terme additif $\\frac12\\hbar\\omega$, l'énergie du point zéro)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'état fondamental $|0\\rangle$ de l'oscillateur harmonique vérifie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr3e1" value="wrong"> $\\hat a^\\dagger|0\\rangle = 0$</label>
          <label class="option"><input type="radio" name="mqnr3e1" value="right"> $\\hat a|0\\rangle = 0$</label>
          <label class="option"><input type="radio" name="mqnr3e1" value="wrong"> $\\hat N|0\\rangle = |0\\rangle$</label>
          <label class="option"><input type="radio" name="mqnr3e1" value="wrong"> $\\hat H|0\\rangle = 0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr3e1','mqnr3fb1','Correct — c\\'est exactement cette condition qui borne le spectre de N par le bas et impose n∈ℕ.','Relis la condition qui définit l\\'état fondamental et empêche une valeur propre négative de N.')">Vérifier</button>
        <div class="feedback" id="mqnr3fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'énergie de l'état $|n\\rangle$ de l'oscillateur harmonique est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr3e2" value="wrong"> $n\\hbar\\omega$</label>
          <label class="option"><input type="radio" name="mqnr3e2" value="right"> $(n+\\frac{1}{2})\\hbar\\omega$</label>
          <label class="option"><input type="radio" name="mqnr3e2" value="wrong"> $n^2\\hbar\\omega$</label>
          <label class="option"><input type="radio" name="mqnr3e2" value="wrong"> $\\hbar\\omega/n$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr3e2','mqnr3fb2','Correct — E_n=(n+1/2)ℏω, avec le fameux terme d\\'énergie de point zéro 1/2·ℏω même dans l\\'état fondamental n=0.','Reporte la valeur propre de N dans Ĥ=ℏω(N̂+1/2).')">Vérifier</button>
        <div class="feedback" id="mqnr3fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'opérateur $\\hat a^\\dagger$ appliqué à $|n\\rangle$ donne :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr3e3" value="wrong"> $|n\\rangle$</label>
          <label class="option"><input type="radio" name="mqnr3e3" value="wrong"> $\\sqrt{n}\\,|n-1\\rangle$</label>
          <label class="option"><input type="radio" name="mqnr3e3" value="right"> $\\sqrt{n+1}\\,|n+1\\rangle$</label>
          <label class="option"><input type="radio" name="mqnr3e3" value="wrong"> $n\\,|n+1\\rangle$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr3e3','mqnr3fb3','Correct — â† est l\\'opérateur de création : il fait monter d\\'un échelon, avec le facteur de normalisation √(n+1).','Relis la formule d\\'action de l\\'opérateur de création du cours.')">Vérifier</button>
        <div class="feedback" id="mqnr3fb3"></div>
      </div>
    </div>
  `
};

MQNR_NOVA_KB[mqnrKey("L'oscillateur harmonique quantique : méthode algébrique")] = {
  intro: "Salut, moi c'est Nova ! On retrouve le spectre de l'oscillateur harmonique par la méthode algébrique de Dirac, sans équation différentielle. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/op[ée]rateur de cr[ée]ation|op[ée]rateur d.annihilation|[âa]\+|op[ée]rateurs d.[ée]chelle/i, replies:[
      "â annihile un quantum d'énergie (â|n⟩=√n|n−1⟩), â† en crée un (â†|n⟩=√(n+1)|n+1⟩). Leur commutateur est [â,â†]=1."
    ]},
    { test:/[ée]tat fondamental/i, replies:[
      "L'état fondamental |0⟩ est défini par â|0⟩=0 : c'est cette condition qui empêche une valeur propre négative de N̂ et impose n∈ℕ."
    ]},
    { test:/spectre|[ée]nergie/i, replies:[
      "Le spectre de l'oscillateur harmonique est En=(n+1/2)ℏω, retrouvé ici purement algébriquement via Ĥ=ℏω(N̂+1/2) et le spectre {0,1,2,...} de N̂=â†â."
    ]},
    { test:/op[ée]rateur nombre/i, replies:[
      "L'opérateur nombre N̂=â†â est hermitique (c'est une observable) et ses valeurs propres sont les entiers naturels 0,1,2,... — l'hamiltonien s'écrit simplement Ĥ=ℏω(N̂+1/2)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : quelle condition empêche une valeur propre négative de N̂ ?",
      "Indice niveau 2 : c'est une condition sur l'opérateur d'annihilation appliqué à l'état fondamental.",
      "Indice niveau 3 : â|0⟩=0."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : reporte la valeur propre n de N̂ dans Ĥ=ℏω(N̂+1/2).",
      "Indice niveau 2 : n'oublie pas le terme +1/2.",
      "Indice niveau 3 : En=(n+1/2)ℏω."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis la formule d'action de l'opérateur de création â†.",
      "Indice niveau 2 : il fait monter d'un échelon, avec un facteur de normalisation.",
      "Indice niveau 3 : â†|n⟩=√(n+1)|n+1⟩."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
MQNR_CHAPTERS[mqnrKey("Théorie générale du moment cinétique")] = {
  objectives: [
    "Définir un moment cinétique quantique par ses relations de commutation",
    "Introduire les opérateurs d'échelle J+, J− et en déduire le spectre de J² et Jz",
    "Retrouver la quantification par demi-entiers, un phénomène purement quantique",
    "Distinguer moment cinétique orbital (entier) et spin (entier ou demi-entier)"
  ],
  prereqs: ["L'oscillateur harmonique quantique : méthode algébrique", "Les postulats de la mécanique quantique"],
  bodyHtml: `
    <p>Le moment cinétique joue, en mécanique quantique, un rôle encore plus central qu'en mécanique classique : il organise la classification des états de l'atome d'hydrogène (chapitre 7), explique l'existence du spin (chapitre 6), et gouverne les règles de sélection des transitions atomiques. Ce chapitre en construit la théorie de façon <strong>purement algébrique</strong> — dans l'esprit du chapitre 3 — à partir d'une seule hypothèse : les relations de commutation.</p>

    <h3>1. Définition algébrique d'un moment cinétique</h3>
    <p>On appelle <strong>moment cinétique quantique</strong> tout ensemble de trois opérateurs hermitiques $\\hat J_x,\\hat J_y,\\hat J_z$ vérifiant les relations de commutation caractéristiques (analogues, par le principe de correspondance, au moment cinétique classique $\\vec L = \\vec r\\times\\vec p$) :</p>
    <div class="formula-box">$$[\\hat J_x,\\hat J_y] = i\\hbar\\,\\hat J_z, \\qquad [\\hat J_y,\\hat J_z] = i\\hbar\\,\\hat J_x, \\qquad [\\hat J_z,\\hat J_x] = i\\hbar\\,\\hat J_y$$</div>
    <p>On définit l'opérateur $\\hat J^2 = \\hat J_x^2+\\hat J_y^2+\\hat J_z^2$ (le module carré) ; un calcul direct montre que $\\hat J^2$ commute avec chacune des trois composantes : $[\\hat J^2,\\hat J_i]=0$. On peut donc chercher des états propres <strong>communs</strong> à $\\hat J^2$ et à <em>une seule</em> des composantes — par convention, $\\hat J_z$ (les trois composantes ne commutant pas entre elles, on ne peut pas les diagonaliser simultanément, chapitre 1 du cours de méthodes mathématiques).</p>

    <h3>2. Opérateurs d'échelle $\\hat J_+,\\hat J_-$</h3>
    <p>Exactement comme pour l'oscillateur harmonique, on introduit des opérateurs d'échelle :</p>
    <div class="formula-box">$$\\hat J_\\pm = \\hat J_x \\pm i\\hat J_y$$</div>
    <p>qui vérifient $[\\hat J_z,\\hat J_\\pm] = \\pm\\hbar\\,\\hat J_\\pm$ et $[\\hat J^2,\\hat J_\\pm]=0$. On note $|j,m\\rangle$ un état propre commun à $\\hat J^2$ (valeur propre $j(j+1)\\hbar^2$, par convention d'écriture) et $\\hat J_z$ (valeur propre $m\\hbar$). Comme au chapitre 3, on montre que $\\hat J_\\pm|j,m\\rangle$ est encore un état propre de $\\hat J_z$, avec valeur propre $(m\\pm 1)\\hbar$ :</p>
    <div class="formula-box">$$\\hat J_+|j,m\\rangle = \\hbar\\sqrt{j(j+1)-m(m+1)}\\,|j,m+1\\rangle, \\qquad \\hat J_-|j,m\\rangle = \\hbar\\sqrt{j(j+1)-m(m-1)}\\,|j,m-1\\rangle$$</div>

    <h3>3. Quantification : pourquoi $m$ est borné et $j$ demi-entier</h3>
    <p>Comme $\\hat J_x^2+\\hat J_y^2 = \\hat J^2 - \\hat J_z^2$ est un opérateur positif (somme de carrés d'opérateurs hermitiques), sa valeur moyenne est positive, ce qui impose $m^2 \\leq j(j+1)$ : pour $j$ fixé, $m$ est <strong>borné</strong>, $-j \\leq m \\leq j$. Pour ne pas générer, par applications successives de $\\hat J_+$, une valeur de $m$ dépassant cette borne, il faut qu'il existe une valeur maximale $m_{max}=j$ telle que $\\hat J_+|j,j\\rangle=0$ ; de même une valeur minimale $m_{min}=-j$ avec $\\hat J_-|j,-j\\rangle=0$. Comme on passe de $m_{min}$ à $m_{max}$ par sauts entiers d'une unité (applications successives de $\\hat J_+$), l'écart $m_{max}-m_{min}=2j$ doit être un <strong>entier positif ou nul</strong> :</p>
    <div class="formula-box">$$\\boxed{\\ j = 0, \\frac{1}{2}, 1, \\frac{3}{2}, 2, \\ldots \\qquad m = -j,-j+1,\\ldots,j-1,j\\ }$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — un résultat sans équivalent classique</span>
      Cette quantification par <strong>demi-entiers</strong> ($j=\\frac12,\\frac32,\\ldots$) n'a <em>aucun</em> analogue en mécanique classique, où le moment cinétique varie continûment. Elle est purement une conséquence de l'algèbre de commutation — et c'est précisément ce qui permettra, au chapitre 6, de décrire le spin $\\frac12$ de l'électron, qui n'a pas d'équivalent classique du tout.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour $j=1$, lister toutes les valeurs possibles de $m$, et calculer $\\hat J_+|1,0\\rangle$.</p>
      <p><strong>Solution :</strong> pour $j=1$, $m$ va de $-1$ à $1$ par pas de 1 : $m\\in\\{-1,0,1\\}$ (trois états, une multiplicité $2j+1=3$). Avec la formule : $\\hat J_+|1,0\\rangle = \\hbar\\sqrt{1(1+1)-0(0+1)}\\,|1,1\\rangle = \\hbar\\sqrt{2}\\,|1,1\\rangle$.</p>
      <p class="example-answer">$\\hat J_+|1,0\\rangle = \\hbar\\sqrt 2\\,|1,1\\rangle$ — trois états $|1,-1\\rangle,|1,0\\rangle,|1,1\\rangle$ pour ce moment cinétique $j=1$.</p>
    </div>

    <h3>4. Deux réalisations physiques : orbital et spin</h3>
    <p>La théorie algébrique qui vient d'être construite est <strong>générale</strong> : elle s'applique à toute grandeur physique vérifiant les relations de commutation du moment cinétique. Deux réalisations physiques importantes en découlent, étudiées dans les deux chapitres suivants :</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Valeurs de $j$ possibles</th><th>Origine physique</th></tr>
      <tr><td><strong>Moment cinétique orbital</strong> $\\hat L$</td><td>entiers uniquement : $\\ell=0,1,2,\\ldots$</td><td>lié au mouvement dans l'espace, $\\hat L=\\hat r\\times\\hat p$ (chapitre 5)</td></tr>
      <tr><td><strong>Spin</strong> $\\hat S$</td><td>entiers ou demi-entiers : $s=0,\\frac12,1,\\frac32,\\ldots$</td><td>degré de liberté interne sans équivalent classique (chapitre 6)</td></tr>
    </table>
    <p>On verra au chapitre suivant que la restriction du moment cinétique <em>orbital</em> aux seules valeurs entières découle d'une contrainte supplémentaire (l'univocité de la fonction d'onde en représentation position) qui n'existe pas pour le spin — d'où la possibilité des demi-entiers uniquement dans ce dernier cas.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un moment cinétique quantique est défini par $[\\hat J_x,\\hat J_y]=i\\hbar\\hat J_z$ (et permutations circulaires)</li>
        <li>États propres communs $|j,m\\rangle$ à $\\hat J^2$ (valeur propre $j(j+1)\\hbar^2$) et $\\hat J_z$ (valeur propre $m\\hbar$)</li>
        <li>Opérateurs d'échelle $\\hat J_\\pm=\\hat J_x\\pm i\\hat J_y$ font varier $m$ d'une unité, à $j$ fixé</li>
        <li>Quantification par entiers ou demi-entiers : $j=0,\\frac12,1,\\frac32,\\ldots$, avec $-j\\leq m\\leq j$ ($2j+1$ valeurs)</li>
        <li>Moment cinétique orbital : $j$ entier seulement ; spin : $j$ entier ou demi-entier</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que $\\hat J_x,\\hat J_y,\\hat J_z$ commutent entre elles : ce n'est pas le cas, on ne peut diagonaliser simultanément que $\\hat J^2$ et une seule composante</li>
        <li>Oublier le facteur $\\hbar$ dans les valeurs propres ($m\\hbar$ pour $\\hat J_z$, $j(j+1)\\hbar^2$ pour $\\hat J^2$, pas $j^2\\hbar^2$)</li>
        <li>Penser que la quantification demi-entière s'applique au moment cinétique orbital : ce sont seulement les valeurs entières qui sont physiquement réalisées pour $\\hat L$</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour un moment cinétique $j=\\frac{3}{2}$, combien de valeurs de $m$ sont possibles ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr4e1" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="mqnr4e1" value="right"> 4</label>
          <label class="option"><input type="radio" name="mqnr4e1" value="wrong"> 3</label>
          <label class="option"><input type="radio" name="mqnr4e1" value="wrong"> 1</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr4e1','mqnr4fb1','Correct — il y a 2j+1=2×1,5+1=4 valeurs : m=−3/2,−1/2,+1/2,+3/2.','Utilise la formule du nombre de valeurs de m : 2j+1.')">Vérifier</button>
        <div class="feedback" id="mqnr4fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La valeur propre de $\\hat J^2$ sur l'état $|j,m\\rangle$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr4e2" value="wrong"> $j^2\\hbar^2$</label>
          <label class="option"><input type="radio" name="mqnr4e2" value="right"> $j(j+1)\\hbar^2$</label>
          <label class="option"><input type="radio" name="mqnr4e2" value="wrong"> $m\\hbar$</label>
          <label class="option"><input type="radio" name="mqnr4e2" value="wrong"> $j\\hbar$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr4e2','mqnr4fb2','Correct — c\\'est la convention d\\'écriture j(j+1)ℏ², qui n\\'est PAS simplement j²ℏ² (piège classique).','Relis attentivement la définition de |j,m⟩ dans le cours : quelle est la valeur propre exacte de J², pas approximée ?')">Vérifier</button>
        <div class="feedback" id="mqnr4fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le moment cinétique orbital $\\hat L$ ne peut prendre que des valeurs de $j$ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr4e3" value="right"> entières</label>
          <label class="option"><input type="radio" name="mqnr4e3" value="wrong"> demi-entières</label>
          <label class="option"><input type="radio" name="mqnr4e3" value="wrong"> négatives</label>
          <label class="option"><input type="radio" name="mqnr4e3" value="wrong"> quelconques (continues)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr4e3','mqnr4fb3','Correct — contrairement au spin, le moment cinétique orbital est restreint aux valeurs entières l=0,1,2,..., à cause de l\\'univocité de la fonction d\\'onde (développé au chapitre suivant).','Relis le tableau du cours distinguant moment cinétique orbital et spin.')">Vérifier</button>
        <div class="feedback" id="mqnr4fb3"></div>
      </div>
    </div>
  `
};

MQNR_NOVA_KB[mqnrKey("Théorie générale du moment cinétique")] = {
  intro: "Salut, c'est Nova ! On construit la théorie algébrique du moment cinétique quantique. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/relations? de commutation|\[J/i, replies:[
      "Un moment cinétique quantique est défini par [Ĵx,Ĵy]=iℏĴz (et permutations circulaires). Ĵ² commute avec chaque composante, mais les composantes ne commutent pas entre elles."
    ]},
    { test:/j,m|\|j,m/i, replies:[
      "|j,m⟩ est état propre commun de Ĵ² (valeur propre j(j+1)ℏ²) et Ĵz (valeur propre mℏ), avec −j≤m≤j par pas de 1 (soit 2j+1 valeurs)."
    ]},
    { test:/demi.?entier/i, replies:[
      "La quantification par demi-entiers (j=0,1/2,1,3/2,...) est une conséquence purement algébrique des relations de commutation — sans aucun équivalent classique. Elle permet le spin 1/2, impossible pour un moment cinétique orbital."
    ]},
    { test:/j\+|j-|op[ée]rateurs d.[ée]chelle/i, replies:[
      "Ĵ± = Ĵx ± iĴy font varier m d'une unité à j fixé, exactement comme â,â† pour l'oscillateur harmonique — même logique algébrique, appliquée à un opérateur différent."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : utilise la formule du nombre de valeurs de m à j fixé.",
      "Indice niveau 2 : c'est 2j+1.",
      "Indice niveau 3 : pour j=3/2, ça donne 2×1,5+1=4."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis attentivement la valeur propre exacte de Ĵ² dans le cours.",
      "Indice niveau 2 : ce n'est pas simplement j²ℏ².",
      "Indice niveau 3 : c'est j(j+1)ℏ²."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis le tableau du cours distinguant moment cinétique orbital et spin.",
      "Indice niveau 2 : l'un des deux est restreint, l'autre peut être demi-entier.",
      "Indice niveau 3 : le moment cinétique orbital est restreint aux valeurs entières."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
MQNR_CHAPTERS[mqnrKey("Moment cinétique orbital et harmoniques sphériques")] = {
  objectives: [
    "Exprimer le moment cinétique orbital en représentation position et en coordonnées sphériques",
    "Justifier pourquoi le nombre quantique orbital ℓ est nécessairement entier",
    "Décrire les harmoniques sphériques comme fonctions propres communes de L² et Lz",
    "Interpréter physiquement les nombres quantiques ℓ et m (forme et orientation des orbitales)"
  ],
  prereqs: ["Théorie générale du moment cinétique"],
  bodyHtml: `
    <p>Le chapitre précédent a construit la théorie <strong>abstraite</strong> du moment cinétique, valable pour n'importe quelle réalisation physique. Ce chapitre l'applique au cas particulier du <strong>moment cinétique orbital</strong> $\\hat L = \\hat r \\times \\hat p$, directement lié au mouvement d'une particule dans l'espace — celui qui interviendra dans l'atome d'hydrogène (chapitre 7).</p>

    <h3>1. Le moment cinétique orbital en représentation position</h3>
    <p>En représentation position, avec $\\hat p = -i\\hbar\\vec\\nabla$, l'opérateur moment cinétique orbital s'écrit $\\hat L = \\hat r\\times\\hat p = -i\\hbar\\,\\vec r \\times \\vec\\nabla$. En coordonnées sphériques $(r,\\theta,\\varphi)$, un calcul (que l'on admet ici) montre que $\\hat L_z$ et $\\hat L^2$ ne dépendent que des angles, pas de $r$ :</p>
    <div class="formula-box">$$\\hat L_z = -i\\hbar\\,\\frac{\\partial}{\\partial \\varphi}, \\qquad \\hat L^2 = -\\hbar^2\\left[\\frac{1}{\\sin\\theta}\\frac{\\partial}{\\partial\\theta}\\!\\left(\\sin\\theta\\,\\frac{\\partial}{\\partial\\theta}\\right) + \\frac{1}{\\sin^2\\theta}\\frac{\\partial^2}{\\partial\\varphi^2}\\right]$$</div>
    <p>Cette structure explique pourquoi $\\hat L^2$ et $\\hat H$ commutent pour tout potentiel <strong>central</strong> $V(r)$ (qui ne dépend que de $r$, pas des angles) : le hamiltonien d'un problème à force centrale s'écrit $\\hat H = \\dfrac{\\hat p_r^2}{2m} + \\dfrac{\\hat L^2}{2mr^2} + V(r)$, et $\\hat L^2,\\hat L_z$ commutent avec $\\hat H$ — ce sera la clé de résolution de l'atome d'hydrogène.</p>

    <h3>2. Pourquoi $\\ell$ doit être entier : univocité de la fonction d'onde</h3>
    <p>Cherchons les fonctions propres $Y(\\theta,\\varphi)$ communes à $\\hat L_z$ et $\\hat L^2$. L'équation aux valeurs propres de $\\hat L_z$, $-i\\hbar\\,\\partial Y/\\partial\\varphi = m\\hbar\\,Y$, s'intègre immédiatement : $Y(\\theta,\\varphi) \\propto e^{im\\varphi}$. Mais l'angle $\\varphi$ et $\\varphi+2\\pi$ décrivent le <strong>même point</strong> de l'espace : la fonction d'onde doit donc être <strong>univoque</strong>, $Y(\\theta,\\varphi+2\\pi)=Y(\\theta,\\varphi)$, ce qui impose $e^{im\\cdot 2\\pi}=1$, donc $m$ <strong>entier</strong>.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — la contrainte manquante pour le spin</span>
      C'est cette contrainte de périodicité en $\\varphi$ — spécifique à une particule décrite par une fonction d'onde dans l'espace physique — qui interdit les valeurs demi-entières pour le moment cinétique <em>orbital</em>. Le spin (chapitre 6), qui n'est décrit par aucune fonction d'onde dans l'espace ordinaire, échappe à cette contrainte et peut prendre des valeurs demi-entières.
    </div>
    <p>Comme $m$ va de $-\\ell$ à $\\ell$ par pas entiers (chapitre 4), $m$ entier impose $\\ell$ <strong>entier</strong> également :</p>
    <div class="formula-box">$$\\ell = 0, 1, 2, 3, \\ldots \\qquad m = -\\ell,\\ldots,\\ell$$</div>

    <h3>3. Les harmoniques sphériques</h3>
    <p>Les fonctions propres communes normées de $\\hat L^2$ et $\\hat L_z$ sont les <strong>harmoniques sphériques</strong> $Y_\\ell^m(\\theta,\\varphi)$, fonctions spéciales bien connues (construites à partir des polynômes de Legendre associés) qui vérifient :</p>
    <div class="formula-box">$$\\hat L^2\\,Y_\\ell^m = \\ell(\\ell+1)\\hbar^2\\,Y_\\ell^m, \\qquad \\hat L_z\\,Y_\\ell^m = m\\hbar\\,Y_\\ell^m$$</div>
    <table class="mini-table">
      <tr><th>$\\ell$</th><th>Nom spectroscopique</th><th>Nombre d'orbitales ($2\\ell+1$)</th></tr>
      <tr><td>0</td><td>s (sharp)</td><td>1</td></tr>
      <tr><td>1</td><td>p (principal)</td><td>3</td></tr>
      <tr><td>2</td><td>d (diffuse)</td><td>5</td></tr>
      <tr><td>3</td><td>f (fundamental)</td><td>7</td></tr>
    </table>
    <p>Cette nomenclature (s, p, d, f...), historiquement issue de la spectroscopie atomique, est directement celle utilisée en chimie pour nommer les <strong>orbitales atomiques</strong> — les harmoniques sphériques en sont la partie angulaire.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> combien d'harmoniques sphériques existe-t-il pour $\\ell=2$, et quelles sont les valeurs de $m$ associées ?</p>
      <p><strong>Solution :</strong> pour $\\ell$ fixé, $m$ prend $2\\ell+1$ valeurs entières de $-\\ell$ à $\\ell$.</p>
      <p class="example-answer">Pour $\\ell=2$ : $2\\times 2+1=5$ harmoniques sphériques, avec $m\\in\\{-2,-1,0,1,2\\}$ — ce sont les 5 orbitales « d » de la chimie.</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <ellipse cx="70" cy="45" rx="55" ry="16" fill="none" stroke="#4C7CFF" stroke-width="1"/>
          <ellipse cx="70" cy="45" rx="16" ry="35" fill="none" stroke="#2DD4C4" stroke-width="1"/>
          <circle cx="70" cy="45" r="3" fill="#F0B94D"/>
          <text x="10" y="15" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">orbitale p (ℓ=1)</text>
        </svg>
        <span>les harmoniques sphériques donnent la forme angulaire des orbitales atomiques</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>$\\hat L_z=-i\\hbar\\,\\partial/\\partial\\varphi$, $\\hat L^2$ dépend seulement des angles $(\\theta,\\varphi)$</li>
        <li>L'univocité de $Y(\\theta,\\varphi)$ (périodicité $2\\pi$ en $\\varphi$) impose $m$, donc $\\ell$, entier — contrairement au spin</li>
        <li>Harmoniques sphériques $Y_\\ell^m$ : fonctions propres communes de $\\hat L^2$ (valeur propre $\\ell(\\ell+1)\\hbar^2$) et $\\hat L_z$ (valeur propre $m\\hbar$)</li>
        <li>Nomenclature spectroscopique s,p,d,f pour $\\ell=0,1,2,3$, avec $2\\ell+1$ orbitales à chaque $\\ell$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que la restriction aux valeurs entières de $\\ell$ vient spécifiquement de la représentation en fonction d'onde (univocité en $\\varphi$) — un argument qui ne s'applique pas au spin</li>
        <li>Confondre le nombre quantique $\\ell$ (moment cinétique orbital, lié à la forme de l'orbitale) et le nombre quantique principal $n$ (lié à l'énergie, chapitre 7)</li>
        <li>Se tromper dans le nombre d'orbitales à $\\ell$ fixé : c'est $2\\ell+1$, pas $\\ell+1$ ni $2\\ell$</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La restriction du moment cinétique orbital aux valeurs entières de $\\ell$ provient de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr5e1" value="wrong"> l'énergie de l'état fondamental</label>
          <label class="option"><input type="radio" name="mqnr5e1" value="right"> l'univocité de la fonction d'onde sous $\\varphi \\to \\varphi+2\\pi$</label>
          <label class="option"><input type="radio" name="mqnr5e1" value="wrong"> le principe d'exclusion de Pauli</label>
          <label class="option"><input type="radio" name="mqnr5e1" value="wrong"> la relation d'incertitude de Heisenberg</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr5e1','mqnr5fb1','Correct — c\\'est la périodicité 2π en φ, propre à une fonction d\\'onde définie dans l\\'espace physique, qui impose m entier puis ℓ entier.','Relis le point clé du cours sur la contrainte manquante pour le spin.')">Vérifier</button>
        <div class="feedback" id="mqnr5fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le nombre d'harmoniques sphériques (orbitales) pour $\\ell=3$ (orbitales f) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr5e2" value="wrong"> 3</label>
          <label class="option"><input type="radio" name="mqnr5e2" value="wrong"> 6</label>
          <label class="option"><input type="radio" name="mqnr5e2" value="right"> 7</label>
          <label class="option"><input type="radio" name="mqnr5e2" value="wrong"> 9</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr5e2','mqnr5fb2','Correct — 2ℓ+1=2×3+1=7 orbitales f, avec m allant de −3 à +3.','Utilise la formule 2ℓ+1 avec ℓ=3.')">Vérifier</button>
        <div class="feedback" id="mqnr5fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pourquoi $\\hat L^2$ commute-t-il avec l'hamiltonien d'un problème à force centrale $V(r)$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr5e3" value="wrong"> parce que $V(r)$ est toujours nul</label>
          <label class="option"><input type="radio" name="mqnr5e3" value="right"> parce que $\\hat L^2$ ne dépend que des angles, et $V(r)$ ne dépend que de $r$ : ils commutent trivialement, et le terme cinétique radial commute aussi avec $\\hat L^2$</label>
          <label class="option"><input type="radio" name="mqnr5e3" value="wrong"> parce que l'énergie totale est conservée</label>
          <label class="option"><input type="radio" name="mqnr5e3" value="wrong"> parce que le spin est nul</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr5e3','mqnr5fb3','Correct — la séparation angles/rayon de Ĥ pour un potentiel central est exactement ce qui garantit que L² est une constante du mouvement quantique, utile pour résoudre l\\'atome d\\'hydrogène au chapitre 7.','Repense à la décomposition de Ĥ en une partie radiale et une partie angulaire (L²) pour un potentiel central.')">Vérifier</button>
        <div class="feedback" id="mqnr5fb3"></div>
      </div>
    </div>
  `
};

MQNR_NOVA_KB[mqnrKey("Moment cinétique orbital et harmoniques sphériques")] = {
  intro: "Salut, c'est Nova ! On applique la théorie du moment cinétique au cas orbital, avec les harmoniques sphériques. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/univocit[ée]|2π|p[ée]riodicit[ée]/i, replies:[
      "La fonction d'onde doit être la même en φ et φ+2π (même point de l'espace), ce qui impose m entier, donc ℓ entier — une contrainte spécifique au moment cinétique orbital, absente pour le spin."
    ]},
    { test:/harmoniques sph[ée]riques/i, replies:[
      "Les harmoniques sphériques Yℓm(θ,φ) sont les fonctions propres communes de L² (valeur propre ℓ(ℓ+1)ℏ²) et Lz (valeur propre mℏ). Elles donnent la forme angulaire des orbitales atomiques."
    ]},
    { test:/spdf|nomenclature|orbitale/i, replies:[
      "La nomenclature s,p,d,f correspond à ℓ=0,1,2,3, avec respectivement 1, 3, 5, 7 orbitales (formule 2ℓ+1)."
    ]},
    { test:/potentiel central/i, replies:[
      "Pour un potentiel central V(r), L² commute avec H car L² ne dépend que des angles et V(r) que du rayon — c'est cette séparation qui rend l'atome d'hydrogène soluble (chapitre 7)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le point clé sur la contrainte manquante pour le spin.",
      "Indice niveau 2 : ça concerne la périodicité de la fonction d'onde en φ.",
      "Indice niveau 3 : c'est l'univocité sous φ→φ+2π."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : utilise la formule 2ℓ+1.",
      "Indice niveau 2 : avec ℓ=3, ça donne 2×3+1.",
      "Indice niveau 3 : 7 orbitales."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : repense à la décomposition de Ĥ pour un potentiel central.",
      "Indice niveau 2 : Ĥ se sépare en une partie radiale et une partie angulaire (L²).",
      "Indice niveau 3 : L² ne dépend que des angles, V(r) que du rayon — ils commutent naturellement."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
MQNR_CHAPTERS[mqnrKey("Le spin 1/2 et l'addition de moments cinétiques")] = {
  objectives: [
    "Décrire le spin 1/2 comme moment cinétique intrinsèque, sans équivalent classique",
    "Manipuler les matrices de Pauli et l'espace des états de spin",
    "Comprendre le principe de l'addition de deux moments cinétiques",
    "Décomposer le produit de deux spins 1/2 en un triplet et un singulet"
  ],
  prereqs: ["Théorie générale du moment cinétique", "Moment cinétique orbital et harmoniques sphériques"],
  bodyHtml: `
    <p>Le chapitre 4 a montré que la théorie algébrique du moment cinétique autorise des valeurs demi-entières, mais que le moment cinétique <em>orbital</em> — lié au mouvement dans l'espace — ne peut en réalité prendre que des valeurs entières (chapitre 5). Le <strong>spin</strong>, degré de liberté purement quantique découvert expérimentalement (Stern-Gerlach, 1922 ; postulé par Pauli en 1925 ; interprété par Goudsmit et Uhlenbeck), occupe exactement l'espace laissé vacant par cette contrainte : il réalise physiquement les valeurs demi-entières.</p>

    <h3>1. Le spin : un moment cinétique sans mouvement dans l'espace</h3>
    <p>Le spin $\\hat{\\vec S}$ est un moment cinétique au sens du chapitre 4 (mêmes relations de commutation $[\\hat S_x,\\hat S_y]=i\\hbar\\hat S_z$, etc.), mais il <strong>n'agit pas</strong> sur les degrés de liberté spatiaux $(r,\\theta,\\varphi)$ de la particule : c'est un degré de liberté <em>interne</em>, purement quantique, sans image classique satisfaisante (l'image d'une « toupie qui tourne sur elle-même », suggérée par le nom, est trompeuse et ne doit pas être prise au pied de la lettre). L'électron a un spin $s=\\frac12$, fixé une fois pour toutes — ce n'est pas une variable dynamique comme $\\ell$, mais une <strong>caractéristique intrinsèque</strong> de la particule, comme sa masse ou sa charge.</p>

    <h3>2. L'espace des états de spin 1/2 et les matrices de Pauli</h3>
    <p>Pour $s=\\frac12$, il y a $2s+1=2$ états possibles, notés $|+\\rangle=|\\frac12,\\frac12\\rangle$ et $|-\\rangle=|\\frac12,-\\frac12\\rangle$ (ou $|\\uparrow\\rangle,|\\downarrow\\rangle$). Dans cette base à deux dimensions, les opérateurs de spin s'écrivent $\\hat S_i = \\frac{\\hbar}{2}\\hat\\sigma_i$, où les $\\hat\\sigma_i$ sont les <strong>matrices de Pauli</strong> :</p>
    <div class="formula-box">$$\\sigma_x = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}, \\quad \\sigma_y = \\begin{pmatrix}0&-i\\\\i&0\\end{pmatrix}, \\quad \\sigma_z = \\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$$</div>
    <p>On vérifie que ces matrices redonnent bien les relations de commutation du moment cinétique, ainsi qu'une propriété remarquable propre au spin 1/2 : $\\hat\\sigma_i^2 = \\hat{\\mathbb 1}$, et $\\{\\hat\\sigma_i,\\hat\\sigma_j\\}=0$ pour $i\\neq j$ (anticommutation).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> dans la base $\\{|+\\rangle,|-\\rangle\\}$ où $|+\\rangle=\\begin{pmatrix}1\\\\0\\end{pmatrix}$, $|-\\rangle=\\begin{pmatrix}0\\\\1\\end{pmatrix}$, calculer $\\hat S_x|+\\rangle$.</p>
      <p><strong>Solution :</strong> $\\hat S_x|+\\rangle = \\dfrac{\\hbar}{2}\\sigma_x\\begin{pmatrix}1\\\\0\\end{pmatrix} = \\dfrac{\\hbar}{2}\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}\\begin{pmatrix}1\\\\0\\end{pmatrix} = \\dfrac{\\hbar}{2}\\begin{pmatrix}0\\\\1\\end{pmatrix}$.</p>
      <p class="example-answer">$\\hat S_x|+\\rangle = \\dfrac{\\hbar}{2}|-\\rangle$ : un état préparé « spin up selon $z$ » n'est pas un état propre de $\\hat S_x$ — mesurer le spin selon $x$ sur cet état donnerait $+\\hbar/2$ ou $-\\hbar/2$ avec probabilité $\\frac12$ chacun (règle de Born, chapitre 2).</p>
    </div>

    <h3>3. Le principe de l'addition de moments cinétiques</h3>
    <p>Un système physique possède souvent <strong>plusieurs</strong> moments cinétiques (orbital et spin d'une même particule, spins de deux particules distinctes...). Le moment cinétique <strong>total</strong> $\\hat{\\vec J} = \\hat{\\vec J}_1 + \\hat{\\vec J}_2$ vérifie encore les relations de commutation du chapitre 4 (on peut le vérifier directement), et possède donc lui aussi des états propres $|j,m\\rangle$. La question de l'<strong>addition de moments cinétiques</strong> est : comment les états $|j_1,m_1\\rangle\\otimes|j_2,m_2\\rangle$ (base « découplée », naturelle si l'on connaît séparément chaque moment cinétique) se réexpriment-ils en fonction des états $|j,m\\rangle$ du moment cinétique total (base « couplée ») ?</p>
    <div class="key-point">
      <span class="eyebrow">Règle de Clebsch-Gordan (résultat général, admis)</span>
      Pour deux moments cinétiques $j_1$ et $j_2$, le moment cinétique total $j$ prend toutes les valeurs comprises entre $|j_1-j_2|$ et $j_1+j_2$, par pas entiers :
      $$j = |j_1-j_2|, |j_1-j_2|+1, \\ldots, j_1+j_2$$
      Les coefficients numériques reliant les deux bases sont les <strong>coefficients de Clebsch-Gordan</strong>, tabulés dans toute référence de mécanique quantique.
    </div>

    <h3>4. Exemple central : addition de deux spins 1/2</h3>
    <p>Considérons deux particules de spin $\\frac12$ (par exemple les deux électrons d'un atome d'hélium, chapitre 8). La règle précédente donne $j = |\\frac12-\\frac12|,\\ldots,\\frac12+\\frac12 = 0$ ou $1$. La base couplée se décompose ainsi en :</p>
    <table class="mini-table">
      <tr><th>Sous-espace</th><th>États (base couplée)</th><th>Dimension</th></tr>
      <tr><td><strong>Triplet</strong> ($j=1$)</td><td>$|1,1\\rangle=|{+}{+}\\rangle$ ; $|1,0\\rangle=\\frac{1}{\\sqrt2}(|{+}{-}\\rangle+|{-}{+}\\rangle)$ ; $|1,-1\\rangle=|{-}{-}\\rangle$</td><td>3</td></tr>
      <tr><td><strong>Singulet</strong> ($j=0$)</td><td>$|0,0\\rangle=\\frac{1}{\\sqrt2}(|{+}{-}\\rangle-|{-}{+}\\rangle)$</td><td>1</td></tr>
    </table>
    <p>Total : $3+1=4$ états, qui correspond bien à la dimension du produit tensoriel $2\\times 2=4$ des deux espaces de spin individuels — la règle d'addition ne crée ni ne détruit d'états, elle les <strong>réorganise</strong> simplement selon les valeurs propres du moment cinétique total.</p>
    <div class="key-point">
      <span class="eyebrow">Aperçu — importance pour les particules identiques</span>
      L'état singulet est <strong>antisymétrique</strong> par échange des deux spins, tandis que les trois états du triplet sont <strong>symétriques</strong>. Cette (anti)symétrie jouera un rôle essentiel dès qu'on combine spin et partie spatiale pour deux électrons identiques (principe d'exclusion de Pauli, abordé en chimie quantique) — un sujet qui dépasse le cadre de ce cours mais dont les bases sont posées ici.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le spin est un moment cinétique intrinsèque, sans degré de liberté spatial associé — l'électron a $s=\\frac12$, fixé une fois pour toutes</li>
        <li>Pour $s=\\frac12$ : 2 états $|\\pm\\rangle$, opérateurs $\\hat S_i=\\frac{\\hbar}{2}\\sigma_i$ via les matrices de Pauli</li>
        <li>Addition de moments cinétiques : $j$ va de $|j_1-j_2|$ à $j_1+j_2$ par pas entiers (règle de Clebsch-Gordan)</li>
        <li>Deux spins $\\frac12$ : triplet $j=1$ (3 états symétriques) + singulet $j=0$ (1 état antisymétrique) = 4 états au total</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Imaginer le spin comme une véritable rotation physique de la particule sur elle-même — c'est une image commode mais trompeuse, sans base physique réelle</li>
        <li>Oublier que le moment cinétique total $j$ ne prend pas <em>toutes</em> les valeurs entre 0 et $j_1+j_2$, mais seulement celles entre $|j_1-j_2|$ et $j_1+j_2$</li>
        <li>Confondre l'état $|1,0\\rangle$ du triplet et l'état $|0,0\\rangle$ du singulet : les deux sont des combinaisons de $|{+}{-}\\rangle$ et $|{-}{+}\\rangle$, mais avec un signe relatif différent (symétrique vs antisymétrique)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le spin d'une particule comme l'électron est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr6e1" value="wrong"> une variable dynamique qui peut changer librement au cours du temps</label>
          <label class="option"><input type="radio" name="mqnr6e1" value="right"> une caractéristique intrinsèque fixe, comme la masse ou la charge</label>
          <label class="option"><input type="radio" name="mqnr6e1" value="wrong"> une rotation physique réelle de la particule sur elle-même</label>
          <label class="option"><input type="radio" name="mqnr6e1" value="wrong"> une propriété qui n'existe que pour les atomes, pas les particules isolées</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr6e1','mqnr6fb1','Correct — le spin s (par exemple s=1/2 pour l\\'électron) est une caractéristique fixe de la particule, pas une variable dynamique comme sa position.','Relis le cours : s est-il fixé une fois pour toutes, ou peut-il varier comme ℓ ?')">Vérifier</button>
        <div class="feedback" id="mqnr6fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour l'addition de deux moments cinétiques $j_1=1$ et $j_2=2$, quelles sont les valeurs possibles du moment cinétique total $j$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr6e2" value="wrong"> seulement $j=3$</label>
          <label class="option"><input type="radio" name="mqnr6e2" value="right"> $j=1,2,3$</label>
          <label class="option"><input type="radio" name="mqnr6e2" value="wrong"> $j=0,1,2,3$</label>
          <label class="option"><input type="radio" name="mqnr6e2" value="wrong"> $j=1,3$ seulement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr6e2','mqnr6fb2','Correct — j va de |j1−j2|=1 à j1+j2=3 par pas entiers : j=1, 2, 3.','Applique la règle de Clebsch-Gordan : j va de |j1−j2| à j1+j2 par pas de 1.')">Vérifier</button>
        <div class="feedback" id="mqnr6fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour deux spins 1/2, l'état singulet $j=0$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr6e3" value="wrong"> symétrique par échange des deux spins</label>
          <label class="option"><input type="radio" name="mqnr6e3" value="right"> antisymétrique par échange des deux spins</label>
          <label class="option"><input type="radio" name="mqnr6e3" value="wrong"> identique à l'état $|1,0\\rangle$ du triplet</label>
          <label class="option"><input type="radio" name="mqnr6e3" value="wrong"> de dimension 3</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr6e3','mqnr6fb3','Correct — le singulet |0,0⟩=(|+−⟩−|−+⟩)/√2 change de signe si l\\'on échange les deux spins : il est antisymétrique, contrairement aux 3 états du triplet qui sont symétriques.','Compare les signes dans les expressions de |1,0⟩ et |0,0⟩ données dans le tableau du cours.')">Vérifier</button>
        <div class="feedback" id="mqnr6fb3"></div>
      </div>
    </div>
  `
};

MQNR_NOVA_KB[mqnrKey("Le spin 1/2 et l'addition de moments cinétiques")] = {
  intro: "Salut, moi c'est Nova ! On explore le spin 1/2 et l'addition de moments cinétiques. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/spin/i, replies:[
      "Le spin est un moment cinétique intrinsèque, sans lien avec le mouvement spatial de la particule : c'est une caractéristique fixe (comme s=1/2 pour l'électron), pas une variable dynamique. Attention à ne pas l'imaginer comme une vraie rotation physique."
    ]},
    { test:/pauli|matrices/i, replies:[
      "Les matrices de Pauli σx,σy,σz représentent les composantes du spin 1/2 via Ŝi=(ℏ/2)σi. Elles vérifient σi²=1̂ et anticommutent deux à deux."
    ]},
    { test:/clebsch|addition de moments/i, replies:[
      "La règle de Clebsch-Gordan : pour additionner j1 et j2, le moment cinétique total j prend toutes les valeurs entières entre |j1−j2| et j1+j2."
    ]},
    { test:/triplet|singulet/i, replies:[
      "Deux spins 1/2 donnent un triplet j=1 (3 états symétriques) et un singulet j=0 (1 état antisymétrique) — 3+1=4 états au total, comme attendu (2×2=4)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : le spin peut-il varier au cours du temps comme ℓ, ou est-il fixé ?",
      "Indice niveau 2 : c'est une caractéristique intrinsèque, comme la masse.",
      "Indice niveau 3 : c'est bien une caractéristique fixe de la particule."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : applique la règle de Clebsch-Gordan avec j1=1 et j2=2.",
      "Indice niveau 2 : |j1−j2|=1 et j1+j2=3.",
      "Indice niveau 3 : donc j=1, 2, 3."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : compare les signes dans |1,0⟩ et |0,0⟩ donnés dans le tableau du cours.",
      "Indice niveau 2 : l'un a un signe +, l'autre un signe −.",
      "Indice niveau 3 : le singulet |0,0⟩ (signe −) est antisymétrique."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
MQNR_CHAPTERS[mqnrKey("L'atome d'hydrogène : potentiel central et quantification")] = {
  objectives: [
    "Séparer l'équation de Schrödinger d'un potentiel central en parties radiale et angulaire",
    "Établir la structure des niveaux d'énergie de l'atome d'hydrogène et la dégénérescence en n²",
    "Identifier les trois nombres quantiques n, ℓ, m et leurs domaines de validité",
    "Interpréter les orbitales atomiques comme fonctions propres communes de H, L² et Lz"
  ],
  prereqs: ["Moment cinétique orbital et harmoniques sphériques", "L'atome d'hydrogène et le spin de l'électron (Introduction à la mécanique quantique, L2)"],
  bodyHtml: `
    <p>L'atome d'hydrogène — un électron soumis au potentiel coulombien attractif d'un proton — est le seul système à plusieurs dimensions dont l'équation de Schrödinger se résout <strong>exactement</strong> ; ce fait, presque miraculeux, en fait la pierre de Rosette de toute la physique atomique. Le cours de L2 en a donné le résultat final (niveaux d'énergie, notion d'orbitale) ; ce chapitre en établit la structure grâce aux outils des chapitres 5 et 6 : la séparation angles/rayon pour un potentiel central.</p>

    <h3>1. Le hamiltonien et la séparation des variables</h3>
    <p>Le hamiltonien de l'atome d'hydrogène (dans l'approximation où le proton, beaucoup plus lourd, est considéré comme fixe) s'écrit, en coordonnées sphériques :</p>
    <div class="formula-box">$$\\hat H = \\frac{\\hat p_r^2}{2m} + \\frac{\\hat L^2}{2mr^2} - \\frac{e^2}{4\\pi\\varepsilon_0 r}$$</div>
    <p>C'est un potentiel <strong>central</strong> $V(r) = -\\dfrac{e^2}{4\\pi\\varepsilon_0 r}$ : d'après le chapitre 5, $\\hat H$, $\\hat L^2$ et $\\hat L_z$ commutent deux à deux, on peut donc chercher des états propres <strong>communs</strong> aux trois. On cherche la fonction d'onde sous la forme séparée :</p>
    <div class="formula-box">$$\\psi_{n\\ell m}(r,\\theta,\\varphi) = R_{n\\ell}(r)\\,Y_\\ell^m(\\theta,\\varphi)$$</div>
    <p>où la partie angulaire est automatiquement une harmonique sphérique (chapitre 5), et où toute la difficulté du problème se réduit à une <strong>équation radiale</strong> à une seule variable $r$ pour $R_{n\\ell}(r)$ :</p>
    <div class="formula-box">$$-\\frac{\\hbar^2}{2m}\\frac{1}{r^2}\\frac{d}{dr}\\!\\left(r^2\\frac{dR}{dr}\\right) + \\left[\\frac{\\hbar^2\\ell(\\ell+1)}{2mr^2} - \\frac{e^2}{4\\pi\\varepsilon_0 r}\\right]R = E\\,R$$</div>
    <p>Le terme $\\dfrac{\\hbar^2\\ell(\\ell+1)}{2mr^2}$ joue le rôle d'un <strong>potentiel effectif centrifuge</strong> répulsif, exactement l'analogue quantique du terme centrifuge de la mécanique classique (moment cinétique orbital) rencontré pour le problème de Kepler.</p>

    <h3>2. Quantification de l'énergie : le nombre quantique principal</h3>
    <p>La résolution mathématique de l'équation radiale (par une méthode analogue à celle de l'oscillateur harmonique, faisant apparaître les polynômes de Laguerre) impose, pour que la solution reste normalisable ($R\\to 0$ à l'infini), une condition de quantification faisant intervenir un entier $n$, le <strong>nombre quantique principal</strong>, avec $n \\geq \\ell+1$ (soit $\\ell \\leq n-1$). Le spectre d'énergie obtenu, identique à celui du modèle de Bohr, ne dépend que de $n$ :</p>
    <div class="formula-box">$$\\boxed{\\ E_n = -\\frac{m e^4}{2(4\\pi\\varepsilon_0)^2\\hbar^2}\\,\\frac{1}{n^2} = -\\frac{13{,}6\\ \\text{eV}}{n^2}, \\qquad n = 1,2,3,\\ldots\\ }$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — une coïncidence remarquable du potentiel coulombien</span>
      Fait exceptionnel parmi les potentiels centraux, l'énergie de l'atome d'hydrogène ne dépend <strong>que</strong> de $n$, pas séparément de $\\ell$ — une <strong>dégénérescence accidentelle</strong> propre au potentiel en $1/r$ (elle disparaît, par exemple, dès qu'on ajoute une petite correction au potentiel, comme en théorie des perturbations, chapitre 8). Pour un potentiel central quelconque, l'énergie dépendrait en général de $n$ <em>et</em> de $\\ell$ séparément.
    </div>

    <h3>3. Les trois nombres quantiques et la dégénérescence</h3>
    <table class="mini-table">
      <tr><th>Nombre quantique</th><th>Domaine de valeurs</th><th>Grandeur associée</th></tr>
      <tr><td>$n$ (principal)</td><td>$1, 2, 3, \\ldots$</td><td>Énergie $E_n$</td></tr>
      <tr><td>$\\ell$ (secondaire, orbital)</td><td>$0, 1, \\ldots, n-1$</td><td>Moment cinétique orbital, $\\hat L^2$</td></tr>
      <tr><td>$m$ (magnétique)</td><td>$-\\ell,\\ldots,\\ell$</td><td>Projection du moment cinétique, $\\hat L_z$</td></tr>
    </table>
    <p>Pour un $n$ donné, le nombre d'états $(\\ell,m)$ compatibles (donc la <strong>dégénérescence</strong> du niveau d'énergie $E_n$) se calcule en sommant $2\\ell+1$ pour $\\ell$ de $0$ à $n-1$ :</p>
    <div class="formula-box">$$g_n = \\sum_{\\ell=0}^{n-1}(2\\ell+1) = n^2$$</div>
    <p>(en négligeant le spin ; avec le spin de l'électron, $2s+1=2$, la dégénérescence totale devient $2n^2$ — c'est ce facteur qui structure le tableau périodique en blocs, en chimie quantique).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> lister toutes les orbitales (valeurs de $\\ell$ et $m$) du niveau $n=3$, et vérifier la dégénérescence.</p>
      <p><strong>Solution :</strong> $\\ell$ va de $0$ à $n-1=2$ : $\\ell=0$ (1 orbitale « 3s »), $\\ell=1$ (3 orbitales « 3p »), $\\ell=2$ (5 orbitales « 3d »).</p>
      <p class="example-answer">Total : $1+3+5=9=3^2$ orbitales — conforme à $g_n=n^2$, toutes de même énergie $E_3=-13{,}6/9 \\approx -1{,}51\\,\\text{eV}$.</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 100" width="100%">
          <line x1="15" y1="90" x2="15" y2="10" stroke="#5A6472" stroke-width="1"/>
          <line x1="15" y1="80" x2="120" y2="80" stroke="#F0B94D" stroke-width="1.5"/>
          <text x="122" y="83" font-family="IBM Plex Mono" font-size="7" fill="#F0B94D">n=1</text>
          <line x1="15" y1="45" x2="120" y2="45" stroke="#2DD4C4" stroke-width="1.5"/>
          <text x="122" y="48" font-family="IBM Plex Mono" font-size="7" fill="#2DD4C4">n=2</text>
          <line x1="15" y1="28" x2="120" y2="28" stroke="#4C7CFF" stroke-width="1.5"/>
          <text x="122" y="31" font-family="IBM Plex Mono" font-size="7" fill="#4C7CFF">n=3</text>
          <line x1="15" y1="12" x2="120" y2="12" stroke="#8B7CF6" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="122" y="15" font-family="IBM Plex Mono" font-size="7" fill="#8B7CF6">E=0</text>
        </svg>
        <span>niveaux d'énergie $E_n \\propto -1/n^2$, resserrés vers $E=0$</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>$\\psi_{n\\ell m}(r,\\theta,\\varphi)=R_{n\\ell}(r)\\,Y_\\ell^m(\\theta,\\varphi)$ : séparation radiale/angulaire pour tout potentiel central</li>
        <li>$E_n = -13{,}6\\,\\text{eV}/n^2$ : dépend seulement de $n$, dégénérescence accidentelle propre au potentiel coulombien</li>
        <li>Trois nombres quantiques : $n\\geq 1$, $0\\leq\\ell\\leq n-1$, $-\\ell\\leq m\\leq\\ell$</li>
        <li>Dégénérescence du niveau $n$ (sans spin) : $g_n=n^2$ ; avec spin : $2n^2$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que l'énergie de l'atome d'hydrogène dépend de $\\ell$ : c'est une propriété <em>spécifique</em> au potentiel en $1/r$, pas générale à tous les potentiels centraux</li>
        <li>Oublier la contrainte $\\ell \\leq n-1$ : pour $n=1$, seul $\\ell=0$ est permis (pas d'orbitale « 1p »)</li>
        <li>Confondre le potentiel centrifuge effectif $\\hbar^2\\ell(\\ell+1)/2mr^2$ (qui vient du moment cinétique) avec le potentiel coulombien réel $-e^2/4\\pi\\varepsilon_0 r$</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour $n=2$, quelles valeurs de $\\ell$ sont permises ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr7e1" value="wrong"> $\\ell=2$ seulement</label>
          <label class="option"><input type="radio" name="mqnr7e1" value="right"> $\\ell=0$ et $\\ell=1$</label>
          <label class="option"><input type="radio" name="mqnr7e1" value="wrong"> $\\ell=0,1,2$</label>
          <label class="option"><input type="radio" name="mqnr7e1" value="wrong"> $\\ell=1$ seulement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr7e1','mqnr7fb1','Correct — la contrainte est 0≤ℓ≤n−1, donc pour n=2 : ℓ=0 (orbitale 2s) et ℓ=1 (orbitales 2p).','Applique la contrainte 0≤ℓ≤n−1 avec n=2.')">Vérifier</button>
        <div class="feedback" id="mqnr7fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La dégénérescence du niveau $n=4$ de l'atome d'hydrogène (sans spin) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr7e2" value="wrong"> 4</label>
          <label class="option"><input type="radio" name="mqnr7e2" value="wrong"> 8</label>
          <label class="option"><input type="radio" name="mqnr7e2" value="right"> 16</label>
          <label class="option"><input type="radio" name="mqnr7e2" value="wrong"> 32</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr7e2','mqnr7fb2','Correct — gn=n²=4²=16 états dégénérés en énergie pour n=4 (sans compter le spin).','Utilise la formule gn=n² avec n=4.')">Vérifier</button>
        <div class="feedback" id="mqnr7fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le fait que $E_n$ ne dépende pas de $\\ell$ dans l'atome d'hydrogène est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr7e3" value="wrong"> une propriété générale de tout potentiel central</label>
          <label class="option"><input type="radio" name="mqnr7e3" value="right"> une dégénérescence accidentelle spécifique au potentiel coulombien en $1/r$</label>
          <label class="option"><input type="radio" name="mqnr7e3" value="wrong"> une conséquence du spin de l'électron</label>
          <label class="option"><input type="radio" name="mqnr7e3" value="wrong"> une approximation grossière, fausse en réalité</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr7e3','mqnr7fb3','Correct — c\\'est une dégénérescence accidentelle propre au potentiel en 1/r, qui disparaît dès qu\\'on perturbe légèrement ce potentiel (chapitre suivant).','Relis le point clé du cours sur la coïncidence remarquable du potentiel coulombien.')">Vérifier</button>
        <div class="feedback" id="mqnr7fb3"></div>
      </div>
    </div>
  `
};

MQNR_NOVA_KB[mqnrKey("L'atome d'hydrogène : potentiel central et quantification")] = {
  intro: "Salut, c'est Nova ! On résout l'atome d'hydrogène grâce à la séparation angles/rayon. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/s[ée]paration|radiale/i, replies:[
      "Pour un potentiel central, ψ(r,θ,φ)=Rnℓ(r)·Yℓm(θ,φ) : la partie angulaire est une harmonique sphérique (chapitre 5), toute la difficulté se réduit à l'équation radiale pour Rnℓ(r)."
    ]},
    { test:/13,6|niveaux d.[ée]nergie|spectre/i, replies:[
      "En=−13,6 eV/n², ne dépendant que du nombre quantique principal n. C'est une dégénérescence accidentelle propre au potentiel coulombien en 1/r."
    ]},
    { test:/nombre quantique/i, replies:[
      "Trois nombres quantiques : n≥1 (énergie), 0≤ℓ≤n−1 (moment cinétique orbital), −ℓ≤m≤ℓ (projection selon z)."
    ]},
    { test:/d[ée]g[ée]n[ée]rescence/i, replies:[
      "La dégénérescence du niveau n est gn=n² (sans spin), ou 2n² en comptant le spin de l'électron (2 états de spin par orbitale)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : applique la contrainte 0≤ℓ≤n−1 avec n=2.",
      "Indice niveau 2 : ℓ peut valoir 0 ou 1.",
      "Indice niveau 3 : ℓ=0 (2s) et ℓ=1 (2p)."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : utilise la formule gn=n².",
      "Indice niveau 2 : avec n=4, ça donne 4².",
      "Indice niveau 3 : gn=16."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis le point clé sur la coïncidence remarquable du potentiel coulombien.",
      "Indice niveau 2 : c'est une propriété spécifique, pas générale à tout potentiel central.",
      "Indice niveau 3 : c'est une dégénérescence accidentelle liée au potentiel en 1/r."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
MQNR_CHAPTERS[mqnrKey("Théorie des perturbations stationnaires")] = {
  objectives: [
    "Identifier les situations où l'équation de Schrödinger n'est pas résoluble exactement",
    "Établir les corrections au premier ordre de l'énergie et de l'état propre en théorie des perturbations",
    "Traiter le cas des niveaux dégénérés et la levée de dégénérescence",
    "Appliquer la méthode à un exemple simple (effet Stark, effet d'une perturbation sur l'oscillateur)"
  ],
  prereqs: ["L'atome d'hydrogène : potentiel central et quantification", "L'oscillateur harmonique quantique : méthode algébrique"],
  bodyHtml: `
    <p>L'atome d'hydrogène (chapitre 7) et l'oscillateur harmonique (chapitre 3) comptent parmi les <strong>rares</strong> systèmes quantiques dont le spectre se calcule exactement. Dès qu'on ajoute une perturbation réaliste — un champ électrique ou magnétique extérieur, l'interaction entre deux électrons, une correction relativiste — l'équation de Schrödinger devient en général insoluble analytiquement. La <strong>théorie des perturbations</strong> fournit une méthode systématique pour obtenir des solutions <strong>approchées</strong>, sous forme de développement en puissances d'un petit paramètre.</p>

    <h3>1. Position du problème</h3>
    <p>On suppose connu exactement le spectre d'un hamiltonien <strong>non perturbé</strong> $\\hat H_0$ : $\\hat H_0|n^{(0)}\\rangle = E_n^{(0)}|n^{(0)}\\rangle$ (par exemple l'atome d'hydrogène ou l'oscillateur harmonique). On s'intéresse au hamiltonien complet :</p>
    <div class="formula-box">$$\\hat H = \\hat H_0 + \\lambda\\,\\hat W$$</div>
    <p>où $\\hat W$ est la <strong>perturbation</strong> et $\\lambda$ un petit paramètre sans dimension ($\\lambda \\ll 1$), qu'on fera tendre vers $1$ à la fin du calcul (il ne sert qu'à organiser le développement en puissances croissantes). On cherche l'énergie $E_n$ et l'état $|n\\rangle$ du système perturbé sous forme de <strong>séries</strong> :</p>
    <div class="formula-box">$$E_n = E_n^{(0)} + \\lambda E_n^{(1)} + \\lambda^2 E_n^{(2)} + \\ldots, \\qquad |n\\rangle = |n^{(0)}\\rangle + \\lambda|n^{(1)}\\rangle + \\ldots$$</div>

    <h3>2. Correction au premier ordre : cas non dégénéré</h3>
    <p>En reportant ces développements dans l'équation aux valeurs propres $\\hat H|n\\rangle=E_n|n\\rangle$ et en identifiant les termes de même puissance de $\\lambda$, on obtient, à l'ordre 1 (démonstration standard, omise ici) :</p>
    <div class="formula-box">$$\\boxed{\\ E_n^{(1)} = \\langle n^{(0)}|\\hat W|n^{(0)}\\rangle\\ }$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — un résultat d'une simplicité trompeuse</span>
      La correction d'énergie au premier ordre est simplement la <strong>valeur moyenne</strong> de la perturbation dans l'état non perturbé — aucune résolution d'équation n'est nécessaire, juste le calcul d'un élément de matrice diagonal. C'est ce qui rend la théorie des perturbations si largement utilisée en physique atomique et moléculaire.
    </div>
    <p>La correction de l'état propre au premier ordre fait intervenir tous les <em>autres</em> états non perturbés :</p>
    <div class="formula-box">$$|n^{(1)}\\rangle = \\sum_{k\\neq n} \\frac{\\langle k^{(0)}|\\hat W|n^{(0)}\\rangle}{E_n^{(0)}-E_k^{(0)}}\\,|k^{(0)}\\rangle$$</div>
    <p>On observe que ce développement n'est valable — le « petit paramètre » $\\lambda$ est effectivement petit — que si les éléments de matrice de $\\hat W$ restent petits devant les écarts d'énergie $E_n^{(0)}-E_k^{(0)}$ entre niveaux non perturbés voisins.</p>

    <h3>3. Cas dégénéré : diagonaliser dans le sous-espace propre</h3>
    <p>Si le niveau $E_n^{(0)}$ est <strong>dégénéré</strong> (comme les niveaux de l'atome d'hydrogène, chapitre 7), la formule précédente pour $|n^{(1)}\\rangle$ diverge dès que $k$ correspond à un état de même énergie $E_k^{(0)}=E_n^{(0)}$. Il faut alors, en préalable, <strong>diagonaliser $\\hat W$</strong> dans le sous-espace propre dégénéré : les valeurs propres de cette restriction de $\\hat W$ donnent directement les corrections au premier ordre, et les vecteurs propres associés sont les « bonnes » combinaisons linéaires à utiliser comme base de départ (au lieu d'un choix arbitraire).</p>
    <div class="key-point">
      <span class="eyebrow">Levée de dégénérescence</span>
      Si $\\hat W$ n'est pas proportionnel à l'identité dans le sous-espace dégénéré, ses valeurs propres sont en général <strong>distinctes</strong> : le niveau d'énergie, initialement unique, se sépare en plusieurs sous-niveaux d'énergies différentes sous l'effet de la perturbation. C'est le mécanisme physique de l'<strong>effet Stark</strong> (dédoublement sous champ électrique) et de l'<strong>effet Zeeman</strong> (dédoublement sous champ magnétique) des raies spectrales.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — oscillateur harmonique perturbé</span>
      <p><strong>Énoncé :</strong> on ajoute à l'oscillateur harmonique une perturbation $\\hat W = \\varepsilon\\,\\hat x$ (un petit champ électrique uniforme agissant sur une charge). Calculer la correction d'énergie au premier ordre pour l'état fondamental $|0\\rangle$.</p>
      <p><strong>Solution :</strong> $E_0^{(1)} = \\varepsilon\\langle 0|\\hat x|0\\rangle$. Or on a montré au chapitre 3 que $\\langle n|\\hat x|n\\rangle=0$ pour tout $n$ (par symétrie, puisque $\\hat x \\propto \\hat a+\\hat a^\\dagger$ ne connecte que des états d'indices différant de 1).</p>
      <p class="example-answer">$E_0^{(1)} = 0$ : il n'y a <strong>aucune correction au premier ordre</strong> — il faut aller au deuxième ordre pour voir un effet (ce cas se traite d'ailleurs exactement, sans perturbation, par un simple changement de variable, et confirme que le résultat exact ne contient pas de terme linéaire en $\\varepsilon$).</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <line x1="15" y1="45" x2="60" y2="45" stroke="#F0B94D" stroke-width="2"/>
          <text x="20" y="38" font-family="IBM Plex Mono" font-size="7" fill="#F0B94D">E(0) (dégénéré)</text>
          <path d="M65,45 L85,45" stroke="#5A6472" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="90" y1="30" x2="130" y2="30" stroke="#2DD4C4" stroke-width="1.6"/>
          <line x1="90" y1="45" x2="130" y2="45" stroke="#4C7CFF" stroke-width="1.6"/>
          <line x1="90" y1="60" x2="130" y2="60" stroke="#8B7CF6" stroke-width="1.6"/>
          <text x="92" y="70" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">levée de dégénérescence</text>
        </svg>
        <span>une perturbation peut séparer un niveau dégénéré en plusieurs sous-niveaux</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Hamiltonien $\\hat H=\\hat H_0+\\lambda\\hat W$ ; on cherche $E_n,|n\\rangle$ comme séries en puissances de $\\lambda$</li>
        <li>Correction d'énergie au 1<sup>er</sup> ordre (cas non dégénéré) : $E_n^{(1)}=\\langle n^{(0)}|\\hat W|n^{(0)}\\rangle$ — une simple valeur moyenne</li>
        <li>Correction d'état au 1<sup>er</sup> ordre : combinaison de tous les autres états, pondérée par $1/(E_n^{(0)}-E_k^{(0)})$</li>
        <li>Cas dégénéré : il faut diagonaliser $\\hat W$ dans le sous-espace dégénéré ; ceci explique la levée de dégénérescence (effets Stark, Zeeman)</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer directement la formule non dégénérée de $|n^{(1)}\\rangle$ à un niveau dégénéré : la formule diverge, il faut d'abord diagonaliser $\\hat W$ dans le sous-espace propre</li>
        <li>Oublier que la théorie des perturbations n'est valable que si les éléments de matrice de $\\hat W$ restent petits devant les écarts d'énergie non perturbés</li>
        <li>Confondre l'ordre du développement : $E_n^{(1)}$ est la correction linéaire en $\\lambda$, pas l'énergie totale $E_n$</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La correction d'énergie au premier ordre, pour un niveau non dégénéré, est donnée par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr8e1" value="wrong"> $\\langle n^{(0)}|\\hat H_0|n^{(0)}\\rangle$</label>
          <label class="option"><input type="radio" name="mqnr8e1" value="right"> $\\langle n^{(0)}|\\hat W|n^{(0)}\\rangle$</label>
          <label class="option"><input type="radio" name="mqnr8e1" value="wrong"> $\\langle n^{(0)}|\\hat W|k^{(0)}\\rangle$ pour $k\\neq n$</label>
          <label class="option"><input type="radio" name="mqnr8e1" value="wrong"> $E_n^{(0)}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr8e1','mqnr8fb1','Correct — c\\'est simplement la valeur moyenne de la perturbation dans l\\'état non perturbé.','Relis la formule encadrée du cours pour En(1).')">Vérifier</button>
        <div class="feedback" id="mqnr8fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour un niveau dégénéré, avant d'appliquer la théorie des perturbations, il faut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr8e2" value="wrong"> ignorer la dégénérescence, la formule reste valable telle quelle</label>
          <label class="option"><input type="radio" name="mqnr8e2" value="right"> diagonaliser la perturbation $\\hat W$ dans le sous-espace propre dégénéré</label>
          <label class="option"><input type="radio" name="mqnr8e2" value="wrong"> annuler $\\hat W$ dans ce sous-espace</label>
          <label class="option"><input type="radio" name="mqnr8e2" value="wrong"> augmenter $\\lambda$ jusqu'à 1</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr8e2','mqnr8fb2','Correct — la formule non dégénérée diverge sinon (dénominateur nul) ; diagonaliser W dans le sous-espace dégénéré donne directement les bonnes corrections et les bons états de départ.','Relis le paragraphe du cours sur le cas dégénéré : que faut-il faire avant de calculer les corrections ?')">Vérifier</button>
        <div class="feedback" id="mqnr8fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour l'oscillateur harmonique perturbé par $\\hat W=\\varepsilon\\hat x$, la correction d'énergie au premier ordre pour l'état fondamental $|0\\rangle$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr8e3" value="right"> 0</label>
          <label class="option"><input type="radio" name="mqnr8e3" value="wrong"> $\\varepsilon\\hbar/2$</label>
          <label class="option"><input type="radio" name="mqnr8e3" value="wrong"> $\\varepsilon^2$</label>
          <label class="option"><input type="radio" name="mqnr8e3" value="wrong"> $\\hbar\\omega$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr8e3','mqnr8fb3','Correct — ⟨0|x̂|0⟩=0 (démontré au chapitre 3), donc la correction au premier ordre est nulle ; il faut aller au deuxième ordre pour voir un effet.','Repense au résultat du chapitre 3 sur ⟨n|x̂|n⟩.')">Vérifier</button>
        <div class="feedback" id="mqnr8fb3"></div>
      </div>
    </div>
  `
};

MQNR_NOVA_KB[mqnrKey("Théorie des perturbations stationnaires")] = {
  intro: "Salut, c'est Nova ! On aborde la théorie des perturbations, pour les systèmes qu'on ne peut pas résoudre exactement. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/premier ordre|correction/i, replies:[
      "Au premier ordre, En(1)=⟨n(0)|Ŵ|n(0)⟩ : simplement la valeur moyenne de la perturbation dans l'état non perturbé — aucune équation à résoudre."
    ]},
    { test:/d[ée]g[ée]n[ée]r[ée]/i, replies:[
      "Pour un niveau dégénéré, il faut d'abord diagonaliser la perturbation Ŵ dans le sous-espace dégénéré : ses valeurs propres donnent les corrections, et c'est ce mécanisme qui explique la levée de dégénérescence (effets Stark, Zeeman)."
    ]},
    { test:/stark|zeeman/i, replies:[
      "L'effet Stark (champ électrique) et l'effet Zeeman (champ magnétique) sont deux exemples classiques de levée de dégénérescence par une perturbation qui n'est pas proportionnelle à l'identité dans le sous-espace dégénéré."
    ]},
    { test:/petit param[èe]tre|validit[ée]/i, replies:[
      "La théorie des perturbations n'est valable que si les éléments de matrice de Ŵ restent petits devant les écarts d'énergie non perturbés — sinon le développement en série ne converge pas correctement."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la formule encadrée du cours pour En(1).",
      "Indice niveau 2 : c'est un élément de matrice diagonal de Ŵ.",
      "Indice niveau 3 : En(1)=⟨n(0)|Ŵ|n(0)⟩."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : que faut-il faire avant de calculer les corrections pour un niveau dégénéré ?",
      "Indice niveau 2 : la formule non dégénérée diverge sinon.",
      "Indice niveau 3 : il faut diagonaliser Ŵ dans le sous-espace dégénéré."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : repense au résultat du chapitre 3 sur ⟨n|x̂|n⟩.",
      "Indice niveau 2 : cette valeur moyenne était nulle pour tout n.",
      "Indice niveau 3 : donc la correction au premier ordre est 0."
    ]}
  ]
};

/* =========================== CHAPITRE 9 =========================== */
MQNR_CHAPTERS[mqnrKey("Méthode variationnelle et perturbations dépendantes du temps")] = {
  objectives: [
    "Établir le théorème variationnel et son utilisation pour estimer une énergie de l'état fondamental",
    "Appliquer la méthode variationnelle sur un exemple simple",
    "Poser le problème des perturbations dépendant explicitement du temps",
    "Énoncer la règle d'or de Fermi et son rôle dans les taux de transition"
  ],
  prereqs: ["Théorie des perturbations stationnaires"],
  bodyHtml: `
    <p>Ce dernier chapitre présente deux méthodes complémentaires de la théorie des perturbations stationnaires (chapitre 8) : la <strong>méthode variationnelle</strong>, utile quand on ne dispose d'aucun hamiltonien non perturbé proche du problème réel, et la théorie des <strong>perturbations dépendant du temps</strong>, indispensable dès qu'on s'intéresse à des phénomènes dynamiques comme l'absorption ou l'émission de lumière par un atome.</p>

    <h3>1. Le théorème variationnel</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème variationnel</span>
      Pour tout état d'essai normé $|\\varphi\\rangle$ (appelé <strong>fonction d'essai</strong>), la valeur moyenne de l'énergie majore toujours l'énergie de l'état fondamental $E_0$ du système :
      $$\\langle \\varphi|\\hat H|\\varphi\\rangle \\geq E_0$$
      avec égalité si et seulement si $|\\varphi\\rangle$ est effectivement l'état fondamental.
    </div>
    <p><strong>Démonstration (esquisse) :</strong> en décomposant $|\\varphi\\rangle = \\sum_n c_n|n\\rangle$ sur la base des états propres exacts de $\\hat H$ (d'énergies $E_n \\geq E_0$), on a $\\langle \\varphi|\\hat H|\\varphi\\rangle = \\sum_n |c_n|^2 E_n \\geq E_0\\sum_n|c_n|^2 = E_0$ (en utilisant la normalisation $\\sum_n|c_n|^2=1$).</p>
    <p>Ce théorème fournit une <strong>méthode d'approximation</strong> puissante pour l'énergie du fondamental, même sans connaître $\\hat H_0$ proche : on choisit une famille de fonctions d'essai $|\\varphi(\\alpha)\\rangle$ dépendant d'un ou plusieurs paramètres variationnels $\\alpha$, et l'on <strong>minimise</strong> $\\langle \\varphi(\\alpha)|\\hat H|\\varphi(\\alpha)\\rangle$ par rapport à $\\alpha$ : le minimum obtenu est la meilleure estimation (par excès) de $E_0$ accessible dans cette famille.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — retrouver l'oscillateur harmonique</span>
      <p><strong>Énoncé (esquisse) :</strong> pour l'hamiltonien de l'oscillateur harmonique $\\hat H=\\hat p^2/2m+\\frac12 m\\omega^2\\hat x^2$, on choisit une fonction d'essai gaussienne $\\varphi_\\alpha(x) \\propto e^{-\\alpha x^2/2}$, avec $\\alpha>0$ paramètre variationnel. Le calcul (standard, omis ici) donne $\\langle H\\rangle(\\alpha) = \\dfrac{\\hbar^2\\alpha}{4m} + \\dfrac{m\\omega^2}{4\\alpha}$.</p>
      <p><strong>Solution :</strong> on minimise par rapport à $\\alpha$ : $\\dfrac{d\\langle H\\rangle}{d\\alpha}=0 \\Rightarrow \\dfrac{\\hbar^2}{4m} = \\dfrac{m\\omega^2}{4\\alpha^2} \\Rightarrow \\alpha = \\dfrac{m\\omega}{\\hbar}$. En reportant : $\\langle H\\rangle_{min} = \\dfrac{\\hbar\\omega}{4}+\\dfrac{\\hbar\\omega}{4}=\\dfrac{\\hbar\\omega}{2}$.</p>
      <p class="example-answer">$\\langle H\\rangle_{min} = \\dfrac{\\hbar\\omega}{2} = E_0$ exactement — la méthode variationnelle retrouve ici la valeur exacte, car la vraie fonction d'onde du fondamental est justement une gaussienne (chapitre 3) : la famille d'essai contenait la bonne réponse.</p>
    </div>

    <h3>2. Perturbations dépendant du temps</h3>
    <p>On considère maintenant $\\hat H(t) = \\hat H_0 + \\hat W(t)$, où la perturbation $\\hat W(t)$ varie explicitement avec le temps (par exemple, le champ électrique oscillant d'une onde lumineuse incidente sur un atome). Contrairement au chapitre 8, on ne cherche plus des <strong>états stationnaires</strong> du système perturbé (qui n'existent en général plus), mais la <strong>probabilité de transition</strong> $P_{i\\to f}(t)$ qu'un système initialement dans l'état propre $|i\\rangle$ de $\\hat H_0$ se retrouve, après un temps $t$, dans un autre état propre $|f\\rangle$ de $\\hat H_0$.</p>

    <h3>3. La règle d'or de Fermi</h3>
    <p>Pour une perturbation sinusoïdale $\\hat W(t) = \\hat W_0 \\cos(\\omega t)$ (typiquement une onde électromagnétique), appliquée pendant un temps $t$ suffisamment long, un calcul perturbatif au premier ordre (dont la structure ressemble à celle du chapitre 8, mais avec une intégration temporelle supplémentaire) conduit à un <strong>taux de transition</strong> (probabilité de transition par unité de temps) constant, valable près de la résonance $\\hbar\\omega \\approx E_f - E_i$ :</p>
    <div class="formula-box">$$\\Gamma_{i\\to f} = \\frac{2\\pi}{\\hbar}\\,|\\langle f|\\hat W_0|i\\rangle|^2\\,\\delta(E_f - E_i - \\hbar\\omega)$$</div>
    <div class="key-point">
      <span class="eyebrow">Règle d'or de Fermi</span>
      Ce résultat, appelé <strong>règle d'or de Fermi</strong>, est l'un des outils les plus utilisés de toute la physique quantique appliquée : il relie le taux de transition (observable expérimentalement, par exemple via un temps de vie ou une largeur de raie spectrale) à un simple élément de matrice de la perturbation entre les deux états concernés. Le facteur de Dirac $\\delta(E_f-E_i-\\hbar\\omega)$ traduit la <strong>conservation de l'énergie</strong> : la transition n'a lieu efficacement qu'à résonance, quand le quantum d'énergie $\\hbar\\omega$ apporté par la perturbation correspond exactement à l'écart d'énergie entre les deux niveaux.
    </div>
    <p>C'est ce mécanisme qui explique, entre autres, l'absorption et l'émission stimulée de lumière par les atomes — le socle physique du fonctionnement du laser — ainsi que la désintégration radioactive et de très nombreux processus de la physique des particules.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <line x1="20" y1="70" x2="20" y2="15" stroke="#5A6472" stroke-width="1"/>
          <line x1="15" y1="60" x2="60" y2="60" stroke="#F0B94D" stroke-width="1.6"/>
          <text x="65" y="63" font-family="IBM Plex Mono" font-size="7" fill="#F0B94D">Ei</text>
          <line x1="15" y1="25" x2="60" y2="25" stroke="#2DD4C4" stroke-width="1.6"/>
          <text x="65" y="28" font-family="IBM Plex Mono" font-size="7" fill="#2DD4C4">Ef</text>
          <path d="M35,58 L35,28" stroke="#4C7CFF" stroke-width="1.4" marker-end="url(#arr2)" stroke-dasharray="2,2"/>
          <text x="40" y="45" font-family="IBM Plex Mono" font-size="7" fill="#4C7CFF">ℏω</text>
        </svg>
        <span>transition résonante : ℏω = Ef − Ei (règle d'or de Fermi)</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Théorème variationnel : $\\langle \\varphi|\\hat H|\\varphi\\rangle \\geq E_0$ pour tout état d'essai normé — permet d'estimer $E_0$ par minimisation sur une famille de fonctions d'essai</li>
        <li>Perturbations dépendant du temps : on cherche des probabilités de transition $P_{i\\to f}(t)$, pas des états stationnaires</li>
        <li>Règle d'or de Fermi : $\\Gamma_{i\\to f} = \\dfrac{2\\pi}{\\hbar}|\\langle f|\\hat W_0|i\\rangle|^2\\,\\delta(E_f-E_i-\\hbar\\omega)$, taux de transition à résonance</li>
        <li>Ce cadre explique l'absorption/émission de lumière par les atomes — la base physique du laser</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que le théorème variationnel donne une borne <em>supérieure</em> de $E_0$ (jamais une sous-estimation) — utile pour <em>encadrer</em> une énergie inconnue</li>
        <li>Confondre théorie des perturbations stationnaires (chapitre 8, énergies et états stationnaires) et perturbations dépendant du temps (probabilités de transition entre états)</li>
        <li>Oublier la condition de résonance $\\hbar\\omega \\approx E_f-E_i$ : loin de la résonance, le taux de transition de la règle d'or de Fermi est négligeable</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le théorème variationnel affirme que, pour tout état d'essai normé $|\\varphi\\rangle$ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr9e1" value="wrong"> $\\langle \\varphi|\\hat H|\\varphi\\rangle \\leq E_0$</label>
          <label class="option"><input type="radio" name="mqnr9e1" value="right"> $\\langle \\varphi|\\hat H|\\varphi\\rangle \\geq E_0$</label>
          <label class="option"><input type="radio" name="mqnr9e1" value="wrong"> $\\langle \\varphi|\\hat H|\\varphi\\rangle = E_0$ toujours</label>
          <label class="option"><input type="radio" name="mqnr9e1" value="wrong"> $\\langle \\varphi|\\hat H|\\varphi\\rangle$ n'a aucun rapport avec $E_0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr9e1','mqnr9fb1','Correct — la valeur moyenne de H dans n\\'importe quel état d\\'essai majore toujours l\\'énergie du fondamental, avec égalité seulement si l\\'essai est exactement le fondamental.','Relis l\\'énoncé exact du théorème variationnel dans le cours.')">Vérifier</button>
        <div class="feedback" id="mqnr9fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La théorie des perturbations dépendant du temps cherche principalement à calculer :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr9e2" value="wrong"> des corrections à l'énergie de l'état fondamental</label>
          <label class="option"><input type="radio" name="mqnr9e2" value="right"> des probabilités de transition entre états</label>
          <label class="option"><input type="radio" name="mqnr9e2" value="wrong"> la masse de la particule</label>
          <label class="option"><input type="radio" name="mqnr9e2" value="wrong"> le spin de la particule</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr9e2','mqnr9fb2','Correct — contrairement au cas stationnaire (chapitre 8), on ne cherche plus des états stationnaires mais des probabilités de transition Pi→f(t) entre états de H0.','Relis la différence entre théorie des perturbations stationnaire (chapitre 8) et dépendante du temps.')">Vérifier</button>
        <div class="feedback" id="mqnr9fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans la règle d'or de Fermi, le taux de transition est maximal quand :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mqnr9e3" value="wrong"> $\\omega=0$</label>
          <label class="option"><input type="radio" name="mqnr9e3" value="right"> $\\hbar\\omega \\approx E_f - E_i$ (résonance)</label>
          <label class="option"><input type="radio" name="mqnr9e3" value="wrong"> $\\hat W_0=0$</label>
          <label class="option"><input type="radio" name="mqnr9e3" value="wrong"> le système est dans l'état $|f\\rangle$ dès le départ</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mqnr9e3','mqnr9fb3','Correct — le facteur δ(Ef−Ei−ℏω) impose la conservation de l\\'énergie : le taux de transition n\\'est significatif qu\\'à résonance, quand le quantum ℏω apporté correspond exactement à l\\'écart d\\'énergie entre les deux niveaux.','Relis le rôle du facteur δ(Ef−Ei−ℏω) dans la formule de la règle d\\'or de Fermi.')">Vérifier</button>
        <div class="feedback" id="mqnr9fb3"></div>
      </div>
    </div>
  `
};

MQNR_NOVA_KB[mqnrKey("Méthode variationnelle et perturbations dépendantes du temps")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : méthode variationnelle et perturbations dépendant du temps. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/variationnel/i, replies:[
      "Le théorème variationnel : ⟨φ|Ĥ|φ⟩≥E0 pour tout état d'essai normé. On minimise sur une famille de fonctions d'essai pour estimer (par excès) l'énergie du fondamental."
    ]},
    { test:/fermi|r[èe]gle d.or/i, replies:[
      "La règle d'or de Fermi, Γi→f=(2π/ℏ)|⟨f|Ŵ0|i⟩|²δ(Ef−Ei−ℏω), donne le taux de transition entre deux états sous une perturbation oscillante — maximal à résonance ℏω≈Ef−Ei."
    ]},
    { test:/d[ée]pendant du temps|d[ée]pendante du temps/i, replies:[
      "Contrairement aux perturbations stationnaires (chapitre 8), les perturbations dépendant du temps ne donnent pas d'états stationnaires : on cherche des probabilités de transition Pi→f(t) entre les états de H0."
    ]},
    { test:/r[ée]sonance/i, replies:[
      "La condition de résonance ℏω≈Ef−Ei traduit la conservation de l'énergie : loin de cette condition, le taux de transition de la règle d'or de Fermi devient négligeable."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis l'énoncé exact du théorème variationnel.",
      "Indice niveau 2 : c'est une inégalité, pas une égalité.",
      "Indice niveau 3 : ⟨φ|Ĥ|φ⟩≥E0."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la différence entre le chapitre 8 (stationnaire) et ce chapitre-ci (dépendant du temps).",
      "Indice niveau 2 : on ne cherche plus des états stationnaires.",
      "Indice niveau 3 : on cherche des probabilités de transition entre états."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis le rôle du facteur δ(Ef−Ei−ℏω) dans la formule.",
      "Indice niveau 2 : ce facteur traduit la conservation de l'énergie.",
      "Indice niveau 3 : le taux est maximal à résonance, ℏω≈Ef−Ei."
    ]}
  ]
};

/* fusionne le module Mécanique quantique non relativiste dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, MQNR_CHAPTERS);
Object.assign(NOVA_KB, MQNR_NOVA_KB);