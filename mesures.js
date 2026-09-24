/* =====================================================================
   CHUNK « mesures » — registre MESURES_CHAPTERS / MESURES_NOVA_KB
   Matière(s) : Physique|Mesures et normes
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   MESURES_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */




/* ===================================================================
   MATIÈRE — Mesures et normes (L1, domaine Physique)
   Structure identique aux autres modules : MESURES_CHAPTERS / MESURES_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu : système international d'unités, analyse dimensionnelle,
   chiffres significatifs, incertitudes de mesure (types A et B, GUM),
   propagation des incertitudes, étalonnage et normes métrologiques.
   IMPORTANT : toute commande LaTeX utilise DEUX backslashes consécutifs
   (convention du site).
=================================================================== */
const MESURES_MATIERE = 'Mesures et normes';
function mesuresKey(chapterTitle){ return `Physique|${MESURES_MATIERE}|${chapterTitle}`; }
const MESURES_CHAPTERS = {};
const MESURES_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur de propagation d'incertitude pour une fonction produit/somme
   (Chapitre 5)
--------------------------------------------------------------------------------- */
function updateMesuresPropag(){
  const x = parseFloat(document.getElementById('mesuresX').value) || 0;
  const dx = parseFloat(document.getElementById('mesuresDx').value) || 0;
  const y = parseFloat(document.getElementById('mesuresY').value) || 0;
  const dy = parseFloat(document.getElementById('mesuresDy').value) || 0;
  const out = document.getElementById('mesuresPropagReadout');
  const sum = x+y;
  const dsum = Math.sqrt(dx*dx+dy*dy);
  const prod = x*y;
  const relDprod = Math.sqrt((dx/x)*(dx/x) + (dy/y)*(dy/y));
  const dprod = Math.abs(prod)*relDprod;
  out.innerHTML =
    `<p><strong>Somme z=x+y :</strong> z = ${sum.toFixed(4)} ± ${dsum.toFixed(4)} (incertitudes quadratiques additionnées)</p>` +
    `<p><strong>Produit z=x·y :</strong> z = ${prod.toFixed(4)} ± ${dprod.toFixed(4)} (incertitudes relatives quadratiques additionnées)</p>`;
}
function initMesuresPropag(){ updateMesuresPropag(); }

/* =========================== CHAPITRE 1 =========================== */
MESURES_CHAPTERS[mesuresKey("Grandeurs physiques et système international d'unités (SI)")] = {
  objectives: [
    "Distinguer grandeur physique, unité et valeur numérique",
    "Citer les sept unités de base du Système international (SI) et leurs définitions actuelles",
    "Utiliser correctement les préfixes du SI et les unités dérivées courantes",
    "Justifier l'intérêt d'un système d'unités cohérent pour la physique expérimentale",
    "Analyser pourquoi fonder les unités sur des constantes physiques universelles plutôt que sur des artefacts matériels était devenu une nécessité scientifique"
  ],
  prereqs: ["Mathématiques de niveau terminale (puissances de dix)"],
  bodyHtml: `
    <p>Le 20 mai 2019 — une date aujourd'hui célébrée par les métrologues du monde entier comme le « World Metrology Day » — marque la fin d'une époque vieille de 130 ans : ce jour-là, le kilogramme cesse officiellement d'être défini par un cylindre de platine iridié conservé sous trois cloches de verre imbriquées, dans un coffre-fort du Pavillon de Breteuil près de Paris. Ce « Grand K », comme on le surnommait, avait pourtant un défaut embarrassant pour un étalon censé être immuable : comparé à ses copies officielles réparties dans le monde, il avait mystérieusement perdu environ 50 microgrammes en un siècle — l'équivalent d'un grain de sable — sans que personne ne sache vraiment pourquoi.</p>
    <p>Cette dérive, aussi infime soit-elle, posait un problème vertigineux : si la référence absolue du kilogramme change elle-même dans le temps, que signifie encore « peser un kilogramme » avec précision ? Ce défi, loin d'être anecdotique, touche directement à la fiabilité de toute mesure scientifique et industrielle dans le monde — du dosage d'un médicament à la calibration d'un capteur satellite. C'est ce même souci de rigueur qui sous-tend toute la physique expérimentale que tu vas pratiquer tout au long de ta formation.</p>
    <p>Toute mesure physique repose sur la comparaison d'une grandeur à une référence conventionnelle : l'<strong>unité</strong>. Ce premier chapitre présente le Système international d'unités (SI), langage commun indispensable à toute communication scientifique rigoureuse, récemment refondé (2019) sur des constantes physiques fondamentales plutôt que sur des artefacts matériels. À la fin de ce chapitre, tu sauras manipuler avec assurance les sept unités de base du SI et comprendre pourquoi leur redéfinition de 2019 était devenue incontournable.</p>

    <h3>1. Grandeur, valeur numérique et unité</h3>
    <p>Une <strong>grandeur physique</strong> $G$ s'exprime toujours comme le produit d'une <strong>valeur numérique</strong> $\\{G\\}$ et d'une <strong>unité</strong> $[G]$ : $G = \\{G\\}\\times[G]$. Par exemple, une longueur $L=2{,}5$ m signifie que $L$ vaut 2,5 fois l'unité « mètre ». Cette écriture, bien que triviale en apparence, est essentielle : une valeur numérique seule, sans unité, n'a strictement aucun sens physique.</p>

    <h3>2. Les sept unités de base du SI</h3>
    <p>Depuis la révision de 2019, les sept unités de base du SI sont toutes définies à partir de <strong>constantes physiques fondamentales</strong> fixées par convention à une valeur exacte, plutôt qu'à partir d'artefacts matériels (comme l'ancien « kilogramme étalon » de Paris, désormais abandonné) :</p>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Unité (symbole)</th><th>Définition (2019)</th></tr>
      <tr><td>Temps</td><td>seconde (s)</td><td>fixée par la fréquence de transition hyperfine du césium 133 : 9 192 631 770 Hz</td></tr>
      <tr><td>Longueur</td><td>mètre (m)</td><td>fixée par la vitesse de la lumière dans le vide : $c=299\\,792\\,458$ m/s</td></tr>
      <tr><td>Masse</td><td>kilogramme (kg)</td><td>fixée par la constante de Planck : $h=6{,}62607015\\times10^{-34}$ J·s</td></tr>
      <tr><td>Intensité électrique</td><td>ampère (A)</td><td>fixée par la charge élémentaire : $e=1{,}602176634\\times10^{-19}$ C</td></tr>
      <tr><td>Température</td><td>kelvin (K)</td><td>fixée par la constante de Boltzmann : $k_B=1{,}380649\\times10^{-23}$ J/K</td></tr>
      <tr><td>Quantité de matière</td><td>mole (mol)</td><td>fixée par la constante d'Avogadro : $N_A=6{,}02214076\\times10^{23}$ mol⁻¹</td></tr>
      <tr><td>Intensité lumineuse</td><td>candela (cd)</td><td>fixée par l'efficacité lumineuse d'une radiation monochromatique de 540 THz</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Fixer la valeur de $c$ (vitesse de la lumière) par convention exacte, comme le fait la définition du mètre, revient à dire qu'on ne peut plus « mesurer » c avec une incertitude expérimentale : c'est désormais le mètre lui-même qui s'ajuste à toute mesure future plus précise de la lumière. Pourquoi ce renversement — définir l'unité à partir d'une constante plutôt que mesurer la constante avec une unité préexistante — est-il un choix aussi audacieux que judicieux ?
    </div>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi cette révision de 2019 ?</span>
      Fonder les unités sur des constantes physiques universelles, plutôt que sur des artefacts matériels susceptibles de dériver dans le temps (l'ancien kilogramme étalon avait effectivement perdu environ 50 microgrammes en un siècle par rapport à ses copies), garantit une stabilité et une reproductibilité absolues : n'importe quel laboratoire dans le monde, correctement équipé, peut désormais matérialiser le kilogramme sans avoir besoin d'un objet physique de référence conservé à Paris.
    </div>

    <h3>3. Unités dérivées et préfixes</h3>
    <p>Toutes les autres unités (newton, joule, volt, pascal...) sont des <strong>unités dérivées</strong>, exprimées comme des combinaisons des sept unités de base (par exemple, $1\\ \\text{N} = 1\\ \\text{kg}\\cdot\\text{m}\\cdot\\text{s}^{-2}$). Les <strong>préfixes SI</strong> permettent d'exprimer des ordres de grandeur très différents sans changer d'unité :</p>
    <table class="mini-table">
      <tr><th>Préfixe</th><th>Symbole</th><th>Facteur</th></tr>
      <tr><td>nano</td><td>n</td><td>$10^{-9}$</td></tr>
      <tr><td>micro</td><td>μ</td><td>$10^{-6}$</td></tr>
      <tr><td>milli</td><td>m</td><td>$10^{-3}$</td></tr>
      <tr><td>kilo</td><td>k</td><td>$10^{3}$</td></tr>
      <tr><td>méga</td><td>M</td><td>$10^{6}$</td></tr>
      <tr><td>giga</td><td>G</td><td>$10^{9}$</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> exprimer une résistance de $4\\,700\\,000$ Ω à l'aide d'un préfixe SI adapté.</p>
      <p><strong>Solution :</strong> $4\\,700\\,000\\ \\Omega = 4{,}7\\times10^6\\ \\Omega$.</p>
      <p class="example-answer">Réponse : $4{,}7$ MΩ (méga-ohms), notation bien plus lisible que la valeur brute.</p>
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>La quête de précision métrologique ne s'arrête jamais : les horloges optiques de nouvelle génération, actuellement en développement dans plusieurs laboratoires nationaux de métrologie (dont le NIST américain et le BIPM près de Paris), atteignent aujourd'hui une exactitude telle qu'elles ne dérailleraient que d'une seconde sur l'âge entier de l'Univers. Ces horloges sont si précises qu'elles pourraient bientôt redéfinir la seconde elle-même, actuellement basée sur une transition du césium, si leur stabilité venait à être validée à l'échelle internationale.</p>
    <p><strong>Question ouverte :</strong> comment vérifier expérimentalement qu'une constante physique fondamentale, désormais fixée par définition (comme $c$ ou $h$), n'a pas légèrement varié dans le temps ou l'espace à l'échelle cosmologique ? C'est une question activement étudiée en physique fondamentale, avec des implications profondes sur notre compréhension des lois de la Nature.</p>
    <p><strong>Technologie émergente :</strong> les capteurs quantiques, qui exploitent des effets de mécanique quantique pour mesurer des grandeurs physiques (champ magnétique, gravité, temps) avec une sensibilité inégalée, bénéficient directement de cette redéfinition des unités SI sur des constantes fondamentales, ouvrant la voie à une nouvelle génération d'instruments de mesure ultra-précis.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Grandeur physique → comparaison à une unité de référence → 7 unités de base du SI (fondées sur des constantes fondamentales depuis 2019) → unités dérivées et préfixes → mesure reproductible partout dans le monde
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$G = \\{G\\} \\times [G]$$
      Cette écriture, apparemment triviale, est le socle de toute la physique expérimentale : elle rappelle qu'aucune mesure n'a de sens sans son unité, et que le choix judicieux de cette unité — désormais ancrée dans des constantes universelles — conditionne la fiabilité de toute la science qui en découle.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Grandeur = valeur numérique × unité : une valeur numérique seule n'a aucun sens physique</li>
        <li>7 unités de base du SI (s, m, kg, A, K, mol, cd), toutes redéfinies en 2019 à partir de constantes physiques fixées par convention</li>
        <li>Unités dérivées : combinaisons des unités de base (N, J, V, Pa...)</li>
        <li>Préfixes SI (n, μ, m, k, M, G...) pour exprimer des ordres de grandeur sans changer d'unité</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Écrire une valeur numérique sans son unité, ou mélanger des unités incompatibles dans un même calcul</li>
        <li>Confondre masse (kg) et poids (N, une force) — deux grandeurs physiques distinctes, souvent confondues dans le langage courant</li>
        <li>Oublier de convertir toutes les grandeurs dans les mêmes unités avant d'effectuer un calcul (par exemple, mélanger des cm et des m)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Depuis 2019, le kilogramme est défini à partir de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures1e1" value="wrong"> l'artefact de platine iridié conservé à Paris</label>
          <label class="option"><input type="radio" name="mesures1e1" value="right"> la constante de Planck h</label>
          <label class="option"><input type="radio" name="mesures1e1" value="wrong"> la vitesse de la lumière</label>
          <label class="option"><input type="radio" name="mesures1e1" value="wrong"> la charge élémentaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures1e1','mesures1fb1','Correct — depuis la révision de 2019, le kilogramme est fixé par la valeur exacte de la constante de Planck, abandonnant l ancien artefact matériel.','L ancien étalon matériel a été abandonné au profit d une constante physique universelle : laquelle est associée à la masse ?')">Vérifier</button>
        <div class="feedback" id="mesures1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le préfixe correspondant au facteur 10⁻⁶ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures1e2" value="wrong"> milli</label>
          <label class="option"><input type="radio" name="mesures1e2" value="right"> micro</label>
          <label class="option"><input type="radio" name="mesures1e2" value="wrong"> nano</label>
          <label class="option"><input type="radio" name="mesures1e2" value="wrong"> kilo</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures1e2','mesures1fb2','Correct — micro (symbole μ) correspond au facteur 10 puissance -6, entre milli (10 puissance -3) et nano (10 puissance -9).','Classe les préfixes par puissances de dix décroissantes : milli, puis micro, puis nano.')">Vérifier</button>
        <div class="feedback" id="mesures1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le newton (N), unité de force, est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures1e3" value="wrong"> une unité de base du SI</label>
          <label class="option"><input type="radio" name="mesures1e3" value="right"> une unité dérivée du SI</label>
          <label class="option"><input type="radio" name="mesures1e3" value="wrong"> une unité hors SI</label>
          <label class="option"><input type="radio" name="mesures1e3" value="wrong"> équivalente au kilogramme</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures1e3','mesures1fb3','Correct — le newton se définit comme kg·m·s⁻², une combinaison des unités de base : c est donc une unité DÉRIVÉE.','Les 7 unités de base sont s, m, kg, A, K, mol, cd : le newton en fait-il partie ?')">Vérifier</button>
        <div class="feedback" id="mesures1fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'humanité découvrait qu'une constante fondamentale comme $c$ ou $h$ n'était pas rigoureusement universelle, mais variait légèrement selon le lieu ou l'époque : tout le système SI devrait-il être repensé ?</li>
        <li>Pourquoi le kilogramme a-t-il été le dernier des sept unités de base à abandonner son artefact matériel, alors que le mètre avait déjà opéré cette transition dès 1983 ?</li>
        <li>Quelle serait la conséquence, pour l'industrie et la recherche mondiales, d'un désaccord entre grands laboratoires de métrologie sur la valeur exacte d'une constante fondamentale ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Bureau International des Poids et Mesures (BIPM), <em>Le Système international d'unités (SI)</em>, 9e édition, 2019 — texte officiel de référence de la révision du SI.</li>
        <li>J.-P. Pérez, <em>Mesures physiques : méthodes et incertitudes</em>, Dunod — référence pédagogique standard en métrologie pour la licence.</li>
        <li>D. B. Newell, E. Tiesinga (dir.), « The International System of Units (SI), 2019 Edition », NIST Special Publication 330, National Institute of Standards and Technology, 2019.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu maîtrises désormais le langage universel sur lequel repose toute mesure scientifique, de la plus modeste expérience de travaux pratiques jusqu'aux découvertes les plus retentissantes. Le chapitre suivant va approfondir ce que signifie réellement « mesurer » avec rigueur, en particulier lorsque la mesure elle-même comporte une part inévitable d'incertitude. Comme le disait Lord Kelvin, dont l'unité de température porte le nom : « Quand vous pouvez mesurer ce dont vous parlez et l'exprimer en nombres, vous en savez quelque chose ; mais quand vous ne pouvez pas le mesurer, votre connaissance est maigre et insatisfaisante. » Tu viens de poser la première pierre de cette connaissance rigoureuse.</p>
  `
};

