/* =====================================================================
   CHUNK « optphy » — registre OPTPHY_CHAPTERS / OPTPHY_NOVA_KB
   Matière(s) : Physique|Optique physique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   OPTPHY_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */




/* ===================================================================================
   MODULE "OPTIQUE PHYSIQUE" (Optique ondulatoire) — L2 Physique
   Contenu rédigé à partir du support de cours « Optique Ondulatoire », I. Ventrillard
   & E. Bidal, IUT1 Grenoble — Université Grenoble Alpes, département Mesures
   Physiques (alternants), année 2023/2024 ; réorganisé en 4 chapitres, complété
   et enrichi. Structure identique aux autres modules : OPTPHY_CHAPTERS / OPTPHY_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
=================================================================================== */
const OPTPHY_MATIERE = 'Optique physique';
function optphyKey(chapterTitle){ return `Physique|${OPTPHY_MATIERE}|${chapterTitle}`; }
const OPTPHY_CHAPTERS = {};
const OPTPHY_NOVA_KB = {};

/* =========================== CHAPITRE 1 — Bases de l'optique ondulatoire =========================== */
OPTPHY_CHAPTERS[optphyKey('Bases de l\'optique ondulatoire : OPPM et détection de la lumière')] = {
  objectives: [
    "Écrire l'expression mathématique d'une onde plane progressive monochromatique (OPPM) et identifier le sens physique de chacun de ses paramètres (amplitude, pulsation, vecteur d'onde, phase à l'origine)",
    "Distinguer onde transverse et onde longitudinale, et décrire la structure d'une onde électromagnétique plane (couplage E/B, trièdre direct)",
    "Expliquer pourquoi un détecteur optique est un détecteur quadratique et relier l'intensité lumineuse détectée à la moyenne temporelle du champ électrique",
    "Calculer un chemin optique, une différence de marche et le déphasage associé, et énoncer le théorème de Malus sur les fronts d'onde"
  ],
  prereqs: ["Lentilles minces", "Ondes électromagnétiques planes progressives monochromatiques"],
  bodyHtml: `
    <p>L'optique ondulatoire prend le relais de l'optique géométrique là où celle-ci atteint ses limites : dès que la lumière rencontre un obstacle ou une ouverture dont la taille devient comparable à sa longueur d'onde, la propagation rectiligne des rayons ne suffit plus à décrire ce qu'on observe (interférences, diffraction). Ce premier chapitre pose le formalisme de base — comment écrire mathématiquement une onde lumineuse, et comment un détecteur la « voit » réellement.</p>

    <h3>1. Formalisme mathématique d'une onde qui se propage</h3>
    <p>Une onde qui se propage le long de l'axe $(Oz)$ vers les $z$ croissants, à la pulsation $\omega$ et au vecteur d'onde $k$, s'écrit sous la forme d'une <strong>onde plane progressive monochromatique</strong> (OPPM) :</p>
    <div class="formula-box">$$E(z,t) = E_0\,\cos(\omega t - kz + \phi_0)$$</div>
    <table class="mini-table">
      <tr><th>Symbole</th><th>Nom</th><th>Lien avec les autres grandeurs</th></tr>
      <tr><td>$E_0$</td><td>Amplitude</td><td>valeur maximale du champ</td></tr>
      <tr><td>$\omega$</td><td>Pulsation</td><td>$\omega = 2\pi f = 2\pi/T$ ($T$ : période temporelle)</td></tr>
      <tr><td>$k$</td><td>Vecteur d'onde (module)</td><td>$k = 2\pi/\lambda = \omega/v$ ($\lambda$ : longueur d'onde, $v$ : vitesse de propagation)</td></tr>
      <tr><td>$\phi_0$</td><td>Phase à l'origine</td><td>valeur de la phase en $z=0,\,t=0$</td></tr>
    </table>
    <p>Le signe « $-$ » devant $kz$ traduit une propagation vers les $z>0$ ; une onde se propageant vers les $z<0$ s'écrirait $E_0\cos(\omega t + kz + \phi_0)$. À $z$ fixé, si l'on compare deux ondes de même pulsation $E_1$ (phase $\phi_1$) et $E_2$ (phase $\phi_2$), c'est l'onde dont la phase totale $\omega t - kz + \phi_i$ est la plus grande à un instant donné qui est « en avance » sur l'autre.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 90" width="100%">
          <line x1="8" y1="45" x2="152" y2="45" stroke="#5A6472" stroke-width="1"/>
          <path d="M8,45 C18,15 28,15 38,45 C48,75 58,75 68,45 C78,15 88,15 98,45 C108,75 118,75 128,45 C138,15 148,15 152,32" stroke="#4C7CFF" stroke-width="2.2" fill="none"/>
          <line x1="8" y1="45" x2="38" y2="45" stroke="#F0B94D" stroke-width="1.6"/>
          <text x="10" y="58" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">λ</text>
          <text x="6" y="12" font-family="IBM Plex Mono" font-size="9" fill="#EAF0FB">E(z,t₀)</text>
        </svg>
        <span>OPPM figée à un instant $t_0$ : période spatiale $\lambda$</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 160 90" width="100%">
          <circle cx="80" cy="45" r="6" fill="none" stroke="#2DD4C4" stroke-width="1.4"/>
          <circle cx="80" cy="45" r="16" fill="none" stroke="#2DD4C4" stroke-width="1.2" opacity="0.8"/>
          <circle cx="80" cy="45" r="26" fill="none" stroke="#2DD4C4" stroke-width="1" opacity="0.6"/>
          <circle cx="80" cy="45" r="36" fill="none" stroke="#2DD4C4" stroke-width="0.9" opacity="0.4"/>
          <text x="55" y="12" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">onde sphérique</text>
        </svg>
        <span>Source ponctuelle : fronts d'onde sphériques</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 160 90" width="100%">
          <line x1="30" y1="8" x2="30" y2="82" stroke="#9B82FF" stroke-width="1.3"/>
          <line x1="55" y1="8" x2="55" y2="82" stroke="#9B82FF" stroke-width="1.3"/>
          <line x1="80" y1="8" x2="80" y2="82" stroke="#9B82FF" stroke-width="1.3"/>
          <line x1="105" y1="8" x2="105" y2="82" stroke="#9B82FF" stroke-width="1.3"/>
          <line x1="130" y1="8" x2="130" y2="82" stroke="#9B82FF" stroke-width="1.3"/>
          <line x1="10" y1="45" x2="150" y2="45" stroke="#FF6B6F" stroke-width="1.6" marker-end="url(#owArrow)"/>
          <defs><marker id="owArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#FF6B6F"/></marker></defs>
          <text x="5" y="12" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">onde plane</text>
        </svg>
        <span>Loin de la source (ou faisceau collimaté) : fronts d'onde plans</span>
      </div>
    </div>

    <h3>2. Onde plane progressive monochromatique : trois mots, trois hypothèses</h3>
    <p><strong>Plane</strong> : à un instant $t$ donné, l'amplitude est la même en tout point d'un plan perpendiculaire à l'axe de propagation. <strong>Progressive</strong> : le signal se propage sans se déformer. <strong>Monochromatique</strong> : le signal oscille à une fréquence unique (onde sinusoïdale pure). Le théorème de Fourier garantit que toute onde périodique, même non sinusoïdale (un signal en créneaux, par exemple), peut se décomposer en une somme de fonctions sinusoïdales : l'OPPM est donc la « brique de base » universelle de l'optique ondulatoire.</p>
    <p>En toute rigueur, aucune onde réelle n'est une OPPM parfaite : une source ponctuelle émet une onde <em>sphérique</em>, pas plane, et aucune source n'est parfaitement monochromatique ni infiniment étendue dans le temps. Un faisceau laser collimaté s'en approche beaucoup (quasi-plan, quasi-monochromatique, progressif) — c'est pourquoi l'OPPM reste le modèle de référence en optique ondulatoire.</p>

    <h3>3. Onde transverse ou longitudinale ?</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Définition</th><th>Exemple</th></tr>
      <tr><td>Onde transverse</td><td>La vibration se fait dans le plan perpendiculaire à l'axe de propagation</td><td>corde qu'on secoue verticalement ; lumière</td></tr>
      <tr><td>Onde longitudinale</td><td>La vibration se fait parallèlement à l'axe de propagation</td><td>ressort qu'on comprime/étire ; onde sonore</td></tr>
    </table>

    <h3>4. Onde électromagnétique</h3>
    <p>La lumière est une onde électromagnétique : le champ électrique $\vec{E}$ et le champ magnétique $\vec{B}$ sont couplés et oscillent perpendiculairement l'un à l'autre, tous deux perpendiculaires à la direction de propagation $\vec{k}$ — c'est donc une onde <strong>transverse</strong>. Pour une onde plane, ils forment un trièdre direct :</p>
    <div class="formula-box">$$\vec{B} = \dfrac{n}{c}\,\hat{k}\wedge\vec{E}, \qquad v = \dfrac{c}{n}$$</div>
    <p>où $\hat{k}$ est le vecteur unitaire de propagation, $c$ la vitesse de la lumière dans le vide et $n$ l'indice du milieu. Cette structure résulte directement des équations de Maxwell.</p>

    <h3>5. Comment un détecteur « voit »-il la lumière ?</h3>
    <p>Un œil (temps de réponse $\sim 1/20\,\mathrm{s}$) ou un photodétecteur (de $1\,\mu\mathrm{s}$ jusqu'à $10^{-10}\,\mathrm{s}$ pour les plus rapides) sont extrêmement lents devant la période d'oscillation d'une onde visible : pour $\lambda=600\,\mathrm{nm}$, $f = c/\lambda \approx 500\,\mathrm{THz}$, soit $T = 1/f \approx 2\times 10^{-15}\,\mathrm{s}$ ! Aucun détecteur ne peut suivre une oscillation aussi rapide. Ce que mesure réellement un détecteur, c'est donc la <strong>moyenne temporelle</strong> du flux énergétique reçu — un détecteur optique est un <strong>détecteur quadratique</strong>, sensible à $\langle E^2(M,t)\rangle$ et non à $E(M,t)$ lui-même (rappel : $\langle\cos(\omega t)\rangle = 0$ mais $\langle\cos^2(\omega t)\rangle = 1/2$).</p>
    <p>On définit l'<strong>intensité lumineuse</strong> (ou éclairement) comme la puissance reçue par unité de surface, ce qui permet de s'affranchir de la taille du détecteur. Les équations de Maxwell donnent, dans un milieu d'indice $n$ :</p>
    <div class="formula-box">$$I(M) = n\,\varepsilon_0\,c\,\big\langle E^2(M,t)\big\rangle$$</div>
    <p>Dans le vide ou l'air, pour alléger les notations, on étudiera par la suite $\langle E^2(M,t)\rangle$ lui-même, qu'on appellera abusivement « intensité » — cela ne change rien à la localisation des maxima et des minima, qui est l'information réellement utile pour analyser une figure d'interférences ou de diffraction.</p>

    <h3>6. Phase, chemin optique et différence de marche</h3>
    <p>Les détecteurs ne sont pas directement sensibles à la phase du champ électrique — pourtant, comme le montre l'expérience des fentes d'Young (chapitre suivant), la phase gouverne entièrement la figure observée sur l'écran : c'est en interférant que deux ondes de phases différentes créent des zones claires et sombres, alors qu'un détecteur ne mesure jamais qu'une intensité. Il faut donc un outil pour comparer les phases de deux ondes issues de points différents : le <strong>chemin optique</strong>.</p>
    <p>Pour un trajet rectiligne $AB$ dans un milieu homogène d'indice $n$ :</p>
    <div class="formula-box">$$(AB) = n\,AB$$</div>
    <p>Si le trajet traverse plusieurs milieux homogènes successifs (indices $n_1,n_2,n_3\dots$, sur les portions $AI, IJ, JB\dots$), le chemin optique total est la somme des chemins optiques partiels : $(AB) = n_1 AI + n_2 IJ + n_3 JB + \dots$</p>
    <p>Pour une source $S$, la <strong>différence de marche optique</strong> entre deux points $A$ et $B$ est la différence des chemins optiques $(SA)$ et $(SB)$ :</p>
    <div class="formula-box">$$\Delta_{AB} = (SB) - (SA)$$</div>
    <div class="key-point">
      <span class="eyebrow">Attention, piège classique</span>
      $\Delta_{AB} = (SB)-(SA)$ n'est <strong>pas</strong> égal à $n\,AB$ en général : cette simplification n'est valable que si $S$, $A$ et $B$ sont alignés sur un même rayon. Pour une onde sphérique, deux points $A$ et $B$ à la même distance de $S$ (sur un même front d'onde) ont $\Delta_{AB}=0$, bien que $AB\neq 0$.
    </div>
    <p>Pour une OPPM, le déphasage $\varphi$ entre deux points est directement proportionnel à leur différence de marche :</p>
    <div class="formula-box">$$\varphi = \dfrac{2\pi}{\lambda}\,\Delta$$</div>
    <p>Cette relation, extrêmement utilisée, permet de convertir un problème géométrique (calcul d'une distance ou d'un chemin optique) en un problème de phase — donc, comme on le verra au chapitre 2, en franges claires ou sombres.</p>

    <h3>7. Front d'onde et théorème de Malus</h3>
    <p>Un <strong>front d'onde</strong> est une surface sur laquelle tous les points de l'onde ont la même phase à un instant donné — pour une source ponctuelle, ce sont des sphères concentriques ; pour une onde plane (ou une source à l'infini), ce sont des plans. Par construction, pour tout point $M$ d'un même front d'onde issu de $S$, le chemin optique $(SM)$ est constant.</p>
    <div class="key-point">
      <span class="eyebrow">Théorème de Malus</span>
      Les rayons lumineux issus d'une source ponctuelle sont normaux aux fronts d'onde. Les rayons représentent la direction de propagation de l'énergie lumineuse, orientés selon le vecteur d'onde $\vec{k}$.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>OPPM : $E(z,t)=E_0\cos(\omega t - kz + \phi_0)$, avec $k=2\pi/\lambda=\omega/v$ ; plane + progressive + monochromatique sont trois hypothèses distinctes, jamais rigoureusement vérifiées pour une onde réelle</li>
        <li>La lumière est une onde électromagnétique transverse : $\vec{E}\perp\vec{B}\perp\vec{k}$, trièdre direct, $v=c/n$</li>
        <li>Un détecteur optique est quadratique : il mesure $\langle E^2(M,t)\rangle$ (moyenne temporelle), jamais $E(M,t)$ directement — la période d'oscillation ($\sim10^{-15}\,\mathrm{s}$) est bien trop courte pour tout détecteur</li>
        <li>Chemin optique $(AB)=nAB$ (milieu homogène) ; différence de marche $\Delta_{AB}=(SB)-(SA)$ ; déphasage $\varphi=2\pi\Delta/\lambda$</li>
        <li>Théorème de Malus : les rayons lumineux issus d'une source ponctuelle sont normaux aux fronts d'onde (sphères pour une source ponctuelle, plans pour une onde plane)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre le vecteur d'onde $k$ (lié à $\lambda$) et la pulsation $\omega$ (liée à $T$) : $k=\omega/v$ les relie, mais ce sont deux grandeurs distinctes</li>
        <li>Croire qu'un détecteur mesure le champ électrique $E(t)$ : il mesure sa moyenne quadratique temporelle $\langle E^2\rangle$, proportionnelle à l'intensité</li>
        <li>Appliquer $\Delta_{AB}=n\,AB$ alors que $S$, $A$, $B$ ne sont pas alignés sur le même rayon — ce raccourci n'est valable que dans ce cas particulier</li>
        <li>Oublier que le signe devant $kz$ dans l'OPPM code le sens de propagation : « $-kz$ » pour une propagation vers les $z$ croissants</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une onde s'écrit $E(z,t) = E_0\cos(\omega t + kz + \phi_0)$ (notez le signe « + » devant $kz$). Cette onde se propage :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow1e1" value="wrong"> vers les $z$ croissants</label>
          <label class="option"><input type="radio" name="ow1e1" value="right"> vers les $z$ décroissants</label>
          <label class="option"><input type="radio" name="ow1e1" value="wrong"> elle est stationnaire, ne se propage pas</label>
          <label class="option"><input type="radio" name="ow1e1" value="wrong"> le sens ne peut pas être déterminé sans connaître $\phi_0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow1e1','ow1fb1','Correct — le signe « + » devant kz correspond à une onde qui se propage vers les z décroissants (le signe « − » correspondant, lui, aux z croissants).','Reviens à la section 1 : une OPPM E₀cos(ωt−kz+φ₀) se propage vers les z croissants ; inverser le signe devant kz inverse le sens de propagation.')">Vérifier</button>
        <div class="feedback" id="ow1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour une onde visible de longueur d'onde $\lambda=600\,\mathrm{nm}$ ($f\approx500\,\mathrm{THz}$, $T\approx2\times10^{-15}\,\mathrm{s}$), un photodétecteur rapide de temps de réponse $1\,\mathrm{ns}$ ($10^{-9}\,\mathrm{s}$) :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow1e2" value="wrong"> peut suivre exactement les oscillations du champ électrique</label>
          <label class="option"><input type="radio" name="ow1e2" value="right"> ne mesure que la valeur moyenne du flux, car T est bien trop court devant son temps de réponse</label>
          <label class="option"><input type="radio" name="ow1e2" value="wrong"> ne détecte rien du tout, car il est trop lent</label>
          <label class="option"><input type="radio" name="ow1e2" value="wrong"> mesure directement E(t), pas E²(t)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow1e2','ow1fb2','Correct — 1 ns représente plus d\\'un million de périodes optiques : le détecteur ne peut restituer que la moyenne temporelle du flux, c\\'est le principe même du détecteur quadratique.','Compare T≈2×10⁻¹⁵ s à 10⁻⁹ s : le rapport dépasse le million, aucun détecteur ne peut suivre une oscillation aussi rapide — il moyenne.')">Vérifier</button>
        <div class="feedback" id="ow1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un rayon lumineux traverse une lame de verre d'indice $n=1{,}5$ et d'épaisseur $e=2\,\mu\mathrm{m}$, sous incidence normale. Le chemin optique correspondant à cette traversée vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow1e3" value="wrong"> $1{,}33\,\mu\mathrm{m}$</label>
          <label class="option"><input type="radio" name="ow1e3" value="right"> $3\,\mu\mathrm{m}$</label>
          <label class="option"><input type="radio" name="ow1e3" value="wrong"> $2\,\mu\mathrm{m}$</label>
          <label class="option"><input type="radio" name="ow1e3" value="wrong"> $0{,}5\,\mu\mathrm{m}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow1e3','ow1fb3','Correct — (AB) = n·e = 1,5 × 2 µm = 3 µm : le chemin optique est toujours supérieur au trajet géométrique dans un milieu d\\'indice n>1.','Utilise (AB) = n·AB avec AB = e = 2 µm et n = 1,5.')">Vérifier</button>
        <div class="feedback" id="ow1fb3"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4</span>
        <p class="q">D'après le théorème de Malus, les rayons lumineux issus d'une source ponctuelle sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow1e4" value="wrong"> parallèles aux fronts d'onde</label>
          <label class="option"><input type="radio" name="ow1e4" value="right"> normaux (perpendiculaires) aux fronts d'onde</label>
          <label class="option"><input type="radio" name="ow1e4" value="wrong"> tangents aux fronts d'onde</label>
          <label class="option"><input type="radio" name="ow1e4" value="wrong"> indépendants des fronts d'onde</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow1e4','ow1fb4','Correct — c\\'est l\\'énoncé même du théorème de Malus : les rayons, qui portent l\\'énergie, sont toujours perpendiculaires aux surfaces d\\'égale phase.','Relis la section 7 : le théorème de Malus relie la direction des rayons (portés par le vecteur d\\'onde) à la géométrie des fronts d\\'onde.')">Vérifier</button>
        <div class="feedback" id="ow1fb4"></div>
      </div>
    </div>
  `
};

