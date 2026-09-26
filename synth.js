/* =====================================================================
   CHUNK « synth » — registre SYNTH_CHAPTERS / SYNTH_NOVA_KB
   Matière(s) : Chimie|Synthèse organique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   SYNTH_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ===================================================================
   MATIÈRE — Synthèse organique (L3CF, domaine Chimie)
   Structure identique aux autres modules : SYNTH_CHAPTERS / SYNTH_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu : méthodologie de la synthèse organique moderne — rétrosynthèse,
   groupes protecteurs, formation de liaisons C-C, chimie des énolates,
   oléfination, oxydo-réduction sélective, cycloadditions, catalyse
   organométallique, synthèse asymétrique et stratégie de synthèse totale.
=================================================================== */
const SYNTH_MATIERE = 'Synthèse organique';
function synKey(chapterTitle){ return `Chimie|${SYNTH_MATIERE}|${chapterTitle}`; }
const SYNTH_CHAPTERS = {};
const SYNTH_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
SYNTH_CHAPTERS[synKey("Analyse rétrosynthétique : stratégies et méthodologie")] = {
  objectives: [
    "Définir les notions de cible, synthon, équivalent synthétique et déconnexion",
    "Identifier les déconnexions stratégiques d'une molécule à partir de ses groupes fonctionnels",
    "Utiliser l'interconversion de groupe fonctionnel (FGI) et l'ajout de groupe fonctionnel (FGA) dans une analyse rétrosynthétique",
    "Distinguer synthèse linéaire et synthèse convergente et justifier un choix stratégique en termes de rendement global",
    "Construire un arbre rétrosynthétique complet, des matières premières jusqu'à la cible",
    "Retracer, à partir des travaux de Corey (prix Nobel 1990, programme LHASA 1969), le passage d'une planification intuitive de synthèse à une méthode rétrosynthétique explicite et partiellement automatisable"
  ],
  prereqs: ["Réactivité et mécanismes en chimie organique (L1-L2)", "Nomenclature et groupes fonctionnels", "Chimie organique descriptive"],
  bodyHtml: `
    <p>En 1990, le chimiste américain <strong>Elias James Corey</strong> reçoit le prix Nobel de chimie « pour le développement de la théorie et de la méthodologie de la synthèse organique », en particulier pour avoir formalisé, dès la fin des années 1960, le raisonnement rétrosynthétique qu'il présentera de façon systématique dans son ouvrage <em>The Logic of Chemical Synthesis</em> (1989). Avant Corey, la planification d'une synthèse relevait largement de l'intuition individuelle d'un chimiste chevronné ; il en a fait une méthode explicite, enseignable, et même en partie automatisable — son propre programme informatique LHASA (<em>Logic and Heuristics Applied to Synthetic Analysis</em>), développé dès 1969, fut l'une des toutes premières tentatives d'assister la conception de synthèses par ordinateur.</p>

    <p>Cette formalisation reste, plus de cinquante ans plus tard, la méthode que suivent quotidiennement les chimistes de l'industrie pharmaceutique pour concevoir la synthèse de nouveaux médicaments, souvent des molécules bien plus complexes que celles étudiées par Corey lui-même.</p>

    <p>La synthèse organique consiste à construire une molécule cible, souvent complexe, à partir de matières premières simples et disponibles. Face à une cible, il est presque toujours impossible de « deviner » directement la suite de réactions à effectuer : il faut raisonner <strong>à l'envers</strong>, de la cible vers les précurseurs. C'est l'<strong>analyse rétrosynthétique</strong>, cœur méthodologique de ce module.</p>

    <h3>1. Cible, synthons et équivalents synthétiques</h3>
    <p>La <strong>cible</strong> (ou <em>target</em>) est la molécule que l'on souhaite synthétiser. On imagine une coupure fictive d'une liaison de la cible : cette opération, appelée <strong>déconnexion</strong>, fait apparaître deux fragments appelés <strong>synthons</strong>. Un synthon est une entité idéalisée, chargée ou neutre, qui n'existe pas forcément telle quelle en pratique : le carbanion « CH3⁻ » est un synthon nucléophile, mais on ne manipule jamais de méthyllithium à l'état de carbanion libre en solution — on utilise un <strong>équivalent synthétique</strong> réel, ici CH3Li ou CH3MgBr, qui joue le rôle chimique du synthon.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La flèche rétrosynthétique <strong>⇒</strong> (à ne jamais confondre avec la flèche réactionnelle →) signifie « est obtenu à partir de » et se lit de droite à gauche : Cible ⇒ Synthon(+) + Synthon(−). La synthèse elle-même se fait ensuite dans le sens direct, avec les équivalents synthétiques réels.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Corey a réussi à coder une partie de ce raisonnement rétrosynthétique dans un programme informatique dès 1969. Qu'est-ce que cela vous suggère sur la nature de la démarche : s'agit-il d'une pure intuition artistique du chimiste, ou d'un ensemble de règles suffisamment systématiques pour être, au moins en partie, formalisées ?
    </div>

    <h3>2. Les grandes règles de déconnexion</h3>
    <p>Une déconnexion n'est utile que si elle correspond à une <strong>réaction connue et fiable</strong> dans le sens direct. On privilégie donc les coupures qui reproduisent des transformations classiques du cours de chimie organique :</p>
    <table class="mini-table">
      <tr><th>Liaison ciblée</th><th>Synthons typiques</th><th>Réaction directe correspondante</th></tr>
      <tr><td>C–C en α d'un carbonyle</td><td>énolate (d⁻) + électrophile (a⁺)</td><td>alkylation d'énolate, aldolisation, Claisen</td></tr>
      <tr><td>C=C</td><td>ylure de phosphore + carbonyle</td><td>oléfination de Wittig / HWE</td></tr>
      <tr><td>C–OH (alcool secondaire ou tertiaire)</td><td>carbanion (organométallique) + carbonyle</td><td>addition d'un organomagnésien / organolithien</td></tr>
      <tr><td>C(=O)–N (amide)</td><td>acide carboxylique + amine</td><td>couplage peptidique / activation de l'acide</td></tr>
      <tr><td>C(=O)–O (ester)</td><td>acide carboxylique + alcool</td><td>estérification de Fischer, activation</td></tr>
      <tr><td>C–C aromatique/vinylique</td><td>organométallique + halogénure</td><td>couplage pallado-catalysé (Suzuki, Negishi…)</td></tr>
    </table>
    <p>On privilégie systématiquement les déconnexions <strong>à côté d'un hétéroatome</strong> (liaison C–O, C–N polarisée, facile à recréer) et celles qui coupent <strong>en α d'un groupe fonctionnel activant</strong> (carbonyle, qui acidifie les hydrogènes voisins et polarise la liaison C–C formée lors de la synthèse). Une bonne déconnexion simplifie la cible : elle doit réduire la complexité (moins de stéréocentres, squelette plus court, groupe fonctionnel plus simple) et non la déplacer ailleurs.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 110" width="100%">
          <text x="10" y="30" font-family="IBM Plex Mono" font-size="13" fill="#122043">Cible A–B</text>
          <text x="95" y="30" font-family="IBM Plex Mono" font-size="16" fill="#3D6BF0">⇒</text>
          <text x="120" y="24" font-family="IBM Plex Mono" font-size="12" fill="#F0555C">A⁺</text>
          <text x="150" y="24" font-family="IBM Plex Mono" font-size="12" fill="#122043">+</text>
          <text x="168" y="24" font-family="IBM Plex Mono" font-size="12" fill="#1FB6A8">B⁻</text>
          <text x="10" y="70" font-family="IBM Plex Mono" font-size="10" fill="#122043">(synthons)</text>
          <text x="95" y="90" font-family="IBM Plex Mono" font-size="16" fill="#8064F2">↓</text>
          <text x="10" y="102" font-family="IBM Plex Mono" font-size="10" fill="#122043">équivalents synthétiques réels : A–X (électrophile) + B–M (organométallique)</text>
        </svg>
        <span>Schéma général d'une déconnexion : de la cible aux réactifs réels</span>
      </div>
    </div>

    <h3>3. Interconversion et ajout de groupe fonctionnel (FGI / FGA)</h3>
    <p>Il arrive qu'aucune déconnexion directe ne soit possible sur la cible telle quelle. On effectue alors une <strong>interconversion de groupe fonctionnel</strong> (FGI, <em>functional group interconversion</em>) : on remplace mentalement un groupe par un autre, chimiquement proche, qui rend la déconnexion suivante possible — par exemple remplacer un alcène par l'alcool dont il dérive avant de chercher une coupure C–C. On peut aussi pratiquer un <strong>ajout de groupe fonctionnel</strong> (FGA) : on introduit temporairement un groupe activant (souvent un carbonyle) absent de la cible, pour permettre une déconnexion efficace ; ce groupe est ensuite retiré en fin de synthèse (opération de <strong>retrait de groupe fonctionnel</strong>, RGF).</p>
    <div class="example-box">
      <p><strong>Exemple guidé.</strong> Cible : 4-phénylbutan-2-one, C6H5–CH2–CH2–C(=O)–CH3. Déconnexion classique « en α du carbonyle » : on coupe la liaison entre le CH2 en α et le reste de la chaîne benzylique, ce qui donne le synthon énolate (d⁻, équivalent réel : énolate de la butan-2-one, formé par LDA) et le synthon électrophile benzylique (a⁺, équivalent réel : bromure de benzyle, C6H5–CH2–Br). La synthèse directe est alors : alkylation de l'énolate de la butan-2-one par PhCH2Br.</p>
    </div>

    <h3>4. Synthèse linéaire ou synthèse convergente</h3>
    <p>Une <strong>synthèse linéaire</strong> enchaîne les étapes les unes après les autres sur un seul fragment croissant : si chaque étape a un rendement r et qu'il y a n étapes, le rendement global vaut r^n, qui chute très vite. Une <strong>synthèse convergente</strong> prépare séparément plusieurs fragments de complexité comparable, puis les assemble en une ou deux étapes finales : le rendement global est bien meilleur car les pertes ne se cumulent pas sur une seule chaîne. Pour une cible complexe (produit naturel, molécule polyfonctionnelle), on cherche donc systématiquement une <strong>déconnexion convergente</strong>, qui coupe la molécule en deux fragments de taille comparable plutôt qu'en retirant un petit morceau à chaque étape.</p>
    <div class="formula-box">$$\text{Rendement global (linéaire, n étapes)} = r_1 \times r_2 \times \cdots \times r_n$$</div>
    <table class="mini-table">
      <tr><th>Stratégie</th><th>Avantage</th><th>Inconvénient</th></tr>
      <tr><td>Linéaire</td><td>simple à planifier, peu de fragments à gérer</td><td>rendement global faible si n est grand</td></tr>
      <tr><td>Convergente</td><td>meilleur rendement global, fragments purifiables séparément</td><td>nécessite deux voies de synthèse à mener en parallèle</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si une synthèse linéaire à 10 étapes avec un rendement moyen de 80 % par étape donne un rendement global d'environ 11 %, à quel ordre de grandeur vous attendez-vous pour une synthèse convergente de complexité comparable, organisée en deux fragments de 5 étapes chacun assemblés à la fin ?
    </div>

    <h3>5. Critères de choix entre plusieurs voies rétrosynthétiques</h3>
    <p>Une même cible admet en général plusieurs analyses rétrosynthétiques possibles. On les compare selon : la disponibilité et le coût des matières premières, le nombre total d'étapes, la sélectivité (chimio-, régio-, stéréosélectivité) de chaque étape, la nécessité ou non de groupes protecteurs, et la robustesse des réactions choisies (rendements documentés, conditions douces). La meilleure voie n'est pas toujours la plus courte sur le papier : une étape apparemment simple mais peu sélective peut coûter plus cher, en pratique, que deux étapes fiables.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Cible ⇒ synthons (entités idéalisées) → équivalents synthétiques (réactifs réels utilisés dans le sens direct)</li>
        <li>On déconnecte de préférence à côté d'un hétéroatome ou en α d'un groupe activant (carbonyle)</li>
        <li>FGI = interconvertir un groupe fonctionnel ; FGA = ajouter temporairement un groupe activant ; RGF = le retirer ensuite</li>
        <li>Synthèse convergente : rendement global bien meilleur qu'une synthèse linéaire pour une cible complexe</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre la flèche rétrosynthétique ⇒ (« vient de ») avec la flèche réactionnelle → (« donne »)</li>
        <li>Proposer une déconnexion qui ne correspond à aucune réaction connue et fiable dans le sens direct</li>
        <li>Oublier de vérifier la compatibilité fonctionnelle : un synthon nucléophile fort (organométallique) est incompatible avec un OH ou un NH acide non protégé présent ailleurs dans la molécule</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour la cible PhCH(OH)CH3 (1-phénéthanol), quelle déconnexion est la plus logique ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn1e1" value="wrong"> Couper la liaison C–H</label>
          <label class="option"><input type="radio" name="syn1e1" value="right"> Couper la liaison C–C entre le CH(OH) et le CH3, synthons PhCHO et ⁻CH3</label>
          <label class="option"><input type="radio" name="syn1e1" value="wrong"> Couper la liaison O–H uniquement</label>
          <label class="option"><input type="radio" name="syn1e1" value="wrong"> Couper le cycle aromatique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn1e1','syn1fb1','Correct — un alcool secondaire se déconnecte classiquement en carbonyle + organométallique : PhCHO + CH3MgBr (ou CH3Li) redonne l\\'alcool par addition nucléophile.','Un alcool secondaire ArCH(OH)R se retrace toujours vers un aldéhyde/cétone + un organométallique : cherche la liaison C–OH voisine du carbone qui portait le carbonyle.')">Vérifier</button>
        <div class="feedback" id="syn1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quel est l'intérêt principal d'une synthèse convergente par rapport à une synthèse linéaire pour une cible complexe ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn1e2" value="wrong"> Elle nécessite moins de réactifs différents</label>
          <label class="option"><input type="radio" name="syn1e2" value="right"> Elle donne un meilleur rendement global car les pertes ne se cumulent pas sur une seule chaîne d'étapes</label>
          <label class="option"><input type="radio" name="syn1e2" value="wrong"> Elle évite systématiquement les groupes protecteurs</label>
          <label class="option"><input type="radio" name="syn1e2" value="wrong"> Elle ne fonctionne que pour les molécules aromatiques</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn1e2','syn1fb2','Correct — en assemblant deux fragments préparés séparément, le rendement global se rapproche du produit de deux voies courtes plutôt que d\\'une seule chaîne de n étapes.','Compare r^n (linéaire) à deux fragments de n/2 étapes assemblés à la fin : le produit final est nettement supérieur.')">Vérifier</button>
        <div class="feedback" id="syn1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans l'analyse rétrosynthétique, à quoi sert un ajout de groupe fonctionnel (FGA) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn1e3" value="wrong"> À rendre la molécule plus stable thermodynamiquement</label>
          <label class="option"><input type="radio" name="syn1e3" value="right"> À introduire temporairement un groupe activant qui permet une déconnexion, puis à le retirer en fin de synthèse (RGF)</label>
          <label class="option"><input type="radio" name="syn1e3" value="wrong"> À remplacer définitivement un groupe fonctionnel de la cible</label>
          <label class="option"><input type="radio" name="syn1e3" value="wrong"> À augmenter le nombre de stéréocentres</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn1e3','syn1fb3','Correct — le FGA introduit un groupe (souvent un carbonyle) qui active une position, permet la déconnexion recherchée, puis disparaît par un retrait de groupe fonctionnel (RGF) une fois son rôle stratégique joué.','Le FGA n\\'est pas dans la cible finale : c\\'est un outil temporaire, retiré ensuite par RGF.')">Vérifier</button>
        <div class="feedback" id="syn1fb3"></div>
      </div>
    </div>

    <div class="frontier-box">
      <span class="eyebrow">🔭 Frontière de la recherche</span>
      <p>Le programme LHASA de Corey a ouvert la voie à des outils bien plus puissants aujourd'hui : des logiciels de rétrosynthèse assistée par intelligence artificielle (comme Synthia, héritier direct de LHASA, ou IBM RXN for Chemistry) utilisent désormais des réseaux de neurones entraînés sur des millions de réactions publiées pour proposer automatiquement des voies de synthèse plausibles, parfois en quelques secondes. Une question de recherche reste ouverte : ces modèles, excellents pour recombiner des transformations déjà documentées, sont-ils capables de proposer une déconnexion réellement <em>inédite</em> pour un squelette moléculaire jamais rencontré dans leurs données d'entraînement ?</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">📐 Synthèse visuelle</span>
      <p>Cible → identification des groupes fonctionnels et liaisons stratégiques → <strong>déconnexion</strong> (⇒) → synthons → FGI/FGA si nécessaire → équivalents synthétiques réels → arbre rétrosynthétique jusqu'aux matières premières disponibles → comparaison des voies (linéaire vs convergente) → sélection de la meilleure voie → exécution de la synthèse dans le sens direct (→)</p>
      <p><strong>Résultat central du chapitre :</strong></p>
      <div class="formula-box">$$\\text{Rendement global (linéaire, } n \\text{ étapes)} = r_1 \\times r_2 \\times \\cdots \\times r_n$$</div>
    </div>

    <div class="reflection-box">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si une cible admettait deux déconnexions stratégiques toutes deux valables et toutes deux bien documentées — comment trancheriez-vous entre les deux en l'absence de contrainte de coût ou de délai ?</li>
        <li>Pourquoi Corey a-t-il jugé utile de formaliser une méthode explicite alors que des générations de chimistes avaient déjà réussi, avant lui, à synthétiser des molécules complexes par intuition seule ?</li>
        <li>Quelle serait la conséquence, sur le rendement global d'une synthèse totale, du choix d'une voie linéaire à 15 étapes plutôt que d'une voie convergente équivalente en nombre total d'étapes mais organisée en deux fragments de 7-8 étapes ?</li>
      </ul>
    </div>

    <div class="biblio-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>E.J. Corey, X.-M. Cheng, <em>The Logic of Chemical Synthesis</em>, Wiley, 1989 — l'ouvrage de référence systématisant l'analyse rétrosynthétique.</li>
        <li>E.J. Corey, W.T. Wipke, <em>Computer-Assisted Design of Complex Organic Syntheses</em>, Science, 1969 — l'article fondateur du programme LHASA.</li>
        <li>J. Clayden, N. Greeves, S. Warren, <em>Organic Chemistry</em>, Oxford University Press — référence standard de niveau L3/master pour ce chantier de synthèse organique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais raisonner à l'envers, comme Corey l'a formalisé pour toute une génération de chimistes. Mais une cible réelle porte souvent plusieurs groupes fonctionnels qui risquent de s'interférer mutuellement pendant la synthèse : direction le chapitre suivant, avec les groupes protecteurs.</p>
  `
};

SYNTH_NOVA_KB[synKey("Analyse rétrosynthétique : stratégies et méthodologie")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Analyse rétrosynthétique ». Demande-moi la différence entre synthon et équivalent synthétique, comment choisir une déconnexion, ou un indice sur un exercice.",
  rules: [
    { test:/synthon/i, replies:["Un synthon est une entité idéalisée (souvent chargée) issue d'une déconnexion imaginaire — il n'existe pas forcément tel quel. L'équivalent synthétique est le réactif réel qui joue son rôle en pratique (ex. synthon CH3⁻ ↔ équivalent réel CH3MgBr)."] },
    { test:/d[ée]connexion/i, replies:["Une déconnexion est une coupure fictive d'une liaison de la cible. On choisit toujours une déconnexion qui correspond à une réaction connue et fiable dans le sens direct, de préférence à côté d'un hétéroatome ou en α d'un carbonyle."] },
    { test:/fgi|interconversion/i, replies:["FGI (interconversion de groupe fonctionnel) consiste à remplacer mentalement un groupe par un autre, chimiquement proche, pour rendre une déconnexion possible ensuite."] },
    { test:/fga/i, replies:["FGA (ajout de groupe fonctionnel) introduit temporairement un groupe activant, absent de la cible finale, pour permettre une déconnexion. On le retire ensuite par un retrait de groupe fonctionnel (RGF)."] },
    { test:/converg|lin[ée]aire/i, replies:["Synthèse linéaire : les étapes s'enchaînent sur un seul fragment, le rendement global chute vite (r^n). Synthèse convergente : on prépare des fragments séparément puis on les assemble à la fin — bien meilleur rendement global pour une cible complexe."] },
    { test:/fl[èe]che/i, replies:["La flèche rétrosynthétique ⇒ se lit « est obtenu à partir de » (de droite à gauche). Ne la confonds jamais avec la flèche réactionnelle → utilisée dans le sens direct de la synthèse."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : PhCH(OH)CH3 est un alcool secondaire — quelle grande famille de réactions le fabrique ?","Indice niveau 2 : addition d'un organométallique sur un carbonyle.","Indice niveau 3 : coupe entre le carbone porteur du OH et le méthyle : PhCHO + CH3MgBr."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense au rendement global r^n d'une chaîne linéaire.","Indice niveau 2 : dans une synthèse convergente, les pertes ne s'accumulent pas sur une seule chaîne.","Indice niveau 3 : le rendement final se rapproche de deux voies courtes assemblées, plutôt que d'une seule voie longue."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le FGA n'est pas présent dans la cible finale.","Indice niveau 2 : il sert à activer une position pour permettre une déconnexion.","Indice niveau 3 : on le retire ensuite en fin de synthèse — c'est le retrait de groupe fonctionnel (RGF)."] }
  ]
};

