/* =====================================================================
   CHUNK « stat » — registre STAT_CHAPTERS / STAT_NOVA_KB
   Matière(s) : Informatique|Outils informatiques et analyse de données
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   STAT_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */

/* =========================================================================
   MODULE "Outils informatiques et analyse de données" (Informatique, L1)
   10 chapitres : Word, Excel, PowerPoint, puis 7 chapitres de statistique
   descriptive (univariée et bivariée), à partir du plan de cours UE INF1125,
   Licence Physique-Chimie 1ère année.
========================================================================= */
const STAT_MATIERE = "Outils informatiques et analyse de données";
function statKey(chapterTitle){ return `Informatique|${STAT_MATIERE}|${chapterTitle}`; }
const STAT_CHAPTERS = {};
const STAT_NOVA_KB = {};

/* =========================== CHAPITRE : Apprentissage de Word =========================== */
STAT_CHAPTERS[statKey('Apprentissage de Word')] = {
  objectives: [
    "Créer, enregistrer et retrouver un document dans les formats courants (.docx, .odt, .pdf)",
    "Structurer un document à l'aide des styles (titres, corps de texte, listes)",
    "Mettre en page un document : marges, en-têtes/pieds de page, numérotation",
    "Insérer et légender des images, des tableaux et des notes de bas de page",
    "Générer une table des matières et une bibliographie automatiques, puis exporter en PDF",
    "Évaluer en quoi la séparation entre contenu et présentation, introduite par les tout premiers traitements de texte WYSIWYG, reste le principe fondamental qui rend possible l'automatisation moderne (table des matières, mise à jour globale des styles) dans tout document structuré"
  ],
  prereqs: [],
  bodyHtml: `
    <p>Le traitement de texte tel que tu le connais aujourd'hui — voir à l'écran exactement ce qui sortira à l'impression (le principe WYSIWYG, « What You See Is What You Get ») — a été inventé en 1974 par Charles Simonyi et son équipe au centre de recherche Xerox PARC, avec le logiciel Bravo. Neuf ans plus tard, en 1983, ce même Charles Simonyi, entre-temps recruté par Microsoft, dirigea le développement de Microsoft Word, en reprenant directement les principes de Bravo — une continuité directe entre le logiciel expérimental de laboratoire et l'outil que des centaines de millions de personnes utilisent aujourd'hui quotidiennement.</p>
    <p>L'innovation la plus durable de cette lignée de logiciels n'est pas visuelle mais structurelle : la séparation entre le <strong>contenu</strong> d'un texte et sa <strong>présentation</strong>, rendue possible par les styles. C'est ce même principe — décrire la structure logique d'un document (« ceci est un titre », « ceci est une citation ») plutôt que son apparence brute (« ceci est en gras, taille 16 ») — qui gouverne aujourd'hui la quasi-totalité des formats numériques structurés, du HTML des pages web aux formats d'e-books, en passant par les systèmes de publication scientifique.</p>
    <p>Word (ou son équivalent libre LibreOffice Writer) est l'outil de référence pour rédiger tout document structuré : rapport, mémoire, courrier. Le réflexe à acquérir dès le départ : <strong>ne jamais mettre en forme « à la main »</strong>, mais utiliser les styles — c'est ce qui débloque ensuite toute l'automatisation (table des matières, cohérence visuelle, mise à jour en un clic). À la fin de ce chapitre, tu sauras structurer un document complet avec les styles, le mettre en page, et générer automatiquement sa table des matières et sa bibliographie.</p>

    <h3>1. Découvrir l'interface</h3>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 100" width="100%">
          <rect x="4" y="4" width="152" height="22" rx="3" fill="#4C7CFF" opacity="0.18"/>
          <rect x="10" y="9" width="18" height="12" rx="2" fill="#4C7CFF"/>
          <rect x="32" y="9" width="18" height="12" rx="2" fill="#4C7CFF" opacity="0.6"/>
          <rect x="54" y="9" width="18" height="12" rx="2" fill="#4C7CFF" opacity="0.6"/>
          <rect x="76" y="9" width="18" height="12" rx="2" fill="#4C7CFF" opacity="0.6"/>
          <rect x="14" y="34" width="132" height="58" fill="#fff" stroke="#5A6472" stroke-width="1"/>
          <line x1="22" y1="46" x2="138" y2="46" stroke="#B8C0CC" stroke-width="2"/>
          <line x1="22" y1="56" x2="138" y2="56" stroke="#B8C0CC" stroke-width="1.4"/>
          <line x1="22" y1="64" x2="138" y2="64" stroke="#B8C0CC" stroke-width="1.4"/>
          <line x1="22" y1="72" x2="120" y2="72" stroke="#B8C0CC" stroke-width="1.4"/>
        </svg>
        <span>Ruban (onglets, groupes de commandes) + page</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 160 100" width="100%">
          <rect x="14" y="10" width="132" height="80" fill="#fff" stroke="#5A6472" stroke-width="1"/>
          <rect x="14" y="10" width="132" height="14" fill="#2DD4C4" opacity="0.25"/>
          <text x="20" y="20" font-family="IBM Plex Mono" font-size="8" fill="#0B7A6E">Titre 1</text>
          <line x1="20" y1="34" x2="130" y2="34" stroke="#B8C0CC" stroke-width="1.4"/>
          <line x1="20" y1="42" x2="130" y2="42" stroke="#B8C0CC" stroke-width="1.4"/>
          <rect x="20" y="52" width="60" height="14" fill="#F0B94D" opacity="0.3"/>
          <text x="24" y="61" font-family="IBM Plex Mono" font-size="7" fill="#7A5A0A">image</text>
          <line x1="20" y1="76" x2="130" y2="76" stroke="#B8C0CC" stroke-width="1.4"/>
        </svg>
        <span>Styles de titre + image insérée dans le texte</span>
      </div>
    </div>
    <p>Le <strong>ruban</strong> regroupe les commandes par onglets (Accueil, Insertion, Mise en page, Références...). La <strong>règle</strong> et la <strong>barre d'état</strong> (en bas) donnent des repères de mise en page et le nombre de pages/mots.</p>

    <h3>2. Structurer le texte avec les styles</h3>
    <div class="key-point">
      <span class="eyebrow">Le réflexe à prendre dès le premier document</span>
      Applique <strong>Titre 1</strong> aux titres de chapitre, <strong>Titre 2</strong> aux sous-titres, <strong>Normal</strong> au corps de texte — au lieu de choisir manuellement une taille de police en gras. Un style regroupe police, taille, espacement et couleur en une seule commande, et il suffit de modifier le style une fois pour que tous les titres du document changent ensemble.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Modifier un style une seule fois pour que tous les titres du document changent ensemble repose sur un principe simple : ne jamais dupliquer une information qui doit rester cohérente partout. En quoi cette logique — centraliser une information plutôt que la répéter à chaque occurrence — se retrouve-t-elle dans d'autres outils numériques que tu utilises déjà, au-delà du seul traitement de texte ?
    </div>

    <p>Les styles servent aussi de base à d'autres automatismes : table des matières, numérotation multi-niveaux, styles de liste.</p>

    <h3>3. Mettre en page le document</h3>
    <table class="mini-table">
      <tr><th>Élément</th><th>Rôle</th></tr>
      <tr><td>Marges et orientation</td><td>Espace entre le texte et le bord de la page (portrait ou paysage)</td></tr>
      <tr><td>Sauts de section</td><td>Permettent des mises en page différentes dans un même document (ex : une page en paysage au milieu d'un rapport en portrait)</td></tr>
      <tr><td>En-tête / pied de page</td><td>Contenu répété sur chaque page (titre du document, numéro de page)</td></tr>
      <tr><td>Numérotation des pages</td><td>Insérée dans l'en-tête ou le pied de page, avec des formats différents possibles par section</td></tr>
    </table>

    <h3>4. Insérer des images, tableaux et notes</h3>
    <p>Une image insérée peut être <strong>habillée</strong> par le texte (le texte contourne l'image) ou rester <strong>alignée sur le texte</strong> (elle occupe sa propre ligne, comme un caractère). Un tableau se construit et se met en forme comme dans un tableur simplifié, avec fusion de cellules possible. Les <strong>notes de bas de page</strong> (ou de fin de document) permettent d'ajouter une précision ou une référence sans interrompre la lecture du texte principal.</p>

    <h3>5. Table des matières et bibliographie automatiques</h3>
    <p>Une fois les styles de titres appliqués, <em>Références → Table des matières</em> génère automatiquement une table cliquable, qui se remet à jour d'un clic si le document change. La <strong>bibliographie</strong> fonctionne sur le même principe : on insère chaque référence via le gestionnaire de sources, puis on génère la liste bibliographique complète en une commande, dans un style de citation cohérent (APA, IEEE...).</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La table des matières automatique et la bibliographie automatique reposent toutes deux sur le même principe : Word « lit » une information structurée que tu as saisie (un style de titre, une source bibliographique) pour en déduire automatiquement une liste organisée. En quoi cette automatisation devient-elle impossible dès que l'information de départ n'est pas correctement structurée, même si le document « a l'air » correctement mis en forme visuellement ?
    </div>

    <h3>6. Révision et export</h3>
    <p>Le <strong>suivi des modifications</strong> affiche en couleur ce qu'un relecteur ajoute ou supprime, sans perdre la version originale ; les <strong>commentaires</strong> permettent d'annoter sans modifier le texte. Une fois le document finalisé, <em>Fichier → Exporter au format PDF</em> fige la mise en page (polices intégrées, liens conservés) pour un partage fiable, indépendant du logiciel utilisé pour l'ouvrir.</p>

    <h3>7. Frontière de la recherche</h3>
    <p>Le suivi des modifications que tu utilises dans Word, conçu à l'origine pour une relecture séquentielle (une personne modifie, une autre relit), a été largement dépassé par l'édition collaborative en temps réel de documents comme Google Docs, où plusieurs personnes modifient simultanément le même document sans jamais se marcher dessus. Cette prouesse technique repose sur des algorithmes de <strong>transformation opérationnelle</strong> (Operational Transformation) ou de <strong>types de données répliquées sans conflit</strong> (CRDT), qui garantissent mathématiquement que tous les collaborateurs finissent par voir exactement le même document, quel que soit l'ordre dans lequel leurs modifications respectives arrivent sur le réseau.</p>
    <p><strong>Question ouverte :</strong> comment ces algorithmes de synchronisation en temps réel garantissent-ils qu'aucune modification n'est perdue, même lorsque deux personnes modifient simultanément exactement la même phrase ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>assistants de rédaction par intelligence artificielle</strong>, aujourd'hui intégrés directement dans les traitements de texte modernes, proposent des reformulations, détectent des incohérences de style, voire génèrent des sections entières de document à partir d'instructions en langage naturel — une évolution qui prolonge, un demi-siècle plus tard, l'ambition initiale de Bravo de faciliter la production de documents structurés.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Contenu du document → styles (structure logique : Titre 1, Normal...) → mise en page (marges, sections, en-têtes) → éléments enrichis (images, tableaux, notes) → automatisation (table des matières, bibliographie) → export figé (PDF) pour un partage fiable
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Structure (styles)} + \\text{Contenu} \\Rightarrow \\text{Automatisation (table des matières, mise à jour globale)}$$
      Ce principe, hérité directement de la séparation entre contenu et présentation inventée à Xerox PARC, est ce qui distingue un document professionnel bien construit d'un document simplement « mis en forme à l'œil » : seule la structuration explicite via les styles permet à Word d'automatiser ce qu'un humain devrait sinon refaire manuellement à chaque modification.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Charles Simonyi n'avait jamais quitté Xerox PARC pour rejoindre Microsoft en 1981 : les principes de Bravo se seraient-ils tout de même répandus aussi largement dans les logiciels de bureautique grand public ?</li>
        <li>Pourquoi un saut de section, et non un simple saut de page, est-il nécessaire pour changer l'orientation d'une seule page au milieu d'un document ?</li>
        <li>Quelle serait la conséquence, pour le travail collaboratif à distance moderne, d'une absence d'algorithmes garantissant la cohérence d'un document édité simultanément par plusieurs personnes ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>C. Simonyi et al., Bravo, Xerox PARC, 1974 — le premier traitement de texte WYSIWYG, ancêtre direct de Microsoft Word.</li>
        <li>Documentation officielle Microsoft Word — pour les fonctionnalités précises de styles, sections et automatisation évoquées dans ce chapitre.</li>
        <li>C. Sun, C. Ellis, « Operational Transformation in Real-Time Group Editors », ACM CSCW, 1998 — l'un des articles fondateurs de l'édition collaborative en temps réel.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais structurer un document complet avec les styles, le mettre en page, et générer automatiquement sa table des matières et sa bibliographie. Le chapitre suivant, « Apprentissage d'Excel », te fera passer du texte structuré aux données structurées, avec la même exigence de méthode : ne jamais faire à la main ce qu'un automatisme bien conçu peut faire à ta place. Comme le montre l'histoire de Bravo à Xerox PARC : une innovation de laboratoire, si elle repose sur un principe suffisamment solide — ici, séparer structure et présentation —, peut se retrouver un demi-siècle plus tard entre les mains de centaines de millions de personnes chaque jour.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Toujours structurer avec des styles (Titre 1, Titre 2, Normal) plutôt qu'avec une mise en forme manuelle</li>
        <li>Table des matières et bibliographie se génèrent automatiquement à partir des styles / du gestionnaire de sources</li>
        <li>Les sauts de section permettent des mises en page différentes dans un même document</li>
        <li>Suivi des modifications = trace des changements ; commentaires = annotations sans modifier le texte</li>
        <li>Exporter en PDF fige la mise en page pour un partage fiable</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Mettre les titres en gras/grande taille à la main au lieu d'utiliser un style de titre (la table des matières automatique ne fonctionnera pas)</li>
        <li>Oublier de mettre à jour la table des matières après avoir modifié le document</li>
        <li>Envoyer un .docx pour un document figé plutôt qu'un PDF, ce qui peut décaler la mise en page chez le destinataire</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Quel est le préalable indispensable pour générer une table des matières automatique ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="word_e1" value="wrong"> Écrire le document en une seule police</label>
          <label class="option"><input type="radio" name="word_e1" value="right"> Avoir appliqué des styles de titre aux titres et sous-titres</label>
          <label class="option"><input type="radio" name="word_e1" value="wrong"> Activer le suivi des modifications</label>
          <label class="option"><input type="radio" name="word_e1" value="wrong"> Insérer d'abord toutes les images</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('word_e1','word_fb1','Correct — Word construit la table des matières à partir des styles de titre appliqués au texte.','Réfléchis à ce que Word « lit » pour savoir quels titres inclure dans la table des matières.')">Vérifier</button>
        <div class="feedback" id="word_fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Tu veux insérer une page en orientation paysage au milieu d'un rapport en portrait. Que dois-tu utiliser ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="word_e2" value="wrong"> Un saut de page simple</label>
          <label class="option"><input type="radio" name="word_e2" value="right"> Un saut de section</label>
          <label class="option"><input type="radio" name="word_e2" value="wrong"> Un nouveau document séparé</label>
          <label class="option"><input type="radio" name="word_e2" value="wrong"> Un tableau pivoté</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('word_e2','word_fb2','Correct — un saut de section permet de changer la mise en page (orientation, marges...) sans affecter le reste du document.','Un simple saut de page ne change pas l\\'orientation : il faut un outil qui isole une zone avec ses propres réglages de mise en page.')">Vérifier</button>
        <div class="feedback" id="word_fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Quel format garantit que la mise en page d'un document reste identique quel que soit l'ordinateur qui l'ouvre ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="word_e3" value="wrong"> .docx</label>
          <label class="option"><input type="radio" name="word_e3" value="wrong"> .odt</label>
          <label class="option"><input type="radio" name="word_e3" value="right"> .pdf</label>
          <label class="option"><input type="radio" name="word_e3" value="wrong"> .txt</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('word_e3','word_fb3','Correct — le PDF fige la mise en page et intègre les polices, contrairement aux formats éditables comme .docx ou .odt.','Les formats éditables (.docx, .odt) peuvent afficher différemment selon les polices installées : quel format est justement fait pour figer le rendu ?')">Vérifier</button>
        <div class="feedback" id="word_fb3"></div>
      </div>
    </div>
  `
};

STAT_NOVA_KB[statKey('Apprentissage de Word')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Apprentissage de Word ». Demande-moi comment faire quelque chose (styles, table des matières, mise en page...), ou demande un indice sur un exercice.",
  rules: [
    { test:/style/i, replies:[
      "Applique des styles (Titre 1, Titre 2, Normal) plutôt qu'une mise en forme manuelle : ça garde le document cohérent et ça débloque la table des matières automatique."
    ]},
    { test:/table des matières/i, replies:[
      "Une fois tes titres en styles Titre 1/Titre 2, va dans Références → Table des matières. Elle se régénère d'un clic si tu modifies le document ensuite."
    ]},
    { test:/section|mise en page|marge|orientation/i, replies:[
      "Pour changer d'orientation ou de marges seulement sur une partie du document, utilise un saut de SECTION (pas un simple saut de page), qui isole une zone avec ses propres réglages."
    ]},
    { test:/bibliographie|référence|citation/i, replies:[
      "Insère chaque référence via le gestionnaire de sources au fur et à mesure de la rédaction, puis génère la bibliographie complète en une commande, dans le style de citation voulu (APA, IEEE...)."
    ]},
    { test:/suivi des modifications|commentaire/i, replies:[
      "Le suivi des modifications trace ce qui est ajouté/supprimé (utile en relecture collaborative) ; les commentaires annotent sans toucher au texte. Les deux se retirent une fois la révision acceptée."
    ]},
    { test:/pdf|export/i, replies:[
      "Fichier → Exporter au format PDF fige la mise en page et intègre les polices : le document a le même rendu chez tout le monde, contrairement à un .docx qui peut légèrement varier."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : demande-toi ce que Word regarde pour savoir quels titres inclure automatiquement.",
      "Indice niveau 2 : ce n'est pas une question de police, c'est une question de style appliqué.",
      "Indice niveau 3 : il faut avoir appliqué des styles de titre aux titres et sous-titres."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : un saut de page classique change-t-il l'orientation de la page suivante ?",
      "Indice niveau 2 : non — il faut un outil qui isole une zone avec ses propres réglages de mise en page.",
      "Indice niveau 3 : c'est le saut de section."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : les formats éditables (.docx, .odt) peuvent-ils varier selon les polices installées sur l'ordinateur ?",
      "Indice niveau 2 : oui, contrairement à un format qui fige tout, images et polices comprises.",
      "Indice niveau 3 : c'est le PDF."
    ]}
  ]
};

