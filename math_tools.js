/* =====================================================================
   CHUNK « math_tools » — registre MATH_TOOLS_CHAPTERS / MATH_TOOLS_NOVA_KB
   Matière(s) : Mathématiques|Outils mathématiques pour la physique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   MATH_TOOLS_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ===================================================================================
   COURS "OUTILS MATHÉMATIQUES POUR LA PHYSIQUE" — contenu rédigé + simulations
   Source : polycopié FAST / UAC (Prof. E. A. Lawin & Dr G. Koto N'Gobi, 2014-2015),
   réécrit et simplifié pour la plateforme, illustré, avec simulations interactives
   uniquement là où elles aident vraiment à comprendre (les tableaux de constantes,
   l'alphabet grec et les tables d'unités du polycopié original — annexes de référence,
   pas des notions à comprendre — sont condensés en aide-mémoire repliable plutôt que
   développés comme du cours).
=================================================================================== */

const MATH_TOOLS_MATIERE = 'Outils mathématiques pour la physique';
function mtKey(chapterTitle){ return `Mathématiques|${MATH_TOOLS_MATIERE}|${chapterTitle}`; }

/* ---------------------------------------------------------------------------------
   SIMULATION 1 — Calculateur de propagation d'incertitude (Chapitre 1)
--------------------------------------------------------------------------------- */
function updateUncertaintySim(){
  const x = parseFloat(document.getElementById('uX').value) || 0;
  const dx = Math.abs(parseFloat(document.getElementById('uDX').value)) || 0;
  const y = parseFloat(document.getElementById('uY').value) || 0;
  const dy = Math.abs(parseFloat(document.getElementById('uDY').value)) || 0;
  const op = document.getElementById('uOp').value;
  const out = document.getElementById('uResult');
  let R, dR, label;
  if(op === 'add'){ R = x + y; dR = dx + dy; label = 'x + y'; }
  else if(op === 'sub'){ R = x - y; dR = dx + dy; label = 'x − y'; }
  else if(op === 'mul'){ R = x * y; dR = Math.abs(R) * ((x!==0?dx/Math.abs(x):0) + (y!==0?dy/Math.abs(y):0)); label = 'x × y'; }
  else { if(y === 0){ out.innerHTML = 'Division par zéro impossible — change la valeur de y.'; return; } R = x / y; dR = Math.abs(R) * (dx/Math.abs(x||1e-9) + dy/Math.abs(y)); label = 'x / y'; }
  const relPct = R !== 0 ? (Math.abs(dR / R) * 100) : 0;
  out.innerHTML = `${label} = ${R.toFixed(4).replace(/\.?0+$/,'')} <br>
    Incertitude absolue ΔR ≈ <strong>${dR.toFixed(4).replace(/\.?0+$/,'')}</strong><br>
    Résultat à présenter : <strong>${R.toFixed(3)} ± ${dR.toFixed(3)}</strong><br>
    Incertitude relative : ${relPct.toFixed(2)} %`;
}
function initUncertaintySim(){ updateUncertaintySim(); }

/* ---------------------------------------------------------------------------------
   SIMULATION 2 — Vecteurs 2D : somme, produit scalaire, produit vectoriel (Chapitre 2)
--------------------------------------------------------------------------------- */
function updateVectorSim(){
  const ax = parseFloat(document.getElementById('vAx').value);
  const ay = parseFloat(document.getElementById('vAy').value);
  const bx = parseFloat(document.getElementById('vBx').value);
  const by = parseFloat(document.getElementById('vBy').value);
  document.getElementById('vAxVal').textContent = ax.toFixed(1);
  document.getElementById('vAyVal').textContent = ay.toFixed(1);
  document.getElementById('vBxVal').textContent = bx.toFixed(1);
  document.getElementById('vByVal').textContent = by.toFixed(1);

  const cx = document.getElementById('cx') || 100, cy = 100, scale = 12;
  const toSvg = (x,y) => [100 + x*scale, 100 - y*scale];
  const setLine = (id, x, y) => {
    const [x2,y2] = toSvg(x,y);
    document.getElementById(id).setAttribute('x2', x2);
    document.getElementById(id).setAttribute('y2', y2);
  };
  setLine('vecA', ax, ay);
  setLine('vecB', bx, by);
  setLine('vecSum', ax+bx, ay+by);
  // B affiché aussi translaté au bout de A, pour visualiser la règle du parallélogramme
  const [ax1,ay1] = toSvg(ax,ay);
  const bTranslated = document.getElementById('vecBshift');
  bTranslated.setAttribute('x1', ax1); bTranslated.setAttribute('y1', ay1);
  const [sx,sy] = toSvg(ax+bx, ay+by);
  bTranslated.setAttribute('x2', sx); bTranslated.setAttribute('y2', sy);

  const dot = ax*bx + ay*by;
  const cross = ax*by - ay*bx; // composante en z du produit vectoriel en 2D
  const normA = Math.sqrt(ax*ax+ay*ay), normB = Math.sqrt(bx*bx+by*by);
  let angle = 'indéfini';
  if(normA > 0 && normB > 0){
    let cosA = dot/(normA*normB);
    cosA = Math.max(-1, Math.min(1, cosA));
    angle = (Math.acos(cosA) * 180 / Math.PI).toFixed(1) + '°';
  }
  document.getElementById('vecReadout').innerHTML =
    `A = (${ax.toFixed(1)}, ${ay.toFixed(1)}) — ‖A‖ = ${normA.toFixed(2)}<br>` +
    `B = (${bx.toFixed(1)}, ${by.toFixed(1)}) — ‖B‖ = ${normB.toFixed(2)}<br>` +
    `A + B = (${(ax+bx).toFixed(1)}, ${(ay+by).toFixed(1)})<br>` +
    `A · B = ${dot.toFixed(2)}<br>` +
    `(A ∧ B)·k&#8407; = ${cross.toFixed(2)} ${cross===0 && (ax||ay||bx||by) ? '→ vecteurs colinéaires' : ''}<br>` +
    `Angle (A, B) = ${angle}`;
}
function initVectorSim(){ updateVectorSim(); }

/* Convertisseur cartésien → cylindrique / sphérique */
function updateCoordConverter(){
  const x = parseFloat(document.getElementById('coX').value) || 0;
  const y = parseFloat(document.getElementById('coY').value) || 0;
  const z = parseFloat(document.getElementById('coZ').value) || 0;
  const rhoCyl = Math.sqrt(x*x + y*y);
  let theta = Math.atan2(y, x); if(theta < 0) theta += 2*Math.PI;
  const rhoSph = Math.sqrt(x*x + y*y + z*z);
  const thetaSph = rhoSph > 0 ? Math.acos(z/rhoSph) : 0;
  document.getElementById('coordOut').innerHTML =
    `<strong>Cylindriques</strong> : ρ = ${rhoCyl.toFixed(3)}, θ = ${(theta*180/Math.PI).toFixed(1)}°, z = ${z.toFixed(3)}<br>` +
    `<strong>Sphériques</strong> : ρ = ${rhoSph.toFixed(3)}, θ (colatitude) = ${(thetaSph*180/Math.PI).toFixed(1)}°, φ = ${(theta*180/Math.PI).toFixed(1)}°`;
}

/* ---------------------------------------------------------------------------------
   SIMULATION 3 — Champ de gradient (Chapitre 3)
--------------------------------------------------------------------------------- */
function gradField(fieldKey, x, y){
  // renvoie [df/dx, df/dy] pour quelques champs scalaires simples f(x,y)
  if(fieldKey === 'bowl') return [2*x, 2*y];           // f = x² + y²  (bol)
  if(fieldKey === 'saddle') return [2*x, -2*y];        // f = x² − y²  (col)
  return [1, 0.5];                                      // f = x + y/2 (plan incliné)
}
function drawGradientField(){
  const key = document.getElementById('gradField').value;
  const svg = document.getElementById('gradSvg');
  // efface les anciennes flèches (garde les axes, ids fixes "axisX"/"axisY")
  Array.from(svg.querySelectorAll('.grad-arrow')).forEach(el => el.remove());
  const scale = 9, arrowScale = 4.5;
  for(let gx = -4; gx <= 4; gx++){
    for(let gy = -4; gy <= 4; gy++){
      const [dx, dy] = gradField(key, gx, gy);
      const norm = Math.sqrt(dx*dx+dy*dy) || 1;
      const ux = dx/norm, uy = dy/norm;
      const x1 = 100 + gx*scale, y1 = 100 - gy*scale;
      const x2 = x1 + ux*arrowScale, y2 = y1 - uy*arrowScale;
      const line = document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1', x1); line.setAttribute('y1', y1);
      line.setAttribute('x2', x2); line.setAttribute('y2', y2);
      line.setAttribute('stroke', '#2DD4C4'); line.setAttribute('stroke-width', '1.4');
      line.setAttribute('marker-end', 'url(#gradArrowHead)');
      line.setAttribute('class', 'grad-arrow');
      svg.appendChild(line);
    }
  }
}
function initGradientSim(){ drawGradientField(); }

/* ---------------------------------------------------------------------------------
   SIMULATION 4 — Plan complexe : z1, z2, somme et produit (Chapitre 4)
--------------------------------------------------------------------------------- */
function updateComplexSim(){
  const a = parseFloat(document.getElementById('cxA').value);
  const b = parseFloat(document.getElementById('cxB').value);
  const c = parseFloat(document.getElementById('cxC').value);
  const d = parseFloat(document.getElementById('cxD').value);
  document.getElementById('cxAVal').textContent = a.toFixed(1);
  document.getElementById('cxBVal').textContent = b.toFixed(1);
  document.getElementById('cxCVal').textContent = c.toFixed(1);
  document.getElementById('cxDVal').textContent = d.toFixed(1);

  const scale = 12;
  const toSvg = (x,y) => [100 + x*scale, 100 - y*scale];
  const place = (id, x, y) => { const [px,py] = toSvg(x,y); document.getElementById(id).setAttribute('cx',px); document.getElementById(id).setAttribute('cy',py); };
  const line = (id, x, y) => { const [px,py] = toSvg(x,y); document.getElementById(id).setAttribute('x2',px); document.getElementById(id).setAttribute('y2',py); };
  place('cxZ1', a, b); line('cxLine1', a, b);
  place('cxZ2', c, d); line('cxLine2', c, d);
  const sumRe = a+c, sumIm = b+d;
  place('cxZsum', sumRe, sumIm); line('cxLineSum', sumRe, sumIm);
  const prodRe = a*c - b*d, prodIm = a*d + b*c;
  place('cxZprod', prodRe, prodIm); line('cxLineProd', prodRe, prodIm);

  const mod1 = Math.sqrt(a*a+b*b), mod2 = Math.sqrt(c*c+d*d);
  const arg1 = Math.atan2(b,a) * 180/Math.PI, arg2 = Math.atan2(d,c) * 180/Math.PI;
  document.getElementById('cxReadout').innerHTML =
    `z1 = ${a.toFixed(1)} + ${b.toFixed(1)}i — |z1| = ${mod1.toFixed(2)}, arg(z1) = ${arg1.toFixed(1)}°<br>` +
    `z2 = ${c.toFixed(1)} + ${d.toFixed(1)}i — |z2| = ${mod2.toFixed(2)}, arg(z2) = ${arg2.toFixed(1)}°<br>` +
    `z1 + z2 = ${sumRe.toFixed(1)} + ${sumIm.toFixed(1)}i <span style="color:#F0B94D;">(point jaune)</span><br>` +
    `z1 × z2 = ${prodRe.toFixed(1)} + ${prodIm.toFixed(1)}i <span style="color:#FF6B6F;">(point rouge)</span> — module ${(mod1*mod2).toFixed(2)}, argument ${(arg1+arg2).toFixed(1)}°`;
}
function initComplexSim(){ updateComplexSim(); }

/* ---------------------------------------------------------------------------------
   SIMULATION 5 — Courbes solutions d'équations différentielles (Chapitre 5)
--------------------------------------------------------------------------------- */
function updateOdeSim(){
  const regime = document.getElementById('odeRegime').value;
  const k = parseFloat(document.getElementById('odeK').value);
  document.getElementById('odeKVal').textContent = k.toFixed(2);
  const y0 = parseFloat(document.getElementById('odeY0').value);
  document.getElementById('odeY0Val').textContent = y0.toFixed(1);
  const svg = document.getElementById('odeSvg');
  const path = document.getElementById('odePath');
  const N = 160, W = 260, H = 160, x0px = 10, tMax = 6;
  let d = '';
  let maxAbs = 0.001;
  const values = [];
  for(let i = 0; i <= N; i++){
    const t = (i/N) * tMax;
    let y;
    if(regime === 'exp') y = y0 * Math.exp(k * t);
    else if(regime === 'harm') y = y0 * Math.cos(k * t);
    else y = y0 * Math.exp(-0.4*t) * Math.cos(k * t); // oscillation amortie
    values.push(y);
    if(Math.abs(y) > maxAbs) maxAbs = Math.abs(y);
  }
  const yScale = (H/2 - 10) / maxAbs;
  values.forEach((y, i) => {
    const px = x0px + (i/N) * (W - x0px - 10);
    const py = H/2 - y * yScale;
    d += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
  });
  path.setAttribute('d', d);
}
function initOdeSim(){ updateOdeSim(); }

