/* =====================================================================
   CHUNK « histsci » — registre HISTSCI_CHAPTERS / HISTSCI_NOVA_KB
   Matière(s) : Autres|Histoire des sciences physiques
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   HISTSCI_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ============================================================================
   MODULE HISTOIRE DES SCIENCES PHYSIQUES — Autres, L2
   (contenu rédigé d'après une recherche documentaire sur les grandes étapes
   de l'histoire de la physique, de l'Antiquité à la physique contemporaine —
   cours de culture scientifique générale, sans prérequis mathématique lourd,
   conforme à l'esprit des UE d'histoire des sciences des licences de physique
   francophones)
   Structure identique aux autres modules : HISTSCI_CHAPTERS / HISTSCI_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const HISTSCI_MATIERE = 'Histoire des sciences physiques';
function histSciKey(chapterTitle){ return `Autres|${HISTSCI_MATIERE}|${chapterTitle}`; }
const HISTSCI_CHAPTERS = {};
const HISTSCI_NOVA_KB = {};

/* =========================== CHAPITRE 0 — La physique dans l'Antiquité et le Moyen Âge =========================== */
HISTSCI_CHAPTERS[histSciKey('La physique dans l\'Antiquité et le Moyen Âge : des Grecs au monde islamique')] = {
  objectives: [
    "Situer les apports d'Aristote et d'Archimède dans la physique grecque antique",
    "Expliquer pourquoi le modèle géocentrique a dominé pendant près de deux millénaires",
    "Identifier le rôle de conservation, de critique et d'innovation joué par le monde islamique médiéval",
    "Distinguer la physique spéculative et qualitative antique de la démarche expérimentale moderne"
  ],
  prereqs: [],
  bodyHtml: `
    <p>L'histoire des sciences physiques ne commence pas avec Galilée ou Newton : près de deux mille ans avant eux, les penseurs grecs élaborent déjà des systèmes complets pour expliquer le monde naturel. Ce premier chapitre retrace ce très long chemin, de la physique qualitative d'Aristote jusqu'aux prémices de la méthode expérimentale forgées dans le monde islamique médiéval.</p>

    <h3>1. La physique grecque : une recherche rationnelle des causes</h3>
    <p>À partir du VIe siècle avant notre ère, les penseurs présocratiques (Thalès, Anaximandre, Héraclite...) proposent les premières explications <strong>naturelles</strong> — non mythologiques — des phénomènes du monde. Mais c'est <strong>Aristote</strong> (384-322 av. J.-C.) qui construit le système le plus influent et le plus durable : une physique qualitative fondée sur quatre éléments (terre, eau, air, feu), chacun ayant un « lieu naturel » vers lequel il tend spontanément, et une distinction stricte entre le monde sublunaire (imparfait, changeant) et le monde céleste (parfait, incorruptible, fait d'un cinquième élément, l'éther).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La physique d'Aristote n'est pas mathématisée : elle cherche des <strong>causes qualitatives</strong> (pourquoi une pierre tombe-t-elle ? parce qu'elle « cherche » son lieu naturel) plutôt que des lois quantitatives prédictives. Ce cadre conceptuel dominera l'enseignement européen jusqu'au XVIIe siècle.
    </div>

    <h3>2. Archimède : une physique déjà mathématisée</h3>
    <p><strong>Archimède de Syracuse</strong> (287-212 av. J.-C.) fait figure d'exception dans l'Antiquité : il applique la géométrie à des problèmes physiques avec une rigueur qui annonce la physique moderne. On lui doit la loi du levier, le calcul du centre de gravité de nombreuses figures, et surtout le célèbre <strong>principe d'Archimède</strong> sur la poussée exercée par un fluide sur un corps immergé — établi, selon la légende, alors qu'il prenait son bain (« Eurêka ! »).</p>

    <h3>3. Le système géocentrique de Ptolémée</h3>
    <p>Au IIe siècle de notre ère, l'astronome alexandrin <strong>Ptolémée</strong> synthétise dans l'<em>Almageste</em> un modèle géocentrique sophistiqué, où les planètes se déplacent sur des <strong>épicycles</strong> (petits cercles) dont le centre parcourt lui-même un cercle plus grand (le déférent) autour de la Terre. Ce modèle, purement géométrique et sans justification physique, reste néanmoins remarquablement <strong>prédictif</strong> pour les positions planétaires observées à l'œil nu — ce qui explique sa domination pendant plus de 1400 ans.</p>

    <h3>4. Le monde islamique médiéval : bien plus qu'une simple transmission</h3>
    <p>Après la chute de l'Empire romain d'Occident, c'est dans le monde islamique, du VIIIe au XIVe siècle, que la tradition scientifique grecque est non seulement conservée mais activement <strong>enrichie</strong>. La Maison de la Sagesse de Bagdad traduit et commente les textes grecs ; des savants comme <strong>Ibn al-Haytham</strong> (Alhazen, v.965-1040) révolutionnent l'optique en réfutant la théorie antique de la vision par émission oculaire et en établissant, dans son <em>Kitab al-Manazir</em> (Livre d'optique), que c'est la lumière réfléchie par les objets qui pénètre l'œil — une démarche fondée sur l'expérimentation systématique et le contrôle des hypothèses, souvent considérée comme un jalon essentiel vers la méthode scientifique moderne.</p>
    <table class="mini-table">
      <tr><th>Savant</th><th>Période</th><th>Contribution majeure</th></tr>
      <tr><td>Ibn al-Haytham (Alhazen)</td><td>v.965-1040</td><td>Optique expérimentale, théorie correcte de la vision</td></tr>
      <tr><td>Al-Biruni</td><td>973-1048</td><td>Mesure précise du rayon terrestre, méthodes astronomiques</td></tr>
      <tr><td>Ibn Sina (Avicenne)</td><td>980-1037</td><td>Synthèse encyclopédique de la physique et de la médecine grecques</td></tr>
      <tr><td>Al-Khwarizmi</td><td>v.780-850</td><td>Algèbre systématique, outil essentiel pour les sciences futures</td></tr>
    </table>

    <h3>5. Le Moyen Âge latin : critiques et prémices</h3>
    <p>À partir du XIIe siècle, les traductions latines des textes arabes (via l'école de Tolède notamment) réintroduisent la physique grecque en Europe occidentale. Les scolastiques ne se contentent pas de commenter Aristote : <strong>Jean Buridan</strong> (v.1295-1358) développe la théorie de l'<em>impetus</em> (une force motrice imprimée à un projectile, qui préfigure la notion d'inertie), tandis que les <strong>Calculateurs d'Oxford</strong> établissent dès le XIVe siècle le théorème de la vitesse moyenne pour un mouvement uniformément accéléré — un résultat que Galilée redémontrera near trois siècles plus tard.</p>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Idée reçue à corriger</span>
      <ul>
        <li>« Le Moyen Âge n'a rien produit en sciences » : c'est faux — le monde islamique médiéval a produit des avancées majeures en optique, en astronomie et en mathématiques, et les scolastiques latins ont posé des jalons conceptuels (impetus, calcul de la vitesse moyenne) directement réutilisés par la physique du XVIIe siècle</li>
        <li>Le modèle géocentrique de Ptolémée n'était pas « stupide » : c'était un modèle mathématique cohérent et prédictif pour l'époque, seulement erroné dans son interprétation physique du monde</li>
        <li>Archimède n'est pas un simple ingénieur : sa méthode mathématique rigoureuse en fait l'un des tout premiers physiciens au sens moderne</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le modèle astronomique de Ptolémée, qui domine pendant plus d'un millénaire, est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist0e1" value="wrong"> héliocentrique, avec des orbites elliptiques</label>
          <label class="option"><input type="radio" name="hist0e1" value="right"> géocentrique, fondé sur des épicycles et des déférents</label>
          <label class="option"><input type="radio" name="hist0e1" value="wrong"> héliocentrique, avec des orbites circulaires</label>
          <label class="option"><input type="radio" name="hist0e1" value="wrong"> basé sur la théorie de la relativité</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist0e1','hist0fb1','Correct — le modèle de Ptolémée place la Terre au centre, avec des épicycles et déférents pour reproduire les positions planétaires observées.','Repense à la position de la Terre dans le système de Ptolémée, et à la géométrie utilisée pour reproduire les positions planétaires.')">Vérifier</button>
        <div class="feedback" id="hist0fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La contribution majeure d'Ibn al-Haytham à la physique concerne :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist0e2" value="wrong"> la mécanique céleste</label>
          <label class="option"><input type="radio" name="hist0e2" value="right"> l'optique et la théorie de la vision</label>
          <label class="option"><input type="radio" name="hist0e2" value="wrong"> la thermodynamique</label>
          <label class="option"><input type="radio" name="hist0e2" value="wrong"> l'électricité statique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist0e2','hist0fb2','Correct — Ibn al-Haytham a établi, par une démarche expérimentale rigoureuse, que la vision résulte de la lumière réfléchie par les objets et non d\\'un rayonnement émis par l\\'œil.','Pense au titre de son ouvrage majeur, le Kitab al-Manazir (Livre d\\'optique).')">Vérifier</button>
        <div class="feedback" id="hist0fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La théorie de l'« impetus », développée par Jean Buridan au Moyen Âge, préfigure la notion moderne de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist0e3" value="wrong"> énergie potentielle</label>
          <label class="option"><input type="radio" name="hist0e3" value="right"> inertie</label>
          <label class="option"><input type="radio" name="hist0e3" value="wrong"> champ électromagnétique</label>
          <label class="option"><input type="radio" name="hist0e3" value="wrong"> entropie</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist0e3','hist0fb3','Correct — l\\'impetus est une force motrice imprimée au projectile qui le maintient en mouvement, une idée qui annonce (sans s\\'y confondre exactement) le principe d\\'inertie formulé plus tard par Galilée et Newton.','Pense à ce que l\\'impetus est censé expliquer : pourquoi un projectile continue de se déplacer après avoir quitté la main qui l\\'a lancé.')">Vérifier</button>
        <div class="feedback" id="hist0fb3"></div>
      </div>
    </div>
  `
};

