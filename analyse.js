/* =====================================================================
   CHUNK « analyse » — registre ANALYSE_CHAPTERS / ANALYSE_NOVA_KB
   Matière(s) : Mathématiques|Fonction d'une variable réelle
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   ANALYSE_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */




/* =========================================================================
   MODULE "Fonction d'une variable réelle" (Mathématiques, L1)
   Source : polycopié Dedieu & Raymond, Analyse — Fonctions d'une variable réelle
   Chapitres déjà annoncés dans REAL_CHAPHERS : Limites et continuité, Dérivabilité,
   Étude de fonctions, Développements limités.
========================================================================= */
const ANALYSE_MATIERE = "Fonction d'une variable réelle";
function aKey(chapterTitle){ return `Mathématiques|${ANALYSE_MATIERE}|${chapterTitle}`; }
const ANALYSE_CHAPTERS = {};
const ANALYSE_NOVA_KB = {};

/* =========================== CHAPITRE 1 : Limites et continuité =========================== */
ANALYSE_CHAPTERS[aKey('Limites et continuité')] = {
  objectives: [
    "Manipuler la définition rigoureuse (avec des epsilon) de la limite d'une suite et d'une fonction",
    "Utiliser la convergence monotone et le théorème de Bolzano-Weierstrass",
    "Définir la continuité en un point, à gauche, à droite, et sur un intervalle",
    "Appliquer le théorème des valeurs intermédiaires et le théorème de Weierstrass",
    "Distinguer continuité simple et continuité uniforme",
    "Évaluer en quoi la formalisation epsilon-delta de Cauchy et Weierstrass, en résolvant la « crise de rigueur » du calcul infinitésimal du XVIIIe siècle, a permis de construire l'ensemble de l'analyse mathématique moderne sur des bases solides"
  ],
  prereqs: ["Nombres réels : borne supérieure, borne inférieure", "Notion intuitive de fonction"],
  bodyHtml: `
    <p>Pendant près de deux siècles après l'invention du calcul infinitésimal par Newton et Leibniz, la notion de limite reposait sur des intuitions comme « une quantité qui s'approche indéfiniment d'une autre sans jamais l'atteindre » — des formulations poétiques mais mathématiquement floues, qui provoquèrent plusieurs paradoxes et erreurs de raisonnement au cours du XVIIIe siècle. C'est Augustin-Louis Cauchy qui, dans son <em>Cours d'analyse</em> de 1821, puis Karl Weierstrass dans les années 1860, donnèrent enfin à la notion de limite une définition rigoureuse et opérationnelle — la fameuse formulation « epsilon-delta » que tu vas étudier dans ce chapitre, qui a mis fin à des décennies de controverses sur les fondements du calcul infinitésimal.</p>
    <p>Cette rigueur epsilon-delta, qui peut sembler au premier abord une complication artificielle par rapport à l'intuition du « se rapprocher indéfiniment », est en réalité ce qui a permis aux mathématiques de construire, sur des bases solides, l'ensemble de l'analyse moderne — de la théorie de l'intégration aux équations différentielles, en passant par l'analyse fonctionnelle qui sous-tend une grande partie de la physique théorique et de l'apprentissage automatique aujourd'hui.</p>
    <p>Toute l'analyse repose sur une seule idée : donner un sens précis à « se rapprocher indéfiniment » d'une valeur. Ce chapitre pose cette idée sous forme de définitions rigoureuses (les fameux « epsilon »), puis en tire les grands théorèmes sur les fonctions continues. À la fin de ce chapitre, tu sauras manipuler la définition epsilon-delta d'une limite et appliquer les théorèmes fondamentaux de Weierstrass et des valeurs intermédiaires.</p>

    <h3>1. Limite d'une suite</h3>
    <p>Une suite $(u_n)$ converge vers $l \\in \\mathbb{R}$ lorsque :</p>
    <div class="formula-box">$$\\forall \\varepsilon > 0,\\ \\exists n_0 \\in \\mathbb{N},\\ \\forall n \\ge n_0,\\ |u_n - l| \\le \\varepsilon$$</div>
    <p>Autrement dit : aussi petite que soit la marge $\\varepsilon$ qu'on s'autorise, tous les termes de la suite finissent par rentrer dedans, à partir d'un certain rang $n_0$.</p>
    <div class="key-point">
      <span class="eyebrow">Deux résultats à connaître par cœur</span>
      Une suite croissante et majorée converge (vers le supremum de ses valeurs) — c'est le théorème de la <strong>convergence monotone</strong>. Et toute suite bornée possède une sous-suite convergente — c'est le théorème de <strong>Bolzano-Weierstrass</strong>.
    </div>
    <p>Une suite est dite de <strong>Cauchy</strong> quand ses termes se rapprochent les uns des autres (et pas seulement d'une limite supposée connue) : $|u_n - u_m| \\le \\varepsilon$ dès que $n,m \\ge N$. Dans $\\mathbb{R}$, <em>convergente</em> et <em>de Cauchy</em> sont deux notions équivalentes — c'est ce qui permet de prouver qu'une suite converge sans connaître sa limite à l'avance.</p>

    <h3>2. Limite d'une fonction en un point</h3>
    <p>Soit $f : I \\to \\mathbb{R}$ et $c \\in \\overline{I}$. On dit que $\\lim_{x \\to c} f(x) = l$ lorsque :</p>
    <div class="formula-box">$$\\forall \\varepsilon > 0,\\ \\exists \\eta > 0,\\ \\forall x \\in I,\\ |x-c| \\le \\eta \\ \\Rightarrow\\ |f(x)-l| \\le \\varepsilon$$</div>
    <p>On définit de la même façon les limites à gauche ($x \\to c,\\ x<c$), à droite ($x \\to c,\\ x>c$) et à l'infini. La limite en un point, si elle existe, est <strong>unique</strong>, et elle existe si et seulement si les limites à gauche et à droite existent et coïncident.</p>
    <div class="key-point">
      <span class="eyebrow">Le pont suites ↔ fonctions</span>
      $\\lim_{x\\to c} f(x) = l$ si et seulement si, pour <em>toute</em> suite $(u_n)$ à valeurs dans $I$, différente de $c$, qui tend vers $c$, on a $\\lim f(u_n) = l$. C'est très utile pour <em>montrer qu'une limite n'existe pas</em> : il suffit de trouver deux suites tendant vers $c$ mais donnant deux limites différentes pour $f$.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le pont entre suites et fonctions permet de prouver qu'une limite n'existe PAS en exhibant deux suites tendant vers le même point mais donnant deux limites différentes pour f. Pourquoi ce critère négatif (une seule paire de suites contradictoires suffit) est-il si puissant, alors que prouver directement l'existence d'une limite exige, lui, de vérifier la définition epsilon-eta pour TOUTE suite possible ?
    </div>

    <h3>3. Continuité</h3>
    <p>$f$ est <strong>continue en $c$</strong> lorsque $\\lim_{x \\to c} f(x) = f(c)$ — la limite existe, et en plus elle coïncide avec la valeur réellement prise par la fonction. Une fonction est continue sur un intervalle $I$ si elle l'est en tout point de $I$.</p>
    <table class="mini-table">
      <tr><th>Fonctions continues « de base »</th><th>Exemples de discontinuités</th></tr>
      <tr><td>Constantes, identité, valeur absolue, polynômes, fractions rationnelles (hors pôles), $\\sin$, $\\cos$, exponentielle, logarithme</td><td>Partie entière $\\lfloor x \\rfloor$ (en tout entier) ; $f(x)=1/x$ prolongée par $f(0)=0$</td></tr>
    </table>
    <p>Somme, produit, quotient (dénominateur non nul) et composée de fonctions continues restent continues.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> la fonction $f(x) = \\dfrac{\\sin x}{x}$ n'est pas définie en $0$. Peut-on la prolonger par continuité ?</p>
      <p><strong>Solution :</strong> puisque $\\lim_{x\\to 0} \\dfrac{\\sin x}{x} = 1$, on pose $\\tilde f(x) = f(x)$ pour $x \\ne 0$ et $\\tilde f(0) = 1$.</p>
      <p class="example-answer">$\\tilde f$ est alors continue sur $\\mathbb{R}$ tout entier : c'est le <strong>prolongement par continuité</strong> de $f$.</p>
    </div>

    <h3>4. Les deux grands théorèmes sur un intervalle compact $[a,b]$</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème de Weierstrass</span>
      Une fonction continue sur $[a,b]$ est bornée et <strong>atteint</strong> ses bornes : il existe $x_m, x_M \\in [a,b]$ tels que $f(x_m) = \\min f$ et $f(x_M) = \\max f$.
    </div>
    <div class="key-point">
      <span class="eyebrow">Théorème des valeurs intermédiaires (Bolzano)</span>
      Si $f$ est continue sur $[a,b]$, toute valeur $y$ comprise entre $f(a)$ et $f(b)$ est atteinte : il existe $c \\in [a,b]$ tel que $f(c) = y$. En particulier, si $f(a)f(b) \\le 0$, alors $f$ s'annule sur $[a,b]$.
    </div>
    <p>Ces deux hypothèses (continuité <em>et</em> intervalle <strong>fermé borné</strong>) sont indispensables : $f(x)=1/x$ sur $]0,1]$ n'est pas bornée, et $f(x)=x$ sur $[0,1[$ n'atteint pas son sup — dans les deux cas une des deux hypothèses manque.</p>

    <h3>5. Continuité uniforme</h3>
    <p>La continuité « simple » autorise $\\eta$ à dépendre du point $c$ ; la continuité <strong>uniforme</strong> exige un même $\\eta$ valable pour tous les points à la fois :</p>
    <div class="formula-box">$$\\forall \\varepsilon>0,\\ \\exists \\eta>0,\\ \\forall x,y \\in I,\\ |x-y|\\le\\eta \\ \\Rightarrow\\ |f(x)-f(y)|\\le\\varepsilon$$</div>
    <div class="key-point">
      <span class="eyebrow">Théorème de Heine</span>
      Sur un intervalle <strong>compact</strong>, continuité et continuité uniforme coïncident : toute fonction continue sur $[a,b]$ y est automatiquement uniformément continue. Ce n'est plus vrai sur un intervalle non compact : $f(x)=x^2$ est continue sur $\\mathbb{R}$ mais pas uniformément continue.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le théorème de Heine affirme que continuité et continuité uniforme coïncident sur un intervalle compact, mais pas en général. En quoi la compacité — le fait que l'intervalle soit à la fois fermé ET borné — joue-t-elle un rôle si particulier ici, comparé à un intervalle simplement borné mais non fermé, ou fermé mais non borné ?
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Limite d'une suite ou d'une fonction : traduire proprement avec des $\\varepsilon$ / $\\eta$</li>
        <li>Suite bornée ⟹ possède une sous-suite convergente (Bolzano-Weierstrass) ; convergente ⟺ de Cauchy</li>
        <li>$f$ continue en $c$ ⟺ $\\lim_{x\\to c} f(x) = f(c)$ ; le pont suites-fonctions permet de prouver une non-limite</li>
        <li>Sur $[a,b]$ compact : une fonction continue est bornée et atteint ses bornes (Weierstrass), et prend toute valeur intermédiaire (TVI)</li>
        <li>Sur un compact, continuité = continuité uniforme (théorème de Heine)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer Weierstrass ou le TVI sur un intervalle qui n'est pas fermé borné</li>
        <li>Confondre « $f$ admet une limite » et « $f$ est continue » : il manque l'égalité avec $f(c)$</li>
        <li>Croire que continuité entraîne automatiquement continuité uniforme (vrai seulement sur un compact)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Quelle est $\\displaystyle\\lim_{x\\to 1} \\dfrac{x^2-1}{x-1}$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an1e1" value="wrong"> Elle n'existe pas</label>
          <label class="option"><input type="radio" name="an1e1" value="wrong"> 0</label>
          <label class="option"><input type="radio" name="an1e1" value="right"> 2</label>
          <label class="option"><input type="radio" name="an1e1" value="wrong"> 1</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an1e1','an1fb1','Correct — pour x≠1, (x²-1)/(x-1) = x+1, dont la limite en 1 est 2.','Factorise x²-1 = (x-1)(x+1) et simplifie avant de passer à la limite.')">Vérifier</button>
        <div class="feedback" id="an1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">$f$ est continue sur $[0,1]$, avec $f(0) = -2$ et $f(1) = 3$. Que peut-on affirmer ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an1e2" value="wrong"> Rien, il faudrait connaître f partout</label>
          <label class="option"><input type="radio" name="an1e2" value="right"> Il existe c ∈ [0,1] tel que f(c) = 0</label>
          <label class="option"><input type="radio" name="an1e2" value="wrong"> f est strictement croissante</label>
          <label class="option"><input type="radio" name="an1e2" value="wrong"> f est bornée par 3 uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an1e2','an1fb2','Correct — 0 est compris entre f(0)=-2 et f(1)=3, le théorème des valeurs intermédiaires garantit un c où f(c)=0.','Applique le théorème des valeurs intermédiaires : toute valeur entre f(0) et f(1) est atteinte.')">Vérifier</button>
        <div class="feedback" id="an1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">$f$ est continue sur $[a,b]$ (intervalle compact). Que garantit le théorème de Weierstrass ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an1e3" value="wrong"> f est dérivable sur [a,b]</label>
          <label class="option"><input type="radio" name="an1e3" value="wrong"> f est uniquement bornée, sans plus</label>
          <label class="option"><input type="radio" name="an1e3" value="right"> f est bornée et atteint son maximum et son minimum sur [a,b]</label>
          <label class="option"><input type="radio" name="an1e3" value="wrong"> f est strictement monotone</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an1e3','an1fb3','Correct — c\\'est exactement l\\'énoncé du théorème de Weierstrass : les bornes sont non seulement finies mais atteintes.','Relis l\\'énoncé du théorème de Weierstrass : il ne dit pas seulement « bornée », il dit aussi « atteint ses bornes ».')">Vérifier</button>
        <div class="feedback" id="an1fb3"></div>
      </div>
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La rigueur epsilon-delta héritée de Cauchy et Weierstrass est aujourd'hui au cœur de disciplines qu'ils n'auraient jamais pu imaginer. En apprentissage automatique, les preuves de convergence des algorithmes d'optimisation (comme la descente de gradient, qui entraîne la quasi-totalité des réseaux de neurones modernes) reposent directement sur des notions de continuité et de régularité des fonctions — sans ces fondements rigoureux du XIXe siècle, il serait impossible de garantir mathématiquement qu'un algorithme d'apprentissage converge effectivement vers une solution.</p>
    <p><strong>Question ouverte :</strong> certaines fonctions utilisées en apprentissage automatique moderne (comme la fonction ReLU) ne sont pas dérivables partout — la théorie classique de l'analyse doit-elle être étendue pour rendre compte rigoureusement de ces cas, ou les outils existants (sous-différentiels, analyse non lisse) suffisent-ils déjà ?</p>
    <p><strong>Concept avancé :</strong> la notion de continuité se généralise, au-delà des fonctions de $\\mathbb{R}$ dans $\\mathbb{R}$ étudiées ici, à des espaces beaucoup plus abstraits (espaces métriques, espaces topologiques généraux) — un cadre unificateur qui permet, par exemple, de parler de continuité pour des fonctions entre espaces de fonctions eux-mêmes, à la base de l'analyse fonctionnelle moderne.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Intuition floue (« se rapprocher indéfiniment ») → formalisation epsilon-delta (Cauchy, Weierstrass) → définition rigoureuse de la limite et de la continuité → sur un intervalle compact : théorèmes de Weierstrass (bornes atteintes) et des valeurs intermédiaires → sur un compact : continuité = continuité uniforme (Heine)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\forall \\varepsilon>0,\\ \\exists \\eta>0,\\ \\forall x \\in I,\\ |x-c|\\le\\eta \\Rightarrow |f(x)-l|\\le\\varepsilon$$
      Cette définition, en apparence austère, est la formalisation exacte de l'intuition de « limite » : elle transforme une idée floue en un test vérifiable, point de départ de toute l'analyse rigoureuse moderne.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Cauchy et Weierstrass n'avaient jamais formalisé la notion de limite avec des epsilon : le calcul infinitésimal, tel qu'utilisé intuitivement depuis Newton et Leibniz, aurait-il pu éviter indéfiniment les paradoxes et erreurs de raisonnement qu'il engendrait parfois ?</li>
        <li>Pourquoi le théorème des valeurs intermédiaires ne garantit-il l'existence que d'un point où f prend une valeur donnée, sans en garantir l'unicité ?</li>
        <li>Quelle serait la conséquence, pour la construction rigoureuse de l'intégrale (chapitre suivant), d'une définition seulement intuitive et non rigoureuse de la continuité ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>A.-L. Cauchy, <em>Cours d'analyse de l'École royale polytechnique</em>, 1821 — l'ouvrage fondateur de la formalisation rigoureuse de la limite.</li>
        <li>K. Weierstrass, travaux sur la définition epsilon-delta de la continuité, années 1860 — l'achèvement de la rigueur moderne en analyse.</li>
        <li>J. M. Howie, <em>Real Analysis</em>, Springer Undergraduate Mathematics Series — référence pédagogique moderne sur les limites et la continuité.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais manipuler la définition epsilon-delta d'une limite et appliquer les théorèmes fondamentaux de Weierstrass et des valeurs intermédiaires. Le chapitre suivant, « Dérivabilité », construira sur ces bases rigoureuses la notion de taux de variation instantané. Comme le montre l'histoire de Cauchy et Weierstrass : donner une définition précise à une intuition, même quand elle semble déjà évidente, est souvent le pas le plus décisif vers une théorie mathématique solide.</p>
  `
};

