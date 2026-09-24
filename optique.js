/* =====================================================================
   CHUNK « optique » — registre OPTIQUE_CHAPTERS / OPTIQUE_NOVA_KB
   Matière(s) : Physique|Optique géométrique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   OPTIQUE_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ===================================================================================
   COURS "OPTIQUE GÉOMÉTRIQUE" — contenu rédigé + exercices
   Source : polycopié USTO-MB Oran, Faculté de Physique, "Optique géométrique — Cours,
   exercices résolus et 200 QCM" (Dr Belkharroubi Fadila, 2022-2023), réécrit, réorganisé
   en 8 chapitres détaillés (le chapitre II du polycopié — miroir plan, dioptre plan,
   prisme — est éclaté en 3 chapitres autonomes pour respecter une granularité comparable
   aux autres modules de la plateforme).
=================================================================================== */

const OPTIQUE_MATIERE = 'Optique géométrique';
function optiqueKey(chapterTitle){ return `Physique|${OPTIQUE_MATIERE}|${chapterTitle}`; }
const OPTIQUE_CHAPTERS = {};
const OPTIQUE_NOVA_KB = {};


/* =========================== CHAPITRE 1 — Notions fondamentales sur la lumière =========================== */
OPTIQUE_CHAPTERS[optiqueKey('Notions fondamentales sur la lumière')] = {
  objectives: [
    "Distinguer l'aspect ondulatoire et l'aspect corpusculaire de la lumière, et relier longueur d'onde, fréquence et célérité",
    "Différencier source primaire et source secondaire, et milieu transparent, opaque et translucide",
    "Décrire la propagation rectiligne de la lumière et distinguer rayon, faisceau et pinceau lumineux",
    "Distinguer objet/image réel(le) et virtuel(le), et énoncer les conditions du stigmatisme approché (conditions de Gauss)",
    "Analyser pourquoi l'optique géométrique, qui ignore la nature ondulatoire de la lumière, reste malgré tout un modèle extraordinairement précis pour concevoir des instruments optiques"
  ],
  prereqs: ["Aucun — premier chapitre du cours"],
  bodyHtml: `
    <p>Pendant plus de deux mille ans, la nature profonde de la lumière est restée l'une des plus grandes énigmes de la philosophie naturelle. Pythagore imaginait des rayons émis par l'œil lui-même ; Aristote y voyait une perturbation d'un milieu transparent ; Euclide, lui, se contentait de constater — avec une précision qui reste valable aujourd'hui — que la lumière se propage en ligne droite. Il faudra attendre la rivalité intellectuelle entre Newton et Huygens au XVIIe siècle, puis Maxwell et enfin Einstein, pour que cette énigme trouve une réponse aussi surprenante que satisfaisante : la lumière est à la fois onde et corpuscule.</p>
    <p>Ce vieux débat n'a rien de purement académique : chaque paire de lunettes, chaque objectif d'appareil photo, chaque endoscope médical repose sur l'optique géométrique de ce cours — un modèle qui, bien qu'ignorant délibérément la nature ondulatoire de la lumière, reste d'une précision redoutable tant que les dimensions des systèmes optiques restent grandes devant la longueur d'onde. C'est cette simplification féconde, faite dès ce premier chapitre, qui rend possible le calcul de la trajectoire d'un rayon lumineux à travers un empilement de lentilles en quelques lignes de géométrie plutôt qu'en résolvant les équations de Maxwell.</p>
    <p>L'optique géométrique étudie la propagation de la lumière et la formation des images à travers les systèmes optiques (miroirs, dioptres, lentilles), sans entrer dans le détail de la nature ondulatoire de la lumière — c'est le domaine de l'optique physique. Ce premier chapitre pose les bases indispensables : qu'est-ce que la lumière, comment se propage-t-elle, et quel vocabulaire utilise-t-on pour décrire les objets et les images qu'elle forme ? À la fin, tu sauras parler le langage précis de l'optique — objet réel, image virtuelle, stigmatisme — que tout le reste du cours utilisera.</p>

    <h3>1. Un peu d'histoire</h3>
    <p>La question de la nature de la lumière remonte à l'Antiquité (Pythagore, Démocrite, Aristote), et la propagation en ligne droite était déjà connue d'Euclide vers 300 av. J.-C. À la fin du XVII<sup>e</sup> siècle, deux conceptions s'affrontent : <strong>Isaac Newton</strong> défend une théorie corpusculaire de la lumière, tandis que <strong>Christiaan Huygens</strong> plaide pour une théorie ondulatoire. Il faudra attendre <strong>James Clerk Maxwell</strong>, au XIX<sup>e</sup> siècle, pour établir que la lumière est une onde électromagnétique — avant que la physique quantique du XX<sup>e</sup> siècle ne réhabilite, avec le photon, un aspect corpusculaire compatible avec l'aspect ondulatoire.</p>

    <h3>2. Double aspect de la lumière</h3>
    <p>La lumière est aujourd'hui décrite par une <strong>dualité onde-corpuscule</strong> :</p>
    <table class="mini-table">
      <tr><th>Aspect</th><th>Description</th><th>Phénomènes expliqués</th></tr>
      <tr><td>Ondulatoire</td><td>Vibration couplée d'un champ électrique et d'un champ magnétique, se propageant sans support matériel (y compris dans le vide)</td><td>Interférences, diffraction, polarisation</td></tr>
      <tr><td>Corpusculaire (photon)</td><td>Paquets d'énergie discrets $E=h\\nu$ transportant quantité de mouvement</td><td>Effet photoélectrique, interaction lumière-matière à l'échelle atomique</td></tr>
    </table>
    <p>En tant qu'onde électromagnétique, une radiation lumineuse est caractérisée par sa fréquence $\\nu$ (en Hz), sa période $T=1/\\nu$ et sa longueur d'onde dans le vide $\\lambda_0$, reliées par :</p>
    <p>$$\\lambda_0 = cT = \\dfrac{c}{\\nu}$$</p>
    <p>où $c = 299\\,792\\,458\\ \\text{m}\\cdot\\text{s}^{-1}$ est la célérité de la lumière dans le vide. Le domaine visible par l'œil humain s'étend approximativement de $\\lambda_0 = 400\\ \\text{nm}$ (violet) à $780\\ \\text{nm}$ (rouge) ; il n'occupe qu'une petite fenêtre du spectre électromagnétique complet (ondes radio, micro-ondes, infrarouge, visible, ultraviolet, rayons X, rayons $\\gamma$).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'œil humain n'est sensible qu'à une fenêtre spectrale extrêmement étroite (400-780 nm) comparée à l'immense spectre électromagnétique. Sachant que cette fenêtre correspond précisément au maximum d'émission du Soleil et à une zone de transparence de l'atmosphère terrestre, penses-tu que ce soit une coïncidence, ou le résultat de l'évolution biologique ?
    </div>

    <h3>3. Sources de lumière</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Définition</th><th>Exemples</th></tr>
      <tr><td>Source primaire</td><td>Objet qui génère sa propre lumière par un processus intrinsèque</td><td>Soleil, étoiles, lampes, flamme</td></tr>
      <tr><td>Source secondaire</td><td>Objet qui ne produit pas sa propre lumière, mais réfléchit ou diffuse celle d'une source primaire</td><td>Lune, planètes, tout objet éclairé qui nous entoure</td></tr>
    </table>

    <h3>4. Les milieux de propagation</h3>
    <table class="mini-table">
      <tr><th>Milieu</th><th>Propriété</th><th>Exemple</th></tr>
      <tr><td>Transparent</td><td>On voit nettement les objets à travers</td><td>Air, eau, verre</td></tr>
      <tr><td>Translucide</td><td>Laisse passer la lumière mais sans image nette</td><td>Verre dépoli</td></tr>
      <tr><td>Opaque</td><td>Ne laisse pas passer la lumière</td><td>Mur, bois, carton</td></tr>
    </table>
    <p>Dans le vide ou dans un milieu transparent homogène et isotrope, la lumière se propage <strong>en ligne droite</strong> : c'est le postulat fondamental de l'optique géométrique.</p>

    <h3>5. Rayon, faisceau et pinceau lumineux</h3>
    <p>On distingue, par échelle croissante :</p>
    <ul>
      <li><strong>Le rayon lumineux</strong> : trajectoire idéale (mathématique) suivie par la lumière, représentée par une droite orientée dans le sens de propagation ;</li>
      <li><strong>Le pinceau lumineux</strong> : ensemble de rayons issus d'un même point (ou convergeant vers un même point), s'appuyant sur un très petit contour ;</li>
      <li><strong>Le faisceau lumineux</strong> : ensemble de rayons s'appuyant sur un contour de taille quelconque ; on parle de faisceau parallèle, convergent ou divergent selon la direction relative des rayons qui le composent.</li>
    </ul>

    <h3>6. Les trois grands phénomènes lumineux à une interface</h3>
    <p>Lorsqu'un rayon lumineux rencontre la surface de séparation entre deux milieux, trois phénomènes peuvent se produire simultanément :</p>
    <table class="mini-table">
      <tr><th>Phénomène</th><th>Description</th></tr>
      <tr><td>Diffusion</td><td>La surface renvoie la lumière dans de multiples directions (surface rugueuse à l'échelle de $\\lambda$)</td></tr>
      <tr><td>Réflexion</td><td>Le rayon repart dans le premier milieu selon un angle bien défini (surface lisse : réflexion spéculaire)</td></tr>
      <tr><td>Réfraction</td><td>Le rayon change de milieu en changeant de direction (sauf incidence normale)</td></tr>
    </table>
    <p>Ces deux derniers phénomènes obéissent tous deux à la <strong>loi de Snell-Descartes</strong>, qui sera détaillée et appliquée dans les chapitres suivants (miroir plan pour la réflexion, dioptre plan pour la réfraction) :</p>
    <ol>
      <li><strong>1<sup>re</sup> loi (loi du plan d'incidence)</strong> : le rayon incident, la normale au point d'incidence et le rayon réfléchi (ou réfracté) sont dans un même plan, le plan d'incidence ;</li>
      <li><strong>2<sup>e</sup> loi</strong> : les angles d'incidence et de réflexion (ou de réfraction) sont reliés par une relation trigonométrique impliquant les indices des milieux.</li>
    </ol>

    <h3>7. Système optique, objets et images</h3>
    <p>Un <strong>système optique</strong> est un ensemble de milieux transparents et/ou de surfaces réfléchissantes traversé par la lumière (miroir, dioptre, lentille, association de plusieurs éléments). Il transforme un faisceau issu d'un point-objet $A$ en un faisceau qui semble issu (ou converge réellement) vers un point-image $A'$.</p>
    <table class="mini-table">
      <tr><th>Notion</th><th>Définition</th></tr>
      <tr><td>Objet réel</td><td>Les rayons incidents divergent réellement à partir de $A$ (situé avant le système, dans le sens de la lumière)</td></tr>
      <tr><td>Objet virtuel</td><td>Les rayons incidents convergent vers $A$ sans l'atteindre réellement (le système intercepte les rayons avant $A$)</td></tr>
      <tr><td>Image réelle</td><td>Les rayons émergents convergent réellement en $A'$ : l'image peut être recueillie sur un écran</td></tr>
      <tr><td>Image virtuelle</td><td>Les rayons émergents semblent provenir de $A'$ sans y passer réellement : l'image n'est visible que par un œil (ou un instrument) regardant à travers le système, pas sur un écran</td></tr>
    </table>
    <p>Ces quatre situations organisent l'espace autour d'un système optique en quatre zones : espace objet réel, espace objet virtuel, espace image réelle, espace image virtuelle.</p>

    <h3>8. Stigmatisme et conditions de Gauss</h3>
    <p>Un système optique est dit <strong>rigoureusement stigmatique</strong> pour un couple de points $(A,A')$ si tous les rayons issus de $A$ convergent exactement en $A'$ après traversée du système. Ce stigmatisme rigoureux n'est réalisé exactement, pour tout point de l'espace, que par le miroir plan.</p>
    <p>Pour les autres systèmes (miroirs et dioptres sphériques, lentilles), on ne dispose que d'un <strong>stigmatisme approché</strong>, valable si l'on se restreint aux <strong>conditions de Gauss</strong> :</p>
    <ul>
      <li>les rayons sont peu inclinés par rapport à l'axe optique (rayons <em>paraxiaux</em>) ;</li>
      <li>les rayons rencontrent le système optique près de son axe (petite ouverture).</li>
    </ul>
    <p>Sous ces conditions, on peut confondre sinus, tangente et angle en radians ($\\sin\\theta \\approx \\tan\\theta \\approx \\theta$), ce qui linéarise les lois de Snell-Descartes et permet d'établir les formules de conjugaison simples utilisées dans tout le reste du cours. Un système est de plus dit <strong>aplanétique</strong> si l'image d'un petit objet plan perpendiculaire à l'axe optique est elle-même plane et perpendiculaire à l'axe : c'est l'aplanétisme, complément indispensable du stigmatisme pour une image nette et non déformée.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Toute la démarche du cours découle de l'approximation de Gauss : en restreignant l'étude aux rayons paraxiaux et peu ouverts, chaque système optique (miroir, dioptre, lentille) devient approximativement stigmatique et aplanétique, ce qui permet d'associer à tout objet une image unique, calculable par une simple formule de conjugaison.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le miroir plan est le seul système rigoureusement stigmatique pour tout point de l'espace, sans aucune approximation. Pourquoi, selon toi, les miroirs sphériques, les dioptres et les lentilles — pourtant bien plus utiles en pratique — ne peuvent-ils prétendre qu'à un stigmatisme approché, réservé aux rayons proches de l'axe optique ?
    </div>

    <h3>9. Frontière de la recherche</h3>
    <p>Sortir des conditions de Gauss, c'est justement le défi que doivent relever les concepteurs d'objectifs photographiques grand angle ou de télescopes spatiaux comme le télescope James Webb : au-delà de l'approximation paraxiale apparaissent des défauts appelés aberrations géométriques (aberration sphérique, coma, astigmatisme), que l'optique moderne corrige en combinant plusieurs lentilles asphériques calculées numériquement. La conception optique assistée par ordinateur, discipline à part entière, occupe aujourd'hui des équipes entières d'ingénieurs pour repousser ces limites.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir un système optique unique, à la fois rigoureusement stigmatique et aplanétique pour tout point de l'espace (et pas seulement en conditions de Gauss) ? La réponse, en toute généralité, est négative pour les systèmes à réfraction classiques — un résultat qui pousse la recherche vers des optiques non conventionnelles (métalentilles, optique adaptative).</p>
    <p><strong>Technologie émergente :</strong> les métalentilles, des surfaces structurées à l'échelle nanométrique bien plus fines qu'une lentille en verre classique, promettent de corriger certaines aberrations optiques tout en réduisant drastiquement l'épaisseur et le poids des systèmes optiques, notamment pour les smartphones et les capteurs miniaturisés.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Lumière (onde-corpuscule) → propagation rectiligne dans un milieu homogène → rayon/faisceau/pinceau → interface : réflexion/réfraction/diffusion → système optique → objet/image (réel ou virtuel) → conditions de Gauss → stigmatisme et aplanétisme approchés
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\lambda_0 = \\frac{c}{\\nu}$$
      Cette relation, en apparence élémentaire, est le pont entre la description ondulatoire de la lumière (fréquence, longueur d'onde) et sa vitesse universelle dans le vide — le point de départ obligé de toute la suite du cours.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>$\\lambda_0 = cT = c/\\nu$, avec $c=299\\,792\\,458\\ \\text{m/s}$ ; le visible s'étend de 400 nm (violet) à 780 nm (rouge)</li>
        <li>Source primaire (émet sa propre lumière) contre source secondaire (diffuse/réfléchit une lumière reçue)</li>
        <li>Dans un milieu transparent homogène, la lumière se propage en ligne droite : c'est le postulat de base de l'optique géométrique</li>
        <li>À une interface : diffusion, réflexion et réfraction obéissent aux lois de Snell-Descartes (plan d'incidence + relation trigonométrique)</li>
        <li>Objet/image réel(le) : les rayons passent réellement par le point ; virtuel(le) : ils semblent seulement en provenir ou y converger</li>
        <li>Le stigmatisme n'est rigoureux que pour le miroir plan ; ailleurs, on travaille dans les conditions de Gauss (rayons paraxiaux, peu ouverts) pour obtenir un stigmatisme et un aplanétisme approchés</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre image virtuelle et image inexistante : une image virtuelle est parfaitement visible à l'œil, simplement pas récupérable sur un écran</li>
        <li>Oublier que le stigmatisme rigoureux est l'exception (miroir plan) et non la règle : les autres systèmes exigent l'approximation de Gauss</li>
        <li>Mélanger longueur d'onde dans le vide $\\lambda_0$ et longueur d'onde dans un milieu quelconque, qui diffèrent par l'indice du milieu ($\\lambda = \\lambda_0/n$)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une radiation a une longueur d'onde dans le vide $\\lambda_0 = 600\\ \\text{nm}$. Sa fréquence $\\nu$ vaut approximativement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt1e1" value="wrong"> $5\\times 10^{9}$ Hz</label>
          <label class="option"><input type="radio" name="opt1e1" value="right"> $5\\times 10^{14}$ Hz</label>
          <label class="option"><input type="radio" name="opt1e1" value="wrong"> $5\\times 10^{20}$ Hz</label>
          <label class="option"><input type="radio" name="opt1e1" value="wrong"> $1{,}8\\times 10^{-15}$ Hz</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt1e1','opt1fb1','Correct — ν=c/λ₀=3×10⁸/600×10⁻⁹≈5×10¹⁴ Hz, une valeur typique pour la lumière visible.','Utilise ν=c/λ₀ avec c=3×10⁸ m/s et λ₀=600×10⁻⁹ m : l\'ordre de grandeur attendu est 10¹⁴ Hz.')">Vérifier</button>
        <div class="feedback" id="opt1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un objet virtuel pour un système optique est un objet dont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt1e2" value="wrong"> les rayons incidents divergent réellement à partir de lui</label>
          <label class="option"><input type="radio" name="opt1e2" value="right"> les rayons incidents convergent vers lui sans jamais l'atteindre réellement</label>
          <label class="option"><input type="radio" name="opt1e2" value="wrong"> l'image ne peut jamais être vue à l'œil</label>
          <label class="option"><input type="radio" name="opt1e2" value="wrong"> il n'existe que dans les miroirs sphériques</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt1e2','opt1fb2','Correct — un objet virtuel est intercepté par le système avant que les rayons ne convergent réellement en lui.','Relis la section 7 : un objet virtuel correspond à des rayons qui convergent vers ce point sans y arriver réellement, car le système optique les intercepte avant.')">Vérifier</button>
        <div class="feedback" id="opt1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Les conditions de Gauss consistent à se restreindre à des rayons :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt1e3" value="wrong"> très inclinés par rapport à l'axe optique</label>
          <label class="option"><input type="radio" name="opt1e3" value="right"> peu inclinés par rapport à l'axe optique et proches de l'axe (paraxiaux)</label>
          <label class="option"><input type="radio" name="opt1e3" value="wrong"> uniquement parallèles entre eux</label>
          <label class="option"><input type="radio" name="opt1e3" value="wrong"> uniquement monochromatiques</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt1e3','opt1fb3','Correct — les rayons paraxiaux, peu ouverts, permettent de confondre sinus, tangente et angle et d\'obtenir un stigmatisme approché.','Reviens à la section 8 : les conditions de Gauss portent sur l\'inclinaison et la proximité des rayons par rapport à l\'axe optique, pas sur leur couleur ni leur parallélisme.')">Vérifier</button>
        <div class="feedback" id="opt1fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'œil humain pouvait accommoder pour former des images nettes de rayons très inclinés (hors des conditions de Gauss) : notre vision périphérique serait-elle plus précise qu'elle ne l'est aujourd'hui ?</li>
        <li>Pourquoi Newton, l'un des plus grands génies scientifiques de l'histoire, s'est-il autant trompé sur la nature corpusculaire exclusive de la lumière, alors que des phénomènes comme la diffraction étaient déjà connus de son vivant ?</li>
        <li>Quelle serait la conséquence, pour la conception des appareils photo, si l'on pouvait fabriquer des systèmes optiques rigoureusement stigmatiques pour tout point de l'espace, sans restriction aux conditions de Gauss ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Euclide, <em>Optique</em>, vers 300 av. J.-C. — premier traité connu sur la propagation rectiligne de la lumière et les lois de la réflexion.</li>
        <li>E. Hecht, <em>Optics</em>, Pearson — référence internationale moderne pour l'optique géométrique et ondulatoire.</li>
        <li>A. Arbabi et al., « Miniature Optical Planar Camera Based on a Wide-Angle Metasurface Doublet Corrected for Monochromatic Aberrations », Nature Communications, 2016.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes maintenant de tout le vocabulaire nécessaire pour aborder sereinement l'étude de chaque système optique. Le chapitre suivant, « Miroir plan : réflexion et formation des images », va appliquer concrètement ces notions au système optique le plus simple — et le seul rigoureusement stigmatique — pour construire tes premières images par construction géométrique. Comme le disait Newton lui-même, avec une modestie qui contraste avec son génie : « Si j'ai vu plus loin, c'est en montant sur les épaules de géants. » Tu montes, toi aussi, sur les épaules d'Euclide, Newton, Huygens et Maxwell.</p>
  `
};