/* =========================== CHAPITRE 2 =========================== */
SYNTH_CHAPTERS[synKey("Groupes protecteurs en synthèse organique")] = {
  objectives: [
    "Justifier la nécessité d'un groupe protecteur en termes de chimiosélectivité",
    "Énoncer le cahier des charges d'un bon groupe protecteur (installation, stabilité, déprotection sélective)",
    "Connaître les protecteurs usuels des alcools, amines, carbonyles et acides carboxyliques",
    "Choisir un jeu de groupes protecteurs orthogonaux pour une synthèse à plusieurs fonctions sensibles",
    "Relier le principe des groupes protecteurs orthogonaux à la méthode de synthèse peptidique sur support solide développée par Merrifield (1963, prix Nobel 1984)"
  ],
  prereqs: ["Analyse rétrosynthétique : stratégies et méthodologie", "Réactivité des alcools, amines, carbonyles et acides carboxyliques"],
  bodyHtml: `
    <p>En 1963, le biochimiste américain <strong>Bruce Merrifield</strong> publie la méthode de synthèse peptidique sur support solide, qui accélérera radicalement la fabrication des peptides et lui vaudra le prix Nobel de chimie 1984. Sa méthode repose entièrement sur une stratégie de protection/déprotection orthogonale répétée des dizaines de fois de suite : chaque acide aminé porte une amine protégée (d'abord par le groupe Boc, puis par le Fmoc dans les versions modernisées de la méthode), déprotégée juste avant le couplage suivant, sans jamais toucher à la chaîne peptidique déjà construite ni à la résine qui la retient.</p>

    <p>Sans cette maîtrise fine de la chimiosélectivité, il serait tout simplement impossible d'enchaîner des dizaines de couplages successifs sur la même molécule sans tout détruire au passage — c'est exactement le problème que ce chapitre va résoudre, pour toute molécule polyfonctionnelle, pas seulement pour les peptides.</p>

    <p>Une molécule cible possède souvent plusieurs groupes fonctionnels réactifs. Or une étape de synthèse (organométallique, oxydation, réduction…) ne doit affecter qu'un seul site réactionnel à la fois : il faut alors « endormir » temporairement les fonctions gênantes. C'est le rôle des <strong>groupes protecteurs</strong>.</p>

    <h3>1. Pourquoi protéger : la chimiosélectivité</h3>
    <p>Un organomagnésien réagit aussi bien avec un aldéhyde qu'avec un alcool (acide-base) ou une amine primaire. Si la molécule de départ porte à la fois un aldéhyde à faire réagir et un alcool à préserver, l'organomagnésien détruira l'alcool avant même d'atteindre l'aldéhyde. La solution : transformer temporairement l'alcool en un groupe inerte vis-à-vis de l'organomagnésien (un éther silylé, par exemple), effectuer la réaction voulue sur l'aldéhyde, puis restaurer l'alcool en fin de séquence.</p>

    <h3>2. Cahier des charges d'un bon groupe protecteur</h3>
    <table class="mini-table">
      <tr><th>Critère</th><th>Exigence</th></tr>
      <tr><td>Installation</td><td>rendement élevé, conditions douces, sélective vis-à-vis des autres fonctions</td></tr>
      <tr><td>Stabilité</td><td>inerte dans toutes les conditions des étapes suivantes de la synthèse</td></tr>
      <tr><td>Déprotection</td><td>sélective, en conditions ne touchant pas le reste de la molécule (idéalement orthogonale aux autres protecteurs présents)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — orthogonalité</span>
      Deux groupes protecteurs sont dits <strong>orthogonaux</strong> si l'on peut retirer l'un sans toucher à l'autre. Une synthèse portant plusieurs fonctions sensibles doit combiner des protecteurs orthogonaux (par exemple : un silylé clivé par le fluorure, et un carbamate de Boc clivé par un acide), pour pouvoir déprotéger sélectivement au moment voulu.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Merrifield a dû répéter des dizaines de fois le même cycle protection/couplage/déprotection sur la même molécule en croissance. Si le protecteur choisi n'avait été fiable qu'à 95 % à chaque cycle, à quel rendement global vous attendriez-vous après 30 cycles — et qu'est-ce que cela vous apprend sur l'exigence de fiabilité d'un bon groupe protecteur ?
    </div>

    <h3>3. Protection des alcools</h3>
    <p>Les <strong>éthers silylés</strong> (TMS, TBS/TBDMS, TBDPS) s'installent par réaction de l'alcool avec un chlorosilane (TBSCl) en présence d'imidazole, et se retirent par une source de fluorure (TBAF) qui exploite la force de la liaison Si–F. Leur encombrement croissant (TMS < TBS < TBDPS) module leur stabilité aux conditions acides ou basiques ultérieures. Le <strong>tétrahydropyranyle (THP)</strong> forme un acétal mixte avec le dihydropyrane (catalyse acide) et se clive en milieu acide aqueux doux. Le groupe <strong>benzyle (Bn)</strong>, installé par alkylation de Williamson (NaH puis BnBr), se retire par hydrogénolyse catalytique (H2, Pd/C) — une méthode douce et chimiosélective qui ne perturbe pas la plupart des autres fonctions.</p>

    <h3>4. Protection des amines</h3>
    <table class="mini-table">
      <tr><th>Protecteur</th><th>Installation</th><th>Clivage</th></tr>
      <tr><td>Boc (tert-butoxycarbonyle)</td><td>Boc2O, base</td><td>acide (TFA, HCl)</td></tr>
      <tr><td>Cbz (carboxybenzyle)</td><td>CbzCl, base</td><td>hydrogénolyse (H2, Pd/C)</td></tr>
      <tr><td>Fmoc (fluorénylméthoxycarbonyle)</td><td>Fmoc-Cl ou Fmoc-OSu</td><td>base faible (pipéridine)</td></tr>
    </table>
    <p>Le trio Boc / Cbz / Fmoc illustre parfaitement l'orthogonalité : Boc part en milieu acide, Cbz par hydrogénolyse, Fmoc en milieu basique doux — trois mécanismes de clivage indépendants, largement exploités en synthèse peptidique pour protéger sélectivement différentes amines d'une même molécule.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La stratégie Fmoc, aujourd'hui la plus répandue en synthèse peptidique, se clive en conditions basiques douces plutôt qu'en milieu acide comme le Boc originel de Merrifield. Pour un peptide contenant des acides aminés sensibles à l'acide, en quoi ce changement de stratégie de protection représente-t-il un avantage concret ?
    </div>

    <h3>5. Protection des carbonyles</h3>
    <p>Un aldéhyde ou une cétone se protège en <strong>acétal cyclique</strong> par condensation avec un diol (souvent l'éthylène glycol), en catalyse acide et avec élimination de l'eau formée (montage Dean-Stark, qui déplace l'équilibre en éliminant l'eau azéotropiquement). L'acétal ainsi formé (1,3-dioxolane) est stable en milieu basique et vis-à-vis des nucléophiles et des réducteurs — ce qui permet, par exemple, de faire réagir un organomagnésien ailleurs dans la molécule sans toucher au carbonyle protégé. La déprotection se fait simplement par hydrolyse acide aqueuse.</p>

    <h3>6. Protection des acides carboxyliques</h3>
    <p>L'estérification protège l'acide : l'<strong>ester méthylique</strong> ou <strong>éthylique</strong> se retire par saponification (base forte, puis acidification) ; l'<strong>ester tert-butylique</strong> se clive en conditions acides douces (TFA), sans base — utile quand la molécule contient un centre stéréogène sensible à l'épimérisation basique ; l'<strong>ester benzylique</strong> se retire par hydrogénolyse, orthogonale aux deux précédents.</p>

    <div class="example-box">
      <p><strong>Exemple de stratégie orthogonale.</strong> Une molécule portant un alcool et une amine à traiter séquentiellement : on protège l'alcool en éther TBS (stable en milieu basique et vis-à-vis des nucléophiles) et l'amine en carbamate de Boc (stable en milieu basique, labile en milieu acide). On peut alors déprotéger l'amine seule (TFA) sans toucher à l'éther silylé, effectuer une réaction sur l'amine libérée, puis déprotéger l'alcool en fin de synthèse (TBAF) sans affecter le reste de la molécule.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un groupe protecteur doit s'installer sélectivement, rester stable pendant la suite de la synthèse, puis se retirer sélectivement</li>
        <li>Alcools : silylés (TBAF), THP (H3O⁺ doux), benzyle (H2/Pd)  —  Amines : Boc (acide), Cbz (H2/Pd), Fmoc (base)</li>
        <li>Carbonyles : acétal cyclique (installation Dean-Stark, clivage par hydrolyse acide)</li>
        <li>Orthogonalité = pouvoir retirer un protecteur sans toucher aux autres présents sur la molécule</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Choisir deux protecteurs qui se clivent dans les mêmes conditions : perte de la sélectivité de déprotection</li>
        <li>Oublier qu'un acétal, bien que stable en milieu basique, s'hydrolyse facilement en milieu acide aqueux</li>
        <li>Négliger l'encombrement stérique du protecteur silylé choisi (TMS trop labile pour une synthèse longue, TBDPS parfois trop encombrant pour l'étape suivante)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour retirer un groupe Boc sur une amine sans affecter un ester benzylique présent ailleurs sur la molécule, quelles conditions utilise-t-on ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn2e1" value="wrong"> H2, Pd/C</label>
          <label class="option"><input type="radio" name="syn2e1" value="right"> TFA (acide trifluoroacétique)</label>
          <label class="option"><input type="radio" name="syn2e1" value="wrong"> NaOH aqueux</label>
          <label class="option"><input type="radio" name="syn2e1" value="wrong"> TBAF</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn2e1','syn2fb1','Correct — le Boc se clive en milieu acide (TFA), qui n\\'affecte pas un ester benzylique (lequel se retire par hydrogénolyse). C\\'est un exemple classique d\\'orthogonalité.','Le Boc est un carbamate labile en milieu acide ; l\\'hydrogénolyse (H2/Pd) est réservée aux groupes benzyliques.')">Vérifier</button>
        <div class="feedback" id="syn2fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pourquoi protège-t-on un aldéhyde en acétal cyclique avant d'ajouter un organomagnésien ailleurs sur la molécule ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn2e2" value="wrong"> Pour rendre l'aldéhyde plus électrophile</label>
          <label class="option"><input type="radio" name="syn2e2" value="right"> Parce que l'organomagnésien réagirait directement avec l'aldéhyde non protégé, empêchant la réaction voulue ailleurs</label>
          <label class="option"><input type="radio" name="syn2e2" value="wrong"> Pour changer la couleur du produit</label>
          <label class="option"><input type="radio" name="syn2e2" value="wrong"> Parce que l'acétal est plus soluble dans l'eau</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn2e2','syn2fb2','Correct — un organomagnésien, très nucléophile, additionnerait immédiatement sur l\\'aldéhyde libre. L\\'acétal, lui, est inerte vis-à-vis des organométalliques : il protège le carbonyle le temps de la réaction voulue.','Pense chimiosélectivité : l\\'organomagnésien réagit avec le premier électrophile carbonylé qu\\'il rencontre.')">Vérifier</button>
        <div class="feedback" id="syn2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Deux groupes protecteurs sont dits « orthogonaux » lorsque :</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn2e3" value="wrong"> Ils s'installent tous les deux dans les mêmes conditions</label>
          <label class="option"><input type="radio" name="syn2e3" value="wrong"> Ils protègent la même fonction chimique</label>
          <label class="option"><input type="radio" name="syn2e3" value="right"> On peut retirer l'un sans affecter l'autre</label>
          <label class="option"><input type="radio" name="syn2e3" value="wrong"> Ils ont la même masse molaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn2e3','syn2fb3','Correct — l\\'orthogonalité, c\\'est la possibilité de cliver sélectivement chaque protecteur indépendamment des autres, grâce à des mécanismes de déprotection différents (acide / basique / hydrogénolyse…).','Cherche le mot qui décrit une indépendance entre deux opérations de déprotection.')">Vérifier</button>
        <div class="feedback" id="syn2fb3"></div>
      </div>
    </div>

    <div class="frontier-box">
      <span class="eyebrow">🔭 Frontière de la recherche</span>
      <p>Depuis les années 2010, des méthodes dites de synthèse peptidique « en flux rapide » (<em>fast-flow peptide synthesis</em>), développées notamment au MIT, réduisent chaque cycle protection/couplage/déprotection à quelques secondes au lieu de dizaines de minutes, permettant de synthétiser une protéine entière de plus de 100 résidus en quelques heures là où Merrifield mettait des semaines pour un simple tétrapeptide. Une question de recherche reste ouverte : cette rapidité extrême peut-elle s'étendre, sans perte de fidélité de séquence, à des protéines suffisamment longues et complexes pour se replier correctement une fois synthétisées ?</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">📐 Synthèse visuelle</span>
      <p>Molécule polyfonctionnelle → identifier la fonction à préserver → <strong>installation sélective</strong> d'un groupe protecteur (cahier des charges : installation douce / stabilité / déprotection ciblée) → réaction voulue sur le site laissé libre → répéter avec un protecteur <strong>orthogonal</strong> si plusieurs fonctions sensibles → déprotection sélective, une fonction à la fois → restauration de la fonction native → cible finale</p>
      <p><strong>Principe central du chapitre :</strong></p>
      <div class="formula-box">Orthogonalité : retirer un protecteur sans jamais toucher aux autres présents sur la molécule</div>
    </div>

    <div class="reflection-box">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on ne disposait que d'un seul type de mécanisme de clivage (par exemple uniquement l'hydrogénolyse) pour tous les groupes protecteurs disponibles — la stratégie de Merrifield aurait-elle même été concevable ?</li>
        <li>Pourquoi le passage du Boc au Fmoc a-t-il représenté un progrès majeur en synthèse peptidique, alors que les deux groupes protègent chimiquement la même fonction amine ?</li>
        <li>Quelle serait la conséquence, sur la molécule finale, du choix par erreur de deux groupes protecteurs non orthogonaux (clivables tous deux en milieu acide) pour protéger deux fonctions différentes de la même cible ?</li>
      </ul>
    </div>

    <div class="biblio-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>R.B. Merrifield, <em>Solid Phase Peptide Synthesis. I. The Synthesis of a Tetrapeptide</em>, Journal of the American Chemical Society, 1963 — l'article fondateur de la synthèse peptidique sur support solide.</li>
        <li>P.G.M. Wuts, T.W. Greene, <em>Greene's Protective Groups in Organic Synthesis</em>, Wiley — l'ouvrage de référence incontournable pour l'ensemble des groupes protecteurs de ce chapitre.</li>
        <li>N. Hartrampf et al., <em>Synthesis of Proteins by Automated Flow Chemistry</em>, Science, 2020 — pour la synthèse peptidique en flux rapide évoquée en Frontière de la recherche.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais « endormir » puis « réveiller » une fonction chimique au bon moment, comme Merrifield l'a fait des dizaines de fois de suite sur la même chaîne peptidique. Il est temps de construire de vraies liaisons carbone-carbone sur un squelette ainsi protégé : direction le chapitre suivant, avec les réactifs organométalliques.</p>
  `
};

SYNTH_NOVA_KB[synKey("Groupes protecteurs en synthèse organique")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Groupes protecteurs ». Demande-moi la différence entre Boc, Cbz et Fmoc, ce qu'est l'orthogonalité, ou un indice sur un exercice.",
  rules: [
    { test:/boc|cbz|fmoc/i, replies:["Boc se clive en milieu acide (TFA), Cbz par hydrogénolyse (H2/Pd), Fmoc en milieu basique doux (pipéridine). Ces trois mécanismes indépendants permettent de les combiner de façon orthogonale."] },
    { test:/orthogonal/i, replies:["Deux groupes protecteurs sont orthogonaux si on peut retirer l'un sans toucher à l'autre — indispensable dès qu'une molécule porte plusieurs fonctions sensibles à protéger séparément."] },
    { test:/silyl[ée]|tbs|tms|tbdps/i, replies:["Les éthers silylés protègent les alcools : TMS (petit, labile), TBS (le plus courant), TBDPS (encombrant, très stable). Tous se retirent par une source de fluorure comme TBAF."] },
    { test:/ac[ée]tal/i, replies:["Un acétal cyclique protège un aldéhyde ou une cétone : formé en catalyse acide avec un diol (souvent via un montage Dean-Stark), stable en milieu basique et vis-à-vis des nucléophiles, il se retire par simple hydrolyse acide."] },
    { test:/chimios[ée]lectivit[ée]/i, replies:["La chimiosélectivité, c'est faire réagir un réactif avec un seul type de fonction sur une molécule qui en porte plusieurs. Les groupes protecteurs servent justement à l'imposer artificiellement."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : quel mécanisme de clivage est propre au Boc ?","Indice niveau 2 : c'est un carbamate labile en milieu acide.","Indice niveau 3 : TFA clive le Boc sans toucher à l'ester benzylique (hydrogénolyse seulement)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : que ferait un organomagnésien s'il rencontrait un aldéhyde libre ?","Indice niveau 2 : il additionnerait dessus immédiatement, avant d'atteindre la cible voulue.","Indice niveau 3 : protéger l'aldéhyde en acétal le rend inerte face à l'organomagnésien."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : cherche le mot qui décrit une indépendance entre deux déprotections.","Indice niveau 2 : ce n'est pas une question d'installation, mais de clivage.","Indice niveau 3 : orthogonal = on peut retirer l'un sans affecter l'autre."] }
  ]
};

