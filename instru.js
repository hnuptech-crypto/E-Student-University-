/* =====================================================================
   CHUNK « instru » — registre INSTRU_CHAPTERS / INSTRU_NOVA_KB
   Matière(s) : Physique|Instrumentations et manipulation de physique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   INSTRU_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */




/* ===================================================================
   MATIÈRE — Instrumentations et manipulation de physique (L1, domaine Physique)
   Structure identique aux autres modules : INSTRU_CHAPTERS / INSTRU_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu : sécurité et méthodologie au laboratoire, instruments de
   mesure électriques (multimètre, oscilloscope), instruments mécaniques
   et optiques (pied à coulisse, banc d'optique), acquisition et
   traitement de données, régression linéaire, rédaction d'un
   compte-rendu de travaux pratiques. Complémentaire du cours
   "Mesures et normes" (théorie des incertitudes), ici axé sur la
   pratique instrumentale.
   IMPORTANT : toute commande LaTeX utilise DEUX backslashes consécutifs
   (convention du site).
=================================================================== */
const INSTRU_MATIERE = 'Instrumentations et manipulation de physique';
function instruKey(chapterTitle){ return `Physique|${INSTRU_MATIERE}|${chapterTitle}`; }
const INSTRU_CHAPTERS = {};
const INSTRU_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur de régression linéaire par moindres carrés (Chapitre 5)
--------------------------------------------------------------------------------- */
function updateInstruReg(){
  const xStr = document.getElementById('instruXvals').value || '';
  const yStr = document.getElementById('instruYvals').value || '';
  const out = document.getElementById('instruRegReadout');
  try{
    const xs = xStr.split(',').map(Number);
    const ys = yStr.split(',').map(Number);
    if(xs.length !== ys.length || xs.length < 2){
      out.innerHTML = 'Entre au moins 2 points, avec le même nombre de valeurs x et y.';
      return;
    }
    const n = xs.length;
    const sumX = xs.reduce((a,b)=>a+b,0);
    const sumY = ys.reduce((a,b)=>a+b,0);
    const sumXY = xs.reduce((a,x,i)=>a+x*ys[i],0);
    const sumX2 = xs.reduce((a,x)=>a+x*x,0);
    const a = (n*sumXY - sumX*sumY) / (n*sumX2 - sumX*sumX);
    const b = (sumY - a*sumX)/n;
    // coefficient de corrélation r
    const meanX = sumX/n, meanY = sumY/n;
    let num=0, denX=0, denY=0;
    for(let i=0;i<n;i++){ num += (xs[i]-meanX)*(ys[i]-meanY); denX += (xs[i]-meanX)**2; denY += (ys[i]-meanY)**2; }
    const r = num/Math.sqrt(denX*denY);
    out.innerHTML =
      `<p>Droite de régression : y = <strong>${a.toFixed(4)}</strong>·x + <strong>${b.toFixed(4)}</strong></p>` +
      `<p>Coefficient de corrélation : r = <strong>${r.toFixed(5)}</strong> (r²=${(r*r).toFixed(5)})</p>` +
      `<p style="margin-top:8px; color:var(--ink-soft); font-size:0.9rem;">Un |r| proche de 1 indique un excellent ajustement linéaire ; on juge généralement la qualité par r², la fraction de variance expliquée par le modèle.</p>`;
  }catch(e){
    out.innerHTML = 'Entrée invalide : utilise des nombres séparés par des virgules.';
  }
}
function initInstruReg(){ updateInstruReg(); }

/* =========================== CHAPITRE 1 =========================== */
INSTRU_CHAPTERS[instruKey("Méthodologie expérimentale et sécurité au laboratoire")] = {
  objectives: [
    "Appliquer la démarche scientifique expérimentale (hypothèse, protocole, mesure, analyse, conclusion)",
    "Identifier les principaux risques d'un laboratoire de physique et les mesures de prévention associées",
    "Lire et interpréter un pictogramme de sécurité et une fiche de données de sécurité (FDS)",
    "Adopter les bonnes pratiques de manipulation du matériel électrique et optique",
    "Évaluer, face à un résultat expérimental inattendu, si l'écart provient d'une erreur de manipulation, d'une limite du modèle théorique, ou d'une source d'incertitude sous-estimée"
  ],
  prereqs: ["Aucun prérequis spécifique — cours d'introduction pratique"],
  bodyHtml: `
    <p>Marie Curie, double lauréate du prix Nobel, passait des heures dans son laboratoire à manipuler des substances radioactives sans connaître pleinement les dangers qu'elle encourait — ses cahiers de laboratoire, encore aujourd'hui conservés dans des boîtes plombées tant ils restent radioactifs plus d'un siècle plus tard, témoignent d'une époque où la sécurité expérimentale n'était pas encore une discipline formalisée. Le chemin parcouru depuis, des accidents de laboratoire du XXe siècle jusqu'aux protocoles de sécurité rigoureux d'aujourd'hui, représente des décennies de leçons apprises, parfois durement, par la communauté scientifique.</p>
    <p>Ce premier chapitre pratique n'est donc pas une simple formalité administrative avant d'entrer en salle de travaux pratiques : c'est l'héritage direct de cette histoire, condensé en règles simples qui te protégeront, toi et le matériel, tout au long de ta formation expérimentale — et bien au-delà, dans n'importe quel laboratoire industriel ou de recherche que tu pourrais fréquenter dans ta future carrière.</p>
    <p>Ce cours pratique complète le cours théorique « Mesures et normes » : il s'agit ici d'acquérir les compétences concrètes indispensables à toute séance de travaux pratiques — méthodologie expérimentale, sécurité, manipulation correcte des instruments. Ce premier chapitre pose les bases indispensables avant toute manipulation en laboratoire. À la fin de ce chapitre, tu sauras conduire une séance de travaux pratiques avec la rigueur méthodologique et les réflexes de sécurité d'un physicien expérimentateur.</p>

    <h3>1. La démarche expérimentale</h3>
    <p>Une séance de travaux pratiques suit généralement une démarche structurée en plusieurs étapes :</p>
    <table class="mini-table">
      <tr><th>Étape</th><th>Contenu</th></tr>
      <tr><td>1. Analyse du problème</td><td>identifier la grandeur à mesurer et la loi physique à vérifier ou à établir</td></tr>
      <tr><td>2. Conception du protocole</td><td>choisir le matériel adapté, prévoir la gamme de mesure, anticiper les sources d'erreur</td></tr>
      <tr><td>3. Réalisation des mesures</td><td>appliquer le protocole avec rigueur, noter systématiquement les conditions expérimentales</td></tr>
      <tr><td>4. Traitement des données</td><td>calculs, graphiques, régression, évaluation des incertitudes (cf. cours « Mesures et normes »)</td></tr>
      <tr><td>5. Analyse critique et conclusion</td><td>comparer le résultat à la valeur attendue, discuter les sources d'écart, proposer des améliorations</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      L'étape d'analyse critique est trop souvent négligée par les étudiants débutants : un résultat expérimental qui s'écarte de la valeur attendue n'est pas un échec, mais une occasion d'identifier et de discuter les sources d'erreur (systématiques et aléatoires, cf. cours « Mesures et normes ») — c'est précisément cette analyse qui distingue une véritable démarche scientifique d'une simple exécution mécanique d'un protocole.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Face à un résultat qui s'écarte nettement de la valeur théorique attendue, trois explications sont généralement possibles : une erreur de manipulation, une source d'incertitude sous-estimée, ou une limite du modèle théorique simplifié utilisé en TP. Quelle démarche méthodique adopterais-tu pour distinguer laquelle de ces trois causes est la plus probable, plutôt que de conclure hâtivement ?
    </div>

    <h3>2. Risques et prévention au laboratoire de physique</h3>
    <table class="mini-table">
      <tr><th>Risque</th><th>Exemples de situations</th><th>Prévention</th></tr>
      <tr><td>Électrique</td><td>contact avec un circuit sous tension, court-circuit</td><td>couper l'alimentation avant tout câblage, vérifier le montage avant mise sous tension, jamais de mains mouillées</td></tr>
      <tr><td>Optique (laser)</td><td>exposition oculaire directe ou réfléchie</td><td>lunettes de protection adaptées à la longueur d'onde, jamais viser le faisceau au niveau des yeux</td></tr>
      <tr><td>Thermique</td><td>brûlure sur une résistance chauffante, un fer à souder</td><td>attendre le refroidissement avant manipulation, utiliser des gants isolants</td></tr>
      <tr><td>Mécanique</td><td>chute de matériel, pincement</td><td>fixation correcte du matériel sur les bancs optiques/mécaniques</td></tr>
    </table>

    <h3>3. Pictogrammes de sécurité et fiches de données de sécurité (FDS)</h3>
    <p>Tout produit chimique ou matériel présentant un danger doit être accompagné d'un étiquetage normalisé (pictogrammes SGH — Système Général Harmonisé) et, pour les substances chimiques, d'une <strong>fiche de données de sécurité</strong> (FDS), document détaillant les dangers, les précautions de manipulation, de stockage et les conduites à tenir en cas d'accident. La consultation de la FDS avant toute manipulation d'un produit inconnu est une règle de sécurité fondamentale, jamais optionnelle.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> avant de mettre sous tension un circuit électrique fraîchement câblé, quelle vérification préalable est-elle indispensable ?</p>
      <p><strong>Solution :</strong> il faut vérifier visuellement l'ensemble du montage (polarités, absence de court-circuit apparent, calibre correct des instruments de mesure insérés dans le circuit) AVANT toute mise sous tension, et idéalement faire valider le montage par l'enseignant encadrant lors des premières séances.</p>
      <p class="example-answer">Réponse : la vérification préalable du câblage, hors tension, est une étape non négociable qui prévient à la fois les risques pour l'expérimentateur et les risques de détérioration du matériel (par exemple, un ampèremètre mal branché en série peut être détruit instantanément).</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un ampèremètre mal branché en parallèle (au lieu de série) peut être détruit instantanément par un court-circuit, alors qu'un voltmètre mal branché en série se contente généralement d'afficher une mesure aberrante sans dommage. Pourquoi ces deux instruments, en apparence similaires, réagissent-ils si différemment à une erreur de branchement ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>La sécurité en laboratoire n'est pas figée dans le temps : les protocoles évoluent constamment à mesure que de nouvelles technologies expérimentales apparaissent. Les laboratoires manipulant des lasers de puissance croissante, des champs magnétiques intenses (IRM de recherche, supraconducteurs) ou des nanomatériaux aux propriétés toxicologiques encore mal caractérisées font l'objet d'une recherche active en santé et sécurité au travail, afin d'anticiper des risques qui n'existaient pas il y a seulement quelques décennies.</p>
    <p><strong>Question ouverte :</strong> comment évaluer rigoureusement les risques toxicologiques de nanomatériaux manipulés en laboratoire, dont les propriétés physico-chimiques (et donc potentiellement les dangers) diffèrent souvent radicalement de celles du même matériau à l'échelle macroscopique ? C'est un domaine de recherche actif en toxicologie et en sécurité des nanotechnologies.</p>
    <p><strong>Technologie émergente :</strong> les jumeaux numériques de laboratoire, qui simulent virtuellement une manipulation avant sa réalisation réelle, permettent aujourd'hui aux étudiants de s'entraîner sans risque à des protocoles dangereux (haute tension, produits toxiques) avant toute manipulation physique effective.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Analyse du problème → protocole → mesures → traitement des données → analyse critique → conclusion, encadrés à chaque étape par une vigilance de sécurité (électrique, optique, thermique, mécanique, chimique)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Rigueur scientifique} = \\text{Méthode} + \\text{Sécurité}$$
      Plus qu'une formule mathématique, ce principe directeur résume l'esprit de tout ce module pratique : une manipulation menée sans méthode rigoureuse produit des résultats douteux, et une manipulation menée sans sécurité met en danger l'expérimentateur lui-même — les deux exigences sont indissociables dans une démarche expérimentale digne de ce nom.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Démarche expérimentale en 5 étapes : analyse du problème, protocole, mesures, traitement des données, analyse critique</li>
        <li>L'analyse critique des écarts (sources d'erreur) est une étape essentielle, pas un aveu d'échec</li>
        <li>Risques principaux : électrique, optique (laser), thermique, mécanique — chacun avec ses règles de prévention spécifiques</li>
        <li>Toujours vérifier un montage électrique hors tension avant la mise sous tension</li>
        <li>Consulter systématiquement la fiche de données de sécurité (FDS) avant de manipuler un produit chimique inconnu</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Mettre un circuit sous tension sans vérification préalable du câblage</li>
        <li>Négliger l'étape d'analyse critique en fin de manipulation, se contentant de rendre un résultat brut sans discussion</li>
        <li>Regarder directement un faisceau laser, même de faible puissance apparente, ou sa réflexion sur une surface brillante</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Avant de mettre sous tension un circuit électrique nouvellement câblé, il faut impérativement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru1e1" value="wrong"> augmenter la tension progressivement sans vérifier</label>
          <label class="option"><input type="radio" name="instru1e1" value="right"> vérifier visuellement le câblage hors tension</label>
          <label class="option"><input type="radio" name="instru1e1" value="wrong"> brancher directement, la vérification se fait après</label>
          <label class="option"><input type="radio" name="instru1e1" value="wrong"> demander à un camarade de tester à sa place</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru1e1','instru1fb1','Correct — la vérification hors tension prévient les risques électriques et évite d endommager le matériel avant même la première mise sous tension.','La sécurité électrique impose toujours une vérification AVANT, jamais après, la mise sous tension.')">Vérifier</button>
        <div class="feedback" id="instru1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un résultat expérimental qui s'écarte de la valeur théorique attendue doit être interprété comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru1e2" value="wrong"> un échec de la manipulation, à cacher</label>
          <label class="option"><input type="radio" name="instru1e2" value="right"> une occasion d'analyser les sources d'erreur</label>
          <label class="option"><input type="radio" name="instru1e2" value="wrong"> une preuve que la théorie est fausse</label>
          <label class="option"><input type="radio" name="instru1e2" value="wrong"> un résultat à ignorer</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru1e2','instru1fb2','Correct — l analyse critique des écarts (erreurs systématiques et aléatoires) est une étape essentielle de la démarche scientifique, pas un aveu d échec.','Cette étape distingue une vraie démarche scientifique d une simple exécution mécanique du protocole.')">Vérifier</button>
        <div class="feedback" id="instru1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Avant de manipuler un produit chimique inconnu, il faut consulter :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru1e3" value="wrong"> uniquement l'étiquette du flacon</label>
          <label class="option"><input type="radio" name="instru1e3" value="right"> la fiche de données de sécurité (FDS)</label>
          <label class="option"><input type="radio" name="instru1e3" value="wrong"> aucun document, l'odeur suffit</label>
          <label class="option"><input type="radio" name="instru1e3" value="wrong"> uniquement un camarade expérimenté</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru1e3','instru1fb3','Correct — la FDS détaille les dangers, précautions de manipulation, de stockage et conduites à tenir en cas d accident : sa consultation est une règle fondamentale, jamais optionnelle.','C est un document normalisé et détaillé, bien plus complet qu une simple étiquette.')">Vérifier</button>
        <div class="feedback" id="instru1fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si aucun protocole de sécurité n'existait en laboratoire de physique, chacun improvisant selon son propre jugement : quelles conséquences concrètes cela aurait-il sur la formation scientifique et la recherche ?</li>
        <li>Pourquoi Marie Curie, malgré son génie scientifique reconnu, n'a-t-elle pas pu se protéger des dangers de la radioactivité qu'elle étudiait — qu'est-ce que cela révèle sur la nature même de la découverte scientifique ?</li>
        <li>Quelle serait la conséquence, pour la formation des futurs ingénieurs et chercheurs, d'un enseignement expérimental qui négligerait systématiquement l'étape d'analyse critique des résultats ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Institut National de Recherche et de Sécurité (INRS), <em>Sécurité dans les laboratoires de recherche et d'enseignement</em>, guide pratique de référence.</li>
        <li>J.-P. Pérez, <em>Mesures physiques : méthodes et incertitudes</em>, Dunod — chapitre sur la méthodologie expérimentale.</li>
        <li>Nations Unies, <em>Système général harmonisé de classification et d'étiquetage des produits chimiques (SGH)</em>, 9e édition révisée, 2021.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais des réflexes méthodologiques et sécuritaires indispensables à toute séance de travaux pratiques. Le chapitre suivant, « Instruments de mesure électriques : multimètre et oscilloscope », va te faire découvrir concrètement les deux outils les plus utilisés de tout laboratoire d'électricité — leurs principes de fonctionnement, et surtout les bonnes pratiques pour les utiliser sans les endommager. Comme le disait Marie Curie elle-même, dont le courage scientifique reste une source d'inspiration malgré les risques qu'elle a affrontés : « Dans la vie, rien n'est à craindre, tout est à comprendre. » Comprendre les risques, précisément, est la meilleure façon de les maîtriser.</p>
  `
};

