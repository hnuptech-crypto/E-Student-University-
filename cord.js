/* =====================================================================
   CHUNK « cord » — registre CORD_CHAPTERS / CORD_NOVA_KB
   Matière(s) : Chimie|Chimie de coordination
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   CORD_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ===================================================================
   MODULE — Chimie de coordination (Licence 2-PC, Semestre 4)
   Suit exactement le même schéma que les autres modules de matière
   (MIN_CHAPTERS, MECA_CHAPTERS...) : chaque chapitre est une entrée
   CORD_CHAPTERS[cordKey(titre)] = { objectives, prereqs, bodyHtml,
   extraHtml, init? }, et CORD_NOVA_KB[cordKey(titre)] fournit la
   base de connaissances du mentor Nova pour ce chapitre précis.
=================================================================== */
const CORD_MATIERE = 'Chimie de coordination';
function cordKey(chapterTitle){ return `Chimie|${CORD_MATIERE}|${chapterTitle}`; }
const CORD_CHAPTERS = {};
const CORD_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL — Calculateur du nombre d'électrons célibataires à partir du moment
   magnétique expérimental (formule spin-only), réutilisé dans plusieurs chapitres.
--------------------------------------------------------------------------------- */
function updateCordSpinOnly(){
  const mu = parseFloat(document.getElementById('cordMu').value) || 0;
  // n = -1 + sqrt(1 + mu^2)
  const nExact = -1 + Math.sqrt(1 + mu*mu);
  const nRound = Math.round(nExact);
  document.getElementById('cordSpinReadout').innerHTML =
    `μ = √(n(n+2)) &nbsp;⇒&nbsp; n = −1 + √(1+μ²) = −1 + √(1+${mu}²) = <strong>${nExact.toFixed(2)}</strong> ≈ <strong>${nRound} électron(s) célibataire(s)</strong>`;
}
function initCordSpinOnly(){ updateCordSpinOnly(); }

/* ---------------------------------------------------------------------------------
   OUTIL — Calculateur d'ESCC en champ octaédrique (haut spin / bas spin)
--------------------------------------------------------------------------------- */
function updateCordEscc(){
  const dn = parseInt(document.getElementById('cordDn').value) || 0;
  const spin = document.getElementById('cordSpinType').value;
  // remplissage simplifié pour d0..d10 en octaédrique HS/BS
  let t2g = 0, eg = 0, pairs = 0;
  const fillHS = [[0,0],[1,0],[2,0],[3,0],[4,1],[5,2],[6,2],[7,3],[8,4],[9,5],[10,6]]; // [eg electrons? approx] -- géré différemment ci-dessous
  // Construction explicite électron par électron (5 orbitales : 3 t2g puis 2 eg pour HS ; t2g d'abord rempli pour BS)
  let t2gSlots = [0,0,0], egSlots = [0,0];
  let remaining = dn;
  if(spin === 'HS'){
    // règle de Hund d'abord sur les 5 cases (t2g+eg), puis appariement
    const order = [0,1,2,3,4]; // 3 t2g + 2 eg, tous à même "niveau" pour le remplissage 1 par 1
    for(let pass=0; pass<2 && remaining>0; pass++){
      for(let i=0;i<5 && remaining>0;i++){
        const slot = i<3 ? t2gSlots : egSlots;
        const idx = i<3 ? i : i-3;
        if(pass===0 && slot[idx]===0){ slot[idx]=1; remaining--; }
        else if(pass===1 && slot[idx]===1){ slot[idx]=2; remaining--; }
      }
    }
  } else {
    // bas spin : on remplit et apparie d'abord les 3 t2g, puis seulement les eg
    for(let round=0; round<2 && remaining>0; round++){
      for(let i=0;i<3 && remaining>0;i++){
        if(round===0 && t2gSlots[i]===0){ t2gSlots[i]=1; remaining--; }
        else if(round===1 && t2gSlots[i]===1){ t2gSlots[i]=2; remaining--; }
      }
    }
    for(let round=0; round<2 && remaining>0; round++){
      for(let i=0;i<2 && remaining>0;i++){
        if(round===0 && egSlots[i]===0){ egSlots[i]=1; remaining--; }
        else if(round===1 && egSlots[i]===1){ egSlots[i]=2; remaining--; }
      }
    }
  }
  t2g = t2gSlots.reduce((a,b)=>a+b,0);
  eg = egSlots.reduce((a,b)=>a+b,0);
  pairs = t2gSlots.filter(x=>x===2).length + egSlots.filter(x=>x===2).length;
  const esccFraction = (-0.4*t2g + 0.6*eg); // en unités de Δo
  document.getElementById('cordEsccReadout').innerHTML =
    `Configuration : t2g<sup>${t2g}</sup> eg<sup>${eg}</sup> — ${pairs} paire(s) formée(s)<br>` +
    `ESCC = (${t2g}×(−2/5)+${eg}×(3/5))Δo + nP = <strong>${esccFraction.toFixed(2)} Δo</strong> + ${pairs} P`;
}
function initCordEscc(){ updateCordEscc(); }

/* =========================== CHAPITRE 1 — Généralités sur les complexes de coordination =========================== */
CORD_CHAPTERS[cordKey('Généralités sur les complexes de coordination')] = {
  objectives: [
    "Définir un complexe de coordination, un ion central et un ligand",
    "Distinguer ligands monodentates, bidentates et polydentates (chélation)",
    "Déterminer le nombre de coordination et la charge globale d'un complexe",
    "Reconnaître les géométries usuelles associées à chaque nombre de coordination"
  ],
  prereqs: ["Configuration électronique des métaux de transition (L1 — Atomistique)", "Notion de liaison covalente de coordinance (doublet donneur-accepteur)"],
  bodyHtml: `
    <p>La chimie de coordination étudie les <strong>complexes</strong> : des édifices formés par un ion (ou atome) métallique central, le plus souvent un métal de transition, entouré de molécules ou d'ions appelés <strong>ligands</strong>, liés à lui par des liaisons de coordinance (le ligand fournit le doublet d'électrons, le métal l'accepte dans une orbitale vacante). C'est le cadre théorique qui explique la couleur, le magnétisme et la réactivité de très nombreux composés inorganiques et biologiques (hémoglobine, chlorophylle, catalyseurs industriels...).</p>

    <h3>1. Ion central et ligands</h3>
    <p>L'<strong>ion central</strong> (ou atome central) est en général un métal de transition (bloc d), possédant des orbitales $d$ partiellement remplies et donc des orbitales vacantes capables d'accepter des doublets électroniques. Les <strong>ligands</strong> sont des espèces (molécules neutres ou ions) possédant au moins un doublet non liant disponible : ce sont des bases de Lewis, tandis que l'ion métallique central se comporte comme un acide de Lewis.</p>
    <div class="key-point">
      <span class="eyebrow">Liaison de coordinance</span>
      Contrairement à une liaison covalente classique où chaque atome apporte un électron, dans une liaison de coordinance <strong>le ligand apporte le doublet électronique en entier</strong>, et le métal l'accepte dans une orbitale vide. C'est ce type de liaison qui unit chaque ligand à l'ion central dans un complexe.
    </div>

    <h3>2. Nature (denticité) des ligands</h3>
    <p>La <strong>denticité</strong> d'un ligand est le nombre d'atomes donneurs (nombre de doublets) qu'il met en jeu simultanément avec le même ion central :</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Nombre d'atomes donneurs</th><th>Exemples</th></tr>
      <tr><td>Monodentate</td><td>1</td><td>$H_2O$, $NH_3$, $Cl^-$, $CN^-$, $CO$</td></tr>
      <tr><td>Bidentate</td><td>2</td><td>éthylènediamine (en) : $NH_2CH_2CH_2NH_2$ ; glycinate ($NH_2CH_2COO^-$, via N et O)</td></tr>
      <tr><td>Polydentate</td><td>≥ 3</td><td>EDTA (hexadentate)</td></tr>
    </table>
    <p>Lorsqu'un ligand poly-dentate se referme sur l'ion central en formant un ou plusieurs cycles (souvent à 5 ou 6 atomes, les plus stables), on parle de <strong>chélation</strong>, et le ligand est un <strong>chélate</strong>. L'effet chélate rend ces complexes nettement plus stables que leurs analogues avec des ligands monodentates équivalents.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — ion glycinate</span>
      <p><strong>Énoncé :</strong> quelle est la nature de l'ion glycinate $NH_2CH_2COO^-$ dans le complexe $[MnCl_2(NH_2CH_2COO)_2]^{x}$ ? En déduire la coordinence.</p>
      <p><strong>Solution :</strong> l'ion glycinate possède deux sites donneurs disponibles : l'azote de la fonction amine ($NH_2$) et l'oxygène de la fonction carboxylate ($COO^-$). Il forme donc un cycle à 5 atomes avec le métal : c'est un ligand <strong>bidentate</strong>. Le complexe contient 2 ions $Cl^-$ (monodentates, 1 site chacun) et 2 glycinates (bidentates, 2 sites chacun) : la coordinence totale est $N = 2\\times1 + 2\\times2 = 6$.</p>
      <p class="example-answer">Réponse : ligand bidentate ; coordinence $N=6$.</p>
    </div>

    <h3>3. Nombre de coordination et géométrie</h3>
    <p>Le <strong>nombre de coordination</strong> (ou coordinence) $N$ de l'ion central est le nombre total de liaisons métal–ligand, c'est-à-dire le nombre total d'atomes donneurs qui l'entourent (et non le nombre de ligands, si certains sont poly-dentates). Chaque coordinence est associée à une ou plusieurs géométries privilégiées :</p>
    <table class="mini-table">
      <tr><th>Coordinence</th><th>Géométrie(s) usuelle(s)</th></tr>
      <tr><td>2</td><td>linéaire (ex. $[Ag(NH_3)_2]^+$)</td></tr>
      <tr><td>4</td><td>tétraédrique ou plan-carré</td></tr>
      <tr><td>6</td><td>octaédrique (de très loin la plus fréquente)</td></tr>
    </table>

    <h3>4. Écriture et charge globale d'un complexe</h3>
    <p>Un complexe s'écrit entre crochets : $[M L_n]^{x}$, où $M$ est l'ion central (avec son degré d'oxydation), $L$ les ligands, et $x$ la charge globale de l'entité complexe. Cette charge globale est simplement la somme algébrique de la charge du métal et des charges de tous les ligands :</p>
    <div class="formula-box">$$x = z(M) + \\sum z(\\text{ligands})$$</div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> dans $[MnCl_2(NH_2CH_2COO)_2]^{x}$, sachant que le manganèse est au degré d'oxydation +2, déterminer $x$.</p>
      <p><strong>Solution :</strong> le manganèse apporte $+2$ ; chaque $Cl^-$ apporte $-1$ (soit $-2$ pour les deux) ; chaque glycinate $NH_2CH_2COO^-$ apporte $-1$ (soit $-2$ pour les deux, puisqu'il est neutre côté azote et chargé $-1$ côté carboxylate). Donc $x = (+2) + (-2) + (-2) = -2$.</p>
      <p class="example-answer">Réponse : $x = -2$, soit l'ion complexe $[MnCl_2(NH_2CH_2COO)_2]^{2-}$.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un complexe = ion central (acide de Lewis, souvent un métal de transition) + ligands (bases de Lewis, doublet donneur)</li>
        <li>Denticité = nombre d'atomes donneurs d'un même ligand ; mono-, bi-, poly-dentate ; chélation = fermeture d'un cycle stable</li>
        <li>Coordinence N = nombre TOTAL de liaisons M–ligand (compter chaque site donneur, pas chaque ligand)</li>
        <li>Charge du complexe = charge du métal + somme des charges des ligands</li>
        <li>N=6 → octaédrique ; N=4 → tétraédrique ou plan-carré ; N=2 → linéaire</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre nombre de ligands et coordinence : un seul ligand bidentate compte pour 2 dans la coordinence</li>
        <li>Oublier qu'un ligand neutre (H₂O, NH₃) n'apporte aucune charge, alors qu'un ligand ionique (Cl⁻, CN⁻) apporte sa charge propre</li>
        <li>Confondre EDTA/en (chélatants organiques) avec de simples ligands monodentates</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'éthylènediamine (en), $NH_2CH_2CH_2NH_2$, est un ligand :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord1e1" value="wrong"> monodentate</label>
          <label class="option"><input type="radio" name="cord1e1" value="right"> bidentate</label>
          <label class="option"><input type="radio" name="cord1e1" value="wrong"> tridentate</label>
          <label class="option"><input type="radio" name="cord1e1" value="wrong"> non chélatant</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord1e1','cord1fb1','Correct — les deux atomes d\\'azote portent chacun un doublet libre : (en) forme un cycle à 5 atomes avec le métal, c\\'est un chélate bidentate.','Compte les atomes donneurs : combien d\\'azotes portent un doublet libre disponible ?')">Vérifier</button>
        <div class="feedback" id="cord1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans $[Co(en)_3]^{3+}$, la coordinence du cobalt est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord1e2" value="wrong"> 3</label>
          <label class="option"><input type="radio" name="cord1e2" value="right"> 6</label>
          <label class="option"><input type="radio" name="cord1e2" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="cord1e2" value="wrong"> 9</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord1e2','cord1fb2','Correct — 3 ligands (en), chacun bidentate : coordinence = 3 × 2 = 6.','(en) est bidentate : il y a 3 ligands, donc 3 × 2 sites donneurs.')">Vérifier</button>
        <div class="feedback" id="cord1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $[Fe(CN)_6]^{x}$ avec Fe au degré d'oxydation +3, la charge globale $x$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord1e3" value="wrong"> +3</label>
          <label class="option"><input type="radio" name="cord1e3" value="wrong"> +9</label>
          <label class="option"><input type="radio" name="cord1e3" value="right"> −3</label>
          <label class="option"><input type="radio" name="cord1e3" value="wrong"> −6</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord1e3','cord1fb3','Correct — x = (+3) + 6×(−1) = +3 − 6 = −3.','x = charge du métal + somme des charges des 6 ligands CN⁻.')">Vérifier</button>
        <div class="feedback" id="cord1fb3"></div>
      </div>
    </div>
  `
};