/* =========================== CHAPITRE 3 =========================== */
SYNTH_CHAPTERS[synKey("Formation de liaisons C-C par les réactifs organométalliques")] = {
  objectives: [
    "Comparer la réactivité (nucléophilie, basicité) des organomagnésiens, organolithiens et organocuprates",
    "Prévoir le produit d'addition d'un organométallique sur un aldéhyde, une cétone ou un ester",
    "Distinguer addition 1,2 et addition 1,4 sur une énone et prévoir quel réactif favorise chaque mode",
    "Identifier les fonctions incompatibles avec un organométallique et anticiper la nécessité d'une protection",
    "Retracer l'apport de la découverte de Grignard (1900, prix Nobel 1912) à la formation de liaisons C-C, et situer les limites qui ont motivé le développement de réactifs plus doux comme les organocuprates"
  ],
  prereqs: ["Groupes protecteurs en synthèse organique", "Réactivité des dérivés carbonylés"],
  bodyHtml: `
    <p>En 1900, le chimiste français <strong>Victor Grignard</strong>, alors doctorant à Lyon sous la direction de Philippe Barbier, découvre que le magnésium métallique réagit avec les halogénures d'alkyle dans l'éther anhydre pour former des composés organomagnésiens d'une réactivité inédite envers les carbonyles. Cette découverte, d'une simplicité expérimentale trompeuse, lui vaudra le prix Nobel de chimie 1912 — partagé avec Paul Sabatier — et fera des « réactifs de Grignard » l'un des outils les plus utilisés de toute l'histoire de la chimie organique de synthèse.</p>

    <p>Plus d'un siècle plus tard, l'essentiel des étapes de synthèse industrielle de médicaments, de parfums ou de polymères fait encore appel, directement ou par l'intermédiaire de variantes plus douces (organocuprates), au même principe fondamental : un carbanion métallé qui vient s'additionner sur un carbone électrophile.</p>

    <p>La construction du squelette carboné d'une molécule cible repose très souvent sur la formation d'une liaison C–C par addition d'un carbanion (réel ou stabilisé par un métal) sur un électrophile carbonylé. Les <strong>réactifs organométalliques</strong> sont les outils les plus directs pour cela.</p>

    <h3>1. Polarité C–métal et échelle de réactivité</h3>
    <p>Dans une liaison carbone-métal, le carbone porte une charge partielle négative d'autant plus marquée que le métal est électropositif. Le lithium et le magnésium, très électropositifs, donnent des organométalliques fortement nucléophiles <em>et</em> fortement basiques ; le cuivre, moins électropositif, donne des organocuprates plus doux, moins basiques, à réactivité modulée.</p>
    <table class="mini-table">
      <tr><th>Réactif</th><th>Formule type</th><th>Nucléophilie / basicité</th><th>Préparation typique</th></tr>
      <tr><td>Organolithien</td><td>R–Li</td><td>très élevée</td><td>Li métallique + R–X, ou échange halogène-métal (n-BuLi + R–Br)</td></tr>
      <tr><td>Organomagnésien (Grignard)</td><td>R–MgX</td><td>élevée</td><td>Mg métallique + R–X dans l'éther anhydre</td></tr>
      <tr><td>Organocuprate (Gilman)</td><td>R2CuLi</td><td>modérée, plus douce</td><td>R-Li + CuI (ou CuBr·SMe2)</td></tr>
    </table>

    <h3>2. Addition sur les carbonyles simples</h3>
    <p>Sur un aldéhyde ou une cétone, l'organomagnésien ou l'organolithien s'additionne au carbone électrophile du carbonyle : l'alcoolate magnésien ou lithié formé est ensuite protoné par hydrolyse acide, donnant un <strong>alcool</strong> (secondaire à partir d'un aldéhyde, tertiaire à partir d'une cétone). Sur un ester, le mécanisme se déroule en <strong>deux additions successives</strong> : la première expulse l'alcoolate (groupe partant de l'ester) pour redonner une cétone intermédiaire, qui réagit à son tour avec un second équivalent d'organométallique — le produit final est donc un <strong>alcool tertiaire</strong> portant deux fois le même groupe R issu du réactif, même en partant d'un seul équivalent apparent (l'excès de réactif est nécessaire).</p>
    <div class="formula-box">$$R\text{-}MgX + R'CHO \longrightarrow R'CH(OMgX)R \\xrightarrow{H_3O^+} R'CH(OH)R$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Les organomagnésiens et organolithiens réagissent aussi avec le CO2 (formation d'un acide carboxylique après hydrolyse) et avec les époxydes (ouverture nucléophile, formation d'un alcool avec allongement de chaîne de deux carbones) — deux extensions stratégiques classiques en rétrosynthèse.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Grignard a découvert la réactivité de son réactif envers les carbonyles, mais celui-ci réagit tout aussi violemment avec l'eau et le CO2 de l'air. Qu'est-ce que cette double réactivité — utile face au bon électrophile, destructrice face à l'humidité — vous apprend sur les précautions expérimentales qu'imposait déjà, dès 1900, la manipulation de ce réactif ?
    </div>

    <h3>3. Addition 1,2 contre addition 1,4 sur les énones</h3>
    <p>Sur une cétone α,β-insaturée (énone), deux sites électrophiles sont en compétition : le carbone carbonylé (addition <strong>1,2</strong>, directe) et le carbone β de la double liaison, activé par conjugaison (addition <strong>1,4</strong>, ou addition de Michael). Le choix du réactif organométallique contrôle la sélectivité :</p>
    <table class="mini-table">
      <tr><th>Réactif</th><th>Mode d'addition privilégié</th><th>Produit</th></tr>
      <tr><td>Organolithien R-Li</td><td>1,2 (dur, contrôle cinétique sur le carbonyle)</td><td>alcool allylique</td></tr>
      <tr><td>Organomagnésien R-MgX</td><td>1,2 majoritaire (mélange possible selon l'encombrement)</td><td>alcool allylique (majoritaire)</td></tr>
      <tr><td>Organocuprate R2CuLi (Gilman)</td><td>1,4 (mou, addition conjuguée sélective)</td><td>cétone saturée en β-substituée</td></tr>
    </table>
    <p>Cette sélectivité s'interprète par la théorie HSAB (acides et bases durs/mous) : le carbone carbonylé est un électrophile « dur », le carbone β conjugué un électrophile « mou ». Les organolithiens et organomagnésiens, nucléophiles « durs », attaquent préférentiellement le carbonyle ; le cuivre, moins électronégatif, rend l'organocuprate plus « mou » et donc plus sélectif pour l'addition conjuguée 1,4. C'est la raison pour laquelle les réactifs de Gilman sont l'outil de choix en synthèse chaque fois qu'une addition 1,4 propre est recherchée.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le réactif de Grignard originel (R-MgX) et le réactif de Gilman (R2CuLi), bien que tous deux porteurs d'un carbanion R, réagissent différemment sur une même énone. Qu'est-ce que cela vous apprend sur l'importance du métal lui-même — et pas seulement du groupe carboné R — dans la réactivité d'un organométallique ?
    </div>

    <h3>4. Compatibilité fonctionnelle</h3>
    <p>Les organométalliques de lithium et de magnésium sont de bases très fortes : ils réagissent immédiatement, par simple transfert de proton, avec tout groupe possédant un hydrogène acide — alcool (OH), amine N–H, acide carboxylique — avant même d'atteindre l'électrophile carbonylé visé. Toute fonction de ce type ailleurs dans la molécule doit donc être <strong>protégée</strong> avant l'étape organométallique (voir chapitre précédent), sous peine de simplement neutraliser le réactif sans former la liaison C–C recherchée.</p>

    <h3>5. Utilisation stratégique en rétrosynthèse</h3>
    <p>La formation d'une liaison C–C par organométallique est l'une des déconnexions les plus puissantes de l'analyse rétrosynthétique : tout alcool secondaire ou tertiaire de la cible peut se retracer vers un carbonyle et un organométallique, avec un choix orienté par le mode d'addition (1,2 ou 1,4) souhaité et par les fonctions à protéger sur le reste de la molécule.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>R-Li et R-MgX : très nucléophiles et très basiques, addition 1,2 privilégiée sur les carbonyles et les énones</li>
        <li>R2CuLi (Gilman) : réactif « mou », addition 1,4 (conjuguée) sélective sur les énones</li>
        <li>Ester + 2 équiv. d'organométallique → alcool tertiaire (deux additions successives, via une cétone intermédiaire)</li>
        <li>Tout OH, NH acide, ou acide carboxylique ailleurs sur la molécule doit être protégé avant l'étape organométallique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier qu'un organomagnésien réagit avec l'eau, le CO2 atmosphérique et l'humidité : la verrerie et les solvants doivent être rigoureusement anhydres</li>
        <li>Prévoir un alcool secondaire à partir d'un ester : c'est un alcool tertiaire qui se forme, par double addition</li>
        <li>Utiliser un organolithien quand une addition 1,4 propre est recherchée : préférer un organocuprate de Gilman</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'action de CH3MgBr (excès) sur l'éthanoate d'éthyle (CH3COOEt), suivie d'hydrolyse acide, donne :</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn3e1" value="wrong"> Un alcool primaire</label>
          <label class="option"><input type="radio" name="syn3e1" value="wrong"> Un alcool secondaire</label>
          <label class="option"><input type="radio" name="syn3e1" value="right"> Un alcool tertiaire : le 2-méthylpropan-2-ol</label>
          <label class="option"><input type="radio" name="syn3e1" value="wrong"> Une cétone</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn3e1','syn3fb1','Correct — la première addition expulse l\\'éthanolate et forme l\\'acétone intermédiaire, qui réagit avec un second équivalent de CH3MgBr : on obtient (CH3)3C-OH, un alcool tertiaire.','Un ester réagit deux fois avec l\\'organomagnésien : la première addition libère un groupe partant et forme une cétone intermédiaire.')">Vérifier</button>
        <div class="feedback" id="syn3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour effectuer une addition 1,4 sélective sur la cyclohexénone, quel réactif choisit-on ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn3e2" value="wrong"> CH3Li</label>
          <label class="option"><input type="radio" name="syn3e2" value="right"> (CH3)2CuLi (réactif de Gilman)</label>
          <label class="option"><input type="radio" name="syn3e2" value="wrong"> CH3MgBr</label>
          <label class="option"><input type="radio" name="syn3e2" value="wrong"> NaBH4</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn3e2','syn3fb2','Correct — les organocuprates de Gilman sont des nucléophiles « mous » qui s\\'additionnent sélectivement en 1,4 sur les énones, contrairement aux organolithiens et organomagnésiens qui attaquent surtout le carbonyle (1,2).','Cherche le réactif organométallique réputé pour son addition conjuguée sélective sur les énones.')">Vérifier</button>
        <div class="feedback" id="syn3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une molécule porte un alcool libre et un aldéhyde à faire réagir avec un organolithien. Que faut-il faire avant l'addition ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn3e3" value="wrong"> Rien, l'organolithien réagit sélectivement avec l'aldéhyde</label>
          <label class="option"><input type="radio" name="syn3e3" value="right"> Protéger l'alcool (par exemple en éther silylé) avant l'étape organométallique</label>
          <label class="option"><input type="radio" name="syn3e3" value="wrong"> Oxyder l'alcool en cétone</label>
          <label class="option"><input type="radio" name="syn3e3" value="wrong"> Ajouter un excès d'eau pour neutraliser le réactif</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn3e3','syn3fb3','Correct — l\\'organolithien, base très forte, déprotonerait immédiatement l\\'alcool (réaction acide-base rapide) au lieu de s\\'additionner sur l\\'aldéhyde : l\\'alcool doit être protégé au préalable.','Un organolithien est à la fois un nucléophile fort et une base très forte : que se passe-t-il face à un hydrogène acide comme celui d\\'un OH ?')">Vérifier</button>
        <div class="feedback" id="syn3fb3"></div>
      </div>
    </div>

    <div class="frontier-box">
      <span class="eyebrow">🔭 Frontière de la recherche</span>
      <p>La grande sensibilité à l'humidité qui obligeait déjà Grignard à travailler sous éther anhydre limite encore aujourd'hui l'usage industriel des organométalliques les plus réactifs (organolithiens en particulier, souvent trop instables pour être stockés). Des procédés de <strong>chimie en flux continu</strong> (<em>flash chemistry</em>) permettent désormais de générer ces espèces extrêmement réactives juste avant leur utilisation, dans un réacteur miniaturisé, et de les faire réagir en quelques millisecondes avant qu'elles n'aient le temps de se décomposer. Une question de recherche reste ouverte : jusqu'où cette approche peut-elle rendre exploitables, à l'échelle industrielle, des organométalliques aujourd'hui jugés « trop instables pour être isolés » en conditions classiques ?</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">📐 Synthèse visuelle</span>
      <p>Métal électropositif (Li, Mg, puis transmétallation au Cu) + halogénure d'alkyle → <strong>organométallique</strong> (carbanion métallé) → nucléophilie/basicité décroissante Li > Mg > Cu → addition sur carbonyle simple (1 addition → alcool 2°/3°) ou sur ester (2 additions successives → alcool tertiaire) ou sur énone (1,2 « dur » pour Li/Mg, 1,4 « mou » pour Cu, théorie HSAB) → hydrolyse acide (H₃O⁺) → produit final ; toute fonction à hydrogène acide doit être protégée en amont (chapitre précédent)</p>
      <p><strong>Équation clé du chapitre :</strong></p>
      <div class="formula-box">$$R\\text{-}MgX + R'CHO \\longrightarrow R'CH(OMgX)R \\xrightarrow{H_3O^+} R'CH(OH)R$$</div>
    </div>

    <div class="reflection-box">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Grignard avait travaillé avec du sodium métallique plutôt que du magnésium — la réactivité du carbanion obtenu aurait-elle été plus douce, plus violente, ou incomparable, sachant que le sodium est encore plus électropositif ?</li>
        <li>Pourquoi une seule et même famille de réactifs (les organométalliques de lithium et de magnésium) est-elle à la fois l'un des outils les plus puissants de la synthèse organique et l'une des plus dangereuses à manipuler en présence d'humidité ?</li>
        <li>Quelle serait la conséquence, sur le produit final, de l'oubli d'un excès suffisant d'organomagnésien lors de l'attaque d'un ester, alors que la réaction nécessite formellement deux équivalents ?</li>
      </ul>
    </div>

    <div class="biblio-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>V. Grignard, <em>Sur quelques nouvelles combinaisons organométalliques du magnésium et leur application à des synthèses d'alcools et d'hydrocarbures</em>, Comptes Rendus de l'Académie des Sciences, 1900 — la note originale annonçant la découverte.</li>
        <li>J. Clayden, N. Greeves, S. Warren, <em>Organic Chemistry</em>, Oxford University Press — référence standard de niveau L3/master pour ce chantier de synthèse organique.</li>
        <li>J. Yoshida, <em>Flash Chemistry: Fast Organic Synthesis in Microsystems</em>, Wiley-Blackwell, 2008 — pour la chimie en flux continu évoquée en Frontière de la recherche.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais manier le carbanion métallé que Grignard a mis entre les mains des chimistes il y a plus d'un siècle. Il existe pourtant une autre façon, tout aussi puissante, de générer un carbanion sans passer par un métal externe : direction le chapitre suivant, avec la chimie des énolates.</p>
  `
};

SYNTH_NOVA_KB[synKey("Formation de liaisons C-C par les réactifs organométalliques")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Organométalliques et liaisons C-C ». Demande-moi la différence entre addition 1,2 et 1,4, pourquoi un ester donne un alcool tertiaire, ou un indice sur un exercice.",
  rules: [
    { test:/1,2|1,4|gilman|cuprate/i, replies:["Les organolithiens et organomagnésiens (nucléophiles durs) s'additionnent en 1,2 sur les énones (attaque du carbonyle). Les organocuprates de Gilman R2CuLi (nucléophiles mous) s'additionnent sélectivement en 1,4 (addition conjuguée)."] },
    { test:/ester.*(alcool|magn[ée]sien)|alcool tertiaire/i, replies:["Un ester réagit deux fois avec un organomagnésien en excès : la première addition libère le groupe partant et forme une cétone intermédiaire, qui réagit à son tour — le produit final est un alcool tertiaire."] },
    { test:/anhydre|humidit[ée]|eau/i, replies:["Les organomagnésiens et organolithiens réagissent violemment avec l'eau (protonation immédiate) : toute la verrerie et les solvants doivent être rigoureusement anhydres, sous atmosphère inerte."] },
    { test:/compatibilit[ée]|prot[ée]ger/i, replies:["Tout groupe portant un hydrogène acide (OH, NH) doit être protégé avant une étape organométallique, sinon le réactif est simplement neutralisé par acide-base au lieu de former la liaison C-C voulue."] },
    { test:/hsab|dur|mou/i, replies:["La théorie HSAB explique la sélectivité 1,2/1,4 : le carbonyle est un électrophile dur, le carbone β conjugué un électrophile mou. Les nucléophiles durs (Li, Mg) préfèrent le carbonyle ; les nucléophiles mous (Cu) préfèrent le carbone β."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : un ester réagit deux fois avec l'organomagnésien.","Indice niveau 2 : la première addition forme une cétone intermédiaire.","Indice niveau 3 : la seconde addition donne un alcool tertiaire, (CH3)3C-OH."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : cherche un réactif « mou », pas un organolithien classique.","Indice niveau 2 : c'est un organocuprate.","Indice niveau 3 : (CH3)2CuLi, le réactif de Gilman."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : un organolithien est aussi une base très forte.","Indice niveau 2 : il réagirait d'abord avec l'hydrogène acide de l'alcool.","Indice niveau 3 : il faut protéger l'alcool avant l'étape organométallique."] }
  ]
};


/* =========================== CHAPITRE 4 =========================== */
SYNTH_CHAPTERS[synKey("Chimie des énolates : alkylation et réactions de condensation")] = {
  objectives: [
    "Expliquer l'acidité des hydrogènes en α d'un carbonyle et le mécanisme d'énolisation",
    "Distinguer contrôle cinétique et contrôle thermodynamique dans la formation d'un énolate régiosélectif",
    "Utiliser un énolate préformé pour réaliser une alkylation ou une aldolisation dirigée",
    "Décrire les mécanismes des condensations aldolique, de Claisen et de Mannich et leurs produits",
    "Retracer la découverte quasi simultanée de la réaction d'aldolisation par Wurtz et Borodine (1872) et son évolution vers l'aldolisation dirigée moderne (modèle de Zimmerman-Traxler)"
  ],
  prereqs: ["Formation de liaisons C-C par les réactifs organométalliques", "Réactivité des carbonyles"],
  bodyHtml: `
    <p>En 1872, deux chimistes travaillant indépendamment — le Français Charles-Adolphe Wurtz et le Russe <strong>Alexandre Borodine</strong> — décrivent presque simultanément la même transformation : deux molécules d'un aldéhyde s'associent pour former un composé portant à la fois une fonction aldéhyde et une fonction alcool, l'<em>aldol</em> (contraction d'ALDéhyde et alcOOL). Borodine, chimiste réputé à Saint-Pétersbourg, est aussi resté dans l'histoire pour une tout autre raison : compositeur à ses heures perdues, il est l'auteur du <em>Prince Igor</em> et des <em>Danses polovtsiennes</em> — l'une des rares personnalités scientifiques à avoir laissé une trace durable dans deux disciplines aussi éloignées.</p>

    <p>Cette réaction de condensation, découverte sur un aldéhyde simple, est devenue l'une des méthodes les plus générales et les plus étudiées de formation de liaisons C–C en chimie organique, bien au-delà de son cas d'origine.</p>

    <p>Les hydrogènes portés par un carbone en α d'un groupe carbonyle sont anormalement acides (pKa de l'ordre de 20 pour une cétone simple, contre ~50 pour un alcane) car leur départ génère un <strong>énolate</strong>, stabilisé par délocalisation de la charge négative sur l'oxygène du carbonyle. Cette réactivité fait de la position α l'un des sites de construction de liaisons C–C les plus exploités en synthèse.</p>

    <h3>1. Énolisation et double nucléophilie de l'énolate</h3>
    <p>Un énolate possède deux sites nucléophiles : l'oxygène (chargé négativement dans la forme mésomère dominante) et le carbone α (porteur d'une partie de la densité électronique). La plupart des réactions de synthèse exploitent la <strong>nucléophilie du carbone</strong>, qui forme une nouvelle liaison C–C avec un électrophile.</p>

    <h3>2. Contrôle cinétique contre contrôle thermodynamique</h3>
    <p>Une cétone dissymétrique (par exemple la 2-méthylcyclohexanone) peut s'énoliser de deux façons, donnant deux énolates régioisomères. Le choix des conditions détermine lequel se forme majoritairement :</p>
    <table class="mini-table">
      <tr><th>Conditions</th><th>Base / température</th><th>Énolate obtenu</th><th>Interprétation</th></tr>
      <tr><td>Contrôle cinétique</td><td>LDA (base forte, très encombrée), THF, −78 °C, addition lente et irréversible</td><td>énolate le moins substitué</td><td>arrachement du H le plus accessible stériquement, le plus rapide</td></tr>
      <tr><td>Contrôle thermodynamique</td><td>NaOEt ou NaOH, température ambiante, équilibre acide-base réversible</td><td>énolate le plus substitué</td><td>l'énolate le plus stable (le plus conjugué) prédomine à l'équilibre</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le <strong>LDA</strong> (diisopropylamidure de lithium) est la base de choix pour un contrôle cinétique : très encombrée, elle ne peut déprotoner que l'hydrogène le plus accessible, et sa base conjuguée (diisopropylamine, pKa ≈ 36) est bien trop faible pour redéprotoner la cétone de départ — la réaction est donc irréversible, ce qui fige la régiosélectivité cinétique.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Wurtz et Borodine travaillaient sur un aldéhyde simple, sans aucun moyen de contrôler la régiosélectivité d'une cétone dissymétrique comme on le fait aujourd'hui avec le LDA. Qu'est-ce que l'existence même de la distinction contrôle cinétique/contrôle thermodynamique vous apprend sur les progrès réalisés depuis la découverte originelle de 1872 ?
    </div>

    <h3>3. Alkylation d'un énolate préformé</h3>
    <p>Une fois l'énolate régiosélectivement formé (par LDA à basse température, généralement), on ajoute un électrophile — le plus souvent un halogénure d'alkyle primaire — qui réagit par substitution nucléophile SN2 sur le carbone α de l'énolate. Cette méthode « dirigée » (formation de l'énolate séparément, puis ajout de l'électrophile) est bien plus contrôlée qu'une simple alkylation en milieu basique en équilibre, qui conduirait à un mélange de mono- et polyalkylation sur les deux positions α possibles.</p>

    <h3>4. Condensation aldolique</h3>
    <p>Un énolate s'additionne sur le carbonyle électrophile d'un aldéhyde ou d'une cétone (y compris une autre molécule du même composé, ou une molécule différente si l'on parle d'aldolisation croisée) pour former un <strong>aldol</strong> (β-hydroxycarbonylé), qui peut ensuite se déshydrater (élimination E1cb) en énone conjuguée. Réalisée sans contrôle particulier, cette réaction sur un mélange de deux carbonyles différents donne un mélange complexe de quatre produits possibles ; on lui préfère en synthèse l'<strong>aldolisation dirigée</strong> : formation stœchiométrique de l'énolate d'un seul partenaire (souvent par LDA), puis addition contrôlée de l'autre carbonyle.</p>
    <div class="formula-box">$$\text{Énolate} + R'CHO \longrightarrow \text{aldol (}\beta\text{-hydroxycétone)} \\xrightarrow{-H_2O} \text{énone}$$</div>
    <p>La stéréochimie relative (syn ou anti) de l'aldol formé est rationalisée par le modèle de l'<strong>état de transition cyclique de Zimmerman-Traxler</strong> : l'énolate métallé (souvent bore ou lithium) et l'aldéhyde s'organisent en un cycle à six chaînons de type chaise, où les substituants s'orientent préférentiellement en position équatoriale, imposant une relation stéréochimique prévisible entre le nouveau centre hydroxylé et le substituant α de l'énolate.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le modèle de Zimmerman-Traxler prédit la stéréochimie relative de l'aldol à partir de la géométrie d'un état de transition à six chaînons en chaise. Qu'est-ce que le succès de ce modèle vous suggère sur le lien entre la conformation adoptée pendant la réaction elle-même et le résultat stéréochimique final, plutôt que sur la seule structure des produits de départ ?
    </div>

    <h3>5. Condensation de Claisen</h3>
    <p>La condensation de Claisen est l'équivalent de l'aldolisation appliqué aux <strong>esters</strong> : un énolate d'ester attaque le carbone carbonylé d'un second ester, expulsant l'alcoolate (groupe partant) pour former un <strong>β-cétoester</strong>. Contrairement à l'aldolisation, cette réaction est rendue irréversible par une étape supplémentaire : le β-cétoester formé, très acide (pKa ≈ 11, stabilisé par les deux groupes carbonyles), est immédiatement déprotoné par la base (NaOEt) présente en excès, ce qui déplace l'équilibre vers les produits. La <strong>Claisen croisée dirigée</strong>, entre un donneur d'énolate et un accepteur non énolisable (ester du benzoate, carbonate de diéthyle), permet un contrôle strict du produit formé, à l'image de l'aldolisation dirigée.</p>

    <h3>6. Réaction de Mannich</h3>
    <p>La réaction de Mannich met en jeu un <strong>ion iminium</strong> (formé in situ à partir d'un aldéhyde, souvent le formaldéhyde, et d'une amine secondaire), électrophile plus réactif qu'un simple carbonyle. Un énolate (ou un composé énolisable en catalyse acide) attaque cet iminium pour former une <strong>β-aminocétone</strong>, précurseur classique d'énones par élimination de Hofmann de l'amine (formation d'une amine tertiaire quaternisée, puis élimination) — une voie douce d'accès aux méthylène-cétones α,β-insaturées.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>LDA, −78 °C → énolate cinétique (moins substitué) ; base faible, équilibre → énolate thermodynamique (plus substitué)</li>
        <li>Aldolisation dirigée : énolate préformé + carbonyle séparé → contrôle du produit croisé, stéréochimie via Zimmerman-Traxler</li>
        <li>Claisen : équivalent de l'aldolisation sur les esters, rendue irréversible par la déprotonation finale du β-cétoester acide</li>
        <li>Mannich : addition d'un énolate sur un ion iminium → β-aminocétone, précurseur d'énones</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre l'énolate cinétique et l'énolate thermodynamique : le premier est le moins substitué, le second le plus substitué</li>
        <li>Oublier l'étape de déprotonation finale qui rend la Claisen irréversible : sans elle, l'équilibre resterait défavorable</li>
        <li>Réaliser une aldolisation croisée sans contrôle (deux carbonyles énolisables mélangés directement) : cela donne un mélange de produits, pas un aldol unique</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour former sélectivement l'énolate le moins substitué d'une cétone dissymétrique, on utilise :</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn4e1" value="wrong"> NaOH aqueux à chaud</label>
          <label class="option"><input type="radio" name="syn4e1" value="right"> LDA, THF, −78 °C</label>
          <label class="option"><input type="radio" name="syn4e1" value="wrong"> NaOEt à température ambiante, plusieurs heures</label>
          <label class="option"><input type="radio" name="syn4e1" value="wrong"> H2SO4 concentré</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn4e1','syn4fb1','Correct — le LDA à basse température impose un contrôle cinétique irréversible : il arrache l\\'hydrogène le plus accessible, formant l\\'énolate le moins substitué.','Cherche la base forte, très encombrée, utilisée à basse température pour un contrôle cinétique.')">Vérifier</button>
        <div class="feedback" id="syn4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Qu'est-ce qui rend la condensation de Claisen irréversible, contrairement à une simple estérification ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn4e2" value="wrong"> La haute température de la réaction</label>
          <label class="option"><input type="radio" name="syn4e2" value="right"> La déprotonation finale du β-cétoester formé, très acide, par la base en excès</label>
          <label class="option"><input type="radio" name="syn4e2" value="wrong"> L'utilisation d'un catalyseur au palladium</label>
          <label class="option"><input type="radio" name="syn4e2" value="wrong"> L'élimination d'eau</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn4e2','syn4fb2','Correct — le β-cétoester formé (pKa ≈ 11) est immédiatement déprotoné par l\\'alcoolate en excès, ce qui déplace l\\'équilibre de façon irréversible vers les produits.','Pense à l\\'acidité particulière du produit formé, entre les deux groupes carbonyles.')">Vérifier</button>
        <div class="feedback" id="syn4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans la réaction de Mannich, quel est l'électrophile attaqué par l'énolate ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn4e3" value="wrong"> Un halogénure d'alkyle</label>
          <label class="option"><input type="radio" name="syn4e3" value="right"> Un ion iminium, formé in situ à partir d'un aldéhyde et d'une amine secondaire</label>
          <label class="option"><input type="radio" name="syn4e3" value="wrong"> Un époxyde</label>
          <label class="option"><input type="radio" name="syn4e3" value="wrong"> Le CO2</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn4e3','syn4fb3','Correct — l\\'ion iminium, plus électrophile qu\\'un carbonyle simple, est formé in situ puis attaqué par l\\'énolate pour donner une β-aminocétone.','L\\'électrophile de la réaction de Mannich contient un azote chargé positivement, issu de la condensation d\\'une amine sur un aldéhyde.')">Vérifier</button>
        <div class="feedback" id="syn4fb3"></div>
      </div>
    </div>

    <div class="frontier-box">
      <span class="eyebrow">🔭 Frontière de la recherche</span>
      <p>En 2000, plus d'un siècle après la découverte de Wurtz et Borodine, les chimistes Benjamin List, Richard Lerner et Carlos Barbas III montrent qu'un simple acide aminé, la <strong>proline</strong>, catalyse une aldolisation directe et <strong>énantiosélective</strong> entre deux carbonyles, sans nécessiter la formation stœchiométrique d'un énolate métallé préalable. Cette découverte a fondé tout un pan de la chimie moderne, l'<strong>organocatalyse</strong>, où de petites molécules organiques (souvent dérivées d'acides aminés) remplacent les catalyseurs métalliques traditionnels. Une question de recherche reste ouverte : ces catalyseurs organiques, remarquablement efficaces sur des aldolisations simples, peuvent-ils atteindre le même niveau de sélectivité sur des substrats bien plus encombrés, typiques de la synthèse totale de produits naturels complexes ?</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">📐 Synthèse visuelle</span>
      <p>Carbonyle → H en α acide (pKa ≈ 20) → déprotonation → <strong>énolate</strong> (nucléophile en O ou en C) → choix des conditions : LDA / −78 °C → énolate <strong>cinétique</strong> (moins substitué) ou base faible / équilibre → énolate <strong>thermodynamique</strong> (plus substitué) → alkylation (SN2 sur R-X) ou addition sur un carbonyle (aldolisation, stéréochimie via Zimmerman-Traxler) ou sur un ester (Claisen, irréversible par déprotonation finale) ou sur un iminium (Mannich) → nouvelle liaison C–C</p>
      <p><strong>Équation clé du chapitre :</strong></p>
      <div class="formula-box">$$\\text{Énolate} + R'CHO \\longrightarrow \\text{aldol (}\\beta\\text{-hydroxycétone)} \\xrightarrow{-H_2O} \\text{énone}$$</div>
    </div>

    <div class="reflection-box">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Borodine n'avait consacré son temps qu'à la musique — quelqu'un d'autre aurait-il nécessairement découvert la réaction d'aldolisation à sa place, sachant que Wurtz y est arrivé au même moment de façon indépendante ?</li>
        <li>Pourquoi la condensation de Claisen a-t-elle besoin d'une étape supplémentaire (la déprotonation finale du β-cétoester) pour devenir irréversible, alors que l'aldolisation simple ne l'exige pas ?</li>
        <li>Quelle serait la conséquence, sur le produit obtenu, d'un mélange direct et sans contrôle de deux cétones énolisables différentes dans une tentative d'aldolisation croisée ?</li>
      </ul>
    </div>

    <div class="biblio-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>C.A. Wurtz, <em>Sur un aldéhyde-alcool</em>, Comptes Rendus de l'Académie des Sciences, 1872 — l'une des deux publications quasi simultanées fondatrices de la réaction d'aldolisation.</li>
        <li>F. Carey, R. Sundberg, <em>Advanced Organic Chemistry</em>, Springer — référence standard de niveau L3/master pour les mécanismes de condensation de ce chapitre.</li>
        <li>B. List, R.A. Lerner, C.F. Barbas III, <em>Proline-Catalyzed Direct Asymmetric Aldol Reactions</em>, Journal of the American Chemical Society, 2000 — l'article fondateur de l'organocatalyse évoqué en Frontière de la recherche.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais exploiter la position α d'un carbonyle comme Wurtz et Borodine l'ont fait, chacun de leur côté, en 1872. Il existe une autre façon, tout aussi élégante, de transformer un carbonyle en liaison C=C : direction le chapitre suivant, avec l'oléfination de Wittig.</p>
  `
};