/* =========================== CHAPITRE : Apprentissage d'Excel =========================== */
STAT_CHAPTERS[statKey("Apprentissage d'Excel")] = {
  objectives: [
    "Naviguer dans un classeur (feuilles, cellules, plages) et saisir/valider des données",
    "Écrire des formules et distinguer référence relative, absolue et mixte",
    "Utiliser les fonctions courantes (SOMME, MOYENNE, NB.SI, SI, RECHERCHEV)",
    "Trier, filtrer des données et construire un tableau croisé dynamique",
    "Créer un graphique et appliquer une mise en forme conditionnelle",
    "Évaluer en quoi l'invention de VisiCalc en 1979 — automatiser le recalcul d'un tableau de chiffres — a transformé un geste comptable manuel et sujet à erreur en un principe qui structure aujourd'hui l'analyse de données dans la quasi-totalité des métiers"
  ],
  prereqs: [],
  bodyHtml: `
    <p>En 1979, deux étudiants du MIT, Dan Bricklin et Bob Frankston, créèrent VisiCalc, le tout premier tableur électronique — un logiciel si révolutionnaire qu'il est aujourd'hui considéré comme la toute première « killer app » de l'histoire de l'informatique personnelle : des entreprises achetaient un ordinateur Apple II uniquement pour pouvoir faire tourner VisiCalc, ce qui contribua directement au décollage commercial de l'informatique personnelle. Bricklin avait eu l'idée en observant son professeur d'économie à Harvard effacer et recalculer sans cesse un tableau de chiffres au tableau noir — il voulut créer une « feuille de calcul magique » qui se recalculerait toute seule.</p>
    <p>L'idée fondatrice de Bricklin — une formule qui se recopie et se recalcule automatiquement — reste, 45 ans plus tard, exactement le principe sur lequel repose Excel : c'est cette automatisation du recalcul, aujourd'hui totalement invisible tant elle nous semble évidente, qui a transformé la comptabilité, l'analyse financière et la gestion de données dans la quasi-totalité des métiers, en éliminant des heures de recalculs manuels sujets à erreur.</p>
    <p>Excel (ou LibreOffice Calc) est l'outil de référence pour organiser des données chiffrées et automatiser des calculs répétitifs. Toute la puissance du tableur vient d'une seule idée : une formule écrite une fois peut se recopier sur des milliers de lignes en s'adaptant automatiquement. À la fin de ce chapitre, tu sauras écrire des formules avec les bonnes références, utiliser les fonctions usuelles, et exploiter tris, filtres et tableaux croisés dynamiques.</p>

    <h3>1. Interface et structure</h3>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 100" width="100%">
          <rect x="10" y="10" width="140" height="70" fill="#fff" stroke="#5A6472" stroke-width="1"/>
          <line x1="10" y1="24" x2="150" y2="24" stroke="#B8C0CC" stroke-width="1"/>
          <line x1="10" y1="38" x2="150" y2="38" stroke="#B8C0CC" stroke-width="1"/>
          <line x1="10" y1="52" x2="150" y2="52" stroke="#B8C0CC" stroke-width="1"/>
          <line x1="10" y1="66" x2="150" y2="66" stroke="#B8C0CC" stroke-width="1"/>
          <line x1="40" y1="10" x2="40" y2="80" stroke="#B8C0CC" stroke-width="1"/>
          <line x1="80" y1="10" x2="80" y2="80" stroke="#B8C0CC" stroke-width="1"/>
          <line x1="120" y1="10" x2="120" y2="80" stroke="#B8C0CC" stroke-width="1"/>
          <rect x="40" y="24" width="40" height="14" fill="#4C7CFF" opacity="0.25"/>
          <text x="46" y="34" font-family="IBM Plex Mono" font-size="8" fill="#1D3A9E">=B2*2</text>
          <rect x="10" y="86" width="34" height="10" fill="#2DD4C4" opacity="0.3"/>
          <text x="12" y="94" font-family="IBM Plex Mono" font-size="7" fill="#0B7A6E">Feuille1</text>
        </svg>
        <span>Classeur → feuilles → grille de cellules</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 160 100" width="100%">
          <rect x="20" y="14" width="120" height="16" fill="#F0B94D" opacity="0.25"/>
          <text x="24" y="26" font-family="IBM Plex Mono" font-size="8" fill="#7A5A0A">=SOMME(B2:B10)</text>
          <rect x="20" y="36" width="30" height="44" fill="none" stroke="#5A6472" stroke-width="1"/>
          <rect x="50" y="36" width="30" height="44" fill="#4C7CFF" opacity="0.15" stroke="#5A6472" stroke-width="1"/>
          <text x="55" y="60" font-family="IBM Plex Mono" font-size="8" fill="#1D3A9E">colonne B</text>
        </svg>
        <span>Une formule s'applique à une plage de cellules</span>
      </div>
    </div>
    <p>Un <strong>classeur</strong> contient plusieurs <strong>feuilles</strong>, chacune organisée en <strong>cellules</strong> repérées par une colonne (lettre) et une ligne (numéro), par exemple <code>B2</code>. Une <strong>plage</strong> regroupe plusieurs cellules, notée <code>B2:B10</code>.</p>

    <h3>2. Saisie, validation et formatage des données</h3>
    <p>Avant de calculer, il faut des données propres : un format numérique cohérent par colonne (nombre, date, pourcentage), et si besoin une <strong>validation de données</strong> (liste déroulante, plage de valeurs autorisées) pour éviter les erreurs de saisie. Une seule variable par colonne, avec un en-tête clair en première ligne — c'est ce qui permet ensuite aux outils d'analyse de fonctionner correctement.</p>

    <h3>3. Formules et références</h3>
    <div class="formula-box">$$\\texttt{=B2+C2} \\qquad \\texttt{=B\\$2+\\$C2} \\qquad \\texttt{=\\$B\\$2+\\$C\\$2}$$</div>
    <table class="mini-table">
      <tr><th>Type de référence</th><th>Comportement à la recopie</th></tr>
      <tr><td>Relative (<code>B2</code>)</td><td>S'adapte automatiquement à la nouvelle position (ligne et colonne suivent)</td></tr>
      <tr><td>Absolue (<code>$B$2</code>)</td><td>Reste figée sur la même cellule, quelle que soit la recopie</td></tr>
      <tr><td>Mixte (<code>B$2</code> ou <code>$B2</code>)</td><td>Fige seulement la ligne ou seulement la colonne</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Pourquoi c'est essentiel</span>
      Une référence relative recopiée sur toute une colonne s'adapte ligne par ligne — parfait pour appliquer le même calcul à chaque enregistrement. Une référence absolue sert au contraire à pointer vers une valeur fixe (un taux de TVA, une moyenne globale) qui ne doit jamais changer, même recopiée ailleurs.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Oublier un symbole $ dans une référence peut sembler un détail mineur, mais recopier une formule sur des centaines de lignes avec la mauvaise référence peut fausser silencieusement tout un tableau, sans qu'aucune erreur ne s'affiche. Pourquoi ce type d'erreur est-il particulièrement dangereux, comparé à une erreur qui provoquerait un message d'erreur visible ?
    </div>

    <h3>4. Fonctions usuelles</h3>
    <table class="mini-table">
      <tr><th>Fonction</th><th>Rôle</th></tr>
      <tr><td><code>SOMME(plage)</code></td><td>Additionne les valeurs d'une plage</td></tr>
      <tr><td><code>MOYENNE(plage)</code></td><td>Calcule la moyenne arithmétique d'une plage</td></tr>
      <tr><td><code>NB.SI(plage, critère)</code></td><td>Compte les cellules qui vérifient un critère</td></tr>
      <tr><td><code>SI(condition, si_vrai, si_faux)</code></td><td>Renvoie une valeur selon qu'une condition est vraie ou fausse</td></tr>
      <tr><td><code>RECHERCHEV(valeur, table, colonne)</code></td><td>Recherche une valeur dans la première colonne d'un tableau et renvoie la valeur associée dans une autre colonne</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> compter, dans la plage A2:A20, combien de notes sont supérieures ou égales à 10.</p>
      <p class="example-answer"><code>=NB.SI(A2:A20;">=10")</code></p>
    </div>

    <h3>5. Trier, filtrer et croiser les données</h3>
    <p>Le <strong>tri</strong> réordonne les lignes selon une ou plusieurs colonnes ; le <strong>filtre</strong> n'affiche que les lignes qui vérifient un critère, sans supprimer les autres. Le <strong>tableau croisé dynamique</strong> résume rapidement de grands volumes de données en croisant plusieurs champs (par exemple, la moyenne des notes par groupe et par matière), sans écrire de formule.</p>

    <h3>6. Graphiques et mise en forme conditionnelle</h3>
    <p>Un graphique se construit à partir d'une plage sélectionnée (type adapté aux données : barres pour comparer des catégories, courbes pour une évolution, nuage de points pour une relation entre deux variables). La <strong>mise en forme conditionnelle</strong> colore automatiquement les cellules selon une règle (par exemple, en rouge les valeurs négatives), pour repérer visuellement des tendances sans les chercher une à une.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Choisir un type de graphique inadapté à la question posée (un camembert pour une évolution temporelle, par exemple) ne produit pas d'erreur technique — le graphique s'affiche parfaitement. Pourquoi ce choix reste-t-il pourtant une erreur grave, même si rien ne « plante » visiblement dans le logiciel ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>Le tableur, hérité de VisiCalc, atteint ses limites face aux volumes de données considérables générés aujourd'hui par les capteurs, les réseaux sociaux ou les transactions en ligne : Excel plafonne à environ un million de lignes par feuille, une limite rapidement atteinte par de nombreux jeux de données réels. Pour ces cas, les analystes de données se tournent vers des langages de programmation comme <strong>Python</strong> (avec la bibliothèque pandas) ou <strong>R</strong>, qui appliquent exactement les mêmes concepts que ceux de ce chapitre — filtrer, agréger, croiser des données — mais à une échelle bien plus grande, sur des jeux de données de plusieurs milliards de lignes.</p>
    <p><strong>Question ouverte :</strong> à partir de quelle taille de jeu de données, et pour quels types d'analyses, le passage d'un tableur à un langage de programmation devient-il réellement nécessaire, plutôt qu'un simple confort ?</p>
    <p><strong>Technologie émergente :</strong> les fonctionnalités récentes d'Excel comme <strong>Power Query</strong> (transformation et nettoyage automatisés de données provenant de sources multiples) et les <strong>tableaux dynamiques</strong> réduisent progressivement l'écart entre le tableur classique et les outils de science des données, en important dans l'interface familière du tableur des capacités autrefois réservées aux langages de programmation.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Données brutes saisies (une variable par colonne) → formules avec références adaptées (relative/absolue/mixte) → fonctions usuelles (SOMME, MOYENNE, NB.SI, SI, RECHERCHEV) → tri/filtre/tableau croisé dynamique pour résumer → graphique et mise en forme conditionnelle pour visualiser
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Formule} + \\text{Référence adaptée} \\Rightarrow \\text{Recopie automatique fiable}$$
      Ce principe, hérité directement de l'intuition de Bricklin en 1979, résume la puissance entière du tableur : une seule formule, correctement construite avec le bon type de référence, se propage instantanément et sans erreur sur des milliers de lignes — remplaçant ce qui aurait autrefois exigé des heures de recalculs manuels.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Dan Bricklin n'avait jamais observé son professeur d'économie recalculer sans cesse son tableau au tableau noir : le tableur électronique aurait-il émergé aussi tôt, ou aurait-il fallu attendre un autre déclic ?</li>
        <li>Pourquoi une seule variable par colonne (plutôt que plusieurs informations mélangées dans une même colonne) est-elle une condition indispensable pour que les outils de tri, de filtre et de tableau croisé dynamique fonctionnent correctement ?</li>
        <li>Quelle serait la conséquence, pour l'analyse de très grands jeux de données modernes, d'une absence d'outils de programmation comme Python et R venant compléter les capacités du tableur classique ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>D. Bricklin, B. Frankston, VisiCalc, 1979 — le tout premier tableur électronique, ancêtre direct d'Excel.</li>
        <li>Documentation officielle Microsoft Excel — pour les fonctionnalités précises de formules, tableaux croisés dynamiques et mise en forme conditionnelle évoquées dans ce chapitre.</li>
        <li>W. McKinney, <em>Python for Data Analysis</em>, O'Reilly — sur les outils de programmation qui prennent le relais du tableur pour l'analyse de données à grande échelle.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais écrire des formules avec les bonnes références, utiliser les fonctions usuelles, et exploiter tris, filtres et tableaux croisés dynamiques. Le chapitre suivant, « Apprentissage de PowerPoint », te fera passer de l'organisation des données à leur mise en récit visuelle pour une présentation orale. Comme le montre l'histoire de VisiCalc : un geste manuel répétitif et source d'erreurs — recalculer sans cesse un tableau de chiffres — peut, une fois automatisé, devenir le socle silencieux de la comptabilité et de l'analyse de données dans le monde entier.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Classeur → feuilles → cellules (colonne+ligne) → plages</li>
        <li>Référence relative (s'adapte à la recopie) vs absolue $B$2 (fixe) vs mixte (fige ligne ou colonne)</li>
        <li>Fonctions clés : SOMME, MOYENNE, NB.SI, SI, RECHERCHEV</li>
        <li>Tri = réordonne ; filtre = masque sans supprimer ; tableau croisé dynamique = résumé croisé sans formule</li>
        <li>Un graphique se choisit selon la question posée : comparer (barres), évoluer (courbe), relier (nuage de points)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Recopier une formule avec une référence relative alors qu'on veut pointer toujours vers la même cellule (oubli du $)</li>
        <li>Mélanger plusieurs variables dans une même colonne, ce qui casse les tris, filtres et calculs</li>
        <li>Choisir un type de graphique qui ne correspond pas à la question posée (ex : un camembert pour une évolution dans le temps)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Tu recopies la formule <code>=B2*$C$1</code> de la cellule B2 vers B3. Que devient-elle ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="excel_e1" value="wrong"> =B3*$C$2</label>
          <label class="option"><input type="radio" name="excel_e1" value="right"> =B3*$C$1</label>
          <label class="option"><input type="radio" name="excel_e1" value="wrong"> =B2*$C$1</label>
          <label class="option"><input type="radio" name="excel_e1" value="wrong"> =B3*C1</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('excel_e1','excel_fb1','Correct — B2 est relative et suit la recopie (devient B3), tandis que $C$1 est absolue et reste figée.','Distingue bien la partie relative (B2, qui bouge) de la partie absolue ($C$1, qui ne bouge jamais).')">Vérifier</button>
        <div class="feedback" id="excel_fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quelle fonction utiliser pour compter, dans une colonne, le nombre de valeurs supérieures ou égales à 10 ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="excel_e2" value="wrong"> SOMME</label>
          <label class="option"><input type="radio" name="excel_e2" value="wrong"> MOYENNE</label>
          <label class="option"><input type="radio" name="excel_e2" value="right"> NB.SI</label>
          <label class="option"><input type="radio" name="excel_e2" value="wrong"> RECHERCHEV</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('excel_e2','excel_fb2','Correct — NB.SI(plage;critère) compte les cellules qui vérifient une condition, ici \\'>=10\\'.','Tu veux COMPTER des cellules qui vérifient une CONDITION : quelle fonction du cours fait exactement ça ?')">Vérifier</button>
        <div class="feedback" id="excel_fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Tu as un grand tableau de ventes (produit, région, mois, montant) et tu veux la moyenne des montants par région et par mois en quelques clics. Quel outil utiliser ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="excel_e3" value="wrong"> Un filtre simple</label>
          <label class="option"><input type="radio" name="excel_e3" value="wrong"> Un tri multi-colonnes</label>
          <label class="option"><input type="radio" name="excel_e3" value="right"> Un tableau croisé dynamique</label>
          <label class="option"><input type="radio" name="excel_e3" value="wrong"> Une mise en forme conditionnelle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('excel_e3','excel_fb3','Correct — le tableau croisé dynamique résume et croise plusieurs champs (ici région et mois) sans écrire de formule.','Tu veux CROISER deux champs (région ET mois) pour résumer une troisième valeur : quel outil du cours est fait pour ça ?')">Vérifier</button>
        <div class="feedback" id="excel_fb3"></div>
      </div>
    </div>
  `
};

STAT_NOVA_KB[statKey("Apprentissage d'Excel")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Apprentissage d'Excel ». Demande-moi une fonction, une histoire de références ($), ou demande un indice sur un exercice.",
  rules: [
    { test:/référence relative|référence absolue|\$/i, replies:[
      "Une référence relative (B2) s'adapte à la recopie ; une référence absolue ($B$2) reste figée sur la même cellule ; une référence mixte (B$2 ou $B2) ne fige que la ligne ou que la colonne."
    ]},
    { test:/nb\.si|somme|moyenne|\bsi\b|recherchev/i, replies:[
      "SOMME et MOYENNE agissent sur une plage entière. NB.SI compte les cellules qui vérifient un critère. SI renvoie une valeur selon une condition. RECHERCHEV cherche une valeur dans une colonne et renvoie une valeur associée dans une autre colonne du même tableau."
    ]},
    { test:/tri|filtre/i, replies:[
      "Le tri réordonne les lignes ; le filtre les masque temporairement sans les supprimer. Les deux sont réversibles et n'altèrent pas les données d'origine."
    ]},
    { test:/tableau croisé dynamique|tcd/i, replies:[
      "Le tableau croisé dynamique résume de grands volumes de données en croisant plusieurs champs (ex : moyenne des ventes par région et par mois), sans écrire une seule formule."
    ]},
    { test:/graphique/i, replies:[
      "Choisis le type de graphique selon la question : barres pour comparer des catégories, courbe pour une évolution dans le temps, nuage de points pour une relation entre deux variables quantitatives."
    ]},
    { test:/mise en forme conditionnelle/i, replies:[
      "La mise en forme conditionnelle colore automatiquement les cellules selon une règle (ex: rouge si négatif) pour repérer visuellement des tendances sans les chercher une à une."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : repère ce qui est écrit avec des $ (fixe) et ce qui ne l'est pas (bouge à la recopie).",
      "Indice niveau 2 : B2 est relative donc devient B3 en recopiant vers le bas ; $C$1 reste identique.",
      "Indice niveau 3 : la formule devient =B3*$C$1."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : tu veux compter des cellules qui vérifient une condition, pas juste les additionner.",
      "Indice niveau 2 : SOMME et MOYENNE ne testent pas de condition — il te faut une fonction avec un critère.",
      "Indice niveau 3 : c'est NB.SI(plage;\">=10\")."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : tu veux croiser DEUX champs (région et mois) pour résumer une troisième valeur.",
      "Indice niveau 2 : un simple tri ou filtre ne fait pas ce croisement automatiquement.",
      "Indice niveau 3 : c'est le tableau croisé dynamique."
    ]}
  ]
};

