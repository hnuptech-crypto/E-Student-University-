/* =====================================================================
   CHUNK « thermo » — registre THERMO_CHAPTERS / THERMO_NOVA_KB
   Matière(s) : Chimie|Thermochimie et équilibres chimiques
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   THERMO_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */




/* ===================================================================================
   COURS "THERMOCHIMIE ET ÉQUILIBRES CHIMIQUES" — contenu rédigé + simulations
   Source : polycopié FAST/UAC "Thermodynamique chimique — équilibres chimiques et
   ioniques" (Dr Alice Kpota Houngue & Dr Chabi D. Rodrigue, 2020-2021), réécrit et
   simplifié, illustré, avec simulations là où elles aident vraiment à comprendre.
=================================================================================== */

const THERMO_MATIERE = 'Thermochimie et équilibres chimiques';
function thKey(chapterTitle){ return `Chimie|${THERMO_MATIERE}|${chapterTitle}`; }
const THERMO_CHAPTERS = {};
const THERMO_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   SIMULATION 1 — Travail P-V : réversible vs irréversible (Chapitre 1)
--------------------------------------------------------------------------------- */
function updatePVSim(){
  const P1 = parseFloat(document.getElementById('pvP1').value);
  const V1 = parseFloat(document.getElementById('pvV1').value);
  const V2 = parseFloat(document.getElementById('pvV2').value);
  document.getElementById('pvP1Val').textContent = P1.toFixed(1);
  document.getElementById('pvV1Val').textContent = V1.toFixed(1);
  document.getElementById('pvV2Val').textContent = V2.toFixed(1);
  const n_RT = P1 * V1; // = nRT, constant en isotherme
  const P2 = n_RT / V2;
  document.getElementById('pvP2Val').textContent = P2.toFixed(2);

  const x0 = 20, y0 = 150, xScale = 12, yScale = 4.2;
  const toSvg = (V,P) => [x0 + V*xScale, y0 - P*yScale];

  // courbe réversible (isotherme, PV=cste) entre V1 et V2
  const N = 40; let dRev = '';
  for(let i=0;i<=N;i++){
    const V = V1 + (V2-V1)*i/N;
    const P = n_RT / V;
    const [x,y] = toSvg(V,P);
    dRev += (i===0?'M':'L') + x.toFixed(1)+','+y.toFixed(1)+' ';
  }
  document.getElementById('pvCurve').setAttribute('d', dRev);

  // aire réversible (sous la courbe, entre V1 et V2)
  let areaRev = '';
  const [x1,y1] = toSvg(V1, n_RT/V1);
  areaRev += 'M'+x1.toFixed(1)+','+y0.toFixed(1)+' ';
  for(let i=0;i<=N;i++){
    const V = V1 + (V2-V1)*i/N;
    const P = n_RT / V;
    const [x,y] = toSvg(V,P);
    areaRev += 'L'+x.toFixed(1)+','+y.toFixed(1)+' ';
  }
  const [x2,] = toSvg(V2, 0);
  areaRev += 'L'+x2.toFixed(1)+','+y0.toFixed(1)+' Z';
  document.getElementById('pvAreaRev').setAttribute('d', areaRev);

  // aire irréversible : rectangle sous P2 constant entre V1 et V2 (détente contre P externe = P2)
  const [xa,ya] = toSvg(V1, P2);
  const [xb,] = toSvg(V2, P2);
  const areaIrrev = `M${xa.toFixed(1)},${y0} L${xa.toFixed(1)},${ya.toFixed(1)} L${xb.toFixed(1)},${ya.toFixed(1)} L${xb.toFixed(1)},${y0} Z`;
  document.getElementById('pvAreaIrrev').setAttribute('d', areaIrrev);

  const Wrev = -n_RT * Math.log(V2/V1);
  const Wirrev = -P2 * (V2 - V1);
  document.getElementById('pvReadout').innerHTML =
    `nRT = P₁V₁ = ${n_RT.toFixed(2)} (unités arbitraires) — P₂ = ${P2.toFixed(2)}<br>` +
    `<span style="color:#2DD4C4;">Travail réversible</span> W = −nRT·ln(V₂/V₁) = <strong>${Wrev.toFixed(2)}</strong><br>` +
    `<span style="color:#FF6B6F;">Travail irréversible</span> (détente brutale contre P₂) W = −P₂(V₂−V₁) = <strong>${Wirrev.toFixed(2)}</strong><br>` +
    `${V2>V1 ? 'Détente : le système fournit moins de travail en irréversible qu\'en réversible.' : 'Compression : le système reçoit plus de travail en irréversible qu\'en réversible.'}`;
}
function initPVSim(){ updatePVSim(); }

/* ---------------------------------------------------------------------------------
   SIMULATION 2 — Calorimétrie : température d'équilibre (Chapitre 2)
--------------------------------------------------------------------------------- */
function updateCaloSim(){
  const m1 = parseFloat(document.getElementById('caM1').value);
  const c1 = parseFloat(document.getElementById('caC1').value);
  const t1 = parseFloat(document.getElementById('caT1').value);
  const m2 = parseFloat(document.getElementById('caM2').value);
  const c2 = parseFloat(document.getElementById('caC2').value);
  const t2 = parseFloat(document.getElementById('caT2').value);
  const te = (m1*c1*t1 + m2*c2*t2) / (m1*c1 + m2*c2);
  const q1 = m1*c1*(te-t1), q2 = m2*c2*(te-t2);
  document.getElementById('caloReadout').innerHTML =
    `Bilan : m₁c₁(tₑ−t₁) + m₂c₂(tₑ−t₂) = 0<br>` +
    `Température d'équilibre <strong>tₑ = ${te.toFixed(2)} °C</strong><br>` +
    `Chaleur reçue par le corps 1 : Q₁ = ${q1.toFixed(1)} (${q1>=0?'gagnée':'perdue'})<br>` +
    `Chaleur reçue par le corps 2 : Q₂ = ${q2.toFixed(1)} (${q2>=0?'gagnée':'perdue'}) — Q₁+Q₂ ≈ 0, comme attendu.`;
}
function initCaloSim(){ updateCaloSim(); }

/* Calculateur d'enthalpie de réaction par loi de Hess (2 réactifs, 2 produits) */
function updateHessCalc(){
  const hr1 = parseFloat(document.getElementById('hReact1H').value) || 0;
  const nr1 = parseFloat(document.getElementById('hReact1N').value) || 0;
  const hr2 = parseFloat(document.getElementById('hReact2H').value) || 0;
  const nr2 = parseFloat(document.getElementById('hReact2N').value) || 0;
  const hp1 = parseFloat(document.getElementById('hProd1H').value) || 0;
  const np1 = parseFloat(document.getElementById('hProd1N').value) || 0;
  const hp2 = parseFloat(document.getElementById('hProd2H').value) || 0;
  const np2 = parseFloat(document.getElementById('hProd2N').value) || 0;
  const deltaH = (np1*hp1 + np2*hp2) - (nr1*hr1 + nr2*hr2);
  document.getElementById('hessReadout').innerHTML =
    `ΔHR = ΣΔHf(produits) − ΣΔHf(réactifs)<br>` +
    `= [${np1}×${hp1} + ${np2}×${hp2}] − [${nr1}×${hr1} + ${nr2}×${hr2}]<br>` +
    `<strong>ΔHR = ${deltaH.toFixed(2)}</strong> (mêmes unités que les ΔHf saisis) — réaction ${deltaH<0?'exothermique':'endothermique'}`;
}

/* ---------------------------------------------------------------------------------
   SIMULATION 3 — Spontanéité : ΔG = ΔH − TΔS (Chapitre 3)
--------------------------------------------------------------------------------- */
function updateGibbsSim(){
  const dH = parseFloat(document.getElementById('gH').value);
  const dS = parseFloat(document.getElementById('gS').value);
  const T = parseFloat(document.getElementById('gT').value);
  document.getElementById('gHVal').textContent = dH.toFixed(0);
  document.getElementById('gSVal').textContent = dS.toFixed(0);
  document.getElementById('gTVal').textContent = T.toFixed(0);
  const dG = dH - (T * dS/1000); // dH en kJ, dS en J/K -> conversion
  const spontane = dG < 0;
  let tInversion = null;
  if(dS !== 0){ tInversion = (dH*1000) / dS; }
  document.getElementById('gibbsReadout').innerHTML =
    `ΔG = ΔH − TΔS = ${dH.toFixed(1)} − ${T.toFixed(0)}×${(dS/1000).toFixed(4)} = <strong>${dG.toFixed(2)} kJ</strong><br>` +
    `→ Réaction ${spontane ? '<span style="color:#2DD4C4;">spontanée</span> (ΔG<0)' : '<span style="color:#FF6B6F;">non spontanée</span> (ΔG>0) à cette température'}<br>` +
    (tInversion !== null && tInversion > 0 ? `Le signe de ΔG s'inverse vers T ≈ ${tInversion.toFixed(0)} K (ΔH et ΔS de signes opposés).` : `ΔH et ΔS ont le même signe : le signe de ΔG ne change jamais avec T.`);
}
function initGibbsSim(){ updateGibbsSim(); }

/* ---------------------------------------------------------------------------------
   SIMULATION 4 — Kc ↔ Kp et déplacement de Le Chatelier (Chapitre 5)
--------------------------------------------------------------------------------- */
function updateKcKpSim(){
  const Kc = parseFloat(document.getElementById('kcVal').value);
  const T = parseFloat(document.getElementById('kcT').value);
  const dv = parseFloat(document.getElementById('kcDv').value);
  const R = 0.082;
  const Kp = Kc * Math.pow(R*T, dv);
  document.getElementById('kcTVal').textContent = T.toFixed(0);
  document.getElementById('kcDvVal').textContent = dv.toFixed(0);
  document.getElementById('kckpReadout').innerHTML =
    `Kp = Kc·(RT)^Δν = ${Kc}×(${R}×${T})^${dv} = <strong>${Kp.toFixed(4)}</strong>`;
}
function updateChatelier(){
  const exo = document.getElementById('chExo').value;
  const dvSign = document.getElementById('chDv').value;
  const perturb = document.getElementById('chPerturb').value;
  let response = '';
  if(perturb === 'temp_up'){
    response = exo === 'exo'
      ? "Augmenter T défavorise le sens exothermique : l'équilibre se déplace dans le sens endothermique (vers les réactifs si la réaction directe est exothermique)."
      : "Augmenter T favorise le sens endothermique : l'équilibre se déplace dans le sens direct (vers les produits, puisque la réaction directe est endothermique).";
  } else if(perturb === 'temp_down'){
    response = exo === 'exo'
      ? "Diminuer T favorise le sens exothermique : l'équilibre se déplace vers les produits (sens direct, exothermique)."
      : "Diminuer T défavorise le sens endothermique : l'équilibre se déplace vers les réactifs.";
  } else if(perturb === 'press_up'){
    response = dvSign === 'pos'
      ? "Δν > 0 (plus de moles gazeuses côté produits) : augmenter P déplace l'équilibre vers les réactifs (moins de moles gazeuses)."
      : (dvSign === 'neg'
        ? "Δν < 0 (moins de moles gazeuses côté produits) : augmenter P déplace l'équilibre vers les produits (moins de moles gazeuses)."
        : "Δν = 0 : la pression n'a aucun effet sur la position de l'équilibre.");
  } else {
    response = dvSign === 'pos'
      ? "Δν > 0 : diminuer P déplace l'équilibre vers les produits (plus de moles gazeuses)."
      : (dvSign === 'neg'
        ? "Δν < 0 : diminuer P déplace l'équilibre vers les réactifs (plus de moles gazeuses)."
        : "Δν = 0 : la pression n'a aucun effet sur la position de l'équilibre.");
  }
  document.getElementById('chatelierReadout').textContent = response;
}
function initChatelier(){ updateKcKpSim(); updateChatelier(); }

/* ---------------------------------------------------------------------------------
   SIMULATION 5 — Calculateur de pH selon le type d'électrolyte (Chapitre 6)
--------------------------------------------------------------------------------- */
function updatePhCalc(){
  const type = document.getElementById('phType').value;
  const C = parseFloat(document.getElementById('phC').value);
  const pK = parseFloat(document.getElementById('phPk').value);
  const pKe = 14;
  let pH, formule;
  if(C <= 0){ document.getElementById('phReadout').textContent = 'Entre une concentration strictement positive.'; return; }
  switch(type){
    case 'monoacide_fort': pH = -Math.log10(C); formule = 'pH = −log(C)'; break;
    case 'diacide_fort': pH = -Math.log10(2*C); formule = 'pH = −log(2C)'; break;
    case 'monobase_forte': pH = pKe + Math.log10(C); formule = 'pH = pKe + log(C)'; break;
    case 'monoacide_faible': pH = 0.5*(pK - Math.log10(C)); formule = 'pH = ½(pKa − log C)'; break;
    case 'monobase_faible': pH = 0.5*(pKe + pK + Math.log10(C)); formule = 'pH = ½(pKe + pKa + log C)'; break;
    default: pH = 7; formule = 'pH = 7 (sel neutre)';
  }
  document.getElementById('phReadout').innerHTML =
    `Formule utilisée : ${formule}<br><strong>pH ≈ ${pH.toFixed(2)}</strong><br>[H₃O⁺] = ${Math.pow(10,-pH).toExponential(2)} mol/L`;
}
function initPhCalc(){
  document.getElementById('phType').addEventListener('change', () => {
    const needsPk = ['monoacide_faible','monobase_faible'].includes(document.getElementById('phType').value);
    document.getElementById('phPkRow').style.display = needsPk ? 'block' : 'none';
  });
  updatePhCalc();
}

/* Calculateur de solubilité à partir de Ks (types simples AB, AB2/A2B, AB3) */
function updateKsCalc(){
  const Ks = parseFloat(document.getElementById('ksVal').value);
  const type = document.getElementById('ksType').value;
  let s, formule;
  if(type === 'AB'){ s = Math.sqrt(Ks); formule = 'Ks = s² ⟹ s = √Ks'; }
  else if(type === 'AB2'){ s = Math.cbrt(Ks/4); formule = 'Ks = 4s³ ⟹ s = ∛(Ks/4)'; }
  else { s = Math.pow(Ks/27, 0.25); formule = 'Ks = 27s⁴ ⟹ s = ⁴√(Ks/27)'; }
  document.getElementById('ksReadout').innerHTML = `${formule}<br><strong>s ≈ ${s.toExponential(3)} mol/L</strong>`;
}
function initKsCalc(){ updateKsCalc(); }

/* Convertisseur de concentration : à partir d'un %massique et d'une densité,
   calcule concentration pondérale, molarité, normalité et molalité (Chapitre 7) */
function updateConcConv(){
  const pct = parseFloat(document.getElementById('ccPct').value) || 0;
  const dens = parseFloat(document.getElementById('ccDens').value) || 0; // kg/dm3 = g/mL
  const M = parseFloat(document.getElementById('ccM').value) || 1;
  const nEq = parseFloat(document.getElementById('ccN').value) || 1;
  const densGL = dens * 1000; // g/L
  const Cp = (pct/100) * densGL; // g/L (concentration pondérale)
  const C = Cp / M; // mol/L (molarité)
  const N = C * nEq; // éq.g/L (normalité)
  const massSolventG = densGL - Cp; // g de solvant pour 1 L de solution
  const molalite = massSolventG > 0 ? C * (1000/massSolventG) : NaN;
  const wSolvant = densGL > 0 ? (massSolventG/densGL)*100 : NaN;
  document.getElementById('ccReadout').innerHTML =
    `Masse volumique de la solution : ${densGL.toFixed(1)} g/L<br>` +
    `Concentration pondérale Cp = ${Cp.toFixed(2)} g/L<br>` +
    `<strong>Molarité C = ${C.toFixed(3)} mol/L</strong><br>` +
    `<strong>Normalité N = ${N.toFixed(3)} éq.g/L</strong> (avec n = ${nEq})<br>` +
    `Molalité ≈ ${isNaN(molalite)?'—':molalite.toFixed(3)} mol/kg de solvant<br>` +
    `Fraction massique du solvant ≈ ${isNaN(wSolvant)?'—':wSolvant.toFixed(1)}%`;
}
function initConcConv(){ updateConcConv(); }

/* Calculateur de Kirchhoff : ΔH(T2) = ΔH(T1) + ΔCp·(T2−T1) (Chapitre 8) */
function updateKirchhoffCalc(){
  const dH1 = parseFloat(document.getElementById('khH1').value) || 0; // kJ
  const dCp = parseFloat(document.getElementById('khCp').value) || 0; // J/K
  const T1 = parseFloat(document.getElementById('khT1').value) || 0; // K
  const T2 = parseFloat(document.getElementById('khT2').value) || 0; // K
  const dH2 = dH1*1000 + dCp*(T2-T1); // en J
  document.getElementById('khReadout').innerHTML =
    `ΔH(T2) = ΔH(T1) + ΔCp·(T2−T1)<br>` +
    `= ${(dH1*1000).toFixed(0)} + (${dCp.toFixed(2)})×(${T2.toFixed(0)}−${T1.toFixed(0)})<br>` +
    `<strong>ΔH(T2) ≈ ${dH2.toFixed(0)} J = ${(dH2/1000).toFixed(3)} kJ</strong>`;
}
function initKirchhoffCalc(){ updateKirchhoffCalc(); }