ANALYSE_NOVA_KB[aKey('Limites et continuité')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Limites et continuité ». Demande-moi une définition (limite, continuité, compact...), donne-moi une fonction pour qu'on discute de sa limite, ou demande un indice sur un exercice.",
  rules: [
    { test:/suite/i, replies:[
      "Une suite bornée possède toujours une sous-suite convergente (Bolzano-Weierstrass), et dans R, une suite converge si et seulement si elle est de Cauchy — ça permet de prouver la convergence sans connaître la limite à l'avance."
    ]},
    { test:/limite/i, replies:[
      "La définition epsilon-eta traduit « se rapprocher indéfiniment » : pour toute marge ε aussi petite soit-elle, il existe un seuil (n0 pour une suite, η pour une fonction) au-delà duquel on reste dans cette marge.",
      "Astuce pour montrer qu'une limite n'existe PAS : trouve deux suites qui tendent vers le même point mais donnent deux limites différentes pour f — le théorème du pont suites-fonctions l'interdit si la limite existait."
    ]},
    { test:/continu/i, replies:[
      "f est continue en c quand lim_{x→c} f(x) = f(c) : il ne suffit pas que la limite existe, il faut aussi qu'elle coïncide avec la valeur réelle de f en c."
    ]},
    { test:/weierstrass/i, replies:[
      "Le théorème de Weierstrass dit qu'une fonction continue sur un intervalle FERMÉ BORNÉ [a,b] est bornée ET atteint son maximum et son minimum — les deux hypothèses (continuité + compact) sont indispensables."
    ]},
    { test:/valeurs interm[ée]diaires|tvi/i, replies:[
      "Le théorème des valeurs intermédiaires dit que si f est continue sur [a,b], toute valeur entre f(a) et f(b) est atteinte quelque part sur [a,b]. Cas particulier utile : si f(a) et f(b) sont de signes opposés, f s'annule entre les deux."
    ]},
    { test:/uniform/i, replies:[
      "La continuité uniforme exige un même η pour tous les points à la fois (pas de dépendance en c). Sur un intervalle compact, le théorème de Heine dit que continuité et continuité uniforme sont équivalentes."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : factorise le numérateur x²-1.",
      "Indice niveau 2 : x²-1 = (x-1)(x+1), donc simplifie par (x-1) avant de passer à la limite.",
      "Indice niveau 3 : la fraction vaut x+1 pour x≠1, dont la limite en 1 est 2."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : quelle valeur est comprise entre f(0)=-2 et f(1)=3 ?",
      "Indice niveau 2 : 0 est entre -2 et 3, donc quel théorème s'applique ?",
      "Indice niveau 3 : le théorème des valeurs intermédiaires garantit l'existence de c avec f(c)=0."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis précisément ce que garantit le théorème de Weierstrass, pas seulement le mot « bornée ».",
      "Indice niveau 2 : le théorème dit que les bornes sup et inf sont non seulement finies, mais atteintes.",
      "Indice niveau 3 : f est bornée et atteint son maximum et son minimum sur [a,b]."
    ]}
  ]
};

