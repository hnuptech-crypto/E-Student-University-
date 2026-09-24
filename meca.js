/* =====================================================================
   CHUNK « meca » — registre MECA_CHAPTERS / MECA_NOVA_KB
   Matière(s) : Physique|Mécanique du point matériel
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   MECA_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */




/* ============================================================================
   MODULE MÉCANIQUE DU POINT MATÉRIEL — Physique L1
   (contenu rédigé selon le programme standard de mécanique du point en
   1ère année de Licence — cinématique, dynamique, travail-énergie,
   mouvements particuliers — conforme aux maquettes LMD francophones)
   Structure identique aux autres modules : MECA_CHAPTERS / MECA_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB. Remplace et enrichit
   le chapitre de démonstration d'origine (Dynamique du point matériel).
============================================================================ */
const MECA_MATIERE = 'Mécanique du point matériel';
function mecaKey(chapterTitle){ return `Physique|${MECA_MATIERE}|${chapterTitle}`; }
const MECA_CHAPTERS = {};
const MECA_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Position, vitesse, accélération d'un MRUV (Chapitre 1)
--------------------------------------------------------------------------------- */
function updateMecaMRUV(){
  const v0 = parseFloat(document.getElementById('mecaV0').value);
  const a = parseFloat(document.getElementById('mecaA').value);
  document.getElementById('mecaV0Val').textContent = v0.toFixed(1);
  document.getElementById('mecaAVal').textContent = a.toFixed(1);
  const tMax = 5, N = 40;
  const ts = [], xs = [], vs = [];
  for(let i=0;i<=N;i++){
    const t = tMax*i/N;
    ts.push(t);
    xs.push(v0*t + 0.5*a*t*t);
    vs.push(v0 + a*t);
  }
  function buildPoints(vals, plotTop, plotBot){
    let mn = Math.min(...vals, 0), mx = Math.max(...vals, 0);
    if(mx-mn < 1e-6){ mn -= 1; mx += 1; }
    return ts.map((t,i) => {
      const px = 20 + (t/tMax)*170;
      const py = plotBot - ((vals[i]-mn)/(mx-mn))*(plotBot-plotTop);
      return `${px.toFixed(1)},${py.toFixed(1)}`;
    }).join(' ');
  }
  document.getElementById('mecaXCurve').setAttribute('points', buildPoints(xs, 15, 75));
  document.getElementById('mecaVCurve').setAttribute('points', buildPoints(vs, 15, 75));
  const xFinal = xs[xs.length-1], vFinal = vs[vs.length-1];
  document.getElementById('mecaMRUVReadout').innerHTML =
    `Après ${tMax} s : x = <strong>${xFinal.toFixed(1)} m</strong>, v = <strong>${vFinal.toFixed(1)} m/s</strong><br>` +
    `x(t) = ${v0.toFixed(1)}t + ${(0.5*a).toFixed(2)}t² &nbsp;·&nbsp; v(t) = ${v0.toFixed(1)} + ${a.toFixed(1)}t`;
}
function initMecaMRUV(){ updateMecaMRUV(); }

/* =========================== CHAPITRE 0 — Outils mathématiques : vecteurs et systèmes de coordonnées =========================== */
MECA_CHAPTERS[mecaKey('Outils mathématiques : vecteurs et systèmes de coordonnées')] = {
  objectives: [
    "Manipuler produit scalaire, produit vectoriel et produit mixte de trois vecteurs",
    "Construire une base orthonormée directe à partir d'un vecteur donné",
    "Passer d'un système de coordonnées à un autre : cartésien, cylindrique, sphérique",
    "Analyser une configuration géométrique (points, droites, plans) pour en extraire l'équation ou la représentation paramétrique adaptée",
    "Évaluer, à partir des symétries d'un problème physique, quel système de coordonnées en simplifie le plus le traitement"
  ],
  prereqs: ["Notions d'espace vectoriel", "Produit scalaire et vectoriel (niveau Lycée)", "Fonctions trigonométriques"],
  bodyHtml: `
    <p>Quand Descartes propose en 1637, dans <em>La Géométrie</em>, de repérer chaque point du plan par deux nombres, il ne se doute pas qu'il vient de fonder le langage commun de toute la physique à venir. Trois siècles plus tard, ce même geste — remplacer une figure par des coordonnées, une trajectoire par des fonctions du temps — reste le tout premier réflexe de quiconque veut décrire un mouvement, celui d'une balle de tennis comme celui d'une sonde spatiale.</p>
    <p>Le choix du système de coordonnées n'a rien d'anecdotique : décrire l'orbite d'un satellite en coordonnées cartésiennes est possible, mais laborieux ; la même orbite devient presque évidente en coordonnées adaptées à sa symétrie. Le GPS de ton téléphone ne fonctionne que parce que des ingénieurs jonglent en permanence entre coordonnées cartésiennes (pour les calculs numériques embarqués) et coordonnées sphériques (latitude, longitude, altitude — les coordonnées naturelles d'une Terre presque sphérique).</p>
    <p>À la fin de ce chapitre, tu sauras manier les trois produits vectoriels fondamentaux, construire n'importe quelle base orthonormée directe, passer d'un système de coordonnées à un autre sans effort, et surtout <em>choisir</em> le bon système face à un problème donné — sans doute la compétence la plus rentable de tout le cours de mécanique qui suit.</p>

    <h3>1. Produit scalaire, produit vectoriel, produit mixte</h3>
    <p>Pour deux vecteurs $\\vec{u}$ et $\\vec{v}$, le <strong>produit scalaire</strong> mesure leur « alignement » et le <strong>produit vectoriel</strong> donne un vecteur perpendiculaire aux deux, dont la norme mesure l'aire du parallélogramme qu'ils forment :</p>
    <div class="formula-box">$$\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\varphi \\qquad \\|\\vec{u}\\wedge\\vec{v}\\| = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\sin\\varphi$$</div>
    <p>Le <strong>produit mixte</strong> $(\\vec{u},\\vec{v},\\vec{w}) = \\vec{u}\\cdot(\\vec{v}\\wedge\\vec{w})$ donne le volume (signé) du parallélépipède construit sur les trois vecteurs. Il est nul si et seulement si les trois vecteurs sont <strong>coplanaires</strong> — c'est le critère le plus rapide pour tester la coplanarité de trois vecteurs.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Trois vecteurs $\\vec{u},\\vec{v},\\vec{w}$ sont coplanaires $\\iff$ $(\\vec{u},\\vec{v},\\vec{w})=0$. C'est équivalent à annuler le déterminant $3\\times3$ formé par leurs composantes.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le produit scalaire de deux vecteurs orthogonaux est nul, et le produit vectoriel de deux vecteurs colinéaires l'est aussi. Deux annulations, pour deux raisons opposées : lesquelles ? Essaie de le justifier avec les formules $\\vec u\\cdot\\vec v=\\|\\vec u\\|\\|\\vec v\\|\\cos\\varphi$ et $\\|\\vec u\\wedge\\vec v\\|=\\|\\vec u\\|\\|\\vec v\\|\\sin\\varphi$ avant de continuer.
    </div>

    <h3>2. Construire une base orthonormée directe</h3>
    <p>Méthode pratique : partant d'un vecteur $\\vec{u_1}$ donné, on le norme ; on choisit ensuite n'importe quel vecteur $\\vec{u_1'}$ qui lui est orthogonal (souvent évident par inspection), qu'on norme en $\\vec{u_2}$ ; puis on pose $\\vec{u_3}=\\vec{u_1}\\wedge\\vec{u_2}$ pour obtenir une base orthonormée <strong>directe</strong> — l'ordre du produit vectoriel garantit le caractère direct.</p>
    <table class="mini-table">
      <tr><th>Étape</th><th>Opération</th></tr>
      <tr><td>1</td><td>Normer le vecteur donné : $\\vec{u_1}=\\vec{v}/\\|\\vec{v}\\|$</td></tr>
      <tr><td>2</td><td>Trouver un vecteur orthogonal à $\\vec{u_1}$ (produit scalaire nul) et le normer en $\\vec{u_2}$</td></tr>
      <tr><td>3</td><td>Poser $\\vec{u_3}=\\vec{u_1}\\wedge\\vec{u_2}$ (automatiquement unitaire et orthogonal aux deux premiers)</td></tr>
    </table>
    <p><em>Exemple (d'après un exercice classique) :</em> pour $\\vec{v}=(1,2,2)$, on trouve $\\vec{u_1}=\\big(\\tfrac13,\\tfrac23,\\tfrac23\\big)$ ; le vecteur $(0,1,-1)$ lui est orthogonal, d'où $\\vec{u_2}=\\big(0,\\tfrac{1}{\\sqrt2},-\\tfrac{1}{\\sqrt2}\\big)$ ; et $\\vec{u_3}=\\vec{u_1}\\wedge\\vec{u_2}$ complète la base directe.</p>

    <h3>3. Systèmes de coordonnées : cartésien, cylindrique, sphérique</h3>
    <p>Le choix du système de coordonnées dépend de la symétrie du problème : cartésien pour une symétrie de translation, cylindrique pour une symétrie autour d'un axe, sphérique pour une symétrie autour d'un point.</p>
    <table class="mini-table">
      <tr><th>Système</th><th>Coordonnées</th><th>Relation avec le cartésien</th><th>Base locale</th></tr>
      <tr><td>Cartésien</td><td>$(x,y,z)$</td><td>—</td><td>$(\\vec{u_x},\\vec{u_y},\\vec{u_z})$ fixe</td></tr>
      <tr><td>Cylindrique</td><td>$(\\rho,\\varphi,z)$</td><td>$x=\\rho\\cos\\varphi,\\ y=\\rho\\sin\\varphi,\\ z=z$</td><td>$(\\vec{e_\\rho},\\vec{e_\\varphi},\\vec{u_z})$ mobile</td></tr>
      <tr><td>Sphérique</td><td>$(r,\\theta,\\varphi)$</td><td>$x=r\\sin\\theta\\cos\\varphi,\\ y=r\\sin\\theta\\sin\\varphi,\\ z=r\\cos\\theta$</td><td>$(\\vec{e_r},\\vec{e_\\theta},\\vec{e_\\varphi})$ mobile</td></tr>
    </table>
    <p>Le vecteur position s'écrit alors très simplement : $\\vec{OM}=\\rho\\,\\vec{e_\\rho}+z\\,\\vec{u_z}$ en cylindrique, et $\\vec{OM}=r\\,\\vec{e_r}$ en sphérique. Le déplacement élémentaire (utile pour les longueurs, surfaces et volumes) s'écrit :</p>
    <div class="formula-box">$$d\\vec{OM} = d\\rho\\,\\vec{e_\\rho} + \\rho\\,d\\varphi\\,\\vec{e_\\varphi} + dz\\,\\vec{u_z} \\quad\\text{(cylindrique)}$$</div>
    <p>Et en coordonnées sphériques, en dérivant $\\vec{OM}=r\\,\\vec{e_r}$ par rapport à chaque coordonnée :</p>
    <div class="formula-box">$$d\\vec{OM} = dr\\,\\vec{e_r} + r\\,d\\theta\\,\\vec{e_\\theta} + r\\sin\\theta\\,d\\varphi\\,\\vec{e_\\varphi} \\quad\\text{(sphérique)}$$</div>
    <p>Le facteur $r\\sin\\theta$ devant $d\\varphi$ (et non simplement $r$) est la source d'erreur la plus fréquente : il vient du rayon du « cercle de latitude » à colatitude $\\theta$, qui vaut $r\\sin\\theta$ et non $r$ — vérifie-le en te plaçant à l'équateur ($\\theta=\\pi/2$, le cercle a bien pour rayon $r$) puis au pôle ($\\theta=0$, le cercle est réduit à un point).</p>
    <p>D'où par exemple, pour un cylindre d'axe $(Oz)$, de rayon $R$ et de hauteur $h$ : l'aire du disque de base $S=\\pi R^2$ (en intégrant $\\rho\\,d\\rho\\,d\\varphi$ sur $\\rho\\in[0,R]$) et le volume $V=\\pi R^2 h$ (en intégrant ensuite sur $z\\in[0,h]$). Attention à ne pas confondre cette aire de base avec la <strong>surface latérale</strong> du cylindre, $S_{lat}=2\\pi Rh$ : elle se calcule différemment, en intégrant l'élément de surface $R\\,d\\varphi\\,dz$ sur le rayon fixe $\\rho=R$.</p>
    <div class="key-point">
      <span class="eyebrow">Application — distance sur une sphère</span>
      Pour deux points de latitude/longitude $(l_1,\\lambda_1)$ et $(l_2,\\lambda_2)$ sur une sphère de rayon $R$ (la Terre par exemple), la distance à vol d'oiseau le long du grand cercle vaut $d=R\\arccos\\!\\big[\\sin l_1\\sin l_2+\\cos l_1\\cos l_2\\cos(\\lambda_1-\\lambda_2)\\big]$, obtenue en calculant le produit scalaire $\\vec{OA}\\cdot\\vec{OB}$ des deux points exprimés en coordonnées sphériques (la latitude $l=\\pi/2-\\theta$ étant complémentaire de la colatitude $\\theta$ utilisée plus haut).
    </div>
    <p><strong>Cas limite à surveiller :</strong> au pôle ($\\theta=0$), la coordonnée $\\varphi$ perd tout son sens — une infinité de valeurs de $\\varphi$ décrivent le même point physique. C'est une <strong>singularité de coordonnées</strong> (pas une singularité physique : rien de spécial ne se passe réellement au pôle). Ce genre de piège revient constamment dès qu'on utilise des coordonnées curvilignes, et explique pourquoi les logiciels de navigation par satellite doivent traiter les positions polaires avec des précautions numériques particulières.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si le choix du système de coordonnées ne change jamais la physique d'un problème, pourquoi les physiciens passent-ils autant de temps à en choisir un « bon » ? Qu'est-ce qui est vraiment gagné — ou perdu — en changeant de système ?
    </div>

    <h3>4. Double produit vectoriel</h3>
    <p>Le double produit vectoriel obéit à une identité fondamentale (formule dite « du BAC moins CAB »), très utilisée pour résoudre des équations vectorielles :</p>
    <div class="formula-box">$$\\vec{a}\\wedge(\\vec{b}\\wedge\\vec{c}) = \\vec{b}\\,(\\vec{a}\\cdot\\vec{c}) - \\vec{c}\\,(\\vec{a}\\cdot\\vec{b})$$</div>
    <p>Elle sert par exemple à résoudre une <strong>division vectorielle</strong> $\\vec{u}\\wedge\\vec{x}=\\vec{v}$ (avec $\\vec{u}\\perp\\vec{v}$) : la solution générale est $\\vec{x} = \\vec{w} + \\lambda\\,\\vec{u}$, où $\\vec{w}=\\dfrac{\\vec{u}\\wedge\\vec{v}}{\\|\\vec{u}\\|^2}$ est une solution particulière et $\\lambda\\in\\mathbb{R}$ est arbitraire (il existe une infinité de solutions, alignées sur une droite parallèle à $\\vec{u}$).</p>

    <h3>5. Droites et plans de l'espace</h3>
    <p>Un <strong>plan</strong> passant par $A$ et de vecteur normal $\\vec{n}=(a,b,c)$ a pour équation cartésienne $ax+by+cz+d=0$ (avec $d$ déterminé en imposant que $A$ appartienne au plan). Si l'on connaît deux vecteurs directeurs non colinéaires $\\vec{u},\\vec{v}$ du plan, un vecteur normal est simplement $\\vec{n}=\\vec{u}\\wedge\\vec{v}$.</p>
    <p>Une <strong>droite</strong> peut être décrite soit par une représentation paramétrique $\\vec{OM}=\\vec{OA}+t\\,\\vec{d}$ ($\\vec{d}$ vecteur directeur, $t\\in\\mathbb{R}$), soit comme intersection de deux plans (système de deux équations cartésiennes). Passer de l'une à l'autre forme se fait par simple substitution ou méthode du pivot.</p>

    <h3>6. Problème résolu — combiner les outils</h3>
    <p>Ce type de problème mélange plusieurs notions du chapitre, exactement comme un sujet d'examen. Prends le temps de le refaire toi-même avant de lire la solution.</p>
    <div class="key-point">
      <span class="eyebrow">Énoncé</span>
      Soit le plan $\\mathcal{P}$ passant par $A(1,0,0)$, $B(0,1,0)$ et $C(0,0,1)$. Donne son équation cartésienne, puis calcule la distance du point $O(0,0,0)$ à ce plan.
    </div>
    <p><strong>Étape 1 — vecteurs directeurs du plan.</strong> $\\vec{AB}=(-1,1,0)$ et $\\vec{AC}=(-1,0,1)$ appartiennent tous les deux à $\\mathcal{P}$.</p>
    <p><strong>Étape 2 — vecteur normal.</strong> On applique le produit vectoriel (section 1) : $\\vec{n}=\\vec{AB}\\wedge\\vec{AC}=(1\\times1-0\\times0,\\ 0\\times(-1)-(-1)\\times1,\\ (-1)\\times0-1\\times(-1))=(1,1,1)$.</p>
    <p><strong>Étape 3 — équation cartésienne.</strong> Un plan de normale $(1,1,1)$ s'écrit $x+y+z+d=0$ (section 5) ; en imposant que $A(1,0,0)\\in\\mathcal{P}$ : $1+0+0+d=0 \\Rightarrow d=-1$. Donc $\\mathcal{P}: x+y+z-1=0$.</p>
    <p><strong>Étape 4 — distance de $O$ au plan.</strong> La formule de la distance point-plan, $d(O,\\mathcal{P})=\\dfrac{|ax_0+by_0+cz_0+d|}{\\|\\vec n\\|}$, donne ici $d=\\dfrac{|0+0+0-1|}{\\sqrt{1^2+1^2+1^2}}=\\dfrac{1}{\\sqrt3}=\\dfrac{\\sqrt3}{3}$.</p>
    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir de cette méthode</span>
      Toujours le même enchaînement pour un plan défini par 3 points : (1) deux vecteurs directeurs par différence de points, (2) leur produit vectoriel donne la normale, (3) un point du plan fixe la constante $d$. C'est la méthode la plus fiable, à automatiser.
    </div>

    <h3>7. Frontière de la recherche — repérer l'espace-temps</h3>
    <p>Le 14 septembre 2015, les détecteurs LIGO enregistrent pour la première fois le passage d'une onde gravitationnelle, issue de la fusion de deux trous noirs survenue 1,3 milliard d'années plus tôt (Abbott <em>et al.</em>, <em>Physical Review Letters</em>, 2016 — travail récompensé par le prix Nobel de physique 2017). Pour extraire ce signal minuscule du bruit, les équipes de LIGO/Virgo ont dû repérer avec une précision extrême la position et l'orientation de deux interféromètres distants de milliers de kilomètres — un problème de vecteurs et de systèmes de coordonnées poussé à l'extrême, où l'erreur tolérée sur une longueur de bras de 4 km est plus petite qu'un millième du diamètre d'un proton.</p>
    <p><strong>Question ouverte :</strong> localiser précisément la source d'une onde gravitationnelle dans le ciel demande de combiner les temps d'arrivée du signal sur (au moins) trois détecteurs répartis sur Terre — exactement le problème de triangulation en coordonnées sphériques que tu commences à maîtriser ici. Avec seulement deux ou trois détecteurs en fonctionnement simultané, cette localisation reste aujourd'hui imprécise (souvent plusieurs centaines de degrés carrés de ciel) : améliorer cette précision, pour permettre aux télescopes optiques de pointer vers la source avant que sa contrepartie lumineuse ne s'estompe, est un défi actif de l'astronomie multi-messagers.</p>
    <p><strong>Technologie émergente :</strong> les futurs détecteurs spatiaux comme LISA (Laser Interferometer Space Antenna, lancement prévu par l'ESA dans les années 2030) placeront trois satellites en triangle dans l'espace, séparés de millions de kilomètres, et devront suivre en temps réel l'orientation relative de ce triangle géant — un problème de bases orthonormées mobiles directement héritier des outils de ce chapitre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Problème physique → symétrie identifiée → système de coordonnées adapté → vecteur position $\\vec{OM}$ → déplacement élémentaire $d\\vec{OM}$
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\vec a\\wedge(\\vec b\\wedge\\vec c) = \\vec b\\,(\\vec a\\cdot\\vec c) - \\vec c\\,(\\vec a\\cdot\\vec b)$$
      C'est la formule qui revient le plus souvent pour transformer une expression vectorielle compliquée en une expression simple — retiens-la avant toute chose.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Produit mixte $(\\vec u,\\vec v,\\vec w)=\\vec u\\cdot(\\vec v\\wedge\\vec w)$ : nul $\\iff$ vecteurs coplanaires</li>
        <li>Base orthonormée directe : normer, trouver un orthogonal, puis fermer par un produit vectoriel</li>
        <li>Cylindrique : $x=\\rho\\cos\\varphi,\\ y=\\rho\\sin\\varphi,\\ z=z$ — Sphérique : $x=r\\sin\\theta\\cos\\varphi,\\ y=r\\sin\\theta\\sin\\varphi,\\ z=r\\cos\\theta$</li>
        <li>Déplacement élémentaire sphérique : $d\\vec{OM}=dr\\,\\vec{e_r}+r\\,d\\theta\\,\\vec{e_\\theta}+r\\sin\\theta\\,d\\varphi\\,\\vec{e_\\varphi}$ — ne pas oublier le facteur $r\\sin\\theta$</li>
        <li>Double produit vectoriel : $\\vec a\\wedge(\\vec b\\wedge\\vec c)=\\vec b(\\vec a\\cdot\\vec c)-\\vec c(\\vec a\\cdot\\vec b)$</li>
        <li>Plan : équation $ax+by+cz+d=0$, normale $\\vec n=\\vec u\\wedge\\vec v$ ; droite : $\\vec{OM}=\\vec{OA}+t\\vec d$</li>
        <li>Plan défini par 3 points : deux vecteurs différence → produit vectoriel = normale → un point fixe $d$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre l'angle $\\theta$ (colatitude, depuis l'axe $Oz$) et la latitude géographique (comptée depuis l'équateur) — elles sont complémentaires : $\\theta = \\pi/2 - \\text{latitude}$</li>
        <li>Oublier que le produit vectoriel n'est pas commutatif : $\\vec u\\wedge\\vec v=-\\vec v\\wedge\\vec u$</li>
        <li>Utiliser le produit scalaire (donne un nombre) là où un produit vectoriel (donne un vecteur) est nécessaire, ou inversement</li>
        <li>Croire qu'une division vectorielle a une solution unique — dès qu'elle existe, elle est en général définie à $\\lambda\\vec u$ près</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le point $M(2,\\,2\\sqrt3,\\,4)$ a pour coordonnées cylindriques $(\\rho,\\varphi,z)$ avec :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca0e1" value="right"> ρ = 4, φ = π/3, z = 4</label>
          <label class="option"><input type="radio" name="meca0e1" value="wrong"> ρ = 2, φ = π/6, z = 4</label>
          <label class="option"><input type="radio" name="meca0e1" value="wrong"> ρ = 4, φ = π/6, z = 4</label>
          <label class="option"><input type="radio" name="meca0e1" value="wrong"> ρ = 2√3, φ = π/3, z = 2</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca0e1','meca0fb1','Correct — ρ=√(x²+y²)=√(4+12)=4, et tanφ=y/x=√3 donc φ=π/3 ; z=4 directement.','Calcule d\\'abord ρ=√(x²+y²), puis φ à partir de tanφ=y/x.')">Vérifier</button>
        <div class="feedback" id="meca0fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Les vecteurs $(1,0,a)$, $(a,1,0)$ et $(0,a,1)$ sont coplanaires pour :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca0e2" value="wrong"> a = 0 uniquement</label>
          <label class="option"><input type="radio" name="meca0e2" value="wrong"> a = 1 uniquement</label>
          <label class="option"><input type="radio" name="meca0e2" value="right"> a = −1</label>
          <label class="option"><input type="radio" name="meca0e2" value="wrong"> aucune valeur de a ne convient</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca0e2','meca0fb2','Correct — le produit mixte des trois vecteurs vaut 1+a³ ; il s\\'annule pour a³=−1, soit a=−1 (seule racine réelle).','Calcule le produit mixte (déterminant 3×3) des trois vecteurs et annule-le.')">Vérifier</button>
        <div class="feedback" id="meca0fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">D'après la formule du double produit vectoriel, $\\vec a\\wedge(\\vec b\\wedge\\vec c)$ est égal à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca0e3" value="wrong"> $\\vec c(\\vec a\\cdot\\vec b)-\\vec b(\\vec a\\cdot\\vec c)$</label>
          <label class="option"><input type="radio" name="meca0e3" value="right"> $\\vec b(\\vec a\\cdot\\vec c)-\\vec c(\\vec a\\cdot\\vec b)$</label>
          <label class="option"><input type="radio" name="meca0e3" value="wrong"> $\\vec a(\\vec b\\cdot\\vec c)$</label>
          <label class="option"><input type="radio" name="meca0e3" value="wrong"> $(\\vec a\\cdot\\vec b)(\\vec a\\cdot\\vec c)$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca0e3','meca0fb3','Correct — c\\'est la formule « BAC moins CAB » : le vecteur du milieu (b) reçoit le produit scalaire des deux extrêmes (a·c), et inversement pour c.','Retiens le moyen mnémotechnique « BAC moins CAB » : quel vecteur reçoit quel produit scalaire ?')">Vérifier</button>
        <div class="feedback" id="meca0fb3"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4</span>
        <p class="q">Avec $\\vec u=(1,0,0)$ et $\\vec v=(0,1,0)$ (bien orthogonaux), la solution particulière $\\vec w$ de l'équation $\\vec u\\wedge\\vec x=\\vec v$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca0e4" value="right"> (0, 0, 1)</label>
          <label class="option"><input type="radio" name="meca0e4" value="wrong"> (0, 1, 0)</label>
          <label class="option"><input type="radio" name="meca0e4" value="wrong"> (1, 0, 0)</label>
          <label class="option"><input type="radio" name="meca0e4" value="wrong"> (0, 0, -1)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca0e4','meca0fb4','Correct — w=(u∧v)/‖u‖² = (1,0,0)∧(0,1,0) = (0,0,1), et ‖u‖²=1. La solution générale est donc x=(0,0,1)+λ(1,0,0).','Utilise la formule w=(u∧v)/‖u‖² donnée dans la section 4.')">Vérifier</button>
        <div class="feedback" id="meca0fb4"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 5</span>
        <p class="q">Le point de coordonnées sphériques $r=2$, $\\theta=\\pi/2$, $\\varphi=\\pi/2$ a pour coordonnées cartésiennes :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca0e5" value="right"> (0, 2, 0)</label>
          <label class="option"><input type="radio" name="meca0e5" value="wrong"> (2, 0, 0)</label>
          <label class="option"><input type="radio" name="meca0e5" value="wrong"> (0, 0, 2)</label>
          <label class="option"><input type="radio" name="meca0e5" value="wrong"> (2, 2, 0)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca0e5','meca0fb5','Correct — x=r sinθ cosφ = 2·1·0 = 0 ; y=r sinθ sinφ = 2·1·1 = 2 ; z=r cosθ = 2·0 = 0.','θ=π/2 place le point dans le plan équatorial (z=0) ; φ=π/2 le place sur l\\'axe des y.')">Vérifier</button>
        <div class="feedback" id="meca0fb5"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 6</span>
        <p class="q">Le plan passant par $A(2,1,-1)$ de normale $\\vec n=(2,-1,3)$ a pour équation $2x-y+3z+d=0$ avec $d$ égal à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca0e6" value="right"> 0</label>
          <label class="option"><input type="radio" name="meca0e6" value="wrong"> 6</label>
          <label class="option"><input type="radio" name="meca0e6" value="wrong"> -6</label>
          <label class="option"><input type="radio" name="meca0e6" value="wrong"> 4</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca0e6','meca0fb6','Correct — en imposant que A appartienne au plan : 2(2)-1+3(-1)+d=0 → 4-1-3+d=0 → d=0.','Remplace les coordonnées de A dans l\\'équation et résous pour d, comme dans le problème résolu de la section 6.')">Vérifier</button>
        <div class="feedback" id="meca0fb6"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 7 — à modéliser toi-même</span>
        <p class="q">Trois détecteurs d'ondes gravitationnelles sont posés à la surface de la Terre, à des positions connues en coordonnées sphériques (latitude, longitude). Une onde gravitationnelle atteint les trois détecteurs à des instants légèrement différents, mesurés avec une précision de l'ordre de la milliseconde. Propose une démarche (sans forcément aller jusqu'au calcul complet) pour remonter, à partir de ces trois temps d'arrivée, à la direction du ciel d'où provient l'onde. Quelles notions de ce chapitre mobiliserais-tu ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : pense à la différence de marche entre deux détecteurs comme à une projection du vecteur direction de propagation sur le vecteur reliant les deux détecteurs — quel produit vectoriel/scalaire du chapitre reconnais-tu là-dedans ?</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'espace avait 4 dimensions spatiales au lieu de 3 : le produit vectoriel, tel que défini ici, existerait-il encore sous la même forme ?</li>
        <li>Pourquoi les longitudes et latitudes utilisées en géographie ne sont-elles pas exactement les coordonnées sphériques $(\\theta,\\varphi)$ des mathématiciens ? Quelle convention diffère ?</li>
        <li>Quelle serait la conséquence, pour la navigation par satellite, si l'on oubliait systématiquement le facteur $r\\sin\\theta$ dans le déplacement élémentaire sphérique ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>R. Descartes, <em>La Géométrie</em>, 1637 — l'ouvrage fondateur de la géométrie analytique et des coordonnées.</li>
        <li>J.-P. Pérez, <em>Mécanique — Fondements et applications</em>, Dunod (édition de référence pour les outils vectoriels en physique française).</li>
        <li>B. P. Abbott <em>et al.</em> (collaboration LIGO/Virgo), « Observation of Gravitational Waves from a Binary Black Hole Merger », <em>Physical Review Letters</em>, 2016.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Ces outils vectoriels peuvent sembler austères pris isolément, mais ils sont la grammaire silencieuse de toute la mécanique qui suit : dans le prochain chapitre, « Cinématique du point », tu verras vitesse et accélération surgir directement des dérivées de $\\vec{OM}$ que tu viens d'apprendre à construire. Comme le disait Newton dans une lettre de 1675 : « Si j'ai vu plus loin, c'est en me tenant sur les épaules de géants. » Tu viens de poser les tiennes.</p>
  `
};

