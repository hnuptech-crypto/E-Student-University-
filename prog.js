/* =====================================================================
   CHUNK « prog » — registre PROG_CHAPTERS / PROG_NOVA_KB
   Matière(s) : Informatique|Introduction à la programmation
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   PROG_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* ============================================================================
   MODULE INTRODUCTION À LA PROGRAMMATION — Informatique L2
   (contenu rédigé à partir du cours "Introduction à la programmation :
   le langage algorithmique", 5 chapitres)
   Structure identique aux autres modules : PROG_CHAPTERS / PROG_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const PROG_MATIERE = "Introduction à la programmation";
function progKey(chapterTitle){ return `Informatique|${PROG_MATIERE}|${chapterTitle}`; }
const PROG_CHAPTERS = {};
const PROG_NOVA_KB = {};

/* =========================== CHAPITRE 1 — Qu'est-ce qu'un algorithme ? =========================== */
PROG_CHAPTERS[progKey("Qu'est-ce qu'un algorithme ?")] = {
  objectives: [
    "Définir ce qu'est un algorithme et le distinguer d'un programme.",
    "Connaître la structure générale d'un algorithme en pseudocode.",
    "Déclarer des variables, choisir un type adapté, réaliser des affectations.",
    "Lire une donnée saisie par l'utilisateur et écrire un résultat à l'écran."
  ],
  prereqs: ["Aucun — premier chapitre du module"],
  bodyHtml: `
<h3>1.1 Algorithme, programme, langage</h3>
  <p>Un <strong>algorithme</strong> est une suite finie et ordonnée d'instructions permettant de résoudre un problème ou d'obtenir un résultat à partir de données de départ. Une recette de cuisine, un itinéraire routier ou une notice de montage sont des algorithmes au sens large : ils décrivent des étapes précises, dans un ordre précis, à partir d'ingrédients ou de données précises.</p>
  <p>En informatique, l'algorithme est écrit dans un langage indépendant de toute machine, qu'on appelle <strong>pseudocode</strong> ou <strong>langage algorithmique</strong>. Ce n'est qu'une fois l'algorithme validé qu'on le <strong>traduit</strong> dans un vrai langage de programmation (Python, C, Java…) : c'est cette traduction, exécutable par un ordinateur, qui devient un <strong>programme</strong>. Apprendre l'algorithmique avant un langage précis permet de raisonner sur la logique du problème sans se soucier de la syntaxe.</p>

  <h3>1.2 Structure générale d'un algorithme</h3>
  <p>Tout algorithme en pseudocode suit le même squelette : un en-tête qui le nomme, une zone de déclaration des variables utilisées, puis un corps qui contient les instructions exécutées dans l'ordre.</p>
  <div class="code-cap">structure générale</div>
  <div class="code-box"><span class="kw">Algorithme</span> NomDeLAlgorithme
<span class="kw">Variables</span>
    <span class="ty">nom_variable</span> : <span class="ty">Type</span>
    <span class="cm">// une ligne par variable, ou une ligne par groupe de même type</span>
<span class="kw">Début</span>
    <span class="cm">// instructions, exécutées de haut en bas</span>
<span class="kw">Fin</span></div>

  <h3>1.3 Variables et types de données</h3>
  <p>Une <strong>variable</strong> est un espace nommé en mémoire qui contient une valeur susceptible de changer au cours de l'exécution. Chaque variable possède un <strong>type</strong>, qui détermine la nature des valeurs qu'elle peut contenir et les opérations permises. Les types de base sont :</p>
  <ul>
    <li><strong>Entier</strong> : nombres sans virgule (ex. 3, -12, 0).</li>
    <li><strong>Réel</strong> : nombres à virgule (ex. 3.14, -0.5).</li>
    <li><strong>Caractère</strong> : un seul symbole (ex. 'a', '7', '?').</li>
    <li><strong>Chaîne</strong> (ou <em>chaîne de caractères</em>) : une suite de caractères (ex. "Bonjour").</li>
    <li><strong>Booléen</strong> : deux valeurs possibles seulement, <em>Vrai</em> ou <em>Faux</em>.</li>
  </ul>
  <p>La déclaration réserve l'espace mémoire et fixe le type ; elle ne donne pas encore de valeur à la variable.</p>
  <div class="code-box"><span class="kw">Variables</span>
    age : <span class="ty">Entier</span>
    taille : <span class="ty">Réel</span>
    initiale : <span class="ty">Caractère</span>
    prenom : <span class="ty">Chaîne</span>
    estMajeur : <span class="ty">Booléen</span></div>

  <h3>1.4 L'affectation</h3>
  <p>L'<strong>affectation</strong> consiste à donner (ou remplacer) la valeur d'une variable. On la note avec la flèche <span class="mono">←</span> (on trouve aussi <span class="mono">:=</span> selon les manuels) : la valeur ou l'expression à droite est calculée, puis rangée dans la variable à gauche.</p>
  <div class="code-box">age ← 20
taille ← 1.75
estMajeur ← Vrai
age ← age + 1     <span class="cm">// on lit d'abord la valeur actuelle de age, puis on la remplace</span></div>
  <p>La dernière ligne illustre un point essentiel : l'expression à droite est toujours évaluée <em>avant</em> l'affectation, avec l'ancienne valeur de la variable.</p>

  <h3>1.5 Entrées et sorties</h3>
  <p>Un algorithme communique avec l'extérieur grâce à deux instructions : <span class="mono kw">Lire</span> pour récupérer une valeur saisie par l'utilisateur et la stocker dans une variable, et <span class="mono kw">Écrire</span> pour afficher un résultat ou un message.</p>
  <div class="code-cap">exemple complet — calcul d'une moyenne de deux notes</div>
  <div class="code-box"><span class="kw">Algorithme</span> MoyenneDeuxNotes
<span class="kw">Variables</span>
    note1, note2, moyenne : <span class="ty">Réel</span>
<span class="kw">Début</span>
    Écrire("Entrez la première note : ")
    Lire(note1)
    Écrire("Entrez la deuxième note : ")
    Lire(note2)
    moyenne ← (note1 + note2) / 2
    Écrire("La moyenne est : ", moyenne)
<span class="kw">Fin</span></div>

  <h3>1.6 Trace d'exécution</h3>
  <p>Pour vérifier un algorithme à la main, on construit une <strong>trace d'exécution</strong> : un tableau qui suit l'évolution de chaque variable, ligne par ligne. Pour l'algorithme ci-dessus, avec les saisies 14 et 8 :</p>
  <table class="trace-table">
    <tr><th>Instruction</th><th>note1</th><th>note2</th><th>moyenne</th></tr>
    <tr><td>Lire(note1)</td><td>14</td><td>—</td><td>—</td></tr>
    <tr><td>Lire(note2)</td><td>14</td><td>8</td><td>—</td></tr>
    <tr><td>moyenne ← (note1+note2)/2</td><td>14</td><td>8</td><td>11</td></tr>
  </table>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un algorithme = suite finie et ordonnée d'instructions, indépendante d'un langage précis.</li>
        <li>Structure fixe : <span class="mono">Algorithme</span> → <span class="mono">Variables</span> → <span class="mono">Début</span> … <span class="mono">Fin</span>.</li>
        <li>Chaque variable a un type (Entier, Réel, Caractère, Chaîne, Booléen).</li>
        <li>L'affectation (←) évalue la droite avant de modifier la gauche.</li>
        <li><span class="mono">Lire</span> / <span class="mono">Écrire</span> gèrent les échanges avec l'utilisateur.</li>
      </ul>
    </div>
    <div class="exercises">
      <div class="exercise-card">
<span class="eyebrow">Exercice 1.1</span>
    <p>Écrire un algorithme qui lit le rayon <span class="mono">r</span> d'un cercle et affiche son périmètre (P = 2 × π × r) et son aire (A = π × r²). On prendra π ≈ 3.14159.</p>
    <details ><summary>Voir la correction</summary>
      <div class="code-box"><span class="kw">Algorithme</span> CercleRayon
<span class="kw">Variables</span>
    r, perimetre, aire : <span class="ty">Réel</span>
    pi : <span class="ty">Réel</span>
<span class="kw">Début</span>
    pi ← 3.14159
    Écrire("Rayon du cercle : ")
    Lire(r)
    perimetre ← 2 * pi * r
    aire ← pi * r * r
    Écrire("Périmètre = ", perimetre)
    Écrire("Aire = ", aire)
<span class="kw">Fin</span></div>
    </details>
      </div>
      <div class="exercise-card">
<span class="eyebrow">Exercice 1.2</span>
    <p>Écrire un algorithme qui échange les valeurs de deux variables <span class="mono">a</span> et <span class="mono">b</span> à l'aide d'une variable temporaire, puis affiche le résultat.</p>
    <details ><summary>Voir la correction</summary>
      <div class="code-box"><span class="kw">Algorithme</span> EchangeDeuxValeurs
<span class="kw">Variables</span>
    a, b, temp : <span class="ty">Entier</span>
<span class="kw">Début</span>
    a ← 5
    b ← 9
    temp ← a     <span class="cm">// on sauvegarde a avant de l'écraser</span>
    a ← b
    b ← temp
    Écrire("a = ", a, " b = ", b)
<span class="kw">Fin</span></div>
    </details>
      </div>
    </div>
  `
};

