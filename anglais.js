/* =====================================================================
   CHUNK « anglais » — registre ANGLAIS_CHAPTERS / ANGLAIS_NOVA_KB
   Matière(s) : Autres|Anglais scientifique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   ANGLAIS_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */

/* =========================================================================
   MATIÈRE — ANGLAIS SCIENTIFIQUE
   Contenu construit à partir du support "English for Science & Technology"
   (compréhension écrite, grammaire, rédaction professionnelle).
========================================================================= */
const ANGLAIS_MATIERE = 'Anglais scientifique';
function angKey(chapterTitle){ return `Autres|${ANGLAIS_MATIERE}|${chapterTitle}`; }

const ANGLAIS_CHAPTERS = {};
const ANGLAIS_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
ANGLAIS_CHAPTERS[angKey('Lecture rapide et compréhension de texte technique')] = {
  objectives: [
    "Distinguer le skimming (lecture survol) et le scanning (lecture ciblée)",
    "Identifier les quatre types de questions de compréhension",
    "Appliquer une méthode de lecture rapide à un texte scientifique en anglais",
    "Évaluer en quoi l'intuition d'Evelyn Wood — adapter sa vitesse de lecture à l'objectif recherché plutôt que de tout lire uniformément mot à mot — reste, plus d'un demi-siècle plus tard, la clé d'une lecture efficace de textes scientifiques en langue étrangère"
  ],
  prereqs: ["Aucun — premier chapitre"],
  bodyHtml: `
    <p>Dans les années 1950, l'enseignante américaine Evelyn Wood développa une méthode de lecture rapide qui allait connaître un succès phénoménal : son cours « Reading Dynamics », suivi selon la légende par le président John F. Kennedy lui-même, popularisa l'idée que la vitesse de lecture pouvait être considérablement augmentée sans perte de compréhension, à condition d'adapter sa technique à l'objectif de lecture — exactement la distinction entre skimming et scanning que tu vas étudier dans ce chapitre.</p>
    <p>Cette intuition d'Evelyn Wood, aujourd'hui confirmée en partie par la recherche en psychologie cognitive, repose sur un principe simple mais souvent négligé par les lecteurs novices en langue étrangère : lire un texte scientifique en anglais mot à mot, comme on apprend à le faire au tout début de son apprentissage, devient rapidement un obstacle plutôt qu'une aide, dès lors que le volume de textes à traiter augmente — en recherche comme dans la vie professionnelle.</p>
    <p>En anglais scientifique, on lit rarement un article intégralement mot à mot : on adapte sa vitesse de lecture à l'objectif. Deux techniques de <strong>lecture rapide</strong> (rapid reading) permettent de gagner du temps sans perdre l'information utile. À la fin de ce chapitre, tu sauras choisir la bonne technique de lecture selon ton objectif, et répondre méthodiquement aux quatre grands types de questions de compréhension.</p>

    <h3>1. Skimming vs Scanning</h3>
    <table class="mini-table">
      <tr><th>Technique</th><th>Objectif</th><th>Quand l'utiliser</th></tr>
      <tr><td><strong>Skimming</strong></td><td>Saisir l'idée générale (the gist), le thème, le plan du texte</td><td>Avant une lecture approfondie, pour savoir si le texte est pertinent</td></tr>
      <tr><td><strong>Scanning</strong></td><td>Trouver une information précise (une date, un chiffre, un nom)</td><td>Quand on a déjà une question précise en tête</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      En <em>skimming</em>, on repère surtout les mots-clés de chaque phrase, les titres et le premier/dernier paragraphe. En <em>scanning</em>, l'œil « balaye » le texte sans le lire en entier, à la recherche d'un mot ou d'un chiffre précis — le reste du texte est ignoré.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      En scanning, l'œil ignore délibérément la quasi-totalité du texte pour ne se concentrer que sur l'information recherchée. Pourquoi cette stratégie, qui semble « rater » volontairement presque tout le contenu, est-elle malgré tout plus efficace qu'une lecture intégrale lorsque l'objectif est de trouver une seule information précise ?
    </div>

    <h3>2. Les quatre types de questions de compréhension</h3>
    <p>Un texte de compréhension écrite (reading comprehension) en anglais scientifique est presque toujours suivi de quatre grandes familles de questions :</p>
    <div class="example-box">
      <span class="eyebrow">Les quatre types</span>
      <p><strong>Factual questions</strong> — la réponse est écrite noir sur blanc dans le texte (un fait, un exemple, un détail).</p>
      <p><strong>Inference questions</strong> — la réponse n'est pas donnée directement : il faut déduire une conclusion à partir d'indices du texte. Ce sont les plus difficiles.</p>
      <p><strong>Main theme questions</strong> — elles demandent l'idée générale ou l'objectif principal du texte, pas un détail isolé.</p>
      <p class="example-answer">Style / tone questions — elles portent sur l'attitude de l'auteur (ton neutre, critique, alarmiste...) révélée par le choix des mots.</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une question d'inférence n'a, par définition, aucune réponse écrite mot pour mot dans le texte — il faut la construire à partir d'indices. Pourquoi ce type de question est-il souvent perçu comme le plus difficile, alors même qu'il ne demande pas de connaissance supplémentaire par rapport au texte, seulement un raisonnement à partir de ce qui y est dit ?
    </div>

    <h3>3. Méthode pour un texte scientifique</h3>
    <p>Face à un article technique en anglais (ex. : un texte sur l'ozone, une norme industrielle, un mode d'emploi), la méthode conseillée est :</p>
    <table class="mini-table">
      <tr><th>Étape</th><th>Action</th></tr>
      <tr><td>1</td><td>Skim le texte entier une première fois (titre, premier paragraphe, mots en gras)</td></tr>
      <tr><td>2</td><td>Lire les questions <em>avant</em> de relire le texte en détail</td></tr>
      <tr><td>3</td><td>Scan le texte pour localiser la zone contenant chaque réponse</td></tr>
      <tr><td>4</td><td>Relire précisément cette zone pour confirmer ou déduire la réponse</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple appliqué</span>
      <p><strong>Extrait :</strong> "Ozone, a molecule made up of three atoms of oxygen, comprises a layer of the atmosphere that absorbs harmful ultraviolet radiation from the sun."</p>
      <p><strong>Question factuelle :</strong> What is ozone made of? → Réponse directe : three atoms of oxygen.</p>
      <p class="example-answer">Question d'inférence : Pourquoi la destruction de l'ozone est-elle dangereuse ? → Il faut déduire : sans cette couche, les rayons UV nocifs ne seraient plus absorbés.</p>
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>Les promesses spectaculaires de la méthode Evelyn Wood (parfois plus de 1000 mots par minute) ont depuis été largement nuancées par la recherche scientifique moderne : une synthèse influente publiée en 2016 dans la revue Psychological Science in the Public Interest a montré que la vitesse de lecture et la compréhension sont structurellement liées par un compromis (trade-off) — au-delà d'un certain seuil, lire plus vite se fait presque toujours au prix d'une compréhension moindre, contredisant les affirmations les plus ambitieuses de la lecture rapide. Le skimming et le scanning restent néanmoins des techniques légitimes et efficaces, non pas parce qu'elles augmentent miraculeusement la vitesse de lecture globale, mais parce qu'elles évitent stratégiquement de lire ce qui n'est pas nécessaire à l'objectif poursuivi.</p>
    <p><strong>Question ouverte :</strong> si la vitesse de lecture et la compréhension sont réellement en compromis, comment expliquer que des lecteurs expérimentés parviennent malgré tout à traiter efficacement de très grands volumes de textes scientifiques dans leur domaine d'expertise ?</p>
    <p><strong>Technologie émergente :</strong> les outils de <strong>résumé automatique et d'extraction d'information par intelligence artificielle</strong> permettent aujourd'hui de pré-filtrer de très grands volumes de littérature scientifique, orientant le lecteur humain directement vers les passages les plus pertinents pour son objectif précis — une automatisation partielle du travail de scanning que ce chapitre t'enseigne à faire manuellement.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Texte scientifique en anglais → skimming (idée générale, titre, premier/dernier paragraphe) → lecture des questions → scanning (repérage de la zone contenant chaque réponse) → relecture précise → identification du type de question (factual, inference, main theme, style/tone) → réponse adaptée
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Technique de lecture} = f(\\text{objectif recherché})$$
      Ce principe, hérité de l'intuition d'Evelyn Wood, résume l'esprit de tout ce chapitre : il n'existe pas une seule « bonne » façon de lire un texte scientifique, mais une technique adaptée à chaque objectif précis — comprendre l'ensemble (skimming), trouver un détail (scanning), ou répondre à un type de question donné.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Evelyn Wood n'avait jamais popularisé sa méthode de lecture rapide dans les années 1950 : les techniques de skimming et de scanning seraient-elles enseignées aujourd'hui sous une forme différente ?</li>
        <li>Pourquoi lire les questions avant de relire un texte en détail (étape 2 de la méthode) rend-il la recherche d'information nettement plus efficace que de lire le texte en entier avant de découvrir les questions ?</li>
        <li>Quelle serait la conséquence, pour un chercheur devant traiter des centaines d'articles scientifiques, d'une incapacité à distinguer quand utiliser le skimming plutôt que le scanning ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>E. Wood, méthode « Reading Dynamics », années 1950-1960 — la méthode fondatrice de la lecture rapide moderne.</li>
        <li>K. Rayner et al., « So Much to Read, So Little Time: How Do We Read, and Can Speed Reading Help? », Psychological Science in the Public Interest, 2016 — la synthèse scientifique nuançant les promesses de la lecture rapide.</li>
        <li>D. Nunan, <em>Practical English Language Teaching: Reading</em>, McGraw-Hill — référence pédagogique sur les stratégies de lecture en langue étrangère.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais choisir la bonne technique de lecture selon ton objectif, et répondre méthodiquement aux quatre grands types de questions de compréhension. Le chapitre suivant, « Les parties du discours (Parts of Speech) », posera les briques grammaticales de base indispensables pour comprendre, phrase par phrase, les textes scientifiques que tu apprendras à survoler efficacement. Comme le rappelle la nuance apportée par la recherche moderne à la méthode d'Evelyn Wood : la meilleure technique de lecture n'est jamais la plus rapide dans l'absolu, mais celle la mieux adaptée à ce que tu cherches réellement à en tirer.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Skimming = lecture globale pour saisir l'idée générale ; scanning = lecture ciblée pour trouver une info précise</li>
        <li>Quatre types de questions : factual, inference, main theme, style/tone</li>
        <li>Les questions d'inférence demandent de déduire, jamais de recopier une phrase du texte</li>
        <li>Méthode : skim → lire les questions → scan → relire précisément la zone concernée</li>
      </ul>
      <p class="recap-note">Vérifie ces acquis avec les exercices ci-dessous.</p>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Lire tout le texte mot à mot avant même de regarder les questions — c'est une perte de temps en examen</li>
        <li>Confondre une question factuelle (réponse écrite) et une question d'inférence (réponse déduite)</li>
        <li>Répondre à une question de style/tone par un fait du texte au lieu d'analyser le choix des mots</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Tu dois retrouver rapidement l'année de construction d'un pont dans un article de trois pages. Quelle technique utilises-tu ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an1e1" value="wrong"> Le skimming</label>
          <label class="option"><input type="radio" name="an1e1" value="right"> Le scanning</label>
          <label class="option"><input type="radio" name="an1e1" value="wrong"> Une lecture intégrale mot à mot</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an1e1','an1fb1','Correct — chercher une donnée précise (une date) dans un long texte, c\\'est du scanning.','Tu cherches une information ponctuelle et précise, pas le sens général du texte.')">Vérifier</button>
        <div class="feedback" id="an1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">« Why does the author seem worried about ozone depletion? » Quel type de question est-ce ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an1e2" value="wrong"> Factual question</label>
          <label class="option"><input type="radio" name="an1e2" value="wrong"> Main theme question</label>
          <label class="option"><input type="radio" name="an1e2" value="right"> Style / tone question</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an1e2','an1fb2','Correct — la question porte sur l\\'attitude de l\\'auteur (\\'worried\\'), donc sur le ton.','Le mot \\'seem worried\\' renvoie à une attitude, pas à un fait chiffré ni à l\\'idée générale.')">Vérifier</button>
        <div class="feedback" id="an1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Quelle est la première étape recommandée face à un nouveau texte scientifique en anglais ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an1e3" value="right"> Skim le texte entier une première fois</label>
          <label class="option"><input type="radio" name="an1e3" value="wrong"> Traduire chaque mot inconnu</label>
          <label class="option"><input type="radio" name="an1e3" value="wrong"> Répondre directement aux questions au hasard</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an1e3','an1fb3','Correct — on commence toujours par une vue d\\'ensemble avant d\\'entrer dans le détail.','Revois la méthode en quatre étapes du cours : que fait-on avant même de lire les questions ?')">Vérifier</button>
        <div class="feedback" id="an1fb3"></div>
      </div>
    </div>
  `
};

