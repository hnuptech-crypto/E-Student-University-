/* =====================================================================
   CHUNK « cinet » — registre CINET_CHAPTERS / CINET_NOVA_KB
   Matière(s) : Chimie|Cinétique chimique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   CINET_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ===================================================================================
   COURS "CINÉTIQUE CHIMIQUE" — contenu rédigé + exercices
   Source : polycopié ENS d'Oran "Cinétique Chimique — Cours et exercices corrigés"
   (Dr HAMZA REGUIG Samira, ENSO, 2021-2022), réécrit, réorganisé en 8 chapitres,
   détaillé et enrichi (méthodes de détermination de l'ordre séparées en chapitre
   autonome, catalyse hétérogène complétée, chapitre de méthodologie ajouté).
=================================================================================== */

const CINET_MATIERE = 'Cinétique chimique';
function cinKey(chapterTitle){ return `Chimie|${CINET_MATIERE}|${chapterTitle}`; }
const CINET_CHAPTERS = {};
const CINET_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
CINET_CHAPTERS[cinKey('Généralités, définitions et vitesse de réaction')] = {
  objectives: [
    "Distinguer réaction rapide et réaction lente à l'échelle macroscopique",
    "Définir la vitesse moyenne et la vitesse instantanée d'une réaction",
    "Écrire la vitesse volumique en fonction des réactifs et des produits",
    "Reconnaître les unités de la vitesse de réaction selon le mode d'expression des concentrations"
  ],
  prereqs: ["Notions de base sur la mole et la concentration"],
  bodyHtml: `
    <p>La <strong>cinétique chimique</strong> est la branche de la chimie qui étudie l'intervention du facteur « temps » dans les réactions chimiques : à quelle vitesse une réaction se déroule-t-elle, et de quels paramètres cette vitesse dépend-elle ? C'est un point de vue complémentaire à celui de la thermodynamique chimique : la thermodynamique dit si une réaction est possible et où se situe son équilibre, la cinétique dit à quelle vitesse cet équilibre sera atteint.</p>

    <h3>1. Réaction chimique et transformation</h3>
    <p>Une <strong>réaction chimique</strong> (ou transformation chimique) est la modification de l'assemblage des atomes constituant les molécules de réactifs, pour conduire à de nouvelles molécules appelées produits. La cinétique chimique étudie l'évolution temporelle des quantités de réactifs (et de produits) au sein d'un système soumis à cette transformation.</p>

    <h3>2. Réactions rapides et réactions lentes</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Durée caractéristique</th><th>Exemple</th></tr>
      <tr><td>Réaction rapide (instantanée)</td><td>quasi nulle, dès le contact des réactifs</td><td>$\\\\text{Ag}^+ + \\\\text{Cl}^- \\\\to \\\\text{AgCl}$ (précipité blanc immédiat)</td></tr>
      <tr><td>Réaction lente</td><td>de quelques secondes à quelques heures</td><td>$2\\\\text{I}^- + \\\\text{H}_2\\\\text{O}_2 + 2\\\\text{H}^+ \\\\to \\\\text{I}_2 + 2\\\\text{H}_2\\\\text{O}$ (coloration brune progressive)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Seules les réactions suffisamment lentes se prêtent à une étude cinétique classique (suivi de concentration au cours du temps). Les réactions instantanées nécessitent des techniques spéciales (relaxation, flux stoppé, spectroscopie ultra-rapide) hors du cadre de ce cours.
    </div>

    <h3>3. Vitesse moyenne d'une réaction</h3>
    <p>Soit la réaction $aA \\\\to bB$, suivie à $T=\\\\text{cste}$ dans un système fermé de volume $V$, en observant la formation du produit $B$ au cours du temps : $n(B) = f(t)$.</p>
    <div class="formula-box">$$V_m = \\\\dfrac{n_2 - n_1}{t_2 - t_1}$$</div>
    <p>La vitesse moyenne entre $t_1$ et $t_2$ est la pente de la droite (sécante) $M_1M_2$ sur la courbe $n(B)=f(t)$ : c'est la quantité de matière de produit formée entre $t_1$ et $t_2$, divisée par l'écart de temps.</p>

    <h3>4. Vitesse instantanée</h3>
    <p>La <strong>vitesse instantanée</strong> $V_i$ correspond à la limite de la vitesse moyenne lorsque l'intervalle de temps tend vers zéro — c'est-à-dire la pente de la tangente à la courbe $n(B)=f(t)$ en un instant donné :</p>
    <div class="formula-box">$$V_i = \\\\dfrac{dn_b}{dt} = \\\\lim_{t_2-t_1\\\\to 0}\\\\left(\\\\dfrac{n_2-n_1}{t_2-t_1}\\\\right)$$</div>
    <p>$V_i$ est une grandeur algébrique : <strong>positive</strong> pour un produit qui se forme, <strong>négative</strong> pour un réactif qui disparaît. C'est pour cette raison qu'on introduit un signe (−) devant la dérivée d'un réactif afin que la vitesse de réaction reste toujours positive, qu'elle soit exprimée à partir d'un réactif ou d'un produit.</p>

    <h3>5. Vitesse volumique — définition générale</h3>
    <p>Pour une réaction générale $aA + bB \\\\to cC + dD$, on définit la vitesse volumique unique de la réaction en pondérant chaque dérivée par l'inverse de son coefficient stœchiométrique :</p>
    <div class="formula-box">$$V(t) = -\\\\dfrac{1}{a}\\\\dfrac{d[A]}{dt} = -\\\\dfrac{1}{b}\\\\dfrac{d[B]}{dt} = +\\\\dfrac{1}{c}\\\\dfrac{d[C]}{dt} = +\\\\dfrac{1}{d}\\\\dfrac{d[D]}{dt}$$</div>
    <p>Cette écriture garantit qu'il n'existe qu'<strong>une seule vitesse</strong> pour la réaction, quel que soit le constituant utilisé pour la mesurer. Exemple : pour $\\\\text{I}_2 + \\\\text{H}_2 \\\\to 2\\\\text{HI}$ (coefficients tous égaux à 1 sauf HI = 2) :</p>
    <div class="formula-box">$$V(t) = -\\\\dfrac{d[\\\\text{I}_2]}{dt} = -\\\\dfrac{d[\\\\text{H}_2]}{dt} = +\\\\dfrac{1}{2}\\\\dfrac{d[\\\\text{HI}]}{dt}$$</div>

    <h3>6. Unités de la vitesse de réaction</h3>
    <p>La vitesse s'exprime en unité de concentration divisée par unité de temps : $\\\\text{mol}\\\\cdot\\\\text{L}^{-1}\\\\cdot\\\\text{s}^{-1}$ (ou en min$^{-1}$, h$^{-1}$ selon l'échelle de temps de la réaction étudiée). Pour une réaction en phase gazeuse, on utilise parfois les pressions partielles à la place des concentrations : la vitesse s'exprime alors en unité de pression par unité de temps (atm·s$^{-1}$, Torr·min$^{-1}$...).</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 130 100" width="100%">
          <line x1="18" y1="85" x2="120" y2="85" stroke="#3A4658" stroke-width="1"/>
          <line x1="18" y1="85" x2="18" y2="10" stroke="#3A4658" stroke-width="1"/>
          <path d="M20,80 Q55,25 118,15" stroke="#2DD4C4" stroke-width="2.4" fill="none"/>
          <line x1="35" y1="70" x2="95" y2="30" stroke="#F0B94D" stroke-width="1.6" stroke-dasharray="3,2"/>
          <circle cx="35" cy="70" r="2.4" fill="#F0B94D"/>
          <circle cx="95" cy="30" r="2.4" fill="#F0B94D"/>
          <text x="20" y="96" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">t</text>
          <text x="4" y="14" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">n(B)</text>
        </svg>
        <span>Vitesse moyenne (sécante) vs vitesse instantanée (tangente) sur n(B) = f(t)</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Vitesse moyenne = pente d'une sécante ; vitesse instantanée = pente de la tangente, limite quand $\\\\Delta t \\\\to 0$</li>
        <li>$V_i$ est toujours positive : (−) devant la dérivée d'un réactif, (+) devant celle d'un produit</li>
        <li>Vitesse volumique unique : $V = -\\\\dfrac{1}{a}\\\\dfrac{d[A]}{dt} = ... = +\\\\dfrac{1}{d}\\\\dfrac{d[D]}{dt}$, pondérée par les coefficients stœchiométriques</li>
        <li>Unité usuelle : $\\\\text{mol}\\\\cdot\\\\text{L}^{-1}\\\\cdot\\\\text{s}^{-1}$ (ou pression·temps$^{-1}$ en phase gazeuse)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le signe (−) devant la dérivée d'un réactif, ce qui donnerait une vitesse négative</li>
        <li>Ne pas diviser par le coefficient stœchiométrique, ce qui donne des « vitesses » différentes selon le constituant choisi</li>
        <li>Confondre vitesse moyenne (sur un intervalle) et vitesse instantanée (en un point précis, donnée par la tangente)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour la réaction $2\\\\text{N}_2\\\\text{O}_5 \\\\to 4\\\\text{NO}_2 + \\\\text{O}_2$, quelle est l'expression correcte de la vitesse en fonction de $[\\\\text{O}_2]$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin1e1" value="wrong"> $V = \\\\dfrac{d[\\\\text{O}_2]}{dt}$</label>
          <label class="option"><input type="radio" name="cin1e1" value="right"> $V = +\\\\dfrac{d[\\\\text{O}_2]}{dt}$ (coefficient 1, produit donc signe +)</label>
          <label class="option"><input type="radio" name="cin1e1" value="wrong"> $V = -\\\\dfrac{1}{2}\\\\dfrac{d[\\\\text{O}_2]}{dt}$</label>
          <label class="option"><input type="radio" name="cin1e1" value="wrong"> $V = \\\\dfrac{1}{4}\\\\dfrac{d[\\\\text{O}_2]}{dt}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin1e1','cin1fb1','Correct — O2 est un produit avec un coefficient stœchiométrique de 1, donc V = +d[O2]/dt directement, sans facteur diviseur.','Le coefficient de O2 dans l\\\\'équation équilibrée est 1, et c\\\\'est un produit : le signe est +, sans division.')">Vérifier</button>
        <div class="feedback" id="cin1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une vitesse instantanée est mathématiquement définie comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin1e2" value="wrong"> La pente d'une sécante entre deux points éloignés</label>
          <label class="option"><input type="radio" name="cin1e2" value="right"> La limite de la vitesse moyenne quand l'intervalle de temps tend vers zéro (pente de la tangente)</label>
          <label class="option"><input type="radio" name="cin1e2" value="wrong"> La concentration initiale divisée par le temps total</label>
          <label class="option"><input type="radio" name="cin1e2" value="wrong"> Une constante indépendante du temps</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin1e2','cin1fb2','Correct — c\\\\'est exactement la définition d\\\\'une dérivée : la pente de la tangente en un point.','Repense à la définition d\\\\'une dérivée en mathématiques : c\\\\'est la limite d\\\\'un taux de variation quand l\\\\'intervalle tend vers 0.')">Vérifier</button>
        <div class="feedback" id="cin1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans quelle unité s'exprime la vitesse d'une réaction en phase gazeuse suivie par les pressions partielles ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin1e3" value="wrong"> mol·L⁻¹</label>
          <label class="option"><input type="radio" name="cin1e3" value="right"> pression·temps⁻¹ (ex. atm·s⁻¹)</label>
          <label class="option"><input type="radio" name="cin1e3" value="wrong"> temps⁻¹ uniquement</label>
          <label class="option"><input type="radio" name="cin1e3" value="wrong"> sans dimension</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin1e3','cin1fb3','Correct — quand on suit une réaction gazeuse par sa pression partielle, la vitesse est une variation de pression par unité de temps.','La vitesse est toujours une grandeur divisée par le temps ; ici la grandeur suivie est une pression, pas une concentration.')">Vérifier</button>
        <div class="feedback" id="cin1fb3"></div>
      </div>
    </div>
  `
};

CINET_NOVA_KB[cinKey('Généralités, définitions et vitesse de réaction')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Généralités, définitions et vitesse de réaction ». Demande-moi la différence entre vitesse moyenne et instantanée, comment écrire la vitesse volumique, ou un indice sur un exercice.",
  rules: [
    { test:/vitesse moyenne/i, replies:["La vitesse moyenne Vm = (n2-n1)/(t2-t1) est la pente d'une sécante entre deux instants — une valeur approchée sur un intervalle de temps donné."] },
    { test:/vitesse instantan[ée]e/i, replies:["La vitesse instantanée est la limite de la vitesse moyenne quand l'intervalle de temps tend vers 0 : c'est la pente de la tangente à la courbe n(B)=f(t), donc une dérivée dn/dt."] },
    { test:/vitesse volumique|coefficient st[oœ]chiom[ée]trique/i, replies:["Pour aA+bB→cC+dD, la vitesse unique s'écrit V = -(1/a)d[A]/dt = -(1/b)d[B]/dt = +(1/c)d[C]/dt = +(1/d)d[D]/dt : on pondère toujours par l'inverse du coefficient stœchiométrique."] },
    { test:/signe|n[ée]gative|positive/i, replies:["La vitesse de réaction est toujours positive par convention : signe (−) devant la dérivée d'un réactif (qui disparaît, donc d[réactif]/dt<0), signe (+) devant celle d'un produit."] },
    { test:/r[ée]action rapide|r[ée]action lente/i, replies:["Une réaction est dite rapide (instantanée) si elle semble achevée dès le contact des réactifs (ex. précipitation AgCl) ; lente si elle dure de quelques secondes à quelques heures (ex. oxydation lente de I⁻ par H2O2)."] },
    { test:/unit[ée]/i, replies:["L'unité usuelle de la vitesse est mol·L⁻¹·s⁻¹ (ou une autre unité de temps selon l'échelle de la réaction), et pression·temps⁻¹ si on suit des pressions partielles en phase gazeuse."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : regarde le coefficient stœchiométrique de O2 dans l'équation équilibrée.","Indice niveau 2 : ce coefficient vaut 1.","Indice niveau 3 : O2 est un produit avec coefficient 1, donc V = +d[O2]/dt sans division."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : repense à la définition mathématique d'une dérivée.","Indice niveau 2 : c'est une limite d'un taux de variation.","Indice niveau 3 : c'est la pente de la tangente, quand l'intervalle de temps tend vers zéro."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : qu'est-ce qui remplace la concentration quand on est en phase gazeuse ?","Indice niveau 2 : la pression partielle.","Indice niveau 3 : la vitesse est donc en pression divisée par temps, par exemple atm·s⁻¹."] }
  ]
};