SYNTH_NOVA_KB[synKey("Chimie des énolates : alkylation et réactions de condensation")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Chimie des énolates ». Demande-moi la différence entre contrôle cinétique et thermodynamique, comment marche la condensation de Claisen, ou un indice sur un exercice.",
  rules: [
    { test:/cin[ée]tique|thermodynamique/i, replies:["Contrôle cinétique (LDA, −78 °C, base encombrée, irréversible) → énolate le moins substitué. Contrôle thermodynamique (base faible, équilibre, température ambiante) → énolate le plus substitué, le plus stable."] },
    { test:/lda/i, replies:["Le LDA (diisopropylamidure de lithium) est une base forte mais très encombrée et peu nucléophile : elle déprotone rapidement le carbone α le plus accessible, et sa base conjuguée est trop faible pour redéprotoner — la réaction est donc irréversible."] },
    { test:/aldol|zimmerman/i, replies:["L'aldolisation dirigée forme d'abord l'énolate d'un seul partenaire, puis l'additionne sur un carbonyle séparé. Le modèle de Zimmerman-Traxler (état de transition cyclique à six chaînons) explique la stéréochimie syn/anti du produit."] },
    { test:/claisen/i, replies:["La condensation de Claisen est l'analogue de l'aldolisation sur les esters : elle forme un β-cétoester. Elle est rendue irréversible par la déprotonation finale du β-cétoester, très acide, par la base en excès."] },
    { test:/mannich/i, replies:["La réaction de Mannich fait réagir un énolate avec un ion iminium (formé à partir d'un aldéhyde et d'une amine secondaire) pour donner une β-aminocétone, précurseur d'énones par élimination."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : cherche la base encombrée utilisée à froid pour un contrôle cinétique.","Indice niveau 2 : c'est une base à base d'azote, très encombrée.","Indice niveau 3 : LDA, THF, −78 °C."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le produit formé (β-cétoester) est particulièrement acide.","Indice niveau 2 : il est déprotoné immédiatement par la base en excès.","Indice niveau 3 : cette déprotonation finale déplace l'équilibre vers les produits, rendant la réaction irréversible."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : l'électrophile contient un azote chargé positivement.","Indice niveau 2 : il vient de la condensation d'un aldéhyde et d'une amine secondaire.","Indice niveau 3 : c'est un ion iminium."] }
  ]
};

/* =========================== CHAPITRE 5 =========================== */
SYNTH_CHAPTERS[synKey("Oléfination : Wittig, HWE et méthodes apparentées")] = {
  objectives: [
    "Décrire le mécanisme de la réaction de Wittig, de l'ylure au produit final via l'oxaphosphétane",
    "Prévoir la stéréosélectivité Z ou E selon la nature de l'ylure (non stabilisé, semi-stabilisé, stabilisé)",
    "Décrire la réaction de Horner-Wadsworth-Emmons (HWE) et sa sélectivité E complémentaire du Wittig classique",
    "Situer la réaction de Julia-Kocienski parmi les méthodes d'oléfination stéréosélective",
    "Expliquer comment une observation accidentelle de Wittig en 1954 est devenue un procédé industriel produisant plusieurs tonnes par an de vitamine A"
  ],
  prereqs: ["Chimie des énolates : alkylation et réactions de condensation", "Réactivité des dérivés carbonylés"],
  bodyHtml: `
    <p>La réaction de <strong>Wittig</strong> naît presque par accident en 1954, lorsque le chimiste allemand Georg Wittig, alors qu'il étudie la chimie du phosphore pentavalent, observe qu'un ylure de phosphore réagit avec un carbonyle pour former un alcène là où il n'attendait pas du tout ce résultat. Généralisée dans les années qui suivent, cette découverte lui vaudra le prix Nobel de chimie 1979 (partagé avec Herbert C. Brown, pour ses travaux sur les organoboranes).</p>

    <p>Loin de rester une curiosité de laboratoire, la réaction de Wittig est devenue un outil industriel de premier plan : la vitamine A et plusieurs caroténoïdes sont aujourd'hui produits à l'échelle de plusieurs tonnes par an grâce à des réactions de Wittig successives, précisément parce qu'elle permet de contrôler la géométrie Z ou E de chaque double liaison formée.</p>

    <p>La déconnexion d'une double liaison C=C est l'une des plus utiles en rétrosynthèse, car elle donne directement accès à deux fragments carbonylés simples. La réaction de Wittig et ses variantes modernes réalisent cette transformation de façon fiable et souvent stéréosélective.</p>

    <h3>1. Formation de l'ylure de phosphore</h3>
    <p>Un halogénure d'alkyle réagit avec une phosphine (le plus souvent PPh3) pour former un <strong>sel de phosphonium</strong>, qui est ensuite déprotoné en α du phosphore par une base forte (n-BuLi, NaH ou KOtBu) pour donner l'<strong>ylure de phosphore</strong> — une espèce à la fois carbanion stabilisé et ion phosphonium, représentée par deux formes mésomères (ylure/ylène).</p>
    <div class="formula-box">$$Ph_3P + R\text{-}CH_2X \longrightarrow Ph_3P^+\text{-}CH_2R\, X^- \\xrightarrow{base} Ph_3P=CHR$$</div>

    <h3>2. Mécanisme : oxaphosphétane et élimination syn</h3>
    <p>L'ylure attaque le carbone électrophile d'un aldéhyde ou d'une cétone pour former un intermédiaire cyclique à quatre chaînons, l'<strong>oxaphosphétane</strong>, qui se fragmente ensuite par une <strong>rétro-[2+2] concertée</strong> : la liaison C–C reste, la liaison P–O se forme complètement, libérant l'alcène et l'oxyde de triphénylphosphine (Ph3P=O) — la force de la liaison P=O est la véritable force motrice thermodynamique de toute la réaction.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 120" width="100%">
          <rect x="70" y="20" width="70" height="55" rx="6" fill="none" stroke="#3D6BF0" stroke-width="2"/>
          <text x="80" y="45" font-family="IBM Plex Mono" font-size="11" fill="#122043">P</text>
          <text x="120" y="45" font-family="IBM Plex Mono" font-size="11" fill="#122043">C</text>
          <text x="120" y="65" font-family="IBM Plex Mono" font-size="11" fill="#122043">C</text>
          <text x="80" y="65" font-family="IBM Plex Mono" font-size="11" fill="#122043">O</text>
          <text x="30" y="50" font-family="IBM Plex Mono" font-size="10" fill="#8064F2">oxaphosphétane</text>
          <text x="105" y="98" font-family="IBM Plex Mono" font-size="16" fill="#F0555C">↓ rétro-[2+2]</text>
          <text x="20" y="115" font-family="IBM Plex Mono" font-size="10" fill="#1FB6A8">alcène  +  Ph3P=O</text>
        </svg>
        <span>L'oxaphosphétane se fragmente en alcène et oxyde de phosphine</span>
      </div>
    </div>

    <h3>3. Stéréosélectivité : le rôle de la nature de l'ylure</h3>
    <table class="mini-table">
      <tr><th>Type d'ylure</th><th>Exemple</th><th>Stéréosélectivité obtenue</th></tr>
      <tr><td>Non stabilisé</td><td>Ph3P=CH-alkyle (R = alkyle simple)</td><td>alcène Z majoritaire (voie cinétique, oxaphosphétane cis favorisé)</td></tr>
      <tr><td>Semi-stabilisé</td><td>Ph3P=CH-CH=CH2 (allylique, benzylique)</td><td>mélange Z/E peu sélectif</td></tr>
      <tr><td>Stabilisé</td><td>Ph3P=CH-CO2Et (ester, conjugué)</td><td>alcène E majoritaire (équilibration réversible vers l'oxaphosphétane le plus stable)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La règle empirique à retenir : <strong>ylure non stabilisé → alcène Z</strong>, <strong>ylure stabilisé → alcène E</strong>. Le premier cas correspond à une addition rapide et irréversible (contrôle cinétique, formation préférentielle de l'oxaphosphétane cis) ; le second à une addition réversible qui laisse le temps à l'équilibre de favoriser l'oxaphosphétane trans, thermodynamiquement plus stable, et donc à l'alcène E.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Wittig a d'abord observé sa réaction sans en comprendre immédiatement toute la richesse stéréochimique. Qu'est-ce que la distinction ylure stabilisé/non stabilisé, découverte plus tard, vous apprend sur le temps qu'il faut parfois entre l'observation initiale d'une réaction et sa maîtrise complète en synthèse ?
    </div>

    <h3>4. Réaction de Horner-Wadsworth-Emmons (HWE)</h3>
    <p>La variante HWE remplace l'ylure de phosphore par un <strong>phosphonate</strong> (R-CH2-PO(OEt)2), déprotoné par une base (NaH, DBU) pour former un carbanion stabilisé par le groupe phosphonate. Cette méthode présente deux avantages pratiques majeurs sur le Wittig classique : le sous-produit phosphoré, le dialkylphosphate (EtO)2P(O)O⁻, est <strong>soluble dans l'eau</strong> (contrairement à l'oxyde de triphénylphosphine, souvent difficile à séparer par simple lavage), et la réaction est <strong>hautement sélective pour l'alcène E</strong>, quelle que soit la structure du carbonyle utilisé — un complément stratégique précieux au Wittig classique avec ylure non stabilisé (sélectif Z).</p>
    <p>Une modification supplémentaire, la variante de <strong>Still-Gennari</strong> (phosphonates portant des groupes trifluoroéthyle électro-attracteurs, en présence d'une base non coordinante comme le KHMDS ou le 18-couronne-6), inverse cette sélectivité et permet d'accéder à l'alcène <strong>Z</strong> avec de bons excès, complétant ainsi l'arsenal stéréosélectif du chimiste de synthèse.</p>

    <h3>5. Réaction de Julia-Kocienski</h3>
    <p>La méthode de Julia-Kocienski utilise une <strong>sulfone hétéroarylique</strong> (le plus souvent un 1-phényl-1H-tétrazol-5-yl sulfone, dit PT-sulfone) : sa métallation, suivie d'addition sur un aldéhyde puis d'une élimination de Smiles-Ramberg-Bäcklund en cascade, conduit à l'alcène avec une <strong>excellente sélectivité E</strong>, dans des conditions douces particulièrement appréciées pour les substrats complexes et sensibles rencontrés en synthèse totale de produits naturels.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Pour la production industrielle de vitamine A à l'échelle de la tonne, le sous-produit phosphoré généré à chaque réaction de Wittig doit être traité en quantité proportionnelle. En quoi le choix entre Wittig classique, HWE ou Julia-Kocienski pourrait-il alors dépendre non seulement de la stéréosélectivité recherchée, mais aussi de considérations purement industrielles de traitement des déchets ?
    </div>

    <h3>6. Choisir la bonne méthode en rétrosynthèse</h3>
    <p>Face à une double liaison C=C dans la cible, le chimiste choisit la méthode d'oléfination en fonction de la géométrie souhaitée : Wittig avec ylure non stabilisé pour un alcène Z, HWE (ou Julia-Kocienski) pour un alcène E, Still-Gennari pour un alcène Z avec un ester α,β-insaturé. Ce choix méthodologique est un exemple typique de la façon dont la stéréochimie de la cible oriente directement le choix des réactifs en synthèse.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Wittig : ylure de phosphore + carbonyle → oxaphosphétane → alcène + Ph3P=O (force motrice : la liaison P=O)</li>
        <li>Ylure non stabilisé → alcène Z ; ylure stabilisé (conjugué) → alcène E</li>
        <li>HWE : phosphonate à la place de l'ylure, sous-produit hydrosoluble, sélectivité E fiable</li>
        <li>Still-Gennari (HWE modifié) → Z ; Julia-Kocienski (sulfones) → E, conditions douces</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Inverser la règle de stéréosélectivité : c'est l'ylure <em>non</em> stabilisé qui donne le Z, pas l'inverse</li>
        <li>Oublier que le Wittig ne fonctionne qu'avec des aldéhydes et cétones, pas avec les esters (électrophile insuffisamment réactif)</li>
        <li>Négliger l'avantage pratique du HWE : séparation bien plus simple du sous-produit phosphoré, soluble dans l'eau</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un ylure de phosphore non stabilisé (Ph3P=CH-alkyle) réagissant sur un aldéhyde donne majoritairement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn5e1" value="right"> L'alcène Z</label>
          <label class="option"><input type="radio" name="syn5e1" value="wrong"> L'alcène E</label>
          <label class="option"><input type="radio" name="syn5e1" value="wrong"> Un mélange racémique 50/50 sans préférence</label>
          <label class="option"><input type="radio" name="syn5e1" value="wrong"> Un alcool allylique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn5e1','syn5fb1','Correct — un ylure non stabilisé réagit vite et de façon irréversible, favorisant l\\'oxaphosphétane cis, qui se fragmente en alcène Z.','Un ylure non stabilisé correspond à un contrôle cinétique irréversible.')">Vérifier</button>
        <div class="feedback" id="syn5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quel avantage pratique la réaction de Horner-Wadsworth-Emmons (HWE) offre-t-elle par rapport au Wittig classique ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn5e2" value="wrong"> Elle fonctionne sans base</label>
          <label class="option"><input type="radio" name="syn5e2" value="right"> Le sous-produit phosphoré est soluble dans l'eau, ce qui simplifie la purification, et la sélectivité E est fiable</label>
          <label class="option"><input type="radio" name="syn5e2" value="wrong"> Elle ne nécessite aucun phosphore</label>
          <label class="option"><input type="radio" name="syn5e2" value="wrong"> Elle fonctionne uniquement sur les cétones aromatiques</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn5e2','syn5fb2','Correct — le sous-produit dialkylphosphate est hydrosoluble (contrairement à Ph3P=O), et la réaction donne de façon fiable l\\'alcène E.','Compare la nature du sous-produit phosphoré formé dans les deux méthodes.')">Vérifier</button>
        <div class="feedback" id="syn5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La variante de Still-Gennari (HWE avec phosphonates trifluoroéthylés) permet d'obtenir sélectivement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn5e3" value="wrong"> L'alcène E, comme le HWE classique</label>
          <label class="option"><input type="radio" name="syn5e3" value="right"> L'alcène Z, en inversant la sélectivité du HWE classique</label>
          <label class="option"><input type="radio" name="syn5e3" value="wrong"> Un mélange non contrôlé</label>
          <label class="option"><input type="radio" name="syn5e3" value="wrong"> Un alcyne</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn5e3','syn5fb3','Correct — les groupes trifluoroéthyle électro-attracteurs, associés à une base non coordinante, inversent la sélectivité du HWE classique et donnent l\\'alcène Z.','Still-Gennari est justement conçu pour obtenir l\\'isomère opposé à celui du HWE classique.')">Vérifier</button>
        <div class="feedback" id="syn5fb3"></div>
      </div>
    </div>

    <div class="frontier-box">
      <span class="eyebrow">🔭 Frontière de la recherche</span>
      <p>La fabrication industrielle de vitamine A par BASF, l'un des plus grands procédés de Wittig à l'échelle mondiale, a longtemps généré d'importantes quantités d'oxyde de triphénylphosphine à retraiter. Des recherches actuelles portent sur des variantes <strong>catalytiques</strong> de la réaction de Wittig, où la phosphine n'est utilisée qu'en quantité sous-stœchiométrique et régénérée in situ par un réducteur, réduisant considérablement les déchets phosphorés générés. Une question de recherche reste ouverte : ces versions catalytiques peuvent-elles un jour atteindre, à l'échelle industrielle, la même fiabilité stéréochimique que la réaction stœchiométrique classique ?</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">📐 Synthèse visuelle</span>
      <p>Halogénure d'alkyle + PPh₃ → sel de phosphonium → déprotonation (base forte) → <strong>ylure de phosphore</strong> (non stabilisé / semi-stabilisé / stabilisé) → addition sur un carbonyle → <strong>oxaphosphétane</strong> (cyclique à 4 chaînons) → rétro-[2+2] → alcène + Ph₃P=O → sélectivité Z (ylure non stabilisé, cinétique) ou E (ylure stabilisé, thermodynamique ; ou HWE/Julia-Kocienski systématiquement E ; ou Still-Gennari systématiquement Z)</p>
      <p><strong>Équation clé du chapitre :</strong></p>
      <div class="formula-box">$$Ph_3P=CHR + R'CHO \\longrightarrow \\big[\\text{oxaphosphétane}\\big] \\longrightarrow RCH=CHR' + Ph_3P=O$$</div>
    </div>

    <div class="reflection-box">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la liaison P=O n'était pas aussi forte thermodynamiquement — la réaction de Wittig serait-elle encore une méthode fiable de formation d'alcènes, ou faudrait-il trouver une autre force motrice ?</li>
        <li>Pourquoi Wittig, en observant sa réaction pour la première fois en 1954, n'a-t-il probablement pas immédiatement anticipé qu'elle deviendrait un procédé produisant des tonnes de vitamine A par an ?</li>
        <li>Quelle serait la conséquence, sur la géométrie de l'alcène obtenu, du remplacement par erreur d'un ylure non stabilisé par un ylure stabilisé dans un protocole visant spécifiquement l'isomère Z ?</li>
      </ul>
    </div>

    <div class="biblio-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>G. Wittig, G. Geissler, <em>Zur Reaktionsweise des Pentaphenylphosphors und einiger Derivate</em>, Justus Liebigs Annalen der Chemie, 1954 — la publication originale de la réaction.</li>
        <li>J. Clayden, N. Greeves, S. Warren, <em>Organic Chemistry</em>, Oxford University Press — référence standard de niveau L3/master pour ce chantier de synthèse organique.</li>
        <li>B.E. Maryanoff, A.B. Reitz, <em>The Wittig Olefination Reaction and Modifications Involving Phosphoryl-Stabilized Carbanions</em>, Chemical Reviews, 1989 — revue de référence sur les variantes HWE et la stéréosélectivité de la réaction.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais transformer un carbonyle en alcène stéréodéfini, comme Wittig l'a découvert presque par hasard en 1954. Toutes les transformations vues jusqu'ici ont formé ou déformé des liaisons C–C ou C=C : il est temps de s'intéresser aux transformations qui changent le degré d'oxydation d'une molécule — direction le chapitre suivant, avec les oxydations et réductions sélectives.</p>
  `
};

SYNTH_NOVA_KB[synKey("Oléfination : Wittig, HWE et méthodes apparentées")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Oléfination : Wittig et méthodes apparentées ». Demande-moi comment se forme un ylure, pourquoi Wittig donne du Z, ou un indice sur un exercice.",
  rules: [
    { test:/ylure/i, replies:["Un ylure de phosphore se forme en deux temps : phosphine + halogénure d'alkyle → sel de phosphonium, puis déprotonation par une base forte (n-BuLi, NaH…) → ylure Ph3P=CHR."] },
    { test:/oxaphosph[ée]tane/i, replies:["L'oxaphosphétane est l'intermédiaire cyclique à 4 chaînons formé par addition de l'ylure sur le carbonyle. Sa fragmentation par rétro-[2+2] libère l'alcène et Ph3P=O — la force de la liaison P=O est la force motrice de toute la réaction."] },
    { test:/stabilis[ée]|\bz\b|\be\b/i, replies:["Ylure non stabilisé (alkyle simple) → réaction rapide, irréversible → alcène Z. Ylure stabilisé (conjugué, type ester) → réaction réversible, équilibration → alcène E."] },
    { test:/hwe|horner/i, replies:["Le HWE utilise un phosphonate au lieu d'un ylure : le sous-produit (dialkylphosphate) est soluble dans l'eau, ce qui simplifie la purification, et la sélectivité E est fiable, quel que soit le substrat."] },
    { test:/julia/i, replies:["La réaction de Julia-Kocienski utilise une sulfone hétéroarylique (PT-sulfone) : addition sur l'aldéhyde puis élimination en cascade, avec une excellente sélectivité E, en conditions douces."] },
    { test:/still.?gennari/i, replies:["Still-Gennari est une variante du HWE avec des phosphonates trifluoroéthylés et une base non coordinante : elle inverse la sélectivité habituelle du HWE et donne l'alcène Z."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : un ylure non stabilisé réagit vite, sans réversibilité.","Indice niveau 2 : c'est un contrôle cinétique.","Indice niveau 3 : il favorise l'oxaphosphétane cis, donc l'alcène Z."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare la solubilité des sous-produits phosphorés.","Indice niveau 2 : le dialkylphosphate du HWE part à l'eau, contrairement à Ph3P=O.","Indice niveau 3 : et la sélectivité E est fiable, quel que soit le substrat."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : Still-Gennari est fait pour inverser une sélectivité.","Indice niveau 2 : c'est l'inverse du HWE classique (E).","Indice niveau 3 : Still-Gennari donne donc l'alcène Z."] }
  ]
};

/* =========================== CHAPITRE 6 =========================== */
SYNTH_CHAPTERS[synKey("Oxydations et réductions sélectives en synthèse")] = {
  objectives: [
    "Choisir un oxydant adapté pour arrêter l'oxydation d'un alcool primaire au stade aldéhyde ou la pousser jusqu'à l'acide",
    "Comparer les réactifs de réduction usuels (NaBH4, LiAlH4, DIBAL-H) et leur chimiosélectivité",
    "Expliquer le modèle de Felkin-Anh pour prévoir la diastéréosélectivité d'une réduction ou d'une addition sur un carbonyle adjacent à un centre stéréogène",
    "Situer l'hydrogénation catalytique parmi les méthodes de réduction chimiosélective",
    "Expliquer comment Bürgi et Dunitz (1974) ont pu déterminer la trajectoire d'attaque d'un nucléophile sur un carbonyle sans observer aucune réaction en cours, uniquement à partir de structures cristallines statiques"
  ],
  prereqs: ["Oléfination : Wittig, HWE et méthodes apparentées", "Nombres d'oxydation en chimie organique"],
  bodyHtml: `
    <p>En 1974, les cristallographes <strong>Hans-Beat Bürgi</strong> et Jack Dunitz ont l'idée singulière d'exploiter, non pas une seule réaction suivie en temps réel, mais des centaines de structures cristallines déjà déposées en base de données, où un nucléophile intramoléculaire s'approche d'un carbonyle à des degrés d'avancement différents selon la molécule considérée. En superposant ces « instantanés figés » d'une même trajectoire réactionnelle observée à des stades différents dans des molécules différentes, ils reconstituent le chemin exact suivi par un nucléophile lors de son attaque sur un carbonyle : un angle d'environ 107°, et non 90° comme on l'imaginait jusque-là — la désormais célèbre <strong>trajectoire de Bürgi-Dunitz</strong>, qui gouverne notamment la diastéréosélectivité étudiée dans ce chapitre.</p>

    <p>Cette méthode, dite de « corrélation structurale », a montré qu'il était possible de reconstituer la dynamique d'une réaction chimique sans jamais l'observer directement en train de se produire, uniquement à partir de structures statiques figées dans un cristal.</p>

    <p>Ajuster précisément le degré d'oxydation d'un carbone fonctionnel — sans toucher aux autres fonctions présentes — est une opération omniprésente en synthèse totale. Le choix du réactif d'oxydo-réduction n'est jamais anodin : il détermine à la fois le produit obtenu et la compatibilité avec le reste de la molécule.</p>

    <h3>1. Oxydation des alcools : s'arrêter à l'aldéhyde ou aller jusqu'à l'acide</h3>
    <p>Un alcool primaire s'oxyde d'abord en aldéhyde, puis (si l'eau est présente, via l'hydrate du aldéhyde) en acide carboxylique. Un alcool secondaire s'oxyde en cétone, un stade final qui ne s'oxyde pas davantage dans des conditions usuelles.</p>
    <table class="mini-table">
      <tr><th>Réactif</th><th>Alcool 1° →</th><th>Alcool 2° →</th><th>Remarque</th></tr>
      <tr><td>PCC (chlorochromate de pyridinium)</td><td>aldéhyde (s'arrête là, milieu anhydre)</td><td>cétone</td><td>toxicité du chrome(VI), à limiter</td></tr>
      <tr><td>Swern (DMSO activé par (COCl)2, puis Et3N)</td><td>aldéhyde</td><td>cétone</td><td>sans métal, très doux, basse température (−78 °C)</td></tr>
      <tr><td>Dess-Martin periodinane (DMP)</td><td>aldéhyde</td><td>cétone</td><td>conditions neutres, température ambiante, très utilisé</td></tr>
      <tr><td>Jones (CrO3/H2SO4 aqueux)</td><td>acide carboxylique (via l'hydrate)</td><td>cétone</td><td>milieu aqueux acide fort, peu compatible avec des fonctions sensibles</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Pour arrêter une oxydation au stade aldéhyde, il faut des conditions <strong>anhydres</strong> : c'est le point commun entre PCC, Swern et Dess-Martin. En présence d'eau (réactif de Jones), l'aldéhyde s'hydrate partiellement et l'hydrate, lui, s'oxyde facilement jusqu'à l'acide carboxylique.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le choix entre PCC, Swern ou Dess-Martin dépend surtout de contraintes pratiques (toxicité, température, simplicité de mise en œuvre) plutôt que du résultat chimique final, identique dans les trois cas. Qu'est-ce que cela vous apprend sur la différence entre une transformation « possible en théorie » et une transformation « réalisable proprement en pratique » ?
    </div>

    <h3>2. Réduction sélective des dérivés carbonylés</h3>
    <p>Les hydrures métalliques diffèrent fortement en réactivité et donc en sélectivité :</p>
    <table class="mini-table">
      <tr><th>Réducteur</th><th>Réduit</th><th>Ne réduit pas (à froid / modérément)</th></tr>
      <tr><td>NaBH4</td><td>aldéhydes, cétones</td><td>esters, amides, acides carboxyliques</td></tr>
      <tr><td>LiAlH4</td><td>aldéhydes, cétones, esters, acides, amides → alcools (ou amines pour les amides)</td><td>très peu sélectif : réducteur puissant et peu discriminant</td></tr>
      <tr><td>DIBAL-H (1 équiv., −78 °C)</td><td>ester → <strong>aldéhyde</strong> (arrêt à l'hémiacétal d'aluminium tant que le milieu reste froid)</td><td>ne réduit pas plus loin si la température et la stœchiométrie sont contrôlées</td></tr>
    </table>
    <p>Le DIBAL-H à basse température illustre parfaitement la notion de <strong>réduction partielle contrôlée</strong> : un seul équivalent d'hydrure s'additionne sur l'ester, formant un intermédiaire tétraédrique stable à −78 °C ; ce n'est qu'au réchauffement, ou en présence d'un excès de réactif, que l'aldéhyde intermédiaire serait réduit à son tour en alcool. Cette réaction est l'une des rares méthodes fiables pour obtenir un aldéhyde directement à partir d'un ester.</p>

    <h3>3. Diastéréosélectivité : le modèle de Felkin-Anh</h3>
    <p>Lorsqu'un carbonyle est adjacent à un centre stéréogène déjà présent dans la molécule, l'addition d'un nucléophile (organométallique ou hydrure) crée un nouveau centre stéréogène : la diastéréosélectivité de cette addition est rationalisée par le <strong>modèle de Felkin-Anh</strong>. Le principe : le plus gros substituant du centre stéréogène adjacent s'oriente perpendiculairement au plan du carbonyle (loin de l'oxygène, pour minimiser la gêne stérique avec le nucléophile entrant), et le nucléophile attaque selon une trajectoire de Bürgi-Dunitz (angle d'environ 107° par rapport à l'axe C=O), du côté opposé au groupe encombrant, favorisant préférentiellement l'un des deux diastéréomères possibles.</p>

    <h3>4. Hydrogénation catalytique chimiosélective</h3>
    <p>L'hydrogénation (H2, catalyseur métallique hétérogène : Pd/C, PtO2, ou catalyseurs homogènes comme le catalyseur de Wilkinson RhCl(PPh3)3) réduit sélectivement les alcènes et alcynes, et — selon le catalyseur et les conditions — peut être rendue chimiosélective vis-à-vis d'autres fonctions réductibles présentes sur la molécule (nitro, benzyle, insaturations plus ou moins encombrées). C'est aussi, on l'a vu au chapitre 2, la méthode de choix pour le clivage des groupes protecteurs benzyliques (Cbz, éther benzylique) par hydrogénolyse.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Bürgi et Dunitz ont dû rassembler des centaines de structures cristallines différentes pour reconstituer une seule trajectoire réactionnelle continue. En quoi cette démarche statistique, appliquée à des molécules figées, diffère-t-elle fondamentalement de l'observation directe d'une seule réaction en cinétique classique — et pourquoi les deux approches convergent-elles malgré tout vers le même résultat ?
    </div>

    <h3>5. Choisir le bon réactif en rétrosynthèse</h3>
    <p>Le choix d'un oxydant ou d'un réducteur en synthèse ne dépend pas seulement de la transformation formelle recherchée, mais surtout de la <strong>compatibilité fonctionnelle</strong> avec le reste de la molécule : un LiAlH4, très puissant, réduirait aussi un ester ou un nitrile présent ailleurs sur la cible, alors qu'un NaBH4, plus doux, laisserait ces fonctions intactes. Cette réflexion de chimiosélectivité doit systématiquement accompagner le choix de chaque étape rédox d'une synthèse multi-étapes.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Oxydation anhydre (PCC, Swern, Dess-Martin) : alcool 1° → aldéhyde, s'arrête là. Oxydation aqueuse (Jones) : alcool 1° → acide</li>
        <li>NaBH4 : doux, réduit seulement aldéhydes/cétones. LiAlH4 : puissant, peu sélectif. DIBAL-H (1 équiv., −78 °C) : ester → aldéhyde</li>
        <li>Modèle de Felkin-Anh : le nucléophile attaque à l'opposé du plus gros substituant du centre stéréogène adjacent au carbonyle</li>
        <li>Hydrogénation catalytique (H2/Pd, PtO2…) : réduction chimiosélective des alcènes/alcynes, aussi utilisée pour le clivage des groupes benzyliques</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser LiAlH4 quand une réduction chimiosélective est nécessaire : c'est un réducteur puissant et peu discriminant</li>
        <li>Oublier que le DIBAL-H doit être utilisé à basse température et en quantité contrôlée pour s'arrêter au stade aldéhyde</li>
        <li>Confondre le rôle de l'eau dans l'oxydation : c'est sa présence qui permet la sur-oxydation de l'aldéhyde en acide via l'hydrate</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour oxyder un alcool primaire en aldéhyde sans le pousser jusqu'à l'acide carboxylique, on choisit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn6e1" value="wrong"> Le réactif de Jones (CrO3/H2SO4 aqueux)</label>
          <label class="option"><input type="radio" name="syn6e1" value="right"> L'oxydation de Swern ou le Dess-Martin periodinane</label>
          <label class="option"><input type="radio" name="syn6e1" value="wrong"> KMnO4 aqueux à chaud</label>
          <label class="option"><input type="radio" name="syn6e1" value="wrong"> L'ozonolyse</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn6e1','syn6fb1','Correct — Swern et Dess-Martin opèrent en conditions anhydres : l\\'aldéhyde formé ne s\\'hydrate pas et ne peut donc pas être sur-oxydé en acide.','L\\'oxydation doit s\\'arrêter à l\\'aldéhyde : il faut donc des conditions anhydres, sans eau.')">Vérifier</button>
        <div class="feedback" id="syn6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour transformer un ester en aldéhyde en une seule étape, quel réactif utilise-t-on, et dans quelles conditions ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn6e2" value="wrong"> LiAlH4 en excès, à température ambiante</label>
          <label class="option"><input type="radio" name="syn6e2" value="right"> DIBAL-H, 1 équivalent, à −78 °C</label>
          <label class="option"><input type="radio" name="syn6e2" value="wrong"> NaBH4 dans l'eau</label>
          <label class="option"><input type="radio" name="syn6e2" value="wrong"> H2, Pd/C</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn6e2','syn6fb2','Correct — le DIBAL-H, utilisé à basse température et en quantité stœchiométrique contrôlée, s\\'arrête à l\\'intermédiaire tétraédrique stable, ce qui donne l\\'aldéhyde après hydrolyse.','Cherche le réducteur qu\\'on utilise à −78 °C, en quantité contrôlée, pour arrêter la réduction avant l\\'alcool.')">Vérifier</button>
        <div class="feedback" id="syn6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans le modèle de Felkin-Anh, comment s'oriente le plus gros substituant du centre stéréogène adjacent au carbonyle ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn6e3" value="wrong"> Dans le plan du carbonyle, du même côté que l'oxygène</label>
          <label class="option"><input type="radio" name="syn6e3" value="right"> Perpendiculairement au plan du carbonyle, à l'écart de la trajectoire d'attaque du nucléophile</label>
          <label class="option"><input type="radio" name="syn6e3" value="wrong"> Toujours en position axiale sur un cycle</label>
          <label class="option"><input type="radio" name="syn6e3" value="wrong"> Aléatoirement, sans influence sur la sélectivité</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn6e3','syn6fb3','Correct — le gros groupe s\\'oriente perpendiculairement au carbonyle pour minimiser la gêne avec le nucléophile entrant, qui attaque selon la trajectoire de Bürgi-Dunitz du côté opposé.','Le modèle Felkin-Anh minimise la gêne stérique entre le nucléophile entrant et le plus gros substituant voisin.')">Vérifier</button>
        <div class="feedback" id="syn6fb3"></div>
      </div>
    </div>

    <div class="frontier-box">
      <span class="eyebrow">🔭 Frontière de la recherche</span>
      <p>Les oxydants stœchiométriques historiques (chrome hexavalent du PCC ou du réactif de Jones, notoirement toxique et cancérigène) sont aujourd'hui progressivement remplacés par des méthodes d'<strong>oxydation électrochimique</strong>, où un médiateur organique comme le radical TEMPO est réoxydé en continu à une électrode plutôt que consommé stœchiométriquement, ne produisant en théorie que de l'hydrogène gazeux comme sous-produit. Une question de recherche reste ouverte : ces méthodes électrochimiques, déjà efficaces en laboratoire, peuvent-elles être adaptées à la diversité fonctionnelle et à l'échelle de production exigées par l'industrie pharmaceutique ?</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">📐 Synthèse visuelle</span>
      <p>Alcool 1°/2° → choix selon présence d'eau : <strong>anhydre</strong> (PCC/Swern/Dess-Martin) → aldéhyde/cétone (arrêt) ; <strong>aqueux</strong> (Jones) → acide carboxylique (alcool 1°) — Carbonyle → choix de l'hydrure selon la puissance recherchée : NaBH4 (doux) / LiAlH4 (puissant, peu sélectif) / DIBAL-H (1 équiv., −78 °C, ester → aldéhyde) — Addition sur un carbonyle adjacent à un stéréocentre → <strong>modèle de Felkin-Anh</strong>, trajectoire de Bürgi-Dunitz — Alcène/alcyne → hydrogénation catalytique (H₂/catalyseur métallique), chimiosélective</p>
      <p><strong>Résultat central du chapitre :</strong></p>
      <div class="formula-box">Trajectoire de Bürgi-Dunitz : angle nucléophile–C=O ≈ 107°</div>
    </div>

    <div class="reflection-box">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'angle de Bürgi-Dunitz avait été exactement de 90°, comme on le pensait avant 1974 — quel type de trajectoire cela impliquerait-il pour le nucléophile, et pourquoi cette hypothèse plus simple s'est-elle révélée fausse ?</li>
        <li>Pourquoi le DIBAL-H, un réactif tout aussi puissant en principe que le LiAlH4, peut-il pourtant s'arrêter précisément au stade aldéhyde lorsqu'il est utilisé à basse température et en quantité contrôlée ?</li>
        <li>Quelle serait la conséquence, sur la diastéréosélectivité d'une addition nucléophile, d'un centre stéréogène adjacent au carbonyle portant trois substituants de taille très proche, rendant l'application du modèle de Felkin-Anh ambiguë ?</li>
      </ul>
    </div>

    <div class="biblio-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>H.B. Bürgi, J.D. Dunitz, J.M. Lehn, G. Wipff, <em>Stereochemistry of Reaction Paths at Carbonyl Centres</em>, Tetrahedron, 1974 — l'article fondateur de la méthode de corrélation structurale et de la trajectoire qui porte leur nom.</li>
        <li>M. Chérest, H. Felkin, N. Prudent, <em>Torsional Strain Involving Partial Bonds</em>, Tetrahedron Letters, 1968 — l'article à l'origine du modèle de diastéréosélectivité de Felkin.</li>
        <li>J. Clayden, N. Greeves, S. Warren, <em>Organic Chemistry</em>, Oxford University Press — référence standard de niveau L3/master pour ce chantier de synthèse organique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais ajuster précisément le degré d'oxydation d'une molécule, en suivant une trajectoire d'attaque que Bürgi et Dunitz ont mise en évidence sans jamais observer une seule réaction en direct. Il est temps de s'intéresser à des transformations qui construisent des cycles entiers en une seule étape concertée : direction le chapitre suivant, avec les cycloadditions et les réarrangements sigmatropiques.</p>
  `
};

SYNTH_NOVA_KB[synKey("Oxydations et réductions sélectives en synthèse")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Oxydations et réductions sélectives ». Demande-moi la différence entre Swern et Jones, comment le DIBAL-H s'arrête à l'aldéhyde, ou un indice sur un exercice.",
  rules: [
    { test:/swern|dess.?martin|pcc/i, replies:["Swern, Dess-Martin et PCC oxydent un alcool primaire jusqu'à l'aldéhyde, sans aller plus loin, car ce sont des conditions anhydres : l'aldéhyde ne peut pas s'hydrater pour être sur-oxydé."] },
    { test:/jones/i, replies:["Le réactif de Jones (CrO3/H2SO4 aqueux) oxyde un alcool primaire jusqu'à l'acide carboxylique : en présence d'eau, l'aldéhyde intermédiaire s'hydrate et cet hydrate s'oxyde facilement."] },
    { test:/dibal/i, replies:["Le DIBAL-H, utilisé à −78 °C et en un seul équivalent, réduit un ester jusqu'au stade aldéhyde seulement : l'intermédiaire tétraédrique reste stable tant que la température est basse."] },
    { test:/nabh4|lialh4/i, replies:["NaBH4 est doux : il réduit seulement les aldéhydes et cétones. LiAlH4 est beaucoup plus puissant et peu sélectif : il réduit aussi les esters, amides et acides carboxyliques."] },
    { test:/felkin/i, replies:["Le modèle de Felkin-Anh prévoit la diastéréosélectivité d'une addition sur un carbonyle adjacent à un centre stéréogène : le plus gros substituant s'oriente perpendiculairement au carbonyle, et le nucléophile attaque du côté opposé."] },
    { test:/hydrog[ée]nation/i, replies:["L'hydrogénation catalytique (H2, Pd/C, PtO2…) réduit sélectivement les alcènes et alcynes, et sert aussi au clivage des groupes protecteurs benzyliques par hydrogénolyse."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : il faut des conditions sans eau pour s'arrêter à l'aldéhyde.","Indice niveau 2 : Jones est un milieu aqueux, à éviter ici.","Indice niveau 3 : Swern ou Dess-Martin, tous deux anhydres."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : cherche un réducteur utilisable à très basse température, en quantité contrôlée.","Indice niveau 2 : LiAlH4 en excès irait trop loin, jusqu'à l'alcool.","Indice niveau 3 : DIBAL-H, 1 équivalent, −78 °C."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à la gêne stérique entre le nucléophile et le substituant voisin.","Indice niveau 2 : le gros groupe s'écarte de la trajectoire d'attaque.","Indice niveau 3 : il se place perpendiculairement au plan du carbonyle."] }
  ]
};


/* =========================== CHAPITRE 7 =========================== */
SYNTH_CHAPTERS[synKey("Cycloadditions et réarrangements sigmatropiques")] = {
  objectives: [
    "Décrire le mécanisme concerté de la réaction de Diels-Alder et les exigences géométriques du diène et du diénophile",
    "Prévoir la régiosélectivité (règles ortho/para) et la stéréospécificité (endo/exo) d'une cycloaddition [4+2]",
    "Identifier une déconnexion de type Diels-Alder en analyse rétrosynthétique",
    "Décrire les réarrangements sigmatropiques [3,3] de Cope et de Claisen et leur intérêt synthétique",
    "Relier le caractère concerté et stéréospécifique du Diels-Alder (Diels et Alder, 1928, Nobel 1950) à son explication théorique complète par les règles de Woodward-Hoffmann (1965, Nobel 1981)"
  ],
  prereqs: ["Oxydations et réductions sélectives en synthèse", "Théorie des orbitales moléculaires frontières (notions de base)"],
  bodyHtml: `
    <p>En 1928, les chimistes allemands <strong>Otto Diels</strong> et son étudiant <strong>Kurt Alder</strong> mettent en évidence la réaction qui portera leur nom, en observant que le cyclopentadiène et la benzoquinone se combinent spontanément, en une seule étape, pour former un nouveau cycle à six chaînons — sans le moindre intermédiaire chargé isolable. Cette découverte, dont Diels et Alder avaient d'emblée perçu l'immense portée synthétique, leur vaudra le prix Nobel de chimie 1950.</p>

    <p>Il faudra pourtant attendre 1965 pour que Robert Woodward et Roald Hoffmann fournissent l'explication théorique complète du caractère concerté et stéréospécifique de cette réaction — et de toutes les réactions péricycliques —, grâce à la théorie de la conservation de la symétrie orbitalaire. Ce travail vaudra à Hoffmann le prix Nobel de chimie 1981 (partagé avec Kenichi Fukui) ; Woodward, décédé en 1979, n'a pu y être associé à titre posthume.</p>

    <p>Certaines transformations organiques ne passent pas par un intermédiaire chargé (carbocation, carbanion) mais par un <strong>état de transition cyclique concerté</strong>, où toutes les liaisons se forment et se rompent simultanément. Ces réactions <strong>péricycliques</strong> — cycloadditions et réarrangements sigmatropiques — offrent un contrôle stéréochimique remarquable, très exploité en synthèse totale.</p>

    <h3>1. La réaction de Diels-Alder : une cycloaddition [4+2]</h3>
    <p>Un <strong>diène</strong> (4 électrons π, doit adopter la conformation <em>s-cis</em> pour réagir) et un <strong>diénophile</strong> (2 électrons π, un alcène ou un alcyne, généralement activé par un groupe électro-attracteur) réagissent en une seule étape concertée pour former un cycle à six chaînons portant une nouvelle double liaison — un cyclohexène substitué. Aucun intermédiaire chargé n'est formé : les deux nouvelles liaisons σ C–C se créent simultanément.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 110" width="100%">
          <path d="M20,80 L50,50 L85,60 L115,35" stroke="#3D6BF0" stroke-width="2.4" fill="none"/>
          <text x="12" y="95" font-family="IBM Plex Mono" font-size="9" fill="#122043">diène (s-cis)</text>
          <line x1="150" y1="45" x2="180" y2="65" stroke="#F0555C" stroke-width="2.4"/>
          <text x="148" y="35" font-family="IBM Plex Mono" font-size="9" fill="#F0555C">diénophile</text>
          <text x="95" y="20" font-family="IBM Plex Mono" font-size="14" fill="#8064F2">[4+2]</text>
          <path d="M20,80 Q100,105 180,65" stroke="#1FB6A8" stroke-width="1.4" stroke-dasharray="3,2" fill="none"/>
        </svg>
        <span>Le diène (s-cis) et le diénophile s'approchent en formant simultanément deux liaisons σ</span>
      </div>
    </div>
    <div class="formula-box">$$\text{diène (4}\pi\text{)} + \text{diénophile (2}\pi\text{)} \longrightarrow \text{cyclohexène}$$</div>

    <h3>2. Régiosélectivité : les règles ortho et para</h3>
    <p>Lorsque le diène et le diénophile portent tous deux un substituant, la cycloaddition n'est pas régiochimiquement neutre : les coefficients des orbitales frontières (HOMO du diène, LUMO du diénophile, dans le cas le plus courant d'une <strong>demande électronique normale</strong>) imposent une orientation préférentielle. Un diène substitué en position 1 et un diénophile activé donnent préférentiellement le produit « <strong>1,2 (ortho)</strong> » ; un diène substitué en position 2 donne préférentiellement le produit « <strong>1,4 (para)</strong> ». Cette prévisibilité fait du Diels-Alder un outil rétrosynthétique très fiable pour construire des cyclohexènes fonctionnalisés à la régiochimie contrôlée.</p>

    <h3>3. Stéréospécificité : conservation de la géométrie et règle endo</h3>
    <p>La cycloaddition de Diels-Alder est <strong>stéréospécifique</strong> : la géométrie relative (cis ou trans) des substituants du diène et du diénophile de départ est intégralement conservée dans le cycle formé, car le mécanisme est concerté et syn sur les deux partenaires (pas d'intermédiaire libre qui permettrait une rotation).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — règle d'Alder (endo)</span>
      Lorsque le diénophile porte un groupe électro-attracteur capable d'interactions orbitalaires secondaires avec le diène (ex. un anhydride, un carbonyle α,β-insaturé cyclique), l'approche <strong>endo</strong> — où ce groupe se place sous le squelette du diène plutôt qu'à l'extérieur — est <strong>cinétiquement favorisée</strong>, même si le produit endo n'est pas toujours le plus stable thermodynamiquement. C'est la règle d'Alder, un exemple classique de contrôle cinétique en synthèse stéréosélective.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Diels et Alder avaient observé et exploité la stéréospécificité de leur réaction dès 1928, bien avant que Woodward et Hoffmann n'en donnent l'explication théorique complète en 1965. Qu'est-ce que cet écart de près de 40 ans vous apprend sur la possibilité d'utiliser efficacement une réaction en synthèse sans en comprendre encore totalement le fondement théorique ?
    </div>

    <h3>4. Diels-Alder en rétrosynthèse</h3>
    <p>Face à un cyclohexène (ou un système bicyclique formé par Diels-Alder intramoléculaire) dans une molécule cible, on recherche systématiquement une déconnexion [4+2] : couper la molécule au niveau des deux liaisons σ nouvellement formées régénère un diène et un diénophile, souvent des précurseurs beaucoup plus simples et disponibles commercialement. Cette déconnexion est particulièrement puissante car elle installe simultanément un cycle <em>et</em> jusqu'à quatre nouveaux centres stéréogènes en une seule étape, avec un excellent contrôle de leur relation relative.</p>

    <h3>5. Réarrangements sigmatropiques [3,3] : Cope et Claisen</h3>
    <p>Un réarrangement sigmatropique [3,3] déplace une liaison σ à travers un système π conjugué, en un seul état de transition concerté à six électrons (de type cyclohexane en chaise ou en bateau) — sans catalyseur, sans réactif supplémentaire, dans un cadre thermique. Le <strong>réarrangement de Cope</strong> convertit un 1,5-hexadiène en un autre 1,5-hexadiène isomère ; le <strong>réarrangement de Claisen</strong> convertit un <strong>allyl vinyl éther</strong> en un composé carbonylé γ,δ-insaturé, en formant une nouvelle liaison C–C avec un excellent contrôle de la géométrie de la double liaison formée.</p>
    <div class="formula-box">$$\text{allyl vinyl éther} \\xrightarrow[\text{[3,3] concerté}]{\Delta} \gamma,\delta\text{-alcène-carbonylé}$$</div>
    <p>Ces réarrangements sont très utilisés en synthèse pour transposer un centre stéréogène allylique (chiralité axiale ou centrale) vers une nouvelle position avec une <strong>transmission fidèle de l'information stéréochimique</strong> (chiralité transfer), typique des variantes modernes comme le réarrangement de Claisen-Ireland (sur un énolate silylé d'ester allylique), largement employé en synthèse asymétrique.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le Diels-Alder (une cycloaddition à deux partenaires) et le réarrangement de Cope (un seul substrat qui se réarrange sur lui-même) sont tous deux des réactions péricycliques à six électrons, gouvernées par les mêmes règles de conservation de la symétrie orbitalaire. Qu'est-ce que ce point commun vous suggère sur la portée réelle de la théorie de Woodward-Hoffmann, au-delà du seul cas historique du Diels-Alder qui l'a motivée ?
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Diels-Alder [4+2] : diène s-cis (4π) + diénophile (2π) → cyclohexène, mécanisme concerté, sans intermédiaire chargé</li>
        <li>Règles ortho/para pour la régiosélectivité ; stéréospécificité totale (conservation de la géométrie des partenaires)</li>
        <li>Règle d'Alder : l'approche endo est cinétiquement favorisée par interactions orbitalaires secondaires</li>
        <li>Réarrangements [3,3] (Cope, Claisen) : concertés, thermiques, excellent transfert de chiralité</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que le diène doit pouvoir adopter la conformation s-cis : un diène bloqué en s-trans (contrainte cyclique) ne réagit pas</li>
        <li>Confondre stéréospécificité (imposée par le mécanisme) et stéréosélectivité (préférence, comme la règle endo)</li>
        <li>Penser que le produit endo est toujours le plus stable : il est seulement le plus vite formé (contrôle cinétique)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour qu'un diène participe efficacement à une réaction de Diels-Alder, il doit pouvoir adopter la conformation :</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn7e1" value="wrong"> s-trans</label>
          <label class="option"><input type="radio" name="syn7e1" value="right"> s-cis</label>
          <label class="option"><input type="radio" name="syn7e1" value="wrong"> perpendiculaire</label>
          <label class="option"><input type="radio" name="syn7e1" value="wrong"> peu importe, les deux fonctionnent aussi bien</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn7e1','syn7fb1','Correct — seule la conformation s-cis rapproche suffisamment les deux extrémités du diène pour former simultanément les deux nouvelles liaisons σ avec le diénophile.','Pense à la géométrie nécessaire pour que les deux extrémités du diène atteignent le diénophile en même temps.')">Vérifier</button>
        <div class="feedback" id="syn7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La règle d'Alder (approche endo favorisée) relève d'un contrôle :</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn7e2" value="right"> Cinétique (interactions orbitalaires secondaires stabilisant l'état de transition)</label>
          <label class="option"><input type="radio" name="syn7e2" value="wrong"> Thermodynamique (le produit endo est toujours le plus stable)</label>
          <label class="option"><input type="radio" name="syn7e2" value="wrong"> Électrostatique uniquement</label>
          <label class="option"><input type="radio" name="syn7e2" value="wrong"> Aucun des deux, c'est un résultat statistique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn7e2','syn7fb2','Correct — l\\'endo est cinétiquement favorisé par des interactions orbitalaires secondaires dans l\\'état de transition, même si l\\'exo peut être thermodynamiquement plus stable (moins encombré).','La règle d\\'Alder porte sur la vitesse de formation, pas nécessairement sur la stabilité du produit final.')">Vérifier</button>
        <div class="feedback" id="syn7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le réarrangement de Claisen convertit un allyl vinyl éther en :</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn7e3" value="wrong"> Un alcool aromatique</label>
          <label class="option"><input type="radio" name="syn7e3" value="right"> Un composé carbonylé γ,δ-insaturé, via un état de transition [3,3] concerté</label>
          <label class="option"><input type="radio" name="syn7e3" value="wrong"> Un époxyde</label>
          <label class="option"><input type="radio" name="syn7e3" value="wrong"> Un cyclohexène par cycloaddition [4+2]</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn7e3','syn7fb3','Correct — c\\'est un réarrangement sigmatropique [3,3], distinct d\\'une cycloaddition : la liaison σ C-O se déplace à travers le système π pour former une nouvelle liaison C-C et un composé carbonylé γ,δ-insaturé.','Ce n\\'est pas une cycloaddition [4+2] : c\\'est un réarrangement sigmatropique, un seul substrat qui se transforme en lui-même sans partenaire.')">Vérifier</button>
        <div class="feedback" id="syn7fb3"></div>
      </div>
    </div>

    <div class="frontier-box">
      <span class="eyebrow">🔭 Frontière de la recherche</span>
      <p>Des variantes de cycloaddition à demande électronique inverse, en particulier la <strong>ligation par tétrazine</strong> (réaction entre une tétrazine et un alcène ou alcyne tendu, dite « click chimique »), sont aujourd'hui exploitées pour marquer des biomolécules directement dans des cellules vivantes, sans perturber les processus biologiques environnants — un domaine que l'on appelle la <strong>chimie bio-orthogonale</strong>, distingué par le prix Nobel de chimie 2022. Une question de recherche reste ouverte : ces cycloadditions, déjà remarquablement rapides et sélectives in vitro, peuvent-elles être encore accélérées pour permettre une imagerie en temps réel de processus biologiques rapides à l'échelle de la seconde ?</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">📐 Synthèse visuelle</span>
      <p>Diène s-cis (4π, HOMO) + diénophile activé (2π, LUMO) → état de transition cyclique concerté à 6 électrons (conservation de la symétrie orbitalaire, Woodward-Hoffmann) → <strong>cyclohexène</strong> (régiosélectivité ortho/para, stéréospécificité totale, endo cinétiquement favorisé) — séparément : réarrangement sigmatropique <strong>[3,3]</strong> (Cope, Claisen) → liaison σ déplacée à travers un système π, un seul substrat, transfert fidèle de chiralité</p>
      <p><strong>Résultat central du chapitre :</strong></p>
      <div class="formula-box">$$\\text{diène (4}\\pi\\text{)} + \\text{diénophile (2}\\pi\\text{)} \\longrightarrow \\text{cyclohexène} \\quad \\text{(6 électrons, symétrie conservée)}$$</div>
    </div>

    <div class="reflection-box">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Diels et Alder avaient travaillé avec un diène incapable d'adopter la conformation s-cis — auraient-ils pu découvrir la même réaction, ou l'auraient-ils simplement manquée ?</li>
        <li>Pourquoi une théorie aussi abstraite que la conservation de la symétrie orbitalaire a-t-elle mis près de quarante ans à émerger, alors que la réaction qu'elle explique était utilisée en synthèse depuis 1928 ?</li>
        <li>Quelle serait la conséquence, sur la régiosélectivité prévue par les règles ortho/para, de l'utilisation d'un diène et d'un diénophile tous deux non substitués et donc sans polarisation orbitalaire marquée ?</li>
      </ul>
    </div>

    <div class="biblio-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>O. Diels, K. Alder, <em>Synthesen in der Chinonreihe</em>, Justus Liebigs Annalen der Chemie, 1928 — l'article fondateur de la réaction qui porte leur nom.</li>
        <li>R.B. Woodward, R. Hoffmann, <em>The Conservation of Orbital Symmetry</em>, Angewandte Chemie International Edition, 1969 — la synthèse de leur théorie de la symétrie orbitalaire.</li>
        <li>M.L. Blackman, M. Royzen, J.M. Fox, <em>Tetrazine Ligation: Fast Bioconjugation Based on Inverse-Electron-Demand Diels-Alder Reactivity</em>, Journal of the American Chemical Society, 2008 — pour la chimie bio-orthogonale évoquée en Frontière de la recherche.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais construire un cycle entier en une seule étape concertée, comme Diels et Alder l'ont fait en 1928 sans attendre l'explication théorique que Woodward et Hoffmann n'apporteraient que bien plus tard. Toutes les méthodes vues jusqu'ici reposent sur la réactivité intrinsèque des groupes fonctionnels : direction le chapitre suivant, où un métal de transition va lui-même orchestrer la formation de la liaison C–C, avec les couplages pallado-catalysés.</p>
  `
};

SYNTH_NOVA_KB[synKey("Cycloadditions et réarrangements sigmatropiques")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Cycloadditions et réarrangements sigmatropiques ». Demande-moi comment marche Diels-Alder, ce qu'est la règle endo, ou un indice sur un exercice.",
  rules: [
    { test:/diels.?alder|\[4\+2\]/i, replies:["Diels-Alder est une cycloaddition [4+2] concertée entre un diène (s-cis, 4π) et un diénophile (2π), formant un cyclohexène. Aucun intermédiaire chargé : les deux liaisons σ se forment simultanément."] },
    { test:/endo|alder/i, replies:["La règle d'Alder : l'approche endo (groupe électro-attracteur du diénophile sous le diène) est cinétiquement favorisée par des interactions orbitalaires secondaires, même si l'exo peut être plus stable."] },
    { test:/ortho|para|r[ée]gios[ée]lectiv/i, replies:["Les règles ortho/para prévoient la régiochimie du Diels-Alder selon les substituants du diène et du diénophile, via les coefficients des orbitales frontières (HOMO diène / LUMO diénophile)."] },
    { test:/cope|claisen/i, replies:["Cope : réarrangement [3,3] d'un 1,5-hexadiène en un autre 1,5-hexadiène isomère. Claisen : réarrangement [3,3] d'un allyl vinyl éther en composé carbonylé γ,δ-insaturé, avec transfert de chiralité."] },
    { test:/st[ée]r[ée]osp[ée]cifique|st[ée]r[ée]osp[ée]cificit[ée]/i, replies:["Diels-Alder est stéréospécifique : la géométrie relative des substituants des partenaires de départ se retrouve intégralement dans le cycle formé, car le mécanisme est concerté, sans intermédiaire libre."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la géométrie qui rapproche les deux extrémités du diène.","Indice niveau 2 : ce n'est pas la conformation étirée (s-trans).","Indice niveau 3 : c'est la conformation s-cis."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : la règle d'Alder porte sur la vitesse, pas la stabilité finale.","Indice niveau 2 : ce sont des interactions orbitalaires secondaires dans l'état de transition.","Indice niveau 3 : c'est donc un contrôle cinétique."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : ce n'est pas une cycloaddition à deux partenaires.","Indice niveau 2 : c'est un réarrangement sigmatropique [3,3] d'une seule molécule.","Indice niveau 3 : le produit est un composé carbonylé γ,δ-insaturé."] }
  ]
};

/* =========================== CHAPITRE 8 =========================== */
SYNTH_CHAPTERS[synKey("Couplages pallado-catalysés et catalyse par les métaux de transition")] = {
  objectives: [
    "Décrire le cycle catalytique général d'un couplage croisé au palladium (addition oxydante, transmétalation, élimination réductrice)",
    "Distinguer les couplages de Suzuki-Miyaura, Heck, Sonogashira et Negishi par leurs partenaires organométalliques et leurs conditions",
    "Choisir le couplage adapté à une déconnexion C-C donnée en analyse rétrosynthétique",
    "Situer l'apport historique de ces méthodes (prix Nobel de chimie 2010) dans la synthèse organique moderne",
    "Apprécier le délai de plusieurs décennies entre les premières publications de Heck, Negishi et Suzuki (années 1960-1970) et leur reconnaissance par le prix Nobel de chimie 2010"
  ],
  prereqs: ["Cycloadditions et réarrangements sigmatropiques", "Formation de liaisons C-C par les réactifs organométalliques"],
  bodyHtml: `
    <p>En 1979, au Japon, <strong>Akira Suzuki</strong> et son étudiant Norio Miyaura publient une méthode de couplage entre un acide boronique et un halogénure organique, catalysée par le palladium — une réaction qui, à l'époque, ne suscite qu'un intérêt limité. Combinée aux travaux menés dès les années 1960-1970 par <strong>Richard Heck</strong> (alors chercheur chez un industriel, Hercules Inc., avant de rejoindre l'université) et par <strong>Ei-ichi Negishi</strong> sur d'autres partenaires organométalliques, cette famille de réactions bâtira, sur plusieurs décennies, l'un des outils les plus employés de toute la chimie organique moderne — au point qu'aujourd'hui, le couplage de Suzuki-Miyaura entrerait dans la synthèse d'environ un quart des médicaments produits par l'industrie pharmaceutique. Cette contribution vaudra à Heck, Negishi et Suzuki le prix Nobel de chimie 2010, plus de trente ans après les premières publications.</p>

    <p>Depuis les années 1970-1980, les couplages croisés catalysés par des métaux de transition — au premier rang desquels le <strong>palladium</strong> — ont transformé la synthèse organique en permettant de former des liaisons C–C entre des fragments aromatiques ou vinyliques de façon fiable, douce et hautement chimiosélective.</p>

    <h3>1. Le cycle catalytique général</h3>
    <p>La plupart des couplages pallado-catalysés partagent la même séquence d'étapes élémentaires, formant un cycle catalytique qui se répète tant qu'il reste des réactifs :</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 240 130" width="100%">
          <circle cx="120" cy="65" r="46" fill="none" stroke="#8064F2" stroke-width="1.4" stroke-dasharray="2,2"/>
          <text x="94" y="30" font-family="IBM Plex Mono" font-size="9" fill="#3D6BF0">Pd(0)</text>
          <text x="20" y="70" font-family="IBM Plex Mono" font-size="8.5" fill="#122043">R-X (add. oxydante)</text>
          <text x="90" y="70" font-family="IBM Plex Mono" font-size="9" fill="#F0555C">R-Pd-X (II)</text>
          <text x="20" y="100" font-family="IBM Plex Mono" font-size="8.5" fill="#122043">R'-M (transmétalation)</text>
          <text x="90" y="115" font-family="IBM Plex Mono" font-size="9" fill="#1FB6A8">R-Pd-R'</text>
          <text x="170" y="70" font-family="IBM Plex Mono" font-size="8.5" fill="#122043">élim. réductrice</text>
          <text x="150" y="45" font-family="IBM Plex Mono" font-size="9" fill="#E8A93A">R-R' + Pd(0)</text>
        </svg>
        <span>Cycle catalytique général : addition oxydante → transmétalation → élimination réductrice</span>
      </div>
    </div>
    <table class="mini-table">
      <tr><th>Étape</th><th>Ce qui se passe</th></tr>
      <tr><td>Addition oxydante</td><td>Pd(0) s'insère dans la liaison C–X de l'halogénure (ou triflate) R–X, formant un complexe R–Pd(II)–X</td></tr>
      <tr><td>Transmétalation</td><td>le partenaire organométallique R'–M échange son groupe R' contre X sur le palladium : R–Pd(II)–R'</td></tr>
      <tr><td>Élimination réductrice</td><td>R et R' se couplent en une nouvelle liaison C–C, régénérant Pd(0) pour un nouveau cycle</td></tr>
    </table>

    <h3>2. Couplage de Suzuki-Miyaura</h3>
    <p>Le partenaire organométallique est un <strong>acide boronique</strong> (ou un ester boronique), R'–B(OH)2, activé par une base (K2CO3, Cs2CO3) qui forme un « ate »-complexe boronate facilitant la transmétalation. C'est le couplage le plus utilisé industriellement : les acides boroniques sont stables à l'air et à l'eau, peu toxiques, et le sous-produit boré s'élimine aisément — un avantage décisif en chimie pharmaceutique, où ce couplage sert notamment à assembler des structures biaryles.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La réaction de Suzuki-Miyaura n'a suscité qu'un intérêt limité lors de sa publication en 1979. Qu'est-ce que son adoption massive plusieurs décennies plus tard, au point de participer aujourd'hui à la synthèse d'un quart des médicaments produits industriellement, vous apprend sur la difficulté d'évaluer, au moment même de sa découverte, l'importance future d'une réaction chimique ?
    </div>

    <h3>3. Réaction de Heck</h3>
    <p>Le partenaire n'est pas un organométallique mais un <strong>alcène</strong> : après addition oxydante de R–X sur Pd(0), l'alcène s'insère dans la liaison Pd–C (insertion migratoire syn), puis une β-élimination d'hydrure régénère l'alcène substitué et Pd(0) (via Pd–H, reformé en Pd(0) actif par la base). Le produit est un <strong>alcène substitué</strong>, généralement de géométrie E majoritaire. Contrairement à Suzuki, Sonogashira et Negishi, Heck n'est pas classé stricto sensu comme un couplage croisé (il n'y a pas d'étape de transmétalation), mais son mécanisme reste centré sur le palladium.</p>

    <h3>4. Couplage de Sonogashira</h3>
    <p>Le partenaire est un <strong>alcyne terminal</strong>, activé par un <strong>co-catalyseur au cuivre(I)</strong> (CuI) qui forme un acétylure de cuivre transmétalant ensuite vers le palladium — d'où l'usage historique d'une base amine (Et3N, pipéridine). Des protocoles « sans cuivre » plus récents s'en dispensent, réduisant les risques de couplage homo-oxydatif de Glaser (dimérisation parasite de l'alcyne). Ce couplage donne accès direct aux <strong>alcynes disubstitués</strong> (aryl-alcynyle ou vinyl-alcynyle).</p>

    <h3>5. Couplage de Negishi</h3>
    <p>Le partenaire organométallique est un <strong>organozincique</strong>, R'–ZnX, plus réactif en transmétalation que les organostannanes ou les acides boroniques, ce qui permet des conditions plus douces et une bonne tolérance fonctionnelle. Ce couplage est particulièrement apprécié en synthèse totale de produits naturels pour sa fiabilité sur des substrats complexes, même si son usage industriel à grande échelle reste plus limité (sensibilité à l'air et à l'eau des réactifs organozinciques).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Suzuki (acide boronique), Negishi (organozincique) et Sonogashira (alcyne-cuivre) partagent tous les trois le même cycle catalytique de base au palladium, mais diffèrent uniquement par le partenaire organométallique utilisé en transmétalation. Qu'est-ce que cette unité mécanistique sous-jacente vous suggère sur la façon dont un chimiste pourrait, en principe, concevoir un tout nouveau couplage croisé à partir d'un partenaire organométallique encore inexploité ?
    </div>

    <table class="mini-table">
      <tr><th>Couplage</th><th>Partenaire organométallique / réactif</th><th>Produit typique</th></tr>
      <tr><td>Suzuki-Miyaura</td><td>acide/ester boronique R'-B(OH)2</td><td>biaryles, C(sp2)-C(sp2)</td></tr>
      <tr><td>Negishi</td><td>organozincique R'-ZnX</td><td>C(sp2)-C(sp3) ou C(sp2)-C(sp2), tolérance fonctionnelle élevée</td></tr>
      <tr><td>Sonogashira</td><td>alcyne terminal + co-catalyseur CuI</td><td>alcynes disubstitués (aryl/vinyl-alcynyle)</td></tr>
      <tr><td>Heck</td><td>alcène (pas de transmétalation)</td><td>alcène substitué (souvent E)</td></tr>
      <tr><td>Stille</td><td>organostannane R'-SnR''3</td><td>large tolérance fonctionnelle, mais toxicité de l'étain</td></tr>
    </table>

    <h3>6. Puissance rétrosynthétique de ces méthodes</h3>
    <p>Ces couplages permettent de déconnecter directement une liaison C(sp2)–C(sp2) ou C(sp2)–C(sp) d'une cible en un halogénure (ou triflate) aromatique/vinylique et un partenaire organométallique correspondant, avec une excellente tolérance des autres groupes fonctionnels de la molécule — un contraste net avec la sensibilité des organomagnésiens ou organolithiens classiques (chapitre 3). Cette robustesse explique pourquoi les couplages pallado-catalysés ont réduit de façon spectaculaire le nombre d'étapes de nombreuses synthèses totales modernes.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Cycle général : addition oxydante (Pd0 → PdII) → transmétalation → élimination réductrice (régénère Pd0)</li>
        <li>Suzuki : acide boronique + base ; Negishi : organozincique ; Sonogashira : alcyne terminal + CuI ; Heck : alcène, pas de transmétalation</li>
        <li>Ces méthodes tolèrent bien mieux les groupes fonctionnels que les organomagnésiens/lithiens classiques</li>
        <li>Prix Nobel de chimie 2010 : Heck, Negishi, Suzuki, pour le développement des couplages croisés pallado-catalysés</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Classer le couplage de Heck parmi les couplages croisés « classiques » : il n'a pas d'étape de transmétalation stricto sensu</li>
        <li>Oublier le rôle du co-catalyseur cuivre dans Sonogashira : sans lui (protocole classique), le couplage ne fonctionne pas efficacement</li>
        <li>Confondre le rôle de la base : dans Suzuki, elle active l'acide boronique en formant un boronate, elle ne déprotone pas un substrat organique</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans le cycle catalytique général d'un couplage croisé au palladium, quel est l'ordre correct des trois étapes ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn8e1" value="wrong"> Élimination réductrice → transmétalation → addition oxydante</label>
          <label class="option"><input type="radio" name="syn8e1" value="right"> Addition oxydante → transmétalation → élimination réductrice</label>
          <label class="option"><input type="radio" name="syn8e1" value="wrong"> Transmétalation → addition oxydante → élimination réductrice</label>
          <label class="option"><input type="radio" name="syn8e1" value="wrong"> Addition oxydante → élimination réductrice → transmétalation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn8e1','syn8fb1','Correct — Pd(0) s\\'insère d\\'abord dans R-X (addition oxydante), puis échange un ligand avec le partenaire organométallique (transmétalation), avant de coupler R et R\\' en régénérant Pd(0) (élimination réductrice).','Le palladium commence toujours à l\\'état Pd(0) et doit d\\'abord s\\'insérer dans la liaison C-X.')">Vérifier</button>
        <div class="feedback" id="syn8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quel couplage utilise un alcyne terminal et nécessite généralement un co-catalyseur au cuivre(I) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn8e2" value="wrong"> Suzuki-Miyaura</label>
          <label class="option"><input type="radio" name="syn8e2" value="wrong"> Negishi</label>
          <label class="option"><input type="radio" name="syn8e2" value="right"> Sonogashira</label>
          <label class="option"><input type="radio" name="syn8e2" value="wrong"> Heck</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn8e2','syn8fb2','Correct — Sonogashira couple un halogénure aromatique/vinylique avec un alcyne terminal, via un acétylure de cuivre(I) qui facilite la transmétalation.','Cherche le couplage qui donne des alcynes disubstitués.')">Vérifier</button>
        <div class="feedback" id="syn8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pourquoi les couplages pallado-catalysés sont-ils souvent préférés aux organomagnésiens classiques pour construire des liaisons C-C sur des molécules complexes ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn8e3" value="wrong"> Ils sont toujours moins chers</label>
          <label class="option"><input type="radio" name="syn8e3" value="right"> Ils tolèrent beaucoup mieux la présence d'autres groupes fonctionnels sur la molécule</label>
          <label class="option"><input type="radio" name="syn8e3" value="wrong"> Ils ne nécessitent aucun catalyseur métallique</label>
          <label class="option"><input type="radio" name="syn8e3" value="wrong"> Ils fonctionnent uniquement en l'absence de solvant</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn8e3','syn8fb3','Correct — contrairement aux organomagnésiens/lithiens, très basiques et peu sélectifs, les couplages pallado-catalysés tolèrent la présence de nombreux groupes fonctionnels sans les protéger, ce qui simplifie beaucoup les synthèses complexes.','Compare la compatibilité fonctionnelle vue au chapitre 3 sur les organométalliques classiques.')">Vérifier</button>
        <div class="feedback" id="syn8fb3"></div>
      </div>
    </div>

    <div class="frontier-box">
      <span class="eyebrow">🔭 Frontière de la recherche</span>
      <p>Le palladium restant un métal rare et coûteux, une recherche active vise à le remplacer par des métaux beaucoup plus abondants comme le <strong>nickel</strong>, capable de catalyser des couplages croisés analogues, parfois combinés à une catalyse photorédox pour activer des liaisons C–C ou C–hétéroatome habituellement inertes dans les conditions classiques du palladium. Une question de recherche reste ouverte : ces systèmes au nickel, souvent plus réactifs mais aussi plus sensibles à la décomposition, peuvent-ils un jour égaler la fiabilité et la tolérance fonctionnelle du palladium à l'échelle industrielle ?</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">📐 Synthèse visuelle</span>
      <p>Pd(0) + R–X → <strong>addition oxydante</strong> → R–Pd(II)–X → <strong>transmétalation</strong> avec le partenaire (R'-B(OH)₂ pour Suzuki, R'-ZnX pour Negishi, alcyne-Cu pour Sonogashira, ou insertion migratoire directe d'un alcène pour Heck) → R–Pd(II)–R' → <strong>élimination réductrice</strong> → R–R' + régénération de Pd(0) pour un nouveau cycle</p>
      <p><strong>Principe central du chapitre :</strong></p>
      <div class="formula-box">Pd(0) → Pd(II) → Pd(0) : le catalyseur n'est jamais consommé, seul le substrat se transforme</div>
    </div>

    <div class="reflection-box">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le palladium ne pouvait exister qu'au seul degré d'oxydation 0, sans jamais passer par Pd(II) — le cycle catalytique décrit dans ce chapitre serait-il seulement concevable ?</li>
        <li>Pourquoi a-t-il fallu attendre plus de trente ans entre les premières publications de Heck (dès les années 1960) et le prix Nobel de 2010, alors que d'autres découvertes sont récompensées bien plus rapidement ?</li>
        <li>Quelle serait la conséquence, pour la synthèse d'un médicament comportant plusieurs halogènes différents sur le même noyau aromatique, du choix d'un couplage de Suzuki appliqué sans discrimination à tous les sites halogénés à la fois ?</li>
      </ul>
    </div>

    <div class="biblio-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>N. Miyaura, A. Suzuki, <em>Stereoselective Synthesis of Arylated (E)-Alkenes by the Reaction of Alk-1-enylboranes with Aryl Halides in the Presence of Palladium Catalyst</em>, Journal of the Chemical Society, Chemical Communications, 1979 — l'article fondateur du couplage de Suzuki-Miyaura.</li>
        <li>R.F. Heck, J.P. Nolley, <em>Palladium-Catalyzed Vinylic Hydrogen Substitution Reactions with Aryl, Benzyl, and Styryl Halides</em>, Journal of Organic Chemistry, 1972 — l'un des articles fondateurs de la réaction de Heck.</li>
        <li>J. Clayden, N. Greeves, S. Warren, <em>Organic Chemistry</em>, Oxford University Press — référence standard de niveau L3/master pour ce chantier de synthèse organique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais faire jouer au palladium le rôle de chef d'orchestre d'une liaison C–C, comme Heck, Negishi et Suzuki l'ont chacun démontré avant que le monde n'en mesure pleinement la portée. Il reste une dimension entière de la synthèse que nous n'avons pas encore abordée frontalement : contrôler non seulement quelle liaison se forme, mais aussi de quel côté de l'espace — direction le chapitre suivant, avec la stéréochimie et la synthèse asymétrique.</p>
  `
};

SYNTH_NOVA_KB[synKey("Couplages pallado-catalysés et catalyse par les métaux de transition")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Couplages pallado-catalysés ». Demande-moi le cycle catalytique général, la différence entre Suzuki et Negishi, ou un indice sur un exercice.",
  rules: [
    { test:/cycle catalytique|addition oxydante|transm[ée]talation|[ée]limination r[ée]ductrice/i, replies:["Le cycle général : addition oxydante (Pd0 s'insère dans R-X) → transmétalation (échange avec R'-M) → élimination réductrice (R-R' se forme, Pd0 régénéré)."] },
    { test:/suzuki/i, replies:["Suzuki-Miyaura utilise un acide (ou ester) boronique R'-B(OH)2, activé par une base. C'est le couplage le plus utilisé industriellement : réactifs stables, peu toxiques, sous-produit facile à éliminer."] },
    { test:/negishi/i, replies:["Negishi utilise un organozincique R'-ZnX, très réactif en transmétalation, offrant une bonne tolérance fonctionnelle — très apprécié en synthèse totale."] },
    { test:/sonogashira/i, replies:["Sonogashira couple un halogénure aromatique/vinylique avec un alcyne terminal, via un co-catalyseur au cuivre(I) qui forme l'acétylure transmétalant."] },
    { test:/heck/i, replies:["Heck fait réagir un halogénure avec un alcène (pas d'organométallique, donc pas de vraie transmétalation) : insertion migratoire puis β-élimination donnent un alcène substitué, souvent E."] },
    { test:/nobel/i, replies:["Richard Heck, Ei-ichi Negishi et Akira Suzuki ont reçu le prix Nobel de chimie 2010 pour le développement des couplages croisés catalysés au palladium."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le palladium commence toujours à l'état Pd(0).","Indice niveau 2 : il doit d'abord s'insérer dans la liaison C-X (addition oxydante).","Indice niveau 3 : ordre correct : addition oxydante → transmétalation → élimination réductrice."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : cherche le couplage qui donne des alcynes disubstitués.","Indice niveau 2 : il utilise un alcyne terminal.","Indice niveau 3 : c'est Sonogashira, avec un co-catalyseur CuI."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : repense au chapitre sur les organomagnésiens (compatibilité fonctionnelle).","Indice niveau 2 : les organomagnésiens sont très basiques, peu tolérants.","Indice niveau 3 : les couplages Pd tolèrent bien mieux les autres groupes fonctionnels."] }
  ]
};

/* =========================== CHAPITRE 9 =========================== */
SYNTH_CHAPTERS[synKey("Stéréochimie et synthèse asymétrique")] = {
  objectives: [
    "Distinguer diastéréosélectivité et énantiosélectivité dans le contexte d'une synthèse",
    "Décrire le principe des auxiliaires chiraux (oxazolidinones d'Evans) pour une alkylation ou une aldolisation asymétrique",
    "Citer les grandes méthodes de catalyse asymétrique : hydrogénation de Noyori, dihydroxylation et époxydation de Sharpless",
    "Comprendre le principe d'une résolution cinétique et ses limites (rendement maximal théorique)",
    "Relier la tragédie du thalidomide (années 1950-1960) à l'exigence moderne de contrôle rigoureux de la stéréochimie en synthèse pharmaceutique"
  ],
  prereqs: ["Couplages pallado-catalysés et catalyse par les métaux de transition", "Stéréochimie générale : énantiomères, diastéréomères, excès énantiomérique"],
  bodyHtml: `
    <p>Dans les années 1950-1960, un médicament appelé <strong>thalidomide</strong>, prescrit contre les nausées de grossesse, provoque des milliers de malformations congénitales graves avant d'être retiré du marché. On découvre plus tard que la molécule est chirale : un énantiomère possède l'effet sédatif recherché, tandis que l'autre est tératogène — et, la molécule s'épimérisant spontanément dans l'organisme, même un médicament administré sous forme d'un seul énantiomère pur aurait fini par produire le même désastre. Cette tragédie, l'une des plus marquantes de l'histoire de la pharmacologie, a durablement transformé la réglementation entourant les médicaments chiraux et a fait de la maîtrise de la stéréochimie un enjeu de sécurité sanitaire autant que de synthèse.</p>

    <p>La plupart des molécules d'intérêt biologique (médicaments, produits naturels) sont chirales, et souvent seul un énantiomère possède l'activité recherchée. Contrôler la stéréochimie d'une synthèse — au-delà de la simple construction du squelette carboné — est donc un enjeu central de la synthèse organique moderne.</p>

    <h3>1. Diastéréosélectivité contre énantiosélectivité</h3>
    <p>Quand une réaction crée un nouveau centre stéréogène en présence d'un centre stéréogène déjà existant dans la molécule (chapitre 6, modèle de Felkin-Anh), on parle de <strong>diastéréosélectivité</strong> : les deux diastéréomères possibles ont des énergies d'état de transition différentes, ce qui suffit à orienter la sélectivité. Quand la molécule de départ est <strong>achirale</strong> (ou prochirale) et que la réaction doit créer une chiralité nouvelle en discriminant deux faces énantiotopes équivalentes, on parle d'<strong>énantiosélectivité</strong> : cela exige nécessairement un « réactif chiral » — auxiliaire, catalyseur ou réactif énantiopur — car deux entités achirales ne peuvent jamais, seules, distinguer deux faces énantiotopes.</p>

    <h3>2. Auxiliaires chiraux : les oxazolidinones d'Evans</h3>
    <p>Un <strong>auxiliaire chiral</strong> est un groupement énantiopur, fixé de façon covalente et temporaire sur le substrat, qui impose sa chiralité à la nouvelle liaison formée avant d'être retiré en fin de séquence. Les <strong>oxazolidinones d'Evans</strong>, dérivées d'acides aminés naturels (valine, phénylalaninol), sont couplées à un acide carboxylique sous forme d'imide N-acyle. La déprotonation en α (formation d'un énolate de bore ou de lithium, chapitre 4) est fortement dirigée par la face qu'occupe le substituant de l'auxiliaire, ce qui impose une haute diastéréosélectivité à l'alkylation ou à l'aldolisation qui suit. L'auxiliaire est ensuite clivé (hydrolyse ou transestérification) pour libérer le produit énantioenrichi et régénérer l'auxiliaire, qui peut être réutilisé.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      L'utilisation d'un auxiliaire chiral transforme un problème d'énantiosélectivité en un problème de <strong>diastéréosélectivité</strong>, beaucoup plus facile à contrôler (les diastéréomères sont séparables par chromatographie classique, contrairement aux énantiomères). C'est le prix à payer : deux étapes supplémentaires (installation puis retrait de l'auxiliaire) pour un contrôle stéréochimique fiable.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si le thalidomide avait été commercialisé sous forme d'un seul énantiomère pur, obtenu par exemple grâce à un auxiliaire chiral d'Evans, le drame aurait tout de même eu lieu, la molécule s'épimérisant spontanément une fois dans l'organisme. Qu'est-ce que ce cas particulier vous apprend sur les limites du contrôle stéréochimique en synthèse, face à la stabilité configurationnelle réelle d'une molécule une fois administrée ?
    </div>

    <h3>3. Catalyse asymétrique : l'hydrogénation de Noyori</h3>
    <p>Contrairement à l'auxiliaire chiral, un <strong>catalyseur chiral</strong> n'est utilisé qu'en quantité sous-stœchiométrique et n'est jamais incorporé dans le produit final. Ryōji Noyori a développé des complexes de <strong>ruthénium chiraux avec le ligand BINAP</strong> (une diphosphine axialement chirale) qui réalisent l'hydrogénation asymétrique de cétones β-fonctionnalisées ou d'alcènes prochiraux avec des excès énantiomériques souvent supérieurs à 95 %. Cette découverte, avec les travaux de K. B. Sharpless et W. S. Knowles sur la catalyse asymétrique, a valu à ces trois chimistes le prix Nobel de chimie 2001.</p>

    <h3>4. Dihydroxylation et époxydation asymétriques de Sharpless</h3>
    <table class="mini-table">
      <tr><th>Méthode</th><th>Substrat</th><th>Catalyseur / réactif chiral</th><th>Produit</th></tr>
      <tr><td>Dihydroxylation asymétrique de Sharpless (AD)</td><td>alcène</td><td>OsO4 catalytique + ligand chiral dérivé de la dihydroquinine/dihydroquinidine (AD-mix-α ou -β)</td><td>1,2-diol énantioenrichi</td></tr>
      <tr><td>Époxydation asymétrique de Sharpless</td><td>alcool allylique</td><td>Ti(OiPr)4 + tartrate diéthylique énantiopur + TBHP</td><td>époxyde énantioenrichi, régiodirigé par l'alcool</td></tr>
      <tr><td>Époxydation de Jacobsen</td><td>alcène non fonctionnalisé (styrènes, alcènes cis)</td><td>complexe de manganèse-salen chiral</td><td>époxyde énantioenrichi</td></tr>
    </table>
    <p>Ces méthodes catalytiques, contrairement aux auxiliaires chiraux, n'ajoutent pas d'étapes de fixation/retrait : le contrôle stéréochimique se fait directement sur le substrat, avec un catalyseur chiral utilisé en faible quantité — un avantage économique et pratique majeur, particulièrement pour la production à grande échelle.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les méthodes de Sharpless et de Jacobsen utilisent des catalyseurs métalliques chiraux différents (titane-tartrate, manganèse-salen) pour des substrats différents (alcool allylique, alcène non fonctionnalisé). Qu'est-ce que cette diversité de catalyseurs, chacun optimisé pour un cas précis, vous suggère sur l'existence — ou l'absence — d'une méthode catalytique universelle valable pour n'importe quel alcène ?
    </div>

    <h3>5. Résolution cinétique</h3>
    <p>Lorsque le mélange racémique d'un substrat est déjà en main, une <strong>résolution cinétique</strong> exploite un réactif ou un catalyseur chiral qui réagit plus vite avec l'un des deux énantiomères du substrat qu'avec l'autre. Une résolution cinétique classique (non catalytique et non dynamique) a un rendement maximal théorique de <strong>50 %</strong> pour l'énantiomère recherché (l'autre moitié du racémique reste inchangée ou réagit lentement) — une limite qui a motivé le développement de <strong>résolutions cinétiques dynamiques</strong> (DKR), où le substrat non désiré s'épimérise in situ pour alimenter continûment la voie réactive, permettant en théorie un rendement proche de 100 %.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Diastéréosélectivité : discrimination entre deux diastéréomères (centre stéréogène déjà présent). Énantiosélectivité : nécessite un agent chiral (substrat achiral de départ)</li>
        <li>Auxiliaire chiral (Evans) : fixé de façon covalente, transforme le problème en diastéréosélectivité, retiré en fin de séquence</li>
        <li>Catalyse asymétrique (Noyori, Sharpless, Jacobsen) : catalyseur chiral sous-stœchiométrique, pas d'étapes supplémentaires d'installation/retrait</li>
        <li>Résolution cinétique classique : rendement maximal théorique de 50 % ; la version dynamique (DKR) permet de dépasser cette limite</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Penser qu'un réactif achiral peut, seul, créer une énantiosélectivité : c'est physiquement impossible sans agent chiral</li>
        <li>Confondre auxiliaire chiral (incorporé puis retiré, quantité stœchiométrique) et catalyseur chiral (jamais incorporé, quantité sous-stœchiométrique)</li>
        <li>Oublier la limite de rendement de 50 % d'une résolution cinétique classique (non dynamique)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pourquoi un réactif totalement achiral ne peut-il jamais rendre une réaction énantiosélective sur un substrat prochiral ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn9e1" value="wrong"> Parce que les réactifs achiraux sont toujours trop peu réactifs</label>
          <label class="option"><input type="radio" name="syn9e1" value="right"> Parce qu'il ne peut pas distinguer deux faces énantiotopes, physiquement équivalentes pour lui</label>
          <label class="option"><input type="radio" name="syn9e1" value="wrong"> Parce que la température doit toujours être négative</label>
          <label class="option"><input type="radio" name="syn9e1" value="wrong"> Ce n'est pas vrai, cela arrive souvent</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn9e1','syn9fb1','Correct — deux faces énantiotopes sont l\\'image miroir l\\'une de l\\'autre : seul un environnement chiral (catalyseur, auxiliaire, réactif énantiopur) peut créer une différence d\\'énergie entre les deux états de transition possibles.','Deux entités achirales, mises en présence l\\'une de l\\'autre, ne peuvent générer aucune préférence entre deux images miroir.')">Vérifier</button>
        <div class="feedback" id="syn9fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quelle est la principale différence entre un auxiliaire chiral et un catalyseur chiral ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn9e2" value="right"> L'auxiliaire est fixé de façon covalente (stœchiométrique) puis retiré ; le catalyseur n'est jamais incorporé et agit en quantité sous-stœchiométrique</label>
          <label class="option"><input type="radio" name="syn9e2" value="wrong"> Ils sont strictement équivalents et interchangeables</label>
          <label class="option"><input type="radio" name="syn9e2" value="wrong"> Seul le catalyseur chiral peut être recyclé</label>
          <label class="option"><input type="radio" name="syn9e2" value="wrong"> L'auxiliaire chiral ne fonctionne que sur les alcènes</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn9e2','syn9fb2','Correct — l\\'auxiliaire (ex. oxazolidinone d\\'Evans) est lié de façon covalente au substrat en quantité stœchiométrique puis retiré ; le catalyseur (ex. Ru-BINAP de Noyori) n\\'est jamais incorporé dans le produit et n\\'est nécessaire qu\\'en faible quantité.','Repense à la séquence Evans : installation, réaction, retrait — contre une catalyse directe sur le substrat.')">Vérifier</button>
        <div class="feedback" id="syn9fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Quel est le rendement maximal théorique d'une résolution cinétique classique (non dynamique) pour l'énantiomère recherché ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn9e3" value="wrong"> 100 %</label>
          <label class="option"><input type="radio" name="syn9e3" value="wrong"> 75 %</label>
          <label class="option"><input type="radio" name="syn9e3" value="right"> 50 %</label>
          <label class="option"><input type="radio" name="syn9e3" value="wrong"> 25 %</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn9e3','syn9fb3','Correct — dans un mélange racémique, au mieux la moitié (l\\'énantiomère qui réagit vite) est convertie sélectivement ; l\\'autre moitié reste inchangée. La résolution cinétique dynamique (DKR) permet de dépasser cette limite par épimérisation continue du substrat non désiré.','Le racémique contient 50/50 des deux énantiomères ; seule la moitié réactive est transformée dans une résolution cinétique classique.')">Vérifier</button>
        <div class="feedback" id="syn9fb3"></div>
      </div>
    </div>

    <div class="frontier-box">
      <span class="eyebrow">🔭 Frontière de la recherche</span>
      <p>Une alternative de plus en plus employée aux catalyseurs métalliques chiraux est la <strong>biocatalyse</strong> : des enzymes, naturelles ou obtenues par évolution dirigée en laboratoire (une méthode récompensée par le prix Nobel de chimie 2018), catalysent des transformations asymétriques avec une sélectivité souvent inégalée, dans des conditions douces et sans métaux lourds. Une question de recherche reste ouverte : l'ingénierie enzymatique par évolution dirigée peut-elle être rendue assez rapide pour suivre le rythme de découverte de nouvelles molécules candidates-médicaments nécessitant chacune une synthèse asymétrique sur mesure ?</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">📐 Synthèse visuelle</span>
      <p>Substrat prochiral ou achiral → nécessité d'un agent chiral pour discriminer deux faces énantiotopes → <strong>auxiliaire chiral</strong> (covalent, stœchiométrique, installé puis retiré ; ex. oxazolidinones d'Evans) ou <strong>catalyseur chiral</strong> (sous-stœchiométrique, jamais incorporé ; ex. Ru-BINAP de Noyori, Sharpless, Jacobsen) → produit énantioenrichi — si le racémique est déjà en main : <strong>résolution cinétique</strong> (rendement max. 50 %) ou sa version dynamique, la <strong>DKR</strong> (jusqu'à ~100 %)</p>
      <p><strong>Équation clé du chapitre :</strong></p>
      <div class="formula-box">$$ee\\,(\\%) = \\dfrac{|[R]-[S]|}{[R]+[S]} \\times 100$$</div>
    </div>

    <div class="reflection-box">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la thalidomide n'avait présenté aucune épimérisation in vivo — un contrôle rigoureux de l'énantiopureté lors de la synthèse aurait-il alors suffi, à lui seul, à éviter le drame ?</li>
        <li>Pourquoi un auxiliaire chiral, malgré le coût de deux étapes supplémentaires, reste-t-il parfois préféré à un catalyseur chiral en synthèse totale de produits naturels complexes ?</li>
        <li>Quelle serait la conséquence, sur le rendement final d'une synthèse asymétrique, du remplacement d'une résolution cinétique dynamique (DKR) par une résolution cinétique classique, pour un substrat par ailleurs identique ?</li>
      </ul>
    </div>

    <div class="biblio-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>T. Eriksson, S. Björkman, P. Höglund, <em>Clinical Pharmacology of Thalidomide</em>, European Journal of Clinical Pharmacology, 2001 — revue documentant la chiralité et l'épimérisation in vivo du thalidomide.</li>
        <li>E.L. Eliel, S.H. Wilen, <em>Stereochemistry of Organic Compounds</em>, Wiley — l'ouvrage de référence incontournable pour la stéréochimie de ce chapitre.</li>
        <li>F.H. Arnold, <em>Directed Evolution: Bringing New Chemistry to Life</em>, Angewandte Chemie International Edition, 2018 — pour la biocatalyse évoquée en Frontière de la recherche.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais contrôler non seulement quelle liaison se forme, mais aussi de quel côté de l'espace — une leçon que la tragédie du thalidomide a rendue tragiquement incontournable pour toute l'industrie pharmaceutique. Il est temps de rassembler tous les outils de ce module en une démarche complète : direction le dernier chapitre de cette matière, avec la stratégie de synthèse totale.</p>
  `
};

SYNTH_NOVA_KB[synKey("Stéréochimie et synthèse asymétrique")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Stéréochimie et synthèse asymétrique ». Demande-moi la différence entre auxiliaire et catalyseur chiral, comment marche Sharpless, ou un indice sur un exercice.",
  rules: [
    { test:/[ée]vans|auxiliaire/i, replies:["Un auxiliaire chiral (ex. oxazolidinone d'Evans) est fixé de façon covalente et stœchiométrique sur le substrat, dirige la stéréochimie d'une alkylation/aldolisation, puis est retiré et peut être réutilisé."] },
    { test:/noyori/i, replies:["Noyori a développé des catalyseurs de ruthénium chiraux au ligand BINAP pour l'hydrogénation asymétrique de cétones et d'alcènes, avec des excès énantiomériques souvent supérieurs à 95 % — prix Nobel de chimie 2001."] },
    { test:/sharpless/i, replies:["Sharpless a développé la dihydroxylation asymétrique (OsO4 + ligand chiral dérivé de la quinine) et l'époxydation asymétrique des alcools allyliques (Ti(OiPr)4 + tartrate chiral + TBHP)."] },
    { test:/jacobsen/i, replies:["L'époxydation de Jacobsen utilise un complexe manganèse-salen chiral pour époxyder de façon énantiosélective des alcènes non fonctionnalisés, comme les styrènes."] },
    { test:/r[ée]solution cin[ée]tique/i, replies:["Une résolution cinétique classique sépare un racémique grâce à une réactivité différente des deux énantiomères face à un réactif chiral — rendement maximal théorique de 50 %. La version dynamique (DKR) permet de dépasser cette limite."] },
    { test:/diastereosel|enantiosel|[ée]nantios[ée]lectiv|diast[ée]r[ée]os[ée]lectiv/i, replies:["Diastéréosélectivité : le substrat de départ est déjà chiral (un centre stéréogène préexistant oriente la réaction). Énantiosélectivité : le substrat de départ est achiral, il faut un agent chiral externe pour créer une préférence."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la symétrie miroir des deux faces énantiotopes.","Indice niveau 2 : un environnement achiral ne peut pas les différencier.","Indice niveau 3 : il faut un agent chiral pour créer une différence d'énergie entre les deux états de transition."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : l'un est lié au substrat, l'autre non.","Indice niveau 2 : l'auxiliaire est stœchiométrique et retiré ensuite.","Indice niveau 3 : le catalyseur, lui, n'est jamais incorporé et agit en faible quantité."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à la composition d'un racémique.","Indice niveau 2 : il contient 50 % de chaque énantiomère.","Indice niveau 3 : seule la moitié réactive est convertie dans une résolution cinétique classique : 50 % maximum."] }
  ]
};

/* ========================== CHAPITRE 10 =========================== */
SYNTH_CHAPTERS[synKey("Stratégie de synthèse totale : méthodologie et études de cas")] = {
  objectives: [
    "Intégrer les outils des chapitres précédents dans une planification de synthèse multi-étapes complète",
    "Calculer et interpréter le rendement global d'une séquence de synthèse",
    "Argumenter le choix de l'ordre des opérations (installation des stéréocentres, moment de la déprotection, étape la plus sensible en dernier)",
    "Analyser une étude de cas de synthèse totale publiée et identifier les grandes déconnexions utilisées",
    "Situer, à travers la synthèse totale de la vitamine B12 par Woodward et Eschenmoser (1961-1972), l'ampleur que peut atteindre l'intégration méthodologique visée par ce chapitre"
  ],
  prereqs: ["Stéréochimie et synthèse asymétrique", "Analyse rétrosynthétique : stratégies et méthodologie", "L'ensemble des méthodes des chapitres 2 à 9"],
  bodyHtml: `
    <p>Entre 1961 et 1972, <strong>Robert B. Woodward</strong> et <strong>Albert Eschenmoser</strong> dirigent, avec la collaboration d'une centaine de chimistes répartis entre Harvard et l'ETH Zurich, la synthèse totale de la <strong>vitamine B12</strong> — une molécule d'une complexité alors sans précédent, dotée de neuf centres stéréogènes contigus et d'un noyau corrine inédit. Cette entreprise, souvent citée comme l'un des sommets de l'histoire de la synthèse organique, a nécessité plus de soixante-dix étapes réactionnelles et a directement inspiré le développement de nouvelles méthodes (dont certains réarrangements sigmatropiques et cycloadditions vus au chapitre 7), devenues depuis des outils standards du chimiste de synthèse.</p>

    <p>Ce projet titanesque illustre, à une échelle rarement égalée, exactement la démarche que ce dernier chapitre propose de systématiser à votre niveau : combiner rétrosynthèse, protection, formation de liaisons C–C, contrôle rédox et stéréochimie en une stratégie cohérente, où chaque étape est pensée en fonction de toutes celles qui la précèdent et la suivent.</p>

    <p>Ce dernier chapitre ne présente pas de nouvelle réaction : il propose une méthodologie pour combiner tous les outils vus dans ce module — rétrosynthèse, groupes protecteurs, formation de liaisons C–C, contrôle rédox, stéréochimie — afin de concevoir une synthèse totale complète et cohérente.</p>

    <h3>1. Le rendement global : une contrainte qui structure toute la stratégie</h3>
    <p>Pour une séquence linéaire de n étapes de rendement moyen r, le rendement global vaut r^n : à titre indicatif, une séquence de 10 étapes à 85 % de rendement moyen par étape (un très bon score dans l'absolu) ne conserve que 0,85^10 ≈ 20 % du produit de départ. Cette réalité arithmétique impose deux réflexes stratégiques systématiques : <strong>minimiser le nombre d'étapes</strong> (privilégier les réactions qui construisent plusieurs liaisons ou plusieurs stéréocentres à la fois, comme le Diels-Alder) et <strong>privilégier la convergence</strong> (chapitre 1) dès que la complexité de la cible le permet.</p>

    <h3>2. Ordonner les étapes : principes généraux</h3>
    <table class="mini-table">
      <tr><th>Principe</th><th>Justification</th></tr>
      <tr><td>Placer l'étape la plus sensible/la plus faible en rendement le plus tôt possible</td><td>éviter d'investir de nombreuses étapes coûteuses sur un intermédiaire qui pourrait finalement ne pas se former</td></tr>
      <tr><td>Introduire les stéréocentres critiques tôt, quand la molécule est encore simple</td><td>un contrôle diastéréosélectif ou une catalyse asymétrique est plus prévisible sur un substrat simple, avant l'accumulation d'autres groupes fonctionnels</td></tr>
      <tr><td>Retirer les groupes protecteurs le plus tard possible, dans l'ordre inverse de leur installation</td><td>minimise le nombre de fonctions libres exposées aux réactifs des étapes intermédiaires</td></tr>
      <tr><td>Garder les fonctions les plus fragiles (esters activés, énolisables sensibles) pour la fin</td><td>réduit le risque de dégradation lors des étapes antérieures, souvent plus robustes</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Sur une synthèse de plus de soixante-dix étapes comme celle de la vitamine B12, une seule erreur d'ordonnancement (une déprotection trop précoce, un stéréocentre installé trop tard) peut compromettre des mois de travail. Qu'est-ce que cette échelle extrême vous apprend sur l'importance de la planification par rapport à la seule habileté expérimentale, dans une synthèse totale de grande ampleur ?
    </div>

    <h3>3. Étude de cas guidée : une cétone γ,δ-insaturée aromatique</h3>
    <p>Prenons pour cible une cétone benzylique portant une insaturation terminale, obtenue classiquement en travaux pratiques de L3 : <em>C6H5-CH2-CH2-CH2-C(=O)-CH=CH2</em> (schématique). L'analyse rétrosynthétique combine plusieurs outils du module :</p>
    <table class="mini-table">
      <tr><th>Étape rétrosynthétique</th><th>Outil mobilisé</th><th>Chapitre</th></tr>
      <tr><td>Déconnexion de la double liaison terminale C=C</td><td>oléfination de Wittig (ylure non stabilisé → Z, ou HWE → E selon la géométrie visée)</td><td>Ch. 5</td></tr>
      <tr><td>Déconnexion de la chaîne benzylique en α du carbonyle</td><td>alkylation d'un énolate cinétique (LDA, PhCH2CH2CH2Br)</td><td>Ch. 4</td></tr>
      <tr><td>Ajustement du degré d'oxydation de la chaîne latérale</td><td>oxydation de Swern d'un alcool primaire intermédiaire</td><td>Ch. 6</td></tr>
    </table>
    <p>Une fois la voie rétrosynthétique arrêtée, la synthèse directe s'écrit dans l'ordre inverse : préparation du précurseur bromé, formation de l'énolate cinétique de la méthylvinylcétone (ou d'un équivalent protégé), alkylation, puis ajustement final de l'oxydation avant l'oléfination terminale — un enchaînement qui illustre comment les chapitres de ce module s'articulent concrètement dans une synthèse réelle.</p>

    <h3>4. L'apport de la catalyse moderne : raccourcir les synthèses historiques</h3>
    <p>De nombreuses synthèses totales historiques, conçues avant l'essor de la catalyse organométallique (années 1970-2000), comptaient plusieurs dizaines d'étapes. L'introduction des couplages pallado-catalysés (chapitre 8) et de la catalyse asymétrique (chapitre 9) a permis, dans de nombreux cas publiés dans la littérature, de <strong>raccourcir radicalement</strong> ces séquences : une déconnexion Suzuki ou Negishi remplace souvent plusieurs étapes d'installation et de protection nécessaires avec les méthodes organométalliques classiques, tout en améliorant le rendement global et la tolérance fonctionnelle.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La synthèse de la vitamine B12 a mobilisé une centaine de chimistes pendant plus d'une décennie, avant l'essor des couplages pallado-catalysés et de la catalyse asymétrique modernes. Si cette même synthèse était entreprise aujourd'hui avec l'arsenal complet de ce module, à quel type de réduction (du nombre d'étapes ? du nombre de chimistes impliqués ? de la durée totale ?) vous attendriez-vous, et pourquoi ces trois grandeurs ne sont-elles pas nécessairement réduites dans les mêmes proportions ?
    </div>

    <h3>5. Documenter et vérifier une synthèse : la démarche du chimiste</h3>
    <p>Avant de s'engager en laboratoire dans une séquence de synthèse, le chimiste vérifie systématiquement, pour chaque étape envisagée : l'existence d'un précédent documenté dans la littérature sur un substrat structurellement proche, la compatibilité fonctionnelle avec tous les autres groupes présents à ce stade de la molécule, et la disponibilité commerciale ou la facilité de préparation de chaque réactif. Cette démarche de vérification, plus que la seule créativité de l'analyse rétrosynthétique, est ce qui distingue une synthèse qui fonctionne réellement en laboratoire d'un simple exercice sur le papier.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Rendement global = produit des rendements de chaque étape : minimiser le nombre d'étapes et privilégier la convergence sont deux réflexes stratégiques majeurs</li>
        <li>Ordonner les étapes : sensible tôt, stéréocentres critiques tôt, déprotections tardives, fonctions fragiles en fin de synthèse</li>
        <li>Une bonne synthèse totale combine rétrosynthèse (ch.1), protection (ch.2), formation de liaisons C-C (ch.3-4-5-8), contrôle rédox (ch.6), cycloadditions (ch.7) et stéréochimie (ch.9)</li>
        <li>La catalyse moderne (couplages Pd, catalyse asymétrique) a considérablement raccourci les synthèses totales par rapport aux méthodes classiques</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Négliger l'impact du nombre d'étapes sur le rendement global : deux voies « similaires sur le papier » peuvent différer d'un facteur 5 en rendement final</li>
        <li>Installer les stéréocentres critiques trop tard, sur une molécule déjà encombrée par de nombreux groupes fonctionnels : la sélectivité en pâtit</li>
        <li>Oublier de vérifier la compatibilité fonctionnelle d'une étape avec l'ensemble des groupes déjà présents sur l'intermédiaire, pas seulement avec la fonction visée</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une synthèse linéaire de 8 étapes a un rendement moyen de 90 % par étape. Quel est approximativement son rendement global ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn10e1" value="wrong"> 90 %</label>
          <label class="option"><input type="radio" name="syn10e1" value="wrong"> 72 %</label>
          <label class="option"><input type="radio" name="syn10e1" value="right"> Environ 43 % (0,9^8)</label>
          <label class="option"><input type="radio" name="syn10e1" value="wrong"> Environ 10 %</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn10e1','syn10fb1','Correct — 0,9^8 ≈ 0,43, soit environ 43 %. Même avec un excellent rendement moyen par étape, l\\'accumulation sur 8 étapes fait chuter significativement le rendement global.','Calcule 0,9 à la puissance 8, pas 0,9 multiplié par 8.')">Vérifier</button>
        <div class="feedback" id="syn10fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pourquoi vaut-il mieux, en général, installer un stéréocentre critique tôt dans une synthèse plutôt que tard ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn10e2" value="wrong"> Parce que cela coûte toujours moins cher</label>
          <label class="option"><input type="radio" name="syn10e2" value="right"> Parce que le contrôle stéréochimique est plus prévisible sur un substrat simple, avant l'accumulation d'autres groupes fonctionnels</label>
          <label class="option"><input type="radio" name="syn10e2" value="wrong"> Parce que la loi impose cet ordre</label>
          <label class="option"><input type="radio" name="syn10e2" value="wrong"> Ce n'est jamais préférable, l'ordre n'a pas d'importance</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn10e2','syn10fb2','Correct — sur un substrat simple, les modèles de sélectivité (Felkin-Anh, Zimmerman-Traxler, auxiliaires chiraux…) sont plus fiables, avec moins d\\'interférences stériques ou électroniques provenant d\\'autres groupes fonctionnels.','Pense à la complexité croissante de la molécule au fil de la synthèse, et à sa influence sur la prévisibilité des modèles stéréochimiques.')">Vérifier</button>
        <div class="feedback" id="syn10fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Quel est l'un des principaux apports des couplages pallado-catalysés (Suzuki, Negishi…) aux synthèses totales modernes ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="syn10e3" value="wrong"> Ils suppriment totalement le besoin de rétrosynthèse</label>
          <label class="option"><input type="radio" name="syn10e3" value="right"> Ils permettent souvent de raccourcir significativement les séquences, en formant des liaisons C-C avec une meilleure tolérance fonctionnelle</label>
          <label class="option"><input type="radio" name="syn10e3" value="wrong"> Ils ne fonctionnent que sur des molécules achirales</label>
          <label class="option"><input type="radio" name="syn10e3" value="wrong"> Ils remplacent toujours les groupes protecteurs par des groupes silylés</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('syn10e3','syn10fb3','Correct — grâce à leur excellente tolérance fonctionnelle (chapitre 8), ces couplages évitent souvent plusieurs étapes de protection/déprotection nécessaires avec des méthodes organométalliques plus anciennes, raccourcissant la synthèse globale.','Repense à la comparaison du chapitre 8 entre couplages au palladium et organomagnésiens/lithiens classiques.')">Vérifier</button>
        <div class="feedback" id="syn10fb3"></div>
      </div>
    </div>

    <div class="frontier-box">
      <span class="eyebrow">🔭 Frontière de la recherche</span>
      <p>Des laboratoires de recherche développent aujourd'hui des <strong>plateformes robotiques de synthèse</strong> capables d'exécuter physiquement une séquence multi-étapes planifiée par un logiciel, sans intervention humaine directe sur la paillasse — une sorte de descendant à la fois du LHASA de Corey (chapitre 1) et de l'exécution manuelle d'une synthèse comme celle de la vitamine B12. Une question de recherche reste grande ouverte : ces plateformes, déjà capables de reproduire des synthèses de complexité modérée, pourront-elles un jour mener à bien, de façon totalement autonome, une synthèse de l'ampleur de celle de la vitamine B12 ?</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">📐 Synthèse visuelle</span>
      <p>Cible complexe → rétrosynthèse multi-voies (chapitre 1) → choix linéaire/convergent selon le rendement global → planification de l'ordre des étapes (stéréocentres critiques tôt, déprotections tardives, fonctions fragiles en fin) → mobilisation successive des outils du module (protection, formation de liaisons C–C, contrôle rédox, cycloadditions, stéréochimie) → vérification systématique (précédent documenté, compatibilité fonctionnelle, disponibilité des réactifs) → synthèse totale réalisée</p>
      <p><strong>Résultat central du chapitre — et de toute la matière :</strong></p>
      <div class="formula-box">$$\\text{Rendement global} = r^n \\quad\\Rightarrow\\quad \\text{minimiser } n\\text{, privilégier la convergence}$$</div>
    </div>

    <div class="reflection-box">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Woodward et Eschenmoser avaient eu accès, dès 1961, aux couplages pallado-catalysés et à la catalyse asymétrique moderne — la synthèse de la vitamine B12 aurait-elle nécessité une centaine de chimistes, ou une équipe bien plus réduite ?</li>
        <li>Pourquoi la vérification systématique de la compatibilité fonctionnelle à chaque étape (section 5) est-elle, selon vous, souvent plus décisive pour la réussite d'une synthèse totale que la seule élégance de l'analyse rétrosynthétique initiale ?</li>
        <li>Quelle serait la conséquence, sur la stratégie globale d'une synthèse totale, du choix délibéré d'ignorer la convergence au profit d'une voie purement linéaire, même lorsque la complexité de la cible rendrait la convergence clairement préférable ?</li>
      </ul>
    </div>

    <div class="biblio-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>R.B. Woodward et al., <em>The Total Synthesis of Vitamin B12</em>, Pure and Applied Chemistry, 1973 — le compte-rendu de synthèse publié par Woodward à l'issue du projet.</li>
        <li>K.C. Nicolaou, E.J. Sorensen, <em>Classics in Total Synthesis</em>, Wiley-VCH — l'ouvrage de référence rassemblant et analysant les grandes études de cas de synthèse totale, dans l'esprit de ce chapitre.</li>
        <li>P.J. Steiner et al., <em>Organic Synthesis in a Modular Robotic System Driven by a Chemical Programming Language</em>, Science, 2019 — pour les plateformes robotiques évoquées en Frontière de la recherche.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous voilà arrivé au bout de cette matière de Synthèse organique — de la logique rétrosynthétique formalisée par Corey jusqu'à l'intégration complète de tous ces outils, à l'image de ce que Woodward et Eschenmoser ont accompli à une échelle vertigineuse pour la vitamine B12. Chaque réaction vue dans ce module n'était jamais qu'un outil isolé ; c'est la stratégie d'ensemble, l'art de les articuler les uns aux autres, qui fait d'un chimiste de synthèse un véritable architecte moléculaire — un art qui ne demande, comme toujours en chimie, qu'à être mis à l'épreuve sur de nouvelles cibles.</p>
  `
};

SYNTH_NOVA_KB[synKey("Stratégie de synthèse totale : méthodologie et études de cas")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Stratégie de synthèse totale ». Demande-moi comment calculer un rendement global, dans quel ordre placer les étapes, ou un indice sur un exercice.",
  rules: [
    { test:/rendement global/i, replies:["Le rendement global d'une synthèse linéaire de n étapes vaut r^n (r = rendement moyen par étape). Même avec un excellent rendement moyen, l'accumulation d'étapes fait chuter fortement le rendement global."] },
    { test:/ordre|s[ée]quence|stereocent/i, replies:["Règles générales : placer l'étape la plus sensible tôt, installer les stéréocentres critiques tôt (substrat encore simple), retirer les groupes protecteurs tard, et garder les fonctions fragiles pour la fin."] },
    { test:/converg|lin[ée]aire/i, replies:["Minimiser le nombre d'étapes et privilégier la convergence (chapitre 1) sont deux réflexes stratégiques essentiels pour préserver un bon rendement global sur une cible complexe."] },
    { test:/couplage|palladium|catalyse/i, replies:["Les couplages pallado-catalysés et la catalyse asymétrique moderne ont permis de raccourcir radicalement de nombreuses synthèses totales historiques, en formant des liaisons C-C tout en tolérant mieux les autres groupes fonctionnels."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : ce n'est pas une simple multiplication par le nombre d'étapes.","Indice niveau 2 : il faut élever le rendement à la puissance n (nombre d'étapes).","Indice niveau 3 : 0,9^8 ≈ 0,43, soit environ 43 %."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la complexité croissante de la molécule au fil de la synthèse.","Indice niveau 2 : plus il y a de groupes fonctionnels, moins les modèles de sélectivité sont fiables.","Indice niveau 3 : un substrat simple donne un contrôle stéréochimique plus prévisible."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : repense à la comparaison avec les organomagnésiens (chapitre 3 et 8).","Indice niveau 2 : les couplages Pd tolèrent mieux les autres groupes fonctionnels.","Indice niveau 3 : cela évite des étapes de protection, donc raccourcit la synthèse."] }
  ]
};

/* fusionne le module Synthèse organique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, SYNTH_CHAPTERS);
Object.assign(NOVA_KB, SYNTH_NOVA_KB);