/* =========================== CHAPITRE : Apprentissage de PowerPoint =========================== */
STAT_CHAPTERS[statKey('Apprentissage de PowerPoint')] = {
  objectives: [
    "Structurer une présentation en diapositives et en sections cohérentes",
    "Utiliser le masque des diapositives pour une identité visuelle homogène",
    "Insérer et organiser texte, images, tableaux, graphiques et vidéos",
    "Utiliser transitions et animations avec discernement",
    "Paramétrer et conduire un diaporama en mode présentateur",
    "Évaluer en quoi la critique de Peter Norvig sur le discours de Gettysburg « powerpointisé » illustre le risque, inhérent au format même des diapositives, de fragmenter une pensée complexe en une suite de puces superficielles — et comment une conception rigoureuse peut éviter cet écueil"
  ],
  prereqs: [],
  bodyHtml: `
    <p>En 1987, Robert Gaskins et Dennis Austin, deux informaticiens de la petite entreprise Forethought, développèrent le tout premier logiciel de présentation assistée par ordinateur pour Macintosh, alors baptisé « Presenter » puis rebaptisé PowerPoint juste avant son lancement. Le succès fut si immédiat que Microsoft racheta Forethought quelques mois plus tard pour 14 millions de dollars — la toute première acquisition de l'histoire de Microsoft, qui allait faire de PowerPoint l'un des logiciels les plus utilisés au monde.</p>
    <p>Le succès planétaire de PowerPoint n'est pas sans critiques : en 2000, l'informaticien Peter Norvig publia une parodie restée célèbre, réécrivant le discours de Gettysburg d'Abraham Lincoln — l'un des discours les plus marquants de l'histoire américaine — sous forme de diapositives PowerPoint remplies de puces creuses, pour illustrer comment un format mal utilisé peut appauvrir et fragmenter une pensée complexe en une suite de fragments décousus. Cette critique, devenue un classique enseigné dans de nombreuses écoles de communication, rappelle une règle simple mais souvent oubliée : PowerPoint doit appuyer un discours, jamais le remplacer.</p>
    <p>PowerPoint (ou LibreOffice Impress) sert à construire un support visuel qui appuie un discours oral — pas à remplacer ce discours. Une bonne présentation se prépare autant sur le fond (un message clair par diapositive) que sur la forme (cohérence visuelle, lisibilité). À la fin de ce chapitre, tu sauras structurer une présentation cohérente avec un masque de diapositives, et la conduire efficacement en mode présentateur.</p>

    <h3>1. Interface et vues</h3>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 100" width="100%">
          <rect x="14" y="10" width="100" height="70" fill="#fff" stroke="#5A6472" stroke-width="1.2"/>
          <rect x="22" y="18" width="84" height="14" fill="#4C7CFF" opacity="0.25"/>
          <text x="26" y="28" font-family="IBM Plex Mono" font-size="8" fill="#1D3A9E">Titre de la diapo</text>
          <line x1="22" y1="44" x2="98" y2="44" stroke="#B8C0CC" stroke-width="1.4"/>
          <line x1="22" y1="54" x2="98" y2="54" stroke="#B8C0CC" stroke-width="1.4"/>
          <rect x="120" y="10" width="26" height="20" fill="none" stroke="#B8C0CC" stroke-width="1"/>
          <rect x="120" y="34" width="26" height="20" fill="none" stroke="#B8C0CC" stroke-width="1"/>
          <rect x="120" y="58" width="26" height="20" fill="none" stroke="#B8C0CC" stroke-width="1"/>
        </svg>
        <span>Vue Normal (diapositive) + volet des miniatures</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 160 100" width="100%">
          <rect x="10" y="10" width="60" height="36" fill="none" stroke="#2DD4C4" stroke-width="1.4"/>
          <rect x="80" y="10" width="60" height="36" fill="none" stroke="#B8C0CC" stroke-width="1"/>
          <rect x="10" y="54" width="60" height="36" fill="none" stroke="#B8C0CC" stroke-width="1"/>
          <rect x="80" y="54" width="60" height="36" fill="none" stroke="#B8C0CC" stroke-width="1"/>
          <text x="14" y="26" font-family="IBM Plex Mono" font-size="7" fill="#0B7A6E">1</text>
        </svg>
        <span>Trieuse de diapositives : réorganiser par glisser-déposer</span>
      </div>
    </div>
    <p>Les principales vues : <strong>Normal</strong> (rédiger une diapositive), <strong>Plan</strong> (voir uniquement les titres/texte pour structurer les idées), <strong>Trieuse de diapositives</strong> (réorganiser l'ensemble d'un coup d'œil), <strong>Diaporama</strong> (mode plein écran de présentation).</p>

    <h3>2. Structurer le contenu : masque et sections</h3>
    <div class="key-point">
      <span class="eyebrow">Le masque des diapositives</span>
      Le <strong>masque</strong> définit l'apparence commune (logo, couleurs, polices, position des titres) de toutes les diapositives utilisant une même mise en page. Modifie le masque une fois, et tout le diaporama qui l'utilise change en même temps — c'est la garantie d'une présentation visuellement cohérente sans retoucher chaque diapositive une par une.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Modifier le masque une seule fois pour que toutes les diapositives changent ensemble repose sur le même principe de centralisation que les styles dans Word ou les formules dans Excel. En quoi ce principe — modifier une seule source plutôt que répéter la modification partout — traverse-t-il l'ensemble des outils bureautiques que tu as étudiés dans ce cours ?
    </div>

    <p>Les <strong>sections</strong> regroupent des diapositives par grande partie (introduction, méthode, résultats, conclusion) pour naviguer facilement dans une présentation longue.</p>

    <h3>3. Insérer et organiser les objets</h3>
    <p>Texte, images, tableaux, graphiques (souvent liés à un tableur pour se mettre à jour automatiquement) et vidéos s'insèrent directement dans une diapositive et se redimensionnent/alignent avec des repères visuels. Les <strong>commentaires du présentateur</strong> (visibles seulement en mode présentateur) servent d'aide-mémoire sans surcharger la diapositive elle-même.</p>

    <h3>4. Transitions et animations : à utiliser avec parcimonie</h3>
    <div class="example-box">
      <span class="eyebrow">Bonnes pratiques</span>
      <p>Une transition (entre deux diapositives) ou une animation (sur un élément d'une diapositive) doit servir le message — révéler un point à la fois, montrer une évolution — jamais distraire. Une règle simple : si l'effet attire plus l'attention que le contenu, il est probablement de trop.</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La règle « si l'effet attire plus l'attention que le contenu, il est probablement de trop » s'applique aux animations, mais aussi à bien d'autres choix de conception (couleurs vives, polices originales, images décoratives). Pourquoi cette règle générale — l'effet visuel ne doit jamais concurrencer le message — est-elle plus difficile à respecter qu'il n'y paraît, une fois qu'on a accès à des dizaines d'effets disponibles en un clic ?
    </div>

    <h3>5. Paramétrer et conduire le diaporama</h3>
    <p>Le <strong>mode présentateur</strong> affiche, sur l'écran du présentateur uniquement, la diapositive actuelle, la suivante, le minutage écoulé et les notes — pendant que le public ne voit que la diapositive en plein écran. On peut aussi masquer certaines diapositives (sans les supprimer) ou minuter une répétition pour caler la durée totale de l'intervention.</p>

    <h3>6. Quelques repères de communication visuelle</h3>
    <ul style="margin-left:20px; margin-bottom:14px;">
      <li><strong>Une idée par diapositive</strong> : éviter de surcharger un même écran de plusieurs messages</li>
      <li><strong>Contraste suffisant</strong> entre le texte et l'arrière-plan pour rester lisible même projeté</li>
      <li><strong>Peu de texte, du visuel</strong> : préférer un schéma ou un graphique à un paragraphe entier</li>
    </ul>

    <h3>7. Frontière de la recherche</h3>
    <p>La critique de Norvig s'inscrit dans un débat plus large et toujours actuel sur l'impact cognitif du format PowerPoint : en 2003, le statisticien et spécialiste de la visualisation de données Edward Tufte publia un essai influent, « The Cognitive Style of PowerPoint », soutenant que la structure hiérarchique en puces du logiciel encourage une pensée simplifiée à l'excès, et citant même l'enquête sur l'accident de la navette spatiale Columbia (2003), où un rapport technique crucial présenté sous forme de diapositives PowerPoint aurait, selon certains analystes, dilué des informations de sécurité importantes dans un excès de hiérarchisation.</p>
    <p><strong>Question ouverte :</strong> au-delà des bonnes pratiques individuelles de conception, existe-t-il des limites structurelles inhérentes au format « diapositive avec puces » qu'aucune bonne pratique ne peut entièrement corriger ?</p>
    <p><strong>Technologie émergente :</strong> des outils de présentation alternatifs, comme les présentations en <strong>toile continue</strong> (zoomant et dézoomant dans un espace visuel unique plutôt que de découper l'information en diapositives séparées), proposent une approche différente de la mise en récit visuelle, en réponse directe aux critiques adressées au format PowerPoint classique.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Message à transmettre → structure en sections cohérentes → masque de diapositives (identité visuelle homogène) → une idée par diapositive, peu de texte, du visuel → transitions/animations seulement si elles servent le message → mode présentateur pour une conduite fluide en direct
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Support visuel} \\neq \\text{Discours} \\quad \\text{(le support appuie, il ne remplace jamais)}$$
      Ce principe, au cœur de toutes les critiques adressées à PowerPoint depuis Norvig et Tufte, résume l'exigence centrale de ce chapitre : une diapositive réussie n'essaie jamais de tout dire par écrit, elle offre un point d'appui visuel à une parole qui reste, elle, le vecteur principal du message.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Peter Norvig n'avait jamais publié sa parodie du discours de Gettysburg : la critique du format PowerPoint aurait-elle atteint la même notoriété, ou aurait-il fallu un autre exemple marquant pour l'illustrer aussi clairement ?</li>
        <li>Pourquoi le mode Plan, qui n'affiche que les titres et le texte sans la mise en forme, est-il particulièrement utile pour vérifier la cohérence logique d'une présentation avant même de travailler son apparence visuelle ?</li>
        <li>Quelle serait la conséquence, pour la clarté d'une communication technique critique (comme un rapport de sécurité), d'une utilisation excessive de la hiérarchisation en puces plutôt que d'une argumentation rédigée en continu ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>R. Gaskins, <em>Sweating Bullets: Notes about Inventing PowerPoint</em>, 2012 — le récit par son propre créateur de l'invention de PowerPoint en 1987.</li>
        <li>E. Tufte, « The Cognitive Style of PowerPoint », 2003 — l'essai critique de référence sur l'impact cognitif du format PowerPoint.</li>
        <li>G. Reynolds, <em>Presentation Zen</em>, New Riders — référence moderne sur la conception de présentations visuelles épurées et efficaces.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais structurer une présentation cohérente avec un masque de diapositives, et la conduire efficacement en mode présentateur — clôturant ainsi le triptyque bureautique Word/Excel/PowerPoint de ce cours. Le chapitre suivant, « Concepts fondamentaux de la statistique descriptive », te fera passer de la mise en forme des données à leur analyse quantitative rigoureuse. Comme le rappelle la parodie de Norvig sur le discours de Gettysburg : un outil, aussi puissant soit-il, ne vaut que par la rigueur de pensée de celui qui l'utilise — jamais l'inverse.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>4 vues clés : Normal (rédiger), Plan (structurer), Trieuse (réorganiser), Diaporama (présenter)</li>
        <li>Le masque des diapositives fixe l'identité visuelle commune ; les sections organisent une présentation longue</li>
        <li>Transitions/animations : à utiliser seulement quand elles servent le message</li>
        <li>Le mode présentateur affiche notes et minutage sans que le public les voie</li>
        <li>Une idée par diapositive, du visuel plutôt que du texte dense, un bon contraste</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Modifier chaque diapositive individuellement au lieu d'utiliser le masque (incohérence visuelle et perte de temps)</li>
        <li>Multiplier les animations décoratives qui distraient du message</li>
        <li>Surcharger une diapositive de texte, obligeant le public à lire plutôt qu'à écouter</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Tu veux changer le logo affiché sur toutes les diapositives de ta présentation en une seule action. Que dois-tu modifier ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="ppt_e1" value="wrong"> Chaque diapositive une par une</label>
          <label class="option"><input type="radio" name="ppt_e1" value="right"> Le masque des diapositives</label>
          <label class="option"><input type="radio" name="ppt_e1" value="wrong"> La trieuse de diapositives</label>
          <label class="option"><input type="radio" name="ppt_e1" value="wrong"> Le mode présentateur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ppt_e1','ppt_fb1','Correct — le masque définit l\\'apparence commune (dont le logo) à toutes les diapositives qui l\\'utilisent : le modifier une fois suffit.','Cherche l\\'élément qui centralise l\\'apparence COMMUNE à toutes les diapositives.')">Vérifier</button>
        <div class="feedback" id="ppt_fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quelle vue permet de réorganiser rapidement l'ordre de toutes les diapositives par glisser-déposer ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="ppt_e2" value="wrong"> Vue Normal</label>
          <label class="option"><input type="radio" name="ppt_e2" value="wrong"> Vue Plan</label>
          <label class="option"><input type="radio" name="ppt_e2" value="right"> Trieuse de diapositives</label>
          <label class="option"><input type="radio" name="ppt_e2" value="wrong"> Mode présentateur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ppt_e2','ppt_fb2','Correct — la trieuse affiche toutes les diapositives en miniature, idéale pour les réorganiser en un coup d\\'œil.','Tu veux voir TOUTES les diapositives en même temps, en miniature, pour les déplacer : quelle vue fait ça ?')">Vérifier</button>
        <div class="feedback" id="ppt_fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pendant la présentation, quel mode affiche tes notes et le minutage seulement sur ton écran, sans que le public les voie ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="ppt_e3" value="wrong"> Vue Plan</label>
          <label class="option"><input type="radio" name="ppt_e3" value="wrong"> Trieuse de diapositives</label>
          <label class="option"><input type="radio" name="ppt_e3" value="right"> Mode présentateur</label>
          <label class="option"><input type="radio" name="ppt_e3" value="wrong"> Mode masque</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ppt_e3','ppt_fb3','Correct — le mode présentateur sépare l\\'affichage : diapositive plein écran pour le public, notes et minutage pour toi.','C\\'est le mode conçu spécifiquement pour séparer ce que voit le public de ce que voit le présentateur.')">Vérifier</button>
        <div class="feedback" id="ppt_fb3"></div>
      </div>
    </div>
  `
};

STAT_NOVA_KB[statKey('Apprentissage de PowerPoint')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Apprentissage de PowerPoint ». Demande-moi comment structurer une présentation, ou demande un indice sur un exercice.",
  rules: [
    { test:/masque/i, replies:[
      "Le masque des diapositives fixe l'apparence commune (logo, couleurs, polices) de toutes les diapositives qui l'utilisent : modifie-le une fois, tout le diaporama suit."
    ]},
    { test:/vue|trieuse|plan\b/i, replies:[
      "4 vues à connaître : Normal pour rédiger une diapositive, Plan pour structurer le texte, Trieuse pour réorganiser l'ensemble en miniatures, Diaporama pour présenter en plein écran."
    ]},
    { test:/transition|animation/i, replies:[
      "Utilise transitions et animations seulement quand elles servent le message (révéler un point, montrer une évolution) — si l'effet attire plus l'attention que le contenu, retire-le."
    ]},
    { test:/présentateur|minutage/i, replies:[
      "Le mode présentateur affiche sur TON écran la diapositive actuelle, la suivante, tes notes et le minutage — le public, lui, ne voit que la diapositive en plein écran."
    ]},
    { test:/section/i, replies:[
      "Les sections regroupent les diapositives par grande partie (introduction, méthode, résultats...) pour naviguer facilement dans une présentation longue."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : cherche l'élément qui centralise l'apparence commune à toutes les diapositives.",
      "Indice niveau 2 : ce n'est pas la trieuse (qui réorganise) ni le mode présentateur (qui affiche des notes).",
      "Indice niveau 3 : c'est le masque des diapositives."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : tu veux voir toutes les diapositives en même temps, en miniature.",
      "Indice niveau 2 : ni la vue Normal (une diapositive à la fois) ni la vue Plan (juste le texte) ne montrent ça.",
      "Indice niveau 3 : c'est la trieuse de diapositives."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : cherche le mode qui sépare ce que voit le public de ce que voit le présentateur.",
      "Indice niveau 2 : ce n'est ni la vue Plan ni la trieuse, qui servent à préparer, pas à présenter.",
      "Indice niveau 3 : c'est le mode présentateur."
    ]}
  ]
};

/* =========================== CHAPITRE : Concepts fondamentaux de la statistique descriptive =========================== */
STAT_CHAPTERS[statKey('Concepts fondamentaux de la statistique descriptive')] = {
  objectives: [
    "Distinguer population, échantillon, individu et unité statistique",
    "Différencier recensement et sondage",
    "Identifier le type d'une variable : qualitative (nominale/ordinale) ou quantitative (discrète/continue)",
    "Reconnaître l'échelle de mesure adaptée à une variable",
    "Choisir le résumé numérique ou graphique cohérent avec le type de variable observée",
    "Évaluer en quoi l'exigence méthodologique de John Graunt en 1662 — bien identifier ce que l'on observe avant de chercher à le résumer — reste, trois siècles et demi plus tard, la toute première étape incontournable de n'importe quelle analyse statistique moderne"
  ],
  prereqs: [],
  bodyHtml: `
    <p>En 1662, le marchand londonien John Graunt publia un ouvrage resté fondateur pour la statistique moderne : en épluchant systématiquement les registres de décès de la ville de Londres (les « Bills of Mortality »), il fut le premier à extraire des régularités quantitatives d'observations individuelles brutes — taux de mortalité par âge, proportion de naissances de garçons et de filles, effets des épidémies. Ce travail, qui semble aujourd'hui d'une simplicité méthodologique évidente, fut une révolution : il montra pour la première fois qu'on pouvait tirer des connaissances fiables et généralisables d'un ensemble de données, à condition de savoir précisément ce que l'on observait et comment le classer.</p>
    <p>Le mot « statistique » lui-même vient du latin <em>status</em> (l'État) : la discipline est née des besoins des administrations d'États européens du XVIIe et XVIIIe siècle de recenser leur population, leurs ressources et leurs richesses pour gouverner efficacement. Aujourd'hui, cette même exigence de départ — bien identifier ce que l'on mesure avant de le résumer ou de l'analyser — reste la toute première compétence à maîtriser, que l'on travaille sur des données démographiques, médicales, commerciales ou scientifiques.</p>
    <p>Avant tout calcul, la statistique descriptive commence par un vocabulaire précis : savoir nommer ce que l'on observe et de quel type de donnée il s'agit conditionne tout le reste — le bon résumé, le bon graphique, et plus tard, la bonne analyse. À la fin de ce chapitre, tu sauras identifier précisément le type de n'importe quelle variable statistique, et en déduire les résumés adaptés.</p>

    <h3>1. Population, échantillon et unité statistique</h3>
    <table class="mini-table">
      <tr><th>Terme</th><th>Définition</th></tr>
      <tr><td>Population</td><td>Ensemble complet des individus (ou unités statistiques) concernés par l'étude</td></tr>
      <tr><td>Individu / unité statistique</td><td>Élément unique de la population sur lequel on observe une ou plusieurs variables</td></tr>
      <tr><td>Échantillon</td><td>Sous-ensemble de la population, sur lequel on effectue réellement les mesures</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Recensement ou sondage ?</span>
      Un <strong>recensement</strong> interroge toute la population (coûteux, rarement possible). Un <strong>sondage</strong> n'interroge qu'un échantillon, choisi pour être représentatif de la population — c'est la situation la plus fréquente en pratique.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un sondage n'interroge qu'un échantillon, jamais toute la population — pourtant, on en tire couramment des conclusions valables pour l'ensemble de la population. Pourquoi cette généralisation, en apparence risquée, peut-elle être scientifiquement justifiée à condition que l'échantillon soit correctement choisi ?
    </div>

    <h3>2. Caractère et variable</h3>
    <p>Un <strong>caractère</strong> (ou variable) est la propriété observée sur chaque individu : sa couleur des yeux, son revenu, son niveau de satisfaction... On distingue deux grandes familles :</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Sous-type</th><th>Exemple</th></tr>
      <tr><td rowspan="2">Qualitative</td><td>Nominale (sans ordre naturel)</td><td>Couleur des yeux, sexe, nationalité</td></tr>
      <tr><td>Ordinale (avec un ordre)</td><td>Niveau de satisfaction (faible/moyen/élevé)</td></tr>
      <tr><td rowspan="2">Quantitative</td><td>Discrète (valeurs isolées)</td><td>Nombre d'enfants, nombre de fautes</td></tr>
      <tr><td>Continue (intervalles de valeurs)</td><td>Taille, poids, durée</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> classer les variables suivantes : (a) marque de téléphone possédée ; (b) nombre de frères et sœurs ; (c) température en °C.</p>
      <p class="example-answer">(a) Qualitative nominale — (b) Quantitative discrète — (c) Quantitative continue.</p>
    </div>

    <h3>3. Pourquoi cette typologie compte</h3>
    <div class="key-point">
      <span class="eyebrow">Le type de variable détermine tout ce qui suit</span>
      On ne calcule pas une moyenne sur une variable qualitative nominale (la « moyenne » des couleurs des yeux n'a pas de sens), on ne trace pas un histogramme pour des catégories sans ordre, et une variable quantitative continue nécessite un regroupement en classes avant d'en dresser le tableau des effectifs. Identifier correctement le type de variable est donc la toute première étape de n'importe quelle analyse.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Calculer la « moyenne » des couleurs des yeux d'un groupe n'a strictement aucun sens mathématique, même si le calcul lui-même (additionner des codes numériques arbitraires puis diviser) est techniquement réalisable. En quoi cet exemple illustre-t-il qu'un calcul peut être numériquement possible tout en étant statistiquement absurde ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>L'exigence de Graunt — bien typer une donnée avant de l'analyser — reste, sous une forme actualisée, la toute première étape de tout projet moderne de science des données : avant d'entraîner un modèle d'apprentissage automatique, les data scientists doivent identifier précisément si chaque variable de leur jeu de données est catégorielle (nominale ou ordinale) ou numérique (discrète ou continue), car cette distinction détermine directement quelles techniques statistiques et quels algorithmes peuvent s'appliquer — exactement le même principe que celui de ce chapitre, appliqué à des jeux de données de plusieurs millions d'individus plutôt qu'aux registres de décès londoniens du XVIIe siècle.</p>
    <p><strong>Question ouverte :</strong> comment traite-t-on statistiquement des variables qui semblent à mi-chemin entre deux catégories, comme une note sur 20 (techniquement discrète, mais souvent traitée comme continue en pratique) ?</p>
    <p><strong>Technologie émergente :</strong> les instituts nationaux de statistique modernes (comme l'INSEE en France) s'appuient aujourd'hui sur des <strong>registres administratifs numériques</strong> couplés à des techniques d'appariement de données pour produire des statistiques quasi exhaustives sans recensement traditionnel coûteux — une évolution directe de la distinction recensement/sondage posée dans ce chapitre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Population étudiée → recensement (exhaustif) ou sondage (échantillon représentatif) → identification du caractère observé sur chaque individu → typage rigoureux (qualitatif nominal/ordinal, quantitatif discret/continu) → choix du résumé numérique et du graphique adaptés à ce type
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Type de variable} \\Rightarrow \\text{Résumé et graphique valides}$$
      Cette implication, simple en apparence, est le principe fondateur de toute la statistique descriptive héritée de Graunt : le type d'une variable n'est jamais un détail administratif, il détermine strictement quels calculs et quelles représentations graphiques ont un sens, et lesquels seraient absurdes malgré leur faisabilité technique.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Graunt n'avait jamais entrepris d'éplucher systématiquement les registres de décès londoniens en 1662 : la démographie et la statistique moderne se seraient-elles développées à un rythme différent ?</li>
        <li>Pourquoi une variable ordinale (comme le niveau de satisfaction) ne peut-elle pas être traitée exactement comme une variable quantitative, même lorsqu'on lui attribue des codes numériques (1, 2, 3) pour faciliter son traitement informatique ?</li>
        <li>Quelle serait la conséquence, pour un projet moderne de science des données, d'un mauvais typage initial des variables d'un jeu de données avant d'entraîner un modèle d'apprentissage automatique ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. Graunt, <em>Natural and Political Observations Made upon the Bills of Mortality</em>, 1662 — l'ouvrage fondateur de la démographie et de la statistique descriptive moderne.</li>
        <li>D. Freedman, R. Pisani, R. Purves, <em>Statistics</em>, W. W. Norton — référence pédagogique internationale sur les concepts fondamentaux de la statistique.</li>
        <li>INSEE, méthodologie du recensement de la population — pour une application contemporaine de la distinction recensement/sondage.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais identifier précisément le type de n'importe quelle variable statistique, et en déduire les résumés adaptés. Le chapitre suivant, « Organisation et représentation des séries à une variable », mettra immédiatement en pratique cette typologie pour construire tableaux et graphiques adaptés à chaque type de donnée. Comme le montre l'exemple de Graunt : une question aussi simple que « de quel type de donnée s'agit-il ? » peut, si elle est correctement posée, fonder toute une discipline scientifique.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Population (tout) vs échantillon (une partie) ; recensement (toute la population) vs sondage (un échantillon)</li>
        <li>Qualitative nominale (sans ordre) / ordinale (avec ordre) ; quantitative discrète (valeurs isolées) / continue (intervalles)</li>
        <li>Le type de variable conditionne le résumé numérique et le graphique adaptés (vu au chapitre suivant)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre variable ordinale (avec ordre, ex: niveau d'étude) et nominale (sans ordre, ex: couleur)</li>
        <li>Calculer une moyenne sur une variable qualitative, ce qui n'a pas de sens</li>
        <li>Confondre échantillon et population dans l'énoncé d'un problème</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le niveau d'étude (primaire / secondaire / supérieur) est une variable...</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat0e1" value="wrong"> Qualitative nominale</label>
          <label class="option"><input type="radio" name="stat0e1" value="right"> Qualitative ordinale</label>
          <label class="option"><input type="radio" name="stat0e1" value="wrong"> Quantitative discrète</label>
          <label class="option"><input type="radio" name="stat0e1" value="wrong"> Quantitative continue</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat0e1','stat0fb1','Correct — il existe un ordre naturel entre ces niveaux (primaire < secondaire < supérieur) : c\\'est qualitatif ordinal.','Y a-t-il un ordre naturel entre ces catégories, ou sont-elles interchangeables ?')">Vérifier</button>
        <div class="feedback" id="stat0fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">On interroge 200 étudiants parmi les 3000 inscrits à l'université sur leur temps de trajet. Que représentent les 200 étudiants ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat0e2" value="wrong"> La population</label>
          <label class="option"><input type="radio" name="stat0e2" value="right"> Un échantillon</label>
          <label class="option"><input type="radio" name="stat0e2" value="wrong"> Un recensement</label>
          <label class="option"><input type="radio" name="stat0e2" value="wrong"> Une variable</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat0e2','stat0fb2','Correct — les 200 étudiants ne sont qu\\'une partie des 3000 inscrits (la population) : c\\'est un échantillon.','La population, ce sont les 3000 inscrits. Que représentent alors les 200 interrogés par rapport à ce total ?')">Vérifier</button>
        <div class="feedback" id="stat0fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La durée d'un appel téléphonique (en secondes) est une variable...</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat0e3" value="wrong"> Qualitative ordinale</label>
          <label class="option"><input type="radio" name="stat0e3" value="wrong"> Quantitative discrète</label>
          <label class="option"><input type="radio" name="stat0e3" value="right"> Quantitative continue</label>
          <label class="option"><input type="radio" name="stat0e3" value="wrong"> Qualitative nominale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat0e3','stat0fb3','Correct — une durée peut prendre n\\'importe quelle valeur dans un intervalle : c\\'est quantitatif continu.','Une durée ne prend pas seulement des valeurs entières isolées : elle peut varier de façon continue.')">Vérifier</button>
        <div class="feedback" id="stat0fb3"></div>
      </div>
    </div>
  `
};