HISTSCI_NOVA_KB[histSciKey('La physique dans l\'Antiquité et le Moyen Âge : des Grecs au monde islamique')] = {
  intro: "Salut, moi c'est Nova ! On est sur « La physique dans l'Antiquité et le Moyen Âge ». Demande-moi les apports d'Aristote, ceux d'Ibn al-Haytham, ou un indice sur un exercice.",
  rules: [
    { test:/aristote/i, replies:["Aristote propose une physique qualitative fondée sur 4 éléments et des « lieux naturels ». Son cadre conceptuel domine l'enseignement européen jusqu'au XVIIe siècle, malgré l'absence de mathématisation."] },
    { test:/archim[èe]de/i, replies:["Archimède applique la géométrie à la physique (levier, centres de gravité, poussée d'Archimède) : une rigueur mathématique en avance sur son temps."] },
    { test:/ptol[ée]m[ée]e|g[ée]ocentrique|[ée]picycle/i, replies:["Le modèle géocentrique de Ptolémée utilise épicycles et déférents pour prédire les positions planétaires. Il est resté dominant plus de 1400 ans car il était mathématiquement efficace, même si physiquement erroné."] },
    { test:/ibn al.haytham|alhazen|optique/i, replies:["Ibn al-Haytham (Alhazen) réfute la théorie de la vision par émission oculaire et établit, par l'expérimentation, que c'est la lumière réfléchie qui entre dans l'œil — une démarche pionnière de la méthode scientifique."] },
    { test:/impetus|buridan|calculateurs d.oxford/i, replies:["Jean Buridan développe la théorie de l'impetus (force motrice imprimée à un projectile), et les Calculateurs d'Oxford établissent le théorème de la vitesse moyenne — deux jalons médiévaux repris ensuite par Galilée."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la position de la Terre dans le modèle de Ptolémée.","Indice niveau 2 : la Terre y est immobile, au centre.","Indice niveau 3 : le modèle est géocentrique, avec épicycles et déférents."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense au titre de son ouvrage majeur.","Indice niveau 2 : le Kitab al-Manazir, ou « Livre d'optique ».","Indice niveau 3 : sa contribution majeure porte sur l'optique et la théorie de la vision."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : que cherche à expliquer l'impetus ?","Indice niveau 2 : pourquoi un projectile continue de se déplacer après avoir quitté la main.","Indice niveau 3 : cela préfigure la notion d'inertie."] }
  ]
};

/* =========================== CHAPITRE 1 — La révolution scientifique du XVIIe siècle =========================== */
HISTSCI_CHAPTERS[histSciKey('La révolution scientifique du XVIIe siècle : de Copernic à Newton')] = {
  objectives: [
    "Retracer le passage du système géocentrique au système héliocentrique",
    "Identifier les apports de Galilée à la méthode expérimentale et à la mécanique",
    "Énoncer les trois lois de Kepler et leur rôle dans la synthèse newtonienne",
    "Comprendre la portée unificatrice des Principia de Newton (1687)"
  ],
  prereqs: ["La physique dans l'Antiquité et le Moyen Âge"],
  bodyHtml: `
    <p>Le XVIIe siècle marque une rupture si profonde dans la façon de faire de la physique que les historiens des sciences parlent d'une véritable <strong>révolution scientifique</strong>. En moins d'un siècle, le système du monde hérité de l'Antiquité s'effondre, remplacé par une physique mathématisée, expérimentale et prédictive.</p>

    <h3>1. Copernic : une hypothèse audacieuse (1543)</h3>
    <p>Dans <em>De revolutionibus orbium coelestium</em>, publié l'année de sa mort, <strong>Nicolas Copernic</strong> (1473-1543) propose de placer le Soleil, et non la Terre, au centre du monde. Son modèle reste toutefois proche de celui de Ptolémée dans sa complexité mathématique : il conserve des orbites <strong>circulaires</strong> et doit lui aussi recourir à des épicycles pour ajuster les positions observées. Sa révolution est avant tout conceptuelle.</p>

    <h3>2. Tycho Brahe et Kepler : de l'observation aux lois</h3>
    <p>L'astronome danois <strong>Tycho Brahe</strong> (1546-1601) accumule, à l'œil nu, les observations planétaires les plus précises jamais réalisées. Son assistant <strong>Johannes Kepler</strong> (1571-1630) les exploite pour établir trois lois empiriques qui décrivent enfin correctement le mouvement des planètes :</p>
    <table class="mini-table">
      <tr><th>Loi de Kepler</th><th>Énoncé</th><th>Année</th></tr>
      <tr><td>1ère loi (des orbites)</td><td>Les planètes décrivent des <strong>ellipses</strong> dont le Soleil occupe un foyer</td><td>1609</td></tr>
      <tr><td>2e loi (des aires)</td><td>Le rayon Soleil-planète balaie des aires égales en des temps égaux</td><td>1609</td></tr>
      <tr><td>3e loi (des périodes)</td><td>Le carré de la période orbitale est proportionnel au cube du demi-grand axe</td><td>1619</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      L'abandon des orbites circulaires « parfaites » au profit des ellipses est un choc conceptuel majeur : il rompt avec deux mille ans d'esthétique cosmologique héritée des Grecs, au profit du seul critère de l'<strong>accord avec l'observation</strong>.
    </div>

    <h3>3. Galilée : le télescope et la naissance de la méthode expérimentale</h3>
    <p><strong>Galilée</strong> (1564-1642) pointe l'une des premières lunettes astronomiques vers le ciel en 1609 et découvre les montagnes de la Lune, les quatre principaux satellites de Jupiter et les phases de Vénus — autant d'observations incompatibles avec le système géocentrique strict. En mécanique, il étudie systématiquement la chute des corps et le mouvement sur plan incliné, posant les bases du principe d'inertie. Sa défense publique de l'héliocentrisme lui vaut d'être condamné par l'Inquisition romaine en 1633 et assigné à résidence jusqu'à sa mort.</p>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Idée reçue à corriger</span>
      Galilée n'a pas « inventé » le télescope (l'instrument existait déjà aux Pays-Bas) : sa contribution décisive est de l'avoir pointé vers le ciel et d'avoir interprété méthodiquement ce qu'il y observait.
    </div>

    <h3>4. Newton : la synthèse universelle (1687)</h3>
    <p>Dans les <em>Philosophiae Naturalis Principia Mathematica</em> (1687), <strong>Isaac Newton</strong> (1642-1727) unifie en un seul cadre mathématique la chute des corps sur Terre et le mouvement des planètes : une même <strong>loi de la gravitation universelle</strong>, en $1/r^2$, explique aussi bien la chute d'une pomme que l'orbite de la Lune. Il énonce également ses trois lois du mouvement (inertie, principe fondamental de la dynamique, action-réaction), qui resteront le socle de la mécanique jusqu'au XXe siècle.</p>
    <div class="diagram">
      <svg width="260" height="70" viewBox="0 0 260 70">
        <line x1="10" y1="35" x2="250" y2="35" stroke="#122043" stroke-width="1.5"/>
        <circle cx="30" cy="35" r="4" fill="#3D6BF0"/><text x="16" y="55" font-size="9">1543</text>
        <circle cx="90" cy="35" r="4" fill="#1FB6A8"/><text x="72" y="55" font-size="9">1609</text>
        <circle cx="150" cy="35" r="4" fill="#E8A93A"/><text x="132" y="55" font-size="9">1619</text>
        <circle cx="230" cy="35" r="4" fill="#F0555C"/><text x="212" y="55" font-size="9">1687</text>
        <text x="16" y="20" font-size="9">Copernic</text>
        <text x="60" y="20" font-size="9">Kepler (lois 1-2), Galilée</text>
        <text x="212" y="20" font-size="9">Newton</text>
      </svg>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Selon la première loi de Kepler, les orbites des planètes sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist1e1" value="wrong"> des cercles parfaits</label>
          <label class="option"><input type="radio" name="hist1e1" value="right"> des ellipses dont le Soleil occupe un foyer</label>
          <label class="option"><input type="radio" name="hist1e1" value="wrong"> des spirales</label>
          <label class="option"><input type="radio" name="hist1e1" value="wrong"> des paraboles</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist1e1','hist1fb1','Correct — c\\'est la rupture majeure de Kepler avec l\\'astronomie antérieure, qui imposait des orbites circulaires.','Repense à ce qui distingue radicalement Kepler de Copernic et de Ptolémée sur la forme des orbites.')">Vérifier</button>
        <div class="feedback" id="hist1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Parmi les observations suivantes, laquelle Galilée n'a-t-il PAS pu réaliser avec sa lunette ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist1e2" value="wrong"> les montagnes de la Lune</label>
          <label class="option"><input type="radio" name="hist1e2" value="wrong"> les satellites de Jupiter</label>
          <label class="option"><input type="radio" name="hist1e2" value="wrong"> les phases de Vénus</label>
          <label class="option"><input type="radio" name="hist1e2" value="right"> les anneaux de Saturne (identifiés comme tels)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist1e2','hist1fb2','Correct — Galilée observe bien une anomalie autour de Saturne, mais faute de résolution suffisante il ne parvient pas à l\\'identifier comme un système d\\'anneaux ; c\\'est Christian Huygens qui le fera en 1655 avec une lunette plus puissante.','Les trois premières observations sont bien celles de Galilée en 1609-1610 ; la dernière nécessite une meilleure résolution optique, obtenue plus tard.')">Vérifier</button>
        <div class="feedback" id="hist1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le résultat le plus unificateur des Principia de Newton (1687) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist1e3" value="wrong"> l'invention du calcul infinitésimal, sans application physique</label>
          <label class="option"><input type="radio" name="hist1e3" value="right"> la même loi de gravitation explique la chute d'un corps sur Terre et le mouvement des planètes</label>
          <label class="option"><input type="radio" name="hist1e3" value="wrong"> la démonstration expérimentale de la relativité du mouvement</label>
          <label class="option"><input type="radio" name="hist1e3" value="wrong"> la première mesure de la vitesse de la lumière</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist1e3','hist1fb3','Correct — c\\'est l\\'unification du « ciel » et de la « Terre » sous une seule loi physique, la gravitation universelle en 1/r², qui constitue la percée conceptuelle majeure de Newton.','Pense à ce qui distingue vraiment Newton de ses prédécesseurs : quels deux domaines, jusque-là séparés, unifie-t-il ?')">Vérifier</button>
        <div class="feedback" id="hist1fb3"></div>
      </div>
    </div>
  `
};

HISTSCI_NOVA_KB[histSciKey('La révolution scientifique du XVIIe siècle : de Copernic à Newton')] = {
  intro: "Salut, moi c'est Nova ! On est sur « La révolution scientifique du XVIIe siècle ». Demande-moi les lois de Kepler, les apports de Galilée, la synthèse de Newton, ou un indice sur un exercice.",
  rules: [
    { test:/copernic/i, replies:["Copernic (1543) propose l'héliocentrisme, mais garde des orbites circulaires et des épicycles : sa révolution est surtout conceptuelle, pas encore une simplification mathématique complète."] },
    { test:/kepler/i, replies:["Kepler énonce 3 lois : 1) orbites elliptiques (1609), 2) loi des aires (1609), 3) T²∝a³ (1619). Il abandonne les orbites circulaires « parfaites » héritées des Grecs."] },
    { test:/galil[ée]e/i, replies:["Galilée pointe sa lunette vers le ciel en 1609 (montagnes lunaires, satellites de Jupiter, phases de Vénus), étudie la chute des corps et pose les bases de l'inertie. Condamné par l'Inquisition en 1633."] },
    { test:/newton|principia|gravitation universelle/i, replies:["Newton (Principia, 1687) unifie chute des corps et mouvement des planètes sous une seule loi de gravitation en 1/r², et énonce ses trois lois du mouvement."] },
    { test:/tycho brahe/i, replies:["Tycho Brahe accumule les observations planétaires les plus précises de son époque (à l'œil nu) ; Kepler, son assistant, les exploitera pour établir ses lois."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la première loi de Kepler.","Indice niveau 2 : elle rompt avec les orbites circulaires.","Indice niveau 3 : ce sont des ellipses, le Soleil occupant un foyer."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : trois observations datent bien de 1609-1610 avec la lunette de Galilée.","Indice niveau 2 : la dernière option nécessite une meilleure résolution optique.","Indice niveau 3 : ce sont les anneaux de Saturne, identifiés plus tard par Huygens (1655)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à ce que Newton unifie.","Indice niveau 2 : deux domaines jusque-là séparés : le ciel et la Terre.","Indice niveau 3 : une seule loi de gravitation explique les deux."] }
  ]
};

/* =========================== CHAPITRE 2 — Le siècle des Lumières =========================== */
HISTSCI_CHAPTERS[histSciKey('Le siècle des Lumières et la consolidation de la physique classique')] = {
  objectives: [
    "Décrire la diffusion et la consolidation du newtonianisme en Europe au XVIIIe siècle",
    "Identifier les débuts de l'étude scientifique de l'électricité",
    "Situer la naissance de la calorimétrie et les prémices de la thermodynamique",
    "Comprendre le rôle des institutions savantes dans la diffusion du savoir scientifique"
  ],
  prereqs: ["La révolution scientifique du XVIIe siècle"],
  bodyHtml: `
    <p>Après la synthèse newtonienne, le XVIIIe siècle est celui de la <strong>diffusion</strong>, de la <strong>reformulation mathématique</strong> et de l'<strong>extension</strong> de la physique classique à de nouveaux domaines — l'électricité et la chaleur en particulier.</p>

    <h3>1. Le triomphe du newtonianisme sur le cartésianisme</h3>
    <p>En France, la physique de Newton se heurte d'abord à la théorie des « tourbillons » de Descartes, qui explique le mouvement des planètes par des tourbillons de matière subtile. C'est <strong>Voltaire</strong>, avec ses <em>Lettres philosophiques</em> (1734), et surtout <strong>Émilie du Châtelet</strong> (1706-1749), qui imposent le newtonianisme en France : sa traduction française commentée des <em>Principia</em>, accompagnée d'un important travail mathématique original, reste la référence francophone pendant plus d'un siècle.</p>

    <h3>2. La mécanique analytique : Euler, d'Alembert, Lagrange</h3>
    <p>Les mathématiciens du XVIIIe siècle traduisent la mécanique newtonienne, initialement géométrique, dans le langage plus puissant du <strong>calcul infinitésimal</strong>. <strong>Leonhard Euler</strong> systématise l'usage des équations différentielles en mécanique ; <strong>Jean le Rond d'Alembert</strong> formule un principe général reliant statique et dynamique ; <strong>Joseph-Louis Lagrange</strong> couronne cet effort avec sa <em>Mécanique analytique</em> (1788), qui reformule toute la mécanique à partir de l'énergie, sans schéma ni figure géométrique — une prouesse d'abstraction qui préfigure la physique théorique moderne.</p>

    <h3>3. Les débuts de l'électricité scientifique</h3>
    <p>Longtemps curiosité de salon (étincelles, machines électrostatiques), l'électricité devient un objet d'étude systématique au XVIIIe siècle. <strong>Benjamin Franklin</strong> propose en 1752 sa célèbre (et dangereuse) expérience du cerf-volant pour démontrer la nature électrique de la foudre, et introduit le vocabulaire de charges « positive » et « négative ». En 1785, <strong>Charles-Augustin de Coulomb</strong> établit, à l'aide d'une balance de torsion, la loi quantitative de la force entre charges électriques — de forme mathématique identique à celle de la gravitation newtonienne :</p>
    <div class="formula-box">$$F = k\\,\\frac{q_1q_2}{r^2}$$</div>

    <h3>4. Chaleur et calorimétrie</h3>
    <p>Antoine Lavoisier et Pierre-Simon Laplace développent, à la fin du siècle, des méthodes calorimétriques précises pour mesurer les quantités de chaleur échangées lors de réactions chimiques ou de changements d'état. Le cadre théorique qu'ils utilisent — la théorie du <strong>calorique</strong>, un fluide subtil que les corps échangeraient — se révélera erroné au siècle suivant, mais leurs méthodes de mesure expérimentale restent, elles, remarquablement rigoureuses.</p>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Idée reçue à corriger</span>
      Une théorie scientifique fausse (comme le calorique) n'est pas nécessairement le fruit d'un travail expérimental médiocre : Lavoisier et Laplace ont produit des mesures de grande qualité, seule leur interprétation théorique de la chaleur comme fluide matériel s'est révélée incorrecte.
    </div>

    <h3>5. Académies et diffusion du savoir</h3>
    <p>Les <strong>académies royales des sciences</strong> (Londres dès 1660 avec la Royal Society, Paris en 1666) structurent la recherche, valident les résultats par la publication et l'expérience reproductible, et organisent la correspondance savante à l'échelle européenne. L'<em>Encyclopédie</em> de Diderot et d'Alembert (1751-1772) diffuse ce savoir scientifique bien au-delà du cercle des savants, jusqu'au grand public cultivé — un projet emblématique de l'esprit des Lumières.</p>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La traduction française commentée des Principia de Newton, qui a beaucoup contribué à diffuser le newtonianisme en France, est due à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist2e1" value="wrong"> Voltaire seul</label>
          <label class="option"><input type="radio" name="hist2e1" value="right"> Émilie du Châtelet</label>
          <label class="option"><input type="radio" name="hist2e1" value="wrong"> Descartes</label>
          <label class="option"><input type="radio" name="hist2e1" value="wrong"> Lagrange</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist2e1','hist2fb1','Correct — Émilie du Châtelet a traduit et commenté mathématiquement les Principia, un travail resté la référence francophone pendant plus d\\'un siècle.','Voltaire a soutenu le newtonianisme dans ses écrits, mais la traduction savante des Principia est l\\'œuvre d\\'une autre figure majeure du XVIIIe siècle.')">Vérifier</button>
        <div class="feedback" id="hist2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La loi de Coulomb (1785), qui décrit la force entre deux charges électriques, a une forme mathématique analogue à celle :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist2e2" value="right"> de la loi de la gravitation universelle de Newton</label>
          <label class="option"><input type="radio" name="hist2e2" value="wrong"> des lois de Kepler</label>
          <label class="option"><input type="radio" name="hist2e2" value="wrong"> du principe de Lavoisier sur la conservation de la masse</label>
          <label class="option"><input type="radio" name="hist2e2" value="wrong"> de la loi d'Ohm</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist2e2','hist2fb2','Correct — les deux lois varient en 1/r² : F=kq1q2/r² pour Coulomb, F=Gm1m2/r² pour Newton, une analogie mathématique frappante entre gravitation et électricité.','Compare la dépendance en distance des deux lois : toutes deux varient en 1/r².')">Vérifier</button>
        <div class="feedback" id="hist2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La théorie du « calorique », utilisée par Lavoisier et Laplace pour interpréter leurs mesures de chaleur, considère la chaleur comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist2e3" value="wrong"> une forme d'énergie cinétique moléculaire, comme on le sait aujourd'hui</label>
          <label class="option"><input type="radio" name="hist2e3" value="right"> un fluide subtil échangé entre les corps</label>
          <label class="option"><input type="radio" name="hist2e3" value="wrong"> une onde électromagnétique</label>
          <label class="option"><input type="radio" name="hist2e3" value="wrong"> une propriété quantifiée dès le XVIIIe siècle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist2e3','hist2fb3','Correct — la théorie du calorique voit la chaleur comme un fluide matériel invisible, une conception qui sera abandonnée au XIXe siècle au profit de l\\'interprétation cinétique moderne.','La théorie du calorique est antérieure à la compréhension moderne (cinétique) de la chaleur : quelle image, plus proche d\\'un fluide, utilisait-on alors ?')">Vérifier</button>
        <div class="feedback" id="hist2fb3"></div>
      </div>
    </div>
  `
};

HISTSCI_NOVA_KB[histSciKey('Le siècle des Lumières et la consolidation de la physique classique')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Le siècle des Lumières et la physique classique ». Demande-moi le rôle d'Émilie du Châtelet, la loi de Coulomb, la théorie du calorique, ou un indice sur un exercice.",
  rules: [
    { test:/[ée]milie du ch[âa]telet|voltaire/i, replies:["Émilie du Châtelet traduit et commente mathématiquement les Principia de Newton en français ; Voltaire soutient et popularise le newtonianisme dans ses écrits."] },
    { test:/lagrange|m[ée]canique analytique|euler|d.alembert/i, replies:["Euler, d'Alembert puis Lagrange (Mécanique analytique, 1788) traduisent la mécanique newtonienne en langage du calcul infinitésimal et de l'énergie, sans figures géométriques."] },
    { test:/franklin|coulomb|[ée]lectricit[ée]/i, replies:["Franklin étudie la nature électrique de la foudre (1752) ; Coulomb établit en 1785 la loi de force entre charges F=kq1q2/r², de forme identique à la gravitation newtonienne."] },
    { test:/calorique|lavoisier|laplace|calorim[ée]trie/i, replies:["Lavoisier et Laplace développent la calorimétrie avec des mesures très précises, mais interprètent la chaleur avec la théorie (fausse) du calorique, un fluide subtil censé s'échanger entre les corps."] },
    { test:/acad[ée]mie|encyclop[ée]die/i, replies:["Les académies royales des sciences (Royal Society à Londres, Académie des sciences à Paris) structurent la recherche ; l'Encyclopédie de Diderot et d'Alembert diffuse ce savoir au grand public cultivé."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : Voltaire a popularisé, mais qui a traduit et commenté mathématiquement ?","Indice niveau 2 : une figure majeure, souvent moins connue que Voltaire.","Indice niveau 3 : c'est Émilie du Châtelet."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare les deux lois en distance.","Indice niveau 2 : toutes deux varient en 1/r².","Indice niveau 3 : c'est la loi de la gravitation universelle de Newton."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : la théorie du calorique est antérieure à l'interprétation cinétique moderne.","Indice niveau 2 : elle imagine la chaleur comme quelque chose de matériel qui circule.","Indice niveau 3 : un fluide subtil échangé entre les corps."] }
  ]
};

/* =========================== CHAPITRE 3 — Le XIXe siècle =========================== */
HISTSCI_CHAPTERS[histSciKey('Le XIXe siècle : énergie, thermodynamique et électromagnétisme')] = {
  objectives: [
    "Retracer la naissance du concept d'énergie et des deux principes de la thermodynamique",
    "Décrire l'unification de l'électricité, du magnétisme et de l'optique par Maxwell",
    "Identifier les grandes étapes expérimentales de l'électromagnétisme (Oersted, Ampère, Faraday)",
    "Comprendre l'émergence de la physique statistique avec Boltzmann"
  ],
  prereqs: ["Le siècle des Lumières et la consolidation de la physique classique"],
  bodyHtml: `
    <p>Le XIXe siècle voit naître deux des plus grandes unifications de l'histoire de la physique : celle de la <strong>chaleur, du travail et de l'énergie</strong> en thermodynamique, et celle de l'<strong>électricité, du magnétisme et de la lumière</strong> par Maxwell.</p>

    <h3>1. Carnot et la naissance de la thermodynamique</h3>
    <p>En 1824, l'ingénieur français <strong>Sadi Carnot</strong> publie ses <em>Réflexions sur la puissance motrice du feu</em>, où il étudie le rendement théorique maximal des machines thermiques — une question d'abord technique (améliorer les machines à vapeur), qui donnera naissance à toute la thermodynamique. Il montre que ce rendement dépend uniquement des températures des sources chaude et froide, indépendamment du fluide utilisé.</p>

    <h3>2. Le principe de conservation de l'énergie</h3>
    <p>Dans les années 1840, plusieurs savants établissent indépendamment l'équivalence entre travail mécanique et chaleur : le médecin allemand <strong>Julius Robert von Mayer</strong>, l'anglais <strong>James Prescott Joule</strong> (qui mesure précisément l'équivalent mécanique de la calorie par une expérience désormais classique de brassage d'eau), et <strong>Hermann von Helmholtz</strong>, qui formule en 1847 le <strong>principe de conservation de l'énergie</strong> sous sa forme générale : l'énergie totale d'un système isolé se conserve, seule sa forme change.</p>

    <h3>3. Le second principe et l'entropie</h3>
    <p><strong>Rudolf Clausius</strong> introduit en 1865 le concept d'<strong>entropie</strong> pour formaliser l'irréversibilité observée dans les transformations thermodynamiques réelles : contrairement à l'énergie, l'entropie d'un système isolé ne peut qu'augmenter (ou rester constante pour une transformation réversible idéale). C'est le <strong>second principe</strong> de la thermodynamique, qui donne une flèche du temps à la physique.</p>

    <h3>4. L'électromagnétisme : d'Oersted à Faraday</h3>
    <table class="mini-table">
      <tr><th>Savant</th><th>Année</th><th>Découverte</th></tr>
      <tr><td>Hans Christian Oersted</td><td>1820</td><td>Un courant électrique dévie une aiguille aimantée : lien entre électricité et magnétisme</td></tr>
      <tr><td>André-Marie Ampère</td><td>1820-1827</td><td>Formalisation mathématique de l'électrodynamique, force entre courants</td></tr>
      <tr><td>Michael Faraday</td><td>1831</td><td>Induction électromagnétique : un champ magnétique variable crée un courant</td></tr>
    </table>
    <p><strong>Michael Faraday</strong>, autodidacte et expérimentateur hors pair, introduit également la notion physique de <strong>champ</strong> — une idée révolutionnaire qui remplace l'action instantanée à distance par une influence se propageant de proche en proche dans l'espace.</p>

    <h3>5. Maxwell : l'unification électromagnétique (1861-1865)</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      <strong>James Clerk Maxwell</strong> traduit en un système compact de quatre équations différentielles l'ensemble des lois de l'électricité et du magnétisme connues. En les combinant, il montre que le vide peut porter des <strong>ondes électromagnétiques</strong> se propageant à une vitesse qui coïncide, aux incertitudes de mesure près, avec la vitesse de la lumière déjà mesurée : il en conclut, en 1865, que <strong>la lumière est elle-même une onde électromagnétique</strong> — unifiant en un seul phénomène l'optique, l'électricité et le magnétisme, jusque-là considérés comme trois domaines séparés.
    </div>
    <p>Cette prédiction sera confirmée expérimentalement par <strong>Heinrich Hertz</strong> en 1887, qui produit et détecte en laboratoire des ondes électromagnétiques invisibles (ondes radio), ouvrant la voie aux télécommunications sans fil.</p>

    <h3>6. La physique statistique de Boltzmann</h3>
    <p><strong>Ludwig Boltzmann</strong> donne à l'entropie une interprétation microscopique révolutionnaire : elle mesure le nombre de configurations microscopiques ($W$) compatibles avec un état macroscopique donné, selon la relation gravée sur sa tombe à Vienne :</p>
    <div class="formula-box">$$S = k\\,\\ln W$$</div>
    <p>Cette approche fonde la <strong>physique statistique</strong>, qui relie le comportement macroscopique de la matière (pression, température) au mouvement microscopique de ses innombrables constituants — une idée d'abord vivement contestée, à une époque où l'existence même des atomes restait débattue.</p>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le résultat majeur de Maxwell, en 1865, est que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist3e1" value="wrong"> l'énergie se conserve toujours</label>
          <label class="option"><input type="radio" name="hist3e1" value="right"> la lumière est une onde électromagnétique</label>
          <label class="option"><input type="radio" name="hist3e1" value="wrong"> l'entropie ne peut que croître</label>
          <label class="option"><input type="radio" name="hist3e1" value="wrong"> les atomes existent réellement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist3e1','hist3fb1','Correct — en combinant ses quatre équations, Maxwell montre que le vide porte des ondes électromagnétiques à la vitesse de la lumière, unifiant optique, électricité et magnétisme.','Repense à ce que Maxwell a unifié : trois domaines jusque-là considérés comme séparés.')">Vérifier</button>
        <div class="feedback" id="hist3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Selon le second principe de la thermodynamique formalisé par Clausius, l'entropie d'un système isolé :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist3e2" value="wrong"> diminue toujours</label>
          <label class="option"><input type="radio" name="hist3e2" value="wrong"> reste toujours strictement constante</label>
          <label class="option"><input type="radio" name="hist3e2" value="right"> ne peut qu'augmenter ou rester constante</label>
          <label class="option"><input type="radio" name="hist3e2" value="wrong"> oscille périodiquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist3e2','hist3fb2','Correct — c\\'est le second principe : l\\'entropie d\\'un système isolé croît (transformation réelle irréversible) ou reste constante (cas idéal réversible), jamais elle ne diminue.','Pense à ce que le second principe apporte de nouveau par rapport au premier (conservation de l\\'énergie) : une notion de sens, de flèche du temps.')">Vérifier</button>
        <div class="feedback" id="hist3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La découverte de l'induction électromagnétique (1831), pierre angulaire des générateurs électriques modernes, est due à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist3e3" value="wrong"> Oersted</label>
          <label class="option"><input type="radio" name="hist3e3" value="wrong"> Ampère</label>
          <label class="option"><input type="radio" name="hist3e3" value="right"> Faraday</label>
          <label class="option"><input type="radio" name="hist3e3" value="wrong"> Boltzmann</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist3e3','hist3fb3','Correct — Faraday montre en 1831 qu\\'un champ magnétique variable crée un courant électrique induit, principe qui fonde tous les générateurs électriques modernes.','Oersted relie électricité et magnétisme, Ampère les formalise mathématiquement : qui découvre ensuite l\\'induction ?')">Vérifier</button>
        <div class="feedback" id="hist3fb3"></div>
      </div>
    </div>
  `
};

HISTSCI_NOVA_KB[histSciKey('Le XIXe siècle : énergie, thermodynamique et électromagnétisme')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Le XIXe siècle : énergie, thermodynamique et électromagnétisme ». Demande-moi les principes de la thermodynamique, l'unification de Maxwell, ou un indice sur un exercice.",
  rules: [
    { test:/carnot/i, replies:["Carnot (1824) étudie le rendement maximal des machines thermiques, une question technique qui fonde la thermodynamique."] },
    { test:/conservation.*[ée]nergie|joule|mayer|helmholtz/i, replies:["Mayer, Joule et Helmholtz établissent dans les années 1840 l'équivalence travail-chaleur et le principe de conservation de l'énergie : c'est le premier principe de la thermodynamique."] },
    { test:/entropie|second principe|clausius/i, replies:["Clausius introduit l'entropie en 1865 : dans un système isolé, elle ne peut qu'augmenter (ou rester constante à la limite réversible). C'est le second principe, qui donne une flèche du temps à la physique."] },
    { test:/maxwell/i, replies:["Maxwell (1861-1865) unifie électricité, magnétisme et optique : ses équations prédisent des ondes électromagnétiques se propageant à la vitesse de la lumière — donc la lumière EST une onde électromagnétique."] },
    { test:/faraday|oersted|amp[èe]re|induction/i, replies:["Oersted découvre le lien courant-magnétisme (1820), Ampère le formalise, puis Faraday découvre l'induction électromagnétique (1831) et introduit la notion de champ."] },
    { test:/boltzmann|physique statistique/i, replies:["Boltzmann interprète l'entropie au niveau microscopique : S=k ln W, où W est le nombre de configurations microscopiques compatibles avec l'état macroscopique observé. Cela fonde la physique statistique."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à ce que Maxwell unifie.","Indice niveau 2 : trois domaines jusque-là séparés.","Indice niveau 3 : la lumière est une onde électromagnétique."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le second principe apporte une notion de sens.","Indice niveau 2 : il ne peut pas diminuer.","Indice niveau 3 : l'entropie augmente ou reste constante."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : Oersted relie, Ampère formalise... et ensuite ?","Indice niveau 2 : c'est la découverte de l'induction, en 1831.","Indice niveau 3 : c'est Faraday."] }
  ]
};

/* =========================== CHAPITRE 4 — La révolution de la physique moderne (1900-1930) =========================== */
HISTSCI_CHAPTERS[histSciKey('La révolution de la physique moderne : relativité et quanta (1900-1930)')] = {
  objectives: [
    "Identifier les phénomènes qui ont mis en crise la physique classique à la fin du XIXe siècle",
    "Retracer la naissance de la théorie quantique (Planck, Einstein, Bohr)",
    "Énoncer les apports majeurs de la relativité restreinte et générale d'Einstein",
    "Situer la formalisation de la mécanique quantique entre 1924 et 1927"
  ],
  prereqs: ["Le XIXe siècle : énergie, thermodynamique et électromagnétisme"],
  bodyHtml: `
    <p>En l'espace de trente ans, entre 1900 et 1930, l'édifice de la physique classique — pourtant triomphante depuis Newton — est bouleversé par deux révolutions conceptuelles majeures : la <strong>relativité</strong> et la <strong>physique quantique</strong>.</p>

    <h3>1. Les « nuages » annonciateurs de la crise</h3>
    <p>À la fin du XIXe siècle, deux problèmes résistent obstinément à la physique classique : le <strong>rayonnement du corps noir</strong> (la théorie classique prédit une énergie infinie rayonnée aux courtes longueurs d'onde, un résultat absurde surnommé la « catastrophe ultraviolette »), et le résultat <strong>négatif</strong> de l'expérience de Michelson-Morley (1887), qui ne détecte aucune variation de la vitesse de la lumière malgré le mouvement de la Terre — suggérant que l'éther supposé porter la lumière n'existe peut-être pas.</p>

    <h3>2. Planck (1900) : la naissance du quantum</h3>
    <p>Pour résoudre le problème du corps noir, <strong>Max Planck</strong> propose en 1900 une hypothèse qu'il juge lui-même provisoire : l'énergie échangée entre matière et rayonnement ne peut prendre que des valeurs <strong>discrètes</strong>, multiples d'un quantum $E=h\\nu$ où $h$ est une nouvelle constante fondamentale. Cette hypothèse, purement calculatoire à l'origine, ouvre sans que Planck en mesure toute la portée la voie à la physique quantique.</p>

    <h3>3. 1905, l'année miraculeuse d'Einstein</h3>
    <p>En une seule année, <strong>Albert Einstein</strong>, alors employé au bureau des brevets de Berne, publie quatre articles qui transforment la physique :</p>
    <table class="mini-table">
      <tr><th>Sujet</th><th>Apport</th></tr>
      <tr><td>Effet photoélectrique</td><td>La lumière est constituée de quanta (photons) d'énergie $h\\nu$ — explique pourquoi seule la fréquence, pas l'intensité, arrache des électrons à un métal</td></tr>
      <tr><td>Mouvement brownien</td><td>Explication statistique confirmant l'existence réelle des atomes et molécules</td></tr>
      <tr><td>Relativité restreinte</td><td>La vitesse de la lumière $c$ est la même dans tous les référentiels galiléens ; l'espace et le temps ne sont plus absolus</td></tr>
      <tr><td>Équivalence masse-énergie</td><td>$E=mc^2$ : masse et énergie sont deux formes d'une même grandeur</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      C'est le travail sur l'<strong>effet photoélectrique</strong> — et non la relativité — qui vaudra à Einstein le prix Nobel de physique en 1921 ; l'Académie suédoise, encore prudente vis-à-vis de la relativité, jugeait ses conséquences expérimentales moins établies à l'époque.
    </div>

    <h3>4. Bohr et le premier modèle atomique quantique (1913)</h3>
    <p><strong>Niels Bohr</strong> applique l'idée de quantification à l'atome d'hydrogène : les électrons ne peuvent occuper que certaines orbites « autorisées », d'énergie fixée, et n'émettent ou n'absorbent du rayonnement qu'en changeant d'orbite. Ce modèle, bien qu'aujourd'hui dépassé, explique pour la première fois les raies spectrales discrètes observées pour l'hydrogène.</p>

    <h3>5. La formalisation de la mécanique quantique (1924-1927)</h3>
    <ul style="margin-left:1.4em; margin-bottom:1em;">
      <li><strong>1924</strong> — Louis de Broglie propose la dualité onde-particule pour toute matière, pas seulement la lumière</li>
      <li><strong>1925</strong> — Werner Heisenberg formule la mécanique matricielle, première version rigoureuse de la théorie quantique</li>
      <li><strong>1926</strong> — Erwin Schrödinger propose une formulation équivalente en termes d'équation d'onde</li>
      <li><strong>1927</strong> — Heisenberg énonce le principe d'incertitude, limite fondamentale (non technique) à la précision simultanée de certaines paires de grandeurs</li>
    </ul>

    <h3>6. La relativité générale (1915) et sa confirmation (1919)</h3>
    <p>Einstein généralise sa théorie en 1915 : la gravitation n'est plus une force au sens newtonien, mais la manifestation de la <strong>courbure de l'espace-temps</strong> provoquée par la présence de masse et d'énergie. Cette prédiction audacieuse — que la lumière des étoiles est déviée par le Soleil — est confirmée avec éclat en 1919 par les mesures d'<strong>Arthur Eddington</strong> lors d'une éclipse solaire totale, propulsant Einstein à une renommée mondiale immédiate.</p>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Idées reçues à corriger</span>
      <ul>
        <li>« Einstein a inventé la théorie quantique » : c'est inexact — il en est l'un des pionniers essentiels (effet photoélectrique), mais Planck, Bohr, Heisenberg et Schrödinger y ont contribué tout autant, voire davantage pour la formalisation finale</li>
        <li>« E=mc² est la seule contribution d'Einstein en 1905 » : c'est réducteur — il publie cette année-là quatre articles fondateurs sur des sujets différents (effet photoélectrique, mouvement brownien, relativité restreinte, équivalence masse-énergie)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le prix Nobel de physique attribué à Einstein en 1921 récompense principalement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist4e1" value="wrong"> la relativité restreinte</label>
          <label class="option"><input type="radio" name="hist4e1" value="wrong"> la relativité générale</label>
          <label class="option"><input type="radio" name="hist4e1" value="right"> l'explication de l'effet photoélectrique</label>
          <label class="option"><input type="radio" name="hist4e1" value="wrong"> l'équation E=mc²</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist4e1','hist4fb1','Correct — c\\'est son explication quantique de l\\'effet photoélectrique (1905) qui lui vaut le Nobel, la relativité étant alors jugée moins solidement établie expérimentalement par le comité.','Ce n\\'est pas la relativité, plutôt controversée à l\\'époque du prix : quel autre travail de 1905 est en jeu ?')">Vérifier</button>
        <div class="feedback" id="hist4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La confirmation expérimentale spectaculaire de la relativité générale, en 1919, repose sur :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist4e2" value="wrong"> la mesure de l'effet photoélectrique</label>
          <label class="option"><input type="radio" name="hist4e2" value="right"> la déviation de la lumière des étoiles par le Soleil, observée lors d'une éclipse</label>
          <label class="option"><input type="radio" name="hist4e2" value="wrong"> la détection d'ondes gravitationnelles</label>
          <label class="option"><input type="radio" name="hist4e2" value="wrong"> la mesure du rayonnement fossile</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist4e2','hist4fb2','Correct — les mesures d\\'Eddington pendant l\\'éclipse de 1919 confirment que la lumière des étoiles est déviée par la masse du Soleil, exactement comme le prévoyait la relativité générale.','Pense à l\\'expédition d\\'Eddington en 1919 et à ce qu\\'elle a mesuré pendant une éclipse solaire.')">Vérifier</button>
        <div class="feedback" id="hist4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Qui a proposé, en 1924, l'idée que toute matière possède une nature ondulatoire (dualité onde-particule) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist4e3" value="wrong"> Werner Heisenberg</label>
          <label class="option"><input type="radio" name="hist4e3" value="wrong"> Erwin Schrödinger</label>
          <label class="option"><input type="radio" name="hist4e3" value="right"> Louis de Broglie</label>
          <label class="option"><input type="radio" name="hist4e3" value="wrong"> Niels Bohr</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist4e3','hist4fb3','Correct — de Broglie propose en 1924 que toute particule matérielle possède une longueur d\\'onde associée, une idée qui inspirera directement l\\'équation de Schrödinger deux ans plus tard.','Cette idée précède de deux ans l\\'équation de Schrödinger, et l\\'inspire directement.')">Vérifier</button>
        <div class="feedback" id="hist4fb3"></div>
      </div>
    </div>
  `
};

HISTSCI_NOVA_KB[histSciKey('La révolution de la physique moderne : relativité et quanta (1900-1930)')] = {
  intro: "Salut, moi c'est Nova ! On est sur « La révolution de la physique moderne ». Demande-moi les articles d'Einstein de 1905, la naissance de la mécanique quantique, ou un indice sur un exercice.",
  rules: [
    { test:/planck|corps noir|quantum/i, replies:["Planck (1900) résout le problème du corps noir en supposant que l'énergie est échangée par quanta discrets E=hν — hypothèse au départ purement calculatoire."] },
    { test:/1905|ann[ée]e miraculeuse|einstein/i, replies:["En 1905, Einstein publie 4 articles fondateurs : effet photoélectrique (quanta de lumière), mouvement brownien, relativité restreinte, et l'équivalence masse-énergie E=mc²."] },
    { test:/nobel/i, replies:["Le Nobel de physique 1921 d'Einstein récompense son explication de l'effet photoélectrique, pas la relativité (jugée moins établie expérimentalement à l'époque)."] },
    { test:/bohr|mod[èe]le atomique/i, replies:["Bohr (1913) applique la quantification à l'atome d'hydrogène : orbites autorisées d'énergie fixée, expliquant les raies spectrales observées."] },
    { test:/de broglie|heisenberg|schr[öo]dinger|principe d.incertitude/i, replies:["1924 de Broglie (dualité onde-particule) → 1925 Heisenberg (mécanique matricielle) → 1926 Schrödinger (équation d'onde) → 1927 Heisenberg (principe d'incertitude) : quatre étapes clés de la formalisation quantique."] },
    { test:/relativit[ée] g[ée]n[ée]rale|eddington|[ée]clipse/i, replies:["La relativité générale (1915) décrit la gravitation comme courbure de l'espace-temps. Elle est confirmée en 1919 par Eddington, qui mesure la déviation de la lumière des étoiles par le Soleil lors d'une éclipse."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : ce n'est pas la relativité, jugée trop controversée à l'époque.","Indice niveau 2 : c'est un autre travail de 1905.","Indice niveau 3 : c'est l'explication de l'effet photoélectrique."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à l'expédition d'Eddington en 1919.","Indice niveau 2 : elle a eu lieu pendant une éclipse solaire.","Indice niveau 3 : elle a mesuré la déviation de la lumière des étoiles par le Soleil."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : cette idée précède de deux ans l'équation de Schrödinger.","Indice niveau 2 : elle l'inspire directement.","Indice niveau 3 : c'est Louis de Broglie, en 1924."] }
  ]
};

/* =========================== CHAPITRE 5 — La physique contemporaine =========================== */
HISTSCI_CHAPTERS[histSciKey('La physique contemporaine : du noyau atomique à l\'Univers')] = {
  objectives: [
    "Retracer les grandes étapes de la physique nucléaire et de la physique des particules",
    "Situer la découverte du rayonnement fossile et l'émergence du modèle du Big Bang",
    "Identifier les grandes collaborations scientifiques contemporaines (CERN, LIGO, EHT)",
    "Comprendre les grands défis actuels de la physique (matière noire, énergie sombre)"
  ],
  prereqs: ["La révolution de la physique moderne : relativité et quanta (1900-1930)"],
  bodyHtml: `
    <p>Depuis les années 1930, la physique explore deux frontières symétriques : l'infiniment petit (noyau atomique, particules élémentaires) et l'infiniment grand (cosmologie, astrophysique) — deux domaines qui, de façon frappante, finissent par se rejoindre pour raconter l'histoire de l'Univers depuis ses tout premiers instants.</p>

    <h3>1. Physique nucléaire : du neutron à la fission</h3>
    <p><strong>James Chadwick</strong> découvre le neutron en 1932, complétant le modèle du noyau atomique (protons + neutrons). En 1938, <strong>Otto Hahn</strong> et <strong>Fritz Strassmann</strong> observent la fission de l'uranium, dont <strong>Lise Meitner</strong> et Otto Frisch fournissent l'interprétation théorique correcte quelques semaines plus tard. Cette découverte ouvre la voie, dans le contexte tendu de la Seconde Guerre mondiale, au projet Manhattan et aux premières bombes atomiques (1945), mais aussi, dans l'après-guerre, aux centrales nucléaires civiles.</p>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Idée reçue à corriger</span>
      Lise Meitner, bien qu'ayant fourni l'interprétation théorique décisive de la fission, n'a pas reçu le prix Nobel de chimie attribué à Hahn seul en 1944 — un oubli aujourd'hui largement reconnu par les historiens des sciences comme injuste.
    </div>

    <h3>2. Le modèle standard de la physique des particules</h3>
    <p>Après-guerre, la multiplication des particules découvertes dans les rayons cosmiques puis dans les accélérateurs (positron 1932, muon 1936, quarks proposés en 1964 par Gell-Mann et Zweig...) conduit à l'édification progressive du <strong>modèle standard</strong>, qui classe toutes les particules élémentaires connues et trois des quatre interactions fondamentales. Sa dernière pièce manquante, le <strong>boson de Higgs</strong> — responsable de la masse des particules élémentaires —, est découverte en 2012 au <strong>CERN</strong> (Genève) grâce au Grand collisionneur de hadrons (LHC), près de cinquante ans après sa prédiction théorique (1964).</p>

    <h3>3. La naissance de la cosmologie moderne</h3>
    <table class="mini-table">
      <tr><th>Année</th><th>Découverte</th><th>Portée</th></tr>
      <tr><td>1929</td><td>Edwin Hubble observe que les galaxies s'éloignent, avec une vitesse proportionnelle à leur distance</td><td>Premier indice observationnel de l'expansion de l'Univers</td></tr>
      <tr><td>1965</td><td>Arno Penzias et Robert Wilson détectent (par hasard) le rayonnement fossile</td><td>Preuve directe d'un Univers primordial chaud et dense — confirme le modèle du Big Bang</td></tr>
      <tr><td>1998</td><td>Deux équipes indépendantes montrent que l'expansion de l'Univers s'accélère</td><td>Introduction du concept d'énergie sombre (Nobel de physique 2011)</td></tr>
    </table>
    <p>Le <strong>modèle du Big Bang</strong>, d'abord proposé dès 1927 par le physicien et prêtre belge <strong>Georges Lemaître</strong> sur la base des équations de la relativité générale, s'impose progressivement comme le cadre cosmologique de référence au fil de ces confirmations observationnelles successives.</p>

    <h3>4. Astrophysique du XXIe siècle : une nouvelle ère d'observation</h3>
    <p>Prédites par Einstein dès 1916 mais jugées indétectables tant leur effet est infime, les <strong>ondes gravitationnelles</strong> — des ondulations de l'espace-temps produites par des événements cosmiques violents — sont enfin détectées directement en <strong>2015</strong> par les interféromètres LIGO, lors de la fusion de deux trous noirs (résultat annoncé en 2016, Nobel de physique 2017). En 2019, la collaboration internationale <strong>Event Horizon Telescope</strong> (EHT) publie la toute première image directe de l'ombre d'un trou noir supermassif, au centre de la galaxie M87.</p>

    <h3>5. Les grands défis actuels</h3>
    <p>Deux composantes majeures de l'Univers restent aujourd'hui mal comprises : la <strong>matière noire</strong> (dont l'existence est déduite d'effets gravitationnels sur les galaxies, mais dont la nature reste inconnue) et l'<strong>énergie sombre</strong> (responsable de l'accélération de l'expansion). Ensemble, elles représenteraient environ 95 % du contenu énergétique de l'Univers, laissant la matière ordinaire — celle que décrit toute la physique de ce cours — largement minoritaire. La recherche d'une théorie unifiant la relativité générale et la mécanique quantique (gravité quantique) demeure, elle aussi, l'un des grands chantiers ouverts de la physique du XXIe siècle.</p>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le boson de Higgs, dernière pièce manquante du modèle standard, a été découvert :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist5e1" value="wrong"> en 1964, au moment même de sa prédiction théorique</label>
          <label class="option"><input type="radio" name="hist5e1" value="right"> en 2012, au CERN, grâce au LHC</label>
          <label class="option"><input type="radio" name="hist5e1" value="wrong"> en 1932, en même temps que le neutron</label>
          <label class="option"><input type="radio" name="hist5e1" value="wrong"> en 1998, lors de la découverte de l'énergie sombre</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist5e1','hist5fb1','Correct — près de cinquante ans séparent la prédiction théorique (1964) de sa confirmation expérimentale au CERN en 2012.','Il y a un long écart entre la prédiction théorique (1964) et la confirmation expérimentale : à quelle décennie récente cela correspond-il ?')">Vérifier</button>
        <div class="feedback" id="hist5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La détection du rayonnement fossile en 1965, par Penzias et Wilson, apporte une preuve directe :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist5e2" value="wrong"> de l'existence des ondes gravitationnelles</label>
          <label class="option"><input type="radio" name="hist5e2" value="right"> d'un Univers primordial chaud et dense, confirmant le modèle du Big Bang</label>
          <label class="option"><input type="radio" name="hist5e2" value="wrong"> de l'existence de la matière noire</label>
          <label class="option"><input type="radio" name="hist5e2" value="wrong"> de l'existence du boson de Higgs</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist5e2','hist5fb2','Correct — le rayonnement fossile est la lumière la plus ancienne accessible à l\\'observation, émise environ 380 000 ans après le Big Bang : sa détection confirme directement le scénario d\\'un Univers primordial chaud et dense.','Pense à ce que Georges Lemaître avait proposé dès 1927, et à ce que cette détection vient confirmer.')">Vérifier</button>
        <div class="feedback" id="hist5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Les ondes gravitationnelles, prédites par Einstein dès 1916, ont été détectées directement pour la première fois en :</p>
        <div class="options">
          <label class="option"><input type="radio" name="hist5e3" value="wrong"> 1919</label>
          <label class="option"><input type="radio" name="hist5e3" value="wrong"> 1965</label>
          <label class="option"><input type="radio" name="hist5e3" value="right"> 2015</label>
          <label class="option"><input type="radio" name="hist5e3" value="wrong"> 2019</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('hist5e3','hist5fb3','Correct — les interféromètres LIGO détectent en 2015 les ondes gravitationnelles issues de la fusion de deux trous noirs, presque un siècle après leur prédiction par Einstein.','Presque un siècle sépare la prédiction (1916) de la détection directe : à quelle décennie récente cela correspond-il (LIGO) ?')">Vérifier</button>
        <div class="feedback" id="hist5fb3"></div>
      </div>
    </div>
  `
};

HISTSCI_NOVA_KB[histSciKey('La physique contemporaine : du noyau atomique à l\'Univers')] = {
  intro: "Salut, moi c'est Nova ! On est sur « La physique contemporaine ». Demande-moi le modèle standard, la découverte du Big Bang, les ondes gravitationnelles, ou un indice sur un exercice.",
  rules: [
    { test:/chadwick|neutron|fission|hahn|meitner/i, replies:["Chadwick découvre le neutron en 1932. Hahn et Strassmann observent la fission en 1938 ; Lise Meitner en donne l'interprétation théorique correcte, sans en recevoir le Nobel — une injustice reconnue aujourd'hui."] },
    { test:/higgs|mod[èe]le standard|cern|lhc/i, replies:["Le boson de Higgs, prédit en 1964, est découvert en 2012 au CERN grâce au LHC : la dernière pièce manquante du modèle standard des particules."] },
    { test:/hubble|expansion.*univers/i, replies:["Hubble observe en 1929 que les galaxies s'éloignent avec une vitesse proportionnelle à leur distance : premier indice observationnel de l'expansion de l'Univers."] },
    { test:/rayonnement fossile|penzias|wilson|big bang|lemaître/i, replies:["Georges Lemaître propose le modèle du Big Bang dès 1927. Penzias et Wilson détectent (par hasard !) le rayonnement fossile en 1965, preuve directe d'un Univers primordial chaud et dense."] },
    { test:/onde gravitationnelle|ligo/i, replies:["Les ondes gravitationnelles, prédites par Einstein en 1916, sont détectées directement pour la première fois en 2015 par LIGO, lors de la fusion de deux trous noirs."] },
    { test:/mati[èe]re noire|[ée]nergie sombre/i, replies:["Matière noire et énergie sombre représenteraient à elles deux environ 95% du contenu énergétique de l'Univers, mais leur nature reste l'un des plus grands mystères de la physique actuelle."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : il y a un long écart entre prédiction (1964) et confirmation.","Indice niveau 2 : la confirmation est récente, grâce au LHC.","Indice niveau 3 : c'est 2012, au CERN."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à ce que Lemaître avait proposé dès 1927.","Indice niveau 2 : cette détection confirme directement son modèle.","Indice niveau 3 : un Univers primordial chaud et dense, donc le Big Bang."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : presque un siècle sépare prédiction et détection.","Indice niveau 2 : la détection est très récente (interféromètres LIGO).","Indice niveau 3 : c'est 2015."] }
  ]
};

/* fusionne le module Histoire des sciences physiques dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, HISTSCI_CHAPTERS);
Object.assign(NOVA_KB, HISTSCI_NOVA_KB);