/* =========================== CHAPITRE 2 : Dérivabilité =========================== */
ANALYSE_CHAPTERS[aKey('Dérivabilité')] = {
  objectives: [
    "Définir la dérivée en un point comme limite du taux d'accroissement",
    "Calculer des dérivées à l'aide des règles de calcul et de la dérivée d'une composée",
    "Utiliser le théorème de Rolle et le théorème des accroissements finis",
    "Relier le signe de la dérivée aux variations d'une fonction",
    "Lever une forme indéterminée 0/0 avec la règle de l'Hospital",
    "Évaluer en quoi la formalisation du calcul différentiel par Newton et Leibniz, malgré leur querelle de priorité, a donné naissance à un outil mathématique universellement applicable à des domaines aussi variés que la physique, la biologie et l'économie"
  ],
  prereqs: ["Limites et continuité"],
  bodyHtml: `
    <p>Bien avant que Newton et Leibniz ne formalisent le calcul différentiel dans les années 1670-1680, le mathématicien français Pierre de Fermat avait déjà développé, dans les années 1630, une méthode empirique — qu'il appelait « adéquation » — pour trouver la tangente à une courbe en un point, préfigurant sans le savoir l'idée moderne de dérivée. L'invention indépendante du calcul différentiel par Newton en Angleterre et par Leibniz en Allemagne, presque simultanément, donna lieu à l'une des querelles de priorité scientifique les plus célèbres et les plus âpres de l'histoire des mathématiques, chacun accusant l'autre de plagiat.</p>
    <p>Au-delà de la querelle historique, la dérivée s'est imposée comme l'outil mathématique le plus universellement utilisé pour modéliser un changement instantané : vitesse d'un mobile en physique, taux de croissance d'une population en biologie, sensibilité d'un prix à une variable de marché en économie — dans chacun de ces domaines, c'est la même idée mathématique de « taux de variation instantané » qui est mobilisée.</p>
    <p>La dérivée mesure la <strong>vitesse instantanée de variation</strong> d'une fonction, et se lit géométriquement comme la pente de la tangente au graphe. C'est l'outil central pour étudier les variations d'une fonction. À la fin de ce chapitre, tu sauras calculer des dérivées à l'aide des règles de calcul et exploiter le signe de la dérivée pour étudier les variations d'une fonction.</p>

    <h3>1. Dérivée en un point</h3>
    <p>$f$ est dérivable en $x_0$ lorsque le taux d'accroissement admet une limite finie :</p>
    <div class="formula-box">$$f'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0+h) - f(x_0)}{h} = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}$$</div>
    <p>Géométriquement, $f'(x_0)$ est la pente de la <strong>tangente</strong> au graphe de $f$ au point $(x_0, f(x_0))$, dont l'équation est $y = f(x_0) + f'(x_0)(x-x_0)$.</p>
    <div class="key-point">
      <span class="eyebrow">Dérivable ⟹ continue (mais pas l'inverse !)</span>
      Si $f$ est dérivable en $x_0$ alors elle y est continue. La réciproque est fausse : $f(x)=|x|$ est continue en $0$ mais n'y est pas dérivable (dérivée à gauche $-1$, dérivée à droite $+1$, elles diffèrent).
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le fait que $|x|$ soit continue en 0 mais non dérivable montre que la continuité est une condition nécessaire mais non suffisante pour la dérivabilité. Concrètement, qu'est-ce qui, graphiquement, distingue un point où une fonction est seulement continue d'un point où elle est aussi dérivable ?
    </div>

    <h3>2. Règles de calcul et dérivées usuelles</h3>
    <table class="mini-table">
      <tr><th>$f(x)$</th><td>$x^n$</td><td>$\\sin x$</td><td>$\\cos x$</td><td>$e^x$</td><td>$\\ln x$</td><td>$\\tan x$</td></tr>
      <tr><th>$f'(x)$</th><td>$nx^{n-1}$</td><td>$\\cos x$</td><td>$-\\sin x$</td><td>$e^x$</td><td>$\\frac{1}{x}$</td><td>$1+\\tan^2 x$</td></tr>
    </table>
    <p>Pour deux fonctions dérivables $f,g$ : $(f+g)' = f'+g'$, $(fg)' = f'g+fg'$, et $\\left(\\dfrac{f}{g}\\right)' = \\dfrac{f'g - fg'}{g^2}$ (si $g \\ne 0$).</p>
    <div class="formula-box">$$(g \\circ f)'(x_0) = g'(f(x_0)) \\times f'(x_0)$$</div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> dériver $h(x) = (3x^2+1)^5$.</p>
      <p><strong>Solution :</strong> $h = g \\circ f$ avec $f(x)=3x^2+1$, $g(y)=y^5$. On a $f'(x)=6x$ et $g'(y)=5y^4$.</p>
      <p class="example-answer">$h'(x) = g'(f(x))\\,f'(x) = 5(3x^2+1)^4 \\times 6x = 30x(3x^2+1)^4$.</p>
    </div>

    <h3>3. Théorème de Rolle et théorème des accroissements finis</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème de Rolle</span>
      Si $f$ est continue sur $[a,b]$, dérivable sur $]a,b[$, et $f(a)=f(b)$, alors il existe $c \\in ]a,b[$ tel que $f'(c) = 0$ (la tangente est horizontale quelque part entre les deux).
    </div>
    <div class="key-point">
      <span class="eyebrow">Théorème des accroissements finis (TAF)</span>
      Sous les mêmes hypothèses de régularité (sans exiger $f(a)=f(b)$), il existe $c \\in ]a,b[$ tel que $f(b) - f(a) = f'(c)(b-a)$ : la pente moyenne de $f$ entre $a$ et $b$ est atteinte <em>exactement</em> par la dérivée en un point intermédiaire.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le théorème des accroissements finis garantit qu'il existe un point où la dérivée égale la pente moyenne, sans dire où se situe précisément ce point. En quoi cette garantie purement existentielle (sans indication de localisation) est-elle malgré tout suffisante pour démontrer des résultats aussi puissants que le lien entre signe de la dérivée et sens de variation ?
    </div>

    <h3>4. Signe de la dérivée et variations</h3>
    <p>Sur un intervalle $I$ où $f$ est dérivable : $f' \\ge 0 \\Leftrightarrow f$ croissante ; $f' \\le 0 \\Leftrightarrow f$ décroissante ; $f' = 0 \\Leftrightarrow f$ constante. Si $f' > 0$ sauf en un nombre fini de points où elle s'annule, $f$ reste <strong>strictement</strong> croissante.</p>

    <h3>5. Règle de l'Hospital</h3>
    <p>Si $f(a) = g(a) = 0$, $f,g$ dérivables en $a$ et $g'(a) \\ne 0$, alors :</p>
    <div class="formula-box">$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{f'(a)}{g'(a)}$$</div>
    <p>C'est l'outil de secours quand une forme $0/0$ résiste aux manipulations algébriques classiques.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>$f'(x_0) = \\lim_{h\\to0} \\frac{f(x_0+h)-f(x_0)}{h}$ = pente de la tangente en $x_0$</li>
        <li>Dérivable ⟹ continue, mais l'inverse est faux (exemple : $|x|$ en 0)</li>
        <li>Dérivée d'une composée : $(g\\circ f)' = (g'\\circ f)\\times f'$</li>
        <li>Rolle ($f(a)=f(b)$ ⟹ un point à tangente horizontale) et TAF (généralisation sans cette contrainte)</li>
        <li>Signe de $f'$ ⟺ sens de variation de $f$ ; règle de l'Hospital pour les formes 0/0</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le facteur f'(x) (dérivée de l'intérieur) en dérivant une composée</li>
        <li>Confondre « continue » et « dérivable » : la continuité n'implique pas la dérivabilité</li>
        <li>Appliquer Rolle sans vérifier f(a) = f(b)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Quelle est la dérivée de $h(x) = (3x^2+1)^5$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an2e1" value="wrong"> $5(3x^2+1)^4$</label>
          <label class="option"><input type="radio" name="an2e1" value="right"> $30x(3x^2+1)^4$</label>
          <label class="option"><input type="radio" name="an2e1" value="wrong"> $6x(3x^2+1)^4$</label>
          <label class="option"><input type="radio" name="an2e1" value="wrong"> $5(6x)^4$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an2e1','an2fb1','Correct — h = g∘f avec f(x)=3x²+1 et g(y)=y⁵ ; h\\'(x) = 5(3x²+1)⁴ × 6x = 30x(3x²+1)⁴.','N\\'oublie pas de multiplier par la dérivée de l\\'intérieur f\\'(x) = 6x.')">Vérifier</button>
        <div class="feedback" id="an2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">$f$ est continue sur $[1,3]$, dérivable sur $]1,3[$, et $f(1)=f(3)=5$. Que peut-on affirmer ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an2e2" value="wrong"> f est constante sur [1,3]</label>
          <label class="option"><input type="radio" name="an2e2" value="right"> Il existe c ∈ ]1,3[ tel que f'(c) = 0</label>
          <label class="option"><input type="radio" name="an2e2" value="wrong"> f est croissante sur [1,3]</label>
          <label class="option"><input type="radio" name="an2e2" value="wrong"> On ne peut rien affirmer</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an2e2','an2fb2','Correct — les hypothèses du théorème de Rolle sont réunies (f(1)=f(3)), donc il existe c avec f\\'(c)=0.','Les hypothèses (continue sur [1,3], dérivable sur ]1,3[, f(1)=f(3)) correspondent exactement à un théorème du cours.')">Vérifier</button>
        <div class="feedback" id="an2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Soit $f'(x) = x^2 - 4$. Sur quel intervalle $f$ est-elle décroissante ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an2e3" value="wrong"> Sur R tout entier</label>
          <label class="option"><input type="radio" name="an2e3" value="right"> Sur [-2, 2]</label>
          <label class="option"><input type="radio" name="an2e3" value="wrong"> Sur ]-∞, -2]</label>
          <label class="option"><input type="radio" name="an2e3" value="wrong"> Sur [2, +∞[</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an2e3','an2fb3','Correct — x²-4 ≤ 0 exactement sur [-2,2], donc f y est décroissante.','Résous l\\'inéquation x²-4 ≤ 0 : c\\'est là que f\\' est négative, donc f décroissante.')">Vérifier</button>
        <div class="feedback" id="an2fb3"></div>
      </div>
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La règle de dérivation d'une composée que tu viens d'apprendre — multiplier la dérivée de la fonction extérieure par celle de l'intérieur — est aujourd'hui appliquée des millions de fois par seconde dans l'entraînement des réseaux de neurones profonds, sous le nom de <strong>rétropropagation du gradient</strong> (backpropagation). Un réseau de neurones profond n'est, mathématiquement, qu'une composition de très nombreuses fonctions simples ; calculer comment une erreur de sortie doit être corrigée en amont revient à appliquer, des dizaines ou des centaines de fois de suite, exactement la règle de la dérivée d'une composée que tu as étudiée dans ce chapitre.</p>
    <p><strong>Question ouverte :</strong> les fonctions utilisées dans les réseaux de neurones modernes (comme ReLU) ne sont pas dérivables en tout point — comment les logiciels de calcul différentiel automatique contournent-ils rigoureusement ce problème pour continuer à appliquer la règle de la composée malgré ces points singuliers ?</p>
    <p><strong>Technologie émergente :</strong> la <strong>différentiation automatique</strong> (automatic differentiation), implémentée dans des bibliothèques comme PyTorch ou TensorFlow, calcule exactement (et non approximativement) la dérivée de fonctions composées de millions d'opérations élémentaires, rendant possible l'entraînement de modèles d'intelligence artificielle à très grande échelle.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Taux d'accroissement moyen (f(x)-f(x₀))/(x-x₀) → limite quand x→x₀ → dérivée f'(x₀), pente de la tangente → règles de calcul (somme, produit, composée) → signe de f' relié aux variations de f → Rolle et TAF : existence garantie d'un point à comportement remarquable
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$f'(x_0) = \\lim_{h \\to 0} \\dfrac{f(x_0+h)-f(x_0)}{h}$$
      Cette limite, héritière directe de la méthode d'adéquation de Fermat et formalisée par Newton et Leibniz, capture en une seule expression l'idée de changement instantané — le concept mathématique le plus universellement appliqué pour modéliser une évolution, de la physique à l'intelligence artificielle.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Fermat avait publié et formalisé complètement sa méthode d'adéquation dès les années 1630 : la querelle de priorité entre Newton et Leibniz aurait-elle encore eu lieu quarante ans plus tard ?</li>
        <li>Pourquoi la règle de l'Hospital exige-t-elle explicitement que $g'(a) \\neq 0$ pour être appliquée sans risque ?</li>
        <li>Quelle serait la conséquence, pour l'entraînement des réseaux de neurones modernes, d'une absence de règle de dérivation des fonctions composées ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>P. de Fermat, méthode d'adéquation pour la recherche des tangentes et des extrema, années 1630 — le précurseur direct de la notion moderne de dérivée.</li>
        <li>I. Newton, <em>Methodus Fluxionum et Serierum Infinitarum</em>, rédigé vers 1671 (publié posthume) — l'un des textes fondateurs du calcul différentiel.</li>
        <li>J. M. Howie, <em>Real Analysis</em>, Springer Undergraduate Mathematics Series — référence pédagogique moderne sur la dérivabilité.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais calculer des dérivées à l'aide des règles de calcul et exploiter le signe de la dérivée pour étudier les variations d'une fonction. Le chapitre suivant, « Étude de fonctions », te fera appliquer systématiquement ces outils pour dresser le tableau de variations complet d'une fonction. Comme le rappelle la querelle Newton-Leibniz : une même idée mathématique fondamentale peut naître presque simultanément dans des esprits différents, dès lors que les conditions intellectuelles d'une époque sont réunies pour la faire émerger.</p>
  `
};

