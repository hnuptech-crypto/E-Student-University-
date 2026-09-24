/* =====================================================================
   CHUNK « poly » — registre POLY_CHAPTERS / POLY_NOVA_KB
   Matière(s) : Chimie|Chimie des polymères
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   POLY_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ============================================================================
   MODULE CHIMIE DES POLYMÈRES — Chimie L2
   (contenu rédigé à partir du support de cours « Chimie des Polymères »,
   Dr AHOUSSI AKANNI Léon (MC/CAMES) et Dr AGNIMONHAN F. Hyacinthe (MA/CAMES),
   Laboratoire de Chimie Organique et des Substances Naturelles et
   Applications (LaCONA), Département de Chimie, FAST, Université
   d'Abomey-Calavi, Bénin — année académique 2024-2025 ; réorganisé en
   4 chapitres, complété et enrichi)
   Structure identique aux autres modules : POLY_CHAPTERS / POLY_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const POLY_MATIERE = 'Chimie des polymères';
function polyKey(chapterTitle){ return `Chimie|${POLY_MATIERE}|${chapterTitle}`; }
const POLY_CHAPTERS = {};
const POLY_NOVA_KB = {};

/* =========================== CHAPITRE 1 — Macromolécules : définitions, types et polymolécularité =========================== */
POLY_CHAPTERS[polyKey('Macromolécules : définitions, types et polymolécularité')] = {
  objectives: [
    "Définir macromolécule, monomère, motif monomère et degré de polymérisation, et distinguer oligomère et polymère",
    "Distinguer homopolymère et copolymère, et reconnaître les six types d'enchaînement des copolymères (alterné, à bloc, statistique, greffé, aléatoire, périodique)",
    "Nommer un polymère selon les trois systèmes usuels : nomenclature IUPAC, désignation selon le type de polymérisation, désignation par sigle",
    "Calculer un degré de polymérisation moyen ou une masse molaire moyenne (en nombre et en poids) et en déduire l'indice de polymolécularité d'un échantillon"
  ],
  prereqs: ["Chimie organique générale (L1)", "Nomenclature des composés organiques"],
  bodyHtml: `
    <p>La chimie des polymères étudie la synthèse et la modification chimique des macromolécules. L'idée de molécules géantes remonte à Weber (1900) pour le caoutchouc naturel, mais c'est <strong>Hermann Staudinger</strong> (Prix Nobel de chimie) qui, en donnant les bases physico-chimiques du concept macromoléculaire, en a montré toute la généralité. Les polymères ne sont pas que des matériaux de commodité (plastiques, caoutchoucs, fibres) : ils incluent aussi des matériaux de pointe comme les polymères conducteurs (Nobel de chimie 2000, Heeger-MacDiarmid-Shirakawa).</p>

    <h3>1. Quelques définitions</h3>
    <p>Une <strong>macromolécule</strong> — mot venant du grec <em>polus</em> (plusieurs) et <em>meros</em> (partie) — est un composé organique ou inorganique constitué de l'enchaînement covalent d'un très grand nombre de <strong>motifs monomères</strong>, dérivés de fait ou conceptuellement de petites molécules appelées <strong>monomères</strong>. Un monomère peut être insaturé, non saturé ou cyclique, ou comporter des fonctions réactives à ses extrémités.</p>
    <table class="mini-table">
      <tr><th>Terme</th><th>Définition</th></tr>
      <tr><td>Monomère</td><td>Petite molécule de départ à partir de laquelle se forme la macromolécule</td></tr>
      <tr><td>Motif monomère</td><td>Unité répétitive dont la répétition décrit la chaîne ; n'existe qu'au sein de cette chaîne</td></tr>
      <tr><td>Degré de polymérisation (DP)</td><td>Nombre de motifs monomères présents dans une macromolécule</td></tr>
    </table>
    <p>Lorsque la structure résulte de la répétition d'un <em>petit</em> nombre d'unités, on parle d'<strong>oligomère</strong> ; au-delà, de <strong>polymère</strong>. La frontière usuelle est <strong>DP &lt; 30 pour un oligomère, DP &gt; 30 pour un polymère</strong>.</p>

    <h3>2. Différents types de polymères</h3>
    <p>Selon l'enchaînement, une macromolécule est dite <strong>régulière</strong> (répétition d'une seule unité constitutive, connectées dans un seul sens) ou <strong>irrégulière</strong>. Indépendamment de cela, on distingue deux grandes catégories selon le nombre de monomères engagés :</p>
    <ul>
      <li><strong>Homopolymère</strong> : issu d'un seul type de monomère (n A → …A–A–A–A…). Ex. : polychlorure de vinyle (PVC), polypropylène, polyéthylène. Chaîne principale linéaire, généralement thermoplastique.</li>
      <li><strong>Copolymère</strong> : issu de la réaction entre monomères différents (copolymérisation). On parle de <em>bipolymère</em> (2 monomères), <em>terpolymère</em> (3) ou <em>quaterpolymère</em> (4).</li>
    </ul>
    <p>Selon la disposition des monomères dans la chaîne, un copolymère peut être :</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Enchaînement</th><th>Notation IUPAC</th><th>Exemple</th></tr>
      <tr><td>Alterné</td><td>–A–B–A–B–A–B–</td><td>(AB)<sub>n</sub>, connective <em>-alt-</em></td><td>Poly[(éthylène glycol)-alt-(acide téréphtalique)]</td></tr>
      <tr><td>À bloc</td><td>longs segments homogènes A puis B</td><td>(A-block-B), connective <em>-block-</em></td><td>Polystyrène-block-polybutadiène</td></tr>
      <tr><td>Statistique</td><td>enchaînement au hasard</td><td>(A-stat-B), connective <em>-stat-</em></td><td>Poly(styrène-stat-acrylonitrile)</td></tr>
      <tr><td>Greffé</td><td>chaîne latérale B sur tronc A</td><td>(A-graft-B), connective <em>-graft-</em></td><td>Polybutadiène-graft-polystyrène</td></tr>
      <tr><td>Aléatoire (random)</td><td>distribution bernoullienne, indépendante des unités voisines</td><td>(A-ran-B), connective <em>-ran-</em></td><td>Poly(éthylène-ran-acétate de vinyle)</td></tr>
      <tr><td>Périodique</td><td>plus de deux espèces, ordre séquentiel régulier</td><td>(ABC)<sub>n</sub>, connective <em>-per-</em></td><td>Poly[formaldéhyde-per-(oxyde d'éthylène)]</td></tr>
    </table>
    <p>Le <strong>polyamide 6,6</strong> (nylon), obtenu à partir de l'acide adipique et de l'hexaméthylène diamine, est l'exemple classique de copolymère alterné. Un cas particulier est le <strong>pseudo-copolymère</strong> : un polymère irrégulier dérivé d'un seul monomère mais dont les caractéristiques se rapprochent de celles d'un copolymère.</p>

    <h3>3. Désignation des polymères</h3>
    <p>Trois façons de nommer un polymère coexistent dans la pratique :</p>
    <ol>
      <li><strong>Nomenclature officielle (IUPAC)</strong> : on désigne le motif monomère selon les règles de la chimie organique, mis entre parenthèses, précédé du préfixe « poly ». Cette méthode ne dépend que de la structure du polymère, pas de la voie de synthèse. Ex. : –(CH₂–CH₂)<sub>n</sub>– se nomme <em>poly(méthylène)</em> ou poly(éthane-1,2-diyl).</li>
      <li><strong>Désignation selon le type de polymérisation</strong> : la plus fréquente, elle reflète le monomère effectivement polymérisé. Ex. : le polyéthylène vient de la polymérisation de l'éthylène ; le poly(chlorure de vinyle) de celle du chlorure de vinyle. Lorsque le nom du monomère comporte plusieurs mots, il est mis entre parenthèses après « poly » pour éviter toute ambiguïté (ex. : poly(oxyde d'éthylène)).</li>
      <li><strong>Désignation par sigles</strong> : abréviations normalisées depuis 1989, fondées sur la terminologie anglo-saxonne (d'où un ordre de lettres parfois surprenant en français). Ex. : PE (polyéthylène), PP (polypropylène), PS (polystyrène), PVC (poly(chlorure de vinyle), et non PCV), PVAC (poly(acétate de vinyle)), PUR (polyuréthanes), UP (polyesters insaturés). Les sigles NR et BR viennent respectivement de <em>natural rubber</em> et <em>butadiene rubber</em>.</li>
    </ol>
    <p>Certains noms génériques consacrés par l'usage ne portent pas le préfixe « poly » : kératine, lignine, résines phénoplastes, aminoplastes, silicones, produits acryliques ou époxydes.</p>

    <h3>4. Polymolécularité des composés macromoléculaires</h3>
    <p>Un échantillon de polymère est <strong>polymoléculaire</strong> : il contient des macromolécules de degrés de polymérisation différents, à cause du caractère statistique de la polymérisation (transfert, terminaison, greffage aléatoires). On caractérise cette hétérogénéité par des valeurs moyennes.</p>
    <p>Notations : $M_0$ masse du motif monomère ; « espèce $i$ » = ensemble des macromolécules de degré $i$ ; $M_i = i\\, M_0$ ; $N_i$ nombre de macromolécules de l'espèce $i$ ; $w_i = N_i M_i$ masse de l'espèce $i$ ; fraction molaire $x_i = N_i / \\sum_i N_i$ ; fraction massique $y_i = w_i / \\sum_i w_i$.</p>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Expression</th></tr>
      <tr><td>Degré de polymérisation moyen en nombre</td><td>$$\\overline{DP_n} = \\dfrac{\\sum_i iN_i}{\\sum_i N_i} = \\sum_i i\\,x_i$$</td></tr>
      <tr><td>Degré de polymérisation moyen en poids</td><td>$$\\overline{DP_p} = \\sum_i i\\,y_i = \\dfrac{\\sum_i i^2N_i}{\\sum_i iN_i}$$</td></tr>
      <tr><td>Masse molaire moyenne en nombre</td><td>$$\\overline{M_n} = M_0\\,\\overline{DP_n} = \\sum_i M_i\\,x_i$$</td></tr>
      <tr><td>Masse molaire moyenne en poids</td><td>$$\\overline{M_p} = M_0\\,\\overline{DP_p} = \\sum_i M_i\\,y_i$$</td></tr>
    </table>
    <p>On parle de <strong>hauts polymères</strong> si $\\overline{DP_n} &gt; 100$. Dans le cas des copolymères, les motifs n'ayant pas tous la même masse, il est en général impossible de relier simplement degré de polymérisation et masse moléculaire.</p>
    <p>Le rapport de ces deux moyennes définit l'<strong>indice de polymolécularité</strong> (ou de polydispersité) :</p>
    <p>$$IP = \\dfrac{\\overline{M_p}}{\\overline{M_n}}, \\qquad IP \\geqslant 1$$</p>
    <p>$IP = 1$ uniquement pour un polymère théorique <strong>isomoléculaire</strong> (toutes les macromolécules ont la même masse et la même constitution). En pratique, $IP$ vaut environ 1,01 pour une distribution très étroite (polymérisation anionique vivante), autour de 2 pour les polymérisations classiques (cationique, radicalaire, polycondensation), et peut atteindre 30 à 50 lorsque de nombreuses réactions de transfert accompagnent la polymérisation.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Un polymère n'est jamais une molécule unique de masse fixe : c'est une <strong>population statistique</strong> de chaînes de tailles différentes. $\\overline{M_n}$ pondère par le nombre de chaînes, $\\overline{M_p}$ pondère par la masse — donc favorise les grandes chaînes — d'où toujours $\\overline{M_n} \\leqslant \\overline{M_p}$, et $IP=\\overline{M_p}/\\overline{M_n}$ mesure l'étalement de cette distribution de tailles.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Macromolécule = enchaînement covalent de motifs monomères ; oligomère si DP &lt; 30, polymère si DP &gt; 30</li>
        <li>Homopolymère (un seul monomère) vs copolymère (plusieurs monomères) : alterné, à bloc, statistique, greffé, aléatoire, périodique</li>
        <li>Trois façons de nommer un polymère : nomenclature IUPAC ((poly) + motif entre parenthèses), désignation selon le monomère polymérisé, sigle normalisé (PE, PP, PVC...)</li>
        <li>$\\overline{DP_n}=\\sum_i i\\,x_i$ (moyenne en nombre) et $\\overline{DP_p}=\\sum_i i\\,y_i$ (moyenne en poids) ; $\\overline{M_n}=M_0\\overline{DP_n}$, $\\overline{M_p}=M_0\\overline{DP_p}$</li>
        <li>L'indice de polymolécularité $IP=\\overline{M_p}/\\overline{M_n}\\geqslant 1$ mesure l'hétérogénéité de taille des chaînes ; $IP=1$ seulement pour un polymère isomoléculaire</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre monomère (petite molécule de départ) et motif monomère (unité répétitive qui n'existe qu'au sein de la chaîne)</li>
        <li>Croire que $\\overline{M_p} &lt; \\overline{M_n}$ : c'est l'inverse, $\\overline{M_p}$ pondère par la masse et surestime toujours par rapport à $\\overline{M_n}$</li>
        <li>Oublier qu'un sigle suit souvent l'ordre anglo-saxon des lettres (PVC, pas PCV ; PVAC, pas PACV)</li>
        <li>Penser que $IP=1$ est la situation courante : c'est un cas théorique limite, jamais atteint en pratique industrielle</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un polymère dont le degré de polymérisation moyen est de 18 est, par la convention usuelle :</p>
        <div class="options">
          <label class="option"><input type="radio" name="poly1e1" value="wrong"> un haut polymère</label>
          <label class="option"><input type="radio" name="poly1e1" value="right"> un oligomère</label>
          <label class="option"><input type="radio" name="poly1e1" value="wrong"> un copolymère à bloc</label>
          <label class="option"><input type="radio" name="poly1e1" value="wrong"> un polymère isomoléculaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('poly1e1','poly1fb1','Correct — la frontière conventionnelle est DP=30 ; en dessous, on parle d\\'oligomère.','Revois la section 1 : la frontière conventionnelle entre oligomère et polymère est DP=30.')">Vérifier</button>
        <div class="feedback" id="poly1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un néoprène (polymère du chloroprène, motif C₄H₅Cl, $M_0\\approx 88,5$ g/mol) a une masse molaire moyenne en nombre $\\overline{M_n}=12\\,500$ g/mol. Son degré de polymérisation moyen en nombre vaut approximativement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="poly1e2" value="wrong"> 14</label>
          <label class="option"><input type="radio" name="poly1e2" value="right"> 141</label>
          <label class="option"><input type="radio" name="poly1e2" value="wrong"> 1 106 000</label>
          <label class="option"><input type="radio" name="poly1e2" value="wrong"> 88</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('poly1e2','poly1fb2','Correct — DPn = Mn/M0 = 12500/88,5 ≈ 141 motifs chloroprène par chaîne en moyenne.','Utilise la relation Mn = M0 · DPn, donc DPn = Mn / M0 = 12500 / 88,5.')">Vérifier</button>
        <div class="feedback" id="poly1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un copolymère de polybutadiène sur lequel sont greffées des chaînes latérales de polystyrène est un exemple de copolymère :</p>
        <div class="options">
          <label class="option"><input type="radio" name="poly1e3" value="wrong"> alterné</label>
          <label class="option"><input type="radio" name="poly1e3" value="wrong"> statistique</label>
          <label class="option"><input type="radio" name="poly1e3" value="right"> greffé</label>
          <label class="option"><input type="radio" name="poly1e3" value="wrong"> périodique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('poly1e3','poly1fb3','Correct — polybutadiène-graft-polystyrène : un tronc d\\'un homopolymère porte des chaînes latérales de l\\'autre, c\\'est la définition du copolymère greffé.','Un copolymère greffé porte des chaînes latérales d\\'un second homopolymère sur le tronc du premier — relis le tableau de la section 2.')">Vérifier</button>
        <div class="feedback" id="poly1fb3"></div>
      </div>
    </div>
  `
};

