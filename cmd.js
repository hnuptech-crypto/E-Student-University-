/* =====================================================================
   CHUNK « cmd » — registre CMD_CHAPTERS / CMD_NOVA_KB
   Matière(s) : Chimie|Chimie analytique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   CMD_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — CHIMIE ANALYTIQUE (L3 Chimie Fondamentale)
   6 chapitres : validation d'une méthode analytique, dosages acido-basiques et courbes
   de titrage, dosages redox et complexométriques, méthodes spectrophotométriques
   quantitatives, électrodes spécifiques et potentiométrie, incertitudes et traitement
   statistique des données. S'appuie sur l'équation de Nernst déjà rédigée en électrochimie.
   ===================================================================================== */
const CMD_MATIERE = 'Chimie analytique';
function cmdKey(chapterTitle){ return `Chimie|${CMD_MATIERE}|${chapterTitle}`; }
const CMD_CHAPTERS = {};
const CMD_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
CMD_CHAPTERS[cmdKey("Validation d'une méthode analytique")] = {
  objectives: [
    "Définir les critères de validation d'une méthode analytique (justesse, fidélité, sensibilité)",
    "Distinguer erreur systématique et erreur aléatoire",
    "Établir une droite d'étalonnage et évaluer sa qualité",
    "Définir limite de détection et limite de quantification"
  ],
  prereqs: ["Chimie des solutions (L2)", "Probabilité et statistique (L2)"],
  bodyHtml: `
    <p>La <strong>chimie analytique</strong> répond à une question centrale : combien y a-t-il d'une espèce donnée dans un échantillon ? Avant d'appliquer n'importe quelle méthode de dosage, il faut savoir <strong>évaluer sa fiabilité</strong> — c'est l'objet de ce premier chapitre, qui pose le vocabulaire métrologique utilisé dans tout le reste du cours.</p>

    <h3>1. Justesse et fidélité</h3>
    <table class="mini-table">
      <tr><th>Critère</th><th>Définition</th><th>Type d'erreur associé</th></tr>
      <tr><td>Justesse</td><td>proximité entre la valeur moyenne mesurée et la valeur vraie</td><td>erreur systématique</td></tr>
      <tr><td>Fidélité</td><td>dispersion des résultats entre eux, indépendamment de la valeur vraie</td><td>erreur aléatoire</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — justesse ≠ fidélité</span>
      Une méthode peut être <strong>fidèle</strong> (résultats très reproductibles entre eux) sans être <strong>juste</strong> (tous décalés systématiquement de la valeur vraie, par exemple à cause d'un étalon mal calibré). Inversement, une méthode peu fidèle mais juste en moyenne peut donner, par hasard, un résultat individuel proche de la vérité. L'<strong>exactitude</strong> exige les deux à la fois.
    </div>

    <h3>2. Droite d'étalonnage</h3>
    <p>Pour une méthode quantitative, on établit une <strong>droite d'étalonnage</strong> $y=a\\,c+b$ à partir de solutions étalons de concentration $c$ connue, par régression linéaire (méthode des moindres carrés). La qualité de l'ajustement se juge notamment par le coefficient de corrélation $R^2$ (proche de 1 pour un bon ajustement), et surtout par l'examen visuel des résidus (écarts entre points expérimentaux et droite ajustée), qui révèle d'éventuels écarts systématiques à la linéarité qu'un $R^2$ élevé peut masquer.</p>

    <h3>3. Limite de détection et de quantification</h3>
    <p>La <strong>limite de détection</strong> (LOD) est la plus petite concentration détectable avec une confiance raisonnable (distincte du bruit de fond) ; la <strong>limite de quantification</strong> (LOQ), plus élevée, est la plus petite concentration mesurable avec une précision acceptable. On les estime couramment à partir de l'écart-type $\\sigma$ du signal du blanc :</p>
    <div class="formula-box">$$\\text{LOD} \\approx \\frac{3\\sigma_{blanc}}{a}, \\qquad \\text{LOQ} \\approx \\frac{10\\sigma_{blanc}}{a}$$</div>
    <p>où $a$ est la pente de la droite d'étalonnage (la sensibilité de la méthode).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une méthode a une droite d'étalonnage de pente $a=2{,}5\\,\\text{u.a./}\\mu\\text{mol/L}$, avec un écart-type du blanc $\\sigma=0{,}15\\,\\text{u.a.}$. Calculer la LOD.</p>
      <p><strong>Solution :</strong> $\\text{LOD} = \\dfrac{3\\times0{,}15}{2{,}5} = \\dfrac{0{,}45}{2{,}5}$.</p>
      <p class="example-answer">$\\text{LOD} \\approx 0{,}18\\,\\mu\\text{mol/L}$ — en-dessous de cette concentration, le signal n'est plus fiablement distinguable du bruit de fond.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Justesse (erreur systématique) et fidélité (erreur aléatoire) sont deux critères indépendants ; l'exactitude exige les deux</li>
      <li>La droite d'étalonnage se valide par régression, $R^2$ et examen des résidus</li>
      <li>LOD $\\approx3\\sigma_{blanc}/a$, LOQ $\\approx10\\sigma_{blanc}/a$</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre justesse et fidélité : une méthode fidèle n'est pas forcément juste</li>
      <li>Se fier uniquement à $R^2$ sans examiner les résidus, qui peuvent révéler une non-linéarité masquée</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Une méthode dont les résultats sont très reproductibles mais systématiquement décalés de la valeur vraie est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd1e1" value="wrong">juste mais pas fidèle</label>
          <label class="option"><input type="radio" name="cmd1e1" value="right">fidèle mais pas juste</label>
          <label class="option"><input type="radio" name="cmd1e1" value="wrong">exacte</label>
          <label class="option"><input type="radio" name="cmd1e1" value="wrong">ni fidèle ni juste</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd1e1','cmd1fb1','Correct — reproductible = fidèle ; décalé systématiquement = pas juste.','Relis le point clé du cours sur justesse et fidélité.')">Vérifier</button>
        <div class="feedback" id="cmd1fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">La limite de quantification (LOQ) est approximativement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd1e2" value="wrong">$3\\sigma_{blanc}/a$</label>
          <label class="option"><input type="radio" name="cmd1e2" value="right">$10\\sigma_{blanc}/a$</label>
          <label class="option"><input type="radio" name="cmd1e2" value="wrong">$\\sigma_{blanc}/a$</label>
          <label class="option"><input type="radio" name="cmd1e2" value="wrong">$a/\\sigma_{blanc}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd1e2','cmd1fb2','Correct — LOQ≈10σ/a, un facteur plus élevé que la LOD (3σ/a) car elle exige une précision acceptable, pas juste une détection.','Relis les formules encadrées du cours.')">Vérifier</button>
        <div class="feedback" id="cmd1fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $a=2{,}5$ et $\\sigma_{blanc}=0{,}15$, la LOD est environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd1e3" value="right">0,18 µmol/L</label>
          <label class="option"><input type="radio" name="cmd1e3" value="wrong">1,80 µmol/L</label>
          <label class="option"><input type="radio" name="cmd1e3" value="wrong">0,06 µmol/L</label>
          <label class="option"><input type="radio" name="cmd1e3" value="wrong">3,75 µmol/L</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd1e3','cmd1fb3','Correct — exactement le résultat de l\\'exemple corrigé.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="cmd1fb3"></div>
      </div>
    </div>
  `
};
CMD_NOVA_KB[cmdKey("Validation d'une méthode analytique")] = {
  intro: "Salut, moi c'est Nova ! On démarre la chimie analytique avec la validation de méthode : justesse, fidélité, LOD/LOQ. Demande-moi une explication ou un indice.",
  rules: [
    { test:/justesse|fid[ée]lit[ée]/i, replies:["Justesse = proximité à la valeur vraie (erreur systématique). Fidélité = reproductibilité entre mesures (erreur aléatoire). Les deux sont indépendantes !"]},
    { test:/lod|loq|limite de d[ée]tection|limite de quantification/i, replies:["LOD≈3σblanc/a (détection) et LOQ≈10σblanc/a (quantification précise), avec a la pente de la droite d'étalonnage."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le point clé sur justesse/fidélité.","Reproductible = quel critère ?","Fidèle mais pas juste."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis les formules encadrées.","LOQ a un facteur plus grand que LOD.","10σ/a."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends le calcul de l'exemple corrigé.","3×0,15/2,5.","≈0,18 µmol/L."]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
CMD_CHAPTERS[cmdKey("Dosages acido-basiques et courbes de titrage")] = {
  objectives: [
    "Tracer et interpréter une courbe de titrage acide fort-base forte",
    "Identifier le point d'équivalence et le distinguer du point de demi-équivalence",
    "Choisir un indicateur coloré adapté à un titrage donné",
    "Analyser une courbe de titrage acide faible-base forte et sa zone tampon"
  ],
  prereqs: ["Validation d'une méthode analytique", "Chimie des solutions (L2)"],
  bodyHtml: `
    <p>Le <strong>titrage acido-basique</strong> est la méthode analytique la plus classique : on ajoute progressivement une solution titrante de concentration connue à une solution à doser, en suivant l'évolution du pH pour déterminer la concentration inconnue avec précision.</p>

    <h3>1. Courbe de titrage acide fort / base forte</h3>
    <p>Pour le titrage d'un acide fort par une base forte, le pH suit une courbe caractéristique en « S » : variation lente loin de l'équivalence, puis <strong>saut de pH</strong> brutal au voisinage du point d'équivalence, qui pour ce cas particulier se situe à $\\text{pH}=7$.</p>

    <h3>2. Point d'équivalence</h3>
    <div class="key-point">
      <span class="eyebrow">Point d'équivalence</span>
      Le point d'équivalence est atteint quand les quantités de matière introduites correspondent exactement à la stœchiométrie de la réaction de titrage : $n_{\\text{acide}}=n_{\\text{base}}$ pour un titrage 1:1. C'est le point où la pente $dpH/dV$ est maximale (le saut le plus abrupt) — repéré expérimentalement par la méthode des tangentes ou par le maximum de la dérivée $dpH/dV$.
    </div>
    <p>Le <strong>point de demi-équivalence</strong> (à la moitié du volume équivalent) est une notion distincte, utile pour le titrage d'un acide <strong>faible</strong> (chapitre suivant) : à ce point précis, $\\text{pH}=\\text{p}K_a$ — une méthode pratique pour déterminer un $\\text{p}K_a$ inconnu directement sur la courbe de titrage.</p>

    <h3>3. Choix de l'indicateur coloré</h3>
    <p>Un <strong>indicateur coloré</strong> change de teinte sur une zone de pH étroite (typiquement $\\text{p}K_{Ind}\\pm1$). Pour repérer l'équivalence par simple virage de couleur (sans pH-mètre), il faut choisir un indicateur dont la <strong>zone de virage</strong> se situe dans le <strong>saut de pH</strong> de la courbe de titrage — pas nécessairement exactement au pH d'équivalence, tant que le saut est suffisamment abrupt pour que l'erreur reste négligeable.</p>

    <h3>4. Acide faible / base forte : la zone tampon</h3>
    <p>Pour le titrage d'un acide faible $\\text{AH}$ par une base forte, la courbe présente, avant le saut d'équivalence, une <strong>zone tampon</strong> — un plateau où le pH varie peu malgré l'ajout de base, autour du $\\text{p}K_a$ du couple $\\text{AH}/\\text{A}^-$. Le point d'équivalence, ici, n'est <strong>plus</strong> à $\\text{pH}=7$ : la solution à l'équivalence contient la base conjuguée $\\text{A}^-$, qui hydrolyse l'eau et rend le milieu <strong>basique</strong> ($\\text{pH}>7$).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> lors du titrage d'un acide faible par NaOH, le pH à la demi-équivalence vaut $4{,}75$. En déduire le $\\text{p}K_a$ du couple.</p>
      <p><strong>Solution :</strong> à la demi-équivalence, $[\\text{AH}]=[\\text{A}^-]$, donc d'après l'équation de Henderson-Hasselbalch, $\\text{pH}=\\text{p}K_a+\\log\\dfrac{[\\text{A}^-]}{[\\text{AH}]}=\\text{p}K_a+\\log(1)=\\text{p}K_a$.</p>
      <p class="example-answer">$\\text{p}K_a=4{,}75$ — c'est exactement le $\\text{p}K_a$ de l'acide acétique, une méthode expérimentale directe et très utilisée pour déterminer un $\\text{p}K_a$ inconnu.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Point d'équivalence : stœchiométrie respectée, pente $dpH/dV$ maximale</li>
      <li>Point de demi-équivalence : $\\text{pH}=\\text{p}K_a$ pour un titrage acide faible/base forte</li>
      <li>Indicateur coloré : choisir une zone de virage incluse dans le saut de pH</li>
      <li>Zone tampon pour un acide faible : plateau de pH autour du $\\text{p}K_a$, avant le saut d'équivalence</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que le point d'équivalence est toujours à $\\text{pH}=7$ : ce n'est vrai que pour acide fort/base forte</li>
      <li>Confondre point d'équivalence et point de demi-équivalence, deux notions bien distinctes</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Au point d'équivalence, la pente $dpH/dV$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd2e1" value="wrong">minimale</label>
          <label class="option"><input type="radio" name="cmd2e1" value="right">maximale</label>
          <label class="option"><input type="radio" name="cmd2e1" value="wrong">nulle</label>
          <label class="option"><input type="radio" name="cmd2e1" value="wrong">négative</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd2e1','cmd2fb1','Correct — c\\'est le saut brutal du pH, repéré par le maximum de la dérivée.','Relis l\\'encadré sur le point d\\'équivalence.')">Vérifier</button>
        <div class="feedback" id="cmd2fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Le point d'équivalence d'un titrage acide faible/base forte se situe à un pH :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd2e2" value="wrong">toujours égal à 7</label>
          <label class="option"><input type="radio" name="cmd2e2" value="right">basique (>7)</label>
          <label class="option"><input type="radio" name="cmd2e2" value="wrong">acide (<7)</label>
          <label class="option"><input type="radio" name="cmd2e2" value="wrong">indéfini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd2e2','cmd2fb2','Correct — la base conjuguée A− présente à l\\'équivalence hydrolyse l\\'eau, rendant le milieu basique.','Relis la section du cours sur le titrage acide faible/base forte.')">Vérifier</button>
        <div class="feedback" id="cmd2fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Au point de demi-équivalence d'un titrage acide faible, on a :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd2e3" value="right">$\\text{pH}=\\text{p}K_a$</label>
          <label class="option"><input type="radio" name="cmd2e3" value="wrong">$\\text{pH}=7$</label>
          <label class="option"><input type="radio" name="cmd2e3" value="wrong">$\\text{pH}=0$</label>
          <label class="option"><input type="radio" name="cmd2e3" value="wrong">$\\text{pH}=14$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd2e3','cmd2fb3','Correct — exactement le résultat utilisé dans l\\'exemple corrigé pour déterminer un pKa.','Reprends le raisonnement de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="cmd2fb3"></div>
      </div>
    </div>
  `
};
CMD_NOVA_KB[cmdKey("Dosages acido-basiques et courbes de titrage")] = {
  intro: "Salut, c'est Nova ! On étudie les courbes de titrage acido-basique. Demande-moi une explication ou un indice.",
  rules: [
    { test:/[ée]quivalence/i, replies:["Le point d'équivalence correspond à la stœchiométrie exacte, avec dpH/dV maximal. Le point de demi-équivalence (pH=pKa) est une notion différente."]},
    { test:/indicateur color[ée]/i, replies:["Un indicateur coloré doit avoir sa zone de virage incluse dans le saut de pH de la courbe de titrage pour repérer l'équivalence sans pH-mètre."]},
    { test:/zone tampon/i, replies:["La zone tampon, pour un acide faible, est un plateau de pH autour du pKa, avant le saut d'équivalence — le pH y varie peu malgré l'ajout de base."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis l'encadré du point d'équivalence.","C'est un extremum de la dérivée.","Maximale."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la section sur acide faible/base forte.","Pense à la base conjuguée présente à l'équivalence.","Basique (>7)."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","C'est Henderson-Hasselbalch.","pH=pKa."]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
CMD_CHAPTERS[cmdKey("Dosages redox et complexométriques")] = {
  objectives: [
    "Tracer une courbe de titrage redox potentiométrique",
    "Établir le potentiel au point d'équivalence d'un titrage redox",
    "Présenter le principe des dosages complexométriques par l'EDTA",
    "Utiliser un indicateur métallochrome pour repérer l'équivalence complexométrique"
  ],
  prereqs: ["Dosages acido-basiques et courbes de titrage", "Équation de Nernst et diagrammes potentiel-pH (Électrochimie)"],
  bodyHtml: `
    <p>Ce chapitre étend les principes du titrage acido-basique (chapitre 2) à deux autres grandes familles de dosages : les titrages <strong>d'oxydoréduction</strong>, suivis par potentiométrie, et les titrages <strong>complexométriques</strong>, utilisés pour doser des cations métalliques.</p>

    <h3>1. Titrage redox potentiométrique</h3>
    <p>On suit le potentiel $E$ d'une électrode indicatrice (souvent en platine, inerte) plongée dans la solution, au fur et à mesure de l'ajout du réactif titrant. Comme pour le pH, la courbe $E=f(V)$ présente un <strong>saut de potentiel</strong> au point d'équivalence, exploitable pour déterminer précisément le volume équivalent.</p>

    <h3>2. Potentiel au point d'équivalence</h3>
    <p>Pour un titrage redox faisant intervenir deux couples $n_1$ et $n_2$ électrons échangés, on montre (en égalant les deux expressions de Nernst à l'équivalence, où les deux couples sont à l'équilibre l'un avec l'autre) que le potentiel à l'équivalence est une <strong>moyenne pondérée</strong> :</p>
    <div class="formula-box">$$E_{eq} = \\frac{n_1E_1^\\circ + n_2E_2^\\circ}{n_1+n_2}$$</div>
    <p>(cette formule simplifiée suppose des couples sans intervention de protons ; le cas général nécessite un traitement plus complet, hors du cadre de ce chapitre).</p>

    <h3>3. Dosages complexométriques : l'EDTA</h3>
    <p>Pour doser un cation métallique $\\text{M}^{n+}$, on utilise fréquemment un <strong>agent complexant</strong> comme l'<strong>EDTA</strong> (acide éthylènediaminetétraacétique), un ligand hexadentate qui forme des complexes très stables de stœchiométrie 1:1 avec la quasi-totalité des cations métalliques :</p>
    <div class="formula-box">$$\\text{M}^{n+} + \\text{Y}^{4-} \\rightleftharpoons \\text{MY}^{n-4}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi l'EDTA est si utilisé</span>
      La stœchiométrie 1:1 systématique (quel que soit $n$) simplifie énormément les calculs de dosage : une mole d'EDTA titre toujours exactement une mole de cation métallique, indépendamment de sa charge. C'est ce qui a rendu l'EDTA omniprésent en chimie analytique (dosage de la dureté de l'eau — $\\text{Ca}^{2+}+\\text{Mg}^{2+}$ —, dosage de nombreux métaux de transition).
    </div>

    <h3>4. Indicateurs métallochromes</h3>
    <p>Comme pour les titrages acido-basiques, on repère l'équivalence à l'aide d'un <strong>indicateur métallochrome</strong> (comme le Noir Ériochrome T) : une molécule qui forme elle-même un complexe coloré avec le cation métallique, de couleur différente de sa forme libre. Avant l'équivalence, l'indicateur est complexé au métal (une couleur) ; l'EDTA, complexant plus fort, déloge progressivement l'indicateur de son complexe métallique au voisinage de l'équivalence, provoquant un <strong>virage net de couleur</strong>.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi la stœchiométrie 1:1 de l'EDTA simplifie-t-elle le dosage d'un mélange $\\text{Ca}^{2+}+\\text{Mg}^{2+}$ (dureté totale de l'eau) ?</p>
      <p><strong>Solution :</strong> qu'il s'agisse de $\\text{Ca}^{2+}$ ou de $\\text{Mg}^{2+}$ (tous deux de charge $+2$, mais l'argument vaudrait même pour des charges différentes), chaque mole de cation consomme exactement une mole d'EDTA.</p>
      <p class="example-answer">Le volume équivalent donne directement la <em>quantité totale</em> de cations divalents (dureté totale), sans avoir à distinguer les deux espèces — un dosage global, rapide et robuste, très utilisé en analyse de l'eau.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Titrage redox : saut de potentiel au point d'équivalence, suivi par électrode indicatrice inerte</li>
      <li>$E_{eq}=(n_1E_1^\\circ+n_2E_2^\\circ)/(n_1+n_2)$, moyenne pondérée par le nombre d'électrons échangés</li>
      <li>EDTA : complexe 1:1 avec tout cation métallique, ce qui simplifie considérablement les calculs de dosage</li>
      <li>Indicateur métallochrome : virage de couleur quand l'EDTA déloge le cation de son complexe avec l'indicateur</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Oublier de pondérer par $n_1,n_2$ dans le calcul du potentiel d'équivalence</li>
      <li>Croire que l'EDTA forme des complexes de stœchiométrie variable selon la charge du cation : c'est toujours 1:1</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La stœchiométrie du complexe formé par l'EDTA avec un cation métallique est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd3e1" value="right">toujours 1:1</label>
          <label class="option"><input type="radio" name="cmd3e1" value="wrong">variable selon la charge du cation</label>
          <label class="option"><input type="radio" name="cmd3e1" value="wrong">toujours 2:1</label>
          <label class="option"><input type="radio" name="cmd3e1" value="wrong">aléatoire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd3e1','cmd3fb1','Correct — c\\'est exactement ce qui rend l\\'EDTA si pratique en chimie analytique.','Relis le point clé du cours sur l\\'EDTA.')">Vérifier</button>
        <div class="feedback" id="cmd3fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Un indicateur métallochrome change de couleur car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd3e2" value="right">l'EDTA le déloge progressivement de son complexe avec le métal</label>
          <label class="option"><input type="radio" name="cmd3e2" value="wrong">le pH change brutalement</label>
          <label class="option"><input type="radio" name="cmd3e2" value="wrong">le métal précipite</label>
          <label class="option"><input type="radio" name="cmd3e2" value="wrong">il se décompose chimiquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd3e2','cmd3fb2','Correct — c\\'est le mécanisme du virage décrit dans le cours.','Relis la section sur les indicateurs métallochromes.')">Vérifier</button>
        <div class="feedback" id="cmd3fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Le titrage EDTA d'un mélange Ca²⁺+Mg²⁺ donne directement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd3e3" value="right">la quantité totale de cations divalents</label>
          <label class="option"><input type="radio" name="cmd3e3" value="wrong">uniquement la quantité de Ca²⁺</label>
          <label class="option"><input type="radio" name="cmd3e3" value="wrong">uniquement la quantité de Mg²⁺</label>
          <label class="option"><input type="radio" name="cmd3e3" value="wrong">rien d'exploitable</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd3e3','cmd3fb3','Correct — exactement l\\'explication de l\\'exemple corrigé sur la dureté totale de l\\'eau.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="cmd3fb3"></div>
      </div>
    </div>
  `
};
CMD_NOVA_KB[cmdKey("Dosages redox et complexométriques")] = {
  intro: "Salut, moi c'est Nova ! On étudie les dosages redox et complexométriques (EDTA). Demande-moi une explication ou un indice.",
  rules: [
    { test:/edta/i, replies:["L'EDTA forme des complexes 1:1 avec tout cation métallique, ce qui simplifie énormément les calculs de dosage — très utilisé pour la dureté de l'eau."]},
    { test:/potentiel.*[ée]quivalence|Eeq/i, replies:["Eeq=(n1E1°+n2E2°)/(n1+n2), une moyenne pondérée par le nombre d'électrons échangés de chaque couple."]},
    { test:/m[ée]tallochrome/i, replies:["Un indicateur métallochrome forme un complexe coloré avec le métal ; l'EDTA le déloge au voisinage de l'équivalence, provoquant un virage net."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le point clé sur l'EDTA.","C'est indépendant de la charge du métal.","Toujours 1:1."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le mécanisme du virage.","Pense à la compétition EDTA/indicateur.","L'EDTA déloge l'indicateur du complexe."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense à la stœchiométrie 1:1.","La quantité totale de cations divalents."]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
CMD_CHAPTERS[cmdKey("Méthodes spectrophotométriques quantitatives")] = {
  objectives: [
    "Établir la loi de Beer-Lambert et ses conditions de validité",
    "Déterminer une concentration inconnue par spectrophotométrie d'absorption",
    "Identifier les causes d'écart à la loi de Beer-Lambert",
    "Appliquer la méthode des ajouts dosés en présence d'effet de matrice"
  ],
  prereqs: ["Dosages redox et complexométriques", "Spectroscopie"],
  bodyHtml: `
    <p>La <strong>spectrophotométrie d'absorption</strong> — mesurer combien de lumière une solution absorbe à une longueur d'onde donnée — est l'une des méthodes analytiques les plus utilisées, grâce à sa rapidité, sa sensibilité et son faible coût. Ce chapitre en établit le fondement quantitatif : la loi de Beer-Lambert.</p>

    <h3>1. La loi de Beer-Lambert</h3>
    <p>Pour une solution homogène traversée par un faisceau lumineux monochromatique d'intensité incidente $I_0$, l'intensité transmise $I$ décroît selon :</p>
    <div class="formula-box">$$A = \\log_{10}\\!\\left(\\frac{I_0}{I}\\right) = \\varepsilon\\,\\ell\\,c$$</div>
    <p>où $A$ est l'<strong>absorbance</strong> (sans dimension), $\\varepsilon$ le <strong>coefficient d'absorption molaire</strong> (caractéristique de l'espèce et de la longueur d'onde, en $\\text{L}\\cdot\\text{mol}^{-1}\\cdot\\text{cm}^{-1}$), $\\ell$ la longueur du trajet optique (généralement $1\\,\\text{cm}$, la largeur d'une cuve standard) et $c$ la concentration molaire.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La loi de Beer-Lambert prédit une relation <strong>linéaire</strong> entre $A$ et $c$ — c'est cette linéarité qui permet un dosage direct par simple mesure d'absorbance, comparée à une droite d'étalonnage (chapitre 1).
    </div>

    <h3>2. Dosage direct par spectrophotométrie</h3>
    <p>En mesurant l'absorbance de plusieurs solutions étalons de concentration connue, on établit la droite $A=f(c)$ (pente $\\varepsilon\\ell$) ; l'absorbance de l'échantillon inconnu, reportée sur cette droite, donne directement sa concentration — une application immédiate du chapitre 1.</p>

    <h3>3. Écarts à la loi de Beer-Lambert</h3>
    <p>La loi de Beer-Lambert n'est rigoureusement valable qu'à <strong>faible concentration</strong> (typiquement $A<1$–$1{,}5$). Aux concentrations élevées, des écarts apparaissent, dus à des interactions entre molécules absorbantes voisines, des changements d'indice de réfraction du milieu, ou des équilibres chimiques dépendant de la concentration (dimérisation, dissociation) qui modifient l'espèce réellement absorbante.</p>

    <h3>4. Méthode des ajouts dosés</h3>
    <p>Quand la matrice de l'échantillon (les autres espèces présentes) modifie le signal analytique de façon complexe (effet de matrice), une simple droite d'étalonnage externe peut donner un résultat biaisé. La <strong>méthode des ajouts dosés</strong> contourne ce problème : on ajoute des quantités croissantes et connues de l'espèce à doser <strong>directement dans l'échantillon lui-même</strong>, puis on extrapole la droite $A=f(c_{ajoutée})$ jusqu'à $A=0$ — l'abscisse à l'origine (négative) donne directement la concentration initiale inconnue, dans la matrice réelle de l'échantillon.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une solution a une absorbance $A=0{,}42$ dans une cuve de $\\ell=1\\,\\text{cm}$, avec $\\varepsilon=1{,}5\\times10^4\\,\\text{L}\\cdot\\text{mol}^{-1}\\cdot\\text{cm}^{-1}$. Calculer $c$.</p>
      <p><strong>Solution :</strong> $c = \\dfrac{A}{\\varepsilon\\ell} = \\dfrac{0{,}42}{1{,}5\\times10^4\\times1}$.</p>
      <p class="example-answer">$c \\approx 2{,}8\\times10^{-5}\\,\\text{mol/L}$ — un calcul type de dosage spectrophotométrique direct, applicable dès que la loi de Beer-Lambert est vérifiée.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Loi de Beer-Lambert : $A=\\varepsilon\\ell c$, relation linéaire entre absorbance et concentration</li>
      <li>Valable rigoureusement à faible concentration ($A<1$–1,5) ; des écarts apparaissent au-delà</li>
      <li>Méthode des ajouts dosés : contourne les effets de matrice en travaillant directement dans l'échantillon</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Appliquer Beer-Lambert à des concentrations trop élevées, hors du domaine de linéarité</li>
      <li>Utiliser un étalonnage externe classique en présence d'un fort effet de matrice : privilégier les ajouts dosés</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La loi de Beer-Lambert s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd4e1" value="wrong">$A=c/\\varepsilon\\ell$</label>
          <label class="option"><input type="radio" name="cmd4e1" value="right">$A=\\varepsilon\\ell c$</label>
          <label class="option"><input type="radio" name="cmd4e1" value="wrong">$A=\\varepsilon+\\ell+c$</label>
          <label class="option"><input type="radio" name="cmd4e1" value="wrong">$A=\\ell/c$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd4e1','cmd4fb1','Correct — A=εℓc, la relation fondamentale de la spectrophotométrie quantitative.','Relis la formule encadrée du cours.')">Vérifier</button>
        <div class="feedback" id="cmd4fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">La méthode des ajouts dosés est utile quand :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd4e2" value="right">la matrice de l'échantillon perturbe le signal analytique</label>
          <label class="option"><input type="radio" name="cmd4e2" value="wrong">l'échantillon est pur, sans autre espèce</label>
          <label class="option"><input type="radio" name="cmd4e2" value="wrong">on n'a pas de spectrophotomètre</label>
          <label class="option"><input type="radio" name="cmd4e2" value="wrong">la concentration est déjà connue</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd4e2','cmd4fb2','Correct — c\\'est le cas typique d\\'un effet de matrice, contourné par cette méthode.','Relis la section du cours sur les ajouts dosés.')">Vérifier</button>
        <div class="feedback" id="cmd4fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $A=0{,}42$, $\\varepsilon=1{,}5\\times10^4$, $\\ell=1\\,\\text{cm}$, la concentration $c$ est environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd4e3" value="right">$2{,}8\\times10^{-5}\\,\\text{mol/L}$</label>
          <label class="option"><input type="radio" name="cmd4e3" value="wrong">$6{,}3\\times10^{3}\\,\\text{mol/L}$</label>
          <label class="option"><input type="radio" name="cmd4e3" value="wrong">$0{,}42\\,\\text{mol/L}$</label>
          <label class="option"><input type="radio" name="cmd4e3" value="wrong">$1{,}5\\times10^{4}\\,\\text{mol/L}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd4e3','cmd4fb3','Correct — exactement le résultat de l\\'exemple corrigé.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="cmd4fb3"></div>
      </div>
    </div>
  `
};
CMD_NOVA_KB[cmdKey("Méthodes spectrophotométriques quantitatives")] = {
  intro: "Salut, c'est Nova ! On étudie la spectrophotométrie quantitative et la loi de Beer-Lambert. Demande-moi une explication ou un indice.",
  rules: [
    { test:/beer.?lambert/i, replies:["La loi de Beer-Lambert A=εℓc relie linéairement l'absorbance à la concentration — valable seulement à faible concentration (A<1-1,5)."]},
    { test:/ajouts dos[ée]s/i, replies:["La méthode des ajouts dosés contourne les effets de matrice en ajoutant des quantités connues directement dans l'échantillon, puis en extrapolant jusqu'à A=0."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la formule encadrée.","C'est un produit de trois termes.","A=εℓc."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la section sur les ajouts dosés.","Pense à un échantillon complexe.","Quand la matrice perturbe le signal."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends le calcul de l'exemple corrigé.","c=A/(εℓ).","≈2,8×10⁻⁵ mol/L."]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
CMD_CHAPTERS[cmdKey("Électrodes spécifiques et potentiométrie")] = {
  objectives: [
    "Comprendre le principe de fonctionnement d'une électrode sélective d'ions",
    "Décrire le fonctionnement de l'électrode de verre pour la mesure du pH",
    "Établir la relation entre potentiel mesuré et activité de l'ion cible",
    "Identifier les interférences et limites de sélectivité"
  ],
  prereqs: ["Méthodes spectrophotométriques quantitatives", "Équation de Nernst et diagrammes potentiel-pH (Électrochimie)"],
  bodyHtml: `
    <p>Ce chapitre présente une méthode analytique directe, sans réactif titrant : la <strong>potentiométrie</strong> à l'aide d'<strong>électrodes sélectives d'ions</strong> (ESI), qui mesurent directement l'activité d'un ion particulier dans une solution — le pH-mètre en étant l'exemple le plus familier.</p>

    <h3>1. Principe d'une électrode sélective d'ions</h3>
    <p>Une électrode sélective possède une <strong>membrane</strong> (verre, cristal, polymère avec ionophore) qui développe, à son interface avec la solution, un potentiel dépendant <strong>sélectivement</strong> de l'activité d'un ion cible — sans réaction d'oxydoréduction proprement dite, contrairement aux électrodes redox du chapitre 3.</p>

    <h3>2. L'électrode de verre : mesure du pH</h3>
    <p>L'électrode de verre, utilisée dans tout pH-mètre, possède une fine membrane de verre spécial sensible aux ions $\\text{H}^+$. Le potentiel développé suit une relation de type Nernst :</p>
    <div class="formula-box">$$E = E_0 - 0{,}06\\,\\text{pH} \\qquad \\text{(à 298 K)}$$</div>
    <p>C'est formellement identique à l'équation de Nernst du chapitre 2 d'électrochimie, bien qu'aucune réaction redox n'ait lieu à proprement parler : le potentiel de membrane suit la même forme mathématique générale que le potentiel d'un couple redox.</p>

    <h3>3. Relation générale et étalonnage</h3>
    <p>Plus généralement, pour une électrode sélective à un ion $\\text{X}^{z\\pm}$, le potentiel mesuré suit :</p>
    <div class="formula-box">$$E = E_0 \\pm \\frac{0{,}06}{z}\\,\\log_{10}(a_X)$$</div>
    <p>(signe $+$ pour un cation, $-$ pour un anion). Comme $E_0$ dépend de l'électrode et dérive légèrement dans le temps, on <strong>étalonne</strong> systématiquement l'électrode avec des solutions de référence (tampons de pH connu, ou solutions étalons de l'ion cible) avant chaque série de mesures.</p>

    <h3>4. Interférences et sélectivité</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Aucune électrode n'est parfaitement sélective : d'autres ions présents en solution (interférents) peuvent contribuer, dans une moindre mesure, au potentiel mesuré. Le <strong>coefficient de sélectivité</strong> quantifie cette interférence relative — un paramètre essentiel à vérifier avant d'utiliser une électrode sélective sur un échantillon complexe (matrice biologique, eau naturelle) contenant potentiellement des ions interférents.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi une électrode de verre neuve ou ancienne doit-elle être <strong>étalonnée</strong> avant chaque mesure de pH, même si sa membrane fonctionne parfaitement ?</p>
      <p><strong>Solution :</strong> le potentiel de référence $E_0$ dans $E=E_0-0{,}06\\,\\text{pH}$ n'est pas une constante universelle : il dépend des caractéristiques précises de la membrane, qui dérivent légèrement dans le temps (vieillissement, encrassement).</p>
      <p class="example-answer">Sans étalonnage régulier (typiquement avec deux tampons de pH connus, encadrant la gamme attendue), la mesure de pH accumule une erreur systématique — l'étalonnage recalibre $E_0$ à chaque utilisation.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Une électrode sélective mesure l'activité d'un ion cible via un potentiel de membrane, sans réaction redox</li>
      <li>Électrode de verre (pH-mètre) : $E=E_0-0{,}06\\,\\text{pH}$, formellement analogue à Nernst</li>
      <li>Étalonnage indispensable avant chaque série de mesures ($E_0$ dérive dans le temps)</li>
      <li>Aucune électrode n'est parfaitement sélective : attention aux interférences</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Utiliser une électrode sans étalonnage préalable, en supposant $E_0$ constant dans le temps</li>
      <li>Ignorer les interférences possibles sur un échantillon complexe (matrice biologique, eau naturelle)</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le potentiel d'une électrode de verre suit une relation formellement analogue à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd5e1" value="right">l'équation de Nernst</label>
          <label class="option"><input type="radio" name="cmd5e1" value="wrong">la loi de Beer-Lambert</label>
          <label class="option"><input type="radio" name="cmd5e1" value="wrong">la loi de Hess</label>
          <label class="option"><input type="radio" name="cmd5e1" value="wrong">la loi des gaz parfaits</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd5e1','cmd5fb1','Correct — bien qu\\'aucune réaction redox n\\'ait lieu, la forme mathématique est identique à Nernst.','Relis la section sur l\\'électrode de verre.')">Vérifier</button>
        <div class="feedback" id="cmd5fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Il faut étalonner une électrode sélective avant chaque série de mesures car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd5e2" value="right">$E_0$ dérive légèrement dans le temps</label>
          <label class="option"><input type="radio" name="cmd5e2" value="wrong">l'électrode se casse sinon</label>
          <label class="option"><input type="radio" name="cmd5e2" value="wrong">le pH n'existe pas sans étalonnage</label>
          <label class="option"><input type="radio" name="cmd5e2" value="wrong">c'est purement une formalité inutile</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd5e2','cmd5fb2','Correct — exactement l\\'explication de l\\'exemple corrigé.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="cmd5fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Le coefficient de sélectivité d'une électrode quantifie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd5e3" value="right">l'interférence relative d'autres ions sur la mesure</label>
          <label class="option"><input type="radio" name="cmd5e3" value="wrong">la vitesse de mesure</label>
          <label class="option"><input type="radio" name="cmd5e3" value="wrong">le prix de l'électrode</label>
          <label class="option"><input type="radio" name="cmd5e3" value="wrong">la couleur de la solution</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd5e3','cmd5fb3','Correct — c\\'est le paramètre clé à vérifier avant d\\'utiliser une électrode sur un échantillon complexe.','Relis le point clé du cours sur la sélectivité.')">Vérifier</button>
        <div class="feedback" id="cmd5fb3"></div>
      </div>
    </div>
  `
};
CMD_NOVA_KB[cmdKey("Électrodes spécifiques et potentiométrie")] = {
  intro: "Salut, moi c'est Nova ! On étudie les électrodes sélectives et la potentiométrie. Demande-moi une explication ou un indice.",
  rules: [
    { test:/[ée]lectrode de verre|ph.?m[èe]tre/i, replies:["L'électrode de verre suit E=E0−0,06pH, formellement analogue à Nernst bien qu'aucune réaction redox n'ait lieu — la membrane développe un potentiel sélectif aux H+."]},
    { test:/[ée]talonnage|E0/i, replies:["E0 dérive dans le temps (vieillissement de la membrane), d'où la nécessité d'étalonner l'électrode avant chaque série de mesures."]},
    { test:/s[ée]lectivit[ée]|interf[ée]rence/i, replies:["Aucune électrode n'est parfaitement sélective : le coefficient de sélectivité quantifie l'interférence d'autres ions présents dans l'échantillon."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la section sur l'électrode de verre.","C'est la même forme que E=E°+...","L'équation de Nernst."]},
    { test:/exercice\s*2/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense au vieillissement de la membrane.","E0 dérive légèrement dans le temps."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis le point clé sur la sélectivité.","C'est lié aux autres ions présents.","L'interférence relative d'autres ions."]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
CMD_CHAPTERS[cmdKey("Incertitudes et traitement statistique des données analytiques")] = {
  objectives: [
    "Calculer et exprimer correctement une incertitude de mesure",
    "Propager les incertitudes à travers un calcul (somme, produit)",
    "Détecter et traiter une valeur aberrante (test de Dixon simplifié)",
    "Comparer deux résultats analytiques par un test statistique simple"
  ],
  prereqs: ["Électrodes spécifiques et potentiométrie", "Probabilité et statistique (L2)"],
  bodyHtml: `
    <p>Ce dernier chapitre revient sur un thème amorcé au chapitre 1 (justesse, fidélité) pour le formaliser complètement : comment exprimer rigoureusement l'<strong>incertitude</strong> associée à un résultat analytique, et comment décider statistiquement si deux résultats sont compatibles entre eux.</p>

    <h3>1. Moyenne, écart-type et incertitude</h3>
    <p>Pour $n$ mesures répétées $x_i$, la moyenne $\\bar x=\\frac1n\\sum x_i$ estime la valeur vraie, et l'écart-type $s=\\sqrt{\\frac{1}{n-1}\\sum(x_i-\\bar x)^2}$ quantifie la dispersion. L'<strong>incertitude-type sur la moyenne</strong> (l'erreur standard) est plus petite que $s$ lui-même :</p>
    <div class="formula-box">$$u(\\bar x) = \\frac{s}{\\sqrt n}$$</div>
    <p>Un résultat s'exprime alors $\\bar x \\pm k\\,u(\\bar x)$, où $k$ (le facteur d'élargissement, souvent $k=2$ pour un niveau de confiance $\\approx95\\%$) fixe le niveau de confiance associé.</p>

    <h3>2. Propagation des incertitudes</h3>
    <p>Quand un résultat final $f$ se calcule à partir de plusieurs grandeurs mesurées indépendantes $x,y$, l'incertitude se propage selon :</p>
    <table class="mini-table">
      <tr><th>Opération</th><th>Propagation de l'incertitude</th></tr>
      <tr><td>$f=x+y$ ou $f=x-y$</td><td>$u(f)^2 = u(x)^2+u(y)^2$ (les incertitudes absolues s'ajoutent quadratiquement)</td></tr>
      <tr><td>$f=xy$ ou $f=x/y$</td><td>$\\left(\\dfrac{u(f)}{f}\\right)^2 = \\left(\\dfrac{u(x)}{x}\\right)^2+\\left(\\dfrac{u(y)}{y}\\right)^2$ (les incertitudes relatives s'ajoutent quadratiquement)</td></tr>
    </table>

    <h3>3. Détection d'une valeur aberrante</h3>
    <p>Face à une série de mesures dont l'une semble s'écarter fortement des autres, on peut appliquer un <strong>test statistique</strong> (comme le test de Dixon ou le test de Grubbs, plus rigoureux) plutôt que d'écarter la valeur « à l'œil » — une pratique subjective à éviter absolument en analyse rigoureuse. Le principe général : comparer un écart normalisé (par exemple, écart de la valeur suspecte à sa voisine, rapporté à l'étendue totale des données) à une valeur critique tabulée, dépendant du nombre de mesures et du niveau de confiance choisi.</p>

    <h3>4. Comparaison de deux résultats : le test t de Student</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Pour décider si deux séries de mesures (deux méthodes, deux laboratoires) donnent des résultats <strong>statistiquement compatibles</strong>, on ne compare jamais deux moyennes brutes seules : il faut tenir compte de la <strong>dispersion</strong> de chaque série via un test statistique (test $t$ de Student le plus courant), qui prend en compte à la fois l'écart entre les moyennes et les incertitudes associées.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une masse est mesurée $m=(12{,}45\\pm0{,}03)\\,\\text{g}$, un volume $V=(5{,}00\\pm0{,}02)\\,\\text{mL}$. Calculer l'incertitude relative sur la masse volumique $\\rho=m/V$.</p>
      <p><strong>Solution :</strong> $\\left(\\dfrac{u(\\rho)}{\\rho}\\right)^2 = \\left(\\dfrac{0{,}03}{12{,}45}\\right)^2+\\left(\\dfrac{0{,}02}{5{,}00}\\right)^2 \\approx (0{,}00241)^2+(0{,}004)^2$.</p>
      <p class="example-answer">$\\dfrac{u(\\rho)}{\\rho} \\approx \\sqrt{5{,}8\\times10^{-6}+1{,}6\\times10^{-5}} \\approx 0{,}0047$, soit environ $0{,}5\\%$ — les incertitudes relatives s'ajoutent quadratiquement, pas simplement.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Incertitude-type sur la moyenne : $u(\\bar x)=s/\\sqrt n$, plus petite que l'écart-type des mesures individuelles</li>
      <li>Propagation : incertitudes absolues en quadrature pour une somme/différence, relatives en quadrature pour un produit/quotient</li>
      <li>Une valeur aberrante se traite par un test statistique rigoureux, jamais « à l'œil »</li>
      <li>Comparer deux résultats analytiques nécessite un test statistique (test $t$), pas une simple comparaison de moyennes</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Ajouter les incertitudes linéairement au lieu de les combiner en quadrature</li>
      <li>Écarter une mesure jugée « aberrante » sans test statistique rigoureux</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">L'incertitude-type sur la moyenne de $n$ mesures est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd6e1" value="wrong">$s\\times n$</label>
          <label class="option"><input type="radio" name="cmd6e1" value="right">$s/\\sqrt n$</label>
          <label class="option"><input type="radio" name="cmd6e1" value="wrong">$s$</label>
          <label class="option"><input type="radio" name="cmd6e1" value="wrong">$s^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd6e1','cmd6fb1','Correct — u(x̄)=s/√n, plus petite que s : plus on répète les mesures, plus la moyenne est précise.','Relis la formule encadrée du cours.')">Vérifier</button>
        <div class="feedback" id="cmd6fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Pour $f=x+y$, l'incertitude $u(f)$ se calcule par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd6e2" value="wrong">$u(f)=u(x)+u(y)$</label>
          <label class="option"><input type="radio" name="cmd6e2" value="right">$u(f)^2=u(x)^2+u(y)^2$</label>
          <label class="option"><input type="radio" name="cmd6e2" value="wrong">$u(f)=u(x)\\times u(y)$</label>
          <label class="option"><input type="radio" name="cmd6e2" value="wrong">$u(f)=0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd6e2','cmd6fb2','Correct — les incertitudes absolues s\\'ajoutent en quadrature pour une somme, pas linéairement.','Relis le tableau du cours sur la propagation.')">Vérifier</button>
        <div class="feedback" id="cmd6fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour décider si deux résultats analytiques sont statistiquement compatibles, il faut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cmd6e3" value="right">un test statistique tenant compte de la dispersion de chaque série</label>
          <label class="option"><input type="radio" name="cmd6e3" value="wrong">comparer simplement les deux moyennes brutes</label>
          <label class="option"><input type="radio" name="cmd6e3" value="wrong">ignorer les incertitudes</label>
          <label class="option"><input type="radio" name="cmd6e3" value="wrong">refaire toujours plus de mesures indéfiniment</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cmd6e3','cmd6fb3','Correct — c\\'est le point clé du cours sur la comparaison rigoureuse de deux résultats.','Relis le point clé du cours sur le test t de Student.')">Vérifier</button>
        <div class="feedback" id="cmd6fb3"></div>
      </div>
    </div>
  `
};
CMD_NOVA_KB[cmdKey("Incertitudes et traitement statistique des données analytiques")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : incertitudes, propagation et tests statistiques. Demande-moi une explication ou un indice.",
  rules: [
    { test:/incertitude.*moyenne|erreur standard/i, replies:["u(x̄)=s/√n : l'incertitude sur la moyenne diminue avec le nombre de mesures répétées, contrairement à l'écart-type s lui-même."]},
    { test:/propagation/i, replies:["Pour une somme/différence: incertitudes absolues en quadrature. Pour un produit/quotient: incertitudes relatives en quadrature — jamais une simple addition linéaire."]},
    { test:/valeur aberrante|dixon|grubbs/i, replies:["Une valeur suspecte se traite par un test statistique rigoureux (Dixon, Grubbs), jamais en l'écartant « à l'œil »."]},
    { test:/test t|student/i, replies:["Le test t de Student compare deux résultats en tenant compte de leurs dispersions respectives, pas juste de l'écart entre les moyennes brutes."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la formule encadrée.","Il y a une racine carrée de n.","s/√n."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le tableau de propagation.","C'est une quadrature, pas une somme simple.","u(f)²=u(x)²+u(y)²."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis le point clé sur le test t.","Il faut tenir compte de plus qu'une simple moyenne.","Un test statistique tenant compte de la dispersion."]}
  ]
};

/* fusionne le module Chimie analytique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, CMD_CHAPTERS);
Object.assign(NOVA_KB, CMD_NOVA_KB);