/* =========================== CHAPITRE 2 — Les structures conditionnelles =========================== */
PROG_CHAPTERS[progKey("Les structures conditionnelles")] = {
  objectives: [
    "Comprendre pourquoi un algorithme a besoin de choisir entre plusieurs chemins d'exécution.",
    "Écrire des conditions simples, imbriquées et à choix multiples.",
    "Combiner des conditions avec ET, OU, NON."
  ],
  prereqs: ["Qu'est-ce qu'un algorithme ?"],
  bodyHtml: `
<h3>2.1 Pourquoi des conditions ?</h3>
  <p>Jusqu'ici, nos algorithmes exécutaient toutes leurs instructions, dans l'ordre, sans exception. Or la plupart des problèmes réels demandent de réagir différemment selon la situation : un mot de passe est-il correct ? un nombre est-il pair ? une note est-elle suffisante pour valider un examen ? La <strong>structure conditionnelle</strong> permet de n'exécuter certaines instructions que si une condition, appelée <strong>expression booléenne</strong>, est vraie.</p>

  <h3>2.2 La condition simple : Si … Alors</h3>
  <div class="code-box"><span class="kw">Si</span> (condition) <span class="kw">Alors</span>
    <span class="cm">// instructions exécutées seulement si la condition est vraie</span>
<span class="kw">FinSi</span></div>
  <p>La condition est une expression qui s'évalue à <em>Vrai</em> ou <em>Faux</em>, construite avec les opérateurs de comparaison : <span class="mono">=</span>, <span class="mono">≠</span>, <span class="mono">&lt;</span>, <span class="mono">&gt;</span>, <span class="mono">≤</span>, <span class="mono">≥</span>.</p>
  <div class="code-box"><span class="kw">Si</span> (age ≥ 18) <span class="kw">Alors</span>
    Écrire("Vous êtes majeur")
<span class="kw">FinSi</span></div>

  <h3>2.3 Le cas contraire : Si … Alors … Sinon</h3>
  <p>Le bloc <span class="mono kw">Sinon</span> regroupe les instructions à exécuter lorsque la condition est fausse. Un seul des deux blocs est jamais exécuté.</p>
  <div class="code-box"><span class="kw">Si</span> (note ≥ 10) <span class="kw">Alors</span>
    Écrire("Admis")
<span class="kw">Sinon</span>
    Écrire("Ajourné")
<span class="kw">FinSi</span></div>

  <h3>2.4 Conditions imbriquées et Sinon Si</h3>
  <p>Pour distinguer plus de deux cas, on imbrique des conditions les unes dans les autres, ou on enchaîne des <span class="mono kw">SinonSi</span> pour rester lisible. Les conditions sont testées dans l'ordre : la première qui est vraie déclenche son bloc, les suivantes ne sont plus évaluées.</p>
  <div class="code-cap">exemple — mention selon la moyenne</div>
  <div class="code-box"><span class="kw">Algorithme</span> MentionExamen
<span class="kw">Variables</span>
    moyenne : <span class="ty">Réel</span>
<span class="kw">Début</span>
    Écrire("Moyenne obtenue : ")
    Lire(moyenne)
    <span class="kw">Si</span> (moyenne &lt; 10) <span class="kw">Alors</span>
        Écrire("Ajourné")
    <span class="kw">SinonSi</span> (moyenne &lt; 12) <span class="kw">Alors</span>
        Écrire("Passable")
    <span class="kw">SinonSi</span> (moyenne &lt; 14) <span class="kw">Alors</span>
        Écrire("Assez bien")
    <span class="kw">SinonSi</span> (moyenne &lt; 16) <span class="kw">Alors</span>
        Écrire("Bien")
    <span class="kw">Sinon</span>
        Écrire("Très bien")
    <span class="kw">FinSi</span>
<span class="kw">Fin</span></div>

  <h3>2.5 Opérateurs logiques : ET, OU, NON</h3>
  <p>On combine plusieurs conditions à l'aide des opérateurs logiques. <span class="mono kw">ET</span> exige que les deux conditions soient vraies ; <span class="mono kw">OU</span> exige qu'au moins une le soit ; <span class="mono kw">NON</span> inverse une condition.</p>
  <table class="trace-table">
    <tr><th>A</th><th>B</th><th>A ET B</th><th>A OU B</th><th>NON A</th></tr>
    <tr><td>Vrai</td><td>Vrai</td><td>Vrai</td><td>Vrai</td><td>Faux</td></tr>
    <tr><td>Vrai</td><td>Faux</td><td>Faux</td><td>Vrai</td><td>Faux</td></tr>
    <tr><td>Faux</td><td>Vrai</td><td>Faux</td><td>Vrai</td><td>Vrai</td></tr>
    <tr><td>Faux</td><td>Faux</td><td>Faux</td><td>Faux</td><td>Vrai</td></tr>
  </table>
  <div class="code-box"><span class="kw">Si</span> (age ≥ 18) <span class="kw">ET</span> (aPermis = Vrai) <span class="kw">Alors</span>
    Écrire("Peut conduire seul")
<span class="kw">FinSi</span></div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li><span class="mono">Si … Alors … Sinon … FinSi</span> choisit entre deux chemins d'exécution.</li>
        <li><span class="mono">SinonSi</span> enchaîne plusieurs cas exclusifs, testés dans l'ordre.</li>
        <li>ET / OU / NON combinent des conditions ; une table de vérité en résume le comportement.</li>
        <li>Une condition est toujours une expression qui vaut Vrai ou Faux.</li>
      </ul>
    </div>
    <div class="exercises">
      <div class="exercise-card">
<span class="eyebrow">Exercice 2.1</span>
    <p>Écrire un algorithme qui lit un entier et affiche s'il est pair ou impair (utiliser le reste de la division entière, noté MOD).</p>
    <details ><summary>Voir la correction</summary>
      <div class="code-box"><span class="kw">Algorithme</span> ParitéNombre
<span class="kw">Variables</span>
    n : <span class="ty">Entier</span>
<span class="kw">Début</span>
    Écrire("Entrez un entier : ")
    Lire(n)
    <span class="kw">Si</span> (n MOD 2 = 0) <span class="kw">Alors</span>
        Écrire(n, " est pair")
    <span class="kw">Sinon</span>
        Écrire(n, " est impair")
    <span class="kw">FinSi</span>
<span class="kw">Fin</span></div>
    </details>
      </div>
      <div class="exercise-card">
<span class="eyebrow">Exercice 2.2</span>
    <p>Écrire un algorithme qui lit trois entiers et affiche le plus grand des trois.</p>
    <details ><summary>Voir la correction</summary>
      <div class="code-box"><span class="kw">Algorithme</span> MaximumDeTrois
<span class="kw">Variables</span>
    a, b, c, max : <span class="ty">Entier</span>
<span class="kw">Début</span>
    Lire(a)
    Lire(b)
    Lire(c)
    max ← a
    <span class="kw">Si</span> (b &gt; max) <span class="kw">Alors</span>
        max ← b
    <span class="kw">FinSi</span>
    <span class="kw">Si</span> (c &gt; max) <span class="kw">Alors</span>
        max ← c
    <span class="kw">FinSi</span>
    Écrire("Le plus grand est : ", max)
<span class="kw">Fin</span></div>
    </details>
      </div>
    </div>
  `
};