ANGLAIS_NOVA_KB[angKey('Lecture rapide et compréhension de texte technique')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Lecture rapide et compréhension de texte technique ». Demande-moi la différence entre skimming et scanning, un type de question, ou un indice sur un exercice.",
  rules: [
    { test:/skimming|survol/i, replies:["Le skimming, c'est une lecture rapide et globale pour saisir l'idée générale d'un texte, sans en lire chaque mot."] },
    { test:/scanning|balay/i, replies:["Le scanning, c'est chercher une information précise (date, chiffre, nom) en balayant le texte, sans le lire dans le détail."] },
    { test:/factual/i, replies:["Une factual question a sa réponse écrite directement dans le texte : il suffit de la repérer, pas de la déduire."] },
    { test:/inference|d[ée]duire/i, replies:["Une inference question demande de déduire une conclusion à partir d'indices du texte : la réponse n'y est jamais écrite mot pour mot."] },
    { test:/main theme|th[èe]me/i, replies:["Une main theme question porte sur l'idée générale ou l'objectif du texte entier, pas sur un détail isolé."] },
    { test:/tone|style|ton/i, replies:["Une style/tone question porte sur l'attitude de l'auteur, révélée par le choix des mots (neutre, critique, inquiet...)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : demande-toi si tu cherches un sens global ou une info ponctuelle.","Indice niveau 2 : une date précise est une information ponctuelle.","Indice niveau 3 : c'est du scanning."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde le mot 'worried' dans la question.","Indice niveau 2 : ce mot renvoie à une attitude, pas à un fait.","Indice niveau 3 : c'est une style/tone question."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : reviens à la méthode en quatre étapes du cours.","Indice niveau 2 : la toute première étape précède même la lecture des questions.","Indice niveau 3 : on skim le texte entier une première fois."] }
  ]
};

/* =========================== CHAPITRE 2 =========================== */
ANGLAIS_CHAPTERS[angKey('Les parties du discours (Parts of Speech)')] = {
  objectives: [
    "Identifier les 8 parties du discours en anglais",
    "Distinguer les sous-catégories de noms (proper, common, concrete, abstract, count, mass, collective)",
    "Repérer verbe, adjectif et adverbe dans une phrase technique",
    "Évaluer en quoi la classification en huit parties du discours, héritée du grammairien grec Denys de Thrace il y a plus de deux mille ans, a traversé l'histoire des langues européennes avec une remarquable stabilité jusqu'à structurer encore l'analyse grammaticale de l'anglais scientifique moderne"
  ],
  prereqs: ["Lecture rapide et compréhension de texte technique"],
  bodyHtml: `
    <p>Au IIe siècle avant notre ère, le grammairien grec Denys de Thrace rédigea l'<em>Art de la grammaire</em> (<em>Téchnē grammatikḗ</em>), le premier traité systématique de grammaire grecque, dans lequel il établit une classification des mots en huit catégories fondamentales. Cette classification, transmise ensuite au latin puis aux langues européennes modernes via les grammairiens romains, est restée si robuste qu'elle a traversé plus de deux mille ans d'évolution linguistique presque intacte : les huit parties du discours que tu vas étudier dans ce chapitre — noun, pronoun, adjective, verb, adverb, preposition, conjunction, interjection — sont, à quelques ajustements linguistiques près, directement héritées de la classification de Denys de Thrace.</p>
    <p>Cette remarquable stabilité sur plus de deux millénaires n'est pas un hasard : elle reflète une intuition linguistique profonde sur les fonctions grammaticales fondamentales que toute langue, quelle que soit son évolution historique, doit organiser d'une manière ou d'une autre. Comprendre cette classification n'est donc pas un exercice arbitraire de mémorisation, mais l'accès à une grille d'analyse universelle, applicable à n'importe quelle phrase technique en anglais scientifique.</p>
    <p>Avant d'analyser une phrase technique en anglais, il faut savoir identifier la fonction de chaque mot. L'anglais distingue <strong>8 parties du discours</strong> (parts of speech) : noun, pronoun, adjective, verb, adverb, preposition, conjunction, interjection. À la fin de ce chapitre, tu sauras identifier la partie du discours de n'importe quel mot dans une phrase technique en anglais.</p>

    <h3>1. Noun, Pronoun, Adjective</h3>
    <table class="mini-table">
      <tr><th>Catégorie</th><th>Rôle</th><th>Exemple</th></tr>
      <tr><td><strong>Noun</strong></td><td>Nomme une personne, un objet, un lieu, une idée</td><td>engineer, machine, honesty</td></tr>
      <tr><td><strong>Pronoun</strong></td><td>Remplace un nom déjà mentionné</td><td>it, he, they, this</td></tr>
      <tr><td><strong>Adjective</strong></td><td>Décrit un nom ou un pronom (qualité, taille, nombre)</td><td>intricate, huge, two</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — les sous-types de noms</span>
      Un <em>noun</em> peut être <strong>proper</strong> (nom propre, majuscule : Nokia), <strong>common</strong> (générique : company), <strong>concrete</strong> (perceptible par les sens : sensor), <strong>abstract</strong> (idée : efficiency), <strong>count</strong> (dénombrable : sensors / a sensor), <strong>mass</strong> (indénombrable, avec un « compteur » : a kilo of sand) ou <strong>collective</strong> (groupe : a team, a fleet).
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un même nom peut appartenir simultanément à plusieurs sous-catégories combinables : « team » est à la fois un nom commun et un nom collectif. Pourquoi ces catégories de noms ne sont-elles pas mutuellement exclusives, contrairement aux huit parties du discours elles-mêmes, où un mot donné n'occupe généralement qu'une seule fonction dans une phrase précise ?
    </div>

    <h3>2. Verb, Adverb</h3>
    <p>Le <strong>verb</strong> est la seule partie du discours indispensable à toute phrase : sans lui, pas de phrase. Il exprime une action ou un état (be, have, seem...). L'<strong>adverb</strong> modifie un verbe, un adjectif ou un autre adverbe, et se classe en quatre types :</p>
    <div class="example-box">
      <span class="eyebrow">Les quatre types d'adverbes</span>
      <p><strong>Manner</strong> (comment) — The technician worked carefully.</p>
      <p><strong>Time</strong> (quand) — The results arrived yesterday.</p>
      <p><strong>Place</strong> (où) — Sensors are installed everywhere.</p>
      <p class="example-answer">Degree (intensité) — The signal was very weak.</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le verbe est la seule partie du discours véritablement indispensable à toute phrase anglaise, alors qu'une phrase peut se construire sans adjectif, sans adverbe, voire sans complément. Pourquoi cette centralité du verbe, que l'on retrouve dans la plupart des langues du monde, reflète-t-elle une caractéristique fondamentale de la façon dont le langage humain structure l'action ou l'état décrit dans une phrase ?
    </div>

    <h3>3. Preposition, Conjunction, Interjection</h3>
    <table class="mini-table">
      <tr><th>Catégorie</th><th>Rôle</th><th>Exemple</th></tr>
      <tr><td><strong>Preposition</strong></td><td>Situe dans l'espace ou le temps</td><td>under, during, since</td></tr>
      <tr><td><strong>Conjunction</strong></td><td>Relie mots, groupes ou propositions</td><td>and, but, because</td></tr>
      <tr><td><strong>Interjection</strong></td><td>Exprime une émotion, isolée par un point d'exclamation</td><td>Wow! Oh no!</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple appliqué — phrase technique</span>
      <p><em>"The engineer carefully checked the machine under the deadline."</em></p>
      <p class="example-answer">engineer (noun) — carefully (adverb of manner) — checked (verb) — the (article) — machine (noun) — under (preposition) — the deadline (noun).</p>
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>La classification en parties du discours de Denys de Thrace, restée stable pendant deux millénaires pour un usage humain, est aujourd'hui au cœur d'une tâche fondamentale du traitement automatique du langage naturel : l'<strong>étiquetage grammatical automatique</strong> (POS tagging, Part-Of-Speech tagging). Des algorithmes, aujourd'hui fondés sur des modèles de langage entraînés sur des milliards de phrases, identifient automatiquement la fonction grammaticale de chaque mot d'une phrase — une étape préalable indispensable à des applications comme la traduction automatique, les correcteurs grammaticaux, ou les assistants vocaux, qui doivent tous comprendre la structure grammaticale d'une phrase avant de pouvoir la traiter correctement.</p>
    <p><strong>Question ouverte :</strong> comment un algorithme de POS tagging parvient-il à résoudre les ambiguïtés grammaticales (comme « training », qui peut être un nom ou une forme verbale) que même un lecteur humain doit parfois résoudre en s'appuyant sur le contexte de la phrase ?</p>
    <p><strong>Technologie émergente :</strong> les modèles de langage modernes effectuent aujourd'hui l'étiquetage grammatical avec une précision dépassant 97% sur l'anglais courant, un résultat rendu possible par l'apprentissage automatique à partir de vastes corpus de textes déjà annotés par des linguistes humains.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Phrase technique en anglais → identification mot par mot de sa fonction (8 parties du discours) → noms sous-catégorisés (proper/common, concrete/abstract, count/mass, collective) → verbe (élément central, indispensable) → adjectifs et adverbes (modificateurs) → prépositions et conjonctions (liaison)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Phrase} = \\text{Verbe (obligatoire)} + \\text{autres parties du discours (optionnelles)}$$
      Cette hiérarchie, héritée directement de la grammaire antique, rappelle que toute analyse grammaticale commence par repérer le verbe : c'est lui qui organise la phrase autour de lui, les sept autres parties du discours ne faisant que compléter, préciser ou relier l'action ou l'état qu'il exprime.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Denys de Thrace avait classé les mots grecs en six ou dix catégories plutôt qu'en huit : la grammaire anglaise moderne aurait-elle hérité d'une classification différente, ou le nombre de catégories aurait-il naturellement convergé vers huit malgré tout ?</li>
        <li>Pourquoi un mot comme « training » peut-il être tantôt un nom, tantôt une forme verbale, selon la phrase dans laquelle il apparaît ?</li>
        <li>Quelle serait la conséquence, pour la traduction automatique moderne, d'une incapacité à identifier correctement la partie du discours de chaque mot avant de traduire une phrase ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Denys de Thrace, <em>Téchnē grammatikḗ</em>, IIe siècle av. J.-C. — le traité fondateur de la classification en parties du discours.</li>
        <li>R. Quirk et al., <em>A Comprehensive Grammar of the English Language</em>, Longman — référence internationale sur la grammaire anglaise moderne.</li>
        <li>C. D. Manning, H. Schütze, <em>Foundations of Statistical Natural Language Processing</em>, MIT Press — sur l'étiquetage grammatical automatique en traitement du langage naturel.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais identifier la partie du discours de n'importe quel mot dans une phrase technique en anglais. Le chapitre suivant, « Types de phrases et concordance sujet-verbe », construira sur ces briques grammaticales pour analyser la structure complète d'une phrase. Comme le montre la stabilité de la classification de Denys de Thrace sur plus de deux mille ans : certaines structures de pensée, une fois correctement identifiées, traversent le temps avec une remarquable robustesse — jusqu'à structurer aujourd'hui les algorithmes qui analysent automatiquement le langage humain.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>8 parties du discours : noun, pronoun, adjective, verb, adverb, preposition, conjunction, interjection</li>
        <li>Le verbe est la seule partie du discours obligatoire dans toute phrase</li>
        <li>Un nom se classe selon plusieurs critères combinables : proper/common, concrete/abstract, count/mass, collective</li>
        <li>Les adverbes se classent en quatre types : manner, time, place, degree</li>
      </ul>
      <p class="recap-note">Passe aux exercices pour vérifier ces repères.</p>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre adjective (décrit un nom) et adverb (modifie un verbe/adjectif/adverbe)</li>
        <li>Croire qu'un nom en -ing est toujours un verbe (ex. : "training" peut être un nom)</li>
        <li>Oublier qu'un pronoun remplace un nom déjà connu du lecteur — il ne peut pas apparaître seul en tête de texte</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans "The results arrived yesterday", quelle est la partie du discours de "yesterday" ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an2e1" value="wrong"> Noun</label>
          <label class="option"><input type="radio" name="an2e1" value="right"> Adverb of time</label>
          <label class="option"><input type="radio" name="an2e1" value="wrong"> Preposition</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an2e1','an2fb1','Correct — \\'yesterday\\' indique quand l\\'action a eu lieu : c\\'est un adverbe de temps.','Pose-toi la question \\'quand\\' pour l\\'action \\'arrived\\' : la réponse est un adverbe de temps.')">Vérifier</button>
        <div class="feedback" id="an2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quel type de nom est "efficiency" (l'efficacité) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an2e2" value="wrong"> Concrete noun</label>
          <label class="option"><input type="radio" name="an2e2" value="right"> Abstract noun</label>
          <label class="option"><input type="radio" name="an2e2" value="wrong"> Collective noun</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an2e2','an2fb2','Correct — l\\'efficacité ne se perçoit pas par les cinq sens : c\\'est un nom abstrait.','Peux-tu toucher, voir ou entendre \\'efficiency\\' directement ? Non : c\\'est donc abstrait.')">Vérifier</button>
        <div class="feedback" id="an2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans "Sensors are installed everywhere", quelle est la fonction de "everywhere" ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an2e3" value="wrong"> Adverb of manner</label>
          <label class="option"><input type="radio" name="an2e3" value="wrong"> Adverb of degree</label>
          <label class="option"><input type="radio" name="an2e3" value="right"> Adverb of place</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an2e3','an2fb3','Correct — \\'everywhere\\' répond à la question \\'où\\' : c\\'est un adverbe de lieu.','La question \\'where are sensors installed?\\' te donne directement le type d\\'adverbe.')">Vérifier</button>
        <div class="feedback" id="an2fb3"></div>
      </div>
    </div>
  `
};

ANGLAIS_NOVA_KB[angKey('Les parties du discours (Parts of Speech)')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Les parties du discours ». Demande-moi une des 8 catégories (noun, verb, adverb...), un sous-type de nom, ou un indice sur un exercice.",
  rules: [
    { test:/noun/i, replies:["Le noun nomme une personne, un objet, un lieu ou une idée. Il se classe en plusieurs critères combinables : proper/common, concrete/abstract, count/mass, collective."] },
    { test:/verb/i, replies:["Le verb exprime une action ou un état ; c'est la seule partie du discours indispensable à toute phrase."] },
    { test:/adverb/i, replies:["L'adverb modifie un verbe, un adjectif ou un autre adverbe. Quatre types : manner (comment), time (quand), place (où), degree (intensité)."] },
    { test:/adjective/i, replies:["L'adjective décrit un nom ou un pronom : qualité, taille, nombre. Il précède généralement le nom en anglais."] },
    { test:/pronoun/i, replies:["Le pronoun remplace un nom déjà mentionné (it, he, they, this...), pour éviter les répétitions."] },
    { test:/preposition/i, replies:["La preposition situe dans l'espace ou le temps : under, during, since, before..."] },
    { test:/conjunction/i, replies:["La conjunction relie des mots, groupes ou propositions : and, but, because, or..."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pose-toi la question 'quand' sur le verbe 'arrived'.","Indice niveau 2 : la réponse à 'quand' est toujours un adverbe de temps.","Indice niveau 3 : c'est adverb of time."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : peux-tu voir, toucher ou entendre 'efficiency' directement ?","Indice niveau 2 : si non, ce n'est pas un nom concret.","Indice niveau 3 : c'est un abstract noun."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : quelle question pose 'everywhere' — comment, où, ou à quel degré ?","Indice niveau 2 : 'everywhere' répond à la question 'où'.","Indice niveau 3 : c'est un adverb of place."] }
  ]
};

/* =========================== CHAPITRE 3 =========================== */
ANGLAIS_CHAPTERS[angKey('Types de phrases et concordance sujet-verbe (Concord)')] = {
  objectives: [
    "Distinguer les quatre types de phrases (declarative, interrogative, imperative, exclamatory)",
    "Convertir une phrase d'un type à un autre",
    "Appliquer les règles de concordance sujet-verbe (concord) les plus fréquentes",
    "Évaluer en quoi les règles de concordance sujet-verbe, codifiées dès 1762 par des grammairiens comme Robert Lowth, restent des conventions apprises consciemment plutôt que des intuitions naturelles, même pour un locuteur natif de l'anglais"
  ],
  prereqs: ["Les parties du discours (Parts of Speech)"],
  bodyHtml: `
    <p>En 1762, l'évêque et grammairien anglais Robert Lowth publia <em>A Short Introduction to English Grammar</em>, un ouvrage qui allait durablement façonner l'enseignement de la grammaire anglaise pendant plus de deux siècles. Lowth y codifia de nombreuses règles prescriptives, dont plusieurs subtilités de la concordance sujet-verbe (concord) que tu vas étudier dans ce chapitre — des règles souvent présentées comme immuables, mais qui reflètent en réalité des choix linguistiques faits à une époque précise, parfois en délaissant des usages jusque-là parfaitement courants dans l'anglais parlé.</p>
    <p>Cette origine prescriptive explique pourquoi certaines règles de concordance, comme celle du sujet réel plutôt que du nom le plus proche, demandent un effort conscient même pour un locuteur natif : elles ne correspondent pas toujours à l'intuition immédiate de l'oreille, qui a tendance à accorder le verbe avec le nom qui le précède directement plutôt qu'avec le sujet grammatical réel de la phrase, parfois plus éloigné.</p>
    <p>Ce chapitre présente les quatre grandes fonctions qu'une phrase peut remplir, puis l'une des règles grammaticales les plus fréquemment source d'erreur en anglais : l'accord entre le sujet et le verbe. À la fin de ce chapitre, tu sauras identifier et convertir les quatre types de phrases, et appliquer correctement les règles de concordance sujet-verbe les plus fréquentes.</p>

    <h3>1. Les quatre types de phrases</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Fonction</th><th>Ponctuation</th><th>Exemple</th></tr>
      <tr><td><strong>Declarative</strong></td><td>Fait une déclaration</td><td>.</td><td>The bridge will be built on a hill.</td></tr>
      <tr><td><strong>Interrogative</strong></td><td>Pose une question</td><td>?</td><td>Is it raining?</td></tr>
      <tr><td><strong>Imperative</strong></td><td>Donne un ordre ou une requête polie</td><td>. ou !</td><td>Close the door. / Please be quiet.</td></tr>
      <tr><td><strong>Exclamatory</strong></td><td>Exprime une émotion forte</td><td>!</td><td>The monster is attacking!</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — convertir une phrase</span>
      Une phrase exclamative comme <em>"What a wonderful opportunity!"</em> se reformule en declarative neutre : <em>"It is a wonderful opportunity."</em> De même, une imperative se transforme facilement en interrogative de politesse : <em>"Shut the door."</em> → <em>"Will you shut the door?"</em>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Convertir une phrase exclamative en phrase déclarative neutre ne change rien au fait rapporté, seulement la façon dont il est présenté émotionnellement. En quoi cette possibilité de reformuler un même contenu factuel sous quatre formes différentes (déclarative, interrogative, impérative, exclamative) montre-t-elle que le type de phrase relève du ton et de l'intention, et non du sens brut transmis ?
    </div>

    <h3>2. La concordance sujet-verbe (Concord)</h3>
    <p>Le <strong>concord</strong> est l'accord entre le sujet et le verbe en nombre (singulier/pluriel) et en personne. Quelques règles fréquemment source d'erreurs :</p>
    <div class="example-box">
      <span class="eyebrow">Règles essentielles</span>
      <p><strong>Sujet réel, pas le nom le plus proche :</strong> "One of my friends <em>has</em> finished the project" — le verbe s'accorde avec "one" (singulier), pas avec "friends".</p>
      <p><strong>Deux sujets reliés par "and" :</strong> en général pluriel — "Tobacco and alcohol <em>are</em> injurious to health." Mais s'ils expriment une seule idée : singulier — "Bread and butter <em>is</em> what they want."</p>
      <p><strong>"Either...or" / "Neither...nor" :</strong> le verbe s'accorde avec le sujet le plus proche — "Neither he nor I <em>have</em> the money."</p>
      <p class="example-answer">Nom collectif : singulier si le groupe agit comme un tout ("The committee <em>was</em> appointed"), pluriel si on parle des membres séparément ("The committee <em>were</em> divided").</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La règle du sujet réel — accorder le verbe avec « one », pas avec « friends » — va souvent à l'encontre du réflexe naturel d'accorder avec le nom le plus proche. Pourquoi ce type d'erreur reste-t-il fréquent même chez des locuteurs expérimentés, et que cela révèle-t-il sur la différence entre grammaire intuitive à l'oral et grammaire normative apprise consciemment ?
    </div>

    <h3>3. Cas particuliers</h3>
    <table class="mini-table">
      <tr><th>Cas</th><th>Règle</th><th>Exemple</th></tr>
      <tr><td>Noms pluriels en sens singulier</td><td>Verbe singulier</td><td>"The news <em>is</em> good."</td></tr>
      <tr><td>Somme d'argent (montant global)</td><td>Verbe singulier</td><td>"A thousand dollars <em>is</em> a large sum."</td></tr>
      <tr><td>Somme d'argent (pièces comptées séparément)</td><td>Verbe pluriel</td><td>"Twenty rupees <em>were</em> jingling in his pocket."</td></tr>
    </table>

    <h3>4. Frontière de la recherche</h3>
    <p>Les linguistes modernes distinguent nettement la grammaire <strong>prescriptive</strong> (les règles que des ouvrages comme celui de Lowth cherchent à imposer comme correctes) de la grammaire <strong>descriptive</strong> (l'étude neutre de la façon dont les locuteurs utilisent réellement leur langue). Cette distinction éclaire des évolutions actuelles : l'usage de « they » comme pronom singulier neutre (« Everyone brought their own laptop »), longtemps condamné par la tradition prescriptive héritée de Lowth, est aujourd'hui accepté par la plupart des grammaires de référence et des dictionnaires, illustrant comment l'usage réel finit souvent par faire évoluer les règles officielles plutôt que l'inverse.</p>
    <p><strong>Question ouverte :</strong> à partir de quel moment un usage jugé autrefois « incorrect » par la grammaire prescriptive devient-il suffisamment répandu pour être officiellement reconnu comme correct par les dictionnaires et grammaires de référence ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>correcteurs grammaticaux automatiques</strong> (comme Grammarly), qui appliquent en temps réel des règles de concordance sujet-verbe et bien d'autres conventions grammaticales, doivent constamment être mis à jour pour refléter l'évolution de l'usage réel de la langue anglaise, sous peine de signaler comme fautives des constructions de plus en plus largement acceptées.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Phrase à analyser → identifier son type (declarative, interrogative, imperative, exclamatory) → possibilité de la convertir vers un autre type sans changer le fait rapporté → identifier le sujet réel de la phrase (pas nécessairement le nom le plus proche du verbe) → appliquer la règle de concordance adaptée (and, either/or, nom collectif...)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Accord du verbe} = f(\\text{sujet réel},\\ \\text{pas le nom le plus proche})$$
      Ce principe, source de la plupart des erreurs de concordance, rappelle que l'analyse grammaticale rigoureuse exige toujours de remonter au sujet grammatical véritable d'une phrase, même lorsque d'autres noms s'interposent entre ce sujet et le verbe qui doit s'accorder avec lui.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Robert Lowth n'avait jamais codifié ces règles de concordance en 1762 : l'anglais aurait-il développé un système d'accord sujet-verbe différent, plus proche des tendances naturelles de la langue parlée ?</li>
        <li>Pourquoi la règle « either...or / neither...nor » impose-t-elle l'accord avec le sujet le plus proche du verbe, plutôt qu'avec le premier sujet mentionné dans la phrase ?</li>
        <li>Quelle serait la conséquence, pour l'enseignement de l'anglais comme langue étrangère, d'une grammaire qui ignorerait systématiquement l'évolution réelle de l'usage au profit des seules règles prescriptives historiques ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>R. Lowth, <em>A Short Introduction to English Grammar</em>, 1762 — l'un des ouvrages fondateurs de la grammaire prescriptive anglaise.</li>
        <li>R. Quirk et al., <em>A Comprehensive Grammar of the English Language</em>, Longman — référence descriptive moderne sur la concordance sujet-verbe.</li>
        <li>Merriam-Webster, note d'usage sur le pronom singulier « they » — sur l'évolution récente d'une règle prescriptive traditionnelle.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais identifier et convertir les quatre types de phrases, et appliquer correctement les règles de concordance sujet-verbe les plus fréquentes. Le chapitre suivant, « Les temps verbaux en anglais scientifique », approfondira l'analyse du verbe, cette fois sous l'angle du temps et de l'aspect plutôt que de l'accord. Comme le montre l'évolution du pronom « they » : une règle grammaticale, aussi solidement codifiée soit-elle par la tradition, reste toujours soumise à l'épreuve du temps et de l'usage réel des locuteurs.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Quatre types de phrases : declarative, interrogative, imperative, exclamatory</li>
        <li>Le verbe s'accorde toujours avec le sujet réel de la phrase, pas avec le nom le plus proche</li>
        <li>"Either...or" / "neither...nor" : le verbe s'accorde avec le sujet le plus proche du verbe</li>
        <li>Un nom collectif est singulier si le groupe agit en un tout, pluriel si l'on parle des membres séparément</li>
      </ul>
      <p class="recap-note">Teste ces règles avec les exercices ci-dessous.</p>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Accorder le verbe avec le nom juste avant lui plutôt qu'avec le vrai sujet ("One of the boys <em>were</em>..." est faux)</li>
        <li>Utiliser systématiquement le pluriel après "and", même quand les deux noms expriment une seule idée</li>
        <li>Oublier que "neither...nor" impose l'accord avec le sujet le plus proche du verbe, pas le premier</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Choisis la forme correcte : "Each of the boys ____ given a pen."</p>
        <div class="options">
          <label class="option"><input type="radio" name="an3e1" value="right"> was</label>
          <label class="option"><input type="radio" name="an3e1" value="wrong"> were</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an3e1','an3fb1','Correct — le vrai sujet est \\'Each\\' (singulier), pas \\'boys\\'.','Le sujet réel n\\'est pas le nom juste avant le verbe : ici, c\\'est \\'Each\\'.')">Vérifier</button>
        <div class="feedback" id="an3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Transforme "What a wonderful opportunity!" (exclamatory) en phrase declarative.</p>
        <div class="options">
          <label class="option"><input type="radio" name="an3e2" value="right"> It is a wonderful opportunity.</label>
          <label class="option"><input type="radio" name="an3e2" value="wrong"> Is it a wonderful opportunity?</label>
          <label class="option"><input type="radio" name="an3e2" value="wrong"> What opportunity is wonderful!</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an3e2','an3fb2','Correct — on retire l\\'exclamation pour affirmer le fait de façon neutre.','La forme declarative affirme simplement le fait, sans émotion ni question.')">Vérifier</button>
        <div class="feedback" id="an3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Choisis la forme correcte : "The committee ____ divided on the question." (les membres pris séparément)</p>
        <div class="options">
          <label class="option"><input type="radio" name="an3e3" value="wrong"> was</label>
          <label class="option"><input type="radio" name="an3e3" value="right"> were</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an3e3','an3fb3','Correct — quand on parle des membres individuellement, le nom collectif prend le verbe au pluriel.','Le sujet est un nom collectif ; ici on parle des membres séparément, pas du groupe en tant que bloc.')">Vérifier</button>
        <div class="feedback" id="an3fb3"></div>
      </div>
    </div>
  `
};

ANGLAIS_NOVA_KB[angKey('Types de phrases et concordance sujet-verbe (Concord)')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Types de phrases et concord ». Demande-moi un type de phrase, une règle de concordance, ou un indice sur un exercice.",
  rules: [
    { test:/declarative/i, replies:["Une declarative sentence fait une déclaration et se termine par un point : 'The bridge will be built on a hill.'"] },
    { test:/interrogative/i, replies:["Une interrogative sentence pose une question et se termine par '?' : 'Is it raining?'"] },
    { test:/imperative/i, replies:["Une imperative sentence donne un ordre ou une requête polie : 'Close the door.' ou 'Please be quiet.'"] },
    { test:/exclamatory/i, replies:["Une exclamatory sentence exprime une émotion forte et se termine par '!' : 'The monster is attacking!'"] },
    { test:/concord|accord/i, replies:["Le concord est l'accord sujet-verbe en nombre et en personne : le verbe s'accorde toujours avec le sujet réel, pas avec le nom le plus proche."] },
    { test:/either|neither/i, replies:["Avec 'either...or' et 'neither...nor', le verbe s'accorde avec le sujet le plus proche de lui : 'Neither he nor I have the money.'"] },
    { test:/collectif|collective/i, replies:["Un nom collectif prend un verbe singulier si le groupe agit comme un tout, et pluriel si l'on parle de ses membres séparément."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : identifie le vrai sujet de la phrase, pas le nom juste avant le verbe.","Indice niveau 2 : 'Each' est singulier, même suivi de 'of the boys'.","Indice niveau 3 : c'est 'was'."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : retire l'émotion et affirme simplement le fait.","Indice niveau 2 : commence par 'It is...'.","Indice niveau 3 : c'est 'It is a wonderful opportunity.'"] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : la phrase précise qu'on parle des membres séparément.","Indice niveau 2 : dans ce cas, le nom collectif prend le pluriel.","Indice niveau 3 : c'est 'were'."] }
  ]
};

/* =========================== CHAPITRE 4 =========================== */
ANGLAIS_CHAPTERS[angKey('Les temps verbaux en anglais scientifique (Tenses)')] = {
  objectives: [
    "Reconnaître les usages du Present Simple et du Present Perfect dans un contexte scientifique",
    "Distinguer les temps utilisés pour décrire une expérience passée vs un résultat toujours valable",
    "Utiliser correctement les temps composés (continuous, perfect) dans une phrase technique",
    "Évaluer en quoi l'exigence de clarté stylistique portée par la Royal Society dès le XVIIe siècle explique la codification très précise des temps verbaux en anglais scientifique moderne, où chaque temps correspond à un statut épistémique distinct du fait rapporté"
  ],
  prereqs: ["Types de phrases et concordance sujet-verbe (Concord)"],
  bodyHtml: `
    <p>En 1667, l'historien et membre fondateur de la Royal Society britannique Thomas Sprat publia une <em>Histoire de la Royal Society</em> dans laquelle il plaida pour un style scientifique dépouillé : une « manière de parler proche, nue et naturelle », débarrassée des ornements rhétoriques qui, selon lui, obscurcissaient la clarté nécessaire à la communication scientifique. Cet appel à la précision stylistique, formulé à l'aube de la science moderne, explique en partie pourquoi l'anglais scientifique contemporain utilise un nombre volontairement limité de temps verbaux, chacun réservé à un usage précis et sans ambiguïté — exactement la logique que tu vas étudier dans ce chapitre.</p>
    <p>Cette exigence de précision explique pourquoi le choix entre Simple Past et Present Perfect n'est jamais arbitraire en anglais scientifique : utiliser le mauvais temps ne produit pas seulement une erreur grammaticale, mais transmet une information factuellement différente — un résultat daté et clos (Simple Past) n'a pas le même statut épistémique qu'un résultat toujours valable aujourd'hui (Present Perfect). Cette rigueur temporelle fait écho à la rigueur factuelle que la démarche scientifique elle-même exige.</p>
    <p>Les rapports scientifiques et les modes d'emploi techniques utilisent un nombre limité de temps, mais leur emploi est très codifié. Se tromper de temps change le sens : décrire une <em>vérité générale</em> n'est pas la même chose que décrire une <em>expérience passée</em>. À la fin de ce chapitre, tu sauras choisir le temps verbal exact pour exprimer un fait permanent, un résultat toujours valable, ou un événement daté du passé.</p>

    <h3>1. Les temps du présent</h3>
    <table class="mini-table">
      <tr><th>Temps</th><th>Usage</th><th>Exemple</th></tr>
      <tr><td><strong>Simple Present</strong></td><td>Vérités générales, faits permanents, habitudes</td><td>Water boils at 100°C.</td></tr>
      <tr><td><strong>Present Continuous</strong></td><td>Action en cours, ou action future planifiée</td><td>We are testing the new sensor now.</td></tr>
      <tr><td><strong>Present Perfect</strong></td><td>Action passée dont le résultat compte encore, ou passé indéfini</td><td>The team has already published the results.</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Certains verbes (know, believe, seem, want, resemble, appear...) décrivent un état, pas une action : ils ne s'utilisent quasiment jamais au continuous. On ne dit pas "I am knowing" mais "I know".
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les verbes d'état comme « know » ou « seem » décrivent une condition stable plutôt qu'une action en déroulement, ce qui explique qu'ils refusent presque toujours la forme continuous. En quoi cette distinction entre état stable et action en cours reflète-t-elle une différence conceptuelle plus large entre ce qui EST et ce qui SE FAIT, une distinction essentielle pour décrire correctement un phénomène scientifique ?
    </div>

    <h3>2. Les temps du passé et du futur</h3>
    <table class="mini-table">
      <tr><th>Temps</th><th>Usage</th><th>Exemple</th></tr>
      <tr><td><strong>Simple Past</strong></td><td>Action terminée à un moment précis du passé</td><td>The engineer tested the prototype last week.</td></tr>
      <tr><td><strong>Past Perfect</strong></td><td>Action antérieure à une autre action passée</td><td>The data had already been collected when the software crashed.</td></tr>
      <tr><td><strong>Simple Future</strong></td><td>Action à venir</td><td>We will present the results tomorrow.</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Tableau récapitulatif — voix active</span>
      <p><strong>Present Perfect Continuous</strong> — action prolongée jusqu'à maintenant : "They have been building the bridge for months."</p>
      <p><strong>Future Perfect</strong> — action terminée avant un point donné du futur : "I shall have finished the report by 5 pm."</p>
      <p class="example-answer">Le choix du temps dépend toujours d'un repère temporel : un fait permanent (present simple), un résultat présent (present perfect), un moment précis passé (simple past).</p>
    </div>

    <h3>3. Piège fréquent : Simple Past vs Present Perfect</h3>
    <p>En anglais scientifique, on hésite souvent entre ces deux temps pour décrire une expérience :</p>
    <div class="example-box">
      <span class="eyebrow">Comparaison</span>
      <p><strong>Simple Past</strong> — "The lab published the study in 2020." (date précise mentionnée → simple past obligatoire)</p>
      <p class="example-answer">Present Perfect — "The lab has published several studies on this topic." (pas de date précise, le résultat compte encore aujourd'hui)</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La présence d'une date précise (« in 2020 ») impose automatiquement le Simple Past et exclut le Present Perfect, quelle que soit l'importance actuelle du résultat rapporté. Pourquoi cette règle purement syntaxique (la présence ou l'absence d'un repère temporel précis) prime-t-elle sur toute considération de pertinence actuelle du fait décrit ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>La linguistique de corpus, qui analyse statistiquement de vastes collections de textes scientifiques réels, a confirmé empiriquement une intuition que ce chapitre te présente de façon prescriptive : les temps verbaux ne se répartissent pas au hasard dans un article scientifique, mais suivent des tendances nettes selon la section du texte. Les études montrent que la section « Introduction » d'un article privilégie largement le Present Simple et le Present Perfect (pour présenter l'état actuel des connaissances), tandis que la section « Methods » bascule presque systématiquement au Simple Past (pour décrire ce qui a été fait, une fois, à un moment précis) — une régularité si robuste qu'elle est aujourd'hui enseignée explicitement dans les formations à la rédaction scientifique.</p>
    <p><strong>Question ouverte :</strong> ces conventions de temps verbaux, solidement établies en anglais scientifique, se retrouvent-elles de façon similaire dans la rédaction scientifique d'autres langues, ou reflètent-elles une spécificité propre au système verbal anglais ?</p>
    <p><strong>Technologie émergente :</strong> les outils d'<strong>aide à la rédaction scientifique par intelligence artificielle</strong>, entraînés sur de vastes corpus d'articles publiés, peuvent aujourd'hui suggérer automatiquement le temps verbal le plus conventionnel pour une phrase donnée selon la section de l'article dans laquelle elle s'insère.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Fait à exprimer → vérité générale/permanente → Simple Present → résultat passé toujours valable, sans date précise → Present Perfect → événement daté et clos du passé → Simple Past → action antérieure à un autre événement passé → Past Perfect
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Date précise mentionnée} \\Rightarrow \\text{Simple Past (jamais Present Perfect)}$$
      Cette règle, apparemment technique, résume l'esprit de précision hérité de la tradition scientifique anglaise depuis la Royal Society : le simple fait de mentionner une date transforme automatiquement le statut temporel d'un événement, qui passe d'un résultat encore pertinent aujourd'hui à un fait daté et clos, quelle que soit son importance actuelle.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Thomas Sprat n'avait jamais plaidé pour un style scientifique dépouillé au XVIIe siècle : l'anglais scientifique moderne aurait-il développé une codification aussi stricte de ses temps verbaux ?</li>
        <li>Pourquoi dire "The lab has published in 2020" est-il incorrect, alors que la phrase reste parfaitement compréhensible pour un lecteur ?</li>
        <li>Quelle serait la conséquence, pour la clarté d'un article scientifique, d'un mélange incohérent de temps verbaux entre les sections Introduction, Methods et Results ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>T. Sprat, <em>The History of the Royal-Society of London</em>, 1667 — le texte fondateur de l'idéal de clarté stylistique en anglais scientifique.</li>
        <li>J. Swales, <em>Genre Analysis: English in Academic and Research Settings</em>, Cambridge University Press — référence sur les conventions de temps verbaux par section d'article scientifique.</li>
        <li>R. Quirk et al., <em>A Comprehensive Grammar of the English Language</em>, Longman — référence internationale sur le système des temps verbaux anglais.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais choisir le temps verbal exact pour exprimer un fait permanent, un résultat toujours valable, ou un événement daté du passé. Le chapitre suivant, « La voix passive en anglais technique », complètera cette maîtrise du verbe en abordant une autre convention essentielle de l'anglais scientifique : effacer l'auteur de l'action pour centrer l'attention sur le phénomène observé. Comme le rappelle l'idéal de clarté de Thomas Sprat : en science, la précision du langage n'est jamais un détail stylistique secondaire, elle conditionne directement la fiabilité de ce qui est communiqué.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Simple Present = vérité générale ou fait permanent (Water boils at 100°C)</li>
        <li>Present Perfect = action passée dont le résultat compte encore, sans date précise</li>
        <li>Simple Past = action terminée à un moment précis et daté du passé</li>
        <li>Les verbes d'état (know, seem, want...) ne s'utilisent presque jamais au continuous</li>
      </ul>
      <p class="recap-note">Vérifie ces repères avec les exercices ci-dessous.</p>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser le Present Perfect avec une date précise ("has published in 2020" est incorrect : il faut le Simple Past)</li>
        <li>Mettre un verbe d'état au continuous ("I am knowing the answer" est incorrect)</li>
        <li>Confondre Past Perfect (antériorité par rapport à un autre événement passé) et Simple Past (un seul événement passé isolé)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Complète : "Water ____ at 100°C at sea level." (vérité générale)</p>
        <div class="options">
          <label class="option"><input type="radio" name="an4e1" value="right"> boils</label>
          <label class="option"><input type="radio" name="an4e1" value="wrong"> is boiling</label>
          <label class="option"><input type="radio" name="an4e1" value="wrong"> has boiled</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an4e1','an4fb1','Correct — une vérité scientifique permanente s\\'exprime au Simple Present.','C\\'est un fait toujours vrai, pas une action ponctuelle : quel temps sert aux vérités générales ?')">Vérifier</button>
        <div class="feedback" id="an4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Complète : "The lab ____ the study in 2020." (date précise)</p>
        <div class="options">
          <label class="option"><input type="radio" name="an4e2" value="wrong"> has published</label>
          <label class="option"><input type="radio" name="an4e2" value="right"> published</label>
          <label class="option"><input type="radio" name="an4e2" value="wrong"> publishes</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an4e2','an4fb2','Correct — une date précise du passé impose le Simple Past, jamais le Present Perfect.','La présence d\\'une date précise (2020) élimine automatiquement le Present Perfect.')">Vérifier</button>
        <div class="feedback" id="an4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Complète : "The data ____ already been collected when the software crashed." (antériorité)</p>
        <div class="options">
          <label class="option"><input type="radio" name="an4e3" value="wrong"> has</label>
          <label class="option"><input type="radio" name="an4e3" value="right"> had</label>
          <label class="option"><input type="radio" name="an4e3" value="wrong"> have</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an4e3','an4fb3','Correct — l\\'action de collecter les données précède un autre événement passé (le crash) : c\\'est le Past Perfect.','Deux actions passées, l\\'une avant l\\'autre : le temps de l\\'action la plus ancienne est le Past Perfect.')">Vérifier</button>
        <div class="feedback" id="an4fb3"></div>
      </div>
    </div>
  `
};

ANGLAIS_NOVA_KB[angKey('Les temps verbaux en anglais scientifique (Tenses)')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Les temps verbaux en anglais scientifique ». Demande-moi l'usage d'un temps précis, ou un indice sur un exercice.",
  rules: [
    { test:/simple present|pr[ée]sent simple/i, replies:["Le Simple Present sert aux vérités générales et faits permanents : 'Water boils at 100°C.'"] },
    { test:/present perfect/i, replies:["Le Present Perfect décrit une action passée dont le résultat compte encore, sans date précise : 'The team has already published the results.'"] },
    { test:/simple past|pass[ée] simple/i, replies:["Le Simple Past décrit une action terminée à un moment précis et daté du passé : 'The engineer tested the prototype last week.'"] },
    { test:/past perfect/i, replies:["Le Past Perfect exprime une action antérieure à une autre action passée : 'The data had already been collected when the software crashed.'"] },
    { test:/continuous/i, replies:["Le Present Continuous décrit une action en cours ou une action future déjà planifiée : 'We are testing the new sensor now.'"] },
    { test:/future/i, replies:["Le Simple Future exprime une action à venir : 'We will present the results tomorrow.'"] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : c'est une vérité scientifique toujours vraie.","Indice niveau 2 : quel temps sert aux vérités générales ?","Indice niveau 3 : c'est le Simple Present, 'boils'."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : repère la présence d'une date précise dans la phrase.","Indice niveau 2 : une date précise élimine le Present Perfect.","Indice niveau 3 : c'est le Simple Past, 'published'."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : deux actions passées sont en jeu, l'une avant l'autre.","Indice niveau 2 : l'action la plus ancienne prend un temps particulier.","Indice niveau 3 : c'est le Past Perfect, 'had'."] }
  ]
};

/* =========================== CHAPITRE 5 =========================== */
ANGLAIS_CHAPTERS[angKey('La voix passive en anglais technique (Passive Voice)')] = {
  objectives: [
    "Construire une phrase passive à partir d'une phrase active, à n'importe quel temps",
    "Justifier le choix de la voix passive dans un contexte scientifique",
    "Reconnaître et utiliser la voix passive impersonnelle",
    "Évaluer en quoi la domination de la voix passive dans l'anglais scientifique, loin d'être une propriété immuable de la langue, résulte d'une évolution stylistique historique liée à l'idéal changeant d'objectivité scientifique — une convention aujourd'hui elle-même remise en question par de nombreuses revues"
  ],
  prereqs: ["Les temps verbaux en anglais scientifique (Tenses)"],
  bodyHtml: `
    <p>Contrairement à une idée reçue, les pionniers de la science moderne comme Isaac Newton ou Robert Boyle n'écrivaient pas leurs découvertes à la voix passive : ils utilisaient couramment la première personne, écrivant « I have observed » ou « I found that », assumant pleinement leur rôle d'observateur actif dans leurs récits d'expériences. Ce n'est que progressivement, entre la fin du XIXe siècle et le milieu du XXe siècle, que la voix passive s'imposa comme la convention dominante de l'écriture scientifique en anglais — une évolution stylistique motivée par l'idéal, alors en plein essor, d'une science « objective », où l'accent devait porter sur le phénomène observé plutôt que sur l'observateur lui-même.</p>
    <p>Cette histoire révèle que la règle que tu vas apprendre dans ce chapitre n'est pas une propriété intrinsèque et immuable de la langue anglaise, mais une convention stylistique qui a évolué avec les idéaux changeants de la communauté scientifique. D'ailleurs, depuis les années 2000, de nombreuses revues scientifiques prestigieuses encouragent à nouveau l'usage mesuré de la première personne et de la voix active, jugeant que la voix passive systématique peut rendre un texte plus lourd et moins engageant, sans réel gain en objectivité.</p>
    <p>L'anglais scientifique et technique utilise très largement la <strong>voix passive</strong> (passive voice), car l'accent est mis sur le résultat ou le procédé, pas sur celui qui agit — souvent inconnu, évident ou sans importance. À la fin de ce chapitre, tu sauras construire une phrase passive à n'importe quel temps, justifier son usage dans un contexte scientifique, et reconnaître la construction impersonnelle propre aux verbes intransitifs.</p>

    <h3>1. Construction de la phrase passive</h3>
    <div class="key-point">
      <span class="eyebrow">Formule</span>
      Subject + <strong>to be</strong> (conjugué au temps voulu) + <strong>past participle</strong> (+ by + agent, facultatif)
    </div>
    <table class="mini-table">
      <tr><th>Voix active</th><th>Voix passive</th></tr>
      <tr><td>They speak English.</td><td>English is spoken.</td></tr>
      <tr><td>They spoke English.</td><td>English was spoken.</td></tr>
      <tr><td>They have spoken English.</td><td>English has been spoken.</td></tr>
      <tr><td>They will speak English.</td><td>English will be spoken.</td></tr>
      <tr><td>They are speaking English.</td><td>English is being spoken.</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Méthode en trois étapes</span>
      <p><strong>1.</strong> L'objet de la phrase active devient le sujet de la phrase passive.</p>
      <p><strong>2.</strong> Le verbe devient : to be (au même temps que le verbe actif) + participe passé.</p>
      <p class="example-answer">3. Le sujet actif devient un complément d'agent introduit par "by" — souvent supprimé s'il est évident ou sans intérêt.</p>
    </div>

    <h3>2. Quand utiliser la voix passive ?</h3>
    <p>Cinq raisons justifient l'usage du passif plutôt que l'actif :</p>
    <div class="example-box">
      <span class="eyebrow">Cinq bonnes raisons</span>
      <p><strong>Agent inconnu ou évident</strong> — "Her purse was stolen." / "Oranges are grown in California."</p>
      <p><strong>Agent volontairement tu</strong> (plus poli) — "A mistake has been made."</p>
      <p><strong>Agent très général</strong> — "English is spoken here."</p>
      <p><strong>Focus sur le résultat</strong> — "Several thousand people were killed by the earthquake."</p>
      <p class="example-answer">Garder le même sujet sur plusieurs verbes de voix différentes dans une phrase.</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les cinq raisons d'utiliser le passif partagent un point commun : elles détournent toutes l'attention de celui qui agit vers l'action elle-même ou son résultat. En quoi ce déplacement d'attention, plutôt qu'une simple préférence stylistique, sert-il concrètement l'objectif de la communication scientifique, où le phénomène observé importe généralement plus que la personne qui l'a observé ?
    </div>

    <h3>3. La voix passive impersonnelle</h3>
    <p>Certains verbes intransitifs (arrive, occur, happen...) n'ont pas d'objet et ne peuvent donc pas former de passif classique. On utilise alors une construction impersonnelle avec un sujet vide ("it") :</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      "Someone has rectified the problem during the night." (actif) devient, en passif impersonnel : "It has been rectified during the night." — le sujet réel de la phrase active disparaît complètement, remplacé par le pronom vide "it".
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le passif impersonnel avec « it » fait complètement disparaître le sujet réel de la phrase active, contrairement au passif classique où l'agent peut toujours être réintroduit avec « by ». Pourquoi cette disparition totale du sujet convient-elle particulièrement bien aux verbes intransitifs comme « occur » ou « happen », qui décrivent des événements sans acteur clairement identifiable ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>Le débat sur la voix passive en anglais scientifique reste vivant aujourd'hui : des recherches en linguistique appliquée ont montré que l'usage systématique et excessif de la voix passive peut réellement nuire à la lisibilité d'un texte scientifique, en allongeant les phrases et en rendant plus difficile l'identification rapide de l'acteur d'une action lorsque celui-ci reste pertinent. De nombreux guides de rédaction scientifique modernes (comme ceux des revues Nature ou Science) recommandent désormais un usage équilibré : la voix passive quand l'accent doit porter sur le résultat, mais la voix active et la première personne (« we observed », « we found ») quand l'action du chercheur lui-même mérite d'être mise en avant, notamment pour distinguer clairement ce que les auteurs ont fait de ce qu'ils ont simplement observé ou cité chez d'autres.</p>
    <p><strong>Question ouverte :</strong> existe-t-il un équilibre optimal entre voix active et voix passive dans un article scientifique, ou ce choix dépend-il fondamentalement de la discipline, de la revue visée, et des préférences propres à chaque communauté de recherche ?</p>
    <p><strong>Technologie émergente :</strong> les outils modernes d'<strong>aide à la rédaction scientifique</strong> signalent aujourd'hui automatiquement les passages en voix passive excessive dans un manuscrit, suggérant des reformulations actives lorsque cela améliorerait la lisibilité sans perte de précision scientifique.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Phrase active (sujet + verbe + objet) → l'objet devient le sujet de la phrase passive → to be conjugué au même temps que le verbe actif d'origine + participe passé → agent réintroduit par "by" si utile, sinon omis → cas particulier : verbes intransitifs → passif impersonnel avec "it"
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Objet actif} \\rightarrow \\text{Sujet passif} + \\text{to be (même temps)} + \\text{participe passé} [+ \\text{by agent}]$$
      Cette formule de conversion, appliquée mécaniquement, cache une décision stylistique plus profonde : choisir la voix passive, c'est toujours choisir de déplacer le projecteur du texte, du responsable de l'action vers l'action elle-même ou son résultat — un choix qui, comme le montre l'histoire de cette convention, doit rester au service de la clarté, jamais devenir un réflexe systématique et automatique.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Newton et Boyle avaient d'emblée adopté la voix passive impersonnelle plutôt que la première personne : la convention scientifique moderne se serait-elle développée différemment, ou aurait-elle malgré tout fini par converger vers le passif au XXe siècle ?</li>
        <li>Pourquoi certains verbes intransitifs comme "arrive" ou "occur" ne peuvent-ils tout simplement pas former de passif classique, contrairement à la plupart des verbes transitifs ?</li>
        <li>Quelle serait la conséquence, pour la lisibilité d'un article scientifique, d'un usage systématique et sans discernement de la voix passive à chaque phrase, même lorsque l'auteur de l'action serait pertinent à préciser ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>I. Newton, <em>Opticks</em>, 1704 — un exemple représentatif de l'usage de la première personne dans la science du XVIIe-XVIIIe siècle.</li>
        <li>R. Quirk et al., <em>A Comprehensive Grammar of the English Language</em>, Longman — référence internationale sur la construction de la voix passive.</li>
        <li>Guides de rédaction des revues Nature et Science — pour l'usage contemporain recommandé de la voix active et passive en anglais scientifique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais construire une phrase passive à n'importe quel temps, justifier son usage dans un contexte scientifique, et reconnaître la construction impersonnelle propre aux verbes intransitifs. Le chapitre suivant, « Rédaction professionnelle : lettre de candidature et CV », te fera passer de la grammaire scientifique à l'écriture professionnelle appliquée. Comme le montre l'évolution du style scientifique depuis Newton jusqu'à aujourd'hui : même les conventions d'écriture les plus solidement établies restent, avec le temps, sujettes à réévaluation et à ajustement.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Passive = objet actif devient sujet + to be (même temps que l'actif) + participe passé</li>
        <li>Le complément d'agent ("by...") est souvent supprimé s'il est inconnu, évident ou trop général</li>
        <li>Le passif met l'accent sur le résultat de l'action plutôt que sur celui qui la réalise</li>
        <li>Les verbes intransitifs (arrive, happen...) forment un passif impersonnel avec "it", sans objet</li>
      </ul>
      <p class="recap-note">Passe aux exercices pour consolider ces réflexes.</p>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de conjuguer "to be" au même temps que le verbe de la phrase active d'origine</li>
        <li>Essayer de mettre au passif un verbe intransitif (sleep, arrive, die) sans passer par la construction impersonnelle</li>
        <li>Toujours garder "by + agent", même quand il est évident et alourdit inutilement la phrase</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Mets au passif : "Rita wrote a letter." (Simple Past)</p>
        <div class="options">
          <label class="option"><input type="radio" name="an5e1" value="right"> A letter was written by Rita.</label>
          <label class="option"><input type="radio" name="an5e1" value="wrong"> A letter is written by Rita.</label>
          <label class="option"><input type="radio" name="an5e1" value="wrong"> A letter has written by Rita.</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an5e1','an5fb1','Correct — \\'to be\\' reste au Simple Past (\\'was\\'), comme le verbe actif d\\'origine.','Le temps de \\'to be\\' doit être le même que celui du verbe actif : \\'wrote\\' est au Simple Past.')">Vérifier</button>
        <div class="feedback" id="an5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pourquoi dit-on "Oranges are grown in California" plutôt qu'à la voix active ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an5e2" value="right"> L'agent (les producteurs) est évident et sans intérêt ici</label>
          <label class="option"><input type="radio" name="an5e2" value="wrong"> C'est une règle stricte de grammaire sans exception</label>
          <label class="option"><input type="radio" name="an5e2" value="wrong"> Le verbe "grow" ne peut jamais être actif</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an5e2','an5fb2','Correct — l\\'agent est évident (des producteurs), donc sans intérêt à préciser : le passif se justifie.','Relis les cinq bonnes raisons d\\'utiliser le passif : laquelle correspond à cette phrase ?')">Vérifier</button>
        <div class="feedback" id="an5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Transforme en passif impersonnel : "Someone has rectified the problem."</p>
        <div class="options">
          <label class="option"><input type="radio" name="an5e3" value="right"> It has been rectified.</label>
          <label class="option"><input type="radio" name="an5e3" value="wrong"> The problem has someone rectified.</label>
          <label class="option"><input type="radio" name="an5e3" value="wrong"> Someone is rectified.</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an5e3','an5fb3','Correct — \\'someone\\' disparaît, remplacé par le sujet vide \\'it\\', avec \\'to be\\' + participe passé.','Le sujet réel de la phrase active disparaît complètement au profit d\\'un pronom vide.')">Vérifier</button>
        <div class="feedback" id="an5fb3"></div>
      </div>
    </div>
  `
};

ANGLAIS_NOVA_KB[angKey('La voix passive en anglais technique (Passive Voice)')] = {
  intro: "Salut, moi c'est Nova ! On est sur « La voix passive en anglais technique ». Demande-moi la formule du passif, une raison de l'utiliser, ou un indice sur un exercice.",
  rules: [
    { test:/formule|construction|structure/i, replies:["Formule du passif : sujet + to be (au même temps que le verbe actif) + participe passé (+ by + agent, facultatif)."] },
    { test:/pourquoi|raison/i, replies:["On utilise le passif quand l'agent est inconnu, évident, volontairement tu, très général, ou pour mettre l'accent sur le résultat."] },
    { test:/impersonnel|impersonal/i, replies:["Les verbes intransitifs (arrive, happen...) forment un passif impersonnel avec le sujet vide 'it', car ils n'ont pas d'objet à transformer en sujet."] },
    { test:/agent|by /i, replies:["Le complément d'agent ('by + nom') est souvent supprimé quand il est évident, inconnu, ou sans intérêt pour le sens de la phrase."] },
    { test:/temps|tense/i, replies:["Le verbe 'to be' du passif doit toujours être conjugué exactement au même temps que le verbe actif d'origine."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : à quel temps est le verbe actif 'wrote' ?","Indice niveau 2 : 'to be' doit être conjugué au même temps, ici le Simple Past.","Indice niveau 3 : c'est 'was written'."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : qui cultive les oranges, et est-ce vraiment utile de le préciser ?","Indice niveau 2 : l'agent est évident, donc sans intérêt particulier.","Indice niveau 3 : c'est la raison 'agent évident/sans intérêt'."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le verbe est transitif mais son sujet 'someone' doit disparaître.","Indice niveau 2 : il est remplacé par un pronom vide.","Indice niveau 3 : c'est 'It has been rectified.'"] }
  ]
};

/* =========================== CHAPITRE 6 =========================== */
ANGLAIS_CHAPTERS[angKey('Rédaction professionnelle : lettre de candidature et CV')] = {
  objectives: [
    "Structurer une cover letter (lettre de motivation) en anglais",
    "Distinguer les rubriques essentielles et optionnelles d'un resume (CV)",
    "Rédiger une candidature à un stage ou une formation pratique (practical training)",
    "Évaluer en quoi la stratégie de Léonard de Vinci dans sa lettre à Ludovico Sforza en 1482 — adapter sa présentation aux besoins précis du destinataire plutôt que d'énumérer tous ses talents — reste, plus de cinq siècles plus tard, le principe fondamental de toute candidature professionnelle efficace"
  ],
  prereqs: ["La voix passive en anglais technique (Passive Voice)"],
  bodyHtml: `
    <p>En 1482, le jeune Leonardo da Vinci, alors âgé de trente ans et en quête de mécénat, rédigea une lettre de candidature restée célèbre à l'attention de Ludovico Sforza, duc de Milan — l'un des tout premiers exemples documentés de ce que nous appellerions aujourd'hui une lettre de motivation. Fait surprenant, Léonard y présenta principalement ses compétences en ingénierie militaire (ponts portables, machines de siège, canons), ne mentionnant sa maîtrise de la peinture et de la sculpture qu'en tout dernier lieu, presque en passant — un choix stratégique révélateur : il avait manifestement adapté sa candidature aux besoins précis de son destinataire, un duc engagé dans des conflits militaires, plutôt que de se contenter d'énumérer tous ses talents sans discernement.</p>
    <p>Cette stratégie vieille de plus de cinq siècles reste, mot pour mot, le conseil central de ce chapitre : une candidature efficace ne liste pas tout ce que son auteur sait faire, mais sélectionne et met en avant précisément ce qui répond aux besoins identifiés du destinataire. Léonard de Vinci, sans le savoir, appliquait déjà la règle d'or de toute cover letter moderne.</p>
    <p>La <strong>cover letter</strong> (lettre de motivation) et le <strong>resume</strong> (CV) forment le premier contact avec un recruteur anglophone : leur rôle n'est pas de tout dire, mais de donner envie de lire la suite et de convoquer le candidat en entretien. À la fin de ce chapitre, tu sauras structurer une cover letter efficace, identifier les rubriques essentielles d'un resume, et rédiger une candidature à un stage.</p>

    <h3>1. Le rôle de la cover letter</h3>
    <p>Une bonne lettre de motivation en anglais doit :</p>
    <div class="example-box">
      <span class="eyebrow">Cinq fonctions de la cover letter</span>
      <p><strong>1.</strong> Se présenter et introduire le CV qui suit.</p>
      <p><strong>2.</strong> Montrer une connaissance réelle de l'entreprise (produits, services, besoins).</p>
      <p><strong>3.</strong> Expliquer en quoi les compétences du candidat répondent à un besoin précis (réduire les coûts, augmenter les ventes...).</p>
      <p><strong>4.</strong> Reprendre certains mots-clés de l'offre d'emploi.</p>
      <p class="example-answer">5. Demander explicitement un entretien, ou annoncer qu'on relancera l'entreprise.</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Reprendre certains mots-clés précis de l'offre d'emploi dans sa lettre de motivation peut sembler un détail mineur. Pourquoi cette technique, en plus de montrer une lecture attentive de l'annonce, facilite-t-elle concrètement le travail d'un recruteur qui trie souvent un grand nombre de candidatures rapidement ?
    </div>

    <h3>2. Structure type d'une cover letter</h3>
    <table class="mini-table">
      <tr><th>Partie</th><th>Contenu</th></tr>
      <tr><td>Coordonnées + date</td><td>Adresse de l'expéditeur, puis du destinataire, puis la date</td></tr>
      <tr><td>Salutation</td><td>"Dear Hiring Manager," ou "Dear Ms. [Nom],"</td></tr>
      <tr><td>Objet (Sub:)</td><td>Rappel précis du poste visé et référence à l'annonce</td></tr>
      <tr><td>Corps</td><td>Motivation, expérience pertinente, compétences clés</td></tr>
      <tr><td>Formule de clôture</td><td>"Sincerely," / "Yours faithfully," + signature</td></tr>
    </table>

    <h3>3. Le resume (CV) : rubriques essentielles</h3>
    <p>Un resume doit rester factuel et vérifiable — jamais d'information invérifiable. Les rubriques indispensables (the essentials) sont : nom et coordonnées complètes, un <strong>summary</strong> (résumé des compétences clés), l'<strong>education</strong> (établissement, diplôme, mentions), les formations complémentaires, l'<strong>experience</strong> professionnelle (missions et résultats concrets), les affiliations professionnelles, et les compétences spécifiques (langages, logiciels, langues).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Les rubriques <strong>optionnelles</strong> (personal data, hobbies) doivent être choisies avec prudence : dans de nombreux pays anglophones, il est même illégal pour un employeur de demander l'âge ou la situation familiale d'un candidat. Ne mentionner un hobby que s'il apporte une vraie valeur ajoutée.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le fait qu'il soit illégal, dans de nombreux pays anglophones, de demander l'âge ou la situation familiale d'un candidat reflète une préoccupation précise : éviter toute discrimination fondée sur des critères sans rapport avec la compétence professionnelle. Pourquoi cette prudence légale autour des rubriques optionnelles d'un CV va-t-elle au-delà d'une simple convention culturelle pour toucher à des principes d'équité dans le recrutement ?
    </div>

    <h3>4. Candidature pour un stage (practical training)</h3>
    <p>Une lettre de demande de stage suit une structure plus courte, mais tout aussi précise : identité et établissement du candidat, filière et diplôme visé, motivation pour ce type de formation pratique, et demande explicite des documents nécessaires (ex. : autorisation de travail).</p>

    <h3>5. Frontière de la recherche</h3>
    <p>Le conseil de reprendre les mots-clés de l'offre d'emploi, qui datait à l'origine d'une intuition de bon sens pour capter l'attention d'un recruteur humain, a pris une importance technique nouvelle avec la généralisation des <strong>systèmes de suivi des candidatures</strong> (ATS, Applicant Tracking Systems) : la majorité des grandes entreprises filtrent aujourd'hui automatiquement les CV et lettres de motivation reçus par des logiciels qui recherchent des mots-clés précis avant même qu'un humain ne les lise, éliminant silencieusement les candidatures qui ne les contiennent pas, même lorsque le candidat possède réellement les compétences recherchées mais les a formulées différemment.</p>
    <p><strong>Question ouverte :</strong> comment un candidat peut-il rédiger une candidature qui passe efficacement les filtres automatiques des ATS, sans pour autant sacrifier l'authenticité et la personnalisation qui restent essentielles pour convaincre un recruteur humain une fois cette première étape franchie ?</p>
    <p><strong>Technologie émergente :</strong> les outils d'<strong>optimisation de CV assistée par intelligence artificielle</strong> analysent aujourd'hui automatiquement une offre d'emploi et suggèrent au candidat les mots-clés et formulations les plus susceptibles de passer les filtres ATS tout en restant fidèles à son expérience réelle.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Offre d'emploi analysée → mots-clés et besoins identifiés → cover letter structurée (coordonnées, objet, corps ciblé, clôture) → resume factuel (essentials : summary, education, experience, skills) → rubriques optionnelles choisies avec prudence → candidature adaptée au destinataire précis
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Candidature efficace} = \\text{Compétences du candidat} \\cap \\text{Besoins précis du destinataire}$$
      Ce principe, déjà appliqué intuitivement par Léonard de Vinci en 1482, résume l'esprit de tout ce chapitre : une candidature ne gagne jamais à énumérer exhaustivement tous les talents d'un candidat, mais à sélectionner précisément l'intersection entre ce que le candidat sait faire et ce que le destinataire recherche réellement.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Léonard de Vinci avait présenté sa lettre à Ludovico Sforza en énumérant tous ses talents sans ordre de priorité, y compris la peinture en premier : sa candidature aurait-elle eu le même impact auprès d'un duc engagé dans des conflits militaires ?</li>
        <li>Pourquoi un resume doit-il rester strictement factuel et vérifiable, alors qu'une cover letter peut se permettre un ton plus personnel et persuasif ?</li>
        <li>Quelle serait la conséquence, pour un candidat par ailleurs très qualifié, d'une candidature ne reprenant aucun des mots-clés utilisés par les systèmes ATS modernes pour filtrer automatiquement les CV reçus ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Lettre de Léonard de Vinci à Ludovico Sforza, vers 1482 — l'un des tout premiers exemples documentés de lettre de candidature professionnelle.</li>
        <li>Y. Weiss, <em>Best Resumes and CVs for International Jobs</em>, Impact Publications — référence pratique sur la rédaction de CV en anglais professionnel.</li>
        <li>Documentation sur les systèmes ATS (Applicant Tracking Systems) — pour une application contemporaine de la sélection par mots-clés dans le recrutement.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais structurer une cover letter efficace, identifier les rubriques essentielles d'un resume, et rédiger une candidature à un stage. Le dernier chapitre de cette matière, « Communication professionnelle : lettres formelles et prise de parole », élargira ces compétences à l'ensemble des situations de communication professionnelle en anglais. Comme le montre l'exemple de Léonard de Vinci : la meilleure candidature n'est jamais celle qui en dit le plus, mais celle qui dit précisément ce que son destinataire a besoin d'entendre.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>La cover letter introduit le CV et donne envie de le lire — elle ne remplace pas le CV</li>
        <li>Structure type : coordonnées → salutation → objet (Sub:) → corps → formule de clôture</li>
        <li>Le resume doit rester factuel et vérifiable ; les rubriques optionnelles se choisissent avec prudence</li>
        <li>Une candidature de stage reprend la même logique, en plus court et plus ciblé</li>
      </ul>
      <p class="recap-note">Vérifie ces repères avec les exercices ci-dessous.</p>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Répéter mot pour mot le contenu du CV dans la cover letter, sans apporter de valeur ajoutée</li>
        <li>Oublier de mentionner l'objet précis (Sub:) et la référence à l'annonce consultée</li>
        <li>Inclure des informations personnelles sensibles (âge, situation familiale) sans qu'elles apportent une réelle plus-value</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Quel est le rôle principal de la cover letter ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an6e1" value="wrong"> Remplacer entièrement le CV</label>
          <label class="option"><input type="radio" name="an6e1" value="right"> Convaincre le recruteur de lire le CV qui suit</label>
          <label class="option"><input type="radio" name="an6e1" value="wrong"> Lister exhaustivement tous les diplômes obtenus</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an6e1','an6fb1','Correct — la cover letter introduit et donne envie de lire le CV, elle ne le remplace pas.','Relis la définition du \\'purpose of the cover letter\\' donnée dans le cours.')">Vérifier</button>
        <div class="feedback" id="an6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Laquelle de ces rubriques est considérée comme optionnelle (à utiliser avec prudence) dans un resume ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an6e2" value="wrong"> Work experience</label>
          <label class="option"><input type="radio" name="an6e2" value="wrong"> Education</label>
          <label class="option"><input type="radio" name="an6e2" value="right"> Personal data / hobbies</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an6e2','an6fb2','Correct — les données personnelles et hobbies sont optionnels et à choisir avec prudence.','L\\'expérience et l\\'éducation sont dans \\'the essentials\\' ; une autre rubrique fait partie de \\'the optionals\\'.')">Vérifier</button>
        <div class="feedback" id="an6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans une cover letter, à quoi sert la ligne "Sub: Application for the post of..." ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an6e3" value="right"> Préciser immédiatement l'objet et le poste visé</label>
          <label class="option"><input type="radio" name="an6e3" value="wrong"> Conclure la lettre</label>
          <label class="option"><input type="radio" name="an6e3" value="wrong"> Remplacer la formule de salutation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an6e3','an6fb3','Correct — la ligne \\'Sub:\\' annonce clairement, dès le début, l\\'objet précis de la lettre.','Cette ligne apparaît juste après la salutation, avant le corps de la lettre : quel est son rôle ?')">Vérifier</button>
        <div class="feedback" id="an6fb3"></div>
      </div>
    </div>
  `
};

ANGLAIS_NOVA_KB[angKey('Rédaction professionnelle : lettre de candidature et CV')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Lettre de candidature et CV ». Demande-moi la structure d'une cover letter, une rubrique du resume, ou un indice sur un exercice.",
  rules: [
    { test:/cover letter|lettre de motivation/i, replies:["La cover letter se présente et introduit le CV : coordonnées → salutation → objet (Sub:) → corps → formule de clôture."] },
    { test:/resume|cv\b/i, replies:["Le resume doit rester factuel et vérifiable. Rubriques essentielles : coordonnées, summary, education, experience, affiliations, compétences spécifiques."] },
    { test:/optionnel|optional|hobbies/i, replies:["Les rubriques optionnelles (personal data, hobbies) se choisissent avec prudence — à n'inclure que si elles apportent une vraie valeur ajoutée."] },
    { test:/stage|practical training/i, replies:["Une candidature de stage (practical training) reprend la structure classique en plus court : identité, filière visée, motivation, documents demandés."] },
    { test:/objet|sub:/i, replies:["La ligne 'Sub:' précise immédiatement l'objet de la lettre et le poste visé, juste après la salutation."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : relis le \\'purpose of the cover letter\\'.","Indice niveau 2 : elle introduit un autre document.","Indice niveau 3 : c'est \\'convaincre le recruteur de lire le CV\\'."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : deux rubriques citées font partie de \\'the essentials\\'.","Indice niveau 2 : la troisième option fait partie de \\'the optionals\\'.","Indice niveau 3 : c'est 'Personal data / hobbies'."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : cette ligne apparaît juste après la salutation.","Indice niveau 2 : elle sert à annoncer quelque chose avant le corps du texte.","Indice niveau 3 : c'est préciser l'objet et le poste visé."] }
  ]
};

/* =========================== CHAPITRE 7 =========================== */
ANGLAIS_CHAPTERS[angKey('Communication professionnelle : lettres formelles et prise de parole')] = {
  objectives: [
    "Rédiger une letter to the editor argumentée et structurée",
    "Composer une lettre d'invitation, d'acceptation et de refus dans un cadre académique/professionnel",
    "Préparer une self introduction orale claire et complète",
    "Évaluer en quoi la structure argumentative rigoureuse des Federalist Papers de 1787-1788, malgré son registre strictement formel et impersonnel, a démontré la force de persuasion propre à une lettre bien construite — un principe directement transposable à la letter to the editor moderne"
  ],
  prereqs: ["Rédaction professionnelle : lettre de candidature et CV"],
  bodyHtml: `
    <p>Entre 1787 et 1788, trois hommes politiques américains — Alexander Hamilton, James Madison et John Jay — publièrent sous le pseudonyme collectif « Publius » une série de 85 lettres argumentées dans la presse new-yorkaise, aujourd'hui connues sous le nom de <em>Federalist Papers</em>. Leur objectif : convaincre l'opinion publique et les délégués des États d'adopter la toute nouvelle Constitution américaine. Ces lettres suivaient déjà, avec une rigueur remarquable, la structure en cinq étapes que tu étudies dans ce chapitre — rappel du contexte, position claire, argument principal, preuves à l'appui, proposition concrète — et sont aujourd'hui considérées comme l'un des exemples les plus influents de persuasion écrite formelle de toute l'histoire politique occidentale.</p>
    <p>Ce que les Federalist Papers illustrent avec éclat, c'est que la forme codifiée et impersonnelle du registre formel — sans contraction, sans familiarité, construite étape par étape — n'est pas un obstacle à la force de persuasion, mais au contraire ce qui lui donne sa crédibilité et sa portée : une lettre rigoureusement argumentée, respectueuse des codes de son genre, peut littéralement contribuer à fonder une nation.</p>
    <p>La <strong>letter to the editor</strong> est un exercice d'expression libre et argumentée dans un cadre formel. Elle suit une progression stricte, tout comme les lettres d'invitation, d'acceptation et de refus qui structurent la vie académique et professionnelle, et la présentation orale de soi qui clôt ce cours. À la fin de ce chapitre, tu sauras rédiger ces différents types de courriers formels et préparer une présentation orale claire de toi-même — clôturant ainsi la matière Anglais scientifique, et avec elle l'intégralité du programme de première année de Licence.</p>

    <h3>1. La letter to the editor</h3>
    <p>La <strong>letter to the editor</strong> est un exercice d'expression libre et argumentée dans un cadre formel. Elle suit une progression stricte :</p>
    <table class="mini-table">
      <tr><th>Étape</th><th>Contenu</th></tr>
      <tr><td>1</td><td>Rappeler brièvement le sujet ou l'article auquel on répond</td></tr>
      <tr><td>2</td><td>Énoncer clairement sa position sur le problème</td></tr>
      <tr><td>3</td><td>Développer le point principal en premier (le texte est court)</td></tr>
      <tr><td>4</td><td>Apporter des preuves : statistiques, faits récents, exemple personnel</td></tr>
      <tr><td>5</td><td>Proposer une action ou une solution concrète</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — registre formel</span>
      Ce type de lettre exige un style <strong>impersonnel et non familier</strong> : pas de contractions (don't → do not), un vocabulaire soutenu, et l'usage de la 1ère ou 3ème personne — la 2ème personne ("you") est en général à éviter dans un travail académique formel.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Bannir les contractions et la deuxième personne dans un registre formel peut sembler créer une distance froide avec le lecteur. En quoi cette distance délibérée, loin d'affaiblir un texte persuasif, peut-elle au contraire renforcer sa crédibilité en le faisant paraître plus posé, plus réfléchi, moins émotionnellement chargé qu'un texte familier ?
    </div>

    <h3>2. Les lettres d'invitation, d'acceptation et de refus</h3>
    <p>Dans un cadre universitaire ou professionnel, trois lettres liées se répondent :</p>
    <div class="example-box">
      <span class="eyebrow">Trois lettres, trois logiques</span>
      <p><strong>Invitation :</strong> raison de l'invitation, structure organisatrice, date/heure, sujet précis, arrangements prévus (transport, hébergement).</p>
      <p><strong>Acceptation :</strong> remerciement, confirmation claire, précision d'éventuels besoins matériels (équipement, salle).</p>
      <p class="example-answer">Refus (déclinaison) : remerciement, expression du regret, raison brève et polie du refus, encouragements pour l'événement.</p>
    </div>

    <h3>3. La self introduction orale</h3>
    <p>Une présentation orale de soi (self introduction) suit un ordre logique attendu à l'oral comme à l'écrit :</p>
    <table class="mini-table">
      <tr><th>Bloc</th><th>Contenu</th></tr>
      <tr><td>Identité</td><td>Nom, ville d'origine, établissement actuel</td></tr>
      <tr><td>Parcours</td><td>Scolarité, résultats, filière choisie</td></tr>
      <tr><td>Objectifs</td><td>Objectif à court terme (le diplôme) et à long terme (le métier visé)</td></tr>
      <tr><td>Personnalité</td><td>Points forts, centres d'intérêt, valeurs</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      À l'oral, une self introduction reste courte et fluide : on évite de réciter une liste de faits — on relie les informations par des connecteurs simples ("After finishing my graduation, I will do my P.G.") pour que le discours reste naturel.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Réciter une liste de faits bruts (nom, ville, établissement, diplôme) donne une impression très différente de relier ces mêmes informations par des connecteurs naturels. En quoi cette différence, purement formelle en apparence, change-t-elle concrètement la perception qu'un auditeur se fait de l'aisance et de la préparation du candidat qui parle ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>Les formats de communication professionnelle étudiés dans ce chapitre évoluent aujourd'hui vers de nouveaux supports numériques : la self introduction orale que tu prépares ici trouve un équivalent écrit et permanent dans la section « About » d'un profil LinkedIn, consultée par des millions de recruteurs chaque jour, tandis que certaines entreprises demandent désormais des candidatures vidéo plutôt que des lettres formelles traditionnelles. Ces nouveaux formats n'abandonnent pourtant pas les principes fondamentaux de ce chapitre — structure claire, registre adapté au contexte professionnel, mise en avant ciblée de ses atouts — ils les transposent simplement à des supports différents.</p>
    <p><strong>Question ouverte :</strong> les codes du registre formel écrit, patiemment codifiés depuis des siècles pour la lettre papier, doivent-ils être entièrement repensés pour les nouveaux formats numériques de communication professionnelle, ou les mêmes principes de clarté et de structure restent-ils pertinents quel que soit le support ?</p>
    <p><strong>Technologie émergente :</strong> les outils modernes de <strong>simulation d'entretien par intelligence artificielle</strong> permettent aujourd'hui de s'entraîner à une self introduction orale en conditions quasi réelles, avec un retour automatisé sur la structure, la fluidité et la clarté du discours — complétant utilement la préparation traditionnelle par la pratique répétée.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Situation de communication professionnelle → letter to the editor (position argumentée, registre formel, 5 étapes) → lettres d'invitation/acceptation/refus (remerciement + information claire + politesse) → self introduction orale (identité → parcours → objectifs → personnalité, reliés naturellement)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Registre formel} + \\text{Structure claire} + \\text{Contenu ciblé} = \\text{Communication professionnelle efficace}$$
      Cette formule, illustrée avec éclat par les Federalist Papers, résume l'esprit de tout ce chapitre et, plus largement, de toute cette matière : en anglais professionnel comme en anglais scientifique, la forme rigoureuse n'est jamais un obstacle au fond, elle en est au contraire le meilleur vecteur.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Hamilton, Madison et Jay avaient publié les Federalist Papers sous leurs propres noms plutôt que sous le pseudonyme collectif « Publius » : la force de persuasion de ces lettres en aurait-elle été changée ?</li>
        <li>Pourquoi une lettre de refus doit-elle malgré tout exprimer un regret et des encouragements, plutôt que de se limiter à annoncer sèchement la décision prise ?</li>
        <li>Quelle serait la conséquence, pour la crédibilité professionnelle d'un candidat, d'une self introduction orale récitée mécaniquement comme une liste de faits plutôt que présentée avec fluidité et naturel ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>A. Hamilton, J. Madison, J. Jay, <em>The Federalist Papers</em>, 1787-1788 — la série de lettres argumentées la plus influente de l'histoire politique américaine.</li>
        <li>R. Quirk et al., <em>A Comprehensive Grammar of the English Language</em>, Longman — référence sur le registre formel de l'anglais écrit.</li>
        <li>Documentation professionnelle sur les usages modernes de LinkedIn et des candidatures vidéo — pour une application contemporaine des principes de ce chapitre.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais rédiger une letter to the editor argumentée, composer des lettres d'invitation, d'acceptation et de refus, et préparer une self introduction orale claire et complète — clôturant ainsi la matière « Anglais scientifique », et avec elle l'intégralité du programme de première année de Licence (L1). Comme le montrent les Federalist Papers, rédigés lettre après lettre pour convaincre progressivement toute une nation : une compétence patiemment construite, chapitre après chapitre, finit par former un socle solide sur lequel bâtir tout le reste — félicitations pour être arrivé jusqu'ici.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>La letter to the editor suit 5 étapes : rappel du sujet → position → argument principal → preuves → solution proposée</li>
        <li>Le registre formel impose : pas de contractions, vocabulaire soutenu, 1ère/3ème personne</li>
        <li>Invitation, acceptation et refus partagent une logique commune : remerciement + information claire + politesse</li>
        <li>Une self introduction orale suit un ordre logique : identité → parcours → objectifs → personnalité</li>
      </ul>
      <p class="recap-note">Teste ces repères avec les exercices ci-dessous.</p>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser des contractions ("don't", "it's") dans une lettre formelle</li>
        <li>Développer plusieurs sujets dans une letter to the editor, qui doit rester courte et focalisée</li>
        <li>Oublier de préciser la raison du refus dans une lettre de déclinaison, ce qui la rend abrupte</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans une letter to the editor, que doit-on faire en priorité, avant même les preuves ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an7e1" value="right"> Énoncer clairement sa position sur le sujet</label>
          <label class="option"><input type="radio" name="an7e1" value="wrong"> Proposer immédiatement une solution</label>
          <label class="option"><input type="radio" name="an7e1" value="wrong"> Citer plusieurs statistiques différentes</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an7e1','an7fb1','Correct — on énonce sa position avant de la développer et de la prouver.','Relis l\\'ordre des cinq étapes : que vient juste après le rappel du sujet ?')">Vérifier</button>
        <div class="feedback" id="an7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quelle contraction est à éviter dans une lettre formelle ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an7e2" value="right"> don't</label>
          <label class="option"><input type="radio" name="an7e2" value="wrong"> do not</label>
          <label class="option"><input type="radio" name="an7e2" value="wrong"> cannot</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an7e2','an7fb2','Correct — les contractions comme \\'don\\'t\\' sont à bannir du registre formel écrit.','Une seule de ces trois formes est une contraction familière.')">Vérifier</button>
        <div class="feedback" id="an7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans une self introduction orale, quel bloc vient logiquement en dernier ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an7e3" value="wrong"> Identité</label>
          <label class="option"><input type="radio" name="an7e3" value="wrong"> Parcours scolaire</label>
          <label class="option"><input type="radio" name="an7e3" value="right"> Personnalité / centres d'intérêt</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an7e3','an7fb3','Correct — on termine généralement par les traits de personnalité et les centres d\\'intérêt.','Reviens à l\\'ordre en quatre blocs du cours : identité, parcours, objectifs, puis...')">Vérifier</button>
        <div class="feedback" id="an7fb3"></div>
      </div>
    </div>
  `
};

ANGLAIS_NOVA_KB[angKey('Communication professionnelle : lettres formelles et prise de parole')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Lettres formelles et prise de parole ». Demande-moi la structure d'une letter to the editor, une des trois lettres (invitation/acceptation/refus), ou un indice sur un exercice.",
  rules: [
    { test:/editor|[ée]diteur/i, replies:["La letter to the editor suit 5 étapes : rappel du sujet → position → argument principal → preuves → solution proposée."] },
    { test:/invitation/i, replies:["Une lettre d'invitation précise : la raison, la structure organisatrice, la date/l'heure, le sujet précis, et les arrangements prévus."] },
    { test:/acceptation|accept/i, replies:["Une lettre d'acceptation remercie, confirme clairement sa venue, et précise les besoins matériels éventuels."] },
    { test:/refus|d[ée]clin/i, replies:["Une lettre de refus remercie, exprime le regret, donne une raison brève et polie, puis encourage l'événement."] },
    { test:/self introduction|pr[ée]sentation orale/i, replies:["Une self introduction orale suit un ordre logique : identité → parcours → objectifs → personnalité, avec des connecteurs simples pour rester fluide."] },
    { test:/formel|contraction/i, replies:["Le registre formel écrit exclut les contractions (don't, it's) et privilégie un vocabulaire soutenu, à la 1ère ou 3ème personne."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : reviens à l'ordre des cinq étapes de la letter to the editor.","Indice niveau 2 : cette étape vient juste après le rappel du sujet.","Indice niveau 3 : c'est énoncer sa position."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : une seule des trois formes proposées est une contraction familière.","Indice niveau 2 : elle combine deux mots avec une apostrophe.","Indice niveau 3 : c'est 'don't'."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : reviens à l'ordre en quatre blocs du cours.","Indice niveau 2 : après identité, parcours et objectifs, il reste un dernier bloc.","Indice niveau 3 : c'est personnalité / centres d'intérêt."] }
  ]
};

/* fusion dans les registres globaux, comme pour les autres matières */
Object.assign(MATH_TOOLS_CHAPTERS, ANGLAIS_CHAPTERS);
Object.assign(NOVA_KB, ANGLAIS_NOVA_KB);