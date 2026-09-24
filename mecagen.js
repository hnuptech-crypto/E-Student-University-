/* =====================================================================
   CHUNK « mecagen » — registre MECAGEN_CHAPTERS / MECAGEN_NOVA_KB
   Matière(s) : Physique|Mécanique générale
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   MECAGEN_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ============================================================================
   MODULE MÉCANIQUE GÉNÉRALE — Physique L2
   (contenu rédigé selon le programme standard de mécanique générale en
   2ème année de Licence — cinématique et cinétique du solide, théorèmes
   généraux de la dynamique, théorème de König, chocs, statique du solide,
   référentiels non galiléens — conforme aux maquettes LMD francophones,
   fait suite au cours « Mécanique du point matériel » de L1 et prépare le
   cours « Mécanique analytique » de L3)
   Structure identique aux autres modules : MECAGEN_CHAPTERS / MECAGEN_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const MECAGEN_MATIERE = 'Mécanique générale';
function mecaGenKey(chapterTitle){ return `Physique|${MECAGEN_MATIERE}|${chapterTitle}`; }
const MECAGEN_CHAPTERS = {};
const MECAGEN_NOVA_KB = {};

/* =========================== CHAPITRE 0 — Cinématique du solide indéformable =========================== */
MECAGEN_CHAPTERS[mecaGenKey('Cinématique du solide indéformable')] = {
  objectives: [
    "Définir un solide indéformable et son torseur cinématique",
    "Établir et utiliser la formule de champ des vitesses (formule de Varignon) V(B)=V(A)+ω∧AB",
    "Distinguer translation, rotation autour d'un axe fixe et mouvement plan sur plan",
    "Composer des mouvements relatifs à plusieurs référentiels",
    "Évaluer en quoi le théorème d'Euler sur la rotation, en garantissant que tout déplacement d'un solide rigide équivaut à une rotation autour d'un axe unique, justifie la réduction du mouvement d'un solide entier à seulement six paramètres indépendants"
  ],
  prereqs: ["Cinématique du point matériel (L1)", "Notion de torseurs (L1)"],
  bodyHtml: `
    <p>En 1775, le mathématicien suisse Leonhard Euler démontra un théorème resté fondamental pour toute la mécanique du solide : tout déplacement d'un solide rigide autour d'un point fixe équivaut à une simple rotation autour d'un axe unique — le théorème d'Euler sur la rotation, qui justifie précisément l'existence du vecteur rotation instantané $\\vec\\omega$ que tu vas manipuler dans ce chapitre. Ce résultat, d'apparence purement géométrique, allait devenir l'un des piliers de la mécanique classique, de la navigation maritime à la robotique moderne.</p>
    <p>La structure de torseur que revêt le champ des vitesses d'un solide n'est pas un hasard mathématique : elle traduit une propriété physique profonde — connaître le mouvement d'un solide rigide en un seul point et sa rotation instantanée suffit à connaître entièrement le mouvement de chacun de ses points, aussi complexe que puisse paraître sa trajectoire globale. C'est cette réduction remarquable, de l'infinité des points d'un solide à seulement six paramètres indépendants, qui rend la mécanique du solide praticable.</p>
    <p>La mécanique du point matériel de L1 traitait des objets réduits à un point. Ce cours de <strong>mécanique générale</strong> étend l'étude aux systèmes de points et aux <strong>solides indéformables</strong> — des objets étendus dont la forme ne change pas au cours du mouvement. Ce premier chapitre pose le langage cinématique nécessaire pour décrire leur mouvement. À la fin de ce chapitre, tu sauras établir le champ des vitesses d'un solide, en reconnaître la structure de torseur, et l'appliquer aux mouvements particuliers.</p>

    <h3>1. Le solide indéformable</h3>
    <p>Un <strong>solide indéformable</strong> (ou solide rigide) est un ensemble de points matériels tel que la distance entre deux points quelconques du solide reste constante au cours du temps : $\\|M_1M_2\\| = \\text{cste}$ pour tout couple de points $M_1,M_2$ du solide. Décrire le mouvement complet d'un solide ne demande alors que <strong>6 paramètres indépendants</strong> : 3 pour repérer la position d'un point particulier (souvent son centre de masse) et 3 angles pour repérer son orientation dans l'espace.</p>

    <h3>2. Vecteur rotation instantané et champ des vitesses</h3>
    <p>À chaque instant, le mouvement d'un solide $(S)$ par rapport à un référentiel $\\mathcal{R}$ est caractérisé par un unique <strong>vecteur rotation instantané</strong> $\\vec\\omega(S/\\mathcal{R})$. La propriété fondamentale de la cinématique du solide est que les vitesses de deux points $A$ et $B$ du solide sont reliées par la <strong>formule du champ des vitesses</strong> (ou formule de Varignon) :</p>
    <div class="formula-box">$$\\vec V(B\\in S/\\mathcal{R}) = \\vec V(A\\in S/\\mathcal{R}) + \\vec\\omega(S/\\mathcal{R})\\wedge \\vec{AB}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Cette relation a exactement la structure d'un <strong>torseur</strong> : la résultante est $\\vec\\omega(S/\\mathcal{R})$ (la même en tout point du solide) et le moment en un point $A$ est la vitesse $\\vec V(A\\in S/\\mathcal{R})$ (qui varie d'un point à l'autre). On parle de <strong>torseur cinématique</strong> $\\{\\mathcal{V}(S/\\mathcal{R})\\} = \\{\\vec\\omega(S/\\mathcal{R}),\\ \\vec V(A\\in S/\\mathcal{R})\\}_A$.
    </div>
    <p>Contrairement au vecteur rotation, identique en tout point, le champ des vitesses n'est en général <strong>pas uniforme</strong> dans le solide : deux points distincts n'ont pas la même vitesse, sauf cas particulier de la translation.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le fait que le champ des vitesses ait la structure exacte d'un torseur — une résultante commune à tout le solide, un moment qui varie d'un point à l'autre — n'est pas un hasard mathématique. En quoi cette structure garantit-elle que connaître la vitesse d'un seul point du solide et son vecteur rotation instantané suffit à reconstruire la vitesse de n'importe quel autre point, aussi loin soit-il ?
    </div>

    <div class="diagram">
      <svg width="220" height="150" viewBox="0 0 220 150">
        <line x1="110" y1="10" x2="110" y2="140" stroke="#3D6BF0" stroke-width="2"/>
        <text x="118" y="20" font-size="11" fill="#3D6BF0">Δ (axe, ω)</text>
        <ellipse cx="110" cy="90" rx="70" ry="26" fill="none" stroke="#122043" stroke-width="1.4" stroke-dasharray="3,3"/>
        <circle cx="176" cy="90" r="4" fill="#F0555C"/>
        <text x="182" y="86" font-size="11" fill="#122043">M</text>
        <line x1="176" y1="90" x2="176" y2="55" stroke="#F0555C" stroke-width="2" marker-end="url(#arrM)"/>
        <text x="182" y="58" font-size="10" fill="#F0555C">V(M) = ω∧HM</text>
        <circle cx="110" cy="90" r="3" fill="#1FB6A8"/>
        <text x="90" y="105" font-size="10" fill="#1FB6A8">H (axe)</text>
        <defs><marker id="arrM" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#F0555C"/></marker></defs>
      </svg>
    </div>

    <h3>3. Mouvements particuliers</h3>
    <table class="mini-table">
      <tr><th>Mouvement</th><th>Caractéristique</th><th>Champ des vitesses</th></tr>
      <tr><td>Translation</td><td>$\\vec\\omega(S/\\mathcal{R})=\\vec 0$</td><td>Tous les points ont la même vitesse à chaque instant</td></tr>
      <tr><td>Rotation autour d'un axe fixe $\\Delta$</td><td>$\\vec\\omega = \\dot\\theta\\,\\vec u_\\Delta$, un point de $\\Delta$ est fixe</td><td>$\\vec V(M)=\\vec\\omega\\wedge\\vec{HM}$, $H$ = projeté de $M$ sur $\\Delta$ ; $\\|\\vec V(M)\\|=\\omega\\,r$</td></tr>
      <tr><td>Mouvement plan sur plan</td><td>Tous les points restent dans des plans parallèles à un plan fixe</td><td>Existence d'un <strong>centre instantané de rotation</strong> (CIR), point du plan de vitesse nulle à l'instant considéré</td></tr>
    </table>
    <p>Le <strong>centre instantané de rotation</strong> (CIR) est très utile pour les problèmes de roulement : pour une roue de rayon $R$ qui roule sans glisser sur un sol fixe, le CIR est le point de contact avec le sol (vitesse nulle à cet instant), et la vitesse du centre de la roue vaut simplement $V=\\omega R$.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le centre instantané de rotation d'une roue qui roule sans glisser coïncide, à chaque instant, avec le point de contact au sol — mais ce point change continuellement au fil du mouvement. Pourquoi est-il essentiel de bien distinguer ce point géométrique, qui « se déplace » sur le sol, d'un point matériel fixe de la roue elle-même, qui lui décrit une trajectoire bien plus complexe (une cycloïde) ?
    </div>

    <h3>4. Composition des mouvements</h3>
    <p>Lorsque plusieurs référentiels sont en jeu (par exemple un solide $2$ en mouvement par rapport à un solide $1$, lui-même en mouvement par rapport à un référentiel fixe $0$), les vecteurs rotation se composent simplement par addition vectorielle :</p>
    <div class="formula-box">$$\\vec\\omega(2/0) = \\vec\\omega(2/1) + \\vec\\omega(1/0)$$</div>
    <p>C'est la <strong>loi de composition des vecteurs rotation</strong>, conséquence de la dérivation composée des angles et bases mobiles ; elle généralise à plusieurs solides emboîtés (chaîne cinématique) la composition des vitesses angulaires déjà entrevue en L1 avec les coordonnées polaires.</p>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que tous les points d'un solide en rotation ont la <strong>même vitesse</strong> : seul $\\vec\\omega$ est commun à tout le solide, pas $\\vec V$</li>
        <li>Inverser l'ordre du produit vectoriel dans $\\vec V(B)=\\vec V(A)+\\vec\\omega\\wedge\\vec{AB}$ (ce n'est pas $\\vec{BA}$)</li>
        <li>Penser que le centre instantané de rotation est un point fixe du solide : c'est un point <strong>géométrique</strong>, différent à chaque instant, qui peut même être extérieur au solide</li>
        <li>Oublier qu'un mouvement de translation n'implique pas une trajectoire rectiligne : les points peuvent décrire des courbes, tant qu'ils gardent tous la même vitesse à chaque instant</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour un solide indéformable, la relation reliant les vitesses de deux points $A$ et $B$ s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen0e1" value="right"> $\\vec V(B) = \\vec V(A) + \\vec\\omega\\wedge\\vec{AB}$</label>
          <label class="option"><input type="radio" name="mgen0e1" value="wrong"> $\\vec V(B) = \\vec V(A) + \\vec\\omega\\wedge\\vec{BA}$</label>
          <label class="option"><input type="radio" name="mgen0e1" value="wrong"> $\\vec V(B) = \\vec V(A) - \\vec\\omega$</label>
          <label class="option"><input type="radio" name="mgen0e1" value="wrong"> $\\vec V(B) = \\vec\\omega\\wedge\\vec V(A)$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen0e1','mgen0fb1','Correct — c\\'est la formule du champ des vitesses (formule de Varignon), qui a la structure d\\'un torseur.','Repense à la structure d\\'un torseur : résultante ω commune, moment qui se transporte avec ω∧AB.')">Vérifier</button>
        <div class="feedback" id="mgen0fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une roue de rayon $R=30$ cm tourne à $\\omega=10$ rad/s autour de son axe fixe. La vitesse d'un point situé sur la jante vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen0e2" value="wrong"> 0,3 m/s</label>
          <label class="option"><input type="radio" name="mgen0e2" value="right"> 3 m/s</label>
          <label class="option"><input type="radio" name="mgen0e2" value="wrong"> 10 m/s</label>
          <label class="option"><input type="radio" name="mgen0e2" value="wrong"> 33,3 m/s</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen0e2','mgen0fb2','Correct — pour une rotation autour d\\'un axe fixe, V=ωr avec r la distance à l\\'axe : V=10×0,3=3 m/s.','Utilise V=ωr avec r la distance du point à l\\'axe de rotation.')">Vérifier</button>
        <div class="feedback" id="mgen0fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour une roue de rayon $R$ qui roule sans glisser sur un sol fixe, le centre instantané de rotation est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen0e3" value="wrong"> le centre de la roue</label>
          <label class="option"><input type="radio" name="mgen0e3" value="right"> le point de contact avec le sol</label>
          <label class="option"><input type="radio" name="mgen0e3" value="wrong"> un point fixe de la roue, quel que soit l'instant</label>
          <label class="option"><input type="radio" name="mgen0e3" value="wrong"> il n'existe pas pour ce mouvement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen0e3','mgen0fb3','Correct — la condition de roulement sans glissement impose une vitesse nulle au point de contact à chaque instant : c\\'est donc le CIR (qui change de point géométrique du sol au fil du mouvement).','Le CIR est le point de vitesse nulle à l\\'instant considéré : que dit le roulement sans glissement sur le point de contact ?')">Vérifier</button>
        <div class="feedback" id="mgen0fb3"></div>
      </div>
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Le formalisme du torseur cinématique que tu maîtrises dans ce chapitre, sous le nom de « théorie des visseurs » (screw theory), est aujourd'hui l'outil mathématique de référence pour la <strong>robotique industrielle</strong> : chaque articulation d'un bras robotisé impose une rotation ou une translation, et calculer la vitesse de l'outil final à partir des vitesses de chaque articulation (le problème de la cinématique directe) revient exactement à composer des torseurs cinématiques comme tu l'as fait dans ce chapitre. Le contrôle d'attitude des satellites artificiels, qui doivent orienter précisément leurs instruments ou leurs panneaux solaires à l'aide de roues de réaction, repose lui aussi directement sur la manipulation du vecteur rotation instantané.</p>
    <p><strong>Question ouverte :</strong> pour un robot à plusieurs articulations, le problème inverse — trouver les rotations de chaque articulation permettant d'atteindre une position et une orientation finale données de l'outil — est-il toujours résoluble de façon unique, ou existe-t-il des configurations où plusieurs solutions, voire aucune solution, sont possibles ?</p>
    <p><strong>Technologie émergente :</strong> les algorithmes de <strong>planification de trajectoire en temps réel</strong>, utilisés en robotique collaborative moderne, doivent résoudre en quelques millisecondes des milliers de compositions de torseurs cinématiques pour garantir des mouvements fluides et sûrs d'un robot évoluant à proximité d'opérateurs humains.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Solide indéformable (distance interne constante) → mouvement caractérisé par 6 paramètres (position + orientation) → vecteur rotation instantané ω, unique pour tout le solide → champ des vitesses (formule de Varignon), structure de torseur → cas particuliers (translation, rotation, mouvement plan avec CIR) → composition de mouvements par addition des ω
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\vec V(B\\in S/\\mathcal{R}) = \\vec V(A\\in S/\\mathcal{R}) + \\vec\\omega(S/\\mathcal{R})\\wedge \\vec{AB}$$
      Cette formule de champ des vitesses, héritière directe du théorème d'Euler sur la rotation, est l'équation la plus importante de tout le cours de mécanique générale : elle réduit la description du mouvement d'un solide, potentiellement constitué d'une infinité de points, à la connaissance d'un seul vecteur rotation et de la vitesse d'un seul point de référence.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Euler n'avait jamais démontré que tout déplacement d'un solide rigide équivaut à une rotation autour d'un axe unique : la notion de vecteur rotation instantané aurait-elle pu être formalisée aussi simplement ?</li>
        <li>Pourquoi la loi de composition des vecteurs rotation ω(2/0) = ω(2/1) + ω(1/0) se limite-t-elle à une simple addition vectorielle, alors que la composition des vitesses fait intervenir des termes supplémentaires (vitesse d'entraînement) ?</li>
        <li>Quelle serait la conséquence, pour la robotique industrielle moderne, d'une impossibilité de calculer rapidement la cinématique directe d'un bras robotisé à partir des rotations de chacune de ses articulations ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>L. Euler, « Formulae generales pro translatione quacunque corporum rigidorum », 1775 — le théorème fondateur de la rotation des solides rigides.</li>
        <li>J. P. Pérez, <em>Mécanique : fondements et applications</em>, Dunod — référence pédagogique française de référence sur la cinématique du solide.</li>
        <li>K. J. Waldron, G. L. Kinzel, <em>Kinematics, Dynamics, and Design of Machinery</em>, Wiley — sur l'application de la théorie des torseurs cinématiques à la robotique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais établir le champ des vitesses d'un solide, en reconnaître la structure de torseur, et l'appliquer aux mouvements particuliers. Le chapitre suivant, « Éléments cinétiques : centre de masse, quantité de mouvement et moment cinétique », introduira les grandeurs qui, combinées à cette cinématique, permettront d'écrire les lois du mouvement d'un solide. Comme le montre le théorème d'Euler : une observation géométrique en apparence abstraite peut, deux siècles et demi plus tard, devenir l'outil mathématique silencieux qui pilote chaque mouvement d'un bras robotisé industriel.</p>
  `
};