/* =========================== CHAPITRE 1 =========================== */
THERMO_CHAPTERS[thKey('Systèmes, transformations et travail thermodynamique')] = {
  objectives: [
    "Distinguer système ouvert, fermé et isolé, et caractériser un état d'équilibre",
    "Reconnaître les différentes formes de transformation (isotherme, isochore, réversible...)",
    "Calculer une capacité calorifique et une chaleur latente",
    "Calculer le travail échangé lors d'une transformation réversible ou irréversible",
    "Évaluer pourquoi le travail réversible et le travail irréversible entre les deux mêmes états initial et final ne sont, en général, jamais égaux"
  ],
  prereqs: ["Notions de base sur la matière (états, mole)"],
  bodyHtml: `
    <p>En 1824, un jeune ingénieur français de 28 ans, Sadi Carnot, publie un mémoire aujourd'hui considéré comme l'acte fondateur de la thermodynamique moderne : il cherche à comprendre, dans un contexte d'industrialisation galopante, pourquoi les machines à vapeur ne peuvent jamais convertir en travail utile la totalité de la chaleur qu'elles consomment. Sa réponse — l'existence d'une limite théorique fondamentale, atteinte uniquement par des transformations réversibles idéales — reste, deux siècles plus tard, l'un des piliers absolus de toute la physique et de toute la chimie.</p>
    <p>Ce concept de réversibilité, apparemment abstrait, a des conséquences bien concrètes : c'est lui qui explique pourquoi aucun moteur thermique (voiture, centrale électrique) ne peut atteindre un rendement de 100 %, et pourquoi la chaleur perdue sous forme de frottements, de bruit ou de chaleur dissipée représente une perte définitive, jamais totalement récupérable. Ce premier chapitre pose les fondations conceptuelles indispensables — système, état d'équilibre, réversibilité, travail — sur lesquelles reposera toute la thermochimie des chapitres suivants.</p>
    <p>La thermodynamique chimique étudie comment l'énergie se transforme et se transfère lors d'une réaction chimique. Avant de calculer quoi que ce soit, il faut définir précisément de quoi on parle : quel est le « système » étudié, dans quel état se trouve-t-il, et comment échange-t-il de l'énergie avec ce qui l'entoure ? À la fin de ce chapitre, tu sauras calculer précisément le travail échangé lors de n'importe quelle transformation, et comprendre pourquoi la réversibilité, bien qu'un idéal théorique jamais parfaitement atteint, reste un outil de calcul indispensable.</p>

    <h3>1. Système, milieu extérieur, univers</h3>
    <p>Le <strong>système</strong> est la partie de l'univers qu'on choisit d'étudier, délimitée par une paroi réelle ou fictive. Tout le reste constitue le <strong>milieu extérieur</strong>. Système + milieu extérieur = <strong>univers</strong>.</p>
    <table class="mini-table">
      <tr><th>Type de système</th><th>Échange de matière</th><th>Échange d'énergie</th><th>Exemple</th></tr>
      <tr><td>Ouvert</td><td>oui</td><td>oui</td><td>un feu de bois</td></tr>
      <tr><td>Fermé</td><td>non</td><td>oui</td><td>circuit de refroidissement d'un moteur</td></tr>
      <tr><td>Isolé</td><td>non</td><td>non</td><td>un vase de Dewar (thermos idéal)</td></tr>
    </table>

    <h3>2. Variables et état d'un système</h3>
    <p>L'état d'un système est décrit par des <strong>variables d'état</strong> (température, pression, volume, masse, concentration...). On distingue les variables <strong>extensives</strong>, qui dépendent de la quantité de matière (volume, masse, nombre de moles), des variables <strong>intensives</strong>, qui n'en dépendent pas (pression, température).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Un système est <strong>en équilibre</strong> quand ses variables d'état sont uniformes dans tout le système et ne changent plus avec le temps. L'état initial et l'état final d'une transformation sont toujours des états d'équilibre.
    </div>
    <p>L'équation d'état la plus simple est celle des gaz parfaits : $PV = nRT$, avec $R = 0{,}082\\ \\text{atm·L·K}^{-1}\\text{mol}^{-1} = 8{,}314\\ \\text{J·K}^{-1}\\text{mol}^{-1}$.</p>

    <h3>3. Convention de signe (convention du banquier)</h3>
    <p>Toute énergie ou matière <strong>reçue</strong> par le système est comptée <strong>positivement</strong> ; toute énergie ou matière <strong>cédée</strong> par le système est comptée <strong>négativement</strong> — exactement comme un compte en banque : un dépôt est positif, un retrait est négatif.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 90" width="100%">
          <ellipse cx="60" cy="45" rx="30" ry="24" fill="#4C7CFF" opacity="0.25" stroke="#4C7CFF" stroke-width="1.5"/>
          <line x1="95" y1="20" x2="63" y2="42" stroke="#2DD4C4" stroke-width="2.4" marker-end="url(#sArr1)"/>
          <text x="90" y="15" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">+ reçu</text>
          <line x1="60" y1="45" x2="20" y2="75" stroke="#FF6B6F" stroke-width="2.4" marker-end="url(#sArr2)"/>
          <text x="5" y="88" font-family="IBM Plex Mono" font-size="9" fill="#FF6B6F">− cédé</text>
          <defs>
            <marker id="sArr1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker>
            <marker id="sArr2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#FF6B6F"/></marker>
          </defs>
        </svg>
        <span>Convention du banquier appliquée au système</span>
      </div>
    </div>

    <h3>4. Les différentes formes de transformation</h3>
    <table class="mini-table">
      <tr><th>Transformation</th><th>Condition</th></tr>
      <tr><td>Isotherme</td><td>$T = \\text{cste}$</td></tr>
      <tr><td>Isochore</td><td>$V = \\text{cste}$</td></tr>
      <tr><td>Isobare</td><td>$P = \\text{cste}$</td></tr>
      <tr><td>Adiabatique</td><td>aucun échange de chaleur avec l'extérieur</td></tr>
      <tr><td>Monotherme</td><td>même température avant et après (peut varier pendant)</td></tr>
      <tr><td>Réversible</td><td>suite d'états d'équilibre infiniment proches ; peut être parcourue dans les deux sens</td></tr>
      <tr><td>Irréversible</td><td>transformation spontanée, ne passe pas par des états d'équilibre, ne peut pas s'inverser seule</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Une transformation réversible est un idéal théorique (infiniment lente), très utile pour les calculs — la réalité est toujours plus proche de l'irréversible. Comparer les deux permet de quantifier l'inefficacité d'une transformation réelle.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une transformation réversible, infiniment lente, n'existe dans la Nature que comme une idéalisation limite — pourtant les chimistes et physiciens l'utilisent constamment dans leurs calculs. Pourquoi un modèle physiquement irréalisable reste-t-il malgré tout un outil de calcul aussi précieux et incontournable ?
    </div>

    <h3>5. Chaleur et capacité calorifique</h3>
    <p>La chaleur $Q$ est l'énergie transférée entre deux corps à températures différentes. La <strong>capacité calorifique</strong> $C$ (ou chaleur massique/molaire) relie une quantité de chaleur à la variation de température qu'elle produit :</p>
    <div class="formula-box">$$dQ = m\\,c\\,dT \\quad\\text{(masse)} \\qquad dQ = n\\,c\\,dT \\quad\\text{(moles)}$$</div>
    <p>On distingue $C_P$ (à pression constante) et $C_V$ (à volume constant), car la quantité de chaleur nécessaire pour élever la température d'un corps dépend du mode de chauffage.</p>

    <h3>6. Chaleur latente</h3>
    <p>Lors d'un changement d'état (fusion, vaporisation...), la température reste constante bien que le système absorbe ou dégage de la chaleur. Cette chaleur, appelée <strong>chaleur latente</strong> $L$, correspond à $Q = m\\,L$ (ou $Q = n\\,L$). Les chaleurs latentes de deux changements d'état inverses sont opposées (ex. $L_{fusion} = -L_{solidification}$).</p>

    <h3>7. Le travail thermodynamique</h3>
    <p>Le travail échangé résulte d'une variation de volume contre une pression extérieure. Pour un piston qui se déplace de $dx$ dans un cylindre de section $S$ : $dW = -P_{ext}\\,dV$ (le signe (−) traduit la convention du banquier appliquée au système).</p>
    <table class="mini-table">
      <tr><th>Cas</th><th>Formule</th></tr>
      <tr><td>Transformation isobare</td><td>$W = -P_{ext}(V_2-V_1)$</td></tr>
      <tr><td>Transformation réversible</td><td>$dW = -P\\,dV$ (la pression du gaz est égale à la pression externe à chaque instant)</td></tr>
      <tr><td>Détente/compression réversible isotherme (gaz parfait)</td><td>$W_{rév} = -nRT\\ln\\dfrac{V_2}{V_1}$</td></tr>
      <tr><td>Transformation irréversible (brutale, contre $P_{ext}$ constante)</td><td>$W_{irrév} = -P_{ext}(V_2-V_1)$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Interprétation graphique</span>
      Sur un diagramme (P,V), la valeur absolue du travail correspond à l'aire sous la courbe suivie par la transformation. Pour une même détente entre les mêmes états 1 et 2, le travail réversible et le travail irréversible ne sont pas égaux — utilise le simulateur ci-dessous pour le vérifier visuellement.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Pour une même détente d'un gaz entre les deux mêmes états initial et final, le travail réversible fourni par le système est toujours supérieur, en valeur absolue, au travail irréversible. Sachant que le travail correspond graphiquement à l'aire sous la courbe (P,V) suivie par la transformation, pourquoi le chemin réversible — qui longe de plus près la courbe P(V) réelle du gaz — maximise-t-il cette aire par rapport à un chemin irréversible plus brutal ?
    </div>

    <h3>8. Frontière de la recherche</h3>
    <p>Le concept de réversibilité et la limite théorique posée par Carnot restent d'une actualité brûlante : toute l'ingénierie énergétique moderne — des centrales thermiques classiques aux futures centrales à fusion nucléaire — est contrainte par cette même limite fondamentale, qui fixe un rendement maximal théorique impossible à dépasser, quelle que soit la sophistication technologique employée. Les chercheurs en thermodynamique des processus irréversibles cherchent aujourd'hui à quantifier précisément l'écart entre les transformations réelles et cette limite réversible idéale, pour identifier où concentrer les efforts d'optimisation énergétique dans l'industrie.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des procédés industriels s'approchant significativement plus près de la réversibilité idéale, sans pour autant sacrifier la vitesse de production nécessaire à leur viabilité économique ? C'est un compromis central de l'ingénierie chimique et énergétique moderne (thermodynamique à temps fini).</p>
    <p><strong>Technologie émergente :</strong> les pompes à chaleur et systèmes de réfrigération de nouvelle génération sont conçus en s'appuyant explicitement sur les cycles thermodynamiques réversibles théoriques comme référence, cherchant à minimiser l'écart avec cette limite pour maximiser leur efficacité énergétique réelle.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Système défini (ouvert/fermé/isolé) → variables d'état → transformation (réversible idéale ou irréversible réelle) → travail = aire sous la courbe (P,V) → comparaison quantifiant l'inefficacité réelle
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$dW = -P_{ext}\\,dV$$
      Cette équation, d'une simplicité trompeuse, contient toute la mécanique du travail thermodynamique : son signe encode la convention du banquier, et son intégration selon différents chemins (réversible ou non) révèle que le travail, contrairement à l'énergie interne étudiée au chapitre suivant, dépend fondamentalement du chemin parcouru.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Système ouvert (matière + énergie), fermé (énergie seule), isolé (rien) : c'est la première question à se poser</li>
        <li>Convention du banquier : ce que le système reçoit est positif, ce qu'il cède est négatif</li>
        <li>Une transformation réversible passe par des états d'équilibre ; une irréversible est spontanée et ne repasse pas par ces états</li>
        <li>Le travail réversible et le travail irréversible entre les deux mêmes états ne sont, en général, pas égaux</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le signe (−) dans $dW = -P\\,dV$ — le travail fourni PAR le système est négatif</li>
        <li>Confondre capacité calorifique molaire (avec $n$) et massique (avec $m$)</li>
        <li>Utiliser la pression du gaz au lieu de la pression externe dans le calcul du travail irréversible</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — travail réversible vs irréversible</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Fixe l'état initial et le volume final : compare visuellement l'aire (= travail) pour une détente réversible et une détente brutale (irréversible) entre les deux mêmes états.</p>
      <div class="sim-2col">
        <svg viewBox="0 0 230 170" width="250" height="190">
          <line x1="20" y1="150" x2="220" y2="150" stroke="#3A4658" stroke-width="1"/>
          <line x1="20" y1="150" x2="20" y2="10" stroke="#3A4658" stroke-width="1"/>
          <path id="pvAreaIrrev" fill="#FF6B6F" opacity="0.35"/>
          <path id="pvAreaRev" fill="#2DD4C4" opacity="0.35"/>
          <path id="pvCurve" stroke="#2DD4C4" stroke-width="2" fill="none"/>
        </svg>
        <div class="sim-controls">
          <label>P₁ : <span id="pvP1Val">5</span></label><input type="range" id="pvP1" min="1" max="10" step="0.5" value="5" oninput="updatePVSim()">
          <label>V₁ : <span id="pvV1Val">2</span></label><input type="range" id="pvV1" min="1" max="6" step="0.5" value="2" oninput="updatePVSim()">
          <label>V₂ (final) : <span id="pvV2Val">6</span></label><input type="range" id="pvV2" min="1" max="10" step="0.5" value="6" oninput="updatePVSim()">
          <p style="font-size:0.8rem; color:var(--ink-soft); margin:6px 0 0;">P₂ (à l'équilibre final) : <span id="pvP2Val"></span></p>
          <div class="sim-readout" id="pvReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un vase de Dewar contenant du café chaud est un exemple de système :</p>
        <div class="options">
          <label class="option"><input type="radio" name="th1e1" value="wrong"> ouvert</label>
          <label class="option"><input type="radio" name="th1e1" value="wrong"> fermé</label>
          <label class="option"><input type="radio" name="th1e1" value="right"> isolé (approximativement)</label>
          <label class="option"><input type="radio" name="th1e1" value="wrong"> aucun des trois</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th1e1','th1fb1','Correct — un vase de Dewar est justement l\\'exemple donné dans le cours pour un système isolé.','Un système isolé n\\'échange ni matière ni énergie — c\\'est exactement l\\'exemple du cours.')">Vérifier</button>
        <div class="feedback" id="th1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Parmi ces grandeurs, laquelle est extensive ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th1e2" value="wrong"> Température</label>
          <label class="option"><input type="radio" name="th1e2" value="wrong"> Pression</label>
          <label class="option"><input type="radio" name="th1e2" value="right"> Masse</label>
          <label class="option"><input type="radio" name="th1e2" value="wrong"> Concentration</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th1e2','th1fb2','Correct — la masse dépend de la quantité de matière, contrairement à la température, la pression ou la concentration.','Une variable extensive dépend de la quantité de matière considérée : la masse en fait partie, contrairement à T, P ou la concentration.')">Vérifier</button>
        <div class="feedback" id="th1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour une détente d'un gaz (V₂ &gt; V₁), le travail fourni par le système est, par convention :</p>
        <div class="options">
          <label class="option"><input type="radio" name="th1e3" value="right"> Négatif</label>
          <label class="option"><input type="radio" name="th1e3" value="wrong"> Positif</label>
          <label class="option"><input type="radio" name="th1e3" value="wrong"> Nul</label>
          <label class="option"><input type="radio" name="th1e3" value="wrong"> Cela dépend de la température</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th1e3','th1fb3','Correct — W = −P·dV, et dV>0 pour une détente, donc W<0 : le système fournit de l\\'énergie au milieu extérieur.','Utilise dW = −P·dV. Pour une détente, dV > 0, donc dW est négatif : le système fournit du travail.')">Vérifier</button>
        <div class="feedback" id="th1fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si une transformation parfaitement réversible pouvait réellement être réalisée en un temps fini : quelles conséquences cela aurait-il pour le rendement des moteurs thermiques ?</li>
        <li>Pourquoi Carnot, en cherchant simplement à améliorer les machines à vapeur de son époque, a-t-il découvert une limite théorique qui s'applique aujourd'hui à absolument tous les moteurs thermiques, quels que soient leur taille ou leur principe de fonctionnement ?</li>
        <li>Quelle serait la conséquence, pour la transition énergétique mondiale, d'une découverte qui permettrait de s'affranchir de la limite théorique de Carnot ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>S. Carnot, <em>Réflexions sur la puissance motrice du feu</em>, 1824 — le mémoire fondateur de la thermodynamique moderne.</li>
        <li>P. Atkins, J. de Paula, <em>Chimie physique</em>, De Boeck — référence standard pour la thermodynamique chimique en licence.</li>
        <li>I. Prigogine, <em>Introduction to Thermodynamics of Irreversible Processes</em>, Wiley, 1967 (prix Nobel de chimie 1977 pour ses travaux sur les structures dissipatives et les processus irréversibles).</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais du vocabulaire et des outils de calcul fondamentaux de la thermodynamique — système, transformation, travail. Le chapitre suivant, « Premier principe et thermochimie », va introduire le principe de conservation de l'énergie qui gouverne toute réaction chimique, et te donner les moyens de calculer l'énergie libérée ou absorbée par n'importe quelle transformation chimique. Comme le disait Sadi Carnot lui-même, avec une lucidité visionnaire pour son époque : « Pour envisager dans toute sa généralité le principe de la production du mouvement par la chaleur, il faut le concevoir indépendamment de tout mécanisme. » Tu viens de faire tes premiers pas dans cette généralité.</p>
  `,
  init: initPVSim
};

THERMO_NOVA_KB[thKey('Systèmes, transformations et travail thermodynamique')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Systèmes, transformations et travail thermodynamique ». Demande-moi une définition (système ouvert/fermé/isolé, réversible...), ou un indice sur un exercice.",
  rules: [
    { test:/syst[èe]me ouvert|syst[èe]me ferm[ée]|syst[èe]me isol[ée]/i, replies:["Ouvert = échange matière ET énergie ; fermé = échange énergie SEULEMENT ; isolé = n'échange RIEN avec l'extérieur. Le vase de Dewar est l'exemple classique de système isolé."] },
    { test:/r[ée]versible/i, replies:["Une transformation réversible passe par une suite d'états d'équilibre infiniment proches et peut être parcourue dans les deux sens — c'est un idéal théorique, jamais parfaitement atteint en pratique."] },
    { test:/extensive|intensive/i, replies:["Une variable extensive dépend de la quantité de matière (masse, volume, nombre de moles) ; une variable intensive n'en dépend pas (température, pression)."] },
    { test:/travail/i, replies:["Le travail thermodynamique vient de dW = −P·dV : une détente (dV>0) donne un travail négatif (fourni par le système), une compression (dV<0) donne un travail positif (reçu par le système)."] },
    { test:/chaleur latente/i, replies:["La chaleur latente L est la chaleur échangée lors d'un changement d'état, à température constante : Q = m·L. Les chaleurs latentes de deux changements inverses (ex. fusion/solidification) sont opposées."] },
    { test:/capacit[ée] calorifique/i, replies:["La capacité calorifique C relie une quantité de chaleur à une variation de température : dQ = m·c·dT (ou n·c·dT). On distingue Cp (pression constante) et Cv (volume constant)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repense à la définition d'un système isolé et à l'exemple donné dans le cours.","Indice niveau 2 : le vase de Dewar est justement cet exemple.","Indice niveau 3 : la réponse est \\'isolé\\'."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : cherche laquelle de ces 4 grandeurs change si tu doubles la quantité de matière.","Indice niveau 2 : la masse double si tu doubles la matière ; T, P et la concentration ne changent pas.","Indice niveau 3 : la réponse est la masse."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : applique dW = −P·dV avec dV > 0 (une détente).","Indice niveau 2 : un nombre positif (P) multiplié par un nombre positif (dV), puis par −1.","Indice niveau 3 : le résultat est négatif."] }
  ]
};