ANALYSE_NOVA_KB[aKey('Dérivabilité')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Dérivabilité ». Demande-moi une règle de dérivation, donne-moi une fonction à dériver, ou demande un indice sur un exercice.",
  rules: [
    { test:/d[ée]riv[ée]e? d'une compos[ée]e|compos[ée]e/i, replies:[
      "Pour dériver g∘f, utilise (g∘f)'(x) = g'(f(x)) × f'(x) : on dérive la fonction extérieure, évaluée en f(x), puis on multiplie par la dérivée de l'intérieur — ne l'oublie jamais !"
    ]},
    { test:/tangente/i, replies:[
      "La tangente au graphe de f en x0 a pour équation y = f(x0) + f'(x0)(x - x0) : f(x0) donne le point de passage, f'(x0) donne la pente."
    ]},
    { test:/rolle/i, replies:[
      "Le théorème de Rolle demande : f continue sur [a,b], dérivable sur ]a,b[, et f(a)=f(b). Sous ces conditions, il existe un point c où f'(c)=0 (la tangente y est horizontale)."
    ]},
    { test:/accroissements finis|taf/i, replies:[
      "Le théorème des accroissements finis généralise Rolle sans exiger f(a)=f(b) : il existe c tel que f(b)-f(a) = f'(c)(b-a), c'est-à-dire que la pente moyenne est atteinte exactement en un point."
    ]},
    { test:/hospital/i, replies:[
      "La règle de l'Hospital sert pour une forme 0/0 : si f(a)=g(a)=0 et g'(a)≠0, alors lim f/g en a vaut f'(a)/g'(a)."
    ]},
    { test:/d[ée]rivable|continue/i, replies:[
      "Dérivable en un point entraîne continue en ce point, mais pas l'inverse : |x| est continue en 0 sans y être dérivable, car sa dérivée à gauche (-1) diffère de sa dérivée à droite (+1)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : identifie la fonction extérieure et la fonction intérieure de h(x) = (3x²+1)⁵.",
      "Indice niveau 2 : g(y)=y⁵ et f(x)=3x²+1, avec f'(x)=6x et g'(y)=5y⁴.",
      "Indice niveau 3 : h'(x) = 5(3x²+1)⁴ × 6x = 30x(3x²+1)⁴."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : vérifie les trois hypothèses d'un théorème du cours (continuité, dérivabilité, égalité des valeurs aux bords).",
      "Indice niveau 2 : f(1) = f(3), f continue sur [1,3] et dérivable sur ]1,3[ — quel théorème s'applique ?",
      "Indice niveau 3 : c'est le théorème de Rolle, qui garantit l'existence de c avec f'(c)=0."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : résous l'inéquation f'(x) ≤ 0, c'est-à-dire x² - 4 ≤ 0.",
      "Indice niveau 2 : x²-4 ≤ 0 équivaut à x² ≤ 4, donc -2 ≤ x ≤ 2.",
      "Indice niveau 3 : f est décroissante exactement sur [-2, 2]."
    ]}
  ]
};