MECAGEN_NOVA_KB[mecaGenKey('Cinématique du solide indéformable')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Cinématique du solide indéformable ». Demande-moi la formule du champ des vitesses, ce qu'est le centre instantané de rotation, ou un indice sur un exercice.",
  rules: [
    { test:/champ des vitesses|varignon|torseur cin[ée]matique/i, replies:["V(B)=V(A)+ω∧AB : c'est la formule du champ des vitesses d'un solide, qui a la structure d'un torseur (résultante ω, moment V(A))."] },
    { test:/cir|centre instantan[ée]/i, replies:["Le centre instantané de rotation (CIR) est le point de vitesse nulle à un instant donné, dans un mouvement plan sur plan. Pour une roue qui roule sans glisser, c'est le point de contact avec le sol."] },
    { test:/translation/i, replies:["En translation, ω=0 : tous les points du solide ont, à chaque instant, exactement la même vitesse (même si leur trajectoire n'est pas forcément une droite)."] },
    { test:/composition.*mouvement|composition.*rotation/i, replies:["Les vecteurs rotation se composent simplement par addition : ω(2/0)=ω(2/1)+ω(1/0), pour une chaîne de solides emboîtés."] },
    { test:/degr[ée]s? de libert[ée]/i, replies:["Un solide libre dans l'espace a 6 degrés de liberté : 3 de translation (position d'un point) et 3 de rotation (orientation)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la structure d'un torseur.","Indice niveau 2 : la résultante ω est commune, le moment se transporte avec ω∧AB (dans cet ordre).","Indice niveau 3 : V(B)=V(A)+ω∧AB."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise V=ωr.","Indice niveau 2 : r est le rayon de la roue, donc r=0,3 m.","Indice niveau 3 : V=10×0,3=3 m/s."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le CIR est le point de vitesse nulle.","Indice niveau 2 : que dit le roulement sans glissement sur le point de contact ?","Indice niveau 3 : sa vitesse est nulle, donc c'est le CIR."] }
  ]
};

/* =========================== CHAPITRE 1 — Éléments cinétiques : centre de masse, quantité de mouvement et moment cinétique =========================== */
MECAGEN_CHAPTERS[mecaGenKey('Éléments cinétiques : centre de masse, quantité de mouvement et moment cinétique')] = {
  objectives: [
    "Définir le centre de masse d'un système discret ou continu",
    "Calculer la quantité de mouvement (résultante cinétique) d'un système",
    "Calculer le moment cinétique d'un système en un point donné",
    "Distinguer forces intérieures et extérieures et connaître leur propriété fondamentale",
    "Évaluer en quoi l'intuition d'Archimède sur le centre de gravité, formalisée pour des figures géométriques statiques il y a plus de deux mille ans, s'est généralisée jusqu'à devenir le principe qui permet de réduire le mouvement d'un système complexe à celui d'un point matériel fictif"
  ],
  prereqs: ["Moment cinétique du point matériel (L1)", "Cinématique du solide indéformable"],
  bodyHtml: `
    <p>Trois siècles avant notre ère, le savant grec Archimède de Syracuse rédigea le traité <em>De l'équilibre des plans</em>, dans lequel il détermina rigoureusement, pour la première fois de l'histoire, le centre de gravité de figures géométriques aussi variées qu'un triangle, un parallélogramme ou un segment de parabole — la toute première formalisation mathématique du concept de centre de masse que tu vas manipuler dans ce chapitre. Archimède utilisait déjà, sans le formuler en ces termes, l'idée que la masse totale d'un système « se comporte » comme si elle était concentrée en ce point unique — l'intuition exacte que révèle la relation $\\vec p = M\\vec v_G$.</p>
    <p>Cette intuition antique, vieille de plus de deux mille deux cents ans, reste d'une actualité frappante : chaque fois qu'un ingénieur calcule la trajectoire d'une fusée, d'un satellite ou même d'un simple projectile en négligeant les détails de sa forme pour ne s'intéresser qu'au mouvement de son centre de masse, il applique directement le principe qu'Archimède avait intuité pour des figures géométriques statiques, et qu'Euler puis Newton généralisèrent ensuite à des systèmes en mouvement.</p>
    <p>Pour étudier la dynamique d'un système de points matériels ou d'un solide, il faut d'abord savoir résumer son mouvement global par quelques grandeurs : le <strong>centre de masse</strong>, la <strong>quantité de mouvement</strong> et le <strong>moment cinétique</strong> du système. À la fin de ce chapitre, tu sauras calculer ces trois grandeurs cinétiques fondamentales et exploiter la propriété clé des forces intérieures.</p>

    <h3>1. Centre de masse (ou centre d'inertie)</h3>
    <p>Pour un système discret de $N$ points $M_i$ de masse $m_i$, le centre de masse $G$ est défini par :</p>
    <div class="formula-box">$$\\vec{OG} = \\frac{1}{M}\\sum_i m_i\\vec{OM_i} \\qquad M=\\sum_i m_i$$</div>
    <p>Pour un solide continu de masse volumique $\\rho$, la somme discrète devient une intégrale sur le volume $V$ du solide : $\\vec{OG}=\\frac{1}{M}\\displaystyle\\int_V \\vec{OM}\\,\\rho\\,dV$. Par symétrie, $G$ se trouve toujours sur un éventuel axe ou plan de symétrie matérielle du solide.</p>

    <h3>2. Quantité de mouvement d'un système</h3>
    <p>La quantité de mouvement (ou résultante cinétique) totale du système est la somme des quantités de mouvement de chaque point :</p>
    <div class="formula-box">$$\\vec p = \\sum_i m_i\\vec v_i = M\\,\\vec v_G$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Ce résultat remarquable dit que, pour ce qui est de la quantité de mouvement totale, <strong>tout se passe comme si toute la masse du système était concentrée en $G$</strong>, animé de la vitesse $\\vec v_G$. C'est ce qui permettra, au chapitre suivant, de traiter le mouvement d'ensemble d'un système compliqué comme celui d'un point matériel fictif.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Dire que la quantité de mouvement totale d'un système se comporte comme si toute sa masse était concentrée en G est une simplification remarquable : elle permet d'ignorer entièrement comment la masse est répartie à l'intérieur du système. Pourquoi cette simplification reste-t-elle valable même pour un système très étendu ou en pleine déformation interne, du moment que sa masse totale et la position de son centre de masse restent bien définies ?
    </div>

    <h3>3. Moment cinétique d'un système</h3>
    <p>Le moment cinétique du système en un point $A$ est la somme des moments cinétiques de chaque point matériel par rapport à $A$ :</p>
    <div class="formula-box">$$\\vec\\sigma_A = \\sum_i \\vec{AM_i}\\wedge m_i\\vec v_i$$</div>
    <p>Le couple $\\{\\vec p,\\ \\vec\\sigma_A\\}_A$ constitue le <strong>torseur cinétique</strong> du système (à ne pas confondre avec le torseur cinématique du chapitre précédent, qui décrit un mouvement et non une répartition de masse en mouvement). Comme tout torseur, le moment cinétique se transporte d'un point à un autre par la formule :</p>
    <div class="formula-box">$$\\vec\\sigma_A = \\vec\\sigma_B + \\vec{AB}\\wedge\\vec p$$</div>
    <p>En particulier, la relation entre le moment cinétique en un point fixe $O$ et au centre de masse $G$ est $\\vec\\sigma_O = \\vec\\sigma_G + \\vec{OG}\\wedge M\\vec v_G$.</p>

    <h3>4. Forces intérieures et forces extérieures</h3>
    <p>Les forces qui s'exercent sur les points d'un système se répartissent en <strong>forces extérieures</strong> (exercées par l'extérieur du système) et <strong>forces intérieures</strong> (exercées entre points du système lui-même, comme les forces de cohésion d'un solide). D'après le principe des actions réciproques (3ème loi de Newton), chaque force intérieure est associée à une force opposée colinéaire (elles agissent selon la droite qui joint les deux points), si bien que :</p>
    <div class="key-point">
      <span class="eyebrow">Propriété fondamentale des forces intérieures</span>
      La résultante et le moment (en tout point) des forces intérieures d'un système sont <strong>toujours nuls</strong> : $\\displaystyle\\sum \\vec F_{int} = \\vec 0$ et $\\displaystyle\\sum \\vec M_A(\\vec F_{int}) = \\vec 0$. Seules les forces <strong>extérieures</strong> peuvent modifier la quantité de mouvement ou le moment cinétique totaux du système.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le fait que la résultante et le moment des forces intérieures soient toujours nuls, quelle que soit la complexité du système, découle directement du principe des actions réciproques appliqué paire par paire. Pourquoi ce résultat reste-t-il vrai même pour un système comportant des millions de particules en interaction, sans qu'il soit nécessaire de connaître le détail de chacune de ces interactions internes ?
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que le moment cinétique en $O$ et en $G$ sont égaux : il faut toujours appliquer la formule de transport, sauf si $\\vec p=\\vec 0$</li>
        <li>Oublier qu'un objet non homogène n'a pas son centre de masse au centre géométrique</li>
        <li>Penser que les forces intérieures d'un système déformable ne travaillent jamais : leur résultante et leur moment sont nuls, mais leur <strong>puissance</strong> n'est pas nécessairement nulle (voir le chapitre sur le théorème de l'énergie cinétique)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Deux masses ponctuelles $m_1=2$ kg en $x_1=0$ et $m_2=6$ kg en $x_2=4$ m sont posées sur un axe. L'abscisse du centre de masse est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen1e1" value="wrong"> $x_G=2$ m</label>
          <label class="option"><input type="radio" name="mgen1e1" value="right"> $x_G=3$ m</label>
          <label class="option"><input type="radio" name="mgen1e1" value="wrong"> $x_G=4$ m</label>
          <label class="option"><input type="radio" name="mgen1e1" value="wrong"> $x_G=1,5$ m</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen1e1','mgen1fb1','Correct — x_G=(m1x1+m2x2)/(m1+m2)=(2×0+6×4)/8=24/8=3 m.','Applique x_G=(m1x1+m2x2)/(m1+m2).')">Vérifier</button>
        <div class="feedback" id="mgen1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La résultante des forces intérieures d'un système de points matériels est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen1e2" value="wrong"> égale à la résultante des forces extérieures</label>
          <label class="option"><input type="radio" name="mgen1e2" value="right"> toujours nulle</label>
          <label class="option"><input type="radio" name="mgen1e2" value="wrong"> nulle seulement si le système est un solide indéformable</label>
          <label class="option"><input type="radio" name="mgen1e2" value="wrong"> proportionnelle à la masse totale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen1e2','mgen1fb2','Correct — c\\'est une conséquence directe du principe des actions réciproques : les forces intérieures s\\'annulent deux à deux, quel que soit le système (déformable ou non).','Repense au principe des actions réciproques appliqué à chaque paire de points.')">Vérifier</button>
        <div class="feedback" id="mgen1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La formule de transport du moment cinétique entre deux points $A$ et $B$ d'un même système s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen1e3" value="right"> $\\vec\\sigma_A = \\vec\\sigma_B + \\vec{AB}\\wedge\\vec p$</label>
          <label class="option"><input type="radio" name="mgen1e3" value="wrong"> $\\vec\\sigma_A = \\vec\\sigma_B - \\vec{AB}\\wedge\\vec p$</label>
          <label class="option"><input type="radio" name="mgen1e3" value="wrong"> $\\vec\\sigma_A = \\vec\\sigma_B$ toujours</label>
          <label class="option"><input type="radio" name="mgen1e3" value="wrong"> $\\vec\\sigma_A = \\vec p\\wedge\\vec{AB}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen1e3','mgen1fb3','Correct — le moment cinétique se comporte comme le moment d\\'un torseur : il se transporte avec la formule σ_A=σ_B+AB∧p.','Le moment cinétique et la quantité de mouvement forment un torseur : utilise la formule de transport des moments.')">Vérifier</button>
        <div class="feedback" id="mgen1fb3"></div>
      </div>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La propriété fondamentale des forces intérieures que tu as démontrée dans ce chapitre — leur résultante toujours nulle — est directement à l'origine de la loi de conservation de la quantité de mouvement, l'un des outils les plus puissants de la physique des particules moderne. Dans les grands collisionneurs comme le LHC du CERN, les physiciens ne peuvent pas détecter directement certaines particules (comme les neutrinos, qui traversent la matière sans interagir) : ils déduisent leur existence et leurs propriétés en mesurant précisément la quantité de mouvement de toutes les particules détectées après une collision, puis en exploitant la conservation de la quantité de mouvement totale pour calculer, par différence, la « quantité de mouvement manquante » emportée par les particules invisibles.</p>
    <p><strong>Question ouverte :</strong> jusqu'à quel niveau de précision faut-il mesurer la quantité de mouvement des particules détectées pour pouvoir affirmer avec confiance qu'une quantité de mouvement manquante révèle réellement une nouvelle particule, plutôt qu'une simple imprécision de mesure ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>détecteurs de quantité de mouvement manquante</strong> des grands collisionneurs de particules combinent des milliers de capteurs pour reconstruire, en quelques microsecondes, la quantité de mouvement totale de centaines de particules produites lors d'une seule collision — une prouesse technique directement fondée sur les principes de ce chapitre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Système de points matériels ou solide → centre de masse G (OG = moyenne pondérée des positions) → quantité de mouvement p = M v_G (tout se passe comme si la masse était concentrée en G) → moment cinétique σ_A (torseur cinétique, se transporte comme un moment) → forces intérieures : résultante et moment toujours nuls → seules les forces extérieures font évoluer p et σ
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\vec p = M\\,\\vec v_G$$
      Cette équation, héritière directe de l'intuition d'Archimède sur le centre de gravité, condense tout l'intérêt du chapitre : elle permet de réduire l'étude du mouvement d'ensemble d'un système aussi complexe soit-il — des millions de particules en interaction — à celle d'un unique point matériel fictif, son centre de masse.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Archimède n'avait jamais formalisé rigoureusement le centre de gravité des figures géométriques dans l'Antiquité : la mécanique classique aurait-elle développé une notion équivalente par une autre voie ?</li>
        <li>Pourquoi la propriété fondamentale des forces intérieures (résultante et moment nuls) reste-t-elle vraie aussi bien pour un solide rigide que pour un système totalement déformable, comme un nuage de gaz ?</li>
        <li>Quelle serait la conséquence, pour la physique des particules moderne, d'une impossibilité d'exploiter la conservation de la quantité de mouvement pour détecter indirectement des particules invisibles comme les neutrinos ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Archimède, <em>De l'équilibre des plans</em>, IIIe siècle av. J.-C. — le traité fondateur du calcul du centre de gravité.</li>
        <li>J. P. Pérez, <em>Mécanique : fondements et applications</em>, Dunod — référence pédagogique française sur les éléments cinétiques des systèmes.</li>
        <li>D. Griffiths, <em>Introduction to Elementary Particles</em>, Wiley-VCH — sur l'usage de la quantité de mouvement manquante en physique des particules.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais calculer le centre de masse, la quantité de mouvement et le moment cinétique d'un système, et exploiter la propriété clé des forces intérieures. Le chapitre suivant, « Moments et produits d'inertie d'un solide », introduira la grandeur qui manque encore pour décrire complètement la répartition de masse d'un solide en rotation. Comme le montre l'héritage d'Archimède : une idée géométrique simple, patiemment généralisée sur plus de deux mille ans, peut devenir l'outil qui permet aujourd'hui de détecter des particules invisibles dans les plus grands accélérateurs du monde.</p>
  `
};