MESURES_NOVA_KB[mesuresKey("Grandeurs physiques et système international d'unités (SI)")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Grandeurs physiques et système international d'unités ». Demande-moi la révision de 2019, les préfixes SI, ou un indice sur un exercice.",
  rules: [
    { test:/r[ée]vision.*2019|constantes fondamentales/i, replies:["Depuis 2019, les 7 unités de base du SI sont toutes définies à partir de constantes physiques fondamentales fixées par convention (h pour le kg, c pour le mètre, e pour l'ampère...), abandonnant les anciens artefacts matériels."] },
    { test:/kilogramme|constante de planck/i, replies:["Le kilogramme est défini depuis 2019 à partir de la constante de Planck h=6,62607015×10⁻³⁴ J·s, fixée par convention."] },
    { test:/pr[ée]fixe/i, replies:["Les préfixes SI (nano 10⁻⁹, micro 10⁻⁶, milli 10⁻³, kilo 10³, méga 10⁶, giga 10⁹...) permettent d'exprimer des ordres de grandeur très différents sans changer d'unité."] },
    { test:/unit[ée] d[ée]riv[ée]e/i, replies:["Une unité dérivée (newton, joule, volt...) est une combinaison des 7 unités de base du SI, par exemple 1 N = 1 kg·m·s⁻²."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : quelle constante est associée à la masse ?","Indice niveau 2 : ce n'est plus un artefact matériel depuis 2019.","Indice niveau 3 : c'est la constante de Planck h."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : classe les préfixes par puissance de dix.","Indice niveau 2 : entre milli (10⁻³) et nano (10⁻⁹).","Indice niveau 3 : c'est micro (10⁻⁶)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : les 7 unités de base sont s, m, kg, A, K, mol, cd.","Indice niveau 2 : le newton n'en fait pas partie.","Indice niveau 3 : c'est une unité dérivée."] }
  ]
};

