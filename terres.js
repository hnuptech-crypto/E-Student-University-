/* =====================================================================
   CHUNK « terres » — registre TERRES_CHAPTERS / TERRES_NOVA_KB
   Matière(s) : Chimie|Introduction aux terres rares
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   TERRES_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ============================================================================
   MODULE INTRODUCTION AUX TERRES RARES — Chimie L2
   (contenu rédigé à partir de sources de référence en géochimie et chimie des
   lanthanides : USGS Mineral Commodity Summaries 2026, littérature de chimie
   de coordination des lanthanides, et synthèses récentes sur les filières
   d'extraction — pour poser les bases d'un premier cours d'introduction)
   Structure identique aux autres modules : TERRES_CHAPTERS / TERRES_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const TERRES_MATIERE = 'Introduction aux terres rares';
function terresKey(chapterTitle){ return `Chimie|${TERRES_MATIERE}|${chapterTitle}`; }
const TERRES_CHAPTERS = {};
const TERRES_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Classificateur LREE / HREE (Chapitre 1)
--------------------------------------------------------------------------------- */
function updateTerresClassif(){
  const z = Math.max(1, Math.min(103, parseInt(document.getElementById('terrZ').value) || 57));
  const out = document.getElementById('terrClassifReadout');
  const noms = {21:'Scandium (Sc)', 39:'Yttrium (Y)', 57:'Lanthane (La)', 58:'Cérium (Ce)', 59:'Praséodyme (Pr)', 60:'Néodyme (Nd)', 61:'Prométhium (Pm)', 62:'Samarium (Sm)', 63:'Europium (Eu)', 64:'Gadolinium (Gd)', 65:'Terbium (Tb)', 66:'Dysprosium (Dy)', 67:'Holmium (Ho)', 68:'Erbium (Er)', 69:'Thulium (Tm)', 70:'Ytterbium (Yb)', 71:'Lutécium (Lu)'};
  if(z === 21){
    out.innerHTML = `<strong>Scandium (Z=21)</strong> — terre rare au sens de la classification IUPAC, mais son rayon ionique nettement plus petit lui donne une chimie un peu à part ; il est rarement co-extrait avec les autres.`;
  } else if(z === 39){
    out.innerHTML = `<strong>Yttrium (Z=39)</strong> — classé parmi les terres rares LOURDES malgré son faible numéro atomique : son rayon ionique (Y³⁺) est proche de celui du dysprosium/holmium, donc il se comporte chimiquement comme un lanthanide lourd (« effet yttrium »).`;
  } else if(z >= 57 && z <= 63){
    out.innerHTML = `<strong>${noms[z] || 'Lanthanide'} (Z=${z})</strong> — terre rare LÉGÈRE (LREE, La → Eu). Ces éléments sont les plus abondants dans la croûte terrestre et les moins chers.`;
  } else if(z >= 64 && z <= 71){
    out.innerHTML = `<strong>${noms[z] || 'Lanthanide'} (Z=${z})</strong> — terre rare LOURDE (HREE, Gd → Lu). Ces éléments sont plus rares dans les gisements et généralement plus critiques économiquement.`;
  } else {
    out.innerHTML = `Z=${z} ne correspond à aucune des 17 terres rares (Sc, Y, La→Lu). Essaie une valeur parmi 21, 39, ou 57 à 71.`;
  }
}
function initTerresClassif(){ updateTerresClassif(); }

/* =========================== CHAPITRE 1 — Qu'est-ce qu'une terre rare ? =========================== */
TERRES_CHAPTERS[terresKey('Qu\'est-ce qu\'une terre rare ? Définition, histoire et position dans le tableau périodique')] = {
  objectives: [
    "Définir un élément « terre rare » et énumérer les 17 éléments qui composent ce groupe",
    "Situer les terres rares dans le tableau périodique (bloc f, lanthanides, plus scandium et yttrium)",
    "Distinguer les terres rares légères (LREE) des terres rares lourdes (HREE)",
    "Expliquer pourquoi l'appellation « terre rare » est trompeuse du point de vue de l'abondance géochimique"
  ],
  prereqs: ["Classification périodique des éléments (L1)"],
  bodyHtml: `
    <p>Les <strong>terres rares</strong> (en anglais <em>rare earth elements</em>, REE) forment un groupe de 17 éléments chimiques aux propriétés étonnamment similaires, aujourd'hui indispensables aux technologies de pointe : aimants permanents, écrans, catalyseurs, lasers, imagerie médicale. Ce chapitre pose les bases : qui sont-elles, d'où vient leur nom, et pourquoi les traite-t-on comme une famille à part entière ?</p>

    <h3>1. Une découverte progressive, de la Suède au tableau périodique</h3>
    <p>L'histoire commence en 1787 près du village d'<strong>Ytterby</strong>, en Suède, où l'officier Carl Axel Arrhenius découvre un minerai noir inhabituel. En 1794, le chimiste finlandais <strong>Johan Gadolin</strong> en extrait un oxyde qu'il nomme « yttria ». Au XIX<sup>e</sup> siècle, le terme <em>« terre »</em> désignait en chimie tout oxyde métallique insoluble dans l'eau et résistant à la chaleur (par opposition aux « alcalis »). Ce qui semblait être un seul oxyde s'est ensuite révélé être un mélange complexe : au fil des décennies, les chimistes ont patiemment séparé de nouveaux oxydes, souvent à partir du même minerai, tant les éléments se ressemblent chimiquement. Le dernier lanthanide stable a été isolé par Georges Urbain en 1907 (le lutécium) ; le prométhium, radioactif et absent à l'état naturel, n'a été synthétisé qu'en 1945 à Oak Ridge.</p>
    <table class="mini-table">
      <tr><th>Année</th><th>Événement</th></tr>
      <tr><td>1787 – 1794</td><td>Découverte du minerai d'Ytterby ; isolement de l'« yttria » par Gadolin</td></tr>
      <tr><td>1803</td><td>Isolement du cérium par Berzelius, Hisinger et Klaproth</td></tr>
      <tr><td>1839 – 1843</td><td>Mosander sépare le lanthane, puis le didyme (mélange Pr/Nd) de l'oxyde de cérium</td></tr>
      <tr><td>1907</td><td>Isolement du lutécium par Georges Urbain — dernier lanthanide stable identifié</td></tr>
      <tr><td>1945</td><td>Synthèse du prométhium (radioactif) à Oak Ridge, aux États-Unis</td></tr>
    </table>

    <h3>2. Les 17 éléments des terres rares</h3>
    <p>Le groupe rassemble les <strong>15 lanthanides</strong> (numéros atomiques 57 à 71, du lanthane La au lutécium Lu) auxquels on ajoute le <strong>scandium (Sc, Z=21)</strong> et l'<strong>yttrium (Y, Z=39)</strong>. Ces deux derniers ne sont pas des lanthanides au sens strict, mais ils partagent une chimie très voisine (cation trivalent, rayon ionique comparable) et se trouvent presque toujours associés aux lanthanides dans les mêmes gisements.</p>
    <table class="mini-table">
      <tr><th>Symbole</th><th>Nom</th><th>Z</th><th>Symbole</th><th>Nom</th><th>Z</th></tr>
      <tr><td>Sc</td><td>Scandium</td><td>21</td><td>Gd</td><td>Gadolinium</td><td>64</td></tr>
      <tr><td>Y</td><td>Yttrium</td><td>39</td><td>Tb</td><td>Terbium</td><td>65</td></tr>
      <tr><td>La</td><td>Lanthane</td><td>57</td><td>Dy</td><td>Dysprosium</td><td>66</td></tr>
      <tr><td>Ce</td><td>Cérium</td><td>58</td><td>Ho</td><td>Holmium</td><td>67</td></tr>
      <tr><td>Pr</td><td>Praséodyme</td><td>59</td><td>Er</td><td>Erbium</td><td>68</td></tr>
      <tr><td>Nd</td><td>Néodyme</td><td>60</td><td>Tm</td><td>Thulium</td><td>69</td></tr>
      <tr><td>Pm</td><td>Prométhium*</td><td>61</td><td>Yb</td><td>Ytterbium</td><td>70</td></tr>
      <tr><td>Sm</td><td>Samarium</td><td>62</td><td>Lu</td><td>Lutécium</td><td>71</td></tr>
      <tr><td>Eu</td><td>Europium</td><td>63</td><td></td><td></td><td></td></tr>
    </table>
    <p style="font-size:0.85rem; color:var(--ink-soft);">* Le prométhium est radioactif (pas d'isotope stable) et n'existe qu'à l'état de traces infimes dans la nature ; il est produit artificiellement.</p>

    <div class="key-point">
      <span class="eyebrow">LREE vs HREE</span>
      On distingue traditionnellement les <strong>terres rares légères</strong> (LREE, du lanthane à l'europium, Z=57 à 63) et les <strong>terres rares lourdes</strong> (HREE, du gadolinium au lutécium, Z=64 à 71, auxquelles on associe l'yttrium). Cette distinction n'est pas qu'un découpage arbitraire : elle reflète des différences réelles d'abondance géochimique, de comportement lors de la séparation (chapitre 4) et de valeur économique — les HREE sont en général plus rares et plus critiques.
    </div>

    <h3>3. « Rare » : un abus de langage géochimique</h3>
    <p>Contrairement à ce que leur nom suggère, les terres rares ne sont pas rares au sens de leur abondance moyenne dans la croûte terrestre. Le cérium, l'élément le plus abondant du groupe, est présent à environ 66 ppm (parties par million) dans la croûte continentale — davantage que le cuivre (≈ 27 ppm) ou le plomb (≈ 11 ppm) ! Même le thulium et le lutécium, les moins abondants des lanthanides stables, restent plus abondants que l'or ou le platine.</p>
    <div class="example-box">
      <span class="eyebrow">Alors pourquoi « rares » ?</span>
      <p>Le nom vient de deux réalités bien réelles : (1) au XVIII<sup>e</sup>–XIX<sup>e</sup> siècle, on ne connaissait que de rares échantillons minéraux qui les contenaient ; (2) surtout, les terres rares ne forment presque jamais de gisements concentrés et purs — elles sont dispersées, substituées en petites quantités dans d'autres minéraux, et chimiquement si semblables entre elles qu'il est très difficile de les séparer les unes des autres (voir chapitre 4). La « rareté » est donc géologique et technologique, pas une rareté d'abondance moyenne.</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <rect x="4" y="6" width="112" height="14" fill="none" stroke="#4C7CFF" stroke-width="1"/>
          <rect x="4" y="24" width="112" height="14" fill="none" stroke="#4C7CFF" stroke-width="1"/>
          <rect x="20" y="42" width="88" height="14" rx="2" fill="#8064F2" opacity="0.35" stroke="#8064F2" stroke-width="1.2"/>
          <text x="64" y="52" font-size="7" text-anchor="middle" fill="#122043">bloc f (Ln)</text>
          <rect x="4" y="58" width="112" height="8" fill="none" stroke="#1FB6A8" stroke-width="1"/>
        </svg>
        <span>Les lanthanides forment le « bloc f », habituellement détaché sous le corps principal du tableau périodique.</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <line x1="10" y1="60" x2="110" y2="60" stroke="#122043" stroke-width="1"/>
          <rect x="18" y="14" width="14" height="46" fill="#E8A93A"/>
          <rect x="42" y="30" width="14" height="30" fill="#3D6BF0"/>
          <rect x="66" y="8" width="14" height="52" fill="#F0555C"/>
          <text x="25" y="68" font-size="6" text-anchor="middle">Ce</text>
          <text x="49" y="68" font-size="6" text-anchor="middle">Cu</text>
          <text x="73" y="68" font-size="6" text-anchor="middle">Au</text>
        </svg>
        <span>Abondance crustale relative (échelle qualitative) : le cérium dépasse le cuivre, et l'or reste bien plus rare que n'importe quelle terre rare.</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>17 éléments : les 15 lanthanides (Z=57 à 71) + scandium (Z=21) + yttrium (Z=39)</li>
        <li>LREE (La → Eu, Z=57-63) = terres rares légères ; HREE (Gd → Lu + Y) = terres rares lourdes</li>
        <li>Le prométhium (Z=61) est radioactif et quasi absent de la nature</li>
        <li>« Rare » fait référence à la difficulté de trouver des gisements concentrés et de séparer ces éléments entre eux — pas à une faible abondance moyenne dans la croûte terrestre</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que « terre rare » signifie « élément rare dans la croûte terrestre » — c'est faux pour la plupart d'entre elles</li>
        <li>Oublier que le scandium et l'yttrium font partie du groupe alors qu'ils ne sont pas des lanthanides</li>
        <li>Confondre lanthanides (bloc f, période 6) et actinides (bloc f, période 7) : ce sont deux familles différentes</li>
        <li>Penser que le prométhium est disponible en quantités industrielles comme les autres terres rares</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Classificateur de terre rare</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre un numéro atomique (21, 39, ou 57 à 71) pour voir sa classification.</p>
      <div class="sim-controls">
        <label>Numéro atomique Z : <input type="number" id="terrZ" value="60" min="1" max="103" style="width:70px;" oninput="updateTerresClassif()"></label>
        <div class="sim-readout" id="terrClassifReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Combien d'éléments composent le groupe des terres rares au sens de l'IUPAC ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr1e1" value="wrong"> 15</label>
          <label class="option"><input type="radio" name="terr1e1" value="right"> 17</label>
          <label class="option"><input type="radio" name="terr1e1" value="wrong"> 21</label>
          <label class="option"><input type="radio" name="terr1e1" value="wrong"> 14</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr1e1','terr1fb1','Correct — 15 lanthanides + scandium + yttrium = 17 éléments.','Il faut ajouter le scandium et l\\'yttrium aux 15 lanthanides.')">Vérifier</button>
        <div class="feedback" id="terr1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'yttrium (Z=39) est classé parmi les terres rares :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr1e2" value="wrong"> légères, car son Z est faible</label>
          <label class="option"><input type="radio" name="terr1e2" value="right"> lourdes, car son rayon ionique ressemble à celui des lanthanides lourds</label>
          <label class="option"><input type="radio" name="terr1e2" value="wrong"> ni légères ni lourdes, ce n'est pas une terre rare</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr1e2','terr1fb2','Correct — c\\'est l\\'« effet yttrium » : son rayon ionique proche de Dy³⁺/Ho³⁺ lui donne un comportement chimique de terre rare lourde.','Le classement LREE/HREE repose sur le comportement CHIMIQUE (rayon ionique), pas sur le numéro atomique brut.')">Vérifier</button>
        <div class="feedback" id="terr1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pourquoi les terres rares sont-elles qualifiées de « rares » malgré une abondance crustale souvent supérieure à celle du cuivre ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr1e3" value="wrong"> Parce qu'elles n'existent que dans un seul pays au monde</label>
          <label class="option"><input type="radio" name="terr1e3" value="right"> Parce qu'elles forment rarement des gisements concentrés et sont très difficiles à séparer entre elles</label>
          <label class="option"><input type="radio" name="terr1e3" value="wrong"> Parce qu'elles sont radioactives</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr1e3','terr1fb3','Correct — la rareté est géologique (dispersion, absence de gisements concentrés) et technologique (séparation difficile), pas une rareté d\\'abondance moyenne.','Seul le prométhium est radioactif parmi les 17 ; ce n\\'est pas la raison générale du nom.')">Vérifier</button>
        <div class="feedback" id="terr1fb3"></div>
      </div>
    </div>
  `,
  init: initTerresClassif
};

