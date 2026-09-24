/* =====================================================================
   CHUNK « integ » — registre INTEG_CHAPTERS / INTEG_NOVA_KB
   Matière(s) : Mathématiques|Intégrales et équations différentielles
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   INTEG_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ============================================================================
   MODULE INTÉGRALES ET ÉQUATIONS DIFFÉRENTIELLES — Mathématiques L1
   (contenu rédigé à partir du cours MTH 1121, FAST-UAC — Techniques d'intégration
   des fonctions continues, et Équations différentielles)
   Structure identique aux autres modules : INTEG_CHAPTERS / INTEG_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const INTEG_MATIERE = 'Intégrales et équations différentielles';
function integKey(chapterTitle){ return `Mathématiques|${INTEG_MATIERE}|${chapterTitle}`; }
const INTEG_CHAPTERS = {};
const INTEG_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Somme de Riemann : convergence vers l'intégrale définie (Chapitre 1)
--------------------------------------------------------------------------------- */
function updateIntegRiemann(){
  const n = parseInt(document.getElementById('integRiemannN').value);
  document.getElementById('integRiemannNVal').textContent = n;
  const a=0, b=4, dx=(b-a)/n;
  const f = x => x*x/10+1;
  const toSvgX = x => 20+x*35, toSvgY = y => 140-y*35;
  const container = document.getElementById('integRiemannBars');
  while(container.firstChild) container.removeChild(container.firstChild);
  let sum = 0;
  const svgNS = "http://www.w3.org/2000/svg";
  for(let i=0;i<n;i++){
    const x0 = a+i*dx;
    const h = f(x0);
    sum += h*dx;
    const rx = toSvgX(x0), rw = dx*35, ry = toSvgY(h), rh = 140-ry;
    const rect = document.createElementNS(svgNS,'rect');
    rect.setAttribute('x', rx); rect.setAttribute('y', ry);
    rect.setAttribute('width', rw); rect.setAttribute('height', rh);
    rect.setAttribute('fill', '#4C7CFF'); rect.setAttribute('opacity', '0.35');
    rect.setAttribute('stroke', '#4C7CFF'); rect.setAttribute('stroke-width', '1');
    container.appendChild(rect);
  }
  const exact = 64/30+4;
  document.getElementById('integRiemannReadout').innerHTML =
    `Somme de Riemann à gauche, n = ${n} rectangles : <strong>${sum.toFixed(4)}</strong><br>` +
    `Valeur exacte de l'intégrale : ${exact.toFixed(4)}<br>` +
    `Écart : ${Math.abs(sum-exact).toFixed(4)} — plus n augmente, plus la figure en escalier colle à l'aire réelle sous la courbe.`;
}
function initIntegRiemann(){ updateIntegRiemann(); }

/* =========================== CHAPITRE 1 — Primitives et intégrale indéfinie =========================== */
INTEG_CHAPTERS[integKey('Primitives et intégrale indéfinie')] = {
  objectives: [
    "Définir une primitive et une intégrale indéfinie, et utiliser leur propriété de linéarité",
    "Utiliser le tableau des intégrales usuelles pour calculer une primitive directe",
    "Appliquer un changement de variable simple (f(ax+b), ou reconnaître qu'un facteur est la différentielle de l'autre)",
    "Comprendre l'intégrale définie comme la limite d'une somme de Riemann",
    "Évaluer en quoi le lien entre primitive et intégrale définie — le théorème fondamental de l'analyse — rend le calcul intégral praticable, comparé au calcul direct d'une aire par somme de Riemann"
  ],
  prereqs: ["Fonction d'une variable réelle"],
  bodyHtml: `
    <p>Le symbole $\\int$, que tu utiliseras tout au long de ce chapitre, fut inventé par Gottfried Wilhelm Leibniz dans les années 1670 : une lettre S stylisée, abréviation du mot latin <em>summa</em> (somme), rappelant que l'intégrale est fondamentalement une somme — celle d'une infinité de rectangles infiniment fins. Il fallut cependant attendre près de deux siècles, et les travaux de Bernhard Riemann en 1854, pour que cette idée intuitive de « somme d'aires » reçoive une définition rigoureuse, sous la forme de la somme de Riemann que tu vas étudier dans ce chapitre.</p>
    <p>Le lien entre primitive (l'opération inverse de la dérivation) et intégrale définie (une aire, une limite de somme) n'a rien d'évident a priori — ce sont deux idées géométriquement très différentes. C'est précisément ce lien, découvert indépendamment par Newton et Leibniz et connu aujourd'hui sous le nom de <strong>théorème fondamental de l'analyse</strong>, qui rend le calcul intégral praticable : sans lui, il faudrait calculer chaque aire directement par une somme de Riemann, un procédé bien plus laborieux que de chercher une primitive.</p>
    <p>L'intégration est l'opération inverse de la dérivation : on part d'une fonction et on cherche celle dont elle est la dérivée. Ce chapitre pose les bases (primitive, intégrale indéfinie, intégrale définie) puis les deux premières techniques de calcul : le tableau des intégrales usuelles et le changement de variable simple. À la fin de ce chapitre, tu sauras calculer des primitives usuelles et justifier le lien entre primitive et aire sous une courbe.</p>

    <h3>1. Primitive et intégrale indéfinie</h3>
    <p>Soit $f(x)$ la dérivée de $F(x)$, c'est-à-dire $dF(x) = f(x)\\,dx$. $F(x)$ est appelée une <strong>primitive</strong> de $f(x)$.</p>
    <p><strong>Exemple :</strong> $3x^2$ est la dérivée de $x^3$, i.e. $d(x^3) = 3x^2 dx$ ; la fonction $x^3$ est donc une primitive de $3x^2$.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Toute fonction continue $f(x)$ possède une <strong>infinité</strong> de primitives : si $F(x)$ est l'une d'entre elles, n'importe quelle autre s'écrit $F(x)+c$, où $c$ est une constante arbitraire. Ainsi $3x^2$ a pour primitives $x^3+c$, pour tout $c\\in\\mathbb{R}$.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Toute fonction continue possède une infinité de primitives, qui ne diffèrent entre elles que par une constante additive. En quoi cette liberté sur la constante — qui peut sembler une imprécision gênante — devient-elle au contraire un outil utile dès qu'on connaît une condition supplémentaire (une valeur particulière) permettant de la déterminer ?
    </div>

    <p>L'<strong>intégrale indéfinie</strong> de $f(x)dx$ est la forme la plus générale de sa primitive, notée $\\int f(x)\\,dx$ (la constante $c$ est sous-entendue dans cette notation). Dans $f(x)dx$, $f(x)$ est la <em>fonction à intégrer</em>, $x$ la <em>variable d'intégration</em> ; rechercher l'intégrale indéfinie s'appelle <strong>l'intégration</strong>.</p>

    <h3>2. Intégrale définie : la somme de Riemann</h3>
    <p>Pour trouver l'aire sous une courbe $\\widehat{MN}$ entre $a$ et $b$, on découpe $[a,b]$ en $n$ parties (égales ou non) via les points $a,x_1,x_2,\\dots,x_{n-1},b$, et on approche l'aire par une figure « en escalier » :</p>
    <div class="formula-box">$$A = y_0(x_1-a) + y_1(x_2-x_1) + \\dots + y_{n-1}(b-x_{n-1}) = \\sum_{j=0}^{n-1} y_j\\,dx_j$$</div>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 200 150" width="100%">
          <line x1="15" y1="140" x2="185" y2="140" stroke="#3A4658" stroke-width="1"/>
          <line x1="20" y1="20" x2="20" y2="140" stroke="#3A4658" stroke-width="1"/>
          <polyline points="20.0,105.0 27.0,104.9 34.0,104.4 41.0,103.7 48.0,102.8 55.0,101.5 62.0,100.0 69.0,98.1 76.0,96.0 83.0,93.7 90.0,91.0 97.0,88.1 104.0,84.8 111.0,81.3 118.0,77.6 125.0,73.5 132.0,69.2 139.0,64.5 146.0,59.6 153.0,54.5 160.0,49.0" stroke="#F0B94D" stroke-width="1.8" fill="none"/>
          <rect x="20" y="105" width="35" height="35" fill="#4C7CFF" opacity="0.3" stroke="#4C7CFF"/>
          <rect x="55" y="101.5" width="35" height="38.5" fill="#4C7CFF" opacity="0.3" stroke="#4C7CFF"/>
          <rect x="90" y="91" width="35" height="49" fill="#4C7CFF" opacity="0.3" stroke="#4C7CFF"/>
          <rect x="125" y="73.5" width="35" height="66.5" fill="#4C7CFF" opacity="0.3" stroke="#4C7CFF"/>
          <text x="55" y="12" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">y = f(x)</text>
        </svg>
        <span>La figure en escalier (rectangles) approche l'aire réelle sous la courbe ; l'approximation s'améliore quand n augmente</span>
      </div>
    </div>
    <p>Quand $n\\to+\\infty$, cette somme tend vers $A$. Cette limite, notée $\\int_a^b y\\,dx$ (le symbole $\\int$ est la première lettre stylisée du mot latin <em>summa</em>, « somme »), s'appelle <strong>intégrale définie</strong>. Ainsi : l'intégrale indéfinie est une <strong>fonction</strong>, tandis que l'intégrale définie est un <strong>nombre</strong>.</p>

    <h3>3. Calcul de la constante d'intégration</h3>
    <p>Parmi l'infinité de primitives d'une fonction $f(x)$, une seule prend une valeur donnée $b$ pour une valeur donnée $a$ de $x$. Si $\\int f(x)dx = F(x)+c$, la constante $c$ se trouve grâce à la relation $b = F(a)+c$.</p>

    <h3>4. Propriétés de l'intégration indéfinie</h3>
    <table class="mini-table">
      <tr><th>Propriété</th><th>Énoncé</th></tr>
      <tr><td>La différentielle « efface » la somme</td><td>$d\\displaystyle\\int f(x)dx = f(x)dx$, donc $\\dfrac{d}{dx}\\displaystyle\\int f(x)dx = f(x)$</td></tr>
      <tr><td>La somme « efface » la différentielle</td><td>$\\displaystyle\\int d\\varphi(x) = \\varphi(x)+c$ (ex. $\\int d(\\sin x) = \\sin x + c$)</td></tr>
      <tr><td>Facteur constant</td><td>$\\displaystyle\\int a f(x)dx = a\\displaystyle\\int f(x)dx$</td></tr>
      <tr><td>Linéarité (somme finie de termes)</td><td>$\\displaystyle\\int\\big(f_1+\\dots+f_n\\big)dx = \\displaystyle\\int f_1 dx+\\dots+\\displaystyle\\int f_n dx$</td></tr>
    </table>

    <h3>5. Tableau des intégrales usuelles</h3>
    <table class="mini-table">
      <tr><td>$\\displaystyle\\int x^n dx = \\dfrac{x^{n+1}}{n+1}+c\\ (n\\neq-1)$</td><td>$\\displaystyle\\int \\dfrac{dx}{x} = \\ln|x|+c$</td></tr>
      <tr><td>$\\displaystyle\\int e^x dx = e^x+c$</td><td>$\\displaystyle\\int a^x dx = \\dfrac{a^x}{\\ln a}+c\\ (a\\neq1,a>0)$</td></tr>
      <tr><td>$\\displaystyle\\int \\sin x\\,dx = -\\cos x+c$</td><td>$\\displaystyle\\int \\cos x\\,dx = \\sin x+c$</td></tr>
      <tr><td>$\\displaystyle\\int \\dfrac{dx}{\\sin^2 x} = -\\cot x+c$</td><td>$\\displaystyle\\int \\dfrac{dx}{\\cos^2 x} = \\tan x+c$</td></tr>
      <tr><td>$\\displaystyle\\int \\dfrac{dx}{\\sqrt{1-x^2}} = \\arcsin x+c$</td><td>$\\displaystyle\\int \\dfrac{dx}{\\sqrt{a^2-x^2}} = \\arcsin\\dfrac{x}{a}+c$</td></tr>
      <tr><td>$\\displaystyle\\int \\dfrac{dx}{1+x^2} = \\arctan x+c$</td><td>$\\displaystyle\\int \\dfrac{dx}{a^2+x^2} = \\dfrac{1}{a}\\arctan\\dfrac{x}{a}+c$</td></tr>
      <tr><td>$\\displaystyle\\int \\dfrac{dx}{\\sqrt{x^2\\pm a^2}} = \\ln\\big|x+\\sqrt{x^2\\pm a^2}\\big|+c$</td><td>$\\displaystyle\\int \\tan x\\,dx = -\\ln|\\cos x|+c$</td></tr>
      <tr><td>$\\displaystyle\\int \\cot x\\,dx = \\ln|\\sin x|+c$</td><td>$\\displaystyle\\int \\dfrac{dx}{\\sin x} = \\ln\\Big|\\tan\\dfrac{x}{2}\\Big|+c$</td></tr>
      <tr><td>$\\displaystyle\\int \\dfrac{dx}{\\cos x} = \\ln\\Big|\\tan\\big(\\dfrac{x}{2}+\\dfrac{\\pi}{4}\\big)\\Big|+c$</td><td>$\\displaystyle\\int \\dfrac{dx}{x^2-a^2} = \\dfrac{1}{2a}\\ln\\Big|\\dfrac{x-a}{x+a}\\Big|+c$</td></tr>
    </table>

    <h3>6. Changement de variable simple</h3>
    <p><strong>Règle 1 :</strong> si la fonction à intégrer est de la forme $f(ax+b)$, la substitution $ax+b=z$ est utile.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> calculer $\\displaystyle\\int \\sqrt{2x-1}\\,dx$.</p>
      <p><strong>Solution :</strong> $d(2x-1)=2\\,dx$. On introduit le facteur 2 devant $dx$, compensé par $\\frac{1}{2}$ devant l'intégrale : $\\frac{1}{2}\\displaystyle\\int (2x-1)^{1/2}\\cdot 2\\,dx = \\frac{1}{2}\\times\\dfrac{(2x-1)^{3/2}}{3/2}+c$.</p>
      <p class="example-answer">Réponse : $\\dfrac{1}{3}(2x-1)^{3/2}+c$.</p>
    </div>
    <p><strong>Règle 2 :</strong> si l'expression sous le signe somme est un produit de deux facteurs, et que l'un d'eux est la différentielle d'une fonction $\\varphi(x)$, la substitution $\\varphi(x)=z$ peut ramener le second facteur à une fonction de $z$ que l'on sait intégrer.</p>
    <div class="key-point">
      <span class="eyebrow">Attention aux ressemblances trompeuses</span>
      $\\displaystyle\\int \\dfrac{2x}{1+x^2}dx$ ressemble à $\\displaystyle\\int \\dfrac{dx}{1+x^2}=\\arctan x+c$ du tableau, mais le facteur $2x$ au numérateur change complètement la nature de la primitive : ici $2x\\,dx = d(1+x^2)$, donc $\\displaystyle\\int \\dfrac{2x}{1+x^2}dx = \\ln(1+x^2)+c$, et non un arctangente.
    </div>

    <h3>7. Intégration par parties (IPP)</h3>
    <p>Toute expression sous le signe somme peut s'écrire $u\\,dv$. La formule d'intégration par parties ramène $\\int u\\,dv$ à $\\int v\\,du$ :</p>
    <div class="formula-box">$$\\int u\\,dv = uv - \\int v\\,du$$</div>
    <p>Ce procédé est utile si $\\int v\\,du$ est plus facile à calculer que $\\int u\\,dv$. Il faut choisir $u$ comme la fonction qui <strong>se simplifie en se dérivant</strong>, et $dv$ comme la partie dont on sait déjà trouver une primitive $v$.</p>
    <table class="mini-table">
      <tr><th>Type de produit</th><th>Choix de $u$</th><th>Choix de $dv$</th></tr>
      <tr><td>$P(x)e^{ax}$, $P(x)\\sin ax$, $P(x)\\cos ax$</td><td>$P(x)$ (polynôme)</td><td>$e^{ax}dx$, $\\sin ax\\,dx$, $\\cos ax\\,dx$</td></tr>
      <tr><td>$e^{ax}\\sin bx$ ou $e^{ax}\\cos bx$</td><td>indifférent (on répète l'IPP deux fois)</td><td>l'autre facteur</td></tr>
      <tr><td>$P(x)\\ln x$, $P(x)\\arcsin x$, $P(x)\\arctan x$...</td><td>$\\ln x$, $\\arcsin x$, $\\arctan x$...</td><td>$P(x)dx$</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le choix de u et dv en intégration par parties peut transformer un calcul impossible en un calcul trivial, alors que la formule elle-même $\\int u\\,dv = uv - \\int v\\,du$ reste toujours identique. En quoi ce choix stratégique — plutôt qu'un calcul purement mécanique — fait-il de l'IPP une technique qui demande un vrai jugement mathématique, et pas seulement l'application d'une recette ?
    </div>

    <h3>8. Frontière de la recherche</h3>
    <p>La somme de Riemann que tu as étudiée dans ce chapitre trouve ses limites face à des fonctions trop irrégulières (non continues sur un ensemble dense de points, par exemple) : en 1902, Henri Lebesgue proposa une théorie de l'intégration radicalement différente, fondée non plus sur un découpage de l'axe des abscisses mais sur un découpage de l'ensemble des valeurs prises par la fonction — une généralisation qui permet d'intégrer des fonctions bien plus « pathologiques » que celles accessibles à l'intégrale de Riemann, et qui constitue aujourd'hui le fondement de la théorie moderne des probabilités.</p>
    <p><strong>Question ouverte :</strong> pour une fonction de plusieurs dizaines de variables (un problème courant en apprentissage automatique ou en physique statistique), la somme de Riemann devient rapidement impraticable — quelles méthodes numériques permettent alors d'approximer une intégrale malgré cette « malédiction de la dimension » ?</p>
    <p><strong>Technologie émergente :</strong> l'<strong>intégration de Monte-Carlo</strong>, qui approxime une intégrale en tirant aléatoirement des points plutôt qu'en découpant systématiquement l'intervalle en rectangles réguliers, devient plus efficace que les méthodes classiques dès que la dimension du problème augmente — une technique aujourd'hui essentielle en finance quantitative (évaluation d'options) et en simulation physique.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Fonction f(x) à intégrer → recherche d'une primitive F(x) (tableau usuel, changement de variable, IPP) → intégrale indéfinie F(x)+c → théorème fondamental de l'analyse relie primitive et aire → intégrale définie = limite de la somme de Riemann quand n→∞
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty} \\sum_{j=0}^{n-1} f(x_j)\\,dx_j = F(b) - F(a)$$
      Cette double égalité résume tout le chapitre : à gauche, la définition géométrique de l'intégrale comme somme d'aires infinitésimales (Riemann) ; à droite, sa traduction pratique en termes de primitive (théorème fondamental de l'analyse) — le pont entre géométrie et calcul qui rend l'intégration réellement exploitable.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le théorème fondamental de l'analyse (le lien entre primitive et aire) n'avait jamais été découvert : comment calculerait-on aujourd'hui l'aire sous une courbe compliquée, sans recourir à la recherche d'une primitive ?</li>
        <li>Pourquoi le choix de u et dv en intégration par parties peut-il transformer un calcul impossible en un calcul trivial, alors que la formule elle-même reste toujours la même ?</li>
        <li>Quelle serait la conséquence, pour la finance quantitative moderne, d'une absence de méthode d'intégration numérique comme Monte-Carlo pour évaluer des intégrales en grande dimension ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>B. Riemann, <em>Über die Darstellbarkeit einer Function durch eine trigonometrische Reihe</em>, habilitation, 1854 — le texte fondateur de la définition rigoureuse de l'intégrale.</li>
        <li>H. Lebesgue, <em>Intégrale, longueur, aire</em>, thèse de doctorat, 1902 — la généralisation moderne de la théorie de l'intégration.</li>
        <li>J. M. Howie, <em>Real Analysis</em>, Springer Undergraduate Mathematics Series — référence pédagogique moderne sur l'intégration.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais calculer des primitives usuelles et justifier le lien entre primitive et aire sous une courbe. Le chapitre suivant, « Intégration des fonctions trigonométriques », approfondira les techniques de changement de variable pour des intégrales plus complexes. Comme le rappelle l'écart de deux siècles entre la notation de Leibniz et la rigueur de Riemann : une notation intuitive et pratique peut précéder de très loin la théorie rigoureuse qui la justifie pleinement.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Une primitive F(x) de f(x) vérifie F'(x)=f(x) ; il en existe une infinité, toutes de la forme F(x)+c</li>
        <li>L'intégrale indéfinie est une fonction ; l'intégrale définie (limite d'une somme de Riemann) est un nombre</li>
        <li>Règle 1 : pour f(ax+b), poser ax+b=z. Règle 2 : si un facteur est la différentielle de l'autre, poser φ(x)=z</li>
        <li>En IPP, choisir u = ce qui se simplifie en dérivant, dv = ce dont on connaît déjà une primitive</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier la constante d'intégration +c (ou la perdre en cours de calcul)</li>
        <li>Confondre ∫2x/(1+x²)dx (= ln(1+x²)+c) avec ∫dx/(1+x²) (= arctan x+c) — le facteur 2x change tout</li>
        <li>Mal choisir u et dv en IPP : si dv n'a pas de primitive simple, l'intégrale ∫v du sera pire que celle de départ</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — somme de Riemann</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Augmente le nombre de rectangles n : observe la figure en escalier se rapprocher de l'aire réelle sous la courbe f(x) = x²/10 + 1 sur [0,4].</p>
      <div class="sim-2col">
        <svg viewBox="0 0 200 150" width="220" height="165">
          <line x1="15" y1="140" x2="185" y2="140" stroke="#3A4658" stroke-width="1"/>
          <line x1="20" y1="20" x2="20" y2="140" stroke="#3A4658" stroke-width="1"/>
          <g id="integRiemannBars"></g>
          <polyline points="20.0,105.0 27.0,104.9 34.0,104.4 41.0,103.7 48.0,102.8 55.0,101.5 62.0,100.0 69.0,98.1 76.0,96.0 83.0,93.7 90.0,91.0 97.0,88.1 104.0,84.8 111.0,81.3 118.0,77.6 125.0,73.5 132.0,69.2 139.0,64.5 146.0,59.6 153.0,54.5 160.0,49.0" stroke="#F0B94D" stroke-width="1.8" fill="none"/>
        </svg>
        <div class="sim-controls">
          <label>n (nombre de rectangles) : <span id="integRiemannNVal">4</span></label>
          <input type="range" id="integRiemannN" min="2" max="40" step="1" value="4" oninput="updateIntegRiemann()">
          <div class="sim-readout" id="integRiemannReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une primitive de $f(x)=4x^3$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ1e1" value="wrong"> $12x^2$</label>
          <label class="option"><input type="radio" name="integ1e1" value="right"> $x^4$</label>
          <label class="option"><input type="radio" name="integ1e1" value="wrong"> $x^4+4$</label>
          <label class="option"><input type="radio" name="integ1e1" value="wrong"> $4x^4$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ1e1','integ1fb1','Correct — d(x⁴)=4x³dx, donc x⁴ est bien une primitive de 4x³.','Utilise la formule ∫xⁿdx = xⁿ⁺¹/(n+1) avec n=3.')">Vérifier</button>
        <div class="feedback" id="integ1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">$\\displaystyle\\int \\dfrac{3x^2}{1+x^3}dx$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ1e2" value="wrong"> $\\arctan(x^3)+c$</label>
          <label class="option"><input type="radio" name="integ1e2" value="right"> $\\ln|1+x^3|+c$</label>
          <label class="option"><input type="radio" name="integ1e2" value="wrong"> $\\dfrac{x^3}{1+x^3}+c$</label>
          <label class="option"><input type="radio" name="integ1e2" value="wrong"> $3\\ln|x|+c$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ1e2','integ1fb2','Correct — 3x²dx = d(1+x³), donc en posant φ(x)=1+x³, l\\'intégrale vaut ln|φ(x)|+c.','Remarque que 3x²dx est exactement la différentielle de 1+x³ : c\\'est la règle 2.')">Vérifier</button>
        <div class="feedback" id="integ1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour intégrer $\\displaystyle\\int x e^x dx$ par parties, il faut choisir :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ1e3" value="right"> u = x, dv = eˣdx</label>
          <label class="option"><input type="radio" name="integ1e3" value="wrong"> u = eˣ, dv = x dx</label>
          <label class="option"><input type="radio" name="integ1e3" value="wrong"> u = xeˣ, dv = dx</label>
          <label class="option"><input type="radio" name="integ1e3" value="wrong"> peu importe le choix</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ1e3','integ1fb3','Correct — u=x se simplifie en dérivant (du=dx), et dv=eˣdx a une primitive immédiate (v=eˣ) : exactement le cas polynôme × exponentielle du cours.','u doit être la fonction qui se SIMPLIFIE en dérivant — entre x et eˣ, laquelle se simplifie ?')">Vérifier</button>
        <div class="feedback" id="integ1fb3"></div>
      </div>
    </div>
  `,
  init: initIntegRiemann
};