/* =========================== CHAPITRE 2 =========================== */
CINET_CHAPTERS[cinKey('Réactions simples d\'ordre 0, 1 et 2')] = {
  objectives: [
    "Établir la loi de vitesse et la loi intégrée pour un ordre 0, 1 ou 2",
    "Tracer et reconnaître le graphique linéarisant chaque ordre",
    "Définir et calculer le temps de demi-réaction t½ pour chaque ordre",
    "Utiliser le temps de réaction général tx (t¼, t¾, t₇⁄₈...)"
  ],
  prereqs: ["Généralités, définitions et vitesse de réaction"],
  bodyHtml: `
    <p>Les réactions simples irréversibles suivent des lois de vitesse du premier, du second, ou éventuellement d'ordre zéro. Leur étude est fondamentale car elle conduit à des lois de variation des concentrations simples et facilement exploitables graphiquement.</p>

    <h3>1. La loi de vitesse</h3>
    <p>Pour une réaction $aA + bB \\\\to \\\\text{produits}$, la <strong>loi de vitesse</strong> relie la vitesse aux concentrations des espèces réactives :</p>
    <div class="formula-box">$$V = k\\\\,[A]^{\\\\alpha}\\\\,[B]^{\\\\beta}$$</div>
    <p>où $k$ est la <strong>constante de vitesse</strong> (dépend de la température, pas des concentrations), $\\\\alpha$ est l'<strong>ordre partiel</strong> par rapport à $A$, $\\\\beta$ l'ordre partiel par rapport à $B$, et $\\\\alpha+\\\\beta$ l'<strong>ordre global</strong> de la réaction. Contrairement aux coefficients stœchiométriques, les ordres partiels sont des grandeurs <strong>expérimentales</strong> : rien n'impose a priori $\\\\alpha = a$.</p>

    <h3>2. Réaction d'ordre zéro ($\\\\alpha = 0$)</h3>
    <p>La vitesse est indépendante de la concentration du réactif : $V = -\\\\dfrac{d[A]}{dt} = k$. En séparant les variables et en intégrant entre $t_0$ et $t$ :</p>
    <div class="formula-box">$$[A]_t = [A]_0 - kt$$</div>
    <p>$[A]_t$ en fonction de $t$ est une <strong>droite</strong> de pente $-k$ et d'ordonnée à l'origine $[A]_0$. L'unité de $k$ est celle d'une vitesse : $\\\\text{mol}\\\\cdot\\\\text{L}^{-1}\\\\cdot\\\\text{s}^{-1}$.</p>
    <p><strong>Temps de demi-réaction</strong> ($[A]=[A]_0/2$) : $\\\\;t_{1/2} = \\\\dfrac{[A]_0}{2k}$ — <em>proportionnel</em> à $[A]_0$.</p>

    <h3>3. Réaction d'ordre 1 ($\\\\alpha = 1$)</h3>
    <p>La vitesse est proportionnelle à la concentration du réactif : $V = -\\\\dfrac{d[A]}{dt} = k[A]$. En séparant les variables ($\\\\dfrac{d[A]}{[A]} = -k\\\\,dt$) puis en intégrant :</p>
    <div class="formula-box">$$\\\\ln[A]_t = \\\\ln[A]_0 - kt$$</div>
    <p>$\\\\ln[A]_t$ en fonction de $t$ est une droite de pente $-k$ et d'ordonnée à l'origine $\\\\ln[A]_0$. L'unité de $k$ est $\\\\text{temps}^{-1}$ (s$^{-1}$, min$^{-1}$...).</p>
    <p><strong>Temps de demi-réaction</strong> : $\\\\;t_{1/2} = \\\\dfrac{\\\\ln 2}{k}$ — <em>indépendant</em> de $[A]_0$. C'est la signature la plus utilisée pour reconnaître un ordre 1 expérimentalement.</p>
    <p><strong>Temps de réaction général $t_x$</strong> : le temps nécessaire pour qu'une fraction $x$ du réactif ait réagi. Exemple pour $t_{1/4}$ (il reste $3/4$ du réactif) :</p>
    <div class="formula-box">$$t_{1/4} = \\\\dfrac{1}{k}\\\\ln\\\\dfrac{[A]_0}{\\\\tfrac34[A]_0} = \\\\dfrac{1}{k}\\\\ln\\\\dfrac{4}{3}$$</div>

    <h3>4. Réaction d'ordre 2 ($\\\\alpha = 2$)</h3>
    <p>La vitesse est proportionnelle au carré de la concentration : $V = -\\\\dfrac{d[A]}{dt} = k[A]^2$. En intégrant $-\\\\int \\\\dfrac{d[A]}{[A]^2} = k\\\\int dt$ :</p>
    <div class="formula-box">$$\\\\dfrac{1}{[A]_t} = \\\\dfrac{1}{[A]_0} + kt$$</div>
    <p>$\\\\dfrac{1}{[A]_t}$ en fonction de $t$ est une droite de pente $+k$ et d'ordonnée à l'origine $\\\\dfrac{1}{[A]_0}$. L'unité de $k$ est $\\\\text{mol}^{-1}\\\\cdot\\\\text{L}\\\\cdot\\\\text{temps}^{-1}$.</p>
    <p><strong>Temps de demi-réaction</strong> : $\\\\;t_{1/2} = \\\\dfrac{1}{k[A]_0}$ — <em>inversement proportionnel</em> à $[A]_0$.</p>

    <h3>5. Tableau récapitulatif</h3>
    <table class="mini-table">
      <tr><th>Ordre</th><th>Loi de vitesse</th><th>Loi intégrée</th><th>Tracé linéaire</th><th>Unité de k</th><th>t½</th></tr>
      <tr><td>0</td><td>$V=k$</td><td>$[A]_t=[A]_0-kt$</td><td>$[A]$ vs $t$</td><td>$\\\\text{mol}\\\\cdot\\\\text{L}^{-1}\\\\cdot\\\\text{s}^{-1}$</td><td>$\\\\dfrac{[A]_0}{2k}$</td></tr>
      <tr><td>1</td><td>$V=k[A]$</td><td>$\\\\ln[A]_t=\\\\ln[A]_0-kt$</td><td>$\\\\ln[A]$ vs $t$</td><td>$\\\\text{s}^{-1}$</td><td>$\\\\dfrac{\\\\ln 2}{k}$</td></tr>
      <tr><td>2</td><td>$V=k[A]^2$</td><td>$\\\\dfrac{1}{[A]_t}=\\\\dfrac{1}{[A]_0}+kt$</td><td>$\\\\dfrac1{[A]}$ vs $t$</td><td>$\\\\text{mol}^{-1}\\\\cdot\\\\text{L}\\\\cdot\\\\text{s}^{-1}$</td><td>$\\\\dfrac{1}{k[A]_0}$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le comportement du temps de demi-réaction face à $[A]_0$ est un excellent diagnostic rapide : $t_{1/2}$ proportionnel à $[A]_0$ → ordre 0 ; indépendant de $[A]_0$ → ordre 1 ; inversement proportionnel à $[A]_0$ → ordre 2.
    </div>

    <h3>6. Loi de vitesse en fonction des pressions partielles</h3>
    <p>Pour une réaction gazeuse $A_{(g)} \\\\to B_{(g)} + C_{(g)}$, on peut remplacer les concentrations par les pressions partielles ($P_A \\\\propto [A]$ à température fixée, d'après la loi des gaz parfaits) :</p>
    <table class="mini-table">
      <tr><th>Ordre</th><th>Loi de vitesse</th><th>Loi intégrée</th><th>Unité de k</th></tr>
      <tr><td>0</td><td>$V=-\\\\dfrac{dP_A}{dt}=k$</td><td>$(P_A)_t=(P_A)_0-kt$</td><td>pression·temps$^{-1}$</td></tr>
      <tr><td>1</td><td>$V=kP_A$</td><td>$\\\\ln(P_A)_t=\\\\ln(P_A)_0-kt$</td><td>temps$^{-1}$</td></tr>
      <tr><td>2</td><td>$V=kP_A^2$</td><td>$\\\\dfrac{1}{(P_A)_t}=\\\\dfrac{1}{(P_A)_0}+kt$</td><td>pression$^{-1}$·temps$^{-1}$</td></tr>
    </table>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Ordre 0 : $[A]$ linéaire en $t$, $t_{1/2}$ proportionnel à $[A]_0$</li>
        <li>Ordre 1 : $\\\\ln[A]$ linéaire en $t$, $t_{1/2}=\\\\ln2/k$ indépendant de $[A]_0$</li>
        <li>Ordre 2 : $1/[A]$ linéaire en $t$, $t_{1/2}$ inversement proportionnel à $[A]_0$</li>
        <li>L'unité de $k$ change avec l'ordre : c'est souvent le moyen le plus rapide d'identifier un ordre par simple analyse dimensionnelle</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre l'ordre partiel $\\\\alpha$ (expérimental) avec le coefficient stœchiométrique $a$ (ils ne coïncident que pour une réaction élémentaire)</li>
        <li>Oublier que $t_{1/2}$ d'ordre 1 ne dépend PAS de $[A]_0$ — c'est une propriété unique à cet ordre</li>
        <li>Utiliser la loi intégrée d'ordre 1 (logarithme) pour tracer une droite alors que les données suivent en réalité un ordre 2</li>
      </ul>
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple résolu</span>
      <p>La décomposition de H₂O₂ catalysée est d'ordre 1, avec $k=2{,}4\\\\times10^{-4}\\\\ \\\\text{s}^{-1}$. Calculer $t_{3/4}$ (temps pour que $3/4$ du réactif ait disparu, donc $[A]_t=\\\\frac14[A]_0$).</p>
      <p>$t_{3/4} = \\\\dfrac{1}{k}\\\\ln\\\\dfrac{[A]_0}{[A]_t} = \\\\dfrac{1}{k}\\\\ln 4 = \\\\dfrac{\\\\ln 4}{2{,}4\\\\times10^{-4}} \\\\approx 5750\\\\ \\\\text{s}$.</p>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une réaction d'ordre 2 a pour temps de demi-réaction $t_{1/2}=1\\\\text{h}$ avec $[A]_0=1\\\\ \\\\text{mol/L}$. Si on double $[A]_0$ (à $2\\\\ \\\\text{mol/L}$), le nouveau $t_{1/2}$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin2e1" value="wrong"> 2h</label>
          <label class="option"><input type="radio" name="cin2e1" value="right"> 0,5h</label>
          <label class="option"><input type="radio" name="cin2e1" value="wrong"> 1h (inchangé)</label>
          <label class="option"><input type="radio" name="cin2e1" value="wrong"> 4h</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin2e1','cin2fb1','Correct — pour un ordre 2, t1/2 = 1/(k[A]0) est inversement proportionnel à [A]0 : doubler [A]0 divise t1/2 par 2.','Utilise t1/2 = 1/(k[A]0) : c\\\\'est une relation inversement proportionnelle à [A]0 pour un ordre 2.')">Vérifier</button>
        <div class="feedback" id="cin2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">On trace $\\\\ln[A]$ en fonction du temps et on obtient une droite. Quel est l'ordre de la réaction ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin2e2" value="wrong"> Ordre 0</label>
          <label class="option"><input type="radio" name="cin2e2" value="right"> Ordre 1</label>
          <label class="option"><input type="radio" name="cin2e2" value="wrong"> Ordre 2</label>
          <label class="option"><input type="radio" name="cin2e2" value="wrong"> On ne peut pas savoir</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin2e2','cin2fb2','Correct — c\\\\'est justement le tracé caractéristique de l\\\\'ordre 1 : ln[A]t = ln[A]0 − kt est une droite de pente −k.','Repense au tableau récapitulatif : quel ordre linéarise ln[A] en fonction du temps ?')">Vérifier</button>
        <div class="feedback" id="cin2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La constante de vitesse d'une réaction a pour unité $\\\\text{mol}^{-1}\\\\cdot\\\\text{L}\\\\cdot\\\\text{s}^{-1}$. Quel est l'ordre de cette réaction ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin2e3" value="wrong"> Ordre 0</label>
          <label class="option"><input type="radio" name="cin2e3" value="wrong"> Ordre 1</label>
          <label class="option"><input type="radio" name="cin2e3" value="right"> Ordre 2</label>
          <label class="option"><input type="radio" name="cin2e3" value="wrong"> Impossible à déterminer</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin2e3','cin2fb3','Correct — mol⁻¹·L·s⁻¹ est précisément l\\\\'unité de k pour un ordre 2, d\\\\'après le tableau récapitulatif.','Compare cette unité avec les trois lignes du tableau récapitulatif : à quel ordre correspond mol⁻¹·L·s⁻¹ ?')">Vérifier</button>
        <div class="feedback" id="cin2fb3"></div>
      </div>
    </div>
  `
};