/* =========================== CHAPITRE 3 : Étude de fonctions =========================== */
ANALYSE_CHAPTERS[aKey('Étude de fonctions')] = {
  objectives: [
    "Déterminer les extrema locaux et globaux d'une fonction dérivable",
    "Étudier la convexité d'une fonction à l'aide du signe de f''",
    "Utiliser les formules de Taylor-Lagrange et de Taylor-Young",
    "Déterminer une asymptote et la position de la courbe par rapport à celle-ci",
    "Mener une étude complète de fonction, étape par étape",
    "Évaluer en quoi la formalisation rigoureuse de la convexité par Jensen, restée un siècle durant une curiosité mathématique, est devenue l'un des concepts les plus stratégiques de l'optimisation et de l'apprentissage automatique modernes"
  ],
  prereqs: ["Dérivabilité"],
  bodyHtml: `
    <p>Lorsque Brook Taylor publia sa formule d'approximation polynomiale en 1715, elle passa presque inaperçue pendant plus d'un demi-siècle, jusqu'à ce que Joseph-Louis Lagrange, dans les années 1770, en précise rigoureusement le terme de reste — donnant naissance à la formule de Taylor-Lagrange que tu vas étudier dans ce chapitre. Un peu plus tard, en 1906, le mathématicien danois Johan Jensen formalisa la notion de fonction convexe et l'inégalité qui porte son nom, un concept resté longtemps une curiosité théorique avant de devenir, un siècle plus tard, l'un des outils les plus centraux de l'optimisation mathématique moderne.</p>
    <p>La convexité d'une fonction n'est pas qu'une propriété esthétique de sa courbe : en économie, en théorie de l'information, et surtout en apprentissage automatique, savoir qu'une fonction à minimiser est convexe garantit qu'elle possède un unique minimum global, sans risque de rester bloqué dans un minimum local trompeur — une propriété qui change radicalement la difficulté d'un problème d'optimisation.</p>
    <p>Ce chapitre rassemble les outils qui permettent de <strong>dresser le portrait complet</strong> d'une fonction : où sont ses extrema, comment sa courbe se courbe (convexité), comment elle se comporte à l'infini (asymptotes). À la fin de ce chapitre, tu sauras mener une étude complète de fonction, étape par étape, en combinant tous les outils vus depuis le début de ce cours.</p>

    <h3>1. Extrema d'une fonction</h3>
    <p>$x_0$ est un <strong>maximum local</strong> de $f$ s'il existe $\\alpha>0$ tel que $f(x) \\le f(x_0)$ pour tout $x$ proche de $x_0$ (et symétriquement pour un minimum local).</p>
    <div class="key-point">
      <span class="eyebrow">Condition nécessaire (pas suffisante !)</span>
      Si $x_0$ est un extremum local <strong>intérieur</strong> à l'intervalle et $f$ y est dérivable, alors $f'(x_0) = 0$. La réciproque est fausse : pour $f(x)=x^3$, $f'(0)=0$ mais $0$ n'est pas un extremum (c'est un point d'inflexion).
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le contre-exemple $f(x)=x^3$ en $0$ montre que $f'(x_0)=0$ n'est qu'une condition nécessaire, jamais suffisante, pour un extremum. Quelle information supplémentaire, au-delà du simple signe de $f'$ autour de $x_0$, permettrait de trancher avec certitude entre un extremum et un point d'inflexion à tangente horizontale ?
    </div>

    <p>Pour chercher les extrema d'une fonction sur un intervalle $I$ : il faut examiner les points où $f'=0$, mais aussi les bornes de $I$ et les points où $f$ n'est pas dérivable.</p>

    <h3>2. Fonctions convexes</h3>
    <p>$f$ est <strong>convexe</strong> sur $I$ lorsque, pour tous $x,y \\in I$ et $\\lambda \\in [0,1]$ : $f(\\lambda x + (1-\\lambda)y) \\le \\lambda f(x) + (1-\\lambda) f(y)$ — la corde reliant deux points du graphe reste <em>au-dessus</em> de la courbe. ($f$ est concave si $-f$ est convexe.)</p>
    <div class="key-point">
      <span class="eyebrow">Caractérisation pratique</span>
      Si $f$ est deux fois dérivable sur $I$ : $f$ est convexe sur $I$ $\\Leftrightarrow$ $f''(x) \\ge 0$ pour tout $x \\in I$. Un point où $f''$ change de signe est un <strong>point d'inflexion</strong> : la courbe traverse sa tangente.
    </div>
    <p>Exemples : $x^2$ et $e^x$ sont convexes sur $\\mathbb{R}$ ; $\\ln$ est concave sur $]0,+\\infty[$.</p>

    <h3>3. Formules de Taylor</h3>
    <p>Ces formules approximent une fonction $n$ fois dérivable par un polynôme, au voisinage d'un point :</p>
    <div class="formula-box">$$f(x_0+h) = f(x_0) + h f'(x_0) + \\frac{h^2}{2!}f''(x_0) + \\dots + \\frac{h^{n-1}}{(n-1)!}f^{(n-1)}(x_0) + \\frac{h^n}{n!}f^{(n)}(x_0+\\theta h)$$</div>
    <p>(formule de <strong>Taylor-Lagrange</strong>, avec $\\theta \\in ]0,1[$ — c'est une généralisation directe du TAF). Quand on ne cherche qu'à connaître le comportement <em>au voisinage</em> de $x_0$ (sans contrôler le reste précisément), on utilise la formule de <strong>Taylor-Young</strong>, où le dernier terme devient $h^n\\varepsilon(h)$ avec $\\varepsilon(h)\\to 0$.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La formule de Taylor-Lagrange fournit un reste exact (via un point intermédiaire inconnu), tandis que la formule de Taylor-Young se contente d'un reste qui tend vers zéro sans en préciser la forme exacte. Dans quelles situations pratiques préférerais-tu la précision de Taylor-Lagrange, et dans quelles situations la simplicité de Taylor-Young suffirait-elle amplement ?
    </div>

    <h3>4. Branches infinies et asymptotes</h3>
    <p>Si $\\lim_{x\\to\\infty} f(x) = \\ell$ (fini), la droite $y=\\ell$ est asymptote horizontale. Si $\\lim_{x\\to\\infty}\\big(f(x)-(ax+b)\\big)=0$, la droite $y=ax+b$ est asymptote oblique. Pour connaître la <strong>position de la courbe</strong> par rapport à son asymptote, on étudie le signe de $f(x)-(ax+b)$.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> asymptote de $f(x) = \\dfrac{2x+1}{x-3}$ quand $x \\to +\\infty$ ?</p>
      <p><strong>Solution :</strong> $f(x) = \\dfrac{2x+1}{x-3} = 2 + \\dfrac{7}{x-3} \\xrightarrow[x\\to\\infty]{} 2$.</p>
      <p class="example-answer">La droite $y=2$ est asymptote horizontale ; comme $\\frac{7}{x-3}>0$ pour $x$ grand, la courbe reste <strong>au-dessus</strong> de son asymptote.</p>
    </div>

    <h3>5. Méthodologie d'une étude complète</h3>
    <p>Dans l'ordre : (1) domaine de définition et parité/périodicité éventuelle, (2) calcul de $f'$ et tableau de signe/variations, (3) limites aux bornes et recherche d'asymptotes, (4) étude de la convexité via $f''$ si besoin, (5) tracé du graphe à l'aide de tous ces éléments.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Extremum local intérieur et dérivable ⟹ $f'(x_0)=0$ (condition nécessaire, pas suffisante)</li>
        <li>$f$ convexe ⟺ $f'' \\ge 0$ ; un point où $f''$ change de signe est un point d'inflexion</li>
        <li>Taylor-Lagrange : approxime $f$ par un polynôme avec un reste exact en un point intermédiaire</li>
        <li>Pour une asymptote oblique $y=ax+b$ : étudier le signe de $f(x)-(ax+b)$ donne la position de la courbe</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que f'(x0)=0 suffit à garantir un extremum (cas de x³ en 0 : c'est faux)</li>
        <li>Oublier d'étudier les bornes de l'intervalle ou les points non dérivables lors d'une recherche d'extrema</li>
        <li>Confondre le signe de f' (variations) et le signe de f'' (convexité)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour $f(x) = x^3 - 3x$, où se trouve le point d'inflexion ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an3e1" value="wrong"> En x = 1</label>
          <label class="option"><input type="radio" name="an3e1" value="wrong"> En x = -1</label>
          <label class="option"><input type="radio" name="an3e1" value="right"> En x = 0</label>
          <label class="option"><input type="radio" name="an3e1" value="wrong"> Il n'y en a pas</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an3e1','an3fb1','Correct — f\\'\\'(x) = 6x s\\'annule et change de signe en x=0 : c\\'est le point d\\'inflexion.','Calcule f\\'\\'(x) et cherche où elle change de signe : f\\'\\'(x) = 6x.')">Vérifier</button>
        <div class="feedback" id="an3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quel est le minimum de $f(x) = x^2 - 4x + 3$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an3e2" value="wrong"> En x = 0</label>
          <label class="option"><input type="radio" name="an3e2" value="right"> En x = 2</label>
          <label class="option"><input type="radio" name="an3e2" value="wrong"> En x = 4</label>
          <label class="option"><input type="radio" name="an3e2" value="wrong"> Il n'y en a pas</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an3e2','an3fb2','Correct — f\\'(x) = 2x-4 s\\'annule en x=2, et f\\'\\'(x)=2>0 : c\\'est bien un minimum.','Résous f\\'(x)=0, où f\\'(x)=2x-4, puis vérifie le signe de f\\'\\' pour confirmer un minimum.')">Vérifier</button>
        <div class="feedback" id="an3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Quelle est l'asymptote horizontale de $f(x) = \\dfrac{2x+1}{x-3}$ quand $x \\to +\\infty$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an3e3" value="wrong"> y = x</label>
          <label class="option"><input type="radio" name="an3e3" value="wrong"> y = 1</label>
          <label class="option"><input type="radio" name="an3e3" value="right"> y = 2</label>
          <label class="option"><input type="radio" name="an3e3" value="wrong"> y = 3</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an3e3','an3fb3','Correct — (2x+1)/(x-3) = 2 + 7/(x-3), qui tend vers 2 quand x tend vers l\\'infini.','Divise 2x+1 par x-3 (division suivant les puissances décroissantes) pour isoler la partie constante.')">Vérifier</button>
        <div class="feedback" id="an3fb3"></div>
      </div>
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La convexité, définie rigoureusement par Jensen en 1906, est aujourd'hui au cœur de l'entraînement de la quasi-totalité des modèles d'apprentissage automatique : lorsqu'une fonction de coût (mesurant l'erreur d'un modèle) est convexe, on peut garantir mathématiquement qu'un algorithme de descente de gradient convergera vers l'unique minimum global, sans jamais rester piégé dans un minimum local sous-optimal. Pour les réseaux de neurones profonds modernes, dont les fonctions de coût ne sont généralement pas convexes, cette garantie disparaît — un défi théorique majeur qui explique pourquoi l'entraînement de tels modèles reste, encore aujourd'hui, en partie empirique plutôt que totalement garanti mathématiquement.</p>
    <p><strong>Question ouverte :</strong> peut-on caractériser précisément les conditions (structure du réseau, choix de la fonction d'activation) sous lesquelles un problème d'optimisation non convexe se comporte malgré tout, en pratique, presque aussi bien qu'un problème convexe ?</p>
    <p><strong>Concept avancé :</strong> l'<strong>optimisation convexe</strong> est aujourd'hui un champ de recherche à part entière en mathématiques appliquées, avec des algorithmes garantissant une convergence rapide et prouvée vers l'optimum global, largement utilisés en finance quantitative, en traitement du signal et en apprentissage automatique lorsque la structure du problème le permet.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Domaine et parité → f' et tableau de variations (extrema candidats où f'=0) → limites et asymptotes aux bornes → f'' et convexité (points d'inflexion) → formules de Taylor pour approximer localement f → graphe complet
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$f(x_0+h) = f(x_0) + hf'(x_0) + \\dfrac{h^2}{2!}f''(x_0) + \\dots + \\dfrac{h^n}{n!}f^{(n)}(x_0+\\theta h)$$
      La formule de Taylor-Lagrange condense en une seule expression l'idée que toute fonction suffisamment régulière peut être approximée, au voisinage d'un point, par un polynôme dont le degré détermine la précision — le principe fondamental derrière l'essentiel du calcul numérique moderne.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Lagrange n'avait jamais précisé le terme de reste de la formule de Taylor, plus d'un demi-siècle après sa publication par Taylor : la formule serait-elle restée une simple curiosité théorique, sans application numérique fiable ?</li>
        <li>Pourquoi un point où $f''$ s'annule sans changer de signe (par exemple $f(x)=x^4$ en 0) n'est-il pas un point d'inflexion, malgré l'annulation de la dérivée seconde ?</li>
        <li>Quelle serait la conséquence, pour l'entraînement des réseaux de neurones profonds, d'une absence totale de compréhension théorique de la convexité et de la non-convexité des fonctions de coût ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>B. Taylor, <em>Methodus Incrementorum Directa et Inversa</em>, 1715 — l'ouvrage original introduisant la formule de Taylor.</li>
        <li>J. Jensen, « Sur les fonctions convexes et les inégalités entre les valeurs moyennes », Acta Mathematica, 1906 — l'article fondateur de la théorie moderne de la convexité.</li>
        <li>S. Boyd, L. Vandenberghe, <em>Convex Optimization</em>, Cambridge University Press — référence internationale sur l'optimisation convexe moderne.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais mener une étude complète de fonction, étape par étape, en combinant tous les outils vus depuis le début de ce cours. Le dernier chapitre de cette matière, « Développements limités », approfondira les formules de Taylor pour en faire un outil de calcul de limites redoutablement efficace. Comme le montre l'histoire de la convexité, restée un siècle une curiosité avant de devenir centrale à l'apprentissage automatique : une idée mathématique peut patienter très longtemps avant de trouver l'application qui révèle toute sa portée.</p>
  `
};