OPTIQUE_NOVA_KB[optiqueKey('Notions fondamentales sur la lumière')] = {
  intro: "Salut, moi c'est Nova ! On démarre l'Optique géométrique par les notions fondamentales sur la lumière. Demande-moi la relation entre longueur d'onde et fréquence, la différence entre objet réel et virtuel, ou ce que sont les conditions de Gauss.",
  rules: [
    { test:/lambda|longueur d.onde|fr[ée]quence/i, replies:["La relation fondamentale est λ₀=cT=c/ν, avec c=299 792 458 m/s. Le visible va d'environ 400 nm (violet) à 780 nm (rouge)."] },
    { test:/source primaire|source secondaire/i, replies:["Une source primaire (Soleil, lampe) produit sa propre lumière ; une source secondaire (Lune, tout objet éclairé) ne fait que diffuser ou réfléchir la lumière reçue d'une source primaire."] },
    { test:/objet r[ée]el|objet virtuel/i, replies:["Un objet réel a des rayons incidents qui divergent réellement à partir de lui. Un objet virtuel a des rayons incidents qui convergent vers lui sans jamais l'atteindre, car le système optique les intercepte avant."] },
    { test:/image r[ée]elle|image virtuelle/i, replies:["Une image réelle se forme là où les rayons émergents convergent réellement : on peut la recueillir sur un écran. Une image virtuelle n'existe que par prolongement des rayons émergents : elle se voit à l'œil, jamais sur un écran."] },
    { test:/stigmatisme/i, replies:["Le stigmatisme rigoureux (tout rayon issu de A converge exactement en A') n'est réalisé exactement que par le miroir plan. Pour les autres systèmes, on se limite aux conditions de Gauss pour obtenir un stigmatisme approché."] },
    { test:/gauss|paraxial/i, replies:["Les conditions de Gauss imposent des rayons peu inclinés par rapport à l'axe optique (paraxiaux) et proches de cet axe. On peut alors confondre sinus, tangente et angle en radians, ce qui simplifie toutes les formules de conjugaison."] },
    { test:/rayon.*faisceau|pinceau/i, replies:["Le rayon lumineux est une trajectoire idéale (une droite). Le pinceau est un ensemble de rayons issus d'un même point, sur un tout petit contour. Le faisceau est un ensemble de rayons sur un contour quelconque : parallèle, convergent ou divergent."] },
    { test:/aplan[ée]tisme/i, replies:["L'aplanétisme est la propriété qu'a un système optique de donner d'un petit objet plan perpendiculaire à l'axe une image elle-même plane et perpendiculaire à l'axe. Il complète le stigmatisme pour garantir une image nette et non déformée."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise ν=c/λ₀.","Indice niveau 2 : avec c=3×10⁸ m/s et λ₀=600×10⁻⁹ m, le résultat a un ordre de grandeur en 10¹⁴.","Indice niveau 3 : ν≈5×10¹⁴ Hz."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la différence entre rayons qui divergent réellement et rayons qui convergent sans atteindre le point.","Indice niveau 2 : un objet virtuel n'est jamais la source réelle des rayons incidents.","Indice niveau 3 : les rayons incidents convergent vers lui sans l'atteindre réellement."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : les conditions de Gauss concernent la géométrie des rayons par rapport à l'axe optique.","Indice niveau 2 : il s'agit de rayons peu inclinés et proches de l'axe.","Indice niveau 3 : rayons paraxiaux, peu ouverts."] }
  ]
};


/* =========================== CHAPITRE 2 — Miroir plan : réflexion et formation des images =========================== */
OPTIQUE_CHAPTERS[optiqueKey('Miroir plan : réflexion et formation des images')] = {
  objectives: [
    "Distinguer réflexion spéculaire et réflexion diffuse, et énoncer la loi de Snell-Descartes pour la réflexion",
    "Appliquer le principe du retour inverse de la lumière",
    "Construire géométriquement l'image d'un objet donnée par un miroir plan et démontrer sa formule de conjugaison",
    "Caractériser l'image formée par un miroir plan (nature, sens, grandeur) et déterminer le champ de vision d'un miroir",
    "Analyser pourquoi le miroir plan, bien que le plus simple des systèmes optiques, est en réalité le seul rigoureusement stigmatique de tout le cours"
  ],
  prereqs: ["Notions fondamentales sur la lumière"],
  bodyHtml: `
    <p>Le mythe grec de Narcisse, tombé amoureux de son propre reflet dans une eau calme, témoigne d'une fascination humaine très ancienne pour l'image réfléchie — bien avant que quiconque ne comprenne pourquoi cette image apparaît exactement symétrique, ni pourquoi elle semble se trouver « derrière » la surface réfléchissante. Les miroirs de bronze poli, puis de verre argenté à partir de la Renaissance à Venise (un secret industriel jalousement gardé pendant des siècles), ont longtemps été des objets de luxe avant de devenir omniprésents dans notre quotidien.</p>
    <p>Le miroir plan n'est pourtant pas qu'un objet de salle de bains : c'est lui qui équipe les rétroviseurs automobiles, les périscopes de sous-marins, et — combiné à d'autres miroirs — les télescopes les plus puissants au monde, comme le télescope spatial James Webb, dont le miroir primaire segmenté capte la lumière d'étoiles vieilles de plus de 13 milliards d'années.</p>
    <p>Le miroir plan est le système optique le plus simple, et le seul à être <strong>rigoureusement stigmatique</strong> : il donne une image parfaite de n'importe quel objet, sans aucune approximation. Il constitue donc un excellent point de départ pour construire le vocabulaire et les méthodes que l'on retrouvera, cette fois de façon approchée, dans tous les systèmes suivants. À la fin de ce chapitre, tu sauras construire géométriquement l'image de n'importe quel objet par un miroir plan, et déterminer précisément la zone de l'espace visible depuis une position d'observation donnée.</p>

    <h3>1. Réflexion spéculaire et réflexion diffuse</h3>
    <p>Lorsqu'un faisceau lumineux frappe une surface, deux comportements sont possibles selon l'état de cette surface, à l'échelle de la longueur d'onde :</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Surface</th><th>Effet</th></tr>
      <tr><td>Réflexion spéculaire</td><td>Lisse à l'échelle de $\\lambda$ (miroir, eau calme)</td><td>Tous les rayons parallèles incidents restent parallèles après réflexion : image nette</td></tr>
      <tr><td>Réflexion diffuse</td><td>Rugueuse à l'échelle de $\\lambda$ (papier, mur, tissu)</td><td>Les rayons sont renvoyés dans des directions multiples : pas d'image, mais l'objet devient visible sous tout angle</td></tr>
    </table>
    <p>C'est la réflexion diffuse, omniprésente autour de nous, qui nous permet de voir les objets qui ne sont pas eux-mêmes des sources de lumière.</p>

    <h3>2. Loi de Snell-Descartes pour la réflexion</h3>
    <p>Au point d'incidence $I$, on définit la <strong>normale</strong> à la surface, l'<strong>angle d'incidence</strong> $i_1$ (entre le rayon incident et la normale) et l'<strong>angle de réflexion</strong> $i_1'$ (entre le rayon réfléchi et la normale). La loi de la réflexion s'énonce en deux volets :</p>
    <ol>
      <li>le rayon incident, la normale et le rayon réfléchi sont dans un même plan (le plan d'incidence) ;</li>
      <li>les angles d'incidence et de réflexion sont égaux : $$i_1 = i_1'$$</li>
    </ol>
    <p>Cette relation est un cas particulier — le plus simple — de la loi générale de Snell-Descartes, qui sera reformulée pour la réfraction au chapitre suivant.</p>

    <h3>3. Retour inverse de la lumière</h3>
    <p>Le principe du <strong>retour inverse de la lumière</strong> énonce que si un rayon suit un certain trajet dans un sens (par exemple de $A$ vers $B$, avec d'éventuelles réflexions ou réfractions), alors un rayon suivant exactement le trajet inverse (de $B$ vers $A$) est parfaitement possible et emprunte le même chemin. Appliqué à un couple objet-image $(A,A')$ d'un miroir plan, cela signifie que si $A'$ jouait le rôle d'objet, son image serait $A$ : la relation entre $A$ et $A'$ est symétrique.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le principe du retour inverse de la lumière est une conséquence directe d'une propriété plus profonde des équations de l'électromagnétisme : leur invariance par renversement du temps. Peux-tu imaginer une situation physique réaliste où ce principe semblerait, à première vue, être mis en défaut (indice : pense à un milieu qui absorbe ou amplifie la lumière) ?
    </div>

    <h3>4. Champ de vision d'un miroir</h3>
    <p>Le <strong>champ de vision</strong> d'un miroir plan, pour un œil placé en un point donné, est la région de l'espace dont l'œil peut voir l'image dans le miroir. Il se construit en traçant, à partir de la position de l'œil, les rayons limites qui touchent les bords du miroir : le champ de vision est délimité par le symétrique de l'œil par rapport au miroir et par les bords du miroir. Il ne dépend pas seulement de la taille du miroir, mais aussi de la distance et de la position de l'observateur par rapport à celui-ci.</p>

    <h3>5. Formule de conjugaison du miroir plan</h3>
    <p>Considérons un point-objet $A$ et son image $A'$ à travers un miroir plan. Notons $H$ la projection orthogonale de $A$ sur le plan du miroir. Par symétrie de la réflexion, l'image $A'$ est le <strong>symétrique</strong> de $A$ par rapport au plan du miroir : $A$ et $A'$ sont de part et d'autre de $H$, à la même distance de $H$. On en déduit la formule de conjugaison du miroir plan, avec origine en $H$ :</p>
    <p>$$\\overline{AH} + \\overline{A'H} = 0$$</p>
    <p>Cette relation extrêmement simple traduit un fait remarquable : <strong>l'image d'une source ponctuelle par un miroir plan est exactement son symétrique par rapport au plan du miroir</strong>, quelle que soit la position de $A$ (cela reste vrai pour tout point, pas seulement dans une approximation de Gauss) : c'est la traduction du stigmatisme rigoureux du miroir plan.</p>

    <h3>6. Caractéristiques de l'image et grandissement</h3>
    <p>Pour un objet $AB$ perpendiculaire au miroir (ou parallèle à sa surface), l'image $A'B'$ possède les propriétés suivantes :</p>
    <ul>
      <li><strong>droite</strong> (non renversée) ;</li>
      <li><strong>de même grandeur</strong> que l'objet : $\\overline{A'B'} = \\overline{AB}$, donc un grandissement $\\gamma = \\overline{A'B'}/\\overline{AB} = 1$ ;</li>
      <li><strong>à égale distance</strong> du miroir, de l'autre côté ;</li>
      <li>une image réelle donne un objet virtuel, et un objet réel donne une image virtuelle (conséquence directe du retour inverse de la lumière).</li>
    </ul>
    <p>Le miroir plan est donc <strong>aplanétique</strong> en plus d'être stigmatique : l'image d'un objet plan reste plane, sans déformation, quel que soit l'angle d'incidence.</p>

    <h3>7. Applications de la réflexion</h3>
    <p>La réflexion sur des miroirs plans (seuls ou en association) trouve de nombreuses applications : miroirs de salle de bains et rétroviseurs, périscopes (deux miroirs à 45°), kaléidoscopes (miroirs multiples), correction d'images en imagerie et signalétique (lettres inversées « AMBULANCE » à l'avant des véhicules d'urgence, lisibles dans le rétroviseur d'un véhicule précédent), ainsi que de nombreux instruments optiques combinant miroirs et lentilles.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Le miroir plan réalise $i_1=i_1'$ et donne une image $A'$, symétrique exact de $A$ par rapport au plan du miroir : $\\overline{AH}+\\overline{A'H}=0$. L'image est toujours droite, de même grandeur que l'objet ($\\gamma=1$), et de nature opposée à celle de l'objet (réel ↔ virtuelle).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un miroir plan renverse la gauche et la droite de ton image dans le miroir, mais pas le haut et le bas. Pourtant, géométriquement, le miroir se contente d'inverser la seule direction perpendiculaire à sa surface. Comment résous-tu ce paradoxe apparent — est-ce vraiment la gauche et la droite qui sont inversées, ou autre chose ?
    </div>

    <h3>8. Frontière de la recherche</h3>
    <p>Le miroir primaire du télescope spatial James Webb, lancé en 2021, est constitué de 18 segments hexagonaux en béryllium doré, chacun ajustable au nanomètre près par des actionneurs motorisés — une prouesse d'ingénierie qui repose sur la même loi de réflexion $i_1=i_1'$ que ce chapitre, appliquée avec une précision extrême. Sa mise au point a permis d'observer certaines des galaxies les plus lointaines et les plus anciennes jamais détectées, remontant à quelques centaines de millions d'années après le Big Bang.</p>
    <p><strong>Question ouverte :</strong> peut-on fabriquer des miroirs déformables en temps réel, à l'échelle de la microseconde, pour corriger les turbulences atmosphériques qui brouillent les images des télescopes terrestres ? C'est précisément l'objet de l'optique adaptative, un domaine de recherche actif qui a permis des progrès spectaculaires en astronomie au sol ces dernières décennies.</p>
    <p><strong>Technologie émergente :</strong> les micro-miroirs déformables (MEMS, systèmes micro-électromécaniques), utilisés en optique adaptative et dans les vidéoprojecteurs DLP, appliquent le même principe géométrique de réflexion à des échelles microscopiques, avec des milliers de miroirs individuellement orientables.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Rayon incident sur le miroir → loi de réflexion $i_1=i_1'$ → symétrie objet-image par rapport au plan du miroir → image droite, $\\gamma=+1$, nature opposée à l'objet
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\overline{AH} + \\overline{A'H} = 0$$
      Cette formule de conjugaison, la plus simple de tout le cours d'optique géométrique, résume en une ligne le stigmatisme rigoureux du miroir plan : l'image est toujours le symétrique exact de l'objet.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Loi de la réflexion : rayon incident, normale et rayon réfléchi coplanaires, avec $i_1=i_1'$</li>
        <li>Réflexion spéculaire (surface lisse, image nette) contre réflexion diffuse (surface rugueuse, pas d'image)</li>
        <li>Formule de conjugaison : $\\overline{AH}+\\overline{A'H}=0$ — l'image est le symétrique exact de l'objet par rapport au miroir</li>
        <li>Grandissement $\\gamma=1$ : image toujours droite et de même taille que l'objet</li>
        <li>Un objet réel donne toujours une image virtuelle, et réciproquement (retour inverse de la lumière)</li>
        <li>Le miroir plan est le seul système rigoureusement stigmatique et aplanétique pour tout point de l'espace</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que l'image dans un miroir plan peut être recueillie sur un écran : elle est toujours virtuelle pour un objet réel</li>
        <li>Oublier que le champ de vision dépend de la position de l'observateur, pas seulement de la taille du miroir</li>
        <li>Confondre réflexion diffuse et absence de réflexion : la réflexion diffuse renvoie bien la lumière, mais dans toutes les directions</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un objet ponctuel réel A est placé à 40 cm devant un miroir plan. Son image A' se trouve :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt2e1" value="wrong"> réelle, à 40 cm devant le miroir</label>
          <label class="option"><input type="radio" name="opt2e1" value="right"> virtuelle, à 40 cm derrière le miroir</label>
          <label class="option"><input type="radio" name="opt2e1" value="wrong"> virtuelle, à 80 cm derrière le miroir</label>
          <label class="option"><input type="radio" name="opt2e1" value="wrong"> réelle, confondue avec A</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt2e1','opt2fb1','Correct — l\'image est le symétrique exact de l\'objet par rapport au plan du miroir : même distance, de l\'autre côté, et virtuelle car l\'objet est réel.','Utilise la formule AH+A\'H=0 : l\'image est à la même distance du miroir que l\'objet, mais de l\'autre côté, et un objet réel donne toujours une image virtuelle.')">Vérifier</button>
        <div class="feedback" id="opt2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le grandissement d'un miroir plan vaut toujours :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt2e2" value="wrong"> -1</label>
          <label class="option"><input type="radio" name="opt2e2" value="right"> +1</label>
          <label class="option"><input type="radio" name="opt2e2" value="wrong"> dépend de la distance à l'objet</label>
          <label class="option"><input type="radio" name="opt2e2" value="wrong"> 0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt2e2','opt2fb2','Correct — γ=+1 : l\'image est toujours droite et de même taille que l\'objet, quelle que soit sa position.','Reviens à la section 6 : l\'image d\'un miroir plan est toujours droite (pas renversée) et de même grandeur que l\'objet.')">Vérifier</button>
        <div class="feedback" id="opt2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une surface donne une réflexion diffuse lorsque :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt2e3" value="wrong"> elle est parfaitement lisse à l'échelle de la longueur d'onde</label>
          <label class="option"><input type="radio" name="opt2e3" value="right"> elle est rugueuse à l'échelle de la longueur d'onde</label>
          <label class="option"><input type="radio" name="opt2e3" value="wrong"> elle absorbe toute la lumière incidente</label>
          <label class="option"><input type="radio" name="opt2e3" value="wrong"> l'angle d'incidence est nul</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt2e3','opt2fb3','Correct — c\'est la rugosité de la surface, à l\'échelle de λ, qui disperse les rayons réfléchis dans toutes les directions.','Relis la section 1 : la réflexion diffuse est due à une surface rugueuse à l\'échelle de la longueur d\'onde, contrairement à la réflexion spéculaire.')">Vérifier</button>
        <div class="feedback" id="opt2fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on associait deux miroirs plans à angle variable : comment le nombre d'images observées évoluerait-il quand on referme progressivement l'angle entre eux (principe du kaléidoscope) ?</li>
        <li>Pourquoi le texte « AMBULANCE » est-il inversé à l'avant des véhicules d'urgence, et à quelle condition précise redevient-il lisible dans un rétroviseur ?</li>
        <li>Quelle serait la conséquence, pour l'astronomie, si l'on ne pouvait fabriquer que des miroirs de petite taille (moins d'un mètre de diamètre), incapables d'être segmentés comme celui du télescope James Webb ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Euclide, <em>Catoptrique</em>, vers 300 av. J.-C. — traité antique sur les lois de la réflexion.</li>
        <li>E. Hecht, <em>Optics</em>, Pearson — chapitre sur la réflexion et les miroirs plans.</li>
        <li>NASA/ESA/CSA, « The James Webb Space Telescope Primary Mirror », rapports techniques de mission, 2022.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu maîtrises désormais le système optique le plus simple, mais aussi le plus parfait de tout le cours. Le chapitre suivant, « Dioptre plan : réfraction et réflexion totale », va t'introduire à un système bien moins parfait — où le stigmatisme rigoureux disparaît — mais tout aussi riche en applications, de la paille qui semble se briser dans un verre d'eau jusqu'aux fibres optiques. Comme le disait le poète et physicien Goethe à propos de la lumière : « Plus de lumière ! » Le miroir plan t'en a offert un reflet parfait ; la suite du cours va t'apprendre à la faire dévier, plier, et voyager.</p>
  `
};

OPTIQUE_NOVA_KB[optiqueKey('Miroir plan : réflexion et formation des images')] = {
  intro: "Salut, moi c'est Nova ! On étudie le miroir plan : réflexion, retour inverse de la lumière et formation d'images. Demande-moi la formule de conjugaison, le grandissement, ou la différence entre réflexion spéculaire et diffuse.",
  rules: [
    { test:/loi.*r[ée]flexion|snell.*r[ée]flexion|i\s*=\s*i/i, replies:["La loi de la réflexion impose que le rayon incident, la normale et le rayon réfléchi soient coplanaires, avec égalité des angles : i₁=i₁'."] },
    { test:/sp[ée]culaire|diffuse/i, replies:["La réflexion spéculaire (surface lisse) renvoie les rayons parallèles de façon organisée, donnant une image nette. La réflexion diffuse (surface rugueuse) disperse la lumière dans toutes les directions, sans image, mais rend l'objet visible sous tout angle."] },
    { test:/conjugaison|formule.*miroir plan/i, replies:["La formule de conjugaison du miroir plan est AH+A'H=0 : l'image A' est le symétrique exact de l'objet A par rapport au plan du miroir."] },
    { test:/grandissement/i, replies:["Le grandissement du miroir plan vaut toujours γ=+1 : l'image est droite et de même taille que l'objet, quelle que soit la distance."] },
    { test:/retour inverse/i, replies:["Le principe du retour inverse de la lumière dit que si un rayon va de A à B en suivant un certain trajet, le trajet inverse de B à A est tout aussi valide. Pour un miroir plan, cela explique pourquoi la relation entre objet et image est symétrique."] },
    { test:/champ de vision/i, replies:["Le champ de vision d'un miroir, pour un œil donné, est la zone de l'espace dont l'image est visible dans le miroir. Il dépend à la fois de la taille du miroir et de la position de l'observateur, pas seulement de la taille du miroir."] },
    { test:/virtuel.*r[ée]el|r[ée]el.*virtuel/i, replies:["Pour un miroir plan, un objet réel donne toujours une image virtuelle, et un objet virtuel donne toujours une image réelle : c'est une conséquence du retour inverse de la lumière."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique la formule de conjugaison AH+A'H=0.","Indice niveau 2 : l'image est à la même distance du miroir que l'objet, de l'autre côté.","Indice niveau 3 : virtuelle, à 40 cm derrière le miroir."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la nature (droite ou renversée) et à la taille de l'image dans un miroir plan.","Indice niveau 2 : l'image est toujours droite et de même taille.","Indice niveau 3 : γ=+1."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à l'état de surface à l'échelle de la longueur d'onde.","Indice niveau 2 : ce n'est pas une surface lisse qui produit ce phénomène.","Indice niveau 3 : une surface rugueuse à l'échelle de λ."] }
  ]
};


/* =========================== CHAPITRE 3 — Dioptre plan : réfraction et réflexion totale =========================== */
OPTIQUE_CHAPTERS[optiqueKey('Dioptre plan : réfraction et réflexion totale')] = {
  objectives: [
    "Définir l'indice de réfraction absolu et l'indice de réfraction relatif d'un milieu",
    "Énoncer et appliquer la loi de Snell-Descartes pour la réfraction",
    "Expliquer l'angle limite de réfraction et le phénomène de réflexion totale",
    "Établir et utiliser la formule de conjugaison du dioptre plan dans l'approximation de Gauss",
    "Analyser pourquoi la réflexion totale offre un rendement de 100 %, contrairement à n'importe quel miroir métallique réel"
  ],
  prereqs: ["Miroir plan : réflexion et formation des images"],
  bodyHtml: `
    <p>Plonge une paille dans un verre d'eau : elle paraît instantanément brisée à la surface, un tour de passe-passe que les enfants découvrent avec émerveillement depuis toujours, sans se douter qu'il repose sur un principe formulé, indépendamment, par le savant néerlandais Willebrord Snell et le philosophe français René Descartes au XVIIe siècle. Ce même principe explique pourquoi un poisson vu depuis la berge d'une rivière n'est jamais exactement là où il paraît être — un détail que les pêcheurs à l'arc traditionnels devaient apprendre à corriger d'instinct, des siècles avant que la physique n'en donne l'explication précise.</p>
    <p>Mais la réfraction ne se contente pas de créer des illusions amusantes : c'est elle qui, poussée à l'extrême par la réflexion totale, permet aujourd'hui à un unique câble de fibre optique de transporter, sans perte notable, la totalité du trafic Internet transocéanique — une prouesse technologique reposant sur un phénomène physique d'un rendement parfait de 100 %, que ni un miroir en argent ni un miroir en or, aussi poli soit-il, ne pourra jamais égaler.</p>
    <p>Un <strong>dioptre plan</strong> est la surface plane séparant deux milieux transparents, homogènes et isotropes, d'indices de réfraction différents — par exemple la surface libre d'un lac (interface eau-air). Contrairement au miroir, le dioptre laisse passer la lumière d'un milieu à l'autre, mais en la déviant : c'est la réfraction. À la fin de ce chapitre, tu sauras prédire précisément la déviation d'un rayon lumineux à travers n'importe quelle interface, et comprendre le secret physique derrière les fibres optiques.</p>

    <h3>1. Indice de réfraction absolu</h3>
    <p>L'indice de réfraction absolu $n$ d'un milieu transparent est le rapport de la célérité de la lumière dans le vide $c$ à sa vitesse de propagation $v$ dans ce milieu :</p>
    <p>$$n = \\dfrac{c}{v}$$</p>
    <p>$n$ est une grandeur sans unité, toujours supérieure ou égale à 1 (la lumière ne va jamais plus vite dans la matière que dans le vide). Quelques ordres de grandeur : $n_{\\text{air}}\\approx 1{,}00$, $n_{\\text{eau}}\\approx 1{,}33$, $n_{\\text{verre}}\\approx 1{,}5$ (pour un liquide, typiquement $1{,}3 < n < 1{,}7$). L'indice absolu dépend légèrement de la longueur d'onde de la radiation et de la température — c'est ce qui explique la dispersion de la lumière par un prisme (chapitre suivant).</p>

    <h3>2. Indice de réfraction relatif</h3>
    <p>L'indice relatif d'un milieu 2 par rapport à un milieu 1, noté $n_{2/1}$, est le rapport inverse des célérités dans les deux milieux :</p>
    <p>$$n_{2/1} = \\dfrac{c_1}{c_2} = \\dfrac{n_2}{n_1}$$</p>
    <p>L'indice absolu d'un milieu n'est autre que son indice relatif par rapport au vide.</p>

    <h3>3. Loi de Snell-Descartes pour la réfraction</h3>
    <p>Lorsqu'un rayon lumineux passe d'un milieu d'indice $n_1$ à un milieu d'indice $n_2$, il change en général de direction au passage de l'interface. Au point d'incidence $I$, avec $i_1$ l'angle d'incidence et $i_2$ l'angle de réfraction (tous deux mesurés par rapport à la normale à l'interface) :</p>
    <ol>
      <li>le rayon incident, la normale et le rayon réfracté sont coplanaires (plan d'incidence) ;</li>
      <li>les angles vérifient : $$n_1 \\sin i_1 = n_2 \\sin i_2$$</li>
    </ol>
    <p>Cette relation, la <strong>loi de Snell-Descartes</strong>, gouverne tout dispositif optique réfringent (dioptres, prismes, lentilles). On en tire un comportement qualitatif important :</p>
    <ul>
      <li>si $n_2 > n_1$ (passage vers un milieu plus réfringent), le rayon réfracté se rapproche de la normale ($i_2 < i_1$) ;</li>
      <li>si $n_2 < n_1$ (passage vers un milieu moins réfringent), le rayon réfracté s'éloigne de la normale ($i_2 > i_1$) ;</li>
      <li>en incidence normale ($i_1=0$), le rayon n'est pas dévié, quels que soient $n_1$ et $n_2$.</li>
    </ul>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un poisson observé depuis la berge d'une rivière semble toujours plus proche de la surface qu'il ne l'est réellement. Sachant que $n_{\\text{eau}}>n_{\\text{air}}$ et que la lumière va du poisson (dans l'eau) vers ton œil (dans l'air), utilise le sens de la déviation donné ci-dessus pour expliquer pourquoi cette illusion se produit systématiquement dans ce sens, et jamais dans l'autre.
    </div>

    <h3>4. Angle limite et réflexion totale</h3>
    <p>Lorsque la lumière va d'un milieu plus réfringent vers un milieu moins réfringent ($n_1 > n_2$), l'angle de réfraction $i_2$ croît plus vite que $i_1$. Il existe un <strong>angle d'incidence limite</strong> $i_{\\lim}$ pour lequel le rayon réfracté rase l'interface ($i_2 = 90°$) :</p>
    <p>$$\\sin i_{\\lim} = \\dfrac{n_2}{n_1}$$</p>
    <p>Pour tout angle d'incidence $i_1 > i_{\\lim}$, il n'existe plus de rayon réfracté possible : <strong>toute la lumière est réfléchie</strong> à l'interface, avec un rendement de 100 % — c'est la <strong>réflexion totale</strong>. Ce phénomène, impossible à obtenir avec un miroir métallique classique (toujours légèrement absorbant), est à la base du fonctionnement des fibres optiques, des prismes à réflexion totale (jumelles, appareils photo) et de nombreux instruments d'optique.</p>

    <h3>5. Formule de conjugaison du dioptre plan</h3>
    <p>Dans l'approximation de Gauss (rayons proches de la normale au point $H$ d'incidence, donc peu inclinés), on établit la formule de conjugaison du dioptre plan, avec origine en $H$ (point d'incidence sur le dioptre) pour un objet $A$ dans le milieu d'indice $n_1$ et son image $A'$ dans le milieu d'indice $n_2$ :</p>
    <p>$$\\dfrac{\\overline{HA'}}{n_2} = \\dfrac{\\overline{HA}}{n_1}$$</p>
    <p>Comme $n_1$ et $n_2$ sont des grandeurs positives, $\\overline{HA}$ et $\\overline{HA'}$ sont nécessairement de même signe : l'objet et son image se trouvent toujours du même côté par rapport au dioptre (sur la même normale, du même côté de la surface). Contrairement au miroir plan, cette formule n'est valable que dans l'approximation de Gauss — le dioptre plan n'est que approximativement stigmatique.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      La loi de Snell-Descartes $n_1\\sin i_1 = n_2\\sin i_2$ gouverne toute réfraction. Elle prédit un angle limite $\\sin i_{\\lim}=n_2/n_1$ au-delà duquel apparaît la réflexion totale (utilisée dans les fibres optiques), et conduit, dans l'approximation de Gauss, à la formule de conjugaison $\\overline{HA'}/n_2 = \\overline{HA}/n_1$ du dioptre plan.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Contrairement à un miroir métallique, dont le rendement de réflexion réel plafonne toujours en dessous de 100 % (une fraction de l'énergie lumineuse est absorbée et transformée en chaleur), la réflexion totale offre un rendement rigoureusement parfait de 100 %. Pourquoi la réflexion totale, un phénomène purement géométrique lié à un changement de milieu, échappe-t-elle à toute perte par absorption, contrairement à une réflexion métallique ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>Les câbles de fibre optique sous-marins, qui exploitent la réflexion totale à l'intérieur d'un cœur de verre ultra-pur, transportent aujourd'hui plus de 95 % du trafic Internet intercontinental mondial, reliant les continents à des débits de plusieurs dizaines de térabits par seconde sur un seul câble. La recherche actuelle en photonique explore des fibres à cristal photonique, dont la structure interne, plus complexe qu'un simple dioptre, permet de guider la lumière selon des mécanismes physiques encore plus sophistiqués que la réflexion totale classique.</p>
    <p><strong>Question ouverte :</strong> peut-on repousser encore la capacité de transmission des fibres optiques en exploitant simultanément plusieurs propriétés de la lumière (polarisation, orbite angulaire) dans un même câble, sans interférence mutuelle ? C'est un axe de recherche majeur des télécommunications optiques du XXIe siècle, face à la croissance continue du trafic de données mondial.</p>
    <p><strong>Technologie émergente :</strong> les capteurs à fibre optique, qui exploitent des variations infimes de la réflexion totale ou de la propagation lumineuse pour détecter des déformations, des températures ou des vibrations, sont aujourd'hui utilisés pour surveiller en continu l'état structurel de ponts, de barrages et de pipelines sur de très longues distances.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Interface entre deux milieux (n₁, n₂) → loi de Snell-Descartes $n_1\\sin i_1=n_2\\sin i_2$ → si $n_1>n_2$ : existence d'un angle limite → au-delà : réflexion totale (rendement 100 %)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$n_1 \\sin i_1 = n_2 \\sin i_2$$
      Cette loi, connue de tout lycéen, gouverne à elle seule tout ce que ce chapitre a construit : la déviation d'un rayon à travers n'importe quelle interface, et la condition exacte d'apparition de la réflexion totale qui rend possibles les fibres optiques.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Indice absolu $n=c/v \\ge 1$ ; indice relatif $n_{2/1}=n_2/n_1=c_1/c_2$</li>
        <li>Loi de Snell-Descartes : $n_1\\sin i_1 = n_2\\sin i_2$, avec coplanarité incident/normale/réfracté</li>
        <li>Angle limite $\\sin i_{\\lim}=n_2/n_1$ (défini seulement si $n_1>n_2$) : au-delà, réflexion totale (100 % de la lumière réfléchie)</li>
        <li>Formule de conjugaison du dioptre plan (approximation de Gauss) : $\\overline{HA'}/n_2 = \\overline{HA}/n_1$</li>
        <li>Objet et image d'un dioptre plan sont toujours situés du même côté de la surface, sur la même normale</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Inverser $n_1$ et $n_2$ dans la loi de Snell-Descartes : c'est toujours le milieu d'incidence qui porte l'indice associé à $i_1$</li>
        <li>Chercher un angle limite quand $n_1 < n_2$ : la réflexion totale n'existe que du milieu le plus réfringent vers le moins réfringent</li>
        <li>Oublier que le dioptre plan n'est stigmatique qu'en approximation de Gauss, contrairement au miroir plan</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un rayon passe de l'eau ($n_1=1{,}33$) vers l'air ($n_2=1{,}00$). L'angle limite de réflexion totale vaut environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt3e1" value="wrong"> 90°</label>
          <label class="option"><input type="radio" name="opt3e1" value="right"> 48,8°</label>
          <label class="option"><input type="radio" name="opt3e1" value="wrong"> 33°</label>
          <label class="option"><input type="radio" name="opt3e1" value="wrong"> aucun angle limite n'existe ici</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt3e1','opt3fb1','Correct — sin(i_lim)=n2/n1=1/1,33≈0,75, soit i_lim≈48,8°. C\'est bien de l\'eau (plus réfringente) vers l\'air (moins réfringent), donc l\'angle limite existe.','Utilise sin(i_lim)=n2/n1=1,00/1,33 puis prends l\'arcsinus : le résultat est proche de 49°.')">Vérifier</button>
        <div class="feedback" id="opt3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Lorsqu'un rayon passe d'un milieu moins réfringent vers un milieu plus réfringent ($n_2>n_1$), le rayon réfracté :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt3e2" value="wrong"> s'éloigne de la normale</label>
          <label class="option"><input type="radio" name="opt3e2" value="right"> se rapproche de la normale</label>
          <label class="option"><input type="radio" name="opt3e2" value="wrong"> reste confondu avec le rayon incident</label>
          <label class="option"><input type="radio" name="opt3e2" value="wrong"> subit une réflexion totale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt3e2','opt3fb2','Correct — d\'après n1 sin i1=n2 sin i2, si n2>n1 alors sin i2<sin i1, donc i2<i1 : le rayon se rapproche de la normale.','Repars de n1 sin i1=n2 sin i2 : si n2 est plus grand que n1, l\'angle i2 doit être plus petit que i1 pour équilibrer l\'équation.')">Vérifier</button>
        <div class="feedback" id="opt3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La réflexion totale, exploitée dans les fibres optiques, se produit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt3e3" value="wrong"> pour tout angle d'incidence, quels que soient les milieux</label>
          <label class="option"><input type="radio" name="opt3e3" value="right"> uniquement pour un angle d'incidence supérieur à l'angle limite, du milieu le plus réfringent vers le moins réfringent</label>
          <label class="option"><input type="radio" name="opt3e3" value="wrong"> uniquement en incidence normale</label>
          <label class="option"><input type="radio" name="opt3e3" value="wrong"> uniquement dans le vide</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt3e3','opt3fb3','Correct — la réflexion totale exige i1>i_lim et n1>n2, condition précisément exploitée dans le cœur des fibres optiques.','Relis la section 4 : la réflexion totale n\'existe qu\'au-delà de l\'angle limite, et seulement quand la lumière va vers un milieu moins réfringent.')">Vérifier</button>
        <div class="feedback" id="opt3fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'indice de réfraction de l'air variait fortement avec l'altitude (ce qui est en réalité légèrement le cas) : comment cela affecterait-il la position apparente des étoiles observées depuis le sol ?</li>
        <li>Pourquoi un diamant, dont l'indice de réfraction est très élevé (n≈2,42), scintille-t-il davantage qu'un morceau de verre taillé de la même façon ?</li>
        <li>Quelle serait la conséquence, pour les télécommunications mondiales, d'une limite physique empêchant de réduire encore les pertes de lumière dans les fibres optiques actuelles ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>W. Snell, <em>manuscrits non publiés</em>, 1621 (loi redécouverte et publiée par Descartes en 1637 dans <em>La Dioptrique</em>) — origine historique de la loi de la réfraction.</li>
        <li>E. Hecht, <em>Optics</em>, Pearson — chapitre sur la réfraction et la réflexion totale.</li>
        <li>C. K. Kao, G. A. Hockham, « Dielectric-Fibre Surface Waveguides for Optical Frequencies », Proceedings of the IEE, 1966 (travaux ayant valu à Kao le prix Nobel de physique 2009 pour les fibres optiques).</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu maîtrises désormais la réfraction et son cas limite le plus spectaculaire, la réflexion totale — le principe physique qui relie aujourd'hui les continents par Internet. Le chapitre suivant, « Le prisme optique », va combiner deux dioptres plans pour révéler l'un des phénomènes les plus poétiques de l'optique : la décomposition de la lumière blanche en un arc-en-ciel de couleurs. Comme le disait Descartes dans sa <em>Dioptrique</em> : « Il n'y a rien de plus utile que de bien connaître la nature de la lumière. » Tu viens d'en apprendre l'un des secrets les plus féconds.</p>
  `
};

OPTIQUE_NOVA_KB[optiqueKey('Dioptre plan : réfraction et réflexion totale')] = {
  intro: "Salut, moi c'est Nova ! On passe au dioptre plan : indices de réfraction, loi de Snell-Descartes et réflexion totale. Demande-moi la formule de l'angle limite, la loi de Snell-Descartes, ou la formule de conjugaison du dioptre plan.",
  rules: [
    { test:/indice.*absolu|n\s*=\s*c\/v/i, replies:["L'indice de réfraction absolu est n=c/v, rapport de la célérité dans le vide à la vitesse dans le milieu. Il est sans unité et toujours ≥1."] },
    { test:/indice.*relatif/i, replies:["L'indice relatif n2/1=n2/n1=c1/c2 compare deux milieux entre eux. L'indice absolu d'un milieu est simplement son indice relatif par rapport au vide."] },
    { test:/snell.*descartes|loi.*r[ée]fraction/i, replies:["La loi de Snell-Descartes pour la réfraction s'écrit n1 sin i1 = n2 sin i2, avec coplanarité du rayon incident, de la normale et du rayon réfracté."] },
    { test:/angle limite/i, replies:["L'angle limite vérifie sin(i_lim)=n2/n1, et n'existe que si n1>n2 (milieu incident plus réfringent). Au-delà de cet angle, plus aucun rayon ne peut se réfracter."] },
    { test:/r[ée]flexion totale/i, replies:["La réflexion totale se produit quand l'angle d'incidence dépasse l'angle limite, en allant vers un milieu moins réfringent : 100% de la lumière est alors réfléchie, sans aucune perte par transmission. C'est le principe des fibres optiques."] },
    { test:/conjugaison.*dioptre plan|formule.*dioptre plan/i, replies:["La formule de conjugaison du dioptre plan, dans l'approximation de Gauss, est HA'/n2=HA/n1 : l'objet et l'image sont toujours du même côté de la surface, sur la même normale."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise sin(i_lim)=n2/n1.","Indice niveau 2 : avec n1=1,33 (eau) et n2=1,00 (air), sin(i_lim)=1/1,33≈0,75.","Indice niveau 3 : i_lim≈48,8°."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : repars de n1 sin i1=n2 sin i2.","Indice niveau 2 : si n2>n1, alors sin i2 doit être plus petit que sin i1.","Indice niveau 3 : le rayon se rapproche de la normale."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense aux deux conditions nécessaires à la réflexion totale.","Indice niveau 2 : il faut à la fois dépasser l'angle limite ET aller vers un milieu moins réfringent.","Indice niveau 3 : réponse — au-delà de l'angle limite, du milieu le plus réfringent vers le moins réfringent."] }
  ]
};


/* =========================== CHAPITRE 4 — Le prisme optique =========================== */
OPTIQUE_CHAPTERS[optiqueKey('Le prisme optique')] = {
  objectives: [
    "Définir un prisme optique en termes de dioptres plans et identifier son angle au sommet A",
    "Établir les quatre relations fondamentales du prisme (lois de Snell-Descartes, relation des angles, déviation D)",
    "Analyser les conditions d'émergence d'un rayon à travers un prisme",
    "Expliquer le phénomène de dispersion de la lumière blanche par un prisme",
    "Évaluer pourquoi la dispersion, gênante dans une lentille de caméra, devient au contraire l'effet recherché dans un spectroscope"
  ],
  prereqs: ["Dioptre plan : réfraction et réflexion totale"],
  bodyHtml: `
    <p>En 1666, dans sa chambre à Cambridge assombrie pour l'occasion, Isaac Newton perce un petit trou dans un volet pour laisser entrer un mince rayon de soleil, qu'il fait passer à travers un prisme de verre. Le résultat, projeté sur le mur opposé, stupéfie la communauté scientifique de l'époque : un arc-en-ciel complet apparaît, là où la théorie dominante prédisait que le prisme se contentait de « colorer » une lumière blanche pourtant supposée pure et indivisible. Par une expérience de contrôle décisive — faire repasser une seule couleur isolée à travers un second prisme, sans obtenir de nouvelle décomposition —, Newton prouve que c'est la lumière blanche elle-même qui est composite, et non le prisme qui « ajoute » de la couleur.</p>
    <p>Cette découverte, vieille de plus de trois siècles, reste à la base de la spectroscopie moderne : chaque étoile, chaque nébuleuse, chaque atmosphère planétaire est aujourd'hui analysée en décomposant sa lumière à travers un prisme (ou son équivalent moderne, le réseau de diffraction), révélant sa composition chimique à des années-lumière de distance. Même le simple jeu de lumière d'un lustre en cristal, ou l'arc-en-ciel qui suit un orage d'été, obéissent au même principe physique que celui découvert par Newton dans sa chambre obscure.</p>
    <p>Le prisme est, du point de vue de l'optique géométrique, l'association de deux dioptres plans non parallèles, limitant un milieu transparent d'indice $n$. C'est l'un des instruments les plus anciens de l'optique, historiquement utilisé par Newton pour démontrer que la lumière blanche est composée de plusieurs couleurs. À la fin de ce chapitre, tu sauras calculer précisément la déviation d'un rayon à travers un prisme, et comprendre pourquoi certains rayons ne peuvent tout simplement pas le traverser.</p>

    <h3>1. Géométrie du prisme</h3>
    <p>Un prisme est caractérisé par :</p>
    <ul>
      <li>son <strong>arête</strong>, intersection des deux dioptres plans ;</li>
      <li>sa <strong>section principale</strong>, intersection du prisme par un plan perpendiculaire à l'arête ;</li>
      <li>son <strong>angle au sommet</strong> $A$, angle entre les deux dioptres dans la section principale.</li>
    </ul>
    <p>Un rayon lumineux pénètre par la première face avec un angle d'incidence $i$, se réfracte à l'intérieur du prisme avec un angle $r$, traverse le prisme, puis atteint la seconde face avec un angle d'incidence interne $r'$ et en ressort (émerge) avec un angle $i'$.</p>

    <h3>2. Les quatre relations du prisme</h3>
    <p>En appliquant la loi de Snell-Descartes sur chacun des deux dioptres du prisme (avec, à l'extérieur, l'air d'indice 1, et à l'intérieur, le milieu d'indice $n$), puis la géométrie du triangle formé par les deux normales et l'arête, on obtient le jeu de quatre relations fondamentales, dites <strong>formules du prisme</strong> :</p>
    <table class="mini-table">
      <tr><th>Relation</th><th>Expression</th><th>Origine</th></tr>
      <tr><td>Réfraction à l'entrée</td><td>$\\sin i = n\\sin r$</td><td>Snell-Descartes sur le 1<sup>er</sup> dioptre</td></tr>
      <tr><td>Réfraction à la sortie</td><td>$\\sin i' = n\\sin r'$</td><td>Snell-Descartes sur le 2<sup>e</sup> dioptre</td></tr>
      <tr><td>Relation des angles</td><td>$r + r' = A$</td><td>Géométrie du triangle formé par les deux normales</td></tr>
      <tr><td>Déviation totale</td><td>$D = i + i' - A$</td><td>Somme des déviations sur chaque dioptre</td></tr>
    </table>
    <p>La <strong>déviation</strong> $D$ est l'angle entre la direction du rayon incident et celle du rayon émergent : c'est la grandeur observable qui caractérise, au final, l'effet du prisme sur le trajet lumineux.</p>

    <h3>3. Conditions d'émergence d'un rayon</h3>
    <p>Un rayon qui pénètre dans le prisme n'en ressort pas nécessairement : il peut subir une réflexion totale sur la seconde face si l'angle $r'$ dépasse l'angle limite $\\lambda$ défini par $\\sin\\lambda = 1/n$ (passage du milieu $n$ vers l'air). Deux conditions sont donc nécessaires pour qu'un rayon puisse émerger :</p>
    <ul>
      <li><strong>Condition sur l'angle du prisme</strong> : il faut que $A \\le 2\\lambda$, sinon aucun rayon, quelle que soit son incidence, ne peut ressortir sans subir de réflexion totale ;</li>
      <li><strong>Condition sur l'angle d'incidence</strong> : si $A < 2\\lambda$, seuls les rayons dont l'angle d'incidence $i$ dépasse une valeur minimale $i_{\\min}$ (calculée à partir de $r \\ge A - \\lambda$) peuvent émerger.</li>
    </ul>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Certains prismes utilisés dans les jumelles ou les appareils photo (prismes de Porro, prismes à réflexion totale) sont volontairement conçus avec un angle A supérieur à $2\\lambda$, empêchant délibérément toute émergence directe sur la face concernée. À quoi cela peut-il servir, sachant que ces prismes sont malgré tout traversés par la lumière (via une autre face) et exploitent la réflexion totale plutôt que la transmission ?
    </div>

    <h3>4. Dispersion de la lumière par un prisme</h3>
    <p>L'indice de réfraction $n$ d'un milieu transparent dépend légèrement de la longueur d'onde de la lumière (dispersion chromatique) : un verre est généralement plus réfringent pour le bleu que pour le rouge. Or, la déviation $D=i+i'-A$ dépend de $n$. Il en résulte que, pour un faisceau de lumière blanche (polychromatique), chaque couleur est déviée d'un angle légèrement différent : le bleu est plus dévié que le jaune, lui-même plus dévié que le rouge. Le faisceau incident, initialement blanc, ressort du prisme <strong>décomposé en un spectre continu de couleurs</strong> — c'est le principe de la spectroscopie par prisme, historiquement démontré par Newton.</p>

    <h3>5. Déviation minimale (cas des petits angles)</h3>
    <p>Dans le cas d'un prisme à faible angle $A$ traversé par des rayons peu inclinés (petits angles), on peut linéariser les sinus ($\\sin\\theta \\approx \\theta$) dans les relations de Snell-Descartes, ce qui donne, en combinant les quatre relations du prisme :</p>
    <p>$$D \\approx (n-1)A$$</p>
    <p>Cette approximation, valable pour un prisme mince, montre que la déviation croît directement avec l'angle du prisme et avec l'écart de l'indice à 1 — c'est-à-dire avec le pouvoir réfringent du matériau utilisé.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Le prisme obéit aux quatre relations $\\sin i=n\\sin r$, $\\sin i'=n\\sin r'$, $r+r'=A$ et $D=i+i'-A$. La dépendance de $n$ envers la longueur d'onde fait que $D$ varie avec la couleur : c'est le mécanisme de la dispersion, qui décompose la lumière blanche en un spectre continu.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La dispersion chromatique, si spectaculaire et utile dans un spectroscope, est au contraire un défaut gênant dans un objectif de caméra classique (elle crée des franges colorées parasites, l'aberration chromatique). Comment les fabricants d'objectifs photo corrigent-ils ce défaut, sachant qu'ils ne peuvent pas simplement supprimer la dépendance de n envers la longueur d'onde, propriété intrinsèque du verre ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La spectroscopie par prisme, héritière directe de l'expérience de Newton, reste aujourd'hui un outil scientifique de première importance : c'est en analysant le spectre de la lumière d'étoiles lointaines que les astronomes ont pu, en 1995, détecter la première exoplanète autour d'une étoile de type solaire (51 Pegasi b), une découverte récompensée par le prix Nobel de physique 2019. Les prismes modernes de haute précision, souvent combinés à des réseaux de diffraction, permettent aujourd'hui d'analyser des raies spectrales avec une résolution suffisante pour mesurer la composition chimique et même la vitesse de rotation d'étoiles situées à des centaines d'années-lumière.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des prismes ou des systèmes dispersifs suffisamment compacts et précis pour équiper des spectromètres portables, capables d'analyser en temps réel la composition chimique d'un échantillon sur le terrain (agriculture, environnement, médecine) ? C'est un axe de recherche actif en instrumentation optique miniaturisée.</p>
    <p><strong>Technologie émergente :</strong> les spectromètres sur puce, intégrant des fonctions dispersives directement dans des circuits photoniques miniaturisés, cherchent à remplacer les prismes massifs traditionnels par des composants de la taille d'un grain de riz, ouvrant la voie à des capteurs chimiques embarqués dans les smartphones.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Rayon incident → réfraction à l'entrée ($\\sin i=n\\sin r$) → traversée du prisme ($r+r'=A$) → réfraction à la sortie ($\\sin i'=n\\sin r'$) → déviation totale $D=i+i'-A$ → dispersion selon la couleur (n dépend de λ)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$D = i + i' - A$$
      Cette formule de la déviation, combinée à la dépendance de l'indice n envers la longueur d'onde, explique à elle seule pourquoi un simple morceau de verre taillé en triangle peut décomposer la lumière du Soleil en un arc-en-ciel complet — l'une des expériences les plus élégantes de toute l'histoire de la physique.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un prisme est l'association de deux dioptres plans non parallèles, d'angle au sommet $A$</li>
        <li>Formules du prisme : $\\sin i=n\\sin r$ ; $\\sin i'=n\\sin r'$ ; $r+r'=A$ ; $D=i+i'-A$</li>
        <li>Un rayon ne peut émerger que si $A\\le 2\\lambda$ (avec $\\sin\\lambda=1/n$) et si son incidence est suffisante</li>
        <li>La dispersion vient de la dépendance de $n$ envers la longueur d'onde : le bleu est plus dévié que le rouge</li>
        <li>Pour un prisme mince aux petits angles : $D\\approx(n-1)A$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier la relation géométrique $r+r'=A$, indispensable pour relier les deux réfractions</li>
        <li>Croire que la déviation D ne dépend que de l'angle d'incidence i, alors qu'elle dépend aussi de n (donc de la couleur)</li>
        <li>Confondre l'angle du prisme A avec l'angle de déviation D : ce sont deux grandeurs bien distinctes</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans un prisme, la relation entre l'angle au sommet A et les angles de réfraction internes r et r' est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt4e1" value="wrong"> $r - r' = A$</label>
          <label class="option"><input type="radio" name="opt4e1" value="right"> $r + r' = A$</label>
          <label class="option"><input type="radio" name="opt4e1" value="wrong"> $r \\times r' = A$</label>
          <label class="option"><input type="radio" name="opt4e1" value="wrong"> $2r = A$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt4e1','opt4fb1','Correct — la géométrie du triangle formé par les deux normales aux dioptres donne r+r\'=A.','Relis la section 2 : la relation géométrique liant les deux angles de réfraction internes à l\'angle du prisme est une somme, r+r\'=A.')">Vérifier</button>
        <div class="feedback" id="opt4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La dispersion de la lumière blanche par un prisme s'explique par le fait que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt4e2" value="wrong"> l'angle A du prisme change avec la couleur</label>
          <label class="option"><input type="radio" name="opt4e2" value="right"> l'indice n du prisme dépend de la longueur d'onde</label>
          <label class="option"><input type="radio" name="opt4e2" value="wrong"> seule la lumière rouge est réfractée</label>
          <label class="option"><input type="radio" name="opt4e2" value="wrong"> le prisme absorbe certaines couleurs</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt4e2','opt4fb2','Correct — c\'est la dépendance de n envers λ qui fait que chaque couleur est déviée différemment : le bleu plus que le rouge.','Reviens à la section 4 : c\'est une propriété du matériau, l\'indice n, qui varie légèrement avec la longueur d\'onde, et non l\'angle géométrique du prisme.')">Vérifier</button>
        <div class="feedback" id="opt4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour un prisme mince aux petits angles, la déviation D est approximativement donnée par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt4e3" value="wrong"> $D \\approx nA$</label>
          <label class="option"><input type="radio" name="opt4e3" value="right"> $D \\approx (n-1)A$</label>
          <label class="option"><input type="radio" name="opt4e3" value="wrong"> $D \\approx A/n$</label>
          <label class="option"><input type="radio" name="opt4e3" value="wrong"> $D \\approx A^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt4e3','opt4fb3','Correct — D≈(n-1)A dans l\'approximation des petits angles, un résultat obtenu en linéarisant les quatre relations du prisme.','Relis la section 5 : dans l\'approximation des petits angles, la déviation dépend du produit de l\'angle du prisme par l\'écart de l\'indice à 1.')">Vérifier</button>
        <div class="feedback" id="opt4fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si tous les matériaux transparents avaient exactement le même indice de réfraction, sans dispersion aucune : les prismes, les arcs-en-ciel et la spectroscopie existeraient-ils encore ?</li>
        <li>Pourquoi Newton a-t-il eu besoin d'une expérience de contrôle (repasser une couleur isolée à travers un second prisme) pour convaincre ses contemporains, plutôt que de se contenter de l'observation initiale du spectre ?</li>
        <li>Quelle serait la conséquence, pour l'astronomie, si l'on ne disposait d'aucun moyen de décomposer la lumière des étoiles en un spectre analysable ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>I. Newton, <em>Opticks: or, A Treatise of the Reflexions, Refractions, Inflexions and Colours of Light</em>, 1704 — l'exposé complet des expériences de Newton sur le prisme et la dispersion.</li>
        <li>E. Hecht, <em>Optics</em>, Pearson — chapitre sur le prisme et la dispersion chromatique.</li>
        <li>M. Mayor, D. Queloz, « A Jupiter-Mass Companion to a Solar-Type Star », Nature, 1995 (travaux ayant valu le prix Nobel de physique 2019 pour la première détection d'exoplanète par spectroscopie).</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu viens de refaire, à ta façon, l'expérience qui a révolutionné notre compréhension de la lumière blanche. Le chapitre suivant, « Miroir sphérique », va quitter les surfaces planes pour explorer un système courbe, aux propriétés bien plus riches — et bien plus utiles en astronomie, comme tu le découvriras. Comme le disait Newton lui-même, avec l'humilité propre aux plus grands esprits : « Je ne sais pas ce que je puis paraître au monde, mais à moi-même, je semble n'avoir été qu'un enfant jouant sur le rivage... tandis que le grand océan de la vérité s'étendait, inexploré, devant moi. » Le spectre de couleurs qu'il a découvert n'était qu'un grain de sable de cet océan.</p>
  `
};

OPTIQUE_NOVA_KB[optiqueKey('Le prisme optique')] = {
  intro: "Salut, moi c'est Nova ! On étudie le prisme : ses quatre relations fondamentales, les conditions d'émergence et la dispersion de la lumière. Demande-moi les formules du prisme, la condition d'émergence, ou pourquoi un prisme sépare les couleurs.",
  rules: [
    { test:/formules du prisme|quatre relations|sin.*i.*n.*sin.*r/i, replies:["Les quatre relations du prisme sont : sin i = n sin r, sin i' = n sin r', r+r'=A, et D=i+i'-A."] },
    { test:/d[ée]viation/i, replies:["La déviation D est l'angle entre le rayon incident et le rayon émergent : D=i+i'-A. Pour un prisme mince aux petits angles, elle se simplifie en D≈(n-1)A."] },
    { test:/dispersion/i, replies:["La dispersion vient du fait que l'indice n du prisme dépend de la longueur d'onde : chaque couleur est donc déviée différemment, le bleu plus que le rouge, ce qui sépare la lumière blanche en un spectre continu."] },
    { test:/[ée]mergence|angle limite.*prisme/i, replies:["Pour qu'un rayon émerge du prisme, il faut d'abord que l'angle A du prisme ne dépasse pas 2λ (avec sinλ=1/n), puis que l'angle d'incidence i soit suffisant pour éviter la réflexion totale sur la seconde face."] },
    { test:/arete|section principale|angle.*sommet/i, replies:["Le prisme est caractérisé par son arête (intersection des deux dioptres), sa section principale (coupe perpendiculaire à l'arête) et son angle au sommet A, mesuré dans cette section principale."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la géométrie du triangle formé par les deux normales du prisme.","Indice niveau 2 : c'est une relation de somme, pas de différence ni de produit.","Indice niveau 3 : r+r'=A."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : la dispersion est une propriété du matériau, pas de la géométrie du prisme.","Indice niveau 2 : c'est une grandeur physique qui varie légèrement selon la couleur de la lumière.","Indice niveau 3 : l'indice de réfraction n dépend de la longueur d'onde."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : linéarise les quatre relations du prisme aux petits angles.","Indice niveau 2 : le résultat fait intervenir l'écart de n à 1, pas n seul.","Indice niveau 3 : D≈(n-1)A."] }
  ]
};


/* =========================== CHAPITRE 5 — Miroir sphérique =========================== */
OPTIQUE_CHAPTERS[optiqueKey('Miroir sphérique')] = {
  objectives: [
    "Définir un miroir sphérique (concave/convexe) et ses points particuliers : centre, sommet, foyer",
    "Établir la relation de conjugaison et le grandissement d'un miroir sphérique dans les conditions de Gauss",
    "Construire géométriquement l'image d'un objet à l'aide des rayons particuliers",
    "Déterminer la nature (réelle/virtuelle) de l'image selon la position de l'objet",
    "Évaluer pourquoi le même miroir concave peut servir aussi bien de miroir grossissant de salle de bains que de miroir principal de télescope, selon la seule position de l'objet"
  ],
  prereqs: ["Le prisme optique"],
  bodyHtml: `
    <p>En 1668, alors âgé d'à peine 26 ans, Isaac Newton construit de ses propres mains le premier télescope réflecteur pratique de l'histoire, tenant tout entier dans la paume d'une main mais rivalisant en performance avec des lunettes réfractrices six fois plus longues. Son astuce de génie : remplacer les lentilles en verre — coûteuses, difficiles à polir sans défaut, et sujettes à l'aberration chromatique du chapitre précédent — par un simple miroir concave, insensible à la dispersion des couleurs puisqu'il ne repose que sur la réflexion, jamais sur la réfraction.</p>
    <p>Cette invention a traversé les siècles presque sans changer de principe : le télescope spatial Hubble, lancé en 1990, et son successeur James Webb, utilisent tous deux des miroirs concaves géants pour capter la lumière d'objets si lointains qu'elle a voyagé pendant des milliards d'années avant de nous atteindre. À l'autre bout de l'échelle, ce même principe de miroir concave équipe aussi les modestes miroirs grossissants de salle de bains, les projecteurs de phares automobiles, et les fours solaires qui concentrent la lumière du Soleil jusqu'à atteindre des températures de plusieurs milliers de degrés.</p>
    <p>Un miroir sphérique est une calotte de sphère réfléchissante. Contrairement au miroir plan, il n'est stigmatique que de façon approchée, dans les conditions de Gauss vues au chapitre 1 — mais il permet, en contrepartie, de <strong>concentrer ou disperser</strong> la lumière, ce qui en fait un composant essentiel des télescopes, phares et projecteurs. À la fin de ce chapitre, tu sauras déterminer précisément la position, la nature et la taille de l'image formée par n'importe quel miroir sphérique, qu'il soit concave ou convexe.</p>

    <h3>1. Définition et vocabulaire</h3>
    <p>Un miroir sphérique est caractérisé par :</p>
    <table class="mini-table">
      <tr><th>Élément</th><th>Définition</th></tr>
      <tr><td>Centre $C$</td><td>Centre de la sphère dont le miroir est une portion</td></tr>
      <tr><td>Sommet $S$</td><td>Pôle du miroir, point d'intersection avec l'axe optique</td></tr>
      <tr><td>Axe optique</td><td>Droite $(SC)$, axe de symétrie du système</td></tr>
      <tr><td>Rayon de courbure $R$</td><td>Distance $\\overline{SC}$ (algébrique)</td></tr>
    </table>
    <p>On distingue deux types de miroirs sphériques :</p>
    <ul>
      <li><strong>Miroir concave (convergent)</strong> : la surface réfléchissante est tournée vers le centre de courbure ; il concentre les rayons parallèles à l'axe en un point réel ;</li>
      <li><strong>Miroir convexe (divergent)</strong> : la surface réfléchissante est tournée à l'opposé du centre de courbure ; il disperse les rayons parallèles à l'axe, qui semblent provenir d'un point virtuel.</li>
    </ul>

    <h3>2. Foyer principal</h3>
    <p>Dans le cas d'un miroir concave, tous les rayons incidents parallèles à l'axe optique convergent, après réflexion, en un même point $F$ appelé <strong>foyer principal image</strong>. Pour un miroir convexe, ce sont les prolongements des rayons réfléchis qui semblent provenir d'un foyer $F$ virtuel. On montre que $F$ est le milieu du segment $[SC]$ :</p>
    <p>$$\\overline{SF} = \\dfrac{\\overline{SC}}{2}$$</p>
    <p>La <strong>vergence</strong> du miroir, qui mesure son pouvoir de convergence, est définie par $V = 1/\\overline{SF}$ et s'exprime en dioptries ($\\delta$, ou m<sup>-1</sup>) ; on oriente l'axe optique dans le sens de propagation de la lumière incidente.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Contrairement à une lentille (que tu découvriras au chapitre 7), un miroir sphérique concentre parfaitement toutes les longueurs d'onde de la lumière blanche exactement au même foyer, sans aucune dispersion chromatique. Pourquoi la réflexion, contrairement à la réfraction du chapitre précédent, est-elle totalement insensible à la couleur de la lumière ?
    </div>

    <h3>3. Relation de conjugaison (origine au sommet)</h3>
    <p>Pour un point-objet $A$ sur l'axe optique et son image $A'$, dans les conditions de Gauss, la relation de conjugaison du miroir sphérique avec origine au sommet $S$ s'écrit :</p>
    <p>$$\\dfrac{1}{\\overline{SA'}} + \\dfrac{1}{\\overline{SA}} = \\dfrac{2}{\\overline{SC}}$$</p>
    <p>Cette relation, obtenue en appliquant la loi de la réflexion à un rayon quelconque puis en linéarisant dans l'approximation de Gauss (confusion angle/tangente), est l'analogue du théorème des miroirs pour la géométrie sphérique.</p>

    <h3>4. Grandissement</h3>
    <p>Pour un objet $AB$ perpendiculaire à l'axe et son image $A'B'$, le grandissement algébrique est défini, comme toujours, par le rapport des tailles :</p>
    <p>$$\\gamma = \\dfrac{\\overline{A'B'}}{\\overline{AB}}$$</p>
    <p>Le théorème de Thalès, appliqué au triangle formé par l'objet, l'image et le centre $C$, donne l'expression du grandissement en fonction des positions :</p>
    <p>$$\\gamma = -\\dfrac{\\overline{SA'}}{\\overline{SA}}$$</p>
    <p>Comme pour tous les systèmes à venir : $\\gamma>0$ signifie une image droite, $\\gamma<0$ une image renversée ; $|\\gamma|>1$ une image agrandie, $|\\gamma|<1$ une image réduite.</p>

    <h3>5. Construction géométrique de l'image</h3>
    <p>Dans les conditions de Gauss, on construit l'image d'un point $B$ hors axe à l'aide de deux rayons particuliers parmi les trois suivants :</p>
    <ul>
      <li>un rayon parallèle à l'axe optique, réfléchi en passant par le foyer $F$ ;</li>
      <li>un rayon passant par le foyer $F$ (ou dirigé vers lui pour un convexe), réfléchi parallèlement à l'axe ;</li>
      <li>un rayon passant par le centre $C$, qui n'est pas dévié (il frappe le miroir perpendiculairement à sa surface).</li>
    </ul>

    <h3>6. Espaces objet/image, réel/virtuel</h3>
    <p>L'espace autour du miroir se divise en quatre zones, selon que l'objet ou l'image se trouve : devant le miroir (dans le sens d'où vient la lumière) ou derrière lui. Selon la position de l'objet réel par rapport à $F$ et $C$, on obtient des configurations variées :</p>
    <table class="mini-table">
      <tr><th>Miroir</th><th>Position de l'objet réel</th><th>Nature et sens de l'image</th></tr>
      <tr><td>Concave</td><td>Au-delà de $C$</td><td>Réelle, renversée, réduite (entre $F$ et $C$)</td></tr>
      <tr><td>Concave</td><td>Entre $F$ et $C$</td><td>Réelle, renversée, agrandie (au-delà de $C$)</td></tr>
      <tr><td>Concave</td><td>Entre $S$ et $F$</td><td>Virtuelle, droite, agrandie (derrière le miroir)</td></tr>
      <tr><td>Convexe</td><td>Quelle que soit sa position (objet réel)</td><td>Toujours virtuelle, droite, réduite, entre $S$ et $F$</td></tr>
    </table>
    <p>Le miroir concave peut donc, selon la position de l'objet, donner une image réelle ou virtuelle — c'est le principe des miroirs de rasage ou de maquillage grossissants (objet entre $S$ et $F$) aussi bien que des télescopes (objet à l'infini, au-delà de $C$).</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Le miroir sphérique obéit, dans les conditions de Gauss, à $1/\\overline{SA'}+1/\\overline{SA}=2/\\overline{SC}$ et $\\gamma=-\\overline{SA'}/\\overline{SA}$, avec un foyer au milieu de $[SC]$. Concave (convergent), il peut donner une image réelle ou virtuelle selon la position de l'objet ; convexe (divergent), il ne donne jamais qu'une image virtuelle, droite et réduite.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un même miroir concave donne une image virtuelle et agrandie (miroir de rasage) si l'objet est proche, entre S et F, mais une image réelle et renversée (télescope) si l'objet est très éloigné, au-delà de C. Sachant que la position de l'objet est la seule variable qui change entre ces deux usages, quel rôle joue précisément le foyer F comme frontière entre ces deux comportements radicalement différents ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>Le télescope spatial James Webb pousse cette technologie à son extrême : son miroir primaire segmenté de 6,5 mètres de diamètre, le plus grand jamais envoyé dans l'espace, est ajusté avec une précision de quelques nanomètres pour rester rigoureusement dans les conditions de Gauss malgré sa taille immense — une prouesse d'ingénierie qui repose sur les mêmes formules de conjugaison que celles de ce chapitre. À l'autre extrême de l'échelle, les fours solaires à concentration (comme celui d'Odeillo dans les Pyrénées) utilisent des centaines de miroirs concaves pour atteindre des températures dépassant 3000°C, exploitées pour la recherche en science des matériaux.</p>
    <p><strong>Question ouverte :</strong> peut-on fabriquer des miroirs sphériques de très grande taille (plusieurs dizaines de mètres) tout en conservant une précision de surface suffisante pour rester dans les conditions de Gauss ? C'est un défi technologique majeur pour les futurs télescopes géants au sol (comme l'Extremely Large Telescope), dont le miroir principal sera constitué de près de 800 segments individuellement ajustés.</p>
    <p><strong>Technologie émergente :</strong> les miroirs déformables adaptatifs, capables de corriger en temps réel les turbulences atmosphériques en modifiant légèrement leur courbure des milliers de fois par seconde, équipent aujourd'hui les plus grands télescopes terrestres pour obtenir une netteté d'image comparable à celle obtenue depuis l'espace.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Miroir sphérique (concave/convexe) → foyer $\\overline{SF}=\\overline{SC}/2$ → relation de conjugaison $1/\\overline{SA'}+1/\\overline{SA}=2/\\overline{SC}$ → grandissement $\\gamma=-\\overline{SA'}/\\overline{SA}$ → nature de l'image selon la position de l'objet
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\frac{1}{\\overline{SA'}} + \\frac{1}{\\overline{SA}} = \\frac{2}{\\overline{SC}}$$
      Cette relation de conjugaison, valable dans les conditions de Gauss, résume à elle seule tout le pouvoir formateur d'image du miroir sphérique — du simple miroir de salle de bains jusqu'au miroir primaire des plus grands télescopes au monde.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Foyer au milieu de $[SC]$ : $\\overline{SF}=\\overline{SC}/2$ ; vergence $V=1/\\overline{SF}$</li>
        <li>Relation de conjugaison (origine au sommet) : $1/\\overline{SA'}+1/\\overline{SA}=2/\\overline{SC}$</li>
        <li>Grandissement : $\\gamma=-\\overline{SA'}/\\overline{SA}$</li>
        <li>3 rayons particuliers pour construire l'image : parallèle à l'axe → passe par F ; passe par F → ressort parallèle ; passe par C → non dévié</li>
        <li>Miroir concave : image réelle si l'objet est au-delà de F, virtuelle si l'objet est entre S et F ; miroir convexe : toujours virtuelle, droite, réduite</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le signe négatif dans la formule du grandissement $\\gamma=-\\overline{SA'}/\\overline{SA}$</li>
        <li>Confondre miroir concave et convexe : c'est la face réfléchissante, tournée ou non vers le centre de courbure, qui définit le type</li>
        <li>Appliquer la relation de conjugaison hors des conditions de Gauss (rayons trop inclinés ou trop excentrés) : elle devient alors imprécise</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un miroir concave a un rayon de courbure $\\overline{SC}=-40$ cm. Sa distance focale $\\overline{SF}$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt5e1" value="wrong"> -40 cm</label>
          <label class="option"><input type="radio" name="opt5e1" value="right"> -20 cm</label>
          <label class="option"><input type="radio" name="opt5e1" value="wrong"> -80 cm</label>
          <label class="option"><input type="radio" name="opt5e1" value="wrong"> +20 cm</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt5e1','opt5fb1','Correct — SF=SC/2=-40/2=-20 cm : le foyer est bien au milieu du segment [SC].','Utilise SF=SC/2 directement avec la valeur algébrique donnée.')">Vérifier</button>
        <div class="feedback" id="opt5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un miroir convexe, pour un objet réel, donne toujours une image :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt5e2" value="wrong"> réelle et renversée</label>
          <label class="option"><input type="radio" name="opt5e2" value="right"> virtuelle, droite et réduite</label>
          <label class="option"><input type="radio" name="opt5e2" value="wrong"> réelle et agrandie</label>
          <label class="option"><input type="radio" name="opt5e2" value="wrong"> confondue avec l'objet</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt5e2','opt5fb2','Correct — le miroir convexe (divergent) ne peut jamais concentrer réellement les rayons issus d\'un objet réel : l\'image est toujours virtuelle, droite et réduite.','Reviens au tableau de la section 6 : contrairement au miroir concave, le miroir convexe ne donne qu\'un seul type d\'image pour un objet réel.')">Vérifier</button>
        <div class="feedback" id="opt5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Parmi les trois rayons particuliers utilisés pour construire une image dans un miroir sphérique, celui qui passe par le centre C :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt5e3" value="wrong"> ressort parallèle à l'axe optique</label>
          <label class="option"><input type="radio" name="opt5e3" value="wrong"> passe par le foyer F après réflexion</label>
          <label class="option"><input type="radio" name="opt5e3" value="right"> n'est pas dévié par le miroir</label>
          <label class="option"><input type="radio" name="opt5e3" value="wrong"> disparaît par réflexion totale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt5e3','opt5fb3','Correct — un rayon passant par C arrive perpendiculairement à la surface du miroir, il repart donc exactement sur lui-même : il n\'est pas dévié.','Relis la section 5 : le rayon passant par le centre C a une propriété particulière liée à la perpendicularité avec la surface du miroir en ce point.')">Vérifier</button>
        <div class="feedback" id="opt5fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si un miroir sphérique pouvait rester rigoureusement stigmatique même hors des conditions de Gauss (comme le fait, par exemple, un miroir parabolique pour les rayons parallèles à l'axe) : quels avantages cela offrirait-il pour la construction de télescopes ?</li>
        <li>Pourquoi Newton a-t-il préféré un miroir à une lentille pour son télescope, alors que les lunettes réfractrices existaient déjà depuis plusieurs décennies à son époque ?</li>
        <li>Quelle serait la conséquence, pour l'astronomie moderne, d'une limite technologique empêchant de fabriquer des miroirs de plus de deux mètres de diamètre ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>I. Newton, <em>Opticks</em>, 1704 — description du premier télescope réflecteur pratique de l'histoire.</li>
        <li>E. Hecht, <em>Optics</em>, Pearson — chapitre sur les miroirs sphériques et leur formule de conjugaison.</li>
        <li>NASA, « Hubble Space Telescope: Optical Telescope Assembly », rapports techniques de mission, 1990 et mises à jour ultérieures.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu maîtrises désormais le système optique qui a permis à Newton de révolutionner l'astronomie observationnelle, et qui équipe encore aujourd'hui les plus grands télescopes au monde. Le chapitre suivant, « Dioptre sphérique », va appliquer une démarche similaire à une surface courbe qui, cette fois, réfracte plutôt qu'elle ne réfléchit — l'étape indispensable avant d'aborder les lentilles au chapitre 7. Comme le disait Newton à propos de son invention : « J'ai fait un petit instrument perspectif qui, par réflexion, produit les effets attribués à la lunette, mais avec de grands avantages sur elle. » L'histoire lui a, une fois de plus, donné entièrement raison.</p>
  `
};

OPTIQUE_NOVA_KB[optiqueKey('Miroir sphérique')] = {
  intro: "Salut, moi c'est Nova ! On étudie le miroir sphérique : concave/convexe, foyer, relation de conjugaison et grandissement. Demande-moi la formule de conjugaison, le grandissement, ou la position du foyer.",
  rules: [
    { test:/foyer/i, replies:["Le foyer F d'un miroir sphérique est au milieu du segment [SC] : SF=SC/2. Pour un miroir concave, c'est un foyer réel ; pour un convexe, un foyer virtuel."] },
    { test:/conjugaison/i, replies:["La relation de conjugaison du miroir sphérique, avec origine au sommet S, est 1/SA' + 1/SA = 2/SC, valable dans les conditions de Gauss."] },
    { test:/grandissement/i, replies:["Le grandissement du miroir sphérique est γ=-SA'/SA. Un signe négatif donne une image renversée, positif une image droite."] },
    { test:/concave|convexe/i, replies:["Un miroir concave (convergent) a sa surface réfléchissante tournée vers le centre de courbure : il concentre les rayons. Un miroir convexe (divergent) a sa surface tournée à l'opposé : il disperse les rayons."] },
    { test:/vergence/i, replies:["La vergence d'un miroir sphérique est V=1/SF, exprimée en dioptries (m⁻¹) : elle mesure le pouvoir de convergence (ou de divergence) du miroir."] },
    { test:/rayons particuliers|construction.*image/i, replies:["Trois rayons particuliers : celui parallèle à l'axe ressort en passant par F ; celui passant par F ressort parallèle à l'axe ; celui passant par C n'est pas dévié (il frappe le miroir perpendiculairement)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise SF=SC/2.","Indice niveau 2 : divise simplement la valeur algébrique de SC par 2.","Indice niveau 3 : SF=-20 cm."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à ce qu'un miroir divergent peut faire avec des rayons réels.","Indice niveau 2 : il ne peut jamais faire converger réellement les rayons.","Indice niveau 3 : image virtuelle, droite et réduite, toujours."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à l'angle d'incidence d'un rayon qui vise le centre C.","Indice niveau 2 : cet angle d'incidence est nul par rapport à la normale au miroir.","Indice niveau 3 : le rayon n'est pas dévié."] }
  ]
};


/* =========================== CHAPITRE 6 — Dioptre sphérique =========================== */
OPTIQUE_CHAPTERS[optiqueKey('Dioptre sphérique')] = {
  objectives: [
    "Définir un dioptre sphérique et ses éléments caractéristiques (centre, sommet, foyers)",
    "Établir les relations de conjugaison du dioptre sphérique (origine au centre, au sommet, aux foyers)",
    "Distinguer dioptre convergent et dioptre divergent, et calculer sa vergence",
    "Construire géométriquement l'image d'un objet à travers un dioptre sphérique",
    "Analyser pourquoi la cornée de l'œil humain, modélisable par un simple dioptre sphérique, assure à elle seule près des deux tiers du pouvoir de focalisation total de l'œil"
  ],
  prereqs: ["Miroir sphérique"],
  bodyHtml: `
    <p>Chaque être humain porte, en permanence et sans même y penser, deux dioptres sphériques d'une précision remarquable : les cornées de ses propres yeux. Cette fine membrane transparente, à peine plus épaisse qu'une feuille de papier, réalise à elle seule près des deux tiers de la focalisation totale de l'image sur la rétine — le cristallin, souvent perçu à tort comme le principal élément focalisateur de l'œil, ne fait qu'ajuster finement cette mise au point grossière déjà assurée par la courbure de la cornée.</p>
    <p>Ce même principe géométrique, une fois maîtrisé, ouvre la porte à la conception de tout instrument optique moderne : chaque lentille de microscope, chaque objectif d'appareil photo, chaque paire de lunettes correctrices n'est, au fond, qu'un empilement savant de plusieurs dioptres sphériques successifs, choisis et taillés pour compenser mutuellement leurs défauts respectifs. Comprendre un seul dioptre sphérique, c'est donc déjà comprendre la brique élémentaire de toute l'optique instrumentale.</p>
    <p>Le dioptre sphérique généralise le dioptre plan du chapitre 3 : au lieu d'une surface plane, la surface de séparation entre les deux milieux d'indices $n_1$ et $n_2$ est une calotte sphérique. C'est l'élément de base de toute lentille (chapitre suivant), et un modèle simplifié de la cornée de l'œil. À la fin de ce chapitre, tu sauras manipuler ses relations de conjugaison sous toutes leurs formes, et comprendre pourquoi ses deux foyers, contrairement à ceux du miroir, ne coïncident jamais.</p>

    <h3>1. Définition et éléments caractéristiques</h3>
    <table class="mini-table">
      <tr><th>Élément</th><th>Définition</th></tr>
      <tr><td>Centre $C$</td><td>Centre de la sphère support du dioptre</td></tr>
      <tr><td>Sommet $S$</td><td>Point d'intersection du dioptre avec l'axe optique</td></tr>
      <tr><td>Rayon $\\overline{SC}$</td><td>Rayon de courbure algébrique du dioptre</td></tr>
    </table>
    <p>Le milieu d'indice $n_1$ est celui d'où provient la lumière (espace objet), le milieu d'indice $n_2$ celui vers lequel elle se propage après réfraction (espace image). Comme pour le miroir, l'étude se fait dans les conditions de Gauss, ce qui garantit un stigmatisme et un aplanétisme approchés.</p>

    <h3>2. Relation de conjugaison (origine au sommet)</h3>
    <p>En appliquant la loi de Snell-Descartes à un rayon quelconque issu d'un point $A$ de l'axe, linéarisée dans l'approximation de Gauss, on établit la relation de conjugaison du dioptre sphérique avec origine au sommet $S$ :</p>
    <p>$$\\dfrac{n_2}{\\overline{SA'}} - \\dfrac{n_1}{\\overline{SA}} = \\dfrac{n_2-n_1}{\\overline{SC}} = V$$</p>
    <p>où $V$ est la <strong>vergence</strong> du dioptre, exprimée en dioptries ($\\delta$, ou m<sup>-1</sup>). Un dioptre est dit <strong>convergent</strong> si $V>0$ (le centre de courbure $C$ est du côté de la lumière incidente, côté image) et <strong>divergent</strong> si $V<0$.</p>

    <h3>3. Les deux foyers</h3>
    <p>Comme tout système centré, le dioptre sphérique possède deux foyers principaux :</p>
    <table class="mini-table">
      <tr><th>Foyer</th><th>Définition</th></tr>
      <tr><td>Foyer objet $F$</td><td>Point de l'axe dont l'image, par le dioptre, se forme à l'infini</td></tr>
      <tr><td>Foyer image $F'$</td><td>Image d'un point objet situé à l'infini sur l'axe</td></tr>
    </table>
    <p>Contrairement au miroir sphérique, où $F=F'$, les deux foyers d'un dioptre sont en général <strong>distincts</strong> et non symétriques par rapport au sommet, car les milieux de part et d'autre ont des indices différents. On établit les distances focales :</p>
    <p>$$\\overline{SF} = -\\dfrac{n_1}{V}, \\qquad \\overline{SF'} = \\dfrac{n_2}{V}$$</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Pour un miroir, un seul et même point F joue le rôle de foyer objet et de foyer image. Pour un dioptre, ces deux rôles se séparent en deux points distincts F et F'. Quelle différence physique fondamentale entre réflexion (un seul milieu, un seul indice) et réfraction (deux milieux, deux indices) explique cette dissymétrie ?
    </div>

    <h3>4. Relation de conjugaison avec origine au centre, et avec origine aux foyers</h3>
    <p>Selon l'origine choisie sur l'axe, on dispose de plusieurs formes équivalentes de la relation de conjugaison :</p>
    <table class="mini-table">
      <tr><th>Origine</th><th>Relation</th></tr>
      <tr><td>Centre $C$</td><td>$\\dfrac{n_1}{\\overline{CA}} = \\dfrac{n_2}{\\overline{CA'}}$</td></tr>
      <tr><td>Sommet $S$</td><td>$\\dfrac{n_2}{\\overline{SA'}} - \\dfrac{n_1}{\\overline{SA}} = \\dfrac{n_2-n_1}{\\overline{SC}}$</td></tr>
      <tr><td>Foyers $F,F'$</td><td>$\\overline{FA}\\cdot\\overline{F'A'} = \\overline{SF}\\cdot\\overline{SF'}$</td></tr>
    </table>
    <p>Le choix de l'origine dépend du calcul à effectuer : origine au sommet pour relier directement les distances mesurées expérimentalement, origine aux foyers pour des raisonnements de construction géométrique.</p>

    <h3>5. Grandissement</h3>
    <p>Le grandissement d'un dioptre sphérique fait intervenir les indices des deux milieux, contrairement au miroir :</p>
    <p>$$\\gamma = \\dfrac{\\overline{A'B'}}{\\overline{AB}} = \\dfrac{n_1\\,\\overline{SA'}}{n_2\\,\\overline{SA}}$$</p>
    <p>Avec origine aux foyers, il se réécrit de façon plus compacte, en notant $f=\\overline{SF}$ et $f'=\\overline{SF'}$ :</p>
    <p>$$\\gamma = \\dfrac{f\\,\\overline{F'A'}}{f'\\,\\overline{FA}}$$</p>

    <h3>6. Construction géométrique de l'image</h3>
    <p>Trois rayons particuliers permettent de construire l'image d'un point hors axe :</p>
    <ul>
      <li>un rayon passant par le centre $C$ : il n'est pas dévié, car il rencontre le dioptre perpendiculairement à sa surface ;</li>
      <li>un rayon incident parallèle à l'axe optique : il émerge en passant par (ou en semblant provenir de) $F'$ ;</li>
      <li>un rayon incident passant par (ou dirigé vers) $F$ : il émerge parallèle à l'axe optique.</li>
    </ul>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Le dioptre sphérique obéit à $n_2/\\overline{SA'}-n_1/\\overline{SA}=(n_2-n_1)/\\overline{SC}=V$. Sa vergence $V$ détermine son caractère convergent ($V>0$) ou divergent ($V<0$). Contrairement au miroir, ses deux foyers $F$ et $F'$ sont distincts, car les indices $n_1$ et $n_2$ diffèrent de part et d'autre.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La cornée de l'œil sépare l'air ($n\\approx 1{,}00$) de l'humeur aqueuse ($n\\approx 1{,}34$), un écart d'indice bien plus important que celui traversé par la lumière à l'intérieur de l'œil lui-même. Qu'est-ce que cela suggère sur la raison pour laquelle la cornée, et non le cristallin, assure la majeure partie du pouvoir focalisateur total de l'œil ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>La chirurgie réfractive au laser (LASIK), qui corrige aujourd'hui la myopie et l'astigmatisme de millions de patients chaque année, repose entièrement sur ce modèle du dioptre sphérique : le chirurgien modifie très précisément la courbure de la cornée pour ajuster sa vergence et ramener le foyer image exactement sur la rétine. Les implants de lentilles intraoculaires, posés lors d'une chirurgie de la cataracte, sont eux aussi conçus à partir de calculs de dioptres sphériques optimisés individuellement pour chaque patient.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des dioptres artificiels (implants, lentilles de contact) dont la vergence s'ajuste automatiquement et en temps réel, à la manière du cristallin naturel qui accommode pour la vision de près et de loin ? C'est un axe de recherche actif en ophtalmologie pour restaurer une accommodation dynamique après une chirurgie de la cataracte.</p>
    <p><strong>Technologie émergente :</strong> les lentilles de contact intelligentes, intégrant des capteurs et des dioptres à vergence ajustable électroniquement, sont explorées comme piste pour surveiller en continu certains paramètres physiologiques (comme la glycémie via les larmes) tout en corrigeant la vue.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Surface sphérique entre deux milieux (n₁, n₂) → vergence $V=(n_2-n_1)/\\overline{SC}$ → deux foyers distincts F et F' → relation de conjugaison $n_2/\\overline{SA'}-n_1/\\overline{SA}=V$
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\frac{n_2}{\\overline{SA'}} - \\frac{n_1}{\\overline{SA}} = \\frac{n_2-n_1}{\\overline{SC}}$$
      Cette relation, plus générale que celle du miroir sphérique puisqu'elle intègre deux indices différents, est la brique élémentaire à partir de laquelle se construit, au chapitre suivant, la formule de toute lentille mince — et derrière elle, la modélisation optique de ton propre œil.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Relation de conjugaison (sommet) : $n_2/\\overline{SA'} - n_1/\\overline{SA} = (n_2-n_1)/\\overline{SC} = V$</li>
        <li>Vergence $V$ en dioptries ; dioptre convergent si $V>0$, divergent si $V<0$</li>
        <li>Deux foyers distincts $F\\neq F'$ : $\\overline{SF}=-n_1/V$ et $\\overline{SF'}=n_2/V$</li>
        <li>Grandissement : $\\gamma = n_1\\overline{SA'}/(n_2\\overline{SA})$, avec les indices des deux milieux</li>
        <li>Rayon particulier passant par le centre C : non dévié, car perpendiculaire à la surface en ce point</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que $F=F'$ comme pour le miroir : c'est faux dès que $n_1\\neq n_2$</li>
        <li>Oublier les indices $n_1$, $n_2$ dans la formule du grandissement, contrairement au miroir sphérique</li>
        <li>Confondre le signe de $\\overline{SC}$ (qui définit convergent/divergent) avec la courbure visuelle de la surface</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un dioptre sphérique est dit convergent lorsque sa vergence V vérifie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt6e1" value="wrong"> $V = 0$</label>
          <label class="option"><input type="radio" name="opt6e1" value="right"> $V > 0$</label>
          <label class="option"><input type="radio" name="opt6e1" value="wrong"> $V < 0$</label>
          <label class="option"><input type="radio" name="opt6e1" value="wrong"> $V = n_1$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt6e1','opt6fb1','Correct — un dioptre convergent a une vergence positive, tout comme un dioptre divergent a une vergence négative.','Relis la section 2 : le signe de la vergence détermine directement le caractère convergent ou divergent du dioptre.')">Vérifier</button>
        <div class="feedback" id="opt6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour un dioptre sphérique séparant deux milieux d'indices différents $n_1 \\neq n_2$, les foyers objet F et image F' :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt6e2" value="wrong"> sont toujours confondus, comme pour un miroir</label>
          <label class="option"><input type="radio" name="opt6e2" value="right"> sont en général distincts</label>
          <label class="option"><input type="radio" name="opt6e2" value="wrong"> n'existent pas pour un dioptre</label>
          <label class="option"><input type="radio" name="opt6e2" value="wrong"> sont toujours symétriques par rapport à C</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt6e2','opt6fb2','Correct — contrairement au miroir, F et F\' du dioptre sphérique ne coïncident pas en général, car les milieux d\'indices n1 et n2 sont différents.','Reviens à la section 3 : la différence essentielle avec le miroir sphérique tient à la présence de deux indices différents de part et d\'autre du dioptre.')">Vérifier</button>
        <div class="feedback" id="opt6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le grandissement d'un dioptre sphérique, avec origine au sommet, s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt6e3" value="wrong"> $\\gamma = -\\overline{SA'}/\\overline{SA}$ (comme pour un miroir)</label>
          <label class="option"><input type="radio" name="opt6e3" value="right"> $\\gamma = n_1\\overline{SA'}/(n_2\\overline{SA})$</label>
          <label class="option"><input type="radio" name="opt6e3" value="wrong"> $\\gamma = \\overline{SA}/\\overline{SA'}$</label>
          <label class="option"><input type="radio" name="opt6e3" value="wrong"> $\\gamma = n_2/n_1$ uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt6e3','opt6fb3','Correct — contrairement au miroir, le grandissement du dioptre sphérique fait intervenir le rapport des indices n1/n2.','Relis la section 5 : le dioptre sphérique fait intervenir les indices des deux milieux dans son grandissement, à la différence du miroir sphérique.')">Vérifier</button>
        <div class="feedback" id="opt6fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si les deux milieux avaient exactement le même indice de réfraction ($n_1=n_2$) : que deviendrait la vergence du dioptre, et pourquoi cela correspond-il physiquement à l'absence totale de dioptre ?</li>
        <li>Pourquoi les poissons, dont l'œil baigne déjà dans l'eau, ont-ils une cornée qui contribue beaucoup moins à la focalisation totale de leur œil que la cornée humaine, contrairement à leur cristallin qui, lui, joue un rôle prépondérant ?</li>
        <li>Quelle serait la conséquence, pour la chirurgie réfractive au laser, si le modèle du dioptre sphérique décrivait mal la géométrie réelle de la cornée humaine ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>H. von Helmholtz, <em>Handbuch der physiologischen Optik</em>, 1867 — traité fondateur sur l'optique de l'œil humain modélisée par des dioptres.</li>
        <li>E. Hecht, <em>Optics</em>, Pearson — chapitre sur le dioptre sphérique et ses relations de conjugaison.</li>
        <li>American Academy of Ophthalmology, « LASIK — Laser-Assisted In Situ Keratomileusis: Clinical Guidelines », rapports techniques actualisés.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu maîtrises désormais l'élément géométrique fondamental à partir duquel se construit toute lentille — et, en modèle simplifié, ta propre cornée. Le chapitre suivant, « Lentilles minces », va combiner deux dioptres sphériques pour construire l'instrument optique le plus répandu de tous : celui qui équipe tes lunettes, ton appareil photo, ton microscope et ton télescope. Comme le disait Helmholtz, l'un des pères de l'optique physiologique moderne : « Si un opticien voulait me vendre un instrument aussi imparfait que l'œil, je n'hésiterais pas à le lui retourner. » Une boutade qui, malgré tout, souligne l'incroyable sophistication de ce dioptre naturel que tu portes en toi.</p>
  `
};

OPTIQUE_NOVA_KB[optiqueKey('Dioptre sphérique')] = {
  intro: "Salut, moi c'est Nova ! On étudie le dioptre sphérique : conjugaison, vergence et foyers distincts F et F'. Demande-moi la formule de conjugaison, la vergence, ou pourquoi F et F' ne sont pas confondus.",
  rules: [
    { test:/conjugaison/i, replies:["La relation de conjugaison du dioptre sphérique, origine au sommet, est n2/SA' - n1/SA = (n2-n1)/SC = V."] },
    { test:/vergence/i, replies:["La vergence V=(n2-n1)/SC détermine le caractère convergent (V>0) ou divergent (V<0) du dioptre, et s'exprime en dioptries."] },
    { test:/foyer/i, replies:["Le dioptre sphérique a deux foyers distincts F et F', car les indices n1 et n2 de part et d'autre sont différents. On a SF=-n1/V et SF'=n2/V."] },
    { test:/grandissement/i, replies:["Le grandissement du dioptre sphérique est γ=n1·SA'/(n2·SA) : contrairement au miroir, il fait intervenir le rapport des deux indices."] },
    { test:/convergent|divergent/i, replies:["Un dioptre est convergent si sa vergence V est positive, divergent si elle est négative — cela dépend du signe de (n2-n1)/SC."] },
    { test:/rayons particuliers|construction.*image/i, replies:["Trois rayons particuliers : celui passant par le centre C n'est pas dévié ; celui parallèle à l'axe émerge en passant par F' ; celui passant par F émerge parallèle à l'axe."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le signe de V détermine le type du dioptre.","Indice niveau 2 : convergent correspond au même signe que pour une lentille convergente.","Indice niveau 3 : V>0."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare avec le cas du miroir sphérique, où F=F'.","Indice niveau 2 : ici les deux milieux ont des indices différents.","Indice niveau 3 : F et F' sont en général distincts."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le grandissement du dioptre diffère de celui du miroir.","Indice niveau 2 : il fait intervenir les indices n1 et n2, pas seulement les distances.","Indice niveau 3 : γ=n1·SA'/(n2·SA)."] }
  ]
};


/* =========================== CHAPITRE 7 — Lentilles minces =========================== */
OPTIQUE_CHAPTERS[optiqueKey('Lentilles minces')] = {
  objectives: [
    "Distinguer lentilles convergentes et divergentes, et identifier leurs points particuliers (centre optique, foyers)",
    "Définir la distance focale et la vergence d'une lentille mince",
    "Établir et utiliser les relations de conjugaison et de grandissement d'une lentille mince",
    "Construire géométriquement l'image d'un objet à travers une lentille convergente ou divergente, dans toutes les configurations",
    "Évaluer comment associer deux lentilles pour construire un instrument optique (loupe, microscope, lunette) à partir des propriétés étudiées dans ce chapitre"
  ],
  prereqs: ["Dioptre sphérique"],
  bodyHtml: `
    <p>Un moine franciscain du XIIIe siècle, dont le nom exact reste débattu par les historiens, aurait le premier eu l'idée de tailler un morceau de verre en forme de lentille et de le poser devant l'œil pour agrandir un texte — inventant, sans le savoir, l'ancêtre direct de toutes les lunettes de vue portées aujourd'hui par des centaines de millions de personnes. Il faudra ensuite attendre le XVIIe siècle et l'association savante de plusieurs lentilles pour que Galilée, puis Van Leeuwenhoek, révolutionnent respectivement notre vision du cosmos (avec la lunette astronomique) et celle de l'infiniment petit (avec le microscope).</p>
    <p>Depuis, la lentille mince n'a cessé de démultiplier ses usages : elle équipe aujourd'hui aussi bien l'objectif d'un smartphone que le scanner d'un supermarché, le projecteur d'une salle de cinéma que le laser d'une imprimante. Comprendre en profondeur ce chapitre, c'est se donner les clés pour comprendre le fonctionnement de presque tous les instruments optiques que tu utilises au quotidien, souvent sans même t'en rendre compte.</p>
    <p>Une lentille mince est l'association de deux dioptres sphériques (ou un dioptre sphérique et un dioptre plan), suffisamment rapprochés pour que l'on puisse négliger l'épaisseur de la lentille devant les rayons de courbure et les distances objet/image. C'est l'élément optique le plus répandu : lunettes, appareils photo, microscopes, télescopes, œil lui-même. À la fin de ce chapitre, tu sauras construire l'image de n'importe quel objet à travers n'importe quelle lentille, dans toutes les configurations possibles.</p>

    <h3>1. Types de lentilles</h3>
    <p>On distingue deux familles de lentilles minces selon leur forme et leur effet sur un faisceau parallèle :</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Forme</th><th>Effet sur un faisceau parallèle</th></tr>
      <tr><td>Convergente</td><td>Plus épaisse au centre que sur les bords (biconvexe, plan-convexe, ménisque convergent)</td><td>Concentre les rayons en un point réel</td></tr>
      <tr><td>Divergente</td><td>Plus épaisse sur les bords qu'au centre (biconcave, plan-concave, ménisque divergent)</td><td>Disperse les rayons, qui semblent provenir d'un point virtuel</td></tr>
    </table>

    <h3>2. Centre optique et foyers</h3>
    <p>Le <strong>centre optique</strong> $O$ est le point de la lentille traversé sans aucune déviation par tout rayon qui y passe. Comme pour le dioptre sphérique, la lentille possède deux foyers principaux :</p>
    <table class="mini-table">
      <tr><th>Foyer</th><th>Définition</th></tr>
      <tr><td>Foyer image $F'$</td><td>Point où converge (lentille convergente) ou semble provenir (lentille divergente) tout rayon incident parallèle à l'axe</td></tr>
      <tr><td>Foyer objet $F$</td><td>Point tel que tout rayon issu de lui (ou dirigé vers lui) émerge parallèle à l'axe</td></tr>
    </table>
    <p>Contrairement au dioptre sphérique isolé, les deux foyers d'une lentille mince entourée d'air sont <strong>symétriques par rapport au centre optique</strong> : $\\overline{OF} = -\\overline{OF'}$.</p>

    <h3>3. Distance focale et vergence</h3>
    <p>La <strong>distance focale image</strong> $f' = \\overline{OF'}$ est positive pour une lentille convergente, négative pour une lentille divergente. La <strong>vergence</strong>, qui mesure le pouvoir de convergence de la lentille, est définie par :</p>
    <p>$$V = \\dfrac{1}{f'} = -\\dfrac{1}{f}$$</p>
    <p>Elle s'exprime en dioptries ($\\delta$ = m<sup>-1</sup>) — c'est le nombre annoncé dans les ordonnances de lunettes (par exemple, une correction de myopie sévère peut correspondre à $V=-10\\ \\delta$, soit $f'=-10$ cm).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Contrairement au dioptre sphérique isolé (chapitre 6), une lentille mince entourée d'air a des foyers rigoureusement symétriques par rapport au centre optique : $\\overline{OF}=-\\overline{OF'}$. Pourquoi cette symétrie réapparaît-elle pour une lentille alors qu'elle n'existait pas pour un dioptre isolé — quel rôle joue le fait que la lumière entre et ressort dans le même milieu (l'air) ?
    </div>

    <h3>4. Les rayons principaux</h3>
    <p>Trois rayons particuliers, dont le trajet est connu sans calcul, permettent de construire géométriquement toute image :</p>
    <ul>
      <li>un rayon incident <strong>parallèle</strong> à l'axe optique émerge en passant par $F'$ (convergente) ou en semblant provenir de $F'$ (divergente) ;</li>
      <li>un rayon passant par le <strong>centre optique</strong> $O$ n'est pas dévié ;</li>
      <li>un rayon incident passant par $F$ (convergente) ou dirigé vers $F$ (divergente) émerge <strong>parallèle</strong> à l'axe optique.</li>
    </ul>

    <h3>5. Relation de grandissement</h3>
    <p>Pour un objet $AB$ perpendiculaire à l'axe et son image $A'B'$, le théorème de Thalès appliqué aux triangles formés avec le centre optique $O$ et les foyers donne le grandissement algébrique :</p>
    <p>$$\\gamma = \\dfrac{\\overline{A'B'}}{\\overline{AB}} = \\dfrac{\\overline{OA'}}{\\overline{OA}}$$</p>
    <p>Comme toujours : $\\gamma>0$ (image droite) ou $\\gamma<0$ (image renversée) ; $|\\gamma|>1$ (agrandie) ou $|\\gamma|<1$ (réduite).</p>

    <h3>6. Relation de conjugaison</h3>
    <p>Avec origine au centre optique $O$, la relation de conjugaison des lentilles minces — souvent appelée <strong>formule de Descartes</strong> — s'écrit :</p>
    <p>$$\\dfrac{1}{\\overline{OA'}} - \\dfrac{1}{\\overline{OA}} = \\dfrac{1}{f'} = V$$</p>
    <p>Avec origine aux foyers (<strong>formule de Newton</strong>), en notant $f=\\overline{OF}$ et $f'=\\overline{OF'}=-f$ :</p>
    <p>$$\\overline{FA}\\cdot\\overline{F'A'} = -f'^2$$</p>
    <p>Cette dernière relation est particulièrement pratique pour les problèmes où l'on raisonne directement en écarts aux foyers plutôt qu'au centre optique.</p>

    <h3>7. Constructions dans toutes les configurations</h3>
    <p>Pour une <strong>lentille convergente</strong>, on distingue classiquement les cas selon la position de l'objet réel :</p>
    <table class="mini-table">
      <tr><th>Position de l'objet</th><th>Image obtenue</th></tr>
      <tr><td>À l'infini</td><td>Réelle, ponctuelle, dans le plan focal image (en $F'$)</td></tr>
      <tr><td>Au-delà de $2f'$</td><td>Réelle, renversée, réduite, entre $F'$ et $2f'$</td></tr>
      <tr><td>Entre $F$ et $O$</td><td>Virtuelle, droite, agrandie, du même côté que l'objet — effet loupe</td></tr>
    </table>
    <p>Pour une <strong>lentille divergente</strong>, quelle que soit la position de l'objet réel, l'image reste toujours <strong>virtuelle, droite et réduite</strong>, située entre $O$ et $F'$ — c'est le comportement utilisé en correction de la myopie (chapitre suivant).</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      La lentille mince obéit à $1/\\overline{OA'}-1/\\overline{OA}=1/f'=V$ et $\\gamma=\\overline{OA'}/\\overline{OA}$, avec des foyers symétriques par rapport au centre optique $O$. Une lentille convergente peut donner une image réelle ou virtuelle selon la position de l'objet, tandis qu'une lentille divergente ne donne, pour un objet réel, qu'une image virtuelle, droite et réduite.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un microscope optique associe deux lentilles convergentes : l'objectif forme une première image réelle, agrandie, de l'échantillon ; l'oculaire utilise ensuite cette image intermédiaire comme objet, placé entre son propre foyer et son centre optique — exactement la configuration « effet loupe » de ce chapitre. Sachant cela, peux-tu deviner pourquoi le grandissement total d'un microscope est le produit (et non la somme) des grandissements de chaque lentille ?
    </div>

    <h3>8. Frontière de la recherche</h3>
    <p>Les objectifs de smartphones modernes, malgré leur épaisseur de quelques millimètres seulement, combinent parfois cinq à sept lentilles asphériques empilées, calculées par ordinateur pour corriger simultanément les aberrations géométriques et chromatiques qu'une lentille mince unique ne pourrait éviter. À l'autre extrémité de l'échelle, le télescope spatial James Webb combine un miroir principal et un système complexe de lentilles et de miroirs secondaires pour former des images d'une netteté inégalée de galaxies vieilles de plus de 13 milliards d'années.</p>
    <p><strong>Question ouverte :</strong> peut-on remplacer entièrement les lentilles en verre par des métalentilles plates, structurées à l'échelle nanométrique, tout en conservant (voire en améliorant) la qualité optique des systèmes actuels ? C'est un axe de recherche très actif, avec un potentiel de miniaturisation considérable pour les caméras embarquées et les capteurs médicaux.</p>
    <p><strong>Technologie émergente :</strong> les lentilles à focale variable électroniquement (lentilles liquides ou à cristaux liquides), qui changent de courbure sans aucune pièce mobile, sont développées pour équiper la prochaine génération d'objectifs photo miniaturisés et de dispositifs de réalité augmentée.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Deux dioptres sphériques rapprochés → lentille mince (convergente ou divergente) → foyers symétriques $\\overline{OF}=-\\overline{OF'}$ → formule de Descartes $1/\\overline{OA'}-1/\\overline{OA}=V$ → construction géométrique de l'image
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\frac{1}{\\overline{OA'}} - \\frac{1}{\\overline{OA}} = \\frac{1}{f'} = V$$
      Cette formule de Descartes, sans doute la plus utilisée de tout le cours d'optique géométrique, gouverne le comportement de toute lentille — des lunettes que tu portes peut-être en ce moment jusqu'à l'objectif de l'appareil photo qui a peut-être immortalisé cette page.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Vergence $V=1/f'$, en dioptries ; $f'>0$ pour une convergente, $f'<0$ pour une divergente</li>
        <li>Foyers symétriques par rapport au centre optique : $\\overline{OF}=-\\overline{OF'}$</li>
        <li>Formule de Descartes (origine au centre O) : $1/\\overline{OA'} - 1/\\overline{OA} = 1/f' = V$</li>
        <li>Formule de Newton (origine aux foyers) : $\\overline{FA}\\cdot\\overline{F'A'} = -f'^2$</li>
        <li>Grandissement : $\\gamma=\\overline{OA'}/\\overline{OA}$</li>
        <li>Lentille divergente + objet réel ⟹ toujours image virtuelle, droite, réduite ; lentille convergente : ça dépend de la position de l'objet par rapport à F</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre le grandissement de la lentille ($\\gamma=\\overline{OA'}/\\overline{OA}$, sans signe négatif) avec celui du miroir sphérique (avec signe négatif)</li>
        <li>Oublier que $f=-f'$ pour une lentille mince entourée d'air : les deux distances focales ne sont pas indépendantes</li>
        <li>Croire qu'une lentille divergente peut donner une image réelle d'un objet réel : c'est structurellement impossible</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une lentille a une vergence $V = +5\\ \\delta$. Sa distance focale image $f'$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt7e1" value="wrong"> -20 cm</label>
          <label class="option"><input type="radio" name="opt7e1" value="right"> +20 cm</label>
          <label class="option"><input type="radio" name="opt7e1" value="wrong"> +5 cm</label>
          <label class="option"><input type="radio" name="opt7e1" value="wrong"> +0,05 cm</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt7e1','opt7fb1','Correct — f\'=1/V=1/5=0,20 m=+20 cm ; la vergence positive confirme qu\'il s\'agit d\'une lentille convergente.','Utilise f\'=1/V, en gardant V en m⁻¹ (dioptries) : 1/5=0,2 m=20 cm.')">Vérifier</button>
        <div class="feedback" id="opt7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une lentille divergente, pour un objet réel, donne toujours une image :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt7e2" value="wrong"> réelle et renversée</label>
          <label class="option"><input type="radio" name="opt7e2" value="right"> virtuelle, droite et réduite</label>
          <label class="option"><input type="radio" name="opt7e2" value="wrong"> réelle et agrandie</label>
          <label class="option"><input type="radio" name="opt7e2" value="wrong"> dépend uniquement de la couleur de la lumière</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt7e2','opt7fb2','Correct — une lentille divergente ne peut jamais faire converger réellement des rayons issus d\'un objet réel : l\'image est systématiquement virtuelle, droite et réduite.','Relis la section 7 : contrairement à la lentille convergente, la lentille divergente n\'a qu\'un seul comportement possible pour un objet réel.')">Vérifier</button>
        <div class="feedback" id="opt7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour obtenir, avec une lentille convergente, une image virtuelle et agrandie (effet loupe), l'objet réel doit être placé :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt7e3" value="wrong"> au-delà de $2f'$</label>
          <label class="option"><input type="radio" name="opt7e3" value="wrong"> exactement au foyer F</label>
          <label class="option"><input type="radio" name="opt7e3" value="right"> entre le foyer F et le centre optique O</label>
          <label class="option"><input type="radio" name="opt7e3" value="wrong"> à l'infini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt7e3','opt7fb3','Correct — c\'est exactement la configuration de la loupe : objet réel entre F et O, image virtuelle, droite et agrandie.','Reviens au tableau de la section 7 : l\'effet loupe correspond à une position précise de l\'objet, proche de la lentille, entre le foyer objet et le centre optique.')">Vérifier</button>
        <div class="feedback" id="opt7fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on pouvait fabriquer une lentille de vergence infinie (focale nulle) : que deviendrait la formation de l'image, et pourquoi cette limite est-elle physiquement inatteignable ?</li>
        <li>Pourquoi une lentille convergente peut-elle donner à la fois des images réelles et virtuelles selon la position de l'objet, alors qu'une lentille divergente n'en donne jamais qu'un seul type ?</li>
        <li>Quelle serait la conséquence, pour la photographie, si l'on ne pouvait fabriquer que des lentilles à focale fixe, sans jamais pouvoir associer plusieurs lentilles pour obtenir un zoom optique ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>R. Descartes, <em>La Dioptrique</em>, 1637 — premiers travaux systématiques sur les lentilles et leur formule de conjugaison.</li>
        <li>E. Hecht, <em>Optics</em>, Pearson — chapitre complet sur les lentilles minces et leurs associations.</li>
        <li>A. Arbabi et al., « Miniature Optical Planar Camera Based on a Wide-Angle Metasurface Doublet », Nature Communications, 2016.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu maîtrises désormais l'instrument optique le plus utilisé de tous, celui qui rend possibles microscopes, télescopes et appareils photo. Le dernier chapitre de ce cours, « L'œil : modèle réduit et défauts de la vision », va appliquer directement tout ce que tu viens d'apprendre au système optique le plus précieux qui soit : le tien. Comme le disait Galilée après avoir pointé sa lunette astronomique — un simple assemblage de deux lentilles — vers le ciel : « J'ai vu des choses que jamais aucun œil n'avait vues avant moi. » Le chapitre suivant t'expliquera comment cet œil, précisément, fonctionne.</p>
  `
};

OPTIQUE_NOVA_KB[optiqueKey('Lentilles minces')] = {
  intro: "Salut, moi c'est Nova ! On étudie les lentilles minces : convergente/divergente, foyers, vergence et constructions d'images. Demande-moi la formule de conjugaison, la vergence, ou l'effet loupe.",
  rules: [
    { test:/conjugaison|descartes|formule.*lentille/i, replies:["La formule de conjugaison (Descartes), origine au centre optique O, est 1/OA' - 1/OA = 1/f' = V."] },
    { test:/newton/i, replies:["La formule de Newton, avec origine aux foyers, s'écrit FA·F'A' = -f'². Elle est pratique quand on raisonne en écarts aux foyers plutôt qu'au centre optique."] },
    { test:/vergence/i, replies:["La vergence V=1/f' s'exprime en dioptries. Positive pour une lentille convergente, négative pour une divergente — c'est le nombre indiqué sur une ordonnance de lunettes."] },
    { test:/grandissement/i, replies:["Le grandissement d'une lentille mince est γ=OA'/OA (sans signe négatif, contrairement au miroir sphérique)."] },
    { test:/loupe|agrandie.*virtuelle/i, replies:["Pour obtenir l'effet loupe (image virtuelle, droite, agrandie) avec une lentille convergente, l'objet réel doit être placé entre le foyer objet F et le centre optique O."] },
    { test:/divergente/i, replies:["Une lentille divergente, pour tout objet réel, donne toujours une image virtuelle, droite et réduite, située entre O et F' — c'est le principe de la correction de la myopie."] },
    { test:/rayons principaux|construction.*image/i, replies:["Trois rayons principaux : celui parallèle à l'axe émerge en passant par (ou en semblant venir de) F' ; celui passant par le centre optique O n'est pas dévié ; celui passant par F émerge parallèle à l'axe."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise f'=1/V, avec V en dioptries (m⁻¹).","Indice niveau 2 : 1/5=0,2, donc le résultat est en dizaines de cm.","Indice niveau 3 : f'=+20 cm."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense au fait qu'une lentille divergente ne concentre jamais réellement les rayons.","Indice niveau 2 : l'image ne peut donc jamais être récupérée sur un écran.","Indice niveau 3 : virtuelle, droite et réduite, toujours."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à la position de l'objet dans une loupe classique.","Indice niveau 2 : l'objet est très proche de la lentille, plus proche que le foyer.","Indice niveau 3 : entre F et O."] }
  ]
};


/* =========================== CHAPITRE 8 — L'œil : modèle réduit et défauts de la vision =========================== */
OPTIQUE_CHAPTERS[optiqueKey('L\'œil : modèle réduit et défauts de la vision')] = {
  objectives: [
    "Décrire les éléments optiques essentiels de l'œil (cornée, cristallin, rétine) et son modèle réduit",
    "Expliquer le mécanisme de l'accommodation, le punctum proximum et le punctum remotum",
    "Distinguer myopie, hypermétropie, presbytie et astigmatisme, et leur origine optique",
    "Déterminer le type et la puissance de la lentille correctrice adaptée à un défaut de vision donné",
    "Analyser pourquoi ce chapitre entier n'est, au fond, qu'une application directe des deux chapitres précédents (dioptre sphérique et lentille mince) à un seul système optique particulier"
  ],
  prereqs: ["Lentilles minces"],
  bodyHtml: `
    <p>Hermann von Helmholtz, physicien et physiologiste allemand du XIXe siècle, fut l'un des premiers à appliquer rigoureusement les lois de l'optique géométrique — celles-là mêmes que tu viens d'étudier chapitre après chapitre — à la compréhension du fonctionnement de l'œil humain. Son constat, resté célèbre, tient en une phrase provocatrice : si un opticien lui proposait de vendre un instrument aussi imparfait que l'œil (aberrations, angle mort, vaisseaux sanguins visibles sur la rétine), il le lui renverrait sur-le-champ. Et pourtant, cet instrument « imparfait » reste, encore aujourd'hui, largement supérieur en polyvalence à n'importe quelle caméra numérique conçue par l'homme.</p>
    <p>Ce dernier chapitre du cours n'introduit presque aucun concept nouveau : il applique, terme à terme, tout ce que tu as appris depuis le premier chapitre — dioptres, lentilles, foyers, conjugaison — à ce système optique remarquable que tu portes en toi. Comprendre pourquoi tes propres lunettes (ou celles d'un proche) sont convergentes ou divergentes, c'est directement appliquer la logique des lentilles minces à un cas concret et personnel.</p>
    <p>L'œil est le système optique naturel par excellence : il transforme la lumière en signal électrique interprété par le cerveau, avec un champ visuel d'environ 220° en horizontal et 140° en vertical. Ce dernier chapitre applique tous les outils des chapitres précédents (dioptres et lentilles) à ce système remarquable, et explique comment corriger ses défauts les plus courants. À la fin de ce chapitre — et de ce cours — tu sauras expliquer précisément pourquoi certaines personnes ont besoin de lunettes, et de quel type.</p>

    <h3>1. Anatomie optique de l'œil</h3>
    <table class="mini-table">
      <tr><th>Élément</th><th>Rôle optique</th></tr>
      <tr><td>Cornée</td><td>Fenêtre d'entrée de la lumière ; assure la plus grande part de la convergence totale de l'œil</td></tr>
      <tr><td>Iris / pupille</td><td>Diaphragme qui régule la quantité de lumière entrant dans l'œil</td></tr>
      <tr><td>Cristallin</td><td>Lentille convergente à focale variable (« zoom »), qui ajuste la mise au point par changement de courbure</td></tr>
      <tr><td>Rétine</td><td>Écran photosensible sur lequel doit se former l'image nette (équivalent du capteur d'un appareil photo)</td></tr>
    </table>

    <h3>2. Le modèle de l'œil réduit</h3>
    <p>Pour l'étude quantitative, on modélise l'œil par un <strong>montage optique convergent</strong> simplifié — l'<strong>œil réduit</strong> — comportant seulement trois éléments : un diaphragme (l'iris), une lentille convergente unique (représentant l'effet combiné de la cornée et du cristallin) et un écran (la rétine), à distance fixe de la lentille. Ce modèle, bien que simplifié, suffit à décrire tous les défauts de vision courants et leur correction.</p>

    <h3>3. Vision au repos et accommodation</h3>
    <p>Au repos (cristallin le moins bombé, vergence minimale), un œil normal (<strong>emmétrope</strong>) forme sur la rétine l'image nette d'un objet situé <strong>à l'infini</strong> : le foyer image de l'œil coïncide avec la rétine. Pour voir nettement un objet plus proche, l'œil doit augmenter sa vergence en bombant le cristallin : c'est l'<strong>accommodation</strong>. Ce mécanisme a des limites :</p>
    <table class="mini-table">
      <tr><th>Point remarquable</th><th>Définition</th></tr>
      <tr><td>Punctum remotum (PR)</td><td>Point le plus éloigné vu net sans accommodation (à l'infini pour un œil normal)</td></tr>
      <tr><td>Punctum proximum (PP)</td><td>Point le plus proche vu net en accommodation maximale (environ 25 cm pour un œil jeune normal)</td></tr>
    </table>
    <p>L'intervalle entre PP et PR définit le <strong>domaine de vision nette</strong> de l'œil.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le punctum proximum s'éloigne naturellement avec l'âge (environ 25 cm à 20 ans, plus d'un mètre passé 60 ans), même chez une personne sans aucun défaut de vision par ailleurs. Sachant que ce phénomène (la presbytie, section 6) touche donc absolument tout le monde tôt ou tard, pourquoi n'est-il pas classé, comme la myopie ou l'hypermétropie, parmi les défauts « de naissance » de l'œil ?
    </div>

    <h3>4. La myopie</h3>
    <p>Un œil myope est <strong>trop convergent</strong> (cristallin trop puissant) ou <strong>trop grand</strong> (globe oculaire trop profond) : au repos, l'image d'un objet à l'infini se forme <strong>en avant</strong> de la rétine. Conséquence : le punctum remotum n'est plus à l'infini mais à une distance finie, et la vision de loin est floue, tandis que la vision de près reste possible. La correction consiste à placer devant l'œil une <strong>lentille divergente</strong> qui diminue la vergence totale, ramenant l'image sur la rétine (ou à réduire la vergence de la cornée par chirurgie laser).</p>

    <h3>5. L'hypermétropie</h3>
    <p>Un œil hypermétrope est <strong>pas assez convergent</strong> ou <strong>trop court</strong> : au repos, l'image d'un objet à l'infini se formerait <strong>en arrière</strong> de la rétine. L'accommodation permanente permet souvent aux jeunes hypermétropes de compenser ce défaut, au prix d'une fatigue oculaire, mais ni la vision de loin ni celle de près ne sont parfaitement confortables lorsque le défaut est important. La correction consiste à placer devant l'œil une <strong>lentille convergente</strong>, qui augmente la vergence totale (ou à augmenter la courbure de la cornée par chirurgie laser).</p>

    <h3>6. La presbytie</h3>
    <p>Avec l'âge, le cristallin perd de sa souplesse et le pouvoir d'accommodation diminue progressivement (phénomène qui débute vers la quarantaine et se stabilise vers 60 ans) : le punctum proximum s'éloigne, rendant la lecture de près difficile, alors que la vision de loin reste inchangée. La correction se fait par une <strong>lentille convergente</strong>, utilisée spécifiquement pour la vision rapprochée (verres progressifs si l'on souhaite aussi corriger la vision de loin en cas de myopie ou hypermétropie associée).</p>

    <h3>7. L'astigmatisme</h3>
    <p>Un œil astigmate n'est pas parfaitement sphérique (il présente des courbures différentes selon les plans, comme un ballon de rugby plutôt qu'un ballon de football) : les rayons lumineux convergent alors sur deux plans différents au lieu d'un seul, produisant une image déformée à toutes les distances. La correction utilise des verres (ou lentilles de contact) à courbures spécifiques selon les axes, qui compensent la différence de puissance entre les deux plans.</p>

    <h3>8. Calcul d'une correction : principe général</h3>
    <p>Pour déterminer la lentille correctrice d'un œil (par exemple pour ramener son punctum proximum réel à la distance de référence de 25 cm), on applique la relation de conjugaison de la lentille correctrice, en imposant que son image virtuelle de l'objet réel coïncide avec le punctum proximum (ou remotum) de l'œil défectueux. En négligeant la distance entre la lentille correctrice et l'œil (approximation courante en première étude), la lentille correctrice doit transformer l'objet visé à la bonne distance (25 cm pour la lecture, par exemple) en une image virtuelle exactement à la distance du punctum réel de l'œil.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      L'œil est modélisé comme une lentille convergente unique formant l'image sur un écran fixe (la rétine). Myope : trop convergent, corrigé par une lentille divergente. Hypermétrope : pas assez convergent, corrigé par une lentille convergente. Presbyte : perte d'accommodation avec l'âge, corrigée en vision de près par une lentille convergente. Astigmate : défaut de sphéricité, corrigé par des verres à courbures différenciées selon les axes.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La chirurgie réfractive au laser (LASIK) ne pose jamais de lentille devant l'œil : elle modifie directement, et de façon permanente, la courbure de la cornée elle-même. En reliant cela au chapitre 6 sur le dioptre sphérique, peux-tu expliquer pourquoi retailler légèrement la courbure de la cornée suffit à corriger myopie ou hypermétropie, sans avoir besoin de toucher au cristallin ?
    </div>

    <h3>9. Frontière de la recherche</h3>
    <p>La myopie connaît, depuis quelques décennies, une progression épidémiologique préoccupante à l'échelle mondiale — en particulier en Asie de l'Est, où plus de 80 % des jeunes adultes urbains sont aujourd'hui myopes, contre moins de 20 % il y a cinquante ans. Les chercheurs en ophtalmologie s'intéressent activement au rôle du temps passé en extérieur pendant l'enfance, qui semble freiner l'allongement excessif du globe oculaire responsable de la myopie — un lien entre environnement et optique physiologique qui reste encore incomplètement compris.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des traitements (verres spéciaux, gouttes, lentilles de contact) capables non seulement de corriger mais de réellement ralentir, voire stopper, la progression de la myopie chez l'enfant ? C'est un axe de recherche clinique très actif, avec des enjeux de santé publique majeurs face à l'augmentation mondiale de la myopie.</p>
    <p><strong>Technologie émergente :</strong> les implants de lentilles intraoculaires accommodatives, posés lors d'une chirurgie de la cataracte, cherchent à restaurer une véritable capacité d'accommodation dynamique — et non plus une simple correction statique — pour redonner au patient une vision nette à toutes les distances sans lunettes.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Œil réduit (diaphragme + lentille + écran fixe) → vergence au repos → image sur, avant, ou après la rétine → myopie/hypermétropie/emmétropie → correction par lentille adaptée
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$V_{\\text{correction}} = \\frac{1}{\\overline{OA'}_{\\text{visé}}} - \\frac{1}{\\overline{OA}_{\\text{réel}}}$$
      Cette application directe de la formule de conjugaison des lentilles minces, déjà rencontrée au chapitre précédent, est très exactement le calcul que réalise un ophtalmologiste pour déterminer la puissance, en dioptries, à inscrire sur ton ordonnance de lunettes.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Œil réduit = diaphragme (iris) + lentille convergente unique (cornée + cristallin) + écran fixe (rétine)</li>
        <li>Punctum remotum (PR) : point le plus éloigné vu net sans accommodation ; punctum proximum (PP) : point le plus proche vu net en accommodation maximale (~25 cm)</li>
        <li>Myopie : image avant la rétine (œil trop convergent/trop long) → correction par lentille divergente</li>
        <li>Hypermétropie : image après la rétine (œil pas assez convergent/trop court) → correction par lentille convergente</li>
        <li>Presbytie : perte d'accommodation liée à l'âge (PP qui s'éloigne) → correction en vision de près par lentille convergente</li>
        <li>Astigmatisme : défaut de sphéricité de l'œil → correction par verres à courbures différenciées selon les axes</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Inverser myopie et hypermétropie : la myopie correspond à un excès de convergence (correction divergente), l'inverse pour l'hypermétropie</li>
        <li>Confondre presbytie et hypermétropie : la presbytie est une perte d'accommodation liée à l'âge, indépendante d'un éventuel défaut préexistant</li>
        <li>Oublier que l'astigmatisme déforme la vision à <strong>toutes</strong> les distances, contrairement à la myopie ou l'hypermétropie qui affectent surtout une plage de distances</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Chez un œil myope au repos, l'image d'un objet à l'infini se forme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt8e1" value="wrong"> exactement sur la rétine</label>
          <label class="option"><input type="radio" name="opt8e1" value="right"> en avant de la rétine</label>
          <label class="option"><input type="radio" name="opt8e1" value="wrong"> en arrière de la rétine</label>
          <label class="option"><input type="radio" name="opt8e1" value="wrong"> sur la cornée</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt8e1','opt8fb1','Correct — l\'œil myope est trop convergent ou trop long : l\'image d\'un objet à l\'infini se forme avant d\'atteindre la rétine.','Relis la section 4 : la myopie correspond à un excès de convergence ou à un œil trop profond, ce qui rapproche le point de convergence de la lentille.')">Vérifier</button>
        <div class="feedback" id="opt8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La correction de la myopie utilise une lentille :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt8e2" value="wrong"> convergente</label>
          <label class="option"><input type="radio" name="opt8e2" value="right"> divergente</label>
          <label class="option"><input type="radio" name="opt8e2" value="wrong"> à courbures différenciées selon les axes</label>
          <label class="option"><input type="radio" name="opt8e2" value="wrong"> aucune lentille, uniquement du repos oculaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt8e2','opt8fb2','Correct — une lentille divergente réduit la vergence totale de l\'œil myope, ramenant l\'image exactement sur la rétine.','Reviens à la section 4 : puisque l\'œil myope est trop convergent, il faut une lentille qui diminue la convergence totale du système.')">Vérifier</button>
        <div class="feedback" id="opt8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La presbytie se caractérise principalement par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="opt8e3" value="wrong"> une image qui se forme en avant de la rétine à l'infini</label>
          <label class="option"><input type="radio" name="opt8e3" value="wrong"> une déformation de la cornée en deux plans</label>
          <label class="option"><input type="radio" name="opt8e3" value="right"> une diminution du pouvoir d'accommodation liée à l'âge, éloignant le punctum proximum</label>
          <label class="option"><input type="radio" name="opt8e3" value="wrong"> une pupille qui ne se dilate plus</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('opt8e3','opt8fb3','Correct — la presbytie vient de la perte de souplesse du cristallin avec l\'âge, qui limite l\'accommodation et éloigne le punctum proximum.','Relis la section 6 : la presbytie n\'est pas un défaut de convergence au repos, mais une perte progressive de la capacité d\'accommodation.')">Vérifier</button>
        <div class="feedback" id="opt8fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le globe oculaire pouvait, comme un appareil photo moderne, ajuster mécaniquement la distance entre sa lentille et son écran plutôt que la courbure de sa lentille : l'accommodation fonctionnerait-elle différemment ?</li>
        <li>Pourquoi la presbytie touche-t-elle absolument tout le monde en vieillissant, y compris les personnes qui n'ont jamais eu besoin de lunettes auparavant ?</li>
        <li>Quelle serait la conséquence, pour la santé publique mondiale, d'une méthode fiable et abordable pour ralentir la progression de la myopie chez l'enfant ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>H. von Helmholtz, <em>Handbuch der physiologischen Optik</em>, 1867 — traité fondateur de l'optique physiologique de l'œil.</li>
        <li>E. Hecht, <em>Optics</em>, Pearson — chapitre sur l'œil, ses défauts et leur correction optique.</li>
        <li>I. G. Morgan, K. Ohno-Matsui, S.-M. Saw, « Myopia », The Lancet, 2012 — revue de référence sur l'épidémiologie mondiale de la myopie.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Te voici arrivé au terme de ce cours d'optique géométrique : parti d'un simple rayon lumineux au premier chapitre, tu termines en comprenant le fonctionnement précis de l'instrument optique le plus personnel qui soit — tes propres yeux. Des miroirs de Newton aux fibres optiques transocéaniques, en passant par les lentilles de microscope et les cornées corrigées au laser, tu disposes désormais de tous les outils pour comprendre comment la lumière se plie, se réfléchit et forme des images dans notre monde. Comme le disait Helmholtz avec sa franchise coutumière : « L'œil, comme instrument optique, a des défauts, mais son organisation générale est admirable. » Tu sais maintenant précisément pourquoi.</p>
  `
};

OPTIQUE_NOVA_KB[optiqueKey('L\'œil : modèle réduit et défauts de la vision')] = {
  intro: "Salut, moi c'est Nova ! On termine l'Optique géométrique par l'œil : modèle réduit, accommodation, myopie, hypermétropie, presbytie et astigmatisme. Demande-moi la différence entre myopie et hypermétropie, ce qu'est le punctum proximum, ou comment corriger la presbytie.",
  rules: [
    { test:/oeil r[ée]duit|mod[èe]le.*oeil/i, replies:["L'œil réduit est un modèle simplifié : un diaphragme (iris), une lentille convergente unique (cornée + cristallin), et un écran fixe (la rétine)."] },
    { test:/accommodation/i, replies:["L'accommodation est l'ajustement de la courbure du cristallin qui permet à l'œil d'augmenter sa vergence pour voir net les objets proches. Elle a des limites : le punctum proximum en marque la borne minimale."] },
    { test:/punctum proximum|punctum remotum|pp\\b|pr\\b/i, replies:["Le punctum remotum (PR) est le point le plus éloigné vu net sans accommodation (à l'infini pour un œil normal). Le punctum proximum (PP) est le point le plus proche vu net en accommodation maximale, environ 25 cm pour un œil jeune."] },
    { test:/myopie|myope/i, replies:["Un œil myope est trop convergent ou trop long : l'image d'un objet à l'infini se forme avant la rétine. On corrige avec une lentille divergente."] },
    { test:/hypermétropie|hypermétrope/i, replies:["Un œil hypermétrope n'est pas assez convergent ou trop court : l'image d'un objet à l'infini se formerait derrière la rétine. On corrige avec une lentille convergente."] },
    { test:/presbytie|presbyte/i, replies:["La presbytie est la diminution du pouvoir d'accommodation liée à l'âge : le punctum proximum s'éloigne, rendant la lecture de près difficile. On corrige la vision de près avec une lentille convergente."] },
    { test:/astigmatisme|astigmate/i, replies:["L'astigmatisme vient d'un œil non parfaitement sphérique : les rayons convergent sur deux plans différents, produisant une image floue ou déformée à toutes les distances. On corrige avec des verres à courbures différenciées selon les axes."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à ce que signifie « trop convergent » pour la position de l'image.","Indice niveau 2 : plus un système est convergent, plus il fait converger les rayons rapidement, donc plus tôt sur le trajet.","Indice niveau 3 : l'image se forme en avant de la rétine."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : il faut compenser un excès de convergence.","Indice niveau 2 : la lentille correctrice doit donc diminuer la vergence totale.","Indice niveau 3 : lentille divergente."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : la presbytie n'est pas liée à la forme de l'œil ni à un excès ou un manque de convergence au repos.","Indice niveau 2 : c'est un phénomène qui évolue avec l'âge et touche la capacité d'accommodation.","Indice niveau 3 : diminution du pouvoir d'accommodation, punctum proximum qui s'éloigne."] }
  ]
};

/* fusionne le module Optique géométrique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, OPTIQUE_CHAPTERS);
Object.assign(NOVA_KB, OPTIQUE_NOVA_KB);