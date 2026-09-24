/* =====================================================================
   CHUNK « techexpr » — registre TECHEXPR_CHAPTERS / TECHEXPR_NOVA_KB
   Matière(s) : Autres|Technique d'expression écrite et orale
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   TECHEXPR_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ===================================================================================
   COURS "TECHNIQUE D'EXPRESSION ÉCRITE ET ORALE" — contenu rédigé
   Domaine "Autres" · Licence 1 · 6 chapitres (Techniques d'expression 1 & 2, S3-S4)
   Inspiré du polycopié pédagogique "Techniques d'expression 1 et 2" de Dr Adila
   MEHYAOUI (ENPO-MA, 2022-2023) — notions reformulées et exemples/exercices
   originaux, adaptés au format interactif de la plateforme.
=================================================================================== */
const TECHEXPR_MATIERE = "Technique d'expression écrite et orale";
function teKey(chapterTitle){ return `Autres|${TECHEXPR_MATIERE}|${chapterTitle}`; }

const TECHEXPR_CHAPTERS = {};
const TECHEXPR_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
TECHEXPR_CHAPTERS[teKey('Rédiger un texte explicatif')] = {
  objectives: [
    "Identifier la structure d'un texte explicatif",
    "Structurer une trame explicative",
    "Rédiger un texte explicatif",
    "Évaluer en quoi l'exigence de Fontenelle — rendre une notion complexe accessible sans la trahir ni la simplifier à l'excès — reste, plus de trois siècles plus tard, le défi central de tout texte de vulgarisation scientifique"
  ],
  prereqs: ["Contenus du cours de français 1 et 2 (1ère année FPST)"],
  bodyHtml: `
    <p>En 1686, l'écrivain et scientifique français Bernard Le Bovier de Fontenelle publia <em>Entretiens sur la pluralité des mondes</em>, un dialogue imaginaire où il explique à une marquise, dans un langage accessible et sans jamais sacrifier l'exactitude scientifique, les découvertes de l'astronomie copernicienne. Cet ouvrage, l'un des tout premiers succès de vulgarisation scientifique en langue française, posa une exigence qui reste, plus de trois siècles plus tard, celle de tout texte explicatif réussi : rendre une notion complexe accessible sans jamais la trahir ni la simplifier à l'excès.</p>
    <p>Cette exigence est plus délicate qu'il n'y paraît : simplifier trop peut déformer la réalité scientifique au point de la rendre fausse, tandis que rester trop technique perd le lecteur non spécialiste que l'on cherche justement à informer. C'est précisément pour tenir cet équilibre que les cinq procédés explicatifs de ce chapitre — comparaison, définition, reformulation, exemple, illustration — ont été systématisés : chacun offre une façon différente de rendre concret ce qui, exprimé abstraitement, resterait obscur pour un lecteur non initié.</p>
    <p>La <strong>vulgarisation scientifique</strong> vise à rendre une notion scientifique accessible à un large public, en conservant la rigueur du fond tout en simplifiant la forme. Le <strong>texte explicatif</strong> en est l'outil principal : il répond à des questions du type « Pourquoi ? » et « Comment ? » en s'appuyant sur des faits vérifiables, jamais sur une opinion. À la fin de ce chapitre, tu sauras structurer et rédiger un texte explicatif complet, en combinant judicieusement les procédés et les marqueurs de relation appropriés.</p>

    <h3>1. La structure en trois phases</h3>
    <p>Un texte explicatif suit toujours la même architecture :</p>
    <table class="mini-table">
      <tr><th>Phase</th><th>Rôle</th><th>Amorce typique</th></tr>
      <tr><td><strong>Questionnement</strong></td><td>Pose la question à laquelle le texte va répondre</td><td>« Pourquoi... ? », « Comment... ? »</td></tr>
      <tr><td><strong>Explicative</strong></td><td>Développe les causes ou les étapes, une à une</td><td>« Parce que... », « D'abord... ensuite... »</td></tr>
      <tr><td><strong>Conclusive</strong></td><td>Résume et ouvre sur une réflexion, une autre piste</td><td>« En résumé... », « Cela dit... »</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Dans la phase explicative, deux logiques sont possibles : une simple <em>énumération de causes</em> indépendantes, ou un <em>enchaînement</em> où chaque cause devient la conséquence de la précédente (cause 1 → conséquence 1 → cause 2...).
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Choisir entre une simple énumération de causes indépendantes et un enchaînement où chaque cause découle de la précédente n'est pas un détail stylistique. En quoi ce choix reflète-t-il une différence réelle dans la nature du phénomène expliqué : certains phénomènes ont-ils plusieurs causes indépendantes, quand d'autres suivent une chaîne de causalité unique ?
    </div>

    <h3>2. Les cinq procédés explicatifs</h3>
    <p>Pour développer une explication, on dispose de cinq outils que l'on peut combiner :</p>
    <div class="example-box">
      <span class="eyebrow">Les cinq procédés</span>
      <p><strong>La comparaison</strong> — rapprocher deux idées avec « comme » pour faire ressortir une ressemblance. <em>Ex. : Une cellule solaire fonctionne comme un petit interrupteur activé par la lumière.</em></p>
      <p><strong>La définition</strong> — préciser le sens exact d'une notion technique avant de l'utiliser.</p>
      <p><strong>La reformulation</strong> — reprendre une idée avec d'autres mots, introduite par « c'est-à-dire », « autrement dit ».</p>
      <p><strong>L'exemple</strong> — ancrer l'explication dans du concret, introduit par « par exemple », « notamment ».</p>
      <p class="example-answer">L'illustration (schéma, photo, graphique) complète souvent ces quatre procédés à l'écrit.</p>
    </div>

    <h3>3. Les marqueurs de relation</h3>
    <p>Ce sont les mots-charnières qui rendent visible la logique du texte. Bien choisis, ils guident le lecteur sans effort :</p>
    <table class="mini-table">
      <tr><th>Relation</th><th>Marqueurs</th></tr>
      <tr><td>Explication / cause</td><td>en effet, car, puisque, étant donné que</td></tr>
      <tr><td>Conséquence</td><td>donc, par conséquent, c'est pourquoi</td></tr>
      <tr><td>Illustration</td><td>par exemple, notamment, ainsi</td></tr>
      <tr><td>Opposition / restriction</td><td>cependant, toutefois, or, bien que</td></tr>
      <tr><td>Synthèse / conclusion</td><td>bref, en somme, en définitive</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      À ne pas confondre avec les <strong>organisateurs textuels</strong> : ceux-ci n'articulent pas deux idées à l'intérieur d'une phrase, mais signalent la transition d'un paragraphe à l'autre (temps : « puis, le lendemain » ; lieu : « plus loin » ; succession : « d'abord, ensuite, enfin » ; explication : « autrement dit, car » ; conclusion : « en somme, finalement »).
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Confondre marqueurs de relation (à l'intérieur d'une phrase) et organisateurs textuels (entre paragraphes) peut sembler un détail grammatical mineur. Pourquoi cette distinction devient-elle pourtant très concrète pour le lecteur, qui perd le fil d'un texte mal articulé même s'il comprend chaque phrase prise isolément ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Question :</strong> Pourquoi le ciel apparaît-il bleu le jour ?</p>
      <p><strong>Explication :</strong> La lumière du soleil, blanche, est en réalité composée de toutes les couleurs. En traversant l'atmosphère, elle rencontre les molécules d'air qui diffusent surtout les courtes longueurs d'onde — le bleu — dans toutes les directions. C'est cette lumière bleue diffusée qui nous parvient de partout dans le ciel.</p>
      <p class="example-answer">Conclusion : le bleu du ciel n'est donc pas la couleur du soleil, mais l'effet d'une diffusion sélective par l'atmosphère.</p>
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>L'héritage de Fontenelle se prolonge aujourd'hui sous des formes que le philosophe du XVIIe siècle n'aurait jamais pu imaginer : les chaînes de vulgarisation scientifique sur internet, regardées par des millions de personnes, reposent sur exactement les mêmes procédés explicatifs que ceux de ce chapitre — comparaison, exemple concret, reformulation — simplement adaptés au format vidéo. Les recherches en sciences cognitives confirment d'ailleurs scientifiquement l'intuition de Fontenelle : une bonne analogie ou comparaison facilite mesurablement la compréhension et la mémorisation d'un concept abstrait, en le reliant à une connaissance déjà familière du lecteur ou du spectateur.</p>
    <p><strong>Question ouverte :</strong> une comparaison efficace pour expliquer un concept peut-elle, si elle est mal choisie ou poussée trop loin, créer chez le lecteur une compréhension en réalité erronée du phénomène qu'elle est censée clarifier ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>assistants de rédaction par intelligence artificielle</strong> sont aujourd'hui capables de proposer automatiquement des reformulations ou des analogies pour un texte technique donné, un outil précieux pour vérifier qu'une explication reste accessible sans en avoir soi-même conscience.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Notion scientifique à expliquer → questionnement (Pourquoi ? Comment ?) → phase explicative (procédés : comparaison, définition, reformulation, exemple, illustration) → marqueurs de relation pour articuler la logique → phase conclusive (résumé + ouverture)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Rigueur scientifique} + \\text{Accessibilité} = \\text{Vulgarisation réussie}$$
      Cet équilibre, hérité directement de l'exigence posée par Fontenelle en 1686, résume tout l'enjeu du texte explicatif : ni une simplification qui trahit la réalité scientifique, ni une exactitude si technique qu'elle en devient incompréhensible pour le lecteur visé.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Fontenelle avait choisi d'écrire ses Entretiens dans un style purement technique, sans le dialogue imaginaire avec la marquise : son ouvrage aurait-il connu le même succès et la même postérité comme modèle de vulgarisation scientifique ?</li>
        <li>Pourquoi un texte explicatif efficace évite-t-il presque toujours d'empiler plusieurs procédés explicatifs différents sur la même idée, préférant en général un procédé bien choisi à plusieurs procédés superposés ?</li>
        <li>Quelle serait la conséquence, pour la diffusion des connaissances scientifiques au grand public aujourd'hui, d'une absence totale de vulgarisation accessible, où seuls les textes techniques spécialisés existeraient ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>B. Le Bovier de Fontenelle, <em>Entretiens sur la pluralité des mondes</em>, 1686 — l'un des tout premiers succès de vulgarisation scientifique en langue française.</li>
        <li>D. Jacobi, <em>La communication scientifique</em>, Presses universitaires de Grenoble — référence académique sur les procédés de vulgarisation scientifique.</li>
        <li>G. Lakoff, M. Johnson, <em>Metaphors We Live By</em>, University of Chicago Press — sur le rôle cognitif de l'analogie et de la comparaison dans la compréhension de concepts abstraits.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais structurer et rédiger un texte explicatif complet, en combinant judicieusement les procédés et les marqueurs de relation appropriés. Le chapitre suivant, « Argumenter », te fera passer de l'explication objective à la défense d'un point de vue — un exercice de rédaction exigeant une rigueur tout aussi grande, mais orientée vers un objectif différent. Comme le montre l'exemple de Fontenelle : rendre une idée complexe accessible à tous, sans jamais la trahir, reste l'un des exercices d'écriture les plus exigeants et les plus utiles qui soient.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un texte explicatif suit toujours trois phases : questionnement → explication → conclusion</li>
        <li>Cinq procédés structurent l'explication : comparaison, définition, reformulation, exemple, illustration</li>
        <li>Les marqueurs de relation rendent visible la logique interne du texte</li>
        <li>L'explication reste objective : elle s'appuie sur des faits, jamais sur une opinion</li>
      </ul>
      <p class="recap-note">Vérifie ces acquis avec les exercices ci-dessous.</p>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre le texte explicatif (objectif) et le texte argumentatif (qui défend une opinion)</li>
        <li>Enchaîner les causes sans aucun marqueur de relation, ce qui casse la lisibilité</li>
        <li>Donner un exemple sans jamais reformuler ni définir la notion abordée</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">« Un vaccin agit comme un entraînement pour le système immunitaire. » Quel procédé explicatif est utilisé ici ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="te1e1" value="wrong"> La définition</label>
          <label class="option"><input type="radio" name="te1e1" value="right"> La comparaison</label>
          <label class="option"><input type="radio" name="te1e1" value="wrong"> La reformulation</label>
          <label class="option"><input type="radio" name="te1e1" value="wrong"> L'exemple</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te1e1','te1fb1','Correct — le mot \\'comme\\' introduit un rapprochement entre deux idées : c\\'est la comparaison.','Repère le mot-outil utilisé : \\'comme\\' est le signal le plus fréquent de la comparaison.')">Vérifier</button>
        <div class="feedback" id="te1fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans quel ordre les trois phases d'un texte explicatif apparaissent-elles ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="te1e2" value="wrong"> Explicative, conclusive, questionnement</label>
          <label class="option"><input type="radio" name="te1e2" value="right"> Questionnement, explicative, conclusive</label>
          <label class="option"><input type="radio" name="te1e2" value="wrong"> Conclusive, questionnement, explicative</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te1e2','te1fb2','Correct — on pose d\\'abord la question, on développe ensuite les causes, puis on conclut.','Reviens au schéma du cours : la question vient toujours en premier, la conclusion toujours en dernier.')">Vérifier</button>
        <div class="feedback" id="te1fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Quel marqueur de relation introduirait le mieux une conséquence dans un texte explicatif ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="te1e3" value="wrong"> Cependant</label>
          <label class="option"><input type="radio" name="te1e3" value="wrong"> Par exemple</label>
          <label class="option"><input type="radio" name="te1e3" value="right"> Par conséquent</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te1e3','te1fb3','Correct — \\'par conséquent\\' annonce précisément l\\'aboutissement d\\'une cause.','\\'Cependant\\' marque une opposition et \\'par exemple\\' une illustration : cherche celui qui annonce un résultat.')">Vérifier</button>
        <div class="feedback" id="te1fb3"></div>
      </div>
    </div>
  `
};