INTEG_NOVA_KB[integKey('Primitives et intégrale indéfinie')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Primitives et intégrale indéfinie ». Demande-moi ce qu'est une primitive, comment choisir u et dv en IPP, ou un indice sur un exercice.",
  rules: [
    { test:/primitive/i, replies:["F(x) est une primitive de f(x) si F'(x) = f(x), c'est-à-dire dF(x) = f(x)dx. Toute fonction continue a une infinité de primitives, toutes de la forme F(x)+c."] },
    { test:/int[ée]grale ind[ée]finie/i, replies:["L'intégrale indéfinie ∫f(x)dx est la forme la plus générale de la primitive de f(x) — c'est une FONCTION (avec sa constante +c sous-entendue)."] },
    { test:/int[ée]grale d[ée]finie|somme de riemann|riemann/i, replies:["L'intégrale définie est la limite d'une somme de Riemann : on découpe [a,b] en n parties, on approche l'aire par des rectangles, puis on fait tendre n vers l'infini. C'est un NOMBRE, contrairement à l'intégrale indéfinie."] },
    { test:/tableau/i, replies:["Le tableau des intégrales usuelles regroupe les primitives de base (xⁿ, 1/x, eˣ, sin x, cos x, 1/(1+x²)...) — apprends-le, il sert de brique de base pour toutes les techniques plus avancées."] },
    { test:/changement de variable|r[èe]gle 1|r[èe]gle 2/i, replies:["Règle 1 : pour f(ax+b), pose ax+b=z. Règle 2 : si l'expression est un produit où un facteur est la différentielle de l'autre (φ(x)=z), la substitution simplifie souvent tout."] },
    { test:/int[ée]gration par parties|ipp|u.*dv/i, replies:["Formule : ∫u dv = uv − ∫v du. Choisis u comme la fonction qui SE SIMPLIFIE en dérivant (polynôme, ln x, arcsin x...) et dv comme la partie dont tu connais déjà une primitive (eˣdx, sin x dx...)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique ∫xⁿdx = xⁿ⁺¹/(n+1).","Indice niveau 2 : ici n=3, donc n+1=4.","Indice niveau 3 : la primitive est x⁴ (+c)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde si le numérateur est la différentielle du dénominateur.","Indice niveau 2 : d(1+x³) = 3x²dx — exactement le numérateur !","Indice niveau 3 : la réponse est ln|1+x³|+c."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : entre x et eˣ, laquelle de ces deux fonctions devient plus simple si on la dérive ?","Indice niveau 2 : dériver x donne 1 (plus simple) ; dériver eˣ redonne eˣ (pas plus simple).","Indice niveau 3 : u=x, dv=eˣdx."] }
  ]
};

/* =========================== CHAPITRE 2 — Intégration des fonctions trigonométriques =========================== */
INTEG_CHAPTERS[integKey('Intégration des fonctions trigonométriques')] = {
  objectives: [
    "Choisir la bonne substitution auxiliaire pour intégrer une puissance impaire de sinus ou de cosinus",
    "Linéariser un produit de puissances paires de sinus et cosinus à l'aide des formules d'angle double",
    "Intégrer un produit du type sin(mx)cos(nx) grâce aux formules de transformation produit-somme",
    "Choisir le changement de variable trigonométrique adapté à un radical √(a²−x²), √(a²+x²) ou √(x²−a²)",
    "Évaluer pourquoi la diversité des techniques d'intégration trigonométrique (six règles spécifiques plutôt qu'une seule méthode universelle) reflète un compromis délibéré entre rapidité de calcul et généralité, illustré par la substitution de Weierstrass qui sacrifie la rapidité au profit d'une applicabilité universelle"
  ],
  prereqs: ["Primitives et intégrale indéfinie"],
  bodyHtml: `
    <p>La méthode de substitution que tu vas systématiquement appliquer dans ce chapitre — reconnaître la structure précise d'une expression trigonométrique pour choisir la bonne variable auxiliaire — doit beaucoup aux travaux de systématisation du calcul intégral menés au XVIIIe siècle, notamment par Leonhard Euler, qui catalogua méthodiquement des dizaines de techniques de calcul de primitives dans son traité <em>Institutiones Calculi Integralis</em> (1768-1770). La substitution universelle $t=\\tan(x/2)$, que tu découvriras en fin de chapitre et qui porte aujourd'hui le nom de Weierstrass, illustre bien cette démarche : transformer systématiquement un problème trigonométrique apparemment complexe en un simple calcul sur des fractions rationnelles.</p>
    <p>Ces techniques d'intégration trigonométrique, qui peuvent sembler être un catalogue de recettes à mémoriser, trouvent une application directe très concrète : le calcul des séries de Fourier (que tu étudieras en L2), qui décomposent n'importe quel signal périodique — un son, un courant électrique alternatif, une onde radio — en une somme de sinusoïdes, repose systématiquement sur l'intégration de produits comme $\\sin(mx)\\cos(nx)$ que tu vas apprendre à calculer ici.</p>
    <p>Les intégrales trigonométriques suivent des recettes bien identifiées selon la forme exacte de l'expression : puissance impaire ou paire, produit d'angles différents, tangente... Ce chapitre présente les six règles pratiques du cours, puis les changements de variable trigonométriques qui rationalisent un radical. À la fin de ce chapitre, tu sauras reconnaître la structure d'une intégrale trigonométrique et choisir la substitution adaptée.</p>

    <h3>1. Règle 1 : puissance impaire de sinus ou de cosinus</h3>
    <p>Pour calculer $\\displaystyle\\int \\cos^{2n+1}x\\,dx$ ou $\\displaystyle\\int \\sin^{2n+1}x\\,dx$ ($n\\in\\mathbb{N}^*$), il est commode d'introduire la fonction auxiliaire $\\sin x$ dans le premier cas, $\\cos x$ dans le second (on garde un facteur $\\cos x\\,dx$ ou $\\sin x\\,dx$ de côté, qui est justement la différentielle de la fonction auxiliaire).</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> calculer $\\displaystyle\\int \\cos^3 x\\,dx$.</p>
      <p><strong>Solution :</strong> $\\cos^3x = \\cos^2x\\cdot\\cos x = (1-\\sin^2x)\\cos x$. En posant $u=\\sin x$ (donc $du=\\cos x\\,dx$) : $\\displaystyle\\int (1-u^2)du = u-\\dfrac{u^3}{3}+c$.</p>
      <p class="example-answer">Réponse : $\\sin x - \\dfrac{\\sin^3x}{3}+c$.</p>
    </div>
    <p>Plus généralement, si $\\cos^m x\\sin^n x$ contient au moins un exposant impair, on introduit $\\cos x$ comme variable auxiliaire si $n$ (exposant du sinus) est impair, ou $\\sin x$ si $m$ est impair.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La règle de la puissance impaire fonctionne parce qu'on peut toujours « sacrifier » un facteur sin x (ou cos x) pour former la différentielle de la variable auxiliaire, tandis que la parité restante se réexprime avec l'identité $\\sin^2x+\\cos^2x=1$. Pourquoi cette astuce échoue-t-elle systématiquement lorsque les deux exposants sont pairs, obligeant à recourir à une méthode entièrement différente (la linéarisation) ?
    </div>

    <h3>2. Puissances paires : linéarisation</h3>
    <p>Quand les deux exposants de $\\cos^m x\\sin^n x$ sont pairs, il est commode d'utiliser les formules de <strong>linéarisation</strong> :</p>
    <div class="formula-box">$$\\cos^2x = \\frac{1+\\cos(2x)}{2}, \\qquad \\sin^2x = \\frac{1-\\cos(2x)}{2}, \\qquad \\sin x\\cos x = \\frac{\\sin(2x)}{2}$$</div>
    <p><strong>Exemple :</strong> calculer $\\displaystyle\\int \\cos^4x\\sin^2x\\,dx$ — on réécrit $\\cos^4x\\sin^2x = (\\cos^2x)^2(\\sin^2x)$ en fonction de $\\cos(2x)$ (et parfois $\\cos(4x)$ après un second passage), puis on intègre terme à terme.</p>

    <h3>3. Règle 5 : produits sin(mx)cos(nx), sin(mx)sin(nx), cos(mx)cos(nx)</h3>
    <p>Pour calculer ces trois types de produits, on utilise les <strong>formules de transformation produit → somme</strong> :</p>
    <table class="mini-table">
      <tr><td>$\\sin(mx)\\cos(nx)$</td><td>$= \\dfrac{1}{2}\\big[\\sin(m-n)x + \\sin(m+n)x\\big]$</td></tr>
      <tr><td>$\\sin(mx)\\sin(nx)$</td><td>$= \\dfrac{1}{2}\\big[\\cos(m-n)x - \\cos(m+n)x\\big]$</td></tr>
      <tr><td>$\\cos(mx)\\cos(nx)$</td><td>$= \\dfrac{1}{2}\\big[\\cos(m-n)x + \\cos(m+n)x\\big]$</td></tr>
    </table>
    <p><strong>Exemple :</strong> $\\displaystyle\\int \\sin(5x)\\cos(3x)\\,dx = \\dfrac{1}{2}\\displaystyle\\int\\big[\\sin(2x)+\\sin(8x)\\big]dx = -\\dfrac{\\cos(2x)}{4}-\\dfrac{\\cos(8x)}{16}+c$.</p>

    <h3>4. Règle 6 : puissances de tangente ou cotangente</h3>
    <p>Pour $\\displaystyle\\int \\tan^n x\\,dx$ ou $\\displaystyle\\int \\cot^n x\\,dx$ ($n\\in\\mathbb{N}^*\\setminus\\{1\\}$), il est commode d'isoler un facteur $\\tan^2x$ (ou $\\cot^2x$) et d'utiliser $\\tan^2x = \\dfrac{1}{\\cos^2x}-1$ pour se ramener à une intégrale déjà connue, par récurrence sur l'exposant.</p>

    <h3>5. Changement de variable trigonométrique pour les radicaux</h3>
    <p>Pour une expression contenant $\\sqrt{a^2-x^2}$, $\\sqrt{a^2+x^2}$ ou $\\sqrt{x^2-a^2}$ (ou les carrés de ces radicaux), un changement de variable trigonométrique élimine le radical.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 130 90" width="100%">
          <polygon points="20,75 100,75 100,25" fill="none" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="55" y="88" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">√(a²−x²)</text>
          <text x="104" y="52" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">x</text>
          <text x="52" y="68" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">a</text>
          <text x="28" y="70" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">t</text>
        </svg>
        <span>x = a sin t (hypoténuse a, côté opposé x)</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 130 90" width="100%">
          <polygon points="20,75 100,75 100,25" fill="none" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="35" y="88" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">a</text>
          <text x="104" y="52" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">x</text>
          <text x="45" y="65" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">√(a²+x²)</text>
          <text x="28" y="70" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">t</text>
        </svg>
        <span>x = a tan t (côté adjacent a, côté opposé x)</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 130 90" width="100%">
          <polygon points="20,75 100,75 100,25" fill="none" stroke="#EAF0FB" stroke-width="1.4"/>
          <text x="35" y="88" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">a</text>
          <text x="104" y="52" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">√(x²−a²)</text>
          <text x="50" y="65" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">x</text>
          <text x="28" y="70" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">t</text>
        </svg>
        <span>x = a/cos t (côté adjacent a, hypoténuse x)</span>
      </div>
    </div>
    <table class="mini-table">
      <tr><th>Radical</th><th>Substitution</th></tr>
      <tr><td>$\\sqrt{a^2-x^2}$</td><td>$x = a\\sin t$</td></tr>
      <tr><td>$\\sqrt{x^2+a^2}$</td><td>$x = a\\tan t$</td></tr>
      <tr><td>$\\sqrt{x^2-a^2}$</td><td>$x = \\dfrac{a}{\\cos t}$</td></tr>
    </table>

    <h3>6. Rationalisation générale : substitution de Weierstrass</h3>
    <p>Pour une intégrale de la forme $\\displaystyle\\int R(\\sin x,\\cos x)\\,dx$ (fraction quelconque de $\\sin x$ et $\\cos x$), la substitution universelle $t=\\tan\\dfrac{x}{2}$ ramène toujours le calcul à une fraction rationnelle en $t$ :</p>
    <div class="formula-box">$$\\sin x = \\frac{2t}{1+t^2}, \\qquad \\cos x = \\frac{1-t^2}{1+t^2}, \\qquad dx = \\frac{2\\,dt}{1+t^2}$$</div>
    <p>Cette substitution fonctionne toujours, mais les règles 1 à 6 ci-dessus, quand elles s'appliquent, donnent en général des calculs bien plus courts.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La substitution de Weierstrass fonctionne pour absolument toute intégrale de la forme R(sin x, cos x), sans exception, contrairement aux règles 1 à 6 qui ne s'appliquent chacune qu'à un cas particulier. Pourquoi, malgré cette universalité, préfère-t-on presque toujours les règles spécifiques quand elles s'appliquent, plutôt que d'utiliser systématiquement cette méthode universelle ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>Les intégrales de produits trigonométriques que tu as calculées dans ce chapitre (via les formules produit-somme) sont exactement celles qui interviennent dans le calcul des coefficients d'une <strong>série de Fourier</strong> — la décomposition d'un signal périodique quelconque en une somme infinie de sinusoïdes. Cette théorie, développée par Joseph Fourier au début du XIXe siècle pour étudier la propagation de la chaleur, est aujourd'hui omniprésente : compression audio (MP3), traitement d'image (JPEG), télécommunications, tout repose sur cette même idée de décomposer un signal complexe en composantes sinusoïdales simples, dont le calcul exige exactement les intégrales trigonométriques étudiées ici.</p>
    <p><strong>Question ouverte :</strong> le calcul direct d'une série de Fourier par intégration, tel que tu viens de l'apprendre, devient rapidement coûteux pour un signal numérique comportant des millions de points — quels algorithmes permettent de contourner ce coût de calcul pour un traitement en temps réel ?</p>
    <p><strong>Technologie émergente :</strong> l'algorithme de <strong>transformée de Fourier rapide</strong> (FFT, Fast Fourier Transform), développé dans les années 1960, calcule numériquement en quelques millisecondes ce que l'intégration directe mettrait un temps considérable à obtenir, rendant possible le traitement de signal en temps réel (téléphonie, reconnaissance vocale, compression audio et vidéo).</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Intégrale trigonométrique → identifier la structure exacte (puissance impaire, puissance paire, produit d'angles, tangente, radical) → appliquer la règle spécifique correspondante → si aucune règle ne s'applique clairement, recourir à la substitution universelle de Weierstrass t=tan(x/2)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\sin x = \\dfrac{2t}{1+t^2}, \\quad \\cos x = \\dfrac{1-t^2}{1+t^2}, \\quad dx = \\dfrac{2\\,dt}{1+t^2} \\qquad (t = \\tan\\tfrac{x}{2})$$
      Cette substitution universelle résume, à elle seule, tout l'esprit de ce chapitre : n'importe quelle fraction rationnelle de sinus et de cosinus, aussi compliquée soit-elle en apparence, peut toujours être ramenée à une fraction rationnelle ordinaire en t — au prix, souvent, d'un calcul plus long que les six règles spécifiques.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la substitution de Weierstrass était toujours la plus rapide à utiliser : les six règles spécifiques présentées dans ce chapitre auraient-elles encore un intérêt pédagogique ou pratique ?</li>
        <li>Pourquoi les formules de transformation produit-somme sont-elles indispensables pour intégrer sin(mx)cos(nx), alors qu'aucune des autres règles ne s'applique directement à ce type de produit ?</li>
        <li>Quelle serait la conséquence, pour le traitement audio et vidéo numérique moderne, d'une absence d'algorithme rapide comme la FFT pour calculer les composantes de Fourier d'un signal ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>L. Euler, <em>Institutiones Calculi Integralis</em>, 1768-1770 — le traité fondateur de la systématisation des techniques d'intégration.</li>
        <li>J. Fourier, <em>Théorie analytique de la chaleur</em>, 1822 — l'ouvrage à l'origine de la décomposition en séries trigonométriques.</li>
        <li>J. M. Howie, <em>Real Analysis</em>, Springer Undergraduate Mathematics Series — référence pédagogique moderne sur les techniques d'intégration.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais reconnaître la structure d'une intégrale trigonométrique et choisir la substitution adaptée. Le chapitre suivant, « Intégration des fractions rationnelles », te fera découvrir une autre grande famille de techniques, cette fois pour des expressions purement algébriques. Comme le montre l'omniprésence des séries de Fourier, de la compression audio à la téléphonie : une technique de calcul en apparence scolaire peut se révéler, un siècle ou deux plus tard, au cœur des technologies les plus quotidiennes.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Puissance impaire → variable auxiliaire (sin x si on isole cos x dx, ou l'inverse) ; puissances paires → linéarisation avec cos(2x)</li>
        <li>sin(mx)cos(nx), sin(mx)sin(nx), cos(mx)cos(nx) → formules produit-somme</li>
        <li>√(a²−x²) → x=a sin t ; √(x²+a²) → x=a tan t ; √(x²−a²) → x=a/cos t</li>
        <li>La substitution de Weierstrass t=tan(x/2) rationalise TOUJOURS R(sin x, cos x), mais n'est pas toujours la plus rapide</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Essayer de linéariser directement une puissance impaire — c'est la méthode des puissances PAIRES ; pour une puissance impaire, mieux vaut isoler un facteur et changer de variable</li>
        <li>Confondre les trois substitutions trigonométriques (sin, tan, 1/cos) — elles correspondent chacune à un radical précis, pas interchangeables</li>
        <li>Oublier de transformer dx lors du changement de variable trigonométrique (dx dépend de dt, ce n'est jamais dx=dt)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour calculer $\\displaystyle\\int \\sin^3x\\,dx$, la substitution la plus adaptée est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ2e1" value="wrong"> u = sin x</label>
          <label class="option"><input type="radio" name="integ2e1" value="right"> u = cos x</label>
          <label class="option"><input type="radio" name="integ2e1" value="wrong"> u = tan x</label>
          <label class="option"><input type="radio" name="integ2e1" value="wrong"> u = x²</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ2e1','integ2fb1','Correct — sin³x = (1−cos²x)sin x ; en posant u=cos x, du=−sin x dx, ce qui rationalise tout.','Puissance impaire de SINUS : on isole un facteur sin x dx et on passe en variable cos x.')">Vérifier</button>
        <div class="feedback" id="integ2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour intégrer $\\sqrt{x^2+9}$, quel changement de variable utiliser ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ2e2" value="wrong"> x = 3 sin t</label>
          <label class="option"><input type="radio" name="integ2e2" value="right"> x = 3 tan t</label>
          <label class="option"><input type="radio" name="integ2e2" value="wrong"> x = 3/cos t</label>
          <label class="option"><input type="radio" name="integ2e2" value="wrong"> x = 3t</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ2e2','integ2fb2','Correct — le radical est de la forme √(x²+a²) avec a=3, donc x=a tan t.','Ici le radical est √(x²+a²) (avec a²=9) : quelle est la substitution associée à CE radical précis ?')">Vérifier</button>
        <div class="feedback" id="integ2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La substitution de Weierstrass pour rationaliser R(sin x, cos x) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ2e3" value="wrong"> t = sin x</label>
          <label class="option"><input type="radio" name="integ2e3" value="wrong"> t = cos x</label>
          <label class="option"><input type="radio" name="integ2e3" value="right"> t = tan(x/2)</label>
          <label class="option"><input type="radio" name="integ2e3" value="wrong"> t = x²</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ2e3','integ2fb3','Correct — t=tan(x/2) permet d\\'exprimer sin x, cos x et dx comme des fractions rationnelles en t.','C\\'est LA substitution universelle vue en fin de chapitre — elle porte le nom de Weierstrass.')">Vérifier</button>
        <div class="feedback" id="integ2fb3"></div>
      </div>
    </div>
  `
};

INTEG_NOVA_KB[integKey('Intégration des fonctions trigonométriques')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Intégration des fonctions trigonométriques ». Demande-moi quelle substitution utiliser selon le radical, ou un indice sur un exercice.",
  rules: [
    { test:/puissance impaire/i, replies:["Pour une puissance impaire (cos²ⁿ⁺¹x ou sin²ⁿ⁺¹x), isole un facteur cos x dx (ou sin x dx) et passe à la variable auxiliaire sin x (ou cos x)."] },
    { test:/lin[ée]aris/i, replies:["Pour des puissances PAIRES de sin/cos, utilise cos²x=(1+cos2x)/2 et sin²x=(1−cos2x)/2 pour tout ramener à des cos(kx), faciles à intégrer."] },
    { test:/sin\(mx\)|produit.*somme|transformation.*produit/i, replies:["sin(mx)cos(nx) = ½[sin(m−n)x + sin(m+n)x] ; sin(mx)sin(nx) = ½[cos(m−n)x − cos(m+n)x] ; cos(mx)cos(nx) = ½[cos(m−n)x + cos(m+n)x]."] },
    { test:/tan.*n|cotan/i, replies:["Pour ∫tanⁿx dx, isole un facteur tan²x = 1/cos²x − 1, ce qui fait apparaître une intégrale plus simple (récurrence sur n)."] },
    { test:/a.*sin.*t|a.*tan.*t|a.*cos.*t|substitution trigonom[ée]trique/i, replies:["√(a²−x²) → x=a sin t ; √(x²+a²) → x=a tan t ; √(x²−a²) → x=a/cos t. Chaque radical a SA substitution dédiée."] },
    { test:/weierstrass|tan\(x.2\)/i, replies:["La substitution de Weierstrass t=tan(x/2) rationalise toujours R(sin x, cos x) : sin x=2t/(1+t²), cos x=(1−t²)/(1+t²), dx=2dt/(1+t²)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : la puissance impaire est sur le SINUS ici.","Indice niveau 2 : isole un facteur sin x dx.","Indice niveau 3 : u = cos x."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : identifie la forme du radical, x²+9 = x²+a².","Indice niveau 2 : c'est le radical √(x²+a²).","Indice niveau 3 : x = 3 tan t."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : c'est la substitution universelle du cours.","Indice niveau 2 : elle porte un nom propre, Weierstrass.","Indice niveau 3 : t = tan(x/2)."] }
  ]
};

/* =========================== CHAPITRE 3 — Intégration des fractions rationnelles =========================== */
INTEG_CHAPTERS[integKey('Intégration des fractions rationnelles')] = {
  objectives: [
    "Distinguer fraction régulière et irrégulière, et extraire la partie entière par division euclidienne",
    "Décomposer une fraction rationnelle en éléments simples de 1ère et de 2ème espèce",
    "Intégrer chaque type d'élément simple selon sa multiplicité",
    "Traiter les 4 cas de factorisation du dénominateur (racines réelles ou complexes, simples ou multiples)",
    "Évaluer en quoi la garantie théorique d'existence de la décomposition en éléments simples — reposant sur la factorisation de tout polynôme réel en facteurs de degré 1 ou 2 — distingue l'intégration des fractions rationnelles des autres familles d'intégrales, où le succès dépend davantage de la reconnaissance d'une structure particulière"
  ],
  prereqs: ["Intégration des fonctions trigonométriques"],
  bodyHtml: `
    <p>La décomposition en éléments simples que tu vas apprendre dans ce chapitre fut développée au tout début du XVIIIe siècle par Gottfried Wilhelm Leibniz et Johann Bernoulli, qui cherchaient une méthode systématique pour intégrer n'importe quelle fraction rationnelle — jusque-là, chaque fraction exigeait une astuce ad hoc, sans garantie de succès. Leur méthode, essentiellement celle que tu vas appliquer ici trois siècles plus tard, repose sur un résultat d'algèbre fondamental : tout polynôme réel se factorise en facteurs du premier degré et du second degré irréductibles, ce qui garantit que la décomposition en éléments simples existe toujours, sans exception.</p>
    <p>Cette garantie théorique est ce qui distingue l'intégration des fractions rationnelles des autres familles d'intégrales : contrairement aux intégrales trigonométriques du chapitre précédent, où le succès dépend de reconnaître la bonne structure, ici la méthode en 4 étapes fonctionne toujours, systématiquement, pour absolument toute fraction rationnelle — un algorithme garanti, plutôt qu'une collection d'astuces.</p>
    <p>Une fraction rationnelle $\\dfrac{P(x)}{Q(x)}$ (quotient de deux polynômes) s'intègre toujours par une méthode systématique : la <strong>décomposition en éléments simples</strong>. Ce chapitre expose la méthode complète, en 4 étapes, et ses 4 cas de figure selon la nature des racines du dénominateur. À la fin de ce chapitre, tu sauras décomposer et intégrer systématiquement n'importe quelle fraction rationnelle.</p>

    <h3>1. Fraction régulière ou irrégulière</h3>
    <p>Une fraction $\\dfrac{P(x)}{Q(x)}$ est <strong>régulière</strong> (ou propre) si le degré du numérateur est strictement inférieur à celui du dénominateur ; sinon elle est <strong>irrégulière</strong> (ou impropre).</p>
    <p><strong>Exemple :</strong> $\\dfrac{2x^2-1}{4x^3-5}$ est régulière ; $\\dfrac{3x^2+x+\\pi}{x^2+4}$ est irrégulière.</p>

    <h3>2. Partie entière d'une fraction irrégulière</h3>
    <p>On peut dégager la <strong>partie entière</strong> d'une fraction irrégulière par division euclidienne avec reste : toute fraction irrégulière s'écrit comme la somme d'un polynôme entier et d'une fraction régulière. (Si la division tombe juste, la fraction irrégulière est en fait un simple polynôme.)</p>
    <div class="key-point">
      <span class="eyebrow">Méthode générale en 4 étapes</span>
      1) Extraire la partie entière si la fraction est irrégulière : $\\dfrac{P}{Q}=M(x)+\\dfrac{P_1}{Q}$.<br>
      2) Factoriser le dénominateur en facteurs du premier degré et/ou du second degré irréductible : $Q(x)=(x-a)^m\\cdots(x^2+px+q)^n\\cdots$<br>
      3) Décomposer $\\dfrac{P_1}{Q}$ en éléments simples, avec des coefficients indéterminés.<br>
      4) Calculer ces coefficients (identification des puissances de $x$, ou valeurs numériques particulières de $x$), puis intégrer chaque élément simple séparément.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La méthode en 4 étapes fonctionne systématiquement pour toute fraction rationnelle, sans exception, contrairement aux six règles spécifiques des intégrales trigonométriques du chapitre précédent. En quoi cette garantie d'applicabilité universelle change-t-elle la nature du travail à fournir : reconnaître une structure particulière, ou simplement suivre méthodiquement un algorithme ?
    </div>

    <h3>3. Les éléments simples</h3>
    <table class="mini-table">
      <tr><th>Espèce</th><th>Forme</th><th>Condition</th></tr>
      <tr><td>1ère espèce</td><td>$\\dfrac{A}{(x-a)^n}$</td><td>$n\\in\\mathbb{N}^*$</td></tr>
      <tr><td>2ème espèce</td><td>$\\dfrac{Mx+N}{(x^2+px+q)^n}$</td><td>$n\\in\\mathbb{N}^*$, et $x^2+px+q$ sans racine réelle (i.e. $q-(p/2)^2>0$)</td></tr>
    </table>
    <p><strong>Exemple :</strong> $\\dfrac{5}{x+2}$ et $\\dfrac{\\sqrt3}{(x-\\sqrt2)^2}$ sont des éléments simples de 1ère espèce ; $\\dfrac{0{,}2}{x^2+1}$, $\\dfrac{7x+2}{x^2+2}$ et $\\dfrac{5(x+4)}{x^2+\\sqrt3}$ sont de 2ème espèce.</p>

    <h3>4. Intégrer chaque élément simple</h3>
    <table class="mini-table">
      <tr><th>Cas</th><th>Primitive</th></tr>
      <tr><td>$\\displaystyle\\int \\dfrac{A\\,dx}{x-a}$</td><td>$A\\ln|x-a|+c$</td></tr>
      <tr><td>$\\displaystyle\\int \\dfrac{A\\,dx}{(x-a)^n}$ ($n>1$)</td><td>$\\dfrac{A}{1-n}\\cdot\\dfrac{1}{(x-a)^{n-1}}+c$</td></tr>
      <tr><td>$\\displaystyle\\int \\dfrac{Mx+N}{x^2+px+q}dx$</td><td>$\\dfrac{M}{2}\\ln|x^2+px+q| + \\dfrac{2N-Mp}{\\sqrt{4q-p^2}}\\arctan\\dfrac{2x+p}{\\sqrt{4q-p^2}}+c$</td></tr>
    </table>
    <p>Pour $\\dfrac{Mx+N}{(x^2+px+q)^n}$ avec $n>1$, on pose $z=x+\\frac{p}{2}$ (ce qui élimine le terme en $x$ du trinôme, $x^2+px+q=z^2+k^2$ avec $k^2=q-(p/2)^2$) et on se ramène à deux intégrales connues, avec $L=\\dfrac{2N-Mp}{2}$ :</p>
    <div class="formula-box">$$\\int \\frac{z\\,dz}{(z^2+k^2)^n} = \\frac{1}{2(1-n)(z^2+k^2)^{n-1}}+c \\qquad (\\text{immédiate, } n>1)$$</div>
    <div class="formula-box">$$\\int \\frac{dz}{(z^2+k^2)^n} = \\frac{1}{2(n-1)k^2}\\left[\\frac{z}{(z^2+k^2)^{n-1}} + (2n-3)\\int \\frac{dz}{(z^2+k^2)^{n-1}}\\right]+c \\qquad (\\text{formule de récurrence, } n>1)$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La seconde formule est une <strong>récurrence</strong> : elle exprime l'intégrale à l'ordre $n$ en fonction de la même intégrale à l'ordre $n-1$. En l'appliquant plusieurs fois de suite, on redescend jusqu'à $n=1$, où $\\int \\dfrac{dz}{z^2+k^2} = \\dfrac{1}{k}\\arctan\\dfrac{z}{k}+c$ est immédiate.
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — élément simple d'ordre 3</span>
      <p><strong>Énoncé :</strong> calculer $J=\\displaystyle\\int \\dfrac{3x-2}{(x^2-2x+3)^3}dx$.</p>
      <p><strong>Solution :</strong> on pose $z=x-1$, donc $x^2-2x+3=z^2+2$ ($k^2=2$) et $3x-2=3z+1$. L'intégrale se scinde en $3\\displaystyle\\int\\frac{z\\,dz}{(z^2+2)^3} + \\int\\frac{dz}{(z^2+2)^3}$ : la première se calcule directement avec la formule immédiate ($n=3$), la seconde s'obtient par la récurrence, en redescendant jusqu'à l'arctangente de base.</p>
      <p class="example-answer">Cette méthode s'applique systématiquement : poser $z=x+p/2$, séparer en un terme immédiat et un terme à réduire par récurrence.</p>
    </div>

    <h3>5. Les 4 cas de factorisation du dénominateur</h3>
    <table class="mini-table">
      <tr><th>Cas</th><th>Nature des racines de Q(x)</th><th>Décomposition typique</th></tr>
      <tr><td>1</td><td>Racines réelles distinctes (simples)</td><td>somme de termes $\\dfrac{A_i}{x-a_i}$</td></tr>
      <tr><td>2</td><td>Racines réelles, certaines multiples</td><td>pour une racine d'ordre $m$ : $\\dfrac{A_1}{x-a}+\\dfrac{A_2}{(x-a)^2}+\\dots+\\dfrac{A_m}{(x-a)^m}$</td></tr>
      <tr><td>3</td><td>Racines complexes simples (en plus des réelles)</td><td>un terme $\\dfrac{Mx+N}{x^2+px+q}$ par facteur quadratique</td></tr>
      <tr><td>4</td><td>Racines complexes multiples</td><td>plusieurs termes $\\dfrac{M_ix+N_i}{(x^2+px+q)^i}$ empilés</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — Cas 1 (racines réelles simples)</span>
      <p><strong>Énoncé :</strong> calculer $I=\\displaystyle\\int \\dfrac{7x-5}{x^3+x^2-6x}dx$.</p>
      <p><strong>Solution :</strong> $x^3+x^2-6x = x(x-2)(x+3)$. On décompose $\\dfrac{7x-5}{x(x-2)(x+3)} = \\dfrac{A}{x}+\\dfrac{B}{x-2}+\\dfrac{C}{x+3}$. En multipliant par $x$ puis $x=0$ : $A=\\frac{-5}{(-2)(3)}=\\frac{5}{6}$. De même $B=\\frac{9}{10}$ (en $x=2$) et $C=\\frac{-26}{-15}=\\frac{26}{15}$ (en $x=-3$).</p>
      <p class="example-answer">Réponse : $I = \\frac{5}{6}\\ln|x| + \\frac{9}{10}\\ln|x-2| + \\frac{26}{15}\\ln|x+3| + c$.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">Point clé — ne pas simplifier trop tôt</span>
      Il est parfois <strong>inutile, voire contre-productif</strong>, de simplifier une fraction rationnelle avant de l'intégrer : une simplification peut rendre la décomposition en éléments simples plus difficile, pas plus facile.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Simplifier une fraction rationnelle avant de l'intégrer peut sembler toujours une bonne idée, par réflexe algébrique. Pourquoi une telle simplification peut-elle, dans certains cas, compliquer plutôt que faciliter la décomposition en éléments simples qui suit ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La décomposition en éléments simples que tu maîtrises désormais n'est pas qu'un exercice académique : elle est l'outil central de l'<strong>automatique</strong> (théorie du contrôle des systèmes), où la réponse d'un système physique (un moteur, un circuit électronique, un avion en pilotage automatique) est modélisée par une fonction de transfert, une fraction rationnelle en la variable de Laplace. Pour revenir du domaine fréquentiel (où les calculs sont simples) au domaine temporel (le comportement réel dans le temps), les ingénieurs décomposent systématiquement cette fraction rationnelle en éléments simples — exactement la méthode de ce chapitre — puis appliquent à chaque terme une transformée de Laplace inverse tabulée.</p>
    <p><strong>Question ouverte :</strong> pour des systèmes de très grande dimension (des centaines de variables, comme un réseau électrique national), la décomposition en éléments simples manuelle devient impraticable — quelles approches numériques permettent alors d'obtenir des résultats équivalents sans calcul symbolique explicite ?</p>
    <p><strong>Technologie émergente :</strong> les logiciels de <strong>calcul formel</strong> (comme Mathematica ou les bibliothèques symboliques de Python) automatisent aujourd'hui entièrement la décomposition en éléments simples, y compris pour des fractions à coefficients très complexes, un gain de temps considérable pour les ingénieurs travaillant sur des systèmes de contrôle réels.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Fraction P(x)/Q(x) → extraction de la partie entière si irrégulière → factorisation de Q(x) (facteurs de degré 1 et 2 irréductibles) → décomposition en éléments simples (1ère et 2ème espèce, selon multiplicité) → calcul des coefficients → intégration terme à terme (logarithmes, puissances, arctangentes)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\dfrac{P(x)}{Q(x)} = M(x) + \\sum \\dfrac{A_i}{(x-a_i)^{k_i}} + \\sum \\dfrac{M_jx+N_j}{(x^2+p_jx+q_j)^{l_j}}$$
      Cette décomposition, garantie par la factorisation de tout polynôme réel en facteurs de degré 1 ou 2, réduit l'intégration de n'importe quelle fraction rationnelle, aussi compliquée soit-elle, à l'intégration d'un nombre fini de termes dont chacun est déjà connu.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si un polynôme réel pouvait avoir des facteurs irréductibles de degré 3 ou plus : la méthode de décomposition en éléments simples présentée dans ce chapitre resterait-elle applicable telle quelle ?</li>
        <li>Pourquoi le nombre de coefficients à déterminer dans la décomposition dépend-il de la multiplicité de chaque racine, et non simplement de son existence ?</li>
        <li>Quelle serait la conséquence, pour l'automatique et le pilotage des systèmes physiques, d'une absence de méthode systématique pour inverser une transformée de Laplace rationnelle ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>G. W. Leibniz, J. Bernoulli, correspondance et travaux sur l'intégration des fractions rationnelles, début du XVIIIe siècle — les fondateurs de la méthode de décomposition en éléments simples.</li>
        <li>J. M. Howie, <em>Real Analysis</em>, Springer Undergraduate Mathematics Series — référence pédagogique moderne sur l'intégration des fractions rationnelles.</li>
        <li>K. Ogata, <em>Modern Control Engineering</em>, Prentice Hall — sur l'application de la décomposition en éléments simples à l'inversion des transformées de Laplace en automatique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais décomposer et intégrer systématiquement n'importe quelle fraction rationnelle. Le chapitre suivant, « Intégrales avec radicaux », étendra ces techniques à des expressions contenant des racines carrées de polynômes. Comme le montre l'application de cette méthode trois siècles plus tard à l'automatique et au pilotage des systèmes : un algorithme rigoureux, une fois établi, traverse les siècles et trouve des applications que ses inventeurs n'auraient jamais pu imaginer.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Toujours extraire la partie entière en premier si la fraction est irrégulière</li>
        <li>Élément simple 1ère espèce A/(x−a)ⁿ ; 2ème espèce (Mx+N)/(x²+px+q)ⁿ avec discriminant négatif</li>
        <li>Le nombre de coefficients à déterminer dépend de la MULTIPLICITÉ de chaque racine, pas seulement de son existence</li>
        <li>Les coefficients se trouvent par identification des puissances de x, ou en donnant des valeurs numériques à x</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier d'extraire la partie entière avant de décomposer une fraction irrégulière</li>
        <li>Ne mettre qu'un seul terme A/(x−a) pour une racine double, au lieu des deux termes A₁/(x−a) + A₂/(x−a)²</li>
        <li>Oublier le terme en arctan dans la primitive d'un élément simple de 2ème espèce</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La fraction $\\dfrac{x^3+2x+1}{x^2-1}$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ3e1" value="right"> irrégulière (il faut extraire une partie entière)</label>
          <label class="option"><input type="radio" name="integ3e1" value="wrong"> régulière</label>
          <label class="option"><input type="radio" name="integ3e1" value="wrong"> déjà un élément simple</label>
          <label class="option"><input type="radio" name="integ3e1" value="wrong"> impossible à intégrer</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ3e1','integ3fb1','Correct — le degré du numérateur (3) est supérieur ou égal à celui du dénominateur (2) : la fraction est irrégulière.','Compare les degrés : numérateur degré 3, dénominateur degré 2.')">Vérifier</button>
        <div class="feedback" id="integ3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour une racine réelle double $a$ du dénominateur, la décomposition en éléments simples doit contenir :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ3e2" value="wrong"> uniquement A/(x−a)</label>
          <label class="option"><input type="radio" name="integ3e2" value="right"> A₁/(x−a) + A₂/(x−a)²</label>
          <label class="option"><input type="radio" name="integ3e2" value="wrong"> uniquement A/(x−a)²</label>
          <label class="option"><input type="radio" name="integ3e2" value="wrong"> (Mx+N)/(x−a)²</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ3e2','integ3fb2','Correct — une racine réelle d\\'ordre m donne m termes empilés, du premier au m-ième ordre.','Une racine d\\'ordre 2 (double) donne DEUX termes empilés, pas un seul.')">Vérifier</button>
        <div class="feedback" id="integ3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un élément simple de 2ème espèce (Mx+N)/(x²+px+q) exige que le trinôme x²+px+q :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ3e3" value="wrong"> ait deux racines réelles distinctes</label>
          <label class="option"><input type="radio" name="integ3e3" value="right"> n'ait pas de racine réelle</label>
          <label class="option"><input type="radio" name="integ3e3" value="wrong"> ait une racine double</label>
          <label class="option"><input type="radio" name="integ3e3" value="wrong"> soit toujours positif ou toujours négatif</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ3e3','integ3fb3','Correct — c\\'est exactement la condition q−(p/2)²>0, garantissant l\\'absence de racine réelle.','Si le trinôme avait une racine réelle, on pourrait le factoriser en deux facteurs du premier degré — ce ne serait plus un élément de 2ème espèce.')">Vérifier</button>
        <div class="feedback" id="integ3fb3"></div>
      </div>
    </div>
  `
};

INTEG_NOVA_KB[integKey('Intégration des fractions rationnelles')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Intégration des fractions rationnelles ». Demande-moi comment décomposer en éléments simples, ou un indice sur un exercice.",
  rules: [
    { test:/r[ée]guli[èe]re|irr[ée]guli[èe]re/i, replies:["Une fraction est régulière si deg(numérateur) < deg(dénominateur). Sinon elle est irrégulière et il faut d'abord en extraire la partie entière par division euclidienne."] },
    { test:/partie enti[èe]re/i, replies:["La partie entière s'obtient par division euclidienne du numérateur par le dénominateur : P/Q = M(x) + P1/Q, où P1/Q est régulière."] },
    { test:/[ée]l[ée]ment simple/i, replies:["1ère espèce : A/(x−a)ⁿ. 2ème espèce : (Mx+N)/(x²+px+q)ⁿ, avec x²+px+q sans racine réelle (discriminant négatif)."] },
    { test:/d[ée]composition|d[ée]composer/i, replies:["Méthode en 4 étapes : 1) partie entière, 2) factoriser le dénominateur, 3) écrire la décomposition avec coefficients indéterminés, 4) calculer ces coefficients par identification ou valeurs numériques."] },
    { test:/4 cas|cas 1|cas 2|cas 3|cas 4/i, replies:["Cas 1 : racines réelles simples. Cas 2 : racines réelles multiples (plusieurs termes empilés). Cas 3 : racines complexes simples (terme (Mx+N)/(x²+px+q)). Cas 4 : racines complexes multiples (termes empilés avec arctan)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare les degrés du numérateur et du dénominateur.","Indice niveau 2 : numérateur degré 3, dénominateur degré 2.","Indice niveau 3 : c'est irrégulier."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : une racine double donne DEUX termes.","Indice niveau 2 : un terme en (x−a), un terme en (x−a)².","Indice niveau 3 : A1/(x−a) + A2/(x−a)²."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à la condition q−(p/2)²>0.","Indice niveau 2 : ça garantit l'absence de racine réelle.","Indice niveau 3 : le trinôme n'a pas de racine réelle."] }
  ]
};

/* =========================== CHAPITRE 4 — Intégrales avec radicaux =========================== */
INTEG_CHAPTERS[integKey('Intégrales avec radicaux')] = {
  objectives: [
    "Rationaliser une intégrale contenant des puissances fractionnaires de x par une substitution t^k=x",
    "Reconnaître une différentielle binôme et appliquer le cas d'intégrabilité correspondant",
    "Choisir la substitution d'Euler adaptée pour rationaliser une intégrale contenant √(ax²+bx+c)",
    "Évaluer en quoi la démonstration de Tchebychev — établissant qu'une différentielle binôme n'est intégrable par fonctions élémentaires que dans exactement trois cas — illustre la différence entre ne pas trouver de solution et prouver rigoureusement qu'aucune solution élémentaire n'existe"
  ],
  prereqs: ["Intégration des fractions rationnelles"],
  bodyHtml: `
    <p>En 1853, le mathématicien russe Pafnouti Tchebychev démontra un résultat aussi élégant que définitif : parmi toutes les différentielles binômes $x^m(a+bx^n)^p\\,dx$, seules celles vérifiant l'une des trois conditions précises que tu vas étudier dans ce chapitre possèdent une primitive exprimable à l'aide de fonctions élémentaires — toutes les autres, bien qu'apparemment simples à écrire, ne peuvent tout simplement pas être intégrées avec les outils usuels (logarithmes, exponentielles, fonctions trigonométriques). C'est l'un des premiers résultats mathématiques à prouver rigoureusement qu'une intégrale n'admet <em>aucune</em> expression élémentaire, plutôt que de simplement échouer à la trouver.</p>
    <p>Ce résultat de Tchebychev illustre une leçon importante en mathématiques : l'absence de solution n'est pas toujours un échec de la méthode employée, mais peut être une propriété intrinsèque et démontrable du problème lui-même. Les substitutions d'Euler que tu étudieras en fin de chapitre, elles, garantissent au contraire un succès systématique pour toute intégrale contenant $\\sqrt{ax^2+bx+c}$ — un contraste saisissant avec les différentielles binômes, où le succès n'est garanti que dans trois cas précis sur une infinité de possibilités.</p>
    <p>Une intégrale contenant un radical n'est en général pas une fonction rationnelle — mais on peut souvent la <strong>rationaliser</strong> (la ramener à l'intégrale d'une fraction rationnelle) par un changement de variable bien choisi. $R(x,y)$ désigne ici une fraction dont numérateur et dénominateur sont des polynômes en $x,y$. À la fin de ce chapitre, tu sauras reconnaître les différentes familles d'intégrales avec radicaux et choisir la substitution rationalisante adaptée à chacune.</p>

    <h3>1. Intégrales du type R(x, x^(m/n), ..., x^(r/s))</h3>
    <p>On détermine le dénominateur commun $k$ des exposants fractionnaires $\\frac{m}{n},\\dots,\\frac{r}{s}$, et on pose $t^k=x$ (donc $x=t^k$, $dx=kt^{k-1}dt$) : tous les radicaux disparaissent, l'intégrale devient rationnelle en $t$.</p>
    <p><strong>Exemple :</strong> $\\displaystyle\\int \\dfrac{x^{1/2}}{x^{3/4}+1}dx$ — dénominateur commun de $\\frac12$ et $\\frac34$ : $k=4$, on pose $x=t^4$.</p>

    <h3>2. Intégrales du type R(x, ((ax+b)/(cx+d))^(m/n), ...)</h3>
    <p>Même principe : on détermine le dénominateur commun $k$ des exposants, et on pose $t^k=\\dfrac{ax+b}{cx+d}$.</p>
    <div class="key-point">
      <span class="eyebrow">Vocabulaire</span>
      Cette méthode — ramener une intégrale contenant un radical à celle d'une fonction rationnelle — s'appelle la <strong>rationalisation</strong>.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Rationaliser une intégrale ne change jamais sa valeur : c'est une réécriture, pas une approximation. Pourquoi peut-on affirmer avec certitude que la substitution $x=t^k$ transforme fidèlement l'intégrale de départ en une intégrale équivalente en t, sans jamais introduire ni perdre d'information au passage ?
    </div>

    <h3>3. Différentielles binômes</h3>
    <p>On appelle <strong>différentielle binôme</strong> une expression de la forme $x^m(a+bx^n)^p\\,dx$, où $m,n,p$ sont des rationnels et $a,b$ des constantes non nulles. Newton, Euler puis Tchebychev (qui a démontré la réciproque en 1853) ont établi que l'intégrale</p>
    <div class="formula-box">$$\\int x^m(a+bx^n)^p\\,dx$$</div>
    <p>s'exprime à l'aide de fonctions élémentaires exactement dans <strong>trois cas</strong> :</p>
    <table class="mini-table">
      <tr><th>Cas</th><th>Condition</th><th>Substitution rationalisante</th></tr>
      <tr><td>1</td><td>$p$ est entier</td><td>on se ramène au type 2.6.1 ou 2.6.2 ci-dessus</td></tr>
      <tr><td>2</td><td>$p=\\frac{r}{s}$ fractionnaire, mais $\\frac{m+1}{n}$ est entier</td><td>$z^s = a+bx^n$</td></tr>
      <tr><td>3</td><td>$p$ et $\\frac{m+1}{n}$ sont tous deux fractionnaires, mais leur somme $\\frac{m+1}{n}+p$ est entière</td><td>$z^s = b+ax^{-n}$</td></tr>
    </table>
    <p>En dehors de ces trois cas, l'intégrale d'une différentielle binôme <strong>ne s'exprime pas</strong> à l'aide de fonctions élémentaires — c'est ce qu'a démontré Tchebychev, et Mordoukhaï-Boltovskoï a étendu ce résultat en 1926 au cas d'exposants irrationnels.</p>

    <h3>4. Intégrales de la forme R(x, √(ax²+bx+c)) : les substitutions d'Euler</h3>
    <p>On rationalise ces intégrales grâce à l'une des trois substitutions d'Euler.</p>
    <table class="mini-table">
      <tr><th>Substitution</th><th>Condition</th><th>Principe</th></tr>
      <tr><td>1ère (Euler)</td><td>$a>0$</td><td>$\\sqrt{ax^2+bx+c} = \\pm\\sqrt{a}\\,x+t$ ; on en déduit $x$ comme fraction rationnelle de $t$</td></tr>
      <tr><td>2ème (Euler)</td><td>$c>0$</td><td>$\\sqrt{c}+tx = \\sqrt{ax^2+bx+c}$ ; en élevant au carré et en divisant par $x$, on exprime $x$ rationnellement en $t$</td></tr>
      <tr><td>3ème (Euler)</td><td>racines réelles $x_1,x_2$ (en particulier utile si $a<0$)</td><td>$t = \\sqrt{\\dfrac{a(x-x_1)}{x-x_2}}$, d'où $x = \\dfrac{x_2t^2-ax_1}{t^2-a}$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La 1ère et la 3ème substitution d'Euler suffisent à elles seules pour calculer <strong>toute</strong> intégrale de cette forme : si $a>0$ on utilise la 1ère ; si le trinôme a des racines réelles (ce qui est notamment automatique quand $a<0$, car sinon le radical serait imaginaire pour tout $x$), on utilise la 3ème.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Contrairement aux différentielles binômes, où l'intégrabilité par fonctions élémentaires n'est garantie que dans trois cas précis, les substitutions d'Euler garantissent, elles, un succès systématique pour toute intégrale contenant $\\sqrt{ax^2+bx+c}$. Quelle différence structurelle entre ces deux familles d'intégrales explique que l'une admette une garantie universelle de succès, et l'autre non ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Le résultat de Tchebychev sur les différentielles binômes s'inscrit dans un cadre théorique bien plus vaste, développé quelques décennies plus tôt par Joseph Liouville dans les années 1830-1840 : la théorie de Liouville permet de déterminer, pour une très large classe de fonctions, si leur primitive peut ou non s'exprimer à l'aide de fonctions élémentaires. C'est ce cadre théorique qui explique, par exemple, pourquoi la fonction gaussienne $e^{-x^2}$ — omniprésente en probabilités et en statistique (loi normale) — n'admet <strong>aucune</strong> primitive élémentaire, un fait qui ne peut être établi par tâtonnement mais uniquement par une démonstration rigoureuse de ce type.</p>
    <p><strong>Question ouverte :</strong> si une intégrale n'admet pas de primitive élémentaire, comme c'est le cas de $e^{-x^2}$, comment les scientifiques et ingénieurs calculent-ils malgré tout des valeurs numériques précises de cette intégrale lorsqu'ils en ont besoin ?</p>
    <p><strong>Concept avancé :</strong> la <strong>théorie de Galois différentielle</strong>, développée au XXe siècle en généralisant les idées de Liouville, fournit aujourd'hui un cadre algébrique complet pour déterminer systématiquement, par le calcul, si une équation différentielle ou une intégrale donnée admet une solution exprimable par des fonctions élémentaires — un problème resté ouvert pendant des siècles pour de nombreux cas particuliers.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Intégrale avec radical → identifier le type (puissances fractionnaires de x, différentielle binôme, √(ax²+bx+c)) → si différentielle binôme : vérifier les 3 conditions d'intégrabilité de Tchebychev → sinon : substitution t^k=x ou substitution d'Euler adaptée → intégrale rationnelle en t, résoluble par les techniques du chapitre précédent
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\int x^m(a+bx^n)^p\\,dx \\text{ élémentaire} \\iff p\\in\\mathbb{Z} \\text{ ou } \\dfrac{m+1}{n}\\in\\mathbb{Z} \\text{ ou } \\dfrac{m+1}{n}+p\\in\\mathbb{Z}$$
      Ce théorème de Tchebychev condense, en une seule condition vérifiable par calcul, la frontière exacte entre les différentielles binômes intégrables par fonctions élémentaires et celles qui ne le sont fondamentalement pas — un résultat rare en mathématiques, qui prouve une impossibilité plutôt qu'un simple échec de méthode.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Tchebychev n'avait démontré que le sens direct de son théorème (les 3 cas suffisent), sans démontrer la réciproque (aucun autre cas ne fonctionne) : comment cela aurait-il changé la certitude avec laquelle on peut aujourd'hui affirmer qu'une différentielle binôme donnée n'est pas intégrable élémentairement ?</li>
        <li>Pourquoi la 2ème substitution d'Euler, bien que valide, est-elle moins souvent nécessaire en pratique que la 1ère et la 3ème ?</li>
        <li>Quelle serait la conséquence, pour le calcul scientifique moderne, d'une absence de méthodes numériques capables d'évaluer des intégrales comme celle de la fonction gaussienne, qui n'admettent aucune primitive élémentaire ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>P. Tchebychev, « Sur l'intégration des différentielles qui contiennent une racine carrée d'un polynôme du troisième ou du quatrième degré », Journal de mathématiques pures et appliquées, 1853 — le théorème fondateur de ce chapitre.</li>
        <li>J. Liouville, travaux sur l'intégration des fonctions élémentaires, années 1830-1840 — le cadre théorique général dont le théorème de Tchebychev est un cas particulier.</li>
        <li>J. M. Howie, <em>Real Analysis</em>, Springer Undergraduate Mathematics Series — référence pédagogique moderne sur les techniques d'intégration.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais reconnaître les différentes familles d'intégrales avec radicaux et choisir la substitution rationalisante adaptée à chacune. Le chapitre suivant, « Équations différentielles du premier ordre », changera radicalement de perspective : au lieu de chercher la primitive d'une fonction connue, tu chercheras une fonction inconnue à partir d'une relation portant sur sa propre dérivée. Comme le montre le théorème de Tchebychev : en mathématiques, prouver qu'une solution n'existe pas peut être tout aussi précieux, et parfois bien plus difficile, que d'en trouver une.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Pour rationaliser des puissances fractionnaires de x, poser x=t^k avec k = dénominateur commun des exposants</li>
        <li>Une différentielle binôme x^m(a+bx^n)^p dx s'intègre par fonctions élémentaires dans exactement 3 cas (p entier ; (m+1)/n entier ; leur somme entière)</li>
        <li>√(ax²+bx+c) se rationalise par une substitution d'Euler : la 1ère (a>0) et la 3ème (racines réelles) suffisent pour tous les cas</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Chercher à intégrer une différentielle binôme hors des 3 cas d'intégrabilité — ce n'est tout simplement pas possible avec des fonctions élémentaires</li>
        <li>Utiliser la 1ère substitution d'Euler quand a &lt; 0 (elle exige a &gt; 0 pour que √a existe)</li>
        <li>Oublier de recalculer dx en fonction de dt après une substitution — c'est une erreur fréquente qui invalide tout le calcul</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour rationaliser $\\displaystyle\\int \\dfrac{dx}{\\sqrt[3]{x}+\\sqrt{x}}$, on pose $x=t^k$ avec $k$ égal à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ4e1" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="integ4e1" value="wrong"> 3</label>
          <label class="option"><input type="radio" name="integ4e1" value="right"> 6</label>
          <label class="option"><input type="radio" name="integ4e1" value="wrong"> 5</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ4e1','integ4fb1','Correct — le dénominateur commun de 1/3 et 1/2 est 6.','Les exposants fractionnaires sont 1/3 et 1/2 : quel est leur dénominateur commun ?')">Vérifier</button>
        <div class="feedback" id="integ4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour $x^{-6}(1+2x^3)^{2/3}dx$ (m=−6, n=3, p=2/3), on doit vérifier :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ4e2" value="wrong"> si p est entier</label>
          <label class="option"><input type="radio" name="integ4e2" value="wrong"> si (m+1)/n est entier</label>
          <label class="option"><input type="radio" name="integ4e2" value="right"> si (m+1)/n + p est entier</label>
          <label class="option"><input type="radio" name="integ4e2" value="wrong"> aucune condition à vérifier</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ4e2','integ4fb2','Correct — ici (m+1)/n = −5/3 (pas entier) et p=2/3 (pas entier), mais leur somme −5/3+2/3=−1 est entière : c\\'est le cas 3.','Calcule (m+1)/n = (−6+1)/3 = −5/3, pas entier ; p=2/3, pas entier non plus : il reste le 3ème cas à tester.')">Vérifier</button>
        <div class="feedback" id="integ4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Si le trinôme ax²+bx+c a deux racines réelles distinctes, la substitution d'Euler la plus adaptée est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ4e3" value="wrong"> toujours la 1ère (même si a<0)</label>
          <label class="option"><input type="radio" name="integ4e3" value="wrong"> toujours la 2ème</label>
          <label class="option"><input type="radio" name="integ4e3" value="right"> la 3ème</label>
          <label class="option"><input type="radio" name="integ4e3" value="wrong"> aucune ne fonctionne dans ce cas</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ4e3','integ4fb3','Correct — la 3ème substitution d\\'Euler est justement conçue pour le cas de racines réelles, y compris quand a<0 (où la 1ère substitution ne s\\'applique pas).','La 1ère substitution exige a>0. Si a<0 mais que les racines sont réelles, quelle substitution reste disponible ?')">Vérifier</button>
        <div class="feedback" id="integ4fb3"></div>
      </div>
    </div>
  `
};

INTEG_NOVA_KB[integKey('Intégrales avec radicaux')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Intégrales avec radicaux ». Demande-moi ce qu'est une différentielle binôme, quelle substitution d'Euler utiliser, ou un indice sur un exercice.",
  rules: [
    { test:/rationalisation|rationaliser/i, replies:["Rationaliser une intégrale, c'est la ramener à l'intégrale d'une fonction rationnelle grâce à un changement de variable qui élimine les radicaux."] },
    { test:/diff[ée]rentielle bin[oô]me/i, replies:["Une différentielle binôme est x^m(a+bx^n)^p dx. Elle s'intègre par fonctions élémentaires dans 3 cas seulement : p entier ; (m+1)/n entier ; ou (m+1)/n + p entier."] },
    { test:/euler|substitution.*euler/i, replies:["1ère substitution d'Euler : utile si a>0 (√(ax²+bx+c)=±√a·x+t). 3ème substitution : utile si le trinôme a des racines réelles x1,x2 (t=√(a(x−x1)/(x−x2))). Ces deux-là suffisent pour tous les cas."] },
    { test:/t.k.*x|d[ée]nominateur commun/i, replies:["Pour rationaliser des puissances fractionnaires x^(m/n),...,x^(r/s), pose x=t^k où k est le dénominateur commun de tous ces exposants."] },
    { test:/tch[ée]bychev|tchebicheff/i, replies:["Tchébychev a démontré en 1853 qu'en dehors des 3 cas d'intégrabilité d'une différentielle binôme, l'intégrale ne s'exprime PAS avec des fonctions élémentaires — c'est un résultat fondamental, pas juste une méthode qui échoue."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : cherche le dénominateur commun des exposants 1/3 et 1/2.","Indice niveau 2 : le plus petit multiple commun de 3 et 2.","Indice niveau 3 : k=6."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : calcule d'abord (m+1)/n.","Indice niveau 2 : (m+1)/n = −5/3, et p=2/3 — aucun des deux n'est entier seul.","Indice niveau 3 : teste leur somme : −5/3+2/3=−1, entier → cas 3."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : la 1ère substitution d'Euler a une condition stricte (a>0).","Indice niveau 2 : si a<0 mais racines réelles, il faut une autre substitution.","Indice niveau 3 : la 3ème substitution d'Euler."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 2 — Champ de directions et solution de y' = k·y (Chapitre 5)
--------------------------------------------------------------------------------- */
function updateIntegSlopeField(){
  const k = parseFloat(document.getElementById('integK').value);
  const y0 = parseFloat(document.getElementById('integY0').value);
  document.getElementById('integKVal').textContent = k.toFixed(1);
  document.getElementById('integY0Val').textContent = y0.toFixed(1);
  const toSvgX = x => 20+x*35, toSvgY = y => 100-y*20;
  const xs=[0,1,2,3,4], ys=[-2,-1,0,1,2];
  let idx=0;
  for(const x of xs){
    for(const y of ys){
      const slope = k*y;
      const len = 12;
      const norm = Math.sqrt(1+slope*slope);
      const dx = len/norm, dy = -slope*len/norm;
      const cx = toSvgX(x), cy = toSvgY(y);
      const seg = document.getElementById('integSlope'+idx);
      seg.setAttribute('x1', (cx-dx/2).toFixed(1)); seg.setAttribute('y1', (cy-dy/2).toFixed(1));
      seg.setAttribute('x2', (cx+dx/2).toFixed(1)); seg.setAttribute('y2', (cy+dy/2).toFixed(1));
      idx++;
    }
  }
  const points = [];
  for(let xi=0; xi<=4; xi+=0.1){
    const yv = y0*Math.exp(k*xi);
    if(Math.abs(yv) <= 2.6){ points.push(`${toSvgX(xi).toFixed(1)},${toSvgY(yv).toFixed(1)}`); }
  }
  document.getElementById('integSolCurve').setAttribute('points', points.join(' '));
  let comportement = "k = 0 : solution constante.";
  if(k>0) comportement = "k > 0 : croissance exponentielle.";
  else if(k<0) comportement = "k < 0 : décroissance exponentielle (relaxation).";
  document.getElementById('integSlopeReadout').innerHTML =
    `Équation : y' = ${k.toFixed(1)}·y, avec y(0) = ${y0.toFixed(1)}<br>` +
    `Solution : y(x) = ${y0.toFixed(1)}·e^(${k.toFixed(1)}x)<br>${comportement}`;
}
function initIntegSlopeField(){ updateIntegSlopeField(); }

/* =========================== CHAPITRE 5 — Équations différentielles du premier ordre =========================== */
INTEG_CHAPTERS[integKey('Équations différentielles du premier ordre')] = {
  objectives: [
    "Reconnaître l'ordre et la linéarité d'une équation différentielle",
    "Résoudre une équation différentielle à variables séparables",
    "Résoudre une équation linéaire du premier ordre par la méthode de variation de la constante",
    "Reconnaître et résoudre une équation de Bernoulli par changement de fonction",
    "Évaluer en quoi le défi lancé par Jacob Bernoulli en 1695, résolu par Leibniz grâce à un changement de fonction astucieux, illustre la démarche généralisable qui consiste à ramener une équation non linéaire à une équation linéaire déjà maîtrisée"
  ],
  prereqs: ["Intégrales avec radicaux"],
  bodyHtml: `
    <p>En 1695, Jacob Bernoulli posa comme un défi à la communauté scientifique de son époque l'équation qui porte aujourd'hui son nom — une équation différentielle non linéaire que personne, y compris lui-même, ne savait alors résoudre. C'est Gottfried Wilhelm Leibniz qui, l'année suivante, trouva la clé : un changement de fonction astucieux qui ramène l'équation de Bernoulli à une équation linéaire, exactement la méthode que tu vas étudier à la fin de ce chapitre, trois siècles et demi plus tard.</p>
    <p>Les équations différentielles ne sont pas un exercice purement académique : elles sont le langage mathématique universel de tout phénomène qui évolue dans le temps selon une règle connue — croissance d'une population, désintégration radioactive, décharge d'un condensateur électrique, propagation d'une épidémie. Résoudre une équation différentielle, c'est littéralement prédire l'avenir d'un système à partir de la loi qui gouverne son changement instantané.</p>
    <p>Une équation différentielle relie une fonction inconnue $y(x)$ à ses dérivées. Résoudre (on dit aussi <em>intégrer</em>) une telle équation ne donne pas un nombre mais une <strong>fonction</strong> $y=\\varphi(x)$ — en général toute une famille de fonctions, car il manque une (ou plusieurs) condition initiale pour fixer une solution unique. À la fin de ce chapitre, tu sauras reconnaître et résoudre les principaux types d'équations différentielles du premier ordre.</p>

    <h3>1. Définitions : ordre et intégrale d'une équation différentielle</h3>
    <p>Une équation différentielle est une relation entre une variable $x$, une fonction inconnue $y$ et ses dérivées successives $y',y'',\\dots,y^{(n)}$ du type $F(x,y,y',\\dots,y^{(n)})=0$. Le plus haut ordre de dérivation qui y apparaît est l'<strong>ordre</strong> de l'équation.</p>
    <table class="mini-table">
      <tr><th>Exemple</th><th>Ordre</th></tr>
      <tr><td>$(1+x^2)y' - xy^2 + 1 - x = 0$</td><td>1</td></tr>
      <tr><td>$(1+x^2)y''y' - 2xy^2 + y' = 0$</td><td>2</td></tr>
      <tr><td>$y^{(3)} + 2xy^2 + y'^3 - xy^2 + x^2 = 0$</td><td>3</td></tr>
    </table>
    <p><strong>Intégrer</strong> l'équation différentielle, c'est trouver une fonction $y=\\varphi(x)$ qui la vérifie ; cette fonction est appelée une <strong>intégrale</strong> (ou solution) de l'équation.</p>

    <h3>2. Équations à variables séparables</h3>
    <p>On appelle équation différentielle à variables séparables une équation de la forme $P(x)dx = Q(y)dy$, où $P$ et $Q$ sont des fonctions données. Il suffit alors d'intégrer chaque membre séparément.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> résoudre $y' = 3y$.</p>
      <p><strong>Solution :</strong> on sépare les variables : $\\dfrac{dy}{y}=3\\,dx$, puis on intègre : $\\ln|y|=3x+C$, donc $y=Ke^{3x}$ (avec $K=e^C$).</p>
      <p class="example-answer">Réponse : $y(x)=Ke^{3x}$ — une famille de solutions, une par valeur de $K$ (fixée si l'on connaît $y(0)$).</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La solution générale $y=Ke^{3x}$ d'une équation à variables séparables représente toute une famille de courbes, une pour chaque valeur de K. Pourquoi une seule condition initiale, comme $y(0)$, suffit-elle systématiquement à sélectionner une unique solution parmi cette famille infinie ?
    </div>

    <h3>3. Équations linéaires du premier ordre</h3>
    <p>Une équation de la forme $y' + a(x)y = b(x)$ est dite <strong>linéaire</strong> (l'inconnue $y$ et sa dérivée n'apparaissent qu'à la puissance 1). On la résout par la <strong>méthode de variation de la constante</strong>, en deux temps :</p>
    <table class="mini-table">
      <tr><th>Étape</th><th>Ce qu'on fait</th></tr>
      <tr><td>1. Équation homogène associée</td><td>Résoudre $y'+a(x)y=0$ (variables séparables) → $y_h = Ke^{-\\int a(x)dx}$</td></tr>
      <tr><td>2. Variation de la constante</td><td>On cherche une solution de l'équation complète sous la forme $y = C(x)e^{-\\int a(x)dx}$ ; en reportant dans l'équation, $C(x)$ se retrouve définie par une simple intégration : $C'(x) = b(x)e^{\\int a(x)dx}$</td></tr>
      <tr><td>3. Solution générale</td><td>$y = y_h + y_p = \\big(K+\\int b(x)e^{\\int a(x)dx}dx\\big)e^{-\\int a(x)dx}$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Pourquoi « variation de la constante » ?</span>
      On part de la solution homogène $y_h=Ke^{-\\int a(x)dx}$, où $K$ est une constante — puis on la laisse « varier » en la remplaçant par une fonction inconnue $C(x)$. C'est ce qui donne son nom à la méthode.
    </div>

    <h3>4. Équation de Bernoulli</h3>
    <p>Une équation de la forme $y' + a(x)y = b(x)y^n$ (avec $n\\neq 0,1$ — sinon l'équation serait déjà linéaire) est une <strong>équation de Bernoulli</strong>. Le changement de fonction $z=y^{1-n}$ la ramène à une équation <strong>linéaire</strong> en $z$ :</p>
    <div class="formula-box">$$z' + (1-n)a(x)z = (1-n)b(x)$$</div>
    <p>qu'on résout alors par la méthode de variation de la constante vue plus haut, avant de revenir à $y=z^{1/(1-n)}$.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le changement de fonction $z=y^{1-n}$ transforme une équation de Bernoulli non linéaire en une équation linéaire en z, que l'on sait déjà résoudre. En quoi cette stratégie — ramener un problème nouveau et difficile à un problème ancien et déjà maîtrisé — est-elle une démarche que tu retrouveras dans de nombreux autres contextes mathématiques, au-delà des seules équations différentielles ?
    </div>

    <h3>5. Équations homogènes en x et y</h3>
    <p>Une équation de la forme $y' = f\\big(\\frac{y}{x}\\big)$ est dite <strong>homogène</strong>. Le changement de fonction $y=xt(x)$ (donc $y'=t+xt'$) la ramène à une équation à variables séparables en $t$ et $x$.</p>

    <h3>6. Frontière de la recherche</h3>
    <p>La quasi-totalité des équations différentielles rencontrées dans les applications réelles — modélisation épidémiologique (comme le modèle SIR utilisé pour prévoir la propagation d'une épidémie), dynamique des populations, réactions chimiques complexes — n'admettent pas de solution explicite comme celles que tu as calculées dans ce chapitre : elles doivent être résolues numériquement, par des méthodes approchées qui calculent la solution point par point plutôt que par une formule fermée.</p>
    <p><strong>Question ouverte :</strong> quand une équation différentielle n'a pas de solution explicite, comment peut-on malgré tout garantir que la solution numérique approchée reste fidèle au comportement réel du système, sans dérive d'erreur accumulée au fil du calcul ?</p>
    <p><strong>Technologie émergente :</strong> les méthodes numériques de <strong>Runge-Kutta</strong>, bien plus précises que la méthode d'Euler élémentaire, sont aujourd'hui le standard pour simuler numériquement des équations différentielles dans des domaines aussi variés que la prévision météorologique, la simulation de trajectoires spatiales, ou la modélisation épidémiologique en temps réel.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Équation différentielle du 1er ordre → identifier le type (variables séparables, linéaire, Bernoulli, homogène) → ramener au type déjà maîtrisé par un changement de variable ou de fonction adapté → intégration → solution générale (famille de fonctions) → condition initiale pour sélectionner une solution unique
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$y = \\left(K + \\int b(x)e^{\\int a(x)dx}dx\\right)e^{-\\int a(x)dx}$$
      Cette formule, solution générale de toute équation linéaire du premier ordre, condense la méthode de variation de la constante héritée de Bernoulli et Leibniz : une solution homogène (le comportement « naturel » du système) à laquelle s'ajoute une solution particulière (l'effet du second membre b(x)) — la structure que l'on retrouvera identique pour les équations du second ordre.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Leibniz n'avait jamais trouvé le changement de fonction résolvant l'équation de Bernoulli : combien de temps aurait-il fallu attendre avant qu'un autre mathématicien découvre cette même astuce ?</li>
        <li>Pourquoi la méthode de variation de la constante porte-t-elle ce nom, alors que la constante K finit par devenir une fonction C(x) qui n'est plus du tout constante ?</li>
        <li>Quelle serait la conséquence, pour la prévision épidémiologique moderne, d'une absence de méthodes numériques capables de résoudre des équations différentielles sans solution explicite ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. Bernoulli, énoncé du problème de l'équation qui porte son nom, Acta Eruditorum, 1695.</li>
        <li>G. W. Leibniz, résolution de l'équation de Bernoulli par changement de fonction, Acta Eruditorum, 1696.</li>
        <li>J. M. Howie, <em>Real Analysis</em>, Springer Undergraduate Mathematics Series — référence pédagogique moderne sur les équations différentielles.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais reconnaître et résoudre les principaux types d'équations différentielles du premier ordre. Le dernier chapitre de cette matière, « Équations différentielles du second ordre à coefficients constants », étendra ces méthodes aux équations impliquant une dérivée seconde. Comme le montre le défi lancé par Jacob Bernoulli et relevé par Leibniz : une équation qui résiste d'abord à toute tentative de résolution directe cède souvent devant un simple changement de perspective, un changement de variable bien choisi.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>L'ordre d'une équation différentielle est celui de sa plus haute dérivée ; intégrer, c'est trouver une fonction solution (pas un nombre)</li>
        <li>Variables séparables : P(x)dx=Q(y)dy, on intègre chaque membre séparément</li>
        <li>Linéaire du 1er ordre : solution homogène Ke^(−∫a dx), puis variation de la constante pour la solution complète</li>
        <li>Bernoulli (y'+ay=by^n) : le changement z=y^(1−n) ramène toujours à une équation linéaire en z</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier la constante d'intégration lors de la séparation des variables — elle est indispensable pour décrire TOUTES les solutions</li>
        <li>Oublier le signe « moins » dans $y_h=Ke^{-\\int a(x)dx}$ pour une équation $y'+a(x)y=0$</li>
        <li>Appliquer le changement de Bernoulli alors que n=0 ou n=1 — dans ces cas l'équation est déjà (ou n'est pas) linéaire, la méthode ne s'applique pas</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — champ de directions de y' = k·y</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Chaque petit segment indique la pente y'=k·y au point correspondant. Fais varier k et la condition initiale y(0) et observe la courbe solution suivre le champ.</p>
      <div class="sim-2col">
        <svg viewBox="0 0 190 150" width="210" height="165">
          <line x1="15" y1="100" x2="180" y2="100" stroke="#3A4658" stroke-width="1"/>
          <line x1="20" y1="20" x2="20" y2="140" stroke="#3A4658" stroke-width="1"/>
          <line id="integSlope0" x1="14" y1="140" x2="26" y2="140" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope1" x1="14" y1="120" x2="26" y2="120" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope2" x1="14" y1="100" x2="26" y2="100" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope3" x1="14" y1="80" x2="26" y2="80" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope4" x1="14" y1="60" x2="26" y2="60" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope5" x1="49" y1="140" x2="61" y2="140" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope6" x1="49" y1="120" x2="61" y2="120" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope7" x1="49" y1="100" x2="61" y2="100" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope8" x1="49" y1="80" x2="61" y2="80" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope9" x1="49" y1="60" x2="61" y2="60" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope10" x1="84" y1="140" x2="96" y2="140" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope11" x1="84" y1="120" x2="96" y2="120" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope12" x1="84" y1="100" x2="96" y2="100" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope13" x1="84" y1="80" x2="96" y2="80" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope14" x1="84" y1="60" x2="96" y2="60" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope15" x1="119" y1="140" x2="131" y2="140" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope16" x1="119" y1="120" x2="131" y2="120" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope17" x1="119" y1="100" x2="131" y2="100" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope18" x1="119" y1="80" x2="131" y2="80" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope19" x1="119" y1="60" x2="131" y2="60" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope20" x1="154" y1="140" x2="166" y2="140" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope21" x1="154" y1="120" x2="166" y2="120" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope22" x1="154" y1="100" x2="166" y2="100" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope23" x1="154" y1="80" x2="166" y2="80" stroke="#5A6472" stroke-width="1.3"/>
          <line id="integSlope24" x1="154" y1="60" x2="166" y2="60" stroke="#5A6472" stroke-width="1.3"/>
          <polyline id="integSolCurve" points="" stroke="#F0B94D" stroke-width="2" fill="none"/>
        </svg>
        <div class="sim-controls">
          <label>k : <span id="integKVal">0.3</span></label>
          <input type="range" id="integK" min="-1" max="1" step="0.1" value="0.3" oninput="updateIntegSlopeField()">
          <label>y(0) : <span id="integY0Val">1.0</span></label>
          <input type="range" id="integY0" min="-2" max="2" step="0.1" value="1" oninput="updateIntegSlopeField()">
          <div class="sim-readout" id="integSlopeReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'équation $y'' + 3y' - xy = 0$ est d'ordre :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ5e1" value="wrong"> 1</label>
          <label class="option"><input type="radio" name="integ5e1" value="right"> 2</label>
          <label class="option"><input type="radio" name="integ5e1" value="wrong"> 3</label>
          <label class="option"><input type="radio" name="integ5e1" value="wrong"> 0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ5e1','integ5fb1','Correct — la plus haute dérivée présente est y\\'\\', donc l\\'équation est d\\'ordre 2.','L\\'ordre est celui de la dérivée la PLUS ÉLEVÉE apparaissant dans l\\'équation.')">Vérifier</button>
        <div class="feedback" id="integ5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour résoudre $\\dfrac{dy}{y^2}=x\\,dx$ (variables séparables), on obtient :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ5e2" value="wrong"> $y = \\dfrac{x^2}{2}+c$</label>
          <label class="option"><input type="radio" name="integ5e2" value="right"> $-\\dfrac{1}{y} = \\dfrac{x^2}{2}+c$</label>
          <label class="option"><input type="radio" name="integ5e2" value="wrong"> $\\ln|y| = \\dfrac{x^2}{2}+c$</label>
          <label class="option"><input type="radio" name="integ5e2" value="wrong"> $y^3=x^2+c$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ5e2','integ5fb2','Correct — ∫dy/y² = −1/y + c, et ∫x dx = x²/2 + c, donc −1/y = x²/2 + c (en regroupant les constantes).','Intègre séparément chaque membre : ∫y⁻²dy à gauche, ∫x dx à droite.')">Vérifier</button>
        <div class="feedback" id="integ5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour résoudre une équation de Bernoulli $y'+a(x)y=b(x)y^n$, le changement de fonction à utiliser est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ5e3" value="wrong"> $z = y^n$</label>
          <label class="option"><input type="radio" name="integ5e3" value="right"> $z = y^{1-n}$</label>
          <label class="option"><input type="radio" name="integ5e3" value="wrong"> $z = \\ln y$</label>
          <label class="option"><input type="radio" name="integ5e3" value="wrong"> $z = 1/y$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ5e3','integ5fb3','Correct — z=y^(1−n) ramène toujours l\\'équation de Bernoulli à une équation linéaire en z.','C\\'est LE changement de fonction caractéristique de la méthode de Bernoulli, vu dans ce chapitre.')">Vérifier</button>
        <div class="feedback" id="integ5fb3"></div>
      </div>
    </div>
  `,
  init: initIntegSlopeField
};

INTEG_NOVA_KB[integKey('Équations différentielles du premier ordre')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Équations différentielles du premier ordre ». Demande-moi comment résoudre une équation à variables séparables, la méthode de variation de la constante, ou un indice sur un exercice.",
  rules: [
    { test:/ordre/i, replies:["L'ordre d'une équation différentielle est celui de la dérivée la plus élevée qui y apparaît : y' → ordre 1, y'' → ordre 2, etc."] },
    { test:/lin[ée]aire/i, replies:["Une équation différentielle est linéaire si y et ses dérivées n'apparaissent qu'à la puissance 1 — pas de y², pas de sin(y), pas de produit y·y'."] },
    { test:/variable.*s[ée]parable/i, replies:["Une équation à variables séparables s'écrit P(x)dx = Q(y)dy : il suffit d'intégrer chaque membre séparément, chacun de son côté."] },
    { test:/variation de la constante/i, replies:["Pour y'+a(x)y=b(x) : 1) résous l'équation homogène y'+a(x)y=0 pour obtenir yh=Ke^(−∫a dx) ; 2) remplace K par une fonction C(x) et reporte dans l'équation complète pour trouver C(x) ; 3) la solution générale est y=yh+yp."] },
    { test:/bernoulli/i, replies:["Une équation de Bernoulli y'+a(x)y=b(x)y^n (n≠0,1) se ramène à une équation linéaire par le changement z=y^(1−n)."] },
    { test:/[ée]quation homog[èe]ne/i, replies:["Une équation homogène y'=f(y/x) se ramène à des variables séparables par le changement y=xt(x), qui donne y'=t+xt'."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repère la dérivée la plus élevée dans l'équation.","Indice niveau 2 : il y a un terme y''.","Indice niveau 3 : l'ordre est 2."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : intègre séparément dy/y² et x dx.","Indice niveau 2 : ∫y⁻²dy = −1/y + c.","Indice niveau 3 : −1/y = x²/2 + c."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : c'est LE changement de fonction du cours pour Bernoulli.","Indice niveau 2 : il utilise l'exposant (1−n), pas n.","Indice niveau 3 : z = y^(1−n)."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 3 — Calculateur du régime d'une équation ay''+by'+cy=0 (Chapitre 6)
--------------------------------------------------------------------------------- */
function updateIntegODE2(){
  const a = parseFloat(document.getElementById('integOa').value) || 1;
  const b = parseFloat(document.getElementById('integOb').value) || 0;
  const c = parseFloat(document.getElementById('integOc').value) || 0;
  const delta = b*b - 4*a*c;
  let out = `Équation caractéristique : ${a}r² + ${b}r + ${c} = 0<br>Δ = ${delta.toFixed(2)}<br>`;
  if(delta > 1e-9){
    const r1 = (-b+Math.sqrt(delta))/(2*a), r2 = (-b-Math.sqrt(delta))/(2*a);
    out += `Deux racines réelles distinctes : r₁ = ${r1.toFixed(3)}, r₂ = ${r2.toFixed(3)}<br>` +
      `Solution générale : y = K₁e^(${r1.toFixed(2)}x) + K₂e^(${r2.toFixed(2)}x) — <strong>régime apériodique</strong>.`;
  } else if(Math.abs(delta) <= 1e-9){
    const r0 = -b/(2*a);
    out += `Racine double : r₀ = ${r0.toFixed(3)}<br>` +
      `Solution générale : y = (K₁+K₂x)e^(${r0.toFixed(2)}x) — <strong>régime critique</strong>.`;
  } else {
    const alpha = -b/(2*a), beta = Math.sqrt(-delta)/(2*a);
    const nature = alpha < -1e-9 ? " amorti" : alpha > 1e-9 ? " amplifié" : "";
    out += `Racines complexes conjuguées : r = ${alpha.toFixed(3)} ± ${beta.toFixed(3)}i<br>` +
      `Solution générale : y = e^(${alpha.toFixed(2)}x)(K₁cos(${beta.toFixed(2)}x) + K₂sin(${beta.toFixed(2)}x)) — <strong>régime oscillatoire${nature}</strong>.`;
  }
  document.getElementById('integODE2Readout').innerHTML = out;
}
function initIntegODE2(){ updateIntegODE2(); }

/* =========================== CHAPITRE 6 — Équations différentielles du second ordre à coefficients constants =========================== */
INTEG_CHAPTERS[integKey('Équations différentielles du second ordre à coefficients constants')] = {
  objectives: [
    "Résoudre l'équation homogène ay''+by'+cy=0 selon le signe du discriminant de l'équation caractéristique",
    "Choisir la forme d'une solution particulière selon la nature du second membre",
    "Reconnaître un cas de résonance et adapter la solution particulière en conséquence",
    "Utiliser deux conditions initiales pour déterminer complètement une solution"
  ],
  prereqs: ["Équations différentielles du premier ordre"],
  bodyHtml: `
    <p>Une équation différentielle du second ordre nécessite deux constantes d'intégration (au lieu d'une seule à l'ordre 1) — il faut donc, en général, deux conditions initiales ($y(x_0)$ et $y'(x_0)$) pour fixer une solution unique. Ce chapitre traite le cas particulièrement important des équations <strong>linéaires à coefficients constants</strong>.</p>

    <h3>1. Équation homogène : l'équation caractéristique</h3>
    <p>Pour résoudre $ay''+by'+cy=0$ ($a,b,c$ constants), on cherche des solutions de la forme $y=e^{rx}$. En reportant dans l'équation, $e^{rx}$ se simplifie et il reste une simple équation du second degré, l'<strong>équation caractéristique</strong> :</p>
    <div class="formula-box">$$ar^2+br+c=0$$</div>
    <table class="mini-table">
      <tr><th>Signe de Δ</th><th>Racines</th><th>Solution générale</th></tr>
      <tr><td>$\\Delta > 0$</td><td>$r_1,r_2$ réelles distinctes</td><td>$y=K_1e^{r_1x}+K_2e^{r_2x}$</td></tr>
      <tr><td>$\\Delta = 0$</td><td>$r_0$ double</td><td>$y=(K_1+K_2x)e^{r_0x}$</td></tr>
      <tr><td>$\\Delta < 0$</td><td>$r=\\alpha\\pm i\\beta$</td><td>$y=e^{\\alpha x}\\big(K_1\\cos\\beta x+K_2\\sin\\beta x\\big)$</td></tr>
    </table>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 135 45" width="100%">
          <line x1="5" y1="40" x2="130" y2="40" stroke="#3A4658" stroke-width="1"/>
          <polyline points="5.0,10.0 11.0,14.2 17.0,17.8 23.0,20.9 29.0,23.5 35.0,25.8 41.0,27.8 47.0,29.5 53.0,31.0 59.0,32.2 65.0,33.3 71.0,34.2 77.0,35.0 83.0,35.7 89.0,36.3 95.0,36.8 101.0,37.3 107.0,37.7 113.0,38.0 119.0,38.3 125.0,38.5" stroke="#4C7CFF" stroke-width="1.8" fill="none"/>
        </svg>
        <span>Δ &gt; 0 : régime apériodique (décroissance simple)</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 135 45" width="100%">
          <line x1="5" y1="40" x2="130" y2="40" stroke="#3A4658" stroke-width="1"/>
          <polyline points="5.0,10.0 11.0,7.4 17.0,6.5 23.0,6.8 29.0,7.9 35.0,9.5 41.0,11.5 47.0,13.6 53.0,15.8 59.0,18.0 65.0,20.2 71.0,22.2 77.0,24.1 83.0,25.8 89.0,27.4 95.0,28.9 101.0,30.2 107.0,31.4 113.0,32.5 119.0,33.4 125.0,34.3" stroke="#2DD4C4" stroke-width="1.8" fill="none"/>
        </svg>
        <span>Δ = 0 : régime critique (retour sans oscillation, le plus rapide)</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 135 60" width="100%">
          <line x1="5" y1="35" x2="130" y2="35" stroke="#3A4658" stroke-width="1"/>
          <polyline points="5.0,10.0 8.0,12.6 11.0,17.4 14.0,23.7 17.0,30.9 20.0,38.3 23.0,45.2 26.0,51.1 29.0,55.4 32.0,58.1 35.0,58.9 38.0,58.1 41.0,55.7 44.0,52.1 47.0,47.8 50.0,43.2 53.0,38.7 56.0,34.7 59.0,31.5 62.0,29.4 65.0,28.3 68.0,28.3 71.0,29.4 74.0,31.3 77.0,33.8 80.0,36.6 83.0,39.5 86.0,42.2 89.0,44.4 92.0,46.1 95.0,47.1 98.0,47.4 101.0,47.0 104.0,46.0 107.0,44.6 110.0,43.0 113.0,41.2 116.0,39.4 119.0,37.9 122.0,36.6 125.0,35.8" stroke="#F0B94D" stroke-width="1.6" fill="none" transform="translate(0,-10) scale(1,0.55)"/>
        </svg>
        <span>Δ &lt; 0 : régime oscillatoire amorti</span>
      </div>
    </div>

    <h3>2. Solution particulière selon le second membre</h3>
    <p>Pour $ay''+by'+cy=d(x)$, la solution générale est $y=y_h+y_p$, où $y_h$ est la solution de l'équation homogène (ci-dessus) et $y_p$ une solution particulière quelconque de l'équation complète. On devine la forme de $y_p$ d'après celle de $d(x)$ :</p>
    <table class="mini-table">
      <tr><th>Second membre $d(x)$</th><th>Forme de $y_p$ à essayer</th></tr>
      <tr><td>Polynôme de degré $n$</td><td>polynôme de degré $n$ (degré $n+1$ si $c=0$ : « résonance » avec $r=0$)</td></tr>
      <tr><td>$k\\,e^{mx}$</td><td>$A e^{mx}$ (ou $Ax\\,e^{mx}$ si $m$ est racine simple, $Ax^2e^{mx}$ si racine double — résonance)</td></tr>
      <tr><td>$k\\cos\\omega x$ ou $k\\sin\\omega x$</td><td>$A\\cos\\omega x+B\\sin\\omega x$ (ou multiplié par $x$ si $i\\omega$ est racine — résonance)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">La résonance</span>
      Si le second membre a exactement la même forme qu'une solution de l'équation homogène, l'essai naïf ne fonctionne pas (il redonne 0) : il faut alors multiplier la forme d'essai par $x$ (ou $x^2$ en cas de racine double) — c'est le phénomène de <strong>résonance</strong>, bien connu en physique (oscillateur excité à sa fréquence propre).
    </div>

    <h3>3. Utiliser les conditions initiales</h3>
    <p>La solution générale contient deux constantes $K_1,K_2$. Pour les déterminer complètement, il faut deux informations, le plus souvent $y(x_0)$ et $y'(x_0)$ : on les reporte dans $y(x)$ et $y'(x)$, ce qui donne un système de deux équations linéaires en $K_1,K_2$.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> résoudre $y''-3y'+2y=0$ avec $y(0)=1$ et $y'(0)=0$.</p>
      <p><strong>Solution :</strong> équation caractéristique $r^2-3r+2=0$, soit $(r-1)(r-2)=0$ : $r_1=1,r_2=2$ ($\\Delta=1>0$). Solution générale $y=K_1e^{x}+K_2e^{2x}$. Conditions initiales : $y(0)=K_1+K_2=1$ et $y'(0)=K_1+2K_2=0$, d'où $K_2=-1$ et $K_1=2$.</p>
      <p class="example-answer">Réponse : $y(x) = 2e^{x}-e^{2x}$.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>y=e^(rx) transforme ay''+by'+cy=0 en l'équation caractéristique ar²+br+c=0</li>
        <li>Δ>0 → apériodique ; Δ=0 → critique ; Δ<0 → oscillatoire (amorti si la partie réelle des racines est négative)</li>
        <li>Solution générale = solution homogène + solution particulière ; la forme de la solution particulière se devine d'après le second membre</li>
        <li>En cas de résonance (second membre de même forme qu'une solution homogène), multiplier l'essai par x (ou x²)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>N'utiliser qu'une seule condition initiale pour une équation du second ordre — il en faut toujours DEUX (y et y' en un même point, en général)</li>
        <li>Oublier le facteur x (résonance) quand le second membre a la même forme qu'une solution de l'équation homogène</li>
        <li>Confondre régime critique (Δ=0, solution (K₁+K₂x)e^(r₀x)) avec régime apériodique (Δ>0, deux exponentielles distinctes)</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — nature des solutions de ay″+by′+cy=0</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre les coefficients a, b, c : le calculateur donne le discriminant, les racines et la forme de la solution générale.</p>
      <div class="sim-controls">
        <label>a : <input type="number" id="integOa" value="1" style="width:56px;" oninput="updateIntegODE2()"></label>
        <label>b : <input type="number" id="integOb" value="-3" style="width:56px;" oninput="updateIntegODE2()"></label>
        <label>c : <input type="number" id="integOc" value="2" style="width:56px;" oninput="updateIntegODE2()"></label>
        <div class="sim-readout" id="integODE2Readout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour $y''+4y'+4y=0$, le discriminant de l'équation caractéristique vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ6e1" value="wrong"> 16</label>
          <label class="option"><input type="radio" name="integ6e1" value="right"> 0</label>
          <label class="option"><input type="radio" name="integ6e1" value="wrong"> −16</label>
          <label class="option"><input type="radio" name="integ6e1" value="wrong"> 8</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ6e1','integ6fb1','Correct — Δ = b²−4ac = 16−16 = 0 : c\\'est le régime critique, avec r₀=−2 racine double.','Calcule Δ = b²−4ac avec a=1, b=4, c=4.')">Vérifier</button>
        <div class="feedback" id="integ6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour résoudre complètement une équation différentielle linéaire du second ordre, il faut en général :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ6e2" value="wrong"> aucune condition initiale</label>
          <label class="option"><input type="radio" name="integ6e2" value="wrong"> une seule condition initiale</label>
          <label class="option"><input type="radio" name="integ6e2" value="right"> deux conditions initiales</label>
          <label class="option"><input type="radio" name="integ6e2" value="wrong"> trois conditions initiales</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ6e2','integ6fb2','Correct — la solution générale contient 2 constantes (K1,K2), donc il faut 2 conditions (typiquement y(x0) et y\\'(x0)) pour les déterminer.','Combien de constantes K1, K2... apparaissent dans la solution générale d\\'une équation du second ordre ?')">Vérifier</button>
        <div class="feedback" id="integ6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $y''+y=\\cos x$ (le second membre a la même pulsation que la solution homogène), la solution particulière à essayer est de la forme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="integ6e3" value="wrong"> $A\\cos x+B\\sin x$</label>
          <label class="option"><input type="radio" name="integ6e3" value="right"> $x(A\\cos x+B\\sin x)$</label>
          <label class="option"><input type="radio" name="integ6e3" value="wrong"> $A e^x$</label>
          <label class="option"><input type="radio" name="integ6e3" value="wrong"> une constante $A$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('integ6e3','integ6fb3','Correct — c\\'est un cas de résonance (i est racine de l\\'équation caractéristique de y\\'\\'+y=0) : il faut multiplier l\\'essai naturel par x.','L\\'essai naturel Acos x+Bsin x est déjà solution de l\\'équation homogène — c\\'est un cas de résonance, il faut multiplier par x.')">Vérifier</button>
        <div class="feedback" id="integ6fb3"></div>
      </div>
    </div>
  `,
  init: initIntegODE2
};

INTEG_NOVA_KB[integKey('Équations différentielles du second ordre à coefficients constants')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Équations différentielles du second ordre ». Demande-moi comment traiter les 3 régimes, la résonance, ou un indice sur un exercice.",
  rules: [
    { test:/[ée]quation caract[ée]ristique/i, replies:["Pour ay''+by'+cy=0, on cherche y=e^(rx), ce qui donne l'équation caractéristique ar²+br+c=0 — une simple équation du second degré."] },
    { test:/discriminant|delta|Δ/i, replies:["Δ>0 → deux racines réelles distinctes, régime apériodique. Δ=0 → racine double, régime critique. Δ<0 → racines complexes conjuguées, régime oscillatoire."] },
    { test:/r[ée]gime/i, replies:["Apériodique (Δ>0) : somme de deux exponentielles, retour sans oscillation. Critique (Δ=0) : retour le plus rapide possible sans dépasser. Oscillatoire (Δ<0) : oscillations, amorties si la partie réelle des racines est négative."] },
    { test:/solution particuli[èe]re|second membre/i, replies:["La forme de la solution particulière se devine d'après le second membre : polynôme → polynôme, exponentielle k·e^(mx) → A·e^(mx), cos/sin → combinaison de cos et sin de même pulsation."] },
    { test:/r[ée]sonance/i, replies:["Il y a résonance quand le second membre a exactement la même forme qu'une solution de l'équation homogène. Dans ce cas, il faut multiplier l'essai naturel par x (ou x² si racine double)."] },
    { test:/condition initiale/i, replies:["Une équation du second ordre a 2 constantes K1, K2 dans sa solution générale : il faut donc 2 conditions initiales (typiquement y(x0) et y'(x0)) pour les déterminer complètement."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : calcule Δ=b²−4ac.","Indice niveau 2 : a=1, b=4, c=4 → Δ=16−16.","Indice niveau 3 : Δ=0."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compte les constantes dans la solution générale.","Indice niveau 2 : il y a K1 ET K2.","Indice niveau 3 : il faut donc 2 conditions initiales."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : vérifie si cos x et sin x sont déjà solutions de l'équation homogène y''+y=0.","Indice niveau 2 : oui, c'est un cas de résonance.","Indice niveau 3 : il faut multiplier l'essai par x."] }
  ]
};

/* fusionne le module Intégrales et équations différentielles dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, INTEG_CHAPTERS);
Object.assign(NOVA_KB, INTEG_NOVA_KB);