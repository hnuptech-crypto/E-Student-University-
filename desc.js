/* =====================================================================
   CHUNK « desc » — registre DESC_CHAPTERS / DESC_NOVA_KB
   Matière(s) : Chimie|Chimie organique descriptive
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   DESC_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* ============================================================================
   MODULE CHIMIE ORGANIQUE DESCRIPTIVE — Chimie L2
   (contenu rédigé à partir du support "Cours et exercices de chimie organique 1",
   Nadia Ait Ahmed-Tahir, Université A. Mira de Béjaïa, Faculté des Sciences
   Exactes, Département de Chimie, 2016-2017, et du TP associé COD2103)
   Structure identique aux autres modules : DESC_CHAPTERS / DESC_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const DESC_MATIERE = 'Chimie organique descriptive';
function descKey(chapterTitle){ return `Chimie|${DESC_MATIERE}|${chapterTitle}`; }
const DESC_CHAPTERS = {};
const DESC_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur d'indice d'insaturation (Chapitre 3)
--------------------------------------------------------------------------------- */
function updateDescInsaturation(){
  const n = parseFloat(document.getElementById('descInsN').value) || 0;
  const p = parseFloat(document.getElementById('descInsP').value) || 0;
  const i = 1 + (2*n - p) / 2;
  let out = `i = 1 + (2×${n} − ${p}) / 2 = <strong>${i}</strong><br>`;
  if(!Number.isInteger(i) || i < 0){
    out += `Une formule brute cohérente donne toujours un indice entier ≥ 0 : vérifie le nombre d'atomes saisi (n = carbones, p = hydrogènes équivalents après remplacement des hétéroatomes par leur "hydrocarbure correspondant").`;
  } else if(i === 0){
    out += `i = 0 : aucune insaturation — la molécule est un hydrocarbure (ou un dérivé) totalement saturé et acyclique.`;
  } else {
    out += `i = ${i} : il faut ${i} liaison(s) π et/ou cycle(s) au total (une triple liaison ou un composé aromatique comptent pour plusieurs unités).`;
  }
  document.getElementById('descInsReadout').innerHTML = out;
}
function initDescInsaturation(){ updateDescInsaturation(); }

/* =========================== CHAPITRE 1 — Nomenclature des hydrocarbures =========================== */
DESC_CHAPTERS[descKey('Nomenclature des hydrocarbures : alcanes, alcènes, alcynes et composés aromatiques')] = {
  objectives: [
    "Nommer un alcane ramifié selon les règles systématiques de l'UICPA (chaîne principale, numérotation, préfixes multiplicatifs)",
    "Nommer un alcène ou un alcyne en donnant à la liaison multiple l'indice le plus faible possible",
    "Reconnaître et nommer les hydrocarbures cycliques (cyclanes, cyclènes, bicyclanes) et les composés benzéniques",
    "Nommer les principaux radicaux alkyles, alcényles et alcynyles, y compris les noms usuels (iso, tert, néo, allyle, vinyle, phényle, benzyle)"
  ],
  prereqs: ["Notions de base de chimie générale (L1)", "Atomistique et liaisons chimiques"],
  bodyHtml: `
    <p>La chimie organique repose entièrement sur une convention de nommage rigoureuse, établie par l'Union Internationale de Chimie Pure et Appliquée (UICPA/IUPAC) à la fin du XIX<sup>e</sup> siècle. Elle prend comme référence les <strong>hydrocarbures saturés</strong> : il faut donc d'abord maîtriser leur nomenclature avant d'aborder toute autre fonction.</p>

    <h3>1. Le squelette carboné et la classification des atomes de carbone</h3>
    <p>Le carbone est <strong>tétravalent</strong> (4 liaisons), l'hydrogène <strong>monovalent</strong>, l'oxygène <strong>divalent</strong> et l'azote <strong>trivalent</strong>. Selon le nombre d'autres atomes de carbone auxquels il est directement lié, un carbone est dit :</p>
    <table class="mini-table">
      <tr><th>Nom</th><th>Nombre de carbones voisins</th></tr>
      <tr><td>Nulaire</td><td>0 (ex. le carbone du méthane $CH_4$)</td></tr>
      <tr><td>Primaire (I)</td><td>1</td></tr>
      <tr><td>Secondaire (II)</td><td>2</td></tr>
      <tr><td>Tertiaire (III)</td><td>3</td></tr>
      <tr><td>Quaternaire (IV)</td><td>4</td></tr>
    </table>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 260 120" width="100%">
          <line x1="20" y1="70" x2="42" y2="57" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="42" y1="57" x2="64" y2="70" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="64" y1="70" x2="86" y2="57" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="86" y1="57" x2="108" y2="70" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="42" y1="57" x2="42" y2="33" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="64" y1="70" x2="64" y2="94" stroke="#EAF0FB" stroke-width="1.6"/>
          <circle cx="20" cy="70" r="2.6" fill="#4C7CFF"/><text x="8" y="88" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">I</text>
          <circle cx="42" cy="57" r="2.6" fill="#9B82FF"/><text x="30" y="26" font-family="IBM Plex Mono" font-size="9" fill="#9B82FF">III</text>
          <circle cx="64" cy="70" r="2.6" fill="#2DD4C4"/><text x="70" y="110" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">III</text>
          <circle cx="86" cy="57" r="2.6" fill="#4C7CFF"/><text x="90" y="46" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">I</text>
          <circle cx="108" cy="70" r="2.6" fill="#4C7CFF"/><text x="112" y="88" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">I</text>
          <text x="130" y="63" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">3-éthyl-2-méthylpentane</text>
        </svg>
        <span>Chaque sommet est un carbone ; I / III repèrent la classe de chaque carbone du squelette</span>
      </div>
    </div>

    <h3>2. Les alcanes $C_nH_{2n+2}$</h3>
    <p>Tous les carbones y sont hybridés $sp^3$. Le nom des dix premiers termes linéaires (méthane, éthane, propane, butane, pentane, hexane, heptane, octane, nonane, décane) sert de base à toute la nomenclature organique.</p>
    <table class="mini-table">
      <tr><th>n</th><th>Alcane</th><th>n</th><th>Alcane</th><th>n</th><th>Alcane</th></tr>
      <tr><td>1</td><td>méthane</td><td>5</td><td>pentane</td><td>9</td><td>nonane</td></tr>
      <tr><td>2</td><td>éthane</td><td>6</td><td>hexane</td><td>10</td><td>décane</td></tr>
      <tr><td>3</td><td>propane</td><td>7</td><td>heptane</td><td>12</td><td>dodécane</td></tr>
      <tr><td>4</td><td>butane</td><td>8</td><td>octane</td><td>20</td><td>eicosane</td></tr>
    </table>
    <p><strong>Règles pour un alcane ramifié :</strong></p>
    <ol>
      <li>Choisir la <strong>chaîne carbonée continue la plus longue</strong> : elle donne le nom de base.</li>
      <li>Numéroter la chaîne de façon à donner aux carbones porteurs de substituants les <strong>indices les plus faibles possibles</strong> (on compare la somme des indices dans les deux sens de numérotation).</li>
      <li>Nommer chaque substituant (groupe alkyle) avec son indice de position ; s'il y a plusieurs substituants identiques, précéder leur nom du préfixe multiplicatif <strong>di, tri, tétra...</strong> (un indice par occurrence, séparés par des virgules) ; si les substituants sont différents, les citer dans l'<strong>ordre alphabétique</strong>.</li>
      <li>Le nom du groupe alkyle perd son « e » final quand il est cité en préfixe (méthyl-, éthyl-...).</li>
    </ol>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> nommer $CH_3-CH_2-CH(C_2H_5)-C(CH_3)_2-CH_2-CH_3$ (chaîne de 6 carbones, un groupe éthyle en position 3, deux groupes méthyle en position 4).</p>
      <p><strong>Solution :</strong> la chaîne la plus longue compte 6 carbones → dérivé de l'hexane. En numérotant de droite à gauche on obtient la somme d'indices la plus faible (3 et 4,4 plutôt que 3,3 et 4 dans l'autre sens ici selon la position réelle des substituants) : les substituants sont un éthyle en 4 et deux méthyles en 3,3.</p>
      <p class="example-answer">Réponse : 4-éthyl-3,3-diméthylhexane.</p>
    </div>

    <h3>3. Radicaux alkyles</h3>
    <p>Un radical alkyle ($C_nH_{2n+1}-$) dérive de l'alcane de même squelette en remplaçant la terminaison <strong>-ane</strong> par <strong>-yle</strong>. La numérotation part obligatoirement du carbone porteur de la valence libre (indice 1).</p>
    <table class="mini-table">
      <tr><th>Radical</th><th>Formule</th><th>Abréviation</th></tr>
      <tr><td>Méthyle</td><td>$-CH_3$</td><td>Me</td></tr>
      <tr><td>Éthyle</td><td>$-CH_2CH_3$</td><td>Et</td></tr>
      <tr><td>Propyle</td><td>$-CH_2CH_2CH_3$</td><td>Pr</td></tr>
      <tr><td>Isopropyle</td><td>$-CH(CH_3)_2$</td><td>iPr</td></tr>
      <tr><td>tert-Butyle</td><td>$-C(CH_3)_3$</td><td>tBu</td></tr>
    </table>
    <p>Le préfixe <strong>iso-</strong> s'utilise lorsqu'un groupe méthyle est fixé sur l'avant-dernier carbone de la chaîne (isobutyle, isohexyle...) ; <strong>néopentyle</strong> et <strong>tertiobutyle</strong> sont des noms usuels toujours conservés.</p>

    <h3>4. Hydrocarbures saturés cycliques : les cyclanes</h3>
    <p>Un cyclane (cycloalcane, $C_nH_{2n}$) porte le nom de l'alcane de même nombre de carbones précédé du préfixe <strong>cyclo-</strong> (cyclopropane, cyclobutane, cyclopentane, cyclohexane...). Quand le cycle est polysubstitué, on attribue le numéro 1 au substituant classé premier par ordre alphabétique, puis on numérote le long du cycle de façon que le substituant classé second reçoive le plus bas indice possible.</p>
    <p>Pour les <strong>bicyclanes</strong>, le nom prend celui de l'alcane linéaire de même nombre total de carbones, précédé de <strong>bicyclo</strong> et suivi, entre crochets, du nombre d'atomes de chacun des trois ponts reliant les deux têtes de pont (ex. bicyclo[4,4,0]décane).</p>

    <h3>5. Les alcènes $C_nH_{2n}$</h3>
    <p>La terminaison <strong>-ane</strong> devient <strong>-ène</strong>. La chaîne principale doit obligatoirement contenir la double liaison, et la numérotation est choisie pour donner à celle-ci l'indice le plus faible possible — cet indice prime sur celui des substituants.</p>
    <table class="mini-table">
      <tr><th>Nom trivial</th><th>Nom systématique</th><th>Formule</th></tr>
      <tr><td>Éthylène</td><td>éthène</td><td>$CH_2=CH_2$</td></tr>
      <tr><td>Propylène</td><td>propène</td><td>$CH_3-CH=CH_2$</td></tr>
      <tr><td>Amylène</td><td>2-méthylbut-1-ène</td><td>$CH_3-CH_2-C(CH_3)=CH_2$</td></tr>
    </table>
    <p>Les radicaux dérivés se terminent par <strong>-ényle</strong> : $CH_2=CH-CH_2-$ est l'<strong>allyle</strong> (au lieu de prop-2-ényle) et $CH_2=CH-$ le <strong>vinyle</strong> (au lieu d'éthènyle) — deux noms usuels très employés.</p>

    <h3>6. Les alcynes $C_nH_{2n-2}$</h3>
    <p>La terminaison devient <strong>-yne</strong> ; même règle de numérotation prioritaire pour la triple liaison. Les radicaux se terminent par <strong>-ynyle</strong> (propynyle, etc.). Quand une molécule renferme à la fois une double et une triple liaison, la terminaison devient <strong>-ényne</strong> et, à indices égaux dans les deux sens, c'est la <strong>double liaison qui est prioritaire</strong> pour choisir le sens de numérotation et pour appartenir à la chaîne principale.</p>

    <div class="key-point">
      <span class="eyebrow">Règle des indices les plus faibles</span>
      Dans tous les cas — alcane, alcène, alcyne — on numérote la chaîne dans le sens qui donne l'indice le plus faible à la fonction/liaison multiple prioritaire, puis, à égalité, celui qui donne la <strong>somme des indices de substituants</strong> la plus faible.
    </div>

    <h3>7. Hydrocarbures benzéniques (aromatiques)</h3>
    <p>Le composé de référence est le benzène $C_6H_6$. Un noyau monosubstitué se nomme en citant le substituant en préfixe suivi de « benzène » (méthylbenzène = toluène, isopropylbenzène = cumène, éthénylbenzène = styrène). Pour un noyau disubstitué, on peut utiliser deux indices ou, plus simplement, les préfixes <strong>ortho (o-)</strong>, <strong>méta (m-)</strong>, <strong>para (p-)</strong> pour les positions 1,2 / 1,3 / 1,4.</p>
    <p>Les deux radicaux dérivés les plus employés sont le <strong>phényle</strong> ($C_6H_5-$, noté Ph ou $\\Phi$) et le <strong>benzyle</strong> ($C_6H_5-CH_2-$). Le phényle est traité comme un simple substituant dans une chaîne principale ouverte (ex. 2-méthyl-3-phénylpentane).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>On choisit toujours la chaîne carbonée continue la plus longue contenant la fonction prioritaire (ou la liaison multiple)</li>
        <li>La numérotation minimise d'abord l'indice de la fonction/liaison multiple, puis la somme des indices des substituants</li>
        <li>Substituants identiques → préfixe di/tri/tétra ; substituants différents → ordre alphabétique</li>
        <li>iso- = méthyle sur l'avant-dernier carbone ; allyle et vinyle sont des noms usuels d'alcényles à connaître par cœur</li>
        <li>Sur un cycle benzénique disubstitué, ortho/méta/para remplacent commodément les indices 1,2 / 1,3 / 1,4</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Choisir une chaîne principale plus courte simplement parce qu'elle est plus « droite » sur le papier — seule la longueur (nombre de carbones) compte</li>
        <li>Numéroter en minimisant d'abord les substituants au lieu de la liaison multiple, qui a toujours la priorité</li>
        <li>Oublier qu'un radical alkyle est numéroté à partir du carbone porteur de la valence libre, jamais depuis l'autre bout</li>
        <li>Confondre cyclane (saturé, $C_nH_{2n}$) et cyclène (une double liaison, $C_nH_{2n-2}$) qui portent la même formule brute générale que des alcènes/alcynes acycliques — attention aux isomères de fonction</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans $CH_3-CH_2-CH(CH_3)-CH_2-CH_3$, quel est le nom correct ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc1e1" value="wrong"> 2-méthylpentane</label>
          <label class="option"><input type="radio" name="desc1e1" value="right"> 3-méthylpentane</label>
          <label class="option"><input type="radio" name="desc1e1" value="wrong"> 3-méthylhexane</label>
          <label class="option"><input type="radio" name="desc1e1" value="wrong"> 2-éthylbutane</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc1e1','desc1fb1','Correct — la chaîne principale compte 5 carbones (pentane) et le méthyle est en position 3, identique dans les deux sens de numérotation.','Compte la chaîne la plus longue en carbones, puis repère la position du méthyle en donnant l\\'indice le plus faible.')">Vérifier</button>
        <div class="feedback" id="desc1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le groupe $CH_2=CH-CH_2-$ porte le nom usuel :</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc1e2" value="wrong"> vinyle</label>
          <label class="option"><input type="radio" name="desc1e2" value="right"> allyle</label>
          <label class="option"><input type="radio" name="desc1e2" value="wrong"> propényle</label>
          <label class="option"><input type="radio" name="desc1e2" value="wrong"> isopropyle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc1e2','desc1fb2','Correct — allyle est le nom usuel de prop-2-ényle ; le vinyle, lui, correspond à CH2=CH- (sans le CH2 supplémentaire).','Le vinyle est CH2=CH- ; ici il y a un CH2 supplémentaire entre la double liaison et la valence libre.')">Vérifier</button>
        <div class="feedback" id="desc1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour numéroter une chaîne contenant à la fois une double et une triple liaison, à indices égaux dans les deux sens :</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc1e3" value="wrong"> la triple liaison est toujours prioritaire</label>
          <label class="option"><input type="radio" name="desc1e3" value="right"> la double liaison est prioritaire</label>
          <label class="option"><input type="radio" name="desc1e3" value="wrong"> on choisit arbitrairement</label>
          <label class="option"><input type="radio" name="desc1e3" value="wrong"> aucune des deux ne compte, on regarde les substituants</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc1e3','desc1fb3','Correct — à indices identiques dans les deux sens, la double liaison prime sur la triple, aussi bien pour le sens de numérotation que pour le choix de la chaîne principale.','Relis la règle : entre ène et yne à égalité d\\'indices, l\\'un des deux l\\'emporte toujours — celui dont la terminaison apparaît en premier dans « ényne ».')">Vérifier</button>
        <div class="feedback" id="desc1fb3"></div>
      </div>
    </div>
  `
};