ANALYSE_NOVA_KB[aKey('Étude de fonctions')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Étude de fonctions ». Demande-moi une définition (extremum, convexité, asymptote...), donne-moi une fonction à étudier, ou demande un indice sur un exercice.",
  rules: [
    { test:/extremum|extr[ée]ma|maximum|minimum/i, replies:[
      "f'(x0)=0 est une condition NÉCESSAIRE pour un extremum local intérieur et dérivable, mais pas suffisante : pour f(x)=x³, f'(0)=0 sans que 0 soit un extremum. Pense aussi à vérifier les bornes de l'intervalle et les points non dérivables."
    ]},
    { test:/convexe|concave|inflexion/i, replies:[
      "f est convexe sur I quand f'' ≥ 0 sur I (la corde entre deux points reste au-dessus de la courbe). Un point d'inflexion est un point où f'' change de signe : la courbe y traverse sa tangente."
    ]},
    { test:/taylor/i, replies:[
      "Taylor-Lagrange approxime f par un polynôme avec un reste exact en un point intermédiaire θ ∈ ]0,1[. Taylor-Young donne le même polynôme mais avec un reste seulement 'petit' (o(h^n)), utile quand on ne veut connaître le comportement qu'au voisinage du point."
    ]},
    { test:/asymptote/i, replies:[
      "Pour une asymptote oblique y=ax+b, étudie lim(f(x)-(ax+b)) : si elle vaut 0, c'est ton asymptote. Le signe de f(x)-(ax+b) donne ensuite si la courbe est au-dessus ou en dessous de cette droite."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : calcule f''(x) pour f(x)=x³-3x.",
      "Indice niveau 2 : f''(x) = 6x, qui change de signe en un seul point.",
      "Indice niveau 3 : f''(x)=6x s'annule et change de signe en x=0 : c'est le point d'inflexion."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : résous f'(x)=0 pour f(x)=x²-4x+3.",
      "Indice niveau 2 : f'(x)=2x-4 s'annule en x=2 ; vérifie ensuite le signe de f''.",
      "Indice niveau 3 : f''(x)=2>0, donc x=2 est bien un minimum."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : effectue la division de 2x+1 par x-3.",
      "Indice niveau 2 : (2x+1)/(x-3) = 2 + 7/(x-3).",
      "Indice niveau 3 : quand x→+∞, 7/(x-3)→0, donc l'asymptote horizontale est y=2."
    ]}
  ]
};

