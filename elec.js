/* =====================================================================
   CHUNK « elec » — registre ELEC_CHAPTERS / ELEC_NOVA_KB
   Matière(s) : Physique|Électrocinétique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   ELEC_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* ============================================================================
   MODULE ÉLECTROCINÉTIQUE — Physique L1
   (contenu conforme au programme standard de L1 : lois de Kirchhoff, dipôles
   et théorèmes généraux, régimes transitoires RC/RL, régime sinusoïdal permanent
   — structure vérifiée auprès des maquettes LMD francophones usuelles)
   Structure identique aux autres modules : ELEC_CHAPTERS / ELEC_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const ELEC_MATIERE = 'Électrocinétique';
function elecKey(chapterTitle){ return `Physique|${ELEC_MATIERE}|${chapterTitle}`; }
const ELEC_CHAPTERS = {};
const ELEC_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Diviseur de tension (Chapitre 2)
--------------------------------------------------------------------------------- */
function updateElecDivider(){
  const E = parseFloat(document.getElementById('elecDivE').value);
  const R1 = parseFloat(document.getElementById('elecDivR1').value);
  const R2 = parseFloat(document.getElementById('elecDivR2').value);
  const Vs = E * R2/(R1+R2);
  const I = E/(R1+R2);
  document.getElementById('elecDivEVal').textContent = E.toFixed(1);
  document.getElementById('elecDivR1Val').textContent = R1.toFixed(0);
  document.getElementById('elecDivR2Val').textContent = R2.toFixed(0);
  document.getElementById('elecDivReadout').innerHTML =
    `I = E/(R₁+R₂) = ${E.toFixed(1)}/${(R1+R2).toFixed(0)} = <strong>${(I*1000).toFixed(2)} mA</strong><br>` +
    `V_s = E·R₂/(R₁+R₂) = <strong>${Vs.toFixed(2)} V</strong>`;
}
function initElecDivider(){ updateElecDivider(); }

/* =========================== CHAPITRE 1 — Lois fondamentales des circuits électriques =========================== */
ELEC_CHAPTERS[elecKey('Lois fondamentales des circuits électriques')] = {
  objectives: [
    "Définir intensité, tension et résistance, et énoncer la loi d'Ohm",
    "Appliquer la loi des nœuds et la loi des mailles (lois de Kirchhoff) à un circuit",
    "Calculer la puissance dissipée dans un dipôle et énoncer la loi de Joule",
    "Utiliser les conventions récepteur et générateur pour orienter correctement un circuit",
    "Analyser un circuit électrique inconnu pour évaluer quelles lois (nœuds, mailles, Ohm) suffisent à le résoudre complètement"
  ],
  prereqs: ["Outils mathématiques pour la physique"],
  bodyHtml: `
    <p>En 1845, un étudiant allemand de 21 ans nommé Gustav Kirchhoff publie deux lois d'une simplicité déconcertante — la conservation du courant à un nœud, la conservation de la tension sur une boucle — qui vont pourtant suffire, à elles seules, à résoudre n'importe quel circuit électrique aussi compliqué soit-il. Il n'invente rien de nouveau physiquement : il traduit simplement en langage de circuit deux principes déjà connus, la conservation de la charge et la conservation de l'énergie.</p>
    <p>Ces deux lois n'ont pas pris une ride depuis 1845 : ce sont elles, exactement, qu'un ingénieur utilise pour concevoir le circuit d'alimentation d'un smartphone, qu'un électricien applique en dimensionnant le tableau électrique d'une maison, ou qu'un logiciel de simulation (SPICE et ses dérivés) résout des milliards de fois par seconde pour concevoir un microprocesseur.</p>
    <p>Ce chapitre pose le vocabulaire et les deux lois fondamentales de tout circuit électrique. Maîtrisées, elles te permettront d'aborder n'importe quel circuit — aussi complexe soit-il visuellement — avec une méthode systématique et jamais prise en défaut.</p>

    <h3>1. Intensité et tension</h3>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Définition</th><th>Unité</th></tr>
      <tr><td>Intensité $i$</td><td>débit de charges électriques, $i=\\dfrac{dq}{dt}$</td><td>ampère (A)</td></tr>
      <tr><td>Tension $u_{AB}$</td><td>différence de potentiel entre deux points, $u_{AB}=V_A-V_B$</td><td>volt (V)</td></tr>
    </table>
    <p>Pour un <strong>conducteur ohmique</strong> (résistance $R$), la loi d'Ohm relie tension et intensité : $u=Ri$ (en convention récepteur, la flèche de tension et la flèche de courant sont opposées).</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 60" width="100%">
          <line x1="10" y1="30" x2="45" y2="30" stroke="#EAF0FB" stroke-width="1.6"/>
          <rect x="45" y="20" width="30" height="20" fill="none" stroke="#4C7CFF" stroke-width="1.6"/>
          <line x1="75" y1="30" x2="130" y2="30" stroke="#EAF0FB" stroke-width="1.6"/>
          <text x="52" y="15" font-family="IBM Plex Mono" font-size="10" fill="#4C7CFF">R</text>
          <line x1="45" y1="48" x2="75" y2="48" stroke="#F0B94D" stroke-width="1.2" marker-end="url(#elecArrU)"/>
          <text x="52" y="58" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">u</text>
          <line x1="20" y1="20" x2="30" y2="20" stroke="#2DD4C4" stroke-width="1.2" marker-end="url(#elecArrI)"/>
          <text x="18" y="14" font-family="IBM Plex Mono" font-size="8" fill="#2DD4C4">i</text>
          <defs>
            <marker id="elecArrU" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#F0B94D"/></marker>
            <marker id="elecArrI" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker>
          </defs>
        </svg>
        <span>Convention récepteur : les flèches i et u sont opposées ; loi d'Ohm u=Ri</span>
      </div>
    </div>

    <h3>2. Loi des nœuds (1ère loi de Kirchhoff)</h3>
    <p>En un <strong>nœud</strong> (point de jonction d'au moins 3 fils), la somme des intensités qui arrivent est égale à la somme des intensités qui repartent — traduction directe de la conservation de la charge électrique :</p>
    <div class="formula-box">$$\\sum i_{entrants} = \\sum i_{sortants}$$</div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La loi des nœuds suppose qu'aucune charge ne s'accumule au niveau du nœud lui-même. Pourquoi cette hypothèse est-elle presque toujours vraie dans un circuit électronique classique, et dans quel composant électronique très courant serait-elle, au contraire, mise en défaut si on l'appliquait naïvement à ses deux bornes séparément ?
    </div>

    <h3>3. Loi des mailles (2ème loi de Kirchhoff)</h3>
    <p>Le long d'une <strong>maille</strong> (boucle fermée du circuit), la somme algébrique des tensions, parcourue dans un sens donné, est nulle :</p>
    <div class="formula-box">$$\\sum u_i = 0 \\quad \\text{(en parcourant la maille dans un sens choisi)}$$</div>
    <div class="key-point">
      <span class="eyebrow">Méthode</span>
      1) Orienter arbitrairement chaque branche (flèches de courant). 2) Choisir un sens de parcours pour chaque maille. 3) Compter positivement une tension si la flèche est dans le sens du parcours, négativement sinon. 4) Écrire autant d'équations de mailles indépendantes que nécessaire pour résoudre le système.
    </div>

    <h3>4. Puissance et loi de Joule</h3>
    <p>La puissance électrique reçue par un dipôle en convention récepteur est $P=ui$. Pour un conducteur ohmique, cette puissance est intégralement dissipée sous forme de chaleur — c'est l'<strong>effet Joule</strong> :</p>
    <div class="formula-box">$$P = ui = Ri^2 = \\frac{u^2}{R}$$</div>

    <h3>5. Conventions récepteur et générateur</h3>
    <table class="mini-table">
      <tr><th>Convention</th><th>Orientation de i par rapport à u</th><th>Usage typique</th></tr>
      <tr><td>Récepteur</td><td>flèches opposées</td><td>résistances, condensateurs, bobines (dipôles passifs)</td></tr>
      <tr><td>Générateur</td><td>flèches dans le même sens</td><td>piles, générateurs (dipôles actifs)</td></tr>
    </table>
    <p>Avec la convention générateur, un générateur idéal de force électromotrice $e$ impose $u=e$ à ses bornes (à vide) ; un générateur réel s'écrit $u=e-ri$ (avec $r$ sa résistance interne).</p>
    <p><strong>Cas limite à retenir :</strong> une pile n'est pas toujours « générateur » au sens électrique — si on la recharge (courant imposé en sens inverse par un chargeur), elle fonctionne alors en <em>convention récepteur</em> et reçoit de la puissance au lieu d'en fournir. La convention dépend du sens réel du transfert d'énergie à l'instant considéré, pas de la nature « pile » ou « résistance » du composant.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une résistance chauffe toujours, quel que soit le sens du courant qui la traverse (P=Ri² est toujours positif). Une pile, elle, peut aussi bien fournir de l'énergie que — dans certaines conditions — en recevoir. Quelle différence physique fondamentale entre les deux composants explique cette dissymétrie ?
    </div>

    <h3>6. Frontière de la recherche — au-delà de l'ARQS</h3>
    <p>Ce chapitre entier repose sur l'ARQS (approximation des régimes quasi-stationnaires) : les grandeurs électriques sont supposées se propager instantanément dans le circuit. Cette hypothèse s'effondre dès que les fréquences deviennent très élevées ou les circuits très grands — c'est précisément le domaine des microprocesseurs modernes, où les signaux changent des milliards de fois par seconde et où les pistes de circuit imprimé doivent être traitées comme de véritables lignes de transmission, avec des effets de propagation et de réflexion du signal impossibles à ignorer.</p>
    <p><strong>Question ouverte :</strong> au fur et à mesure que les puces électroniques intègrent des transistors toujours plus petits et plus rapprochés (quelques nanomètres aujourd'hui), les lois de Kirchhoff classiques doivent être complétées par des effets quantiques (effet tunnel, bruit thermique à l'échelle atomique) — jusqu'où peut-on miniaturiser un circuit avant que ces lois « macroscopiques » ne cessent complètement de s'appliquer ? C'est une question centrale de la recherche en micro-électronique.</p>
    <p><strong>Technologie émergente :</strong> l'électronique supraconductrice, utilisée notamment dans les processeurs quantiques, fonctionne à des températures proches du zéro absolu où la résistance électrique s'annule exactement — un régime où la loi de Joule que tu viens d'apprendre ($P=Ri^2$) devient nulle, avec des conséquences radicales sur la gestion thermique de ces systèmes.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Charge → intensité $i=dq/dt$ → circuit → loi des nœuds (charge) + loi des mailles (énergie) → résolution complète
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\sum i_{entrants} = \\sum i_{sortants} \\qquad\\qquad \\sum u_i = 0 \\text{ (sur une maille)}$$
      Ces deux lois, à elles seules, suffisent à résoudre n'importe quel circuit électrique linéaire — tout le reste du cours d'électrocinétique n'est qu'une application méthodique de ces deux principes.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Loi des nœuds : Σi_entrants = Σi_sortants (conservation de la charge)</li>
        <li>Loi des mailles : Σu_i = 0 le long de toute boucle fermée (à condition de respecter les signes)</li>
        <li>Loi d'Ohm : u=Ri (convention récepteur) ; effet Joule : P=Ri²=u²/R (toujours positive, dissipative)</li>
        <li>Convention récepteur (flèches opposées) pour un dipôle passif ; convention générateur (flèches identiques) pour un dipôle actif</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Mélanger convention récepteur et générateur dans un même calcul sans s'en rendre compte — vérifier systématiquement le sens des flèches</li>
        <li>Oublier un signe négatif dans la loi des mailles quand une tension est comptée dans le sens opposé au parcours choisi</li>
        <li>Confondre intensité (grandeur algébrique, peut être négative selon l'orientation choisie) et sa valeur absolue</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une résistance de 100 Ω est parcourue par un courant de 0,5 A. La puissance qu'elle dissipe est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec1e1" value="wrong"> 50 W</label>
          <label class="option"><input type="radio" name="elec1e1" value="right"> 25 W</label>
          <label class="option"><input type="radio" name="elec1e1" value="wrong"> 200 W</label>
          <label class="option"><input type="radio" name="elec1e1" value="wrong"> 0,5 W</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec1e1','elec1fb1','Correct — P=Ri²=100×0,5²=100×0,25=25 W.','Utilise P=Ri² avec R=100 et i=0,5.')">Vérifier</button>
        <div class="feedback" id="elec1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">En un nœud où arrivent deux courants de 2 A et 3 A, et d'où repart un seul courant, ce dernier vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec1e2" value="wrong"> 1 A</label>
          <label class="option"><input type="radio" name="elec1e2" value="right"> 5 A</label>
          <label class="option"><input type="radio" name="elec1e2" value="wrong"> 6 A</label>
          <label class="option"><input type="radio" name="elec1e2" value="wrong"> 2,5 A</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec1e2','elec1fb2','Correct — la loi des nœuds impose Σi_entrants=Σi_sortants, donc 2+3=5 A.','Applique la loi des nœuds : la somme des courants entrants égale la somme des sortants.')">Vérifier</button>
        <div class="feedback" id="elec1fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour un générateur réel de f.é.m. e et de résistance interne r, la tension à ses bornes s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec1e3" value="wrong"> u = e + ri</label>
          <label class="option"><input type="radio" name="elec1e3" value="right"> u = e − ri</label>
          <label class="option"><input type="radio" name="elec1e3" value="wrong"> u = ri</label>
          <label class="option"><input type="radio" name="elec1e3" value="wrong"> u = e (toujours)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec1e3','elec1fb3','Correct — la chute de tension interne ri se soustrait à la f.é.m. idéale e : c\\'est le modèle de Thévenin du générateur réel.','La résistance interne r fait CHUTER la tension utile par rapport à la f.é.m. idéale e.')">Vérifier</button>
        <div class="feedback" id="elec1fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Un circuit comporte 4 nœuds et 6 branches. Sans résoudre le circuit, propose une démarche pour déterminer combien d'équations de nœuds indépendantes et combien d'équations de mailles indépendantes tu peux écrire, sachant qu'une des équations de nœuds est toujours redondante (elle se déduit des autres). Combien d'inconnues (les 6 courants de branche) cela permet-il, au total, de déterminer ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : avec $n$ nœuds, seules $n-1$ équations de nœuds sont indépendantes. Combien d'équations de mailles indépendantes faut-il alors pour atteindre le nombre total d'inconnues (6) ?</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la vitesse de propagation du signal électrique dans un circuit n'était pas très supérieure à la fréquence de variation du signal : que deviendrait la loi des mailles, censée s'appliquer « instantanément » sur toute la boucle ?</li>
        <li>Pourquoi peut-on dire que la loi des nœuds est une loi de conservation (de la charge), alors que la loi des mailles est plutôt une loi de conservation de l'énergie déguisée en loi de tension ?</li>
        <li>Quelle serait la conséquence, pour la sécurité électrique domestique, d'un monde où la loi de Joule ne s'appliquerait pas aux fils électriques eux-mêmes (seulement aux appareils branchés) ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>G. Kirchhoff, « Ueber die Auflösung der Gleichungen, auf welche man bei der Untersuchung der linearen Vertheilung galvanischer Ströme geführt wird », <em>Annalen der Physik</em>, 1845 — article fondateur des deux lois de Kirchhoff.</li>
        <li>J.-P. Pérez, <em>Électronique — Fondements et applications</em>, Dunod (chapitres sur les circuits en régime continu).</li>
        <li>L. W. Nagel, « SPICE: A Computer Program to Simulate Semiconductor Circuits », University of California, Berkeley, 1973 — origine des logiciels modernes de simulation de circuits fondés sur ces mêmes lois.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Les lois de Kirchhoff que tu maîtrises désormais te suivront dans tout le reste de l'électrocinétique — et bien au-delà, en électronique et en traitement du signal. Le chapitre suivant, « Dipôles, associations et théorèmes généraux », t'apprendra à simplifier des circuits entiers avant même d'écrire la moindre équation. Comme le disait Kirchhoff lui-même avec la modestie propre aux grands scientifiques : il n'avait fait que « mettre en évidence des vérités déjà présentes dans la nature ».</p>
  `
};

