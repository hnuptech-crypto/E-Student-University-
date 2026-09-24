/* =====================================================================
   CHUNK « org » — registre ORG_CHAPTERS / ORG_NOVA_KB
   Matière(s) : Chimie|Chimie organique générale
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   ORG_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ============================================================================
   MODULE CHIMIE ORGANIQUE GÉNÉRALE — Chimie L1
   (contenu rédigé à partir du cours "Chimie organique générale et étude des
   hydrocarbures", Éd. Gbaguidi-Kpoviéssi, 2019)
   Structure identique aux autres modules : ORG_CHAPTERS / ORG_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const ORG_MATIERE = 'Chimie organique générale';
function orgKey(chapterTitle){ return `Chimie|${ORG_MATIERE}|${chapterTitle}`; }
const ORG_CHAPTERS = {};
const ORG_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur du degré d'insaturation (Chapitre 1)
--------------------------------------------------------------------------------- */
function updateOrgInsaturation(){
  const x = parseFloat(document.getElementById('orgInsX').value) || 0;
  const y = parseFloat(document.getElementById('orgInsY').value) || 0;
  const t = parseFloat(document.getElementById('orgInsT').value) || 0;
  const alpha = (2 + 2*x - y + t) / 2;
  let out = `α = (2 + 2×${x} − ${y} + ${t}) / 2 = <strong>${alpha}</strong><br>`;
  if(!Number.isInteger(alpha) || alpha < 0){
    out += `Une formule brute cohérente donne toujours un α entier ≥ 0 : vérifie le nombre d'atomes saisi.`;
  } else if(alpha === 0){
    out += `α = 0 : la molécule est saturée et acyclique (aucun cycle, aucune liaison multiple) — typiquement un alcane.`;
  } else {
    out += `α = ${alpha} : il faut ${alpha} « insaturation(s) » — un cycle et/ou une liaison multiple comptent chacun pour 1 (une triple liaison compte pour 2).`;
  }
  document.getElementById('orgInsReadout').innerHTML = out;
}
function initOrgInsaturation(){ updateOrgInsaturation(); }

/* =========================== CHAPITRE 1 — Généralités et nomenclature =========================== */
ORG_CHAPTERS[orgKey('Généralités et nomenclature des molécules organiques')] = {
  objectives: [
    "Décrire la structure du carbone et distinguer carbones primaire, secondaire, tertiaire et quaternaire",
    "Passer d'une formule brute à une formule développée, semi-développée ou topologique",
    "Reconnaître les principaux groupes fonctionnels et leur ordre de priorité",
    "Nommer une molécule organique selon les règles systématiques de l'UICPA",
    "Évaluer pourquoi la chimie organique, définie historiquement comme « la chimie des composés du carbone », a dû abandonner sa définition originelle fondée sur la seule origine « vivante » de ces substances"
  ],
  prereqs: ["Notions de base de chimie générale (L1)"],
  bodyHtml: `
    <p>En 1828, le chimiste allemand Friedrich Wöhler réalise, presque par accident, une expérience qui va ébranler l'une des croyances scientifiques les plus solidement établies de son époque : en chauffant du cyanate d'ammonium, un composé purement minéral, il obtient de l'urée — une substance organique jusque-là considérée comme ne pouvant être produite que par un organisme vivant, sous l'effet d'une mystérieuse « force vitale ». Cette synthèse, réalisée en dehors de tout être vivant, porte un coup fatal à la théorie du vitalisme et ouvre la voie à la chimie organique moderne, aujourd'hui simplement définie comme la chimie des composés du carbone, qu'ils soient d'origine naturelle ou synthétique.</p>
    <p>Cette redéfinition, loin d'être un simple ajustement académique, a des conséquences immenses : elle légitime la synthèse artificielle de médicaments, de plastiques, de colorants et de milliers d'autres substances qui façonnent aujourd'hui l'essentiel de notre quotidien matériel. La nomenclature systématique que ce chapitre te propose de maîtriser — un langage international rigoureux capable de nommer sans ambiguïté des millions de molécules différentes — est l'héritière directe de cette révolution conceptuelle amorcée par Wöhler.</p>
    <p>La chimie organique étudie les composés du carbone : substances naturelles (protéines, sucres, graisses, hormones, alcaloïdes...) et produits de synthèse (plastiques, colorants, médicaments, détergents...). Outre le carbone, on y rencontre des non-métaux (H, O, N, S, P, Si, F, Cl, Br, I...) et parfois des métaux (Na, Li, Mg, Zn...). À la fin de ce chapitre, tu sauras nommer et représenter n'importe quelle molécule organique selon les règles internationales de l'UICPA.</p>

    <h3>1. Le carbone tétravalent</h3>
    <p>Les atomes de carbone s'unissent entre eux (liaisons simples, doubles ou triples) pour donner des chaînes droites, ramifiées ou cycliques. Un carbone est dit <strong>primaire, secondaire, tertiaire ou quaternaire</strong> selon qu'il est lié à un, deux, trois ou quatre autres atomes de carbone.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 260 130" width="100%">
          <line x1="20" y1="78" x2="42.5" y2="65" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="42.5" y1="65" x2="65" y2="78" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="65" y1="78" x2="87.5" y2="65" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="87.5" y1="65" x2="110" y2="78" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="42.5" y1="65" x2="20" y2="52" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="42.5" y1="65" x2="65" y2="52" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="65" y1="78" x2="65" y2="104" stroke="#EAF0FB" stroke-width="1.6"/>
          <circle cx="20" cy="78" r="2.6" fill="#4C7CFF"/><text x="6" y="93" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">I</text>
          <circle cx="42.5" cy="65" r="2.6" fill="#F0B94D"/><text x="44" y="46" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">IV</text>
          <circle cx="65" cy="78" r="2.6" fill="#2DD4C4"/><text x="70" y="120" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">III</text>
          <circle cx="87.5" cy="65" r="2.6" fill="#9B82FF"/><text x="92" y="46" font-family="IBM Plex Mono" font-size="9" fill="#9B82FF">II</text>
          <circle cx="110" cy="78" r="2.6" fill="#4C7CFF"/><text x="115" y="93" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">I</text>
          <text x="130" y="68" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">(2,2,3-triméthylpentane)</text>
        </svg>
        <span>I = primaire, II = secondaire, III = tertiaire, IV = quaternaire</span>
      </div>
    </div>

    <h3>2. Représenter une molécule</h3>
    <table class="mini-table">
      <tr><th>Type de formule</th><th>Ce qu'elle montre</th></tr>
      <tr><td>Formule brute</td><td>uniquement le nombre de chaque atome (ex. C₃H₆O)</td></tr>
      <tr><td>Formule semi-développée</td><td>les groupes CH₃, CH₂, CHO... sans détailler chaque liaison C−H</td></tr>
      <tr><td>Formule développée</td><td>tous les atomes et toutes les liaisons, y compris C−H</td></tr>
      <tr><td>Formule topologique</td><td>représentation simplifiée en « zig-zag » : chaque sommet ou extrémité est un carbone (les H implicites)</td></tr>
    </table>
    <p><strong>Exemple :</strong> $C_3H_6O$ donne $CH_3-CH_2-CHO$ (semi-développée), que l'on peut détailler en formule développée complète.</p>

    <div class="key-point">
      <span class="eyebrow">Degré d'insaturation</span>
      La formule $\\alpha=\\dfrac{2+2x-y+t}{2}$ permet de prévoir, à partir d'une formule brute, le nombre de cycles et/ou de liaisons multiples d'une molécule ($x$ = nombre d'atomes tétravalents comme C ; $y$ = nombre d'atomes monovalents comme H, halogènes ; $t$ = nombre d'atomes trivalents comme N). Chaque cycle ou chaque liaison double compte pour 1 ; une triple liaison compte pour 2.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le degré d'insaturation, calculé à partir de la seule formule brute (sans connaître la structure exacte de la molécule), peut valoir 1 pour de nombreuses structures très différentes (un cycle simple, une double liaison, etc.). Pourquoi cette formule, bien qu'incapable de déterminer la structure exacte d'une molécule à elle seule, reste-t-elle malgré tout un outil précieux pour un chimiste face à une formule brute inconnue ?
    </div>

    <h3>3. Le groupe fonctionnel</h3>
    <p>C'est un groupement d'atomes caractéristique d'une molécule qui lui confère des propriétés déterminées. Une fonction peut être mono-, bi-, tri- ou tétravalente selon qu'on a remplacé 1, 2, 3 ou 4 atomes d'hydrogène à partir de l'alcane de départ.</p>
    <table class="mini-table">
      <tr><th>Famille</th><th>Groupe caractéristique</th><th>Exemple</th></tr>
      <tr><td>Halogénure</td><td>$-X$ ($X$ = F, Cl, Br, I)</td><td>chlorométhane</td></tr>
      <tr><td>Alcool</td><td>$-OH$</td><td>éthanol</td></tr>
      <tr><td>Éther-oxyde</td><td>$-O-$</td><td>diéthyléther</td></tr>
      <tr><td>Amine</td><td>$-NH_2$, $-NHR$, $-NR_2$</td><td>méthanamine</td></tr>
      <tr><td>Aldéhyde</td><td>$-CHO$</td><td>éthanal</td></tr>
      <tr><td>Cétone</td><td>$-CO-$</td><td>propanone</td></tr>
      <tr><td>Acide carboxylique</td><td>$-COOH$</td><td>acide éthanoïque</td></tr>
      <tr><td>Ester</td><td>$-COOR$</td><td>éthanoate d'éthyle</td></tr>
      <tr><td>Amide</td><td>$-CONH_2$</td><td>éthanamide</td></tr>
      <tr><td>Nitrile</td><td>$-C\\equiv N$</td><td>éthanenitrile</td></tr>
    </table>
    <p>On distingue aussi les <strong>fonctions multiples ou répétées</strong> (diol, triol, diacide, diène...), les <strong>fonctions mixtes</strong> (deux fonctions différentes portées par des carbones voisins, comme les $\\alpha$-aminoacides) et les <strong>fonctions complexes</strong> (plusieurs fonctions différentes dans la même molécule, comme l'aspirine).</p>

    <h3>4. Classification des hydrocarbures</h3>
    <table class="mini-table">
      <tr><th>Série</th><th>Sous-classe</th></tr>
      <tr><td>Acyclique (aliphatique) saturée</td><td>alcanes</td></tr>
      <tr><td>Acyclique insaturée</td><td>alcènes, alcynes</td></tr>
      <tr><td>Cyclique non benzénique</td><td>cyclanes, cyclènes, cyclynes</td></tr>
      <tr><td>Benzénique (aromatique)</td><td>arènes (benzène, toluène, naphtalène...)</td></tr>
    </table>

    <h3>5. Nomenclature systématique (UICPA)</h3>
    <p>La nomenclature scientifique est établie par l'Union Internationale de Chimie Pure et Appliquée (UICPA). Elle repose sur trois étapes : <strong>identifier</strong> la (les) fonction(s) présente(s), <strong>classer</strong> les fonctions par ordre de priorité pour déduire la fonction principale, <strong>identifier</strong> la chaîne principale (la plus longue chaîne carbonée contenant le carbone de la fonction principale), puis <strong>numéroter</strong> pour donner aux substituants les indices les plus petits possibles.</p>
    <table class="mini-table">
      <tr><th>n</th><th>Alcane (-ane)</th><th>n</th><th>Alcane (-ane)</th></tr>
      <tr><td>1</td><td>méthane</td><td>6</td><td>hexane</td></tr>
      <tr><td>2</td><td>éthane</td><td>7</td><td>heptane</td></tr>
      <tr><td>3</td><td>propane</td><td>8</td><td>octane</td></tr>
      <tr><td>4</td><td>butane</td><td>9</td><td>nonane</td></tr>
      <tr><td>5</td><td>pentane</td><td>10</td><td>décane</td></tr>
    </table>
    <p>Pour un <strong>alcène</strong> la terminaison devient <strong>-ène</strong>, pour un <strong>alcyne</strong>, <strong>-yne</strong>. Pour une molécule ramifiée, la chaîne principale est la plus longue chaîne contenant la fonction ; on numérote pour donner l'indice le plus bas à la fonction principale, puis aux substituants, cités par ordre alphabétique avec leur position.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> nommer $CH_3-CH_2-CH(CH_3)-CH_2-CH_3$.</p>
      <p><strong>Solution :</strong> la chaîne principale compte 5 carbones (pentane) ; un groupe méthyle est fixé sur le carbone 3 (numérotation qui donne le plus petit indice, identique dans les deux sens ici).</p>
      <p class="example-answer">Réponse : 3-méthylpentane.</p>
    </div>
    <p>Le tableau des 14 classes fonctionnelles du cours associe à chaque fonction un <strong>préfixe</strong> (utilisé quand la fonction n'est pas prioritaire) et un <strong>suffixe</strong> (utilisé quand elle est la fonction principale). Quand une molécule porte plusieurs fonctions, une seule — la plus prioritaire — donne le suffixe ; toutes les autres sont citées comme préfixes.</p>
    <p>Certaines molécules d'intérêt thérapeutique gardent une <strong>dénomination commune</strong> (DC) ou une <strong>dénomination commune internationale</strong> (DCI), en plus du nom scientifique systématique — c'est le cas de nombreux principes actifs pharmaceutiques.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un médicament comme le paracétamol porte un nom scientifique UICPA bien plus complexe (N-(4-hydroxyphényl)acétamide) que sa dénomination commune internationale. Pourquoi l'industrie pharmaceutique et le grand public continuent-ils d'utiliser des noms communs simplifiés plutôt que la nomenclature systématique rigoureuse, malgré l'ambiguïté potentielle que cela pourrait introduire ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La nomenclature systématique de l'UICPA, révisée régulièrement pour s'adapter à la découverte de nouvelles molécules toujours plus complexes, doit aujourd'hui composer avec des défis inédits : certaines protéines et macromolécules biologiques comptent des dizaines de milliers d'atomes, rendant une nomenclature UICPA complète totalement impraticable — les biochimistes recourent alors à des systèmes de représentation simplifiés spécifiques (séquences d'acides aminés, structures secondaires). Par ailleurs, l'intelligence artificielle est aujourd'hui utilisée pour automatiser la génération de noms systématiques et la conversion entre différentes représentations moléculaires, accélérant considérablement le travail des chimistes de synthèse.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir un système de nomenclature universel, à la fois rigoureux et lisible par un humain, capable de nommer sans ambiguïté des molécules aussi complexes que les protéines ou les polymères de synthèse de nouvelle génération ? C'est un défi permanent pour les organismes de normalisation chimique internationale.</p>
    <p><strong>Technologie émergente :</strong> les algorithmes de traduction automatique entre formule structurale, nom UICPA et notation SMILES (une représentation textuelle compacte des molécules), largement utilisés en chimie computationnelle et en pharmacologie, permettent aujourd'hui de manipuler des millions de molécules dans des bases de données sans jamais dessiner une seule structure manuellement.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Squelette carboné (I/II/III/IV) → groupe(s) fonctionnel(s) → fonction prioritaire (suffixe) + fonctions secondaires (préfixes) → chaîne principale la plus longue → numérotation optimale → nom UICPA
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\alpha = \\frac{2+2x-y+t}{2}$$
      Cette formule du degré d'insaturation, apparemment anodine, condense en une seule expression toute l'information sur le nombre de cycles et de liaisons multiples d'une molécule — un premier réflexe de vérification indispensable avant toute tentative de nomenclature ou de représentation structurale.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un carbone est I, II, III ou IV selon le nombre d'autres carbones auxquels il est lié</li>
        <li>Le degré d'insaturation α compte le nombre total de cycles + liaisons multiples d'une molécule</li>
        <li>Un groupe fonctionnel peut être mono-, bi-, tri- ou tétravalent</li>
        <li>En nomenclature UICPA, une seule fonction (la plus prioritaire) donne le suffixe ; les autres sont des préfixes</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre le nombre de liaisons d'un carbone (toujours 4) avec son type (I, II, III, IV) qui dépend du nombre de carbones voisins</li>
        <li>Oublier de choisir la chaîne principale la PLUS LONGUE contenant la fonction prioritaire</li>
        <li>Numéroter sans vérifier les deux sens de la chaîne : il faut toujours celui qui donne les indices les plus petits</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — degré d'insaturation</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre le nombre d'atomes tétravalents (x), monovalents (y) et trivalents (t) d'une formule brute pour obtenir α.</p>
      <div class="sim-controls">
        <label>x (atomes tétravalents, ex. C) : <input type="number" id="orgInsX" value="3" style="width:56px;" oninput="updateOrgInsaturation()"></label>
        <label>y (atomes monovalents, ex. H) : <input type="number" id="orgInsY" value="6" style="width:56px;" oninput="updateOrgInsaturation()"></label>
        <label>t (atomes trivalents, ex. N) : <input type="number" id="orgInsT" value="0" style="width:56px;" oninput="updateOrgInsaturation()"></label>
        <div class="sim-readout" id="orgInsReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans $CH_3-CH_2-CH(CH_3)-CH_3$, le carbone qui porte le groupe méthyle ramifié est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org1e1" value="wrong"> primaire</label>
          <label class="option"><input type="radio" name="org1e1" value="wrong"> secondaire</label>
          <label class="option"><input type="radio" name="org1e1" value="right"> tertiaire</label>
          <label class="option"><input type="radio" name="org1e1" value="wrong"> quaternaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org1e1','org1fb1','Correct — ce carbone est lié à 3 autres carbones (deux de la chaîne principale, un du méthyle) : il est tertiaire.','Compte le nombre d\\'AUTRES atomes de carbone directement liés à ce carbone précis.')">Vérifier</button>
        <div class="feedback" id="org1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour la formule brute $C_6H_{12}$ (x=6, y=12, t=0), le degré d'insaturation α vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org1e2" value="wrong"> 0</label>
          <label class="option"><input type="radio" name="org1e2" value="right"> 1</label>
          <label class="option"><input type="radio" name="org1e2" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="org1e2" value="wrong"> 3</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org1e2','org1fb2','Correct — α = (2+12−12+0)/2 = 1 : cette molécule a soit un cycle, soit une double liaison (ex. cyclohexane ou hexène).','Applique α = (2+2x−y+t)/2 avec x=6, y=12, t=0.')">Vérifier</button>
        <div class="feedback" id="org1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Quand une molécule porte plusieurs fonctions différentes, en nomenclature UICPA :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org1e3" value="wrong"> toutes les fonctions apparaissent en suffixe</label>
          <label class="option"><input type="radio" name="org1e3" value="right"> seule la fonction prioritaire donne le suffixe, les autres sont des préfixes</label>
          <label class="option"><input type="radio" name="org1e3" value="wrong"> on choisit le suffixe au hasard</label>
          <label class="option"><input type="radio" name="org1e3" value="wrong"> aucune fonction n'apparaît dans le nom</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org1e3','org1fb3','Correct — la fonction la plus prioritaire (selon le tableau de priorité) donne toujours le suffixe ; les autres sont citées comme préfixes.','Il existe un TABLEAU DE PRIORITÉ des fonctions : une seule l\\'emporte pour le suffixe.')">Vérifier</button>
        <div class="feedback" id="org1fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la théorie du vitalisme s'était révélée exacte : quelle direction aurait pu prendre le développement de l'industrie pharmaceutique moderne, aujourd'hui fondée sur la synthèse artificielle de molécules organiques ?</li>
        <li>Pourquoi la nomenclature UICPA impose-t-elle de choisir la chaîne la PLUS LONGUE contenant la fonction principale, plutôt qu'une chaîne plus courte qui pourrait sembler plus simple à nommer ?</li>
        <li>Quelle serait la conséquence, pour la recherche pharmaceutique mondiale, de l'absence d'un système de nomenclature international rigoureux et universellement reconnu ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>F. Wöhler, « Über künstliche Bildung des Harnstoffs », Annalen der Physik und Chemie, 1828 — l'article fondateur de la synthèse organique et de la chute du vitalisme.</li>
        <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard pour la nomenclature et les généralités en licence.</li>
        <li>IUPAC, <em>Nomenclature of Organic Chemistry: Recommendations and Preferred Names</em> (Livre Bleu), Royal Society of Chemistry, 2013 — texte officiel de référence de la nomenclature organique internationale.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais du langage universel qui te permettra de nommer et représenter n'importe quelle molécule organique tout au long de ce module. Le chapitre suivant, « Effets électroniques, réactivité et solvants », va t'apprendre à prédire comment ces molécules réagissent entre elles, en fonction de la répartition de leurs électrons. Comme le disait Wöhler lui-même, dans une lettre à son maître Berzelius annonçant sa découverte capitale : « Je dois vous dire que je peux fabriquer de l'urée sans avoir besoin d'un rein, ni d'un animal, qu'il soit homme ou chien. » Une phrase qui a, à elle seule, changé le cours de toute la chimie.</p>
  `,
  init: initOrgInsaturation
};