/* =========================== CHAPITRE 3 — Les structures répétitives =========================== */
PROG_CHAPTERS[progKey("Les structures répétitives")] = {
  objectives: [
    "Comprendre le principe de la répétition (boucle) et son intérêt.",
    "Choisir la bonne boucle selon que le nombre d'itérations est connu ou non.",
    "Construire un accumulateur, un compteur, et détecter une boucle infinie."
  ],
  prereqs: ["Les structures conditionnelles"],
  bodyHtml: `
<h3>3.1 Pourquoi répéter ?</h3>
  <p>Beaucoup de traitements consistent à répéter la même action un certain nombre de fois : parcourir tous les élèves d'une classe, sommer cent nombres, redemander une saisie jusqu'à ce qu'elle soit valide. Réécrire l'instruction cent fois serait absurde : le langage algorithmique offre des <strong>boucles</strong> pour répéter un bloc d'instructions.</p>

  <h3>3.2 La boucle Pour : un nombre d'itérations connu</h3>
  <p>La boucle <span class="mono kw">Pour</span> répète un bloc un nombre de fois fixé à l'avance, en faisant varier automatiquement une variable appelée <strong>compteur</strong>.</p>
  <div class="code-box"><span class="kw">Pour</span> i ← 1 <span class="kw">à</span> n <span class="kw">Faire</span>
    <span class="cm">// bloc exécuté pour i = 1, puis i = 2, … , jusqu'à i = n</span>
<span class="kw">FinPour</span></div>
  <div class="code-cap">exemple — afficher les 10 premiers carrés</div>
  <div class="code-box"><span class="kw">Algorithme</span> DixPremiersCarrés
<span class="kw">Variables</span>
    i : <span class="ty">Entier</span>
<span class="kw">Début</span>
    <span class="kw">Pour</span> i ← 1 <span class="kw">à</span> 10 <span class="kw">Faire</span>
        Écrire(i, " au carré = ", i * i)
    <span class="kw">FinPour</span>
<span class="kw">Fin</span></div>

  <h3>3.3 L'accumulateur : sommer, compter, multiplier</h3>
  <p>Un <strong>accumulateur</strong> est une variable initialisée avant la boucle, puis mise à jour à chaque tour pour cumuler un résultat (somme, produit, compteur d'occurrences…). L'initialisation avant la boucle est indispensable : elle fixe la valeur de départ (0 pour une somme, 1 pour un produit).</p>
  <div class="code-cap">exemple — somme des n premiers entiers</div>
  <div class="code-box"><span class="kw">Algorithme</span> SommeNPremiersEntiers
<span class="kw">Variables</span>
    n, i, somme : <span class="ty">Entier</span>
<span class="kw">Début</span>
    Écrire("Entrez n : ")
    Lire(n)
    somme ← 0
    <span class="kw">Pour</span> i ← 1 <span class="kw">à</span> n <span class="kw">Faire</span>
        somme ← somme + i
    <span class="kw">FinPour</span>
    Écrire("La somme est : ", somme)
<span class="kw">Fin</span></div>

  <h3>3.4 La boucle TantQue : un nombre d'itérations inconnu</h3>
  <p>Quand on ne sait pas à l'avance combien de répétitions seront nécessaires — par exemple, redemander une saisie jusqu'à ce qu'elle soit correcte — on utilise <span class="mono kw">TantQue</span> : la condition est testée <em>avant</em> chaque tour, donc le bloc peut ne s'exécuter aucune fois.</p>
  <div class="code-box"><span class="kw">TantQue</span> (condition) <span class="kw">Faire</span>
    <span class="cm">// répété tant que la condition reste vraie</span>
<span class="kw">FinTantQue</span></div>
  <div class="code-cap">exemple — validation d'une saisie</div>
  <div class="code-box"><span class="kw">Algorithme</span> SaisieValidée
<span class="kw">Variables</span>
    age : <span class="ty">Entier</span>
<span class="kw">Début</span>
    Écrire("Entrez votre âge (0 à 120) : ")
    Lire(age)
    <span class="kw">TantQue</span> (age &lt; 0) <span class="kw">OU</span> (age &gt; 120) <span class="kw">Faire</span>
        Écrire("Âge invalide, recommencez : ")
        Lire(age)
    <span class="kw">FinTantQue</span>
    Écrire("Âge enregistré : ", age)
<span class="kw">Fin</span></div>
  <p><strong>Attention à la boucle infinie</strong> : si aucune instruction du bloc ne fait jamais évoluer vers une condition fausse, la boucle ne se termine jamais. Il faut toujours vérifier qu'une variable de la condition est modifiée à l'intérieur du bloc.</p>

  <h3>3.5 La boucle Répéter … JusquÀ : au moins une fois</h3>
  <p>Contrairement à <span class="mono kw">TantQue</span>, la condition de <span class="mono kw">Répéter…JusquÀ</span> est testée <em>après</em> le bloc, qui s'exécute donc toujours au moins une fois. Autre différence : elle s'arrête quand la condition devient <em>vraie</em> (et non fausse).</p>
  <div class="code-box"><span class="kw">Répéter</span>
    <span class="cm">// exécuté au moins une fois</span>
<span class="kw">JusquÀ</span> (condition)</div>

  <h3>3.6 Boucles imbriquées</h3>
  <p>On peut placer une boucle à l'intérieur d'une autre : la boucle interne s'exécute entièrement pour chaque tour de la boucle externe. C'est le principe utilisé pour parcourir un tableau à deux dimensions ou construire une table de multiplication.</p>
  <div class="code-cap">exemple — table de multiplication de 1 à 5</div>
  <div class="code-box"><span class="kw">Pour</span> i ← 1 <span class="kw">à</span> 5 <span class="kw">Faire</span>
    <span class="kw">Pour</span> j ← 1 <span class="kw">à</span> 5 <span class="kw">Faire</span>
        Écrire(i, " x ", j, " = ", i * j)
    <span class="kw">FinPour</span>
<span class="kw">FinPour</span></div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li><span class="mono">Pour</span> : nombre d'itérations connu à l'avance, compteur automatique.</li>
        <li><span class="mono">TantQue</span> : condition testée avant, 0 exécution possible.</li>
        <li><span class="mono">Répéter…JusquÀ</span> : condition testée après, au moins 1 exécution, arrêt quand la condition devient vraie.</li>
        <li>Un accumulateur doit toujours être initialisé avant la boucle.</li>
        <li>Toute boucle doit garantir qu'elle finira par se terminer.</li>
      </ul>
    </div>
    <div class="exercises">
      <div class="exercise-card">
<span class="eyebrow">Exercice 3.1</span>
    <p>Écrire un algorithme qui calcule et affiche la factorielle d'un entier n saisi par l'utilisateur (n! = 1 × 2 × … × n).</p>
    <details ><summary>Voir la correction</summary>
      <div class="code-box"><span class="kw">Algorithme</span> Factorielle
<span class="kw">Variables</span>
    n, i, produit : <span class="ty">Entier</span>
<span class="kw">Début</span>
    Écrire("Entrez n : ")
    Lire(n)
    produit ← 1
    <span class="kw">Pour</span> i ← 1 <span class="kw">à</span> n <span class="kw">Faire</span>
        produit ← produit * i
    <span class="kw">FinPour</span>
    Écrire(n, "! = ", produit)
<span class="kw">Fin</span></div>
    </details>
      </div>
      <div class="exercise-card">
<span class="eyebrow">Exercice 3.2</span>
    <p>Écrire un algorithme qui redemande un mot de passe (chaîne) jusqu'à ce que l'utilisateur saisisse exactement "algo2024".</p>
    <details ><summary>Voir la correction</summary>
      <div class="code-box"><span class="kw">Algorithme</span> DemandeMotDePasse
<span class="kw">Variables</span>
    motDePasse : <span class="ty">Chaîne</span>
<span class="kw">Début</span>
    Écrire("Mot de passe : ")
    Lire(motDePasse)
    <span class="kw">TantQue</span> (motDePasse ≠ "algo2024") <span class="kw">Faire</span>
        Écrire("Incorrect, réessayez : ")
        Lire(motDePasse)
    <span class="kw">FinTantQue</span>
    Écrire("Accès autorisé")
<span class="kw">Fin</span></div>
    </details>
      </div>
    </div>
  `
};