/* =========================== CHAPITRE 4 : Développements limités =========================== */
ANALYSE_CHAPTERS[aKey('Développements limités')] = {
  objectives: [
    "Définir un développement limité (DL) d'ordre n en un point",
    "Connaître les DL usuels en 0 : exponentielle, sinus, cosinus, (1+x)^α, ln(1+x)",
    "Effectuer les opérations sur les DL : combinaison linéaire, produit, composition",
    "Utiliser un DL pour calculer une limite sous forme indéterminée",
    "Utiliser un DL au voisinage de l'infini pour situer une courbe par rapport à son asymptote",
    "Évaluer en quoi le développement limité, né d'une controverse philosophique sur la rigueur du calcul infinitésimal, est devenu le principe de calcul numérique concret derrière l'évaluation des fonctions transcendantes par tout ordinateur moderne"
  ],
  prereqs: ["Formules de Taylor", "Étude de fonctions"],
  bodyHtml: `
    <p>En 1742, le mathématicien écossais Colin Maclaurin publia un cas particulier de la formule de Taylor centré en zéro — le développement qui porte aujourd'hui son nom — dans le cadre d'un traité destiné à répondre aux critiques du philosophe George Berkeley contre les fondements du calcul infinitésimal, jugés à l'époque insuffisamment rigoureux. Ironie de l'histoire : ce même développement limité, longtemps un outil de démonstration théorique, est devenu depuis le milieu du XXe siècle le principe de calcul concret utilisé par toutes les calculatrices et tous les ordinateurs pour évaluer numériquement des fonctions comme sinus, cosinus ou l'exponentielle.</p>
    <p>Chaque fois qu'une calculatrice affiche la valeur de $\\sin(1{,}7)$ ou de $e^{0{,}3}$, elle ne « connaît » pas ces fonctions au sens où tu les visualises graphiquement : elle évalue en réalité un polynôme, un développement limité tronqué à un ordre suffisant pour garantir la précision numérique attendue — exactement le même outil mathématique que celui que tu vas manipuler dans ce chapitre, à la main, pour calculer des limites.</p>
    <p>Un développement limité (DL) remplace localement une fonction — même compliquée — par un <strong>polynôme</strong>, ce qui rend triviaux des calculs de limites ou d'équivalents autrement délicats. À la fin de ce chapitre, tu sauras calculer et manipuler des développements limités usuels pour lever des formes indéterminées et situer une courbe par rapport à son asymptote.</p>

    <h3>1. Définition</h3>
    <p>Un polynôme $P$ de degré $\\le n$ est un DL d'ordre $n$ en $0$ de $f$ lorsque :</p>
    <div class="formula-box">$$f(x) = P(x) + x^n \\varepsilon(x), \\qquad \\lim_{x\\to 0}\\varepsilon(x) = 0$$</div>
    <p>On note aussi $f(x) = P(x) + o(x^n)$. Un tel DL, s'il existe, est <strong>unique</strong>. La formule de Taylor-Young fournit directement le DL d'une fonction $n$ fois dérivable dont la dérivée $n$-ième est continue :</p>
    <div class="formula-box">$$f(x_0+h) = f(x_0) + hf'(x_0) + \\frac{h^2}{2!}f''(x_0) + \\dots + \\frac{h^n}{n!}f^{(n)}(x_0) + h^n\\varepsilon(h)$$</div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'unicité du développement limité d'une fonction, quand il existe, est une propriété remarquable : deux méthodes de calcul différentes (Taylor-Young, ou combinaison d'opérations sur des DL connus) doivent nécessairement conduire exactement au même polynôme. En quoi cette unicité constitue-t-elle une garantie précieuse lorsqu'on calcule un DL par plusieurs méthodes différentes pour vérifier un résultat ?
    </div>

    <h3>2. DL usuels en 0</h3>
    <table class="mini-table">
      <tr><th>Fonction</th><th>Développement limité en 0</th></tr>
      <tr><td>$e^x$</td><td>$1 + x + \\dfrac{x^2}{2!} + \\dots + \\dfrac{x^n}{n!} + o(x^n)$</td></tr>
      <tr><td>$\\sin x$</td><td>$x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\dots + o(x^{2n+2})$</td></tr>
      <tr><td>$\\cos x$</td><td>$1 - \\dfrac{x^2}{2!} + \\dfrac{x^4}{4!} - \\dots + o(x^{2n+1})$</td></tr>
      <tr><td>$(1+x)^{\\alpha}$</td><td>$1 + \\alpha x + \\dfrac{\\alpha(\\alpha-1)}{2!}x^2 + \\dots + o(x^n)$</td></tr>
      <tr><td>$\\ln(1+x)$</td><td>$x - \\dfrac{x^2}{2} + \\dfrac{x^3}{3} - \\dots + o(x^n)$</td></tr>
      <tr><td>$\\dfrac{1}{1-x}$</td><td>$1 + x + x^2 + \\dots + x^n + o(x^n)$</td></tr>
    </table>

    <h3>3. Opérations sur les DL</h3>
    <p>Si $f$ et $g$ admettent chacune un DL d'ordre $n$ en $0$, de parties polynomiales $P$ et $Q$ :</p>
    <ul style="margin-left:20px; margin-bottom:14px;">
      <li><strong>Combinaison linéaire :</strong> $\\alpha P + \\beta Q$ est le DL d'ordre $n$ de $\\alpha f + \\beta g$.</li>
      <li><strong>Produit :</strong> la <em>troncature</em> au degré $n$ de $P \\times Q$ (on jette les termes de degré $>n$) est le DL d'ordre $n$ de $fg$.</li>
      <li><strong>Composition</strong> (si $f(0)=0$) : la troncature au degré $n$ de $Q \\circ P$ donne le DL de $g \\circ f$.</li>
      <li><strong>Quotient</strong> (si $g(0)\\ne 0$) : on effectue la division de $P$ par $Q$ suivant les puissances croissantes.</li>
    </ul>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Tronquer systématiquement au degré n après un produit ou une composition de DL peut sembler une perte d'information arbitraire. En quoi cette troncature est-elle au contraire indispensable pour que le résultat final reste un DL valide et exploitable, plutôt qu'une expression polynomiale de degré incontrôlé et sans signification à l'ordre demandé ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> DL d'ordre 2 en 0 de $\\dfrac{\\cos x}{1-x}$.</p>
      <p><strong>Solution :</strong> $\\cos x = 1 - \\dfrac{x^2}{2} + x^2\\varepsilon_1(x)$ et $\\dfrac{1}{1-x} = 1+x+x^2+x^2\\varepsilon_2(x)$. On tronque le produit au degré 2 : $\\left(1-\\frac{x^2}{2}\\right)(1+x+x^2) = 1+x+x^2-\\frac{x^2}{2}+o(x^2)$.</p>
      <p class="example-answer">$\\dfrac{\\cos x}{1-x} = 1 + x + \\dfrac{x^2}{2} + o(x^2)$.</p>
    </div>

    <h3>4. Application : calcul de limites</h3>
    <p>Un DL transforme une forme indéterminée en un calcul de rapport de polynômes.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> $\\displaystyle\\lim_{x\\to 0} \\dfrac{\\sin x - x}{x^3}$.</p>
      <p><strong>Solution :</strong> $\\sin x = x - \\dfrac{x^3}{6} + x^3\\varepsilon(x)$, donc $\\sin x - x = -\\dfrac{x^3}{6} + x^3\\varepsilon(x)$.</p>
      <p class="example-answer">$\\dfrac{\\sin x - x}{x^3} \\xrightarrow[x\\to 0]{} -\\dfrac{1}{6}$.</p>
    </div>

    <h3>5. Application : position par rapport à une asymptote</h3>
    <p>Au voisinage de $+\\infty$, on pose $u = 1/x$ (qui tend vers $0$) et on cherche un DL en $u=0$ de la fonction obtenue. Le terme dominant du reste donne alors directement le <em>signe</em> de $f(x) - (ax+b)$, donc la position de la courbe par rapport à son asymptote.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>$f(x) = P(x) + o(x^n)$ : un DL remplace $f$ par un polynôme, à une erreur négligeable devant $x^n$ près</li>
        <li>Un DL, s'il existe, est unique — et la formule de Taylor-Young permet souvent de le calculer directement</li>
        <li>Produit : tronquer $P\\times Q$ au degré $n$ ; composition : tronquer $Q\\circ P$ (si $f(0)=0$)</li>
        <li>Les DL usuels (exp, sin, cos, $(1+x)^\\alpha$, $\\ln(1+x)$) sont à connaître pour composer rapidement de nouveaux DL</li>
        <li>Un DL transforme une forme indéterminée 0/0 en un simple rapport de monômes</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Garder des termes de degré supérieur à n après un produit ou une composition (il faut tronquer)</li>
        <li>Composer des DL sans vérifier que f(0)=0 (condition nécessaire pour composer proprement)</li>
        <li>Confondre le DL en 0 et le DL au voisinage de l'infini (changement de variable u=1/x nécessaire)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Quel est le DL d'ordre 2 en 0 de $\\dfrac{\\cos x}{1-x}$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an4e1" value="wrong"> $1 - x + \\frac{x^2}{2}$</label>
          <label class="option"><input type="radio" name="an4e1" value="right"> $1 + x + \\frac{x^2}{2}$</label>
          <label class="option"><input type="radio" name="an4e1" value="wrong"> $1 + x - \\frac{x^2}{2}$</label>
          <label class="option"><input type="radio" name="an4e1" value="wrong"> $1 + 2x + x^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an4e1','an4fb1','Correct — en multipliant les DL de cos x et de 1/(1-x) puis en tronquant au degré 2, on obtient 1 + x + x²/2.','Multiplie le DL de cos x (1 - x²/2) par celui de 1/(1-x) (1+x+x²), puis tronque au degré 2.')">Vérifier</button>
        <div class="feedback" id="an4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Quelle est $\\displaystyle\\lim_{x\\to 0} \\dfrac{\\sin x - x}{x^3}$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an4e2" value="wrong"> 0</label>
          <label class="option"><input type="radio" name="an4e2" value="wrong"> 1/2</label>
          <label class="option"><input type="radio" name="an4e2" value="right"> -1/6</label>
          <label class="option"><input type="radio" name="an4e2" value="wrong"> 1/6</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an4e2','an4fb2','Correct — sin x = x - x³/6 + o(x³), donc (sin x - x)/x³ → -1/6.','Utilise le DL de sin x à l\\'ordre 3 : sin x = x - x³/6 + o(x³).')">Vérifier</button>
        <div class="feedback" id="an4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $f(x) = x + 1 + \\dfrac{1}{x}$ (asymptote $y=x+1$ en $+\\infty$), la courbe est-elle au-dessus ou en dessous de son asymptote pour $x>0$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="an4e3" value="right"> Au-dessus</label>
          <label class="option"><input type="radio" name="an4e3" value="wrong"> En dessous</label>
          <label class="option"><input type="radio" name="an4e3" value="wrong"> Exactement dessus (confondues)</label>
          <label class="option"><input type="radio" name="an4e3" value="wrong"> On ne peut pas savoir</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('an4e3','an4fb3','Correct — f(x)-(x+1) = 1/x, qui est strictement positif pour x>0 : la courbe reste au-dessus de son asymptote.','Calcule f(x) - (x+1) : le signe de cette différence donne la position de la courbe par rapport à l\\'asymptote.')">Vérifier</button>
        <div class="feedback" id="an4fb3"></div>
      </div>
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Si le développement limité que tu étudies ici (centré en un seul point, précis surtout localement) reste l'outil pédagogique de référence, les bibliothèques mathématiques des ordinateurs modernes (comme la bibliothèque libm utilisée par la quasi-totalité des langages de programmation) emploient en réalité des <strong>approximations polynomiales optimisées</strong>, calculées par l'algorithme de Remez, qui minimisent l'erreur maximale sur tout un intervalle plutôt que de privilégier la précision au voisinage d'un seul point comme le fait un DL classique — un raffinement indispensable pour garantir une précision uniforme sur toute la plage de valeurs qu'une fonction comme sinus ou exponentielle doit couvrir.</p>
    <p><strong>Question ouverte :</strong> à mesure que les besoins de précision numérique augmentent (calcul scientifique de haute précision, cryptographie), quelles limites rencontre-t-on lorsqu'on cherche à approximer une fonction transcendante par un polynôme de degré raisonnable sur un intervalle de plus en plus large ?</p>
    <p><strong>Technologie émergente :</strong> l'algorithme <strong>CORDIC</strong> (COordinate Rotation DIgital Computer), conçu dans les années 1950 pour les premiers calculateurs de navigation aérienne, calcule sinus, cosinus et d'autres fonctions sans multiplication ni développement limité explicite, uniquement par une succession de rotations élémentaires — une méthode toujours utilisée aujourd'hui dans certains systèmes embarqués et circuits électroniques (FPGA) à ressources de calcul limitées.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Fonction f (potentiellement compliquée) → développement limité en un point (via Taylor-Young ou opérations sur DL connus) → polynôme approximant f localement, à o(xⁿ) près → calcul de limites indéterminées, équivalents, position par rapport à une asymptote, rendus triviaux
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$f(x) = P(x) + o(x^n)$$
      Cette écriture condense l'idée centrale du chapitre : toute fonction suffisamment régulière peut être remplacée, au voisinage d'un point et à une précision contrôlée près, par un simple polynôme — le même principe, appliqué à très grande échelle et avec des raffinements modernes, qui permet à un ordinateur de calculer numériquement sinus, cosinus ou l'exponentielle en une fraction de microseconde.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Maclaurin n'avait jamais répondu aux critiques de Berkeley sur le manque de rigueur du calcul infinitésimal : la formalisation rigoureuse des développements limités aurait-elle pu attendre encore plusieurs décennies ?</li>
        <li>Pourquoi la condition $f(0)=0$ est-elle indispensable pour composer proprement deux développements limités ?</li>
        <li>Quelle serait la conséquence, pour le calcul numérique moderne, d'une absence totale de méthode d'approximation polynomiale des fonctions transcendantes comme sinus ou l'exponentielle ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>C. Maclaurin, <em>A Treatise of Fluxions</em>, 1742 — l'ouvrage introduisant le développement en série centré en zéro qui porte son nom.</li>
        <li>J. M. Howie, <em>Real Analysis</em>, Springer Undergraduate Mathematics Series — référence pédagogique moderne sur les développements limités.</li>
        <li>J.-M. Muller, <em>Elementary Functions: Algorithms and Implementation</em>, Birkhäuser — sur les méthodes modernes de calcul numérique des fonctions transcendantes (algorithme de Remez, CORDIC).</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais calculer et manipuler des développements limités usuels pour lever des formes indéterminées et situer une courbe par rapport à son asymptote — clôturant ainsi la matière « Fonction d'une variable réelle ». Les chapitres suivants d'« Intégrales et équations différentielles » construiront sur ces mêmes outils d'approximation et de limite pour aborder le calcul intégral. Comme le montre l'histoire de Maclaurin répondant à Berkeley : une controverse philosophique sur la rigueur peut, de façon inattendue, accoucher d'un outil de calcul pratique qui traversera les siècles jusqu'à équiper chaque calculatrice de poche.</p>
  `
};