TECHEXPR_NOVA_KB[teKey('Rédiger un texte explicatif')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Rédiger un texte explicatif ». Demande-moi la structure d'un texte explicatif, un procédé explicatif précis, ou un indice sur un exercice.",
  rules: [
    { test:/structure|phase/i, replies:["Un texte explicatif suit toujours trois phases : questionnement (la question posée), explicative (le développement des causes) et conclusive (résumé + ouverture)."] },
    { test:/procéd[ée]|comparaison|d[ée]finition|reformulation|illustration/i, replies:["Cinq procédés explicatifs existent : la comparaison (« comme »), la définition, la reformulation (« c'est-à-dire »), l'exemple et l'illustration (schéma, image)."] },
    { test:/marqueur|connecteur/i, replies:["Les marqueurs de relation rendent visible la logique du texte : « car/en effet » pour la cause, « donc/par conséquent » pour la conséquence, « cependant/or » pour l'opposition."] },
    { test:/vulgarisation/i, replies:["La vulgarisation scientifique adapte un savoir spécialisé à un public non spécialiste, sans en trahir la rigueur — c'est tout l'enjeu du texte explicatif."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repère le mot-outil employé dans la phrase.","Indice niveau 2 : le mot « comme » est le signal le plus courant d'un des cinq procédés.","Indice niveau 3 : « comme » introduit une comparaison."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : reviens au schéma en trois temps du cours.","Indice niveau 2 : la question vient toujours en tout premier.","Indice niveau 3 : c'est questionnement → explicative → conclusive."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : élimine d'abord les marqueurs d'opposition et d'illustration.","Indice niveau 2 : il reste un marqueur qui annonce un résultat, une suite logique.","Indice niveau 3 : c'est « par conséquent »."] }
  ]
};