/* =========================== CHAPITRE 2 =========================== */
THERMO_CHAPTERS[thKey('Premier principe et thermochimie')] = {
  objectives: [
    "Énoncer le premier principe et l'appliquer à une transformation",
    "Distinguer énergie interne U et enthalpie H, et savoir quand utiliser laquelle",
    "Calculer une enthalpie de réaction avec la loi de Hess",
    "Utiliser les enthalpies standard de formation, de combustion et de liaison",
    "Évaluer pourquoi la loi de Hess, apparemment une simple astuce de calcul, est en réalité une conséquence directe et incontournable du premier principe"
  ],
  prereqs: ["Systèmes, transformations et travail thermodynamique"],
  bodyHtml: `
    <p>En 1840, le chimiste suisse Germain Henri Hess énonce, à partir d'observations expérimentales méticuleuses, une loi qui semble presque trop belle pour être vraie : la chaleur totale échangée lors d'une réaction chimique ne dépend que de l'état initial et de l'état final, jamais du nombre d'étapes intermédiaires empruntées pour y parvenir. Cette découverte, faite huit ans avant même que Joule ne détermine précisément l'équivalence entre chaleur et travail, et bien avant l'énoncé formel du premier principe par Clausius, constitue en réalité l'une des toutes premières manifestations expérimentales de la conservation de l'énergie — un principe fondamental que la chimie a, en quelque sorte, découvert avant la physique elle-même.</p>
    <p>La loi de Hess n'est donc pas une simple recette de calcul pratique : c'est une conséquence directe et rigoureuse du fait que l'énergie interne (et l'enthalpie) sont des fonctions d'état. Cette propriété permet aujourd'hui aux chimistes de calculer l'énergie dégagée ou absorbée par des réactions qu'il serait dangereux, coûteux, voire impossible de réaliser directement en laboratoire — en les décomposant simplement en une succession d'étapes plus simples et déjà mesurées.</p>
    <p>Le premier principe pose la règle la plus fondamentale de la thermodynamique : l'énergie ne se crée ni ne se détruit, elle se transforme. Ce chapitre montre comment l'appliquer concrètement pour calculer la chaleur échangée par une réaction chimique. À la fin de ce chapitre, tu sauras calculer l'enthalpie de n'importe quelle réaction chimique, même une réaction que tu n'as jamais observée directement.</p>

    <h3>1. Énoncé du premier principe</h3>
    <p>Au cours d'une transformation, la variation d'énergie totale d'un système est égale à la somme des énergies échangées avec le milieu extérieur (chaleur $Q$ et travail $W$) :</p>
    <div class="formula-box">$$\\Delta U = Q + W \\qquad \\text{ou en différentiel : } dU = dQ + dW$$</div>
    <p>$U$, appelée <strong>énergie interne</strong>, est une <strong>fonction d'état</strong> : sa variation ne dépend que de l'état initial et de l'état final, jamais du chemin suivi. $Q$ et $W$, pris séparément, ne sont <em>pas</em> des fonctions d'état — seule leur somme l'est.</p>

    <div class="diagram">
      <svg width="200" height="130" viewBox="0 0 200 130">
        <circle cx="50" cy="70" r="22" fill="none" stroke="#4C7CFF" stroke-width="1.6"/>
        <text x="42" y="75" font-family="IBM Plex Mono" font-size="12" fill="#4C7CFF">A</text>
        <circle cx="150" cy="70" r="22" fill="none" stroke="#4C7CFF" stroke-width="1.6"/>
        <text x="142" y="75" font-family="IBM Plex Mono" font-size="12" fill="#4C7CFF">B</text>
        <path d="M68,58 Q100,20 132,58" fill="none" stroke="#2DD4C4" stroke-width="1.8" marker-end="url(#pArr1)"/>
        <text x="90" y="25" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">chemin 1</text>
        <path d="M68,75 Q100,95 132,75" fill="none" stroke="#F0B94D" stroke-width="1.8" marker-end="url(#pArr2)"/>
        <text x="90" y="112" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">chemin 2</text>
        <defs>
          <marker id="pArr1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker>
          <marker id="pArr2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#F0B94D"/></marker>
        </defs>
      </svg>
    </div>
    <p>Quel que soit le chemin suivi entre A et B (chemin 1 ou chemin 2), $\\Delta U = U_B - U_A$ reste la même — c'est cette propriété qui rend $U$ (et plus tard $H$) si utile en pratique.</p>

    <h3>2. Chaleurs de réaction à P constante et à V constante</h3>
    <p>À pression constante, on montre que $Q_P = \\Delta U + P\\Delta V = \\Delta(U+PV)$. On définit alors une nouvelle fonction d'état, l'<strong>enthalpie</strong> :</p>
    <div class="formula-box">$$H = U + PV \\qquad \\Delta H = Q_P \\text{ (à pression constante)}$$</div>
    <p>À volume constant, $\\Delta V = 0$ donc $W=0$ et $\\Delta U = Q_V$. Les deux chaleurs de réaction sont reliées par :</p>
    <div class="formula-box">$$\\Delta H = \\Delta U + RT\\Delta n$$</div>
    <p>où $\\Delta n$ est la variation du nombre de moles <em>gazeuses</em> au cours de la réaction.</p>
    <div class="key-point">
      <span class="eyebrow">Pourquoi deux fonctions différentes ?</span>
      $U$ est adaptée à une transformation à volume constant (pas de travail des forces de pression) ; $H$ est adaptée à une transformation à pression constante (le cas le plus courant en chimie, en bécher ouvert à l'air libre).
    </div>

    <h3>3. Enthalpie standard de formation</h3>
    <p>L'enthalpie standard de formation $\\Delta H^\\circ_f(T)$ d'un composé est la variation d'enthalpie de la réaction qui forme <strong>une mole</strong> de ce composé à partir de ses éléments pris dans leur état le plus stable (l'état standard, $P=1\\,\\text{bar}$). Par convention, $\\Delta H^\\circ_f = 0$ pour un corps simple dans son état le plus stable (ex. $N_2(g)$, $O_2(g)$, $Fe(s)$).</p>

    <h3>4. Loi de Hess</h3>
    <p>C'est l'outil de calcul le plus utilisé de ce chapitre :</p>
    <div class="formula-box">$$\\Delta H_R = \\sum_i \\nu_i\\,\\Delta H_f(\\text{produits}) - \\sum_j \\nu_j\\,\\Delta H_f(\\text{réactifs})$$</div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> calculer $\\Delta H_R$ pour $C_2H_4(g) + H_2(g) \\rightarrow C_2H_6(g)$, sachant $\\Delta H_f(C_2H_4) = 52{,}3\\,\\text{kJ/mol}$, $\\Delta H_f(C_2H_6) = -84{,}5\\,\\text{kJ/mol}$, $\\Delta H_f(H_2)=0$.</p>
      <p><strong>Solution :</strong> $\\Delta H_R = \\Delta H_f(C_2H_6) - [\\Delta H_f(C_2H_4) + \\Delta H_f(H_2)] = -84{,}5 - 52{,}3 = -136{,}8\\,\\text{kJ}$.</p>
      <p class="example-answer">Réponse : $\\Delta H_R = -136{,}8\\,\\text{kJ}$ — réaction exothermique.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La loi de Hess permet de calculer l'enthalpie d'une réaction sans jamais avoir à la réaliser directement au laboratoire — un avantage précieux pour des réactions dangereuses (explosives, toxiques) ou trop lentes pour être mesurées en pratique. Pourquoi cette propriété repose-t-elle fondamentalement sur le fait que H est une fonction d'état, et échouerait-elle totalement si l'on tentait de l'appliquer de la même façon au travail W ?
    </div>

    <h3>5. Autres enthalpies standard utiles</h3>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Définition</th><th>Signe</th></tr>
      <tr><td>Enthalpie de combustion</td><td>chaleur dégagée par l'oxydation complète d'une mole de composé (produits : $H_2O(l)$, $CO_2(g)$...)</td><td>toujours négative</td></tr>
      <tr><td>Enthalpie d'atomisation</td><td>chaleur pour casser toutes les liaisons d'un corps simple et former des atomes gazeux libres</td><td>toujours positive</td></tr>
      <tr><td>Enthalpie de dissociation (énergie de liaison)</td><td>chaleur pour casser une liaison chimique d'une molécule gazeuse</td><td>toujours positive</td></tr>
    </table>

    <h3>6. Effet de la température sur $\\Delta H$ (loi de Kirchhoff)</h3>
    <p>Quand $C_P$ dépend de la température, il faut intégrer pour connaître $\\Delta H$ à une autre température que celle des tables (souvent 298 K) : $\\Delta H(T_2) = \\Delta H(T_1) + \\displaystyle\\int_{T_1}^{T_2} \\Delta C_P\\,dT$, où $\\Delta C_P$ est la différence entre les capacités calorifiques des produits et des réactifs.</p>

    <details style="margin:16px 0;">
      <summary class="accordion-toggle">📎 Aide-mémoire : chaîne des enthalpies de formation d'un sel ionique (ex. NaCl)</summary>
      <p style="font-size:0.88rem; color:var(--ink-soft);">Sublimation du sodium solide → gazeux, puis ionisation (Na → Na⁺), puis dissociation du dichlore gazeux en atomes, puis affinité électronique (Cl → Cl⁻, négative). La somme de toutes ces étapes redonne l'enthalpie de formation du sel — c'est encore une application de la loi de Hess, avec un cycle plus long (cycle de Born-Haber).</p>
    </details>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le cycle de Born-Haber, mentionné dans l'aide-mémoire ci-dessus, permet de calculer une enthalpie réseau (l'énergie de cohésion d'un cristal ionique) qu'il serait impossible de mesurer directement par calorimétrie. En quoi ce cycle est-il, au fond, une application plus élaborée mais rigoureusement identique dans son principe à l'exemple simple de l'éthylène traité plus haut ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>La détermination précise des enthalpies de formation reste un enjeu majeur de la chimie computationnelle moderne : pour des molécules complexes ou instables, difficiles voire impossibles à synthétiser et à mesurer directement en laboratoire, les chimistes utilisent aujourd'hui des calculs de chimie quantique ab initio pour prédire ces valeurs avec une précision croissante. Ces prédictions sont essentielles pour l'industrie chimique, notamment pour évaluer a priori la sécurité et l'efficacité énergétique de nouveaux procédés industriels avant même leur mise en œuvre expérimentale.</p>
    <p><strong>Question ouverte :</strong> peut-on prédire, uniquement par le calcul et sans aucune mesure expérimentale préalable, l'enthalpie de formation de n'importe quelle molécule avec une précision suffisante pour l'ingénierie chimique industrielle ? C'est un objectif de plus en plus atteignable grâce aux progrès de la chimie quantique computationnelle et de l'intelligence artificielle appliquée à la chimie.</p>
    <p><strong>Technologie émergente :</strong> les bases de données thermochimiques alimentées par apprentissage automatique, entraînées sur des millions de mesures expérimentales et de calculs quantiques, permettent aujourd'hui d'estimer rapidement l'enthalpie de formation de nouvelles molécules avant même leur synthèse, accélérant considérablement la recherche de nouveaux matériaux et médicaments.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Premier principe (ΔU=Q+W) → à P constante : H=U+PV, ΔH=Qp → enthalpies standard de formation (tables) → loi de Hess (indépendance du chemin) → enthalpie de n'importe quelle réaction
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\Delta H_R = \\sum_i \\nu_i\\,\\Delta H_f(\\text{produits}) - \\sum_j \\nu_j\\,\\Delta H_f(\\text{réactifs})$$
      Cette loi de Hess, conséquence directe du premier principe appliqué à des fonctions d'état, est l'outil de calcul le plus utilisé de toute la thermochimie : elle transforme le calcul de l'enthalpie de n'importe quelle réaction, même dangereuse ou jamais réalisée, en une simple soustraction de valeurs tabulées.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>ΔU (énergie interne) est adaptée au volume constant ; ΔH = ΔU + PV (enthalpie) est adaptée à la pression constante</li>
        <li>ΔH et ΔU sont reliées par ΔH = ΔU + RTΔn</li>
        <li>La loi de Hess : ΔHR = Σ ΔHf(produits) − Σ ΔHf(réactifs), quel que soit le chemin réactionnel</li>
        <li>L'enthalpie de formation d'un corps simple stable est nulle par convention</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de multiplier chaque ΔHf par son coefficient stœchiométrique dans la loi de Hess</li>
        <li>Confondre enthalpie de formation (peut être négative ou positive) et enthalpie de combustion ou d'atomisation (signe imposé)</li>
        <li>Oublier Δn (variation du nombre de moles gazeuses) dans la relation entre ΔH et ΔU</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — calorimétrie (température d'équilibre)</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Deux corps à températures différentes s'équilibrent dans un calorimètre parfait. Fais varier masses, capacités calorifiques et températures initiales.</p>
      <div class="sim-2col">
        <div class="sim-controls">
          <label>Corps 1 — masse (g)</label><input type="number" id="caM1" value="500" oninput="updateCaloSim()">
          <label>Corps 1 — c (J.g⁻¹.K⁻¹)</label><input type="number" id="caC1" value="4.19" step="0.01" oninput="updateCaloSim()">
          <label>Corps 1 — T initiale (°C)</label><input type="number" id="caT1" value="20" oninput="updateCaloSim()">
        </div>
        <div class="sim-controls">
          <label>Corps 2 — masse (g)</label><input type="number" id="caM2" value="150" oninput="updateCaloSim()">
          <label>Corps 2 — c (J.g⁻¹.K⁻¹)</label><input type="number" id="caC2" value="0.385" step="0.001" oninput="updateCaloSim()">
          <label>Corps 2 — T initiale (°C)</label><input type="number" id="caT2" value="100" oninput="updateCaloSim()">
        </div>
      </div>
      <div class="sim-readout" id="caloReadout" style="margin-top:14px;"></div>

      <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:20px;"><strong>Calculateur — loi de Hess</strong> (2 réactifs + 2 produits) :</p>
      <div class="sim-2col">
        <div class="sim-controls">
          <label>Réactif 1 — ΔHf</label><input type="number" id="hReact1H" value="52.3" oninput="updateHessCalc()">
          <label>Réactif 1 — coefficient</label><input type="number" id="hReact1N" value="1" oninput="updateHessCalc()">
          <label>Réactif 2 — ΔHf</label><input type="number" id="hReact2H" value="0" oninput="updateHessCalc()">
          <label>Réactif 2 — coefficient</label><input type="number" id="hReact2N" value="1" oninput="updateHessCalc()">
        </div>
        <div class="sim-controls">
          <label>Produit 1 — ΔHf</label><input type="number" id="hProd1H" value="-84.5" oninput="updateHessCalc()">
          <label>Produit 1 — coefficient</label><input type="number" id="hProd1N" value="1" oninput="updateHessCalc()">
          <label>Produit 2 — ΔHf</label><input type="number" id="hProd2H" value="0" oninput="updateHessCalc()">
          <label>Produit 2 — coefficient</label><input type="number" id="hProd2N" value="0" oninput="updateHessCalc()">
        </div>
      </div>
      <div class="sim-readout" id="hessReadout" style="margin-top:14px;"></div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Laquelle de ces fonctions est une fonction d'état ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th2e1" value="wrong"> La chaleur Q seule</label>
          <label class="option"><input type="radio" name="th2e1" value="wrong"> Le travail W seul</label>
          <label class="option"><input type="radio" name="th2e1" value="right"> L'énergie interne U</label>
          <label class="option"><input type="radio" name="th2e1" value="wrong"> Aucune des trois</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th2e1','th2fb1','Correct — U (et H) sont des fonctions d\\'état ; Q et W séparément ne le sont pas, seule leur somme (ΔU) l\\'est.','Relis le cours : ni Q ni W séparément ne sont des fonctions d\\'état — seule leur somme (ΔU) en est une.')">Vérifier</button>
        <div class="feedback" id="th2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour une réaction à pression constante, quelle grandeur mesurable est directement égale à ΔH ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th2e2" value="wrong"> Qv</label>
          <label class="option"><input type="radio" name="th2e2" value="right"> Qp</label>
          <label class="option"><input type="radio" name="th2e2" value="wrong"> W seul</label>
          <label class="option"><input type="radio" name="th2e2" value="wrong"> ΔS</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th2e2','th2fb2','Correct — à pression constante, ΔH = Qp, la chaleur de réaction mesurée à pression constante.','À pression constante, ΔU = Qp − PΔV et H = U+PV, ce qui donne exactement ΔH = Qp.')">Vérifier</button>
        <div class="feedback" id="th2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'enthalpie standard de formation du dioxygène gazeux O₂(g) vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="th2e3" value="wrong"> -393,5 kJ/mol</label>
          <label class="option"><input type="radio" name="th2e3" value="right"> 0 kJ/mol</label>
          <label class="option"><input type="radio" name="th2e3" value="wrong"> +285,8 kJ/mol</label>
          <label class="option"><input type="radio" name="th2e3" value="wrong"> Cela dépend de la température</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th2e3','th2fb3','Correct — par convention, l\\'enthalpie de formation de tout corps simple dans son état le plus stable (comme O2 gazeux) est nulle.','Par convention, l\\'enthalpie de formation d\\'un corps simple pris dans son état standard le plus stable est toujours nulle.')">Vérifier</button>
        <div class="feedback" id="th2fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'enthalpie n'était pas une fonction d'état, mais dépendait du chemin réactionnel emprunté : la loi de Hess et l'industrie chimique toute entière seraient-elles encore possibles telles que nous les connaissons ?</li>
        <li>Pourquoi les chimistes préfèrent-ils très généralement travailler avec l'enthalpie H plutôt qu'avec l'énergie interne U, alors que les deux sont des fonctions d'état tout aussi valables ?</li>
        <li>Quelle serait la conséquence, pour la sécurité industrielle, d'une méthode fiable pour prédire l'enthalpie de réactions dangereuses sans jamais avoir à les réaliser expérimentalement ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>G. H. Hess, « Thermochemische Untersuchungen », Annalen der Physik und Chemie, 1840 — le mémoire fondateur de la loi de Hess.</li>
        <li>P. Atkins, J. de Paula, <em>Chimie physique</em>, De Boeck — référence standard pour la thermochimie en licence.</li>
        <li>NIST-JANAF, <em>Thermochemical Tables</em>, National Institute of Standards and Technology — base de données de référence internationale pour les enthalpies standard.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais calculer l'énergie échangée par n'importe quelle réaction chimique, même celles que tu n'observeras jamais directement en laboratoire. Le chapitre suivant, « Deuxième principe : entropie et enthalpie libre », va compléter ce tableau en répondant à une question tout aussi essentielle que le premier principe ne peut pas trancher à lui seul : une réaction, même énergétiquement favorable, se produira-t-elle réellement d'elle-même ? Comme le disait Hess lui-même, résumant l'esprit de sa propre découverte : la chaleur totale dégagée dans une transformation chimique est toujours la même, « quel que soit le nombre et la nature des phases intermédiaires ». Une loi d'une simplicité et d'une puissance rarement égalées en science.</p>
  `,
  init: function(){ initCaloSim(); updateHessCalc(); }
};