ORG_NOVA_KB[orgKey('Généralités et nomenclature des molécules organiques')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Généralités et nomenclature ». Demande-moi comment reconnaître un carbone tertiaire, calculer un degré d'insaturation, ou un indice sur un exercice.",
  rules: [
    { test:/carbone.*(primaire|secondaire|tertiaire|quaternaire)|primaire|secondaire|tertiaire|quaternaire/i, replies:["Un carbone est primaire (I), secondaire (II), tertiaire (III) ou quaternaire (IV) selon le nombre d'AUTRES atomes de carbone auxquels il est directement lié : 1, 2, 3 ou 4."] },
    { test:/degr[ée] d.insaturation|insaturation/i, replies:["α = (2+2x−y+t)/2, avec x = atomes tétravalents (C), y = atomes monovalents (H, halogènes), t = atomes trivalents (N). Chaque cycle ou double liaison compte pour 1, une triple liaison compte pour 2."] },
    { test:/groupe fonctionnel|fonction/i, replies:["Un groupe fonctionnel est un groupement d'atomes qui donne à la molécule des propriétés caractéristiques. Il peut être mono-, bi-, tri- ou tétravalent selon le nombre d'hydrogènes remplacés sur l'alcane de départ."] },
    { test:/formule (brute|semi|d[ée]velopp[ée]e|topologique)/i, replies:["Brute = juste les atomes ; semi-développée = groupes CH3/CH2 sans détailler C-H ; développée = tous les atomes et liaisons ; topologique = zig-zag simplifié où chaque sommet est un carbone."] },
    { test:/nomenclature|nommer|uicpa|iupac/i, replies:["La méthode : 1) identifier toutes les fonctions présentes, 2) trouver la fonction prioritaire (celle qui donnera le suffixe), 3) repérer la chaîne principale (la plus longue contenant cette fonction), 4) numéroter pour donner les indices les plus petits."] },
    { test:/priorit[ée]/i, replies:["Une seule fonction — la plus haute dans le tableau de priorité (acide carboxylique en tête, puis ester, amide, nitrile, aldéhyde, cétone, alcool, amine...) — donne le suffixe du nom. Les autres sont citées en préfixe."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compte les carbones voisins directs du carbone ramifié.","Indice niveau 2 : il touche deux carbones de la chaîne principale plus un du méthyle.","Indice niveau 3 : 3 voisins carbonés → tertiaire."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : applique directement la formule α = (2+2x−y+t)/2.","Indice niveau 2 : x=6, y=12, t=0 → (2+12−12+0)/2.","Indice niveau 3 : α = 1."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : repense au tableau de priorité des fonctions.","Indice niveau 2 : une seule fonction gagne le droit au suffixe.","Indice niveau 3 : les autres sont toujours en préfixe."] }
  ]
};

/* =========================== CHAPITRE 2 — Effets électroniques, réactivité et solvants =========================== */
ORG_CHAPTERS[orgKey('Effets électroniques, réactivité et solvants')] = {
  objectives: [
    "Distinguer effet inductif et effet mésomère, et prévoir leurs conséquences sur une molécule",
    "Identifier un réactif électrophile ou nucléophile, et le type de réaction correspondant",
    "Comparer la stabilité de différents intermédiaires réactionnels (carbocations, radicaux)",
    "Choisir un solvant adapté selon sa polarité et son rôle dans une réaction",
    "Évaluer pourquoi un halogène, à la fois attracteur inductif et donneur mésomère, produit un effet global sur la réactivité d'un cycle aromatique qui semble à première vue contradictoire"
  ],
  prereqs: ["Généralités et nomenclature des molécules organiques"],
  bodyHtml: `
    <p>Christopher Ingold, chimiste britannique du XXe siècle, est l'un des pionniers qui a formalisé, dans les années 1920-1930, le langage des « flèches courbes » que ce chapitre te propose de maîtriser — ce système de représentation graphique, aujourd'hui enseigné dans chaque cours de chimie organique du monde, permet de visualiser précisément le déplacement des électrons lors d'une réaction, transformant une transformation chimique abstraite en une véritable chorégraphie électronique lisible d'un simple coup d'œil. Cette notation, d'une élégance redoutable, a permis pour la première fois de prédire rigoureusement la réactivité d'une molécule inconnue, plutôt que de se contenter d'observer empiriquement le résultat d'une réaction après coup.</p>
    <p>Comprendre ces effets électroniques n'est jamais un exercice purement théorique : c'est exactement cette logique qui permet à un chimiste médicinal de prédire où une molécule candidate-médicament réagira dans l'organisme, ou à un ingénieur en synthèse organique industrielle de choisir le solvant qui accélérera une réaction plutôt que d'en ralentir le rendement. Ce chapitre te donne les outils conceptuels qui sous-tendront la compréhension de chaque mécanisme réactionnel du reste de ce module.</p>
    <p>Une molécule n'est pas un ensemble d'atomes globalement neutre et inerte : la répartition des électrons y est inégale, ce qui détermine sa réactivité. Ce chapitre étudie comment prévoir cette répartition (effets électroniques) puis comment elle gouverne le déroulement des réactions (mécanismes, intermédiaires, énergie). À la fin de ce chapitre, tu sauras prédire, à partir de la seule structure d'une molécule, où et comment elle réagira le plus probablement.</p>

    <h3>1. Électronégativité et polarisation des liaisons</h3>
    <p>Dans une liaison covalente $A-B$, si $A$ est plus électronégatif que $B$, le doublet de liaison est attiré vers $A$ : la liaison est <strong>polarisée</strong>, avec $A^{\\delta-}$ et $B^{\\delta+}$. Le <strong>moment dipolaire</strong> $\\mu = \\delta\\times d$ mesure cette polarisation.</p>
    <p>La <strong>polarisabilité</strong> est l'aptitude d'une liaison à voir son nuage électronique déformé sous l'effet d'un champ électrique (permanent ou induit) — un gros atome peu électronégatif (comme l'iode) est plus polarisable qu'un petit atome très électronégatif (comme le fluor).</p>

    <h3>2. Effet inductif (I)</h3>
    <p>Un effet inductif se propage <strong>de proche en proche le long des liaisons σ</strong>, en s'atténuant rapidement (il devient négligeable au-delà de 3 liaisons).</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 200 70" width="100%">
          <line x1="20" y1="52" x2="42.5" y2="39" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="42.5" y1="39" x2="65" y2="52" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="65" y1="52" x2="87.5" y2="39" stroke="#EAF0FB" stroke-width="1.6"/>
          <circle cx="20" cy="52" r="2.4" fill="#EAF0FB"/>
          <circle cx="42.5" cy="39" r="2.4" fill="#EAF0FB"/>
          <circle cx="65" cy="52" r="2.4" fill="#EAF0FB"/>
          <text x="92" y="42" font-family="IBM Plex Mono" font-size="12" fill="#FF6B6F">Cl</text>
          <line x1="26" y1="20" x2="37" y2="20" stroke="#F0B94D" stroke-width="1.5" opacity="0.4" marker-end="url(#orgIArr)"/>
          <line x1="48" y1="20" x2="59" y2="20" stroke="#F0B94D" stroke-width="1.9" opacity="0.7" marker-end="url(#orgIArr)"/>
          <line x1="70" y1="20" x2="81" y2="20" stroke="#F0B94D" stroke-width="2.3" opacity="1" marker-end="url(#orgIArr)"/>
          <text x="100" y="24" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">effet −I</text>
          <text x="20" y="66" font-family="IBM Plex Mono" font-size="8" fill="#5A6472">décroissant de la liaison C−Cl vers la gauche</text>
          <defs><marker id="orgIArr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#F0B94D"/></marker></defs>
        </svg>
        <span>L'atome de chlore, électronégatif, attire les électrons vers lui (−I) ; l'effet, maximal sur la liaison C−Cl, s'atténue de proche en proche</span>
      </div>
    </div>
    <table class="mini-table">
      <tr><th>Type</th><th>Effet</th><th>Exemples de groupes</th></tr>
      <tr><td>−I (attracteur)</td><td>appauvrit la chaîne en électrons</td><td>halogènes, −NO₂, −OH, −NH₃⁺, −COOH</td></tr>
      <tr><td>+I (donneur)</td><td>enrichit la chaîne en électrons</td><td>groupes alkyles (−CH₃, −C₂H₅...)</td></tr>
    </table>
    <p>Les effets inductifs se cumulent : plusieurs groupes −I renforcent l'effet ; les groupes alkyles donneurs (+I) stabilisent au contraire les charges positives voisines. L'effet inductif influence directement l'<strong>acidité</strong> et la <strong>basicité</strong> (un groupe −I proche d'un −COOH renforce son acidité en stabilisant la base conjuguée).</p>

    <h3>3. Effet mésomère (M)</h3>
    <p>L'effet mésomère correspond au <strong>déplacement d'électrons π ou de doublets non liants</strong>, par délocalisation sur un système conjugué (liaisons doubles alternées, ou doublet non liant voisin d'une double liaison). Contrairement à l'effet inductif, il ne s'atténue pas avec la distance le long du système conjugué.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 110" width="100%">
          <line x1="20" y1="65" x2="42.5" y2="52" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="21.8" y1="68" x2="44.3" y2="55" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="42.5" y1="52" x2="65" y2="65" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="65" y1="65" x2="87.5" y2="52" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="66.8" y1="68" x2="89.3" y2="55" stroke="#EAF0FB" stroke-width="1.6"/>
          <text x="2" y="80" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">H₂C</text>
          <text x="35" y="42" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">CH</text>
          <text x="60" y="82" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">CH</text>
          <text x="90" y="42" font-family="IBM Plex Mono" font-size="11" fill="#FF6B6F">O</text>
          <path d="M31,48 Q42,30 54,48" stroke="#4C7CFF" stroke-width="1.3" fill="none" marker-end="url(#orgMArr1)"/>
          <path d="M76,50 Q83,33 87,44" stroke="#4C7CFF" stroke-width="1.3" fill="none" marker-end="url(#orgMArr1)"/>
          <text x="105" y="60" font-family="IBM Plex Mono" font-size="16" fill="#EAF0FB">↔</text>
          <text x="10" y="102" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">⁺CH₂−CH=CH−O⁻</text>
          <defs><marker id="orgMArr1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#4C7CFF"/></marker></defs>
        </svg>
        <span>La flèche 1 déplace le doublet π C1=C2 vers la liaison C2–C3 ; la flèche 2 déplace le doublet π C3=O vers l'oxygène : on obtient la forme mésomère chargée</span>
      </div>
    </div>
    <table class="mini-table">
      <tr><th>Type</th><th>Origine</th><th>Exemples de groupes</th></tr>
      <tr><td>+M (donneur)</td><td>doublet non liant conjugué avec le système π</td><td>−NH₂, −OH, −OR, halogènes</td></tr>
      <tr><td>−M (attracteur)</td><td>liaison multiple polarisée conjuguée (C=O, C≡N, NO₂...)</td><td>−CHO, −COR, −COOH, −NO₂, −CN</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Quand un même groupe présente à la fois un effet inductif et un effet mésomère de sens opposés (cas des halogènes : −I mais +M), c'est en général <strong>l'effet mésomère qui l'emporte</strong> lorsqu'il peut s'exercer (système conjugué présent) — c'est ce qui explique, par exemple, pourquoi les halogènes sont ortho/para-directeurs sur un cycle aromatique tout en le désactivant globalement.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un halogène sur un cycle aromatique désactive globalement le cycle (le rend moins réactif qu'un cycle non substitué), tout en orientant préférentiellement les réactions suivantes vers les positions ortho et para. Comment ces deux comportements, apparemment contradictoires (moins réactif dans l'ensemble, mais avec une préférence de position claire), peuvent-ils coexister sur la même molécule ?
    </div>

    <h3>4. Électrophiles, nucléophiles et types de réactions</h3>
    <p>Un réactif <strong>nucléophile</strong> possède une paire d'électrons disponible (base de Lewis) ; un réactif <strong>électrophile</strong> recherche des électrons (acide de Lewis). On classe les réactions organiques en trois grandes familles, chacune pouvant être nucléophile, électrophile ou radicalaire :</p>
    <table class="mini-table">
      <tr><th>Type de réaction</th><th>Description</th></tr>
      <tr><td>Substitution (S)</td><td>un atome/groupe du substrat est remplacé par un autre (SN, SE, SR)</td></tr>
      <tr><td>Addition (A)</td><td>se produit sur un substrat insaturé, sans départ d'atome (AN, AE, AR)</td></tr>
      <tr><td>Élimination (E)</td><td>départ d'un groupe d'atomes, créant une insaturation</td></tr>
    </table>
    <p>Une liaison peut se rompre de deux façons : <strong>hétérolytique</strong> (le doublet part entièrement avec l'un des deux atomes, formant des ions — réaction ionique) ou <strong>homolytique</strong> (chaque atome récupère un électron, formant des radicaux libres — réaction radicalaire).</p>

    <h3>5. Intermédiaires réactionnels</h3>
    <p>Un <strong>carbocation</strong> est un carbone hybridé $sp^2$ à structure plane, à orbitale $p$ vide. Sa stabilité augmente avec le nombre de substituants alkyles (effet inductif donneur +I et hyperconjugaison) : $CH_3^+ < R-CH_2^+ < R_2CH^+ < R_3C^+$. Un carbocation stabilisé par résonance (mésomérie) est encore plus stable.</p>
    <p>Un <strong>carbanion</strong> est l'inverse : un doublet non liant sur un carbone, stabilisé au contraire par des substituants électroattracteurs (−I, −M).</p>
    <p>Un <strong>radical libre</strong> possède un électron célibataire ; sa stabilité suit le même ordre que celle des carbocations (tertiaire > secondaire > primaire).</p>

    <h3>6. Contrôle cinétique et contrôle thermodynamique</h3>
    <p>Lorsqu'une réaction peut conduire à plusieurs produits, celui qui se forme le plus vite (énergie d'activation la plus basse) n'est pas toujours le plus stable thermodynamiquement. À basse température, on favorise souvent le <strong>produit cinétique</strong> (le plus rapide à se former) ; à température plus élevée ou en laissant le système s'équilibrer, on peut obtenir le <strong>produit thermodynamique</strong> (le plus stable).</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 110" width="100%">
          <line x1="15" y1="95" x2="205" y2="95" stroke="#3A4658" stroke-width="1"/>
          <path d="M15,80 Q45,40 70,50 Q90,60 110,85 Q130,45 150,25 Q170,55 195,98" stroke="#4C7CFF" stroke-width="1.8" fill="none"/>
          <text x="5" y="78" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">A+B</text>
          <text x="45" y="35" font-family="IBM Plex Mono" font-size="8" fill="#9B82FF">Ea1 (bas)</text>
          <text x="88" y="82" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">produit cinétique</text>
          <text x="118" y="20" font-family="IBM Plex Mono" font-size="8" fill="#9B82FF">Ea2 (haut)</text>
          <text x="150" y="105" font-family="IBM Plex Mono" font-size="8" fill="#2DD4C4">produit thermo.</text>
          <text x="100" y="108" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">avancement de la réaction</text>
        </svg>
        <span>Le produit cinétique franchit une barrière plus basse (Ea1) et se forme donc plus vite, mais le produit thermodynamique, obtenu en franchissant la barrière plus haute (Ea2), est plus stable (plus bas en énergie)</span>
      </div>
    </div>

    <h3>7. Les solvants et leur rôle</h3>
    <p>Un solvant joue un <strong>rôle physique</strong> (mettre les réactifs en contact intime, homogénéiser le milieu, permettre de contrôler la vitesse en ajustant la concentration) et un <strong>rôle chimique</strong> (peut être inerte, ou intervenir directement, notamment dans la dissociation de liaisons ioniques ou la stabilisation d'intermédiaires chargés).</p>
    <table class="mini-table">
      <tr><th>Classe de solvant</th><th>Caractéristique</th><th>Exemples</th></tr>
      <tr><td>Apolaire</td><td>moment dipolaire ≈ 0</td><td>hydrocarbures saturés (hexane...)</td></tr>
      <tr><td>Polaire protique</td><td>polaire, possède un H labile (liaison hydrogène)</td><td>eau, alcools</td></tr>
      <tr><td>Polaire aprotique</td><td>polaire, mais sans H labile</td><td>acétone, DMSO, THF, DMF</td></tr>
    </table>
    <p>Le choix du solvant influence fortement la vitesse et le mécanisme d'une réaction : un solvant polaire protique stabilise (et donc ralentit la réactivité d')un nucléophile par solvatation, tandis qu'un solvant polaire aprotique laisse le nucléophile plus « libre » et réactif.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un solvant polaire protique comme l'eau entoure et « emprisonne » un nucléophile chargé négativement par des liaisons hydrogène, réduisant sa réactivité effective. Sachant qu'un solvant polaire aprotique comme le DMSO ne peut pas former ce type de liaison hydrogène, pourquoi ce dernier laisse-t-il le nucléophile bien plus « libre » d'attaquer sa cible, malgré une polarité globalement comparable entre les deux solvants ?
    </div>

    <h3>8. Frontière de la recherche</h3>
    <p>La compréhension fine des effets électroniques et du choix des solvants reste au cœur de la conception rationnelle de médicaments modernes : les chimistes médicinaux modélisent aujourd'hui, par ordinateur, la distribution électronique précise d'une molécule candidate pour prédire son affinité avec une cible biologique avant même sa synthèse en laboratoire — une démarche qui accélère considérablement la découverte de nouveaux traitements. Par ailleurs, la chimie verte cherche activement à remplacer les solvants organiques polaires aprotiques traditionnels (souvent toxiques ou difficiles à recycler, comme le DMF) par des alternatives moins nocives pour l'environnement, tout en conservant leurs propriétés réactionnelles.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des solvants entièrement biosourcés et biodégradables, capables de reproduire fidèlement les propriétés de solvatation des solvants aprotiques polaires traditionnels utilisés en synthèse organique industrielle ? C'est un axe de recherche majeur en chimie verte contemporaine.</p>
    <p><strong>Technologie émergente :</strong> les liquides ioniques, des sels fondus à température ambiante aux propriétés de solvatation ajustables à volonté, sont explorés comme alternative moderne aux solvants organiques classiques, avec l'avantage d'une volatilité quasi nulle qui réduit les émissions de composés organiques volatils.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Polarisation des liaisons → effets inductif (σ, atténué) et mésomère (π, non atténué) → réactivité électrophile/nucléophile → intermédiaires réactionnels (carbocations, carbanions, radicaux) → solvant adapté → produit cinétique ou thermodynamique
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Réactivité} = f(\\text{effets inductifs} + \\text{effets mésomères} + \\text{solvant})
      $$
      Cette relation, plus conceptuelle qu'une formule numérique stricte, résume la démarche prédictive de tout ce chapitre : combiner l'analyse électronique d'une molécule avec le contexte du solvant permet d'anticiper, avant même de réaliser l'expérience, comment et où une molécule organique réagira.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>L'effet inductif se propage le long des liaisons σ en s'atténuant ; l'effet mésomère se délocalise sur un système conjugué sans s'atténuer</li>
        <li>Un carbocation est stabilisé par des groupes donneurs (+I, +M) ; un carbanion par des groupes attracteurs (−I, −M)</li>
        <li>Rupture hétérolytique → ions (réaction ionique) ; rupture homolytique → radicaux (réaction radicalaire)</li>
        <li>Le produit cinétique (le plus rapide) n'est pas forcément le produit thermodynamique (le plus stable)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que l'effet inductif ne s'atténue jamais — il devient négligeable au-delà de 3 liaisons environ</li>
        <li>Oublier qu'un halogène est à la fois −I (désactivant) ET +M (ortho/para-directeur) sur un cycle aromatique — les deux effets coexistent</li>
        <li>Confondre nucléophile (donneur d'électrons, attaque un site pauvre en électrons) et électrophile (l'inverse)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Parmi ces carbocations, lequel est a priori le plus stable ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="org2e1" value="wrong"> CH₃⁺ (méthyle)</label>
          <label class="option"><input type="radio" name="org2e1" value="wrong"> primaire (RCH₂⁺)</label>
          <label class="option"><input type="radio" name="org2e1" value="wrong"> secondaire (R₂CH⁺)</label>
          <label class="option"><input type="radio" name="org2e1" value="right"> tertiaire (R₃C⁺)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org2e1','org2fb1','Correct — plus il y a de groupes alkyles donneurs (+I) autour du carbone chargé, plus le carbocation est stabilisé.','Plus il y a de groupes alkyles (donneurs +I) autour du carbone chargé positivement, plus il est stable.')">Vérifier</button>
        <div class="feedback" id="org2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une rupture homolytique d'une liaison covalente conduit à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org2e2" value="wrong"> deux ions</label>
          <label class="option"><input type="radio" name="org2e2" value="right"> deux radicaux libres</label>
          <label class="option"><input type="radio" name="org2e2" value="wrong"> un seul produit neutre</label>
          <label class="option"><input type="radio" name="org2e2" value="wrong"> aucune rupture réelle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org2e2','org2fb2','Correct — chaque atome récupère un électron du doublet de liaison : on forme deux radicaux libres, d\\'où une réaction radicalaire.','Homolytique : chaque atome REPART avec un électron du doublet — pas avec les deux.')">Vérifier</button>
        <div class="feedback" id="org2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un solvant polaire aprotique se caractérise par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org2e3" value="wrong"> un moment dipolaire nul</label>
          <label class="option"><input type="radio" name="org2e3" value="right"> une polarité marquée, mais sans hydrogène labile</label>
          <label class="option"><input type="radio" name="org2e3" value="wrong"> la présence obligatoire d'un groupe −OH</label>
          <label class="option"><input type="radio" name="org2e3" value="wrong"> une inertie chimique totale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org2e3','org2fb3','Correct — le DMSO, l\\'acétone ou le THF sont polaires (moment dipolaire non nul) mais n\\'ont pas d\\'hydrogène labile capable de former une liaison hydrogène forte avec un nucléophile.','Polaire aprotique = polaire (donc pas apolaire), mais SANS hydrogène labile — contrairement à l\\'eau ou aux alcools.')">Vérifier</button>
        <div class="feedback" id="org2fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'effet mésomère s'atténuait avec la distance, comme l'effet inductif : comment la réactivité des systèmes aromatiques étendus (comme le naphtalène) en serait-elle changée ?</li>
        <li>Pourquoi le langage des flèches courbes d'Ingold, purement graphique, reste-t-il un outil de prédiction aussi puissant que des calculs de mécanique quantique bien plus complexes ?</li>
        <li>Quelle serait la conséquence, pour l'industrie chimique mondiale, d'une interdiction totale des solvants organiques toxiques sans alternative immédiatement disponible ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>C. K. Ingold, <em>Structure and Mechanism in Organic Chemistry</em>, Cornell University Press, 1953 — ouvrage fondateur du langage des mécanismes réactionnels en chimie organique.</li>
        <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur les effets électroniques et la réactivité en licence.</li>
        <li>P. T. Anastas, J. C. Warner, <em>Green Chemistry: Theory and Practice</em>, Oxford University Press, 1998 — référence fondatrice de la chimie verte et du choix raisonné des solvants.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais des outils conceptuels — effets inductifs, mésomères, intermédiaires réactionnels, solvants — qui te permettront de comprendre chaque mécanisme réactionnel du reste de ce module. Le chapitre suivant, « Isomérie et stéréochimie », va explorer une dimension supplémentaire de la structure moléculaire : comment deux molécules de même formule brute peuvent avoir des propriétés radicalement différentes selon leur arrangement spatial. Comme le rappelle l'héritage de Christopher Ingold : une simple flèche courbe, bien placée, peut révéler en un instant ce qu'une observation expérimentale brute mettrait des années à élucider.</p>
  `
};

ORG_NOVA_KB[orgKey('Effets électroniques, réactivité et solvants')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Effets électroniques, réactivité et solvants ». Demande-moi la différence entre effet inductif et mésomère, ou un indice sur un exercice.",
  rules: [
    { test:/effet inducti|effet .I./i, replies:["L'effet inductif (I) se propage le long des liaisons σ en s'atténuant avec la distance (négligeable au-delà de 3 liaisons). −I appauvrit la chaîne en électrons (halogènes, NO2...), +I l'enrichit (groupes alkyles)."] },
    { test:/effet m[ée]som[èe]re|effet .M./i, replies:["L'effet mésomère (M) correspond à la délocalisation d'électrons π ou de doublets non liants sur un système conjugué, sans s'atténuer avec la distance dans ce système. +M donne des électrons (NH2, OH...), −M en retire (C=O, NO2, CN...)."] },
    { test:/[ée]lectrophile/i, replies:["Un électrophile est un réactif pauvre en électrons qui en recherche (acide de Lewis) — il attaque les zones riches en électrons d'une molécule."] },
    { test:/nucl[ée]ophile/i, replies:["Un nucléophile possède un doublet d'électrons disponible (base de Lewis) — il attaque les zones pauvres en électrons (électrophiles) d'une molécule."] },
    { test:/carbocation/i, replies:["Un carbocation est un carbone sp2 plan, à orbitale p vide. Sa stabilité croît avec le nombre de groupes alkyles voisins : CH3+ < primaire < secondaire < tertiaire."] },
    { test:/carbanion/i, replies:["Un carbanion porte un doublet non liant sur le carbone. Contrairement au carbocation, il est stabilisé par des groupes ATTRACTEURS (−I, −M)."] },
    { test:/radical libre|homolytique/i, replies:["Une rupture homolytique partage le doublet de liaison à parts égales, formant deux radicaux libres — c'est le point de départ d'une réaction radicalaire (comme l'halogénation des alcanes)."] },
    { test:/h[ée]t[ée]rolytique/i, replies:["Une rupture hétérolytique donne tout le doublet de liaison à l'un des deux atomes, formant deux ions — c'est le point de départ d'une réaction ionique."] },
    { test:/cin[ée]tique.*thermodynamique|thermodynamique.*cin[ée]tique|contr[oô]le/i, replies:["Le produit cinétique se forme le plus vite (barrière d'activation la plus basse) ; le produit thermodynamique est le plus stable (énergie la plus basse). Ce ne sont pas toujours les mêmes !"] },
    { test:/solvant/i, replies:["Un solvant polaire protique a un H labile (eau, alcools) ; un solvant polaire aprotique est polaire mais sans H labile (acétone, DMSO, THF) ; un solvant apolaire a un moment dipolaire quasi nul (hydrocarbures)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : plus de groupes alkyles (+I) autour du carbone chargé = plus stable.","Indice niveau 2 : classe du moins substitué au plus substitué.","Indice niveau 3 : le tertiaire (R3C+) est le plus stable."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : homolytique veut dire « à parts égales ».","Indice niveau 2 : chaque atome repart avec UN électron du doublet.","Indice niveau 3 : ça forme deux radicaux libres."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense au DMSO ou à l'acétone.","Indice niveau 2 : ils sont polaires, mais ont-ils un H labile ?","Indice niveau 3 : non — c'est ça, un solvant polaire APROTIQUE."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 2 — Simulateur de conformation : projection de Newman de l'éthane (Chapitre 3)
--------------------------------------------------------------------------------- */
function updateOrgNewman(){
  const theta = parseFloat(document.getElementById('orgDihedral').value);
  document.getElementById('orgDihedralVal').textContent = theta + '°';
  const cx = 80, cy = 80, backR = 34, frontLen = 34, backLen = 26;
  const frontAngles = [-90, 30, 150];
  const backAngles = frontAngles.map(a => a + theta);
  const toXY = (angDeg, r) => {
    const rad = angDeg * Math.PI / 180;
    return [cx + r*Math.cos(rad), cy + r*Math.sin(rad)];
  };
  for(let i=0;i<3;i++){
    const [fx,fy] = toXY(frontAngles[i], frontLen);
    document.getElementById('orgFrontBond'+i).setAttribute('x2', fx);
    document.getElementById('orgFrontBond'+i).setAttribute('y2', fy);
    const [bx1,by1] = toXY(backAngles[i], backR);
    const [bx2,by2] = toXY(backAngles[i], backR + backLen);
    document.getElementById('orgBackBond'+i).setAttribute('x1', bx1);
    document.getElementById('orgBackBond'+i).setAttribute('y1', by1);
    document.getElementById('orgBackBond'+i).setAttribute('x2', bx2);
    document.getElementById('orgBackBond'+i).setAttribute('y2', by2);
  }
  const thetaRad = theta * Math.PI / 180;
  const energy = 1.45 * (1 + Math.cos(3*thetaRad));
  document.getElementById('orgEnergyDot').setAttribute('cx', 20 + (theta/360)*180);
  document.getElementById('orgEnergyDot').setAttribute('cy', 95 - (energy/2.9)*70);
  const mod = ((theta % 120) + 120) % 120;
  const isStaggered = Math.abs(mod - 60) < 15;
  const isEclipsed = mod < 15 || mod > 105;
  let conf = "intermédiaire";
  if(isStaggered) conf = "décalée (staggered) — la plus stable";
  else if(isEclipsed) conf = "éclipsée (eclipsed) — la moins stable";
  document.getElementById('orgNewmanReadout').innerHTML =
    `Angle dièdre θ = ${theta}° — énergie de torsion ≈ <strong>${energy.toFixed(2)} kcal/mol</strong><br>Conformation ${conf}.`;
}
function initOrgNewman(){ updateOrgNewman(); }

/* =========================== CHAPITRE 3 — Isomérie et stéréochimie =========================== */
ORG_CHAPTERS[orgKey('Isomérie et stéréochimie')] = {
  objectives: [
    "Relier l'hybridation d'un atome (sp³, sp², sp) à la géométrie des liaisons qu'il forme",
    "Distinguer isomérie plane et stéréoisomérie, et identifier un cas d'isomérie géométrique (Z/E, cis/trans)",
    "Reconnaître un carbone asymétrique et attribuer un descripteur de configuration R ou S",
    "Représenter une molécule selon Newman, Fischer ou en perspective, et analyser ses conformations",
    "Évaluer pourquoi une catastrophe sanitaire majeure du XXe siècle a révélé, de la façon la plus tragique, l'importance vitale de la stéréochimie en pharmacologie"
  ],
  prereqs: ["Effets électroniques, réactivité et solvants"],
  bodyHtml: `
    <p>Dans les années 1950-1960, un médicament sédatif nommé thalidomide est prescrit à des milliers de femmes enceintes à travers le monde pour soulager les nausées matinales — jusqu'à ce que l'on découvre, dans la douleur, qu'il provoque de graves malformations congénitales chez des dizaines de milliers d'enfants. L'explication de ce drame, comprise seulement plus tard, tient à un détail à première vue microscopique : la thalidomide existe sous deux formes énantiomères, images miroir l'une de l'autre, dont l'une soulage effectivement les nausées tandis que l'autre est tératogène. Pire encore, une fois administrée, la molécule bénéfique se convertit spontanément dans l'organisme en sa forme dangereuse — rendant la séparation des deux formes totalement inefficace comme précaution.</p>
    <p>Cette tragédie, aujourd'hui étudiée dans chaque faculté de pharmacie du monde, a définitivement établi que la stéréochimie — l'arrangement spatial précis des atomes d'une molécule — n'est jamais un détail académique secondaire, mais une question de vie ou de mort en pharmacologie. Depuis, les autorités de santé exigent systématiquement l'étude séparée de chaque énantiomère d'un nouveau médicament avant toute mise sur le marché, une exigence directement héritée de cette catastrophe.</p>
    <p>La stéréoisomérie moléculaire décrit la position relative dans l'espace des atomes conformant l'enchaînement des liaisons d'une molécule. Elle utilise des procédés conventionnels comme la représentation spatiale et des outils de calcul informatique. À la fin de ce chapitre, tu sauras identifier et nommer précisément chaque type d'isomérie, et comprendre pourquoi deux molécules d'apparence presque identique peuvent avoir des effets biologiques radicalement opposés.</p>

    <h3>1. Hybridation et géométrie</h3>
    <p>Selon le nombre de liaisons σ et de doublets non liants qu'il porte, un atome de carbone (ou d'azote, d'oxygène) adopte l'une de ces trois hybridations :</p>
    <table class="mini-table">
      <tr><th>Hybridation</th><th>Géométrie</th><th>Angle</th><th>Exemple</th></tr>
      <tr><td>$sp^3$</td><td>tétraédrique</td><td>109°28'</td><td>méthane $CH_4$</td></tr>
      <tr><td>$sp^2$</td><td>plane (trigonale)</td><td>120°</td><td>éthylène $H_2C=CH_2$</td></tr>
      <tr><td>$sp$</td><td>linéaire</td><td>180°</td><td>acétylène $HC\\equiv CH$</td></tr>
    </table>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 240 90" width="100%">
          <circle cx="35" cy="45" r="3" fill="#F0B94D"/>
          <line x1="35" y1="45" x2="35" y2="20" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="35" y1="45" x2="13.3" y2="57.5" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="35" y1="45" x2="56.7" y2="57.5" stroke="#EAF0FB" stroke-width="3"/>
          <line x1="35" y1="45" x2="35" y2="70" stroke="#EAF0FB" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="6" y="84" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">sp³ (109°28')</text>
          <circle cx="115" cy="45" r="3" fill="#2DD4C4"/>
          <line x1="115" y1="45" x2="115" y2="20" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="115" y1="45" x2="136.7" y2="57.5" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="115" y1="45" x2="93.3" y2="57.5" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="95" y="84" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">sp² (120°)</text>
          <circle cx="195" cy="45" r="3" fill="#9B82FF"/>
          <line x1="195" y1="45" x2="170" y2="45" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="195" y1="45" x2="220" y2="45" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="178" y="84" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">sp (180°)</text>
        </svg>
        <span>Les trois géométries de base du carbone selon son hybridation</span>
      </div>
    </div>
    <p>La double liaison $C=C$ (une liaison σ + une liaison π) entraîne l'<strong>absence de libre rotation</strong> autour d'elle — contrairement à une liaison simple, qui tourne librement (sauf contrainte de cycle).</p>

    <h3>2. Isomérie plane et stéréoisomérie</h3>
    <p>Des isomères ont la même formule brute mais des formules développées différentes.</p>
    <table class="mini-table">
      <tr><th>Type d'isomérie plane</th><th>Différence</th></tr>
      <tr><td>De chaîne (ou squelette)</td><td>chaînes carbonées différentes (linéaire / ramifiée)</td></tr>
      <tr><td>De position</td><td>même chaîne, même fonction, mais fonction sur un carbone différent</td></tr>
      <tr><td>De fonction (constitution)</td><td>fonctions chimiques différentes pour la même formule brute</td></tr>
    </table>
    <p>La <strong>stéréoisomérie</strong> regroupe les isomères qui ont la même formule développée mais une disposition spatiale différente : <strong>isomérie géométrique</strong> (Z/E, cis/trans) et <strong>stéréoisomérie optique</strong> (énantiomères, diastéréoisomères).</p>

    <h3>3. Isomérie géométrique (Z/E, cis/trans)</h3>
    <p>Une double liaison $C=C$ ne tournant pas librement, si chaque carbone porte deux substituants différents, deux arrangements spatiaux distincts sont possibles.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 250 100" width="100%">
          <line x1="30" y1="55" x2="75" y2="55" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="30" y1="59" x2="75" y2="59" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="30" y1="55" x2="17" y2="32.5" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="75" y1="55" x2="88" y2="77.5" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="0" y="28" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">CH₃</text>
          <text x="83" y="92" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">CH₃</text>
          <text x="10" y="95" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">trans (E) : Téb +1°C</text>
          <line x1="160" y1="55" x2="205" y2="55" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="160" y1="59" x2="205" y2="59" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="160" y1="55" x2="147" y2="32.5" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="205" y1="55" x2="218" y2="32.5" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="130" y="28" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">CH₃</text>
          <text x="213" y="28" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">CH₃</text>
          <text x="145" y="95" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">cis (Z) : Téb +4°C</text>
        </svg>
        <span>but-2-ène : en trans, les deux CH₃ sont de part et d'autre de la double liaison ; en cis, du même côté (encombrement, point d'ébullition plus élevé)</span>
      </div>
    </div>
    <p>Quand les deux substituants d'un même carbone sont différents mais qu'on ne peut pas trivialement dire lequel est « prioritaire », on utilise les <strong>règles de Cahn-Ingold-Prelog (CIP)</strong> pour définir les descripteurs <strong>Z</strong> (substituants prioritaires du même côté) et <strong>E</strong> (de part et d'autre).</p>

    <h3>4. Analyse conformationnelle</h3>
    <p>Une liaison simple $C-C$ tourne librement, mais toutes les positions ne sont pas équivalentes en énergie. On représente ces conformations par la <strong>projection de Newman</strong> (on regarde la molécule dans l'axe de la liaison C-C).</p>
    <table class="mini-table">
      <tr><th>Conformation</th><th>Angle dièdre typique</th><th>Énergie</th></tr>
      <tr><td>Décalée (staggered)</td><td>60°, 180°, 300°</td><td>minimum (la plus stable)</td></tr>
      <tr><td>Éclipsée (eclipsed)</td><td>0°, 120°, 240°</td><td>maximum (la moins stable)</td></tr>
    </table>
    <p>Pour le cyclohexane, deux conformations principales existent : la <strong>chaise</strong> (la plus stable, sans tension) et le <strong>bateau</strong> (moins stable, tension de torsion et interactions défavorables).</p>

    <h3>5. Chiralité et carbone asymétrique</h3>
    <p>Une molécule est <strong>chirale</strong> si elle n'est pas superposable à son image dans un miroir (comme une main). Un <strong>carbone asymétrique</strong> ($C^*$), porteur de 4 substituants tous différents, rend généralement une molécule chirale.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 90" width="100%">
          <circle cx="50" cy="45" r="3" fill="#F0B94D"/>
          <line x1="50" y1="45" x2="50" y2="20" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="50" y1="45" x2="28.3" y2="57.5" stroke="#EAF0FB" stroke-width="3"/>
          <line x1="50" y1="45" x2="71.7" y2="57.5" stroke="#EAF0FB" stroke-width="1" stroke-dasharray="3,2"/>
          <line x1="50" y1="45" x2="50" y2="70" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="45" y="14" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">a</text>
          <text x="14" y="63" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">b</text>
          <text x="78" y="63" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">c</text>
          <text x="45" y="82" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">d</text>
          <text x="110" y="49" font-family="IBM Plex Mono" font-size="14" fill="#EAF0FB">≠</text>
          <circle cx="170" cy="45" r="3" fill="#F0B94D"/>
          <line x1="170" y1="45" x2="170" y2="20" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="170" y1="45" x2="191.7" y2="57.5" stroke="#EAF0FB" stroke-width="3"/>
          <line x1="170" y1="45" x2="148.3" y2="57.5" stroke="#EAF0FB" stroke-width="1" stroke-dasharray="3,2"/>
          <line x1="170" y1="45" x2="170" y2="70" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="165" y="14" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">a</text>
          <text x="196" y="63" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">b</text>
          <text x="128" y="63" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">c</text>
          <text x="165" y="82" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">d</text>
        </svg>
        <span>Deux énantiomères : images l'un de l'autre dans un miroir, non superposables</span>
      </div>
    </div>
    <p>Deux molécules chirales, images l'une de l'autre par un plan, sont des <strong>énantiomères</strong>. Elles ont les mêmes propriétés physiques et chimiques « classiques », mais dévient la lumière polarisée dans des sens opposés (<strong>activité optique</strong>) et peuvent avoir des propriétés biologiques très différentes.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Deux énantiomères ont rigoureusement les mêmes propriétés physico-chimiques classiques (point de fusion, densité, solubilité), mais peuvent avoir des effets biologiques radicalement opposés — comme dans le cas tragique de la thalidomide. Sachant que les récepteurs biologiques de notre organisme sont eux-mêmes des molécules chirales (protéines), comment cette chiralité biologique explique-t-elle qu'un « simple » miroir moléculaire puisse faire une telle différence sur l'effet d'un médicament ?
    </div>

    <h3>6. Descripteur de configuration R/S (règles CIP)</h3>
    <p>Pour un carbone asymétrique, on classe les 4 substituants par ordre de priorité décroissante (règles de Cahn-Ingold-Prelog, basées sur le numéro atomique). On place le substituant de plus basse priorité à l'arrière, puis on regarde le sens de rotation 1→2→3 des trois autres : <strong>horaire = R</strong> (rectus), <strong>antihoraire = S</strong> (sinister).</p>
    <p>Dans la <strong>représentation de Fischer</strong>, la chaîne carbonée principale est verticale (le carbone le plus oxydé en haut), les liaisons horizontales pointent vers l'observateur et les liaisons verticales s'éloignent de lui.</p>

    <h3>7. Molécules à plusieurs carbones asymétriques</h3>
    <p>Pour $n$ carbones asymétriques, on observe au maximum $2^n$ isomères optiques, soit $2^{n-1}$ couples d'énantiomères. Deux stéréoisomères qui ne sont <strong>pas</strong> images l'un de l'autre dans un miroir sont des <strong>diastéréoisomères</strong> (propriétés physiques et chimiques différentes, contrairement aux énantiomères).</p>
    <div class="key-point">
      <span class="eyebrow">Cas particulier : la forme méso</span>
      Quand une molécule à plusieurs $C^*$ possède un plan de symétrie interne, deux de ses configurations qui semblaient être des énantiomères se confondent en une seule molécule <strong>achirale</strong> : c'est la <strong>forme méso</strong>, optiquement inactive malgré la présence de carbones asymétriques.
    </div>
    <p>Un <strong>épimère</strong> est un cas particulier de diastéréoisomère : deux isomères optiques qui ne diffèrent que par la configuration absolue d'un seul carbone asymétrique (les autres étant identiques).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La forme méso, malgré la présence de carbones asymétriques, est optiquement inactive à cause d'un plan de symétrie interne qui « annule » sa rotation optique. En reliant cela à ce que tu sais désormais des énantiomères, pourquoi cette molécule unique agit-elle, en quelque sorte, comme son propre mélange racémique interne ?
    </div>

    <h3>8. Frontière de la recherche</h3>
    <p>La tragédie de la thalidomide a durablement transformé la réglementation pharmaceutique mondiale : depuis les années 1990, les agences de santé (FDA, EMA) exigent systématiquement une caractérisation stéréochimique complète de tout nouveau médicament chiral, y compris l'étude séparée de chaque énantiomère lorsque cela est techniquement possible. La synthèse asymétrique, qui vise à produire sélectivement un seul énantiomère plutôt qu'un mélange racémique, est aujourd'hui un domaine de recherche majeur en chimie organique, récompensé par plusieurs prix Nobel de chimie (notamment en 2001, pour les travaux de Knowles, Noyori et Sharpless sur les réactions catalytiques asymétriques).</p>
    <p><strong>Question ouverte :</strong> peut-on développer des méthodes de synthèse asymétrique suffisamment efficaces et peu coûteuses pour rendre systématique, dans l'industrie pharmaceutique, la production d'un seul énantiomère pur plutôt que d'un mélange racémique à séparer a posteriori ? C'est un enjeu économique et scientifique majeur de la chimie pharmaceutique moderne.</p>
    <p><strong>Technologie émergente :</strong> les catalyseurs chiraux de nouvelle génération, capables d'orienter une réaction chimique vers la production sélective d'un seul énantiomère avec une efficacité croissante, sont au cœur de la recherche en chimie organique de synthèse pour l'industrie pharmaceutique et agrochimique.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Hybridation (sp³/sp²/sp) → géométrie moléculaire → isomérie plane (chaîne/position/fonction) ou stéréoisomérie (géométrique Z/E, optique R/S) → énantiomères vs diastéréoisomères → activité biologique potentiellement très différente
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Nombre maximal d'isomères optiques} = 2^n \\quad (n = \\text{nombre de carbones asymétriques})$$
      Cette formule combinatoire, apparemment abstraite, a des conséquences bien réelles et parfois tragiques comme le rappelle l'histoire de la thalidomide : chaque carbone asymétrique supplémentaire dans une molécule double le nombre de stéréoisomères possibles, dont chacun peut avoir un comportement biologique totalement différent des autres.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>sp³ = tétraédrique (109°), sp² = plan (120°), sp = linéaire (180°)</li>
        <li>Isomérie plane : chaîne, position ou fonction différente. Stéréoisomérie : même formule développée, disposition spatiale différente</li>
        <li>Conformation décalée = plus stable ; conformation éclipsée = moins stable</li>
        <li>Énantiomères = images miroir non superposables (mêmes propriétés physico-chimiques classiques) ; diastéréoisomères = stéréoisomères qui ne sont pas énantiomères (propriétés différentes)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier qu'une double liaison bloque la rotation — c'est ce qui permet l'isomérie cis/trans, impossible sur une liaison simple libre</li>
        <li>Attribuer R/S sans placer le substituant de plus basse priorité à l'arrière — l'ordre de lecture s'inverse sinon</li>
        <li>Croire qu'une molécule avec plusieurs C* est automatiquement chirale — une forme méso, malgré ses C*, est achirale</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — conformations de l'éthane (projection de Newman)</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Fais tourner l'angle dièdre entre les deux groupes CH₃ et observe la projection de Newman ainsi que l'énergie de torsion associée.</p>
      <div class="sim-2col">
        <svg viewBox="0 0 160 160" width="180" height="180">
          <circle cx="80" cy="80" r="34" fill="none" stroke="#5A6472" stroke-width="1.4"/>
          <line id="orgFrontBond0" x1="80" y1="80" x2="80" y2="46" stroke="#4C7CFF" stroke-width="2.2"/>
          <line id="orgFrontBond1" x1="80" y1="80" x2="109" y2="97" stroke="#4C7CFF" stroke-width="2.2"/>
          <line id="orgFrontBond2" x1="80" y1="80" x2="51" y2="97" stroke="#4C7CFF" stroke-width="2.2"/>
          <line id="orgBackBond0" x1="80" y1="46" x2="80" y2="20" stroke="#F0B94D" stroke-width="2.2"/>
          <line id="orgBackBond1" x1="109" y1="97" x2="130" y2="112" stroke="#F0B94D" stroke-width="2.2"/>
          <line id="orgBackBond2" x1="51" y1="97" x2="30" y2="112" stroke="#F0B94D" stroke-width="2.2"/>
          <circle cx="80" cy="80" r="3" fill="#4C7CFF"/>
        </svg>
        <div class="sim-controls">
          <label>Angle dièdre θ : <span id="orgDihedralVal">60°</span></label>
          <input type="range" id="orgDihedral" min="0" max="360" step="5" value="60" oninput="updateOrgNewman()">
          <svg viewBox="0 0 200 100" width="200" height="100" style="margin-top:8px;">
            <line x1="15" y1="95" x2="200" y2="95" stroke="#3A4658" stroke-width="1"/>
            <line x1="20" y1="25" x2="20" y2="95" stroke="#3A4658" stroke-width="1"/>
            <polyline points="20.0,25.0 25.0,29.7 30.0,42.5 35.0,60.0 40.0,77.5 45.0,90.3 50.0,95.0 55.0,90.3 60.0,77.5 65.0,60.0 70.0,42.5 75.0,29.7 80.0,25.0 85.0,29.7 90.0,42.5 95.0,60.0 100.0,77.5 105.0,90.3 110.0,95.0 115.0,90.3 120.0,77.5 125.0,60.0 130.0,42.5 135.0,29.7 140.0,25.0 145.0,29.7 150.0,42.5 155.0,60.0 160.0,77.5 165.0,90.3 170.0,95.0 175.0,90.3 180.0,77.5 185.0,60.0 190.0,42.5 195.0,29.7 200.0,25.0" stroke="#5A6472" stroke-width="1.2" fill="none"/>
            <circle id="orgEnergyDot" cx="50" cy="95" r="4" fill="#F0B94D"/>
          </svg>
          <div class="sim-readout" id="orgNewmanReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Deux stéréoisomères qui ne sont PAS images l'un de l'autre dans un miroir sont des :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org3e1" value="wrong"> énantiomères</label>
          <label class="option"><input type="radio" name="org3e1" value="right"> diastéréoisomères</label>
          <label class="option"><input type="radio" name="org3e1" value="wrong"> isomères de position</label>
          <label class="option"><input type="radio" name="org3e1" value="wrong"> isomères de fonction</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org3e1','org3fb1','Correct — s\\'ils sont images l\\'un de l\\'autre, ce sont des énantiomères ; sinon, ce sont des diastéréoisomères.','Le mot clé est « PAS images l\\'un de l\\'autre » — ça exclut la définition des énantiomères.')">Vérifier</button>
        <div class="feedback" id="org3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une conformation décalée (staggered) de l'éthane correspond à un angle dièdre de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org3e2" value="wrong"> 0°</label>
          <label class="option"><input type="radio" name="org3e2" value="right"> 60°</label>
          <label class="option"><input type="radio" name="org3e2" value="wrong"> 90°</label>
          <label class="option"><input type="radio" name="org3e2" value="wrong"> 120°</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org3e2','org3fb2','Correct — les conformations décalées (les plus stables) se trouvent à 60°, 180°, 300°.','Regarde le simulateur : à quel angle l\\'énergie de torsion est-elle minimale ?')">Vérifier</button>
        <div class="feedback" id="org3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une molécule possédant 3 carbones asymétriques (C*) distincts admet au maximum :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org3e3" value="wrong"> 3 stéréoisomères</label>
          <label class="option"><input type="radio" name="org3e3" value="wrong"> 6 stéréoisomères</label>
          <label class="option"><input type="radio" name="org3e3" value="right"> 8 stéréoisomères</label>
          <label class="option"><input type="radio" name="org3e3" value="wrong"> 9 stéréoisomères</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org3e3','org3fb3','Correct — 2ⁿ avec n=3 donne 2³=8 isomères optiques possibles, soit 4 couples d\\'énantiomères.','Applique la formule 2ⁿ avec n = nombre de carbones asymétriques.')">Vérifier</button>
        <div class="feedback" id="org3fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si les récepteurs biologiques de notre organisme n'étaient pas eux-mêmes chiraux : les énantiomères d'un médicament auraient-ils encore des effets différents ?</li>
        <li>Pourquoi la tragédie de la thalidomide a-t-elle mis autant de temps à être comprise scientifiquement, alors que la notion d'énantiomérie était déjà connue des chimistes depuis Pasteur au XIXe siècle ?</li>
        <li>Quelle serait la conséquence, pour l'industrie pharmaceutique, d'une interdiction totale de commercialiser tout médicament sous forme de mélange racémique, sans étude séparée de chaque énantiomère ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>L. Pasteur, « Recherches sur les relations qui peuvent exister entre la forme cristalline, la composition chimique et le sens de la polarisation rotatoire », Annales de Chimie et de Physique, 1848 — travaux fondateurs sur la chiralité moléculaire.</li>
        <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur l'isomérie et la stéréochimie en licence.</li>
        <li>W. S. Knowles, R. Noyori, K. B. Sharpless, « Catalytic Asymmetric Synthesis », Nobel Lectures, prix Nobel de chimie 2001.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais pourquoi deux molécules d'apparence presque identique — de simples images miroir l'une de l'autre — peuvent avoir des conséquences aussi radicalement différentes sur un organisme vivant. Le chapitre suivant, « Alcanes, alcènes et alcynes », va appliquer concrètement ces notions de structure et de géométrie aux hydrocarbures les plus simples, base de toute la chimie organique. Comme le disait Louis Pasteur, pionnier de la stéréochimie, après avoir observé pour la première fois au microscope deux cristaux images l'un de l'autre : « Le hasard ne favorise que les esprits préparés. » Tu es désormais préparé à reconnaître, toi aussi, ces différences invisibles mais essentielles.</p>
  `,
  init: initOrgNewman
};

ORG_NOVA_KB[orgKey('Isomérie et stéréochimie')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Isomérie et stéréochimie ». Demande-moi la différence entre énantiomères et diastéréoisomères, comment attribuer R/S, ou un indice sur un exercice.",
  rules: [
    { test:/hybridation|sp3|sp2\b|sp²|sp\b/i, replies:["sp³ = géométrie tétraédrique (109°28'), comme le méthane. sp² = plane, 120°, comme l'éthylène (double liaison). sp = linéaire, 180°, comme l'acétylène (triple liaison)."] },
    { test:/isomer.*plane|isom[ée]rie plane/i, replies:["L'isomérie plane regroupe 3 cas : de chaîne (squelette carboné différent), de position (fonction sur un carbone différent), de fonction (fonctions chimiques différentes)."] },
    { test:/cis.*trans|z.*e\b|isom[ée]rie g[ée]om[ée]trique/i, replies:["L'isomérie géométrique (cis/trans ou Z/E) existe quand une double liaison bloque la rotation ET que chaque carbone de la double liaison porte deux substituants différents."] },
    { test:/newman|conformation|d[ée]cal[ée]e|[ée]clips[ée]e/i, replies:["La projection de Newman regarde la molécule dans l'axe d'une liaison C-C. La conformation décalée (staggered, 60°/180°/300°) est la plus stable ; l'éclipsée (0°/120°/240°) est la moins stable."] },
    { test:/chiral/i, replies:["Une molécule chirale n'est pas superposable à son image dans un miroir — comme une main. Un carbone asymétrique (4 substituants différents) rend souvent une molécule chirale."] },
    { test:/[ée]nantiom[èe]re/i, replies:["Deux énantiomères sont des images l'un de l'autre dans un miroir, non superposables. Mêmes propriétés physico-chimiques classiques, mais dévient la lumière polarisée en sens opposés."] },
    { test:/diast[ée]r[ée]oisom[èe]re/i, replies:["Deux diastéréoisomères sont des stéréoisomères qui NE SONT PAS images l'un de l'autre dans un miroir — propriétés physiques et chimiques différentes, contrairement aux énantiomères."] },
    { test:/m[ée]so/i, replies:["Une forme méso a plusieurs carbones asymétriques MAIS un plan de symétrie interne : elle est en fait achirale et optiquement inactive, malgré la présence de C*."] },
    { test:/r.*s\b|cahn|cip|descripteur de configuration/i, replies:["Règles CIP : classe les 4 substituants du C* par priorité décroissante, place le moins prioritaire à l'arrière, regarde le sens 1→2→3 des trois autres : horaire = R, antihoraire = S."] },
    { test:/fischer/i, replies:["Dans une représentation de Fischer, la chaîne carbonée est verticale (carbone le plus oxydé en haut) ; les traits horizontaux pointent VERS toi, les traits verticaux s'éloignent de toi."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le mot clé de la question est « PAS images l'un de l'autre ».","Indice niveau 2 : ça exclut la définition des énantiomères.","Indice niveau 3 : ce sont des diastéréoisomères."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise le simulateur et repère le minimum d'énergie.","Indice niveau 2 : le minimum se trouve à 60°, 180° et 300°.","Indice niveau 3 : réponse — 60°."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : applique 2ⁿ.","Indice niveau 2 : n=3 carbones asymétriques.","Indice niveau 3 : 2³ = 8."] }
  ]
};

/* =========================== CHAPITRE 4 — Alcanes, alcènes et alcynes =========================== */
ORG_CHAPTERS[orgKey('Alcanes, alcènes et alcynes')] = {
  objectives: [
    "Décrire les propriétés physiques et chimiques des alcanes, alcènes et alcynes",
    "Écrire le mécanisme de la substitution radicalaire des alcanes",
    "Prévoir le produit majoritaire d'une addition électrophile sur un alcène (règle de Markovnikov)",
    "Distinguer les réactions caractéristiques des alcynes vrais liées à l'acidité de l'hydrogène terminal",
    "Évaluer pourquoi la règle de Markovnikov, formulée empiriquement en 1870 sans qu'on comprenne encore les mécanismes réactionnels, s'est révélée être une prédiction fondamentalement correcte de la stabilité relative des carbocations"
  ],
  prereqs: ["Isomérie et stéréochimie"],
  bodyHtml: `
    <p>En 1870, le chimiste russe Vladimir Markovnikov énonce, à partir de la seule observation expérimentale et sans le moindre concept de carbocation ou de mécanisme électronique (ces notions n'existeraient que des décennies plus tard), une règle empirique décrivant le produit majoritaire d'une addition sur un alcène dissymétrique. Cette règle, formulée à l'aveugle sur le plan théorique, se révélera un demi-siècle plus tard parfaitement cohérente avec la compréhension moderne de la stabilité relative des carbocations — une remarquable anticipation empirique d'un mécanisme que son auteur ne pouvait alors même pas concevoir.</p>
    <p>Cette famille de réactions — substitution radicalaire, addition électrophile, chimie des alcynes vrais — n'a rien d'un simple exercice de mémorisation : elle constitue le socle mécanistique sur lequel repose la quasi-totalité de l'industrie pétrochimique moderne, du craquage catalytique qui transforme le pétrole brut en carburants utilisables jusqu'à la polymérisation industrielle des alcènes qui produit les plastiques omniprésents dans notre quotidien.</p>
    <p>Les hydrocarbures — composés de carbone et d'hydrogène uniquement — se distinguent par leur degré de saturation : les alcanes ne comportent que des liaisons simples, les alcènes une (ou plusieurs) double liaison, les alcynes une (ou plusieurs) triple liaison. Ce degré de saturation gouverne entièrement leur réactivité. À la fin de ce chapitre, tu sauras prédire, à partir de la seule structure d'un hydrocarbure, quel mécanisme et quel produit majoritaire attendre de sa réaction avec un réactif donné.</p>

    <h3>1. Les alcanes ($C_nH_{2n+2}$)</h3>
    <p>Ce sont des molécules saturées, hybridées $sp^3$. On les trouve à l'état naturel : de $C_1$ à $C_4$, ce sont les gaz naturels (méthane, éthane, propane, butane) ; de $C_5$ à $C_{16}$, ce sont les constituants du pétrole. <strong>Propriétés physiques :</strong> hydrophobes, densité $<1$ ; à partir de $C_{17}$ ils deviennent solides (paraffines). Les chaînes ramifiées ont un point d'ébullition plus bas que l'isomère linéaire correspondant.</p>
    <p><strong>Propriétés chimiques :</strong> ce sont des molécules peu réactives (saturées, non polaires). Les seules réactions observées sont l'oxydation (combustion) et la <strong>substitution radicalaire</strong>.</p>
    <div class="key-point">
      <span class="eyebrow">Mécanisme de la substitution radicalaire (halogénation)</span>
      <strong>Initiation :</strong> $Cl_2 \\xrightarrow{h\\nu} 2\\,Cl^{\\bullet}$ (rupture homolytique sous la lumière).<br>
      <strong>Propagation :</strong> $R-H + Cl^{\\bullet} \\to R^{\\bullet} + HCl$, puis $R^{\\bullet} + Cl_2 \\to R-Cl + Cl^{\\bullet}$ (le cycle se répète).<br>
      <strong>Arrêt :</strong> rencontre entre deux radicaux libres (ex. $2\\,Cl^{\\bullet}\\to Cl_2$).
    </div>
    <p>Avec le fluor, la réaction est violente (parfois explosive) ; avec le brome, elle est difficile et s'arrête à la monosubstitution ; l'iode ne réagit pas. On observe qu'un hydrogène tertiaire est substitué environ 5 fois plus vite qu'un hydrogène primaire, et un hydrogène secondaire environ 4 fois plus vite qu'un primaire — ce qui permet de calculer les pourcentages relatifs des produits d'un mélange.</p>
    <p>À température élevée et en présence d'un catalyseur métallique, les alcanes linéaires peuvent s'<strong>isomériser</strong> en chaîne ramifiée ; le <strong>cracking</strong> est le craquage catalytique de longues chaînes en chaînes plus courtes (chimie du pétrole).</p>

    <h3>2. Les alcènes ($C_nH_{2n}$)</h3>
    <p>Hydrocarbures insaturés, hybridés $sp^2$ au niveau de la double liaison. Les électrons $\\pi$, disponibles, rendent ces molécules bien plus réactives que les alcanes : on observe surtout des <strong>réactions d'addition</strong>.</p>
    <table class="mini-table">
      <tr><th>Réaction d'addition</th><th>Réactif / conditions</th><th>Produit</th></tr>
      <tr><td>Hydrogénation</td><td>$H_2$, catalyseur (Ni, Pt, Pd)</td><td>alcane (cis-addition, stéréospécifique)</td></tr>
      <tr><td>Halogénation</td><td>$X_2$ (ex. $Br_2$)</td><td>dihalogénure vicinal, via un ion halonium ponté (trans-addition)</td></tr>
      <tr><td>Hydrohalogénation</td><td>$HX$</td><td>halogénure, règle de Markovnikov</td></tr>
      <tr><td>Hydratation</td><td>$H_2O$, $H_2SO_4$ catalytique</td><td>alcool, règle de Markovnikov</td></tr>
      <tr><td>Hydroboration</td><td>$BH_3$ puis $H_2O_2/HO^-$</td><td>alcool anti-Markovnikov (addition syn)</td></tr>
    </table>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 200 90" width="100%">
          <line x1="30" y1="45" x2="56" y2="45" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="30" y1="49" x2="56" y2="49" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="56" y1="45" x2="69" y2="67.5" stroke="#EAF0FB" stroke-width="1.6"/>
          <text x="4" y="40" font-family="IBM Plex Mono" font-size="10" fill="#EAF0FB">H₂C</text>
          <text x="58" y="38" font-family="IBM Plex Mono" font-size="10" fill="#EAF0FB">CH</text>
          <text x="70" y="82" font-family="IBM Plex Mono" font-size="10" fill="#EAF0FB">CH₃</text>
          <path d="M30,10 Q26,26 29,40" stroke="#F0B94D" stroke-width="1.3" fill="none" marker-end="url(#orgMkArr)"/>
          <text x="35" y="15" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">H⁺ (électrophile)</text>
          <text x="15" y="72" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">H⁺ se fixe ici (carbone le moins substitué)</text>
          <defs><marker id="orgMkArr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#F0B94D"/></marker></defs>
        </svg>
        <span>Règle de Markovnikov : H⁺ attaque le carbone le moins substitué, laissant le carbocation le plus stable (donc le plus substitué) se former sur l'autre carbone</span>
      </div>
    </div>
    <div class="key-point">
      <span class="eyebrow">Règle de Markovnikov</span>
      Lors d'une addition électrophile sur un alcène dissymétrique, la partie électrophile du réactif ($H^+$ pour $HX$ ou $H_2O$) se fixe sur le carbone le <strong>moins substitué</strong> (le plus riche en hydrogènes) : le carbocation intermédiaire se forme donc sur le carbone le plus substitué, car c'est le plus stable. En présence de peroxydes (effet Kharasch), les acides $HX$ (mais pas $H_2O$) s'additionnent en <strong>anti-Markovnikov</strong> via un mécanisme radicalaire.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Markovnikov a formulé sa règle en 1870, bien avant que le concept même de carbocation ne soit compris. Pourtant, sa règle empirique coïncide exactement avec la prédiction moderne (le carbocation le plus stable, donc le plus substitué, se forme préférentiellement). Que penses-tu de la capacité de l'observation expérimentale pure à anticiper correctement un mécanisme encore inconnu, des décennies avant qu'il ne soit théoriquement expliqué ?
    </div>
    <p><strong>Oxydation :</strong> ménagée (dihydroxylation par $KMnO_4$ dilué ou $OsO_4$, formant un diol par cis-addition ; ou par époxydation avec un peracide) ou brutale (coupure oxydative par $KMnO_4$ concentré à chaud, ou ozonolyse, formant aldéhydes/cétones selon la substitution).</p>
    <p>L'addition de plusieurs molécules d'alcène identiques conduit à la formation de <strong>polymères</strong> (polymérisation radicalaire, cationique ou anionique).</p>

    <h3>3. Les alcynes ($C_nH_{2n-2}$)</h3>
    <p>On distingue les <strong>alcynes vrais</strong> $R-C\\equiv C-H$ (terminaux) des <strong>alcynes substitués</strong> $R-C\\equiv C-R'$. Le caractère insaturé y est encore plus élevé que chez les alcènes (2 liaisons $\\pi$) mais les réactions d'addition y sont généralement plus difficiles, la triple liaison étant plus courte et plus forte.</p>
    <p>Les réactions d'addition (hydrogénation, halogénation, HX, hydratation qui passe par un énol se tautomérisant en cétone, hydroboration) suivent globalement la même logique que pour les alcènes.</p>
    <div class="key-point">
      <span class="eyebrow">Propriété particulière : acidité de l'hydrogène terminal</span>
      Sur un alcyne vrai, l'hydrogène terminal porté par un carbone $sp$ est labile (légèrement acide), car plus le caractère $s$ d'une hybridation est important, plus l'orbitale est proche du noyau et plus la liaison $C-H$ est polarisée. Il réagit avec des métaux électropositifs (Na, formant un <strong>acétylure de sodium</strong>) ou des bases fortes, et forme des <strong>acétylures de métaux lourds</strong> (Cu, Ag) insolubles dans l'eau — une réaction caractéristique qui permet d'identifier les alcynes vrais.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'acidité de l'hydrogène terminal d'un alcyne vrai s'explique par le caractère s important de l'hybridation sp du carbone porteur. En reliant cela aux hybridations sp³, sp² et sp étudiées au chapitre précédent, peux-tu prédire, par extrapolation, comment l'acidité d'un hydrogène porté par un carbone évoluerait si l'on comparait un alcane (sp³), un alcène (sp²) et un alcyne (sp) dans des conditions comparables ?
    </div>
    <p>En présence de $KOH$ alcoolique à chaud, les alcynes vrais peuvent s'<strong>isomériser</strong> en alcynes substitués (la triple liaison « recule » d'un rang dans la chaîne).</p>

    <h3>4. Frontière de la recherche</h3>
    <p>La chimie du craquage catalytique et de la polymérisation des alcènes, étudiée dans ce chapitre à l'échelle du mécanisme réactionnel, sous-tend une industrie pétrochimique mondiale produisant chaque année plus de 400 millions de tonnes de matières plastiques. Face aux préoccupations environnementales croissantes liées à la pollution plastique, les chercheurs développent aujourd'hui des catalyseurs de polymérisation de nouvelle génération capables de produire des plastiques biodégradables ou plus facilement recyclables, tout en conservant les propriétés mécaniques recherchées par l'industrie.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des polymères issus d'alcènes présentant à la fois la robustesse mécanique des plastiques conventionnels et une dégradabilité environnementale contrôlée, sans compromis majeur sur le coût de production ? C'est un enjeu de recherche stratégique pour l'industrie pétrochimique face à la crise mondiale des déchets plastiques.</p>
    <p><strong>Technologie émergente :</strong> les catalyseurs métallocènes, qui permettent un contrôle stéréochimique très précis lors de la polymérisation des alcènes, sont aujourd'hui utilisés pour produire des plastiques aux propriétés mécaniques sur mesure, avec une consommation de matière première optimisée.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Degré de saturation (alcane/alcène/alcyne) → réactivité correspondante (substitution radicalaire / addition électrophile / acidité terminale) → mécanisme et produit majoritaire prévisible
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Stabilité du carbocation : tertiaire} > \\text{secondaire} > \\text{primaire}$$
      Cette hiérarchie de stabilité, établie empiriquement par Markovnikov des décennies avant d'être théoriquement expliquée, gouverne à elle seule la quasi-totalité des additions électrophiles sur les alcènes et les alcynes de ce chapitre — le principe unificateur qui permet de prédire le produit majoritaire de n'importe quelle réaction d'addition.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Les alcanes ne réagissent quasiment que par substitution radicalaire (halogénation) ou combustion</li>
        <li>Les alcènes et alcynes réagissent surtout par addition électrophile, nucléophile ou radicalaire sur la double/triple liaison</li>
        <li>Règle de Markovnikov : l'électrophile H⁺ se fixe sur le carbone le moins substitué → carbocation le plus stable</li>
        <li>L'hydrogène terminal d'un alcyne vrai est acide — c'est ce qui le distingue nettement d'un alcyne substitué</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre Markovnikov (H⁺ sur le carbone le moins substitué, mécanisme ionique) et anti-Markovnikov (mécanisme radicalaire, uniquement avec HX et un peroxyde — jamais avec H₂O)</li>
        <li>Oublier que l'hydroboration est une addition syn qui donne le produit anti-Markovnikov, sans passer par un carbocation</li>
        <li>Croire que tous les alcynes réagissent avec Na ou Cu(NH₃)₄Cl — seuls les alcynes VRAIS (terminaux) le font</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La réaction caractéristique (quasi unique) des alcanes est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org4e1" value="wrong"> l'addition électrophile</label>
          <label class="option"><input type="radio" name="org4e1" value="right"> la substitution radicalaire</label>
          <label class="option"><input type="radio" name="org4e1" value="wrong"> la substitution électrophile aromatique</label>
          <label class="option"><input type="radio" name="org4e1" value="wrong"> la dihydroxylation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org4e1','org4fb1','Correct — les alcanes, saturés et non polaires, ne réagissent presque qu\\'avec des radicaux (halogénation) ou par combustion.','Les alcanes n\\'ont pas de double liaison à additionner : quel mécanisme reste alors possible ?')">Vérifier</button>
        <div class="feedback" id="org4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Selon la règle de Markovnikov, lors de l'addition de HBr sur le propène, Br⁻ se fixe finalement sur :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org4e2" value="wrong"> le carbone le moins substitué</label>
          <label class="option"><input type="radio" name="org4e2" value="right"> le carbone le plus substitué</label>
          <label class="option"><input type="radio" name="org4e2" value="wrong"> les deux carbones également</label>
          <label class="option"><input type="radio" name="org4e2" value="wrong"> aucun carbone, il reste libre</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org4e2','org4fb2','Correct — H⁺ se fixe d\\'abord sur le carbone le moins substitué, formant le carbocation le plus stable sur le carbone le plus substitué ; Br⁻ attaque ensuite ce carbocation.','H⁺ se fixe en premier sur le carbone le MOINS substitué — donc le carbocation, et Br⁻ ensuite, se trouvent où ?')">Vérifier</button>
        <div class="feedback" id="org4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La réaction d'un alcyne avec le nitrate d'argent ammoniacal, donnant un précipité, permet de caractériser :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org4e3" value="wrong"> n'importe quel alcène</label>
          <label class="option"><input type="radio" name="org4e3" value="wrong"> un alcyne substitué uniquement</label>
          <label class="option"><input type="radio" name="org4e3" value="right"> un alcyne vrai (terminal)</label>
          <label class="option"><input type="radio" name="org4e3" value="wrong"> un alcane</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org4e3','org4fb3','Correct — seul un alcyne vrai possède l\\'hydrogène terminal acide nécessaire pour former l\\'acétylure d\\'argent, insoluble dans l\\'eau.','Cette réaction dépend d\\'un hydrogène terminal ACIDE — quel type d\\'alcyne le possède ?')">Vérifier</button>
        <div class="feedback" id="org4fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le fluor réagissait aussi lentement que l'iode avec les alcanes (au lieu de réagir violemment) : comment cela changerait-il l'industrie des composés fluorés ?</li>
        <li>Pourquoi Markovnikov a-t-il pu énoncer une règle prédictive correcte sans connaître le mécanisme sous-jacent, alors que tant d'autres règles empiriques de l'histoire des sciences se sont révélées fausses une fois le mécanisme compris ?</li>
        <li>Quelle serait la conséquence, pour la gestion mondiale des déchets, d'une innovation majeure rendant les plastiques issus d'alcènes rapidement biodégradables sans perte de leurs propriétés mécaniques actuelles ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>V. Markovnikov, « Materialien zur Frage von der gegenseitigen Wirkung der Atome in den chemischen Verbindungen », Annalen der Chemie und Pharmacie, 1870 — le mémoire fondateur de la règle de Markovnikov.</li>
        <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur la chimie des alcanes, alcènes et alcynes en licence.</li>
        <li>Plastics Europe, <em>Plastics — The Facts</em>, rapport annuel de référence sur la production et le recyclage mondial des matières plastiques.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais prédire, à partir de la seule structure d'un hydrocarbure, quel mécanisme réactionnel et quel produit majoritaire attendre de sa réaction. Le chapitre suivant, « Hydrocarbures aromatiques », va explorer une famille de molécules à la stabilité remarquable, héritière directe de la mésomérie déjà rencontrée en atomistique. Comme le rappelle l'histoire de la règle de Markovnikov : une observation expérimentale rigoureuse, même sans théorie complète pour l'expliquer, peut anticiper avec une précision remarquable des mécanismes qui ne seront élucidés que des décennies plus tard.</p>
  `
};

ORG_NOVA_KB[orgKey('Alcanes, alcènes et alcynes')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Alcanes, alcènes et alcynes ». Demande-moi la règle de Markovnikov, le mécanisme radicalaire, ou un indice sur un exercice.",
  rules: [
    { test:/substitution radicalaire|halog[ée]nation.*alcane/i, replies:["Le mécanisme se déroule en 3 phases : initiation (Cl2 → 2Cl• sous lumière), propagation (R-H + Cl• → R• + HCl, puis R• + Cl2 → R-Cl + Cl•, en boucle), arrêt (rencontre de deux radicaux)."] },
    { test:/markovnikov/i, replies:["Règle de Markovnikov : lors d'une addition électrophile HX ou H2O sur un alcène dissymétrique, H+ se fixe sur le carbone le MOINS substitué — le carbocation (donc X ou OH ensuite) se retrouve sur le carbone le PLUS substitué, car c'est le plus stable."] },
    { test:/anti.markovnikov|kharasch|hydroboration/i, replies:["L'addition anti-Markovnikov se produit soit par voie radicalaire (HX + peroxyde, jamais avec H2O), soit par hydroboration-oxydation (BH3 puis H2O2), qui donne directement le produit anti-Markovnikov sans carbocation."] },
    { test:/alcyne vrai|hydrog[èe]ne terminal|ac[ée]tylure/i, replies:["Sur un alcyne vrai (terminal), l'hydrogène est légèrement acide à cause de l'hybridation sp du carbone. Il réagit avec Na (acétylure de sodium) ou forme des acétylures de cuivre/argent insolubles — une réaction qui permet de les identifier."] },
    { test:/cracking|isom[ée]risation.*alcane/i, replies:["Le cracking est le craquage catalytique de longues chaînes d'alcanes en chaînes plus courtes ; l'isomérisation transforme un alcane linéaire en son isomère ramifié, à température élevée avec un catalyseur métallique."] },
    { test:/oxydation.*alc[èe]ne|dihydroxylation|ozonolyse/i, replies:["Oxydation ménagée : KMnO4 dilué ou OsO4 forment un diol par cis-addition. Oxydation brutale : KMnO4 concentré à chaud ou l'ozonolyse coupent la double liaison en formant aldéhydes et/ou cétones selon la substitution."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : les alcanes n'ont pas de double liaison.","Indice niveau 2 : sans liaison π, l'addition est impossible.","Indice niveau 3 : c'est la substitution radicalaire."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : suis les deux étapes de la réaction.","Indice niveau 2 : H+ se fixe en premier sur le carbone le moins substitué.","Indice niveau 3 : Br- se fixe donc sur le carbone le PLUS substitué."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : cette réaction dépend d'un hydrogène acide.","Indice niveau 2 : seul un alcyne TERMINAL a cet hydrogène.","Indice niveau 3 : c'est l'alcyne vrai."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 3 — Prédicteur d'orientation en substitution électrophile aromatique (Chapitre 5)
--------------------------------------------------------------------------------- */
const ORG_SUBSTITUENTS = {
  "nh2":  { label:"−NH₂, −NR₂ (amine)",        cls:"puissant activant",  dir:"op" },
  "oh":   { label:"−OH, −O⁻",                   cls:"puissant activant",  dir:"op" },
  "or":   { label:"−OR (éther)",                 cls:"activant moyen",     dir:"op" },
  "nhcor":{ label:"−NHCOR (amide)",              cls:"activant moyen",     dir:"op" },
  "alkyl":{ label:"−CH₃, −R (alkyle)",           cls:"activant faible",    dir:"op" },
  "phenyl":{label:"−C₆H₅ (phényle)",             cls:"activant faible",    dir:"op" },
  "x":    { label:"−F, −Cl, −Br, −I (halogène)", cls:"désactivant (mais)", dir:"op" },
  "no2":  { label:"−NO₂",                        cls:"puissant désactivant", dir:"meta" },
  "nr3":  { label:"−NR₃⁺ (ammonium)",            cls:"puissant désactivant", dir:"meta" },
  "cf3":  { label:"−CCl₃, −CF₃",                 cls:"puissant désactivant", dir:"meta" },
  "cooh": { label:"−COOH, −COOR, −CONH₂",        cls:"désactivant moyen",  dir:"meta" },
  "so3h": { label:"−SO₃H",                       cls:"désactivant moyen",  dir:"meta" },
  "cho":  { label:"−CHO, −COR (aldéhyde/cétone)",cls:"désactivant moyen",  dir:"meta" },
  "cn":   { label:"−CN",                         cls:"désactivant moyen",  dir:"meta" }
};
function updateOrgSEAr(){
  const key = document.getElementById('orgSubSelect').value;
  const sub = ORG_SUBSTITUENTS[key];
  const positions = [1,2,3,4,5,6]; // 1 = ipso (substituant), 2&6 ortho, 3&5 meta, 4 para
  const target = sub.dir === 'op' ? [2,4,6] : [3,5];
  for(const p of positions){
    const el = document.getElementById('orgRingPos'+p);
    el.setAttribute('fill', target.includes(p) ? '#F0B94D' : 'transparent');
    el.setAttribute('opacity', target.includes(p) ? '0.85' : '0');
  }
  const dirText = sub.dir === 'op' ? "ortho et para (positions 2, 4, 6)" : "méta (positions 3 et 5)";
  let explanation = "";
  if(sub.dir === 'op' && sub.cls.includes('désactivant')){
    explanation = "C'est un cas particulier : le groupe désactive le cycle par effet inductif (−I), mais il reste ortho/para-directeur par effet mésomère donneur (+M) grâce à ses doublets non liants.";
  } else if(sub.dir === 'op'){
    explanation = "Ce groupe enrichit le cycle en électrons (effet +I et/ou +M) : il active le cycle et oriente la substitution suivante en ortho et para.";
  } else {
    explanation = "Ce groupe appauvrit fortement le cycle en électrons (effet −M et/ou −I) : il désactive le cycle et oriente la substitution suivante en méta, la seule position qui évite de placer la charge positive de l'intermédiaire de Wheland sur le carbone portant déjà ce groupe.";
  }
  document.getElementById('orgSEArReadout').innerHTML =
    `<strong>${sub.label}</strong> — ${sub.cls}, orienteur ${sub.dir === 'op' ? 'ortho/para' : 'méta'}.<br>Un second substituant électrophile se fixera préférentiellement en ${dirText}.<br>${explanation}`;
}
function initOrgSEAr(){ updateOrgSEAr(); }

/* =========================== CHAPITRE 5 — Hydrocarbures aromatiques =========================== */
ORG_CHAPTERS[orgKey('Hydrocarbures aromatiques')] = {
  objectives: [
    "Reconnaître un système aromatique à l'aide de la règle de Hückel",
    "Écrire le mécanisme d'une substitution électrophile aromatique (SEAr) et son intermédiaire de Wheland",
    "Identifier les réactions caractéristiques du benzène : halogénation, alkylation et acylation de Friedel-Crafts, nitration, sulfonation",
    "Prévoir la position d'un second substituant à l'aide de la règle de Holleman (orientation ortho/para ou méta)",
    "Évaluer pourquoi la structure exacte du benzène est restée une énigme scientifique pendant près de quarante ans après sa découverte, jusqu'à ce que le concept de délocalisation électronique en fournisse enfin l'explication rigoureuse"
  ],
  prereqs: ["Alcanes, alcènes et alcynes"],
  bodyHtml: `
    <p>August Kekulé, chimiste allemand du XIXe siècle, raconte avoir résolu l'énigme de la structure du benzène — un problème qui avait résisté à ses collègues pendant près de quarante ans depuis la découverte de la molécule par Faraday — grâce à un rêve où il visualisait un serpent se mordant la queue, lui suggérant l'image d'un cycle fermé. Si l'anecdote a probablement été enjolivée avec le temps, la structure cyclique qu'il propose en 1865 reste, dans ses grandes lignes, remarquablement proche de celle acceptée aujourd'hui — bien qu'il faille attendre encore plusieurs décennies et l'avènement de la mécanique quantique pour comprendre pourquoi cette structure hexagonale, contrairement à ce que suggérait sa formule initiale (alternance de liaisons simples et doubles), présente en réalité six liaisons parfaitement identiques.</p>
    <p>Cette stabilité exceptionnelle du cycle benzénique, aujourd'hui expliquée par la délocalisation des électrons π, façonne une part considérable de la chimie industrielle moderne : les colorants synthétiques, les matières plastiques comme le polystyrène, de nombreux médicaments et une majorité des explosifs militaires (comme le TNT, trinitrotoluène) reposent tous sur ce même noyau aromatique, dont la réactivité si particulière — résistant à l'addition, privilégiant la substitution — constitue le cœur de ce chapitre.</p>
    <p>Les hydrocarbures aromatiques (ou benzéniques, aryliques) sont des composés dont la molécule renferme un ou plusieurs cycles benzéniques. Leur réactivité très particulière — résistance à l'addition, prédilection pour la substitution — vient de la stabilisation exceptionnelle apportée par la délocalisation des électrons π. À la fin de ce chapitre, tu sauras prédire précisément où un second substituant viendra se fixer sur un cycle aromatique déjà substitué.</p>

    <h3>1. Structure et aromaticité</h3>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 120" width="100%">
          <polygon points="70,15 109,37.5 109,82.5 70,105 31,82.5 31,37.5" fill="none" stroke="#EAF0FB" stroke-width="1.6"/>
          <circle cx="70" cy="60" r="22" fill="none" stroke="#F0B94D" stroke-width="1.4" stroke-dasharray="3,2"/>
        </svg>
        <span>Le cycle benzénique : un hexagone régulier plan, délocalisation des 6 électrons π (représentée par le cercle)</span>
      </div>
    </div>
    <p><strong>Règle de Hückel :</strong> un polyène monocyclique régulier, plan et totalement conjugué constitue un système aromatique si le nombre d'électrons π délocalisés vaut $4n+2$ (avec $n$ entier ≥ 0) — pour le benzène, 6 électrons π correspondent à $n=1$.</p>
    <table class="mini-table">
      <tr><th>Molécule</th><th>Formule / description</th></tr>
      <tr><td>Benzène</td><td>cycle simple $C_6H_6$</td></tr>
      <tr><td>Toluène, xylènes, styrène, cumène</td><td>benzène substitué par une chaîne latérale</td></tr>
      <tr><td>Naphtalène, anthracène, phénanthrène</td><td>cycles benzéniques accolés (aromatiques polycycliques)</td></tr>
      <tr><td>Biphényle, diphénylméthane</td><td>deux cycles benzéniques reliés par une liaison ou un pont $CH_2$</td></tr>
    </table>
    <p>Radicaux fréquents en série aromatique : <strong>phényle</strong> ($-C_6H_5$), <strong>benzyle</strong> ($-CH_2-C_6H_5$), <strong>tolyle</strong> (crésyle).</p>

    <h3>2. Propriétés physiques et chimiques générales</h3>
    <p>Le benzène bout à 80°C ; il possède un grand pouvoir dissolvant (soufre, phosphore, graisses, résines, caoutchouc) et est très toxique (cancérigène). Le noyau aromatique, exceptionnellement stable grâce à la délocalisation électronique, <strong>résiste aux réactions d'addition</strong> qui feraient perdre son caractère aromatique — celles-ci ne se produisent que dans des conditions énergétiques particulières. En revanche, le cycle privilégie très largement les réactions de <strong>substitution</strong>, au cours desquelles il reste intact.</p>
    <p>Le benzène peut néanmoins s'hydrogéner (nickel de Raney, température et pression élevées) pour donner le cyclohexane, ou s'halogéner par addition radicalaire sous UV (uniquement avec le chlore, qui réagit bien) — mais ce sont des cas particuliers, à ne pas confondre avec la réactivité dominante du cycle.</p>

    <h3>3. Substitution électrophile aromatique (SEAr)</h3>
    <p>C'est la réaction la plus caractéristique du cycle aromatique : elle remplace un $H$ du cycle par un réactif électrophile $E^+$.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 90" width="100%">
          <polygon points="40,20 65,35 65,60 40,75 15,60 15,35" fill="none" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="70" y="50" font-family="IBM Plex Mono" font-size="14" fill="#EAF0FB">+ E⁺ →</text>
          <polygon points="140,20 165,35 165,60 140,75 115,60 115,35" fill="none" stroke="#F0B94D" stroke-width="1.4"/>
          <circle cx="165" cy="35" r="4" fill="#F0B94D"/>
          <text x="168" y="30" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">E</text>
          <text x="165" y="12" font-family="IBM Plex Mono" font-size="16" fill="#EAF0FB">⊕</text>
          <text x="90" y="88" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">intermédiaire de Wheland (arénium)</text>
        </svg>
        <span>Mécanisme en 3 étapes : formation de E⁺, addition électrophile (intermédiaire de Wheland), puis perte de H⁺ pour régénérer l'aromaticité</span>
      </div>
    </div>
    <table class="mini-table">
      <tr><th>Réaction</th><th>Électrophile formé</th><th>Catalyseur / réactif</th></tr>
      <tr><td>Halogénation</td><td>$X^+$</td><td>$X_2$ + acide de Lewis ($AlCl_3$, $FeBr_3$)</td></tr>
      <tr><td>Alkylation de Friedel-Crafts</td><td>carbocation $R^+$</td><td>$RX$ + acide de Lewis ($AlCl_3$)</td></tr>
      <tr><td>Acylation de Friedel-Crafts</td><td>ion acylium $RCO^+$</td><td>chlorure d'acide + $AlCl_3$</td></tr>
      <tr><td>Nitration</td><td>$NO_2^+$</td><td>$HNO_3$ concentré + $H_2SO_4$ (mélange sulfonitrique)</td></tr>
      <tr><td>Sulfonation</td><td>$SO_3$</td><td>oléum ($SO_3$ / $H_2SO_4$)</td></tr>
    </table>
    <p>Pour la nitration et la sulfonation, il n'est pas possible d'introduire plus de trois groupements $NO_2$ ou $SO_3H$ (on obtient au maximum le trinitrobenzène, explosif, ou l'acide benzène-trisulfonique). L'acylation, elle, ne se produit qu'une seule fois (le produit formé, désactivé, ne réagit plus).</p>

    <h3>4. Règle de Holleman : orientation d'une seconde substitution</h3>
    <p>Lorsqu'on place un deuxième substituant sur le noyau, sa position ne dépend pas de sa propre nature mais de celle du <strong>premier substituant déjà présent</strong>.</p>
    <table class="mini-table">
      <tr><th>Groupe déjà présent</th><th>Effet</th><th>Oriente en</th></tr>
      <tr><td>−NH₂, −OH, −OR, −NHCOR, alkyles, phényle</td><td>donneur (+I et/ou +M) : active le cycle</td><td>ortho / para</td></tr>
      <tr><td>−X (halogènes)</td><td>−I désactivant, mais +M : cas particulier</td><td>ortho / para (cycle désactivé)</td></tr>
      <tr><td>−NO₂, −NR₃⁺, −CF₃, −COOH, −COR, −SO₃H, −CN</td><td>attracteur (−I et/ou −M) : désactive le cycle</td><td>méta</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Pourquoi ces orientations ? (justification électronique)</span>
      Pour les groupes donneurs, l'effet +I et/ou +M enrichit en électrons les positions ortho et para, qui sont donc les plus rapidement attaquées par un électrophile. Pour les groupes attracteurs, l'effet −M appauvrit en électrons les positions ortho et para : l'électrophile est repoussé vers la position méta, seule à éviter que la charge positive de l'intermédiaire de Wheland ne se retrouve directement sur (ou à côté d') un carbone déjà appauvri.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les halogènes constituent un cas particulier fascinant : ils désactivent le cycle (effet −I dominant sur la réactivité globale) tout en restant orienteurs ortho/para (effet +M dominant sur la sélectivité positionnelle). En repensant à la compétition entre effets inductif et mésomère étudiée au chapitre 2, pourquoi ces deux effets, tous deux réels, peuvent-ils dominer chacun un aspect différent (l'un la vitesse globale, l'autre la position) sans se contredire ?
    </div>

    <p>Cinq règles pratiques résument les cas de disubstitution : (1) si les deux substituants orientent dans le même sens, aucun problème ; (2) si un ortho/para-directeur et un méta-directeur ne s'accordent pas, c'est l'ortho/para-directeur qui l'emporte ; (3) un groupe fortement activant l'emporte sur un groupe faiblement activant ; (4) si les deux groupes ont une activation comparable, on observe un mélange de produits ; (5) les positions stériquement gênées entre deux substituants déjà en méta sont peu substituées.</p>

    <h3>5. Oxydation des dérivés benzéniques</h3>
    <p>Le noyau aromatique lui-même résiste à l'oxydation (il faut des oxydants forts et concentrés à chaud pour le détruire, formant l'anhydride maléique). En revanche, une <strong>chaîne latérale</strong> portée par le noyau s'oxyde facilement (même avec des oxydants ordinaires comme $KMnO_4$) : quelle que soit la longueur de la chaîne alkyle, l'oxydation conduit à l'<strong>acide benzoïque</strong> (le carbone benzylique étant seul oxydé jusqu'au $-COOH$, le reste de la chaîne étant perdu sous forme de $CO_2$ et $H_2O$).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Quelle que soit la longueur de la chaîne latérale portée par le cycle (méthyle, éthyle, propyle...), l'oxydation conduit toujours au même produit final, l'acide benzoïque. Pourquoi le cycle aromatique, si résistant à l'oxydation directe, rend-il paradoxalement le carbone benzylique adjacent (celui directement attaché au cycle) particulièrement vulnérable à l'oxydation ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La chimie des composés aromatiques polycycliques reste un domaine de recherche extrêmement actif : les hydrocarbures aromatiques polycycliques (HAP), produits notamment par la combustion incomplète de matières organiques, sont aujourd'hui reconnus comme des polluants atmosphériques cancérigènes préoccupants, faisant l'objet d'une surveillance environnementale rigoureuse. À l'opposé, les recherches en science des matériaux exploitent la stabilité exceptionnelle des systèmes aromatiques étendus pour concevoir des semi-conducteurs organiques utilisés dans les écrans OLED et les cellules photovoltaïques organiques.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des méthodes de combustion industrielle et domestique qui minimisent significativement la formation d'hydrocarbures aromatiques polycycliques cancérigènes, sans compromis majeur sur l'efficacité énergétique ? C'est un enjeu de santé publique et de recherche en génie de la combustion.</p>
    <p><strong>Technologie émergente :</strong> les matériaux organiques à base de systèmes aromatiques étendus, conçus pour l'électronique flexible et les écrans OLED, exploitent directement la délocalisation électronique du cycle benzénique pour obtenir des propriétés semi-conductrices ajustables sur mesure.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Cycle plan conjugué → règle de Hückel (4n+2 électrons π) → aromaticité → résistance à l'addition, prédilection pour la substitution (SEAr) → orientation ortho/para ou méta selon le premier substituant (règle de Holleman)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$4n + 2 \\quad (n = 0, 1, 2, \\ldots)$$
      Cette formule de Hückel, apparemment arithmétique et arbitraire, encode en réalité une réalité quantique profonde sur le remplissage des orbitales moléculaires délocalisées — et détermine, à elle seule, si un cycle conjugué bénéficiera ou non de la stabilisation aromatique exceptionnelle qui caractérise le benzène et ses dérivés.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Règle de Hückel : aromatique si 4n+2 électrons π délocalisés sur un cycle plan conjugué</li>
        <li>Le cycle aromatique privilégie la substitution (SEAr) à l'addition, car l'addition détruirait l'aromaticité</li>
        <li>Groupes donneurs (NH2, OH, OR, alkyles) → activants, ortho/para-directeurs ; groupes attracteurs (NO2, COOH, CHO...) → désactivants, méta-directeurs ; halogènes = cas particulier (désactivant mais ortho/para-directeur)</li>
        <li>Une chaîne latérale sur le cycle s'oxyde toujours jusqu'à l'acide benzoïque, quelle que soit sa longueur</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que les halogènes désactivent le cycle (−I) tout en restant ortho/para-directeurs (+M) — les deux effets ne vont pas toujours dans le même sens</li>
        <li>Confondre l'ordre des étapes en SEAr : c'est la perte de H⁺ (pas l'addition de E⁺) qui régénère l'aromaticité</li>
        <li>Oublier qu'en Friedel-Crafts, un carbocation formé peut se réarranger (isomériser) vers une forme plus stable avant de réagir</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — prédire l'orientation d'une SEAr</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Choisis un substituant déjà présent sur le cycle : le simulateur indique où se fixera un second réactif électrophile.</p>
      <div class="sim-2col">
        <svg viewBox="0 0 140 130" width="160" height="150">
          <polygon points="70,15 109,37.5 109,82.5 70,105 31,82.5 31,37.5" fill="none" stroke="#EAF0FB" stroke-width="1.6"/>
          <text x="65" y="10" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">1</text>
          <text x="112" y="35" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">2</text>
          <text x="112" y="88" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">3</text>
          <text x="65" y="118" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">4</text>
          <text x="12" y="88" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">5</text>
          <text x="12" y="35" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">6</text>
          <circle id="orgRingPos1" cx="70" cy="15" r="7" fill="#4C7CFF" opacity="0.85"/>
          <circle id="orgRingPos2" cx="109" cy="37.5" r="7" fill="transparent" opacity="0"/>
          <circle id="orgRingPos3" cx="109" cy="82.5" r="7" fill="transparent" opacity="0"/>
          <circle id="orgRingPos4" cx="70" cy="105" r="7" fill="transparent" opacity="0"/>
          <circle id="orgRingPos5" cx="31" cy="82.5" r="7" fill="transparent" opacity="0"/>
          <circle id="orgRingPos6" cx="31" cy="37.5" r="7" fill="transparent" opacity="0"/>
        </svg>
        <div class="sim-controls">
          <label>Substituant déjà présent (position 1) :</label>
          <select id="orgSubSelect" onchange="updateOrgSEAr()">
            <option value="nh2">−NH₂, −NR₂ (amine)</option>
            <option value="oh">−OH, −O⁻</option>
            <option value="or">−OR (éther)</option>
            <option value="nhcor">−NHCOR (amide)</option>
            <option value="alkyl" selected>−CH₃, −R (alkyle)</option>
            <option value="phenyl">−C₆H₅ (phényle)</option>
            <option value="x">−F, −Cl, −Br, −I (halogène)</option>
            <option value="no2">−NO₂</option>
            <option value="nr3">−NR₃⁺ (ammonium)</option>
            <option value="cf3">−CCl₃, −CF₃</option>
            <option value="cooh">−COOH, −COOR, −CONH₂</option>
            <option value="so3h">−SO₃H</option>
            <option value="cho">−CHO, −COR (aldéhyde/cétone)</option>
            <option value="cn">−CN</option>
          </select>
          <div class="sim-readout" id="orgSEArReadout" style="margin-top:8px;"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un système monocyclique plan et conjugué est aromatique (règle de Hückel) s'il possède :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org5e1" value="wrong"> exactement 6 atomes de carbone</label>
          <label class="option"><input type="radio" name="org5e1" value="right"> 4n+2 électrons π délocalisés</label>
          <label class="option"><input type="radio" name="org5e1" value="wrong"> uniquement des liaisons simples</label>
          <label class="option"><input type="radio" name="org5e1" value="wrong"> un nombre pair d'atomes quelconque</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org5e1','org5fb1','Correct — la règle de Hückel s\\'applique au nombre d\\'électrons π délocalisés (4n+2), pas au nombre d\\'atomes de carbone.','La règle de Hückel porte sur le nombre d\\'ÉLECTRONS π, pas sur le nombre d\\'atomes.')">Vérifier</button>
        <div class="feedback" id="org5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le groupe −NO₂ déjà présent sur un cycle benzénique oriente une seconde substitution électrophile en position :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org5e2" value="wrong"> ortho</label>
          <label class="option"><input type="radio" name="org5e2" value="wrong"> para</label>
          <label class="option"><input type="radio" name="org5e2" value="right"> méta</label>
          <label class="option"><input type="radio" name="org5e2" value="wrong"> ipso</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org5e2','org5fb2','Correct — le groupe nitro est fortement désactivant (−M, −I) et méta-directeur.','Utilise le simulateur : sélectionne −NO2 et regarde la position mise en évidence.')">Vérifier</button>
        <div class="feedback" id="org5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'alkylation de Friedel-Crafts sur le benzène nécessite :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org5e3" value="wrong"> un simple chauffage, sans catalyseur</label>
          <label class="option"><input type="radio" name="org5e3" value="right"> un halogénure d'alkyle et un acide de Lewis (ex. AlCl₃)</label>
          <label class="option"><input type="radio" name="org5e3" value="wrong"> H₂ et un catalyseur métallique</label>
          <label class="option"><input type="radio" name="org5e3" value="wrong"> HNO₃ concentré seul</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org5e3','org5fb3','Correct — l\\'acide de Lewis (AlCl3) génère le carbocation électrophile R+ à partir de l\\'halogénure d\\'alkyle RX, qui attaque ensuite le cycle.','L\\'acide de Lewis sert à générer l\\'électrophile R+ à partir de RX — sans lui, pas de réaction.')">Vérifier</button>
        <div class="feedback" id="org5fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le benzène perdait son aromaticité aussi facilement que le cyclohexatriène hypothétique alterné qu'imaginait initialement Kekulé : à quoi ressemblerait la chimie industrielle moderne, privée de la stabilité exceptionnelle du cycle aromatique ?</li>
        <li>Pourquoi l'acylation de Friedel-Crafts s'arrête-t-elle toujours après une seule substitution, contrairement à l'alkylation qui peut se répéter plusieurs fois sur le même cycle ?</li>
        <li>Quelle serait la conséquence, pour la santé publique, d'une réduction drastique des émissions d'hydrocarbures aromatiques polycycliques issues de la combustion domestique et industrielle ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>A. Kekulé, « Sur la constitution des substances aromatiques », Bulletin de la Société Chimique de Paris, 1865 — l'article fondateur de la structure cyclique du benzène.</li>
        <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur les hydrocarbures aromatiques en licence.</li>
        <li>Agence Internationale de Recherche sur le Cancer (CIRC/IARC), <em>Monographies sur les hydrocarbures aromatiques polycycliques</em>, Organisation Mondiale de la Santé — évaluation de référence du risque cancérigène des HAP.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais prédire précisément où un second substituant viendra se fixer sur un cycle aromatique déjà substitué — une compétence directement mobilisable dans la synthèse de colorants, de médicaments ou de matériaux organiques. Le chapitre suivant, « Dérivés halogénés et substitution nucléophile (SN1/SN2) », va explorer un tout autre mécanisme réactionnel, où c'est cette fois un nucléophile, et non un électrophile, qui attaque la molécule. Comme le racontait Kekulé lui-même à propos de sa fameuse intuition onirique : « Apprenons à rêver, messieurs, et alors peut-être trouverons-nous la vérité. » Le cycle benzénique, une fois compris, reste l'une des plus belles illustrations de cette vérité entrevue en rêve puis rigoureusement confirmée par la science.</p>
  `,
  init: initOrgSEAr
};

ORG_NOVA_KB[orgKey('Hydrocarbures aromatiques')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Hydrocarbures aromatiques ». Demande-moi la règle de Hückel, la règle de Holleman, ou un indice sur un exercice.",
  rules: [
    { test:/h[uü]ckel|aromaticit[ée]/i, replies:["Règle de Hückel : un système monocyclique plan et totalement conjugué est aromatique s'il possède 4n+2 électrons π délocalisés (n entier ≥ 0). Le benzène a 6 électrons π (n=1)."] },
    { test:/wheland|intermédiaire.*substitution|m[ée]canisme.*seAr|seAr/i, replies:["Le mécanisme de SEAr a 3 étapes : 1) formation de l'électrophile E+, 2) addition sur le cycle formant l'intermédiaire de Wheland (arénium, chargé +), 3) perte de H+ qui régénère l'aromaticité."] },
    { test:/friedel.crafts|alkylation|acylation/i, replies:["Alkylation de Friedel-Crafts : RX + AlCl3 génère un carbocation R+ qui substitue un H du cycle. Acylation : un chlorure d'acide + AlCl3 génère un ion acylium RCO+ — cette réaction ne se produit qu'une seule fois (produit désactivé)."] },
    { test:/nitration/i, replies:["La nitration utilise le mélange sulfonitrique (HNO3 concentré + H2SO4) qui génère l'électrophile NO2+."] },
    { test:/sulfonation/i, replies:["La sulfonation utilise l'oléum (SO3 dans H2SO4) ; l'électrophile est SO3."] },
    { test:/holleman|orientation|ortho.*para|m[ée]ta.directeur/i, replies:["Règle de Holleman : les groupes donneurs (NH2, OH, OR, alkyles...) sont ortho/para-directeurs et activants. Les groupes attracteurs (NO2, COOH, CHO, SO3H, CN...) sont méta-directeurs et désactivants. Les halogènes sont un cas particulier : désactivants mais ortho/para-directeurs."] },
    { test:/oxydation.*chaine|acide benzo[iï]que/i, replies:["Une chaîne latérale alkyle sur un cycle benzénique s'oxyde toujours (avec KMnO4 par exemple) jusqu'à l'acide benzoïque, quelle que soit sa longueur — seul le carbone directement lié au cycle reste."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : la règle de Hückel porte sur les électrons, pas sur les atomes.","Indice niveau 2 : c'est une formule du type 4n+2.","Indice niveau 3 : 4n+2 électrons π délocalisés."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le nitro est un groupe fortement désactivant.","Indice niveau 2 : utilise le simulateur pour vérifier.","Indice niveau 3 : c'est un méta-directeur."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : il faut générer un carbocation électrophile à partir de RX.","Indice niveau 2 : quel catalyseur active RX ?","Indice niveau 3 : un acide de Lewis comme AlCl3."] }
  ]
};

/* =========================== CHAPITRE 6 — Dérivés halogénés et substitution nucléophile (SN1/SN2) =========================== */
ORG_CHAPTERS[orgKey('Dérivés halogénés et substitution nucléophile (SN1/SN2)')] = {
  objectives: [
    "Nommer et classer les halogénoalcanes selon la nature du carbone porteur de l'halogène",
    "Distinguer les mécanismes SN2 (concerté) et SN1 (en deux étapes) et prédire lequel domine",
    "Relier la stéréochimie du produit (inversion de Walden ou racémisation) au mécanisme suivi",
    "Identifier l'influence du substrat, du nucléophile, du nucléofuge et du solvant sur la voie réactionnelle",
    "Évaluer pourquoi Edward Hughes et Christopher Ingold ont dû mener des expériences cinétiques et stéréochimiques minutieuses dans les années 1930 pour départager deux mécanismes de substitution aux résultats globaux parfois similaires"
  ],
  prereqs: ["Effets électroniques, réactivité et solvants", "Isomérie et stéréochimie"],
  bodyHtml: `
    <p>Dans les années 1930, le duo de chimistes britanniques Edward Hughes et Christopher Ingold (déjà rencontré au chapitre 2 pour ses flèches courbes) mène une série d'expériences d'une rigueur méthodologique remarquable pour trancher un débat qui divisait alors la communauté des chimistes organiciens : une substitution nucléophile procède-t-elle toujours selon un mécanisme unique, ou plusieurs voies distinctes coexistent-elles selon les conditions ? Leur découverte — l'existence de deux mécanismes limites, SN1 et SN2, aux signatures cinétiques et stéréochimiques radicalement différentes — reste aujourd'hui l'un des exemples les plus enseignés de la méthode scientifique appliquée à l'élucidation d'un mécanisme réactionnel invisible à l'œil nu.</p>
    <p>Cette distinction entre SN1 et SN2, loin d'être un simple exercice de classification théorique, a des applications pratiques considérables : elle permet à un chimiste de synthèse de choisir précisément les conditions expérimentales (solvant, nucléophile, substrat) pour obtenir sélectivement un seul énantiomère plutôt qu'un mélange racémique — un enjeu crucial, comme tu l'as vu au chapitre 3, pour l'industrie pharmaceutique moderne.</p>
    <p>Un <strong>halogénoalcane</strong> $R-X$ ($X=F, Cl, Br, I$) porte une liaison $C-X$ polarisée $C^{\\delta+}-X^{\\delta-}$ : le carbone est électrophile, ce qui en fait une cible de choix pour un nucléophile. La réaction qui remplace $X$ par un nucléophile $Nu^-$ est une <strong>substitution nucléophile</strong>, notée $S_N$. Deux mécanismes limites s'affrontent : $S_N2$ (concerté) et $S_N1$ (en deux étapes). À la fin de ce chapitre, tu sauras prédire, à partir des seules conditions expérimentales, quel mécanisme dominera et quelle stéréochimie en résultera.</p>

    <h3>1. Classe du carbone et nucléofuge</h3>
    <p>On classe un halogénoalcane <strong>primaire, secondaire ou tertiaire</strong> selon le nombre de carbones directement liés au carbone porteur de l'halogène. Le groupe $X^-$ qui part est le <strong>nucléofuge</strong> (ou groupe partant) : plus il est stable une fois parti (base faible), meilleur nucléofuge il est. Ordre de qualité : $I^- > Br^- > Cl^- \\gg F^-$.</p>

    <h3>2. Mécanisme SN2 : substitution concertée</h3>
    <p>Dans un mécanisme $S_N2$ (« substitution nucléophile bimoléculaire »), le nucléophile attaque le carbone <strong>du côté opposé</strong> au nucléofuge, exactement quand la liaison $C-X$ se rompt : c'est une seule étape, sans intermédiaire. La vitesse dépend à la fois de la concentration du substrat et du nucléophile : $v=k[R X][Nu^-]$.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 260 90" width="100%">
          <text x="5" y="45" font-family="IBM Plex Mono" font-size="12" fill="#2DD4C4">Nu⁻</text>
          <line x1="28" y1="42" x2="70" y2="42" stroke="#2DD4C4" stroke-width="1.6" marker-end="url(#sn2arr)"/>
          <circle cx="110" cy="42" r="14" fill="none" stroke="#EAF0FB" stroke-width="1.3" stroke-dasharray="2,2"/>
          <text x="103" y="46" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">C</text>
          <line x1="96" y1="42" x2="80" y2="42" stroke="#EAF0FB" stroke-width="1.2" stroke-dasharray="2,2"/>
          <line x1="124" y1="42" x2="140" y2="42" stroke="#EAF0FB" stroke-width="1.2" stroke-dasharray="2,2"/>
          <text x="145" y="46" font-family="IBM Plex Mono" font-size="12" fill="#FF6B6F">X</text>
          <line x1="158" y1="42" x2="200" y2="42" stroke="#FF6B6F" stroke-width="1.6" marker-end="url(#sn2arr)"/>
          <text x="205" y="46" font-family="IBM Plex Mono" font-size="12" fill="#FF6B6F">X⁻</text>
          <text x="95" y="15" font-family="IBM Plex Mono" font-size="9" fill="#9B82FF">état de transition (5 liaisons partielles)</text>
          <text x="30" y="75" font-family="IBM Plex Mono" font-size="9" fill="#5A6472">attaque en dos à dos, opposée à X</text>
          <defs><marker id="sn2arr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker></defs>
        </svg>
        <span>Le nucléophile attaque à 180° du nucléofuge : les trois autres substituants se retournent « comme un parapluie » — c'est l'inversion de Walden</span>
      </div>
    </div>
    <div class="key-point">
      <span class="eyebrow">Point clé — stéréochimie SN2</span>
      L'attaque en dos à dos <strong>inverse la configuration</strong> au carbone asymétrique (inversion de Walden) : un substrat $(R)$ pur donne un produit $(S)$ pur (ou l'inverse selon les priorités CIP). Le SN2 est favorisé sur un carbone <strong>peu encombré</strong> (méthyle > primaire > secondaire ≫ tertiaire, quasi impossible) et par un <strong>nucléophile fort</strong> en solvant polaire aprotique (DMSO, acétone...).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'inversion de Walden en SN2 transforme systématiquement un substrat (R) pur en produit (S) pur (ou l'inverse) — un résultat stéréochimique d'une régularité parfaite qui a permis à Hughes et Ingold de distinguer ce mécanisme du SN1. Pourquoi cette inversion totale et systématique constitue-t-elle une preuve expérimentale bien plus solide de l'attaque en dos à dos qu'une simple mesure de vitesse de réaction ne pourrait le faire ?
    </div>

    <h3>3. Mécanisme SN1 : substitution en deux étapes</h3>
    <p>Dans un mécanisme $S_N1$ (« unimoléculaire »), la liaison $C-X$ se rompt <strong>d'abord</strong>, spontanément, formant un carbocation ; le nucléophile attaque <strong>ensuite</strong> ce carbocation plan, des deux côtés possibles. La vitesse ne dépend que du substrat : $v=k[RX]$ — l'étape lente (cinétiquement déterminante) est la formation du carbocation.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — stéréochimie SN1</span>
      Le carbocation intermédiaire étant <strong>plan</strong> ($sp^2$), le nucléophile peut l'attaquer par les deux faces avec une probabilité presque égale : on obtient un mélange proche de deux énantiomères, c'est-à-dire une <strong>racémisation</strong> partielle (souvent avec un léger excès d'inversion, l'ion X⁻ pouvant encore gêner une face). Le SN1 est favorisé sur un carbone <strong>encombré</strong> (tertiaire ≫ secondaire), car ce sont les carbocations les plus stables, et par un solvant <strong>polaire protique</strong> (eau, alcools) qui stabilise les ions par solvatation.
    </div>

    <h3>4. Comment choisir entre SN1 et SN2</h3>
    <table class="mini-table">
      <tr><th>Facteur</th><th>Favorise SN2</th><th>Favorise SN1</th></tr>
      <tr><td>Classe du substrat</td><td>méthyle, primaire</td><td>tertiaire (secondaire : les deux possibles)</td></tr>
      <tr><td>Nucléophile</td><td>fort et peu encombré (CN⁻, RO⁻, I⁻)</td><td>faible (H₂O, ROH) — souvent aussi le solvant</td></tr>
      <tr><td>Solvant</td><td>polaire aprotique (acétone, DMSO)</td><td>polaire protique (eau, alcool)</td></tr>
      <tr><td>Nucléofuge</td><td>bon nucléofuge nécessaire dans les deux cas</td><td>bon nucléofuge nécessaire (encore plus critique)</td></tr>
      <tr><td>Cinétique</td><td>ordre 2 : v=k[RX][Nu⁻]</td><td>ordre 1 : v=k[RX]</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> le (S)-2-bromobutane réagit avec l'ion cyanure CN⁻ dans l'acétone. Quel mécanisme, et quel(s) produit(s) ?</p>
      <p><strong>Solution :</strong> substrat secondaire, nucléophile fort (CN⁻), solvant polaire aprotique (acétone) : tout pousse vers SN2. L'attaque se fait à 180° du brome, avec inversion de configuration.</p>
      <p class="example-answer">Réponse : un seul produit, le 2-méthylbutanenitrile de configuration inversée (R), obtenu par SN2 pur.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La classification SN1/SN2 présentée ici décrit deux mécanismes « limites » — la réalité expérimentale se situe parfois entre les deux, avec un caractère partiellement SN1 et partiellement SN2 selon les conditions précises. Pourquoi un modèle simplifié en deux catégories nettes reste-t-il malgré tout un outil pédagogique et prédictif aussi utile, même s'il ne capture pas toute la complexité du continuum réel ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La distinction SN1/SN2, établie il y a près d'un siècle par Hughes et Ingold, continue de guider la conception de synthons pharmaceutiques modernes : les chimistes médicinaux exploitent aujourd'hui des substrats et des conditions soigneusement choisis pour obtenir sélectivement un seul énantiomère d'un médicament par SN2 stéréospécifique, évitant ainsi les risques associés à un mélange racémique (rappelle-toi la tragédie de la thalidomide). Par ailleurs, les études cinétiques modernes utilisant des techniques spectroscopiques ultra-rapides permettent aujourd'hui d'observer directement, en temps réel, la formation et la durée de vie des carbocations intermédiaires du mécanisme SN1, confirmant expérimentalement ce que Hughes et Ingold n'avaient pu que déduire indirectement.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des catalyseurs capables de forcer systématiquement un substrat normalement enclin au SN1 (encombré, carbocation stable) à réagir malgré tout par SN2 stéréospécifique, pour un meilleur contrôle de la stéréochimie du produit final ? C'est un défi de recherche actif en synthèse organique asymétrique.</p>
    <p><strong>Technologie émergente :</strong> les techniques de spectroscopie femtoseconde, capables de capturer des événements moléculaires se déroulant en quelques millionièmes de milliardième de seconde, permettent aujourd'hui d'observer directement la formation d'un carbocation intermédiaire lors d'un mécanisme SN1, une prouesse inimaginable à l'époque de Hughes et Ingold.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Halogénoalcane (C-X polarisé) → substrat + nucléophile + solvant + nucléofuge → SN2 (concerté, inversion de Walden) ou SN1 (carbocation, racémisation) → produit stéréochimiquement déterminé
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$v_{SN2} = k[RX][Nu^-] \\qquad\\text{vs}\\qquad v_{SN1} = k[RX]$$
      Cette différence d'ordre cinétique, mesurable expérimentalement en faisant varier séparément les concentrations, est très exactement la preuve qui a permis à Hughes et Ingold de distinguer, pour la première fois, deux mécanismes de substitution aux résultats globaux parfois similaires mais aux chemins réactionnels fondamentalement différents.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>SN2 : une seule étape, attaque à 180° du nucléofuge, inversion de Walden, cinétique d'ordre 2</li>
        <li>SN1 : deux étapes via un carbocation plan, racémisation partielle, cinétique d'ordre 1</li>
        <li>SN2 favorisé par un substrat peu encombré + nucléophile fort + solvant polaire aprotique</li>
        <li>SN1 favorisé par un substrat encombré (carbocation stable) + solvant polaire protique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que SN1 donne toujours un mélange 50/50 parfait — en réalité une racémisation légèrement incomplète est fréquente</li>
        <li>Oublier qu'un substrat tertiaire ne peut quasiment jamais réagir en SN2 (encombrement stérique trop important)</li>
        <li>Confondre force du nucléophile et basicité : un bon nucléophile n'est pas toujours une base forte (I⁻ est un excellent nucléophile mais une base faible)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le bromure de tert-butyle réagit avec l'eau (solvant). Le mécanisme attendu est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org6e1" value="wrong">SN2, car l'eau est un bon nucléophile</label>
          <label class="option"><input type="radio" name="org6e1" value="right">SN1, car le substrat est tertiaire et le solvant polaire protique</label>
          <label class="option"><input type="radio" name="org6e1" value="wrong">Un mélange 50/50 impossible à prévoir</label>
          <label class="option"><input type="radio" name="org6e1" value="wrong">Aucune réaction n'est possible</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org6e1','org6fb1','Correct — carbone tertiaire (carbocation très stable) + eau, solvant polaire protique et nucléophile faible : c\\'est le profil typique du SN1.','Regarde la classe du substrat (tertiaire) et la nature du solvant (eau = polaire protique).')">Vérifier</button>
        <div class="feedback" id="org6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un mécanisme SN2 sur un carbone asymétrique conduit à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org6e2" value="wrong">une rétention totale de configuration</label>
          <label class="option"><input type="radio" name="org6e2" value="right">une inversion totale de configuration (inversion de Walden)</label>
          <label class="option"><input type="radio" name="org6e2" value="wrong">une racémisation totale</label>
          <label class="option"><input type="radio" name="org6e2" value="wrong">la formation d'un carbocation intermédiaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org6e2','org6fb2','Correct — l\\'attaque en dos à dos retourne les substituants comme un parapluie qui se retourne, d\\'où l\\'inversion complète.','Pense à l\\'attaque à 180° du nucléofuge : que devient la géométrie autour du carbone ?')">Vérifier</button>
        <div class="feedback" id="org6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Parmi I⁻, Br⁻, Cl⁻ et F⁻, le meilleur nucléofuge est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org6e3" value="right">I⁻</label>
          <label class="option"><input type="radio" name="org6e3" value="wrong">Br⁻</label>
          <label class="option"><input type="radio" name="org6e3" value="wrong">Cl⁻</label>
          <label class="option"><input type="radio" name="org6e3" value="wrong">F⁻</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org6e3','org6fb3','Correct — I⁻ est le plus gros et le plus polarisable, donc la base la plus faible et le meilleur nucléofuge de la série.','Un bon nucléofuge est une base FAIBLE, stable une fois qu\\'il est parti.')">Vérifier</button>
        <div class="feedback" id="org6fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si tous les halogénoalcanes réagissaient exclusivement par un seul et même mécanisme (SN1 ou SN2) : quelles conséquences cela aurait-il pour le contrôle stéréochimique en synthèse organique ?</li>
        <li>Pourquoi Hughes et Ingold ont-ils eu besoin de mesurer à la fois la cinétique ET la stéréochimie des produits pour établir leur théorie, plutôt que de se contenter d'une seule de ces deux approches ?</li>
        <li>Quelle serait la conséquence, pour l'industrie pharmaceutique, d'une méthode garantissant à coup sûr un mécanisme SN2 stéréospécifique quel que soit le substrat de départ, même les plus encombrés ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>E. D. Hughes, C. K. Ingold, « Mechanism of Substitution at a Saturated Carbon Atom », Journal of the Chemical Society, 1935 — l'article fondateur de la distinction SN1/SN2.</li>
        <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur la substitution nucléophile en licence.</li>
        <li>A. H. Zewail, « Femtochemistry: Atomic-Scale Dynamics of the Chemical Bond », Nobel Lecture, prix Nobel de chimie 1999 — travaux fondateurs de la spectroscopie femtoseconde permettant d'observer les intermédiaires réactionnels.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais prédire, à partir des seules conditions expérimentales, quel mécanisme de substitution dominera et quelle stéréochimie en résultera — une compétence directement transposable à la conception de synthèses pharmaceutiques stéréosélectives. Le chapitre suivant, « Réactions d'élimination (E1/E2) et compétition SN/E », va explorer un tout autre destin possible pour ces mêmes halogénoalcanes : au lieu d'une substitution, une élimination qui forme un alcène. Comme le rappelle l'héritage de Hughes et Ingold : une observation expérimentale suffisamment rigoureuse et systématique peut révéler, derrière un résultat globalement similaire, deux chemins réactionnels aussi différents que le jour et la nuit.</p>
  `
};

ORG_NOVA_KB[orgKey('Dérivés halogénés et substitution nucléophile (SN1/SN2)')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Substitution nucléophile SN1/SN2 ». Demande-moi la différence entre les deux mécanismes, ou un indice sur un exercice.",
  rules: [
    { test:/sn2/i, replies:["SN2 : une seule étape, le nucléophile attaque à 180° du nucléofuge (attaque en dos à dos). Cinétique d'ordre 2, inversion de Walden systématique. Favorisé sur substrat peu encombré."] },
    { test:/sn1/i, replies:["SN1 : deux étapes, en passant par un carbocation plan. Cinétique d'ordre 1 (ne dépend que du substrat), racémisation partielle. Favorisé sur substrat encombré (tertiaire) et solvant polaire protique."] },
    { test:/walden|inversion/i, replies:["L'inversion de Walden est le retournement de configuration causé par l'attaque en dos à dos du SN2 — comme un parapluie qui se retourne dans le vent."] },
    { test:/nucl[ée]ofuge/i, replies:["Le nucléofuge (groupe partant) est d'autant meilleur qu'il est stable une fois parti, donc une base faible. Ordre : I⁻ > Br⁻ > Cl⁻ ≫ F⁻."] },
    { test:/solvant/i, replies:["Solvant polaire aprotique (acétone, DMSO) → favorise SN2 (le nucléophile reste 'libre' et réactif). Solvant polaire protique (eau, alcool) → favorise SN1 (stabilise les ions par solvatation)."] },
    { test:/racémis/i, replies:["La racémisation en SN1 vient du caractère plan du carbocation : le nucléophile peut l'attaquer des deux côtés, formant un mélange proche de 50/50 des deux énantiomères."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : regarde la classe du carbone (tertiaire) et le solvant (l'eau).","Indice niveau 2 : un carbone tertiaire donne un carbocation très stable.","Indice niveau 3 : c'est un mécanisme SN1."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la géométrie de l'attaque à 180°.","Indice niveau 2 : les substituants se retournent comme un parapluie.","Indice niveau 3 : inversion totale de configuration."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : un bon nucléofuge est une base faible et stable.","Indice niveau 2 : plus l'ion est gros et polarisable, plus il est stable seul.","Indice niveau 3 : c'est I⁻."] }
  ]
};

/* =========================== CHAPITRE 7 — Réactions d'élimination (E1/E2) et compétition SN/E =========================== */
ORG_CHAPTERS[orgKey('Réactions d\'élimination (E1/E2) et compétition SN/E')] = {
  objectives: [
    "Décrire le mécanisme E2 (concerté, anti-périplanaire) et le mécanisme E1 (via carbocation)",
    "Appliquer la règle de Zaïtsev pour prédire l'alcène majoritaire, et savoir quand Hofmann s'applique",
    "Prévoir si un substrat/nucléophile-base donné conduira à une substitution, une élimination, ou un mélange",
    "Évaluer pourquoi un même halogénoalcane, face à un même réactif basique, peut donner des produits totalement différents selon un simple encombrement stérique du réactif"
  ],
  prereqs: ["Dérivés halogénés et substitution nucléophile (SN1/SN2)"],
  bodyHtml: `
    <p>August Wilhelm von Hofmann, l'un des plus grands chimistes organiciens du XIXe siècle et fondateur de l'école de chimie allemande qui formera des générations de chercheurs, observe en étudiant la dégradation d'amines quaternaires un résultat qui semble à première vue contredire l'intuition la plus naturelle : au lieu de former l'alcène le plus stable (celui auquel on s'attendrait thermodynamiquement), la réaction produit préférentiellement l'alcène le moins substitué. Cette observation, aujourd'hui connue sous le nom d'élimination de Hofmann, illustre un principe fondamental que ce chapitre te propose d'explorer : en chimie organique, le produit obtenu n'est pas toujours le plus stable, mais parfois simplement le plus facile à atteindre.</p>
    <p>Cette distinction entre contrôle thermodynamique (Zaïtsev) et contrôle cinétique (Hofmann) n'est jamais un détail théorique secondaire : elle permet à un chimiste de synthèse de choisir délibérément son réactif — une base fine ou une base encombrée — pour orienter précisément une réaction vers le produit qu'il recherche, plutôt que de subir passivement le résultat thermodynamiquement le plus stable.</p>
    <p>Face à un halogénoalcane, un réactif basique ne se contente pas toujours de substituer $X$ : il peut aussi arracher un <strong>hydrogène en β</strong> (sur le carbone voisin), provoquant le départ simultané de $X^-$ et la formation d'une double liaison. C'est une réaction d'<strong>élimination</strong>, notée $E$ — et elle est presque toujours en compétition avec la substitution. À la fin de ce chapitre, tu sauras prédire, pour n'importe quel couple substrat/réactif, si c'est une substitution, une élimination, ou un mélange des deux qui l'emportera.</p>

    <h3>1. Mécanisme E2 : élimination concertée</h3>
    <p>Comme le SN2, l'E2 se déroule en <strong>une seule étape</strong> : une base forte arrache un $H$ en β pendant que $X^-$ part, formant la double liaison en même temps. Pour que les orbitales soient bien alignées, le $H$ arraché et le nucléofuge doivent être <strong>anti-périplanaires</strong> (dans le même plan, de part et d'autre, à 180°).</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 100" width="100%">
          <text x="10" y="20" font-family="IBM Plex Mono" font-size="12" fill="#2DD4C4">B⁻</text>
          <line x1="26" y1="17" x2="55" y2="35" stroke="#2DD4C4" stroke-width="1.5" marker-end="url(#e2arr)"/>
          <text x="60" y="42" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">H</text>
          <line x1="65" y1="45" x2="65" y2="60" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="58" y="75" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">Cβ</text>
          <line x1="78" y1="70" x2="105" y2="70" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="112" y="75" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">Cα</text>
          <line x1="126" y1="70" x2="126" y2="45" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="120" y="40" font-family="IBM Plex Mono" font-size="11" fill="#FF6B6F">X</text>
          <path d="M78,66 Q100,55 122,66" stroke="#F0B94D" stroke-width="1.4" fill="none" marker-end="url(#e2arr2)"/>
          <line x1="130" y1="42" x2="165" y2="30" stroke="#FF6B6F" stroke-width="1.5" marker-end="url(#e2arr)"/>
          <text x="170" y="28" font-family="IBM Plex Mono" font-size="12" fill="#FF6B6F">X⁻</text>
          <text x="30" y="95" font-family="IBM Plex Mono" font-size="9" fill="#5A6472">H et X anti-périplanaires (180°) : les 3 mouvements sont simultanés</text>
          <defs>
            <marker id="e2arr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker>
            <marker id="e2arr2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#F0B94D"/></marker>
          </defs>
        </svg>
        <span>La base arrache H, le doublet C−H forme la nouvelle liaison π, et X⁻ part — les trois événements sont concertés</span>
      </div>
    </div>
    <p>Cinétique d'ordre 2 ($v=k[RX][B^-]$), et favorisée par une <strong>base forte</strong> (souvent aussi encombrée : $tBuO^-$, $LDA$).</p>

    <h3>2. Mécanisme E1 : élimination en deux étapes</h3>
    <p>Comme le SN1, l'E1 démarre par le départ spontané de $X^-$, formant un carbocation ; une base (même faible) arrache <strong>ensuite</strong> un $H$ en β pour former la double liaison. Cinétique d'ordre 1 ($v=k[RX]$), favorisée par un substrat qui donne un carbocation stable (tertiaire) et un solvant polaire protique — exactement les mêmes conditions que le SN1, avec lequel l'E1 est toujours en compétition directe.</p>

    <h3>3. Règle de Zaïtsev et règle de Hofmann</h3>
    <div class="key-point">
      <span class="eyebrow">Règle de Zaïtsev (produit majoritaire "normal")</span>
      Quand plusieurs alcènes sont possibles, le produit majoritaire est en général <strong>le plus substitué</strong> (le plus stable, car les alcènes tétra- et tri-substitués sont favorisés thermodynamiquement par hyperconjugaison). Cette règle s'applique typiquement en E1, et en E2 avec une base peu encombrée.
    </div>
    <div class="key-point">
      <span class="eyebrow">Règle de Hofmann (exception avec base encombrée)</span>
      Avec une <strong>base volumineuse</strong> (comme $tBuO^-$), l'accès stérique au $H$ le plus encombré devient difficile : la base arrache alors préférentiellement un $H$ plus accessible, produisant l'alcène <strong>le moins substitué</strong>. C'est un produit de contrôle cinétique (le plus facile à atteindre), pas thermodynamique.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le produit de Zaïtsev est thermodynamiquement le plus stable, tandis que le produit de Hofmann est cinétiquement le plus rapide à former avec une base encombrée. En reliant cela à la distinction contrôle cinétique/contrôle thermodynamique, peux-tu imaginer une expérience simple (par exemple en faisant varier la température ou en laissant la réaction se poursuivre plus longtemps) qui pourrait, dans certains cas, faire évoluer un mélange initialement Hofmann vers un produit final plus proche de Zaïtsev ?
    </div>

    <h3>4. Substitution ou élimination : comment trancher</h3>
    <table class="mini-table">
      <tr><th>Réactif</th><th>Substrat 1° (peu encombré)</th><th>Substrat 3° (encombré)</th></tr>
      <tr><td>Base/nucléophile fort, peu encombré (RO⁻, CN⁻)</td><td>SN2 majoritaire</td><td>E2 majoritaire (SN2 quasi impossible)</td></tr>
      <tr><td>Base forte encombrée (tBuO⁻)</td><td>E2 (Hofmann)</td><td>E2 (Hofmann)</td></tr>
      <tr><td>Nucléophile/base faible (H₂O, ROH, chauffage)</td><td>peu réactif</td><td>mélange SN1 + E1 (chauffage favorise E1)</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> le 2-bromo-2-méthylbutane est traité par l'éthanolate de tert-butyle ($tBuO^-$), une base forte et très encombrée. Quel produit majoritaire ?</p>
      <p><strong>Solution :</strong> substrat tertiaire (SN2 impossible), base forte et encombrée : mécanisme E2 selon Hofmann (la base accède plus facilement à l'hydrogène le moins encombré).</p>
      <p class="example-answer">Réponse : l'alcène le moins substitué (2-méthyl-1-butène) est majoritaire, contrairement à la règle de Zaïtsev.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La compétition entre substitution et élimination signifie que le chimiste ne contrôle jamais totalement le résultat d'une réaction — un mélange de produits est souvent obtenu, même dans des conditions optimisées. Pourquoi cette réalité expérimentale, moins « propre » que les schémas réactionnels présentés dans un manuel, reste-t-elle malgré tout gérable en pratique grâce à un choix judicieux des conditions (substrat, réactif, solvant, température) ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Le contrôle précis de la compétition entre substitution et élimination, ainsi qu'entre les produits de Zaïtsev et de Hofmann, reste un enjeu majeur de la synthèse organique industrielle : la fabrication sélective d'un seul isomère d'alcène, plutôt que d'un mélange nécessitant une purification coûteuse, peut faire toute la différence économique d'un procédé chimique à grande échelle. Les chimistes de synthèse développent aujourd'hui des catalyseurs et des bases sur mesure, conçus par modélisation moléculaire, pour orienter précisément une réaction d'élimination vers le produit recherché, minimisant ainsi les déchets et les coûts de séparation.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des catalyseurs universels capables de basculer à volonté entre contrôle de Zaïtsev et contrôle de Hofmann pour un même substrat, simplement en modifiant un paramètre externe (température, lumière, champ électrique) ? C'est un axe de recherche prometteur pour la synthèse organique sélective de nouvelle génération.</p>
    <p><strong>Technologie émergente :</strong> les bases chirales encombrées de nouvelle génération, conçues pour combiner sélectivité de Hofmann et contrôle stéréochimique simultané, permettent aujourd'hui d'orienter une élimination vers un alcène à la fois régiosélectif et stéréosélectif, un double contrôle particulièrement recherché en synthèse pharmaceutique.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Halogénoalcane + base → E2 (concerté, anti-périplanaire, base forte) ou E1 (carbocation, mêmes conditions que SN1) → Zaïtsev (base fine, alcène le plus stable) ou Hofmann (base encombrée, alcène le moins substitué) → compétition constante avec la substitution SN1/SN2
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Contrôle thermodynamique (Zaïtsev)} \\ \\longleftrightarrow \\ \\text{Contrôle cinétique (Hofmann)}$$
      Cette opposition conceptuelle, plus qualitative qu'une formule numérique, résume l'enseignement central de ce chapitre : le produit majoritaire d'une réaction chimique n'est pas toujours le plus stable thermodynamiquement, mais parfois simplement celui que les conditions expérimentales — ici, l'encombrement stérique de la base — rendent le plus facile à atteindre.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>E2 : concerté, géométrie anti-périplanaire exigée, cinétique d'ordre 2, base forte</li>
        <li>E1 : deux étapes via carbocation, cinétique d'ordre 1, mêmes conditions que le SN1</li>
        <li>Zaïtsev : alcène le plus substitué (majoritaire, sauf base encombrée)</li>
        <li>Hofmann : alcène le moins substitué, avec une base volumineuse (tBuO⁻)</li>
        <li>Substrat tertiaire + base forte encombrée → toujours E2, jamais SN2</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier la condition d'anti-périplanarité pour l'E2 — sans elle, la réaction ne peut pas se produire par ce mécanisme</li>
        <li>Appliquer Zaïtsev alors que la base est encombrée (il faut alors penser Hofmann)</li>
        <li>Croire que SN et E sont indépendants : ils partagent presque toujours le même substrat de départ et sont en concurrence directe</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le mécanisme E2 exige que l'hydrogène arraché et le nucléofuge soient :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org7e1" value="wrong">gauches (60°)</label>
          <label class="option"><input type="radio" name="org7e1" value="right">anti-périplanaires (180°)</label>
          <label class="option"><input type="radio" name="org7e1" value="wrong">éclipsés (0°)</label>
          <label class="option"><input type="radio" name="org7e1" value="wrong">peu importe l'angle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org7e1','org7fb1','Correct — l\'alignement à 180° permet un recouvrement orbitalaire optimal pour former la liaison π en une seule étape.','Pense au recouvrement des orbitales nécessaire pour former la double liaison en une étape.')">Vérifier</button>
        <div class="feedback" id="org7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Avec une base volumineuse comme tBuO⁻, l'alcène majoritairement obtenu est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org7e2" value="wrong">le plus substitué (Zaïtsev)</label>
          <label class="option"><input type="radio" name="org7e2" value="right">le moins substitué (Hofmann)</label>
          <label class="option"><input type="radio" name="org7e2" value="wrong">toujours un mélange 50/50</label>
          <label class="option"><input type="radio" name="org7e2" value="wrong">aucun alcène ne se forme</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org7e2','org7fb2','Correct — l\'encombrement stérique de la base l\'empêche d\'accéder à l\'hydrogène le plus substitué, d\'où le produit de Hofmann.','Une base encombrée a plus de mal à atteindre un hydrogène entouré de nombreux groupes.')">Vérifier</button>
        <div class="feedback" id="org7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'E1 et le SN1 partagent :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org7e3" value="right">le même intermédiaire carbocationique et les mêmes conditions favorables</label>
          <label class="option"><input type="radio" name="org7e3" value="wrong">rien en commun</label>
          <label class="option"><input type="radio" name="org7e3" value="wrong">une cinétique d'ordre 2 commune</label>
          <label class="option"><input type="radio" name="org7e3" value="wrong">une géométrie anti-périplanaire obligatoire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org7e3','org7fb3','Correct — les deux passent par le même carbocation, formé dans les mêmes conditions (substrat encombré, solvant polaire protique) ; seule l\'étape suivante diffère (attaque nucléophile ou départ d\'un H).','Les deux mécanismes commencent par la même étape lente : laquelle ?')">Vérifier</button>
        <div class="feedback" id="org7fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si toutes les bases étaient de taille comparable (sans différence d'encombrement stérique) : la distinction entre Zaïtsev et Hofmann aurait-elle encore un sens pratique ?</li>
        <li>Pourquoi Hofmann a-t-il observé un résultat qui semblait à première vue contredire l'intuition thermodynamique la plus naturelle, et comment cette anomalie apparente a-t-elle fini par enrichir notre compréhension des mécanismes réactionnels ?</li>
        <li>Quelle serait la conséquence, pour l'industrie chimique, d'une méthode universelle capable de supprimer totalement la compétition entre substitution et élimination pour obtenir systématiquement un produit unique et pur ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>A. W. von Hofmann, « Beiträge zur Kenntniss der flüchtigen organischen Basen », Annalen der Chemie, 1851 — travaux fondateurs de l'élimination de Hofmann.</li>
        <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur les réactions d'élimination en licence.</li>
        <li>A. N. Zaïtsev, « Zur Frage über die Reihenfolge der Wasserabspaltung aus den Alkoholen », Annalen der Chemie und Pharmacie, 1875 — mémoire fondateur de la règle de Zaïtsev.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais prédire, pour n'importe quel couple substrat/réactif, si une substitution, une élimination, ou un mélange des deux l'emportera — et quel alcène spécifique sera majoritairement formé selon le contrôle thermodynamique ou cinétique en jeu. Le chapitre suivant, « Alcools, éthers et époxydes », va explorer une nouvelle famille de composés oxygénés, dont la chimie s'appuie directement sur les mécanismes de substitution et d'élimination que tu viens de maîtriser. Comme le rappelle la contribution durable de Hofmann à la chimie organique : un résultat expérimental qui semble d'abord contredire l'intuition la plus évidente peut, une fois compris, enrichir considérablement la compréhension collective d'un mécanisme réactionnel.</p>
  `
};

ORG_NOVA_KB[orgKey('Réactions d\'élimination (E1/E2) et compétition SN/E')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Élimination E1/E2 ». Demande-moi la différence entre Zaïtsev et Hofmann, ou un indice sur un exercice.",
  rules: [
    { test:/e2/i, replies:["E2 : élimination concertée en une étape, exige une géométrie anti-périplanaire entre H et le nucléofuge. Cinétique d'ordre 2, favorisée par une base forte."] },
    { test:/e1/i, replies:["E1 : élimination en deux étapes, via le même carbocation qu'en SN1. Cinétique d'ordre 1, favorisée par un substrat encombré et un solvant polaire protique."] },
    { test:/za[iï]tsev/i, replies:["La règle de Zaïtsev prédit l'alcène le plus substitué (le plus stable) comme produit majoritaire — sauf si la base est très encombrée (voir Hofmann)."] },
    { test:/hofmann/i, replies:["Avec une base encombrée (tBuO⁻ par exemple), l'accès stérique favorise l'hydrogène le moins gêné : on obtient l'alcène le MOINS substitué, contrairement à Zaïtsev."] },
    { test:/anti.p[ée]riplanaire/i, replies:["L'anti-périplanarité (H et X à 180°, dans le même plan) est indispensable en E2 pour un bon recouvrement orbitalaire lors de la formation de la double liaison."] },
    { test:/substitution.*[ée]limination|sn.*e[12]|comp[ée]tition/i, replies:["Substrat peu encombré + nucléophile fort peu encombré → SN2 gagne. Substrat encombré ou base forte encombrée → E2 gagne. Substrat tertiaire + réactif faible/chauffage → mélange SN1/E1."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense au recouvrement orbitalaire nécessaire.","Indice niveau 2 : il faut un alignement à 180°.","Indice niveau 3 : anti-périplanaires."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : la base est très encombrée (tBuO⁻).","Indice niveau 2 : elle a du mal à atteindre l'hydrogène le plus substitué.","Indice niveau 3 : c'est le produit de Hofmann, le moins substitué."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : les deux mécanismes commencent pareil.","Indice niveau 2 : la même étape lente initiale, un carbocation.","Indice niveau 3 : le même intermédiaire carbocationique."] }
  ]
};

/* =========================== CHAPITRE 8 — Alcools, éthers et époxydes =========================== */
ORG_CHAPTERS[orgKey('Alcools, éthers et époxydes')] = {
  objectives: [
    "Nommer et classer les alcools (primaire, secondaire, tertiaire) et expliquer leurs propriétés physiques",
    "Décrire les principales réactions des alcools : déshydratation, substitution, oxydation",
    "Expliquer pourquoi les époxydes, contrairement aux éthers ordinaires, sont très réactifs",
    "Évaluer pourquoi l'oxyde d'éthylène, le plus simple des époxydes, est à la fois l'un des produits chimiques les plus dangereux et l'un des plus indispensables de toute l'industrie chimique moderne"
  ],
  prereqs: ["Réactions d'élimination (E1/E2) et compétition SN/E"],
  bodyHtml: `
    <p>L'oxyde d'éthylène, l'époxyde le plus simple qui soit, illustre à merveille le double visage de cette famille de composés : gaz incolore extrêmement inflammable et toxique, capable de provoquer des explosions dévastatrices s'il est mal manipulé, il n'en demeure pas moins l'un des intermédiaires chimiques les plus stratégiques de l'industrie mondiale — indispensable à la fabrication de l'éthylène glycol (antigel), des polyesters, des détergents, et même utilisé comme agent stérilisant pour le matériel médical à usage unique, précisément à cause de la réactivité extrême de son cycle tendu.</p>
    <p>Cette dualité — danger et utilité indissociables — n'a rien d'un hasard : c'est très exactement la tension géométrique du cycle à trois chaînons, qui rend l'époxyde si réactif et donc si dangereux à manipuler en vrac, qui en fait aussi un réactif de choix pour synthétiser des milliers de molécules différentes en laboratoire comme en usine. Ce chapitre te propose de comprendre cette réactivité si particulière, héritière directe de la géométrie moléculaire étudiée depuis le début de ce module.</p>
    <p>Les alcools $R-OH$, éthers $R-O-R'$ et époxydes (éthers cycliques à 3 chaînons) partagent le même atome d'oxygène divalent, mais leur réactivité diffère radicalement selon leur environnement. À la fin de ce chapitre, tu sauras prédire le comportement de chacune de ces trois familles, et comprendre pourquoi la simple tension géométrique d'un cycle peut transformer un composé chimiquement inerte en un réactif hautement énergétique.</p>

    <h3>1. Classes et propriétés physiques des alcools</h3>
    <p>Un alcool est <strong>primaire, secondaire ou tertiaire</strong> selon la classe du carbone porteur du $-OH$ (comme pour les halogénoalcanes). La liaison $O-H$, très polarisée, permet des <strong>liaisons hydrogène</strong> intermoléculaires : les alcools ont donc des températures d'ébullition nettement plus hautes que les alcanes de masse comparable, et sont miscibles à l'eau pour les plus petits d'entre eux.</p>
    <p>Un alcool est à la fois une <strong>base faible</strong> (le doublet de l'oxygène peut être protoné, $pKa$ de $ROH_2^+ \\approx -2$) et un <strong>acide faible</strong> ($pKa$ de $ROH \\approx 16-18$, comparable à l'eau) : il peut être déprotoné par une base forte comme $Na$ ou $NaH$ pour former un alcoolate $RO^-$, un excellent nucléophile.</p>

    <h3>2. Réactions des alcools : substitution et déshydratation</h3>
    <p>Le groupe $-OH$ est un <strong>mauvais nucléofuge</strong> (l'ion hydroxyde $HO^-$ est une base trop forte pour partir facilement) : il faut d'abord l'activer.</p>
    <table class="mini-table">
      <tr><th>Réaction</th><th>Comment</th><th>Résultat</th></tr>
      <tr><td>Substitution par HX</td><td>protonation de OH par HX (H⁺ transforme OH en bon nucléofuge H₂O)</td><td>halogénoalcane (SN1 sur tertiaire, SN2 sur primaire)</td></tr>
      <tr><td>Déshydratation acide</td><td>chauffage en présence de H₂SO₄ ou H₃PO₄ concentré</td><td>alcène, souvent selon Zaïtsev (mécanisme E1 en général)</td></tr>
      <tr><td>Activation par tosylation</td><td>ROH + TsCl → ROTs (bon nucléofuge, sans toucher à la configuration)</td><td>substrat idéal pour SN2 propre, sans racémisation</td></tr>
    </table>

    <h3>3. Oxydation des alcools</h3>
    <p>Le degré d'oxydation atteint dépend directement de la <strong>classe de l'alcool</strong> :</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 260 70" width="100%">
          <text x="5" y="40" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">R-CH₂OH</text>
          <text x="8" y="55" font-family="IBM Plex Mono" font-size="8" fill="#5A6472">(1°)</text>
          <line x1="75" y1="35" x2="105" y2="35" stroke="#F0B94D" stroke-width="1.5" marker-end="url(#oxarr)"/>
          <text x="108" y="40" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">R-CHO</text>
          <line x1="160" y1="35" x2="190" y2="35" stroke="#F0B94D" stroke-width="1.5" marker-end="url(#oxarr)"/>
          <text x="193" y="40" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">R-COOH</text>
          <text x="80" y="20" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">[O] doux</text>
          <text x="163" y="20" font-family="IBM Plex Mono" font-size="8" fill="#FF6B6F">[O] fort</text>
        </svg>
        <span>Un alcool primaire s'oxyde d'abord en aldéhyde (oxydant doux type PCC), puis en acide carboxylique (oxydant fort type KMnO₄ ou K₂Cr₂O₇ en excès)</span>
      </div>
    </div>
    <table class="mini-table">
      <tr><th>Classe d'alcool</th><th>Produit d'oxydation</th></tr>
      <tr><td>Primaire</td><td>aldéhyde (oxydant doux), puis acide carboxylique (oxydant fort ou excès)</td></tr>
      <tr><td>Secondaire</td><td>cétone (s'arrête là, pas d'oxydation supplémentaire possible sans casser la chaîne)</td></tr>
      <tr><td>Tertiaire</td><td>pas d'oxydation possible (aucun H sur le carbone porteur de OH)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un alcool tertiaire ne peut jamais être oxydé par les méthodes classiques, car son carbone porteur du groupe OH ne possède aucun hydrogène à retirer. En reliant cela au mécanisme d'oxydation d'un alcool primaire ou secondaire (qui nécessite justement de retirer un hydrogène porté par ce carbone), pourquoi cette simple absence d'hydrogène bloque-t-elle totalement la réaction, plutôt que de simplement la ralentir ?
    </div>

    <h3>4. Éthers : synthèse de Williamson</h3>
    <p>Un éther $R-O-R'$ se prépare par la <strong>synthèse de Williamson</strong> : un alcoolate $RO^-$ (nucléophile fort) attaque un halogénoalcane $R'X$ en SN2. Les éthers sont chimiquement <strong>peu réactifs</strong> (pas de liaison polarisée exploitable facilement, pas d'hydrogène acide) : ils servent souvent de solvants inertes pour d'autres réactions (diéthyléther, THF).</p>

    <h3>5. Époxydes : la tension de cycle change tout</h3>
    <p>Un époxyde est un éther cyclique à <strong>3 chaînons</strong> : l'angle de liaison y est forcé à environ 60° au lieu des 109° idéaux, créant une forte <strong>tension de cycle</strong>. Cette tension rend l'époxyde beaucoup plus réactif qu'un éther ordinaire : son ouverture par un nucléophile relâche la tension et est donc thermodynamiquement très favorable.</p>
    <table class="mini-table">
      <tr><th>Milieu</th><th>Mécanisme</th><th>Régiosélectivité</th></tr>
      <tr><td>Basique (Nu⁻ fort)</td><td>SN2-like, sur le carbone le moins encombré</td><td>attaque sur le carbone le moins substitué</td></tr>
      <tr><td>Acide (H⁺ d'abord)</td><td>protonation de O puis attaque SN1-like</td><td>attaque sur le carbone le plus substitué (plus proche d'un carbocation)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      L'ouverture d'un époxyde donne toujours un <strong>diol (ou dérivé) trans</strong> lorsqu'un nucléophile attaque en dos à dos : la stéréochimie de l'ouverture reflète directement le mécanisme SN2-like, même en milieu acide.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'ouverture d'un époxyde change de régiosélectivité selon le milieu (basique : carbone le moins substitué ; acide : carbone le plus substitué), mais donne toujours une stéréochimie trans, quel que soit le milieu. Pourquoi cette stéréochimie trans reste-t-elle constante alors que la position d'attaque, elle, s'inverse selon les conditions ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La chimie des époxydes reste un pilier de l'industrie chimique moderne, avec des enjeux de sécurité considérables : l'explosion d'une usine de production d'oxyde d'éthylène à Pasadena (Texas) en 1989, l'une des catastrophes industrielles les plus coûteuses de l'histoire américaine, a durablement marqué les normes de sécurité de cette industrie. Parallèlement, la recherche en synthèse asymétrique a développé des méthodes d'époxydation catalytique énantiosélective (travaux de Sharpless, prix Nobel de chimie 2001, déjà évoqués au chapitre 3) permettant de produire un seul énantiomère d'époxyde, une avancée cruciale pour la synthèse de médicaments chiraux.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des procédés industriels de production et de manipulation d'époxydes réactifs, comme l'oxyde d'éthylène, offrant une sécurité comparable à des composés chimiques moins énergétiques, sans sacrifier leur utilité industrielle irremplaçable ? C'est un enjeu permanent de génie chimique et de sécurité industrielle.</p>
    <p><strong>Technologie émergente :</strong> les catalyseurs d'époxydation asymétrique de nouvelle génération, capables de produire sélectivement un seul énantiomère d'époxyde avec un rendement et une pureté optique croissants, sont au cœur de la synthèse de nombreux principes actifs pharmaceutiques modernes.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Alcool (OH mauvais nucléofuge, activation nécessaire) → déshydratation/substitution/oxydation selon la classe → éther (Williamson, peu réactif) → époxyde (cycle tendu, très réactif) → ouverture régiosélective selon le milieu
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Réactivité de l'époxyde} \\propto \\text{Tension de cycle (angle ≈ 60° au lieu de 109,5°)}
      $$
      Cette relation, plus conceptuelle qu'une formule numérique stricte, résume l'idée centrale de tout ce chapitre : ce n'est pas la nature chimique de la liaison C-O qui rend l'époxyde si réactif, mais la simple géométrie contrainte de son cycle — la tension accumulée cherchant à se libérer dès qu'un nucléophile lui en offre l'occasion.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Les alcools forment des liaisons hydrogène (Téb élevée) et sont amphotères (acide et base faibles)</li>
        <li>OH est un mauvais nucléofuge : il faut l'activer (protonation, tosylation) avant substitution</li>
        <li>Alcool 1° → aldéhyde → acide carboxylique ; alcool 2° → cétone ; alcool 3° non oxydable</li>
        <li>La synthèse de Williamson (alcoolate + RX, SN2) prépare les éthers</li>
        <li>Les époxydes sont très réactifs à cause de la tension de cycle ; régiosélectivité opposée en milieu acide vs basique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier qu'un alcool tertiaire ne peut pas être oxydé (aucun H sur le carbone porteur de OH)</li>
        <li>Confondre la régiosélectivité de l'ouverture d'époxyde en milieu acide et en milieu basique</li>
        <li>Croire qu'un éther ordinaire est aussi réactif qu'un époxyde — la tension de cycle fait toute la différence</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un alcool secondaire, oxydé par un oxydant fort en excès, donne :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org8e1" value="wrong">un acide carboxylique</label>
          <label class="option"><input type="radio" name="org8e1" value="right">une cétone (l'oxydation s'arrête là)</label>
          <label class="option"><input type="radio" name="org8e1" value="wrong">un aldéhyde</label>
          <label class="option"><input type="radio" name="org8e1" value="wrong">aucune réaction</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org8e1','org8fb1','Correct — une cétone n\'a plus d\'hydrogène sur le carbone carbonyle, donc l\'oxydation ne peut pas aller plus loin.','Combien d\'hydrogènes reste-t-il sur le carbone porteur de l\'oxygène une fois la cétone formée ?')">Vérifier</button>
        <div class="feedback" id="org8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pourquoi faut-il « activer » le OH d'un alcool avant une substitution nucléophile ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="org8e2" value="right">Parce que HO⁻ est une base trop forte pour être un bon nucléofuge</label>
          <label class="option"><input type="radio" name="org8e2" value="wrong">Parce que l'oxygène n'est pas électronégatif</label>
          <label class="option"><input type="radio" name="org8e2" value="wrong">Parce que les alcools ne réagissent jamais</label>
          <label class="option"><input type="radio" name="org8e2" value="wrong">Ce n'est jamais nécessaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org8e2','org8fb2','Correct — un bon nucléofuge doit être une base faible et stable une fois parti ; HO⁻ est trop basique, donc un mauvais nucléofuge tel quel.','Rappelle-toi : un bon nucléofuge est une base FAIBLE.')">Vérifier</button>
        <div class="feedback" id="org8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'ouverture d'un époxyde en milieu acide se fait préférentiellement sur :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org8e3" value="wrong">le carbone le moins substitué</label>
          <label class="option"><input type="radio" name="org8e3" value="right">le carbone le plus substitué (plus proche d'un caractère carbocationique)</label>
          <label class="option"><input type="radio" name="org8e3" value="wrong">les deux carbones à égalité stricte</label>
          <label class="option"><input type="radio" name="org8e3" value="wrong">aucun carbone, l'ouverture est impossible en milieu acide</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org8e3','org8fb3','Correct — en milieu acide, la protonation préalable de l\'oxygène donne un caractère SN1-like à l\'attaque, qui se fait donc là où la charge positive partielle est la plus stable.','En milieu acide, le mécanisme se rapproche d\'un SN1 : où le carbocation serait-il le plus stable ?')">Vérifier</button>
        <div class="feedback" id="org8fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si tous les éthers étaient aussi réactifs que les époxydes : quelles conséquences cela aurait-il pour leur usage courant comme solvants inertes en laboratoire ?</li>
        <li>Pourquoi l'oxyde d'éthylène reste-t-il irremplaçable dans l'industrie chimique malgré les risques considérables associés à sa manipulation ?</li>
        <li>Quelle serait la conséquence, pour l'industrie pharmaceutique, d'une méthode universelle d'époxydation asymétrique garantissant systématiquement un seul énantiomère pur, sans exception ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>A. Wurtz, « Sur une nouvelle classe de radicaux organiques », Annales de Chimie et de Physique, 1859 — travaux fondateurs sur la synthèse de Williamson des éthers.</li>
        <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur les alcools, éthers et époxydes en licence.</li>
        <li>K. B. Sharpless, « Searching for New Reactivity », Nobel Lecture, prix Nobel de chimie 2001 — travaux fondateurs sur l'époxydation asymétrique catalytique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais prédire le comportement des alcools, éthers et époxydes, et comprendre pourquoi la seule géométrie d'un cycle peut transformer un composé chimiquement inerte en un réactif hautement énergétique. Le chapitre suivant, « Composés carbonylés : aldéhydes et cétones », va explorer une nouvelle fonction organique omniprésente, directement issue de l'oxydation des alcools que tu viens d'étudier. Comme le rappelle le double visage de l'oxyde d'éthylène — dangereux et indispensable à la fois : en chimie organique, la réactivité la plus utile est souvent celle qui, mal maîtrisée, peut aussi devenir la plus dangereuse.</p>
  `
};

ORG_NOVA_KB[orgKey('Alcools, éthers et époxydes')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Alcools, éthers et époxydes ». Demande-moi les produits d'oxydation d'un alcool, ou un indice sur un exercice.",
  rules: [
    { test:/oxydation/i, replies:["Alcool primaire → aldéhyde (oxydant doux) → acide carboxylique (oxydant fort ou excès). Alcool secondaire → cétone (s'arrête là). Alcool tertiaire : pas d'oxydation possible."] },
    { test:/williamson/i, replies:["La synthèse de Williamson prépare un éther par SN2 : un alcoolate RO⁻ (nucléophile fort) attaque un halogénoalcane R'X."] },
    { test:/[ée]poxyde/i, replies:["Un époxyde est très réactif à cause de la tension de cycle (angles à 60°). En milieu basique, l'ouverture se fait sur le carbone le moins encombré (SN2-like) ; en milieu acide, sur le carbone le plus substitué (SN1-like)."] },
    { test:/nucl[ée]ofuge|activ/i, replies:["OH est un mauvais nucléofuge (HO⁻ est une base trop forte). On l'active par protonation (avec HX) ou par tosylation (ROTs) avant une substitution."] },
    { test:/liaison hydrog[èe]ne|[ée]bullition/i, replies:["Les alcools forment des liaisons hydrogène intermoléculaires, ce qui explique leurs températures d'ébullition élevées comparées aux alcanes de masse similaire."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : combien d'hydrogènes reste-t-il sur le carbone après formation de la cétone ?","Indice niveau 2 : aucun — l'oxydation ne peut pas continuer.","Indice niveau 3 : une cétone, point final."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : qu'est-ce qui fait un bon nucléofuge ?","Indice niveau 2 : une base faible.","Indice niveau 3 : HO⁻ est une base trop forte."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : en milieu acide, le mécanisme ressemble à un SN1.","Indice niveau 2 : où le carbocation serait-il le plus stable ?","Indice niveau 3 : sur le carbone le plus substitué."] }
  ]
};

/* =========================== CHAPITRE 9 — Composés carbonylés : aldéhydes et cétones =========================== */
ORG_CHAPTERS[orgKey('Composés carbonylés : aldéhydes et cétones')] = {
  objectives: [
    "Expliquer pourquoi le carbone du groupe carbonyle est électrophile et attire les nucléophiles",
    "Décrire le mécanisme général de l'addition nucléophile sur C=O, et ses produits usuels",
    "Distinguer aldéhydes et cétones par leur réactivité et leurs tests caractéristiques",
    "Reconnaître la tautomérie céto-énolique et son rôle dans les réactions en alpha du carbonyle",
    "Évaluer pourquoi la réaction de Grignard, découverte accidentellement par un jeune chercheur français en 1900, est aujourd'hui considérée comme l'une des méthodes de création de liaisons carbone-carbone les plus utilisées de toute la synthèse organique"
  ],
  prereqs: ["Alcools, éthers et époxydes"],
  bodyHtml: `
    <p>En 1900, Victor Grignard, alors jeune chercheur à l'université de Lyon, découvre presque par hasard que le magnésium métallique, mis en contact avec un halogénoalcane dans un solvant éthéré anhydre, forme un composé organométallique d'une réactivité extraordinaire, capable de créer une nouvelle liaison carbone-carbone sur pratiquement n'importe quel composé carbonylé. Cette découverte, d'une simplicité expérimentale trompeuse, lui vaudra le prix Nobel de chimie dès 1912 — une reconnaissance rapide, rare pour l'époque, tant l'impact de sa découverte sur la synthèse organique fut immédiat et considérable.</p>
    <p>Plus d'un siècle plus tard, la réaction de Grignard reste l'une des méthodes les plus enseignées et les plus utilisées pour construire, brique par brique, des molécules organiques complexes — des parfums de synthèse jusqu'aux principes actifs pharmaceutiques les plus sophistiqués. Ce chapitre te propose de comprendre pourquoi le groupe carbonyle, cœur réactionnel de tant de transformations organiques, se prête si bien à cette chimie de construction moléculaire.</p>
    <p>Le groupe <strong>carbonyle</strong> $C=O$ est le cœur réactionnel des aldéhydes ($R-CHO$) et des cétones ($R-CO-R'$). La liaison $C=O$ est fortement polarisée ($C^{\\delta+}=O^{\\delta-}$) : le carbone, plan et hybridé $sp^2$, est un site électrophile de choix. À la fin de ce chapitre, tu sauras utiliser cette réactivité pour construire de nouvelles liaisons carbone-carbone, et distinguer un aldéhyde d'une cétone par de simples tests chimiques qualitatifs.</p>

    <h3>1. Pourquoi le carbonyle est-il si réactif ?</h3>
    <p>L'oxygène, très électronégatif, attire fortement le doublet π vers lui : le carbone du carbonyle porte une charge partielle positive importante, accessible à l'attaque d'un nucléophile. Contrairement à une double liaison $C=C$ (nucléophile), la double liaison $C=O$ est donc la cible d'une <strong>addition nucléophile</strong> ($A_N$), et non d'une addition électrophile.</p>

    <h3>2. Mécanisme général de l'addition nucléophile</h3>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 90" width="100%">
          <text x="5" y="45" font-family="IBM Plex Mono" font-size="12" fill="#2DD4C4">Nu⁻</text>
          <line x1="30" y1="42" x2="65" y2="42" stroke="#2DD4C4" stroke-width="1.6" marker-end="url(#adnarr)"/>
          <text x="75" y="46" font-family="IBM Plex Mono" font-size="12" fill="#EAF0FB">C</text>
          <line x1="85" y1="38" x2="105" y2="20" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="88" y1="42" x2="108" y2="24" stroke="#EAF0FB" stroke-width="1.6"/>
          <text x="108" y="18" font-family="IBM Plex Mono" font-size="12" fill="#FF6B6F">O</text>
          <path d="M92,32 Q100,20 106,20" stroke="#F0B94D" stroke-width="1.3" fill="none" marker-end="url(#adnarr2)"/>
          <text x="130" y="42" font-family="IBM Plex Mono" font-size="16" fill="#EAF0FB">→</text>
          <text x="150" y="46" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">Nu-C-O⁻</text>
          <text x="20" y="72" font-family="IBM Plex Mono" font-size="9" fill="#5A6472">le carbone devient sp³ ; l'alcoolate formé peut ensuite être protoné</text>
          <defs>
            <marker id="adnarr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker>
            <marker id="adnarr2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#F0B94D"/></marker>
          </defs>
        </svg>
        <span>Le nucléophile attaque le carbone sp² du carbonyle ; le doublet π se déplace sur l'oxygène, qui devient un alcoolate ; le carbone passe de plan (sp²) à tétraédrique (sp³)</span>
      </div>
    </div>
    <table class="mini-table">
      <tr><th>Nucléophile</th><th>Produit d'addition</th></tr>
      <tr><td>$HCN$ (ion cyanure)</td><td>cyanhydrine (nitrile-alcool), utile pour allonger une chaîne carbonée</td></tr>
      <tr><td>Alcool ROH (catalyse acide)</td><td>hémiacétal, puis acétal en excès d'alcool (protection réversible du carbonyle)</td></tr>
      <tr><td>Organomagnésien RMgX (Grignard)</td><td>alcoolate puis alcool après hydrolyse — méthode reine pour créer une liaison C-C</td></tr>
      <tr><td>Amine primaire RNH₂</td><td>imine (base de Schiff), après élimination d'eau</td></tr>
    </table>

    <h3>3. Les organomagnésiens (réactifs de Grignard)</h3>
    <p>Un réactif de Grignard $R-MgX$ (préparé à partir de $R-X$ et de magnésium métallique) se comporte comme une source de carbanion $R^-$, un nucléophile et une base très forts. Additionné sur un carbonyle, il forme après hydrolyse un <strong>alcool</strong> : sur le formaldéhyde $HCHO$, un alcool primaire ; sur un autre aldéhyde, un alcool secondaire ; sur une cétone, un alcool tertiaire.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Les organomagnésiens sont incompatibles avec toute source de proton acide (eau, alcool, $NH$) : ils réagiraient instantanément avec, avant même d'atteindre le carbonyle visé. D'où la nécessité d'un solvant anhydre (éther, THF).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le réactif de Grignard, à la fois base et nucléophile extrêmement forts, doit être manipulé dans un solvant rigoureusement anhydre — la moindre trace d'eau le détruit instantanément avant qu'il n'atteigne sa cible. En repensant à la comparaison force du nucléophile / basicité déjà rencontrée au chapitre 6, pourquoi cette double nature (base ET nucléophile très fort) rend-elle le Grignard à la fois si puissant en synthèse et si délicat à manipuler expérimentalement ?
    </div>

    <h3>4. Tautomérie céto-énolique et réactivité en alpha</h3>
    <p>Un hydrogène porté par un carbone <strong>en alpha</strong> du carbonyle (le carbone directement voisin) est particulièrement acide ($pKa\\approx 20$, bien plus faible qu'un alcane ordinaire) : sa perte forme un <strong>énolate</strong>, stabilisé par résonance avec le carbonyle. La forme <strong>cétone</strong> (ou aldéhyde) et sa forme <strong>énol</strong> (avec une liaison $C=C-OH$) sont en équilibre tautomère, très largement en faveur de la forme cétone à l'équilibre.</p>
    <p>Cette acidité en alpha permet des réactions comme l'<strong>aldolisation</strong> : un énolate attaque, en tant que nucléophile, le carbonyle électrophile d'une autre molécule de carbonylé, formant une liaison $C-C$ et un produit β-hydroxycarbonylé (l'aldol).</p>

    <h3>5. Distinguer aldéhydes et cétones</h3>
    <p>Un aldéhyde porte un $H$ directement sur le carbonyle : il est donc facilement <strong>oxydable</strong> en acide carboxylique, contrairement à une cétone. Ceci fonde des tests qualitatifs classiques : la <strong>liqueur de Fehling</strong> et le <strong>réactif de Tollens</strong> (miroir d'argent) sont réduits par un aldéhyde (qui s'oxyde) mais restent inertes face à une cétone.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le réactif de Tollens forme un dépôt d'argent métallique brillant (le fameux « miroir d'argent ») uniquement en présence d'un aldéhyde, jamais avec une cétone. Sachant que ce test repose sur l'oxydation de l'aldéhyde en acide carboxylique, accompagnée de la réduction des ions Ag⁺ en argent métallique, pourquoi ce test qualitatif simple reste-t-il, plus d'un siècle après son invention, encore utilisé aujourd'hui en laboratoire ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La réaction de Grignard et ses dérivées organométalliques continuent d'évoluer plus d'un siècle après leur découverte : les chimistes de synthèse développent aujourd'hui des variantes catalytiques et asymétriques de l'addition sur les composés carbonylés, permettant de créer sélectivement un seul énantiomère d'alcool à partir d'un aldéhyde ou d'une cétone prochirale — un enjeu directement lié à la stéréochimie pharmaceutique déjà rencontrée au chapitre 3. Par ailleurs, la tautomérie céto-énolique, loin d'être une simple curiosité de laboratoire, joue un rôle biologique majeur : de nombreuses enzymes métaboliques exploitent précisément cette réactivité en alpha du carbonyle pour catalyser des réactions essentielles du métabolisme cellulaire.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des catalyseurs capables de contrôler avec une précision croissante la stéréochimie de l'addition nucléophile sur un carbonyle prochiral, à la manière des enzymes biologiques qui réalisent cette même transformation avec une sélectivité quasi parfaite ? C'est un axe de recherche majeur en catalyse asymétrique de synthèse organique.</p>
    <p><strong>Technologie émergente :</strong> les catalyseurs organométalliques chiraux de nouvelle génération, inspirés du mécanisme de la réaction de Grignard mais optimisés pour un contrôle stéréochimique fin, sont aujourd'hui utilisés dans la synthèse industrielle de nombreux médicaments chiraux.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Carbonyle C=O (polarisé, électrophile) → addition nucléophile (HCN, ROH, RMgX, RNH₂) → produits variés (cyanhydrine, acétal, alcool, imine) → réactivité en alpha (tautomérie céto-énolique) → aldolisation
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$R{-}MgX + R'_2C{=}O \\ \\to \\ R'_2C(R){-}OMgX \\ \\xrightarrow{H_3O^+} \\ R'_2C(R){-}OH$$
      Cette séquence réactionnelle, découverte par Victor Grignard en 1900, reste plus d'un siècle plus tard l'une des méthodes les plus fiables et les plus utilisées de toute la chimie organique pour créer une nouvelle liaison carbone-carbone — la brique de construction fondamentale de la synthèse de molécules complexes.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le carbone du carbonyle, plan et électrophile, subit une addition nucléophile (Aₙ) qui le rend tétraédrique</li>
        <li>Grignard + carbonyle + hydrolyse → alcool (primaire, secondaire ou tertiaire selon le carbonyle de départ)</li>
        <li>L'hydrogène en alpha du carbonyle est acide (énolate stabilisé par résonance) : c'est la base des réactions d'aldolisation</li>
        <li>Seul l'aldéhyde (H sur le carbonyle) est facilement oxydable — d'où les tests de Fehling/Tollens qui distinguent aldéhyde et cétone</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser un réactif de Grignard en présence d'eau ou d'un alcool — il réagirait instantanément avec le proton acide au lieu du carbonyle visé</li>
        <li>Oublier que la forme énol, bien que minoritaire à l'équilibre, est essentielle pour comprendre la réactivité en alpha</li>
        <li>Confondre addition nucléophile (sur C=O) et addition électrophile (sur C=C)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'addition d'un réactif de Grignard sur le formaldéhyde (HCHO), suivie d'hydrolyse, donne :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org9e1" value="right">un alcool primaire</label>
          <label class="option"><input type="radio" name="org9e1" value="wrong">un alcool secondaire</label>
          <label class="option"><input type="radio" name="org9e1" value="wrong">un alcool tertiaire</label>
          <label class="option"><input type="radio" name="org9e1" value="wrong">un acide carboxylique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org9e1','org9fb1','Correct — le formaldéhyde n\'a que des hydrogènes sur son carbonyle : après addition de R⁻ et hydrolyse, on obtient R-CH₂-OH, un alcool primaire.','Combien de carbones sont déjà attachés au carbonyle du formaldéhyde ?')">Vérifier</button>
        <div class="feedback" id="org9fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pourquoi un réactif de Grignard doit-il être utilisé en milieu parfaitement anhydre ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="org9e2" value="right">Parce qu'il réagirait instantanément avec l'eau (base/nucléophile très fort) avant d'atteindre le carbonyle</label>
          <label class="option"><input type="radio" name="org9e2" value="wrong">Parce que l'eau catalyse la réaction et la rend trop rapide</label>
          <label class="option"><input type="radio" name="org9e2" value="wrong">Ce n'est pas nécessaire, c'est une légende</label>
          <label class="option"><input type="radio" name="org9e2" value="wrong">Parce que l'eau empêche la formation du carbonyle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org9e2','org9fb2','Correct — R-MgX est une base et un nucléophile extrêmement forts : il détruirait sa propre réactivité en réagissant d\'abord avec n\'importe quelle source de proton acide.','Le réactif de Grignard est un carbanion très réactif : que ferait-il face à un proton acide ?')">Vérifier</button>
        <div class="feedback" id="org9fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le réactif de Tollens (miroir d'argent) permet de distinguer un aldéhyde d'une cétone parce que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org9e3" value="right">seul l'aldéhyde, porteur d'un H sur le carbonyle, est facilement oxydable</label>
          <label class="option"><input type="radio" name="org9e3" value="wrong">les cétones sont toujours plus réactives que les aldéhydes</label>
          <label class="option"><input type="radio" name="org9e3" value="wrong">les deux réagissent de façon identique</label>
          <label class="option"><input type="radio" name="org9e3" value="wrong">le réactif de Tollens détecte uniquement les alcools</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org9e3','org9fb3','Correct — l\'hydrogène directement porté par le carbonyle d\'un aldéhyde le rend facilement oxydable en acide carboxylique, ce qui réduit Ag⁺ en argent métallique (miroir).','Quelle est la différence structurale entre un aldéhyde et une cétone au niveau du carbonyle ?')">Vérifier</button>
        <div class="feedback" id="org9fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le carbone du carbonyle n'était pas électrophile (par exemple si l'oxygène n'était pas plus électronégatif que le carbone) : la chimie organique moderne, si dépendante de l'addition nucléophile, existerait-elle sous une forme reconnaissable ?</li>
        <li>Pourquoi Victor Grignard a-t-il reçu le prix Nobel aussi rapidement après sa découverte (seulement 12 ans), alors que la reconnaissance scientifique majeure met généralement des décennies à se concrétiser ?</li>
        <li>Quelle serait la conséquence, pour la médecine moderne, si l'on ne disposait d'aucune méthode fiable pour créer sélectivement de nouvelles liaisons carbone-carbone comme le permet la réaction de Grignard ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>V. Grignard, « Sur quelques nouvelles combinaisons organométalliques du magnésium et leur application à des synthèses d'alcools et d'hydrocarbures », Comptes Rendus de l'Académie des Sciences, 1900 — l'article fondateur de la réaction de Grignard (prix Nobel de chimie 1912).</li>
        <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur les composés carbonylés en licence.</li>
        <li>B. Tollens, « Ueber ammoniakalische Silberlösung als Reagens auf Aldehyd », Berichte der Deutschen Chemischen Gesellschaft, 1882 — description originale du réactif de Tollens.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais utiliser la réactivité du carbonyle pour construire de nouvelles liaisons carbone-carbone, et distinguer un aldéhyde d'une cétone par de simples tests qualitatifs. Le chapitre suivant, « Acides carboxyliques et dérivés d'acides », va explorer le produit ultime de l'oxydation d'un aldéhyde — une fonction organique omniprésente, du vinaigre de ta cuisine jusqu'aux acides aminés qui composent chaque protéine de ton corps. Comme le rappelle l'histoire de Victor Grignard, dont la découverte quasi accidentelle a révolutionné la synthèse organique : parfois, les observations les plus simples en apparence, menées avec la rigueur d'un chimiste attentif, ouvrent les portes des transformations les plus fécondes.</p>
  `
};

ORG_NOVA_KB[orgKey('Composés carbonylés : aldéhydes et cétones')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Aldéhydes et cétones ». Demande-moi comment fonctionne un Grignard, ou un indice sur un exercice.",
  rules: [
    { test:/addition nucl[ée]ophile|a[nN]/i, replies:["Dans l'addition nucléophile sur C=O, le nucléophile attaque le carbone électrophile ; le doublet π se déplace sur l'oxygène (alcoolate) ; le carbone passe de plan (sp²) à tétraédrique (sp³)."] },
    { test:/grignard|organomagn[ée]sien/i, replies:["Un réactif de Grignard R-MgX apporte un carbanion R⁻ très nucléophile. Sur formaldéhyde → alcool 1° ; sur un autre aldéhyde → alcool 2° ; sur une cétone → alcool 3°. Il exige un milieu anhydre !"] },
    { test:/[ée]nol|tautom[ée]rie|c[ée]to.[ée]nolique/i, replies:["La tautomérie céto-énolique est l'équilibre entre la forme cétone (majoritaire) et la forme énol (C=C-OH). L'hydrogène en alpha du carbonyle est acide car sa perte forme un énolate stabilisé par résonance."] },
    { test:/aldolisation/i, replies:["Dans l'aldolisation, un énolate (nucléophile) attaque le carbonyle électrophile d'une autre molécule, créant une nouvelle liaison C-C et un produit β-hydroxycarbonylé."] },
    { test:/fehling|tollens|miroir/i, replies:["La liqueur de Fehling et le réactif de Tollens (miroir d'argent) sont réduits par un aldéhyde (qui s'oxyde en acide) mais restent inertes face à une cétone — c'est un test qui les distingue."] },
    { test:/cyanhydrine/i, replies:["Une cyanhydrine résulte de l'addition de HCN sur un carbonyle : elle porte à la fois un groupe nitrile et un groupe hydroxyle sur le même carbone."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le formaldéhyde n'a pas de carbone déjà attaché au carbonyle.","Indice niveau 2 : après addition de R⁻, un seul carbone est présent.","Indice niveau 3 : c'est un alcool primaire."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le Grignard est une base/nucléophile très fort.","Indice niveau 2 : il réagirait avec n'importe quel proton acide en premier.","Indice niveau 3 : il faut un milieu anhydre."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare la structure du carbonyle d'un aldéhyde et d'une cétone.","Indice niveau 2 : seul l'aldéhyde porte un H directement sur le carbonyle.","Indice niveau 3 : c'est ce H qui le rend facilement oxydable."] }
  ]
};

/* =========================== CHAPITRE 10 — Acides carboxyliques et dérivés d'acides =========================== */
ORG_CHAPTERS[orgKey('Acides carboxyliques et dérivés d\'acides')] = {
  objectives: [
    "Expliquer pourquoi les acides carboxyliques sont bien plus acides que les alcools",
    "Classer les dérivés d'acides (chlorures, anhydrides, esters, amides) par ordre de réactivité",
    "Décrire le mécanisme de substitution nucléophile de l'acyle (addition-élimination)",
    "Appliquer l'estérification de Fischer et son hydrolyse",
    "Évaluer pourquoi un marquage isotopique à l'oxygène 18, une technique expérimentale d'une élégance redoutable, a permis de trancher définitivement un débat mécanistique que la seule observation des produits de réaction ne pouvait résoudre"
  ],
  prereqs: ["Composés carbonylés : aldéhydes et cétones"],
  bodyHtml: `
    <p>Dans les années 1930, les chimistes s'interrogent sur un point mécanistique en apparence insoluble : lors de l'estérification de Fischer, quelle liaison se rompt exactement — celle entre le carbone de l'acide et son oxygène, ou celle entre l'oxygène et l'hydrogène de l'alcool ? Les deux hypothèses conduisent au même produit final, rendant impossible toute distinction par la seule observation du résultat. La solution viendra d'une expérience d'une élégance redoutable : en substituant l'oxygène ordinaire de l'alcool par son isotope plus lourd, l'oxygène 18, les chercheurs purent suivre à la trace où cet atome marqué se retrouvait dans le produit final — révélant sans ambiguïté possible le mécanisme réel.</p>
    <p>Cette technique de marquage isotopique, pionnière en son temps, est devenue depuis un outil indispensable de toute la chimie mécanistique moderne : elle permet de « voir » littéralement le trajet d'un atome individuel à travers une réaction, là où l'observation classique des produits ne peut que deviner le chemin emprunté. Ce chapitre te propose de comprendre, grâce à cette même méthode, l'ensemble de la chimie riche et industriellement essentielle des acides carboxyliques et de leurs dérivés.</p>
    <p>Un acide carboxylique $R-COOH$ combine un carbonyle et un groupe $-OH$ : cette association change tout, tant sur le plan de l'acidité que de la réactivité — et sert de point de départ à toute une famille de dérivés. À la fin de ce chapitre, tu sauras expliquer pourquoi ces acides sont si particulièrement acides, et maîtriser toute la hiérarchie de réactivité de leurs dérivés, du chlorure d'acyle le plus réactif jusqu'à l'amide le plus stable.</p>

    <h3>1. Pourquoi l'acide carboxylique est-il un acide « fort » (parmi les acides faibles) ?</h3>
    <p>Un acide carboxylique ($pKa\\approx 4-5$) est bien plus acide qu'un alcool ($pKa\\approx 16-18$), bien que tous deux perdent un $H$ porté par un oxygène. La raison : sa base conjuguée, l'ion <strong>carboxylate</strong> $RCOO^-$, est stabilisée par <strong>résonance</strong> — la charge négative est délocalisée sur les deux atomes d'oxygène, équivalents par symétrie.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 80" width="100%">
          <text x="5" y="45" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">R-C</text>
          <line x1="35" y1="40" x2="55" y2="22" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="35" y1="44" x2="55" y2="62" stroke="#EAF0FB" stroke-width="1.6"/>
          <text x="58" y="20" font-family="IBM Plex Mono" font-size="11" fill="#FF6B6F">O</text>
          <text x="58" y="70" font-family="IBM Plex Mono" font-size="11" fill="#FF6B6F">O⁻</text>
          <text x="80" y="45" font-family="IBM Plex Mono" font-size="15" fill="#9B82FF">↔</text>
          <text x="95" y="45" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">R-C</text>
          <line x1="125" y1="40" x2="145" y2="22" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="125" y1="44" x2="145" y2="62" stroke="#EAF0FB" stroke-width="1.6"/>
          <text x="148" y="20" font-family="IBM Plex Mono" font-size="11" fill="#FF6B6F">O⁻</text>
          <text x="148" y="70" font-family="IBM Plex Mono" font-size="11" fill="#FF6B6F">O</text>
        </svg>
        <span>Les deux formes mésomères du carboxylate sont rigoureusement équivalentes : la charge négative se répartit également sur les deux oxygènes, ce qui stabilise fortement la base conjuguée</span>
      </div>
    </div>
    <p>Cette stabilisation est d'autant plus marquée qu'un groupe électroattracteur (−I) est présent en position proche : ainsi l'acide trichloroacétique ($Cl_3C-COOH$) est beaucoup plus acide que l'acide acétique.</p>

    <h3>2. Les dérivés d'acides et leur échelle de réactivité</h3>
    <p>En remplaçant le $-OH$ de l'acide par un autre groupe, on obtient toute une famille de <strong>dérivés d'acides</strong>, classés selon la qualité du groupe partant (donc leur réactivité en substitution) :</p>
    <table class="mini-table">
      <tr><th>Dérivé</th><th>Groupe sur le carbonyle</th><th>Réactivité</th></tr>
      <tr><td>Chlorure d'acyle</td><td>$-Cl$</td><td>très réactif (Cl⁻, excellent nucléofuge)</td></tr>
      <tr><td>Anhydride d'acide</td><td>$-O-COR$</td><td>réactif</td></tr>
      <tr><td>Ester</td><td>$-OR$</td><td>modérément réactif</td></tr>
      <tr><td>Amide</td><td>$-NR_2$</td><td>peu réactif (le plus stable de la série)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Un dérivé plus réactif peut toujours être converti en un dérivé moins réactif (chlorure → anhydride → ester → amide), mais <strong>jamais l'inverse directement</strong> — c'est cette hiérarchie qui guide le choix du réactif en synthèse.
    </div>

    <h3>3. Mécanisme : substitution nucléophile de l'acyle</h3>
    <p>Contrairement à la substitution sur un carbone $sp^3$ (SN1/SN2), la substitution sur un carbonyle d'acide suit un mécanisme en <strong>deux étapes : addition puis élimination</strong>. Le nucléophile attaque d'abord le carbone du carbonyle (comme pour un aldéhyde/cétone), formant un intermédiaire tétraédrique ; celui-ci s'effondre ensuite en expulsant le meilleur groupe partant, régénérant le carbonyle.</p>

    <h3>4. Estérification de Fischer et hydrolyse</h3>
    <p>L'<strong>estérification de Fischer</strong> fait réagir un acide carboxylique avec un alcool, en catalyse acide, pour former un ester et de l'eau : $RCOOH + R'OH \\underset{H^+}{\\rightleftharpoons} RCOOR' + H_2O$. C'est un équilibre : on le déplace vers l'ester en utilisant un excès d'alcool ou en éliminant l'eau formée (loi de Le Chatelier), ou vers l'hydrolyse en utilisant un large excès d'eau.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — marquage isotopique</span>
      Des expériences au $^{18}O$ ont montré que c'est la liaison $C-OH$ de l'acide qui se rompt (pas la liaison $O-H$ de l'alcool) : l'oxygène de l'ester provient de l'alcool, pas de l'acide — confirmant le mécanisme en addition-élimination sur le carbonyle.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le marquage isotopique à l'oxygène 18 a permis de trancher un débat mécanistique impossible à résoudre par la seule observation des produits finaux, identiques dans les deux hypothèses. En repensant à la distinction isotopes/propriétés chimiques identiques déjà vue en chimie minérale, pourquoi le fait que ¹⁸O ait rigoureusement le même comportement chimique que ¹⁶O est-il precisément ce qui rend cette technique de traçage fiable, sans perturber la réaction elle-même ?
    </div>

    <p>L'hydrolyse en <strong>milieu basique</strong> (saponification) est irréversible : le carboxylate final, une fois formé, est trop stable (et trop peu électrophile, chargé négativement) pour être réattaqué par l'alcoolate — c'est ce déplacement total de l'équilibre qui rend la saponification quantitative, contrairement à l'hydrolyse acide (réversible).</p>

    <h3>5. Frontière de la recherche</h3>
    <p>Le marquage isotopique, technique décisive pour élucider le mécanisme de l'estérification de Fischer, reste aujourd'hui un outil de premier plan en biochimie et en pharmacologie : les chercheurs marquent couramment des molécules avec des isotopes stables (¹³C, ¹⁵N, ²H) ou radioactifs pour suivre leur devenir métabolique dans un organisme vivant, une méthode indispensable au développement de nouveaux médicaments. Par ailleurs, la chimie des dérivés d'acides reste au cœur de l'industrie des polymères : les polyesters et les polyamides (comme le nylon), omniprésents dans les textiles et plastiques modernes, sont obtenus par des réactions de condensation répétées entre acides carboxyliques (ou leurs dérivés) et alcools ou amines.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des méthodes de polymérisation de polyesters et polyamides biosourcés, à partir de matières premières renouvelables plutôt que pétrochimiques, tout en conservant les propriétés mécaniques recherchées par l'industrie textile et plastique ? C'est un enjeu de recherche majeur en chimie verte.</p>
    <p><strong>Technologie émergente :</strong> les catalyseurs enzymatiques (lipases), capables de catalyser l'estérification et l'hydrolyse dans des conditions douces et sélectives, sont aujourd'hui exploités en biotechnologie industrielle comme alternative plus durable aux catalyseurs acides ou basiques classiques.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Acide carboxylique (RCOOH, acide fort parmi les faibles) → dérivés par ordre de réactivité (chlorure > anhydride > ester > amide) → mécanisme addition-élimination → estérification de Fischer (équilibre) / saponification (irréversible)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$RCOOH + R'OH \\underset{H^+}{\\rightleftharpoons} RCOOR' + H_2O$$
      Cette réaction d'estérification, dont le mécanisme exact n'a pu être confirmé qu'au moyen du marquage isotopique à l'oxygène 18, illustre la puissance de la chimie mécanistique moderne : suivre un atome individuel à la trace pour révéler un chemin réactionnel invisible à l'observation classique des seuls produits.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Les acides carboxyliques sont fortement acides car leur base conjuguée (carboxylate) est stabilisée par résonance symétrique</li>
        <li>Échelle de réactivité des dérivés : chlorure d'acyle > anhydride > ester > amide (du meilleur au plus mauvais nucléofuge)</li>
        <li>La substitution sur un acyle suit un mécanisme addition-élimination (pas SN1/SN2)</li>
        <li>L'estérification de Fischer est un équilibre ; la saponification (milieu basique) est irréversible</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre le mécanisme de substitution sur un acyle (addition-élimination) avec celui sur un carbone sp³ (SN1/SN2)</li>
        <li>Oublier que l'estérification de Fischer est un équilibre — il faut le déplacer pour obtenir un bon rendement</li>
        <li>Croire qu'on peut convertir directement un amide (peu réactif) en chlorure d'acyle (très réactif) — la conversion se fait toujours vers un dérivé moins réactif</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'acide carboxylique est plus acide que l'alcool principalement parce que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org10e1" value="wrong">l'oxygène y est plus électronégatif</label>
          <label class="option"><input type="radio" name="org10e1" value="right">sa base conjuguée (carboxylate) est stabilisée par résonance symétrique</label>
          <label class="option"><input type="radio" name="org10e1" value="wrong">il contient plus d'atomes de carbone</label>
          <label class="option"><input type="radio" name="org10e1" value="wrong">il n'y a pas de vraie différence d'acidité</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org10e1','org10fb1','Correct — la délocalisation de la charge négative sur les deux oxygènes équivalents stabilise fortement le carboxylate, ce qui abaisse le pKa.','Compare la stabilité de RO⁻ (alcoolate) à celle de RCOO⁻ (carboxylate) : lequel est délocalisé ?')">Vérifier</button>
        <div class="feedback" id="org10fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Parmi les dérivés d'acides, le plus réactif en substitution nucléophile est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org10e2" value="right">le chlorure d'acyle</label>
          <label class="option"><input type="radio" name="org10e2" value="wrong">l'amide</label>
          <label class="option"><input type="radio" name="org10e2" value="wrong">l'ester</label>
          <label class="option"><input type="radio" name="org10e2" value="wrong">tous sont équivalents</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org10e2','org10fb2','Correct — Cl⁻ est un excellent nucléofuge, ce qui rend le chlorure d\'acyle le plus réactif de la série.','Quel groupe partant est le meilleur : Cl⁻, ou NR₂⁻ ?')">Vérifier</button>
        <div class="feedback" id="org10fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La saponification (hydrolyse basique d'un ester) est irréversible car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org10e3" value="right">le carboxylate formé, chargé négativement, n'est plus électrophile et ne peut plus être réattaqué</label>
          <label class="option"><input type="radio" name="org10e3" value="wrong">elle nécessite un catalyseur qui empêche la réaction inverse</label>
          <label class="option"><input type="radio" name="org10e3" value="wrong">l'ester de départ est instable</label>
          <label class="option"><input type="radio" name="org10e3" value="wrong">elle ne l'est pas ; c'est un équilibre comme l'estérification de Fischer</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org10e3','org10fb3','Correct — une fois le carboxylate RCOO⁻ formé, sa charge négative empêche toute nouvelle attaque nucléophile : la réaction est donc déplacée totalement dans un seul sens.','Pense à la charge du produit final : un carboxylate est-il encore électrophile ?')">Vérifier</button>
        <div class="feedback" id="org10fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le carboxylate n'était pas stabilisé par résonance symétrique : les acides carboxyliques auraient-ils encore un pKa aussi bas que 4-5 ?</li>
        <li>Pourquoi le marquage isotopique à l'oxygène 18, une technique en apparence si simple, a-t-il fallu attendre les années 1930 pour être appliqué à ce problème mécanistique vieux de plusieurs décennies ?</li>
        <li>Quelle serait la conséquence, pour l'industrie textile mondiale, d'une interdiction des polyesters et polyamides synthétiques sans alternative biosourcée immédiatement disponible ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>M. Polanyi, T. A. Szabo, « Chemical Kinetics of the Hydrolysis of Ethyl Acetate », Transactions of the Faraday Society, 1934 — travaux pionniers de marquage isotopique appliqués au mécanisme d'estérification.</li>
        <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur les acides carboxyliques et leurs dérivés en licence.</li>
        <li>W. H. Carothers, « Polymers and Polyfunctionality », Transactions of the Faraday Society, 1936 — travaux fondateurs sur la polymérisation par condensation (nylon).</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais expliquer pourquoi les acides carboxyliques sont si particulièrement acides, et maîtriser toute la hiérarchie de réactivité de leurs dérivés. Le dernier chapitre de ce module, « Amines et composés azotés », va explorer une nouvelle famille de composés organiques essentiels, de la basicité des amines jusqu'aux protéines qui constituent chaque cellule vivante. Comme le rappelle l'élégance du marquage isotopique qui a résolu l'énigme de l'estérification de Fischer : parfois, la meilleure façon de comprendre un mécanisme invisible est de suivre un seul atome à la trace, plutôt que de se contenter d'observer le résultat final d'une réaction.</p>
  `
};

ORG_NOVA_KB[orgKey('Acides carboxyliques et dérivés d\'acides')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Acides carboxyliques et dérivés ». Demande-moi l'échelle de réactivité des dérivés, ou un indice sur un exercice.",
  rules: [
    { test:/acidit[ée]|pka/i, replies:["Un acide carboxylique (pKa≈4-5) est plus acide qu'un alcool (pKa≈16-18) car sa base conjuguée, le carboxylate RCOO⁻, est stabilisée par résonance symétrique sur les deux oxygènes."] },
    { test:/d[ée]riv[ée]s?.*acide|r[ée]activit[ée]/i, replies:["Échelle de réactivité (du plus réactif au moins réactif) : chlorure d'acyle > anhydride > ester > amide. On peut toujours descendre l'échelle, jamais la remonter directement."] },
    { test:/addition.[ée]limination|m[ée]canisme.*acyle/i, replies:["La substitution sur un acyle se fait en 2 étapes : addition du nucléophile (formant un intermédiaire tétraédrique), puis élimination du meilleur groupe partant qui régénère le carbonyle."] },
    { test:/fischer|est[ée]rification/i, replies:["L'estérification de Fischer (acide + alcool, catalyse acide) est un équilibre. On le déplace vers l'ester avec un excès d'alcool ou en éliminant l'eau formée."] },
    { test:/saponification|hydrolyse basique/i, replies:["La saponification (hydrolyse basique d'un ester) est irréversible : le carboxylate final, chargé négativement, ne peut plus être réattaqué par un nucléophile."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare la stabilité de l'alcoolate et du carboxylate.","Indice niveau 2 : l'un des deux est délocalisé sur deux oxygènes.","Indice niveau 3 : c'est la résonance du carboxylate."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : quel groupe partant est le meilleur ?","Indice niveau 2 : Cl⁻ est un excellent nucléofuge.","Indice niveau 3 : c'est le chlorure d'acyle."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : regarde la charge du produit final.","Indice niveau 2 : un carboxylate est-il encore électrophile ?","Indice niveau 3 : non, donc plus d'attaque possible — irréversible."] }
  ]
};

/* =========================== CHAPITRE 11 — Amines et composés azotés =========================== */
ORG_CHAPTERS[orgKey('Amines et composés azotés')] = {
  objectives: [
    "Classer les amines (primaire, secondaire, tertiaire) et comparer à l'ammoniac",
    "Comparer la basicité des amines aliphatiques et aromatiques, et expliquer pourquoi l'aniline est moins basique",
    "Décrire les principales voies de préparation et de réactivité des amines",
    "Utiliser la formation d'un sel de diazonium comme intermédiaire de synthèse",
    "Évaluer pourquoi la découverte accidentelle d'un colorant synthétique par un étudiant de 18 ans, en 1856, est aujourd'hui considérée comme l'acte fondateur de toute l'industrie chimique organique moderne"
  ],
  prereqs: ["Acides carboxyliques et dérivés d'acides"],
  bodyHtml: `
    <p>En 1856, William Perkin, un étudiant britannique de seulement 18 ans, tente de synthétiser artificiellement la quinine (un traitement antipaludéen alors extrait exclusivement d'écorces d'arbre) à partir de l'aniline — et échoue totalement dans son objectif initial. Mais en examinant le résidu noirâtre obtenu au fond de son ballon, il découvre par accident un magnifique colorant violet, la mauvéine, le tout premier colorant synthétique de l'histoire. Cette découverte, née d'un échec transformé en succès inattendu, lance à elle seule l'industrie chimique organique moderne — Perkin, à peine sorti de l'adolescence, deviendra rapidement l'un des industriels les plus fortunés de son époque.</p>
    <p>Cette anecdote fondatrice illustre à merveille le rôle central des amines aromatiques, et en particulier de l'aniline, dans l'histoire de la chimie industrielle : des colorants textiles du XIXe siècle jusqu'aux médicaments les plus sophistiqués d'aujourd'hui, en passant par les polymères et les explosifs, la chimie des amines et des sels de diazonium que ce chapitre te propose d'explorer reste l'une des voies de synthèse les plus fécondes jamais découvertes.</p>
    <p>Une <strong>amine</strong> $R-NH_2$, $R_2NH$ ou $R_3N$ dérive de l'ammoniac $NH_3$ par remplacement d'un, deux ou trois hydrogènes par des groupes carbonés — respectivement amine <strong>primaire, secondaire ou tertiaire</strong> (attention : cette classification, basée sur le nombre de substituants sur l'azote, diffère de celle des alcools, basée sur la classe du carbone). À la fin de ce chapitre — et de ce module — tu sauras expliquer la basicité si particulière des amines aromatiques, et utiliser les sels de diazonium comme intermédiaires précieux en synthèse organique.</p>

    <h3>1. Basicité et nucléophilie des amines</h3>
    <p>Le doublet non liant de l'azote rend l'amine à la fois <strong>basique</strong> (elle peut capter un proton) et <strong>nucléophile</strong> (elle peut attaquer un électrophile). Les groupes alkyles, donneurs par effet inductif (+I), renforcent la densité électronique sur l'azote et augmentent donc la basicité par rapport à l'ammoniac — mais l'encombrement stérique et la solvatation (moins efficace pour une amine tertiaire très substituée) compliquent l'ordre exact en solution aqueuse.</p>

    <h3>2. Pourquoi l'aniline est-elle beaucoup moins basique ?</h3>
    <p>Dans l'<strong>aniline</strong> ($C_6H_5-NH_2$), le doublet non liant de l'azote est <strong>conjugué avec le cycle aromatique</strong> (effet mésomère donneur +M) : il est délocalisé dans le cycle et donc beaucoup moins disponible pour capter un proton. L'aniline ($pKa$ de l'ion anilinium $\\approx 4{,}6$) est ainsi environ un million de fois moins basique qu'une amine aliphatique comme la méthylamine ($pKa\\approx 10{,}6$).</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 200 90" width="100%">
          <circle cx="60" cy="50" r="28" fill="none" stroke="#EAF0FB" stroke-width="1.4"/>
          <circle cx="60" cy="50" r="18" fill="none" stroke="#4C7CFF" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="18" y="53" font-family="IBM Plex Mono" font-size="10" fill="#EAF0FB">C₆H₅</text>
          <line x1="88" y1="50" x2="110" y2="50" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="113" y="54" font-family="IBM Plex Mono" font-size="12" fill="#2DD4C4">NH₂</text>
          <path d="M92,44 Q100,30 108,50" stroke="#F0B94D" stroke-width="1.3" fill="none" marker-end="url(#anarr)"/>
          <text x="130" y="30" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">doublet délocalisé dans le cycle</text>
          <defs><marker id="anarr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#F0B94D"/></marker></defs>
        </svg>
        <span>Le doublet de l'azote de l'aniline se délocalise dans le cycle aromatique (effet +M), le rendant beaucoup moins disponible pour capter un proton qu'une amine aliphatique</span>
      </div>
    </div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Un groupe électroattracteur sur le cycle (comme $-NO_2$ en para) diminue encore la basicité de l'aniline (il retire de la densité électronique du cycle, donc indirectement de l'azote) ; un groupe donneur (comme $-CH_3$) l'augmente légèrement.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'aniline est environ un million de fois moins basique que la méthylamine, un écart considérable pour un simple changement de voisinage chimique (un cycle aromatique au lieu d'un groupe méthyle). En reliant cela aux effets mésomères déjà rencontrés en atomistique et au chapitre 2 de ce module, pourquoi la délocalisation d'un doublet non liant a-t-elle des conséquences aussi spectaculaires sur la disponibilité de ce doublet à réagir avec un proton ?
    </div>

    <h3>3. Préparation des amines</h3>
    <table class="mini-table">
      <tr><th>Méthode</th><th>Principe</th></tr>
      <tr><td>Réduction d'un nitrile $R-CN$</td><td>addition de $H_2$ (catalyseur métallique) ou d'un hydrure — donne une amine primaire $R-CH_2-NH_2$</td></tr>
      <tr><td>Réduction d'un amide $R-CO-NH_2$</td><td>réduction par $LiAlH_4$ — donne une amine (le carbonyle disparaît complètement)</td></tr>
      <tr><td>Substitution sur un halogénoalcane</td><td>$NH_3$ ou une amine + $R-X$ (SN2) — attention à la sur-alkylation, souvent peu sélective</td></tr>
      <tr><td>Réduction d'un groupe nitro aromatique</td><td>$Ar-NO_2 \\to Ar-NH_2$ (fer/HCl, ou hydrogénation catalytique) — voie classique vers l'aniline</td></tr>
    </table>

    <h3>4. Réactivité : acylation et diazotation</h3>
    <p>Une amine primaire ou secondaire réagit avec un chlorure d'acyle ou un anhydride (substitution nucléophile de l'acyle, vue au chapitre précédent) pour former un <strong>amide</strong> — une réaction très utilisée pour « protéger » temporairement une amine ou synthétiser des molécules d'intérêt biologique.</p>
    <p>Avec l'acide nitreux $HNO_2$ (généré in situ à froid), une amine primaire aromatique forme un <strong>sel de diazonium</strong> $Ar-N_2^+$, un intermédiaire précieux en synthèse (couplage azoïque pour les colorants, substitution du diazonium par $Cl$, $Br$, $CN$, $OH$...). Les amines aliphatiques, elles, forment des sels de diazonium instables qui se décomposent immédiatement.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un sel de diazonium aromatique, bien que stable à froid, se décompose violemment dès que la température augmente légèrement, libérant du diazote gazeux — une propriété qui exige une manipulation prudente en laboratoire. Sachant que le couplage azoïque (réaction du sel de diazonium avec un autre cycle aromatique riche en électrons) est la réaction industrielle de référence pour synthétiser des colorants azoïques, pourquoi cette instabilité thermique, plutôt qu'un simple inconvénient, est-elle en réalité exploitée comme un avantage synthétique (le sel de diazonium ne « survit » que le temps nécessaire à la réaction voulue) ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>L'héritage de la découverte accidentelle de Perkin se prolonge aujourd'hui bien au-delà des colorants textiles : les sels de diazonium sont désormais exploités en nanotechnologie pour fonctionnaliser précisément des surfaces de carbone (graphène, nanotubes) avec des groupes chimiques sur mesure, ouvrant la voie à de nouveaux capteurs et dispositifs électroniques. Par ailleurs, la chimie des amines aromatiques reste centrale dans la synthèse de nombreux médicaments modernes, en particulier certains antalgiques, antihistaminiques et médicaments cardiovasculaires, dont le noyau actif dérive directement des réactions étudiées dans ce chapitre.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des méthodes de fonctionnalisation de surfaces par sels de diazonium suffisamment précises et reproductibles pour un usage industriel à grande échelle en nanoélectronique, au-delà des applications actuelles de laboratoire ? C'est un axe de recherche actif à l'interface de la chimie organique et de la science des matériaux.</p>
    <p><strong>Technologie émergente :</strong> les capteurs électrochimiques fonctionnalisés par des sels de diazonium, capables de détecter sélectivement des molécules d'intérêt biologique ou environnemental à l'état de traces, sont développés pour des applications allant du diagnostic médical portable à la surveillance de la qualité de l'eau.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Ammoniac NH₃ → amine (1°/2°/3° selon substitution de l'azote) → basicité modulée par effets inductif/mésomère (aniline peu basique) → préparation (réduction nitrile/amide/nitro, SN2) → réactivité (acylation → amide ; diazotation → sel de diazonium)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$Ar{-}NH_2 + HNO_2 \\xrightarrow{0°C} Ar{-}N_2^+ + 2H_2O$$
      Cette réaction de diazotation, à l'origine de l'industrie des colorants synthétiques depuis la découverte accidentelle de Perkin en 1856, reste aujourd'hui l'une des voies de fonctionnalisation les plus polyvalentes de toute la chimie organique — du colorant textile du XIXe siècle jusqu'aux nanomatériaux fonctionnalisés du XXIe siècle.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Amine primaire/secondaire/tertiaire = classification sur le nombre de substituants sur l'azote (différent des alcools)</li>
        <li>L'aniline est bien moins basique qu'une amine aliphatique car le doublet de l'azote est délocalisé dans le cycle (+M)</li>
        <li>Les nitriles et amides se réduisent en amines ; les nitro-aromatiques se réduisent en anilines</li>
        <li>Amine + chlorure d'acyle → amide ; amine aromatique + HNO₂ à froid → sel de diazonium (utile en synthèse)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer aux amines la même classification (1°/2°/3°) que pour les alcools — ici, c'est le nombre de substituants sur l'azote qui compte</li>
        <li>Oublier que la conjugaison du doublet azoté avec un cycle aromatique diminue fortement la basicité</li>
        <li>Confondre sel de diazonium aromatique (stable à froid, utile) et aliphatique (instable, se décompose aussitôt)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'aniline est nettement moins basique qu'une amine aliphatique comme la méthylamine parce que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org11e1" value="right">le doublet de l'azote est délocalisé dans le cycle aromatique, moins disponible pour un proton</label>
          <label class="option"><input type="radio" name="org11e1" value="wrong">l'azote y est moins électronégatif</label>
          <label class="option"><input type="radio" name="org11e1" value="wrong">le cycle aromatique repousse les protons</label>
          <label class="option"><input type="radio" name="org11e1" value="wrong">il n'y a en réalité aucune différence significative</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org11e1','org11fb1','Correct — la conjugaison (+M) du doublet non liant avec le cycle le rend beaucoup moins disponible pour capter H⁺.','Que devient le doublet non liant de l\'azote quand il est conjugué avec un cycle aromatique ?')">Vérifier</button>
        <div class="feedback" id="org11fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La réduction d'un nitrile R-CN donne :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org11e2" value="right">une amine primaire R-CH₂-NH₂</label>
          <label class="option"><input type="radio" name="org11e2" value="wrong">un amide</label>
          <label class="option"><input type="radio" name="org11e2" value="wrong">une amine tertiaire</label>
          <label class="option"><input type="radio" name="org11e2" value="wrong">un alcool</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org11e2','org11fb2','Correct — la réduction complète du nitrile (triple liaison C≡N) ajoute des hydrogènes et forme une amine primaire.','Le nitrile a une triple liaison C≡N : que devient cet azote après réduction complète ?')">Vérifier</button>
        <div class="feedback" id="org11fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un sel de diazonium aromatique stable (à froid) se forme à partir de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="org11e3" value="right">une amine aromatique primaire + HNO₂ à froid</label>
          <label class="option"><input type="radio" name="org11e3" value="wrong">une amine aliphatique tertiaire</label>
          <label class="option"><input type="radio" name="org11e3" value="wrong">un amide + eau</label>
          <label class="option"><input type="radio" name="org11e3" value="wrong">un alcool + HNO₂</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('org11e3','org11fb3','Correct — seule une amine aromatique PRIMAIRE, traitée par l\'acide nitreux à froid, forme un sel de diazonium suffisamment stable pour être isolé et utilisé en synthèse.','Il faut une amine primaire (un seul H remplacé) et un cycle aromatique pour la stabilité.')">Vérifier</button>
        <div class="feedback" id="org11fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si William Perkin avait jeté son résidu noirâtre sans l'examiner, comme n'importe quel chimiste pressé aurait pu le faire : combien de temps l'industrie des colorants synthétiques aurait-elle mis à voir le jour ?</li>
        <li>Pourquoi les sels de diazonium aromatiques sont-ils stables à froid mais se décomposent violemment dès que la température augmente, contrairement à la plupart des composés organiques dont la stabilité varie plus progressivement avec la température ?</li>
        <li>Quelle serait la conséquence, pour l'industrie pharmaceutique moderne, de l'absence des réactions de préparation et de fonctionnalisation des amines aromatiques étudiées dans ce chapitre ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>W. H. Perkin, « On the Artificial Production of Colouring Matters », Journal of the Chemical Society, 1862 — récit de la découverte de la mauvéine, premier colorant synthétique.</li>
        <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur les amines et les sels de diazonium en licence.</li>
        <li>P. Griess, « Vorläufige Notiz über die Einwirkung von salpetriger Säure auf Amidinitro- und Aminitrophenylsäure », Berichte der Deutschen Chemischen Gesellschaft, 1858 — découverte originale de la réaction de diazotation.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Te voici arrivé au terme de ce module « Chimie organique générale » : parti de la synthèse de l'urée par Wöhler qui a ébranlé le vitalisme au premier chapitre, tu termines en maîtrisant la chimie des amines et des sels de diazonium, héritière directe de la découverte accidentelle de Perkin en 1856. Ce parcours — nomenclature, effets électroniques, stéréochimie, hydrocarbures saturés et aromatiques, substitution et élimination, alcools, carbonyles, acides et enfin amines — constitue le socle mécanistique indispensable de toute la chimie organique que tu approfondiras dans les modules suivants. Comme le rappelle l'histoire de William Perkin, ce jeune étudiant devenu industriel par accident : en chimie organique, l'échec d'une synthèse visée peut parfois ouvrir la porte à une découverte bien plus féconde que celle initialement recherchée.</p>
  `
};

ORG_NOVA_KB[orgKey('Amines et composés azotés')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Amines et composés azotés ». Demande-moi pourquoi l'aniline est moins basique, ou un indice sur un exercice.",
  rules: [
    { test:/aniline|basicit[ée]/i, replies:["L'aniline est beaucoup moins basique qu'une amine aliphatique car le doublet non liant de l'azote est conjugué (délocalisé, effet +M) avec le cycle aromatique, donc moins disponible pour capter un proton."] },
    { test:/classe|primaire|secondaire|tertiaire/i, replies:["Pour une amine, la classe (1°/2°/3°) dépend du nombre de substituants carbonés SUR L'AZOTE — contrairement aux alcools où c'est la classe du carbone qui compte."] },
    { test:/diazonium|diazotation/i, replies:["Une amine aromatique primaire + HNO2 à froid forme un sel de diazonium ArN2+, stable et très utile en synthèse (remplacement par Cl, Br, CN, OH, ou couplage azoïque pour les colorants). Les amines aliphatiques donnent des diazoniums instables."] },
    { test:/pr[ée]paration|r[ée]duction.*nitrile|r[ée]duction.*amide|r[ée]duction.*nitro/i, replies:["Nitrile R-CN réduit → amine primaire. Amide réduit (LiAlH4) → amine. Nitro aromatique réduit (Fe/HCl ou H2 catalytique) → aniline. RX + amine (SN2) → amine substituée, mais peu sélectif."] },
    { test:/acylation|amide/i, replies:["Une amine + un chlorure d'acyle (ou anhydride) forme un amide, par substitution nucléophile de l'acyle — une réaction classique de protection ou de synthèse."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : que devient le doublet de l'azote quand il est conjugué avec un cycle ?","Indice niveau 2 : il est délocalisé, moins disponible.","Indice niveau 3 : c'est l'effet mésomère +M qui réduit la basicité."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le nitrile a une triple liaison C≡N.","Indice niveau 2 : la réduction complète ajoute des hydrogènes sur C et N.","Indice niveau 3 : ça donne une amine primaire."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : il faut une amine primaire ET un cycle aromatique.","Indice niveau 2 : la stabilité vient de la conjugaison avec le cycle.","Indice niveau 3 : amine aromatique primaire + HNO2 à froid."] }
  ]
};

/* fusionne le module Chimie Organique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, ORG_CHAPTERS);
Object.assign(NOVA_KB, ORG_NOVA_KB);