/* =========================== CHAPITRE 2 =========================== */
TECHEXPR_CHAPTERS[teKey('Argumenter')] = {
  objectives: [
    "Définir une thèse et étayer une contre-thèse",
    "Développer des arguments et des contre-arguments",
    "Déterminer la stratégie argumentative",
    "Rédiger un texte argumentatif",
    "Rédiger une lettre ouverte",
    "Évaluer en quoi les trois leviers de persuasion identifiés par Aristote — ethos, pathos, logos — restent, plus de deux mille ans plus tard, le cadre implicite derrière chacun des procédés argumentatifs modernes étudiés dans ce chapitre"
  ],
  prereqs: ["Rédiger un texte explicatif"],
  bodyHtml: `
    <p>Au IVe siècle avant notre ère, le philosophe grec Aristote rédigea <em>La Rhétorique</em>, un traité fondateur qui distingue trois leviers de persuasion restés depuis au cœur de tout art oratoire ou argumentatif : l'ethos (la crédibilité de celui qui parle), le pathos (l'émotion suscitée chez l'auditoire) et le logos (la logique et les preuves avancées). Plus de vingt-trois siècles plus tard, les procédés argumentatifs que tu vas étudier dans ce chapitre — appel à l'autorité, fait chiffré, raisonnement déductif — restent des déclinaisons directes de ce même triptyque aristotélicien.</p>
    <p>Cette distance temporelle considérable entre Aristote et aujourd'hui n'a rien d'anecdotique : elle démontre que les mécanismes fondamentaux de la persuasion humaine, contrairement aux techniques ou aux supports qui les véhiculent, ont remarquablement peu changé. Que ce soit dans un discours politique antique, une lettre ouverte contemporaine ou un débat sur les réseaux sociaux, les mêmes leviers — crédibilité de la source, émotion suscitée, solidité de la preuve — continuent d'opérer avec une efficacité comparable.</p>
    <p>Contrairement au texte explicatif, le <strong>texte argumentatif</strong> prend position sur un sujet controversé : l'auteur y défend une <strong>thèse</strong> à l'aide d'arguments destinés à convaincre le lecteur. À la fin de ce chapitre, tu sauras construire une argumentation complète, structurée en arguments solidement fondés, et rédiger un texte argumentatif ou une lettre ouverte.</p>

    <h3>1. La structure en trois phases</h3>
    <table class="mini-table">
      <tr><th>Phase</th><th>Contenu</th></tr>
      <tr><td><strong>Introduction</strong></td><td>Sujet amené (accroche) → sujet posé (le débat) → thèse (la position choisie)</td></tr>
      <tr><td><strong>Développement</strong></td><td>Pour chaque argument : formulation → explication → fondement → conclusion partielle</td></tr>
      <tr><td><strong>Conclusion</strong></td><td>Synthèse de la thèse et des arguments, puis ouverture (réflexion, recommandation)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le sujet amené ne doit contenir <em>ni thèse ni argument</em> : son seul rôle est de capter l'attention (fait d'actualité, donnée chiffrée, anecdote) avant d'entrer dans le débat.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Révéler sa thèse dès le sujet amené peut sembler gagner du temps, mais affaiblit en réalité l'argumentation qui suit. Pourquoi le fait de d'abord capter l'attention par un fait neutre, avant de poser le débat puis seulement la thèse, rend-il la prise de position finale plus persuasive qu'une annonce immédiate ?
    </div>

    <h3>2. Les procédés argumentatifs</h3>
    <p>Pour étayer un argument, plusieurs procédés sont mobilisables : l'<strong>appel à l'autorité</strong> (citer un expert reconnu), l'<strong>exemple</strong> et le <strong>contre-exemple</strong>, le <strong>raisonnement déductif</strong> (cause → conséquence), le <strong>fait</strong> chiffré, l'<strong>analogie</strong>, et la <strong>réfutation</strong>, qui consiste à démonter un argument adverse avant de renforcer le sien.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — un argument complet</span>
      <p><strong>Formulation :</strong> Réduire l'usage du plastique à usage unique est une urgence pour les universités.</p>
      <p><strong>Explication :</strong> En effet, ces objets ne sont utilisés que quelques minutes mais mettent des siècles à se dégrader.</p>
      <p><strong>Fondement :</strong> Une étude menée sur trois campus a montré une baisse de 40 % des déchets plastiques après l'interdiction des gobelets jetables en cafétéria.</p>
      <p class="example-answer">Conclusion partielle : agir sur ce levier simple aurait donc un impact mesurable et rapide.</p>
    </div>

    <h3>3. Les modalisations</h3>
    <p>La <strong>modalisation</strong> révèle l'engagement de l'auteur derrière ses propos. Elle passe par le <strong>vocabulaire connotatif</strong> (péjoratif ou mélioratif), les <strong>auxiliaires de modalité</strong> (devoir, falloir, pouvoir), certains <strong>temps verbaux</strong> (conditionnel pour nuancer, futur pour affirmer) et les <strong>phrases exclamatives ou interrogatives</strong>.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La <strong>lettre ouverte</strong> est un texte argumentatif particulier : elle s'adresse à un destinataire précis (souvent une autorité) tout en visant un large public, et suit la même structure thèse / arguments / fondements.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une lettre ouverte s'adresse formellement à un destinataire précis (une autorité) tout en visant en réalité un public bien plus large qui la lira. En quoi ce double destinataire — l'un nommé, l'autre implicite — oblige-t-il l'auteur à adapter simultanément son ton à deux exigences différentes : la précision attendue par l'autorité visée, et l'accessibilité attendue par le grand public ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>Le triptyque d'Aristote a aussi un revers bien documenté : les mêmes leviers de persuasion peuvent être détournés en <strong>sophismes</strong> (des raisonnements fallacieux mais superficiellement convaincants), comme l'appel à l'autorité abusif (citer un expert hors de son domaine de compétence) ou l'attaque personnelle déguisée en réfutation (critiquer l'auteur d'un argument plutôt que l'argument lui-même). À l'ère des réseaux sociaux, où l'argumentation circule à très grande vitesse et souvent sans vérification, la capacité à distinguer un argument solide d'un sophisme habilement construit est devenue une compétence citoyenne essentielle, au cœur des mouvements modernes d'éducation aux médias et à l'esprit critique.</p>
    <p><strong>Question ouverte :</strong> comment distinguer, dans un débat public rapide comme celui des réseaux sociaux, un raisonnement rigoureux d'un sophisme habilement construit qui en imite superficiellement la forme ?</p>
    <p><strong>Technologie émergente :</strong> les plateformes de <strong>vérification des faits</strong> (fact-checking) et les outils d'analyse automatique de discours, aujourd'hui développés notamment à l'aide de l'intelligence artificielle, tentent de détecter automatiquement les sophismes et les affirmations non fondées dans un flot massif de contenus argumentatifs.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Sujet controversé → thèse (position de l'auteur) → arguments (formulation → explication → fondement → conclusion partielle) → procédés argumentatifs (autorité, exemple, analogie, réfutation) → modalisation (degré d'engagement) → conclusion (synthèse + ouverture)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Ethos (crédibilité)} + \\text{Pathos (émotion)} + \\text{Logos (logique)} = \\text{Persuasion}$$
      Ce triptyque aristotélicien, vieux de plus de deux mille ans, reste le cadre implicite derrière chaque procédé argumentatif de ce chapitre : l'appel à l'autorité mobilise l'ethos, la modalisation et l'anecdote mobilisent le pathos, le raisonnement déductif et le fait chiffré mobilisent le logos.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Aristote n'avait jamais formalisé la distinction entre ethos, pathos et logos : les techniques argumentatives modernes se seraient-elles développées de façon aussi structurée, ou seulement de manière empirique et dispersée ?</li>
        <li>Pourquoi un argument fondé uniquement sur le pathos (l'émotion), sans aucun fondement de type logos (fait, preuve, raisonnement), reste-t-il fragile face à une réfutation rigoureuse ?</li>
        <li>Quelle serait la conséquence, pour le débat public contemporain, d'une incapacité généralisée à distinguer un argument solidement fondé d'un sophisme habilement construit ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Aristote, <em>La Rhétorique</em>, IVe siècle av. J.-C. — le traité fondateur du triptyque ethos/pathos/logos.</li>
        <li>C. Perelman, L. Olbrechts-Tyteca, <em>Traité de l'argumentation</em>, Presses universitaires de Bruxelles — référence moderne sur la théorie de l'argumentation.</li>
        <li>N. Cook, <em>A Field Guide to Lies and Statistics</em>, W. W. Norton — sur la détection des raisonnements fallacieux et des statistiques trompeuses dans l'argumentation contemporaine.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais construire une argumentation complète, structurée en arguments solidement fondés, et rédiger un texte argumentatif ou une lettre ouverte. Le chapitre suivant, « Prendre la parole / Gérer une conversation », transposera cette même rigueur argumentative à l'oral, où les mêmes leviers de persuasion opèrent avec des contraintes différentes. Comme le rappelle l'héritage d'Aristote : convaincre durablement exige toujours un équilibre entre crédibilité, émotion et logique — négliger l'un de ces trois piliers fragilise inévitablement les deux autres.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le texte argumentatif défend une thèse claire, à la différence du texte explicatif qui reste neutre</li>
        <li>Chaque argument se construit en quatre temps : formulation, explication, fondement, conclusion partielle</li>
        <li>Les procédés argumentatifs (exemple, fait, analogie, réfutation...) donnent de la force à un argument</li>
        <li>La modalisation (vocabulaire, temps verbaux, auxiliaires) révèle le degré d'engagement de l'auteur</li>
      </ul>
      <p class="recap-note">Passe aux exercices pour tester ces notions.</p>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Révéler la thèse dès le sujet amené, avant même d'avoir posé le débat</li>
        <li>Formuler un argument sans jamais l'appuyer sur un fondement concret (fait, exemple, statistique)</li>
        <li>Attaquer la personne qui défend la thèse adverse plutôt que ses arguments</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">« Selon l'OMS, réduire le sel dans l'alimentation diminue les risques cardiovasculaires. » Quel procédé argumentatif est utilisé ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="te2e1" value="wrong"> L'analogie</label>
          <label class="option"><input type="radio" name="te2e1" value="right"> L'appel à l'autorité</label>
          <label class="option"><input type="radio" name="te2e1" value="wrong"> Le contre-exemple</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te2e1','te2fb1','Correct — citer une institution reconnue (l\\'OMS) pour appuyer un propos, c\\'est l\\'appel à l\\'autorité.','Regarde qui est cité dans la phrase : une organisation reconnue vient renforcer la crédibilité du propos.')">Vérifier</button>
        <div class="feedback" id="te2fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quel élément ne doit jamais apparaître dans le sujet amené d'une introduction argumentative ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="te2e2" value="wrong"> Un fait d'actualité</label>
          <label class="option"><input type="radio" name="te2e2" value="wrong"> Une donnée chiffrée</label>
          <label class="option"><input type="radio" name="te2e2" value="right"> La thèse de l'auteur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te2e2','te2fb2','Correct — le sujet amené doit seulement capter l\\'attention, sans dévoiler ni thèse ni argument.','Le sujet amené sert uniquement d\\'accroche : la prise de position vient plus tard, à l\\'étape \\'thèse\\'.')">Vérifier</button>
        <div class="feedback" id="te2fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">« Il faudrait sans doute revoir cette politique. » Quel outil de modalisation nuance ici le propos ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="te2e3" value="right"> Le conditionnel</label>
          <label class="option"><input type="radio" name="te2e3" value="wrong"> Le futur simple</label>
          <label class="option"><input type="radio" name="te2e3" value="wrong"> La phrase exclamative</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te2e3','te2fb3','Correct — \\'faudrait\\' est un conditionnel : il atténue l\\'affirmation et suggère une possibilité plutôt qu\\'une certitude.','Observe la terminaison du verbe \\'faudrait\\' : c\\'est un temps qui sert justement à nuancer une affirmation.')">Vérifier</button>
        <div class="feedback" id="te2fb3"></div>
      </div>
    </div>
  `
};

TECHEXPR_NOVA_KB[teKey('Argumenter')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Argumenter ». Demande-moi la structure d'un texte argumentatif, un procédé argumentatif, ou un indice sur un exercice.",
  rules: [
    { test:/th[èe]se/i, replies:["La thèse est la prise de position claire de l'auteur sur le sujet posé — elle doit être sans ambiguïté (pour, contre, ou nuancée) et annoncée en fin d'introduction."] },
    { test:/structure|phase|introduction|d[ée]veloppement|conclusion/i, replies:["Trois phases : introduction (sujet amené → sujet posé → thèse), développement (un argument par paragraphe, avec formulation, explication et fondement), conclusion (synthèse + ouverture)."] },
    { test:/proc[ée]d[ée]|autorit[ée]|analogie|r[ée]futation/i, replies:["Procédés utiles : appel à l'autorité (citer un expert), exemple/contre-exemple, fait chiffré, analogie, et réfutation (démonter l'argument adverse avant de renforcer le sien)."] },
    { test:/modalisation|connotat|conditionnel/i, replies:["La modalisation montre l'engagement de l'auteur : vocabulaire connotatif, auxiliaires (devoir, pouvoir), conditionnel pour nuancer, futur pour affirmer, phrases exclamatives pour marquer une réaction."] },
    { test:/lettre ouverte/i, replies:["La lettre ouverte est un texte argumentatif adressé à une personne précise mais lu par un large public : elle garde la même logique thèse / arguments / fondements, avec une formule d'appel et parfois une signature."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : regarde qui est cité dans la phrase.","Indice niveau 2 : une institution reconnue est mentionnée pour appuyer le propos.","Indice niveau 3 : c'est l'appel à l'autorité."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : rappelle-toi le rôle unique du sujet amené.","Indice niveau 2 : il sert seulement d'accroche, rien de plus.","Indice niveau 3 : la thèse ne doit jamais y apparaître."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : regarde la terminaison du verbe conjugué.","Indice niveau 2 : « faudrait » se termine en -rait, une forme typique d'un temps précis.","Indice niveau 3 : c'est le conditionnel."] }
  ]
};