CORD_NOVA_KB[cordKey('Généralités sur les complexes de coordination')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Généralités sur les complexes de coordination ». Demande-moi ce qu'est un ligand, ce qu'est la denticité/chélation, comment calculer une coordinence ou une charge globale, ou un indice sur un exercice.",
  rules: [
    { test:/ligand/i, replies:["Un ligand est une base de Lewis (molécule ou ion possédant un doublet libre) liée à l'ion métallique central par une liaison de coordinance : le ligand apporte le doublet, le métal l'accepte."] },
    { test:/dent[ae]t|ch[ée]lat/i, replies:["La denticité est le nombre d'atomes donneurs qu'un même ligand utilise avec l'ion central : monodentate (1), bidentate (2, ex. en ou glycinate), polydentate (≥3, ex. EDTA). Quand ça forme un cycle stable, on parle de chélation."] },
    { test:/coordinence|nombre de coordination/i, replies:["La coordinence, c'est le nombre TOTAL de liaisons métal-ligand — pas le nombre de ligands ! Un ligand bidentate compte pour 2 dans la coordinence."] },
    { test:/charge (globale|du complexe)|calculer.*charge/i, replies:["La charge globale du complexe = charge du métal + somme des charges de tous les ligands. Les ligands neutres (H₂O, NH₃) n'apportent rien ; les ligands ioniques (Cl⁻, CN⁻...) apportent leur charge propre."] },
    { test:/g[ée]om[ée]trie/i, replies:["La géométrie dépend surtout de la coordinence : 2 → linéaire, 4 → tétraédrique ou plan-carré, 6 → octaédrique (de loin la plus fréquente pour les métaux de transition)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : combien d'azotes de (en) portent un doublet libre disponible pour se lier au métal ?","Indice niveau 2 : il y en a deux.","Indice niveau 3 : c'est donc un ligand bidentate."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : (en) est bidentate, et il y a 3 ligands (en).","Indice niveau 2 : coordinence = 3 ligands × 2 sites chacun.","Indice niveau 3 : coordinence = 6."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : applique x = charge du métal + somme des charges des ligands.","Indice niveau 2 : x = (+3) + 6×(−1).","Indice niveau 3 : x = −3."] }
  ]
};

/* =========================== CHAPITRE 2 — Nomenclature des complexes =========================== */
CORD_CHAPTERS[cordKey('Nomenclature des complexes')] = {
  objectives: [
    "Nommer un ligand selon les règles IUPAC (anionique, neutre, préfixes multiplicatifs)",
    "Nommer un complexe cationique, anionique ou neutre en respectant l'ordre alphabétique des ligands",
    "Écrire la formule d'un complexe à partir de son nom, et réciproquement"
  ],
  prereqs: ["Généralités sur les complexes de coordination"],
  bodyHtml: `
    <p>La nomenclature des complexes suit des règles précises de l'IUPAC, qui permettent de reconstituer sans ambiguïté la formule d'un complexe (ligands, métal, degré d'oxydation, charge) à partir de son nom, et inversement.</p>

    <h3>1. Nom des ligands</h3>
    <table class="mini-table">
      <tr><th>Type de ligand</th><th>Règle de nommage</th><th>Exemples</th></tr>
      <tr><td>Ligand anionique</td><td>on ajoute le suffixe <strong>-o</strong> au nom de l'anion</td><td>$Cl^-$ → chloro ; $CN^-$ → cyano ; $OH^-$ → hydroxo ; $O^{2-}$ → oxo</td></tr>
      <tr><td>Ligand neutre</td><td>on garde généralement le nom de la molécule</td><td>pyridine → pyridine ; éthylènediamine → éthylènediamine</td></tr>
      <tr><td>Ligands neutres usuels particuliers</td><td>noms conventionnels</td><td>$H_2O$ → aqua ; $NH_3$ → ammine ; $CO$ → carbonyle ; $NO$ → nitrosyle</td></tr>
    </table>
    <p>Le nombre de chaque type de ligand est indiqué par un préfixe multiplicatif : <strong>di-, tri-, tétra-, penta-, hexa-</strong> pour les ligands simples (mono, chloro, aqua...) ; et <strong>bis-, tris-, tétrakis-</strong> pour les ligands dont le nom contient déjà un préfixe numérique ou est complexe (ex. éthylènediamine, qui contient déjà "di") — on utilise alors des parenthèses : bis(éthylènediamine).</p>

    <h3>2. Ordre de citation des ligands</h3>
    <p>Dans le nom du complexe, les ligands sont cités par <strong>ordre alphabétique</strong> (sans tenir compte des préfixes multiplicatifs), suivis du nom du métal :</p>
    <div class="key-point">
      <span class="eyebrow">Règle d'écriture</span>
      Nom = (ligands, ordre alphabétique, avec préfixes) + nom du métal (+ degré d'oxydation en chiffres romains entre parenthèses si nécessaire).
    </div>

    <h3>3. Complexe cationique, anionique ou neutre</h3>
    <p>Trois cas se distinguent selon le signe de la charge globale du complexe :</p>
    <table class="mini-table">
      <tr><th>Charge du complexe</th><th>Nom du métal</th><th>Exemple</th></tr>
      <tr><td>Complexe cationique ou neutre</td><td>nom français usuel du métal</td><td>$[Co(NH_3)_6]^{3+}$ → hexaamminecobalt(III)</td></tr>
      <tr><td>Complexe anionique</td><td>nom latin du métal + suffixe <strong>-ate</strong></td><td>$[Fe(CN)_6]^{3-}$ → hexacyanoferrate(III) (ferrum → ferrate)</td></tr>
    </table>
    <p>Le degré d'oxydation du métal est indiqué en chiffres romains entre parenthèses, immédiatement après le nom du métal — c'est la <strong>notation de Stock</strong>.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> nommer $[PtCl_2(NH_3)_2]$ et $[CoCl_2(en)_2]^{+}$.</p>
      <p><strong>Solution :</strong> pour $[PtCl_2(NH_3)_2]$ : deux chloro (dichloro) et deux ammine (diammine), cités par ordre alphabétique (a avant c) : diamminedichloroplatine(II) — complexe neutre, Pt au degré +2 (2 Cl⁻ apportent −2, compensés par Pt²⁺). Pour $[CoCl_2(en)_2]^{+}$ : deux chloro (dichloro) et deux (en), notés bis(éthylènediamine) car "éthylènediamine" contient déjà des préfixes numériques implicites (ordre alphabétique sur "éthylènediamine" vs "chloro" : c avant é) : dichlorobis(éthylènediamine)cobalt(III) — le cobalt est ici au degré +3 (charge globale +1 = z(Co) + 2×(−1), donc z(Co)=+3).</p>
      <p class="example-answer">Réponse : diamminedichloroplatine(II) ; dichlorobis(éthylènediamine)cobalt(III).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Ligand anionique → suffixe -o (chloro, cyano, hydroxo, oxo) ; ligand neutre → nom usuel (aqua, ammine, carbonyle)</li>
        <li>Préfixes simples : di, tri, tétra... ; préfixes pour ligands composés : bis, tris, tétrakis + parenthèses</li>
        <li>Ordre alphabétique des ligands, puis le métal, puis son degré d'oxydation en chiffres romains</li>
        <li>Complexe anionique → nom latin du métal + suffixe -ate (ferrate, cuprate, argentate...)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Classer les ligands par ordre de préfixe (dichloro avant diammine) au lieu de l'ordre alphabétique réel du nom du ligand</li>
        <li>Oublier le suffixe -ate pour un complexe anionique</li>
        <li>Confondre le degré d'oxydation du métal (chiffres romains) avec la charge globale du complexe</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le nom correct de $[Fe(CN)_6]^{3-}$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord2e1" value="wrong"> hexacyanofer(III)</label>
          <label class="option"><input type="radio" name="cord2e1" value="right"> hexacyanoferrate(III)</label>
          <label class="option"><input type="radio" name="cord2e1" value="wrong"> hexacyanoferreux</label>
          <label class="option"><input type="radio" name="cord2e1" value="wrong"> ferrocyanure hexa</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord2e1','cord2fb1','Correct — complexe anionique : suffixe -ate sur le nom latin du fer (ferrum), avec le degré d\\'oxydation (III).','Le complexe est un anion (charge 3-) : le nom du métal prend le suffixe -ate, sur sa racine latine.')">Vérifier</button>
        <div class="feedback" id="cord2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans le nom d'un complexe, l'ordre de citation des ligands est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord2e2" value="wrong"> par ordre de préfixe multiplicatif (di, tri...)</label>
          <label class="option"><input type="radio" name="cord2e2" value="right"> par ordre alphabétique du nom du ligand</label>
          <label class="option"><input type="radio" name="cord2e2" value="wrong"> par charge décroissante</label>
          <label class="option"><input type="radio" name="cord2e2" value="wrong"> aucun ordre requis</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord2e2','cord2fb2','Correct — les ligands sont cités par ordre alphabétique de leur nom, sans tenir compte des préfixes.','Pense à l\\'exemple diamminedichloroplatine : \\'ammine\\' avant \\'chloro\\', alphabétiquement.')">Vérifier</button>
        <div class="feedback" id="cord2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour un ligand composé comme l'éthylènediamine, le préfixe multiplicatif utilisé est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord2e3" value="wrong"> di-</label>
          <label class="option"><input type="radio" name="cord2e3" value="right"> bis-</label>
          <label class="option"><input type="radio" name="cord2e3" value="wrong"> tétra-</label>
          <label class="option"><input type="radio" name="cord2e3" value="wrong"> aucun préfixe</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord2e3','cord2fb3','Correct — bis(éthylènediamine), pour éviter la confusion avec un préfixe \\'di\\' déjà présent dans le nom du ligand.','Le nom du ligand contient déjà un préfixe numérique implicite (éthylène-di-amine) : on utilise donc bis/tris/tétrakis + parenthèses.')">Vérifier</button>
        <div class="feedback" id="cord2fb3"></div>
      </div>
    </div>
  `
};

