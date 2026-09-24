/* =====================================================================
   CHUNK « thd » — registre THD_CHAPTERS / THD_NOVA_KB
   Matière(s) : Physique|Thermodynamique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   THD_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* ============================================================================
   MODULE THERMODYNAMIQUE — Physique L2
   (contenu rédigé et enrichi à partir de sources de référence en thermodynamique
   macroscopique classique — principes de Carnot, Clausius, Kelvin ; théorie
   cinétique des gaz de Maxwell-Boltzmann ; relations de Clausius-Clapeyron et
   de Maxwell ; avec mise à jour sur les performances réelles des pompes à
   chaleur, d'après l'avis ADEME d'octobre 2025 sur les performances réelles
   des PAC — recherche web d'août 2026).
   Structure identique aux autres modules : THD_CHAPTERS / THD_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB. À ne pas confondre
   avec THERMO_MATIERE ('Thermochimie et équilibres chimiques', L1 Chimie),
   qui est un cours distinct déjà présent dans le fichier.
============================================================================ */
const THD_MATIERE = 'Thermodynamique';
function thdKey(chapterTitle){ return `Physique|${THD_MATIERE}|${chapterTitle}`; }
const THD_CHAPTERS = {};
const THD_NOVA_KB = {};

/* =========================== CHAPITRE 1 — Description des systèmes thermodynamiques =========================== */
THD_CHAPTERS[thdKey('Description des systèmes thermodynamiques : variables d\'état et équilibre')] = {
  objectives: [
    "Distinguer système ouvert, fermé et isolé, et définir les échanges possibles avec le milieu extérieur",
    "Différencier variables extensives et intensives, et définir une fonction d'état",
    "Définir l'équilibre thermodynamique et les grandes classes de transformations (isotherme, isobare, isochore, adiabatique, quasi-statique, réversible)",
    "Énoncer le principe zéro de la thermodynamique et son rôle dans la définition de la température",
    "Évaluer en quoi le fait que le principe zéro n'ait été formellement nommé qu'en 1931, bien après les autres principes de la thermodynamique, révèle que les fondations les plus élémentaires d'une théorie scientifique peuvent rester implicites longtemps avant d'être explicitement reconnues comme indispensables"
  ],
  prereqs: ["Mécanique du point matériel (L1)", "Notions de base sur la pression et la température"],
  bodyHtml: `
    <p>Le « principe zéro » de la thermodynamique porte un nom curieux : bien qu'il soit logiquement le plus fondamental de tous les principes thermodynamiques — celui qui légitime l'existence même de la température —, il ne fut formellement identifié et nommé qu'en 1931, par le physicien britannique Ralph Fowler, longtemps après que les premier, deuxième et troisième principes eurent déjà été numérotés et largement utilisés depuis le XIXe siècle. Fowler réalisa que ce principe, resté implicite et non formulé pendant près d'un siècle de développement de la thermodynamique, était en réalité indispensable et devait logiquement précéder tous les autres — d'où son numéro « zéro », attribué après coup pour respecter cette antériorité logique.</p>
    <p>Cette anecdote illustre un phénomène fréquent en sciences : les fondations les plus élémentaires d'une théorie sont parfois les dernières à être explicitement formulées, précisément parce qu'elles semblent trop évidentes pour être remarquées — jusqu'à ce qu'un esprit rigoureux comme Fowler s'aperçoive qu'aucune démonstration rigoureuse de la théorie ne pouvait se passer d'elles. Sans le principe zéro, la température elle-même — la toute première variable d'état que tu manipules en thermodynamique — ne serait qu'une notion informelle, dépourvue de justification logique rigoureuse.</p>
    <p>La thermodynamique étudie les échanges d'énergie (sous forme de travail et de chaleur) entre un système et son environnement, ainsi que les transformations de la matière qui les accompagnent. Contrairement à la mécanique du point, elle ne s'intéresse pas à la trajectoire de chaque particule individuelle, mais à un petit nombre de grandeurs macroscopiques mesurables — pression, volume, température — suffisantes pour décrire l'état d'équilibre d'un système contenant pourtant un nombre gigantesque de particules (de l'ordre du nombre d'Avogadro, $N_A\approx6{,}022\times10^{23}\,mol^{-1}$). À la fin de ce chapitre, tu sauras distinguer les types de systèmes et de variables d'état, définir une fonction d'état, et énoncer le principe zéro qui fonde la notion même de température.</p>

    <h3>1. Système, milieu extérieur et types d'échanges</h3>
    <p>On appelle <strong>système thermodynamique</strong> la portion de matière que l'on choisit d'étudier, délimitée par une frontière (réelle ou fictive) qui la sépare du <strong>milieu extérieur</strong>. Selon la nature des échanges possibles à travers cette frontière, on distingue trois types de systèmes :</p>
    <table class="mini-table">
      <tr><th>Type de système</th><th>Échange de matière</th><th>Échange d'énergie</th><th>Exemple</th></tr>
      <tr><td>Ouvert</td><td>Oui</td><td>Oui</td><td>Une casserole d'eau qui bout à l'air libre</td></tr>
      <tr><td>Fermé</td><td>Non</td><td>Oui</td><td>Un gaz enfermé dans un cylindre à piston mobile</td></tr>
      <tr><td>Isolé</td><td>Non</td><td>Non</td><td>Un calorimètre idéal, l'univers dans son ensemble</td></tr>
    </table>
    <p>La thermodynamique classique de L2 traite très majoritairement des <strong>systèmes fermés</strong> : c'est le cadre par défaut de tout ce cours, sauf mention contraire.</p>

    <h3>2. Variables d'état : extensives et intensives</h3>
    <p>L'état macroscopique d'équilibre d'un système est décrit par un petit ensemble de <strong>variables d'état</strong> (pression $P$, volume $V$, température $T$, quantité de matière $n$...), reliées entre elles par une <strong>équation d'état</strong> propre au système considéré (par exemple $PV=nRT$ pour un gaz parfait, cf. chapitre 2).</p>
    <div class="key-point">
      <span class="eyebrow">Grandeur extensive</span>
      Une grandeur est <strong>extensive</strong> si sa valeur pour un système est la somme des valeurs pour ses sous-parties : elle est proportionnelle à la quantité de matière. Exemples : le volume $V$, la masse $m$, l'énergie interne $U$, l'entropie $S$.
    </div>
    <div class="key-point">
      <span class="eyebrow">Grandeur intensive</span>
      Une grandeur est <strong>intensive</strong> si sa valeur ne dépend pas de la quantité de matière considérée : elle garde la même valeur en tout point d'un système homogène à l'équilibre. Exemples : la pression $P$, la température $T$, la masse volumique $\\\\rho$, le volume molaire $V_m$.
    </div>
    <p>Le rapport de deux grandeurs extensives donne toujours une grandeur intensive (ex. $V_m=V/n$) : c'est un moyen simple de vérifier la nature d'une grandeur composée.</p>

    <h3>3. Fonctions d'état</h3>
    <p>Une <strong>fonction d'état</strong> est une grandeur dont la valeur ne dépend que de l'état d'équilibre du système (donné par ses variables d'état), et non du chemin suivi pour atteindre cet état. L'énergie interne $U$, l'enthalpie $H$, l'entropie $S$ (chapitres suivants) sont des fonctions d'état : leur variation entre un état initial et un état final est indépendante de la transformation qui les relie, ce qui permet de calculer $\Delta U$, $\Delta H$ ou $\Delta S$ en choisissant un chemin fictif commode, même si la transformation réelle est irréversible. Le travail $W$ et la chaleur $Q$, à l'inverse, ne sont <strong>pas</strong> des fonctions d'état : leur valeur dépend explicitement du chemin suivi (on parle de grandeurs de transfert, ou d'échange).</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le fait que W et Q dépendent du chemin suivi, contrairement à U, H ou S, signifie que deux transformations différentes reliant les mêmes états initial et final peuvent échanger des quantités de travail et de chaleur très différentes, tout en produisant exactement la même variation d'énergie interne. Pourquoi cette possibilité — plusieurs chemins, même variation de fonction d'état, mais W et Q différents — ne contredit-elle pas le premier principe que tu étudieras au chapitre suivant ?
    </div>

    <h3>4. Équilibre thermodynamique et types de transformations</h3>
    <p>Un système est en <strong>équilibre thermodynamique</strong> lorsque ses variables d'état restent constantes au cours du temps et sont uniformes dans tout le système (équilibre mécanique : pas de gradient de pression ; équilibre thermique : pas de gradient de température ; équilibre chimique : pas de réaction en cours). Une <strong>transformation</strong> fait passer le système d'un état d'équilibre initial à un état d'équilibre final.</p>
    <table class="mini-table">
      <tr><th>Transformation</th><th>Grandeur maintenue constante</th></tr>
      <tr><td>Isotherme</td><td>Température $T$</td></tr>
      <tr><td>Isobare</td><td>Pression $P$</td></tr>
      <tr><td>Isochore</td><td>Volume $V$</td></tr>
      <tr><td>Adiabatique</td><td>Aucun échange de chaleur ($Q=0$)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Transformation quasi-statique et réversible</span>
      Une transformation est <strong>quasi-statique</strong> si elle est suffisamment lente pour que le système traverse une succession continue d'états d'équilibre (on peut alors définir $P$, $T$ à chaque instant de la transformation). Elle est de plus <strong>réversible</strong> si elle peut être parcourue en sens inverse en repassant exactement par les mêmes états, pour le système ET pour le milieu extérieur — ce qui exige en plus l'absence de tout phénomène dissipatif (frottements, diffusion thermique sous gradient fini...). Toute transformation réversible est quasi-statique, mais l'inverse est faux : une détente quasi-statique contre un frottement solide reste irréversible.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une transformation réversible est toujours quasi-statique, mais l'inverse est faux : une détente quasi-statique contre un frottement reste irréversible. En quoi cette distinction révèle-t-elle que la lenteur d'une transformation (le caractère quasi-statique) et l'absence de dissipation (la réversibilité) sont deux exigences logiquement indépendantes, même si elles sont souvent confondues intuitivement ?
    </div>

    <h3>5. Le principe zéro et la notion de température</h3>
    <p>Le <strong>principe zéro de la thermodynamique</strong> énonce que si deux systèmes A et B sont chacun en équilibre thermique avec un troisième système C, alors A et B sont en équilibre thermique entre eux. Ce principe, bien qu'intuitivement évident, est ce qui légitime l'existence même d'une grandeur unique, la <strong>température</strong>, permettant de comparer l'état thermique de systèmes sans les mettre directement en contact — c'est le fondement théorique de toute mesure thermométrique (le troisième système C n'étant autre que le thermomètre lui-même).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> la masse volumique $\\\\rho=m/V$ est-elle une grandeur extensive ou intensive ? Justifier à partir de la nature de $m$ et $V$.</p>
      <p><strong>Solution :</strong> la masse $m$ et le volume $V$ sont tous deux des grandeurs extensives (elles doublent si l'on double la quantité de matière). Leur rapport $\\\\rho=m/V$ ne change donc pas quand on modifie la quantité de matière, à composition identique : c'est le rapport de deux grandeurs extensives, qui donne systématiquement une grandeur intensive.</p>
      <p class="example-answer">Réponse : $\\\\rho$ est une grandeur intensive.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Système ouvert (échange matière + énergie), fermé (énergie seule), isolé (aucun échange) — la thermodynamique de L2 traite surtout des systèmes fermés</li>
        <li>Grandeur extensive (proportionnelle à la quantité de matière : $V$, $m$, $U$, $S$) vs intensive (indépendante : $P$, $T$, $\\\\rho$) ; le rapport de deux extensives est intensif</li>
        <li>Fonction d'état : ne dépend que de l'état final/initial, pas du chemin ($U$, $H$, $S$) — contrairement à $W$ et $Q$, qui dépendent du chemin suivi</li>
        <li>Transformation réversible = quasi-statique ET sans phénomène dissipatif ; toute réversible est quasi-statique, l'inverse est faux</li>
        <li>Le principe zéro fonde l'existence de la température comme grandeur comparable entre systèmes non en contact direct</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que « quasi-statique » et « réversible » sont synonymes — la réversibilité exige en plus l'absence de dissipation</li>
        <li>Traiter le travail $W$ ou la chaleur $Q$ comme des fonctions d'état et écrire $\\\\Delta W$ ou $\\\\Delta Q$ — ce sont des grandeurs de TRANSFERT, notées simplement $W$ et $Q$ (jamais de variation $\\\\Delta$)</li>
        <li>Confondre système fermé (pas d'échange de matière, mais énergie possible) et système isolé (aucun échange, ni matière ni énergie)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un gaz enfermé dans un cylindre muni d'un piston mobile, thermiquement isolé du reste du monde mais mécaniquement couplé à l'extérieur (travail possible), est un système :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd1e1" value="wrong"> Ouvert</label>
          <label class="option"><input type="radio" name="thd1e1" value="right"> Fermé</label>
          <label class="option"><input type="radio" name="thd1e1" value="wrong"> Isolé</label>
          <label class="option"><input type="radio" name="thd1e1" value="wrong"> Aucune de ces réponses</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd1e1','thd1fb1','Correct — aucun échange de matière (le gaz reste enfermé), mais un échange d\\\'énergie sous forme de travail reste possible via le piston : c\\\'est la définition d\\\'un système fermé.','Un système ISOLÉ n\\\'échange ni matière ni énergie. Ici, le travail via le piston reste possible : donc énergie échangée, matière non échangée.')">Vérifier</button>
        <div class="feedback" id="thd1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Parmi ces grandeurs, laquelle est une fonction d'état ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd1e2" value="wrong"> Le travail $W$</label>
          <label class="option"><input type="radio" name="thd1e2" value="wrong"> La chaleur $Q$</label>
          <label class="option"><input type="radio" name="thd1e2" value="right"> L'énergie interne $U$</label>
          <label class="option"><input type="radio" name="thd1e2" value="wrong"> Aucune de ces réponses</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd1e2','thd1fb2','Correct — l\\\'énergie interne U est une fonction d\\\'état : sa variation ne dépend que des états initial et final, pas du chemin suivi. W et Q, eux, dépendent du chemin.','W et Q sont des grandeurs de TRANSFERT qui dépendent du chemin suivi — ce ne sont pas des fonctions d\\\'état.')">Vérifier</button>
        <div class="feedback" id="thd1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une détente d'un gaz contre un piston frottant, effectuée infiniment lentement (donc quasi-statique), est-elle réversible ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd1e3" value="wrong"> Oui, car quasi-statique implique toujours réversible</label>
          <label class="option"><input type="radio" name="thd1e3" value="right"> Non, car les frottements sont un phénomène dissipatif qui empêche la réversibilité</label>
          <label class="option"><input type="radio" name="thd1e3" value="wrong"> Oui, car le système repasse par les mêmes états d'équilibre</label>
          <label class="option"><input type="radio" name="thd1e3" value="wrong"> Impossible à déterminer sans connaître $T$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd1e3','thd1fb3','Correct — même infiniment lente, une transformation en présence de frottements dissipe de l\\\'énergie de façon irréversible : elle est quasi-statique mais PAS réversible.','La réversibilité exige l\\\'absence de tout phénomène dissipatif, en plus du caractère quasi-statique. Les frottements sont l\\\'exemple type de phénomène dissipatif.')">Vérifier</button>
        <div class="feedback" id="thd1fb3"></div>
      </div>
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Le concept de température, fondé par le principe zéro, réserve encore aujourd'hui des surprises à la physique moderne : en 2013, une équipe de physiciens allemands publia dans la revue Science la réalisation expérimentale d'un système de gaz quantique ultra-froid à <strong>température absolue négative</strong> — un état paradoxal où le système est, contre toute intuition, plus « chaud » que n'importe quel système à température positive, aussi élevée soit-elle. Ce résultat ne contredit pas le principe zéro lui-même, mais révèle que la notion intuitive de température comme simple « degré d'agitation thermique » doit être remplacée, dans certains systèmes quantiques très particuliers, par une définition statistique plus rigoureuse fondée sur la répartition des populations d'énergie.</p>
    <p><strong>Question ouverte :</strong> comment le principe zéro, qui semble présupposer une notion intuitive de température croissante de « froid » à « chaud », doit-il être reformulé pour rester valable dans ces systèmes exotiques à température négative ?</p>
    <p><strong>Concept avancé :</strong> la <strong>thermométrie quantique</strong> moderne développe aujourd'hui des capteurs de température fondés sur des systèmes quantiques individuels (atomes uniques, jonctions supraconductrices), capables de mesurer des variations de température extraordinairement fines, bien au-delà de la précision des thermomètres classiques hérités du principe zéro.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Système thermodynamique (ouvert/fermé/isolé) → variables d'état (extensives : V,m,U,S / intensives : P,T,ρ) → équation d'état reliant ces variables → fonctions d'état (U,H,S : indépendantes du chemin) vs grandeurs de transfert (W,Q : dépendent du chemin) → équilibre thermodynamique et types de transformations → principe zéro fonde la notion de température
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$A \text{ en équilibre thermique avec } C \text{ et } B \text{ en équilibre thermique avec } C \Rightarrow A \text{ en équilibre thermique avec } B$$
      Ce principe, resté implicite pendant près d'un siècle avant d'être explicitement nommé par Fowler en 1931, est la condition logique minimale sans laquelle la température ne pourrait même pas être définie comme une grandeur physique comparable entre systèmes non mis directement en contact.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Ralph Fowler n'avait jamais explicitement formulé le principe zéro en 1931 : la thermodynamique aurait-elle continué à fonctionner correctement en pratique, ou cette lacune logique aurait-elle fini par poser un problème théorique sérieux ?</li>
        <li>Pourquoi le volume molaire $V_m=V/n$, rapport de deux grandeurs extensives, est-il nécessairement une grandeur intensive, quelle que soit la nature du système considéré ?</li>
        <li>Quelle serait la conséquence, pour la thermométrie moderne, d'une incapacité à définir rigoureusement la température dans des systèmes quantiques exotiques comme ceux à température négative ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>R. Fowler, E. A. Guggenheim, <em>Statistical Thermodynamics</em>, Cambridge University Press, 1939 — l'ouvrage où le principe zéro fut formellement nommé et intégré à l'édifice de la thermodynamique.</li>
        <li>J. P. Pérez, <em>Thermodynamique : fondements et applications</em>, Dunod — référence pédagogique française sur les concepts fondamentaux de ce chapitre.</li>
        <li>S. Braun et al., « Negative Absolute Temperature for Motional Degrees of Freedom », Science, 2013 — l'article présentant la réalisation expérimentale d'un système à température négative.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais distinguer les types de systèmes et de variables d'état, définir une fonction d'état, et énoncer le principe zéro qui fonde la notion même de température. Le chapitre suivant, « Le gaz parfait et la théorie cinétique des gaz », donnera un contenu microscopique concret à ces variables macroscopiques encore abstraites. Comme le montre l'histoire du principe zéro : parfois, la vérité la plus fondamentale d'une théorie est aussi la dernière que l'on songe à formuler explicitement — précisément parce qu'elle semblait trop évidente pour mériter d'être énoncée.</p>
  `
};
THD_NOVA_KB[thdKey('Description des systèmes thermodynamiques : variables d\'état et équilibre')] = {
  intro: "Salut, moi c'est Nova ! On démarre le cours de Thermodynamique. Demande-moi la différence entre système ouvert/fermé/isolé, extensif/intensif, ou un indice sur un exercice.",
  rules: [
    { test:/syst[èe]me ouvert|syst[èe]me ferm[ée]|syst[èe]me isol[ée]/i, replies:["Système ouvert : échange matière ET énergie. Fermé : énergie seulement (pas de matière). Isolé : aucun échange. La thermo de L2 traite surtout des systèmes fermés."] },
    { test:/extensi[fv]|intensi[fv]/i, replies:["Extensive = proportionnelle à la quantité de matière (V, m, U, S) : elle s'additionne entre sous-parties. Intensive = indépendante de la quantité (P, T, ρ). Le rapport de deux extensives donne toujours une intensive."] },
    { test:/fonction d.[ée]tat/i, replies:["Une fonction d'état (U, H, S...) ne dépend que de l'état final et initial, pas du chemin suivi. W et Q, eux, dépendent du chemin : ce ne sont PAS des fonctions d'état."] },
    { test:/r[ée]versible|quasi.statique/i, replies:["Quasi-statique = transformation assez lente pour passer par une succession d'états d'équilibre. Réversible = quasi-statique ET sans aucun phénomène dissipatif (frottements...). Toute réversible est quasi-statique, l'inverse est faux."] },
    { test:/principe z[ée]ro/i, replies:["Le principe zéro dit que si A et B sont chacun en équilibre thermique avec C, alors A et B le sont entre eux. C'est ce qui fonde l'existence d'une grandeur unique, la température, mesurable via un thermomètre (le système C)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : y a-t-il un échange de MATIÈRE possible ici ?","Indice niveau 2 : non, le gaz reste enfermé — mais le travail (énergie) reste possible.","Indice niveau 3 : c'est un système fermé."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : W et Q dépendent-ils du chemin suivi ?","Indice niveau 2 : oui, donc ce ne sont pas des fonctions d'état.","Indice niveau 3 : c'est U, l'énergie interne, qui en est une."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : la lenteur de la transformation suffit-elle à la rendre réversible ?","Indice niveau 2 : non, il faut aussi l'absence de dissipation.","Indice niveau 3 : les frottements rendent la transformation irréversible malgré sa lenteur."] }
  ]
};

/* =========================== CHAPITRE 2 — Le gaz parfait et la théorie cinétique =========================== */
THD_CHAPTERS[thdKey('Le gaz parfait et la théorie cinétique des gaz')] = {
  objectives: [
    "Énoncer et utiliser l'équation d'état du gaz parfait $PV=nRT$",
    "Relier pression et température à l'agitation moléculaire via la théorie cinétique des gaz",
    "Calculer l'énergie cinétique moyenne et la vitesse quadratique moyenne des molécules d'un gaz parfait",
    "Identifier les limites du modèle du gaz parfait et l'apport de l'équation de van der Waals pour un gaz réel",
    "Évaluer en quoi le choix radical de Maxwell en 1859 — renoncer à décrire la trajectoire individuelle de chaque molécule au profit d'une description statistique moyenne — a fondé la mécanique statistique et rendu praticable l'étude d'un système contenant un nombre de particules aussi gigantesque qu'un gaz"
  ],
  prereqs: ["Description des systèmes thermodynamiques : variables d'état et équilibre"],
  bodyHtml: `
    <p>En 1859, le physicien écossais James Clerk Maxwell franchit une étape décisive dans l'histoire de la physique : plutôt que de chercher à suivre la trajectoire individuelle de chaque molécule d'un gaz — une tâche rigoureusement impossible vu leur nombre astronomique —, il proposa de raisonner statistiquement sur la distribution des vitesses de l'ensemble des molécules. Cette approche, radicalement nouvelle pour l'époque, donna naissance à ce qu'on appelle aujourd'hui la distribution de Maxwell-Boltzmann, et marqua la naissance de la mécanique statistique : la première fois qu'un physicien acceptait explicitement de renoncer à une description exacte et déterministe, au profit d'une description probabiliste, pour mieux comprendre un système physique.</p>
    <p>Ce renoncement délibéré à la précision individuelle, au profit d'une moyenne statistique sur un nombre gigantesque de particules, est précisément ce qui permet à la théorie cinétique des gaz de fonctionner : il serait totalement impossible de résoudre les équations du mouvement de $10^{23}$ molécules en interaction, mais il devient parfaitement possible — et même remarquablement simple — de calculer des moyennes statistiques comme la vitesse quadratique moyenne ou l'énergie cinétique moyenne que tu vas manipuler dans ce chapitre.</p>
    <p>Le <strong>gaz parfait</strong> est le modèle le plus simple — et le plus utile — de la thermodynamique : un ensemble de particules ponctuelles, sans interaction entre elles hormis des chocs parfaitement élastiques, en agitation incessante. Bien qu'idéalisé, ce modèle décrit remarquablement bien le comportement des gaz réels dilués (pression modérée, température pas trop basse).</p>

    <h3>1. L'équation d'état du gaz parfait</h3>
    <p>Établie progressivement au XVIIᵉ-XIXᵉ siècle à partir des lois empiriques de Boyle-Mariotte ($PV=$ constante à $T$ fixée), de Charles ($V/T=$ constante à $P$ fixée) et d'Avogadro (volumes molaires identiques à $P,T$ fixées pour tout gaz), l'équation d'état du gaz parfait s'écrit :</p>
    <div class="formula-box">$$PV = nRT$$</div>
    <p>avec $P$ la pression (Pa), $V$ le volume ($m^3$), $n$ la quantité de matière (mol), $T$ la température absolue (K) et $R\\\\approx8{,}314\\\\ J\\\\cdot mol^{-1}\\\\cdot K^{-1}$ la constante des gaz parfaits. On peut aussi l'écrire en fonction du nombre de molécules $N=nN_A$ et de la constante de Boltzmann $k_B=R/N_A\\\\approx1{,}381\\\\times10^{-23}\\\\ J\\\\cdot K^{-1}$ :</p>
    <div class="formula-box">$$PV = Nk_BT$$</div>

    <h3>2. Théorie cinétique des gaz : interprétation microscopique</h3>
    <p>La théorie cinétique des gaz, développée notamment par Maxwell et Boltzmann dans la seconde moitié du XIXᵉ siècle, relie les grandeurs macroscopiques ($P$, $T$) au mouvement désordonné des molécules à l'échelle microscopique. La <strong>pression</strong> résulte des chocs incessants des molécules sur les parois du récipient : chaque choc transfère une quantité de mouvement à la paroi, et la moyenne statistique de ces innombrables chocs (de l'ordre de $10^{23}$ par seconde et par $cm^2$) produit une force macroscopique constante, la pression.</p>
    <div class="key-point">
      <span class="eyebrow">Température et énergie cinétique moyenne</span>
      La théorie cinétique établit que la température absolue est directement proportionnelle à l'énergie cinétique de translation <strong>moyenne</strong> des molécules du gaz :
      $$\\\\langle E_c\\\\rangle = \\\\frac12 m\\\\langle v^2\\\\rangle = \\\\frac32 k_BT$$
      Cette relation donne un sens physique concret à la température : ce n'est pas une grandeur abstraite, mais une mesure directe de l'agitation thermique moyenne des particules. À $T=0$ K (zéro absolu, inaccessible en pratique), l'agitation thermique de translation s'annule.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La relation ⟨Ec⟩=3/2 kBT relie une grandeur macroscopique mesurable (la température) à une moyenne statistique sur un nombre incalculable de molécules individuelles. En quoi cette relation illustre-t-elle concrètement le pari de Maxwell : renoncer à connaître le mouvement exact de chaque molécule pour gagner une loi simple et universelle sur leur comportement collectif ?
    </div>

    <p>On en déduit la <strong>vitesse quadratique moyenne</strong> $v_{qm}=\\\\sqrt{\\\\langle v^2\\\\rangle}$ des molécules :</p>
    <div class="formula-box">$$v_{qm} = \\\\sqrt{\\\\frac{3k_BT}{m}} = \\\\sqrt{\\\\frac{3RT}{M}}$$</div>
    <p>où $M$ est la masse molaire du gaz. Pour le diazote $N_2$ ($M=28\\\\ g/mol$) à $T=298$ K, on obtient $v_{qm}\\\\approx511\\\\ m/s$ — un ordre de grandeur bien supérieur à l'intuition courante, qui rappelle que la vitesse du son dans l'air (≈340 m/s) est elle-même directement liée à cette agitation moléculaire.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> calculer le volume molaire d'un gaz parfait dans les conditions normales de température et de pression (CNTP : $T=273{,}15$ K, $P=1{,}013\\\\times10^5$ Pa).</p>
      <p><strong>Solution :</strong> $V_m=\\\\dfrac{RT}{P}=\\\\dfrac{8{,}314\\\\times273{,}15}{1{,}013\\\\times10^5}\\\\approx 2{,}241\\\\times10^{-2}\\\\ m^3/mol$.</p>
      <p class="example-answer">Réponse : $V_m\\\\approx22{,}4$ L/mol — la valeur classique du volume molaire d'un gaz parfait dans les CNTP.</p>
    </div>

    <h3>3. Limites du modèle et gaz réels : équation de van der Waals</h3>
    <p>Le modèle du gaz parfait néglige deux effets bien réels aux hautes pressions ou basses températures : le <strong>volume propre</strong> des molécules (non ponctuelles) et les <strong>forces d'attraction intermoléculaires</strong> (de van der Waals) qui deviennent significatives lorsque les molécules sont proches les unes des autres. Johannes Diderik van der Waals propose en 1873 (thèse qui lui vaudra le prix Nobel de physique en 1910) une équation d'état corrigée :</p>
    <div class="formula-box">$$\\\\left(P+\\\\frac{an^2}{V^2}\\\\right)(V-nb) = nRT$$</div>
    <p>où le terme $an^2/V^2$ corrige la pression pour tenir compte des forces attractives (qui la diminuent par rapport à un gaz parfait de même $V,T$), et le terme $nb$ corrige le volume disponible en retranchant le volume propre incompressible des molécules ($a$ et $b$ sont des constantes empiriques propres à chaque gaz). Cette équation, bien que toujours approximative, permet notamment de rendre compte qualitativement de la liquéfaction des gaz (chapitre 7) — un phénomène totalement absent du modèle du gaz parfait, qui ne prévoit jamais de transition de phase.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'équation de van der Waals ajoute deux corrections physiquement très différentes — l'une sur le volume, l'autre sur la pression — pour un même objectif : mieux décrire un gaz réel que le modèle du gaz parfait. Pourquoi ces deux corrections doivent-elles nécessairement aller dans des directions opposées (l'une réduit le volume disponible, l'autre réduit la pression effective) pour rester physiquement cohérentes ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>Ce que Maxwell jugeait rigoureusement impossible en 1859 — suivre individuellement la trajectoire de chaque molécule d'un gaz — est aujourd'hui partiellement réalisable grâce à la puissance de calcul moderne : les simulations de <strong>dynamique moléculaire</strong>, exécutées sur des supercalculateurs, calculent effectivement les trajectoires de plusieurs millions, voire milliards, de particules en interaction, en intégrant numériquement les équations du mouvement de chacune. Ces simulations ne remplacent pas l'approche statistique de Maxwell — bien trop coûteuse en calcul pour décrire une mole entière de gaz ($6\\times10^{23}$ molécules) — mais permettent de vérifier et d'affiner les lois statistiques comme la distribution de Maxwell-Boltzmann sur des échantillons de taille intermédiaire, inaccessibles à l'époque de Maxwell.</p>
    <p><strong>Question ouverte :</strong> jusqu'à quelle taille de système (nombre de particules) les simulations de dynamique moléculaire directe resteront-elles plus efficaces qu'une approche purement statistique, compte tenu de la croissance continue de la puissance de calcul disponible ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>simulations de dynamique moléculaire accélérées par intelligence artificielle</strong>, où un réseau de neurones apprend à prédire les forces interatomiques bien plus rapidement qu'un calcul physique complet, permettent aujourd'hui de simuler des systèmes de taille toujours plus grande, réduisant l'écart entre l'approche exacte que Maxwell jugeait impossible et l'approche statistique qu'il proposa à la place.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Gaz parfait (molécules ponctuelles, sans interaction sauf chocs élastiques) → équation d'état PV=nRT=Nk_BT → théorie cinétique : pression = chocs moléculaires sur les parois, température = agitation moyenne ⟨Ec⟩=3/2 k_BT → vitesse quadratique moyenne v_qm=√(3RT/M) → limites : volume propre et interactions → correction de van der Waals pour un gaz réel
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\langle E_c\\rangle = \\frac12 m\\langle v^2\\rangle = \\frac32 k_BT$$
      Cette équation, héritière du choix statistique de Maxwell en 1859, est le pont qui relie deux mondes a priori très éloignés : le monde macroscopique de la température, mesurable directement au thermomètre, et le monde microscopique invisible de l'agitation désordonnée de milliards de milliards de molécules.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Maxwell n'avait jamais osé introduire une approche statistique en physique en 1859, jugée risquée à une époque dominée par le déterminisme newtonien : la mécanique statistique aurait-elle émergé par une autre voie, ou aurait-il fallu attendre Boltzmann quelques années plus tard ?</li>
        <li>Pourquoi la vitesse quadratique moyenne v_qm est-elle systématiquement plus grande que la vitesse moyenne ⟨v⟩, alors que les deux prétendent résumer la même distribution de vitesses moléculaires ?</li>
        <li>Quelle serait la conséquence, pour la modélisation moderne des gaz aux hautes pressions industrielles, d'une utilisation systématique du modèle du gaz parfait sans jamais recourir à une correction comme celle de van der Waals ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. C. Maxwell, « Illustrations of the Dynamical Theory of Gases », Philosophical Magazine, 1860 (présenté en 1859) — l'article fondateur de la distribution statistique des vitesses moléculaires.</li>
        <li>J. P. Pérez, <em>Thermodynamique : fondements et applications</em>, Dunod — référence pédagogique française sur la théorie cinétique des gaz.</li>
        <li>M. P. Allen, D. J. Tildesley, <em>Computer Simulation of Liquids</em>, Oxford University Press — référence sur les simulations modernes de dynamique moléculaire.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais énoncer et utiliser l'équation d'état du gaz parfait, relier pression et température à l'agitation moléculaire, et identifier les limites du modèle via l'équation de van der Waals. Le chapitre suivant, « Premier principe de la thermodynamique », appliquera ces bases microscopiques à l'étude quantitative des échanges d'énergie entre un système et son environnement. Comme le montre l'audace de Maxwell en 1859 : parfois, la meilleure façon de comprendre un système d'une complexité écrasante n'est pas de suivre chacun de ses éléments un par un, mais d'apprendre à raisonner intelligemment sur leur comportement moyen.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Équation d'état du gaz parfait : $PV=nRT=Nk_BT$, avec $R\\\\approx8{,}314\\\\ J\\\\cdot mol^{-1}\\\\cdot K^{-1}$</li>
        <li>Théorie cinétique : la pression résulte des chocs moléculaires sur les parois ; $\\\\langle E_c\\\\rangle=\\\\tfrac32 k_BT$ relie température et agitation microscopique</li>
        <li>Vitesse quadratique moyenne $v_{qm}=\\\\sqrt{3RT/M}$ — de l'ordre de plusieurs centaines de m/s dans les conditions usuelles</li>
        <li>Volume molaire aux CNTP : $\\\\approx22{,}4$ L/mol pour tout gaz parfait</li>
        <li>Van der Waals corrige le modèle pour le volume propre des molécules ($b$) et les interactions attractives ($a$), et permet de décrire la liquéfaction</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser une température en degrés Celsius dans $PV=nRT$ — la loi exige impérativement une température ABSOLUE en kelvins</li>
        <li>Confondre vitesse quadratique moyenne $v_{qm}=\\\\sqrt{\\\\langle v^2\\\\rangle}$ et vitesse moyenne $\\\\langle v\\\\rangle$ — ce ne sont pas les mêmes grandeurs (bien que du même ordre de grandeur)</li>
        <li>Croire que le modèle du gaz parfait peut décrire une liquéfaction — c'est structurellement impossible avec ce modèle, qui ignore toute interaction attractive entre molécules</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une mole de gaz parfait occupe un volume de 24,5 L à 300 K. Quelle est la pression du gaz (en Pa) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd2e1" value="wrong"> $8{,}31\\\\times10^3$ Pa</label>
          <label class="option"><input type="radio" name="thd2e1" value="right"> $1{,}02\\\\times10^5$ Pa</label>
          <label class="option"><input type="radio" name="thd2e1" value="wrong"> $2{,}49\\\\times10^6$ Pa</label>
          <label class="option"><input type="radio" name="thd2e1" value="wrong"> $3{,}00\\\\times10^2$ Pa</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd2e1','thd2fb1','Correct — P=nRT/V=(1×8,314×300)/(24,5×10⁻³)≈1,02×10⁵ Pa, proche de la pression atmosphérique.','N\\\'oublie pas de convertir le volume en m³ (24,5 L = 24,5×10⁻³ m³) avant de calculer P=nRT/V.')">Vérifier</button>
        <div class="feedback" id="thd2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si la température absolue d'un gaz parfait double, que devient l'énergie cinétique moyenne de translation de ses molécules ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd2e2" value="wrong"> Elle reste inchangée</label>
          <label class="option"><input type="radio" name="thd2e2" value="right"> Elle double</label>
          <label class="option"><input type="radio" name="thd2e2" value="wrong"> Elle quadruple</label>
          <label class="option"><input type="radio" name="thd2e2" value="wrong"> Elle est divisée par deux</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd2e2','thd2fb2','Correct — ⟨Ec⟩=3/2 kBT est directement PROPORTIONNELLE à T : doubler T double ⟨Ec⟩.','Ec est proportionnelle à T (relation linéaire), pas à T² : que devient une grandeur proportionnelle à T quand T double ?')">Vérifier</button>
        <div class="feedback" id="thd2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans l'équation de van der Waals, à quoi correspond physiquement le terme correctif $an^2/V^2$ ajouté à la pression ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd2e3" value="wrong"> Au volume propre des molécules</label>
          <label class="option"><input type="radio" name="thd2e3" value="right"> Aux forces d'attraction intermoléculaires, qui diminuent la pression réelle par rapport au gaz parfait</label>
          <label class="option"><input type="radio" name="thd2e3" value="wrong"> À l'agitation thermique</label>
          <label class="option"><input type="radio" name="thd2e3" value="wrong"> À la masse molaire du gaz</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd2e3','thd2fb3','Correct — les forces attractives entre molécules réduisent légèrement les chocs sur les parois, donc la pression réelle : le terme an²/V² corrige cet effet en l\\\'ajoutant à la pression mesurée.','Le terme nb corrige le volume (volume propre des molécules) ; le terme an²/V² corrige la pression, à cause des forces attractives.')">Vérifier</button>
        <div class="feedback" id="thd2fb3"></div>
      </div>
    </div>
  `
};
THD_NOVA_KB[thdKey('Le gaz parfait et la théorie cinétique des gaz')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Le gaz parfait et la théorie cinétique des gaz ». Demande-moi l'équation d'état, la relation entre température et énergie cinétique, ou un indice sur un exercice.",
  rules: [
    { test:/pv\s*=\s*nrt|[ée]quation d.[ée]tat/i, replies:["L'équation d'état du gaz parfait : PV=nRT (ou PV=NkBT avec N le nombre de molécules). Attention, T doit toujours être en KELVINS, jamais en degrés Celsius."] },
    { test:/[ée]nergie cin[ée]tique|th[ée]orie cin[ée]tique/i, replies:["La théorie cinétique relie température et agitation moléculaire : ⟨Ec⟩=3/2 kBT. La pression résulte statistiquement des chocs des molécules sur les parois du récipient."] },
    { test:/vitesse quadratique|vqm/i, replies:["La vitesse quadratique moyenne vqm=√(3RT/M) (M = masse molaire) donne un ordre de grandeur de l'agitation moléculaire : plusieurs centaines de m/s dans les conditions usuelles."] },
    { test:/van der waals/i, replies:["L'équation de van der Waals (P+an²/V²)(V-nb)=nRT corrige le gaz parfait pour le volume propre des molécules (terme b) et les forces attractives intermoléculaires (terme a), et permet de décrire la liquéfaction."] },
    { test:/volume molaire|cntp|22,4/i, replies:["Le volume molaire d'un gaz parfait aux CNTP (0°C, 1 atm) vaut environ 22,4 L/mol — une valeur à connaître par cœur."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : convertis d'abord le volume en m³.","Indice niveau 2 : 24,5 L = 24,5×10⁻³ m³, puis P=nRT/V.","Indice niveau 3 : P≈1,02×10⁵ Pa."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : Ec est-elle proportionnelle à T ou à T² ?","Indice niveau 2 : proportionnelle à T (relation linéaire).","Indice niveau 3 : donc Ec double si T double."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le terme nb corrige le volume. Que reste-t-il pour an²/V² ?","Indice niveau 2 : les interactions entre molécules.","Indice niveau 3 : les forces attractives, qui réduisent la pression réelle."] }
  ]
};

/* =========================== CHAPITRE 3 — Premier principe =========================== */
THD_CHAPTERS[thdKey('Premier principe de la thermodynamique')] = {
  objectives: [
    "Énoncer le premier principe de la thermodynamique pour un système fermé",
    "Calculer le travail des forces de pression pour différentes transformations (isochore, isobare, isotherme réversible)",
    "Définir la capacité thermique à volume constant $C_V$ et relier $\\\\Delta U$ à $C_V\\\\Delta T$ pour un gaz parfait (première loi de Joule)",
    "Appliquer le premier principe à un bilan énergétique complet",
    "Évaluer en quoi l'expérience de la roue à palettes de Joule, en démontrant expérimentalement l'équivalence quantitative entre travail mécanique et chaleur, a définitivement mis fin à la théorie du calorique et fondé le premier principe sur une base physique plutôt que sur une simple convention comptable"
  ],
  prereqs: ["Le gaz parfait et la théorie cinétique des gaz"],
  bodyHtml: `
    <p>Entre 1843 et 1850, l'industriel brassicole britannique James Prescott Joule mena une série d'expériences méticuleuses restées célèbres dans l'histoire de la physique : à l'aide d'un poids qui, en tombant, actionnait une roue à palettes plongée dans un récipient d'eau isolé thermiquement, il mesura précisément de combien de degrés l'eau s'échauffait pour une quantité donnée de travail mécanique fourni. Cette expérience, d'une simplicité trompeuse, démontra pour la première fois avec une précision quantitative que la chaleur et le travail mécanique étaient deux formes interconvertibles d'une seule et même grandeur physique — l'énergie —, jetant les bases expérimentales du premier principe que tu vas étudier dans ce chapitre.</p>
    <p>Avant Joule, chaleur et travail étaient considérés par beaucoup de physiciens comme deux entités de nature fondamentalement différente — la chaleur relevant d'un mystérieux « calorique », un fluide invisible censé s'écouler d'un corps chaud vers un corps froid. L'apport décisif de Joule fut de montrer, par la mesure, que l'on pouvait produire exactement la même élévation de température soit en fournissant de la chaleur directement, soit en fournissant un travail mécanique équivalent — établissant ainsi que $\\Delta U=W+Q$ n'était pas une simple convention pratique, mais une loi physique profonde reflétant l'unité de toutes les formes d'énergie.</p>
    <p>Le premier principe de la thermodynamique généralise, à l'échelle macroscopique, le principe de conservation de l'énergie déjà rencontré en mécanique : il introduit une nouvelle forme d'énergie, l'<strong>énergie interne</strong>, et relie ses variations aux deux modes d'échange d'énergie propres à la thermodynamique — le travail et la chaleur. À la fin de ce chapitre, tu sauras énoncer et appliquer le premier principe, calculer le travail des forces de pression pour les transformations usuelles, et exploiter la première loi de Joule pour un gaz parfait.</p>

    <h3>1. Énergie interne et énoncé du premier principe</h3>
    <p>L'<strong>énergie interne</strong> $U$ d'un système est l'énergie totale contenue « à l'intérieur » de celui-ci à l'échelle microscopique : énergie cinétique d'agitation thermique des particules, énergie potentielle d'interaction entre elles, énergies internes des molécules elles-mêmes (vibration, rotation). C'est une fonction d'état, extensive.</p>
    <div class="formula-box">$$\\\\Delta U = W + Q$$</div>
    <p>Pour un système fermé au repos macroscopique (sans variation d'énergie cinétique ni potentielle macroscopique), la variation d'énergie interne entre un état initial et un état final est égale à la somme du <strong>travail</strong> $W$ des forces extérieures (essentiellement le travail des forces de pression) et de la <strong>chaleur</strong> $Q$ échangée avec le milieu extérieur au cours de la transformation. La convention de signe usuelle en thermodynamique (dite « convention du banquier ») compte positivement tout ce qui est <strong>reçu</strong> par le système, et négativement tout ce qui est <strong>cédé</strong>.</p>
    <p>Pour un système isolé, $W=Q=0$ donc $\\\\Delta U=0$ : l'énergie interne d'un système isolé se conserve — c'est la formulation la plus générale du principe de conservation de l'énergie en thermodynamique.</p>

    <h3>2. Le travail des forces de pression</h3>
    <p>Pour un système fermé de volume $V$, soumis à une pression extérieure $P_{ext}$, le travail élémentaire des forces de pression reçu par le système lors d'une variation infinitésimale de volume $dV$ s'écrit :</p>
    <div class="formula-box">$$\\\\delta W = -P_{ext}\\\\,dV$$</div>
    <p>Le signe moins traduit le fait que le système reçoit du travail (positif) lorsqu'il est comprimé ($dV<0$), et en cède (travail négatif) lorsqu'il se détend ($dV>0$). Pour une transformation <strong>réversible</strong>, le système est à chaque instant en équilibre mécanique avec l'extérieur : $P_{ext}=P$ (pression du système lui-même), ce qui permet d'intégrer directement :</p>
    <table class="mini-table">
      <tr><th>Transformation</th><th>Travail $W$ reçu par le gaz parfait</th></tr>
      <tr><td>Isochore ($V$ constant)</td><td>$W=0$</td></tr>
      <tr><td>Isobare ($P$ constante)</td><td>$W=-P\\\\,\\\\Delta V = -P(V_f-V_i)$</td></tr>
      <tr><td>Isotherme réversible ($T$ constante, gaz parfait)</td><td>$W=-nRT\\\\ln\\\\!\\\\left(\\\\dfrac{V_f}{V_i}\\\\right)=nRT\\\\ln\\\\!\\\\left(\\\\dfrac{P_f}{P_i}\\\\right)$</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le travail isotherme réversible d'un gaz parfait dépend du rapport des volumes via un logarithme, alors que le travail isobare dépend linéairement de la variation de volume. Pourquoi ces deux formules aussi différentes décrivent-elles malgré tout la même grandeur physique — le travail des forces de pression —, appliquée simplement à deux trajets différents dans le plan (P,V) ?
    </div>

    <h3>3. Capacité thermique et première loi de Joule</h3>
    <p>La <strong>capacité thermique à volume constant</strong> $C_V=\\\\left(\\\\dfrac{\\\\partial U}{\\\\partial T}\\\\right)_V$ mesure la quantité de chaleur nécessaire pour élever la température du système d'un kelvin à volume constant. James Prescott Joule a montré expérimentalement (détente de Joule-Gay-Lussac, 1845) que l'énergie interne d'un gaz parfait ne dépend <strong>que</strong> de sa température, et non de son volume ni de sa pression — résultat connu sous le nom de <strong>première loi de Joule</strong> :</p>
    <div class="formula-box">$$U_{gaz\\\\ parfait} = U(T)\\\\ \\\\text{seulement}, \\\\quad \\\\text{donc}\\\\quad \\\\Delta U = C_V\\\\,\\\\Delta T \\\\ \\\\ (\\\\text{quelle que soit la transformation})$$</div>
    <div class="key-point">
      <span class="eyebrow">Pourquoi c'est important</span>
      Cette loi est extrêmement pratique : pour un gaz parfait, $\\\\Delta U=C_V\\\\Delta T$ reste valable pour <strong>n'importe quelle</strong> transformation (isochore, isobare, isotherme, réversible ou non), puisque $U$ ne dépend que de $T$, elle-même une fonction d'état. Il suffit de connaître les températures initiale et finale, indépendamment du chemin suivi et même si la transformation réelle n'est pas isochore.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La première loi de Joule affirme que l'énergie interne d'un gaz parfait ne dépend que de sa température, jamais de son volume ni de sa pression. Pourquoi ce résultat, qui semble une simplification presque trop belle pour être vraie, découle-t-il directement de l'absence totale d'interactions entre molécules dans le modèle du gaz parfait (chapitre précédent) ?
    </div>

    <p>Pour un gaz parfait monoatomique, la théorie cinétique (chapitre 2) donne directement $U=\\\\dfrac32 nRT$, donc $C_V=\\\\dfrac32 nR$ ; pour un gaz parfait diatomique (à température ordinaire, rotation excitée mais pas vibration), $C_V=\\\\dfrac52 nR$.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une mole de gaz parfait monoatomique subit une détente isotherme réversible à $T=400$ K, de $V_i=10$ L à $V_f=30$ L. Calculer le travail $W$ reçu, puis la chaleur $Q$ échangée, sachant que $\\\\Delta U=0$ pour une isotherme sur un gaz parfait.</p>
      <p><strong>Solution :</strong> $W=-nRT\\\\ln(V_f/V_i)=-1\\\\times8{,}314\\\\times400\\\\times\\\\ln(3)\\\\approx-8{,}314\\\\times400\\\\times1{,}0986\\\\approx-3653$ J. Puisque $\\\\Delta U=W+Q=0$, on a $Q=-W\\\\approx+3653$ J.</p>
      <p class="example-answer">Réponse : $W\\\\approx-3{,}65$ kJ (le gaz cède du travail en se détendant), $Q\\\\approx+3{,}65$ kJ (le gaz reçoit exactement la chaleur nécessaire pour compenser, puisque $T$ — donc $U$ — ne varie pas).</p>
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>La méthode calorimétrique inaugurée par Joule — mesurer précisément des échanges de chaleur pour en déduire des grandeurs énergétiques — reste, sous une forme considérablement raffinée, un outil essentiel de la recherche moderne : la <strong>calorimétrie différentielle à balayage</strong> (DSC), capable de détecter des échanges de chaleur des millions de fois plus faibles que ceux mesurés par Joule, est aujourd'hui utilisée en pharmacie pour caractériser la stabilité thermique de nouveaux médicaments, ou en science des matériaux pour étudier les transitions de phase de nouveaux alliages. Le principe reste pourtant fondamentalement identique à celui de la roue à palettes de Joule : mesurer un échange de chaleur avec une précision suffisante pour en tirer une information physique fiable.</p>
    <p><strong>Question ouverte :</strong> quelles limites physiques (bruit thermique, précision des capteurs) empêchent d'améliorer indéfiniment la sensibilité des calorimètres modernes, près de deux siècles après les premières mesures de Joule ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>nanocalorimètres</strong>, capables de mesurer des échanges de chaleur portant sur des échantillons de quelques nanogrammes seulement, permettent aujourd'hui d'étudier les propriétés thermodynamiques de molécules individuelles ou de couches minces de matériaux, une échelle totalement inaccessible aux instruments de l'époque de Joule.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Système fermé → énergie interne U (fonction d'état, microscopique) → premier principe ΔU=W+Q (convention du banquier) → travail des forces de pression δW=-P_ext dV, calculé selon la transformation (isochore, isobare, isotherme) → pour un gaz parfait : première loi de Joule, U=U(T) seul → ΔU=C_VΔT quelle que soit la transformation
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\Delta U = W + Q$$
      Cette équation, validée expérimentalement par Joule grâce à sa roue à palettes, résume l'unité profonde de toutes les formes d'énergie : que l'énergie interne d'un système varie parce qu'on lui fournit un travail mécanique, ou parce qu'on lui fournit de la chaleur, le résultat sur U est physiquement identique — chaleur et travail ne sont que deux façons différentes de transférer une seule et même grandeur, l'énergie.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Joule n'avait jamais mené ses expériences méticuleuses avec la roue à palettes entre 1843 et 1850 : la théorie du calorique aurait-elle pu survivre plus longtemps, retardant l'émergence du premier principe ?</li>
        <li>Pourquoi le travail des forces de pression est-il toujours nul pour une transformation isochore, quelle que soit l'intensité de la pression exercée par le gaz sur les parois du récipient ?</li>
        <li>Quelle serait la conséquence, pour la caractérisation moderne des médicaments, d'une absence de méthode calorimétrique suffisamment précise pour détecter de faibles transitions thermiques ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. P. Joule, « On the Mechanical Equivalent of Heat », Philosophical Transactions of the Royal Society, 1850 — l'article présentant les résultats de l'expérience de la roue à palettes.</li>
        <li>J. P. Pérez, <em>Thermodynamique : fondements et applications</em>, Dunod — référence pédagogique française sur le premier principe.</li>
        <li>G. Höhne, W. Hemminger, H.-J. Flammersheim, <em>Differential Scanning Calorimetry</em>, Springer — sur les méthodes calorimétriques modernes héritières des travaux de Joule.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais énoncer et appliquer le premier principe, calculer le travail des forces de pression pour les transformations usuelles, et exploiter la première loi de Joule pour un gaz parfait. Le chapitre suivant, « Deuxième principe : entropie et évolutions irréversibles », introduira une contrainte supplémentaire que le premier principe, à lui seul, ne suffit pas à capturer : le sens dans lequel les transformations peuvent effectivement se produire. Comme le montre l'expérience de Joule : une mesure suffisamment précise et patiente peut suffire à renverser des siècles de théorie erronée, ici celle du calorique, et à établir un principe qui reste, près de deux siècles plus tard, l'un des piliers les plus solides de toute la physique.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Premier principe : $\\\\Delta U=W+Q$ (convention du banquier : positif = reçu par le système)</li>
        <li>Travail des forces de pression : $\\\\delta W=-P_{ext}\\\\,dV$ ; pour une transformation réversible, $P_{ext}=P$</li>
        <li>Travail isotherme réversible d'un gaz parfait : $W=-nRT\\\\ln(V_f/V_i)$</li>
        <li>Première loi de Joule : $U$ d'un gaz parfait ne dépend que de $T$, donc $\\\\Delta U=C_V\\\\Delta T$ pour TOUTE transformation, pas seulement isochore</li>
        <li>$C_V=\\\\tfrac32 nR$ (gaz parfait monoatomique), $C_V=\\\\tfrac52 nR$ (diatomique, à température ordinaire)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le signe moins dans $\\\\delta W=-P_{ext}dV$ — une détente ($dV>0$) doit donner un travail négatif (cédé par le système)</li>
        <li>Utiliser $\\\\Delta U=C_V\\\\Delta T$ en croyant que cette relation n'est valable que pour une transformation ISOCHORE — pour un gaz parfait, elle vaut pour n'importe quelle transformation, grâce à la première loi de Joule</li>
        <li>Écrire $\\\\Delta W$ ou $\\\\Delta Q$ — le travail et la chaleur ne sont pas des fonctions d'état, on ne parle jamais de leur « variation »</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un gaz parfait est comprimé de façon isochore (volume constant). Que vaut le travail des forces de pression reçu par le gaz ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd3e1" value="right"> $W=0$</label>
          <label class="option"><input type="radio" name="thd3e1" value="wrong"> $W=P\\\\Delta V$</label>
          <label class="option"><input type="radio" name="thd3e1" value="wrong"> $W=nRT\\\\ln(V_f/V_i)$</label>
          <label class="option"><input type="radio" name="thd3e1" value="wrong"> $W$ dépend de la chaleur échangée</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd3e1','thd3fb1','Correct — à volume constant, dV=0 à chaque instant, donc W=-∫PdV=0, quelle que soit la façon dont P et T varient.','Le travail des forces de pression s\\\'écrit δW=-P dV. Si V est constant, dV=0 en permanence.')">Vérifier</button>
        <div class="feedback" id="thd3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour un gaz parfait, la relation $\\\\Delta U=C_V\\\\Delta T$ est valable :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd3e2" value="wrong"> Uniquement pour une transformation isochore</label>
          <label class="option"><input type="radio" name="thd3e2" value="wrong"> Uniquement pour une transformation réversible</label>
          <label class="option"><input type="radio" name="thd3e2" value="right"> Pour n'importe quelle transformation, grâce à la première loi de Joule</label>
          <label class="option"><input type="radio" name="thd3e2" value="wrong"> Uniquement pour une transformation isotherme</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd3e2','thd3fb2','Correct — la première loi de Joule montre que U d\\\'un gaz parfait ne dépend QUE de T : ΔU=CVΔT reste donc valable quel que soit le chemin réellement suivi.','Repense à la première loi de Joule : U(gaz parfait) ne dépend que de T, une fonction d\\\'état — donc ΔU ne dépend que de Ti et Tf, jamais du chemin.')">Vérifier</button>
        <div class="feedback" id="thd3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une mole de gaz parfait monoatomique subit une compression isotherme réversible de $V_i=20$ L à $V_f=10$ L, à $T=300$ K. Le travail reçu par le gaz est approximativement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd3e3" value="wrong"> $-1730$ J</label>
          <label class="option"><input type="radio" name="thd3e3" value="right"> $+1730$ J</label>
          <label class="option"><input type="radio" name="thd3e3" value="wrong"> $0$ J</label>
          <label class="option"><input type="radio" name="thd3e3" value="wrong"> $+8314$ J</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd3e3','thd3fb3','Correct — W=-nRT ln(Vf/Vi)=-8,314×300×ln(0,5)≈-2494×(-0,693)≈+1730 J : le gaz REÇOIT du travail car on le comprime.','W=-nRT ln(Vf/Vi). Ici Vf<Vi donc ln(Vf/Vi)<0, ce qui rend W positif : cohérent, on comprime le gaz, il reçoit du travail.')">Vérifier</button>
        <div class="feedback" id="thd3fb3"></div>
      </div>
    </div>
  `
};
THD_NOVA_KB[thdKey('Premier principe de la thermodynamique')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Premier principe de la thermodynamique ». Demande-moi la formule ΔU=W+Q, le travail des forces de pression, ou un indice sur un exercice.",
  rules: [
    { test:/premier principe|d[ée]lta u\s*=\s*w\s*\+\s*q/i, replies:["Premier principe : ΔU=W+Q (convention du banquier : positif = reçu par le système). Pour un système isolé, W=Q=0 donc ΔU=0 : l'énergie interne se conserve."] },
    { test:/travail.*pression|delta w\s*=\s*-p/i, replies:["Travail des forces de pression : δW=-Pext·dV. Le signe moins : une compression (dV<0) donne W>0 (reçu), une détente (dV>0) donne W<0 (cédé)."] },
    { test:/loi de joule|premi[èe]re loi de joule/i, replies:["La première loi de Joule dit que U d'un gaz parfait ne dépend QUE de T (pas de V ni P). Conséquence : ΔU=CVΔT est valable pour N'IMPORTE QUELLE transformation d'un gaz parfait, pas seulement isochore."] },
    { test:/capacit[ée] thermique|cv\b/i, replies:["CV = (∂U/∂T)V. Pour un gaz parfait monoatomique, CV=3/2 nR ; pour un diatomique (à T ordinaire), CV=5/2 nR."] },
    { test:/isotherme.*travail|w\s*=\s*-nrt/i, replies:["Pour une transformation isotherme réversible d'un gaz parfait : W=-nRT ln(Vf/Vi). Une détente (Vf>Vi) donne W<0 (cédé), une compression donne W>0 (reçu)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : que vaut dV si le volume est constant ?","Indice niveau 2 : dV=0 à chaque instant.","Indice niveau 3 : donc W=-∫P dV=0."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : repense à ce que dit la première loi de Joule sur U.","Indice niveau 2 : U ne dépend que de T, une fonction d'état.","Indice niveau 3 : donc ΔU=CVΔT vaut pour toute transformation, pas seulement isochore."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le gaz est comprimé (Vf<Vi), donc ln(Vf/Vi) est négatif.","Indice niveau 2 : W=-nRT×(nombre négatif) donne un résultat positif.","Indice niveau 3 : W≈+1730 J."] }
  ]
};

/* =========================== CHAPITRE 4 — Deuxième principe =========================== */
THD_CHAPTERS[thdKey('Deuxième principe : entropie et évolutions irréversibles')] = {
  objectives: [
    "Énoncer le deuxième principe de la thermodynamique et la notion d'entropie créée",
    "Distinguer entropie échangée et entropie créée dans un bilan entropique",
    "Calculer la variation d'entropie d'un gaz parfait pour différentes transformations",
    "Interpréter statistiquement l'entropie via la formule de Boltzmann $S=k_B\\\\ln\\\\Omega$",
    "Analyser l'apport conceptuel de Rudolf Clausius (1865) — l'invention du mot « entropie » et sa synthèse des deux premiers principes — dans la formulation moderne de la flèche du temps en physique"
  ],
  prereqs: ["Premier principe de la thermodynamique"],
  bodyHtml: `
    <p>Le premier principe interdit la création ou la destruction d'énergie, mais ne dit rien sur le <strong>sens</strong> dans lequel une transformation peut spontanément se produire : rien, dans le premier principe seul, n'empêche a priori la chaleur de circuler spontanément du froid vers le chaud, ou un gaz de se recomprimer spontanément dans un coin d'une pièce. C'est le deuxième principe qui introduit cette flèche du temps, via une nouvelle fonction d'état, l'<strong>entropie</strong> $S$.</p>
    <p>C'est le physicien allemand Rudolf Clausius qui donne à cette idée son nom définitif, en 1865 : il forge le mot « entropie » (du grec <em>tropê</em>, la transformation) et condense les deux premiers principes de la thermodynamique dans une phrase restée célèbre — « Die Energie der Welt ist konstant; die Entropie der Welt strebt einem Maximum zu » (l'énergie de l'univers est constante ; l'entropie de l'univers tend vers un maximum). Cette formule tient en une ligne le contenu des deux chapitres précédents.</p>
    <p>Cette flèche du temps se manifeste partout autour de nous : un glaçon fond dans un verre d'eau tiède mais ne se reforme jamais spontanément, un café chaud refroidit mais ne se réchauffe pas tout seul, un parfum se répand dans une pièce sans jamais revenir se concentrer dans son flacon. Ce chapitre construit l'outil qui rend ces observations quantitatives — le bilan entropique — puis relie cette approche macroscopique de Clausius à l'interprétation microscopique proposée par Boltzmann quelques décennies plus tard.</p>

    <h3>1. Énoncés historiques du deuxième principe</h3>
    <p>Le deuxième principe a été formulé sous plusieurs énoncés historiques équivalents, avant que Clausius n'en propose la formulation moderne en termes d'entropie (1865) :</p>
    <div class="key-point">
      <span class="eyebrow">Énoncé de Clausius (1850)</span>
      La chaleur ne peut jamais passer spontanément d'un corps froid vers un corps chaud, sans autre effet — c'est-à-dire sans apport de travail extérieur (comme dans un réfrigérateur, cf. chapitre 5).
    </div>
    <div class="key-point">
      <span class="eyebrow">Énoncé de Kelvin (1851)</span>
      Il est impossible de réaliser une transformation dont le seul effet serait de prélever de la chaleur à une seule source et de la convertir intégralement en travail — autrement dit, un moteur thermique cyclique ne peut fonctionner qu'en échangeant de la chaleur avec au moins deux sources à des températures différentes (chapitre 5).
    </div>

    <h3>2. Entropie et bilan entropique</h3>
    <p>L'entropie $S$ est une fonction d'état extensive qui mesure, à l'échelle macroscopique, le degré de désordre (ou, de façon équivalente, le nombre de configurations microscopiques compatibles avec l'état macroscopique observé). Pour une transformation quelconque d'un système fermé entre un état initial et un état final, on écrit le <strong>bilan entropique</strong> :</p>
    <div class="formula-box">$$\\\\Delta S = S_{ech} + S_{cr} \\\\qquad \\\\text{avec}\\\\quad S_{cr}\\\\geqslant 0$$</div>
    <p>L'entropie échangée $S_{ech}=\\\\displaystyle\\\\int\\\\frac{\\\\delta Q}{T_{ext}}$ correspond au transfert d'entropie associé aux échanges de chaleur avec le milieu extérieur (à sa température $T_{ext}$, celle de la source au contact du système, et non nécessairement celle du système lui-même si la transformation est irréversible). L'<strong>entropie créée</strong> $S_{cr}$ mesure, quant à elle, l'irréversibilité intrinsèque de la transformation : elle est <strong>rigoureusement nulle</strong> pour une transformation réversible, et <strong>strictement positive</strong> pour toute transformation irréversible (frottements, diffusion thermique sous gradient fini de température, détente de Joule-Gay-Lussac...). C'est l'énoncé mathématique le plus général du deuxième principe.</p>
    <div class="key-point">
      <span class="eyebrow">Cas particulier : système isolé</span>
      Pour un système isolé, aucun échange de chaleur n'est possible ($S_{ech}=0$), donc $\\\\Delta S=S_{cr}\\\\geqslant0$ : l'entropie d'un système isolé ne peut qu'augmenter (ou rester constante si la transformation interne est réversible). C'est la formulation la plus célèbre du deuxième principe : « l'entropie de l'univers ne peut que croître ».
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si l'entropie totale ne fait que croître, comment expliquer l'existence d'êtres vivants ou de cristaux parfaitement ordonnés, qui semblent au contraire créer de l'ordre localement ? La réponse tient dans le mot « isolé » : un organisme vivant ou un cristal en formation n'est pas un système isolé — il exporte vers son environnement (par exemple sous forme de chaleur rejetée) une entropie plus que suffisante pour que le bilan global reste positif.
    </div>

    <h3>3. Calcul de la variation d'entropie pour un gaz parfait</h3>
    <p>Puisque $S$ est une fonction d'état, on peut calculer $\\\\Delta S$ en imaginant un chemin réversible fictif entre les mêmes états initial et final, même si la transformation réelle est irréversible. Pour un gaz parfait de capacité thermique $C_V$ constante, on obtient l'expression générale :</p>
    <div class="formula-box">$$\\\\Delta S = nC_{V,m}\\\\ln\\\\!\\\\left(\\\\frac{T_f}{T_i}\\\\right) + nR\\\\ln\\\\!\\\\left(\\\\frac{V_f}{V_i}\\\\right)$$</div>
    <p>où $C_{V,m}=C_V/n$ est la capacité thermique molaire à volume constant. Cette formule, dérivée à partir de l'identité thermodynamique $dU=TdS-PdV$ combinée au premier principe, permet de calculer $\\\\Delta S$ pour n'importe quelle transformation d'un gaz parfait, réversible ou non, à partir des seuls états initial et final.</p>

    <h3>4. Interprétation statistique : la formule de Boltzmann</h3>
    <p>Au-delà de l'approche macroscopique de Clausius, Ludwig Boltzmann propose en 1877 une interprétation microscopique fondatrice de la physique statistique : l'entropie d'un macro-état est directement liée au nombre $\\\\Omega$ de micro-états (configurations microscopiques distinctes) compatibles avec ce macro-état.</p>
    <div class="formula-box">$$S = k_B\\\\ln\\\\Omega$$</div>
    <p>Cette relation, gravée sur la tombe de Boltzmann à Vienne, éclaire d'un jour nouveau la croissance de l'entropie : un système isolé évolue spontanément vers les macro-états statistiquement les plus probables, c'est-à-dire ceux qui correspondent au plus grand nombre de micro-états possibles — ce qui correspond intuitivement à un désordre croissant (un gaz occupant tout un volume disponible correspond à un nombre de configurations microscopiques immensément supérieur à celui où il resterait confiné dans un coin).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La relation de Boltzmann révèle une nuance importante : le deuxième principe n'est pas une loi absolue interdisant toute diminution locale d'entropie, mais un énoncé statistique extraordinairement probable. Rien n'interdit, en théorie, que toutes les molécules d'un gaz se retrouvent spontanément dans la moitié d'une pièce — c'est juste, avec $\\Omega$ de l'ordre de $10^{23}$ configurations possibles, à peu près aussi probable que de lancer une pièce et d'obtenir « face » un nombre astronomique de fois d'affilée.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une mole de gaz parfait subit une détente de Joule-Gay-Lussac (détente dans le vide, sans travail ni chaleur échangés, $\\\\Delta U=0$ donc $T_f=T_i$ pour un gaz parfait), de $V_i=10$ L à $V_f=20$ L. Calculer $\\\\Delta S$, $S_{ech}$ et $S_{cr}$.</p>
      <p><strong>Solution :</strong> comme $T_f=T_i$, $\\\\Delta S=nR\\\\ln(V_f/V_i)=1\\\\times8{,}314\\\\times\\\\ln(2)\\\\approx5{,}76$ J/K. Or la détente de Joule-Gay-Lussac se produit dans le vide, sans aucun échange de chaleur avec l'extérieur : $Q=0$, donc $S_{ech}=\\\\int\\\\delta Q/T_{ext}=0$. Le bilan entropique donne alors $S_{cr}=\\\\Delta S-S_{ech}=5{,}76-0=5{,}76$ J/K $>0$.</p>
      <p class="example-answer">Réponse : $\\\\Delta S\\\\approx5{,}76$ J/K, entièrement créée ($S_{cr}=\\\\Delta S$) puisque $S_{ech}=0$ : la détente de Joule-Gay-Lussac est un exemple典型 d'irréversibilité totale, confirmé par $S_{cr}>0$.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Bilan entropique : $\\\\Delta S=S_{ech}+S_{cr}$, avec $S_{cr}\\\\geqslant0$ (nul si réversible, strictement positif si irréversible)</li>
        <li>$S_{ech}=\\\\int\\\\delta Q/T_{ext}$ : calculé avec la température de la SOURCE, pas forcément celle du système</li>
        <li>Système isolé : $S_{ech}=0$, donc $\\\\Delta S=S_{cr}\\\\geqslant0$ — l'entropie d'un système isolé ne peut que croître</li>
        <li>Pour un gaz parfait : $\\\\Delta S=nC_{V,m}\\\\ln(T_f/T_i)+nR\\\\ln(V_f/V_i)$, valable pour toute transformation</li>
        <li>Interprétation statistique de Boltzmann : $S=k_B\\\\ln\\\\Omega$ — l'entropie mesure le nombre de configurations microscopiques compatibles avec un état macroscopique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que $\\\\Delta S$ ne peut jamais être négatif — c'est l'entropie CRÉÉE $S_{cr}$ qui ne peut être négative, pas $\\\\Delta S$ lui-même (un système peut voir son entropie diminuer, à condition de céder plus d'entropie qu'il n'en crée)</li>
        <li>Utiliser la température du système au lieu de celle de la source extérieure dans le calcul de $S_{ech}$ lorsqu'une transformation est irréversible</li>
        <li>Confondre le deuxième principe (l'entropie créée est toujours $\\\\geqslant0$) avec l'idée fausse que « tout désordre augmente toujours partout » — ce n'est vrai qu'à l'échelle du système isolé global (système + milieu extérieur), pas nécessairement pour chaque sous-partie</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour une transformation réversible d'un système fermé, l'entropie créée $S_{cr}$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd4e1" value="wrong"> Toujours strictement positive</label>
          <label class="option"><input type="radio" name="thd4e1" value="right"> Exactement nulle</label>
          <label class="option"><input type="radio" name="thd4e1" value="wrong"> Négative</label>
          <label class="option"><input type="radio" name="thd4e1" value="wrong"> Égale à $\\\\Delta S$ dans tous les cas</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd4e1','thd4fb1','Correct — Scr=0 est précisément la DÉFINITION d\\\'une transformation réversible du point de vue entropique.','Rappelle-toi : Scr≥0, avec égalité SI ET SEULEMENT SI la transformation est réversible.')">Vérifier</button>
        <div class="feedback" id="thd4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un système isolé voit son entropie totale :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd4e2" value="wrong"> Toujours diminuer</label>
          <label class="option"><input type="radio" name="thd4e2" value="wrong"> Toujours rester rigoureusement constante</label>
          <label class="option"><input type="radio" name="thd4e2" value="right"> Ne jamais diminuer (croître ou rester constante)</label>
          <label class="option"><input type="radio" name="thd4e2" value="wrong"> Évoluer de façon imprévisible</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd4e2','thd4fb2','Correct — pour un système isolé, Sech=0 donc ΔS=Scr≥0 : l\\\'entropie ne peut que croître ou rester constante (transformation interne réversible).','Pour un système isolé, aucun échange de chaleur possible : Sech=0. Donc ΔS=Scr, qui est toujours ≥0.')">Vérifier</button>
        <div class="feedback" id="thd4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans la formule de Boltzmann $S=k_B\\\\ln\\\\Omega$, que représente $\\\\Omega$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd4e3" value="wrong"> La température du système</label>
          <label class="option"><input type="radio" name="thd4e3" value="right"> Le nombre de micro-états compatibles avec le macro-état observé</label>
          <label class="option"><input type="radio" name="thd4e3" value="wrong"> Le volume du système</label>
          <label class="option"><input type="radio" name="thd4e3" value="wrong"> La pression du système</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd4e3','thd4fb3','Correct — Ω est le nombre de configurations microscopiques (micro-états) distinctes compatibles avec le macro-état thermodynamique observé (P, V, T donnés).','Boltzmann relie l\\\'entropie au DÉNOMBREMENT des configurations microscopiques possibles, pas à une grandeur macroscopique directement mesurable comme P ou V.')">Vérifier</button>
        <div class="feedback" id="thd4fb3"></div>
      </div>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Le principe de Landauer (1961) énonce qu'effacer un bit d'information coûte nécessairement une entropie créée d'au moins $k_B\ln 2$ par bit — reliant directement thermodynamique et théorie de l'information. Longtemps resté une conjecture théorique, il n'a été vérifié expérimentalement qu'en 2012, par une équipe internationale dirigée par Antoine Bérut, en manipulant une bille de verre piégée optiquement. Cette limite fondamentale guide aujourd'hui la conception des processeurs les plus économes en énergie ; une question reste ouverte : jusqu'où peut-on l'approcher dans un calculateur quantique réel, où la décohérence introduit elle-même de l'entropie supplémentaire ?</p>

    <h3>Synthèse visuelle</h3>
    <p>Transformation → identifier le chemin réel (réversible ou non) → calculer $S_{ech}$ à partir des échanges de chaleur, à la température de la SOURCE → calculer $\Delta S$ via un chemin réversible fictif entre les mêmes états → en déduire $S_{cr}=\Delta S-S_{ech}$ → vérifier $S_{cr}\geqslant0$ (sinon, erreur de calcul)</p>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      <div class="formula-box">$$\Delta S = S_{ech} + S_{cr} \qquad S_{cr}\geqslant 0$$</div>
    </div>
    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'univers n'était pas en expansion mais statique : le deuxième principe garantirait-il quand même une « mort thermique » à terme ?</li>
        <li>Pourquoi le réfrigérateur, qui fait passer la chaleur du froid vers le chaud, ne viole-t-il pas l'énoncé de Clausius ?</li>
        <li>Quelle serait la conséquence, pour la biologie, si un organisme vivant parvenait à fonctionner comme un système réellement isolé ?</li>
      </ul>
    </div>
    <div class="key-point">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>R. Clausius, <em>Über verschiedene für die Anwendung bequeme Formen der Hauptgleichungen der mechanischen Wärmetheorie</em>, 1865 — article fondateur où le mot « entropie » est introduit</li>
        <li>J. P. Pérez, <em>Thermodynamique — Fondements et applications</em>, Dunod — référence standard pour les bilans entropiques de niveau L2</li>
        <li>A. Bérut et al., « Experimental verification of Landauer's principle linking information and thermodynamics », <em>Nature</em>, 2012</li>
      </ul>
    </div>
    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Clausius avait raison de forger un mot nouveau pour cette idée : l'entropie n'est ni l'énergie, ni le désordre au sens courant, mais une flèche — celle qui distingue le passé du futur. Rendez-vous au chapitre suivant, « Machines thermiques », pour découvrir comment cette flèche impose une limite théorique incontournable au rendement de tout moteur, aussi bien conçu soit-il.</p>
  `
};
THD_NOVA_KB[thdKey('Deuxième principe : entropie et évolutions irréversibles')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Deuxième principe : entropie et évolutions irréversibles ». Demande-moi le bilan entropique, la formule de Boltzmann, ou un indice sur un exercice.",
  rules: [
    { test:/bilan entropique|s.?ech|s.?cr|entropie cr[ée][ée]e/i, replies:["Bilan entropique : ΔS=Sech+Scr, avec Scr≥0 (nul si réversible, positif si irréversible). Sech=∫δQ/Text utilise la température de la SOURCE, pas forcément celle du système."] },
    { test:/clausius|kelvin|[ée]nonc[ée]/i, replies:["Énoncé de Clausius : la chaleur ne passe jamais spontanément du froid vers le chaud sans travail extérieur. Énoncé de Kelvin : impossible de convertir intégralement en travail la chaleur prélevée à une seule source."] },
    { test:/syst[èe]me isol[ée].*entropie|entropie.*univers/i, replies:["Pour un système isolé, Sech=0 donc ΔS=Scr≥0 : l'entropie d'un système isolé ne peut que croître (ou rester constante si tout est réversible en interne). C'est la formulation « l'entropie de l'univers ne peut que croître »."] },
    { test:/boltzmann|s\s*=\s*k.?b.*ln/i, replies:["La formule de Boltzmann S=kB ln(Ω) relie l'entropie au nombre Ω de micro-états (configurations microscopiques) compatibles avec le macro-état observé : plus Ω est grand, plus S est grande."] },
    { test:/gaz parfait.*entropie|delta s.*gaz/i, replies:["Pour un gaz parfait : ΔS=nCV,m·ln(Tf/Ti)+nR·ln(Vf/Vi), valable pour n'importe quelle transformation entre les mêmes états initial et final."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : Scr=0 est la définition de quel type de transformation ?","Indice niveau 2 : réversible.","Indice niveau 3 : donc Scr est exactement nulle."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : un système isolé peut-il échanger de la chaleur ?","Indice niveau 2 : non, donc Sech=0.","Indice niveau 3 : ΔS=Scr≥0, l'entropie ne peut que croître ou rester constante."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : Ω est lié au dénombrement, pas à une grandeur macroscopique directe.","Indice niveau 2 : c'est un nombre de configurations microscopiques.","Indice niveau 3 : le nombre de micro-états compatibles avec le macro-état observé."] }
  ]
};

/* =========================== CHAPITRE 5 — Machines thermiques =========================== */
THD_CHAPTERS[thdKey('Machines thermiques : cycles, moteurs et réfrigérateurs')] = {
  objectives: [
    "Représenter un cycle thermodynamique dans un diagramme de Watt (P,V) et calculer le travail échangé sur un cycle",
    "Définir le rendement d'un moteur thermique et l'efficacité d'un réfrigérateur ou d'une pompe à chaleur",
    "Établir et utiliser les rendement/efficacité de Carnot comme limite théorique indépassable",
    "Situer les performances réelles des pompes à chaleur actuelles par rapport à la limite de Carnot",
    "Analyser en quoi le mémoire de Sadi Carnot (1824) a anticipé, avant même l'énoncé du premier principe (1840s), l'existence d'une limite théorique universelle au rendement de toute machine thermique"
  ],
  prereqs: ["Deuxième principe : entropie et évolutions irréversibles"],
  bodyHtml: `
    <p>Une <strong>machine thermique</strong> est un système qui fonctionne selon un cycle (retour périodique au même état) en échangeant du travail et de la chaleur avec au moins deux sources de chaleur à des températures différentes. Ce chapitre applique les deux premiers principes à ces dispositifs technologiquement essentiels : moteurs, réfrigérateurs, pompes à chaleur.</p>
    <p>En 1824, un jeune ingénieur militaire français de 28 ans, Sadi Carnot, publie à compte d'auteur un mince mémoire, <em>Réflexions sur la puissance motrice du feu</em>, inquiet de voir la France technologiquement distancée par les machines à vapeur britanniques. Il y démontre, par un raisonnement purement théorique, qu'il existe une limite absolue au rendement de toute machine thermique — un résultat d'autant plus remarquable qu'il précède de près de vingt ans l'énoncé rigoureux du premier principe par Joule. Carnot raisonnait juste sans même disposer encore de l'outil qui allait, plus tard, justifier pleinement son intuition.</p>
    <p>Cette limite théorique gouverne aujourd'hui le rendement de chaque centrale électrique, de chaque moteur automobile, de chaque climatiseur et de chaque pompe à chaleur installée dans un logement. Ce chapitre construit les outils — diagramme de Watt, rendement, efficacité — qui permettent de la formuler précisément et de mesurer l'écart entre la performance théorique idéale et la performance réelle des machines actuelles.</p>

    <h3>1. Le cycle thermodynamique et le diagramme de Watt</h3>
    <p>Sur un diagramme de Watt (pression $P$ en fonction du volume $V$), un cycle est représenté par une courbe fermée. Le travail total échangé sur un cycle complet est donné par l'aire algébrique enfermée par cette courbe :</p>
    <div class="formula-box">$$W_{cycle} = -\\\\oint P\\\\,dV$$</div>
    <p>Un cycle parcouru dans le sens horaire (sens des aiguilles d'une montre) correspond à un travail total <strong>négatif</strong> (le système fournit du travail au milieu extérieur sur l'ensemble du cycle) : c'est le cas d'un <strong>moteur</strong>. Un cycle parcouru dans le sens antihoraire correspond à un travail total <strong>positif</strong> (le système reçoit du travail) : c'est le cas d'un <strong>récepteur</strong> (réfrigérateur, pompe à chaleur).</p>
    <div class="diagram">
      <svg width="260" height="150" viewBox="0 0 260 150">
        <line x1="30" y1="130" x2="240" y2="130" stroke="#122043" stroke-width="1"/>
        <line x1="30" y1="130" x2="30" y2="15" stroke="#122043" stroke-width="1"/>
        <text x="235" y="145" font-family="IBM Plex Mono" font-size="9" fill="#122043">V</text>
        <text x="10" y="20" font-family="IBM Plex Mono" font-size="9" fill="#122043">P</text>
        <path d="M60,110 C90,40 170,40 200,60 C170,100 110,120 60,110 Z" fill="#3D6BF0" opacity="0.14" stroke="#3D6BF0" stroke-width="1.8"/>
        <path d="M120,60 l8,-3 l-3,8" fill="none" stroke="#3D6BF0" stroke-width="1.6"/>
        <text x="115" y="30" font-family="IBM Plex Mono" font-size="8" fill="#3D6BF0">sens horaire → moteur</text>
      </svg>
    </div>

    <h3>2. Moteur thermique ditherme et rendement</h3>
    <p>Un <strong>moteur ditherme</strong> échange de la chaleur avec deux sources : une source chaude (température $T_C$, cède la chaleur $Q_C>0$ reçue par le moteur) et une source froide (température $T_F<T_C$, reçoit la chaleur $Q_F<0$ cédée par le moteur), pour fournir du travail $W<0$ au milieu extérieur sur chaque cycle. Le premier principe sur un cycle ($\\\\Delta U=0$ car $U$ est une fonction d'état) donne $W+Q_C+Q_F=0$. Le <strong>rendement</strong> $\\\\eta$ compare l'énergie utile obtenue (le travail fourni, en valeur absolue) à l'énergie dépensée (la chaleur prélevée à la source chaude) :</p>
    <div class="formula-box">$$\\\\eta = \\\\frac{|W|}{Q_C} = 1 - \\\\frac{|Q_F|}{Q_C}$$</div>

    <h3>3. Le théorème de Carnot et le rendement maximal</h3>
    <p>En appliquant le deuxième principe (bilan entropique nul sur un cycle pour une machine réversible, puisque $S$ est une fonction d'état) à un moteur ditherme fonctionnant de façon réversible entre les deux sources, on obtient le <strong>théorème de Carnot</strong> (Sadi Carnot, 1824, dans son traité fondateur <em>Réflexions sur la puissance motrice du feu</em>) :</p>
    <div class="formula-box">$$\\\\eta_{Carnot} = 1 - \\\\frac{T_F}{T_C} \\\\qquad (T_C,\\\\,T_F\\\\ \\\\text{en kelvins})$$</div>
    <div class="key-point">
      <span class="eyebrow">Le rendement de Carnot est une limite indépassable</span>
      Pour toute machine ditherme réelle fonctionnant entre les mêmes deux températures $T_C$ et $T_F$, on démontre à partir du deuxième principe que $\\\\eta\\\\leqslant\\\\eta_{Carnot}$, avec égalité seulement dans le cas idéal (et physiquement inaccessible) d'un fonctionnement parfaitement réversible. C'est un résultat d'une portée considérable : aucune amélioration technologique, aussi poussée soit-elle, ne peut faire dépasser à un moteur thermique réel le rendement de Carnot correspondant à ses deux températures de fonctionnement — seule une augmentation de $T_C$ ou une diminution de $T_F$ peut relever cette limite théorique.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Carnot a établi sa limite théorique en 1824 sans connaître le premier principe ni la notion d'entropie, qui n'existeront que des décennies plus tard. En quoi ce résultat, obtenu par un raisonnement purement logique sur des cycles réversibles fictifs, illustre-t-il la puissance d'un raisonnement thermodynamique abstrait, indépendant de la nature précise du fluide ou de la machine étudiée ?
    </div>

    <h3>4. Réfrigérateurs et pompes à chaleur : l'efficacité (COP)</h3>
    <p>Un <strong>récepteur ditherme</strong> (cycle parcouru en sens antihoraire) reçoit du travail $W>0$ pour transférer de la chaleur de la source froide vers la source chaude — un transfert qui ne se produit jamais spontanément dans ce sens (énoncé de Clausius, chapitre 4). Selon l'effet utile recherché, on définit deux <strong>coefficients de performance</strong> (COP, ou efficacité $\\\\varepsilon$), tous deux supérieurs à 1 (contrairement au rendement d'un moteur, toujours inférieur à 1) :</p>
    <table class="mini-table">
      <tr><th>Machine</th><th>Effet utile</th><th>Efficacité (COP)</th><th>COP de Carnot</th></tr>
      <tr><td>Réfrigérateur</td><td>Extraire de la chaleur de la source froide ($|Q_F|$)</td><td>$\\\\varepsilon_{frigo}=\\\\dfrac{|Q_F|}{W}$</td><td>$\\\\varepsilon_{frigo}^{Carnot}=\\\\dfrac{T_F}{T_C-T_F}$</td></tr>
      <tr><td>Pompe à chaleur</td><td>Fournir de la chaleur à la source chaude ($Q_C$)</td><td>$\\\\varepsilon_{PAC}=\\\\dfrac{Q_C}{W}$</td><td>$\\\\varepsilon_{PAC}^{Carnot}=\\\\dfrac{T_C}{T_C-T_F}$</td></tr>
    </table>
    <p>On remarque la relation $\\\\varepsilon_{PAC}=\\\\varepsilon_{frigo}+1$, valable aussi bien pour les valeurs réelles que pour les valeurs de Carnot, puisque $Q_C=|Q_F|+W$ (premier principe sur un cycle). Une pompe à chaleur (PAC) fournit ainsi toujours plus d'énergie thermique utile que l'énergie électrique $W$ qu'elle consomme, en « pompant » l'essentiel de la chaleur fournie depuis le milieu extérieur froid — d'où son intérêt majeur pour le chauffage économe en énergie.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une pompe à chaleur air-eau puise des calories dans l'air extérieur à $T_F=278$ K (5°C) pour chauffer un circuit d'eau à $T_C=323$ K (50°C). Calculer son COP de Carnot théorique maximal, puis le comparer à un COP saisonnier réel typique de 3,8 à 4,2 relevé sur les pompes à chaleur air-eau récentes (données 2025).</p>
      <p><strong>Solution :</strong> $\\\\varepsilon_{PAC}^{Carnot}=\\\\dfrac{T_C}{T_C-T_F}=\\\\dfrac{323}{323-278}=\\\\dfrac{323}{45}\\\\approx7{,}2$.</p>
      <p class="example-answer">Réponse : le COP de Carnot théorique (≈7,2) est très supérieur au COP saisonnier réel observé sur le terrain (≈3,8-4,2), ce qui illustre bien l'écart persistant entre la limite thermodynamique idéale et les performances réelles, dues aux irréversibilités du cycle réel (compresseur non isentropique, échangeurs à écart de température fini, pertes diverses) — un écart caractéristique de toute machine thermique réelle, mais qui n'empêche pas la pompe à chaleur de rester, de loin, le mode de chauffage le plus efficace énergétiquement.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'écart entre le COP de Carnot (≈7,2) et le COP réel (≈3,8-4,2) d'une pompe à chaleur peut sembler décevant. Pourtant, même à seulement la moitié de la limite théorique, une PAC reste bien plus efficace qu'un chauffage électrique direct (COP=1). Pourquoi la comparaison pertinente n'est-elle pas « réel contre théorique », mais plutôt « cette technologie contre les alternatives disponibles » ?
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Sur un diagramme de Watt, $W_{cycle}=-\\\\oint P\\\\,dV$ ; sens horaire = moteur ($W<0$), sens antihoraire = récepteur ($W>0$)</li>
        <li>Rendement d'un moteur ditherme : $\\\\eta=|W|/Q_C=1-|Q_F|/Q_C$, toujours $\\\\leqslant1$</li>
        <li>Théorème de Carnot : $\\\\eta_{Carnot}=1-T_F/T_C$, limite THÉORIQUE indépassable pour toute machine ditherme réelle</li>
        <li>Efficacité (COP) d'un réfrigérateur $\\\\varepsilon_{frigo}=|Q_F|/W$, d'une PAC $\\\\varepsilon_{PAC}=Q_C/W=\\\\varepsilon_{frigo}+1$, toutes deux $\\\\geqslant1$</li>
        <li>Les COP réels des pompes à chaleur actuelles restent nettement inférieurs au COP de Carnot théorique, du fait des irréversibilités du cycle réel</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'un rendement ou une efficacité de Carnot est atteignable en pratique — c'est une limite théorique pour une machine réversible idéale, jamais réalisée exactement</li>
        <li>Confondre rendement (toujours $\\\\leqslant1$, pour un moteur) et efficacité/COP (souvent $>1$, pour un réfrigérateur ou une PAC) — ce ne sont pas des grandeurs de même nature</li>
        <li>Oublier de convertir les températures en KELVINS dans les formules de Carnot</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un moteur ditherme fonctionne entre $T_C=600$ K et $T_F=300$ K. Quel est son rendement de Carnot maximal ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd5e1" value="wrong"> 0,25</label>
          <label class="option"><input type="radio" name="thd5e1" value="right"> 0,5</label>
          <label class="option"><input type="radio" name="thd5e1" value="wrong"> 0,75</label>
          <label class="option"><input type="radio" name="thd5e1" value="wrong"> 1,0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd5e1','thd5fb1','Correct — ηCarnot=1-TF/TC=1-300/600=1-0,5=0,5.','ηCarnot=1-TF/TC. Calcule d\\\'abord TF/TC=300/600.')">Vérifier</button>
        <div class="feedback" id="thd5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Sur un diagramme de Watt, un cycle parcouru dans le sens antihoraire correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd5e2" value="wrong"> Un moteur, qui fournit du travail</label>
          <label class="option"><input type="radio" name="thd5e2" value="right"> Un récepteur (réfrigérateur ou PAC), qui reçoit du travail</label>
          <label class="option"><input type="radio" name="thd5e2" value="wrong"> Un système à l'équilibre, sans échange</label>
          <label class="option"><input type="radio" name="thd5e2" value="wrong"> Une transformation isotherme uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd5e2','thd5fb2','Correct — le sens antihoraire correspond à un travail total positif (reçu) : c\\\'est le cas d\\\'un récepteur comme un réfrigérateur ou une pompe à chaleur.','Le sens HORAIRE = moteur (W<0, fournit du travail). Le sens ANTIhoraire, c\\\'est donc l\\\'inverse.')">Vérifier</button>
        <div class="feedback" id="thd5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une pompe à chaleur a un COP réel de 4. Quelle relation relie ce COP à celui d'un réfrigérateur fonctionnant entre les deux mêmes sources ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd5e3" value="wrong"> $\\\\varepsilon_{frigo}=\\\\varepsilon_{PAC}=4$</label>
          <label class="option"><input type="radio" name="thd5e3" value="right"> $\\\\varepsilon_{frigo}=\\\\varepsilon_{PAC}-1=3$</label>
          <label class="option"><input type="radio" name="thd5e3" value="wrong"> $\\\\varepsilon_{frigo}=\\\\varepsilon_{PAC}+1=5$</label>
          <label class="option"><input type="radio" name="thd5e3" value="wrong"> Aucune relation simple n'existe entre les deux</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd5e3','thd5fb3','Correct — la relation εPAC=εfrigo+1 (issue du premier principe, QC=|QF|+W) donne εfrigo=εPAC-1=4-1=3.','Rappelle-toi la relation générale εPAC=εfrigo+1, valable pour les mêmes deux sources.')">Vérifier</button>
        <div class="feedback" id="thd5fb3"></div>
      </div>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>En 2016, une équipe allemande dirigée par Johannes Roßnagel réalise le premier moteur thermique constitué d'un seul atome — un ion de calcium piégé électromagnétiquement, alternativement couplé à un « réservoir chaud » et un « réservoir froid » simulés par laser (publié dans <em>Science</em>). Ce moteur miniature, mille fois plus petit qu'une bactérie, confirme que les lois de Carnot restent valables à l'échelle quantique, moyennant des corrections liées au bruit quantique. La thermodynamique quantique reste un domaine de recherche actif : peut-on, à cette échelle, dépasser la limite de Carnot en exploitant des effets purement quantiques comme la cohérence ou l'intrication ? La question divise encore la communauté théorique.</p>

    <h3>Synthèse visuelle</h3>
    <p>Cycle sur diagramme de Watt → sens horaire (moteur, $W<0$) ou antihoraire (récepteur, $W>0$) → bilan énergétique (premier principe sur le cycle) → rendement $\\eta$ ou efficacité $\\varepsilon$ → comparaison à la limite théorique de Carnot ($T_C$, $T_F$ en kelvins) → écart dû aux irréversibilités réelles</p>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      <div class="formula-box">$$\\eta_{Carnot} = 1 - \\frac{T_F}{T_C} \\qquad \\eta \\leqslant \\eta_{Carnot}$$</div>
    </div>
    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on disposait d'une source froide à 0 kelvin : quel serait le rendement de Carnot, et pourquoi cette situation reste-t-elle physiquement inaccessible ?</li>
        <li>Pourquoi un moteur thermique automobile réel, avec un rendement typique de 30 à 40 %, est-il si loin de sa limite de Carnot alors que $T_C$ y dépasse souvent 2000 K ?</li>
        <li>Quelle serait la conséquence, pour la transition énergétique, si l'on parvenait à approcher significativement la limite de Carnot dans les centrales thermiques actuelles ?</li>
      </ul>
    </div>
    <div class="key-point">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>S. Carnot, <em>Réflexions sur la puissance motrice du feu et sur les machines propres à développer cette puissance</em>, 1824 — mémoire fondateur de la thermodynamique des machines</li>
        <li>J. P. Pérez, <em>Thermodynamique — Fondements et applications</em>, Dunod — référence standard pour les cycles et machines thermiques de niveau L2</li>
        <li>J. Roßnagel et al., « A single-atom heat engine », <em>Science</em>, 2016</li>
      </ul>
    </div>
    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Un ingénieur de 28 ans, sans connaître ni l'entropie ni le premier principe, a posé une limite que ni le génie industriel ni un siècle de progrès technique n'ont pu franchir : voilà la marque d'une véritable loi physique. Rendez-vous au chapitre suivant, « Potentiels thermodynamiques », pour découvrir les outils qui permettent de prédire le sens d'évolution spontanée des systèmes hors du cadre simplifié des cycles.</p>
  `
};
THD_NOVA_KB[thdKey('Machines thermiques : cycles, moteurs et réfrigérateurs')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Machines thermiques : cycles, moteurs et réfrigérateurs ». Demande-moi le théorème de Carnot, la différence rendement/COP, ou un indice sur un exercice.",
  rules: [
    { test:/carnot/i, replies:["Le théorème de Carnot donne le rendement MAXIMAL théorique d'un moteur ditherme : ηCarnot=1-TF/TC. Aucune machine réelle ne peut le dépasser — c'est une limite absolue fixée par le deuxième principe."] },
    { test:/rendement|efficacit[ée]|cop\b/i, replies:["Rendement d'un moteur : η=|W|/QC, toujours ≤1. Efficacité (COP) d'un réfrigérateur ou d'une PAC : εfrigo=|QF|/W, εPAC=QC/W=εfrigo+1, toutes deux souvent >1 — ce ne sont pas les mêmes grandeurs."] },
    { test:/diagramme de watt|sens horaire|sens antihoraire|cycle/i, replies:["Sur un diagramme de Watt (P,V), Wcycle=-∮P dV. Sens horaire = moteur (W<0, fournit du travail). Sens antihoraire = récepteur, réfrigérateur ou PAC (W>0, reçoit du travail)."] },
    { test:/pompe [àa] chaleur|pac\b/i, replies:["Une pompe à chaleur transfère de la chaleur du froid vers le chaud grâce au travail W qu'elle consomme (compresseur électrique). Son COP réel (souvent 3,8-4,5 en 2025) reste nettement inférieur au COP de Carnot théorique, à cause des irréversibilités du cycle réel."] },
    { test:/r[ée]frig[ée]rateur/i, replies:["Un réfrigérateur extrait de la chaleur de la source froide grâce au travail reçu : εfrigo=|QF|/W. C'est la même machine physique qu'une PAC, mais avec un effet utile différent (refroidir vs chauffer)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique ηCarnot=1-TF/TC.","Indice niveau 2 : TF/TC=300/600=0,5.","Indice niveau 3 : η=1-0,5=0,5."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le sens horaire correspond au moteur. Qu'en est-il de l'antihoraire ?","Indice niveau 2 : c'est l'inverse — travail reçu, pas fourni.","Indice niveau 3 : c'est un récepteur (réfrigérateur/PAC)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : rappelle-toi εPAC=εfrigo+1.","Indice niveau 2 : donc εfrigo=εPAC-1.","Indice niveau 3 : εfrigo=4-1=3."] }
  ]
};

/* =========================== CHAPITRE 6 — Potentiels thermodynamiques =========================== */
THD_CHAPTERS[thdKey('Potentiels thermodynamiques : enthalpie, énergie libre, enthalpie libre')] = {
  objectives: [
    "Définir l'enthalpie $H$, l'énergie libre $F$ et l'enthalpie libre $G$ à partir de l'énergie interne $U$",
    "Identifier les variables naturelles de chaque potentiel et les conditions expérimentales où chacun est pertinent",
    "Relier la variation d'enthalpie à la chaleur échangée à pression constante",
    "Énoncer le critère d'évolution spontanée en termes d'enthalpie libre à $T,P$ fixées"
  ],
  prereqs: ["Deuxième principe : entropie et évolutions irréversibles"],
  bodyHtml: `
    <p>L'énergie interne $U$ et l'entropie $S$ sont des fonctions d'état fondamentales, mais rarement les plus commodes à utiliser en pratique : la plupart des transformations chimiques ou physiques réelles se déroulent à pression constante (à l'air libre) ou à température constante (thermostat), et non à volume constant. Ce chapitre introduit trois <strong>potentiels thermodynamiques</strong> dérivés de $U$, chacun adapté à des conditions expérimentales différentes.</p>

    <h3>1. L'enthalpie $H$ : le potentiel de l'isobare</h3>
    <div class="formula-box">$$H = U + PV$$</div>
    <p>Pour une transformation monobare (pression extérieure constante, égale à la pression finale) sans travail autre que celui des forces de pression, on démontre à partir du premier principe que la variation d'enthalpie est directement égale à la chaleur échangée :</p>
    <div class="formula-box">$$\\\\Delta H = Q_P \\\\qquad (\\\\text{transformation monobare})$$</div>
    <p>C'est cette propriété qui rend l'enthalpie si utile en thermochimie : la plupart des réactions chimiques et changements d'état se produisent à l'air libre, donc à pression atmosphérique constante — mesurer la chaleur échangée dans ces conditions (par calorimétrie) revient directement à mesurer $\\\\Delta H$. De même que $C_V=(\\\\partial U/\\\\partial T)_V$, on définit la capacité thermique à pression constante $C_P=(\\\\partial H/\\\\partial T)_P$, généralement légèrement supérieure à $C_V$ car une partie de la chaleur fournie à pression constante sert aussi à faire varier le volume (relation de Mayer $C_P-C_V=nR$ pour un gaz parfait).</p>

    <h3>2. L'énergie libre $F$ (ou énergie de Helmholtz) : le potentiel de l'isotherme</h3>
    <div class="formula-box">$$F = U - TS$$</div>
    <p>L'énergie libre est le potentiel naturellement adapté aux transformations à température constante (système en contact avec un thermostat). On montre qu'à température constante, la variation d'énergie libre est reliée au travail échangé autre que celui des forces de pression $W_{autre}$ (travail dit « utile ») par une inégalité, qui devient une égalité dans le cas réversible :</p>
    <div class="formula-box">$$\\\\Delta F \\\\leqslant W_{autre} \\\\qquad (\\\\text{transformation isotherme})$$</div>
    <p>L'énergie libre représente ainsi la part de l'énergie interne effectivement « libre » d'être convertie en travail utile à température constante — le reste ($TS$) étant, en un sens, « lié » à l'agitation thermique désordonnée du système et non récupérable sous forme de travail ordonné.</p>

    <h3>3. L'enthalpie libre $G$ (ou énergie de Gibbs) : le potentiel de l'isotherme-isobare</h3>
    <div class="formula-box">$$G = H - TS = U + PV - TS$$</div>
    <p>L'enthalpie libre, introduite par Josiah Willard Gibbs dans les années 1870, est le potentiel le plus utilisé en pratique (chimie, biologie, science des matériaux), car la plupart des processus réels se déroulent simultanément à température ET à pression constantes (conditions ambiantes usuelles). Le critère fondamental d'évolution spontanée d'un système fermé à $T$ et $P$ fixées, sans autre travail que celui des forces de pression, s'écrit :</p>
    <div class="formula-box">$$\\\\Delta G \\\\leqslant 0 \\\\qquad (\\\\text{transformation spontanée à }T,P\\\\text{ fixées})$$</div>
    <div class="key-point">
      <span class="eyebrow">Équilibre et spontanéité</span>
      Un système à $T,P$ fixées évolue spontanément dans le sens qui diminue son enthalpie libre $G$, jusqu'à atteindre un état d'équilibre correspondant à un minimum de $G$ ($dG=0$ à l'équilibre). C'est ce critère qui gouverne, par exemple, le sens spontané d'une réaction chimique ou la stabilité relative de deux phases d'un même corps pur (chapitre 7) — la phase la plus stable, à $T,P$ données, est toujours celle de plus basse enthalpie libre molaire.
    </div>

    <h3>4. Tableau récapitulatif des potentiels thermodynamiques</h3>
    <table class="mini-table">
      <tr><th>Potentiel</th><th>Définition</th><th>Variables naturelles</th><th>Condition d'utilisation privilégiée</th></tr>
      <tr><td>Énergie interne $U$</td><td>—</td><td>$S, V$</td><td>Système isolé, transformation isochore</td></tr>
      <tr><td>Enthalpie $H$</td><td>$U+PV$</td><td>$S, P$</td><td>Transformation isobare (chimie, calorimétrie)</td></tr>
      <tr><td>Énergie libre $F$</td><td>$U-TS$</td><td>$T, V$</td><td>Transformation isotherme à volume constant</td></tr>
      <tr><td>Enthalpie libre $G$</td><td>$H-TS$</td><td>$T, P$</td><td>Transformation isotherme-isobare (le plus courant)</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une réaction chimique, réalisée à pression et température constantes, libère 50 kJ/mol sous forme de chaleur ($\\\\Delta H=-50$ kJ/mol) et s'accompagne d'une diminution d'entropie $\\\\Delta S=-30$ J/(mol·K) à $T=298$ K. Cette réaction est-elle spontanée dans ces conditions ?</p>
      <p><strong>Solution :</strong> $\\\\Delta G=\\\\Delta H-T\\\\Delta S=-50\\\\,000-298\\\\times(-30)=-50\\\\,000+8940=-41\\\\,060$ J/mol $=-41{,}06$ kJ/mol.</p>
      <p class="example-answer">Réponse : $\\\\Delta G<0$, donc la réaction est spontanée à $T=298$ K malgré la diminution d'entropie, car le terme enthalpique (très négatif) l'emporte largement sur le terme entropique défavorable $-T\\\\Delta S$.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Enthalpie $H=U+PV$ : $\\\\Delta H=Q_P$ à pression constante — le potentiel de la calorimétrie et de la thermochimie</li>
        <li>Énergie libre $F=U-TS$ : pertinente à température constante, mesure l'énergie « récupérable » sous forme de travail utile</li>
        <li>Enthalpie libre $G=H-TS$ : pertinente à $T,P$ constantes — le potentiel le plus utilisé en chimie et en science des matériaux</li>
        <li>Critère de spontanéité à $T,P$ fixées : $\\\\Delta G\\\\leqslant0$ ; équilibre atteint quand $G$ est minimale</li>
        <li>$\\\\Delta G=\\\\Delta H-T\\\\Delta S$ : la spontanéité résulte d'un compromis entre un terme énergétique ($\\\\Delta H$) et un terme entropique ($-T\\\\Delta S$)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser $\\\\Delta G\\\\leqslant0$ comme critère universel — cette inégalité n'est valable qu'à $T$ ET $P$ constantes ; à $T,V$ constants, c'est $\\\\Delta F\\\\leqslant0$ qu'il faut utiliser</li>
        <li>Oublier de convertir $\\\\Delta S$ en joules (et non en kJ) avant de calculer $T\\\\Delta S$ dans la même unité que $\\\\Delta H$</li>
        <li>Croire qu'une réaction exothermique ($\\\\Delta H<0$) est toujours spontanée — c'est le signe de $\\\\Delta G$, pas de $\\\\Delta H$ seul, qui détermine la spontanéité</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour une transformation monobare, la variation d'enthalpie $\\\\Delta H$ est égale à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd6e1" value="wrong"> Le travail $W$ échangé</label>
          <label class="option"><input type="radio" name="thd6e1" value="right"> La chaleur $Q_P$ échangée à pression constante</label>
          <label class="option"><input type="radio" name="thd6e1" value="wrong"> L'entropie créée</label>
          <label class="option"><input type="radio" name="thd6e1" value="wrong"> Toujours zéro</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd6e1','thd6fb1','Correct — ΔH=QP est la propriété fondamentale qui rend l\\\'enthalpie si utile en thermochimie et en calorimétrie à pression constante.','C\\\'est LA propriété centrale de l\\\'enthalpie : à pression constante, sa variation est directement mesurable via la chaleur échangée.')">Vérifier</button>
        <div class="feedback" id="thd6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le critère de spontanéité $\\\\Delta G\\\\leqslant0$ est valable dans quelles conditions ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd6e2" value="wrong"> Toujours, quelles que soient les conditions</label>
          <label class="option"><input type="radio" name="thd6e2" value="right"> À température et pression constantes</label>
          <label class="option"><input type="radio" name="thd6e2" value="wrong"> Uniquement dans le vide</label>
          <label class="option"><input type="radio" name="thd6e2" value="wrong"> Uniquement pour les gaz parfaits</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd6e2','thd6fb2','Correct — G est spécifiquement le potentiel adapté aux conditions T,P constantes : c\\\'est dans ce cadre précis que ΔG≤0 caractérise une évolution spontanée.','G a pour variables naturelles T et P : le critère ΔG≤0 n\\\'est valable QUE si ces deux grandeurs sont fixées.')">Vérifier</button>
        <div class="feedback" id="thd6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une réaction a $\\\\Delta H=+20$ kJ/mol et $\\\\Delta S=+80$ J/(mol·K) à $T=400$ K. Est-elle spontanée ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd6e3" value="wrong"> Non, car $\\\\Delta H>0$</label>
          <label class="option"><input type="radio" name="thd6e3" value="right"> Oui, car $\\\\Delta G=20\\\\,000-400\\\\times80=-12\\\\,000$ J/mol $<0$</label>
          <label class="option"><input type="radio" name="thd6e3" value="wrong"> Impossible à déterminer sans connaître $\\\\Delta U$</label>
          <label class="option"><input type="radio" name="thd6e3" value="wrong"> Non, car $\\\\Delta S>0$ seul suffit à l'exclure</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd6e3','thd6fb3','Correct — malgré ΔH>0 (endothermique), le grand terme entropique favorable -TΔS=-32000 J/mol rend ΔG négatif : la réaction est spontanée à cette température, entropiquement favorisée.','Calcule ΔG=ΔH-TΔS en convertissant bien ΔS en J (pas kJ) : 20000-400×80=20000-32000=-12000 J/mol.')">Vérifier</button>
        <div class="feedback" id="thd6fb3"></div>
      </div>
    </div>
  `
};
THD_NOVA_KB[thdKey('Potentiels thermodynamiques : enthalpie, énergie libre, enthalpie libre')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Potentiels thermodynamiques ». Demande-moi la différence H/F/G, le critère de spontanéité, ou un indice sur un exercice.",
  rules: [
    { test:/enthalpie\b(?!.*libre)/i, replies:["Enthalpie H=U+PV. Sa propriété clé : ΔH=QP pour une transformation à pression constante — c'est le potentiel de la thermochimie et de la calorimétrie."] },
    { test:/[ée]nergie libre|helmholtz/i, replies:["Énergie libre F=U-TS, pertinente à température constante. ΔF≤Wautre pour une transformation isotherme : elle mesure l'énergie récupérable sous forme de travail utile."] },
    { test:/enthalpie libre|gibbs|delta g/i, replies:["Enthalpie libre G=H-TS=U+PV-TS. Critère de spontanéité à T,P constantes : ΔG≤0. Le système évolue jusqu'à un minimum de G (équilibre)."] },
    { test:/spontan[ée]/i, replies:["La spontanéité d'une transformation à T,P constantes dépend du signe de ΔG=ΔH-TΔS, pas de ΔH seul : une réaction endothermique (ΔH>0) peut être spontanée si le terme entropique -TΔS est suffisamment favorable."] },
    { test:/cp.*cv|relation de mayer/i, replies:["Relation de Mayer pour un gaz parfait : CP-CV=nR. CP (à pression constante) est toujours légèrement supérieur à CV (à volume constant), car une partie de la chaleur sert aussi à faire varier le volume."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : quelle est LA propriété centrale de l'enthalpie ?","Indice niveau 2 : elle est directement liée à la chaleur, mais à quelle condition ?","Indice niveau 3 : ΔH=QP, à pression constante."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : quelles sont les variables naturelles de G ?","Indice niveau 2 : T et P.","Indice niveau 3 : donc ΔG≤0 n'est valable qu'à T,P constantes."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : calcule ΔG=ΔH-TΔS (attention aux unités de ΔS).","Indice niveau 2 : convertis ΔS en J : 80 J/(mol·K), puis TΔS=400×80=32000 J/mol.","Indice niveau 3 : ΔG=20000-32000=-12000 J/mol <0, donc spontanée."] }
  ]
};

/* =========================== CHAPITRE 7 — Changements d'état des corps purs =========================== */
THD_CHAPTERS[thdKey('Changements d\'état des corps purs et diagrammes de phases')] = {
  objectives: [
    "Lire un diagramme de phases $(P,T)$ d'un corps pur et identifier le point triple et le point critique",
    "Définir l'enthalpie de changement d'état et son lien avec la chaleur latente",
    "Établir et utiliser la relation de Clausius-Clapeyron le long d'une courbe de coexistence",
    "Expliquer le comportement anormal de l'eau (pente négative de la courbe de fusion) à partir de sa structure"
  ],
  prereqs: ["Potentiels thermodynamiques : enthalpie, énergie libre, enthalpie libre"],
  bodyHtml: `
    <p>Un corps pur peut exister sous plusieurs <strong>phases</strong> — solide, liquide, gaz, et parfois plusieurs variétés cristallines solides distinctes — selon les conditions de pression et de température. Ce chapitre applique le critère de spontanéité en enthalpie libre (chapitre 6) à la coexistence et à la transition entre ces phases.</p>

    <h3>1. Le diagramme de phases $(P,T)$ d'un corps pur</h3>
    <p>Le diagramme de phases représente, dans le plan $(P,T)$, les domaines où chaque phase est thermodynamiquement stable (celle de plus basse enthalpie libre molaire à $P,T$ données), séparés par des <strong>courbes de coexistence</strong> le long desquelles deux phases sont en équilibre (même enthalpie libre molaire pour les deux phases).</p>
    <div class="diagram">
      <svg width="260" height="180" viewBox="0 0 260 180">
        <line x1="30" y1="160" x2="240" y2="160" stroke="#122043" stroke-width="1"/>
        <line x1="30" y1="160" x2="30" y2="15" stroke="#122043" stroke-width="1"/>
        <text x="235" y="175" font-family="IBM Plex Mono" font-size="9" fill="#122043">T</text>
        <text x="10" y="20" font-family="IBM Plex Mono" font-size="9" fill="#122043">P</text>
        <path d="M60,160 C75,110 90,60 100,20" fill="none" stroke="#3D6BF0" stroke-width="1.8"/>
        <path d="M100,20 C130,90 170,120 230,140" fill="none" stroke="#F0555C" stroke-width="1.8"/>
        <path d="M100,20 C95,55 90,100 60,160" fill="none" stroke="#1FB6A8" stroke-width="1.8"/>
        <circle cx="100" cy="20" r="3" fill="#122043"/>
        <text x="60" y="60" font-family="IBM Plex Mono" font-size="8" fill="#122043">Solide</text>
        <text x="160" y="80" font-family="IBM Plex Mono" font-size="8" fill="#122043">Liquide</text>
        <text x="190" y="150" font-family="IBM Plex Mono" font-size="8" fill="#122043">Gaz</text>
        <circle cx="100" cy="100" r="2.5" fill="#F0555C"/>
        <text x="105" y="103" font-family="IBM Plex Mono" font-size="8" fill="#F0555C">Triple</text>
        <circle cx="205" cy="65" r="2.5" fill="#8064F2"/>
        <text x="150" y="58" font-family="IBM Plex Mono" font-size="8" fill="#8064F2">Critique</text>
      </svg>
    </div>
    <p>Deux points particuliers structurent ce diagramme :</p>
    <div class="key-point">
      <span class="eyebrow">Point triple</span>
      Point unique $(P_{tr},T_{tr})$ où les trois phases (solide, liquide, gaz) coexistent simultanément en équilibre. D'après la règle des phases de Gibbs (chapitre 5 de Chimie des matériaux inorganiques), avec $C=1$ (corps pur) et $\\\\varphi=3$, la variance est $v=C-\\\\varphi+2=0$ : le point triple d'un corps pur donné est un point unique, parfaitement fixé — c'est pourquoi le point triple de l'eau (273,16 K exactement, 611,657 Pa) a longtemps servi de référence pour définir l'échelle kelvin (avant la redéfinition de 2019 basée sur la constante de Boltzmann).
    </div>
    <div class="key-point">
      <span class="eyebrow">Point critique</span>
      Point $(P_c,T_c)$ au-delà duquel la distinction entre phase liquide et phase gazeuse disparaît : la courbe de coexistence liquide-gaz s'arrête à ce point, et au-delà, on ne parle plus que de <strong>fluide supercritique</strong>, aux propriétés intermédiaires (densité proche du liquide, capacité de diffusion proche du gaz). Pour l'eau, $T_c=647$ K (374°C) et $P_c\\\\approx22{,}1$ MPa ; pour le $CO_2$, $T_c=304$ K (31°C) seulement, ce qui rend le $CO_2$ supercritique facilement accessible et largement utilisé industriellement (décaféination, extraction d'arômes, fluide de nettoyage « vert »).
    </div>

    <h3>2. Enthalpie de changement d'état</h3>
    <p>Le passage d'une phase à une autre, à $T,P$ fixées sur la courbe de coexistence, s'accompagne d'un échange de chaleur à température constante, appelé <strong>chaleur latente</strong> ou <strong>enthalpie de changement d'état</strong> $\\\\Delta_{trans}H$ (positive dans le sens endothermique : fusion, vaporisation, sublimation ; négative dans le sens exothermique : solidification, liquéfaction, condensation). Puisque la transformation se fait à $P$ constante, $\\\\Delta_{trans}H=Q_P$ (cf. chapitre 6). Pour l'eau à pression atmosphérique, $\\\\Delta_{vap}H\\\\approx40{,}7$ kJ/mol à $100$°C — une valeur nettement supérieure à celle de la plupart des liquides moléculaires, en raison des liaisons hydrogène qu'il faut rompre pour vaporiser l'eau.</p>

    <h3>3. La relation de Clausius-Clapeyron</h3>
    <p>La pente de chaque courbe de coexistence dans le diagramme $(P,T)$ n'est pas quelconque : elle est fixée par la thermodynamique via la relation de <strong>Clausius-Clapeyron</strong>, obtenue en écrivant l'égalité des enthalpies libres molaires des deux phases le long de la courbe :</p>
    <div class="formula-box">$$\\\\frac{dP}{dT} = \\\\frac{\\\\Delta_{trans}H}{T\\\\,\\\\Delta_{trans}V}$$</div>
    <p>où $\\\\Delta_{trans}V=V_{m,2}-V_{m,1}$ est la variation de volume molaire lors du changement d'état. Pour les transitions solide-gaz et liquide-gaz, $\\\\Delta_{trans}V>0$ (le gaz occupe toujours un volume molaire bien plus grand) et $\\\\Delta_{trans}H>0$ dans le sens endothermique choisi par convention : la pente $dP/dT$ est donc <strong>positive</strong>, ce qui est le comportement general de la quasi-totalité des corps purs pour la fusion également.</p>

    <h3>4. Le cas particulier (et célèbre) de l'eau</h3>
    <p>L'eau est l'une des rares substances dont la courbe de <strong>fusion</strong> a une pente <strong>négative</strong> dans le diagramme $(P,T)$ — visible sur la représentation ci-dessus si l'on imagine la courbe solide-liquide légèrement inclinée vers la gauche en montant. Cette anomalie s'explique directement par la relation de Clausius-Clapeyron : la glace, dont la structure cristalline hexagonale maintenue par un réseau de liaisons hydrogène est moins dense que l'eau liquide (c'est pourquoi la glace flotte), a un volume molaire <strong>supérieur</strong> à celui du liquide. On a donc $\\\\Delta_{fus}V=V_{m,liquide}-V_{m,solide}<0$ alors que $\\\\Delta_{fus}H>0$ (la fusion reste endothermique) : d'après Clausius-Clapeyron, $dP/dT<0$ le long de la courbe de fusion de l'eau. Conséquence pratique bien connue : augmenter la pression sur de la glace à température fixe, proche de 0°C, peut la faire fondre — un phénomène parfois invoqué (de façon discutée aujourd'hui) pour expliquer en partie le glissement des patins à glace.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi le $CO_2$ supercritique ($T_c=31$°C, $P_c=7{,}4$ MPa) est-il si largement utilisé industriellement, par exemple pour la décaféination du café, alors que l'eau supercritique ($T_c=374$°C) est beaucoup plus rarement employée dans ce type de procédé ?</p>
      <p><strong>Solution :</strong> le point critique du $CO_2$ est accessible avec des conditions de température modérées (juste au-dessus de la température ambiante), atteignables sans risque ni coût énergétique excessif. À l'état supercritique, le $CO_2$ combine un pouvoir solvant proche de celui d'un liquide (utile pour extraire sélectivement des molécules organiques comme la caféine) et une diffusivité proche de celle d'un gaz (extraction rapide et efficace), tout en étant facilement séparé du produit final par simple décompression (retour à l'état gazeux, sans résidu de solvant). L'eau supercritique, à l'inverse, exige des conditions bien plus extrêmes (374°C, 22 MPa), coûteuses en énergie et en contraintes matérielles.</p>
      <p class="example-answer">Réponse : c'est l'accessibilité du point critique (température proche de l'ambiante) qui rend le $CO_2$ supercritique si pratique industriellement, contrairement à l'eau supercritique.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Diagramme $(P,T)$ : trois domaines de phase séparés par des courbes de coexistence, avec point triple (v=0, unique) et point critique (fin de la distinction liquide/gaz)</li>
        <li>Enthalpie de changement d'état $\\\\Delta_{trans}H=Q_P$ : positive dans le sens endothermique (fusion, vaporisation, sublimation)</li>
        <li>Relation de Clausius-Clapeyron : $dP/dT=\\\\Delta_{trans}H/(T\\\\Delta_{trans}V)$ — fixe la pente de chaque courbe de coexistence</li>
        <li>Pente positive dans l'immense majorité des cas (le gaz/liquide occupe plus de volume que le solide/liquide de départ)</li>
        <li>Exception célèbre : la courbe de fusion de l'eau a une pente NÉGATIVE, car la glace est moins dense que l'eau liquide</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que toute substance a une courbe de fusion à pente positive comme l'eau — c'est l'eau qui est l'EXCEPTION, la majorité des corps purs se comportent à l'inverse</li>
        <li>Confondre point triple (trois phases en équilibre, v=0, un point fixe) et point critique (fin de la coexistence liquide-gaz, propriétés du fluide supercritique)</li>
        <li>Oublier que $\\\\Delta_{trans}H$ change de signe selon le sens de la transformation (fusion endothermique $+$, solidification exothermique $-$, mêmes valeurs absolues)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Au point triple d'un corps pur, la variance (règle des phases de Gibbs) vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd7e1" value="right"> 0</label>
          <label class="option"><input type="radio" name="thd7e1" value="wrong"> 1</label>
          <label class="option"><input type="radio" name="thd7e1" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="thd7e1" value="wrong"> 3</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd7e1','thd7fb1','Correct — v=C-φ+2=1-3+2=0 : le point triple d\\\'un corps pur est un point unique et parfaitement fixé, sans aucun degré de liberté.','Applique v=C-φ+2 avec C=1 (corps pur) et φ=3 (solide+liquide+gaz en équilibre).')">Vérifier</button>
        <div class="feedback" id="thd7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La courbe de fusion de l'eau a une pente négative dans le diagramme (P,T). Cela s'explique par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd7e2" value="wrong"> Une enthalpie de fusion négative</label>
          <label class="option"><input type="radio" name="thd7e2" value="right"> Un volume molaire de la glace supérieur à celui de l'eau liquide</label>
          <label class="option"><input type="radio" name="thd7e2" value="wrong"> Une température critique très basse</label>
          <label class="option"><input type="radio" name="thd7e2" value="wrong"> L'absence de point triple pour l'eau</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd7e2','thd7fb2','Correct — la glace, moins dense que l\\\'eau liquide (structure cristalline avec liaisons hydrogène), a un volume molaire supérieur : ΔfusV<0 alors que ΔfusH>0, donc dP/dT<0 d\\\'après Clausius-Clapeyron.','Repense à Clausius-Clapeyron : dP/dT=ΔH/(TΔV). Si ΔH>0 (fusion endothermique) et dP/dT<0, quel doit être le signe de ΔV ?')">Vérifier</button>
        <div class="feedback" id="thd7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Au-delà du point critique d'un corps pur, on ne peut plus distinguer :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd7e3" value="wrong"> Le solide du liquide</label>
          <label class="option"><input type="radio" name="thd7e3" value="right"> Le liquide du gaz</label>
          <label class="option"><input type="radio" name="thd7e3" value="wrong"> Le solide du gaz</label>
          <label class="option"><input type="radio" name="thd7e3" value="wrong"> Les trois phases simultanément</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd7e3','thd7fb3','Correct — le point critique marque la fin de la courbe de coexistence LIQUIDE-GAZ ; au-delà, on parle de fluide supercritique, sans distinction possible entre les deux états.','Le point critique est situé à l\\\'extrémité de la courbe liquide-gaz spécifiquement (pas solide-liquide ni solide-gaz).')">Vérifier</button>
        <div class="feedback" id="thd7fb3"></div>
      </div>
    </div>
  `
};
THD_NOVA_KB[thdKey('Changements d\'état des corps purs et diagrammes de phases')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Changements d'état des corps purs et diagrammes de phases ». Demande-moi la relation de Clausius-Clapeyron, l'anomalie de l'eau, ou un indice sur un exercice.",
  rules: [
    { test:/point triple/i, replies:["Le point triple est le point unique (v=0, d'après Gibbs) où les 3 phases (solide, liquide, gaz) coexistent en équilibre. Celui de l'eau (273,16 K) a longtemps servi de référence pour l'échelle kelvin."] },
    { test:/point critique|fluide supercritique/i, replies:["Le point critique marque la fin de la courbe de coexistence liquide-gaz. Au-delà, on parle de fluide supercritique (ex. CO2 supercritique, Tc=31°C, très utilisé industriellement car facilement accessible)."] },
    { test:/clausius.clapeyron/i, replies:["Relation de Clausius-Clapeyron : dP/dT=ΔtransH/(T·ΔtransV). Elle fixe la pente de chaque courbe de coexistence à partir de l'enthalpie et du volume de changement d'état."] },
    { test:/eau.*anomalie|glace.*dense|pente n[ée]gative/i, replies:["La courbe de fusion de l'eau a une pente négative (cas rare) car la glace est MOINS dense que l'eau liquide : ΔfusV<0 alors que ΔfusH>0, donc dP/dT<0 selon Clausius-Clapeyron."] },
    { test:/chaleur latente|enthalpie.*changement d.[ée]tat/i, replies:["L'enthalpie de changement d'état (chaleur latente) ΔtransH=QP à pression constante : positive dans le sens endothermique (fusion, vaporisation), négative dans le sens exothermique."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique v=C-φ+2 avec C=1, φ=3.","Indice niveau 2 : v=1-3+2.","Indice niveau 3 : v=0."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la densité relative de la glace et de l'eau liquide.","Indice niveau 2 : la glace est moins dense (volume molaire plus grand).","Indice niveau 3 : ΔfusV<0, ce qui donne dP/dT<0."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le point critique est à l'extrémité de quelle courbe de coexistence ?","Indice niveau 2 : celle entre liquide et gaz.","Indice niveau 3 : au-delà, plus de distinction liquide/gaz."] }
  ]
};

/* =========================== CHAPITRE 8 — Transferts thermiques =========================== */
THD_CHAPTERS[thdKey('Transferts thermiques : conduction, convection, rayonnement')] = {
  objectives: [
    "Distinguer les trois modes de transfert thermique : conduction, convection, rayonnement",
    "Énoncer la loi de Fourier et calculer une résistance thermique en régime permanent",
    "Décrire qualitativement la convection et son rôle dans les transferts thermiques usuels",
    "Énoncer la loi de Stefan-Boltzmann et l'appliquer au rayonnement d'un corps noir"
  ],
  prereqs: ["Changements d'état des corps purs et diagrammes de phases"],
  bodyHtml: `
    <p>Ce dernier chapitre s'écarte légèrement de la thermodynamique de l'équilibre pour aborder les <strong>transferts thermiques</strong>, c'est-à-dire la façon dont l'énergie se propage sous forme de chaleur d'une région à une autre, hors équilibre — un sujet essentiel pour l'ingénierie thermique (isolation des bâtiments, dimensionnement d'échangeurs, dissipation de chaleur en électronique...).</p>

    <h3>1. Les trois modes de transfert thermique</h3>
    <table class="mini-table">
      <tr><th>Mode</th><th>Support nécessaire</th><th>Mécanisme</th><th>Exemple</th></tr>
      <tr><td>Conduction</td><td>Milieu matériel (solide, fluide au repos)</td><td>Transfert d'agitation thermique de proche en proche, sans déplacement macroscopique de matière</td><td>Chaleur qui se propage dans une barre métallique</td></tr>
      <tr><td>Convection</td><td>Fluide en mouvement</td><td>Transport de chaleur par le déplacement macroscopique du fluide lui-même</td><td>Radiateur qui chauffe l'air d'une pièce</td></tr>
      <tr><td>Rayonnement</td><td>Aucun (se propage dans le vide)</td><td>Émission et absorption d'ondes électromagnétiques</td><td>Chaleur du Soleil reçue sur Terre</td></tr>
    </table>

    <h3>2. Conduction thermique : la loi de Fourier</h3>
    <p>Établie par Joseph Fourier dans sa <em>Théorie analytique de la chaleur</em> (1822), la loi de Fourier relie le <strong>vecteur densité de flux thermique</strong> $\\\\vec{j}_Q$ (puissance thermique transférée par unité de surface, en $W/m^2$) au gradient local de température :</p>
    <div class="formula-box">$$\\\\vec{j}_Q = -\\\\lambda\\\\,\\\\overrightarrow{grad}\\\\,T$$</div>
    <p>où $\\\\lambda$ est la <strong>conductivité thermique</strong> du matériau ($W\\\\cdot m^{-1}\\\\cdot K^{-1}$), une grandeur intensive caractéristique du matériau (élevée pour les métaux, ex. $\\\\lambda_{Cu}\\\\approx400$, faible pour les isolants, ex. $\\\\lambda_{laine\\\\,de\\\\,verre}\\\\approx0{,}04$). Le signe moins traduit le fait que la chaleur se propage toujours des zones chaudes vers les zones froides, dans le sens opposé au gradient de température — cohérent avec le deuxième principe (chapitre 4).</p>
    <div class="key-point">
      <span class="eyebrow">Résistance thermique en régime permanent</span>
      Pour un mur plan d'épaisseur $e$ et de surface $A$, en régime permanent (température ne dépendant plus du temps), la puissance thermique transférée $\\\\Phi$ entre les deux faces à températures $T_1$ et $T_2$ s'écrit, par analogie directe avec la loi d'Ohm en électricité :
      $$\\\\Phi = \\\\frac{T_1-T_2}{R_{th}} \\\\qquad \\\\text{avec}\\\\quad R_{th}=\\\\frac{e}{\\\\lambda A}$$
      Cette analogie thermique-électrique ($\\\\Phi\\\\leftrightarrow I$, $T\\\\leftrightarrow V$, $R_{th}\\\\leftrightarrow R$) permet de traiter des murs multicouches (isolation d'un bâtiment) exactement comme des résistances en série, en additionnant simplement les résistances thermiques de chaque couche — un outil de calcul essentiel en génie thermique du bâtiment.
    </div>

    <h3>3. Convection</h3>
    <p>La convection combine conduction (à l'échelle microscopique, au contact direct entre le fluide et une paroi) et transport macroscopique de matière par le mouvement du fluide. On distingue la <strong>convection naturelle</strong> (le mouvement du fluide résulte des différences de masse volumique induites par les écarts de température eux-mêmes — l'air chaud, moins dense, monte) de la <strong>convection forcée</strong> (le mouvement du fluide est imposé par un dispositif externe : ventilateur, pompe). On modélise souvent le transfert convectif entre une paroi à température $T_p$ et un fluide à température $T_f$ loin de la paroi par la <strong>loi de Newton</strong> :</p>
    <div class="formula-box">$$\\\\Phi = h\\\\,A\\\\,(T_p-T_f)$$</div>
    <p>où $h$ est le coefficient d'échange convectif ($W\\\\cdot m^{-2}\\\\cdot K^{-1}$), qui dépend fortement de la nature de l'écoulement (laminaire ou turbulent), de la géométrie et de la vitesse du fluide — sa détermination précise relève de la mécanique des fluides et sort du cadre de ce cours.</p>

    <h3>4. Rayonnement thermique et loi de Stefan-Boltzmann</h3>
    <p>Tout corps porté à une température $T>0$ K émet spontanément un rayonnement électromagnétique, dit <strong>rayonnement thermique</strong>, dont l'intensité et la répartition spectrale dépendent de sa température (loi du corps noir de Planck, à l'origine historique de la mécanique quantique). Pour un <strong>corps noir</strong> (absorbeur et émetteur parfait, modèle idéal mais très bien approché par de nombreuses surfaces réelles), la puissance totale rayonnée par unité de surface suit la loi de Stefan-Boltzmann (Josef Stefan, 1879, justifiée théoriquement par Ludwig Boltzmann en 1884) :</p>
    <div class="formula-box">$$\\\\frac{\\\\Phi}{A} = \\\\sigma T^4$$</div>
    <p>où $\\\\sigma\\\\approx5{,}67\\\\times10^{-8}\\\\ W\\\\cdot m^{-2}\\\\cdot K^{-4}$ est la constante de Stefan-Boltzmann. La dépendance en $T^4$ (bien plus rapide que la dépendance linéaire de la conduction ou de la convection) explique pourquoi le rayonnement thermique devient rapidement le mode de transfert dominant aux très hautes températures (four industriel, filament d'ampoule incandescente, surface solaire à ≈5800 K), alors qu'il reste souvent négligeable devant la conduction et la convection aux températures ordinaires du quotidien. Pour une surface réelle, non parfaitement absorbante/émissive, on introduit un facteur d'émissivité $\\\\varepsilon\\\\in[0,1]$ (égal à 1 pour un corps noir parfait) : $\\\\Phi/A=\\\\varepsilon\\\\sigma T^4$.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un mur en briques, d'épaisseur $e=20$ cm, de conductivité thermique $\\\\lambda=0{,}84\\\\ W\\\\cdot m^{-1}\\\\cdot K^{-1}$ et de surface $A=10\\\\ m^2$, sépare l'intérieur d'une maison ($T_1=19$°C) de l'extérieur ($T_2=4$°C). Calculer la puissance thermique perdue à travers ce mur en régime permanent.</p>
      <p><strong>Solution :</strong> $R_{th}=\\\\dfrac{e}{\\\\lambda A}=\\\\dfrac{0{,}20}{0{,}84\\\\times10}=\\\\dfrac{0{,}20}{8{,}4}\\\\approx0{,}0238\\\\ K/W$. La puissance thermique $\\\\Phi=\\\\dfrac{T_1-T_2}{R_{th}}=\\\\dfrac{15}{0{,}0238}\\\\approx630$ W.</p>
      <p class="example-answer">Réponse : $\\\\Phi\\\\approx630$ W — une perte continue non négligeable, comparable à la puissance de plusieurs radiateurs électriques, qui illustre concrètement l'intérêt d'une bonne isolation thermique (un isolant de conductivité bien plus faible réduirait fortement cette perte, à épaisseur égale).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Trois modes de transfert thermique : conduction (milieu matériel, pas de déplacement macroscopique), convection (fluide en mouvement), rayonnement (aucun support nécessaire, ondes EM)</li>
        <li>Loi de Fourier : $\\\\vec{j}_Q=-\\\\lambda\\\\,\\\\overrightarrow{grad}\\\\,T$ ; résistance thermique $R_{th}=e/(\\\\lambda A)$, analogue à la loi d'Ohm</li>
        <li>Convection modélisée par la loi de Newton : $\\\\Phi=hA(T_p-T_f)$</li>
        <li>Rayonnement du corps noir : loi de Stefan-Boltzmann $\\\\Phi/A=\\\\sigma T^4$ (ou $\\\\varepsilon\\\\sigma T^4$ pour une surface réelle) — dépendance en $T^4$, dominante aux très hautes températures</li>
        <li>Les résistances thermiques de couches successives s'additionnent en série, comme des résistances électriques</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que le rayonnement thermique nécessite un milieu matériel — c'est au contraire le SEUL mode de transfert qui se propage dans le vide (ex. rayonnement solaire à travers l'espace)</li>
        <li>Utiliser une température en Celsius dans la loi de Stefan-Boltzmann — comme toujours en thermodynamique, $T$ doit être en kelvins (à cause de la puissance 4, l'erreur est ici particulièrement grave)</li>
        <li>Oublier que $R_{th}$ est INVERSEMENT proportionnelle à $\\\\lambda$ : un BON conducteur thermique (grand $\\\\lambda$, ex. métal) a une PETITE résistance thermique, et inversement pour un isolant</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Quel est le seul mode de transfert thermique capable de se propager dans le vide ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd8e1" value="wrong"> La conduction</label>
          <label class="option"><input type="radio" name="thd8e1" value="wrong"> La convection</label>
          <label class="option"><input type="radio" name="thd8e1" value="right"> Le rayonnement</label>
          <label class="option"><input type="radio" name="thd8e1" value="wrong"> Aucun des trois</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd8e1','thd8fb1','Correct — le rayonnement se propage sous forme d\\\'ondes électromagnétiques, sans besoin d\\\'aucun support matériel : c\\\'est ainsi que la chaleur du Soleil traverse le vide spatial jusqu\\\'à la Terre.','Conduction et convection nécessitent toutes deux un milieu MATÉRIEL. Un seul des trois modes s\\\'en passe.')">Vérifier</button>
        <div class="feedback" id="thd8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un matériau isolant thermique a, par définition, une conductivité $\\\\lambda$ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd8e2" value="right"> Faible, donc une résistance thermique élevée</label>
          <label class="option"><input type="radio" name="thd8e2" value="wrong"> Élevée, donc une résistance thermique élevée</label>
          <label class="option"><input type="radio" name="thd8e2" value="wrong"> Faible, donc une résistance thermique faible</label>
          <label class="option"><input type="radio" name="thd8e2" value="wrong"> Sans lien avec la résistance thermique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd8e2','thd8fb2','Correct — Rth=e/(λA) est INVERSEMENT proportionnelle à λ : un isolant a un λ faible, donc une résistance thermique élevée, ce qui limite bien les pertes de chaleur.','Rth=e/(λA) : λ est au DÉNOMINATEUR. Un petit λ donne donc un grand Rth.')">Vérifier</button>
        <div class="feedback" id="thd8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Si la température absolue d'un corps noir double, sa puissance rayonnée par unité de surface est multipliée par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="thd8e3" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="thd8e3" value="wrong"> 4</label>
          <label class="option"><input type="radio" name="thd8e3" value="right"> 16</label>
          <label class="option"><input type="radio" name="thd8e3" value="wrong"> 8</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('thd8e3','thd8fb3','Correct — Φ/A=σT⁴ : si T double, T⁴ est multiplié par 2⁴=16. C\\\'est cette forte dépendance qui rend le rayonnement dominant à très haute température.','La loi de Stefan-Boltzmann fait intervenir T à la puissance 4, pas 1 ni 2 : que vaut 2⁴ ?')">Vérifier</button>
        <div class="feedback" id="thd8fb3"></div>
      </div>
    </div>
  `
};
THD_NOVA_KB[thdKey('Transferts thermiques : conduction, convection, rayonnement')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Transferts thermiques : conduction, convection, rayonnement », le dernier chapitre du cours de Thermodynamique. Demande-moi la loi de Fourier, la loi de Stefan-Boltzmann, ou un indice sur un exercice.",
  rules: [
    { test:/conduction|fourier|r[ée]sistance thermique/i, replies:["Loi de Fourier : jQ=-λ·grad(T). Résistance thermique Rth=e/(λA), analogue à une résistance électrique — les couches se combinent en série en additionnant les Rth."] },
    { test:/convection/i, replies:["La convection transporte la chaleur par le déplacement macroscopique d'un fluide. Naturelle (différences de densité liées à T) ou forcée (ventilateur, pompe). Modélisée par la loi de Newton : Φ=hA(Tp-Tf)."] },
    { test:/rayonnement|stefan.boltzmann|corps noir/i, replies:["Le rayonnement thermique est le seul mode capable de se propager dans le vide. Loi de Stefan-Boltzmann pour un corps noir : Φ/A=σT⁴ (σ≈5,67×10⁻⁸ W·m⁻²·K⁻⁴). Dépendance en T⁴ : dominant aux très hautes températures."] },
    { test:/[ée]missivit[ée]/i, replies:["Pour une surface réelle (pas un corps noir parfait), on introduit l'émissivité ε∈[0,1] : Φ/A=εσT⁴, avec ε=1 pour un corps noir idéal."] },
    { test:/trois modes|conduction.*convection.*rayonnement/i, replies:["Trois modes : conduction (milieu matériel, pas de déplacement macroscopique), convection (fluide en mouvement), rayonnement (aucun support nécessaire, ondes électromagnétiques)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : lequel des trois modes ne nécessite AUCUN support matériel ?","Indice niveau 2 : conduction et convection en ont besoin, pas ce troisième mode.","Indice niveau 3 : c'est le rayonnement."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : Rth=e/(λA), λ est au dénominateur.","Indice niveau 2 : un petit λ donne donc un grand Rth.","Indice niveau 3 : isolant = λ faible = Rth élevée."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : Φ/A=σT⁴, la puissance 4 est la clé.","Indice niveau 2 : si T double, calcule 2⁴.","Indice niveau 3 : 2⁴=16."] }
  ]
};

/* fusionne le module Thermodynamique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, THD_CHAPTERS);
Object.assign(NOVA_KB, THD_NOVA_KB);