INSTRU_NOVA_KB[instruKey("Méthodologie expérimentale et sécurité au laboratoire")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Méthodologie expérimentale et sécurité au laboratoire ». Demande-moi les étapes de la démarche expérimentale, les règles de sécurité, ou un indice sur un exercice.",
  rules: [
    { test:/d[ée]marche exp[ée]rimentale|[ée]tapes/i, replies:["La démarche expérimentale suit 5 étapes : analyse du problème, conception du protocole, réalisation des mesures, traitement des données, analyse critique et conclusion."] },
    { test:/analyse critique/i, replies:["L'analyse critique des écarts entre résultat expérimental et valeur attendue est une étape ESSENTIELLE, pas un aveu d'échec : c'est elle qui distingue une vraie démarche scientifique d'une exécution mécanique."] },
    { test:/s[ée]curit[ée]|risque/i, replies:["Les principaux risques au laboratoire de physique sont électrique, optique (laser), thermique et mécanique — chacun avec ses règles de prévention spécifiques."] },
    { test:/fds|fiche de donn[ée]es/i, replies:["La fiche de données de sécurité (FDS) détaille les dangers, précautions de manipulation et de stockage d'un produit chimique : sa consultation est obligatoire avant toute manipulation."] },
    { test:/circuit.*tension|v[ée]rification/i, replies:["Il faut toujours vérifier visuellement un câblage électrique HORS TENSION avant toute mise sous tension, pour prévenir les risques et éviter d'endommager le matériel."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : la vérification doit se faire à un moment précis.","Indice niveau 2 : c'est avant, pas après, la mise sous tension.","Indice niveau 3 : il faut vérifier le câblage hors tension."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : un écart n'est pas forcément un échec.","Indice niveau 2 : c'est l'occasion d'une analyse scientifique.","Indice niveau 3 : c'est une occasion d'analyser les sources d'erreur."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : il existe un document normalisé bien plus complet qu'une étiquette.","Indice niveau 2 : il détaille dangers et précautions.","Indice niveau 3 : c'est la fiche de données de sécurité (FDS)."] }
  ]
};