STAT_NOVA_KB[statKey('Concepts fondamentaux de la statistique descriptive')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Concepts fondamentaux de la statistique descriptive ». Demande-moi une définition, donne-moi un exemple de variable à classer, ou demande un indice sur un exercice.",
  rules: [
    { test:/population|échantillon|recensement|sondage/i, replies:[
      "La population est l'ensemble complet des individus concernés ; l'échantillon n'en est qu'une partie. Un recensement interroge toute la population, un sondage seulement un échantillon."
    ]},
    { test:/qualitative|quantitative|nominale|ordinale|discr[eè]te|continue/i, replies:[
      "Qualitative nominale = catégories sans ordre (couleur) ; qualitative ordinale = catégories avec ordre (niveau de satisfaction) ; quantitative discrète = valeurs isolées (nombre d'enfants) ; quantitative continue = intervalles de valeurs (taille, durée)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : y a-t-il un ordre naturel entre primaire, secondaire et supérieur ?",
      "Indice niveau 2 : oui, un ordre logique existe entre ces trois catégories.",
      "Indice niveau 3 : c'est donc une variable qualitative ORDINALE."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : la population, ce sont les 3000 inscrits. Que sont alors les 200 interrogés ?",
      "Indice niveau 2 : ils ne représentent qu'une partie de la population totale.",
      "Indice niveau 3 : les 200 étudiants forment un échantillon."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : une durée en secondes ne prend-elle que des valeurs entières isolées ?",
      "Indice niveau 2 : non, elle peut varier de façon continue (12,3 s, 12,34 s...).",
      "Indice niveau 3 : c'est une variable quantitative continue."
    ]}
  ]
};

/* =========================== CHAPITRE : Organisation et représentation des séries à une variable =========================== */
STAT_CHAPTERS[statKey('Organisation et représentation des séries à une variable')] = {
  objectives: [
    "Construire un tableau statistique (effectifs, fréquences, effectifs et fréquences cumulés)",
    "Regrouper une variable continue en classes",
    "Choisir la représentation graphique adaptée au type de variable",
    "Construire un diagramme en bâtons, un diagramme circulaire, un histogramme et un polygone des effectifs",
    "Lire et interpréter un tableau ou un graphique statistique",
    "Évaluer en quoi l'intuition de William Playfair — qu'une image bien construite communique une information numérique plus efficacement qu'un tableau de chiffres — reste le principe directeur du choix entre diagramme en bâtons, camembert et histogramme"
  ],
  prereqs: ["Concepts fondamentaux de la statistique descriptive"],
  bodyHtml: `
    <p>En 1786, l'ingénieur et économiste écossais William Playfair publia son <em>Atlas commercial et politique</em>, dans lequel il inventa le tout premier diagramme en bâtons de l'histoire pour représenter les importations et exportations de l'Écosse — une innovation si audacieuse pour l'époque qu'il dut se justifier longuement dans sa préface, expliquant pourquoi une image pouvait transmettre une information aussi fiable qu'un tableau de chiffres. Quinze ans plus tard, en 1801, ce même Playfair inventa également le diagramme circulaire (le fameux « camembert ») — les deux types de graphiques que tu vas construire dans ce chapitre, restés pratiquement inchangés dans leur principe depuis plus de deux siècles.</p>
    <p>L'intuition de Playfair reposait sur un constat encore valable aujourd'hui : le cerveau humain perçoit et compare des longueurs ou des surfaces bien plus rapidement qu'il ne compare des colonnes de chiffres. C'est cette même intuition qui explique pourquoi, dans un monde saturé de données, savoir choisir le bon graphique pour le bon type de donnée reste une compétence aussi précieuse que savoir calculer juste : un graphique mal choisi peut déformer, voire trahir, une information par ailleurs parfaitement exacte.</p>
    <p>Une fois le type de variable identifié, il faut résumer les données brutes en un tableau exploitable, puis choisir la représentation graphique qui rend la lecture immédiate. À la fin de ce chapitre, tu sauras construire un tableau statistique complet et choisir, sans hésitation, le graphique adapté à chaque type de variable.</p>

    <h3>1. Le tableau statistique</h3>
    <p>Pour une variable prenant les valeurs $x_1, \\dots, x_k$ avec effectifs $n_1, \\dots, n_k$ (et $n = \\sum_i n_i$ l'effectif total) :</p>
    <div class="formula-box">$$f_i = \\frac{n_i}{n} \\quad(\\text{fréquence}), \\qquad N_i = \\sum_{j\\le i} n_j \\quad(\\text{effectif cumulé croissant}), \\qquad F_i = \\sum_{j\\le i} f_j \\quad(\\text{fréquence cumulée})$$</div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> 40 étudiants sont répartis par nombre de livres lus dans le mois : 0 livre (8 étudiants), 1 livre (15), 2 livres (12), 3 livres (5).</p>
      <p class="example-answer">Fréquences : $f_0=0{,}20$ ; $f_1=0{,}375$ ; $f_2=0{,}30$ ; $f_3=0{,}125$. Effectifs cumulés : $8, 23, 35, 40$.</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les fréquences cumulées croissantes finissent toujours par atteindre exactement 1 (ou 100%), quelle que soit la série de données étudiée. Pourquoi cette propriété est-elle non seulement une conséquence logique du calcul, mais aussi un outil pratique de vérification pour repérer une erreur de calcul dans un tableau statistique ?
    </div>

    <h3>2. Regrouper une variable continue en classes</h3>
    <p>Pour une variable continue, on répartit les valeurs en <strong>classes</strong> $[e_{i-1}, e_i[$ de même amplitude (en général), et on compte l'effectif de chaque classe. Le <strong>centre de classe</strong> $\\frac{e_{i-1}+e_i}{2}$ sert de valeur représentative pour les calculs numériques ultérieurs.</p>

    <h3>3. Le graphique adapté à chaque type de variable</h3>
    <table class="mini-table">
      <tr><th>Type de variable</th><th>Graphique adapté</th></tr>
      <tr><td>Qualitative nominale ou ordinale</td><td>Diagramme en bâtons, diagramme à bandes, diagramme circulaire (camembert)</td></tr>
      <tr><td>Quantitative discrète</td><td>Diagramme en bâtons des effectifs ou des fréquences</td></tr>
      <tr><td>Quantitative continue (en classes)</td><td>Histogramme, polygone des effectifs ou des fréquences</td></tr>
    </table>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 100" width="100%">
          <line x1="15" y1="85" x2="15" y2="15" stroke="#5A6472" stroke-width="1.2"/>
          <line x1="15" y1="85" x2="130" y2="85" stroke="#5A6472" stroke-width="1.2"/>
          <rect x="25" y="45" width="14" height="40" fill="#4C7CFF"/>
          <rect x="50" y="20" width="14" height="65" fill="#4C7CFF"/>
          <rect x="75" y="35" width="14" height="50" fill="#4C7CFF"/>
          <rect x="100" y="65" width="14" height="20" fill="#4C7CFF"/>
        </svg>
        <span>Diagramme en bâtons (variable discrète)</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 140 100" width="100%">
          <line x1="15" y1="85" x2="15" y2="15" stroke="#5A6472" stroke-width="1.2"/>
          <line x1="15" y1="85" x2="130" y2="85" stroke="#5A6472" stroke-width="1.2"/>
          <rect x="18" y="55" width="24" height="30" fill="#2DD4C4" stroke="#0B7A6E"/>
          <rect x="42" y="25" width="24" height="60" fill="#2DD4C4" stroke="#0B7A6E"/>
          <rect x="66" y="40" width="24" height="45" fill="#2DD4C4" stroke="#0B7A6E"/>
          <rect x="90" y="70" width="24" height="15" fill="#2DD4C4" stroke="#0B7A6E"/>
        </svg>
        <span>Histogramme (variable continue, classes jointives)</span>
      </div>
    </div>
    <div class="key-point">
      <span class="eyebrow">Ne pas confondre bâtons et histogramme</span>
      Le diagramme en bâtons laisse un espace entre les barres (valeurs isolées, discrètes) ; l'histogramme a des barres jointives (classes continues qui se touchent). Utiliser l'un pour l'autre trahit une confusion sur le type de variable.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'espace entre les barres d'un diagramme en bâtons n'est pas un simple choix esthétique : il signale visuellement que les valeurs intermédiaires (comme 1,5 enfant) n'ont pas de sens pour une variable discrète. En quoi l'absence de cet espace dans un histogramme traduit-elle, à l'inverse, le fait qu'une variable continue peut prendre n'importe quelle valeur intermédiaire au sein d'une classe ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>L'héritage de Playfair trouva une application spectaculaire et vitale une génération plus tard : en 1858, l'infirmière britannique Florence Nightingale, également statisticienne reconnue, créa un diagramme original (le « diagramme en rose » ou coxcomb) pour convaincre le gouvernement britannique que la majorité des soldats morts pendant la guerre de Crimée avaient succombé à des maladies évitables dues à l'insalubrité des hôpitaux militaires, plutôt qu'à leurs blessures de combat. Ce graphique, d'une force de persuasion bien supérieure à un tableau de chiffres équivalent, contribua directement à des réformes sanitaires qui sauvèrent des milliers de vies — une démonstration précoce et frappante du pouvoir de la visualisation de données bien conçue.</p>
    <p><strong>Question ouverte :</strong> comment distinguer, face à un graphique inconnu, une visualisation honnête d'une visualisation trompeuse qui exagérerait ou minimiserait volontairement une tendance par un choix d'échelle ou de graphique inapproprié ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>tableaux de bord interactifs</strong> modernes (dashboards), construits avec des bibliothèques comme D3.js ou des outils comme Tableau, permettent aujourd'hui de combiner plusieurs graphiques liés entre eux et actualisés en temps réel, prolongeant à l'échelle du big data l'intuition originelle de Playfair sur le pouvoir de l'image pour communiquer une information chiffrée.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Données brutes → tableau statistique (effectifs nᵢ, fréquences fᵢ=nᵢ/n, cumulés Nᵢ et Fᵢ) → si variable continue : regroupement en classes avec centre de classe → choix du graphique selon le type (bâtons/camembert pour qualitatif ou discret, histogramme/polygone pour continu en classes)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$f_i = \\dfrac{n_i}{n}, \\qquad \\sum_i f_i = 1$$
      Cette relation, apparemment triviale, est le fil conducteur de tout tableau statistique : les fréquences résument proportionnellement l'information de l'effectif brut, et leur somme qui vaut toujours 1 constitue un test de cohérence immédiat pour vérifier qu'aucune catégorie n'a été omise ou comptée en double.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si William Playfair n'avait jamais osé publier ses graphiques novateurs, craignant le scepticisme de ses contemporains habitués aux tableaux de chiffres : combien de temps la visualisation statistique aurait-elle mis à s'imposer comme un outil scientifique légitime ?</li>
        <li>Pourquoi le choix entre diagramme circulaire et diagramme en bâtons dépend-il davantage du nombre de catégories à comparer que du simple type qualitatif de la variable ?</li>
        <li>Quelle serait la conséquence, pour une décision de santé publique aujourd'hui, d'une présentation de données épidémiologiques aussi confuse que les tableaux de chiffres que Florence Nightingale cherchait justement à remplacer par son diagramme en rose ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>W. Playfair, <em>The Commercial and Political Atlas</em>, 1786 — l'ouvrage inventant le diagramme en bâtons.</li>
        <li>F. Nightingale, « Mortality of the British Army », 1858 — le rapport contenant le célèbre diagramme en rose sur la mortalité pendant la guerre de Crimée.</li>
        <li>E. Tufte, <em>The Visual Display of Quantitative Information</em>, Graphics Press — référence moderne de référence sur la construction rigoureuse de graphiques statistiques.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais construire un tableau statistique complet et choisir, sans hésitation, le graphique adapté à chaque type de variable. Le chapitre suivant, « Caractéristiques de tendance centrale », ira plus loin en résumant une série entière par un seul nombre représentatif — la moyenne, la médiane ou le mode. Comme le montre le diagramme en rose de Florence Nightingale : un graphique bien conçu ne se contente pas d'illustrer une donnée, il peut littéralement changer une politique publique et sauver des vies.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Tableau statistique : effectifs $n_i$, fréquences $f_i=n_i/n$, cumulés $N_i$ et $F_i$</li>
        <li>Variable continue → regroupement en classes, centre de classe comme valeur représentative</li>
        <li>Diagramme en bâtons / à bandes / camembert pour du qualitatif ou du discret ; histogramme / polygone pour du continu en classes</li>
        <li>Bâtons espacés (discret) ≠ histogramme à barres jointives (continu)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Tracer un histogramme (barres jointives) pour une variable discrète (qui demande des bâtons espacés)</li>
        <li>Oublier de vérifier que les fréquences cumulées atteignent bien 1 (ou 100%) à la fin du tableau</li>
        <li>Utiliser un camembert pour une variable quantitative continue</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une série a pour effectifs 8, 15, 12, 5 (total 40). Quelle est la fréquence de la valeur ayant un effectif de 12 ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e2_1" value="wrong"> 0,12</label>
          <label class="option"><input type="radio" name="stat_e2_1" value="right"> 0,30</label>
          <label class="option"><input type="radio" name="stat_e2_1" value="wrong"> 0,40</label>
          <label class="option"><input type="radio" name="stat_e2_1" value="wrong"> 1,2</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e2_1','stat_e2_fb1','Correct — f = 12/40 = 0,30.','La fréquence est l\\'effectif divisé par l\\'effectif TOTAL (40), pas par un autre effectif.')">Vérifier</button>
        <div class="feedback" id="stat_e2_fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quel graphique convient pour représenter la répartition des tailles (en cm) d'un groupe, regroupées en classes de 10 cm ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e2_2" value="wrong"> Diagramme en bâtons</label>
          <label class="option"><input type="radio" name="stat_e2_2" value="wrong"> Diagramme circulaire</label>
          <label class="option"><input type="radio" name="stat_e2_2" value="right"> Histogramme</label>
          <label class="option"><input type="radio" name="stat_e2_2" value="wrong"> Aucun graphique n'est adapté</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e2_2','stat_e2_fb2','Correct — une variable continue regroupée en classes se représente avec un histogramme (barres jointives).','La taille est une variable continue, regroupée en classes : quel graphique du cours est réservé à ce cas ?')">Vérifier</button>
        <div class="feedback" id="stat_e2_fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour la classe [20,30[, quel est le centre de classe ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e2_3" value="wrong"> 20</label>
          <label class="option"><input type="radio" name="stat_e2_3" value="wrong"> 30</label>
          <label class="option"><input type="radio" name="stat_e2_3" value="right"> 25</label>
          <label class="option"><input type="radio" name="stat_e2_3" value="wrong"> 10</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e2_3','stat_e2_fb3','Correct — le centre de classe est (20+30)/2 = 25.','Le centre de classe est la moyenne des deux bornes de la classe.')">Vérifier</button>
        <div class="feedback" id="stat_e2_fb3"></div>
      </div>
    </div>
  `
};

STAT_NOVA_KB[statKey('Organisation et représentation des séries à une variable')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Organisation et représentation des séries à une variable ». Demande-moi comment construire un tableau ou choisir un graphique, ou demande un indice sur un exercice.",
  rules: [
    { test:/fréquence|effectif/i, replies:[
      "La fréquence fᵢ = nᵢ/n (effectif de la valeur divisé par l'effectif TOTAL). Les cumulés (Nᵢ, Fᵢ) s'obtiennent en additionnant progressivement les effectifs ou fréquences des valeurs précédentes."
    ]},
    { test:/classe|centre de classe/i, replies:[
      "Pour une variable continue, on regroupe en classes [e_{i-1}, e_i[, et le centre de classe (moyenne des deux bornes) sert de valeur représentative pour les calculs."
    ]},
    { test:/histogramme|bâtons|camembert|graphique/i, replies:[
      "Bâtons (espacés) pour du discret ou du qualitatif ; histogramme (barres jointives) pour du continu en classes ; camembert pour du qualitatif seulement. Ne mélange pas les deux familles !"
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : la fréquence se calcule en divisant par l'effectif TOTAL, pas par un autre nombre.",
      "Indice niveau 2 : le total ici est 40, et l'effectif concerné est 12.",
      "Indice niveau 3 : f = 12/40 = 0,30."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : la taille est une variable continue, regroupée en classes.",
      "Indice niveau 2 : ce n'est ni un diagramme en bâtons (discret) ni un camembert (qualitatif).",
      "Indice niveau 3 : c'est un histogramme."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : le centre de classe est la moyenne des deux bornes.",
      "Indice niveau 2 : (20+30)/2 = ?",
      "Indice niveau 3 : le centre de classe est 25."
    ]}
  ]
};