/* ---------------------------------------------------------------------------------
   SIMULATION 6 — Moment d'une force / glisseur (Chapitre 6)
--------------------------------------------------------------------------------- */
function updateMomentSim(){
  const ax = parseFloat(document.getElementById('mAx').value);
  const ay = parseFloat(document.getElementById('mAy').value);
  const fx = parseFloat(document.getElementById('mFx').value);
  const fy = parseFloat(document.getElementById('mFy').value);
  document.getElementById('mAxVal').textContent = ax.toFixed(1);
  document.getElementById('mAyVal').textContent = ay.toFixed(1);
  document.getElementById('mFxVal').textContent = fx.toFixed(1);
  document.getElementById('mFyVal').textContent = fy.toFixed(1);

  const scale = 11;
  const toSvg = (x,y) => [100 + x*scale, 110 - y*scale];
  const [ox,oy] = toSvg(0,0);
  document.getElementById('mO').setAttribute('cx', ox); document.getElementById('mO').setAttribute('cy', oy);
  const [axp, ayp] = toSvg(ax, ay);
  document.getElementById('mA').setAttribute('cx', axp); document.getElementById('mA').setAttribute('cy', ayp);
  document.getElementById('mOA').setAttribute('x1', ox); document.getElementById('mOA').setAttribute('y1', oy);
  document.getElementById('mOA').setAttribute('x2', axp); document.getElementById('mOA').setAttribute('y2', ayp);
  const [fEndX, fEndY] = toSvg(ax+fx, ay+fy);
  document.getElementById('mForce').setAttribute('x1', axp); document.getElementById('mForce').setAttribute('y1', ayp);
  document.getElementById('mForce').setAttribute('x2', fEndX); document.getElementById('mForce').setAttribute('y2', fEndY);

  const moment = ax*fy - ay*fx; // composante en z de OA ∧ F
  document.getElementById('momentReadout').innerHTML =
    `A = (${ax.toFixed(1)}, ${ay.toFixed(1)}) — F&#8407; = (${fx.toFixed(1)}, ${fy.toFixed(1)})<br>` +
    `Moment en O (composante z) : M = xA·Fy − yA·Fx = <strong>${moment.toFixed(2)}</strong><br>` +
    `Glisse A le long de la droite d'action de F&#8407; (bouton ci-dessous) : le moment ne change pas.`;
}
function slideAlongForce(){
  const ax = parseFloat(document.getElementById('mAx').value);
  const ay = parseFloat(document.getElementById('mAy').value);
  const fx = parseFloat(document.getElementById('mFx').value);
  const fy = parseFloat(document.getElementById('mFy').value);
  const norm = Math.sqrt(fx*fx+fy*fy) || 1;
  const step = 0.8;
  const newAx = ax + (fx/norm)*step, newAy = ay + (fy/norm)*step;
  document.getElementById('mAx').value = Math.max(-6, Math.min(6, newAx)).toFixed(1);
  document.getElementById('mAy').value = Math.max(-6, Math.min(6, newAy)).toFixed(1);
  updateMomentSim();
}
function initMomentSim(){ updateMomentSim(); }
const MATH_TOOLS_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
MATH_TOOLS_CHAPTERS[mtKey("Différentielles et calcul d'incertitudes")] = {
  objectives: [
    "Comprendre ce qu'est la différentielle d'une fonction et à quoi elle sert",
    "Distinguer erreur et incertitude, absolue et relative",
    "Propager une incertitude à travers une somme, un produit, un quotient ou une puissance",
    "Analyser une formule physique pour évaluer la source dominante d'incertitude dans le résultat final",
    "Évaluer la validité d'une approximation de Taylor en fonction de l'ordre de grandeur de la variable"
  ],
  prereqs: ["Dérivée d'une fonction", "Dérivées partielles (notion de base)"],
  bodyHtml: `
    <p>En 1875, le physicien écossais James Clerk Maxwell écrivait que « toute connaissance physique est de la connaissance de mesures » — une phrase qui reste d'une actualité totale. Aucune expérience, aussi soignée soit-elle, ne donne un nombre exact : elle donne un nombre entaché d'une marge d'erreur, et savoir manier cette marge n'est pas un détail technique annexe, c'est une compétence centrale du métier de physicien.</p>
    <p>Ce n'est pas propre au laboratoire universitaire : quand un ingénieur civil calcule la charge maximale qu'un pont peut supporter, quand la NASA programme la trajectoire d'une sonde, ou quand un laboratoire pharmaceutique dose un principe actif, la question n'est jamais « quelle est la valeur exacte ? » mais « avec quelle marge cette valeur est-elle fiable ? ».</p>
    <p>Ce chapitre te donne les deux outils indispensables pour répondre à cette question : la <strong>différentielle</strong>, qui permet d'approximer une petite variation, et le <strong>calcul d'incertitudes</strong>, qui permet de propager rigoureusement une marge d'erreur à travers n'importe quel calcul.</p>

    <h3>1. La différentielle : mesurer une petite variation</h3>
    <p>Pour une fonction $f$ d'une seule variable $x$, dérivable en $x$, la dérivée $f'(x)$ donne la pente de la tangente à la courbe. La <strong>différentielle</strong> $df$ traduit cette pente en variation réelle : si $x$ varie d'une toute petite quantité $dx$, alors $f(x)$ varie d'environ :</p>
    <div class="formula-box">$$df = f'(x)\\,dx$$</div>
    <p>Concrètement, $df$ est la variation de $f$ qu'on lirait en suivant la <em>tangente</em> plutôt que la courbe elle-même — une excellente approximation tant que $dx$ reste petit.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 100" width="100%">
          <path d="M10,85 Q55,10 130,30" stroke="#4C7CFF" stroke-width="2.4" fill="none"/>
          <circle cx="80" cy="42" r="3.5" fill="#F0B94D"/>
          <line x1="55" y1="60" x2="110" y2="28" stroke="#FF6B6F" stroke-width="1.8" stroke-dasharray="3,2"/>
          <text x="8" y="96" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">courbe f(x)</text>
          <text x="95" y="24" font-family="IBM Plex Mono" font-size="9" fill="#FF6B6F">tangente</text>
        </svg>
        <span>df suit la tangente, pas la courbe</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 140 100" width="100%">
          <line x1="20" y1="80" x2="20" y2="20" stroke="#5A6472" stroke-width="1.5"/>
          <line x1="20" y1="80" x2="120" y2="80" stroke="#5A6472" stroke-width="1.5"/>
          <rect x="40" y="45" width="30" height="35" fill="none" stroke="#4C7CFF" stroke-width="1.6"/>
          <rect x="70" y="42" width="8" height="3" fill="#2DD4C4"/>
          <text x="38" y="40" font-family="IBM Plex Mono" font-size="8" fill="#2DD4C4">df</text>
          <rect x="40" y="80" width="30" height="4" fill="#F0B94D"/>
          <text x="42" y="95" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">dx</text>
        </svg>
        <span>dx à l'horizontale, df à la verticale</span>
      </div>
    </div>

    <p><strong>Exemple :</strong> pour $f(x) = 4x^3 - x + 1$, on a $f'(x) = 12x^2 - 1$, donc $df = (12x^2-1)\\,dx$.</p>

    <h3>2. Fonction de plusieurs variables : la différentielle totale</h3>
    <p>Quand $f$ dépend de plusieurs variables ($x$, $y$, $z$...), chaque variable contribue séparément à la variation totale de $f$, via sa <strong>dérivée partielle</strong> (la dérivée par rapport à cette variable, les autres étant maintenues constantes) :</p>
    <div class="formula-box">$$df = \\frac{\\partial f}{\\partial x}\\,dx + \\frac{\\partial f}{\\partial y}\\,dy + \\frac{\\partial f}{\\partial z}\\,dz + \\dots$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Une dérivée partielle se calcule exactement comme une dérivée normale : on dérive par rapport à une variable en traitant toutes les autres comme des constantes.
    </div>
    <p><strong>Exemple :</strong> pour $f(x,y) = x^3y + 4x^2 - y^2 + 7xy + 8$, on obtient $\\frac{\\partial f}{\\partial x} = 3x^2y + 8x + 7y$ et $\\frac{\\partial f}{\\partial y} = x^3 - 2y + 7x$, d'où $df = (3x^2y+8x+7y)\\,dx + (x^3-2y+7x)\\,dy$.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si $f(x,y)=x+y$, alors $df=dx+dy$, quelles que soient les valeurs de $x$ et $y$. Pourquoi la différentielle ne dépend-elle ici pas du point où on l'évalue, contrairement à l'exemple précédent avec $x^3y$ ?
    </div>

    <h3>3. Erreur et incertitude : pourquoi ça compte</h3>
    <p>Toute mesure physique est approximative. On distingue deux notions souvent confondues :</p>
    <table class="mini-table">
      <tr><th>Notion</th><th>Définition</th><th>Condition</th></tr>
      <tr><td><strong>Erreur</strong> $\\delta x$</td><td>Écart entre la valeur mesurée et la valeur <em>vraie</em> : $\\delta x = x_{mes} - x_e$</td><td>Suppose qu'on connaît la valeur vraie</td></tr>
      <tr><td><strong>Incertitude</strong> $\\Delta x$</td><td>Majorant de l'erreur qu'on <em>estime</em> avoir commise</td><td>Utilisée quand la valeur vraie est inconnue (cas le plus fréquent)</td></tr>
    </table>
    <p>Dans les deux cas, on distingue la version <strong>absolue</strong> (même unité que la grandeur, ex. $\\pm 1\\,\\text{mm}$) de la version <strong>relative</strong> (sans unité, souvent en %) : $\\text{incertitude relative} = \\dfrac{\\Delta x}{x}$.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> la longueur d'un objet est donnée par $L = 153 \\pm 1\\ \\text{mm}$.</p>
      <p><strong>Interprétation :</strong> on est presque sûr que la vraie longueur est comprise entre 152 mm et 154 mm.</p>
      <p class="example-answer">Incertitude relative : $1/153 \\approx 0{,}65\\,\\%$ — une mesure très précise.</p>
    </div>

    <h3>4. Propager une incertitude dans un calcul</h3>
    <p>Une fois les incertitudes des mesures de départ connues, il faut savoir comment elles se répercutent dans un résultat calculé à partir de ces mesures.</p>
    <table class="mini-table">
      <tr><th>Opération</th><th>Règle de propagation</th></tr>
      <tr><td>Somme $R = A + B$ ou différence $R = A - B$</td><td>$\\Delta R = \\Delta A + \\Delta B$ (les incertitudes <em>absolues</em> s'additionnent)</td></tr>
      <tr><td>Produit ou quotient $R = \\dfrac{A \\cdot B}{C}$</td><td>$\\dfrac{\\Delta R}{R} = \\dfrac{\\Delta A}{A} + \\dfrac{\\Delta B}{B} + \\dfrac{\\Delta C}{C}$ (les incertitudes <em>relatives</em> s'additionnent)</td></tr>
      <tr><td>Puissance $f = x^{\\alpha}$</td><td>$\\dfrac{\\Delta f}{f} = |\\alpha| \\dfrac{\\Delta x}{x}$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Pourquoi on additionne toujours (jamais on ne soustrait)</span>
      On se place systématiquement dans le cas le plus défavorable : les erreurs pourraient s'ajouter dans le pire des cas, donc on majore toujours l'incertitude — jamais on ne la minore en la faisant disparaître par soustraction.
    </div>
    <p><strong>Contre-exemple à méditer :</strong> si l'on calcule $R=A-A$ avec deux mesures indépendantes de la même grandeur $A=10{,}0\\pm0{,}5$, la règle donne $R=0\\pm1{,}0$ — alors qu'on pourrait naïvement penser que « $A-A$ vaut toujours zéro sans incertitude ». C'est bien correct : ce sont deux mesures <em>indépendantes</em>, chacune avec sa propre erreur, qui ne s'annulent pas magiquement entre elles.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Pourquoi la règle de propagation pour un produit/quotient porte-t-elle sur les incertitudes <em>relatives</em>, alors que pour une somme/différence elle porte sur les incertitudes <em>absolues</em> ? Essaie de le retrouver à partir de la différentielle de $\\ln(R)$ pour $R=AB$.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un récipient a une masse $m = 50 \\pm 1\\,\\text{g}$. Rempli d'eau, l'ensemble pèse $M = 200 \\pm 1\\,\\text{g}$. Quelle est la masse d'eau, avec son incertitude ?</p>
      <p><strong>Solution :</strong> $m_{eau} = M - m = 150\\,\\text{g}$. C'est une différence, donc $\\Delta m_{eau} = \\Delta M + \\Delta m = 1 + 1 = 2\\,\\text{g}$.</p>
      <p class="example-answer">Réponse : $m_{eau} = 150 \\pm 2\\,\\text{g}$.</p>
    </div>

    <h3>5. Présenter un résultat : les chiffres significatifs</h3>
    <p>Les <strong>chiffres significatifs</strong> (cs) d'un résultat sont l'ensemble des chiffres dont on est certain, plus le dernier qui peut être douteux (c'est celui qui porte l'incertitude). Par exemple $d=21{,}348\\,\\text{km}$ comporte 5 cs, dont le dernier (8) est douteux.</p>
    <div class="key-point">
      <span class="eyebrow">Règle des zéros</span>
      Les zéros placés à <strong>gauche</strong> d'un nombre ne sont jamais des cs ($d=0{,}008\\,\\text{km}=8\\,\\text{m}$ n'a qu'1 cs). Les zéros placés à <strong>droite</strong> sont, eux, tous des cs ($L=1{,}030\\,\\text{m}$ a 4 cs).
    </div>
    <p>Le nombre de chiffres donnés pour l'incertitude doit rester cohérent avec celui du résultat : on écrit $A=123{,}45\\pm0{,}08$ et non $123{,}45\\pm0{,}082$ (l'incertitude elle-même n'a presque jamais plus d'un ou deux cs). De même, il ne faut pas tronquer le résultat en dessous de la précision réellement obtenue : si une longueur est connue au millimètre près, $a=1{,}375\\pm0{,}001\\,\\text{m}$ et non $a=1{,}3\\pm0{,}001\\,\\text{m}$.</p>

    <h3>6. Approximations usuelles (développement de Taylor)</h3>
    <p>En physique, on remplace très souvent une expression compliquée par son <strong>approximation au premier ordre</strong> autour d'un point, quand une grandeur est petite. Les approximations les plus utiles, pour $x$ petit :</p>
    <div class="formula-box">
      $(1+x)^{\\alpha} \\approx 1 + \\alpha x$ &nbsp;·&nbsp; $\\sin x \\approx \\tan x \\approx x$ &nbsp;·&nbsp; $\\cos x \\approx 1 - \\dfrac{x^2}{2}$ &nbsp;·&nbsp; $e^{x} \\approx 1 + x$ &nbsp;·&nbsp; $\\ln(1+x) \\approx x$
    </div>
    <p>Exemple classique : le champ de pesanteur $g(z) = g_0\\left(\\frac{R}{R+z}\\right)^2$ près du sol, avec $z \\ll R$, s'approxime en $g(z) \\approx g_0\\left(1 - 2\\dfrac{z}{R}\\right)$ — bien plus simple à manipuler, pour une erreur négligeable.</p>

    <details style="margin:16px 0;">
      <summary class="accordion-toggle">📎 Aide-mémoire : dérivées usuelles (à consulter si besoin, pas à apprendre par cœur)</summary>
      <table class="mini-table">
        <tr><th>$f(x)$</th><td>$x^n$</td><td>$\\frac{1}{x}$</td><td>$\\sin x$</td><td>$\\cos x$</td><td>$e^x$</td><td>$\\ln x$</td></tr>
        <tr><th>$f'(x)$</th><td>$nx^{n-1}$</td><td>$-\\frac{1}{x^2}$</td><td>$\\cos x$</td><td>$-\\sin x$</td><td>$e^x$</td><td>$\\frac{1}{x}$</td></tr>
      </table>
    </details>

    <h3>7. Frontière de la recherche — quand l'incertitude devient centrale</h3>
    <p>Le 4 juillet 2012, le CERN annonçait la découverte du boson de Higgs — mais cette annonce reposait entièrement sur un critère de certitude statistique très strict (« 5 sigma », soit une chance sur environ 3,5 millions que le signal observé soit un simple artefact). Cette exigence n'est rien d'autre qu'une version extrêmement rigoureuse de la propagation d'incertitude que tu étudies dans ce chapitre, appliquée à des milliards de collisions de particules.</p>
    <p><strong>Question ouverte :</strong> en cosmologie, la mesure de la constante de Hubble (qui décrit l'expansion de l'Univers) par deux méthodes indépendantes donne aujourd'hui deux valeurs qui ne se recouvrent pas, même en tenant compte de leurs incertitudes respectives — c'est ce qu'on appelle la « tension de Hubble ». S'agit-il d'une incertitude sous-estimée, ou d'une véritable nouvelle physique ? La question reste activement débattue.</p>
    <p><strong>Technologie émergente :</strong> les méthodes de propagation d'incertitude par simulation numérique (dites « méthodes de Monte-Carlo »), qui font varier aléatoirement chaque grandeur d'entrée des milliers de fois pour observer la distribution du résultat, deviennent la norme dès qu'une formule est trop complexe pour la propagation analytique que tu apprends ici — mais reposent sur exactement les mêmes idées de base.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Mesures avec incertitude → formule physique → différentielle/règles de propagation → incertitude sur le résultat final
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$df = \\sum_i \\frac{\\partial f}{\\partial x_i}\\,dx_i$$
      Toutes les règles de propagation d'incertitude de ce chapitre (somme, produit, puissance) ne sont que des cas particuliers de cette unique formule.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>La différentielle $df = f'(x)dx$ approxime une petite variation en suivant la tangente</li>
        <li>Pour plusieurs variables, chaque variable contribue via sa dérivée partielle : $df = \\sum \\frac{\\partial f}{\\partial x_i} dx_i$</li>
        <li>L'incertitude absolue s'additionne pour une somme/différence ; l'incertitude relative s'additionne pour un produit/quotient</li>
        <li>On se place toujours dans le cas le plus défavorable : les incertitudes ne se compensent jamais</li>
      </ul>
      <p class="recap-note">Vérifie que ces points sont acquis avec les exercices ci-dessous.</p>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Soustraire les incertitudes au lieu de les additionner (même pour une différence de mesures !)</li>
        <li>Mélanger incertitude absolue et relative dans une même formule</li>
        <li>Oublier la valeur absolue de l'exposant $\\alpha$ dans la règle de la puissance</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — propagation d'incertitude</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Choisis deux mesures avec leur incertitude, et une opération : observe comment l'incertitude du résultat en dépend.</p>
      <div class="sim-2col">
        <div class="sim-controls">
          <label>x</label><input type="number" id="uX" value="10" step="0.1" oninput="updateUncertaintySim()">
          <label>Δx (incertitude absolue sur x)</label><input type="number" id="uDX" value="0.5" step="0.1" oninput="updateUncertaintySim()">
          <label>y</label><input type="number" id="uY" value="4" step="0.1" oninput="updateUncertaintySim()">
          <label>Δy (incertitude absolue sur y)</label><input type="number" id="uDY" value="0.2" step="0.1" oninput="updateUncertaintySim()">
          <label>Opération</label>
          <select id="uOp" onchange="updateUncertaintySim()">
            <option value="add">x + y</option>
            <option value="sub">x − y</option>
            <option value="mul">x × y</option>
            <option value="div">x / y</option>
          </select>
          <div class="sim-readout" id="uResult"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour $f(x) = 3x^2 - 5x$, quelle est l'expression correcte de $df$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt1e1" value="wrong"> $df = (3x - 5)dx$</label>
          <label class="option"><input type="radio" name="mt1e1" value="right"> $df = (6x - 5)dx$</label>
          <label class="option"><input type="radio" name="mt1e1" value="wrong"> $df = 6x\\,dx^2$</label>
          <label class="option"><input type="radio" name="mt1e1" value="wrong"> $df = (6x^2 - 5x)dx$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt1e1','mt1fb1','Correct — la dérivée de 3x² − 5x est 6x − 5, donc df = (6x − 5)dx.','Reviens à la règle : df = f\\'(x)dx. La dérivée de 3x² est 6x, celle de −5x est −5.')">Vérifier</button>
        <div class="feedback" id="mt1fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">On mesure $A = 12{,}0 \\pm 0{,}2\\,\\text{cm}$ et $B = 5{,}0 \\pm 0{,}1\\,\\text{cm}$. Quelle est l'incertitude absolue sur $R = A + B$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt1e2" value="wrong"> 0,1 cm</label>
          <label class="option"><input type="radio" name="mt1e2" value="right"> 0,3 cm</label>
          <label class="option"><input type="radio" name="mt1e2" value="wrong"> 0,02 cm</label>
          <label class="option"><input type="radio" name="mt1e2" value="wrong"> 0,2 cm</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt1e2','mt1fb2','Correct — pour une somme, les incertitudes absolues s\\'additionnent : 0,2 + 0,1 = 0,3 cm.','Pour une somme, on additionne les incertitudes absolues : ΔR = ΔA + ΔB.')">Vérifier</button>
        <div class="feedback" id="mt1fb2"></div>
      </div>

      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">On calcule $R = \\dfrac{A}{B}$ avec $A = 20 \\pm 1$ et $B = 4 \\pm 0{,}2$. Quelle est l'incertitude relative sur $R$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt1e3" value="wrong"> 2,5 %</label>
          <label class="option"><input type="radio" name="mt1e3" value="wrong"> 5 %</label>
          <label class="option"><input type="radio" name="mt1e3" value="right"> 10 %</label>
          <label class="option"><input type="radio" name="mt1e3" value="wrong"> 20 %</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt1e3','mt1fb3','Correct — pour un quotient, les incertitudes relatives s\\'additionnent : 1/20 + 0,2/4 = 5% + 5% = 10%.','Pour un quotient, additionne les incertitudes relatives : ΔA/A + ΔB/B, soit 1/20 = 5% et 0,2/4 = 5%.')">Vérifier</button>
        <div class="feedback" id="mt1fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Tu mesures le volume d'un cylindre en mesurant son diamètre $D$ (au pied à coulisse, incertitude relative 1%) et sa hauteur $h$ (à la règle, incertitude relative 3%). Sachant que $V=\\pi D^2 h/4$, propose une démarche pour déterminer laquelle des deux mesures (D ou h) domine l'incertitude finale sur V, et pourquoi. Que conseillerais-tu à un expérimentateur qui voudrait réduire au maximum l'incertitude sur V, avec un temps de mesure limité ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : applique la règle de propagation pour un produit/quotient à V=πD²h/4, en n'oubliant pas l'exposant 2 sur D — quel effet cet exposant a-t-il sur la contribution relative de D ?</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on pouvait mesurer une grandeur avec une précision infinie : la notion de chiffres significatifs aurait-elle encore un sens ?</li>
        <li>Pourquoi la règle « on additionne toujours, jamais on ne soustrait » pour propager une incertitude reflète-t-elle une posture de prudence plutôt qu'un résultat mathématique exact (au sens des probabilités, les erreurs indépendantes se combinent en fait souvent en quadrature) ?</li>
        <li>Quelle serait la conséquence, pour la fiabilité d'un pont, d'un bureau d'études qui négligerait systématiquement la propagation des incertitudes dans ses calculs de charge ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. Taylor, <em>Incertitudes et analyse des erreurs dans les mesures physiques</em>, Dunod — référence classique sur le calcul d'incertitudes en physique expérimentale.</li>
        <li>J.-P. Pérez, <em>Mécanique — Fondements et applications</em>, Dunod (annexe sur les outils mathématiques et l'analyse dimensionnelle).</li>
        <li>ATLAS Collaboration, « Observation of a New Particle in the Search for the Standard Model Higgs Boson », <em>Physics Letters B</em>, 2012.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Différentielle et incertitude sont les deux faces d'une même pièce : approximer proprement, et savoir jusqu'où on peut faire confiance à cette approximation. Le chapitre suivant, « Calcul vectoriel et systèmes de coordonnées », te donnera le second grand outil mathématique de la physique — les vecteurs — sans lequel aucune force, aucune vitesse, ne peut être décrite complètement. Comme le disait Maxwell : « Toute connaissance physique est de la connaissance de mesures. » Tu sais maintenant leur faire confiance à bon escient.</p>
  `,
  init: initUncertaintySim
};