CINET_NOVA_KB[cinKey('Réactions simples d\'ordre 0, 1 et 2')] = {
  intro: "Salut, c'est Nova ! On est sur « Réactions simples d'ordre 0, 1 et 2 ». Demande-moi une loi de vitesse intégrée, une formule de t½, ou un indice sur un exercice.",
  rules: [
    { test:/ordre\s*0/i, replies:["Ordre 0 : V=k (indépendant de [A]). Loi intégrée [A]t=[A]0−kt (droite [A] vs t). t1/2=[A]0/(2k), proportionnel à [A]0."] },
    { test:/ordre\s*1/i, replies:["Ordre 1 : V=k[A]. Loi intégrée ln[A]t=ln[A]0−kt (droite ln[A] vs t). t1/2=ln2/k, indépendant de [A]0 — c'est LA signature de l'ordre 1."] },
    { test:/ordre\s*2/i, replies:["Ordre 2 : V=k[A]². Loi intégrée 1/[A]t=1/[A]0+kt (droite 1/[A] vs t). t1/2=1/(k[A]0), inversement proportionnel à [A]0."] },
    { test:/temps de demi|t1\/2|demi-r[ée]action/i, replies:["Le comportement de t1/2 face à [A]0 identifie l'ordre : proportionnel → ordre 0 ; indépendant → ordre 1 ; inversement proportionnel → ordre 2."] },
    { test:/unit[ée].*k|k.*unit[ée]/i, replies:["L'unité de k dépend de l'ordre : mol·L⁻¹·s⁻¹ (ordre 0), s⁻¹ (ordre 1), mol⁻¹·L·s⁻¹ (ordre 2). C'est un moyen rapide d'identifier l'ordre sans calcul."] },
    { test:/ordre partiel|coefficient st[oœ]chiom[ée]trique/i, replies:["L'ordre partiel α est une grandeur EXPÉRIMENTALE, à ne pas confondre avec le coefficient stœchiométrique a de l'équation bilan — ils ne coïncident que pour une réaction élémentaire (voir le chapitre sur les réactions complexes)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise la formule de t1/2 pour un ordre 2.","Indice niveau 2 : t1/2=1/(k[A]0), une relation inverse.","Indice niveau 3 : doubler [A]0 divise t1/2 par 2, donc 0,5h."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : quel tracé est caractéristique de quel ordre ?","Indice niveau 2 : consulte le tableau récapitulatif.","Indice niveau 3 : ln[A] vs t linéaire correspond à l'ordre 1."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare l'unité donnée avec les trois lignes du tableau.","Indice niveau 2 : mol⁻¹·L apparaît uniquement pour un seul ordre.","Indice niveau 3 : c'est l'ordre 2."] }
  ]
};

/* =========================== CHAPITRE 3 =========================== */
CINET_CHAPTERS[cinKey('Réactions d\'ordre n et méthodes de détermination de l\'ordre')] = {
  objectives: [
    "Généraliser la loi de vitesse intégrée à un ordre n quelconque",
    "Appliquer la méthode graphique de détermination de l'ordre",
    "Appliquer la méthode du temps de demi-vie",
    "Appliquer la méthode des vitesses initiales pour déterminer des ordres partiels"
  ],
  prereqs: ["Réactions simples d\'ordre 0, 1 et 2"],
  bodyHtml: `
    <p>Au-delà des ordres 0, 1 et 2, certaines réactions suivent une cinétique d'ordre $n$ quelconque (souvent non entier). Ce chapitre généralise la loi intégrée puis passe en revue les méthodes expérimentales permettant de déterminer l'ordre d'une réaction à partir de données de laboratoire.</p>

    <h3>1. Réaction d'ordre n ($n > 2$)</h3>
    <p>Soit $A \\\\to B + C$ avec $V = -\\\\dfrac{d[A]}{dt} = k[A]^n$. En intégrant $-\\\\displaystyle\\\\int_{[A]_0}^{[A]}\\\\dfrac{d[A]}{[A]^n} = k\\\\displaystyle\\\\int_{t_0}^t dt$ :</p>
    <div class="formula-box">$$\\\\dfrac{1}{[A]_t^{\\\\,n-1}} = \\\\dfrac{1}{[A]_0^{\\\\,n-1}} + (n-1)\\\\,k\\\\,t$$</div>
    <p>Le tracé de $\\\\dfrac{1}{[A]_t^{\\\\,n-1}}$ en fonction de $t$ donne une droite de pente $(n-1)k$ et d'ordonnée à l'origine $\\\\dfrac{1}{[A]_0^{\\\\,n-1}}$. Le temps de demi-réaction vaut :</p>
    <div class="formula-box">$$t_{1/2} = \\\\dfrac{2^{\\\\,n-1} - 1}{(n-1)\\\\,k\\\\,[A]_0^{\\\\,n-1}}$$</div>
    <p>On retrouve bien les cas particuliers $n=0,1,2$ étudiés au chapitre précédent (pour $n=1$, la formule générale n'est pas directement applicable — l'expression en $\\\\ln$ est un cas limite obtenu séparément).</p>

    <h3>2. Méthode graphique</h3>
    <p>C'est la méthode la plus directe lorsqu'on dispose d'une série de couples $(t, [A])$ :</p>
    <ol style="margin-left:1.2em; color:var(--ink-soft);">
      <li>Tracer $[A]$ en fonction de $t$. Si on obtient une <strong>droite</strong>, la réaction est d'<strong>ordre 0</strong>.</li>
      <li>Sinon, tracer $\\\\ln[A]$ en fonction de $t$. Si on obtient une droite, la réaction est d'<strong>ordre 1</strong>.</li>
      <li>Sinon, tracer $1/[A]$ en fonction de $t$. Si on obtient une droite, la réaction est d'<strong>ordre 2</strong>.</li>
    </ol>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      En pratique, on calcule la constante $k$ à partir de plusieurs couples de données pour chaque hypothèse d'ordre : l'ordre correct est celui pour lequel $k$ reste (à peu près) constant d'un couple de points à l'autre.
    </div>

    <h3>3. Méthode du temps de demi-vie</h3>
    <p>On mesure $t_{1/2}$ pour plusieurs concentrations initiales $[A]_0$ différentes, et on observe comment $t_{1/2}$ varie avec $[A]_0$ :</p>
    <table class="mini-table">
      <tr><th>Relation observée</th><th>Ordre</th></tr>
      <tr><td>$t_{1/2}$ proportionnel à $[A]_0$</td><td>0</td></tr>
      <tr><td>$t_{1/2}$ indépendant de $[A]_0$</td><td>1</td></tr>
      <tr><td>$t_{1/2}$ inversement proportionnel à $[A]_0$</td><td>2</td></tr>
    </table>
    <p>Plus généralement, pour un ordre $n$ quelconque, $t_{1/2} \\\\propto [A]_0^{\\\\,1-n}$ : en mesurant $t_{1/2}$ pour deux valeurs de $[A]_0$, le rapport des $t_{1/2}$ permet de retrouver $n$ par un simple logarithme.</p>

    <h3>4. Méthode des vitesses initiales</h3>
    <p>Cette méthode, très utilisée en pratique, permet de déterminer les <strong>ordres partiels</strong> de chaque réactif dans une réaction multi-réactifs $V_0 = k[R_1]_0^{\\\\alpha_1}[R_2]_0^{\\\\alpha_2}$ :</p>
    <ol style="margin-left:1.2em; color:var(--ink-soft);">
      <li>On mesure la vitesse initiale $V_0$ pour différentes valeurs de $[R_1]_0$, en maintenant $[R_2]_0$ constant.</li>
      <li>On recommence en faisant varier $[R_2]_0$ et en maintenant $[R_1]_0$ constant.</li>
      <li>Le rapport de deux vitesses initiales, à une seule concentration modifiée, isole l'ordre partiel correspondant :</li>
    </ol>
    <div class="formula-box">$$\\\\dfrac{V_i}{V_i'} = \\\\left(\\\\dfrac{C}{C'}\\\\right)^{\\\\alpha}$$</div>
    <p>d'où $\\\\alpha = \\\\dfrac{\\\\ln(V_i/V_i')}{\\\\ln(C/C')}$. Cette méthode évite d'avoir à suivre toute la cinétique : une seule mesure de vitesse en tout début de réaction (avant que les concentrations n'aient significativement varié) suffit par expérience.</p>

    <h3>5. Méthode d'isolement d'Ostwald (dégénérescence de l'ordre)</h3>
    <p>Lorsque plusieurs réactifs interviennent, on peut simplifier l'étude en mettant tous les réactifs sauf un en <strong>large excès</strong>. Leurs concentrations restent alors quasi constantes au cours de la réaction et peuvent être regroupées avec $k$ dans une <strong>constante apparente</strong> $k_{app}$ :</p>
    <div class="formula-box">$$V = k[A]^{\\\\alpha}[B]^{\\\\beta} \\\\quad \\\\xrightarrow[{[B]\\\\gg[A]}]{} \\\\quad V \\\\approx k_{app}[A]^{\\\\alpha}, \\\\quad k_{app} = k[B]_0^{\\\\beta}$$</div>
    <p>On dit que l'ordre est <strong>dégénéré</strong> : la réaction se comporte comme une réaction d'ordre $\\\\alpha$ (ordre apparent) par rapport à $A$ seul. En répétant l'expérience en isolant successivement chaque réactif, on retrouve chaque ordre partiel.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Ordre n général : $\\\\dfrac{1}{[A]_t^{n-1}} = \\\\dfrac{1}{[A]_0^{n-1}} + (n-1)kt$, avec $t_{1/2} = \\\\dfrac{2^{n-1}-1}{(n-1)k[A]_0^{n-1}}$</li>
        <li>Méthode graphique : on teste successivement $[A]$, $\\\\ln[A]$, $1/[A]$ en fonction de $t$ jusqu'à obtenir une droite</li>
        <li>Méthode du temps de demi-vie : la façon dont $t_{1/2}$ varie avec $[A]_0$ donne directement l'ordre</li>
        <li>Méthode des vitesses initiales : $\\\\alpha = \\\\ln(V_i/V_i')/\\\\ln(C/C')$, en ne faisant varier qu'un seul réactif à la fois</li>
        <li>Méthode d'Ostwald (dégénérescence) : mettre tous les réactifs sauf un en large excès pour isoler son ordre partiel</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Comparer des vitesses initiales issues d'expériences où DEUX concentrations ont changé à la fois — le rapport ne donne alors plus un seul ordre partiel</li>
        <li>Oublier de vérifier que $k$ reste bien constant après avoir choisi un ordre par méthode graphique — une droite approximative peut tromper</li>
        <li>Confondre l'ordre apparent (obtenu par dégénérescence) et l'ordre réel par rapport au réactif isolé — ils coïncident, mais $k_{app}$ contient l'information sur les autres réactifs</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Deux expériences donnent $V_{01}=0{,}9\\\\times10^{-7}$ pour $[\\\\text{OH}^-]_{01}=1\\\\times10^{-3}$ et $V_{02}=4{,}5\\\\times10^{-7}$ pour $[\\\\text{OH}^-]_{02}=5\\\\times10^{-3}$ (autre réactif inchangé). L'ordre partiel par rapport à OH⁻ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin3e1" value="wrong"> 0</label>
          <label class="option"><input type="radio" name="cin3e1" value="right"> 1</label>
          <label class="option"><input type="radio" name="cin3e1" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="cin3e1" value="wrong"> 0,5</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin3e1','cin3fb1','Correct — le rapport des vitesses (5) est égal au rapport des concentrations (5), donc l\\\\'exposant vaut 1.','Calcule V02/V01 et C02/C01 séparément : si les deux rapports sont égaux, l\\\\'exposant β vaut 1.')">Vérifier</button>
        <div class="feedback" id="cin3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour identifier l'ordre par la méthode du temps de demi-vie, on observe que $t_{1/2}$ double quand $[A]_0$ est divisée par deux. Quel est l'ordre de la réaction ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin3e2" value="wrong"> Ordre 0</label>
          <label class="option"><input type="radio" name="cin3e2" value="wrong"> Ordre 1</label>
          <label class="option"><input type="radio" name="cin3e2" value="right"> Ordre 2</label>
          <label class="option"><input type="radio" name="cin3e2" value="wrong"> Impossible à déterminer</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin3e2','cin3fb2','Correct — t1/2 double quand [A]0 est divisée par 2 : c\\\\'est bien une relation inversement proportionnelle, caractéristique de l\\\\'ordre 2.','Si [A]0 diminue et que t1/2 augmente dans la même proportion, la relation est inversement proportionnelle : quel ordre cela caractérise-t-il ?')">Vérifier</button>
        <div class="feedback" id="cin3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans la méthode d'isolement d'Ostwald, on met un réactif B en large excès par rapport à A. Que devient sa contribution à la vitesse ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin3e3" value="wrong"> Elle disparaît complètement de l'expression de la vitesse</label>
          <label class="option"><input type="radio" name="cin3e3" value="right"> Elle est absorbée dans une constante apparente k_app, quasi constante au cours de la réaction</label>
          <label class="option"><input type="radio" name="cin3e3" value="wrong"> Elle devient dominante et impose seule l'ordre global</label>
          <label class="option"><input type="radio" name="cin3e3" value="wrong"> Elle rend la réaction non mesurable</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin3e3','cin3fb3','Correct — [B] varie très peu en valeur relative si B est en large excès, donc k[B]^β reste quasi constant : on le regroupe en k_app.','Si B est en large excès, sa concentration varie très peu au cours de la réaction — elle peut donc être regroupée avec k.')">Vérifier</button>
        <div class="feedback" id="cin3fb3"></div>
      </div>
    </div>
  `
};

CINET_NOVA_KB[cinKey('Réactions d\'ordre n et méthodes de détermination de l\'ordre')] = {
  intro: "Salut, c'est Nova ! On est sur « Réactions d'ordre n et méthodes de détermination de l'ordre ». Demande-moi la méthode des vitesses initiales, la méthode graphique, ou un indice sur un exercice.",
  rules: [
    { test:/ordre\s*n\b/i, replies:["Pour un ordre n quelconque : 1/[A]t^(n-1) = 1/[A]0^(n-1) + (n-1)kt, avec t1/2 = (2^(n-1)-1)/((n-1)k[A]0^(n-1))."] },
    { test:/m[ée]thode graphique/i, replies:["Méthode graphique : on teste dans l'ordre [A] vs t (ordre 0), puis ln[A] vs t (ordre 1), puis 1/[A] vs t (ordre 2) — celui qui donne une droite indique l'ordre."] },
    { test:/vitesses? initiales?/i, replies:["La méthode des vitesses initiales isole un ordre partiel en ne faisant varier qu'une seule concentration entre deux expériences : α = ln(Vi/Vi')/ln(C/C')."] },
    { test:/ostwald|isolement|d[ée]g[ée]n[ée]r/i, replies:["La méthode d'Ostwald met tous les réactifs sauf un en large excès : leur concentration reste quasi constante et se regroupe avec k dans une constante apparente k_app — on parle d'ordre dégénéré."] },
    { test:/temps de demi-vie|t1\/2.*ordre/i, replies:["En mesurant t1/2 pour plusieurs [A]0, la façon dont t1/2 varie donne l'ordre : proportionnel → 0, indépendant → 1, inversement proportionnel → 2, et plus généralement t1/2 ∝ [A]0^(1-n)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : calcule le rapport des vitesses et le rapport des concentrations séparément.","Indice niveau 2 : les deux rapports valent 5.","Indice niveau 3 : 5=5^α donc α=1."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare comment t1/2 varie avec [A]0.","Indice niveau 2 : ils varient en sens inverse, dans la même proportion.","Indice niveau 3 : c'est la signature de l'ordre 2."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : que se passe-t-il pour une concentration en large excès au cours du temps ?","Indice niveau 2 : elle varie très peu, en proportion.","Indice niveau 3 : elle peut donc être regroupée avec k dans une constante apparente."] }
  ]
};

/* =========================== CHAPITRE 4 =========================== */
CINET_CHAPTERS[cinKey('Cinétique formelle des réactions composées')] = {
  objectives: [
    "Distinguer réactions équilibrées, parallèles et successives",
    "Établir la vitesse globale d'une réaction opposée à l'équilibre",
    "Établir la vitesse globale de réactions parallèles (jumelles et compétitives)",
    "Établir les lois [A](t), [B](t), [C](t) pour des réactions successives d'ordre 1"
  ],
  prereqs: ["Réactions d\'ordre n et méthodes de détermination de l\'ordre"],
  bodyHtml: `
    <p>Une réaction <strong>composée</strong> est la résultante de plusieurs réactions simples se produisant simultanément dans le milieu réactionnel. On distingue trois grandes catégories : les réactions <strong>équilibrées</strong> (ou opposées), les réactions <strong>parallèles</strong>, et les réactions <strong>successives</strong> (ou consécutives).</p>

    <h3>1. Réactions équilibrées (opposées)</h3>
    <p>Une réaction équilibrée est une réaction où, au même moment et au même endroit, les réactifs se transforment en produits ET les produits se transforment en réactifs : $A \\\\underset{k_{-1}}{\\\\overset{k_1}{\\\\rightleftharpoons}} B$.</p>
    <table class="mini-table">
      <tr><th></th><th>$A$</th><th>$B$</th></tr>
      <tr><td>$t=0$</td><td>$a$</td><td>$0$</td></tr>
      <tr><td>$t$</td><td>$a-x$</td><td>$x$</td></tr>
      <tr><td>$t_{eq}$</td><td>$a-x_{eq}$</td><td>$x_{eq}$</td></tr>
    </table>
    <p>Pour deux réactions opposées d'ordre 1 (ex. isomérisation du cyclopropane en propène) : $V = k_1(a-x) - k_{-1}(x)$. À l'équilibre, $V=0$, ce qui permet d'exprimer $k_{-1}$ en fonction de $k_1$ et de la composition à l'équilibre :</p>
    <div class="formula-box">$$k_{-1} = \\\\dfrac{k_1(a-x_{eq})}{x_{eq}} \\\\quad\\\\Rightarrow\\\\quad V = \\\\dfrac{k_1}{x_{eq}}\\\\big[(a-x)x_{eq} - (a-x_{eq})x\\\\big]$$</div>
    <p>De la même façon, la <strong>constante d'équilibre</strong> globale d'une réaction opposée est toujours le rapport des constantes de vitesse directe et inverse :</p>
    <div class="formula-box">$$K = \\\\dfrac{k_1}{k_{-1}}$$</div>
    <p>Ce résultat, retrouvé pour des ordres 1/1, 2/2 ou 2/1, est très général : à l'équilibre chimique, les vitesses directe et inverse s'égalisent, ce qui relie directement la thermodynamique (constante d'équilibre K) et la cinétique (constantes de vitesse $k_1$, $k_{-1}$).</p>

    <h3>2. Réactions parallèles</h3>
    <h4 style="margin-top:1em; color:var(--ink); font-size:1rem; font-weight:600;">a) Réactions jumelles</h4>
    <p>Deux (ou plus) réactions partagent le(s) même(s) réactif(s) mais forment des produits différents : $A \\\\to B$ et $A \\\\to C$ simultanément (ex. déshydratation/déshydrogénation de l'éthanol). Pour $A+B\\\\to C$ (constante $k$) et $A+B \\\\to D$ (constante $k'$) partant des mêmes réactifs, si les ordres partiels coïncident ($\\\\alpha=\\\\alpha'$, $\\\\beta=\\\\beta'$) :</p>
    <div class="formula-box">$$V_g = V_1+V_2 = (k+k')\\\\,(a-x)^{\\\\alpha}(b-x)^{\\\\beta}$$</div>
    <p>La réaction globale se comporte donc comme une réaction simple, mais avec une constante de vitesse apparente $k+k'$ — somme des constantes des voies parallèles.</p>
    <h4 style="margin-top:1em; color:var(--ink); font-size:1rem; font-weight:600;">b) Réactions compétitives (concurrentes)</h4>
    <p>Ici, certains réactifs ne sont pas communs aux deux réactions (ex. estérification de l'éthanol par l'acide acétique, en compétition avec l'estérification par l'anhydride acétique). Chaque voie a sa propre vitesse, sans simplification systématique — l'étude nécessite de suivre chaque produit séparément ou d'introduire un rapport de sélectivité $k/k'$.</p>

    <h3>3. Réactions successives (consécutives)</h3>
    <p>Les réactifs se transforment en une espèce intermédiaire, qui devient à son tour un réactif pour former le produit final : $A \\\\xrightarrow{k_1} B \\\\xrightarrow{k_2} C$. En supposant les deux étapes d'ordre 1, avec $[A]_0$, $[B]_0=[C]_0=0$ :</p>
    <div class="formula-box">$$-\\\\dfrac{d[A]}{dt}=k_1[A] \\\\qquad \\\\dfrac{d[B]}{dt}=k_1[A]-k_2[B] \\\\qquad \\\\dfrac{d[C]}{dt}=k_2[B]$$</div>
    <p>L'intégration successive donne les trois lois horaires :</p>
    <div class="formula-box">$$[A]=[A]_0\\\\,e^{-k_1t}$$
    $$[B]=\\\\dfrac{k_1[A]_0}{k_2-k_1}\\\\left(e^{-k_1t}-e^{-k_2t}\\\\right)$$
    $$[C]=[A]_0\\\\left(1+\\\\dfrac{k_1e^{-k_2t}-k_2e^{-k_1t}}{k_2-k_1}\\\\right)$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La concentration de l'intermédiaire $[B]$ croît puis décroît : elle passe par un <strong>maximum</strong> lorsque $\\\\dfrac{d[B]}{dt}=0$, c'est-à-dire lorsque sa vitesse de formation ($k_1[A]$) égale sa vitesse de disparition ($k_2[B]$). Ce comportement typique (courbe en cloche pour l'intermédiaire, sigmoïde pour le produit final) est la signature graphique d'un mécanisme successif — on la retrouve par exemple dans la chloration séquentielle du benzène.
    </div>
    <p>Exemple industriel classique : la <strong>chloration du benzène</strong>, $\\\\text{C}_6\\\\text{H}_6 \\\\xrightarrow{+\\\\text{Cl}_2} \\\\text{C}_6\\\\text{H}_5\\\\text{Cl} \\\\xrightarrow{+\\\\text{Cl}_2} \\\\text{C}_6\\\\text{H}_4\\\\text{Cl}_2 \\\\xrightarrow{+\\\\text{Cl}_2} \\\\text{C}_6\\\\text{H}_3\\\\text{Cl}_3$, où chaque substitution supplémentaire ralentit généralement la suivante.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Réaction équilibrée : $V=V_{directe}-V_{inverse}$, s'annule à l'équilibre ; $K=k_1/k_{-1}$ relie cinétique et thermodynamique</li>
        <li>Réactions jumelles (mêmes réactifs, produits différents) de même ordre : $V_g=(k+k')[\\\\ldots]$, constantes additives</li>
        <li>Réactions successives d'ordre 1 : $[A]$ décroît en exponentielle, $[B]$ passe par un maximum, $[C]$ croît en sigmoïde</li>
        <li>Le maximum de l'intermédiaire correspond à l'égalité de sa vitesse de formation et de sa vitesse de disparition</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le signe (−) de la vitesse inverse dans le bilan $V=V_{directe}-V_{inverse}$</li>
        <li>Additionner directement des constantes de vitesse d'ordres différents (l'addition $k+k'$ n'est valable que si les deux voies parallèles ont le même ordre)</li>
        <li>Confondre le produit final $C$ (qui croît de façon monotone) avec l'intermédiaire $B$ (qui passe par un maximum)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour une réaction équilibrée $A \\\\rightleftharpoons B$ d'ordre 1 dans les deux sens, la constante d'équilibre $K$ s'exprime comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin4e1" value="wrong"> $K = k_1 + k_{-1}$</label>
          <label class="option"><input type="radio" name="cin4e1" value="right"> $K = k_1 / k_{-1}$</label>
          <label class="option"><input type="radio" name="cin4e1" value="wrong"> $K = k_1 \\\\times k_{-1}$</label>
          <label class="option"><input type="radio" name="cin4e1" value="wrong"> $K = k_{-1} - k_1$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin4e1','cin4fb1','Correct — à l\\\\'équilibre, les deux vitesses s\\\\'égalisent, ce qui donne directement K = k1/k-1.','Écris l\\\\'égalité des vitesses directe et inverse à l\\\\'équilibre, puis isole le rapport des constantes.')">Vérifier</button>
        <div class="feedback" id="cin4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un mécanisme successif $A\\\\to B\\\\to C$ d'ordre 1, la concentration de l'intermédiaire $B$ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin4e2" value="wrong"> Croît indéfiniment</label>
          <label class="option"><input type="radio" name="cin4e2" value="wrong"> Décroît de façon monotone</label>
          <label class="option"><input type="radio" name="cin4e2" value="right"> Passe par un maximum puis décroît</label>
          <label class="option"><input type="radio" name="cin4e2" value="wrong"> Reste constante</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin4e2','cin4fb2','Correct — B est d\\\\'abord formé plus vite qu\\\\'il ne disparaît, puis l\\\\'inverse : sa courbe passe par un maximum.','Pense à la courbe classique des réactions successives : quelle forme prend l\\\\'espèce intermédiaire ?')">Vérifier</button>
        <div class="feedback" id="cin4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Deux réactions jumelles $A \\\\to B$ (constante $k$) et $A \\\\to C$ (constante $k'$), toutes deux d'ordre 1 par rapport à $A$, partent du même réactif. La vitesse globale de disparition de $A$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin4e3" value="right"> $(k+k')[A]$</label>
          <label class="option"><input type="radio" name="cin4e3" value="wrong"> $k \\\\cdot k'\\\\,[A]$</label>
          <label class="option"><input type="radio" name="cin4e3" value="wrong"> $(k-k')[A]$</label>
          <label class="option"><input type="radio" name="cin4e3" value="wrong"> $\\\\max(k,k')\\\\,[A]$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin4e3','cin4fb3','Correct — pour des voies jumelles de même ordre, les vitesses s\\\\'additionnent : Vg=(k+k\\\\')[A].','Les deux réactions consomment A simultanément et indépendamment : leurs vitesses s\\\\'additionnent.')">Vérifier</button>
        <div class="feedback" id="cin4fb3"></div>
      </div>
    </div>
  `
};

CINET_NOVA_KB[cinKey('Cinétique formelle des réactions composées')] = {
  intro: "Salut, c'est Nova ! On est sur « Cinétique formelle des réactions composées ». Demande-moi la différence entre réactions parallèles et successives, ou un indice sur un exercice.",
  rules: [
    { test:/[ée]quilibr[ée]e|oppos[ée]e/i, replies:["Une réaction équilibrée a une vitesse globale V=Vdirecte−Vinverse, qui s'annule à l'équilibre. On en déduit K=k1/k-1 : la constante d'équilibre thermodynamique est le rapport des constantes de vitesse cinétiques."] },
    { test:/jumelle/i, replies:["Les réactions jumelles partagent les mêmes réactifs mais donnent des produits différents (ex. A→B et A→C). Si les deux voies ont le même ordre, leurs constantes s'additionnent : Vg=(k+k')[...]."] },
    { test:/comp[ée]titive|concurrente/i, replies:["Les réactions compétitives (ou concurrentes) n'ont pas tous leurs réactifs en commun — contrairement aux réactions jumelles. Chaque voie doit être étudiée avec sa propre vitesse."] },
    { test:/successive|cons[ée]cutive|interm[ée]diaire/i, replies:["Dans A→B→C (ordre 1), [A] décroît en exponentielle, [B] (intermédiaire) passe par un maximum, et [C] croît en sigmoïde. Le maximum de B correspond à l'égalité entre sa vitesse de formation (k1[A]) et sa vitesse de disparition (k2[B])."] },
    { test:/constante d.[ée]quilibre|k\s*=\s*k1/i, replies:["Pour toute réaction opposée à l'équilibre, K=k1/k-1 (rapport de la constante directe sur la constante inverse) — un pont direct entre thermodynamique et cinétique."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : écris l'égalité Vdirecte=Vinverse à l'équilibre.","Indice niveau 2 : cela donne k1(a-xeq)=k-1(xeq).","Indice niveau 3 : en isolant le rapport, K=k1/k-1."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la courbe typique des réactions successives.","Indice niveau 2 : B est d'abord formé, puis consommé.","Indice niveau 3 : sa concentration passe donc par un maximum."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : les deux réactions consomment A en parallèle.","Indice niveau 2 : leurs contributions à la vitesse s'additionnent si les ordres coïncident.","Indice niveau 3 : Vg=(k+k')[A]."] }
  ]
};

/* =========================== CHAPITRE 5 =========================== */
CINET_CHAPTERS[cinKey('Cinétique des réactions complexes et mécanismes en chaîne')] = {
  objectives: [
    "Distinguer réaction élémentaire et réaction complexe (règle de Van't Hoff)",
    "Décrire les trois étapes d'un mécanisme en chaîne (initiation, propagation, terminaison)",
    "Appliquer l'Approximation de l'État Quasi-Stationnaire (AEQS) à un intermédiaire réactionnel",
    "Appliquer le principe de l'étape déterminante à une réaction par stade"
  ],
  prereqs: ["Cinétique formelle des réactions composées"],
  bodyHtml: `
    <p>De nombreuses réactions chimiques, bien que décrites par une équation-bilan simple, se déroulent en réalité en une succession d'<strong>étapes élémentaires</strong> faisant intervenir des espèces très réactives et de courte durée de vie. Ce chapitre montre comment retrouver la loi de vitesse globale à partir d'un mécanisme détaillé.</p>

    <h3>1. Réaction élémentaire — règle de Van't Hoff</h3>
    <p>Une <strong>réaction élémentaire</strong> est une réaction qui se déroule en une seule étape, au niveau moléculaire, sans intermédiaire détectable. Pour une réaction élémentaire (et seulement pour elle), les ordres partiels sont égaux aux coefficients stœchiométriques — c'est la <strong>règle de Van't Hoff</strong>. Une <strong>réaction complexe</strong> résulte, elle, d'un enchaînement de plusieurs réactions élémentaires ; son ordre expérimental global n'a alors, en général, aucun rapport avec les coefficients stœchiométriques de l'équation-bilan.</p>
    <p>On distingue deux grandes classes de réactions complexes :</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Caractéristique</th></tr>
      <tr><td>Réaction en chaîne (séquence fermée)</td><td>un intermédiaire (radical) est régénéré à chaque cycle et peut réagir à nouveau</td></tr>
      <tr><td>Réaction par stade (séquence ouverte)</td><td>chaque intermédiaire n'est consommé qu'une fois ; une étape lente impose sa vitesse à l'ensemble</td></tr>
    </table>

    <h3>2. Mécanisme en chaîne : les trois étapes</h3>
    <p>Exemple de référence : $\\\\text{H}_2 + \\\\text{Br}_2 \\\\to 2\\\\text{HBr}$.</p>
    <ul style="margin-left:1.2em; color:var(--ink-soft);">
      <li><strong>Initiation</strong> : formation du premier centre actif (radical), par rupture homolytique thermique ou photochimique d'une liaison : $\\\\text{Br}_2 + M \\\\to 2\\\\text{Br}^{\\\\bullet} + M$.</li>
      <li><strong>Propagation</strong> : le radical réagit avec un réactif pour former le produit principal ET un nouveau radical, qui relance le cycle : $\\\\text{Br}^{\\\\bullet}+\\\\text{H}_2\\\\to \\\\text{HBr}+\\\\text{H}^{\\\\bullet}$, puis $\\\\text{H}^{\\\\bullet}+\\\\text{Br}_2\\\\to \\\\text{HBr}+\\\\text{Br}^{\\\\bullet}$.</li>
      <li><strong>Terminaison (rupture)</strong> : deux radicaux se recombinent, ce qui arrête localement la chaîne : $2\\\\text{Br}^{\\\\bullet}+M \\\\to \\\\text{Br}_2+M$.</li>
    </ul>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Un radical libre possède un ou plusieurs électrons non appariés (noté par un point, ex. $\\\\text{Cl}^{\\\\bullet}$). Les intermédiaires réactionnels (radicaux) ne figurent ni parmi les réactifs, ni parmi les produits de l'équation-bilan : ce sont des espèces à très courte durée de vie, jamais présentes en quantité notable.
    </div>
    <p>Ce type de mécanisme se rencontre dans les réactions d'oxydation, de combustion, de décomposition thermique, de polymérisation radicalaire et les réactions photochimiques.</p>

    <h3>3. Approximation de l'État Quasi-Stationnaire (AEQS)</h3>
    <p>Un intermédiaire réactionnel $I$ (radical) est consommé presque aussi vite qu'il est formé : sa concentration reste donc très faible et quasi constante après un bref régime transitoire. On pose alors :</p>
    <div class="formula-box">$$\\\\dfrac{d[I]}{dt} \\\\approx 0$$</div>
    <p>Cette hypothèse (aussi appelée principe de Bodenstein) permet d'exprimer $[I]$ en fonction des concentrations des espèces stables, puis d'éliminer $[I]$ de l'expression de la vitesse pour aboutir à une loi de vitesse ne contenant que des grandeurs mesurables. Exemple simplifié (décomposition de l'éthane) :</p>
    <div class="formula-box">$$\\\\text{C}_2\\\\text{H}_6 \\\\xrightarrow{k_1} 2\\\\text{CH}_3^{\\\\bullet} \\\\quad\\\\text{puis propagation via CH}_3^{\\\\bullet}\\\\text{, C}_2\\\\text{H}_5^{\\\\bullet}\\\\text{, H}^{\\\\bullet}$$</div>
    <p>En appliquant l'AEQS successivement à $[\\\\text{CH}_3^{\\\\bullet}]$, $[\\\\text{C}_2\\\\text{H}_5^{\\\\bullet}]$ et $[\\\\text{H}^{\\\\bullet}]$, on aboutit à des expressions closes de chaque concentration radicalaire en fonction de $[\\\\text{C}_2\\\\text{H}_6]$ et des $k_i$, par exemple $[\\\\text{C}_2\\\\text{H}_5^{\\\\bullet}] = \\\\left(\\\\dfrac{k_1}{k_5}[\\\\text{C}_2\\\\text{H}_6]\\\\right)^{1/2}$.</p>

    <h3>4. Réactions par stade et principe de l'étape déterminante</h3>
    <p>Dans une séquence ouverte, si l'une des étapes est beaucoup plus lente que les autres, elle impose sa vitesse à l'ensemble du mécanisme : c'est l'<strong>étape déterminante</strong> (ou étape cinétiquement limitante).</p>
    <p>Exemple : $A+B \\\\underset{k_{-1}}{\\\\overset{k_1}{\\\\rightleftharpoons}} C$ (rapide), puis $C+D \\\\xrightarrow{k_2} P$ (lente). La vitesse globale est celle de l'étape lente : $V=k_2[C][D]$. En appliquant l'AEQS à l'intermédiaire $C$ :</p>
    <div class="formula-box">$$[C] = \\\\dfrac{k_1[A][B]}{k_{-1}+k_2[D]} \\\\quad\\\\Rightarrow\\\\quad V = \\\\dfrac{k_2[D]\\\\,k_1[A][B]}{k_{-1}+k_2[D]}$$</div>
    <p>Exemple classique traité par cette méthode : la décomposition $2\\\\text{N}_2\\\\text{O}_5 \\\\to 4\\\\text{NO}_2+\\\\text{O}_2$ conduit, après application de l'AEQS à l'intermédiaire $\\\\text{NO}_3$, à une loi de vitesse d'ordre 1 apparent : $V=K[\\\\text{N}_2\\\\text{O}_5]$ avec $K=\\\\dfrac{k_1k_2}{k_{-1}+k_2}$ — un exemple frappant montrant qu'un mécanisme à plusieurs étapes complexes peut malgré tout redonner, macroscopiquement, une loi de vitesse simple.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Règle de Van't Hoff : ordre = coefficient stœchiométrique UNIQUEMENT pour une réaction élémentaire</li>
        <li>Mécanisme en chaîne : initiation → propagation (produits principaux + régénération du radical) → terminaison</li>
        <li>AEQS : $d[I]/dt\\\\approx 0$ pour tout intermédiaire réactionnel, ce qui permet d'éliminer $[I]$ de la loi de vitesse</li>
        <li>Réaction par stade : la vitesse globale est imposée par l'étape la plus lente (étape déterminante)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer la règle de Van't Hoff (ordre = coefficient stœchiométrique) à une réaction dont on ne sait pas si elle est élémentaire</li>
        <li>Oublier une étape (initiation ou terminaison) lors de l'écriture d'un mécanisme en chaîne</li>
        <li>Appliquer l'AEQS à un réactif ou à un produit stable au lieu de l'appliquer uniquement à un intermédiaire réactionnel de courte durée de vie</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans un mécanisme en chaîne, l'étape qui régénère le radical tout en formant le produit principal est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin5e1" value="wrong"> L'initiation</label>
          <label class="option"><input type="radio" name="cin5e1" value="right"> La propagation</label>
          <label class="option"><input type="radio" name="cin5e1" value="wrong"> La terminaison</label>
          <label class="option"><input type="radio" name="cin5e1" value="wrong"> L'étape déterminante</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin5e1','cin5fb1','Correct — la propagation forme les produits principaux tout en régénérant un radical, ce qui entretient la chaîne.','Repense à quelle étape forme les produits ET relance le cycle radicalaire.')">Vérifier</button>
        <div class="feedback" id="cin5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'AEQS ($d[I]/dt \\\\approx 0$) s'applique correctement à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin5e2" value="wrong"> Un réactif initial de la réaction</label>
          <label class="option"><input type="radio" name="cin5e2" value="wrong"> Le produit final de la réaction</label>
          <label class="option"><input type="radio" name="cin5e2" value="right"> Un intermédiaire réactionnel (radical) de courte durée de vie</label>
          <label class="option"><input type="radio" name="cin5e2" value="wrong"> N'importe quelle espèce du mécanisme</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin5e2','cin5fb2','Correct — seul un intermédiaire, consommé presque aussi vite qu\\\\'il est formé, justifie l\\\\'hypothèse d[I]/dt≈0.','L\\\\'AEQS repose sur le fait que l\\\\'espèce ne s\\\\'accumule pas : c\\\\'est vrai pour un intermédiaire réactionnel, pas pour un réactif ou un produit stable.')">Vérifier</button>
        <div class="feedback" id="cin5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans une réaction par stade avec une étape rapide suivie d'une étape lente, la vitesse globale est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin5e3" value="wrong"> Celle de l'étape rapide</label>
          <label class="option"><input type="radio" name="cin5e3" value="right"> Celle de l'étape lente (étape déterminante)</label>
          <label class="option"><input type="radio" name="cin5e3" value="wrong"> La somme des deux vitesses</label>
          <label class="option"><input type="radio" name="cin5e3" value="wrong"> La moyenne des deux vitesses</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin5e3','cin5fb3','Correct — l\\\\'étape lente est un goulot d\\\\'étranglement : elle impose sa vitesse à toute la séquence.','Pense à un embouteillage : c\\\\'est le passage le plus lent qui limite le débit global.')">Vérifier</button>
        <div class="feedback" id="cin5fb3"></div>
      </div>
    </div>
  `
};

CINET_NOVA_KB[cinKey('Cinétique des réactions complexes et mécanismes en chaîne')] = {
  intro: "Salut, c'est Nova ! On est sur « Cinétique des réactions complexes et mécanismes en chaîne ». Demande-moi ce qu'est l'AEQS, les étapes d'un mécanisme en chaîne, ou un indice sur un exercice.",
  rules: [
    { test:/van.?t hoff|r[èe]gle.*ordre/i, replies:["La règle de Van't Hoff dit que pour une réaction ÉLÉMENTAIRE (une seule étape), les ordres partiels sont égaux aux coefficients stœchiométriques. Ce n'est jamais garanti pour une réaction complexe."] },
    { test:/initiation/i, replies:["L'initiation forme le premier centre actif (radical), par effet thermique (rupture homolytique A-B→A•+B•) ou photochimique (AB+hν→A•+B•)."] },
    { test:/propagation/i, replies:["La propagation forme les produits principaux tout en régénérant le radical actif : c'est ce qui entretient la chaîne cycliquement."] },
    { test:/terminaison|rupture/i, replies:["La terminaison (rupture) consomme deux radicaux pour former une espèce stable, ce qui arrête localement la propagation de la chaîne."] },
    { test:/aeqs|[ée]tat quasi.?stationnaire|bodenstein/i, replies:["L'AEQS pose d[I]/dt≈0 pour un intermédiaire réactionnel I : sa vitesse de formation égale sa vitesse de disparition, ce qui permet d'exprimer [I] et de l'éliminer de la loi de vitesse finale."] },
    { test:/[ée]tape d[ée]terminante/i, replies:["Dans une réaction par stade, l'étape la plus lente impose sa vitesse à l'ensemble du mécanisme : c'est l'étape déterminante (ou cinétiquement limitante)."] },
    { test:/radical/i, replies:["Un radical libre a un ou plusieurs électrons non appariés (noté par un point, ex. Cl•). C'est un intermédiaire réactionnel très réactif et de très courte durée de vie."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : quelle étape forme un produit ET régénère un radical ?","Indice niveau 2 : ce n'est ni l'initiation, ni la terminaison.","Indice niveau 3 : c'est la propagation."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : l'AEQS suppose que l'espèce ne s'accumule pas.","Indice niveau 2 : cela n'est vrai que pour une espèce très réactive.","Indice niveau 3 : c'est un intermédiaire réactionnel (radical)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à un embouteillage sur une route à plusieurs tronçons.","Indice niveau 2 : le tronçon le plus lent limite tout le trafic.","Indice niveau 3 : la vitesse globale est celle de l'étape lente."] }
  ]
};

/* =========================== CHAPITRE 6 =========================== */
CINET_CHAPTERS[cinKey('Influence de la température : loi d\'Arrhenius et théories cinétiques')] = {
  objectives: [
    "Énoncer la loi d'Arrhenius et sa forme logarithmique",
    "Déterminer graphiquement une énergie d'activation à partir de mesures de k(T)",
    "Décrire le principe de la théorie des collisions moléculaires",
    "Décrire le principe de la théorie du complexe activé (état de transition)"
  ],
  prereqs: ["Cinétique des réactions complexes et mécanismes en chaîne"],
  bodyHtml: `
    <p>Au niveau microscopique, une transformation chimique résulte de chocs entre les molécules de réactifs. Mais tous les chocs ne sont pas efficaces : seuls ceux qui apportent une énergie suffisante et une orientation favorable rompent effectivement les liaisons. La température, en augmentant l'agitation moléculaire, augmente à la fois la fréquence des chocs et leur énergie — d'où l'accélération quasi systématique des réactions chimiques avec la température.</p>

    <h3>1. Loi d'Arrhenius</h3>
    <p>En 1889, Svante Arrhenius propose la relation empirique reliant la constante de vitesse $k$ à la température absolue $T$ :</p>
    <div class="formula-box">$$k = A\\\\,e^{-E_a/RT}$$</div>
    <p>avec $A$ le <strong>facteur préexponentiel</strong> (ou facteur de fréquence, en même unité que $k$), $E_a$ l'<strong>énergie d'activation</strong> (en $\\\\text{J}\\\\cdot\\\\text{mol}^{-1}$ ou $\\\\text{kJ}\\\\cdot\\\\text{mol}^{-1}$), et $R=8{,}314\\\\ \\\\text{J}\\\\cdot\\\\text{mol}^{-1}\\\\cdot\\\\text{K}^{-1}$ la constante des gaz parfaits.</p>

    <h3>2. Énergie d'activation</h3>
    <p>L'<strong>énergie d'activation</strong> $E_a$ est la barrière énergétique que les réactifs doivent franchir pour que leur structure se réorganise en produits. Plus $E_a$ est élevée, plus la réaction est sensible à la température (et plus elle est lente à température ambiante). L'arrangement instable des molécules au sommet de cette barrière est appelé <strong>complexe activé</strong> (ou état de transition).</p>

    <h3>3. Forme linéarisée et détermination graphique de Ea</h3>
    <p>En prenant le logarithme népérien de la loi d'Arrhenius :</p>
    <div class="formula-box">$$\\\\ln k = \\\\ln A - \\\\dfrac{E_a}{R}\\\\cdot\\\\dfrac{1}{T}$$</div>
    <p>Le tracé de $\\\\ln k$ en fonction de $1/T$ (« droite d'Arrhenius ») donne une droite de pente $-E_a/R$ et d'ordonnée à l'origine $\\\\ln A$. C'est la méthode standard pour extraire $E_a$ et $A$ à partir d'une série de mesures de $k$ à différentes températures.</p>
    <table class="mini-table">
      <tr><th>Grandeur lue sur le graphe</th><th>Interprétation</th></tr>
      <tr><td>Pente (négative)</td><td>$-E_a/R$, donc $E_a = -R\\\\times\\\\text{pente}$</td></tr>
      <tr><td>Ordonnée à l'origine</td><td>$\\\\ln A$, donc $A = e^{\\\\ln A}$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Entre deux températures $T_1$ et $T_2$, on peut aussi calculer $E_a$ sans tracer de graphique : $\\\\ln\\\\dfrac{k_2}{k_1} = -\\\\dfrac{E_a}{R}\\\\left(\\\\dfrac{1}{T_2}-\\\\dfrac{1}{T_1}\\\\right)$, très pratique lorsqu'on ne dispose que de deux mesures.
    </div>

    <h3>4. Réactions endothermiques et exothermiques : profil énergétique</h3>
    <p>Le diagramme énergie–avancement de la réaction montre les réactifs, le sommet correspondant au complexe activé (énergie $E_a$ au-dessus des réactifs), et les produits. La différence d'énergie entre produits et réactifs est l'enthalpie de réaction $\\\\Delta H$ :</p>
    <ul style="margin-left:1.2em; color:var(--ink-soft);">
      <li>$\\\\Delta H > 0$ : réaction <strong>endothermique</strong>, produits plus hauts en énergie que les réactifs.</li>
      <li>$\\\\Delta H < 0$ : réaction <strong>exothermique</strong>, produits plus bas en énergie que les réactifs.</li>
    </ul>
    <p>Dans les deux cas, l'énergie d'activation de la réaction directe $E_a$ et celle de la réaction inverse $E_a'$ sont liées par $E_a - E_a' = \\\\Delta H$ : le complexe activé est un unique sommet commun aux deux sens de la réaction.</p>

    <h3>5. Théorie des collisions moléculaires</h3>
    <p>Cette théorie suppose que la transformation chimique ne peut se produire que par collision (choc) entre réactifs, assimilés à des sphères indéformables au comportement gazeux (indépendantes les unes des autres). On calcule le nombre théorique de collisions par unité de temps et de volume, puis on le compare au nombre de molécules réellement transformées : seule une fraction $e^{-E_a/RT}$ des chocs (ceux dépassant l'énergie seuil $E_a$) est efficace, ce qui retrouve naturellement la forme de la loi d'Arrhenius. Un <strong>facteur stérique</strong> (orientation favorable requise pour le choc) est parfois introduit pour affiner l'accord avec l'expérience.</p>

    <h3>6. Théorie du complexe activé (état de transition)</h3>
    <p>Développée par Eyring et Polanyi dans les années 1930, cette théorie postule que la réaction passe nécessairement par un état transitoire instable, le <strong>complexe activé</strong> $AB^{\\\\ne}$, en équilibre rapide avec les réactifs, qui évolue ensuite vers les produits :</p>
    <div class="formula-box">$$A + B \\\\underset{}{\\\\overset{K^{\\\\ne}}{\\\\rightleftharpoons}} AB^{\\\\ne} \\\\xrightarrow{k_2} C + D$$</div>
    <p>Contrairement à la théorie des collisions (purement géométrique), cette approche relie $k$ à une grandeur thermodynamique du complexe activé (son enthalpie et son entropie d'activation), ce qui permet d'interpréter physiquement le facteur préexponentiel $A$ en termes de probabilité de formation du complexe activé et non plus seulement de fréquence de choc.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Loi d'Arrhenius : $k = A\\\\,e^{-E_a/RT}$, soit $\\\\ln k = \\\\ln A - E_a/(RT)$</li>
        <li>Le tracé $\\\\ln k$ vs $1/T$ est une droite de pente $-E_a/R$</li>
        <li>Théorie des collisions : seule une fraction $e^{-E_a/RT}$ des chocs est énergétiquement efficace</li>
        <li>Théorie du complexe activé : passage par un état de transition $AB^{\\\\ne}$ en équilibre rapide avec les réactifs</li>
        <li>$E_a-E_a' = \\\\Delta H$ relie les énergies d'activation directe/inverse à l'enthalpie de réaction</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de convertir la température en Kelvin dans la loi d'Arrhenius</li>
        <li>Confondre le signe de la pente : la pente de $\\\\ln k$ vs $1/T$ est <strong>négative</strong>, donc $E_a = -R\\\\times\\\\text{pente}$ (positif)</li>
        <li>Confondre le complexe activé (état de transition, jamais isolable) avec un intermédiaire réactionnel stable (comme un radical)</li>
      </ul>
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple résolu</span>
      <p>On mesure $k=1{,}72\\\\times10^{-5}\\\\ \\\\text{s}^{-1}$ à $298\\\\ \\\\text{K}$ et $k=240\\\\times10^{-5}\\\\ \\\\text{s}^{-1}$ à $338\\\\ \\\\text{K}$. Calculer $E_a$.</p>
      <p>$\\\\ln\\\\dfrac{k_2}{k_1} = -\\\\dfrac{E_a}{R}\\\\left(\\\\dfrac{1}{T_2}-\\\\dfrac{1}{T_1}\\\\right) \\\\;\\\\Rightarrow\\\\; E_a = \\\\dfrac{-R\\\\ln(k_2/k_1)}{1/T_2 - 1/T_1} \\\\approx 1{,}0\\\\times10^{5}\\\\ \\\\text{J/mol} \\\\approx 103\\\\ \\\\text{kJ/mol}$, en cohérence avec la valeur obtenue graphiquement à partir de la droite d'Arrhenius complète.</p>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Sur un graphe $\\\\ln k$ en fonction de $1/T$, la pente mesurée est $-1{,}25\\\\times10^{4}\\\\ \\\\text{K}$. L'énergie d'activation vaut environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin6e1" value="wrong"> 15 kJ/mol</label>
          <label class="option"><input type="radio" name="cin6e1" value="right"> 104 kJ/mol</label>
          <label class="option"><input type="radio" name="cin6e1" value="wrong"> 1250 kJ/mol</label>
          <label class="option"><input type="radio" name="cin6e1" value="wrong"> 8,3 kJ/mol</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin6e1','cin6fb1','Correct — Ea = -R×pente = 8,314×1,25×10⁴ ≈ 1,04×10⁵ J/mol ≈ 104 kJ/mol.','Utilise Ea = -R × pente, avec R=8,314 J·mol⁻¹·K⁻¹, puis convertis en kJ/mol.')">Vérifier</button>
        <div class="feedback" id="cin6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le complexe activé (état de transition) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin6e2" value="wrong"> Un intermédiaire réactionnel stable, isolable en laboratoire</label>
          <label class="option"><input type="radio" name="cin6e2" value="right"> Un arrangement transitoire instable, au sommet de la barrière énergétique</label>
          <label class="option"><input type="radio" name="cin6e2" value="wrong"> Un catalyseur de la réaction</label>
          <label class="option"><input type="radio" name="cin6e2" value="wrong"> Le produit final de la réaction</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin6e2','cin6fb2','Correct — le complexe activé est un état de transition, jamais isolable, situé au sommet de la barrière d\\\\'énergie d\\\\'activation.','Le complexe activé n\\\\'est jamais un état stable ni isolable : il correspond au sommet du profil énergétique, de durée de vie quasi nulle.')">Vérifier</button>
        <div class="feedback" id="cin6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour une réaction exothermique ($\\\\Delta H<0$), l'énergie d'activation de la réaction inverse $E_a'$ par rapport à celle de la réaction directe $E_a$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin6e3" value="wrong"> Toujours égale à $E_a$</label>
          <label class="option"><input type="radio" name="cin6e3" value="right"> Plus grande que $E_a$</label>
          <label class="option"><input type="radio" name="cin6e3" value="wrong"> Toujours nulle</label>
          <label class="option"><input type="radio" name="cin6e3" value="wrong"> Plus petite que $E_a$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin6e3','cin6fb3','Correct — comme Ea - Ea\\\\' = ΔH et que ΔH<0 pour une réaction exothermique, on a Ea\\\\'>Ea : la barrière est plus haute dans le sens inverse.','Utilise la relation Ea - Ea\\\\' = ΔH. Si ΔH est négatif, que peux-tu en déduire sur Ea\\\\' par rapport à Ea ?')">Vérifier</button>
        <div class="feedback" id="cin6fb3"></div>
      </div>
    </div>
  `
};

CINET_NOVA_KB[cinKey('Influence de la température : loi d\'Arrhenius et théories cinétiques')] = {
  intro: "Salut, c'est Nova ! On est sur « Influence de la température : loi d'Arrhenius et théories cinétiques ». Demande-moi comment calculer une énergie d'activation, la différence entre les deux théories, ou un indice sur un exercice.",
  rules: [
    { test:/arrhenius/i, replies:["La loi d'Arrhenius : k=A·e^(-Ea/RT), soit ln k = ln A - Ea/(RT). Le tracé de ln k en fonction de 1/T donne une droite de pente -Ea/R."] },
    { test:/[ée]nergie d.activation/i, replies:["L'énergie d'activation Ea est la barrière énergétique à franchir pour que les réactifs se transforment en produits. Plus elle est grande, plus la réaction est sensible à la température."] },
    { test:/pente|graphique.*arrhenius|droite d.arrhenius/i, replies:["Sur le graphe ln k vs 1/T, la pente vaut -Ea/R (toujours négative). On en déduit Ea = -R×pente, et l'ordonnée à l'origine donne ln A."] },
    { test:/th[ée]orie des collisions/i, replies:["La théorie des collisions suppose que la réaction n'a lieu que par choc entre réactifs, et que seule une fraction e^(-Ea/RT) des chocs est assez énergétique pour être efficace."] },
    { test:/complexe activ[ée]|[ée]tat de transition/i, replies:["Le complexe activé (état de transition) est un arrangement moléculaire transitoire et instable, au sommet de la barrière d'énergie — jamais isolable, contrairement à un intermédiaire réactionnel comme un radical."] },
    { test:/exothermique|endothermique|delta h/i, replies:["Ea - Ea' = ΔH relie les énergies d'activation directe et inverse à l'enthalpie de réaction. Si ΔH<0 (exothermique), Ea'>Ea : la barrière est plus haute pour la réaction inverse."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise Ea=-R×pente.","Indice niveau 2 : R=8,314 J·mol⁻¹·K⁻¹.","Indice niveau 3 : Ea≈8,314×1,25×10⁴≈1,04×10⁵ J/mol, soit environ 104 kJ/mol."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la durée de vie du complexe activé.","Indice niveau 2 : elle est quasi nulle, il n'est jamais isolable.","Indice niveau 3 : c'est un état de transition, au sommet de la barrière d'énergie."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : utilise Ea-Ea'=ΔH.","Indice niveau 2 : ΔH est négatif pour une réaction exothermique.","Indice niveau 3 : donc Ea' est plus grand que Ea."] }
  ]
};

/* =========================== CHAPITRE 7 =========================== */
CINET_CHAPTERS[cinKey('Catalyse et cinétique chimique hétérogène')] = {
  objectives: [
    "Définir la catalyse et distinguer catalyse homogène et hétérogène",
    "Définir l'adsorption et la distinguer de l'absorption",
    "Établir et exploiter l'isotherme de Langmuir (adsorption monocouche)",
    "Présenter les isothermes de B.E.T. (multicouche) et de Freundlich"
  ],
  prereqs: ["Influence de la température : loi d\'Arrhenius et théories cinétiques"],
  bodyHtml: `
    <h3>1. Généralités sur la catalyse</h3>
    <p>Un <strong>catalyseur</strong> est une espèce qui accélère une réaction chimique sans être consommée par le bilan global : il ouvre un nouveau chemin réactionnel, d'énergie d'activation $E_a$ plus faible que le chemin non catalysé, sans modifier ni l'enthalpie de réaction $\\\\Delta H$ ni la position de l'équilibre thermodynamique (il accélère tout autant la réaction directe que la réaction inverse). On distingue :</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Caractéristique</th><th>Exemple</th></tr>
      <tr><td>Catalyse homogène</td><td>catalyseur et réactifs dans la même phase</td><td>catalyse acide en solution aqueuse</td></tr>
      <tr><td>Catalyse hétérogène</td><td>catalyseur dans une phase différente (le plus souvent solide, réactifs gazeux ou liquides)</td><td>pot catalytique automobile (Pt, Pd, Rh solides)</td></tr>
      <tr><td>Catalyse enzymatique</td><td>cas particulier biologique, très sélective</td><td>enzymes digestives</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Un catalyseur diminue $E_a$ mais ne modifie jamais $\\\\Delta H$ : sur le diagramme énergétique, il abaisse le sommet de la barrière (complexe activé), pas les niveaux de départ ou d'arrivée.
    </div>

    <h3>2. Adsorption : définitions</h3>
    <p>En catalyse hétérogène, la réaction se produit à la surface du solide (catalyseur) : elle est précédée d'une étape d'<strong>adsorption</strong>, phénomène par lequel une substance s'accumule au voisinage d'une interface (gaz-solide, gaz-liquide, solide-liquide...). Le solide sur lequel se produit l'adsorption est l'<strong>adsorbant</strong>, le gaz (ou soluté) qui s'adsorbe est l'<strong>adsorbat</strong>.</p>
    <table class="mini-table">
      <tr><th></th><th>Adsorption</th><th>Absorption</th></tr>
      <tr><td>Localisation</td><td>en surface (2D)</td><td>dans tout le volume (3D)</td></tr>
      <tr><td>Exemple</td><td>gaz fixé à la surface du charbon actif</td><td>gaz dissous dans un liquide</td></tr>
    </table>
    <p>Le phénomène inverse — les molécules adsorbées quittent la surface, sous l'effet d'une élévation de température ou d'une baisse de pression — se nomme la <strong>désorption</strong>.</p>
    <table class="mini-table">
      <tr><th>Type d'adsorption</th><th>Nature des liaisons</th><th>Réversibilité</th><th>Effet de la température</th></tr>
      <tr><td>Physisorption</td><td>forces de van der Waals (faibles)</td><td>réversible</td><td>favorisée par une baisse de température</td></tr>
      <tr><td>Chimisorption</td><td>liaisons covalentes/ioniques/métalliques (fortes)</td><td>souvent irréversible</td><td>modifie profondément la répartition des charges électroniques</td></tr>
    </table>

    <h3>3. Isotherme de Langmuir (monocouche)</h3>
    <p>Le modèle de Langmuir décrit la formation d'une <strong>monocouche</strong> d'adsorbat $A$ sur une surface possédant des sites d'adsorption identiques et indépendants. À l'équilibre, la fraction de sites occupés $\\\\theta_A$ dépend de la pression partielle $P_A$ :</p>
    <div class="formula-box">$$\\\\theta_A = \\\\dfrac{K_{eq}P_A}{1+K_{eq}P_A} \\\\qquad\\\\text{avec}\\\\qquad \\\\theta_A = \\\\dfrac{V_{ads}}{V_{mono}}$$</div>
    <p>où $K_{eq}$ est la constante d'interaction adsorbat-surface, et $V_{mono}$ le volume correspondant à une monocouche complète. La forme linéarisée, exploitable graphiquement, est :</p>
    <div class="formula-box">$$\\\\dfrac{1}{V_{ads}} = \\\\dfrac{1}{V_{mono}K_{eq}}\\\\left(\\\\dfrac{1}{P_A}\\\\right) + \\\\dfrac{1}{V_{mono}}$$</div>
    <p>Le tracé de $1/V_{ads}$ en fonction de $1/P_A$ donne une droite : la pente $\\\\dfrac{1}{V_{mono}K_{eq}}$ et l'ordonnée à l'origine $\\\\dfrac{1}{V_{mono}}$ permettent de calculer $V_{mono}$ puis $K_{eq}$.</p>

    <h3>4. Isotherme de B.E.T. (multicouche)</h3>
    <p>Brunauer, Emmett et Teller ont étendu le modèle de Langmuir à l'adsorption en <strong>plusieurs couches</strong> superposées :</p>
    <div class="formula-box">$$V_{ads} = \\\\dfrac{V_m\\\\,c\\\\,P}{(P_0-P)}\\\\left[1+\\\\dfrac{P}{P_0}(c-1)\\\\right]$$</div>
    <p>avec $P_0$ la pression de vapeur saturante et $c$ une constante caractéristique. Forme linéarisée :</p>
    <div class="formula-box">$$\\\\dfrac{P}{(P_0-P)V_{ads}} = \\\\dfrac{1}{c\\\\,V_m} + \\\\dfrac{c-1}{c\\\\,V_m}\\\\left(\\\\dfrac{P}{P_0}\\\\right)$$</div>
    <p>Le tracé de $\\\\dfrac{P}{(P_0-P)V_{ads}}$ en fonction de $P/P_0$ donne une droite dont la pente et l'ordonnée à l'origine permettent d'extraire $c$ et $V_m$ (volume de la monocouche). Cette méthode B.E.T. est la référence industrielle pour mesurer la <strong>surface spécifique</strong> d'un solide poreux (catalyseurs, charbons actifs, matériaux adsorbants).</p>

    <h3>5. Isotherme de Freundlich</h3>
    <p>Empirique, adaptée en particulier à l'adsorption en phase liquide, l'isotherme de Freundlich s'écrit :</p>
    <div class="formula-box">$$\\\\dfrac{x}{m} = K\\\\,C^{1/n} \\\\qquad\\\\Longleftrightarrow\\\\qquad \\\\ln\\\\dfrac{x}{m} = \\\\ln K + \\\\dfrac{1}{n}\\\\ln C$$</div>
    <p>où $x/m$ est la masse d'adsorbat par unité de masse d'adsorbant, $C$ la concentration (ou $P$ la pression) à l'équilibre, $K$ et $n$ des constantes empiriques. Le tracé de $\\\\ln(x/m)$ en fonction de $\\\\ln C$ (ou $\\\\ln P$) donne une droite de pente $1/n$ et d'ordonnée à l'origine $\\\\ln K$.</p>
    <table class="mini-table">
      <tr><th>Valeur de n</th><th>Interprétation</th></tr>
      <tr><td>$2 \\\\le n \\\\le 10$</td><td>adsorption facile</td></tr>
      <tr><td>$1 \\\\le n \\\\le 2$</td><td>adsorption modérément difficile</td></tr>
      <tr><td>$n < 1$</td><td>adsorption faible</td></tr>
    </table>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un catalyseur abaisse $E_a$ sans changer $\\\\Delta H$ ni la position de l'équilibre</li>
        <li>Adsorption = phénomène de surface (2D) ; absorption = phénomène de volume (3D)</li>
        <li>Langmuir (monocouche) : $1/V_{ads}$ vs $1/P_A$ est une droite</li>
        <li>B.E.T. (multicouche) : $\\\\dfrac{P}{(P_0-P)V_{ads}}$ vs $P/P_0$ est une droite, utilisée pour mesurer la surface spécifique</li>
        <li>Freundlich (empirique, phase liquide) : $\\\\ln(x/m)$ vs $\\\\ln C$ est une droite de pente $1/n$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'un catalyseur déplace l'équilibre thermodynamique — il ne fait qu'accélérer l'atteinte de cet équilibre, dans les deux sens</li>
        <li>Confondre adsorption (surface) et absorption (volume)</li>
        <li>Appliquer le modèle de Langmuir (monocouche) à des données qui suivent en réalité un comportement multicouche (B.E.T.)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un catalyseur agit en :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin7e1" value="wrong"> Déplaçant l'équilibre thermodynamique vers les produits</label>
          <label class="option"><input type="radio" name="cin7e1" value="right"> Diminuant l'énergie d'activation, sans changer ΔH ni la position de l'équilibre</label>
          <label class="option"><input type="radio" name="cin7e1" value="wrong"> Augmentant l'enthalpie de réaction</label>
          <label class="option"><input type="radio" name="cin7e1" value="wrong"> Étant consommé stœchiométriquement par la réaction</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin7e1','cin7fb1','Correct — un catalyseur ouvre un chemin réactionnel différent, de Ea plus faible, sans toucher à ΔH ni à la constante d\\\\'équilibre.','Un catalyseur accélère la réaction directe ET la réaction inverse dans les mêmes proportions : il ne peut donc pas déplacer l\\\\'équilibre.')">Vérifier</button>
        <div class="feedback" id="cin7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans le modèle de Langmuir, le tracé qui donne une droite est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin7e2" value="wrong"> $V_{ads}$ en fonction de $P_A$</label>
          <label class="option"><input type="radio" name="cin7e2" value="right"> $1/V_{ads}$ en fonction de $1/P_A$</label>
          <label class="option"><input type="radio" name="cin7e2" value="wrong"> $\\\\ln V_{ads}$ en fonction de $P_A$</label>
          <label class="option"><input type="radio" name="cin7e2" value="wrong"> $V_{ads}$ en fonction de $\\\\ln P_A$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin7e2','cin7fb2','Correct — la forme linéarisée de Langmuir est 1/Vads = 1/(Vmono·Keq)·(1/PA) + 1/Vmono, une droite en 1/Vads vs 1/PA.','Reprends la forme linéarisée de l\\\\'isotherme de Langmuir : quelles grandeurs inverses apparaissent ?')">Vérifier</button>
        <div class="feedback" id="cin7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'isotherme de B.E.T. se distingue de celle de Langmuir car elle décrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin7e3" value="wrong"> Une adsorption en phase liquide uniquement</label>
          <label class="option"><input type="radio" name="cin7e3" value="right"> Une adsorption en plusieurs couches superposées (multicouche)</label>
          <label class="option"><input type="radio" name="cin7e3" value="wrong"> Une chimisorption irréversible uniquement</label>
          <label class="option"><input type="radio" name="cin7e3" value="wrong"> Une réaction catalytique homogène</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin7e3','cin7fb3','Correct — B.E.T. généralise Langmuir (monocouche) au cas où plusieurs couches d\\\\'adsorbat se superposent.','Langmuir suppose une seule couche ; B.E.T. étend le modèle en appliquant le même principe à chaque couche successive.')">Vérifier</button>
        <div class="feedback" id="cin7fb3"></div>
      </div>
    </div>
  `
};

CINET_NOVA_KB[cinKey('Catalyse et cinétique chimique hétérogène')] = {
  intro: "Salut, c'est Nova ! On est sur « Catalyse et cinétique chimique hétérogène ». Demande-moi la différence adsorption/absorption, l'isotherme de Langmuir, ou un indice sur un exercice.",
  rules: [
    { test:/catalyseur|catalyse/i, replies:["Un catalyseur accélère une réaction en abaissant Ea (nouveau chemin réactionnel), sans changer ΔH ni la position de l'équilibre — il accélère la réaction directe ET inverse dans les mêmes proportions."] },
    { test:/adsorption.*absorption|absorption.*adsorption/i, replies:["L'adsorption est un phénomène de SURFACE (l'adsorbat s'accumule à l'interface) ; l'absorption est un phénomène de VOLUME (le composé se dissout dans toute la phase)."] },
    { test:/langmuir/i, replies:["Langmuir décrit une adsorption en MONOCOUCHE : 1/Vads = 1/(Vmono·Keq)·(1/PA) + 1/Vmono. Le tracé 1/Vads vs 1/PA donne une droite."] },
    { test:/b\.?e\.?t\.?/i, replies:["B.E.T. étend Langmuir à une adsorption MULTICOUCHE : P/((P0-P)Vads) vs P/P0 donne une droite, utilisée pour mesurer la surface spécifique d'un solide poreux."] },
    { test:/freundlich/i, replies:["Freundlich est une loi empirique (souvent en phase liquide) : x/m=K·C^(1/n), soit ln(x/m)=lnK+(1/n)lnC — une droite en ln(x/m) vs lnC."] },
    { test:/physisorption|chimisorption/i, replies:["La physisorption (van der Waals, faible, réversible) est favorisée à basse température ; la chimisorption (liaisons fortes, souvent irréversible) modifie profondément la répartition électronique de l'adsorbat."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : un catalyseur agit-il sur la thermodynamique ou sur la cinétique ?","Indice niveau 2 : uniquement sur la cinétique, via Ea.","Indice niveau 3 : il ne change donc ni ΔH ni l'équilibre."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : reprends la forme linéarisée de Langmuir.","Indice niveau 2 : elle fait apparaître des grandeurs inverses.","Indice niveau 3 : c'est 1/Vads en fonction de 1/PA."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : qu'ajoute B.E.T. par rapport à Langmuir ?","Indice niveau 2 : plusieurs couches d'adsorbat, pas une seule.","Indice niveau 3 : c'est le modèle multicouche."] }
  ]
};

/* =========================== CHAPITRE 8 — synthèse =========================== */
CINET_CHAPTERS[cinKey('Méthodologie — exercices type examen')] = {
  objectives: [
    "Identifier la méthode adaptée (graphique, temps de demi-vie, vitesses initiales) face à un jeu de données cinétiques",
    "Mener un calcul complet de constante de vitesse et d'énergie d'activation à partir de données brutes",
    "Reconnaître le type de mécanisme (simple, composé, en chaîne, catalytique) à partir d'un énoncé",
    "S'entraîner sur une méthode complète et structurée, comme attendu à l'examen"
  ],
  prereqs: ["Catalyse et cinétique chimique hétérogène"],
  bodyHtml: `
    <p>Ce chapitre de synthèse propose une méthode de résolution structurée, applicable à la quasi-totalité des exercices de cinétique chimique rencontrés en examen, puis l'illustre sur des exemples résolus intégralement.</p>

    <h3>1. Grille de lecture d'un énoncé de cinétique</h3>
    <ol style="margin-left:1.2em; color:var(--ink-soft);">
      <li><strong>Quelle grandeur est suivie ?</strong> Concentration, pression partielle, volume de gaz dégagé, absorbance... — tout ramener à une grandeur proportionnelle à la concentration du réactif étudié.</li>
      <li><strong>Un ordre est-il donné ou doit-il être déterminé ?</strong> Si l'unité de $k$ est fournie, elle donne l'ordre directement (chapitre 2). Sinon, appliquer la méthode graphique ou celle du temps de demi-vie (chapitre 3).</li>
      <li><strong>La réaction est-elle simple, composée, ou complexe ?</strong> Un mot-clé (« équilibre », « radical », « catalyseur », « en chaîne », « intermédiaire ») orainte vers les chapitres 4, 5 ou 7.</li>
      <li><strong>La température varie-t-elle dans l'énoncé ?</strong> Si oui, penser systématiquement à la loi d'Arrhenius (chapitre 6).</li>
      <li><strong>Vérifier les unités</strong> à chaque étape — c'est souvent le moyen le plus rapide de repérer une erreur d'ordre ou de formule.</li>
    </ol>

    <h3>2. Exemple résolu 1 — identification de l'ordre par la méthode du temps de demi-vie</h3>
    <div class="example-box">
      <p><strong>Énoncé.</strong> Pour la décomposition de l'ammoniac, le temps de demi-vie mesuré est $t_{1/2}=7{,}6\\\\ \\\\text{min}$ pour $P_0=35{,}33\\\\ \\\\text{kPa}$, puis $t_{1/2}=3{,}7\\\\ \\\\text{min}$ pour $P_0=17{,}66\\\\ \\\\text{kPa}$ (pression divisée par 2). Déterminer l'ordre et $k$.</p>
      <p><strong>Résolution.</strong> $t_{1/2}$ est divisé par 2 quand $P_0$ est divisée par 2 : $t_{1/2}$ est donc proportionnel à $P_0$, ce qui correspond à un <strong>ordre 0</strong>, avec $t_{1/2}=P_0/(2k)$. On calcule alors $k=P_0/(2t_{1/2}) \\\\approx 2{,}3$–$2{,}5\\\\ \\\\text{kPa}\\\\cdot\\\\text{min}^{-1}$ pour chaque expérience — la constance de $k$ confirme l'ordre 0.</p>
    </div>

    <h3>3. Exemple résolu 2 — détermination d'ordres partiels par les vitesses initiales</h3>
    <div class="example-box">
      <p><strong>Énoncé.</strong> Pour $\\\\text{C}_2\\\\text{H}_5\\\\text{I}+\\\\text{OH}^- \\\\to \\\\text{C}_2\\\\text{H}_5\\\\text{OH}+\\\\text{I}^-$, trois expériences donnent des vitesses initiales différentes selon les concentrations initiales des deux réactifs. Déterminer la loi de vitesse complète.</p>
      <p><strong>Résolution.</strong> En comparant deux expériences où seule $[\\\\text{OH}^-]_0$ varie, on isole $\\\\beta$ (ordre partiel en OH⁻) ; en comparant deux expériences où seule $[\\\\text{C}_2\\\\text{H}_5\\\\text{I}]_0$ varie, on isole $\\\\alpha$. On trouve ici $\\\\alpha=\\\\beta=1$, donc $V=k[\\\\text{C}_2\\\\text{H}_5\\\\text{I}][\\\\text{OH}^-]$ (ordre global 2), et $k$ se calcule directement à partir de n'importe quelle expérience.</p>
    </div>

    <h3>4. Exemple résolu 3 — de l'énergie d'activation à une prédiction de vitesse</h3>
    <div class="example-box">
      <p><strong>Énoncé.</strong> Connaissant $E_a$ et $k$ à une température $T_1$, prédire $k$ à une température $T_2$.</p>
      <p><strong>Résolution.</strong> On utilise la forme à deux températures de la loi d'Arrhenius (chapitre 6) : $\\\\ln\\\\dfrac{k_2}{k_1}=-\\\\dfrac{E_a}{R}\\\\left(\\\\dfrac{1}{T_2}-\\\\dfrac{1}{T_1}\\\\right)$, qu'on résout pour $k_2$. Ce raisonnement est très fréquent en examen pour tester la compréhension de la sensibilité exponentielle de $k$ à la température.</p>
    </div>

    <h3>5. Pièges classiques à l'examen</h3>
    <table class="mini-table">
      <tr><th>Piège</th><th>Comment l'éviter</th></tr>
      <tr><td>Confondre coefficient stœchiométrique et ordre partiel</td><td>Se rappeler que seule une réaction élémentaire vérifie Van't Hoff (chapitre 5)</td></tr>
      <tr><td>Oublier de convertir T en Kelvin</td><td>Toujours vérifier l'unité de T avant d'utiliser Arrhenius</td></tr>
      <tr><td>Mauvais signe dans $V=-\\\\frac1a\\\\frac{d[A]}{dt}$</td><td>Réactif → signe (−) ; produit → signe (+) (chapitre 1)</td></tr>
      <tr><td>Appliquer l'AEQS à un réactif ou produit stable</td><td>L'AEQS ne s'applique qu'à un intermédiaire réactionnel de courte durée de vie (chapitre 5)</td></tr>
    </table>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ Méthode générale à suivre en examen</span>
      <ul>
        <li>1. Identifier la grandeur suivie et la ramener à une concentration ou une pression</li>
        <li>2. Déterminer (ou vérifier) l'ordre : unité de k, méthode graphique, temps de demi-vie ou vitesses initiales</li>
        <li>3. Identifier le type de mécanisme (simple / composé / complexe / catalytique) à partir des mots-clés de l'énoncé</li>
        <li>4. Si la température varie, appliquer systématiquement la loi d'Arrhenius</li>
        <li>5. Vérifier la cohérence des unités à chaque étape du calcul</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes en situation d'examen</span>
      <ul>
        <li>Se lancer dans un calcul sans avoir d'abord identifié clairement l'ordre de la réaction</li>
        <li>Oublier de vérifier la constance de k après avoir choisi un ordre par méthode graphique ou par temps de demi-vie</li>
        <li>Négliger de vérifier les unités finales du résultat (souvent révélateur d'une erreur d'ordre ou de formule)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices de synthèse</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le temps de demi-vie d'une réaction est mesuré indépendant de la concentration initiale, sur plusieurs expériences. L'ordre de cette réaction est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin8e1" value="wrong"> 0</label>
          <label class="option"><input type="radio" name="cin8e1" value="right"> 1</label>
          <label class="option"><input type="radio" name="cin8e1" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="cin8e1" value="wrong"> On ne peut rien conclure</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin8e1','cin8fb1','Correct — t1/2 indépendant de [A]0 est la signature caractéristique de l\\\\'ordre 1 (t1/2=ln2/k).','Repense au tableau récapitulatif du chapitre 2 : quel ordre a un t1/2 indépendant de la concentration initiale ?')">Vérifier</button>
        <div class="feedback" id="cin8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un énoncé mentionne un intermédiaire radicalaire régénéré à chaque cycle. Quel outil de résolution est le plus adapté ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin8e2" value="wrong"> La loi d'Arrhenius directement</label>
          <label class="option"><input type="radio" name="cin8e2" value="wrong"> L'isotherme de Langmuir</label>
          <label class="option"><input type="radio" name="cin8e2" value="right"> L'Approximation de l'État Quasi-Stationnaire (AEQS)</label>
          <label class="option"><input type="radio" name="cin8e2" value="wrong"> Le tracé de [A] en fonction de t</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin8e2','cin8fb2','Correct — un radical régénéré à chaque cycle signale un mécanisme en chaîne : on y applique l\\\\'AEQS pour éliminer sa concentration de la loi de vitesse finale.','Un intermédiaire radicalaire régénéré à chaque cycle est la signature d\\\\'un mécanisme en chaîne (chapitre 5) : quel outil sert justement à traiter ces intermédiaires ?')">Vérifier</button>
        <div class="feedback" id="cin8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Connaissant $k_1$ à $T_1$ et $E_a$, la formule correcte pour prédire $k_2$ à $T_2$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cin8e3" value="right"> $\\\\ln(k_2/k_1) = -\\\\dfrac{E_a}{R}\\\\left(\\\\dfrac1{T_2}-\\\\dfrac1{T_1}\\\\right)$</label>
          <label class="option"><input type="radio" name="cin8e3" value="wrong"> $k_2 = k_1 + E_a(T_2-T_1)$</label>
          <label class="option"><input type="radio" name="cin8e3" value="wrong"> $k_2/k_1 = T_2/T_1$</label>
          <label class="option"><input type="radio" name="cin8e3" value="wrong"> $k_2 = k_1 \\\\times E_a$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cin8e3','cin8fb3','Correct — c\\\\'est exactement la forme à deux températures de la loi d\\\\'Arrhenius, obtenue en soustrayant ln k1 et ln k2.','Repars de ln k = ln A - Ea/(RT) écrite aux deux températures, puis soustrais les deux équations pour éliminer ln A.')">Vérifier</button>
        <div class="feedback" id="cin8fb3"></div>
      </div>
    </div>
  `
};

CINET_NOVA_KB[cinKey('Méthodologie — exercices type examen')] = {
  intro: "Salut, c'est Nova ! On est sur le chapitre de méthodologie de « Cinétique chimique ». Demande-moi comment aborder un exercice, ou un indice sur un exercice.",
  rules: [
    { test:/m[ée]thode|comment aborder|comment faire/i, replies:["Méthode générale : 1) identifie la grandeur suivie, 2) détermine l'ordre (unité de k, méthode graphique ou temps de demi-vie), 3) identifie le type de mécanisme, 4) si T varie, pense à Arrhenius, 5) vérifie les unités à chaque étape."] },
    { test:/pi[èe]ge/i, replies:["Les pièges classiques : confondre ordre partiel et coefficient stœchiométrique, oublier de convertir T en Kelvin, se tromper de signe dans la vitesse, appliquer l'AEQS à une espèce qui n'est pas un intermédiaire réactionnel."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : quel ordre a un t1/2 indépendant de [A]0 ?","Indice niveau 2 : repense au tableau du chapitre 2.","Indice niveau 3 : c'est l'ordre 1."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : un radical régénéré à chaque cycle signale quel type de mécanisme ?","Indice niveau 2 : un mécanisme en chaîne.","Indice niveau 3 : on y applique l'AEQS pour traiter l'intermédiaire."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : écris la loi d'Arrhenius aux deux températures puis soustrais.","Indice niveau 2 : ln A s'élimine dans la soustraction.","Indice niveau 3 : il reste ln(k2/k1)=-(Ea/R)(1/T2-1/T1)."] }
  ]
};

/* fusionne le module Cinétique chimique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, CINET_CHAPTERS);
Object.assign(NOVA_KB, CINET_NOVA_KB);