/* =========================== CHAPITRE 4 — Les tableaux =========================== */
PROG_CHAPTERS[progKey("Les tableaux")] = {
  objectives: [
    "Comprendre l'intérêt d'un tableau pour stocker plusieurs valeurs du même type.",
    "Déclarer, indicer et parcourir un tableau à une dimension.",
    "Écrire une recherche séquentielle et un tri simple (tri par sélection)."
  ],
  prereqs: ["Les structures répétitives"],
  bodyHtml: `
<h3>4.1 Pourquoi un tableau ?</h3>
  <p>Une variable simple ne contient qu'une seule valeur à la fois. Or on a souvent besoin de manipuler une <strong>collection</strong> de valeurs du même type : les notes d'une classe, les températures d'une semaine, les noms d'une liste d'invités. Le <strong>tableau</strong> (ou <em>array</em>) regroupe plusieurs valeurs sous un seul nom, chacune accessible par sa position, appelée <strong>indice</strong>.</p>

  <h3>4.2 Déclaration et indices</h3>
  <p>On déclare un tableau en précisant son nom, sa taille et le type des éléments qu'il contient. Dans ce cours, les indices commencent à <strong>0</strong> (convention la plus répandue) : un tableau de taille n a donc des indices allant de 0 à n-1.</p>
  <div class="code-box"><span class="kw">Variables</span>
    notes : <span class="ty">Tableau</span>[0..9] <span class="kw">de</span> <span class="ty">Réel</span>   <span class="cm">// 10 cases, indices 0 à 9</span></div>
  <div class="code-box">notes[0] ← 14.5
notes[1] ← 9
Écrire(notes[0])   <span class="cm">// affiche 14.5</span></div>

  <h3>4.3 Parcourir un tableau</h3>
  <p>Le parcours d'un tableau se fait presque toujours avec une boucle <span class="mono kw">Pour</span>, l'indice jouant le rôle de compteur.</p>
  <div class="code-cap">exemple — remplir puis afficher un tableau de n entiers</div>
  <div class="code-box"><span class="kw">Algorithme</span> RemplirEtAfficher
<span class="kw">Variables</span>
    n, i : <span class="ty">Entier</span>
    T : <span class="ty">Tableau</span>[0..99] <span class="kw">de</span> <span class="ty">Entier</span>
<span class="kw">Début</span>
    Écrire("Combien de valeurs (max 100) ? ")
    Lire(n)
    <span class="kw">Pour</span> i ← 0 <span class="kw">à</span> n - 1 <span class="kw">Faire</span>
        Écrire("Valeur ", i, " : ")
        Lire(T[i])
    <span class="kw">FinPour</span>
    <span class="kw">Pour</span> i ← 0 <span class="kw">à</span> n - 1 <span class="kw">Faire</span>
        Écrire(T[i])
    <span class="kw">FinPour</span>
<span class="kw">Fin</span></div>

  <h3>4.4 Calculs sur un tableau : somme, moyenne, maximum</h3>
  <div class="code-cap">exemple — trouver l'indice du maximum</div>
  <div class="code-box"><span class="kw">Algorithme</span> IndiceDuMaximum
<span class="kw">Variables</span>
    n, i, indiceMax : <span class="ty">Entier</span>
    T : <span class="ty">Tableau</span>[0..99] <span class="kw">de</span> <span class="ty">Entier</span>
<span class="kw">Début</span>
    <span class="cm">// on suppose T déjà rempli avec n valeurs</span>
    indiceMax ← 0
    <span class="kw">Pour</span> i ← 1 <span class="kw">à</span> n - 1 <span class="kw">Faire</span>
        <span class="kw">Si</span> (T[i] &gt; T[indiceMax]) <span class="kw">Alors</span>
            indiceMax ← i
        <span class="kw">FinSi</span>
    <span class="kw">FinPour</span>
    Écrire("Le maximum est ", T[indiceMax], " à l'indice ", indiceMax)
<span class="kw">Fin</span></div>

  <h3>4.5 La recherche séquentielle</h3>
  <p>Chercher si une valeur est présente dans un tableau, et à quel indice, se fait en parcourant les cases une à une jusqu'à trouver la valeur ou atteindre la fin du tableau. On utilise ici une variable booléenne <strong>trouvé</strong> pour pouvoir sortir logiquement de la boucle.</p>
  <div class="code-box"><span class="kw">Algorithme</span> RechercheSéquentielle
<span class="kw">Variables</span>
    n, i, valeurCherchée : <span class="ty">Entier</span>
    T : <span class="ty">Tableau</span>[0..99] <span class="kw">de</span> <span class="ty">Entier</span>
    trouvé : <span class="ty">Booléen</span>
<span class="kw">Début</span>
    <span class="cm">// on suppose T rempli avec n valeurs, valeurCherchée déjà saisie</span>
    i ← 0
    trouvé ← Faux
    <span class="kw">TantQue</span> (i &lt; n) <span class="kw">ET</span> (<span class="kw">NON</span> trouvé) <span class="kw">Faire</span>
        <span class="kw">Si</span> (T[i] = valeurCherchée) <span class="kw">Alors</span>
            trouvé ← Vrai
        <span class="kw">Sinon</span>
            i ← i + 1
        <span class="kw">FinSi</span>
    <span class="kw">FinTantQue</span>
    <span class="kw">Si</span> trouvé <span class="kw">Alors</span>
        Écrire("Trouvé à l'indice ", i)
    <span class="kw">Sinon</span>
        Écrire("Valeur absente du tableau")
    <span class="kw">FinSi</span>
<span class="kw">Fin</span></div>

  <h3>4.6 Le tri par sélection</h3>
  <p>Trier un tableau consiste à réordonner ses éléments, par exemple du plus petit au plus grand. Le <strong>tri par sélection</strong> répète le principe du 4.4 : à chaque tour, on cherche le minimum de la partie non triée et on l'échange avec la première case de cette partie.</p>
  <div class="code-box"><span class="kw">Algorithme</span> TriParSélection
<span class="kw">Variables</span>
    n, i, j, indiceMin, temp : <span class="ty">Entier</span>
    T : <span class="ty">Tableau</span>[0..99] <span class="kw">de</span> <span class="ty">Entier</span>
<span class="kw">Début</span>
    <span class="cm">// on suppose T rempli avec n valeurs</span>
    <span class="kw">Pour</span> i ← 0 <span class="kw">à</span> n - 2 <span class="kw">Faire</span>
        indiceMin ← i
        <span class="kw">Pour</span> j ← i + 1 <span class="kw">à</span> n - 1 <span class="kw">Faire</span>
            <span class="kw">Si</span> (T[j] &lt; T[indiceMin]) <span class="kw">Alors</span>
                indiceMin ← j
            <span class="kw">FinSi</span>
        <span class="kw">FinPour</span>
        temp ← T[i]
        T[i] ← T[indiceMin]
        T[indiceMin] ← temp
    <span class="kw">FinPour</span>
<span class="kw">Fin</span></div>
  <p>Trace sur T = [5, 2, 9, 1] (n = 4) :</p>
  <table class="trace-table">
    <tr><th>i</th><th>indiceMin trouvé</th><th>Tableau après échange</th></tr>
    <tr><td>0</td><td>3 (valeur 1)</td><td>1, 2, 9, 5</td></tr>
    <tr><td>1</td><td>1 (valeur 2)</td><td>1, 2, 9, 5</td></tr>
    <tr><td>2</td><td>3 (valeur 5)</td><td>1, 2, 5, 9</td></tr>
  </table>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un tableau regroupe des valeurs de même type, accessibles par indice (0 à n-1 dans ce cours).</li>
        <li>Le parcours d'un tableau s'appuie presque toujours sur une boucle <span class="mono">Pour</span>.</li>
        <li>La recherche séquentielle s'arrête dès que la valeur est trouvée, ou après avoir tout parcouru.</li>
        <li>Le tri par sélection choisit à chaque tour le minimum restant et le place à sa position finale.</li>
      </ul>
    </div>
    <div class="exercises">
      <div class="exercise-card">
<span class="eyebrow">Exercice 4.1</span>
    <p>Écrire un algorithme qui lit n notes dans un tableau et affiche leur moyenne.</p>
    <details ><summary>Voir la correction</summary>
      <div class="code-box"><span class="kw">Algorithme</span> MoyenneTableauNotes
<span class="kw">Variables</span>
    n, i : <span class="ty">Entier</span>
    T : <span class="ty">Tableau</span>[0..99] <span class="kw">de</span> <span class="ty">Réel</span>
    somme, moyenne : <span class="ty">Réel</span>
<span class="kw">Début</span>
    Écrire("Nombre de notes : ")
    Lire(n)
    <span class="kw">Pour</span> i ← 0 <span class="kw">à</span> n - 1 <span class="kw">Faire</span>
        Écrire("Note ", i, " : ")
        Lire(T[i])
    <span class="kw">FinPour</span>
    somme ← 0
    <span class="kw">Pour</span> i ← 0 <span class="kw">à</span> n - 1 <span class="kw">Faire</span>
        somme ← somme + T[i]
    <span class="kw">FinPour</span>
    moyenne ← somme / n
    Écrire("Moyenne : ", moyenne)
<span class="kw">Fin</span></div>
    </details>
      </div>
      <div class="exercise-card">
<span class="eyebrow">Exercice 4.2</span>
    <p>Écrire un algorithme qui compte combien de valeurs d'un tableau de n entiers sont supérieures à une valeur seuil saisie.</p>
    <details ><summary>Voir la correction</summary>
      <div class="code-box"><span class="kw">Algorithme</span> CompterAuDessusDuSeuil
<span class="kw">Variables</span>
    n, i, seuil, compteur : <span class="ty">Entier</span>
    T : <span class="ty">Tableau</span>[0..99] <span class="kw">de</span> <span class="ty">Entier</span>
<span class="kw">Début</span>
    <span class="cm">// on suppose T rempli avec n valeurs</span>
    Écrire("Seuil : ")
    Lire(seuil)
    compteur ← 0
    <span class="kw">Pour</span> i ← 0 <span class="kw">à</span> n - 1 <span class="kw">Faire</span>
        <span class="kw">Si</span> (T[i] &gt; seuil) <span class="kw">Alors</span>
            compteur ← compteur + 1
        <span class="kw">FinSi</span>
    <span class="kw">FinPour</span>
    Écrire(compteur, " valeur(s) au-dessus du seuil")
<span class="kw">Fin</span></div>
    </details>
      </div>
    </div>
  `
};