TERRES_NOVA_KB[terresKey('Qu\'est-ce qu\'une terre rare ? Définition, histoire et position dans le tableau périodique')] = {
  intro: "Salut, moi c'est Nova ! On démarre le cours sur les terres rares. Demande-moi ce qui distingue une LREE d'une HREE, pourquoi ces éléments ne sont pas vraiment « rares », ou un indice sur un exercice.",
  rules: [
    { test:/combien|17|liste|éléments/i, replies:["Le groupe des terres rares compte 17 éléments : les 15 lanthanides (La à Lu, Z=57-71) plus le scandium (Z=21) et l'yttrium (Z=39)."] },
    { test:/lreel|lree|l[ée]g[èe]re/i, replies:["Les LREE (terres rares légères) vont du lanthane à l'europium (Z=57 à 63). Elles sont les plus abondantes et les moins chères."] },
    { test:/hree|lourde/i, replies:["Les HREE (terres rares lourdes) vont du gadolinium au lutécium (Z=64 à 71), et on y associe l'yttrium à cause de son rayon ionique proche. Elles sont plus rares et plus critiques."] },
    { test:/rare|nom|pourquoi.*appel/i, replies:["« Rare » ne veut pas dire peu abondantes en moyenne — le cérium est plus abondant que le cuivre ! C'est la difficulté à trouver des gisements concentrés et à les séparer chimiquement qui justifie le nom."] },
    { test:/promethium|prom[ée]thium/i, replies:["Le prométhium (Z=61) est le seul lanthanide radioactif sans isotope stable ; il n'existe qu'à l'état de traces infimes dans la nature et a été synthétisé pour la première fois en 1945."] },
    { test:/scandium|yttrium/i, replies:["Le scandium et l'yttrium ne sont pas des lanthanides à proprement parler, mais ils partagent une chimie très voisine (cation 3+, rayon comparable) et sont toujours co-extraits avec eux."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compte les lanthanides, puis ajoute deux autres éléments.","Indice niveau 2 : 15 lanthanides + 2 éléments (Sc et Y).","Indice niveau 3 : 15 + 2 = 17."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le classement LREE/HREE se fait sur le rayon ionique, pas sur Z brut.","Indice niveau 2 : Y³⁺ a un rayon proche de celui de Dy³⁺/Ho³⁺.","Indice niveau 3 : donc l'yttrium est classé HREE malgré son Z=39."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare l'abondance moyenne du cérium à celle du cuivre.","Indice niveau 2 : le cérium est plus abondant que le cuivre — donc ce n'est pas une question d'abondance moyenne.","Indice niveau 3 : c'est la dispersion géologique et la difficulté de séparation qui expliquent le nom."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 2 — Contraction lanthanidique : rayon ionique Ln3+ en fonction de Z (Chapitre 2)
--------------------------------------------------------------------------------- */
const TERRES_RADII = {57:103,58:101,59:99,60:98.3,61:97,62:95.8,63:94.7,64:93.8,65:92.3,66:91.2,67:90.1,68:89,69:88,70:86.8,71:86.1};
function updateTerresRadius(){
  const z = Math.max(57, Math.min(71, parseInt(document.getElementById('terrRadZ').value) || 57));
  const r = TERRES_RADII[z];
  const rLa = TERRES_RADII[57];
  const delta = (rLa - r).toFixed(1);
  document.getElementById('terrRadiusReadout').innerHTML =
    `Rayon ionique estimé de Ln³⁺ (Z=${z}, coordinence 6) : <strong>${r} pm</strong><br>` +
    `Contraction par rapport à La³⁺ (103 pm) : <strong>${delta} pm</strong> (soit ${(delta/103*100).toFixed(1)} % de réduction)`;
}
function initTerresRadius(){ updateTerresRadius(); }

/* =========================== CHAPITRE 2 — Structure électronique et contraction lanthanidique =========================== */
TERRES_CHAPTERS[terresKey('Structure électronique des lanthanides et contraction lanthanidique')] = {
  objectives: [
    "Écrire la configuration électronique simplifiée d'un lanthanide et de son ion Ln³⁺",
    "Expliquer l'origine physique de la contraction lanthanidique et ses conséquences sur le rayon ionique",
    "Justifier la stabilité particulière de certains degrés d'oxydation non standards (Ce⁴⁺, Eu²⁺)",
    "Relier la contraction lanthanidique à l'« effet yttrium » introduit au chapitre précédent"
  ],
  prereqs: ["Configuration électronique des atomes (L1)", "Qu'est-ce qu'une terre rare ? (chapitre précédent)"],
  bodyHtml: `
    <p>Pourquoi les 15 lanthanides se ressemblent-ils autant chimiquement, au point qu'il ait fallu un siècle pour tous les séparer ? La réponse tient dans une seule sous-couche électronique : la sous-couche <strong>4f</strong>, profondément enfouie et « invisible » pour les liaisons chimiques.</p>

    <h3>1. Le remplissage de la sous-couche 4f</h3>
    <p>Les lanthanides ont pour configuration générale $[Xe]\\,6s^2\\,4f^n\\,5d^{0\\text{ ou }1}$. La proximité énergétique des orbitales 4f et 5d provoque quelques irrégularités de remplissage (La, Ce, Gd et Lu, par exemple, placent un électron en 5d plutôt qu'en 4f) : ce sont des exceptions bien identifiées, comparables à celles déjà rencontrées pour le chrome ou le cuivre dans le bloc d.</p>
    <table class="mini-table">
      <tr><th>Élément</th><th>Configuration électronique</th></tr>
      <tr><td>La (Z=57)</td><td>$[Xe]\\,6s^2\\,5d^1$</td></tr>
      <tr><td>Ce (Z=58)</td><td>$[Xe]\\,6s^2\\,4f^1\\,5d^1$</td></tr>
      <tr><td>Nd (Z=60)</td><td>$[Xe]\\,6s^2\\,4f^4$</td></tr>
      <tr><td>Gd (Z=64)</td><td>$[Xe]\\,6s^2\\,4f^7\\,5d^1$</td></tr>
      <tr><td>Lu (Z=71)</td><td>$[Xe]\\,6s^2\\,4f^{14}\\,5d^1$</td></tr>
    </table>

    <h3>2. L'ion Ln³⁺ : la configuration qui gouverne toute la chimie</h3>
    <p>En solution comme dans la quasi-totalité des composés, les lanthanides existent sous forme d'ions <strong>Ln³⁺</strong>, obtenus en retirant les deux électrons 6s et l'éventuel électron 5d. Le résultat est d'une simplicité remarquable : $[Xe]\\,4f^n$, avec $n$ variant régulièrement de 0 (La³⁺) à 14 (Lu³⁺).</p>
    <div class="key-point">
      <span class="eyebrow">Des électrons 4f « cachés »</span>
      Les orbitales 4f sont radialement situées <em>à l'intérieur</em> des orbitales 5s et 5p, déjà remplies. Elles sont donc efficacement blindées de l'environnement chimique (ligands, solvant) : elles ne participent presque pas aux liaisons. C'est ce blindage qui explique (1) la très grande similarité chimique entre tous les Ln³⁺, (2) les couleurs pâles et les raies d'émission très fines des ions lanthanides (transitions f-f, voir chapitre 6), et (3) l'absence quasi totale d'effet de champ cristallin sur la géométrie des complexes (chapitre 5).
    </div>

    <h3>3. La contraction lanthanidique</h3>
    <p>En parcourant la série de La³⁺ à Lu³⁺, le rayon ionique diminue de façon régulière — c'est la <strong>contraction lanthanidique</strong>. La cause est le même phénomène que le « blindage imparfait » vu pour les électrons d : les électrons 4f se protègent mal les uns des autres (recouvrement radial important entre orbitales 4f), si bien que la charge nucléaire effective ressentie par les électrons externes augmente régulièrement à chaque proton ajouté, contractant le nuage électronique.</p>
    <table class="mini-table">
      <tr><th>Ion</th><th>Rayon ionique (CN=6, pm)</th></tr>
      <tr><td>La³⁺</td><td>103</td></tr>
      <tr><td>Nd³⁺</td><td>98,3</td></tr>
      <tr><td>Gd³⁺</td><td>93,8</td></tr>
      <tr><td>Dy³⁺</td><td>91,2</td></tr>
      <tr><td>Yb³⁺</td><td>86,8</td></tr>
      <tr><td>Lu³⁺</td><td>86,1</td></tr>
    </table>
    <p>Cette contraction, cumulée sur les 15 éléments, atteint environ 17 pm — presque 17 % du rayon initial. Elle a trois conséquences majeures pour la suite du cours : l'acidité croissante des ions Ln³⁺ en solution (chapitre 5), la difficulté croissante à séparer des lanthanides adjacents (chapitre 4), et l'« effet yttrium » : le rayon de Y³⁺ (≈ 90 pm) tombe précisément dans la gamme des lanthanides lourds (Dy³⁺-Ho³⁺), ce qui explique pourquoi l'yttrium suit chimiquement (et géologiquement) le groupe des HREE.</p>

    <h3>4. Degrés d'oxydation non standards : Ce⁴⁺ et Eu²⁺</h3>
    <p>Si Ln³⁺ domine très largement, deux exceptions industriellement importantes méritent d'être connues :</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — pourquoi Eu²⁺ est stable</span>
      <p><strong>Énoncé :</strong> l'europium neutre a pour configuration $[Xe]\\,6s^2\\,4f^7$. Écrire la configuration de Eu²⁺ et expliquer sa stabilité relative.</p>
      <p><strong>Solution :</strong> en perdant les deux électrons 6s, on obtient $Eu^{2+} : [Xe]\\,4f^7$ — une sous-couche 4f exactement <strong>à moitié remplie</strong>. Comme pour le manganèse(II) dans le bloc d, une sous-couche à demi-remplie est particulièrement stable (règle de Hund, échange électronique maximal), ce qui rend Eu²⁺ inhabituellement accessible pour un lanthanide.</p>
      <p class="example-answer">Réponse : $Eu^{2+}=[Xe]\\,4f^7$, stabilisé par la demi-couche 4f pleine.</p>
    </div>
    <p>De façon symétrique, le <strong>cérium</strong> ($[Xe]\\,4f^1$ pour Ce³⁺) perd facilement son unique électron 4f restant pour donner <strong>Ce⁴⁺ = $[Xe]$</strong>, une configuration de gaz rare particulièrement stable. Le couple Ce⁴⁺/Ce³⁺ est un oxydant fort largement exploité industriellement (nitrate cérique ammoniacal en chimie analytique, dopage de CeO₂ dans les pots catalytiques et le polissage optique, chapitre 7).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Configuration dominante : Ln³⁺ = $[Xe]\\,4f^n$, avec n = 0 (La) à 14 (Lu)</li>
        <li>Les électrons 4f sont blindés par les couches 5s/5p pleines : ils ne participent presque pas aux liaisons</li>
        <li>Contraction lanthanidique : le rayon de Ln³⁺ diminue régulièrement de La³⁺ (103 pm) à Lu³⁺ (86 pm)</li>
        <li>Ce⁴⁺ ($[Xe]$) et Eu²⁺ ($[Xe]4f^7$) sont des degrés d'oxydation non standards mais stables, à fort intérêt industriel</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que tous les Ln³⁺ ont la même taille — la contraction lanthanidique change tout au long de la série</li>
        <li>Oublier de retirer les électrons 5d avant les 4f lors de l'ionisation (l'ordre de retrait n'est pas l'ordre de remplissage)</li>
        <li>Penser que le champ cristallin des ligands détermine la géométrie des complexes de lanthanides comme pour le bloc d — c'est faux, voir chapitre 5</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — contraction lanthanidique</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Choisis un numéro atomique entre 57 (La) et 71 (Lu) pour voir le rayon ionique estimé de Ln³⁺ et la contraction cumulée depuis le lanthane.</p>
      <div class="sim-controls">
        <label>Numéro atomique Z (57-71) : <input type="number" id="terrRadZ" value="60" min="57" max="71" style="width:70px;" oninput="updateTerresRadius()"></label>
        <div class="sim-readout" id="terrRadiusReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La configuration électronique de l'ion Nd³⁺ (Z=60) s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr2e1" value="wrong"> $[Xe]\\,6s^2\\,4f^4$</label>
          <label class="option"><input type="radio" name="terr2e1" value="right"> $[Xe]\\,4f^3$</label>
          <label class="option"><input type="radio" name="terr2e1" value="wrong"> $[Xe]\\,4f^4$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr2e1','terr2fb1','Correct — Nd neutre est [Xe]6s²4f⁴ ; pour Nd³⁺, on retire les 2 électrons 6s puis 1 électron 4f, ce qui donne [Xe]4f³.','Retire d\\'abord les 2 électrons 6s, PUIS un électron 4f pour obtenir la charge 3+.')">Vérifier</button>
        <div class="feedback" id="terr2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La contraction lanthanidique est due principalement à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr2e2" value="wrong"> une augmentation du nombre de neutrons</label>
          <label class="option"><input type="radio" name="terr2e2" value="right"> un blindage imparfait des électrons 4f entre eux, qui augmente la charge nucléaire effective</label>
          <label class="option"><input type="radio" name="terr2e2" value="wrong"> la présence d'électrons 5d supplémentaires</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr2e2','terr2fb2','Correct — les électrons 4f se blindent mal entre eux ; la charge nucléaire effective augmente avec Z, contractant le nuage électronique.','C\\'est un effet de blindage électronique, pas un effet nucléaire ou une question d\\'électrons 5d.')">Vérifier</button>
        <div class="feedback" id="terr2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'ion Eu²⁺ est relativement stable pour un lanthanide car sa configuration $[Xe]\\,4f^7$ correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr2e3" value="wrong"> une sous-couche 4f totalement vide</label>
          <label class="option"><input type="radio" name="terr2e3" value="right"> une sous-couche 4f exactement à moitié remplie</label>
          <label class="option"><input type="radio" name="terr2e3" value="wrong"> une sous-couche 4f totalement remplie</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr2e3','terr2fb3','Correct — 4f⁷ est une demi-couche, stabilisée par l\\'échange électronique maximal (comparable à Mn²⁺ dans le bloc d).','4f contient 7 orbitales ; 4f⁷ = une seule électron par orbitale = demi-remplissage.')">Vérifier</button>
        <div class="feedback" id="terr2fb3"></div>
      </div>
    </div>
  `,
  init: initTerresRadius
};

TERRES_NOVA_KB[terresKey('Structure électronique des lanthanides et contraction lanthanidique')] = {
  intro: "Salut, moi c'est Nova ! On est sur la structure électronique des lanthanides. Demande-moi d'où vient la contraction lanthanidique, pourquoi Ce⁴⁺ et Eu²⁺ existent, ou un indice sur un exercice.",
  rules: [
    { test:/configuration|4f/i, replies:["La configuration dominante des lanthanides est l'ion Ln³⁺ = [Xe]4fⁿ, avec n allant de 0 (La³⁺) à 14 (Lu³⁺)."] },
    { test:/contraction/i, replies:["La contraction lanthanidique vient du blindage imparfait des électrons 4f entre eux : la charge nucléaire effective augmente avec Z, ce qui contracte le rayon ionique tout au long de la série."] },
    { test:/blindage|[ée]cran/i, replies:["Les orbitales 4f sont situées à l'intérieur des orbitales 5s/5p déjà remplies : elles sont donc très blindées de l'environnement chimique, ce qui explique la grande similarité entre tous les Ln³⁺."] },
    { test:/ce4\+|c[ée]rium|ce\^?4/i, replies:["Ce⁴⁺ a la configuration [Xe] (comme un gaz rare) : très stable, ce qui en fait un oxydant fort utilisé industriellement (catalyse, polissage)."] },
    { test:/eu2\+|europium/i, replies:["Eu²⁺ a la configuration [Xe]4f⁷, une demi-couche stabilisée par l'échange électronique maximal — comparable à Mn²⁺ dans le bloc d."] },
    { test:/effet yttrium/i, replies:["Le rayon de Y³⁺ tombe dans la gamme des lanthanides lourds (proche de Dy³⁺/Ho³⁺) à cause de la contraction lanthanidique : c'est pour ça que l'yttrium suit chimiquement les HREE."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : retire d'abord les électrons 6s de Nd neutre.","Indice niveau 2 : Nd neutre = [Xe]6s²4f⁴ ; retire les 2 électrons 6s.","Indice niveau 3 : il reste 1 électron à retirer pour la charge 3+, donc [Xe]4f³."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense au blindage entre électrons de même sous-couche.","Indice niveau 2 : les électrons 4f se blindent mal entre eux.","Indice niveau 3 : la charge nucléaire effective augmente, contractant le rayon."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compte les orbitales et les électrons dans 4f⁷.","Indice niveau 2 : la sous-couche 4f compte 7 orbitales.","Indice niveau 3 : 7 électrons dans 7 orbitales = demi-remplissage, configuration stable."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 3 — Comparateur de minerais (Chapitre 3)
--------------------------------------------------------------------------------- */
const TERRES_MINERAUX = {
  bastnasite: { nom:'Bastnäsite', formule:'(Ce,La)CO₃F', type:'Riche en LREE (Ce, La, Nd)', gisement:'Carbonatite (roche magmatique) — ex. Bayan Obo (Chine), Mountain Pass (États-Unis)' },
  monazite: { nom:'Monazite', formule:'(Ce,La,Nd,Th)PO₄', type:'Riche en LREE, contient du thorium radioactif', gisement:'Sables minéraux lourds (placers) — ex. Inde, Australie, Brésil, Malaisie' },
  xenotime: { nom:'Xénotime', formule:'YPO₄', type:'Riche en HREE (Y, Dy, Yb)', gisement:'Souvent associé à la monazite dans les placers' },
  argile: { nom:'Argile à absorption ionique', formule:'REE³⁺ adsorbés sur kaolinite/halloysite', type:'Enrichie en HREE (Dy, Tb) — principale source mondiale de HREE', gisement:'Régolithe d\'altération de granites — sud de la Chine (Jiangxi, Guangdong)' }
};
function updateTerresMineral(){
  const sel = document.getElementById('terrMineralSelect').value;
  const m = TERRES_MINERAUX[sel];
  document.getElementById('terrMineralReadout').innerHTML =
    `<strong>${m.nom}</strong> — formule : ${m.formule}<br>Type : ${m.type}<br>Gisement typique : ${m.gisement}`;
}
function initTerresMineral(){ updateTerresMineral(); }

/* =========================== CHAPITRE 3 — Minéralogie et gisements des terres rares =========================== */
TERRES_CHAPTERS[terresKey('Minéralogie et gisements des terres rares')] = {
  objectives: [
    "Citer les principaux minerais de terres rares et leur composition chimique",
    "Distinguer un gisement magmato-hydrothermal (bastnäsite), un gisement résiduel de type placer (monazite, xénotime) et un gisement d'adsorption ionique (argiles du sud de la Chine)",
    "Expliquer pourquoi la monazite est systématiquement associée à de la radioactivité naturelle",
    "Localiser les principaux gisements exploités dans le monde"
  ],
  prereqs: ["Qu'est-ce qu'une terre rare ? (chapitre précédent)"],
  bodyHtml: `
    <p>Les terres rares ne se trouvent jamais à l'état natif : elles sont toujours combinées dans des minéraux, eux-mêmes concentrés par des processus géologiques bien particuliers. Trois grandes familles de gisements dominent l'industrie mondiale.</p>

    <h3>1. La bastnäsite : le minerai des grandes carbonatites</h3>
    <p>La <strong>bastnäsite</strong>, un fluorocarbonate de formule $(Ce,La)CO_3F$, est associée aux <strong>carbonatites</strong> — des roches magmatiques rares, riches en carbonates, remontées depuis le manteau terrestre. C'est le minerai principal de deux des plus grands gisements mondiaux : <strong>Bayan Obo</strong>, en Mongolie-Intérieure (Chine), le plus grand gisement de terres rares connu au monde, exploité conjointement avec un immense gisement de fer ; et <strong>Mountain Pass</strong>, en Californie (États-Unis), historiquement le premier grand site producteur mondial avant l'essor chinois. La bastnäsite est particulièrement riche en terres rares légères (Ce, La, Nd).</p>

    <h3>2. Monazite et xénotime : les minerais des placers</h3>
    <p>La <strong>monazite</strong>, phosphate de formule $(Ce,La,Nd,Th)PO_4$, et le <strong>xénotime</strong>, phosphate d'yttrium $YPO_4$, sont des minéraux denses et chimiquement très résistants à l'altération. Ils s'accumulent, avec d'autres minéraux lourds (ilménite, rutile, zircon), dans des dépôts sédimentaires appelés <strong>placers</strong> ou sables minéraux lourds, souvent d'origine côtière. Ces gisements sont exploités en Inde, en Australie, au Brésil et en Malaisie. La monazite est riche en LREE, tandis que le xénotime, structurellement apparenté, concentre davantage les HREE (yttrium, dysprosium).</p>

    <div class="key-point">
      <span class="eyebrow">Pourquoi la monazite est-elle radioactive ?</span>
      L'ion thorium $Th^{4+}$ possède un rayon ionique et une charge très proches de ceux des lanthanides trivalents ; il se substitue donc facilement à eux dans le réseau cristallin du phosphate. La monazite contient ainsi presque toujours quelques pourcents de thorium (et parfois d'uranium), ce qui impose aux usines de traitement de gérer des résidus classés déchets radioactifs de faible activité — une contrainte réglementaire et environnementale majeure (voir chapitre 8).
    </div>

    <h3>3. Les argiles à absorption ionique : la source des terres rares lourdes</h3>
    <p>Découvert dans le sud de la Chine (provinces du Jiangxi et du Guangdong) dans les années 1970, ce type de gisement est unique : l'altération météorique de granites riches en terres rares libère des ions Ln³⁺ qui restent faiblement adsorbés, par simple attraction électrostatique, à la surface de minéraux argileux (kaolinite, halloysite) dans le régolithe. Cette liaison faible permet une extraction remarquablement simple : il suffit de percoler une solution saline (typiquement du sulfate d'ammonium) à travers le sol pour désorber et récupérer les terres rares, sans acide fort ni chauffage. Ce procédé bon marché a un revers : il est très dommageable pour l'environnement (voir chapitre 8). Ces argiles s'enrichissent préférentiellement en <strong>terres rares lourdes</strong> lors de l'altération, ce qui en fait aujourd'hui la principale source mondiale de dysprosium et de terbium, deux éléments critiques pour les aimants haute performance (chapitre 6).</p>

    <table class="mini-table">
      <tr><th>Gisement / type</th><th>Minéral principal</th><th>Richesse relative</th><th>Exemples</th></tr>
      <tr><td>Carbonatite</td><td>Bastnäsite</td><td>LREE</td><td>Bayan Obo (Chine), Mountain Pass (États-Unis)</td></tr>
      <tr><td>Placer côtier</td><td>Monazite, xénotime</td><td>LREE (monazite) / HREE (xénotime)</td><td>Inde, Australie, Brésil, Malaisie</td></tr>
      <tr><td>Argile d'adsorption ionique</td><td>REE³⁺ sur kaolinite</td><td>HREE (Dy, Tb)</td><td>Jiangxi, Guangdong (Chine)</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">À retenir</span>
      <p>La domination chinoise de la production mondiale (chapitre 8) ne tient pas seulement à la taille du gisement de Bayan Obo : la Chine est aussi le quasi-seul détenteur exploité à grande échelle de gisements d'argiles à adsorption ionique — sa principale source de terres rares lourdes, qui n'ont pas d'équivalent commercial abondant ailleurs dans le monde à ce jour.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Bastnäsite (carbonatite) → riche en LREE ; monazite et xénotime (placers) → LREE et HREE respectivement</li>
        <li>La monazite contient toujours du thorium, car Th⁴⁺ se substitue aux Ln³⁺ dans le réseau cristallin</li>
        <li>Les argiles à adsorption ionique du sud de la Chine sont la principale source mondiale de terres rares lourdes (Dy, Tb)</li>
        <li>L'extraction des argiles ioniques est chimiquement simple (lixiviation saline à froid) mais très impactante pour l'environnement</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre bastnäsite (carbonate-fluorure) et monazite (phosphate) — ce sont deux familles minérales différentes</li>
        <li>Penser que tous les gisements de terres rares sont également riches en HREE — en réalité, la plupart sont dominés par les LREE</li>
        <li>Oublier que la radioactivité de la monazite est une contrainte de traitement majeure, pas un simple détail</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Comparateur de minerais</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Choisis un minerai pour voir sa formule, sa richesse relative et ses gisements typiques.</p>
      <div class="sim-controls">
        <label>Minerai :
          <select id="terrMineralSelect" onchange="updateTerresMineral()">
            <option value="bastnasite">Bastnäsite</option>
            <option value="monazite">Monazite</option>
            <option value="xenotime">Xénotime</option>
            <option value="argile">Argile à absorption ionique</option>
          </select>
        </label>
        <div class="sim-readout" id="terrMineralReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le plus grand gisement de terres rares connu au monde, exploité conjointement avec du minerai de fer, est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr3e1" value="wrong"> Mountain Pass</label>
          <label class="option"><input type="radio" name="terr3e1" value="right"> Bayan Obo</label>
          <label class="option"><input type="radio" name="terr3e1" value="wrong"> Mont Weld</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr3e1','terr3fb1','Correct — Bayan Obo, en Mongolie-Intérieure (Chine), est le plus grand gisement mondial de terres rares.','Mountain Pass est aux États-Unis ; Bayan Obo est en Chine et bien plus grand.')">Vérifier</button>
        <div class="feedback" id="terr3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La monazite contient presque toujours du thorium parce que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr3e2" value="wrong"> le thorium est un sous-produit de la désintégration des terres rares</label>
          <label class="option"><input type="radio" name="terr3e2" value="right"> Th⁴⁺ a un rayon/charge proches des Ln³⁺ et se substitue facilement dans le réseau du phosphate</label>
          <label class="option"><input type="radio" name="terr3e2" value="wrong"> le thorium sert à stabiliser la structure cristalline lors de la formation du minéral en laboratoire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr3e2','terr3fb2','Correct — c\\'est une substitution ionique naturelle liée à la similarité rayon/charge entre Th⁴⁺ et Ln³⁺.','Pense à la similarité géochimique entre Th⁴⁺ et les ions lanthanides trivalents.')">Vérifier</button>
        <div class="feedback" id="terr3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La principale source mondiale actuelle de terres rares lourdes (Dy, Tb) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr3e3" value="wrong"> les carbonatites à bastnäsite</label>
          <label class="option"><input type="radio" name="terr3e3" value="wrong"> les placers côtiers à monazite</label>
          <label class="option"><input type="radio" name="terr3e3" value="right"> les argiles à adsorption ionique du sud de la Chine</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr3e3','terr3fb3','Correct — les argiles ioniques s\\'enrichissent en HREE lors de l\\'altération et n\\'ont pas d\\'équivalent commercial abondant ailleurs.','Les carbonatites et les placers sont surtout riches en LREE.')">Vérifier</button>
        <div class="feedback" id="terr3fb3"></div>
      </div>
    </div>
  `,
  init: initTerresMineral
};

TERRES_NOVA_KB[terresKey('Minéralogie et gisements des terres rares')] = {
  intro: "Salut, moi c'est Nova ! On explore les minerais de terres rares. Demande-moi la différence entre bastnäsite et monazite, pourquoi la monazite est radioactive, ou un indice sur un exercice.",
  rules: [
    { test:/bastn[aä]site/i, replies:["La bastnäsite (Ce,La)CO₃F est un fluorocarbonate associé aux carbonatites, riche en terres rares légères. C'est le minerai de Bayan Obo et Mountain Pass."] },
    { test:/monazite/i, replies:["La monazite (Ce,La,Nd,Th)PO₄ est un phosphate de placer, riche en LREE, et contient toujours du thorium radioactif substitué dans son réseau cristallin."] },
    { test:/x[ée]notime/i, replies:["Le xénotime YPO₄ ressemble structurellement à la monazite mais concentre davantage les terres rares lourdes (yttrium, dysprosium)."] },
    { test:/argile|adsorption|ionique/i, replies:["Les argiles à adsorption ionique du sud de la Chine sont la principale source mondiale de terres rares lourdes ; l'extraction se fait par simple lixiviation saline, mais avec un fort impact environnemental."] },
    { test:/thorium|radioactiv/i, replies:["Th⁴⁺ a un rayon ionique et une charge proches des Ln³⁺, donc il se substitue facilement dans le réseau de la monazite — d'où sa radioactivité systématique."] },
    { test:/bayan obo|mountain pass/i, replies:["Bayan Obo (Chine) est le plus grand gisement mondial de terres rares, co-exploité avec du fer. Mountain Pass (États-Unis) fut le premier grand site producteur avant l'essor chinois."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : lequel de ces gisements est en Chine et co-exploité avec du fer ?","Indice niveau 2 : c'est le plus grand gisement mondial connu.","Indice niveau 3 : Bayan Obo."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la similarité rayon/charge entre Th⁴⁺ et Ln³⁺.","Indice niveau 2 : Th⁴⁺ peut donc prendre la place d'un Ln³⁺ dans le cristal.","Indice niveau 3 : c'est une substitution ionique naturelle, pas une désintégration."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : quel gisement s'enrichit en HREE lors de l'altération météorique ?","Indice niveau 2 : ce sont des argiles, pas des roches magmatiques ni des placers.","Indice niveau 3 : les argiles à adsorption ionique du sud de la Chine."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 4 — Calculateur de facteur de séparation β (Chapitre 4)
--------------------------------------------------------------------------------- */
function updateTerresSeparation(){
  const dA = parseFloat(document.getElementById('terrDA').value) || 0.001;
  const dB = parseFloat(document.getElementById('terrDB').value) || 0.001;
  const beta = dA / dB;
  let verdict;
  if(beta > 3 || beta < 0.33) verdict = "séparation relativement facile — peu d'étages nécessaires.";
  else if(beta > 1.5 || beta < 0.67) verdict = "séparation modérément difficile — plusieurs dizaines d'étages nécessaires.";
  else verdict = "séparation très difficile (éléments chimiquement très voisins) — une cascade de plusieurs centaines d'étages mélangeur-décanteur peut être nécessaire.";
  document.getElementById('terrSepReadout').innerHTML =
    `β = D_A / D_B = ${dA} / ${dB} = <strong>${beta.toFixed(2)}</strong><br>Interprétation : ${verdict}`;
}
function initTerresSeparation(){ updateTerresSeparation(); }

/* =========================== CHAPITRE 4 — Extraction et séparation des terres rares =========================== */
TERRES_CHAPTERS[terresKey('Extraction et séparation des terres rares : de la mine à l\'oxyde pur')] = {
  objectives: [
    "Décrire les grandes étapes du traitement d'un minerai de terres rares, de la mine à l'oxyde pur",
    "Expliquer le principe de l'extraction liquide-liquide à contre-courant pour séparer des lanthanides voisins",
    "Définir le coefficient de distribution D et le facteur de séparation β, et discuter pourquoi la séparation des terres rares adjacentes est difficile",
    "Citer d'autres voies de séparation et de production secondaire (échange d'ions, liquides ioniques, recyclage)"
  ],
  prereqs: ["Structure électronique des lanthanides et contraction lanthanidique", "Minéralogie et gisements des terres rares"],
  bodyHtml: `
    <p>Extraire un minerai de terres rares est relativement simple ; le vrai défi, industriellement et scientifiquement, est de séparer les 15-17 éléments <strong>les uns des autres</strong>. Comme on l'a vu au chapitre 2, tous les Ln³⁺ ont une chimie quasi identique — seule la contraction lanthanidique introduit de minuscules différences de taille exploitables.</p>

    <h3>1. De la roche au concentré</h3>
    <p>Le minerai brut, qui ne contient souvent que quelques pourcents de terres rares, est d'abord concentré par des procédés physiques classiques (broyage, flottation, séparation gravimétrique ou magnétique) pour obtenir un concentré titrant plusieurs dizaines de pourcents d'oxydes de terres rares (REO).</p>

    <h3>2. L'attaque chimique (« cracking »)</h3>
    <p>Le concentré est ensuite « attaqué » chimiquement pour dissoudre les terres rares sous forme d'ions en solution : la bastnäsite est généralement grillée puis attaquée à l'acide chlorhydrique, tandis que la monazite, plus résistante, nécessite une attaque à la soude concentrée (NaOH) à chaud ou à l'acide sulfurique concentré. Cette étape libère aussi le thorium et l'uranium contenus dans la monazite (chapitre 3), qu'il faut isoler séparément comme résidus radioactifs avant de poursuivre le traitement des terres rares proprement dites.</p>

    <h3>3. Séparer des lanthanides voisins : l'extraction liquide-liquide à contre-courant</h3>
    <p>La méthode industrielle dominante est l'<strong>extraction liquide-liquide</strong> : la solution aqueuse acide contenant les Ln³⁺ est mise en contact avec une phase organique (souvent du kérosène) contenant un extractant acide organophosphoré, comme l'acide di-(2-éthylhexyl)phosphorique (D2EHPA) ou l'acide phosphonique PC88A. Cet extractant complexe préférentiellement les lanthanides les plus petits (donc les plus lourds, à charge/rayon plus élevée), qui passent alors dans la phase organique tandis que les plus légers restent en phase aqueuse.</p>
    <p>Pour chaque paire d'éléments, on définit le <strong>coefficient de distribution</strong> :</p>
    <div class="formula-box">$$D = \\frac{[\\text{Ln}]_{\\text{organique}}}{[\\text{Ln}]_{\\text{aqueuse}}}$$</div>
    <p>et le <strong>facteur de séparation</strong> entre deux lanthanides A et B :</p>
    <div class="formula-box">$$\\beta_{A/B} = \\frac{D_A}{D_B}$$</div>
    <div class="key-point">
      <span class="eyebrow">Pourquoi tant d'étages ?</span>
      Plus β est proche de 1, plus les deux éléments se comportent de façon similaire dans l'extraction, et plus il faut d'étages successifs pour les séparer efficacement. Comme les lanthanides adjacents ont des rayons ioniques très proches (contraction lanthanidique, chapitre 2), leurs facteurs de séparation deux-à-deux sont souvent compris entre 1,5 et 3 : il faut alors enchaîner des <strong>cascades de plusieurs dizaines à plusieurs centaines d'étages mélangeur-décanteur</strong> en contre-courant (le flux aqueux et le flux organique circulent en sens opposés) pour obtenir des oxydes individuels de pureté suffisante (souvent &gt; 99,99 % pour les usages électroniques). C'est cette étape, longue et capitalistique, qui explique pourquoi si peu de pays maîtrisent le raffinage des terres rares — bien plus que la rareté du minerai lui-même (chapitre 8).
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour une paire de lanthanides adjacents, on mesure $D_A = 2{,}4$ et $D_B = 1{,}1$. Calculer β et commenter la difficulté de séparation.</p>
      <p><strong>Solution :</strong> $\\beta_{A/B} = \\dfrac{2{,}4}{1{,}1} \\approx 2{,}18$. Cette valeur, modérée, indique une séparation possible mais nécessitant un nombre significatif d'étages en cascade — typique d'une paire de lanthanides voisins.</p>
      <p class="example-answer">Réponse : β ≈ 2,18 — séparation modérément difficile.</p>
    </div>

    <h3>4. Vers l'oxyde pur : précipitation et calcination</h3>
    <p>Une fois séparée, chaque solution de lanthanide pur est reprécipitée, le plus souvent sous forme d'oxalate $Ln_2(C_2O_4)_3$, un composé peu soluble et facile à filtrer, puis <strong>calcinée</strong> à haute température pour obtenir l'oxyde final $Ln_2O_3$ (ou $CeO_2$ pour le cérium, du fait de son degré d'oxydation +4 stable, chapitre 2) — la forme commerciale de référence dans laquelle les terres rares sont vendues et échangées.</p>

    <h3>5. Alternatives et recyclage</h3>
    <p>D'autres techniques existent : la <strong>chromatographie d'échange d'ions</strong> permet d'atteindre des puretés extrêmes pour des besoins de recherche, mais reste trop lente et coûteuse pour la production de masse. Des recherches actives portent sur des extractants plus « verts », notamment à base de <strong>liquides ioniques</strong>, pour réduire l'usage de solvants organiques toxiques et volatils. Enfin, le <strong>recyclage</strong> des terres rares contenues dans les aimants permanents ou les luminophores en fin de vie (disques durs, moteurs électriques, lampes) constitue une source secondaire encore marginale aujourd'hui, mais en croissance rapide face aux tensions d'approvisionnement (chapitre 8).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Étapes : concentration physique → attaque chimique (cracking) → extraction liquide-liquide → précipitation (oxalate) → calcination (oxyde)</li>
        <li>Coefficient de distribution $D = [Ln]_{org}/[Ln]_{aq}$ ; facteur de séparation $\\beta_{A/B}=D_A/D_B$</li>
        <li>Plus β est proche de 1, plus la séparation demande d'étages en cascade — d'où la complexité de la séparation des lanthanides adjacents</li>
        <li>La monazite libère aussi du thorium/uranium, à gérer comme déchet radioactif dès l'attaque chimique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre D (coefficient de distribution d'UN élément) et β (rapport entre DEUX éléments)</li>
        <li>Croire qu'un seul étage d'extraction liquide-liquide suffit à séparer deux lanthanides voisins</li>
        <li>Penser que la difficulté vient de la rareté du minerai plutôt que de la similarité chimique des lanthanides entre eux</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — facteur de séparation β</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre les coefficients de distribution de deux lanthanides pour estimer la difficulté de leur séparation.</p>
      <div class="sim-controls">
        <label>D_A : <input type="number" id="terrDA" value="2.4" step="0.1" style="width:70px;" oninput="updateTerresSeparation()"></label>
        <label>D_B : <input type="number" id="terrDB" value="1.1" step="0.1" style="width:70px;" oninput="updateTerresSeparation()"></label>
        <div class="sim-readout" id="terrSepReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans l'extraction liquide-liquide des terres rares, l'extractant organophosphoré complexe préférentiellement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr4e1" value="wrong"> les lanthanides les plus légers (rayon le plus grand)</label>
          <label class="option"><input type="radio" name="terr4e1" value="right"> les lanthanides les plus lourds (rayon le plus petit)</label>
          <label class="option"><input type="radio" name="terr4e1" value="wrong"> uniquement le cérium</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr4e1','terr4fb1','Correct — les ions plus petits (donc plus lourds dans la série) ont une charge/rayon plus élevée et sont mieux complexés par l\\'extractant acide.','Pense au potentiel ionique z/r introduit au chapitre suivant : plus l\\'ion est petit, plus il est fortement complexé.')">Vérifier</button>
        <div class="feedback" id="terr4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si D_A = 3,0 et D_B = 3,0, le facteur de séparation β vaut 1. Que peut-on en conclure ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr4e2" value="right"> A et B se comportent de façon identique dans ce système : ils ne peuvent pas être séparés ainsi</label>
          <label class="option"><input type="radio" name="terr4e2" value="wrong"> A et B sont parfaitement séparés en un seul étage</label>
          <label class="option"><input type="radio" name="terr4e2" value="wrong"> A est deux fois plus concentré que B en phase organique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr4e2','terr4fb2','Correct — β=1 signifie que les deux éléments se répartissent de façon identique entre les deux phases : aucune séparation n\\'est possible avec ce système.','β=1 signifie D_A = D_B : aucune différence de comportement entre les deux éléments.')">Vérifier</button>
        <div class="feedback" id="terr4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Après séparation, un lanthanide pur est le plus souvent transformé en oxyde commercial par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr4e3" value="wrong"> distillation directe de la solution aqueuse</label>
          <label class="option"><input type="radio" name="terr4e3" value="right"> précipitation à l'état d'oxalate, puis calcination</label>
          <label class="option"><input type="radio" name="terr4e3" value="wrong"> électrolyse à froid</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr4e3','terr4fb3','Correct — l\\'oxalate de lanthanide, peu soluble, est précipité puis calciné à haute température pour donner l\\'oxyde Ln2O3 (ou CeO2).','La précipitation-calcination est la voie standard pour obtenir un oxyde de haute pureté.')">Vérifier</button>
        <div class="feedback" id="terr4fb3"></div>
      </div>
    </div>
  `,
  init: initTerresSeparation
};

TERRES_NOVA_KB[terresKey('Extraction et séparation des terres rares : de la mine à l\'oxyde pur')] = {
  intro: "Salut, moi c'est Nova ! On est sur l'extraction et la séparation des terres rares. Demande-moi ce qu'est le facteur de séparation β, pourquoi c'est si difficile de séparer deux lanthanides voisins, ou un indice sur un exercice.",
  rules: [
    { test:/extraction liquide|contre-courant|d2ehpa|pc88a/i, replies:["L'extraction liquide-liquide met en contact une phase aqueuse acide (Ln³⁺) avec une phase organique contenant un extractant (D2EHPA, PC88A). Les lanthanides les plus petits sont mieux complexés et passent en phase organique."] },
    { test:/coefficient de distribution|\bd\b\s*=/i, replies:["Le coefficient de distribution D = [Ln]organique / [Ln]aqueuse mesure comment UN élément se répartit entre les deux phases."] },
    { test:/facteur de s[ée]paration|β|beta/i, replies:["Le facteur de séparation β = D_A/D_B compare DEUX éléments. Plus β est proche de 1, plus la séparation est difficile et nécessite d'étages."] },
    { test:/cascade|[ée]tages|mélangeur/i, replies:["Comme les lanthanides voisins ont des β proches de 1-3, il faut souvent des cascades de dizaines à centaines d'étages mélangeur-décanteur en contre-courant pour les séparer."] },
    { test:/oxalate|calcination/i, replies:["Après séparation, chaque lanthanide pur est précipité sous forme d'oxalate (peu soluble) puis calciné à haute température pour donner l'oxyde Ln2O3 commercial."] },
    { test:/recyclage/i, replies:["Le recyclage des terres rares (aimants, luminophores en fin de vie) reste une source secondaire marginale aujourd'hui, mais en croissance face aux tensions d'approvisionnement."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la taille des ions et à leur charge/rayon.","Indice niveau 2 : les ions plus petits ont une charge/rayon plus élevée.","Indice niveau 3 : ce sont donc les lanthanides les plus lourds (rayon le plus petit) qui sont préférentiellement extraits."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : que signifie D_A = D_B ?","Indice niveau 2 : les deux éléments se répartissent alors de façon identique entre les deux phases.","Indice niveau 3 : donc β=1 et la séparation est impossible avec ce système."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : quelle est la voie standard de précipitation en chimie des lanthanides ?","Indice niveau 2 : c'est un composé peu soluble et facile à filtrer.","Indice niveau 3 : précipitation à l'oxalate, puis calcination en oxyde."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 5 — Calculateur de potentiel ionique φ = z/r (Chapitre 5)
--------------------------------------------------------------------------------- */
function updateTerresPotentiel(){
  const z = parseFloat(document.getElementById('terrPhiZ').value) || 3;
  const r = parseFloat(document.getElementById('terrPhiR').value) || 100;
  const phi = z / r;
  document.getElementById('terrPhiReadout').innerHTML =
    `φ = z / r = ${z} / ${r} pm = <strong>${phi.toFixed(4)} charge/pm</strong><br>Plus φ est élevé, plus l'ion est un acide de Lewis fort et plus son aqua-ion est acide en solution.`;
}
function initTerresPotentiel(){ updateTerresPotentiel(); }

/* =========================== CHAPITRE 5 — Propriétés physico-chimiques et chimie de coordination =========================== */
TERRES_CHAPTERS[terresKey('Propriétés physico-chimiques et chimie de coordination des lanthanides')] = {
  objectives: [
    "Décrire le caractère majoritairement ionique et non directionnel de la liaison Ln-ligand",
    "Expliquer pourquoi les nombres de coordination des complexes de lanthanides sont élevés (8 à 12) contrairement aux métaux de transition d",
    "Relier le potentiel ionique (charge/rayon) des Ln³⁺ à leur acidité de Lewis et à la basicité de leurs hydroxydes",
    "Distinguer la chimie de coordination des lanthanides de celle des métaux de transition d (absence d'effet de champ cristallin dirigé)"
  ],
  prereqs: ["Structure électronique des lanthanides et contraction lanthanidique", "Notions de chimie de coordination (théorie du champ cristallin)"],
  bodyHtml: `
    <p>La chimie de coordination des lanthanides diffère profondément de celle des métaux de transition d, pour une raison déjà posée au chapitre 2 : les électrons 4f, blindés, ne participent quasiment pas aux liaisons.</p>

    <h3>1. Une liaison essentiellement électrostatique</h3>
    <p>Contrairement aux métaux d, dont les orbitales de valence sont directement impliquées dans la liaison et orientées dans l'espace, la liaison Ln-ligand est presque exclusivement de nature <strong>ionique / électrostatique</strong>, non directionnelle. Les lanthanides se comportent chimiquement comme de « grosses billes chargées » : la géométrie de leurs complexes est déterminée par l'encombrement stérique et l'électrostatique des ligands, pas par des orbitales dirigées.</p>

    <h3>2. Des nombres de coordination élevés et variables</h3>
    <p>Cette absence de directionnalité, combinée à la grande taille des ions Ln³⁺ par rapport aux métaux de transition, permet d'accueillir bien plus de ligands autour du centre métallique. Les <strong>nombres de coordination (NC) de 8 et 9 sont typiques</strong> — par exemple l'ion aqua $[La(H_2O)_9]^{3+}$ pour les lanthanides légers, plus volumineux, contre $[Lu(H_2O)_8]^{3+}$ pour les lanthanides lourds, plus contractés (contraction lanthanidique, chapitre 2). Avec des ligands petits et chélatants comme le nitrate, des NC allant jusqu'à 12 sont observés.</p>
    <table class="mini-table">
      <tr><th>Ion / complexe</th><th>Nombre de coordination typique</th></tr>
      <tr><td>$[La(H_2O)_9]^{3+}$</td><td>9</td></tr>
      <tr><td>$[Nd(H_2O)_9]^{3+}$</td><td>9</td></tr>
      <tr><td>$[Lu(H_2O)_8]^{3+}$</td><td>8</td></tr>
      <tr><td>$[Ce(NO_3)_6]^{3-}$ (nitrate chélatant)</td><td>12</td></tr>
    </table>

    <h3>3. Potentiel ionique et acidité de Lewis</h3>
    <p>On introduit le <strong>potentiel ionique</strong> (ou densité de charge) d'un cation :</p>
    <div class="formula-box">$$\\varphi = \\frac{z}{r}$$</div>
    <p>où $z$ est la charge de l'ion et $r$ son rayon. Comme la charge reste constante ($z=3$) tout au long de la série des lanthanides tandis que le rayon diminue régulièrement (contraction lanthanidique), le potentiel ionique <strong>augmente</strong> de La³⁺ à Lu³⁺.</p>
    <div class="key-point">
      <span class="eyebrow">Conséquence : une acidité croissante</span>
      Un potentiel ionique plus élevé signifie un ion plus polarisant, donc un acide de Lewis plus fort : les aqua-ions des lanthanides lourds retiennent moins fortement leurs molécules d'eau et libèrent plus facilement un proton ($[Ln(H_2O)_9]^{3+} \\rightleftharpoons [Ln(H_2O)_8(OH)]^{2+} + H^+$). En conséquence, les hydroxydes $Ln(OH)_3$ deviennent progressivement moins basiques (et légèrement moins solubles dans l'eau) en descendant la série vers le lutécium. Cette tendance se répercute directement sur la sélectivité de l'extraction liquide-liquide étudiée au chapitre précédent.
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> comparer le potentiel ionique de La³⁺ ($r=103$ pm) et de Lu³⁺ ($r=86{,}1$ pm).</p>
      <p><strong>Solution :</strong> $\\varphi(La^{3+}) = \\dfrac{3}{103} \\approx 0{,}0291$ charge/pm ; $\\varphi(Lu^{3+}) = \\dfrac{3}{86{,}1} \\approx 0{,}0348$ charge/pm. Le potentiel ionique de Lu³⁺ est environ 20 % plus élevé que celui de La³⁺.</p>
      <p class="example-answer">Réponse : φ(Lu³⁺) > φ(La³⁺) — Lu³⁺ est un acide de Lewis plus fort.</p>
    </div>

    <h3>4. Ligands préférés et applications</h3>
    <p>Selon la théorie HSAB (acides et bases durs et mous), les Ln³⁺ sont des <strong>acides durs</strong> : ils forment des liaisons préférentiellement avec des donneurs durs, en particulier l'oxygène (eau, carboxylates, phosphates) plutôt qu'avec l'azote ou le soufre. Cette affinité est exploitée dans les <strong>ligands chélatants polyaminocarboxyliques</strong> comme le DTPA, qui forment des complexes très stables — le complexe $Gd(DTPA)^{2-}$ est d'ailleurs l'agent de contraste le plus utilisé en imagerie par résonance magnétique (IRM) médicale, grâce au moment magnétique exceptionnel du gadolinium (chapitre 6).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>La liaison Ln-ligand est essentiellement ionique et non directionnelle (pas d'effet de champ cristallin dirigé comme dans le bloc d)</li>
        <li>Nombres de coordination typiques : 8 à 9 (jusqu'à 12 avec des ligands petits et chélatants comme le nitrate)</li>
        <li>Potentiel ionique φ = z/r augmente le long de la série (contraction lanthanidique) → acidité de Lewis croissante de La³⁺ à Lu³⁺</li>
        <li>Les Ln³⁺ sont des acides durs (HSAB) : forte affinité pour les donneurs oxygénés</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer la théorie du champ cristallin (utile pour le bloc d) pour prédire la géométrie des complexes de lanthanides — ce raisonnement ne s'applique pas</li>
        <li>Oublier que le nombre de coordination des lanthanides est bien plus élevé (8-12) que celui des métaux de transition d classiques (4-6)</li>
        <li>Confondre le sens de variation de φ : c'est le rayon qui diminue, donc φ qui AUGMENTE, vers le lutécium</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — potentiel ionique φ = z/r</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre la charge et le rayon (en pm) d'un ion pour calculer sa densité de charge.</p>
      <div class="sim-controls">
        <label>Charge z : <input type="number" id="terrPhiZ" value="3" style="width:60px;" oninput="updateTerresPotentiel()"></label>
        <label>Rayon r (pm) : <input type="number" id="terrPhiR" value="103" style="width:70px;" oninput="updateTerresPotentiel()"></label>
        <div class="sim-readout" id="terrPhiReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La géométrie des complexes de lanthanides est déterminée principalement par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr5e1" value="wrong"> l'orientation des orbitales 4f, comme le champ cristallin dans le bloc d</label>
          <label class="option"><input type="radio" name="terr5e1" value="right"> l'encombrement stérique et l'électrostatique des ligands</label>
          <label class="option"><input type="radio" name="terr5e1" value="wrong"> la géométrie tétraédrique imposée par les orbitales 6s</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr5e1','terr5fb1','Correct — la liaison Ln-ligand est ionique et non directionnelle : la géométrie dépend surtout de la taille et de la disposition des ligands.','Les orbitales 4f sont blindées et ne participent presque pas à la liaison — donc pas d\\'effet de champ cristallin dirigé.')">Vérifier</button>
        <div class="feedback" id="terr5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le potentiel ionique φ = z/r des ions Ln³⁺ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr5e2" value="wrong"> diminue de La³⁺ à Lu³⁺</label>
          <label class="option"><input type="radio" name="terr5e2" value="right"> augmente de La³⁺ à Lu³⁺</label>
          <label class="option"><input type="radio" name="terr5e2" value="wrong"> reste constant sur toute la série</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr5e2','terr5fb2','Correct — la charge z=3 est constante mais le rayon r diminue (contraction lanthanidique), donc φ=z/r augmente vers le lutécium.','La charge est constante ; c\\'est le rayon qui diminue le long de la série.')">Vérifier</button>
        <div class="feedback" id="terr5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Selon la théorie HSAB, les ions Ln³⁺ sont des acides de Lewis :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr5e3" value="right"> durs, avec une forte affinité pour les donneurs oxygénés</label>
          <label class="option"><input type="radio" name="terr5e3" value="wrong"> mous, avec une forte affinité pour le soufre</label>
          <label class="option"><input type="radio" name="terr5e3" value="wrong"> ni durs ni mous, sans préférence de ligand</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr5e3','terr5fb3','Correct — les Ln³⁺ sont des acides durs, ce qui explique leur forte affinité pour l\\'oxygène (eau, carboxylates, phosphates) et l\\'usage de chélatants comme le DTPA.','Les petits cations à forte charge/rayon (comme Ln³⁺) sont classés parmi les acides DURS.')">Vérifier</button>
        <div class="feedback" id="terr5fb3"></div>
      </div>
    </div>
  `,
  init: initTerresPotentiel
};

TERRES_NOVA_KB[terresKey('Propriétés physico-chimiques et chimie de coordination des lanthanides')] = {
  intro: "Salut, moi c'est Nova ! On est sur la chimie de coordination des lanthanides. Demande-moi pourquoi leur nombre de coordination est si élevé, ce qu'est le potentiel ionique, ou un indice sur un exercice.",
  rules: [
    { test:/nombre de coordination|coordinence/i, replies:["Les lanthanides ont typiquement des nombres de coordination de 8 à 9 (parfois jusqu'à 12), bien plus élevés que les métaux de transition d, car la liaison est ionique et non directionnelle."] },
    { test:/champ cristallin/i, replies:["La théorie du champ cristallin, utile pour le bloc d, ne s'applique presque pas aux lanthanides : les électrons 4f sont blindés et ne ressentent quasiment pas le champ des ligands."] },
    { test:/potentiel ionique|φ|phi/i, replies:["Le potentiel ionique φ = z/r mesure la densité de charge d'un ion. Il augmente de La³⁺ à Lu³⁺ à cause de la contraction lanthanidique (rayon qui diminue à charge constante)."] },
    { test:/acidit[ée]/i, replies:["Plus φ est élevé, plus l'ion est un acide de Lewis fort : les aqua-ions des lanthanides lourds sont donc plus acides que ceux des lanthanides légers."] },
    { test:/hsab|dur|mou/i, replies:["Selon la théorie HSAB, les Ln³⁺ sont des acides durs : ils préfèrent les donneurs durs comme l'oxygène (eau, carboxylates) plutôt que l'azote ou le soufre."] },
    { test:/dtpa|gadolinium|irm/i, replies:["Le complexe Gd(DTPA)²⁻ est l'agent de contraste IRM le plus utilisé, grâce au moment magnétique exceptionnel du gadolinium (voir chapitre suivant) stabilisé par un ligand chélatant à donneurs oxygénés/azotés."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : les électrons 4f participent-ils vraiment à la liaison ?","Indice niveau 2 : non, ils sont blindés — donc pas d'orbitales dirigées qui contrôlent la géométrie.","Indice niveau 3 : c'est l'encombrement stérique et l'électrostatique des ligands qui dominent."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : la charge est-elle constante le long de la série ?","Indice niveau 2 : oui, z=3 partout ; c'est le rayon qui change.","Indice niveau 3 : le rayon diminue, donc φ=z/r augmente vers le lutécium."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : les petits cations très chargés sont-ils plutôt durs ou mous en HSAB ?","Indice niveau 2 : les Ln³⁺ sont petits et fortement chargés.","Indice niveau 3 : ce sont donc des acides DURS, avec une forte affinité pour l'oxygène."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 6 — Comparateur d'aimants permanents (Chapitre 6)
--------------------------------------------------------------------------------- */
const TERRES_AIMANTS = {
  ferrite: { nom:'Ferrite (céramique)', bhmax:'≈ 30-40 kJ/m³', usage:'Bas coût : haut-parleurs grand public, jouets, applications non critiques' },
  alnico: { nom:'AlNiCo', bhmax:'≈ 40-80 kJ/m³', usage:'Bonne stabilité thermique, instrumentation de précision, capteurs' },
  smco: { nom:'Samarium-Cobalt (SmCo)', bhmax:'≈ 150-240 kJ/m³', usage:'Très haute température, aérospatiale, défense' },
  ndfeb: { nom:'Néodyme-Fer-Bore (Nd₂Fe₁₄B)', bhmax:'≈ 400-470 kJ/m³', usage:'Le plus puissant : moteurs de véhicules électriques, éoliennes, disques durs' }
};
function updateTerresAimant(){
  const sel = document.getElementById('terrAimantSelect').value;
  const a = TERRES_AIMANTS[sel];
  document.getElementById('terrAimantReadout').innerHTML =
    `<strong>${a.nom}</strong><br>Produit énergétique (BH)max typique : ${a.bhmax}<br>Usage typique : ${a.usage}`;
}
function initTerresAimant(){ updateTerresAimant(); }

/* =========================== CHAPITRE 6 — Propriétés magnétiques et optiques =========================== */
TERRES_CHAPTERS[terresKey('Propriétés magnétiques et optiques : magnétisme et luminescence')] = {
  objectives: [
    "Expliquer l'origine du moment magnétique élevé des ions lanthanides (électrons 4f non appariés et non blindés du couplage spin-orbite)",
    "Relier ce magnétisme à l'utilisation des terres rares dans les aimants permanents à très haute performance (Nd₂Fe₁₄B, SmCo)",
    "Décrire le principe de la luminescence des ions lanthanides (transitions f-f, effet d'antenne) et son exploitation dans les luminophores",
    "Comparer les aimants permanents en termes de produit énergétique (BH)max"
  ],
  prereqs: ["Structure électronique des lanthanides et contraction lanthanidique"],
  bodyHtml: `
    <p>Deux propriétés physiques rendent les terres rares irremplaçables dans la technologie moderne : un <strong>magnétisme exceptionnel</strong> et une <strong>luminescence très pure</strong>. Les deux trouvent leur origine dans la même caractéristique déjà rencontrée : les électrons 4f, profondément enfouis.</p>

    <h3>1. Pourquoi les lanthanides sont-ils si magnétiques ?</h3>
    <p>Chez les métaux de transition d, le champ des ligands « éteint » en grande partie le moment angulaire orbital des électrons (quenching) : seul le spin contribue significativement au magnétisme. Chez les lanthanides, c'est l'inverse : les électrons 4f, blindés du champ cristallin (chapitre 5) mais soumis à un fort <strong>couplage spin-orbite</strong>, conservent leur moment angulaire orbital. Le moment magnétique résultant, décrit par le nombre quantique $J$ (couplage $L$-$S$) et le facteur de Landé $g_J$, est en conséquence bien plus élevé que pour n'importe quel métal de transition d. Le dysprosium et l'holmium comptent ainsi parmi les éléments présentant les moments magnétiques atomiques les plus élevés connus.</p>

    <h3>2. Des aimants permanents géants : Nd₂Fe₁₄B et SmCo</h3>
    <p>Découvert en 1984, le composé intermétallique <strong>Nd₂Fe₁₄B</strong> combine l'aimantation élevée du fer avec l'énorme <strong>anisotropie magnétocristalline</strong> apportée par les électrons 4f du néodyme — c'est cette anisotropie qui permet à l'aimant de résister à la désaimantation. Il en résulte les aimants permanents commerciaux les plus puissants jamais fabriqués, avec un produit énergétique $(BH)_{max}$ de l'ordre de 400 à 470 kJ/m³, contre seulement 30 à 40 kJ/m³ pour un aimant ferrite classique — plus de dix fois plus puissant à volume égal.</p>
    <div class="key-point">
      <span class="eyebrow">Le rôle discret mais critique du dysprosium et du terbium</span>
      Un aimant NdFeB pur perd rapidement ses performances à haute température. Pour les applications exigeantes (moteurs de traction automobile, générateurs d'éoliennes, qui chauffent beaucoup en fonctionnement), les fabricants substituent quelques pourcents de néodyme par du <strong>dysprosium</strong> (et parfois du <strong>terbium</strong>), ce qui augmente fortement la coercivité et la tenue en température. Bien que présents en faible quantité, Dy et Tb sont donc des éléments critiques — rappelons (chapitre 3) qu'ils proviennent presque exclusivement des argiles à adsorption ionique du sud de la Chine.
    </div>
    <table class="mini-table">
      <tr><th>Type d'aimant</th><th>(BH)max typique</th><th>Usage typique</th></tr>
      <tr><td>Ferrite (céramique)</td><td>30-40 kJ/m³</td><td>Bas coût, haut-parleurs grand public</td></tr>
      <tr><td>AlNiCo</td><td>40-80 kJ/m³</td><td>Instrumentation, bonne stabilité thermique</td></tr>
      <tr><td>Samarium-Cobalt (SmCo)</td><td>150-240 kJ/m³</td><td>Très haute température, aérospatiale, défense</td></tr>
      <tr><td>Néodyme-Fer-Bore (NdFeB)</td><td>400-470 kJ/m³</td><td>Moteurs électriques, éoliennes, disques durs</td></tr>
    </table>

    <h3>3. La luminescence des lanthanides</h3>
    <p>Les transitions électroniques entre niveaux 4f sont formellement <strong>interdites</strong> par les règles de sélection (interdiction de Laporte, et souvent interdiction de spin) : l'absorption directe de lumière par un ion Ln³⁺ isolé est donc très faible. Mais lorsqu'un tel état excité est malgré tout peuplé, il se désexcite en émettant une lumière remarquablement <strong>pure et fine</strong> (raies étroites, contrairement aux larges bandes d'émission des composés organiques), avec des durées de vie longues (de la microseconde à la milliseconde, contre la nanoseconde pour un fluorophore organique classique).</p>
    <p>Pour contourner la faible absorption directe, on utilise l'<strong>effet d'antenne</strong> : un ligand ou un co-dopant absorbe efficacement la lumière incidente, puis transfère cette énergie de façon non radiative vers l'ion lanthanide, qui émet alors sa couleur caractéristique. Chaque ion a sa signature : rouge pour l'europium(III), vert pour le terbium(III), bleu pour le cérium(III) ou l'europium(II) — ce dernier via une transition 5d→4f, permise, donc beaucoup plus intense et large que les transitions f-f.</p>
    <div class="example-box">
      <span class="eyebrow">Application phare : l'éclairage LED blanc</span>
      <p>Une LED blanche courante associe une puce LED bleue (InGaN) à un luminophore <strong>YAG:Ce</strong> (grenat d'yttrium-aluminium dopé au cérium) : le cérium absorbe une partie de la lumière bleue et la réémet en jaune ; le mélange de bleu résiduel et de jaune émis donne à l'œil une lumière blanche. Le même principe (Eu³⁺ rouge, Tb³⁺ vert) est utilisé dans les luminophores des écrans et des lampes fluocompactes.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le fort couplage spin-orbite des électrons 4f, non éteint par le champ cristallin, donne aux lanthanides des moments magnétiques exceptionnellement élevés</li>
        <li>Nd₂Fe₁₄B fournit les aimants permanents les plus puissants ((BH)max ≈ 400-470 kJ/m³), grâce à l'anisotropie magnétocristalline apportée par le néodyme</li>
        <li>Dy et Tb, ajoutés en faible quantité, améliorent la tenue en température des aimants NdFeB — d'où leur criticité malgré des volumes modestes</li>
        <li>Les transitions f-f sont formellement interdites → émission fine et de longue durée de vie ; l'effet d'antenne pallie la faible absorption directe</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'un aimant NdFeB ne contient que du néodyme — c'est un composé Nd₂Fe₁₄B, où le fer et le bore jouent un rôle structurel essentiel</li>
        <li>Confondre les raies fines des transitions f-f (interdites, lanthanides trivalents) avec les larges bandes des transitions d-f permises (Ce³⁺, Eu²⁺)</li>
        <li>Penser que le dysprosium est l'ingrédient principal d'un aimant NdFeB — il n'est ajouté qu'en faible pourcentage pour la tenue thermique</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Comparateur d'aimants permanents</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Choisis un type d'aimant pour comparer son produit énergétique (BH)max et ses usages typiques.</p>
      <div class="sim-controls">
        <label>Type d'aimant :
          <select id="terrAimantSelect" onchange="updateTerresAimant()">
            <option value="ferrite">Ferrite (céramique)</option>
            <option value="alnico">AlNiCo</option>
            <option value="smco">Samarium-Cobalt (SmCo)</option>
            <option value="ndfeb">Néodyme-Fer-Bore (NdFeB)</option>
          </select>
        </label>
        <div class="sim-readout" id="terrAimantReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le moment magnétique élevé des lanthanides s'explique par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr6e1" value="wrong"> l'absence totale de couplage spin-orbite</label>
          <label class="option"><input type="radio" name="terr6e1" value="right"> un fort couplage spin-orbite et un moment angulaire orbital non éteint par le champ cristallin</label>
          <label class="option"><input type="radio" name="terr6e1" value="wrong"> la présence d'électrons 5d non appariés uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr6e1','terr6fb1','Correct — le champ cristallin n\\'éteint pas le moment orbital des électrons 4f (blindés), qui se combine au spin via un fort couplage spin-orbite.','Chez les métaux d, le champ cristallin éteint le moment orbital ; chez les lanthanides, ce n\\'est pas le cas.')">Vérifier</button>
        <div class="feedback" id="terr6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un aimant NdFeB destiné à un moteur de véhicule électrique, on ajoute souvent du dysprosium pour :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr6e2" value="wrong"> réduire le coût de fabrication</label>
          <label class="option"><input type="radio" name="terr6e2" value="right"> améliorer la coercivité et la tenue en température</label>
          <label class="option"><input type="radio" name="terr6e2" value="wrong"> remplacer complètement le néodyme</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr6e2','terr6fb2','Correct — le dysprosium (en faible quantité) augmente la coercivité et la résistance thermique de l\\'aimant, essentielle dans un moteur qui chauffe.','Le dysprosium est ajouté en petite quantité, pas pour remplacer le néodyme ni pour réduire les coûts.')">Vérifier</button>
        <div class="feedback" id="terr6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Les transitions f-f des ions Ln³⁺ produisent des raies d'émission fines et de longue durée de vie car ces transitions sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr6e3" value="right"> formellement interdites par les règles de sélection (Laporte/spin)</label>
          <label class="option"><input type="radio" name="terr6e3" value="wrong"> totalement permises et très intenses</label>
          <label class="option"><input type="radio" name="terr6e3" value="wrong"> dues à des transitions 5d-4f</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr6e3','terr6fb3','Correct — l\\'interdiction formelle (Laporte, spin) rend les transitions f-f lentes et fines ; c\\'est pour compenser leur faible absorption directe qu\\'on utilise l\\'effet d\\'antenne.','Les transitions 5d-4f (Ce³⁺, Eu²⁺) sont permises et larges — c\\'est l\\'inverse des transitions f-f.')">Vérifier</button>
        <div class="feedback" id="terr6fb3"></div>
      </div>
    </div>
  `,
  init: initTerresAimant
};

TERRES_NOVA_KB[terresKey('Propriétés magnétiques et optiques : magnétisme et luminescence')] = {
  intro: "Salut, moi c'est Nova ! On est sur le magnétisme et la luminescence des terres rares. Demande-moi pourquoi NdFeB est un aimant si puissant, le rôle du dysprosium, ou un indice sur un exercice.",
  rules: [
    { test:/moment magn[ée]tique|spin-orbite/i, replies:["Les électrons 4f, blindés du champ cristallin, gardent leur moment angulaire orbital ; combiné au spin via un fort couplage spin-orbite, cela donne aux lanthanides des moments magnétiques très élevés."] },
    { test:/ndfeb|n[ée]odyme.*fer|aimant/i, replies:["Nd2Fe14B combine l'aimantation du fer et l'anisotropie magnétocristalline du néodyme : c'est l'aimant permanent le plus puissant, avec (BH)max ≈ 400-470 kJ/m³."] },
    { test:/dysprosium|terbium/i, replies:["Le dysprosium (et parfois le terbium), ajoutés en faible quantité au NdFeB, augmentent fortement la coercivité et la tenue en température — essentiel pour les moteurs qui chauffent."] },
    { test:/luminescence|f-f|antenne/i, replies:["Les transitions f-f sont interdites par les règles de sélection : émission fine et longue durée de vie, mais faible absorption directe — d'où l'effet d'antenne, où un ligand absorbe puis transfère l'énergie à l'ion."] },
    { test:/yag|led|luminophore/i, replies:["Dans une LED blanche, une puce bleue excite un luminophore YAG:Ce qui réémet en jaune ; le mélange donne du blanc. Eu³⁺ (rouge) et Tb³⁺ (vert) sont utilisés dans d'autres luminophores."] },
    { test:/bhmax|produit [ée]nerg[ée]tique/i, replies:["Le produit énergétique (BH)max mesure la puissance d'un aimant permanent : NdFeB (≈400-470 kJ/m³) est plus de 10 fois plus puissant qu'un ferrite (≈30-40 kJ/m³) à volume égal."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le champ cristallin éteint-il le moment orbital des électrons 4f ?","Indice niveau 2 : non, ils sont blindés du champ cristallin.","Indice niveau 3 : le moment orbital reste actif, combiné au spin via un fort couplage spin-orbite."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pourquoi ajouter Dy en petite quantité, spécifiquement ?","Indice niveau 2 : un moteur électrique chauffe beaucoup en fonctionnement.","Indice niveau 3 : le dysprosium améliore la coercivité et la tenue en température."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : les transitions f-f sont-elles permises ou interdites ?","Indice niveau 2 : elles sont formellement interdites (Laporte, spin).","Indice niveau 3 : d'où des raies fines, de longue durée de vie, mais peu intenses directement."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 7 — Calculateur de teneur en néodyme d'un aimant (Chapitre 7)
--------------------------------------------------------------------------------- */
function updateTerresMasseNd(){
  const masse = parseFloat(document.getElementById('terrMasseAimant').value) || 0;
  const pct = parseFloat(document.getElementById('terrPctNd').value) || 0;
  const masseNd = masse * pct / 100;
  document.getElementById('terrMasseReadout').innerHTML =
    `Masse de néodyme contenue : ${masse} kg × ${pct}% = <strong>${masseNd.toFixed(3)} kg de Nd</strong>`;
}
function initTerresMasseNd(){ updateTerresMasseNd(); }

/* =========================== CHAPITRE 7 — Applications industrielles et technologiques =========================== */
TERRES_CHAPTERS[terresKey('Applications industrielles et technologiques des terres rares')] = {
  objectives: [
    "Recenser les grands secteurs d'application des terres rares (énergie, transport, électronique, défense, santé, catalyse)",
    "Expliquer le rôle du néodyme et du dysprosium dans la transition énergétique (véhicules électriques, éoliennes)",
    "Décrire l'usage des terres rares en catalyse et en polissage optique",
    "Discuter le « problème de la balance » : le déséquilibre entre composition naturelle des gisements et demande industrielle"
  ],
  prereqs: ["Propriétés magnétiques et optiques : magnétisme et luminescence", "Propriétés physico-chimiques et chimie de coordination des lanthanides"],
  bodyHtml: `
    <p>Après avoir étudié la chimie et la physique des terres rares, ce chapitre fait le lien avec leurs usages concrets. En 2025, le marché mondial des terres rares était estimé à environ 14 milliards de dollars, avec une croissance annuelle prévue autour de 12 % par an jusqu'en 2034, tirée principalement par la transition énergétique.</p>

    <h3>1. Les aimants permanents : la plus grosse application</h3>
    <p>Les aimants représentent la première application des terres rares en valeur (environ 31 % du marché en 2025). Un moteur de traction de véhicule électrique contient typiquement 1 à 2 kg d'aimant NdFeB ; une éolienne à entraînement direct (sans multiplicateur mécanique) peut en contenir plusieurs centaines de kilogrammes. Avec plus de 17 millions de véhicules électriques vendus en 2024 dans le monde et une croissance continue, la demande de terres rares magnétiques (Nd, Pr, Dy, Tb) est aujourd'hui le principal moteur du marché.</p>

    <h3>2. La catalyse</h3>
    <p>L'oxyde de cérium $CeO_2$ joue un rôle central dans les <strong>pots catalytiques</strong> automobiles : grâce au couple $Ce^{4+}/Ce^{3+}$ (chapitre 2), il agit comme un réservoir d'oxygène capable d'en stocker et d'en libérer selon les besoins de la réaction catalytique, stabilisant l'efficacité de conversion des gaz d'échappement. Le lanthane, sous forme de zéolithes échangées au lanthane, est également un composant clé des catalyseurs de <strong>craquage catalytique en lit fluidisé</strong> (FCC) utilisés dans le raffinage du pétrole.</p>

    <h3>3. Polissage optique et verre</h3>
    <p>L'oxyde de cérium est aussi le principal agent de <strong>polissage optique</strong> utilisé dans le monde : verres de lunettes, écrans, miroirs, et même le polissage mécano-chimique (CMP) des plaquettes de semi-conducteurs. Le lanthane est ajouté aux verres optiques à haut indice de réfraction pour les objectifs d'appareils photo, et le néodyme colore certains verres (lunettes de soudage « didymium ») et constitue le cristal actif du laser Nd:YAG, largement utilisé en médecine et en industrie.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un moteur de véhicule électrique contient 1,5 kg d'aimant NdFeB, dont environ 30 % en masse est du néodyme métallique. Quelle masse de néodyme ce moteur contient-il ?</p>
      <p><strong>Solution :</strong> $m_{Nd} = 1{,}5 \\times \\dfrac{30}{100} = 0{,}45$ kg.</p>
      <p class="example-answer">Réponse : environ 0,45 kg de néodyme par moteur.</p>
    </div>

    <h3>4. Applications médicales et de défense</h3>
    <p>Le gadolinium sert d'agent de contraste en IRM (chapitre 5) ; les aimants SmCo et NdFeB équipent radars, sonars, missiles guidés et moteurs d'avions de chasse — un enjeu stratégique majeur qui explique la place des terres rares dans les discussions de sécurité nationale (chapitre 8).</p>

    <h3>5. Le « problème de la balance »</h3>
    <div class="key-point">
      <span class="eyebrow">Un déséquilibre structurel entre offre et demande</span>
      Un gisement de terres rares livre toujours un mélange dans des proportions fixées par la nature — très majoritairement du cérium et du lanthane, et seulement des traces d'europium, de terbium ou de lutécium. Or la demande industrielle est concentrée sur un nombre restreint d'éléments à forte valeur d'usage (néodyme et praséodyme pour les aimants, dysprosium et terbium pour leur tenue en température, europium pour les luminophores). Exploiter un gisement pour satisfaire la demande en éléments rares dans le minerai génère nécessairement un excédent d'éléments abondants (Ce, La) qu'il faut stocker ou valoriser dans d'autres usages (polissage, catalyse, alliages) — une contrainte économique typique de cette industrie, connue sous le nom de « problème de la balance ».
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Les aimants permanents (NdFeB) sont la première application en valeur (~31 % du marché en 2025), portée par les véhicules électriques et l'éolien</li>
        <li>CeO₂ est utilisé en catalyse (pots catalytiques, FCC) et comme abrasif de polissage optique de référence</li>
        <li>Le gadolinium sert d'agent de contraste IRM ; les aimants SmCo/NdFeB ont des usages stratégiques (défense, aérospatiale)</li>
        <li>« Problème de la balance » : la composition fixe des gisements (riches en Ce/La) ne correspond pas à la demande (concentrée sur Nd, Dy, Tb, Eu)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que toutes les terres rares sont également demandées — la demande est très concentrée sur quelques éléments (Nd, Pr, Dy, Tb, Eu)</li>
        <li>Oublier que le cérium et le lanthane, bien qu'abondants dans les gisements, ont aussi des usages industriels propres (catalyse, polissage)</li>
        <li>Penser que l'oxyde de cérium sert uniquement de pigment — son rôle principal est catalytique (stockage d'oxygène) et abrasif (polissage)</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — teneur en néodyme d'un aimant</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre la masse d'un aimant NdFeB et son pourcentage massique de néodyme pour estimer la masse de Nd contenue.</p>
      <div class="sim-controls">
        <label>Masse de l'aimant (kg) : <input type="number" id="terrMasseAimant" value="1.5" step="0.1" style="width:70px;" oninput="updateTerresMasseNd()"></label>
        <label>% massique de Nd : <input type="number" id="terrPctNd" value="30" style="width:60px;" oninput="updateTerresMasseNd()"></label>
        <div class="sim-readout" id="terrMasseReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La plus grosse application des terres rares en valeur, en 2025, est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr7e1" value="wrong"> le polissage optique</label>
          <label class="option"><input type="radio" name="terr7e1" value="right"> les aimants permanents</label>
          <label class="option"><input type="radio" name="terr7e1" value="wrong"> les agents de contraste IRM</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr7e1','terr7fb1','Correct — les aimants permanents représentent environ 31% du marché en 2025, tirés par les véhicules électriques et l\\'éolien.','Pense au secteur porté par la transition énergétique (véhicules électriques, éoliennes).')">Vérifier</button>
        <div class="feedback" id="terr7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un pot catalytique automobile, l'oxyde de cérium CeO₂ joue le rôle de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr7e2" value="wrong"> aimant permanent</label>
          <label class="option"><input type="radio" name="terr7e2" value="right"> réservoir d'oxygène, grâce au couple Ce⁴⁺/Ce³⁺</label>
          <label class="option"><input type="radio" name="terr7e2" value="wrong"> agent de contraste</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr7e2','terr7fb2','Correct — le couple Ce4+/Ce3+ permet à CeO2 de stocker et de libérer de l\\'oxygène, stabilisant la réaction catalytique.','Repense au chapitre 2 : le degré d\\'oxydation non standard du cérium, Ce4+.')">Vérifier</button>
        <div class="feedback" id="terr7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le « problème de la balance » désigne :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr7e3" value="wrong"> le déséquilibre du prix mondial de l'or face aux terres rares</label>
          <label class="option"><input type="radio" name="terr7e3" value="right"> le décalage entre la composition naturelle fixe d'un gisement et la demande industrielle concentrée sur quelques éléments</label>
          <label class="option"><input type="radio" name="terr7e3" value="wrong"> le déséquilibre de la balance commerciale entre la Chine et les États-Unis</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr7e3','terr7fb3','Correct — exploiter un gisement pour ses éléments rares et demandés (Nd, Dy...) génère un excédent d\\'éléments abondants (Ce, La) qu\\'il faut valoriser ailleurs.','Ce n\\'est pas une question de prix de l\\'or ni de commerce international — c\\'est un déséquilibre géochimie/demande.')">Vérifier</button>
        <div class="feedback" id="terr7fb3"></div>
      </div>
    </div>
  `,
  init: initTerresMasseNd
};

TERRES_NOVA_KB[terresKey('Applications industrielles et technologiques des terres rares')] = {
  intro: "Salut, moi c'est Nova ! On explore les applications des terres rares. Demande-moi pourquoi les aimants dominent le marché, le rôle de CeO2 en catalyse, ou un indice sur un exercice.",
  rules: [
    { test:/aimant|march[ée]|31/i, replies:["Les aimants permanents (NdFeB) représentent environ 31% du marché des terres rares en 2025, tirés par les véhicules électriques et l'éolien."] },
    { test:/catalyse|ceo2|pot catalytique|fcc/i, replies:["CeO2 agit comme réservoir d'oxygène dans les pots catalytiques (couple Ce4+/Ce3+) ; le lanthane est utilisé dans les zéolithes des catalyseurs de craquage FCC en raffinage."] },
    { test:/polissage/i, replies:["L'oxyde de cérium est le principal agent de polissage optique au monde : verres, écrans, miroirs, et même le polissage des plaquettes de semi-conducteurs (CMP)."] },
    { test:/probl[èe]me de la balance/i, replies:["Le « problème de la balance » : un gisement livre un mélange fixe (surtout Ce, La), mais la demande cible surtout Nd, Dy, Tb, Eu — d'où un excédent d'éléments abondants à valoriser ailleurs."] },
    { test:/v[ée]hicule [ée]lectrique|[ée]olienne/i, replies:["Un moteur de véhicule électrique contient 1 à 2 kg d'aimant NdFeB ; une éolienne à entraînement direct peut en contenir plusieurs centaines de kg."] },
    { test:/gadolinium|irm|contraste/i, replies:["Le gadolinium, sous forme de complexe Gd(DTPA)²⁻, est l'agent de contraste IRM le plus utilisé, grâce à son moment magnétique exceptionnel (7 électrons 4f non appariés)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : quel secteur est porté par la transition énergétique ?","Indice niveau 2 : véhicules électriques et éoliennes ont besoin de moteurs puissants.","Indice niveau 3 : ce sont les aimants permanents, ~31% du marché."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : quel degré d'oxydation non standard du cérium a-t-on vu au chapitre 2 ?","Indice niveau 2 : Ce4+, qui coexiste avec Ce3+.","Indice niveau 3 : ce couple permet de stocker/libérer de l'oxygène."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à la composition fixe d'un gisement versus la demande industrielle.","Indice niveau 2 : un gisement donne surtout Ce et La, pas Nd ou Dy en priorité.","Indice niveau 3 : d'où un excédent d'éléments abondants à écouler ailleurs."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 8 — Calculateur de part de marché (Chapitre 8)
--------------------------------------------------------------------------------- */
function updateTerresMarche(){
  const chine = parseFloat(document.getElementById('terrChine').value) || 0;
  const usa = parseFloat(document.getElementById('terrUSA').value) || 0;
  const aus = parseFloat(document.getElementById('terrAus').value) || 0;
  const myanmar = parseFloat(document.getElementById('terrMyanmar').value) || 0;
  const total = chine + usa + aus + myanmar;
  if(total <= 0){ document.getElementById('terrMarcheReadout').innerHTML = 'Entre des valeurs de production supérieures à zéro.'; return; }
  const pct = v => (v/total*100).toFixed(1);
  document.getElementById('terrMarcheReadout').innerHTML =
    `Production totale (4 pays) : <strong>${total.toLocaleString('fr-FR')} t REO</strong><br>` +
    `Chine : ${pct(chine)}% — États-Unis : ${pct(usa)}% — Australie : ${pct(aus)}% — Myanmar : ${pct(myanmar)}%`;
}
function initTerresMarche(){ updateTerresMarche(); }

/* =========================== CHAPITRE 8 — Enjeux géopolitiques, économiques et environnementaux =========================== */
TERRES_CHAPTERS[terresKey('Enjeux géopolitiques, économiques et environnementaux')] = {
  objectives: [
    "Décrire la concentration géographique de la production minière et, surtout, du raffinage mondial des terres rares",
    "Expliquer le rôle des restrictions à l'export chinoises comme outil de politique commerciale (crise de 2010, contrôles de 2025-2026)",
    "Identifier les impacts environnementaux de l'extraction des terres rares et les stratégies d'atténuation (recyclage, économie circulaire)",
    "Discuter les stratégies de diversification occidentales de l'approvisionnement"
  ],
  prereqs: ["Extraction et séparation des terres rares : de la mine à l'oxyde pur", "Minéralogie et gisements des terres rares"],
  bodyHtml: `
    <p>Ce dernier chapitre replace la chimie des terres rares dans son contexte économique et géopolitique — devenu, depuis le milieu des années 2010, l'un des sujets les plus suivis de l'actualité des matières premières critiques.</p>

    <h3>1. Une production mondiale extrêmement concentrée</h3>
    <p>Selon les données 2025 de l'USGS (United States Geological Survey), la production minière mondiale de terres rares atteint environ 390 000 tonnes d'équivalent oxyde (REO). La Chine à elle seule en produit environ 270 000 tonnes, soit près de 70 % du total mondial, loin devant les États-Unis (environ 51 000 tonnes, 13 %), l'Australie (environ 29 000 tonnes) et le Myanmar (environ 22 000 tonnes).</p>
    <table class="mini-table">
      <tr><th>Pays</th><th>Production 2025 (t REO, approx.)</th><th>Part mondiale approx.</th></tr>
      <tr><td>Chine</td><td>270 000</td><td>≈ 69 %</td></tr>
      <tr><td>États-Unis</td><td>51 000</td><td>≈ 13 %</td></tr>
      <tr><td>Australie</td><td>29 000</td><td>≈ 7 %</td></tr>
      <tr><td>Myanmar</td><td>22 000</td><td>≈ 6 %</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Le vrai goulot d'étranglement : le raffinage, pas la mine</span>
      La Chine ne doit pas sa domination à une supériorité géologique : elle ne détient qu'environ un tiers des réserves mondiales identifiées. Sa position dominante vient surtout de décennies d'investissement dans l'étape la plus difficile et la plus capitalistique de la chaîne de valeur, la <strong>séparation chimique</strong> (chapitre 4) : le pays concentrerait aujourd'hui autour de 85 à 90 % des capacités mondiales de raffinage et de fabrication d'aimants. C'est ce contrôle du raffinage — bien plus que celui du minerai — qui constitue le véritable levier stratégique.
    </div>

    <h3>2. L'arme commerciale : quotas et contrôles à l'export</h3>
    <p>En 2010, la Chine avait fortement réduit ses quotas d'exportation de terres rares, provoquant une flambée des prix mondiaux et poussant plusieurs pays occidentaux à relancer leurs propres projets miniers (dont la réouverture de Mountain Pass aux États-Unis et le développement de Mount Weld par l'Australien Lynas). Un différend porté devant l'Organisation mondiale du commerce avait finalement conduit la Chine à lever ces quotas en 2015.</p>
    <p>Une nouvelle vague de contrôles est intervenue en 2025-2026 : en avril 2025, la Chine a soumis sept terres rares et leurs dérivés à un régime de licences d'exportation ; en octobre 2025, elle a étendu ce régime à cinq éléments supplémentaires (samarium, gadolinium, lutécium, europium, ytterbium) et introduit une règle extraterritoriale exigeant une licence pour tout produit fabriqué hors de Chine s'il contient des matériaux ou technologies d'origine chinoise. Ces mesures d'octobre 2025 ont été suspendues jusqu'en novembre 2026 après une rencontre entre les dirigeants chinois et américain, mais de nouvelles restrictions ciblant des biens à double usage ont été introduites début 2026, notamment vis-à-vis du Japon. Les analystes s'accordent à décrire ces contrôles comme un outil de <strong>levier géopolitique</strong> plutôt qu'une réponse à une pénurie réelle de ressources.</p>

    <h3>3. Le coût environnemental de l'extraction</h3>
    <p>Le traitement des terres rares a un impact environnemental significatif à toutes les étapes. L'attaque de la monazite (chapitre 3) génère des résidus radioactifs (thorium, uranium) qui doivent être gérés comme déchets nucléaires de faible activité — une contrainte qui a par exemple suscité une forte controverse autour de l'usine de traitement de Lynas en Malaisie. L'exploitation des argiles à adsorption ionique du sud de la Chine, bien que chimiquement simple (lixiviation à l'ammonium, chapitre 3), a longtemps été pratiquée de façon peu réglementée : elle décape la végétation et le sol des collines, et peut contaminer les eaux souterraines et les rivières avec les réactifs de lixiviation — un impact qui a conduit les autorités chinoises à renforcer la réglementation et à fermer de nombreuses exploitations illégales ces dernières années.</p>

    <h3>4. Recyclage et économie circulaire</h3>
    <p>Face à ces impacts et aux risques d'approvisionnement, le <strong>recyclage</strong> des terres rares contenues dans les aimants, les luminophores et les catalyseurs en fin de vie apparaît comme une piste stratégique. Il reste aujourd'hui une source très minoritaire de l'offre mondiale : les terres rares sont présentes en petites quantités, dispersées dans des produits complexes (aimants collés à l'intérieur de moteurs ou de disques durs), ce qui rend leur récupération technique et économiquement difficile. Le développement de filières de recyclage — notamment à partir des éoliennes et véhicules électriques en fin de vie — constitue un axe de recherche et d'investissement en forte croissance.</p>

    <h3>5. Diversification occidentale</h3>
    <p>Face à cette dépendance, plusieurs initiatives se sont développées : la réouverture et la modernisation de <strong>Mountain Pass</strong> aux États-Unis (seul site intégré mine-séparation notable hors d'Asie) ; le développement de <strong>Lynas</strong> (Australie), qui exploite le gisement de Mount Weld et le sépare partiellement en Malaisie, aujourd'hui le plus grand producteur significatif hors de Chine ; le <em>Critical Raw Materials Act</em> adopté par l'Union européenne, qui fixe des objectifs d'extraction, de transformation et de recyclage de matières premières critiques d'ici 2030 ; et un intérêt croissant pour des gisements en Afrique, en Inde et au Vietnam. Ces efforts, coûteux et longs à mettre en œuvre (la construction d'une chaîne de séparation complète prend typiquement plus d'une décennie), illustrent la difficulté à rattraper des décennies d'avance industrielle chinoise.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>En 2025, la Chine produit ≈ 70% des terres rares mondiales et contrôle ≈ 85-90% du raffinage et de la fabrication d'aimants</li>
        <li>La domination chinoise vient de l'investissement historique dans la séparation chimique (chapitre 4), pas d'une supériorité en réserves</li>
        <li>Les contrôles à l'export chinois (2010, puis 2025-2026) sont un outil de politique commerciale, avec des effets déjà observés sur les prix mondiaux</li>
        <li>L'extraction a un coût environnemental réel (déchets radioactifs, lixiviation des argiles) ; le recyclage reste une source d'appoint mais en croissance</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre la part de production minière (≈70%) avec la part de raffinage (≈85-90%) — c'est cette seconde donnée qui est le vrai levier stratégique chinois</li>
        <li>Croire que la Chine domine parce qu'elle détient la majorité des réserves mondiales — ce n'est pas le cas (environ un tiers)</li>
        <li>Penser que le recyclage est déjà une source majeure de terres rares aujourd'hui — il reste minoritaire, bien qu'en croissance</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — part de marché de la production mondiale</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Modifie les tonnages (par défaut, données USGS 2025) pour recalculer les parts de marché.</p>
      <div class="sim-controls">
        <label>Chine (t) : <input type="number" id="terrChine" value="270000" style="width:90px;" oninput="updateTerresMarche()"></label>
        <label>États-Unis (t) : <input type="number" id="terrUSA" value="51000" style="width:90px;" oninput="updateTerresMarche()"></label>
        <label>Australie (t) : <input type="number" id="terrAus" value="29000" style="width:90px;" oninput="updateTerresMarche()"></label>
        <label>Myanmar (t) : <input type="number" id="terrMyanmar" value="22000" style="width:90px;" oninput="updateTerresMarche()"></label>
        <div class="sim-readout" id="terrMarcheReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La domination chinoise dans l'industrie des terres rares s'explique surtout par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr8e1" value="wrong"> la détention de la quasi-totalité des réserves mondiales</label>
          <label class="option"><input type="radio" name="terr8e1" value="right"> le contrôle des capacités de raffinage et de séparation, bâties sur des décennies d'investissement</label>
          <label class="option"><input type="radio" name="terr8e1" value="wrong"> l'absence totale de terres rares ailleurs dans le monde</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr8e1','terr8fb1','Correct — la Chine ne détient qu\\'environ un tiers des réserves mondiales ; sa domination vient du contrôle du raffinage (~85-90%).','La Chine ne détient qu\\'une fraction minoritaire des réserves mondiales identifiées.')">Vérifier</button>
        <div class="feedback" id="terr8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Les contrôles chinois à l'export des terres rares de 2025-2026 sont généralement analysés par les experts comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr8e2" value="wrong"> une réponse à une pénurie géologique réelle de terres rares</label>
          <label class="option"><input type="radio" name="terr8e2" value="right"> un outil de levier géopolitique et commercial</label>
          <label class="option"><input type="radio" name="terr8e2" value="wrong"> une mesure purement environnementale sans lien commercial</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr8e2','terr8fb2','Correct — les analystes soulignent que ces restrictions sont motivées par des considérations stratégiques et commerciales, pas par une rareté géologique.','Les terres rares ne sont pas rares en abondance moyenne (chapitre 1) : la pénurie évoquée n\\'est pas géologique.')">Vérifier</button>
        <div class="feedback" id="terr8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le recyclage des terres rares en fin de vie de produit représente aujourd'hui :</p>
        <div class="options">
          <label class="option"><input type="radio" name="terr8e3" value="wrong"> la première source mondiale de terres rares</label>
          <label class="option"><input type="radio" name="terr8e3" value="right"> une source encore minoritaire, mais en croissance rapide</label>
          <label class="option"><input type="radio" name="terr8e3" value="wrong"> une pratique interdite dans la plupart des pays</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('terr8e3','terr8fb3','Correct — le recyclage reste une source d\\'appoint aujourd\\'hui, freiné par la dispersion des terres rares dans des produits complexes, mais il se développe rapidement.','La difficulté technique de récupération (petites quantités, produits complexes) limite encore fortement le recyclage.')">Vérifier</button>
        <div class="feedback" id="terr8fb3"></div>
      </div>
    </div>
  `,
  init: initTerresMarche
};

TERRES_NOVA_KB[terresKey('Enjeux géopolitiques, économiques et environnementaux')] = {
  intro: "Salut, moi c'est Nova ! On termine le cours avec la géopolitique des terres rares. Demande-moi pourquoi la Chine domine le marché, ce que sont les contrôles à l'export, ou un indice sur un exercice.",
  rules: [
    { test:/part de march[ée]|production mondiale|combien.*chine/i, replies:["En 2025, la Chine produit environ 270 000 t REO (≈69% du total mondial), loin devant les États-Unis (≈13%), l'Australie et le Myanmar."] },
    { test:/raffinage|s[ée]paration.*capacit[ée]/i, replies:["La Chine concentre environ 85-90% des capacités mondiales de raffinage et de fabrication d'aimants — c'est ce contrôle du raffinage, plus que celui du minerai, qui est son vrai levier stratégique."] },
    { test:/r[ée]serves/i, replies:["La Chine ne détient qu'environ un tiers des réserves mondiales identifiées : sa domination vient de l'investissement dans la séparation chimique, pas d'une supériorité géologique."] },
    { test:/contr[ôo]le.*export|quota|2010|2025|2026/i, replies:["La Chine a réduit ses quotas d'export en 2010 (crise des prix), puis introduit de nouveaux contrôles à licence en 2025-2026 sur plusieurs terres rares — des mesures largement analysées comme un outil de levier commercial."] },
    { test:/environnement|thorium|d[ée]chet/i, replies:["L'extraction a un coût environnemental réel : résidus radioactifs de la monazite, et pour les argiles ioniques, décapage des sols et risques de contamination des eaux par les réactifs de lixiviation."] },
    { test:/recyclage/i, replies:["Le recyclage des terres rares reste minoritaire aujourd'hui car elles sont dispersées en petites quantités dans des produits complexes (aimants collés, alliages) — mais c'est un axe de recherche en forte croissance."] },
    { test:/mountain pass|lynas|diversification/i, replies:["Mountain Pass (États-Unis) et Lynas (Australie, gisement de Mount Weld) sont les principales alternatives à la Chine, mais construire une chaîne de séparation complète prend souvent plus d'une décennie."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : la Chine détient-elle la majorité des réserves mondiales ?","Indice niveau 2 : non, seulement environ un tiers.","Indice niveau 3 : sa domination vient du contrôle du raffinage, bâti sur des décennies d'investissement."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : les terres rares sont-elles rares en abondance moyenne (chapitre 1) ?","Indice niveau 2 : non — donc la pénurie évoquée n'est pas géologique.","Indice niveau 3 : les experts y voient un outil de levier géopolitique et commercial."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : les terres rares sont-elles faciles à récupérer dans les produits en fin de vie ?","Indice niveau 2 : non, elles sont dispersées en petites quantités dans des produits complexes.","Indice niveau 3 : le recyclage reste donc minoritaire, mais en croissance rapide."] }
  ]
};

/* fusionne le module Introduction aux terres rares dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, TERRES_CHAPTERS);
Object.assign(NOVA_KB, TERRES_NOVA_KB);