MECA_NOVA_KB[mecaKey('Outils mathématiques : vecteurs et systèmes de coordonnées')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Outils mathématiques : vecteurs et systèmes de coordonnées ». Demande-moi comment construire une base orthonormée directe, comment convertir entre coordonnées cylindriques et sphériques, ou un indice sur un exercice.",
  rules: [
    { test:/produit mixte|coplanaire/i, replies:["Le produit mixte (u,v,w) = u·(v∧w) donne le volume signé du parallélépipède formé par les trois vecteurs. Il est nul si et seulement si les trois vecteurs sont coplanaires."] },
    { test:/base orthonorm[ée]e|directe/i, replies:["Pour construire une base orthonormée directe : normer le premier vecteur, trouver un vecteur orthogonal et le normer, puis prendre le produit vectoriel des deux premiers pour obtenir le troisième — l'ordre garantit que la base est directe."] },
    { test:/cylindrique|sph[ée]rique|coordonn[ée]es/i, replies:["Cylindrique : x=ρcosφ, y=ρsinφ, z=z (symétrie d'axe). Sphérique : x=r sinθ cosφ, y=r sinθ sinφ, z=r cosθ (symétrie de point). Le choix dépend de la symétrie du problème."] },
    { test:/double produit vectoriel|bac.*cab/i, replies:["a∧(b∧c) = b(a·c) − c(a·b) : moyen mnémotechnique « BAC moins CAB ». Très utile pour résoudre des équations vectorielles comme u∧x=v."] },
    { test:/plan|droite/i, replies:["Un plan de vecteur normal n=(a,b,c) a pour équation ax+by+cz+d=0. Si tu as deux vecteurs directeurs u,v du plan, alors n=u∧v. Une droite se décrit par OM=OA+t·d."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : calcule d'abord ρ=√(x²+y²).","Indice niveau 2 : ρ=√(4+12)=4, et tanφ=y/x=√3.","Indice niveau 3 : φ=π/3, z=4 directement."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : calcule le produit mixte (déterminant) des trois vecteurs.","Indice niveau 2 : le déterminant vaut 1+a³.","Indice niveau 3 : 1+a³=0 donne a=−1."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : rappelle-toi « BAC moins CAB ».","Indice niveau 2 : le vecteur du milieu (b) reçoit le produit scalaire des deux extrêmes.","Indice niveau 3 : b(a·c) − c(a·b)."] }
  ]
};

/* =========================== CHAPITRE 1 — Cinématique du point =========================== */
MECA_CHAPTERS[mecaKey('Cinématique du point')] = {
  objectives: [
    "Définir référentiel, repère d'espace et repère de temps, et situer un point par son vecteur position",
    "Calculer les vecteurs vitesse et accélération d'un point matériel dans différents systèmes de coordonnées",
    "Utiliser la base polaire et la base de Frenet pour décrire un mouvement curviligne",
    "Établir et exploiter les équations horaires d'un mouvement rectiligne uniforme ou uniformément varié",
    "Analyser un mouvement complexe (tir oblique, mouvement circulaire) pour évaluer quelle base de projection (cartésienne, polaire, Frenet) en simplifie le traitement"
  ],
  prereqs: ["Outils mathématiques pour la physique"],
  bodyHtml: `
    <p>Galilée, en lâchant (au moins dans la légende) des boulets depuis la tour de Pise, cherchait à répondre à une question en apparence enfantine : comment décrire, précisément, la chute d'un objet ? Il lui a fallu inventer un langage entièrement nouveau — le premier chapitre d'une discipline qui deviendra la cinématique — pour transformer une observation qualitative (« ça tombe ») en une loi quantitative et prédictive.</p>
    <p>Ce langage est partout autour de toi, bien au-delà des salles de cours : c'est lui que l'ingénieur automobile utilise pour calculer une distance de freinage, lui que la NASA utilise pour ajuster la trajectoire d'une sonde interplanétaire au mètre près, et lui encore que ton téléphone utilise pour estimer ta vitesse de déplacement à partir du GPS.</p>
    <p>Dans ce chapitre, on ne s'intéresse volontairement à rien d'autre qu'au <strong>mouvement lui-même</strong> — jamais à ses causes. Tu apprendras à décrire n'importe quelle trajectoire dans trois bases différentes (cartésienne, polaire, Frenet), et à choisir la bonne selon la géométrie du problème — une compétence que tu réutiliseras dans chaque chapitre de mécanique à venir.</p>

    <h3>1. Référentiel et repère</h3>
    <p>Un <strong>référentiel</strong> est un solide (ou un ensemble de points fixes les uns par rapport aux autres) par rapport auquel on étudie un mouvement — il n'existe pas de mouvement dans l'absolu, seulement un mouvement <em>relatif</em> à un référentiel choisi. Pour décrire quantitativement une position, on associe au référentiel un <strong>repère d'espace</strong> (une origine $O$ et une base de vecteurs) et un <strong>repère de temps</strong> (une origine des dates et une unité).</p>
    <div class="key-point">
      <span class="eyebrow">Référentiel galiléen</span>
      Un référentiel est dit <strong>galiléen</strong> (ou inertiel) si le principe d'inertie y est vérifié : un point matériel isolé y est soit immobile, soit animé d'un mouvement rectiligne uniforme. Le référentiel terrestre est galiléen en très bonne approximation pour la plupart des expériences de laboratoire.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si « il n'existe pas de mouvement dans l'absolu », a-t-on le droit de dire qu'un train roule à 200 km/h ? Par rapport à quoi cette vitesse est-elle définie, et cette précision change-t-elle quelque chose à ce que ressentent les passagers ?
    </div>

    <h3>2. Vecteur position, trajectoire</h3>
    <p>La position d'un point matériel $M$ à l'instant $t$ est repérée par le <strong>vecteur position</strong> $\\vec{OM}(t)$. L'ensemble des positions successives de $M$ au cours du temps dessine sa <strong>trajectoire</strong>. En coordonnées cartésiennes :</p>
    <div class="formula-box">$$\\vec{OM}(t) = x(t)\\,\\vec{u_x} + y(t)\\,\\vec{u_y} + z(t)\\,\\vec{u_z}$$</div>

    <h3>3. Vecteur vitesse et vecteur accélération</h3>
    <p>Le <strong>vecteur vitesse</strong> est la dérivée du vecteur position par rapport au temps ; le <strong>vecteur accélération</strong> est la dérivée du vecteur vitesse (donc la dérivée seconde de la position) :</p>
    <div class="formula-box">$$\\vec{v}(t) = \\frac{d\\vec{OM}}{dt} \\qquad \\vec{a}(t) = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{OM}}{dt^2}$$</div>
    <p>En coordonnées cartésiennes, la base $(\\vec{u_x},\\vec{u_y},\\vec{u_z})$ est fixe : on dérive donc simplement chaque coordonnée, $v_x = \\dot x$, $a_x = \\ddot x$, etc.</p>

    <h3>4. Base polaire (mouvement plan)</h3>
    <p>Pour un mouvement plan, il est souvent plus commode d'utiliser les coordonnées polaires $(r,\\theta)$, avec la base mobile $(\\vec{u_r},\\vec{u_\\theta})$ : $\\vec{u_r}$ pointe du centre vers $M$, $\\vec{u_\\theta}$ lui est perpendiculaire, dans le sens des $\\theta$ croissants.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 100" width="100%">
          <line x1="60" y1="90" x2="130" y2="90" stroke="#3A4658" stroke-width="1"/>
          <line x1="60" y1="90" x2="60" y2="20" stroke="#3A4658" stroke-width="1"/>
          <line x1="60" y1="90" x2="101" y2="61.3" stroke="#EAF0FB" stroke-width="1.6"/>
          <circle cx="101" cy="61.3" r="3" fill="#F0B94D"/>
          <text x="106" y="60" font-family="IBM Plex Mono" font-size="10" fill="#F0B94D">M</text>
          <line x1="101" y1="61.3" x2="119" y2="48.7" stroke="#4C7CFF" stroke-width="1.8" marker-end="url(#mecaArrEr)"/>
          <text x="121" y="46" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">u_r</text>
          <line x1="101" y1="61.3" x2="88.4" y2="43.3" stroke="#2DD4C4" stroke-width="1.8" marker-end="url(#mecaArrEt)"/>
          <text x="72" y="40" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">u_θ</text>
          <path d="M75,90 A15,15 0 0,0 68,79" fill="none" stroke="#5A6472" stroke-width="1"/>
          <text x="70" y="86" font-family="IBM Plex Mono" font-size="8" fill="#5A6472">θ</text>
          <defs>
            <marker id="mecaArrEr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#4C7CFF"/></marker>
            <marker id="mecaArrEt" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker>
          </defs>
        </svg>
        <span>Base polaire (u_r, u_θ) : deux vecteurs orthogonaux, mobiles, attachés au point M</span>
      </div>
    </div>
    <p>Comme cette base tourne avec $M$, il faut dériver aussi les vecteurs de base ($\\dot{\\vec{u_r}}=\\dot\\theta\\,\\vec{u_\\theta}$, $\\dot{\\vec{u_\\theta}}=-\\dot\\theta\\,\\vec{u_r}$), ce qui donne :</p>
    <div class="formula-box">$$\\vec{v} = \\dot r\\,\\vec{u_r} + r\\dot\\theta\\,\\vec{u_\\theta} \\qquad \\vec{a} = (\\ddot r - r\\dot\\theta^2)\\,\\vec{u_r} + (r\\ddot\\theta + 2\\dot r\\dot\\theta)\\,\\vec{u_\\theta}$$</div>

    <h3>5. Base de Frenet (tangentielle-normale)</h3>
    <p>Pour une trajectoire curviligne quelconque, la <strong>base de Frenet</strong> $(\\vec{T},\\vec{N})$ suit le point : $\\vec{T}$ est tangent à la trajectoire (dans le sens du mouvement), $\\vec{N}$ lui est perpendiculaire, dirigé vers le centre de courbure. Dans cette base, l'accélération se décompose en deux termes physiquement très parlants :</p>
    <div class="formula-box">$$\\vec{a} = \\underbrace{\\frac{dv}{dt}}_{a_T}\\,\\vec{T} + \\underbrace{\\frac{v^2}{R}}_{a_N}\\,\\vec{N}$$</div>
    <table class="mini-table">
      <tr><th>Composante</th><th>Signification</th></tr>
      <tr><td>Accélération tangentielle $a_T=\\dot v$</td><td>traduit le changement de la <strong>norme</strong> de la vitesse (accélère/freine)</td></tr>
      <tr><td>Accélération normale $a_N=v^2/R$</td><td>traduit le changement de <strong>direction</strong> de la vitesse (toujours vers le centre de courbure)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Un mouvement est <strong>rectiligne</strong> si et seulement si $a_N=0$ (rayon de courbure infini) ; il est <strong>uniforme</strong> (vitesse de norme constante) si et seulement si $a_T=0$. Un mouvement circulaire uniforme a donc $a_T=0$ mais $a_N=v^2/R\\neq0$ : il y a bien une accélération, purement centripète.
    </div>
    <p><strong>Contre-exemple à méditer :</strong> peut-on avoir une vitesse non nulle et une accélération nulle sur une trajectoire courbe ? Non — dès que $v\\neq0$ et $R$ fini, $a_N=v^2/R\\neq0$. La seule façon d'avoir $\\vec a=\\vec 0$ sur une trajectoire non rectiligne serait d'avoir $v=0$ à cet instant précis (un point de rebroussement), ce qui est un cas limite, pas une exception à la règle.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Dans un looping de montagnes russes parcouru à vitesse constante, l'accélération tangentielle est nulle en tout point. Le passager ressent-il pour autant « aucune accélération » ? Distingue ce que dit le calcul de ce que ressent le corps.
    </div>

    <h3>6. Mouvements rectilignes de référence</h3>
    <table class="mini-table">
      <tr><th>Mouvement</th><th>Accélération</th><th>Vitesse</th><th>Position</th></tr>
      <tr><td>Rectiligne uniforme (MRU)</td><td>$a=0$</td><td>$v=v_0$ (constante)</td><td>$x(t)=x_0+v_0t$</td></tr>
      <tr><td>Rectiligne uniformément varié (MRUV)</td><td>$a$ = constante</td><td>$v(t)=v_0+at$</td><td>$x(t)=x_0+v_0t+\\frac12at^2$</td></tr>
    </table>
    <p>Une relation indépendante du temps, très utile en pratique, relie directement vitesse et position pour un MRUV : $v^2 = v_0^2 + 2a(x-x_0)$.</p>

    <h3>7. Mouvement parabolique (tir oblique)</h3>
    <p>C'est l'application la plus classique combinant tout ce qui précède : un point est lancé avec une vitesse initiale $\\vec{v_0}$ faisant un angle $\\alpha$ avec l'horizontale, sous la seule action de la pesanteur $\\vec g=-g\\,\\vec{u_y}$ (on néglige les frottements). Le mouvement se décompose en <strong>deux mouvements rectilignes indépendants</strong> : MRU horizontal, MRUV vertical.</p>
    <div class="formula-box">$$x(t) = v_0\\cos\\alpha\\ t \\qquad y(t) = v_0\\sin\\alpha\\ t - \\frac12 g t^2$$</div>
    <p>En éliminant $t$ (via $t=x/(v_0\\cos\\alpha)$), on obtient l'équation cartésienne de la trajectoire — bien une parabole, comme le nom l'indique :</p>
    <div class="formula-box">$$y(x) = x\\tan\\alpha - \\frac{g}{2v_0^2\\cos^2\\alpha}\\,x^2$$</div>
    <p>Deux résultats à connaître par cœur, obtenus en cherchant respectivement le sommet ($v_y=0$) et le retour à $y=0$ :</p>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Formule</th><th>Obtenue en...</th></tr>
      <tr><td>Portée $x_{max}$ (retour au sol)</td><td>$\\dfrac{v_0^2\\sin(2\\alpha)}{g}$</td><td>résolvant $y(x)=0$ (racine non nulle)</td></tr>
      <tr><td>Flèche $y_{max}$ (hauteur max)</td><td>$\\dfrac{v_0^2\\sin^2\\alpha}{2g}$</td><td>annulant $v_y=v_0\\sin\\alpha-gt$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La portée est maximale pour $\\alpha=45°$ (puisque $\\sin(2\\alpha)$ est maximal quand $2\\alpha=90°$) — un résultat intuitif que tout joueur de pétanque ou de basket connaît sans le démontrer !
    </div>

    <h3>8. Frontière de la recherche — suivre une trajectoire dans l'incertain</h3>
    <p>Les équations de ce chapitre supposent une trajectoire parfaitement connue. Or, pour un robot mobile, un drone ou une voiture autonome, la position n'est jamais connue exactement : elle est estimée à partir de capteurs bruités (GPS, caméras, centrale inertielle). Le <strong>filtre de Kalman</strong>, développé par Rudolf Kálmán en 1960, combine ces mesures imparfaites avec un modèle cinématique — exactement les équations de ce chapitre — pour produire la meilleure estimation possible de la position et de la vitesse. C'est cet algorithme, ou ses descendants, qui a guidé la navigation du programme Apollo puis qui équipe aujourd'hui la quasi-totalité des systèmes de navigation autonome.</p>
    <p><strong>Question ouverte :</strong> pour un essaim de dizaines de drones évoluant en formation serrée, comment chaque appareil peut-il estimer sa trajectoire relative aux autres avec une latence quasi nulle, sans dépendre d'un GPS parfois indisponible (intérieur de bâtiment, zone urbaine dense) ? C'est un problème de recherche actif en robotique, à la frontière entre cinématique, traitement du signal et intelligence artificielle embarquée.</p>
    <p><strong>Technologie émergente :</strong> les capteurs inertiels quantiques (utilisant l'interférométrie atomique) promettent de mesurer accélération et vitesse angulaire sans dérive et sans GPS — une cinématique embarquée d'une précision inédite, activement développée pour la navigation sous-marine et spatiale.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Vecteur position $\\vec{OM}(t)$ → dérivation → vitesse $\\vec v(t)$ → dérivation → accélération $\\vec a(t)$
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\vec{a} = \\frac{dv}{dt}\\,\\vec{T} + \\frac{v^2}{R}\\,\\vec{N}$$
      Toute la richesse d'un mouvement curviligne tient dans ces deux termes : l'un change la norme de la vitesse, l'autre sa direction. Aucun autre effet n'est possible.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Vitesse = dérivée première de la position ; accélération = dérivée seconde</li>
        <li>Base polaire : v = ṙ u_r + rθ̇ u_θ (il faut dériver aussi les vecteurs de base, car ils tournent)</li>
        <li>Base de Frenet : a_T (change la norme de v) et a_N=v²/R (change sa direction, vers le centre)</li>
        <li>MRUV : x(t)=x0+v0t+½at², v(t)=v0+at, et v²=v0²+2a(x−x0)</li>
        <li>Tir oblique : x=v0cosα·t, y=v0sinα·t−½gt² ; portée x_max=v0²sin(2α)/g, maximale à 45°</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de dériver les vecteurs de base (u_r, u_θ) en coordonnées polaires — ils ne sont PAS fixes, contrairement à (u_x, u_y)</li>
        <li>Croire qu'un mouvement circulaire uniforme a une accélération nulle — a_N=v²/R est non nul, seule a_T l'est</li>
        <li>Confondre vitesse moyenne (Δx/Δt sur un intervalle) et vitesse instantanée (dx/dt à un instant précis)</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — position et vitesse d'un MRUV</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Fais varier la vitesse initiale v₀ et l'accélération a : observe l'effet sur les courbes x(t) et v(t).</p>
      <div class="sim-2col">
        <div>
          <svg viewBox="0 0 200 90" width="200" height="90">
            <line x1="20" y1="75" x2="190" y2="75" stroke="#3A4658" stroke-width="1"/>
            <line x1="20" y1="15" x2="20" y2="75" stroke="#3A4658" stroke-width="1"/>
            <polyline id="mecaXCurve" points="" stroke="#4C7CFF" stroke-width="2" fill="none"/>
            <text x="150" y="12" font-family="IBM Plex Mono" font-size="8" fill="#4C7CFF">x(t)</text>
          </svg>
          <svg viewBox="0 0 200 90" width="200" height="90">
            <line x1="20" y1="75" x2="190" y2="75" stroke="#3A4658" stroke-width="1"/>
            <line x1="20" y1="15" x2="20" y2="75" stroke="#3A4658" stroke-width="1"/>
            <polyline id="mecaVCurve" points="" stroke="#F0B94D" stroke-width="2" fill="none"/>
            <text x="150" y="12" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">v(t)</text>
          </svg>
        </div>
        <div class="sim-controls">
          <label>v₀ (m/s) : <span id="mecaV0Val">2.0</span></label>
          <input type="range" id="mecaV0" min="-10" max="10" step="0.5" value="2" oninput="updateMecaMRUV()">
          <label>a (m/s²) : <span id="mecaAVal">1.0</span></label>
          <input type="range" id="mecaA" min="-5" max="5" step="0.5" value="1" oninput="updateMecaMRUV()">
          <div class="sim-readout" id="mecaMRUVReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour un mouvement circulaire uniforme, l'accélération tangentielle $a_T$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca1e1" value="right"> 0</label>
          <label class="option"><input type="radio" name="meca1e1" value="wrong"> v²/R</label>
          <label class="option"><input type="radio" name="meca1e1" value="wrong"> Rω²</label>
          <label class="option"><input type="radio" name="meca1e1" value="wrong"> une valeur qui dépend de R</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca1e1','meca1fb1','Correct — « uniforme » signifie que la norme de la vitesse est constante, donc a_T=dv/dt=0.','« Uniforme » veut dire que la NORME de la vitesse ne change pas — quelle composante d\\'accélération cela annule-t-il ?')">Vérifier</button>
        <div class="feedback" id="meca1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une voiture freine uniformément de 20 m/s à l'arrêt sur 40 m. Son accélération vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca1e2" value="wrong"> −10 m/s²</label>
          <label class="option"><input type="radio" name="meca1e2" value="right"> −5 m/s²</label>
          <label class="option"><input type="radio" name="meca1e2" value="wrong"> −2,5 m/s²</label>
          <label class="option"><input type="radio" name="meca1e2" value="wrong"> −0,5 m/s²</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca1e2','meca1fb2','Correct — v²=v0²+2a(x−x0) donne 0=20²+2a(40), donc a=−400/80=−5 m/s².','Utilise v² = v0² + 2a·Δx avec v=0, v0=20, Δx=40 (pas besoin du temps).')">Vérifier</button>
        <div class="feedback" id="meca1fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">En coordonnées polaires, si r est constant (mouvement circulaire), la vitesse se réduit à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca1e3" value="wrong"> v = ṙ u_r</label>
          <label class="option"><input type="radio" name="meca1e3" value="right"> v = rθ̇ u_θ</label>
          <label class="option"><input type="radio" name="meca1e3" value="wrong"> v = 0</label>
          <label class="option"><input type="radio" name="meca1e3" value="wrong"> v = r u_r</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca1e3','meca1fb3','Correct — si r est constant, ṙ=0, donc le terme radial disparaît et il ne reste que le terme orthoradial rθ̇ u_θ (v est bien tangent au cercle).','Si r est constant, que devient ṙ dans la formule générale v = ṙ u_r + rθ̇ u_θ ?')">Vérifier</button>
        <div class="feedback" id="meca1fb3"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4</span>
        <p class="q">Un point M a pour coordonnées cartésiennes x(t) = t + 1 et y(t) = t² + 1. Sa trajectoire est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca1e4" value="wrong"> une droite</label>
          <label class="option"><input type="radio" name="meca1e4" value="right"> une parabole</label>
          <label class="option"><input type="radio" name="meca1e4" value="wrong"> un cercle</label>
          <label class="option"><input type="radio" name="meca1e4" value="wrong"> une ellipse</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca1e4','meca1fb4','Correct — en éliminant t (t=x−1), on obtient y=(x−1)²+1, l\\'équation d\\'une parabole.','Exprime t en fonction de x, puis remplace-le dans y(t) pour obtenir y(x).')">Vérifier</button>
        <div class="feedback" id="meca1fb4"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 5</span>
        <p class="q">Un point M se déplace sur un cercle de rayon r avec une vitesse angulaire θ̇=ω constante. Le vecteur accélération dans la base polaire vaut alors :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca1e5" value="wrong"> a = rω² u_θ</label>
          <label class="option"><input type="radio" name="meca1e5" value="right"> a = −rω² u_r</label>
          <label class="option"><input type="radio" name="meca1e5" value="wrong"> a = 0</label>
          <label class="option"><input type="radio" name="meca1e5" value="wrong"> a = rω̇ u_θ</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca1e5','meca1fb5','Correct — avec r constant (ṙ=r̈=0) et θ̈=0 (ω constant), la formule générale a=(r̈−rθ̇²)u_r+(rθ̈+2ṙθ̇)u_θ se réduit à a=−rω²u_r : c\\'est l\\'accélération centripète, dirigée vers le centre.','Repars de a=(r̈−rθ̇²)u_r+(rθ̈+2ṙθ̇)u_θ et annule tous les termes contenant ṙ, r̈ ou θ̈.')">Vérifier</button>
        <div class="feedback" id="meca1fb5"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 6</span>
        <p class="q">Un projectile est lancé à $v_0=20$ m/s avec un angle $\\alpha=45°$ (on prend $g=10$ m/s²). Sa portée $x_{max}$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca1e6" value="wrong"> 20 m</label>
          <label class="option"><input type="radio" name="meca1e6" value="right"> 40 m</label>
          <label class="option"><input type="radio" name="meca1e6" value="wrong"> 10 m</label>
          <label class="option"><input type="radio" name="meca1e6" value="wrong"> 80 m</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca1e6','meca1fb6','Correct — x_max=v0²sin(2α)/g = 400×sin(90°)/10 = 400/10 = 40 m.','Utilise directement la formule de la portée : x_max = v0² sin(2α) / g, avec sin(90°)=1.')">Vérifier</button>
        <div class="feedback" id="meca1fb6"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 7 — à modéliser toi-même</span>
        <p class="q">Un cycliste aborde un virage à rayon de courbure variable (par exemple une chicane) en maintenant sa vitesse constante en norme. Décris qualitativement comment évoluent $a_T$ et $a_N$ le long de la trajectoire, et propose une esquisse de la façon dont tu modéliserais $R(t)$ pour une chicane en forme de S. Quelles données faudrait-il mesurer sur le terrain pour aller plus loin ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : repense au tableau de la section 5 — quelle composante d'accélération reste rigoureusement nulle tout au long du mouvement, quel que soit R(t) ?</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la Terre n'était pas (à peu près) un référentiel galiléen : quelles expériences de la vie quotidienne en seraient les premières affectées ?</li>
        <li>Pourquoi la base de Frenet, si naturelle pour décrire l'accélération, n'est-elle presque jamais utilisée pour écrire le vecteur position lui-même ?</li>
        <li>Quelle serait la conséquence, pour un jeu vidéo de tir, d'un moteur physique qui négligerait le terme d'accélération centripète $a_N$ dans les trajectoires courbes ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Galilée, <em>Discours concernant deux sciences nouvelles</em>, 1638 — première étude quantitative de la chute et du mouvement parabolique.</li>
        <li>J.-P. Pérez, <em>Mécanique — Fondements et applications</em>, Dunod (chapitres de cinématique du point).</li>
        <li>R. E. Kálmán, « A New Approach to Linear Filtering and Prediction Problems », <em>Journal of Basic Engineering</em>, 1960 — l'article fondateur du filtre de Kalman.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais maintenant décrire n'importe quel mouvement — mais pas encore <em>pourquoi</em> il a lieu. C'est tout l'objet du chapitre suivant, « Dynamique du point matériel », où la seconde loi de Newton reliera enfin l'accélération que tu viens d'apprendre à calculer aux forces qui la provoquent. Comme le résumait Galilée : « La nature est écrite en langage mathématique. » Tu viens d'en apprendre l'alphabet cinématique.</p>
  `,
  init: initMecaMRUV
};

MECA_NOVA_KB[mecaKey('Cinématique du point')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Cinématique du point ». Demande-moi la différence entre base polaire et base de Frenet, comment dériver un vecteur mobile, ou un indice sur un exercice.",
  rules: [
    { test:/r[ée]f[ée]rentiel/i, replies:["Un référentiel est un solide de référence par rapport auquel on décrit un mouvement. Il est galiléen si le principe d'inertie y est vérifié (un point isolé y est immobile ou en MRU)."] },
    { test:/base polaire|u_r|u_theta|u_θ/i, replies:["La base polaire (u_r, u_θ) est mobile : elle tourne avec le point M. Il faut donc dériver aussi les vecteurs de base : v = ṙ u_r + rθ̇ u_θ, ce qui donne des termes supplémentaires dans l'accélération."] },
    { test:/frenet|tangentielle|normale|a_t|a_n/i, replies:["La base de Frenet (T,N) suit la trajectoire : T est tangent (sens du mouvement), N pointe vers le centre de courbure. a_T=dv/dt change la NORME de v ; a_N=v²/R change sa DIRECTION."] },
    { test:/mruv|mru\b/i, replies:["MRU (a=0) : x(t)=x0+v0t. MRUV (a=constante) : x(t)=x0+v0t+½at², v(t)=v0+at, et v²=v0²+2a(x−x0) (très utile sans connaître le temps)."] },
    { test:/vitesse.*acc[ée]l[ée]ration|d[ée]river/i, replies:["La vitesse est la dérivée de la position ; l'accélération est la dérivée de la vitesse (donc la dérivée seconde de la position)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : que veut dire « uniforme » pour la vitesse ?","Indice niveau 2 : la norme de v ne change pas, donc dv/dt=0.","Indice niveau 3 : a_T = 0."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise la formule qui ne fait pas intervenir le temps.","Indice niveau 2 : v²=v0²+2aΔx, avec v=0, v0=20, Δx=40.","Indice niveau 3 : a = −400/80 = −5 m/s²."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : si r est constant, que vaut ṙ ?","Indice niveau 2 : ṙ=0, donc le terme radial de v disparaît.","Indice niveau 3 : v = rθ̇ u_θ."] },
    { test:/exercice\s*4/i, hint:true, replies:["Pour l'exercice 4 : exprime t en fonction de x.","Indice niveau 2 : t=x−1, remplace dans y(t)=t²+1.","Indice niveau 3 : y=(x−1)²+1, c'est une parabole."] },
    { test:/exercice\s*5/i, hint:true, replies:["Pour l'exercice 5 : repars de la formule générale de l'accélération en polaire.","Indice niveau 2 : r est constant donc ṙ=r̈=0, et θ̈=0 car ω est constant.","Indice niveau 3 : il ne reste que a=−rω²u_r (accélération centripète)."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 2 — Plan incliné avec frottement (Chapitre 2)
--------------------------------------------------------------------------------- */
function updateMecaIncline(){
  const thetaDeg = parseFloat(document.getElementById('mecaTheta').value);
  const mu = parseFloat(document.getElementById('mecaMu').value);
  document.getElementById('mecaThetaVal').textContent = thetaDeg.toFixed(0);
  document.getElementById('mecaMuVal').textContent = mu.toFixed(2);
  const theta = thetaDeg*Math.PI/180;
  const g = 9.8;
  const baseX = 20, baseY = 90, L = 110;
  const topX = baseX + L*Math.cos(theta);
  const topY = baseY - L*Math.sin(theta);
  document.getElementById('mecaInclineLine').setAttribute('x2', topX.toFixed(1));
  document.getElementById('mecaInclineLine').setAttribute('y2', topY.toFixed(1));
  const midX = (baseX+topX)/2, midY = (baseY+topY)/2;
  document.getElementById('mecaBlock').setAttribute('cx', midX.toFixed(1));
  document.getElementById('mecaBlock').setAttribute('cy', midY.toFixed(1));
  document.getElementById('mecaWeightVec').setAttribute('x1', midX.toFixed(1));
  document.getElementById('mecaWeightVec').setAttribute('y1', midY.toFixed(1));
  document.getElementById('mecaWeightVec').setAttribute('x2', midX.toFixed(1));
  document.getElementById('mecaWeightVec').setAttribute('y2', (midY+34).toFixed(1));
  const nx = -Math.sin(theta), ny = -Math.cos(theta);
  document.getElementById('mecaNormalVec').setAttribute('x1', midX.toFixed(1));
  document.getElementById('mecaNormalVec').setAttribute('y1', midY.toFixed(1));
  document.getElementById('mecaNormalVec').setAttribute('x2', (midX+nx*30).toFixed(1));
  document.getElementById('mecaNormalVec').setAttribute('y2', (midY+ny*30).toFixed(1));
  const tanTheta = Math.tan(theta);
  let a = 0, slides = false;
  if(tanTheta > mu){ a = g*(Math.sin(theta) - mu*Math.cos(theta)); slides = true; }
  const alongX = Math.cos(theta), alongY = -Math.sin(theta);
  const fricEl = document.getElementById('mecaFrictionVec');
  if(mu > 0.001){
    fricEl.style.display = '';
    fricEl.setAttribute('x1', midX.toFixed(1));
    fricEl.setAttribute('y1', midY.toFixed(1));
    fricEl.setAttribute('x2', (midX+alongX*26).toFixed(1));
    fricEl.setAttribute('y2', (midY+alongY*26).toFixed(1));
  } else {
    fricEl.style.display = 'none';
  }
  document.getElementById('mecaInclineReadout').innerHTML = slides
    ? `tan(θ) = ${tanTheta.toFixed(2)} &gt; μ = ${mu.toFixed(2)} : l'objet glisse. a = g(sinθ − μcosθ) = <strong>${a.toFixed(2)} m/s²</strong>`
    : `tan(θ) = ${tanTheta.toFixed(2)} ≤ μ = ${mu.toFixed(2)} : le frottement statique retient l'objet (a = 0)`;
}
function initMecaIncline(){ updateMecaIncline(); }

/* =========================== CHAPITRE 2 — Dynamique du point matériel =========================== */
MECA_CHAPTERS[mecaKey('Dynamique du point matériel')] = {
  objectives: [
    "Énoncer les trois lois de Newton et préciser leur domaine de validité (référentiel galiléen)",
    "Dresser le bilan des forces s'exerçant sur un système et construire un diagramme du corps libre",
    "Appliquer le principe fondamental de la dynamique à des problèmes avec frottement, plan incliné ou tension",
    "Distinguer masse et poids, et interpréter la notion de force d'inertie dans un référentiel non galiléen simple",
    "Analyser un système mécanique concret pour évaluer si le référentiel d'étude peut raisonnablement être considéré comme galiléen"
  ],
  prereqs: ["Cinématique du point"],
  bodyHtml: `
    <p>En 1687, dans les <em>Philosophiæ Naturalis Principia Mathematica</em>, Newton publie trois phrases qui vont changer à jamais notre rapport au monde physique. Avant lui, on pensait qu'il fallait une force pour <em>maintenir</em> un mouvement ; après lui, on comprend qu'il en faut une seulement pour le <em>modifier</em>. Ce renversement conceptuel — d'Aristote à Newton — est l'un des plus profonds de toute l'histoire des sciences.</p>
    <p>Ces trois lois ne sont pas de l'histoire ancienne : ce sont elles, sans modification, que les ingénieurs utilisent pour dimensionner le moteur d'une voiture, calculer la résistance d'un pont, ou lancer une fusée en orbite. Tant que les vitesses restent petites devant celle de la lumière et les échelles grandes devant celle de l'atome, la mécanique newtonienne reste d'une précision redoutable.</p>
    <p>Ce chapitre relie enfin ce que tu sais décrire (le mouvement, via la cinématique) à ce qui le <em>cause</em> (les forces). À la fin, tu sauras dresser le bilan des forces sur n'importe quel système simple et en déduire son mouvement — la démarche centrale de toute la mécanique classique.</p>

    <h3>1. Les trois lois de Newton</h3>
    <table class="mini-table">
      <tr><th>Loi</th><th>Énoncé</th></tr>
      <tr><td>1ère loi (principe d'inertie)</td><td>dans un référentiel galiléen, un point matériel isolé (ou pseudo-isolé) est immobile ou en mouvement rectiligne uniforme</td></tr>
      <tr><td>2ème loi (principe fondamental de la dynamique, PFD)</td><td>$\\sum \\vec{F} = m\\vec{a}$ — la résultante des forces égale la masse fois l'accélération</td></tr>
      <tr><td>3ème loi (actions réciproques)</td><td>si $A$ exerce une force $\\vec{F}_{A\\to B}$ sur $B$, alors $B$ exerce sur $A$ la force opposée $\\vec{F}_{B\\to A}=-\\vec{F}_{A\\to B}$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — masse et inertie</span>
      La masse mesure l'<strong>inertie</strong> d'un objet : sa résistance au changement de mouvement. Ce n'est pas la même chose que le <strong>poids</strong> $\\vec P = m\\vec g$, qui est une force (elle dépend du lieu, via $g$) et non une propriété intrinsèque de l'objet comme la masse.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Sur la Lune, ta masse est-elle différente de sur Terre ? Et ton poids ? Réfléchis à ce que ressentirait un astronaute en essayant de pousser un objet massif en apesanteur, où le poids apparent est nul mais pas la masse.
    </div>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 100 70" width="100%">
          <circle cx="28" cy="35" r="13" fill="#4C7CFF" opacity="0.4"/>
          <line x1="43" y1="35" x2="82" y2="35" stroke="#F0B94D" stroke-width="3" marker-end="url(#mecaArrF1)"/>
          <defs><marker id="mecaArrF1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#F0B94D"/></marker></defs>
        </svg>
        <span>Petite masse → grande accélération (même force)</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 100 70" width="100%">
          <circle cx="35" cy="35" r="23" fill="#4C7CFF" opacity="0.4"/>
          <line x1="60" y1="35" x2="78" y2="35" stroke="#F0B94D" stroke-width="3" marker-end="url(#mecaArrF2)"/>
          <defs><marker id="mecaArrF2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#F0B94D"/></marker></defs>
        </svg>
        <span>Grande masse → petite accélération (même force)</span>
      </div>
    </div>

    <h3>2. Bilan des forces : les grandes catégories</h3>
    <table class="mini-table">
      <tr><th>Force</th><th>Notation</th><th>Caractéristiques</th></tr>
      <tr><td>Poids</td><td>$\\vec P=m\\vec g$</td><td>verticale, vers le bas, s'applique toujours</td></tr>
      <tr><td>Réaction normale</td><td>$\\vec N$</td><td>perpendiculaire à la surface de contact, empêche l'objet de s'enfoncer</td></tr>
      <tr><td>Tension d'un fil</td><td>$\\vec T$</td><td>le long du fil, ne peut que « tirer » (jamais pousser)</td></tr>
      <tr><td>Frottement solide</td><td>$\\vec f$</td><td>tangent à la surface, s'oppose au glissement (ou à sa tendance)</td></tr>
    </table>
    <p>Les lois de Coulomb du frottement solide relient la force de frottement maximale à la réaction normale via un <strong>coefficient de frottement</strong> $\\mu$ (sans dimension) : $f_{max} = \\mu N$. Si la force motrice dépasse $\\mu N$, l'objet glisse ; sinon, le frottement statique s'ajuste pour maintenir l'équilibre.</p>

    <h3>3. Méthode : le diagramme du corps libre</h3>
    <div class="key-point">
      <span class="eyebrow">Méthode en 4 étapes</span>
      1) Isoler le système étudié.<br>
      2) Faire l'inventaire de <strong>toutes</strong> les forces qui agissent SUR lui (jamais celles qu'il exerce sur autre chose).<br>
      3) Choisir un repère adapté au problème (souvent : un axe le long du mouvement, l'autre perpendiculaire).<br>
      4) Projeter le PFD $\\sum\\vec F=m\\vec a$ sur chaque axe, ce qui donne un système d'équations scalaires.
    </div>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 120" width="100%">
          <rect x="90" y="45" width="40" height="30" fill="#EAF0FB" opacity="0.15" stroke="#EAF0FB" stroke-width="1.5"/>
          <line x1="130" y1="60" x2="190" y2="60" stroke="#4C7CFF" stroke-width="2" marker-end="url(#mecaArrDCL1)"/>
          <text x="150" y="50" font-family="IBM Plex Mono" font-size="11" fill="#4C7CFF">F</text>
          <line x1="90" y1="60" x2="30" y2="60" stroke="#FF6B6F" stroke-width="2" marker-end="url(#mecaArrDCL2)"/>
          <text x="45" y="50" font-family="IBM Plex Mono" font-size="11" fill="#FF6B6F">f</text>
          <line x1="110" y1="45" x2="110" y2="10" stroke="#2DD4C4" stroke-width="2" marker-end="url(#mecaArrDCL3)"/>
          <text x="115" y="20" font-family="IBM Plex Mono" font-size="11" fill="#2DD4C4">N</text>
          <line x1="110" y1="75" x2="110" y2="105" stroke="#F0B94D" stroke-width="2" marker-end="url(#mecaArrDCL4)"/>
          <text x="115" y="95" font-family="IBM Plex Mono" font-size="11" fill="#F0B94D">P</text>
          <defs>
            <marker id="mecaArrDCL1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#4C7CFF"/></marker>
            <marker id="mecaArrDCL2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#FF6B6F"/></marker>
            <marker id="mecaArrDCL3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#2DD4C4"/></marker>
            <marker id="mecaArrDCL4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#F0B94D"/></marker>
          </defs>
        </svg>
        <span>Diagramme du corps libre : 4 forces types sur un objet tiré sur un sol horizontal (P, N, F, f)</span>
      </div>
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une voiturette de 800 kg accélère de 0 à 20 m/s en 8 s en ligne droite. Quelle force motrice moyenne exerce le moteur (on néglige les frottements) ?</p>
      <p><strong>Solution :</strong> $a=\\dfrac{\\Delta v}{\\Delta t}=\\dfrac{20}{8}=2{,}5$ m/s². Avec $F=ma$ : $F=800\\times2{,}5=2000$ N.</p>
      <p class="example-answer">Réponse : la force motrice moyenne est de 2000 N.</p>
    </div>

    <h3>4. Référentiel non galiléen : le poids apparent</h3>
    <p>Dans un référentiel accéléré (ex. un ascenseur d'accélération $\\vec a_0$), le PFD doit inclure une <strong>force d'inertie d'entraînement</strong> $-m\\vec a_0$ pour rester valable. Dans un ascenseur qui accélère vers le haut, l'occupant se sent plus lourd (poids apparent $>mg$) ; dans un ascenseur qui accélère vers le bas, il se sent plus léger.</p>
    <div class="formula-box">$$N - mg = ma_0 \\quad\\Longrightarrow\\quad N = m(g+a_0)$$</div>
    <p>(convention : $a_0>0$ si l'ascenseur accélère vers le haut).</p>
    <p><strong>Cas limite :</strong> si l'ascenseur est en chute libre ($a_0=-g$), alors $N=0$ : le poids apparent s'annule complètement, exactement comme pour un astronaute en orbite. C'est le principe utilisé par les avions « zéro-g » qui entraînent les astronautes en réalisant une trajectoire parabolique en chute libre contrôlée.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La force d'inertie $-m\\vec a_0$ n'est pas une « vraie » force au sens de la 3ᵉ loi de Newton — elle n'a pas de force réciproque exercée en retour sur un autre objet. Alors pourquoi l'introduire malgré tout dans le bilan des forces ?
    </div>

    <h3>5. Frontière de la recherche — la mécanique newtonienne à ses limites</h3>
    <p>Les trois lois de Newton, telles qu'énoncées ici, restent d'une précision extraordinaire... jusqu'à ce qu'on approche la vitesse de la lumière (où la relativité restreinte d'Einstein les remplace) ou l'échelle de l'atome (où la mécanique quantique prend le relais). Un exemple concret et quotidien : les satellites du système GPS doivent corriger en permanence leurs horloges d'environ 38 microsecondes par jour pour tenir compte d'effets relativistes — un écart totalement invisible dans la vie courante, mais qui, non corrigé, ferait dériver ta position GPS de plusieurs kilomètres par jour.</p>
    <p><strong>Question ouverte :</strong> la troisième loi de Newton (actions réciproques instantanées) pose un problème conceptuel profond en relativité, où rien ne peut se propager plus vite que la lumière — comment une force peut-elle agir « instantanément » sur un objet distant ? La résolution moderne passe par la notion de <strong>champ</strong> (électromagnétique, gravitationnel), qui reste un objet de recherche actif à l'interface entre relativité générale et théorie quantique des champs.</p>
    <p><strong>Technologie émergente :</strong> les accéléromètres et gyroscopes MEMS (micro-systèmes électromécaniques) qui équipent ton smartphone appliquent directement le PFD à l'échelle du micromètre pour mesurer accélération et orientation — une version miniaturisée, à très haute fréquence, des diagrammes du corps libre que tu apprends dans ce chapitre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Bilan des forces $\\sum \\vec F$ → PFD $\\sum \\vec F = m\\vec a$ → accélération → (cinématique) → trajectoire
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\sum \\vec{F} = m\\vec{a}$$
      Toute la dynamique du point matériel newtonien tient dans cette seule équation vectorielle — l'essentiel du travail consiste à identifier correctement $\\sum\\vec F$.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>PFD : ΣF = ma, valable uniquement dans un référentiel galiléen</li>
        <li>La masse mesure l'inertie (constante) ; le poids P=mg est une force (dépend du lieu)</li>
        <li>Frottement solide : f_max = μN — glissement si la force motrice dépasse cette valeur</li>
        <li>Méthode : isoler le système → bilan des forces → repère adapté → projeter ΣF=ma sur chaque axe</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre masse et poids — la masse ne change pas avec g, le poids si</li>
        <li>Oublier que F et a sont des vecteurs : leur direction compte, pas seulement leur intensité</li>
        <li>Inclure dans le bilan des forces une force que le système exerce sur autre chose, au lieu d'une force qu'il subit</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — plan incliné avec frottement</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Fais varier l'angle θ et le coefficient de frottement μ : observe le bilan des forces et si l'objet glisse ou reste immobile.</p>
      <div class="sim-2col">
        <svg viewBox="0 0 160 100" width="180" height="115">
          <line x1="20" y1="90" x2="150" y2="90" stroke="#3A4658" stroke-width="1" stroke-dasharray="2,2"/>
          <line id="mecaInclineLine" x1="20" y1="90" x2="130" y2="35" stroke="#EAF0FB" stroke-width="2"/>
          <circle id="mecaBlock" cx="75" cy="62.5" r="7" fill="#9B82FF"/>
          <line id="mecaWeightVec" x1="75" y1="62.5" x2="75" y2="96" stroke="#F0B94D" stroke-width="2" marker-end="url(#mecaArrP)"/>
          <line id="mecaNormalVec" x1="75" y1="62.5" x2="75" y2="32" stroke="#2DD4C4" stroke-width="2" marker-end="url(#mecaArrN)"/>
          <line id="mecaFrictionVec" x1="75" y1="62.5" x2="95" y2="52" stroke="#FF6B6F" stroke-width="2" marker-end="url(#mecaArrFr)"/>
          <defs>
            <marker id="mecaArrP" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#F0B94D"/></marker>
            <marker id="mecaArrN" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker>
            <marker id="mecaArrFr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#FF6B6F"/></marker>
          </defs>
        </svg>
        <div class="sim-controls">
          <label>θ (°) : <span id="mecaThetaVal">30</span></label>
          <input type="range" id="mecaTheta" min="0" max="60" step="1" value="30" oninput="updateMecaIncline()">
          <label>μ : <span id="mecaMuVal">0.20</span></label>
          <input type="range" id="mecaMu" min="0" max="1" step="0.05" value="0.2" oninput="updateMecaIncline()">
          <div class="sim-readout" id="mecaInclineReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un objet de masse 2 kg subit une force résultante de 10 N. Son accélération est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca2e1" value="wrong"> 20 m/s²</label>
          <label class="option"><input type="radio" name="meca2e1" value="right"> 5 m/s²</label>
          <label class="option"><input type="radio" name="meca2e1" value="wrong"> 0,2 m/s²</label>
          <label class="option"><input type="radio" name="meca2e1" value="wrong"> 12 m/s²</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca2e1','meca2fb1','Correct — a=F/m=10/2=5 m/s².','Utilise directement a = F/m.')">Vérifier</button>
        <div class="feedback" id="meca2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Sur un plan incliné à 20°, avec μ=0,5, l'objet :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca2e2" value="right"> reste immobile (tan20°≈0,36 < μ)</label>
          <label class="option"><input type="radio" name="meca2e2" value="wrong"> glisse en accélérant</label>
          <label class="option"><input type="radio" name="meca2e2" value="wrong"> glisse à vitesse constante</label>
          <label class="option"><input type="radio" name="meca2e2" value="wrong"> décolle du plan</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca2e2','meca2fb2','Correct — tan(20°)≈0,36 est inférieur à μ=0,5 : le frottement statique suffit à empêcher le glissement.','Compare tan(θ) à μ : utilise le simulateur pour vérifier à θ=20° et μ=0,5.')">Vérifier</button>
        <div class="feedback" id="meca2fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans un ascenseur qui accélère vers le HAUT, le poids apparent d'un passager :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca2e3" value="right"> augmente</label>
          <label class="option"><input type="radio" name="meca2e3" value="wrong"> diminue</label>
          <label class="option"><input type="radio" name="meca2e3" value="wrong"> reste égal à mg</label>
          <label class="option"><input type="radio" name="meca2e3" value="wrong"> devient nul</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca2e3','meca2fb3','Correct — N=m(g+a0) avec a0>0 (accélération vers le haut) : le passager se sent plus lourd.','Utilise N=m(g+a0) avec a0 positif (vers le haut) : N devient plus grand que mg.')">Vérifier</button>
        <div class="feedback" id="meca2fb3"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4</span>
        <p class="q">Un skieur (m=80 kg) remonte à vitesse constante une pente à α=30°, tracté par une perche de téléski faisant un angle β=20° avec la pente. Les frottements équivalent à F₁=65 N. La tension de la perche T=(F₁+mg sinα)/cosβ vaut environ (g=9,8 m/s²) :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca2e4" value="wrong"> 65 N</label>
          <label class="option"><input type="radio" name="meca2e4" value="wrong"> 392 N</label>
          <label class="option"><input type="radio" name="meca2e4" value="right"> 486 N</label>
          <label class="option"><input type="radio" name="meca2e4" value="wrong"> 784 N</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca2e4','meca2fb4','Correct — T=(65+80×9,8×0,5)/cos20°=(65+392)/0,940≈486 N. Le mouvement étant à vitesse constante, la somme des forces projetée le long de la pente est nulle.','Écris le PFD projeté le long de la pente (vitesse constante ⇒ somme des forces = 0), puis isole T.')">Vérifier</button>
        <div class="feedback" id="meca2fb4"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 5</span>
        <p class="q">Un livre est posé sur une table et reste immobile. D'après la 3ᵉ loi de Newton (actions réciproques), la force que la table exerce sur le livre :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca2e5" value="wrong"> est la même force que le poids du livre</label>
          <label class="option"><input type="radio" name="meca2e5" value="right"> est égale et opposée à la force que le livre exerce sur la table</label>
          <label class="option"><input type="radio" name="meca2e5" value="wrong"> n'existe pas si le livre est immobile</label>
          <label class="option"><input type="radio" name="meca2e5" value="wrong"> est plus faible que celle du livre sur la table</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca2e5','meca2fb5','Correct — la 3ᵉ loi relie deux forces appliquées sur deux objets DIFFÉRENTS (table→livre et livre→table), toujours égales et opposées, quel que soit le mouvement. Elle ne doit pas être confondue avec l\\'équilibre du livre (poids + réaction de la table = 0), qui relie deux forces appliquées sur le MÊME objet.','La 3ᵉ loi relie deux forces sur deux objets différents. Ne la confonds pas avec la condition d\\'équilibre du livre seul.')">Vérifier</button>
        <div class="feedback" id="meca2fb5"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 6 — à modéliser toi-même</span>
        <p class="q">Un bloc est posé sur le plateau d'un camion qui freine. Au-delà d'une certaine décélération du camion, le bloc se met à glisser vers l'avant. Propose une démarche pour déterminer la décélération critique à partir de laquelle ce glissement démarre, en fonction du coefficient de frottement μ entre le bloc et le plateau. Dans quel référentiel choisis-tu de te placer, et pourquoi ce choix simplifie-t-il (ou complique-t-il) le problème ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : dans le référentiel du camion (non galiléen), une force d'inertie apparaît sur le bloc — à quelle force du plan incliné peux-tu la comparer ?</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la 3ᵉ loi de Newton n'était pas exactement vérifiée (comme c'est le cas pour certaines interactions électromagnétiques entre charges en mouvement) : quelles conséquences cela aurait-il sur la notion de quantité de mouvement conservée ?</li>
        <li>Pourquoi dit-on que la 1ère loi de Newton est un cas particulier de la 2ème (avec $\\vec F=\\vec 0$), et pourquoi Newton a-t-il quand même jugé utile de l'énoncer séparément ?</li>
        <li>Quelle serait la conséquence, pour la conception des ceintures de sécurité, d'un monde où le coefficient de frottement serait le même pour toutes les paires de matériaux ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>I. Newton, <em>Philosophiæ Naturalis Principia Mathematica</em>, 1687 — l'ouvrage fondateur des trois lois du mouvement.</li>
        <li>J.-P. Pérez, <em>Mécanique — Fondements et applications</em>, Dunod (chapitres consacrés à la dynamique du point).</li>
        <li>N. Ashby, « Relativity in the Global Positioning System », <em>Living Reviews in Relativity</em>, 2003 — sur les corrections relativistes nécessaires au fonctionnement du GPS.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes maintenant de l'outil le plus puissant de la mécanique classique : le principe fondamental de la dynamique. Le prochain chapitre, « Moment cinétique et théorèmes généraux », t'en montrera une version « tournée », particulièrement utile pour les mouvements de rotation. Comme le confiait Newton lui-même avec une modestie inattendue : « Je ne sais pas ce que je peux paraître au monde, mais à moi-même, je semble n'avoir été qu'un enfant jouant sur le rivage... tandis que le grand océan de la vérité s'étendait, inexploré, devant moi. »</p>
  `,
  init: initMecaIncline
};

MECA_NOVA_KB[mecaKey('Dynamique du point matériel')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Dynamique du point matériel ». Demande-moi les lois de Newton, comment dresser un bilan des forces, ou un indice sur un exercice.",
  rules: [
    { test:/loi.*newton|principe.*inertie|pfd|principe fondamental/i, replies:["3 lois : 1) inertie (isolé → immobile ou MRU dans un référentiel galiléen), 2) PFD : ΣF=ma, 3) actions réciproques (F(A→B) = −F(B→A))."] },
    { test:/masse.*poids|poids.*masse/i, replies:["La masse mesure l'inertie (constante, ne dépend pas du lieu). Le poids P=mg est une FORCE qui dépend de g, donc du lieu (la Lune, la Terre...)."] },
    { test:/frottement|coulomb|coefficient/i, replies:["Les lois de Coulomb du frottement solide : la force de frottement maximale vaut f_max=μN. Si la force motrice dépasse μN, l'objet glisse ; sinon le frottement statique s'ajuste pour maintenir l'équilibre."] },
    { test:/bilan des forces|diagramme du corps libre/i, replies:["Méthode : 1) isoler le système, 2) lister TOUTES les forces qu'il SUBIT, 3) choisir un repère adapté, 4) projeter ΣF=ma sur chaque axe."] },
    { test:/plan inclin[ée]/i, replies:["Sur un plan incliné d'angle θ, sans frottement : a=g sinθ. Avec frottement (μ) : l'objet glisse seulement si tanθ>μ, et alors a=g(sinθ−μcosθ)."] },
    { test:/poids apparent|ascenseur|non galil[ée]en/i, replies:["Dans un référentiel accéléré (ex. ascenseur d'accélération a0), il faut ajouter une force d'inertie −ma0. Le poids apparent devient N=m(g+a0) : plus lourd si a0 est vers le haut, plus léger si vers le bas."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique directement a=F/m.","Indice niveau 2 : F=10N, m=2kg.","Indice niveau 3 : a=5 m/s²."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare tan(20°) à μ=0,5.","Indice niveau 2 : tan(20°)≈0,36, plus petit que 0,5.","Indice niveau 3 : l'objet reste immobile."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : utilise N=m(g+a0).","Indice niveau 2 : a0 est positif (vers le haut).","Indice niveau 3 : N augmente — le passager se sent plus lourd."] },
    { test:/exercice\s*4/i, hint:true, replies:["Pour l'exercice 4 : projette le PFD le long de la pente, avec somme des forces nulle (vitesse constante).","Indice niveau 2 : T cosβ = F₁ + mg sinα.","Indice niveau 3 : T=(65+392)/cos20°≈486 N."] },
    { test:/exercice\s*5/i, hint:true, replies:["Pour l'exercice 5 : la 3ᵉ loi relie deux forces sur deux objets DIFFÉRENTS.","Indice niveau 2 : ne confonds pas avec l'équilibre du livre seul (poids + réaction).","Indice niveau 3 : la force table→livre est égale et opposée à celle livre→table."] }
  ]
};

/* =========================== CHAPITRE 2bis — Moment cinétique et théorèmes généraux =========================== */
MECA_CHAPTERS[mecaKey('Moment cinétique et théorèmes généraux')] = {
  objectives: [
    "Définir le moment cinétique et le moment (dynamique) d'une force par rapport à un point",
    "Énoncer et appliquer le théorème du moment cinétique",
    "Reconnaître un mouvement à accélération centrale et utiliser la loi des aires",
    "Établir et exploiter les formules de Binet pour la vitesse et l'accélération",
    "Analyser un problème de mécanique pour évaluer s'il est préférable d'y appliquer le PFD ou le théorème du moment cinétique"
  ],
  prereqs: ["Produit vectoriel", "Principe fondamental de la dynamique", "Coordonnées polaires"],
  bodyHtml: `
    <p>En 1609, Kepler énonce sa deuxième loi — la loi des aires — sans disposer d'aucun des outils vectoriels que tu maîtrises déjà : il l'a découverte en épluchant patiemment des années de données d'observation de Tycho Brahe sur la planète Mars. Il faudra attendre Newton pour comprendre <em>pourquoi</em> cette loi, en apparence purement géométrique, découle directement de la nature centrale de la force de gravitation.</p>
    <p>Le moment cinétique n'est pas qu'un outil de mécanique céleste : c'est lui qui explique pourquoi une patineuse artistique tourne plus vite en ramenant les bras vers le corps, pourquoi une toupie reste debout, ou comment un satellite ajuste son orientation sans moteur (roues de réaction). Partout où une rotation est en jeu, le moment cinétique n'est jamais loin.</p>
    <p>Ce chapitre te donne un second outil, complémentaire du principe fondamental de la dynamique : le théorème du moment cinétique. Tu verras qu'il rend certains problèmes — notamment ceux où une force passe par un point fixe — spectaculairement plus simples que par la seule force $\\sum\\vec F=m\\vec a$.</p>

    <h3>1. Moment cinétique et moment d'une force</h3>
    <p>Le <strong>moment cinétique</strong> d'un point $M$ de masse $m$ et de vitesse $\\vec V$ par rapport à un point $O$ est :</p>
    <div class="formula-box">$$\\vec\\sigma_O(M) = \\vec{OM}\\wedge m\\vec V(M)$$</div>
    <p>Le <strong>moment (dynamique)</strong> d'une force $\\vec F$ appliquée en $M$, par rapport au même point $O$, est $\\vec{\\mathcal M}_O(\\vec F) = \\vec{OM}\\wedge\\vec F$. Une force dont la ligne d'action passe par $O$ a un moment nul en $O$ — c'est précisément le cas des forces centrales.</p>

    <h3>2. Théorème du moment cinétique</h3>
    <p>Dans un référentiel galiléen, pour un point fixe $O$ :</p>
    <div class="formula-box">$$\\frac{d\\vec\\sigma_O(M)}{dt}\\bigg|_{\\Re} = \\sum_i \\vec{\\mathcal M}_O(\\vec F_i)$$</div>
    <p>La dérivée du moment cinétique est égale à la somme des moments des forces appliquées. Ce théorème se déduit du PFD (en dérivant $\\vec{OM}\\wedge m\\vec V$ et en utilisant $\\vec V\\wedge m\\vec V=\\vec 0$), mais il est souvent plus direct à utiliser lorsqu'une inconnue (comme une tension ou une réaction) passe par $O$ : sa contribution au moment s'annule et disparaît de l'équation.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Si le moment total des forces par rapport à O est nul à chaque instant, alors $\\vec\\sigma_O(M)$ est <strong>constant</strong> — c'est la loi de conservation du moment cinétique, à la base des mouvements à force centrale.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une patineuse artistique en rotation ramène ses bras vers son corps et se met à tourner plus vite. Aucune force extérieure horizontale significative n'agit sur elle. Quelle grandeur de ce chapitre reste constante pendant ce mouvement, et qu'est-ce que cela implique nécessairement pour sa vitesse angulaire ?
    </div>

    <h3>3. Mouvement à accélération centrale — loi des aires</h3>
    <p>Un mouvement est dit à <strong>accélération centrale</strong> s'il existe un point fixe $O$ tel que $\\vec\\gamma(M)$ reste colinéaire à $\\vec{OM}$ à chaque instant (c'est le cas de la gravitation, ou de tout mouvement soumis à une seule force centrale). Alors $\\vec{OM}\\wedge\\vec\\gamma(M)=\\vec 0$, donc :</p>
    <div class="formula-box">$$\\vec c \\;=\\; \\vec{OM}\\wedge\\vec V(M) \\;=\\; \\rho^2\\dot\\varphi\\,\\vec u_z \\;=\\; \\text{constante}$$</div>
    <p>$\\vec c$ est appelé <strong>constante des aires</strong>. Sa conséquence géométrique est la <strong>loi des aires</strong> (2ᵉ loi de Kepler) : l'aire balayée par le rayon vecteur $\\vec{OM}$ pendant un intervalle de temps $dt$ est $dA=\\tfrac12\\rho^2 d\\varphi=\\tfrac12 c\\,dt$, donc <strong>proportionnelle au temps</strong> — le mouvement est plus rapide près de $O$ (là où $\\rho$ est petit) et plus lent loin de $O$.</p>

    <h3>4. Formules de Binet</h3>
    <p>Pour un mouvement plan à force centrale, on pose $u=1/\\rho$ (l'inverse du rayon polaire). Les formules de Binet expriment vitesse et accélération uniquement en fonction de $u(\\varphi)$ et de ses dérivées par rapport à $\\varphi$ :</p>
    <div class="formula-box">$$V^2 = c^2\\left[\\left(\\frac{du}{d\\varphi}\\right)^2 + u^2\\right] \\qquad\\qquad \\gamma = -c^2u^2\\left(\\frac{d^2u}{d\\varphi^2}+u\\right)$$</div>
    <p>Ces formules sont très utiles car elles transforment un problème de dynamique en temps ($t$) en un problème géométrique en angle ($\\varphi$) — c'est ainsi que l'on démontre que les trajectoires possibles sous une force en $1/\\rho^2$ (gravitation) sont des coniques.</p>
    <p><strong>Cas limite :</strong> les formules de Binet supposent un mouvement à force centrale, donc $\\vec c\\neq\\vec 0$ (sinon $u$ n'est même pas définie comme fonction de $\\varphi$). Le cas $\\vec c=\\vec 0$ correspond à un mouvement purement radial (le point se dirige droit vers O, ou s'en éloigne droit) — un cas particulier dégénéré qu'il faut traiter séparément, hors du cadre des formules de Binet.</p>

    <h3>5. Frontière de la recherche — du moment cinétique planétaire au moment cinétique quantique</h3>
    <p>La conservation du moment cinétique ne s'arrête pas à l'échelle du Système solaire : c'est l'un des principes les plus universels de toute la physique, valable aussi bien pour une galaxie en rotation que pour un électron autour d'un noyau atomique. En 2016, une équipe internationale a directement mesuré le moment cinétique orbital de la lumière (des faisceaux laser dits « vortex optiques »), une propriété prédite dès les années 1990 et aujourd'hui étudiée pour ses applications en communication optique à très haut débit et en manipulation de particules à l'échelle microscopique par pince optique.</p>
    <p><strong>Question ouverte :</strong> le moment cinétique d'un trou noir en rotation (trou noir de Kerr) influence profondément la géométrie de l'espace-temps autour de lui, un phénomène appelé « entraînement des référentiels ». Comment ce moment cinétique évolue-t-il précisément lors de la fusion de deux trous noirs — un des objets d'étude centraux de l'astronomie gravitationnelle depuis la détection de LIGO en 2015 — reste un domaine de recherche numérique très actif.</p>
    <p><strong>Technologie émergente :</strong> les roues de réaction et gyroscopes utilisés pour orienter les satellites (sans consommer de carburant) exploitent directement la conservation du moment cinétique total : faire tourner une roue interne dans un sens fait tourner le satellite dans l'autre, exactement comme la patineuse artistique évoquée plus haut.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Force centrale → moment nul en O → moment cinétique $\\vec\\sigma_O$ constant → loi des aires → trajectoire (conique via Binet)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\frac{d\\vec\\sigma_O(M)}{dt}\\bigg|_{\\Re} = \\sum_i \\vec{\\mathcal M}_O(\\vec F_i)$$
      Le théorème du moment cinétique : la version « en rotation » du principe fondamental de la dynamique.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Moment cinétique : $\\vec\\sigma_O(M)=\\vec{OM}\\wedge m\\vec V(M)$ — Moment d'une force : $\\vec{\\mathcal M}_O(\\vec F)=\\vec{OM}\\wedge\\vec F$</li>
        <li>Théorème du moment cinétique : $\\dfrac{d\\vec\\sigma_O}{dt}=\\sum\\vec{\\mathcal M}_O(\\vec F_i)$ (référentiel galiléen)</li>
        <li>Force centrale $\\Rightarrow$ moment nul en O $\\Rightarrow$ $\\vec\\sigma_O$ constant $\\Rightarrow$ $c=\\rho^2\\dot\\varphi=$ cte (loi des aires)</li>
        <li>Formules de Binet (avec $u=1/\\rho$) : $V^2=c^2[(u')^2+u^2]$ et $\\gamma=-c^2u^2(u''+u)$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier qu'une force dont la ligne d'action passe par O a un moment NUL en O — c'est tout l'intérêt de bien choisir O</li>
        <li>Confondre moment cinétique (grandeur cinématique, dépend de la vitesse) et moment d'une force (grandeur dynamique)</li>
        <li>Appliquer la loi des aires à un mouvement qui n'est pas à accélération centrale</li>
        <li>Dériver le moment cinétique par rapport à un point MOBILE sans les termes correctifs associés</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour un mouvement à accélération centrale par rapport à O, le vecteur $\\vec c=\\vec{OM}\\wedge\\vec V$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca2be1" value="wrong"> toujours nul</label>
          <label class="option"><input type="radio" name="meca2be1" value="right"> constant au cours du temps</label>
          <label class="option"><input type="radio" name="meca2be1" value="wrong"> proportionnel au temps</label>
          <label class="option"><input type="radio" name="meca2be1" value="wrong"> variable, sans loi particulière</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca2be1','meca2bfb1','Correct — dc/dt = V∧V + OM∧γ = 0 + 0 = 0 puisque γ est colinéaire à OM (accélération centrale) : c est bien constant.','Dérive c=OM∧V par rapport au temps et utilise le fait que γ est colinéaire à OM.')">Vérifier</button>
        <div class="feedback" id="meca2bfb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La loi des aires dit que l'aire balayée par le rayon vecteur $\\vec{OM}$ pendant un intervalle de temps $dt$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca2be2" value="wrong"> constante, quelle que soit la durée</label>
          <label class="option"><input type="radio" name="meca2be2" value="right"> proportionnelle à dt</label>
          <label class="option"><input type="radio" name="meca2be2" value="wrong"> proportionnelle à ρ</label>
          <label class="option"><input type="radio" name="meca2be2" value="wrong"> inversement proportionnelle à la vitesse</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca2be2','meca2bfb2','Correct — dA = ½ρ²dφ = ½c·dt : l\\'aire balayée est directement proportionnelle au temps écoulé, c\\'est la 2ᵉ loi de Kepler.','Exprime dA=½ρ²dφ puis remplace ρ²φ̇ par la constante des aires c.')">Vérifier</button>
        <div class="feedback" id="meca2bfb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans les formules de Binet, la variable $u$ désigne :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca2be3" value="wrong"> la vitesse angulaire φ̇</label>
          <label class="option"><input type="radio" name="meca2be3" value="right"> l'inverse du rayon polaire, u = 1/ρ</label>
          <label class="option"><input type="radio" name="meca2be3" value="wrong"> le rayon polaire ρ</label>
          <label class="option"><input type="radio" name="meca2be3" value="wrong"> la constante des aires c</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca2be3','meca2bfb3','Correct — poser u=1/ρ permet d\\'exprimer V et γ en fonction de dérivées par rapport à φ plutôt qu\\'au temps, ce qui simplifie l\\'étude des trajectoires (coniques).','C\\'est la définition donnée dans le cours juste avant les deux formules.')">Vérifier</button>
        <div class="feedback" id="meca2bfb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Une comète décrit une orbite très allongée (excentrique) autour du Soleil. Sans résoudre aucune équation, explique qualitativement, à l'aide de la loi des aires, pourquoi cette comète passe très peu de temps près du Soleil (périhélie) et très longtemps loin de lui (aphélie). Comment relierais-tu cette observation à la conservation du moment cinétique de la comète ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : à aire balayée égale par unité de temps, que doit faire la vitesse angulaire φ̇ quand ρ est petit (près du Soleil) par rapport à quand ρ est grand ?</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on choisissait un point O différent (pas le centre de force) pour calculer le moment cinétique d'une planète : la loi des aires resterait-elle vraie par rapport à ce nouveau point ?</li>
        <li>Pourquoi le théorème du moment cinétique est-il particulièrement précieux dans les problèmes de pendule ou de tige articulée, où le PFD seul oblige à calculer une tension ou une réaction inconnue ?</li>
        <li>Quelle serait la conséquence, pour la stabilité d'un satellite artificiel, d'une perte accidentelle de tout son moment cinétique interne (roues de réaction à l'arrêt) ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. Kepler, <em>Astronomia Nova</em>, 1609 — première formulation de la loi des aires, à partir des observations de Tycho Brahe.</li>
        <li>J.-P. Pérez, <em>Mécanique — Fondements et applications</em>, Dunod (chapitre sur le moment cinétique et les forces centrales).</li>
        <li>B. P. Abbott <em>et al.</em> (collaboration LIGO/Virgo), « Observation of Gravitational Waves from a Binary Black Hole Merger », <em>Physical Review Letters</em>, 2016 — mesure du moment cinétique de trous noirs en fusion.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Le moment cinétique te suivra bien au-delà de ce chapitre : en mécanique des solides, en mécanique quantique, en astrophysique. La suite logique, « Travail, puissance et énergie », t'offrira un troisième grand outil de la mécanique — l'énergie — qui complète parfaitement le PFD et le théorème du moment cinétique. Comme le disait Kepler en découvrant l'harmonie cachée des mouvements célestes : « La géométrie est unique et éternelle, un reflet de l'esprit de Dieu. »</p>
  `
};

MECA_NOVA_KB[mecaKey('Moment cinétique et théorèmes généraux')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Moment cinétique et théorèmes généraux ». Demande-moi la définition du moment cinétique, le théorème associé, la loi des aires, ou un indice sur un exercice.",
  rules: [
    { test:/moment cin[ée]tique/i, replies:["Le moment cinétique par rapport à O est σ_O(M) = OM ∧ mV(M). C'est une grandeur vectorielle qui dépend du point O choisi."] },
    { test:/moment.*force|moment dynamique/i, replies:["Le moment d'une force F par rapport à O est M_O(F) = OM ∧ F. Si la ligne d'action de F passe par O, ce moment est nul — très utile pour éliminer une inconnue (tension, réaction) du calcul."] },
    { test:/th[ée]or[èe]me du moment cin[ée]tique/i, replies:["Dans un référentiel galiléen : dσ_O/dt = Σ M_O(F_i). C'est l'équivalent « moment » du PFD, souvent plus rapide quand une force passe par O."] },
    { test:/loi des aires|kepler|accélération centrale|force centrale/i, replies:["Si l'accélération reste colinéaire à OM (force centrale), alors c=ρ²φ̇ est constant : c'est la constante des aires. Conséquence : l'aire balayée est proportionnelle au temps (loi des aires, 2ᵉ loi de Kepler)."] },
    { test:/binet/i, replies:["Les formules de Binet, avec u=1/ρ : V² = c²[(du/dφ)² + u²] et γ = −c²u²(d²u/dφ² + u). Elles transforment le problème en une équation en φ plutôt qu'en t."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : dérive c=OM∧V par rapport au temps.","Indice niveau 2 : dc/dt = V∧V + OM∧γ.","Indice niveau 3 : les deux termes sont nuls (γ colinéaire à OM), donc c est constant."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pars de dA=½ρ²dφ.","Indice niveau 2 : remplace ρ²φ̇ par c.","Indice niveau 3 : dA=½c·dt, proportionnelle à dt."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : relis la définition juste avant les formules de Binet.","Indice niveau 2 : c'est l'inverse d'une longueur.","Indice niveau 3 : u=1/ρ."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 3 — Conservation de l'énergie mécanique en chute libre (Chapitre 3)
--------------------------------------------------------------------------------- */
function updateMecaEnergy(){
  const h = parseFloat(document.getElementById('mecaHeight').value);
  const H = 5, g = 9.8, m = 1, scale = 1.55;
  const ep = m*g*h;
  const ec = m*g*(H-h);
  const em = ep+ec;
  document.getElementById('mecaHeightVal').textContent = h.toFixed(1);
  document.getElementById('mecaEpBar').setAttribute('height', (ep*scale).toFixed(1));
  document.getElementById('mecaEpBar').setAttribute('y', (85-ep*scale).toFixed(1));
  document.getElementById('mecaEcBar').setAttribute('height', (ec*scale).toFixed(1));
  document.getElementById('mecaEcBar').setAttribute('y', (85-ec*scale).toFixed(1));
  document.getElementById('mecaEmBar').setAttribute('height', (em*scale).toFixed(1));
  document.getElementById('mecaEmBar').setAttribute('y', (85-em*scale).toFixed(1));
  document.getElementById('mecaEnergyReadout').innerHTML =
    `h = ${h.toFixed(1)} m &nbsp;·&nbsp; E_p = mgh = <strong>${ep.toFixed(1)} J</strong> &nbsp;·&nbsp; E_c = <strong>${ec.toFixed(1)} J</strong> &nbsp;·&nbsp; E_m = <strong>${em.toFixed(1)} J</strong><br>` +
    `L'énergie mécanique E_m = E_c+E_p reste constante (chute libre, sans frottement) : elle se transforme seulement de potentielle en cinétique.`;
}
function initMecaEnergy(){ updateMecaEnergy(); }

/* =========================== CHAPITRE 3 — Travail, puissance et énergie =========================== */
MECA_CHAPTERS[mecaKey('Travail, puissance et énergie')] = {
  objectives: [
    "Calculer le travail d'une force constante ou variable le long d'un déplacement",
    "Énoncer et appliquer le théorème de l'énergie cinétique",
    "Distinguer une force conservative de l'énergie potentielle qui lui est associée",
    "Utiliser la conservation de l'énergie mécanique pour résoudre un problème sans frottement",
    "Analyser un problème mécanique pour évaluer s'il est plus efficace de le traiter par le PFD ou par un bilan énergétique"
  ],
  prereqs: ["Dynamique du point matériel"],
  bodyHtml: `
    <p>Au XVIIe siècle, Leibniz se dispute avec les partisans de Newton sur la véritable « quantité de mouvement » d'un corps — un débat, la fameuse « querelle des forces vives », qui préfigure sans le savoir la distinction moderne entre quantité de mouvement et énergie cinétique. Il faudra encore un siècle et demi, et les travaux de Joule sur l'équivalence chaleur-travail, pour que la notion d'énergie prenne la forme unifiée que tu vas découvrir ici.</p>
    <p>L'énergie est sans doute le concept le plus universel de toute la physique : elle relie la mécanique à la thermodynamique, à l'électromagnétisme, à la chimie et même à la relativité (via $E=mc^2$). Un barrage hydroélectrique, une centrale nucléaire, ou simplement la trajectoire d'un ballon de basket : tous obéissent au même principe de conservation.</p>
    <p>Ce chapitre t'offre une alternative redoutablement efficace au principe fondamental de la dynamique : au lieu de suivre l'évolution instantanée des forces (des vecteurs, compliqués à manipuler), tu relieras directement deux instants du mouvement grâce à des grandeurs scalaires — travail, énergie cinétique, énergie potentielle — souvent bien plus simples à calculer.</p>

    <h3>1. Travail d'une force</h3>
    <p>Le <strong>travail élémentaire</strong> d'une force $\\vec F$ lors d'un déplacement élémentaire $d\\vec r$ est $\\delta W = \\vec F\\cdot d\\vec r$. Le travail total le long d'une trajectoire de $A$ à $B$ est :</p>
    <div class="formula-box">$$W_{A\\to B}(\\vec F) = \\int_A^B \\vec F \\cdot d\\vec r$$</div>
    <p>Pour une force <strong>constante</strong> (en norme et direction), cette intégrale se simplifie : $W_{A\\to B}=\\vec F\\cdot\\vec{AB}=F\\,d\\,\\cos\\theta$, où $\\theta$ est l'angle entre la force et le déplacement.</p>
    <table class="mini-table">
      <tr><th>Configuration</th><th>Signe du travail</th></tr>
      <tr><td>$\\theta=0$ (force dans le sens du mouvement)</td><td>$W>0$ (travail moteur)</td></tr>
      <tr><td>$\\theta=90°$ (force perpendiculaire au mouvement)</td><td>$W=0$</td></tr>
      <tr><td>$\\theta=180°$ (force opposée au mouvement)</td><td>$W<0$ (travail résistant)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La réaction normale $\\vec N$ et la tension d'un fil (dans de nombreux cas) ne travaillent <strong>jamais</strong>, car elles restent perpendiculaires au déplacement — c'est un raccourci de calcul très utile.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un patineur glisse sur la glace à vitesse constante pendant plusieurs secondes. La réaction normale du sol et le poids agissent tous deux sur lui en permanence. Pourtant, aucune de ces deux forces ne modifie son énergie cinétique. Pourquoi ?
    </div>

    <h3>2. Puissance</h3>
    <p>La <strong>puissance</strong> instantanée d'une force est le travail fourni par unité de temps :</p>
    <div class="formula-box">$$P = \\frac{\\delta W}{dt} = \\vec F\\cdot\\vec v$$</div>
    <p>Unité : le watt (W = J/s). Le travail total se retrouve en intégrant la puissance sur la durée : $W=\\int P\\,dt$.</p>

    <h3>3. Théorème de l'énergie cinétique</h3>
    <p>L'<strong>énergie cinétique</strong> d'un point matériel est $E_c=\\frac12mv^2$. Le théorème de l'énergie cinétique relie sa variation à la somme des travaux de toutes les forces appliquées :</p>
    <div class="formula-box">$$\\Delta E_c = E_{c,B}-E_{c,A} = \\sum W_{A\\to B}(\\vec F_i)$$</div>
    <p>C'est un théorème extrêmement puissant : il permet de trouver directement une vitesse finale sans jamais résoudre l'équation différentielle du mouvement.</p>

    <h3>4. Forces conservatives et énergie potentielle</h3>
    <p>Une force est dite <strong>conservative</strong> si son travail ne dépend que des points de départ et d'arrivée (pas du chemin suivi). On lui associe alors une <strong>énergie potentielle</strong> $E_p$ telle que :</p>
    <div class="formula-box">$$W_{A\\to B}(\\vec F) = -\\big(E_{p,B}-E_{p,A}\\big) = -\\Delta E_p$$</div>
    <table class="mini-table">
      <tr><th>Force conservative</th><th>Énergie potentielle associée</th></tr>
      <tr><td>Poids $\\vec P=m\\vec g$</td><td>$E_p = mgz+cste$ (z = altitude)</td></tr>
      <tr><td>Force de rappel élastique $\\vec F=-k\\vec x$</td><td>$E_p=\\frac12kx^2+cste$</td></tr>
      <tr><td>Force de gravitation / force électrostatique</td><td>$E_p=-\\dfrac{k}{r}+cste$</td></tr>
    </table>
    <p>Le frottement, en revanche, n'est <strong>pas</strong> conservatif : son travail dépend du chemin parcouru (plus le trajet est long, plus il dissipe d'énergie), et on ne peut pas lui associer d'énergie potentielle.</p>
    <p><strong>Contre-exemple à méditer :</strong> le poids est conservatif, mais si l'on considère la force de frottement de l'air (traînée), celle-ci dépend de la vitesse et s'oppose toujours au mouvement : faire l'aller-retour entre deux points ne redonne jamais l'énergie dépensée à l'aller — contrairement au poids, pour lequel monter puis redescendre restitue exactement l'énergie potentielle gagnée. C'est ce contraste qui définit, au fond, ce que signifie « conservatif ».</p>

    <h3>5. Énergie mécanique et sa conservation</h3>
    <p>L'<strong>énergie mécanique</strong> est la somme $E_m=E_c+E_p$. Si les seules forces qui travaillent sont conservatives (pas de frottement, pas de force extérieure motrice), l'énergie mécanique se <strong>conserve</strong> : elle ne fait que se transformer, d'une forme à l'autre.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 100" width="100%">
          <line x1="15" y1="90" x2="150" y2="90" stroke="#3A4658" stroke-width="1"/>
          <path d="M20,20 Q80,90 140,20" stroke="#F0B94D" stroke-width="1.8" fill="none"/>
          <text x="10" y="15" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">Ep (haut) → Ec (bas)</text>
        </svg>
        <span>Le long d'une trajectoire sans frottement, Ep et Ec se convertissent l'une en l'autre, Em restant constante</span>
      </div>
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un objet est lâché sans vitesse initiale d'une hauteur $H=5$ m. Quelle est sa vitesse juste avant de toucher le sol (on néglige les frottements de l'air) ?</p>
      <p><strong>Solution :</strong> conservation de l'énergie mécanique entre le départ (v=0, z=H) et l'arrivée (v=?, z=0) : $mgH = \\frac12mv^2$, donc $v=\\sqrt{2gH}$.</p>
      <p class="example-answer">Réponse : $v=\\sqrt{2\\times9{,}8\\times5}\\approx9{,}9$ m/s.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Deux billes de masses différentes sont lâchées sans vitesse initiale de la même hauteur H, sans frottement. D'après la formule $v=\\sqrt{2gH}$, arrivent-elles au sol avec la même vitesse ? Cela te semble-t-il surprenant au vu de ton intuition sur des objets « lourds » et « légers » ?
    </div>

    <h3>6. Frontière de la recherche — l'énergie, du macroscopique au quantique</h3>
    <p>La conservation de l'énergie mécanique que tu étudies ici sur un point matériel est un cas particulier du premier principe de la thermodynamique, l'un des piliers les plus solides de toute la physique — jamais mis en défaut expérimentalement depuis sa formulation par Joule et Mayer au XIXe siècle. Aujourd'hui, ce même principe guide la conception des systèmes de récupération d'énergie au freinage des voitures électriques (l'énergie cinétique du véhicule, au lieu d'être dissipée en chaleur dans les freins, est reconvertie en énergie électrique stockée dans la batterie) — une application directe et très concrète du théorème de l'énergie cinétique.</p>
    <p><strong>Question ouverte :</strong> à l'échelle cosmologique, l'énergie totale de l'Univers (y compris l'énergie sombre, qui domine son contenu énergétique actuel) reste-t-elle réellement conservée dans un espace-temps en expansion ? La réponse, contre-intuitive, est activement débattue en cosmologie relativiste : la notion même de conservation de l'énergie doit y être redéfinie avec précaution.</p>
    <p><strong>Technologie émergente :</strong> les volants d'inertie à très haute vitesse de rotation (utilisés pour stocker de l'énergie cinétique, notamment dans certains réseaux électriques et véhicules de course) et les batteries à flux redox sont deux technologies de stockage d'énergie en plein essor, directement fondées sur les principes de conversion Ep ↔ Ec ↔ énergie électrique que tu étudies ici sous leur forme la plus simple.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Travail des forces $W$ → théorème de l'énergie cinétique $\\Delta E_c$ → (si conservatif) énergie potentielle $E_p$ → énergie mécanique $E_m=E_c+E_p$ conservée
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\Delta E_c = \\sum W_{A\\to B}(\\vec F_i)$$
      Le théorème de l'énergie cinétique : la relation la plus directe entre les forces appliquées et le changement de vitesse, sans jamais résoudre d'équation différentielle.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>W(F) = ∫F·dr ; pour une force constante, W=F·d·cosθ</li>
        <li>Théorème de l'énergie cinétique : ΔEc = ΣW(forces) — très puissant pour trouver une vitesse sans résoudre d'équation différentielle</li>
        <li>Force conservative ⟺ W ne dépend pas du chemin ⟺ énergie potentielle associée existe (W=−ΔEp)</li>
        <li>Sans frottement, Em=Ec+Ep se conserve : elle ne fait que changer de forme</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le cosθ dans W=F·d·cosθ — une force perpendiculaire au déplacement ne travaille jamais (W=0), même si elle est grande</li>
        <li>Essayer d'attribuer une énergie potentielle à une force de frottement — c'est impossible, elle n'est pas conservative</li>
        <li>Confondre puissance moyenne (W/Δt) et puissance instantanée (F·v, qui varie si v varie)</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — conservation de l'énergie en chute libre</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Fais varier la hauteur actuelle h (chute depuis H=5 m) : observe Ep et Ec se transformer l'une en l'autre, alors que Em reste constante.</p>
      <div class="sim-2col">
        <svg viewBox="0 0 130 95" width="150" height="110">
          <line x1="10" y1="90" x2="120" y2="90" stroke="#3A4658" stroke-width="1"/>
          <rect id="mecaEpBar" x="15" y="10" width="22" height="75" fill="#F0B94D" opacity="0.7"/>
          <rect id="mecaEcBar" x="52" y="85" width="22" height="0" fill="#4C7CFF" opacity="0.7"/>
          <rect id="mecaEmBar" x="89" y="10" width="22" height="75" fill="#2DD4C4" opacity="0.5"/>
          <text x="16" y="8" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">Ep</text>
          <text x="55" y="8" font-family="IBM Plex Mono" font-size="8" fill="#4C7CFF">Ec</text>
          <text x="90" y="8" font-family="IBM Plex Mono" font-size="8" fill="#2DD4C4">Em</text>
        </svg>
        <div class="sim-controls">
          <label>h (m), chute depuis H=5 m : <span id="mecaHeightVal">5.0</span></label>
          <input type="range" id="mecaHeight" min="0" max="5" step="0.1" value="5" oninput="updateMecaEnergy()">
          <div class="sim-readout" id="mecaEnergyReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une force perpendiculaire au déplacement d'un objet fournit un travail :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca3e1" value="wrong"> maximal</label>
          <label class="option"><input type="radio" name="meca3e1" value="right"> nul</label>
          <label class="option"><input type="radio" name="meca3e1" value="wrong"> négatif</label>
          <label class="option"><input type="radio" name="meca3e1" value="wrong"> égal à F×d</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca3e1','meca3fb1','Correct — W=F·d·cos(90°)=0. C\\'est pourquoi la réaction normale ne travaille jamais.','W=F·d·cosθ, avec θ=90° ici : que vaut cos(90°) ?')">Vérifier</button>
        <div class="feedback" id="meca3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le frottement solide n'est pas une force conservative car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca3e2" value="wrong"> il ne travaille jamais</label>
          <label class="option"><input type="radio" name="meca3e2" value="right"> son travail dépend du chemin parcouru</label>
          <label class="option"><input type="radio" name="meca3e2" value="wrong"> il est toujours nul</label>
          <label class="option"><input type="radio" name="meca3e2" value="wrong"> il n'existe qu'en l'absence de mouvement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca3e2','meca3fb2','Correct — plus le trajet est long, plus le frottement dissipe d\\'énergie : son travail dépend du CHEMIN, pas seulement des points de départ et d\\'arrivée.','Une force conservative a un travail qui ne dépend QUE des points de départ/arrivée. Est-ce le cas du frottement ?')">Vérifier</button>
        <div class="feedback" id="meca3fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un objet lâché sans vitesse initiale d'une hauteur H=5 m arrive au sol avec une vitesse d'environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca3e3" value="wrong"> 5 m/s</label>
          <label class="option"><input type="radio" name="meca3e3" value="wrong"> 7 m/s</label>
          <label class="option"><input type="radio" name="meca3e3" value="right"> 9,9 m/s</label>
          <label class="option"><input type="radio" name="meca3e3" value="wrong"> 49 m/s</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca3e3','meca3fb3','Correct — v=√(2gH)=√(2×9,8×5)=√98≈9,9 m/s.','Utilise v=√(2gH) avec g=9,8 m/s² et H=5 m.')">Vérifier</button>
        <div class="feedback" id="meca3fb3"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4</span>
        <p class="q">Un ressort de raideur k=50 N/m est comprimé de 10 cm par rapport à sa longueur à vide. L'énergie potentielle élastique stockée vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca3e4" value="wrong"> 5 J</label>
          <label class="option"><input type="radio" name="meca3e4" value="wrong"> 2,5 J</label>
          <label class="option"><input type="radio" name="meca3e4" value="right"> 0,25 J</label>
          <label class="option"><input type="radio" name="meca3e4" value="wrong"> 0,025 J</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca3e4','meca3fb4','Correct — Ep=½k x²=½×50×(0,10)²=½×50×0,01=0,25 J. Attention à bien convertir 10 cm en 0,10 m avant de calculer.','Utilise Ep=½kx², avec x=0,10 m (converti en mètres) et k=50 N/m.')">Vérifier</button>
        <div class="feedback" id="meca3fb4"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 5</span>
        <p class="q">Une force constante de 20 N déplace un objet de 5 m, dans sa propre direction, en 2 s. La puissance moyenne développée par cette force vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca3e5" value="wrong"> 4 W</label>
          <label class="option"><input type="radio" name="meca3e5" value="wrong"> 10 W</label>
          <label class="option"><input type="radio" name="meca3e5" value="right"> 50 W</label>
          <label class="option"><input type="radio" name="meca3e5" value="wrong"> 100 W</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca3e5','meca3fb5','Correct — W=F·d=20×5=100 J, puis P_moy=W/t=100/2=50 W.','Calcule d\\'abord le travail W=F·d, puis divise par la durée t pour obtenir la puissance moyenne.')">Vérifier</button>
        <div class="feedback" id="meca3fb5"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 6 — à modéliser toi-même</span>
        <p class="q">Un skieur descend une piste de forme quelconque (pas nécessairement un plan incliné droit), avec un frottement non nul mais que l'on suppose de travail connu (mesuré expérimentalement à $W_{frott}=-1200$ J sur l'ensemble de la descente). Propose une démarche énergétique complète (sans PFD) pour retrouver sa vitesse en bas de piste, en fonction de sa masse $m$, de la dénivellation $H$, et de $W_{frott}$. Pourquoi cette approche reste-t-elle valable même si la piste a une forme compliquée, alors qu'une résolution par le PFD serait très difficile ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : écris le théorème de l'énergie cinétique en incluant le travail du poids (conservatif, ne dépend que de H) et le travail du frottement (donné directement, peu importe la forme du chemin).</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le frottement de l'air était totalement négligé dans les modèles météorologiques : quelles conséquences cela aurait-il sur la précision des prévisions de trajectoire de projectiles ou de précipitations ?</li>
        <li>Pourquoi peut-on dire que le théorème de l'énergie cinétique « contient » le PFD, alors que l'inverse n'est pas vrai directement (il faut intégrer le PFD le long de la trajectoire pour en déduire le théorème) ?</li>
        <li>Quelle serait la conséquence pratique, pour la conception des amortisseurs de voiture, si les matériaux utilisés se comportaient comme des ressorts parfaitement conservatifs (sans aucune dissipation) ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>G. W. Leibniz, correspondance sur les « forces vives », 1680-1690 — origine historique de la distinction quantité de mouvement / énergie cinétique.</li>
        <li>J.-P. Pérez, <em>Mécanique — Fondements et applications</em>, Dunod (chapitres sur le travail, la puissance et l'énergie).</li>
        <li>J. P. Joule, « On the Mechanical Equivalent of Heat », <em>Philosophical Transactions of the Royal Society</em>, 1850 — établissement expérimental de l'équivalence travail-chaleur.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes maintenant des trois grands outils de la mécanique du point : le PFD, le théorème du moment cinétique, et le bilan énergétique. Le dernier chapitre, « Mouvements particuliers », te montrera comment les combiner sur des cas emblématiques (pendule, satellite, oscillateur). Comme le résumait joliment Joule, physicien amateur devenu l'un des pères de l'énergie moderne : « Rien n'est perdu dans la nature ; les forces changent seulement de direction et de forme. »</p>
  `,
  init: initMecaEnergy
};

MECA_NOVA_KB[mecaKey('Travail, puissance et énergie')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Travail, puissance et énergie ». Demande-moi le théorème de l'énergie cinétique, ce qu'est une force conservative, ou un indice sur un exercice.",
  rules: [
    { test:/travail/i, replies:["Le travail d'une force constante est W=F·d·cosθ, où θ est l'angle entre la force et le déplacement. Une force perpendiculaire au mouvement (θ=90°) ne travaille jamais."] },
    { test:/puissance/i, replies:["La puissance instantanée est P=F·v (produit scalaire force-vitesse). Le travail total s'obtient en intégrant la puissance sur le temps : W=∫P dt."] },
    { test:/[ée]nergie cin[ée]tique|th[ée]or[èe]me.*[ée]nergie/i, replies:["Le théorème de l'énergie cinétique : ΔEc = ΣW(forces). Très puissant pour trouver une vitesse sans résoudre l'équation différentielle du mouvement."] },
    { test:/force conservative|[ée]nergie potentielle/i, replies:["Une force est conservative si son travail ne dépend que des points de départ/arrivée (pas du chemin). On lui associe alors une énergie potentielle Ep telle que W=−ΔEp."] },
    { test:/[ée]nergie m[ée]canique|conservation.*[ée]nergie/i, replies:["Em=Ec+Ep. Sans frottement (forces conservatives uniquement), Em se conserve : elle change juste de forme, potentielle ↔ cinétique."] },
    { test:/frottement.*conservati/i, replies:["Le frottement solide n'est PAS conservatif : son travail dépend du chemin parcouru (plus long = plus dissipé), donc on ne peut pas lui associer d'énergie potentielle."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise W=F·d·cosθ avec θ=90°.","Indice niveau 2 : cos(90°)=0.","Indice niveau 3 : le travail est nul."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : une force conservative a un travail indépendant du chemin.","Indice niveau 2 : est-ce vrai pour le frottement ?","Indice niveau 3 : non, son travail dépend du chemin — donc pas conservatif."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : utilise v=√(2gH).","Indice niveau 2 : 2×9,8×5=98.","Indice niveau 3 : v=√98≈9,9 m/s."] },
    { test:/exercice\s*4/i, hint:true, replies:["Pour l'exercice 4 : utilise Ep=½kx².","Indice niveau 2 : convertis d'abord 10 cm en 0,10 m.","Indice niveau 3 : Ep=½×50×0,01=0,25 J."] },
    { test:/exercice\s*5/i, hint:true, replies:["Pour l'exercice 5 : calcule d'abord le travail W=F·d.","Indice niveau 2 : W=20×5=100 J.","Indice niveau 3 : P=W/t=100/2=50 W."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 4 — Pendule simple : longueur et période (Chapitre 4)
--------------------------------------------------------------------------------- */
function updateMecaPendulum(){
  const L = parseFloat(document.getElementById('mecaPendL').value);
  const g = 9.8;
  const T = 2*Math.PI*Math.sqrt(L/g);
  document.getElementById('mecaPendLVal').textContent = L.toFixed(1);
  document.getElementById('mecaPendTVal').textContent = T.toFixed(2);
  const pixLen = 15 + L*45;
  document.getElementById('mecaPendRod').setAttribute('y2', (25+pixLen).toFixed(1));
  document.getElementById('mecaPendBob').setAttribute('cy', (25+pixLen).toFixed(1));
}
function initMecaPendulum(){ updateMecaPendulum(); }

/* =========================== CHAPITRE 4 — Mouvements particuliers =========================== */
MECA_CHAPTERS[mecaKey('Mouvements particuliers')] = {
  objectives: [
    "Établir les équations horaires de la chute libre et du mouvement d'un projectile",
    "Calculer la portée, la flèche et le temps de vol d'un tir balistique",
    "Décrire le mouvement circulaire uniforme et non uniforme à l'aide des composantes de l'accélération",
    "Établir l'équation différentielle d'un oscillateur harmonique (pendule simple, système masse-ressort) et sa solution",
    "Analyser un mouvement complexe pour évaluer lequel de ces quatre modèles de référence (chute libre, tir, circulaire, oscillateur) s'y applique, seul ou combiné"
  ],
  prereqs: ["Travail, puissance et énergie"],
  bodyHtml: `
    <p>Ce chapitre est en un sens l'aboutissement de tout ce qui précède : il ne s'agit plus d'apprendre de nouveaux principes, mais de voir comment quatre situations concrètes — la chute libre, le tir balistique, le mouvement circulaire et l'oscillateur harmonique — se déduisent toutes des mêmes trois lois de Newton. C'est un moment charnière du cours, où la théorie abstraite rencontre enfin des objets du quotidien : une pomme qui tombe, un ballon lancé, un manège, une balançoire.</p>
    <p>Ces quatre modèles ne sont pas de simples exercices d'école : ils structurent une part immense de la physique et de l'ingénierie modernes. Le tir balistique gouverne la trajectoire d'un ballon de basket comme celle d'un missile ; l'oscillateur harmonique décrit un pendule aussi bien qu'un pont qui vibre, un atome dans un cristal, ou un circuit électrique oscillant — la même équation différentielle, encore et encore, sous des habits différents.</p>
    <p>À la fin de ce chapitre, tu sauras reconnaître, face à un problème nouveau, lequel de ces quatre modèles de référence s'applique — ou comment les combiner — ce qui est, in fine, la compétence la plus recherchée dans tout examen de mécanique du point.</p>

    <h3>1. Chute libre</h3>
    <p>Un objet en chute libre (on néglige les frottements de l'air) n'est soumis qu'à son poids : $m\\vec a=m\\vec g$, donc $\\vec a=\\vec g$ (indépendant de la masse — c'est l'universalité de la chute libre, déjà remarquée par Galilée). Pour une chute verticale sans vitesse initiale depuis une hauteur $H$ :</p>
    <div class="formula-box">$$v(t) = gt \\qquad h(t) = H - \\frac12gt^2 \\qquad v_{sol} = \\sqrt{2gH}$$</div>
    <div class="key-point">
      <span class="eyebrow">Avec frottement de l'air</span>
      En présence d'un frottement fluide (proportionnel à $v$ ou $v^2$), la vitesse tend asymptotiquement vers une <strong>vitesse limite</strong> $v_{lim}$, atteinte quand le poids équilibre exactement la force de frottement — c'est pourquoi une plume et une bille ne tombent pas à la même vitesse dans l'air (mais si, dans le vide !).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      En 1971, l'astronaute David Scott a lâché simultanément un marteau et une plume à la surface de la Lune, devant une caméra. Que prédit ce chapitre sur le résultat de cette expérience, et pourquoi la Lune est-elle un lieu idéal pour la réaliser (mieux qu'une chambre à vide sur Terre) ?
    </div>

    <h3>2. Mouvement d'un projectile (tir balistique)</h3>
    <p>On lance un projectile avec une vitesse initiale $v_0$ faisant un angle $\\alpha$ avec l'horizontale. Les deux directions se traitent <strong>indépendamment</strong> : mouvement uniforme selon $x$, uniformément varié selon $y$.</p>
    <div class="formula-box">$$x(t) = v_0\\cos\\alpha\\;t \\qquad y(t) = v_0\\sin\\alpha\\;t - \\frac12gt^2$$</div>
    <p>En éliminant $t$, on obtient l'équation de la trajectoire — une <strong>parabole</strong> :</p>
    <div class="formula-box">$$y(x) = x\\tan\\alpha - \\frac{g}{2v_0^2\\cos^2\\alpha}x^2$$</div>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 100" width="100%">
          <line x1="10" y1="90" x2="215" y2="90" stroke="#3A4658" stroke-width="1"/>
          <polyline points="15.0,90.0 24.5,77.7 34.0,66.6 43.5,56.9 53.0,48.4 62.5,41.2 72.0,35.4 81.5,30.9 91.0,27.6 100.5,25.7 110.0,25.0 119.5,25.7 129.0,27.6 138.5,30.9 148.0,35.4 157.5,41.3 167.0,48.4 176.5,56.9 186.0,66.6 195.5,77.7 205.0,90.0" stroke="#F0B94D" stroke-width="1.8" fill="none"/>
          <line x1="15" y1="90" x2="35" y2="70" stroke="#4C7CFF" stroke-width="1.6" marker-end="url(#mecaArrV0)"/>
          <text x="38" y="70" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">v₀</text>
          <text x="105" y="18" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">flèche H</text>
          <text x="185" y="86" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">portée R</text>
          <defs><marker id="mecaArrV0" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#4C7CFF"/></marker></defs>
        </svg>
        <span>Trajectoire parabolique d'un projectile (ici v₀=20 m/s, α=40° : portée ≈40,2 m, flèche ≈8,4 m)</span>
      </div>
    </div>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Formule</th></tr>
      <tr><td>Temps de vol (retour à $y=0$)</td><td>$t_{vol}=\\dfrac{2v_0\\sin\\alpha}{g}$</td></tr>
      <tr><td>Portée $R$</td><td>$R=\\dfrac{v_0^2\\sin(2\\alpha)}{g}$ (maximale pour $\\alpha=45°$)</td></tr>
      <tr><td>Flèche $H$ (hauteur maximale)</td><td>$H=\\dfrac{v_0^2\\sin^2\\alpha}{2g}$</td></tr>
    </table>

    <h3>3. Mouvement circulaire</h3>
    <p>Pour un mouvement circulaire de rayon $R$, on utilise avantageusement la base de Frenet ou la base polaire (avec $r=R$ constant). La vitesse angulaire $\\omega=\\dot\\theta$ donne $v=R\\omega$.</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Caractéristique</th><th>Accélération</th></tr>
      <tr><td>Uniforme</td><td>$\\omega$ constante, $T=\\dfrac{2\\pi}{\\omega}$</td><td>purement centripète, $a=\\dfrac{v^2}{R}=R\\omega^2$</td></tr>
      <tr><td>Non uniforme</td><td>$\\omega$ variable</td><td>$a_T=R\\dot\\omega\\neq0$ en plus de $a_N=R\\omega^2$</td></tr>
    </table>
    <p><strong>Cas limite :</strong> peut-on avoir un mouvement circulaire avec une accélération totale nulle ? Non — même dans le cas uniforme le plus « calme », $a_N=v^2/R$ ne s'annule que si $v=0$ (le point est immobile) ou $R\\to\\infty$ (le cercle dégénère en droite). Un mouvement réellement circulaire implique toujours une accélération non nulle, dirigée vers le centre.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 130 90" width="100%">
          <circle cx="60" cy="60" r="40" fill="none" stroke="#3A4658" stroke-width="1" stroke-dasharray="3,2"/>
          <circle cx="90.6" cy="34.3" r="3" fill="#F0B94D"/>
          <line x1="90.6" y1="34.3" x2="74.5" y2="15.1" stroke="#4C7CFF" stroke-width="1.8" marker-end="url(#mecaArrVc)"/>
          <text x="55" y="12" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">v (tangente)</text>
          <line x1="90.6" y1="34.3" x2="75.3" y2="47.2" stroke="#FF6B6F" stroke-width="1.8" marker-end="url(#mecaArrAc)"/>
          <text x="65" y="55" font-family="IBM Plex Mono" font-size="9" fill="#FF6B6F">a (centripète)</text>
          <defs>
            <marker id="mecaArrVc" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#4C7CFF"/></marker>
            <marker id="mecaArrAc" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#FF6B6F"/></marker>
          </defs>
        </svg>
        <span>Mouvement circulaire uniforme : v est tangente au cercle, a pointe toujours vers le centre</span>
      </div>
    </div>

    <h3>4. Oscillateur harmonique : pendule simple et masse-ressort</h3>
    <p>Pour un pendule simple (masse ponctuelle $m$ au bout d'un fil de longueur $L$, sans frottement) écarté d'un petit angle, le PFD projeté sur la direction tangentielle donne, dans l'<strong>approximation des petits angles</strong> ($\\sin\\theta\\approx\\theta$) :</p>
    <div class="formula-box">$$\\ddot\\theta + \\frac{g}{L}\\theta = 0 \\qquad\\Longrightarrow\\qquad \\theta(t) = \\theta_0\\cos(\\omega t+\\varphi), \\quad \\omega=\\sqrt{\\frac{g}{L}}, \\quad T=2\\pi\\sqrt{\\frac{L}{g}}$$</div>
    <p>Pour un système masse-ressort horizontal (masse $m$, raideur $k$, sans frottement), la force de rappel élastique $F=-kx$ donne de façon analogue :</p>
    <div class="formula-box">$$m\\ddot x + kx = 0 \\qquad\\Longrightarrow\\qquad x(t)=x_0\\cos(\\omega t+\\varphi), \\quad \\omega=\\sqrt{\\frac{k}{m}}, \\quad T=2\\pi\\sqrt{\\frac{m}{k}}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — la période du pendule ne dépend pas de la masse</span>
      La période $T=2\\pi\\sqrt{L/g}$ du pendule simple ne dépend <strong>ni de la masse</strong>, ni de l'amplitude (tant que celle-ci reste petite) — seulement de la longueur $L$ et de $g$. C'est ce résultat, dit isochronisme des petites oscillations, que Galileo aurait observé en comparant le balancement d'un lustre à son pouls.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'isochronisme du pendule simple n'est vrai qu'en <strong>approximation</strong> des petits angles. Que penses-tu qu'il se passe pour la période si l'on écarte le pendule d'un angle de 90° au lieu de quelques degrés ? La période sera-t-elle encore exactement $2\\pi\\sqrt{L/g}$ ?
    </div>

    <h3>5. Frontière de la recherche — l'oscillateur harmonique, un modèle universel</h3>
    <p>L'équation $\\ddot x + \\omega^2 x = 0$ que tu viens d'établir pour un pendule ou un ressort est, sans exagération, l'une des équations les plus importantes de toute la physique : elle décrit aussi, avec les bonnes variables, un circuit électrique LC, les vibrations d'un pont, ou même — en mécanique quantique — l'état fondamental d'un atome piégé par laser. Les horloges atomiques, qui définissent la seconde avec une précision de l'ordre de $10^{-18}$, exploitent une version quantique de cet oscillateur (la transition entre deux niveaux d'énergie d'un atome de césium ou de strontium) pour obtenir une stabilité de fréquence sans équivalent.</p>
    <p><strong>Question ouverte :</strong> au-delà de l'approximation des petits angles, l'équation exacte du pendule simple ($\\ddot\\theta+\\frac{g}{L}\\sin\\theta=0$) n'a pas de solution analytique simple en fonctions élémentaires (elle fait intervenir des intégrales elliptiques). Comprendre et maîtriser numériquement ce régime « grand angle », y compris ses comportements chaotiques pour un double pendule, reste un terrain d'étude actif en dynamique non linéaire.</p>
    <p><strong>Technologie émergente :</strong> les capteurs MEMS à masse oscillante (mêmes principes que le système masse-ressort de ce chapitre, miniaturisés au micromètre) équipent aujourd'hui la quasi-totalité des smartphones pour détecter l'orientation et les vibrations — une application directe, à très petite échelle, de l'équation que tu viens d'apprendre à résoudre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Chute libre / tir / circulaire / oscillateur → même point de départ : PFD $\\sum\\vec F=m\\vec a$ → projection adaptée à la géométrie → équations horaires spécifiques
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\ddot x + \\omega^2 x = 0 \\qquad\\Longrightarrow\\qquad x(t) = x_0\\cos(\\omega t + \\varphi)$$
      L'équation de l'oscillateur harmonique — sans doute l'équation différentielle la plus rencontrée dans toute la physique, sous des formes et des variables différentes.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Chute libre : a=g (indépendant de la masse) ; v=√(2gH) à l'arrivée au sol</li>
        <li>Projectile : mouvement horizontal uniforme + mouvement vertical uniformément varié, trajectoire parabolique</li>
        <li>Portée maximale pour un tir à 45° ; R=v0²sin(2α)/g</li>
        <li>Pendule simple (petites oscillations) : T=2π√(L/g), indépendant de la masse et de l'amplitude</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que le mouvement horizontal et vertical d'un projectile sont INDÉPENDANTS — on ne mélange jamais vx et vy dans les mêmes équations</li>
        <li>Croire qu'un angle de tir plus grand donne toujours une portée plus grande — la portée est maximale à 45°, puis diminue au-delà</li>
        <li>Oublier la condition des « petites oscillations » (sinθ≈θ) — la formule T=2π√(L/g) n'est qu'une approximation, invalide pour de grandes amplitudes</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — pendule simple</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Fais varier la longueur L du pendule et observe l'effet réel sur la période T = 2π√(L/g).</p>
      <div class="sim-2col">
        <svg viewBox="0 0 100 140" width="110" height="150">
          <line x1="50" y1="15" x2="50" y2="25" stroke="#5A6472" stroke-width="2"/>
          <line id="mecaPendRod" x1="50" y1="25" x2="50" y2="70" stroke="#5A6472" stroke-width="2"/>
          <circle id="mecaPendBob" cx="50" cy="70" r="9" fill="#4C7CFF"/>
        </svg>
        <div class="sim-controls">
          <label>Longueur L : <span id="mecaPendLVal">1.0</span> m</label>
          <input type="range" id="mecaPendL" min="0.3" max="2.5" step="0.1" value="1" oninput="updateMecaPendulum()">
          <p class="sim-result">Période T ≈ <strong id="mecaPendTVal">2.01</strong> s</p>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un tir balistique a la portée la plus grande pour un angle de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca4e1" value="wrong"> 20°</label>
          <label class="option"><input type="radio" name="meca4e1" value="right"> 45°</label>
          <label class="option"><input type="radio" name="meca4e1" value="wrong"> 70°</label>
          <label class="option"><input type="radio" name="meca4e1" value="wrong"> 90°</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca4e1','meca4fb1','Correct — R=v0²sin(2α)/g est maximale quand sin(2α)=1, soit 2α=90°, donc α=45°.','R=v0²sin(2α)/g : pour quelle valeur de α le sinus vaut-il 1 ?')">Vérifier</button>
        <div class="feedback" id="meca4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si on double la masse d'un pendule simple (même longueur), sa période :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca4e2" value="wrong"> double</label>
          <label class="option"><input type="radio" name="meca4e2" value="wrong"> est divisée par 2</label>
          <label class="option"><input type="radio" name="meca4e2" value="right"> ne change pas</label>
          <label class="option"><input type="radio" name="meca4e2" value="wrong"> devient nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca4e2','meca4fb2','Correct — T=2π√(L/g) ne dépend pas de la masse : c\\'est l\\'isochronisme du pendule simple.','La formule T=2π√(L/g) fait-elle intervenir la masse m ?')">Vérifier</button>
        <div class="feedback" id="meca4fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour un mouvement circulaire NON uniforme, l'accélération tangentielle a_T :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca4e3" value="wrong"> est toujours nulle</label>
          <label class="option"><input type="radio" name="meca4e3" value="right"> est non nulle</label>
          <label class="option"><input type="radio" name="meca4e3" value="wrong"> est égale à v²/R</label>
          <label class="option"><input type="radio" name="meca4e3" value="wrong"> n'existe pas dans ce cas</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca4e3','meca4fb3','Correct — « non uniforme » signifie que la norme de la vitesse change, donc a_T=dv/dt≠0 (en plus de a_N=v²/R).','« Non uniforme » veut dire que la vitesse (en norme) change au cours du temps — quelle composante d\\'accélération cela implique-t-il ?')">Vérifier</button>
        <div class="feedback" id="meca4fb3"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4</span>
        <p class="q">Un projectile est lancé sans frottement avec une vitesse initiale v₀=36 km/h formant un angle α=60° avec l'horizontale. Pendant tout le vol, la composante horizontale v_x de sa vitesse :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca4e4" value="wrong"> augmente au cours du temps</label>
          <label class="option"><input type="radio" name="meca4e4" value="wrong"> diminue puis s'annule</label>
          <label class="option"><input type="radio" name="meca4e4" value="right"> reste constante, égale à v0cosα=5 m/s</label>
          <label class="option"><input type="radio" name="meca4e4" value="wrong"> vaut 10 m/s en permanence</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca4e4','meca4fb4','Correct — sans frottement, il n\\'y a aucune force horizontale : ẍ=0, donc v_x=v0cosα=(36/3,6)×0,5=5 m/s reste constante tout au long du vol (seule v_z change, à cause de g).','Convertis v0 en m/s (36 km/h=10 m/s), puis rappelle-toi qu\\'aucune force n\\'agit horizontalement en l\\'absence de frottement.')">Vérifier</button>
        <div class="feedback" id="meca4fb4"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 5</span>
        <p class="q">Pour un tir balistique de vitesse initiale v₀ et d'angle α (sans frottement), la hauteur maximale atteinte au sommet de la trajectoire vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="meca4e5" value="wrong"> h = v0sinα/g</label>
          <label class="option"><input type="radio" name="meca4e5" value="right"> h = (v0sinα)²/(2g)</label>
          <label class="option"><input type="radio" name="meca4e5" value="wrong"> h = v0²sin(2α)/g</label>
          <label class="option"><input type="radio" name="meca4e5" value="wrong"> h = v0²/(2g)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('meca4e5','meca4fb5','Correct — au sommet, v_z=0 : v0sinα − gt_s=0 donne t_s=v0sinα/g, puis en reportant dans z(t) on obtient h=(v0sinα)²/(2g) (seule la composante verticale de v0 compte).','Le sommet est atteint quand v_z=0. Trouve d\\'abord t_sommet, puis reporte-le dans z(t).')">Vérifier</button>
        <div class="feedback" id="meca4fb5"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 6 — à modéliser toi-même</span>
        <p class="q">Un enfant sur une balançoire peut être modélisé, en première approximation, comme un pendule simple. En te basant sur ce que tu sais de l'isochronisme, explique pourquoi se balancer plus fort (plus grande amplitude) ne change presque pas la fréquence des oscillations pour de petits angles, mais change forcément la fréquence si l'enfant se balance très haut (grand angle). Comment pourrais-tu, sans calcul complet, estimer à partir de quel angle l'approximation des petits angles devient franchement mauvaise (disons, plus de 5% d'erreur sur la période) ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : compare le développement de Taylor de $\\sin\\theta$ à $\\theta$ lui-même, et demande-toi à partir de quel angle l'écart relatif entre les deux dépasse quelques pourcents.</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la Terre tournait beaucoup plus vite sur elle-même (journée de 2 heures au lieu de 24) : quels effets cela aurait-il sur la trajectoire apparente d'un tir balistique de longue portée, comme un obus d'artillerie ?</li>
        <li>Pourquoi un système masse-ressort vertical (soumis en plus à la gravité) a-t-il malgré tout la même pulsation $\\omega=\\sqrt{k/m}$ qu'un système horizontal ? Que devient alors la position d'équilibre ?</li>
        <li>Quelle serait la conséquence, pour la conception d'un pont, si sa fréquence propre d'oscillation coïncidait exactement avec la fréquence des pas d'une foule qui le traverse au pas cadencé ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Galilée, <em>Discours concernant deux sciences nouvelles</em>, 1638 — universalité de la chute libre et premières observations sur l'isochronisme du pendule.</li>
        <li>J.-P. Pérez, <em>Mécanique — Fondements et applications</em>, Dunod (synthèse des mouvements de référence en mécanique du point).</li>
        <li>A. D. Ludlow <em>et al.</em>, « Optical Atomic Clocks », <em>Reviews of Modern Physics</em>, 2015 — sur les horloges atomiques modernes fondées sur des oscillateurs quantiques.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Te voilà arrivé au bout de la mécanique du point matériel — un socle que tu retrouveras sous une forme ou une autre dans absolument tous les chapitres de physique à venir : mécanique des solides, électromagnétisme, mécanique quantique. Comme le disait Richard Feynman à ses étudiants : « Ce que je ne peux pas construire, je ne le comprends pas. » Tu as maintenant construit, pièce par pièce, les quatre mouvements les plus fondamentaux de la physique classique — à toi de les reconnaître partout où ils se cachent.</p>
  `,
  init: initMecaPendulum
};

MECA_NOVA_KB[mecaKey('Mouvements particuliers')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Mouvements particuliers ». Demande-moi la formule de la portée, pourquoi la période du pendule ne dépend pas de la masse, ou un indice sur un exercice.",
  rules: [
    { test:/chute libre/i, replies:["En chute libre, a=g (indépendant de la masse). Pour une chute sans vitesse initiale depuis H : v_sol=√(2gH)."] },
    { test:/projectile|tir balistique|port[ée]e|fl[èe]che/i, replies:["Mouvement horizontal uniforme + vertical uniformément varié → trajectoire parabolique. Portée R=v0²sin(2α)/g (maximale à 45°) ; flèche H=v0²sin²α/(2g) ; temps de vol=2v0sinα/g."] },
    { test:/mouvement circulaire/i, replies:["Mouvement circulaire uniforme : ω constant, a purement centripète (v²/R). Non uniforme : il y a en plus une composante tangentielle a_T=Rω̇ (car la norme de v change)."] },
    { test:/pendule simple|oscillateur|isochronisme/i, replies:["Pendule simple (petites oscillations) : θ''+  (g/L)θ=0, solution θ(t)=θ0cos(ωt+φ) avec ω=√(g/L), donc T=2π√(L/g) — indépendant de la masse ET de l'amplitude (isochronisme)."] },
    { test:/masse.ressort/i, replies:["Système masse-ressort (sans frottement) : mẍ+kx=0, solution x(t)=x0cos(ωt+φ) avec ω=√(k/m), donc T=2π√(m/k)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : R dépend de sin(2α).","Indice niveau 2 : sin(2α) est maximal (=1) quand 2α=90°.","Indice niveau 3 : α=45°."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde la formule T=2π√(L/g).","Indice niveau 2 : la masse n'apparaît pas dans cette formule.","Indice niveau 3 : la période ne change pas."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : « non uniforme » concerne la norme de la vitesse.","Indice niveau 2 : si v change, dv/dt≠0.","Indice niveau 3 : a_T est non nulle."] },
    { test:/exercice\s*4/i, hint:true, replies:["Pour l'exercice 4 : sans frottement, y a-t-il une force horizontale ?","Indice niveau 2 : non, donc v_x reste constante = v0cosα.","Indice niveau 3 : v0=10 m/s, v_x=10×0,5=5 m/s."] },
    { test:/exercice\s*5/i, hint:true, replies:["Pour l'exercice 5 : le sommet est atteint quand v_z=0.","Indice niveau 2 : trouve t_sommet=v0sinα/g.","Indice niveau 3 : reporte-le dans z(t) pour obtenir h=(v0sinα)²/(2g)."] }
  ]
};

/* fusionne le module Mécanique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, MECA_CHAPTERS);
Object.assign(NOVA_KB, MECA_NOVA_KB);