THERMO_NOVA_KB[thKey('Premier principe et thermochimie')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Premier principe et thermochimie ». Demande-moi la différence entre U et H, comment appliquer la loi de Hess, ou un indice sur un exercice.",
  rules: [
    { test:/premier principe/i, replies:["Le premier principe dit que l'énergie ne se crée ni ne se détruit : ΔU = Q + W. U (énergie interne) est une fonction d'état, contrairement à Q et W pris séparément."] },
    { test:/enthalpie(?!.*formation)|\\bh\\s*=\\s*u/i, replies:["L'enthalpie H = U + PV est la fonction adaptée aux réactions à pression constante (le cas le plus courant en chimie) : ΔH = Qp directement mesurable."] },
    { test:/hess/i, replies:["La loi de Hess dit que ΔHR = Σ ΔHf(produits) − Σ ΔHf(réactifs), en n'oubliant jamais de multiplier chaque ΔHf par son coefficient stœchiométrique."] },
    { test:/formation/i, replies:["L'enthalpie standard de formation d'un composé est l'enthalpie de la réaction qui forme UNE mole de ce composé à partir de ses éléments dans leur état le plus stable. Elle vaut 0 pour un corps simple stable."] },
    { test:/combustion/i, replies:["L'enthalpie de combustion est la chaleur dégagée par l'oxydation complète d'une mole de composé — toujours négative, car une combustion est toujours exothermique."] },
    { test:/dq\s*=|q\s*=\s*n\s*c|capacit[ée] calorifique/i, replies:["dQ = n·c·dT relie une petite quantité de chaleur à la variation de température, via la capacité calorifique molaire c (ou n·Cp si pression constante, n·Cv si volume constant)."] },
    { test:/delta n|rt\s*delta/i, replies:["ΔH = ΔU + RTΔn relie les deux chaleurs de réaction, où Δn est la variation du nombre de moles GAZEUSES entre produits et réactifs."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repense à ce que dit le cours sur Q et W pris séparément.","Indice niveau 2 : ni Q ni W seuls ne sont des fonctions d'état.","Indice niveau 3 : c'est U qui l'est."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : repense à la relation entre ΔH et la chaleur mesurée à pression constante.","Indice niveau 2 : ΔH = Qp, exactement.","Indice niveau 3 : la réponse est Qp."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : repense à la convention sur les corps simples stables.","Indice niveau 2 : O2 gazeux est un corps simple dans son état le plus stable.","Indice niveau 3 : son enthalpie de formation est donc 0."] }
  ]
};

/* =========================== CHAPITRE 3 =========================== */
THERMO_CHAPTERS[thKey('Deuxième principe : entropie et enthalpie libre')] = {
  objectives: [
    "Comprendre pourquoi le premier principe ne suffit pas à prévoir le sens d'une réaction",
    "Calculer une variation d'entropie pour un changement de température, de phase ou de pression",
    "Utiliser l'enthalpie libre ΔG pour prédire la spontanéité d'une réaction",
    "Relier ΔG à la constante d'équilibre K",
    "Évaluer pourquoi une réaction endothermique (qui absorbe de la chaleur) peut malgré tout être spontanée dans certaines conditions de température"
  ],
  prereqs: ["Premier principe et thermochimie"],
  bodyHtml: `
    <p>En 1877, le physicien autrichien Ludwig Boltzmann propose une interprétation microscopique révolutionnaire de l'entropie, résumée dans une formule d'une simplicité inouïe — $S=k\\ln W$ — aujourd'hui gravée sur sa tombe à Vienne. Cette équation relie une grandeur macroscopique mesurable, l'entropie, au nombre de configurations microscopiques possibles d'un système : plus un état peut être réalisé de façons différentes à l'échelle moléculaire, plus il est probable, et plus son entropie est élevée. Boltzmann, dont les idées furent violemment contestées de son vivant par certains physiciens qui refusaient encore l'existence même des atomes, ne verra jamais la reconnaissance posthume et éclatante de ses travaux : il se suicide en 1906, quelques années à peine avant que l'expérience ne confirme définitivement la réalité atomique qu'il avait toujours défendue.</p>
    <p>Cette tragique histoire personnelle n'enlève rien à la portée de sa découverte : l'entropie, longtemps perçue comme une abstraction mathématique difficile à appréhender, devient avec Boltzmann une grandeur profondément intuitive — une simple mesure du désordre microscopique. C'est cette même idée qui explique pourquoi un glaçon fond spontanément dans l'eau tiède (l'état liquide désordonné est statistiquement bien plus probable que l'état cristallin ordonné) et jamais l'inverse, bien que les deux processus respectent également la conservation de l'énergie.</p>
    <p>Le premier principe garantit que l'énergie se conserve, mais il ne dit rien sur le <strong>sens</strong> dans lequel une transformation se produit réellement. Un glaçon fond dans un verre d'eau tiède ; jamais l'inverse ne se produit spontanément, alors que les deux respecteraient également la conservation de l'énergie. Il fallait un second principe — et une nouvelle fonction d'état, l'<strong>entropie</strong>. À la fin de ce chapitre, tu sauras prédire, sans ambiguïté, si une réaction chimique se produira spontanément ou non, et à quelle température ce comportement pourrait basculer.</p>

    <h3>1. L'entropie : une mesure du désordre</h3>
    <p>L'entropie $S$ est liée aux possibilités de mouvement à l'échelle microscopique (vibration, rotation, translation). Plus il y a de désordre moléculaire, plus $S$ est grande.</p>
    <div class="formula-box">$$\\Delta S_{syst} = \\int \\frac{dQ_{rev}}{T} \\quad \\text{(transformation réversible)}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Si $\\Delta S > 0$, le désordre augmente à l'échelle microscopique ; si $\\Delta S < 0$, l'ordre augmente. $S$ est une grandeur extensive, exprimée en $\\text{J·K}^{-1}$.
    </div>

    <h3>2. Énoncé du deuxième principe</h3>
    <div class="formula-box">$$\\Delta S_{Total} = \\Delta S_{syst} + \\Delta S_{ext} \\geq 0$$</div>
    <p>Toute transformation spontanée (irréversible) s'accompagne d'une augmentation de l'entropie <strong>globale</strong> (système + milieu extérieur). Pour une transformation réversible, $\\Delta S_{Total} = 0$.</p>
    <table class="mini-table">
      <tr><th>Signe de $\\Delta S_{Total}$</th><th>Interprétation</th></tr>
      <tr><td>$> 0$</td><td>transformation irréversible (spontanée)</td></tr>
      <tr><td>$= 0$</td><td>transformation réversible</td></tr>
      <tr><td>$< 0$</td><td>transformation impossible</td></tr>
    </table>

    <h3>3. Calculer une variation d'entropie</h3>
    <table class="mini-table">
      <tr><th>Situation</th><th>Formule</th></tr>
      <tr><td>Échauffement à $P$ constante (Cp indépendant de T)</td><td>$\\Delta S = nC_P\\ln\\dfrac{T_2}{T_1}$</td></tr>
      <tr><td>Échauffement à $V$ constant</td><td>$\\Delta S = nC_V\\ln\\dfrac{T_2}{T_1}$</td></tr>
      <tr><td>Changement de phase (à $T_{changement}$ constante)</td><td>$\\Delta S = n\\dfrac{\\Delta H_{changement}}{T_{changement}}$</td></tr>
      <tr><td>Détente isotherme d'un gaz parfait</td><td>$\\Delta S = nR\\ln\\dfrac{V_2}{V_1} = -nR\\ln\\dfrac{P_2}{P_1}$</td></tr>
      <tr><td>Réaction chimique à $T$ constante</td><td>$\\Delta S = \\sum \\nu_i S^\\circ(\\text{produits}) - \\sum \\nu_j S^\\circ(\\text{réactifs})$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Troisième principe (au passage)</span>
      Au zéro absolu, il n'existe qu'un seul état possible pour un corps pur cristallisé : $S_{0K} = 0$. C'est ce qui permet de tabuler des entropies <em>absolues</em> $S^\\circ_T$ (contrairement à $H$, toujours définie à une constante près).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Contrairement à l'enthalpie H, toujours définie à une constante additive près, l'entropie S peut être connue en valeur absolue grâce au troisième principe. En reliant cela à l'interprétation de Boltzmann (S=k ln W), pourquoi l'état parfaitement ordonné d'un cristal au zéro absolu correspond-il précisément à une entropie nulle, et non à une simple valeur de référence arbitraire comme pour H ?
    </div>

    <h3>4. L'enthalpie libre G : le critère pratique de spontanéité</h3>
    <p>Suivre en permanence l'entropie de « tout l'univers » n'est pas pratique. On construit donc une fonction qui ne dépend que du système lui-même, l'<strong>enthalpie libre</strong> (ou énergie de Gibbs) :</p>
    <div class="formula-box">$$G = H - TS$$</div>
    <p>À température et pression constantes, une réaction est spontanée si et seulement si :</p>
    <div class="formula-box">$$\\Delta G_r = \\Delta H_r - T\\Delta S_r < 0$$</div>
    <table class="mini-table">
      <tr><th>Signe de $\\Delta G$</th><th>Conclusion</th></tr>
      <tr><td>$\\Delta G < 0$</td><td>réaction spontanée dans le sens direct</td></tr>
      <tr><td>$\\Delta G = 0$</td><td>système à l'équilibre</td></tr>
      <tr><td>$\\Delta G > 0$</td><td>réaction non spontanée dans ce sens (spontanée dans le sens inverse)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — le rôle de la température</span>
      Comme $\\Delta G = \\Delta H - T\\Delta S$, le signe de $\\Delta G$ peut changer avec $T$ dès que $\\Delta H$ et $\\Delta S$ ont des signes opposés. C'est pour cela qu'une réaction peut devenir spontanée seulement au-delà (ou en-deçà) d'une certaine température : $T_{inversion} = \\Delta H / \\Delta S$.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour $N_2(g)+3H_2(g)\\rightarrow 2NH_3(g)$, on donne $\\Delta H^\\circ = -92{,}27\\,\\text{kJ}$ et $\\Delta S^\\circ = -198{,}7\\,\\text{J/K}$ à 298 K. La réaction est-elle spontanée ?</p>
      <p><strong>Solution :</strong> $\\Delta G^\\circ = -92{,}27\\times10^3 - 298\\times(-198{,}7) = -92\\,270 + 59\\,213 = -33\\,057\\,\\text{J} = -33{,}06\\,\\text{kJ}$.</p>
      <p class="example-answer">Réponse : $\\Delta G^\\circ < 0$, la réaction est spontanée à 298 K (bien que $\\Delta S^\\circ<0$ — l'ordre augmente en formant NH₃, mais c'est largement compensé par le fort dégagement de chaleur).</p>
    </div>

    <h3>5. Enthalpie libre et constante d'équilibre</h3>
    <p>À l'équilibre, $\\Delta G_r = 0$, ce qui relie l'enthalpie libre standard à la constante d'équilibre $K$ :</p>
    <div class="formula-box">$$\\Delta G^\\circ = -RT\\ln K$$</div>
    <p>Si $\\Delta G^\\circ < 0$, alors $K>1$ : à l'équilibre, les produits dominent. Si $\\Delta G^\\circ>0$, alors $K<1$ : les réactifs dominent. C'est le pont entre la thermodynamique (chapitre 3) et les équilibres chimiques (chapitre 5).</p>

    <h3>6. Frontière de la recherche</h3>
    <p>Le deuxième principe et le concept d'entropie dépassent largement le cadre de la chimie : ils sont aujourd'hui au cœur des débats sur les limites théoriques du calcul informatique (le principe de Landauer, formulé en 1961, établit qu'effacer un bit d'information coûte nécessairement une quantité minimale d'énergie dissipée sous forme de chaleur, une conséquence directe de la thermodynamique), et sur la nature même du temps qui passe — l'entropie croissante de l'Univers étant l'une des rares grandeurs physiques qui distingue rigoureusement le passé du futur. Les biologistes moléculaires utilisent également l'enthalpie libre pour comprendre comment les protéines se replient spontanément dans leur structure fonctionnelle, un processus entièrement gouverné par la minimisation de G.</p>
    <p><strong>Question ouverte :</strong> comment concilier précisément l'entropie croissante de l'Univers dans son ensemble avec l'existence de structures hautement organisées comme les êtres vivants, qui semblent localement « diminuer » le désordre ? La réponse (les êtres vivants exportent de l'entropie vers leur environnement, maintenant un déséquilibre local grâce à un apport constant d'énergie) reste un sujet de recherche actif en thermodynamique des systèmes hors équilibre.</p>
    <p><strong>Technologie émergente :</strong> les ordinateurs à très basse consommation énergétique, notamment pour l'intelligence artificielle embarquée, sont aujourd'hui conçus en tenant compte explicitement de la limite thermodynamique de Landauer, pour approcher au plus près la limite théorique minimale d'énergie dissipée par opération de calcul.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Premier principe insuffisant → deuxième principe (ΔS_Total ≥ 0) → entropie S (désordre microscopique) → enthalpie libre G=H−TS (critère pratique) → ΔG&lt;0 : spontané → ΔG°=−RTlnK (pont vers les équilibres chimiques)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\Delta G = \\Delta H - T\\Delta S$$
      Cette équation, sans doute la plus utilisée de toute la thermodynamique chimique, tranche à elle seule la question du sens spontané d'une réaction — et révèle pourquoi une réaction peut devenir spontanée à haute température alors qu'elle ne l'était pas à froid, ou inversement.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le deuxième principe : toute transformation spontanée augmente l'entropie totale (système + milieu extérieur)</li>
        <li>ΔG = ΔH − TΔS ; une réaction est spontanée à T et P constantes si ΔG &lt; 0</li>
        <li>Le signe de ΔG peut changer avec la température si ΔH et ΔS ont des signes opposés</li>
        <li>À l'équilibre, ΔG = 0, ce qui donne ΔG° = −RT·lnK</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de convertir ΔS en kJ (ou ΔH en J) avant de calculer ΔG = ΔH − TΔS — unités incohérentes, erreur très fréquente</li>
        <li>Confondre ΔS du système et ΔS total : le critère du 2e principe porte sur le total, mais le critère ΔG&lt;0 ne porte que sur le système</li>
        <li>Croire qu'une réaction avec ΔH&gt;0 (endothermique) ne peut jamais être spontanée — c'est possible si ΔS&gt;0 est assez grand</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — spontanéité (ΔG = ΔH − TΔS)</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Fais varier ΔH, ΔS et la température : observe le signe de ΔG et la température d'inversion éventuelle.</p>
      <div class="sim-2col">
        <div class="sim-controls" style="min-width:280px;">
          <label>ΔH (kJ) : <span id="gHVal">-92</span></label><input type="range" id="gH" min="-200" max="200" step="1" value="-92" oninput="updateGibbsSim()">
          <label>ΔS (J/K) : <span id="gSVal">-199</span></label><input type="range" id="gS" min="-300" max="300" step="1" value="-199" oninput="updateGibbsSim()">
          <label>T (K) : <span id="gTVal">298</span></label><input type="range" id="gT" min="100" max="1000" step="1" value="298" oninput="updateGibbsSim()">
          <div class="sim-readout" id="gibbsReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une transformation réversible se déroule dans un système. Que vaut ΔS_Total (système + milieu extérieur) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th3e1" value="wrong"> Toujours positif</label>
          <label class="option"><input type="radio" name="th3e1" value="right"> Nul</label>
          <label class="option"><input type="radio" name="th3e1" value="wrong"> Toujours négatif</label>
          <label class="option"><input type="radio" name="th3e1" value="wrong"> Cela dépend du signe de ΔH</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th3e1','th3fb1','Correct — pour une transformation réversible, ΔS_Total = 0 exactement, c\\'est la limite entre possible et impossible.','Relis le cours : ΔS_Total > 0 pour une irréversible, mais = 0 pour une réversible — c\\'est le cas limite.')">Vérifier</button>
        <div class="feedback" id="th3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une réaction a ΔH &gt; 0 et ΔS &gt; 0. À quelle condition est-elle spontanée ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th3e2" value="wrong"> Jamais</label>
          <label class="option"><input type="radio" name="th3e2" value="wrong"> Toujours</label>
          <label class="option"><input type="radio" name="th3e2" value="right"> À haute température</label>
          <label class="option"><input type="radio" name="th3e2" value="wrong"> À basse température</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th3e2','th3fb2','Correct — avec ΔH>0 et ΔS>0, ΔG = ΔH − TΔS devient négatif seulement si T est assez grand.','ΔG = ΔH − TΔS. Si ΔH>0 et ΔS>0, plus T est grand, plus le terme −TΔS devient négatif et peut compenser ΔH.')">Vérifier</button>
        <div class="feedback" id="th3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Si ΔG° &lt; 0 pour une réaction, que peut-on dire de sa constante d'équilibre K ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th3e3" value="wrong"> K &lt; 1</label>
          <label class="option"><input type="radio" name="th3e3" value="right"> K &gt; 1</label>
          <label class="option"><input type="radio" name="th3e3" value="wrong"> K = 0</label>
          <label class="option"><input type="radio" name="th3e3" value="wrong"> K = 1 obligatoirement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th3e3','th3fb3','Correct — ΔG° = −RTlnK ; si ΔG°<0 alors lnK>0, donc K>1 : les produits dominent à l\\'équilibre.','Utilise ΔG° = −RTlnK. Si ΔG°<0, alors lnK doit être positif, donc K>1.')">Vérifier</button>
        <div class="feedback" id="th3fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'entropie totale de l'Univers pouvait diminuer, ne serait-ce qu'une seule fois : quelles conséquences cela aurait-il pour notre compréhension du temps et de la causalité ?</li>
        <li>Pourquoi Boltzmann, dont l'interprétation statistique de l'entropie est aujourd'hui unanimement acceptée, a-t-il connu une telle opposition de son vivant de la part de certains de ses contemporains ?</li>
        <li>Quelle serait la conséquence, pour l'informatique de demain, d'une méthode de calcul capable de s'affranchir complètement de la limite thermodynamique de Landauer ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>L. Boltzmann, « Über die Beziehung zwischen dem zweiten Hauptsatze der mechanischen Wärmetheorie und der Wahrscheinlichkeitsrechnung », Wiener Berichte, 1877 — l'article fondateur de l'interprétation statistique de l'entropie.</li>
        <li>P. Atkins, J. de Paula, <em>Chimie physique</em>, De Boeck — référence standard pour l'entropie et l'enthalpie libre en licence.</li>
        <li>R. Landauer, « Irreversibility and Heat Generation in the Computing Process », IBM Journal of Research and Development, 1961 — article fondateur du principe de Landauer sur les limites thermodynamiques du calcul.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais du critère ultime pour prédire si une réaction chimique se produira spontanément ou non — la question à laquelle le premier principe seul ne pouvait pas répondre. Le chapitre suivant, « Réactions chimiques : oxydoréduction et équilibrage », va appliquer concrètement ces notions à une famille de réactions omniprésentes en chimie, où des électrons sont échangés entre espèces chimiques. Comme le disait Boltzmann lui-même, avec une clairvoyance qui n'a jamais faibli malgré l'adversité : « Il n'y a rien de plus pratique qu'une bonne théorie. » Son entropie statistique en est, plus d'un siècle plus tard, l'une des plus éclatantes démonstrations.</p>
  `,
  init: initGibbsSim
};

THERMO_NOVA_KB[thKey('Deuxième principe : entropie et enthalpie libre')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Deuxième principe : entropie et enthalpie libre ». Demande-moi ce qu'est l'entropie, comment savoir si une réaction est spontanée, ou un indice sur un exercice.",
  rules: [
    { test:/entropie/i, replies:["L'entropie S mesure le désordre à l'échelle microscopique. ΔS>0 signifie que le désordre augmente ; ΔS<0 signifie que l'ordre augmente."] },
    { test:/deuxi[èe]me principe|2[èe]me principe/i, replies:["Le deuxième principe dit que toute transformation spontanée augmente l'entropie TOTALE (système + milieu extérieur) : ΔS_Total ≥ 0, avec égalité seulement pour une transformation réversible."] },
    { test:/enthalpie libre|\\bg\\s*=\\s*h/i, replies:["L'enthalpie libre G = H − TS donne un critère pratique de spontanéité qui ne regarde QUE le système : à T et P constantes, ΔG<0 signifie que la réaction est spontanée."] },
    { test:/spontan/i, replies:["Une réaction est spontanée (à T, P constantes) si ΔG = ΔH − TΔS < 0. Une réaction endothermique (ΔH>0) peut quand même être spontanée si ΔS>0 est assez grand et T assez élevée."] },
    { test:/constante d'[ée]quilibre|\\bk\\b.*[ée]quilibre/i, replies:["À l'équilibre, ΔG=0, ce qui donne ΔG° = −RT·lnK. Si ΔG°<0, alors K>1 (produits favorisés) ; si ΔG°>0, alors K<1 (réactifs favorisés)."] },
    { test:/temp[ée]rature d'inversion|change.*signe/i, replies:["Le signe de ΔG peut changer avec T si ΔH et ΔS ont des signes opposés. La température d'inversion est T = ΔH/ΔS (attention aux unités : ΔH en J si ΔS en J/K)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repense au cas particulier d'une transformation réversible pour ΔS_Total.","Indice niveau 2 : ce n'est ni positif ni négatif dans ce cas précis.","Indice niveau 3 : ΔS_Total = 0 pour une réversible."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : écris ΔG = ΔH − TΔS avec ΔH>0 et ΔS>0, et regarde ce qui se passe quand T augmente.","Indice niveau 2 : −TΔS devient de plus en plus négatif quand T augmente.","Indice niveau 3 : la réaction devient spontanée à haute température."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : utilise ΔG° = −RTlnK avec ΔG°<0.","Indice niveau 2 : si ΔG°<0, alors lnK doit être positif.","Indice niveau 3 : lnK>0 signifie K>1."] }
  ]
};

/* =========================== CHAPITRE 4 =========================== */
THERMO_CHAPTERS[thKey('Réactions chimiques : oxydoréduction et équilibrage')] = {
  objectives: [
    "Déterminer l'électronégativité relative de deux éléments et le type de liaison qui les relie",
    "Calculer le degré d'oxydation (nombre d'oxydation) de tout atome dans un composé",
    "Choisir la bonne méthode pour équilibrer une équation chimique selon son type",
    "Utiliser la notion d'équivalent-gramme",
    "Évaluer, face à une équation chimique donnée, laquelle des trois méthodes d'équilibrage (générale, équivalents-gramme, degré d'oxydation) sera la plus rapide et la plus fiable"
  ],
  prereqs: ["Premier principe et thermochimie"],
  bodyHtml: `
    <p>La rouille qui ronge lentement une carrosserie automobile, la combustion qui libère l'énergie contenue dans l'essence de ton réservoir, la photosynthèse qui verdit chaque feuille de la planète, et même la respiration cellulaire qui maintient ton propre corps en vie : toutes ces réactions, en apparence si différentes, partagent un même mécanisme fondamental — un transfert d'électrons d'une espèce chimique vers une autre. Ce mécanisme, baptisé oxydoréduction, est sans doute la famille de réactions chimiques la plus omniprésente dans la Nature et dans l'industrie, des piles électriques qui alimentent ton téléphone jusqu'aux hauts fourneaux qui produisent l'acier de nos infrastructures.</p>
    <p>Savoir équilibrer correctement une équation d'oxydoréduction n'est donc jamais un simple exercice scolaire imposé : c'est une compétence directement transposable à la compréhension de la corrosion des matériaux, à la conception de nouvelles batteries, ou à l'analyse quantitative de dosages en laboratoire. Ce chapitre te donne les trois méthodes complémentaires pour équilibrer n'importe quelle équation chimique, quelle que soit sa nature.</p>
    <p>Avant d'étudier un équilibre chimique, il faut savoir écrire correctement l'équation de la réaction — ce qui suppose de comprendre la nature des liaisons en jeu et de savoir équilibrer les coefficients stœchiométriques, y compris dans les réactions d'oxydoréduction où des électrons sont échangés. À la fin de ce chapitre, tu sauras équilibrer n'importe quelle équation chimique, en choisissant systématiquement la méthode la plus adaptée à sa nature.</p>

    <h3>1. Électronégativité</h3>
    <p>L'électronégativité mesure la tendance d'un atome, engagé dans une liaison chimique, à attirer vers lui les électrons de cette liaison. Sur l'échelle de Pauling, le fluor (4,0) est l'élément le plus électronégatif, le francium (0,7) le moins électronégatif.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Plus un atome est petit, plus son électronégativité est grande. Dans le tableau périodique : l'électronégativité <strong>augmente</strong> de gauche à droite sur une période, et <strong>diminue</strong> du haut vers le bas d'une colonne.
    </div>
    <table class="mini-table">
      <tr><th>Différence d'électronégativité</th><th>Type de liaison</th></tr>
      <tr><td>Faible</td><td>covalente</td></tr>
      <tr><td>Importante</td><td>ionique</td></tr>
    </table>

    <h3>2. Degré d'oxydation (nombre d'oxydation)</h3>
    <p>Le degré d'oxydation indique le nombre d'électrons qu'un atome a cédés (nombre positif) ou reçus (nombre négatif) par rapport à son état neutre. Règles principales :</p>
    <ul style="margin:12px 0 12px 20px; font-size:0.94rem; color:var(--ink-soft);">
      <li>Un atome à l'état libre (corps simple) a un degré d'oxydation nul.</li>
      <li>H vaut généralement +I, sauf dans les hydrures (−I) ; O vaut généralement −II, sauf dans les peroxydes (−I).</li>
      <li>La somme algébrique des degrés d'oxydation dans une espèce est égale à sa charge globale.</li>
      <li>Un atome qui cède un électron voit son n.o. augmenter de 1 ; un atome qui en gagne un voit son n.o. diminuer de 1.</li>
    </ul>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> quel est le degré d'oxydation du soufre dans $SO_4^{2-}$ ?</p>
      <p><strong>Solution :</strong> O vaut $-II$ (×4 = $-8$). La somme doit égaler la charge globale $-2$ : n.o.(S) $+ (-8) = -2$, donc n.o.(S) $= +6$.</p>
      <p class="example-answer">Réponse : le soufre est au degré d'oxydation $+VI$ dans $SO_4^{2-}$.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le degré d'oxydation est une grandeur formelle, conventionnelle (on attribue arbitrairement tous les électrons de liaison à l'atome le plus électronégatif), et non une charge réelle mesurable comme celle d'un ion. Pourquoi cette convention, malgré son caractère artificiel, reste-t-elle un outil aussi efficace pour suivre les transferts d'électrons dans une réaction d'oxydoréduction ?
    </div>

    <h3>3. Équilibrer une équation chimique : trois méthodes</h3>
    <table class="mini-table">
      <tr><th>Méthode</th><th>Quand l'utiliser</th></tr>
      <tr><td>Méthode générale (algébrique)</td><td>toujours applicable, système d'équations sur la conservation de chaque élément</td></tr>
      <tr><td>Méthode des équivalents-gramme</td><td>réactions de double décomposition (échange d'ions ou de fractions de molécule)</td></tr>
      <tr><td>Méthode du degré d'oxydation</td><td>réactions d'oxydoréduction (transfert d'électrons)</td></tr>
    </table>
    <p>Pour la méthode du degré d'oxydation, le principe est simple : le nombre total d'électrons cédés par le réducteur doit être égal au nombre total d'électrons captés par l'oxydant. On ajuste les coefficients pour équilibrer cet échange, puis on vérifie la conservation des autres éléments.</p>

    <h3>4. Équivalent-gramme</h3>
    <p>L'équivalent-gramme (éq.g) d'un composé est la quantité de matière qui met en jeu un électron-gramme (la charge attachée à un ion monovalent) dans une réaction :</p>
    <div class="formula-box">$$1\\,\\text{éq.g} = \\frac{1}{\\text{nombre total de charges des ions positifs ou négatifs}}\\ \\text{mole}$$</div>
    <p>Pour une réaction d'oxydoréduction, un équivalent-gramme de réducteur correspond toujours à un équivalent-gramme d'oxydant — c'est ce qui rend cette méthode si pratique pour équilibrer rapidement une équation de double décomposition ou de dosage.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La rouille (corrosion du fer) et la respiration cellulaire sont deux réactions d'oxydoréduction extrêmement différentes en apparence — l'une lente et destructrice, l'autre rapide et vitale — mais partagent le même mécanisme fondamental de transfert d'électrons. En quoi la vitesse d'une réaction d'oxydoréduction (traitée dans un futur cours de cinétique chimique) est-elle une question totalement distincte de celle traitée ici, l'équilibrage stœchiométrique de sa seule équation ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Les réactions d'oxydoréduction sont au cœur de l'un des défis technologiques majeurs de notre époque : le stockage de l'énergie. Les batteries lithium-ion, qui équipent aujourd'hui la quasi-totalité des appareils électroniques portables et des véhicules électriques, reposent entièrement sur des réactions d'oxydoréduction réversibles soigneusement optimisées, un domaine de recherche qui a valu le prix Nobel de chimie 2019 à Goodenough, Whittingham et Yoshino. Les piles à combustible à hydrogène, envisagées comme alternative propre aux moteurs thermiques, exploitent elles aussi une réaction d'oxydoréduction contrôlée entre l'hydrogène et l'oxygène.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des batteries rechargeables exploitant des réactions d'oxydoréduction encore plus efficaces énergétiquement, moins coûteuses et moins dépendantes de ressources minières limitées comme le lithium ou le cobalt ? C'est un enjeu de recherche stratégique majeur pour la transition énergétique mondiale.</p>
    <p><strong>Technologie émergente :</strong> les batteries à flux redox, qui séparent physiquement le stockage de l'énergie électrochimique de la puissance délivrée, sont développées comme solution de stockage à grande échelle pour les réseaux électriques intégrant des énergies renouvelables intermittentes.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Différence d'électronégativité → nature de la liaison (covalente/ionique) → calcul du degré d'oxydation de chaque atome → choix de la méthode d'équilibrage adaptée → équation chimique équilibrée
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$n_{\\text{électrons cédés (réducteur)}} = n_{\\text{électrons captés (oxydant)}}$$
      Cette égalité fondamentale, conséquence directe de la conservation de la charge électrique, est le principe unique qui permet d'équilibrer n'importe quelle réaction d'oxydoréduction, de la simple corrosion d'un clou jusqu'aux réactions complexes qui alimentent une batterie lithium-ion.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Plus la différence d'électronégativité entre deux atomes liés est grande, plus la liaison est ionique (sinon covalente)</li>
        <li>Le degré d'oxydation d'un atome dans un ion vérifie : somme des n.o. = charge de l'ion</li>
        <li>Trois méthodes d'équilibrage : générale (toujours), équivalents-gramme (double décomposition), degré d'oxydation (oxydoréduction)</li>
        <li>Dans une oxydoréduction, les électrons cédés par le réducteur sont exactement captés par l'oxydant</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que H peut valoir −I dans les hydrures et O peut valoir −I dans les peroxydes</li>
        <li>Confondre électronégativité (attire les électrons) et électropositivité (les cède facilement)</li>
        <li>Utiliser la méthode du degré d'oxydation pour une réaction qui n'est pas une oxydoréduction (perte de temps inutile)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Quel est le degré d'oxydation de l'azote dans $NO_3^-$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th4e1" value="wrong"> +3</label>
          <label class="option"><input type="radio" name="th4e1" value="right"> +5</label>
          <label class="option"><input type="radio" name="th4e1" value="wrong"> -1</label>
          <label class="option"><input type="radio" name="th4e1" value="wrong"> +1</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th4e1','th4fb1','Correct — n.o.(N) + 3×(−2) = −1, donc n.o.(N) = +5.','O vaut −2 (×3 = −6). La somme doit égaler la charge −1 : n.o.(N) − 6 = −1.')">Vérifier</button>
        <div class="feedback" id="th4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Deux atomes ont une très faible différence d'électronégativité. Leur liaison est probablement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="th4e2" value="right"> covalente</label>
          <label class="option"><input type="radio" name="th4e2" value="wrong"> ionique</label>
          <label class="option"><input type="radio" name="th4e2" value="wrong"> métallique obligatoirement</label>
          <label class="option"><input type="radio" name="th4e2" value="wrong"> inexistante</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th4e2','th4fb2','Correct — une faible différence d\\'électronégativité correspond à une liaison covalente (partage des électrons).','Relis la règle du cours : différence faible → covalente ; différence importante → ionique.')">Vérifier</button>
        <div class="feedback" id="th4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour équilibrer une réaction d'oxydoréduction, quelle méthode choisir en priorité ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th4e3" value="wrong"> La méthode des équivalents-gramme</label>
          <label class="option"><input type="radio" name="th4e3" value="right"> La méthode du degré d'oxydation</label>
          <label class="option"><input type="radio" name="th4e3" value="wrong"> Aucune méthode ne fonctionne</label>
          <label class="option"><input type="radio" name="th4e3" value="wrong"> Il faut deviner par tâtonnement uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th4e3','th4fb3','Correct — la méthode du degré d\\'oxydation est spécifiquement conçue pour les réactions d\\'oxydoréduction.','Le cours associe chaque méthode à un type de réaction : degré d\\'oxydation ↔ oxydoréduction, équivalents-gramme ↔ double décomposition.')">Vérifier</button>
        <div class="feedback" id="th4fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si aucune méthode fiable n'existait pour équilibrer une équation d'oxydoréduction complexe : quelles conséquences cela aurait-il pour l'analyse quantitative en chimie ?</li>
        <li>Pourquoi le degré d'oxydation de l'oxygène est-il presque toujours -II, sauf dans de rares exceptions comme les peroxydes — qu'est-ce que cela révèle sur son électronégativité par rapport aux autres éléments courants ?</li>
        <li>Quelle serait la conséquence, pour la transition énergétique mondiale, d'une découverte majeure améliorant significativement l'efficacité des réactions d'oxydoréduction dans les batteries rechargeables ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>L. Pauling, <em>The Nature of the Chemical Bond</em>, Cornell University Press, 1939 — origine de l'échelle d'électronégativité utilisée pour prédire le type de liaison.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur l'équilibrage des réactions chimiques et d'oxydoréduction en licence.</li>
        <li>J. B. Goodenough, M. S. Whittingham, A. Yoshino, travaux sur les batteries lithium-ion, Nobel Lectures, prix Nobel de chimie 2019.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais équilibrer n'importe quelle équation chimique, y compris les réactions d'oxydoréduction qui gouvernent aussi bien la corrosion que le fonctionnement des batteries modernes. Le chapitre suivant, « Équilibres chimiques et loi d'action de masse », va exploiter cette compétence pour étudier ce qui se passe lorsqu'une réaction n'est pas totale, mais atteint un état d'équilibre dynamique entre réactifs et produits. Comme le rappelle l'omniprésence des réactions d'oxydoréduction dans la Nature : de la rouille sur un vieux portail jusqu'à la respiration qui t'anime en ce moment même, un même principe simple — le transfert d'électrons — façonne une extraordinaire diversité de phénomènes chimiques.</p>
  `
};

THERMO_NOVA_KB[thKey('Réactions chimiques : oxydoréduction et équilibrage')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Réactions chimiques : oxydoréduction et équilibrage ». Demande-moi comment calculer un degré d'oxydation, quelle méthode utiliser pour équilibrer une équation, ou un indice sur un exercice.",
  rules: [
    { test:/[ée]lectron[ée]gativit[ée]/i, replies:["L'électronégativité mesure la tendance d'un atome à attirer les électrons d'une liaison. Elle augmente de gauche à droite sur une période, et diminue du haut vers le bas d'une colonne du tableau périodique."] },
    { test:/degr[ée] d'oxydation|nombre d'oxydation/i, replies:["Le degré d'oxydation indique combien d'électrons un atome a cédés (positif) ou reçus (négatif). Règle clé : la somme des degrés d'oxydation d'une espèce est égale à sa charge globale."] },
    { test:/[ée]quivalent.gramme/i, replies:["Un équivalent-gramme est la quantité de matière qui met en jeu UN électron-gramme dans une réaction. Utile pour équilibrer rapidement les réactions de double décomposition ou les dosages."] },
    { test:/[ée]quilibrer|coefficient/i, replies:["Trois méthodes pour équilibrer une équation : générale (toujours applicable), équivalents-gramme (double décomposition), degré d'oxydation (oxydoréduction). Choisis celle adaptée au type de réaction."] },
    { test:/liaison covalente|liaison ionique/i, replies:["Faible différence d'électronégativité entre deux atomes liés → liaison covalente (partage d'électrons). Différence importante → liaison ionique (transfert d'électrons)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pose l'équation somme des n.o. = charge de l'ion pour NO3⁻.","Indice niveau 2 : O vaut −2, il y en a 3, donc −6 au total.","Indice niveau 3 : n.o.(N) − 6 = −1, donc n.o.(N) = +5."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : relie directement la différence d'électronégativité au type de liaison vu dans le cours.","Indice niveau 2 : une différence faible correspond à quel type de liaison ?","Indice niveau 3 : covalente."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : chaque méthode d'équilibrage est associée à un type précis de réaction.","Indice niveau 2 : pour une oxydoréduction, quelle méthode est spécifiquement conçue ?","Indice niveau 3 : la méthode du degré d'oxydation."] }
  ]
};

/* =========================== CHAPITRE 5 =========================== */
THERMO_CHAPTERS[thKey('Équilibres chimiques et loi d\'action de masse')] = {
  objectives: [
    "Écrire la loi d'action de masse (Kc, Kp, Kx) pour un équilibre chimique",
    "Relier Kc et Kp à la variation du nombre de moles gazeuses",
    "Prévoir le sens de déplacement d'un équilibre selon la loi de Le Chatelier",
    "Mesurer expérimentalement l'avancement d'un équilibre (taux de réaction, densité de vapeur)",
    "Évaluer pourquoi un équilibre chimique n'est jamais un état statique, mais un équilibre dynamique où les réactions directe et inverse continuent en permanence"
  ],
  prereqs: ["Réactions chimiques : oxydoréduction et équilibrage"],
  bodyHtml: `
    <p>En 1864, les chimistes norvégiens Cato Guldberg et Peter Waage formulent, indépendamment des travaux de leurs contemporains, la loi d'action de masse — une relation qui va bouleverser la façon dont les chimistes conçoivent une réaction chimique. Jusqu'alors, on pensait qu'une réaction se poursuivait jusqu'à épuisement complet des réactifs ; Guldberg et Waage démontrent au contraire qu'un grand nombre de réactions atteignent un état d'équilibre dynamique, où réactifs et produits coexistent indéfiniment dans des proportions parfaitement prévisibles, gouvernées par une constante caractéristique de la réaction à une température donnée.</p>
    <p>Cette découverte n'a rien de purement théorique : c'est elle qui permet aujourd'hui aux ingénieurs chimistes d'optimiser la production industrielle d'ammoniac (procédé Haber-Bosch, indispensable à la fabrication des engrais qui nourrissent une part considérable de l'humanité), en ajustant précisément température et pression pour déplacer l'équilibre chimique dans le sens le plus favorable, conformément au principe énoncé quelques décennies plus tard par Henry Le Chatelier.</p>
    <p>De nombreuses réactions chimiques, contrairement à ce que suggère parfois une simple flèche « → », ne vont pas jusqu'à épuisement total des réactifs : elles atteignent un état d'<strong>équilibre chimique</strong>, où coexistent réactifs et produits dans des proportions fixes, gouvernées par la loi d'action de masse. À la fin de ce chapitre, tu sauras prédire, à l'aide d'un simple principe qualitatif (Le Chatelier), dans quel sens un équilibre se déplacera face à n'importe quelle perturbation.</p>

    <h3>1. Description d'un système à l'équilibre</h3>
    <p>Pour un constituant $A$, on utilise selon les cas : la molarité $[A]=n_A/V$, la fraction molaire $x_A = n_A/n_t$, ou la pression partielle $P_A = x_A\\,P_t$ (pour un gaz).</p>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Définition</th></tr>
      <tr><td>Taux de réaction</td><td>proportion de réactif ayant réagi par rapport à la quantité initiale</td></tr>
      <tr><td>Degré de dissociation $\\alpha$</td><td>taux de réaction quand un seul réactif est en jeu, $\\alpha = n_{A,dissocié}/n_{A,initial}$</td></tr>
    </table>
    <p>On peut mesurer expérimentalement l'avancement d'un équilibre gazeux via la <strong>pression totale</strong> ($P_0V=n_0RT$ et $PV=nRT$ à $T,V$ constants donnent $P/P_0=n/n_0$) ou via la <strong>densité de vapeur</strong> par rapport à l'air, sachant que la masse totale se conserve ($m_i=m_f$, loi de Lavoisier).</p>

    <h3>2. Loi d'action de masse</h3>
    <p>Pour un équilibre $aA + bB \\rightleftharpoons cC + dD$ à température constante :</p>
    <div class="formula-box">$$K_c = \\frac{[C]^c[D]^d}{[A]^a[B]^b} \\qquad K_p = \\frac{P_C^c P_D^d}{P_A^a P_B^b} = K_c\\,(RT)^{\\Delta\\nu} \\qquad K_x = K_p\\,(P_t)^{-\\Delta\\nu}$$</div>
    <p>où $\\Delta\\nu = (c+d)-(a+b)$ est la variation du nombre de moles <em>gazeuses</em>. Ces constantes ne dépendent que de la température.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La constante d'équilibre K ne dépend que de la température, jamais des concentrations initiales choisies pour l'expérience : que l'on parte d'un mélange très concentré ou très dilué en réactifs, le système atteindra toujours le même rapport de concentrations à l'équilibre (à T fixée). Comment expliques-tu, intuitivement, que la « destination » finale du système ne dépende pas du « point de départ » choisi ?
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 130 80" width="100%">
          <rect x="15" y="20" width="100" height="40" rx="6" fill="none" stroke="#4C7CFF" stroke-width="1.6"/>
          <path d="M55,32 h20" stroke="#2DD4C4" stroke-width="2" marker-end="url(#eqArr1)"/>
          <path d="M75,48 h-20" stroke="#F0B94D" stroke-width="2" marker-end="url(#eqArr2)"/>
          <text x="20" y="35" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">A+B</text>
          <text x="95" y="35" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">C+D</text>
          <defs>
            <marker id="eqArr1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker>
            <marker id="eqArr2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#F0B94D"/></marker>
          </defs>
        </svg>
        <span>À l'équilibre : vitesses directe et inverse égales</span>
      </div>
    </div>

    <h3>3. Loi de Le Chatelier</h3>
    <div class="key-point">
      <span class="eyebrow">Énoncé général</span>
      « Un équilibre se déplace de façon à s'opposer à la perturbation qu'on lui impose. »
    </div>
    <table class="mini-table">
      <tr><th>Perturbation</th><th>Effet sur l'équilibre</th></tr>
      <tr><td>Augmentation de la température</td><td>déplacement dans le sens endothermique</td></tr>
      <tr><td>Diminution de la température</td><td>déplacement dans le sens exothermique</td></tr>
      <tr><td>Augmentation de la pression (à T cste)</td><td>déplacement vers le côté avec le moins de moles gazeuses</td></tr>
      <tr><td>Diminution de la pression</td><td>déplacement vers le côté avec le plus de moles gazeuses</td></tr>
    </table>
    <p>Ce comportement se retrouve dans les relations de Van't Hoff : $\\dfrac{d\\ln K_p}{dT} = \\dfrac{\\Delta H}{RT^2}$ (isobare) et $\\dfrac{d\\ln K_c}{dT} = \\dfrac{\\Delta U}{RT^2}$ (isochore) — le signe de $\\Delta H$ (ou $\\Delta U$) détermine si $K$ augmente ou diminue avec $T$.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      L'influence de la pression n'existe que si la réaction met en jeu une phase gazeuse — liquides et solides sont considérés comme incompressibles.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le procédé industriel Haber-Bosch de synthèse de l'ammoniac ($N_2+3H_2\\rightleftharpoons 2NH_3$, exothermique, $\\Delta\\nu<0$) fonctionne en pratique à haute pression ET à température modérément élevée — un compromis qui semble contredire la loi de Le Chatelier appliquée à la température seule. En combinant les deux critères (pression favorable au produit, mais température élevée qui devrait défavoriser une réaction exothermique), quel facteur non thermodynamique (vu dans un futur cours de cinétique chimique) explique que l'industrie accepte malgré tout de travailler à température élevée ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Le procédé Haber-Bosch, direct héritier de la loi d'action de masse et du principe de Le Chatelier, produit aujourd'hui environ 150 millions de tonnes d'ammoniac par an dans le monde, principalement destinées aux engrais azotés — un procédé sans lequel, selon les estimations des historiens de l'agriculture, près de la moitié de la population mondiale actuelle ne pourrait tout simplement pas être nourrie. Ce même procédé consomme cependant environ 1 à 2 % de l'énergie mondiale, ce qui motive une recherche active pour développer des méthodes de synthèse de l'ammoniac plus économes en énergie, notamment par voie électrochimique à température ambiante.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir un catalyseur suffisamment efficace pour réaliser la synthèse de l'ammoniac à température ambiante et pression atmosphérique, s'affranchissant ainsi des conditions extrêmes (450°C, 200 bars) actuellement nécessaires au procédé Haber-Bosch industriel ? C'est un défi de recherche majeur en catalyse, avec des enjeux énergétiques et environnementaux considérables.</p>
    <p><strong>Technologie émergente :</strong> les procédés de fixation électrochimique de l'azote, alimentés par de l'électricité renouvelable, sont explorés comme alternative potentiellement plus durable au procédé Haber-Bosch traditionnel, fortement consommateur de combustibles fossiles.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Réaction limitée (vitesses directe = inverse) → équilibre dynamique → loi d'action de masse (K constant à T fixée) → perturbation (T, P, concentration) → loi de Le Chatelier (opposition à la perturbation)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$K_c = \\frac{[C]^c[D]^d}{[A]^a[B]^b}$$
      Cette loi d'action de masse, formulée par Guldberg et Waage il y a plus de 150 ans, reste l'outil quantitatif fondamental de toute la chimie des équilibres — elle permet de prédire, avant même toute expérience, la composition exacte d'un mélange réactionnel à l'équilibre.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>À l'équilibre, les vitesses directe et inverse sont égales — la composition ne change plus macroscopiquement</li>
        <li>Kp = Kc·(RT)^Δν, avec Δν = variation du nombre de moles gazeuses</li>
        <li>Le Chatelier : le système s'oppose toujours à la perturbation qu'on lui impose</li>
        <li>La pression n'influence l'équilibre que s'il y a une phase gazeuse</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que Δν ne compte QUE les moles gazeuses (pas les solides ni les liquides)</li>
        <li>Se tromper de sens : augmenter la pression favorise le côté qui a le MOINS de moles gazeuses, pas le plus</li>
        <li>Confondre l'effet de la température sur K (via Van't Hoff) avec un simple effet de dilution</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — Kc ↔ Kp et sens de Le Chatelier</span>
      <div class="sim-2col">
        <div class="sim-controls">
          <p style="font-size:0.85rem; color:var(--ink-soft); margin-bottom:6px;"><strong>Conversion Kc → Kp</strong></p>
          <label>Kc</label><input type="number" id="kcVal" value="0.5" step="0.01" oninput="updateKcKpSim()">
          <label>T (K) : <span id="kcTVal">500</span></label><input type="range" id="kcT" min="200" max="1000" step="10" value="500" oninput="updateKcKpSim()">
          <label>Δν : <span id="kcDvVal">1</span></label><input type="range" id="kcDv" min="-3" max="3" step="1" value="1" oninput="updateKcKpSim()">
          <div class="sim-readout" id="kckpReadout"></div>
        </div>
        <div class="sim-controls">
          <p style="font-size:0.85rem; color:var(--ink-soft); margin-bottom:6px;"><strong>Sens du déplacement (Le Chatelier)</strong></p>
          <label>Réaction directe</label>
          <select id="chExo" onchange="updateChatelier()"><option value="exo">exothermique</option><option value="endo">endothermique</option></select>
          <label>Signe de Δν</label>
          <select id="chDv" onchange="updateChatelier()"><option value="pos">positif (plus de moles à droite)</option><option value="neg">négatif (moins de moles à droite)</option><option value="zero">nul</option></select>
          <label>Perturbation imposée</label>
          <select id="chPerturb" onchange="updateChatelier()">
            <option value="temp_up">augmentation de T</option>
            <option value="temp_down">diminution de T</option>
            <option value="press_up">augmentation de P</option>
            <option value="press_down">diminution de P</option>
          </select>
          <div class="sim-readout" id="chatelierReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour $N_2O_4(g) \\rightleftharpoons 2NO_2(g)$, que vaut Δν ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th5e1" value="wrong"> 0</label>
          <label class="option"><input type="radio" name="th5e1" value="wrong"> -1</label>
          <label class="option"><input type="radio" name="th5e1" value="right"> +1</label>
          <label class="option"><input type="radio" name="th5e1" value="wrong"> +2</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th5e1','th5fb1','Correct — Δν = 2 − 1 = +1 (2 moles de NO2 formées contre 1 mole de N2O4 consommée).','Δν = (moles de produits gazeux) − (moles de réactifs gazeux) = 2 − 1.')">Vérifier</button>
        <div class="feedback" id="th5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une réaction exothermique est à l'équilibre. On augmente la température : l'équilibre se déplace...</p>
        <div class="options">
          <label class="option"><input type="radio" name="th5e2" value="wrong"> vers les produits</label>
          <label class="option"><input type="radio" name="th5e2" value="right"> vers les réactifs</label>
          <label class="option"><input type="radio" name="th5e2" value="wrong"> ne bouge pas</label>
          <label class="option"><input type="radio" name="th5e2" value="wrong"> dépend de la pression uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th5e2','th5fb2','Correct — augmenter T favorise toujours le sens endothermique, donc ici le sens inverse (retour vers les réactifs).','Augmenter T déplace toujours l\\'équilibre dans le sens endothermique. Si la réaction directe est exothermique, c\\'est donc le sens inverse.')">Vérifier</button>
        <div class="feedback" id="th5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une réaction en phase uniquement liquide est à l'équilibre. Augmenter la pression...</p>
        <div class="options">
          <label class="option"><input type="radio" name="th5e3" value="wrong"> déplace l'équilibre vers les produits</label>
          <label class="option"><input type="radio" name="th5e3" value="wrong"> déplace l'équilibre vers les réactifs</label>
          <label class="option"><input type="radio" name="th5e3" value="right"> n'a aucun effet</label>
          <label class="option"><input type="radio" name="th5e3" value="wrong"> dépend du signe de ΔH</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th5e3','th5fb3','Correct — la pression n\\'influence l\\'équilibre que s\\'il y a une phase gazeuse ; les liquides sont incompressibles.','Relis le point clé du cours : sans phase gazeuse, la pression n\\'a aucune influence sur la position de l\\'équilibre.')">Vérifier</button>
        <div class="feedback" id="th5fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la constante d'équilibre K dépendait des concentrations initiales choisies plutôt que de la seule température : la loi d'action de masse aurait-elle encore un pouvoir prédictif ?</li>
        <li>Pourquoi le procédé Haber-Bosch, malgré une consommation énergétique considérable, reste-t-il aujourd'hui encore la méthode industrielle dominante pour produire l'ammoniac à l'échelle mondiale ?</li>
        <li>Quelle serait la conséquence, pour l'agriculture mondiale, d'une interruption soudaine et durable de la production industrielle d'engrais azotés basée sur ce procédé ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>C. M. Guldberg, P. Waage, « Studies Concerning Affinity », Forhandlinger i Videnskabs-Selskabet i Christiania, 1864 — le mémoire fondateur de la loi d'action de masse.</li>
        <li>P. Atkins, J. de Paula, <em>Chimie physique</em>, De Boeck — référence standard pour les équilibres chimiques en licence.</li>
        <li>H. Le Chatelier, « Sur un énoncé général des lois des équilibres chimiques », Comptes Rendus de l'Académie des Sciences, 1884.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais prédire dans quel sens n'importe quel équilibre chimique se déplacera face à une perturbation — un savoir-faire directement exploité par l'industrie chimique mondiale, du procédé Haber-Bosch jusqu'à la production de méthanol. Le chapitre suivant, « Équilibres ioniques, pH et solubilité », va appliquer ces mêmes principes à un cas particulier omniprésent en chimie des solutions : les équilibres acido-basiques et de précipitation. Comme le résumait Henry Le Chatelier lui-même, avec une formulation devenue un classique de l'enseignement de la chimie : tout système à l'équilibre, perturbé, « évolue de manière à s'opposer à cette perturbation » — un principe d'une simplicité et d'une puissance prédictive remarquables.</p>
  `,
  init: initChatelier
};

THERMO_NOVA_KB[thKey('Équilibres chimiques et loi d\'action de masse')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Équilibres chimiques et loi d'action de masse ». Demande-moi ce qu'est Kc, Kp, ou comment appliquer Le Chatelier, ou un indice sur un exercice.",
  rules: [
    { test:/kc|kp|kx|action de masse/i, replies:["Kc utilise les concentrations, Kp les pressions partielles, Kx les fractions molaires. Ils sont reliés par Kp = Kc·(RT)^Δν, où Δν est la variation du nombre de moles gazeuses."] },
    { test:/le chatelier|d[ée]placement/i, replies:["La loi de Le Chatelier : un équilibre se déplace toujours de façon à s'opposer à la perturbation qu'on lui impose — augmenter T favorise le sens endothermique, augmenter P favorise le côté avec le moins de moles gazeuses."] },
    { test:/degr[ée] de dissociation|taux de r[ée]action/i, replies:["Le taux de réaction est la proportion de réactif ayant réagi. Quand un seul réactif est en jeu, on l'appelle degré de dissociation α = n(dissocié)/n(initial)."] },
    { test:/van'?t hoff/i, replies:["L'isobare de Van't Hoff (d(lnKp)/dT = ΔH/RT²) montre que le signe de ΔH détermine si K augmente ou diminue avec la température — c'est la base théorique de l'effet de T sur un équilibre."] },
    { test:/densit[ée] de vapeur/i, replies:["La densité de vapeur par rapport à l'air permet de mesurer l'avancement d'un équilibre gazeux, car la masse totale se conserve (loi de Lavoisier) même si le nombre de moles change."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compte les moles gazeuses de chaque côté de l'équation.","Indice niveau 2 : 1 mole de N2O4 donne 2 moles de NO2.","Indice niveau 3 : Δν = 2 − 1 = +1."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : augmenter T favorise toujours le même sens, quel que soit le sens de la réaction directe.","Indice niveau 2 : ce sens favorisé est le sens endothermique.","Indice niveau 3 : ici la réaction directe est exothermique, donc le sens favorisé est l'inverse (retour aux réactifs)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : repense à la condition nécessaire pour que la pression ait un effet.","Indice niveau 2 : il faut une phase gazeuse — ici tout est liquide.","Indice niveau 3 : la pression n'a donc aucun effet."] }
  ]
};

/* =========================== CHAPITRE 6 =========================== */
THERMO_CHAPTERS[thKey('Équilibres ioniques, pH et solubilité')] = {
  objectives: [
    "Distinguer électrolyte fort et faible, et écrire la constante d'acidité Ka ou de basicité Kb",
    "Calculer le pH d'une solution selon le type d'électrolyte (acide/base forte ou faible, sel)",
    "Utiliser le produit de solubilité Ks pour calculer la solubilité d'un sel peu soluble",
    "Expliquer l'influence d'un ion commun ou du pH sur la solubilité",
    "Évaluer pourquoi le pH du sang humain (maintenu très précisément entre 7,35 et 7,45) est un exemple spectaculaire de régulation d'un équilibre acido-basique en milieu biologique"
  ],
  prereqs: ["Équilibres chimiques et loi d'action de masse"],
  bodyHtml: `
    <p>En 1909, le chimiste danois Søren Sørensen, alors qu'il travaille sur le contrôle qualité de la bière au laboratoire Carlsberg de Copenhague, introduit une échelle logarithmique qui va devenir l'une des grandeurs les plus universellement connues de toute la chimie : le pH. Son intuition — mesurer l'acidité par le logarithme de la concentration en ions H₃O⁺ plutôt que par cette concentration elle-même — se révèle d'une élégance redoutable : elle comprime une gamme de concentrations s'étendant sur quatorze ordres de grandeur en une simple échelle de 0 à 14, aussi intuitive à manipuler qu'un thermomètre.</p>
    <p>Cette échelle, née d'un problème pratique de brasserie, régit aujourd'hui des enjeux considérablement plus vastes : le pH sanguin humain, maintenu avec une précision remarquable entre 7,35 et 7,45 par des systèmes tampons biologiques sophistiqués, la moindre variation significative pouvant s'avérer fatale ; le pH des océans, dont l'acidification progressive due à l'absorption du CO₂ atmosphérique menace aujourd'hui les écosystèmes coralliens du monde entier ; et le pH des sols agricoles, qui détermine directement la disponibilité des nutriments pour les cultures qui nourrissent l'humanité.</p>
    <p>Ce chapitre applique les équilibres chimiques à un cas particulièrement important en chimie et en biologie : les solutions aqueuses, où acides, bases et sels peu solubles obéissent tous à la même loi d'action de masse, adaptée à leur contexte. À la fin de ce chapitre, tu sauras calculer le pH de n'importe quelle solution aqueuse courante, et prédire la solubilité de n'importe quel sel peu soluble.</p>

    <h3>1. Électrolytes forts et faibles</h3>
    <p>Un <strong>électrolyte</strong> est une substance qui, dissoute, conduit le courant électrique en donnant des ions. Un électrolyte <strong>fort</strong> est totalement dissocié ($AB \\rightarrow A^- + B^+$, ex. HCl, NaOH) ; un électrolyte <strong>faible</strong> n'est que partiellement dissocié, aboutissant à un équilibre chimique.</p>
    <div class="key-point">
      <span class="eyebrow">Définitions de Brønsted</span>
      Un <strong>acide</strong> est un donneur de proton H⁺ ; une <strong>base</strong> est un accepteur de proton H⁺.
    </div>
    <table class="mini-table">
      <tr><th>Équilibre</th><th>Constante</th></tr>
      <tr><td>Acide faible : $AH + H_2O \\rightleftharpoons H_3O^+ + A^-$</td><td>$K_a = \\dfrac{[A^-][H_3O^+]}{[AH]}$</td></tr>
      <tr><td>Base faible : $A^- + H_2O \\rightleftharpoons AH + OH^-$</td><td>$K_b = \\dfrac{[OH^-][AH]}{[A^-]}$</td></tr>
    </table>
    <p>L'eau est <strong>amphotère</strong> (elle peut jouer le rôle d'acide ou de base) ; son autoprotolyse $2H_2O \\rightleftharpoons H_3O^+ + OH^-$ a pour constante le produit ionique de l'eau : $K_e = [H_3O^+][OH^-]$, avec $K_e = 10^{-14}$ à 25°C. Pour tout couple acide/base conjugué : $K_a \\times K_b = K_e$.</p>

    <h3>2. Le pH</h3>
    <div class="formula-box">$$pH = -\\log[H_3O^+] \\iff [H_3O^+] = 10^{-pH}$$</div>
    <table class="mini-table">
      <tr><th>Type de solution</th><th>Condition</th><th>pH</th></tr>
      <tr><td>Acide</td><td>$[H_3O^+]>[OH^-]$</td><td>pH &lt; 7</td></tr>
      <tr><td>Neutre</td><td>$[H_3O^+]=[OH^-]$</td><td>pH = 7</td></tr>
      <tr><td>Basique</td><td>$[H_3O^+]<[OH^-]$</td><td>pH &gt; 7</td></tr>
    </table>

    <h3>3. Formules de pH selon le type d'électrolyte</h3>
    <p>Pour une concentration molaire volumique $C$ :</p>
    <table class="mini-table">
      <tr><th>Électrolyte</th><th>Exemple</th><th>Formule</th></tr>
      <tr><td>Monoacide fort</td><td>HCl</td><td>$pH = -\\log C$</td></tr>
      <tr><td>Diacide fort</td><td>$H_2SO_4$</td><td>$pH = -\\log 2C$</td></tr>
      <tr><td>Monobase forte</td><td>NaOH</td><td>$pH = pK_e + \\log C$</td></tr>
      <tr><td>Dibase forte</td><td>$Ca(OH)_2$</td><td>$pH = pK_e + \\log 2C$</td></tr>
      <tr><td>Monoacide faible</td><td>$R\\text{-}COOH$</td><td>$pH = \\frac{1}{2}(pK_a - \\log C)$</td></tr>
      <tr><td>Monobase faible</td><td>$NH_3$</td><td>$pH = \\frac{1}{2}(pK_e + pK_a + \\log C)$</td></tr>
      <tr><td>Sel d'acide fort + base forte</td><td>NaCl</td><td>$pH = \\frac{1}{2}pK_e = 7$</td></tr>
      <tr><td>Sel d'acide faible + base forte</td><td>$CH_3COONa$</td><td>$pH = \\frac{1}{2}(pK_e+pK_a+\\log C)$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Ces formules approchées reposent toutes sur des simplifications valables dans des conditions données (concentration ni trop faible ni trop forte) — elles doivent être redémontrées avec l'exemple à l'appui plutôt que mémorisées aveuglément.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le pH sanguin humain est maintenu presque constant (7,35–7,45) malgré la production continue d'acides métaboliques par les cellules, grâce à des systèmes tampons biologiques (notamment le couple CO₂/HCO₃⁻). Une variation de pH sanguin de seulement 0,4 unité au-delà de cette plage peut s'avérer mortelle. Pourquoi une échelle logarithmique comme le pH rend-elle une variation apparemment « petite » en apparence (0,4 unité) en réalité très significative en termes de concentration réelle d'ions H₃O⁺ ?
    </div>

    <h3>4. Solubilité d'un sel peu soluble : le produit de solubilité $K_s$</h3>
    <p>Certains sels ioniques se dissolvent peu dans l'eau, avec un équilibre hétérogène de dissolution : $A_pM_q(s) \\rightleftharpoons pA^{q-} + qM^{p+}$, dont la constante est le <strong>produit de solubilité</strong> :</p>
    <div class="formula-box">$$K_s = [A^{q-}]^p\\,[M^{p+}]^q$$</div>
    <p>La <strong>solubilité</strong> $s$ est la quantité de sel dissous par litre. On l'exprime en fonction de la concentration de l'ion affecté du plus petit coefficient stœchiométrique :</p>
    <table class="mini-table">
      <tr><th>Sel</th><th>Équilibre</th><th>$K_s$ en fonction de $s$</th></tr>
      <tr><td>AgCl (type AB)</td><td>$Ag^+ + Cl^-$</td><td>$K_s = s^2$</td></tr>
      <tr><td>$La(IO_3)_3$ (type AB₃)</td><td>$La^{3+} + 3IO_3^-$</td><td>$K_s = 27s^4$</td></tr>
    </table>

    <h3>5. Facteurs influençant la solubilité</h3>
    <ul style="margin:12px 0 12px 20px; font-size:0.94rem; color:var(--ink-soft);">
      <li>La solubilité <strong>croît avec la température</strong> (loi de Van't Hoff).</li>
      <li>La solubilité <strong>diminue en présence d'un ion commun</strong> (effet d'ion commun) : ajouter du $Cl^-$ dans une solution saturée d'AgCl déplace l'équilibre vers la précipitation.</li>
      <li>Le <strong>pH influence la solubilité</strong> des sels dont l'équilibre de dissolution produit des ions $OH^-$ (ou implique un anion basique, comme les carbonates).</li>
    </ul>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'acidification des océans, due à l'absorption croissante de CO₂ atmosphérique, menace directement les récifs coralliens : le carbonate de calcium (CaCO₃) qui compose leur squelette devient plus soluble lorsque le pH de l'eau de mer diminue. En reliant cela aux facteurs influençant la solubilité que tu viens d'étudier, explique pourquoi une simple baisse de pH océanique peut littéralement dissoudre les structures coralliennes existantes.
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>L'acidification des océans, conséquence directe de l'absorption d'environ un quart du CO₂ émis par les activités humaines depuis le début de l'ère industrielle, a fait chuter le pH moyen des océans d'environ 0,1 unité depuis 1850 — une variation qui semble modeste sur l'échelle logarithmique du pH, mais qui correspond en réalité à une augmentation d'environ 30 % de la concentration en ions H₃O⁺. Les chercheurs en biologie marine étudient activement comment les organismes calcifiants (coraux, mollusques, certains planctons) pourraient s'adapter, ou non, à cette évolution rapide de la chimie océanique.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des stratégies efficaces d'atténuation locale de l'acidification océanique (par exemple en restaurant des écosystèmes qui capturent naturellement le CO₂, comme les herbiers marins) pour protéger des zones critiques comme les récifs coralliens ? C'est un axe de recherche actif en océanographie chimique et en écologie de la restauration.</p>
    <p><strong>Technologie émergente :</strong> les capteurs de pH océanique autonomes, déployés en réseau à grande échelle par des flotteurs robotisés, permettent aujourd'hui de cartographier en temps réel l'évolution de l'acidification des océans à l'échelle planétaire, une donnée cruciale pour la recherche climatique.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Électrolyte fort ou faible → équilibre acido-basique (Ka, Kb) → pH selon le type de solution → sel peu soluble : équilibre de dissolution → Ks → solubilité (influencée par T, ion commun, pH)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$pH = -\\log[H_3O^+]$$
      Cette échelle logarithmique, inventée par Sørensen pour résoudre un problème de brasserie, compresse quatorze ordres de grandeur de concentration en une échelle intuitive de 0 à 14 — un outil aujourd'hui indispensable, de la chimie analytique de laboratoire jusqu'à la régulation du pH sanguin qui maintient chaque être humain en vie.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Électrolyte fort = totalement dissocié ; faible = partiellement dissocié, donnant un équilibre (Ka ou Kb)</li>
        <li>pH = −log[H₃O⁺] ; Ka·Kb = Ke = 10⁻¹⁴ à 25°C pour tout couple acide/base conjugué</li>
        <li>Chaque type d'électrolyte a sa propre formule de pH — retenir surtout dans quel cas utiliser laquelle</li>
        <li>Ks = produit des concentrations ioniques à saturation ; la solubilité en dépend selon la stœchiométrie du sel</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser la formule d'un acide fort pour un acide faible (oublier le facteur ½ et le pKa)</li>
        <li>Oublier le facteur 2 pour un diacide fort ou une dibase forte</li>
        <li>Se tromper d'exposant en reliant Ks et s selon la stœchiométrie du sel (AB, AB₂, AB₃...)</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — calculateur de pH</span>
      <div class="sim-2col">
        <div class="sim-controls" style="min-width:280px;">
          <label>Type d'électrolyte</label>
          <select id="phType" onchange="updatePhCalc()">
            <option value="monoacide_fort">Monoacide fort (ex. HCl)</option>
            <option value="diacide_fort">Diacide fort (ex. H2SO4)</option>
            <option value="monobase_forte">Monobase forte (ex. NaOH)</option>
            <option value="monoacide_faible" selected>Monoacide faible (ex. CH3COOH)</option>
            <option value="monobase_faible">Monobase faible (ex. NH3)</option>
          </select>
          <label>Concentration C (mol/L)</label><input type="number" id="phC" value="0.1" step="0.01" oninput="updatePhCalc()">
          <div id="phPkRow"><label>pKa du couple</label><input type="number" id="phPk" value="4.8" step="0.1" oninput="updatePhCalc()"></div>
          <div class="sim-readout" id="phReadout"></div>
        </div>
      </div>

      <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:20px;"><strong>Calculateur — solubilité à partir de Ks</strong></p>
      <div class="sim-2col">
        <div class="sim-controls" style="min-width:280px;">
          <label>Type de sel</label>
          <select id="ksType" onchange="updateKsCalc()">
            <option value="AB">Type AB (ex. AgCl) — Ks = s²</option>
            <option value="AB2">Type AB₂ ou A₂B (ex. Ca(OH)₂) — Ks = 4s³</option>
            <option value="AB3">Type AB₃ (ex. La(IO₃)₃) — Ks = 27s⁴</option>
          </select>
          <label>Ks</label><input type="number" id="ksVal" value="1.8e-10" step="any" oninput="updateKsCalc()">
          <div class="sim-readout" id="ksReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Quelle est la relation entre Ka et Kb d'un même couple acide/base à 25°C ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th6e1" value="wrong"> Ka + Kb = 14</label>
          <label class="option"><input type="radio" name="th6e1" value="right"> Ka × Kb = 10⁻¹⁴</label>
          <label class="option"><input type="radio" name="th6e1" value="wrong"> Ka = Kb</label>
          <label class="option"><input type="radio" name="th6e1" value="wrong"> Ka − Kb = 0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th6e1','th6fb1','Correct — Ka×Kb = Ke = 10⁻¹⁴ à 25°C pour tout couple acide/base conjugué.','Relis le cours : pour tout couple, Ka × Kb = Ke, et Ke = 10⁻¹⁴ à 25°C (pas leur somme).')">Vérifier</button>
        <div class="feedback" id="th6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une solution a pH = 3. Quelle est sa concentration en H₃O⁺ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th6e2" value="wrong"> 3 mol/L</label>
          <label class="option"><input type="radio" name="th6e2" value="right"> 10⁻³ mol/L</label>
          <label class="option"><input type="radio" name="th6e2" value="wrong"> 10³ mol/L</label>
          <label class="option"><input type="radio" name="th6e2" value="wrong"> −3 mol/L</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th6e2','th6fb2','Correct — [H3O+] = 10^(−pH) = 10⁻³ mol/L.','Utilise [H3O+] = 10^(−pH), pas simplement pH lui-même.')">Vérifier</button>
        <div class="feedback" id="th6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Ajouter du chlorure de sodium (NaCl) dans une solution saturée d'AgCl a pour effet de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="th6e3" value="wrong"> augmenter la solubilité d'AgCl</label>
          <label class="option"><input type="radio" name="th6e3" value="right"> diminuer la solubilité d'AgCl</label>
          <label class="option"><input type="radio" name="th6e3" value="wrong"> n'a aucun effet</label>
          <label class="option"><input type="radio" name="th6e3" value="wrong"> dissoudre tout l'AgCl</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th6e3','th6fb3','Correct — c\\'est l\\'effet d\\'ion commun (ici Cl⁻) : la solubilité d\\'AgCl diminue.','NaCl apporte des ions Cl⁻, déjà présents dans l\\'équilibre de dissolution d\\'AgCl — c\\'est l\\'effet d\\'ion commun, qui diminue la solubilité.')">Vérifier</button>
        <div class="feedback" id="th6fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'eau n'était pas amphotère (incapable de jouer à la fois le rôle d'acide et de base) : la chimie des solutions aqueuses serait-elle radicalement différente ?</li>
        <li>Pourquoi Sørensen, en travaillant initialement sur le contrôle qualité de la bière, a-t-il eu l'idée d'une échelle logarithmique plutôt que de simplement utiliser la concentration en ions H₃O⁺ directement ?</li>
        <li>Quelle serait la conséquence, pour les écosystèmes marins mondiaux, d'une poursuite non maîtrisée de l'acidification des océans au cours du siècle à venir ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>S. P. L. Sørensen, « Über die Messung und die Bedeutung der Wasserstoffionenkonzentration bei enzymatischen Prozessen », Biochemische Zeitschrift, 1909 — l'article fondateur de l'échelle de pH.</li>
        <li>P. Atkins, J. de Paula, <em>Chimie physique</em>, De Boeck — référence standard sur les équilibres acido-basiques et de solubilité en licence.</li>
        <li>GIEC (Groupe d'experts intergouvernemental sur l'évolution du climat), <em>Rapport spécial sur l'océan et la cryosphère dans le contexte du changement climatique</em>, 2019 — synthèse de référence sur l'acidification des océans.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais calculer le pH de n'importe quelle solution aqueuse courante, et prédire la solubilité de sels peu solubles — des compétences directement mobilisables aussi bien en laboratoire qu'en médecine, en agronomie ou en sciences environnementales. Le chapitre suivant, « Expression des concentrations et dosages », va te donner les outils pratiques pour préparer et analyser quantitativement des solutions, un savoir-faire indispensable à toute manipulation en chimie analytique. Comme le rappelle l'exemple frappant de l'acidification des océans : une échelle logarithmique conçue à l'origine pour contrôler la qualité de la bière régit aujourd'hui, à l'échelle planétaire, la survie même de certains des écosystèmes les plus riches de notre planète.</p>
  `,
  init: function(){ initPhCalc(); initKsCalc(); }
};

THERMO_NOVA_KB[thKey('Équilibres ioniques, pH et solubilité')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Équilibres ioniques, pH et solubilité ». Demande-moi comment calculer un pH, ce qu'est le produit de solubilité, ou un indice sur un exercice.",
  rules: [
    { test:/\\bph\\b/i, replies:["pH = −log[H3O+], donc [H3O+] = 10^(−pH). Chaque type d'électrolyte (acide fort, faible, base, sel) a sa propre formule de pH — vérifie bien lequel s'applique à ton cas."] },
    { test:/\\bka\\b|\\bkb\\b|acidit[ée]|basicit[ée]/i, replies:["Ka mesure la force d'un acide faible : Ka = [A⁻][H3O+]/[AH]. Kb mesure celle d'une base faible. Pour un couple conjugué, Ka×Kb = Ke = 10⁻¹⁴ à 25°C."] },
    { test:/produit de solubilit[ée]|\\bks\\b/i, replies:["Le produit de solubilité Ks = [ions]^coefficients à saturation. Pour AgCl (type AB), Ks=s² ; pour un sel type AB3, Ks=27s⁴ — l'exposant dépend de la stœchiométrie."] },
    { test:/ion commun/i, replies:["L'effet d'ion commun : ajouter un ion déjà présent dans l'équilibre de dissolution d'un sel peu soluble déplace l'équilibre vers la précipitation, ce qui DIMINUE la solubilité."] },
    { test:/[ée]lectrolyte fort|[ée]lectrolyte faible/i, replies:["Un électrolyte fort est totalement dissocié en solution (HCl, NaOH...). Un électrolyte faible n'est que partiellement dissocié, ce qui crée un équilibre chimique caractérisé par Ka ou Kb."] },
    { test:/amphot[èe]re|autoprotolyse/i, replies:["L'eau est amphotère : elle peut jouer le rôle d'acide (couple H2O/OH⁻) ou de base (couple H3O+/H2O). Son autoprotolyse donne Ke = [H3O+][OH-] = 10⁻¹⁴ à 25°C."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repense à la relation entre Ka, Kb et Ke pour un couple conjugué.","Indice niveau 2 : c'est un PRODUIT, pas une somme.","Indice niveau 3 : Ka × Kb = Ke = 10⁻¹⁴."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise la relation entre pH et [H3O+].","Indice niveau 2 : [H3O+] = 10^(−pH), pas pH directement.","Indice niveau 3 : 10^(−3) = 10⁻³ mol/L."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : NaCl apporte quel ion déjà présent dans l'équilibre de dissolution d'AgCl ?","Indice niveau 2 : Cl⁻ est commun aux deux.","Indice niveau 3 : c'est l'effet d'ion commun, qui diminue la solubilité."] }
  ]
};

/* =========================== CHAPITRE 7 =========================== */
THERMO_CHAPTERS[thKey('Expression des concentrations et dosages')] = {
  objectives: [
    "Distinguer et convertir entre molarité, normalité, molalité, %massique, fraction massique et concentration pondérale",
    "Relier normalité et molarité via le nombre d'ions ou d'électrons échangés par le soluté",
    "Appliquer la relation d'équivalence N₁V₁ = N₂V₂ lors d'un dosage",
    "Résoudre un problème complet de préparation de solution à partir de données industrielles (densité, %massique)",
    "Évaluer, face à un problème de dilution industrielle, quelle grandeur de concentration (molarité, normalité, molalité...) est la plus pertinente selon le contexte"
  ],
  prereqs: ["Réactions chimiques : oxydoréduction et équilibrage", "Équilibres ioniques, pH et solubilité"],
  bodyHtml: `
    <p>Dans les années 1850, l'essor de la chimie industrielle — production d'acide sulfurique, de soude, de teintures synthétiques — impose aux chimistes un défi pratique nouveau : comment communiquer sans ambiguïté la concentration exacte d'une solution entre un fournisseur de réactifs et un client industriel, alors que les conventions varient encore d'un laboratoire à l'autre ? C'est pour répondre à ce besoin de standardisation que se généralisent progressivement les différentes échelles de concentration que ce chapitre te propose de maîtriser — chacune adaptée à un contexte précis, de la simple préparation de laboratoire jusqu'aux cuves industrielles de plusieurs milliers de litres.</p>
    <p>Cette diversité d'échelles, qui peut sembler à première vue une complication inutile, répond en réalité à des besoins pratiques bien réels : la normalité facilite considérablement les calculs de dosage (elle rend la relation d'équivalence indépendante de la nature exacte de la réaction), tandis que la molalité, insensible aux variations de température et de pression (contrairement à la molarité, qui dépend du volume de la solution), est privilégiée dans les études physico-chimiques précises. Savoir naviguer entre ces différentes échelles, et convertir sans erreur de l'une à l'autre, est une compétence directement transposable à tout laboratoire d'analyse ou toute usine chimique.</p>
    <p>Avant de dissoudre un composé, de doser une solution ou de calculer un équilibre, il faut savoir exprimer une concentration de façon cohérente. Un même flacon d'acide industriel peut être décrit par son pourcentage massique, sa densité, sa molarité ou sa normalité — et il faut pouvoir passer de l'une à l'autre sans erreur, car ce sont exactement ces conversions qui sont demandées à l'examen. À la fin de ce chapitre, tu sauras résoudre n'importe quel problème de préparation ou de dosage de solution, à partir de données industrielles brutes.</p>

    <h3>1. Les six expressions usuelles de concentration</h3>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Définition</th><th>Unité usuelle</th></tr>
      <tr><td><strong>Molarité</strong> $C$</td><td>nombre de moles de soluté par litre de solution</td><td>$\\text{mol.L}^{-1}$</td></tr>
      <tr><td><strong>Normalité</strong> $N$</td><td>nombre d'équivalents-gramme de soluté par litre de solution</td><td>$\\text{éq.g.L}^{-1}$</td></tr>
      <tr><td><strong>Molalité</strong> $m$</td><td>nombre de moles de soluté par kg de <em>solvant</em> (pas de solution !)</td><td>$\\text{mol.kg}^{-1}$</td></tr>
      <tr><td><strong>Pourcentage massique</strong> (titre)</td><td>masse de soluté pour 100 g de solution</td><td>%</td></tr>
      <tr><td><strong>Fraction massique</strong> $W_i$</td><td>$W_i = m_i/\\sum m_i$</td><td>sans unité</td></tr>
      <tr><td><strong>Fraction molaire</strong> $X_i$</td><td>$X_i = n_i/\\sum n_i$</td><td>sans unité</td></tr>
      <tr><td><strong>Concentration pondérale</strong> $C_p$</td><td>masse de soluté par litre de solution</td><td>$\\text{g.L}^{-1}$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — ne pas confondre molalité et molarité</span>
      La molarité rapporte les moles de soluté au volume de la <strong>solution</strong> ; la molalité les rapporte à la masse du <strong>solvant seul</strong>. Elles ne coïncident presque jamais, sauf en solution très diluée dans l'eau.
    </div>

    <h3>2. Relier les grandeurs entre elles</h3>
    <table class="mini-table">
      <tr><th>Relation</th><th>Ce qu'elle donne</th></tr>
      <tr><td>$C_p = C \\cdot M_{soluté}$</td><td>concentration pondérale à partir de la molarité et de la masse molaire</td></tr>
      <tr><td>$N = n \\cdot C$</td><td>normalité à partir de la molarité, avec $n$ le nombre d'ions-gramme (ou d'électrons-gramme) mis en jeu par mole de soluté</td></tr>
      <tr><td>$\\sum W_i = 1$</td><td>dans tout mélange, les fractions massiques des constituants somment à 1</td></tr>
      <tr><td>$\\sum X_i = 1$</td><td>de même pour les fractions molaires</td></tr>
    </table>
    <p>Le nombre $n$ de la normalité dépend du soluté : pour un acide, c'est le nombre de $H^+$ cessibles ($HCl\\to 1$, $H_2SO_4\\to 2$) ; pour une base, le nombre de $OH^-$ (ou de $H^+$ captables) ; pour une réaction d'oxydoréduction, le nombre d'électrons échangés (voir la notion d'équivalent-gramme, chapitre 4).</p>

    <h3>3. Passer d'une densité et d'un %massique à la molarité</h3>
    <p>Les fournisseurs de réactifs industriels donnent presque toujours la concentration d'un acide concentré sous la forme « %massique + densité ». La méthode se déroule toujours dans le même ordre :</p>
    <div class="formula-box">$$C_p\\,(\\text{g/L}) = \\frac{\\%}{100}\\times \\rho\\,(\\text{g/L}) \\qquad\\qquad C\\,(\\text{mol/L}) = \\frac{C_p}{M}$$</div>
    <div class="key-point">
      <span class="eyebrow">Attention à l'unité de la densité</span>
      En chimie industrielle, la densité est souvent donnée en $\\text{kg/dm}^3$ — numériquement identique à des $\\text{g/mL}$ ou des $\\text{g/cm}^3$. Pour l'exprimer en $\\text{g/L}$ (l'unité qu'il faut pour $C_p$), il suffit de multiplier par 1000 : $1\\ \\text{kg/dm}^3 = 1000\\ \\text{g/L}$.
    </div>

    <h3>4. Le dosage : la relation d'équivalence</h3>
    <p>Lorsqu'on dose une solution de normalité $N_1$ et de volume $V_1$ par une solution de normalité $N_2$ et de volume $V_2$, l'équivalence est atteinte quand :</p>
    <div class="formula-box">$$N_1V_1 = N_2V_2$$</div>
    <p>Cette relation reste valable quel que soit le nombre de protons ou d'électrons échangés par chaque espèce — c'est justement tout l'intérêt de raisonner en équivalents plutôt qu'en moles : à l'équivalence, les réactifs réagissent toujours équivalent pour équivalent.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — problème complet type examen</span>
      <p><strong>Énoncé :</strong> une solution concentrée d'acide sulfurique contient 49% en masse de soluté pur, pour une masse volumique de $1{,}385\\ \\text{kg/dm}^3$. Quelle masse de soluté contiennent 500 mL de cette solution ? Déterminer la molarité, la normalité, la concentration pondérale, la molalité et la fraction massique du solvant. Quel volume faut-il diluer pour réaliser 400 mL de solution de normalité $0{,}5\\ \\text{éq.g.L}^{-1}$ ?</p>
      <p><strong>Solution :</strong> la masse volumique de la solution est $\\rho = 1385\\ \\text{g/L}$.</p>
      <p>1) Concentration pondérale : $C_p = 0{,}49\\times1385 = 678{,}65\\ \\text{g/L}$. Dans 500 mL : $m = 678{,}65\\times0{,}5 \\approx 339{,}3\\ \\text{g}$.</p>
      <p>2) Molarité ($M(H_2SO_4)=98\\ \\text{g/mol}$) : $C = 678{,}65/98 \\approx 6{,}93\\ \\text{mol/L}$.</p>
      <p>3) Normalité (diacide, $n=2$) : $N = 2\\times6{,}93 \\approx 13{,}86\\ \\text{éq.g/L}$.</p>
      <p>4) Molalité : masse de solvant dans 1 L $= 1385-678{,}65 = 706{,}35\\ \\text{g} = 0{,}70635\\ \\text{kg}$, donc $m = 6{,}93/0{,}70635 \\approx 9{,}81\\ \\text{mol/kg}$.</p>
      <p>5) Fraction massique du solvant : $W_{eau} = 706{,}35/1385 \\approx 0{,}51$ (soit 51%, cohérent avec les 49% de soluté).</p>
      <p>6) Dilution : $N_1V_1 = N_2V_2 \\Rightarrow V_1 = \\dfrac{N_2V_2}{N_1} = \\dfrac{0{,}5\\times400}{13{,}86} \\approx 14{,}4\\ \\text{mL}$.</p>
      <p class="example-answer">Réponse : il faut prélever environ 14,4 mL de la solution concentrée et compléter à 400 mL avec de l'eau distillée.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Ce problème type examen mobilise, dans une seule résolution, la densité, le pourcentage massique, la molarité, la normalité, la molalité, la fraction massique et la relation d'équivalence — soit pratiquement toutes les notions de ce chapitre. En observant l'ordre dans lequel ces grandeurs ont été calculées (Cp d'abord, puis C, puis N...), quelle est, selon toi, la grandeur « pivot » à partir de laquelle toutes les autres se déduisent le plus naturellement ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La précision des dosages volumétriques, maîtrisée depuis le XIXe siècle, reste aujourd'hui un pilier de l'industrie pharmaceutique et agroalimentaire, où le contrôle qualité exige une traçabilité rigoureuse des concentrations à chaque étape de production. Les techniques modernes de dosage automatisé, couplées à des capteurs électrochimiques ou spectroscopiques, permettent désormais de réaliser en continu des milliers de dosages par jour avec une précision largement supérieure à celle obtensible manuellement, tout en réduisant les risques d'erreur humaine.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des capteurs miniaturisés et peu coûteux, capables de mesurer en temps réel et sur le terrain la concentration précise de polluants dans l'eau ou l'air, sans recourir à un dosage classique en laboratoire ? C'est un enjeu de recherche majeur pour la surveillance environnementale à grande échelle.</p>
    <p><strong>Technologie émergente :</strong> les laboratoires sur puce (« lab-on-a-chip »), qui miniaturisent l'ensemble d'un protocole de dosage chimique sur une puce de la taille d'une carte de crédit, permettent aujourd'hui des analyses de concentration rapides et peu coûteuses, avec des applications allant du diagnostic médical décentralisé au contrôle qualité industriel embarqué.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Donnée industrielle brute (%massique, densité) → concentration pondérale Cp → molarité C → normalité N (selon n) → relation d'équivalence N₁V₁=N₂V₂ → dosage ou dilution précis
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$N_1V_1 = N_2V_2$$
      Cette relation d'équivalence, d'une simplicité redoutable, est l'outil de calcul le plus utilisé de toute la chimie analytique quantitative — elle reste valable quel que soit le nombre de protons ou d'électrons échangés par chaque espèce, ce qui en fait le pont universel entre n'importe quel couple de réactifs dosés l'un par l'autre.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Molarité (mol/L de solution) ≠ molalité (mol/kg de solvant) — ne jamais les confondre</li>
        <li>$C_p = C\\cdot M$ et $N = n\\cdot C$, où $n$ dépend du soluté (protons, OH⁻, ou électrons échangés)</li>
        <li>Densité en kg/dm³ ×1000 pour l'avoir en g/L avant tout calcul de $C_p$</li>
        <li>À l'équivalence d'un dosage : $N_1V_1 = N_2V_2$, quel que soit le nombre de protons échangés par chaque espèce</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de convertir la densité (souvent en kg/dm³) en g/L avant de calculer $C_p$</li>
        <li>Utiliser la masse de solution au lieu de la masse de solvant seul pour la molalité</li>
        <li>Oublier le facteur $n$ (nombre de charges échangées) en passant de la molarité à la normalité pour un diacide ou une dibase</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — convertisseur de concentration</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre le %massique, la densité (en kg/dm³), la masse molaire et le nombre d'équivalents par mole : obtiens toutes les autres expressions de la concentration.</p>
      <div class="sim-2col">
        <div class="sim-controls" style="min-width:280px;">
          <label>Pourcentage massique (%)</label><input type="number" id="ccPct" value="49" step="0.5" oninput="updateConcConv()">
          <label>Densité (kg/dm³ = g/mL)</label><input type="number" id="ccDens" value="1.385" step="0.005" oninput="updateConcConv()">
          <label>Masse molaire M (g/mol)</label><input type="number" id="ccM" value="98" step="1" oninput="updateConcConv()">
          <label>n (charges échangées par mole)</label><input type="number" id="ccN" value="2" step="1" oninput="updateConcConv()">
          <div class="sim-readout" id="ccReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une solution de NaOH a une molarité de 0,2 mol/L. Quelle est sa normalité ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th7e1" value="wrong"> 0,1 éq.g/L</label>
          <label class="option"><input type="radio" name="th7e1" value="right"> 0,2 éq.g/L</label>
          <label class="option"><input type="radio" name="th7e1" value="wrong"> 0,4 éq.g/L</label>
          <label class="option"><input type="radio" name="th7e1" value="wrong"> 2 éq.g/L</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th7e1','th7fb1','Correct — NaOH ne libère qu\\'un seul OH⁻ par mole (n=1), donc N=C=0,2 éq.g/L.','NaOH est une monobase : n=1, donc N=n×C=1×0,2.')">Vérifier</button>
        <div class="feedback" id="th7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">On dose 20 mL d'une solution acide de normalité inconnue par 15 mL d'une base de normalité 0,1 éq.g/L. Quelle est la normalité de l'acide ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th7e2" value="wrong"> 0,133 éq.g/L</label>
          <label class="option"><input type="radio" name="th7e2" value="right"> 0,075 éq.g/L</label>
          <label class="option"><input type="radio" name="th7e2" value="wrong"> 0,1 éq.g/L</label>
          <label class="option"><input type="radio" name="th7e2" value="wrong"> 0,3 éq.g/L</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th7e2','th7fb2','Correct — N1V1=N2V2 donne N1=(0,1×15)/20=0,075 éq.g/L.','Utilise N1V1=N2V2, avec l\\'acide en indice 1 (V1=20) et la base en indice 2 (N2=0,1, V2=15).')">Vérifier</button>
        <div class="feedback" id="th7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une solution a une molarité de 2 mol/L et une masse volumique de 1100 g/L. Sa concentration pondérale est-elle plus proche de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="th7e3" value="wrong"> 2 g/L</label>
          <label class="option"><input type="radio" name="th7e3" value="wrong"> 550 g/L</label>
          <label class="option"><input type="radio" name="th7e3" value="right"> dépend de la masse molaire M du soluté (Cp = C×M)</label>
          <label class="option"><input type="radio" name="th7e3" value="wrong"> 1100 g/L obligatoirement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th7e3','th7fb3','Correct — Cp=C×M nécessite de connaître M ; la masse volumique de la solution seule ne suffit pas à calculer Cp.','Cp = C × M(soluté) : sans connaître la masse molaire du soluté, impossible de trouver Cp uniquement à partir de C.')">Vérifier</button>
        <div class="feedback" id="th7fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si une seule et unique échelle de concentration existait (par exemple uniquement la molarité) : quelles difficultés pratiques cela poserait-il pour l'industrie chimique et les dosages ?</li>
        <li>Pourquoi la molalité, contrairement à la molarité, reste-t-elle rigoureusement constante lorsque la température de la solution varie ?</li>
        <li>Quelle serait la conséquence, pour le contrôle qualité pharmaceutique, d'une méthode de dosage automatisée totalement fiable et instantanée, remplaçant les protocoles manuels actuels ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. B. Dumas, <em>Traité de chimie appliquée aux arts</em>, 1828-1846 — ouvrage de référence historique sur les débuts de la chimie analytique industrielle.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur l'expression des concentrations et les dosages en licence.</li>
        <li>IUPAC, <em>Quantities, Units and Symbols in Physical Chemistry (Green Book)</em>, Royal Society of Chemistry, 3e édition — nomenclature officielle internationale des grandeurs de concentration.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais résoudre n'importe quel problème de préparation ou de dosage de solution, des données industrielles brutes jusqu'au résultat final précis. Le dernier chapitre de ce module, « Méthodologie — exercices type examen », va rassembler l'ensemble des outils vus depuis le premier chapitre — thermodynamique, équilibres, oxydoréduction, concentrations — dans une démarche méthodologique globale pour aborder sereinement n'importe quel problème complet de thermochimie. Comme le rappelle l'exigence même de ce chapitre : en chimie, une concentration mal exprimée ou mal convertie peut fausser tout un calcul en aval — la rigueur dans le choix de l'échelle appropriée n'est jamais un détail secondaire.</p>
  `,
  init: initConcConv
};

THERMO_NOVA_KB[thKey('Expression des concentrations et dosages')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Expression des concentrations et dosages ». Demande-moi la différence entre molarité et normalité, comment convertir un %massique en molarité, ou un indice sur un exercice.",
  rules: [
    { test:/molarit[ée]/i, replies:["La molarité C est le nombre de moles de soluté par litre de SOLUTION (pas de solvant). C'est la grandeur la plus utilisée en chimie."] },
    { test:/normalit[ée]/i, replies:["La normalité N = n×C, où n est le nombre d'ions-gramme ou d'électrons-gramme échangés par mole de soluté. Elle est très pratique pour les dosages car N1V1=N2V2 à l'équivalence, quel que soit n."] },
    { test:/molalit[ée]/i, replies:["Attention à ne pas confondre avec la molarité : la molalité rapporte les moles de soluté à la masse du SOLVANT seul (en kg), pas au volume de la solution."] },
    { test:/densit[ée]|masse volumique/i, replies:["Une densité donnée en kg/dm³ est numériquement identique à des g/mL ou g/cm³. Pour l'utiliser dans Cp = (%/100)×ρ, exprime-la d'abord en g/L (×1000)."] },
    { test:/dosage|[ée]quivalence/i, replies:["À l'équivalence d'un dosage, N1V1 = N2V2 — cette relation est vraie quel que soit le nombre de protons ou d'électrons échangés par chaque espèce, c'est tout l'intérêt de la normalité."] },
    { test:/fraction massique|fraction molaire/i, replies:["La fraction massique Wi = mi/Σmi et la fraction molaire Xi = ni/Σni. Dans les deux cas, la somme sur tous les constituants du mélange vaut toujours 1."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : NaOH ne libère qu'un seul type d'ion OH⁻ par mole.","Indice niveau 2 : donc n=1 pour NaOH.","Indice niveau 3 : N=n×C=1×0,2=0,2 éq.g/L."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise N1V1=N2V2 avec l'acide en 1 et la base en 2.","Indice niveau 2 : N1=(N2×V2)/V1=(0,1×15)/20.","Indice niveau 3 : N1=1,5/20=0,075 éq.g/L."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : repense à la formule Cp=C×M — quelle grandeur manque-t-il ici ?","Indice niveau 2 : la masse molaire M du soluté n'est pas donnée.","Indice niveau 3 : on ne peut donc pas calculer Cp sans elle."] }
  ]
};

/* =========================== CHAPITRE 8 =========================== */
THERMO_CHAPTERS[thKey('Méthodologie — exercices type examen')] = {
  objectives: [
    "Reconnaître, à la lecture d'un énoncé, quel outil des chapitres précédents mobiliser",
    "Combiner loi de Hess et cycle énergétique (type Born-Haber) sur un exemple complet",
    "Appliquer la loi de Kirchhoff pour extrapoler une enthalpie de réaction à une autre température",
    "S'entraîner sur des problèmes calqués sur d'anciens sujets d'examen de thermodynamique chimique",
    "Évaluer, dans un problème complexe combinant plusieurs sous-questions, l'ordre optimal de résolution pour éviter de propager une erreur d'une étape à l'autre"
  ],
  prereqs: ["Systèmes, transformations et travail thermodynamique", "Premier principe et thermochimie", "Deuxième principe : entropie et enthalpie libre", "Équilibres chimiques et loi d'action de masse"],
  bodyHtml: `
    <p>Les examens de thermodynamique chimique ont ceci de particulier qu'ils ne testent presque jamais une seule notion isolée : un problème type combine généralement plusieurs chapitres — loi de Hess pour établir une enthalpie de réaction, cycle de Born-Haber pour en déduire une grandeur atomique inconnue, loi de Kirchhoff pour l'extrapoler à une autre température. Cette structure n'a rien d'arbitraire : elle reflète fidèlement la façon dont un chimiste ou un ingénieur procède réellement en laboratoire ou en bureau d'études, où un même calcul mobilise systématiquement plusieurs outils théoriques enchaînés.</p>
    <p>Ce dernier chapitre n'introduit donc aucune notion nouvelle : il t'entraîne à développer le réflexe le plus précieux de toute la thermodynamique chimique appliquée — reconnaître, à la seule lecture d'un énoncé, quel outil mobiliser en premier, et dans quel ordre enchaîner les calculs pour éviter qu'une erreur commise tôt ne se propage et n'invalide tout le reste du problème.</p>
    <p>Ce chapitre ne présente pas de notion nouvelle : il entraîne à reconnaître, dans un énoncé d'examen, quel outil des chapitres précédents utiliser, puis à mener le calcul jusqu'au bout sans erreur d'unité. Les problèmes ci-dessous sont calqués sur des sujets réels de thermodynamique chimique. À la fin de ce chapitre — et de ce module —, tu sauras aborder sereinement n'importe quel problème complet de thermochimie, en identifiant instantanément la bonne stratégie de résolution.</p>

    <h3>1. Savoir reconnaître le bon outil</h3>
    <table class="mini-table">
      <tr><th>Ce que donne l'énoncé</th><th>Outil à utiliser</th><th>Voir</th></tr>
      <tr><td>Enthalpies de formation ou de réactions intermédiaires</td><td>Loi de Hess : $\\Delta H_R = \\sum\\Delta H_f(\\text{produits}) - \\sum\\Delta H_f(\\text{réactifs})$</td><td>Chapitre 2</td></tr>
      <tr><td>Énergies de liaison, de sublimation, d'ionisation...</td><td>Cycle énergétique (type Born-Haber / atomisation)</td><td>Chapitres 2 et 4</td></tr>
      <tr><td>$\\Delta H(T_1)$ connu + $C_p$ des espèces</td><td>Loi de Kirchhoff : $\\Delta H(T_2)=\\Delta H(T_1)+\\Delta C_p(T_2-T_1)$</td><td>Chapitre 2</td></tr>
      <tr><td>$\\Delta H^\\circ$ et $\\Delta S^\\circ$, question de spontanéité</td><td>$\\Delta G=\\Delta H-T\\Delta S$, température d'inversion</td><td>Chapitre 3</td></tr>
      <tr><td>$K_c$, $K_p$, dissociation, densité de vapeur</td><td>Loi d'action de masse, Le Chatelier</td><td>Chapitre 5</td></tr>
      <tr><td>%massique, densité, dosage</td><td>Conversions de concentration, $N_1V_1=N_2V_2$</td><td>Chapitre 7</td></tr>
    </table>

    <h3>2. Exemple type — loi de Hess : synthèse du méthanol</h3>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> on donne $C+\\frac12O_2\\to CO$ ($\\Delta H_1=-110{,}5$), $C+O_2\\to CO_2$ ($\\Delta H_2=-393{,}5$), $H_2+\\frac12O_2\\to H_2O$ ($\\Delta H_3=-286$), $CH_3OH+\\frac32O_2\\to CO_2+2H_2O$ ($\\Delta H_c=-676$, en kJ/mol). Calculer $\\Delta H$ de $CO+2H_2\\to CH_3OH$.</p>
      <p><strong>Solution :</strong> on construit les enthalpies de combustion de chaque espèce impliquée : $\\Delta H_c(CO)=\\Delta H_2-\\Delta H_1=-393{,}5-(-110{,}5)=-283$ ; $\\Delta H_c(H_2)=\\Delta H_3=-286$. La réaction cherchée équivaut à « brûler les réactifs, puis défaire la combustion du produit » :</p>
      <div class="formula-box">$$\\Delta H_R = [\\Delta H_c(CO)+2\\Delta H_c(H_2)] - \\Delta H_c(CH_3OH) = [-283+2(-286)]-(-676)$$</div>
      <p>= $-283-572+676 = -179\\ \\text{kJ/mol}$.</p>
      <p class="example-answer">Réponse : $\\Delta H_R = -179\\ \\text{kJ/mol}$ — la réaction de synthèse du méthanol est exothermique.</p>
    </div>

    <h3>3. Exemple type — cycle énergétique : énergie de liaison C–H de l'éthane</h3>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> $\\Delta H_f(C_2H_6,g)=-84{,}5$ ; sublimation du carbone $\\Delta H_{sub}=717$ ; liaison H–H $\\Delta H_{H-H}=435$ ; liaison C–C $\\Delta H_{C-C}=347$ (kJ/mol). Toutes les liaisons C–H de l'éthane ($CH_3-CH_3$) étant équivalentes, trouver l'énergie d'une liaison C–H.</p>
      <p><strong>Solution :</strong> on atomise complètement l'éthane à partir de ses éléments dans leur état standard, en passant par la réaction de formation inversée : $C_2H_6(g)\\to 2C(s)+3H_2(g)$, $\\Delta H=+84{,}5$ ; puis $2C(s)\\to2C(g)$, $\\Delta H=2\\times717=1434$ ; puis $3H_2(g)\\to6H(g)$, $\\Delta H=3\\times435=1305$. L'enthalpie totale d'atomisation de l'éthane (rupture de toutes ses liaisons) est donc $84{,}5+1434+1305=2823{,}5\\ \\text{kJ/mol}$.</p>
      <p>Or l'éthane compte exactement 1 liaison C–C et 6 liaisons C–H : $2823{,}5 = 1\\times E_{C-C} + 6\\times E_{C-H} = 347 + 6E_{C-H}$.</p>
      <p class="example-answer">Réponse : $E_{C-H} = (2823{,}5-347)/6 = 412{,}75\\ \\text{kJ/mol}$.</p>
    </div>

    <h3>4. Exemple type — loi de Kirchhoff appliquée à l'ammoniac</h3>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour $N_2(g)+3H_2(g)\\to2NH_3(g)$, on donne $\\Delta H(100°C)=-94{,}5\\ \\text{kJ}$, avec $C_P(N_2)=C_P(H_2)=30{,}19\\ \\text{J.mol}^{-1}\\text{K}^{-1}$ et $C_P(NH_3)=35{,}72\\ \\text{J.mol}^{-1}\\text{K}^{-1}$ (valeurs moyennes). Calculer $\\Delta H$ à 200°C.</p>
      <p><strong>Solution :</strong> $\\Delta C_p = 2C_P(NH_3)-[C_P(N_2)+3C_P(H_2)] = 2(35{,}72)-4(30{,}19) = 71{,}44-120{,}76=-49{,}32\\ \\text{J/K}$.</p>
      <p>Avec $T_1=373\\ \\text{K}$ et $T_2=473\\ \\text{K}$ : $\\Delta H(200°C) = -94\\,500 + (-49{,}32)\\times(473-373) = -94\\,500-4932=-99\\,432\\ \\text{J}$.</p>
      <p class="example-answer">Réponse : $\\Delta H(200°C) \\approx -99{,}432\\ \\text{kJ}$ — la réaction reste exothermique, un peu moins qu'à 100°C.</p>
    </div>

    <h3>5. Exemple type — cycle de Born-Haber : affinité électronique du brome</h3>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> $\\Delta H_f(NaBr,s)=-376$ ; énergie réticulaire $U(NaBr)=-736$ ; sublimation de Na : $+109$ ; potentiel d'ionisation de Na : $+490$ ; atomisation de $Br_2$ : $+192$ (kJ/mol). Calculer l'affinité électronique (AE) du brome.</p>
      <p><strong>Solution :</strong> le cycle de Born-Haber relie la formation directe à un chemin en 5 étapes : $\\Delta H_f = \\Delta H_{sub}(Na) + PI(Na) + \\frac12\\Delta H_{atom}(Br_2) + AE(Br) + U$.</p>
      <div class="formula-box">$$-376 = 109 + 490 + \\frac{192}{2} + AE + (-736)$$</div>
      <p>$109+490+96-736 = -41$, donc $-376 = -41+AE$.</p>
      <p class="example-answer">Réponse : $AE(Br) = -376-(-41) = -335\\ \\text{kJ/mol}$ — l'affinité électronique est négative, ce qui traduit un dégagement d'énergie quand l'atome de brome capte un électron.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Ce cycle de Born-Haber permet de déterminer l'affinité électronique du brome sans jamais la mesurer directement — une grandeur en réalité très difficile à mesurer expérimentalement avec précision pour de nombreux éléments. En observant que le cycle combine cinq étapes très différentes (sublimation, ionisation, atomisation, affinité électronique, énergie réticulaire), quelle propriété fondamentale de l'enthalpie (déjà rencontrée au chapitre 2) rend cette combinaison arbitraire d'étapes malgré tout rigoureusement valable ?
    </div>

    <h3>6. Compression réversible : isotherme contre adiabatique</h3>
    <p>Pour un gaz parfait, ne pas confondre les deux régimes classiques d'examen :</p>
    <table class="mini-table">
      <tr><th>Régime</th><th>Chaleur</th><th>Travail</th><th>Relation P-V</th></tr>
      <tr><td>Isotherme réversible</td><td>$Q=-W$ (car $\\Delta U=0$)</td><td>$W=-nRT\\ln(V_2/V_1)$</td><td>$PV=\\text{cste}$</td></tr>
      <tr><td>Adiabatique réversible</td><td>$Q=0$</td><td>$W=\\Delta U=nC_V\\Delta T$</td><td>$PV^{\\gamma}=\\text{cste}$, avec $\\gamma=C_P/C_V$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Sur un même diagramme $(P,V)$, la courbe adiabatique est toujours plus « raide » que l'isotherme au même point : comprimer un gaz sans échanger de chaleur fait davantage monter sa pression que le comprimer à température constante.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un cycliste qui gonfle rapidement un pneu avec une pompe observe que celle-ci chauffe sensiblement — un exemple concret de compression proche de l'adiabatique (trop rapide pour un échange de chaleur significatif avec l'extérieur). En relisant le tableau ci-dessus, pourquoi cette même compression, si elle était réalisée très lentement (donc plus proche de l'isotherme), chaufferait-elle beaucoup moins la pompe ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>La méthodologie que tu viens de pratiquer — combiner plusieurs lois thermodynamiques pour résoudre un problème complexe — reste la démarche fondamentale de toute l'ingénierie chimique et énergétique contemporaine : les cycles de Born-Haber modernisés permettent aujourd'hui de concevoir de nouveaux matériaux pour batteries en prédisant leur stabilité énergétique avant même leur synthèse ; la loi de Kirchhoff, appliquée à des réactions industrielles complexes, permet d'optimiser les conditions opératoires de procédés chimiques fonctionnant sur une large gamme de températures. Cette capacité à décomposer un problème complexe en une succession d'étapes plus simples, chacune gouvernée par une loi connue, reste l'une des compétences les plus transversales et les plus recherchées chez tout ingénieur chimiste.</p>
    <p><strong>Question ouverte :</strong> peut-on automatiser entièrement, par intelligence artificielle, la reconnaissance du bon enchaînement d'outils thermodynamiques à appliquer face à un problème complexe inédit, à la manière d'un expert humain chevronné ? C'est un axe de recherche émergent en chimie computationnelle assistée par IA.</p>
    <p><strong>Technologie émergente :</strong> les plateformes de conception de matériaux assistée par ordinateur, qui combinent automatiquement des cycles thermodynamiques complexes pour prédire les propriétés de nouveaux composés avant leur synthèse, accélèrent aujourd'hui considérablement la recherche de nouveaux matériaux pour l'énergie, la catalyse et l'électronique.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Énoncé de problème → identification du (des) chapitre(s) concerné(s) → choix de l'outil adapté (Hess, Born-Haber, Kirchhoff, ΔG, K, dosage...) → résolution méthodique → vérification de la cohérence des unités et du signe
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Résolution méthodique} = \\text{Identification de l'outil} + \\text{Rigueur du calcul} + \\text{Vérification du résultat}$$
      Cette « équation », plus méthodologique que mathématique, résume l'esprit de tout ce module « Thermochimie et équilibres chimiques » : la thermodynamique chimique n'est pas un empilement de formules isolées à mémoriser, mais un ensemble cohérent d'outils qui, correctement enchaînés, permettent de résoudre n'importe quel problème énergétique, aussi complexe soit-il.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un cycle énergétique (Hess ou Born-Haber) transforme une réaction difficile à mesurer directement en une somme d'étapes connues</li>
        <li>La loi de Kirchhoff corrige une enthalpie de réaction connue à $T_1$ pour l'obtenir à une autre température $T_2$</li>
        <li>Une affinité électronique négative signifie qu'un atome libère de l'énergie en captant un électron</li>
        <li>Isotherme réversible : $\\Delta U=0$ ; adiabatique réversible : $Q=0$ — ne jamais confondre les deux nullités</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Mélanger les signes en additionnant des enthalpies de combustion sans vérifier le sens de chaque réaction (directe ou inversée)</li>
        <li>Oublier le facteur stœchiométrique (ex. 2 pour NH₃, 3 pour H₂) en calculant $\\Delta C_p$ pour Kirchhoff</li>
        <li>Confondre $Q=0$ (adiabatique) et $\\Delta U=0$ (isotherme pour un gaz parfait) — ce sont deux conditions différentes</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — calculateur de Kirchhoff</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre $\\Delta H(T_1)$, la variation de capacité calorifique $\\Delta C_p$ de la réaction, et les deux températures : obtiens $\\Delta H(T_2)$.</p>
      <div class="sim-2col">
        <div class="sim-controls" style="min-width:280px;">
          <label>ΔH(T1) en kJ</label><input type="number" id="khH1" value="-94.5" step="0.1" oninput="updateKirchhoffCalc()">
          <label>ΔCp de la réaction (J/K)</label><input type="number" id="khCp" value="-49.32" step="0.1" oninput="updateKirchhoffCalc()">
          <label>T1 (K)</label><input type="number" id="khT1" value="373" step="1" oninput="updateKirchhoffCalc()">
          <label>T2 (K)</label><input type="number" id="khT2" value="473" step="1" oninput="updateKirchhoffCalc()">
          <div class="sim-readout" id="khReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans un cycle de Born-Haber, quelle grandeur est presque toujours négative (dégagement d'énergie) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th8e1" value="wrong"> Le potentiel d'ionisation</label>
          <label class="option"><input type="radio" name="th8e1" value="wrong"> L'enthalpie de sublimation</label>
          <label class="option"><input type="radio" name="th8e1" value="right"> L'énergie réticulaire</label>
          <label class="option"><input type="radio" name="th8e1" value="wrong"> L'enthalpie d'atomisation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th8e1','th8fb1','Correct — l\\'énergie réticulaire, qui traduit la formation du cristal ionique à partir des ions gazeux, est toujours fortement négative.','Sublimation, ionisation et atomisation coûtent toujours de l\\'énergie (positives) ; c\\'est la formation du réseau cristallin (énergie réticulaire) qui en libère.')">Vérifier</button>
        <div class="feedback" id="th8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour appliquer la loi de Kirchhoff à une réaction, quelle donnée est indispensable en plus de ΔH(T1) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th8e2" value="wrong"> L'entropie standard de chaque espèce</label>
          <label class="option"><input type="radio" name="th8e2" value="right"> Les capacités calorifiques Cp des réactifs et produits</label>
          <label class="option"><input type="radio" name="th8e2" value="wrong"> La constante d'équilibre K</label>
          <label class="option"><input type="radio" name="th8e2" value="wrong"> Le pH du milieu</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th8e2','th8fb2','Correct — ΔH(T2)=ΔH(T1)+ΔCp(T2−T1) nécessite ΔCp, calculé à partir des Cp de chaque espèce.','La loi de Kirchhoff fait intervenir ΔCp = ΣCp(produits) − ΣCp(réactifs), pas l\\'entropie ni la constante d\\'équilibre.')">Vérifier</button>
        <div class="feedback" id="th8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour un gaz parfait qui subit une transformation adiabatique réversible, que vaut Q ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="th8e3" value="right"> Q = 0</label>
          <label class="option"><input type="radio" name="th8e3" value="wrong"> Q = ΔU</label>
          <label class="option"><input type="radio" name="th8e3" value="wrong"> Q = W</label>
          <label class="option"><input type="radio" name="th8e3" value="wrong"> Q dépend de la pression finale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('th8e3','th8fb3','Correct — une transformation adiabatique est définie précisément par l\\'absence d\\'échange de chaleur : Q=0.','Par définition, une transformation adiabatique ne permet aucun échange de chaleur avec le milieu extérieur : Q=0.')">Vérifier</button>
        <div class="feedback" id="th8fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si un examen de thermodynamique chimique ne pouvait tester qu'une seule notion isolée à la fois, sans jamais les combiner : cela refléterait-il fidèlement les compétences réellement mobilisées par un chimiste en laboratoire ou en industrie ?</li>
        <li>Pourquoi l'ordre de résolution d'un problème complexe (par exemple, calculer d'abord ΔH avant ΔS, ou l'inverse) peut-il influencer la facilité — voire la fiabilité — du calcul final ?</li>
        <li>Quelle serait la conséquence, pour la formation des futurs ingénieurs chimistes, d'un enseignement qui négligerait systématiquement les problèmes combinant plusieurs notions au profit d'exercices isolés ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>P. Atkins, J. de Paula, <em>Chimie physique</em>, De Boeck — référence standard complète pour la thermodynamique chimique en licence.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — recueil d'exercices et de méthodologie pour la thermochimie et les équilibres.</li>
        <li>M. Born, F. Haber, correspondance scientifique et travaux sur le cycle énergétique des cristaux ioniques, Verhandlungen der Deutschen Physikalischen Gesellschaft, 1919.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Te voici arrivé au terme de ce module « Thermochimie et équilibres chimiques » : parti d'une simple distinction entre système et milieu extérieur au premier chapitre, tu termines en sachant combiner plusieurs lois thermodynamiques pour résoudre des problèmes complets, calqués sur de véritables sujets d'examen. Ce parcours — premier principe, deuxième principe, oxydoréduction, équilibres chimiques, équilibres ioniques, expression des concentrations, et enfin méthodologie intégrée — constitue le socle indispensable de toute la chimie physique que tu rencontreras dans la suite de ta formation. Comme le rappelait Sadi Carnot, dont les réflexions ont ouvert ce module il y a plusieurs chapitres : comprendre les principes fondamentaux, indépendamment de tout cas particulier, est ce qui permet ensuite de résoudre n'importe quel problème concret qui s'y rattache. Tu viens d'en faire l'expérience, à ton tour, jusqu'au bout.</p>
  `,
  init: initKirchhoffCalc
};

THERMO_NOVA_KB[thKey('Méthodologie — exercices type examen')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Méthodologie — exercices type examen ». Demande-moi comment reconnaître quel outil utiliser face à un énoncé, comment fonctionne un cycle de Born-Haber, ou un indice sur un exercice.",
  rules: [
    { test:/born.haber|cycle [ée]nerg[ée]tique/i, replies:["Le cycle de Born-Haber relie une enthalpie de formation à une somme d'étapes (sublimation, ionisation, atomisation, affinité électronique, énergie réticulaire) — pratique quand la réaction directe n'est pas mesurable facilement."] },
    { test:/kirchhoff/i, replies:["La loi de Kirchhoff permet de corriger une enthalpie de réaction connue à une température T1 pour l'obtenir à une autre température T2 : ΔH(T2) = ΔH(T1) + ΔCp×(T2−T1)."] },
    { test:/affinit[ée] [ée]lectronique/i, replies:["L'affinité électronique mesure l'énergie libérée (ou absorbée) quand un atome gazeux capte un électron. Elle est presque toujours négative, ce qui signifie un dégagement d'énergie."] },
    { test:/[ée]nergie r[ée]ticulaire/i, replies:["L'énergie réticulaire (ou énergie de réseau) est l'énergie libérée quand des ions gazeux s'assemblent pour former un cristal ionique — toujours fortement négative."] },
    { test:/adiabatique/i, replies:["Une transformation adiabatique est définie par Q=0 (aucun échange de chaleur). Ne la confonds pas avec une isotherme, où c'est ΔU=0 (pour un gaz parfait) qui est vrai, pas Q=0."] },
    { test:/isotherme/i, replies:["Pour un gaz parfait en transformation isotherme, ΔU=0 car U ne dépend que de T. Donc Q=−W : toute la chaleur échangée compense exactement le travail."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repense à quelle étape du cycle de Born-Haber correspond à la formation du solide ionique.","Indice niveau 2 : c'est l'énergie réticulaire.","Indice niveau 3 : elle est presque toujours négative (dégagement d'énergie)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : relis la formule de Kirchhoff et repère quelle grandeur, en plus de ΔH(T1), elle nécessite.","Indice niveau 2 : c'est ΔCp.","Indice niveau 3 : donc les capacités calorifiques Cp des réactifs et produits."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : repense à la définition même d'une transformation adiabatique.","Indice niveau 2 : elle n'échange aucune chaleur avec l'extérieur.","Indice niveau 3 : donc Q=0."] }
  ]
};

/* fusionne tout le contenu de ce cours dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, THERMO_CHAPTERS);
Object.assign(NOVA_KB, THERMO_NOVA_KB);