/* =========================== CHAPITRE : Caractéristiques de tendance centrale =========================== */
STAT_CHAPTERS[statKey('Caractéristiques de tendance centrale')] = {
  objectives: [
    "Calculer la moyenne arithmétique d'une série simple ou groupée en classes",
    "Calculer une moyenne pondérée ou une moyenne d'un mélange de groupes",
    "Déterminer la médiane d'une série, discrète ou groupée en classes",
    "Déterminer le mode d'une série",
    "Choisir l'indicateur de tendance centrale le plus pertinent selon le contexte",
    "Évaluer en quoi le concept d'« homme moyen » de Quetelet, bien qu'utile pour résumer une population, peut masquer des réalités très différentes selon que l'on choisit la moyenne, la médiane ou le mode pour la décrire"
  ],
  prereqs: ["Organisation et représentation des séries à une variable"],
  bodyHtml: `
    <p>En 1835, l'astronome et statisticien belge Adolphe Quetelet popularisa un concept qui allait profondément marquer les sciences sociales : « l'homme moyen », une figure statistique abstraite censée représenter les caractéristiques centrales d'une population entière — sa taille moyenne, son poids moyen, ses comportements moyens. Cette idée, révolutionnaire pour son époque, permit pour la première fois de décrire quantitativement une société entière à travers un petit nombre d'indicateurs résumés, posant les bases de ce que tu vas calculer dans ce chapitre : moyenne, médiane et mode.</p>
    <p>Mais réduire une population entière à un seul indicateur central comporte un risque bien réel, que Quetelet lui-même n'avait pas pleinement anticipé : deux distributions très différentes (l'une parfaitement homogène, l'autre très étalée avec quelques valeurs extrêmes) peuvent partager exactement la même moyenne, masquant des réalités radicalement différentes. C'est précisément pour cette raison que ce chapitre insiste autant sur le choix judicieux entre moyenne, médiane et mode : un même jeu de données bien réel peut raconter une histoire trompeuse si l'on choisit le mauvais indicateur central.</p>
    <p>Une fois les données organisées, la première question est : autour de quelle valeur « typique » se regroupent-elles ? Trois indicateurs répondent à cette question, chacun avec ses forces et ses limites. À la fin de ce chapitre, tu sauras calculer moyenne, médiane et mode, et choisir judicieusement l'indicateur le plus pertinent selon le contexte.</p>

    <h3>1. La moyenne arithmétique</h3>
    <div class="formula-box">$$\\bar{x} = \\frac{1}{n}\\sum_i n_i x_i$$</div>
    <p>Pour une variable groupée en classes, on remplace $x_i$ par le centre de chaque classe.</p>

    <h3>2. Moyenne pondérée et moyenne de groupes</h3>
    <p>Si l'on dispose de plusieurs groupes de tailles $n_1, n_2, \\dots$ et de moyennes $\\bar{x}_1, \\bar{x}_2, \\dots$, la moyenne globale (moyenne « du mélange ») est une <strong>moyenne pondérée</strong> par les effectifs :</p>
    <div class="formula-box">$$\\bar{x} = \\frac{\\sum_j n_j \\bar{x}_j}{\\sum_j n_j}$$</div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une classe de 20 étudiants a une moyenne de 12, une autre de 30 étudiants a une moyenne de 14. Moyenne globale des 50 étudiants ?</p>
      <p class="example-answer">$\\bar{x} = \\dfrac{20\\times12 + 30\\times14}{20+30} = \\dfrac{240+420}{50} = \\dfrac{660}{50} = 13{,}2$.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">Piège classique</span>
      La moyenne globale n'est PAS la simple moyenne des deux moyennes (ici $(12+14)/2 = 13$, ce qui est faux) — sauf si les deux groupes ont exactement le même effectif. Il faut toujours pondérer par la taille de chaque groupe.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La moyenne globale de deux groupes de tailles très différentes se rapproche naturellement de la moyenne du groupe le plus grand, plutôt que de se situer à mi-chemin entre les deux moyennes. Pourquoi cette pondération par l'effectif est-elle la seule façon mathématiquement cohérente de combiner deux moyennes, plutôt qu'une simple moyenne arithmétique des deux valeurs ?
    </div>

    <h3>3. La médiane</h3>
    <p>La médiane $M_e$ partage la série en deux effectifs égaux : 50% des valeurs lui sont inférieures, 50% supérieures. Pour une série discrète triée par ordre croissant de $n$ valeurs : si $n$ est impair, $M_e$ est la valeur centrale (rang $\\frac{n+1}{2}$) ; si $n$ est pair, $M_e$ est la moyenne des deux valeurs centrales (rangs $\\frac{n}{2}$ et $\\frac{n}{2}+1$). Pour une série groupée en classes, on localise la classe médiane (celle où l'effectif cumulé atteint $n/2$) puis on interpole linéairement à l'intérieur de cette classe.</p>

    <h3>4. Le mode</h3>
    <p>Le mode est la valeur (ou, pour une variable continue, la classe) la plus fréquente. Une série peut être unimodale, bimodale, voire multimodale — contrairement à la moyenne et à la médiane, qui sont toujours uniques.</p>

    <h3>5. Que choisir ?</h3>
    <table class="mini-table">
      <tr><th>Indicateur</th><th>Point fort</th><th>Limite</th></tr>
      <tr><td>Moyenne</td><td>Utilise toute l'information numérique</td><td>Très sensible aux valeurs extrêmes</td></tr>
      <tr><td>Médiane</td><td>Robuste aux valeurs extrêmes</td><td>Ignore l'ampleur des écarts</td></tr>
      <tr><td>Mode</td><td>Seul indicateur utilisable sur du qualitatif</td><td>Peu informatif si la distribution est plate</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Exemple parlant</span>
      Sur les salaires d'une entreprise, un seul salaire très élevé (le PDG) peut fortement tirer la MOYENNE vers le haut, alors que la MÉDIANE reste représentative du salaire « typique » — c'est pourquoi les statistiques de revenus utilisent souvent la médiane plutôt que la moyenne.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le fait qu'un seul salaire extrême (celui du PDG) puisse fortement déplacer la moyenne, sans affecter la médiane, montre que ces deux indicateurs ne mesurent pas exactement la même chose : l'un résume la masse totale répartie également, l'autre résume la position centrale de la répartition. En quoi cette différence explique-t-elle pourquoi les statistiques officielles sur le niveau de vie utilisent presque toujours la médiane plutôt que la moyenne ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>En 1985, le paléontologue et essayiste Stephen Jay Gould, venant d'être diagnostiqué d'un mésothéliome (un cancer rare), apprit que la survie médiane des patients atteints de cette maladie n'était que de huit mois. Plutôt que de céder au désespoir, Gould mobilisa exactement les concepts de ce chapitre dans son essai devenu célèbre, « The Median Isn't the Message » : il comprit qu'une médiane de huit mois signifiait seulement que la moitié des patients survivaient moins longtemps — mais que l'autre moitié pouvait survivre bien plus longtemps, parfois des années, la distribution des durées de survie étant fortement asymétrique. Gould vécut finalement vingt années supplémentaires, et son essai reste aujourd'hui une référence sur l'importance de comprendre la forme entière d'une distribution, et pas seulement son indicateur central.</p>
    <p><strong>Question ouverte :</strong> face à une statistique médicale individuelle comme une médiane de survie, comment un patient (ou son médecin) peut-il évaluer concrètement où il se situe probablement dans la distribution, au-delà du seul chiffre central annoncé ?</p>
    <p><strong>Concept avancé :</strong> l'<strong>asymétrie d'une distribution</strong> (que tu approfondiras au chapitre suivant) explique pourquoi moyenne et médiane peuvent diverger fortement : dans une distribution étalée vers les valeurs élevées (comme certaines survies médicales ou les revenus), la moyenne est généralement tirée vers le haut par rapport à la médiane, ce qui rend cette dernière souvent plus représentative de la situation « typique ».</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Série de données → moyenne (utilise toute l'information, sensible aux extrêmes) → médiane (partage en deux effectifs égaux, robuste aux extrêmes) → mode (valeur la plus fréquente, seul indicateur valable en qualitatif) → choix selon le contexte et la forme de la distribution
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\bar{x} = \\dfrac{\\sum_j n_j \\bar{x}_j}{\\sum_j n_j}$$
      Cette formule de moyenne pondérée, souvent source d'erreur (piège classique de ce chapitre), rappelle une leçon plus générale valable bien au-delà de la statistique : combiner des informations de tailles différentes exige toujours de tenir compte de leur poids relatif, jamais de les traiter comme équivalentes par une simple moyenne arithmétique naïve.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Stephen Jay Gould n'avait pas eu de formation scientifique lui permettant de comprendre la différence entre médiane et distribution complète : comment aurait-il pu réagir différemment à l'annonce de son diagnostic ?</li>
        <li>Pourquoi une série de données peut-elle être bimodale (deux modes) alors qu'elle ne peut jamais avoir deux médianes ou deux moyennes différentes ?</li>
        <li>Quelle serait la conséquence, pour la communication des statistiques médicales au grand public, d'une présentation systématique de la seule médiane sans jamais évoquer la forme de la distribution complète ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>A. Quetelet, <em>Sur l'homme et le développement de ses facultés</em>, 1835 — l'ouvrage fondateur du concept d'« homme moyen » en statistique sociale.</li>
        <li>S. J. Gould, « The Median Isn't the Message », Discover Magazine, 1985 — l'essai devenu classique sur la distinction entre indicateur central et distribution complète.</li>
        <li>D. Freedman, R. Pisani, R. Purves, <em>Statistics</em>, W. W. Norton — référence pédagogique internationale sur les indicateurs de tendance centrale.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais calculer moyenne, médiane et mode, et choisir judicieusement l'indicateur le plus pertinent selon le contexte. Le chapitre suivant, « Caractéristiques de dispersion et de position », complètera cette description en mesurant non plus où se centre une série, mais à quel point ses valeurs sont dispersées autour de ce centre. Comme le montre l'histoire de Stephen Jay Gould : bien comprendre un indicateur statistique peut, dans les moments les plus difficiles, faire une différence considérable entre le désespoir et l'espoir fondé.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Moyenne arithmétique $\\bar x = \\frac{1}{n}\\sum n_ix_i$ ; moyenne pondérée pour combiner des groupes de tailles différentes</li>
        <li>Médiane = valeur qui partage la série en deux effectifs égaux (robuste aux valeurs extrêmes)</li>
        <li>Mode = valeur la plus fréquente (seul indicateur utilisable sur du qualitatif)</li>
        <li>La moyenne globale de plusieurs groupes n'est pas la moyenne simple des moyennes : il faut pondérer par les effectifs</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Faire la moyenne simple de plusieurs moyennes de groupes sans pondérer par leurs effectifs</li>
        <li>Oublier d'ordonner la série avant de chercher la médiane</li>
        <li>Utiliser la moyenne sur une distribution très asymétrique (quelques valeurs extrêmes) sans vérifier avec la médiane</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un groupe A de 10 étudiants a une moyenne de 8, un groupe B de 40 étudiants a une moyenne de 13. Quelle est la moyenne globale des 50 étudiants ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e3_1" value="wrong"> 10,5</label>
          <label class="option"><input type="radio" name="stat_e3_1" value="right"> 12</label>
          <label class="option"><input type="radio" name="stat_e3_1" value="wrong"> 13</label>
          <label class="option"><input type="radio" name="stat_e3_1" value="wrong"> 21</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e3_1','stat_e3_fb1','Correct — (10×8 + 40×13)/50 = (80+520)/50 = 600/50 = 12.','Pondère chaque moyenne par l\\'effectif de son groupe : ce n\\'est pas (8+13)/2.')">Vérifier</button>
        <div class="feedback" id="stat_e3_fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une série ordonnée de 6 valeurs a pour deux valeurs centrales 14 et 18. Quelle est la médiane ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e3_2" value="wrong"> 14</label>
          <label class="option"><input type="radio" name="stat_e3_2" value="wrong"> 18</label>
          <label class="option"><input type="radio" name="stat_e3_2" value="right"> 16</label>
          <label class="option"><input type="radio" name="stat_e3_2" value="wrong"> 32</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e3_2','stat_e3_fb2','Correct — pour un effectif pair, la médiane est la moyenne des deux valeurs centrales : (14+18)/2 = 16.','L\\'effectif est pair (6 valeurs) : la médiane est la MOYENNE des deux valeurs centrales, pas l\\'une des deux seule.')">Vérifier</button>
        <div class="feedback" id="stat_e3_fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour étudier le salaire « typique » d'une entreprise où un dirigeant gagne 20 fois plus que les autres employés, quel indicateur privilégier ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e3_3" value="wrong"> La moyenne</label>
          <label class="option"><input type="radio" name="stat_e3_3" value="right"> La médiane</label>
          <label class="option"><input type="radio" name="stat_e3_3" value="wrong"> Le mode uniquement</label>
          <label class="option"><input type="radio" name="stat_e3_3" value="wrong"> Cela n'a pas d'importance</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e3_3','stat_e3_fb3','Correct — la médiane est robuste aux valeurs extrêmes, contrairement à la moyenne qui serait fortement tirée vers le haut par ce seul salaire élevé.','Un salaire extrême va fortement influencer un indicateur en particulier : lequel des deux est justement conçu pour résister à ça ?')">Vérifier</button>
        <div class="feedback" id="stat_e3_fb3"></div>
      </div>
    </div>
  `
};

STAT_NOVA_KB[statKey('Caractéristiques de tendance centrale')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Caractéristiques de tendance centrale ». Demande-moi comment calculer une moyenne, une médiane, un mode, ou demande un indice sur un exercice.",
  rules: [
    { test:/moyenne pondérée|moyenne.*groupe/i, replies:[
      "Pour combiner plusieurs groupes, pondère chaque moyenne par l'effectif de son groupe : x̄ = (Σnⱼx̄ⱼ)/(Σnⱼ). Ce n'est PAS la moyenne simple des moyennes, sauf si les groupes ont exactement le même effectif."
    ]},
    { test:/médiane/i, replies:[
      "Trie d'abord la série. Effectif impair : la médiane est la valeur centrale. Effectif pair : c'est la moyenne des deux valeurs centrales. Pour des classes, on interpole dans la classe médiane."
    ]},
    { test:/mode/i, replies:[
      "Le mode est simplement la valeur (ou la classe) la plus fréquente. C'est le seul des trois indicateurs de tendance centrale qui a un sens sur une variable qualitative."
    ]},
    { test:/moyenne/i, replies:[
      "La moyenne arithmétique x̄ = (1/n)Σnᵢxᵢ utilise toute l'information numérique, mais elle est sensible aux valeurs extrêmes — pense à la comparer à la médiane si la distribution semble asymétrique."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pondère chaque moyenne de groupe par son effectif, ne fais pas une simple moyenne des deux moyennes.",
      "Indice niveau 2 : (10×8 + 40×13)/(10+40) = ?",
      "Indice niveau 3 : (80+520)/50 = 12."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : l'effectif est-il pair ou impair ?",
      "Indice niveau 2 : il est pair (6 valeurs), donc la médiane est la moyenne des deux valeurs centrales.",
      "Indice niveau 3 : (14+18)/2 = 16."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : quel indicateur résiste le mieux à une valeur extrême isolée ?",
      "Indice niveau 2 : la moyenne serait fortement tirée vers le haut par ce seul salaire élevé.",
      "Indice niveau 3 : c'est la médiane, plus robuste."
    ]}
  ]
};