/* =========================== CHAPITRE 2 =========================== */
MESURES_CHAPTERS[mesuresKey("Analyse dimensionnelle")] = {
  objectives: [
    "Établir la dimension d'une grandeur physique à partir des grandeurs de base",
    "Vérifier l'homogénéité dimensionnelle d'une formule physique",
    "Utiliser l'analyse dimensionnelle pour retrouver la forme d'une loi physique à une constante près",
    "Identifier les limites de l'analyse dimensionnelle (constantes sans dimension)",
    "Évaluer, face à une formule physique inconnue, si l'analyse dimensionnelle suffit à la retrouver entièrement ou seulement partiellement"
  ],
  prereqs: ["Grandeurs physiques et système international d'unités (SI)"],
  bodyHtml: `
    <p>En 1900, le physicien britannique Lord Rayleigh utilise une méthode d'une simplicité déconcertante — l'analyse dimensionnelle — pour établir la loi du rayonnement du corps noir aux grandes longueurs d'onde, sans avoir à résoudre la moindre équation complexe de thermodynamique statistique. Cette approche, souvent reléguée au rang de simple « astuce de vérification » dans l'enseignement, s'est révélée à de multiples reprises être un authentique outil de découverte : Geoffrey Ingram Taylor l'a même utilisée, en 1950, pour estimer avec une précision stupéfiante l'énergie dégagée par la première explosion nucléaire américaine, à partir de simples photographies déclassifiées du champignon atomique — un calcul qui, dit-on, embarrassa considérablement les autorités qui pensaient l'information encore secrète.</p>
    <p>Cette anecdote illustre une vérité essentielle que ce chapitre te propose de s'approprier : bien avant de savoir résoudre l'équation complète d'un phénomène physique, on peut souvent en deviner la structure — comment une grandeur dépend des autres — par la seule cohérence des unités. C'est un réflexe que tout physicien expérimenté garde en tête à chaque nouveau problème, et un outil précieux pour repérer instantanément une erreur de calcul avant même de vérifier les chiffres.</p>
    <p>L'<strong>analyse dimensionnelle</strong> est un outil puissant, trop souvent sous-estimé, qui permet de vérifier la cohérence d'une formule physique, de détecter une erreur de calcul, voire de deviner la forme d'une loi physique inconnue à partir des seules grandeurs pertinentes du problème. À la fin de ce chapitre, tu sauras retrouver, comme Rayleigh ou Taylor avant toi, la structure d'une loi physique sans écrire la moindre équation du mouvement.</p>

    <h3>1. Dimension d'une grandeur</h3>
    <p>La <strong>dimension</strong> d'une grandeur physique exprime sa nature en fonction des sept grandeurs de base, notées $L$ (longueur), $M$ (masse), $T$ (temps), $I$ (intensité électrique), $\\Theta$ (température), $N$ (quantité de matière), $J$ (intensité lumineuse). Par exemple, une vitesse a pour dimension $[v] = L\\cdot T^{-1}$, une force $[F]=M\\cdot L\\cdot T^{-2}$ (dimension du newton).</p>

    <h3>2. Principe d'homogénéité dimensionnelle</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — principe d'homogénéité</span>
      Toute égalité physique correcte doit être <strong>dimensionnellement homogène</strong> : les deux membres d'une équation, ainsi que tous les termes d'une somme, doivent avoir exactement la même dimension. Ce principe, d'une simplicité trompeuse, permet de repérer immédiatement une grande partie des erreurs de calcul (oubli d'un facteur, confusion entre deux grandeurs).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le principe d'homogénéité dimensionnelle permet de détecter une erreur, mais jamais de prouver qu'une formule est physiquement juste. Peux-tu construire, mentalement, une formule totalement fausse physiquement (par exemple reliant une masse et une vitesse de façon absurde) mais malgré tout dimensionnellement homogène ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> vérifier l'homogénéité dimensionnelle de la loi de la chute libre $z(t) = z_0 + v_0 t - \\frac{1}{2}gt^2$.</p>
      <p><strong>Solution :</strong> $[z_0]=L$. $[v_0 t] = (L\\cdot T^{-1})\\times T = L$. $[gt^2] = (L\\cdot T^{-2})\\times T^2 = L$. Les trois termes ont bien la même dimension $L$.</p>
      <p class="example-answer">Réponse : la formule est dimensionnellement homogène (nécessaire, mais pas suffisant pour garantir qu'elle est physiquement correcte : les coefficients numériques, eux, ne sont pas vérifiés par cette méthode).</p>
    </div>

    <h3>3. Retrouver la forme d'une loi physique par analyse dimensionnelle</h3>
    <p>L'analyse dimensionnelle permet, dans de nombreux cas, de deviner la forme d'une loi physique à une constante numérique sans dimension près, en identifiant les grandeurs physiques pertinentes du problème et en cherchant l'unique combinaison de ces grandeurs qui redonne la bonne dimension pour la quantité recherchée.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — période d'un pendule simple</span>
      <p><strong>Énoncé :</strong> on suppose que la période $T$ d'un pendule simple de longueur $\\ell$, dans un champ de pesanteur $g$, ne dépend que de $\\ell$, $g$ et éventuellement de la masse $m$. Trouver la forme de $T$ par analyse dimensionnelle.</p>
      <p><strong>Solution :</strong> on cherche $T \\propto \\ell^a g^b m^c$. Dimensionnellement : $T = L^a\\,(L\\cdot T^{-2})^b\\,M^c = L^{a+b}\\,T^{-2b}\\,M^c$. Il faut $-2b=1$ (dimension de temps), donc $b=-1/2$ ; $a+b=0$, donc $a=1/2$ ; et $c=0$ (aucune dimension de masse à droite).</p>
      <p class="example-answer">Réponse : $T \\propto \\sqrt{\\ell/g}$, indépendant de la masse $m$ — résultat physique bien connu, retrouvé ici sans écrire la moindre équation du mouvement, uniquement par analyse dimensionnelle !</p>
    </div>

    <h3>4. Limites de l'analyse dimensionnelle</h3>
    <p>L'analyse dimensionnelle ne peut jamais déterminer une <strong>constante numérique sans dimension</strong> (comme le facteur $2\\pi$ dans la période exacte du pendule, $T=2\\pi\\sqrt{\\ell/g}$) : elle ne donne que la structure de la loi, pas ses coefficients exacts. Elle ne permet pas non plus de trancher entre plusieurs combinaisons possibles lorsque plus d'une grandeur partage la même dimension dans le problème considéré.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      G. I. Taylor a estimé l'énergie de la première explosion nucléaire en mesurant, sur des photographies, le rayon du champignon atomique à différents instants, puis en combinant ce rayon $R$, le temps $t$ et la masse volumique de l'air $\\rho$ par analyse dimensionnelle pour retrouver l'énergie $E$. Sachant que $[E]=M\\cdot L^2\\cdot T^{-2}$, peux-tu deviner, par simple analyse dimensionnelle, à quelle puissance de $t$ et de $R$ l'énergie doit être proportionnelle ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>L'analyse dimensionnelle reste, encore aujourd'hui, un outil de première importance en recherche : en mécanique des fluides, le nombre de Reynolds (un nombre sans dimension construit par analyse dimensionnelle) permet de prédire si un écoulement sera laminaire ou turbulent, un problème d'une complexité redoutable qui reste par ailleurs l'un des sept « problèmes du prix du millénaire » de l'Institut de mathématiques Clay pour sa résolution mathématique complète. En cosmologie, des physiciens utilisent des arguments dimensionnels pour estimer l'ordre de grandeur de phénomènes aussi extrêmes que l'évaporation des trous noirs par rayonnement de Hawking.</p>
    <p><strong>Question ouverte :</strong> peut-on systématiser davantage l'usage de l'analyse dimensionnelle en intelligence artificielle, pour aider des algorithmes à découvrir automatiquement des lois physiques à partir de données expérimentales brutes ? C'est un axe de recherche émergent à l'intersection de la physique et de l'apprentissage automatique.</p>
    <p><strong>Technologie émergente :</strong> les jumeaux numériques industriels, qui simulent le comportement de systèmes physiques complexes (avions, centrales électriques), s'appuient systématiquement sur l'analyse dimensionnelle pour valider la cohérence des modèles et réduire le nombre de paramètres à calibrer expérimentalement.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Grandeurs pertinentes du problème → dimensions en L, M, T, I, Θ, N, J → recherche de la combinaison homogène → forme de la loi physique (à une constante sans dimension près)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$[G_1] = [G_2] \\quad \\text{(condition nécessaire de toute égalité physique)}$$
      Ce principe d'homogénéité, apparemment élémentaire, est le réflexe de vérification le plus rapide et le plus puissant dont dispose tout physicien face à une formule — qu'elle vienne d'un manuel, d'un calcul personnel, ou d'une intuition à confirmer.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Dimension d'une grandeur : exprimée en L, M, T, I, Θ, N, J (grandeurs de base)</li>
        <li>Principe d'homogénéité : tous les termes d'une équation physique doivent avoir la même dimension</li>
        <li>L'analyse dimensionnelle peut retrouver la forme d'une loi physique (à une constante sans dimension près) à partir des grandeurs pertinentes</li>
        <li>Limite : elle ne détermine JAMAIS les constantes numériques sans dimension (comme 2π)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Additionner deux termes de dimensions différentes dans une formule (erreur immédiatement détectable par analyse dimensionnelle)</li>
        <li>Croire qu'une formule dimensionnellement homogène est nécessairement physiquement correcte : l'homogénéité est une condition NÉCESSAIRE mais pas SUFFISANTE</li>
        <li>Espérer retrouver une constante numérique sans dimension (comme 2π) par la seule analyse dimensionnelle : c'est structurellement impossible</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La dimension d'une force (en unités de base) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures2e1" value="wrong"> L·T⁻¹</label>
          <label class="option"><input type="radio" name="mesures2e1" value="right"> M·L·T⁻²</label>
          <label class="option"><input type="radio" name="mesures2e1" value="wrong"> M·L²·T⁻²</label>
          <label class="option"><input type="radio" name="mesures2e1" value="wrong"> M·L⁻¹</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures2e1','mesures2fb1','Correct — F=ma, donc [F]=M×(L·T⁻²)=M·L·T⁻², la dimension du newton.','Utilise F=ma et la dimension d une accélération (L·T⁻²).')">Vérifier</button>
        <div class="feedback" id="mesures2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une formule dimensionnellement homogène est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures2e2" value="wrong"> nécessairement physiquement correcte</label>
          <label class="option"><input type="radio" name="mesures2e2" value="right"> physiquement correcte possible, mais pas garantie</label>
          <label class="option"><input type="radio" name="mesures2e2" value="wrong"> toujours fausse</label>
          <label class="option"><input type="radio" name="mesures2e2" value="wrong"> impossible à vérifier</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures2e2','mesures2fb2','Correct — l homogénéité dimensionnelle est nécessaire mais non suffisante : elle ne vérifie pas les coefficients numériques.','L homogénéité est une condition NÉCESSAIRE : est-elle pour autant SUFFISANTE ?')">Vérifier</button>
        <div class="feedback" id="mesures2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'analyse dimensionnelle ne peut jamais déterminer :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures2e3" value="wrong"> la dépendance en ℓ et g de la période du pendule</label>
          <label class="option"><input type="radio" name="mesures2e3" value="right"> la constante numérique 2π dans la formule exacte</label>
          <label class="option"><input type="radio" name="mesures2e3" value="wrong"> la dimension d'une grandeur</label>
          <label class="option"><input type="radio" name="mesures2e3" value="wrong"> l'homogénéité d'une équation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures2e3','mesures2fb3','Correct — les constantes numériques sans dimension échappent structurellement à l analyse dimensionnelle, qui ne fournit que la forme de la loi.','L analyse dimensionnelle donne la STRUCTURE de la loi ; que ne peut-elle jamais fixer ?')">Vérifier</button>
        <div class="feedback" id="mesures2fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si deux grandeurs physiques de nature totalement différente (par exemple une énergie et un couple de force) partageaient exactement la même dimension : comment l'analyse dimensionnelle pourrait-elle malgré tout les distinguer ?</li>
        <li>Pourquoi l'analyse dimensionnelle, aussi puissante soit-elle, n'a-t-elle jamais permis à elle seule de découvrir une loi physique entièrement nouvelle, sans qu'un physicien identifie au préalable les bonnes grandeurs pertinentes ?</li>
        <li>Quelle serait la conséquence, pour la physique expérimentale, si toutes les constantes universelles (c, h, G...) se révélaient un jour ne pas être rigoureusement sans dimension dans un système d'unités plus fondamental ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. W. Strutt (Lord Rayleigh), « On the Question of the Stability of Flow of Fluids », Philosophical Magazine, 1892 — usage pionnier de l'analyse dimensionnelle en mécanique des fluides.</li>
        <li>J.-P. Pérez, <em>Mesures physiques : méthodes et incertitudes</em>, Dunod — chapitre sur l'analyse dimensionnelle et ses applications.</li>
        <li>G. I. Taylor, « The Formation of a Blast Wave by a Very Intense Explosion », Proceedings of the Royal Society A, 1950 — estimation par analyse dimensionnelle de l'énergie de l'explosion de Trinity.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais d'un réflexe de vérification rapide, mais aussi d'un véritable outil de découverte, utilisable dès ta première année et tout au long de ta carrière scientifique. Le chapitre suivant, « Chiffres significatifs et notation scientifique », va compléter cette rigueur en abordant un aspect tout aussi essentiel de toute mesure physique : comment exprimer un résultat numérique avec exactement le bon nombre de chiffres, ni trop, ni trop peu. Comme le disait Lord Rayleigh lui-même à propos de cette méthode : « Je suis de plus en plus impressionné par la puissance de l'analyse dimensionnelle... elle enseigne des leçons qui sont bien apprises très tôt dans la vie d'un étudiant. » Tu viens d'apprendre la tienne.</p>
  `
};