/* =========================== CHAPITRE 3 =========================== */
TECHEXPR_CHAPTERS[teKey('Prendre la parole / Gérer une conversation')] = {
  objectives: [
    "Initier une conversation et prendre la parole",
    "Défendre une idée devant un auditoire",
    "Évaluer en quoi la méthode de réfutation socratique et le format structuré des débats Lincoln-Douglas de 1858 ont façonné, chacun à leur manière, les règles du débat oral moderne présentées dans ce chapitre"
  ],
  prereqs: ["Argumenter"],
  bodyHtml: `
    <p>Dans l'Athènes du Ve siècle avant notre ère, le philosophe Socrate développa une méthode de dialogue restée célèbre sous le nom de maïeutique ou d'<em>elenchus</em> : plutôt que d'affirmer directement sa propre thèse, il interrogeait patiemment son interlocuteur jusqu'à ce que celui-ci découvre par lui-même les contradictions internes de sa position. Cette technique, l'une des toutes premières formes structurées de réfutation documentées dans l'histoire, repose sur exactement le même principe que celui de ce chapitre : démonter méthodiquement une position adverse, étape par étape, plutôt que de se contenter de la contredire frontalement.</p>
    <p>Le format du débat structuré que tu vas étudier — avec ses phases d'introduction, d'exposition des arguments, de réfutation puis de questions-réponses — doit également beaucoup aux célèbres débats Lincoln-Douglas de 1858 aux États-Unis, où Abraham Lincoln et Stephen Douglas s'affrontèrent lors de sept débats publics rigoureusement chronométrés et structurés, sur la question de l'esclavage. Ce format, avec son partage précis du temps de parole et son rôle de modérateur neutre, a directement inspiré l'organisation des débats politiques et scolaires modernes, y compris celui présenté dans ce chapitre.</p>
    <p>Convaincre un auditoire ne se limite pas à exposer sa propre thèse : il faut aussi savoir <strong>réagir</strong> à la thèse adverse. C'est l'objet de la <strong>stratégie argumentative</strong>, qui combine explication et réfutation. À la fin de ce chapitre, tu sauras structurer une réfutation efficace et organiser ou suivre un débat oral dans les règles.</p>

    <h3>1. Deux stratégies argumentatives</h3>
    <table class="mini-table">
      <tr><th>Stratégie</th><th>Principe</th></tr>
      <tr><td><strong>Explication argumentative</strong></td><td>Développer sa propre thèse pour convaincre de sa validité</td></tr>
      <tr><td><strong>Réfutation</strong></td><td>Démontrer les failles de la thèse adverse pour mieux défendre la sienne</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — schéma de la réfutation</span>
      Une réfutation part toujours de la <strong>contre-thèse</strong> (introduction), s'appuie sur un ou plusieurs <strong>contre-arguments</strong> (développement) pour aboutir à sa propre <strong>thèse</strong> (conclusion) : elle ne se contente pas de contredire, elle démonte méthodiquement la position adverse avant d'affirmer la sienne.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une réfutation efficace ne se contente jamais de dire « c'est faux » : elle part de la contre-thèse, développe des contre-arguments précis, puis affirme sa propre thèse. En quoi cette structure méthodique, héritée de la démarche socratique, rend-elle une réfutation bien plus convaincante qu'une simple contradiction directe et non argumentée ?
    </div>

    <p>Concrètement, réfuter peut consister à déclarer la thèse adverse dépassée, à dénoncer ses contradictions, à lui opposer une exception, à pousser son raisonnement jusqu'à l'absurde, à avancer une hypothèse qui en invalide les conclusions, ou encore à concéder un point mineur pour mieux affirmer l'essentiel.</p>

    <h3>2. Les moyens linguistiques de la réfutation</h3>
    <p>Trois outils reviennent constamment :</p>
    <div class="example-box">
      <span class="eyebrow">Trois structures-clés</span>
      <p><strong>Opposition :</strong> « Cet aspect peut sembler positif, alors qu'il n'en est rien en pratique. »</p>
      <p><strong>Concession :</strong> « Bien que cette mesure ait des avantages, on ne peut ignorer ses effets négatifs. »</p>
      <p class="example-answer">Hypothèse : « Si l'on continuait ainsi, les conséquences seraient bien plus graves. »</p>
    </div>

    <h3>3. Organiser et suivre un débat</h3>
    <p>Un débat oral respecte généralement une structure en cinq temps : introduction (présentation de la problématique et des thèses), présentation des arguments de chaque camp, réfutation des arguments adverses, session de questions-réponses, puis conclusion et délibération.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le rôle du <strong>modérateur</strong> est central : il distribue la parole équitablement, veille à ce que personne ne soit coupé et garde une posture neutre tout au long du débat.
    </div>
    <p>À l'oral, quelques règles simples améliorent nettement la qualité d'une intervention : marquer une pause après une phrase de transition, utiliser des phrases courtes pour rester audible, et toujours critiquer l'argument plutôt que la personne qui le porte.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le rôle du modérateur, qui distribue équitablement la parole sans jamais prendre parti, est aussi exigeant que discret : son succès se mesure justement à son invisibilité, quand le débat se déroule sans incident. Pourquoi un débat mal modéré — où la parole n'est pas équitablement distribuée — peut-il fausser la perception du public sur la force réelle de chaque argument, indépendamment de sa qualité intrinsèque ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>Les techniques de réfutation structurée héritées de Socrate ont récemment trouvé une application inattendue en intelligence artificielle : en 2019, le système Project Debater développé par IBM affronta publiquement un champion de débat humain, générant en temps réel des arguments et des réfutations sur des sujets qu'il découvrait à l'instant même, à partir de l'analyse de millions de textes. Ce projet illustre à quel point la structure rigoureuse de l'argumentation et de la réfutation — sujet amené, thèse, contre-arguments, conclusion — peut être formalisée au point d'être partiellement automatisée, tout en révélant aussi les limites actuelles de l'IA face à la subtilité rhétorique et émotionnelle d'un débatteur humain expérimenté.</p>
    <p><strong>Question ouverte :</strong> un système d'intelligence artificielle capable de générer des arguments convaincants sur n'importe quel sujet, y compris des positions fausses ou trompeuses, pose-t-il un risque particulier pour la qualité du débat public si un tel outil devient largement accessible ?</p>
    <p><strong>Technologie émergente :</strong> les formats de <strong>débat compétitif structuré</strong> (comme le World Schools Debate, pratiqué dans des centaines de pays), qui imposent des temps de parole stricts et des rôles précis à chaque intervenant, prolongent aujourd'hui à l'échelle internationale l'héritage du format Lincoln-Douglas dans l'enseignement de l'argumentation orale.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Sujet controversé → deux stratégies possibles (expliquer sa thèse, réfuter la thèse adverse) → réfutation structurée (contre-thèse → contre-arguments → thèse) → moyens linguistiques (opposition, concession, hypothèse) → débat organisé en 5 phases avec modérateur neutre
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Contre-thèse} \\rightarrow \\text{Contre-arguments} \\rightarrow \\text{Thèse}$$
      Ce schéma en trois temps, hérité de la méthode dialectique socratique, résume la logique de toute réfutation efficace : elle ne rejette jamais brutalement la position adverse, elle la présente d'abord fidèlement, avant de la démonter méthodiquement pour mieux affirmer sa propre position.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Socrate avait choisi d'affirmer directement ses positions plutôt que d'interroger patiemment ses interlocuteurs par la maïeutique : sa méthode aurait-elle eu la même postérité intellectuelle sur plus de deux mille ans ?</li>
        <li>Pourquoi critiquer systématiquement l'argument plutôt que la personne qui le porte n'est-il pas qu'une question de politesse, mais une condition d'efficacité réelle de la réfutation ?</li>
        <li>Quelle serait la conséquence, pour la qualité du débat public, d'une généralisation d'outils d'intelligence artificielle capables de générer des arguments convaincants sur n'importe quelle position, vraie ou fausse ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Platon, <em>Dialogues socratiques</em> (notamment le <em>Gorgias</em>), IVe siècle av. J.-C. — les textes témoignant de la méthode dialectique socratique.</li>
        <li>Transcriptions des débats Lincoln-Douglas, 1858 — le format fondateur du débat politique structuré moderne.</li>
        <li>N. Slonim et al., « An autonomous debating system », Nature, 2021 — l'article présentant Project Debater d'IBM.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais structurer une réfutation efficace et organiser ou suivre un débat oral dans les règles. Le chapitre suivant, « Produire un texte technique : le compte-rendu », te fera passer de l'argumentation persuasive à la restitution fidèle et objective d'un échange déjà tenu. Comme le montre l'héritage de Socrate : la meilleure façon de faire progresser une idée n'est pas toujours de l'imposer, mais souvent de la confronter méthodiquement, avec rigueur et respect, à ce qui pourrait la contredire.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Deux stratégies complémentaires : expliquer sa thèse et réfuter la thèse adverse</li>
        <li>Une bonne réfutation utilise l'opposition, la concession ou l'hypothèse pour affaiblir l'argument adverse</li>
        <li>Un débat suit cinq phases : introduction, arguments, réfutation, questions, conclusion</li>
        <li>À l'oral, on critique toujours l'argument, jamais la personne</li>
      </ul>
      <p class="recap-note">Applique ces repères dans les exercices ci-dessous.</p>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre réfuter un argument et attaquer la personne qui le défend</li>
        <li>Couper la parole au lieu d'attendre son tour lors d'un débat</li>
        <li>Enchaîner les phrases sans aucune pause, ce qui nuit à la compréhension à l'oral</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">« Même si le télétravail réduit les trajets, il isole parfois les employés. » Quel moyen linguistique de réfutation est utilisé ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="te3e1" value="wrong"> L'hypothèse</label>
          <label class="option"><input type="radio" name="te3e1" value="right"> La concession</label>
          <label class="option"><input type="radio" name="te3e1" value="wrong"> Le fait chiffré</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te3e1','te3fb1','Correct — \\'même si\\' concède un point positif avant d\\'affirmer un aspect négatif : c\\'est la concession.','Le connecteur \\'même si\\' est le signal typique d\\'une des trois structures de réfutation présentées dans le cours.')">Vérifier</button>
        <div class="feedback" id="te3fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un débat, à quel moment intervient la réfutation des arguments adverses ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="te3e2" value="wrong"> Avant l'introduction</label>
          <label class="option"><input type="radio" name="te3e2" value="right"> Après la présentation des arguments de chaque camp</label>
          <label class="option"><input type="radio" name="te3e2" value="wrong"> Après la délibération finale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te3e2','te3fb2','Correct — on ne peut réfuter des arguments qu\\'une fois qu\\'ils ont été présentés par l\\'autre camp.','Reviens à l\\'ordre des cinq phases du débat : la réfutation suppose que les arguments aient déjà été exposés.')">Vérifier</button>
        <div class="feedback" id="te3fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Quel est le rôle principal du modérateur d'un débat ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="te3e3" value="wrong"> Défendre sa propre thèse</label>
          <label class="option"><input type="radio" name="te3e3" value="right"> Distribuer la parole équitablement et rester neutre</label>
          <label class="option"><input type="radio" name="te3e3" value="wrong"> Choisir le camp gagnant</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te3e3','te3fb3','Correct — le modérateur garantit l\\'équité des échanges sans prendre parti.','Le modérateur n\\'est ni juge ni participant : son rôle est d\\'organiser la parole de façon équitable.')">Vérifier</button>
        <div class="feedback" id="te3fb3"></div>
      </div>
    </div>
  `
};

