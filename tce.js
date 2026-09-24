/* =====================================================================
   CHUNK « tce » — registre TCE_CHAPTERS / TCE_NOVA_KB
   Matière(s) : Chimie|Thermodynamique chimique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   TCE_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — THERMODYNAMIQUE CHIMIQUE (L3 Chimie Fondamentale)
   6 chapitres : grandeurs de réaction, enthalpie libre de réaction et affinité chimique,
   constante d'équilibre et loi d'action de masse, déplacements d'équilibre (Le Chatelier),
   diagrammes binaires liquide-vapeur et liquide-solide, notions d'activité en solution.
   S'appuie sur la thermodynamique macroscopique (potentiels, Gibbs-Duhem) déjà présente
   côté Physique, appliquée ici spécifiquement aux réactions et mélanges chimiques.
   ===================================================================================== */
const TCE_MATIERE = 'Thermodynamique chimique';
function tceKey(chapterTitle){ return `Chimie|${TCE_MATIERE}|${chapterTitle}`; }
const TCE_CHAPTERS = {};
const TCE_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
TCE_CHAPTERS[tceKey("Grandeurs standard de réaction")] = {
  objectives: [
    "Définir l'état standard et les grandeurs standard de formation",
    "Construire une grandeur de réaction à partir des grandeurs molaires des constituants",
    "Utiliser la loi de Hess pour calculer une enthalpie de réaction inconnue",
    "Estimer une enthalpie de réaction à partir des énergies de liaison"
  ],
  prereqs: ["Premier principe : énergie interne et enthalpie (Thermodynamique macroscopique)", "Chimie organique descriptive (L2)"],
  bodyHtml: `
    <p>La thermodynamique macroscopique (déjà vue côté Physique) a construit les outils généraux — énergie interne, enthalpie, entropie, potentiels. Ce cours de <strong>thermodynamique chimique</strong> les applique spécifiquement aux <strong>réactions chimiques</strong> : combien d'énergie une réaction libère-t-elle ou consomme-t-elle, dans quel sens évolue-t-elle spontanément, où se situe son équilibre ?</p>

    <h3>1. État standard</h3>
    <p>Pour comparer des données thermodynamiques entre elles, on définit un <strong>état standard</strong> conventionnel : pression $P^\\circ=1\\,\\text{bar}$, le corps pur étant dans son état physique le plus stable à la température considérée (souvent $T=298\\,\\text{K}$ par convention d'usage, sans que ce soit une exigence de l'état standard lui-même). Toute grandeur standard est notée avec un exposant $^\\circ$ (par exemple $\\Delta_rH^\\circ$).</p>

    <h3>2. Grandeur standard de réaction</h3>
    <p>Pour une réaction $\\sum_i \\nu_i \\, A_i = 0$ (les $\\nu_i$ étant les coefficients stœchiométriques algébriques, négatifs pour les réactifs, positifs pour les produits), on définit la <strong>grandeur standard de réaction</strong> $\\Delta_rX^\\circ$ (avec $X=H,S,G$...) à partir des grandeurs molaires standard $X_i^\\circ$ de chaque constituant :</p>
    <div class="formula-box">$$\\Delta_rX^\\circ = \\sum_i \\nu_i\\,X_i^\\circ$$</div>
    <p>En pratique, on tabule des <strong>enthalpies standard de formation</strong> $\\Delta_fH^\\circ$ (l'enthalpie de la réaction fictive formant une mole du composé à partir de ses éléments pris dans leur état standard de référence, avec $\\Delta_fH^\\circ=0$ pour un élément dans son état de référence) : $\\Delta_rH^\\circ = \\sum_i \\nu_i\\,\\Delta_fH^\\circ(A_i)$.</p>

    <h3>3. Loi de Hess</h3>
    <div class="key-point">
      <span class="eyebrow">Loi de Hess</span>
      $\\Delta_rH^\\circ$ étant une différence de fonctions d'état (l'enthalpie, thermodynamique macroscopique chapitre 2), sa valeur ne dépend pas du chemin réactionnel emprunté : on peut calculer l'enthalpie d'une réaction difficile à réaliser directement en la décomposant en une combinaison linéaire de réactions dont les enthalpies sont connues.
    </div>

    <h3>4. Estimation par les énergies de liaison</h3>
    <p>Pour une réaction en phase gazeuse, on peut estimer $\\Delta_rH^\\circ$ à partir des <strong>énergies de liaison</strong> $D$ (énergie nécessaire pour rompre homolytiquement une liaison) : $\\Delta_rH^\\circ \\approx \\sum D_{\\text{liaisons rompues}} - \\sum D_{\\text{liaisons formées}}$ — une estimation approchée (les valeurs de $D$ sont des moyennes statistiques sur de nombreux composés), mais très utile pour un ordre de grandeur rapide sans table de $\\Delta_fH^\\circ$.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> calculer $\\Delta_rH^\\circ$ de la combustion du méthane $\\text{CH}_4(g)+2\\text{O}_2(g)\\to \\text{CO}_2(g)+2\\text{H}_2\\text{O}(l)$, sachant $\\Delta_fH^\\circ(\\text{CH}_4)=-75$, $\\Delta_fH^\\circ(\\text{CO}_2)=-394$, $\\Delta_fH^\\circ(\\text{H}_2\\text{O},l)=-286\\,\\text{kJ/mol}$ ($\\Delta_fH^\\circ(\\text{O}_2)=0$, élément de référence).</p>
      <p><strong>Solution :</strong> $\\Delta_rH^\\circ = [(-394)+2(-286)] - [(-75)+2(0)] = -966-(-75)$.</p>
      <p class="example-answer">$\\Delta_rH^\\circ = -891\\,\\text{kJ/mol}$ — fortement exothermique, cohérent avec l'usage du méthane comme combustible.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Grandeur de réaction : $\\Delta_rX^\\circ=\\sum_i\\nu_iX_i^\\circ$, calculée à partir des grandeurs standard tabulées de chaque constituant</li>
      <li>Loi de Hess : $\\Delta_rH^\\circ$ ne dépend pas du chemin réactionnel (conséquence du caractère fonction d'état de $H$)</li>
      <li>Estimation rapide possible via les énergies de liaison rompues/formées</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Oublier de multiplier par les coefficients stœchiométriques $\\nu_i$ dans le calcul de $\\Delta_rX^\\circ$</li>
      <li>Oublier que $\\Delta_fH^\\circ=0$ pour un élément dans son état de référence (pas pour tout corps simple, ex. O₂ gaz oui, O₃ non)</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La loi de Hess repose sur le fait que $H$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce1e1" value="wrong">une grandeur intensive</label>
          <label class="option"><input type="radio" name="tce1e1" value="right">une fonction d'état</label>
          <label class="option"><input type="radio" name="tce1e1" value="wrong">toujours négative</label>
          <label class="option"><input type="radio" name="tce1e1" value="wrong">indépendante de la température</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce1e1','tce1fb1','Correct — c\\'est justement parce que H ne dépend que de l\\'état final et initial que la loi de Hess fonctionne.','Relis l\\'encadré du cours sur la loi de Hess.')">Vérifier</button>
        <div class="feedback" id="tce1fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">$\\Delta_fH^\\circ$ d'un élément dans son état de référence vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce1e2" value="right">0</label>
          <label class="option"><input type="radio" name="tce1e2" value="wrong">1</label>
          <label class="option"><input type="radio" name="tce1e2" value="wrong">infini</label>
          <label class="option"><input type="radio" name="tce1e2" value="wrong">cela dépend du composé</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce1e2','tce1fb2','Correct — c\\'est la convention de référence de l\\'échelle des enthalpies de formation.','Relis la définition de l\\'enthalpie standard de formation.')">Vérifier</button>
        <div class="feedback" id="tce1fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour la combustion du méthane de l'exemple corrigé, $\\Delta_rH^\\circ$ vaut environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce1e3" value="right">−891 kJ/mol</label>
          <label class="option"><input type="radio" name="tce1e3" value="wrong">+891 kJ/mol</label>
          <label class="option"><input type="radio" name="tce1e3" value="wrong">−75 kJ/mol</label>
          <label class="option"><input type="radio" name="tce1e3" value="wrong">0 kJ/mol</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce1e3','tce1fb3','Correct — exactement le résultat calculé dans l\\'exemple corrigé du cours.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="tce1fb3"></div>
      </div>
    </div>
  `
};
TCE_NOVA_KB[tceKey("Grandeurs standard de réaction")] = {
  intro: "Salut, moi c'est Nova ! On démarre la thermodynamique chimique avec les grandeurs standard de réaction. Demande-moi une explication ou un indice.",
  rules: [
    { test:/hess/i, replies:["La loi de Hess : ΔrH° ne dépend pas du chemin réactionnel, car H est une fonction d'état — on peut décomposer une réaction en étapes connues."]},
    { test:/enthalpie standard de formation|ΔfH/i, replies:["ΔfH° est l'enthalpie de formation d'une mole de composé à partir de ses éléments dans leur état de référence, avec ΔfH°=0 pour un élément dans son état de référence."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis l'encadré sur la loi de Hess.","C'est une propriété de H.","Fonction d'état."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la définition de la référence.","C'est une convention.","0."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends le calcul de l'exemple corrigé.","C'est exothermique.","−891 kJ/mol."]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
TCE_CHAPTERS[tceKey("Enthalpie libre de réaction et affinité chimique")] = {
  objectives: [
    "Définir l'enthalpie libre de réaction et l'exprimer en fonction de l'avancement",
    "Introduire l'affinité chimique et son critère d'évolution spontanée",
    "Relier ΔrG à ΔrG° et au quotient de réaction",
    "Identifier la condition d'équilibre chimique en fonction de l'affinité"
  ],
  prereqs: ["Grandeurs standard de réaction", "Systèmes ouverts : potentiel chimique et équilibre de phases (Thermodynamique macroscopique)"],
  bodyHtml: `
    <p>Le chapitre 1 a donné les outils pour calculer $\\Delta_rH^\\circ$, mais ce n'est pas cette grandeur qui indique le <strong>sens d'évolution spontanée</strong> d'une réaction : c'est l'<strong>enthalpie libre de réaction</strong> $\\Delta_rG$, directement héritée du potentiel de Gibbs déjà rencontré en thermodynamique macroscopique.</p>

    <h3>1. Avancement de réaction</h3>
    <p>On décrit l'évolution d'une réaction par son <strong>avancement</strong> $\\xi$ : la quantité de matière de chaque constituant $i$ s'écrit $n_i = n_i^0+\\nu_i\\xi$. L'enthalpie libre du système, à $T,P$ fixées, est une fonction de $\\xi$ (à travers tous les $n_i$) : $G(T,P,\\xi)$.</p>

    <h3>2. Enthalpie libre de réaction</h3>
    <div class="formula-box">$$\\Delta_rG = \\left(\\frac{\\partial G}{\\partial \\xi}\\right)_{T,P} = \\sum_i \\nu_i\\,\\mu_i$$</div>
    <p>en utilisant le potentiel chimique $\\mu_i$ de chaque constituant (thermodynamique macroscopique, chapitre 8) — $\\Delta_rG$ est donc la pente de $G$ en fonction de l'avancement, à $T,P$ fixées.</p>

    <h3>3. Affinité chimique et critère d'évolution</h3>
    <div class="key-point">
      <span class="eyebrow">Affinité chimique</span>
      On définit $\\mathcal A = -\\Delta_rG$. À $T,P$ fixées, $G$ étant minimale à l'équilibre (thermodynamique macroscopique, chapitre 6), une réaction évolue spontanément dans le sens qui <strong>diminue</strong> $G$ : $\\mathcal A\\,d\\xi \\geq 0$. Si $\\mathcal A>0$, la réaction avance ($d\\xi>0$) ; si $\\mathcal A<0$, elle recule.
    </div>

    <h3>4. Lien avec $\\Delta_rG^\\circ$ et le quotient de réaction</h3>
    <p>En exprimant chaque $\\mu_i$ en fonction de son activité $a_i$ (chapitre 6), on obtient la relation fondamentale :</p>
    <div class="formula-box">$$\\boxed{\\ \\Delta_rG = \\Delta_rG^\\circ + RT\\ln Q\\ }, \\qquad Q = \\prod_i a_i^{\\nu_i}$$</div>
    <p>où $Q$ est le <strong>quotient de réaction</strong>, construit sur les activités <em>instantanées</em> (pas nécessairement à l'équilibre). C'est cette relation qui, au chapitre suivant, conduit directement à la constante d'équilibre.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour une réaction de $\\Delta_rG^\\circ = -10\\,\\text{kJ/mol}$ à $T=298\\,\\text{K}$, avec $Q=100$, la réaction avance-t-elle ou recule-t-elle ?</p>
      <p><strong>Solution :</strong> $\\Delta_rG = -10000 + 8{,}314\\times298\\times\\ln(100) \\approx -10000+11416$.</p>
      <p class="example-answer">$\\Delta_rG \\approx +1416\\,\\text{J/mol} > 0$ : malgré un $\\Delta_rG^\\circ$ négatif, la réaction <strong>recule</strong> dans ces conditions précises ($Q$ trop grand) — un rappel que c'est $\\Delta_rG$ (pas $\\Delta_rG^\\circ$) qui détermine le sens réel d'évolution.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>$\\Delta_rG=(\\partial G/\\partial\\xi)_{T,P}=\\sum_i\\nu_i\\mu_i$ : pente de G en fonction de l'avancement</li>
      <li>Affinité $\\mathcal A=-\\Delta_rG$ : critère d'évolution spontanée, $\\mathcal Ad\\xi\\geq0$</li>
      <li>$\\Delta_rG=\\Delta_rG^\\circ+RT\\ln Q$ : relie l'état standard à l'état réel via le quotient de réaction</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre $\\Delta_rG$ (dépend de l'état réel via $Q$) et $\\Delta_rG^\\circ$ (valeur fixe, état standard)</li>
      <li>Croire qu'un $\\Delta_rG^\\circ$ négatif garantit que la réaction avance : tout dépend de $Q$ à l'instant considéré</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">L'affinité chimique est définie par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce2e1" value="wrong">$\\mathcal A=\\Delta_rG$</label>
          <label class="option"><input type="radio" name="tce2e1" value="right">$\\mathcal A=-\\Delta_rG$</label>
          <label class="option"><input type="radio" name="tce2e1" value="wrong">$\\mathcal A=\\Delta_rG^\\circ$</label>
          <label class="option"><input type="radio" name="tce2e1" value="wrong">$\\mathcal A=RT\\ln Q$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce2e1','tce2fb1','Correct — A=−ΔrG, avec A>0 signifiant que la réaction avance spontanément.','Relis l\\'encadré sur l\\'affinité chimique.')">Vérifier</button>
        <div class="feedback" id="tce2fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">La relation $\\Delta_rG=\\Delta_rG^\\circ+RT\\ln Q$ fait intervenir :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce2e2" value="wrong">la pression seule</label>
          <label class="option"><input type="radio" name="tce2e2" value="right">le quotient de réaction, construit sur les activités instantanées</label>
          <label class="option"><input type="radio" name="tce2e2" value="wrong">la température seule</label>
          <label class="option"><input type="radio" name="tce2e2" value="wrong">le volume du réacteur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce2e2','tce2fb2','Correct — Q=Πai^νi, construit sur l\\'état réel du système à l\\'instant considéré.','Relis la formule encadrée du cours.')">Vérifier</button>
        <div class="feedback" id="tce2fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Dans l'exemple corrigé, malgré $\\Delta_rG^\\circ<0$, la réaction recule car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce2e3" value="wrong">$\\Delta_rG^\\circ$ était mal calculé</label>
          <label class="option"><input type="radio" name="tce2e3" value="right">$Q$ est assez grand pour rendre $\\Delta_rG$ positif</label>
          <label class="option"><input type="radio" name="tce2e3" value="wrong">$T$ est trop basse</label>
          <label class="option"><input type="radio" name="tce2e3" value="wrong">ce n'est pas possible</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce2e3','tce2fb3','Correct — c\\'est ΔrG (pas ΔrG°) qui détermine le sens réel, et RTlnQ peut inverser le signe.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="tce2fb3"></div>
      </div>
    </div>
  `
};
TCE_NOVA_KB[tceKey("Enthalpie libre de réaction et affinité chimique")] = {
  intro: "Salut, c'est Nova ! On étudie l'enthalpie libre de réaction et l'affinité chimique. Demande-moi une explication ou un indice.",
  rules: [
    { test:/affinit[ée]/i, replies:["L'affinité A=−ΔrG est le critère d'évolution : A>0, la réaction avance ; A<0, elle recule — à T,P fixées."]},
    { test:/quotient de r[ée]action|Q=/i, replies:["ΔrG=ΔrG°+RTlnQ relie l'état standard (fixe) à l'état réel via Q=Πai^νi, construit sur les activités instantanées."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis l'encadré de l'affinité.","C'est l'opposé de ΔrG.","A=−ΔrG."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la formule encadrée.","C'est un produit d'activités.","Le quotient de réaction Q."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends le calcul de l'exemple corrigé.","RTlnQ peut inverser le signe.","Q est assez grand pour rendre ΔrG positif."]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
TCE_CHAPTERS[tceKey("Constante d'équilibre et loi d'action de masse")] = {
  objectives: [
    "Établir l'expression de la constante d'équilibre K° à partir de ΔrG°",
    "Écrire la loi d'action de masse (loi de Guldberg et Waage)",
    "Relier K° à la composition à l'équilibre pour une réaction gazeuse",
    "Étudier la variation de K° avec la température (relation de van 't Hoff)"
  ],
  prereqs: ["Enthalpie libre de réaction et affinité chimique"],
  bodyHtml: `
    <p>Le chapitre précédent a montré que l'équilibre chimique correspond à $\\Delta_rG=0$ (affinité nulle). Ce chapitre en tire la conséquence pratique la plus utilisée en chimie : la <strong>constante d'équilibre</strong>, qui fixe la composition du système une fois l'équilibre atteint.</p>

    <h3>1. Constante d'équilibre standard</h3>
    <p>À l'équilibre, $\\Delta_rG=0$, donc d'après la relation du chapitre 2 : $0 = \\Delta_rG^\\circ+RT\\ln Q_{eq}$, soit :</p>
    <div class="formula-box">$$\\boxed{\\ K^\\circ(T) = e^{-\\Delta_rG^\\circ(T)/RT}\\ }$$</div>
    <p>où $K^\\circ$, la <strong>constante d'équilibre standard</strong>, est la valeur particulière du quotient de réaction $Q$ atteinte à l'équilibre — elle ne dépend <strong>que</strong> de la température (via $\\Delta_rG^\\circ(T)$), jamais de la composition initiale ni de la pression totale.</p>

    <h3>2. Loi d'action de masse</h3>
    <div class="key-point">
      <span class="eyebrow">Loi de Guldberg et Waage</span>
      À l'équilibre, $K^\\circ = \\displaystyle\\prod_i a_{i,eq}^{\\nu_i}$ — un produit des activités à l'équilibre, chacune élevée à la puissance de son coefficient stœchiométrique. C'est cette relation, la <strong>loi d'action de masse</strong>, qui permet de calculer la composition du système à l'équilibre.
    </div>
    <p>Pour un gaz supposé parfait, l'activité s'exprime $a_i = P_i/P^\\circ$ (pression partielle rapportée à la pression standard) ; pour un soluté dilué, $a_i = c_i/c^\\circ$ ; pour un solide ou un liquide pur, $a_i=1$ par convention.</p>

    <h3>3. Relation de van 't Hoff</h3>
    <p>La dépendance de $K^\\circ$ avec la température s'obtient en dérivant $\\ln K^\\circ = -\\Delta_rG^\\circ/RT$ par rapport à $T$ (et en utilisant $\\Delta_rG^\\circ=\\Delta_rH^\\circ-T\\Delta_rS^\\circ$) :</p>
    <div class="formula-box">$$\\frac{d\\ln K^\\circ}{dT} = \\frac{\\Delta_rH^\\circ}{RT^2}$$</div>
    <p>Pour une réaction <strong>exothermique</strong> ($\\Delta_rH^\\circ<0$), $K^\\circ$ <strong>diminue</strong> quand $T$ augmente : l'équilibre se déplace vers les réactifs (résultat cohérent avec la loi de Le Chatelier, chapitre suivant).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour la réaction $\\text{N}_2\\text{O}_4(g) \\rightleftharpoons 2\\text{NO}_2(g)$, $\\Delta_rG^\\circ = 5{,}4\\,\\text{kJ/mol}$ à $298\\,\\text{K}$. Calculer $K^\\circ$.</p>
      <p><strong>Solution :</strong> $K^\\circ = e^{-5400/(8{,}314\\times298)} = e^{-2{,}18}$.</p>
      <p class="example-answer">$K^\\circ \\approx 0{,}11$ : $K^\\circ<1$ traduit un $\\Delta_rG^\\circ>0$, donc un équilibre déplacé vers les réactifs (peu de dissociation en NO₂ dans les conditions standard).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>$K^\\circ(T)=e^{-\\Delta_rG^\\circ(T)/RT}$ : ne dépend que de $T$</li>
      <li>Loi d'action de masse : $K^\\circ=\\prod_ia_{i,eq}^{\\nu_i}$</li>
      <li>Relation de van 't Hoff : $d\\ln K^\\circ/dT=\\Delta_rH^\\circ/RT^2$ — $K^\\circ$ diminue avec $T$ si la réaction est exothermique</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que $K^\\circ$ dépend de la composition initiale ou de la pression totale : elle ne dépend que de $T$</li>
      <li>Oublier que l'activité d'un solide ou liquide pur vaut 1, pas sa concentration ou pression</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La constante d'équilibre standard $K^\\circ$ dépend de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce3e1" value="wrong">la composition initiale</label>
          <label class="option"><input type="radio" name="tce3e1" value="right">la température seule</label>
          <label class="option"><input type="radio" name="tce3e1" value="wrong">la pression totale</label>
          <label class="option"><input type="radio" name="tce3e1" value="wrong">le volume du réacteur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce3e1','tce3fb1','Correct — K° ne dépend que de T, via ΔrG°(T).','Relis la formule encadrée du cours.')">Vérifier</button>
        <div class="feedback" id="tce3fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Pour une réaction exothermique, quand $T$ augmente, $K^\\circ$ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce3e2" value="right">diminue</label>
          <label class="option"><input type="radio" name="tce3e2" value="wrong">augmente</label>
          <label class="option"><input type="radio" name="tce3e2" value="wrong">reste constante</label>
          <label class="option"><input type="radio" name="tce3e2" value="wrong">devient négative</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce3e2','tce3fb2','Correct — la relation de van \\'t Hoff donne dlnK°/dT<0 si ΔrH°<0 (exothermique).','Relis la relation de van \\'t Hoff dans le cours.')">Vérifier</button>
        <div class="feedback" id="tce3fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $\\Delta_rG^\\circ=5{,}4\\,\\text{kJ/mol}$ à 298 K, $K^\\circ$ est environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce3e3" value="right">0,11</label>
          <label class="option"><input type="radio" name="tce3e3" value="wrong">1,0</label>
          <label class="option"><input type="radio" name="tce3e3" value="wrong">9,0</label>
          <label class="option"><input type="radio" name="tce3e3" value="wrong">−0,11</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce3e3','tce3fb3','Correct — exactement le résultat de l\\'exemple corrigé.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="tce3fb3"></div>
      </div>
    </div>
  `
};
TCE_NOVA_KB[tceKey("Constante d'équilibre et loi d'action de masse")] = {
  intro: "Salut, c'est Nova ! On étudie la constante d'équilibre et la loi d'action de masse. Demande-moi une explication ou un indice.",
  rules: [
    { test:/loi d.action de masse|guldberg/i, replies:["La loi d'action de masse : K°=Πai,eq^νi, produit des activités à l'équilibre pondérées par les coefficients stœchiométriques."]},
    { test:/van.t hoff/i, replies:["La relation de van 't Hoff dlnK°/dT=ΔrH°/RT² : K° diminue avec T si la réaction est exothermique, augmente si endothermique."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la formule encadrée.","K° ne dépend que d'une variable.","La température seule."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la relation de van 't Hoff.","ΔrH°<0 pour exothermique.","K° diminue."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends le calcul de l'exemple corrigé.","C'est e^(−2,18).","≈0,11."]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
TCE_CHAPTERS[tceKey("Déplacements d'équilibre : loi de Le Chatelier")] = {
  objectives: [
    "Énoncer qualitativement et quantitativement la loi de modération",
    "Analyser l'effet d'une variation de température sur un équilibre",
    "Analyser l'effet d'une variation de pression sur un équilibre gazeux",
    "Analyser l'effet de l'ajout d'un constituant à T,P constantes"
  ],
  prereqs: ["Constante d'équilibre et loi d'action de masse"],
  bodyHtml: `
    <p>Ce chapitre traite une question très pratique : si un système chimique à l'équilibre subit une perturbation extérieure (chauffage, compression, ajout d'un réactif), dans quel sens l'équilibre se déplace-t-il ? La réponse qualitative est connue sous le nom de <strong>loi de modération</strong> (ou loi de Le Chatelier) ; ce chapitre la justifie rigoureusement à partir des outils des chapitres précédents.</p>

    <h3>1. Énoncé qualitatif</h3>
    <div class="key-point">
      <span class="eyebrow">Loi de modération (Le Chatelier)</span>
      Si un système à l'équilibre est soumis à une perturbation extérieure, il évolue de façon à <strong>s'opposer partiellement</strong> à cette perturbation (sans jamais l'annuler complètement).
    </div>
    <p>Cet énoncé qualitatif, historiquement antérieur à sa justification thermodynamique complète, se retrouve exactement dans la relation de van 't Hoff (chapitre 3) pour l'effet de la température, et se généralise aux effets de pression et de composition.</p>

    <h3>2. Effet de la température</h3>
    <p>D'après la relation de van 't Hoff (chapitre 3), une élévation de $T$ déplace l'équilibre dans le sens qui <strong>consomme de la chaleur</strong> — c'est-à-dire dans le sens <strong>endothermique</strong> — ce qui s'oppose partiellement à l'élévation de température imposée : c'est exactement la loi de modération appliquée à ce cas particulier.</p>

    <h3>3. Effet de la pression (réaction gazeuse)</h3>
    <p>Pour une réaction faisant intervenir des gaz, avec $\\Delta_r n_{gaz} = \\sum_i \\nu_i$ (variation du nombre de moles gazeuses), une augmentation de pression totale (à $T$ fixée) déplace l'équilibre dans le sens qui <strong>diminue</strong> le nombre de moles gazeuses (le sens qui réduit le volume occupé) — s'opposant ainsi partiellement à l'augmentation de pression.</p>
    <table class="mini-table">
      <tr><th>$\\Delta_rn_{gaz}$</th><th>Effet d'une augmentation de $P$</th></tr>
      <tr><td>$>0$ (plus de moles gazeuses côté produits)</td><td>déplacement vers les réactifs</td></tr>
      <tr><td>$<0$</td><td>déplacement vers les produits</td></tr>
      <tr><td>$=0$</td><td>aucun effet de la pression sur la position de l'équilibre</td></tr>
    </table>

    <h3>4. Effet de l'ajout d'un constituant (à T, P constantes)</h3>
    <p>Ajouter un réactif (ou retirer un produit) à $T,P$ constantes déplace l'équilibre dans le sens direct (formation de produits), conformément à la loi de modération. Un cas plus subtil : l'ajout d'un <strong>gaz inerte</strong> (ne participant pas à la réaction) à <strong>pression totale constante</strong> dilue tous les constituants gazeux, ce qui équivaut à une diminution de leurs pressions partielles — et déplace donc l'équilibre dans le sens de l'augmentation du nombre de moles gazeuses (l'effet inverse d'une compression).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour $\\text{N}_2(g)+3\\text{H}_2(g)\\rightleftharpoons 2\\text{NH}_3(g)$ (synthèse de l'ammoniac, procédé Haber), une forte pression est utilisée industriellement. Pourquoi ?</p>
      <p><strong>Solution :</strong> $\\Delta_rn_{gaz} = 2-(1+3) = -2 < 0$ : la réaction diminue le nombre de moles gazeuses.</p>
      <p class="example-answer">D'après le tableau du cours, une pression élevée déplace l'équilibre vers les produits (NH₃) : c'est exactement pourquoi le procédé Haber-Bosch opère à haute pression (typiquement 150-300 bar), pour maximiser le rendement en ammoniac.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Loi de modération : le système s'oppose partiellement à toute perturbation extérieure</li>
      <li>Une élévation de $T$ favorise le sens endothermique</li>
      <li>Une élévation de $P$ favorise le sens qui diminue le nombre de moles gazeuses</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Oublier de comparer le nombre de moles gazeuses de chaque côté avant de conclure sur l'effet de la pression</li>
      <li>Confondre ajout de gaz inerte à $P$ constante (dilue, effet comme une décompression) et à $V$ constant (aucun effet sur $Q$)</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Une élévation de température déplace un équilibre dans le sens :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce4e1" value="wrong">exothermique toujours</label>
          <label class="option"><input type="radio" name="tce4e1" value="right">endothermique</label>
          <label class="option"><input type="radio" name="tce4e1" value="wrong">qui ne dépend pas de $\\Delta_rH^\\circ$</label>
          <label class="option"><input type="radio" name="tce4e1" value="wrong">inverse toujours</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce4e1','tce4fb1','Correct — le système consomme la chaleur apportée, donc il évolue dans le sens endothermique.','Relis la section sur l\\'effet de la température.')">Vérifier</button>
        <div class="feedback" id="tce4fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Pour la synthèse de l'ammoniac ($\\Delta_rn_{gaz}=-2$), une forte pression déplace l'équilibre vers :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce4e2" value="right">les produits (NH₃)</label>
          <label class="option"><input type="radio" name="tce4e2" value="wrong">les réactifs</label>
          <label class="option"><input type="radio" name="tce4e2" value="wrong">aucun effet</label>
          <label class="option"><input type="radio" name="tce4e2" value="wrong">cela dépend du catalyseur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce4e2','tce4fb2','Correct — Δrngaz<0, donc une pression élevée favorise le sens qui diminue le nombre de moles gazeuses (les produits).','Reprends le tableau du cours et l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="tce4fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Ajouter un gaz inerte à pression totale constante déplace l'équilibre comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce4e3" value="wrong">une compression</label>
          <label class="option"><input type="radio" name="tce4e3" value="right">une décompression</label>
          <label class="option"><input type="radio" name="tce4e3" value="wrong">aucun effet, jamais</label>
          <label class="option"><input type="radio" name="tce4e3" value="wrong">un chauffage</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce4e3','tce4fb3','Correct — la dilution des espèces gazeuses équivaut à diminuer leurs pressions partielles, comme une décompression.','Relis le dernier paragraphe du cours sur le gaz inerte.')">Vérifier</button>
        <div class="feedback" id="tce4fb3"></div>
      </div>
    </div>
  `
};
TCE_NOVA_KB[tceKey("Déplacements d'équilibre : loi de Le Chatelier")] = {
  intro: "Salut, c'est Nova ! On étudie la loi de modération et les déplacements d'équilibre. Demande-moi une explication ou un indice.",
  rules: [
    { test:/le chatelier|mod[ée]ration/i, replies:["La loi de modération : le système s'oppose partiellement à toute perturbation (T, P, composition), sans jamais l'annuler complètement."]},
    { test:/pression|Δrngaz/i, replies:["Une hausse de pression déplace l'équilibre vers le sens qui diminue le nombre de moles gazeuses. C'est pourquoi le procédé Haber utilise une forte pression."]},
    { test:/gaz inerte/i, replies:["Ajouter un gaz inerte à pression constante dilue les espèces, équivalent à une décompression — effet inverse d'une compression."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la section sur l'effet de T.","Le système consomme la chaleur ajoutée.","Sens endothermique."]},
    { test:/exercice\s*2/i, hint:true, replies:["Compare le nombre de moles gazeuses.","Δrngaz<0 ici.","Vers les produits."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis le dernier paragraphe du cours.","La dilution ressemble à quoi ?","Une décompression."]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
TCE_CHAPTERS[tceKey("Diagrammes binaires liquide-vapeur")] = {
  objectives: [
    "Lire un diagramme binaire isobare liquide-vapeur (courbes d'ébullition et de rosée)",
    "Appliquer le théorème des moments à un mélange binaire diphasé",
    "Distinguer mélange idéal (loi de Raoult) et écarts à l'idéalité (azéotropes)",
    "Relier ces diagrammes au principe de la distillation"
  ],
  prereqs: ["Déplacements d'équilibre : loi de Le Chatelier", "Changement d'état des corps purs et diagrammes de phase (Thermodynamique macroscopique)"],
  bodyHtml: `
    <p>Le chapitre sur les corps purs (thermodynamique macroscopique) a établi les diagrammes de phase à un seul constituant. Ce chapitre passe au cas d'un <strong>mélange binaire</strong> (deux constituants A et B), fondamental en chimie (distillation, séparation de mélanges) : le diagramme se complexifie, une nouvelle variable — la <strong>composition</strong> — s'ajoutant à $T$ et $P$.</p>

    <h3>1. Loi de Raoult et mélange idéal</h3>
    <p>Pour un mélange liquide <strong>idéal</strong> (interactions A-A, B-B, A-B comparables), la pression partielle de vapeur de chaque constituant au-dessus du liquide est proportionnelle à sa fraction molaire liquide $x_i$ :</p>
    <div class="formula-box">$$P_i = x_i\\,P_i^{\\text{sat}}(T)$$</div>
    <p>où $P_i^{\\text{sat}}(T)$ est la pression de vapeur saturante du corps pur $i$ à la température $T$ (loi de Raoult). La pression totale $P=P_A+P_B$ varie alors linéairement avec $x_A$ (à $T$ fixée).</p>

    <h3>2. Diagramme binaire isobare $(T,x)$</h3>
    <p>En pratique (distillation), on travaille plutôt à $P$ fixée (souvent $P^\\circ$), et l'on trace $T$ en fonction de la composition. Le diagramme présente deux courbes :</p>
    <table class="mini-table">
      <tr><th>Courbe</th><th>Signification</th></tr>
      <tr><td>Courbe d'ébullition</td><td>température à laquelle un liquide de composition $x_A$ commence à bouillir</td></tr>
      <tr><td>Courbe de rosée</td><td>température à laquelle une vapeur de composition $y_A$ commence à se condenser</td></tr>
    </table>
    <p>Entre ces deux courbes se trouve le <strong>fuseau de coexistence</strong> liquide-vapeur, où les deux phases coexistent — la composition de chaque phase se lisant à l'intersection de l'isotherme avec chaque courbe.</p>

    <h3>3. Théorème des moments</h3>
    <p>Exactement comme au chapitre 7 de thermodynamique macroscopique (corps pur, diagramme $P,V$), pour un système global de composition globale $x$ dans le fuseau, entre la composition liquide $x_L$ et vapeur $x_V$, la fraction molaire de vapeur $f_V$ vérifie le théorème des moments :</p>
    <div class="formula-box">$$f_V = \\frac{x-x_L}{x_V-x_L}$$</div>

    <h3>4. Écarts à l'idéalité : azéotropes</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — l'azéotrope</span>
      Quand les interactions A-B diffèrent significativement des interactions A-A et B-B, le mélange s'écarte de la loi de Raoult (déviations positives ou négatives). Dans certains cas, les courbes d'ébullition et de rosée se rejoignent en un point — l'<strong>azéotrope</strong> — où liquide et vapeur ont exactement la <em>même</em> composition. Un azéotrope ne peut jamais être séparé par simple distillation : la vapeur produite a la même composition que le liquide restant, quel que soit le nombre de plateaux théoriques utilisés.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi l'éthanol à 96% (mélange eau-éthanol) ne peut-il pas être purifié à 100% par simple distillation ?</p>
      <p><strong>Solution :</strong> le mélange eau-éthanol présente un azéotrope à environ 96% d'éthanol en masse (à pression atmosphérique).</p>
      <p class="example-answer">À cette composition, la vapeur produite a exactement la même composition que le liquide : la distillation simple (ou même fractionnée avec un grand nombre de plateaux) ne peut jamais dépasser ce point — d'autres techniques (distillation azéotropique, tamis moléculaires) sont nécessaires pour obtenir de l'éthanol anhydre.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Loi de Raoult (mélange idéal) : $P_i=x_iP_i^{\\text{sat}}(T)$</li>
      <li>Diagramme isobare $(T,x)$ : courbes d'ébullition et de rosée délimitant le fuseau de coexistence</li>
      <li>Théorème des moments : $f_V=(x-x_L)/(x_V-x_L)$</li>
      <li>Un azéotrope (composition liquide=vapeur) ne peut jamais être franchi par simple distillation</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que tout mélange binaire suit la loi de Raoult : ce n'est valable que pour un mélange idéal</li>
      <li>Penser qu'un azéotrope est un cas rare : c'est en réalité assez fréquent en chimie industrielle</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La loi de Raoult s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce5e1" value="wrong">$P_i = P_i^{\\text{sat}}$</label>
          <label class="option"><input type="radio" name="tce5e1" value="right">$P_i = x_iP_i^{\\text{sat}}$</label>
          <label class="option"><input type="radio" name="tce5e1" value="wrong">$P_i = x_i+P_i^{\\text{sat}}$</label>
          <label class="option"><input type="radio" name="tce5e1" value="wrong">$P_i = 1/x_i$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce5e1','tce5fb1','Correct — Pi=xiPi_sat, valable pour un mélange idéal.','Relis la formule encadrée du cours.')">Vérifier</button>
        <div class="feedback" id="tce5fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">À un azéotrope, la composition du liquide et de la vapeur sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce5e2" value="right">identiques</label>
          <label class="option"><input type="radio" name="tce5e2" value="wrong">toujours très différentes</label>
          <label class="option"><input type="radio" name="tce5e2" value="wrong">nulles</label>
          <label class="option"><input type="radio" name="tce5e2" value="wrong">indépendantes de la pression</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce5e2','tce5fb2','Correct — c\\'est exactement la définition d\\'un azéotrope, ce qui empêche toute séparation par simple distillation.','Relis le point clé du cours sur l\\'azéotrope.')">Vérifier</button>
        <div class="feedback" id="tce5fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">L'éthanol à 96% ne peut pas être purifié à 100% par simple distillation car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce5e3" value="wrong">l'éthanol se décompose</label>
          <label class="option"><input type="radio" name="tce5e3" value="right">c'est un azéotrope</label>
          <label class="option"><input type="radio" name="tce5e3" value="wrong">la distillation n'existe pas pour l'éthanol</label>
          <label class="option"><input type="radio" name="tce5e3" value="wrong">l'eau bout avant l'éthanol</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce5e3','tce5fb3','Correct — exactement l\\'explication de l\\'exemple corrigé du cours.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="tce5fb3"></div>
      </div>
    </div>
  `
};
TCE_NOVA_KB[tceKey("Diagrammes binaires liquide-vapeur")] = {
  intro: "Salut, moi c'est Nova ! On étudie les diagrammes binaires liquide-vapeur et les azéotropes. Demande-moi une explication ou un indice.",
  rules: [
    { test:/raoult/i, replies:["La loi de Raoult Pi=xiPi_sat(T) décrit un mélange liquide idéal : la pression partielle de vapeur est proportionnelle à la fraction molaire liquide."]},
    { test:/az[ée]otrope/i, replies:["Un azéotrope est un point où liquide et vapeur ont exactement la même composition — infranchissable par simple distillation, comme pour l'éthanol à 96%."]},
    { test:/th[ée]or[èe]me des moments/i, replies:["Le théorème des moments fV=(x−xL)/(xV−xL) donne la fraction de vapeur dans le fuseau de coexistence."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la formule encadrée.","C'est une proportionnalité.","Pi=xiPi_sat."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé sur l'azéotrope.","C'est la définition même du terme.","Identiques."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","C'est un cas particulier de mélange.","C'est un azéotrope."]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
TCE_CHAPTERS[tceKey("Diagrammes binaires liquide-solide et eutectiques")] = {
  objectives: [
    "Lire un diagramme binaire isobare liquide-solide à miscibilité nulle à l'état solide",
    "Identifier le point eutectique et ses propriétés caractéristiques",
    "Appliquer le théorème des moments à un mélange solide-liquide",
    "Relier ces diagrammes aux techniques de purification par fusion"
  ],
  prereqs: ["Diagrammes binaires liquide-vapeur"],
  bodyHtml: `
    <p>Ce dernier chapitre traite le second grand type de diagramme binaire, tout aussi important en chimie du solide et en métallurgie : l'équilibre <strong>liquide-solide</strong>, dans le cas le plus simple (mais très instructif) où les deux constituants A et B sont totalement <strong>non miscibles</strong> à l'état solide (ils cristallisent séparément).</p>

    <h3>1. Diagramme binaire isobare liquide-solide</h3>
    <p>À l'instar du diagramme liquide-vapeur (chapitre 5), on trace $T$ en fonction de la composition $x$, à $P$ fixée. Le diagramme présente deux <strong>courbes de liquidus</strong> partant des points de fusion des corps purs $A$ et $B$, qui se rejoignent en un point d'intersection remarquable.</p>

    <h3>2. Le point eutectique</h3>
    <div class="key-point">
      <span class="eyebrow">Point eutectique</span>
      Le <strong>point eutectique</strong> $E$ est le point du diagramme où les deux courbes de liquidus se rejoignent, à la température la plus basse de tout le diagramme (la température eutectique $T_E$). C'est aussi le <strong>seul</strong> point où un mélange liquide se solidifie entièrement à température <strong>constante</strong> — exactement comme un corps pur — bien que ce ne soit pas un corps pur mais un mélange de composition fixe $x_E$.
    </div>
    <p>En-dessous de $T_E$, tout le système est solide, sous forme d'un mélange intime de cristaux de A pur et de cristaux de B pur (pas un composé chimique nouveau, juste un mélange mécanique très fin).</p>

    <h3>3. Solidification d'un mélange hors eutectique</h3>
    <p>Pour une composition $x \\neq x_E$, en refroidissant un liquide, on atteint d'abord la courbe de liquidus : le corps en excès (par rapport à $x_E$) commence à cristalliser <strong>pur</strong>, tandis que le liquide restant s'enrichit progressivement en l'autre corps, sa composition suivant la courbe de liquidus jusqu'à atteindre $x_E$ — où le reste du liquide se solidifie d'un coup, à $T_E$, en un mélange eutectique.</p>

    <h3>4. Théorème des moments</h3>
    <p>Comme pour le diagramme liquide-vapeur, le théorème des moments s'applique à tout point du diagramme situé dans une zone de coexistence : la fraction de chaque phase se lit par un rapport de segments sur l'horizontale (l'isotherme) passant par le point considéré.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi ajoute-t-on du sel sur les routes verglacées en hiver ?</p>
      <p><strong>Solution :</strong> le mélange eau-sel présente un diagramme eutectique où $T_E$ (typiquement autour de $-21\\,°\\text{C}$ pour NaCl) est bien inférieure à $0\\,°\\text{C}$, le point de fusion de l'eau pure.</p>
      <p class="example-answer">Ajouter du sel abaisse la température de fusion du mélange en-dessous de la température ambiante hivernale typique, empêchant la formation de glace (tant que $T>T_E$) — une application directe et quotidienne du diagramme eutectique.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Diagramme binaire liquide-solide (non miscibilité à l'état solide) : deux courbes de liquidus se rejoignant au point eutectique $E$</li>
      <li>Le point eutectique est la température la plus basse du diagramme, où le liquide se solidifie à $T$ constante</li>
      <li>Une composition hors eutectique cristallise progressivement (un corps pur d'abord), le liquide s'enrichissant vers $x_E$</li>
      <li>Application : abaissement du point de fusion d'un mélange (salage des routes)</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que le mélange eutectique est un nouveau composé chimique : c'est un mélange mécanique fin de deux phases solides distinctes</li>
      <li>Confondre le comportement à $T_E$ (solidification à température constante, comme un corps pur) avec celui hors eutectique (solidification sur un intervalle de température)</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le point eutectique correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce6e1" value="wrong">la température la plus haute du diagramme</label>
          <label class="option"><input type="radio" name="tce6e1" value="right">la température la plus basse du diagramme, où le liquide se solidifie à T constante</label>
          <label class="option"><input type="radio" name="tce6e1" value="wrong">un nouveau composé chimique</label>
          <label class="option"><input type="radio" name="tce6e1" value="wrong">une phase gazeuse</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce6e1','tce6fb1','Correct — c\\'est exactement la définition du point eutectique.','Relis l\\'encadré du cours sur le point eutectique.')">Vérifier</button>
        <div class="feedback" id="tce6fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Le sel abaisse le point de fusion de l'eau sur les routes verglacées car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce6e2" value="wrong">le sel réchauffe la glace</label>
          <label class="option"><input type="radio" name="tce6e2" value="right">le mélange eau-sel a une température eutectique inférieure à 0°C</label>
          <label class="option"><input type="radio" name="tce6e2" value="wrong">le sel est un catalyseur</label>
          <label class="option"><input type="radio" name="tce6e2" value="wrong">cela ne fonctionne pas réellement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce6e2','tce6fb2','Correct — exactement l\\'explication de l\\'exemple corrigé du cours.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="tce6fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour une composition hors eutectique qui refroidit, le premier solide à apparaître est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tce6e3" value="right">le corps en excès par rapport à la composition eutectique, pur</label>
          <label class="option"><input type="radio" name="tce6e3" value="wrong">toujours un mélange eutectique</label>
          <label class="option"><input type="radio" name="tce6e3" value="wrong">un composé A-B nouveau</label>
          <label class="option"><input type="radio" name="tce6e3" value="wrong">rien, tout reste liquide</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tce6e3','tce6fb3','Correct — le corps en excès cristallise pur en premier, enrichissant le liquide restant vers la composition eutectique.','Relis la section du cours sur la solidification hors eutectique.')">Vérifier</button>
        <div class="feedback" id="tce6fb3"></div>
      </div>
    </div>
  `
};
TCE_NOVA_KB[tceKey("Diagrammes binaires liquide-solide et eutectiques")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : diagrammes liquide-solide et point eutectique. Demande-moi une explication ou un indice.",
  rules: [
    { test:/eutectique/i, replies:["Le point eutectique est la température la plus basse du diagramme, où le mélange liquide se solidifie entièrement à température constante, comme un corps pur."]},
    { test:/sel|route|verglas/i, replies:["Le sel abaisse la température eutectique du mélange eau-sel en-dessous de 0°C, empêchant la formation de glace tant que T>TE — exactement l'exemple du cours."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis l'encadré sur le point eutectique.","C'est la température la plus basse.","Solidification à T constante."]},
    { test:/exercice\s*2/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense à la température eutectique du mélange.","Elle est inférieure à 0°C."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis la section sur la solidification hors eutectique.","C'est le corps en excès.","Il cristallise pur en premier."]}
  ]
};

/* fusionne le module Thermodynamique chimique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, TCE_CHAPTERS);
Object.assign(NOVA_KB, TCE_NOVA_KB);