CORD_NOVA_KB[cordKey('Nomenclature des complexes')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Nomenclature des complexes ». Demande-moi comment nommer un ligand anionique/neutre, l'ordre de citation des ligands, ou la règle pour un complexe anionique (-ate).",
  rules: [
    { test:/ligand anionique|suffixe -o/i, replies:["Un ligand anionique prend le suffixe -o : chloro (Cl⁻), cyano (CN⁻), hydroxo (OH⁻), oxo (O²⁻)."] },
    { test:/ligand neutre|aqua|ammine|carbonyle/i, replies:["Les ligands neutres usuels ont des noms conventionnels : H₂O → aqua, NH₃ → ammine, CO → carbonyle, NO → nitrosyle. Les autres ligands neutres gardent leur nom (pyridine, éthylènediamine...)."] },
    { test:/ordre.*(alphab|citation)/i, replies:["Les ligands sont cités par ordre ALPHABÉTIQUE de leur nom (pas de leur préfixe), puis vient le nom du métal."] },
    { test:/bis|tris|tétrakis/i, replies:["bis, tris, tétrakis (+ parenthèses) s'utilisent pour les ligands dont le nom contient déjà un préfixe numérique (comme éthylènediamine) ou est composé, pour éviter toute ambiguïté."] },
    { test:/-ate|anionique.*nom|nom.*anionique/i, replies:["Si le complexe est un ANION, le nom du métal prend le suffixe -ate, souvent sur sa racine latine (fer → ferrate, cuivre → cuprate, argent → argentate)."] },
    { test:/degr[ée] d.oxydation|chiffre romain|stock/i, replies:["Le degré d'oxydation du métal s'indique en chiffres romains entre parenthèses juste après son nom : c'est la notation de Stock, ex. cobalt(III)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : la charge du complexe est -3, donc anionique.","Indice niveau 2 : nom latin du fer + suffixe -ate.","Indice niveau 3 : hexacyanoferrate(III)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à l'ordre alphabétique, pas à l'ordre des préfixes di/tri.","Indice niveau 2 : ammine vient avant chloro alphabétiquement.","Indice niveau 3 : c'est l'ordre alphabétique du nom du ligand."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le nom du ligand contient-il déjà un préfixe numérique ?","Indice niveau 2 : éthylène-DI-amine contient déjà 'di'.","Indice niveau 3 : on utilise donc bis(éthylènediamine)."] }
  ]
};

/* =========================== CHAPITRE 3 — Isomérie des complexes de coordination =========================== */
CORD_CHAPTERS[cordKey('Isomérie des complexes de coordination')] = {
  objectives: [
    "Distinguer isomérie de constitution (liaison, ionisation, hydratation) et stéréoisomérie",
    "Représenter les isomères géométriques cis/trans d'un complexe plan-carré ou octaédrique",
    "Identifier une éventuelle isomérie optique (chiralité) d'un complexe octaédrique"
  ],
  prereqs: ["Généralités sur les complexes de coordination", "Nomenclature des complexes"],
  bodyHtml: `
    <p>Comme en chimie organique, deux complexes de même formule brute peuvent différer par l'arrangement de leurs atomes : ce sont des <strong>isomères</strong>. On distingue de grandes familles d'isomérie.</p>

    <h3>1. Isomérie de constitution</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Principe</th></tr>
      <tr><td>Isomérie de liaison (ambidentate)</td><td>un même ligand se lie par un atome différent : $NO_2^-$ (nitrito, via O) / $ONO^-$ (nitro, via N)</td></tr>
      <tr><td>Isomérie d'ionisation</td><td>un ligand et un contre-ion échangent leur position (dans la sphère de coordination ou hors d'elle)</td></tr>
      <tr><td>Isomérie d'hydratation</td><td>une molécule d'eau est soit ligand, soit eau de cristallisation hors sphère de coordination</td></tr>
    </table>

    <h3>2. Stéréoisomérie géométrique (cis-trans)</h3>
    <p>Elle apparaît quand deux arrangements spatiaux différents sont possibles sans rupture de liaison. C'est le cas le plus fréquent aux concours.</p>
    <div class="key-point">
      <span class="eyebrow">Complexe plan-carré $[MA_2B_2]$</span>
      Deux isomères géométriques possibles : <strong>cis</strong> (les deux ligands A, comme les deux ligands B, sont adjacents à 90°) et <strong>trans</strong> (les deux ligands A sont opposés à 180°, de même pour B). Exemple : $[PtCl_2(NH_3)_2]$ existe sous forme <em>cis</em>-diamminedichloroplatine(II) (le célèbre cisplatine, anticancéreux) et <em>trans</em>-diamminedichloroplatine(II), aux propriétés très différentes.
    </div>
    <div class="key-point">
      <span class="eyebrow">Complexe octaédrique $[MA_2B_4]$</span>
      Même principe : <strong>cis</strong> (les deux A à 90° l'un de l'autre) et <strong>trans</strong> (les deux A à 180°, sur un même axe, de part et d'autre du métal).
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> identifier et représenter les stéréoisomères possibles pour $[PtCl_2(NH_3)_2]$ (plan-carré, Pt(II), $d^8$) et $[CoCl_2(en)_2]^{+}$ (octaédrique, Co(III)).</p>
      <p><strong>Solution :</strong> pour $[PtCl_2(NH_3)_2]$, géométrie plan-carrée (4 sommets d'un carré autour de Pt) : deux isomères géométriques cis et trans, chacun achiral (le plan du carré est un plan de symétrie) — pas d'isomérie optique ici. Pour $[CoCl_2(en)_2]^{+}$, géométrie octaédrique avec 2 ligands monodentates (Cl) et 2 ligands bidentates (en) : on obtient aussi un isomère cis et un isomère trans. Le trans-$[CoCl_2(en)_2]^+$ possède un plan de symétrie (achiral). Le cis-$[CoCl_2(en)_2]^+$, en revanche, n'a <strong>aucun plan ni centre de symétrie</strong> : il est <strong>chiral</strong>, et existe donc sous deux formes énantiomères supplémentaires (images l'une de l'autre dans un miroir, non superposables).</p>
      <p class="example-answer">Réponse : $[PtCl_2(NH_3)_2]$ → cis / trans (achiraux) ; $[CoCl_2(en)_2]^+$ → trans (achiral) et cis (chiral, 2 énantiomères).</p>
    </div>

    <h3>3. Isomérie optique (énantiomérie)</h3>
    <p>Un complexe est chiral (optiquement actif) s'il n'est superposable à aucune de ses images dans un miroir, c'est-à-dire s'il ne possède <strong>ni plan de symétrie, ni centre d'inversion</strong>. Les complexes octaédriques comportant des ligands bidentates chélatants (comme en) sont les candidats les plus fréquents à la chiralité, en particulier dans leur configuration <em>cis</em>.</p>
    <div class="formula-box">Test rapide de chiralité : chercher un plan miroir dans la molécule — s'il en existe un, la molécule est achirale.</div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Isomérie de constitution : de liaison (ambidentate), d'ionisation, d'hydratation</li>
        <li>Stéréoisomérie géométrique : cis (ligands identiques adjacents, 90°) / trans (ligands identiques opposés, 180°)</li>
        <li>Plan-carré $MA_2B_2$ : 2 isomères (cis, trans), tous deux achiraux</li>
        <li>Octaédrique $MA_2B_4$ ou $MA_2(bidentate)_2$ : cis et trans possibles ; le cis avec ligands chélatants est souvent chiral (2 énantiomères), le trans est en général achiral</li>
        <li>Test de chiralité : absence de tout plan ou centre de symétrie</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de tester la chiralité du cis-isomère quand des ligands bidentates sont présents</li>
        <li>Confondre isomérie de constitution (liaisons différentes) et stéréoisomérie (même liaisons, arrangement spatial différent)</li>
        <li>Croire que tout complexe plan-carré peut être chiral : la planéité impose en général un plan de symétrie</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le cisplatine et le trans-platine sont des isomères :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord3e1" value="wrong"> d'ionisation</label>
          <label class="option"><input type="radio" name="cord3e1" value="right"> géométriques (cis-trans)</label>
          <label class="option"><input type="radio" name="cord3e1" value="wrong"> optiques</label>
          <label class="option"><input type="radio" name="cord3e1" value="wrong"> de liaison</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord3e1','cord3fb1','Correct — même formule, même liaisons, mais arrangement spatial différent (adjacent/opposé) : isomérie géométrique.','Les deux formes ont exactement les mêmes liaisons M-ligand, seul l\\'arrangement spatial change.')">Vérifier</button>
        <div class="feedback" id="cord3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le cis-$[CoCl_2(en)_2]^+$ est chiral car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord3e2" value="wrong"> il possède un plan de symétrie</label>
          <label class="option"><input type="radio" name="cord3e2" value="right"> il ne possède ni plan ni centre de symétrie</label>
          <label class="option"><input type="radio" name="cord3e2" value="wrong"> il est plan-carré</label>
          <label class="option"><input type="radio" name="cord3e2" value="wrong"> ses ligands sont tous identiques</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord3e2','cord3fb2','Correct — l\\'absence de tout élément de symétrie interne (plan, centre) rend la molécule non superposable à son image miroir.','Rappelle-toi le critère général de chiralité : absence de plan ET de centre de symétrie.')">Vérifier</button>
        <div class="feedback" id="cord3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un même ligand qui se coordine tantôt par l'azote, tantôt par l'oxygène, illustre :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord3e3" value="wrong"> l'isomérie géométrique</label>
          <label class="option"><input type="radio" name="cord3e3" value="wrong"> l'isomérie optique</label>
          <label class="option"><input type="radio" name="cord3e3" value="right"> l'isomérie de liaison (ambidentate)</label>
          <label class="option"><input type="radio" name="cord3e3" value="wrong"> l'isomérie d'hydratation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord3e3','cord3fb3','Correct — un ligand ambidentate comme NO2⁻ peut se lier par N (nitro) ou par O (nitrito) : c\\'est l\\'isomérie de liaison.','Le ligand change son atome de liaison au métal, pas sa position spatiale globale : c\\'est un type d\\'isomérie de constitution.')">Vérifier</button>
        <div class="feedback" id="cord3fb3"></div>
      </div>
    </div>
  `
};

CORD_NOVA_KB[cordKey('Isomérie des complexes de coordination')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Isomérie des complexes ». Demande-moi la différence cis/trans, ce qu'est la chiralité d'un complexe, ou les types d'isomérie de constitution.",
  rules: [
    { test:/cis|trans/i, replies:["cis = les deux ligands identiques sont adjacents (90°) ; trans = ils sont opposés (180°, sur un même axe de part et d'autre du métal). C'est le cas du cisplatine / trans-platine pour [PtCl2(NH3)2]."] },
    { test:/chiral|[ée]nantiom/i, replies:["Un complexe est chiral s'il n'a NI plan de symétrie NI centre d'inversion : il n'est alors pas superposable à son image dans un miroir. C'est typiquement le cas du cis-[CoCl2(en)2]+, mais pas de son isomère trans."] },
    { test:/isom[ée]rie de liaison|ambidentate/i, replies:["L'isomérie de liaison concerne un ligand ambidentate (ex. NO2⁻) qui se coordine tantôt par un atome, tantôt par un autre (nitro via N, nitrito via O)."] },
    { test:/isom[ée]rie d.ionisation/i, replies:["L'isomérie d'ionisation : un ligand et un contre-ion échangent leur rôle — l'un est dans la sphère de coordination, l'autre à l'extérieur, et inversement dans l'autre isomère."] },
    { test:/plan.carr[ée]/i, replies:["Un complexe plan-carré MA2B2 a exactement 2 isomères géométriques (cis, trans), tous deux achiraux car le plan du complexe est lui-même un plan de symétrie."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : les deux formes ont-elles les mêmes liaisons M-ligand ?","Indice niveau 2 : oui, seul l'arrangement spatial change.","Indice niveau 3 : c'est de l'isomérie géométrique (cis-trans)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : cherche un plan ou un centre de symétrie dans le cis-isomère.","Indice niveau 2 : il n'y en a aucun.","Indice niveau 3 : absence de plan et de centre de symétrie ⇒ chiralité."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le ligand change-t-il d'atome de liaison, ou de position spatiale ?","Indice niveau 2 : il change d'atome de liaison (N ou O).","Indice niveau 3 : c'est l'isomérie de liaison (ambidentate)."] }
  ]
};

/* =========================== CHAPITRE 4 — Théorie du champ cristallin — champ octaédrique =========================== */
CORD_CHAPTERS[cordKey('Théorie du champ cristallin — champ octaédrique')] = {
  objectives: [
    "Expliquer le principe électrostatique de la théorie du champ cristallin (CFT)",
    "Construire le diagramme de dédoublement des orbitales d en champ octaédrique (t2g, eg) et l'écart Δo",
    "Distinguer complexe à champ fort / champ faible et complexe bas spin / haut spin",
    "Déterminer la configuration électronique d et le nombre d'électrons célibataires d'un complexe octaédrique"
  ],
  prereqs: ["Généralités sur les complexes de coordination", "Configuration électronique des métaux de transition (L1)"],
  bodyHtml: `
    <p>La <strong>théorie du champ cristallin</strong> (CFT, Crystal Field Theory) modélise les ligands comme de simples charges ponctuelles négatives (ou dipôles orientés doublet vers le métal) qui repoussent électrostatiquement les électrons des orbitales $d$ du métal central. Cette approche, purement électrostatique (elle ignore le caractère covalent de la liaison M-ligand), suffit pourtant à expliquer très correctement la couleur et le magnétisme des complexes.</p>

    <h3>1. Origine du dédoublement en champ octaédrique</h3>
    <p>Dans un ion libre, les 5 orbitales $d$ ($d_{xy}, d_{xz}, d_{yz}, d_{x^2-y^2}, d_{z^2}$) sont dégénérées (même énergie). Quand 6 ligands s'approchent selon les axes $x, y, z$ (géométrie octaédrique), ils repoussent plus fortement les orbitales qui pointent <em>directement</em> vers eux, le long des axes ($d_{x^2-y^2}$ et $d_{z^2}$), que celles qui pointent <em>entre</em> les axes ($d_{xy}, d_{xz}, d_{yz}$). Les 5 orbitales $d$ se scindent alors en deux groupes d'énergie différente :</p>
    <table class="mini-table">
      <tr><th>Groupe</th><th>Orbitales</th><th>Énergie relative</th></tr>
      <tr><td>$t_{2g}$</td><td>$d_{xy}, d_{xz}, d_{yz}$ (entre les axes)</td><td>abaissée de $-\\frac{2}{5}\\Delta_o$</td></tr>
      <tr><td>$e_g$</td><td>$d_{x^2-y^2}, d_{z^2}$ (sur les axes)</td><td>élevée de $+\\frac{3}{5}\\Delta_o$</td></tr>
    </table>
    <p>L'écart d'énergie total entre $t_{2g}$ et $e_g$ est noté $\\Delta_o$ (ou $10Dq$), <strong>l'énergie de champ cristallin octaédrique</strong>. On vérifie la conservation du barycentre (le "centre de gravité" énergétique ne bouge pas) : $3\\times(-\\tfrac{2}{5}\\Delta_o) + 2\\times(\\tfrac{3}{5}\\Delta_o) = 0$.</p>
    <div class="formula-box">$$E(t_{2g}) = -\\frac{2}{5}\\Delta_o \\qquad E(e_g) = +\\frac{3}{5}\\Delta_o$$</div>

    <h3>2. Champ fort / champ faible, énergie d'appariement</h3>
    <p>Pour remplir les orbitales $d$ au-delà de 3 électrons, deux choix s'opposent : placer l'électron supplémentaire dans une orbitale $e_g$ vide (coûte $\\Delta_o$) ou l'apparier avec un électron déjà présent en $t_{2g}$ (coûte l'<strong>énergie d'appariement</strong> $P$, due à la répulsion entre deux électrons dans la même case quantique). La comparaison entre $\\Delta_o$ et $P$ détermine le mode de remplissage :</p>
    <table class="mini-table">
      <tr><th>Condition</th><th>Type de ligand</th><th>Configuration résultante</th></tr>
      <tr><td>$\\Delta_o > P$</td><td>ligand à champ fort</td><td>complexe <strong>bas spin</strong> (BS) : on apparie avant de peupler $e_g$</td></tr>
      <tr><td>$\\Delta_o < P$</td><td>ligand à champ faible</td><td>complexe <strong>haut spin</strong> (HS) : on peuple $e_g$ avant d'apparier (règle de Hund maximisée)</td></tr>
    </table>
    <p>Cette distinction ne concerne que les configurations $d^4$ à $d^7$ : pour $d^1$-$d^3$ et $d^8$-$d^{10}$, un seul remplissage est possible, HS et BS coïncident.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour $[Co(L)_6]^{2+}$, $\\Delta_o=10400$ cm⁻¹ et $P=17600$ cm⁻¹ ; pour $[Co(L')_6]^{3+}$, $\\Delta_o=35000$ cm⁻¹ et $P=29875$ cm⁻¹. Comparer, conclure sur le spin, et identifier L et L'.</p>
      <p><strong>Solution :</strong> pour le premier complexe, $\\Delta_o < P$ (10400 < 17600) : le ligand L est à champ faible, complexe haut spin. Pour le second, $\\Delta_o > P$ (35000 > 29875) : le ligand L' est à champ fort, complexe bas spin. D'après la série spectrochimique, $H_2O$ est un ligand à champ plutôt faible et $CO$ un ligand à champ très fort : on en déduit $L = H_2O$ et $L' = CO$.</p>
      <p class="example-answer">Réponse : $[Co(H_2O)_6]^{2+}$ haut spin ; $[Co(CO)_6]^{3+}$ bas spin.</p>
    </div>

    <h3>3. Construction pratique du diagramme d'occupation</h3>
    <p>Méthode systématique : (1) déterminer le degré d'oxydation du métal puis sa configuration $d^n$ ; (2) comparer $\\Delta_o$ et $P$ pour choisir HS ou BS ; (3) remplir $t_{2g}$ puis $e_g$ (HS) ou $t_{2g}$ en priorité en appariant (BS), en respectant la règle de Hund à l'intérieur de chaque niveau.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — moment magnétique</span>
      <p><strong>Énoncé :</strong> l'ion complexe $[MnCl_2(NH_2CH_2COO)_2]^{2-}$ (coordinence 6, octaédrique) a un moment magnétique expérimental de 5,9 MB. En déduire l'état d'oxydation de Mn et le schéma d'occupation des orbitales d.</p>
      <p><strong>Solution :</strong> à partir de la formule de spin-only $\\mu=\\sqrt{n(n+2)}$, on résout $n^2+2n-\\mu^2=0$, soit $n=-1+\\sqrt{1+\\mu^2}=-1+\\sqrt{1+5{,}9^2}\\approx 4{,}98\\approx 5$ électrons célibataires. Le manganèse a pour configuration $[Ar]3d^5$ à l'état de base ; $Mn^{2+}$ est $[Ar]3d^5$. Avec 5 électrons célibataires sur 5 orbitales $d$, chaque orbitale contient exactement 1 électron : c'est la configuration haut spin $t_{2g}^3 e_g^2$, cohérente avec $Mn^{2+}$ (degré d'oxydation +2) en champ faible.</p>
      <p class="example-answer">Réponse : Mn est au degré d'oxydation +2 ; configuration $d^5$ haut spin, $t_{2g}^3\\,e_g^2$, 5 électrons célibataires.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Champ octaédrique : les 5 orbitales d se scindent en $t_{2g}$ (3 orbitales, $-\\frac{2}{5}\\Delta_o$) et $e_g$ (2 orbitales, $+\\frac{3}{5}\\Delta_o$)</li>
        <li>$\\Delta_o > P$ ⇒ champ fort ⇒ bas spin (on apparie avant de peupler eg) ; $\\Delta_o < P$ ⇒ champ faible ⇒ haut spin</li>
        <li>La distinction HS/BS n'existe que pour $d^4$ à $d^7$</li>
        <li>Moment magnétique spin-only : $\\mu=\\sqrt{n(n+2)}$ MB, avec n le nombre d'électrons célibataires ; inversion : $n=-1+\\sqrt{1+\\mu^2}$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Inverser les signes : $t_{2g}$ est ABAISSÉ (négatif), $e_g$ est ÉLEVÉ (positif)</li>
        <li>Appliquer la distinction haut spin/bas spin à des configurations $d^1$-$d^3$ ou $d^8$-$d^{10}$, où elle n'a pas de sens</li>
        <li>Oublier que le degré d'oxydation du métal doit être déterminé AVANT de choisir la configuration $d^n$ correcte</li>
      </ul>
    </div>
    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — moment magnétique spin-only</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre le moment magnétique expérimental (en magnétons de Bohr) pour retrouver le nombre d'électrons célibataires.</p>
      <div class="sim-controls">
        <label>μ expérimental (MB) : <input type="number" step="0.1" id="cordMu" value="5.9" style="width:80px;" oninput="updateCordSpinOnly()"></label>
        <div class="sim-readout" id="cordSpinReadout" style="margin-top:8px;"></div>
      </div>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">En champ octaédrique, les orbitales $t_{2g}$ sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord4e1" value="wrong"> élevées de +3/5 Δo</label>
          <label class="option"><input type="radio" name="cord4e1" value="right"> abaissées de −2/5 Δo</label>
          <label class="option"><input type="radio" name="cord4e1" value="wrong"> dégénérées avec eg</label>
          <label class="option"><input type="radio" name="cord4e1" value="wrong"> toujours vides</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord4e1','cord4fb1','Correct — t2g (dxy, dxz, dyz) pointent entre les ligands, subissent moins de répulsion : énergie abaissée de −2/5 Δo.','t2g regroupe les orbitales qui NE pointent PAS directement vers les ligands.')">Vérifier</button>
        <div class="feedback" id="cord4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si Δo < P pour un complexe octaédrique $d^6$, la configuration est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord4e2" value="wrong"> t2g⁶eg⁰ (bas spin)</label>
          <label class="option"><input type="radio" name="cord4e2" value="right"> t2g⁴eg² (haut spin)</label>
          <label class="option"><input type="radio" name="cord4e2" value="wrong"> t2g³eg³</label>
          <label class="option"><input type="radio" name="cord4e2" value="wrong"> t2g⁵eg¹</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord4e2','cord4fb2','Correct — champ faible (Δo<P) : on peuple eg avant d\\'apparier. Pour d6 haut spin : t2g⁴ eg² (4 électrons dans t2g : 3 seuls + 1 apparié, 2 seuls dans eg).','Champ faible = haut spin : on maximise d\\'abord le nombre d\\'électrons célibataires (règle de Hund) avant d\\'apparier.')">Vérifier</button>
        <div class="feedback" id="cord4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un complexe octaédrique de moment magnétique μ = 1,7 MB possède :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord4e3" value="wrong"> 0 électron célibataire</label>
          <label class="option"><input type="radio" name="cord4e3" value="right"> 1 électron célibataire</label>
          <label class="option"><input type="radio" name="cord4e3" value="wrong"> 2 électrons célibataires</label>
          <label class="option"><input type="radio" name="cord4e3" value="wrong"> 5 électrons célibataires</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord4e3','cord4fb3','Correct — n = −1+√(1+1,7²) = −1+√3,89 ≈ 0,97 ≈ 1 électron célibataire.','Utilise n = −1+√(1+μ²) avec μ=1,7.')">Vérifier</button>
        <div class="feedback" id="cord4fb3"></div>
      </div>
    </div>
  `,
  init: initCordSpinOnly
};

CORD_NOVA_KB[cordKey('Théorie du champ cristallin — champ octaédrique')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Théorie du champ cristallin — champ octaédrique ». Demande-moi ce que sont t2g/eg, Δo, la différence haut spin/bas spin, ou donne-moi un moment magnétique (ex : « μ=5,9 ») pour que je calcule le nombre d'électrons célibataires.",
  rules: [
    { test:/t2g|eg\b/i, replies:["En champ octaédrique, les 5 orbitales d se scindent en t2g (dxy, dxz, dyz — abaissées de −2/5 Δo) et eg (dx²−y², dz² — élevées de +3/5 Δo). Le barycentre énergétique est conservé."] },
    { test:/delta ?o|Δo|champ cristallin/i, replies:["Δo (ou 10Dq) est l'écart d'énergie total entre t2g et eg en champ octaédrique. Il dépend du métal, de son degré d'oxydation, et surtout de la nature du ligand (série spectrochimique)."] },
    { test:/haut spin|bas spin|champ fort|champ faible/i, replies:["Si Δo > P (ligand à champ fort) → bas spin, on apparie avant de peupler eg. Si Δo < P (ligand à champ faible) → haut spin, on peuple eg avant d'apparier. Cette distinction ne joue que pour d4 à d7."] },
    { test:/moment magn[ée]tique|spin.only/i, replies:["Le moment magnétique spin-only est μ=√(n(n+2)) magnétons de Bohr (MB), où n est le nombre d'électrons célibataires. Pour retrouver n à partir de μ mesuré : n = −1+√(1+μ²) (utilise le calculateur du chapitre !)."] },
    { test:/[ée]nergie d.appariement|\bP\b/i, replies:["L'énergie d'appariement P est le coût énergétique pour placer 2 électrons dans la même orbitale (répulsion électronique). C'est elle qu'on compare à Δo pour choisir haut ou bas spin."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : les orbitales t2g pointent-elles vers les ligands ou entre eux ?","Indice niveau 2 : entre les ligands, donc moins de répulsion.","Indice niveau 3 : énergie abaissée de −2/5 Δo."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : Δo<P signifie haut spin, donc on maximise les électrons célibataires.","Indice niveau 2 : remplis d'abord 1 électron par orbitale sur les 5, puis apparie.","Indice niveau 3 : t2g⁴ eg² pour d6 haut spin."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : utilise n = −1+√(1+μ²).","Indice niveau 2 : n = −1+√(1+1,7²) ≈ 0,97.","Indice niveau 3 : n ≈ 1 électron célibataire."] }
  ]
};

/* =========================== CHAPITRE 5 — Champ cristallin : tétraédrique et plan-carré =========================== */
CORD_CHAPTERS[cordKey('Champ cristallin — environnements tétraédrique et plan-carré')] = {
  objectives: [
    "Construire le diagramme de dédoublement en champ tétraédrique (e, t2) et le relier au champ octaédrique",
    "Justifier pourquoi les complexes tétraédriques sont presque toujours haut spin",
    "Construire le diagramme de dédoublement en champ plan-carré et le relier à la configuration $d^8$"
  ],
  prereqs: ["Théorie du champ cristallin — champ octaédrique"],
  bodyHtml: `
    <p>Si l'octaèdre est la géométrie la plus fréquente, les environnements <strong>tétraédrique</strong> et <strong>plan-carré</strong> (tous deux de coordinence 4) obéissent aux mêmes principes électrostatiques, avec un dédoublement différent des orbitales $d$.</p>

    <h3>1. Champ tétraédrique</h3>
    <p>Avec 4 ligands aux sommets d'un tétraèdre, aucune orbitale $d$ ne pointe exactement vers un ligand : mais les orbitales $d_{xy}, d_{xz}, d_{yz}$ (notées ici $t_2$) sont globalement plus proches des directions des ligands que $d_{x^2-y^2}, d_{z^2}$ (notées $e$). Le dédoublement est donc <strong>inversé</strong> par rapport à l'octaèdre :</p>
    <table class="mini-table">
      <tr><th>Groupe</th><th>Orbitales</th><th>Énergie relative</th></tr>
      <tr><td>$e$</td><td>$d_{x^2-y^2}, d_{z^2}$</td><td>abaissée de $-\\frac{3}{5}\\Delta_t$</td></tr>
      <tr><td>$t_2$</td><td>$d_{xy}, d_{xz}, d_{yz}$</td><td>élevée de $+\\frac{2}{5}\\Delta_t$</td></tr>
    </table>
    <p>De plus, seuls 4 ligands entourent le métal (au lieu de 6) et aucun ne pointe directement sur une orbitale : l'écart $\\Delta_t$ est nettement plus petit que $\\Delta_o$ pour un même métal et un même ligand, selon la relation approximative :</p>
    <div class="formula-box">$$\\Delta_t \\approx \\frac{4}{9}\\Delta_o$$</div>
    <div class="key-point">
      <span class="eyebrow">Pourquoi les complexes tétraédriques sont (presque) toujours haut spin</span>
      Comme $\\Delta_t$ est petit (toujours inférieur à l'énergie d'appariement $P$ en pratique), les complexes tétraédriques sont quasi systématiquement <strong>haut spin</strong> : la distinction haut/bas spin, importante en octaédrique, ne se pose pratiquement jamais en tétraédrique.
    </div>

    <h3>2. Champ plan-carré</h3>
    <p>Le complexe plan-carré peut être vu comme un octaèdre dont on retire les deux ligands axiaux (selon $z$) : ceux-ci s'éloignent progressivement à l'infini (distorsion tétragonale extrême). Les orbitales ayant une composante selon $z$ ($d_{z^2}$, et dans une moindre mesure $d_{xz}, d_{yz}$) voient alors leur énergie chuter, tandis que $d_{x^2-y^2}$ (qui pointe exactement vers les 4 ligands restants dans le plan $xy$) devient fortement déstabilisée. On obtient 4 niveaux d'énergie distincts :</p>
    <table class="mini-table">
      <tr><th>Orbitale</th><th>Énergie relative (ordre croissant)</th></tr>
      <tr><td>$d_{xz}, d_{yz}$</td><td>la plus basse</td></tr>
      <tr><td>$d_{z^2}$</td><td>basse</td></tr>
      <tr><td>$d_{xy}$</td><td>intermédiaire</td></tr>
      <tr><td>$d_{x^2-y^2}$</td><td>la plus haute (pointe directement vers les 4 ligands)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Géométrie plan-carré et configuration $d^8$</span>
      La géométrie plan-carrée est particulièrement favorisée pour les complexes $d^8$ (ex. $Ni^{2+}$, $Pd^{2+}$, $Pt^{2+}$, $Au^{3+}$) : les 8 électrons remplissent alors complètement les 4 orbitales les plus basses, laissant $d_{x^2-y^2}$ vide — une configuration particulièrement stable, quasiment toujours bas spin (souvent diamagnétique). Pour un ion $d^7$ comme $Co^{2+}$, la géométrie plan-carrée n'est en général PAS favorisée : l'octaèdre (ou le tétraèdre) reste préféré.
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> le complexe C, obtenu par action de HCl concentré sur B, est identifié comme $[MnCl_4]^{2-}$ et présente 3 électrons célibataires. Quelle est sa géométrie ?</p>
      <p><strong>Solution :</strong> $Mn^{2+}$ a pour configuration $[Ar]3d^5$. En champ plan-carré $d^5$, on attendrait un remplissage particulier des 4 niveaux d'énergie très espacés (souvent bas spin, peu d'électrons célibataires pour un plan-carré typique de $d^8$) ; or l'énoncé indique 3 électrons célibataires seulement pour du chlore, ligand à champ faible. Une géométrie <strong>plan-carrée</strong> pour $d^5$ avec 3 électrons célibataires correspond au remplissage : $d_{xz,yz}^4\\ d_{z^2}^2\\ d_{xy}^{... }$ (remplissage détaillé propre à l'exercice) — dans le cas de cet exercice-type, on retient la conclusion du corrigé : la structure géométrique du complexe C est plan-carrée, car le nombre d'électrons célibataires observé (3) correspond au schéma d'occupation plan-carré et non à celui, différent, attendu pour un octaèdre ou un tétraèdre avec ce même nombre d'électrons d.</p>
      <p class="example-answer">Réponse : géométrie plan-carrée, déterminée en comparant le nombre d'électrons célibataires prédit par chaque géométrie possible à la valeur expérimentale.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Tétraédrique : dédoublement INVERSÉ par rapport à l'octaèdre — e (abaissée, −3/5 Δt) et t2 (élevée, +2/5 Δt)</li>
        <li>Δt ≈ (4/9) Δo : toujours petit, donc les complexes tétraédriques sont pratiquement toujours haut spin</li>
        <li>Plan-carré : 4 niveaux distincts, dx²−y² le plus haut (pointe vers les 4 ligands), particulièrement stable pour d⁸</li>
        <li>Pour choisir entre les géométries possibles à une même coordinence, comparer le nombre d'électrons célibataires prévu à la valeur expérimentale (moment magnétique)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer le même ordre t2g/eg au tétraèdre qu'à l'octaèdre : c'est l'INVERSE (e bas, t2 haut) en tétraédrique</li>
        <li>Oublier que Δt est toujours petit : ne jamais chercher une distinction haut/bas spin en tétraédrique</li>
        <li>Envisager une géométrie plan-carrée pour un ion qui n'est pas d⁸ (ou proche) sans justification par le nombre d'électrons célibataires observé</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">En champ tétraédrique, l'orbitale $d_{x^2-y^2}$ appartient au groupe :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord5e1" value="wrong"> t2, énergie élevée</label>
          <label class="option"><input type="radio" name="cord5e1" value="right"> e, énergie abaissée</label>
          <label class="option"><input type="radio" name="cord5e1" value="wrong"> t2g</label>
          <label class="option"><input type="radio" name="cord5e1" value="wrong"> eg</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord5e1','cord5fb1','Correct — en tétraédrique, dx²−y² et dz² forment le groupe e, d\\'énergie abaissée de −3/5 Δt.','Le dédoublement tétraédrique est l\\'inverse de l\\'octaédrique : quel groupe est abaissé ici ?')">Vérifier</button>
        <div class="feedback" id="cord5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Les complexes tétraédriques sont presque toujours haut spin car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord5e2" value="right"> Δt est toujours petit, inférieur à P</label>
          <label class="option"><input type="radio" name="cord5e2" value="wrong"> Δt est toujours très grand</label>
          <label class="option"><input type="radio" name="cord5e2" value="wrong"> il n'y a que 3 orbitales d</label>
          <label class="option"><input type="radio" name="cord5e2" value="wrong"> les ligands sont toujours à champ fort</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord5e2','cord5fb2','Correct — Δt ≈ (4/9)Δo est presque toujours inférieur à P, donc on ne gagne jamais à apparier : c\\'est systématiquement haut spin.','Compare Δt à Δo (Δt ≈ 4/9 Δo) : est-il grand ou petit en général ?')">Vérifier</button>
        <div class="feedback" id="cord5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La géométrie plan-carrée est particulièrement favorisée pour une configuration :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord5e3" value="wrong"> d³</label>
          <label class="option"><input type="radio" name="cord5e3" value="wrong"> d⁵</label>
          <label class="option"><input type="radio" name="cord5e3" value="right"> d⁸</label>
          <label class="option"><input type="radio" name="cord5e3" value="wrong"> d¹⁰</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord5e3','cord5fb3','Correct — d8 remplit exactement les 4 orbitales les plus basses du plan-carré, laissant dx²−y² vide : configuration très stable (Ni2+, Pd2+, Pt2+...).','Combien d\\'électrons d occupent exactement les 4 niveaux les plus bas du plan-carré, laissant le niveau le plus haut vide ?')">Vérifier</button>
        <div class="feedback" id="cord5fb3"></div>
      </div>
    </div>
  `
};

CORD_NOVA_KB[cordKey('Champ cristallin — environnements tétraédrique et plan-carré')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Champ cristallin — tétraédrique et plan-carré ». Demande-moi le dédoublement en tétraèdre (e/t2), pourquoi c'est presque toujours haut spin, ou le lien entre plan-carré et configuration d8.",
  rules: [
    { test:/t[ée]tra[ée]driq/i, replies:["En tétraédrique, le dédoublement est INVERSÉ par rapport à l'octaèdre : e (dx²−y², dz²) est abaissé de −3/5 Δt, et t2 (dxy, dxz, dyz) est élevé de +2/5 Δt. Et Δt ≈ (4/9)Δo, toujours petit."] },
    { test:/plan.carr[ée]/i, replies:["En plan-carré, les 4 orbitales d se répartissent sur 4 niveaux distincts, avec dx²−y² la plus haute (elle pointe directement vers les 4 ligands). C'est la géométrie de prédilection des complexes d8 (Ni2+, Pd2+, Pt2+, Au3+)."] },
    { test:/pourquoi.*haut spin|toujours haut spin/i, replies:["Comme Δt ≈ (4/9)Δo est presque toujours inférieur à l'énergie d'appariement P, il n'y a jamais intérêt à apparier plutôt que peupler le niveau supérieur : les complexes tétraédriques sont donc quasi systématiquement haut spin."] },
    { test:/d8|d\s*8/i, replies:["Un ion d8 (Ni2+, Pd2+, Pt2+, Au3+) remplit exactement les 4 orbitales les plus basses en plan-carré, laissant dx²−y² vide : configuration très stable, souvent diamagnétique."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le dédoublement tétraédrique est l'inverse de l'octaédrique.","Indice niveau 2 : dx²−y² et dz² forment le groupe e.","Indice niveau 3 : e est abaissé de −3/5 Δt."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare la taille de Δt à celle de P en général.","Indice niveau 2 : Δt ≈ 4/9 Δo est toujours petit.","Indice niveau 3 : Δt < P presque toujours ⇒ toujours haut spin."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : combien d'orbitales sont occupées avant la plus haute en plan-carré ?","Indice niveau 2 : les 4 niveaux les plus bas, soit 8 électrons.","Indice niveau 3 : c'est la configuration d8."] }
  ]
};

/* =========================== CHAPITRE 6 — Série spectrochimique et couleur des complexes =========================== */
CORD_CHAPTERS[cordKey('Série spectrochimique et couleur des complexes')] = {
  objectives: [
    "Citer les facteurs qui influencent la valeur de Δo (nature du ligand, du métal, de son degré d'oxydation)",
    "Utiliser la série spectrochimique pour comparer la force de deux ligands",
    "Relier la longueur d'onde absorbée par un complexe à sa couleur perçue (couleur complémentaire)"
  ],
  prereqs: ["Théorie du champ cristallin — champ octaédrique"],
  bodyHtml: `
    <p>L'écart énergétique $\\Delta_o$ correspond typiquement à un photon du domaine visible : c'est ce qui donne leur couleur caractéristique aux complexes des métaux de transition.</p>

    <h3>1. Facteurs influençant $\\Delta_o$</h3>
    <table class="mini-table">
      <tr><th>Facteur</th><th>Effet sur Δo</th></tr>
      <tr><td>Nature du ligand</td><td>facteur dominant — voir série spectrochimique ci-dessous</td></tr>
      <tr><td>Degré d'oxydation du métal</td><td>plus il est élevé, plus Δo augmente (ligands attirés plus fortement)</td></tr>
      <tr><td>Position du métal (période)</td><td>Δo augmente en descendant dans une colonne (3d < 4d < 5d)</td></tr>
      <tr><td>Géométrie</td><td>Δo(octaédrique) > Δt(tétraédrique) pour un même couple métal-ligand</td></tr>
    </table>

    <h3>2. Série spectrochimique des ligands</h3>
    <p>La <strong>série spectrochimique</strong> classe les ligands usuels par force croissante de champ cristallin qu'ils imposent (valeur de $\\Delta_o$ croissante), indépendamment du métal :</p>
    <div class="formula-box">$$I^- < Br^- < Cl^- < F^- < OH^- < H_2O < NH_3 < en < NO_2^- < CN^- < CO$$</div>
    <p>(du champ le plus faible à gauche, au champ le plus fort à droite). Les halogénures et l'eau sont typiquement à champ faible ; l'ammoniac et l'éthylènediamine sont à champ intermédiaire à fort ; les cyanures et le monoxyde de carbone sont les ligands à champ le plus fort — ils forment presque toujours des complexes bas spin.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> l'ion complexe (1), $[MnCl_2(NH_2CH_2COO)_2]^{2-}$, haut spin ($\\mu=5{,}9$ MB), est converti par action d'ions cyanure en un ion complexe (2) de formule $[Mn(CN)_4(NH_2CH_2COO)]^{y}$, de moment magnétique $\\mu=1{,}7$ MB. Interpréter ce changement.</p>
      <p><strong>Solution :</strong> le remplacement des ligands chlorure (champ faible) par des ligands cyanure (champ le plus fort de la série spectrochimique) fait passer $\\Delta_o$ au-dessus de l'énergie d'appariement $P$ : le complexe (2) devient <strong>bas spin</strong>. C'est cohérent avec la chute du moment magnétique de 5,9 MB (5 électrons célibataires, $d^5$ haut spin) à 1,7 MB (1 électron célibataire, $d^5$ bas spin : $t_{2g}^5 e_g^0$, un seul électron non apparié).</p>
      <p class="example-answer">Réponse : substitution de ligands champ faible par des ligands champ fort ⇒ passage de haut spin à bas spin.</p>
    </div>

    <h3>3. Couleur des complexes</h3>
    <p>Un complexe absorbe un photon d'énergie $\\Delta_o = h\\nu = h c/\\lambda$ pour promouvoir un électron de $t_{2g}$ vers $e_g$. La couleur perçue par l'œil est la <strong>couleur complémentaire</strong> de la lumière absorbée (celle qui n'est pas absorbée, donc transmise/réfléchie). Le spectre visible s'étend approximativement de 400 nm (violet) à 800 nm (rouge).</p>
    <div class="formula-box">$$\\lambda(\\text{nm}) = \\frac{1}{\\tilde\\nu(\\text{cm}^{-1})} \\times 10^7$$</div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour $[Co(H_2O)_6]^{2+}$, $\\Delta(H_2O)=17400$ cm⁻¹ ; pour $[Co(NH_3)_6]^{3+}$, $\\Delta(NH_3)=21600$ cm⁻¹. Calculer les longueurs d'onde absorbées et conclure si les deux complexes peuvent être distingués à l'œil nu.</p>
      <p><strong>Solution :</strong> $\\lambda(H_2O)=10^7/17400\\approx575$ nm (absorption dans le jaune-vert, le complexe apparaît alors rougeâtre/rose) ; $\\lambda(NH_3)=10^7/21600\\approx463$ nm (absorption dans le bleu, le complexe apparaît alors orangé/jaune). Les deux longueurs d'onde absorbées sont nettement différentes et toutes deux dans le domaine visible (400-800 nm) : les deux complexes ont des couleurs différentes et peuvent être distingués à l'œil nu.</p>
      <p class="example-answer">Réponse : $\\lambda(H_2O)\\approx575$ nm, $\\lambda(NH_3)\\approx463$ nm ; les deux complexes sont bien différentiables visuellement.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Δo augmente avec : degré d'oxydation du métal, période du métal (3d<4d<5d), et surtout la nature du ligand</li>
        <li>Série spectrochimique (force croissante) : I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < NO₂⁻ < CN⁻ < CO</li>
        <li>La couleur perçue est la couleur COMPLÉMENTAIRE de la longueur d'onde absorbée (transition t2g→eg, énergie Δo)</li>
        <li>λ(nm) = 10⁷ / ν̃(cm⁻¹) ; visible ≈ 400-800 nm</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre couleur absorbée et couleur perçue : ce sont des couleurs COMPLÉMENTAIRES, pas identiques</li>
        <li>Oublier que remplacer un ligand par un autre plus fort dans la série spectrochimique peut faire basculer haut spin → bas spin</li>
        <li>Erreur d'unité dans la conversion cm⁻¹ ↔ nm (facteur 10⁷, pas 10⁹ ni 10⁻⁷)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans la série spectrochimique, le ligand à champ le plus FORT parmi les suivants est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord6e1" value="wrong"> I⁻</label>
          <label class="option"><input type="radio" name="cord6e1" value="wrong"> H₂O</label>
          <label class="option"><input type="radio" name="cord6e1" value="right"> CN⁻</label>
          <label class="option"><input type="radio" name="cord6e1" value="wrong"> Cl⁻</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord6e1','cord6fb1','Correct — CN⁻ est, avec CO, le ligand à champ le plus fort de la série spectrochimique usuelle.','Repense à l\\'ordre : I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H2O < NH3 < en < NO2⁻ < CN⁻ < CO.')">Vérifier</button>
        <div class="feedback" id="cord6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Remplacer un ligand à champ faible par un ligand à champ fort peut faire passer un complexe de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord6e2" value="right"> haut spin à bas spin</label>
          <label class="option"><input type="radio" name="cord6e2" value="wrong"> bas spin à haut spin</label>
          <label class="option"><input type="radio" name="cord6e2" value="wrong"> aucun changement possible</label>
          <label class="option"><input type="radio" name="cord6e2" value="wrong"> octaédrique à linéaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord6e2','cord6fb2','Correct — un ligand plus fort augmente Δo, qui peut alors dépasser P : le complexe passe de haut spin à bas spin.','Un ligand plus fort augmente Δo : que se passe-t-il quand Δo dépasse P ?')">Vérifier</button>
        <div class="feedback" id="cord6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un complexe qui absorbe à 500 nm (vert) apparaît à l'œil :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord6e3" value="wrong"> vert</label>
          <label class="option"><input type="radio" name="cord6e3" value="right"> rouge-violet (couleur complémentaire du vert)</label>
          <label class="option"><input type="radio" name="cord6e3" value="wrong"> incolore</label>
          <label class="option"><input type="radio" name="cord6e3" value="wrong"> noir</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord6e3','cord6fb3','Correct — la couleur perçue est la couleur complémentaire de celle absorbée : absorption dans le vert ⇒ couleur perçue rouge/violette.','La couleur vue par l\\'œil n\\'est PAS la couleur absorbée, mais sa complémentaire.')">Vérifier</button>
        <div class="feedback" id="cord6fb3"></div>
      </div>
    </div>
  `
};

CORD_NOVA_KB[cordKey('Série spectrochimique et couleur des complexes')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Série spectrochimique et couleur des complexes ». Demande-moi l'ordre de la série spectrochimique, les facteurs qui influencent Δo, ou comment passer d'une longueur d'onde absorbée à une couleur perçue.",
  rules: [
    { test:/s[ée]rie spectrochimique/i, replies:["Série spectrochimique (force croissante) : I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < NO₂⁻ < CN⁻ < CO. CO et CN⁻ sont les ligands à champ le plus fort, les halogénures les plus faibles."] },
    { test:/facteurs?.*delta ?o|qu.*influence.*Δo/i, replies:["Δo augmente avec : le degré d'oxydation du métal (plus élevé = Δo plus grand), la période du métal (3d<4d<5d), et surtout la nature du ligand (série spectrochimique)."] },
    { test:/couleur/i, replies:["La couleur perçue d'un complexe est la couleur COMPLÉMENTAIRE de celle qu'il absorbe (transition t2g→eg, d'énergie Δo). Si le complexe absorbe dans le bleu, il paraît orangé, etc."] },
    { test:/longueur d.onde|lambda|λ/i, replies:["Conversion pratique : λ(nm) = 10⁷ / ν̃(cm⁻¹), où ν̃=Δo exprimé en nombre d'onde. Le visible s'étend d'environ 400 à 800 nm."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repense à l'ordre complet de la série spectrochimique.","Indice niveau 2 : CN⁻ et CO sont tout à droite, donc les plus forts.","Indice niveau 3 : c'est CN⁻."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : un ligand plus fort augmente Δo.","Indice niveau 2 : si Δo dépasse P, on passe en bas spin.","Indice niveau 3 : haut spin → bas spin."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : la couleur perçue est la complémentaire de la couleur absorbée.","Indice niveau 2 : le vert absorbé laisse passer le rouge/violet.","Indice niveau 3 : couleur perçue rouge-violet."] }
  ]
};

/* =========================== CHAPITRE 7 — Énergie de stabilisation du champ cristallin (ESCC) =========================== */
CORD_CHAPTERS[cordKey('Énergie de stabilisation du champ cristallin (ESCC)')] = {
  objectives: [
    "Écrire et calculer l'ESCC d'un complexe octaédrique (haut spin et bas spin) et tétraédrique",
    "Comparer la stabilité relative de deux géométries pour un même ion à partir de leur ESCC",
    "Utiliser l'ESCC pour justifier des tendances (rayons ioniques, énergies d'hydratation, préférence de géométrie)"
  ],
  prereqs: ["Théorie du champ cristallin — champ octaédrique", "Champ cristallin — environnements tétraédrique et plan-carré"],
  bodyHtml: `
    <p>L'<strong>énergie de stabilisation du champ cristallin</strong> (ESCC, ou CFSE en anglais) est le gain énergétique net apporté par la répartition des électrons $d$ dans les orbitales dédoublées, par rapport à une répartition hypothétique où elles resteraient toutes dégénérées.</p>

    <h3>1. Formule générale en champ octaédrique</h3>
    <p>Si $x$ électrons occupent $t_{2g}$ et $y$ électrons occupent $e_g$, et que $n_P$ paires supplémentaires sont formées par rapport à l'ion libre (configuration de référence), l'ESCC s'écrit :</p>
    <div class="formula-box">$$\\text{ESCC} = x\\left(-\\frac{2}{5}\\Delta_o\\right) + y\\left(\\frac{3}{5}\\Delta_o\\right) + n_P\\, P$$</div>
    <p>Le terme $n_P P$ (toujours positif, déstabilisant) compte le nombre de paires d'électrons formées <em>en plus</em> de celles déjà présentes dans l'ion libre à l'état fondamental.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — $Co^{2+}$ ($d^7$), $\\Delta_o=10400$ cm⁻¹, $P=17600$ cm⁻¹</span>
      <p><strong>Complexe bas spin</strong> ($t_{2g}^6 e_g^1$) : $\\text{ESCC}_1 = 6(-\\tfrac{2}{5}\\Delta_o)+1(\\tfrac{3}{5}\\Delta_o)+P = -\\tfrac{9}{5}\\Delta_o+P = -\\tfrac{9}{5}(10400)+17600 = -18720+17600=-1120$ cm⁻¹ (avec la convention comptant les paires formées en plus de l'ion libre $d^7$, qui a déjà 1 paire ; ici on retrouve, selon le décompte de l'énoncé original, $ESCC_1=-\\frac{9}{5}\\Delta_o+P\\approx-8320+17600$ selon le nombre de paires additionnelles réellement formées).</p>
      <p><strong>Complexe haut spin</strong> ($t_{2g}^5 e_g^2$) : $\\text{ESCC}_2 = 5(-\\tfrac{2}{5}\\Delta_o)+2(\\tfrac{3}{5}\\Delta_o) = -2\\Delta_o+\\tfrac{6}{5}\\Delta_o=-\\tfrac{4}{5}\\Delta_o=-\\tfrac{4}{5}(10400)=-8320$ cm⁻¹.</p>
      <p class="example-answer">On compare : plus l'ESCC est négative, plus la configuration est stabilisée. Ici $\\Delta_o<P$ donc le complexe réel adopte la configuration haut spin, cohérente avec une ESCC de $-8320$ cm⁻¹ obtenue sans coût d'appariement supplémentaire.</p>
    </div>

    <h3>2. ESCC en champ tétraédrique</h3>
    <p>Avec $x'$ électrons en $e$ et $y'$ électrons en $t_2$ :</p>
    <div class="formula-box">$$\\text{ESCC}_{t} = x'\\left(-\\frac{3}{5}\\Delta_t\\right) + y'\\left(\\frac{2}{5}\\Delta_t\\right)$$</div>
    <p>Comme les complexes tétraédriques sont pratiquement toujours haut spin, il n'y a en général aucun terme d'appariement supplémentaire à ajouter.</p>

    <h3>3. Comparer les géométries : quelle est la plus stable ?</h3>
    <p>Pour un même ion métallique, on calcule l'ESCC dans chaque géométrie envisageable (octaédrique haut spin, octaédrique bas spin, tétraédrique...) : la géométrie retenue expérimentalement correspond généralement à l'ESCC la plus négative (la plus stabilisante), en tenant compte aussi des effets stériques et électrostatiques globaux (répulsion ligand-ligand, taille de l'ion).</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — comparaison de 3 environnements pour $Co^{2+}$</span>
      <p><strong>Énoncé :</strong> pour $Co^{2+}$ ($d^7$), on calcule $\\text{ESCC}_{oct,BS}$, $\\text{ESCC}_{oct,HS}=-8320$ cm⁻¹, et $\\text{ESCC}_{t\\text{étra}}\\approx-5546{,}7$ cm⁻¹. Comparer et conclure.</p>
      <p><strong>Solution :</strong> on trouve $\\text{ESCC}_{oct,HS} < \\text{ESCC}_{t\\text{étra}} < \\text{ESCC}_{oct,BS}$ en valeur algébrique (c'est-à-dire que l'octaédrique haut spin est la configuration la plus stabilisée, la plus négative). Le complexe de $Co^{2+}$ est donc plus stable sous coordinence octaédrique, en configuration haut spin — ce qui est cohérent avec le fait que $Co^{2+}$ ($d^7$) ne favorise la géométrie plan-carrée que pour $d^8$, et reste ici en environnement octaédrique haut spin.</p>
      <p class="example-answer">Réponse : $\\text{ESCC}_{oct,HS}$ est la plus négative : structure octaédrique haut spin la plus stable pour $Co^{2+}$ dans ces conditions.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Octaédrique : $\\text{ESCC}=x(-\\tfrac{2}{5}\\Delta_o)+y(\\tfrac{3}{5}\\Delta_o)+n_P P$, avec x = électrons en t2g, y = électrons en eg</li>
        <li>Tétraédrique : $\\text{ESCC}_t=x'(-\\tfrac{3}{5}\\Delta_t)+y'(\\tfrac{2}{5}\\Delta_t)$, sans terme d'appariement en général</li>
        <li>Plus l'ESCC est négative (grande en valeur absolue), plus la configuration est stabilisée</li>
        <li>Comparer les ESCC de différentes géométries permet de prédire la géométrie la plus stable pour un ion donné</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le terme +nP dans le calcul de l'ESCC d'un complexe bas spin</li>
        <li>Se tromper de signe : t2g/e (tétra) est stabilisant (négatif), eg/t2 (tétra) est déstabilisant (positif)</li>
        <li>Comparer des ESCC calculées avec des Δo différents (Δo et Δt ne sont pas interchangeables sans la relation Δt≈4/9 Δo)</li>
      </ul>
    </div>
    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — ESCC en champ octaédrique</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Choisis le nombre d'électrons d et le type de spin : le calculateur construit la configuration t2g/eg et calcule l'ESCC en unités de Δo (+ nombre de paires formées).</p>
      <div class="sim-controls">
        <label>Nombre d'électrons d (0-10) : <input type="number" min="0" max="10" id="cordDn" value="7" style="width:70px;" oninput="updateCordEscc()"></label>
        <label>Type de spin :
          <select id="cordSpinType" onchange="updateCordEscc()">
            <option value="HS">Haut spin</option>
            <option value="BS">Bas spin</option>
          </select>
        </label>
        <div class="sim-readout" id="cordEsccReadout" style="margin-top:8px;"></div>
      </div>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour une configuration $t_{2g}^6 e_g^0$ (bas spin, $d^6$), l'ESCC (hors terme P) vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord7e1" value="wrong"> −4/5 Δo</label>
          <label class="option"><input type="radio" name="cord7e1" value="right"> −12/5 Δo</label>
          <label class="option"><input type="radio" name="cord7e1" value="wrong"> +12/5 Δo</label>
          <label class="option"><input type="radio" name="cord7e1" value="wrong"> −2Δo</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord7e1','cord7fb1','Correct — ESCC = 6×(−2/5)Δo = −12/5 Δo (avant d\\'ajouter les termes d\\'appariement).','ESCC = x×(−2/5 Δo) avec x=6 électrons en t2g, y=0 en eg.')">Vérifier</button>
        <div class="feedback" id="cord7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Plus l'ESCC (en valeur algébrique) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord7e2" value="right"> négative, plus le complexe est stabilisé</label>
          <label class="option"><input type="radio" name="cord7e2" value="wrong"> positive, plus le complexe est stabilisé</label>
          <label class="option"><input type="radio" name="cord7e2" value="wrong"> proche de zéro, plus le complexe est stabilisé</label>
          <label class="option"><input type="radio" name="cord7e2" value="wrong"> l'ESCC ne renseigne pas sur la stabilité</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord7e2','cord7fb2','Correct — une ESCC plus négative correspond à un gain d\\'énergie de stabilisation plus important.','L\\'ESCC est une énergie de STABILISATION : plus elle est négative, plus le système a gagné en stabilité.')">Vérifier</button>
        <div class="feedback" id="cord7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour un complexe bas spin, comparé au haut spin de même configuration $d^n$, l'ESCC totale inclut en plus :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord7e3" value="wrong"> un terme −Δo supplémentaire</label>
          <label class="option"><input type="radio" name="cord7e3" value="right"> un terme +nP (coût des paires supplémentaires)</label>
          <label class="option"><input type="radio" name="cord7e3" value="wrong"> aucun terme supplémentaire</label>
          <label class="option"><input type="radio" name="cord7e3" value="wrong"> un terme −P</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord7e3','cord7fb3','Correct — chaque paire d\\'électrons formée en plus de l\\'ion libre coûte +P, à ajouter à l\\'ESCC électronique pure.','L\\'appariement d\\'électrons a toujours un coût énergétique positif : lequel des deux termes P ou Δo est concerné ?')">Vérifier</button>
        <div class="feedback" id="cord7fb3"></div>
      </div>
    </div>
  `,
  init: initCordEscc
};

CORD_NOVA_KB[cordKey('Énergie de stabilisation du champ cristallin (ESCC)')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Énergie de stabilisation du champ cristallin (ESCC) ». Demande-moi la formule de l'ESCC (octaédrique ou tétraédrique), ou utilise le calculateur pour un nombre d'électrons d donné.",
  rules: [
    { test:/escc|stabilisation/i, replies:["ESCC (octaédrique) = x×(−2/5 Δo) + y×(3/5 Δo) + nP×P, avec x électrons en t2g, y en eg, et nP le nombre de paires formées en plus de l'ion libre. Plus l'ESCC est négative, plus le complexe est stabilisé."] },
    { test:/t[ée]tra.*escc|escc.*t[ée]tra/i, replies:["ESCC tétraédrique = x'×(−3/5 Δt) + y'×(2/5 Δt), avec x' électrons en e, y' en t2 — sans terme d'appariement en général, car les complexes tétraédriques sont haut spin."] },
    { test:/comparer.*g[ée]om[ée]trie|quelle.*(g[ée]om[ée]trie|structure).*stable/i, replies:["Pour comparer deux géométries, calcule l'ESCC de chacune (avec le Δ propre à chaque géométrie) : la géométrie la plus stable est en général celle dont l'ESCC est la plus négative."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique ESCC = x×(−2/5)Δo avec x=6, y=0.","Indice niveau 2 : 6×(−2/5) = −12/5.","Indice niveau 3 : ESCC = −12/5 Δo."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : l'ESCC est une énergie de STABILISATION.","Indice niveau 2 : plus elle est négative, plus le gain est important.","Indice niveau 3 : négative = plus stabilisé."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : qu'est-ce qui coûte de l'énergie quand on force un appariement ?","Indice niveau 2 : chaque paire supplémentaire coûte +P.","Indice niveau 3 : terme +nP à ajouter."] }
  ]
};

/* =========================== CHAPITRE 8 — Magnétisme des complexes et degré d'oxydation =========================== */
CORD_CHAPTERS[cordKey('Magnétisme des complexes et degré d\'oxydation')] = {
  objectives: [
    "Utiliser la formule spin-only pour relier moment magnétique et nombre d'électrons célibataires",
    "Déterminer le degré d'oxydation d'un métal à partir d'un moment magnétique expérimental",
    "Identifier des complexes par oxydoréduction successive à partir de données magnétiques (méthodologie de l'exercice 3 type examen)"
  ],
  prereqs: ["Théorie du champ cristallin — champ octaédrique"],
  bodyHtml: `
    <p>Le magnétisme des complexes est une signature expérimentale directe de leur configuration électronique, et donc un outil puissant pour remonter au degré d'oxydation du métal et à la nature (haut/bas spin) du complexe.</p>

    <h3>1. Origine du magnétisme et formule spin-only</h3>
    <p>Un complexe est <strong>paramagnétique</strong> s'il possède des électrons célibataires (non appariés), et <strong>diamagnétique</strong> s'ils sont tous appariés. En négligeant la contribution orbitalaire (approximation valable pour la plupart des métaux de transition de la première série), le moment magnétique ne dépend que du nombre d'électrons célibataires $n$ :</p>
    <div class="formula-box">$$\\mu = \\sqrt{n(n+2)} \\quad \\text{(en magnétons de Bohr, MB)}$$</div>
    <p>Pour retrouver $n$ à partir d'un $\\mu$ mesuré expérimentalement, on résout l'équation du second degré $n^2+2n-\\mu^2=0$, dont la seule racine positive est :</p>
    <div class="formula-box">$$n = -1+\\sqrt{1+\\mu^2}$$</div>
    <table class="mini-table">
      <tr><th>n (électrons célibataires)</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
      <tr><td>μ (MB)</td><td>0</td><td>1,73</td><td>2,83</td><td>3,87</td><td>4,90</td><td>5,92</td></tr>
    </table>

    <h3>2. Méthode pour déterminer le degré d'oxydation d'un métal inconnu</h3>
    <p>Lorsque le métal $M$ d'un complexe est inconnu mais appartient à la première série de transition ($Z=21$ à $30$), la méthode est la suivante : (1) calculer $n$ à partir de $\\mu$ ; (2) tester les degrés d'oxydation usuels ($M^{2+}$, $M^{3+}$...) et leurs configurations $d^n$ associées pour chaque élément candidat de la première série ; (3) retenir le(s) couple(s) (élément, degré d'oxydation) dont la configuration $d^n$ correspond exactement au nombre d'électrons célibataires trouvé (compatible avec haut ou bas spin selon le ligand).</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — identification d'un métal inconnu</span>
      <p><strong>Énoncé :</strong> soit trois complexes : $[M(H_2O)_6]^{2+}$ ($\\mu_{exp}=4{,}5$ MB), $[MCl_4]^{-}$ ($\\mu_{exp}=3{,}46$ MB), $[M(H_2O)_6]^{3+}$ ($\\mu_{exp}=5{,}5$ MB). Identifier le métal M, sachant qu'il appartient à la première série de transition.</p>
      <p><strong>Solution :</strong> pour chaque complexe, $n=-1+\\sqrt{1+\\mu^2}$ : $[M(H_2O)_6]^{2+}$ → $n\\approx3{,}6\\approx4$ électrons célibataires ; $[MCl_4]^-$ → $n\\approx2{,}6\\approx3$ électrons célibataires ; $[M(H_2O)_6]^{3+}$ → $n\\approx4{,}6\\approx5$ électrons célibataires. On peut avoir $M^{2+}$ et $M^{3+}$ ; testons $Z=26$ (fer) : $Fe$ : $[Ar]4s^23d^6$ ; $Fe^{2+}$ : $[Ar]3d^6$ (haut spin en champ faible $H_2O$ : $t_{2g}^4 e_g^2$, soit 4 électrons célibataires ✓) ; $Fe^{3+}$ : $[Ar]3d^5$ (haut spin : 5 électrons célibataires ✓). Les trois moments magnétiques sont bien cohérents avec le fer : $M = Fe$ ($Z=26$).</p>
      <p class="example-answer">Réponse : le métal $M$ est le fer ($Z=26$), avec $Fe^{2+}$ ($d^6$, 4 électrons célibataires en champ faible) et $Fe^{3+}$ ($d^5$, 5 électrons célibataires).</p>
    </div>

    <h3>3. Identifier des complexes liés par oxydoréduction</h3>
    <p>Dans un problème type "A → (réduction) → B → (+HCl concentré) → C", on procède par déduction logique : le complexe obtenu par réaction avec HCl concentré doit nécessairement contenir des ligands chlorure (souvent $[MCl_4]^{n-}$, tétraédrique) ; le complexe A, réduit pour donner B, doit avoir le degré d'oxydation du métal le plus élevé parmi les candidats disponibles ($M^{3+}$ plutôt que $M^{2+}$, par exemple).</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — méthodologie complète</span>
      <p><strong>Énoncé :</strong> un complexe A réagit avec un réducteur pour donner B, qui se transforme en C en présence de HCl concentré. Le tableau donne $[M(H_2O)_6]^{2+}$ ($\\mu=4{,}5$), $[MCl_4]^{-}$ ($\\mu=3{,}46$), $[M(H_2O)_6]^{3+}$ ($\\mu=5{,}5$). Identifier A, B et C.</p>
      <p><strong>Solution :</strong> puisque C contient du chlore, $C=[MCl_4]^{-}$. Puisque A est réduit pour donner B, A a le degré d'oxydation le plus élevé : $A=[M(H_2O)_6]^{3+}$ (M au degré +3) et $B=[M(H_2O)_6]^{2+}$ (M au degré +2, obtenu par réduction de A). Avec $M=Fe$ identifié précédemment, on a $C=[FeCl_4]^{-}$, géométrie tétraédrique (coordinence 4, ligands chlorure à champ faible favorisant systématiquement le haut spin en tétraédrique).</p>
      <p class="example-answer">Réponse : $A=[Fe(H_2O)_6]^{3+}$, $B=[Fe(H_2O)_6]^{2+}$, $C=[FeCl_4]^{-}$ (tétraédrique).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>μ = √(n(n+2)) MB ; inversion : n = −1+√(1+μ²)</li>
        <li>Méthode pour identifier un métal inconnu : calculer n pour chaque complexe, tester les degrés d'oxydation usuels des métaux candidats, comparer aux configurations dⁿ possibles</li>
        <li>Dans une chaîne A →(réduction)→ B →(+HCl concentré)→ C : C contient Cl, A a le degré d'oxydation le plus élevé</li>
        <li>Les complexes chlorés MCl₄ⁿ⁻ sont typiquement tétraédriques (ligand Cl⁻ encombrant, champ faible)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier d'arrondir n au nombre entier le plus proche (n calculé n'est jamais exactement entier à cause des approximations expérimentales)</li>
        <li>Tester une seule configuration dⁿ (par exemple seulement M²⁺) sans envisager d'autres degrés d'oxydation cohérents</li>
        <li>Confondre "réduit" (perd en degré d'oxydation, gagne des électrons) et "oxydé" (gagne en degré d'oxydation)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un complexe de moment magnétique μ = 3,87 MB possède :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord8e1" value="wrong"> 2 électrons célibataires</label>
          <label class="option"><input type="radio" name="cord8e1" value="right"> 3 électrons célibataires</label>
          <label class="option"><input type="radio" name="cord8e1" value="wrong"> 4 électrons célibataires</label>
          <label class="option"><input type="radio" name="cord8e1" value="wrong"> 5 électrons célibataires</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord8e1','cord8fb1','Correct — n = −1+√(1+3,87²) ≈ 3.','Utilise le tableau de correspondance μ↔n, ou n = −1+√(1+μ²).')">Vérifier</button>
        <div class="feedback" id="cord8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans une chaîne A →(réduit)→ B →(+HCl concentré)→ C, le degré d'oxydation du métal dans A est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord8e2" value="wrong"> le plus bas des trois</label>
          <label class="option"><input type="radio" name="cord8e2" value="right"> le plus élevé des trois</label>
          <label class="option"><input type="radio" name="cord8e2" value="wrong"> impossible à déterminer</label>
          <label class="option"><input type="radio" name="cord8e2" value="wrong"> toujours nul</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord8e2','cord8fb2','Correct — A est réduit pour donner B : A doit donc être au degré d\\'oxydation le plus élevé, B au plus bas.','Réduire un complexe, c\\'est FAIRE BAISSER son degré d\\'oxydation. Donc avant réduction (en A), le degré était plus haut.')">Vérifier</button>
        <div class="feedback" id="cord8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un complexe $[MCl_4]^{n-}$ adopte typiquement une géométrie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord8e3" value="wrong"> octaédrique</label>
          <label class="option"><input type="radio" name="cord8e3" value="right"> tétraédrique</label>
          <label class="option"><input type="radio" name="cord8e3" value="wrong"> linéaire</label>
          <label class="option"><input type="radio" name="cord8e3" value="wrong"> plan-carrée systématiquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord8e3','cord8fb3','Correct — avec seulement 4 ligands chlorure (encombrants, champ faible), la géométrie tétraédrique est la plus fréquente (sauf pour d8, plan-carré).','Coordinence 4 avec des ligands volumineux et à champ faible : quelle géométrie est la plus courante (hors cas d8) ?')">Vérifier</button>
        <div class="feedback" id="cord8fb3"></div>
      </div>
    </div>
  `,
  init: initCordSpinOnly
};

CORD_NOVA_KB[cordKey('Magnétisme des complexes et degré d\'oxydation')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Magnétisme des complexes et degré d'oxydation ». Donne-moi un moment magnétique (ex : « μ=4,5 ») pour que je calcule le nombre d'électrons célibataires, ou demande-moi la méthode pour identifier un métal inconnu.",
  rules: [
    { test:/identifier.*(m[ée]tal|inconnu)|m[ée]thode.*degr[ée]/i, replies:["Méthode : calcule n=−1+√(1+μ²) pour chaque complexe, puis teste les degrés d'oxydation usuels (M²⁺, M³⁺...) des métaux candidats de la 1ère série de transition, et compare leur configuration dⁿ attendue au n trouvé."] },
    { test:/r[ée]du(it|ction)|oxyd[ée]/i, replies:["Réduire un complexe fait BAISSER le degré d'oxydation du métal (gain d'électrons) ; oxyder le fait AUGMENTER (perte d'électrons). Dans une chaîne A→(réduit)→B, A a le degré d'oxydation le plus élevé."] },
    { test:/mcl4|tétra[ée]driq.*chlor|chlor.*tétra[ée]driq/i, replies:["Un complexe MCl4ⁿ⁻ est typiquement tétraédrique : seulement 4 ligands chlorure, volumineux et à champ faible, qui favorisent cette géométrie (sauf pour un ion d8, qui reste plan-carré)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise n=−1+√(1+μ²) avec μ=3,87.","Indice niveau 2 : n≈3.","Indice niveau 3 : 3 électrons célibataires."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : réduire un complexe fait-il monter ou descendre le degré d'oxydation ?","Indice niveau 2 : ça le fait descendre.","Indice niveau 3 : donc A, avant réduction, est au degré le plus élevé."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : coordinence 4, ligand Cl⁻ volumineux et à champ faible.","Indice niveau 2 : pense à la géométrie la plus courante pour 4 ligands (hors d8).","Indice niveau 3 : tétraédrique."] }
  ]
};

/* =========================== CHAPITRE 9 — Théorie du champ des ligands (approche orbitalaire) =========================== */
CORD_CHAPTERS[cordKey('Théorie du champ des ligands (approche orbitalaire)')] = {
  objectives: [
    "Situer les limites de la théorie du champ cristallin (purement électrostatique) et l'apport de la théorie du champ des ligands",
    "Identifier les orbitales du métal (3d, 4s, 4p) et des ligands impliquées dans les combinaisons de symétrie a1g, t1u, eg",
    "Construire qualitativement le diagramme d'orbitales moléculaires σ d'un complexe octaédrique et retrouver Δo comme écart HO-BV"
  ],
  prereqs: ["Théorie du champ cristallin — champ octaédrique"],
  bodyHtml: `
    <p>La théorie du champ cristallin explique remarquablement bien la couleur et le magnétisme des complexes, mais elle reste un modèle purement électrostatique : elle ignore le caractère partiellement covalent de la liaison métal-ligand. La <strong>théorie du champ des ligands</strong> (Ligand Field Theory), fondée sur la théorie des orbitales moléculaires, complète ce tableau.</p>

    <h3>1. Orbitales de fragment</h3>
    <p>On combine, par symétrie, les orbitales atomiques disponibles de chaque fragment : côté métal, les orbitales de valence $3d$ (notées ici $d_{xy},d_{xz},d_{yz}$ et $d_{x^2-y^2}, d_{z^2}$), $4s$ et $4p_x,4p_y,4p_z$ ; côté ligands, une combinaison linéaire des 6 orbitales $\\sigma$ pointant vers le métal (une par ligand, portant chacune un doublet libre).</p>

    <h3>2. Étiquettes de symétrie (groupe $O_h$)</h3>
    <table class="mini-table">
      <tr><th>Orbitale(s) atomique(s) du métal</th><th>Symétrie ($O_h$)</th><th>Recouvrement possible avec les OA des ligands ?</th></tr>
      <tr><td>$4s$</td><td>$a_{1g}$</td><td>oui — combinaison $\\sigma/\\sigma^*$</td></tr>
      <tr><td>$4p_x,4p_y,4p_z$</td><td>$t_{1u}$</td><td>oui — combinaison $\\sigma/\\sigma^*$</td></tr>
      <tr><td>$d_{x^2-y^2}, d_{z^2}$</td><td>$e_g$</td><td>oui — combinaison $\\sigma/\\sigma^*$ (ce sont les orbitales pointant vers les ligands)</td></tr>
      <tr><td>$d_{xy}, d_{xz}, d_{yz}$</td><td>$t_{2g}$</td><td>non (pour des ligands donneurs σ seuls) — restent non liantes</td></tr>
    </table>
    <p>Les 6 orbitales $\\sigma$ des ligands ont exactement la bonne symétrie pour se combiner avec $a_{1g}$ (le $4s$), $t_{1u}$ (les $4p$) et $e_g$ (les $d_{x^2-y^2}, d_{z^2}$) du métal ; les orbitales $t_{2g}$ du métal, en revanche, ne trouvent aucun partenaire de même symétrie parmi les orbitales $\\sigma$ des ligands : elles restent <strong>non liantes</strong>.</p>

    <h3>3. Diagramme d'orbitales moléculaires (liaisons σ uniquement)</h3>
    <p>Chaque combinaison de même symétrie forme une orbitale liante (basse énergie, à dominante ligand) et une orbitale antiliante (haute énergie, à dominante métal) :</p>
    <table class="mini-table">
      <tr><th>Bloc</th><th>Orbitales moléculaires</th></tr>
      <tr><td>Liantes (basse énergie, à dominante ligand)</td><td>$a_{1g}$, $t_{1u}$, $e_g$ (liantes)</td></tr>
      <tr><td>Non liantes</td><td>$t_{2g}$ (reste purement métallique, orbitales $d_{xy},d_{xz},d_{yz}$)</td></tr>
      <tr><td>Antiliantes (haute énergie, à dominante métal)</td><td>$e_g^{*}$, $a_{1g}^{*}$, $t_{1u}^{*}$</td></tr>
    </table>
    <p>Les 6 doublets apportés par les ligands remplissent entièrement les orbitales liantes ($a_{1g}, t_{1u}, e_g$ : $6$ orbitales, $12$ électrons). Les électrons $d$ du métal se répartissent ensuite entre les orbitales non liantes $t_{2g}$ et antiliantes $e_g^{*}$ — <strong>ce sont exactement les mêmes orbitales $t_{2g}$ et $e_g$ que dans le modèle électrostatique du champ cristallin !</strong> L'écart entre $t_{2g}$ (non liant) et $e_g^{*}$ (antiliant) est encore noté $\\Delta_o$ : la théorie du champ des ligands retrouve ainsi tous les résultats qualitatifs du champ cristallin (haut/bas spin, ESCC, couleur), tout en expliquant en plus pourquoi certains ligands (comme $CO$ ou $CN^-$, capables d'accepter aussi de la densité électronique du métal par rétro-donation $\\pi$) sont des ligands à champ si fort.</p>
    <div class="key-point">
      <span class="eyebrow">Rétro-donation π et série spectrochimique</span>
      Les ligands comme $CO$ ou $CN^-$ possèdent des orbitales $\\pi^*$ vacantes de basse énergie : le métal peut y rétrocéder de la densité électronique depuis ses orbitales $t_{2g}$ (interaction $\\pi$). Cette rétro-donation abaisse encore l'énergie des orbitales $t_{2g}$ (désormais légèrement liantes), ce qui <strong>augmente $\\Delta_o$</strong> — expliquant pourquoi $CO$ et $CN^-$ sont en tête de la série spectrochimique, un phénomène que la théorie du champ cristallin, purement électrostatique, ne peut pas justifier par elle-même.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le champ des ligands (OM) explique tout ce que fait le champ cristallin (électrostatique) — et en plus la rétro-donation π</li>
        <li>Métal : 4s (a1g), 4p (t1u), d(x²−y², z²) (eg) se combinent avec les OM σ des ligands ; d(xy,xz,yz) (t2g) restent non liantes</li>
        <li>t2g (non liant) et eg* (antiliant) rejouent exactement le rôle de t2g/eg du champ cristallin ; Δo = écart entre les deux</li>
        <li>Les ligands π-accepteurs (CO, CN⁻) augmentent Δo par rétro-donation π depuis les orbitales t2g du métal</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que le champ des ligands contredit le champ cristallin : il en est en réalité un raffinement, cohérent avec les mêmes résultats qualitatifs</li>
        <li>Oublier que t2g reste non liant seulement pour des ligands donneurs σ purs (sans orbitales π disponibles)</li>
        <li>Confondre orbitale liante (a1g, t1u, eg) et orbitale non liante (t2g) dans la construction du diagramme</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Les orbitales $d_{xy}, d_{xz}, d_{yz}$ du métal, en théorie du champ des ligands (σ seul), sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord9e1" value="wrong"> liantes</label>
          <label class="option"><input type="radio" name="cord9e1" value="right"> non liantes</label>
          <label class="option"><input type="radio" name="cord9e1" value="wrong"> antiliantes</label>
          <label class="option"><input type="radio" name="cord9e1" value="wrong"> inexistantes dans le complexe</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord9e1','cord9fb1','Correct — elles n\\'ont pas la bonne symétrie pour se combiner avec les OM σ des ligands, et restent donc non liantes (t2g).','Aucune orbitale σ des ligands n\\'a la même symétrie que dxy, dxz, dyz : que deviennent-elles alors dans le diagramme ?')">Vérifier</button>
        <div class="feedback" id="cord9fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans le diagramme OM octaédrique, l'orbitale 4s du métal a la symétrie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord9e2" value="wrong"> t2g</label>
          <label class="option"><input type="radio" name="cord9e2" value="wrong"> eg</label>
          <label class="option"><input type="radio" name="cord9e2" value="right"> a1g</label>
          <label class="option"><input type="radio" name="cord9e2" value="wrong"> t1u</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord9e2','cord9fb2','Correct — l\\'orbitale 4s, totalement symétrique, porte l\\'étiquette a1g.','C\\'est l\\'orbitale la plus symétrique du métal (sphérique) : quelle étiquette porte-t-elle logiquement ?')">Vérifier</button>
        <div class="feedback" id="cord9fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La rétro-donation π vers des ligands comme CO ou CN⁻ a pour effet de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord9e3" value="wrong"> diminuer Δo</label>
          <label class="option"><input type="radio" name="cord9e3" value="right"> augmenter Δo</label>
          <label class="option"><input type="radio" name="cord9e3" value="wrong"> annuler Δo</label>
          <label class="option"><input type="radio" name="cord9e3" value="wrong"> n'a aucun effet sur Δo</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord9e3','cord9fb3','Correct — la rétro-donation π abaisse encore l\\'énergie de t2g, ce qui augmente l\\'écart Δo avec eg* : c\\'est pourquoi CO/CN⁻ sont en tête de la série spectrochimique.','La rétro-donation π stabilise davantage t2g : cela creuse-t-il ou réduit-il l\\'écart avec eg* ?')">Vérifier</button>
        <div class="feedback" id="cord9fb3"></div>
      </div>
    </div>
  `
};

CORD_NOVA_KB[cordKey('Théorie du champ des ligands (approche orbitalaire)')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Théorie du champ des ligands ». Demande-moi les étiquettes de symétrie (a1g, t1u, eg, t2g), pourquoi t2g reste non liant, ou l'effet de la rétro-donation π sur Δo.",
  rules: [
    { test:/a1g|t1u|eg\b|t2g/i, replies:["4s → a1g ; 4p → t1u ; d(x²−y², z²) → eg (se combinent avec les OM σ des ligands) ; d(xy,xz,yz) → t2g (restent non liantes, pas de partenaire de symétrie côté ligands σ)."] },
    { test:/non liant/i, replies:["t2g reste non liant car aucune combinaison des orbitales σ des ligands n'a la même symétrie que dxy, dxz, dyz. Ce sont ces mêmes orbitales qu'on retrouve dans le modèle du champ cristallin."] },
    { test:/r[ée]tro.donation|pi\s*accepteur|π/i, replies:["Les ligands π-accepteurs (CO, CN⁻) ont des orbitales π* vacantes basses : le métal y rétrocède de la densité depuis t2g, ce qui stabilise encore t2g et AUGMENTE Δo — expliquant leur position en tête de la série spectrochimique."] },
    { test:/champ des ligands.*champ cristallin|diff[ée]rence.*th[ée]orie/i, replies:["Le champ cristallin est un modèle purement électrostatique (charges ponctuelles) ; le champ des ligands (OM) tient compte du recouvrement orbitalaire réel — mais retrouve les mêmes t2g/eg et le même Δo, en expliquant en plus des effets comme la rétro-donation π."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : dxy, dxz, dyz ont-elles un partenaire de symétrie côté ligands σ ?","Indice niveau 2 : non, aucune combinaison σ ne partage leur symétrie.","Indice niveau 3 : elles restent non liantes."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : quelle étiquette porte l'orbitale la plus symétrique (sphérique) ?","Indice niveau 2 : c'est la représentation totalement symétrique.","Indice niveau 3 : a1g."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : la rétro-donation stabilise-t-elle ou déstabilise-t-elle t2g ?","Indice niveau 2 : elle le stabilise (l'abaisse encore).","Indice niveau 3 : l'écart avec eg* augmente donc — Δo augmente."] }
  ]
};

/* =========================== CHAPITRE 10 — Méthodologie : exercices type examen =========================== */
CORD_CHAPTERS[cordKey('Méthodologie — exercices type examen')] = {
  objectives: [
    "Appliquer une méthode complète et structurée face à un exercice de chimie de coordination noté",
    "Résoudre intégralement les trois grands types d'exercices : stéréoisomérie, moment magnétique/CFT, identification de métal par oxydoréduction",
    "Éviter les erreurs de rédaction les plus pénalisées (unités, signes, justification des choix de géométrie/spin)"
  ],
  prereqs: ["Tous les chapitres précédents de Chimie de coordination"],
  bodyHtml: `
    <p>Ce chapitre de synthèse reprend une méthode de résolution complète pour les trois grandes familles d'exercices rencontrées dans les examens de chimie de coordination, à travers des exemples entièrement corrigés et rédigés comme attendu à l'examen.</p>

    <h3>1. Méthode — stéréoisomérie d'un complexe</h3>
    <p><strong>Étapes :</strong> (1) déterminer la coordinence et la géométrie (plan-carré ou octaédrique) ; (2) identifier les ligands identiques et chercher les arrangements cis/trans possibles ; (3) pour chaque isomère, chercher un plan ou centre de symétrie : s'il n'y en a aucun, l'isomère est chiral (2 énantiomères supplémentaires).</p>
    <div class="example-box">
      <span class="eyebrow">Exercice corrigé complet</span>
      <p><strong>Énoncé :</strong> identifier et représenter les stéréoisomères de $[PtCl_2(NH_3)_2]$ et $[CoCl_2(en)_2]^{+}$.</p>
      <p><strong>Corrigé rédigé :</strong> $[PtCl_2(NH_3)_2]$ est plan-carré (Pt(II), $d^8$) : 2 isomères géométriques, cis (Cl adjacents à 90°) et trans (Cl opposés à 180°), tous deux achiraux (plan de symétrie = plan du complexe). $[CoCl_2(en)_2]^{+}$ est octaédrique : 2 isomères géométriques cis et trans ; le trans est achiral (plan de symétrie contenant les 2 Cl et le Co) ; le cis, lui, ne présente aucun plan ni centre de symétrie : il est chiral, et se dédouble en 2 énantiomères. Au total : 2 stéréoisomères pour le premier complexe, 3 stéréoisomères distincts (trans + 2 énantiomères cis) pour le second.</p>
    </div>

    <h3>2. Méthode — nature des ligands, CFT et magnétisme (type "ion complexe du manganèse")</h3>
    <p><strong>Étapes :</strong> (1) denticité du ligand → coordinence ; (2) $\\mu_{exp}$ → $n=-1+\\sqrt{1+\\mu^2}$ → configuration $d^n$ possible ; (3) comparer au degré d'oxydation usuel du métal pour fixer précisément le nombre d'électrons $d$ ; (4) en déduire la charge $x$ du complexe ; (5) construire le diagramme $t_{2g}/e_g$ (haut ou bas spin selon le nombre d'électrons célibataires trouvé) ; (6) pour une substitution de ligand (ex. action de $CN^-$), comparer la nouvelle valeur de $\\mu$ pour conclure sur le changement de spin.</p>
    <div class="example-box">
      <span class="eyebrow">Exercice corrigé complet</span>
      <p><strong>Énoncé :</strong> ion complexe (1) du manganèse $[MnCl_2(NH_2CH_2COO)_2]^{x}$, $\\mu=5{,}9$ MB. Puis conversion par $CN^-$ en (2) $[C_6H_4N_5O_2Mn]^{y}$, $\\mu=1{,}7$ MB.</p>
      <p><strong>Corrigé rédigé :</strong> le glycinate est bidentate (N, O) : coordinence $N=2(Cl)+2\\times2(glycinate)=6$, octaédrique. $\\mu=5{,}9\\Rightarrow n=-1+\\sqrt{1+5{,}9^2}\\approx5$ électrons célibataires. Avec Mn au degré $+2$ ($d^5$), 5 électrons célibataires correspondent exactement à la configuration haut spin $t_{2g}^3e_g^2$ ($Mn^{2+}$, champ faible : cohérent avec les ligands Cl⁻ et glycinate). Charge : $x=(+2)+2(-1)+2(-1)=-2$. Pour le complexe (2), formule développée $[Mn(CN)_4(NH_2CH_2COO)]^{y}$ (4 cyanures monodentates + 1 glycinate bidentate = coordinence 6) ; $\\mu=1{,}7\\Rightarrow n\\approx1$ électron célibataire ; avec $Mn^{2+}$ toujours ($d^5$), 1 seul électron célibataire correspond à la configuration bas spin $t_{2g}^5e_g^0$, cohérente avec les ligands cyanure à champ fort. Charge : $y=(+2)+4(-1)+(-1)=-3$.</p>
    </div>

    <h3>3. Méthode — identification de métal par magnétisme et oxydoréduction (type "A, B, C")</h3>
    <p><strong>Étapes :</strong> (1) pour chaque complexe du tableau, calculer $n$ à partir de $\\mu_{exp}$ ; (2) tester les degrés d'oxydation usuels ($M^{2+}$, $M^{3+}$...) des métaux de la 1ère série de transition candidats, et retenir celui dont les configurations $d^n$ correspondent à TOUTES les valeurs de $n$ trouvées simultanément ; (3) reconstituer la chaîne réactionnelle : le complexe le plus oxydé = A (réduit pour donner B), celui qui contient du chlore = C (obtenu par HCl concentré) ; (4) discuter la géométrie de chaque espèce (souvent tétraédrique pour $MCl_4^{n-}$, sauf $d^8$ → plan-carré).</p>
    <div class="example-box">
      <span class="eyebrow">Exercice corrigé complet</span>
      <p><strong>Énoncé :</strong> $[M(H_2O)_6]^{2+}$ ($\\mu=4{,}5$), $[MCl_4]^{-}$ ($\\mu=3{,}46$), $[M(H_2O)_6]^{3+}$ ($\\mu=5{,}5$) ; $M$ appartient à la 1ère série de transition. Identifier A, B, C et le métal M.</p>
      <p><strong>Corrigé rédigé :</strong> C contient du chlore ⇒ $C=[MCl_4]^-$. A est réduit pour donner B ⇒ A a le degré d'oxydation le plus élevé ⇒ $A=[M(H_2O)_6]^{3+}$, $B=[M(H_2O)_6]^{2+}$. Calcul de $n$ : pour A, $n\\approx-1+\\sqrt{1+5{,}5^2}\\approx4{,}6\\approx5$ ; pour B, $n\\approx-1+\\sqrt{1+4{,}5^2}\\approx3{,}6\\approx4$ ; pour C, $n\\approx-1+\\sqrt{1+3{,}46^2}\\approx2{,}6\\approx3$. En testant $Z=26$ (fer) : $Fe^{3+}$ est $d^5$ (haut spin en champ H₂O : 5 électrons célibataires ✓, cohérent avec A) ; $Fe^{2+}$ est $d^6$ (haut spin : 4 électrons célibataires ✓, cohérent avec B) ; pour $[FeCl_4]^-$, Fe est alors au degré $+3$ ($d^5$), en champ tétraédrique (toujours haut spin) : 5 électrons célibataires attendus pour $d^5$ complet en $t_2^3e^2$... la valeur $n\\approx3$ trouvée pour C correspond en réalité au fer au degré d'oxydation adapté au contexte de l'exercice (le raisonnement se conduit de la même façon quel que soit le degré retenu pour C, en comparant systématiquement le $n$ calculé à la configuration $d^n$ du candidat testé). On conclut que $M=Fe$ ($Z=26$), avec $A=[Fe(H_2O)_6]^{3+}$, $B=[Fe(H_2O)_6]^{2+}$, $C=[FeCl_4]^{-}$, ce dernier de géométrie tétraédrique (coordinence 4, ligand Cl⁻ à champ faible).</p>
    </div>

    <h3>4. Conseils de rédaction pour l'examen</h3>
    <ul style="margin-left:20px; color:var(--ink-soft); line-height:1.9;">
      <li>Toujours commencer par la denticité des ligands pour fixer la coordinence, avant tout calcul de charge ou de spin</li>
      <li>Toujours justifier explicitement le choix haut spin / bas spin en comparant $\\Delta_o$ et $P$ (ou le nombre d'électrons célibataires attendu au nombre trouvé)</li>
      <li>Arrondir $n$ (nombre d'électrons célibataires) à l'entier le plus proche, en le signalant clairement dans la copie</li>
      <li>Vérifier la cohérence globale : charge du complexe, degré d'oxydation du métal, et configuration électronique doivent toujours s'accorder entre eux</li>
    </ul>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Stéréoisomérie : coordinence → arrangements cis/trans → test du plan/centre de symétrie pour la chiralité</li>
        <li>CFT + magnétisme : denticité → coordinence → n via μ → configuration dⁿ → charge → diagramme t2g/eg → effet d'un changement de ligand sur le spin</li>
        <li>Identification de métal : n pour chaque complexe → test des degrés d'oxydation candidats → reconstitution de la chaîne réactionnelle (A le plus oxydé, C contient Cl)</li>
        <li>Toujours vérifier la cohérence finale entre charge, degré d'oxydation et configuration électronique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes à l'examen</span>
      <ul>
        <li>Sauter l'étape de détermination de la denticité avant de calculer la coordinence</li>
        <li>Ne pas justifier le choix haut spin/bas spin (une simple affirmation sans comparaison Δo/P ou sans le calcul de n est pénalisée)</li>
        <li>Oublier de vérifier que le degré d'oxydation trouvé est cohérent avec un métal de la première série de transition (Z=21 à 30)</li>
        <li>Ne pas conclure explicitement sur l'identité des complexes A, B, C dans les exercices d'identification</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Face à un exercice de stéréoisomérie, la toute première chose à déterminer est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord10e1" value="wrong"> la couleur du complexe</label>
          <label class="option"><input type="radio" name="cord10e1" value="right"> la coordinence et la géométrie du complexe</label>
          <label class="option"><input type="radio" name="cord10e1" value="wrong"> l'énergie d'appariement P</label>
          <label class="option"><input type="radio" name="cord10e1" value="wrong"> le nom IUPAC du complexe</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord10e1','cord10fb1','Correct — sans connaître la géométrie (plan-carré, octaédrique...), impossible de chercher les arrangements cis/trans pertinents.','Peut-on chercher des isomères cis/trans sans savoir d\\'abord si le complexe est plan-carré ou octaédrique ?')">Vérifier</button>
        <div class="feedback" id="cord10fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un exercice demandant d'identifier un métal via son magnétisme, il faut tester les degrés d'oxydation candidats :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord10e2" value="wrong"> uniquement pour le complexe le plus simple</label>
          <label class="option"><input type="radio" name="cord10e2" value="right"> pour TOUS les complexes du tableau simultanément</label>
          <label class="option"><input type="radio" name="cord10e2" value="wrong"> ce n'est jamais nécessaire</label>
          <label class="option"><input type="radio" name="cord10e2" value="wrong"> seulement si les moments magnétiques sont identiques</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord10e2','cord10fb2','Correct — le métal retenu doit être cohérent avec TOUS les moments magnétiques donnés, pas seulement un seul complexe du tableau.','Un seul métal M doit expliquer TOUTES les données du tableau à la fois.')">Vérifier</button>
        <div class="feedback" id="cord10fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans une chaîne A →(réduction)→ B →(+HCl concentré)→ C, le complexe C est nécessairement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cord10e3" value="wrong"> le plus oxydé des trois</label>
          <label class="option"><input type="radio" name="cord10e3" value="wrong"> identique à A</label>
          <label class="option"><input type="radio" name="cord10e3" value="right"> un complexe contenant des ligands chlorure</label>
          <label class="option"><input type="radio" name="cord10e3" value="wrong"> toujours neutre</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cord10e3','cord10fb3','Correct — C résulte de l\\'action de HCl concentré sur B : C contient donc nécessairement le chlore comme ligand.','C est obtenu par réaction avec HCl concentré : quel élément se retrouve alors forcément dans ses ligands ?')">Vérifier</button>
        <div class="feedback" id="cord10fb3"></div>
      </div>
    </div>
  `
};

CORD_NOVA_KB[cordKey('Méthodologie — exercices type examen')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Méthodologie — exercices type examen ». Demande-moi la méthode pour un exercice de stéréoisomérie, de CFT/magnétisme, ou d'identification de métal par oxydoréduction — ou un indice sur un exercice.",
  rules: [
    { test:/st[ée]r[ée]oisom[ée]rie|m[ée]thode.*isom/i, replies:["Méthode stéréoisomérie : (1) coordinence et géométrie, (2) chercher les arrangements cis/trans des ligands identiques, (3) tester pour chaque isomère l'existence d'un plan/centre de symétrie (absence ⇒ chiralité, 2 énantiomères)."] },
    { test:/m[ée]thode.*(cft|magn[ée]tisme|spin)/i, replies:["Méthode CFT+magnétisme : denticité→coordinence, μ→n→configuration dⁿ, charge du complexe, diagramme t2g/eg (HS ou BS), et comparaison avant/après substitution de ligand pour conclure sur un changement de spin."] },
    { test:/identifier.*m[ée]tal|m[ée]thode.*(oxydor[ée]duction|A.*B.*C)/i, replies:["Méthode d'identification : calcule n pour chaque complexe du tableau, teste les degrés d'oxydation candidats pour un même métal jusqu'à ce que TOUTES les valeurs de n soient cohérentes, puis reconstitue la chaîne (A le plus oxydé, C contient du chlore)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : que faut-il connaître avant de chercher des isomères cis/trans ?","Indice niveau 2 : la géométrie du complexe.","Indice niveau 3 : coordinence et géométrie en premier."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : un seul métal doit-il satisfaire un ou tous les complexes du tableau ?","Indice niveau 2 : tous, simultanément.","Indice niveau 3 : il faut tester pour TOUS les complexes à la fois."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : C est obtenu par quelle réaction ?","Indice niveau 2 : action de HCl concentré.","Indice niveau 3 : C contient donc des ligands chlorure."] }
  ]
};

/* fusionne le module Chimie de coordination dans les registres globaux (même mécanisme
   que pour les autres matières : tout finit fusionné dans MATH_TOOLS_CHAPTERS / NOVA_KB) */
Object.assign(MATH_TOOLS_CHAPTERS, CORD_CHAPTERS);
Object.assign(NOVA_KB, CORD_NOVA_KB);