/* =========================== CHAPITRE 5 — Fonctions et procédures =========================== */
PROG_CHAPTERS[progKey("Fonctions et procédures")] = {
  objectives: [
    "Comprendre l'intérêt de découper un algorithme en sous-programmes.",
    "Distinguer une fonction (qui renvoie une valeur) d'une procédure (qui n'en renvoie pas).",
    "Déclarer des paramètres, distinguer passage par valeur et par référence.",
    "Découvrir la récursivité comme cas particulier de fonction."
  ],
  prereqs: ["Les tableaux"],
  bodyHtml: `
<h3>5.1 Pourquoi découper un algorithme ?</h3>
  <p>Au fil des chapitres, nos algorithmes se sont allongés. Un algorithme long et monolithique devient difficile à lire, à tester et à réutiliser. La solution est la <strong>modularité</strong> : découper le problème en <strong>sous-programmes</strong> plus petits, chacun responsable d'une seule tâche clairement identifiée, que l'on peut appeler depuis l'algorithme principal — ou depuis un autre sous-programme.</p>
  <p>On distingue deux types de sous-programmes : la <strong>fonction</strong>, qui calcule et <strong>renvoie</strong> une valeur unique, et la <strong>procédure</strong>, qui exécute une action (afficher, modifier un tableau…) sans renvoyer de valeur.</p>

  <h3>5.2 Déclarer et appeler une fonction</h3>
  <div class="code-box"><span class="kw">Fonction</span> NomFonction(param1 : Type1, param2 : Type2) : <span class="ty">TypeRetour</span>
<span class="kw">Variables</span>
    <span class="cm">// variables locales à la fonction</span>
<span class="kw">Début</span>
    <span class="cm">// instructions</span>
    <span class="kw">Retourner</span> valeur
<span class="kw">Fin</span></div>
  <p>Les <strong>paramètres</strong> (param1, param2…) sont les données que le sous-programme reçoit à chaque appel ; ils se comportent comme des variables locales déjà initialisées par l'appelant. L'instruction <span class="mono kw">Retourner</span> termine l'exécution de la fonction et transmet une valeur à l'endroit où elle a été appelée.</p>
  <div class="code-cap">exemple — fonction qui calcule un carré</div>
  <div class="code-box"><span class="kw">Fonction</span> Carré(x : <span class="ty">Entier</span>) : <span class="ty">Entier</span>
<span class="kw">Début</span>
    <span class="kw">Retourner</span> x * x
<span class="kw">Fin</span>

<span class="cm">// dans l'algorithme principal :</span>
<span class="kw">Variables</span>
    resultat : <span class="ty">Entier</span>
<span class="kw">Début</span>
    resultat ← Carré(7)   <span class="cm">// resultat vaut 49</span>
    Écrire(resultat)
<span class="kw">Fin</span></div>

  <h3>5.3 Déclarer et appeler une procédure</h3>
  <p>Une procédure a la même forme qu'une fonction, sans type de retour et sans <span class="mono kw">Retourner</span> de valeur ; on l'appelle pour son effet (afficher, modifier une variable passée par référence), pas pour récupérer un résultat.</p>
  <div class="code-cap">exemple — procédure d'affichage formaté</div>
  <div class="code-box"><span class="kw">Procédure</span> AfficherTitre(texte : <span class="ty">Chaîne</span>)
<span class="kw">Début</span>
    Écrire("=== ", texte, " ===")
<span class="kw">Fin</span>

<span class="cm">// appel :</span>
AfficherTitre("Bilan de la semaine")</div>

  <h3>5.4 Passage par valeur et passage par référence</h3>
  <p>Par défaut, un paramètre est <strong>passé par valeur</strong> : le sous-programme reçoit une <em>copie</em> de la donnée, et toute modification de cette copie n'affecte pas la variable d'origine chez l'appelant. Quand on veut qu'un sous-programme puisse modifier directement une variable de l'appelant (par exemple pour échanger deux valeurs, ou remplir un tableau), on utilise le <strong>passage par référence</strong>, noté ici avec le mot-clé <span class="mono kw">Var</span> devant le paramètre.</p>
  <div class="code-cap">exemple — échange par référence</div>
  <div class="code-box"><span class="kw">Procédure</span> Echanger(<span class="kw">Var</span> a : <span class="ty">Entier</span>, <span class="kw">Var</span> b : <span class="ty">Entier</span>)
<span class="kw">Variables</span>
    temp : <span class="ty">Entier</span>
<span class="kw">Début</span>
    temp ← a
    a ← b
    b ← temp
<span class="kw">Fin</span>

<span class="cm">// dans le programme principal, x=3 et y=8 :</span>
Echanger(x, y)   <span class="cm">// après l'appel, x=8 et y=3</span></div>
  <p>Sans le passage par référence, la procédure échangerait ses copies locales sans effet sur <span class="mono">x</span> et <span class="mono">y</span> : c'est une erreur fréquente de débutant.</p>

  <h3>5.5 Portée des variables</h3>
  <p>Une variable déclarée à l'intérieur d'un sous-programme est <strong>locale</strong> : elle n'existe que pendant l'exécution de ce sous-programme et n'est pas visible depuis l'extérieur. Cela évite les conflits de noms entre différentes parties de l'algorithme et permet de raisonner sur chaque sous-programme indépendamment du reste.</p>

  <h3>5.6 Utiliser une fonction pour organiser le chapitre 4</h3>
  <p>La modularité prend tout son sens en réutilisant les blocs des chapitres précédents. On peut par exemple réécrire la recherche séquentielle du chapitre 4 comme une fonction réutilisable :</p>
  <div class="code-box"><span class="kw">Fonction</span> Rechercher(T : <span class="ty">Tableau</span>[0..99] <span class="kw">de</span> <span class="ty">Entier</span>, n : <span class="ty">Entier</span>, valeur : <span class="ty">Entier</span>) : <span class="ty">Entier</span>
<span class="kw">Variables</span>
    i : <span class="ty">Entier</span>
<span class="kw">Début</span>
    <span class="kw">Pour</span> i ← 0 <span class="kw">à</span> n - 1 <span class="kw">Faire</span>
        <span class="kw">Si</span> (T[i] = valeur) <span class="kw">Alors</span>
            <span class="kw">Retourner</span> i    <span class="cm">// sortie immédiate de la fonction</span>
        <span class="kw">FinSi</span>
    <span class="kw">FinPour</span>
    <span class="kw">Retourner</span> -1     <span class="cm">// convention : -1 signifie "non trouvé"</span>
<span class="kw">Fin</span></div>

  <h3>5.7 Introduction à la récursivité</h3>
  <p>Une fonction est <strong>récursive</strong> lorsqu'elle s'appelle elle-même, avec un problème plus petit à chaque appel. Toute fonction récursive a besoin de deux ingrédients : un <strong>cas de base</strong> qui arrête la récursion sans nouvel appel, et un <strong>cas général</strong> qui ramène le problème vers ce cas de base.</p>
  <div class="code-cap">exemple — factorielle récursive (à comparer avec la version itérative du chapitre 3)</div>
  <div class="code-box"><span class="kw">Fonction</span> Factorielle(n : <span class="ty">Entier</span>) : <span class="ty">Entier</span>
<span class="kw">Début</span>
    <span class="kw">Si</span> (n ≤ 1) <span class="kw">Alors</span>
        <span class="kw">Retourner</span> 1            <span class="cm">// cas de base</span>
    <span class="kw">Sinon</span>
        <span class="kw">Retourner</span> n * Factorielle(n - 1)   <span class="cm">// cas général</span>
    <span class="kw">FinSi</span>
<span class="kw">Fin</span></div>
  <p>Déroulé de <span class="mono">Factorielle(4)</span> : elle appelle <span class="mono">Factorielle(3)</span>, qui appelle <span class="mono">Factorielle(2)</span>, qui appelle <span class="mono">Factorielle(1)</span> — ce dernier appel atteint le cas de base et renvoie 1 directement, sans nouvel appel. Les résultats remontent ensuite : 1, puis 2×1=2, puis 3×2=6, puis 4×6=24.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Une <strong>fonction</strong> renvoie une valeur (<span class="mono">Retourner</span>) ; une <strong>procédure</strong> exécute une action sans en renvoyer.</li>
        <li>Les paramètres sont passés <strong>par valeur</strong> (copie) par défaut, ou <strong>par référence</strong> (<span class="mono">Var</span>) pour modifier la variable de l'appelant.</li>
        <li>Une variable locale à un sous-programme n'existe que pendant son exécution.</li>
        <li>Une fonction récursive a besoin d'un cas de base et d'un cas général qui s'en rapproche.</li>
      </ul>
    </div>
    <div class="exercises">
      <div class="exercise-card">
<span class="eyebrow">Exercice 5.1</span>
    <p>Écrire une fonction <span class="mono">EstPremier(n : Entier) : Booléen</span> qui renvoie Vrai si n est un nombre premier, Faux sinon.</p>
    <details ><summary>Voir la correction</summary>
      <div class="code-box"><span class="kw">Fonction</span> EstPremier(n : <span class="ty">Entier</span>) : <span class="ty">Booléen</span>
<span class="kw">Variables</span>
    i : <span class="ty">Entier</span>
<span class="kw">Début</span>
    <span class="kw">Si</span> (n &lt; 2) <span class="kw">Alors</span>
        <span class="kw">Retourner</span> Faux
    <span class="kw">FinSi</span>
    <span class="kw">Pour</span> i ← 2 <span class="kw">à</span> n - 1 <span class="kw">Faire</span>
        <span class="kw">Si</span> (n MOD i = 0) <span class="kw">Alors</span>
            <span class="kw">Retourner</span> Faux
        <span class="kw">FinSi</span>
    <span class="kw">FinPour</span>
    <span class="kw">Retourner</span> Vrai
<span class="kw">Fin</span></div>
    </details>
      </div>
      <div class="exercise-card">
<span class="eyebrow">Exercice 5.2</span>
    <p>Écrire une fonction récursive <span class="mono">Puissance(base : Entier, exposant : Entier) : Entier</span> qui calcule base<sup>exposant</sup> (on suppose exposant ≥ 0).</p>
    <details ><summary>Voir la correction</summary>
      <div class="code-box"><span class="kw">Fonction</span> Puissance(base : <span class="ty">Entier</span>, exposant : <span class="ty">Entier</span>) : <span class="ty">Entier</span>
<span class="kw">Début</span>
    <span class="kw">Si</span> (exposant = 0) <span class="kw">Alors</span>
        <span class="kw">Retourner</span> 1                              <span class="cm">// cas de base</span>
    <span class="kw">Sinon</span>
        <span class="kw">Retourner</span> base * Puissance(base, exposant - 1)  <span class="cm">// cas général</span>
    <span class="kw">FinSi</span>
<span class="kw">Fin</span></div>
    </details>
      </div>
    </div>
  `
};
PROG_NOVA_KB[progKey("Qu'est-ce qu'un algorithme ?")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Qu'est-ce qu'un algorithme ? ». Demande-moi ce qu'est une variable, un type, l'affectation, ou un indice sur un exercice.",
  rules: [
    { test:/algorithme.*programme|diff[ée]rence.*algorithme/i, replies:["Un algorithme est indépendant de tout langage : c'est la logique du problème, écrite en pseudocode. Un programme, lui, est la traduction de cet algorithme dans un vrai langage (Python, C, Java…), exécutable par un ordinateur."] },
    { test:/variable/i, replies:["Une variable est un espace nommé en mémoire qui contient une valeur susceptible de changer. Chaque variable a un type qui détermine ce qu'elle peut contenir : Entier, Réel, Caractère, Chaîne ou Booléen."] },
    { test:/affectation|fl[eè]che/i, replies:["L'affectation (←) évalue d'abord l'expression à droite avec les valeurs actuelles, puis range le résultat dans la variable à gauche. C'est pour ça que 'age ← age + 1' fonctionne : on lit l'ancien age avant de le remplacer."] },
    { test:/type/i, replies:["Les types de base sont Entier (sans virgule), Réel (avec virgule), Caractère (un seul symbole), Chaîne (suite de caractères) et Booléen (Vrai ou Faux)."] },
    { test:/lire|[ée]crire|entr[ée]e|sortie/i, replies:["Lire(variable) récupère une valeur saisie par l'utilisateur et la stocke. Écrire(...) affiche un résultat ou un message à l'écran."] },
    { test:/trace/i, replies:["Une trace d'exécution est un tableau qui suit, ligne par ligne, l'évolution de chaque variable — c'est le meilleur moyen de vérifier un algorithme à la main avant de le coder."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense aux formules P = 2πr et A = πr², avec une variable pour π.", "Indice niveau 2 : déclare r, perimetre, aire et pi en Réel.", "Indice niveau 3 : perimetre ← 2 * pi * r puis aire ← pi * r * r."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : il faut une variable temporaire pour ne pas perdre la valeur de a.", "Indice niveau 2 : temp ← a, puis a ← b.", "Indice niveau 3 : enfin b ← temp — les trois lignes dans cet ordre exact."] }
  ]
};