ELEC_NOVA_KB[elecKey('Lois fondamentales des circuits électriques')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Lois fondamentales des circuits électriques ». Demande-moi les lois de Kirchhoff, la loi de Joule, ou un indice sur un exercice.",
  rules: [
    { test:/loi des n[oœ]uds/i, replies:["La loi des nœuds : en tout point de jonction, la somme des courants entrants égale la somme des courants sortants — c'est la conservation de la charge électrique."] },
    { test:/loi des mailles/i, replies:["La loi des mailles : en parcourant une boucle fermée du circuit, la somme algébrique des tensions (en respectant les signes selon le sens de parcours) est nulle."] },
    { test:/loi d.ohm/i, replies:["La loi d'Ohm : u=Ri (en convention récepteur, flèches de u et i opposées) pour un conducteur ohmique de résistance R."] },
    { test:/effet joule|puissance/i, replies:["L'effet Joule : un conducteur ohmique dissipe une puissance P=Ri²=u²/R sous forme de chaleur, toujours positive (dissipative)."] },
    { test:/convention r[ée]cepteur|convention g[ée]n[ée]rateur/i, replies:["Convention récepteur (flèches i et u opposées) pour les dipôles passifs (R, C, L). Convention générateur (flèches dans le même sens) pour les dipôles actifs (piles, générateurs)."] },
    { test:/f[ée]m|force [ée]lectromotrice|g[ée]n[ée]rateur r[ée]el/i, replies:["Un générateur réel a pour modèle u=e−ri : e est la f.é.m. idéale, r la résistance interne qui fait chuter la tension utile quand un courant circule."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique P=Ri².","Indice niveau 2 : R=100, i=0,5, donc i²=0,25.","Indice niveau 3 : P=25 W."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise la loi des nœuds.","Indice niveau 2 : la somme des courants entrants (2+3) égale le courant sortant.","Indice niveau 3 : 5 A."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense au modèle de Thévenin du générateur réel.","Indice niveau 2 : la résistance interne fait CHUTER la tension.","Indice niveau 3 : u = e − ri."] }
  ]
};

/* =========================== CHAPITRE 2 — Dipôles, associations et théorèmes généraux =========================== */
ELEC_CHAPTERS[elecKey('Dipôles, associations et théorèmes généraux')] = {
  objectives: [
    "Calculer la résistance équivalente d'associations série et parallèle de résistances",
    "Utiliser les formules du diviseur de tension et du diviseur de courant",
    "Appliquer le théorème de Thévenin ou de Norton pour simplifier un réseau linéaire",
    "Utiliser le théorème de superposition pour un circuit à plusieurs sources",
    "Analyser un réseau complexe pour évaluer la méthode de simplification (association, Thévenin, superposition, Millman) la plus rapide selon sa structure"
  ],
  prereqs: ["Puissance en régime stationnaire"],
  bodyHtml: `
    <p>Léon Charles Thévenin, ingénieur des télégraphes français, publie en 1883 un théorème dont la puissance pratique dépasse de loin sa simplicité apparente : n'importe quel réseau électrique linéaire, aussi tentaculaire soit-il, se comporte — vu de deux bornes seulement — exactement comme une simple pile en série avec une résistance. Ce résultat n'a rien d'évident a priori, et pourtant il est devenu l'un des outils les plus utilisés de toute l'ingénierie électrique.</p>
    <p>Cette capacité à « réduire » un circuit complexe est ce qui permet à un ingénieur de concevoir un chargeur de téléphone sans avoir à connaître dans le détail tout ce qui est branché derrière la prise murale, ou à un architecte de circuits intégrés de raisonner sur des milliards de transistors sans jamais tous les modéliser un par un.</p>
    <p>Ce chapitre te donne l'arsenal des théorèmes de simplification les plus puissants de l'électrocinétique — des raccourcis de calcul qui, une fois maîtrisés, transformeront ta façon même de regarder un circuit électrique.</p>

    <h3>1. Associations de résistances</h3>
    <table class="mini-table">
      <tr><th>Association</th><th>Résistance équivalente</th></tr>
      <tr><td>Série ($R_1,R_2,\\dots$ parcourues par le même courant)</td><td>$R_{eq}=R_1+R_2+\\dots$</td></tr>
      <tr><td>Parallèle (même tension à leurs bornes)</td><td>$\\dfrac{1}{R_{eq}}=\\dfrac{1}{R_1}+\\dfrac{1}{R_2}+\\dots$</td></tr>
    </table>
    <p>Pour deux résistances en parallèle seulement, une formule directe est souvent plus rapide : $R_{eq}=\\dfrac{R_1R_2}{R_1+R_2}$.</p>

    <h3>2. Diviseur de tension et diviseur de courant</h3>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 130 90" width="100%">
          <line x1="20" y1="10" x2="20" y2="80" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="20" y1="10" x2="60" y2="10" stroke="#EAF0FB" stroke-width="1.6"/>
          <rect x="50" y="15" width="20" height="20" fill="none" stroke="#4C7CFF" stroke-width="1.4"/>
          <text x="52" y="12" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">R₁</text>
          <line x1="60" y1="35" x2="60" y2="45" stroke="#EAF0FB" stroke-width="1.6"/>
          <rect x="50" y="45" width="20" height="20" fill="none" stroke="#2DD4C4" stroke-width="1.4"/>
          <text x="52" y="43" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">R₂</text>
          <line x1="60" y1="65" x2="60" y2="80" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="20" y1="80" x2="60" y2="80" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="70" y1="55" x2="100" y2="55" stroke="#F0B94D" stroke-width="1.4" stroke-dasharray="2,2"/>
          <text x="80" y="50" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">Vs</text>
        </svg>
        <span>Diviseur de tension : deux résistances en série, tension mesurée aux bornes de R₂</span>
      </div>
    </div>
    <div class="formula-box">$$V_s = E\\cdot\\frac{R_2}{R_1+R_2} \\qquad \\text{(diviseur de tension)} \\qquad\\qquad i_2 = i\\cdot\\frac{R_1}{R_1+R_2} \\qquad \\text{(diviseur de courant, pour deux branches parallèles)}$$</div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Dans le diviseur de tension, Vs est proportionnelle à R2 (la résistance SUR laquelle on mesure). Dans le diviseur de courant, i2 est proportionnel à R1 (l'AUTRE résistance). Ces deux formules semblent « inversées » l'une par rapport à l'autre — sais-tu expliquer pourquoi, à partir de la loi d'Ohm et de la conservation du courant/de la tension ?
    </div>

    <h3>3. Théorème de superposition</h3>
    <p>Dans un circuit <strong>linéaire</strong> comportant plusieurs sources indépendantes, la réponse (tension ou courant) en un point est la <strong>somme</strong> des réponses obtenues en ne faisant agir qu'une seule source à la fois (les autres sources de tension étant court-circuitées, les autres sources de courant étant remplacées par un circuit ouvert).</p>

    <h3>4. Théorèmes de Thévenin et de Norton</h3>
    <p>Vu depuis deux bornes $A,B$, <strong>tout réseau linéaire</strong> (aussi complexe soit-il) est équivalent à :</p>
    <table class="mini-table">
      <tr><th>Modèle</th><th>Équivalent</th><th>Détermination</th></tr>
      <tr><td>Thévenin</td><td>un générateur de tension $E_{Th}$ en série avec une résistance $R_{Th}$</td><td>$E_{Th}$ = tension à vide entre A et B ; $R_{Th}$ = résistance vue des bornes, sources éteintes</td></tr>
      <tr><td>Norton</td><td>un générateur de courant $I_N$ en parallèle avec $R_N$</td><td>$I_N$ = courant de court-circuit entre A et B ; $R_N=R_{Th}$</td></tr>
    </table>
    <p>Les deux modèles sont équivalents entre eux : $E_{Th}=R_N I_N$.</p>
    <div class="key-point">
      <span class="eyebrow">Pourquoi c'est si utile</span>
      Le théorème de Thévenin permet de remplacer tout un réseau, aussi compliqué soit-il, par deux composants seulement — extrêmement pratique pour étudier l'effet d'une charge variable connectée aux bornes A,B sans refaire tout le calcul du réseau à chaque fois.
    </div>
    <p><strong>Cas limite à surveiller :</strong> le théorème de Thévenin exige que le réseau soit <strong>linéaire</strong> — c'est-à-dire composé uniquement de résistances, sources indépendantes et sources liées linéaires. Un circuit contenant une diode ou un transistor (composants non linéaires) ne peut pas être réduit à un simple générateur de Thévenin sur toute sa plage de fonctionnement ; on ne peut au mieux le linéariser que localement, autour d'un point de fonctionnement donné.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Deux réseaux électriques totalement différents à l'intérieur (composants différents, topologie différente) peuvent avoir exactement le même générateur de Thévenin équivalent. Que peux-tu en conclure sur ce qu'un simple voltmètre-ampèremètre placé aux bornes A,B peut — ou ne peut pas — te révéler sur le contenu réel d'une « boîte noire » électrique ?
    </div>

    <h3>5. Théorème de Millman</h3>
    <p>Pour calculer directement le potentiel d'un nœud relié à $n$ branches (chacune comportant une source $E_i$ en série avec une résistance $R_i$), le théorème de Millman donne :</p>
    <div class="formula-box">$$V = \\frac{\\displaystyle\\sum_i \\frac{E_i}{R_i}}{\\displaystyle\\sum_i \\frac{1}{R_i}}$$</div>

    <h3>6. Frontière de la recherche — simplifier l'extrêmement complexe</h3>
    <p>Les théorèmes de ce chapitre suffisent pour un circuit de quelques dipôles — mais un microprocesseur moderne comporte plusieurs dizaines de milliards de transistors. Les logiciels de conception assistée par ordinateur (CAO électronique) utilisés par les fabricants de puces s'appuient sur des généralisations matricielles massives de ces mêmes lois (méthode des nœuds généralisée, analyse par matrices creuses) pour simuler des circuits entiers avant même leur fabrication physique — un enjeu économique colossal, une puce mal simulée coûtant potentiellement des centaines de millions de dollars à corriger une fois produite.</p>
    <p><strong>Question ouverte :</strong> à mesure que les circuits électroniques réduisent leurs tensions de fonctionnement (pour économiser l'énergie), le bruit électronique aléatoire (agitation thermique des électrons) devient proportionnellement plus important. Jusqu'où peut-on réduire les tensions d'un circuit numérique avant que ce bruit ne rende les théorèmes déterministes de ce chapitre insuffisants pour prédire correctement son comportement ? C'est un enjeu de recherche actif en microélectronique basse consommation.</p>
    <p><strong>Technologie émergente :</strong> les circuits reconfigurables (FPGA) permettent de modifier électroniquement la topologie même d'un réseau de portes logiques après fabrication — une flexibilité qui repose, au niveau le plus fondamental, sur exactement les mêmes lois d'association et de simplification de circuits que celles de ce chapitre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Réseau complexe → simplification (association, superposition) → modèle équivalent (Thévenin/Norton) → comportement vu de deux bornes
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$E_{Th} = R_N I_N$$
      L'équivalence entre les deux façons de voir n'importe quel réseau linéaire — un générateur de tension ou un générateur de courant — est la clé qui permet de choisir, selon le problème, la représentation la plus commode.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Série : Req=ΣRi. Parallèle : 1/Req=Σ(1/Ri), ou R1R2/(R1+R2) pour deux résistances</li>
        <li>Diviseur de tension : Vs=E·R2/(R1+R2) — retiens que Vs est proportionnelle à la résistance SUR LAQUELLE on mesure</li>
        <li>Thévenin : ETh (tension à vide) + RTh (résistance sources éteintes) en série ; Norton : IN (court-circuit) + RN en parallèle, avec ETh=RN·IN</li>
        <li>Superposition : n'activer qu'une source à la fois (tensions → court-circuit, courants → circuit ouvert), puis sommer les réponses</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Inverser R1 et R2 dans la formule du diviseur de tension — Vs est proportionnelle à la résistance SUR LAQUELLE on mesure la tension, pas à l'autre</li>
        <li>Oublier d'éteindre les autres sources (court-circuiter les tensions, ouvrir les courants) en appliquant la superposition</li>
        <li>Confondre résistance de Thévenin (calculée sources éteintes) et résistance totale du circuit sources actives</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — diviseur de tension</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre E, R₁ et R₂ : le calculateur donne le courant dans la maille et la tension de sortie Vs aux bornes de R₂.</p>
      <div class="sim-controls">
        <label>E (V) : <input type="number" id="elecDivE" value="12" style="width:60px;" oninput="updateElecDivider()"></label>
        <label>R₁ (Ω) : <input type="number" id="elecDivR1" value="1000" style="width:70px;" oninput="updateElecDivider()"></label>
        <label>R₂ (Ω) : <input type="number" id="elecDivR2" value="2000" style="width:70px;" oninput="updateElecDivider()"></label>
        <div class="sim-readout" id="elecDivReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Deux résistances de 100 Ω chacune, en parallèle, ont une résistance équivalente de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec2e1" value="wrong"> 200 Ω</label>
          <label class="option"><input type="radio" name="elec2e1" value="right"> 50 Ω</label>
          <label class="option"><input type="radio" name="elec2e1" value="wrong"> 100 Ω</label>
          <label class="option"><input type="radio" name="elec2e1" value="wrong"> 10000 Ω</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec2e1','elec2fb1','Correct — R1R2/(R1+R2)=100×100/200=50 Ω. En parallèle, la résistance équivalente est toujours plus petite que la plus petite des deux.','Utilise R_eq=R1R2/(R1+R2) avec R1=R2=100.')">Vérifier</button>
        <div class="feedback" id="elec2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La résistance de Thévenin d'un réseau se calcule en :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec2e2" value="wrong"> laissant toutes les sources actives</label>
          <label class="option"><input type="radio" name="elec2e2" value="right"> éteignant toutes les sources indépendantes</label>
          <label class="option"><input type="radio" name="elec2e2" value="wrong"> court-circuitant les bornes A et B</label>
          <label class="option"><input type="radio" name="elec2e2" value="wrong"> mesurant le courant de court-circuit</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec2e2','elec2fb2','Correct — RTh est la résistance vue des bornes A,B lorsque toutes les sources indépendantes sont éteintes (tensions court-circuitées, courants ouverts).','RTh se calcule sources ÉTEINTES, pas actives — sinon on obtiendrait autre chose.')">Vérifier</button>
        <div class="feedback" id="elec2fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans un diviseur de tension E-R1-R2, si R2 est très grande devant R1, la tension Vs aux bornes de R2 :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec2e3" value="wrong"> tend vers 0</label>
          <label class="option"><input type="radio" name="elec2e3" value="right"> tend vers E</label>
          <label class="option"><input type="radio" name="elec2e3" value="wrong"> reste égale à E/2</label>
          <label class="option"><input type="radio" name="elec2e3" value="wrong"> devient négative</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec2e3','elec2fb3','Correct — Vs=E·R2/(R1+R2), et si R2≫R1, ce rapport tend vers 1, donc Vs→E.','Vs=E·R2/(R1+R2) : que devient ce rapport si R2 est BEAUCOUP plus grand que R1 ?')">Vérifier</button>
        <div class="feedback" id="elec2fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Un réseau électrique complexe (plusieurs sources et résistances) alimente une résistance de charge $R_u$ variable branchée entre deux bornes A,B. Propose une démarche, fondée sur le théorème de Thévenin, pour déterminer la valeur de $R_u$ qui permet de recevoir la puissance maximale — sans jamais recalculer tout le réseau pour chaque valeur de $R_u$ testée. (Ce résultat est connu sous le nom de « théorème du transfert de puissance maximale ».)</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : une fois le réseau réduit à $E_{Th}$ et $R_{Th}$ en série avec $R_u$, exprime la puissance $P=R_u i^2$ reçue par $R_u$ en fonction de $R_u$ seul, puis cherche où cette fonction est maximale.</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si un réseau contenait une source dépendante (dont la valeur dépend d'une tension ou d'un courant ailleurs dans le circuit) : le théorème de superposition s'appliquerait-il encore de la même façon à cette source ?</li>
        <li>Pourquoi peut-on dire que le théorème de Millman n'est, au fond, qu'une application déguisée de la loi des nœuds combinée à la loi d'Ohm généralisée ?</li>
        <li>Quelle serait la conséquence, pour la conception d'un chargeur de batterie, d'un ingénieur qui confondrait résistance de Thévenin et résistance totale du circuit sources actives ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>L. Thévenin, « Sur un nouveau théorème d'électricité dynamique », <em>Comptes Rendus de l'Académie des Sciences</em>, 1883 — article fondateur du théorème de Thévenin.</li>
        <li>J.-P. Pérez, <em>Électronique — Fondements et applications</em>, Dunod (chapitre sur les théorèmes généraux des réseaux linéaires).</li>
        <li>L. W. Nagel, « SPICE: A Computer Program to Simulate Semiconductor Circuits », University of California, Berkeley, 1973 — usage industriel moderne de ces théorèmes dans la simulation de circuits.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes maintenant d'une boîte à outils de simplification qui te fera gagner un temps considérable sur tout circuit à venir. Le chapitre suivant, « Régime transitoire : circuits RC et RL », t'introduira une dimension nouvelle — le temps — en étudiant comment un circuit réagit lorsqu'on l'allume ou l'éteint brusquement. Comme le rappelait Thévenin lui-même avec la sobriété de l'ingénieur : la meilleure théorie est celle qui simplifie la pratique sans jamais la trahir.</p>
  `,
  init: initElecDivider
};

ELEC_NOVA_KB[elecKey('Dipôles, associations et théorèmes généraux')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Dipôles, associations et théorèmes généraux ». Demande-moi Thévenin, le diviseur de tension, ou un indice sur un exercice.",
  rules: [
    { test:/s[ée]rie|parall[èe]le/i, replies:["Série : Req=ΣRi (les résistances s'additionnent). Parallèle : 1/Req=Σ(1/Ri), ou R1R2/(R1+R2) pour deux résistances seulement — toujours plus petit que la plus petite des deux."] },
    { test:/diviseur de tension/i, replies:["Diviseur de tension : Vs=E·R2/(R1+R2), où Vs est mesurée aux bornes de R2. Vs est proportionnelle à la résistance SUR LAQUELLE on mesure."] },
    { test:/diviseur de courant/i, replies:["Diviseur de courant (deux branches R1,R2 en parallèle, courant total i) : le courant dans R2 est i2=i·R1/(R1+R2) — proportionnel à l'AUTRE résistance, à l'inverse du diviseur de tension !"] },
    { test:/th[ée]venin/i, replies:["Théorème de Thévenin : tout réseau linéaire vu de deux bornes équivaut à un générateur ETh (tension à vide) en série avec RTh (résistance vue, sources éteintes)."] },
    { test:/norton/i, replies:["Théorème de Norton : équivalent à un générateur de courant IN (courant de court-circuit) en parallèle avec RN=RTh. Relation : ETh=RN·IN."] },
    { test:/superposition/i, replies:["Le théorème de superposition : dans un circuit linéaire à plusieurs sources, on calcule la réponse due à chaque source séparément (les autres étant éteintes : tensions court-circuitées, courants ouverts), puis on additionne."] },
    { test:/millman/i, replies:["Le théorème de Millman donne directement le potentiel d'un nœud : V = (ΣEi/Ri) / (Σ1/Ri), une somme pondérée par les conductances de chaque branche."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise R_eq=R1R2/(R1+R2).","Indice niveau 2 : R1=R2=100, donc 100×100/200.","Indice niveau 3 : 50 Ω."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : RTh se calcule dans un état particulier des sources.","Indice niveau 2 : il faut les ÉTEINDRE, pas les garder actives.","Indice niveau 3 : en éteignant toutes les sources indépendantes."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : regarde ce que devient Vs=E·R2/(R1+R2) quand R2≫R1.","Indice niveau 2 : le rapport R2/(R1+R2) tend vers 1.","Indice niveau 3 : Vs tend vers E."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 2 — Charge d'un condensateur (circuit RC), Chapitre 3
--------------------------------------------------------------------------------- */
function updateElecRC(){
  const R = parseFloat(document.getElementById('elecR').value);
  const C = parseFloat(document.getElementById('elecC').value);
  const E = 5;
  const tau = R*C;
  document.getElementById('elecRVal').textContent = R.toFixed(1);
  document.getElementById('elecCVal').textContent = C.toFixed(1);
  document.getElementById('elecTauVal').textContent = tau.toFixed(2);
  const tMax = 5*tau, N = 50;
  const pts = [];
  for(let i=0;i<=N;i++){
    const t = tMax*i/N;
    const v = E*(1-Math.exp(-t/tau));
    const px = 20 + (t/tMax)*170;
    const py = 85 - (v/E)*65;
    pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }
  document.getElementById('elecRCCurve').setAttribute('points', pts.join(' '));
  document.getElementById('elecRCReadout').innerHTML =
    `τ = RC = ${R.toFixed(1)}×${C.toFixed(1)} = <strong>${tau.toFixed(2)} ms</strong><br>` +
    `Après τ, le condensateur est chargé à 63,2% de E ; après 5τ (${tMax.toFixed(1)} ms), à plus de 99%.`;
}
function initElecRC(){ updateElecRC(); }

/* =========================== CHAPITRE 3 — Régime transitoire : circuits RC et RL =========================== */
ELEC_CHAPTERS[elecKey('Régime transitoire : circuits RC et RL')] = {
  objectives: [
    "Établir l'équation différentielle régissant la charge d'un condensateur dans un circuit RC",
    "Résoudre cette équation et interpréter le temps de relaxation τ=RC",
    "Établir et résoudre l'équation différentielle d'un circuit RL",
    "Décrire qualitativement les trois régimes d'un circuit RLC série (apériodique, critique, pseudo-périodique)",
    "Analyser un circuit RC ou RL donné pour évaluer, à partir de sa constante de temps, s'il réagit assez vite pour suivre un signal de fréquence donnée"
  ],
  prereqs: ["Dipôles, associations et théorèmes généraux"],
  bodyHtml: `
    <p>Appuie sur le bouton d'un flash d'appareil photo à l'ancienne, et tu entends un léger sifflement qui monte en fréquence avant le déclic : c'est le son d'un condensateur qui se charge, lentement mais sûrement, avant de libérer toute son énergie en un éclair. Ce délai n'est pas un défaut de fabrication — c'est une conséquence directe et incompressible des lois de l'électrocinétique que tu vas établir dans ce chapitre.</p>
    <p>Ce « temps de charge » n'est pas propre aux flashs photographiques : c'est lui qui limite la vitesse à laquelle une mémoire RAM peut être lue et écrite, qui détermine le temps de réponse d'un capteur électronique, ou qui explique pourquoi une ampoule à incandescence met un instant à s'éteindre complètement après avoir coupé le courant.</p>
    <p>Ce chapitre introduit une dimension nouvelle dans l'étude des circuits : le <strong>temps</strong>. Après les lois statiques du régime permanent, tu vas voir comment un circuit réagit à un changement brutal — l'ouverture ou la fermeture d'un interrupteur — et découvrir que cette réaction n'est jamais instantanée.</p>

    <h3>1. Le condensateur et la bobine</h3>
    <table class="mini-table">
      <tr><th>Composant</th><th>Relation courant-tension</th><th>Grandeur qui ne peut pas être discontinue</th></tr>
      <tr><td>Condensateur (capacité $C$)</td><td>$i=C\\dfrac{du}{dt}$</td><td>la tension $u_C$ à ses bornes</td></tr>
      <tr><td>Bobine (inductance $L$)</td><td>$u=L\\dfrac{di}{dt}$</td><td>le courant $i_L$ qui la traverse</td></tr>
    </table>

    <h3>2. Charge d'un condensateur : le circuit RC</h3>
    <p>On considère un générateur de f.é.m. $E$, une résistance $R$ et un condensateur $C$ en série, initialement déchargé. La loi des mailles donne $E=Ri+u_C$, avec $i=C\\dfrac{du_C}{dt}$, d'où l'équation différentielle du premier ordre :</p>
    <div class="formula-box">$$RC\\frac{du_C}{dt} + u_C = E$$</div>
    <p>dont la solution, compte tenu de la condition initiale $u_C(0)=0$, est :</p>
    <div class="formula-box">$$u_C(t) = E\\left(1-e^{-t/\\tau}\\right), \\qquad \\tau = RC \\text{ (temps de relaxation, ou constante de temps)}$$</div>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 130 60" width="100%">
          <line x1="10" y1="30" x2="35" y2="30" stroke="#EAF0FB" stroke-width="1.6"/>
          <rect x="35" y="20" width="25" height="20" fill="none" stroke="#4C7CFF" stroke-width="1.4"/>
          <text x="38" y="15" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">R</text>
          <line x1="60" y1="30" x2="85" y2="30" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="90" y1="15" x2="90" y2="45" stroke="#2DD4C4" stroke-width="2"/>
          <line x1="98" y1="15" x2="98" y2="45" stroke="#2DD4C4" stroke-width="2"/>
          <text x="88" y="12" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">C</text>
        </svg>
        <span>Circuit RC série : générateur E, résistance R, condensateur C</span>
      </div>
    </div>
    <div class="key-point">
      <span class="eyebrow">Interprétation du temps de relaxation τ</span>
      $\\tau=RC$ caractérise la « vitesse » de la charge. Après une durée $\\tau$, le condensateur est chargé à $1-e^{-1}\\approx63{,}2\\%$ de sa valeur finale ; après $5\\tau$, il est chargé à plus de 99% — on considère en pratique le régime permanent atteint.
    </div>
    <p>Pour la <strong>décharge</strong> d'un condensateur initialement chargé sous $E$ dans une résistance $R$ (sans générateur) : $u_C(t)=Ee^{-t/\\tau}$, décroissance exponentielle vers 0.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La charge et la décharge d'un condensateur ont exactement la même constante de temps τ=RC, mais l'une croît vers E tandis que l'autre décroît vers 0. Pourquoi la « vitesse » du phénomène (mesurée par τ) ne dépend-elle pas du sens dans lequel la tension évolue ?
    </div>

    <h3>3. Établissement du courant dans un circuit RL</h3>
    <p>Pour un circuit $R,L$ série alimenté par $E$, la loi des mailles $E=Ri+L\\dfrac{di}{dt}$ donne, avec $i(0)=0$ :</p>
    <div class="formula-box">$$i(t) = \\frac{E}{R}\\left(1-e^{-t/\\tau}\\right), \\qquad \\tau = \\frac{L}{R}$$</div>
    <p>La bobine s'oppose à l'établissement brutal du courant (elle « lisse » sa croissance), de façon analogue à la résistance du condensateur au changement brutal de tension.</p>
    <p><strong>Cas limite à retenir :</strong> à l'instant précis où l'interrupteur se ferme ($t=0^+$), la bobine se comporte comme un <strong>circuit ouvert</strong> (le courant qui la traverse valait 0 juste avant, et ne peut pas sauter) — exactement l'inverse d'un condensateur initialement déchargé, qui se comporte à $t=0^+$ comme un simple <strong>fil</strong> (court-circuit, car $u_C(0)=0$). Ce réflexe (bobine = coupure, condensateur = fil, à l'instant initial) permet souvent de trouver très vite les conditions initiales d'un circuit sans résoudre quoi que ce soit.</p>

    <h3>4. Le circuit RLC série : trois régimes</h3>
    <p>Pour un circuit $R,L,C$ série, l'équation différentielle devient du <strong>second ordre</strong> : $LC\\ddot u_C + RC\\dot u_C + u_C = E$. Selon la valeur du discriminant de l'équation caractéristique associée, trois régimes sont possibles :</p>
    <table class="mini-table">
      <tr><th>Régime</th><th>Condition (facteur de qualité $Q$)</th><th>Comportement</th></tr>
      <tr><td>Apériodique</td><td>$R$ grande</td><td>retour lent vers le régime permanent, sans oscillation</td></tr>
      <tr><td>Critique</td><td>valeur particulière de $R$</td><td>retour le plus rapide possible, sans oscillation</td></tr>
      <tr><td>Pseudo-périodique</td><td>$R$ petite</td><td>oscillations amorties autour du régime permanent</td></tr>
    </table>
    <p>Ce sont exactement les trois régimes déjà rencontrés pour l'oscillateur mécanique amorti (masse-ressort avec frottement) — l'analogie électromécanique est ici totale : $L\\leftrightarrow m$, $\\dfrac1C\\leftrightarrow k$, $R\\leftrightarrow$ coefficient de frottement.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Cette analogie électromécanique n'est pas qu'une coïncidence pédagogique pratique : les deux systèmes obéissent à la même équation différentielle. Que peux-tu en déduire sur la possibilité de simuler le comportement d'un système mécanique (un amortisseur de voiture, par exemple) à l'aide d'un simple circuit électrique RLC ?
    </div>

    <h3>5. Frontière de la recherche — du régime transitoire aux mémoires modernes</h3>
    <p>Le temps de charge d'un condensateur, que tu viens d'apprendre à calculer, est directement au cœur du fonctionnement des mémoires DRAM qui équipent tous les ordinateurs : chaque bit y est stocké comme la charge d'un minuscule condensateur, qui doit être rechargé (« rafraîchi ») plusieurs milliers de fois par seconde car il se décharge naturellement — un compromis permanent entre vitesse de lecture/écriture et consommation énergétique, directement gouverné par la constante de temps τ=RC de chaque cellule mémoire.</p>
    <p><strong>Question ouverte :</strong> réduire encore la taille des condensateurs de mémoire (pour stocker plus de données sur la même puce) réduit aussi leur capacité C, ce qui accélère leur décharge naturelle et complique la fiabilité du stockage — jusqu'où peut-on miniaturiser ces cellules avant que ce compromis physique fondamental ne devienne intenable ? C'est un enjeu de recherche actif en ingénierie des semi-conducteurs.</p>
    <p><strong>Technologie émergente :</strong> les mémoires non volatiles de nouvelle génération (MRAM, ReRAM) cherchent précisément à s'affranchir de cette contrainte de régime transitoire en stockant l'information autrement que par une charge électrique qui se dissipe — une piste de recherche motivée directement par les limites physiques que révèle ce chapitre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Interrupteur actionné → équation différentielle (1er ordre RC/RL, 2nd ordre RLC) → temps caractéristique τ → évolution exponentielle vers le régime permanent
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\tau_{RC}=RC \\qquad\\qquad \\tau_{RL}=\\frac{L}{R}$$
      Ces deux constantes de temps gouvernent toute la « vitesse » des circuits du premier ordre — retiens-les avant toute chose, elles reviendront dans chaque exercice de ce chapitre et du suivant.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Condensateur : i=C(du/dt), la tension ne peut pas être discontinue ; Bobine : u=L(di/dt), le courant ne peut pas être discontinu</li>
        <li>Charge d'un RC : uC(t)=E(1−e^(−t/τ)), τ=RC ; après τ → 63,2% ; après 5τ → régime permanent (>99%)</li>
        <li>Établissement du courant dans un RL : i(t)=(E/R)(1−e^(−t/τ)), τ=L/R</li>
        <li>RLC série : 3 régimes selon R — apériodique, critique, pseudo-périodique (exactement comme l'oscillateur mécanique amorti)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que la tension aux bornes d'un condensateur peut changer instantanément — c'est physiquement impossible (courant infini)</li>
        <li>Confondre τ=RC (circuit RC) et τ=L/R (circuit RL) — pas la même formule !</li>
        <li>Oublier la condition initiale (uC(0)=0 pour une charge, i(0)=0 pour un RL) en résolvant l'équation différentielle</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — charge d'un condensateur (circuit RC)</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Fais varier R et C : observe l'effet sur le temps de relaxation τ et la vitesse de charge du condensateur.</p>
      <div class="sim-2col">
        <svg viewBox="0 0 200 95" width="220" height="105">
          <line x1="20" y1="85" x2="190" y2="85" stroke="#3A4658" stroke-width="1"/>
          <line x1="20" y1="20" x2="20" y2="85" stroke="#3A4658" stroke-width="1"/>
          <polyline id="elecRCCurve" points="" stroke="#4C7CFF" stroke-width="2" fill="none"/>
        </svg>
        <div class="sim-controls">
          <label>R (kΩ) : <span id="elecRVal">10.0</span></label>
          <input type="range" id="elecR" min="1" max="50" step="1" value="10" oninput="updateElecRC()">
          <label>C (µF) : <span id="elecCVal">2.2</span></label>
          <input type="range" id="elecC" min="0.1" max="10" step="0.1" value="2.2" oninput="updateElecRC()">
          <div class="sim-readout" id="elecRCReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour un circuit RC avec R=2 kΩ et C=500 nF, le temps de relaxation τ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec3e1" value="wrong"> 10 s</label>
          <label class="option"><input type="radio" name="elec3e1" value="right"> 1 ms</label>
          <label class="option"><input type="radio" name="elec3e1" value="wrong"> 1 µs</label>
          <label class="option"><input type="radio" name="elec3e1" value="wrong"> 100 ms</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec3e1','elec3fb1','Correct — τ=RC=2000×500×10⁻⁹=1×10⁻³ s=1 ms.','τ=RC=2000 Ω × 500×10⁻⁹ F.')">Vérifier</button>
        <div class="feedback" id="elec3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Après une durée τ, un condensateur en charge a atteint une fraction de sa tension finale égale à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec3e2" value="wrong"> 50%</label>
          <label class="option"><input type="radio" name="elec3e2" value="right"> 63,2%</label>
          <label class="option"><input type="radio" name="elec3e2" value="wrong"> 99%</label>
          <label class="option"><input type="radio" name="elec3e2" value="wrong"> 100%</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec3e2','elec3fb2','Correct — u(τ)=E(1−e⁻¹)=E×0,632, soit 63,2% de la valeur finale.','Calcule 1−e⁻¹ (avec e≈2,718).')">Vérifier</button>
        <div class="feedback" id="elec3fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans un circuit RL, la grandeur qui ne peut jamais être discontinue est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec3e3" value="wrong"> la tension aux bornes de R</label>
          <label class="option"><input type="radio" name="elec3e3" value="right"> le courant traversant L</label>
          <label class="option"><input type="radio" name="elec3e3" value="wrong"> la tension du générateur</label>
          <label class="option"><input type="radio" name="elec3e3" value="wrong"> aucune, tout peut être discontinu</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec3e3','elec3fb3','Correct — u=L(di/dt) : un changement discontinu de courant impliquerait une tension infinie aux bornes de la bobine, physiquement impossible.','La relation u=L(di/dt) impose une contrainte physique sur le courant traversant L.')">Vérifier</button>
        <div class="feedback" id="elec3fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Un signal carré (alternant rapidement entre 0 et E) est appliqué à l'entrée d'un circuit RC, et on observe la tension aux bornes du condensateur. Décris qualitativement ce qui se passe si la période du signal carré est très grande devant τ=RC, puis si elle est très petite devant τ. Dans lequel de ces deux cas le circuit RC agit-il comme un « intégrateur » du signal d'entrée (la sortie ressemble à une rampe plutôt qu'à un carré) ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : si la période est très petite devant τ, le condensateur n'a pas le temps de se charger significativement avant que le signal ne change déjà de valeur — que reste-t-il alors de la forme du signal d'origine ?</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si un condensateur pouvait réellement se charger instantanément (τ=0) : quel courant, d'après i=C(du/dt), cela impliquerait-il au moment de la fermeture de l'interrupteur ?</li>
        <li>Pourquoi le régime critique d'un circuit RLC, qui revient le plus vite possible au régime permanent sans jamais osciller, est-il si recherché dans la conception des instruments de mesure (galvanomètres, capteurs) ?</li>
        <li>Quelle serait la conséquence, pour la fiabilité d'une mémoire d'ordinateur, d'une cellule de stockage dont la constante de temps de décharge deviendrait plus courte que l'intervalle entre deux rafraîchissements ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>M. Faraday, travaux sur l'induction électromagnétique, 1831 — origine expérimentale du comportement des bobines face aux variations de courant.</li>
        <li>J.-P. Pérez, <em>Électronique — Fondements et applications</em>, Dunod (chapitre sur les régimes transitoires des circuits RC, RL et RLC).</li>
        <li>R. H. Dennard <em>et al.</em>, « Design Of Ion-Implanted MOSFET's with Very Small Physical Dimensions », <em>IEEE Journal of Solid-State Circuits</em>, 1974 — article fondateur de la mémoire DRAM à condensateur.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais maintenant décrire comment un circuit réagit à un changement brutal — une compétence essentielle dès qu'un circuit s'allume, s'éteint, ou commute. Le chapitre suivant, « Régime sinusoïdal permanent », t'apprendra à décrire l'autre grand régime des circuits électriques : celui où tout oscille en permanence, sans jamais s'arrêter. Comme le disait Faraday, dont les travaux sur l'induction ont rendu ce chapitre possible : « Rien n'est trop merveilleux pour être vrai, si c'est conforme aux lois de la nature. »</p>
  `,
  init: initElecRC
};

ELEC_NOVA_KB[elecKey('Régime transitoire : circuits RC et RL')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Régime transitoire : circuits RC et RL ». Demande-moi ce qu'est le temps de relaxation, les 3 régimes du RLC, ou un indice sur un exercice.",
  rules: [
    { test:/condensateur|rc\b/i, replies:["Circuit RC en charge : uC(t)=E(1−e^(−t/τ)) avec τ=RC. La tension aux bornes d'un condensateur ne peut jamais être discontinue (i=C du/dt finirait par être infini sinon)."] },
    { test:/bobine|rl\b/i, replies:["Circuit RL : i(t)=(E/R)(1−e^(−t/τ)) avec τ=L/R. Le courant traversant une bobine ne peut jamais être discontinu (u=L di/dt serait infinie sinon)."] },
    { test:/temps de relaxation|constante de temps|tau|τ/i, replies:["τ=RC (circuit RC) ou τ=L/R (circuit RL). Après τ, on atteint 63,2% de la valeur finale ; après 5τ, plus de 99% (régime permanent en pratique)."] },
    { test:/rlc|apériodique|critique|pseudo.p[ée]riodique/i, replies:["Le circuit RLC série a 3 régimes selon la valeur de R (comme l'oscillateur mécanique amorti) : apériodique (R grande, retour lent sans oscillation), critique (retour le plus rapide sans oscillation), pseudo-périodique (R petite, oscillations amorties)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : τ=RC.","Indice niveau 2 : 2000 Ω × 500×10⁻⁹ F.","Indice niveau 3 : τ=1 ms."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : calcule u(τ)/E = 1−e⁻¹.","Indice niveau 2 : e≈2,718, donc e⁻¹≈0,368.","Indice niveau 3 : 1−0,368=0,632, soit 63,2%."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : regarde la relation u=L(di/dt).","Indice niveau 2 : un saut de courant donnerait une tension infinie.","Indice niveau 3 : c'est le courant traversant L qui ne peut pas être discontinu."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 3 — Résonance d'un circuit RLC série (Chapitre 4)
--------------------------------------------------------------------------------- */
function updateElecRLC(){
  const R = parseFloat(document.getElementById('elecRLCr').value);
  const Lm = parseFloat(document.getElementById('elecRLCl').value);
  const Cu = parseFloat(document.getElementById('elecRLCc').value);
  document.getElementById('elecRLCrVal').textContent = R.toFixed(0);
  document.getElementById('elecRLClVal').textContent = Lm.toFixed(0);
  document.getElementById('elecRLCcVal').textContent = Cu.toFixed(2);
  const L = Lm*1e-3, C = Cu*1e-6;
  const omega0 = 1/Math.sqrt(L*C);
  const f0 = omega0/(2*Math.PI);
  const Q = (1/R)*Math.sqrt(L/C);
  const N = 60;
  let maxZ = 0;
  const Zs = [];
  for(let i=0;i<=N;i++){
    const om = omega0*(0.2+2.8*i/N);
    const Z = Math.sqrt(R*R + Math.pow(om*L-1/(om*C),2));
    Zs.push(Z);
    maxZ = Math.max(maxZ, Z);
  }
  const pts = Zs.map((Z,i) => {
    const px = 20 + (i/N)*170;
    const py = 85 - (Z/maxZ)*65;
    return `${px.toFixed(1)},${py.toFixed(1)}`;
  }).join(' ');
  document.getElementById('elecRLCCurve').setAttribute('points', pts);
  document.getElementById('elecRLCReadout').innerHTML =
    `ω₀ = 1/√(LC) = <strong>${omega0.toFixed(0)} rad/s</strong> (f₀ ≈ ${f0.toFixed(1)} Hz)<br>` +
    `Facteur de qualité Q = (1/R)√(L/C) ≈ <strong>${Q.toFixed(2)}</strong> — ${Q>3 ? "résonance aiguë (Q élevé, filtre sélectif)" : "résonance large (Q faible, peu sélective)"}<br>` +
    `À la résonance, |Z| est MINIMALE (=R) : le courant y est donc maximal.`;
}
function initElecRLC(){ updateElecRLC(); }

/* =========================== CHAPITRE 4 — Régime sinusoïdal permanent =========================== */
ELEC_CHAPTERS[elecKey('Régime sinusoïdal permanent')] = {
  objectives: [
    "Représenter une grandeur sinusoïdale par un nombre complexe (notation complexe)",
    "Définir l'impédance complexe d'un dipôle (résistance, condensateur, bobine) et l'utiliser comme une résistance généralisée",
    "Étudier le circuit RLC série en régime sinusoïdal forcé : impédance, déphasage, résonance",
    "Relier le facteur de qualité Q à la sélectivité (bande passante) d'un circuit résonant",
    "Analyser un circuit RLC pour évaluer, à partir de ses composants, s'il se comportera comme un filtre sélectif ou large bande"
  ],
  prereqs: ["Circuit RLC série : régime transitoire"],
  bodyHtml: `
    <p>Tourne le bouton d'un vieux poste de radio à ondes courtes, et tu sens physiquement — dans la résistance du bouton — que tu es en train d'ajuster un circuit électrique pour qu'il « accroche » une fréquence précise parmi toutes celles qui traversent l'antenne. Ce geste, en apparence anodin, repose entièrement sur le phénomène de résonance que ce chapitre va formaliser : celui d'un circuit RLC qui répond de façon radicalement différente selon la fréquence du signal qu'on lui applique.</p>
    <p>Ce même principe de résonance sélective, une fois maîtrisé, explique le fonctionnement d'un four à micro-ondes (accordé sur la fréquence de résonance des molécules d'eau), d'un scanner IRM (résonance magnétique nucléaire), ou du simple fait qu'un verre à pied peut se briser sous l'effet d'un son suffisamment aigu et puissant — la voix humaine excitant la fréquence de résonance mécanique du verre.</p>
    <p>Ce chapitre introduit un outil de calcul redoutablement efficace : la notation complexe, qui transforme les équations différentielles du régime sinusoïdal en simples équations algébriques. Tu y retrouveras les nombres complexes étudiés plus tôt, appliqués cette fois à un problème physique concret et omniprésent.</p>

    <h3>1. Notation complexe</h3>
    <p>À une grandeur sinusoïdale réelle $u(t)=U_m\\cos(\\omega t+\\varphi)$, on associe le nombre complexe $\\underline{u}=U_m e^{j(\\omega t+\\varphi)}$, dont $u(t)$ est la partie réelle. L'intérêt : dériver par rapport au temps revient à multiplier par $j\\omega$ :</p>
    <div class="formula-box">$$\\frac{du}{dt} \\longrightarrow j\\omega\\,\\underline u$$</div>

    <h3>2. Impédance complexe</h3>
    <p>On généralise la loi d'Ohm à un dipôle quelconque via son <strong>impédance complexe</strong> $\\underline Z=\\underline u/\\underline i$ :</p>
    <table class="mini-table">
      <tr><th>Dipôle</th><th>Impédance complexe $\\underline Z$</th><th>Module $|Z|$</th></tr>
      <tr><td>Résistance $R$</td><td>$R$</td><td>$R$</td></tr>
      <tr><td>Condensateur $C$</td><td>$\\dfrac{1}{j\\omega C}$</td><td>$\\dfrac{1}{\\omega C}$</td></tr>
      <tr><td>Bobine $L$</td><td>$j\\omega L$</td><td>$\\omega L$</td></tr>
    </table>
    <p>Les impédances se combinent exactement comme des résistances (séries : elles s'additionnent ; parallèle : leurs inverses s'additionnent) — tous les théorèmes du chapitre 2 (diviseur, Thévenin...) restent valables en complexe.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'impédance d'un condensateur diminue quand ω augmente, tandis que celle d'une bobine augmente. Sans faire aucun calcul, peux-tu deviner pourquoi un condensateur est parfois appelé « passe-haut » (il laisse mieux passer les hautes fréquences) et une bobine « passe-bas » ?
    </div>

    <h3>3. Circuit RLC série en régime sinusoïdal forcé</h3>
    <p>L'impédance complexe totale d'un RLC série est $\\underline Z = R+j\\Big(L\\omega-\\dfrac{1}{C\\omega}\\Big)$, d'où :</p>
    <div class="formula-box">$$|Z| = \\sqrt{R^2+\\Big(L\\omega-\\frac{1}{C\\omega}\\Big)^2} \\qquad \\tan\\varphi = \\frac{L\\omega-\\frac{1}{C\\omega}}{R}$$</div>
    <p>où $\\varphi$ est le déphasage de la tension par rapport au courant.</p>

    <h3>4. Résonance</h3>
    <p>L'impédance est <strong>minimale</strong> (égale à $R$ seul) lorsque la partie imaginaire s'annule, c'est-à-dire pour la <strong>pulsation propre</strong> :</p>
    <div class="formula-box">$$\\omega_0 = \\frac{1}{\\sqrt{LC}}$$</div>
    <p>À cette pulsation, le courant est <strong>maximal</strong> (résonance d'intensité) et en phase avec la tension ($\\varphi=0$).</p>
    <p><strong>Cas limite à retenir :</strong> loin de la résonance (ω≪ω0 ou ω≫ω0), l'impédance est dominée soit par le condensateur soit par la bobine, et le circuit se comporte presque comme un simple $C$ ou un simple $L$ seul — c'est uniquement au voisinage de ω0 que les deux effets se compensent presque exactement, ce qui explique la forme en « creux » très localisé de $|Z(\\omega)|$.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 90" width="100%">
          <line x1="15" y1="80" x2="150" y2="80" stroke="#3A4658" stroke-width="1"/>
          <line x1="15" y1="10" x2="15" y2="80" stroke="#3A4658" stroke-width="1"/>
          <path d="M15,20 Q60,75 80,78 Q100,75 150,15" stroke="#F0B94D" stroke-width="1.8" fill="none"/>
          <line x1="80" y1="10" x2="80" y2="80" stroke="#5A6472" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="65" y="10" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">ω₀</text>
        </svg>
        <span>|Z(ω)| présente un minimum net à ω₀ : c'est là que le courant est maximal</span>
      </div>
    </div>

    <h3>5. Facteur de qualité et sélectivité</h3>
    <p>Le <strong>facteur de qualité</strong> $Q=\\dfrac1R\\sqrt{\\dfrac LC}$ mesure l'acuité de la résonance : plus $Q$ est grand, plus la résonance est étroite (le circuit est <strong>sélectif</strong>, comme un filtre qui ne laisse passer qu'une bande de fréquences étroite autour de $\\omega_0$). La largeur de bande à mi-hauteur en puissance vaut $\\Delta\\omega=\\dfrac{\\omega_0}{Q}$.</p>
    <div class="key-point">
      <span class="eyebrow">Application : accord d'un poste de radio</span>
      C'est exactement ce principe de résonance RLC (avec un $Q$ élevé) qui permet à un récepteur radio de sélectionner une seule station parmi toutes les fréquences captées par l'antenne.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Augmenter R dans un circuit RLC série diminue Q, donc élargit la résonance — mais R ne modifie jamais la position de ω0=1/√(LC). Comment expliques-tu que la résistance, qui ne stocke ni ne restitue d'énergie électromagnétique (contrairement à L et C), n'influence pourtant pas la fréquence propre du circuit, seulement sa sélectivité ?
    </div>

    <h3>6. Frontière de la recherche — de l'accord radio aux qubits supraconducteurs</h3>
    <p>Le même phénomène de résonance RLC, poussé à l'extrême, est aujourd'hui au cœur des ordinateurs quantiques supraconducteurs : les qubits y sont souvent réalisés à partir de circuits LC (ou leurs variantes non linéaires, les jonctions Josephson) refroidis à quelques millikelvins, où le facteur de qualité doit être poussé à des valeurs extraordinairement élevées pour que l'état quantique survive suffisamment longtemps aux mesures et aux calculs.</p>
    <p><strong>Question ouverte :</strong> plus un circuit résonant a un facteur de qualité élevé, plus il est sensible aux moindres imperfections (pertes résistives parasites, couplage non désiré avec l'environnement) — trouver le compromis optimal entre sélectivité extrême et robustesse pratique reste un défi d'ingénierie central dans la course à des ordinateurs quantiques plus fiables.</p>
    <p><strong>Technologie émergente :</strong> les filtres RLC intégrés directement sur puce (au lieu de composants discrets) permettent de miniaturiser des circuits de communication sans fil entiers (Wi-Fi, Bluetooth, 5G) sur quelques millimètres carrés de silicium — une prouesse d'ingénierie qui repose entièrement sur la théorie de la résonance de ce chapitre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Signal sinusoïdal → notation complexe (d/dt→jω) → impédance $\\underline Z(\\omega)$ → résonance à ω₀=1/√(LC) → sélectivité fixée par Q
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\underline{Z} = R + j\\Big(L\\omega - \\frac{1}{C\\omega}\\Big)$$
      Toute la richesse du régime sinusoïdal forcé — résonance, déphasage, sélectivité — découle de cette unique expression de l'impédance complexe.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Notation complexe : d/dt → ×jω ; impédances : R, 1/(jωC), jωL — se combinent comme des résistances</li>
        <li>RLC série : |Z|=√(R²+(Lω−1/(Cω))²), minimale (=R) à la résonance ω0=1/√(LC)</li>
        <li>À la résonance, le courant est maximal et en phase avec la tension (φ=0)</li>
        <li>Q=(1/R)√(L/C) mesure la sélectivité : Q grand → résonance étroite (filtre sélectif)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que |Z| est MAXIMALE à la résonance pour un RLC SÉRIE — c'est l'inverse, elle est minimale (c'est le courant qui est maximal)</li>
        <li>Oublier que la notation complexe ne concerne QUE le régime sinusoïdal permanent établi, pas le régime transitoire</li>
        <li>Confondre pulsation ω (rad/s) et fréquence f (Hz) — ω=2πf</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — résonance d'un circuit RLC série</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Fais varier R, L, C : observe le déplacement de la fréquence de résonance et l'acuité de la résonance (facteur de qualité Q).</p>
      <div class="sim-2col">
        <svg viewBox="0 0 200 95" width="220" height="105">
          <line x1="20" y1="85" x2="190" y2="85" stroke="#3A4658" stroke-width="1"/>
          <line x1="20" y1="20" x2="20" y2="85" stroke="#3A4658" stroke-width="1"/>
          <polyline id="elecRLCCurve" points="" stroke="#FF6B6F" stroke-width="2" fill="none"/>
        </svg>
        <div class="sim-controls">
          <label>R (Ω) : <span id="elecRLCrVal">50</span></label>
          <input type="range" id="elecRLCr" min="5" max="200" step="5" value="50" oninput="updateElecRLC()">
          <label>L (mH) : <span id="elecRLClVal">100</span></label>
          <input type="range" id="elecRLCl" min="10" max="300" step="10" value="100" oninput="updateElecRLC()">
          <label>C (µF) : <span id="elecRLCcVal">1.00</span></label>
          <input type="range" id="elecRLCc" min="0.1" max="5" step="0.1" value="1" oninput="updateElecRLC()">
          <div class="sim-readout" id="elecRLCReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'impédance complexe d'un condensateur de capacité C, en régime sinusoïdal de pulsation ω, est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec4e1" value="wrong"> jωC</label>
          <label class="option"><input type="radio" name="elec4e1" value="right"> 1/(jωC)</label>
          <label class="option"><input type="radio" name="elec4e1" value="wrong"> jωL</label>
          <label class="option"><input type="radio" name="elec4e1" value="wrong"> R</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec4e1','elec4fb1','Correct — Z_C=1/(jωC) : son module 1/(ωC) diminue quand ω augmente (un condensateur laisse mieux passer les hautes fréquences).','L\\'impédance d\\'un condensateur est INVERSEMENT proportionnelle à ω, pas proportionnelle.')">Vérifier</button>
        <div class="feedback" id="elec4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">À la résonance d'un circuit RLC série, l'impédance totale |Z| est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec4e2" value="wrong"> maximale</label>
          <label class="option"><input type="radio" name="elec4e2" value="right"> minimale, égale à R</label>
          <label class="option"><input type="radio" name="elec4e2" value="wrong"> nulle</label>
          <label class="option"><input type="radio" name="elec4e2" value="wrong"> infinie</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec4e2','elec4fb2','Correct — à ω0, la partie imaginaire Lω−1/(Cω) s\\'annule, donc |Z|=R, qui est le minimum possible.','À la résonance, la partie réactive de Z s\\'annule : que reste-t-il alors ?')">Vérifier</button>
        <div class="feedback" id="elec4fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un facteur de qualité Q élevé correspond à une résonance :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec4e3" value="right"> étroite et aiguë (très sélective)</label>
          <label class="option"><input type="radio" name="elec4e3" value="wrong"> large et peu marquée</label>
          <label class="option"><input type="radio" name="elec4e3" value="wrong"> inexistante</label>
          <label class="option"><input type="radio" name="elec4e3" value="wrong"> décalée vers 0 Hz</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec4e3','elec4fb3','Correct — Δω=ω0/Q : plus Q est grand, plus la bande passante Δω est étroite, donc plus la résonance est aiguë et sélective.','La bande passante Δω=ω0/Q : si Q est grand, Δω est-il grand ou petit ?')">Vérifier</button>
        <div class="feedback" id="elec4fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Tu veux concevoir un récepteur radio capable de séparer deux stations émettant à 100,0 MHz et 100,2 MHz (donc très proches en fréquence). Propose une démarche pour déterminer l'ordre de grandeur du facteur de qualité Q minimal nécessaire pour un circuit RLC accordé sur 100,1 MHz, afin de séparer correctement ces deux stations. Que se passerait-il concrètement si Q était trop faible ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : la bande passante Δω=ω0/Q doit être plus étroite que l'écart entre les deux fréquences à séparer — exprime cette condition pour en déduire un ordre de grandeur de Q.</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la notation complexe était appliquée à un signal qui n'est pas purement sinusoïdal (un signal carré, par exemple) : que perdrait-on en simplicité, et quel outil mathématique (déjà entrevu ailleurs dans le cours) permettrait de contourner cette limite ?</li>
        <li>Pourquoi un circuit RLC PARALLÈLE présente-t-il, à l'inverse du circuit série étudié ici, une impédance MAXIMALE (et non minimale) à la résonance ?</li>
        <li>Quelle serait la conséquence, pour la qualité du son d'un ampli audio, d'un filtre de sortie avec un facteur de qualité bien trop élevé sur certaines fréquences ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>C. P. Steinmetz, « Complex Quantities and Their Use in Electrical Engineering », <em>AIEE Proceedings</em>, 1893 — introduction historique de la notation complexe en électrotechnique.</li>
        <li>J.-P. Pérez, <em>Électronique — Fondements et applications</em>, Dunod (chapitre sur le régime sinusoïdal forcé et la résonance).</li>
        <li>M. H. Devoret, R. J. Schoelkopf, « Superconducting Circuits for Quantum Information: An Outlook », <em>Science</em>, 2013 — application moderne des circuits résonants LC aux qubits supraconducteurs.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">La résonance que tu maîtrises désormais est un phénomène universel — tu la retrouveras en mécanique, en acoustique, en optique, jusqu'en physique quantique. Le chapitre suivant, « Puissance en régime sinusoïdal forcé », t'apprendra à calculer l'énergie réellement consommée par un circuit qui oscille sans cesse. Comme le disait Steinmetz, l'ingénieur qui a le premier généralisé la notation complexe à l'électrotechnique : « Rien de plus pratique qu'une bonne notation. »</p>
  `,
  init: initElecRLC
};

ELEC_NOVA_KB[elecKey('Régime sinusoïdal permanent')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Régime sinusoïdal permanent ». Demande-moi la notation complexe, l'impédance, la résonance, ou un indice sur un exercice.",
  rules: [
    { test:/notation complexe/i, replies:["On associe à u(t)=Umcos(ωt+φ) le nombre complexe u=Um·e^(j(ωt+φ)). Avantage : dériver par rapport au temps devient une simple multiplication par jω."] },
    { test:/imp[ée]dance/i, replies:["Impédance complexe Z=u/i, généralisation de la loi d'Ohm. Résistance : Z=R. Condensateur : Z=1/(jωC). Bobine : Z=jωL. Elles se combinent comme des résistances (série s'additionne, parallèle par inverses)."] },
    { test:/r[ée]sonance/i, replies:["À la résonance (ω0=1/√(LC)), l'impédance d'un RLC série est MINIMALE (=R), donc le courant est MAXIMAL et en phase avec la tension."] },
    { test:/facteur de qualit[ée]|\bq\b/i, replies:["Q=(1/R)√(L/C) mesure la sélectivité : Q élevé → résonance étroite et aiguë (filtre sélectif) ; Q faible → résonance large. Bande passante Δω=ω0/Q."] },
    { test:/d[ée]phasage/i, replies:["tan(φ)=(Lω−1/(Cω))/R, où φ est le déphasage de la tension par rapport au courant. φ=0 exactement à la résonance."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : l'impédance d'un condensateur diminue quand ω augmente.","Indice niveau 2 : elle est donc inversement proportionnelle à ω.","Indice niveau 3 : Z_C=1/(jωC)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : que devient la partie imaginaire de Z à la résonance ?","Indice niveau 2 : elle s'annule (Lω=1/(Cω)).","Indice niveau 3 : |Z|=R, le minimum possible."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : regarde la formule Δω=ω0/Q.","Indice niveau 2 : si Q est grand, Δω est petit.","Indice niveau 3 : résonance étroite et sélective."] }
  ]
};

/* fusionne le module Électrocinétique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, ELEC_CHAPTERS);
Object.assign(NOVA_KB, ELEC_NOVA_KB);

/* =========================== CHAPITRE — Puissance en régime stationnaire =========================== */
ELEC_CHAPTERS[elecKey('Puissance en régime stationnaire')] = {
  objectives: [
    "Calculer la puissance reçue ou fournie par un dipôle selon la convention choisie",
    "Établir le bilan de puissance d'un circuit (conservation de l'énergie)",
    "Distinguer dipôle générateur, récepteur, et cas particulier d'un récepteur en charge",
    "Déterminer la condition d'adaptation d'impédance pour un transfert de puissance maximal",
    "Analyser un dipôle inconnu à partir de sa caractéristique u=f(i) pour évaluer s'il peut, ou non, fournir de la puissance au circuit"
  ],
  prereqs: ["Lois fondamentales des circuits électriques"],
  bodyHtml: `
    <p>Chaque watt consommé par tes appareils électroniques a dû, à un moment donné, être transporté depuis une centrale électrique jusqu'à ta prise murale — un trajet parfois long de centaines de kilomètres. Un choix technique fondamental rend ce transport possible sans perte prohibitive : le transport à très haute tension (des centaines de milliers de volts), précisément pour minimiser les pertes par effet Joule dans les lignes, un phénomène que ce chapitre va te permettre de quantifier précisément.</p>
    <p>La notion de puissance électrique n'est pas qu'une question d'ingénierie lointaine : c'est elle qui détermine combien de temps dure la batterie de ton téléphone, pourquoi un chargeur rapide chauffe davantage qu'un chargeur lent, ou pourquoi brancher trop d'appareils sur une même prise fait sauter le disjoncteur.</p>
    <p>Ce chapitre te donne les outils pour calculer, avec les bons signes, l'énergie échangée par chaque dipôle d'un circuit — et pour répondre à une question d'ingénierie omniprésente : comment transférer le maximum de puissance possible d'une source vers une charge ?</p>

    <h3>1. Puissance reçue par un dipôle</h3>
    <p>En <strong>convention récepteur</strong> (flèches $u$ et $i$ opposées), la puissance <em>reçue</em> par le dipôle est $P_{reçue}=ui$. Selon son signe :</p>
    <table class="mini-table">
      <tr><th>Signe de $P_{reçue}=ui$</th><th>Interprétation physique</th></tr>
      <tr><td>$P_{reçue}>0$</td><td>le dipôle consomme effectivement de l'énergie électrique (comportement récepteur)</td></tr>
      <tr><td>$P_{reçue}<0$</td><td>le dipôle fournit en réalité de l'énergie au reste du circuit (comportement générateur)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le signe de $ui$ dépend de l'orientation choisie pour les flèches, mais pas le sens réel de circulation de l'énergie : une pile en charge (qu'on recharge) reçoit effectivement de l'énergie et devient localement un récepteur, même si elle est habituellement un générateur.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si tu inverses la convention choisie (récepteur ↔ générateur) pour un même dipôle, le signe de la puissance calculée change. Le comportement physique réel du dipôle change-t-il pour autant ? Qu'est-ce que cela te dit sur la nature d'une « convention » en physique ?
    </div>

    <h3>2. Bilan de puissance dans un circuit</h3>
    <p>La conservation de l'énergie impose, à chaque instant, dans tout circuit :</p>
    <div class="formula-box">$$\\sum P_{fournies} = \\sum P_{reçues}$$</div>
    <p>Ce bilan est un excellent moyen de <strong>vérifier</strong> un calcul de circuit : si la somme des puissances fournies par les générateurs ne coïncide pas avec la somme des puissances dissipées ou stockées, une erreur s'est glissée dans le calcul des intensités ou des tensions.</p>

    <h3>3. Caractéristique d'un conducteur ohmique</h3>
    <p>La caractéristique tension-courant $u=f(i)$ d'un conducteur ohmique est une <strong>droite passant par l'origine</strong>, de pente $R$. Sa puissance dissipée $P=Ri^2=u^2/R$ est toujours <strong>positive</strong> : un conducteur ohmique est un récepteur pur, incapable de fournir de l'énergie — il ne fait que la dissiper sous forme de chaleur (effet Joule).</p>
    <p><strong>Contre-exemple à méditer :</strong> tous les dipôles ne sont pas des récepteurs purs. Une diode électroluminescente (LED), par exemple, a une caractéristique $u=f(i)$ qui n'est PAS une droite par l'origine — elle ne conduit quasiment aucun courant tant que $u$ reste sous un seuil (environ 2V pour une LED rouge), puis conduit brutalement au-delà. Mais même une LED reste un récepteur au sens énergétique : ce n'est pas la forme non linéaire de la caractéristique qui permettrait de fournir de l'énergie, seule une caractéristique passant par un point où $u$ et $i$ sont de signes opposés (comme une pile) le permettrait.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 80" width="100%">
          <line x1="15" y1="65" x2="130" y2="65" stroke="#3A4658" stroke-width="1"/>
          <line x1="15" y1="10" x2="15" y2="65" stroke="#3A4658" stroke-width="1"/>
          <line x1="15" y1="65" x2="110" y2="15" stroke="#F0B94D" stroke-width="1.8"/>
          <text x="112" y="14" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">pente = R</text>
          <text x="120" y="72" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">i</text>
          <text x="6" y="14" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">u</text>
        </svg>
        <span>Caractéristique u=Ri d'un conducteur ohmique : droite par l'origine</span>
      </div>
    </div>

    <h3>4. Transfert de puissance maximal — adaptation d'impédance</h3>
    <p>Un générateur réel de f.é.m. $E$ et de résistance interne $r$ alimente une résistance de charge $R$. La puissance qu'il lui transmet vaut $P(R)=\\dfrac{E^2 R}{(R+r)^2}$. En cherchant le maximum de $P(R)$ (dérivée nulle), on trouve la condition d'<strong>adaptation d'impédance</strong> :</p>
    <div class="formula-box">$$R = r \\quad \\Longrightarrow \\quad P_{max} = \\frac{E^2}{4r}$$</div>
    <div class="key-point">
      <span class="eyebrow">Application</span>
      Ce résultat, très général, explique pourquoi les fabricants d'enceintes audio ou d'antennes cherchent à adapter l'impédance de la charge à celle de la source : c'est la seule façon de transférer le maximum de puissance disponible.
    </div>

    <h3>5. Frontière de la recherche — la puissance électrique à toutes les échelles</h3>
    <p>Le transport de l'électricité à très haute tension (jusqu'à 800 000 V pour certaines lignes) repose directement sur le calcul de puissance de ce chapitre : à puissance transportée égale, augmenter la tension permet de diminuer le courant, donc de réduire drastiquement les pertes par effet Joule ($P_{pertes}=Ri^2$) le long des câbles — c'est ce principe, appliqué à l'échelle de continents entiers, qui rend le réseau électrique mondial économiquement viable.</p>
    <p><strong>Question ouverte :</strong> à l'échelle inverse, celle des microprocesseurs, la dissipation de puissance par effet Joule dans des milliards de transistors devient le principal facteur limitant : au-delà d'une certaine densité, la chaleur générée ne peut plus être évacuée assez vite, ce qu'on appelle le « mur thermique ». Trouver des architectures de calcul fondamentalement moins dissipatives (calcul réversible, électronique supraconductrice) reste un axe de recherche majeur pour l'avenir de l'informatique.</p>
    <p><strong>Technologie émergente :</strong> les convertisseurs de puissance à haut rendement (utilisés dans les chargeurs rapides, les onduleurs de panneaux solaires, les voitures électriques) sont conçus, composant par composant, pour approcher au plus près la condition d'adaptation d'impédance de ce chapitre — chaque pourcent de rendement gagné représentant des économies d'énergie considérables à l'échelle mondiale.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Dipôle + convention → P=ui → signe (récepteur/générateur) → bilan global (conservation) → optimisation (adaptation d'impédance)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$P_{max} = \\frac{E^2}{4r} \\quad \\text{pour} \\quad R=r$$
      La condition d'adaptation d'impédance — l'un des résultats les plus utilisés de toute l'ingénierie électrique, du transport d'énergie à la conception d'antennes.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Puissance reçue P=ui (convention récepteur) ; P>0 → récepteur réel, P<0 → générateur réel</li>
        <li>Bilan de puissance : Σ P fournies = Σ P reçues, à chaque instant, dans tout circuit</li>
        <li>Un conducteur ohmique est un récepteur pur : P=Ri²=u²/R est toujours ≥ 0</li>
        <li>Adaptation d'impédance : la puissance transmise à une charge R est maximale quand R=r (résistance interne du générateur), et vaut alors E²/(4r)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que le signe de P=ui dépend entièrement de la convention (récepteur/générateur) choisie au départ</li>
        <li>Croire qu'un conducteur ohmique peut fournir de l'énergie — c'est physiquement impossible, sa puissance est toujours positive</li>
        <li>Confondre la condition d'adaptation (R=r, puissance maximale transmise) avec la condition de rendement maximal (qui correspond à R→∞, pas R=r)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un générateur de f.é.m. E=12 V et de résistance interne r=2 Ω est branché sur une charge R adaptée. La puissance maximale transmise vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec2e1" value="wrong"> 72 W</label>
          <label class="option"><input type="radio" name="elec2e1" value="right"> 18 W</label>
          <label class="option"><input type="radio" name="elec2e1" value="wrong"> 6 W</label>
          <label class="option"><input type="radio" name="elec2e1" value="wrong"> 144 W</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec2e1','elec2fb1','Correct — Pmax=E²/(4r)=12²/(4×2)=144/8=18 W.','Utilise Pmax=E²/(4r), avec E=12 et r=2.')">Vérifier</button>
        <div class="feedback" id="elec2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans une convention récepteur, un dipôle a P=ui&lt;0. On peut en conclure que ce dipôle se comporte, à cet instant, comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec2e2" value="wrong"> un récepteur pur</label>
          <label class="option"><input type="radio" name="elec2e2" value="right"> un générateur (il fournit de l'énergie)</label>
          <label class="option"><input type="radio" name="elec2e2" value="wrong"> un interrupteur ouvert</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec2e2','elec2fb2','Correct — une puissance reçue négative signifie que le dipôle fournit en réalité de l\\'énergie au circuit.','P reçue négative veut dire que le dipôle ne consomme pas d\\'énergie : il en fournit.')">Vérifier</button>
        <div class="feedback" id="elec2fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pourquoi un conducteur ohmique ne peut-il jamais fournir de puissance au reste du circuit ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec2e3" value="right"> Sa caractéristique passe par l'origine et sa puissance Ri² est toujours positive</label>
          <label class="option"><input type="radio" name="elec2e3" value="wrong"> Il possède toujours une f.é.m. interne négative</label>
          <label class="option"><input type="radio" name="elec2e3" value="wrong"> Sa résistance R peut devenir négative</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec2e3','elec2fb3','Correct — P=Ri² est un carré multiplié par R>0, donc toujours positif ou nul.','Regarde la formule P=Ri² : peut-elle jamais être négative ?')">Vérifier</button>
        <div class="feedback" id="elec2fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Une ligne électrique de résistance totale $R_{ligne}=5\\,\\Omega$ doit transporter une puissance de 100 kW jusqu'à une habitation. Propose une démarche pour comparer les pertes par effet Joule dans la ligne selon qu'on transporte cette puissance sous 230 V ou sous 20 000 V (haute tension, avant transformation). Pourquoi ce calcul justifie-t-il, à lui seul, l'existence des lignes à haute tension ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : à puissance transportée P=UI fixée, exprime le courant I en fonction de U, puis les pertes $P_{pertes}=R_{ligne}I^2$ en fonction de U — que devient cette expression quand U est très grand ?</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on pouvait fabriquer un matériau parfaitement supraconducteur (résistance nulle) à température ambiante : la notion d'adaptation d'impédance aurait-elle encore un intérêt pour le transport d'énergie ?</li>
        <li>Pourquoi la condition d'adaptation d'impédance (R=r, puissance maximale) est-elle différente de la condition de rendement maximal (R→∞) ? Ces deux objectifs sont-ils compatibles pour un même système ?</li>
        <li>Quelle serait la conséquence, pour la sécurité d'un réseau électrique domestique, d'un disjoncteur qui ne réagirait qu'à la tension et jamais à la puissance dissipée ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. P. Joule, « On the Production of Heat by Voltaic Electricity », <em>Philosophical Transactions of the Royal Society</em>, 1841 — découverte expérimentale de la loi de Joule.</li>
        <li>J.-P. Pérez, <em>Électronique — Fondements et applications</em>, Dunod (chapitre sur les bilans de puissance et l'adaptation d'impédance).</li>
        <li>N. Tesla, brevets sur le transport de courant alternatif à haute tension, 1888-1891 — fondements techniques du transport moderne de l'électricité.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Le bilan de puissance que tu maîtrises désormais est un outil de vérification précieux pour tous les circuits à venir — n'hésite jamais à t'en servir pour contrôler un calcul. Le chapitre suivant, « Circuit RLC série : régime transitoire », approfondira l'étude du régime transitoire déjà entrevue, en s'attardant cette fois sur l'énergie échangée entre le condensateur et la bobine au cours des oscillations. Comme le résumait Joule à l'issue de ses propres expériences : « La quantité de chaleur produite est toujours proportionnelle au carré du courant. »</p>
  `
};

ELEC_NOVA_KB[elecKey('Puissance en régime stationnaire')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Puissance en régime stationnaire ». Demande-moi le bilan de puissance, l'adaptation d'impédance, ou un indice sur un exercice.",
  rules: [
    { test:/bilan/i, replies:["Le bilan de puissance impose Σ P fournies = Σ P reçues à chaque instant : c'est la conservation de l'énergie appliquée au circuit."] },
    { test:/adaptation|impedance|impédance/i, replies:["L'adaptation d'impédance : la puissance transmise à une charge R est maximale quand R=r (résistance interne du générateur), et vaut alors Pmax=E²/(4r)."] },
    { test:/signe|r[ée]cepteur|g[ée]n[ée]rateur/i, replies:["En convention récepteur, P=ui>0 signifie que le dipôle consomme réellement de l'énergie ; P<0 signifie qu'il en fournit, même s'il est habituellement 'récepteur' (ex: batterie en charge)."] },
    { test:/joule|ohmique/i, replies:["Un conducteur ohmique est un récepteur pur : sa puissance P=Ri²=u²/R est toujours positive ou nulle, jamais négative."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise directement la formule Pmax=E²/(4r).","Indice niveau 2 : E=12, r=2, donc E²=144 et 4r=8.","Indice niveau 3 : Pmax=144/8=18 W."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : que signifie une puissance reçue négative ?","Indice niveau 2 : le dipôle ne consomme pas, il fournit de l'énergie.","Indice niveau 3 : il se comporte comme un générateur."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : regarde la formule P=Ri².","Indice niveau 2 : c'est un carré (i²) multiplié par R positif.","Indice niveau 3 : P est donc toujours ≥ 0."] }
  ]
};

/* =========================== CHAPITRE — Circuit RLC série : régime transitoire =========================== */
ELEC_CHAPTERS[elecKey('Circuit RLC série : régime transitoire')] = {
  objectives: [
    "Écrire l'équation différentielle du second ordre régissant un circuit RLC série sous forme canonique",
    "Identifier le régime transitoire (apériodique, critique, pseudo-périodique) à partir du facteur de qualité",
    "Exprimer la pseudo-période et interpréter le rôle de l'amortissement",
    "Relier la rapidité de la réponse au choix du régime critique",
    "Analyser un système asservi (suspension, régulateur) pour évaluer si son réglage se rapproche du régime critique ou s'en écarte"
  ],
  prereqs: ["Régime transitoire : circuits RC et RL"],
  bodyHtml: `
    <p>Ferme la portière d'une voiture haut de gamme et observe : elle se referme d'un mouvement net, sans rebond ni oscillation résiduelle. Ferme celle d'un vieux modèle mal entretenu, et elle peut au contraire claquer trop fort, ou rebondir plusieurs fois avant de se stabiliser. Ces deux comportements ne sont pas qu'une question de qualité de fabrication : ce sont, littéralement, deux régimes différents du même système du second ordre que ce chapitre va formaliser — appliqué ici à un amortisseur mécanique, mais mathématiquement identique au circuit RLC électrique.</p>
    <p>Ce même arbitrage entre rapidité et stabilité se retrouve partout où un système doit revenir à l'équilibre après une perturbation : la suspension d'une voiture, le pilote automatique d'un avion, ou même le thermostat qui régule la température d'un four. Régler ces systèmes, c'est presque toujours chercher à s'approcher du fameux régime critique que tu vas étudier ici.</p>
    <p>Ce chapitre approfondit quantitativement l'étude du circuit RLC série déjà entrevue qualitativement, en la reliant explicitement au facteur de qualité Q — établissant ainsi un pont solide entre le régime transitoire et le régime sinusoïdal forcé étudiés précédemment.</p>

    <h3>1. Équation différentielle sous forme canonique</h3>
    <p>Pour un RLC série alimenté par un échelon de tension $E$, la loi des mailles donne $LC\\ddot u_C + RC\\dot u_C + u_C = E$, que l'on réécrit sous la <strong>forme canonique</strong> universelle des systèmes du second ordre :</p>
    <div class="formula-box">$$\\ddot u_C + \\frac{\\omega_0}{Q}\\dot u_C + \\omega_0^2 u_C = \\omega_0^2 E$$</div>
    <p>avec la <strong>pulsation propre</strong> $\\omega_0=\\dfrac{1}{\\sqrt{LC}}$ et le <strong>facteur de qualité</strong> $Q=\\dfrac{1}{R}\\sqrt{\\dfrac{L}{C}}$ (les mêmes grandeurs que celles définies pour la résonance en régime sinusoïdal).</p>

    <h3>2. Équation caractéristique et trois régimes</h3>
    <p>L'équation caractéristique associée, $r^2+\\dfrac{\\omega_0}{Q}r+\\omega_0^2=0$, a un discriminant dont le signe fixe le régime. On distingue traditionnellement selon la valeur de $Q$ par rapport à $\\frac12$ (ou, de façon équivalente, $R$ par rapport à la résistance critique $R_c=2\\sqrt{L/C}$) :</p>
    <table class="mini-table">
      <tr><th>Régime</th><th>Condition</th><th>Solution $u_C(t)-E$</th></tr>
      <tr><td>Apériodique</td><td>$Q<\\frac12$ ($R>R_c$)</td><td>somme de deux exponentielles décroissantes, sans oscillation</td></tr>
      <tr><td>Critique</td><td>$Q=\\frac12$ ($R=R_c$)</td><td>$(A+Bt)\\,e^{-\\omega_0 t}$ — retour le plus rapide sans dépassement</td></tr>
      <tr><td>Pseudo-périodique</td><td>$Q>\\frac12$ ($R<R_c$)</td><td>$e^{-t/\\tau}\\big(A\\cos(\\Omega t)+B\\sin(\\Omega t)\\big)$, oscillations amorties</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le seuil qui sépare les trois régimes est exactement Q=1/2, ni plus ni moins. Ce nombre « 1/2 » n'a rien d'arbitraire — il vient directement de la structure de l'équation caractéristique. Pourrais-tu deviner, sans redémontrer tout le calcul, pourquoi la valeur exacte 1/2 apparaît (indice : relie-la au discriminant de l'équation caractéristique donnée juste au-dessus) ?
    </div>

    <h3>3. Régime pseudo-périodique en détail</h3>
    <p>Dans ce régime (le plus riche), les oscillations amorties ont pour <strong>pseudo-pulsation</strong> :</p>
    <div class="formula-box">$$\\Omega = \\omega_0\\sqrt{1-\\frac{1}{4Q^2}}, \\qquad \\text{pseudo-période } T=\\frac{2\\pi}{\\Omega}$$</div>
    <p>et pour temps caractéristique de décroissance de l'enveloppe $\\tau=\\dfrac{2Q}{\\omega_0}$. Plus $Q$ est grand, plus $\\Omega$ se rapproche de $\\omega_0$ et plus l'amortissement est lent (les oscillations durent longtemps avant de s'éteindre).</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 90" width="100%">
          <line x1="10" y1="45" x2="150" y2="45" stroke="#3A4658" stroke-width="1"/>
          <path d="M10,45 C 20,10 30,10 40,45 C 50,68 60,68 70,45 C 78,30 85,30 92,45 C 98,53 103,53 108,45 C 112,40 116,40 120,45" stroke="#4C7CFF" stroke-width="1.6" fill="none"/>
          <path d="M10,45 Q 60,-5 150,45" stroke="#F0B94D" stroke-width="1" stroke-dasharray="2,2" fill="none"/>
        </svg>
        <span>Régime pseudo-périodique : oscillations amorties (courbe bleue) sous une enveloppe exponentielle (pointillés)</span>
      </div>
    </div>

    <h3>4. Le régime critique : la réponse la plus rapide</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi le régime critique est privilégié en ingénierie</span>
      Parmi les trois régimes, c'est le régime <strong>critique</strong> ($Q=\\frac12$) qui ramène le système le plus rapidement possible vers le régime permanent, <em>sans jamais le dépasser</em> (pas de dépassement, ni oscillation résiduelle). C'est pourquoi de nombreux systèmes asservis (suspensions de voiture, régulateurs) sont conçus pour fonctionner proche de ce régime.
    </div>
    <p><strong>Cas limite à retenir :</strong> le régime critique est un cas extrêmement particulier — mathématiquement, c'est le seul des trois où l'équation caractéristique a une racine <strong>double</strong> (et non deux racines distinctes réelles ou complexes conjuguées). C'est précisément cette racine double qui explique l'apparition inhabituelle du terme $Bt$ (et non simplement $B$) dans la solution $(A+Bt)e^{-\\omega_0 t}$ — une conséquence directe et classique de la théorie des équations différentielles linéaires à racine double.</p>

    <h3>5. Analogie électromécanique</h3>
    <p>Cette équation est mathématiquement identique à celle de l'oscillateur mécanique amorti (masse-ressort-frottement) :</p>
    <table class="mini-table">
      <tr><th>Électrique</th><th>Mécanique</th></tr>
      <tr><td>$L$ (inductance)</td><td>$m$ (masse)</td></tr>
      <tr><td>$1/C$ (inverse capacité)</td><td>$k$ (raideur du ressort)</td></tr>
      <tr><td>$R$ (résistance)</td><td>coefficient de frottement visqueux</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Cette analogie électromécanique va dans les deux sens : un ingénieur peut aussi bien simuler un système mécanique avec un circuit électrique que l'inverse. Dans quelles situations pratiques cela pourrait-il être avantageux de remplacer l'étude d'un système mécanique coûteux ou dangereux par un circuit électrique équivalent, bien plus simple à construire et à faire varier en laboratoire ?
    </div>

    <h3>6. Frontière de la recherche — le régime critique au-delà du RLC</h3>
    <p>Le concept de régime critique dépasse largement le cadre du circuit RLC : c'est un problème central en théorie du contrôle (asservissement), où l'on cherche systématiquement à régler un système bouclé (un pilote automatique, un bras robotique, un stabilisateur d'image) au plus près de ce régime, afin d'obtenir la réponse la plus rapide sans dépassement dangereux. Les correcteurs PID (proportionnel-intégral-dérivé), omniprésents dans l'industrie, sont réglés précisément dans cet esprit.</p>
    <p><strong>Question ouverte :</strong> pour des systèmes bien plus complexes qu'un simple RLC (un avion de ligne, un réacteur chimique, un réseau électrique national), l'équivalent du régime critique n'a souvent pas de solution analytique simple, et son réglage optimal reste un problème d'optimisation numérique difficile, activement étudié en automatique et en intelligence artificielle appliquée au contrôle de systèmes.</p>
    <p><strong>Technologie émergente :</strong> les suspensions actives de nouvelle génération (utilisées dans certains véhicules haut de gamme) ajustent en temps réel, via des capteurs et des actionneurs électroniques, l'équivalent du facteur de qualité Q de la suspension — passant dynamiquement d'un réglage proche du critique (confort) à un réglage plus amorti (stabilité en virage), selon les conditions de conduite.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Échelon appliqué → équation du 2nd ordre → facteur de qualité Q → régime (apériodique / critique / pseudo-périodique) → retour au régime permanent
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\ddot u_C + \\frac{\\omega_0}{Q}\\dot u_C + \\omega_0^2 u_C = \\omega_0^2 E$$
      La forme canonique universelle de tout système linéaire du second ordre — électrique, mécanique, ou même économique — encapsulée dans deux seuls paramètres, ω₀ et Q.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Forme canonique : ü_C + (ω0/Q)u̇_C + ω0²u_C = ω0²E, avec ω0=1/√(LC) et Q=(1/R)√(L/C)</li>
        <li>Trois régimes selon Q vs 1/2 : apériodique (Q<1/2), critique (Q=1/2), pseudo-périodique (Q>1/2)</li>
        <li>Pseudo-pulsation Ω=ω0√(1−1/(4Q²)) &lt; ω0 en régime pseudo-périodique</li>
        <li>Le régime critique offre le retour le plus rapide vers l'équilibre, sans dépassement</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que le régime pseudo-périodique est le plus rapide — c'est en réalité le régime critique</li>
        <li>Confondre pseudo-pulsation Ω (régime amorti, toujours &lt; ω0) et pulsation propre ω0 (système non amorti)</li>
        <li>Oublier que le critère Q vs 1/2 est équivalent au critère R vs Rc=2√(L/C), juste exprimé différemment</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un circuit RLC série a un facteur de qualité Q=0,3. Son régime transitoire est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec5e1" value="right"> apériodique</label>
          <label class="option"><input type="radio" name="elec5e1" value="wrong"> critique</label>
          <label class="option"><input type="radio" name="elec5e1" value="wrong"> pseudo-périodique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec5e1','elec5fb1','Correct — Q=0,3 &lt; 1/2, donc le régime est apériodique (retour sans oscillation).','Compare Q=0,3 à la valeur seuil 1/2=0,5.')">Vérifier</button>
        <div class="feedback" id="elec5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quel régime permet le retour le plus rapide vers le régime permanent, sans aucun dépassement ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec5e2" value="wrong"> apériodique</label>
          <label class="option"><input type="radio" name="elec5e2" value="right"> critique</label>
          <label class="option"><input type="radio" name="elec5e2" value="wrong"> pseudo-périodique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec5e2','elec5fb2','Correct — le régime critique (Q=1/2) offre le meilleur compromis rapidité/absence de dépassement.','Relis le point clé sur le régime critique dans le cours.')">Vérifier</button>
        <div class="feedback" id="elec5fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">En régime pseudo-périodique, la pseudo-pulsation Ω, comparée à la pulsation propre ω0, est toujours :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec5e3" value="right"> inférieure à ω0</label>
          <label class="option"><input type="radio" name="elec5e3" value="wrong"> supérieure à ω0</label>
          <label class="option"><input type="radio" name="elec5e3" value="wrong"> égale à ω0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec5e3','elec5fb3','Correct — Ω=ω0√(1−1/(4Q²)) &lt; ω0, car le terme sous la racine est toujours strictement inférieur à 1.','Regarde la formule Ω=ω0√(1−1/(4Q²)) : le terme sous la racine est-il inférieur ou supérieur à 1 ?')">Vérifier</button>
        <div class="feedback" id="elec5fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Tu conçois une suspension de voiture (masse m, raideur de ressort k, coefficient de frottement variable c) et tu veux la régler pour qu'elle se rapproche le plus possible du régime critique. Propose une démarche, en utilisant l'analogie électromécanique du tableau, pour déterminer la valeur du coefficient de frottement critique $c_c$ en fonction de $m$ et $k$. Que se passerait-il concrètement pour les passagers si $c$ était choisi bien inférieur à $c_c$ ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : utilise la correspondance $L\\leftrightarrow m$, $1/C\\leftrightarrow k$, $R\\leftrightarrow c$, et applique la formule $R_c=2\\sqrt{L/C}$ du RLC à ces nouvelles variables.</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on pouvait ajuster Q en temps réel dans un circuit RLC : à quoi ressemblerait un système capable de passer instantanément d'un régime pseudo-périodique à un régime critique selon les besoins ?</li>
        <li>Pourquoi le régime apériodique, bien que plus « lent » que le critique, reste-t-il parfois préférable en ingénierie — dans quelles situations un léger excès de prudence (temps de réponse plus long) est-il préférable à un risque de dépassement, même minime ?</li>
        <li>Quelle serait la conséquence, pour la précision d'un instrument de mesure à aiguille (galvanomètre), d'un amortissement bien trop faible (Q très grand) ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J.-P. Pérez, <em>Électronique — Fondements et applications</em>, Dunod (chapitre sur le régime transitoire du second ordre et les trois régimes).</li>
        <li>K. Ogata, <em>Modern Control Engineering</em>, Pearson — référence classique sur le réglage des systèmes asservis autour du régime critique.</li>
        <li>N. Minorsky, « Directional Stability of Automatically Steered Bodies », <em>Journal of the American Society for Naval Engineers</em>, 1922 — l'un des articles fondateurs de la théorie du contrôle PID.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu maîtrises désormais l'un des systèmes les plus universels de toute la physique et de l'ingénierie — le second ordre amorti. Le chapitre suivant, « Puissance en régime sinusoïdal forcé », clôt le triptyque du régime sinusoïdal en s'intéressant à l'énergie moyenne réellement consommée par un circuit qui oscille sans cesse. Comme le résumait un vieux principe d'ingénierie : « Un système bien réglé ne se voit jamais — c'est celui qui claque, oscille ou traîne qui attire l'attention. »</p>
  `
};

ELEC_NOVA_KB[elecKey('Circuit RLC série : régime transitoire')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Circuit RLC série : régime transitoire ». Demande-moi un des trois régimes, la pseudo-pulsation, ou un indice sur un exercice.",
  rules: [
    { test:/ap[ée]riodique/i, replies:["Le régime apériodique (Q<1/2, R>Rc) correspond à un retour lent vers le régime permanent, sans aucune oscillation."] },
    { test:/critique/i, replies:["Le régime critique (Q=1/2, R=Rc=2√(L/C)) offre le retour le plus rapide possible vers l'équilibre, sans dépassement ni oscillation."] },
    { test:/pseudo[- ]p[ée]riodique|oscillation/i, replies:["Le régime pseudo-périodique (Q>1/2, R<Rc) produit des oscillations amorties, de pseudo-pulsation Ω=ω0√(1−1/(4Q²)) &lt; ω0."] },
    { test:/forme canonique|[ée]quation diff[ée]rentielle/i, replies:["Forme canonique : ü_C+(ω0/Q)u̇_C+ω0²u_C=ω0²E, avec ω0=1/√(LC) et Q=(1/R)√(L/C)."] },
    { test:/analogie|m[ée]canique/i, replies:["Analogie électromécanique : L↔m (masse), 1/C↔k (raideur), R↔coefficient de frottement — même équation différentielle."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare Q à la valeur seuil 1/2.","Indice niveau 2 : 0,3 est inférieur à 0,5.","Indice niveau 3 : c'est le régime apériodique."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : lequel des trois régimes n'a ni oscillation ni lenteur excessive ?","Indice niveau 2 : c'est un compromis entre les deux autres.","Indice niveau 3 : c'est le régime critique."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : regarde la formule Ω=ω0√(1−1/(4Q²)).","Indice niveau 2 : le terme sous la racine est toujours &lt; 1.","Indice niveau 3 : donc Ω &lt; ω0, toujours."] }
  ]
};

/* =========================== CHAPITRE — Puissance en régime sinusoïdal forcé =========================== */
ELEC_CHAPTERS[elecKey('Puissance en régime sinusoïdal forcé')] = {
  objectives: [
    "Calculer la puissance instantanée et la puissance moyenne (active) reçue par un dipôle",
    "Définir la valeur efficace d'une grandeur sinusoïdale et l'utiliser dans les calculs de puissance",
    "Introduire le facteur de puissance cos φ et son rôle dans les installations électriques",
    "Faire le bilan énergétique d'un circuit RLC série en régime sinusoïdal",
    "Analyser la facture énergétique d'une installation industrielle pour évaluer si un relèvement du facteur de puissance serait économiquement justifié"
  ],
  prereqs: ["Régime sinusoïdal permanent"],
  bodyHtml: `
    <p>Ouvre la facture d'électricité d'une usine, et tu y trouveras souvent une ligne mystérieuse absente de ta propre facture domestique : une pénalité liée à « l'énergie réactive ». Cette ligne n'a rien d'arbitraire — elle sanctionne un phénomène physique précis que ce chapitre va te permettre de comprendre : toute la puissance électrique consommée par une installation ne se transforme pas en travail utile, et les distributeurs d'électricité facturent la différence.</p>
    <p>Ce concept de « puissance active » face à « puissance apparente » n'est pas qu'une subtilité comptable pour ingénieurs : c'est lui qui explique pourquoi le compteur électrique de ta maison affiche des kilowattheures et non simplement des ampères, et pourquoi certains gros consommateurs industriels installent des batteries de condensateurs uniquement pour... ne pas payer plus cher une électricité qu'ils n'ont même pas vraiment consommée.</p>
    <p>Ce chapitre clôt le triptyque du régime sinusoïdal (notation complexe, résonance, puissance) en s'attaquant à une question a priori simple mais aux implications économiques considérables : combien d'énergie un circuit oscillant consomme-t-il réellement, en moyenne, sur une période ?</p>

    <h3>1. Valeur efficace (RMS)</h3>
    <p>Pour une grandeur sinusoïdale $x(t)=X_m\\cos(\\omega t)$, la <strong>valeur efficace</strong> $X_{eff}$ (ou RMS, root mean square) est définie comme la valeur continue qui dissiperait la même puissance moyenne dans une résistance :</p>
    <div class="formula-box">$$X_{eff} = \\frac{X_m}{\\sqrt2}$$</div>
    <p>C'est cette valeur efficace qu'affichent les multimètres, et que désigne, par exemple, la tension « 230 V » du secteur (la valeur crête réelle est $230\\sqrt2\\approx325$ V).</p>

    <h3>2. Puissance instantanée</h3>
    <p>Pour un dipôle soumis à $u(t)=U_m\\cos(\\omega t)$ et parcouru par $i(t)=I_m\\cos(\\omega t-\\varphi)$, la puissance instantanée $p(t)=u(t)i(t)$ se développe en :</p>
    <div class="formula-box">$$p(t) = U_{eff}I_{eff}\\cos\\varphi + U_{eff}I_{eff}\\cos(2\\omega t-\\varphi)$$</div>
    <p>Elle comporte un terme <strong>constant</strong> et un terme oscillant à la pulsation double $2\\omega$, de valeur moyenne nulle.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le terme oscillant de $p(t)$ vibre à $2\\omega$ — le double de la pulsation du courant et de la tension. À quelle transformation trigonométrique élémentaire ce doublement de fréquence est-il directement lié, et pourquoi n'est-il pas surprenant qu'un produit de deux sinusoïdes de même fréquence fasse apparaître une fréquence double ?
    </div>

    <h3>3. Puissance moyenne (active) et facteur de puissance</h3>
    <p>Seul le terme constant subsiste en moyenne : c'est la <strong>puissance moyenne</strong> (ou puissance active), la seule qui corresponde à une consommation d'énergie réelle :</p>
    <div class="formula-box">$$P = U_{eff}I_{eff}\\cos\\varphi$$</div>
    <p>Le terme $\\cos\\varphi$ s'appelle le <strong>facteur de puissance</strong>. Le produit $S=U_{eff}I_{eff}$ (sans le $\\cos\\varphi$) est appelé <strong>puissance apparente</strong>, exprimée en volt-ampères (VA) et non en watts.</p>
    <div class="key-point">
      <span class="eyebrow">Cas particuliers</span>
      Pour une <strong>résistance pure</strong> ($\\varphi=0$) : $P=U_{eff}I_{eff}$, puissance maximale, entièrement dissipée. Pour un <strong>condensateur ou une bobine purs</strong> ($\\varphi=\\pm90°$) : $\\cos\\varphi=0$, donc $P=0$ — ces composants n'absorbent <em>aucune</em> puissance moyenne, ils échangent seulement de l'énergie avec le générateur sans la dissiper.
    </div>

    <h3>4. Enjeu industriel du facteur de puissance</h3>
    <p>Un facteur de puissance faible ($\\cos\\varphi$ proche de 0) signifie qu'un courant important circule dans les câbles (pertes en ligne par effet Joule) sans que cela corresponde à une puissance active utile transmise. Les distributeurs d'électricité pénalisent financièrement les installations industrielles dont le facteur de puissance est trop faible, ce qui pousse à installer des batteries de condensateurs pour le <strong>relever</strong> (compensation de l'énergie réactive).</p>
    <p><strong>Cas limite à retenir :</strong> compenser l'énergie réactive ne réduit jamais la puissance active $P$ réellement consommée par l'installation (les moteurs, machines, etc. continuent de consommer exactement la même énergie utile) — cela ne fait que réduire le courant $I_{eff}$ nécessaire pour la transporter, en rapprochant $\\cos\\varphi$ de 1. Une installation « parfaitement compensée » ($\\cos\\varphi=1$) consomme donc exactement la même énergie facturée en kWh qu'avant compensation, mais impose beaucoup moins de contraintes (et de pertes) sur le réseau de distribution.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une usine ajoute des condensateurs pour relever son facteur de puissance de 0,7 à 0,95. Sa facture d'électricité en kWh (énergie active) baisse-t-elle pour autant, ou est-ce autre chose qui change dans sa facture ?
    </div>

    <h3>5. Bilan énergétique d'un RLC série</h3>
    <p>Dans un RLC série en régime sinusoïdal établi, toute l'énergie moyenne fournie par le générateur est dissipée par effet Joule dans $R$ (la bobine et le condensateur, en moyenne sur une période, n'échangent de l'énergie qu'entre eux, sans en dissiper) :</p>
    <div class="formula-box">$$P_{moyenne} = R\\,I_{eff}^2$$</div>

    <h3>6. Frontière de la recherche — l'énergie réactive à l'échelle des réseaux</h3>
    <p>La gestion de l'énergie réactive n'est pas qu'un enjeu d'usine isolée : à l'échelle d'un réseau électrique national entier, un mauvais contrôle du facteur de puissance global peut provoquer des instabilités de tension, voire contribuer à des coupures en cascade (black-out). Les gestionnaires de réseaux (comme RTE en France) surveillent en permanence cet équilibre et pilotent à distance des bancs de condensateurs et de bobines répartis sur tout le territoire pour le maintenir.</p>
    <p><strong>Question ouverte :</strong> avec la multiplication des énergies renouvelables intermittentes (éolien, solaire) connectées au réseau via des convertisseurs électroniques, le comportement réactif du réseau électrique change profondément par rapport à l'époque des grosses centrales tournantes classiques — comment concevoir des convertisseurs capables de fournir eux-mêmes de la puissance réactive de soutien reste un sujet de recherche actif en génie électrique.</p>
    <p><strong>Technologie émergente :</strong> les compensateurs statiques de puissance réactive (STATCOM), à base d'électronique de puissance rapide, remplacent de plus en plus les bancs de condensateurs classiques pour ajuster le facteur de puissance en quasi temps réel, avec une précision et une rapidité impossibles pour les équipements électromécaniques traditionnels.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Grandeur sinusoïdale → valeur efficace → puissance instantanée $p(t)$ → moyenne temporelle → puissance active $P=U_{eff}I_{eff}\\cos\\varphi$
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$P = U_{eff} I_{eff} \\cos\\varphi$$
      La seule formule qui compte vraiment pour une facture d'électricité en régime sinusoïdal — tout le reste du chapitre n'est qu'une façon d'y arriver et de la justifier physiquement.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Valeur efficace : Xeff=Xm/√2 — c'est elle qu'affichent les appareils de mesure</li>
        <li>Puissance moyenne (active) : P=Ueff·Ieff·cos φ, seule composante correspondant à une vraie consommation</li>
        <li>Résistance pure : P maximale (cos φ=1) ; condensateur/bobine purs : P=0 (cos φ=0)</li>
        <li>Dans un RLC série, toute la puissance moyenne fournie est dissipée par effet Joule dans R : P=R·Ieff²</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser la valeur crête Um au lieu de la valeur efficace Ueff dans les formules de puissance</li>
        <li>Oublier le facteur cos φ et calculer P=Ueff·Ieff (puissance apparente) au lieu de la puissance active réelle</li>
        <li>Croire qu'une bobine ou un condensateur dissipe de la puissance en régime sinusoïdal — leur puissance moyenne est rigoureusement nulle</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La tension du secteur français a une valeur efficace de 230 V. Sa valeur crête Um vaut environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec7e1" value="wrong"> 230 V</label>
          <label class="option"><input type="radio" name="elec7e1" value="right"> 325 V</label>
          <label class="option"><input type="radio" name="elec7e1" value="wrong"> 163 V</label>
          <label class="option"><input type="radio" name="elec7e1" value="wrong"> 460 V</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec7e1','elec7fb1','Correct — Um=Ueff×√2=230×1,414≈325 V.','Utilise Um=Ueff×√2, avec Ueff=230.')">Vérifier</button>
        <div class="feedback" id="elec7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une bobine idéale (sans résistance) est parcourue par un courant sinusoïdal. Sa puissance moyenne consommée est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec7e2" value="wrong"> maximale</label>
          <label class="option"><input type="radio" name="elec7e2" value="right"> nulle</label>
          <label class="option"><input type="radio" name="elec7e2" value="wrong"> négative</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec7e2','elec7fb2','Correct — pour une bobine pure, φ=90°, donc cos φ=0 et P=Ueff·Ieff·cos φ=0.','Pour une bobine pure, quel est le déphasage φ entre u et i, et que vaut alors cos φ ?')">Vérifier</button>
        <div class="feedback" id="elec7fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pourquoi les distributeurs d'électricité pénalisent-ils un facteur de puissance trop faible ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec7e3" value="right"> Le courant dans les câbles est plus élevé sans transmettre plus de puissance utile</label>
          <label class="option"><input type="radio" name="elec7e3" value="wrong"> Cela fait exploser les transformateurs immédiatement</label>
          <label class="option"><input type="radio" name="elec7e3" value="wrong"> Un cos φ faible augmente directement la tension du réseau</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec7e3','elec7fb3','Correct — un cos φ faible impose un courant Ieff élevé pour une même puissance active, donc plus de pertes Joule dans les câbles.','Relis le paragraphe sur l\\'enjeu industriel du facteur de puissance.')">Vérifier</button>
        <div class="feedback" id="elec7fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Une usine consomme une puissance active de 100 kW avec un facteur de puissance de 0,6. Propose une démarche pour déterminer le courant efficace supplémentaire (par rapport à un facteur de puissance idéal de 1) que doit supporter la ligne d'alimentation, à tension et puissance active fixées. Explique en quoi ce surplus de courant justifie économiquement l'achat de condensateurs de compensation, même s'ils ne réduisent en rien l'énergie active facturée.</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : exprime $I_{eff}=P/(U_{eff}\\cos\\varphi)$ pour les deux valeurs de cos φ (0,6 puis 1), à P et Ueff fixés, puis compare.</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si un dipôle avait un facteur de puissance négatif : que signifierait physiquement un tel cas, et un dipôle purement passif (R, L, C) peut-il y parvenir ?</li>
        <li>Pourquoi la puissance apparente S=Ueff·Ieff se mesure-t-elle en volt-ampères et non en watts, alors que les deux ont dimensionnellement la même unité physique ?</li>
        <li>Quelle serait la conséquence, pour la conception du réseau électrique national, d'un monde où tous les appareils domestiques auraient spontanément un facteur de puissance proche de 0 ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>C. P. Steinmetz, « Complex Quantities and Their Use in Electrical Engineering », <em>AIEE Proceedings</em>, 1893 — formalisation historique de la puissance en régime sinusoïdal via les complexes.</li>
        <li>J.-P. Pérez, <em>Électronique — Fondements et applications</em>, Dunod (chapitre sur la puissance en régime sinusoïdal forcé et le facteur de puissance).</li>
        <li>RTE France, <em>Bilan électrique et perspectives</em>, rapports annuels — données réelles sur la gestion de l'énergie réactive à l'échelle du réseau national.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu achèves ici le triptyque du régime sinusoïdal permanent — notation complexe, résonance, puissance — qui te suivra dans toute étude ultérieure de circuits en courant alternatif. Les deux derniers chapitres de cette matière, consacrés aux filtres, t'apprendront à exploiter ce même formalisme pour façonner délibérément la réponse en fréquence d'un circuit. Comme le disait Steinmetz avec la clarté qui a fait sa renommée d'ingénieur : « L'électricité alternative n'est compliquée que pour qui refuse les nombres complexes. »</p>
  `
};

ELEC_NOVA_KB[elecKey('Puissance en régime sinusoïdal forcé')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Puissance en régime sinusoïdal forcé ». Demande-moi la valeur efficace, la puissance moyenne, le facteur de puissance, ou un indice sur un exercice.",
  rules: [
    { test:/efficace|rms/i, replies:["La valeur efficace Xeff=Xm/√2 est celle qu'affichent les multimètres — elle correspond à la valeur continue équivalente en termes de puissance dissipée."] },
    { test:/puissance moyenne|puissance active/i, replies:["La puissance moyenne (active) vaut P=Ueff·Ieff·cos φ : c'est la seule composante correspondant à une consommation d'énergie réelle."] },
    { test:/facteur de puissance|cos ?[φp]/i, replies:["Le facteur de puissance cos φ mesure la part de puissance apparente (Ueff·Ieff) réellement transformée en puissance active. Un cos φ faible impose un courant élevé pour peu de puissance utile."] },
    { test:/apparente/i, replies:["La puissance apparente S=Ueff·Ieff se mesure en volt-ampères (VA), sans tenir compte du déphasage — elle diffère de la puissance active P=S·cos φ."] },
    { test:/bobine|condensateur pur/i, replies:["Une bobine ou un condensateur purs ont φ=±90°, donc cos φ=0 : leur puissance moyenne consommée est rigoureusement nulle."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise Um=Ueff×√2.","Indice niveau 2 : √2≈1,414.","Indice niveau 3 : Um=230×1,414≈325 V."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : quel est le déphasage φ pour une bobine pure ?","Indice niveau 2 : φ=90°, donc cos φ=0.","Indice niveau 3 : P=0."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense au lien entre cos φ et le courant nécessaire pour une puissance donnée.","Indice niveau 2 : à P fixée, Ieff augmente si cos φ diminue.","Indice niveau 3 : plus de courant = plus de pertes Joule dans les câbles."] }
  ]
};

/* =========================== CHAPITRE — Filtres du premier ordre =========================== */
ELEC_CHAPTERS[elecKey('Filtres du premier ordre')] = {
  objectives: [
    "Définir un quadripôle et distinguer quadripôle passif et quadripôle actif",
    "Définir la fonction de transfert complexe H(jω) d'un filtre et calculer gain et déphasage",
    "Tracer les asymptotes d'un diagramme de Bode en gain (échelle décibels)",
    "Étudier les filtres passe-bas et passe-haut du premier ordre (structure RC)",
    "Analyser le spectre d'un signal donné pour évaluer quel type de filtre (passe-bas ou passe-haut) et quelle fréquence de coupure permettraient d'en extraire la composante utile"
  ],
  prereqs: ["Régime sinusoïdal permanent"],
  bodyHtml: `
    <p>En 1928, Harold Stephen Black, ingénieur aux laboratoires Bell, griffonne sur un journal plié en deux, dans le ferry qui le mène au travail, le schéma d'un amplificateur à contre-réaction qui va révolutionner les télécommunications — un système capable de filtrer et stabiliser un signal électrique avec une précision inédite. Cette anecdote, aussi pittoresque soit-elle, illustre un fait essentiel : les filtres électriques ne sont pas une curiosité académique, mais l'un des outils les plus décisifs de toute l'histoire des télécommunications modernes.</p>
    <p>Chaque fois que tu écoutes de la musique, un égaliseur graphique ajuste l'amplitude de différentes bandes de fréquences — un filtre. Chaque fois que ton téléphone capte un appel sans être parasité par le Wi-Fi voisin, c'est un filtre qui sépare les fréquences. Même ton oreille interne fonctionne, en première approximation, comme une batterie de filtres passe-bande naturels.</p>
    <p>Ce chapitre introduit le vocabulaire et les outils fondamentaux de l'étude des filtres : quadripôle, fonction de transfert, diagramme de Bode — puis les applique aux deux filtres du premier ordre les plus simples, brique de base de tous les filtres plus complexes que tu étudieras ensuite.</p>

    <h3>1. Qu'est-ce qu'un quadripôle ?</h3>
    <p>Un <strong>quadripôle</strong> est un système à quatre bornes : deux bornes d'entrée (reliées à un générateur, tension $u_e$, courant $i_e$) et deux bornes de sortie (reliées à une charge, tension $u_s$, courant $i_s$). Un filtre n'est qu'un cas particulier de quadripôle.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 200 70" width="100%">
          <rect x="70" y="15" width="60" height="40" fill="none" stroke="#4C7CFF" stroke-width="1.6"/>
          <text x="78" y="39" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">Quadripôle</text>
          <line x1="15" y1="20" x2="70" y2="20" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="15" y1="50" x2="70" y2="50" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="130" y1="20" x2="185" y2="20" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="130" y1="50" x2="185" y2="50" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="15" y="14" font-family="IBM Plex Mono" font-size="8" fill="#2DD4C4">ie, ue</text>
          <text x="150" y="14" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">is, us</text>
        </svg>
        <span>Un générateur attaque l'entrée (ue, ie), une charge est reliée à la sortie (us, is)</span>
      </div>
    </div>
    <p>Un quadripôle est dit <strong>linéaire</strong> si, en régime sinusoïdal forcé, une entrée sinusoïdale $u_e=U_{em}\\cos(\\omega t+\\varphi_e)$ produit toujours une sortie sinusoïdale $u_s=U_{sm}\\cos(\\omega t+\\varphi_s)$, à la <em>même</em> pulsation $\\omega$. Le <strong>théorème de superposition</strong> s'y applique alors directement : la réponse à $u_e=\\lambda_1 u_{e1}+\\lambda_2 u_{e2}$ est $u_s=\\lambda_1 u_{s1}+\\lambda_2 u_{s2}$.</p>

    <table class="mini-table">
      <tr><th>Type</th><th>Composition</th><th>Exemple</th></tr>
      <tr><td><strong>Quadripôle passif</strong></td><td>uniquement des dipôles passifs (R, L, C)</td><td>un simple diviseur RC</td></tr>
      <tr><td><strong>Quadripôle actif</strong></td><td>contient une source d'énergie électrique, typiquement un amplificateur opérationnel (AO) en régime linéaire</td><td>un filtre actif à AO</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — définition d'un filtre</span>
      Un <strong>filtre</strong> est précisément un quadripôle linéaire dont la tension de sortie est nulle (filtre idéal) ou atténuée (filtre réel) dans un certain domaine de fréquences. Tout ce qui suit dans ce chapitre n'est qu'une application de cette définition générale à des cas particuliers (passe-bas, passe-haut...).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La définition d'un quadripôle linéaire impose qu'une entrée sinusoïdale de pulsation ω produise toujours une sortie sinusoïdale à la MÊME pulsation ω. Pourquoi ce fait, en apparence anodin, est-il justement ce qui permet de parler d'un « gain » et d'un « déphasage » uniques pour chaque fréquence — et que se passerait-il si un quadripôle produisait une sortie à une fréquence différente de l'entrée ?
    </div>

    <h3>2. Fonction de transfert et diagramme de Bode</h3>
    <p>Pour un quadripôle linéaire, on définit $\\underline H(j\\omega)=\\dfrac{\\underline{u_s}}{\\underline{u_e}}$, rapport de la tension de sortie sur la tension d'entrée. C'est un nombre complexe, quotient de deux polynômes en $j\\omega$ à coefficients réels : $\\underline H(j\\omega)=\\dfrac{N(j\\omega)}{D(j\\omega)}$. L'<strong>ordre</strong> du quadripôle est le degré du plus haut polynôme, $N$ ou $D$. On caractérise $\\underline H$ par :</p>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Définition</th></tr>
      <tr><td>Gain en décibels</td><td>$G_{dB}=20\\log_{10}|\\underline H|$</td></tr>
      <tr><td>Déphasage</td><td>$\\varphi = \\arg(\\underline H)$</td></tr>
    </table>
    <p>Le <strong>diagramme de Bode</strong> représente $G_{dB}$ et $\\varphi$ en fonction de $\\log(\\omega)$ (ou $\\log(f)$) : cette échelle logarithmique permet de visualiser un très large domaine de fréquences sur un même graphe.</p>

    <h3>3. Filtre passe-bas du premier ordre</h3>
    <p>Le circuit RC série (tension de sortie prise aux bornes du condensateur) a pour fonction de transfert :</p>
    <div class="formula-box">$$\\underline H(j\\omega) = \\frac{1}{1+j\\dfrac{\\omega}{\\omega_c}}, \\qquad \\omega_c = \\frac{1}{RC} \\text{ (pulsation de coupure)}$$</div>
    <table class="mini-table">
      <tr><th>Domaine</th><th>Comportement asymptotique du gain</th></tr>
      <tr><td>$\\omega \\ll \\omega_c$</td><td>$G_{dB}\\approx 0$ dB (signal transmis sans atténuation)</td></tr>
      <tr><td>$\\omega \\gg \\omega_c$</td><td>$G_{dB}$ décroît de $-20$ dB par décade</td></tr>
    </table>
    <p>À la pulsation de coupure $\\omega=\\omega_c$, le gain vaut $G_{dB}=-3$ dB (atténuation de $\\dfrac{1}{\\sqrt2}$ en amplitude) : c'est la définition conventionnelle de la <strong>bande passante</strong> du filtre.</p>
    <p><strong>Cas limite à retenir :</strong> une pente de $-20$ dB/décade signifie concrètement que multiplier la fréquence par 10 divise l'amplitude du signal de sortie par 10 (et non par 20, malgré le nombre « 20 » dans la formule — c'est un facteur logarithmique, pas linéaire). Un filtre du second ordre, que tu étudieras au chapitre suivant, atteint une pente double, $-40$ dB/décade, bien plus efficace pour éliminer les fréquences indésirables.</p>

    <h3>4. Filtre passe-haut du premier ordre</h3>
    <p>En prenant la tension de sortie aux bornes de la résistance du même circuit RC, on obtient un filtre passe-haut :</p>
    <div class="formula-box">$$\\underline H(j\\omega) = \\frac{j\\dfrac{\\omega}{\\omega_c}}{1+j\\dfrac{\\omega}{\\omega_c}}$$</div>
    <p>Comportement inverse du passe-bas : $G_{dB}$ croît de $+20$ dB/décade pour $\\omega\\ll\\omega_c$, puis tend vers $0$ dB pour $\\omega\\gg\\omega_c$.</p>

    <h3>5. Caractère intégrateur ou dérivateur</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Loin de sa pulsation de coupure, un filtre du premier ordre peut se comporter comme une opération mathématique simple : un <strong>passe-bas</strong>, en très haute fréquence ($\\omega\\gg\\omega_c$), se comporte comme un <strong>intégrateur</strong> ($\\underline H\\approx \\omega_c/(j\\omega)$) ; un <strong>passe-haut</strong>, en très basse fréquence ($\\omega\\ll\\omega_c$), se comporte comme un <strong>dérivateur</strong> ($\\underline H\\approx j\\omega/\\omega_c$).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un intégrateur électronique RC et un dérivateur RC sont construits à partir des mêmes deux composants R et C — seule la sortie choisie (aux bornes de C ou de R) change. Pourquoi le même circuit physique peut-il réaliser deux opérations mathématiques aussi différentes (intégration et dérivation) selon un simple choix de bornes de mesure ?
    </div>

    <h3>6. Frontière de la recherche — filtrer au-delà de l'électronique classique</h3>
    <p>Le filtrage n'est pas propre à l'électronique : le traitement d'image (flou gaussien, détection de contours) applique exactement les mêmes concepts de fonction de transfert à des signaux à deux dimensions ; le cerveau humain lui-même semble effectuer un filtrage neuronal des signaux visuels et auditifs pour en extraire les informations pertinentes, un sujet d'étude actif en neurosciences computationnelles.</p>
    <p><strong>Question ouverte :</strong> les filtres analogiques classiques (comme ceux de ce chapitre) sont de plus en plus remplacés, dans les appareils modernes, par des filtres numériques (calculés par un processeur sur un signal échantillonné) — mais cette conversion pose ses propres défis, notamment le respect du théorème de Shannon-Nyquist sur la fréquence d'échantillonnage, condition nécessaire pour ne pas perdre d'information lors de la numérisation. Où placer la frontière entre filtrage analogique (avant numérisation) et filtrage numérique (après) reste un arbitrage central en conception de systèmes électroniques.</p>
    <p><strong>Technologie émergente :</strong> les filtres à ondes acoustiques de surface (SAW) et à résonateurs BAW, utilisés dans presque tous les smartphones pour isoler les bandes de fréquences 4G/5G/Wi-Fi, exploitent des vibrations mécaniques à l'échelle micrométrique plutôt que des composants R, L, C classiques — un changement de principe physique, mais un objectif de filtrage identique à celui de ce chapitre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Signal d'entrée → quadripôle linéaire → fonction de transfert H(jω) → gain/déphasage selon ω → sortie filtrée
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\underline H(j\\omega) = \\frac{1}{1+j\\dfrac{\\omega}{\\omega_c}} \\qquad (\\text{passe-bas}) \\qquad\\qquad \\underline H(j\\omega) = \\frac{j\\dfrac{\\omega}{\\omega_c}}{1+j\\dfrac{\\omega}{\\omega_c}} \\qquad (\\text{passe-haut})$$
      Ces deux fonctions de transfert, miroirs l'une de l'autre, sont les briques élémentaires à partir desquelles tous les filtres plus complexes se construisent.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un quadripôle a 4 bornes (entrée ue,ie / sortie us,is) ; il est passif s'il ne contient que R, L, C, actif s'il contient une source (souvent un AO)</li>
        <li>Un filtre est un quadripôle linéaire particulier, dont la sortie est nulle ou atténuée sur un domaine de fréquences</li>
        <li>Gain en décibels : GdB=20 log|H| ; diagramme de Bode = GdB et φ en fonction de log(ω)</li>
        <li>Passe-bas RC 1er ordre : ωc=1/RC, pente asymptotique −20 dB/décade en haute fréquence</li>
        <li>Passe-haut RC 1er ordre : pente asymptotique +20 dB/décade en basse fréquence</li>
        <li>À ω=ωc, GdB=−3 dB : c'est la définition de la fréquence de coupure et de la bande passante</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'un quadripôle passif peut amplifier un signal — seul un quadripôle actif (contenant une source, souvent un AO) le peut</li>
        <li>Confondre la pente en dB/décade (−20 pour un 1er ordre) avec une pente en dB/octave (qui vaudrait alors −6)</li>
        <li>Inverser les comportements passe-bas et passe-haut en haute/basse fréquence</li>
        <li>Oublier que le gain à la coupure n'est pas 0 dB mais −3 dB (facteur 1/√2 en amplitude, pas 1/2)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un quadripôle ne comportant que des résistances, des condensateurs et des bobines est dit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec8e0" value="right"> passif</label>
          <label class="option"><input type="radio" name="elec8e0" value="wrong"> actif</label>
          <label class="option"><input type="radio" name="elec8e0" value="wrong"> instable</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec8e0','elec8fb0','Correct — un quadripôle passif ne contient que des dipôles passifs R, L, C, sans source d\\'énergie.','Un quadripôle actif contient toujours une source d\\'énergie, typiquement un amplificateur opérationnel.')">Vérifier</button>
        <div class="feedback" id="elec8fb0"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour un filtre passe-bas du premier ordre RC, la pulsation de coupure ωc vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec8e1" value="wrong"> RC</label>
          <label class="option"><input type="radio" name="elec8e1" value="right"> 1/(RC)</label>
          <label class="option"><input type="radio" name="elec8e1" value="wrong"> R/C</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec8e1','elec8fb1','Correct — ωc=1/RC (l\\'inverse du temps de relaxation τ=RC vu en régime transitoire).','C\\'est l\\'inverse de la constante de temps τ=RC déjà rencontrée en régime transitoire.')">Vérifier</button>
        <div class="feedback" id="elec8fb1"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">En très haute fréquence, un filtre passe-bas du premier ordre se comporte comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec8e2" value="right"> un intégrateur</label>
          <label class="option"><input type="radio" name="elec8e2" value="wrong"> un dérivateur</label>
          <label class="option"><input type="radio" name="elec8e2" value="wrong"> un amplificateur parfait</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec8e2','elec8fb2','Correct — H≈ωc/(jω) en très haute fréquence, ce qui correspond mathématiquement à une intégration.','Relis le point clé sur le caractère intégrateur/dérivateur d\\'un filtre du premier ordre.')">Vérifier</button>
        <div class="feedback" id="elec8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4</span>
        <p class="q">À la pulsation de coupure ωc, le gain GdB d'un filtre du premier ordre vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec8e3" value="wrong"> 0 dB</label>
          <label class="option"><input type="radio" name="elec8e3" value="right"> −3 dB</label>
          <label class="option"><input type="radio" name="elec8e3" value="wrong"> −20 dB</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec8e3','elec8fb3','Correct — à ω=ωc, |H|=1/√2, donc GdB=20log(1/√2)≈−3 dB.','La coupure conventionnelle correspond à une atténuation d\\'amplitude de 1/√2, pas de 1/2.')">Vérifier</button>
        <div class="feedback" id="elec8fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 5 — à modéliser toi-même</span>
        <p class="q">Un microphone capte à la fois la voix humaine (essentiellement entre 300 Hz et 3 kHz) et un bourdonnement parasite du secteur à 50 Hz. Propose une démarche pour choisir le type de filtre du premier ordre (passe-bas ou passe-haut) et une pulsation de coupure appropriée afin d'éliminer autant que possible le bourdonnement à 50 Hz sans trop atténuer la voix. Ce filtre du premier ordre suffira-t-il à éliminer complètement le parasite, ou seulement à l'atténuer ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : le parasite (50 Hz) est à une fréquence bien plus basse que la voix (300 Hz-3 kHz) — quel type de filtre laisse passer les hautes fréquences en atténuant les basses ?</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si un quadripôle produisait, pour une entrée sinusoïdale, une sortie à une fréquence différente de l'entrée : la notion même de fonction de transfert H(jω), telle que définie ici, aurait-elle encore un sens ?</li>
        <li>Pourquoi une pente de −20 dB/décade, qui semble « douce », suffit-elle pourtant à diviser l'amplitude par 1000 en seulement 3 décades de fréquence ?</li>
        <li>Quelle serait la conséquence, pour la qualité d'un enregistrement audio, d'un ingénieur du son qui confondrait systématiquement filtre passe-bas et filtre passe-haut lors du mixage ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>H. W. Bode, <em>Network Analysis and Feedback Amplifier Design</em>, Van Nostrand, 1945 — ouvrage fondateur du diagramme qui porte son nom.</li>
        <li>J.-P. Pérez, <em>Électronique — Fondements et applications</em>, Dunod (chapitre sur les quadripôles et les filtres du premier ordre).</li>
        <li>C. E. Shannon, « Communication in the Presence of Noise », <em>Proceedings of the IRE</em>, 1949 — théorème d'échantillonnage essentiel pour relier filtrage analogique et numérique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu maîtrises maintenant les deux filtres les plus simples, brique de base de tout le filtrage électronique. Le chapitre suivant, « Filtres du second ordre », t'apprendra à construire des filtres bien plus sélectifs — passe-bande, coupe-bande — en combinant les mêmes idées avec un degré de liberté supplémentaire. Comme le disait Bode lui-même, dont les travaux ont façonné toute l'électronique moderne : « La rétroaction est à l'ingénierie ce que la respiration est à la vie. »</p>
  `
};

ELEC_NOVA_KB[elecKey('Filtres du premier ordre')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Filtres du premier ordre ». Demande-moi ce qu'est un quadripôle, la fonction de transfert, le diagramme de Bode, ou un indice sur un exercice.",
  rules: [
    { test:/quadripôle|quadripole/i, replies:["Un quadripôle a 4 bornes (entrée ue,ie et sortie us,is). Il est passif s'il ne contient que R, L, C ; actif s'il contient une source d'énergie, souvent un amplificateur opérationnel."] },
    { test:/bode|d[ée]cibel|gain/i, replies:["Le diagramme de Bode trace GdB=20log|H| et φ=arg(H) en fonction de log(ω). Utile pour visualiser un large domaine de fréquences."] },
    { test:/passe[- ]bas/i, replies:["Passe-bas RC 1er ordre : H=1/(1+jω/ωc), avec ωc=1/RC. Pente asymptotique en haute fréquence : −20 dB/décade."] },
    { test:/passe[- ]haut/i, replies:["Passe-haut RC 1er ordre : H=(jω/ωc)/(1+jω/ωc). Pente asymptotique en basse fréquence : +20 dB/décade."] },
    { test:/int[ée]grateur|d[ée]rivateur/i, replies:["Un passe-bas en très haute fréquence se comporte comme un intégrateur ; un passe-haut en très basse fréquence se comporte comme un dérivateur."] },
    { test:/coupure/i, replies:["La pulsation de coupure ωc=1/RC correspond à un gain de −3 dB (atténuation d'amplitude de 1/√2), pas 0 dB."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : ce quadripôle ne contient-il que des dipôles R, L, C ?","Indice niveau 2 : sans aucune source d'énergie, il est passif.","Indice niveau 3 : c'est un quadripôle passif."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : c'est l'inverse d'une grandeur déjà rencontrée en régime transitoire.","Indice niveau 2 : c'est l'inverse de τ=RC.","Indice niveau 3 : ωc=1/RC."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : regarde H en très haute fréquence.","Indice niveau 2 : H≈ωc/(jω), ce qui correspond à une opération mathématique précise.","Indice niveau 3 : c'est un intégrateur."] },
    { test:/exercice\s*4/i, hint:true, replies:["Pour l'exercice 4 : à la coupure, |H|=1/√2.","Indice niveau 2 : GdB=20log(1/√2).","Indice niveau 3 : c'est environ −3 dB."] }
  ]
};

/* =========================== CHAPITRE — Filtres du second ordre =========================== */
ELEC_CHAPTERS[elecKey('Filtres du second ordre')] = {
  objectives: [
    "Écrire la fonction de transfert canonique d'un filtre du second ordre (ω0, Q)",
    "Comparer les pentes asymptotiques d'un filtre du second ordre à celles du premier ordre",
    "Identifier la condition de surtension (résonance en amplitude) selon la valeur de Q",
    "Étudier le filtre passe-bande RLC série et sa sélectivité",
    "Analyser un cahier des charges de filtrage (fréquences à isoler, sélectivité requise) pour évaluer si un premier ou un second ordre est nécessaire"
  ],
  prereqs: ["Filtres du premier ordre", "Circuit RLC série : régime transitoire"],
  bodyHtml: `
    <p>Un égaliseur graphique de studio d'enregistrement professionnel peut isoler une bande de fréquences aussi étroite que quelques dizaines de hertz, au milieu d'un spectre audio qui s'étend sur plus de dix mille hertz — une prouesse de sélectivité totalement hors de portée des filtres du premier ordre étudiés au chapitre précédent. Cette sélectivité accrue n'est pas magique : elle découle directement d'un unique degré de liberté supplémentaire, le facteur de qualité Q, déjà rencontré pour la résonance du circuit RLC.</p>
    <p>Cette même idée de filtrage sélectif du second ordre gouverne le tri des canaux radio et télévision (chaque chaîne occupant une bande de fréquences précise), la séparation des graves et des aigus dans une enceinte acoustique à plusieurs haut-parleurs (filtre « crossover »), ou encore l'imagerie médicale par résonance magnétique, où la sélection fine d'une fréquence de résonance nucléaire permet de reconstruire une image du corps humain.</p>
    <p>Ce dernier chapitre de la matière rassemble tout ce que tu as appris sur le RLC — régime transitoire, résonance, notation complexe — pour construire des filtres bien plus performants que ceux du premier ordre : coupure deux fois plus nette, et un phénomène entièrement nouveau, la résonance en amplitude.</p>

    <h3>1. Forme canonique</h3>
    <p>Un filtre passe-bas du second ordre a pour fonction de transfert canonique :</p>
    <div class="formula-box">$$\\underline H(j\\omega) = \\frac{H_0}{1 + j\\dfrac{1}{Q}\\dfrac{\\omega}{\\omega_0} - \\left(\\dfrac{\\omega}{\\omega_0}\\right)^2}$$</div>
    <p>où l'on reconnaît les mêmes grandeurs $\\omega_0$ (pulsation propre) et $Q$ (facteur de qualité) que dans l'étude du régime transitoire RLC — un même circuit physique gouverne les deux comportements.</p>

    <h3>2. Comportement asymptotique</h3>
    <table class="mini-table">
      <tr><th>Domaine</th><th>Pente du gain (passe-bas 2nd ordre)</th></tr>
      <tr><td>$\\omega \\ll \\omega_0$</td><td>$G_{dB}\\approx 0$ dB</td></tr>
      <tr><td>$\\omega \\gg \\omega_0$</td><td>$-40$ dB/décade (le double d'un premier ordre !)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — coupure plus nette</span>
      La pente asymptotique de $-40$ dB/décade (contre $-20$ dB/décade pour un premier ordre) signifie qu'un filtre du second ordre <strong>sépare beaucoup mieux</strong> les fréquences à conserver de celles à éliminer, pour une même pulsation de coupure — c'est pourquoi on les préfère dans de nombreuses applications audio ou de traitement du signal.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Passer d'un premier à un second ordre double la pente asymptotique (−20 à −40 dB/décade). En suivant cette logique, à combien de dB/décade s'attendrait-on pour un filtre du quatrième ordre ? Qu'est-ce que cela suggère sur le lien entre l'ordre d'un filtre et le degré du polynôme au dénominateur de sa fonction de transfert ?
    </div>

    <h3>3. Résonance en amplitude</h3>
    <p>Contrairement au premier ordre, le gain d'un filtre du second ordre peut présenter un <strong>maximum local</strong> (surtension) autour de $\\omega_0$. Cette résonance en amplitude n'apparaît que si :</p>
    <div class="formula-box">$$Q > \\frac{1}{\\sqrt2} \\approx 0{,}707$$</div>
    <p>Plus $Q$ est grand, plus le pic de résonance est prononcé et étroit — exactement comme pour la résonance en intensité déjà étudiée pour le RLC série en régime sinusoïdal.</p>
    <p><strong>Cas limite à retenir :</strong> le seuil $Q=1/\\sqrt2$ n'est pas le même que le seuil $Q=1/2$ qui séparait les régimes apériodique et pseudo-périodique en régime transitoire (chapitre précédent) ! Un circuit avec $1/2<Q<1/\\sqrt2$ oscille donc bien en régime transitoire (il « dépasse » sa valeur finale avant de se stabiliser) sans pour autant présenter de résonance en amplitude en régime forcé — deux phénomènes voisins mais rigoureusement distincts, à ne jamais confondre.</p>

    <h3>4. Le filtre passe-bande RLC série</h3>
    <p>La tension prise aux bornes de la résistance $R$ d'un RLC série constitue un filtre <strong>passe-bande</strong> naturel :</p>
    <div class="formula-box">$$\\underline H(j\\omega) = \\frac{1}{1+jQ\\left(\\dfrac{\\omega}{\\omega_0}-\\dfrac{\\omega_0}{\\omega}\\right)}$$</div>
    <p>Le gain est maximal ($|H|=1$) exactement à $\\omega=\\omega_0$, et décroît de part et d'autre avec des pentes asymptotiques de $+20$ dB/décade en basse fréquence et $-20$ dB/décade en haute fréquence. Sa bande passante à $-3$ dB vaut $\\Delta\\omega=\\omega_0/Q$ : plus $Q$ est grand, plus le filtre est <strong>sélectif</strong> (bande étroite).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le filtre passe-bande RLC série utilise le MÊME circuit physique que celui étudié pour le régime transitoire et la résonance en intensité. Peux-tu identifier, sans recalculer, à quelle grandeur déjà rencontrée dans les chapitres précédents correspond exactement le gain maximal |H|=1 obtenu ici à ω=ω0 ?
    </div>

    <h3>5. Filtre passe-haut du second ordre</h3>
    <p>Par dualité avec le passe-bas, un passe-haut du second ordre a une pente asymptotique de $+40$ dB/décade en basse fréquence, et tend vers $0$ dB en haute fréquence.</p>

    <h3>6. Frontière de la recherche — la sélectivité, un enjeu sans limite haute</h3>
    <p>Un filtre du second ordre à Q élevé permet une sélectivité déjà impressionnante — mais certaines applications de pointe exigent bien plus. Les cavités résonantes utilisées dans les horloges atomiques ou les lasers de très haute précision atteignent des facteurs de qualité de plusieurs millions, voire milliards, bien au-delà de ce qu'un simple circuit RLC macroscopique peut espérer atteindre (les pertes résistives, même infimes, limitent Q en pratique). Ces résonateurs ultra-sélectifs sont ce qui permet, par exemple, au GPS de fournir une localisation précise à quelques mètres près, en s'appuyant sur des horloges atomiques embarquées d'une stabilité de fréquence extraordinaire.</p>
    <p><strong>Question ouverte :</strong> à mesure que les filtres électroniques (RLC, à quartz, ou intégrés) sont poussés vers des facteurs de qualité toujours plus élevés, le bruit thermique et les imperfections de fabrication deviennent les facteurs limitants ultimes — quelles nouvelles technologies (résonateurs optomécaniques, circuits supraconducteurs) permettront de repousser encore cette limite reste un axe de recherche actif en métrologie de précision.</p>
    <p><strong>Technologie émergente :</strong> les filtres numériques programmables (implémentés par calcul sur un signal échantillonné plutôt que par des composants R, L, C physiques) permettent aujourd'hui de synthétiser des réponses en fréquence bien plus complexes et reconfigurables que n'importe quel filtre RLC analogique — au prix d'une consommation électrique et d'une complexité de calcul que le simple circuit de ce chapitre n'a jamais eu à affronter.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Circuit RLC → forme canonique (ω0, Q) → pente ±40 dB/décade → résonance en amplitude si Q>1/√2 → passe-bande sélectif (Δω=ω0/Q)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\underline H(j\\omega) = \\frac{H_0}{1 + j\\dfrac{1}{Q}\\dfrac{\\omega}{\\omega_0} - \\left(\\dfrac{\\omega}{\\omega_0}\\right)^2}$$
      La forme canonique de tout filtre du second ordre — retiens-la, elle synthétise à elle seule tout ce chapitre et fait le pont avec le régime transitoire RLC déjà étudié.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Forme canonique 2nd ordre : mêmes grandeurs ω0 et Q que pour le régime transitoire RLC</li>
        <li>Pente asymptotique : ±40 dB/décade (2nd ordre) contre ±20 dB/décade (1er ordre) — coupure plus nette</li>
        <li>Résonance en amplitude (surtension) uniquement si Q &gt; 1/√2 ≈ 0,707</li>
        <li>Passe-bande RLC série (sortie sur R) : gain max=1 à ω0, bande passante Δω=ω0/Q</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que tout filtre du second ordre présente une résonance en amplitude — ce n'est vrai que si Q &gt; 1/√2</li>
        <li>Confondre la pente −40 dB/décade (2nd ordre) et −20 dB/décade (1er ordre)</li>
        <li>Oublier que le Q du filtre passe-bande et celui du régime transitoire RLC sont la même grandeur physique</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">En très haute fréquence, la pente asymptotique du gain d'un passe-bas du second ordre est de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec9e1" value="wrong"> −20 dB/décade</label>
          <label class="option"><input type="radio" name="elec9e1" value="right"> −40 dB/décade</label>
          <label class="option"><input type="radio" name="elec9e1" value="wrong"> −60 dB/décade</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec9e1','elec9fb1','Correct — c\\'est le double d\\'un premier ordre, car le terme dominant en haute fréquence varie en ω².','Un filtre du second ordre a une pente double de celle d\\'un premier ordre.')">Vérifier</button>
        <div class="feedback" id="elec9fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un filtre du second ordre présente une résonance en amplitude (surtension) si :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec9e2" value="wrong"> Q &lt; 1/√2</label>
          <label class="option"><input type="radio" name="elec9e2" value="right"> Q &gt; 1/√2</label>
          <label class="option"><input type="radio" name="elec9e2" value="wrong"> Q = 0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec9e2','elec9fb2','Correct — la surtension n\\'apparaît que pour Q &gt; 1/√2 ≈ 0,707.','Relis la condition de résonance en amplitude donnée dans le cours.')">Vérifier</button>
        <div class="feedback" id="elec9fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour un filtre passe-bande RLC série de pulsation propre ω0=1000 rad/s et de facteur de qualité Q=20, la bande passante Δω vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elec9e3" value="wrong"> 20000 rad/s</label>
          <label class="option"><input type="radio" name="elec9e3" value="right"> 50 rad/s</label>
          <label class="option"><input type="radio" name="elec9e3" value="wrong"> 1000 rad/s</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elec9e3','elec9fb3','Correct — Δω=ω0/Q=1000/20=50 rad/s : un Q élevé donne une bande passante étroite, filtre très sélectif.','Utilise Δω=ω0/Q, avec ω0=1000 et Q=20.')">Vérifier</button>
        <div class="feedback" id="elec9fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Tu conçois un filtre « crossover » pour une enceinte acoustique à deux voies (un haut-parleur de graves, un de aigus), avec une fréquence de coupure souhaitée à 2 kHz. Propose une démarche pour comparer, en termes de qualité de séparation entre les deux haut-parleurs, l'usage d'un filtre du premier ordre contre un filtre du second ordre à cette même fréquence de coupure. Pourquoi les enceintes haut de gamme utilisent-elles presque toujours des filtres crossover du second ordre (voire plus), et non du premier ordre ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : compare, à une octave de la coupure, l'atténuation obtenue avec une pente de −20 dB/décade contre −40 dB/décade — quelle pente laisse le moins de recouvrement entre les deux haut-parleurs ?</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on combinait plusieurs filtres du second ordre en cascade : quelle pente asymptotique totale obtiendrait-on, et à quoi cela pourrait-il servir en pratique ?</li>
        <li>Pourquoi le seuil Q=1/√2 (résonance en amplitude) et le seuil Q=1/2 (régime pseudo-périodique) sont-ils différents, alors qu'ils décrivent tous deux un même circuit RLC, l'un en régime forcé et l'autre en régime transitoire ?</li>
        <li>Quelle serait la conséquence, pour la qualité d'une image IRM, d'une bobine de réception dont le facteur de qualité serait bien trop faible pour la fréquence de résonance recherchée ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>H. W. Bode, <em>Network Analysis and Feedback Amplifier Design</em>, Van Nostrand, 1945 — fondements théoriques des filtres et de leur diagramme de gain/phase.</li>
        <li>J.-P. Pérez, <em>Électronique — Fondements et applications</em>, Dunod (chapitre sur les filtres du second ordre et la résonance en amplitude).</li>
        <li>W. Cauer, <em>Theorie der linearen Wechselstromschaltungen</em>, 1941 — travaux fondateurs sur la synthèse des filtres électriques.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Te voilà arrivé au bout des neuf chapitres d'électrocinétique — des lois de Kirchhoff les plus élémentaires jusqu'aux filtres sélectifs les plus fins, en passant par le régime transitoire et la résonance. Ces outils te suivront dans toute étude ultérieure d'électronique, de traitement du signal ou de télécommunications. Comme le résumait Bode, dont les travaux ont façonné la théorie moderne des filtres : « Comprendre un système, c'est savoir prédire comment il répond à ce qu'on ne lui a pas encore demandé. »</p>
  `
};

ELEC_NOVA_KB[elecKey('Filtres du second ordre')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Filtres du second ordre ». Demande-moi la pente asymptotique, la résonance en amplitude, le passe-bande, ou un indice sur un exercice.",
  rules: [
    { test:/pente|asymptotique|40 ?db/i, replies:["La pente asymptotique d'un filtre du second ordre est de ±40 dB/décade — le double d'un premier ordre (±20 dB/décade)."] },
    { test:/r[ée]sonance|surtension/i, replies:["La résonance en amplitude (surtension) n'apparaît que si Q &gt; 1/√2 ≈ 0,707. En dessous, le gain décroît de façon monotone."] },
    { test:/passe[- ]bande/i, replies:["Le filtre passe-bande RLC série (sortie sur R) a un gain maximal =1 à ω0, et une bande passante Δω=ω0/Q : plus Q est grand, plus le filtre est sélectif."] },
    { test:/forme canonique|omega|\bq\b/i, replies:["La forme canonique du 2nd ordre utilise les mêmes ω0 et Q que le régime transitoire RLC : c'est le même circuit physique qui gouverne les deux comportements."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare au premier ordre.","Indice niveau 2 : c'est le double de la pente d'un premier ordre.","Indice niveau 3 : c'est −40 dB/décade."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : quelle est la valeur seuil de Q pour la résonance en amplitude ?","Indice niveau 2 : c'est 1/√2.","Indice niveau 3 : il faut Q &gt; 1/√2."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : utilise Δω=ω0/Q.","Indice niveau 2 : ω0=1000, Q=20.","Indice niveau 3 : Δω=1000/20=50 rad/s."] }
  ]
};

/* fusion dans les registres globaux, comme pour les autres chapitres d'Électrocinétique */
Object.assign(MATH_TOOLS_CHAPTERS, ELEC_CHAPTERS);
Object.assign(NOVA_KB, ELEC_NOVA_KB);