MECAGEN_NOVA_KB[mecaGenKey('Éléments cinétiques : centre de masse, quantité de mouvement et moment cinétique')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Éléments cinétiques ». Demande-moi comment calculer un centre de masse, pourquoi les forces intérieures ne comptent pas dans p et σ, ou un indice sur un exercice.",
  rules: [
    { test:/centre de masse|centre d.inertie/i, replies:["OG=(1/M)Σm_i·OM_i pour un système discret, ou une intégrale sur le volume pour un solide continu. Il est toujours sur un axe ou plan de symétrie matérielle éventuel."] },
    { test:/quantit[ée] de mouvement|r[ée]sultante cin[ée]tique/i, replies:["p=Σm_i v_i=M·v_G : la quantité de mouvement totale d'un système est celle d'un point fictif de masse M animé de la vitesse du centre de masse."] },
    { test:/moment cin[ée]tique/i, replies:["σ_A=Σ AM_i∧m_i v_i. Il se transporte comme le moment d'un torseur : σ_A=σ_B+AB∧p."] },
    { test:/force.*int[ée]rieure|force.*ext[ée]rieure/i, replies:["Les forces intérieures s'annulent deux à deux (action-réaction) : leur résultante ET leur moment total sont toujours nuls. Seules les forces extérieures font évoluer p et σ globaux."] },
    { test:/torseur cin[ée]tique/i, replies:["Le torseur cinétique {p, σ_A} résume tout le contenu cinétique (quantité de mouvement + moment cinétique) d'un système en mouvement."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : x_G=(m1x1+m2x2)/(m1+m2).","Indice niveau 2 : numérateur = 2×0+6×4=24.","Indice niveau 3 : x_G=24/8=3 m."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense au principe des actions réciproques.","Indice niveau 2 : chaque force intérieure a une opposée exactement colinéaire.","Indice niveau 3 : la résultante des forces intérieures est toujours nulle."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : σ et p forment un torseur.","Indice niveau 2 : la formule de transport ressemble à celle des moments de force.","Indice niveau 3 : σ_A=σ_B+AB∧p."] }
  ]
};

/* =========================== CHAPITRE 2 — Moments et produits d'inertie d'un solide =========================== */
MECAGEN_CHAPTERS[mecaGenKey('Moments et produits d\'inertie d\'un solide')] = {
  objectives: [
    "Définir le moment d'inertie d'un solide par rapport à un axe",
    "Connaître les moments d'inertie des solides usuels (barre, disque, cylindre, sphère, anneau)",
    "Appliquer le théorème de Huygens (axes parallèles)",
    "Calculer le moment d'inertie d'un solide composite par additivité",
    "Évaluer en quoi le théorème de Huygens, développé à l'origine pour résoudre un problème pratique d'horlogerie de précision au XVIIe siècle, éclaire aujourd'hui des phénomènes aussi variés que la rotation d'un patineur artistique ou la stabilité d'un satellite"
  ],
  prereqs: ["Éléments cinétiques d'un système"],
  bodyHtml: `
    <p>En 1673, le physicien et astronome néerlandais Christiaan Huygens publia l'<em>Horologium Oscillatorium</em>, un traité consacré à la mise au point de l'horloge à pendule — l'instrument de mesure du temps le plus précis de son époque. Pour comprendre pourquoi un pendule composé (un objet étendu oscillant autour d'un axe, et non une simple masse ponctuelle au bout d'un fil idéal) oscille à une période différente selon l'axe choisi, Huygens dut établir la relation qui porte aujourd'hui son nom, reliant le moment d'inertie par rapport à un axe quelconque à celui par rapport à un axe parallèle passant par le centre de masse — exactement le théorème que tu vas appliquer dans ce chapitre.</p>
    <p>Cette découverte, motivée à l'origine par un problème très concret d'horlogerie de précision, s'est révélée d'une portée bien plus vaste : elle explique aujourd'hui pourquoi un patineur artistique tourne plus vite en ramenant ses bras près de son corps (réduisant ainsi son moment d'inertie), pourquoi un volant d'inertie de moteur est conçu avec sa masse concentrée en périphérie, ou encore pourquoi la stabilité en rotation d'un satellite dépend directement de la répartition de sa masse autour de ses axes.</p>
    <p>Le <strong>moment d'inertie</strong> mesure la façon dont la masse d'un solide est répartie autour d'un axe : c'est l'analogue, pour la rotation, de ce qu'est la masse pour la translation — il mesure l'inertie d'un solide face à une mise en rotation. À la fin de ce chapitre, tu sauras calculer le moment d'inertie des solides usuels, appliquer le théorème de Huygens, et exploiter l'additivité pour un solide composite.</p>

    <h3>1. Définition</h3>
    <p>Pour un solide en rotation autour d'un axe $\\Delta$, le moment d'inertie par rapport à $\\Delta$ est :</p>
    <div class="formula-box">$$J_\\Delta = \\sum_i m_i r_i^2 \\qquad \\text{ou}\\qquad J_\\Delta = \\int_S r^2\\,dm$$</div>
    <p>où $r_i$ (ou $r$) est la distance du point $M_i$ (ou de l'élément $dm$) à l'axe $\\Delta$. Le moment d'inertie s'exprime en $\\text{kg}\\cdot\\text{m}^2$ ; il dépend à la fois de la masse totale, de sa répartition (plus la masse est loin de l'axe, plus $J_\\Delta$ est grand) et bien sûr du choix de l'axe.</p>
    <div class="key-point">
      <span class="eyebrow">Rayon de giration</span>
      On définit parfois le rayon de giration $k_\\Delta=\\sqrt{J_\\Delta/M}$ : c'est la distance à laquelle il faudrait concentrer toute la masse $M$ en un point pour obtenir le même moment d'inertie $J_\\Delta$.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le rayon de giration résume, en une seule distance, la façon dont la masse d'un solide est répartie autour d'un axe — sans indiquer la forme précise de cette répartition. En quoi ce résumé en un seul nombre, bien qu'il fasse perdre de l'information sur la géométrie exacte du solide, reste-t-il suffisant pour comparer l'inertie en rotation de deux solides très différents ?
    </div>

    <h3>2. Moments d'inertie des solides usuels</h3>
    <table class="mini-table">
      <tr><th>Solide (masse $M$)</th><th>Axe</th><th>Moment d'inertie</th></tr>
      <tr><td>Barre mince, longueur $L$</td><td>Perpendiculaire, passant par le centre</td><td>$J=\\dfrac{1}{12}ML^2$</td></tr>
      <tr><td>Barre mince, longueur $L$</td><td>Perpendiculaire, passant par une extrémité</td><td>$J=\\dfrac13ML^2$</td></tr>
      <tr><td>Anneau mince, rayon $R$</td><td>Axe de symétrie (perpendiculaire au plan)</td><td>$J=MR^2$</td></tr>
      <tr><td>Disque plein, rayon $R$</td><td>Axe de symétrie (perpendiculaire au plan)</td><td>$J=\\dfrac12MR^2$</td></tr>
      <tr><td>Cylindre plein, rayon $R$</td><td>Axe de révolution</td><td>$J=\\dfrac12MR^2$</td></tr>
      <tr><td>Sphère pleine, rayon $R$</td><td>Diamètre</td><td>$J=\\dfrac25MR^2$</td></tr>
      <tr><td>Sphère creuse, rayon $R$</td><td>Diamètre</td><td>$J=\\dfrac23MR^2$</td></tr>
    </table>
    <p>On remarque que pour deux solides de même masse et même rayon, celui dont la masse est <strong>la plus éloignée de l'axe</strong> (anneau, sphère creuse) a le moment d'inertie le plus grand : il « résiste » davantage à une mise en rotation.</p>

    <h3>3. Théorème de Huygens (axes parallèles)</h3>
    <p>Il est rarement pratique de calculer $J_\\Delta$ directement pour un axe quelconque. Le <strong>théorème de Huygens</strong> permet de passer du moment d'inertie par rapport à un axe $\\Delta_G$ passant par le centre de masse $G$ au moment d'inertie par rapport à un axe parallèle $\\Delta$ situé à une distance $d$ :</p>
    <div class="formula-box">$$J_\\Delta = J_{\\Delta_G} + Md^2$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      $J_{\\Delta_G}$ est <strong>toujours le plus petit</strong> parmi tous les axes parallèles à $\\Delta_G$ : s'éloigner du centre de masse ne fait qu'ajouter le terme positif $Md^2$. On vérifie ainsi que $J$(barre, extrémité)$=\\frac{1}{12}ML^2+M(L/2)^2=\\frac13ML^2$, conforme au tableau ci-dessus.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le théorème de Huygens montre que le moment d'inertie par rapport au centre de masse est toujours le plus petit parmi tous les axes parallèles possibles. En quoi ce résultat, purement mathématique en apparence, explique-t-il concrètement pourquoi un objet en rotation libre (sans axe imposé) tend naturellement à tourner autour d'un axe passant par son centre de masse ?
    </div>

    <h3>4. Additivité et solides composites</h3>
    <p>Le moment d'inertie est une grandeur <strong>additive</strong> : pour un solide composé de plusieurs parties (ou un système de plusieurs solides), le moment d'inertie total par rapport à un axe donné est la somme des moments d'inertie de chaque partie par rapport à ce même axe.</p>
    <p><em>Remarque (au-delà du programme minimal) :</em> pour une rotation autour d'un axe qui n'est pas un axe de symétrie, la répartition des masses introduit aussi des <strong>produits d'inertie</strong> ($J_{xy}=\\int xy\\,dm$, etc.), regroupés avec les moments d'inertie dans une matrice symétrique $3\\times3$ appelée <strong>tenseur d'inertie</strong>. Il existe toujours, en un point donné, trois <strong>axes principaux d'inertie</strong> orthogonaux pour lesquels les produits d'inertie s'annulent — souvent les axes de symétrie du solide.</p>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer Huygens dans le mauvais sens : la formule ne relie $\\Delta$ à $\\Delta_G$ que si $\\Delta_G$ passe par le <strong>centre de masse</strong> — jamais entre deux axes quelconques ne passant pas par $G$</li>
        <li>Oublier que $d$ est la distance <strong>entre les deux axes parallèles</strong>, pas la distance à un point</li>
        <li>Confondre moment d'inertie polaire (autour de l'axe de révolution) et moment d'inertie diamétral (autour d'un diamètre) pour une sphère ou un cylindre</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une barre de masse $M=2$ kg et de longueur $L=1$ m tourne autour d'un axe perpendiculaire passant par son centre. Son moment d'inertie vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen2e1" value="wrong"> $J=0,67$ kg·m²</label>
          <label class="option"><input type="radio" name="mgen2e1" value="right"> $J=0,167$ kg·m²</label>
          <label class="option"><input type="radio" name="mgen2e1" value="wrong"> $J=2$ kg·m²</label>
          <label class="option"><input type="radio" name="mgen2e1" value="wrong"> $J=0,5$ kg·m²</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen2e1','mgen2fb1','Correct — J=ML²/12=2×1²/12≈0,167 kg·m².','Utilise J=ML²/12 pour une barre par rapport à un axe passant par son centre.')">Vérifier</button>
        <div class="feedback" id="mgen2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">À masse $M$ et rayon $R$ égaux, quel solide a le plus grand moment d'inertie par rapport à son axe de symétrie ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen2e2" value="wrong"> le disque plein</label>
          <label class="option"><input type="radio" name="mgen2e2" value="right"> l'anneau mince</label>
          <label class="option"><input type="radio" name="mgen2e2" value="wrong"> ils ont exactement le même moment d'inertie</label>
          <label class="option"><input type="radio" name="mgen2e2" value="wrong"> cela dépend de la vitesse angulaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen2e2','mgen2fb2','Correct — J(anneau)=MR² alors que J(disque)=MR²/2 : toute la masse de l\\'anneau est à la distance R de l\\'axe, contre une masse répartie de 0 à R pour le disque.','Compare où se trouve la masse par rapport à l\\'axe dans les deux cas.')">Vérifier</button>
        <div class="feedback" id="mgen2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une plaque a un moment d'inertie $J_G=0,4$ kg·m² par rapport à un axe passant par son centre de masse $G$. Son moment d'inertie par rapport à un axe parallèle situé à $d=0,5$ m de $G$, pour une masse $M=3$ kg, vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen2e3" value="wrong"> $J=0,4$ kg·m²</label>
          <label class="option"><input type="radio" name="mgen2e3" value="wrong"> $J=0,75$ kg·m²</label>
          <label class="option"><input type="radio" name="mgen2e3" value="right"> $J=1,15$ kg·m²</label>
          <label class="option"><input type="radio" name="mgen2e3" value="wrong"> $J=1,5$ kg·m²</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen2e3','mgen2fb3','Correct — Huygens : J=J_G+Md²=0,4+3×0,5²=0,4+0,75=1,15 kg·m².','Applique le théorème de Huygens J=J_G+Md², avec d la distance entre les deux axes parallèles.')">Vérifier</button>
        <div class="feedback" id="mgen2fb3"></div>
      </div>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Le concept de moment d'inertie, né des recherches de Huygens sur l'horlogerie de précision, est aujourd'hui au cœur d'une technologie de stockage d'énergie en plein essor : les <strong>volants d'inertie</strong> (flywheels) modernes stockent de l'énergie électrique sous forme d'énergie cinétique de rotation, en faisant tourner un disque massif à très grande vitesse dans le vide, sous lévitation magnétique pour minimiser les frottements. Plus le moment d'inertie du volant est grand — en concentrant délibérément sa masse loin de l'axe, comme un anneau plutôt qu'un disque plein — plus il peut stocker d'énergie à vitesse de rotation donnée, un principe qui trouve aujourd'hui des applications dans la stabilisation des réseaux électriques et le stockage d'énergie à court terme pour les énergies renouvelables intermittentes.</p>
    <p><strong>Question ouverte :</strong> quelles limites physiques (résistance des matériaux, forces centrifuges) empêchent d'augmenter indéfiniment le moment d'inertie et la vitesse de rotation d'un volant d'inertie pour stocker toujours plus d'énergie ?</p>
    <p><strong>Technologie émergente :</strong> les satellites artificiels modernes utilisent des <strong>roues de réaction</strong>, de petits volants dont on contrôle précisément la vitesse de rotation pour orienter finement le satellite par conservation du moment cinétique total, sans consommer de carburant — une application directe du moment d'inertie à la conquête spatiale.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Solide en rotation autour d'un axe Δ → moment d'inertie J_Δ = Σm_ir_i² (mesure l'inertie en rotation) → solides usuels (barre, disque, cylindre, sphère) → théorème de Huygens pour un axe parallèle décalé de d : J_Δ=J_ΔG+Md² → additivité pour un solide composite → au-delà : tenseur d'inertie et axes principaux
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$J_\\Delta = J_{\\Delta_G} + Md^2$$
      Le théorème de Huygens, né d'un problème d'horlogerie du XVIIe siècle, permet de calculer le moment d'inertie par rapport à n'importe quel axe parallèle à partir du seul moment d'inertie au centre de masse — épargnant un calcul intégral complet à chaque nouvel axe considéré, et garantissant que l'axe passant par G minimise toujours l'inertie en rotation.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Huygens n'avait jamais cherché à perfectionner l'horloge à pendule au XVIIe siècle : le théorème des axes parallèles aurait-il été découvert par une autre voie, peut-être plus tardivement ?</li>
        <li>Pourquoi le moment d'inertie d'une sphère creuse est-il plus grand que celui d'une sphère pleine de même masse et de même rayon, alors que les deux solides occupent le même volume apparent ?</li>
        <li>Quelle serait la conséquence, pour le stockage d'énergie par volant d'inertie, d'une conception qui répartirait la masse près de l'axe plutôt qu'à sa périphérie ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>C. Huygens, <em>Horologium Oscillatorium</em>, 1673 — l'ouvrage fondateur du théorème des axes parallèles, motivé par l'étude du pendule composé.</li>
        <li>J. P. Pérez, <em>Mécanique : fondements et applications</em>, Dunod — référence pédagogique française sur les moments d'inertie.</li>
        <li>B. Bolund, H. Bernhoff, M. Leijon, « Flywheel energy and power storage systems », Renewable and Sustainable Energy Reviews, 2007 — sur les applications modernes du volant d'inertie au stockage d'énergie.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais calculer le moment d'inertie des solides usuels, appliquer le théorème de Huygens, et exploiter l'additivité pour un solide composite. Le chapitre suivant, « Théorèmes généraux de la dynamique et rotation autour d'un axe fixe », utilisera directement cette grandeur pour écrire l'équation du mouvement d'un solide en rotation. Comme le montre l'héritage de Huygens : un problème pratique de mesure du temps peut, trois siècles et demi plus tard, éclairer aussi bien la pirouette d'un patineur que la stabilisation d'un satellite en orbite.</p>
  `
};

MECAGEN_NOVA_KB[mecaGenKey('Moments et produits d\'inertie d\'un solide')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Moments et produits d'inertie ». Demande-moi le théorème de Huygens, les formules pour les solides usuels, ou un indice sur un exercice.",
  rules: [
    { test:/moment d.inertie/i, replies:["J_Δ=Σm_i r_i² (ou ∫r²dm) : ça mesure comment la masse est répartie par rapport à un axe. Plus la masse est loin de l'axe, plus J est grand."] },
    { test:/huygens/i, replies:["Théorème de Huygens : J_Δ=J_ΔG+Md², où Δ_G passe par le centre de masse G et Δ lui est parallèle à distance d. J_ΔG est toujours le plus petit parmi les axes parallèles."] },
    { test:/disque|anneau|cylindre|sph[èe]re|barre/i, replies:["Barre (centre) : ML²/12. Disque ou cylindre plein : MR²/2. Anneau mince : MR². Sphère pleine : 2MR²/5. Sphère creuse : 2MR²/3."] },
    { test:/rayon de giration/i, replies:["Le rayon de giration k=√(J/M) est la distance fictive à laquelle il faudrait concentrer toute la masse pour retrouver le même moment d'inertie."] },
    { test:/tenseur|produit d.inertie|axes principaux/i, replies:["Pour un axe quelconque, il faut en général le tenseur d'inertie (matrice 3×3 avec moments et produits d'inertie). Il existe toujours des axes principaux (souvent les axes de symétrie) où les produits d'inertie s'annulent."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise J=ML²/12.","Indice niveau 2 : L²=1.","Indice niveau 3 : J=2×1/12≈0,167 kg·m²."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare la répartition de la masse par rapport à l'axe.","Indice niveau 2 : dans l'anneau, toute la masse est à distance R ; dans le disque, elle est répartie de 0 à R.","Indice niveau 3 : l'anneau a le plus grand moment d'inertie (MR² contre MR²/2)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : applique Huygens J=J_G+Md².","Indice niveau 2 : Md²=3×0,25=0,75.","Indice niveau 3 : J=0,4+0,75=1,15 kg·m²."] }
  ]
};

/* =========================== CHAPITRE 3 — Théorèmes généraux de la dynamique et rotation autour d'un axe fixe =========================== */
MECAGEN_CHAPTERS[mecaGenKey('Théorèmes généraux de la dynamique et rotation autour d\'un axe fixe')] = {
  objectives: [
    "Énoncer le théorème de la résultante cinétique pour un système",
    "Énoncer le théorème du moment cinétique pour un système",
    "Établir et utiliser l'équation fondamentale de la dynamique de rotation $J_\\Delta\\ddot\\theta = \\mathcal{M}_\\Delta(\\vec F_{ext})$",
    "Résoudre des problèmes classiques de rotation (pendule pesant, poulie avec inertie)",
    "Évaluer en quoi le principe de d'Alembert, en généralisant les lois de Newton établies pour un point matériel isolé à n'importe quel système de points en interaction, justifie que les mêmes deux théorèmes généraux permettent de décrire aussi bien la rotation d'un solide que le mouvement d'une fusée ou d'une galaxie"
  ],
  prereqs: ["Éléments cinétiques d'un système", "Moments et produits d'inertie d'un solide"],
  bodyHtml: `
    <p>En 1743, le mathématicien et physicien français Jean le Rond d'Alembert publia son <em>Traité de dynamique</em>, dans lequel il énonça un principe d'une portée considérable : les lois de Newton, établies pour un point matériel isolé, pouvaient se généraliser à n'importe quel système de points en interaction, aussi compliqué soit-il, à condition de traiter correctement les forces intérieures et les liaisons entre les parties du système. Ce principe, connu aujourd'hui sous le nom de principe de d'Alembert, est précisément ce qui justifie que les théorèmes généraux que tu étudies dans ce chapitre — théorème de la résultante cinétique, théorème du moment cinétique — s'appliquent à un solide entier exactement comme le principe fondamental de la dynamique s'applique à un point matériel isolé.</p>
    <p>L'élégance de cette généralisation tient dans le fait qu'elle ne nécessite aucun outil nouveau : les mêmes deux équations vectorielles — une pour la résultante, une pour le moment — suffisent à décrire le mouvement d'un système aussi complexe qu'une fusée en train de perdre de la masse, un patineur en rotation, ou une galaxie entière de milliards d'étoiles en interaction gravitationnelle, pourvu que l'on identifie correctement les forces extérieures qui s'y appliquent.</p>
    <p>Les <strong>théorèmes généraux</strong> généralisent le principe fondamental de la dynamique du point matériel (vu en L1) à un système de points ou à un solide. Ils s'appliquent dans un référentiel galiléen. À la fin de ce chapitre, tu sauras énoncer et appliquer ces deux théorèmes, établir l'équation fondamentale de la dynamique de rotation, et résoudre les problèmes classiques du pendule pesant et de la poulie avec inertie.</p>

    <h3>1. Théorème de la résultante cinétique</h3>
    <p>La dérivée par rapport au temps de la quantité de mouvement totale d'un système est égale à la résultante des forces extérieures (les forces intérieures n'y contribuent jamais, on l'a vu au chapitre 2) :</p>
    <div class="formula-box">$$\\frac{d\\vec p}{dt} = \\sum \\vec F_{ext} \\quad\\Longleftrightarrow\\quad M\\vec a_G = \\sum\\vec F_{ext}$$</div>
    <p>C'est le <strong>théorème du centre de masse</strong> déjà entrevu : le mouvement du centre de masse d'un système, aussi compliqué que soit ce système, obéit à la même équation que celle d'un point matériel fictif de masse $M$ soumis à la résultante des forces extérieures.</p>

    <h3>2. Théorème du moment cinétique</h3>
    <p>La dérivée par rapport au temps du moment cinétique d'un système, calculé en un point $A$ <strong>fixe</strong> dans le référentiel galiléen (ou confondu avec $G$), est égale au moment résultant des forces extérieures en ce même point :</p>
    <div class="formula-box">$$\\frac{d\\vec\\sigma_A}{dt} = \\sum \\vec{\\mathcal M}_A(\\vec F_{ext})\\qquad (A \\text{ fixe, ou } A=G)$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — le choix du point</span>
      La relation n'est simple que si $A$ est <strong>fixe</strong> dans le référentiel galiléen, ou si $A=G$ (même si $G$ est en mouvement). Choisir judicieusement le point $A$ — souvent l'axe de rotation lui-même s'il est fixe — simplifie énormément la résolution d'un problème.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le théorème du moment cinétique n'est valable sous sa forme simple que si le point A est fixe dans le référentiel galiléen, ou confondu avec le centre de masse G, même si G lui-même est en mouvement. Pourquoi cette exception pour G, alors qu'un point quelconque en mouvement ne bénéficie pas du même privilège ?
    </div>

    <h3>3. Rotation d'un solide autour d'un axe fixe</h3>
    <p>Pour un solide en rotation autour d'un axe fixe $\\Delta$, le moment cinétique par rapport à $\\Delta$ se met sous la forme particulièrement simple $\\sigma_\\Delta = J_\\Delta\\,\\omega$ (où $J_\\Delta$ est le moment d'inertie défini au chapitre précédent). Le théorème du moment cinétique projeté sur $\\Delta$ donne alors l'<strong>équation fondamentale de la dynamique de rotation</strong> :</p>
    <div class="formula-box">$$J_\\Delta\\,\\dot\\omega = J_\\Delta\\,\\ddot\\theta = \\mathcal{M}_\\Delta(\\vec F_{ext})$$</div>
    <table class="mini-table">
      <tr><th>Translation (point matériel)</th><th>Rotation (solide, axe fixe)</th></tr>
      <tr><td>Masse $m$</td><td>Moment d'inertie $J_\\Delta$</td></tr>
      <tr><td>Position $x$</td><td>Angle $\\theta$</td></tr>
      <tr><td>Vitesse $\\dot x=v$</td><td>Vitesse angulaire $\\dot\\theta=\\omega$</td></tr>
      <tr><td>Force $F$</td><td>Moment de force $\\mathcal{M}_\\Delta$</td></tr>
      <tr><td>$m\\ddot x = F$</td><td>$J_\\Delta\\ddot\\theta = \\mathcal{M}_\\Delta$</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'analogie entre translation et rotation associe terme à terme masse et moment d'inertie, position et angle, force et moment de force. En quoi cette correspondance systématique, plutôt qu'une simple coïncidence de notation, révèle-t-elle une structure mathématique profondément identique entre les deux types de mouvement ?
    </div>

    <h3>4. Applications classiques</h3>
    <p><strong>Pendule pesant (pendule composé).</strong> Un solide de masse $M$, de moment d'inertie $J_\\Delta$ par rapport à un axe horizontal fixe $\\Delta$ situé à une distance $d$ de son centre de masse $G$, oscille sous l'effet de son poids. Le moment du poids en $\\Delta$ vaut $-Mgd\\sin\\theta$, d'où l'équation $J_\\Delta\\ddot\\theta = -Mgd\\sin\\theta$, qui se linéarise en $\\ddot\\theta + \\dfrac{Mgd}{J_\\Delta}\\theta = 0$ pour de petites oscillations, avec une période :</p>
    <div class="formula-box">$$T = 2\\pi\\sqrt{\\dfrac{J_\\Delta}{Mgd}}$$</div>
    <p>On retrouve le pendule simple (masse ponctuelle) comme cas particulier avec $J_\\Delta=ML^2$ et $d=L$.</p>
    <p><strong>Poulie avec moment d'inertie non négligeable.</strong> Contrairement au traitement simplifié de L1 (poulie « idéale » sans masse), une poulie réelle de moment d'inertie $J$ s'oppose à la mise en rotation du fil : la tension n'est plus la même de part et d'autre, et il faut combiner le théorème de la résultante cinétique pour chaque masse suspendue avec le théorème du moment cinétique pour la poulie.</p>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer le théorème du moment cinétique en un point <strong>mobile</strong> quelconque, sans vérifier qu'il est fixe ou confondu avec $G$</li>
        <li>Oublier de projeter le théorème du moment cinétique sur l'axe $\\Delta$ pour obtenir une équation scalaire exploitable</li>
        <li>Négliger le moment d'inertie d'une poulie « pour simplifier », alors que l'énoncé précise sa masse : la tension du fil n'est alors plus uniforme</li>
        <li>Confondre le moment du poids d'un solide étendu (calculé comme si le poids s'appliquait en $G$) avec celui d'une force quelconque</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La période des petites oscillations d'un pendule pesant de moment d'inertie $J_\\Delta$, de masse $M$, dont le centre de masse est à une distance $d$ de l'axe, est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen3e1" value="wrong"> $T=2\\pi\\sqrt{J_\\Delta/(Md)}$</label>
          <label class="option"><input type="radio" name="mgen3e1" value="right"> $T=2\\pi\\sqrt{J_\\Delta/(Mgd)}$</label>
          <label class="option"><input type="radio" name="mgen3e1" value="wrong"> $T=2\\pi\\sqrt{Mgd/J_\\Delta}$</label>
          <label class="option"><input type="radio" name="mgen3e1" value="wrong"> $T=2\\pi\\sqrt{d/g}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen3e1','mgen3fb1','Correct — T=2π√(J_Δ/(Mgd)), qui redonne le pendule simple T=2π√(L/g) quand J_Δ=ML² et d=L.','Repars de l\\'équation linéarisée θ¨+(Mgd/J_Δ)θ=0 et compare à un oscillateur harmonique.')">Vérifier</button>
        <div class="feedback" id="mgen3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans l'analogie translation/rotation, le moment d'inertie $J_\\Delta$ joue le rôle de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen3e2" value="wrong"> la force</label>
          <label class="option"><input type="radio" name="mgen3e2" value="wrong"> la vitesse</label>
          <label class="option"><input type="radio" name="mgen3e2" value="right"> la masse</label>
          <label class="option"><input type="radio" name="mgen3e2" value="wrong"> l'accélération</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen3e2','mgen3fb2','Correct — J_Δθ¨=M_Δ est l\\'analogue exact de mẍ=F : J_Δ mesure l\\'inertie du solide face à une accélération angulaire, comme m mesure l\\'inertie face à une accélération linéaire.','Compare terme à terme mẍ=F et J_Δθ¨=M_Δ.')">Vérifier</button>
        <div class="feedback" id="mgen3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour appliquer simplement le théorème du moment cinétique $d\\sigma_A/dt=\\mathcal{M}_A(F_{ext})$, le point $A$ doit être :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen3e3" value="wrong"> n'importe quel point du solide</label>
          <label class="option"><input type="radio" name="mgen3e3" value="right"> fixe dans le référentiel galiléen, ou confondu avec G</label>
          <label class="option"><input type="radio" name="mgen3e3" value="wrong"> toujours à l'origine du repère</label>
          <label class="option"><input type="radio" name="mgen3e3" value="wrong"> le point d'application de la plus grande force</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen3e3','mgen3fb3','Correct — sinon des termes correctifs supplémentaires apparaissent dans la dérivée du moment cinétique.','Rappelle-toi la condition de validité énoncée avec le théorème du moment cinétique.')">Vérifier</button>
        <div class="feedback" id="mgen3fb3"></div>
      </div>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Le pendule pesant que tu étudies dans ce chapitre a un cousin bien plus délicat à maîtriser : le <strong>pendule inversé</strong>, un système instable par nature (contrairement au pendule pesant classique, qui revient naturellement vers sa position d'équilibre) qui doit être activement stabilisé par un contrôle en temps réel. Ce problème, devenu un cas d'école incontournable en théorie du contrôle et en robotique, trouve des applications spectaculaires : les fusées réutilisables de SpaceX, lors de leur phase d'atterrissage vertical, doivent résoudre en continu un problème de stabilisation directement apparenté à celui du pendule inversé, ajustant leurs moteurs des dizaines de fois par seconde pour contrer toute déviation angulaire.</p>
    <p><strong>Question ouverte :</strong> quelles stratégies de contrôle permettent de stabiliser un système intrinsèquement instable comme le pendule inversé, alors que l'équation fondamentale de la dynamique de rotation, seule, prédit au contraire une divergence exponentielle de l'angle ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>algorithmes de contrôle en boucle fermée</strong>, utilisés aussi bien dans les gyropodes (comme le Segway) que dans l'atterrissage des fusées réutilisables, mesurent en continu l'écart à l'équilibre visé et ajustent une force ou un couple correcteur des dizaines à des centaines de fois par seconde, appliquant en temps réel l'équation fondamentale de la dynamique de rotation étudiée dans ce chapitre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Système ou solide en mouvement → théorème de la résultante cinétique (Ma_G=ΣF_ext, mouvement du centre de masse) → théorème du moment cinétique (dσ_A/dt=M_A(F_ext), si A fixe ou A=G) → cas particulier rotation autour d'un axe fixe : J_Δθ¨=M_Δ(F_ext) → applications (pendule pesant, poulie avec inertie)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$J_\\Delta\\,\\ddot\\theta = \\mathcal{M}_\\Delta(\\vec F_{ext})$$
      Cette équation, l'analogue exact de $m\\ddot x=F$ pour la rotation, résume tout l'apport du chapitre : elle réduit la dynamique de rotation d'un solide entier autour d'un axe fixe à une seule équation scalaire, aussi simple à résoudre qu'un problème de translation d'un point matériel.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si d'Alembert n'avait jamais généralisé les lois de Newton aux systèmes de points en 1743 : combien de temps aurait-il fallu attendre avant qu'un cadre théorique équivalent permette de traiter la dynamique des solides étendus ?</li>
        <li>Pourquoi le moment d'inertie d'une poulie, souvent négligé en L1, devient-il indispensable à prendre en compte dès que l'énoncé précise sa masse, même si celle-ci semble faible comparée aux masses suspendues ?</li>
        <li>Quelle serait la conséquence, pour l'atterrissage contrôlé des fusées réutilisables modernes, d'une impossibilité d'appliquer en temps réel l'équation fondamentale de la dynamique de rotation pour corriger leur inclinaison ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. le Rond d'Alembert, <em>Traité de dynamique</em>, 1743 — l'ouvrage fondateur de la généralisation des lois de Newton aux systèmes de points.</li>
        <li>J. P. Pérez, <em>Mécanique : fondements et applications</em>, Dunod — référence pédagogique française sur les théorèmes généraux de la dynamique.</li>
        <li>K. J. Åström, R. M. Murray, <em>Feedback Systems: An Introduction for Scientists and Engineers</em>, Princeton University Press — sur le contrôle du pendule inversé et ses applications modernes.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais énoncer et appliquer les théorèmes de la résultante cinétique et du moment cinétique, établir l'équation fondamentale de la dynamique de rotation, et résoudre les problèmes classiques du pendule pesant et de la poulie avec inertie. Le chapitre suivant, « Théorème de König et théorème de l'énergie cinétique », complétera cet arsenal par une approche énergétique du mouvement des solides. Comme le montre le principe de d'Alembert : une généralisation mathématique élégante, formulée au XVIIIe siècle pour des systèmes de points abstraits, peut aujourd'hui guider l'atterrissage vertical d'une fusée réutilisable.</p>
  `
};

MECAGEN_NOVA_KB[mecaGenKey('Théorèmes généraux de la dynamique et rotation autour d\'un axe fixe')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Théorèmes généraux et rotation autour d'un axe fixe ». Demande-moi l'équation du pendule pesant, l'analogie translation/rotation, ou un indice sur un exercice.",
  rules: [
    { test:/r[ée]sultante cin[ée]tique|centre de masse/i, replies:["Théorème de la résultante cinétique : dp/dt=ΣF_ext, soit Ma_G=ΣF_ext — le centre de masse bouge comme un point matériel fictif de masse M."] },
    { test:/moment cin[ée]tique/i, replies:["dσ_A/dt=M_A(F_ext), valable si A est fixe dans le référentiel galiléen, ou si A=G. Choisis bien ton point A pour simplifier le calcul !"] },
    { test:/pendule pesant|pendule compos[ée]/i, replies:["Pendule pesant : J_Δθ¨=-Mgd sinθ, qui se linéarise en θ¨+(Mgd/J_Δ)θ=0, d'où T=2π√(J_Δ/(Mgd)). On retrouve le pendule simple avec J_Δ=ML² et d=L."] },
    { test:/analogie|translation.*rotation/i, replies:["mẍ=F (translation) ↔ J_Δθ¨=M_Δ (rotation) : J_Δ joue le rôle de la masse, θ celui de la position, M_Δ celui de la force."] },
    { test:/poulie/i, replies:["Si une poulie a un moment d'inertie non négligeable, la tension du fil n'est plus la même des deux côtés : il faut écrire le théorème du moment cinétique pour la poulie en plus du PFD pour chaque masse."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repars de l'équation linéarisée θ¨+(Mgd/J_Δ)θ=0.","Indice niveau 2 : compare-la à un oscillateur harmonique θ¨+ω²θ=0.","Indice niveau 3 : T=2π√(J_Δ/(Mgd))."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare terme à terme mẍ=F et J_Δθ¨=M_Δ.","Indice niveau 2 : m est associé à J_Δ.","Indice niveau 3 : J_Δ joue le rôle de la masse."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : rappelle-toi la condition de validité du théorème du moment cinétique.","Indice niveau 2 : elle porte sur la nature du point A (fixe ou G).","Indice niveau 3 : A doit être fixe dans le référentiel galiléen, ou confondu avec G."] }
  ]
};

/* =========================== CHAPITRE 4 — Théorème de König et théorème de l'énergie cinétique =========================== */
MECAGEN_CHAPTERS[mecaGenKey('Théorème de König et théorème de l\'énergie cinétique')] = {
  objectives: [
    "Énoncer les théorèmes de König (moment cinétique et énergie cinétique)",
    "Calculer l'énergie cinétique d'un solide en rotation autour d'un axe fixe",
    "Énoncer et appliquer le théorème de l'énergie cinétique pour un système",
    "Étudier la conservation de l'énergie mécanique d'un système",
    "Évaluer en quoi la décomposition proposée par König en 1751 — séparer le mouvement d'ensemble du centre de masse de l'agitation interne autour de lui — reste la méthode la plus économique pour calculer l'énergie cinétique d'un système aussi complexe qu'un solide en roulement"
  ],
  prereqs: ["Éléments cinétiques d'un système", "Théorèmes généraux de la dynamique"],
  bodyHtml: `
    <p>En 1751, le mathématicien suisse Samuel König démontra le théorème qui porte aujourd'hui son nom, apportant une réponse élégante à une question restée jusque-là délicate : comment décomposer proprement l'énergie ou le moment cinétique d'un système complexe entre son mouvement d'ensemble et son agitation interne ? Sa solution, d'une simplicité trompeuse, consistait à se placer dans un référentiel très particulier — le référentiel barycentrique, centré en permanence sur le centre de masse du système — où cette séparation devient presque automatique.</p>
    <p>Cette astuce de König reste, près de trois siècles plus tard, l'un des outils les plus économiques de toute la mécanique : plutôt que de calculer directement l'énergie cinétique totale d'un système compliqué en sommant le mouvement de chacun de ses points, on la décompose en deux morceaux bien plus simples à calculer séparément — l'énergie de translation d'ensemble, et l'énergie interne autour du centre de masse. C'est exactement cette décomposition qui explique, comme tu le verras dans ce chapitre, pourquoi une boule de bowling qui roule possède davantage d'énergie cinétique qu'une masse ponctuelle glissant à la même vitesse.</p>
    <p>Les <strong>théorèmes de König</strong> décomposent le mouvement d'un système en deux contributions : le mouvement d'ensemble du centre de masse $G$, et le mouvement <strong>autour</strong> de $G$ (rotation propre, agitation interne). C'est un outil très puissant pour séparer la partie « simple » d'un mouvement de sa partie « interne » plus complexe. À la fin de ce chapitre, tu sauras appliquer les théorèmes de König, calculer l'énergie cinétique d'un solide en rotation ou en roulement, et exploiter le théorème de l'énergie cinétique pour un système.</p>

    <h3>1. Référentiel barycentrique</h3>
    <p>On appelle <strong>référentiel barycentrique</strong> $\\mathcal{R}^*$ le référentiel en translation par rapport au référentiel d'étude, dont l'origine est constamment le centre de masse $G$. Dans ce référentiel, par construction, $G$ est toujours immobile et la quantité de mouvement totale du système y est nulle.</p>

    <h3>2. Premier théorème de König (moment cinétique)</h3>
    <div class="formula-box">$$\\vec\\sigma_O = \\vec\\sigma^*_G + \\vec{OG}\\wedge M\\vec v_G$$</div>
    <p>Le moment cinétique en un point fixe $O$ est la somme du moment cinétique <strong>propre</strong> $\\vec\\sigma^*_G$ (calculé dans le référentiel barycentrique) et du moment cinétique qu'aurait un point matériel fictif de masse $M$ situé en $G$ et animé de la vitesse $\\vec v_G$.</p>

    <h3>3. Second théorème de König (énergie cinétique)</h3>
    <div class="formula-box">$$E_c = E_c^* + \\frac12 M v_G^2$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      L'énergie cinétique totale d'un système se décompose en une <strong>énergie cinétique barycentrique</strong> $E_c^*$ (mouvement interne, autour de $G$, dans $\\mathcal{R}^*$) et l'énergie cinétique <strong>de translation d'ensemble</strong> $\\frac12Mv_G^2$, comme si toute la masse était concentrée en $G$.
    </div>
    <p>Pour un solide indéformable en rotation pure autour de son centre de masse avec une vitesse angulaire $\\omega$, l'énergie cinétique barycentrique est simplement $E_c^* = \\frac12 J_{\\Delta_G}\\omega^2$. Ainsi, pour un solide en mouvement de <strong>roulement</strong> (translation de $G$ + rotation propre), König donne directement :</p>
    <div class="formula-box">$$E_c = \\frac12 J_{\\Delta_G}\\,\\omega^2 + \\frac12 M v_G^2$$</div>
    <p><em>Exemple :</em> pour un cylindre plein ($J_{\\Delta_G}=\\frac12MR^2$) qui roule sans glisser ($v_G=\\omega R$), $E_c = \\frac12\\big(\\frac12MR^2\\big)\\omega^2+\\frac12Mv_G^2 = \\frac34Mv_G^2$ : le cylindre a $50\\%$ d'énergie cinétique en plus qu'un simple point matériel de même vitesse, à cause de sa rotation propre.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un cylindre plein qui roule possède 50% d'énergie cinétique en plus qu'un point matériel de même masse et même vitesse, uniquement à cause de sa rotation propre. En quoi ce résultat illustre-t-il concrètement pourquoi il faut fournir davantage d'énergie pour mettre en mouvement un objet qui roule que pour accélérer un simple bloc qui glisse à la même vitesse finale ?
    </div>

    <h3>4. Théorème de l'énergie cinétique pour un système</h3>
    <p>Comme pour un point matériel (vu en L1), la dérivée de l'énergie cinétique est égale à la puissance totale des forces appliquées — mais pour un <strong>système</strong>, il faut désormais compter la puissance des forces extérieures <strong>et</strong> celle des forces intérieures :</p>
    <div class="formula-box">$$\\frac{dE_c}{dt} = \\mathcal{P}(\\vec F_{ext}) + \\mathcal{P}(\\vec F_{int})$$</div>
    <div class="key-point">
      <span class="eyebrow">Simplification essentielle pour un solide indéformable</span>
      Bien que la résultante et le moment des forces intérieures soient toujours nuls (chapitre 2), leur <strong>puissance</strong> n'est en général pas nulle pour un système déformable. En revanche, pour un <strong>solide indéformable</strong>, la distance entre deux points reste constante : la puissance des forces intérieures (forces de cohésion) est <strong>toujours nulle</strong>. On retrouve alors $dE_c/dt = \\mathcal{P}(\\vec F_{ext})$, exactement comme pour un point matériel.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La puissance des forces intérieures est toujours nulle pour un solide indéformable, mais pas pour un système déformable comme un ressort qui se comprime. Pourquoi cette différence tient-elle uniquement au fait que les distances entre points restent constantes dans un solide indéformable, et non à une propriété plus générale des forces elles-mêmes ?
    </div>

    <p>Intégré entre deux instants, le théorème s'écrit $\\Delta E_c = W(\\vec F_{ext})$ (solide indéformable). Si de plus les forces extérieures qui travaillent sont conservatives, l'<strong>énergie mécanique</strong> $E_m=E_c+E_p$ du système se conserve, exactement comme au chapitre « Travail, puissance et énergie » de L1.</p>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le terme $\\frac12Mv_G^2$ dans le second théorème de König, en ne gardant que l'énergie de rotation propre</li>
        <li>Croire que la puissance des forces intérieures est toujours nulle : ce n'est vrai que pour un solide <strong>indéformable</strong> (pas pour un système déformable comme un gaz ou un ressort qui se comprime)</li>
        <li>Utiliser $J_\\Delta$ (par rapport à un axe fixe quelconque) au lieu de $J_{\\Delta_G}$ (par rapport à un axe passant par $G$) dans la formule de König pour $E_c^*$</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une boule de bowling ($J_{\\Delta_G}=\\frac25MR^2$) roule sans glisser à la vitesse $v_G$. Son énergie cinétique totale s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen4e1" value="wrong"> $E_c=\\frac12Mv_G^2$</label>
          <label class="option"><input type="radio" name="mgen4e1" value="wrong"> $E_c=\\frac15Mv_G^2$</label>
          <label class="option"><input type="radio" name="mgen4e1" value="right"> $E_c=\\frac{7}{10}Mv_G^2$</label>
          <label class="option"><input type="radio" name="mgen4e1" value="wrong"> $E_c=\\frac25Mv_G^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen4e1','mgen4fb1','Correct — Ec=½J_ΔGω²+½Mv_G², avec ω=v_G/R : Ec=½(2/5)MR²(v_G/R)²+½Mv_G²=(1/5)Mv_G²+(1/2)Mv_G²=(7/10)Mv_G².','Utilise Ec=½J_ΔGω²+½Mv_G² avec ω=v_G/R (roulement sans glissement).')">Vérifier</button>
        <div class="feedback" id="mgen4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">D'après le second théorème de König, l'énergie cinétique totale d'un système s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen4e2" value="right"> $E_c=E_c^*+\\frac12Mv_G^2$</label>
          <label class="option"><input type="radio" name="mgen4e2" value="wrong"> $E_c=E_c^*-\\frac12Mv_G^2$</label>
          <label class="option"><input type="radio" name="mgen4e2" value="wrong"> $E_c=\\frac12Mv_G^2$ uniquement</label>
          <label class="option"><input type="radio" name="mgen4e2" value="wrong"> $E_c=E_c^*\\times Mv_G^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen4e2','mgen4fb2','Correct — l\\'énergie cinétique totale est la somme de l\\'énergie cinétique barycentrique (mouvement interne autour de G) et de l\\'énergie cinétique de translation d\\'ensemble.','Le second théorème de König sépare une part interne d\\'une part de translation d\\'ensemble.')">Vérifier</button>
        <div class="feedback" id="mgen4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour un solide indéformable, la puissance des forces intérieures est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen4e3" value="right"> toujours nulle</label>
          <label class="option"><input type="radio" name="mgen4e3" value="wrong"> toujours égale à celle des forces extérieures</label>
          <label class="option"><input type="radio" name="mgen4e3" value="wrong"> non nulle en général, comme pour tout système</label>
          <label class="option"><input type="radio" name="mgen4e3" value="wrong"> nulle seulement à l'équilibre</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen4e3','mgen4fb3','Correct — comme les distances entre points d\\'un solide indéformable ne changent jamais, le travail des forces de cohésion internes est toujours nul, contrairement à un système déformable.','Repense à ce qui caractérise un solide indéformable : les distances entre ses points.')">Vérifier</button>
        <div class="feedback" id="mgen4fb3"></div>
      </div>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La distinction entre énergie cinétique de translation et énergie cinétique de rotation, au cœur des théorèmes de König, est directement exploitée dans la conception des systèmes de <strong>freinage régénératif</strong> des véhicules électriques modernes : lors du freinage, le moteur électrique fonctionne en générateur et récupère une partie de l'énergie cinétique du véhicule pour recharger la batterie — mais cette énergie récupérable inclut non seulement l'énergie de translation du véhicule ($\\frac12Mv_G^2$), mais aussi l'énergie de rotation propre de ses roues et de son groupe motopropulseur, qu'il faut également freiner. Négliger cette contribution rotationnelle, souvent minoritaire mais non négligeable, conduirait à sous-estimer systématiquement l'énergie réellement récupérable.</p>
    <p><strong>Question ouverte :</strong> pour un véhicule aux roues particulièrement massives (comme un poids lourd), quelle proportion de l'énergie cinétique totale provient de la rotation des roues plutôt que de la translation du véhicule, et comment cette proportion influence-t-elle la stratégie de récupération d'énergie au freinage ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>volants d'inertie de stockage embarqués</strong>, testés notamment dans certains prototypes de véhicules de course hybrides (comme le système KERS en Formule 1), stockent directement l'énergie cinétique récupérée au freinage sous forme de rotation d'un volant, plutôt que de la convertir en énergie électrique — une application directe et particulièrement efficace du second théorème de König.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Système en mouvement → référentiel barycentrique (origine en G, quantité de mouvement totale nulle) → 1er théorème de König (moment cinétique = propre + celui de G fictif) → 2nd théorème de König (Ec = Ec* + ½Mv_G², interne + translation d'ensemble) → pour solide indéformable : puissance des forces intérieures nulle → ΔEc=W(F_ext), conservation de l'énergie mécanique si forces conservatives
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$E_c = E_c^* + \\frac12 M v_G^2$$
      Le second théorème de König, hérité de la décomposition proposée par Samuel König en 1751, résume l'essentiel de ce chapitre : l'énergie cinétique d'un système, aussi complexe soit son mouvement, se sépare toujours proprement en une part interne (autour du centre de masse) et une part de translation d'ensemble — une décomposition qui rend calculable ce qui semblerait autrement inextricable.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Samuel König n'avait jamais eu l'idée de se placer dans le référentiel barycentrique pour décomposer le mouvement d'un système : une méthode équivalente aurait-elle émergé par une autre voie mathématique ?</li>
        <li>Pourquoi une boule pleine (Ec=7/10 Mv_G²) et un cylindre plein (Ec=3/4 Mv_G²) de même masse n'accumulent-ils pas la même énergie cinétique en roulant à la même vitesse, alors que leurs masses et leurs vitesses de translation sont identiques ?</li>
        <li>Quelle serait la conséquence, pour l'efficacité énergétique des véhicules électriques modernes, d'une conception qui négligerait systématiquement l'énergie cinétique de rotation des roues lors du calcul du freinage régénératif ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>S. König, démonstration du théorème de décomposition de l'énergie cinétique, 1751 — le théorème fondateur de ce chapitre.</li>
        <li>J. P. Pérez, <em>Mécanique : fondements et applications</em>, Dunod — référence pédagogique française sur les théorèmes de König.</li>
        <li>T. D. Gillespie, <em>Fundamentals of Vehicle Dynamics</em>, SAE International — sur l'application de l'énergie cinétique de rotation au freinage régénératif des véhicules modernes.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais appliquer les théorèmes de König, calculer l'énergie cinétique d'un solide en rotation ou en roulement, et exploiter le théorème de l'énergie cinétique pour un système. Le chapitre suivant, « Chocs et collisions », mettra à profit la quantité de mouvement et l'énergie cinétique pour analyser ce qui se passe lorsque deux solides entrent brutalement en contact. Comme le montre la décomposition de König : séparer un problème complexe en deux morceaux plus simples à traiter séparément reste, près de trois siècles plus tard, l'une des stratégies les plus puissantes de toute la physique.</p>
  `
};

MECAGEN_NOVA_KB[mecaGenKey('Théorème de König et théorème de l\'énergie cinétique')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Théorème de König et théorème de l'énergie cinétique ». Demande-moi la formule de l'énergie cinétique d'un solide qui roule, pourquoi la puissance des forces intérieures est nulle pour un solide, ou un indice sur un exercice.",
  rules: [
    { test:/k[öo]nig/i, replies:["Second théorème de König : Ec=Ec*+½Mv_G² — l'énergie cinétique totale, c'est l'énergie cinétique interne (autour de G) plus celle de translation d'ensemble."] },
    { test:/roul(e|ement)|cylindre|boule/i, replies:["Pour un solide qui roule sans glisser : Ec=½J_ΔGω²+½Mv_G², avec ω=v_G/R. Exemple : un cylindre plein a Ec=(3/4)Mv_G², une boule pleine Ec=(7/10)Mv_G²."] },
    { test:/puissance.*int[ée]rieure|force.*int[ée]rieure.*travail/i, replies:["Pour un solide indéformable, la puissance des forces intérieures est toujours nulle (les distances internes ne changent pas). Ce n'est pas vrai pour un système déformable !"] },
    { test:/[ée]nergie m[ée]canique|conservation/i, replies:["Si le solide est indéformable et que les forces extérieures qui travaillent sont conservatives, l'énergie mécanique Em=Ec+Ep se conserve, comme en L1."] },
    { test:/r[ée]f[ée]rentiel barycentrique/i, replies:["Le référentiel barycentrique est en translation par rapport au référentiel d'étude, avec origine constamment en G. Dans ce référentiel, la quantité de mouvement totale du système est nulle."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise Ec=½J_ΔGω²+½Mv_G² avec ω=v_G/R.","Indice niveau 2 : le terme de rotation donne (1/5)Mv_G².","Indice niveau 3 : Ec=(7/10)Mv_G²."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : c'est la définition même du second théorème de König.","Indice niveau 2 : deux termes s'additionnent.","Indice niveau 3 : Ec=Ec*+½Mv_G²."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à ce qui définit un solide indéformable.","Indice niveau 2 : les distances entre ses points ne changent jamais.","Indice niveau 3 : la puissance des forces intérieures est donc toujours nulle."] }
  ]
};

/* =========================== CHAPITRE 5 — Chocs et collisions =========================== */
MECAGEN_CHAPTERS[mecaGenKey('Chocs et collisions')] = {
  objectives: [
    "Modéliser un choc entre deux systèmes et justifier la conservation de la quantité de mouvement",
    "Distinguer choc élastique, inélastique et parfaitement inélastique (mou)",
    "Calculer la perte d'énergie cinétique dans un choc mou",
    "Résoudre un choc élastique unidimensionnel à deux corps",
    "Évaluer en quoi le défi lancé par la Royal Society en 1668, résolu indépendamment par Wallis, Wren et Huygens selon des méthodes très différentes convergeant vers les mêmes lois, illustre la solidité des lois de conservation qui gouvernent encore aujourd'hui l'analyse de tout choc entre deux corps"
  ],
  prereqs: ["Éléments cinétiques d'un système", "Théorèmes généraux de la dynamique"],
  bodyHtml: `
    <p>En 1668, la Royal Society de Londres lança un défi resté célèbre dans l'histoire des sciences : elle demanda à trois savants de l'époque — John Wallis, Christopher Wren et Christiaan Huygens — de déterminer, chacun de son côté, les lois régissant le choc de deux corps. Les trois hommes soumirent leurs résultats la même année : Wallis pour les chocs où les corps restent collés (le choc mou de ce chapitre), Wren par une démonstration expérimentale soignée pour les chocs parfaitement élastiques, et Huygens par une démonstration théorique rigoureuse arrivant à la même conclusion que Wren — une convergence remarquable qui validait mutuellement leurs approches très différentes.</p>
    <p>Cet épisode, l'un des premiers exemples documentés de résolution collaborative d'un problème scientifique par plusieurs chercheurs indépendants, aboutit aux lois exactes que tu vas retrouver dans ce chapitre. Le jouet aujourd'hui connu sous le nom de « pendule de Newton », popularisé commercialement trois siècles plus tard, n'illustre donc pas vraiment une découverte de Newton lui-même, mais plutôt les travaux conjoints de Wallis, Wren et Huygens répondant au défi de la Royal Society.</p>
    <p>Un <strong>choc</strong> (ou collision) est une interaction brève et intense entre deux systèmes, au cours de laquelle les vitesses changent brutalement. Les chocs sont omniprésents en physique : collisions de particules, chocs de véhicules, jeu de billard... À la fin de ce chapitre, tu sauras modéliser un choc, distinguer ses différents types selon l'énergie dissipée, et résoudre un choc élastique unidimensionnel à deux corps.</p>

    <h3>1. Modèle du choc et conservation de la quantité de mouvement</h3>
    <p>Pendant la très courte durée $\\tau$ du choc, les forces d'interaction entre les deux corps (forces <strong>intérieures</strong> au système $\\{1,2\\}$ qu'ils forment) sont très supérieures aux forces extérieures habituelles (poids, frottements). On peut donc négliger l'effet des forces extérieures pendant la durée du choc, et donc :</p>
    <div class="key-point">
      <span class="eyebrow">Principe fondamental des chocs</span>
      La quantité de mouvement totale du système $\\{1,2\\}$ se conserve pendant le choc, quelle que soit sa nature : $$\\vec p_{avant} = \\vec p_{après} \\quad\\Longleftrightarrow\\quad m_1\\vec v_1+m_2\\vec v_2 = m_1\\vec v_1'+m_2\\vec v_2'$$
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La conservation de la quantité de mouvement pendant un choc repose sur le fait que les forces d'interaction internes dominent largement les forces extérieures pendant la très courte durée du choc. Pourquoi cette approximation reste-t-elle excellente même pour un choc violent comme une collision de voitures, où les forces extérieures (frottements, poids) semblent pourtant loin d'être négligeables en temps normal ?
    </div>

    <p>En revanche, l'<strong>énergie cinétique</strong> n'est conservée que dans un cas particulier : le choc élastique. Une partie de l'énergie cinétique peut se transformer en chaleur, en son, ou en déformation permanente (énergie interne) lors du choc.</p>

    <h3>2. Choc parfaitement inélastique (mou)</h3>
    <p>Dans un choc <strong>mou</strong>, les deux corps restent accrochés après le choc et repartent à la même vitesse commune $\\vec v'$. La conservation de $\\vec p$ donne immédiatement :</p>
    <div class="formula-box">$$\\vec v' = \\frac{m_1\\vec v_1+m_2\\vec v_2}{m_1+m_2}$$</div>
    <p>La perte d'énergie cinétique associée, toujours strictement positive (sauf cas trivial), vaut $\\Delta E_c = E_{c,après}-E_{c,avant} = -\\dfrac{1}{2}\\dfrac{m_1m_2}{m_1+m_2}(\\vec v_1-\\vec v_2)^2 < 0$ : le choc mou est le choc le plus <strong>dissipatif</strong> possible à quantité de mouvement fixée.</p>

    <h3>3. Choc élastique</h3>
    <p>Dans un choc <strong>élastique</strong>, l'énergie cinétique totale est également conservée en plus de la quantité de mouvement. Pour un choc élastique unidimensionnel entre deux masses $m_1$ (vitesse $v_1$) et $m_2$ (vitesse $v_2$), la résolution du système {conservation de $p$ ; conservation de $E_c$} donne :</p>
    <div class="formula-box">$$v_1' = \\frac{(m_1-m_2)v_1+2m_2v_2}{m_1+m_2} \\qquad v_2' = \\frac{(m_2-m_1)v_2+2m_1v_1}{m_1+m_2}$$</div>
    <p><em>Cas particulier remarquable :</em> pour deux masses égales ($m_1=m_2$), ces formules se simplifient en $v_1'=v_2$ et $v_2'=v_1$ : les deux corps <strong>échangent simplement leurs vitesses</strong> — c'est le principe du jeu de billes de Newton (pendule de Newton).</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le fait que deux masses égales échangent simplement leurs vitesses lors d'un choc élastique est un résultat remarquablement simple, découlant pourtant de la résolution d'un système à deux équations non linéaires. Pourquoi cette simplicité inattendue, une fois qu'on la connaît, permet-elle de prédire instantanément le résultat d'un choc entre masses égales sans refaire le calcul complet à chaque fois ?
    </div>

    <h3>4. Coefficient de restitution</h3>
    <p>On caractérise l'« élasticité » d'un choc unidimensionnel par le <strong>coefficient de restitution</strong> $e$, défini comme le rapport (changé de signe) des vitesses relatives après et avant le choc :</p>
    <div class="formula-box">$$e = -\\frac{v_2'-v_1'}{v_2-v_1}$$</div>
    <table class="mini-table">
      <tr><th>Valeur de $e$</th><th>Type de choc</th></tr>
      <tr><td>$e=1$</td><td>Choc parfaitement élastique (énergie cinétique conservée)</td></tr>
      <tr><td>$0<e<1$</td><td>Choc inélastique intermédiaire (perte partielle d'énergie cinétique)</td></tr>
      <tr><td>$e=0$</td><td>Choc parfaitement inélastique (mou), les corps repartent à la même vitesse</td></tr>
    </table>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer la conservation de l'énergie cinétique à un choc <strong>mou</strong> : seule la quantité de mouvement se conserve dans un choc quelconque</li>
        <li>Oublier que la conservation de $\\vec p$ est <strong>vectorielle</strong> : dans un choc à deux dimensions, il faut la projeter sur deux axes indépendants</li>
        <li>Confondre choc élastique (deux grandeurs conservées : $p$ et $E_c$) et choc mou (une seule inconnue vectorielle après le choc, la vitesse commune)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un chariot de masse $m_1=3$ kg à $v_1=4$ m/s percute un chariot de masse $m_2=1$ kg initialement immobile ($v_2=0$), et les deux chariots restent accrochés (choc mou). La vitesse commune après le choc est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen5e1" value="wrong"> 4 m/s</label>
          <label class="option"><input type="radio" name="mgen5e1" value="right"> 3 m/s</label>
          <label class="option"><input type="radio" name="mgen5e1" value="wrong"> 2 m/s</label>
          <label class="option"><input type="radio" name="mgen5e1" value="wrong"> 1,33 m/s</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen5e1','mgen5fb1','Correct — v\\'=(m1v1+m2v2)/(m1+m2)=(3×4+0)/4=12/4=3 m/s.','Utilise v\\'=(m1v1+m2v2)/(m1+m2).')">Vérifier</button>
        <div class="feedback" id="mgen5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un choc élastique unidimensionnel entre deux masses <strong>égales</strong> dont l'une est initialement immobile :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen5e2" value="wrong"> les deux masses restent accrochées et avancent ensemble</label>
          <label class="option"><input type="radio" name="mgen5e2" value="right"> la masse incidente s'arrête et la masse cible repart avec la vitesse initiale de l'incidente</label>
          <label class="option"><input type="radio" name="mgen5e2" value="wrong"> les deux masses repartent chacune à la moitié de la vitesse initiale</label>
          <label class="option"><input type="radio" name="mgen5e2" value="wrong"> rien ne change, les deux masses gardent leur vitesse initiale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen5e2','mgen5fb2','Correct — pour des masses égales en choc élastique, les vitesses s\\'échangent : v1\\'=v2=0 et v2\\'=v1, c\\'est le principe du pendule de Newton.','Utilise les formules du choc élastique avec m1=m2 : que devient v1\\' et v2\\' ?')">Vérifier</button>
        <div class="feedback" id="mgen5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le coefficient de restitution $e=0$ correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen5e3" value="wrong"> un choc parfaitement élastique</label>
          <label class="option"><input type="radio" name="mgen5e3" value="right"> un choc parfaitement inélastique (mou)</label>
          <label class="option"><input type="radio" name="mgen5e3" value="wrong"> une absence totale de choc</label>
          <label class="option"><input type="radio" name="mgen5e3" value="wrong"> un choc avec gain d'énergie cinétique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen5e3','mgen5fb3','Correct — e=0 signifie que les vitesses relatives après le choc sont nulles : les deux corps repartent à la même vitesse, c\\'est le choc mou.','Repense à la définition e=-(v2\\'-v1\\')/(v2-v1) : que devient-elle si les corps repartent ensemble ?')">Vérifier</button>
        <div class="feedback" id="mgen5fb3"></div>
      </div>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La conception moderne des véhicules automobiles exploite directement, mais à rebours, les principes de ce chapitre : les ingénieurs en sécurité automobile conçoivent délibérément des <strong>zones de déformation programmée</strong> (crumple zones) à l'avant et à l'arrière des véhicules, dont l'objectif est de minimiser le coefficient de restitution $e$ lors d'une collision — c'est-à-dire de maximiser la dissipation d'énergie cinétique en déformation plastique de la carrosserie, plutôt que de la transmettre brutalement aux occupants sous forme d'accélération. Un choc quasi élastique ($e$ proche de 1), qui rebondirait fortement, serait paradoxalement bien plus dangereux pour les passagers qu'un choc bien absorbé, même si l'énergie cinétique totale de l'impact reste identique dans les deux cas.</p>
    <p><strong>Question ouverte :</strong> comment les ingénieurs déterminent-ils la répartition optimale de la déformation programmée sur un véhicule, pour maximiser la protection des occupants sans compromettre l'intégrité de l'habitacle lui-même ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>simulations numériques de crash-test</strong> par éléments finis permettent aujourd'hui de modéliser précisément, avant même la construction d'un seul prototype physique, comment un véhicule se déforme lors d'un choc et quelle proportion de l'énergie cinétique est effectivement dissipée par chaque composant de sa structure.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Choc entre deux corps → conservation systématique de la quantité de mouvement (forces internes dominantes pendant le choc) → énergie cinétique conservée seulement si choc élastique (e=1) → dissipée partiellement (0&lt;e&lt;1) ou maximalement (choc mou, e=0) → résolution du système {conservation de p ; conservation de Ec si élastique} pour trouver les vitesses finales
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$m_1\\vec v_1+m_2\\vec v_2 = m_1\\vec v_1'+m_2\\vec v_2'$$
      Cette conservation de la quantité de mouvement, validée indépendamment par Wallis, Wren et Huygens en 1668, reste vraie pour absolument tout type de choc, élastique ou non — c'est le seul principe universel de ce chapitre, sur lequel viennent ensuite se greffer des hypothèses supplémentaires (conservation ou non de l'énergie cinétique) selon la nature précise du choc étudié.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la Royal Society n'avait jamais lancé ce défi collectif en 1668 : les lois du choc auraient-elles été découvertes aussi rapidement par une démarche scientifique isolée plutôt que par cette convergence de trois approches indépendantes ?</li>
        <li>Pourquoi la perte d'énergie cinétique dans un choc mou est-elle toujours strictement positive (sauf cas trivial), et non parfois nulle ou négative ?</li>
        <li>Quelle serait la conséquence, pour la sécurité automobile moderne, d'une conception de véhicule privilégiant un coefficient de restitution élevé plutôt qu'une dissipation maximale de l'énergie cinétique lors d'un choc ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. Wallis, C. Wren, C. Huygens, communications à la Royal Society sur les lois du choc, 1668-1669 — l'épisode fondateur de la théorie moderne des collisions.</li>
        <li>J. P. Pérez, <em>Mécanique : fondements et applications</em>, Dunod — référence pédagogique française sur les chocs et collisions.</li>
        <li>N. Bourdet et al., « Reconstruction of Real-World Vehicle-to-Vehicle Crashes », Traffic Injury Prevention — sur l'ingénierie moderne des zones de déformation programmée.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais modéliser un choc, distinguer ses différents types selon l'énergie dissipée, et résoudre un choc élastique unidimensionnel à deux corps. Le chapitre suivant, « Statique du solide et liaisons mécaniques », changera de perspective pour étudier les solides à l'équilibre plutôt qu'en mouvement brutal. Comme le montre le défi de la Royal Society de 1668 : trois chercheurs, travaillant indépendamment avec des méthodes très différentes, peuvent converger vers exactement la même vérité physique — une des plus belles démonstrations de la solidité des lois de conservation en physique.</p>
  `
};

MECAGEN_NOVA_KB[mecaGenKey('Chocs et collisions')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Chocs et collisions ». Demande-moi la différence entre choc élastique et choc mou, pourquoi la quantité de mouvement se conserve toujours, ou un indice sur un exercice.",
  rules: [
    { test:/quantit[ée] de mouvement.*conserv|conservation.*quantit[ée]/i, replies:["Pendant un choc, les forces d'interaction (internes) dominent largement les forces extérieures habituelles : la quantité de mouvement totale se conserve toujours, quelle que soit la nature du choc."] },
    { test:/choc mou|in[ée]lastique/i, replies:["Choc mou : les corps restent accrochés, v'=(m1v1+m2v2)/(m1+m2). L'énergie cinétique n'est PAS conservée — une partie se dissipe (chaleur, déformation, son)."] },
    { test:/choc [ée]lastique/i, replies:["Choc élastique : p ET Ec sont conservées. Pour deux masses égales, les vitesses s'échangent purement et simplement (pendule de Newton)."] },
    { test:/coefficient de restitution/i, replies:["e=-(v2'-v1')/(v2-v1). e=1 : choc élastique. e=0 : choc mou. Entre les deux : choc partiellement inélastique."] },
    { test:/[ée]nergie.*perdu|perte.*[ée]nergie/i, replies:["La perte d'énergie cinétique dans un choc mou vaut ΔEc=-½[m1m2/(m1+m2)](v1-v2)² : toujours négative, maximale pour un choc mou (e=0)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise v'=(m1v1+m2v2)/(m1+m2).","Indice niveau 2 : numérateur = 3×4+1×0=12.","Indice niveau 3 : v'=12/4=3 m/s."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise les formules du choc élastique avec m1=m2.","Indice niveau 2 : v1' devient égal à v2 (donc 0 ici), et v2' devient égal à v1.","Indice niveau 3 : la masse incidente s'arrête, la cible repart avec la vitesse initiale de l'incidente."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : repars de la définition de e.","Indice niveau 2 : si les corps repartent à la même vitesse, v2'-v1'=0.","Indice niveau 3 : e=0 correspond donc au choc mou."] }
  ]
};

/* =========================== CHAPITRE 6 — Statique du solide et liaisons mécaniques =========================== */
MECAGEN_CHAPTERS[mecaGenKey('Statique du solide et liaisons mécaniques')] = {
  objectives: [
    "Écrire les deux conditions d'équilibre d'un solide (résultante et moment nuls)",
    "Modéliser les liaisons mécaniques usuelles et les actions qu'elles transmettent",
    "Connaître les lois de Coulomb du frottement solide et l'angle de frottement",
    "Résoudre un problème classique d'équilibre avec ou sans frottement",
    "Évaluer en quoi les lois empiriques de Coulomb sur le frottement, établies dès 1781 pour améliorer les machines navales, restent aujourd'hui encore la référence de l'ingénierie malgré la complexité physique réelle du contact entre surfaces à l'échelle microscopique"
  ],
  prereqs: ["Théorèmes généraux de la dynamique"],
  bodyHtml: `
    <p>En 1781, l'ingénieur militaire français Charles-Augustin de Coulomb remporta le prix de l'Académie royale des sciences pour un mémoire consacré non pas à l'électricité — la découverte qui allait plus tard rendre son nom célèbre — mais au frottement des machines simples. Chargé par l'armée d'améliorer la conception des poulies, câbles et engrenages utilisés dans la construction navale, Coulomb mena une série d'expériences méticuleuses qui aboutirent aux lois empiriques du frottement solide que tu vas étudier dans ce chapitre, restées quasiment inchangées depuis près de deux siècles et demi.</p>
    <p>Ce que Coulomb découvrit alors reste contre-intuitif pour beaucoup : contrairement à une résistance de l'air ou à un frottement visqueux, la force de frottement solide ne dépend presque pas de la vitesse de glissement, ni de la surface apparente de contact — seul le rapport entre la force normale et la force tangentielle compte, résumé dans le coefficient $f_s$ qui porte indirectement son héritage. Cette simplicité empirique, obtenue sans aucune théorie microscopique du contact entre surfaces, reste aujourd'hui encore largement utilisée telle quelle dans l'ingénierie, alors même que la physique moderne du frottement (à l'échelle des aspérités microscopiques) est bien plus complexe.</p>
    <p>La <strong>statique du solide</strong> étudie les conditions d'équilibre — les théorèmes généraux du chapitre 3, appliqués au cas particulier où le solide reste immobile ($\\vec a_G=\\vec 0$, $\\dot{\\vec\\omega}=\\vec 0$). À la fin de ce chapitre, tu sauras écrire les conditions d'équilibre d'un solide, modéliser les liaisons mécaniques usuelles, et résoudre un problème d'équilibre avec ou sans frottement.</p>

    <h3>1. Principe fondamental de la statique (PFS)</h3>
    <p>Un solide est en équilibre dans un référentiel galiléen si et seulement si la résultante <strong>et</strong> le moment (en tout point) des forces extérieures qui s'exercent sur lui sont nuls :</p>
    <div class="formula-box">$$\\sum \\vec F_{ext} = \\vec 0 \\qquad\\text{et}\\qquad \\sum \\vec{\\mathcal{M}}_A(\\vec F_{ext}) = \\vec 0 \\ \\ \\forall A$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Il suffit de vérifier la condition sur le moment en <strong>un seul point</strong> $A$ : si la résultante est nulle, le moment est alors automatiquement le même en tout autre point (formule de transport). Un choix judicieux de $A$ (souvent un point où s'appliquent plusieurs forces inconnues) élimine ces inconnues du calcul de moment et simplifie beaucoup la résolution.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Il suffit de vérifier la condition sur le moment en un seul point pour garantir l'équilibre, à condition que la résultante soit déjà nulle. Pourquoi cette économie — ne pas avoir à vérifier le moment en tout point séparément — découle-t-elle directement de la formule de transport des moments vue dans les chapitres précédents ?
    </div>

    <h3>2. Liaisons mécaniques usuelles</h3>
    <p>Une <strong>liaison</strong> limite certains des 6 degrés de liberté (3 translations, 3 rotations) d'un solide en le mettant en contact avec un autre. Chaque liaison transmet un <strong>torseur d'actions mécaniques</strong> dont la forme dépend des mouvements qu'elle autorise ou bloque.</p>
    <table class="mini-table">
      <tr><th>Liaison</th><th>Mouvements autorisés</th><th>Action transmise (idéale, sans frottement)</th></tr>
      <tr><td>Appui simple (ponctuel)</td><td>2 translations + 3 rotations</td><td>Une force normale au plan de contact</td></tr>
      <tr><td>Pivot (axe fixe)</td><td>1 rotation autour de l'axe</td><td>Une force quelconque + un moment nul selon l'axe</td></tr>
      <tr><td>Glissière</td><td>1 translation le long d'un axe</td><td>Un moment quelconque + une force nulle selon l'axe</td></tr>
      <tr><td>Encastrement</td><td>Aucun</td><td>Une force et un moment quelconques (3+3 inconnues)</td></tr>
    </table>

    <h3>3. Frottement solide : lois de Coulomb</h3>
    <p>Dans un contact réel, la réaction du support se décompose en une composante normale $\\vec N$ et une composante tangentielle $\\vec T$ (le frottement), qui s'oppose au glissement relatif ou tend à l'empêcher. Les <strong>lois de Coulomb</strong> du frottement solide s'écrivent :</p>
    <table class="mini-table">
      <tr><th>Situation</th><th>Loi</th></tr>
      <tr><td>Équilibre (pas de glissement)</td><td>$\\|\\vec T\\| \\le f_s\\,\\|\\vec N\\|$ ($f_s$ : coefficient de frottement statique)</td></tr>
      <tr><td>Glissement (mouvement relatif)</td><td>$\\|\\vec T\\| = f_d\\,\\|\\vec N\\|$, $\\vec T$ opposé au glissement ($f_d$ : coefficient dynamique, $f_d\\le f_s$)</td></tr>
    </table>
    <p>On définit l'<strong>angle de frottement</strong> $\\varphi$ par $\\tan\\varphi = f_s$ : c'est l'inclinaison maximale d'un plan sur lequel un solide reste en équilibre sans glisser sous son propre poids. Au-delà de $\\varphi$, l'équilibre devient impossible.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'angle de frottement φ définit un seuil net : en dessous, l'équilibre reste possible indéfiniment ; au-delà, il devient structurellement impossible, quelle que soit la patience qu'on y consacre. En quoi cette existence d'un seuil précis, plutôt qu'une dégradation progressive de la stabilité, reflète-t-elle la nature de l'inégalité de Coulomb T≤f_sN ?
    </div>

    <div class="diagram">
      <svg width="220" height="140" viewBox="0 0 220 140">
        <line x1="15" y1="120" x2="200" y2="30" stroke="#122043" stroke-width="2.5"/>
        <line x1="15" y1="120" x2="200" y2="120" stroke="#122043" stroke-width="1" stroke-dasharray="2,2"/>
        <path d="M 60 106 A 100 100 0 0 1 90 91" fill="none" stroke="#E8A93A" stroke-width="1.4"/>
        <text x="66" y="98" font-size="10" fill="#E8A93A">φ</text>
        <rect x="98" y="61" width="26" height="16" fill="#3D6BF0" transform="rotate(-25 111 69)"/>
        <line x1="111" y1="69" x2="111" y2="40" stroke="#F0555C" stroke-width="2"/>
        <text x="115" y="42" font-size="10" fill="#F0555C">N</text>
        <line x1="111" y1="69" x2="90" y2="80" stroke="#1FB6A8" stroke-width="2"/>
        <text x="66" y="86" font-size="10" fill="#1FB6A8">T</text>
      </svg>
    </div>

    <h3>4. Méthode de résolution d'un problème de statique</h3>
    <ol style="margin-left:1.4em; margin-bottom:1em;">
      <li>Isoler le solide (ou le système de solides) à étudier</li>
      <li>Faire le bilan complet des actions extérieures (poids, réactions des liaisons, forces appliquées)</li>
      <li>Écrire le théorème de la résultante : $\\sum\\vec F_{ext}=\\vec 0$, projetée sur des axes bien choisis</li>
      <li>Écrire le théorème du moment en un point choisi pour éliminer un maximum d'inconnues</li>
      <li>Résoudre le système d'équations obtenu</li>
    </ol>
    <p><em>Exemple classique :</em> une échelle appuyée contre un mur vertical lisse (sans frottement) et reposant sur un sol rugueux (coefficient $f_s$) n'est en équilibre que si l'angle qu'elle fait avec le sol est suffisamment grand — sinon elle glisse au pied, car le frottement au sol doit à lui seul compenser la réaction horizontale du mur.</p>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier l'une des deux équations du PFS (résultante <strong>ou</strong> moment) : les deux sont indépendantes et nécessaires en général</li>
        <li>Mal choisir le point de calcul du moment, ce qui laisse inutilement plusieurs inconnues dans l'équation</li>
        <li>Confondre le coefficient de frottement statique $f_s$ (seuil de non-glissement) avec le coefficient dynamique $f_d$ (une fois le glissement amorcé), souvent légèrement inférieur</li>
        <li>Appliquer $T=f_sN$ à l'équilibre : tant qu'il n'y a pas glissement, on a seulement l'inégalité $T\\le f_sN$, pas l'égalité</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Les deux conditions nécessaires et suffisantes pour l'équilibre d'un solide libre sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen6e1" value="wrong"> résultante nulle uniquement</label>
          <label class="option"><input type="radio" name="mgen6e1" value="wrong"> moment nul uniquement</label>
          <label class="option"><input type="radio" name="mgen6e1" value="right"> résultante nulle ET moment nul en un point</label>
          <label class="option"><input type="radio" name="mgen6e1" value="wrong"> énergie cinétique nulle uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen6e1','mgen6fb1','Correct — ce sont les deux conditions du principe fondamental de la statique ; une résultante nulle seule n\\'empêche pas une mise en rotation.','Repense au théorème de la résultante ET à celui du moment cinétique, tous deux appliqués à l\\'équilibre.')">Vérifier</button>
        <div class="feedback" id="mgen6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'angle de frottement $\\varphi$ est défini par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen6e2" value="right"> $\\tan\\varphi = f_s$</label>
          <label class="option"><input type="radio" name="mgen6e2" value="wrong"> $\\sin\\varphi = f_s$</label>
          <label class="option"><input type="radio" name="mgen6e2" value="wrong"> $\\varphi = f_s$ (en radians)</label>
          <label class="option"><input type="radio" name="mgen6e2" value="wrong"> $\\cos\\varphi = f_s$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen6e2','mgen6fb2','Correct — tanφ=f_s : c\\'est l\\'inclinaison maximale d\\'un plan sur lequel un solide reste en équilibre sans glisser.','Pense au plan incliné à la limite du glissement : quelle relation trigonométrique relie l\\'angle limite à f_s ?')">Vérifier</button>
        <div class="feedback" id="mgen6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une liaison pivot autour d'un axe fixe autorise :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen6e3" value="wrong"> une translation le long de l'axe</label>
          <label class="option"><input type="radio" name="mgen6e3" value="right"> une rotation autour de l'axe</label>
          <label class="option"><input type="radio" name="mgen6e3" value="wrong"> tous les mouvements</label>
          <label class="option"><input type="radio" name="mgen6e3" value="wrong"> aucun mouvement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen6e3','mgen6fb3','Correct — une liaison pivot ne laisse qu\\'un seul degré de liberté : la rotation autour de l\\'axe de la liaison.','Une liaison pivot, c\\'est comme une charnière autour d\\'un axe fixe : quel unique mouvement reste possible ?')">Vérifier</button>
        <div class="feedback" id="mgen6fb3"></div>
      </div>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Les lois de Coulomb, remarquablement robustes à l'échelle macroscopique de l'ingénierie courante, cessent de s'appliquer telles quelles à très petite échelle : la <strong>tribologie</strong> moderne (la science du frottement, de l'usure et de la lubrification) a montré que dans les microsystèmes électromécaniques (MEMS, utilisés par exemple dans les accéléromètres de smartphones) ou à l'échelle atomique étudiée par microscopie à force atomique, les forces d'adhésion entre surfaces deviennent comparables, voire dominantes, par rapport à la force normale — une situation où le simple rapport $T/N=f_s$ de Coulomb ne suffit plus à décrire le comportement réel du contact.</p>
    <p><strong>Question ouverte :</strong> à partir de quelle échelle de taille les lois macroscopiques de Coulomb cessent-elles progressivement d'être une bonne approximation, et quels modèles physiques prennent alors le relais pour décrire fidèlement le frottement ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>revêtements à friction contrôlée</strong>, développés en science des matériaux pour réduire délibérément ou au contraire augmenter le coefficient de frottement selon l'application visée (roulements à très faible frottement, pneus à forte adhérence), s'appuient aujourd'hui sur une compréhension bien plus fine du contact entre surfaces que les lois empiriques originelles de Coulomb.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Solide à l'équilibre → PFS : résultante nulle ET moment nul en un point → identification des liaisons (appui, pivot, glissière, encastrement) et de leurs inconnues → si contact avec frottement : lois de Coulomb (T≤f_sN à l'équilibre, T=f_dN en glissement) → isolement du solide, bilan des forces, résolution du système d'équations
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\|\\vec T\\| \\le f_s\\,\\|\\vec N\\|$$
      Cette inégalité, héritée des expériences méticuleuses de Coulomb sur les machines navales du XVIIIe siècle, résume la nature même de l'équilibre avec frottement : tant que la force tangentielle nécessaire reste sous ce seuil, l'équilibre est possible ; au-delà, aucune force de frottement ne peut plus l'empêcher, et le solide glisse inévitablement.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Coulomb n'avait jamais été chargé par l'armée française d'étudier le frottement des machines navales en 1781 : les lois empiriques du frottement solide auraient-elles été établies aussi tôt par une autre voie ?</li>
        <li>Pourquoi le coefficient de frottement dynamique f_d est-il en général légèrement inférieur au coefficient statique f_s, alors que les deux décrivent le même contact entre les deux mêmes surfaces ?</li>
        <li>Quelle serait la conséquence, pour la conception des microsystèmes électromécaniques modernes, d'une application aveugle des lois macroscopiques de Coulomb sans tenir compte des forces d'adhésion dominantes à cette échelle ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>C.-A. de Coulomb, <em>Théorie des machines simples</em>, mémoire couronné par l'Académie royale des sciences, 1781 — l'ouvrage fondateur des lois du frottement solide.</li>
        <li>J. P. Pérez, <em>Mécanique : fondements et applications</em>, Dunod — référence pédagogique française sur la statique du solide.</li>
        <li>B. Bhushan, <em>Introduction to Tribology</em>, Wiley — référence moderne sur la science du frottement à toutes les échelles.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais écrire les conditions d'équilibre d'un solide, modéliser les liaisons mécaniques usuelles, et résoudre un problème d'équilibre avec ou sans frottement. Le dernier chapitre de cette matière, « Référentiels non galiléens et forces d'inertie », abandonnera l'hypothèse d'un référentiel galiléen pour explorer ce qui se passe quand on observe un mouvement depuis un référentiel lui-même accéléré. Comme le montre l'héritage de Coulomb : une loi empirique simple, établie pour résoudre un problème d'ingénierie concret, peut rester la référence pratique pendant près de deux siècles et demi, même quand la science moderne en révèle la complexité sous-jacente.</p>
  `
};

MECAGEN_NOVA_KB[mecaGenKey('Statique du solide et liaisons mécaniques')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Statique du solide et liaisons mécaniques ». Demande-moi les conditions d'équilibre, les lois de Coulomb du frottement, ou un indice sur un exercice.",
  rules: [
    { test:/pfs|principe fondamental.*statique|[ée]quilibre/i, replies:["Un solide est en équilibre si et seulement si ΣF_ext=0 ET ΣM_A(F_ext)=0 en un point A (donc en tout point, par transport)."] },
    { test:/liaison/i, replies:["Appui simple : 2 translations + 3 rotations libres. Pivot : 1 rotation libre. Glissière : 1 translation libre. Encastrement : aucun mouvement libre, tout est bloqué."] },
    { test:/frottement|coulomb/i, replies:["Lois de Coulomb : à l'équilibre T≤f_s·N (inégalité !), en glissement T=f_d·N avec T opposé au mouvement. f_d est en général légèrement inférieur à f_s."] },
    { test:/angle de frottement/i, replies:["tanφ=f_s : c'est l'angle limite d'un plan incliné sur lequel un objet reste en équilibre sans glisser sous son propre poids."] },
    { test:/[ée]chelle/i, replies:["Pour l'échelle contre un mur : isole l'échelle, fais le bilan des forces (poids, réaction du mur, réaction + frottement du sol), puis écris PFS avec un moment calculé au pied de l'échelle pour éliminer certaines inconnues."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense aux deux théorèmes généraux appliqués à l'équilibre.","Indice niveau 2 : résultante nulle seule n'empêche pas une rotation.","Indice niveau 3 : il faut résultante nulle ET moment nul."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense au plan incliné à la limite du glissement.","Indice niveau 2 : à la limite, T=f_s·N=Mg sinφ et N=Mg cosφ.","Indice niveau 3 : en divisant, tanφ=f_s."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : une liaison pivot, c'est comme une charnière.","Indice niveau 2 : elle est construite autour d'un axe fixe.","Indice niveau 3 : seule la rotation autour de cet axe reste possible."] }
  ]
};

/* =========================== CHAPITRE 7 — Référentiels non galiléens et forces d'inertie =========================== */
MECAGEN_CHAPTERS[mecaGenKey('Référentiels non galiléens et forces d\'inertie')] = {
  objectives: [
    "Justifier l'introduction de forces d'inertie dans un référentiel non galiléen",
    "Établir la loi de composition des accélérations",
    "Calculer la force d'inertie d'entraînement (cas d'un référentiel en rotation uniforme)",
    "Calculer la force d'inertie de Coriolis et identifier les situations où elle s'annule",
    "Évaluer en quoi la découverte de Coriolis en 1835, motivée par l'étude de machines tournantes et sans lien initial avec la météorologie, illustre comment un résultat mathématique développé pour un problème technique restreint peut, des décennies plus tard, éclairer un phénomène planétaire aussi vaste que la circulation atmosphérique"
  ],
  prereqs: ["Théorèmes généraux de la dynamique", "Cinématique du solide indéformable"],
  bodyHtml: `
    <p>En 1835, l'ingénieur et mathématicien français Gaspard-Gustave de Coriolis publia un mémoire théorique sur les machines tournantes — roues hydrauliques, machines à vapeur — cherchant à comprendre pourquoi certaines pièces mécaniques en rotation semblaient soumises à des forces mystérieuses, absentes de tout calcul classique. Il y démontra mathématiquement l'existence de la force qui porte aujourd'hui son nom, sans jamais l'appliquer lui-même à la météorologie ou à l'océanographie : ce n'est que plusieurs décennies plus tard que d'autres scientifiques comprirent que cette même force, appliquée à l'atmosphère et aux océans d'une Terre en rotation, expliquait la déviation systématique des vents et des courants marins.</p>
    <p>Cette histoire illustre une trajectoire fréquente en physique : un résultat mathématique abstrait, développé pour résoudre un problème d'ingénierie précis et limité, peut se révéler des décennies plus tard porteur d'implications bien plus vastes que son inventeur n'aurait jamais pu l'imaginer — de la rotation d'une simple roue de machine à la formation des cyclones tropicaux qui façonnent le climat de notre planète.</p>
    <p>Tout le cours de mécanique du point et de mécanique générale a supposé, jusqu'ici, un <strong>référentiel galiléen</strong>. Beaucoup de référentiels usuels (un manège, une voiture qui freine, un laboratoire sur Terre en rotation) ne le sont qu'approximativement. Ce chapitre montre comment adapter le principe fondamental de la dynamique à un référentiel non galiléen, au prix de l'introduction de <strong>forces d'inertie</strong> fictives. À la fin de ce chapitre, tu sauras établir la loi de composition des accélérations et calculer les forces d'inertie d'entraînement et de Coriolis — clôturant ainsi la matière Mécanique générale de cette L2.</p>

    <h3>1. Loi de composition des accélérations</h3>
    <p>Soit $\\mathcal{R}_0$ un référentiel galiléen (dit « absolu ») et $\\mathcal{R}$ un référentiel quelconque (dit « relatif »), en mouvement par rapport à $\\mathcal{R}_0$. Pour un point matériel $M$, l'accélération absolue $\\vec a_a$ (dans $\\mathcal{R}_0$) se décompose en trois termes :</p>
    <div class="formula-box">$$\\vec a_a = \\vec a_r + \\vec a_e + \\vec a_c$$</div>
    <table class="mini-table">
      <tr><th>Terme</th><th>Signification</th></tr>
      <tr><td>$\\vec a_r$ (relative)</td><td>Accélération de $M$ mesurée <strong>dans</strong> $\\mathcal{R}$, celle qu'un observateur lié à $\\mathcal{R}$ mesurerait</td></tr>
      <tr><td>$\\vec a_e$ (d'entraînement)</td><td>Accélération qu'aurait un point fixe de $\\mathcal{R}$ coïncidant avec $M$ à cet instant</td></tr>
      <tr><td>$\\vec a_c$ (de Coriolis)</td><td>$\\vec a_c = 2\\,\\vec\\omega(\\mathcal{R}/\\mathcal{R}_0)\\wedge\\vec v_r$, couplage entre la rotation de $\\mathcal{R}$ et la vitesse relative de $M$</td></tr>
    </table>

    <h3>2. Principe fondamental de la dynamique dans un référentiel non galiléen</h3>
    <p>En reportant cette décomposition dans le PFD ($m\\vec a_a = \\sum \\vec F$) écrit dans le référentiel galiléen, et en isolant $\\vec a_r$, on obtient l'équation du mouvement <strong>dans</strong> le référentiel non galiléen $\\mathcal{R}$ :</p>
    <div class="formula-box">$$m\\vec a_r = \\sum \\vec F + \\underbrace{(-m\\vec a_e)}_{\\vec F_{ie}} + \\underbrace{(-m\\vec a_c)}_{\\vec F_{ic}}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Pour appliquer le PFD dans un référentiel non galiléen, il suffit d'ajouter aux forces réelles $\\sum\\vec F$ deux <strong>forces d'inertie fictives</strong> : la force d'inertie d'entraînement $\\vec F_{ie}=-m\\vec a_e$ et la force d'inertie de Coriolis $\\vec F_{ic}=-m\\vec a_c$. Ces forces n'ont pas d'origine physique (aucune interaction ne les produit) : elles compensent simplement le fait que $\\mathcal{R}$ n'est pas galiléen.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les forces d'inertie n'ont aucune origine physique réelle — aucune interaction, aucun corps ne les produit — et pourtant elles produisent des effets parfaitement mesurables, comme le poids apparent ressenti dans un ascenseur qui accélère. En quoi cette absence de cause physique, combinée à des effets bien réels, rend-elle ces forces « fictives » particulièrement déroutantes à première vue ?
    </div>

    <h3>3. Cas d'un référentiel en rotation uniforme (force centrifuge)</h3>
    <p>Pour un référentiel $\\mathcal{R}$ en rotation uniforme à la vitesse angulaire $\\omega$ autour d'un axe fixe de $\\mathcal{R}_0$, l'accélération d'entraînement d'un point $M$ vaut $\\vec a_e = -\\omega^2\\,\\vec{HM}$ ($H$ = projeté de $M$ sur l'axe de rotation), dirigée vers l'axe. La force d'inertie d'entraînement correspondante est donc :</p>
    <div class="formula-box">$$\\vec F_{ie} = m\\,\\omega^2\\,\\vec{HM} \\quad \\text{(force centrifuge, dirigée vers l'extérieur)}$$</div>
    <p>C'est cette force fictive qui « plaque » les passagers d'un manège ou d'une essoreuse vers l'extérieur, dans le référentiel tournant.</p>

    <h3>4. Force d'inertie de Coriolis</h3>
    <div class="formula-box">$$\\vec F_{ic} = -2m\\,\\vec\\omega(\\mathcal{R}/\\mathcal{R}_0)\\wedge\\vec v_r$$</div>
    <div class="key-point">
      <span class="eyebrow">Quand la force de Coriolis s'annule-t-elle ?</span>
      La force de Coriolis est nulle si le point est immobile dans $\\mathcal{R}$ ($\\vec v_r=\\vec 0$), ou si $\\vec v_r$ est parallèle à $\\vec\\omega$. Elle est en revanche <strong>maximale</strong> lorsque $\\vec v_r$ est perpendiculaire à $\\vec\\omega$ — c'est le cas typique des mouvements horizontaux à la surface de la Terre.
    </div>
    <p>Sur Terre, référentiel tournant à $\\omega\\approx 7,29\\times10^{-5}\\ \\text{rad/s}$, la force de Coriolis est responsable de la déviation vers la droite des courants et vents dans l'hémisphère Nord (vers la gauche dans l'hémisphère Sud), à l'origine notamment de la rotation des cyclones. Son effet reste négligeable sur des mouvements de laboratoire (vitesses et durées trop faibles) mais devient déterminant à l'échelle météorologique ou océanique.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La force de Coriolis reste totalement négligeable pour un mouvement de laboratoire, mais devient déterminante à l'échelle météorologique ou océanique. Pourquoi cette même force, mathématiquement identique dans les deux cas, produit-elle des effets si différents selon l'échelle spatiale et temporelle du mouvement considéré ?
    </div>

    <div class="diagram">
      <svg width="220" height="140" viewBox="0 0 220 140">
        <line x1="20" y1="115" x2="200" y2="115" stroke="#122043" stroke-width="1"/>
        <ellipse cx="110" cy="115" rx="90" ry="14" fill="none" stroke="#122043" stroke-width="1.2" stroke-dasharray="3,3"/>
        <line x1="110" y1="15" x2="110" y2="115" stroke="#3D6BF0" stroke-width="2"/>
        <text x="116" y="25" font-size="10" fill="#3D6BF0">ω</text>
        <circle cx="180" cy="112" r="4" fill="#F0555C"/>
        <line x1="180" y1="112" x2="205" y2="112" stroke="#F0555C" stroke-width="2" marker-end="url(#arrF)"/>
        <text x="182" y="128" font-size="9" fill="#F0555C">F_ie (centrifuge)</text>
        <line x1="180" y1="112" x2="180" y2="90" stroke="#1FB6A8" stroke-width="2" marker-end="url(#arrF)"/>
        <text x="150" y="86" font-size="9" fill="#1FB6A8">F_ic (Coriolis)</text>
        <defs><marker id="arrF" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#122043"/></marker></defs>
      </svg>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le facteur $2$ dans l'expression de la force de Coriolis</li>
        <li>Appliquer une force de Coriolis à un point immobile dans le référentiel tournant (elle est alors nulle par définition)</li>
        <li>Confondre la force centrifuge (fictive, n'existe que dans le référentiel tournant) avec une force réelle : dans le référentiel galiléen, seule l'accélération centripète réelle existe, produite par une vraie force (tension, réaction...)</li>
        <li>Se tromper de sens pour $\\vec\\omega$ : son sens est donné par la règle de la main droite selon l'axe et le sens de rotation</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La force d'inertie de Coriolis s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen7e1" value="wrong"> $\\vec F_{ic}=-m\\,\\vec\\omega\\wedge\\vec v_r$</label>
          <label class="option"><input type="radio" name="mgen7e1" value="right"> $\\vec F_{ic}=-2m\\,\\vec\\omega\\wedge\\vec v_r$</label>
          <label class="option"><input type="radio" name="mgen7e1" value="wrong"> $\\vec F_{ic}=m\\,\\omega^2\\,\\vec{HM}$</label>
          <label class="option"><input type="radio" name="mgen7e1" value="wrong"> $\\vec F_{ic}=-4m\\,\\vec\\omega\\wedge\\vec v_r$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen7e1','mgen7fb1','Correct — n\\'oublie pas le facteur 2 : F_ic=-2m·ω∧v_r.','Attention au facteur numérique devant le produit vectoriel ω∧v_r.')">Vérifier</button>
        <div class="feedback" id="mgen7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un référentiel en rotation uniforme, la force d'inertie d'entraînement (force centrifuge) est dirigée :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen7e2" value="wrong"> vers l'axe de rotation</label>
          <label class="option"><input type="radio" name="mgen7e2" value="right"> à l'opposé de l'axe de rotation</label>
          <label class="option"><input type="radio" name="mgen7e2" value="wrong"> toujours verticale</label>
          <label class="option"><input type="radio" name="mgen7e2" value="wrong"> parallèle à ω</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen7e2','mgen7fb2','Correct — F_ie=mω²HM pointe de l\\'axe H vers le point M, donc s\\'éloigne de l\\'axe : c\\'est ce qui « plaque » vers l\\'extérieur.','Repense au signe de F_ie=mω²HM : de quel point vers quel point pointe le vecteur HM ?')">Vérifier</button>
        <div class="feedback" id="mgen7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La force de Coriolis s'annule dans les cas suivants, sauf un. Lequel ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mgen7e3" value="wrong"> le point est immobile dans le référentiel tournant</label>
          <label class="option"><input type="radio" name="mgen7e3" value="wrong"> la vitesse relative est parallèle à ω</label>
          <label class="option"><input type="radio" name="mgen7e3" value="right"> la vitesse relative est perpendiculaire à ω</label>
          <label class="option"><input type="radio" name="mgen7e3" value="wrong"> le référentiel ne tourne pas (ω=0)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mgen7e3','mgen7fb3','Correct — au contraire, c\\'est justement quand v_r est perpendiculaire à ω que le produit vectoriel ω∧v_r (donc la force de Coriolis) est maximal.','La force de Coriolis dépend d\\'un produit vectoriel ω∧v_r : quand est-il maximal, et quand est-il nul ?')">Vérifier</button>
        <div class="feedback" id="mgen7fb3"></div>
      </div>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La force de Coriolis, négligeable à l'échelle du laboratoire comme le rappelle ce chapitre, devient un paramètre de calcul incontournable dans deux domaines très différents : l'artillerie longue portée, où les tables de tir des obus tirés sur plusieurs dizaines de kilomètres doivent intégrer une correction de Coriolis sous peine de manquer significativement leur cible ; et la modélisation climatique moderne, où les modèles numériques de circulation atmosphérique et océanique reposent entièrement sur l'intégration précise de cette force pour reproduire fidèlement la formation des cyclones, des courants marins et des grands schémas de circulation planétaire.</p>
    <p><strong>Question ouverte :</strong> comment les modèles climatiques modernes, qui doivent simuler des décennies de circulation atmosphérique, garantissent-ils que de minuscules erreurs numériques dans le calcul de la force de Coriolis ne s'accumulent pas au point de fausser des prévisions climatiques à long terme ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>tables de tir assistées par ordinateur</strong> de l'artillerie moderne calculent en temps réel la correction de Coriolis nécessaire selon la latitude, l'azimut de tir et la portée, une correction qui peut représenter plusieurs dizaines de mètres d'écart pour un tir de plusieurs dizaines de kilomètres.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Référentiel non galiléen (accéléré ou en rotation) → loi de composition des accélérations (a_a=a_r+a_e+a_c) → PFD adapté : m·a_r = ΣF_réelles + F_ie + F_ic → force centrifuge (rotation uniforme, dirigée vers l'extérieur) → force de Coriolis (couplage rotation/vitesse relative, maximale si v_r⊥ω) → application : déviation des vents et courants sur Terre
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\vec F_{ic} = -2m\\,\\vec\\omega(\\mathcal{R}/\\mathcal{R}_0)\\wedge\\vec v_r$$
      Cette force, découverte par Coriolis en 1835 pour un problème de machines tournantes, illustre parfaitement l'esprit de ce chapitre : une force purement fictive, qui n'existe que parce qu'on choisit d'observer le mouvement depuis un référentiel en rotation, peut pourtant expliquer des phénomènes aussi concrets et massifs que la rotation des cyclones à l'échelle de toute une planète.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Coriolis n'avait jamais publié son mémoire de 1835 sur les machines tournantes : la compréhension de la circulation atmosphérique terrestre aurait-elle progressé par une autre voie théorique, ou aurait-il fallu attendre une redécouverte indépendante de cette force ?</li>
        <li>Pourquoi la force centrifuge, contrairement à la force de Coriolis, ne dépend-elle jamais de la vitesse du point dans le référentiel tournant, mais uniquement de sa position ?</li>
        <li>Quelle serait la conséquence, pour la précision des tirs d'artillerie à très longue portée, d'une négligence systématique de la correction de Coriolis ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>G.-G. de Coriolis, « Sur les équations du mouvement relatif des systèmes de corps », Journal de l'École Polytechnique, 1835 — le mémoire fondateur de la force de Coriolis.</li>
        <li>J. P. Pérez, <em>Mécanique : fondements et applications</em>, Dunod — référence pédagogique française sur les référentiels non galiléens.</li>
        <li>J. R. Holton, G. J. Hakim, <em>An Introduction to Dynamic Meteorology</em>, Academic Press — sur le rôle de la force de Coriolis dans la circulation atmosphérique moderne.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais établir la loi de composition des accélérations et calculer les forces d'inertie d'entraînement et de Coriolis — clôturant ainsi la matière « Mécanique générale » de cette L2. Le prochain grand domaine de la physique L2, la thermodynamique, t'attend pour explorer un tout autre type de systèmes physiques. Comme le montre l'histoire de Coriolis : une force purement mathématique, découverte pour comprendre le comportement d'une simple machine tournante, peut, un siècle plus tard, devenir l'un des piliers silencieux de la météorologie et de la climatologie modernes.</p>
  `
};

MECAGEN_NOVA_KB[mecaGenKey('Référentiels non galiléens et forces d\'inertie')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Référentiels non galiléens et forces d'inertie ». Demande-moi la force centrifuge, la force de Coriolis, ou un indice sur un exercice.",
  rules: [
    { test:/composition.*acc[ée]l[ée]ration/i, replies:["a_absolue = a_relative + a_entraînement + a_Coriolis. C'est la base pour établir le PFD dans un référentiel non galiléen."] },
    { test:/force.*entra[îi]nement|centrifuge/i, replies:["Pour un référentiel en rotation uniforme : F_ie=mω²HM, dirigée de l'axe vers le point (vers l'extérieur) : c'est la force centrifuge fictive, qui n'existe que dans le référentiel tournant."] },
    { test:/coriolis/i, replies:["F_ic=-2m·ω∧v_r. Elle est nulle si v_r=0 ou v_r∥ω, et maximale si v_r⊥ω. Sur Terre, elle dévie les vents et courants (vers la droite dans l'hémisphère Nord)."] },
    { test:/r[ée]f[ée]rentiel galil[ée]en/i, replies:["Un référentiel galiléen est celui où le principe d'inertie (et donc le PFD sans forces d'inertie) est valide. Un référentiel accéléré ou tournant par rapport à un galiléen ne l'est pas."] },
    { test:/force.*fictive|inertie.*r[ée]elle/i, replies:["Les forces d'inertie (centrifuge, Coriolis) n'ont pas de cause physique (pas d'interaction associée) : elles ne servent qu'à compenser mathématiquement le fait que le référentiel choisi n'est pas galiléen."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : attention au facteur numérique.","Indice niveau 2 : c'est un facteur 2, pas 1 ni 4.","Indice niveau 3 : F_ic=-2m·ω∧v_r."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde le signe de F_ie=mω²HM.","Indice niveau 2 : HM pointe de l'axe H vers le point M.","Indice niveau 3 : la force centrifuge est donc dirigée à l'opposé de l'axe."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense au produit vectoriel ω∧v_r.","Indice niveau 2 : un produit vectoriel est maximal quand les deux vecteurs sont perpendiculaires, pas nul.","Indice niveau 3 : la force de Coriolis est donc maximale (pas nulle) quand v_r⊥ω."] }
  ]
};

/* fusionne le module Mécanique générale dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, MECAGEN_CHAPTERS);
Object.assign(NOVA_KB, MECAGEN_NOVA_KB);