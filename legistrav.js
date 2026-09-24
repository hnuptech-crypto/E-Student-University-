/* =====================================================================
   CHUNK « legistrav » — registre LEGISTRAV_CHAPTERS / LEGISTRAV_NOVA_KB
   Matière(s) : Autres|Législation et droit du travail
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   LEGISTRAV_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* =====================================================================================
   MODULE — LÉGISLATION ET DROIT DU TRAVAIL (L3CF, domaine "Autres")
   fusionné à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu ancré dans le droit béninois : sources du droit du travail (Loi n°98-004 du
   27 janvier 1998 portant Code du travail de la République du Bénin, complétée
   notamment par la Loi n°2017-05 relative à l'embauche, au placement de main-d'œuvre
   et à la résiliation du contrat de travail), contrat de travail (CDI/CDD, période
   d'essai), durée du travail et congés, rémunération (SMIG, cotisations CNSS),
   hygiène-sécurité-médecine du travail, cessation de la relation de travail,
   représentation collective (délégués du personnel, conventions collectives),
   protection sociale et règlement des litiges (juridictions du travail) — conforme
   aux enseignements transversaux de méthodologie professionnelle en L3 Chimie
   Fondamentale. Références de fond : Code du travail béninois (Loi 98-004 et textes
   modificatifs), Convention collective générale du travail, CNSS Bénin, cadre
   harmonisé UEMOA et normes de l'Organisation Internationale du Travail (OIT).
===================================================================================== */
const LEGISTRAV_MATIERE = 'Législation et droit du travail';
function ldtKey(chapterTitle){ return `Autres|${LEGISTRAV_MATIERE}|${chapterTitle}`; }
const LEGISTRAV_CHAPTERS = {};
const LEGISTRAV_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
LEGISTRAV_CHAPTERS[ldtKey("Sources et cadre du droit du travail béninois")] = {
  objectives: [
    "Identifier les principales sources du droit du travail applicable au Bénin",
    "Situer la hiérarchie des normes entre loi, convention collective, accord d'entreprise et contrat individuel",
    "Comprendre le champ d'application du Code du travail et ses principales exclusions",
    "Percevoir l'enjeu de ces règles pour un jeune chimiste entrant sur le marché du travail"
  ],
  prereqs: ["Le rapport scientifique : finalités, types et destinataires (cours de rédaction de rapport)"],
  bodyHtml: `
    <p>Tout diplômé en chimie appelé à travailler en laboratoire, dans l'industrie ou l'enseignement au Bénin devient, dès sa première embauche, un <strong>salarié</strong> au sens du droit du travail — avec des droits et des obligations précis. Ce cours propose une introduction structurée au droit du travail béninois, indispensable à toute insertion professionnelle réussie et responsable.</p>

    <h3>1. La loi fondatrice : le Code du travail béninois</h3>
    <p>Le droit du travail au Bénin est principalement régi par la <strong>Loi n°98-004 du 27 janvier 1998</strong> portant Code du travail de la République du Bénin. Ce texte fondateur a depuis été complété et précisé par plusieurs textes d'application, notamment la <strong>Loi n°2017-05</strong> relative à l'embauche, au placement de main-d'œuvre et à la résiliation du contrat de travail, ainsi que par de nombreux décrets d'application et arrêtés ministériels du ministère en charge du Travail.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le droit du travail béninois s'inscrit également dans un cadre régional et international : il s'harmonise progressivement avec les standards de l'<strong>UEMOA</strong> (Union Économique et Monétaire Ouest-Africaine) et se réfère aux normes de <strong>travail décent</strong> promues par l'<strong>Organisation Internationale du Travail (OIT)</strong>, dont le Bénin est un État membre.
    </div>

    <h3>2. Champ d'application du Code du travail</h3>
    <p>Le Code du travail s'applique à toutes les <strong>relations de travail salarié</strong> établies sur le territoire béninois, qu'elles concernent des entreprises publiques ou privées, quel que soit le secteur d'activité (industrie, y compris chimique et pharmaceutique, commerce, services, agriculture...). Sont en revanche régis par des statuts particuliers distincts : les <strong>fonctionnaires</strong> et agents de l'État soumis au statut général de la fonction publique, ainsi que certaines professions réglementées disposant de leur propre cadre statutaire.</p>

    <h3>3. La hiérarchie des normes en droit du travail</h3>
    <p>Une caractéristique essentielle du droit du travail est le <strong>principe de faveur</strong> : une norme de rang inférieur (convention collective, accord d'entreprise, contrat individuel) ne peut jamais être moins favorable au salarié que la norme de rang supérieur — elle peut seulement l'améliorer. La hiérarchie s'organise ainsi, du plus général au plus spécifique :</p>
    <table class="mini-table">
      <tr><th>Niveau</th><th>Source</th><th>Portée</th></tr>
      <tr><td>1</td><td>Constitution, conventions internationales de l'OIT ratifiées</td><td>Cadre général des droits fondamentaux du travail</td></tr>
      <tr><td>2</td><td>Code du travail (Loi 98-004 et textes modificatifs)</td><td>Cadre légal national, s'applique à tous les employeurs et salariés</td></tr>
      <tr><td>3</td><td>Convention collective (de branche ou générale)</td><td>Négociée entre organisations patronales et syndicales d'un secteur ; ne peut qu'améliorer les minima légaux</td></tr>
      <tr><td>4</td><td>Accord d'entreprise, règlement intérieur</td><td>Propre à une entreprise donnée ; ne peut déroger défavorablement à la convention collective</td></tr>
      <tr><td>5</td><td>Contrat de travail individuel</td><td>Ne peut déroger qu'en faveur du salarié aux niveaux supérieurs</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Le Code du travail fixe la durée légale du travail à 40 heures par semaine. Un accord d'entreprise prévoit 42 heures par semaine pour l'ensemble du personnel de laboratoire, sans compensation. Cet accord est-il valable ?</p>
      <p><strong>Solution :</strong> Non — un accord d'entreprise (niveau 4 de la hiérarchie) ne peut jamais être moins favorable au salarié que le Code du travail (niveau 2) sur un point qu'il ne fait qu'appliquer ou préciser, sauf dérogation légale explicite (heures supplémentaires spécifiquement encadrées et rémunérées). Un tel accord serait contraire au principe de faveur et donc inopposable au salarié.</p>
      <p class="example-answer">Réponse : l'accord n'est pas valable en l'état ; il faudrait, le cas échéant, recourir au régime légal des heures supplémentaires, dûment rémunérées et encadrées.</p>
    </div>

    <h3>4. Pourquoi ce cadre concerne directement le chimiste</h3>
    <p>Un chimiste évoluant en laboratoire de recherche, en industrie chimique/pharmaceutique ou dans l'enseignement est concerné à plusieurs titres : conditions de recrutement (chapitre 2), durée du travail parfois organisée en horaires postés dans l'industrie (chapitre 3), obligations spécifiques d'hygiène et de sécurité liées à la manipulation de substances chimiques (chapitre 5), et éventuellement représentation collective au sein d'un laboratoire ou d'une usine (chapitre 7). Connaître ce cadre n'est donc pas une compétence périphérique, mais un outil professionnel direct.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le droit du travail béninois repose principalement sur la Loi n°98-004 du 27 janvier 1998, complétée notamment par la Loi n°2017-05</li>
      <li>Le Code du travail s'applique à toute relation de travail salarié au Bénin, à l'exclusion des fonctionnaires (statut particulier)</li>
      <li>Le droit béninois du travail s'inscrit dans le cadre harmonisé de l'UEMOA et se réfère aux normes de travail décent de l'OIT</li>
      <li>La hiérarchie des normes suit le principe de faveur : loi → convention collective → accord d'entreprise → contrat individuel, chaque niveau ne pouvant qu'améliorer le précédent</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire qu'un contrat individuel peut librement déroger au Code du travail dans un sens défavorable au salarié</li>
      <li>Confondre le régime des salariés du privé (Code du travail) et celui des fonctionnaires (statut général de la fonction publique)</li>
      <li>Penser que le droit du travail ne concerne que les questions de licenciement, alors qu'il encadre l'ensemble de la relation de travail</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quel est le texte fondateur du droit du travail au Bénin ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt1e1" value="wrong">La Constitution béninoise uniquement</label>
        <label class="option"><input type="radio" name="ldt1e1" value="right">La Loi n°98-004 du 27 janvier 1998 portant Code du travail</label>
        <label class="option"><input type="radio" name="ldt1e1" value="wrong">Une convention collective de branche</label>
        <label class="option"><input type="radio" name="ldt1e1" value="wrong">Le règlement intérieur de chaque entreprise</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt1e1','ldt1fb1','Correct — la Loi n°98-004 du 27 janvier 1998 est le texte fondateur, complété depuis par plusieurs textes dont la Loi n°2017-05.','Relis la section « La loi fondatrice » : quel est le texte de 1998 qui structure tout le droit du travail béninois ?')">Vérifier</button>
      <div class="feedback" id="ldt1fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">D'après le principe de faveur, un accord d'entreprise peut-il être moins favorable au salarié que la convention collective de branche ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt1e2" value="wrong">Oui, sans aucune restriction</label>
        <label class="option"><input type="radio" name="ldt1e2" value="right">Non, il ne peut que l'améliorer, sauf dérogation légale explicite</label>
        <label class="option"><input type="radio" name="ldt1e2" value="wrong">Oui, à condition que l'employeur en informe l'inspection du travail</label>
        <label class="option"><input type="radio" name="ldt1e2" value="wrong">Cela dépend uniquement de la taille de l'entreprise</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt1e2','ldt1fb2','Correct — le principe de faveur interdit à une norme de rang inférieur d\\'être moins favorable au salarié que la norme de rang supérieur.','Relis la définition du principe de faveur dans la hiérarchie des normes.')">Vérifier</button>
      <div class="feedback" id="ldt1fb2"></div>
    </div>
  </div>
  `
};
LEGISTRAV_NOVA_KB[ldtKey("Sources et cadre du droit du travail béninois")] = {
  intro: "Salut, moi c'est Nova ! On démarre le droit du travail béninois par ses sources et son cadre général. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/98.004|code du travail|loi fondatrice/i, replies:[
      "Le texte fondateur est la Loi n°98-004 du 27 janvier 1998 portant Code du travail de la République du Bénin, complétée depuis par plusieurs textes, dont la Loi n°2017-05 sur l'embauche et la résiliation du contrat."
    ]},
    { test:/hi[ée]rarchie des normes|principe de faveur/i, replies:[
      "La hiérarchie va de la loi (Code du travail) à la convention collective, puis à l'accord d'entreprise, puis au contrat individuel. Le principe de faveur impose que chaque niveau ne peut qu'améliorer, jamais dégrader, ce que prévoit le niveau supérieur."
    ]},
    { test:/champ d.application|fonctionnaire/i, replies:[
      "Le Code du travail s'applique à toute relation de travail salarié, secteur public ou privé — sauf aux fonctionnaires, régis par un statut particulier distinct."
    ]},
    { test:/uemoa|oit|international/i, replies:[
      "Le droit béninois du travail s'harmonise avec le cadre régional UEMOA et se réfère aux normes de travail décent de l'Organisation Internationale du Travail (OIT), dont le Bénin est membre."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : cherche le texte de loi précis évoqué en tout début de chapitre.",
      "Indice niveau 2 : c'est une loi de 1998.",
      "Indice niveau 3 : c'est la Loi n°98-004 du 27 janvier 1998."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense au sens dans lequel une norme inférieure peut s'écarter d'une norme supérieure.",
      "Indice niveau 2 : le principe de faveur protège le salarié, pas l'employeur.",
      "Indice niveau 3 : un accord d'entreprise ne peut donc qu'améliorer, jamais dégrader, ce que prévoit la convention collective."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
LEGISTRAV_CHAPTERS[ldtKey("Le contrat de travail : CDI, CDD et période d'essai")] = {
  objectives: [
    "Distinguer le contrat à durée indéterminée (CDI) et le contrat à durée déterminée (CDD)",
    "Connaître les conditions strictes de recours au CDD et les conséquences d'un dépassement de sa durée maximale",
    "Comprendre la finalité et la durée de la période d'essai",
    "Identifier les mentions essentielles attendues dans un contrat de travail"
  ],
  prereqs: ["Sources et cadre du droit du travail béninois"],
  bodyHtml: `
    <p>Le contrat de travail est l'acte fondateur de la relation entre un employeur et un salarié. Comprendre ses formes et ses règles est essentiel avant de signer son premier contrat professionnel, que ce soit à l'issue d'un stage, d'un concours ou d'une candidature spontanée.</p>

    <h3>1. Le CDI, forme normale et générale de la relation de travail</h3>
    <p>Selon l'<strong>article 32</strong> du Code du travail béninois, le <strong>contrat à durée indéterminée (CDI)</strong> constitue la forme normale et générale de la relation de travail au Bénin. Il est conclu sans limitation de durée et offre la plus grande sécurité d'emploi au salarié. Le contrat peut être écrit, verbal ou tacite ; toutefois, dès lors qu'il nécessite l'installation du travailleur hors de sa résidence habituelle, un écrit est requis.</p>

    <h3>2. Le CDD : une exception strictement encadrée</h3>
    <p>Le <strong>contrat à durée déterminée (CDD)</strong> déroge à ce principe : selon l'<strong>article 29</strong> du Code du travail, il ne peut être conclu que pour l'exécution d'une <strong>tâche précise et temporaire</strong> (remplacement d'un salarié absent, accroissement temporaire d'activité, travail saisonnier, etc.), et non pour pourvoir durablement un emploi permanent de l'entreprise. L'<strong>article 33</strong> limite strictement les cas de recours au CDD.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La <strong>durée maximale</strong> d'un CDD, renouvellements inclus, ne peut excéder <strong>deux (2) ans</strong>. Toute reconduction tacite ou expresse au-delà de cette durée entraîne la <strong>requalification automatique du contrat en CDI</strong>, ouvrant au salarié l'ensemble des garanties associées (préavis, indemnités de licenciement, droits à la retraite via la CNSS). Cette règle protège les salariés contre un usage abusif et prolongé de contrats précaires.
    </div>

    <table class="mini-table">
      <tr><th>Critère</th><th>CDI</th><th>CDD</th></tr>
      <tr><td>Durée</td><td>Indéterminée</td><td>Déterminée, maximum 2 ans renouvellements inclus</td></tr>
      <tr><td>Motif de recours</td><td>Libre (emploi permanent)</td><td>Strictement limité (tâche précise et temporaire)</td></tr>
      <tr><td>Rupture avant terme</td><td>Selon procédure de licenciement/démission</td><td>Indemnités équivalentes aux salaires restant à courir, sauf faute grave</td></tr>
      <tr><td>Dépassement de la durée max.</td><td>—</td><td>Requalification automatique en CDI</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un laboratoire pharmaceutique embauche un technicien de laboratoire en CDD de 6 mois pour remplacer une salariée en congé de maternité. À l'issue de ces 6 mois, faute d'avoir anticipé le retour de la salariée, l'employeur renouvelle tacitement le CDD pour 6 mois supplémentaires, puis à nouveau, cumulant ainsi 3 ans de CDD successifs sur le même poste. Que se passe-t-il juridiquement ?</p>
      <p><strong>Solution :</strong> Dès que la durée cumulée du CDD (renouvellements inclus) dépasse 2 ans, le contrat est automatiquement requalifié en CDI, quelle que soit l'intention initiale de l'employeur. Le technicien bénéficie alors de l'ensemble des droits attachés à un CDI (préavis en cas de rupture, indemnité de licenciement le cas échéant, ancienneté prise en compte pour la retraite).</p>
      <p class="example-answer">Réponse : le contrat est requalifié en CDI dès le dépassement des 2 ans, avec toutes les conséquences juridiques et financières associées pour l'employeur.</p>
    </div>

    <h3>3. La période d'essai</h3>
    <p>La période d'essai permet à l'employeur d'apprécier l'aptitude professionnelle et le rendement du salarié, et à ce dernier de juger des conditions de travail, de rémunération, d'hygiène et de sécurité, ainsi que du climat social de l'entreprise. Sa durée varie selon la catégorie professionnelle (généralement de l'ordre d'un mois pour certaines catégories d'exécution à trois mois pour les autres catégories, avec un renouvellement possible une fois si la première période n'a pas été jugée concluante). Pendant cette période, chacune des parties peut, en principe, mettre fin à la relation de travail sans préavis ni indemnité, sous réserve des dispositions plus favorables éventuellement prévues par la convention collective applicable.</p>

    <h3>4. Les mentions essentielles d'un contrat de travail</h3>
    <p>Bien qu'un contrat puisse être verbal en droit béninois, la pratique professionnelle et la sécurité juridique recommandent fortement un <strong>écrit</strong> précisant a minima : l'identité des parties, le poste et la qualification, la date d'embauche, la durée du contrat (CDI ou CDD et son terme), la rémunération, le lieu de travail, et le renvoi éventuel à la convention collective applicable. L'employeur doit par ailleurs procéder à la <strong>Déclaration Préalable à l'Embauche (DPE)</strong> auprès de la CNSS, dans les 8 jours précédant l'embauche du salarié.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le CDI est la forme normale et générale de la relation de travail au Bénin (article 32 du Code du travail)</li>
      <li>Le CDD ne peut être conclu que pour une tâche précise et temporaire, avec une durée maximale de 2 ans renouvellements inclus</li>
      <li>Tout dépassement de cette durée maximale entraîne la requalification automatique du CDD en CDI</li>
      <li>La période d'essai permet une évaluation réciproque ; sa durée varie selon la catégorie professionnelle et peut être renouvelée une fois</li>
      <li>L'employeur doit effectuer la Déclaration Préalable à l'Embauche (DPE) auprès de la CNSS avant toute prise de poste</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire qu'un CDD peut être utilisé librement pour pourvoir un poste permanent de l'entreprise</li>
      <li>Ignorer que le renouvellement tacite d'un CDD au-delà de 2 ans entraîne une requalification automatique en CDI</li>
      <li>Confondre la période d'essai avec un stage effectué avant l'embauche — ce sont deux notions juridiquement distinctes</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quelle est la durée maximale d'un CDD au Bénin, renouvellements inclus ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt2e1" value="wrong">6 mois</label>
        <label class="option"><input type="radio" name="ldt2e1" value="wrong">1 an</label>
        <label class="option"><input type="radio" name="ldt2e1" value="right">2 ans</label>
        <label class="option"><input type="radio" name="ldt2e1" value="wrong">Aucune limite légale</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt2e1','ldt2fb1','Correct — la durée maximale d\\'un CDD, renouvellements inclus, est de 2 ans (article 29 du Code du travail).','Relis le point clé du chapitre : quelle est la durée maximale cumulée d\\'un CDD ?')">Vérifier</button>
      <div class="feedback" id="ldt2fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Que se passe-t-il si un CDD est reconduit tacitement au-delà de sa durée maximale légale ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt2e2" value="wrong">Rien, le CDD continue normalement</label>
        <label class="option"><input type="radio" name="ldt2e2" value="right">Le contrat est automatiquement requalifié en CDI</label>
        <label class="option"><input type="radio" name="ldt2e2" value="wrong">Le salarié perd tous ses droits acquis</label>
        <label class="option"><input type="radio" name="ldt2e2" value="wrong">Le contrat devient automatiquement nul et sans effet</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt2e2','ldt2fb2','Correct — la requalification automatique en CDI protège le salarié contre un usage abusif et prolongé de contrats précaires.','Relis le point clé sur les conséquences du dépassement de la durée maximale du CDD.')">Vérifier</button>
      <div class="feedback" id="ldt2fb2"></div>
    </div>
  </div>
  `
};
LEGISTRAV_NOVA_KB[ldtKey("Le contrat de travail : CDI, CDD et période d'essai")] = {
  intro: "Salut, moi c'est Nova ! On parle des contrats de travail : CDI, CDD, période d'essai. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/cdi/i, replies:[
      "Le CDI (contrat à durée indéterminée) est la forme normale et générale de la relation de travail au Bénin, selon l'article 32 du Code du travail — il peut être écrit, verbal ou tacite."
    ]},
    { test:/cdd/i, replies:[
      "Le CDD ne peut être conclu que pour une tâche précise et temporaire (article 29), avec une durée maximale de 2 ans renouvellements inclus. Au-delà, il est automatiquement requalifié en CDI."
    ]},
    { test:/p[ée]riode d.essai/i, replies:[
      "La période d'essai permet une évaluation réciproque (aptitude du salarié, conditions de travail). Sa durée varie selon la catégorie professionnelle, renouvelable une fois si non concluante."
    ]},
    { test:/dpe|d[ée]claration pr[ée]alable/i, replies:[
      "L'employeur doit effectuer la Déclaration Préalable à l'Embauche (DPE) auprès de la CNSS, dans les 8 jours précédant l'embauche du salarié."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le point clé sur la durée maximale du CDD.",
      "Indice niveau 2 : ce n'est ni 6 mois ni 1 an.",
      "Indice niveau 3 : c'est 2 ans, renouvellements inclus."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à la protection du salarié contre les contrats précaires prolongés.",
      "Indice niveau 2 : le contrat ne devient ni nul ni sans effet.",
      "Indice niveau 3 : il est automatiquement requalifié en CDI."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
LEGISTRAV_CHAPTERS[ldtKey("Durée du travail, repos et congés payés")] = {
  objectives: [
    "Connaître la durée légale du travail et ses limites quotidiennes au Bénin",
    "Comprendre le régime des heures supplémentaires",
    "Calculer les droits à congés payés annuels d'un salarié",
    "Distinguer repos hebdomadaire, congés payés et jours fériés"
  ],
  prereqs: ["Le contrat de travail : CDI, CDD et période d'essai"],
  bodyHtml: `
    <p>Le temps de travail et le droit au repos figurent parmi les dispositions les plus concrètement vécues par tout salarié — y compris le chimiste travaillant en laboratoire, où les manipulations et les temps de garde peuvent introduire des contraintes horaires particulières.</p>

    <h3>1. La durée légale du travail</h3>
    <p>Selon l'<strong>article 39</strong> du Code du travail béninois, la durée légale du travail dans les établissements de toute nature, quel que soit le sexe ou le mode de rémunération des travailleurs, est fixée à <strong>quarante (40) heures par semaine</strong>, soit huit (8) heures par jour. La durée quotidienne du travail effectif ne peut en principe excéder cette limite de 8 heures, sauf dérogation fixée par décret pris en Conseil des ministres ou par les conventions collectives (par exemple pour organiser un travail posté ou en horaires variables).</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — pertinence pour le chimiste</span>
      Dans l'industrie chimique et pharmaceutique, l'organisation du travail en <strong>équipes postées</strong> (« 3×8 » par exemple, pour assurer une surveillance continue d'un procédé) est courante et fait l'objet de dérogations réglementées à l'horaire de journée classique — toujours dans le respect global de la durée légale hebdomadaire et des repos compensateurs prévus par la convention collective applicable.
    </div>

    <h3>2. Les heures supplémentaires</h3>
    <p>Tout travail effectué au-delà de la durée légale de 40 heures par semaine constitue une <strong>heure supplémentaire</strong>, qui doit être exceptionnelle (répondant à une nécessité réelle de service) et donner lieu à une <strong>majoration de rémunération</strong> par rapport au taux horaire normal, dans les conditions fixées par les textes réglementaires et les conventions collectives applicables au secteur d'activité concerné. Le recours systématique et non justifié aux heures supplémentaires expose l'employeur à des sanctions.</p>

    <h3>3. Le repos hebdomadaire</h3>
    <p>Tout salarié a droit à un <strong>repos hebdomadaire</strong>, en principe d'au moins vingt-quatre (24) heures consécutives, généralement fixé au dimanche, sauf organisation particulière justifiée par la nature de l'activité (production continue, services d'astreinte). Ce repos, distinct des congés payés annuels, doit être respecté même lors de périodes de forte activité.</p>

    <h3>4. Les congés payés annuels</h3>
    <p>Selon le Code du travail béninois, tout salarié acquiert un droit à <strong>congé payé annuel</strong> à raison de <strong>deux (2) jours ouvrables par mois de service effectif</strong>, soit <strong>vingt-quatre (24) jours ouvrables</strong> pour une année complète de travail. La période de référence pour le calcul de ces droits s'étend généralement du 1er janvier au 31 décembre de chaque année. Des conventions collectives peuvent prévoir des congés supplémentaires, notamment en fonction de l'ancienneté du salarié dans l'entreprise.</p>

    <table class="mini-table">
      <tr><th>Notion</th><th>Durée / régime</th></tr>
      <tr><td>Durée légale du travail</td><td>40 heures/semaine, 8 heures/jour</td></tr>
      <tr><td>Repos hebdomadaire</td><td>Au moins 24 heures consécutives</td></tr>
      <tr><td>Congés payés annuels</td><td>2 jours ouvrables/mois de service, soit 24 jours ouvrables/an</td></tr>
      <tr><td>Jours fériés légaux</td><td>Rémunérés, s'ajoutent aux congés annuels sans réduire ce quota</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un technicien de laboratoire a travaillé effectivement 9 mois complets au cours de l'année de référence. Combien de jours ouvrables de congés payés a-t-il acquis, selon le régime légal ?</p>
      <p><strong>Solution :</strong> Le droit s'acquiert à raison de 2 jours ouvrables par mois de service effectif : $9 \\times 2 = 18$ jours ouvrables.</p>
      <p class="example-answer">Réponse : 18 jours ouvrables de congés payés, sauf disposition plus favorable de la convention collective applicable.</p>
    </div>

    <h3>5. Jours fériés</h3>
    <p>Les jours fériés légaux (fêtes nationales et religieuses reconnues) sont rémunérés lorsqu'ils tombent un jour normalement travaillé, et ne réduisent en aucun cas le quota de congés payés annuels du salarié — il s'agit de deux droits distincts et cumulatifs.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La durée légale du travail au Bénin est de 40 heures par semaine, soit 8 heures par jour (article 39 du Code du travail)</li>
      <li>Les heures supplémentaires doivent rester exceptionnelles et donnent lieu à une majoration de rémunération</li>
      <li>Le repos hebdomadaire est d'au moins 24 heures consécutives, distinct des congés payés annuels</li>
      <li>Les congés payés s'acquièrent à raison de 2 jours ouvrables par mois de service, soit 24 jours ouvrables pour une année complète</li>
      <li>Les jours fériés légaux rémunérés s'ajoutent aux congés payés sans en réduire le quota</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Confondre repos hebdomadaire (24h consécutives chaque semaine) et congés payés annuels (acquis mois par mois)</li>
      <li>Croire que les heures supplémentaires peuvent être imposées sans limite ni majoration de rémunération</li>
      <li>Penser que les jours fériés réduisent le quota de congés payés annuels — ce sont deux droits cumulatifs et distincts</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quelle est la durée légale hebdomadaire du travail au Bénin ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt3e1" value="wrong">35 heures</label>
        <label class="option"><input type="radio" name="ldt3e1" value="right">40 heures</label>
        <label class="option"><input type="radio" name="ldt3e1" value="wrong">44 heures</label>
        <label class="option"><input type="radio" name="ldt3e1" value="wrong">48 heures</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt3e1','ldt3fb1','Correct — l\\'article 39 du Code du travail fixe la durée légale à 40 heures par semaine, soit 8 heures par jour.','Relis la section sur la durée légale du travail, article 39 du Code du travail.')">Vérifier</button>
      <div class="feedback" id="ldt3fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Un salarié a travaillé 6 mois complets sur l'année de référence. Combien de jours ouvrables de congés payés a-t-il acquis (régime légal, hors disposition conventionnelle plus favorable) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt3e2" value="wrong">6 jours</label>
        <label class="option"><input type="radio" name="ldt3e2" value="right">12 jours</label>
        <label class="option"><input type="radio" name="ldt3e2" value="wrong">24 jours</label>
        <label class="option"><input type="radio" name="ldt3e2" value="wrong">30 jours</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt3e2','ldt3fb2','Correct — 6 mois × 2 jours ouvrables/mois = 12 jours ouvrables.','Applique le taux d\\'acquisition de 2 jours ouvrables par mois de service effectif.')">Vérifier</button>
      <div class="feedback" id="ldt3fb2"></div>
    </div>
  </div>
  `
};
LEGISTRAV_NOVA_KB[ldtKey("Durée du travail, repos et congés payés")] = {
  intro: "Salut, moi c'est Nova ! On parle durée du travail, repos et congés payés. Donne-moi un nombre de mois travaillés pour calculer des droits à congés, ou demande un indice.",
  rules: [
    { test:/dur[ée]e l[ée]gale|40 heures|8 heures/i, replies:[
      "La durée légale du travail au Bénin est de 40 heures par semaine, soit 8 heures par jour (article 39 du Code du travail)."
    ]},
    { test:/heures suppl[ée]mentaires/i, replies:[
      "Les heures supplémentaires (au-delà de 40h/semaine) doivent rester exceptionnelles et donner lieu à une majoration de rémunération selon les textes réglementaires et conventions collectives applicables."
    ]},
    { test:/repos hebdomadaire/i, replies:[
      "Le repos hebdomadaire est d'au moins 24 heures consécutives, généralement le dimanche — distinct des congés payés annuels."
    ]},
    { test:/cong[ée]s pay[ée]s/i, replies:[
      "Les congés payés s'acquièrent à raison de 2 jours ouvrables par mois de service effectif, soit 24 jours ouvrables pour une année complète de travail."
    ]},
    { test:/jour f[ée]ri[ée]/i, replies:[
      "Les jours fériés légaux, rémunérés, s'ajoutent aux congés payés sans en réduire le quota — ce sont deux droits distincts et cumulatifs."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis l'article 39 du Code du travail cité dans le chapitre.",
      "Indice niveau 2 : ce n'est ni 35, ni 44, ni 48 heures.",
      "Indice niveau 3 : la durée légale est de 40 heures par semaine."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : applique le taux de 2 jours ouvrables par mois de service.",
      "Indice niveau 2 : multiplie 6 mois par 2 jours.",
      "Indice niveau 3 : 6 × 2 = 12 jours ouvrables."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
LEGISTRAV_CHAPTERS[ldtKey("Rémunération : SMIG, bulletin de paie et cotisations sociales")] = {
  objectives: [
    "Connaître le principe et le rôle du salaire minimum interprofessionnel garanti (SMIG)",
    "Identifier les éléments constitutifs d'un bulletin de paie",
    "Comprendre le principe et la finalité des cotisations sociales versées à la CNSS",
    "Distinguer les obligations respectives de l'employeur et du salarié en matière de rémunération"
  ],
  prereqs: ["Durée du travail, repos et congés payés"],
  bodyHtml: `
    <p>La rémunération est la contrepartie du travail fourni, mais elle obéit à des règles précises destinées à protéger le salarié contre des pratiques abusives, tout en finançant collectivement la protection sociale du pays.</p>

    <h3>1. Le salaire minimum interprofessionnel garanti (SMIG)</h3>
    <p>Le <strong>SMIG</strong> (Salaire Minimum Interprofessionnel Garanti) constitue le plancher légal de rémunération applicable à tous les secteurs d'activité au Bénin : aucun salaire ne peut légalement être inférieur à ce montant, quelle que soit la nature du poste. Depuis 2019, le SMIG béninois s'élève à environ <strong>60 000 FCFA par mois</strong>. Les entreprises peuvent bien entendu rémunérer au-delà de ce minimum, notamment via les grilles salariales fixées par les conventions collectives sectorielles, qui tiennent compte de la qualification, de l'ancienneté et de la catégorie professionnelle du salarié.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Pour un chimiste diplômé, la rémunération réelle dépend le plus souvent bien davantage de la <strong>convention collective de branche</strong> applicable (industrie chimique, pharmaceutique, enseignement...) et de la grille de qualification du poste, que du seul SMIG — qui ne constitue qu'un plancher minimal de référence.
    </div>

    <h3>2. Les éléments du bulletin de paie</h3>
    <p>Le bulletin de paie (ou fiche de paie) est un document obligatoire remis à chaque salarié, qui doit permettre de comprendre précisément la composition de sa rémunération. Il comporte généralement :</p>
    <table class="mini-table">
      <tr><th>Élément</th><th>Contenu</th></tr>
      <tr><td>Identification</td><td>Employeur (avec numéro d'immatriculation CNSS), salarié (nom, qualification, numéro d'affiliation CNSS)</td></tr>
      <tr><td>Salaire de base</td><td>Rémunération correspondant à la durée légale du travail, selon la catégorie professionnelle</td></tr>
      <tr><td>Primes et indemnités</td><td>Éléments variables (ancienneté, transport, risque, astreinte, etc.), selon la convention collective ou le contrat</td></tr>
      <tr><td>Heures supplémentaires</td><td>Le cas échéant, avec leur majoration spécifique</td></tr>
      <tr><td>Cotisations sociales</td><td>Retenues salariales versées à la CNSS (voir ci-dessous)</td></tr>
      <tr><td>Salaire net à payer</td><td>Montant effectivement perçu par le salarié après déduction des cotisations et retenues</td></tr>
    </table>

    <h3>3. Les cotisations sociales et la CNSS</h3>
    <p>Toute relation de travail salarié au Bénin donne lieu au versement de <strong>cotisations sociales</strong> à la <strong>Caisse Nationale de Sécurité Sociale (CNSS)</strong>, organisme chargé de la gestion des risques professionnels, des prestations familiales et des pensions de retraite (anciennement dénommé OBSS). Ces cotisations se répartissent entre une <strong>part salariale</strong> (prélevée directement sur le salaire brut) et une <strong>part patronale</strong> (à la charge de l'employeur, en sus du salaire). L'employeur est responsable du versement de l'intégralité de ces cotisations à la CNSS, dans les délais réglementaires — généralement <strong>trimestriellement</strong> pour les entreprises occupant moins de 20 travailleurs, sous peine d'une majoration de retard.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Une petite entreprise pharmaceutique de 12 salariés accumule un retard de versement de ses cotisations CNSS. Quelle est la conséquence prévue par la réglementation ?</p>
      <p><strong>Solution :</strong> L'employeur qui ne verse pas ses cotisations dans le délai prescrit est passible d'une <strong>majoration de retard de 1,50 % par mois ou fraction de mois de retard</strong>, cette majoration étant due au même titre que la cotisation elle-même.</p>
      <p class="example-answer">Réponse : une majoration de 1,50 % par mois de retard s'applique, en plus du versement des cotisations dues.</p>
    </div>

    <h3>4. Un régime qui ne couvre pas tous les risques</h3>
    <p>Il est important de noter que le régime de sécurité sociale béninois, géré par la CNSS, ne couvre pas actuellement le <strong>risque chômage</strong> — contrairement à certains systèmes d'autres pays. La protection en cas de perte d'emploi repose donc principalement, en dehors des indemnités de licenciement prévues par le Code du travail et les conventions collectives (voir chapitre 6), sur des dispositifs distincts de solidarité nationale ou familiale.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le SMIG constitue le plancher légal de rémunération au Bénin, environ 60 000 FCFA/mois depuis 2019</li>
      <li>La rémunération réelle d'un chimiste dépend surtout de la convention collective de branche et de la grille de qualification du poste</li>
      <li>Le bulletin de paie détaille salaire de base, primes, heures supplémentaires, cotisations sociales et salaire net</li>
      <li>Les cotisations sociales (part salariale + part patronale) sont versées à la CNSS, qui gère risques professionnels, prestations familiales et pensions</li>
      <li>Le régime CNSS ne couvre pas le risque chômage</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que tous les salariés d'un même secteur sont payés au SMIG — c'est un plancher légal, pas une référence salariale générale</li>
      <li>Confondre part salariale (prélevée sur le salaire) et part patronale (à la charge de l'employeur en sus)</li>
      <li>Penser que la CNSS couvre le risque chômage, ce qui n'est pas le cas dans le régime béninois actuel</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Le SMIG au Bénin représente :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt4e1" value="wrong">Le salaire moyen national</label>
        <label class="option"><input type="radio" name="ldt4e1" value="right">Le plancher légal de rémunération, en dessous duquel aucun salaire ne peut être fixé</label>
        <label class="option"><input type="radio" name="ldt4e1" value="wrong">Le salaire maximum autorisé pour un débutant</label>
        <label class="option"><input type="radio" name="ldt4e1" value="wrong">Une prime versée uniquement aux fonctionnaires</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt4e1','ldt4fb1','Correct — le SMIG est le plancher légal, applicable à tous les secteurs, en dessous duquel aucun salaire ne peut légalement être fixé.','Relis la définition du SMIG en début de chapitre.')">Vérifier</button>
      <div class="feedback" id="ldt4fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Quel organisme gère les cotisations sociales, les risques professionnels et les pensions au Bénin ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt4e2" value="wrong">L'Inspection du Travail</label>
        <label class="option"><input type="radio" name="ldt4e2" value="right">La CNSS (Caisse Nationale de Sécurité Sociale)</label>
        <label class="option"><input type="radio" name="ldt4e2" value="wrong">Le ministère des Finances</label>
        <label class="option"><input type="radio" name="ldt4e2" value="wrong">La convention collective de branche</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt4e2','ldt4fb2','Correct — la CNSS gère les risques professionnels, les prestations familiales et les pensions de retraite.','Relis la section sur les cotisations sociales et l\\'organisme chargé de leur gestion.')">Vérifier</button>
      <div class="feedback" id="ldt4fb2"></div>
    </div>
  </div>
  `
};
LEGISTRAV_NOVA_KB[ldtKey("Rémunération : SMIG, bulletin de paie et cotisations sociales")] = {
  intro: "Salut, moi c'est Nova ! On parle rémunération : SMIG, bulletin de paie, cotisations CNSS. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/smig/i, replies:[
      "Le SMIG (Salaire Minimum Interprofessionnel Garanti) est le plancher légal de rémunération au Bénin, environ 60 000 FCFA/mois depuis 2019 — aucun salaire ne peut légalement lui être inférieur."
    ]},
    { test:/bulletin de paie|fiche de paie/i, replies:[
      "Le bulletin de paie détaille : identification employeur/salarié, salaire de base, primes et indemnités, heures supplémentaires, cotisations sociales, et salaire net à payer."
    ]},
    { test:/cnss|cotisation/i, replies:[
      "Les cotisations sociales (part salariale + part patronale) sont versées à la CNSS, qui gère les risques professionnels, les prestations familiales et les pensions de retraite. Le versement est généralement trimestriel pour les entreprises de moins de 20 salariés."
    ]},
    { test:/ch[oô]mage/i, replies:[
      "Le régime de la CNSS ne couvre pas le risque chômage au Bénin — c'est une différence importante avec certains autres systèmes de sécurité sociale."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à la fonction du SMIG comme un seuil, pas une moyenne.",
      "Indice niveau 2 : c'est un minimum légal, pas un maximum ni une moyenne.",
      "Indice niveau 3 : c'est le plancher légal de rémunération, applicable à tous les secteurs."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : cherche l'organisme spécifiquement chargé des cotisations et pensions.",
      "Indice niveau 2 : ce n'est ni l'Inspection du Travail, ni le ministère des Finances.",
      "Indice niveau 3 : c'est la CNSS (Caisse Nationale de Sécurité Sociale)."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
LEGISTRAV_CHAPTERS[ldtKey("Hygiène, sécurité et médecine du travail")] = {
  objectives: [
    "Connaître les obligations générales de l'employeur en matière d'hygiène et de sécurité au travail",
    "Comprendre le rôle de la médecine du travail et le suivi médical des salariés",
    "Identifier les enjeux spécifiques d'hygiène et de sécurité liés aux métiers de la chimie",
    "Situer les responsabilités respectives de l'employeur et du salarié en la matière"
  ],
  prereqs: ["Rémunération : SMIG, bulletin de paie et cotisations sociales"],
  bodyHtml: `
    <p>Pour un chimiste, ce chapitre revêt une importance particulière : les laboratoires et sites industriels chimiques comptent parmi les environnements de travail où les obligations d'hygiène et de sécurité sont les plus déterminantes pour la protection de la santé et de la vie des salariés.</p>

    <h3>1. L'obligation générale de sécurité de l'employeur</h3>
    <p>Le Code du travail béninois impose à l'employeur une <strong>obligation générale de sécurité</strong> : il doit prendre toutes les mesures nécessaires pour assurer la sécurité et protéger la santé physique et mentale des travailleurs placés sous son autorité. Cette obligation se décline concrètement en plusieurs axes :</p>
    <table class="mini-table">
      <tr><th>Obligation</th><th>Application typique en milieu chimique</th></tr>
      <tr><td>Évaluation des risques professionnels</td><td>Identification des dangers liés aux réactifs, procédés, équipements de laboratoire ou de production</td></tr>
      <tr><td>Formation à la sécurité</td><td>Formation des nouveaux embauchés aux consignes de sécurité, manipulation des produits chimiques, gestes d'urgence</td></tr>
      <tr><td>Équipements de protection individuelle (EPI)</td><td>Fourniture gratuite : gants, lunettes, blouses, masques respiratoires adaptés aux risques identifiés</td></tr>
      <tr><td>Registre du personnel et affichage</td><td>Obligatoire dans les entreprises d'au moins 20 salariés, conforme au modèle de l'Inspection du Travail</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      L'obligation de sécurité de l'employeur est complétée par une <strong>obligation réciproque du salarié</strong> : celui-ci doit respecter les consignes de sécurité qui lui sont données, porter les équipements de protection individuelle mis à sa disposition, et signaler à sa hiérarchie toute situation dangereuse constatée. Le non-respect de ces consignes par le salarié peut constituer une faute disciplinaire, indépendamment des obligations pesant sur l'employeur.
    </div>

    <h3>2. La médecine du travail</h3>
    <p>La <strong>médecine du travail</strong> a pour objectif exclusivement <strong>préventif</strong> : éviter toute altération de la santé des travailleurs du fait de leur travail. Elle se traduit notamment par :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Une <strong>visite médicale d'embauche</strong>, préalable ou concomitante à la prise de poste, permettant de vérifier l'aptitude du salarié au poste proposé</li>
      <li>Des <strong>visites médicales périodiques</strong>, dont la fréquence peut être renforcée pour les postes exposant à des risques particuliers (exposition à certains agents chimiques, cancérogènes, mutagènes ou toxiques pour la reproduction)</li>
      <li>Une <strong>surveillance médicale renforcée</strong> pour certaines catégories de travailleurs particulièrement exposés</li>
    </ul>

    <h3>3. Enjeux spécifiques aux métiers de la chimie</h3>
    <p>Au-delà des obligations générales, plusieurs enjeux sont particulièrement prégnants pour un chimiste en poste :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Fiches de données de sécurité (FDS)</strong> des produits chimiques manipulés, qui doivent être accessibles aux salariés concernés</li>
      <li><strong>Stockage et étiquetage</strong> réglementaires des substances dangereuses (incompatibilités chimiques, classes de danger)</li>
      <li><strong>Procédures d'urgence</strong> en cas d'exposition accidentelle, de déversement ou d'incendie</li>
      <li><strong>Gestion des déchets chimiques</strong>, articulée avec la réglementation environnementale</li>
      <li><strong>Ventilation et confinement</strong> adaptés (hottes de laboratoire, sorbonnes) pour limiter l'exposition par inhalation</li>
    </ul>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un jeune chimiste nouvellement embauché constate que le laboratoire ne dispose pas de fiches de données de sécurité (FDS) pour plusieurs réactifs utilisés quotidiennement. Quelle est la situation au regard de l'obligation générale de sécurité de l'employeur, et quelle attitude adopter ?</p>
      <p><strong>Solution :</strong> L'absence de FDS accessibles constitue un manquement à l'obligation de l'employeur d'informer les travailleurs des risques liés aux produits qu'ils manipulent, élément constitutif de l'évaluation et de la prévention des risques professionnels. Le salarié doit signaler cette situation à sa hiérarchie (ou, selon le cas, au responsable HSE ou aux représentants du personnel), conformément à son obligation réciproque de signalement des situations dangereuses.</p>
      <p class="example-answer">Réponse : c'est un manquement à l'obligation de sécurité de l'employeur ; le salarié doit le signaler pour qu'une correction soit apportée, sans attendre qu'un incident survienne.</p>
    </div>

    <h3>4. Les instances de représentation en matière de sécurité</h3>
    <p>Dans les entreprises de taille suffisante, des instances dédiées (comité d'hygiène et de sécurité, ou attributions confiées aux délégués du personnel dans les structures plus petites — voir chapitre 7) participent à l'identification des risques et à la formulation de recommandations pour améliorer les conditions de travail, en lien avec l'employeur et, le cas échéant, l'inspection du travail.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>L'employeur a une obligation générale de sécurité : évaluation des risques, formation, fourniture gratuite des équipements de protection individuelle</li>
      <li>Le salarié a une obligation réciproque : respecter les consignes, porter les EPI, signaler les situations dangereuses</li>
      <li>La médecine du travail est exclusivement préventive : visite d'embauche, visites périodiques, surveillance renforcée pour les postes à risque</li>
      <li>Pour un chimiste : FDS accessibles, stockage/étiquetage réglementaire, procédures d'urgence, ventilation adaptée sont des enjeux quotidiens concrets</li>
      <li>Des instances dédiées (comité d'hygiène et de sécurité, délégués du personnel) participent à l'amélioration continue des conditions de travail</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que la sécurité au travail relève uniquement de la responsabilité de l'employeur, sans obligation réciproque du salarié</li>
      <li>Confondre médecine du travail (préventive) et médecine de soins (curative) — leurs finalités sont différentes</li>
      <li>Attendre qu'un incident survienne avant de signaler une situation dangereuse constatée</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quelle est la finalité principale de la médecine du travail ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt5e1" value="wrong">Soigner les salariés malades comme un médecin traitant</label>
        <label class="option"><input type="radio" name="ldt5e1" value="right">Prévenir toute altération de la santé des travailleurs du fait de leur travail</label>
        <label class="option"><input type="radio" name="ldt5e1" value="wrong">Contrôler l'assiduité des salariés</label>
        <label class="option"><input type="radio" name="ldt5e1" value="wrong">Remplacer les congés maladie</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt5e1','ldt5fb1','Correct — la médecine du travail a une finalité exclusivement préventive, distincte des soins curatifs.','Relis la définition de la médecine du travail dans le chapitre : quelle est sa finalité, prévenir ou soigner ?')">Vérifier</button>
      <div class="feedback" id="ldt5fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Un salarié qui refuse systématiquement de porter les équipements de protection individuelle mis à sa disposition :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt5e2" value="wrong">N'a aucune obligation, seule la sécurité relève de l'employeur</label>
        <label class="option"><input type="radio" name="ldt5e2" value="right">Manque à son obligation réciproque de sécurité, ce qui peut constituer une faute disciplinaire</label>
        <label class="option"><input type="radio" name="ldt5e2" value="wrong">Est automatiquement licencié sans procédure</label>
        <label class="option"><input type="radio" name="ldt5e2" value="wrong">Doit uniquement en informer la médecine du travail</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt5e2','ldt5fb2','Correct — le salarié a une obligation réciproque de respecter les consignes de sécurité, dont le port des EPI, indépendamment des obligations de l\\'employeur.','Relis le point clé sur l\\'obligation réciproque du salarié en matière de sécurité.')">Vérifier</button>
      <div class="feedback" id="ldt5fb2"></div>
    </div>
  </div>
  `
};
LEGISTRAV_NOVA_KB[ldtKey("Hygiène, sécurité et médecine du travail")] = {
  intro: "Salut, moi c'est Nova ! On aborde l'hygiène, la sécurité et la médecine du travail — un sujet clé pour tout chimiste. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/obligation.*s[ée]curit[ée]|employeur.*s[ée]curit[ée]/i, replies:[
      "L'employeur a une obligation générale de sécurité : évaluer les risques, former les salariés, fournir gratuitement les équipements de protection individuelle (EPI)."
    ]},
    { test:/m[ée]decine du travail|visite m[ée]dicale/i, replies:[
      "La médecine du travail est exclusivement préventive (pas curative) : visite médicale d'embauche, visites périodiques, surveillance renforcée pour les postes exposés à des risques particuliers."
    ]},
    { test:/fds|fiche de donn[ée]es de s[ée]curit[ée]/i, replies:[
      "Les fiches de données de sécurité (FDS) des produits chimiques manipulés doivent être accessibles aux salariés concernés — leur absence est un manquement à l'obligation d'information de l'employeur."
    ]},
    { test:/salari[ée].*obligation|epi/i, replies:[
      "Le salarié a une obligation réciproque : respecter les consignes de sécurité, porter les EPI fournis, et signaler toute situation dangereuse constatée à sa hiérarchie."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : la médecine du travail n'est pas un médecin traitant classique.",
      "Indice niveau 2 : elle a une finalité orientée vers l'anticipation, pas le soin curatif.",
      "Indice niveau 3 : sa finalité est de prévenir toute altération de la santé liée au travail."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à l'obligation réciproque évoquée dans le point clé du chapitre.",
      "Indice niveau 2 : la sécurité n'est pas la responsabilité de l'employeur seul.",
      "Indice niveau 3 : le refus de porter les EPI peut constituer une faute disciplinaire du salarié."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
LEGISTRAV_CHAPTERS[ldtKey("Cessation de la relation de travail : démission, licenciement et indemnités")] = {
  objectives: [
    "Distinguer les principaux modes de cessation de la relation de travail",
    "Comprendre les conditions d'un licenciement valable et la procédure à respecter",
    "Connaître les principes du préavis et de l'indemnité de licenciement",
    "Identifier les documents remis au salarié à la fin du contrat"
  ],
  prereqs: ["Le contrat de travail : CDI, CDD et période d'essai"],
  bodyHtml: `
    <p>La cessation de la relation de travail est un moment charnière, encadré par des règles strictes destinées à protéger le salarié contre l'arbitraire, tout en reconnaissant à l'employeur un pouvoir de gestion de son personnel.</p>

    <h3>1. Les principaux modes de cessation</h3>
    <table class="mini-table">
      <tr><th>Mode</th><th>Origine</th><th>Caractéristique principale</th></tr>
      <tr><td>Démission</td><td>Salarié</td><td>Préavis obligatoire, dont la durée varie selon la catégorie professionnelle</td></tr>
      <tr><td>Licenciement</td><td>Employeur</td><td>Doit reposer sur une cause réelle et sérieuse, procédure stricte à respecter</td></tr>
      <tr><td>Rupture conventionnelle</td><td>Accord mutuel</td><td>Mode moins formalisé qu'ailleurs, mais existant en pratique au Bénin</td></tr>
      <tr><td>Fin de CDD</td><td>Arrivée du terme</td><td>Cessation automatique à l'échéance prévue, sauf renouvellement</td></tr>
      <tr><td>Retraite</td><td>Salarié (à l'âge légal)</td><td>Ouvre droit à pension auprès de la CNSS</td></tr>
    </table>

    <h3>2. Le licenciement : une cause réelle et sérieuse exigée</h3>
    <p>Un licenciement au Bénin doit être fondé sur une <strong>cause réelle et sérieuse</strong> : faute du salarié (simple, grave ou lourde selon la gravité), insuffisance professionnelle constatée, ou motif économique (suppression de poste, difficultés de l'entreprise). Un licenciement dépourvu de cause réelle et sérieuse est qualifié d'<strong>abusif</strong> et expose l'employeur à des sanctions, notamment indemnitaires.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — la procédure de licenciement</span>
      Sauf faute lourde justifiant une mise à pied immédiate, tout licenciement doit suivre une procédure précise sous peine de nullité : <strong>convocation écrite</strong> à un entretien préalable (remise en main propre contre décharge ou par lettre recommandée), <strong>entretien préalable</strong> avec un délai minimum de convocation respecté (le salarié pouvant se faire assister), puis <strong>notification écrite et motivée</strong> du licenciement mentionnant précisément les griefs retenus. L'employeur qui envisage un licenciement collectif doit en outre suivre une procédure renforcée et, selon les cas, informer l'inspecteur du travail de son projet.
    </div>

    <h3>3. Le préavis</h3>
    <p>Sauf en cas de faute grave ou lourde (qui autorise une rupture immédiate sans préavis) ou pendant la période d'essai, la cessation du contrat — qu'elle soit à l'initiative du salarié (démission) ou de l'employeur (licenciement) — est précédée d'un <strong>préavis</strong>, dont la durée varie généralement de <strong>8 jours à 3 mois</strong> selon la catégorie professionnelle et l'ancienneté du salarié. Si l'employeur dispense le salarié d'exécuter ce préavis, il lui doit une <strong>indemnité compensatrice de préavis</strong> équivalente à la rémunération qu'il aurait perçue.</p>

    <h3>4. L'indemnité de licenciement</h3>
    <p>Le salarié licencié (hors faute grave ou lourde) et justifiant d'une ancienneté suffisante dans l'entreprise (au moins un an) a droit à une <strong>indemnité de licenciement</strong>, dont le montant est généralement calculé en fonction de son salaire et de son ancienneté (les conventions collectives précisant les modalités exactes de calcul, souvent renforcées après plusieurs années de service). Cette indemnité, à la différence du salaire, bénéficie d'un régime social et fiscal favorable : elle échappe en principe à la cotisation CNSS (car elle n'est pas assimilée à un salaire) et sa fraction correspondant au minimum légal est généralement exonérée d'impôt sur les traitements et salaires (ITS).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un employeur convoque un salarié à un entretien préalable le matin même pour un licenciement notifié l'après-midi, sans lui laisser de délai entre la convocation et l'entretien, ni la possibilité de se faire assister. Cette procédure est-elle conforme ?</p>
      <p><strong>Solution :</strong> Non — la procédure de licenciement impose un délai minimum entre la convocation et l'entretien préalable, ainsi que la possibilité pour le salarié de se faire assister lors de cet entretien. Le non-respect de ces exigences procédurales expose l'employeur à un risque de nullité de la procédure, indépendamment même du bien-fondé du motif invoqué.</p>
      <p class="example-answer">Réponse : non, la procédure décrite ne respecte pas les garanties procédurales minimales prévues pour un licenciement, ce qui l'expose à une contestation.</p>
    </div>

    <h3>5. Les documents de fin de contrat</h3>
    <p>À la cessation de tout contrat de travail, l'employeur doit remettre au salarié plusieurs documents obligatoires : le <strong>certificat de travail</strong> (attestant de la période d'emploi et des fonctions occupées), l'<strong>attestation CNSS</strong> (utile pour le calcul des droits sociaux futurs), ainsi que le règlement des sommes dues (dernier salaire, indemnités de congés payés non pris, indemnité de licenciement le cas échéant). Il est recommandé au salarié de conserver l'ensemble de ces documents et de ne signer aucun document (notamment un « reçu pour solde de tout compte ») sous pression, sans en avoir vérifié le contenu.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Les principaux modes de cessation sont : démission, licenciement, rupture conventionnelle, fin de CDD, retraite</li>
      <li>Un licenciement doit reposer sur une cause réelle et sérieuse et suivre une procédure stricte (convocation, entretien, notification écrite motivée)</li>
      <li>Le préavis (généralement 8 jours à 3 mois selon la catégorie) précède la cessation, sauf faute grave/lourde ou période d'essai</li>
      <li>L'indemnité de licenciement est due au salarié ayant au moins 1 an d'ancienneté, licencié hors faute grave, avec un régime fiscal et social favorable</li>
      <li>À la fin du contrat, l'employeur remet certificat de travail, attestation CNSS et règlement des sommes dues</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire qu'un employeur peut licencier sans motif, sans procédure, ni préavis en dehors des cas de faute grave/lourde</li>
      <li>Signer un « reçu pour solde de tout compte » sous pression sans en avoir vérifié le contenu</li>
      <li>Confondre indemnité de licenciement (liée à l'ancienneté, régime favorable) et indemnité compensatrice de préavis (équivalente au salaire du préavis non exécuté)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Un licenciement doit obligatoirement reposer sur :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt6e1" value="wrong">La seule volonté de l'employeur, sans justification</label>
        <label class="option"><input type="radio" name="ldt6e1" value="right">Une cause réelle et sérieuse</label>
        <label class="option"><input type="radio" name="ldt6e1" value="wrong">L'accord préalable de tous les autres salariés</label>
        <label class="option"><input type="radio" name="ldt6e1" value="wrong">Une décision de l'inspection du travail dans tous les cas</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt6e1','ldt6fb1','Correct — l\\'absence de cause réelle et sérieuse rend le licenciement abusif et expose l\\'employeur à des sanctions.','Relis la définition du licenciement valable en début de section 2.')">Vérifier</button>
      <div class="feedback" id="ldt6fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Quels documents l'employeur doit-il remettre au salarié à la fin du contrat ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt6e2" value="wrong">Uniquement le dernier bulletin de salaire</label>
        <label class="option"><input type="radio" name="ldt6e2" value="right">Certificat de travail, attestation CNSS et règlement des sommes dues</label>
        <label class="option"><input type="radio" name="ldt6e2" value="wrong">Aucun document n'est obligatoire</label>
        <label class="option"><input type="radio" name="ldt6e2" value="wrong">Uniquement une lettre de recommandation</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt6e2','ldt6fb2','Correct — ces trois éléments sont attendus à la fin de tout contrat de travail.','Relis la section sur les documents de fin de contrat.')">Vérifier</button>
      <div class="feedback" id="ldt6fb2"></div>
    </div>
  </div>
  `
};
LEGISTRAV_NOVA_KB[ldtKey("Cessation de la relation de travail : démission, licenciement et indemnités")] = {
  intro: "Salut, moi c'est Nova ! On parle de la fin du contrat de travail : démission, licenciement, préavis, indemnités. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/licenciement/i, replies:[
      "Un licenciement doit reposer sur une cause réelle et sérieuse (faute, insuffisance professionnelle, motif économique) et suivre une procédure stricte : convocation écrite, entretien préalable, notification écrite motivée."
    ]},
    { test:/pr[ée]avis/i, replies:[
      "Le préavis précède la cessation du contrat (démission ou licenciement), sauf faute grave/lourde ou période d'essai. Sa durée varie généralement de 8 jours à 3 mois selon la catégorie professionnelle."
    ]},
    { test:/indemnit[ée] de licenciement/i, replies:[
      "L'indemnité de licenciement est due au salarié ayant au moins 1 an d'ancienneté, licencié hors faute grave/lourde. Elle bénéficie d'un régime social et fiscal favorable (pas de cotisation CNSS, souvent exonérée d'ITS pour son minimum légal)."
    ]},
    { test:/certificat de travail|attestation cnss/i, replies:[
      "À la fin du contrat, l'employeur doit remettre : certificat de travail, attestation CNSS, et le règlement des sommes dues (salaire, congés non pris, indemnités le cas échéant)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à ce qui rend un licenciement valable ou abusif.",
      "Indice niveau 2 : ce n'est ni la seule volonté de l'employeur, ni l'accord des autres salariés.",
      "Indice niveau 3 : il faut une cause réelle et sérieuse."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la liste des documents de fin de contrat.",
      "Indice niveau 2 : il y a plus qu'un seul document.",
      "Indice niveau 3 : certificat de travail, attestation CNSS, et règlement des sommes dues."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
LEGISTRAV_CHAPTERS[ldtKey("Représentation collective : délégués du personnel et conventions collectives")] = {
  objectives: [
    "Comprendre le rôle et le statut protecteur des délégués du personnel",
    "Distinguer convention collective, accord d'entreprise et droit syndical",
    "Situer la négociation collective dans la construction des droits des salariés",
    "Identifier l'intérêt de la représentation collective pour un jeune salarié"
  ],
  prereqs: ["Sources et cadre du droit du travail béninois"],
  bodyHtml: `
    <p>Au-delà de la relation individuelle entre un salarié et son employeur, le droit du travail organise une <strong>dimension collective</strong> : représentation du personnel, négociation entre partenaires sociaux, et liberté syndicale. Cette dimension collective complète et renforce la protection individuelle du salarié.</p>

    <h3>1. Les délégués du personnel</h3>
    <p>Dans les établissements atteignant un effectif minimal fixé par la réglementation, des <strong>délégués du personnel</strong> sont obligatoirement élus par les salariés eux-mêmes, selon les conditions fixées par la loi. Leur rôle est de représenter les salariés auprès de l'employeur, notamment pour porter les réclamations individuelles ou collectives relatives aux salaires, à l'application de la réglementation du travail, et de veiller à l'application des mesures d'hygiène et de sécurité.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — le statut protecteur du délégué</span>
      Compte tenu du rôle sensible qu'ils exercent (parfois en désaccord avec la direction), les délégués du personnel bénéficient d'un <strong>statut protecteur spécifique</strong> contre le licenciement : tout licenciement d'un délégué du personnel intervenu en violation de la procédure spéciale de protection prévue par le Code du travail est <strong>nul et de nul effet</strong>. Cette protection vise à garantir l'indépendance réelle du délégué dans l'exercice de son mandat.
    </div>

    <h3>2. La convention collective</h3>
    <p>Une <strong>convention collective</strong> est un accord négocié entre une ou plusieurs organisations syndicales de salariés et une ou plusieurs organisations patronales (ou un employeur), portant sur les conditions d'emploi, de travail et les garanties sociales d'une branche d'activité ou d'une entreprise. Elle vient <strong>compléter et améliorer</strong> les dispositions minimales du Code du travail — jamais les réduire (principe de faveur, voir chapitre 1) — et couvre typiquement : grilles de classification et de salaires, primes spécifiques, durée et modalités des congés, indemnités de licenciement, régime de la période d'essai selon les catégories.</p>

    <p>Une <strong>convention collective générale</strong> peut s'appliquer à l'ensemble des secteurs, tandis que des <strong>conventions collectives de branche</strong> précisent des dispositions propres à un secteur d'activité donné (industrie chimique et pharmaceutique, enseignement, banque, etc.).</p>

    <h3>3. Le droit syndical</h3>
    <p>Le droit syndical est un droit fondamental reconnu à tout salarié : la liberté de constituer un syndicat, d'y adhérer ou de ne pas y adhérer, sans que cela puisse justifier une quelconque discrimination de la part de l'employeur (en matière d'embauche, de rémunération, de promotion ou de licenciement). Les organisations syndicales représentatives participent notamment à la <strong>négociation collective</strong> des conventions et accords, ainsi qu'à la défense collective des intérêts professionnels de leurs adhérents.</p>

    <table class="mini-table">
      <tr><th>Notion</th><th>Rôle</th></tr>
      <tr><td>Délégué du personnel</td><td>Représente individuellement/collectivement les salariés d'un établissement auprès de l'employeur</td></tr>
      <tr><td>Syndicat</td><td>Organisation de défense collective des intérêts professionnels, acteur de la négociation collective</td></tr>
      <tr><td>Convention collective</td><td>Accord négocié améliorant les minima légaux pour une branche ou une entreprise</td></tr>
      <tr><td>Négociation collective</td><td>Processus de dialogue entre organisations patronales et syndicales aboutissant (ou non) à un accord</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un employeur licencie un délégué du personnel sans respecter la procédure spéciale de protection prévue par le Code du travail, invoquant une insuffisance professionnelle. Quelle est la conséquence juridique de ce licenciement ?</p>
      <p><strong>Solution :</strong> Un licenciement de délégué du personnel intervenu en violation de la procédure spéciale de protection est nul et de nul effet — indépendamment même du bien-fondé éventuel du motif invoqué. Le délégué peut donc, en principe, demander sa réintégration ou la réparation du préjudice subi.</p>
      <p class="example-answer">Réponse : le licenciement est nul et de nul effet en raison du non-respect de la procédure de protection spécifique attachée au mandat de délégué du personnel.</p>
    </div>

    <h3>4. Pourquoi cela concerne le jeune diplômé</h3>
    <p>Pour un jeune chimiste entrant dans la vie professionnelle, connaître la convention collective applicable à son secteur (chimie, pharmacie, enseignement...) permet souvent de mieux comprendre sa grille de rémunération réelle, ses droits à congés éventuellement bonifiés selon l'ancienneté, ou encore les modalités spécifiques de sa période d'essai — des informations généralement bien plus précises que le seul Code du travail, qui ne fixe que des planchers minimaux.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Les délégués du personnel, élus par les salariés, représentent leurs intérêts auprès de l'employeur et bénéficient d'un statut protecteur contre le licenciement</li>
      <li>Une convention collective améliore les minima légaux du Code du travail pour une branche ou une entreprise, sans jamais pouvoir les réduire</li>
      <li>Le droit syndical est un droit fondamental : liberté d'adhérer ou non, sans discrimination possible de l'employeur</li>
      <li>La négociation collective, portée par les organisations syndicales et patronales, construit progressivement des droits au-delà du plancher légal</li>
      <li>Connaître la convention collective de son secteur donne au jeune diplômé une image bien plus précise de ses droits réels que le seul Code du travail</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire qu'une convention collective peut être moins favorable que le Code du travail sur un point donné</li>
      <li>Penser que l'adhésion syndicale peut légalement justifier une discrimination de la part de l'employeur</li>
      <li>Ignorer le statut protecteur spécifique des délégués du personnel en matière de licenciement</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Que se passe-t-il si un délégué du personnel est licencié sans respecter la procédure spéciale de protection prévue par le Code du travail ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt7e1" value="wrong">Le licenciement est valable comme n'importe quel autre licenciement</label>
        <label class="option"><input type="radio" name="ldt7e1" value="right">Le licenciement est nul et de nul effet</label>
        <label class="option"><input type="radio" name="ldt7e1" value="wrong">Seule une amende symbolique est due par l'employeur</label>
        <label class="option"><input type="radio" name="ldt7e1" value="wrong">Le délégué perd automatiquement son mandat sans recours possible</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt7e1','ldt7fb1','Correct — c\\'est précisément le statut protecteur du délégué du personnel qui rend ce type de licenciement nul et de nul effet.','Relis le point clé sur le statut protecteur du délégué du personnel.')">Vérifier</button>
      <div class="feedback" id="ldt7fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Une convention collective de branche peut-elle prévoir des congés payés inférieurs au minimum légal du Code du travail ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt7e2" value="wrong">Oui, si les syndicats sont d'accord</label>
        <label class="option"><input type="radio" name="ldt7e2" value="right">Non, elle ne peut qu'améliorer les minima légaux, jamais les réduire</label>
        <label class="option"><input type="radio" name="ldt7e2" value="wrong">Oui, uniquement pour les nouveaux salariés</label>
        <label class="option"><input type="radio" name="ldt7e2" value="wrong">Cela dépend de la taille de l'entreprise</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt7e2','ldt7fb2','Correct — le principe de faveur (chapitre 1) interdit à une convention collective de descendre sous les minima fixés par le Code du travail.','Repense au principe de faveur vu au chapitre 1 : dans quel sens une convention collective peut-elle s\\'écarter de la loi ?')">Vérifier</button>
      <div class="feedback" id="ldt7fb2"></div>
    </div>
  </div>
  `
};
LEGISTRAV_NOVA_KB[ldtKey("Représentation collective : délégués du personnel et conventions collectives")] = {
  intro: "Salut, moi c'est Nova ! On parle de représentation collective : délégués du personnel, conventions collectives, droit syndical. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/d[ée]l[ée]gu[ée].*personnel/i, replies:[
      "Les délégués du personnel, élus par les salariés, représentent leurs intérêts auprès de l'employeur. Ils bénéficient d'un statut protecteur : leur licenciement en violation de la procédure spéciale de protection est nul et de nul effet."
    ]},
    { test:/convention collective/i, replies:[
      "Une convention collective, négociée entre syndicats et organisations patronales, complète et améliore les minima légaux du Code du travail — elle ne peut jamais les réduire (principe de faveur)."
    ]},
    { test:/syndicat|droit syndical/i, replies:[
      "Le droit syndical est un droit fondamental : liberté d'adhérer ou non à un syndicat, sans qu'aucune discrimination de l'employeur ne puisse en résulter."
    ]},
    { test:/n[ée]gociation collective/i, replies:[
      "La négociation collective est le processus de dialogue entre organisations patronales et syndicales, aboutissant (ou non) à des conventions ou accords collectifs qui améliorent les droits des salariés."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense au statut protecteur spécifique évoqué dans le point clé.",
      "Indice niveau 2 : ce n'est pas un licenciement comme un autre.",
      "Indice niveau 3 : il est nul et de nul effet en cas de non-respect de la procédure."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : repense au principe de faveur du chapitre 1.",
      "Indice niveau 2 : une convention collective ne peut jamais dégrader ce que prévoit la loi.",
      "Indice niveau 3 : elle ne peut donc pas prévoir des congés inférieurs au minimum légal."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
LEGISTRAV_CHAPTERS[ldtKey("Protection sociale et règlement des litiges du travail")] = {
  objectives: [
    "Comprendre le principe de la déclaration et de la reconnaissance d'un accident du travail",
    "Distinguer accident du travail et maladie professionnelle",
    "Connaître le rôle de l'inspection du travail dans la prévention et le contrôle",
    "Identifier les voies de règlement des litiges individuels et collectifs du travail"
  ],
  prereqs: ["Hygiène, sécurité et médecine du travail", "Rémunération : SMIG, bulletin de paie et cotisations sociales"],
  bodyHtml: `
    <p>Ce dernier chapitre boucle le parcours du droit du travail en abordant deux volets essentiels : la protection contre les risques professionnels via la CNSS, et les mécanismes permettant de résoudre les désaccords entre employeur et salarié lorsque le dialogue direct ne suffit pas.</p>

    <h3>1. Accident du travail et maladie professionnelle</h3>
    <p>La CNSS assure la couverture des <strong>risques professionnels</strong>, qui recouvrent deux notions à distinguer :</p>
    <table class="mini-table">
      <tr><th>Notion</th><th>Définition</th><th>Exemple en milieu chimique</th></tr>
      <tr><td>Accident du travail</td><td>Événement soudain survenu par le fait ou à l'occasion du travail, causant une lésion</td><td>Brûlure chimique accidentelle, chute lors d'une manipulation</td></tr>
      <tr><td>Maladie professionnelle</td><td>Affection progressive résultant de l'exposition habituelle à un risque professionnel identifié (tableau réglementaire)</td><td>Intoxication chronique liée à une exposition prolongée à certains solvants ou agents chimiques</td></tr>
    </table>
    <p>Dans les deux cas, une <strong>procédure de déclaration</strong> précise doit être suivie par l'employeur auprès de la CNSS, dans des délais réglementaires courts, afin que le salarié bénéficie d'une prise en charge et, le cas échéant, d'une indemnisation adaptée.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — pertinence pour le chimiste</span>
      Les métiers de la chimie présentent une exposition particulière aux <strong>accidents du travail</strong> (brûlures, projections, blessures) et aux <strong>maladies professionnelles</strong> à évolution lente (effets d'une exposition chronique à certains produits). Un salarié victime d'un tel événement doit impérativement le signaler sans délai à son employeur, afin de préserver ses droits à la déclaration et à l'indemnisation auprès de la CNSS.
    </div>

    <h3>2. Le rôle de l'inspection du travail</h3>
    <p>L'<strong>inspection du travail</strong> est chargée de veiller au respect de la réglementation du travail par les employeurs : contrôle des conditions de travail, vérification du respect des obligations en matière d'hygiène et de sécurité, médiation en cas de conflit, et information des employeurs comme des salariés sur leurs droits et obligations respectifs. L'employeur est tenu d'afficher dans l'entreprise les coordonnées de l'inspection du travail compétente, ainsi que le règlement intérieur et les horaires de travail applicables.</p>

    <h3>3. Le règlement des litiges individuels : les juridictions du travail</h3>
    <p>Lorsqu'un désaccord individuel entre un salarié et son employeur (contestation d'un licenciement, litige sur le paiement d'une indemnité, etc.) ne trouve pas de solution amiable, il peut être porté devant les <strong>juridictions du travail</strong> compétentes en République du Bénin. Une spécificité notable de ces juridictions est la participation d'<strong>assesseurs</strong> (représentants des employeurs et des travailleurs) aux côtés du juge professionnel : aucune juridiction du travail ne peut valablement siéger en leur absence, ce qui garantit une prise en compte directe de l'expérience du monde du travail dans le jugement rendu.</p>

    <h3>4. Le règlement des litiges collectifs</h3>
    <p>Un <strong>litige collectif</strong> (opposant, par exemple, un syndicat ou l'ensemble des salariés d'une entreprise à leur employeur, souvent à l'occasion d'une négociation salariale ou d'un différend sur les conditions de travail) suit généralement des voies distinctes des litiges individuels : tentative de conciliation, médiation, voire, en cas d'échec, recours à des mécanismes propres au droit collectif du travail (dont le droit de grève, encadré par la réglementation, comme ultime moyen de pression dans le cadre d'un conflit collectif non résolu).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un technicien de laboratoire subit une projection accidentelle de produit chimique corrosif sur les mains lors d'une manipulation. Que doit-il faire pour préserver ses droits, et quel type d'événement s'agit-il au sens de la CNSS ?</p>
      <p><strong>Solution :</strong> Il s'agit d'un <strong>accident du travail</strong> (événement soudain survenu à l'occasion du travail). Le technicien doit le signaler immédiatement à son employeur, qui doit procéder à la déclaration réglementaire auprès de la CNSS dans les délais impartis, afin que la prise en charge médicale et l'éventuelle indemnisation soient garanties.</p>
      <p class="example-answer">Réponse : c'est un accident du travail ; signalement immédiat à l'employeur, qui doit déclarer l'événement à la CNSS pour garantir les droits du salarié.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>L'accident du travail (événement soudain) se distingue de la maladie professionnelle (exposition progressive à un risque identifié), tous deux couverts par la CNSS</li>
      <li>Tout accident du travail ou maladie professionnelle doit être signalé sans délai à l'employeur, qui doit le déclarer à la CNSS</li>
      <li>L'inspection du travail contrôle le respect de la réglementation, informe et assure une médiation entre employeurs et salariés</li>
      <li>Les litiges individuels du travail relèvent des juridictions du travail, qui siègent obligatoirement avec des assesseurs représentant employeurs et travailleurs</li>
      <li>Les litiges collectifs empruntent des voies distinctes (conciliation, médiation, droit de grève encadré) des litiges individuels</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Confondre accident du travail (soudain) et maladie professionnelle (progressive, exposition habituelle)</li>
      <li>Retarder le signalement d'un accident du travail, ce qui peut compromettre la prise en charge par la CNSS</li>
      <li>Croire qu'une juridiction du travail peut siéger valablement sans les assesseurs représentant employeurs et travailleurs</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Une intoxication progressive liée à une exposition prolongée à un solvant chimique au fil des années relève de quelle catégorie ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt8e1" value="wrong">Accident du travail</label>
        <label class="option"><input type="radio" name="ldt8e1" value="right">Maladie professionnelle</label>
        <label class="option"><input type="radio" name="ldt8e1" value="wrong">Congé de maladie ordinaire</label>
        <label class="option"><input type="radio" name="ldt8e1" value="wrong">Aucune couverture n'existe pour ce cas</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt8e1','ldt8fb1','Correct — une affection progressive liée à une exposition habituelle est une maladie professionnelle, par opposition à l\\'événement soudain de l\\'accident du travail.','Relis la distinction entre accident du travail (soudain) et maladie professionnelle (progressive).')">Vérifier</button>
      <div class="feedback" id="ldt8fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Qui siège obligatoirement aux côtés du juge dans une juridiction du travail au Bénin ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ldt8e2" value="wrong">Uniquement un représentant de la CNSS</label>
        <label class="option"><input type="radio" name="ldt8e2" value="right">Des assesseurs représentant employeurs et travailleurs</label>
        <label class="option"><input type="radio" name="ldt8e2" value="wrong">Un représentant du ministère des Finances</label>
        <label class="option"><input type="radio" name="ldt8e2" value="wrong">Aucune autre personne n'est requise</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ldt8e2','ldt8fb2','Correct — aucune juridiction du travail ne peut valablement siéger en l\\'absence des assesseurs représentant employeurs et travailleurs.','Relis la section sur le règlement des litiges individuels et les juridictions du travail.')">Vérifier</button>
      <div class="feedback" id="ldt8fb2"></div>
    </div>
  </div>
  `
};
LEGISTRAV_NOVA_KB[ldtKey("Protection sociale et règlement des litiges du travail")] = {
  intro: "Salut, moi c'est Nova ! On termine avec la protection sociale et le règlement des litiges du travail. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/accident du travail/i, replies:[
      "L'accident du travail est un événement soudain survenu par le fait ou à l'occasion du travail (ex : brûlure chimique accidentelle), à distinguer de la maladie professionnelle (exposition progressive)."
    ]},
    { test:/maladie professionnelle/i, replies:[
      "La maladie professionnelle résulte d'une exposition habituelle à un risque professionnel identifié (ex : intoxication chronique liée à des solvants), contrairement à l'accident du travail qui est soudain."
    ]},
    { test:/inspection du travail/i, replies:[
      "L'inspection du travail contrôle le respect de la réglementation, vérifie les conditions d'hygiène et de sécurité, et assure une médiation entre employeurs et salariés."
    ]},
    { test:/juridiction du travail|assesseur/i, replies:[
      "Les juridictions du travail siègent obligatoirement avec des assesseurs représentant employeurs et travailleurs, aux côtés du juge professionnel — aucune juridiction du travail ne peut siéger sans eux."
    ]},
    { test:/litige collectif|gr[èe]ve/i, replies:[
      "Un litige collectif (ex : conflit salarial) suit des voies distinctes : conciliation, médiation, et en dernier recours le droit de grève, encadré par la réglementation."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense au caractère progressif de l'exposition décrite.",
      "Indice niveau 2 : ce n'est pas un événement soudain, donc pas un accident du travail.",
      "Indice niveau 3 : c'est une maladie professionnelle."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la spécificité des juridictions du travail béninoises.",
      "Indice niveau 2 : ce ne sont ni des représentants de la CNSS ni des Finances.",
      "Indice niveau 3 : ce sont des assesseurs représentant employeurs et travailleurs."
    ]}
  ]
};

/* fusionne le module Législation et droit du travail dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, LEGISTRAV_CHAPTERS);
Object.assign(NOVA_KB, LEGISTRAV_NOVA_KB);