TECHEXPR_NOVA_KB[teKey('Prendre la parole / Gérer une conversation')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Prendre la parole / Gérer une conversation ». Demande-moi ce qu'est la réfutation, comment organiser un débat, ou un indice sur un exercice.",
  rules: [
    { test:/r[ée]futation/i, replies:["La réfutation consiste à démontrer les failles de la thèse adverse (exception, contradiction, hypothèse poussée jusqu'à l'absurde) pour mieux défendre sa propre thèse."] },
    { test:/concession/i, replies:["La concession admet un point positif de la thèse adverse (« bien que », « même si ») avant d'affirmer un aspect plus important qui la contredit."] },
    { test:/d[ée]bat/i, replies:["Un débat suit cinq phases : introduction (problématique + thèses), présentation des arguments, réfutation, questions du public, puis conclusion et délibération."] },
    { test:/mod[ée]rateur/i, replies:["Le modérateur distribue la parole équitablement, intervient si quelqu'un est coupé et garde une posture neutre — il ne défend aucun camp."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repère le connecteur logique utilisé dans la phrase.","Indice niveau 2 : « même si » est le signal typique d'une des trois structures.","Indice niveau 3 : c'est la concession."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : réfléchis à ce qu'il faut avoir entendu avant de pouvoir réfuter quelque chose.","Indice niveau 2 : il faut d'abord que les arguments soient présentés.","Indice niveau 3 : la réfutation vient donc après la présentation des arguments."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le modérateur ne participe pas au débat lui-même.","Indice niveau 2 : son rôle porte sur l'organisation de la parole, pas sur le contenu.","Indice niveau 3 : il distribue la parole équitablement en restant neutre."] }
  ]
};

/* =========================== CHAPITRE 4 =========================== */
TECHEXPR_CHAPTERS[teKey('Produire un texte technique : le compte-rendu')] = {
  objectives: [
    "Planifier un travail et structurer ses différentes parties",
    "Distinguer les idées essentielles et secondaires",
    "Évaluer en quoi l'exigence de fidélité et de neutralité héritée de la tradition du compte-rendu parlementaire britannique (le Hansard) structure encore aujourd'hui les règles précises du compte-rendu académique et professionnel"
  ],
  prereqs: ["Argumenter"],
  bodyHtml: `
    <p>En 1803, l'imprimeur britannique Thomas Curson Hansard commença à publier un compte-rendu régulier et fidèle des débats du Parlement britannique — un travail si rigoureux et si précieux pour la démocratie qu'il donna naissance au « Hansard », le compte-rendu officiel des débats parlementaires britanniques encore publié quotidiennement aujourd'hui, plus de deux siècles plus tard. Cette tradition illustre une exigence fondamentale que tu vas apprendre à maîtriser dans ce chapitre : restituer fidèlement le contenu d'un échange ou d'un document, sans jamais y mêler son opinion personnelle, pour que d'autres puissent s'y référer en toute confiance.</p>
    <p>Cette exigence de neutralité et de fidélité, essentielle en politique comme dans le monde professionnel, explique pourquoi le compte-rendu bannit systématiquement le « je » : un compte-rendu n'est pas un espace d'expression personnelle, mais un document de référence, potentiellement relu par des personnes qui n'étaient pas présentes et qui doivent pouvoir s'y fier entièrement pour comprendre ce qui a été dit ou écrit.</p>
    <p>Le <strong>compte-rendu</strong> est un exercice de synthèse : à partir d'un document (texte, réunion, vidéo), il s'agit de restituer, avec ses propres mots, les idées essentielles en respectant un plan clair — pas nécessairement celui du document d'origine. À la fin de ce chapitre, tu sauras produire un compte-rendu objectif ou critique, fidèle et bien structuré, à partir de n'importe quel document source.</p>

    <h3>1. À quoi sert un compte-rendu ?</h3>
    <p>Dans un contexte académique, il permet de vérifier la compréhension d'un document et la capacité à en dégager le thème et l'organisation. Dans un contexte professionnel, il informe les absents, garde une trace fiable des échanges et sert d'outil de travail pour la suite d'un projet.</p>

    <h3>2. Les règles générales</h3>
    <div class="example-box">
      <span class="eyebrow">Cinq règles à respecter systématiquement</span>
      <p><strong>1.</strong> Ne jamais utiliser « je » ou « nous » : on rapporte la pensée de l'auteur à la troisième personne.</p>
      <p><strong>2.</strong> Ne jamais recopier des phrases entières du document source.</p>
      <p><strong>3.</strong> Reformuler avec son propre style ; seuls les mots-clés techniques peuvent être repris.</p>
      <p><strong>4.</strong> Respecter la longueur demandée — généralement le tiers du texte de départ.</p>
      <p class="example-answer">5. Organiser un plan cohérent : une idée essentielle par partie, avec ses idées secondaires.</p>
    </div>

    <h3>3. Deux types de comptes-rendus académiques</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Contenu</th></tr>
      <tr><td><strong>Compte-rendu objectif</strong></td><td>Présentation (accroche) + résumé du document, sans avis personnel</td></tr>
      <tr><td><strong>Compte-rendu critique</strong></td><td>Présentation + résumé + une critique argumentée du contenu ou de la méthode</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Une accroche de compte-rendu identifie systématiquement le titre, l'auteur, la source, le type de texte et sa visée communicative, avant d'entrer dans le résumé proprement dit.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Reformuler un texte avec ses propres mots, plutôt que de recopier des phrases entières, exige de comprendre réellement le contenu avant de pouvoir le restituer. En quoi cette contrainte de reformulation, plus qu'une simple règle de forme, constitue-t-elle un test implicite de la compréhension véritable du document source ?
    </div>

    <h3>4. Avant de rédiger : la lecture</h3>
    <p>Deux niveaux de lecture préparent la rédaction : la <strong>lecture superficielle</strong> (identifier le sujet et le destinataire, en s'appuyant sur la règle des « 5 W » — qui, quoi, quand, où, pourquoi) et la <strong>lecture approfondie</strong>, qui repère les répétitions, les exemples, le ton et le champ lexical dominant du texte.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La lecture superficielle identifie rapidement le sujet et le destinataire d'un document, tandis que la lecture approfondie repère des détails plus fins comme les répétitions ou le champ lexical dominant. Pourquoi ces deux niveaux de lecture, réalisés dans cet ordre précis, sont-ils plus efficaces qu'une seule lecture unique et exhaustive dès le départ ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La tradition du compte-rendu fidèle, incarnée historiquement par le Hansard britannique, connaît aujourd'hui une transformation profonde avec les outils de <strong>résumé automatique par intelligence artificielle</strong> : des modèles de langage peuvent désormais générer en quelques secondes un compte-rendu d'une réunion enregistrée, identifiant automatiquement les décisions prises et les points de désaccord. Ces outils restent cependant confrontés aux mêmes exigences que celles de ce chapitre — fidélité au propos original, distinction entre idées essentielles et secondaires, neutralité de ton — des compétences qu'un système automatisé peine encore parfois à maîtriser aussi finement qu'un rédacteur humain expérimenté.</p>
    <p><strong>Question ouverte :</strong> un compte-rendu généré automatiquement par une intelligence artificielle peut-il un jour atteindre le même niveau de discernement qu'un rédacteur humain pour distinguer une idée réellement essentielle d'un simple détail anecdotique ?</p>
    <p><strong>Technologie émergente :</strong> les outils de <strong>transcription et synthèse automatique de réunions</strong>, aujourd'hui intégrés à de nombreux logiciels de visioconférence professionnels, combinent reconnaissance vocale et résumé automatique pour produire un compte-rendu quasi instantané, transformant une tâche autrefois longue et fastidieuse en un processus presque immédiat.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Document source (texte, réunion, vidéo) → lecture superficielle (sujet, destinataire, 5W) → lecture approfondie (répétitions, exemples, champ lexical) → plan réorganisé (idée essentielle par partie) → rédaction à la 3e personne, reformulée, au tiers de la longueur d'origine
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Fidélité au contenu} + \\text{Neutralité de ton} + \\text{Reformulation} = \\text{Compte-rendu fiable}$$
      Cette triple exigence, héritée directement de la tradition du compte-rendu parlementaire, définit ce qui distingue un bon compte-rendu d'une simple paraphrase : restituer fidèlement une pensée qui n'est pas la sienne, sans la déformer ni y mêler son propre avis, tout en la rendant accessible dans ses propres mots.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Thomas Hansard n'avait jamais entrepris de publier fidèlement les débats du Parlement britannique en 1803 : la tradition démocratique de transparence des débats publics se serait-elle développée de la même manière ?</li>
        <li>Pourquoi respecter approximativement le tiers de la longueur du texte d'origine constitue-t-il une discipline utile, plutôt qu'une contrainte arbitraire ?</li>
        <li>Quelle serait la conséquence, pour la confiance accordée à un compte-rendu de réunion professionnelle, d'un mélange systématique entre les faits rapportés et l'opinion personnelle du rédacteur ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>T. C. Hansard, <em>Hansard's Parliamentary Debates</em>, depuis 1803 — la tradition fondatrice du compte-rendu fidèle des débats publics.</li>
        <li>D. Jacobi, <em>La communication scientifique</em>, Presses universitaires de Grenoble — référence académique sur les genres de restitution de contenu (compte-rendu, résumé).</li>
        <li>Documentation des outils modernes de transcription et résumé automatique de réunions — pour une application contemporaine de l'exigence de fidélité au propos original.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais produire un compte-rendu objectif ou critique, fidèle et bien structuré, à partir de n'importe quel document source. Le chapitre suivant, « Produire un texte technique : le résumé », approfondira l'exercice de condensation, avec des contraintes de longueur encore plus strictes. Comme le montre la tradition du Hansard britannique : restituer fidèlement la pensée d'autrui, sans la déformer ni y mêler la sienne, reste l'un des exercices d'écriture les plus exigeants et les plus utiles dans la vie professionnelle.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le compte-rendu restitue les idées essentielles d'un document à la 3e personne, sans recopier</li>
        <li>Sa longueur type est le tiers du document d'origine</li>
        <li>Le compte-rendu objectif se limite au résumé ; le critique y ajoute une évaluation argumentée</li>
        <li>La lecture préparatoire (superficielle puis approfondie) conditionne la qualité du compte-rendu</li>
      </ul>
      <p class="recap-note">Passe aux exercices pour vérifier ces repères.</p>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Écrire à la première personne (« je pense que... ») dans un compte-rendu académique</li>
        <li>Recopier de longs passages du document au lieu de les reformuler</li>
        <li>Suivre exactement le plan du texte d'origine sans réorganiser les idées</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un compte-rendu académique doit être rédigé :</p>
        <div class="options">
          <label class="option"><input type="radio" name="te4e1" value="wrong"> À la première personne du singulier</label>
          <label class="option"><input type="radio" name="te4e1" value="right"> À la troisième personne</label>
          <label class="option"><input type="radio" name="te4e1" value="wrong"> À la deuxième personne</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te4e1','te4fb1','Correct — on rend compte de la pensée de l\\'auteur à la 3e personne, jamais en son nom propre.','Relis la première règle générale du cours : le \\'je\\' et le \\'nous\\' sont à bannir.')">Vérifier</button>
        <div class="feedback" id="te4fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quelle est la longueur habituellement attendue pour un compte-rendu académique ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="te4e2" value="wrong"> La moitié du texte d'origine</label>
          <label class="option"><input type="radio" name="te4e2" value="right"> Le tiers du texte d'origine</label>
          <label class="option"><input type="radio" name="te4e2" value="wrong"> Le texte intégral reformulé</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te4e2','te4fb2','Correct — la règle générale fixe la longueur autour du tiers du document de départ.','Reviens aux règles générales du cours : une des cinq règles porte précisément sur la longueur.')">Vérifier</button>
        <div class="feedback" id="te4fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Ce qui distingue un compte-rendu critique d'un compte-rendu objectif, c'est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="te4e3" value="wrong"> L'absence d'accroche</label>
          <label class="option"><input type="radio" name="te4e3" value="right"> L'ajout d'une critique argumentée après le résumé</label>
          <label class="option"><input type="radio" name="te4e3" value="wrong"> L'usage de la première personne</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te4e3','te4fb3','Correct — le compte-rendu critique ajoute une évaluation argumentée du contenu, en plus du résumé objectif.','Compare les deux définitions du cours : la seule différence porte sur l\\'ajout d\\'une partie \\'critique\\'.')">Vérifier</button>
        <div class="feedback" id="te4fb3"></div>
      </div>
    </div>
  `
};

TECHEXPR_NOVA_KB[teKey('Produire un texte technique : le compte-rendu')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Le compte-rendu ». Demande-moi les règles générales, la différence entre compte-rendu objectif et critique, ou un indice sur un exercice.",
  rules: [
    { test:/r[èe]gle/i, replies:["Cinq règles clés : 3e personne uniquement, jamais de recopie, reformulation avec ses propres mots, longueur ≈ un tiers du texte source, et un plan organisé en idées essentielles/secondaires."] },
    { test:/objectif|critique/i, replies:["Le compte-rendu objectif se limite à une accroche + un résumé fidèle. Le compte-rendu critique y ajoute une évaluation argumentée du contenu ou de la méthode de l'auteur."] },
    { test:/lecture/i, replies:["Deux niveaux de lecture préparent le compte-rendu : la lecture superficielle (règle des 5W : qui, quoi, quand, où, pourquoi) et la lecture approfondie (répétitions, exemples, ton, champ lexical)."] },
    { test:/accroche|pr[ée]sentation/i, replies:["Une bonne accroche cite le titre, l'auteur, la source et le type de texte, puis annonce sa visée communicative, avant d'entrer dans le résumé."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repense à la première règle générale vue en cours.","Indice niveau 2 : le \\'je\\' et le \\'nous\\' sont interdits dans ce type d'écrit.","Indice niveau 3 : on écrit toujours à la 3e personne."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : une des cinq règles générales fixe une proportion précise.","Indice niveau 2 : ce n'est ni la moitié ni le texte intégral.","Indice niveau 3 : c'est le tiers du document de départ."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare les deux définitions données dans le cours.","Indice niveau 2 : une seule partie supplémentaire différencie les deux types.","Indice niveau 3 : c'est l'ajout d'une critique argumentée."] }
  ]
};

/* =========================== CHAPITRE 5 =========================== */
TECHEXPR_CHAPTERS[teKey('Produire un texte technique : le résumé')] = {
  objectives: [
    "Contracter un texte en gardant sa valeur sémantique et textuelle",
    "Repérer l'idée directrice et les idées essentielles",
    "Évaluer en quoi le paradoxe formulé par Pascal — « écrire court demande plus de temps que d'écrire long » — révèle la véritable difficulté intellectuelle de l'exercice de résumé, bien au-delà d'une simple opération de suppression de mots"
  ],
  prereqs: ["Produire un texte technique : le compte-rendu"],
  bodyHtml: `
    <p>En 1657, le philosophe et mathématicien français Blaise Pascal écrivit, dans l'une de ses <em>Lettres provinciales</em>, une phrase restée célèbre : « Je n'ai fait celle-ci plus longue que parce que je n'ai pas eu le loisir de la faire plus courte. » Ce paradoxe apparent — écrire court demande davantage de temps et d'effort qu'écrire long — résume à lui seul toute la difficulté de l'exercice que tu vas pratiquer dans ce chapitre : contracter un texte sans le trahir exige une maîtrise bien supérieure à celle qu'il faudrait pour simplement le paraphraser longuement.</p>
    <p>Cette difficulté explique pourquoi la méthode de contraction en cinq étapes présentée dans ce chapitre demande autant de rigueur : chaque suppression, chaque reformulation doit être pesée pour ne perdre aucune information essentielle, contrairement à l'écriture longue où l'on peut se permettre d'être approximatif sans que cela se voie immédiatement. Résumer, c'est faire des choix difficiles sous contrainte — exactement ce que Pascal regrettait de ne pas avoir eu le temps de faire.</p>
    <p>Le <strong>résumé</strong> est un travail de contraction : il ne conserve que les lignes essentielles d'un raisonnement, sans jamais recopier le texte d'origine ni y ajouter de commentaire personnel. À la fin de ce chapitre, tu sauras contracter un texte en préservant fidèlement son sens, tout en respectant les contraintes strictes de longueur et de style propres à cet exercice.</p>

    <h3>1. Trois qualités indissociables</h3>
    <table class="mini-table">
      <tr><th>Qualité</th><th>Ce que cela implique</th></tr>
      <tr><td><strong>Clair</strong></td><td>Une lecture aisée, sans phrases trop longues ni ambiguës</td></tr>
      <tr><td><strong>Fidèle</strong></td><td>Le respect strict de la pensée de l'auteur, sans avis personnel</td></tr>
      <tr><td><strong>Bref</strong></td><td>Aucune recopie intégrale ; l'essentiel du texte tient en 1/3 à 1/4 de sa longueur</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les trois qualités d'un bon résumé — clair, fidèle, bref — peuvent sembler faciles à énoncer séparément, mais elles entrent parfois en tension les unes avec les autres : être très bref au détriment de la clarté, ou très fidèle au détriment de la brièveté. En quoi la difficulté réelle du résumé consiste-t-elle précisément à tenir ces trois exigences simultanément, plutôt qu'à en privilégier une seule ?
    </div>

    <h3>2. La technique de contraction</h3>
    <p>Pour chaque phrase ou paragraphe du texte source, la même méthode s'applique :</p>
    <div class="example-box">
      <span class="eyebrow">Méthode en cinq étapes</span>
      <p><strong>1.</strong> Souligner les deux ou trois mots-clés de la phrase.</p>
      <p><strong>2.</strong> Barrer les mots inutiles (adjectifs superflus, répétitions).</p>
      <p><strong>3.</strong> Remplacer un groupe de mots complexe par un mot simple, quand c'est possible.</p>
      <p><strong>4.</strong> Utiliser un vocabulaire et un style personnels, jamais ceux de l'auteur.</p>
      <p class="example-answer">5. S'arrêter dès que la simplification risquerait de trahir l'idée originale.</p>
    </div>

    <h3>3. Identifier l'idée principale</h3>
    <p>L'idée principale d'un paragraphe est <strong>explicite</strong> quand une phrase l'exprime clairement et englobe toutes les autres. Elle est <strong>implicite</strong> quand elle doit être reconstruite : il faut alors dégager l'idée de chaque phrase, identifier le sujet du paragraphe et l'intention de l'auteur, puis formuler soi-même une phrase de synthèse.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Ne pas confondre le <em>sujet</em> d'un texte (ce dont on parle) et l'<em>idée principale</em> (ce que le texte en dit) : l'idée principale est toujours plus élaborée que le simple thème.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Confondre le sujet d'un texte (ce dont il parle) avec son idée principale (ce qu'il en dit précisément) est une erreur fréquente, même chez des lecteurs attentifs. Pourquoi cette confusion produit-elle souvent des résumés qui semblent corrects en apparence, mais qui passent en réalité à côté du véritable message du texte ?
    </div>

    <h3>4. Principes de rédaction</h3>
    <p>On supprime systématiquement les exemples et anecdotes non indispensables, on n'utilise jamais les titres et sous-titres du texte source tels quels, et on n'écrit jamais « l'auteur dit que... » : le résumé doit être rédigé directement, comme un texte autonome. Les idées se présentent dans le même ordre que dans le texte d'origine, en respectant si possible le même système verbal.</p>

    <h3>5. Frontière de la recherche</h3>
    <p>L'exercice de résumé que tu maîtrises dans ce chapitre a son pendant informatique : le <strong>résumé automatique de texte</strong> (text summarization), un domaine actif de recherche en traitement du langage naturel. On y distingue deux approches qui rappellent directement les compétences de ce chapitre : le résumé <strong>extractif</strong>, qui se contente de sélectionner et d'assembler les phrases jugées les plus importantes du texte source (plus proche d'un simple repérage d'idées essentielles), et le résumé <strong>abstractif</strong>, bien plus proche de ce que tu apprends ici, qui reformule véritablement le contenu avec des mots nouveaux, capturant le sens plutôt que la forme exacte des phrases d'origine.</p>
    <p><strong>Question ouverte :</strong> un système de résumé automatique abstractif, capable de reformuler un texte dans ses propres termes, peut-il garantir la même fidélité au sens original qu'un résumé rédigé par un humain formé à cette discipline précise ?</p>
    <p><strong>Technologie émergente :</strong> les grands modèles de langage modernes, entraînés sur des volumes considérables de textes, produisent aujourd'hui des résumés abstractifs d'une qualité remarquable, mais restent parfois sujets à des erreurs factuelles (des « hallucinations »), rappelant que la fidélité au texte source — la qualité la plus exigeante de ce chapitre — reste un défi même pour l'intelligence artificielle la plus avancée.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Texte source → identification de l'idée principale (explicite ou implicite) par paragraphe → contraction phrase par phrase (mots-clés, suppression du superflu, reformulation) → rédaction directe et autonome (jamais « l'auteur dit que »), même ordre des idées → résumé clair, fidèle et bref (1/3 à 1/4 de la longueur d'origine)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Clarté} + \\text{Fidélité} + \\text{Brièveté} = \\text{Résumé réussi}$$
      Ces trois qualités, en apparence simples, sont en réalité difficiles à tenir simultanément — exactement la difficulté que Pascal reconnaissait lorsqu'il s'excusait de ne pas avoir eu le temps d'écrire plus court : un bon résumé demande davantage de travail intellectuel qu'une paraphrase longue et approximative.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Pascal n'avait jamais formulé cette remarque sur la difficulté d'écrire court : cette exigence de concision aurait-elle été aussi clairement reconnue et enseignée dans la tradition scolaire française ?</li>
        <li>Pourquoi respecter le même ordre des idées que le texte source facilite-t-il la vérification de la fidélité d'un résumé, comparé à une réorganisation complète des idées ?</li>
        <li>Quelle serait la conséquence, pour la fiabilité de l'information relayée par des résumés automatiques générés par intelligence artificielle, d'une tendance de ces systèmes à « halluciner » des détails absents du texte source ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>B. Pascal, <em>Les Provinciales</em>, Lettre XVI, 1657 — la source de la célèbre remarque sur la difficulté d'écrire court.</li>
        <li>D. Jacobi, <em>La communication scientifique</em>, Presses universitaires de Grenoble — référence académique sur les techniques de contraction de texte.</li>
        <li>A. See, P. J. Liu, C. D. Manning, « Get To The Point: Summarization with Pointer-Generator Networks », ACL, 2017 — un article de référence sur le résumé automatique abstractif.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais contracter un texte en préservant fidèlement son sens, tout en respectant les contraintes strictes de longueur et de style propres à cet exercice. Le dernier chapitre de cette matière, « Produire un texte technique : l'exposé », te fera passer de l'écrit synthétique à la prise de parole structurée devant un public. Comme le rappelle la formule de Pascal : la brièveté n'est jamais un raccourci facile, c'est souvent le fruit d'un travail bien plus exigeant que celui de la longueur.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un bon résumé est clair, fidèle et bref — jamais une recopie, jamais un commentaire personnel</li>
        <li>La contraction se fait phrase par phrase : mots-clés, suppression du superflu, reformulation</li>
        <li>L'idée principale peut être explicite (une phrase l'exprime) ou implicite (à reconstruire)</li>
        <li>Le sujet du texte et son idée principale sont deux choses distinctes</li>
      </ul>
      <p class="recap-note">Vérifie ces notions avec les exercices ci-dessous.</p>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Écrire « l'auteur pense que... » au lieu de rédiger directement l'idée</li>
        <li>Confondre le sujet du texte avec son idée principale</li>
        <li>Changer l'ordre des idées par rapport au texte source</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un résumé doit représenter, en général, quelle proportion du texte de départ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="te5e1" value="wrong"> La moitié</label>
          <label class="option"><input type="radio" name="te5e1" value="right"> Entre le tiers et le quart</label>
          <label class="option"><input type="radio" name="te5e1" value="wrong"> Les trois quarts</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te5e1','te5fb1','Correct — un résumé se situe généralement entre 1/3 et 1/4 de la longueur du texte initial.','Relis la qualité \\'bref\\' du résumé : une fourchette précise est donnée dans le cours.')">Vérifier</button>
        <div class="feedback" id="te5fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une idée principale est dite « implicite » quand :</p>
        <div class="options">
          <label class="option"><input type="radio" name="te5e2" value="wrong"> Une phrase du texte l'exprime clairement</label>
          <label class="option"><input type="radio" name="te5e2" value="right"> Elle doit être reconstruite à partir de plusieurs phrases</label>
          <label class="option"><input type="radio" name="te5e2" value="wrong"> Elle figure dans le titre du texte</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te5e2','te5fb2','Correct — quand aucune phrase ne l\\'énonce directement, il faut la déduire des idées secondaires du paragraphe.','Oppose ce cas à l\\'idée principale explicite : ici, aucune phrase ne l\\'exprime telle quelle.')">Vérifier</button>
        <div class="feedback" id="te5fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Laquelle de ces formulations est à éviter dans un résumé ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="te5e3" value="right"> « L'auteur dit que la pollution augmente. »</label>
          <label class="option"><input type="radio" name="te5e3" value="wrong"> « La pollution augmente. »</label>
          <label class="option"><input type="radio" name="te5e3" value="wrong"> « Cette hausse s'explique par plusieurs facteurs. »</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te5e3','te5fb3','Correct — \\'l\\'auteur dit que\\' est justement la formule à bannir : le résumé doit énoncer l\\'idée directement.','Repère la formule qui rapporte la parole de l\\'auteur au lieu d\\'énoncer directement l\\'idée.')">Vérifier</button>
        <div class="feedback" id="te5fb3"></div>
      </div>
    </div>
  `
};

TECHEXPR_NOVA_KB[teKey('Produire un texte technique : le résumé')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Le résumé ». Demande-moi les qualités d'un bon résumé, comment repérer une idée principale, ou un indice sur un exercice.",
  rules: [
    { test:/qualit[ée]|clair|fid[èe]le|bref/i, replies:["Trois qualités indissociables : clair (lecture aisée), fidèle (respect de la pensée de l'auteur, sans avis personnel) et bref (1/3 à 1/4 du texte initial, sans recopie)."] },
    { test:/id[ée]e principale|explicite|implicite/i, replies:["L'idée principale est explicite quand une phrase du texte l'exprime clairement. Elle est implicite quand il faut la reconstruire à partir du sujet du paragraphe et de l'intention de l'auteur."] },
    { test:/contraction|technique/i, replies:["La technique de contraction : souligner les mots-clés, barrer le superflu, remplacer les groupes de mots complexes par des mots simples, et utiliser son propre style — jamais celui de l'auteur."] },
    { test:/sujet/i, replies:["Attention à ne pas confondre le sujet du texte (ce dont on parle) et l'idée principale (ce que le texte en dit) : la seconde est toujours plus élaborée que le premier."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repense à la qualité \\'bref\\' du résumé.","Indice niveau 2 : ce n'est ni la moitié ni les trois quarts du texte.","Indice niveau 3 : c'est entre le tiers et le quart."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : oppose ce cas à l'idée principale explicite.","Indice niveau 2 : ici, aucune phrase ne l'énonce directement.","Indice niveau 3 : elle doit être reconstruite à partir de plusieurs phrases."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : cherche la formule qui rapporte la parole de l'auteur au lieu d'énoncer l'idée directement.","Indice niveau 2 : une des trois options commence par \\'l'auteur dit que\\'.","Indice niveau 3 : c'est justement cette formule qu'il faut éviter."] }
  ]
};

/* =========================== CHAPITRE 6 =========================== */
TECHEXPR_CHAPTERS[teKey('Produire un texte technique : l\'exposé')] = {
  objectives: [
    "Appliquer les règles de la communication académique",
    "Hiérarchiser et transmettre des informations oralement",
    "Évaluer en quoi le modèle de communication de Shannon et Weaver — émetteur, message, bruit, récepteur — fournit un cadre toujours pertinent pour anticiper et limiter les perturbations qui menacent la clarté d'un exposé oral"
  ],
  prereqs: ["Produire un texte technique : le résumé"],
  bodyHtml: `
    <p>En 1948, l'ingénieur américain Claude Shannon publia « A Mathematical Theory of Communication », un article fondateur qui allait donner naissance à la théorie de l'information moderne. Bien que conçu à l'origine pour résoudre des problèmes purement techniques de transmission de signaux électriques (téléphone, télégraphe), le modèle de Shannon — émetteur, message codé, canal, bruit, récepteur, décodage — s'est révélé si universel qu'il fut rapidement adopté, avec le concours du sociologue Warren Weaver, pour décrire toute forme de communication humaine, y compris la prise de parole en public que tu vas travailler dans ce chapitre.</p>
    <p>L'apport le plus durable de ce modèle est peut-être la notion de « bruit » : Shannon et Weaver ont montré que toute communication, même la plus soigneusement préparée, est structurellement menacée par des perturbations qui peuvent en dégrader le message — un jargon mal maîtrisé, une acoustique défaillante, ou simplement l'attention fluctuante d'un auditoire. Anticiper ce bruit potentiel, plutôt que de le découvrir en le subissant devant son public, est précisément ce que la préparation méthodique de ce chapitre te permettra de faire.</p>
    <p>L'<strong>exposé</strong> est l'aboutissement oral d'un travail de recherche : il exige une préparation méthodique, un support visuel sobre et une gestion maîtrisée de la parole devant un public. À la fin de ce chapitre, tu sauras préparer et délivrer un exposé structuré, avec un support visuel efficace et une gestion maîtrisée de la communication orale.</p>

    <h3>1. Le schéma de la communication orale</h3>
    <p>Toute prise de parole met en jeu un émetteur qui code un message en signal, un récepteur qui le décode, et un retour (feedback) qui referme la boucle — le tout pouvant être perturbé par du « bruit » (distraction, mauvaise acoustique, jargon mal maîtrisé...). Garder ce schéma en tête aide à anticiper ce qui pourrait brouiller le message avant même de préparer son contenu.</p>

    <h3>2. Cadrer sa communication : le modèle PPQQCQC</h3>
    <table class="mini-table">
      <tr><th>Question</th><th>Ce qu'elle détermine</th></tr>
      <tr><td>Pour qui ?</td><td>Le destinataire du message (public, jury, collègues)</td></tr>
      <tr><td>Pourquoi ?</td><td>L'objectif de l'échange</td></tr>
      <tr><td>Qui ?</td><td>Le rôle de l'intervenant dans l'équipe ou le projet</td></tr>
      <tr><td>Quoi / Où / Quand / Comment ?</td><td>Le contenu, le lieu, le moment et le registre à adopter</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le modèle PPQQCQC t'oblige à répondre à plusieurs questions avant même de commencer à préparer le contenu de ton exposé. Pourquoi cette étape de cadrage préalable, qui peut sembler ralentir le travail, permet-elle en réalité d'éviter des heures de préparation mal orientées vers un contenu inadapté au public ou à l'objectif réel ?
    </div>

    <h3>3. Préparer un support visuel</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le diaporama <strong>illustre</strong> le discours, il ne le remplace pas : il doit contenir des mots-clés à développer oralement, jamais l'intégralité du texte lu.
    </div>
    <p>Quelques recommandations simples améliorent nettement un support : privilégier la clarté, garder un modèle cohérent d'une diapositive à l'autre, écrire assez gros pour être lisible de loin, et limiter les animations et couleurs superflues.</p>

    <h3>4. Choisir un type de plan</h3>
    <p>Trois grandes logiques de plan existent, selon la nature du sujet :</p>
    <div class="example-box">
      <span class="eyebrow">Trois types de plans</span>
      <p><strong>Thématique (inventaire) :</strong> présenter plusieurs aspects d'un même sujet, point par point — le plus courant en milieu académique.</p>
      <p><strong>Dialectique :</strong> confronter avantages et inconvénients (ou thèse/antithèse) avant une synthèse.</p>
      <p class="example-answer">Analytique (progressif) : décrire une situation, en analyser les causes, puis les conséquences et les solutions.</p>
    </div>

    <h3>5. Délivrer l'exposé</h3>
    <p>À l'oral, quelques réflexes font toute la différence : annoncer son plan dès le début, minuter son intervention, garder un contact visuel avec l'auditoire, et éviter de lire mot pour mot ses notes ou son diaporama. Selon les recherches en communication non verbale (Mehrabian), une large part du message perçu passe par le ton, le volume et la gestuelle — pas seulement par les mots choisis.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si une large part du message perçu passe par le ton, le volume et la gestuelle plutôt que par les seuls mots choisis, cela signifie qu'un excellent contenu écrit peut être mal perçu à l'oral si sa livraison est mauvaise. En quoi cette découverte oblige-t-elle à préparer la manière de délivrer un exposé avec autant de soin que son contenu lui-même ?
    </div>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Marquer une pause après chaque point abordé et utiliser des phrases courtes rend un exposé bien plus facile à suivre qu'un discours ininterrompu.
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La recherche d'Albert Mehrabian, déjà mentionnée dans ce chapitre, est souvent citée de façon déformée : son étude originale de 1967 portait spécifiquement sur la communication des sentiments et des attitudes (par exemple, exprimer qu'on apprécie ou non quelqu'un), et non sur la communication de contenus informatifs ou techniques comme un exposé scientifique. La fameuse règle des « 7% mots / 38% ton / 55% langage corporel », souvent citée hors contexte, ne s'applique donc pas telle quelle à un exposé académique riche en contenu factuel — une mise en garde importante contre la généralisation abusive d'un résultat scientifique au-delà de son cadre d'application original.</p>
    <p><strong>Question ouverte :</strong> comment distinguer, face à une statistique ou un résultat scientifique largement cité dans la culture populaire, son application légitime de sa généralisation abusive hors de son contexte d'origine ?</p>
    <p><strong>Technologie émergente :</strong> les outils modernes d'<strong>analyse automatique de la prise de parole</strong> (détectant le débit, les hésitations, le contact visuel via la caméra) permettent aujourd'hui de s'entraîner à un exposé avec un retour quantifié et objectif, complétant utilement l'auto-évaluation subjective d'un orateur en préparation.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Sujet à exposer → cadrage PPQQCQC (public, objectif, contenu, contexte) → choix du plan (thématique, dialectique, analytique) → support visuel sobre (mots-clés, jamais le texte intégral) → délivrance orale (plan annoncé, contact visuel, pauses, gestion du bruit potentiel)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Émetteur} \\xrightarrow{\\text{message codé}} \\text{Canal (perturbé par le bruit)} \\xrightarrow{\\text{décodage}} \\text{Récepteur}$$
      Ce schéma, hérité directement du modèle de Shannon et Weaver, rappelle qu'un exposé n'est jamais une simple transmission automatique d'information : entre ce que l'orateur veut dire et ce que le public comprend effectivement, de multiples perturbations peuvent s'immiscer — une bonne préparation consiste précisément à les anticiper et à les limiter autant que possible.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Claude Shannon n'avait jamais publié son modèle de communication en 1948, conçu à l'origine pour des problèmes purement techniques de télécommunication : la théorie de la communication orale et interpersonnelle se serait-elle développée avec un vocabulaire et des concepts très différents ?</li>
        <li>Pourquoi annoncer son plan dès le début d'un exposé aide-t-il concrètement le public à mieux suivre et mémoriser le contenu qui va suivre ?</li>
        <li>Quelle serait la conséquence, pour la crédibilité d'un exposé académique, d'une citation hors contexte et déformée d'un résultat scientifique comme celui de Mehrabian ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>C. Shannon, W. Weaver, <em>The Mathematical Theory of Communication</em>, University of Illinois Press, 1949 — l'ouvrage fondateur du modèle émetteur-récepteur.</li>
        <li>A. Mehrabian, <em>Silent Messages</em>, Wadsworth, 1971 — l'ouvrage source, souvent mal cité, sur la communication non verbale des sentiments et attitudes.</li>
        <li>D. Jacobi, <em>La communication scientifique</em>, Presses universitaires de Grenoble — référence académique sur la communication orale scientifique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais préparer et délivrer un exposé structuré, avec un support visuel efficace et une gestion maîtrisée de la communication orale — clôturant ainsi la matière « Technique d'expression écrite et orale » de cette L1. Comme le rappelle le modèle de Shannon et Weaver : bien communiquer ne se limite jamais à avoir raison ou à bien préparer son contenu, c'est aussi anticiper activement tout ce qui, entre toi et ton public, pourrait brouiller le message que tu cherches à transmettre.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le modèle PPQQCQC cadre le message avant même de préparer le contenu</li>
        <li>Le diaporama illustre le discours ; il ne doit jamais contenir le texte intégral de l'intervention</li>
        <li>Trois types de plans existent : thématique, dialectique et analytique</li>
        <li>À l'oral, le ton et la gestuelle pèsent autant, sinon plus, que les mots eux-mêmes</li>
      </ul>
      <p class="recap-note">Teste ces repères avec les exercices ci-dessous.</p>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Mettre l'intégralité de son discours écrit sur les diapositives</li>
        <li>Ne jamais annoncer son plan, ce qui perd l'auditoire dès les premières minutes</li>
        <li>Lire ses notes sans lever les yeux vers le public</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans le modèle PPQQCQC, la question « Pour qui ? » permet de définir :</p>
        <div class="options">
          <label class="option"><input type="radio" name="te6e1" value="wrong"> Le lieu de l'intervention</label>
          <label class="option"><input type="radio" name="te6e1" value="right"> Le destinataire du message</label>
          <label class="option"><input type="radio" name="te6e1" value="wrong"> La date de l'exposé</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te6e1','te6fb1','Correct — \\'Pour qui\\' identifie précisément le destinataire du message : client, jury, collègue...','Reviens au tableau PPQQCQC du cours : chaque lettre correspond à une question précise.')">Vérifier</button>
        <div class="feedback" id="te6fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un plan qui confronte avantages et inconvénients avant une synthèse est un plan :</p>
        <div class="options">
          <label class="option"><input type="radio" name="te6e2" value="wrong"> Thématique</label>
          <label class="option"><input type="radio" name="te6e2" value="right"> Dialectique</label>
          <label class="option"><input type="radio" name="te6e2" value="wrong"> Analytique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te6e2','te6fb2','Correct — la confrontation d\\'idées opposées suivie d\\'une synthèse est la définition même du plan dialectique.','Le mot \\'confrontation\\' est la clé : quel type de plan repose justement sur une opposition d\\'idées ?')">Vérifier</button>
        <div class="feedback" id="te6fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un diaporama de qualité doit avant tout :</p>
        <div class="options">
          <label class="option"><input type="radio" name="te6e3" value="wrong"> Contenir l'intégralité du discours</label>
          <label class="option"><input type="radio" name="te6e3" value="right"> Présenter des mots-clés à développer à l'oral</label>
          <label class="option"><input type="radio" name="te6e3" value="wrong"> Multiplier les animations et couleurs</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('te6e3','te6fb3','Correct — le diaporama illustre le discours avec des mots-clés ; l\\'intégralité du propos se développe à l\\'oral.','Relis le point clé du cours sur le support visuel : il illustre, il ne remplace pas la parole.')">Vérifier</button>
        <div class="feedback" id="te6fb3"></div>
      </div>
    </div>
  `
};

TECHEXPR_NOVA_KB[teKey('Produire un texte technique : l\'exposé')] = {
  intro: "Salut, moi c'est Nova ! On est sur « L'exposé ». Demande-moi ce qu'est le modèle PPQQCQC, les types de plans possibles, ou un indice sur un exercice.",
  rules: [
    { test:/ppqqcqc/i, replies:["PPQQCQC cadre le message avant de le préparer : Pour qui (destinataire), Pourquoi (objectif), Qui (ton rôle), Quoi/Où/Quand/Comment (contenu, lieu, moment, registre)."] },
    { test:/diaporama|support/i, replies:["Le diaporama illustre le discours, il ne le remplace pas : mots-clés uniquement, jamais le texte intégral, avec un modèle sobre et cohérent d'une diapositive à l'autre."] },
    { test:/plan/i, replies:["Trois types de plans : thématique (plusieurs aspects d'un sujet, le plus courant), dialectique (avantages/inconvénients puis synthèse), analytique (situation → causes → conséquences → solutions)."] },
    { test:/oral|gestuelle|non verbal/i, replies:["À l'oral, annoncer son plan, minuter l'intervention, garder un contact visuel et éviter de lire ses notes comptent autant que le contenu — le ton et la gestuelle transmettent une grande partie du message."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : chaque lettre de PPQQCQC correspond à une question précise.","Indice niveau 2 : ce n'est ni le lieu ni la date.","Indice niveau 3 : \\'Pour qui\\' désigne le destinataire du message."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le mot \\'confrontation\\' est la clé de cette question.","Indice niveau 2 : cherche le plan qui repose justement sur une opposition d'idées.","Indice niveau 3 : c'est le plan dialectique."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : rappelle-toi le rôle du diaporama par rapport au discours oral.","Indice niveau 2 : il ne doit jamais contenir le texte intégral de l'intervention.","Indice niveau 3 : il présente des mots-clés à développer à l'oral."] }
  ]
};

/* fusionne ce cours dans les bases de connaissances globales, comme les autres matières authored */
Object.assign(MATH_TOOLS_CHAPTERS, TECHEXPR_CHAPTERS);
Object.assign(NOVA_KB, TECHEXPR_NOVA_KB);