DESC_NOVA_KB[descKey('Nomenclature des hydrocarbures : alcanes, alcènes, alcynes et composés aromatiques')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Nomenclature des hydrocarbures ». Demande-moi comment choisir la chaîne principale, comment numéroter, ou un indice sur un exercice.",
  rules: [
    { test:/classe.*carbone|primaire|secondaire|tertiaire|quaternaire|nulaire/i, replies:["Un carbone est nulaire, primaire, secondaire, tertiaire ou quaternaire selon le nombre d'AUTRES atomes de carbone auxquels il est directement lié : 0, 1, 2, 3 ou 4."] },
    { test:/cha[iî]ne principale|plus longue/i, replies:["La chaîne principale est toujours la chaîne carbonée continue la PLUS LONGUE — et elle doit obligatoirement contenir la fonction ou la liaison multiple prioritaire si la molécule en a une."] },
    { test:/num[ée]rot/i, replies:["On numérote d'abord pour donner l'indice le plus faible à la liaison multiple (ou fonction), puis, en cas d'égalité, pour donner la somme des indices de substituants la plus faible."] },
    { test:/iso-|isobutyle|isohexyle/i, replies:["Le préfixe iso- s'emploie quand un groupe méthyle est fixé sur l'AVANT-DERNIER carbone de la chaîne (ex. isobutyle = (CH3)2CH-CH2-)."] },
    { test:/allyle|vinyle/i, replies:["Vinyle = CH2=CH- (le radical dérive directement de l'éthène). Allyle = CH2=CH-CH2- (un CH2 de plus entre la double liaison et la valence libre) — ne les confonds pas !"] },
    { test:/ortho|meta|para|m[ée]ta/i, replies:["Sur un benzène disubstitué : ortho (o-) = positions 1,2 ; méta (m-) = positions 1,3 ; para (p-) = positions 1,4."] },
    { test:/cyclane|cycloalcane/i, replies:["Un cyclane (cycloalcane, CnH2n) dérive de l'alcane de même n en ajoutant le préfixe cyclo-. Attention : il a la même formule brute générale qu'un alcène acyclique — ce sont des isomères de fonction."] },
    { test:/bicyclo/i, replies:["Un bicyclane se nomme bicyclo[x,y,z]alcane où x, y, z sont les nombres de carbones de chacun des 3 ponts entre les deux têtes de pont (le plus long en premier)."] },
    { test:/pr[ée]fixe multiplicatif|di.*tri.*t[ée]tra/i, replies:["Pour des substituants IDENTIQUES, on utilise di- (2), tri- (3), tétra- (4)... avec un indice de position par occurrence. Ces préfixes ne comptent pas pour l'ordre alphabétique de citation."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compte le nombre de carbones de la chaîne la plus longue.","Indice niveau 2 : il y en a 5.","Indice niveau 3 : le méthyle est au milieu, en position 3 dans les deux sens."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare avec le vinyle CH2=CH-.","Indice niveau 2 : ici il y a un CH2 de plus avant la valence libre.","Indice niveau 3 : c'est le groupe allyle."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense au mot « ényne » et à l'ordre des syllabes.","Indice niveau 2 : ène apparaît avant yne dans ce mot.","Indice niveau 3 : c'est donc la double liaison qui est prioritaire."] }
  ]
};

/* =========================== CHAPITRE 2 — Nomenclature des fonctions organiques =========================== */
DESC_CHAPTERS[descKey('Nomenclature des fonctions organiques : halogénés, alcools, éthers, amines, carbonylés, acides et dérivés')] = {
  objectives: [
    "Identifier le groupe caractéristique et la terminaison (suffixe) associée à chaque grande fonction organique",
    "Nommer un dérivé halogéné, un alcool, un éther, une amine, un aldéhyde, une cétone",
    "Nommer un acide carboxylique et ses dérivés (chlorure d'acide, anhydride, ester, amide, nitrile)",
    "Nommer un composé polyfonctionnel en choisissant correctement la fonction prioritaire (suffixe) et les fonctions secondaires (préfixes)"
  ],
  prereqs: ["Nomenclature des hydrocarbures : alcanes, alcènes, alcynes et composés aromatiques"],
  bodyHtml: `
    <p>Un <strong>groupe fonctionnel</strong> est un groupement d'atomes — le plus souvent porteur d'un ou plusieurs hétéroatomes — qui confère à la molécule un ensemble de propriétés chimiques communes. Selon le nombre d'atomes d'hydrogène remplacés sur un même carbone de l'hydrocarbure de référence, la fonction est dite <strong>monovalente</strong> (1 H remplacé), <strong>divalente</strong> (2 H) ou <strong>trivalente</strong> (3 H).</p>

    <table class="mini-table">
      <tr><th>Valence</th><th>Halogénée</th><th>Oxygénée</th><th>Azotée</th><th>Soufrée</th></tr>
      <tr><td>Monovalente</td><td>$-C-X$</td><td>$-C-OH$ (alcool)</td><td>$-C-N<$ (amine)</td><td>$-C-SH$ (thiol)</td></tr>
      <tr><td>Divalente</td><td>$>C<^X_X$</td><td>$>C=O$ (carbonyle)</td><td>$>C=N-$ (imine)</td><td>$>C=S$ (carbothionyle)</td></tr>
      <tr><td>Trivalente</td><td>$-C-X_3$</td><td>$-COOH$, $-COX$</td><td>$-C\\equiv N$ (nitrile)</td><td>—</td></tr>
    </table>
    <p>Ce tableau, tiré directement du cours, montre bien que <strong>l'alcool, l'amine et le thiol</strong> sont les fonctions monovalentes de référence ; <strong>carbonyle et imine</strong> les fonctions divalentes ; <strong>acide carboxylique et nitrile</strong> les fonctions trivalentes.</p>

    <h3>1. Dérivés halogénés $R-X$</h3>
    <p>Ils dérivent des alcanes par substitution d'un H par un halogène. Le nom est précédé du préfixe <strong>halogéno-</strong>, ou construit sous la forme « halogénure d'alkyle ». Exemple : $CH_3-Cl$ = chlorométhane ou chlorure de méthyle.</p>

    <h3>2. Alcools $R-OH$ (alcanols)</h3>
    <p>Suffixe <strong>-ol</strong> (le « e » final de l'alcane est remplacé). La chaîne principale contient obligatoirement le carbone porteur du $-OH$, qui reçoit l'indice le plus faible. Quand la fonction alcool n'est pas prioritaire, elle est citée en préfixe <strong>hydroxy-</strong>. Le radical $RO^-$ se nomme <strong>alcoxy</strong> (petits groupes) ou <strong>alkyloxy</strong> ($\\ge$ 5 carbones) ; le sel $RO^-$ est un <strong>alcanolate</strong> (terminaison -olate).</p>

    <h3>3. Éthers-oxydes $R-O-R'$ (alcoxyalcanes)</h3>
    <p>Deux nomenclatures coexistent : soit on nomme le groupe <strong>alcoxy $R-O-$</strong> lié à l'alcane $R'$ (ex. 2-éthoxy-2-méthylpropane), soit on les traite comme un <strong>« oxyde » des deux groupes alkyles</strong>, cités par ordre alphabétique (ex. $CH_3-O-CH_3$ = oxyde de diméthyle ; $CH_3-O-C_2H_5$ = oxyde d'éthyle et de méthyle).</p>

    <h3>4. Amines (alcanamines)</h3>
    <p>Suffixe <strong>-amine</strong>. On distingue amine primaire ($R-NH_2$), secondaire ($R-NH-R'$) et tertiaire ($R-N(R')-R''$) — <strong>attention</strong>, cette classe dépend du nombre de substituants portés par l'azote, contrairement aux alcools où c'est la classe du carbone qui compte. La substitution sur l'azote se note avec les préfixes <strong>N-, N,N-</strong> (ex. N-méthyléthanamine). Quand la fonction amine n'est pas prioritaire, elle est citée en préfixe <strong>amino-</strong>.</p>

    <h3>5. Aldéhydes $R-CHO$ et cétones $R-CO-R'$</h3>
    <p>Suffixes <strong>-al</strong> (aldéhyde) et <strong>-one</strong> (cétone). Quand ces fonctions ne sont pas prioritaires, elles sont citées en préfixe <strong>oxo-</strong>. Sur un cycle, l'aldéhyde se nomme avec le suffixe <strong>carbaldéhyde</strong> (le $-CHO$ étant lié à un atome du cycle). De nombreux aldéhydes gardent un nom usuel : $H-CHO$ = formaldéhyde (aldéhyde formique), $CH_3-CHO$ = acétaldéhyde ; les aldéhydes aromatiques ($C_6H_5-CHO$ = benzaldéhyde) sont toujours nommés par leur nom commun.</p>

    <h3>6. Acides carboxyliques $R-COOH$ (acides alcanoïques)</h3>
    <p>Suffixe <strong>-oïque</strong>, précédé du mot « acide ». Sur un cycle : « acide » + nom du cycle + suffixe <strong>carboxylique</strong> (acide benzènecarboxylique = acide benzoïque). Quand un composé porte plusieurs fonctions acide, celle qui appartient à une ramification est citée en préfixe <strong>carboxy-</strong>. Noms usuels à connaître : $H-COOH$ (acide formique), $CH_3-COOH$ (acide acétique), $CH_3CH_2CH_2-COOH$ (acide butyrique).</p>

    <h3>7. Fonctions dérivées des acides carboxyliques</h3>
    <table class="mini-table">
      <tr><th>Fonction</th><th>Groupe</th><th>Terminaison / construction</th><th>Préfixe</th></tr>
      <tr><td>Chlorure d'acide</td><td>$-COCl$</td><td>-oyle (précédé de « chlorure de »)</td><td>chloroformyl-</td></tr>
      <tr><td>Anhydride d'acide</td><td>$-CO-O-CO-$</td><td>« anhydride » + nom de l'acide</td><td>—</td></tr>
      <tr><td>Ester</td><td>$-COOR$</td><td>-oate d'alkyle</td><td>—</td></tr>
      <tr><td>Amide</td><td>$-CONH_2$</td><td>-amide</td><td>—</td></tr>
      <tr><td>Nitrile</td><td>$-C\\equiv N$</td><td>-nitrile</td><td>cyano-</td></tr>
    </table>
    <p>Un <strong>ester</strong> résulte formellement de la déshydratation entre un acide et un alcool ; son nom comporte deux mots : l'<strong>alcanoate</strong> (issu de l'acide) et le <strong>groupe alkyle</strong> (issu de l'alcool). Exemple : $CH_3-COO-C_2H_5$ = éthanoate d'éthyle.</p>
    <p>Un <strong>anhydride</strong> résulte de la déshydratation de deux fonctions acide (identiques ou non) : $R-COOH + R'-COOH \\rightarrow R-CO-O-CO-R' + H_2O$.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — composé polyfonctionnel</span>
      <p><strong>Énoncé :</strong> nommer $CH_3-CH(NH_2)-COOH$ (l'alanine, un acide $\\alpha$-aminé).</p>
      <p><strong>Solution :</strong> deux fonctions sont présentes : acide carboxylique et amine. L'acide carboxylique est prioritaire (elle est trivalente et en tête de la table de priorité) : elle donne le suffixe -oïque. L'amine, non prioritaire, est citée en préfixe amino-.</p>
      <p class="example-answer">Réponse : acide 2-aminopropanoïque.</p>
    </div>

    <h3>8. Table de priorité des fonctions (ordre décroissant)</h3>
    <p>Pour un composé polyfonctionnel, une seule fonction — la plus haute dans ce classement — donne le <strong>suffixe</strong> ; toutes les autres sont citées en <strong>préfixe</strong> :</p>
    <p class="mono" style="font-size:0.85rem; line-height:1.9;">acide carboxylique &gt; acide sulfonique &gt; anhydride d'acide &gt; ester ≈ chlorure d'acide &gt; amide &gt; nitrile &gt; aldéhyde &gt; cétone &gt; alcool &gt; amine &gt; éther-oxyde &gt; alcène &gt; alcyne &gt; alcane</p>

    <div class="key-point">
      <span class="eyebrow">Fonctions multiples et fonctions mixtes</span>
      Une fonction <strong>multiple</strong> répète le même groupe (diol, diène, diacide...) ; une fonction <strong>mixte</strong> associe deux groupes différents (comme un acide aminé, qui porte à la fois $-COOH$ et $-NH_2$). Dans les deux cas, on applique la même logique : identifier toutes les fonctions, choisir la prioritaire pour le suffixe, citer les autres en préfixe avec leur indice.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Chaque fonction possède un couple (suffixe si prioritaire / préfixe sinon) : -ol/hydroxy-, -amine/amino-, -al ou -one/oxo-, -oïque/carboxy-, -nitrile/cyano-</li>
        <li>La classe d'une amine (I/II/III) dépend des substituants sur l'AZOTE, contrairement aux alcools où c'est le carbone qui compte</li>
        <li>Un ester se nomme en deux mots : alcanoate (partie acide) + nom du groupe alkyle (partie alcool)</li>
        <li>La table de priorité des fonctions décide seule quelle fonction reçoit le suffixe dans un composé polyfonctionnel</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Nommer une amine secondaire ou tertiaire comme si sa classe dépendait du carbone porteur (c'est l'azote qui compte)</li>
        <li>Oublier le mot « acide » devant le nom d'un acide carboxylique, ou « anhydride »/« chlorure de » devant leurs dérivés</li>
        <li>Mélanger les deux nomenclatures de l'éther-oxyde (alcoxyalcane vs « oxyde de... ») dans un même nom</li>
        <li>Donner le suffixe à une fonction secondaire au lieu de la fonction réellement prioritaire de la table</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">$CH_3-CH_2-NH-CH_3$ est une amine :</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc2e1" value="wrong"> primaire</label>
          <label class="option"><input type="radio" name="desc2e1" value="right"> secondaire</label>
          <label class="option"><input type="radio" name="desc2e1" value="wrong"> tertiaire</label>
          <label class="option"><input type="radio" name="desc2e1" value="wrong"> quaternaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc2e1','desc2fb1','Correct — l\\'azote porte deux groupes carbonés (éthyle et méthyle) : c\\'est une amine secondaire, nommée N-méthyléthanamine.','Compte le nombre de groupes CARBONÉS directement liés à l\\'azote, pas au carbone.')">Vérifier</button>
        <div class="feedback" id="desc2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un composé portant à la fois un acide carboxylique et un alcool, le suffixe du nom revient :</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc2e2" value="wrong"> à l'alcool (-ol)</label>
          <label class="option"><input type="radio" name="desc2e2" value="right"> à l'acide carboxylique (-oïque)</label>
          <label class="option"><input type="radio" name="desc2e2" value="wrong"> aux deux en même temps</label>
          <label class="option"><input type="radio" name="desc2e2" value="wrong"> à aucun des deux</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc2e2','desc2fb2','Correct — l\\'acide carboxylique est tout en haut de la table de priorité : il donne toujours le suffixe -oïque ; l\\'alcool devient un préfixe hydroxy-.','Consulte la table de priorité : l\\'acide carboxylique est la toute première fonction citée.')">Vérifier</button>
        <div class="feedback" id="desc2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">$CH_3-COO-C_2H_5$ se nomme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc2e3" value="wrong"> acide propanoïque</label>
          <label class="option"><input type="radio" name="desc2e3" value="wrong"> propanoate de méthyle</label>
          <label class="option"><input type="radio" name="desc2e3" value="right"> éthanoate d'éthyle</label>
          <label class="option"><input type="radio" name="desc2e3" value="wrong"> chlorure d'éthanoyle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc2e3','desc2fb3','Correct — la partie acide (CH3-COO-, 2 carbones) donne éthanoate, la partie alcool (-C2H5) donne éthyle : éthanoate d\\'éthyle.','Repère d\\'abord la partie qui vient de l\\'acide (elle inclut le C=O), puis celle qui vient de l\\'alcool.')">Vérifier</button>
        <div class="feedback" id="desc2fb3"></div>
      </div>
    </div>
  `
};

DESC_NOVA_KB[descKey('Nomenclature des fonctions organiques : halogénés, alcools, éthers, amines, carbonylés, acides et dérivés')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Nomenclature des fonctions organiques ». Demande-moi comment classer une amine, comment nommer un ester, ou un indice sur un exercice.",
  rules: [
    { test:/amine.*(primaire|secondaire|tertiaire)|classe.*amine/i, replies:["La classe d'une amine dépend du nombre de groupes CARBONÉS liés à l'AZOTE : 1 = primaire, 2 = secondaire, 3 = tertiaire. C'est différent des alcools, où c'est la classe du carbone porteur du OH qui compte."] },
    { test:/priorit[ée].*fonction|table.*priorit[ée]|suffixe.*pr[ée]fixe/i, replies:["Ordre décroissant : acide carboxylique > anhydride > ester/chlorure d'acide > amide > nitrile > aldéhyde > cétone > alcool > amine > éther > alcène > alcyne > alcane. La plus haute donne le suffixe, les autres deviennent des préfixes."] },
    { test:/ester/i, replies:["Un ester se nomme en deux mots : l'alcanoate (dérivé de l'acide, avec le C=O) suivi du nom du groupe alkyle (dérivé de l'alcool). Ex. CH3-COO-C2H5 = éthanoate d'éthyle."] },
    { test:/anhydride/i, replies:["Un anhydride dérive de la déshydratation de deux fonctions acide : R-COOH + R'-COOH → R-CO-O-CO-R' + H2O. On le nomme « anhydride » + nom de l'acide (ou des deux acides s'ils sont différents)."] },
    { test:/[ée]ther|alcoxyalcane|oxyde d.[ée]thyle/i, replies:["Deux nomenclatures pour R-O-R' : soit alcoxyalcane (le groupe RO- devient un préfixe alcoxy-/alkyloxy-), soit « oxyde de... et de... » avec les deux groupes alkyles cités par ordre alphabétique."] },
    { test:/hydroxy|amino|oxo|carboxy|cyano/i, replies:["Ce sont les préfixes utilisés quand la fonction n'est PAS prioritaire : hydroxy- (alcool), amino- (amine), oxo- (aldéhyde/cétone), carboxy- (acide sur une ramification), cyano- (nitrile)."] },
    { test:/aldéhyde|cétone|-al\b|-one\b/i, replies:["Aldéhyde R-CHO → suffixe -al (ou carbaldéhyde sur un cycle). Cétone R-CO-R' → suffixe -one. Non prioritaires, ces deux fonctions passent en préfixe oxo-."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : regarde combien de groupes carbonés sont attachés à l'azote (N), pas au carbone.","Indice niveau 2 : il y en a deux, éthyle et méthyle.","Indice niveau 3 : deux substituants sur N = amine secondaire."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde la table de priorité des fonctions.","Indice niveau 2 : l'acide carboxylique est tout en haut de cette table.","Indice niveau 3 : c'est donc lui qui donne le suffixe -oïque."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : découpe la molécule de part et d'autre de l'oxygène de l'ester.","Indice niveau 2 : CH3-COO- (2 carbones, avec le C=O) vient de l'acide ; -C2H5 vient de l'alcool.","Indice niveau 3 : éthanoate (acide) + éthyle (alcool) = éthanoate d'éthyle."] }
  ]
};

/* =========================== CHAPITRE 3 — Isomérie et stéréoisomérie =========================== */
DESC_CHAPTERS[descKey('Isomérie et stéréoisomérie')] = {
  objectives: [
    "Calculer l'indice d'insaturation d'une molécule à partir de sa formule brute",
    "Distinguer isomérie de constitution (chaîne, position, fonction) et stéréoisomérie",
    "Attribuer la configuration Z/E d'un alcène et R/S d'un centre asymétrique par la règle de Cahn-Ingold-Prelog",
    "Représenter et interconvertir les projections de Cram, Newman et Fischer d'une molécule",
    "Reconnaître énantiomères, diastéréoisomères et composés méso (nomenclature érythro/thréo)"
  ],
  prereqs: ["Nomenclature des fonctions organiques : halogénés, alcools, éthers, amines, carbonylés, acides et dérivés"],
  bodyHtml: `
    <p>Deux molécules qui partagent la <strong>même formule brute</strong> mais des structures différentes sont des <strong>isomères</strong>. On distingue l'<strong>isomérie plane</strong> (ou de constitution), où les atomes ne sont pas liés de la même façon, et la <strong>stéréoisomérie</strong>, où l'enchaînement des atomes est identique mais leur disposition dans l'espace diffère.</p>

    <h3>1. Indice (ou degré) d'insaturation</h3>
    <p>Pour un hydrocarbure $C_nH_p$, l'indice d'insaturation $i$ (nombre total de liaisons $\\pi$ + cycles) vaut : $$i = 1 + \\dfrac{2n-p}{2}$$ Une molécule hétéroatomée $C_nH_pO_zX_xN_q$ (avec X = halogène) a le même indice que l'hydrocarbure $C_nH_p$ correspondant : l'oxygène divalent ne change rien au calcul, un azote trivalent équivaut à ajouter un hydrogène « virtuel », un halogène monovalent comme un hydrogène.</p>
    <div class="example-box">
      <span class="eyebrow">Exemples corrigés</span>
      <p><strong>$C_4H_6$</strong> : $i = 1 + \\dfrac{2\\times4-6}{2} = 2$ → deux insaturations (ex. buta-1,3-diène, deux doubles liaisons).</p>
      <p><strong>$C_8H_8O_2$</strong> : $i = 1 + \\dfrac{2\\times8-8}{2} = 5$ → cinq insaturations (ex. le benzoate de méthyle : 1 cycle aromatique + 3 doubles liaisons formelles du cycle + 1 C=O de l'ester).</p>
    </div>

    <h3>2. Isomérie structurale (de constitution)</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Ce qui diffère</th><th>Exemple</th></tr>
      <tr><td>De chaîne (squelette)</td><td>les ramifications</td><td>3-méthylbutan-2-one / pentan-2-one</td></tr>
      <tr><td>De position</td><td>la position d'un groupe/atome sur une chaîne identique</td><td>pentan-2-one / pentan-3-one</td></tr>
      <tr><td>De fonction</td><td>la nature même de la fonction</td><td>pentan-2-one / pentanal / pent-4-èn-1-ol ($C_5H_{10}O$)</td></tr>
    </table>
    <p>Un cas particulier important d'isomérie de fonction est la <strong>tautomérie</strong> : deux isomères en équilibre rapide, comme la <strong>tautomérie céto-énolique</strong>, où un hydrogène migre entre un carbone $\\alpha$ et l'oxygène d'un carbonyle : $$CH_3-CHO \\rightleftharpoons CH_2=CH-OH$$</p>

    <h3>3. Stéréoisomérie de configuration : isomérie géométrique Z/E</h3>
    <p>Une double liaison (ou un cycle) bloque la rotation : deux substituants différents sur chaque carbone de la double liaison ($R_1 \\ne R_2$ et $R_3 \\ne R_4$) donnent naissance à deux isomères géométriques distincts et non interconvertibles à température ordinaire.</p>
    <p>La <strong>règle séquentielle de Cahn, Ingold et Prelog (CIP)</strong> permet de trancher sans ambiguïté : sur chaque carbone de la double liaison, on classe les deux substituants par numéro atomique croissant de l'atome directement lié ; en cas d'égalité, on compare le « rang supérieur » (atomes liés à cet atome), et une liaison multiple compte comme deux (ou trois) liaisons simples vers un atome « fantôme » dupliqué.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 100" width="100%">
          <line x1="70" y1="50" x2="100" y2="50" stroke="#EAF0FB" stroke-width="2"/>
          <line x1="70" y1="48" x2="100" y2="48" stroke="#EAF0FB" stroke-width="2"/>
          <line x1="70" y1="50" x2="45" y2="30" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="70" y1="50" x2="45" y2="70" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="100" y1="50" x2="125" y2="30" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="100" y1="50" x2="125" y2="70" stroke="#EAF0FB" stroke-width="1.6"/>
          <text x="18" y="34" font-family="IBM Plex Mono" font-size="10" fill="#F0B94D">COOH (1)</text>
          <text x="18" y="78" font-family="IBM Plex Mono" font-size="10" fill="#5A6472">CH3 (2)</text>
          <text x="130" y="34" font-family="IBM Plex Mono" font-size="10" fill="#5A6472">CH3 (2)</text>
          <text x="130" y="78" font-family="IBM Plex Mono" font-size="10" fill="#F0B94D">C2H5 (1)</text>
          <text x="82" y="90" font-family="IBM Plex Mono" font-size="10" fill="#2DD4C4">configuration E (trans)</text>
        </svg>
        <span>Les deux groupes prioritaires (1) sont de part et d'autre de la double liaison → E ; du même côté → Z</span>
      </div>
    </div>
    <p><strong>Z</strong> (Zusammen, « ensemble ») : les deux substituants prioritaires sont du même côté (souvent assimilé à « cis »). <strong>E</strong> (Entgegen, « à l'opposé ») : ils sont de part et d'autre (souvent assimilé à « trans »). Sur un cycle, on parle plutôt de <strong>cis</strong>/<strong>trans</strong> directement.</p>

    <h3>4. Isomérie optique : chiralité et énantiomérie</h3>
    <p>Un objet est <strong>chiral</strong> s'il n'est pas superposable à son image dans un miroir (comme une main). Une molécule chirale possède au moins deux formes stéréoisomères, images l'une de l'autre, non superposables : les <strong>énantiomères</strong>. La chiralité est le plus souvent liée à la présence d'un <strong>carbone asymétrique</strong> (noté $C^*$), lié à quatre substituants tous différents — mais ce n'est qu'une condition suffisante, pas nécessaire.</p>
    <p>Les énantiomères sont <strong>optiquement actifs</strong> : ils dévient le plan de la lumière polarisée d'un angle $\\alpha$ (loi de Biot, $[\\alpha]_\\lambda^{25} = \\alpha/(l\\times c)$), l'un vers la droite (<strong>dextrogyre</strong>, +), l'autre vers la gauche (<strong>lévogyre</strong>, −), avec la même valeur absolue. Un mélange équimolaire des deux (<strong>mélange racémique</strong>) est optiquement inactif par compensation.</p>

    <h3>5. Nomenclature R/S d'un centre asymétrique</h3>
    <p>Même méthode CIP que pour Z/E, appliquée aux 4 substituants d'un $C^*$ :</p>
    <ol>
      <li>Classer les 4 substituants par numéro atomique décroissant de l'atome directement lié ($a > b > c > d$).</li>
      <li>Placer le substituant le moins prioritaire ($d$) à l'arrière (loin de l'observateur).</li>
      <li>Regarder le sens $a \\to b \\to c$ : sens horaire = <strong>R</strong> (rectus) ; sens antihoraire = <strong>S</strong> (sinister).</li>
    </ol>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> attribuer la configuration du glycéraldéhyde $CHO-C^*H(OH)-CH_2OH$.</p>
      <p><strong>Solution :</strong> substituants du $C^*$ : $-OH$, $-CHO$, $-CH_2OH$, $-H$. Classement CIP : $-OH$ (O, Z=8) $>$ $-CHO$ (C lié à O,O,H via liaison double dédoublée) $>$ $-CH_2OH$ (C lié à O,H,H) $>$ $-H$. En plaçant H à l'arrière, si OH→CHO→CH2OH tourne dans le sens horaire, la configuration est R.</p>
      <p class="example-answer">Réponse : (R)-glycéraldéhyde (l'énantiomère (S) existe également).</p>
    </div>

    <h3>6. Représentations spatiales : Cram, Newman, Fischer</h3>
    <table class="mini-table">
      <tr><th>Projection</th><th>Principe</th></tr>
      <tr><td>Cram</td><td>traits pleins dans le plan, coin plein vers l'avant, pointillés vers l'arrière</td></tr>
      <tr><td>Newman</td><td>vue le long d'une liaison C–C : cercle = atome arrière, centre = atome avant ; distingue conformations éclipsée et décalée</td></tr>
      <tr><td>Fischer</td><td>liaisons horizontales vers l'avant, verticales vers l'arrière ; la chaîne principale est verticale, le carbone le plus oxydé en haut</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Règles de manipulation de la projection de Fischer</span>
      Une rotation de <strong>180°</strong> dans le plan ne change PAS la configuration (elle équivaut à une double permutation). Une rotation de <strong>90°</strong> INVERSE la configuration. Plus généralement : un nombre <strong>pair</strong> de permutations entre deux substituants conserve la configuration, un nombre <strong>impair</strong> l'inverse.
    </div>

    <h3>7. Composés à plusieurs centres asymétriques</h3>
    <p>Pour $n$ centres asymétriques non identiquement substitués, il existe $2^n$ stéréoisomères, répartis en $2^{n-1}$ couples d'énantiomères. Les stéréoisomères qui ne sont ni identiques ni énantiomères sont des <strong>diastéréoisomères</strong>. Quand des centres sont identiquement substitués (cas de l'acide tartrique $COOH-CHOH-CHOH-COOH$), le nombre de stéréoisomères diminue : un couple d'énantiomères « fusionne » en un unique stéréoisomère <strong>méso</strong>, achiral (il possède un plan de symétrie) et optiquement inactif.</p>
    <p>La nomenclature <strong>érythro/thréo</strong> décrit deux centres asymétriques adjacents de type $C_{abc}-C_{abc'}$ : la forme <strong>érythro</strong> (souvent la forme méso) présente le maximum de groupes analogues en vis-à-vis dans sa conformation éclipsée ; l'autre couple est dit <strong>thréo</strong>.</p>
    <p>Une molécule comportant $n$ carbones asymétriques ET $m$ doubles liaisons à isomérie Z/E possède $2^{n+m}$ stéréoisomères, répartis en $2^{n+m-1}$ couples d'énantiomères — deux énantiomères ont toujours la même configuration Z ou E.</p>

    <h3>8. Isomérie de conformation</h3>
    <p>Contrairement aux stéréoisomères de configuration, les <strong>conformères</strong> s'interconvertissent librement par simple rotation autour d'une liaison simple C–C, sans rupture de liaison (agitation thermique suffisante à température ordinaire) : ils ne sont donc jamais séparables. Pour l'éthane, la conformation <strong>décalée</strong> (staggered) est la plus stable (répulsions électroniques minimales entre liaisons C–H voisines) ; la conformation <strong>éclipsée</strong> est la moins stable. Pour le butane, la conformation <strong>anti</strong> ($\\theta=180°$) est la plus stable de toutes, suivie des deux conformations décalées <strong>gauches</strong> ($\\theta=60°$ et $300°$), puis des conformations éclipsées, la moins stable étant la conformation <strong>syn</strong> ($\\theta=0°$).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>i = 1 + (2n−p)/2 donne le nombre total de cycles + liaisons π d'une molécule $C_nH_p$ (les hétéroatomes ne changent rien au calcul)</li>
        <li>Isomérie de constitution (chaîne/position/fonction) vs stéréoisomérie (Z/E, R/S, conformation) : les atomes liés sont les mêmes, seule leur disposition change en stéréoisomérie</li>
        <li>La règle CIP classe les substituants par numéro atomique ; elle sert à la fois pour Z/E et pour R/S</li>
        <li>En projection de Fischer : rotation de 180° = même configuration, rotation de 90° = configuration inversée</li>
        <li>Un composé méso est achiral malgré la présence de carbones asymétriques, grâce à un plan de symétrie interne</li>
        <li>Les conformères s'interconvertissent librement (rotation autour d'une liaison simple) ; les stéréoisomères de configuration nécessitent une rupture de liaison pour s'interconvertir</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre Z/cis et E/trans systématiquement : ce n'est vrai que lorsque les groupes prioritaires coïncident avec les groupes « visuellement » identiques</li>
        <li>Oublier de placer le substituant le moins prioritaire à l'ARRIÈRE avant de lire le sens R/S</li>
        <li>Croire qu'une molécule sans carbone asymétrique est forcément achirale (la chiralité peut exister sans C* dans certains cas particuliers)</li>
        <li>Traiter conformères et stéréoisomères de configuration de la même façon : seuls les premiers s'interconvertissent sans casser de liaison</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — indice d'insaturation</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre le nombre de carbones (n) et d'hydrogènes équivalents (p, après avoir remplacé les hétéroatomes par leur équivalent hydrocarboné) d'une formule brute pour obtenir i.</p>
      <div class="sim-controls">
        <label>n (carbones) : <input type="number" id="descInsN" value="4" style="width:56px;" oninput="updateDescInsaturation()"></label>
        <label>p (hydrogènes équivalents) : <input type="number" id="descInsP" value="6" style="width:56px;" oninput="updateDescInsaturation()"></label>
        <div class="sim-readout" id="descInsReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'indice d'insaturation de $C_6H_{12}$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc3e1" value="wrong"> 0</label>
          <label class="option"><input type="radio" name="desc3e1" value="right"> 1</label>
          <label class="option"><input type="radio" name="desc3e1" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="desc3e1" value="wrong"> 3</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc3e1','desc3fb1','Correct — i = 1 + (12−12)/2 = 1 : un cycle ou une double liaison (cyclohexane ou hexène, par exemple).','Applique i = 1 + (2n−p)/2 avec n=6, p=12.')">Vérifier</button>
        <div class="feedback" id="desc3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Deux énantiomères d'une même molécule ont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc3e2" value="wrong"> des propriétés physiques totalement différentes</label>
          <label class="option"><input type="radio" name="desc3e2" value="right"> le même pouvoir rotatoire en valeur absolue, mais de signe opposé</label>
          <label class="option"><input type="radio" name="desc3e2" value="wrong"> des formules brutes différentes</label>
          <label class="option"><input type="radio" name="desc3e2" value="wrong"> toujours la même configuration R ou S</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc3e2','desc3fb2','Correct — deux énantiomères ont des propriétés physiques identiques (sauf face à la lumière polarisée ou à un autre milieu chiral) et un pouvoir rotatoire opposé en signe, égal en valeur absolue.','Pense à la loi de Biot : le signe de [α] change, mais pas sa valeur absolue.')">Vérifier</button>
        <div class="feedback" id="desc3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une rotation de 90° d'une projection de Fischer, dans le plan de la figure :</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc3e3" value="wrong"> ne change rien à la configuration</label>
          <label class="option"><input type="radio" name="desc3e3" value="right"> inverse la configuration</label>
          <label class="option"><input type="radio" name="desc3e3" value="wrong"> transforme la molécule en son propre diastéréoisomère</label>
          <label class="option"><input type="radio" name="desc3e3" value="wrong"> n'est jamais autorisée</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc3e3','desc3fb3','Correct — seule une rotation de 180° conserve la configuration ; 90° l\\'inverse (équivalent à un nombre impair de permutations).','Retiens le contraste : 180° conserve, 90° inverse.')">Vérifier</button>
        <div class="feedback" id="desc3fb3"></div>
      </div>
    </div>
  `,
  init: initDescInsaturation
};

DESC_NOVA_KB[descKey('Isomérie et stéréoisomérie')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Isomérie et stéréoisomérie ». Demande-moi comment calculer un indice d'insaturation, attribuer R/S, ou un indice sur un exercice.",
  rules: [
    { test:/indice d.insaturation|degr[ée] d.insaturation/i, replies:["i = 1 + (2n−p)/2 pour une molécule CnHp (ou son équivalent hydrocarboné si elle a des hétéroatomes). Chaque cycle ou double liaison compte pour 1, une triple liaison pour 2."] },
    { test:/[ée]nantiom[èe]re/i, replies:["Deux énantiomères sont des stéréoisomères, images l'un de l'autre dans un miroir, non superposables. Ils ont les mêmes propriétés physiques sauf face à la lumière polarisée (pouvoir rotatoire opposé)."] },
    { test:/diast[ée]r[ée]oisom[èe]re/i, replies:["Deux diastéréoisomères sont des stéréoisomères qui ne sont PAS images l'un de l'autre dans un miroir. Contrairement aux énantiomères, ils ont des propriétés physiques différentes (points de fusion, solubilité...)."] },
    { test:/m[ée]so/i, replies:["Un composé méso possède des carbones asymétriques mais un PLAN DE SYMÉTRIE interne : il est donc achiral et optiquement inactif, malgré la présence de C*."] },
    { test:/r.s|cahn.*ingold|cip|configuration absolue/i, replies:["Règle CIP : classe les 4 substituants par numéro atomique décroissant, place le moins prioritaire à l'arrière, regarde le sens de rotation des 3 autres du plus au moins prioritaire : horaire = R, antihoraire = S."] },
    { test:/z.*e\b|cis.*trans|g[ée]om[ée]trique/i, replies:["Pour Z/E : classe les 2 substituants de chaque carbone de la double liaison par CIP. Si les deux prioritaires sont du même côté → Z (zusammen). S'ils sont opposés → E (entgegen)."] },
    { test:/fischer/i, replies:["En projection de Fischer, les liaisons HORIZONTALES pointent vers l'avant, les VERTICALES vers l'arrière. Rotation de 180° = configuration inchangée ; rotation de 90° = configuration inversée."] },
    { test:/newman/i, replies:["La projection de Newman regarde une molécule le long d'une liaison C-C : le cercle représente l'atome arrière, le point central l'atome avant. Elle distingue les conformations éclipsée et décalée."] },
    { test:/conform[eè]re|conformation/i, replies:["Les conformères s'obtiennent par simple rotation autour d'une liaison simple, SANS rompre de liaison — ils sont donc inséparables et en interconversion permanente à température ordinaire, contrairement aux stéréoisomères de configuration."] },
    { test:/[ée]rythro|thr[ée]o/i, replies:["Pour deux carbones asymétriques adjacents Cabc-Cabc' : la forme érythro présente le max de groupes identiques en vis-à-vis en conformation éclipsée (souvent la forme méso) ; l'autre couple est thréo."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique directement i = 1 + (2n−p)/2.","Indice niveau 2 : n=6, p=12.","Indice niveau 3 : i = 1 + (12−12)/2 = 1."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la loi de Biot et au signe de l'angle α.","Indice niveau 2 : la valeur absolue est identique.","Indice niveau 3 : seul le signe change entre les deux énantiomères."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare avec la rotation de 180°, qui elle conserve la configuration.","Indice niveau 2 : 90° correspond à un nombre impair de permutations.","Indice niveau 3 : donc la configuration est inversée."] }
  ]
};

/* =========================== CHAPITRE 4 — Effets électroniques dans la molécule =========================== */
DESC_CHAPTERS[descKey('Effets électroniques dans la molécule : effet inductif et effet mésomère')] = {
  objectives: [
    "Différencier effet inductif (+I/−I) et effet mésomère (+M/−M) et reconnaître les groupements caractéristiques de chacun",
    "Prévoir l'influence de ces effets sur l'acidité d'un acide carboxylique substitué ou d'un phénol substitué",
    "Écrire les formes mésomères (structures de résonance) d'une molécule conjuguée et identifier l'hybride de résonance",
    "Relier la stabilité d'un intermédiaire réactionnel (carbocation, carbanion) aux effets électroniques de ses substituants"
  ],
  prereqs: ["Isomérie et stéréoisomérie"],
  bodyHtml: `
    <p>Une molécule n'est jamais un assemblage neutre et inerte d'atomes : la répartition de ses électrons est inégale, ce qui détermine directement sa réactivité. On distingue deux effets électroniques : l'<strong>effet inductif</strong>, lié à la polarisation d'une liaison $\\sigma$, et l'<strong>effet mésomère</strong>, lié à la délocalisation d'électrons $\\pi$ ou de doublets non liants. Lorsqu'ils coexistent et s'opposent, <strong>l'effet mésomère l'emporte toujours</strong> sur l'effet inductif.</p>

    <h3>1. Effet inductif (I)</h3>
    <p>Quand une liaison covalente $A-B$ unit deux atomes d'électronégativité différente, elle se polarise : le doublet se déplace vers l'atome le plus électronégatif ($A^{\\delta-}-B^{\\delta+}$). Ce déplacement se propage <strong>de proche en proche le long des liaisons $\\sigma$</strong>, mais s'atténue rapidement — il devient négligeable au-delà de 3 à 4 liaisons.</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Effet sur la chaîne</th><th>Groupements typiques</th></tr>
      <tr><td>$-I$ (attracteur)</td><td>appauvrit en électrons</td><td>$F, Cl, Br, I, -OH, -NH_2, -CN, -NO_2$, métaux à charge +</td></tr>
      <tr><td>$+I$ (donneur)</td><td>enrichit en électrons</td><td>métaux ($Na, Mg...$), groupes alkyles ($-CH_3, -C_2H_5, -C(CH_3)_3$)</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Effet inductif et acidité des acides carboxyliques (pKa)</span>
      <p><strong>Effet +I (donneur), R-COOH :</strong> H- (3,75) &lt; CH₃- (4,76) &lt; CH₃CH₂CH₂- (4,86) — un groupe alkyle donneur stabilise moins la base conjuguée $R-COO^-$ : l'acidité DIMINUE quand le pKa augmente.</p>
      <p><strong>Effet −I (attracteur), Y-CH₂-COOH :</strong> H- (3,17) &gt; Br- (2,90) &gt; Cl- (2,87) &gt; F- (2,59) &gt; NO₂- (1,68) — un groupe attracteur stabilise la charge négative de $R-COO^-$ : l'acidité AUGMENTE quand le pKa diminue.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Plus un groupement est électronégatif (ou porte une charge +), plus son effet −I est fort ; l'effet inductif d'un groupe alkyle donneur (+I) croît, lui, avec son degré de ramification : $(CH_3)_3C- > (CH_3)_2CH- > CH_3CH_2- > CH_3-$.
    </div>

    <h3>2. Effet mésomère (M)</h3>
    <p>L'effet mésomère correspond à la <strong>délocalisation</strong> d'électrons $\\pi$ (liaison multiple) ou $n$ (doublet non liant) sur un système conjugué (alternance de liaisons simples et multiples). Contrairement à l'effet inductif, il ne s'atténue pas le long du système conjugué.</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Origine</th><th>Groupements typiques</th></tr>
      <tr><td>$+M$ (donneur)</td><td>doublet non liant conjugué au système $\\pi$</td><td>$-NH_2, -OH, -OR$, halogènes, $-O^-$</td></tr>
      <tr><td>$-M$ (attracteur)</td><td>liaison multiple polarisée conjuguée</td><td>$-NO_2, -SO_2R, -CHO, -COR, -COOH, -CONHR, -CN$</td></tr>
    </table>
    <p>Une molécule conjuguée n'est correctement décrite que par <strong>plusieurs structures de Lewis</strong> (formes mésomères ou de résonance), qui ne diffèrent que par la position des électrons $\\pi$ ou $n$. La molécule réelle — l'<strong>hybride de résonance</strong> — est une combinaison de toutes ces formes limites, imaginaires prises séparément mais dont la moyenne pondérée est bien réelle.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 90" width="100%">
          <text x="6" y="45" font-family="IBM Plex Mono" font-size="12" fill="#EAF0FB">CH₃—N⁺</text>
          <text x="76" y="30" font-family="IBM Plex Mono" font-size="12" fill="#FF6B6F">O</text>
          <text x="76" y="60" font-family="IBM Plex Mono" font-size="12" fill="#F0B94D">O⁻</text>
          <text x="98" y="46" font-family="IBM Plex Mono" font-size="16" fill="#EAF0FB">↔</text>
          <text x="112" y="45" font-family="IBM Plex Mono" font-size="12" fill="#EAF0FB">CH₃—N⁺</text>
          <text x="182" y="30" font-family="IBM Plex Mono" font-size="12" fill="#F0B94D">O⁻</text>
          <text x="182" y="60" font-family="IBM Plex Mono" font-size="12" fill="#FF6B6F">O</text>
        </svg>
        <span>Les deux formes mésomères du nitrométhane sont équivalentes : dans l'hybride réel, chaque oxygène porte une charge −0,5 et une liaison d'ordre 1,5</span>
      </div>
    </div>
    <p><strong>Résonance et stabilisation :</strong> plus une molécule admet de formes mésomères, plus elle est stabilisée par la délocalisation (énergie de résonance). Exemple emblématique : la chaleur d'hydrogénation mesurée du benzène (−208 kJ/mol) est bien inférieure à celle attendue pour un « cyclohexatriène » hypothétique non délocalisé (−360 kJ/mol) — l'écart, environ <strong>−152 kJ/mol</strong>, est l'énergie de résonance du cycle aromatique.</p>

    <h3>3. Effet mésomère et acidité du phénol</h3>
    <p>Sur un phénol substitué en para, un groupe <strong>+M</strong> (donneur, ex. $-NH_2$, $-OMe$) enrichit le cycle et la liaison $O-H$ en électrons : celle-ci devient plus difficile à rompre, l'acidité <strong>diminue</strong> (pKa augmente). Un groupe <strong>−M</strong> (attracteur, ex. $-NO_2$, $-CN$, $-COCH_3$) appauvrit au contraire la liaison $O-H$, qui se rompt plus facilement : l'acidité <strong>augmente</strong> (pKa diminue).</p>
    <table class="mini-table">
      <tr><th>Substituant R (para)</th><th>$NH_2$</th><th>$OMe$</th><th>$CH_3$</th><th>$H$</th><th>$COCH_3$</th><th>$CN$</th><th>$NO_2$</th></tr>
      <tr><td>pKa du phénol</td><td>11,28</td><td>10,86</td><td>10,25</td><td>9,89</td><td>8,79</td><td>8,56</td><td>8,24</td></tr>
      <tr><td>Effet dominant</td><td>+M</td><td>+M</td><td>+I</td><td>—</td><td>−M</td><td>−M</td><td>−M</td></tr>
    </table>

    <h3>4. Stabilité des carbocations et des carbanions</h3>
    <p>Un <strong>carbocation</strong> ($sp^2$, orbitale $p$ vacante) est stabilisé par tout ce qui compense son déficit électronique : les groupes <strong>donneurs</strong> ($+I$, $+M$) — d'où l'ordre de stabilité tertiaire $>$ secondaire $>$ primaire $>$ méthyle, et une stabilisation supplémentaire par conjugaison (carbocation allylique ou benzylique). À l'inverse, un <strong>carbanion</strong> ($sp^3$, doublet non liant) est stabilisé par les groupes <strong>attracteurs</strong> ($-I$, $-M$), et déstabilisé par les donneurs — c'est l'ordre exactement opposé.</p>

    <div class="key-point">
      <span class="eyebrow">Comparaison inductif / mésomère</span>
      L'effet inductif est <strong>toujours présent</strong> mais s'atténue vite avec la distance ; l'effet mésomère nécessite un <strong>système conjugué</strong> mais, quand il existe, il domine largement l'effet inductif. C'est ce qui explique le comportement apparemment contradictoire des halogènes sur un cycle aromatique : désactivants par −I (moins réactif que le benzène), mais orienteurs ortho/para par +M (grâce au doublet non liant qu'ils peuvent céder en délocalisation).
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Effet inductif : polarisation d'une liaison σ, se propage de proche en proche, s'atténue avec la distance (négligeable au-delà de 3-4 liaisons)</li>
        <li>Effet mésomère : délocalisation d'électrons π/n sur un système conjugué, ne s'atténue pas avec la distance dans ce système</li>
        <li>−I et −M augmentent l'acidité d'un acide carboxylique ou d'un phénol substitué ; +I et +M la diminuent</li>
        <li>Carbocation stabilisé par des donneurs (+I/+M) ; carbanion stabilisé par des attracteurs (−I/−M) — c'est l'inverse !</li>
        <li>À effets opposés, l'effet mésomère l'emporte toujours quand il peut s'exercer</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que l'effet inductif d'un halogène disparaît totalement au-delà de 2-3 liaisons : il s'atténue mais reste toujours non nul</li>
        <li>Appliquer aux carbanions les mêmes règles de stabilité qu'aux carbocations (c'est l'inverse : attracteurs stabilisent le carbanion)</li>
        <li>Oublier qu'un halogène est à la fois −I (désactivant) et +M (orienteur ortho/para) sur un cycle aromatique — les deux effets coexistent, ils ne s'annulent pas</li>
        <li>Confondre « plus de formes mésomères » avec « molécule instable » : c'est l'inverse, plus il y a de formes de résonance, plus la molécule est stabilisée</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Parmi ces acides, lequel est le plus fort (pKa le plus bas) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc4e1" value="wrong"> CH₃-COOH</label>
          <label class="option"><input type="radio" name="desc4e1" value="wrong"> CH₃CH₂CH₂-COOH</label>
          <label class="option"><input type="radio" name="desc4e1" value="right"> NO₂-CH₂-COOH</label>
          <label class="option"><input type="radio" name="desc4e1" value="wrong"> Br-CH₂CH₂CH₂-COOH</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc4e1','desc4fb1','Correct — le groupe NO2, fortement attracteur (−I et −M) et directement en alpha du COOH, stabilise fortement la base conjuguée : c\\'est l\\'acide le plus fort de la liste.','Cherche le groupe le plus attracteur (−I/−M), placé le plus près possible du COOH.')">Vérifier</button>
        <div class="feedback" id="desc4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un carbanion est stabilisé par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc4e2" value="wrong"> des groupes donneurs (+I, +M)</label>
          <label class="option"><input type="radio" name="desc4e2" value="right"> des groupes attracteurs (−I, −M)</label>
          <label class="option"><input type="radio" name="desc4e2" value="wrong"> l'absence totale de substituant</label>
          <label class="option"><input type="radio" name="desc4e2" value="wrong"> uniquement par des halogènes</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc4e2','desc4fb2','Correct — un carbanion porte un excès d\\'électrons : les groupes attracteurs (−I, −M) diminuent cette charge négative et le stabilisent, contrairement au carbocation.','C\\'est l\\'inverse du carbocation : ici la molécule a TROP d\\'électrons, il faut les retirer pour stabiliser.')">Vérifier</button>
        <div class="feedback" id="desc4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Sur un phénol, un groupe -NH₂ en position para :</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc4e3" value="wrong"> augmente l'acidité (effet −M)</label>
          <label class="option"><input type="radio" name="desc4e3" value="right"> diminue l'acidité (effet +M)</label>
          <label class="option"><input type="radio" name="desc4e3" value="wrong"> n'a aucun effet</label>
          <label class="option"><input type="radio" name="desc4e3" value="wrong"> agit uniquement par effet inductif</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc4e3','desc4fb3','Correct — le doublet non liant de l\\'azote se conjugue avec le cycle (effet +M), enrichit la liaison O-H en électrons et diminue donc l\\'acidité du phénol (pKa = 11,28, le plus élevé du tableau).','NH2 possède un doublet libre qui peut se conjuguer avec le cycle aromatique : quel type d\\'effet cela donne-t-il ?')">Vérifier</button>
        <div class="feedback" id="desc4fb3"></div>
      </div>
    </div>
  `
};

DESC_NOVA_KB[descKey('Effets électroniques dans la molécule : effet inductif et effet mésomère')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Effets électroniques : inductif et mésomère ». Demande-moi la différence entre les deux, leur effet sur l'acidité, ou un indice sur un exercice.",
  rules: [
    { test:/effet inducti|effet .i.\b/i, replies:["L'effet inductif (I) vient de la polarisation d'une liaison σ. Il se propage de proche en proche mais s'atténue vite (négligeable au-delà de 3-4 liaisons). −I appauvrit en électrons (halogènes, NO2...), +I enrichit (groupes alkyles)."] },
    { test:/effet m[ée]som[èe]re|effet .m.\b/i, replies:["L'effet mésomère (M) vient de la délocalisation d'électrons π ou de doublets non liants sur un système CONJUGUÉ. Il ne s'atténue pas avec la distance dans ce système. +M donne des électrons (NH2, OH, halogènes), −M en retire (C=O, NO2, CN...)."] },
    { test:/acidit[ée].*acide|acide.*carboxylique.*pka/i, replies:["Sur un acide carboxylique, un groupe −I proche du COOH stabilise la base conjuguée RCOO− : l'acidité augmente (pKa diminue). Un groupe +I fait l'inverse : l'acidité diminue (pKa augmente)."] },
    { test:/acidit[ée].*ph[ée]nol|ph[ée]nol.*pka/i, replies:["Sur un phénol substitué en para : +M (NH2, OMe) enrichit la liaison O-H, diminue l'acidité (pKa élevé). −M (NO2, CN, COCH3) l'appauvrit, augmente l'acidité (pKa bas)."] },
    { test:/carbocation/i, replies:["Un carbocation (sp2, orbitale p vide) est stabilisé par des groupes DONNEURS (+I, +M) : ordre tertiaire > secondaire > primaire > méthyle."] },
    { test:/carbanion/i, replies:["Un carbanion (sp3, doublet non liant) est stabilisé par des groupes ATTRACTEURS (−I, −M) — c'est exactement l'inverse du carbocation !"] },
    { test:/r[ée]sonance|forme m[ée]som[èe]re|hybride/i, replies:["Les formes mésomères ne sont que des représentations imaginaires ; la molécule réelle est l'hybride de résonance, une combinaison de toutes ces formes. Plus il y a de formes mésomères, plus la molécule est stabilisée (énergie de résonance)."] },
    { test:/halog[eè]ne.*aromatique|ortho.*para.*halog/i, replies:["Un halogène sur un cycle aromatique est −I (désactivant, moins réactif que le benzène) MAIS +M (orienteur ortho/para, via son doublet non liant délocalisable) : les deux effets coexistent sans s'annuler."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : cherche le groupe le plus attracteur, le plus proche du COOH.","Indice niveau 2 : NO2 est très fortement −I et −M.","Indice niveau 3 : NO2-CH2-COOH est donc l'acide le plus fort."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le carbanion a un excès d'électrons.","Indice niveau 2 : il faut des groupes qui retirent des électrons pour le stabiliser.","Indice niveau 3 : ce sont les groupes attracteurs (−I, −M)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : NH2 porte un doublet non liant sur l'azote.","Indice niveau 2 : ce doublet peut se conjuguer avec le cycle aromatique.","Indice niveau 3 : c'est donc un effet +M, qui diminue l'acidité."] }
  ]
};

/* =========================== CHAPITRE 5 — Mécanismes réactionnels =========================== */
DESC_CHAPTERS[descKey('Étude des mécanismes réactionnels : substitution, addition, élimination')] = {
  objectives: [
    "Différencier rupture homolytique et hétérolytique, et les intermédiaires réactionnels associés",
    "Décrire les mécanismes SN1 et SN2 et prévoir lequel domine selon le substrat, le solvant et le nucléophile",
    "Décrire l'addition électrophile sur un alcène (règle de Markovnikov) et l'addition radicalaire (effet Karasch)",
    "Décrire les mécanismes E1 et E2 et analyser la compétition entre substitution et élimination"
  ],
  prereqs: ["Effets électroniques dans la molécule : effet inductif et effet mésomère"],
  bodyHtml: `
    <p>Une réaction chimique correspond à la rupture de certaines liaisons (des réactifs) et à la formation de nouvelles liaisons (des produits). L'équation-bilan ne dit rien du <strong>comment</strong> : c'est le <strong>mécanisme réactionnel</strong> — l'ensemble des étapes élémentaires, avec leurs intermédiaires — qui répond à cette question.</p>

    <h3>1. Rupture de liaison et intermédiaires réactionnels</h3>
    <table class="mini-table">
      <tr><th>Type de rupture</th><th>Principe</th><th>Produit</th></tr>
      <tr><td>Hétérolytique</td><td>un seul atome récupère le doublet</td><td>deux ions (cation + anion)</td></tr>
      <tr><td>Homolytique</td><td>chaque atome repart avec un électron</td><td>deux radicaux libres</td></tr>
    </table>
    <p>Les trois grands intermédiaires réactionnels sont le <strong>carbocation</strong> (sp², orbitale p vacante, stabilisé par les donneurs +I/+M), le <strong>carbanion</strong> (sp³, doublet libre, stabilisé par les attracteurs −I/−M) et le <strong>radical libre</strong> (électron célibataire, formé par rupture homolytique, amorcée thermiquement ou photochimiquement).</p>

    <h3>2. Substitution nucléophile : SN1 vs SN2</h3>
    <table class="mini-table">
      <tr><th></th><th>SN1</th><th>SN2</th></tr>
      <tr><td>Étapes</td><td>2 (ionisation puis attaque)</td><td>1 (concertée)</td></tr>
      <tr><td>Intermédiaire</td><td>carbocation</td><td>état de transition unique</td></tr>
      <tr><td>Cinétique</td><td>ordre 1, dépend de [RX] seul</td><td>ordre 2, dépend de [RX] et [Nu⁻]</td></tr>
      <tr><td>Substrat favorable</td><td>tertiaire (R₃CX)</td><td>primaire (CH₃X, RCH₂X)</td></tr>
      <tr><td>Stéréochimie</td><td>racémisation partielle (carbocation plan)</td><td>inversion de Walden (attaque en dos à dos)</td></tr>
      <tr><td>Solvant favorable</td><td>polaire protique</td><td>polaire aprotique</td></tr>
    </table>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 240 90" width="100%">
          <text x="6" y="50" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">Nu⁻</text>
          <path d="M24,46 Q55,30 90,46" stroke="#4C7CFF" stroke-width="1.4" fill="none" marker-end="url(#sn2arr)"/>
          <circle cx="100" cy="46" r="3" fill="#F0B94D"/>
          <line x1="100" y1="46" x2="130" y2="30" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="100" y1="46" x2="130" y2="62" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="100" y1="46" x2="70" y2="20" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="140" y="46" font-family="IBM Plex Mono" font-size="11" fill="#FF6B6F">X⁻ (part)</text>
          <text x="30" y="80" font-family="IBM Plex Mono" font-size="9" fill="#5A6472">attaque à 180° du groupe partant → inversion de Walden</text>
          <defs><marker id="sn2arr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#4C7CFF"/></marker></defs>
        </svg>
        <span>SN2 : attaque du nucléophile à l'opposé du groupe partant, dans un même mouvement concerté</span>
      </div>
    </div>
    <p>Un <strong>solvant polaire protique</strong> (eau, alcools) possède un H labile capable de solvater et stabiliser le carbocation : il favorise la SN1. Un <strong>solvant polaire aprotique</strong> (acétone, DMSO) n'a pas cet hydrogène mais solvate bien le cation associé au nucléophile : il favorise la SN2.</p>

    <h3>3. Substitution électrophile aromatique (SEAr)</h3>
    <p>Le cycle benzénique, très stabilisé par résonance, réagit préférentiellement par <strong>substitution</strong> (qui conserve l'aromaticité) plutôt que par addition (qui la détruirait). Le réactif $A-B$ subit une rupture hétérolytique ; le fragment électrophile $A^+$ attaque le cycle riche en électrons, formant un intermédiaire cationique (complexe de Wheland) stabilisé par résonance, avant la perte du proton qui restaure l'aromaticité.</p>

    <h3>4. Addition électrophile sur les alcènes (AE) et règle de Markovnikov</h3>
    <p>Mécanisme en deux étapes : le réactif $A-B$ se scinde, $A^+$ (électrophile) attaque d'abord la double liaison pour former le <strong>carbocation le plus stable</strong>, puis $B^-$ se fixe sur ce carbocation.</p>
    <div class="key-point">
      <span class="eyebrow">Règle de Markovnikov (1869)</span>
      Lors de l'addition d'un hydracide $H-X$ dissymétrique sur un alcène dissymétrique, l'atome d'hydrogène se fixe sur le carbone <strong>le plus hydrogéné</strong> (le moins substitué), l'halogène se fixant sur le carbone qui donnera le carbocation le plus stable (le plus substitué).
    </div>
    <p>L'<strong>hydratation d'un alcène</strong> (catalysée par $H_3O^+$) suit la même règle en trois étapes : protonation de la double liaison (formation du carbocation le plus stable), attaque nucléophile de l'eau, puis élimination d'un proton régénérant le catalyseur.</p>

    <h3>5. Addition radicalaire : l'effet Karasch (anti-Markovnikov)</h3>
    <p>En présence de peroxydes (initiateurs de radicaux), l'addition de $H-Br$ sur un alcène s'inverse par rapport à Markovnikov : c'est l'<strong>effet Karasch</strong>. Le mécanisme devient <strong>radicalaire</strong> en chaîne : initiation (formation du radical Br•), propagation (le radical Br• attaque en priorité le carbone le moins substitué pour donner le radical secondaire, plus stable, plutôt que le primaire), puis terminaison.</p>

    <h3>6. Addition sur les alcynes et addition nucléophile</h3>
    <p>L'hydratation d'un alcyne (catalysée par $Hg^{2+}$) donne, en suivant la règle de Markovnikov, un <strong>énol</strong> intermédiaire qui se transpose spontanément (tautomérie céto-énolique) en <strong>cétone</strong>. L'<strong>addition nucléophile</strong> sur des alcènes ou alcynes activés (portant un groupe électroattracteur conjugué) suit le mécanisme inverse : le nucléophile $Y^-$ attaque en premier, l'anion formé capte ensuite un proton.</p>

    <h3>7. Réactions d'élimination : E1 et E2</h3>
    <table class="mini-table">
      <tr><th></th><th>E1</th><th>E2</th></tr>
      <tr><td>Étapes</td><td>2 (ionisation puis départ du H)</td><td>1 (concertée, anti-périplanaire)</td></tr>
      <tr><td>Intermédiaire</td><td>carbocation (même que SN1)</td><td>aucun : état de transition unique</td></tr>
      <tr><td>Substrat favorable</td><td>tertiaire</td><td>tout substrat, base forte requise</td></tr>
    </table>
    <p>Le mécanisme <strong>E2</strong> exige que l'hydrogène éliminé et le groupe partant soient <strong>anti-périplanaires</strong> (en trans l'un de l'autre dans l'état de transition) : c'est une élimination trans concertée.</p>

    <h3>8. Compétition substitution / élimination</h3>
    <p>Substitution et élimination sont souvent en concurrence directe. Trois facteurs pilotent la sélectivité :</p>
    <ul>
      <li><strong>Classe du substrat</strong> : un halogénoalcane tertiaire favorise E1/SN1 (via le carbocation commun) ; primaire favorise SN2.</li>
      <li><strong>Basicité et encombrement du réactif</strong> : une base forte et encombrée (ex. $tBuOK$) favorise fortement l'élimination — l'approche nucléophile sur le carbone est gênée, celle, plus petite, du proton pour l'élimination reste facile.</li>
      <li><strong>Température</strong> : chauffer favorise l'élimination (E1/E2) au détriment de la substitution.</li>
    </ul>
    <p>Exemple chiffré : avec l'ion éthanolate $EtO^-$ à 50°C, un substrat <strong>primaire</strong> donne 90 % de SN2 / 10 % de E2 ; le même réactif sur un substrat <strong>secondaire</strong> s'inverse à 21 % de SN2 / 79 % de E2.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Hétérolytique → ions (carbocation/carbanion) ; homolytique → radicaux libres</li>
        <li>SN1 (2 étapes, carbocation, substrat tertiaire, racémisation) vs SN2 (1 étape concertée, substrat primaire, inversion de Walden)</li>
        <li>Markovnikov : H se fixe sur le carbone le plus hydrogéné (via le carbocation le plus stable) ; l'effet Karasch (radicalaire, peroxydes) inverse cette règle</li>
        <li>E1 partage son intermédiaire carbocation avec SN1 ; E2 est concertée et exige une géométrie anti-périplanaire</li>
        <li>Base forte + encombrée + haute température = élimination favorisée ; substrat primaire + nucléophile peu encombré = substitution favorisée</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer Markovnikov sans vérifier la présence de peroxydes, qui inverse la régiosélectivité (effet Karasch)</li>
        <li>Oublier que SN1/E1 partagent le même intermédiaire carbocation, et sont donc favorisées par les mêmes facteurs (substrat tertiaire, solvant polaire protique)</li>
        <li>Croire qu'une base forte favorise toujours la substitution : au contraire, elle favorise l'élimination, surtout si elle est encombrée</li>
        <li>Négliger la stéréochimie : la SN2 inverse la configuration (inversion de Walden), l'E2 exige une conformation anti-périplanaire précise</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un halogénoalcane tertiaire, dans un solvant polaire protique, réagit préférentiellement selon un mécanisme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc5e1" value="wrong"> SN2</label>
          <label class="option"><input type="radio" name="desc5e1" value="right"> SN1</label>
          <label class="option"><input type="radio" name="desc5e1" value="wrong"> addition nucléophile</label>
          <label class="option"><input type="radio" name="desc5e1" value="wrong"> SEAr</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc5e1','desc5fb1','Correct — un substrat tertiaire forme un carbocation très stable, et un solvant polaire protique le solvate efficacement : les deux facteurs favorisent la SN1.','Un carbocation tertiaire est très stable, et un solvant protique le stabilise encore par solvatation : quel mécanisme cela favorise-t-il ?')">Vérifier</button>
        <div class="feedback" id="desc5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'addition de HBr sur le propène, EN PRÉSENCE DE PEROXYDES, donne majoritairement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc5e2" value="wrong"> le 2-bromopropane (Markovnikov)</label>
          <label class="option"><input type="radio" name="desc5e2" value="right"> le 1-bromopropane (anti-Markovnikov)</label>
          <label class="option"><input type="radio" name="desc5e2" value="wrong"> un mélange 50/50 sans préférence</label>
          <label class="option"><input type="radio" name="desc5e2" value="wrong"> aucune réaction ne se produit</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc5e2','desc5fb2','Correct — les peroxydes déclenchent un mécanisme radicalaire (effet Karasch) : le radical Br• attaque en premier le carbone le moins substitué, ce qui inverse la régiosélectivité de Markovnikov.','Les peroxydes changent le mécanisme d\\'ionique à radicalaire : quel effet cela produit-il sur la régiosélectivité ?')">Vérifier</button>
        <div class="feedback" id="desc5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour qu'une élimination E2 se produise, l'hydrogène éliminé et le groupe partant doivent être :</p>
        <div class="options">
          <label class="option"><input type="radio" name="desc5e3" value="wrong"> sur le même carbone</label>
          <label class="option"><input type="radio" name="desc5e3" value="right"> anti-périplanaires (en trans)</label>
          <label class="option"><input type="radio" name="desc5e3" value="wrong"> syn-périplanaires (en cis) uniquement</label>
          <label class="option"><input type="radio" name="desc5e3" value="wrong"> peu importe la géométrie</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('desc5e3','desc5fb3','Correct — l\\'E2 est une élimination concertée : l\\'état de transition exige une géométrie anti-périplanaire entre l\\'hydrogène arraché et le groupe partant.','L\\'E2 est une réaction concertée en UNE seule étape : quelle géométrie précise l\\'état de transition impose-t-il ?')">Vérifier</button>
        <div class="feedback" id="desc5fb3"></div>
      </div>
    </div>
  `
};

DESC_NOVA_KB[descKey('Étude des mécanismes réactionnels : substitution, addition, élimination')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Mécanismes réactionnels ». Demande-moi la différence entre SN1 et SN2, la règle de Markovnikov, ou un indice sur un exercice.",
  rules: [
    { test:/sn1/i, replies:["SN1 : 2 étapes, passe par un carbocation intermédiaire, favorisée par un substrat TERTIAIRE et un solvant polaire PROTIQUE. Stéréochimie : racémisation partielle (le carbocation est plan)."] },
    { test:/sn2/i, replies:["SN2 : 1 étape concertée, le nucléophile attaque à 180° du groupe partant (inversion de Walden), favorisée par un substrat PRIMAIRE et un solvant polaire APROTIQUE."] },
    { test:/markovnikov/i, replies:["Règle de Markovnikov : lors de l'addition de H-X sur un alcène dissymétrique, H se fixe sur le carbone le plus hydrogéné (le moins substitué), car cela forme le carbocation intermédiaire le plus stable."] },
    { test:/karasch|anti.markovnikov/i, replies:["L'effet Karasch (en présence de peroxydes) inverse la règle de Markovnikov : le mécanisme devient radicalaire, et le radical Br• attaque d'abord le carbone le moins substitué (radical secondaire plus stable que primaire)."] },
    { test:/e1\b/i, replies:["E1 : 2 étapes, partage le même carbocation intermédiaire que SN1 — favorisée par les mêmes facteurs (substrat tertiaire, solvant polaire protique, chauffage)."] },
    { test:/e2\b/i, replies:["E2 : 1 étape concertée, exige une géométrie ANTI-PÉRIPLANAIRE entre l'hydrogène arraché et le groupe partant. Favorisée par une base forte, surtout encombrée."] },
    { test:/comp[ée]tition|substitution.*[ée]limination/i, replies:["Substrat tertiaire + base forte encombrée + température élevée → élimination favorisée. Substrat primaire + nucléophile peu encombré → substitution favorisée."] },
    { test:/hydratation.*alcyne|[ée]nol/i, replies:["L'hydratation d'un alcyne (catalyseur Hg2+) suit Markovnikov et donne un énol instable, qui se transpose spontanément (tautomérie céto-énolique) en cétone."] },
    { test:/carbocation.*stabilit[ée]|stabilit[ée].*carbocation/i, replies:["Ordre de stabilité des carbocations : tertiaire > secondaire > primaire > méthyle (grâce à l'effet +I des groupes alkyles), avec une stabilisation supplémentaire si le carbocation est allylique ou benzylique (conjugaison)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : substrat tertiaire + solvant protique, quel intermédiaire est stabilisé ?","Indice niveau 2 : le carbocation, très stable ici.","Indice niveau 3 : ces conditions favorisent la SN1."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : les peroxydes signalent un mécanisme radicalaire.","Indice niveau 2 : le radical Br• se fixe sur le carbone le MOINS substitué.","Indice niveau 3 : ça donne le 1-bromopropane, anti-Markovnikov."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : l'E2 est concertée, en une seule étape.","Indice niveau 2 : il faut donc une géométrie précise dans l'état de transition.","Indice niveau 3 : c'est la géométrie anti-périplanaire (trans)."] }
  ]
};

/* fusionne le module Chimie Organique Descriptive dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, DESC_CHAPTERS);
Object.assign(NOVA_KB, DESC_NOVA_KB);