/* =========================== CHAPITRE : Caractéristiques de dispersion et de position =========================== */
STAT_CHAPTERS[statKey('Caractéristiques de dispersion et de position')] = {
  objectives: [
    "Calculer l'étendue, la variance et l'écart-type d'une série statistique",
    "Utiliser la formule de König-Huygens pour calculer une variance efficacement",
    "Déterminer les quantiles (quartiles, déciles) d'une série",
    "Construire et interpréter une boîte à moustaches",
    "Comparer la dispersion de deux séries à l'aide de ces indicateurs",
    "Évaluer en quoi la philosophie de John Tukey — privilégier une lecture visuelle immédiate et des indicateurs robustes plutôt qu'un calcul unique et complexe — explique la popularité durable de la boîte à moustaches pour comparer rapidement la dispersion de plusieurs séries de données"
  ],
  prereqs: ["Caractéristiques de tendance centrale"],
  bodyHtml: `
    <p>En 1970, le statisticien américain John Tukey inventa la boîte à moustaches, dans le cadre d'un mouvement plus large qu'il baptisa l'« analyse exploratoire des données » (Exploratory Data Analysis). Tukey défendait une idée alors provocatrice pour la statistique académique de son époque : avant de se lancer dans des tests statistiques sophistiqués, il fallait d'abord <strong>regarder</strong> ses données, littéralement les visualiser, pour repérer intuitivement leur dispersion, leur asymétrie, leurs valeurs atypiques — la boîte à moustaches que tu vas construire dans ce chapitre condense en un seul petit dessin cinq nombres clés (minimum, premier quartile, médiane, troisième quartile, maximum) qui racontent déjà l'essentiel d'une distribution.</p>
    <p>Cette philosophie de Tukey — privilégier des indicateurs robustes et une lecture visuelle immédiate plutôt qu'un unique calcul complexe — explique pourquoi les quartiles et la boîte à moustaches restent aujourd'hui, plus d'un demi-siècle plus tard, l'un des outils les plus utilisés pour comparer rapidement la dispersion de plusieurs groupes de données, en médecine, en sciences sociales ou en contrôle qualité industriel.</p>
    <p>Deux séries peuvent avoir exactement la même moyenne tout en étant très différentes : l'une resserrée autour de cette valeur, l'autre très étalée. La dispersion mesure précisément cet étalement. À la fin de ce chapitre, tu sauras calculer variance, écart-type et quartiles, et construire une boîte à moustaches pour comparer visuellement la dispersion de plusieurs séries.</p>

    <h3>1. L'étendue</h3>
    <p>L'indicateur le plus simple : $\\text{étendue} = \\max(x_i) - \\min(x_i)$. Facile à calculer, mais très sensible aux valeurs extrêmes puisqu'il n'utilise que deux points de la série.</p>

    <h3>2. Variance et écart-type</h3>
    <div class="formula-box">$$V(X) = \\frac{1}{n}\\sum_i n_i (x_i - \\bar{x})^2 = \\left(\\frac{1}{n}\\sum_i n_i x_i^2\\right) - \\bar{x}^2, \\qquad \\sigma = \\sqrt{V(X)}$$</div>
    <div class="key-point">
      <span class="eyebrow">La formule de König-Huygens (à droite) : pourquoi elle est plus pratique</span>
      La première écriture demande de connaître $\\bar x$ puis de calculer $(x_i-\\bar x)^2$ pour chaque valeur. La seconde ne demande qu'un seul passage sur les données : la moyenne des carrés, moins le carré de la moyenne — beaucoup plus rapide, notamment à la main ou avec un tableur.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La formule de König-Huygens et la formule initiale de la variance donnent mathématiquement exactement le même résultat, mais l'une exige un seul passage sur les données quand l'autre en exige deux. En quoi ce type de reformulation — trouver une écriture équivalente mais plus efficace à calculer — est-il une compétence transversale utile bien au-delà du seul calcul de variance ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour une série, $\\bar x = 8$ et $\\frac{1}{n}\\sum n_ix_i^2 = 68$. Calculer $V(X)$ et $\\sigma$.</p>
      <p class="example-answer">$V(X) = 68 - 8^2 = 68-64 = 4$, donc $\\sigma = \\sqrt{4} = 2$.</p>
    </div>
    <p>On utilise aussi, plus rarement, l'<strong>écart moyen arithmétique</strong> $\\frac{1}{n}\\sum n_i|x_i-\\bar x|$ et l'<strong>écart médian</strong> (écart moyen calculé autour de la médiane plutôt que de la moyenne).</p>

    <h3>3. Les quantiles</h3>
    <p>Les <strong>quartiles</strong> ($Q_1$, $Q_2=$médiane, $Q_3$) partagent la série ordonnée en 4 parts égales d'effectif ; les <strong>déciles</strong> en 10 parts. On les obtient par la même méthode que la médiane : localiser le rang (ou la classe) correspondant à la fraction voulue de l'effectif total, puis interpoler si besoin.</p>
    <div class="formula-box">$$IQR = Q_3 - Q_1 \\quad (\\text{écart interquartile})$$</div>

    <h3>4. La boîte à moustaches</h3>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 80" width="100%">
          <line x1="10" y1="40" x2="150" y2="40" stroke="#5A6472" stroke-width="1"/>
          <line x1="20" y1="25" x2="20" y2="55" stroke="#5A6472" stroke-width="1.4"/>
          <line x1="20" y1="40" x2="45" y2="40" stroke="#5A6472" stroke-width="1.4"/>
          <rect x="45" y="20" width="50" height="40" fill="#4C7CFF" opacity="0.2" stroke="#1D3A9E" stroke-width="1.4"/>
          <line x1="70" y1="20" x2="70" y2="60" stroke="#1D3A9E" stroke-width="1.6"/>
          <line x1="95" y1="40" x2="135" y2="40" stroke="#5A6472" stroke-width="1.4"/>
          <line x1="135" y1="25" x2="135" y2="55" stroke="#5A6472" stroke-width="1.4"/>
          <text x="14" y="70" font-family="IBM Plex Mono" font-size="7" fill="#5A6472">min</text>
          <text x="42" y="70" font-family="IBM Plex Mono" font-size="7" fill="#5A6472">Q1</text>
          <text x="66" y="70" font-family="IBM Plex Mono" font-size="7" fill="#1D3A9E">Med</text>
          <text x="90" y="70" font-family="IBM Plex Mono" font-size="7" fill="#5A6472">Q3</text>
          <text x="128" y="70" font-family="IBM Plex Mono" font-size="7" fill="#5A6472">max</text>
        </svg>
        <span>Boîte à moustaches : min, Q1, médiane, Q3, max</span>
      </div>
    </div>
    <p>La boîte (de $Q_1$ à $Q_3$) contient 50% des valeurs centrales ; les moustaches s'étendent jusqu'au min et au max (ou jusqu'à une limite au-delà de laquelle les points sont considérés atypiques, selon la convention retenue). Une boîte large indique une forte dispersion centrale ; une boîte asymétrique par rapport à la médiane trahit une distribution asymétrique.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une boîte à moustaches asymétrique par rapport à la médiane (par exemple, une moustache gauche beaucoup plus longue que la droite) révèle une information sur la forme de la distribution que la moyenne et l'écart-type seuls ne montrent pas directement. En quoi cette capacité à révéler l'asymétrie d'un seul coup d'œil illustre-t-elle l'intuition de Tukey selon laquelle une bonne visualisation peut remplacer plusieurs calculs séparés ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La règle de détection des valeurs atypiques par l'écart interquartile — considérer comme atypique toute valeur située à plus de 1,5 fois l'IQR au-delà de Q1 ou Q3, une convention également proposée par Tukey — reste aujourd'hui l'une des méthodes les plus utilisées en science des données pour nettoyer automatiquement un jeu de données avant d'entraîner un modèle d'apprentissage automatique. Cette méthode, purement fondée sur les quartiles et robuste aux valeurs extrêmes elles-mêmes (contrairement à une détection fondée sur la moyenne et l'écart-type, qui seraient déjà faussés par ces mêmes valeurs extrêmes), s'applique désormais automatiquement à des jeux de données de plusieurs millions de lignes dans les pipelines de traitement de données modernes.</p>
    <p><strong>Question ouverte :</strong> une valeur détectée comme « atypique » par la règle de l'IQR est-elle nécessairement une erreur de mesure à supprimer, ou peut-elle parfois représenter une information légitime et précieuse qu'il serait dangereux d'écarter automatiquement ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>diagrammes en violon</strong> (violin plots), une évolution moderne de la boîte à moustaches, superposent à la boîte de Tukey une estimation continue de la densité de la distribution, combinant ainsi la lisibilité robuste de la boîte à moustaches avec une information plus fine sur la forme exacte de la distribution.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Série de données → étendue (simple, sensible aux extrêmes) → variance/écart-type (König-Huygens, utilisent toute l'information) → quartiles/déciles (position dans la série ordonnée) → boîte à moustaches (synthèse visuelle en 5 nombres : min, Q1, médiane, Q3, max)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$V(X) = \\left(\\dfrac{1}{n}\\sum_i n_i x_i^2\\right) - \\bar{x}^2$$
      La formule de König-Huygens, en réécrivant la variance comme « moyenne des carrés moins carré de la moyenne », illustre une leçon générale de la démarche scientifique : la même quantité peut souvent s'exprimer sous plusieurs formes mathématiquement équivalentes, dont certaines sont bien plus efficaces à calculer que d'autres.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si John Tukey n'avait jamais formalisé l'analyse exploratoire des données dans les années 1970 : la boîte à moustaches aurait-elle tout de même émergé, ou une autre méthode aurait-elle pris sa place pour synthétiser visuellement une distribution ?</li>
        <li>Pourquoi l'écart interquartile (Q3−Q1) est-il un indicateur de dispersion plus robuste aux valeurs extrêmes que l'étendue (max−min), alors que les deux mesurent une forme d'« étalement » de la série ?</li>
        <li>Quelle serait la conséquence, pour le nettoyage automatique de grands jeux de données en science des données, d'une absence de méthode de détection des valeurs atypiques fondée sur les quartiles plutôt que sur la moyenne ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. W. Tukey, <em>Exploratory Data Analysis</em>, Addison-Wesley, 1977 — l'ouvrage fondateur de la boîte à moustaches et de l'analyse exploratoire des données.</li>
        <li>D. Freedman, R. Pisani, R. Purves, <em>Statistics</em>, W. W. Norton — référence pédagogique internationale sur la dispersion et les quantiles.</li>
        <li>H. Wickham, <em>ggplot2: Elegant Graphics for Data Analysis</em>, Springer — sur les évolutions modernes de la visualisation de distributions, dont les diagrammes en violon.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais calculer variance, écart-type et quartiles, et construire une boîte à moustaches pour comparer visuellement la dispersion de plusieurs séries. Le chapitre suivant, « Caractéristiques de forme et transformation des données », complètera cette description en mesurant précisément l'asymétrie qu'une boîte à moustaches ne fait que suggérer visuellement. Comme le montre l'héritage de John Tukey : parfois, la meilleure façon de comprendre un jeu de données n'est pas un calcul supplémentaire, mais un dessin suffisamment bien pensé pour révéler d'un seul coup d'œil ce que des colonnes de chiffres dissimuleraient.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Étendue = max − min (simple mais sensible aux extrêmes)</li>
        <li>Variance (König-Huygens) $V(X) = \\frac{1}{n}\\sum n_ix_i^2 - \\bar x^2$ ; écart-type $\\sigma=\\sqrt{V(X)}$</li>
        <li>Quartiles/déciles = mêmes méthodes que la médiane, pour d'autres fractions de l'effectif</li>
        <li>Boîte à moustaches = min, Q1, médiane, Q3, max — lecture rapide de la dispersion et de l'asymétrie</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de mettre au carré l'écart-type pour retrouver la variance (ou l'inverse)</li>
        <li>Confondre écart interquartile (Q3−Q1) et étendue (max−min)</li>
        <li>Calculer $\\bar x^2$ en élevant chaque $x_i$ au carré avant de moyenner, au lieu de mettre au carré la moyenne elle-même</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une série a $\\bar x = 5$ et $\\frac{1}{n}\\sum n_ix_i^2 = 34$. Quel est son écart-type ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e4_1" value="wrong"> 34</label>
          <label class="option"><input type="radio" name="stat_e4_1" value="wrong"> 9</label>
          <label class="option"><input type="radio" name="stat_e4_1" value="right"> 3</label>
          <label class="option"><input type="radio" name="stat_e4_1" value="wrong"> 29</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e4_1','stat_e4_fb1','Correct — V(X) = 34 - 5² = 34-25 = 9, donc σ = √9 = 3.','D\\'abord la variance (34 - 5²), puis prends sa racine carrée pour l\\'écart-type.')">Vérifier</button>
        <div class="feedback" id="stat_e4_fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une série a $Q_1=12$ et $Q_3=20$. Quel est son écart interquartile ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e4_2" value="wrong"> 32</label>
          <label class="option"><input type="radio" name="stat_e4_2" value="wrong"> 16</label>
          <label class="option"><input type="radio" name="stat_e4_2" value="right"> 8</label>
          <label class="option"><input type="radio" name="stat_e4_2" value="wrong"> 6</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e4_2','stat_e4_fb2','Correct — IQR = Q3 - Q1 = 20 - 12 = 8.','L\\'écart interquartile est simplement Q3 moins Q1.')">Vérifier</button>
        <div class="feedback" id="stat_e4_fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Sur une boîte à moustaches, que représente la largeur de la boîte (entre Q1 et Q3) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e4_3" value="wrong"> Toute la série</label>
          <label class="option"><input type="radio" name="stat_e4_3" value="right"> Les 50% de valeurs centrales</label>
          <label class="option"><input type="radio" name="stat_e4_3" value="wrong"> Seulement la médiane</label>
          <label class="option"><input type="radio" name="stat_e4_3" value="wrong"> Les valeurs atypiques</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e4_3','stat_e4_fb3','Correct — la boîte va de Q1 à Q3, ce qui contient exactement 50% des valeurs, centrées autour de la médiane.','Q1 et Q3 délimitent quelle proportion de l\\'effectif total, par définition des quartiles ?')">Vérifier</button>
        <div class="feedback" id="stat_e4_fb3"></div>
      </div>
    </div>
  `
};

STAT_NOVA_KB[statKey('Caractéristiques de dispersion et de position')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Caractéristiques de dispersion et de position ». Demande-moi comment calculer une variance, des quartiles, ou demande un indice sur un exercice.",
  rules: [
    { test:/variance|écart.type|k[oö]nig/i, replies:[
      "Utilise la formule de König-Huygens : V(X) = (1/n)Σnᵢxᵢ² - x̄² — la moyenne des carrés moins le carré de la moyenne. L'écart-type est simplement σ = √V(X)."
    ]},
    { test:/quartile|quantile|décile|interquartile/i, replies:[
      "Les quartiles se calculent comme la médiane, mais pour d'autres fractions de l'effectif (1/4, 3/4 au lieu de 1/2). L'écart interquartile IQR = Q3 - Q1 mesure la dispersion des 50% de valeurs centrales."
    ]},
    { test:/boîte à moustaches|box.?plot/i, replies:[
      "La boîte va de Q1 à Q3 (50% des valeurs centrales), avec la médiane marquée dedans, et les moustaches vers le min et le max — pratique pour comparer plusieurs séries d'un coup d'œil."
    ]},
    { test:/étendue/i, replies:[
      "L'étendue est simplement max - min : facile à calculer, mais très sensible à une seule valeur extrême puisqu'elle n'utilise que deux points de la série."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : calcule d'abord la variance avec König-Huygens.",
      "Indice niveau 2 : V(X) = 34 - 5² = 9.",
      "Indice niveau 3 : σ = √9 = 3."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : l'écart interquartile est juste une soustraction.",
      "Indice niveau 2 : IQR = Q3 - Q1.",
      "Indice niveau 3 : 20 - 12 = 8."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : par définition, entre quelles fractions de l'effectif se situent Q1 et Q3 ?",
      "Indice niveau 2 : Q1 est au 1er quart, Q3 au 3e quart de l'effectif.",
      "Indice niveau 3 : la boîte contient donc les 50% de valeurs centrales."
    ]}
  ]
};

/* =========================== CHAPITRE : Caractéristiques de forme et transformation des données =========================== */
STAT_CHAPTERS[statKey('Caractéristiques de forme et transformation des données')] = {
  objectives: [
    "Utiliser le coefficient de variation pour comparer la dispersion relative de deux séries",
    "Interpréter le signe d'un coefficient d'asymétrie (Fisher, Pearson, Yule)",
    "Interpréter un coefficient d'aplatissement par rapport à la loi normale",
    "Appliquer un changement d'origine et/ou d'unité à une série statistique",
    "Prévoir l'effet d'une transformation linéaire sur la moyenne et la variance",
    "Évaluer en quoi la quête de Karl Pearson pour quantifier l'asymétrie et l'aplatissement d'une distribution biologique a fourni des outils permettant de détecter, au-delà du hasard le plus simple représenté par la loi normale, des phénomènes structurés dans des données économiques, biologiques ou physiques"
  ],
  prereqs: ["Caractéristiques de dispersion et de position"],
  bodyHtml: `
    <p>À la fin du XIXe siècle, le statisticien britannique Karl Pearson, pionnier de la biométrie, chercha à quantifier une observation qu'il avait faite sur des mesures biologiques (tailles de crabes, mesures anatomiques humaines) : certaines distributions, loin d'être parfaitement symétriques comme la courbe en cloche idéale, penchaient nettement d'un côté ou de l'autre. Pearson inventa ainsi, dans les années 1890, les premiers coefficients d'asymétrie et d'aplatissement — des outils que Ronald Fisher perfectionna quelques décennies plus tard avec les formules qui portent aujourd'hui son nom, et que tu vas utiliser dans ce chapitre.</p>
    <p>Cette quête de Pearson pour mesurer précisément la forme d'une distribution, au-delà de son seul centre et de sa dispersion, répondait à un enjeu scientifique bien réel : la loi normale (la fameuse courbe en cloche) est si souvent utilisée comme référence en statistique que s'écarter significativement de sa symétrie ou de son aplatissement caractéristique est en soi une information précieuse, révélant par exemple un phénomène biologique, économique ou physique qui ne suit pas les lois du hasard le plus simple.</p>
    <p>Au-delà du centre et de l'étalement d'une série, sa <strong>forme</strong> — symétrique ou non, pointue ou aplatie — apporte une information complémentaire, souvent visible sur un histogramme mais qu'on peut aussi mesurer précisément. À la fin de ce chapitre, tu sauras interpréter l'asymétrie et l'aplatissement d'une distribution, et prévoir précisément l'effet d'une transformation linéaire sur ses paramètres.</p>

    <h3>1. Le coefficient de variation</h3>
    <div class="formula-box">$$CV = \\frac{\\sigma}{\\bar{x}}$$</div>
    <p>Comparer directement deux écarts-types n'a de sens que si les séries sont sur la même échelle. Le $CV$ (souvent exprimé en %) normalise la dispersion par la moyenne, ce qui permet de comparer la dispersion relative de séries d'unités ou d'échelles différentes (par exemple, la variabilité des salaires face à celle des tailles).</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Comparer directement deux écarts-types de séries d'échelles très différentes (par exemple des salaires en milliers d'euros et des tailles en centimètres) n'a pas de sens, même si les deux nombres sont mathématiquement calculables. En quoi le coefficient de variation, en divisant l'écart-type par la moyenne, résout-il ce problème en éliminant l'unité de mesure elle-même ?
    </div>

    <h3>2. Moments et coefficients d'asymétrie</h3>
    <p>Le <strong>moment centré d'ordre $k$</strong> est $m_k = \\frac{1}{n}\\sum n_i(x_i-\\bar x)^k$ (ainsi $m_2 = V(X)$). Les coefficients d'asymétrie s'appuient sur $m_3$ :</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 80" width="100%">
          <path d="M10,70 Q50,5 70,70 Q90,5 130,70" fill="none" stroke="#4C7CFF" stroke-width="2"/>
        </svg>
        <span>Distribution symétrique (coefficient ≈ 0)</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 140 80" width="100%">
          <path d="M10,70 Q25,10 45,68 Q90,74 130,72" fill="none" stroke="#F0B94D" stroke-width="2"/>
        </svg>
        <span>Étalée à droite (coefficient positif)</span>
      </div>
    </div>
    <table class="mini-table">
      <tr><th>Signe du coefficient d'asymétrie</th><th>Interprétation</th></tr>
      <tr><td>≈ 0</td><td>Distribution à peu près symétrique</td></tr>
      <tr><td>&gt; 0</td><td>Étalée vers la droite (queue de valeurs élevées)</td></tr>
      <tr><td>&lt; 0</td><td>Étalée vers la gauche (queue de valeurs faibles)</td></tr>
    </table>
    <p>Les coefficients de <strong>Fisher</strong>, de <strong>Pearson</strong> (basé sur l'écart moyenne−mode) et de <strong>Yule</strong> (basé sur les quartiles) donnent tous cette même lecture de tendance, avec des formules et une sensibilité aux valeurs extrêmes différentes.</p>

    <h3>3. Coefficients d'aplatissement (kurtosis)</h3>
    <p>Basés sur le moment d'ordre 4 ($m_4$), les coefficients d'aplatissement de Fisher et de Pearson comparent le « pic » de la distribution à celui d'une distribution de référence (la loi normale) : une distribution plus pointue et à queues plus épaisses qu'une gaussienne est dite <strong>leptokurtique</strong>, une distribution plus aplatie est dite <strong>platikurtique</strong>.</p>

    <h3>4. Transformation des données : changement d'origine et d'unité</h3>
    <div class="key-point">
      <span class="eyebrow">Une propriété à retenir par cœur</span>
      Si $Y = aX + b$ (on change d'unité avec $a$, d'origine avec $b$), alors : $\\bar y = a\\bar x + b$ et $V(Y) = a^2 V(X)$. La variance ne « voit » pas le décalage $b$ — seul le changement d'échelle $a$ affecte la dispersion.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le décalage b d'une transformation Y=aX+b n'affecte jamais la variance, alors que le facteur multiplicatif a l'affecte au carré. En quoi ce résultat traduit-il une intuition géométrique simple : décaler toutes les valeurs d'une série ne change rien à leur dispersion relative les unes par rapport aux autres, alors que les « étirer » ou les « comprimer » la modifie nécessairement ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une série de températures en °C a pour moyenne $20$ et variance $9$. On convertit en °F avec $F = 1{,}8\\,C + 32$. Moyenne et variance en °F ?</p>
      <p class="example-answer">$\\bar F = 1{,}8\\times20+32 = 68$ ; $V(F) = 1{,}8^2\\times 9 = 3{,}24\\times9 = 29{,}16$.</p>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>L'asymétrie et l'aplatissement que tu apprends à mesurer dans ce chapitre sont devenus des outils centraux de la gestion des risques financiers modernes : les rendements des marchés financiers présentent typiquement une asymétrie négative (des baisses brutales occasionnelles plus fréquentes que ne le prédirait une distribution symétrique) et un aplatissement élevé (des événements extrêmes, les fameux « cygnes noirs », plus fréquents qu'une loi normale ne le suggérerait). Ignorer ces caractéristiques de forme, en modélisant naïvement les marchés financiers par une simple loi normale symétrique, a été identifié comme l'une des causes de sous-estimation des risques lors de la crise financière de 2008.</p>
    <p><strong>Question ouverte :</strong> si la distribution réelle des rendements financiers s'écarte systématiquement de la loi normale, quels modèles statistiques alternatifs les institutions financières utilisent-elles aujourd'hui pour mieux anticiper les événements extrêmes ?</p>
    <p><strong>Technologie émergente :</strong> les techniques de <strong>transformation des données</strong> (transformation logarithmique, transformation de Box-Cox), qui prolongent directement le changement d'origine et d'unité étudié dans ce chapitre, sont couramment utilisées en science des données pour réduire l'asymétrie d'une variable avant d'appliquer des modèles statistiques qui supposent, eux, une distribution proche de la loi normale.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Série de données → coefficient de variation (dispersion relative, comparable entre échelles) → coefficient d'asymétrie (signe et intensité de la déviation par rapport à la symétrie) → coefficient d'aplatissement (comparaison du pic à la loi normale) → transformation linéaire Y=aX+b si besoin de changer d'échelle ou d'origine
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\bar{y} = a\\bar{x}+b, \\qquad V(Y) = a^2 V(X)$$
      Cette double relation, apparemment simple, résume l'essentiel des transformations linéaires de données : la moyenne suit fidèlement le décalage et l'échelle appliqués, tandis que la variance, elle, ne « voit » jamais le décalage $b$ — seule l'échelle $a$ (au carré) modifie la dispersion, une distinction essentielle pour convertir correctement des statistiques d'une unité à une autre.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Karl Pearson n'avait jamais entrepris ses travaux de biométrie sur les mesures animales et humaines dans les années 1890 : les coefficients d'asymétrie et d'aplatissement auraient-ils émergé aussi tôt dans l'histoire de la statistique ?</li>
        <li>Pourquoi une distribution leptokurtique (plus pointue et à queues plus épaisses qu'une gaussienne) est-elle particulièrement préoccupante en gestion des risques financiers, même si sa moyenne et sa variance semblent rassurantes ?</li>
        <li>Quelle serait la conséquence, pour la gestion des risques financiers, d'une modélisation systématique des marchés par une simple loi normale symétrique, ignorant l'asymétrie et l'aplatissement réels des rendements ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>K. Pearson, « Contributions to the Mathematical Theory of Evolution », Philosophical Transactions of the Royal Society, 1895 — l'un des textes fondateurs des coefficients d'asymétrie et d'aplatissement.</li>
        <li>R. A. Fisher, <em>Statistical Methods for Research Workers</em>, Oliver & Boyd, 1925 — la formalisation moderne des coefficients de forme qui portent son nom.</li>
        <li>N. N. Taleb, <em>The Black Swan</em>, Random House — sur l'importance de l'asymétrie et de l'aplatissement dans la sous-estimation des risques financiers extrêmes.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais interpréter l'asymétrie et l'aplatissement d'une distribution, et prévoir précisément l'effet d'une transformation linéaire sur ses paramètres — clôturant ainsi l'étude d'une série à une seule variable. Le chapitre suivant, « Séries statistiques à deux variables », t'ouvrira à l'étude conjointe de deux caractères observés simultanément sur les mêmes individus. Comme le montre l'histoire de Pearson : mesurer précisément la forme d'une distribution, bien au-delà de son centre et de sa dispersion, peut révéler des phénomènes cachés — d'une évolution biologique à un risque financier caché.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Coefficient de variation $CV=\\sigma/\\bar x$ pour comparer la dispersion relative de séries d'échelles différentes</li>
        <li>Coefficient d'asymétrie : signe positif = étalé à droite, négatif = étalé à gauche, proche de 0 = symétrique</li>
        <li>Coefficient d'aplatissement : compare le pic de la distribution à celui d'une loi normale</li>
        <li>Si $Y=aX+b$ : $\\bar y = a\\bar x+b$ et $V(Y)=a^2V(X)$ (le décalage b n'affecte pas la variance)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier d'élever $a$ au carré dans le calcul de la nouvelle variance après transformation</li>
        <li>Confondre le signe de l'asymétrie avec le sens de la queue de la distribution</li>
        <li>Comparer directement deux écarts-types de séries d'échelles différentes sans passer par le coefficient de variation</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le coefficient d'asymétrie d'une série vaut -0,6. Que peut-on en dire ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e5_1" value="wrong"> La distribution est parfaitement symétrique</label>
          <label class="option"><input type="radio" name="stat_e5_1" value="right"> La distribution est étalée vers la gauche</label>
          <label class="option"><input type="radio" name="stat_e5_1" value="wrong"> La distribution est étalée vers la droite</label>
          <label class="option"><input type="radio" name="stat_e5_1" value="wrong"> Le calcul est impossible (signe négatif interdit)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e5_1','stat_e5_fb1','Correct — un coefficient d\\'asymétrie négatif indique une distribution étalée vers la gauche (queue de valeurs faibles).','Rappelle-toi : signe négatif = queue vers la gauche, signe positif = queue vers la droite.')">Vérifier</button>
        <div class="feedback" id="stat_e5_fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une série a $\\bar x=50$, $V(X)=16$. On applique $Y=2X-10$. Quelle est la variance de Y ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e5_2" value="wrong"> 6</label>
          <label class="option"><input type="radio" name="stat_e5_2" value="wrong"> 32</label>
          <label class="option"><input type="radio" name="stat_e5_2" value="right"> 64</label>
          <label class="option"><input type="radio" name="stat_e5_2" value="wrong"> 22</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e5_2','stat_e5_fb2','Correct — V(Y) = a²V(X) = 2² × 16 = 64. Le -10 (décalage) n\\'affecte pas la variance.','V(Y) = a²V(X), où a est le coefficient multiplicatif (ici 2), pas le terme constant (-10).')">Vérifier</button>
        <div class="feedback" id="stat_e5_fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Deux séries ont respectivement (moyenne=100, écart-type=10) et (moyenne=5, écart-type=2). Laquelle est relativement la plus dispersée ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e5_3" value="wrong"> La première (écart-type 10 > 2)</label>
          <label class="option"><input type="radio" name="stat_e5_3" value="right"> La seconde (CV plus élevé)</label>
          <label class="option"><input type="radio" name="stat_e5_3" value="wrong"> Les deux sont identiques</label>
          <label class="option"><input type="radio" name="stat_e5_3" value="wrong"> On ne peut pas comparer deux séries différentes</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e5_3','stat_e5_fb3','Correct — CV1 = 10/100 = 0,10 et CV2 = 2/5 = 0,40 : la seconde série est relativement bien plus dispersée, malgré un écart-type brut plus faible.','Compare les coefficients de variation (σ/x̄), pas les écarts-types bruts qui ne sont pas sur la même échelle.')">Vérifier</button>
        <div class="feedback" id="stat_e5_fb3"></div>
      </div>
    </div>
  `
};