MESURES_NOVA_KB[mesuresKey("Analyse dimensionnelle")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Analyse dimensionnelle ». Demande-moi le principe d'homogénéité, l'exemple du pendule, ou un indice sur un exercice.",
  rules: [
    { test:/homog[ée]n[ée]it[ée]/i, replies:["Le principe d'homogénéité dimensionnelle exige que tous les termes d'une équation physique aient la même dimension — un test rapide et puissant pour repérer une erreur de calcul."] },
    { test:/pendule/i, replies:["Par analyse dimensionnelle, la période d'un pendule simple T∝√(ℓ/g) se retrouve sans écrire d'équation du mouvement : il suffit de chercher la combinaison de ℓ et g qui redonne une dimension de temps."] },
    { test:/dimension.*force|m\\.l\\.t/i, replies:["La dimension d'une force est M·L·T⁻² (celle du newton), obtenue à partir de F=ma."] },
    { test:/limite|constante num[ée]rique/i, replies:["L'analyse dimensionnelle ne peut JAMAIS déterminer une constante numérique sans dimension (comme le 2π de la période exacte du pendule) : elle donne seulement la structure de la loi."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise F=ma.","Indice niveau 2 : la dimension d'une accélération est L·T⁻².","Indice niveau 3 : la dimension de la force est M·L·T⁻²."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : l'homogénéité est nécessaire, mais...","Indice niveau 2 : elle ne vérifie pas les coefficients numériques.","Indice niveau 3 : ce n'est pas une garantie suffisante à elle seule."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à ce que donne (et ne donne pas) l'analyse dimensionnelle.","Indice niveau 2 : elle donne la structure, pas les coefficients.","Indice niveau 3 : c'est la constante numérique 2π qui échappe à la méthode."] }
  ]
};

/* =========================== CHAPITRE 3 =========================== */
MESURES_CHAPTERS[mesuresKey("Chiffres significatifs et notation scientifique")] = {
  objectives: [
    "Dénombrer correctement les chiffres significatifs d'une valeur mesurée",
    "Appliquer les règles d'arrondi et de report des chiffres significatifs dans un calcul",
    "Utiliser la notation scientifique pour exprimer sans ambiguïté la précision d'une mesure",
    "Appliquer les règles de chiffres significatifs aux opérations arithmétiques (somme, produit)",
    "Évaluer, face à un résultat expérimental, si le nombre de chiffres affichés reflète honnêtement la précision réelle de la mesure"
  ],
  prereqs: ["Grandeurs physiques et système international d'unités (SI)"],
  bodyHtml: `
    <p>En 1999, la sonde spatiale Mars Climate Orbiter de la NASA, après un voyage de plusieurs centaines de millions de kilomètres, se désintègre en pénétrant trop profondément dans l'atmosphère martienne — victime, non pas d'un défaut de conception exotique, mais d'une confusion élémentaire entre unités impériales et unités métriques dans le code de navigation. Cet échec retentissant, qui a coûté plus de 300 millions de dollars, illustre à quel point la rigueur dans l'expression d'un nombre — son unité, mais aussi sa précision — n'est jamais un détail secondaire en physique et en ingénierie.</p>
    <p>Le nombre de chiffres significatifs que ce chapitre te propose de maîtriser n'est pas qu'une convention pédagogique arbitraire : il transmet une information physique réelle sur la précision d'une mesure. Annoncer qu'un pont mesure « 100 mètres » ou « 100,00 mètres » n'est pas équivalent : le premier suggère une précision au mètre près, le second au centimètre près — une différence qui peut avoir des conséquences considérables selon le contexte industriel ou scientifique concerné.</p>
    <p>Le nombre de <strong>chiffres significatifs</strong> d'une valeur mesurée reflète la précision de l'instrument utilisé : écrire trop de chiffres suggère une précision illusoire, en écrire trop peu gaspille de l'information. Ce chapitre présente les règles rigoureuses pour compter, reporter et manipuler les chiffres significatifs dans un calcul. À la fin de ce chapitre, tu sauras exprimer n'importe quel résultat expérimental avec exactement la précision qu'il mérite — ni plus, ni moins.</p>

    <h3>1. Dénombrement des chiffres significatifs</h3>
    <table class="mini-table">
      <tr><th>Règle</th><th>Exemple</th><th>Nombre de chiffres significatifs</th></tr>
      <tr><td>Tous les chiffres non nuls sont significatifs</td><td>2,347 m</td><td>4</td></tr>
      <tr><td>Les zéros entre deux chiffres non nuls sont significatifs</td><td>2,05 m</td><td>3</td></tr>
      <tr><td>Les zéros initiaux (avant le premier chiffre non nul) ne sont PAS significatifs</td><td>0,0025 m</td><td>2</td></tr>
      <tr><td>Les zéros finaux après la virgule sont significatifs</td><td>2,500 m</td><td>4</td></tr>
      <tr><td>Les zéros finaux d'un nombre entier sont ambigus (notation scientifique recommandée)</td><td>2500 m (2 à 4 chiffres selon le contexte)</td><td>ambigu sans notation scientifique</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — la notation scientifique lève l'ambiguïté</span>
      La notation scientifique $a\\times10^n$ (avec $1\\leq|a|<10$) lève systématiquement toute ambiguïté sur le nombre de chiffres significatifs : $2{,}500\\times10^3$ m indique sans équivoque 4 chiffres significatifs, alors que « 2500 m » seul pourrait en avoir 2, 3 ou 4 selon le contexte.
    </div>

    <h3>2. Règles pour les opérations arithmétiques</h3>
    <table class="mini-table">
      <tr><th>Opération</th><th>Règle sur les chiffres significatifs du résultat</th></tr>
      <tr><td>Somme ou différence</td><td>le résultat a autant de décimales que le terme ayant le MOINS de décimales</td></tr>
      <tr><td>Produit ou quotient</td><td>le résultat a autant de chiffres significatifs que le facteur ayant le MOINS de chiffres significatifs</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> calculer $12{,}34 + 1{,}2$ et $3{,}45 \\times 2{,}1$, en respectant les règles de chiffres significatifs.</p>
      <p><strong>Solution :</strong> $12{,}34+1{,}2 = 13{,}54$ mathématiquement, mais $1{,}2$ n'a qu'une décimale : le résultat doit donc être arrondi à une décimale, soit $13{,}5$. $3{,}45\\times2{,}1 = 7{,}245$ mathématiquement, mais $2{,}1$ n'a que 2 chiffres significatifs : le résultat doit être arrondi à 2 chiffres significatifs, soit $7{,}2$.</p>
      <p class="example-answer">Réponse : $13{,}5$ (somme) et $7{,}2$ (produit) — dans les deux cas, la précision du résultat ne peut pas dépasser celle du terme le moins précis.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La règle de la somme porte sur les décimales, celle du produit sur les chiffres significatifs — deux critères différents qui donnent parfois des résultats numériquement identiques, parfois non. Peux-tu construire un exemple de somme où le nombre de décimales ET le nombre de chiffres significatifs du résultat coïncident par hasard avec ceux qu'aurait donnés (à tort) l'autre règle ?
    </div>

    <h3>3. Une erreur classique : le calcul intermédiaire</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — ne pas arrondir trop tôt</span>
      Il ne faut arrondir qu'au <strong>résultat final</strong> d'un calcul comportant plusieurs étapes, jamais aux étapes intermédiaires : arrondir prématurément accumule des erreurs d'arrondi qui peuvent fausser significativement le résultat final, un phénomène analogue à l'erreur de propagation déjà rencontrée en analyse numérique.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La sonde Mars Climate Orbiter s'est désintégrée à cause d'une confusion d'unités, mais un problème analogue — un arrondi trop précoce dans une longue chaîne de calculs — peut produire une erreur tout aussi silencieuse et difficile à détecter. Pourquoi une erreur d'arrondi accumulée sur de nombreuses étapes de calcul est-elle particulièrement insidieuse, comparée à une erreur d'unité qui, elle, saute généralement aux yeux ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>La question des chiffres significatifs prend une dimension nouvelle dans le calcul scientifique moderne : les ordinateurs représentent les nombres réels avec une précision finie (la « précision machine », typiquement 15 à 17 chiffres significatifs en double précision), et les erreurs d'arrondi accumulées sur des milliards d'opérations successives — par exemple dans une simulation climatique ou une prévision météorologique — peuvent, dans certains cas pathologiques, conduire à des résultats physiquement absurdes si elles ne sont pas maîtrisées par des méthodes numériques appropriées.</p>
    <p><strong>Question ouverte :</strong> comment quantifier rigoureusement, pour un algorithme de calcul scientifique complexe, l'accumulation totale des erreurs d'arrondi sur des milliers ou des millions d'opérations successives ? C'est un enjeu central de l'analyse numérique, discipline à l'interface des mathématiques et de l'informatique.</p>
    <p><strong>Technologie émergente :</strong> les processeurs spécialisés en arithmétique à précision mixte, utilisés notamment dans les superordinateurs de simulation scientifique, ajustent dynamiquement la précision numérique selon les besoins de chaque étape de calcul, pour optimiser à la fois la rapidité et la fiabilité des résultats.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Précision de l'instrument → nombre de chiffres significatifs → notation scientifique (lève toute ambiguïté) → règles de report dans les calculs (somme : décimales / produit : chiffres significatifs) → résultat final honnêtement précis
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$a \\times 10^n \\quad (1 \\le |a| < 10)$$
      Cette écriture en notation scientifique, en imposant un chiffre unique avant la virgule, force à énoncer explicitement combien de chiffres sont réellement significatifs — la meilleure garantie contre l'ambiguïté et la fausse précision dans tout résultat scientifique.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Zéros initiaux non significatifs ; zéros entre chiffres non nuls et zéros finaux après la virgule TOUJOURS significatifs</li>
        <li>Notation scientifique a×10ⁿ : lève toute ambiguïté sur le nombre de chiffres significatifs</li>
        <li>Somme/différence : le résultat garde le nombre de DÉCIMALES du terme le moins précis</li>
        <li>Produit/quotient : le résultat garde le nombre de CHIFFRES SIGNIFICATIFS du facteur le moins précis</li>
        <li>N'arrondir qu'au résultat final, jamais aux étapes intermédiaires d'un calcul</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre la règle des décimales (somme/différence) et celle des chiffres significatifs (produit/quotient) — ce sont deux règles DIFFÉRENTES</li>
        <li>Arrondir à chaque étape intermédiaire d'un calcul, ce qui accumule des erreurs</li>
        <li>Écrire un résultat avec plus de chiffres significatifs que ne le permet la précision des données de départ, suggérant une précision illusoire</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le nombre 0,00340 possède :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures3e1" value="wrong"> 6 chiffres significatifs</label>
          <label class="option"><input type="radio" name="mesures3e1" value="right"> 3 chiffres significatifs</label>
          <label class="option"><input type="radio" name="mesures3e1" value="wrong"> 2 chiffres significatifs</label>
          <label class="option"><input type="radio" name="mesures3e1" value="wrong"> 5 chiffres significatifs</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures3e1','mesures3fb1','Correct — les zéros initiaux (0,00) ne comptent pas, mais le zéro final après la virgule est significatif : 3, 4, 0 sont significatifs, soit 3 chiffres.','Les zéros AVANT le premier chiffre non nul ne comptent pas ; le zéro APRÈS le dernier chiffre non nul, lui, compte.')">Vérifier</button>
        <div class="feedback" id="mesures3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour une SOMME, le résultat doit avoir :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures3e2" value="wrong"> autant de chiffres significatifs que le terme le moins précis</label>
          <label class="option"><input type="radio" name="mesures3e2" value="right"> autant de décimales que le terme le moins précis</label>
          <label class="option"><input type="radio" name="mesures3e2" value="wrong"> toujours 2 décimales</label>
          <label class="option"><input type="radio" name="mesures3e2" value="wrong"> le maximum de décimales des termes</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures3e2','mesures3fb2','Correct — pour une somme ou une différence, c est le nombre de DÉCIMALES (pas de chiffres significatifs) du terme le moins précis qui fixe la précision du résultat.','Ne confonds pas la règle de la somme (décimales) avec celle du produit (chiffres significatifs).')">Vérifier</button>
        <div class="feedback" id="mesures3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans un calcul à plusieurs étapes, il faut arrondir :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures3e3" value="wrong"> à chaque étape intermédiaire</label>
          <label class="option"><input type="radio" name="mesures3e3" value="right"> uniquement au résultat final</label>
          <label class="option"><input type="radio" name="mesures3e3" value="wrong"> jamais</label>
          <label class="option"><input type="radio" name="mesures3e3" value="wrong"> uniquement à la première étape</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures3e3','mesures3fb3','Correct — arrondir prématurément accumule des erreurs d arrondi qui peuvent fausser le résultat final, un phénomène analogue à la propagation d erreur en calcul numérique.','Arrondir trop tôt provoque quel type de phénomène, déjà rencontré en analyse numérique ?')">Vérifier</button>
        <div class="feedback" id="mesures3fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si un instrument de mesure affichait systématiquement dix chiffres après la virgule, quelle que soit sa précision réelle : en quoi cela induirait-il l'utilisateur en erreur ?</li>
        <li>Pourquoi la confusion d'unités de la sonde Mars Climate Orbiter, aussi élémentaire soit-elle, a-t-elle pu passer inaperçue à travers toutes les étapes de vérification d'un projet spatial de plusieurs centaines de millions de dollars ?</li>
        <li>Quelle serait la conséquence, pour la fiabilité des simulations climatiques mondiales, d'une gestion négligente des erreurs d'arrondi accumulées sur des milliards de calculs successifs ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Bureau International des Poids et Mesures (BIPM), <em>Le Système international d'unités (SI)</em>, 9e édition, 2019 — conventions d'écriture des résultats de mesure.</li>
        <li>J.-P. Pérez, <em>Mesures physiques : méthodes et incertitudes</em>, Dunod — chapitre sur les chiffres significatifs et la notation scientifique.</li>
        <li>NASA, « Mars Climate Orbiter Mishap Investigation Board Phase I Report », rapport officiel d'enquête, 1999.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais exprimer un résultat expérimental avec exactement la précision qu'il mérite — un réflexe qui te suivra dans chaque compte-rendu de travaux pratiques et bien au-delà. Le chapitre suivant, « Incertitudes de mesure : évaluation de type A et de type B », va aller plus loin en te donnant les outils pour quantifier rigoureusement cette précision elle-même, et non plus seulement la représenter par un nombre de chiffres. Comme le rappelle sans relâche la culture de la métrologie : un résultat sans incertitude n'est pas vraiment un résultat scientifique — il n'en est qu'une moitié.</p>
  `
};

MESURES_NOVA_KB[mesuresKey("Chiffres significatifs et notation scientifique")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Chiffres significatifs et notation scientifique ». Demande-moi les règles de comptage, la différence somme/produit, ou un indice sur un exercice.",
  rules: [
    { test:/z[ée]ros? initi|z[ée]ros? finaux/i, replies:["Les zéros initiaux (avant le premier chiffre non nul) ne sont JAMAIS significatifs. Les zéros entre deux chiffres non nuls, et les zéros finaux après la virgule, sont TOUJOURS significatifs."] },
    { test:/notation scientifique/i, replies:["La notation scientifique a×10ⁿ (1≤|a|<10) lève toute ambiguïté sur le nombre de chiffres significatifs, contrairement à une écriture comme '2500 m' qui reste ambiguë."] },
    { test:/somme.*d[ée]cimale|r[èe]gle.*somme/i, replies:["Pour une somme ou une différence, le résultat garde le nombre de DÉCIMALES (pas de chiffres significatifs) du terme le moins précis."] },
    { test:/produit.*chiffres|r[èe]gle.*produit/i, replies:["Pour un produit ou un quotient, le résultat garde le nombre de CHIFFRES SIGNIFICATIFS du facteur le moins précis."] },
    { test:/arrondir.*[ée]tape|calcul interm[ée]diaire/i, replies:["Il ne faut arrondir qu'au résultat final d'un calcul à plusieurs étapes, jamais aux étapes intermédiaires, pour éviter d'accumuler des erreurs d'arrondi."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : distingue zéros initiaux et zéro final.","Indice niveau 2 : les zéros avant le 3 ne comptent pas ; le zéro après le 4 compte.","Indice niveau 3 : ce sont 3 chiffres significatifs (3, 4, 0)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : ne confonds pas somme et produit.","Indice niveau 2 : pour une somme, c'est le nombre de décimales qui compte.","Indice niveau 3 : le résultat garde le nombre de décimales du terme le moins précis."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à l'accumulation d'erreurs.","Indice niveau 2 : arrondir trop tôt fausse le résultat final.","Indice niveau 3 : il faut arrondir uniquement au résultat final."] }
  ]
};

/* =========================== CHAPITRE 4 =========================== */
MESURES_CHAPTERS[mesuresKey("Incertitudes de mesure : évaluation de type A et de type B")] = {
  objectives: [
    "Distinguer erreur systématique et erreur aléatoire",
    "Évaluer une incertitude de type A à partir d'une série de mesures répétées",
    "Évaluer une incertitude de type B à partir des spécifications d'un instrument",
    "Exprimer un résultat de mesure sous la forme normalisée (valeur ± incertitude, unité)",
    "Analyser pourquoi le GUM a remplacé, dans les années 1990, la distinction historique (et aujourd'hui jugée trompeuse) entre « erreurs aléatoires » et « erreurs systématiques » par celle, plus rigoureuse, entre incertitudes de type A et de type B"
  ],
  prereqs: ["Chiffres significatifs et notation scientifique"],
  bodyHtml: `
    <p>En 2011, l'expérience OPERA, menée dans un laboratoire souterrain italien, annonce avoir mesuré des neutrinos voyageant plus vite que la lumière — une observation qui, si elle avait été confirmée, aurait ébranlé la relativité restreinte d'Einstein et l'un des piliers les plus solides de toute la physique moderne. Quelques mois plus tard, l'équipe découvre l'origine de l'anomalie : un simple connecteur de fibre optique mal vissé, introduisant un retard systématique de 73 nanosecondes dans la chaîne de mesure du temps de vol. Cet épisode, aussi embarrassant qu'instructif, illustre parfaitement pourquoi la distinction entre erreur systématique et erreur aléatoire, au cœur de ce chapitre, n'est jamais un exercice académique abstrait : elle a des conséquences bien réelles, jusque dans les expériences les plus sophistiquées de la physique contemporaine.</p>
    <p>Avant les années 1990, les physiciens du monde entier utilisaient des conventions différentes, parfois incompatibles, pour exprimer l'incertitude de leurs mesures — un problème sérieux pour comparer des résultats obtenus dans des laboratoires différents. C'est pour résoudre cette cacophonie internationale que le <em>Guide pour l'expression de l'incertitude de mesure</em> (GUM) a été élaboré collectivement par les plus grandes organisations de métrologie mondiales, et fait aujourd'hui référence dans absolument tous les domaines scientifiques et industriels.</p>
    <p>Aucune mesure physique n'est jamais parfaitement exacte : elle est toujours entachée d'une <strong>incertitude</strong>, qu'il convient d'évaluer et d'exprimer rigoureusement. Ce chapitre présente le cadre moderne de l'évaluation des incertitudes, tel que défini par le GUM, norme internationale de référence en métrologie. À la fin de ce chapitre, tu sauras exprimer n'importe quel résultat de mesure avec son incertitude, dans les règles de l'art reconnues internationalement.</p>

    <h3>1. Erreur systématique et erreur aléatoire</h3>
    <table class="mini-table">
      <tr><th>Type d'erreur</th><th>Caractéristique</th><th>Exemple</th></tr>
      <tr><td>Erreur systématique</td><td>affecte toujours la mesure dans le même sens, de façon reproductible</td><td>instrument mal étalonné, offset de zéro non corrigé</td></tr>
      <tr><td>Erreur aléatoire</td><td>fluctue de façon imprévisible d'une mesure à l'autre, tend à se compenser sur un grand nombre de mesures</td><td>bruit électronique, imprécision de lecture, fluctuations de l'expérimentateur</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Répéter une mesure permet de réduire l'incertitude due aux erreurs ALÉATOIRES (par moyennage), mais ne corrige en rien une erreur SYSTÉMATIQUE, qui affecte identiquement chaque répétition : seul un étalonnage rigoureux de l'instrument (chapitre 6) permet de corriger ce second type d'erreur.
    </div>

    <h3>2. Incertitude de type A : évaluation statistique</h3>
    <p>L'<strong>incertitude de type A</strong> s'évalue par une analyse statistique d'une série de $n$ mesures répétées $x_1,\\ldots,x_n$ de la même grandeur. La meilleure estimation de la grandeur est la <strong>moyenne</strong> $\\bar{x}$, et l'incertitude-type associée à cette moyenne (écart-type de la moyenne) s'écrit :</p>
    <div class="formula-box">$$\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i, \\qquad u(\\bar{x}) = \\frac{s}{\\sqrt{n}}, \\qquad s = \\sqrt{\\frac{1}{n-1}\\sum_{i=1}^n (x_i-\\bar{x})^2}$$</div>
    <p>où $s$ est l'écart-type expérimental de la série de mesures. Le facteur $\\sqrt{n}$ au dénominateur traduit un résultat statistique important : l'incertitude sur la MOYENNE décroît lorsque le nombre de répétitions augmente, même si l'incertitude sur une mesure INDIVIDUELLE (donnée par $s$) reste, elle, globalement stable.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'incertitude-type de la moyenne décroît en $1/\\sqrt{n}$ : pour la diviser par 10, il faut multiplier le nombre de mesures par 100. Qu'est-ce que cette loi de décroissance très lente implique concrètement pour un expérimentateur qui chercherait à gagner un facteur 1000 sur la précision d'un résultat simplement en répétant davantage de mesures ?
    </div>

    <h3>3. Incertitude de type B : évaluation non statistique</h3>
    <p>L'<strong>incertitude de type B</strong> s'évalue par tout moyen autre que l'analyse statistique d'une série de mesures répétées : spécifications du constructeur de l'instrument, certificat d'étalonnage, résolution de l'appareil, jugement scientifique fondé sur l'expérience. Pour un instrument à affichage numérique de résolution $\\delta$ (le plus petit incrément affiché), on adopte fréquemment, en l'absence d'autre information, une distribution de probabilité uniforme sur l'intervalle $[-\\delta/2,+\\delta/2]$, donnant :</p>
    <div class="formula-box">$$u_B = \\frac{\\delta}{2\\sqrt{3}}$$</div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une règle graduée au millimètre est utilisée pour mesurer une longueur. Estimer l'incertitude de type B associée à la lecture.</p>
      <p><strong>Solution :</strong> résolution $\\delta=1$ mm. $u_B = \\dfrac{1}{2\\sqrt{3}} \\approx 0{,}29$ mm.</p>
      <p class="example-answer">Réponse : $u_B \\approx 0{,}29$ mm, souvent arrondie de façon pragmatique à $0{,}3$ mm — bien inférieure à la graduation elle-même, ce qui reflète le fait qu'un expérimentateur attentif peut estimer une position entre deux graduations avec une certaine confiance.</p>
    </div>

    <h3>4. Expression normalisée d'un résultat de mesure</h3>
    <p>Un résultat de mesure s'exprime toujours sous la forme $x = \\bar{x} \\pm u(x)$ [unité], en veillant à la cohérence des chiffres significatifs : l'incertitude elle-même s'exprime généralement avec <strong>1 ou 2 chiffres significatifs</strong> seulement, et la valeur mesurée est arrondie à la même décimale que l'incertitude.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'affaire des neutrinos supraluminiques de l'expérience OPERA (2011) provenait d'une erreur systématique (un câble mal branché), et non d'une erreur aléatoire mal estimée. Pourquoi une erreur systématique non détectée est-elle potentiellement bien plus dangereuse pour la crédibilité d'un résultat scientifique qu'une simple sous-estimation de l'incertitude aléatoire ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La détermination des incertitudes ne se limite pas aux travaux pratiques de licence : la découverte du boson de Higgs en 2012 au CERN n'a été officiellement validée qu'une fois l'incertitude statistique et systématique combinée réduite à un niveau correspondant à une signification statistique de 5 sigmas — un seuil extrêmement strict, correspondant à une probabilité d'environ une chance sur 3,5 millions que le signal observé soit un simple artefact statistique. Cette rigueur méthodologique, directement héritée des principes du GUM que tu viens d'étudier, est ce qui distingue une découverte scientifique solide d'une simple fluctuation statistique.</p>
    <p><strong>Question ouverte :</strong> comment évaluer rigoureusement l'incertitude de type B pour des instruments de mesure de plus en plus complexes, combinant capteurs, traitement numérique du signal et intelligence artificielle, où les sources d'erreur ne sont plus toujours identifiables individuellement ? C'est un défi méthodologique actuel de la métrologie moderne.</p>
    <p><strong>Technologie émergente :</strong> les capteurs auto-calibrants, capables d'estimer et de corriger en continu leurs propres dérives systématiques grâce à des algorithmes embarqués, se développent dans l'industrie 4.0 pour garantir une traçabilité métrologique constante sans intervention humaine.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Mesure physique → erreur systématique (non réduite par répétition) + erreur aléatoire (réduite par moyennage) → incertitude de type A (statistique) et de type B (non statistique) → résultat normalisé x = x̄ ± u(x)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$u(\\bar{x}) = \\frac{s}{\\sqrt{n}}$$
      Cette formule, qui relie l'incertitude sur une moyenne au nombre de répétitions, résume la promesse et la limite de toute démarche expérimentale rigoureuse : répéter une mesure améliore sa précision, mais seulement lentement, en $1/\\sqrt{n}$ — jamais gratuitement, et jamais contre une erreur systématique non détectée.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Erreur systématique (reproductible, non corrigée par répétition) vs erreur aléatoire (fluctuante, réduite par moyennage)</li>
        <li>Incertitude de type A : u(x̄)=s/√n, à partir d'une série statistique de mesures répétées</li>
        <li>Incertitude de type B : évaluation non statistique (résolution instrumentale, spécifications) ; pour une résolution δ, uB=δ/(2√3)</li>
        <li>Résultat normalisé : x = x̄ ± u(x) [unité], avec cohérence des chiffres significatifs entre valeur et incertitude</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que répéter une mesure corrige une erreur systématique : seule une erreur ALÉATOIRE est réduite par répétition et moyennage</li>
        <li>Confondre l'écart-type s d'une série (incertitude sur UNE mesure individuelle) et l'incertitude-type de la moyenne u(x̄)=s/√n (bien plus petite pour n grand)</li>
        <li>Exprimer une incertitude avec trop de chiffres significatifs (l'incertitude elle-même n'est jamais connue avec une grande précision : 1 à 2 chiffres suffisent)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Répéter une mesure et moyenner permet de réduire principalement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures4e1" value="wrong"> l'erreur systématique</label>
          <label class="option"><input type="radio" name="mesures4e1" value="right"> l'erreur aléatoire</label>
          <label class="option"><input type="radio" name="mesures4e1" value="wrong"> les deux également</label>
          <label class="option"><input type="radio" name="mesures4e1" value="wrong"> aucune des deux</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures4e1','mesures4fb1','Correct — l erreur systématique affecte identiquement chaque mesure et n est pas réduite par répétition ; seule l erreur aléatoire, qui fluctue, est atténuée par le moyennage.','Une erreur qui affecte TOUJOURS la mesure dans le même sens peut-elle être corrigée par la répétition ?')">Vérifier</button>
        <div class="feedback" id="mesures4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'incertitude-type de la moyenne u(x̄)=s/√n :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures4e2" value="wrong"> augmente quand n augmente</label>
          <label class="option"><input type="radio" name="mesures4e2" value="right"> diminue quand n augmente</label>
          <label class="option"><input type="radio" name="mesures4e2" value="wrong"> reste constante</label>
          <label class="option"><input type="radio" name="mesures4e2" value="wrong"> ne dépend pas de s</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures4e2','mesures4fb2','Correct — n est au dénominateur sous une racine carrée : plus on répète de mesures, plus l incertitude sur la moyenne diminue (mais de moins en moins vite).','n est au dénominateur : que se passe-t-il quand le dénominateur augmente ?')">Vérifier</button>
        <div class="feedback" id="mesures4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour un instrument de résolution δ, l'incertitude de type B associée (loi uniforme) vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures4e3" value="wrong"> δ</label>
          <label class="option"><input type="radio" name="mesures4e3" value="wrong"> δ/2</label>
          <label class="option"><input type="radio" name="mesures4e3" value="right"> δ/(2√3)</label>
          <label class="option"><input type="radio" name="mesures4e3" value="wrong"> δ²</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures4e3','mesures4fb3','Correct — pour une distribution uniforme sur un intervalle de largeur δ, l écart-type vaut δ divisé par 2 racine de 3.','C est la formule classique de l écart-type d une loi uniforme sur un intervalle de largeur δ.')">Vérifier</button>
        <div class="feedback" id="mesures4fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on pouvait répéter une mesure un nombre infini de fois : l'incertitude de type A tendrait-elle vers zéro, et cela suffirait-il à garantir un résultat parfaitement exact ?</li>
        <li>Pourquoi l'équipe d'OPERA, malgré des mois de vérifications avant de publier son résultat surprenant, n'a-t-elle pas immédiatement détecté le câble mal branché à l'origine de l'anomalie ?</li>
        <li>Quelle serait la conséquence, pour la crédibilité de la science, si les chercheurs cessaient d'exprimer systématiquement leurs résultats avec une incertitude clairement quantifiée ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>BIPM, JCGM 100:2008, <em>Guide pour l'expression de l'incertitude de mesure (GUM)</em>, Bureau International des Poids et Mesures, 2008 — texte de référence international sur l'évaluation des incertitudes.</li>
        <li>J.-P. Pérez, <em>Mesures physiques : méthodes et incertitudes</em>, Dunod — chapitre sur les incertitudes de type A et de type B.</li>
        <li>OPERA Collaboration, « Measurement of the Neutrino Velocity with the OPERA Detector in the CNGS Beam » (et erratum ultérieur), Journal of High Energy Physics, 2012.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais du cadre rigoureux, reconnu internationalement, pour exprimer n'importe quel résultat expérimental avec son incertitude associée. Le chapitre suivant, « Propagation des incertitudes », va répondre à une question tout aussi essentielle : que devient l'incertitude d'une grandeur mesurée directement lorsqu'on l'utilise dans un calcul faisant intervenir d'autres grandeurs, elles-mêmes incertaines ? Comme le rappelait le physicien Enrico Fermi à ses étudiants : « Il y a deux possibilités : vous réussissez, ou vous apprenez quelque chose. » L'incertitude bien mesurée, loin d'être un aveu de faiblesse, est précisément ce qui rend un résultat scientifique digne de confiance.</p>
  `
};

MESURES_NOVA_KB[mesuresKey("Incertitudes de mesure : évaluation de type A et de type B")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Incertitudes de mesure : type A et type B ». Demande-moi la différence erreur systématique/aléatoire, les formules du GUM, ou un indice sur un exercice.",
  rules: [
    { test:/erreur syst[ée]matique/i, replies:["Une erreur systématique affecte toujours la mesure dans le même sens (instrument mal étalonné...) et n'est PAS corrigée par la répétition : il faut un étalonnage rigoureux pour la corriger."] },
    { test:/erreur al[ée]atoire/i, replies:["Une erreur aléatoire fluctue de façon imprévisible d'une mesure à l'autre ; elle est réduite en répétant les mesures et en moyennant (incertitude-type de la moyenne en 1/√n)."] },
    { test:/type a|incertitude.*statistique/i, replies:["L'incertitude de type A s'évalue statistiquement à partir d'une série de mesures répétées : u(x̄)=s/√n, où s est l'écart-type expérimental."] },
    { test:/type b/i, replies:["L'incertitude de type B s'évalue par des moyens non statistiques : résolution de l'instrument, spécifications constructeur. Pour une résolution δ (loi uniforme), uB=δ/(2√3)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : une erreur toujours dans le même sens peut-elle être corrigée par répétition ?","Indice niveau 2 : non, seule l'erreur qui fluctue est atténuée.","Indice niveau 3 : c'est l'erreur aléatoire qui est réduite."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde où se trouve n dans la formule.","Indice niveau 2 : n est au dénominateur, sous une racine.","Indice niveau 3 : l'incertitude sur la moyenne diminue quand n augmente."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : c'est la formule classique de l'écart-type d'une loi uniforme.","Indice niveau 2 : elle fait intervenir une racine de 3.","Indice niveau 3 : c'est δ/(2√3)."] }
  ]
};

/* =========================== CHAPITRE 5 =========================== */
MESURES_CHAPTERS[mesuresKey("Propagation des incertitudes")] = {
  objectives: [
    "Établir la loi de propagation des incertitudes pour une somme et une différence",
    "Établir la loi de propagation des incertitudes pour un produit et un quotient",
    "Appliquer la formule générale de propagation à une fonction quelconque de plusieurs variables mesurées",
    "Identifier la contribution dominante à l'incertitude finale dans un calcul composite",
    "Évaluer, avant même de faire une expérience, quelle mesure mérite d'être améliorée en priorité pour réduire efficacement l'incertitude finale d'un résultat"
  ],
  prereqs: ["Incertitudes de mesure : évaluation de type A et de type B"],
  bodyHtml: `
    <p>La détermination expérimentale de la vitesse de la lumière par Ole Rømer en 1676, réalisée en observant les éclipses des lunes de Jupiter, comportait des incertitudes considérables sur chacune des grandeurs mesurées séparément — la distance Terre-Jupiter, le décalage temporel des éclipses observées. Pourtant, en combinant intelligemment ces mesures imparfaites, Rømer obtint un ordre de grandeur remarquablement proche de la valeur aujourd'hui connue avec onze chiffres significatifs exacts. Ce tour de force illustre une vérité que ce chapitre te propose de formaliser rigoureusement : la précision d'un résultat calculé à partir de plusieurs mesures ne se devine pas intuitivement, elle se calcule.</p>
    <p>Chaque physicien expérimentateur, du premier TP de licence au projet de recherche le plus avancé, se heurte tôt ou tard à la même question pratique : si je veux améliorer la précision de mon résultat final, sur laquelle des grandeurs que je mesure dois-je concentrer mes efforts ? Ce chapitre te donne les outils mathématiques pour répondre précisément à cette question — et t'éviter de perdre un temps précieux à peaufiner une mesure dont l'incertitude, de toute façon, ne contribue que marginalement au résultat final.</p>
    <p>Lorsqu'une grandeur $z$ est calculée à partir de plusieurs grandeurs mesurées $x,y,\\ldots$, chacune entachée de sa propre incertitude, il faut déterminer comment ces incertitudes se combinent pour donner l'incertitude finale sur $z$ : c'est l'objet de la <strong>propagation des incertitudes</strong>. À la fin de ce chapitre, tu sauras calculer précisément l'incertitude de n'importe quel résultat composite, et identifier immédiatement la mesure qu'il vaut la peine d'améliorer en priorité.</p>

    <h3>1. Propagation pour une somme ou une différence</h3>
    <p>Pour $z = x \\pm y$ (grandeurs mesurées indépendamment), les incertitudes se combinent <strong>quadratiquement</strong> (et non de façon additive simple, hypothèse trop pessimiste qui surestimerait l'incertitude réelle) :</p>
    <div class="formula-box">$$u(z) = \\sqrt{u(x)^2 + u(y)^2}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi une somme quadratique ?</span>
      La combinaison quadratique traduit le fait que des erreurs indépendantes ont une faible probabilité de se cumuler systématiquement dans le même sens : statistiquement, une partie des fluctuations de $x$ et de $y$ se compense. La simple addition des incertitudes ($u(x)+u(y)$) donnerait une estimation excessivement pessimiste de l'incertitude réelle.
    </div>

    <h3>2. Propagation pour un produit ou un quotient</h3>
    <p>Pour $z = x\\times y$ ou $z=x/y$, ce sont les <strong>incertitudes relatives</strong> qui se combinent quadratiquement :</p>
    <div class="formula-box">$$\\frac{u(z)}{|z|} = \\sqrt{\\left(\\frac{u(x)}{x}\\right)^2 + \\left(\\frac{u(y)}{y}\\right)^2}$$</div>

    <h3>3. Formule générale de propagation (dérivées partielles)</h3>
    <p>Pour une fonction quelconque $z=f(x,y,\\ldots)$ de plusieurs variables mesurées indépendantes, la loi générale de propagation des incertitudes (issue d'un développement de Taylor au premier ordre) s'écrit :</p>
    <div class="formula-box">$$u(z) = \\sqrt{\\left(\\frac{\\partial f}{\\partial x}\\right)^2 u(x)^2 + \\left(\\frac{\\partial f}{\\partial y}\\right)^2 u(y)^2 + \\cdots}$$</div>
    <p>Cette formule générale redonne bien les deux cas particuliers précédents (somme, produit) et s'applique à n'importe quelle relation, aussi complexe soit-elle, entre les grandeurs mesurées.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> on mesure le rayon d'un cercle $r = 5{,}00 \\pm 0{,}05$ cm. Calculer l'aire $A=\\pi r^2$ et son incertitude.</p>
      <p><strong>Solution :</strong> $A = \\pi\\times5{,}00^2 = 78{,}54$ cm². $\\dfrac{\\partial A}{\\partial r} = 2\\pi r$, donc $u(A) = 2\\pi r\\, u(r) = 2\\pi\\times5{,}00\\times0{,}05 \\approx 1{,}57$ cm².</p>
      <p class="example-answer">Réponse : $A = 78{,}5 \\pm 1{,}6$ cm² (arrondi à la cohérence des chiffres significatifs entre valeur et incertitude).</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Dans l'exemple de l'aire du cercle, l'incertitude relative sur $r$ est de $0{,}05/5{,}00=1\\%$, mais l'incertitude relative sur $A=\\pi r^2$ est le double, soit environ $2\\%$. Sachant que $A$ dépend de $r$ au carré, peux-tu généraliser cette observation : pour une relation du type $z=x^n$, quel facteur multiplicateur relie l'incertitude relative de $z$ à celle de $x$ ?
    </div>

    <h3>4. Identifier la contribution dominante</h3>
    <p>Dans un calcul composite, il est souvent instructif d'examiner séparément la contribution de chaque terme à l'incertitude quadratique totale : le terme dominant (celui dont le carré contribue le plus à la somme sous la racine) indique quelle mesure il faudrait améliorer en priorité pour réduire significativement l'incertitude finale — un principe précieux pour optimiser un protocole expérimental.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Parce que les incertitudes se combinent quadratiquement, un terme deux fois plus petit qu'un autre ne contribue que pour un quart à la somme sous la racine. Qu'est-ce que cela implique, en pratique, pour un expérimentateur qui voudrait significativement réduire l'incertitude totale d'un résultat en améliorant seulement UNE des mesures qui le composent ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La propagation rigoureuse des incertitudes est absolument centrale à la physique des particules : c'est elle qui a permis d'établir, avec une confiance statistique extrême, la masse du boson de Higgs découvert en 2012 au CERN, en combinant les incertitudes de milliers de mesures individuelles de collisions de particules. En astrophysique, la propagation des incertitudes sur la distance, la luminosité et le redshift des supernovae lointaines a été essentielle pour établir, en 1998, l'accélération de l'expansion de l'Univers — une découverte récompensée par le prix Nobel de physique 2011.</p>
    <p><strong>Question ouverte :</strong> comment propager rigoureusement des incertitudes lorsque les grandeurs mesurées ne sont pas indépendantes, mais corrélées entre elles (par exemple, deux mesures réalisées avec le même instrument partiellement défaillant) ? C'est un problème mathématiquement plus subtil, activement traité en statistique appliquée à la physique expérimentale (matrices de covariance).</p>
    <p><strong>Technologie émergente :</strong> les méthodes de simulation Monte-Carlo, qui propagent numériquement les incertitudes en générant des milliers de scénarios aléatoires plutôt qu'en utilisant des formules analytiques, se généralisent aujourd'hui pour traiter des systèmes de mesure trop complexes pour une propagation par dérivées partielles classique.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Grandeurs mesurées (x, y, ...) avec leurs incertitudes → relation z=f(x,y,...) → dérivées partielles ∂f/∂x, ∂f/∂y → combinaison quadratique → incertitude finale u(z) → identification du terme dominant
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$u(z) = \\sqrt{\\sum_i \\left(\\frac{\\partial f}{\\partial x_i}\\right)^2 u(x_i)^2}$$
      Cette formule générale, issue d'un développement de Taylor au premier ordre, unifie tous les cas particuliers de ce chapitre (somme, produit, puissance) en une seule expression — le véritable outil de tout physicien expérimentateur pour transformer des mesures individuelles imparfaites en un résultat final rigoureusement quantifié.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Somme/différence : les incertitudes ABSOLUES s'ajoutent quadratiquement, u(z)=√(u(x)²+u(y)²)</li>
        <li>Produit/quotient : les incertitudes RELATIVES s'ajoutent quadratiquement</li>
        <li>Formule générale : u(z)=√(Σ (∂f/∂xi)² u(xi)²), à partir des dérivées partielles</li>
        <li>Identifier le terme dominant dans la somme quadratique indique où améliorer la mesure en priorité</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Additionner simplement les incertitudes (u(x)+u(y)) au lieu de les combiner quadratiquement, ce qui surestime l'incertitude réelle</li>
        <li>Utiliser la règle du produit (incertitudes relatives) pour une somme, ou inversement — ce sont deux règles différentes</li>
        <li>Oublier que la formule générale suppose des grandeurs mesurées de façon INDÉPENDANTE : des mesures corrélées nécessitent un traitement plus complexe</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — propagation d'incertitude (somme et produit)</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre deux grandeurs mesurées avec leur incertitude pour voir la propagation sur leur somme et leur produit.</p>
      <div class="sim-controls">
        <label>x : <input type="number" id="mesuresX" value="5" step="0.1" style="width:60px;" oninput="updateMesuresPropag()"></label>
        <label>u(x) : <input type="number" id="mesuresDx" value="0.1" step="0.01" style="width:60px;" oninput="updateMesuresPropag()"></label><br>
        <label>y : <input type="number" id="mesuresY" value="3" step="0.1" style="width:60px;" oninput="updateMesuresPropag()"></label>
        <label>u(y) : <input type="number" id="mesuresDy" value="0.2" step="0.01" style="width:60px;" oninput="updateMesuresPropag()"></label>
        <div class="sim-readout" id="mesuresPropagReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour z=x+y, les incertitudes se combinent :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures5e1" value="wrong"> par simple addition u(x)+u(y)</label>
          <label class="option"><input type="radio" name="mesures5e1" value="right"> quadratiquement, √(u(x)²+u(y)²)</label>
          <label class="option"><input type="radio" name="mesures5e1" value="wrong"> en les multipliant</label>
          <label class="option"><input type="radio" name="mesures5e1" value="wrong"> en prenant la plus grande des deux</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures5e1','mesures5fb1','Correct — la combinaison quadratique traduit le fait que des erreurs indépendantes ne se cumulent pas systématiquement dans le même sens.','La simple addition serait trop pessimiste : quelle combinaison est statistiquement plus réaliste ?')">Vérifier</button>
        <div class="feedback" id="mesures5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour un produit z=x·y, ce sont les incertitudes ... qui se combinent quadratiquement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures5e2" value="wrong"> absolues</label>
          <label class="option"><input type="radio" name="mesures5e2" value="right"> relatives</label>
          <label class="option"><input type="radio" name="mesures5e2" value="wrong"> au carré</label>
          <label class="option"><input type="radio" name="mesures5e2" value="wrong"> logarithmiques</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures5e2','mesures5fb2','Correct — pour un produit ou un quotient, ce sont les incertitudes RELATIVES (u(x)/x) qui se combinent quadratiquement, pas les incertitudes absolues.','Pour la somme, ce sont les incertitudes absolues ; pour le produit, une autre grandeur.')">Vérifier</button>
        <div class="feedback" id="mesures5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La formule générale de propagation des incertitudes est construite à partir :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures5e3" value="wrong"> des intégrales de f</label>
          <label class="option"><input type="radio" name="mesures5e3" value="right"> des dérivées partielles de f</label>
          <label class="option"><input type="radio" name="mesures5e3" value="wrong"> de la valeur de f seule</label>
          <label class="option"><input type="radio" name="mesures5e3" value="wrong"> du logarithme de f</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures5e3','mesures5fb3','Correct — la formule générale utilise les dérivées partielles de f par rapport à chaque variable mesurée, issues d un développement de Taylor au premier ordre.','Cette formule vient d un développement limité de f au premier ordre : quel outil mathématique cela fait-il intervenir ?')">Vérifier</button>
        <div class="feedback" id="mesures5fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si deux grandeurs mesurées dans un même calcul étaient fortement corrélées (par exemple issues du même instrument défectueux) : la formule de propagation quadratique présentée ici resterait-elle valable telle quelle ?</li>
        <li>Pourquoi la combinaison quadratique des incertitudes est-elle toujours plus optimiste (plus petite) que la simple addition des incertitudes, et cette optimisme est-il pour autant injustifié ?</li>
        <li>Quelle serait la conséquence, pour la découverte du boson de Higgs, d'une mauvaise propagation des incertitudes ayant conduit à sous-estimer l'incertitude finale du signal observé ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>BIPM, JCGM 100:2008, <em>Guide pour l'expression de l'incertitude de mesure (GUM)</em>, Bureau International des Poids et Mesures, 2008 — méthode générale de propagation des incertitudes.</li>
        <li>J.-P. Pérez, <em>Mesures physiques : méthodes et incertitudes</em>, Dunod — chapitre sur la propagation des incertitudes.</li>
        <li>ATLAS Collaboration, « Observation of a New Particle in the Search for the Standard Model Higgs Boson », Physics Letters B, 2012 — exemple emblématique de propagation rigoureuse d'incertitudes en physique des particules.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais transformer plusieurs mesures individuelles, chacune imparfaite, en un résultat final dont l'incertitude est rigoureusement quantifiée — l'un des savoir-faire les plus utiles de toute ta formation scientifique. Le dernier chapitre de ce cours, « Étalonnage, justesse, fidélité et normes métrologiques », va compléter cette rigueur en abordant la fiabilité des instruments eux-mêmes : comment s'assurer qu'ils mesurent vraiment ce qu'ils prétendent mesurer ? Comme le disait Ole Rømer, dont la détermination pionnière de la vitesse de la lumière a ouvert la voie à toute la métrologie moderne : mesurer, c'est déjà commencer à comprendre.</p>
  `,
  init: initMesuresPropag
};

MESURES_NOVA_KB[mesuresKey("Propagation des incertitudes")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Propagation des incertitudes ». Demande-moi la différence somme/produit, la formule générale, ou un indice sur un exercice.",
  rules: [
    { test:/somme.*incertitude|z=x\\+y/i, replies:["Pour z=x+y, les incertitudes ABSOLUES se combinent quadratiquement : u(z)=√(u(x)²+u(y)²)."] },
    { test:/produit.*incertitude|z=x.?y|relative/i, replies:["Pour z=x·y ou z=x/y, ce sont les incertitudes RELATIVES qui se combinent quadratiquement : u(z)/|z|=√[(u(x)/x)²+(u(y)/y)²]."] },
    { test:/formule g[ée]n[ée]rale|d[ée]riv[ée]es partielles/i, replies:["La formule générale u(z)=√[Σ(∂f/∂xi)²u(xi)²] utilise les dérivées partielles de f, issues d'un développement de Taylor au premier ordre — elle englobe les cas particuliers somme et produit."] },
    { test:/quadratique|pourquoi.*racine/i, replies:["La combinaison quadratique (et non une simple addition) traduit le fait que des erreurs indépendantes ne se cumulent pas systématiquement dans le même sens — la simple addition serait trop pessimiste."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : la simple addition serait trop pessimiste.","Indice niveau 2 : pense à une combinaison plus réaliste statistiquement.","Indice niveau 3 : c'est la combinaison quadratique √(u(x)²+u(y)²)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : ce n'est pas la même règle que pour la somme.","Indice niveau 2 : pour un produit, on utilise des incertitudes en pourcentage.","Indice niveau 3 : ce sont les incertitudes relatives."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : cette formule vient d'un développement limité.","Indice niveau 2 : elle utilise les dérivées de f par rapport à chaque variable.","Indice niveau 3 : ce sont les dérivées partielles de f."] }
  ]
};

/* =========================== CHAPITRE 6 =========================== */
MESURES_CHAPTERS[mesuresKey('Étalonnage, justesse, fidélité et normes métrologiques')] = {
  objectives: [
    "Définir l'étalonnage d'un instrument de mesure et son objectif",
    "Distinguer justesse (absence d'erreur systématique) et fidélité (faible dispersion aléatoire)",
    "Décrire la chaîne de traçabilité métrologique jusqu'aux étalons primaires",
    "Situer le rôle des organismes de normalisation (BIPM, ISO, COFRAC) dans la métrologie",
    "Analyser pourquoi ce dernier chapitre, en apparence institutionnel, constitue en réalité la garantie ultime de fiabilité de toute la physique expérimentale mondiale"
  ],
  prereqs: ["Propagation des incertitudes"],
  bodyHtml: `
    <p>Chaque seconde qui s'écoule dans le monde entier — pour synchroniser les marchés financiers, coordonner les satellites GPS, ou simplement afficher l'heure sur ton téléphone — remonte, par une chaîne ininterrompue de comparaisons documentées, à un réseau d'environ 450 horloges atomiques réparties dans plus de 80 laboratoires nationaux de métrologie à travers le monde, coordonnées par le Bureau International des Poids et Mesures près de Paris. Cette infrastructure discrète, dont la plupart des utilisateurs n'ont jamais entendu parler, est pourtant l'un des piliers invisibles les plus critiques de la civilisation technologique moderne.</p>
    <p>Ce réseau mondial de traçabilité métrologique n'a rien d'un détail bureaucratique : c'est lui qui garantit qu'un médicament dosé en Chine, un composant électronique fabriqué au Japon et un pont construit en France reposent tous sur des mesures rigoureusement comparables. Sans cette infrastructure de confiance mutuelle entre nations, patiemment construite depuis la Convention du Mètre signée en 1875 par dix-sept pays, aucun commerce international de précision, aucune collaboration scientifique transnationale, ne serait possible avec la fiabilité que nous tenons aujourd'hui pour acquise.</p>
    <p>Ce dernier chapitre relie les notions individuelles des chapitres précédents (unités, incertitudes) à l'organisation institutionnelle qui garantit, à l'échelle mondiale, la cohérence et la fiabilité de toute mesure physique : la <strong>métrologie légale</strong>, l'étalonnage des instruments, et les normes internationales qui encadrent ces pratiques. À la fin de ce chapitre — et de ce module — tu comprendras que la rigueur métrologique que tu as apprise à l'échelle d'un TP se prolonge, sans discontinuité, jusqu'à une infrastructure mondiale bâtie depuis près de 150 ans.</p>

    <h3>1. Justesse et fidélité : deux qualités distinctes d'un instrument</h3>
    <p>Ces deux termes, souvent confondus dans le langage courant, décrivent des qualités métrologiques bien différentes d'un instrument de mesure :</p>
    <table class="mini-table">
      <tr><th>Qualité</th><th>Définition</th><th>Lien avec le type d'erreur</th></tr>
      <tr><td>Justesse</td><td>capacité à donner, en moyenne sur de nombreuses mesures, une valeur proche de la valeur vraie</td><td>absence d'erreur SYSTÉMATIQUE</td></tr>
      <tr><td>Fidélité</td><td>capacité à donner des résultats peu dispersés lorsqu'on répète la mesure dans les mêmes conditions</td><td>faible erreur ALÉATOIRE</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — un instrument peut être fidèle sans être juste (et réciproquement)</span>
      Une balance mal tarée (offset de zéro non corrigé) peut être parfaitement <strong>fidèle</strong> (résultats très reproductibles) tout en étant totalement <strong>injuste</strong> (systématiquement décalée par rapport à la valeur vraie). Inversement, un instrument peut être juste « en moyenne » tout en étant peu fidèle (grande dispersion autour de la bonne valeur moyenne). Un bon instrument de mesure doit être à la fois juste ET fidèle — on parle alors d'exactitude.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un archer qui tire toujours dans le même coin de la cible, à l'écart du centre, est fidèle mais peu juste. Un archer dont les flèches se répartissent tout autour du centre, mais de façon très dispersée, est juste en moyenne mais peu fidèle. Lequel des deux archers te semble, en pratique, le plus facile à « corriger » pour devenir exact — et pourquoi ?
    </div>

    <h3>2. L'étalonnage : corriger la justesse d'un instrument</h3>
    <p>L'<strong>étalonnage</strong> consiste à comparer les indications d'un instrument à celles d'un <strong>étalon de référence</strong>, de valeur connue avec une incertitude beaucoup plus faible, afin de déterminer (et de corriger, ou au moins de quantifier) l'écart systématique de l'instrument. Un certificat d'étalonnage fournit typiquement une courbe ou un tableau de correction, valable pour une durée limitée (l'instrument pouvant dériver dans le temps), avec l'incertitude associée à cette correction.</p>

    <h3>3. Chaîne de traçabilité métrologique</h3>
    <p>La <strong>traçabilité métrologique</strong> désigne la chaîne ininterrompue de comparaisons, chacune avec une incertitude documentée, reliant un instrument de mesure quelconque (par exemple, un thermomètre de laboratoire) jusqu'aux <strong>étalons primaires</strong> internationaux, eux-mêmes définis à partir des constantes physiques fondamentales du SI (chapitre 1) :</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — la pyramide de la traçabilité</span>
      Un instrument de laboratoire est étalonné par rapport à un étalon de travail, lui-même étalonné par rapport à un étalon de référence national, lui-même relié aux étalons primaires internationaux conservés ou matérialisés par le Bureau international des poids et mesures (BIPM, Sèvres, France). Cette chaîne garantit qu'une mesure effectuée n'importe où dans le monde est comparable, avec une incertitude connue, à toute autre mesure de la même grandeur.
    </div>

    <h3>4. Organismes de normalisation</h3>
    <table class="mini-table">
      <tr><th>Organisme</th><th>Rôle</th></tr>
      <tr><td>BIPM (Bureau International des Poids et Mesures)</td><td>garantit l'unicité mondiale du Système international d'unités et la comparabilité des étalons nationaux</td></tr>
      <tr><td>ISO (Organisation internationale de normalisation)</td><td>publie des normes internationales, dont le GUM (Guide pour l'expression de l'incertitude de mesure)</td></tr>
      <tr><td>COFRAC (en France) et organismes équivalents</td><td>accréditent les laboratoires d'étalonnage et d'essais, garantissant la compétence technique et la traçabilité de leurs mesures</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — synthèse</span>
      <p><strong>Énoncé :</strong> un laboratoire de recherche utilise un thermomètre de précision. Décrire brièvement la chaîne de traçabilité qui garantit la fiabilité de ses mesures de température.</p>
      <p><strong>Solution :</strong> le thermomètre du laboratoire est étalonné périodiquement par un organisme accrédité (COFRAC ou équivalent), par comparaison à un étalon de référence de température (point triple de l'eau, par exemple), lui-même relié, via une chaîne ininterrompue de comparaisons documentées, à la définition SI du kelvin (fixée par la constante de Boltzmann, chapitre 1).</p>
      <p class="example-answer">Réponse : cette chaîne garantit que la mesure de température du laboratoire est traçable, avec une incertitude connue à chaque étape, jusqu'à la définition internationale du kelvin — condition indispensable pour que ses résultats soient comparables à ceux de tout autre laboratoire dans le monde.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La Convention du Mètre, signée en 1875 par dix-sept pays, a créé une infrastructure de confiance métrologique mutuelle qui perdure encore aujourd'hui, plus de 150 ans plus tard. En quoi cette coopération scientifique internationale, née bien avant la plupart des institutions politiques mondiales actuelles, te semble-t-elle un exemple particulièrement réussi et durable de collaboration entre nations ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La métrologie continue d'évoluer avec la science elle-même : depuis la redéfinition du SI en 2019 (chapitre 1), les laboratoires nationaux de métrologie travaillent activement à améliorer encore la précision des horloges atomiques optiques, qui pourraient bientôt redéfinir la seconde elle-même avec une exactitude sans précédent. Par ailleurs, la métrologie quantique, qui exploite des effets d'intrication et de superposition quantique pour mesurer des grandeurs physiques au-delà des limites classiques, ouvre la voie à une nouvelle génération de capteurs et d'étalons encore plus précis.</p>
    <p><strong>Question ouverte :</strong> jusqu'où peut-on repousser la précision métrologique avant de se heurter à des limites fondamentales imposées par la mécanique quantique elle-même (le principe d'incertitude d'Heisenberg) ? C'est une question active de recherche en métrologie quantique de pointe.</p>
    <p><strong>Technologie émergente :</strong> les réseaux d'horloges atomiques optiques interconnectés par fibre optique, actuellement en développement entre laboratoires européens, pourraient bientôt permettre de détecter des variations infimes du champ gravitationnel terrestre — une application inattendue de la métrologie de haute précision à la géophysique.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Instrument de mesure → justesse (erreur systématique) et fidélité (erreur aléatoire) → étalonnage face à un étalon de référence → chaîne de traçabilité → étalons primaires internationaux (BIPM) → mesure fiable et comparable dans le monde entier
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Exactitude} = \\text{Justesse} + \\text{Fidélité}$$
      Cette relation, plus conceptuelle que mathématique, résume l'exigence ultime de toute la métrologie : un résultat de mesure n'est réellement digne de confiance que s'il est à la fois proche de la valeur vraie (justesse) ET reproductible (fidélité) — les deux qualités que garantit, à l'échelle mondiale, toute la chaîne institutionnelle décrite dans ce chapitre.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Justesse = absence d'erreur systématique ; Fidélité = faible erreur aléatoire (faible dispersion) — deux qualités indépendantes</li>
        <li>Un instrument peut être fidèle sans être juste, et réciproquement ; l'exactitude exige les deux qualités à la fois</li>
        <li>L'étalonnage compare un instrument à un étalon de référence pour quantifier/corriger son écart systématique</li>
        <li>Traçabilité métrologique : chaîne ininterrompue de comparaisons reliant tout instrument aux étalons primaires internationaux (BIPM)</li>
        <li>Organismes clés : BIPM (unicité mondiale du SI), ISO (normes, dont le GUM), COFRAC (accréditation des laboratoires)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre justesse et fidélité, utilisées de façon interchangeable dans le langage courant mais rigoureusement distinctes en métrologie</li>
        <li>Croire qu'un instrument fidèle (résultats reproductibles) est automatiquement juste (proche de la valeur vraie) : la fidélité ne garantit en rien l'absence d'erreur systématique</li>
        <li>Négliger la date de validité d'un certificat d'étalonnage : un instrument peut dériver dans le temps, nécessitant un ré-étalonnage périodique</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un instrument dont les mesures répétées sont très regroupées, mais systématiquement décalées de la valeur vraie, est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures6e1" value="wrong"> juste mais peu fidèle</label>
          <label class="option"><input type="radio" name="mesures6e1" value="right"> fidèle mais peu juste</label>
          <label class="option"><input type="radio" name="mesures6e1" value="wrong"> ni juste ni fidèle</label>
          <label class="option"><input type="radio" name="mesures6e1" value="wrong"> exact</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures6e1','mesures6fb1','Correct — des mesures regroupées (faible dispersion) traduisent une bonne fidélité ; un décalage systématique traduit un manque de justesse.','Regroupées = faible dispersion = quelle qualité ? Décalées systématiquement = quel défaut ?')">Vérifier</button>
        <div class="feedback" id="mesures6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'étalonnage d'un instrument consiste à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures6e2" value="wrong"> réparer l'instrument</label>
          <label class="option"><input type="radio" name="mesures6e2" value="right"> comparer ses indications à un étalon de référence</label>
          <label class="option"><input type="radio" name="mesures6e2" value="wrong"> changer ses piles</label>
          <label class="option"><input type="radio" name="mesures6e2" value="wrong"> augmenter sa résolution</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures6e2','mesures6fb2','Correct — l étalonnage compare l instrument à un étalon de référence de valeur connue, pour quantifier et éventuellement corriger son écart systématique.','L étalonnage nécessite une référence externe : laquelle ?')">Vérifier</button>
        <div class="feedback" id="mesures6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le BIPM (Bureau International des Poids et Mesures) a pour rôle principal de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mesures6e3" value="wrong"> vendre des instruments de mesure</label>
          <label class="option"><input type="radio" name="mesures6e3" value="right"> garantir l'unicité mondiale du Système international d'unités</label>
          <label class="option"><input type="radio" name="mesures6e3" value="wrong"> former les étudiants en physique</label>
          <label class="option"><input type="radio" name="mesures6e3" value="wrong"> réguler les prix des instruments</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mesures6e3','mesures6fb3','Correct — le BIPM, basé à Sèvres, garantit la cohérence et l unicité du SI à l échelle mondiale, au sommet de la chaîne de traçabilité métrologique.','C est l organisme au sommet de la chaîne de traçabilité, garant de la cohérence internationale des unités.')">Vérifier</button>
        <div class="feedback" id="mesures6fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si chaque pays du monde utilisait ses propres étalons de mesure, sans aucune coordination internationale : quelles seraient les conséquences concrètes pour le commerce et la recherche scientifique mondiale ?</li>
        <li>Pourquoi un instrument fidèle mais peu juste est-il souvent plus facile à « sauver » par un simple étalonnage qu'un instrument juste mais peu fidèle ?</li>
        <li>Quelle serait la conséquence, pour la confiance du public envers la science, si l'on découvrait qu'un grand laboratoire de recherche avait négligé, pendant des années, l'étalonnage régulier de ses instruments ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Convention du Mètre, signée à Paris le 20 mai 1875 par dix-sept États — acte fondateur de la coopération métrologique internationale.</li>
        <li>J.-P. Pérez, <em>Mesures physiques : méthodes et incertitudes</em>, Dunod — chapitre sur l'étalonnage et la traçabilité métrologique.</li>
        <li>ISO/IEC Guide 99:2007, <em>Vocabulaire international de métrologie — Concepts fondamentaux et généraux et termes associés (VIM)</em>, Organisation internationale de normalisation, 2007.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Te voici arrivé au terme de ce module « Mesures et normes » : parti de la simple question « qu'est-ce qu'une unité ? » au premier chapitre, tu termines en comprenant l'infrastructure mondiale, patiemment bâtie depuis 1875, qui garantit la fiabilité de chaque mesure scientifique et industrielle sur Terre. Cette rigueur, désormais acquise, t'accompagnera dans chaque travaux pratiques, chaque rapport expérimental, et bien au-delà de ta formation. Comme le disait Lord Kelvin, dont l'unité de température porte le nom et qui ouvrait ce module : « Quand vous pouvez mesurer ce dont vous parlez... vous en savez quelque chose. » Tu sais désormais, précisément, comment mesurer — et comment faire confiance à ce que tu mesures.</p>
  `
};

MESURES_NOVA_KB[mesuresKey('Étalonnage, justesse, fidélité et normes métrologiques')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Étalonnage, justesse, fidélité et normes métrologiques ». Demande-moi la différence justesse/fidélité, la chaîne de traçabilité, ou un indice sur un exercice.",
  rules: [
    { test:/justesse/i, replies:["La justesse est la capacité d'un instrument à donner, en moyenne, une valeur proche de la valeur vraie — elle traduit l'absence d'erreur SYSTÉMATIQUE."] },
    { test:/fid[ée]lit[ée]/i, replies:["La fidélité est la capacité à donner des résultats peu dispersés en répétant la mesure — elle traduit une faible erreur ALÉATOIRE. Un instrument peut être fidèle sans être juste !"] },
    { test:/[ée]talonnage/i, replies:["L'étalonnage compare les indications d'un instrument à un étalon de référence, pour quantifier et corriger son écart systématique (sa justesse)."] },
    { test:/tra[çc]abilit[ée]/i, replies:["La traçabilité métrologique est la chaîne ininterrompue de comparaisons reliant un instrument aux étalons primaires internationaux (BIPM), garantissant la comparabilité mondiale des mesures."] },
    { test:/bipm|iso|cofrac/i, replies:["Le BIPM garantit l'unicité mondiale du SI ; l'ISO publie des normes internationales (dont le GUM) ; le COFRAC (en France) accrédite les laboratoires d'étalonnage."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : regroupées = faible dispersion, décalées = erreur systématique.","Indice niveau 2 : la faible dispersion, c'est la fidélité.","Indice niveau 3 : cet instrument est fidèle mais peu juste."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : l'étalonnage nécessite toujours une référence externe.","Indice niveau 2 : c'est une comparaison, pas une réparation.","Indice niveau 3 : c'est la comparaison à un étalon de référence."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : c'est l'organisme au sommet de la chaîne de traçabilité.","Indice niveau 2 : il garantit la cohérence mondiale du SI.","Indice niveau 3 : c'est bien le rôle du BIPM."] }
  ]
};

/* fusionne le module Mesures et normes dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, MESURES_CHAPTERS);
Object.assign(NOVA_KB, MESURES_NOVA_KB);