/* =========================== CHAPITRE 2 =========================== */
INSTRU_CHAPTERS[instruKey("Instruments de mesure électriques : multimètre et oscilloscope")] = {
  objectives: [
    "Utiliser correctement un multimètre pour mesurer une tension, un courant et une résistance",
    "Justifier le mode de branchement du voltmètre (parallèle) et de l'ampèremètre (série)",
    "Lire une trace sur un oscilloscope et en déduire amplitude, période et fréquence d'un signal",
    "Identifier les erreurs de manipulation les plus dangereuses avec ces instruments",
    "Évaluer, avant tout branchement, si un instrument donné (voltmètre, ampèremètre, ohmmètre) est adapté à la grandeur et à la configuration du circuit étudié"
  ],
  prereqs: ["Méthodologie expérimentale et sécurité au laboratoire"],
  bodyHtml: `
    <p>L'oscilloscope moderne, aujourd'hui numérique et compact, descend directement d'un instrument inventé en 1897 par le physicien allemand Karl Ferdinand Braun : le tube cathodique, qui permit pour la première fois de « voir » un signal électrique évoluer dans le temps, plutôt que de se contenter d'en lire une valeur instantanée sur un cadran. Cette invention, qui vaudra à Braun le prix Nobel de physique en 1909, a révolutionné non seulement la physique expérimentale, mais aussi, des décennies plus tard, l'ensemble de l'industrie de la télévision — les mêmes tubes cathodiques ayant longtemps équipé les téléviseurs du monde entier avant l'avènement des écrans plats.</p>
    <p>Aujourd'hui encore, malgré les progrès considérables de l'électronique numérique, le principe fondamental reste identique : transformer un signal électrique invisible en une trajectoire visible, lisible et mesurable. Maîtriser le multimètre et l'oscilloscope, ce n'est pas seulement acquérir une compétence de travaux pratiques : c'est se familiariser avec les deux outils que tu retrouveras, sous une forme ou une autre, dans absolument tout laboratoire d'électronique ou d'électricité, de l'atelier de réparation au centre de recherche le plus avancé.</p>
    <p>Le multimètre et l'oscilloscope sont les deux instruments électriques les plus utilisés en travaux pratiques de physique. Ce chapitre présente leur principe de fonctionnement et les règles impératives de branchement, dont le non-respect peut endommager irrémédiablement l'appareil ou le circuit étudié. À la fin de ce chapitre, tu sauras utiliser ces deux instruments avec assurance, et surtout éviter l'erreur de manipulation la plus fréquente et la plus destructrice en travaux pratiques d'électricité.</p>

    <h3>1. Le multimètre : voltmètre, ampèremètre, ohmmètre</h3>
    <p>Le <strong>multimètre</strong> regroupe en un seul appareil plusieurs fonctions de mesure, sélectionnées par un commutateur : tension continue/alternative (voltmètre), courant continu/alternatif (ampèremètre), résistance (ohmmètre), et souvent d'autres fonctions (continuité, capacité, température).</p>
    <table class="mini-table">
      <tr><th>Grandeur mesurée</th><th>Mode de branchement</th><th>Résistance interne idéale</th></tr>
      <tr><td>Tension (voltmètre)</td><td>en DÉRIVATION (parallèle) aux bornes du dipôle</td><td>infinie (ne doit pas perturber le circuit)</td></tr>
      <tr><td>Courant (ampèremètre)</td><td>en SÉRIE dans la branche du circuit</td><td>nulle (ne doit pas créer de chute de tension supplémentaire)</td></tr>
      <tr><td>Résistance (ohmmètre)</td><td>sur le composant SEUL, hors tension et hors circuit</td><td>—</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi ces branchements précis ?</span>
      Le voltmètre, branché en parallèle, doit avoir une résistance interne très grande pour ne détourner qu'un courant négligeable du circuit étudié (sinon, il fausserait la mesure qu'il est censé effectuer). L'ampèremètre, branché en série, doit au contraire avoir une résistance interne quasi nulle : inséré en parallèle par erreur (branchement dangereux et classique chez les débutants), il court-circuiterait la portion de circuit concernée, provoquant un courant très intense susceptible de détruire l'appareil quasi instantanément.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le voltmètre idéal a une résistance infinie, et l'ampèremètre idéal une résistance nulle — deux valeurs extrêmes, aux antipodes l'une de l'autre. Pourquoi ces valeurs, à première vue paradoxales pour des instruments de mesure, sont-elles justement celles qui minimisent la perturbation de l'instrument sur le circuit qu'il est censé mesurer sans le modifier ?
    </div>

    <h3>2. L'oscilloscope : visualiser un signal temporel</h3>
    <p>L'<strong>oscilloscope</strong> affiche l'évolution temporelle d'une tension électrique, permettant de visualiser directement la forme d'un signal (sinusoïdal, carré, triangulaire...), sa période, son amplitude, ou encore un déphasage entre deux signaux. Deux réglages fondamentaux gouvernent l'affichage :</p>
    <table class="mini-table">
      <tr><th>Réglage</th><th>Rôle</th></tr>
      <tr><td>Base de temps (s/div)</td><td>fixe l'échelle horizontale : durée représentée par chaque division du quadrillage</td></tr>
      <tr><td>Sensibilité verticale (V/div)</td><td>fixe l'échelle verticale : tension représentée par chaque division</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> sur un oscilloscope réglé à 2 ms/div (base de temps) et 5 V/div (sensibilité verticale), un signal sinusoïdal occupe 4 divisions horizontales pour une période complète, et une amplitude crête-à-crête de 3 divisions verticales. Déterminer la période, la fréquence et la tension crête-à-crête du signal.</p>
      <p><strong>Solution :</strong> période $T = 4\\times2\\ \\text{ms} = 8$ ms. Fréquence $f = 1/T = 1/(8\\times10^{-3}) = 125$ Hz. Tension crête-à-crête $U_{cc} = 3\\times5\\ \\text{V} = 15$ V.</p>
      <p class="example-answer">Réponse : $T=8$ ms, $f=125$ Hz, $U_{cc}=15$ V — lecture directe sur l'écran, sans calcul complexe, une fois les réglages de base de temps et de sensibilité connus.</p>
    </div>

    <h3>3. Erreurs de manipulation à éviter absolument</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — l'erreur classique de l'ampèremètre en parallèle</span>
      L'erreur de manipulation la plus fréquente et la plus dangereuse en travaux pratiques d'électricité consiste à brancher un ampèremètre en PARALLÈLE au lieu d'en série : sa très faible résistance interne provoque alors un court-circuit local, avec un courant pouvant dépasser instantanément les capacités de l'appareil (fusible grillé au mieux, appareil détruit au pire). Toujours vérifier le mode de branchement AVANT la mise sous tension (chapitre 1).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un multimètre moderne combine souvent voltmètre, ampèremètre et ohmmètre dans un seul boîtier, avec un simple sélecteur pour changer de fonction. Pourquoi le risque de destruction de l'appareil persiste-t-il malgré tout si l'on choisit le mauvais mode (par exemple, ampèremètre) tout en le laissant branché comme un voltmètre (en parallèle) ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>L'oscilloscope, hérité de Braun, continue d'évoluer : les oscilloscopes numériques haut de gamme actuels atteignent des bandes passantes de plusieurs dizaines de gigahertz, indispensables pour caractériser les signaux ultra-rapides des processeurs modernes ou des liaisons de télécommunication à très haut débit. Les chercheurs en électronique repoussent continuellement ces limites, notamment pour l'étude de phénomènes physiques se déroulant à l'échelle de la femtoseconde, bien au-delà de ce que peut capturer un oscilloscope conventionnel.</p>
    <p><strong>Question ouverte :</strong> comment mesurer fidèlement des signaux électriques évoluant à des échelles de temps si courtes que même la vitesse de propagation du signal dans les câbles de mesure devient un facteur limitant non négligeable ? C'est un défi métrologique actif en électronique de très haute fréquence.</p>
    <p><strong>Technologie émergente :</strong> les oscilloscopes à échantillonnage optique, qui utilisent des impulsions laser ultra-brèves plutôt que des composants purement électroniques, repoussent aujourd'hui les limites de résolution temporelle bien au-delà de ce que l'électronique conventionnelle permet.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Grandeur à mesurer (U, I, R) → choix de l'instrument et du mode de branchement adapté → lecture directe (multimètre) ou graphique (oscilloscope) → vérification systématique avant mise sous tension
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$T = n_{\\text{div,horiz}} \\times (\\text{s/div}) \\quad\\Longrightarrow\\quad f = \\frac{1}{T}$$
      Cette lecture directe sur l'écran de l'oscilloscope, sans calcul complexe, résume la puissance de cet instrument : transformer un signal électrique invisible en une trajectoire lisible, dont on extrait immédiatement période, fréquence et amplitude.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Voltmètre : branchement en DÉRIVATION (parallèle), résistance interne idéalement infinie</li>
        <li>Ampèremètre : branchement en SÉRIE, résistance interne idéalement nulle</li>
        <li>Ohmmètre : mesure sur le composant seul, hors tension et hors circuit</li>
        <li>Oscilloscope : période T=(divisions horizontales)×(s/div), tension=(divisions verticales)×(V/div)</li>
        <li>Erreur classique et dangereuse : brancher l'ampèremètre en parallèle (court-circuit, risque de destruction de l'appareil)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Brancher l'ampèremètre en parallèle au lieu de en série (erreur potentiellement destructrice pour l'appareil)</li>
        <li>Mesurer une résistance à l'aide de l'ohmmètre alors que le composant est encore sous tension ou intégré dans le circuit : résultat faux, voire dangereux pour l'appareil</li>
        <li>Confondre base de temps (échelle horizontale, en s/div) et sensibilité verticale (échelle verticale, en V/div) lors de la lecture d'un oscillogramme</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un voltmètre se branche :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru2e1" value="wrong"> en série dans le circuit</label>
          <label class="option"><input type="radio" name="instru2e1" value="right"> en dérivation (parallèle) aux bornes du dipôle</label>
          <label class="option"><input type="radio" name="instru2e1" value="wrong"> directement sur le secteur</label>
          <label class="option"><input type="radio" name="instru2e1" value="wrong"> uniquement en courant continu</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru2e1','instru2fb1','Correct — le voltmètre se branche en dérivation, avec une résistance interne idéalement infinie pour ne pas perturber le circuit.','Le voltmètre mesure une DIFFÉRENCE de potentiel entre deux points : quel type de branchement cela impose-t-il ?')">Vérifier</button>
        <div class="feedback" id="instru2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Brancher un ampèremètre en parallèle au lieu de en série risque de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru2e2" value="wrong"> donner simplement une mesure fausse, sans danger</label>
          <label class="option"><input type="radio" name="instru2e2" value="right"> provoquer un court-circuit et détruire l'appareil</label>
          <label class="option"><input type="radio" name="instru2e2" value="wrong"> améliorer la précision de la mesure</label>
          <label class="option"><input type="radio" name="instru2e2" value="wrong"> n'avoir aucun effet</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru2e2','instru2fb2','Correct — la très faible résistance interne de l ampèremètre, insérée en parallèle, court-circuite la portion de circuit et peut provoquer un courant destructeur.','La résistance interne de l ampèremètre est quasi nulle : que se passe-t-il si on la place en parallèle sur une tension ?')">Vérifier</button>
        <div class="feedback" id="instru2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Sur un oscilloscope, la base de temps (s/div) règle :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru2e3" value="wrong"> l'échelle verticale</label>
          <label class="option"><input type="radio" name="instru2e3" value="right"> l'échelle horizontale</label>
          <label class="option"><input type="radio" name="instru2e3" value="wrong"> l'amplitude du signal</label>
          <label class="option"><input type="radio" name="instru2e3" value="wrong"> la fréquence d'échantillonnage uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru2e3','instru2fb3','Correct — la base de temps, exprimée en secondes par division, règle l échelle horizontale (le temps représenté par chaque division du quadrillage).','La base de TEMPS règle quelle direction du quadrillage : horizontale ou verticale ?')">Vérifier</button>
        <div class="feedback" id="instru2fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on pouvait fabriquer un ampèremètre de résistance interne rigoureusement nulle et un voltmètre de résistance interne rigoureusement infinie : la mesure deviendrait-elle parfaitement exacte, sans aucune perturbation du circuit ?</li>
        <li>Pourquoi l'invention de Braun (le tube cathodique), conçue à l'origine pour la recherche en physique, a-t-elle connu un tel succès commercial dans l'industrie de la télévision quelques décennies plus tard ?</li>
        <li>Quelle serait la conséquence, pour l'électronique moderne, si l'on ne disposait d'aucun moyen de visualiser directement un signal électrique dans le temps, et qu'il fallait se contenter de valeurs numériques ponctuelles ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>K. F. Braun, « Über ein Verfahren zur Demonstration und zum Studium des zeitlichen Verlaufes variabler Ströme », Annalen der Physik, 1897 — invention originale du tube cathodique.</li>
        <li>J.-P. Pérez, <em>Mesures physiques : méthodes et incertitudes</em>, Dunod — chapitre sur les instruments de mesure électriques.</li>
        <li>Tektronix, <em>XYZs of Oscilloscopes</em>, guide technique de référence en instrumentation électronique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais utiliser en toute sécurité les deux instruments électriques les plus répandus de tout laboratoire de physique. Le chapitre suivant, « Instruments de mesure mécaniques et optiques », va élargir ce savoir-faire à d'autres familles d'instruments tout aussi essentielles en travaux pratiques. Comme le disait Karl Ferdinand Braun lui-même à propos de son invention : rendre visible l'invisible est souvent le premier pas vers sa compréhension véritable. Tu viens de faire ce premier pas, à ton tour.</p>
  `
};