MATH_TOOLS_NOVA_KB[mtKey("Différentielles et calcul d'incertitudes")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Différentielles et calcul d'incertitudes ». Demande-moi une définition (différentielle, incertitude...), donne-moi deux valeurs avec leurs incertitudes pour que je t'aide à les propager, ou demande un indice sur un exercice.",
  rules: [
    { test:/diff[ée]rentielle/i, replies:[
      "La différentielle df = f'(x)dx approxime la variation de f quand x varie d'une petite quantité dx — c'est comme suivre la tangente à la courbe plutôt que la courbe elle-même.",
      "Pour plusieurs variables, chaque variable contribue séparément : df = (∂f/∂x)dx + (∂f/∂y)dy + ... Chaque terme s'obtient en dérivant par rapport à une seule variable, les autres étant fixées."
    ]},
    { test:/erreur/i, replies:[
      "L'erreur (δx = x_mesuré − x_vrai) suppose qu'on connaît la valeur vraie — rare en pratique. L'incertitude (Δx), elle, est une estimation du pire écart possible, utilisée quand on ne connaît pas cette valeur vraie."
    ]},
    { test:/incertitude/i, replies:[
      "Règle à retenir : pour une somme ou différence, les incertitudes absolues s'additionnent (ΔR = ΔA + ΔB). Pour un produit ou quotient, ce sont les incertitudes relatives qui s'additionnent (ΔR/R = ΔA/A + ΔB/B)."
    ]},
    { test:/relative|absolue/i, replies:[
      "L'incertitude absolue a la même unité que la grandeur (ex : ± 1 mm). L'incertitude relative est un rapport sans unité (Δx/x), souvent donné en %, qui indique la qualité de la mesure."
    ]},
    { test:/taylor|approximation/i, replies:[
      "Le développement de Taylor sert à remplacer une expression compliquée par une version simplifiée, valable quand une grandeur reste petite. Exemple très utilisé : (1+x)^α ≈ 1 + αx pour x petit."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : applique df = f'(x)dx. Calcule d'abord f'(x) pour 3x² − 5x.",
      "Indice niveau 2 : la dérivée de 3x² est 6x, celle de −5x est −5. Additionne les deux.",
      "Indice niveau 3 : f'(x) = 6x − 5, donc df = (6x − 5)dx."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : c'est une somme (A + B), donc quelle règle de propagation s'applique ?",
      "Indice niveau 2 : pour une somme, les incertitudes absolues s'additionnent : ΔR = ΔA + ΔB.",
      "Indice niveau 3 : ΔR = 0,2 + 0,1 = 0,3 cm."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : c'est un quotient (A/B), donc ce sont les incertitudes relatives qui s'additionnent.",
      "Indice niveau 2 : calcule ΔA/A = 1/20 et ΔB/B = 0,2/4 séparément.",
      "Indice niveau 3 : 1/20 = 5% et 0,2/4 = 5%, donc l'incertitude relative totale est 10%."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
MATH_TOOLS_CHAPTERS[mtKey('Calcul vectoriel et systèmes de coordonnées')] = {
  objectives: [
    "Manipuler somme, produit scalaire et produit vectoriel de deux vecteurs",
    "Projeter un vecteur sur un axe ou sur un plan",
    "Passer d'un système de coordonnées à un autre (cartésien, polaire, cylindrique, sphérique)",
    "Reconnaître quand utiliser chaque système selon la symétrie du problème",
    "Évaluer la pertinence physique du moment d'un vecteur par rapport à un point donné dans un problème concret"
  ],
  prereqs: ["Trigonométrie de base", "Différentielles et calcul d'incertitudes"],
  bodyHtml: `
    <p>Le mot « vecteur » vient du latin <em>vector</em>, « celui qui transporte » — un choix étymologique révélateur : un vecteur transporte une information de direction et d'intensité que le simple nombre ne peut pas porter. Dire qu'une voiture roule « à 90 » ne dit rien de sa trajectoire ; dire qu'elle roule « à 90 km/h plein nord » utilise déjà, sans le nommer, un vecteur.</p>
    <p>Cette distinction n'a rien d'académique : elle est la raison pour laquelle un GPS a besoin de plus qu'une seule antenne pour te localiser (il faut trianguler des directions), et la raison pour laquelle un pilote d'avion doit corriger sa route pour compenser un vent de travers — deux vitesses vectorielles qui s'additionnent, pas deux nombres.</p>
    <p>Ce chapitre pose les opérations vectorielles de base, puis montre comment repérer un point dans l'espace selon la symétrie du problème : parfois un repère cartésien classique suffit, parfois un système « polaire », « cylindrique » ou « sphérique » simplifie radicalement les calculs — un choix qui fera toute la différence dans les chapitres à venir.</p>

    <h3>1. Qu'est-ce qu'un vecteur ?</h3>
    <p>Un vecteur $\\vec{V}$ (ou $\\overrightarrow{OA}$) est défini par une origine, une direction, un sens et un module (sa « longueur »). On distingue le <strong>vecteur libre</strong> (seuls direction/sens/module comptent), le <strong>vecteur glissant</strong> (le point d'application peut se déplacer sur sa droite d'action) et le <strong>vecteur lié</strong> (tout est fixé, y compris le point d'application).</p>

    <div class="diagram">
      <svg width="200" height="110" viewBox="0 0 200 110">
        <line x1="30" y1="80" x2="150" y2="30" stroke="#4C7CFF" stroke-width="2.4" marker-end="url(#mainArrow)"/>
        <circle cx="30" cy="80" r="2.5" fill="#EAF0FB"/>
        <text x="20" y="95" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">O</text>
        <text x="155" y="30" font-family="IBM Plex Mono" font-size="11" fill="#4C7CFF">A</text>
        <defs><marker id="mainArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#4C7CFF"/></marker></defs>
      </svg>
    </div>

    <h3>2. Les opérations vectorielles essentielles</h3>
    <p><strong>Somme de deux vecteurs</strong> — on additionne composante par composante, ou géométriquement avec la règle du parallélogramme. <strong>Produit scalaire</strong> — donne un nombre (pas un vecteur), qui mesure à quel point deux vecteurs pointent « dans la même direction » :</p>
    <div class="formula-box">$$\\vec{A}\\cdot\\vec{B} = \\|\\vec{A}\\|\\,\\|\\vec{B}\\|\\cos(\\vec{A},\\vec{B})$$</div>
    <p>Si $\\vec{A}\\cdot\\vec{B}=0$, les deux vecteurs sont perpendiculaires. Le produit scalaire sert par exemple à calculer un travail : $W = \\vec{F}\\cdot\\vec{d}$.</p>
    <p><strong>Produit vectoriel</strong> — donne cette fois un <em>vecteur</em>, perpendiculaire aux deux vecteurs de départ, dont la norme est l'aire du parallélogramme qu'ils forment :</p>
    <div class="formula-box">$$\\vec{A}\\wedge\\vec{B} = \\|\\vec{A}\\|\\,\\|\\vec{B}\\|\\sin(\\vec{A},\\vec{B})\\;\\vec{n}$$</div>
    <div class="key-point">
      <span class="eyebrow">Règle de la main droite</span>
      Pour connaître le sens de $\\vec{A}\\wedge\\vec{B}$ : pointe les doigts de la main droite dans le sens de $\\vec{A}$, replie-les vers $\\vec{B}$ — le pouce indique le sens du résultat. Si $\\vec{A}$ et $\\vec{B}$ sont colinéaires, le produit vectoriel est nul.
    </div>
    <p>En coordonnées cartésiennes, si $\\vec{A}=x\\vec{i}+y\\vec{j}+z\\vec{k}$ et $\\vec{B}=x'\\vec{i}+y'\\vec{j}+z'\\vec{k}$ : $\\vec{A}\\wedge\\vec{B} = (yz'-zy')\\vec{i} + (zx'-z'x)\\vec{j} + (xy'-yx')\\vec{k}$.</p>

    <p><strong>Produit mixte</strong> — combine les deux précédents : c'est un nombre (scalaire), défini par $m=\\vec{A}\\cdot(\\vec{B}\\wedge\\vec{C})$, qu'on calcule directement comme le déterminant des trois vecteurs :</p>
    <div class="formula-box">$$m = (\\vec{A},\\vec{B},\\vec{C}) = \\begin{vmatrix}A_x&B_x&C_x\\\\A_y&B_y&C_y\\\\A_z&B_z&C_z\\end{vmatrix}$$</div>
    <div class="key-point">
      <span class="eyebrow">Sens géométrique</span>
      La valeur absolue du produit mixte est exactement le <strong>volume du parallélépipède</strong> construit sur les trois vecteurs $\\vec{A},\\vec{B},\\vec{C}$. Le produit mixte reste invariant par permutation circulaire des trois vecteurs : $(\\vec{A},\\vec{B},\\vec{C})=(\\vec{B},\\vec{C},\\vec{A})=(\\vec{C},\\vec{A},\\vec{B})$ — mais change de signe si on échange deux vecteurs.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le produit scalaire ne « voit » pas l'ordre ($\\vec A\\cdot\\vec B=\\vec B\\cdot\\vec A$), mais le produit vectoriel en dépend ($\\vec A\\wedge\\vec B=-\\vec B\\wedge\\vec A$). Pourquoi cette différence fondamentale entre les deux opérations, et à quoi la relies-tu géométriquement (angle, aire, sens de rotation) ?
    </div>

    <h3>3. Projection d'un vecteur</h3>
    <p>La projection orthogonale de $\\vec{V}$ sur un axe de vecteur unitaire $\\vec{u}$ est $\\vec{V}_u = (\\vec{V}\\cdot\\vec{u})\\,\\vec{u}$ — c'est la « part » de $\\vec{V}$ qui va dans la direction de l'axe. On peut de même projeter $\\vec{V}$ sur un plan de normale $\\vec{n}$ : $\\vec{V}_\\pi = \\vec{V} - (\\vec{V}\\cdot\\vec{n})\\vec{n}$.</p>

    <h3>4. Le moment d'un vecteur par rapport à un point</h3>
    <p>Le moment d'un vecteur $\\overrightarrow{AB}$ (souvent une force) par rapport à un point $O$ mesure sa capacité à faire tourner un système autour de $O$ :</p>
    <div class="formula-box">$$\\overrightarrow{\\mathcal{M}_O}(\\overrightarrow{AB}) = \\overrightarrow{OA}\\wedge\\overrightarrow{AB}$$</div>
    <p>Ce moment ne dépend que de la droite d'action de $\\overrightarrow{AB}$, pas du point précis où il est appliqué sur cette droite — une propriété fondamentale qu'on retrouvera en détail dans le chapitre sur les torseurs.</p>

    <h3>5. Choisir le bon système de coordonnées</h3>
    <p>Le repère cartésien $(x,y,z)$ est le plus intuitif, mais pas toujours le plus simple à utiliser. Trois autres systèmes, adaptés à des symétries particulières :</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 100" width="100%">
          <line x1="20" y1="80" x2="100" y2="80" stroke="#5A6472" stroke-width="1.3"/>
          <line x1="20" y1="80" x2="20" y2="15" stroke="#5A6472" stroke-width="1.3"/>
          <line x1="20" y1="80" x2="65" y2="35" stroke="#2DD4C4" stroke-width="2" marker-end="url(#m1)"/>
          <path d="M40,80 A20,20 0 0 1 34,64" stroke="#F0B94D" stroke-width="1.4" fill="none"/>
          <text x="42" y="76" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">θ</text>
          <text x="70" y="35" font-family="IBM Plex Mono" font-size="8" fill="#2DD4C4">ρ</text>
          <defs><marker id="m1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker></defs>
        </svg>
        <span><strong>Polaire</strong> (ρ, θ) — mouvement plan</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 120 100" width="100%">
          <line x1="20" y1="85" x2="100" y2="85" stroke="#5A6472" stroke-width="1.3"/>
          <line x1="20" y1="85" x2="20" y2="10" stroke="#5A6472" stroke-width="1.3"/>
          <ellipse cx="45" cy="65" rx="18" ry="6" fill="none" stroke="#F0B94D" stroke-width="1.2"/>
          <line x1="45" y1="65" x2="45" y2="30" stroke="#9B82FF" stroke-width="1.6" stroke-dasharray="2,2"/>
          <line x1="20" y1="85" x2="63" y2="30" stroke="#2DD4C4" stroke-width="2" marker-end="url(#m2)"/>
          <text x="66" y="28" font-family="IBM Plex Mono" font-size="8" fill="#2DD4C4">M</text>
          <defs><marker id="m2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker></defs>
        </svg>
        <span><strong>Cylindrique</strong> (ρ, θ, z) — symétrie d'axe</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 120 100" width="100%">
          <line x1="20" y1="85" x2="100" y2="85" stroke="#5A6472" stroke-width="1.3"/>
          <line x1="20" y1="85" x2="20" y2="10" stroke="#5A6472" stroke-width="1.3"/>
          <circle cx="20" cy="85" r="45" fill="none" stroke="#F0B94D" stroke-width="1" opacity="0.5"/>
          <line x1="20" y1="85" x2="58" y2="35" stroke="#2DD4C4" stroke-width="2" marker-end="url(#m3)"/>
          <text x="60" y="33" font-family="IBM Plex Mono" font-size="8" fill="#2DD4C4">M</text>
          <defs><marker id="m3" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker></defs>
        </svg>
        <span><strong>Sphérique</strong> (ρ, θ, φ) — symétrie de point</span>
      </div>
    </div>

    <table class="mini-table">
      <tr><th>Système</th><th>Coordonnées</th><th>Lien avec le cartésien</th><th>Utile quand...</th></tr>
      <tr><td>Polaire</td><td>$\\rho, \\theta$</td><td>$x=\\rho\\cos\\theta,\\ y=\\rho\\sin\\theta$</td><td>mouvement dans un plan (orbite, rotation)</td></tr>
      <tr><td>Cylindrique</td><td>$\\rho, \\theta, z$</td><td>$x=\\rho\\cos\\theta,\\ y=\\rho\\sin\\theta,\\ z=z$</td><td>symétrie autour d'un axe (fil, cylindre)</td></tr>
      <tr><td>Sphérique</td><td>$\\rho, \\theta, \\varphi$</td><td>$x=\\rho\\sin\\theta\\cos\\varphi,\\ y=\\rho\\sin\\theta\\sin\\varphi,\\ z=\\rho\\cos\\theta$</td><td>symétrie autour d'un point (charge ponctuelle, planète)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le bon système de coordonnées n'est pas une question de goût : c'est celui qui colle à la symétrie du problème. Un champ qui ne dépend que de la distance à un point (comme la gravité d'une planète) devient beaucoup plus simple à écrire en coordonnées sphériques.
    </div>
    <p><strong>Attention à un piège de notation :</strong> dans le tableau ci-dessus, $\\theta$ désigne l'angle azimutal (dans le plan $xy$) pour les systèmes polaire et cylindrique — mais en sphérique, $\\theta$ change de rôle et devient la <strong>colatitude</strong> (l'angle depuis l'axe $Oz$), tandis que c'est $\\varphi$ qui hérite du rôle d'angle azimutal. Ce n'est pas une erreur de frappe : c'est la convention standard en physique, mais elle piège presque tout le monde une fois avant de devenir un réflexe — vérifie toujours, dans un énoncé, ce que $\\theta$ désigne exactement.</p>

    <h3>6. Produit mixte de trois vecteurs</h3>
    <p>Le <strong>produit mixte</strong> de trois vecteurs $\\vec{A}$, $\\vec{B}$, $\\vec{C}$ est le scalaire $m=(\\vec{A},\\vec{B},\\vec{C}) = \\vec{A}\\cdot(\\vec{B}\\wedge\\vec{C})$. Il se calcule comme un déterminant :</p>
    <div class="formula-box">$$m = \\begin{vmatrix} A_x & B_x & C_x \\\\ A_y & B_y & C_y \\\\ A_z & B_z & C_z \\end{vmatrix} = A_x(B_yC_z-B_zC_y) + B_x(C_yA_z-C_zA_y) + C_x(A_yB_z-A_zB_y)$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le produit mixte est invariant par permutation circulaire : $(\\vec{A},\\vec{B},\\vec{C})=(\\vec{B},\\vec{C},\\vec{A})=(\\vec{C},\\vec{A},\\vec{B})$. Sa valeur absolue représente le <strong>volume du parallélépipède</strong> construit sur les trois vecteurs. S'il est nul, les trois vecteurs sont coplanaires.
    </div>

    <h3>7. Dérivation vectorielle</h3>
    <p>Un vecteur peut lui-même dépendre du temps, $\\vec{V}(t)$ — c'est le cas de la position, de la vitesse, etc. Sa dérivée se définit comme une limite, exactement comme pour une fonction scalaire :</p>
    <div class="formula-box">$$\\frac{d\\vec{V}}{dt} = \\lim_{\\Delta t \\to 0} \\frac{\\vec{V}(t+\\Delta t)-\\vec{V}(t)}{\\Delta t}$$</div>
    <p>Les règles de dérivation généralisent celles des fonctions scalaires, en respectant l'ordre dans les produits vectoriels :</p>
    <table class="mini-table">
      <tr><th>Règle</th><th>Formule</th></tr>
      <tr><td>Somme</td><td>$\\dfrac{d(\\vec{A}+\\vec{B})}{dt} = \\dfrac{d\\vec{A}}{dt} + \\dfrac{d\\vec{B}}{dt}$</td></tr>
      <tr><td>Produit par un scalaire $\\lambda(t)$</td><td>$\\dfrac{d(\\lambda\\vec{A})}{dt} = \\dfrac{d\\lambda}{dt}\\vec{A} + \\lambda\\dfrac{d\\vec{A}}{dt}$</td></tr>
      <tr><td>Produit scalaire</td><td>$\\dfrac{d(\\vec{A}\\cdot\\vec{B})}{dt} = \\dfrac{d\\vec{A}}{dt}\\cdot\\vec{B} + \\vec{A}\\cdot\\dfrac{d\\vec{B}}{dt}$</td></tr>
      <tr><td>Produit vectoriel (ordre à respecter !)</td><td>$\\dfrac{d(\\vec{A}\\wedge\\vec{B})}{dt} = \\dfrac{d\\vec{A}}{dt}\\wedge\\vec{B} + \\vec{A}\\wedge\\dfrac{d\\vec{B}}{dt}$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Résultat très utile en physique</span>
      Si un vecteur $\\vec{A}(t)$ garde une norme constante (par exemple un vecteur unitaire tournant), alors sa dérivée $\\dfrac{d\\vec{A}}{dt}$ est toujours <strong>perpendiculaire</strong> à $\\vec{A}$. Preuve rapide : $A^2$ est constant, donc $\\dfrac{d(A^2)}{dt} = 2\\vec{A}\\cdot\\dfrac{d\\vec{A}}{dt} = 0$.
    </div>

    <h3>8. Division vectorielle</h3>
    <p>Résoudre $\\vec{X}\\wedge\\vec{V} = \\vec{W}$ (trouver $\\vec{X}$ connaissant $\\vec{V}$ et $\\vec{W}$) n'a de solution que si $\\vec{V}\\neq\\vec{0}$ et $\\vec{W}\\perp\\vec{V}$. Dans ce cas, la solution générale est :</p>
    <div class="formula-box">$$\\vec{X} = \\frac{\\vec{V}\\wedge\\vec{W}}{V^2} + \\lambda\\vec{V}, \\quad \\lambda \\in \\mathbb{R}$$</div>
    <p>Le terme $\\lambda\\vec{V}$ traduit qu'il existe une infinité de solutions : si $\\vec{X}$ convient, $\\vec{X}+\\lambda\\vec{V}$ convient aussi, car $\\vec{V}\\wedge\\vec{V}=\\vec{0}$.</p>
    <p><strong>Cas limite :</strong> si $\\vec W$ n'est pas perpendiculaire à $\\vec V$, l'équation n'a strictement aucune solution — pas même approximative. C'est une différence essentielle avec la division scalaire ordinaire, qui a toujours (sauf division par zéro) exactement une solution : la « division vectorielle » n'existe que sous des conditions géométriques précises.</p>

    <h3>9. Règle des sinus dans un triangle</h3>
    <p>Pour un triangle quelconque $ABC$, en notant $\\alpha, \\beta, \\theta$ les angles opposés respectivement aux côtés $BC$, $AC$, $AB$, on a la relation classique (démontrable via des projections successives) :</p>
    <div class="formula-box">$$\\frac{BC}{\\sin\\alpha} = \\frac{AB}{\\sin\\beta} = \\frac{AC}{\\sin\\theta}$$</div>

    <h3>10. Moment par rapport à un axe, couple de forces et théorème de Varignon</h3>
    <p>Le <strong>moment par rapport à un axe</strong> $\\Delta$ (passant par $O$, dirigé par $\\vec{u}$) se déduit du moment au point $O$ par projection : $\\mathcal{M}_\\Delta(\\overrightarrow{AB}) = [\\mathcal{M}_O(\\overrightarrow{AB})]\\cdot\\vec{u}_n$, où $\\vec{u}_n$ est unitaire.</p>
    <p>Un <strong>couple de forces</strong> est formé de deux forces opposées ($\\vec{F}_1=-\\vec{F}_2$, $F_1=F_2$) portées par deux droites parallèles distinctes. La somme des forces est nulle, mais leur moment ne l'est pas :</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le moment d'un couple ne dépend <strong>pas du point</strong> où on le calcule — seulement de la distance entre les deux droites d'action. Un couple ne produit qu'une <strong>rotation pure</strong>, jamais de translation.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Quand tu dévisses un bouchon de bouteille en pinçant avec deux doigts de sens opposés, tu appliques (approximativement) un couple de forces. Pourquoi est-il alors indifférent de savoir « par rapport à quel point » tu calcules ce moment, contrairement au moment d'une force isolée ?
    </div>
    <p>La <strong>formule de Varignon</strong> généralise cette idée : le moment en $O$ d'un système de forces concourantes en un point $A$ est égal au moment de leur résultante $\\vec{R}=\\sum\\vec{F}_i$ par rapport à $O$ :</p>
    <div class="formula-box">$$\\mathcal{M}_O(\\vec{R}) = \\overrightarrow{OA}\\wedge\\vec{R} = \\sum_i \\mathcal{M}_O(\\vec{F}_i)$$</div>

    <h3>11. Déplacement, surface et volume élémentaires selon le système de coordonnées</h3>
    <p>Ces expressions serviront constamment dans le chapitre suivant (opérateurs différentiels) et pour calculer circulations, flux et volumes :</p>
    <table class="mini-table">
      <tr><th>Système</th><th>Déplacement élémentaire $d\\overrightarrow{OM}$</th><th>Longueur $dl$</th><th>Volume $dV$</th></tr>
      <tr><td>Cartésien</td><td>$dx\\,\\vec{i}+dy\\,\\vec{j}+dz\\,\\vec{k}$</td><td>$\\sqrt{dx^2+dy^2+dz^2}$</td><td>$dx\\,dy\\,dz$</td></tr>
      <tr><td>Polaire (plan)</td><td>$d\\rho\\,\\vec{u}_\\rho + \\rho\\,d\\theta\\,\\vec{u}_\\theta$</td><td>$\\sqrt{d\\rho^2+(\\rho d\\theta)^2}$</td><td>$dS=\\rho\\,d\\rho\\,d\\theta$ (surface)</td></tr>
      <tr><td>Cylindrique</td><td>$d\\rho\\,\\vec{u}_\\rho + \\rho\\,d\\theta\\,\\vec{u}_\\theta + dz\\,\\vec{k}$</td><td>$\\sqrt{d\\rho^2+(\\rho d\\theta)^2+dz^2}$</td><td>$\\rho\\,d\\rho\\,d\\theta\\,dz$</td></tr>
      <tr><td>Sphérique</td><td>$d\\rho\\,\\vec{u}_\\rho + \\rho\\,d\\theta\\,\\vec{u}_\\theta + \\rho\\sin\\theta\\,d\\varphi\\,\\vec{u}_\\varphi$</td><td>$\\sqrt{d\\rho^2+(\\rho d\\theta)^2+(\\rho\\sin\\theta\\,d\\varphi)^2}$</td><td>$\\rho^2\\sin\\theta\\,d\\rho\\,d\\theta\\,d\\varphi$</td></tr>
    </table>
    <p>Les vecteurs unitaires locaux se dérivent simplement : en polaire, $\\dfrac{d\\vec{u}_\\rho}{d\\theta}=\\vec{u}_\\theta$ et $\\dfrac{d\\vec{u}_\\theta}{d\\theta}=-\\vec{u}_\\rho$. En sphérique, $\\dfrac{d\\vec{u}_\\rho}{d\\theta}=\\vec{u}_\\theta$, $\\dfrac{d\\vec{u}_\\rho}{d\\varphi}=\\sin\\theta\\,\\vec{u}_\\varphi$, $\\dfrac{d\\vec{u}_\\theta}{d\\theta}=-\\vec{u}_\\rho$, $\\dfrac{d\\vec{u}_\\theta}{d\\varphi}=\\cos\\theta\\,\\vec{u}_\\varphi$ — ces relations serviront à calculer la vitesse et l'accélération dans ces bases mobiles (vues en mécanique).</p>

    <h3>12. Frontière de la recherche — les vecteurs au cœur de la robotique moderne</h3>
    <p>Les bras robotiques industriels et les robots chirurgicaux effectuent, à chaque fraction de seconde, des milliers de calculs de produits vectoriels et de changements de coordonnées pour convertir la position voulue de leur « effecteur » (la pince, l'instrument) en angles de rotation de chaque articulation — un problème appelé « cinématique inverse », qui repose entièrement sur les outils de ce chapitre. Le robot chirurgical Da Vinci, utilisé dans des centaines de milliers d'interventions par an dans le monde, en est un exemple emblématique.</p>
    <p><strong>Question ouverte :</strong> pour un robot à très grand nombre d'articulations (bras à 7 degrés de liberté ou plus, essaims de robots), le problème de cinématique inverse peut avoir une infinité de solutions ou aucune, selon la position visée. Trouver rapidement une solution optimale (la plus économe en énergie, ou la plus rapide) reste un problème de recherche actif en robotique et en optimisation.</p>
    <p><strong>Technologie émergente :</strong> les moteurs de jeux vidéo et de réalité virtuelle utilisent en permanence produits scalaires (calcul d'éclairage, détection de collision) et produits vectoriels (orientation de caméra, calcul de normales de surface) — les mêmes formules que celles de ce chapitre, exécutées des millions de fois par seconde sur des cartes graphiques.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Grandeur physique vectorielle → choix du système de coordonnées (symétrie) → opérations (somme, ·, ∧) → projection → résultat scalaire ou vectoriel exploitable
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\vec{A}\\cdot\\vec{B} = \\|\\vec{A}\\|\\|\\vec{B}\\|\\cos\\theta \\qquad \\vec{A}\\wedge\\vec{B} = \\|\\vec{A}\\|\\|\\vec{B}\\|\\sin\\theta\\;\\vec n$$
      Les deux opérations fondamentales : l'une mesure un « alignement », l'autre une « perpendicularité ». Toute la géométrie vectorielle de la physique en découle.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le produit scalaire donne un nombre lié au cosinus de l'angle ; le produit vectoriel donne un vecteur perpendiculaire lié au sinus</li>
        <li>Deux vecteurs perpendiculaires ont un produit scalaire nul ; deux vecteurs colinéaires ont un produit vectoriel nul</li>
        <li>Le moment d'un vecteur par rapport à un point O est $\\overrightarrow{OA}\\wedge\\vec{V}$, indépendant du point d'application sur la droite d'action</li>
        <li>Le choix du système de coordonnées (cartésien, polaire, cylindrique, sphérique) dépend de la symétrie du problème, pas d'une préférence</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre produit scalaire (un nombre) et produit vectoriel (un vecteur)</li>
        <li>Oublier le sens du produit vectoriel donné par la règle de la main droite : $\\vec{A}\\wedge\\vec{B} = -\\vec{B}\\wedge\\vec{A}$</li>
        <li>Mélanger le rôle de θ selon le système : angle azimutal en polaire/cylindrique, mais colatitude en sphérique (où φ prend alors le rôle d'angle azimutal) — voir la remarque de la section 5</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — vecteurs 2D</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Fais varier les composantes de A et B : observe leur somme (parallélogramme), leur produit scalaire et leur produit vectoriel.</p>
      <div class="sim-2col">
        <svg viewBox="0 0 200 200" width="220" height="220">
          <line x1="20" y1="100" x2="180" y2="100" stroke="#3A4658" stroke-width="1"/>
          <line x1="100" y1="20" x2="100" y2="180" stroke="#3A4658" stroke-width="1"/>
          <line id="vecBshift" x1="100" y1="100" x2="100" y2="100" stroke="#9B82FF" stroke-width="1.6" stroke-dasharray="3,2" marker-end="url(#vArr3)"/>
          <line id="vecA" x1="100" y1="100" x2="100" y2="100" stroke="#4C7CFF" stroke-width="2.6" marker-end="url(#vArr1)"/>
          <line id="vecB" x1="100" y1="100" x2="100" y2="100" stroke="#2DD4C4" stroke-width="2.6" marker-end="url(#vArr2)"/>
          <line id="vecSum" x1="100" y1="100" x2="100" y2="100" stroke="#F0B94D" stroke-width="2.6" marker-end="url(#vArr4)"/>
          <defs>
            <marker id="vArr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#4C7CFF"/></marker>
            <marker id="vArr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#2DD4C4"/></marker>
            <marker id="vArr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#9B82FF"/></marker>
            <marker id="vArr4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#F0B94D"/></marker>
          </defs>
        </svg>
        <div class="sim-controls">
          <label>A — x : <span id="vAxVal">4</span></label><input type="range" id="vAx" min="-6" max="6" step="0.5" value="4" oninput="updateVectorSim()">
          <label>A — y : <span id="vAyVal">2</span></label><input type="range" id="vAy" min="-6" max="6" step="0.5" value="2" oninput="updateVectorSim()">
          <label>B — x : <span id="vBxVal">1</span></label><input type="range" id="vBx" min="-6" max="6" step="0.5" value="1" oninput="updateVectorSim()">
          <label>B — y : <span id="vByVal">5</span></label><input type="range" id="vBy" min="-6" max="6" step="0.5" value="5" oninput="updateVectorSim()">
          <div class="sim-readout" id="vecReadout"></div>
        </div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:16px;"><strong>Convertisseur de coordonnées</strong> — entre un point cartésien, obtiens ses coordonnées cylindriques et sphériques :</p>
      <div class="sim-2col">
        <div class="sim-controls" style="min-width:260px;">
          <label>x</label><input type="number" id="coX" value="3" step="0.5" oninput="updateCoordConverter()">
          <label>y</label><input type="number" id="coY" value="4" step="0.5" oninput="updateCoordConverter()">
          <label>z</label><input type="number" id="coZ" value="2" step="0.5" oninput="updateCoordConverter()">
          <div class="sim-readout" id="coordOut"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">$\\vec{A} = (2,-1,0)$ et $\\vec{B} = (1,3,0)$. Quelle est la valeur de $\\vec{A}\\cdot\\vec{B}$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt2e1" value="wrong"> 5</label>
          <label class="option"><input type="radio" name="mt2e1" value="right"> −1</label>
          <label class="option"><input type="radio" name="mt2e1" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="mt2e1" value="wrong"> 7</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt2e1','mt2fb1','Correct — A·B = (2)(1) + (−1)(3) + 0 = 2 − 3 = −1.','Le produit scalaire se calcule composante par composante : Ax·Bx + Ay·By + Az·Bz.')">Vérifier</button>
        <div class="feedback" id="mt2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si $\\vec{A}\\wedge\\vec{B} = \\vec{0}$ et qu'aucun des deux vecteurs n'est nul, que peut-on en conclure ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt2e2" value="wrong"> A et B sont perpendiculaires</label>
          <label class="option"><input type="radio" name="mt2e2" value="right"> A et B sont colinéaires</label>
          <label class="option"><input type="radio" name="mt2e2" value="wrong"> A et B ont la même norme</label>
          <label class="option"><input type="radio" name="mt2e2" value="wrong"> On ne peut rien dire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt2e2','mt2fb2','Correct — le produit vectoriel de deux vecteurs colinéaires (même direction) est toujours nul.','Repense à la formule ‖A‖‖B‖sin(A,B) : elle ne s\\'annule que si l\\'angle entre A et B vaut 0° ou 180°, donc s\\'ils sont colinéaires.')">Vérifier</button>
        <div class="feedback" id="mt2fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un point a pour coordonnées cartésiennes $x=0$, $y=3$, $z=0$. Quel est son angle $\\theta$ en coordonnées polaires/cylindriques ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt2e3" value="wrong"> 0°</label>
          <label class="option"><input type="radio" name="mt2e3" value="right"> 90°</label>
          <label class="option"><input type="radio" name="mt2e3" value="wrong"> 45°</label>
          <label class="option"><input type="radio" name="mt2e3" value="wrong"> 180°</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt2e3','mt2fb3','Correct — le point est entièrement sur l\\'axe y, donc θ = 90°.','Utilise x = ρcos(θ). Ici x = 0, donc cos(θ) = 0, ce qui correspond à θ = 90°.')">Vérifier</button>
        <div class="feedback" id="mt2fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Une porte est maintenue par deux gonds verticaux distants de 80 cm. Tu pousses la porte perpendiculairement à sa surface, à 60 cm du premier gond. Propose une démarche vectorielle (moment par rapport à un axe) pour déterminer comment se répartit l'effort entre les deux gonds. Pourquoi pousser près d'un gond réduit-il l'effort supporté par l'autre ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : le moment de ta force par rapport à l'axe des gonds doit être équilibré par les réactions des gonds — pense à la formule de Varignon et au bras de levier de chaque force.</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'espace avait une dimension de plus : combien de vecteurs de base orthonormés faudrait-il, et le produit vectoriel tel que défini ici resterait-il possible sous la même forme ?</li>
        <li>Pourquoi choisit-on presque toujours des coordonnées sphériques pour décrire un champ de gravitation, mais des coordonnées cylindriques pour décrire le champ magnétique autour d'un fil rectiligne infini ?</li>
        <li>Quelle serait la conséquence, pour un jeu vidéo 3D, d'un moteur physique qui confondrait systématiquement produit scalaire et produit vectoriel dans son calcul de collisions ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>W. R. Hamilton, travaux sur les quaternions, 1843 — origine historique du calcul vectoriel moderne et du produit vectoriel.</li>
        <li>J.-P. Pérez, <em>Mécanique — Fondements et applications</em>, Dunod (chapitre sur les outils vectoriels).</li>
        <li>J. J. Craig, <em>Introduction to Robotics: Mechanics and Control</em>, Pearson — référence sur la cinématique directe et inverse en robotique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Les vecteurs sont désormais ton alphabet ; le chapitre suivant, « Opérateurs différentiels et théorèmes intégraux », t'apprend à en faire une grammaire complète — gradient, divergence, rotationnel — indispensable pour décrire les champs électriques, magnétiques et gravitationnels. Comme le disait Hamilton en découvrant les quaternions, ancêtres du calcul vectoriel moderne, gravés dans la pierre d'un pont de Dublin : une intuition soudaine peut changer toute une discipline.</p>
  `,
  init: function(){ initVectorSim(); updateCoordConverter(); }
};

MATH_TOOLS_NOVA_KB[mtKey('Calcul vectoriel et systèmes de coordonnées')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Calcul vectoriel et systèmes de coordonnées ». Demande-moi une définition, donne-moi les composantes de deux vecteurs pour que je calcule leur produit, ou demande un indice sur un exercice.",
  rules: [
    { test:/produit scalaire/i, replies:["Le produit scalaire A·B = ‖A‖‖B‖cos(θ) donne un nombre, pas un vecteur. S'il est nul, les deux vecteurs sont perpendiculaires."] },
    { test:/produit vectoriel|main droite/i, replies:["Le produit vectoriel A∧B donne un vecteur perpendiculaire à A et B, dont le sens se trouve avec la règle de la main droite. S'il est nul, A et B sont colinéaires."] },
    { test:/cylindrique/i, replies:["Les coordonnées cylindriques (ρ, θ, z) reprennent les coordonnées polaires du plan (ρ, θ) et ajoutent simplement la côte z — utiles dès qu'il y a une symétrie autour d'un axe."] },
    { test:/sph[ée]rique/i, replies:["Les coordonnées sphériques (ρ, θ, φ) repèrent un point par sa distance à l'origine (ρ) et deux angles — pratiques dès qu'un problème a une symétrie autour d'un point (comme un champ de gravitation)."] },
    { test:/moment/i, replies:["Le moment d'un vecteur (souvent une force) par rapport à un point O est M_O = OA ∧ V. Il mesure la capacité de ce vecteur à faire tourner un système autour de O."] },
    { test:/projection/i, replies:["La projection orthogonale de V sur un axe unitaire u est (V·u)·u : c'est la partie de V qui va vraiment dans la direction de cet axe."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : calcule le produit scalaire composante par composante.", "Indice niveau 2 : Ax·Bx + Ay·By + Az·Bz, avec A=(2,-1,0) et B=(1,3,0).", "Indice niveau 3 : (2)(1) + (-1)(3) + 0 = -1."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : repense à quand le sinus de l'angle entre deux vecteurs s'annule.", "Indice niveau 2 : sin(θ)=0 quand θ=0° ou 180°, donc quand les vecteurs sont alignés.", "Indice niveau 3 : la réponse est qu'ils sont colinéaires."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : utilise x = ρcos(θ) avec x=0.", "Indice niveau 2 : cos(θ)=0 pour θ=90°.", "Indice niveau 3 : la réponse est 90°."] }
  ]
};

/* =========================== CHAPITRE 3 =========================== */
MATH_TOOLS_CHAPTERS[mtKey('Opérateurs différentiels et théorèmes intégraux')] = {
  objectives: [
    "Calculer le gradient d'un champ scalaire et interpréter sa direction",
    "Calculer la divergence et le rotationnel d'un champ vectoriel, et interpréter leur signe",
    "Relier circulation, flux, et les théorèmes de Stokes et de Green-Ostrogradski",
    "Reconnaître un champ irrotationnel (qui dérive d'un potentiel) ou à flux conservatif",
    "Analyser un champ vectoriel physique (gravitationnel, électrique, de vitesse d'un fluide) pour évaluer s'il est à flux conservatif, irrotationnel, ou ni l'un ni l'autre"
  ],
  prereqs: ["Calcul vectoriel et systèmes de coordonnées", "Dérivées partielles"],
  bodyHtml: `
    <p>En 1831, Michael Faraday découvre expérimentalement que des lignes de champ magnétique traversant une boucle de fil produisent un courant électrique — mais il ne dispose d'aucun langage mathématique pour formaliser précisément cette intuition géométrique. Il faudra attendre James Clerk Maxwell, quelques décennies plus tard, pour que le calcul vectoriel — gradient, divergence, rotationnel — permette d'écrire les quatre équations qui unifient électricité, magnétisme et lumière.</p>
    <p>Ces opérateurs ne sont pas une curiosité mathématique : ce sont les équations de Maxwell elles-mêmes, exprimées avec divergence et rotationnel, qui prédisent l'existence des ondes électromagnétiques — la lumière, les ondes radio, les micro-ondes de ton four — bien avant que Hertz ne les détecte expérimentalement. La météorologie moderne, elle aussi, s'appuie constamment sur la divergence et le rotationnel pour modéliser les mouvements de l'atmosphère.</p>
    <p>Ce chapitre te donne les trois opérateurs fondamentaux qui « lisent » la structure cachée d'un champ scalaire ou vectoriel — direction de plus forte pente, présence de sources, présence de tourbillons — ainsi que les deux grands théorèmes qui relient ces propriétés locales à des grandeurs globales (circulation, flux).</p>

    <h3>1. Le gradient — la direction où ça monte le plus vite</h3>
    <div class="formula-box">$$\\overrightarrow{\\text{grad}}\\,f = \\vec{\\nabla}f = \\frac{\\partial f}{\\partial x}\\vec{i} + \\frac{\\partial f}{\\partial y}\\vec{j} + \\frac{\\partial f}{\\partial z}\\vec{k}$$</div>
    <p>Le gradient d'une fonction scalaire $f$ (par exemple une température ou une altitude) est un vecteur qui pointe dans la direction où $f$ augmente le plus vite, avec une norme égale à cette vitesse de variation. La différentielle s'écrit alors élégamment comme un produit scalaire : $df = \\overrightarrow{\\text{grad}}f \\cdot d\\overrightarrow{OM}$.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 100 100" width="100%">
          <circle cx="50" cy="50" r="10" fill="none" stroke="#F0B94D" stroke-width="1"/>
          <circle cx="50" cy="50" r="22" fill="none" stroke="#F0B94D" stroke-width="1"/>
          <circle cx="50" cy="50" r="34" fill="none" stroke="#F0B94D" stroke-width="1"/>
          <line x1="50" y1="50" x2="26" y2="50" stroke="#2DD4C4" stroke-width="2.2" marker-end="url(#gArr)"/>
          <defs><marker id="gArr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker></defs>
        </svg>
        <span>Gradient : perpendiculaire aux courbes de niveau, vers le sommet</span>
      </div>
    </div>

    <h3>2. La divergence — y a-t-il une source ou un puits ?</h3>
    <p>Pour un champ vectoriel $\\vec{V} = X\\vec{i}+Y\\vec{j}+Z\\vec{k}$ :</p>
    <div class="formula-box">$$\\text{div}\\,\\vec{V} = \\vec{\\nabla}\\cdot\\vec{V} = \\frac{\\partial X}{\\partial x} + \\frac{\\partial Y}{\\partial y} + \\frac{\\partial Z}{\\partial z}$$</div>
    <p>La divergence est un <em>scalaire</em> qui mesure si les lignes du champ « jaillissent » d'un point (divergence positive, comme autour d'une charge électrique positive) ou « convergent » vers lui (divergence négative). Si $\\text{div}\\,\\vec{V}=0$ partout, on dit que le champ est <strong>à flux conservatif</strong> — rien n'apparaît ni ne disparaît.</p>

    <h3>3. Le rotationnel — y a-t-il un tourbillon ?</h3>
    <div class="formula-box">$$\\overrightarrow{\\text{rot}}\\,\\vec{V} = \\vec{\\nabla}\\wedge\\vec{V}$$</div>
    <p>Le rotationnel est un <em>vecteur</em> qui mesure la tendance d'un champ à « tourner » localement — imagine une petite roue à aubes plongée dans le champ : si elle se met à tourner, le rotationnel n'est pas nul, et son axe de rotation donne la direction du rotationnel.</p>
    <div class="key-point">
      <span class="eyebrow">Champ irrotationnel = champ qui dérive d'un potentiel</span>
      Si $\\overrightarrow{\\text{rot}}\\,\\vec{V} = \\vec{0}$ partout, alors $\\vec{V}$ dérive d'un potentiel scalaire $f$ : $\\vec{V} = -\\overrightarrow{\\text{grad}}\\,f$. C'est le cas de la force de gravitation ou de la force électrostatique, qui dérivent toutes deux d'une énergie potentielle.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le champ de vitesse de l'eau qui s'écoule autour d'une bonde de baignoire tourbillonne visiblement. Le champ gravitationnel de la Terre, lui, ne tourbillonne jamais. Relie cette différence visuelle à la valeur du rotationnel de chacun de ces deux champs.
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 100 90" width="100%">
          <circle cx="50" cy="45" r="4" fill="#F0B94D"/>
          <line x1="50" y1="45" x2="80" y2="45" stroke="#4C7CFF" stroke-width="2" marker-end="url(#dArr1)"/>
          <line x1="50" y1="45" x2="20" y2="45" stroke="#4C7CFF" stroke-width="2" marker-end="url(#dArr1)"/>
          <line x1="50" y1="45" x2="50" y2="15" stroke="#4C7CFF" stroke-width="2" marker-end="url(#dArr1)"/>
          <line x1="50" y1="45" x2="50" y2="75" stroke="#4C7CFF" stroke-width="2" marker-end="url(#dArr1)"/>
          <defs><marker id="dArr1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#4C7CFF"/></marker></defs>
        </svg>
        <span>Divergence > 0 : le champ « jaillit »</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 100 90" width="100%">
          <circle cx="50" cy="45" r="26" fill="none" stroke="#FF6B6F" stroke-width="2"/>
          <path d="M50,19 a26,26 0 1,1 -1,0" fill="none" stroke="#FF6B6F" stroke-width="2" marker-end="url(#rArr)"/>
          <defs><marker id="rArr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#FF6B6F"/></marker></defs>
        </svg>
        <span>Rotationnel ≠ 0 : le champ « tourbillonne »</span>
      </div>
    </div>

    <h3>4. Laplacien</h3>
    <p>Le laplacien scalaire enchaîne les deux premiers opérateurs : $\\Delta f = \\text{div}(\\overrightarrow{\\text{grad}}\\,f) = \\frac{\\partial^2 f}{\\partial x^2}+\\frac{\\partial^2 f}{\\partial y^2}+\\frac{\\partial^2 f}{\\partial z^2}$. Il apparaît dans de nombreuses équations physiques fondamentales (diffusion de la chaleur, équation de Laplace en électrostatique).</p>

    <h3>5. Le gradient en coordonnées non cartésiennes</h3>
    <p>Le principe reste identique (le gradient reste défini par $dV = \\overrightarrow{\\text{grad}}V\\cdot d\\overrightarrow{OM}$), seules les composantes changent car $d\\overrightarrow{OM}$ change de forme :</p>
    <table class="mini-table">
      <tr><th>Système</th><th>Composantes du gradient de $V$</th></tr>
      <tr><td>Polaire</td><td>$V_\\rho=\\dfrac{\\partial V}{\\partial \\rho}$, $\\ V_\\theta=\\dfrac{1}{\\rho}\\dfrac{\\partial V}{\\partial \\theta}$</td></tr>
      <tr><td>Cylindrique</td><td>$V_\\rho=\\dfrac{\\partial V}{\\partial \\rho}$, $\\ V_\\theta=\\dfrac{1}{\\rho}\\dfrac{\\partial V}{\\partial \\theta}$, $\\ V_z=\\dfrac{\\partial V}{\\partial z}$</td></tr>
      <tr><td>Sphérique</td><td>$V_\\rho=\\dfrac{\\partial V}{\\partial \\rho}$, $\\ V_\\theta=\\dfrac{1}{\\rho}\\dfrac{\\partial V}{\\partial \\theta}$, $\\ V_\\varphi=\\dfrac{1}{\\rho\\sin\\theta}\\dfrac{\\partial V}{\\partial \\varphi}$</td></tr>
    </table>

    <h3>6. Divergence et rotationnel en coordonnées cylindriques et sphériques</h3>
    <p>Pour un vecteur $\\vec{A}=A_\\rho\\vec{u}_\\rho + A_\\theta\\vec{u}_\\theta + A_z\\vec{k}$ en <strong>coordonnées cylindriques</strong> :</p>
    <div class="formula-box">$$\\text{div}\\,\\vec{A} = \\frac{1}{\\rho}\\frac{\\partial(\\rho A_\\rho)}{\\partial \\rho} + \\frac{1}{\\rho}\\frac{\\partial A_\\theta}{\\partial \\theta} + \\frac{\\partial A_z}{\\partial z}$$</div>
    <div class="formula-box">$$\\overrightarrow{\\text{rot}}\\,\\vec{A} = \\left(\\frac{1}{\\rho}\\frac{\\partial A_z}{\\partial \\theta}-\\frac{\\partial A_\\theta}{\\partial z}\\right)\\vec{u}_\\rho + \\left(\\frac{\\partial A_\\rho}{\\partial z}-\\frac{\\partial A_z}{\\partial \\rho}\\right)\\vec{u}_\\theta + \\frac{1}{\\rho}\\left(\\frac{\\partial(\\rho A_\\theta)}{\\partial \\rho}-\\frac{\\partial A_\\rho}{\\partial \\theta}\\right)\\vec{k}$$</div>
    <p>Pour $\\vec{A}=A_\\rho\\vec{u}_\\rho + A_\\theta\\vec{u}_\\theta + A_\\varphi\\vec{u}_\\varphi$ en <strong>coordonnées sphériques</strong> :</p>
    <div class="formula-box">$$\\text{div}\\,\\vec{A} = \\frac{1}{\\rho^2}\\frac{\\partial(\\rho^2 A_\\rho)}{\\partial \\rho} + \\frac{1}{\\rho\\sin\\theta}\\frac{\\partial(A_\\theta\\sin\\theta)}{\\partial \\theta} + \\frac{1}{\\rho\\sin\\theta}\\frac{\\partial A_\\varphi}{\\partial \\varphi}$$</div>
    <div class="formula-box">$$\\overrightarrow{\\text{rot}}\\,\\vec{A} = \\frac{1}{\\rho\\sin\\theta}\\left[\\frac{\\partial(\\sin\\theta\\,A_\\varphi)}{\\partial \\theta}-\\frac{\\partial A_\\theta}{\\partial \\varphi}\\right]\\vec{u}_\\rho + \\left[\\frac{1}{\\rho\\sin\\theta}\\frac{\\partial A_\\rho}{\\partial \\varphi}-\\frac{1}{\\rho}\\frac{\\partial(\\rho A_\\varphi)}{\\partial \\rho}\\right]\\vec{u}_\\theta + \\frac{1}{\\rho}\\left[\\frac{\\partial(\\rho A_\\theta)}{\\partial \\rho}-\\frac{\\partial A_\\rho}{\\partial \\theta}\\right]\\vec{u}_\\varphi$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Ces formules complètes ne sont pas à apprendre par cœur mot pour mot : elles se retrouvent dans un formulaire le jour de l'examen. Ce qui compte est de savoir <strong>reconnaître la symétrie</strong> du problème pour choisir le bon système, et de savoir <strong>appliquer</strong> la formule correspondante sans hésiter sur les indices.
    </div>

    <h3>7. Laplacien scalaire en coordonnées cylindriques et sphériques</h3>
    <div class="formula-box">$$\\Delta f = \\frac{1}{\\rho}\\left[\\frac{\\partial}{\\partial \\rho}\\left(\\rho\\frac{\\partial f}{\\partial \\rho}\\right) + \\frac{\\partial}{\\partial \\theta}\\left(\\frac{1}{\\rho}\\frac{\\partial f}{\\partial \\theta}\\right) + \\frac{\\partial}{\\partial z}\\left(\\frac{\\partial f}{\\partial z}\\right)\\right] \\quad \\text{(cylindriques)}$$</div>
    <div class="formula-box">$$\\Delta f = \\frac{1}{\\rho^2\\sin\\theta}\\left[\\frac{\\partial}{\\partial \\rho}\\left(\\rho^2\\sin\\theta\\frac{\\partial f}{\\partial \\rho}\\right) + \\frac{\\partial}{\\partial \\theta}\\left(\\sin\\theta\\frac{\\partial f}{\\partial \\theta}\\right) + \\frac{\\partial}{\\partial \\varphi}\\left(\\frac{1}{\\sin\\theta}\\frac{\\partial f}{\\partial \\varphi}\\right)\\right] \\quad \\text{(sphériques)}$$</div>
    <p>Deux propriétés à retenir dans tous les systèmes : $\\text{div}(\\overrightarrow{\\text{rot}}\\,\\vec{V})=0$ (le rotationnel d'un champ est toujours à flux conservatif) et $\\overrightarrow{\\text{rot}}(\\overrightarrow{\\text{grad}}\\,f)=\\vec{0}$ (un gradient est toujours irrotationnel).</p>

    <h3>8. Circulation, flux, et les grands théorèmes</h3>
    <p>La <strong>circulation</strong> d'un champ $\\vec{V}$ le long d'un chemin de $A$ à $B$ est $\\mathcal{C} = \\int_{A}^{B} \\vec{V}\\cdot d\\overrightarrow{OM}$ — pour une force, c'est exactement le travail. Le <strong>flux</strong> d'un champ à travers une surface $(S)$ est $\\phi = \\iint_S \\vec{V}\\cdot\\vec{n}\\,dS$, le vecteur unitaire $\\vec{n}$ étant dirigé vers l'extérieur si $(S)$ est fermée.</p>
    <table class="mini-table">
      <tr><th>Théorème</th><th>Relie...</th><th>Énoncé</th></tr>
      <tr><td>Stokes</td><td>circulation et rotationnel</td><td>$\\displaystyle\\oint_{(C)} \\vec{V}\\cdot d\\vec{l} = \\iint_S \\overrightarrow{\\text{rot}}\\,\\vec{V}\\cdot\\vec{n}\\,dS$ — la circulation sur un contour fermé $(C)$ égale le flux du rotationnel à travers une surface $(S)$ qui s'appuie sur $(C)$, $\\vec{n}$ orienté selon la règle du tire-bouchon</td></tr>
      <tr><td>Green-Ostrogradski</td><td>flux et divergence</td><td>$\\displaystyle\\oiint_{(S)} \\vec{V}\\cdot\\vec{n}\\,dS = \\iiint_{(\\tau)} \\text{div}\\,\\vec{V}\\,d\\tau$ — le flux à travers une surface fermée $(S)$ égale l'intégrale de la divergence dans le volume $(\\tau)$ qu'elle délimite</td></tr>
    </table>
    <p>Ces deux théorèmes permettent de transformer un calcul difficile (une intégrale sur un contour ou une surface) en un calcul souvent plus simple (une intégrale de volume ou de surface) — c'est tout leur intérêt pratique.</p>
    <p><strong>Cas limite à surveiller :</strong> Stokes et Green-Ostrogradski exigent que le champ soit défini (et dérivable) partout à l'intérieur du contour ou de la surface fermée considérée. Pour un champ électrique créé par une charge ponctuelle, par exemple, le théorème de Green-Ostrogradski appliqué à une sphère centrée sur la charge donne un résultat trompeur si l'on ne traite pas séparément le point singulier où se trouve la charge elle-même.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le théorème de Green-Ostrogradski dit que le flux à travers une surface fermée ne dépend que de ce qu'il y a <em>à l'intérieur</em>. Que peux-tu en déduire sur le flux du champ électrique créé par une seule charge, à travers deux sphères de rayons différents centrées sur cette charge ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — vérifier Green-Ostrogradski</span>
      <p><strong>Énoncé :</strong> soit $\\vec{V}=x\\vec{i}+y\\vec{j}+z\\vec{k}$ et $(S)$ la sphère de rayon $R$ centrée en O. Vérifier le théorème de la divergence.</p>
      <p><strong>Solution :</strong> $\\text{div}\\,\\vec{V} = 1+1+1 = 3$, donc $\\iiint_\\tau \\text{div}\\,\\vec{V}\\,d\\tau = 3\\cdot\\frac{4}{3}\\pi R^3 = 4\\pi R^3$. Côté flux, sur la sphère $\\vec{n}=\\vec{u}_\\rho$ et $\\vec{V}\\cdot\\vec{n}=\\rho=R$ (constant sur la sphère), donc $\\oiint_S \\vec{V}\\cdot\\vec{n}\\,dS = R\\times 4\\pi R^2 = 4\\pi R^3$.</p>
      <p class="example-answer">Les deux membres coïncident : $4\\pi R^3 = 4\\pi R^3$ ✓ — le théorème est vérifié.</p>
    </div>

    <h3>9. Frontière de la recherche — des équations de Maxwell à la météorologie</h3>
    <p>Les quatre équations de Maxwell, qui décrivent la totalité de l'électromagnétisme classique, s'écrivent en seulement quatre lignes grâce à la divergence et au rotationnel — une élégance qui a directement inspiré Einstein dans sa recherche d'une théorie unifiée. Aujourd'hui, ces mêmes opérateurs sont au cœur des modèles de prévision météorologique (équations de Navier-Stokes pour l'atmosphère), où la divergence du champ de vent signale les zones de haute ou basse pression, et le rotationnel détecte directement la formation de cyclones et de tornades.</p>
    <p><strong>Question ouverte :</strong> les équations de Navier-Stokes, qui gouvernent l'écoulement des fluides via ces mêmes opérateurs différentiels, n'ont toujours pas de preuve mathématique générale d'existence et de régularité de leurs solutions en trois dimensions — l'un des sept problèmes du prix du millénaire de l'Institut Clay, doté d'un million de dollars, reste non résolu à ce jour.</p>
    <p><strong>Technologie émergente :</strong> les simulations numériques de mécanique des fluides (CFD, Computational Fluid Dynamics), utilisées pour concevoir des avions, des voitures ou des éoliennes plus performants, résolvent numériquement — faute de solution analytique générale — ces équations construites entièrement à partir du gradient, de la divergence et du rotationnel que tu viens d'apprendre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Champ scalaire → gradient (vecteur) — Champ vectoriel → divergence (scalaire, sources) / rotationnel (vecteur, tourbillons) → théorèmes de Stokes / Green-Ostrogradski (local ↔ global)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{div}(\\overrightarrow{\\text{rot}}\\,\\vec{V})=0 \\qquad\\qquad \\overrightarrow{\\text{rot}}(\\overrightarrow{\\text{grad}}\\,f)=\\vec{0}$$
      Ces deux identités structurent toute la théorie des champs : un rotationnel est toujours à flux conservatif, et un gradient est toujours irrotationnel — deux résultats qui reviendront sans cesse en électromagnétisme.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le gradient (vecteur) pointe vers la plus forte augmentation d'un champ scalaire</li>
        <li>La divergence (scalaire) détecte les sources/puits d'un champ vectoriel ; un champ à divergence nulle est à flux conservatif</li>
        <li>Le rotationnel (vecteur) détecte les tourbillons ; un champ irrotationnel dérive d'un potentiel scalaire</li>
        <li>Stokes relie circulation et rotationnel ; Green-Ostrogradski relie flux et divergence</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre gradient (vecteur, agit sur un scalaire) et divergence (scalaire, agit sur un vecteur)</li>
        <li>Oublier que le rotationnel est un vecteur, pas un scalaire</li>
        <li>Appliquer le théorème de Stokes à une surface qui n'est pas bien orientée par rapport au contour (règle du tire-bouchon)</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — champ de gradient</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Choisis un champ scalaire f(x,y) : observe comment les flèches du gradient pointent toujours vers les valeurs croissantes.</p>
      <div class="sim-2col">
        <svg id="gradSvg" viewBox="0 0 200 200" width="220" height="220">
          <defs><marker id="gradArrowHead" markerWidth="6" markerHeight="6" refX="4" refY="2" orient="auto"><path d="M0,0L4,2L0,4Z" fill="#2DD4C4"/></marker></defs>
        </svg>
        <div class="sim-controls">
          <label>Champ scalaire f(x,y)</label>
          <select id="gradField" onchange="drawGradientField()">
            <option value="bowl">f = x² + y² (un bol)</option>
            <option value="saddle">f = x² − y² (une selle)</option>
            <option value="plane">f = x + y/2 (un plan incliné)</option>
          </select>
          <p style="font-size:0.82rem; color:var(--ink-soft); margin-top:10px;">Les flèches montrent la direction du gradient en chaque point : elles pointent toujours vers où f augmente le plus vite, perpendiculairement aux courbes de niveau.</p>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour $f(x,y,z) = x^2y + z$, que vaut $\\overrightarrow{\\text{grad}}f$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt3e1" value="wrong"> $(2x, 1, 1)$</label>
          <label class="option"><input type="radio" name="mt3e1" value="right"> $(2xy,\\ x^2,\\ 1)$</label>
          <label class="option"><input type="radio" name="mt3e1" value="wrong"> $(x^2, 2xy, 0)$</label>
          <label class="option"><input type="radio" name="mt3e1" value="wrong"> $(2x, x^2y, 1)$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt3e1','mt3fb1','Correct — dérive séparément par rapport à x, y et z : (2xy, x², 1).','Dérive f par rapport à chaque variable séparément, les autres étant constantes : ∂f/∂x, ∂f/∂y, ∂f/∂z.')">Vérifier</button>
        <div class="feedback" id="mt3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un champ de vecteur a une divergence nulle partout. Que peut-on affirmer ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt3e2" value="wrong"> Le champ est nul</label>
          <label class="option"><input type="radio" name="mt3e2" value="right"> Le champ est à flux conservatif</label>
          <label class="option"><input type="radio" name="mt3e2" value="wrong"> Le champ dérive forcément d'un potentiel</label>
          <label class="option"><input type="radio" name="mt3e2" value="wrong"> Le champ est forcément uniforme</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt3e2','mt3fb2','Correct — une divergence nulle partout définit exactement un champ à flux conservatif.','Relis la définition : un champ dont la divergence est nulle en tout point est dit \\'à flux conservatif\\'.')">Vérifier</button>
        <div class="feedback" id="mt3fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le théorème de Stokes relie la circulation sur un contour fermé au flux de quel opérateur ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt3e3" value="wrong"> Le gradient</label>
          <label class="option"><input type="radio" name="mt3e3" value="wrong"> La divergence</label>
          <label class="option"><input type="radio" name="mt3e3" value="right"> Le rotationnel</label>
          <label class="option"><input type="radio" name="mt3e3" value="wrong"> Le laplacien</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt3e3','mt3fb3','Correct — Stokes relie circulation et flux du rotationnel.','Le théorème de Green-Ostrogradski utilise la divergence ; Stokes, lui, utilise le rotationnel.')">Vérifier</button>
        <div class="feedback" id="mt3fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">On donne le champ de vitesse d'un fluide $\\vec V=(-y,\\,x,\\,0)$ (un tourbillon simple autour de l'axe Oz). Sans calculer explicitement le rotationnel, propose un argument géométrique pour deviner s'il est nul ou non. Puis calcule-le pour vérifier ton intuition. Ce champ dérive-t-il d'un potentiel scalaire ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : dessine ce champ en quelques points (par exemple sur le cercle unité) — a-t-il l'air de tourner autour de l'origine ? Rappelle-toi le lien entre rotationnel et « roue à aubes ».</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le rotationnel du champ électrique n'était pas toujours nul (comme c'est justement le cas en présence d'un champ magnétique variable, selon Maxwell-Faraday) : quel phénomène physique cela permet-il d'expliquer ?</li>
        <li>Pourquoi peut-on dire que le théorème de Green-Ostrogradski est, au fond, une version tridimensionnelle du théorème fondamental de l'analyse ($\\int_a^b f'(x)dx=f(b)-f(a)$) ?</li>
        <li>Quelle serait la conséquence, pour la prévision météorologique, d'un modèle qui négligerait systématiquement le rotationnel du champ de vent ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. C. Maxwell, <em>A Treatise on Electricity and Magnetism</em>, 1873 — formulation classique des équations unifiant électricité et magnétisme.</li>
        <li>J.-P. Pérez, <em>Électromagnétisme — Fondements et applications</em>, Dunod (chapitres sur les opérateurs différentiels appliqués aux champs).</li>
        <li>C. L. Fefferman, « Existence and Smoothness of the Navier-Stokes Equation », Clay Mathematics Institute, 2000 — énoncé officiel du problème du prix du millénaire.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Gradient, divergence et rotationnel te suivront dans tout le reste de tes études de physique — électromagnétisme, mécanique des fluides, relativité générale. Le chapitre suivant, « Nombres complexes », t'offre un tout autre outil, tout aussi puissant, pour manipuler oscillations et ondes. Comme le résumait Maxwell lui-même, non sans malice, en présentant ses équations : « Il est bon d'avoir de la certitude, même si l'on ne peut pas encore tout comprendre. »</p>
  `,
  init: initGradientSim
};

MATH_TOOLS_NOVA_KB[mtKey('Opérateurs différentiels et théorèmes intégraux')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Opérateurs différentiels et théorèmes intégraux ». Demande-moi ce que fait le gradient, la divergence ou le rotationnel, ou un indice sur un exercice.",
  rules: [
    { test:/gradient/i, replies:["Le gradient d'un champ scalaire est un vecteur qui pointe vers la direction où ce champ augmente le plus vite, avec une norme égale à cette vitesse de variation."] },
    { test:/divergence/i, replies:["La divergence d'un champ vectoriel est un nombre (pas un vecteur) qui détecte les sources (positif) ou les puits (négatif). Si elle est nulle partout, le champ est à flux conservatif."] },
    { test:/rotationnel/i, replies:["Le rotationnel détecte les tourbillons d'un champ vectoriel : imagine une petite roue à aubes plongée dedans — si elle tourne, le rotationnel n'est pas nul, et son axe donne la direction du rotationnel."] },
    { test:/laplacien/i, replies:["Le laplacien scalaire Δf = div(grad f) enchaîne gradient puis divergence. Il apparaît dans les équations de diffusion et d'électrostatique."] },
    { test:/stokes/i, replies:["Le théorème de Stokes dit que la circulation d'un champ sur un contour fermé est égale au flux de son rotationnel à travers une surface qui s'appuie sur ce contour."] },
    { test:/green|ostrogradski|divergence.*th[ée]or/i, replies:["Le théorème de Green-Ostrogradski (théorème de la divergence) dit que le flux d'un champ à travers une surface fermée est égal à l'intégrale de sa divergence dans le volume qu'elle délimite."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : dérive f par rapport à x, puis à y, puis à z, séparément.","Indice niveau 2 : ∂f/∂x = 2xy, ∂f/∂y = x², ∂f/∂z = 1.","Indice niveau 3 : le gradient est (2xy, x², 1)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : repense à la définition exacte donnée dans le cours pour une divergence nulle partout.","Indice niveau 2 : ça décrit un champ dont rien n'apparaît ni ne disparaît.","Indice niveau 3 : la réponse est \\'à flux conservatif\\'."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : Stokes relie la circulation à un des trois opérateurs vus dans ce chapitre.","Indice niveau 2 : ce n'est ni le gradient (scalaire→vecteur) ni la divergence (vecteur→scalaire).","Indice niveau 3 : c'est le rotationnel."] }
  ]
};

/* =========================== CHAPITRE 4 =========================== */
MATH_TOOLS_CHAPTERS[mtKey('Nombres complexes')] = {
  objectives: [
    "Manipuler un nombre complexe sous forme algébrique, trigonométrique et exponentielle",
    "Représenter un complexe dans le plan et interpréter module et argument",
    "Utiliser les nombres complexes pour résoudre une équation du second degré et pour l'électrocinétique (R,L,C)",
    "Appliquer les formules de Moivre et d'Euler",
    "Analyser un circuit RLC en régime sinusoïdal pour évaluer s'il se comporte de façon inductive, capacitive ou résistive pure"
  ],
  prereqs: ["Trigonométrie", "Calcul vectoriel et systèmes de coordonnées"],
  bodyHtml: `
    <p>Au XVIe siècle, des mathématiciens italiens comme Cardan et Bombelli manipulent déjà des racines carrées de nombres négatifs pour résoudre des équations du troisième degré — mais ils les considèrent comme des artefacts de calcul « impossibles », presque honteux, à éliminer avant d'obtenir la réponse finale. Il faudra deux siècles, et l'intuition géométrique d'Euler et de Gauss, pour comprendre que ces nombres « imaginaires » ont une existence tout aussi légitime que les réels — simplement dans un plan plutôt que sur une droite.</p>
    <p>Aujourd'hui, les nombres complexes ne relèvent plus de la curiosité mathématique : c'est le langage naturel de l'électronique (calcul d'impédances), du traitement du signal (analyse de Fourier), de la mécanique quantique (la fonction d'onde est intrinsèquement complexe), et même de la compression d'image via la transformée de Fourier rapide.</p>
    <p>Ce chapitre te montre comment un nombre à deux composantes, muni d'une règle de multiplication un peu particulière, transforme des calculs trigonométriques laborieux en simples additions d'exposants — un gain de simplicité que tu retrouveras à chaque fois qu'un phénomène physique oscille.</p>

    <h3>1. Définition et forme algébrique</h3>
    <p>Un nombre complexe s'écrit $z = a + ib$, avec $a,b$ réels et $i$ tel que $i^2 = -1$. On appelle $a = \\Re(z)$ la partie réelle et $b = \\Im(z)$ la partie imaginaire. L'ensemble des complexes est noté $\\mathbb{C}$, et contient $\\mathbb{R}$ (le cas $b=0$).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Deux complexes sont égaux si et seulement si ils ont la même partie réelle <em>et</em> la même partie imaginaire — contrairement aux réels, on ne peut pas comparer deux complexes avec &lt; ou &gt;.
    </div>

    <h3>2. Représentation dans le plan</h3>
    <p>À $z=a+ib$ on associe le point $M(a,b)$ dans un plan (l'affixe de $M$). Le <strong>module</strong> $|z| = \\sqrt{a^2+b^2} = OM$ mesure la distance à l'origine ; l'<strong>argument</strong> $\\theta = \\arg(z)$ est l'angle entre l'axe des réels et $OM$. Le <strong>conjugué</strong> $\\bar{z} = a - ib$ est le symétrique de $z$ par rapport à l'axe réel.</p>

    <div class="diagram">
      <svg width="180" height="150" viewBox="0 0 180 150">
        <line x1="15" y1="120" x2="165" y2="120" stroke="#5A6472" stroke-width="1.2"/>
        <line x1="30" y1="140" x2="30" y2="15" stroke="#5A6472" stroke-width="1.2"/>
        <line x1="30" y1="120" x2="110" y2="55" stroke="#4C7CFF" stroke-width="2.2" marker-end="url(#cArr)"/>
        <circle cx="110" cy="55" r="3" fill="#F0B94D"/>
        <path d="M55,120 A25,25 0 0 1 46,101" fill="none" stroke="#2DD4C4" stroke-width="1.3"/>
        <text x="52" y="112" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">θ</text>
        <text x="113" y="53" font-family="IBM Plex Mono" font-size="10" fill="#F0B94D">M(z)</text>
        <defs><marker id="cArr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#4C7CFF"/></marker></defs>
      </svg>
    </div>

    <h3>3. Formes trigonométrique et exponentielle</h3>
    <p>Tout complexe non nul peut s'écrire $z = r(\\cos\\theta + i\\sin\\theta) = re^{i\\theta}$, où $r=|z|$ et $\\theta=\\arg(z)$. Cette forme exponentielle rend les produits et quotients triviaux :</p>
    <div class="formula-box">$$e^{i\\theta}\\cdot e^{i\\theta'} = e^{i(\\theta+\\theta')} \\qquad \\frac{e^{i\\theta}}{e^{i\\theta'}} = e^{i(\\theta-\\theta')}$$</div>
    <p><strong>Multiplier</strong> deux complexes, c'est donc <strong>multiplier les modules et additionner les arguments</strong> — géométriquement, une rotation combinée à un agrandissement (ou une réduction).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Multiplier un nombre réel positif par un autre nombre réel positif ne fait jamais « tourner » quoi que ce soit sur la droite des réels. Pourquoi la multiplication de deux complexes, elle, correspond-elle à une rotation dans le plan ? Qu'est-ce que cela révèle sur la vraie nature du produit complexe ?
    </div>

    <h3>4. Formules de Moivre et d'Euler</h3>
    <div class="formula-box">
      Moivre : $(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)$<br>
      Euler : $\\cos\\theta = \\dfrac{e^{i\\theta}+e^{-i\\theta}}{2}$, &nbsp; $\\sin\\theta = \\dfrac{e^{i\\theta}-e^{-i\\theta}}{2i}$
    </div>
    <p>La formule d'Euler est l'outil qui permet de retrouver toutes les formules trigonométriques d'addition à partir des propriétés simples de l'exponentielle.</p>

    <h3>5. Application physique : impédances en régime sinusoïdal</h3>
    <p>En électrocinétique, un conducteur ohmique, une bobine ou un condensateur reçoivent chacun une <strong>impédance complexe</strong> ($Z_R = R$, $Z_L = jL\\omega$, $Z_C = -\\frac{j}{C\\omega}$ — les électriciens notent $j$ plutôt que $i$ pour éviter la confusion avec l'intensité). L'impédance totale d'un circuit RLC en série est simplement leur somme $Z = R + j\\left(L\\omega - \\frac{1}{C\\omega}\\right)$ : le module $|Z|$ donne l'amplitude, et l'argument donne le déphasage entre tension et courant.</p>

    <h3>6. Équation du second degré dans $\\mathbb{C}$</h3>
    <p>Pour $az^2+bz+c=0$ (coefficients réels, $a\\neq0$), on calcule $\\Delta = b^2-4ac$ :</p>
    <table class="mini-table">
      <tr><th>Signe de Δ</th><th>Solutions</th></tr>
      <tr><td>$\\Delta > 0$</td><td>deux solutions réelles $z_{1,2} = \\dfrac{-b\\pm\\sqrt{\\Delta}}{2a}$</td></tr>
      <tr><td>$\\Delta = 0$</td><td>une solution double $z = -\\dfrac{b}{2a}$</td></tr>
      <tr><td>$\\Delta < 0$</td><td>deux solutions complexes conjuguées $z_{1,2} = \\dfrac{-b\\pm i\\sqrt{|\\Delta|}}{2a}$</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> résoudre $z^2+z+1=0$ dans $\\mathbb{C}$.</p>
      <p><strong>Solution :</strong> $\\Delta = 1-4 = -3 < 0$, donc $z_{1,2} = \\dfrac{-1 \\pm i\\sqrt{3}}{2}$.</p>
      <p class="example-answer">Réponse : deux solutions complexes conjuguées, sans quoi cette équation n'aurait aucune solution.</p>
    </div>
    <p><strong>Cas limite à retenir :</strong> même si les coefficients $a,b,c$ sont réels, les deux racines complexes conjuguées $z_1$ et $z_2=\\bar z_1$ vérifient toujours $z_1z_2=c/a$ (réel) et $z_1+z_2=-b/a$ (réel) — c'est parce qu'une équation à coefficients réels ne peut jamais avoir « une seule » racine complexe non réelle : elles viennent forcément par paires conjuguées.</p>

    <h3>7. Interprétation géométrique d'un rapport de complexes</h3>
    <p>Soient $A$, $B$, $C$ d'affixes $a$, $b$, $c$. Le rapport $Z=\\dfrac{c-a}{b-a}$ encode à la fois un angle et un rapport de longueurs :</p>
    <div class="formula-box">$$\\arg(Z) = \\text{mes}(\\overrightarrow{AB},\\overrightarrow{AC}) \\qquad |Z| = \\frac{AC}{AB}$$</div>
    <p>Cette propriété est très utile pour caractériser des figures géométriques : par exemple, $A$, $B$, $C$ sont alignés si et seulement si $Z$ est réel, et le triangle $ABC$ est rectangle en $A$ si et seulement si $Z$ est imaginaire pur.</p>

    <h3>8. Nombres complexes et transformations géométriques</h3>
    <p>Les transformations usuelles du plan se traduisent simplement en langage complexe. Si $M$ (affixe $z$) a pour image $M'$ (affixe $z'$) :</p>
    <table class="mini-table">
      <tr><th>Transformation</th><th>Relation complexe</th></tr>
      <tr><td>Translation de vecteur $\\vec{u}$ (affixe $z_{\\vec{u}}$)</td><td>$z' = z + z_{\\vec{u}}$</td></tr>
      <tr><td>Homothétie de centre $\\Omega$ (affixe $\\omega$), rapport $k\\in\\mathbb{R}^*$</td><td>$z' - \\omega = k(z-\\omega)$</td></tr>
      <tr><td>Rotation de centre $\\Omega$, angle $\\theta$</td><td>$z' - \\omega = e^{i\\theta}(z-\\omega)$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Pour une rotation, on retrouve bien $\\Omega M' = \\Omega M$ (l'homothétie associée a un rapport de module 1) et $\\theta = \\text{mes}(\\overrightarrow{\\Omega M},\\overrightarrow{\\Omega M'})$ : c'est cohérent avec le fait que multiplier par $e^{i\\theta}$ ne change pas le module mais ajoute $\\theta$ à l'argument.
    </div>

    <h3>9. Circuits RLC : lecture graphique du déphasage</h3>
    <p>Pour un circuit RLC série, on représente souvent l'impédance complexe comme une somme vectorielle dans le plan : $\\overrightarrow{OM} = \\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OD}$ où $A$ (affixe $R$), $B$ (affixe $jL\\omega$) et $D$ (affixe $-j/(C\\omega)$) sont portés respectivement sur l'axe réel et l'axe imaginaire. Le déphasage $\\varphi$ entre tension et courant se lit alors directement :</p>
    <table class="mini-table">
      <tr><th>Régime</th><th>Condition</th><th>Signe de φ</th></tr>
      <tr><td>Inductif</td><td>$L\\omega > \\dfrac{1}{C\\omega}$</td><td>$\\tan\\varphi = \\dfrac{L\\omega - 1/(C\\omega)}{R} > 0$ — tension en avance</td></tr>
      <tr><td>Capacitif</td><td>$L\\omega < \\dfrac{1}{C\\omega}$</td><td>$\\tan\\varphi < 0$ — tension en retard</td></tr>
      <tr><td>Résonance</td><td>$L\\omega = \\dfrac{1}{C\\omega}$</td><td>$\\varphi = 0$ — tension et courant en phase, $|Z|=R$ minimal</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      À la résonance, l'impédance $|Z|$ du circuit RLC série est minimale et vaut exactement $R$ — comme si la bobine et le condensateur « disparaissaient » du circuit. Pourtant, chacun d'eux continue individuellement à stocker et restituer de l'énergie. Comment concilier ces deux faits ?
    </div>

    <h3>10. Frontière de la recherche — des complexes à la mécanique quantique</h3>
    <p>La fonction d'onde $\\psi$ qui décrit l'état d'une particule quantique est intrinsèquement complexe — pas seulement un outil de calcul comme en électrocinétique, mais un objet physique fondamental, dont le module au carré $|\\psi|^2$ donne la probabilité de présence de la particule (interprétation de Born, 1926). C'est l'un des exemples les plus profonds où les nombres complexes ne sont plus une simplification technique, mais une nécessité conceptuelle pour décrire la nature.</p>
    <p><strong>Question ouverte :</strong> pourquoi la nature « choisit-elle » des nombres complexes plutôt que réels pour la mécanique quantique reste une question activement discutée en fondements de la physique — des expériences récentes (2021-2022) ont même montré que des théories quantiques purement réelles donnent des prédictions différentes des théories complexes standard, testables expérimentalement.</p>
    <p><strong>Technologie émergente :</strong> les ordinateurs quantiques manipulent des amplitudes de probabilité complexes (qubits) pour réaliser certains calculs de façon exponentiellement plus rapide qu'un ordinateur classique — une application directe et de pointe de l'arithmétique complexe que tu étudies ici sous sa forme la plus élémentaire.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Nombre complexe $z=a+ib$ → forme exponentielle $z=re^{i\\theta}$ → produit = rotation + homothétie → applications (résolution d'équations, impédances, ondes)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$$
      La formule d'Euler — reliant exponentielle et trigonométrie — est souvent citée comme l'une des plus belles équations des mathématiques ; elle est la clé de voûte de tout ce chapitre.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>$z=a+ib$ ; module $|z|=\\sqrt{a^2+b^2}$, argument = angle avec l'axe réel</li>
        <li>Sous forme exponentielle $z=re^{i\\theta}$, un produit multiplie les modules et additionne les arguments</li>
        <li>Un discriminant négatif donne deux solutions complexes conjuguées, jamais « pas de solution »</li>
        <li>En électrocinétique, l'impédance complexe transforme un problème de sinusoïdes déphasées en simple algèbre</li>
        <li>Translation : $z'=z+z_{\\vec u}$ ; homothétie : $z'-\\omega=k(z-\\omega)$ ; rotation : $z'-\\omega=e^{i\\theta}(z-\\omega)$</li>
        <li>Le rapport $(c-a)/(b-a)$ donne à la fois un angle (son argument) et un rapport de distances (son module)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Dire qu'une équation du second degré « n'a pas de solution » quand Δ &lt; 0 — elle en a deux, complexes</li>
        <li>Confondre module (toujours positif) et partie réelle (qui peut être négative)</li>
        <li>Oublier que multiplier par $i$ revient géométriquement à une rotation de 90°</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — plan complexe</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Fais varier z1 et z2 : observe géométriquement leur somme (point jaune) et leur produit (point rouge).</p>
      <div class="sim-2col">
        <svg viewBox="0 0 200 200" width="220" height="220">
          <line x1="20" y1="100" x2="180" y2="100" stroke="#3A4658" stroke-width="1"/>
          <line x1="100" y1="20" x2="100" y2="180" stroke="#3A4658" stroke-width="1"/>
          <line id="cxLine1" x1="100" y1="100" x2="100" y2="100" stroke="#4C7CFF" stroke-width="2" marker-end="url(#cArr1)"/>
          <line id="cxLine2" x1="100" y1="100" x2="100" y2="100" stroke="#2DD4C4" stroke-width="2" marker-end="url(#cArr2)"/>
          <line id="cxLineSum" x1="100" y1="100" x2="100" y2="100" stroke="#F0B94D" stroke-width="1.6" stroke-dasharray="3,2"/>
          <line id="cxLineProd" x1="100" y1="100" x2="100" y2="100" stroke="#FF6B6F" stroke-width="1.6" stroke-dasharray="3,2"/>
          <circle id="cxZ1" cx="100" cy="100" r="3.4" fill="#4C7CFF"/>
          <circle id="cxZ2" cx="100" cy="100" r="3.4" fill="#2DD4C4"/>
          <circle id="cxZsum" cx="100" cy="100" r="3.4" fill="#F0B94D"/>
          <circle id="cxZprod" cx="100" cy="100" r="3.4" fill="#FF6B6F"/>
          <defs>
            <marker id="cArr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#4C7CFF"/></marker>
            <marker id="cArr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#2DD4C4"/></marker>
          </defs>
        </svg>
        <div class="sim-controls">
          <label>z1 — partie réelle : <span id="cxAVal">3</span></label><input type="range" id="cxA" min="-6" max="6" step="0.5" value="3" oninput="updateComplexSim()">
          <label>z1 — partie imaginaire : <span id="cxBVal">2</span></label><input type="range" id="cxB" min="-6" max="6" step="0.5" value="2" oninput="updateComplexSim()">
          <label>z2 — partie réelle : <span id="cxCVal">-1</span></label><input type="range" id="cxC" min="-6" max="6" step="0.5" value="-1" oninput="updateComplexSim()">
          <label>z2 — partie imaginaire : <span id="cxDVal">3</span></label><input type="range" id="cxD" min="-6" max="6" step="0.5" value="3" oninput="updateComplexSim()">
          <div class="sim-readout" id="cxReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Soit $z = 3 + 4i$. Que vaut $|z|$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt4e1" value="wrong"> 7</label>
          <label class="option"><input type="radio" name="mt4e1" value="right"> 5</label>
          <label class="option"><input type="radio" name="mt4e1" value="wrong"> 12</label>
          <label class="option"><input type="radio" name="mt4e1" value="wrong"> 25</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt4e1','mt4fb1','Correct — |z| = √(3² + 4²) = √25 = 5.','Le module est √(a² + b²), pas a + b. Ici √(9+16) = √25.')">Vérifier</button>
        <div class="feedback" id="mt4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Résous $z^2 - 2z + 5 = 0$ dans $\\mathbb{C}$. Que vaut le discriminant ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt4e2" value="wrong"> 24</label>
          <label class="option"><input type="radio" name="mt4e2" value="right"> −16</label>
          <label class="option"><input type="radio" name="mt4e2" value="wrong"> 16</label>
          <label class="option"><input type="radio" name="mt4e2" value="wrong"> −24</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt4e2','mt4fb2','Correct — Δ = (−2)² − 4(1)(5) = 4 − 20 = −16, donc deux solutions complexes conjuguées.','Δ = b² − 4ac avec a=1, b=−2, c=5, soit 4 − 20.')">Vérifier</button>
        <div class="feedback" id="mt4fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Multiplier un complexe par $i$ correspond géométriquement à...</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt4e3" value="wrong"> une symétrie par rapport à l'axe réel</label>
          <label class="option"><input type="radio" name="mt4e3" value="right"> une rotation de 90°</label>
          <label class="option"><input type="radio" name="mt4e3" value="wrong"> un agrandissement sans rotation</label>
          <label class="option"><input type="radio" name="mt4e3" value="wrong"> aucune transformation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt4e3','mt4fb3','Correct — i = e^(iπ/2), donc multiplier par i ajoute 90° à l\\'argument : c\\'est une rotation d\\'un quart de tour.','Écris i sous forme exponentielle : i = e^(iπ/2). Multiplier deux complexes additionne leurs arguments.')">Vérifier</button>
        <div class="feedback" id="mt4fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Un circuit RLC série est alimenté à une pulsation $\\omega$ que tu peux faire varier librement. Décris qualitativement, sans calcul complet, comment évoluent le module $|Z|$ et l'argument (déphasage) de l'impédance quand $\\omega$ balaie de très petites à de très grandes valeurs. À quelle condition sur $\\omega$ le circuit passe-t-il d'un comportement capacitif à un comportement inductif ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : regarde comment $L\\omega$ et $1/(C\\omega)$ évoluent séparément quand $\\omega\\to0$ et $\\omega\\to\\infty$ — l'un croît, l'autre décroît.</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on définissait un nombre $j$ tel que $j^3=-1$ au lieu de $i^2=-1$ : à quoi ressemblerait la représentation géométrique correspondante, et serait-elle encore un plan ?</li>
        <li>Pourquoi peut-on dire que la trigonométrie « classique » (angles, sinus, cosinus) est un cas particulier, presque encombrant, de l'arithmétique des nombres complexes — plutôt que l'inverse ?</li>
        <li>Quelle serait la conséquence, pour la conception des amplificateurs audio, d'un monde où l'on ne pourrait pas utiliser les nombres complexes pour calculer les impédances ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>L. Euler, <em>Introductio in analysin infinitorum</em>, 1748 — première formulation rigoureuse de la formule d'Euler $e^{i\\theta}=\\cos\\theta+i\\sin\\theta$.</li>
        <li>J.-P. Pérez, <em>Électronique — Fondements et applications</em>, Dunod (chapitre sur les impédances complexes en régime sinusoïdal).</li>
        <li>M. Born, « Zur Quantenmechanik der Stoßvorgänge », <em>Zeitschrift für Physik</em>, 1926 — interprétation probabiliste de la fonction d'onde complexe.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Les nombres complexes te suivront jusqu'en mécanique quantique et en traitement du signal — un outil dont l'utilité ne cesse de grandir avec le niveau d'études. Le chapitre suivant, « Équations différentielles », te montrera comment ces mêmes complexes permettent de résoudre élégamment les oscillateurs que tu commences à croiser en physique. Comme le disait le mathématicien Jacques Hadamard : « Le plus court chemin entre deux vérités dans le domaine réel passe souvent par le domaine complexe. »</p>
  `,
  init: initComplexSim
};

MATH_TOOLS_NOVA_KB[mtKey('Nombres complexes')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Nombres complexes ». Demande-moi ce qu'est le module ou l'argument d'un complexe, donne-moi un complexe (ex : « 3+4i ») pour que je calcule son module, ou demande un indice sur un exercice.",
  rules: [
    { test:/module/i, replies:["Le module |z| = √(a²+b²) est la distance entre l'origine et le point qui représente z dans le plan — toujours un nombre positif ou nul."] },
    { test:/argument/i, replies:["L'argument arg(z) est l'angle entre l'axe des réels et le segment reliant l'origine au point représentant z. Il n'est pas défini pour z = 0."] },
    { test:/euler|moivre/i, replies:["La formule d'Euler relie exponentielle et trigonométrie : e^(iθ) = cos θ + i sin θ. La formule de Moivre en découle : (cos θ + i sin θ)^n = cos(nθ) + i sin(nθ)."] },
    { test:/discriminant|delta|second degr[ée]/i, replies:["Pour az² + bz + c = 0, calcule Δ = b² − 4ac. Si Δ < 0, il y a quand même deux solutions — complexes conjuguées, avec i√|Δ| au lieu de √Δ."] },
    { test:/imp[ée]dance|circuit|rlc/i, replies:["En régime sinusoïdal, chaque composant reçoit une impédance complexe : Z_R = R, Z_L = jLω, Z_C = −j/(Cω). Elles s'additionnent comme des résistances en série."] },
    { test:/conjugu[ée]/i, replies:["Le conjugué de z = a+ib est z̄ = a−ib : c'est le symétrique de z par rapport à l'axe réel. Utile car z·z̄ = |z|² est toujours réel positif."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique |z| = √(a²+b²) avec a=3, b=4.","Indice niveau 2 : 3² + 4² = 9+16 = 25.","Indice niveau 3 : √25 = 5."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : calcule Δ = b² − 4ac avec a=1, b=−2, c=5.","Indice niveau 2 : (−2)² = 4, et 4×1×5 = 20.","Indice niveau 3 : Δ = 4 − 20 = −16."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : écris i sous forme exponentielle.","Indice niveau 2 : i = e^(iπ/2), donc multiplier par i ajoute un angle à l'argument.","Indice niveau 3 : ajouter π/2 (90°) à l'argument est une rotation de 90°."] }
  ]
};

/* =========================== CHAPITRE 5 =========================== */
MATH_TOOLS_CHAPTERS[mtKey('Équations différentielles')] = {
  objectives: [
    "Reconnaître l'ordre et la linéarité d'une équation différentielle",
    "Résoudre une équation du premier ordre à variables séparables ou linéaire",
    "Résoudre une équation linéaire du second ordre à coefficients constants selon le signe du discriminant",
    "Relier ces solutions à des situations physiques courantes (charge/décharge, oscillateur)",
    "Analyser un système physique décrit par une équation différentielle pour évaluer son régime (apériodique, critique, pseudo-périodique) à partir du signe du discriminant"
  ],
  prereqs: ["Différentielles et calcul d'incertitudes", "Nombres complexes"],
  bodyHtml: `
    <p>En 1687, dans les mêmes Principia où il énonce ses trois lois du mouvement, Newton invente aussi — avec Leibniz, indépendamment, ce qui déclenchera une querelle de priorité célèbre — le calcul différentiel nécessaire pour les résoudre. Car dire que « la force égale la masse fois l'accélération » ne sert à rien tant qu'on ne sait pas résoudre l'équation qui en découle pour retrouver la position en fonction du temps : c'est précisément l'objet des équations différentielles.</p>
    <p>Ces équations ne se limitent pas à la mécanique : elles décrivent la décharge d'un condensateur, la croissance d'une population, la propagation d'une épidémie, la désintégration radioactive, ou le refroidissement d'une tasse de café — des domaines en apparence sans rapport, mais gouvernés par les mêmes structures mathématiques.</p>
    <p>Ce chapitre te donne les méthodes de résolution des équations différentielles les plus courantes en physique de licence — premier ordre, second ordre à coefficients constants — et te montre comment le même formalisme décrit aussi bien un ressort amorti qu'un circuit électrique RLC.</p>

    <h3>1. Vocabulaire : ordre et linéarité</h3>
    <p>L'<strong>ordre</strong> d'une équation différentielle est celui de la plus haute dérivée qui y apparaît. Une équation est <strong>linéaire</strong> si l'inconnue $y$ et ses dérivées n'apparaissent qu'à la puissance 1 (pas de $y^2$, pas de $\\sin y$, pas de produit $y\\cdot y'$).</p>

    <h3>2. Premier ordre à variables séparables</h3>
    <p>Quand on peut écrire l'équation sous la forme $g(y)\\,dy = h(x)\\,dx$, il suffit d'intégrer chaque membre séparément :</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> résoudre $y' = 3y$, soit $\\dfrac{dy}{dx} = 3y$.</p>
      <p><strong>Solution :</strong> on sépare : $\\dfrac{dy}{y} = 3\\,dx$, puis on intègre : $\\ln|y| = 3x + C$, donc $y = K e^{3x}$ (avec $K = e^C$).</p>
      <p class="example-answer">Réponse : $y(x) = K e^{3x}$ — une famille de solutions, une par valeur de $K$ (fixée par la condition initiale $y(0)$).</p>
    </div>

    <h3>3. Premier ordre linéaire (avec second membre)</h3>
    <p>Pour $y' + a(x)y = b(x)$, la méthode se déroule en deux temps :</p>
    <table class="mini-table">
      <tr><th>Étape</th><th>Ce qu'on fait</th></tr>
      <tr><td>1. Solution homogène</td><td>Résoudre $y'+a(x)y=0$ (variables séparables) → $y_h = Ke^{-\\int a(x)dx}$</td></tr>
      <tr><td>2. Solution particulière</td><td>Trouver <em>une</em> solution de l'équation complète (souvent en devinant sa forme d'après $b(x)$)</td></tr>
      <tr><td>3. Solution générale</td><td>$y = y_h + y_p$</td></tr>
    </table>
    <p>Physiquement, $y_h$ décrit le régime « libre » (qui s'éteint souvent avec le temps), et $y_p$ le régime « forcé » imposé par le second membre.</p>

    <h3>4. Second ordre linéaire à coefficients constants</h3>
    <p>Pour $ay'' + by' + cy = 0$ (coefficients constants, second membre nul), on cherche des solutions de la forme $y=e^{rx}$, ce qui ramène le problème à une simple équation du second degré, l'<strong>équation caractéristique</strong> :</p>
    <div class="formula-box">$$ar^2+br+c=0$$</div>
    <table class="mini-table">
      <tr><th>Signe de Δ</th><th>Racines</th><th>Solution générale</th><th>Comportement</th></tr>
      <tr><td>$\\Delta > 0$</td><td>$r_1, r_2$ réelles distinctes</td><td>$y = K_1e^{r_1x} + K_2e^{r_2x}$</td><td>croissance/décroissance exponentielle</td></tr>
      <tr><td>$\\Delta = 0$</td><td>$r_0$ double</td><td>$y = (K_1+K_2x)e^{r_0x}$</td><td>régime critique</td></tr>
      <tr><td>$\\Delta < 0$</td><td>$r = \\alpha \\pm i\\beta$</td><td>$y = e^{\\alpha x}(K_1\\cos\\beta x + K_2\\sin\\beta x)$</td><td>oscillation (amortie si $\\alpha<0$)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — c'est exactement le même Δ que pour une équation du second degré</span>
      C'est ici que les nombres complexes du chapitre précédent redeviennent essentiels : quand Δ &lt; 0, les racines complexes de l'équation caractéristique donnent directement la pulsation $\\beta$ des oscillations, via la formule d'Euler.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le cas $\\Delta=0$ (régime critique) sépare deux comportements qualitativement très différents (exponentielles pures pour $\\Delta>0$, oscillations pour $\\Delta<0$). Pourquoi ce cas limite, en apparence anodin, joue-t-il un rôle si important dans la conception des amortisseurs de voiture ou des portes qui se referment automatiquement ?
    </div>

    <h3>5. Une application physique classique</h3>
    <p>Le circuit RLC série obéit à $L\\ddot{q} + R\\dot{q} + \\dfrac{q}{C} = 0$ pour la charge $q$ du condensateur : c'est exactement une équation du second ordre à coefficients constants. Selon le signe de $\\Delta = R^2 - 4L/C$, on retrouve les trois régimes du tableau ci-dessus — apériodique, critique, ou pseudo-périodique (oscillations amorties) — ce qui explique pourquoi ce même formalisme mathématique décrit aussi bien un ressort avec frottement qu'un circuit électrique.</p>

    <h3>6. Changement de variable : rendre une équation non linéaire linéaire</h3>
    <p>Certaines équations non linéaires classiques se ramènent à une équation linéaire (que l'on sait résoudre) par un changement de fonction inconnue bien choisi.</p>
    <div class="key-point">
      <span class="eyebrow">Équation de Bernoulli</span>
      Une équation du type $y' + a(x)y = b(x)y^n$ ($n\\neq 0,1$) devient linéaire en posant $u=y^{1-n}$. Exemple : $y'\\cos x + y\\sin x + y^3=0$ devient, avec $u=1/y^2$, l'équation linéaire $u' - 2u\\tan x = \\dfrac{2}{\\cos x}$.
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation de Riccati</span>
      Une équation du type $y' = a(x)y^2+b(x)y+c(x)$ n'est pas linéaire en général — mais si l'on connaît (ou devine) une <strong>solution particulière évidente</strong> $y_0$, le changement $y=y_0+\\dfrac{1}{u}$ ramène l'équation à une équation linéaire du premier ordre en $u$.
    </div>
    <p><strong>Cas limite à surveiller :</strong> la méthode de Riccati échoue complètement si l'on ne trouve aucune solution particulière évidente $y_0$ — contrairement à une équation linéaire, qui se résout toujours par les méthodes systématiques de ce chapitre. C'est ce qui rend les équations non linéaires fondamentalement plus difficiles : leur résolution dépend souvent d'un « coup de chance » ou d'une astuce propre à chaque équation, sans méthode générale garantie.</p>
    <p>La méthode est toujours la même : repérer la forme de l'équation, poser le bon changement de variable $u$, résoudre l'équation linéaire obtenue pour $u$, puis revenir à $y$.</p>

    <h3>7. Trouver la solution particulière par variation de la constante</h3>
    <p>Quand on ne devine pas facilement une solution particulière, la <strong>méthode de variation de la constante</strong> fonctionne toujours. Pour $f(x)y'+g(x)y=h(x)$, on résout d'abord l'équation homogène $y_h = Ke^{F(x)}$, puis on cherche une solution particulière en remplaçant la constante $K$ par une fonction $K(x)$ : $y_p = K(x)e^{F(x)}$. En reportant dans l'équation, $K(x)$ s'obtient par une simple intégration.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé (1er ordre)</span>
      <p><strong>Énoncé :</strong> résoudre $(\\sin x)y' - (\\cos x)y = x$ sur $]0,\\pi/2[$.</p>
      <p><strong>Solution :</strong> l'équation homogène donne $y_h = K\\sin x$. On pose $y_p = K(x)\\sin x$ ; en reportant, $K'(x)\\sin^2 x = x$, donc $K'(x) = \\dfrac{x}{\\sin^2 x}$. Une intégration par parties donne $K(x) = -\\dfrac{x}{\\tan x} + \\ln(\\sin x) + C$ (où $C$ est la constante d'intégration, distincte de la fonction $K(x)$ elle-même).</p>
      <p class="example-answer">Réponse : $y(x) = -x\\cos x + (C+\\ln(\\sin x))\\sin x$.</p>
    </div>
    <p>Pour le <strong>second ordre</strong> $ay''+by'+cy=f(x)$, connaissant deux solutions indépendantes $y_1,y_2$ de l'équation homogène, on cherche $y_p=A(x)y_1+B(x)y_2$ avec la contrainte $A'y_1+B'y_2=0$, ce qui mène au système :</p>
    <div class="formula-box">$$\\begin{cases} A'y_1 + B'y_2 = 0 \\\\ A'y_1' + B'y_2' = \\dfrac{f(x)}{a} \\end{cases}$$</div>
    <p>dont on tire $A'$ et $B'$, puis $A$ et $B$ par intégration.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé (2nd ordre)</span>
      <p><strong>Énoncé :</strong> résoudre $y''+y=\\dfrac{1}{\\sin^3 x}$.</p>
      <p><strong>Solution :</strong> $y_h=A\\cos x+B\\sin x$. Avec $y_1=\\sin x$, $y_2=\\cos x$, le système donne $A'=\\dfrac{\\cos x}{\\sin^3 x}$ et $B'=-\\dfrac{1}{\\sin^2 x}$, d'où (par intégration) $A(x)=-\\dfrac{1}{2\\sin^2 x}$ et $B(x)=\\dfrac{\\cos x}{\\sin x}$ — une solution particulière $y_p=A(x)y_1+B(x)y_2=\\dfrac{\\cos(2x)}{2\\sin x}$.</p>
      <p class="example-answer">Réponse : $y = C_1\\cos x + C_2\\sin x + \\dfrac{\\cos(2x)}{2\\sin x}$ (solution générale, avec $C_1,C_2$ les constantes arbitraires — à ne pas confondre avec les fonctions $A(x),B(x)$ utilisées pour construire la solution particulière).</p>
    </div>

    <h3>8. Frontière de la recherche — quand les équations différentielles deviennent chaotiques</h3>
    <p>Toutes les équations de ce chapitre sont linéaires — leurs solutions sont prévisibles et stables. Mais dès qu'une équation différentielle devient non linéaire (comme le pendule à grand angle, ou les équations de Lorenz décrivant la convection atmosphérique), un phénomène spectaculaire peut apparaître : le <strong>chaos déterministe</strong>, où deux conditions initiales infiniment proches divergent exponentiellement au cours du temps. Edward Lorenz l'a découvert par accident en 1963 en arrondissant légèrement des données d'entrée dans une simulation météo — d'où l'image de l'« effet papillon ».</p>
    <p><strong>Question ouverte :</strong> prédire la limite de prévisibilité d'un système chaotique (combien de temps à l'avance une prévision reste-t-elle fiable) reste un problème central en météorologie et en dynamique des systèmes — la limite pratique des prévisions météo à plus de 10-15 jours vient directement de cette sensibilité aux conditions initiales.</p>
    <p><strong>Technologie émergente :</strong> les réseaux de neurones utilisés pour la prévision météo ou climatique de nouvelle génération n'essaient plus de résoudre analytiquement les équations différentielles sous-jacentes (souvent impossible), mais apprennent directement, à partir de données, à approximer leurs solutions — une approche complémentaire aux méthodes classiques de ce chapitre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Équation différentielle → équation caractéristique (si coefficients constants) → signe de Δ → forme de la solution (exponentielle / critique / oscillante)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$ay''+by'+cy=0 \\quad\\Longrightarrow\\quad ar^2+br+c=0$$
      Le passage d'une équation différentielle linéaire à coefficients constants vers une simple équation algébrique — l'idée la plus puissante de tout le chapitre.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Résoudre une équation différentielle, c'est trouver une famille de fonctions, pas un nombre</li>
        <li>Premier ordre linéaire : solution générale = solution homogène + solution particulière</li>
        <li>Second ordre à coefficients constants : tout se joue sur le signe de Δ de l'équation caractéristique, exactement comme pour une équation du second degré classique</li>
        <li>Δ &lt; 0 donne des oscillations, via les racines complexes de l'équation caractéristique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier la constante d'intégration K — sans condition initiale, il n'y a pas de solution unique</li>
        <li>Confondre solution homogène et solution particulière, ou oublier d'additionner les deux</li>
        <li>Se tromper de forme de solution selon le signe de Δ (exponentielles pures vs oscillations)</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — courbes solutions</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Choisis un régime et fais varier le paramètre : observe comment la forme de la solution change complètement selon le cas.</p>
      <div class="sim-2col">
        <svg viewBox="0 0 260 160" width="280" height="180">
          <line x1="10" y1="80" x2="250" y2="80" stroke="#3A4658" stroke-width="1"/>
          <path id="odePath" d="" stroke="#4C7CFF" stroke-width="2.2" fill="none"/>
        </svg>
        <div class="sim-controls">
          <label>Régime</label>
          <select id="odeRegime" onchange="updateOdeSim()">
            <option value="exp">y' = k·y (croissance/décroissance, Δ&gt;0 simplifié)</option>
            <option value="harm">y'' + ω²y = 0 (oscillation harmonique, Δ&lt;0)</option>
            <option value="damped">oscillation amortie (Δ&lt;0, avec perte d'énergie)</option>
          </select>
          <label>Paramètre k (ou ω) : <span id="odeKVal">0.5</span></label>
          <input type="range" id="odeK" min="-1.5" max="3" step="0.1" value="0.5" oninput="updateOdeSim()">
          <label>Condition initiale y(0) : <span id="odeY0Val">1</span></label>
          <input type="range" id="odeY0" min="0.2" max="2" step="0.1" value="1" oninput="updateOdeSim()">
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Quel est l'ordre de l'équation $y'' + 3y' - 2y = \\sin x$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt5e1" value="wrong"> 1</label>
          <label class="option"><input type="radio" name="mt5e1" value="right"> 2</label>
          <label class="option"><input type="radio" name="mt5e1" value="wrong"> 3</label>
          <label class="option"><input type="radio" name="mt5e1" value="wrong"> Elle n'est pas linéaire donc l'ordre n'est pas défini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt5e1','mt5fb1','Correct — la plus haute dérivée présente est y\\'\\', donc l\\'ordre est 2.','L\\'ordre correspond à la plus haute dérivée qui apparaît dans l\\'équation : ici y\\'\\'.')">Vérifier</button>
        <div class="feedback" id="mt5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La solution générale de $y' = -2y$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt5e2" value="wrong"> $y = Ke^{2x}$</label>
          <label class="option"><input type="radio" name="mt5e2" value="right"> $y = Ke^{-2x}$</label>
          <label class="option"><input type="radio" name="mt5e2" value="wrong"> $y = -2x + K$</label>
          <label class="option"><input type="radio" name="mt5e2" value="wrong"> $y = K\\cos(2x)$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt5e2','mt5fb2','Correct — pour y\\'=ay, la solution est toujours y=Ke^(ax), ici a=−2.','Sépare les variables : dy/y = −2dx, puis intègre : ln|y| = −2x + C.')">Vérifier</button>
        <div class="feedback" id="mt5fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $y'' + 4y = 0$, l'équation caractéristique est $r^2+4=0$, donc Δ &lt; 0. Quelle forme a la solution ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt5e3" value="wrong"> $y = K_1e^{2x}+K_2e^{-2x}$</label>
          <label class="option"><input type="radio" name="mt5e3" value="right"> $y = K_1\\cos(2x)+K_2\\sin(2x)$</label>
          <label class="option"><input type="radio" name="mt5e3" value="wrong"> $y = (K_1+K_2x)e^{2x}$</label>
          <label class="option"><input type="radio" name="mt5e3" value="wrong"> $y = K_1x^2+K_2x$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt5e3','mt5fb3','Correct — Δ<0 donne des racines complexes ±2i, donc une solution oscillante en cos(2x) et sin(2x).','Δ<0 correspond toujours à des oscillations : y = e^(αx)(K1cos(βx)+K2sin(βx)), avec ici α=0 et β=2.')">Vérifier</button>
        <div class="feedback" id="mt5fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Un amortisseur de porte doit ramener la porte à sa position fermée le plus vite possible, sans qu'elle claque ni qu'elle oscille avant de se stabiliser. En te basant sur les trois régimes du tableau de la section 4, propose une démarche pour choisir les caractéristiques mécaniques de l'amortisseur (qui déterminent les coefficients de l'équation différentielle). Quel régime viserais-tu, et pourquoi les deux autres sont-ils inadaptés ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : un régime avec Δ&lt;0 oscille (la porte claque en va-et-vient), un régime avec Δ&gt;0 très amorti met du temps à se refermer complètement — quel régime reste ?</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on ne connaissait pas les conditions initiales d'un système physique décrit par une équation différentielle : peut-on encore dire quelque chose d'utile sur son évolution future ?</li>
        <li>Pourquoi une équation différentielle non linéaire (comme celle du pendule à grand angle) peut-elle donner naissance au chaos, alors qu'aucune des équations linéaires de ce chapitre ne le peut jamais ?</li>
        <li>Quelle serait la conséquence, pour la sécurité d'un pont, d'une modélisation qui négligerait le terme d'amortissement dans l'équation différentielle décrivant ses vibrations ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>I. Newton, <em>Philosophiæ Naturalis Principia Mathematica</em>, 1687 — contexte historique de l'invention du calcul différentiel appliqué à la physique.</li>
        <li>J.-P. Pérez, <em>Mécanique — Fondements et applications</em>, Dunod (annexe sur la résolution des équations différentielles usuelles en physique).</li>
        <li>E. N. Lorenz, « Deterministic Nonperiodic Flow », <em>Journal of the Atmospheric Sciences</em>, 1963 — article fondateur de la théorie du chaos déterministe.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes maintenant des méthodes de résolution qui reviendront dans presque tous les chapitres de physique à venir : oscillateurs, circuits, désintégration radioactive. Le dernier chapitre de cette matière, « Notion de torseurs », t'offre un outil plus géométrique, essentiel pour la mécanique des solides. Comme le disait Lorenz en résumant sa découverte du chaos : « Le battement d'ailes d'un papillon au Brésil peut-il déclencher une tornade au Texas ? » Tu sais maintenant pourquoi cette question a un sens mathématique précis.</p>
  `,
  init: initOdeSim
};

MATH_TOOLS_NOVA_KB[mtKey('Équations différentielles')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Équations différentielles ». Demande-moi la différence entre ordre et linéarité, comment résoudre un cas précis, ou un indice sur un exercice.",
  rules: [
    { test:/ordre/i, replies:["L'ordre d'une équation différentielle est celui de la plus haute dérivée qui y figure : y' seul → ordre 1, y'' présent → ordre 2, etc."] },
    { test:/lin[ée]aire/i, replies:["Une équation est linéaire si y et ses dérivées n'apparaissent qu'à la puissance 1 — pas de y², pas de produit y·y', pas de sin(y)."] },
    { test:/variables s[ée]parables|s[ée]parer/i, replies:["Une équation à variables séparables se réécrit g(y)dy = h(x)dx, puis s'intègre membre à membre. C'est la méthode la plus simple du premier ordre."] },
    { test:/caract[ée]ristique/i, replies:["Pour ay''+by'+cy=0, on cherche des solutions e^(rx), ce qui donne l'équation caractéristique ar²+br+c=0 — exactement une équation du second degré classique."] },
    { test:/delta|discriminant/i, replies:["Le signe de Δ de l'équation caractéristique fixe la forme de la solution : Δ>0 → deux exponentielles réelles, Δ=0 → régime critique, Δ<0 → oscillations (via les racines complexes)."] },
    { test:/homog[èe]ne|particuli[èe]re/i, replies:["La solution générale d'une équation linéaire avec second membre est toujours solution homogène + solution particulière : y = y_h + y_p."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repère la plus haute dérivée présente dans l'équation.","Indice niveau 2 : il y a y'' dans l'équation.","Indice niveau 3 : l'ordre est donc 2."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : sépare les variables dans y' = −2y.","Indice niveau 2 : dy/y = −2dx, puis intègre les deux membres.","Indice niveau 3 : ln|y| = −2x + C, donc y = Ke^(−2x)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : Δ<0 correspond toujours à une forme oscillante.","Indice niveau 2 : les racines sont ±2i, donc α=0 et β=2.","Indice niveau 3 : y = K1cos(2x) + K2sin(2x)."] }
  ]
};

/* =========================== CHAPITRE 6 =========================== */
MATH_TOOLS_CHAPTERS[mtKey('Notion de torseurs')] = {
  objectives: [
    "Définir un torseur par sa résultante et son champ de moments",
    "Utiliser la formule de transport du moment d'un point à un autre",
    "Distinguer glisseur, couple et torseur quelconque à partir des invariants",
    "Reconnaître pourquoi cet outil unifie l'écriture de la mécanique (forces, vitesses)",
    "Évaluer, pour un système de forces donné, s'il se réduit à un glisseur, un couple pur, ou un torseur quelconque à partir du calcul de l'automoment"
  ],
  prereqs: ["Calcul vectoriel et systèmes de coordonnées"],
  bodyHtml: `
    <p>Pousser une porte près de ses gonds ou loin d'eux demande un effort très différent, alors que la force appliquée peut être rigoureusement identique dans les deux cas. Cette observation banale cache une vérité profonde : décrire complètement l'effet d'une force sur un solide exige plus qu'un simple vecteur — il faut aussi savoir <em>où</em> elle s'applique et comment elle tend à faire tourner l'objet. C'est précisément le problème que résout la notion de torseur, développée au XIXe siècle dans le prolongement des travaux de Poinsot sur la statique.</p>
    <p>Cet outil dépasse largement la seule mécanique du solide rigide : la robotique industrielle l'utilise pour caractériser les efforts appliqués par une pince robotisée, la biomécanique pour analyser les forces sur une articulation, et la conception de véhicules pour étudier la répartition des charges sur un châssis.</p>
    <p>Ce dernier chapitre de la matière te donne un outil unificateur remarquable : un même formalisme mathématique — le torseur — décrit à la fois les forces appliquées à un solide et les vitesses de tous ses points, une élégance qui simplifiera considérablement tes futurs cours de mécanique du solide.</p>

    <h3>1. Définition</h3>
    <p>Un torseur $[\\mathcal{T}]$ est entièrement défini par deux éléments : sa <strong>résultante</strong> $\\vec{R}$ (un vecteur, le même en tout point) et son <strong>moment</strong> $\\overrightarrow{\\mathcal{M}_A}$ en un point $A$ donné (qui, lui, dépend du point choisi). On note :</p>
    <div class="formula-box">$$[\\mathcal{T}]_A = \\left\\{ \\vec{R},\\ \\overrightarrow{\\mathcal{M}_A} \\right\\}$$</div>
    <p>Pour un système de forces $\\vec{F_i}$ appliquées en des points $A_i$ : $\\vec{R} = \\sum_i \\vec{F_i}$ et $\\overrightarrow{\\mathcal{M}_A} = \\sum_i \\overrightarrow{AA_i}\\wedge\\vec{F_i}$.</p>

    <h3>2. La formule de transport — changer de point de calcul</h3>
    <p>Le moment dépend du point où on le calcule, mais pas n'importe comment : connaissant $\\overrightarrow{\\mathcal{M}_A}$, on obtient le moment en un autre point $C$ par la <strong>formule de transport</strong> (ou de Varignon) :</p>
    <div class="formula-box">$$\\overrightarrow{\\mathcal{M}_C} = \\overrightarrow{\\mathcal{M}_A} + \\overrightarrow{CA}\\wedge\\vec{R}$$</div>
    <p>Cette formule évite de recalculer la somme complète à chaque nouveau point : elle relie directement deux moments déjà connus.</p>
    <div class="key-point">
      <span class="eyebrow">Équiprojectivité</span>
      Conséquence directe de la formule de transport : pour deux points $A$ et $C$ quelconques, $\\overrightarrow{\\mathcal{M}_A}\\cdot\\overrightarrow{AC} = \\overrightarrow{\\mathcal{M}_C}\\cdot\\overrightarrow{AC}$ — les projections des deux moments sur la droite $(AC)$ sont toujours égales. C'est la propriété qui caractérise un champ de moments de torseur.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le moment d'un torseur change quand on change de point de calcul, mais l'équiprojectivité impose une contrainte forte sur cette variation. Pourquoi ne peut-on pas choisir n'importe quel champ de vecteurs $A\\mapsto\\vec f(A)$ et l'appeler « champ de moments d'un torseur » ?
    </div>

    <h3>3. Les invariants — ce qui ne change jamais</h3>
    <p>Deux quantités restent identiques quel que soit le point choisi pour le torseur :</p>
    <table class="mini-table">
      <tr><th>Invariant</th><th>Définition</th><th>Signification</th></tr>
      <tr><td>Invariant vectoriel</td><td>$\\vec{R}$</td><td>La résultante ne dépend d'aucun point — c'est déjà un invariant par construction</td></tr>
      <tr><td>Invariant scalaire (automoment)</td><td>$I = \\vec{R}\\cdot\\overrightarrow{\\mathcal{M}_A}$</td><td>Ce produit scalaire est le même quel que soit $A$ (vérifiable directement avec la formule de transport)</td></tr>
    </table>

    <h3>3bis. Axe central et pas du torseur</h3>
    <p>Quand la résultante $\\vec{R}$ n'est pas nulle, on appelle <strong>axe central</strong> du torseur l'ensemble des points $P$ où le moment est parallèle à la résultante : $\\overrightarrow{\\mathcal{M}_P} = \\lambda\\vec{R}$. On montre que cet axe est parallèle à $\\vec{R}$, et qu'il passe par le point $P_0$ défini par :</p>
    <div class="formula-box">$$\\overrightarrow{OP_0} = \\frac{\\vec{R}\\wedge\\overrightarrow{\\mathcal{M}_O}}{\\vec{R}^2}$$</div>
    <p>C'est aussi, parmi tous les points de l'espace, le lieu où le module du moment $\\|\\overrightarrow{\\mathcal{M}_P}\\|$ est <strong>minimum</strong>.</p>
    <div class="key-point">
      <span class="eyebrow">Pas du torseur</span>
      Le scalaire $\\lambda$ tel que $\\overrightarrow{\\mathcal{M}_P}=\\lambda\\vec{R}$ pour tout point $P$ de l'axe central est appelé le <strong>pas du torseur</strong>. Il se calcule directement à partir de l'invariant scalaire : $\\lambda = \\dfrac{I}{\\vec{R}^2} = \\dfrac{\\vec{R}\\cdot\\overrightarrow{\\mathcal{M}_P}}{\\vec{R}^2}$ — un torseur de pas nul est justement un <strong>glisseur</strong> (voir ci-dessous).
    </div>

    <h3>4. Les torseurs particuliers</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Condition</th><th>Interprétation</th></tr>
      <tr><td><strong>Glisseur</strong></td><td>$\\vec{R}\\neq\\vec{0}$ et $I=0$</td><td>Il existe un point où le moment s'annule totalement — le torseur se réduit à un unique vecteur glissant sur une droite, son <em>axe central</em></td></tr>
      <tr><td><strong>Couple</strong></td><td>$\\vec{R}=\\vec{0}$ et $\\overrightarrow{\\mathcal{M}_A}\\neq\\vec{0}$</td><td>Le moment est alors le même en tout point (par la formule de transport, si R=0 le terme supplémentaire disparaît) — un couple pur, qui ne fait que faire tourner sans translater</td></tr>
      <tr><td>Torseur quelconque</td><td>$\\vec{R}\\neq\\vec{0}$ et $I\\neq0$</td><td>Ne se réduit ni à un simple vecteur ni à un couple pur</td></tr>
    </table>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 90" width="100%">
          <line x1="20" y1="70" x2="100" y2="70" stroke="#5A6472" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="45" y1="70" x2="80" y2="30" stroke="#4C7CFF" stroke-width="2.4" marker-end="url(#glArr)"/>
          <circle cx="45" cy="70" r="2.5" fill="#F0B94D"/>
          <defs><marker id="glArr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#4C7CFF"/></marker></defs>
        </svg>
        <span><strong>Glisseur</strong> : un vecteur sur son axe central</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 120 90" width="100%">
          <line x1="30" y1="60" x2="70" y2="60" stroke="#2DD4C4" stroke-width="2.2" marker-end="url(#cpArr1)"/>
          <line x1="90" y1="30" x2="50" y2="30" stroke="#FF6B6F" stroke-width="2.2" marker-end="url(#cpArr2)"/>
          <line x1="50" y1="30" x2="30" y2="60" stroke="#5A6472" stroke-width="1" stroke-dasharray="2,2"/>
          <defs>
            <marker id="cpArr1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker>
            <marker id="cpArr2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#FF6B6F"/></marker>
          </defs>
        </svg>
        <span><strong>Couple</strong> : deux forces opposées, résultante nulle</span>
      </div>
    </div>

    <h3>5. Pourquoi les torseurs sont si utiles</h3>
    <p>Le grand intérêt du torseur, c'est qu'il obéit aux mêmes règles (somme, multiplication par un scalaire) qu'un simple vecteur, tout en portant une information complète sur un système de forces — plus besoin de manipuler séparément résultante et moment. Le même formalisme décrit aussi bien le <strong>torseur des forces</strong> appliquées à un solide que le <strong>torseur cinématique</strong> (vitesses) d'un solide en mouvement, ce qui unifie l'écriture de toute la mécanique du solide.</p>

    <h3>6. Moment d'un glisseur et décomposition d'un couple</h3>
    <p>Pour un <strong>glisseur</strong> dont le moment s'annule en un point $A$, le moment en un point quelconque $P$ se déduit directement de la formule de transport : $\\overrightarrow{\\mathcal{M}_P} = \\overrightarrow{PA}\\wedge\\vec{R}$. L'ensemble des points où le moment s'annule forme une droite parallèle à $\\vec{R}$ passant par $A$ : c'est l'<strong>axe du glisseur</strong>.</p>
    <p>Réciproquement, un <strong>torseur couple</strong> $[\\mathcal{T}_C]=\\{\\vec{0},\\ \\vec{\\mathcal{M}}\\}$ peut toujours se décomposer en la somme de deux glisseurs opposés $[\\mathcal{T}_1]+[\\mathcal{T}_2]$, de résultantes $\\vec{R}_1=-\\vec{R}_2$, dont les axes parallèles sont séparés par une distance choisie de sorte que $\\vec{\\mathcal{M}}=\\vec{R}_1\\wedge\\overrightarrow{P_1P_2}$. Il existe une infinité de décompositions possibles, mais on en fixe une en choisissant librement $\\vec{R}_1$ et l'axe $(\\Delta_1)$ du premier glisseur — l'axe du second s'en déduit alors de façon unique.</p>

    <h3>7. Tableau récapitulatif des types de torseurs</h3>
    <table class="mini-table">
      <tr><th>Éléments de réduction en A</th><th>Construction minimale équivalente</th><th>Type</th></tr>
      <tr><td>$\\vec{R}\\neq\\vec{0}$ et $\\vec{R}\\cdot\\overrightarrow{\\mathcal{M}_A}=0$</td><td>Un seul vecteur lié (sur l'axe central)</td><td>Glisseur</td></tr>
      <tr><td>$\\vec{R}=\\vec{0}$ et $\\overrightarrow{\\mathcal{M}_A}\\neq\\vec{0}$</td><td>Deux vecteurs liés opposés formant un couple</td><td>Couple</td></tr>
      <tr><td>$\\vec{R}\\cdot\\overrightarrow{\\mathcal{M}_A}\\neq 0$</td><td>Un vecteur lié + un couple</td><td>Quelconque</td></tr>
      <tr><td>$\\vec{R}=\\vec{0}$ et $\\overrightarrow{\\mathcal{M}_A}=\\vec{0}$</td><td>Rien (tout est nul)</td><td>Torseur nul</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un système de deux forces égales et opposées, non alignées (donc un couple), a une résultante nulle. Peut-on pour autant dire que ce système « n'a aucun effet » sur le solide ? Repense à ce qui se passe physiquement quand tu fais tourner un volant avec les deux mains.
    </div>

    <h3>8. Frontière de la recherche — des torseurs à la robotique des humanoïdes</h3>
    <p>La notion de « torseur des efforts extérieurs » est aujourd'hui centrale dans le contrôle des robots humanoïdes bipèdes : pour rester en équilibre en marchant, un robot doit en permanence calculer et contrôler le torseur des forces de contact au sol, en s'assurant que son axe central (le fameux « point de pression au sol ») reste dans une zone de stabilité — une extension directe et très active des notions de ce chapitre à la robotique de pointe.</p>
    <p><strong>Question ouverte :</strong> les torseurs classiques décrivent des solides rigides. Pour des structures déformables (un robot souple, un pont qui fléchit, un tissu vivant), le concept doit être généralisé à des champs continus de contraintes — un domaine actif de recherche en mécanique des milieux continus et en biomécanique computationnelle.</p>
    <p><strong>Technologie émergente :</strong> les capteurs « torseur d'effort » (force/torque sensors) placés au poignet des bras robotiques industriels mesurent en temps réel la résultante et le moment complet des efforts de contact — permettant à un robot d'assemblage ou chirurgical de « sentir » la force qu'il exerce, exactement au sens mathématique de ce chapitre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Système de forces → torseur $\\{\\vec R,\\ \\vec{\\mathcal M}_A\\}$ → invariant $I=\\vec R\\cdot\\vec{\\mathcal M}_A$ → glisseur (I=0) / couple (R=0) / torseur quelconque
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\overrightarrow{\\mathcal{M}_C} = \\overrightarrow{\\mathcal{M}_A} + \\overrightarrow{CA}\\wedge\\vec{R}$$
      La formule de transport — elle seule permet de passer d'un point de calcul à un autre sans tout recommencer, et structure toute la théorie des torseurs.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un torseur = résultante $\\vec{R}$ (fixe) + moment $\\overrightarrow{\\mathcal{M}_A}$ (qui dépend du point A)</li>
        <li>Formule de transport : $\\overrightarrow{\\mathcal{M}_C} = \\overrightarrow{\\mathcal{M}_A} + \\overrightarrow{CA}\\wedge\\vec{R}$</li>
        <li>L'automoment $\\vec{R}\\cdot\\overrightarrow{\\mathcal{M}_A}$ est un invariant : il ne dépend pas du point choisi</li>
        <li>Glisseur : automoment nul ; Couple : résultante nulle ; sinon, torseur quelconque</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que la résultante ne change jamais de point, contrairement au moment</li>
        <li>Se tromper d'ordre dans le produit vectoriel de la formule de transport ($\\overrightarrow{CA}\\wedge\\vec{R}$, pas $\\overrightarrow{AC}\\wedge\\vec{R}$)</li>
        <li>Croire qu'un couple n'a aucun effet — il a un effet purement rotatif, sans translation</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — moment d'une force et glisseur</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Déplace le point d'application A et fais varier la force : observe que le moment ne change pas quand A glisse le long de la droite d'action de la force (bouton dédié).</p>
      <div class="sim-2col">
        <svg viewBox="0 0 200 180" width="220" height="200">
          <line x1="20" y1="150" x2="180" y2="150" stroke="#3A4658" stroke-width="1"/>
          <line x1="100" y1="170" x2="100" y2="10" stroke="#3A4658" stroke-width="1"/>
          <circle id="mO" cx="100" cy="110" r="3" fill="#EAF0FB"/>
          <line id="mOA" x1="100" y1="110" x2="100" y2="110" stroke="#5A6472" stroke-width="1.4" stroke-dasharray="2,2"/>
          <circle id="mA" cx="100" cy="110" r="3.4" fill="#F0B94D"/>
          <line id="mForce" x1="100" y1="110" x2="100" y2="110" stroke="#FF6B6F" stroke-width="2.4" marker-end="url(#mArr)"/>
          <defs><marker id="mArr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#FF6B6F"/></marker></defs>
        </svg>
        <div class="sim-controls">
          <label>A — x : <span id="mAxVal">3</span></label><input type="range" id="mAx" min="-6" max="6" step="0.5" value="3" oninput="updateMomentSim()">
          <label>A — y : <span id="mAyVal">1</span></label><input type="range" id="mAy" min="-6" max="6" step="0.5" value="1" oninput="updateMomentSim()">
          <label>F — x : <span id="mFxVal">1</span></label><input type="range" id="mFx" min="-6" max="6" step="0.5" value="1" oninput="updateMomentSim()">
          <label>F — y : <span id="mFyVal">3</span></label><input type="range" id="mFy" min="-6" max="6" step="0.5" value="3" oninput="updateMomentSim()">
          <button class="btn btn-ghost" style="margin-top:10px;" onclick="slideAlongForce()">Glisser A le long du support →</button>
          <div class="sim-readout" id="momentReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Débutant — application directe</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un torseur a une résultante $\\vec{R} = \\vec{0}$ mais un moment non nul en tout point. Comment s'appelle-t-il ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt6e1" value="right"> Un couple</label>
          <label class="option"><input type="radio" name="mt6e1" value="wrong"> Un glisseur</label>
          <label class="option"><input type="radio" name="mt6e1" value="wrong"> Un torseur nul</label>
          <label class="option"><input type="radio" name="mt6e1" value="wrong"> Un torseur quelconque</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt6e1','mt6fb1','Correct — résultante nulle et moment non nul définit exactement un couple.','Relis la définition : résultante nulle + moment non nul, c\\'est la définition même d\\'un couple.')">Vérifier</button>
        <div class="feedback" id="mt6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour un glisseur, quelle est la valeur de l'automoment $I = \\vec{R}\\cdot\\overrightarrow{\\mathcal{M}_A}$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt6e2" value="wrong"> Toujours strictement positif</label>
          <label class="option"><input type="radio" name="mt6e2" value="right"> Toujours nul</label>
          <label class="option"><input type="radio" name="mt6e2" value="wrong"> Égal à ‖R‖²</label>
          <label class="option"><input type="radio" name="mt6e2" value="wrong"> Cela dépend du point A choisi</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt6e2','mt6fb2','Correct — I=0 est justement la condition qui définit un glisseur (et I est un invariant, donc cette valeur ne dépend jamais du point A).','I = R·M_A est un invariant : il ne dépend pas de A. Un glisseur est défini précisément par I = 0.')">Vérifier</button>
        <div class="feedback" id="mt6fb2"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Intermédiaire — plusieurs étapes, à justifier</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Si on fait glisser le point d'application d'une force le long de sa droite d'action, que devient son moment par rapport à un point fixe O ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mt6e3" value="wrong"> Il double</label>
          <label class="option"><input type="radio" name="mt6e3" value="wrong"> Il s'annule</label>
          <label class="option"><input type="radio" name="mt6e3" value="right"> Il ne change pas</label>
          <label class="option"><input type="radio" name="mt6e3" value="wrong"> Il change de signe</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mt6e3','mt6fb3','Correct — c\\'est exactement ce que montre le simulateur : le moment d\\'un vecteur glissant ne dépend pas du point précis sur sa droite d\\'action.','Un vecteur glissant garde le même moment partout sur sa droite d\\'action — c\\'est ce qui définit justement un vecteur \\'glissant\\'.')">Vérifier</button>
        <div class="feedback" id="mt6fb3"></div>
      </div>
      <p style="color:var(--ink-soft); font-size:0.85rem; margin:18px 0 10px; text-transform:uppercase; letter-spacing:.04em;">Niveau Avancé — problème ouvert</p>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même</span>
        <p class="q">Un opérateur pousse une porte lourde en un point A avec une force perpendiculaire au plan de la porte. Une seconde personne pousse simultanément près des gonds, avec une force égale et opposée à la précédente (même droite d'action parallèle, sens contraire). Propose une démarche pour caractériser le torseur résultant de ces deux forces (résultante et automoment), et détermine de quel type de torseur il s'agit. Qu'observerais-tu physiquement sur la porte ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : deux forces égales, opposées, non alignées — reconnais-tu la définition donnée en section 4 ?</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'espace n'avait que deux dimensions au lieu de trois : la notion de moment (qui utilise le produit vectoriel) aurait-elle encore un sens sous la même forme ?</li>
        <li>Pourquoi le même formalisme de torseur permet-il de décrire aussi bien un système de forces (statique) qu'un champ de vitesses d'un solide en rotation (cinématique) — deux situations physiques a priori très différentes ?</li>
        <li>Quelle serait la conséquence, pour la stabilité d'un robot bipède, d'un contrôleur qui ignorerait le moment des forces de contact au sol et ne surveillerait que leur résultante ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>L. Poinsot, <em>Éléments de statique</em>, 1803 — ouvrage fondateur de la théorie des torseurs (sous le nom de « systèmes de vecteurs »).</li>
        <li>J.-P. Pérez, <em>Mécanique — Fondements et applications</em>, Dunod (chapitre sur la statique et la dynamique du solide, torseurs des forces et cinématique).</li>
        <li>B. Siciliano, L. Sciavicco, L. Villani, O. Khatib, <em>Robotics: Modelling, Planning and Control</em>, Springer — application moderne des torseurs à la robotique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Te voilà arrivé au bout des « Outils mathématiques pour la physique » — six chapitres qui te suivront dans absolument toutes tes études de physique à venir : incertitudes, vecteurs, opérateurs différentiels, complexes, équations différentielles, torseurs. Comme le disait Galilée, en un mot qui résume tout ce module : « La nature est écrite en langage mathématique. » Tu en maîtrises maintenant l'alphabet.</p>
  `,
  init: initMomentSim
};

MATH_TOOLS_NOVA_KB[mtKey('Notion de torseurs')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Notion de torseurs ». Demande-moi ce qu'est un torseur, la formule de transport, ou un indice sur un exercice.",
  rules: [
    { test:/transport|varignon/i, replies:["La formule de transport M_C = M_A + CA∧R permet de calculer le moment en un nouveau point C à partir du moment déjà connu en A, sans tout recalculer."] },
    { test:/glisseur/i, replies:["Un glisseur a une résultante non nulle mais un automoment nul (R·M_A = 0) : il existe alors un point où le moment s'annule complètement, et le torseur se réduit à un simple vecteur glissant sur son axe central."] },
    { test:/couple/i, replies:["Un couple a une résultante nulle mais un moment non nul, identique en tout point. C'est l'effet de deux forces opposées qui ne se compensent pas en rotation — pense à faire tourner un volant."] },
    { test:/invariant|automoment/i, replies:["L'automoment I = R·M_A est un invariant : sa valeur ne dépend jamais du point A choisi pour le calculer, contrairement au moment seul."] },
    { test:/[ée]quiprojectivit[ée]/i, replies:["L'équiprojectivité dit que les projections de M_A et M_C sur la droite (AC) sont toujours égales — une conséquence directe de la formule de transport."] },
    { test:/torseur/i, replies:["Un torseur regroupe deux informations en un seul objet : une résultante R (un vecteur fixe) et un moment M_A (qui dépend du point A). C'est l'outil de base de toute la mécanique du solide."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repense à quelle condition (sur R et le moment) définit chaque type de torseur.","Indice niveau 2 : ici R=0 et le moment n'est pas nul.","Indice niveau 3 : c'est la définition d'un couple."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : l'automoment est un invariant — repense à sa valeur pour un glisseur en particulier.","Indice niveau 2 : un glisseur est défini par I = 0, exactement.","Indice niveau 3 : la réponse est donc \\'toujours nul\\'."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : utilise le simulateur ci-dessous et observe ce qui se passe quand tu glisses A le long du support.","Indice niveau 2 : le moment d'un vecteur ne dépend que de sa droite d'action, pas du point précis dessus.","Indice niveau 3 : le moment ne change pas."] }
  ]
};

/* fusionne tout le contenu Nova de ce cours dans la base de connaissances globale */
Object.assign(NOVA_KB, MATH_TOOLS_NOVA_KB);