STAT_NOVA_KB[statKey('Caractéristiques de forme et transformation des données')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Caractéristiques de forme et transformation des données ». Demande-moi le sens d'un coefficient d'asymétrie, l'effet d'une transformation, ou un indice sur un exercice.",
  rules: [
    { test:/coefficient de variation|\bcv\b/i, replies:[
      "Le coefficient de variation CV = σ/x̄ normalise la dispersion par la moyenne : il permet de comparer la dispersion RELATIVE de séries d'échelles ou d'unités différentes, contrairement à une comparaison directe des écarts-types."
    ]},
    { test:/asymétrie|fisher|pearson|yule/i, replies:[
      "Signe positif : distribution étalée à droite (queue de valeurs élevées). Signe négatif : étalée à gauche. Proche de 0 : à peu près symétrique. Fisher, Pearson et Yule donnent la même lecture avec des formules différentes."
    ]},
    { test:/aplatissement|kurtosis/i, replies:[
      "Le coefficient d'aplatissement compare le pic de ta distribution à celui d'une loi normale : plus pointu et à queues épaisses = leptokurtique, plus plat = platikurtique."
    ]},
    { test:/transformation|changement d'origine|changement d'unité/i, replies:[
      "Si Y = aX + b : la moyenne suit la transformation entière (ȳ = ax̄+b), mais la variance ne voit que le facteur multiplicatif : V(Y) = a²V(X). Le décalage b n'affecte jamais la variance."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : rappelle-toi le lien entre le signe du coefficient et le sens de la queue de la distribution.",
      "Indice niveau 2 : un coefficient négatif correspond à une queue vers la gauche.",
      "Indice niveau 3 : la distribution est donc étalée vers la gauche."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : utilise V(Y) = a²V(X), en identifiant bien qui est 'a' dans Y=2X-10.",
      "Indice niveau 2 : ici a=2 (le -10 ne compte pas pour la variance).",
      "Indice niveau 3 : V(Y) = 2² × 16 = 64."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : ne compare pas les écarts-types bruts, calcule le CV de chaque série.",
      "Indice niveau 2 : CV1 = 10/100 = 0,10 ; CV2 = 2/5 = 0,40.",
      "Indice niveau 3 : la seconde série a le CV le plus élevé, donc la dispersion relative la plus forte."
    ]}
  ]
};

/* =========================== CHAPITRE : Séries statistiques à deux variables =========================== */
STAT_CHAPTERS[statKey('Séries statistiques à deux variables')] = {
  objectives: [
    "Construire un tableau croisé à double entrée pour deux variables",
    "Déterminer les distributions marginales d'un tableau croisé",
    "Déterminer une distribution conditionnelle et sa moyenne/variance conditionnelle",
    "Représenter un nuage de points pour deux variables quantitatives",
    "Distinguer indépendance apparente et liaison entre deux variables",
    "Évaluer en quoi la découverte de Galton sur la « régression vers la moyenne » illustre concrètement la différence essentielle entre une distribution marginale (la population entière) et une distribution conditionnelle (un sous-groupe précis)"
  ],
  prereqs: ["Caractéristiques de forme et transformation des données"],
  bodyHtml: `
    <p>En 1886, le scientifique britannique Francis Galton, cousin de Charles Darwin, étudia systématiquement la taille de centaines de parents et de leurs enfants adultes, en reportant chaque couple de mesures sur un graphique — inventant ainsi, sans le savoir encore sous ce nom, le nuage de points que tu vas utiliser dans ce chapitre. Galton observa un phénomène qui le surprit : les enfants de parents très grands avaient tendance à être un peu moins grands que leurs parents, et les enfants de parents petits un peu plus grands — un phénomène qu'il baptisa « régression vers la moyenne », donnant ainsi son nom à toute une famille de méthodes statistiques encore utilisées aujourd'hui.</p>
    <p>Cette découverte de Galton illustre parfaitement pourquoi ce chapitre insiste sur la distinction entre distribution marginale et distribution conditionnelle : la taille moyenne des enfants « en général » (distribution marginale) ne dit rien sur ce à quoi s'attendre pour les enfants de parents grands en particulier (distribution conditionnelle) — c'est précisément en comparant ces moyennes conditionnelles selon la taille des parents que Galton révéla son phénomène de régression vers la moyenne.</p>
    <p>Beaucoup de questions utiles portent sur la relation entre <strong>deux</strong> variables observées sur les mêmes individus : le revenu et l'âge, la publicité et les ventes, la note en maths et la note en physique. Ce chapitre pose le cadre pour décrire ce type de données, avant d'en mesurer la liaison au chapitre suivant. À la fin de ce chapitre, tu sauras construire un tableau croisé, distinguer distributions marginales et conditionnelles, et lire un nuage de points.</p>

    <h3>1. Le tableau croisé à double entrée</h3>
    <p>Pour deux variables $X$ (valeurs $x_1,\\dots,x_p$) et $Y$ (valeurs $y_1,\\dots,y_q$), on note $n_{ij}$ l'effectif des individus qui présentent à la fois $X=x_i$ et $Y=y_j$. L'ensemble de ces effectifs conjoints forme le tableau croisé.</p>
    <table class="mini-table">
      <tr><th></th><th>$y_1$</th><th>$y_2$</th><th>Total ligne</th></tr>
      <tr><td>$x_1$</td><td>$n_{11}$</td><td>$n_{12}$</td><td>$n_{1\\bullet}$</td></tr>
      <tr><td>$x_2$</td><td>$n_{21}$</td><td>$n_{22}$</td><td>$n_{2\\bullet}$</td></tr>
      <tr><td>Total colonne</td><td>$n_{\\bullet1}$</td><td>$n_{\\bullet2}$</td><td>$n$</td></tr>
    </table>

    <h3>2. Distributions marginales</h3>
    <p>La <strong>distribution marginale</strong> de $X$ s'obtient en sommant chaque ligne ($n_{i\\bullet} = \\sum_j n_{ij}$) : c'est la distribution de $X$ « seule », comme si on ignorait $Y$. On en tire une <strong>moyenne marginale</strong> $\\bar x$ et une <strong>variance marginale</strong> $V(X)$, calculées exactement comme au chapitre sur une seule variable. Même chose pour $Y$ en sommant les colonnes.</p>

    <h3>3. Distributions conditionnelles</h3>
    <p>La <strong>distribution conditionnelle</strong> de $Y$ sachant $X=x_i$ est donnée par la ligne $i$ du tableau (les effectifs $n_{i1}, n_{i2},\\dots$) : c'est la répartition de $Y$ <em>parmi les seuls individus</em> pour lesquels $X=x_i$. On en tire une <strong>moyenne conditionnelle</strong> $\\bar y_{|X=x_i}$ et une <strong>variance conditionnelle</strong>, propres à cette sous-population.</p>
    <div class="key-point">
      <span class="eyebrow">Marginal vs conditionnel : ne pas confondre</span>
      La distribution marginale décrit $Y$ pour <strong>tous</strong> les individus. La distribution conditionnelle décrit $Y$ pour un <strong>sous-groupe précis</strong> (ceux avec $X=x_i$). Si les moyennes conditionnelles de $Y$ varient beaucoup selon $x_i$, c'est un signe qu'il existe une liaison entre $X$ et $Y$.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si les moyennes conditionnelles de Y varient fortement selon la valeur de X, c'est un signe de liaison entre les deux variables — mais si elles restent quasiment identiques quelle que soit la valeur de X, cela suggère au contraire une indépendance apparente. Pourquoi cette comparaison des moyennes conditionnelles est-elle une première étape naturelle avant de calculer un indicateur de liaison plus formel comme la corrélation (chapitre suivant) ?
    </div>

    <h3>4. Le nuage de points</h3>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <line x1="15" y1="80" x2="15" y2="10" stroke="#5A6472" stroke-width="1"/>
          <line x1="15" y1="80" x2="130" y2="80" stroke="#5A6472" stroke-width="1"/>
          <circle cx="30" cy="65" r="2.5" fill="#4C7CFF"/>
          <circle cx="45" cy="55" r="2.5" fill="#4C7CFF"/>
          <circle cx="55" cy="50" r="2.5" fill="#4C7CFF"/>
          <circle cx="70" cy="40" r="2.5" fill="#4C7CFF"/>
          <circle cx="85" cy="35" r="2.5" fill="#4C7CFF"/>
          <circle cx="100" cy="25" r="2.5" fill="#4C7CFF"/>
          <circle cx="115" cy="20" r="2.5" fill="#4C7CFF"/>
        </svg>
        <span>Nuage de points : tendance linéaire visible</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <line x1="15" y1="80" x2="15" y2="10" stroke="#5A6472" stroke-width="1"/>
          <line x1="15" y1="80" x2="130" y2="80" stroke="#5A6472" stroke-width="1"/>
          <circle cx="30" cy="60" r="2.5" fill="#F0B94D"/>
          <circle cx="45" cy="30" r="2.5" fill="#F0B94D"/>
          <circle cx="55" cy="65" r="2.5" fill="#F0B94D"/>
          <circle cx="70" cy="25" r="2.5" fill="#F0B94D"/>
          <circle cx="85" cy="55" r="2.5" fill="#F0B94D"/>
          <circle cx="100" cy="45" r="2.5" fill="#F0B94D"/>
          <circle cx="115" cy="60" r="2.5" fill="#F0B94D"/>
        </svg>
        <span>Nuage de points : aucune tendance visible</span>
      </div>
    </div>
    <p>Pour deux variables quantitatives, le nuage de points (chaque individu = un point de coordonnées $(x_i,y_i)$) donne une première impression visuelle de la liaison, avant même tout calcul : tendance linéaire montante ou descendante, absence de structure, ou relation plus complexe (courbe).</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un nuage de points peut suggérer visuellement une tendance linéaire nette, alors qu'une relation plus complexe (en forme de courbe, par exemple) existe en réalité entre les deux variables. Pourquoi la seule observation visuelle d'un nuage de points, aussi utile soit-elle comme première impression, ne peut-elle jamais remplacer un calcul rigoureux de la nature exacte de la liaison ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Le phénomène de régression vers la moyenne découvert par Galton continue de piéger l'intuition, y compris dans des contextes très contemporains : en sport, on parle souvent du « syndrome de la deuxième année » (sophomore slump), où un athlète exceptionnel lors de sa première saison semble « décliner » l'année suivante — alors qu'il ne fait le plus souvent que revenir statistiquement vers son niveau moyen, sans qu'aucune baisse réelle de talent ne soit en cause. En médecine, ce même phénomène explique en partie pourquoi des traitements parfois inefficaces semblent « fonctionner » : les patients consultent généralement lorsque leurs symptômes sont à leur pire, et une amélioration naturelle vers la moyenne survient souvent, indépendamment du traitement reçu.</p>
    <p><strong>Question ouverte :</strong> comment les essais cliniques modernes se protègent-ils méthodologiquement contre le risque de confondre une régression vers la moyenne naturelle avec un véritable effet thérapeutique d'un traitement testé ?</p>
    <p><strong>Concept avancé :</strong> l'analyse des <strong>tableaux de contingence</strong>, une généralisation moderne du tableau croisé à double entrée de ce chapitre, permet aujourd'hui de tester statistiquement (via le test du khi-deux, développé par Karl Pearson en 1900) si deux variables qualitatives sont véritablement indépendantes ou significativement liées, au-delà de la simple observation visuelle des effectifs.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Deux variables observées sur les mêmes individus → tableau croisé (effectifs conjoints nᵢⱼ) → distributions marginales (chaque variable seule, en sommant lignes ou colonnes) → distributions conditionnelles (une variable, pour un sous-groupe fixé de l'autre) → nuage de points (première impression visuelle de la liaison, pour deux variables quantitatives)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$n_{i\\bullet} = \\sum_j n_{ij}, \\qquad n_{\\bullet j} = \\sum_i n_{ij}, \\qquad n = \\sum_{i,j} n_{ij}$$
      Ces trois relations, apparemment de simple comptabilité, définissent précisément la distinction entre marginal et conditionnel qui structure tout ce chapitre : sommer sur toutes les valeurs de l'une des deux variables « efface » son influence, révélant la distribution de l'autre variable prise isolément — l'opération inverse de la distribution conditionnelle, qui fixe au contraire une valeur précise.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Francis Galton n'avait jamais pensé à représenter graphiquement les tailles de parents et d'enfants sur un même graphique : la régression vers la moyenne aurait-elle pu être découverte par une autre voie, purement numérique ?</li>
        <li>Pourquoi la somme des effectifs marginaux d'une ligne (ou d'une colonne) doit-elle nécessairement redonner l'effectif total n du tableau croisé, quelle que soit la structure des données ?</li>
        <li>Quelle serait la conséquence, pour l'évaluation de l'efficacité d'un traitement médical, d'une confusion entre une amélioration due à la régression vers la moyenne et un véritable effet thérapeutique ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>F. Galton, « Regression Towards Mediocrity in Hereditary Stature », Journal of the Anthropological Institute, 1886 — l'article fondateur de la régression vers la moyenne.</li>
        <li>K. Pearson, « On the Criterion that a Given System of Deviations... », Philosophical Magazine, 1900 — l'article introduisant le test du khi-deux sur les tableaux de contingence.</li>
        <li>D. Freedman, R. Pisani, R. Purves, <em>Statistics</em>, W. W. Norton — référence pédagogique internationale sur les séries à deux variables.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais construire un tableau croisé, distinguer distributions marginales et conditionnelles, et lire un nuage de points. Le dernier chapitre de cette matière, « Corrélation, régression et corrélation de rang », transformera cette lecture visuelle intuitive en un calcul rigoureux de la force et de la nature du lien entre deux variables. Comme le montre l'histoire de Galton : une observation visuelle sur un simple graphique de tailles de parents et d'enfants peut, une fois correctement interprétée, révéler un phénomène statistique universel qui continue de piéger notre intuition plus d'un siècle plus tard.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Tableau croisé : effectifs conjoints $n_{ij}$ pour deux variables observées sur les mêmes individus</li>
        <li>Distribution marginale = distribution d'une variable seule (en sommant les lignes ou les colonnes)</li>
        <li>Distribution conditionnelle = distribution d'une variable pour un sous-groupe fixé de l'autre</li>
        <li>Un nuage de points donne une première lecture visuelle de la liaison entre deux variables quantitatives</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre distribution marginale (tous les individus) et conditionnelle (un sous-groupe seulement)</li>
        <li>Oublier que la somme des effectifs marginaux en ligne (ou en colonne) doit retomber sur l'effectif total n</li>
        <li>Conclure à une liaison forte à partir du seul nuage de points sans calcul (voir le chapitre suivant pour la mesurer précisément)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans un tableau croisé, comment obtient-on la distribution marginale de X ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e6_1" value="wrong"> En prenant une seule ligne du tableau</label>
          <label class="option"><input type="radio" name="stat_e6_1" value="right"> En sommant chaque ligne (total sur toutes les valeurs de Y)</label>
          <label class="option"><input type="radio" name="stat_e6_1" value="wrong"> En sommant chaque colonne</label>
          <label class="option"><input type="radio" name="stat_e6_1" value="wrong"> En divisant chaque effectif par n</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e6_1','stat_e6_fb1','Correct — sommer chaque ligne (sur toutes les colonnes) donne l\\'effectif marginal de chaque valeur de X, comme si Y n\\'existait pas.','La distribution marginale de X ignore Y : il faut donc additionner sur toutes les valeurs de Y, pour chaque ligne.')">Vérifier</button>
        <div class="feedback" id="stat_e6_fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Que décrit la distribution conditionnelle de Y sachant X=x1 ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e6_2" value="wrong"> La distribution de Y pour tous les individus</label>
          <label class="option"><input type="radio" name="stat_e6_2" value="right"> La distribution de Y uniquement parmi les individus où X=x1</label>
          <label class="option"><input type="radio" name="stat_e6_2" value="wrong"> La distribution de X pour tous les individus</label>
          <label class="option"><input type="radio" name="stat_e6_2" value="wrong"> La moyenne globale de Y</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e6_2','stat_e6_fb2','Correct — la distribution conditionnelle restreint l\\'analyse au sous-groupe défini par X=x1.','Le mot clé est \\'conditionnelle\\' : sous quelle CONDITION regarde-t-on la distribution de Y ?')">Vérifier</button>
        <div class="feedback" id="stat_e6_fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Sur un nuage de points, les points forment une tendance montante nette de la gauche vers la droite. Que peut-on suspecter ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e6_3" value="wrong"> Aucune relation entre X et Y</label>
          <label class="option"><input type="radio" name="stat_e6_3" value="right"> Une relation où Y augmente avec X</label>
          <label class="option"><input type="radio" name="stat_e6_3" value="wrong"> Une relation où Y diminue quand X augmente</label>
          <label class="option"><input type="radio" name="stat_e6_3" value="wrong"> Une erreur dans les données</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e6_3','stat_e6_fb3','Correct — une tendance montante suggère que Y a tendance à augmenter quand X augmente (à confirmer par un calcul de corrélation, vu au chapitre suivant).','Une tendance montante de gauche à droite signifie que Y et X évoluent dans quel sens l\\'un par rapport à l\\'autre ?')">Vérifier</button>
        <div class="feedback" id="stat_e6_fb3"></div>
      </div>
    </div>
  `
};