POLY_NOVA_KB[polyKey('Macromolécules : définitions, types et polymolécularité')] = {
  intro: "Salut, moi c'est Nova ! On démarre la Chimie des polymères par les notions de base : macromolécule, degré de polymérisation, types de copolymères et polymolécularité. Demande-moi la différence entre Mn et Mp, ce qu'est un copolymère à bloc, ou comment calculer l'indice de polymolécularité.",
  rules: [
    { test:/oligom[eè]re|dp\\s*30|30\\s*motifs/i, replies:["La frontière conventionnelle entre oligomère et polymère est le degré de polymérisation : DP < 30 pour un oligomère, DP > 30 pour un polymère au sens strict."] },
    { test:/mn|masse.*nombre|m.*moyenne.*nombre/i, replies:["Mn (masse molaire moyenne en nombre) pondère chaque espèce par sa fraction molaire xi = Ni/ΣNi : Mn = ΣMi·xi = M0·DPn. Elle donne autant de poids à une petite chaîne qu'à une grande."] },
    { test:/mp|masse.*poids|masse.*mass/i, replies:["Mp (masse molaire moyenne en poids) pondère chaque espèce par sa fraction massique yi = wi/Σwi : Mp = ΣMi·yi. Comme les grandes chaînes contribuent plus à la masse totale, Mp est toujours supérieure ou égale à Mn."] },
    { test:/indice.*polymol[ée]cularit[ée]|ip\\b|polydispersit[ée]/i, replies:["L'indice de polymolécularité IP = Mp/Mn est toujours ≥ 1. Il vaut environ 1,01 pour une polymérisation anionique vivante (distribution très étroite), 2 pour les polymérisations classiques, et jusqu'à 30-50 s'il y a beaucoup de réactions de transfert."] },
    { test:/copolym[eè]re.*bloc|bloc\\b/i, replies:["Un copolymère à bloc (A-block-B) est constitué de longs segments homogènes d'un monomère A suivis de longs segments de B, contrairement au copolymère statistique où l'enchaînement est plus désordonné."] },
    { test:/copolym[eè]re.*greff[ée]|greff[ée]/i, replies:["Un copolymère greffé (A-graft-B) a un tronc principal d'un homopolymère A sur lequel sont fixées, latéralement, des chaînes d'un second homopolymère B."] },
    { test:/homopolym[eè]re/i, replies:["Un homopolymère est issu d'un seul type de monomère identique (n A → ...-A-A-A-A-...). Le PVC, le polypropylène et le polyéthylène en sont des exemples classiques."] },
    { test:/sigle|pvc|pe\\b|abr[ée]viation/i, replies:["Les sigles suivent la terminologie anglo-saxonne, ce qui explique un ordre de lettres parfois inattendu en français : PVC pour poly(chlorure de vinyle) — jamais PCV — ou PVAC pour poly(acétate de vinyle) — jamais PACV."] },
    { test:/nomenclature|nommer.*polym|iupac/i, replies:["Trois systèmes coexistent : la nomenclature IUPAC (poly + motif entre parenthèses, fondée sur la structure), la désignation selon le monomère effectivement polymérisé (la plus courante), et les sigles normalisés (PE, PP, PVC...)."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare le DP donné à la valeur seuil de la section 1.","Indice niveau 2 : le seuil conventionnel est DP=30.","Indice niveau 3 : 18 < 30, donc c'est un oligomère."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise la relation Mn = M0 · DPn.","Indice niveau 2 : isole DPn = Mn / M0 = 12500 / 88,5.","Indice niveau 3 : le résultat est proche de 141."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : identifie s'il s'agit d'un tronc portant des chaînes latérales, ou d'une alternance/segmentation.","Indice niveau 2 : des chaînes latérales de polystyrène « greffées » sur un tronc de polybutadiène.","Indice niveau 3 : c'est la définition même du copolymère greffé."] }
  ]
};
/* =========================== CHAPITRE 2 — La chaîne polymère : structure, stéréochimie et propriétés =========================== */
POLY_CHAPTERS[polyKey('La chaîne polymère : structure, stéréochimie et propriétés')] = {
  objectives: [
    "Distinguer les architectures de chaîne : linéaire, ramifiée, en peigne, étoilée, lamellaire et tridimensionnelle (réticulée)",
    "Identifier les enchaînements tête-queue / tête-tête / queue-queue et les isoméries de position et géométrique (cis/trans) des polydiènes",
    "Reconnaître la tacticité d'un homopolymère vinylique — isotactique, syndiotactique, atactique — et relier tacticité et cristallinité",
    "Situer un polymère par rapport à ses températures de transition vitreuse (Tg) et de fusion (Tf), et le classer en thermoplastique, thermodurcissable, élastomère ou élastomère thermoplastique"
  ],
  prereqs: ["Macromolécules : définitions, types et polymolécularité"],
  bodyHtml: `
    <p>Le carbone hybridé sp³ confère à la chaîne polymère différentes représentations géométriques dans l'espace. Ce chapitre explore comment cette organisation spatiale — architecture de la chaîne, stéréochimie de l'enchaînement, degré d'ordre à l'état solide — conditionne les propriétés physiques et mécaniques finales du matériau.</p>

    <h3>1. Structure spatiale des polymères</h3>
    <p>Selon le nombre de directions de l'espace dans lesquelles se développe l'enchaînement atomique, on distingue :</p>
    <ul>
      <li><strong>Polymères filiformes (monodimensionnels)</strong> : chaîne développée dans une seule direction. On y trouve le polymère <em>linéaire</em> (chaîne rigoureusement droite), le polymère <em>ramifié</em> (présence de ramifications), le polymère <em>en peigne</em> et le polymère <em>étoilé</em>. Ex. : le poly(méthylène) préparé à basse pression est linéaire, celui préparé sous haute pression est ramifié ; la cellulose est linéaire malgré la présence de cycles.</li>
      <li><strong>Polymères lamellaires (bidimensionnels)</strong> : l'enchaînement se développe dans deux directions de l'espace (ex. : nappes macromoléculaires du graphite).</li>
      <li><strong>Polymères tridimensionnels</strong> : l'enchaînement s'étend dans les trois directions — chaînes réticulées, dendrimères.</li>
    </ul>
    <p>On passe d'une macromolécule linéaire à une macromolécule tridimensionnelle par des réactions de <strong>pontage (réticulation)</strong>, qui relient latéralement les chaînes par des liaisons covalentes. La <strong>vulcanisation</strong> du caoutchouc (poly-1,4-isoprène cis) par le soufre en est l'exemple emblématique : le soufre introduit forme des ponts transversaux entre les chaînes carbonées, ce qui réduit l'influence de la température sur l'élasticité et supprime la tendance du caoutchouc brut à se souder à lui-même par contact.</p>

    <h3>2. Types d'enchaînement et stéréochimie</h3>
    <p><strong>Isomérie de position (série vinylique).</strong> Lors de la propagation, l'enchaînement des motifs peut se faire tête-à-queue (régulier), tête-à-tête ou queue-à-queue (irrégulier). L'enchaînement <strong>tête-à-queue</strong> domine très largement pour deux raisons : la <em>résonance</em> (le centre réactionnel se trouve sur le carbone substitué, stabilisé par délocalisation électronique) et l'<em>effet stérique</em> (les substituants sont séparés par un groupe méthylène, ce qui limite l'encombrement). En polymérisation ionique, l'enchaînement tête-à-queue est même le <strong>seul</strong> possible.</p>

    <p><strong>Isomérie géométrique (1,3-diènes).</strong> L'isoprène (2-méthylbuta-1,3-diène) peut polymériser en 1,2, en 3,4 ou en 1,4. La polymérisation 1,4 conduit à un enchaînement qui peut adopter la configuration <strong>cis (Z)</strong> ou <strong>trans (E)</strong> :</p>
    <table class="mini-table">
      <tr><th>Configuration</th><th>Nom</th><th>Tg</th><th>Tf</th><th>Aspect</th></tr>
      <tr><td>Cis (Z)</td><td>Caoutchouc naturel</td><td>-73 °C</td><td>28 °C</td><td>élastique</td></tr>
      <tr><td>Trans (E)</td><td>Gutta-percha</td><td>-58 °C</td><td>74 °C</td><td>dure et cassante</td></tr>
    </table>
    <p>Deux isomères de même formule chimique peuvent donc avoir des propriétés radicalement différentes selon leur géométrie moléculaire.</p>

    <p><strong>Tacticité des homopolymères linéaires.</strong> Pour un motif vinylique –CH₂–CHG– (G = Cl, F, CH₃, COOH, C₆H₅, OH...), la tacticité décrit l'arrangement du substituant G le long de la chaîne carbonée principale, en conformation zigzag :</p>
    <table class="mini-table">
      <tr><th>Configuration</th><th>Position de G</th><th>Morphologie</th><th>Solubilité</th></tr>
      <tr><td>Isotactique</td><td>tous les G du même côté du plan</td><td>bonne cristallisation</td><td>faible</td></tr>
      <tr><td>Syndiotactique</td><td>G alterné d'un côté puis de l'autre</td><td>bonne cristallisation</td><td>faible</td></tr>
      <tr><td>Atactique</td><td>aucun ordre</td><td>amorphe</td><td>bonne</td></tr>
    </table>
    <p>Les polymères iso- ou syndiotactiques ont une bonne aptitude à la cristallisation, une température de mise en forme élevée et une charge à la rupture plus grande, contrairement aux polymères atactiques, amorphes, de mise en forme plus basse et de charge à la rupture plus faible. Les <strong>catalyseurs Ziegler-Natta</strong> favorisent justement les formes syndiotactique et isotactique, cristallines et très résistantes.</p>

    <h3>3. Propriétés physiques : amorphe, cristallin, semi-cristallin</h3>
    <p>Un solide <strong>amorphe</strong> est isotrope : les atomes n'y respectent aucun ordre à moyenne et grande distance (ex. : verres, élastomères). Un solide <strong>cristallisé</strong> est au contraire anisotrope, avec un ordre périodique des atomes ; les polymères linéaires y sont favorables car les chaînes se replient régulièrement sur elles-mêmes. Un polymère <strong>semi-cristallin</strong> fait coexister cristal et amorphe : il possède un point de fusion précis, ne ramollit pas progressivement, mais reste dur jusqu'à absorption d'une certaine quantité de chaleur, puis passe rapidement à un liquide peu visqueux. Un polymère n'étant jamais totalement cristallin, on définit un <strong>taux de cristallinité</strong> :</p>
    <p>$$x_C = \\dfrac{M_C}{M} \\quad \\text{ou} \\quad v_C = \\dfrac{V_C}{V}$$</p>
    <p>où $M_C, V_C$ sont la masse et le volume de la phase cristalline, et $M, V$ ceux de l'échantillon total. Un refroidissement lent du polymère fondu améliore le taux de cristallinité.</p>

    <h3>4. Températures de transition vitreuse et de fusion</h3>
    <p>Deux températures caractérisent l'état solide d'un polymère :</p>
    <ul>
      <li><strong>Température de transition vitreuse $T_g$</strong> : en dessous de $T_g$, les domaines amorphes (d'un polymère amorphe ou de la partie amorphe d'un semi-cristallin) acquièrent les propriétés de l'état vitreux — fragilité, rigidité. Au-dessus, on entre dans l'état caoutchoutique (absence d'écoulement, mobilité locale). $T_g$ est le critère fondamental de classification des polymères.</li>
      <li><strong>Température de fusion $T_f$</strong> : transformation solide → liquide analogue à la fusion des cristaux, accompagnée d'une brusque variation du volume spécifique. Elle ne concerne que la partie cristalline.</li>
    </ul>
    <p>Tous les polymères possèdent une $T_g$ (puisqu'ils ont toujours une part amorphe), mais tous n'ont pas de $T_f$ cristalline puisqu'ils ne cristallisent pas tous. On a toujours $T_g &lt; T_f$ (cohésion du verre &lt; cohésion du cristal). Exemples : polystyrène ($T_g=100\\,°C$, $T_f=205\\,°C$), poly(méthacrylate de méthyle) ($T_g=105\\,°C$, $T_f=200\\,°C$).</p>

    <h3>5. Propriétés mécaniques : quatre grandes familles</h3>
    <p>En dessous de $T_g$, un polymère est dur et cassant ; au-dessus, il devient plastique (s'il est très cristallin) ou hautement élastique (s'il est amorphe). On distingue quatre familles selon le comportement thermique :</p>
    <table class="mini-table">
      <tr><th>Famille</th><th>Architecture</th><th>Comportement</th></tr>
      <tr><td>Thermoplastique</td><td>linéaire ou ramifiée</td><td>ramollit à chaud, durcit au refroidissement, réversible (PE, PVC)</td></tr>
      <tr><td>Thermodurcissable</td><td>réseau tridimensionnel, réticulé sous chaleur/catalyseur</td><td>transformation irréversible, infusible et insoluble une fois durci ; $T_g$ élevée (80-150 °C), pas d'état caoutchoutique</td></tr>
      <tr><td>Élastomère</td><td>linéaire/ramifiée, réticulée faiblement par vulcanisation</td><td>très grande élasticité réversible (jusqu'à 500 % d'allongement), amorphe</td></tr>
      <tr><td>Élastomère thermoplastique</td><td>copolymère à bloc (≥2 phases non miscibles)</td><td>élasticité caoutchoutique + mise en œuvre facile d'un thermoplastique</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Trois niveaux d'organisation gouvernent les propriétés d'un polymère : l'<strong>architecture</strong> de la chaîne (linéaire, ramifiée, réticulée), la <strong>stéréochimie</strong> de l'enchaînement (tacticité, configuration cis/trans), et le <strong>degré d'ordre</strong> à l'état solide (amorphe, cristallin, semi-cristallin), lui-même résumé par $T_g$ et $T_f$. Deux polymères de même formule chimique brute (caoutchouc naturel cis / gutta-percha trans) peuvent avoir des comportements mécaniques opposés.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Architecture de chaîne : linéaire, ramifiée, en peigne, étoilée (monodimensionnelle), lamellaire (bidimensionnelle), réticulée/dendrimère (tridimensionnelle) ; la vulcanisation crée des ponts soufre entre chaînes</li>
        <li>Enchaînement tête-à-queue majoritaire (résonance + effet stérique) ; en polymérisation ionique, c'est le seul possible</li>
        <li>Polyisoprène 1,4 : configuration cis = caoutchouc naturel (élastique), trans = gutta-percha (dure et cassante)</li>
        <li>Tacticité : isotactique et syndiotactique cristallisent bien (peu solubles, $T$ de mise en forme élevée) ; atactique reste amorphe (soluble, $T$ de mise en forme basse)</li>
        <li>$T_g$ (transition vitreuse, toujours présente) &lt; $T_f$ (fusion, seulement si cristallin) ; quatre familles mécaniques : thermoplastique, thermodurcissable, élastomère, élastomère thermoplastique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre $T_g$ et $T_f$ : $T_g$ concerne la partie amorphe (toujours présente), $T_f$ ne concerne que la partie cristalline (pas systématique)</li>
        <li>Croire qu'un polymère peut être totalement cristallin : on parle toujours de taux de cristallinité, jamais de 100 %</li>
        <li>Penser qu'un thermodurcissable peut être refondu comme un thermoplastique : une fois réticulé, il est infusible et insoluble, la transformation est irréversible</li>
        <li>Oublier que tacticité et configuration cis/trans sont deux notions distinctes : la première concerne les homopolymères vinyliques substitués, la seconde les polydiènes</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le caoutchouc naturel (polyisoprène 1,4 cis) et la gutta-percha (polyisoprène 1,4 trans) ont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="poly2e1" value="wrong"> la même formule chimique et les mêmes propriétés mécaniques</label>
          <label class="option"><input type="radio" name="poly2e1" value="right"> la même formule chimique mais des propriétés mécaniques très différentes</label>
          <label class="option"><input type="radio" name="poly2e1" value="wrong"> des formules chimiques différentes</label>
          <label class="option"><input type="radio" name="poly2e1" value="wrong"> le même DP et le même IP</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('poly2e1','poly2fb1','Correct — même squelette isoprène 1,4, mais la configuration cis donne un élastomère (Tg=-73°C) alors que le trans donne une matière dure et cassante (Tf=74°C) : c\\'est une illustration directe du lien géométrie/propriétés.','Les deux isomères ont la même formule brute (motif isoprène 1,4) ; seule la géométrie cis/trans autour des doubles liaisons change — regarde le tableau de la section 2.')">Vérifier</button>
        <div class="feedback" id="poly2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un polymère vinylique dont tous les substituants G sont disposés du même côté du plan de la chaîne carbonée est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="poly2e2" value="wrong"> atactique</label>
          <label class="option"><input type="radio" name="poly2e2" value="wrong"> syndiotactique</label>
          <label class="option"><input type="radio" name="poly2e2" value="right"> isotactique</label>
          <label class="option"><input type="radio" name="poly2e2" value="wrong"> alterné</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('poly2e2','poly2fb2','Correct — tous les G du même côté du plan définit la configuration isotactique, propice à une bonne cristallisation.','Relis la section 2 : « tous les groupements G en avant du plan » est la définition même de l\\'isotactique.')">Vérifier</button>
        <div class="feedback" id="poly2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une résine phénoplaste, une fois durcie par polycondensation en réseau tridimensionnel, appartient à la famille :</p>
        <div class="options">
          <label class="option"><input type="radio" name="poly2e3" value="wrong"> des thermoplastiques</label>
          <label class="option"><input type="radio" name="poly2e3" value="wrong"> des élastomères</label>
          <label class="option"><input type="radio" name="poly2e3" value="right"> des thermodurcissables</label>
          <label class="option"><input type="radio" name="poly2e3" value="wrong"> des élastomères thermoplastiques</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('poly2e3','poly2fb3','Correct — un réseau tridimensionnel réticulé, infusible et insoluble une fois formé, est la signature d\\'un thermodurcissable.','Un réseau tridimensionnel infusible et insoluble, obtenu par réticulation irréversible, correspond à la définition du thermodurcissable — relis le tableau de la section 5.')">Vérifier</button>
        <div class="feedback" id="poly2fb3"></div>
      </div>
    </div>
  `
};

POLY_NOVA_KB[polyKey('La chaîne polymère : structure, stéréochimie et propriétés')] = {
  intro: "Salut, c'est encore Nova ! Ce chapitre couvre l'architecture de la chaîne polymère, la stéréochimie (tacticité, cis/trans) et les propriétés physiques et mécaniques. Demande-moi la différence entre Tg et Tf, ce qu'est la tacticité, ou pourquoi le caoutchouc naturel et la gutta-percha se comportent si différemment.",
  rules: [
    { test:/tg\\b|transition vitreuse/i, replies:["Tg (température de transition vitreuse) est la température en dessous de laquelle les domaines amorphes d'un polymère deviennent durs et fragiles (état vitreux) ; au-dessus, on entre dans l'état caoutchoutique. Tous les polymères ont une Tg, car ils ont toujours une part amorphe."] },
    { test:/tf\\b|fusion/i, replies:["Tf (température de fusion) est propre à la partie cristalline : transformation solide-liquide analogue à la fusion des petits cristaux, avec brusque variation de volume spécifique. Contrairement à Tg, tous les polymères n'ont pas de Tf, car ils ne cristallisent pas tous."] },
    { test:/tacticit[ée]|isotactique|syndiotactique|atactique/i, replies:["La tacticité décrit la position des substituants G le long de la chaîne : isotactique (tous du même côté), syndiotactique (alternance régulière), atactique (aucun ordre). Iso- et syndiotactique cristallisent bien ; l'atactique reste amorphe."] },
    { test:/cis|trans|gutta|caoutchouc naturel/i, replies:["Le polyisoprène 1,4 peut être cis (caoutchouc naturel, élastique, Tg=-73°C) ou trans (gutta-percha, dure et cassante, Tf=74°C) : même formule chimique, propriétés mécaniques opposées, à cause de la seule géométrie autour des doubles liaisons."] },
    { test:/vulcanisation/i, replies:["La vulcanisation incorpore du soufre au caoutchouc naturel, créant des ponts transversaux (réticulation) entre les chaînes carbonées. Cela réduit l'influence de la température sur l'élasticité et empêche le caoutchouc brut de se souder à lui-même."] },
    { test:/thermodurcissable/i, replies:["Un thermodurcissable est un système réactif (liquide ou poudre) qui, sous chaleur et/ou catalyseur, se réticule irréversiblement en un réseau tridimensionnel infusible et insoluble. Il n'a pas d'état caoutchoutique et sa Tg est élevée (80-150°C)."] },
    { test:/[ée]lastom[eè]re/i, replies:["Un élastomère est un polymère linéaire faiblement réticulé (par vulcanisation) capable de très grandes déformations réversibles (jusqu'à 500%). Un élastomère thermoplastique combine cette élasticité avec la facilité de mise en œuvre d'un thermoplastique, grâce à une structure à blocs biphasée."] },
    { test:/t[eê]te.*queue|isom[ée]rie de position/i, replies:["L'enchaînement tête-à-queue domine largement en polymérisation, pour des raisons de résonance (stabilisation du centre réactionnel sur le carbone substitué) et d'effet stérique (les substituants sont séparés par un CH2). En polymérisation ionique, c'est le seul enchaînement possible."] },
    { test:/taux de cristallinit[ée]/i, replies:["Le taux de cristallinité xC = MC/M (ou VC/V) mesure la fraction de phase cristalline dans un échantillon, jamais totalement cristallin. Un refroidissement lent du polymère fondu améliore ce taux."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : regarde ce qui différencie cis et trans dans le tableau de la section 2.","Indice niveau 2 : c'est la géométrie autour des doubles liaisons, pas la formule brute.","Indice niveau 3 : même formule, propriétés très différentes."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : relis la définition de chaque configuration dans le tableau de tacticité.","Indice niveau 2 : « tous du même côté » n'est vrai que pour une seule des trois configurations.","Indice niveau 3 : c'est l'isotactique."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à ce que devient une résine phénoplaste une fois durcie — peut-on la refondre ?","Indice niveau 2 : réseau tridimensionnel, infusible et insoluble une fois formé.","Indice niveau 3 : c'est la définition du thermodurcissable."] }
  ]
};
/* =========================== CHAPITRE 3 — Synthèse des polymères : polymérisation, polyaddition et polycondensation =========================== */
POLY_CHAPTERS[polyKey('Synthèse des polymères : polymérisation, polyaddition et polycondensation')] = {
  objectives: [
    "Distinguer les trois grandes voies de synthèse — polymérisation par addition, polyaddition, polycondensation — d'après le bilan de matière (élimination ou non de petites molécules, étape de terminaison ou non)",
    "Écrire la réaction de formation d'un polydiène (polyisoprène, polybutadiène) et d'un polyéther/polyurée/polyuréthane par polyaddition",
    "Identifier les monomères et le type de fonction formée dans les principales polycondensations : polyesters, polyamides (nylon), phénoplastes, aminoplastes, polycarbonate",
    "Relier la fonctionnalité moyenne d'un mélange de monomères à l'architecture du polymère obtenu (linéaire vs réseau tridimensionnel)"
  ],
  prereqs: ["La chaîne polymère : structure, stéréochimie et propriétés"],
  bodyHtml: `
    <p>Trois grandes familles de réactions permettent de construire une macromolécule à partir de monomères : la <strong>polymérisation par addition</strong> proprement dite, la <strong>polyaddition</strong>, et la <strong>polycondensation</strong>. Elles se distinguent par la nature du bilan de matière et la présence ou non d'une étape de terminaison.</p>

    <h3>1. Réaction de polymérisation (polyaddition en chaîne)</h3>
    <p>La « polymérisation par addition » proprement dite consiste en l'union de monomères identiques ou différents <strong>sans élimination d'un produit de réaction autre que le polymère</strong>. Les monomères sont des molécules insaturées (alcènes et dérivés, diènes et dérivés), des composés à double liaison (aldéhydes, cétones) ou des hétérocycles (oxydes et sulfures d'éthylène ou de propylène, imines, lactames).</p>
    <table class="mini-table">
      <tr><th>Famille</th><th>Formule générale</th><th>Exemples (substituant A)</th></tr>
      <tr><td>Dérivés vinyliques</td><td>CH₂=CH–A</td><td>A=H (éthylène), CH₃ (propylène), Cl (chlorure de vinyle), Ph (styrène), CN (acrylonitrile)</td></tr>
      <tr><td>Dérivés 1,3-diènes</td><td>CH₂=C(A)–CH=CH₂</td><td>A=H (buta-1,3-diène), Cl (chloroprène), CH₃ (isoprène)</td></tr>
      <tr><td>Dérivés acryliques</td><td>CH₂=C(A)–CO(OMe)</td><td>A=H (acrylate de méthyle), CH₃ (méthacrylate de méthyle)</td></tr>
    </table>
    <p>Pour A=CH₃, le monomère est l'isoprène, dont la polymérisation donne le caoutchouc synthétique. L'enchaînement des motifs peut s'effectuer en 1,4 (comme dans le caoutchouc naturel), avec des variantes tête-à-queue / tête-à-tête / queue-à-queue, et la chaîne peut adopter une configuration cis ou trans autour des doubles liaisons résiduelles.</p>
    <p>Tous les composés <strong>terpéniques</strong> se laissent structuralement « découper » en motifs isoprène (deux pour un monoterpène en C₁₀, trois pour un sesquiterpène en C₁₅, huit pour un tétraterpène en C₄₀), même si l'isoprène n'est pas leur véritable précurseur biosynthétique. Le <strong>polybutadiène</strong>, obtenu par polymérisation du butadiène, est l'analogue synthétique du caoutchouc naturel (polymère de l'isoprène) : les chaînes de caoutchouc naturel contiennent de 1000 à 5000 motifs isoprène, toutes les doubles liaisons y étant en configuration Z (cis).</p>

    <h3>2. Réaction d'addition (polyaddition)</h3>
    <p>Les réactions de <strong>polyaddition</strong> consistent en l'addition successive de molécules monomères sur une molécule d'amorçage. Elles se rattachent aux réactions de polymérisation mais s'en distinguent par deux traits : l'<strong>absence de phase de terminaison</strong>, et l'<strong>absence d'élimination de petites molécules</strong> (en négligeant le réactif d'amorçage fixé en bout de chaîne). Théoriquement, la réaction s'arrête lorsque tout le monomère est consommé et reprend dès qu'on en ajoute.</p>
    <ul>
      <li><strong>Polyéthers</strong> : la polymérisation de l'oxyde d'éthylène sous l'influence d'un composé à hydrogène actif labile (eau, alcool, phénol, amine) conduit, par additions successives, à des polyéthers RO–(CH₂CH₂O)<sub>n</sub>–H, l'alcool ou l'amine initiale ayant servi d'amorce.</li>
      <li><strong>Polyurées</strong> : obtenues par polyaddition de diamines sur des diisocyanates (ou par polycondensation de diamines avec des diuréthanes, des ω-urées ou des esters carboniques). Elles résistent bien aux acides et aux alcalis (fibres « Urylon »).</li>
      <li><strong>Polyuréthanes</strong> : réaction entre une fonction alcool et une fonction isocyanate pour former un uréthane (R–NH–COOR'). Avec un dialcool et un diisocyanate, une polyaddition donne des solides thermoplastiques (chaussures de ski) ; en présence d'eau, le dégagement gazeux de CO₂ produit un matériau cellulaire, la « mousse plastique » utilisée comme isolant, dans les sièges et les matelas.</li>
    </ul>

    <h3>3. Réaction de polycondensation</h3>
    <p>Les réactions de <strong>polycondensation</strong> consistent en l'union de molécules polyfonctionnelles par des réactions classiques (estérification, amidification, anhydrification...), <strong>avec élimination d'un constituant</strong> — le plus souvent de l'eau, parfois un hydracide ou l'ammoniac. Elles se distinguent des réactions de polymérisation en ce qu'elles ne nécessitent pas de réaction d'amorçage : elles se produisent par simple chauffage ou sous l'action de catalyseurs analogues à ceux des réactions entre molécules monofonctionnelles.</p>
    <p>La <strong>fonctionnalité</strong> $\\bar f$ (nombre de fonctions réactives d'un monomère, capables de participer à la croissance de chaîne) gouverne l'architecture obtenue :</p>
    <p>$$\\bar f = \\dfrac{\\sum_i n_if_i}{\\sum_i n_i}$$</p>
    <ul>
      <li>$\\bar f &lt; 2$ : la polymérisation s'arrête d'elle-même (chaînes courtes)</li>
      <li>$\\bar f = 2$ : polycondensation de molécules bifonctionnelles → macromolécules <strong>linéaires, thermoplastiques</strong></li>
      <li>$\\bar f &gt; 2$ : ramifications, chaînes latérales, voire réticulation → réseau <strong>tridimensionnel, thermodurcissable</strong>, insoluble et infusible</li>
    </ul>

    <p><strong>Polyesters.</strong> Réaction entre un diacide et un di- (ou tri-) alcool, les motifs étant réunis par des fonctions esters. L'éthane-1,2-diol et l'acide téréphtalique donnent le <em>tergal</em> (fibres textiles : tergale, dacron, térylène). Le glycérol (propan-1,2,3-triol) et l'acide orthophtalique donnent une résine glycérophtalique (peintures, vernis) — ici la fonctionnalité du glycérol (3) dépasse deux, d'où un réseau tridimensionnel. L'anhydride phtalique et un diol donnent des phtalates, utilisés comme plastifiants du PVC.</p>

    <p><strong>Polyamides.</strong> Réaction entre fonction acide et fonction amine, conduisant à des fonctions amide. Le nylon fut le premier polyamide synthétisé (Wallace Carothers, fin des années 1920), à l'origine de la découverte même de la réaction de polycondensation.</p>
    <table class="mini-table">
      <tr><th>Voie</th><th>Monomère(s)</th><th>Produit</th></tr>
      <tr><td>Une seule matière première (A–B)</td><td>acide 11-aminoundécanoïque</td><td>Nylon-11 (Rilsan)</td></tr>
      <tr><td>Une seule matière première (A–B)</td><td>acide 6-aminohexanoïque</td><td>Nylon-6 (Perlon)</td></tr>
      <tr><td>Deux matières premières (A–A + B–B)</td><td>chlorure adipique + hexaméthylène diamine</td><td>Nylon-6,6</td></tr>
    </table>
    <p>Pour un nylon issu de deux matières premières, la notation nylon-α,β signifie α carbones côté diamine et β carbones côté diacide.</p>

    <p><strong>Phénoplastes.</strong> Polycondensation du formaldéhyde et d'un phénol (résines formophénoliques). Le phénol, qui présente trois sites réactifs (deux ortho, un para), conduit à des macromolécules à réseau tridimensionnel : des <strong>résines thermodurcissables</strong>. En milieu acide, le mécanisme passe par protonation du formol, addition sur le phénol, puis formation d'un carbocation benzylique qui s'additionne à son tour sur un autre cycle phénolique. En milieu basique, le phénol est d'abord déprotoné en phénate ($pK_A=9{,}8$), qui attaque le formaldéhyde par voie nucléophile, puis se condense avec un autre phénate.</p>

    <p><strong>Résines aminoplastes.</strong> Polycondensation de l'urée ou de la mélamine avec le formaldéhyde (résines urée-formol UF, mélamine-formol MF). L'urée (NH₂)₂CO possède quatre hydrogènes labiles susceptibles de réagir, d'où un réseau tridimensionnel aux mailles particulièrement serrées. La mélamine (triamino-2,4,6-triazine-1,3,5), obtenue en chauffant la dicyandiamide avec l'ammoniac, possède trois fonctions amine capables de fixer le formaldéhyde, donnant un dérivé triméthylolé qui se polycondense en réseau tridimensionnel (colles à durcisseur, vaisselle plastique).</p>

    <p><strong>Polycarbonate.</strong> Obtenu par polycondensation du bisphénol avec un carbonate (ou le phosgène). Excellentes propriétés mécaniques et résistance thermique : vitrages pare-balles, casques de protection, pièces techniques.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Trois critères permettent de classer une synthèse de polymère : élimine-t-on une petite molécule (eau, HCl...) — c'est une polycondensation — ou non — polymérisation ou polyaddition ; existe-t-il une étape de terminaison — polymérisation en chaîne — ou non — polyaddition ; et enfin, la fonctionnalité moyenne des monomères ($\\bar f=2$ ou $\\bar f&gt;2$) décide si le produit final sera un thermoplastique linéaire ou un réseau thermodurcissable.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Polymérisation par addition : union de monomères insaturés sans élimination d'un sous-produit autre que le polymère</li>
        <li>Polyaddition : addition successive sur une molécule d'amorçage, sans étape de terminaison ni élimination de petite molécule (polyéthers, polyurées, polyuréthanes)</li>
        <li>Polycondensation : union de molécules polyfonctionnelles avec élimination d'un constituant (souvent H₂O), sans amorçage nécessaire (polyesters, polyamides, phénoplastes, aminoplastes, polycarbonate)</li>
        <li>Fonctionnalité moyenne $\\bar f$ : $\\bar f=2$ donne un polymère linéaire thermoplastique, $\\bar f&gt;2$ donne un réseau tridimensionnel thermodurcissable</li>
        <li>Nylon-6,6 vient de deux matières premières (chlorure adipique + hexaméthylène diamine) ; Nylon-6 et Nylon-11 viennent d'une seule (acide aminé bifonctionnel A–B)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre polyaddition et polycondensation : la polyaddition n'élimine pas de petite molécule, contrairement à la polycondensation</li>
        <li>Croire que toute polycondensation donne un thermodurcissable : c'est vrai seulement si $\\bar f&gt;2$ ; avec des monomères strictement bifonctionnels ($\\bar f=2$), on obtient un thermoplastique linéaire</li>
        <li>Oublier que les polycondensations ne nécessitent pas d'amorceur, contrairement aux polymérisations en chaîne</li>
        <li>Mélanger nylon-6 (une seule matière première, un acide aminé) et nylon-6,6 (deux matières premières, un diacide et une diamine)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une réaction de synthèse de polymère qui élimine de l'eau à chaque étape, et qui ne nécessite pas d'amorceur, est une :</p>
        <div class="options">
          <label class="option"><input type="radio" name="poly3e1" value="wrong"> polymérisation par addition</label>
          <label class="option"><input type="radio" name="poly3e1" value="wrong"> polyaddition</label>
          <label class="option"><input type="radio" name="poly3e1" value="right"> polycondensation</label>
          <label class="option"><input type="radio" name="poly3e1" value="wrong"> télomérisation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('poly3e1','poly3fb1','Correct — l\\'élimination d\\'une petite molécule (ici l\\'eau) à chaque étape, sans besoin d\\'amorceur, est la signature de la polycondensation.','Relis la section 3 : élimination d\\'un constituant (souvent l\\'eau) et absence d\\'amorçage sont les deux marqueurs de la polycondensation.')">Vérifier</button>
        <div class="feedback" id="poly3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le Nylon-6,6 est obtenu par polycondensation de l'hexaméthylène diamine avec :</p>
        <div class="options">
          <label class="option"><input type="radio" name="poly3e2" value="wrong"> l'acide 6-aminohexanoïque</label>
          <label class="option"><input type="radio" name="poly3e2" value="right"> le chlorure adipique (ou l'acide adipique)</label>
          <label class="option"><input type="radio" name="poly3e2" value="wrong"> le formaldéhyde</label>
          <label class="option"><input type="radio" name="poly3e2" value="wrong"> le bisphénol</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('poly3e2','poly3fb2','Correct — le Nylon-6,6 vient de deux matières premières bifonctionnelles : le chlorure (ou l\\'acide) adipique (6 carbones) et l\\'hexaméthylène diamine (6 carbones).','Le Nylon-6,6 est issu de DEUX matières premières A-A et B-B, pas d\\'un seul acide aminé (ce serait le Nylon-6) — relis le tableau de la section 3.')">Vérifier</button>
        <div class="feedback" id="poly3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Si la fonctionnalité moyenne d'un mélange de monomères pour une polycondensation est supérieure à 2, on obtient généralement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="poly3e3" value="wrong"> un thermoplastique linéaire soluble</label>
          <label class="option"><input type="radio" name="poly3e3" value="right"> un réseau tridimensionnel thermodurcissable</label>
          <label class="option"><input type="radio" name="poly3e3" value="wrong"> l'arrêt immédiat de la réaction</label>
          <label class="option"><input type="radio" name="poly3e3" value="wrong"> un élastomère thermoplastique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('poly3e3','poly3fb3','Correct — au-delà de f=2, des ramifications et une réticulation deviennent possibles, aboutissant à un réseau tridimensionnel infusible et insoluble : un thermodurcissable.','Relis la section 3 : f=2 donne un polymère linéaire, f>2 ouvre la voie à la ramification et à la réticulation.')">Vérifier</button>
        <div class="feedback" id="poly3fb3"></div>
      </div>
    </div>
  `
};

POLY_NOVA_KB[polyKey('Synthèse des polymères : polymérisation, polyaddition et polycondensation')] = {
  intro: "Salut, c'est Nova ! On distingue ici trois voies de synthèse : polymérisation par addition, polyaddition et polycondensation. Demande-moi la différence entre ces trois voies, comment se forme le Nylon-6,6, ou ce qu'est la fonctionnalité d'un monomère.",
  rules: [
    { test:/polyaddition/i, replies:["La polyaddition (polyéthers, polyurées, polyuréthanes) additionne successivement des monomères sur une molécule d'amorçage, sans étape de terminaison et sans éliminer de petite molécule — à la différence de la polycondensation."] },
    { test:/polycondensation/i, replies:["La polycondensation unit des molécules polyfonctionnelles (estérification, amidification...) avec élimination d'un constituant, le plus souvent l'eau. Elle ne nécessite pas de réaction d'amorçage, contrairement à la polymérisation en chaîne."] },
    { test:/fonctionnalit[ée]/i, replies:["La fonctionnalité moyenne f̄ = Σ(ni·fi)/Σni compte le nombre de fonctions réactives par monomère. Si f̄=2, on obtient un polymère linéaire thermoplastique ; si f̄>2, des ramifications et une réticulation deviennent possibles, menant à un réseau tridimensionnel thermodurcissable."] },
    { test:/nylon.*6.?6|nylon 66/i, replies:["Le Nylon-6,6 vient de deux matières premières bifonctionnelles A-A et B-B : le chlorure (ou l'acide) adipique (6 carbones, diacide) et l'hexaméthylène diamine (6 carbones, diamine), avec élimination de HCl (ou d'eau)."] },
    { test:/nylon.*6\\b|nylon.*11|rilsan|perlon/i, replies:["Nylon-6 (Perlon) et Nylon-11 (Rilsan) sont obtenus par polycondensation d'un seul monomère bifonctionnel A-B — un acide aminé — sur lui-même, contrairement au Nylon-6,6 qui utilise deux matières premières distinctes."] },
    { test:/ph[ée]noplaste|bak[ée]lite|formald[ée]hyde.*ph[ée]nol/i, replies:["Les phénoplastes sont des polycondensats de formaldéhyde et de phénol. Le phénol ayant trois sites réactifs (deux ortho, un para), la réaction conduit à un réseau tridimensionnel thermodurcissable, comme dans la bakélite historique."] },
    { test:/aminoplaste|m[ée]lamine|ur[ée].*formol/i, replies:["Les résines aminoplastes viennent de la polycondensation de l'urée ou de la mélamine avec le formaldéhyde. L'urée a quatre hydrogènes labiles, la mélamine trois fonctions amine : dans les deux cas, on obtient un réseau tridimensionnel très réticulé."] },
    { test:/polyester|tergal|dacron/i, replies:["Les polyesters résultent de la réaction d'un diacide avec un di- (ou tri-) alcool, les motifs étant liés par des fonctions esters. L'éthane-1,2-diol et l'acide téréphtalique donnent le tergal (fibre textile)."] },
    { test:/polycarbonate/i, replies:["Le polycarbonate s'obtient par polycondensation du bisphénol avec un carbonate (ou le phosgène). Il a d'excellentes propriétés mécaniques et une bonne résistance thermique — vitrages pare-balles, casques."] },
    { test:/isopr[eè]ne.*polym[ée]ris|polyisopr[eè]ne/i, replies:["La polymérisation de l'isoprène (motif CH2=C(CH3)-CH=CH2) se fait principalement en 1,4, avec des configurations cis ou trans possibles autour des doubles liaisons résiduelles — comme dans le caoutchouc naturel (cis) et la gutta-percha (trans)."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : identifie s'il y a élimination d'une petite molécule et besoin d'un amorceur.","Indice niveau 2 : élimination d'eau + pas d'amorceur nécessaire, ce sont deux marqueurs typiques.","Indice niveau 3 : c'est la polycondensation."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : le Nylon-6,6 vient-il d'une ou de deux matières premières ?","Indice niveau 2 : deux matières premières A-A et B-B, une diamine et un diacide (ou son chlorure).","Indice niveau 3 : hexaméthylène diamine + chlorure (ou acide) adipique."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare la valeur de f̄ donnée (>2) au seuil critique de la section 3.","Indice niveau 2 : au-delà de f=2, ramification et réticulation deviennent possibles.","Indice niveau 3 : le résultat est un réseau tridimensionnel thermodurcissable."] }
  ]
};
/* =========================== CHAPITRE 4 — Mécanismes de polymérisation en chaîne et télomérisation =========================== */
POLY_CHAPTERS[polyKey('Mécanismes de polymérisation en chaîne et télomérisation')] = {
  objectives: [
    "Décrire les trois étapes classiques d'une polymérisation en chaîne — amorçage, propagation, terminaison — et la nature du centre actif dans chaque type de mécanisme",
    "Comparer polymérisation cationique et anionique : monomères compatibles, nature des amorceurs, existence ou non d'une étape de terminaison",
    "Détailler les étapes et les amorceurs usuels de la polymérisation radicalaire, et distinguer terminaison par combinaison et par dismutation",
    "Expliquer le principe de la télomérisation (taxogène/télogène) et identifier le signe de ΔH et de ΔS d'une réaction de polyaddition"
  ],
  prereqs: ["Synthèse des polymères : polymérisation, polyaddition et polycondensation"],
  bodyHtml: `
    <p>La polymérisation des alcènes et autres monomères insaturés (éthylène, dérivés vinyliques, diènes) est une <strong>polymérisation en chaîne</strong> : une réaction se développant à partir de molécules activées, via des <strong>centres actifs</strong> — intermédiaires réactionnels qui ne préexistent pas dans le monomère et dont la réactivité diffère totalement de celle du monomère lui-même. Selon la nature de ce centre actif (cation, anion ou radical), on distingue polymérisation ionique (cationique ou anionique) et polymérisation radicalaire. Le mécanisme comporte le plus souvent trois étapes : <strong>amorçage</strong> (création du centre actif), <strong>propagation</strong> (additions successives régénérant le centre actif) et <strong>terminaison</strong> (destruction du centre actif).</p>

    <h3>1. Polymérisation ionique</h3>
    <p><strong>Polymérisation cationique.</strong> Le centre actif est un cation (carbocation). Monomères compatibles : oléfines (isobutylène), éthers vinyliques, composés insaturés riches en électrons (styrène), terpènes, hétérocycles (THF...). L'amorçage se fait par addition d'un catalyseur sur le monomère, avec régiosélectivité, via des carbocations intermédiaires :</p>
    <ul>
      <li><strong>Acides protoniques (Brönsted)</strong> : H₂SO₄, HClO₄, acide trifluorométhanesulfonique, acide trifluoroacétique — $HA + H_2C{=}CHR \\rightarrow H_3C{-}CHR^{+}A^{-}$</li>
      <li><strong>Acides de Lewis</strong> + co-amorceur (souvent eau ou alcool) : TiCl₄, SnCl₄, AlCl₃, BF₃</li>
      <li><strong>Substances libérant des carbocations</strong> : Ph₃CCl</li>
    </ul>
    <p>La propagation consiste en l'addition successive de monomère activé sur le carbocation en croissance ; la vitesse dépend de la stabilité de ce carbocation. La terminaison se fait par perte d'un proton du carbocation ou par capture d'un anion. Exemple industriel : la polymérisation cationique de l'isobutylène donne le <strong>caoutchouc butyle</strong>, apprécié pour son imperméabilité relative aux gaz (chambres à air) bien qu'il soit un mauvais élastomère (non vulcanisable, caractère paraffinique).</p>

    <p><strong>Polymérisation anionique.</strong> Le centre actif est un carbanion, stabilisé par un groupement à effet mésomère accepteur (–M) et/ou inductif attracteur (–I) porté par le monomère — condition nécessaire pour que le mécanisme fonctionne. L'amorçage se fait par des organométalliques (BuLi), des bases fortes organiques (NaNH₂) ou minérales (NaOH, KOH), ou des métaux alcalins. En <strong>milieu aprotique</strong> rigoureusement pur (cyclohexane, THF, dioxane, DMF), il n'y a <strong>pas d'étape de terminaison</strong> : la réaction se poursuit jusqu'à épuisement du monomère, et le macrocarbanion final constitue un <strong>polymère vivant</strong>, réactivable par ajout de nouveau monomère. En <strong>milieu protique</strong>, en revanche, les macrocarbanions captent un proton du solvant, ce qui interrompt la croissance.</p>
    <p>Monomères typiques : acrylate de méthyle, acrylonitrile, méthacrylate de méthyle, cyanoacrylate d'éthyle, styrène. Exemple : la polymérisation de l'isoprène par dispersion de lithium donne un polyisoprène presque totalement cis, appelé <strong>caoutchouc corail</strong> — les alcènes simples non stabilisés ne polymérisent pas dans ces conditions.</p>

    <h3>2. Polymérisation radicalaire</h3>
    <p>C'est le procédé le plus employé industriellement. Les centres actifs sont des radicaux libres, formés par choc bimoléculaire du monomère, sous rayonnement, ou — le plus souvent — par décomposition d'une substance instable (amorceur). Deux étapes d'amorçage : formation d'un radical libre $R^\\bullet$ à partir de l'amorceur $I$, puis addition de $R^\\bullet$ sur une molécule de monomère $M$, qui porte alors le centre actif.</p>
    <table class="mini-table">
      <tr><th>Famille d'amorceur</th><th>Exemple</th><th>Mode de génération</th></tr>
      <tr><td>Peroxydes R–O–O–R</td><td>peroxyde de benzoyle, peroxyde de tertiobutyle</td><td>rupture homolytique O–O</td></tr>
      <tr><td>Azoïques aliphatiques</td><td>AIBN (azobisisobutyronitrile), $60\\,°C$</td><td>perte de N₂, 2 radicaux</td></tr>
      <tr><td>Persulfate</td><td>S₂O₈²⁻</td><td>2 SO₄⁻•</td></tr>
      <tr><td>Redox</td><td>H₂O₂ + Fe²⁺ (Fenton)</td><td>radical hydroxyle •OH</td></tr>
      <tr><td>Rayonnement γ, hν</td><td>RH</td><td>R• + H•</td></tr>
    </table>
    <p>La <strong>phase de terminaison</strong> détruit le centre actif par réaction bimoléculaire entre deux chaînes en croissance, selon deux voies concurrentes :</p>
    <ul>
      <li><strong>Combinaison</strong> : les deux radicaux macromoléculaires s'unissent directement (une seule chaîne résultante, plus longue)</li>
      <li><strong>Dismutation</strong> : transfert d'un atome H entre les deux chaînes activées (deux chaînes distinctes, l'une saturée, l'autre terminée par une double liaison)</li>
    </ul>
    <p>Exemple : la synthèse du polyéthylène sous haute pression (PEHP, $P\\approx 1000$ bar, $T\\approx 200\\,°C$, amorceur peroxyde) est thermodynamiquement favorisée en phase terminale par la combinaison plutôt que par la dismutation.</p>

    <h3>3. Télomérisation</h3>
    <p>La télomérisation est une réaction catalysée par des complexes organométalliques de palladium ou de nickel, qui permet de former des chaînes carbonées fonctionnalisées. Elle correspond à une dimérisation de 1,3-diènes conjugués (le <strong>taxogène</strong>) suivie d'une substitution nucléophile par un nucléophile Nu–H (le <strong>télogène</strong> — souvent l'eau, l'ammoniac ou un alcool), donnant un mélange de produits linéaires ou branchés, cis ou trans. Découverte en parallèle en 1967 (Smutny, Takashi et al.), c'est une réaction idéale en termes d'économie d'atomes, minimisant les déchets.</p>
    <p>Divers composés halogénés peuvent aussi conduire à une télomérisation, comme la mono-addition de CCl₄ sur l'éthylène : $Cl_3C^\\bullet$ s'additionne successivement sur plusieurs molécules d'éthylène avant de capter un chlore, produisant un télomère $CCl_3{-}(CH_2CH_2)_n{-}CH_2Cl$. La copolymérisation du butadiène avec l'acrylonitrile (caoutchouc BuNa) ou le styrène illustre comment cette chimie a ouvert la voie aux élastomères synthétiques dès la Première Guerre mondiale.</p>

    <h3>4. Aspect thermodynamique et cinétique d'une polyaddition</h3>
    <p>Pour qu'une polymérisation soit possible, il faut $\\Delta G = \\Delta H - T\\Delta S &lt; 0$. Le passage de $n$ monomères au polymère correspond à la rupture de $n$ liaisons $\\pi$ (C=C) et à la formation de $2n$ liaisons $\\sigma$ (C–C) : la réaction est donc <strong>nécessairement exothermique</strong> ($\\Delta H &lt; 0$). Par ailleurs, passer de molécules courtes et mobiles à une macromolécule rigide fait perdre des degrés de liberté : $\\Delta S &lt; 0$. La polymérisation est donc favorisée par une <strong>basse température</strong> (le terme $-T\\Delta S$ devient moins pénalisant) et, s'agissant d'une diminution de la quantité de gaz, par une <strong>pression élevée</strong>.</p>
    <p>La vitesse de dégagement de chaleur associée s'écrit :</p>
    <p>$$V_Q = R_p\\,\\Delta H$$</p>
    <p>où $R_p$ est le taux de conversion du monomère (mol·L⁻¹·s⁻¹) et $\\Delta H$ l'enthalpie de polymérisation (kJ/mol) ; cette chaleur doit être évacuée pour éviter un emballement thermique. Sur le plan cinétique, une température élevée accélère la réaction mais défavorise la thermodynamique : il faut donc trouver un compromis. Une pression élevée favorise, elle, à la fois la thermodynamique et la cinétique.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Trois mécanismes en chaîne coexistent — cationique, anionique, radicalaire — distingués par la nature du centre actif et par l'existence ou non d'une étape de terminaison (absente en anionique vivant, en milieu aprotique). Toute polymérisation en chaîne est thermodynamiquement exothermique ($\\Delta H&lt;0$) avec une perte d'entropie ($\\Delta S&lt;0$), ce qui impose un compromis entre température (cinétique) et refroidissement (thermodynamique et sécurité).
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Trois étapes d'une polymérisation en chaîne : amorçage (création du centre actif), propagation (additions successives), terminaison (destruction du centre actif)</li>
        <li>Polymérisation cationique : carbocation, amorceurs acides (Brönsted ou Lewis), monomères riches en électrons (isobutylène, styrène, éthers vinyliques)</li>
        <li>Polymérisation anionique : carbanion stabilisé par effet -M/-I, amorceurs basiques ; en milieu aprotique, pas d'étape de terminaison → polymère « vivant »</li>
        <li>Polymérisation radicalaire : amorceurs peroxydes/azoïques/redox/rayonnement ; terminaison par combinaison ou dismutation</li>
        <li>Télomérisation : dimérisation d'un diène (taxogène) + substitution par un nucléophile (télogène), catalysée au Pd ou Ni</li>
        <li>Toute polyaddition est exothermique ($\\Delta H&lt;0$) avec $\\Delta S&lt;0$ : favorisée par basse température et haute pression</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que toute polymérisation anionique manque d'étape de terminaison : c'est vrai seulement en milieu aprotique rigoureusement pur ; en milieu protique, les carbanions captent un proton du solvant</li>
        <li>Confondre l'amorceur (crée le centre actif, ex. AIBN) et le monomère (s'additionne ensuite en chaîne)</li>
        <li>Penser que la polymérisation est endothermique : la rupture de liaisons π au profit de liaisons σ rend la réaction toujours exothermique</li>
        <li>Oublier que le taxogène (le diène qui dimérise) et le télogène (le nucléophile qui termine la chaîne) jouent des rôles différents en télomérisation</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une polymérisation anionique réalisée en milieu aprotique rigoureusement pur (THF, DMF...) :</p>
        <div class="options">
          <label class="option"><input type="radio" name="poly4e1" value="wrong"> s'arrête toujours après addition d'un seul monomère</label>
          <label class="option"><input type="radio" name="poly4e1" value="right"> ne présente pas d'étape de terminaison, jusqu'à épuisement du monomère</label>
          <label class="option"><input type="radio" name="poly4e1" value="wrong"> nécessite obligatoirement un peroxyde comme amorceur</label>
          <label class="option"><input type="radio" name="poly4e1" value="wrong"> ne peut se faire qu'avec des alcènes simples non substitués</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('poly4e1','poly4fb1','Correct — en l\\'absence de solvant protique susceptible de céder un proton, le carbanion en bout de chaîne reste actif : on parle de polymère vivant.','Relis la section 1 : en milieu aprotique bien pur, rien ne vient détruire le carbanion en bout de chaîne — la réaction continue jusqu\\'à épuisement du monomère.')">Vérifier</button>
        <div class="feedback" id="poly4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'AIBN (azobisisobutyronitrile) est utilisé en polymérisation radicalaire comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="poly4e2" value="wrong"> monomère</label>
          <label class="option"><input type="radio" name="poly4e2" value="right"> amorceur, générant des radicaux libres par perte de N₂</label>
          <label class="option"><input type="radio" name="poly4e2" value="wrong"> télogène</label>
          <label class="option"><input type="radio" name="poly4e2" value="wrong"> catalyseur de Ziegler-Natta</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('poly4e2','poly4fb2','Correct — l\\'AIBN, chauffé vers 60°C, se décompose en libérant N2 et deux radicaux libres qui amorcent la chaîne en s\\'additionnant sur le premier monomère.','L\\'AIBN est un azoïque aliphatique : il se décompose thermiquement en dégageant N2 et deux radicaux libres, qui amorcent la chaîne — ce n\\'est pas le monomère lui-même.')">Vérifier</button>
        <div class="feedback" id="poly4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le passage de n monomères au polymère correspond à la rupture de liaisons π (C=C) et à la formation de liaisons σ (C-C) : la réaction de polymérisation est donc, du point de vue thermodynamique :</p>
        <div class="options">
          <label class="option"><input type="radio" name="poly4e3" value="wrong"> endothermique, avec ΔS > 0</label>
          <label class="option"><input type="radio" name="poly4e3" value="right"> exothermique, avec ΔS < 0</label>
          <label class="option"><input type="radio" name="poly4e3" value="wrong"> athermique, avec ΔS = 0</label>
          <label class="option"><input type="radio" name="poly4e3" value="wrong"> exothermique, avec ΔS > 0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('poly4e3','poly4fb3','Correct — remplacer des liaisons π par des liaisons σ libère de l\\'énergie (ΔH<0), tandis que la perte de degrés de liberté en formant une macromolécule rigide donne ΔS<0 : c\\'est pourquoi une basse température favorise la polymérisation.','Relis la section 4 : la formation de 2n liaisons σ à partir de n liaisons π est toujours exothermique, et la perte de mobilité des chaînes donne une entropie négative.')">Vérifier</button>
        <div class="feedback" id="poly4fb3"></div>
      </div>
    </div>
  `
};

POLY_NOVA_KB[polyKey('Mécanismes de polymérisation en chaîne et télomérisation')] = {
  intro: "Salut, c'est Nova pour le dernier chapitre du module ! On voit ici les mécanismes en chaîne — cationique, anionique, radicalaire — et la télomérisation. Demande-moi ce qu'est un polymère vivant, le rôle d'un amorceur comme l'AIBN, ou pourquoi une polymérisation est toujours exothermique.",
  rules: [
    { test:/vivant|polym[eè]re vivant/i, replies:["Un polymère vivant s'obtient en polymérisation anionique, en milieu aprotique rigoureusement pur : sans rien pour capter le carbanion en bout de chaîne, il n'y a pas de terminaison — la chaîne reste réactive et peut reprendre sa croissance si on ajoute du monomère."] },
    { test:/cationique/i, replies:["La polymérisation cationique utilise des monomères riches en électrons (isobutylène, styrène, éthers vinyliques) et des amorceurs acides — acides de Brönsted (H2SO4...) ou acides de Lewis (BF3, AlCl3...) associés à un co-amorceur. Le centre actif est un carbocation."] },
    { test:/anionique/i, replies:["La polymérisation anionique nécessite un monomère dont le groupement stabilise un carbanion par effet -M ou -I (acrylates, acrylonitrile, styrène). L'amorçage se fait par des bases fortes (BuLi, NaNH2). En milieu aprotique pur, il n'y a pas de terminaison."] },
    { test:/radicalaire|aibn|peroxyde|amorceur/i, replies:["La polymérisation radicalaire, la plus utilisée industriellement, est amorcée par des peroxydes, des azoïques (AIBN), des persulfates, un système redox, ou un rayonnement. Ces amorceurs génèrent des radicaux libres qui s'additionnent au monomère."] },
    { test:/combinaison|dismutation|terminaison/i, replies:["La terminaison radicalaire se fait par combinaison (union directe de deux chaînes en croissance, une seule chaîne résultante) ou par dismutation (transfert d'un atome H entre deux chaînes, donnant deux chaînes distinctes)."] },
    { test:/t[ée]lom[ée]risation|taxog[eè]ne|t[ée]log[eè]ne/i, replies:["La télomérisation dimérise un 1,3-diène conjugué (le taxogène) sous catalyse Pd ou Ni, puis un nucléophile Nu-H (le télogène — eau, ammoniac, alcool) vient terminer la chaîne par substitution, donnant des produits fonctionnalisés linéaires ou branchés."] },
    { test:/exothermique|thermodynamique|delta h|enthalpie/i, replies:["Une polymérisation est toujours exothermique (ΔH<0) : elle remplace n liaisons π par 2n liaisons σ, plus stables. Comme ΔS<0 (perte de mobilité des chaînes), ΔG=ΔH-TΔS est plus négatif à basse température : le froid favorise la polymérisation."] },
    { test:/pression|cin[ée]tique/i, replies:["Une pression élevée favorise à la fois la thermodynamique (la polyaddition réduit la quantité de gaz) et la cinétique (la vitesse croît avec la concentration/pression). La température, elle, accélère la cinétique mais défavorise la thermodynamique : il faut un compromis."] },
    { test:/isobutyl[eè]ne|caoutchouc butyle/i, replies:["La polymérisation cationique de l'isobutylène donne le caoutchouc butyle, apprécié pour son imperméabilité aux gaz (chambres à air) même s'il ne peut pas être vulcanisé, en raison de son caractère paraffinique."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à ce qui capte (ou non) le carbanion en fin de chaîne.","Indice niveau 2 : en milieu aprotique, rien ne capte le carbanion.","Indice niveau 3 : pas de terminaison, jusqu'à épuisement du monomère."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : l'AIBN participe-t-il à la chaîne, ou déclenche-t-il la réaction ?","Indice niveau 2 : il se décompose thermiquement en dégageant un gaz et des radicaux.","Indice niveau 3 : c'est un amorceur, pas un monomère."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare l'énergie des liaisons π rompues à celle des liaisons σ formées.","Indice niveau 2 : remplacer π par σ libère de l'énergie.","Indice niveau 3 : ΔH<0 (exothermique) et ΔS<0 (perte de mobilité)."] }
  ]
};

/* fusionne le module Chimie des Polymères dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, POLY_CHAPTERS);
Object.assign(NOVA_KB, POLY_NOVA_KB);