ANALYSE_NOVA_KB[aKey('Développements limités')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Développements limités ». Demande-moi un DL usuel, donne-moi une fonction pour qu'on la développe, ou demande un indice sur un exercice.",
  rules: [
    { test:/d[ée]veloppement limit[ée]|\bdl\b/i, replies:[
      "Un DL d'ordre n en 0 remplace f(x) par un polynôme P(x) à une erreur o(x^n) près : f(x) = P(x) + o(x^n). Ce DL, quand il existe, est unique.",
      "Les DL usuels à connaître par cœur : exp(x), sin(x), cos(x), (1+x)^α et ln(1+x) en 0 — ils permettent de composer rapidement le DL de fonctions plus compliquées."
    ]},
    { test:/produit|composition|composée/i, replies:[
      "Pour un produit de DL, multiplie les deux parties polynomiales puis TRONQUE au degré voulu (jette les termes de degré trop élevé). Pour une composition g∘f (si f(0)=0), fais la même chose avec les polynômes composés."
    ]},
    { test:/limite/i, replies:[
      "Un DL transforme une forme indéterminée en un simple quotient de monômes : remplace chaque fonction par son DL à l'ordre nécessaire, simplifie, puis passe à la limite."
    ]},
    { test:/asymptote/i, replies:[
      "Pour situer une courbe par rapport à son asymptote y=ax+b, calcule f(x)-(ax+b) : son signe (souvent lisible directement sur un DL) te dit si la courbe est au-dessus ou en dessous."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : prends les DL d'ordre 2 de cos x et de 1/(1-x) séparément.",
      "Indice niveau 2 : cos x = 1 - x²/2 + o(x²) et 1/(1-x) = 1+x+x²+o(x²). Multiplie-les.",
      "Indice niveau 3 : après troncature au degré 2, on obtient 1 + x + x²/2."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : quel est le DL de sin x à l'ordre 3 ?",
      "Indice niveau 2 : sin x = x - x³/6 + o(x³), donc sin x - x = -x³/6 + o(x³).",
      "Indice niveau 3 : (sin x - x)/x³ tend vers -1/6."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : calcule f(x) - (x+1).",
      "Indice niveau 2 : f(x) - (x+1) = 1/x.",
      "Indice niveau 3 : pour x>0, 1/x > 0, donc la courbe est au-dessus de son asymptote."
    ]}
  ]
};

/* fusionne le module Fonction d'une variable réelle dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, ANALYSE_CHAPTERS);
Object.assign(NOVA_KB, ANALYSE_NOVA_KB);