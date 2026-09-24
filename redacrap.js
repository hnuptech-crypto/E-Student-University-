/* =====================================================================
   CHUNK « redacrap » — registre REDACRAP_CHAPTERS / REDACRAP_NOVA_KB
   Matière(s) : Autres|Technique de rédaction de rapport
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   REDACRAP_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* =====================================================================================
   MODULE — TECHNIQUE DE RÉDACTION DE RAPPORT (L3CF, domaine "Autres")
   fusionné à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu : nature et types de rapports scientifiques, structure IMRaD, rédaction de
   l'introduction et de la problématique, présentation des résultats (tableaux/figures),
   rédaction de la discussion et de la conclusion, références bibliographiques et
   normes de citation, style scientifique (clarté, objectivité, temps verbaux), et
   spécificités du rapport de stage / soutenance orale — conforme aux enseignements
   transversaux de méthodologie de la communication scientifique en L3 Chimie
   Fondamentale. Prolonge en L3 les acquis du cours "Technique d'expression écrite et
   orale" (L1). Références de fond : usages ACS (American Chemical Society) et normes
   IMRaD standard des revues scientifiques ; guides méthodologiques de rédaction de
   rapports de stage et de mémoires universitaires.
===================================================================================== */
const REDACRAP_MATIERE = 'Technique de rédaction de rapport';
function rrKey(chapterTitle){ return `Autres|${REDACRAP_MATIERE}|${chapterTitle}`; }
const REDACRAP_CHAPTERS = {};
const REDACRAP_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
REDACRAP_CHAPTERS[rrKey("Le rapport scientifique : finalités, types et destinataires")] = {
  objectives: [
    "Distinguer les grandes catégories de rapports scientifiques et techniques",
    "Identifier le destinataire d'un rapport et adapter son contenu en conséquence",
    "Comprendre les critères qui font qu'un rapport est jugé réussi ou non",
    "Situer la rédaction de rapport dans le cursus et la future vie professionnelle du chimiste"
  ],
  prereqs: ["Technique d'expression écrite et orale (L1)"],
  bodyHtml: `
    <p>Au-delà des compétences générales de rédaction acquises en L1 (texte explicatif, argumentatif, compte-rendu), la rédaction d'un <strong>rapport scientifique</strong> obéit à des codes précis, largement partagés dans le monde entier par les revues scientifiques, les laboratoires et les entreprises. Maîtriser ces codes est une compétence professionnelle à part entière pour tout chimiste, aussi importante que la maîtrise des techniques expérimentales elles-mêmes : un excellent résultat mal communiqué perd une grande partie de sa valeur.</p>

    <h3>1. Pourquoi rédiger un rapport ?</h3>
    <p>Un rapport scientifique poursuit toujours un même objectif fondamental : permettre à un lecteur qui n'a pas assisté à l'expérience ou au projet de <strong>comprendre ce qui a été fait, pourquoi, comment, et ce qu'on peut en conclure</strong> — avec suffisamment de détails pour, en principe, pouvoir reproduire la démarche (c'est le critère de <strong>reproductibilité</strong>, pierre angulaire de la méthode scientifique). Un bon rapport n'est donc jamais un simple récit chronologique de ce que l'auteur a fait : c'est une reconstruction logique et argumentée, organisée pour le lecteur, pas pour l'auteur.</p>

    <h3>2. Les grandes familles de rapports</h3>
    <table class="mini-table">
      <tr><th>Type de rapport</th><th>Contexte</th><th>Longueur typique</th></tr>
      <tr><td>Compte-rendu de travaux pratiques (TP)</td><td>Séance de laboratoire, cursus universitaire</td><td>2 à 8 pages</td></tr>
      <tr><td>Rapport de projet / de recherche</td><td>Projet tutoré, mini-mémoire</td><td>10 à 30 pages</td></tr>
      <tr><td>Rapport de stage</td><td>Stage en entreprise ou en laboratoire</td><td>20 à 50 pages</td></tr>
      <tr><td>Mémoire (Master, thèse)</td><td>Fin de cycle, recherche approfondie</td><td>50 à plusieurs centaines de pages</td></tr>
      <tr><td>Article scientifique</td><td>Publication dans une revue à comité de lecture</td><td>4 à 15 pages (format revue)</td></tr>
      <tr><td>Rapport technique / d'expertise</td><td>Contexte industriel, réponse à une commande précise</td><td>Variable, souvent normalisé par l'entreprise</td></tr>
    </table>
    <p>Malgré la diversité des contextes, tous ces documents partagent une <strong>même logique de fond</strong> — la structure IMRaD (chapitre 2) — même si leur mise en forme et leur longueur diffèrent fortement.</p>

    <h3>3. Identifier son destinataire</h3>
    <p>La première question à se poser avant de rédiger n'est pas « que dois-je écrire ? » mais <strong>« qui va me lire, et pourquoi ? »</strong>. Le niveau de détail technique, le vocabulaire employé et même la structure du rapport doivent s'adapter au destinataire :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Un enseignant correcteur</strong> attend la démonstration de la maîtrise d'une méthode et du raisonnement scientifique, avec toute la rigueur attendue au niveau d'étude concerné</li>
      <li><strong>Un maître de stage ou un responsable hiérarchique</strong> attend souvent un résultat exploitable, avec une synthèse claire en tête de document (voir résumé/abstract, chapitre 2)</li>
      <li><strong>Un pair scientifique</strong> (referee d'une revue, collègue de laboratoire) attend une rigueur méthodologique complète permettant de juger la validité des résultats et, en principe, de reproduire l'expérience</li>
    </ul>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Un même travail expérimental peut donner lieu à des rapports très différents selon le destinataire visé : un rapport de stage destiné à une entreprise mettra l'accent sur les enjeux appliqués et les recommandations, tandis qu'un rapport de TP destiné à un enseignant mettra l'accent sur la rigueur de la démarche expérimentale et l'analyse critique des sources d'erreur.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un étudiant rédige à la fois le compte-rendu de son TP de titrage acido-basique (pour son enseignant) et un court résumé du même TP pour ses camarades de promotion qui n'ont pas encore fait la manipulation. Qu'est-ce qui doit différer entre les deux textes ?</p>
      <p><strong>Solution :</strong> Pour l'enseignant, le compte-rendu doit détailler précisément le protocole suivi, les incertitudes de mesure, les calculs intermédiaires et une discussion critique des écarts observés par rapport à la valeur théorique. Pour les camarades, un résumé accessible privilégiera les points clés à retenir pour réussir la manipulation (pièges à éviter, ordre de grandeur du résultat attendu), sans nécessairement redonner tous les calculs.</p>
      <p class="example-answer">Réponse : le contenu factuel reste le même, mais la sélection de l'information, son niveau de détail et son organisation changent radicalement selon le destinataire visé.</p>
    </div>

    <h3>4. Critères d'évaluation d'un bon rapport</h3>
    <p>Quel que soit le type de rapport, quatre qualités reviennent systématiquement dans les grilles d'évaluation :</p>
    <table class="mini-table">
      <tr><th>Qualité</th><th>Ce qu'elle implique</th></tr>
      <tr><td><strong>Rigueur</strong></td><td>Faits vérifiés, données correctement traitées, sources citées, aucune affirmation non justifiée</td></tr>
      <tr><td><strong>Clarté</strong></td><td>Structure logique, phrases courtes et directes, vocabulaire précis (voir chapitre 7)</td></tr>
      <tr><td><strong>Concision</strong></td><td>Aller à l'essentiel, éviter les répétitions et le remplissage</td></tr>
      <tr><td><strong>Esprit critique</strong></td><td>Discuter les limites de la méthode, les sources d'erreur, la portée réelle des conclusions (voir chapitre 5)</td></tr>
    </table>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Un rapport scientifique permet à un lecteur absent de comprendre et, en principe, de reproduire une démarche — c'est le critère de reproductibilité</li>
      <li>Les grandes familles de rapports (TP, projet, stage, mémoire, article) partagent une même logique de fond malgré des formats différents</li>
      <li>La première question à se poser est toujours : qui va me lire, et pourquoi ?</li>
      <li>Quatre qualités structurent l'évaluation d'un rapport : rigueur, clarté, concision, esprit critique</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Rédiger un rapport comme un simple récit chronologique de ce qu'on a fait, sans reconstruction logique pour le lecteur</li>
      <li>Ignorer le destinataire visé et rédiger un texte « générique » peu adapté au contexte</li>
      <li>Confondre longueur et qualité — un rapport concis et bien structuré vaut mieux qu'un rapport long et redondant</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quel est le critère central qui définit la qualité d'un rapport scientifique, au-delà de son type ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr1e1" value="wrong">Sa longueur totale en pages</label>
        <label class="option"><input type="radio" name="rr1e1" value="right">Sa capacité à permettre au lecteur de comprendre et, en principe, de reproduire la démarche</label>
        <label class="option"><input type="radio" name="rr1e1" value="wrong">Le nombre de figures et de tableaux inclus</label>
        <label class="option"><input type="radio" name="rr1e1" value="wrong">Le vocabulaire technique employé, aussi complexe que possible</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr1e1','rr1fb1','Correct — c\\'est le critère de reproductibilité, au cœur de la démarche scientifique, qui fait la qualité d\\'un rapport.','Reviens à l\\'objectif fondamental d\\'un rapport scientifique évoqué en introduction du chapitre.')">Vérifier</button>
      <div class="feedback" id="rr1fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Avant de commencer à rédiger, quelle question faut-il se poser en priorité ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr1e2" value="wrong">Quelle police de caractères utiliser ?</label>
        <label class="option"><input type="radio" name="rr1e2" value="right">Qui va me lire, et pourquoi ?</label>
        <label class="option"><input type="radio" name="rr1e2" value="wrong">Combien de pages dois-je écrire ?</label>
        <label class="option"><input type="radio" name="rr1e2" value="wrong">Quel logiciel de traitement de texte choisir ?</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr1e2','rr1fb2','Correct — identifier le destinataire conditionne le niveau de détail, le vocabulaire et l\\'organisation du rapport.','Relis la section « Identifier son destinataire » : quelle est la toute première question à se poser ?')">Vérifier</button>
      <div class="feedback" id="rr1fb2"></div>
    </div>
  </div>
  `
};
REDACRAP_NOVA_KB[rrKey("Le rapport scientifique : finalités, types et destinataires")] = {
  intro: "Salut, moi c'est Nova ! On démarre la rédaction de rapport par les bases : finalités, types de rapports, destinataires. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/reproductibilit[ée]/i, replies:[
      "La reproductibilité est le critère central : un bon rapport donne assez de détails pour qu'un lecteur puisse, en principe, refaire la démarche et retrouver les mêmes résultats."
    ]},
    { test:/type de rapport|famille|compte.rendu|m[ée]moire|article/i, replies:[
      "Les grandes familles : compte-rendu de TP, rapport de projet, rapport de stage, mémoire, article scientifique, rapport technique. Elles partagent une même logique de fond (IMRaD) malgré des formats différents."
    ]},
    { test:/destinataire|lecteur/i, replies:[
      "La première question à se poser est toujours : qui va me lire, et pourquoi ? Le niveau de détail et le vocabulaire changent selon qu'on écrit pour un enseignant, un maître de stage ou un pair scientifique."
    ]},
    { test:/crit[èe]re|qualit[ée]|rigueur|clart[ée]|concision/i, replies:[
      "Quatre qualités reviennent systématiquement : rigueur (faits vérifiés), clarté (structure logique), concision (aller à l'essentiel), esprit critique (discuter les limites)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à l'objectif fondamental énoncé en tout début de chapitre.",
      "Indice niveau 2 : ce n'est ni la longueur, ni le vocabulaire complexe qui définissent la qualité.",
      "Indice niveau 3 : c'est la reproductibilité de la démarche pour un lecteur absent."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la section « Identifier son destinataire ».",
      "Indice niveau 2 : ce n'est pas une question de mise en forme (police, longueur).",
      "Indice niveau 3 : c'est « qui va me lire, et pourquoi ? »."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
REDACRAP_CHAPTERS[rrKey("La structure IMRaD : architecture d'un rapport scientifique")] = {
  objectives: [
    "Connaître les quatre grandes parties du schéma IMRaD et leur fonction respective",
    "Situer les éléments annexes (titre, résumé, mots-clés, remerciements, annexes) autour du corps IMRaD",
    "Comprendre pourquoi l'ordre de rédaction diffère souvent de l'ordre de lecture final",
    "Adapter le schéma IMRaD à un compte-rendu de TP ou à un rapport de stage"
  ],
  prereqs: ["Le rapport scientifique : finalités, types et destinataires"],
  bodyHtml: `
    <p>La quasi-totalité des rapports et articles scientifiques dans le monde suivent, sous une forme ou une autre, la même architecture logique connue sous l'acronyme <strong>IMRaD</strong> : <strong>I</strong>ntroduction, <strong>M</strong>éthodes, <strong>R</strong>ésultats <strong>a</strong>nd (et) <strong>D</strong>iscussion. Comprendre cette structure est la compétence la plus transférable de ce cours : elle s'applique aussi bien à un compte-rendu de deux pages qu'à un article publié dans une revue internationale.</p>

    <h3>1. Les quatre piliers du schéma IMRaD</h3>
    <table class="mini-table">
      <tr><th>Section</th><th>Question à laquelle elle répond</th><th>Temps verbal dominant</th></tr>
      <tr><td><strong>Introduction</strong></td><td>Pourquoi ce travail ? Quel est le contexte, le problème, l'objectif ?</td><td>Présent (contexte général), passé composé (travaux antérieurs)</td></tr>
      <tr><td><strong>Méthodes</strong> (matériel et méthodes)</td><td>Comment le travail a-t-il été mené ?</td><td>Passé composé / passé simple, souvent voix passive</td></tr>
      <tr><td><strong>Résultats</strong></td><td>Qu'a-t-on observé, mesuré ?</td><td>Passé composé, présentation factuelle sans interprétation</td></tr>
      <tr><td><strong>Discussion</strong></td><td>Que signifient ces résultats ? Quelles limites, quelles conclusions ?</td><td>Présent (interprétation), conditionnel (hypothèses prudentes)</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé — la règle d'or de l'IMRaD</span>
      Chaque section a un rôle strictement délimité : on ne discute jamais un résultat dans la section « Résultats » (qui reste purement factuelle et descriptive), et on n'introduit jamais de résultat nouveau dans la section « Discussion ». Ce cloisonnement, qui peut sembler rigide au début, structure la pensée du lecteur et évite les confusions entre ce qui a été observé et ce qui en est déduit.
    </div>

    <h3>2. Les éléments périphériques au corps IMRaD</h3>
    <p>Autour de ce noyau central, un rapport complet comporte généralement des éléments additionnels :</p>
    <table class="mini-table">
      <tr><th>Élément</th><th>Fonction</th></tr>
      <tr><td>Titre</td><td>Informatif et précis, annonce le sujet exact sans effet de style excessif</td></tr>
      <tr><td>Résumé (abstract)</td><td>Version condensée (souvent 150-300 mots) de l'ensemble du rapport — contexte, méthode, résultat principal, conclusion</td></tr>
      <tr><td>Mots-clés</td><td>3 à 6 termes permettant de retrouver le document dans une base de données</td></tr>
      <tr><td>Remerciements</td><td>Reconnaissance des personnes et organismes ayant soutenu le travail</td></tr>
      <tr><td>Références bibliographiques</td><td>Liste des sources citées, selon une norme précise (chapitre 6)</td></tr>
      <tr><td>Annexes</td><td>Données brutes, calculs détaillés, protocoles complets — matériel utile mais qui alourdirait le corps du texte</td></tr>
    </table>

    <h3>3. L'ordre de rédaction n'est pas l'ordre de lecture</h3>
    <p>Un piège classique consiste à rédiger un rapport dans l'ordre où il sera lu (introduction d'abord, conclusion en dernier). En pratique, la plupart des rédacteurs expérimentés suivent un ordre différent, plus efficace :</p>
    <div class="formula-box" style="font-family:'IBM Plex Sans',sans-serif; font-size:1rem;">Méthodes → Résultats → Discussion → Introduction → Résumé → Titre</div>
    <p>Cette logique s'explique simplement : on ne peut rédiger une introduction pertinente (qui annonce précisément la problématique et les enjeux) qu'après avoir clarifié ce qu'on a réellement trouvé et ce que cela signifie. De même, le résumé — qui condense tout le rapport — ne peut être écrit qu'en dernier, une fois toutes les autres sections stabilisées.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un étudiant rédige son compte-rendu de TP dans l'ordre suivant : titre → introduction → méthodes → résultats → discussion. En relisant son introduction après avoir terminé, il se rend compte qu'elle ne correspond plus tout à fait à ce qu'il a réellement démontré. Que lui suggère l'approche IMRaD pour éviter ce problème à l'avenir ?</p>
      <p><strong>Solution :</strong> En rédigeant l'introduction en dernier (après méthodes, résultats et discussion), on s'assure qu'elle annonce exactement la problématique traitée et les résultats effectivement obtenus, sans décalage entre ce qui est promis en introduction et ce qui est réellement démontré ensuite.</p>
      <p class="example-answer">Réponse : rédiger l'introduction (et le résumé) en dernier, une fois le contenu scientifique stabilisé, évite ce type d'incohérence.</p>
    </div>

    <h3>4. Adapter IMRaD à un compte-rendu de TP ou un rapport de stage</h3>
    <p>Le schéma IMRaD reste valable même pour des documents plus courts ou plus appliqués, à condition d'adapter les intitulés :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Un <strong>compte-rendu de TP</strong> reprend souvent : But de la manipulation (= Introduction) → Protocole (= Méthodes) → Mesures et calculs (= Résultats) → Interprétation et conclusion (= Discussion)</li>
      <li>Un <strong>rapport de stage</strong> ajoute typiquement une présentation de la structure d'accueil avant l'introduction proprement dite, et une partie « missions réalisées » qui peut fusionner Méthodes et Résultats (voir chapitre 8)</li>
    </ul>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>IMRaD = Introduction, Méthodes, Résultats, Discussion — l'architecture universelle des rapports et articles scientifiques</li>
      <li>Chaque section a un rôle strict : les Résultats restent factuels, la Discussion interprète, sans mélanger les deux</li>
      <li>Autour du corps IMRaD : titre, résumé, mots-clés, remerciements, références, annexes</li>
      <li>L'ordre de rédaction efficace diffère de l'ordre de lecture : Méthodes → Résultats → Discussion → Introduction → Résumé → Titre</li>
      <li>Le schéma s'adapte aisément à un compte-rendu de TP ou à un rapport de stage, avec des intitulés adaptés au contexte</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Interpréter ou commenter les résultats directement dans la section « Résultats », au lieu de les réserver à la Discussion</li>
      <li>Rédiger l'introduction en tout premier, avant d'avoir stabilisé le contenu scientifique du rapport</li>
      <li>Introduire un résultat nouveau, non présenté auparavant, dans la section Discussion</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Dans quelle section IMRaD interprète-t-on la signification des résultats obtenus ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr2e1" value="wrong">Résultats</label>
        <label class="option"><input type="radio" name="rr2e1" value="wrong">Méthodes</label>
        <label class="option"><input type="radio" name="rr2e1" value="right">Discussion</label>
        <label class="option"><input type="radio" name="rr2e1" value="wrong">Introduction</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr2e1','rr2fb1','Correct — la Discussion est la seule section où l\\'on interprète et met en perspective les résultats, qui restent purement factuels dans la section Résultats.','La section Résultats reste factuelle : cherche la section qui a pour rôle explicite l\\'interprétation.')">Vérifier</button>
      <div class="feedback" id="rr2fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Quel est l'ordre de rédaction généralement recommandé (et non l'ordre de lecture) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr2e2" value="wrong">Introduction, Méthodes, Résultats, Discussion</label>
        <label class="option"><input type="radio" name="rr2e2" value="right">Méthodes, Résultats, Discussion, Introduction, Résumé</label>
        <label class="option"><input type="radio" name="rr2e2" value="wrong">Résumé, Introduction, Discussion, Résultats</label>
        <label class="option"><input type="radio" name="rr2e2" value="wrong">Discussion, Résultats, Méthodes, Introduction</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr2e2','rr2fb2','Correct — on rédige d\\'abord ce qui est factuel (Méthodes, Résultats), puis on interprète (Discussion), et l\\'on termine par l\\'Introduction et le Résumé, une fois le contenu stabilisé.','Réfléchis à ce qu\\'il faut avoir stabilisé avant de pouvoir écrire une introduction pertinente.')">Vérifier</button>
      <div class="feedback" id="rr2fb2"></div>
    </div>
  </div>
  `
};
REDACRAP_NOVA_KB[rrKey("La structure IMRaD : architecture d'un rapport scientifique")] = {
  intro: "Salut, moi c'est Nova ! On explore la structure IMRaD, le squelette universel des rapports scientifiques. Pose-moi une question sur une section précise, ou demande un indice sur un exercice.",
  rules: [
    { test:/imrad/i, replies:[
      "IMRaD = Introduction, Méthodes, Résultats, Discussion — c'est l'architecture universelle, adoptée par la quasi-totalité des rapports et articles scientifiques dans le monde."
    ]},
    { test:/r[ée]sultats/i, replies:[
      "La section Résultats reste purement factuelle et descriptive : on y présente ce qui a été observé/mesuré, sans jamais l'interpréter — l'interprétation est réservée à la Discussion."
    ]},
    { test:/discussion/i, replies:[
      "La Discussion interprète les résultats, discute leurs limites et leur portée — mais elle ne doit jamais introduire de résultat nouveau, non présenté auparavant."
    ]},
    { test:/ordre de r[ée]daction|r[ée]diger en dernier/i, replies:[
      "Ordre de rédaction efficace : Méthodes → Résultats → Discussion → Introduction → Résumé → Titre. On rédige l'introduction en dernier pour qu'elle corresponde exactement à ce qui a été réellement démontré."
    ]},
    { test:/r[ée]sum[ée]|abstract|mots.cl[ée]s/i, replies:[
      "Le résumé (150-300 mots) condense tout le rapport : contexte, méthode, résultat principal, conclusion. Il se rédige en tout dernier, une fois le contenu stabilisé, tout comme les mots-clés."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : quelle section a pour rôle explicite d'interpréter, par opposition à décrire ?",
      "Indice niveau 2 : ce n'est ni Résultats (factuel), ni Méthodes, ni Introduction.",
      "Indice niveau 3 : c'est la Discussion."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à ce qu'il faut avoir stabilisé avant de rédiger une introduction pertinente.",
      "Indice niveau 2 : on commence par le factuel (Méthodes, Résultats), puis l'interprétation (Discussion).",
      "Indice niveau 3 : Introduction et Résumé se rédigent en tout dernier."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
REDACRAP_CHAPTERS[rrKey("Rédiger l'introduction et poser la problématique")] = {
  objectives: [
    "Construire une introduction en entonnoir, du contexte général à la problématique précise",
    "Formuler une problématique claire et une hypothèse ou un objectif testable",
    "Distinguer contexte, état de l'art et objectif dans l'introduction",
    "Éviter les défauts classiques d'une introduction trop vague ou trop détaillée"
  ],
  prereqs: ["La structure IMRaD : architecture d'un rapport scientifique"],
  bodyHtml: `
    <p>L'introduction est la première section lue — et souvent celle qui détermine si le lecteur (enseignant, jury, referee) aborde la suite du rapport avec confiance ou avec scepticisme. Une introduction réussie ne se contente pas d'annoncer un sujet : elle construit, étape par étape, la nécessité du travail présenté.</p>

    <h3>1. La structure en entonnoir</h3>
    <p>La méthode la plus efficace et la plus largement enseignée pour construire une introduction est la structure en <strong>entonnoir</strong> (« funnel structure ») : partir d'un contexte large et accessible, puis resserrer progressivement jusqu'à la problématique précise du travail présenté.</p>
    <table class="mini-table">
      <tr><th>Étape</th><th>Contenu</th></tr>
      <tr><td>1. Contexte général</td><td>Pourquoi ce domaine est-il important ? (enjeu scientifique, industriel, sociétal)</td></tr>
      <tr><td>2. État de l'art / connaissances actuelles</td><td>Que sait-on déjà sur ce sujet précis ? Travaux antérieurs pertinents</td></tr>
      <tr><td>3. Lacune ou problème identifié</td><td>Qu'est-ce qui reste incertain, non résolu, ou à vérifier ?</td></tr>
      <tr><td>4. Objectif / problématique du travail</td><td>Ce que ce rapport précis se propose d'apporter</td></tr>
      <tr><td>5. Annonce du plan (optionnelle selon le format)</td><td>Comment le rapport va répondre à cette problématique</td></tr>
    </table>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <polygon points="10,10 130,10 90,80 50,80" fill="#4C7CFF" opacity="0.25" stroke="#4C7CFF" stroke-width="1.4"/>
          <text x="15" y="22" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">Contexte général</text>
          <text x="35" y="48" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">État de l'art</text>
          <text x="50" y="70" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">Lacune</text>
          <text x="58" y="86" font-family="IBM Plex Mono" font-size="7" fill="#F0B94D">Objectif</text>
        </svg>
        <span>La structure en entonnoir de l'introduction</span>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La dernière phrase de l'introduction — celle qui énonce l'objectif ou la problématique précise — est souvent la phrase la plus relue et la plus travaillée de tout le rapport : c'est elle qui fixe le contrat de lecture entre l'auteur et son lecteur. Tout ce qui suit doit répondre, directement ou indirectement, à cette phrase.
    </div>

    <h3>2. Formuler une problématique claire</h3>
    <p>Une bonne problématique se distingue par trois qualités :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Précise :</strong> elle porte sur un point délimité, pas sur un domaine entier (« étudier l'effet de la température sur la vitesse de la réaction X », pas « étudier la cinétique chimique »)</li>
      <li><strong>Justifiée :</strong> le lecteur doit comprendre, à partir du contexte donné juste avant, pourquoi cette question mérite d'être posée</li>
      <li><strong>Testable / vérifiable :</strong> elle doit pouvoir recevoir une réponse à partir des méthodes effectivement mises en œuvre dans le rapport — pas une question trop large pour être traitée dans le cadre du travail présenté</li>
    </ul>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Comparer ces deux formulations de problématique pour un TP de cinétique chimique, et indiquer laquelle est la mieux construite : (A) « Ce TP porte sur la cinétique chimique. » (B) « Ce travail vise à déterminer l'ordre partiel de la réaction d'oxydation des ions iodure par les ions peroxodisulfate par rapport à chacun des réactifs, à partir du suivi de l'absorbance UV-Visible du diiode formé. »</p>
      <p><strong>Solution :</strong> La formulation (A) est beaucoup trop vague : elle ne précise ni la réaction étudiée, ni la méthode, ni l'objectif exact — elle ne fixe aucun contrat de lecture utile. La formulation (B) est précise, testable (un ordre partiel se détermine effectivement par la méthode décrite) et directement reliée à la méthode expérimentale du rapport.</p>
      <p class="example-answer">Réponse : la formulation (B) est la mieux construite — elle est précise, justifiée et vérifiable par les méthodes du rapport.</p>
    </div>

    <h3>3. Défauts classiques à éviter</h3>
    <table class="mini-table">
      <tr><th>Défaut</th><th>Pourquoi c'est problématique</th></tr>
      <tr><td>Introduction trop courte, sans contexte</td><td>Le lecteur ne comprend pas pourquoi le sujet mérite d'être étudié</td></tr>
      <tr><td>Introduction trop longue, digressive</td><td>Dilue la problématique réelle dans des généralités non pertinentes pour le travail présenté</td></tr>
      <tr><td>Absence de problématique explicite</td><td>Le lecteur ne sait pas ce qu'il doit retenir en lisant la suite du rapport</td></tr>
      <tr><td>Résultats anticipés dans l'introduction</td><td>Confond le rôle de l'introduction (poser la question) avec celui de la conclusion (donner la réponse)</td></tr>
    </table>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Une introduction efficace suit une structure en entonnoir : contexte général → état de l'art → lacune → objectif précis</li>
      <li>La dernière phrase de l'introduction (l'objectif/problématique) fixe le contrat de lecture pour tout le reste du rapport</li>
      <li>Une bonne problématique est précise, justifiée par le contexte, et testable avec les méthodes réellement mises en œuvre</li>
      <li>Il faut éviter : l'absence de contexte, les digressions non pertinentes, l'absence de problématique explicite, et l'anticipation des résultats</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Commencer directement par la problématique sans construire le contexte qui la justifie</li>
      <li>Formuler une problématique trop large pour être traitée par les méthodes réellement utilisées dans le rapport</li>
      <li>Dévoiler les résultats ou les conclusions dès l'introduction, ce qui casse la logique de démonstration du rapport</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Dans la structure en entonnoir, que place-t-on juste avant l'objectif précis du travail ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr3e1" value="wrong">Le résumé du rapport</label>
        <label class="option"><input type="radio" name="rr3e1" value="right">La lacune ou le problème identifié dans les connaissances actuelles</label>
        <label class="option"><input type="radio" name="rr3e1" value="wrong">La conclusion générale</label>
        <label class="option"><input type="radio" name="rr3e1" value="wrong">La liste des références bibliographiques</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr3e1','rr3fb1','Correct — c\\'est la lacune identifiée dans l\\'état de l\\'art qui justifie logiquement l\\'objectif annoncé juste après.','Relis le tableau des cinq étapes de l\\'entonnoir : quelle étape précède directement l\\'objectif ?')">Vérifier</button>
      <div class="feedback" id="rr3fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Laquelle de ces deux problématiques est la mieux formulée pour un rapport de chimie ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr3e2" value="wrong">« Ce rapport traite de la chimie organique. »</label>
        <label class="option"><input type="radio" name="rr3e2" value="right">« Ce travail vise à déterminer le rendement de la synthèse de l'aspirine par acétylation de l'acide salicylique, et à en identifier les principales sources de perte. »</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr3e2','rr3fb2','Correct — cette formulation est précise, testable et directement reliée à une méthode expérimentale identifiable.','Compare la précision et le caractère testable des deux formulations : laquelle peut être vérifiée avec une méthode identifiable ?')">Vérifier</button>
      <div class="feedback" id="rr3fb2"></div>
    </div>
  </div>
  `
};
REDACRAP_NOVA_KB[rrKey("Rédiger l'introduction et poser la problématique")] = {
  intro: "Salut, moi c'est Nova ! On travaille la rédaction de l'introduction et de la problématique. Propose-moi une formulation, ou demande un indice sur un exercice.",
  rules: [
    { test:/entonnoir/i, replies:[
      "La structure en entonnoir : contexte général → état de l'art → lacune identifiée → objectif précis (→ annonce du plan si besoin). On resserre progressivement vers la problématique du travail."
    ]},
    { test:/probl[ée]matique/i, replies:[
      "Une bonne problématique est précise (pas trop large), justifiée par le contexte donné juste avant, et testable avec les méthodes réellement mises en œuvre dans le rapport."
    ]},
    { test:/contrat de lecture|derni[èe]re phrase/i, replies:[
      "La dernière phrase de l'introduction (l'objectif) fixe le « contrat de lecture » : tout le reste du rapport doit y répondre, directement ou indirectement."
    ]},
    { test:/d[ée]faut|erreur.*introduction/i, replies:[
      "Défauts classiques : introduction trop courte (pas de contexte), trop longue (digressions), sans problématique explicite, ou qui anticipe déjà les résultats/conclusions."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis les 5 étapes de l'entonnoir dans l'ordre.",
      "Indice niveau 2 : l'étape juste avant l'objectif justifie pourquoi ce travail est nécessaire.",
      "Indice niveau 3 : c'est la lacune/le problème identifié dans les connaissances actuelles."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : compare la précision des deux formulations.",
      "Indice niveau 2 : cherche celle qui mentionne une méthode et un objectif vérifiables.",
      "Indice niveau 3 : c'est la formulation détaillée sur le rendement de synthèse de l'aspirine."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
REDACRAP_CHAPTERS[rrKey("Présenter les résultats : tableaux, figures et légendes")] = {
  objectives: [
    "Choisir entre tableau et figure selon la nature des données à présenter",
    "Construire une légende autonome, compréhensible sans relire le texte",
    "Appliquer les règles de présentation d'un tableau de données scientifiques (unités, chiffres significatifs, incertitudes)",
    "Rédiger un texte qui accompagne et met en valeur les résultats sans les répéter intégralement"
  ],
  prereqs: ["La structure IMRaD : architecture d'un rapport scientifique"],
  bodyHtml: `
    <p>La section Résultats est souvent celle où se jouent, concrètement, la clarté et le professionnalisme d'un rapport scientifique. Une donnée mal présentée — tableau surchargé, figure sans légende, unités manquantes — peut rendre incompréhensible un travail expérimental pourtant rigoureux.</p>

    <h3>1. Choisir entre tableau et figure</h3>
    <table class="mini-table">
      <tr><th>Situation</th><th>Format recommandé</th></tr>
      <tr><td>Comparer précisément quelques valeurs numériques exactes</td><td>Tableau</td></tr>
      <tr><td>Montrer une tendance, une évolution continue (ex : cinétique, spectre)</td><td>Figure (graphique)</td></tr>
      <tr><td>Présenter un spectre (IR, RMN, UV) ou un diffractogramme</td><td>Figure</td></tr>
      <tr><td>Résumer les caractéristiques de plusieurs échantillons/composés</td><td>Tableau</td></tr>
      <tr><td>Illustrer une structure moléculaire ou un mécanisme réactionnel</td><td>Figure (schéma)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Une règle simple : si l'information essentielle est la <strong>valeur numérique exacte</strong>, on privilégie le tableau ; si l'information essentielle est la <strong>forme, la tendance ou la comparaison visuelle</strong>, on privilégie la figure. Ne jamais dupliquer une même donnée à la fois en tableau ET en figure sans raison précise — c'est redondant.
    </div>

    <h3>2. La légende : un texte autonome</h3>
    <p>La règle d'or de toute légende (de tableau ou de figure) est qu'elle doit être <strong>compréhensible sans avoir à relire le corps du texte</strong> — un lecteur qui feuillette rapidement un rapport doit pouvoir comprendre chaque tableau et chaque figure rien qu'en lisant sa légende. Une légende complète précise généralement :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Ce qui est représenté (nature des données, grandeur physique)</li>
      <li>Les conditions expérimentales pertinentes (température, concentration, solvant, etc.)</li>
      <li>La signification des symboles, couleurs ou abréviations utilisés</li>
    </ul>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Comparer ces deux légendes pour un même graphique : (A) « Figure 1 : résultats du TP. » (B) « Figure 1 : évolution de l'absorbance à 350 nm en fonction du temps lors de la réaction entre les ions iodure et peroxodisulfate, à T = 25 °C, [I⁻]₀ = 0,10 mol/L, [S₂O₈²⁻]₀ = 0,020 mol/L. »</p>
      <p><strong>Solution :</strong> La légende (A) ne permet absolument pas de comprendre le graphique sans relire tout le rapport ; elle ne précise ni la grandeur mesurée, ni les conditions. La légende (B) est autonome : elle précise la grandeur (absorbance à 350 nm), la variable étudiée (temps), la réaction concernée, et les conditions expérimentales essentielles.</p>
      <p class="example-answer">Réponse : la légende (B) respecte la règle d'autonomie, la légende (A) ne la respecte pas du tout.</p>
    </div>

    <h3>3. Présenter un tableau de données scientifiques</h3>
    <p>Les tableaux scientifiques suivent des conventions précises, largement partagées :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Titre au-dessus</strong> du tableau (convention distincte des figures, dont la légende se place en dessous)</li>
      <li><strong>Unités systématiquement précisées</strong>, idéalement dans l'en-tête de colonne entre parenthèses ou crochets (ex : « Température (°C) »), jamais répétées dans chaque cellule</li>
      <li><strong>Nombre de chiffres significatifs cohérent</strong> avec la précision réelle de la mesure — ni excès de décimales illusoires, ni arrondi excessif faisant perdre de l'information (voir le cours de mesures et incertitudes)</li>
      <li><strong>Incertitudes indiquées</strong> lorsqu'elles sont pertinentes (ex : « 25,3 ± 0,2 °C »), sous une forme cohérente avec le nombre de chiffres significatifs de la valeur elle-même</li>
    </ul>

    <h3>4. Le texte qui accompagne les résultats</h3>
    <p>Un piège fréquent consiste à se contenter de renvoyer le lecteur vers un tableau ou une figure sans aucun commentaire (« voir Tableau 1 »), ou à l'inverse, à réécrire intégralement en texte toutes les valeurs déjà présentes dans le tableau. La bonne pratique consiste à :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Annoncer chaque tableau/figure et orienter la lecture (« Le Tableau 2 rassemble... », « Comme le montre la Figure 3... »)</li>
      <li>Mettre en évidence dans le texte les points saillants : valeur maximale, tendance générale, écart notable — sans réciter chaque chiffre</li>
      <li>Réserver l'interprétation de ces observations à la section Discussion (chapitre 5), pas ici</li>
    </ul>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Tableau pour des valeurs numériques exactes à comparer ; figure pour une tendance, une forme, une comparaison visuelle</li>
      <li>Une légende doit être autonome : compréhensible sans relire le corps du texte</li>
      <li>Un tableau scientifique précise systématiquement les unités (en en-tête, pas répétées), un nombre de chiffres significatifs cohérent, et les incertitudes le cas échéant</li>
      <li>Le texte accompagnant un tableau/figure oriente la lecture et souligne les points saillants, sans réciter toutes les valeurs ni les interpréter (réservé à la Discussion)</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier les unités dans l'en-tête d'un tableau, ou les répéter inutilement dans chaque cellule</li>
      <li>Présenter une même donnée à la fois en tableau et en figure sans raison</li>
      <li>Rédiger une légende trop courte, non compréhensible isolément («Figure 1 : résultats»)</li>
      <li>Interpréter les résultats directement dans le texte qui accompagne un tableau, au lieu de réserver cela à la Discussion</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pour présenter un spectre infrarouge complet, quel format est le plus adapté ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr4e1" value="wrong">Un tableau listant chaque point de mesure</label>
        <label class="option"><input type="radio" name="rr4e1" value="right">Une figure (graphique)</label>
        <label class="option"><input type="radio" name="rr4e1" value="wrong">Une simple phrase descriptive sans illustration</label>
        <label class="option"><input type="radio" name="rr4e1" value="wrong">Une annexe uniquement, sans mention dans le corps du texte</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr4e1','rr4fb1','Correct — un spectre montre une évolution continue (l\\'allure des bandes), c\\'est typiquement le cas d\\'usage d\\'une figure.','Pense à la règle : information essentielle = forme/tendance → figure ; valeurs numériques exactes → tableau.')">Vérifier</button>
      <div class="feedback" id="rr4fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Une légende de figure doit être :</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr4e2" value="wrong">La plus courte possible, quitte à renvoyer au texte</label>
        <label class="option"><input type="radio" name="rr4e2" value="right">Compréhensible sans avoir à relire le corps du texte</label>
        <label class="option"><input type="radio" name="rr4e2" value="wrong">Rédigée uniquement en anglais, quelle que soit la langue du rapport</label>
        <label class="option"><input type="radio" name="rr4e2" value="wrong">Placée obligatoirement au-dessus de la figure, comme pour un tableau</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr4e2','rr4fb2','Correct — c\\'est la règle d\\'autonomie de la légende : elle doit se suffire à elle-même.','Relis la règle d\\'or énoncée pour toute légende, qu\\'il s\\'agisse d\\'un tableau ou d\\'une figure.')">Vérifier</button>
      <div class="feedback" id="rr4fb2"></div>
    </div>
  </div>
  `
};
REDACRAP_NOVA_KB[rrKey("Présenter les résultats : tableaux, figures et légendes")] = {
  intro: "Salut, moi c'est Nova ! On parle de la présentation des résultats : tableaux, figures, légendes. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/tableau.*figure|figure.*tableau/i, replies:[
      "Règle simple : tableau pour des valeurs numériques exactes à comparer ; figure pour une tendance, une forme ou une comparaison visuelle (spectres, cinétiques, mécanismes)."
    ]},
    { test:/l[ée]gende/i, replies:[
      "Une légende doit être autonome : compréhensible sans avoir à relire le corps du texte. Elle précise la nature des données, les conditions expérimentales et la signification des symboles utilisés."
    ]},
    { test:/unit[ée]|chiffres significatifs|incertitude/i, replies:[
      "Dans un tableau scientifique : unités en en-tête de colonne (pas répétées dans chaque cellule), nombre de chiffres significatifs cohérent avec la précision réelle, et incertitudes indiquées quand pertinent (ex : 25,3 ± 0,2 °C)."
    ]},
    { test:/texte.*accompagn|commentaire.*r[ée]sultat/i, replies:[
      "Le texte qui accompagne un tableau/figure oriente la lecture et souligne les points saillants — sans réciter chaque valeur, et sans interpréter (réservé à la Discussion, chapitre 5)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : un spectre montre une allure continue, pas des valeurs isolées à comparer.",
      "Indice niveau 2 : quel format valorise une tendance ou une forme visuelle ?",
      "Indice niveau 3 : c'est une figure (graphique)."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : reviens à la règle d'or énoncée pour toute légende.",
      "Indice niveau 2 : le lecteur doit pouvoir comprendre sans relire tout le rapport.",
      "Indice niveau 3 : la légende doit donc être autonome, compréhensible seule."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
REDACRAP_CHAPTERS[rrKey("Rédiger la discussion et la conclusion")] = {
  objectives: [
    "Structurer une discussion qui interprète les résultats à la lumière de la problématique posée",
    "Discuter honnêtement les limites d'une méthode et les sources d'erreur",
    "Distinguer une conclusion réussie d'un simple résumé du rapport",
    "Formuler des perspectives ou recommandations pertinentes"
  ],
  prereqs: ["Rédiger l'introduction et poser la problématique", "Présenter les résultats : tableaux, figures et légendes"],
  bodyHtml: `
    <p>La Discussion est souvent la section la plus difficile à rédiger, car elle exige un véritable travail de raisonnement — contrairement aux Méthodes et aux Résultats qui restent largement descriptifs. C'est ici que se manifeste le plus clairement l'esprit critique du rédacteur.</p>

    <h3>1. Ce que doit accomplir une bonne discussion</h3>
    <p>Une discussion complète répond typiquement à quatre questions, généralement dans cet ordre :</p>
    <table class="mini-table">
      <tr><th>Question</th><th>Contenu attendu</th></tr>
      <tr><td>Que signifient les résultats ?</td><td>Interprétation à la lumière de la théorie et de la problématique posée en introduction</td></tr>
      <tr><td>Sont-ils cohérents avec ce qui était attendu ?</td><td>Comparaison avec une valeur théorique, la littérature, ou l'hypothèse de départ</td></tr>
      <tr><td>Quelles sont les limites ?</td><td>Sources d'erreur, approximations du modèle, limites de la méthode employée</td></tr>
      <tr><td>Que répondre à la problématique ?</td><td>Retour explicite sur la question posée en introduction</td></tr>
    </table>

    <h3>2. Discuter honnêtement les sources d'erreur</h3>
    <p>Un des marqueurs les plus nets de maturité scientifique dans un rapport est la capacité à discuter <strong>honnêtement et précisément</strong> les limites de son propre travail — sans pour autant tomber dans l'excès inverse (une auto-critique disproportionnée qui disqualifierait des résultats par ailleurs valables). On distingue généralement :</p>
    <table class="mini-table">
      <tr><th>Type de source d'erreur</th><th>Exemple</th></tr>
      <tr><td>Erreurs systématiques</td><td>Étalonnage imparfait d'un appareil, méthode biaisée par construction</td></tr>
      <tr><td>Erreurs aléatoires / de mesure</td><td>Incertitude de lecture, fluctuations statistiques</td></tr>
      <tr><td>Limites du modèle théorique</td><td>Approximations physiques ou chimiques du modèle utilisé pour interpréter</td></tr>
      <tr><td>Limites du protocole expérimental</td><td>Conditions non idéales, contraintes de temps ou de matériel</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Une discussion crédible ne se contente jamais d'affirmer vaguement « des erreurs de manipulation ont pu se produire » : elle identifie précisément <strong>quelle source d'erreur</strong>, estime si possible <strong>son ordre de grandeur</strong>, et évalue <strong>dans quel sens</strong> elle a pu affecter le résultat (sur- ou sous-estimation).
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un titrage acido-basique donne une concentration expérimentale 4 % plus élevée que la valeur attendue. Comparer ces deux façons de discuter cet écart : (A) « L'écart est probablement dû à des erreurs de manipulation. » (B) « L'écart de 4 % pourrait provenir d'un léger dépassement du volume équivalent lors du repérage visuel du virage coloré de l'indicateur, ce qui surestimerait systématiquement le volume versé et donc la concentration calculée. »</p>
      <p><strong>Solution :</strong> La formulation (A) est vague et n'apporte aucune information exploitable. La formulation (B) identifie une source précise (le repérage du virage), explique le mécanisme de l'erreur, et prédit correctement le sens de l'écart observé (surestimation).</p>
      <p class="example-answer">Réponse : la formulation (B) illustre une discussion rigoureuse des sources d'erreur, la formulation (A) est à éviter.</p>
    </div>

    <h3>3. La conclusion : plus qu'un résumé</h3>
    <p>Une erreur fréquente consiste à rédiger la conclusion comme un simple résumé chronologique de ce qui a été fait. Une bonne conclusion, au contraire :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Répond explicitement et directement à la problématique posée en introduction (referme la boucle ouverte au début)</li>
      <li>Synthétise en une ou deux phrases le résultat principal, sans réintroduire tous les détails déjà donnés</li>
      <li>Situe la portée réelle du travail : que peut-on affirmer avec certitude, et que reste-t-il incertain ?</li>
      <li>Ouvre, si pertinent, sur des <strong>perspectives</strong> concrètes (expériences complémentaires, applications possibles, prochaines étapes d'un projet)</li>
    </ul>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Introduction et conclusion se répondent en miroir : l'introduction pose une question, la conclusion y répond explicitement. Un bon test de cohérence consiste à relire uniquement la dernière phrase de l'introduction et la première phrase de la conclusion : elles doivent se correspondre presque terme à terme.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Une discussion complète répond à quatre questions : signification des résultats, cohérence avec l'attendu, limites, réponse à la problématique</li>
      <li>Les sources d'erreur doivent être identifiées précisément (type, ordre de grandeur, sens de l'effet), jamais évoquées vaguement</li>
      <li>Une conclusion réussie répond explicitement à la problématique de l'introduction — ce n'est pas un simple résumé chronologique</li>
      <li>Introduction et conclusion fonctionnent en miroir : la question posée doit trouver sa réponse explicite</li>
      <li>Une conclusion peut s'ouvrir sur des perspectives concrètes (expériences complémentaires, applications, suite d'un projet)</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Invoquer vaguement « des erreurs de manipulation » sans préciser la nature, l'ampleur ou le sens de l'erreur</li>
      <li>Rédiger une conclusion qui ne fait que résumer chronologiquement le déroulement du travail, sans répondre à la problématique</li>
      <li>Introduire un résultat ou une donnée nouvelle, jamais présentée avant, dans la Discussion ou la Conclusion</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quelle discussion d'une source d'erreur est la plus rigoureuse ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr5e1" value="wrong">« Il y a probablement eu des erreurs de manipulation. »</label>
        <label class="option"><input type="radio" name="rr5e1" value="right">« Le repérage visuel du virage a pu entraîner un léger excès de volume versé, ce qui surestime systématiquement la concentration calculée. »</label>
        <label class="option"><input type="radio" name="rr5e1" value="wrong">« Le résultat est faux à cause d'une erreur humaine. »</label>
        <label class="option"><input type="radio" name="rr5e1" value="wrong">Aucune des deux, il ne faut jamais mentionner d'erreur</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr5e1','rr5fb1','Correct — cette formulation identifie précisément la source, explique le mécanisme et prédit le sens de l\\'écart.','Cherche la formulation qui identifie précisément une source, son mécanisme, et le sens de l\\'effet sur le résultat.')">Vérifier</button>
      <div class="feedback" id="rr5fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Qu'est-ce qui distingue une bonne conclusion d'un simple résumé du rapport ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr5e2" value="wrong">Elle doit être plus longue que l'introduction</label>
        <label class="option"><input type="radio" name="rr5e2" value="right">Elle répond explicitement à la problématique posée en introduction</label>
        <label class="option"><input type="radio" name="rr5e2" value="wrong">Elle doit citer toutes les valeurs numériques déjà présentées</label>
        <label class="option"><input type="radio" name="rr5e2" value="wrong">Elle doit introduire de nouveaux résultats non présentés avant</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr5e2','rr5fb2','Correct — la conclusion referme la boucle ouverte par la problématique de l\\'introduction, elle ne se contente pas de résumer.','Repense au fonctionnement en miroir entre introduction et conclusion.')">Vérifier</button>
      <div class="feedback" id="rr5fb2"></div>
    </div>
  </div>
  `
};
REDACRAP_NOVA_KB[rrKey("Rédiger la discussion et la conclusion")] = {
  intro: "Salut, moi c'est Nova ! On travaille la discussion et la conclusion : interprétation, sources d'erreur, réponse à la problématique. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/discussion/i, replies:[
      "Une discussion complète répond à quatre questions dans l'ordre : que signifient les résultats ? sont-ils cohérents avec l'attendu ? quelles limites ? quelle réponse à la problématique ?"
    ]},
    { test:/source d.erreur|erreur syst[ée]matique|erreur al[ée]atoire/i, replies:[
      "Une discussion rigoureuse des erreurs identifie précisément le type (systématique/aléatoire/modèle/protocole), estime son ordre de grandeur si possible, et évalue le sens de son effet (sur- ou sous-estimation) — jamais une formule vague comme « erreurs de manipulation »."
    ]},
    { test:/conclusion/i, replies:[
      "Une bonne conclusion répond explicitement à la problématique de l'introduction (fonctionnement en miroir), sans se limiter à un résumé chronologique du travail effectué."
    ]},
    { test:/perspective|recommandation/i, replies:[
      "Une conclusion peut s'ouvrir sur des perspectives concrètes : expériences complémentaires à mener, applications possibles, ou prochaines étapes d'un projet."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : cherche la formulation la plus précise, pas la plus vague.",
      "Indice niveau 2 : une bonne discussion identifie le mécanisme précis de l'erreur.",
      "Indice niveau 3 : c'est la formulation qui explique le repérage du virage et son effet de surestimation."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense au fonctionnement en miroir entre introduction et conclusion.",
      "Indice niveau 2 : la conclusion ne doit pas se contenter de résumer chronologiquement.",
      "Indice niveau 3 : elle doit répondre explicitement à la problématique posée au début."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
REDACRAP_CHAPTERS[rrKey("Références bibliographiques et normes de citation")] = {
  objectives: [
    "Comprendre pourquoi et quand citer une source dans un rapport scientifique",
    "Distinguer citation directe, citation indirecte (paraphrase) et plagiat",
    "Connaître les grands systèmes de citation utilisés en sciences (auteur-date, numérique/Vancouver, style ACS)",
    "Construire une liste de références bibliographiques correctement formatée"
  ],
  prereqs: ["Le rapport scientifique : finalités, types et destinataires"],
  bodyHtml: `
    <p>Toute affirmation qui ne provient pas des résultats propres de l'auteur — une donnée de la littérature, une méthode empruntée à un autre travail, une théorie établie par d'autres — doit être <strong>tracée par une référence bibliographique</strong>. C'est une exigence à la fois éthique (reconnaître le travail d'autrui) et pratique (permettre au lecteur de vérifier ou d'approfondir une source).</p>

    <h3>1. Pourquoi et quand citer ?</h3>
    <p>On cite une source chaque fois que l'on s'appuie sur :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Une donnée numérique ou expérimentale qui ne vient pas de son propre travail (valeur tabulée, résultat publié)</li>
      <li>Une méthode, un protocole ou une théorie établie ailleurs et reprise/adaptée dans le rapport</li>
      <li>Une affirmation générale sur l'état des connaissances qui n'est pas un « fait de culture générale » du domaine</li>
      <li>Une citation directe (reprise mot pour mot) d'un texte existant</li>
    </ul>
    <p>À l'inverse, on ne cite généralement pas des connaissances de base largement établies et enseignées (ex : la loi de Bragg, la table de Mendeleïev) sauf lorsqu'on en discute une formulation ou un historique précis.</p>

    <h3>2. Citation directe, citation indirecte et plagiat</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Définition</th><th>Usage recommandé</th></tr>
      <tr><td>Citation directe</td><td>Reprise mot pour mot d'un passage, entre guillemets, avec la référence exacte</td><td>Rare en sciences expérimentales ; réservée aux formulations qu'on souhaite discuter précisément</td></tr>
      <tr><td>Citation indirecte (paraphrase)</td><td>Reformulation avec ses propres mots de l'idée d'une source, avec référence</td><td>La forme la plus courante et recommandée en rédaction scientifique</td></tr>
      <tr><td>Plagiat</td><td>Reprise (mot pour mot ou quasi identique) d'un contenu sans le signaler ni le référencer</td><td>Faute grave, sanctionnée dans tous les cursus et toutes les revues scientifiques</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Changer quelques mots d'une phrase sans en modifier substantiellement la structure et les idées, tout en omettant la référence, reste du <strong>plagiat</strong> — ce n'est pas parce qu'un texte est reformulé qu'il devient automatiquement une paraphrase acceptable. La règle est simple : si l'idée n'est pas de soi, elle doit être référencée, quelle que soit la formulation utilisée.
    </div>

    <h3>3. Les grands systèmes de citation en sciences</h3>
    <table class="mini-table">
      <tr><th>Système</th><th>Principe</th><th>Exemple d'appel dans le texte</th><th>Domaine d'usage typique</th></tr>
      <tr><td>Auteur-date (Harvard)</td><td>Le nom de l'auteur et l'année apparaissent directement dans le texte</td><td>(Bragg et Bragg, 1913)</td><td>Sciences de la vie, sciences humaines</td></tr>
      <tr><td>Numérique séquentiel (Vancouver)</td><td>Chaque référence reçoit un numéro, dans l'ordre de première apparition</td><td>[3]</td><td>Médecine, nombreuses revues de chimie et physique</td></tr>
      <tr><td>Style ACS (American Chemical Society)</td><td>Variante numérique très largement utilisée en chimie, avec un format de bibliographie standardisé</td><td>¹ ou (3)</td><td>Chimie (revues ACS, JACS, Angewandte Chemie, etc.)</td></tr>
    </table>
    <p>Le choix du système dépend généralement de la consigne du cours, de la revue visée ou des habitudes du laboratoire — l'important est d'appliquer <strong>un seul système, de façon rigoureusement cohérente</strong>, du début à la fin du document.</p>

    <h3>4. Construire une référence bibliographique complète</h3>
    <p>Quel que soit le style, une référence complète permet en principe de retrouver exactement la source. Les éléments essentiels varient selon le type de document :</p>
    <table class="mini-table">
      <tr><th>Type de source</th><th>Éléments essentiels à inclure</th></tr>
      <tr><td>Article de revue scientifique</td><td>Auteur(s), année, titre de l'article, nom de la revue (souvent abrégé), volume, pages, DOI si disponible</td></tr>
      <tr><td>Livre / ouvrage</td><td>Auteur(s), année, titre, édition, éditeur, ville</td></tr>
      <tr><td>Site web / ressource en ligne</td><td>Auteur ou organisme, titre de la page, URL, date de consultation (car le contenu web peut évoluer)</td></tr>
      <tr><td>Thèse / mémoire</td><td>Auteur, année, titre, type de document, établissement</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un étudiant reprend, sans le citer, un paragraphe entier d'un site web qu'il a simplement reformulé phrase par phrase en gardant la même structure et les mêmes idées. Est-ce acceptable ?</p>
      <p><strong>Solution :</strong> Non — même reformulé, ce contenu reste directement issu d'une source précise ; l'omission de la référence en fait un plagiat, indépendamment de la reformulation apportée. Il faudrait soit citer explicitement la source (avec une vraie reformulation personnelle et une référence), soit, si le passage est jugé essentiel tel quel, le mettre entre guillemets avec une citation directe référencée.</p>
      <p class="example-answer">Réponse : non, ce n'est pas acceptable — c'est un plagiat, la reformulation seule ne dispense jamais de la référence.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>On cite toute donnée, méthode ou affirmation qui ne provient pas de son propre travail</li>
      <li>La citation indirecte (paraphrase référencée) est la forme la plus courante en rédaction scientifique ; la citation directe reste rare</li>
      <li>Le plagiat = reprise d'un contenu sans référence, même reformulé — c'est une faute grave</li>
      <li>Trois grands systèmes : auteur-date (Harvard), numérique séquentiel (Vancouver), style ACS (très utilisé en chimie)</li>
      <li>Un système de citation choisi doit être appliqué de façon rigoureusement cohérente dans tout le document</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire qu'une simple reformulation dispense de citer la source d'origine</li>
      <li>Mélanger plusieurs systèmes de citation dans un même document</li>
      <li>Oublier la date de consultation pour une ressource web, dont le contenu peut évoluer ou disparaître</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Reformuler un paragraphe d'une source avec ses propres mots, sans citer la référence, constitue :</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr6e1" value="wrong">Une citation indirecte tout à fait acceptable</label>
        <label class="option"><input type="radio" name="rr6e1" value="right">Un plagiat, malgré la reformulation</label>
        <label class="option"><input type="radio" name="rr6e1" value="wrong">Une citation directe</label>
        <label class="option"><input type="radio" name="rr6e1" value="wrong">Une pratique normale qui ne nécessite aucune référence</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr6e1','rr6fb1','Correct — l\\'omission de la référence rend la reformulation constitutive d\\'un plagiat, quelle que soit la qualité de la reformulation.','Relis le point clé : que se passe-t-il si l\\'idée n\\'est pas de soi et que la référence est omise, même reformulée ?')">Vérifier</button>
      <div class="feedback" id="rr6fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Le style de citation le plus largement utilisé dans les revues de chimie (ACS, JACS...) est de type :</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr6e2" value="wrong">Auteur-date uniquement</label>
        <label class="option"><input type="radio" name="rr6e2" value="right">Numérique (variante ACS)</label>
        <label class="option"><input type="radio" name="rr6e2" value="wrong">Aucune référence n'est jamais nécessaire en chimie</label>
        <label class="option"><input type="radio" name="rr6e2" value="wrong">Uniquement des notes de bas de page sans liste finale</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr6e2','rr6fb2','Correct — le style ACS, une variante numérique, est le standard des grandes revues de chimie.','Relis le tableau des systèmes de citation : quel style est associé au domaine de la chimie ?')">Vérifier</button>
      <div class="feedback" id="rr6fb2"></div>
    </div>
  </div>
  `
};
REDACRAP_NOVA_KB[rrKey("Références bibliographiques et normes de citation")] = {
  intro: "Salut, moi c'est Nova ! On parle de citations et de références bibliographiques. Pose-moi une question sur un système de citation, ou demande un indice.",
  rules: [
    { test:/plagiat/i, replies:[
      "Le plagiat, c'est reprendre un contenu (même reformulé) sans le référencer. La reformulation seule ne dispense jamais de citer la source d'origine de l'idée."
    ]},
    { test:/citation directe|citation indirecte|paraphrase/i, replies:[
      "La citation directe reprend un passage mot pour mot entre guillemets (rare en sciences). La citation indirecte (paraphrase référencée) est la forme la plus courante en rédaction scientifique."
    ]},
    { test:/harvard|vancouver|acs|syst[èe]me de citation/i, replies:[
      "Trois grands systèmes : auteur-date/Harvard (ex : Bragg et Bragg, 1913), numérique séquentiel/Vancouver ([3]), et style ACS (variante numérique très utilisée en chimie). Un seul système par document, appliqué de façon cohérente."
    ]},
    { test:/r[ée]f[ée]rence.*compl[èe]te|bibliographie/i, replies:[
      "Une référence complète permet de retrouver la source : pour un article, auteurs, année, titre, revue, volume, pages (et DOI si possible) ; pour un site web, ajouter la date de consultation."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à ce qui définit le plagiat, indépendamment de la reformulation.",
      "Indice niveau 2 : ce qui compte, c'est l'absence de référence, pas la formulation exacte.",
      "Indice niveau 3 : c'est donc un plagiat, malgré la reformulation."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le tableau des systèmes de citation par domaine d'usage.",
      "Indice niveau 2 : le style associé à la chimie est une variante numérique.",
      "Indice niveau 3 : c'est le style ACS."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
REDACRAP_CHAPTERS[rrKey("Le style scientifique : clarté, précision et objectivité")] = {
  objectives: [
    "Appliquer les principes de clarté et de concision propres à l'écriture scientifique",
    "Choisir judicieusement entre voix active et voix passive selon le contexte",
    "Utiliser correctement les temps verbaux dans chaque section d'un rapport",
    "Éviter les tournures subjectives et les approximations lexicales"
  ],
  prereqs: ["La structure IMRaD : architecture d'un rapport scientifique"],
  bodyHtml: `
    <p>Au-delà de la structure du rapport, c'est la <strong>langue elle-même</strong> qui doit servir la clarté scientifique. Un style scientifique efficace n'est ni pauvre ni ampoulé : il vise la précision et la lisibilité, jamais l'effet littéraire pour lui-même.</p>

    <h3>1. Les principes de clarté</h3>
    <table class="mini-table">
      <tr><th>Principe</th><th>Application concrète</th></tr>
      <tr><td>Une idée par phrase</td><td>Éviter les phrases à tiroirs multiples, préférer plusieurs phrases courtes à une phrase longue et enchevêtrée</td></tr>
      <tr><td>Sujet proche du verbe</td><td>Éviter d'intercaler de longues subordonnées entre le sujet et le verbe principal</td></tr>
      <tr><td>Vocabulaire précis et constant</td><td>Utiliser toujours le même terme pour désigner une même notion (éviter les synonymes « pour la variation stylistique » qui créent de l'ambiguïté)</td></tr>
      <tr><td>Quantification systématique</td><td>Préférer « une augmentation de 15 % » à « une augmentation notable »</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Contrairement à la rédaction littéraire, où la variation lexicale est valorisée, la rédaction scientifique privilégie la <strong>répétition contrôlée</strong> d'un même terme technique pour désigner une même réalité tout au long du rapport. Appeler tantôt « le composé », tantôt « la molécule », tantôt « le produit » un même objet peut faire naître un doute inutile chez le lecteur : s'agit-il du même composé ou de trois entités différentes ?
    </div>

    <h3>2. Voix active et voix passive</h3>
    <p>Les deux voix ont leur place en rédaction scientifique, mais avec des usages différents :</p>
    <table class="mini-table">
      <tr><th>Voix</th><th>Usage typique</th><th>Exemple</th></tr>
      <tr><td>Passive</td><td>Section Méthodes, lorsqu'on décrit une procédure standardisée où l'acteur (l'expérimentateur) importe peu</td><td>« Le mélange a été chauffé à reflux pendant deux heures. »</td></tr>
      <tr><td>Active</td><td>Discussion et interprétation, lorsqu'on veut souligner un raisonnement ou une prise de position claire</td><td>« Ce résultat confirme l'hypothèse d'un mécanisme SN2. »</td></tr>
    </table>
    <p>Certaines revues et certains styles maison imposent une préférence marquée pour l'une ou l'autre voix — il convient donc de vérifier les consignes spécifiques du contexte (enseignant, revue, entreprise) avant de rédiger.</p>

    <h3>3. Les temps verbaux selon la section</h3>
    <p>Un aspect souvent négligé mais très révélateur de la maîtrise du style scientifique est la <strong>cohérence des temps verbaux</strong> selon la nature de l'information rapportée :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Présent :</strong> pour les faits généraux, établis et intemporels (« L'eau bout à 100 °C sous pression atmosphérique normale »), et pour l'interprétation dans la Discussion</li>
      <li><strong>Passé composé / passé simple :</strong> pour décrire ce qui a été fait spécifiquement dans ce travail (Méthodes, Résultats) — un événement daté, propre à cette expérience précise</li>
      <li><strong>Conditionnel :</strong> pour formuler une hypothèse prudente, une explication possible mais non prouvée avec certitude</li>
    </ul>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Corriger la cohérence temporelle de cette phrase de section Résultats : « Le produit obtenu fond à 118 °C, ce qui confirme qu'il s'agissait bien de l'acide benzoïque. »</p>
      <p><strong>Solution :</strong> Le point de fusion mesuré est un fait établi lors de cette expérience précise (passé), tandis que la comparaison à une valeur théorique relève de l'interprétation (à réserver, en toute rigueur, à la Discussion). Une version plus cohérente en section Résultats serait : « Le produit obtenu a fondu à 118 °C. » — l'interprétation (« ce qui confirme... ») serait déplacée en Discussion.</p>
      <p class="example-answer">Réponse : séparer le fait mesuré (Résultats, passé composé) de son interprétation (Discussion, présent), conformément au cloisonnement IMRaD vu au chapitre 2.</p>
    </div>

    <h3>4. Objectivité et prudence dans les affirmations</h3>
    <p>Le style scientifique évite les tournures trop catégoriques lorsque les données ne permettent pas une certitude absolue, sans pour autant tomber dans un excès de prudence qui viderait le texte de tout contenu. On distingue plusieurs niveaux de certitude, à choisir selon la solidité réelle des preuves apportées :</p>
    <table class="mini-table">
      <tr><th>Niveau de certitude</th><th>Formulations typiques</th></tr>
      <tr><td>Fait établi, mesuré directement</td><td>« Le rendement obtenu est de 78 %. »</td></tr>
      <tr><td>Conclusion bien étayée par les données</td><td>« Ces résultats confirment/montrent que... »</td></tr>
      <tr><td>Interprétation plausible mais non prouvée avec certitude</td><td>« Ces résultats suggèrent que... », « Il est probable que... »</td></tr>
      <tr><td>Hypothèse à confirmer par des travaux futurs</td><td>« On pourrait envisager que... », « Il serait intéressant de vérifier si... »</td></tr>
    </table>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le style scientifique privilégie une idée par phrase, un sujet proche du verbe, et un vocabulaire technique constant (pas de synonymes stylistiques pour un même objet)</li>
      <li>Voix passive plutôt en Méthodes (procédure standardisée), voix active plutôt en Discussion (raisonnement, prise de position)</li>
      <li>Temps verbaux : présent pour les faits généraux et l'interprétation, passé pour ce qui a été fait spécifiquement dans ce travail, conditionnel pour une hypothèse prudente</li>
      <li>Le niveau de certitude d'une affirmation (confirme / suggère / pourrait) doit refléter honnêtement la solidité réelle des données apportées</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Varier inutilement le vocabulaire technique par souci de « style », créant de l'ambiguïté sur l'objet désigné</li>
      <li>Mélanger un fait mesuré et son interprétation dans la même phrase, en section Résultats</li>
      <li>Affirmer avec une certitude excessive (« démontre que... ») une conclusion qui n'est en réalité que plausible</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pourquoi éviter les synonymes stylistiques pour désigner un même composé chimique tout au long d'un rapport ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr7e1" value="wrong">Parce que c'est interdit par la langue française</label>
        <label class="option"><input type="radio" name="rr7e1" value="right">Parce que cela peut faire croire au lecteur qu'il s'agit d'entités différentes</label>
        <label class="option"><input type="radio" name="rr7e1" value="wrong">Parce que cela allonge inutilement le texte</label>
        <label class="option"><input type="radio" name="rr7e1" value="wrong">Ce n'est pas un problème en rédaction scientifique</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr7e1','rr7fb1','Correct — la répétition contrôlée d\\'un même terme technique évite toute ambiguïté sur l\\'identité de l\\'objet désigné.','Repense à la différence entre rédaction littéraire (variation valorisée) et rédaction scientifique (précision avant tout).')">Vérifier</button>
      <div class="feedback" id="rr7fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Quelle formulation convient le mieux à une interprétation plausible mais non totalement prouvée ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr7e2" value="wrong">« Cela démontre de façon certaine que... »</label>
        <label class="option"><input type="radio" name="rr7e2" value="right">« Ces résultats suggèrent que... »</label>
        <label class="option"><input type="radio" name="rr7e2" value="wrong">« C'est un fait absolu et incontestable que... »</label>
        <label class="option"><input type="radio" name="rr7e2" value="wrong">Aucune formulation n'est nécessaire, il faut juste affirmer directement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr7e2','rr7fb2','Correct — « suggèrent » exprime un niveau de certitude approprié à une interprétation plausible mais non prouvée avec certitude absolue.','Relis le tableau des niveaux de certitude : quelle formulation correspond à une interprétation plausible, pas à un fait prouvé ?')">Vérifier</button>
      <div class="feedback" id="rr7fb2"></div>
    </div>
  </div>
  `
};
REDACRAP_NOVA_KB[rrKey("Le style scientifique : clarté, précision et objectivité")] = {
  intro: "Salut, moi c'est Nova ! On travaille le style scientifique : clarté, voix active/passive, temps verbaux, niveaux de certitude. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/clart[ée]|une id[ée]e par phrase/i, replies:[
      "Principes de clarté : une idée par phrase, sujet proche du verbe, vocabulaire technique constant (pas de synonymes stylistiques pour un même objet), quantification systématique plutôt que des adjectifs vagues."
    ]},
    { test:/voix active|voix passive/i, replies:[
      "La voix passive convient bien à la section Méthodes (procédure standardisée). La voix active convient bien à la Discussion, pour souligner clairement un raisonnement ou une interprétation."
    ]},
    { test:/temps verbal|pr[ée]sent|pass[ée] compos[ée]|conditionnel/i, replies:[
      "Présent : faits généraux et interprétation. Passé composé : ce qui a été fait spécifiquement dans ce travail (Méthodes, Résultats). Conditionnel : hypothèse prudente, non prouvée avec certitude."
    ]},
    { test:/certitude|suggèrent|d[ée]montrent|objectivit[ée]/i, replies:[
      "Le niveau de certitude d'une affirmation doit refléter la solidité réelle des données : « démontre/confirme » pour une conclusion bien étayée, « suggère/il est probable que » pour une interprétation plausible mais non prouvée."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à ce que provoque un changement de terme pour désigner le même objet.",
      "Indice niveau 2 : le lecteur peut croire à tort qu'il s'agit d'objets différents.",
      "Indice niveau 3 : c'est donc une source d'ambiguïté, à éviter par la répétition contrôlée du même terme."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le tableau des niveaux de certitude.",
      "Indice niveau 2 : cherche la formulation associée à une interprétation plausible, pas un fait prouvé.",
      "Indice niveau 3 : c'est « ces résultats suggèrent que... »."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
REDACRAP_CHAPTERS[rrKey("Le rapport de stage et la soutenance orale")] = {
  objectives: [
    "Adapter la structure IMRaD aux spécificités d'un rapport de stage",
    "Présenter clairement une structure d'accueil et un contexte professionnel",
    "Préparer une soutenance orale efficace : structure, supports visuels, gestion du temps",
    "Anticiper et gérer les questions du jury lors d'une soutenance"
  ],
  prereqs: ["La structure IMRaD : architecture d'un rapport scientifique", "Le style scientifique : clarté, précision et objectivité"],
  bodyHtml: `
    <p>Le rapport de stage constitue souvent le premier document professionnel long qu'un étudiant en chimie doit produire, et il s'accompagne généralement d'une <strong>soutenance orale</strong> devant un jury. Ce dernier chapitre applique l'ensemble des principes vus précédemment à ce contexte spécifique, et aborde les particularités de la communication orale.</p>

    <h3>1. Les spécificités du rapport de stage</h3>
    <p>Par rapport à un compte-rendu de TP ou un rapport de projet universitaire, le rapport de stage ajoute généralement des éléments propres au contexte professionnel :</p>
    <table class="mini-table">
      <tr><th>Section additionnelle</th><th>Contenu attendu</th></tr>
      <tr><td>Présentation de la structure d'accueil</td><td>Activité, taille, organisation, positionnement du service d'accueil — brève et factuelle, jamais un simple copier-coller du site web de l'entreprise</td></tr>
      <tr><td>Contexte et enjeux de la mission</td><td>Pourquoi cette mission a-t-elle été confiée ? Quel besoin réel de l'organisme d'accueil ?</td></tr>
      <tr><td>Missions réalisées</td><td>Peut fusionner Méthodes et Résultats ; détaille les tâches effectivement menées, avec un regard critique sur les apports et les limites</td></tr>
      <tr><td>Bilan personnel / compétences acquises</td><td>Souvent attendu en fin de rapport de stage (moins présent dans un article scientifique classique) : apports méthodologiques, techniques, humains du stage pour l'étudiant</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Même dans un rapport de stage, la logique IMRaD reste la colonne vertébrale du document : contexte/problématique (introduction élargie incluant la structure d'accueil) → méthodes/missions → résultats obtenus → discussion et bilan. La présentation de l'entreprise ne doit jamais occuper une part disproportionnée du rapport au détriment du travail réellement accompli et de son analyse critique.
    </div>

    <h3>2. Préparer une soutenance orale efficace</h3>
    <p>Une soutenance orale n'est pas une lecture du rapport écrit : c'est un exercice de communication à part entière, avec ses propres contraintes. Quelques principes structurants :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Adapter le contenu au temps imparti :</strong> une soutenance de 10-15 minutes ne peut couvrir tous les détails du rapport écrit — il faut sélectionner les points essentiels, pas résumer proportionnellement chaque section</li>
      <li><strong>Structurer autour d'un fil conducteur clair :</strong> contexte → problématique → démarche → résultats clés → conclusion, en évitant les digressions</li>
      <li><strong>Limiter le texte sur les supports visuels :</strong> un support de présentation efficace privilégie les schémas, graphiques et mots-clés plutôt que des paragraphes entiers recopiés du rapport</li>
      <li><strong>S'entraîner à voix haute et chronométrer :</strong> le rythme de parole en situation de stress diffère souvent de celui d'une répétition silencieuse</li>
    </ul>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un étudiant prépare une soutenance de 10 minutes pour un rapport de stage de 40 pages. Comment doit-il procéder pour sélectionner le contenu de sa présentation ?</p>
      <p><strong>Solution :</strong> Il ne doit pas tenter de résumer proportionnellement chaque section des 40 pages (ce qui donnerait une présentation superficielle et décousue), mais identifier 3 à 5 messages clés qu'il souhaite absolument transmettre au jury (la problématique de la mission, la méthode principale employée, le résultat le plus significatif, et le bilan/les perspectives), puis construire la présentation autour de ces messages, en renvoyant les détails secondaires au rapport écrit ou aux questions du jury.</p>
      <p class="example-answer">Réponse : sélectionner un petit nombre de messages clés hiérarchisés plutôt que de résumer proportionnellement l'ensemble du document.</p>
    </div>

    <h3>3. Gérer les questions du jury</h3>
    <p>La phase de questions-réponses qui suit la présentation est souvent celle où se joue réellement l'évaluation de la maîtrise du sujet par l'étudiant — bien plus que la simple récitation d'un exposé préparé à l'avance. Quelques conseils pratiques :</p>
    <table class="mini-table">
      <tr><th>Situation</th><th>Attitude recommandée</th></tr>
      <tr><td>Question sur un point de méthode</td><td>Expliquer précisément le raisonnement suivi, y compris les alternatives envisagées et écartées</td></tr>
      <tr><td>Question sur une limite ou une faiblesse du travail</td><td>Reconnaître honnêtement les limites (cohérent avec l'esprit critique de la Discussion, chapitre 5) plutôt que de se justifier de façon défensive</td></tr>
      <tr><td>Question à laquelle on ne connaît pas la réponse</td><td>Reconnaître calmement ne pas savoir plutôt que d'improviser une réponse incorrecte ; proposer éventuellement une piste de réflexion</td></tr>
      <tr><td>Question hors sujet ou mal comprise</td><td>Demander une reformulation ou une précision avant de répondre, plutôt que de répondre à côté</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé — pour conclure ce cours</span>
      La rédaction de rapport et la soutenance orale ne sont pas des compétences séparées de la pratique scientifique elle-même : elles en sont le prolongement naturel. Un travail expérimental rigoureux mais mal communiqué perd une grande partie de sa valeur, tandis qu'une communication claire et honnête — même de résultats imparfaits ou de conclusions nuancées — renforce la crédibilité scientifique de son auteur. C'est cette compétence, transversale à toute la formation en chimie, que ce cours a cherché à construire.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le rapport de stage ajoute à la structure IMRaD une présentation de la structure d'accueil, le contexte de la mission, et souvent un bilan personnel</li>
      <li>La logique IMRaD reste la colonne vertébrale, même dans un rapport de stage : la présentation de l'entreprise ne doit jamais dominer le rapport</li>
      <li>Une soutenance orale efficace sélectionne 3 à 5 messages clés plutôt que de résumer proportionnellement tout le rapport écrit</li>
      <li>Face aux questions du jury : expliquer le raisonnement, reconnaître honnêtement les limites, admettre ne pas savoir plutôt qu'improviser, demander une reformulation si besoin</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Consacrer une part disproportionnée du rapport ou de la soutenance à la présentation de l'entreprise, au détriment du travail réalisé</li>
      <li>Vouloir résumer proportionnellement chaque section du rapport écrit dans une présentation orale bien plus courte</li>
      <li>Se montrer défensif ou improviser une réponse incorrecte face à une question sur une limite du travail</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pour préparer une soutenance courte à partir d'un long rapport écrit, la meilleure stratégie consiste à :</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr8e1" value="wrong">Résumer proportionnellement chaque section du rapport</label>
        <label class="option"><input type="radio" name="rr8e1" value="right">Sélectionner un petit nombre de messages clés hiérarchisés</label>
        <label class="option"><input type="radio" name="rr8e1" value="wrong">Lire directement des extraits du rapport écrit</label>
        <label class="option"><input type="radio" name="rr8e1" value="wrong">Se concentrer uniquement sur la présentation de l'entreprise</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr8e1','rr8fb1','Correct — sélectionner 3 à 5 messages clés hiérarchisés donne une présentation cohérente, contrairement à un résumé proportionnel qui dilue l\\'attention du jury.','Repense à l\\'exemple corrigé sur la soutenance de 10 minutes pour un rapport de 40 pages.')">Vérifier</button>
      <div class="feedback" id="rr8fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Face à une question du jury à laquelle on ne connaît pas la réponse, la meilleure attitude est :</p>
      <div class="options">
        <label class="option"><input type="radio" name="rr8e2" value="wrong">Improviser une réponse plausible pour ne pas paraître incompétent</label>
        <label class="option"><input type="radio" name="rr8e2" value="right">Reconnaître calmement ne pas savoir, en proposant éventuellement une piste de réflexion</label>
        <label class="option"><input type="radio" name="rr8e2" value="wrong">Changer de sujet vers un point plus maîtrisé sans le signaler</label>
        <label class="option"><input type="radio" name="rr8e2" value="wrong">Contester la pertinence de la question</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('rr8e2','rr8fb2','Correct — reconnaître honnêtement ne pas savoir, sans se justifier de façon défensive, est perçu bien plus positivement par un jury qu\\'une improvisation incorrecte.','Relis le tableau de gestion des questions du jury : quelle attitude est recommandée quand on ne connaît pas la réponse ?')">Vérifier</button>
      <div class="feedback" id="rr8fb2"></div>
    </div>
  </div>
  `
};
REDACRAP_NOVA_KB[rrKey("Le rapport de stage et la soutenance orale")] = {
  intro: "Salut, moi c'est Nova ! On termine avec le rapport de stage et la soutenance orale. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/structure d.accueil|entreprise|stage/i, replies:[
      "Le rapport de stage ajoute à IMRaD : présentation de la structure d'accueil (brève et factuelle), contexte de la mission, missions réalisées, et souvent un bilan personnel — mais la logique IMRaD reste la colonne vertébrale."
    ]},
    { test:/soutenance/i, replies:[
      "Une soutenance efficace sélectionne 3 à 5 messages clés hiérarchisés (pas un résumé proportionnel de tout le rapport), avec des supports visuels sobres (schémas, mots-clés plutôt que texte dense)."
    ]},
    { test:/jury|question/i, replies:[
      "Face aux questions du jury : explique ton raisonnement, reconnais honnêtement les limites de ton travail, admets calmement ne pas savoir plutôt que d'improviser, et demande une reformulation si la question n'est pas claire."
    ]},
    { test:/support|diapositive|pr[ée]sentation/i, replies:[
      "Un bon support de présentation privilégie schémas, graphiques et mots-clés — pas des paragraphes entiers recopiés du rapport écrit."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à l'exemple du rapport de 40 pages en 10 minutes.",
      "Indice niveau 2 : résumer proportionnellement chaque section donne une présentation décousue.",
      "Indice niveau 3 : il vaut mieux sélectionner 3 à 5 messages clés hiérarchisés."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à ce qui est perçu positivement par un jury en cas d'incertitude.",
      "Indice niveau 2 : improviser une réponse fausse est pire que d'admettre ne pas savoir.",
      "Indice niveau 3 : la meilleure attitude est de reconnaître calmement ne pas savoir, en proposant une piste."
    ]}
  ]
};

/* fusionne le module Technique de rédaction de rapport dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, REDACRAP_CHAPTERS);
Object.assign(NOVA_KB, REDACRAP_NOVA_KB);