INSTRU_NOVA_KB[instruKey("Instruments de mesure électriques : multimètre et oscilloscope")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Instruments de mesure électriques : multimètre et oscilloscope ». Demande-moi le branchement du voltmètre/ampèremètre, comment lire un oscillogramme, ou un indice sur un exercice.",
  rules: [
    { test:/voltm[èe]tre/i, replies:["Le voltmètre se branche en DÉRIVATION (parallèle) aux bornes du dipôle, avec une résistance interne idéalement infinie pour ne pas perturber le circuit."] },
    { test:/amp[èe]rem[èe]tre/i, replies:["L'ampèremètre se branche en SÉRIE dans la branche du circuit, avec une résistance interne idéalement nulle. Le brancher en parallèle par erreur peut le détruire (court-circuit) !"] },
    { test:/ohmm[èe]tre/i, replies:["L'ohmmètre mesure une résistance sur le composant SEUL, hors tension et hors circuit — jamais sur un composant encore alimenté ou intégré dans un montage."] },
    { test:/base de temps|s\/div/i, replies:["La base de temps (s/div) règle l'échelle HORIZONTALE de l'oscilloscope : la durée représentée par chaque division du quadrillage."] },
    { test:/sensibilit[ée] verticale|v\/div/i, replies:["La sensibilité verticale (V/div) règle l'échelle VERTICALE de l'oscilloscope : la tension représentée par chaque division."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le voltmètre mesure une différence de potentiel entre deux points.","Indice niveau 2 : cela impose un branchement particulier.","Indice niveau 3 : c'est en dérivation (parallèle)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la résistance interne quasi nulle de l'ampèremètre.","Indice niveau 2 : en parallèle, cela crée un court-circuit local.","Indice niveau 3 : cela risque de détruire l'appareil."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : la base de TEMPS règle quelle direction ?","Indice niveau 2 : le temps s'affiche horizontalement.","Indice niveau 3 : c'est l'échelle horizontale."] }
  ]
};

/* =========================== CHAPITRE 3 =========================== */
INSTRU_CHAPTERS[instruKey("Instruments de mesure mécaniques et optiques")] = {
  objectives: [
    "Utiliser un pied à coulisse et un palmer (micromètre) pour mesurer une longueur avec précision",
    "Décrire le principe du vernier et son apport en résolution de mesure",
    "Aligner et utiliser un banc d'optique pour mesurer une distance focale",
    "Choisir l'instrument le mieux adapté à la précision requise pour une mesure de longueur donnée",
    "Analyser pourquoi le principe du vernier, vieux de près de quatre siècles, reste encore aujourd'hui pertinent malgré l'existence d'instruments numériques bien plus précis"
  ],
  prereqs: ["Méthodologie expérimentale et sécurité au laboratoire"],
  bodyHtml: `
    <p>En 1631, le mathématicien français Pierre Vernier publie un traité décrivant un dispositif d'une ingéniosité remarquable : une seconde échelle graduée, mobile, dont le désalignement calculé avec l'échelle principale permet de lire des fractions de graduation impossibles à estimer à l'œil nu. Près de quatre siècles plus tard, ce principe — d'une élégance mathématique presque enfantine une fois comprise — équipe encore aujourd'hui des millions de pieds à coulisse dans les ateliers, laboratoires et usines du monde entier, résistant remarquablement bien à la concurrence des instruments numériques.</p>
    <p>Cette longévité n'a rien d'un hasard : le vernier ne nécessite ni pile, ni électronique, ni calibration complexe — juste une lecture visuelle rigoureuse, robuste même dans des conditions industrielles difficiles (poussière, vibrations, températures extrêmes) où un instrument numérique pourrait tomber en panne. Comprendre ce principe, c'est comprendre une solution élégante à un problème universel de la métrologie : comment gagner en précision sans complexifier démesurément l'instrument.</p>
    <p>Ce chapitre présente les instruments de mesure mécaniques et optiques les plus courants d'un laboratoire de physique de premier cycle, en insistant sur le principe du vernier — astuce ingénieuse permettant de démultiplier la résolution d'une mesure de longueur sans recourir à l'électronique. À la fin de ce chapitre, tu sauras choisir et utiliser l'instrument de mesure de longueur le mieux adapté à chaque situation expérimentale.</p>

    <h3>1. Le pied à coulisse et le principe du vernier</h3>
    <p>Le <strong>pied à coulisse</strong> permet de mesurer une longueur (extérieure, intérieure, ou une profondeur) avec une résolution typique de 0,02 mm, bien meilleure que la simple lecture d'une règle graduée au millimètre. Cette précision est obtenue grâce au <strong>vernier</strong> : une seconde échelle graduée, mobile, dont les graduations sont légèrement resserrées par rapport à l'échelle principale (fixe).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — principe du vernier</span>
      Si le vernier comporte $n$ graduations réparties sur une longueur correspondant à $(n-1)$ graduations de l'échelle principale, la résolution obtenue est $\\dfrac{1}{n}$ de la graduation principale. Pour un vernier à 50 graduations sur une échelle principale au millimètre, la résolution atteint $1/50=0{,}02$ mm : on lit la partie entière sur l'échelle principale (au niveau du zéro du vernier), puis on affine en repérant quelle graduation du vernier s'aligne le mieux avec une graduation de l'échelle principale.
    </div>

    <h3>2. Le palmer (micromètre)</h3>
    <p>Le <strong>palmer</strong>, ou micromètre, atteint une résolution encore supérieure (typiquement 0,01 mm), grâce au principe de la <strong>vis micrométrique</strong> : un tour complet de la vis fait avancer la touche de mesure d'un pas fixe (souvent 0,5 mm), et un tambour gradué (typiquement 50 divisions) permet de repérer une fraction de tour, donc une fraction de ce pas.</p>
    <table class="mini-table">
      <tr><th>Instrument</th><th>Résolution typique</th><th>Usage privilégié</th></tr>
      <tr><td>Règle graduée</td><td>1 mm</td><td>mesures grossières, estimation rapide</td></tr>
      <tr><td>Pied à coulisse (vernier)</td><td>0,02 à 0,05 mm</td><td>dimensions extérieures/intérieures, profondeurs</td></tr>
      <tr><td>Palmer (vis micrométrique)</td><td>0,01 mm</td><td>petites dimensions, épaisseurs, diamètres de fils</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le vernier et la vis micrométrique reposent tous deux sur le même principe général : démultiplier un petit déplacement pour le rendre lisible à l'œil nu, mais par des mécanismes géométriques différents (désalignement de graduations pour l'un, pas de vis pour l'autre). En quoi ces deux approches, bien que différentes, partagent-elles malgré tout une même idée directrice ?
    </div>

    <h3>3. Le banc d'optique et la mesure de distance focale</h3>
    <p>Un <strong>banc d'optique</strong> permet d'aligner sur un même axe une source lumineuse, un objet, une lentille et un écran, pour étudier la formation d'images et mesurer les caractéristiques d'un système optique. La méthode la plus simple pour déterminer la distance focale $f'$ d'une lentille convergente exploite la relation de conjugaison de Descartes (déjà rencontrée en cours d'optique géométrique) :</p>
    <div class="formula-box">$$\\frac{1}{\\overline{OA'}} - \\frac{1}{\\overline{OA}} = \\frac{1}{f'}$$</div>
    <p>en mesurant sur le banc les positions de l'objet, de la lentille et de l'image nette obtenue sur l'écran pour plusieurs positions différentes, puis en exploitant une régression linéaire (chapitre 5) pour en extraire $f'$ avec une meilleure précision qu'une mesure unique.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> avec un pied à coulisse dont le vernier comporte 20 graduations réparties sur 19 mm de l'échelle principale, quelle est la résolution obtenue ?</p>
      <p><strong>Solution :</strong> résolution $= 1$ mm / 20 (nombre de graduations du vernier) $= 0{,}05$ mm.</p>
      <p class="example-answer">Réponse : $0{,}05$ mm — un vernier à 20 graduations est un peu moins précis que le vernier standard à 50 graduations (0,02 mm), mais reste largement supérieur à la simple lecture d'une règle graduée.</p>
    </div>

    <h3>4. Choisir l'instrument adapté</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le choix de l'instrument doit être guidé par la précision réellement nécessaire pour l'expérience, sans excès inutile : utiliser systématiquement le palmer là où une règle graduée suffirait ralentit inutilement la manipulation, tandis qu'utiliser une règle graduée pour mesurer une épaisseur de quelques dixièmes de millimètre serait, à l'inverse, totalement inadapté et produirait une incertitude bien trop grande pour l'exploitation des résultats.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Mesurer la distance focale d'une lentille par la méthode de Descartes exploitée sur un banc d'optique suppose de répéter la mesure pour plusieurs couples position objet/image, puis d'en extraire $f'$ par régression linéaire plutôt que par une seule mesure. En reliant cela au chapitre sur les incertitudes de type A, pourquoi cette approche donne-t-elle un résultat plus fiable qu'une unique mesure, même très soigneusement réalisée ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Le principe du vernier, bien que vieux de près de quatre siècles, continue d'inspirer la métrologie de pointe : les interféromètres laser utilisés dans les détecteurs d'ondes gravitationnelles LIGO et Virgo exploitent, à une échelle de précision inimaginable pour Vernier (mesurer des variations de longueur mille fois plus petites que le diamètre d'un proton), une idée conceptuellement apparentée — comparer deux signaux légèrement désynchronisés pour extraire une information bien plus fine que la résolution de chaque signal pris isolément.</p>
    <p><strong>Question ouverte :</strong> peut-on généraliser le principe du vernier à d'autres domaines de mesure que la longueur — par exemple pour démultiplier la résolution temporelle ou angulaire de nouveaux types de capteurs ? C'est une piste explorée en instrumentation de précision, bien au-delà de son usage historique en mécanique.</p>
    <p><strong>Technologie émergente :</strong> les capteurs de déplacement à effet Vernier optique, qui combinent deux réseaux de diffraction légèrement désaccordés pour mesurer des déplacements nanométriques, transposent aujourd'hui le principe classique du vernier mécanique au monde de la photonique de précision.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Besoin de précision → choix de l'instrument (règle, pied à coulisse, palmer, banc d'optique) → démultiplication de résolution (vernier, vis micrométrique) → mesure adaptée à la précision réellement requise
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Résolution du vernier} = \\frac{\\text{graduation principale}}{n}$$
      Cette formule simple, héritée d'une invention du XVIIe siècle, résume l'idée centrale de tout ce chapitre : la précision d'une mesure ne dépend pas seulement de la finesse des graduations d'un instrument, mais aussi de l'ingéniosité avec laquelle on exploite un désalignement calculé pour lire l'invisible.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Vernier : résolution = (graduation principale)/(nombre de graduations du vernier) — 50 graduations → 0,02 mm</li>
        <li>Palmer (vis micrométrique) : résolution typique 0,01 mm, adapté aux petites dimensions et épaisseurs</li>
        <li>Banc d'optique : mesure de distance focale via la relation de conjugaison de Descartes, affinée par régression linéaire</li>
        <li>Choisir l'instrument selon la précision RÉELLEMENT nécessaire, ni plus ni moins</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Mal aligner le zéro du vernier avec l'échelle principale avant la lecture, faussant systématiquement toute la mesure (erreur de zéro, cf. justesse, cours « Mesures et normes »)</li>
        <li>Forcer excessivement la vis micrométrique du palmer sur l'objet mesuré, risquant de le déformer et de fausser la mesure (utiliser le cliquet limiteur de couple prévu à cet effet)</li>
        <li>Choisir un instrument disproportionné par rapport à la précision réellement requise par l'expérience</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un pied à coulisse dont le vernier comporte 50 graduations a une résolution de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru3e1" value="wrong"> 0,5 mm</label>
          <label class="option"><input type="radio" name="instru3e1" value="wrong"> 0,05 mm</label>
          <label class="option"><input type="radio" name="instru3e1" value="right"> 0,02 mm</label>
          <label class="option"><input type="radio" name="instru3e1" value="wrong"> 2 mm</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru3e1','instru3fb1','Correct — résolution = 1 mm / 50 = 0,02 mm, la résolution standard des pieds à coulisse les plus courants.','Applique la formule : résolution = graduation principale divisée par le nombre de graduations du vernier.')">Vérifier</button>
        <div class="feedback" id="instru3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour mesurer le diamètre d'un fil fin avec la meilleure précision, l'instrument le plus adapté est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru3e2" value="wrong"> une règle graduée</label>
          <label class="option"><input type="radio" name="instru3e2" value="wrong"> un pied à coulisse</label>
          <label class="option"><input type="radio" name="instru3e2" value="right"> un palmer (micromètre)</label>
          <label class="option"><input type="radio" name="instru3e2" value="wrong"> un banc d'optique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru3e2','instru3fb2','Correct — le palmer, avec sa résolution de 0,01 mm, est l instrument le plus précis pour de très petites dimensions comme un diamètre de fil.','Classe les instruments par résolution croissante : lequel est le plus précis pour de très petites dimensions ?')">Vérifier</button>
        <div class="feedback" id="instru3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Sur un palmer, il faut utiliser le cliquet limiteur de couple pour :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru3e3" value="wrong"> augmenter la résolution</label>
          <label class="option"><input type="radio" name="instru3e3" value="right"> éviter de déformer l'objet mesuré en serrant trop fort</label>
          <label class="option"><input type="radio" name="instru3e3" value="wrong"> nettoyer l'instrument</label>
          <label class="option"><input type="radio" name="instru3e3" value="wrong"> changer d'unité de mesure</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru3e3','instru3fb3','Correct — le cliquet limite la force appliquée, évitant de déformer l objet mesuré (ou l instrument lui-même) par un serrage excessif.','Ce mécanisme limite une grandeur mécanique précise : laquelle ?')">Vérifier</button>
        <div class="feedback" id="instru3fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on pouvait fabriquer un vernier avec un nombre de graduations illimité : la résolution obtenue pourrait-elle croître indéfiniment, ou d'autres limites physiques interviendraient-elles ?</li>
        <li>Pourquoi le principe du vernier, purement mécanique et visuel, a-t-il survécu à l'arrivée des instruments numériques, contrairement à tant d'autres technologies mécaniques tombées en désuétude ?</li>
        <li>Quelle serait la conséquence, pour l'industrie manufacturière, si l'on ne disposait d'aucun instrument de mesure de longueur plus précis qu'une règle graduée au millimètre ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>P. Vernier, <em>La construction, l'usage, et les propriétés du quadrant nouveau de mathématique</em>, 1631 — traité original décrivant le principe du vernier.</li>
        <li>J.-P. Pérez, <em>Mesures physiques : méthodes et incertitudes</em>, Dunod — chapitre sur les instruments de mesure mécaniques et optiques.</li>
        <li>LIGO Scientific Collaboration, « Advanced LIGO », Classical and Quantum Gravity, 2015 — description technique de l'instrumentation interférométrique de précision extrême.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais choisir et utiliser l'instrument de mesure de longueur adapté à chaque situation, du pied à coulisse au banc d'optique. Le chapitre suivant, « Acquisition et traitement des données expérimentales », va te montrer comment organiser et exploiter méthodiquement toutes les mesures que tu viens d'apprendre à réaliser. Comme le résumait Pierre Vernier avec la modestie propre aux grands inventeurs pratiques : son dispositif ne visait qu'à rendre lisible ce qui, sans lui, resterait invisible à l'œil nu. Voilà, au fond, la mission de tout instrument de mesure.</p>
  `
};

INSTRU_NOVA_KB[instruKey("Instruments de mesure mécaniques et optiques")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Instruments de mesure mécaniques et optiques ». Demande-moi le principe du vernier, la différence pied à coulisse/palmer, ou un indice sur un exercice.",
  rules: [
    { test:/vernier/i, replies:["Le vernier démultiplie la résolution de mesure : avec n graduations, la résolution vaut (graduation principale)/n. Un vernier à 50 graduations sur une échelle au mm donne une résolution de 0,02 mm."] },
    { test:/palmer|micrométrique|micrometre/i, replies:["Le palmer (micromètre) utilise une vis micrométrique : résolution typique 0,01 mm, adapté aux très petites dimensions (épaisseurs, diamètres de fils)."] },
    { test:/pied [àa] coulisse/i, replies:["Le pied à coulisse, grâce au vernier, atteint une résolution de 0,02 à 0,05 mm — adapté aux dimensions extérieures, intérieures et aux profondeurs."] },
    { test:/banc d'optique|distance focale/i, replies:["Le banc d'optique permet de mesurer la distance focale d'une lentille via la relation de conjugaison de Descartes, en mesurant plusieurs couples position objet/image et en exploitant une régression linéaire."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique la formule résolution=graduation/n.","Indice niveau 2 : ici n=50 graduations.","Indice niveau 3 : la résolution est 0,02 mm."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : classe les instruments par résolution.","Indice niveau 2 : le plus précis est celui utilisant une vis micrométrique.","Indice niveau 3 : c'est le palmer."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : ce mécanisme limite une grandeur mécanique.","Indice niveau 2 : il évite de trop serrer.","Indice niveau 3 : il évite de déformer l'objet mesuré."] }
  ]
};

/* =========================== CHAPITRE 4 =========================== */
INSTRU_CHAPTERS[instruKey("Acquisition et traitement des données expérimentales")] = {
  objectives: [
    "Organiser un tableau de mesures selon les bonnes pratiques (unités, incertitudes, en-têtes clairs)",
    "Identifier et traiter une valeur aberrante dans une série de mesures",
    "Choisir une échelle et un type de représentation graphique adaptés aux données",
    "Utiliser un tableur ou un logiciel d'acquisition pour automatiser le traitement de données répétitives",
    "Évaluer, face à une mesure surprenante, si elle relève d'une erreur ponctuelle à documenter ou d'un phénomène physique réel à approfondir"
  ],
  prereqs: ["Méthodologie expérimentale et sécurité au laboratoire", "Incertitudes de mesure (cours « Mesures et normes »)"],
  bodyHtml: `
    <p>En 2011, la collaboration OPERA (déjà évoquée dans le cours « Mesures et normes ») détecte une valeur aberrante récurrente dans ses mesures de temps de vol de neutrinos — un écart systématique et reproductible, bien au-delà de ce qu'un simple bruit statistique pouvait expliquer. Loin d'écarter cette anomalie sans explication, l'équipe a méthodiquement enquêté pendant des mois, avant de découvrir la véritable cause : un connecteur de fibre optique mal vissé. Cet épisode illustre à la perfection la tension permanente que tout expérimentateur doit apprendre à résoudre : une valeur surprenante est-elle une erreur à corriger, ou un phénomène réel à approfondir ?</p>
    <p>Ce dilemme méthodologique, loin d'être réservé aux grandes collaborations internationales, se pose dès le premier TP de licence : une mesure qui s'écarte nettement des autres mérite toujours d'être examinée avec la même rigueur, sans céder à la tentation de la supprimer simplement parce qu'elle « gêne » le résultat attendu. C'est précisément cette rigueur méthodologique que ce chapitre te propose de systématiser.</p>
    <p>La qualité du traitement des données conditionne directement la qualité de l'exploitation d'une expérience, quelle que soit la précision des mesures elles-mêmes. Ce chapitre présente les bonnes pratiques d'organisation et de traitement des données expérimentales, en vue de leur exploitation graphique (chapitre 5). À la fin de ce chapitre, tu sauras organiser un tableau de données dans les règles de l'art, et traiter rigoureusement toute valeur qui s'écarterait du lot.</p>

    <h3>1. Organisation d'un tableau de mesures</h3>
    <p>Un tableau de mesures bien construit doit systématiquement comporter :</p>
    <table class="mini-table">
      <tr><th>Élément</th><th>Exemple</th></tr>
      <tr><td>En-tête de colonne avec grandeur ET unité</td><td>« Tension U (V) », jamais « U » seul</td></tr>
      <tr><td>Nombre de chiffres significatifs cohérent</td><td>toutes les valeurs d'une même colonne avec la même précision affichée</td></tr>
      <tr><td>Incertitude associée à chaque grandeur</td><td>colonne dédiée, ou notée directement (U ± u(U))</td></tr>
      <tr><td>Conditions expérimentales</td><td>date, température ambiante, référence de l'instrument utilisé si pertinent</td></tr>
    </table>

    <h3>2. Détection et traitement d'une valeur aberrante</h3>
    <p>Une <strong>valeur aberrante</strong> (ou <em>outlier</em>) est une mesure qui s'écarte de façon anormale du reste de la série, généralement due à une erreur ponctuelle de manipulation (mauvaise lecture, parasite électrique, erreur de saisie) plutôt qu'à une fluctuation statistique normale. Un critère statistique simple, bien qu'approximatif, consiste à considérer comme suspecte toute valeur s'écartant de plus de $3s$ (trois écarts-types) de la moyenne des autres mesures.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — ne jamais supprimer une donnée sans justification</span>
      Écarter une valeur aberrante n'est légitime que si l'on peut identifier une cause expérimentale précise (erreur de lecture documentée, parasite identifié sur l'oscilloscope, etc.) — jamais dans le seul but « d'améliorer » artificiellement un résultat pour le rapprocher de la valeur attendue. Cette pratique, si elle n'est pas justifiée et documentée dans le compte-rendu, constitue une faute méthodologique grave (proche de la fraude scientifique dans les cas les plus sérieux).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'histoire des sciences regorge d'exemples où une valeur aberrante, examinée avec rigueur plutôt qu'écartée hâtivement, a mené à une découverte majeure (comme la découverte de la planète Neptune, prédite à partir d'écarts inexpliqués dans l'orbite d'Uranus). À l'inverse, l'affaire OPERA montre qu'une anomalie peut aussi n'être qu'une erreur instrumentale. Comment un physicien peut-il, en pratique, décider s'il vaut la peine d'investir du temps à investiguer une anomalie plutôt que de la considérer comme une simple erreur ?
    </div>

    <h3>3. Choix de la représentation graphique</h3>
    <table class="mini-table">
      <tr><th>Situation</th><th>Représentation recommandée</th></tr>
      <tr><td>Relation attendue linéaire</td><td>tracé direct y en fonction de x, avec droite de régression (chapitre 5)</td></tr>
      <tr><td>Relation en loi de puissance $y=ax^n$</td><td>tracé de $\\ln y$ en fonction de $\\ln x$ (pente = n, ordonnée à l'origine = $\\ln a$)</td></tr>
      <tr><td>Relation exponentielle $y=Ae^{kx}$</td><td>tracé de $\\ln y$ en fonction de $x$ (pente = k)</td></tr>
      <tr><td>Données couvrant plusieurs ordres de grandeur</td><td>échelle logarithmique sur un ou deux axes</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> on soupçonne qu'une grandeur $T$ (période) dépend d'une longueur $\\ell$ selon une loi de puissance $T=a\\ell^n$. Quelle représentation graphique permettrait de déterminer $n$ directement ?</p>
      <p><strong>Solution :</strong> en prenant le logarithme : $\\ln T = \\ln a + n\\ln\\ell$. Le tracé de $\\ln T$ en fonction de $\\ln\\ell$ donne donc une droite, de pente exactement $n$ et d'ordonnée à l'origine $\\ln a$.</p>
      <p class="example-answer">Réponse : un tracé « log-log » ($\\ln T$ vs $\\ln \\ell$) linéarise la loi de puissance, permettant d'extraire $n$ par une simple régression linéaire (chapitre 5), bien plus fiable qu'un ajustement direct d'une courbe non linéaire.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Linéariser une relation non linéaire (log-log, semi-log) avant de tracer un graphique transforme une courbe difficile à ajuster à l'œil en une simple droite. Pourquoi l'œil humain, et plus encore les outils de régression, sont-ils systématiquement bien meilleurs pour ajuster une droite que pour ajuster directement une courbe quelconque ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>Le traitement rigoureux des données expérimentales prend une ampleur inédite à l'ère du « Big Data » scientifique : les expériences modernes de physique des particules génèrent des pétaoctets de données brutes chaque année, et des algorithmes d'intelligence artificielle sont désormais entraînés pour détecter automatiquement d'éventuelles valeurs aberrantes ou anomalies significatives, dans des volumes de données impossibles à examiner manuellement par des humains. Cette automatisation soulève toutefois de nouvelles questions méthodologiques : comment s'assurer qu'un algorithme ne rejette pas, par erreur, une véritable découverte scientifique en la confondant avec du bruit ?</p>
    <p><strong>Question ouverte :</strong> peut-on développer des critères statistiques universels, applicables à tous les domaines expérimentaux, pour distinguer de façon fiable une valeur aberrante d'un signal physique réel mais rare ? C'est un défi méthodologique central de la science des données appliquée à la physique expérimentale.</p>
    <p><strong>Technologie émergente :</strong> les plateformes d'acquisition de données en temps réel, couplées à des algorithmes de détection d'anomalies par apprentissage automatique, permettent aujourd'hui de signaler instantanément une dérive instrumentale ou une mesure suspecte pendant l'expérience elle-même, plutôt que lors du traitement a posteriori.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Mesures brutes → tableau organisé (grandeur, unité, incertitude) → détection de valeurs aberrantes (documentée, jamais arbitraire) → linéarisation si nécessaire (log-log, semi-log) → graphique exploitable
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\ln y = \\ln a + n\\ln x \\quad (\\text{pour } y = a x^n)$$
      Cette transformation logarithmique, en apparence un simple artifice mathématique, résume la stratégie centrale de tout traitement de données expérimentales : ramener une relation complexe et non linéaire à une simple droite, exploitable par régression linéaire au chapitre suivant.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un tableau de mesures doit toujours indiquer grandeur, unité, incertitude et conditions expérimentales</li>
        <li>Une valeur aberrante ne peut être écartée que si une cause expérimentale précise est identifiée et documentée</li>
        <li>Linéariser une relation non linéaire (log-log pour une loi de puissance, semi-log pour une exponentielle) facilite grandement son exploitation par régression linéaire</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Écarter une valeur aberrante sans justification, dans le seul but d'améliorer artificiellement le résultat — pratique méthodologiquement inacceptable</li>
        <li>Omettre l'unité dans l'en-tête d'une colonne de données, source d'ambiguïté et d'erreurs ultérieures</li>
        <li>Tenter d'ajuster directement une courbe non linéaire à l'œil, alors qu'une linéarisation (log-log, semi-log) permettrait une régression linéaire beaucoup plus fiable</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Écarter une mesure jugée aberrante n'est légitime que si :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru4e1" value="wrong"> elle s'écarte trop de la valeur attendue</label>
          <label class="option"><input type="radio" name="instru4e1" value="right"> une cause expérimentale précise est identifiée et documentée</label>
          <label class="option"><input type="radio" name="instru4e1" value="wrong"> elle est la première mesure de la série</label>
          <label class="option"><input type="radio" name="instru4e1" value="wrong"> le résultat final semble ainsi plus beau</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru4e1','instru4fb1','Correct — écarter une donnée sans cause identifiée et documentée est une faute méthodologique, quelle que soit la tentation d améliorer artificiellement le résultat.','Le simple fait qu une valeur s écarte de la théorie n est jamais, à lui seul, une raison suffisante.')">Vérifier</button>
        <div class="feedback" id="instru4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour une loi de puissance T=a·ℓⁿ, le tracé qui permet de déterminer n directement (comme pente) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru4e2" value="wrong"> T en fonction de ℓ</label>
          <label class="option"><input type="radio" name="instru4e2" value="right"> ln T en fonction de ln ℓ</label>
          <label class="option"><input type="radio" name="instru4e2" value="wrong"> T en fonction de ln ℓ</label>
          <label class="option"><input type="radio" name="instru4e2" value="wrong"> ln T en fonction de ℓ</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru4e2','instru4fb2','Correct — le tracé log-log linéarise la loi de puissance : ln T = ln a + n ln ℓ, une droite de pente n.','Prends le logarithme des deux membres de T=a·ℓⁿ : quelle relation linéaire en résulte-t-il ?')">Vérifier</button>
        <div class="feedback" id="instru4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'en-tête d'une colonne de données doit obligatoirement comporter :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru4e3" value="wrong"> uniquement le symbole de la grandeur</label>
          <label class="option"><input type="radio" name="instru4e3" value="right"> la grandeur ET son unité</label>
          <label class="option"><input type="radio" name="instru4e3" value="wrong"> uniquement l'unité</label>
          <label class="option"><input type="radio" name="instru4e3" value="wrong"> le nom de l'expérimentateur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru4e3','instru4fb3','Correct — grandeur ET unité doivent toujours figurer ensemble, pour éviter toute ambiguïté (cf. cours Mesures et normes : une valeur sans unité n a pas de sens).','Repense au cours Mesures et normes : une valeur numérique seule a-t-elle un sens physique ?')">Vérifier</button>
        <div class="feedback" id="instru4fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Le Verrier, à l'origine de la prédiction de Neptune, avait écarté l'anomalie de l'orbite d'Uranus comme une simple erreur de mesure : combien de temps la découverte de cette planète aurait-elle pu être retardée ?</li>
        <li>Pourquoi la tentation d'écarter une valeur aberrante « gênante » est-elle particulièrement forte lorsqu'un étudiant a une idée préconçue du résultat qu'il devrait obtenir ?</li>
        <li>Quelle serait la conséquence, pour la fiabilité de la recherche scientifique, si les algorithmes de détection automatique d'anomalies remplaçaient entièrement le jugement critique des chercheurs ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J.-P. Pérez, <em>Mesures physiques : méthodes et incertitudes</em>, Dunod — chapitre sur le traitement des données expérimentales.</li>
        <li>OPERA Collaboration, « Measurement of the Neutrino Velocity with the OPERA Detector in the CNGS Beam » (et erratum), Journal of High Energy Physics, 2012 — exemple emblématique d'investigation rigoureuse d'une anomalie de mesure.</li>
        <li>U. J. Le Verrier, « Recherches sur les mouvements d'Uranus », Comptes Rendus de l'Académie des Sciences, 1846 — prédiction de Neptune à partir d'écarts inexpliqués dans une orbite planétaire.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais organiser et traiter rigoureusement des données expérimentales, y compris lorsqu'elles réservent des surprises. Le chapitre suivant, « Régression linéaire et exploitation graphique des mesures », va te donner les outils mathématiques précis pour extraire, à partir d'un nuage de points, la loi physique qui s'y cache — la suite logique et indispensable de tout ce que tu viens d'apprendre. Comme le rappelait l'affaire OPERA à l'ensemble de la communauté scientifique : une anomalie mérite toujours d'être comprise avant d'être jugée, qu'elle se révèle finalement être une simple erreur ou une découverte majeure.</p>
  `
};

INSTRU_NOVA_KB[instruKey("Acquisition et traitement des données expérimentales")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Acquisition et traitement des données expérimentales ». Demande-moi comment traiter une valeur aberrante, comment linéariser une loi de puissance, ou un indice sur un exercice.",
  rules: [
    { test:/valeur aberrante|outlier/i, replies:["Une valeur aberrante ne peut être écartée que si une cause expérimentale précise est identifiée et documentée — jamais seulement parce qu'elle s'écarte de la valeur attendue."] },
    { test:/log.?log|loi de puissance/i, replies:["Pour une loi de puissance y=ax^n, le tracé de ln y en fonction de ln x donne une droite de pente n et d'ordonnée à l'origine ln a — c'est la linéarisation log-log."] },
    { test:/semi.?log|exponentielle/i, replies:["Pour une relation exponentielle y=Ae^(kx), le tracé de ln y en fonction de x (semi-log) donne une droite de pente k."] },
    { test:/en.?t[êe]te|unit[ée].*colonne/i, replies:["L'en-tête d'une colonne de données doit toujours indiquer la grandeur ET son unité, jamais l'un sans l'autre — cohérent avec le principe qu'une valeur sans unité n'a pas de sens physique."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : un simple écart à la théorie ne suffit jamais.","Indice niveau 2 : il faut une cause expérimentale identifiable.","Indice niveau 3 : elle doit être documentée."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : prends le logarithme de T=a·ℓⁿ.","Indice niveau 2 : cela donne ln T = ln a + n ln ℓ.","Indice niveau 3 : c'est le tracé ln T en fonction de ln ℓ."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : repense au cours Mesures et normes.","Indice niveau 2 : une valeur seule, sans unité, n'a pas de sens.","Indice niveau 3 : il faut la grandeur ET l'unité."] }
  ]
};

/* =========================== CHAPITRE 5 =========================== */
INSTRU_CHAPTERS[instruKey("Régression linéaire et exploitation graphique des mesures")] = {
  objectives: [
    "Construire la droite de régression linéaire par la méthode des moindres carrés",
    "Interpréter le coefficient de corrélation r et le coefficient de détermination r²",
    "Extraire une grandeur physique (pente, ordonnée à l'origine) et son incertitude à partir d'une régression",
    "Tracer et interpréter les barres d'incertitude sur un graphique expérimental",
    "Évaluer, face à un excellent coefficient de corrélation, si cela suffit à valider le modèle physique choisi ou seulement la qualité de l'ajustement statistique"
  ],
  prereqs: ["Acquisition et traitement des données expérimentales", "Méthode des moindres carrés (cours « Méthodes numériques »)"],
  bodyHtml: `
    <p>En 1805, le mathématicien français Adrien-Marie Legendre publie la première description formelle de la méthode des moindres carrés — un outil qu'il développe pour résoudre un problème d'astronomie de position, avant que Carl Friedrich Gauss ne revendique, non sans une controverse de priorité restée célèbre, l'avoir utilisée dès 1795 pour prédire la trajectoire de l'astéroïde Cérès à partir de mesures fragmentaires et bruitées. Cette rivalité historique n'enlève rien à l'importance de la méthode elle-même : deux siècles plus tard, elle reste l'outil statistique le plus utilisé dans absolument tous les domaines scientifiques et techniques pour extraire une loi fiable à partir de données expérimentales imparfaites.</p>
    <p>Chaque graphique que tu traceras en travaux pratiques, chaque droite ajustée sur un nuage de points expérimentaux, mobilise directement cette méthode vieille de plus de deux siècles. Loin d'être une simple formalité de fin de manipulation, c'est elle qui te permettra d'extraire, à partir de mesures individuellement imparfaites, une grandeur physique dont la précision dépasse largement celle de chaque point pris isolément.</p>
    <p>La régression linéaire, déjà introduite d'un point de vue numérique dans le cours « Méthodes numériques », est l'outil d'exploitation graphique le plus utilisé en travaux pratiques de physique : elle permet d'extraire une grandeur physique (pente ou ordonnée à l'origine d'une droite) à partir d'une série de mesures, avec une précision bien supérieure à celle d'une mesure isolée. À la fin de ce chapitre, tu sauras extraire n'importe quelle grandeur physique d'un nuage de points expérimentaux, et juger rigoureusement la qualité de cette extraction.</p>

    <h3>1. Principe de la régression linéaire</h3>
    <p>Pour un ensemble de $n$ points expérimentaux $(x_i,y_i)$ censés suivre une relation linéaire $y=ax+b$, la méthode des <strong>moindres carrés</strong> détermine les coefficients $a$ (pente) et $b$ (ordonnée à l'origine) qui minimisent la somme des carrés des écarts verticaux entre les points mesurés et la droite modèle :</p>
    <div class="formula-box">$$a = \\frac{n\\sum x_iy_i - \\sum x_i \\sum y_i}{n\\sum x_i^2 - (\\sum x_i)^2}, \\qquad b = \\bar{y} - a\\bar{x}$$</div>

    <h3>2. Coefficient de corrélation et qualité de l'ajustement</h3>
    <p>Le <strong>coefficient de corrélation</strong> $r$ (compris entre $-1$ et $1$) mesure la force de la relation linéaire entre $x$ et $y$ :</p>
    <table class="mini-table">
      <tr><th>Valeur de |r|</th><th>Qualité de l'ajustement linéaire</th></tr>
      <tr><td>|r| proche de 1</td><td>excellente corrélation linéaire (r²≈1 : la quasi-totalité de la variation de y est expliquée par x)</td></tr>
      <tr><td>|r| entre 0,7 et 0,9</td><td>corrélation modérée à bonne, dispersion notable autour de la droite</td></tr>
      <tr><td>|r| proche de 0</td><td>absence de relation linéaire (la relation, si elle existe, n'est pas linéaire, ou les données sont trop bruitées)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — r² comme fraction de variance expliquée</span>
      Le <strong>coefficient de détermination</strong> $r^2$ s'interprète comme la fraction de la variance totale de $y$ « expliquée » par la relation linéaire avec $x$ : $r^2=0{,}98$ signifie que 98 % de la dispersion observée sur $y$ est attribuable à sa dépendance linéaire en $x$, les 2 % restants provenant du bruit expérimental ou d'écarts au modèle linéaire.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le célèbre « quartet d'Anscombe », construit par le statisticien Francis Anscombe en 1973, regroupe quatre jeux de données radicalement différents visuellement (l'un vraiment linéaire, un autre clairement courbe, un troisième perturbé par un point aberrant) mais partageant exactement le même coefficient de corrélation r. Qu'est-ce que cet exemple historique révèle sur le danger de se fier uniquement à la valeur numérique de r sans jamais regarder le graphique lui-même ?
    </div>

    <h3>3. Extraction d'une grandeur physique et de son incertitude</h3>
    <p>Dans une expérience typique, la grandeur physique recherchée est directement la pente $a$ (ou parfois l'ordonnée à l'origine $b$) de la droite de régression. La plupart des logiciels de traitement de données (tableur, logiciels dédiés) fournissent directement l'incertitude-type sur $a$ et $b$, calculée à partir de la dispersion résiduelle des points autour de la droite ajustée.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour vérifier la loi d'Ohm $U=RI$, on trace $U$ (V) en fonction de $I$ (A) pour un dipôle résistif. La régression donne une pente $a = 100{,}3 \\pm 0{,}8$ (unités SI), et une ordonnée à l'origine compatible avec zéro. Interpréter ce résultat.</p>
      <p><strong>Solution :</strong> la pente $a$ de la droite $U=aI+b$ correspond directement à la résistance $R$ du dipôle, en ohms. L'ordonnée à l'origine compatible avec zéro confirme la loi d'Ohm (proportionnalité stricte, sans terme constant parasite).</p>
      <p class="example-answer">Réponse : $R = 100{,}3 \\pm 0{,}8\\ \\Omega$ — un résultat bien plus précis (incertitude relative $\\approx0{,}8\\%$) qu'une mesure isolée au multimètre, grâce à l'exploitation de plusieurs points expérimentaux par régression.</p>
    </div>

    <h3>4. Barres d'incertitude sur un graphique</h3>
    <p>Un graphique expérimental rigoureux doit représenter, pour chaque point, une <strong>barre d'incertitude</strong> (verticale pour $u(y)$, horizontale pour $u(x)$ si elle est significative), dont la taille reflète l'incertitude de mesure de chaque coordonnée. Une droite de régression physiquement acceptable doit passer, pour la grande majorité des points, à l'intérieur (ou très près) de ces barres d'incertitude — un moyen visuel rapide de juger la cohérence globale entre le modèle et les données.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une droite de régression qui passe systématiquement en dehors des barres d'incertitude de la plupart des points, malgré un coefficient r très proche de 1, peut malgré tout signaler un problème. Comment expliques-tu qu'un excellent ajustement statistique (r proche de 1) puisse coexister avec une incompatibilité visuelle entre la droite et les barres d'incertitude individuelles des points ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La méthode des moindres carrés, ancienne de deux siècles, reste un pilier de la science des données moderne : les algorithmes d'apprentissage automatique les plus utilisés aujourd'hui (régression linéaire, mais aussi de nombreux réseaux de neurones) reposent, à leur cœur, sur une généralisation de ce même principe de minimisation d'une somme de carrés d'écarts. La découverte des ondes gravitationnelles par LIGO en 2015 a elle-même nécessité des techniques d'ajustement statistique sophistiquées, héritées directement des principes que Gauss et Legendre ont posés au tout début du XIXe siècle.</p>
    <p><strong>Question ouverte :</strong> comment étendre rigoureusement la méthode des moindres carrés lorsque les incertitudes sur x ET sur y sont toutes deux significatives (régression dite « orthogonale » ou « totale »), un cas plus complexe que la régression classique qui ne tient compte que de l'incertitude sur y ? C'est un sujet actif de recherche en statistique appliquée à la physique expérimentale.</p>
    <p><strong>Technologie émergente :</strong> les logiciels de traitement de données scientifiques de nouvelle génération intègrent désormais des méthodes de régression bayésienne, qui combinent les données expérimentales avec des connaissances physiques préalables pour affiner encore la précision et la fiabilité des grandeurs extraites.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Nuage de points expérimentaux → méthode des moindres carrés → droite y=ax+b → coefficient r (qualité de l'ajustement linéaire) → pente/ordonnée = grandeur physique recherchée, avec incertitude
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$a = \\frac{n\\sum x_iy_i - \\sum x_i \\sum y_i}{n\\sum x_i^2 - (\\sum x_i)^2}$$
      Cette formule, héritée de Gauss et Legendre il y a plus de deux siècles, transforme un nuage de points expérimentaux dispersés en une grandeur physique unique et précise — l'aboutissement méthodologique de tout le travail de mesure, de traitement et d'analyse critique accompli tout au long de ce module.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Régression par moindres carrés : minimise la somme des écarts au carré entre points mesurés et droite modèle</li>
        <li>r (coefficient de corrélation) proche de 1 en valeur absolue = excellente corrélation linéaire</li>
        <li>r² = fraction de la variance de y expliquée par la relation linéaire avec x</li>
        <li>La régression sur plusieurs points donne une grandeur physique (pente) bien plus précise qu'une mesure isolée</li>
        <li>Les barres d'incertitude sur un graphique permettent de juger visuellement la cohérence entre modèle et données</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre r (coefficient de corrélation, entre −1 et 1) et r² (coefficient de détermination, entre 0 et 1)</li>
        <li>Croire qu'un r très proche de 1 valide automatiquement le MODÈLE physique choisi : il valide seulement la qualité de l'ajustement LINÉAIRE, pas la pertinence du modèle sous-jacent</li>
        <li>Oublier de tracer les barres d'incertitude sur un graphique expérimental, rendant impossible toute évaluation visuelle de la cohérence modèle/données</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — régression linéaire par moindres carrés</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre des valeurs x et y séparées par des virgules pour calculer la droite de régression et le coefficient de corrélation.</p>
      <div class="sim-controls">
        <label>x : <input type="text" id="instruXvals" value="1,2,3,4,5" style="width:150px;" oninput="updateInstruReg()"></label><br>
        <label>y : <input type="text" id="instruYvals" value="2.1,4.0,6.2,7.9,10.1" style="width:150px;" oninput="updateInstruReg()"></label>
        <div class="sim-readout" id="instruRegReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un coefficient de corrélation r=0,995 indique :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru5e1" value="wrong"> une absence de relation entre x et y</label>
          <label class="option"><input type="radio" name="instru5e1" value="right"> une excellente corrélation linéaire</label>
          <label class="option"><input type="radio" name="instru5e1" value="wrong"> une erreur de calcul</label>
          <label class="option"><input type="radio" name="instru5e1" value="wrong"> que le modèle physique est nécessairement correct</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru5e1','instru5fb1','Correct — un |r| très proche de 1 indique un excellent ajustement linéaire aux données, la quasi-totalité de la dispersion de y étant expliquée par sa relation linéaire avec x.','r proche de 1 en valeur absolue traduit quel type d ajustement ?')">Vérifier</button>
        <div class="feedback" id="instru5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour la loi d'Ohm U=RI, la résistance R s'obtient, par régression de U en fonction de I, comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru5e2" value="wrong"> l'ordonnée à l'origine</label>
          <label class="option"><input type="radio" name="instru5e2" value="right"> la pente de la droite</label>
          <label class="option"><input type="radio" name="instru5e2" value="wrong"> le coefficient de corrélation r</label>
          <label class="option"><input type="radio" name="instru5e2" value="wrong"> aucune de ces réponses</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru5e2','instru5fb2','Correct — dans U=RI, R joue le rôle de la pente a de la droite U=aI+b (avec b nul en théorie).','Identifie U=RI à la forme y=ax+b : quel coefficient correspond à R ?')">Vérifier</button>
        <div class="feedback" id="instru5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un r² proche de 1 garantit-il que le modèle physique choisi est correct ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru5e3" value="wrong"> oui, toujours</label>
          <label class="option"><input type="radio" name="instru5e3" value="right"> non, il garantit seulement un bon ajustement linéaire</label>
          <label class="option"><input type="radio" name="instru5e3" value="wrong"> oui, mais seulement si r=1 exactement</label>
          <label class="option"><input type="radio" name="instru5e3" value="wrong"> non, r² ne veut rien dire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru5e3','instru5fb3','Correct — un excellent ajustement linéaire ne valide que la qualité statistique de la régression, pas la pertinence physique du modèle sous-jacent (d autres modèles pourraient parfois ajuster tout aussi bien les mêmes données).','r² mesure la qualité de l ajustement LINÉAIRE : cela suffit-il à garantir la validité du modèle physique ?')">Vérifier</button>
        <div class="feedback" id="instru5fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on disposait d'un nombre illimité de points expérimentaux : l'incertitude sur la pente de régression pourrait-elle être réduite indéfiniment, jusqu'à devenir nulle ?</li>
        <li>Pourquoi le quartet d'Anscombe, malgré des données visuellement si différentes, partage-t-il exactement le même coefficient de corrélation — qu'est-ce que cela révèle sur les limites d'un résumé purement numérique d'un jeu de données ?</li>
        <li>Quelle serait la conséquence, pour la fiabilité de la recherche scientifique, si les chercheurs se contentaient systématiquement de vérifier un coefficient r sans jamais examiner visuellement leur graphique ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>A.-M. Legendre, <em>Nouvelles méthodes pour la détermination des orbites des comètes</em>, 1805 — première publication formelle de la méthode des moindres carrés.</li>
        <li>J.-P. Pérez, <em>Mesures physiques : méthodes et incertitudes</em>, Dunod — chapitre sur la régression linéaire et l'exploitation graphique.</li>
        <li>F. J. Anscombe, « Graphs in Statistical Analysis », The American Statistician, 1973 — article fondateur illustrant les limites d'un résumé statistique sans visualisation graphique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais de l'outil qui transforme un nuage de points expérimentaux dispersés en une grandeur physique fiable et précise — la compétence technique la plus utilisée de tout ce module pratique. Le dernier chapitre, « Rédaction d'un compte-rendu de travaux pratiques », va rassembler tout ce que tu as appris — méthodologie, instruments, traitement des données, régression — dans le document final qui communique tes résultats. Comme le rappelait Gauss lui-même, dont la modestie légendaire contrastait avec son génie : « Il vaut mieux laisser dormir un problème que de le résoudre imparfaitement. » Ta régression, elle, ne dort jamais imparfaitement : elle est désormais rigoureusement quantifiée.</p>
  `,
  init: initInstruReg
};

INSTRU_NOVA_KB[instruKey("Régression linéaire et exploitation graphique des mesures")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Régression linéaire et exploitation graphique des mesures ». Demande-moi la différence r et r², comment extraire une grandeur physique d'une régression, ou un indice sur un exercice.",
  rules: [
    { test:/coefficient de corr[ée]lation|\br\b/i, replies:["Le coefficient de corrélation r (entre −1 et 1) mesure la force de la relation linéaire entre x et y. |r| proche de 1 indique un excellent ajustement linéaire."] },
    { test:/r\u00b2|coefficient de d[ée]termination/i, replies:["r² s'interprète comme la fraction de la variance de y expliquée par la relation linéaire avec x : r²=0,98 signifie que 98% de la dispersion de y est due à sa dépendance en x."] },
    { test:/moindres carr[ée]s|droite de r[ée]gression/i, replies:["La régression par moindres carrés détermine la pente a et l'ordonnée à l'origine b qui minimisent la somme des écarts au carré entre points mesurés et droite modèle."] },
    { test:/barres d'incertitude/i, replies:["Les barres d'incertitude (verticales pour u(y), horizontales pour u(x)) permettent de juger visuellement si la droite de régression est cohérente avec la précision des mesures."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : r proche de 1 en valeur absolue signifie quoi ?","Indice niveau 2 : cela traduit un bon ajustement.","Indice niveau 3 : c'est une excellente corrélation linéaire."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : identifie U=RI à y=ax+b.","Indice niveau 2 : R correspond au coefficient devant I.","Indice niveau 3 : c'est la pente de la droite."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : r² mesure seulement la qualité de l'ajustement linéaire.","Indice niveau 2 : cela ne dit rien sur la pertinence du modèle physique lui-même.","Indice niveau 3 : non, il ne garantit que la qualité de l'ajustement."] }
  ]
};

/* =========================== CHAPITRE 6 =========================== */
INSTRU_CHAPTERS[instruKey("Rédaction d'un compte-rendu de travaux pratiques")] = {
  objectives: [
    "Structurer un compte-rendu de travaux pratiques selon les sections attendues",
    "Présenter des résultats numériques avec la rigueur requise (unités, incertitudes, chiffres significatifs)",
    "Rédiger une discussion critique pertinente, distincte d'une simple présentation des résultats",
    "Citer correctement les sources et éviter le plagiat dans un rapport scientifique",
    "Analyser pourquoi la section « discussion » est aujourd'hui considérée comme le cœur intellectuel d'un compte-rendu, bien plus révélateur de la compréhension d'un étudiant que la simple exactitude numérique de ses résultats"
  ],
  prereqs: ["Régression linéaire et exploitation graphique des mesures"],
  bodyHtml: `
    <p>Les <em>Philosophical Transactions of the Royal Society</em>, fondées à Londres en 1665, constituent la plus ancienne revue scientifique encore publiée au monde — et déjà, dans ses tout premiers numéros, les auteurs s'efforçaient de structurer leurs comptes-rendus expérimentaux selon une logique reconnaissable : ce qu'on cherchait à savoir, comment on s'y est pris, ce qu'on a observé, et ce que cela signifie. Cette structure, affinée sur plus de trois siècles et demi de pratique scientifique, est très exactement celle que ce dernier chapitre te propose de maîtriser.</p>
    <p>Le compte-rendu de travaux pratiques n'est donc pas une contrainte administrative arbitraire imposée par ton enseignant : c'est ta première expérience concrète de la communication scientifique telle qu'elle se pratique, sous une forme ou une autre, dans absolument toutes les revues et tous les laboratoires du monde depuis trois siècles et demi. Savoir rédiger une discussion critique pertinente aujourd'hui, c'est te préparer directement à rédiger un rapport de stage, un mémoire, ou un jour peut-être un article scientifique.</p>
    <p>Ce dernier chapitre clôt le cours en abordant la restitution écrite du travail expérimental : le <strong>compte-rendu de travaux pratiques</strong>, exercice de communication scientifique à part entière, qui mobilise l'ensemble des compétences développées dans les chapitres précédents. À la fin de ce chapitre — et de ce module — tu sauras rédiger un compte-rendu qui ne se contente pas de présenter des résultats, mais qui témoigne d'une véritable compréhension scientifique de ton travail expérimental.</p>

    <h3>1. Structure attendue d'un compte-rendu</h3>
    <table class="mini-table">
      <tr><th>Section</th><th>Contenu attendu</th></tr>
      <tr><td>Introduction / Objectif</td><td>problématique de l'expérience, grandeur(s) à déterminer, loi physique étudiée</td></tr>
      <tr><td>Matériel et protocole</td><td>liste du matériel utilisé, description synthétique de la méthode expérimentale</td></tr>
      <tr><td>Résultats</td><td>tableaux de mesures, graphiques, calculs, avec incertitudes systématiquement indiquées</td></tr>
      <tr><td>Discussion</td><td>analyse critique : comparaison à la valeur attendue, sources d'erreur identifiées, cohérence des incertitudes</td></tr>
      <tr><td>Conclusion</td><td>synthèse du résultat obtenu, réponse à la problématique initiale, ouvertures possibles</td></tr>
    </table>

    <h3>2. Rigueur dans la présentation des résultats numériques</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — cohérence entre valeur et incertitude</span>
      Tout résultat numérique doit systématiquement être présenté sous la forme normalisée $x = \\bar{x} \\pm u(x)$ [unité] (chapitre « Incertitudes », cours « Mesures et normes »), avec un nombre de chiffres significatifs cohérent entre la valeur et son incertitude. Écrire « $R = 100{,}347\\ \\Omega \\pm 0{,}8\\ \\Omega$ » est incorrect : la précision affichée sur la valeur (5 chiffres après la virgule) est totalement incompatible avec une incertitude de 0,8 Ω ; il faut écrire $R = 100{,}3 \\pm 0{,}8\\ \\Omega$.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Ce même module a commencé, six chapitres plus tôt, par la définition du système international d'unités. Comment vois-tu, à présent, le lien direct entre cette exigence de cohérence des chiffres significatifs dans un compte-rendu et les toutes premières notions du module « Mesures et normes » ?
    </div>

    <h3>3. Une véritable discussion critique, pas une simple présentation</h3>
    <p>La section « discussion » est souvent la plus faible des comptes-rendus d'étudiants débutants, réduite à une simple reformulation des résultats déjà présentés. Une discussion pertinente doit au contraire :</p>
    <div class="example-box">
      <p><strong>1. Comparer</strong> le résultat obtenu à une valeur de référence (théorique ou tabulée), en vérifiant si l'écart est compatible avec l'incertitude annoncée (l'écart est-il inférieur à $2u(x)$ ou $3u(x)$, ou significativement plus grand ?).</p>
      <p><strong>2. Identifier</strong> les sources d'erreur les plus probables, en distinguant systématique et aléatoire, et en hiérarchisant leur contribution probable (cf. propagation des incertitudes).</p>
      <p><strong>3. Proposer</strong>, lorsque c'est pertinent, une amélioration concrète du protocole qui permettrait de réduire l'incertitude finale ou de corriger un biais identifié.</p>
    </div>

    <h3>4. Citation des sources et intégrité scientifique</h3>
    <p>Toute donnée, formule ou valeur de référence empruntée à une source externe (livre, cours, site internet) doit être <strong>citée</strong> explicitement. Reproduire, sans attribution, le travail d'un autre étudiant ou un texte trouvé en ligne constitue un plagiat, faute grave en milieu académique, indépendamment de son caractère volontaire ou non.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'essor des outils d'intelligence artificielle générative pose de nouvelles questions à la communauté académique concernant la rédaction de comptes-rendus. Pourquoi la compréhension personnelle de la démarche expérimentale — et non la qualité littéraire du texte final — reste-t-elle, selon toi, l'objectif pédagogique fondamental d'un compte-rendu de travaux pratiques ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La structure du compte-rendu scientifique que tu viens d'apprendre à maîtriser continue d'évoluer : le mouvement de la science ouverte (« open science ») pousse aujourd'hui les chercheurs à publier, en plus de leur article final, l'intégralité de leurs données brutes et de leur code de traitement, permettant à d'autres équipes de reproduire indépendamment leurs résultats — une exigence de transparence directement héritée de la rigueur méthodologique que tu pratiques depuis ton premier compte-rendu de TP. Cette évolution répond en partie à ce qu'on appelle la « crise de la réplication », qui a révélé qu'un nombre significatif de résultats publiés dans certains domaines scientifiques ne pouvaient pas être reproduits par d'autres équipes.</p>
    <p><strong>Question ouverte :</strong> comment concilier l'exigence croissante de transparence totale (partage de toutes les données et de tout le code) avec les contraintes pratiques de temps et de ressources des chercheurs, en particulier dans les disciplines où les jeux de données sont considérables ? C'est un débat méthodologique actif dans de nombreuses communautés scientifiques.</p>
    <p><strong>Technologie émergente :</strong> les cahiers de laboratoire électroniques (ELN, Electronic Lab Notebooks), qui horodatent et archivent automatiquement chaque mesure et chaque étape de traitement, se généralisent dans les laboratoires de recherche pour garantir une traçabilité complète, bien au-delà de ce que permettait un simple cahier papier.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Expérience réalisée → structure (introduction, protocole, résultats, discussion, conclusion) → rigueur numérique (valeur ± incertitude) → discussion critique (comparaison, sources d'erreur, améliorations) → intégrité scientifique (citations)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Compte-rendu rigoureux} = \\text{Structure} + \\text{Rigueur numérique} + \\text{Esprit critique}$$
      Cette « équation », davantage conceptuelle que mathématique, résume l'esprit de tout ce module pratique : un résultat expérimental, aussi précis soit-il, ne vaut véritablement que s'il est communiqué avec la même rigueur que celle qui a présidé à sa mesure.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Structure : Introduction/Objectif → Matériel et protocole → Résultats → Discussion → Conclusion</li>
        <li>Tout résultat s'exprime sous forme x=x̄±u(x) [unité], avec cohérence des chiffres significatifs entre valeur et incertitude</li>
        <li>La discussion doit comparer à une référence, identifier les sources d'erreur, et proposer des améliorations — pas seulement reformuler les résultats</li>
        <li>Toute source externe doit être citée explicitement ; le plagiat est une faute grave, intentionnel ou non</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Réduire la section « discussion » à une simple reformulation des résultats déjà présentés dans le compte-rendu</li>
        <li>Afficher une valeur avec plus de chiffres significatifs que ne le permet la précision de son incertitude</li>
        <li>Reproduire un texte ou des données d'une source externe sans citation, même de façon non intentionnelle</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La section « discussion » d'un compte-rendu doit principalement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru6e1" value="wrong"> reformuler les résultats déjà présentés</label>
          <label class="option"><input type="radio" name="instru6e1" value="right"> analyser les écarts et proposer des améliorations du protocole</label>
          <label class="option"><input type="radio" name="instru6e1" value="wrong"> lister le matériel utilisé</label>
          <label class="option"><input type="radio" name="instru6e1" value="wrong"> uniquement conclure sans analyse</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru6e1','instru6fb1','Correct — une véritable discussion compare le résultat à une référence, identifie les sources d erreur et propose des améliorations concrètes, au-delà d une simple reformulation.','La discussion doit apporter une VALEUR AJOUTÉE par rapport aux résultats déjà présentés.')">Vérifier</button>
        <div class="feedback" id="instru6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Écrire R=100,347±0,8 Ω est incorrect car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru6e2" value="wrong"> la valeur est trop petite</label>
          <label class="option"><input type="radio" name="instru6e2" value="right"> le nombre de décimales de la valeur est incohérent avec l'incertitude</label>
          <label class="option"><input type="radio" name="instru6e2" value="wrong"> l'unité est manquante</label>
          <label class="option"><input type="radio" name="instru6e2" value="wrong"> ce n'est pas incorrect</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru6e2','instru6fb2','Correct — avec une incertitude de 0,8, seule la première décimale a un sens ; les décimales suivantes de la valeur (347) sont illusoires.','L incertitude fixe la précision réellement significative de la valeur : combien de décimales sont donc pertinentes ici ?')">Vérifier</button>
        <div class="feedback" id="instru6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Reproduire, sans citation, un texte trouvé sur internet dans un compte-rendu constitue :</p>
        <div class="options">
          <label class="option"><input type="radio" name="instru6e3" value="wrong"> une pratique normale et acceptée</label>
          <label class="option"><input type="radio" name="instru6e3" value="right"> un plagiat, faute grave en milieu académique</label>
          <label class="option"><input type="radio" name="instru6e3" value="wrong"> une erreur mineure sans conséquence</label>
          <label class="option"><input type="radio" name="instru6e3" value="wrong"> une bonne pratique de synthèse</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('instru6e3','instru6fb3','Correct — reproduire un texte sans attribution est un plagiat, faute grave indépendamment de son caractère volontaire ou non.','Toute source externe doit être explicitement citée : que se passe-t-il si ce n est pas fait ?')">Vérifier</button>
        <div class="feedback" id="instru6fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si tous les comptes-rendus scientifiques du monde étaient rédigés sans jamais discuter les sources d'erreur ni comparer les résultats à une référence : la science progresserait-elle aussi rapidement qu'aujourd'hui ?</li>
        <li>Pourquoi la structure d'un compte-rendu scientifique moderne ressemble-t-elle encore, dans ses grandes lignes, à celle des tout premiers articles publiés par la Royal Society au XVIIe siècle ?</li>
        <li>Quelle serait la conséquence, pour la confiance du public envers la recherche scientifique, d'une généralisation de la « crise de la réplication » à l'ensemble des disciplines scientifiques ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Royal Society of London, <em>Philosophical Transactions</em>, premiers numéros, 1665 — origine historique de la structure du rapport scientifique moderne.</li>
        <li>J.-P. Pérez, <em>Mesures physiques : méthodes et incertitudes</em>, Dunod — chapitre sur la rédaction du compte-rendu expérimental.</li>
        <li>Open Science Collaboration, « Estimating the Reproducibility of Psychological Science », Science, 2015 — étude de référence sur la crise de la réplication en science.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Te voici arrivé au terme de ce module « Instrumentations et manipulation de physique » — et avec lui, au terme de l'intégralité de la Physique de première année : de la mécanique du point jusqu'à la rédaction rigoureuse d'un compte-rendu, en passant par l'électromagnétisme, l'optique et la métrologie. Tu disposes désormais non seulement des connaissances théoriques, mais aussi des réflexes pratiques et de l'esprit critique d'un véritable physicien expérimentateur. Comme le rappelait la devise de la Royal Society elle-même, fondatrice de la communication scientifique moderne : « Nullius in verba » — ne rien prendre pour argent comptant, sur la seule parole d'autrui, sans l'avoir soi-même vérifié par l'expérience. Tu viens d'apprendre, très concrètement, ce que signifie cette exigence.</p>
  `
};

INSTRU_NOVA_KB[instruKey("Rédaction d'un compte-rendu de travaux pratiques")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Rédaction d'un compte-rendu de travaux pratiques ». Demande-moi la structure attendue, comment rédiger une bonne discussion, ou un indice sur un exercice.",
  rules: [
    { test:/structure|sections/i, replies:["La structure attendue : Introduction/Objectif → Matériel et protocole → Résultats → Discussion → Conclusion."] },
    { test:/discussion/i, replies:["Une bonne discussion compare le résultat à une référence, identifie les sources d'erreur (systématiques/aléatoires), et propose des améliorations concrètes du protocole — pas une simple reformulation des résultats."] },
    { test:/chiffres significatifs.*rapport|coh[ée]rence.*incertitude/i, replies:["Le nombre de décimales affichées sur une valeur doit être cohérent avec son incertitude : R=100,347±0,8 Ω est incorrect, il faut écrire R=100,3±0,8 Ω."] },
    { test:/plagiat|citation/i, replies:["Toute source externe (livre, cours, internet) doit être citée explicitement. Reproduire un texte sans attribution est un plagiat, faute grave en milieu académique."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : la discussion doit apporter une valeur ajoutée.","Indice niveau 2 : elle va au-delà d'une simple reformulation.","Indice niveau 3 : elle analyse les écarts et propose des améliorations."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : l'incertitude fixe la précision réellement significative.","Indice niveau 2 : avec 0,8 comme incertitude, une seule décimale a du sens.","Indice niveau 3 : le nombre de décimales de la valeur est incohérent avec l'incertitude."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : toute source externe doit être citée.","Indice niveau 2 : sans citation, c'est une faute grave.","Indice niveau 3 : c'est un plagiat."] }
  ]
};

/* fusionne le module Instrumentations et manipulation de physique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, INSTRU_CHAPTERS);
Object.assign(NOVA_KB, INSTRU_NOVA_KB);