STAT_NOVA_KB[statKey('Séries statistiques à deux variables')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Séries statistiques à deux variables ». Demande-moi ce qu'est une distribution marginale ou conditionnelle, ou demande un indice sur un exercice.",
  rules: [
    { test:/marginale/i, replies:[
      "La distribution marginale de X s'obtient en sommant chaque ligne du tableau croisé (sur toutes les valeurs de Y) : c'est la distribution de X 'seule', comme si Y n'existait pas."
    ]},
    { test:/conditionnelle/i, replies:[
      "La distribution conditionnelle de Y sachant X=xi correspond à la ligne i du tableau : la distribution de Y uniquement parmi les individus qui ont X=xi, un sous-groupe précis."
    ]},
    { test:/nuage de points/i, replies:[
      "Le nuage de points donne une première impression visuelle : tendance montante, descendante, ou aucune structure apparente. C'est un point de départ — le chapitre suivant permet de chiffrer précisément cette liaison."
    ]},
    { test:/tableau crois[ée]/i, replies:[
      "Un tableau croisé donne les effectifs conjoints nᵢⱼ (nombre d'individus avec X=xi ET Y=yj à la fois) — c'est la base pour calculer distributions marginales et conditionnelles."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : la distribution marginale de X ignore complètement Y.",
      "Indice niveau 2 : il faut donc additionner sur toutes les valeurs de Y, pour chaque valeur de X.",
      "Indice niveau 3 : on somme chaque ligne du tableau croisé."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : le mot 'conditionnelle' indique une restriction à un sous-groupe.",
      "Indice niveau 2 : ce sous-groupe est défini par X=x1.",
      "Indice niveau 3 : c'est la distribution de Y uniquement parmi les individus où X=x1."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : une tendance montante signifie que les deux variables évoluent dans le même sens.",
      "Indice niveau 2 : quand X augmente, que fait Y sur un nuage montant ?",
      "Indice niveau 3 : Y augmente aussi — c'est une relation où Y augmente avec X."
    ]}
  ]
};

/* =========================== CHAPITRE : Corrélation, régression et corrélation de rang =========================== */
STAT_CHAPTERS[statKey('Corrélation, régression et corrélation de rang')] = {
  objectives: [
    "Calculer la covariance entre deux variables quantitatives",
    "Calculer et interpréter le coefficient de corrélation linéaire de Pearson",
    "Déterminer les coefficients d'une droite de régression linéaire par la méthode des moindres carrés",
    "Interpréter le coefficient de détermination et la décomposition de la variance",
    "Calculer et utiliser le coefficient de corrélation de rang de Spearman",
    "Évaluer en quoi la distinction rigoureuse entre corrélation et causalité, popularisée par de nombreux exemples de corrélations fallacieuses, reste l'un des garde-fous les plus importants dans l'interprétation de toute analyse statistique de liaison"
  ],
  prereqs: ["Séries statistiques à deux variables"],
  bodyHtml: `
    <p>Après avoir découvert le phénomène de régression vers la moyenne (chapitre précédent), Francis Galton chercha une façon de mesurer précisément la force du lien entre deux variables — mais c'est son collaborateur et disciple, le statisticien britannique Karl Pearson, qui donna en 1896 la formule mathématique rigoureuse du coefficient de corrélation que tu vas utiliser dans ce chapitre. Quelques années plus tard, en 1904, le psychologue britannique Charles Spearman, cherchant à comparer des classements de candidats plutôt que des mesures numériques précises, développa une variante fondée sur les rangs — la corrélation de Spearman, qui porte encore son nom aujourd'hui.</p>
    <p>Ces deux coefficients, Pearson et Spearman, restent aujourd'hui les deux outils statistiques les plus utilisés au monde pour quantifier une relation entre deux variables — en sciences, en économie, en médecine. Mais leur popularité s'accompagne d'un piège tout aussi célèbre, popularisé notamment par de nombreuses « corrélations fallacieuses » (comme la corrélation, réelle mais absurde, entre la consommation de margarine et le taux de divorce dans un État américain) : une corrélation, même parfaite, ne prouve jamais qu'une variable cause l'autre. « Corrélation n'est pas causalité » est devenu l'un des principes les plus répétés — et les plus souvent oubliés — de toute la statistique appliquée.</p>
    <p>Ce dernier chapitre chiffre précisément ce que le nuage de points ne fait que suggérer : la force, le sens, et la forme de la liaison entre deux variables. À la fin de ce chapitre, tu sauras calculer et interpréter un coefficient de corrélation, ajuster une droite de régression, et distinguer corrélation linéaire (Pearson) et corrélation de rang (Spearman).</p>

    <h3>1. La covariance</h3>
    <div class="formula-box">$$\\text{Cov}(X,Y) = \\frac{1}{n}\\sum_{i,j} n_{ij}\\,x_iy_j - \\bar x\\,\\bar y$$</div>
    <p>Cov$(X,Y) > 0$ : $X$ et $Y$ ont tendance à varier dans le même sens. Cov$(X,Y) < 0$ : elles varient en sens opposés. Mais la covariance dépend des unités de $X$ et $Y$, ce qui rend sa valeur brute difficile à interpréter seule — d'où le besoin de la normaliser.</p>

    <h3>2. Le coefficient de corrélation linéaire</h3>
    <div class="formula-box">$$r = \\frac{\\text{Cov}(X,Y)}{\\sigma_X\\,\\sigma_Y} \\in [-1,1]$$</div>
    <table class="mini-table">
      <tr><th>Valeur de $|r|$</th><th>Interprétation courante</th></tr>
      <tr><td>proche de 1</td><td>Liaison linéaire très forte</td></tr>
      <tr><td>autour de 0,5</td><td>Liaison linéaire modérée</td></tr>
      <tr><td>proche de 0</td><td>Pas de liaison linéaire décelable (mais une liaison non linéaire reste possible)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">r = 0 ne veut pas dire « pas de lien »</span>
      Le coefficient $r$ ne mesure que la liaison <strong>linéaire</strong>. Deux variables parfaitement liées par une relation en cloche ou en U peuvent très bien avoir $r \\approx 0$ : toujours regarder le nuage de points avant de conclure.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un coefficient de corrélation proche de 0 peut coexister avec une relation parfaitement déterministe entre deux variables, à condition que cette relation ne soit pas linéaire (une parabole, par exemple). Pourquoi cette limite du coefficient de Pearson — ne détecter que les liaisons linéaires — rend-elle indispensable de toujours examiner le nuage de points avant de se fier au seul calcul de r ?
    </div>

    <h3>3. La droite de régression (méthode des moindres carrés)</h3>
    <div class="formula-box">$$\\hat y = ax+b, \\qquad a = \\frac{\\text{Cov}(X,Y)}{V(X)}, \\qquad b = \\bar y - a\\bar x$$</div>
    <p>Cette droite minimise la somme des carrés des écarts entre les valeurs observées $y_i$ et les valeurs <strong>ajustées</strong> $\\hat y_i = ax_i+b$. Ces écarts $e_i = y_i - \\hat y_i$ sont les <strong>résidus</strong>.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> $\\bar x=10$, $\\bar y=20$, Cov$(X,Y)=8$, $V(X)=4$. Droite de régression de Y en X ?</p>
      <p class="example-answer">$a = 8/4 = 2$ ; $b = 20 - 2\\times10 = 0$ ; donc $\\hat y = 2x$.</p>
    </div>

    <h3>4. Coefficient de détermination et décomposition de la variance</h3>
    <div class="formula-box">$$V(Y) = \\underbrace{V(\\hat Y)}_{\\text{variance expliquée}} + \\underbrace{V(e)}_{\\text{variance résiduelle}}, \\qquad R^2 = \\frac{V(\\hat Y)}{V(Y)} = r^2 \\ \\text{(en régression simple)}$$</div>
    <p>$R^2$, compris entre 0 et 1, indique quelle proportion de la variance de $Y$ est « expliquée » par la relation linéaire avec $X$. Un $R^2$ proche de 1 signifie que les points sont presque parfaitement alignés sur la droite de régression.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Même un coefficient de détermination R² proche de 1, indiquant que X explique presque toute la variance de Y, ne prouve jamais que X cause Y. Peux-tu imaginer un exemple où deux variables seraient très fortement corrélées sans qu'aucune ne cause directement l'autre, toutes deux étant en réalité influencées par une même troisième variable cachée ?
    </div>

    <h3>5. La corrélation de rang de Spearman</h3>
    <div class="formula-box">$$r_s = 1 - \\frac{6\\sum_i d_i^2}{n(n^2-1)}$$</div>
    <p>où $d_i$ est la différence entre le rang de l'individu $i$ pour $X$ et son rang pour $Y$. On utilise $r_s$ plutôt que $r$ quand les variables sont ordinales (rangs, classements) ou quand on soupçonne une relation monotone mais pas nécessairement linéaire.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> 5 candidats sont classés par deux jurys, avec des différences de rang $d_i = 1, -1, 0, 2, -2$. Calculer $r_s$.</p>
      <p class="example-answer">$\\sum d_i^2 = 1+1+0+4+4 = 10$, donc $r_s = 1 - \\dfrac{6\\times10}{5(25-1)} = 1 - \\dfrac{60}{120} = 1 - 0{,}5 = 0{,}5$.</p>
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Le piège « corrélation n'est pas causalité » a pris une ampleur nouvelle à l'ère du big data : avec des jeux de données comportant des milliers de variables, il devient statistiquement presque inévitable de trouver, par pur hasard, des corrélations fortes et parfaitement absurdes entre des variables sans aucun lien logique — un phénomène que le site web humoristique « Spurious Correlations » de Tyler Vigen illustre avec des dizaines d'exemples réels et vérifiés. Établir une véritable causalité, au-delà d'une simple corrélation, exige des méthodes bien plus exigeantes que le calcul d'un coefficient r.</p>
    <p><strong>Question ouverte :</strong> lorsqu'une expérience contrôlée (randomisée) est impossible ou contraire à l'éthique — par exemple pour étudier l'effet du tabac sur la santé — quelles méthodes statistiques alternatives permettent malgré tout d'approcher une conclusion causale fiable ?</p>
    <p><strong>Technologie émergente :</strong> l'<strong>inférence causale</strong> moderne, à travers des méthodes comme les essais randomisés contrôlés (le standard de référence en médecine) ou les variables instrumentales (utilisées en économétrie quand la randomisation est impossible), fournit aujourd'hui un cadre rigoureux pour tenter d'établir une relation de cause à effet, là où la corrélation seule reste structurellement incapable de trancher.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Deux variables quantitatives → covariance (signe = sens de la liaison, mais dépend des unités) → corrélation r=Cov/(σXσY) (normalisée, entre -1 et 1) → droite de régression par moindres carrés (ŷ=ax+b) → R²=r² (part de variance expliquée) → Spearman rs si rangs ou relation monotone non linéaire
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$r = \\dfrac{\\text{Cov}(X,Y)}{\\sigma_X\\,\\sigma_Y}, \\qquad -1 \\le r \\le 1$$
      Ce coefficient, formalisé par Pearson à partir des intuitions de Galton, condense en un seul nombre normalisé la force et le sens d'une liaison linéaire entre deux variables — mais son interprétation exige toujours la prudence rappelée dans ce chapitre : un r élevé décrit une association statistique, jamais une preuve de causalité.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Pearson n'avait jamais formalisé mathématiquement l'intuition de corrélation de Galton en 1896 : combien de temps aurait-il fallu attendre avant qu'un coefficient de corrélation rigoureux ne soit disponible pour la recherche scientifique ?</li>
        <li>Pourquoi le coefficient de corrélation de Spearman reste-t-il valable même lorsque la relation entre X et Y est monotone mais fortement non linéaire (par exemple exponentielle), là où celui de Pearson perdrait de sa pertinence ?</li>
        <li>Quelle serait la conséquence, pour la recherche scientifique moderne confrontée à des jeux de données comportant des milliers de variables, d'une absence de vigilance face aux corrélations fallacieuses détectées par pur hasard ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>K. Pearson, « Mathematical Contributions to the Theory of Evolution III », Philosophical Transactions of the Royal Society, 1896 — l'article formalisant le coefficient de corrélation.</li>
        <li>C. Spearman, « The Proof and Measurement of Association Between Two Things », American Journal of Psychology, 1904 — l'article fondateur de la corrélation de rang.</li>
        <li>T. Vigen, <em>Spurious Correlations</em>, Hachette Books — un recueil accessible de corrélations statistiquement réelles mais dépourvues de tout lien causal.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais calculer et interpréter un coefficient de corrélation, ajuster une droite de régression, et distinguer corrélation linéaire (Pearson) et corrélation de rang (Spearman) — clôturant ainsi la matière « Outils informatiques et analyse de données » de cette L1. Comme le rappelle sans cesse la statistique moderne face au déluge de données du big data : savoir calculer une corrélation est utile, mais savoir résister à la tentation d'y voir automatiquement une causalité est, encore aujourd'hui, la marque d'un esprit scientifique rigoureux.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Covariance : signe = sens de la liaison, mais dépend des unités</li>
        <li>Corrélation $r = \\text{Cov}(X,Y)/(\\sigma_X\\sigma_Y) \\in [-1,1]$ : mesure la force ET le sens d'une liaison LINÉAIRE uniquement</li>
        <li>Droite de régression $\\hat y=ax+b$ avec $a=\\text{Cov}(X,Y)/V(X)$ et $b=\\bar y-a\\bar x$ (moindres carrés)</li>
        <li>$R^2=r^2$ = part de variance de Y expliquée par X ; le reste est la variance résiduelle</li>
        <li>Spearman $r_s$ pour des rangs / une relation monotone non nécessairement linéaire</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre le coefficient directeur $a$ de la régression avec le coefficient de corrélation $r$ (deux quantités différentes)</li>
        <li>Interpréter r≈0 comme absence totale de lien, sans regarder le nuage de points</li>
        <li>Utiliser Pearson sur des données de rang plutôt que Spearman</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">$\\text{Cov}(X,Y)=12$, $\\sigma_X=4$, $\\sigma_Y=3$. Quel est le coefficient de corrélation $r$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e7_1" value="wrong"> 12</label>
          <label class="option"><input type="radio" name="stat_e7_1" value="right"> 1</label>
          <label class="option"><input type="radio" name="stat_e7_1" value="wrong"> 0,25</label>
          <label class="option"><input type="radio" name="stat_e7_1" value="wrong"> 36</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e7_1','stat_e7_fb1','Correct — r = 12/(4×3) = 12/12 = 1 : liaison linéaire parfaite.','r = Cov(X,Y)/(σX × σY) : divise la covariance par le PRODUIT des deux écarts-types.')">Vérifier</button>
        <div class="feedback" id="stat_e7_fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">$\\bar x=5$, $\\bar y=30$, Cov$(X,Y)=-6$, $V(X)=3$. Quelle est l'équation de la droite de régression de Y en X ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e7_2" value="wrong"> ŷ = -2x + 30</label>
          <label class="option"><input type="radio" name="stat_e7_2" value="right"> ŷ = -2x + 40</label>
          <label class="option"><input type="radio" name="stat_e7_2" value="wrong"> ŷ = 2x + 20</label>
          <label class="option"><input type="radio" name="stat_e7_2" value="wrong"> ŷ = -6x + 3</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e7_2','stat_e7_fb2','Correct — a = -6/3 = -2 ; b = 30 - (-2×5) = 30+10 = 40, donc ŷ = -2x+40.','Calcule d\\'abord a = Cov(X,Y)/V(X), puis b = ȳ - a×x̄ — attention au signe négatif de a.')">Vérifier</button>
        <div class="feedback" id="stat_e7_fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le coefficient de corrélation entre X et Y vaut 0,8 en régression simple. Quelle proportion de la variance de Y est expliquée par X ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="stat_e7_3" value="wrong"> 80%</label>
          <label class="option"><input type="radio" name="stat_e7_3" value="right"> 64%</label>
          <label class="option"><input type="radio" name="stat_e7_3" value="wrong"> 8%</label>
          <label class="option"><input type="radio" name="stat_e7_3" value="wrong"> 40%</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('stat_e7_3','stat_e7_fb3','Correct — R² = r² = 0,8² = 0,64, soit 64% de la variance de Y expliquée par X.','R² = r², pas r lui-même : mets 0,8 au carré.')">Vérifier</button>
        <div class="feedback" id="stat_e7_fb3"></div>
      </div>
    </div>
  `
};

STAT_NOVA_KB[statKey('Corrélation, régression et corrélation de rang')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Corrélation, régression et corrélation de rang ». Demande-moi comment calculer r, une droite de régression, R², ou Spearman, ou demande un indice sur un exercice.",
  rules: [
    { test:/covariance/i, replies:[
      "La covariance Cov(X,Y) donne le SIGNE de la liaison (positif = même sens, négatif = sens opposés), mais sa valeur brute dépend des unités de X et Y — normalise-la avec r pour comparer sa force."
    ]},
    { test:/corrélation|coefficient r\b|\br\b/i, replies:[
      "r = Cov(X,Y)/(σX×σY), toujours entre -1 et 1. Attention : r ne mesure QUE la liaison linéaire — un r proche de 0 n'exclut pas une liaison non linéaire (regarde toujours le nuage de points)."
    ]},
    { test:/régression|droite/i, replies:[
      "La droite de régression ŷ=ax+b a pour pente a = Cov(X,Y)/V(X) et ordonnée à l'origine b = ȳ - a×x̄ (méthode des moindres carrés, qui minimise les résidus au carré)."
    ]},
    { test:/r[²2]|détermination|décomposition/i, replies:[
      "R² = r² (en régression simple) donne la part de variance de Y expliquée par X. Le reste (1-R²) est la variance résiduelle, non expliquée par la relation linéaire avec X."
    ]},
    { test:/spearman|rang/i, replies:[
      "r_s = 1 - 6Σdᵢ²/(n(n²-1)), où dᵢ est la différence de rang entre les deux variables. Utile pour des variables ordinales, ou une relation monotone qui n'est pas forcément linéaire."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : divise la covariance par le produit des deux écarts-types.",
      "Indice niveau 2 : r = 12/(4×3).",
      "Indice niveau 3 : r = 12/12 = 1."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : calcule d'abord a = Cov(X,Y)/V(X), attention au signe négatif.",
      "Indice niveau 2 : a = -6/3 = -2, puis b = 30 - (-2×5).",
      "Indice niveau 3 : b = 30+10 = 40, donc ŷ = -2x+40."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : R² = r², pas r directement.",
      "Indice niveau 2 : 0,8² = ?",
      "Indice niveau 3 : R² = 0,64, soit 64%."
    ]}
  ]
};

/* fusionne le module dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, STAT_CHAPTERS);
Object.assign(NOVA_KB, STAT_NOVA_KB);