PROG_NOVA_KB[progKey("Les structures conditionnelles")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Les structures conditionnelles ». Demande-moi comment fonctionne Si...Alors...Sinon, SinonSi, ou les opérateurs ET/OU/NON.",
  rules: [
    { test:/si.*alors.*sinon|condition simple/i, replies:["Si (condition) Alors ... Sinon ... FinSi exécute le premier bloc si la condition est Vraie, sinon le second. Un seul des deux blocs est jamais exécuté."] },
    { test:/sinonsi/i, replies:["SinonSi enchaîne plusieurs cas exclusifs, testés dans l'ordre : dès qu'une condition est vraie, son bloc s'exécute et les suivantes ne sont plus testées."] },
    { test:/\bet\b|\bou\b|\bnon\b|op[ée]rateur.*logique/i, replies:["ET exige que les deux conditions soient vraies, OU qu'au moins une le soit, NON inverse une condition. Une table de vérité résume les 4 combinaisons possibles."] },
    { test:/bool[ée]en|expression.*bool[ée]enne/i, replies:["Une expression booléenne est une condition qui s'évalue toujours à Vrai ou Faux, construite avec les opérateurs de comparaison (=, ≠, <, >, ≤, ≥)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise MOD pour tester la parité.", "Indice niveau 2 : Si (n MOD 2 = 0) Alors ... Sinon ...", "Indice niveau 3 : n MOD 2 = 0 signifie pair, sinon impair."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : initialise max avec la première valeur, puis compare les deux autres une à une.", "Indice niveau 2 : max ← a, puis Si (b > max) Alors max ← b.", "Indice niveau 3 : répète le même test pour c."] }
  ]
};

PROG_NOVA_KB[progKey("Les structures répétitives")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Les structures répétitives ». Demande-moi la différence entre Pour, TantQue et Répéter…JusquÀ, ou un indice sur un exercice.",
  rules: [
    { test:/boucle pour|\bpour\b.*boucle/i, replies:["La boucle Pour répète un bloc un nombre de fois fixé à l'avance, avec un compteur qui varie automatiquement : Pour i ← 1 à n Faire ... FinPour."] },
    { test:/tantque/i, replies:["TantQue teste la condition AVANT chaque tour : le bloc peut donc s'exécuter zéro fois si la condition est fausse dès le départ. Utile quand on ne connaît pas le nombre d'itérations à l'avance."] },
    { test:/r[ée]p[ée]ter.*jusqu|jusqu.?[àa]/i, replies:["Répéter…JusquÀ teste la condition APRÈS le bloc : celui-ci s'exécute donc toujours au moins une fois, et la boucle s'arrête quand la condition devient vraie (pas fausse, contrairement à TantQue)."] },
    { test:/accumulateur/i, replies:["Un accumulateur est une variable initialisée AVANT la boucle (0 pour une somme, 1 pour un produit), puis mise à jour à chaque tour pour cumuler un résultat."] },
    { test:/boucle infinie/i, replies:["Une boucle infinie survient quand rien à l'intérieur du bloc ne fait évoluer la condition vers Faux (pour TantQue). Vérifie toujours qu'une variable de la condition change dans le corps de la boucle."] },
    { test:/boucle imbriqu[ée]e/i, replies:["Une boucle imbriquée s'exécute entièrement, à chaque tour de la boucle externe — c'est le principe utilisé pour parcourir un tableau 2D ou construire une table de multiplication."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : produit ← 1 avant la boucle, c'est un accumulateur multiplicatif.", "Indice niveau 2 : Pour i ← 1 à n Faire produit ← produit * i.", "Indice niveau 3 : n'oublie pas d'initialiser produit à 1, pas à 0 !"] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le nombre de saisies n'est pas connu à l'avance — c'est TantQue qu'il faut.", "Indice niveau 2 : TantQue (motDePasse ≠ \"algo2024\") Faire ...", "Indice niveau 3 : redemande la saisie à l'intérieur du bloc TantQue, sinon boucle infinie."] }
  ]
};

PROG_NOVA_KB[progKey("Les tableaux")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Les tableaux ». Demande-moi comment déclarer, parcourir, chercher ou trier un tableau.",
  rules: [
    { test:/tableau/i, replies:["Un tableau regroupe plusieurs valeurs du même type sous un seul nom, chacune accessible par son indice. Dans ce cours, les indices vont de 0 à n-1."] },
    { test:/indice/i, replies:["L'indice est la position d'un élément dans le tableau. Pour un tableau de taille n déclaré avec des indices 0 à n-1, le premier élément est T[0] et le dernier T[n-1]."] },
    { test:/parcour/i, replies:["Parcourir un tableau se fait presque toujours avec une boucle Pour, l'indice jouant le rôle de compteur : Pour i ← 0 à n-1 Faire ... utilise T[i]."] },
    { test:/recherche s[ée]quentielle/i, replies:["La recherche séquentielle parcourt le tableau case par case jusqu'à trouver la valeur (ou atteindre la fin). On utilise souvent une variable booléenne 'trouvé' pour savoir si on peut s'arrêter."] },
    { test:/tri.*s[ée]lection|tri par s[ée]lection/i, replies:["Le tri par sélection cherche, à chaque tour, le minimum de la partie non triée et l'échange avec la première case de cette partie — répété jusqu'à la fin du tableau."] },
    { test:/maximum|indice.*max/i, replies:["Pour trouver l'indice du maximum : initialise indiceMax à 0, puis compare chaque T[i] suivant à T[indiceMax], en mettant à jour indiceMax si T[i] est plus grand."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : remplis d'abord le tableau, puis fais une seconde boucle pour sommer.", "Indice niveau 2 : somme ← 0 avant la boucle, puis somme ← somme + T[i].", "Indice niveau 3 : moyenne ← somme / n, à calculer après la boucle."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : c'est un compteur, pas une somme.", "Indice niveau 2 : compteur ← 0, puis Si (T[i] > seuil) Alors compteur ← compteur + 1.", "Indice niveau 3 : parcours tout le tableau avec une boucle Pour de 0 à n-1."] }
  ]
};

PROG_NOVA_KB[progKey("Fonctions et procédures")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Fonctions et procédures ». Demande-moi la différence entre les deux, le passage par référence, ou la récursivité.",
  rules: [
    { test:/diff[ée]rence.*fonction.*proc[ée]dure|fonction.*proc[ée]dure/i, replies:["Une fonction renvoie une valeur avec Retourner ; une procédure exécute une action (afficher, modifier) sans rien renvoyer. On appelle une fonction pour son résultat, une procédure pour son effet."] },
    { test:/param[èe]tre/i, replies:["Les paramètres sont les données reçues par le sous-programme à chaque appel — ils se comportent comme des variables locales déjà initialisées par l'appelant."] },
    { test:/passage par r[ée]f[ée]rence|passage par valeur|\bvar\b.*param/i, replies:["Par défaut un paramètre est passé par valeur (le sous-programme reçoit une copie ; modifier la copie n'affecte pas l'original). Le passage par référence (mot-clé Var) permet au sous-programme de modifier directement la variable de l'appelant."] },
    { test:/port[ée]e/i, replies:["Une variable locale à un sous-programme n'existe que pendant son exécution et n'est pas visible depuis l'extérieur — cela évite les conflits de noms entre parties de l'algorithme."] },
    { test:/r[ée]cursi/i, replies:["Une fonction récursive s'appelle elle-même avec un problème plus petit. Elle a besoin de deux ingrédients : un cas de base qui arrête la récursion, et un cas général qui s'en rapproche."] },
    { test:/cas de base/i, replies:["Le cas de base arrête la récursion sans nouvel appel — sans lui, la fonction s'appellerait indéfiniment. Dans Factorielle, c'est Si (n ≤ 1) Alors Retourner 1."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : un nombre est premier s'il n'a aucun diviseur entre 2 et n-1.", "Indice niveau 2 : boucle Pour i ← 2 à n-1, et teste n MOD i = 0.", "Indice niveau 3 : dès qu'un diviseur est trouvé, Retourner Faux immédiatement."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : c'est récursif, donc pense au cas de base d'abord.", "Indice niveau 2 : Si (exposant = 0) Alors Retourner 1.", "Indice niveau 3 : sinon Retourner base * Puissance(base, exposant - 1)."] }
  ]
};

Object.assign(MATH_TOOLS_CHAPTERS, PROG_CHAPTERS);
Object.assign(NOVA_KB, PROG_NOVA_KB);