OPTPHY_NOVA_KB[optphyKey('Bases de l\'optique ondulatoire : OPPM et détection de la lumière')] = {
  intro: "Salut, moi c'est Nova ! On démarre l'optique ondulatoire par les bases : l'écriture d'une OPPM, la structure de l'onde électromagnétique, et surtout la façon dont un détecteur \"voit\" réellement la lumière. Demande-moi ce qu'est un détecteur quadratique, comment calculer un chemin optique, ou ce que dit le théorème de Malus.",
  rules: [
    { test:/oppm|onde plane progressive monochromatique/i, replies:["Une OPPM combine trois hypothèses indépendantes : plane (même amplitude dans tout plan perpendiculaire à la propagation), progressive (elle se propage sans se déformer) et monochromatique (une seule fréquence). E(z,t)=E₀cos(ωt−kz+φ₀)."] },
    { test:/vecteur d'onde|k\s*=\s*2/i, replies:["Le vecteur d'onde k est lié à la longueur d'onde par k=2π/λ, et à la vitesse de propagation par k=ω/v. Ne le confonds pas avec la pulsation ω, liée elle à la période temporelle T."] },
    { test:/d[ée]tecteur quadratique|d[ée]tecteur.*sensible|<e|moyenne temporelle/i, replies:["Un détecteur optique est dit quadratique car il est sensible à ⟨E²(M,t)⟩ (moyenne temporelle du carré du champ), pas à E(M,t) directement : la période d'oscillation de la lumière visible (~10⁻¹⁵s) est bien trop courte pour qu'aucun détecteur puisse la suivre."] },
    { test:/intensit[ée]|[ée]clairement/i, replies:["L'intensité (éclairement) est I(M) = n·ε₀·c·⟨E²(M,t)⟩, en W/m². Dans l'air, on étudie souvent directement ⟨E²(M,t)⟩ — appelé abusivement \"intensité\" — car cela ne change pas la position des maxima et minima."] },
    { test:/chemin optique/i, replies:["Le chemin optique entre A et B dans un milieu homogène d'indice n est (AB) = n·AB. S'il y a plusieurs milieux successifs, on additionne les chemins optiques partiels : (AB) = n₁·AI + n₂·IJ + n₃·JB + ..."] },
    { test:/diff[ée]rence de marche/i, replies:["La différence de marche entre A et B, vue depuis une source S, est ΔAB = (SB) − (SA). Elle n'est égale à n·AB que si S, A et B sont alignés sur le même rayon — sinon il faut la calculer via les chemins optiques séparés."] },
    { test:/d[ée]phasage|phi\s*=\s*2/i, replies:["Le déphasage lié à une différence de marche Δ est φ = 2πΔ/λ. C'est la relation clé pour transformer un calcul géométrique en un problème de phase, essentiel pour les interférences (chapitre suivant)."] },
    { test:/malus|front d'onde/i, replies:["Un front d'onde est une surface d'égale phase (sphères pour une source ponctuelle, plans pour une onde plane). Le théorème de Malus dit que les rayons lumineux, issus d'une source ponctuelle, sont toujours normaux aux fronts d'onde."] },
    { test:/transverse|longitudinale/i, replies:["Une onde transverse vibre perpendiculairement à sa direction de propagation (c'est le cas de la lumière : E et B sont perpendiculaires à k). Une onde longitudinale vibre parallèlement à sa direction de propagation (le son, par exemple)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare l'écriture donnée à la forme standard E₀cos(ωt−kz+φ₀).","Indice niveau 2 : le signe devant kz code le sens de propagation ; ici il est inversé par rapport à la forme standard.","Indice niveau 3 : l'onde se propage vers les z décroissants."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare la période optique T à 10⁻⁹s.","Indice niveau 2 : le rapport dépasse le million.","Indice niveau 3 : le détecteur ne peut mesurer que la valeur moyenne du flux."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : utilise (AB) = n·AB avec AB = e.","Indice niveau 2 : (AB) = 1,5 × 2 µm.","Indice niveau 3 : le résultat est 3 µm."] },
    { test:/exercice\s*4/i, hint:true, replies:["Pour l'exercice 4 : relis l'énoncé exact du théorème de Malus.","Indice niveau 2 : il relie la direction des rayons à la géométrie des fronts d'onde.","Indice niveau 3 : les rayons sont normaux (perpendiculaires) aux fronts d'onde."] }
  ]
};


/* =========================== CHAPITRE 2 — Interférences à deux ondes =========================== */
OPTPHY_CHAPTERS[optphyKey('Interférences à deux ondes : cohérence et interféromètre de Michelson')] = {
  objectives: [
    "Calculer l'intensité résultant de la superposition de deux ondes cohérentes de même intensité et en déduire les positions des franges brillantes et sombres",
    "Définir l'interfrange et le contraste d'une figure d'interférences, et les relier à la géométrie du dispositif",
    "Énoncer les critères de cohérence spatiale et temporelle (train d'onde, longueur de cohérence) et justifier pourquoi deux sources indépendantes n'interfèrent jamais",
    "Décrire le dispositif des trous d'Young et l'interféromètre de Michelson (lame d'air, coin d'air), et calculer la différence de marche dans chaque configuration"
  ],
  prereqs: ["Bases de l\'optique ondulatoire : OPPM et détection de la lumière"],
  bodyHtml: `
    <p>Deux ondes lumineuses issues de deux sources différentes se superposent-elles simplement en additionnant leurs intensités ? La réponse, contre-intuitive, est non : selon leur déphasage, deux ondes peuvent s'additionner (« lumière + lumière = plus de lumière ») mais aussi s'annuler (« lumière + lumière = obscurité ! »). C'est le phénomène d'<strong>interférences</strong>, qui est au cœur de ce chapitre.</p>

    <h3>1. Définition et théorème de superposition</h3>
    <p>Deux sources <strong>interfèrent</strong> si l'intensité résultant de leur superposition diffère de la somme des intensités individuelles. Ce phénomène transversal en physique se rencontre en optique, en acoustique (casque anti-bruit) ou pour les ondes mécaniques. Le calcul repose sur le <strong>théorème de superposition des champs</strong> : les champs s'additionnent (pas les intensités), et l'intensité se calcule <em>après coup</em>, à partir du champ total :</p>
    <div class="formula-box">$$E(M,t) = \sum_{i=1}^{N} E_i(M,t), \qquad I(M) = \big\langle E^2(M,t)\big\rangle$$</div>
    <div class="key-point">
      <span class="eyebrow">Point de méthode</span>
      Ne jamais calculer $I_1+I_2$ directement pour deux ondes cohérentes : il faut d'abord sommer les <strong>champs</strong> (qui portent l'information de phase), puis élever au carré et moyenner. C'est cet ordre des opérations qui produit le terme d'interférence.
    </div>

    <h3>2. Intensité de deux ondes cohérentes de même intensité</h3>
    <p>Pour deux sources $S_1$ et $S_2$ ponctuelles, monochromatiques, de même longueur d'onde et de même intensité $I_0$, éclairant un point $M$, le calcul du champ total puis de l'intensité (moyenne temporelle du carré) conduit à :</p>
    <div class="formula-box">$$I(M) = 2I_0\left[1+\cos\!\left(\dfrac{2\pi\Delta_M}{\lambda}+\phi_{S_1S_2}\right)\right] = 4I_0\cos^2\!\left(\dfrac{1}{2}\!\left(\dfrac{2\pi\Delta_M}{\lambda}+\phi_{S_1S_2}\right)\right)$$</div>
    <p>où $\Delta_M = (S_2M)-(S_1M)$ est la différence de marche au point $M$, et $\phi_{S_1S_2}$ un éventuel déphasage entre les deux sources elles-mêmes (s'il y en a un). Le déphasage total combine les deux contributions — il faut toujours vérifier si elles s'ajoutent ou se retranchent selon la géométrie du problème.</p>

    <h3>3. Analyse de la figure d'interférences</h3>
    <table class="mini-table">
      <tr><th>Situation</th><th>Condition</th><th>Intensité</th></tr>
      <tr><td>Frange sombre (interférence destructive)</td><td>$2\pi\Delta_M/\lambda+\phi_{S_1S_2}=(2k{+}1)\pi$</td><td>$I(M)=0$</td></tr>
      <tr><td>Frange brillante (interférence constructive)</td><td>$2\pi\Delta_M/\lambda+\phi_{S_1S_2}=2k\pi$</td><td>$I(M)=4I_0$</td></tr>
      <tr><td>Intensité moyenne sur l'écran</td><td>—</td><td>$\langle I(M)\rangle_{\text{écran}} = 2I_0$</td></tr>
    </table>
    <p>Dans les franges sombres, « lumière + lumière = obscurité » : les deux ondes interfèrent <strong>destructivement</strong>. Dans les franges claires, on a une zone de « surintensité » : les deux ondes interfèrent <strong>constructivement</strong>. L'<strong>interfrange</strong> $i$ est la distance entre deux minima (ou deux maxima) consécutifs de la figure.</p>

    <h3>4. Contraste</h3>
    <div class="formula-box">$$C = \dfrac{I_{max}-I_{min}}{I_{max}+I_{min}}$$</div>
    <p>Le contraste maximal $C_{MAX}=1$ (100 %) est obtenu si $I_{min}=0$, ce qui n'arrive, en pratique, que pour deux ondes de même intensité et parfaitement cohérentes. Dès que les deux ondes ont des intensités différentes, ou une cohérence imparfaite, le contraste chute — c'est un bon indicateur expérimental de la qualité de la cohérence des sources.</p>

    <h3>5. Cohérence : pourquoi deux lampes de poche n'interfèrent jamais</h3>
    <p>Une onde réelle n'est jamais une OPPM infinie : l'émission de lumière résulte de la désexcitation d'atomes individuels, qui produisent des <strong>trains d'onde</strong> — des bouffées d'onde sinusoïdale de durée finie $\tau_c$ (temps de cohérence), occupant dans l'espace une longueur $L_c=c\,\tau_c$ (longueur de cohérence). Entre deux trains d'onde successifs, la phase subit un saut aléatoire, imprévisible.</p>
    <table class="mini-table">
      <tr><th>Source</th><th>Longueur de cohérence $L_c$</th><th>Temps de cohérence $\tau_c$</th></tr>
      <tr><td>Lampe à vapeur de mercure</td><td>$\sim 1\,\mathrm{cm}$</td><td>$\sim 30\,\mathrm{ps}$</td></tr>
      <tr><td>Laser He-Ne</td><td>$\sim 1\,\mathrm{m}$</td><td>$\sim 3\,\mathrm{ns}$</td></tr>
      <tr><td>Diode laser à semi-conducteur</td><td>$\sim 100\,\mathrm{m}$</td><td>$\sim 300\,\mathrm{ns}$</td></tr>
    </table>
    <p>Le temps de réponse d'un détecteur ($\theta$) est toujours très grand devant $\tau_c$ (typiquement $10^{-9}$ à $10^{-11}\,\mathrm{s}$) : l'intensité mesurée est donc une moyenne sur un très grand nombre de trains d'onde. Deux cas se présentent :</p>
    <ul>
      <li><strong>Sources cohérentes</strong> : le déphasage $\phi_{S_1S_2}$ entre les deux sources reste constant dans le temps (même s'il varie d'un train d'onde à l'autre, il varie <em>de la même façon</em> pour les deux ondes). Le terme d'interférence $\cos(\dots)$ survit à la moyenne : <strong>on observe des interférences</strong>.</li>
      <li><strong>Sources incohérentes</strong> : le déphasage varie aléatoirement, indépendamment, d'un train d'onde à l'autre entre les deux sources. La moyenne du cosinus sur un déphasage aléatoire uniforme sur $[0,2\pi]$ est nulle : le terme d'interférence disparaît, <strong>on n'observe pas d'interférences</strong> — l'intensité totale est simplement $I_1+I_2$.</li>
    </ul>
    <div class="key-point">
      <span class="eyebrow">Critère pratique de cohérence</span>
      En pratique, deux sources sont cohérentes (donc peuvent interférer) <strong>si et seulement si elles sont issues d'une même source ponctuelle monochromatique</strong>. C'est pourquoi on ne peut jamais observer d'interférences entre deux lasers indépendants, ni entre deux lampes de poche — même de même longueur d'onde — mais on peut en observer en divisant la lumière issue d'une unique source.
    </div>

    <h3>6. Deux familles de dispositifs</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Principe</th><th>Exemple</th></tr>
      <tr><td>Division du front d'onde</td><td>On prélève deux portions différentes du même front d'onde (division spatiale)</td><td>Trous (ou fentes) d'Young</td></tr>
      <tr><td>Division d'amplitude</td><td>Une lame séparatrice divise l'amplitude du faisceau en deux faisceaux qui parcourent des chemins différents</td><td>Interféromètre de Michelson</td></tr>
    </table>

    <h3>7. Les trous d'Young en détail</h3>
    <p>Une source $S$ de très petite dimension éclaire un écran percé de deux petits trous $S_1$ et $S_2$, séparés d'une distance $a$. D'après l'optique géométrique, on devrait observer deux taches, dans les directions $(SS_1)$ et $(SS_2)$ ; en réalité, la diffraction (chapitre 4) élargit chaque faisceau, et les deux faisceaux se recouvrent dans une zone appelée <strong>champ d'interférences</strong>, où $S_1$ et $S_2$ — cohérentes car issues de la même source $S$ — interfèrent.</p>
    <p>Dans un plan d'observation $(P)$ parallèle à $(S_1S_2)$, à une distance $D$ des trous, avec $D\gg a$ et $D\gg x$ (x étant la position sur l'écran), la différence de marche au point $M(x)$ vaut :</p>
    <div class="formula-box">$$\Delta_M = \dfrac{a\,x}{D}, \qquad I(x) = 2I_0\left[1+\cos\!\left(\dfrac{2\pi a x}{\lambda D}\right)\right]$$</div>
    <p>($S_1$ et $S_2$ étant symétriques par rapport à l'axe, elles sont en phase : $\phi_{S_1S_2}=0$.) L'intensité ne dépend que de $x$ : la figure d'interférences est constituée de <strong>franges rectilignes, parallèles aux fentes</strong>. On en déduit :</p>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Expression</th></tr>
      <tr><td>Position des franges brillantes</td><td>$x_m = m\,\dfrac{\lambda D}{a}, \; m\in\mathbb{Z}$</td></tr>
      <tr><td>Position des franges sombres</td><td>$x_j = \left(j+\dfrac12\right)\dfrac{\lambda D}{a}, \; j\in\mathbb{Z}$</td></tr>
      <tr><td>Interfrange</td><td>$i = \dfrac{\lambda D}{a}$</td></tr>
    </table>
    <p>On définit l'<strong>ordre d'interférence</strong> $p=\Delta/\lambda$ (pas nécessairement entier) ; la <strong>frange centrale</strong>, où $\Delta=0$ donc $p=0$, est toujours brillante et se situe en $x=0$ pour les trous d'Young. Application numérique historique : $D=2\,\mathrm{m}$, $a=1\,\mathrm{mm}$, $\lambda=633\,\mathrm{nm} \Rightarrow i=1{,}27\,\mathrm{mm}$ — une mesure facilement accessible, qui permit à Thomas Young (1773–1829) de mesurer pour la première fois la longueur d'onde de la lumière visible. Les trous d'Young permettent aussi de mesurer un indice ou une épaisseur de lame, et le même principe, à très grande échelle, sous-tend l'<strong>interférométrie stellaire</strong> (ex. : le VLTI, quatre télescopes de 8,2 m combinés, résolution angulaire de l'ordre de la milliseconde d'arc).</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 100" width="100%">
          <circle cx="15" cy="50" r="3" fill="#EAF0FB"/>
          <text x="4" y="42" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">S</text>
          <line x1="15" y1="50" x2="55" y2="35" stroke="#4C7CFF" stroke-width="1.3"/>
          <line x1="15" y1="50" x2="55" y2="65" stroke="#4C7CFF" stroke-width="1.3"/>
          <circle cx="55" cy="35" r="2" fill="#2DD4C4"/>
          <circle cx="55" cy="65" r="2" fill="#2DD4C4"/>
          <text x="58" y="33" font-family="IBM Plex Mono" font-size="7" fill="#2DD4C4">S₁</text>
          <text x="58" y="72" font-family="IBM Plex Mono" font-size="7" fill="#2DD4C4">S₂</text>
          <line x1="55" y1="35" x2="140" y2="20" stroke="#F0B94D" stroke-width="1" opacity="0.8"/>
          <line x1="55" y1="65" x2="140" y2="20" stroke="#F0B94D" stroke-width="1" opacity="0.8"/>
          <line x1="140" y1="8" x2="140" y2="92" stroke="#5A6472" stroke-width="1.4"/>
          <text x="118" y="15" font-family="IBM Plex Mono" font-size="7" fill="#F0B94D">M(x)</text>
        </svg>
        <span>Géométrie des trous d'Young : $a=S_1S_2$, distance $D$, position $x$</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 160 100" width="100%">
          <line x1="8" y1="85" x2="152" y2="85" stroke="#5A6472" stroke-width="1"/>
          <path d="M8,85 C15,20 25,20 32,85 C39,20 49,20 56,85 C63,20 73,20 80,85 C87,20 97,20 104,85 C111,20 121,20 128,85 C135,20 145,20 152,85" stroke="#FF6B6F" stroke-width="1.8" fill="none"/>
          <text x="4" y="12" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">I(x)</text>
          <text x="140" y="96" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">x</text>
        </svg>
        <span>Franges d'intensité $I(x)=2I_0[1+\cos(2\pi ax/\lambda D)]$</span>
      </div>
    </div>

    <h3>8. Interféromètre de Michelson</h3>
    <p>Système à <strong>division d'amplitude</strong> : une lame semi-réfléchissante ($S_p$) sépare le faisceau incident en deux, qui se réfléchissent respectivement sur les miroirs $M_1$ et $M_2$ avant de se recombiner. On montre qu'un tel système est optiquement équivalent à un dispositif à deux sources $S'$ (image de $S$) éclairant deux miroirs virtuels $M'_1$ et $M'_2$ (image de $M_2$ à travers la séparatrice) — ce qui ramène le problème à un calcul d'interférences à deux ondes classique.</p>
    <table class="mini-table">
      <tr><th>Configuration</th><th>Géométrie</th><th>Différence de marche</th><th>Figure observée</th></tr>
      <tr><td>Lame d'air à faces parallèles</td><td>$M_1\perp M_2$ (donc $M_1\parallel M'_2$), séparés d'une épaisseur d'air équivalente $e$</td><td>$\Delta = 2e\cos\theta$</td><td>Anneaux concentriques, localisés à l'infini</td></tr>
      <tr><td>Coin d'air</td><td>$M_1$ et $M'_2$ forment un petit angle $\alpha$</td><td>$\Delta(x) = 2\alpha x$</td><td>Franges rectilignes, localisées sur les miroirs</td></tr>
    </table>
    <p>Le <strong>contact optique</strong> est la zone où l'image virtuelle d'un miroir se superpose exactement à l'autre miroir ($e=0$, donc $\Delta=0$ en tout point). En lumière blanche, l'interfrange dépend de $\lambda$ ($i\propto\lambda$) : chaque longueur d'onde produit sa propre figure de franges, légèrement décalée des autres — sauf exactement au contact optique où $\Delta=0$ pour <em>toutes</em> les longueurs d'onde simultanément. La frange centrale y est donc <strong>blanche</strong> (superposition de toutes les couleurs), ce qui permet de repérer expérimentalement le contact optique, même si les interférences colorées adjacentes se brouillent rapidement (car chaque couleur a un interfrange légèrement différent).</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Le Michelson en lame d'air donne des <strong>anneaux</strong> (franges d'égale inclinaison $\theta$) ; le Michelson en coin d'air donne des <strong>franges rectilignes</strong> (franges d'égale épaisseur $e(x)$). Dans les deux cas, on retrouve le même type de résultat que pour les trous d'Young : une intensité en $\cos^2$ dont l'argument dépend de la géométrie exacte du montage.
    </div>

    <h3>9. Applications</h3>
    <p>Les <strong>lames d'égale épaisseur</strong> naturelles (film de savon, aile de papillon) produisent des couleurs par interférences, exactement comme la configuration « lame d'air à faces parallèles » du Michelson. L'interféromètre de Michelson est aussi le cœur de la <strong>spectroscopie à transformée de Fourier</strong> (FT-IR) : on enregistre un interférogramme en déplaçant un miroir, puis une transformée de Fourier restitue le spectre de la source.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Superposition : on additionne les <strong>champs</strong>, jamais directement les intensités — c'est l'ordre des opérations qui produit le terme d'interférence</li>
        <li>Deux ondes cohérentes, même $I_0$ : $I(M)=2I_0[1+\cos(2\pi\Delta_M/\lambda+\phi_{S_1S_2})]=4I_0\cos^2(\dots/2)$ ; $I=0$ (destructif) ou $I=4I_0$ (constructif)</li>
        <li>Deux sources sont cohérentes si et seulement si elles sont issues d'une même source ponctuelle monochromatique — sinon, la moyenne sur les trains d'onde annule le terme d'interférence</li>
        <li>Trous d'Young : $\Delta_M=ax/D$, interfrange $i=\lambda D/a$, franges rectilignes parallèles aux fentes, frange centrale brillante en $x=0$</li>
        <li>Michelson : lame d'air (miroirs $\perp$) $\to$ anneaux, $\Delta=2e\cos\theta$ ; coin d'air (miroirs inclinés de $\alpha$) $\to$ franges rectilignes, $\Delta(x)=2\alpha x$ ; contact optique $=$ zone où $\Delta=0$</li>
        <li>Contraste $C=(I_{max}-I_{min})/(I_{max}+I_{min})$, maximal ($C=1$) seulement si $I_{min}=0$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Additionner directement $I_1$ et $I_2$ pour des sources cohérentes : on obtient alors une intensité constante, en contradiction avec la figure de franges observée</li>
        <li>Croire que deux lasers indépendants, même de même longueur d'onde, peuvent interférer : sans relation de phase fixe entre eux, la moyenne temporelle annule tout terme d'interférence</li>
        <li>Oublier le facteur $D\gg a$ (approximation nécessaire pour obtenir $\Delta_M=ax/D$ dans les trous d'Young)</li>
        <li>Confondre la configuration « lame d'air » (anneaux, franges d'égale inclinaison) et « coin d'air » (franges rectilignes, franges d'égale épaisseur) du Michelson</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans un dispositif de trous d'Young, $a=1\,\mathrm{mm}$, $D=2\,\mathrm{m}$, $\lambda=633\,\mathrm{nm}$ (laser He-Ne). L'interfrange vaut approximativement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow2e1" value="wrong"> $0{,}63\,\mathrm{mm}$</label>
          <label class="option"><input type="radio" name="ow2e1" value="right"> $1{,}27\,\mathrm{mm}$</label>
          <label class="option"><input type="radio" name="ow2e1" value="wrong"> $12{,}7\,\mathrm{mm}$</label>
          <label class="option"><input type="radio" name="ow2e1" value="wrong"> $0{,}127\,\mathrm{mm}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow2e1','ow2fb1','Correct — i = λD/a = 633×10⁻⁹ × 2 / 10⁻³ ≈ 1,27 mm, c\\'est la valeur historiquement mesurée par Young.','Utilise i = λD/a avec λ=633 nm, D=2 m, a=1 mm — attention aux unités (converis tout en mètres).')">Vérifier</button>
        <div class="feedback" id="ow2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Deux ondes cohérentes de même intensité $I_0$ arrivent en un point M avec un déphasage total $\varphi=\pi$ (rad). L'intensité en M vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow2e2" value="wrong"> $4I_0$</label>
          <label class="option"><input type="radio" name="ow2e2" value="wrong"> $2I_0$</label>
          <label class="option"><input type="radio" name="ow2e2" value="right"> $0$</label>
          <label class="option"><input type="radio" name="ow2e2" value="wrong"> $I_0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow2e2','ow2fb2','Correct — I(M)=2I₀[1+cos(π)]=2I₀[1-1]=0 : c\\'est une interférence parfaitement destructive, une frange sombre.','Remplace φ=π dans I=2I₀[1+cos(φ)] : cos(π)=-1, donc le terme entre crochets s\\'annule.')">Vérifier</button>
        <div class="feedback" id="ow2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un Michelson est réglé en lame d'air d'épaisseur $e=1\,\mu\mathrm{m}$, éclairé sous incidence normale ($\theta=0$) par $\lambda=500\,\mathrm{nm}$. L'ordre d'interférence au centre vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow2e3" value="wrong"> $1$</label>
          <label class="option"><input type="radio" name="ow2e3" value="right"> $4$</label>
          <label class="option"><input type="radio" name="ow2e3" value="wrong"> $0{,}5$</label>
          <label class="option"><input type="radio" name="ow2e3" value="wrong"> $2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow2e3','ow2fb3','Correct — Δ=2e·cos(0)=2×1 µm=2 µm, et l\\'ordre p=Δ/λ=2×10⁻⁶/500×10⁻⁹=4.','Calcule d\\'abord Δ=2e·cosθ avec θ=0, puis p=Δ/λ.')">Vérifier</button>
        <div class="feedback" id="ow2fb3"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4</span>
        <p class="q">Deux sources sont dites cohérentes si :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow2e4" value="wrong"> elles ont exactement la même longueur d'onde, quelle que soit leur origine</label>
          <label class="option"><input type="radio" name="ow2e4" value="wrong"> elles émettent avec la même intensité</label>
          <label class="option"><input type="radio" name="ow2e4" value="right"> elles sont issues d'une même source ponctuelle monochromatique</label>
          <label class="option"><input type="radio" name="ow2e4" value="wrong"> elles sont toutes deux des lasers</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow2e4','ow2fb4','Correct — même deux lasers indépendants de même longueur d\\'onde n\\'ont pas de relation de phase fixe : seule une division (front d\\'onde ou amplitude) d\\'une source unique garantit la cohérence.','Relis la section 5 : la même longueur d\\'onde ne suffit pas ; il faut une relation de phase fixe entre les deux sources, garantie seulement si elles proviennent de la division d\\'une source unique.')">Vérifier</button>
        <div class="feedback" id="ow2fb4"></div>
      </div>
    </div>
  `
};

OPTPHY_NOVA_KB[optphyKey('Interférences à deux ondes : cohérence et interféromètre de Michelson')] = {
  intro: "Salut, c'est encore moi ! On attaque les interférences à deux ondes : calcul de l'intensité, interfrange, contraste, cohérence, trous d'Young et interféromètre de Michelson. Demande-moi la formule de l'interfrange, la différence entre lame d'air et coin d'air, ou pourquoi deux lampes de poche n'interfèrent jamais.",
  rules: [
    { test:/superposition|addition.*champ/i, replies:["Le théorème de superposition dit qu'on additionne les champs E(M,t)=ΣEᵢ(M,t), puis qu'on calcule l'intensité I(M)=⟨E²(M,t)⟩ à partir du champ total — jamais en additionnant directement les intensités individuelles."] },
    { test:/interfrange/i, replies:["L'interfrange i est la distance entre deux franges brillantes (ou deux franges sombres) consécutives. Pour les trous d'Young, i=λD/a."] },
    { test:/contraste/i, replies:["Le contraste C=(Imax-Imin)/(Imax+Imin) vaut au maximum 1 (100%) si Imin=0, ce qui suppose deux ondes de même intensité et parfaitement cohérentes."] },
    { test:/coh[ée]rence|train d'onde|longueur de coh[ée]rence/i, replies:["Une onde réelle est émise sous forme de trains d'onde de durée finie τc (longueur de cohérence Lc=c·τc). Deux sources sont cohérentes seulement si elles sont issues de la division d'une même source ponctuelle monochromatique : sinon, le déphasage varie aléatoirement d'un train d'onde à l'autre et les interférences se brouillent."] },
    { test:/pourquoi.*(lampe|laser).*pas.*interf[eè]|deux sources ind[ée]pendantes/i, replies:["Deux sources indépendantes, même de même longueur d'onde, n'ont pas de relation de phase fixe entre elles : leur déphasage varie de façon aléatoire et indépendante d'un train d'onde à l'autre, ce qui annule le terme d'interférence en moyenne."] },
    { test:/trous d'young|fentes d'young/i, replies:["Les trous d'Young sont un dispositif à division du front d'onde : Δ(x)=ax/D, I(x)=2I₀[1+cos(2πax/λD)], interfrange i=λD/a. Les franges sont rectilignes, parallèles aux fentes."] },
    { test:/michelson/i, replies:["Le Michelson est un dispositif à division d'amplitude. En lame d'air (miroirs perpendiculaires), on observe des anneaux (Δ=2e·cosθ). En coin d'air (miroirs inclinés d'un angle α), on observe des franges rectilignes localisées sur les miroirs (Δ(x)=2αx)."] },
    { test:/contact optique/i, replies:["Le contact optique est la configuration où e=0 : les deux miroirs virtuels du Michelson se superposent exactement, donc Δ=0 partout, quelle que soit la longueur d'onde. C'est pour cela que la frange centrale y est blanche en lumière blanche."] },
    { test:/lumi[eè]re blanche/i, replies:["En lumière blanche, l'interfrange dépend de λ (i=λD/a pour Young, par exemple), donc chaque couleur produit ses propres franges légèrement décalées. Seule la frange d'ordre zéro (Δ=0) est commune à toutes les longueurs d'onde : elle apparaît blanche."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise i=λD/a.","Indice niveau 2 : convertis toutes les unités en mètres avant de calculer.","Indice niveau 3 : le résultat est proche de 1,27 mm."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : remplace φ=π dans I=2I₀[1+cos(φ)].","Indice niveau 2 : cos(π)=-1.","Indice niveau 3 : l'intensité est nulle, c'est une frange sombre."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : calcule d'abord Δ=2e·cosθ avec θ=0.","Indice niveau 2 : Δ=2 µm.","Indice niveau 3 : p=Δ/λ=4."] },
    { test:/exercice\s*4/i, hint:true, replies:["Pour l'exercice 4 : la même longueur d'onde ne suffit pas à garantir la cohérence.","Indice niveau 2 : il faut une relation de phase fixe entre les deux sources.","Indice niveau 3 : elles doivent être issues d'une même source ponctuelle monochromatique."] }
  ]
};


/* =========================== CHAPITRE 3 — Interférences à ondes multiples (réseaux) =========================== */
OPTPHY_CHAPTERS[optphyKey('Interférences à ondes multiples : réseaux et spectroscopie')] = {
  objectives: [
    "Décrire un réseau de diffraction (en transmission ou en réflexion) à partir de son pas a et de son nombre de traits par mm",
    "Expliquer qualitativement pourquoi la figure d'interférences de N ondes devient une série de pics fins et intenses lorsque N est très grand",
    "Établir et utiliser la loi fondamentale des réseaux pour calculer la direction des maxima d'intensité et l'ordre de diffraction associé",
    "Décrire le principe d'un spectromètre à réseau et interpréter un spectre observé en lumière blanche"
  ],
  prereqs: ["Interférences à deux ondes : cohérence et interféromètre de Michelson"],
  bodyHtml: `
    <p>Après les interférences à deux ondes, on généralise à un très grand nombre d'ondes cohérentes : c'est le principe du <strong>réseau de diffraction</strong>, l'un des composants les plus utilisés en spectroscopie, capable de séparer très finement les longueurs d'onde d'une lumière (arc-en-ciel d'un CD, spectre d'une lampe à vapeur...).</p>

    <h3>1. Qu'est-ce qu'un réseau ?</h3>
    <p>Un réseau est une structure périodique de motifs identiques, régulièrement espacés d'un <strong>pas</strong> $a$ (en mm). On le caractérise aussi par son <strong>nombre de traits par mm</strong>, $n$, relié au pas par :</p>
    <div class="formula-box">$$n = \dfrac{1}{a}$$</div>
    <table class="mini-table">
      <tr><th>Type</th><th>Principe</th><th>Exemple</th></tr>
      <tr><td>Réseau en transmission</td><td>Fentes identiques, régulièrement espacées, gravées sur un support transparent</td><td>Réseaux de laboratoire (300 à 1200 traits/mm)</td></tr>
      <tr><td>Réseau en réflexion</td><td>Motifs réfléchissants régulièrement espacés (souvent un « réseau de Blaze », à profil en dents de scie, pour optimiser un ordre donné)</td><td>Un DVD, dont le pas $a\approx0{,}74\,\mu\mathrm{m}$ correspond à $n\approx1350$ traits/mm — c'est pour cela qu'un DVD irisé sous la lumière !</td></tr>
    </table>
    <p>La suite de ce chapitre étudie les réseaux en transmission ; les résultats sont très proches pour les réseaux en réflexion.</p>

    <h3>2. Interférences à N ondes : de N=2 à N très grand</h3>
    <p>Chaque fente du réseau se comporte comme une source secondaire cohérente (elles sont toutes issues de la même onde incidente). Lorsqu'on fait interférer $N$ ondes de même amplitude et régulièrement déphasées, la figure d'intensité change radicalement d'allure avec $N$ :</p>
    <ul>
      <li>Pour $N=2$ (les trous d'Young du chapitre précédent), on retrouve la figure sinusoïdale classique en $\cos^2$.</li>
      <li>Pour $N$ croissant, des <strong>maxima secondaires</strong> apparaissent entre les maxima principaux, mais leur hauteur reste très faible devant celle des maxima principaux.</li>
      <li>Pour $N\gg1$ (des centaines à des milliers de traits, typique d'un réseau réel), on n'observe plus, en pratique, que des <strong>maxima principaux extrêmement fins et intenses</strong> (des « raies »), séparés par des zones quasiment sombres : c'est exactement l'allure des raies spectrales observées derrière un réseau.</li>
    </ul>
    <p>Cette approximation (négliger les maxima secondaires, invisibles pour $N\gg1$) permet de se concentrer sur la seule propriété vraiment exploitée en pratique : <strong>la position angulaire des maxima principaux</strong> — pour laquelle il est d'ailleurs inutile de tenir compte de la diffraction propre à chaque fente.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <line x1="6" y1="78" x2="134" y2="78" stroke="#5A6472" stroke-width="1"/>
          <path d="M6,78 Q30,55 40,20 Q50,55 70,78 Q90,55 100,20 Q110,55 134,78" stroke="#4C7CFF" stroke-width="1.8" fill="none"/>
          <text x="4" y="14" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">N=2</text>
        </svg>
        <span>Deux ondes : franges larges, contraste sinusoïdal</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <line x1="6" y1="78" x2="134" y2="78" stroke="#5A6472" stroke-width="1"/>
          <path d="M6,78 L38,78 L40,15 L42,78 L96,78 L98,15 L100,78 L134,78" stroke="#2DD4C4" stroke-width="1.8" fill="none"/>
          <path d="M20,78 L22,72 L24,78 M60,78 L62,70 L64,78 M78,78 L80,70 L82,78 M115,78 L117,72 L119,78" stroke="#2DD4C4" stroke-width="0.8" fill="none" opacity="0.6"/>
          <text x="4" y="14" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">N≫1</text>
        </svg>
        <span>N très grand : pics fins et intenses, maxima secondaires négligeables</span>
      </div>
    </div>

    <h3>3. Loi fondamentale des réseaux</h3>
    <p>Considérons un réseau de pas $a$, éclairé sous une incidence $\theta_i$, et observé dans la direction $\theta$. Le déphasage entre deux fentes successives dû à la différence de marche géométrique vaut :</p>
    <div class="formula-box">$$\varphi = \dfrac{2\pi a}{\lambda}\left(\sin\theta-\sin\theta_i\right)$$</div>
    <p>Un maximum d'intensité (interférence constructive entre <em>toutes</em> les fentes) exige que ce déphasage soit un multiple entier de $2\pi$ : $\varphi=2m\pi$, avec $m\in\mathbb{Z}$. On en déduit la <strong>loi fondamentale des réseaux</strong>, qui donne la direction $\theta_m$ du $m$-ième maximum :</p>
    <div class="formula-box">$$\sin\theta_m - \sin\theta_i = m\,\dfrac{\lambda}{a}, \qquad m\in\mathbb{Z}$$</div>
    <p>L'entier $m$ est appelé <strong>ordre de diffraction</strong>. L'ordre $m=0$ correspond toujours à $\theta_0=\theta_i$ : c'est la direction de propagation « directe », non déviée, et non dispersée (indépendante de $\lambda$) — en lumière blanche, l'ordre 0 apparaît donc blanc. Les ordres $m=\pm1,\pm2,\dots$ dévient d'autant plus que $\lambda/a$ est grand : à ordre fixé, le rouge (grand $\lambda$) est plus dévié que le bleu.</p>

    <h3>4. Observation en lumière blanche</h3>
    <p>Sous éclairage en lumière blanche, on observe de part et d'autre de l'ordre zéro (blanc, non dispersé) plusieurs <strong>spectres colorés</strong>, un par ordre non nul, chacun s'étalant du violet (dévié le moins) au rouge (dévié le plus). Plus l'ordre $|m|$ est élevé, plus la dispersion — et donc l'étalement du spectre — est grande, mais plus l'intensité disponible dans cet ordre est généralement faible.</p>

    <h3>5. Application : les spectromètres à réseau</h3>
    <p>Un spectromètre à réseau associe une fente d'entrée (pour définir une source quasi ponctuelle), un système collimateur, un réseau (souvent monté sur une platine tournante pour balayer les longueurs d'onde), et un détecteur (barrette CCD, photomultiplicateur...). C'est le composant central de très nombreux instruments d'analyse : petits spectromètres USB fibrés pour la surveillance de la qualité de l'air ou de l'environnement, spectromètres de laboratoire haute résolution, instruments embarqués en astrophysique.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Réseau : structure périodique de pas $a$, caractérisée aussi par $n=1/a$ traits/mm — en transmission (fentes) ou en réflexion (motifs, ex. : DVD)</li>
        <li>Pour $N\gg1$ fentes cohérentes, la figure d'interférences se réduit à des maxima principaux très fins et intenses ; les maxima secondaires sont négligeables</li>
        <li>Loi fondamentale des réseaux : $\sin\theta_m-\sin\theta_i=m\lambda/a$, avec $m$ l'ordre de diffraction ($m\in\mathbb{Z}$)</li>
        <li>L'ordre $m=0$ n'est jamais dispersé (indépendant de $\lambda$) : il reste blanc en lumière blanche ; les ordres $|m|\geqslant1$ produisent des spectres colorés, le rouge étant toujours plus dévié que le bleu à ordre fixé</li>
        <li>Application majeure : les spectromètres à réseau, utilisés pour analyser la composition spectrale d'une source lumineuse</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre le pas $a$ (une longueur, en mm ou µm) et le nombre de traits par mm $n=1/a$ (l'inverse d'une longueur)</li>
        <li>Oublier que l'ordre 0 n'est jamais dispersé : c'est la seule direction commune à toutes les longueurs d'onde en lumière blanche</li>
        <li>Croire qu'à ordre fixé, c'est le bleu qui est le plus dévié : c'est l'inverse, le rouge (plus grande $\lambda$) est toujours plus dévié pour un même ordre $m\neq0$</li>
        <li>Négliger l'angle d'incidence $\theta_i$ dans la loi des réseaux lorsque l'éclairage n'est pas normal au réseau</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un réseau comporte 600 traits/mm. Son pas $a$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow3e1" value="wrong"> $600\,\mathrm{nm}$</label>
          <label class="option"><input type="radio" name="ow3e1" value="right"> $1{,}67\,\mu\mathrm{m}$</label>
          <label class="option"><input type="radio" name="ow3e1" value="wrong"> $16{,}7\,\mu\mathrm{m}$</label>
          <label class="option"><input type="radio" name="ow3e1" value="wrong"> $600\,\mu\mathrm{m}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow3e1','ow3fb1','Correct — a=1/n=1/600 mm = 1,67 µm : c\\'est l\\'ordre de grandeur typique d\\'un réseau de spectroscopie visible.','Utilise n=1/a, donc a=1/n=1/600 mm, à convertir en µm.')">Vérifier</button>
        <div class="feedback" id="ow3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un réseau de pas $a=2\,\mu\mathrm{m}$ est éclairé sous incidence normale ($\theta_i=0$) par une lumière de $\lambda=600\,\mathrm{nm}$. L'angle de diffraction $\theta_1$ de l'ordre $m=1$ vérifie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow3e2" value="wrong"> $\sin\theta_1 = 2$</label>
          <label class="option"><input type="radio" name="ow3e2" value="right"> $\sin\theta_1 = 0{,}3$</label>
          <label class="option"><input type="radio" name="ow3e2" value="wrong"> $\sin\theta_1 = 3{,}3$</label>
          <label class="option"><input type="radio" name="ow3e2" value="wrong"> $\theta_1 = 0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow3e2','ow3fb2','Correct — sinθ₁ - sin(0) = 1×λ/a = 600×10⁻⁹/2×10⁻⁶ = 0,3, soit θ₁≈17,5°.','Applique sinθm - sinθi = mλ/a avec θi=0 et m=1.')">Vérifier</button>
        <div class="feedback" id="ow3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un DVD, utilisé comme réseau en réflexion, présente un pas $a\approx0{,}74\,\mu\mathrm{m}$. Son nombre de traits par mm est approximativement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow3e3" value="wrong"> $74$</label>
          <label class="option"><input type="radio" name="ow3e3" value="wrong"> $740$</label>
          <label class="option"><input type="radio" name="ow3e3" value="right"> $1350$</label>
          <label class="option"><input type="radio" name="ow3e3" value="wrong"> $13\,500$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow3e3','ow3fb3','Correct — n=1/a=1/0,74 µm ≈ 1350 traits/mm, ce qui explique l\\'irisation caractéristique d\\'un DVD sous la lumière.','Utilise n=1/a avec a=0,74 µm=0,74×10⁻³ mm.')">Vérifier</button>
        <div class="feedback" id="ow3fb3"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4</span>
        <p class="q">En lumière blanche, l'ordre $m=0$ d'un réseau apparaît :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow3e4" value="wrong"> comme un spectre continu, du rouge au violet</label>
          <label class="option"><input type="radio" name="ow3e4" value="right"> blanc, non dispersé</label>
          <label class="option"><input type="radio" name="ow3e4" value="wrong"> uniquement rouge</label>
          <label class="option"><input type="radio" name="ow3e4" value="wrong"> uniquement bleu</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow3e4','ow3fb4','Correct — pour m=0, sinθ₀=sinθᵢ quelle que soit λ : toutes les longueurs d\\'onde se superposent dans la même direction, donnant du blanc.','Relis la loi des réseaux : pour m=0, la relation sinθ-sinθᵢ=mλ/a ne dépend plus de λ.')">Vérifier</button>
        <div class="feedback" id="ow3fb4"></div>
      </div>
    </div>
  `
};

OPTPHY_NOVA_KB[optphyKey('Interférences à ondes multiples : réseaux et spectroscopie')] = {
  intro: "Salut ! On passe aux réseaux : interférences à N ondes, loi fondamentale des réseaux, et leur usage en spectroscopie. Demande-moi comment calculer un angle de diffraction, ce qu'est l'ordre 0, ou pourquoi les pics deviennent si fins quand N est grand.",
  rules: [
    { test:/pas.*r[ée]seau|n\s*=\s*1\/a/i, replies:["Le pas a d'un réseau (en mm ou µm) et son nombre de traits par mm n sont reliés par n=1/a. Par exemple, un réseau de 600 traits/mm a un pas a=1/600 mm≈1,67 µm."] },
    { test:/loi.*r[ée]seau|sin.*theta.*m|ordre de diffraction/i, replies:["La loi fondamentale des réseaux est sinθm - sinθi = mλ/a, où m est l'ordre de diffraction (un entier relatif). Elle donne la direction des maxima d'intensité."] },
    { test:/ordre\s*0|m\s*=\s*0/i, replies:["L'ordre m=0 correspond à sinθ₀=sinθᵢ, indépendamment de λ : c'est la direction non déviée, non dispersée. En lumière blanche, toutes les couleurs s'y superposent, donnant du blanc."] },
    { test:/dispersion|rouge.*bleu|bleu.*rouge/i, replies:["À ordre m fixé, plus λ est grand, plus la déviation est importante : le rouge est toujours plus dévié que le bleu, pour un même ordre non nul."] },
    { test:/n.*grand|maxima secondaires|pics fins/i, replies:["Quand le nombre de fentes N devient très grand (des centaines à des milliers), les maxima principaux deviennent extrêmement fins et intenses, et les maxima secondaires deviennent négligeables : on observe des raies bien définies, exactement ce qu'on utilise en spectroscopie."] },
    { test:/dvd/i, replies:["Un DVD se comporte comme un réseau en réflexion, avec un pas a≈0,74 µm, soit environ 1350 traits/mm — c'est ce qui produit son irisation caractéristique sous la lumière."] },
    { test:/spectrom[eè]tre/i, replies:["Un spectromètre à réseau associe une fente d'entrée, un collimateur, un réseau (souvent tournant) et un détecteur. Il exploite la dispersion du réseau pour séparer spatialement les différentes longueurs d'onde d'une source."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise n=1/a.","Indice niveau 2 : a=1/600 mm.","Indice niveau 3 : le résultat est 1,67 µm."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : applique sinθm-sinθi=mλ/a avec θi=0.","Indice niveau 2 : sinθ₁=λ/a=600nm/2µm.","Indice niveau 3 : sinθ₁=0,3."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : utilise n=1/a avec a en mm.","Indice niveau 2 : a=0,74×10⁻³ mm.","Indice niveau 3 : n≈1350 traits/mm."] },
    { test:/exercice\s*4/i, hint:true, replies:["Pour l'exercice 4 : pense à ce que devient la loi des réseaux quand m=0.","Indice niveau 2 : elle ne dépend plus de λ.","Indice niveau 3 : l'ordre 0 est blanc, non dispersé."] }
  ]
};


/* =========================== CHAPITRE 4 — Diffraction =========================== */
OPTPHY_CHAPTERS[optphyKey('Diffraction : fente, ouverture circulaire et limite de résolution')] = {
  objectives: [
    "Situer le cadre des conditions de Fraunhofer et expliquer pourquoi la diffraction résulte de l'interférence d'une infinité de sources secondaires",
    "Calculer l'intensité diffractée par une fente et la largeur de sa tache centrale, et énoncer le principe de Babinet",
    "Décrire la figure de diffraction par une ouverture circulaire (tache d'Airy) et calculer son rayon angulaire",
    "Appliquer le critère de Rayleigh pour déterminer la limite de résolution d'un instrument optique"
  ],
  prereqs: ["Interférences à ondes multiples : réseaux et spectroscopie"],
  bodyHtml: `
    <p>Chaque fois qu'un faisceau lumineux rencontre un obstacle ou une ouverture de dimension comparable à sa longueur d'onde, la propagation rectiligne prédite par l'optique géométrique cesse d'être valable : la lumière « contourne » légèrement l'obstacle, un phénomène appelé <strong>diffraction</strong>. C'est elle qui limite, en dernier ressort, le pouvoir de résolution de tout instrument d'optique — télescope, microscope ou simplement l'œil.</p>

    <h3>1. Cadre de l'étude : les conditions de Fraunhofer</h3>
    <p>La propagation rectiligne de l'optique géométrique n'est plus vérifiée lorsque la taille caractéristique de l'ouverture devient comparable à $\lambda$. On se place ici dans les <strong>conditions de Fraunhofer</strong> : onde incidente plane, et observation de la figure de diffraction à l'infini (ou, en pratique, dans le plan focal image d'une lentille convergente placée après l'ouverture).</p>
    <p>La méthode de calcul repose sur le principe de Huygens-Fresnel : la diffraction résulte de l'<strong>interférence entre une infinité de sources secondaires infinitésimales</strong>, réparties continûment dans l'ouverture, chacune réémettant une onde sphérique cohérente avec les autres. Le calcul consiste donc à sommer (intégrer) le champ de toutes ces sources élémentaires, puis, comme toujours, à en déduire l'intensité $I=\langle E^2\rangle$.</p>

    <h3>2. Diffraction par une fente</h3>
    <p>Pour une fente de largeur $a$, éclairée normalement par une onde plane, l'intensité diffractée dans la direction $\theta$ vaut :</p>
    <div class="formula-box">$$I(\theta) = I_0\left[\dfrac{\sin\!\left(\dfrac{\pi a \sin\theta}{\lambda}\right)}{\dfrac{\pi a \sin\theta}{\lambda}}\right]^2$$</div>
    <p>Cette fonction, de la forme $\big[\sin(u)/u\big]^2$ (avec $u=\pi a\sin\theta/\lambda$), présente un <strong>maximum central</strong> très intense en $\theta=0$, encadré de maxima secondaires beaucoup plus faibles.</p>
    <table class="mini-table">
      <tr><th>Propriété</th><th>Valeur</th></tr>
      <tr><td>Hauteur du premier maximum secondaire</td><td>$\approx 0{,}045\times I_0$ (moins de 5 % du maximum central)</td></tr>
      <tr><td>Puissance contenue dans le lobe central</td><td>$\approx 84\,\%$ de la puissance totale diffractée</td></tr>
      <tr><td>Largeur du lobe central</td><td>deux fois plus large que chacun des lobes secondaires</td></tr>
    </table>
    <p>Si l'observation se fait à une distance $D\gg a,\lambda$ dans le plan focal d'une lentille (ou à grande distance directement), alors $\sin\theta\approx X/D$, et la largeur totale de la tache centrale sur l'écran vaut :</p>
    <div class="formula-box">$$\ell_{\text{centrale}} = \dfrac{2\lambda D}{a}$$</div>
    <p>Cette relation, inversement proportionnelle à $a$, traduit un résultat général de la diffraction : <strong>plus l'ouverture est petite, plus la figure de diffraction est étalée</strong>. Elle permet en particulier de mesurer expérimentalement la largeur d'une fente inconnue, en mesurant la largeur de la tache centrale observée à distance connue.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 90" width="100%">
          <line x1="6" y1="80" x2="154" y2="80" stroke="#5A6472" stroke-width="1"/>
          <path d="M6,80 Q20,76 26,72 Q34,66 40,50 Q48,26 80,20 Q112,26 120,50 Q126,66 134,72 Q140,76 154,80" stroke="#4C7CFF" stroke-width="2" fill="none"/>
          <text x="4" y="14" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">I(θ)</text>
          <text x="72" y="90" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">θ</text>
        </svg>
        <span>Diffraction par une fente : lobe central large, lobes secondaires faibles</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 160 90" width="100%">
          <circle cx="80" cy="45" r="34" fill="none" stroke="#5A6472" stroke-width="0.7" opacity="0.6"/>
          <circle cx="80" cy="45" r="24" fill="none" stroke="#5A6472" stroke-width="0.9" opacity="0.7"/>
          <circle cx="80" cy="45" r="14" fill="none" stroke="#5A6472" stroke-width="1.1" opacity="0.85"/>
          <circle cx="80" cy="45" r="6" fill="#F0B94D"/>
          <text x="55" y="12" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">tache d'Airy</text>
        </svg>
        <span>Diffraction par une ouverture circulaire : anneaux concentriques</span>
      </div>
    </div>

    <h3>3. Principe de Babinet</h3>
    <div class="key-point">
      <span class="eyebrow">Principe de Babinet</span>
      La forme d'une figure de diffraction est la même, qu'elle soit obtenue à partir d'un corps opaque ou de son « conjugué », c'est-à-dire une ouverture percée dans une plaque exactement aux emplacements où se situe ce corps (en dehors de l'image géométrique directe).
    </div>
    <p>Conséquence pratique et parfois surprenante : la figure de diffraction créée par un objet fin et opaque, comme un cheveu, est <strong>identique</strong> à celle d'une fente de même largeur — un moyen simple et élégant de mesurer, par exemple, le diamètre d'un cheveu par diffraction laser.</p>

    <h3>4. Diffraction par une ouverture circulaire : la tache d'Airy</h3>
    <p>Pour une ouverture circulaire de diamètre $d$, la figure de diffraction n'a plus de forme analytique aussi simple que pour une fente : elle consiste en une tache centrale brillante entourée d'<strong>anneaux concentriques</strong> alternativement sombres et clairs, appelée <strong>tache d'Airy</strong>. Son rayon angulaire (demi-angle au sommet du cône de la tache centrale) vaut :</p>
    <div class="formula-box">$$\theta_D = \dfrac{1{,}22\,\lambda}{d}$$</div>
    <p>Le facteur $1{,}22$ (au lieu de $1$ pour une fente) vient de la géométrie circulaire de l'ouverture. Exemple : pour $\lambda=500\,\mathrm{nm}$ et $d=1\,\mu\mathrm{m}$, observée à $D=10\,\mathrm{cm}$, la tache centrale a un diamètre d'environ $14\,\mathrm{cm}$ — un étalement considérable pour une ouverture aussi minuscule !</p>

    <h3>5. Limite de résolution et critère de Rayleigh</h3>
    <p>La <strong>limite de résolution</strong> d'un instrument est la plus petite distance (ou le plus petit écart angulaire) séparant deux points objets que l'instrument peut encore distinguer comme deux points distincts. Pour l'œil nu, dans le visible, elle vaut environ $0{,}1\,\mathrm{mm}$ à la distance minimale de vision distincte ($25\,\mathrm{cm}$).</p>
    <div class="key-point">
      <span class="eyebrow">Critère de Rayleigh</span>
      Deux points objets sont considérés comme distinguables si le centre de leurs images (deux taches d'Airy) est séparé d'un écart angulaire $\alpha$ au moins égal au rayon angulaire de la tache de diffraction : $$\alpha \geqslant \theta_D = \dfrac{1{,}22\,\lambda}{d}$$ Lorsque $\alpha=\theta_D$ exactement, le maximum de l'une des taches coïncide avec le premier minimum de l'autre : les deux images sont tout juste séparables.
    </div>
    <p>Ce critère explique pourquoi la limite de résolution d'un instrument est fondamentalement fixée par le <strong>diamètre de son ouverture</strong> (l'objectif, le miroir primaire...) et non par la qualité de sa fabrication : même un instrument parfaitement poli reste limité par la diffraction due à sa pupille d'entrée.</p>

    <h3>6. Application à l'imagerie : tache d'Airy sur un capteur</h3>
    <p>Pour un objet ponctuel très éloigné (une étoile, par exemple), observé à travers une lentille (ou un miroir) de focale $f'$ et de diamètre $d$, l'image n'est jamais un point parfait : sa dimension minimale est fixée par la diffraction sur l'ouverture de l'instrument. Le rayon de la tache d'Airy sur l'écran (plan focal) vaut :</p>
    <div class="formula-box">$$\rho = 1{,}22\,\dfrac{\lambda f'}{d}$$</div>
    <p>Conséquence directe : pour distinguer des <strong>étoiles doubles</strong>, il faut un instrument à grande ouverture $d$. Exemple : un télescope amateur de $d=20\,\mathrm{cm}$, $f'=1\,\mathrm{m}$, à $\lambda=600\,\mathrm{nm}$, donne $\theta_D\approx4\times10^{-6}\,\mathrm{rad}$ — bien meilleur que la résolution de l'œil nu ($\sim4\times10^{-4}\,\mathrm{rad}$), d'où la nécessité d'un fort grossissement d'oculaire pour exploiter pleinement cette résolution. À l'échelle professionnelle, le télescope Keck ($d=10\,\mathrm{m}$, Hawaii) atteint une résolution angulaire de l'ordre de $10^{-8}\,\mathrm{rad}$, suffisante pour distinguer des détails de quelques dizaines de mètres à la distance de la Lune.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Conditions de Fraunhofer : onde incidente plane, observation à l'infini ; la diffraction résulte de l'interférence d'une infinité de sources secondaires réparties dans l'ouverture</li>
        <li>Fente de largeur $a$ : $I(\theta)=I_0[\sin(u)/u]^2$ avec $u=\pi a\sin\theta/\lambda$ ; largeur de la tache centrale $=2\lambda D/a$ ; 84 % de l'énergie dans le lobe central</li>
        <li>Principe de Babinet : un obstacle opaque et l'ouverture complémentaire de même forme donnent la même figure de diffraction</li>
        <li>Ouverture circulaire de diamètre $d$ : tache d'Airy, rayon angulaire $\theta_D=1{,}22\lambda/d$</li>
        <li>Critère de Rayleigh : deux points sont résolus si leur écart angulaire $\alpha\geqslant\theta_D$ — la résolution d'un instrument est fixée par le diamètre de son ouverture, pas par sa qualité de fabrication</li>
        <li>Image d'une source ponctuelle à travers une lentille de focale $f'$, diamètre $d$ : rayon de la tache d'Airy $\rho=1{,}22\lambda f'/d$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le facteur $1{,}22$ propre à la géométrie circulaire (il n'apparaît pas pour une fente rectangulaire, où le facteur est $1$)</li>
        <li>Croire qu'une plus grande ouverture dégrade la résolution : c'est l'inverse, $\theta_D=1{,}22\lambda/d$ diminue quand $d$ augmente — une grande ouverture améliore la résolution</li>
        <li>Confondre le rayon et le diamètre de la tache centrale (de diffraction par une fente ou par une ouverture circulaire) dans les calculs numériques</li>
        <li>Penser que la limite de résolution ne dépend que de la qualité optique de l'instrument : elle est en réalité fondamentalement bornée par la diffraction due au diamètre de l'ouverture</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une fente de largeur $a=0{,}1\,\mathrm{mm}$ est éclairée par un laser $\lambda=633\,\mathrm{nm}$ ; on observe la figure de diffraction sur un écran à $D=2\,\mathrm{m}$. La largeur de la tache centrale vaut approximativement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow4e1" value="wrong"> $1{,}27\,\mathrm{mm}$</label>
          <label class="option"><input type="radio" name="ow4e1" value="right"> $25{,}3\,\mathrm{mm}$</label>
          <label class="option"><input type="radio" name="ow4e1" value="wrong"> $6{,}3\,\mathrm{mm}$</label>
          <label class="option"><input type="radio" name="ow4e1" value="wrong"> $12{,}7\,\mathrm{cm}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow4e1','ow4fb1','Correct — largeur = 2λD/a = 2×633×10⁻⁹×2 / 10⁻⁴ ≈ 25,3 mm.','Utilise largeur = 2λD/a, avec toutes les longueurs en mètres.')">Vérifier</button>
        <div class="feedback" id="ow4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">D'après le principe de Babinet, la figure de diffraction produite par un cheveu fin et opaque est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow4e2" value="wrong"> impossible à observer, car le cheveu bloque toute la lumière</label>
          <label class="option"><input type="radio" name="ow4e2" value="right"> identique à celle d'une fente de même largeur</label>
          <label class="option"><input type="radio" name="ow4e2" value="wrong"> une tache d'Airy, comme pour une ouverture circulaire</label>
          <label class="option"><input type="radio" name="ow4e2" value="wrong"> uniquement visible en lumière blanche</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow4e2','ow4fb2','Correct — le cheveu et une fente de même largeur sont des figures \\'conjuguées\\' au sens de Babinet : elles produisent la même figure de diffraction en dehors de l\\'image géométrique.','Relis la section 3 : le principe de Babinet relie un obstacle opaque à son ouverture complémentaire de même forme.')">Vérifier</button>
        <div class="feedback" id="ow4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un instrument d'optique voit sa résolution angulaire s'améliorer (donc $\theta_D$ diminue) lorsque :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow4e3" value="wrong"> on augmente la longueur d'onde $\lambda$</label>
          <label class="option"><input type="radio" name="ow4e3" value="right"> on augmente le diamètre $d$ de l'ouverture</label>
          <label class="option"><input type="radio" name="ow4e3" value="wrong"> on diminue le diamètre $d$ de l'ouverture</label>
          <label class="option"><input type="radio" name="ow4e3" value="wrong"> on éloigne l'écran d'observation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow4e3','ow4fb3','Correct — θD=1,22λ/d diminue quand d augmente : c\\'est pourquoi les grands télescopes offrent une bien meilleure résolution angulaire.','Étudie comment θD=1,22λ/d varie avec d : c\\'est une fonction décroissante de d.')">Vérifier</button>
        <div class="feedback" id="ow4fb3"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 4</span>
        <p class="q">D'après le critère de Rayleigh, deux points sont tout juste résolus lorsque :</p>
        <div class="options">
          <label class="option"><input type="radio" name="ow4e4" value="wrong"> leurs taches d'Airy sont parfaitement superposées</label>
          <label class="option"><input type="radio" name="ow4e4" value="right"> le maximum de l'une coïncide avec le premier minimum de l'autre</label>
          <label class="option"><input type="radio" name="ow4e4" value="wrong"> leurs taches d'Airy ne se recouvrent absolument pas</label>
          <label class="option"><input type="radio" name="ow4e4" value="wrong"> l'écart angulaire est nul</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('ow4e4','ow4fb4','Correct — c\\'est exactement la définition du critère de Rayleigh : à la limite de résolution, α=θD, et les deux maxima sont séparés par exactement le rayon d\\'une tache d\\'Airy.','Relis la section 5 : le critère de Rayleigh définit la limite exacte de résolution comme la coïncidence entre un maximum et le premier minimum voisin.')">Vérifier</button>
        <div class="feedback" id="ow4fb4"></div>
      </div>
    </div>
  `
};

OPTPHY_NOVA_KB[optphyKey('Diffraction : fente, ouverture circulaire et limite de résolution')] = {
  intro: "Salut, dernier chapitre du module ! On étudie la diffraction : fente, ouverture circulaire (tache d'Airy) et limite de résolution des instruments d'optique. Demande-moi la formule de la largeur de la tache centrale, le principe de Babinet, ou le critère de Rayleigh.",
  rules: [
    { test:/fraunhofer/i, replies:["Les conditions de Fraunhofer supposent une onde incidente plane et une observation à l'infini (ou dans le plan focal d'une lentille) — c'est le cadre standard pour calculer une figure de diffraction simplement."] },
    { test:/tache centrale|largeur.*fente|2.*lambda.*d\/a/i, replies:["Pour une fente de largeur a, observée à distance D, la largeur de la tache centrale de diffraction vaut 2λD/a. Elle contient environ 84% de l'énergie totale diffractée."] },
    { test:/babinet/i, replies:["Le principe de Babinet dit qu'un obstacle opaque et son ouverture complémentaire (même forme, en négatif) produisent la même figure de diffraction. C'est pour ça qu'un cheveu diffracte comme une fente de même largeur."] },
    { test:/airy|tache d'airy|ouverture circulaire/i, replies:["La diffraction par une ouverture circulaire de diamètre d produit la tache d'Airy : une tache centrale entourée d'anneaux concentriques, de rayon angulaire θD=1,22λ/d."] },
    { test:/rayleigh|crit[eè]re.*r[ée]solution|limite de r[ée]solution/i, replies:["Le critère de Rayleigh dit que deux points sont tout juste résolus quand leur écart angulaire α est égal au rayon angulaire de la tache de diffraction θD=1,22λ/d — le maximum de l'un coïncide alors avec le premier minimum de l'autre."] },
    { test:/t[ée]lescope|[ée]toile double/i, replies:["Pour distinguer deux étoiles proches (étoile double), il faut un instrument de grand diamètre d : plus d est grand, plus θD=1,22λ/d est petit, donc meilleure est la résolution angulaire — c'est pourquoi les grands télescopes ont de grands miroirs."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise largeur=2λD/a.","Indice niveau 2 : convertis toutes les longueurs en mètres avant de calculer.","Indice niveau 3 : le résultat est proche de 25,3 mm."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense au principe de Babinet.","Indice niveau 2 : un obstacle opaque et son ouverture complémentaire de même forme donnent la même figure.","Indice niveau 3 : identique à celle d'une fente de même largeur."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : étudie comment θD=1,22λ/d varie avec d.","Indice niveau 2 : c'est une fonction décroissante de d.","Indice niveau 3 : augmenter d améliore (diminue) θD."] },
    { test:/exercice\s*4/i, hint:true, replies:["Pour l'exercice 4 : relis la définition exacte du critère de Rayleigh.","Indice niveau 2 : il s'agit d'une coïncidence particulière entre les deux taches.","Indice niveau 3 : le maximum de l'une coïncide avec le premier minimum de l'autre."] }
  ]
};

/* fusionne le module Optique physique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, OPTPHY_CHAPTERS);
Object.assign(NOVA_KB, OPTPHY_NOVA_KB);