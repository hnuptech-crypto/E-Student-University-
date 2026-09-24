/* ===================================================================
   COMPTE & ABONNEMENT — démonstration fonctionnelle via window.storage
   ⚠ Persistance réelle d'une visite à l'autre, MAIS mot de passe stocké
   en clair et sans serveur : usage démo uniquement, pas prêt pour la
   production (voir le message de fin de réponse pour le vrai plan).
=================================================================== */

/* ⚙️ CONFIGURATION SUPABASE — à remplir avant mise en ligne.
   Trouve ces deux valeurs dans ton projet Supabase : Project Settings → API.
   La clé "anon public" est faite pour être visible côté navigateur, ce n'est pas un secret. */
const SUPABASE_URL = 'https://xefhkspbkeasosnfcicy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_cZw9I9aanDJXjxJ7HaCdtQ_w6rvSGpF';

let supabaseClient = null;
let supabaseInitError = null;
try{
  if(SUPABASE_URL.includes('TON-PROJET')){
    supabaseInitError = 'Supabase non configuré (URL/clé encore par défaut).';
  } else if(typeof window.supabase === 'undefined'){
    supabaseInitError = "La librairie Supabase ne s'est pas chargée (vérifie ta connexion internet ou recharge la page).";
  } else {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
}catch(e){
  supabaseInitError = 'Erreur de connexion à Supabase : ' + e.message;
}
if(supabaseInitError){ console.error('[E-Student]', supabaseInitError); }

let currentUser = null;   // { id, name, email, premium, level }
let authMode = 'login';   // 'login' | 'signup'

function hasFullAccess(user){
  if(!user || !user.premium) return false;
  if(!user.premiumUntil) return true; /* compte premium sans date (ex: admin manuel) — accès conservé */
  return new Date(user.premiumUntil) > new Date();
}

/* ---- statut d'abonnement en direct, avec décompte journalier ---- */
let subCountdownTimer = null;

function renderPaywallStatus(){
  clearInterval(subCountdownTimer);
  const active = hasFullAccess(currentUser);
  document.getElementById('paywallActive').style.display = active ? 'block' : 'none';
  document.getElementById('paywallPricing').style.display = active ? 'none' : 'block';
  if(!active) return;

  const since = currentUser.premiumSince ? new Date(currentUser.premiumSince) : null;
  const until = new Date(currentUser.premiumUntil);
  document.getElementById('subStartDate').textContent = since ? since.toLocaleDateString('fr-FR') : '—';
  document.getElementById('subEndDate').textContent = until.toLocaleString('fr-FR', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });

  const totalMs = since ? (until - since) : (30 * 24 * 60 * 60 * 1000);

  function tick(){
    const now = new Date();
    const remainingMs = until - now;
    if(remainingMs <= 0){
      document.getElementById('subCountdown').textContent = 'Abonnement expiré';
      document.getElementById('subProgressBar').style.width = '0%';
      clearInterval(subCountdownTimer);
      return;
    }
    const days = Math.floor(remainingMs / 86400000);
    const hours = Math.floor((remainingMs % 86400000) / 3600000);
    const minutes = Math.floor((remainingMs % 3600000) / 60000);
    document.getElementById('subCountdown').textContent =
      `${days} jour${days > 1 ? 's' : ''}, ${hours} h ${minutes} min restants`;
    const pct = Math.max(0, Math.min(100, (remainingMs / totalMs) * 100));
    document.getElementById('subProgressBar').style.width = pct + '%';
  }
  tick();
  subCountdownTimer = setInterval(tick, 60000);
}

/* ===================================================================
   Suivi RÉEL d'activité (temps d'étude + exercices) — stocké localement,
   par appareil. Complète les données déjà réelles de Supabase (chapitres
   terminés, série de jours). Aucune valeur inventée : si rien n'a encore
   été fait, le tableau de bord affiche "—" plutôt qu'un chiffre fantaisiste.
=================================================================== */
function todayKey(){ return new Date().toISOString().slice(0, 10); }
function loadActivityLog(){
  try{ return JSON.parse(localStorage.getItem('esu_activity_log') || '{}'); }catch(e){ return {}; }
}
function saveActivityLog(log){ try{ localStorage.setItem('esu_activity_log', JSON.stringify(log)); }catch(e){} }
function addStudyMinutes(mins){
  const log = loadActivityLog();
  log[todayKey()] = (log[todayKey()] || 0) + mins;
  saveActivityLog(log);
}
/* pulsation minute : ajoute du temps réel seulement si l'onglet est actif et l'étudiant connecté */
let studyHeartbeat = null;
function startStudyHeartbeat(){
  if(studyHeartbeat) return;
  studyHeartbeat = setInterval(() => {
    if(document.visibilityState === 'visible' && currentUser) addStudyMinutes(1);
  }, 60000);
}
startStudyHeartbeat();

/* ---- série de jours d'activité, basée sur de vraies visites ---- */
async function touchActivity(){
  if(!currentUser || !supabaseClient) return;
  const today = new Date().toISOString().slice(0, 10);
  if(currentUser.lastActiveDate === today) { renderStreak(); return; } /* déjà compté aujourd'hui */

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const newStreak = (currentUser.lastActiveDate === yesterday) ? (currentUser.streakCount || 0) + 1 : 1;

  currentUser.streakCount = newStreak;
  currentUser.lastActiveDate = today;
  renderStreak();

  try{
    await supabaseClient.from('profiles').update({ streak_count: newStreak, last_active_date: today }).eq('id', currentUser.id);
  }catch(e){ console.error('[streak]', e); }
}

function renderStreak(){
  const el = document.querySelector('.streak');
  if(el) el.textContent = `● ${currentUser.streakCount || 0} jour${(currentUser.streakCount || 0) > 1 ? 's' : ''} de suite`;
  const stat = document.getElementById('statStreak');
  if(stat) stat.textContent = currentUser.streakCount || 0;
}

/* ---- progression réelle par domaine, basée sur les chapitres effectivement complétés ----
   Table réelle `progress` : id, user_id, domain, matiere, chapter, completed,
   exercises_correct, exercises_total, completed_at, created_at. */
async function markChapterComplete(domain, matiere, chapter, exercisesCorrect, exercisesTotal){
  if(!currentUser || !supabaseClient) return;
  try{
    const payload = {
      user_id: currentUser.id, domain, matiere, chapter,
      completed: true, completed_at: new Date().toISOString()
    };
    if(typeof exercisesCorrect === 'number') payload.exercises_correct = exercisesCorrect;
    if(typeof exercisesTotal === 'number') payload.exercises_total = exercisesTotal;
    const { error } = await supabaseClient
      .from('progress')
      .upsert(payload, { onConflict: 'user_id,domain,matiere,chapter' });
    if(error){ console.error('[progress upsert]', error); return; }
    const key = `${domain}|${matiere}|${chapter}`;
    if(!chapterProgressCache.includes(key)) chapterProgressCache.push(key);
  }catch(e){ console.error('[progress upsert]', e); }
}

/* trouve, pour chaque domaine, les matières réellement suivies : seule la première
   matière compte si l'étudiant n'a pas d'accès complet — exactement la même règle
   d'accès que dans openMatiereDetail (i === 0 || hasFullAccess), non modifiée ici. */
function getTrackedMatieres(domainKey, premium){
  const matieres = getMatieres(selectedLevel, domainKey);
  return premium ? matieres : matieres.slice(0, matieres.length ? 1 : 0);
}

function renderWeekBars(){
  const container = document.getElementById('bars');
  if(!container) return;
  const log = loadActivityLog();
  const dayLabels = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const days = [];
  let weekTotal = 0;
  for(let i = 6; i >= 0; i--){
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    const mins = log[key] || 0;
    weekTotal += mins;
    days.push({ label: dayLabels[d.getDay()], mins });
  }
  const maxMin = Math.max(1, ...days.map(d => d.mins));
  container.innerHTML = days.map(d => `
    <div class="bar-col">
      <div class="bar" style="height:${d.mins > 0 ? Math.max(6, Math.round((d.mins / maxMin) * 90)) : 0}px;" title="${d.mins} min"></div>
      <span>${d.label}</span>
    </div>`).join('');
  const h = Math.floor(weekTotal / 60), m = weekTotal % 60;
  const statTime = document.getElementById('statTime');
  if(statTime) statTime.textContent = weekTotal === 0 ? '0min' : (h > 0 ? `${h}h${m > 0 ? String(m).padStart(2, '0') : ''}` : `${m}min`);
}

async function loadRealProgress(){
  if(!currentUser || !supabaseClient) return;
  try{
    const { data, error } = await supabaseClient
      .from('progress')
      .select('domain, matiere, chapter, completed, exercises_correct, exercises_total')
      .eq('user_id', currentUser.id);
    if(error){ console.error('[progress load]', error); return; }
    const rows = data || [];
    const doneKeys = rows.filter(r => r.completed).map(r => `${r.domain}|${r.matiere}|${r.chapter}`);
    chapterProgressCache = doneKeys;
    document.getElementById('statChapters').textContent = doneKeys.length;

    /* taux de réussite réel aux exercices : somme des vraies réponses correctes / total,
       telles qu'enregistrées dans Supabase à chaque chapitre — "—" tant qu'aucun exercice fait */
    let sumCorrect = 0, sumTotal = 0;
    rows.forEach(r => { sumCorrect += (r.exercises_correct || 0); sumTotal += (r.exercises_total || 0); });
    const statSuccess = document.getElementById('statSuccess');
    if(statSuccess) statSuccess.textContent = sumTotal > 0 ? Math.round((sumCorrect / sumTotal) * 100) + '%' : '—';

    /* premium au sens strict de hasFullAccess() — même fonction que le mur de paiement,
       lue ici mais jamais modifiée : la logique d'abonnement reste celle définie ailleurs. */
    const premium = hasFullAccess(currentUser);
    let overallDone = 0, overallTotal = 0;
    let firstUnfinished = null; /* {domain, matiereName, chapterIndex, chapterName} */
    const domainStats = {};

    DOMAINS.forEach(d => {
      const tracked = getTrackedMatieres(d.key, premium);
      let total = 0, done = 0;
      tracked.forEach(m => {
        const chapters = chaptersFor(m.name);
        chapters.forEach((ch, i) => {
          total++;
          const key = `${d.key}|${m.name}|${ch}`;
          if(doneKeys.includes(key)) done++;
          else if(!firstUnfinished) firstUnfinished = { domain: d.key, matiereName: m.name, chapterIndex: i, chapterName: ch };
        });
      });
      overallDone += done; overallTotal += total;
      domainStats[d.key] = { done, total };
      const gauge = document.getElementById('gauge-' + d.key);
      const pctEl = document.getElementById('pct-' + d.key);
      if(gauge && pctEl){
        if(total === 0){ gauge.style.width = '0%'; pctEl.textContent = 'Pas encore de contenu'; }
        else {
          const pct = Math.round((done / total) * 100);
          gauge.style.width = pct + '%';
          pctEl.textContent = `${pct}% complété (${done}/${total})`;
        }
      }
    });

    const overallPct = overallTotal > 0 ? Math.round((overallDone / overallTotal) * 100) : 0;
    const ring = document.getElementById('progressRing');
    if(ring){
      ring.style.background = `conic-gradient(var(--blue) 0% ${overallPct}%, var(--line) ${overallPct}% 100%)`;
      document.getElementById('progressRingLabel').textContent = overallPct + '%';
    }

    renderWeekBars();

    /* carte "reprendre" : pointe vers le premier chapitre réellement non terminé */
    const continueTitle = document.getElementById('continueTitle');
    const continueBtn = document.getElementById('continueBtn');
    if(continueTitle && continueBtn){
      if(firstUnfinished){
        continueTitle.textContent = `${firstUnfinished.matiereName} — ${firstUnfinished.chapterName}`;
        continueBtn.textContent = 'Continuer';
        continueBtn.onclick = (e) => { e.preventDefault(); openChapitre(firstUnfinished.domain, firstUnfinished.matiereName, firstUnfinished.chapterIndex); };
      } else if(overallTotal > 0){
        continueTitle.textContent = 'Bravo, tout ce qui est accessible est terminé !';
        continueBtn.textContent = 'Voir les matières';
        continueBtn.onclick = (e) => { e.preventDefault(); showView('accueil'); setTimeout(() => document.getElementById('matieres').scrollIntoView({behavior:'smooth'}), 60); };
      }
    }

    /* liste de chapitres affichée : la matière en cours (celle du premier chapitre non terminé),
       sinon la première matière suivie du domaine Physique par défaut */
    const listLabel = document.getElementById('dashChapterListLabel');
    const listEl = document.getElementById('dashChapterList');
    const target = firstUnfinished || (() => {
      const tracked = getTrackedMatieres('Physique', premium);
      return tracked.length ? { domain: 'Physique', matiereName: tracked[0].name, chapterIndex: 0 } : null;
    })();
    if(listLabel && listEl && target){
      const chapters = chaptersFor(target.matiereName);
      listLabel.textContent = `${target.matiereName} — chapitres`;
      listEl.innerHTML = chapters.map((ch, i) => {
        const key = `${target.domain}|${target.matiereName}|${ch}`;
        const isDone = doneKeys.includes(key);
        const isCurrent = !isDone && (firstUnfinished ? (ch === firstUnfinished.chapterName && target.matiereName === firstUnfinished.matiereName) : i === 0);
        const status = isDone ? '<span class="status-done">terminé</span>' : (isCurrent ? '<span class="status-todo">en cours</span>' : '<span class="status-todo">à venir</span>');
        return `
        <div class="chapter-item" style="cursor:pointer;" onclick="openChapitre('${target.domain}','${jsEsc(target.matiereName)}',${i})">
          <div class="left"><span class="idx">${String(i + 1).padStart(2, '0')}</span><span>${ch}</span></div>
          ${status}
        </div>`;
      }).join('');
    } else if(listEl){
      listEl.innerHTML = '<div class="chapter-item"><div class="left"><span>Choisis une matière pour commencer</span></div></div>';
    }

    /* à suivre : suggestions basées sur la progression réelle */
    const revisionList = document.getElementById('revisionList');
    if(revisionList){
      const items = [];
      if(doneKeys.length > 0){
        const lastKey = doneKeys[doneKeys.length - 1];
        const lastChapterName = lastKey.split('|')[2] || lastKey;
        items.push(`<div class="revision-item"><span class="rev-day">Auj.</span><span>Relire : ${lastChapterName} (répétition espacée)</span></div>`);
      }
      if(firstUnfinished){
        items.push(`<div class="revision-item"><span class="rev-day">À faire</span><span>Chapitre suivant : ${firstUnfinished.chapterName} (${firstUnfinished.matiereName})</span></div>`);
      }
      if(items.length === 0){
        items.push(`<div class="revision-item"><span class="rev-day">—</span><span>Termine un premier chapitre pour voir des suggestions ici.</span></div>`);
      }
      revisionList.innerHTML = items.join('');
    }

    /* badges : calcul complet des statistiques réelles, partagé par le tableau de bord et la page dédiée */
    let matieresCompleted = 0, domainsTouched = 0;
    DOMAINS.forEach(d => {
      const tracked = getTrackedMatieres(d.key, premium);
      let touched = false;
      tracked.forEach(m => {
        const chapters = chaptersFor(m.name);
        const done = chapters.length > 0 && chapters.every(ch => doneKeys.includes(`${d.key}|${m.name}|${ch}`));
        if(done) matieresCompleted++;
        if(chapters.some(ch => doneKeys.includes(`${d.key}|${m.name}|${ch}`))) touched = true;
      });
      if(touched) domainsTouched++;
    });
    const activityLog = loadActivityLog();
    const totalMinutes = Object.values(activityLog).reduce((a, b) => a + b, 0);
    const premiumDays = currentUser.premiumSince ? Math.floor((Date.now() - new Date(currentUser.premiumSince)) / 86400000) : 0;

    lastBadgeStats = {
      chaptersDone: doneKeys.length, streak: currentUser.streakCount || 0,
      successRate: sumTotal > 0 ? (sumCorrect / sumTotal) * 100 : -1, successCount: sumTotal,
      matieresCompleted, domainsTouched, domainStats, totalMinutes,
      premiumActive: premium, premiumDays
    };
    renderBadgePreview();
    /* génère le bilan IA une seule fois par session (mis en cache) — le bouton
       "Actualiser" force un nouvel appel si l'étudiant veut un bilan à jour */
    if(document.getElementById('aiInsightBody') && !progressInsightCache && !progressInsightLoading){
      generateProgressInsight();
    }

    refreshChapterCompletionUI();
  }catch(e){ console.error('[progress]', e); }
}

/* ===================================================================
   CLASSEMENT DES ÉTUDIANTS — vue publique agrégée par niveau.
   S'appuie sur une fonction SQL `get_leaderboard()` côté Supabase qui
   agrège, pour chaque profil, ses chapitres terminés et ses exercices
   corrigés (aucune donnée sensible exposée : ni email, ni contenu des
   réponses). Elle est déclarée SECURITY DEFINER pour pouvoir agréger
   les données de TOUS les étudiants malgré les policies RLS de
   `progress` (qui, elles, limitent chacun à ses propres lignes — c'est
   volontaire et normal, l'agrégation contourne juste cette limite pour
   ces 6 colonnes précises, rien d'autre n'est exposé). Une simple vue
   avec `security_invoker` aurait au contraire réappliqué ces policies
   et renvoyé un classement vide ou une erreur de permission.
   Script à exécuter une fois dans l'éditeur SQL de Supabase, juste
   après la configuration de SUPABASE_URL / SUPABASE_ANON_KEY plus haut :

   create or replace function public.get_leaderboard()
   returns table(
     user_id uuid, name text, level text,
     chapters_done bigint, exercises_correct bigint, exercises_total bigint
   )
   language sql
   security definer
   set search_path = public
   as $$
     select p.id, p.name, p.level,
            count(*) filter (where pr.completed) as chapters_done,
            coalesce(sum(pr.exercises_correct),0) as exercises_correct,
            coalesce(sum(pr.exercises_total),0) as exercises_total
     from public.profiles p
     left join public.progress pr on pr.user_id = p.id
     group by p.id, p.name, p.level;
   $$;
   grant execute on function public.get_leaderboard() to authenticated;
   -- si ça échoue encore avec une erreur de permission sur profiles/progress,
   -- vérifie que ces deux tables existent bien sous ces noms et colonnes
   -- (id/user_id, name, level, completed, exercises_correct,
   -- exercises_total) — adapte les noms ci-dessus sinon.
   =================================================================== */

/* ===================================================================
   RÉCOMPENSE TOP 3 MENSUEL — le 1er, 2e et 3e de chaque niveau reçoivent
   respectivement +15, +10 et +5 jours Premium offerts, calculés sur les
   chapitres terminés au cours du mois écoulé (colonne `completed_at` de
   `progress`). Trois éléments côté Supabase, à exécuter UNE FOIS dans
   l'éditeur SQL, dans l'ordre ci-dessous :

   -- 1) Table qui historise les récompenses déjà attribuées (sert aussi
   --    à afficher la bannière de félicitations une seule fois, via son
   --    champ `acknowledged`) :
   create table if not exists public.leaderboard_rewards (
     id bigint generated always as identity primary key,
     user_id uuid not null references public.profiles(id) on delete cascade,
     level text not null,
     period date not null,             -- 1er jour du mois récompensé
     rank smallint not null,           -- 1, 2 ou 3
     days_awarded smallint not null,   -- 15, 10 ou 5
     awarded_at timestamptz not null default now(),
     acknowledged boolean not null default false,
     unique (user_id, level, period)
   );
   alter table public.leaderboard_rewards enable row level security;
   create policy "Chacun voit ses propres recompenses" on public.leaderboard_rewards
     for select using (auth.uid() = user_id);
   create policy "Chacun acquitte ses propres notifications" on public.leaderboard_rewards
     for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
   -- aucune policy insert pour les étudiants : seule la fonction
   -- SECURITY DEFINER ci-dessous (donc le cron) peut créer une ligne.

   -- 2) Classement du mois : mêmes colonnes que get_leaderboard(), mais
   --    ne compte que les chapitres dont `completed_at` tombe dans le
   --    mois de `p_period` (par défaut, le mois civil précédent) :
   create or replace function public.get_monthly_leaderboard(
     p_period date default date_trunc('month', now())
   )
   returns table(
     user_id uuid, name text, level text,
     chapters_done bigint, exercises_correct bigint, exercises_total bigint
   )
   language sql
   security definer
   set search_path = public
   as $$
     select p.id, p.name, p.level,
            count(*) filter (
              where pr.completed
                and pr.completed_at >= date_trunc('month', p_period)
                and pr.completed_at <  date_trunc('month', p_period) + interval '1 month'
            ) as chapters_done,
            coalesce(sum(pr.exercises_correct) filter (
              where pr.completed_at >= date_trunc('month', p_period)
                and pr.completed_at <  date_trunc('month', p_period) + interval '1 month'
            ), 0) as exercises_correct,
            coalesce(sum(pr.exercises_total) filter (
              where pr.completed_at >= date_trunc('month', p_period)
                and pr.completed_at <  date_trunc('month', p_period) + interval '1 month'
            ), 0) as exercises_total
     from public.profiles p
     left join public.progress pr on pr.user_id = p.id
     group by p.id, p.name, p.level;
   $$;
   grant execute on function public.get_monthly_leaderboard(date) to authenticated;

   -- 3) Attribution automatique : à programmer pour tourner le 1er de
   --    chaque mois (elle récompense alors le mois qui vient de finir).
   --    Idempotente : rejouée deux fois pour la même période, elle ne
   --    double jamais une récompense déjà enregistrée (contrainte
   --    unique sur user_id/level/period + `on conflict do nothing`).
   create or replace function public.award_monthly_top3()
   returns void
   language plpgsql
   security definer
   set search_path = public
   as $$
   declare
     v_period date := date_trunc('month', now() - interval '1 month');
     v_level text;
     rec record;
     v_rank int;
     v_days int;
   begin
     for v_level in select distinct level from public.profiles where level is not null loop
       v_rank := 0;
       for rec in
         select user_id, chapters_done, exercises_correct, exercises_total
         from public.get_monthly_leaderboard(v_period)
         where level = v_level and chapters_done > 0
         order by chapters_done desc,
                  case when exercises_total > 0
                       then exercises_correct::numeric / exercises_total
                       else -1 end desc
         limit 3
       loop
         v_rank := v_rank + 1;
         v_days := case v_rank when 1 then 15 when 2 then 10 when 3 then 5 end;

         insert into public.leaderboard_rewards(user_id, level, period, rank, days_awarded)
         values (rec.user_id, v_level, v_period, v_rank, v_days)
         on conflict (user_id, level, period) do nothing;

         if found then
           update public.profiles
           set premium = true,
               premium_until = greatest(coalesce(premium_until, now()), now()) + (v_days || ' days')::interval
           where id = rec.user_id;
         end if;
       end loop;
     end loop;
   end;
   $$;
   grant execute on function public.award_monthly_top3() to service_role;

   -- 4) Planification mensuelle automatique (extension pg_cron, activable
   --    depuis Database > Extensions dans le tableau de bord Supabase) :
   create extension if not exists pg_cron;
   select cron.schedule(
     'award-monthly-top3',
     '0 3 1 * *',                          -- 03:00 UTC le 1er de chaque mois
     $$select public.award_monthly_top3();$$
   );
   -- Pour tester manuellement sans attendre le 1er du mois, exécuter
   -- directement : select public.award_monthly_top3();
   =================================================================== */
let classementLevel = null;
let classementCache = {}; /* { [level]: rows[] } — évite de re-fetcher à chaque clic d'onglet */

function totalChaptersForLevel(level){
  let total = 0;
  DOMAINS.forEach(d => {
    getMatieres(level, d.key).forEach(m => { total += chaptersFor(m.name).length; });
  });
  return total;
}

function classementVerdict(pct, successRate, chaptersDone){
  if(chaptersDone === 0) return { emoji:'🌱', label:'Pas encore démarré', tone:'neutral' };
  const sr = (successRate === null || isNaN(successRate)) ? null : successRate;
  if(pct >= 75 && (sr === null || sr >= 70)) return { emoji:'🚀', label:'Excellente dynamique', tone:'great' };
  if(pct >= 40 && (sr === null || sr >= 55)) return { emoji:'📈', label:'Progression solide', tone:'good' };
  if(sr !== null && sr < 45) return { emoji:'🧩', label:'Fondamentaux à consolider', tone:'warn' };
  if(pct < 15) return { emoji:'🐢', label:'Démarrage timide', tone:'warn' };
  return { emoji:'🙂', label:'En bonne voie', tone:'mid' };
}

function initClassementPage(){
  classementLevel = (currentUser && currentUser.level) || 'L1';
  const tabsEl = document.getElementById('classementTabs');
  if(tabsEl){
    tabsEl.innerHTML = [...LEVEL_ORDER, 'all'].map(lv => `
      <button class="classement-tab${lv === classementLevel ? ' active' : ''}" data-lv="${lv}" onclick="setClassementLevel('${lv}')">${LEVEL_LABELS[lv]}</button>
    `).join('');
  }
  loadClassement(classementLevel);
  loadMonthlySpotlight(classementLevel);
}

function setClassementLevel(level){
  classementLevel = level;
  document.querySelectorAll('#classementTabs .classement-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.lv === level);
  });
  loadClassement(level);
  loadMonthlySpotlight(level);
}

/* ---- aperçu "Top 3 du mois" : classement provisoire du mois en cours,
   purement informatif — la vraie récompense n'est attribuée qu'à la fin
   du mois par la fonction SQL award_monthly_top3() (voir le bloc SQL
   ci-dessus), jamais depuis le navigateur. ---- */
const MONTHLY_REWARD_DAYS = [15, 10, 5];
let monthlySpotlightCache = {};

async function loadMonthlySpotlight(level){
  const podiumEl = document.getElementById('msPodium');
  const labelEl = document.getElementById('msMonthLabel');
  if(!podiumEl) return;
  if(labelEl){
    const now = new Date();
    labelEl.textContent = now.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  }
  if(level === 'all'){
    podiumEl.innerHTML = '<div class="ms-empty">Choisis un niveau précis pour voir son Top 3 du mois (la récompense est attribuée par niveau).</div>';
    return;
  }
  if(!supabaseClient){
    podiumEl.innerHTML = '<div class="ms-empty">Le Top 3 du mois nécessite une connexion au serveur.</div>';
    return;
  }
  podiumEl.innerHTML = '<div class="ms-empty">Chargement…</div>';
  try{
    let rows = monthlySpotlightCache[level];
    if(!rows){
      const { data, error } = await supabaseClient.rpc('get_monthly_leaderboard', { p_period: new Date().toISOString().slice(0,10) });
      if(error) throw error;
      rows = (data || []).filter(r => r.level === level && r.chapters_done > 0);
      rows.sort((a, b) => {
        const rateA = a.exercises_total > 0 ? a.exercises_correct / a.exercises_total : -1;
        const rateB = b.exercises_total > 0 ? b.exercises_correct / b.exercises_total : -1;
        return b.chapters_done - a.chapters_done || rateB - rateA;
      });
      rows = rows.slice(0, 3);
      monthlySpotlightCache[level] = rows;
    }
    if(rows.length === 0){
      podiumEl.innerHTML = '<div class="ms-empty">Personne n\'a encore terminé de chapitre ce mois-ci dans ce niveau — sois le premier !</div>';
      return;
    }
    const medals = ['🥇','🥈','🥉'];
    podiumEl.innerHTML = rows.map((r, i) => `
      <div class="ms-row${currentUser && r.user_id === currentUser.id ? ' is-me' : ''}">
        <div class="ms-rank">${medals[i]}</div>
        <div class="ms-name">${jsEscHtml(r.name || 'Étudiant·e')}${currentUser && r.user_id === currentUser.id ? ' <span class="you-tag">Toi</span>' : ''} — ${r.chapters_done} chapitre${r.chapters_done > 1 ? 's' : ''} ce mois-ci</div>
        <div class="ms-days">+${MONTHLY_REWARD_DAYS[i]} jours si maintenu</div>
      </div>
    `).join('');
  }catch(e){
    console.error('[classement-mensuel]', e && (e.message || e.error_description) || e);
    podiumEl.innerHTML = '<div class="ms-empty">Le Top 3 du mois n\'est pas encore configuré côté serveur (fonction get_monthly_leaderboard manquante — voir le bloc SQL fourni).</div>';
  }
}

/* ---- notification "tu as gagné le Top 3 !" : vérifiée une fois après
   connexion, affichée jusqu'à ce que l'étudiant la ferme (elle est alors
   marquée acquittée en base pour ne plus jamais réapparaître). ---- */
async function checkPendingRewards(){
  const bannerEl = document.getElementById('rewardBanner');
  if(!bannerEl || !currentUser || !supabaseClient) return;
  try{
    const { data, error } = await supabaseClient
      .from('leaderboard_rewards')
      .select('id, level, rank, days_awarded, period')
      .eq('user_id', currentUser.id)
      .eq('acknowledged', false)
      .order('period', { ascending: false });
    if(error) throw error;
    if(!data || data.length === 0){ bannerEl.style.display = 'none'; return; }

    const medal = { 1: '🥇', 2: '🥈', 3: '🥉' };
    const ordinal = { 1: '1er', 2: '2e', 3: '3e' };
    bannerEl.innerHTML = data.map(r => {
      const monthLabel = new Date(r.period).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      return `
        <div class="reward-banner" data-reward-id="${r.id}">
          <div class="reward-emoji">${medal[r.rank] || '🏆'}</div>
          <div class="reward-text">
            <strong>Bravo, ${ordinal[r.rank] || r.rank + 'e'} du classement ${LEVEL_LABELS[r.level] || r.level} en ${monthLabel} !</strong>
            +${r.days_awarded} jours d'abonnement Premium t'ont été offerts en récompense 🎉
          </div>
          <div class="reward-close" title="Fermer" onclick="dismissReward(${r.id}, this)">✕</div>
        </div>`;
    }).join('');
    bannerEl.style.display = 'block';
  }catch(e){
    /* silencieux : si la table n'existe pas encore côté Supabase (SQL pas
       encore exécuté), on ne bloque jamais l'affichage du tableau de bord */
    console.error('[recompenses]', e && (e.message || e.error_description) || e);
  }
}

async function dismissReward(id, btnEl){
  const cardEl = btnEl && btnEl.closest('.reward-banner');
  if(cardEl) cardEl.remove();
  const bannerEl = document.getElementById('rewardBanner');
  if(bannerEl && !bannerEl.querySelector('.reward-banner')) bannerEl.style.display = 'none';
  if(!supabaseClient || !currentUser) return;
  try{
    await supabaseClient.from('leaderboard_rewards').update({ acknowledged: true }).eq('id', id).eq('user_id', currentUser.id);
    /* la récompense a pu prolonger premium_until : on rafraîchit le profil
       pour que le statut d'abonnement affiché à l'écran soit à jour */
    const { data: profile } = await supabaseClient.from('profiles').select('premium, premium_until').eq('id', currentUser.id).maybeSingle();
    if(profile){
      currentUser.premium = profile.premium;
      currentUser.premiumUntil = profile.premium_until;
      updateAuthUI();
    }
  }catch(e){ console.error('[recompense-acquittement]', e); }
}

async function loadClassement(level){
  const contentEl = document.getElementById('classementContent');
  const meEl = document.getElementById('classementMe');
  if(!contentEl) return;
  contentEl.innerHTML = '<div class="classement-loading">Chargement du classement…</div>';
  if(meEl) meEl.innerHTML = '';

  if(!supabaseClient){
    contentEl.innerHTML = '<div class="classement-error">Le classement nécessite une connexion au serveur — il n\'est pas disponible hors ligne.</div>';
    return;
  }

  try{
    let rows = classementCache[level];
    if(!rows){
      const { data, error } = await supabaseClient.rpc('get_leaderboard');
      if(error) throw error;
      rows = data || [];
      classementCache[level] = rows; /* on filtre le niveau côté client, on met tout en cache une fois */
    }

    const filtered = level === 'all' ? rows : rows.filter(r => r.level === level);
    if(filtered.length === 0){
      contentEl.innerHTML = '<div class="classement-empty">Aucun étudiant à afficher pour ce niveau pour le moment.</div>';
      return;
    }

    /* si "Toutes les matières" est sélectionné, chaque étudiant est comparé au total
       de SON PROPRE niveau (comparer un L1 à un total L3 n'aurait pas de sens) */
    const totalsByLevel = {};
    LEVEL_ORDER.forEach(lv => { totalsByLevel[lv] = totalChaptersForLevel(lv); });

    const computed = filtered.map(r => {
      const total = totalsByLevel[r.level] || 1;
      const pct = total > 0 ? Math.round((r.chapters_done / total) * 100) : 0;
      const successRate = r.exercises_total > 0 ? Math.round((r.exercises_correct / r.exercises_total) * 100) : null;
      return {
        userId: r.user_id, name: r.name || 'Étudiant·e', level: r.level,
        chaptersDone: r.chapters_done || 0, total, pct: Math.min(100, pct),
        successRate, verdict: classementVerdict(pct, successRate, r.chapters_done || 0)
      };
    });

    computed.sort((a, b) => b.pct - a.pct || (b.successRate ?? -1) - (a.successRate ?? -1) || b.chaptersDone - a.chaptersDone);

    const isMe = (row) => currentUser && row.userId === currentUser.id;
    const initials = (name) => (name || '?').trim().split(/\s+/).slice(0,2).map(w => w[0]?.toUpperCase() || '').join('') || '?';

    const rankClass = (i) => i === 0 ? 'top1' : i === 1 ? 'top2' : i === 2 ? 'top3' : '';
    const rankDisplay = (i) => i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);

    contentEl.innerHTML = `<div class="classement-list">${computed.map((row, i) => `
      <div class="classement-row${isMe(row) ? ' is-me' : ''}">
        <div class="classement-rank ${rankClass(i)}">${rankDisplay(i)}</div>
        <div class="classement-avatar">${initials(row.name)}</div>
        <div class="classement-main">
          <div class="classement-name">${jsEscHtml(row.name)}${isMe(row) ? '<span class="you-tag">Toi</span>' : ''}</div>
          <div class="classement-meta">
            <span class="meta-item">${row.pct}% du programme <span class="classement-gauge-mini"><span style="width:${row.pct}%"></span></span></span>
            <span class="meta-item">${row.successRate === null ? 'Pas encore d\'exercice' : row.successRate + '% de réussite'}</span>
            <span class="meta-item">${row.chaptersDone} chapitre${row.chaptersDone > 1 ? 's' : ''} terminé${row.chaptersDone > 1 ? 's' : ''}</span>
          </div>
        </div>
        <div class="classement-verdict tone-${row.verdict.tone}">${row.verdict.emoji} ${row.verdict.label}</div>
      </div>
    `).join('')}</div>`;

    /* carte "toi" épinglée en haut si tu n'es pas dans le top affiché à l'écran */
    if(meEl && currentUser){
      const myIndex = computed.findIndex(isMe);
      if(myIndex >= 3){
        const my = computed[myIndex];
        meEl.innerHTML = `
          <div class="classement-me-card">
            <div class="classement-rank rank-pill">#${myIndex + 1}</div>
            <div class="me-info"><strong>Ta position</strong><span>${my.pct}% du programme · ${my.successRate === null ? 'pas encore d\'exercice' : my.successRate + '% de réussite'}</span></div>
            <div class="classement-verdict tone-${my.verdict.tone}">${my.verdict.emoji} ${my.verdict.label}</div>
          </div>`;
      }
    }
  }catch(e){
    /* on journalise le détail exploitable (message/code/hint de Supabase) plutôt que l'objet
       brut, qui s'affiche comme "[object Object]" dans la plupart des consoles navigateur */
    console.error('[classement]', e && (e.message || e.error_description) || e, {
      code: e && e.code, details: e && e.details, hint: e && e.hint
    });
    const missingView = e && (e.code === '42883' || e.code === 'PGRST202' || e.code === '42P01' || /get_leaderboard/i.test(e.message || e.hint || ''));
    contentEl.innerHTML = missingView
      ? '<div class="classement-error">Le classement n\'est pas encore configuré côté serveur : la fonction <code>get_leaderboard()</code> doit être créée dans Supabase (voir le commentaire SQL au-dessus de ce code).</div>'
      : `<div class="classement-error">Le classement n'a pas pu être chargé pour le moment. Réessaie un peu plus tard.${e && e.message ? `<br><span style="font-size:0.72rem;opacity:0.7;">${jsEscHtml(e.message)}</span>` : ''}</div>`;
  }
}

/* ===================================================================
   BILAN IA DE PROGRESSION — même pont Groq que Nova dans les chapitres
   (fonction Supabase Edge "ai-chat", modèle Llama 3.3 via Groq, gratuit),
   mais appliqué ici aux vraies statistiques du tableau de bord plutôt
   qu'au contenu d'un chapitre. Repli sur une analyse 100% locale par
   règles si Supabase n'est pas connecté ou si l'appel échoue (hors
   ligne, quota...), pour que le bilan reste toujours disponible. */
let progressInsightCache = null;
let progressInsightLoading = false;

function buildProgressStatsSummary(stats){
  if(!stats) return '';
  const domainOrder = ['Physique','Chimie','Mathématiques','Informatique','Autres'];
  const domainLines = domainOrder.map(k => {
    const d = stats.domainStats[k];
    return d && d.total > 0 ? `${k} : ${d.done}/${d.total} chapitres` : null;
  }).filter(Boolean).join(', ');
  const successTxt = stats.successRate >= 0
    ? `${Math.round(stats.successRate)}% de réussite sur ${stats.successCount} exercice(s)`
    : "pas encore d'exercice fait";
  return `Chapitres terminés : ${stats.chaptersDone}. Série actuelle : ${stats.streak} jour(s) de suite. `
    + `Réussite aux exercices : ${successTxt}. Temps d'étude cumulé : ${stats.totalMinutes} minute(s). `
    + `Matières entièrement terminées : ${stats.matieresCompleted}. Domaines touchés : ${stats.domainsTouched}/5`
    + (domainLines ? ` (${domainLines})` : '') + `. Abonnement premium actif : ${stats.premiumActive ? 'oui' : 'non'}.`;
}

/* repli local sans réseau : pointe le point fort et le point faible les plus
   visibles dans les vraies statistiques, avec une suggestion concrète */
function localProgressInsight(stats){
  if(!stats || stats.chaptersDone === 0){
    return "Tu n'as pas encore terminé de chapitre — commence par le premier chapitre gratuit d'une matière qui t'intéresse pour voir apparaître ton premier bilan de progression ici.";
  }
  const parts = [];
  parts.push(`Tu as terminé ${stats.chaptersDone} chapitre${stats.chaptersDone > 1 ? 's' : ''}`
    + (stats.streak >= 2 ? `, avec une série de ${stats.streak} jours de suite — continue sur cette lancée.` : '.'));
  if(stats.successCount >= 3){
    if(stats.successRate >= 80) parts.push(`Ton taux de réussite aux exercices est excellent (${Math.round(stats.successRate)}%) : tu maîtrises bien les notions abordées jusqu'ici.`);
    else if(stats.successRate >= 50) parts.push(`Ton taux de réussite (${Math.round(stats.successRate)}%) est correct, mais relire les chapitres avant de refaire les exercices pourrait encore le faire progresser.`);
    else parts.push(`Ton taux de réussite (${Math.round(stats.successRate)}%) suggère de reprendre calmement les derniers chapitres avant d'enchaîner sur la suite.`);
  }
  const domainEntries = Object.entries(stats.domainStats).filter(([, d]) => d && d.total > 0);
  if(domainEntries.length){
    const strongest = domainEntries.reduce((a, b) => (b[1].done / b[1].total) > (a[1].done / a[1].total) ? b : a);
    const weakest = domainEntries.filter(([k]) => k !== strongest[0]).sort((a, b) => (a[1].done / a[1].total) - (b[1].done / b[1].total))[0];
    if(strongest[1].done > 0) parts.push(`Ton domaine le plus avancé est ${strongest[0]} (${strongest[1].done}/${strongest[1].total} chapitres).`);
    if(weakest && weakest[1].done < weakest[1].total) parts.push(`${weakest[0]} reste encore peu exploré — un bon prochain objectif si tu veux diversifier tes acquis.`);
  }
  if(stats.totalMinutes > 0) parts.push(`Temps d'étude cumulé : ${Math.round(stats.totalMinutes / 60 * 10) / 10} heure(s).`);
  return parts.join(' ');
}

async function generateProgressInsight(force){
  const body = document.getElementById('aiInsightBody');
  if(!body) return;
  if(!currentUser){
    body.innerHTML = `<p style="color:var(--ink-soft); font-size:0.88rem;">Connecte-toi pour obtenir un bilan personnalisé de ta progression.</p>`;
    return;
  }
  if(!lastBadgeStats){ await loadRealProgress(); }
  if(!lastBadgeStats) return;
  if(progressInsightCache && !force){
    body.innerHTML = `<p>${progressInsightCache}</p>`;
    return;
  }
  if(progressInsightLoading) return;
  progressInsightLoading = true;
  const btn = document.getElementById('aiInsightBtn');
  if(btn){ btn.disabled = true; btn.classList.add('is-loading'); }
  body.innerHTML = `<p style="color:var(--ink-soft); font-size:0.88rem;"><i>Nova analyse ta progression…</i></p>`;

  const statsSummary = buildProgressStatsSummary(lastBadgeStats);
  const prompt = "Analyse la progression de cet(te) étudiant(e) sur la plateforme et donne un bilan court (4 à 5 phrases), en français, encourageant mais honnête : un point fort, un point à travailler, et une suggestion concrète pour la suite. Ne recopie pas les chiffres un par un, rédige un vrai petit paragraphe.";

  const finish = (text) => {
    progressInsightCache = text;
    body.innerHTML = `<p>${text}</p>`;
    if(btn){ btn.disabled = false; btn.classList.remove('is-loading'); }
    progressInsightLoading = false;
  };

  if(supabaseClient){
    /* Sécurité : plus de secret partagé côté client (il serait visible par
       n'importe qui via "Afficher le code source"). L'appel est authentifié
       par le JWT de la session utilisateur — le SDK Supabase l'ajoute
       automatiquement ; l'Edge Function doit vérifier ce JWT avec
       supabase.auth.getUser() côté serveur (voir rapport de sécurité). */
    supabaseClient.functions.invoke('ai-chat', {
      body: { message: prompt, chapterTitle: 'Bilan de progression', chapterSummary: statsSummary, history: [] }
    }).then(({ data, error }) => {
      /* la réponse vient d'un LLM distant : on l'échappe avant injection HTML,
         au cas où une injection de prompt lui ferait renvoyer du HTML/JS */
      if(!error && data && data.reply){ finish(jsEscHtmlKeepLines(data.reply)); }
      else { if(error) console.error('[ai-chat/progress]', error); finish(localProgressInsight(lastBadgeStats)); }
    }).catch(e => { console.error('[ai-chat/progress]', e); finish(localProgressInsight(lastBadgeStats)); });
  } else {
    setTimeout(() => finish(localProgressInsight(lastBadgeStats)), 350);
  }
}

function toggleAuthMode(){
  authMode = authMode === 'login' ? 'signup' : 'login';
  const isSignup = authMode === 'signup';
  document.getElementById('fieldName').style.display = isSignup ? 'block' : 'none';
  document.getElementById('authEyebrow').textContent = isSignup ? 'Bienvenue' : 'Bon retour';
  document.getElementById('authTitle').textContent = isSignup ? 'Créer un compte' : 'Connexion';
  document.getElementById('authForgot').style.display = isSignup ? 'none' : 'inline-block';
  document.getElementById('authSubmitBtn').textContent = isSignup ? "S'inscrire" : 'Se connecter';
  document.getElementById('authSubmitBtn').onclick = isSignup ? submitSignup : submitLogin;
  document.getElementById('authSwitch').innerHTML = isSignup
    ? `Déjà un compte ? <a href="#" onclick="toggleAuthMode(); return false;">Se connecter</a>`
    : `Pas encore de compte ? <a href="#" onclick="toggleAuthMode(); return false;">Créer un compte</a>`;
  document.getElementById('authError').style.display = 'none';
}

function showAuthError(msg){
  const el = document.getElementById('authError');
  el.textContent = msg;
  el.style.display = 'block';
}

function requireSupabase(){
  if(!supabaseClient){
    showAuthError(supabaseInitError || "Supabase n'est pas connecté.");
    return false;
  }
  return true;
}

async function submitSignup(){
  if(!requireSupabase()) return;
  const name = document.getElementById('authName').value.trim();
  const email = document.getElementById('authEmail').value.trim().toLowerCase();
  const pass = document.getElementById('authPass').value;
  if(!name || !email || !pass){ showAuthError('Remplis tous les champs.'); return; }
  if(pass.length < 6){ showAuthError('Mot de passe trop court (6 caractères minimum).'); return; }
  await withLoading(document.getElementById('authSubmitBtn'), async () => {
    try{
      const { data, error } = await supabaseClient.auth.signUp({
        email, password: pass, options: { data: { name } }
      });
      if(error){ showAuthError(error.message); console.error('[signUp]', error); return; }
      if(!data.session){
        showAuthError("Compte créé. Si la confirmation par email est activée sur ton projet Supabase, vérifie ta boîte mail avant de te connecter.");
        return;
      }
      await loadProfileAndEnter(data.user, name);
    }catch(e){ showAuthError('Erreur réseau : ' + e.message); console.error('[signUp]', e); }
  });
}

async function submitLogin(){
  if(!requireSupabase()) return;
  const email = document.getElementById('authEmail').value.trim().toLowerCase();
  const pass = document.getElementById('authPass').value;
  if(!email || !pass){ showAuthError('Entre ton email et ton mot de passe.'); return; }
  await withLoading(document.getElementById('authSubmitBtn'), async () => {
    try{
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password: pass });
      if(error){ showAuthError(error.message); console.error('[signIn]', error); return; }
      await loadProfileAndEnter(data.user);
    }catch(e){ showAuthError('Erreur réseau : ' + e.message); console.error('[signIn]', e); }
  });
}

/* Lien "mot de passe oublié" — ajout autonome qui utilise le mécanisme standard de
   Supabase (email de réinitialisation). Ne modifie ni submitLogin, ni submitSignup,
   ni la logique des appareils/abonnement. */
async function forgotPassword(){
  if(!requireSupabase()) return;
  const email = document.getElementById('authEmail').value.trim().toLowerCase();
  if(!email){ showAuthError('Entre ton email ci-dessus, puis clique de nouveau sur "Mot de passe oublié ?".'); return; }
  try{
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
    if(error){ showAuthError(error.message); console.error('[resetPassword]', error); return; }
    showAuthError("Si un compte existe avec cet email, un lien de réinitialisation vient d'être envoyé.");
  }catch(e){ showAuthError('Erreur réseau : ' + e.message); console.error('[resetPassword]', e); }
}

async function loadProfileAndEnter(authUser, fallbackName){
  try{
    let { data: profile, error } = await supabaseClient
      .from('profiles').select('*').eq('id', authUser.id).maybeSingle();
    if(error){ showAuthError('Erreur profil : ' + error.message); console.error('[profile]', error); return; }
    if(!profile){
      /* Le déclencheur automatique n'a pas créé le profil (SQL pas encore à jour, ou compte
         créé avant sa mise en place) — on le crée ici pour ne pas bloquer l'étudiant. */
      const { data: created, error: insertErr } = await supabaseClient
        .from('profiles')
        .insert({ id: authUser.id, email: authUser.email, name: fallbackName || authUser.email.split('@')[0] })
        .select().single();
      if(insertErr){ showAuthError('Erreur création profil : ' + insertErr.message); console.error('[profile insert]', insertErr); return; }
      profile = created;
    } else if(fallbackName && profile.name !== fallbackName){
      /* Le profil existait déjà (souvent créé par un déclencheur SQL au moment de l'inscription)
         mais sans le vrai nom saisi par l'étudiant, qui se retrouvait alors avec un nom déduit de
         son email. On corrige ici en réappliquant le nom saisi au formulaire d'inscription —
         ceci ne touche à rien d'autre (premium, niveau, appareils restent inchangés). */
      const { data: fixed, error: fixErr } = await supabaseClient
        .from('profiles').update({ name: fallbackName }).eq('id', authUser.id).select().single();
      if(!fixErr && fixed) profile = fixed;
    }

    if(profile.suspended){
      showAuthError("Ce compte a été suspendu. Contacte estudentuniversity5@gmail.com pour plus d'informations.");
      await supabaseClient.auth.signOut();
      return;
    }

    const slot = await checkDeviceSlot(authUser.id);
    if(!slot.allowed){
      pendingAuthUser = authUser;
      deviceManagerMode = 'blocking';
      renderDeviceManager(slot.sessions);
      showView('appareils');
      return;
    }

    currentUser = {
      id: authUser.id, email: authUser.email, name: profile.name, level: profile.level,
      premium: profile.premium, premiumSince: profile.premium_since, premiumUntil: profile.premium_until,
      streakCount: profile.streak_count || 0, lastActiveDate: profile.last_active_date,
      role: profile.role || 'student', avatarUrl: profile.avatar_url || null
    };
    updateAuthUI();
    const adminLink = document.getElementById('navAdminLink');
    if(adminLink) adminLink.style.display = (currentUser.role === 'admin') ? 'inline-block' : 'none';
    const dockAdminBtn = document.getElementById('dockAdminBtn');
    if(dockAdminBtn) dockAdminBtn.style.display = (currentUser.role === 'admin') ? '' : 'none';
    esuEnterAfterLogin();
    checkPendingRewards();
    initPresence();
    refreshUnreadBadge();
    setInterval(refreshUnreadBadge, 30000);
  }catch(e){ showAuthError('Erreur réseau : ' + e.message); console.error('[profile]', e); }
}

/* ---- limite de 2 appareils actifs par compte, pour freiner le partage de mot de passe ---- */
let pendingAuthUser = null;

function getDeviceId(){
  let id = localStorage.getItem('esu_device_id');
  if(!id){ id = crypto.randomUUID(); localStorage.setItem('esu_device_id', id); }
  return id;
}

function guessDeviceLabel(){
  const ua = navigator.userAgent;
  let os = 'Appareil';
  if(/Android/i.test(ua)) os = 'Android';
  else if(/iPhone|iPad/i.test(ua)) os = 'iPhone / iPad';
  else if(/Windows/i.test(ua)) os = 'Windows';
  else if(/Macintosh/i.test(ua)) os = 'Mac';
  let browser = '';
  if(/Edg/i.test(ua)) browser = 'Edge';
  else if(/Chrome/i.test(ua)) browser = 'Chrome';
  else if(/Firefox/i.test(ua)) browser = 'Firefox';
  else if(/Safari/i.test(ua)) browser = 'Safari';
  return browser ? `${os} · ${browser}` : os;
}

async function checkDeviceSlot(userId){
  const deviceId = getDeviceId();
  const { data: sessions, error } = await supabaseClient
    .from('sessions').select('*').eq('user_id', userId).order('last_seen', { ascending: true });
  if(error){ console.error('[sessions]', error); return { allowed: true }; } /* on ne bloque pas si la table n'existe pas encore */
  const mine = (sessions || []).find(s => s.id === deviceId);
  if(mine){
    await supabaseClient.from('sessions').update({ last_seen: new Date().toISOString() }).eq('id', deviceId);
    return { allowed: true };
  }
  if(!sessions || sessions.length < 2){
    await supabaseClient.from('sessions').insert({ id: deviceId, user_id: userId, device_label: guessDeviceLabel() });
    return { allowed: true };
  }
  return { allowed: false, sessions };
}

let deviceManagerMode = 'blocking'; /* 'blocking' = bloqué à la connexion (3e appareil) | 'manage' = consultation libre depuis le Profil */

async function openDeviceManagerFromProfile(){
  if(!currentUser || !supabaseClient) return;
  deviceManagerMode = 'manage';
  const { data: sessions, error } = await supabaseClient
    .from('sessions').select('*').eq('user_id', currentUser.id).order('last_seen', { ascending: true });
  if(error){ console.error('[sessions]', error); return; }
  renderDeviceManager(sessions || []);
  showView('appareils');
}

function renderDeviceManager(sessions){
  const list = document.getElementById('deviceList');
  const myDeviceId = getDeviceId();
  document.getElementById('deviceManagerIntro').textContent = deviceManagerMode === 'manage'
    ? "Voici les appareils actuellement connectés à ton compte."
    : "Pour éviter le partage d'un même compte, un abonnement E-Student University permet 2 appareils actifs en même temps. Déconnecte-en un ci-dessous pour continuer ici.";
  document.getElementById('deviceManagerCancel').textContent = deviceManagerMode === 'manage' ? '← Retour au profil' : '← Annuler et me déconnecter';
  list.innerHTML = sessions.map(s => `
    <div class="device-card">
      <div>
        <strong>${s.device_label || 'Appareil'}${s.id === myDeviceId ? ' (cet appareil)' : ''}</strong>
        <span>Actif depuis le ${new Date(s.created_at).toLocaleDateString('fr-FR')}</span>
      </div>
      <button class="btn btn-ghost" style="font-size:0.78rem;" onclick="freeDeviceSlot('${s.id}')">Déconnecter</button>
    </div>`).join('');
}

async function freeDeviceSlot(sessionId){
  await supabaseClient.from('sessions').delete().eq('id', sessionId);
  if(deviceManagerMode === 'manage'){ openDeviceManagerFromProfile(); return; }
  if(pendingAuthUser){ await loadProfileAndEnter(pendingAuthUser); }
}

function cancelDeviceLogin(){
  if(deviceManagerMode === 'manage'){ showView('profil'); return; }
  pendingAuthUser = null;
  if(supabaseClient) supabaseClient.auth.signOut();
  showView('connexion');
}

async function logoutUser(){
  if(supabaseClient){
    try{ await supabaseClient.from('sessions').delete().eq('id', getDeviceId()); }catch(e){ /* silencieux */ }
    await supabaseClient.auth.signOut();
  }
  currentUser = null;
  updateAuthUI();
  showView('connexion');
}

/* Ajout : point d'entrée pour se déconnecter depuis l'avatar (jusqu'ici inaccessible
   dans l'interface). N'appelle que logoutUser() telle quelle, sans la modifier. */
function confirmLogout(){
  if(!currentUser) return;
  if(confirm('Se déconnecter de E-Student University ?')) logoutUser();
}

/* Met à jour les champs modifiables par l'étudiant (nom, niveau) — jamais "premium",
   bloqué côté base de données par une politique de sécurité (RLS), voir le SQL fourni. */
function renderProfilePage(){
  if(!currentUser) return;
  document.getElementById('profileName').value = currentUser.name || '';
  document.getElementById('profileEmail').textContent = currentUser.email;
  document.getElementById('profileLevel').textContent = LEVEL_LABELS[currentUser.level] || 'Non choisi';
  document.getElementById('profileSub').textContent = hasFullAccess(currentUser)
    ? `Premium jusqu'au ${new Date(currentUser.premiumUntil).toLocaleDateString('fr-FR')}`
    : 'Aucun abonnement actif';
  const img = document.getElementById('profileAvatarPreview');
  const placeholder = document.getElementById('profileAvatarPlaceholder');
  if(currentUser.avatarUrl){
    img.src = currentUser.avatarUrl; img.style.display = 'block'; placeholder.style.display = 'none';
  } else {
    img.style.display = 'none'; placeholder.style.display = 'flex';
    placeholder.textContent = (currentUser.name || '?').trim().charAt(0).toUpperCase();
  }
}

async function uploadProfileAvatar(file){
  const note = document.getElementById('profileAvatarNote');
  if(!file || !currentUser || !supabaseClient) return;
  note.style.display = 'block';
  if(!['image/png','image/jpeg','image/webp'].includes(file.type)){
    note.style.color = '#B23A44'; note.textContent = 'Format non supporté (JPG, PNG ou WebP uniquement).'; return;
  }
  if(file.size > 3 * 1024 * 1024){
    note.style.color = '#B23A44'; note.textContent = 'Fichier trop lourd (3 Mo maximum).'; return;
  }
  note.style.color = 'var(--ink-soft)'; note.textContent = 'Envoi en cours…';
  try{
    const ext = file.name.split('.').pop().toLowerCase();
    const path = `${currentUser.id}/avatar.${ext}`;
    const { error: uploadError } = await supabaseClient.storage.from('avatars').upload(path, file, { upsert: true });
    if(uploadError){ note.style.color = '#B23A44'; note.textContent = 'Échec de l\'envoi : ' + uploadError.message; return; }
    const { data: pub } = supabaseClient.storage.from('avatars').getPublicUrl(path);
    const url = pub.publicUrl + '?t=' + Date.now(); // évite le cache navigateur sur remplacement
    const { error: dbError } = await supabaseClient.from('profiles').update({ avatar_url: url }).eq('id', currentUser.id);
    if(dbError){ note.style.color = '#B23A44'; note.textContent = 'Échec de l\'enregistrement : ' + dbError.message; return; }
    currentUser.avatarUrl = url;
    renderProfilePage();
    updateAuthUI();
    note.style.color = 'var(--teal)'; note.textContent = '✓ Photo mise à jour.';
  }catch(e){ note.style.color = '#B23A44'; note.textContent = 'Erreur : ' + e.message; }
}

async function saveProfileName(){
  const newName = document.getElementById('profileName').value.trim();
  if(!newName || !currentUser) return;
  currentUser.name = newName;
  await persistCurrentUser();
  updateAuthUI();
  const msg = document.getElementById('profileSaveMsg');
  msg.style.display = 'block';
  setTimeout(() => msg.style.display = 'none', 2000);
}

async function persistCurrentUser(){
  if(!currentUser || !supabaseClient) return;
  try{
    await supabaseClient.from('profiles').update({ name: currentUser.name, level: currentUser.level }).eq('id', currentUser.id);
  }catch(e){ /* silencieux */ }
}

function updateAuthUI(){
  const initial = currentUser ? currentUser.name.trim().charAt(0).toUpperCase() : '?';
  document.querySelectorAll('.avatar').forEach(a => {
    a.title = currentUser ? currentUser.name : 'Non connecté';
    if(currentUser && currentUser.avatarUrl){
      a.textContent = '';
      a.style.backgroundImage = `url("${currentUser.avatarUrl}")`;
      a.style.backgroundSize = 'cover';
      a.style.backgroundPosition = 'center';
    } else {
      a.textContent = initial;
      a.style.backgroundImage = '';
    }
  });
  const greet = document.getElementById('dashGreeting');
  if(greet) greet.textContent = `Bonjour, ${currentUser ? currentUser.name.split(' ')[0] : 'Étudiant'} 👋`;
  document.querySelectorAll('.nav-upgrade').forEach(btn => {
    if(hasFullAccess(currentUser)){
      const until = currentUser.premiumUntil ? new Date(currentUser.premiumUntil).toLocaleDateString('fr-FR') : null;
      btn.textContent = until ? `★ Premium jusqu'au ${until}` : '★ Premium actif';
      btn.style.pointerEvents = 'none';
    } else {
      btn.textContent = (currentUser && currentUser.premium) ? '★ Abonnement expiré — renouveler' : '★ Premium';
      btn.style.pointerEvents = '';
    }
  });
}

/* Restaure la session si l'étudiant est déjà connecté (fermeture/réouverture du navigateur) */
async function restoreSession(){
  if(!supabaseClient) return;
  try{
    const { data } = await supabaseClient.auth.getSession();
    if(data.session && data.session.user){ await loadProfileAndEnter(data.session.user); }
  }catch(e){ console.error('[restoreSession]', e); }
}

const dockViews = ['connexion','niveau','accueil','dashboard','classement','paywall','labo','code','biblio','apropos','articles','chat-etudiants','metiers','admin'];
const allViews = [...dockViews, 'paiement-ok', 'domaine', 'matiere', 'chapitre', 'appareils', 'profil', 'badges', 'admin', 'articles', 'chat-etudiants', 'metiers'];
const viewLabels = {connexion:'Connexion', niveau:'Choix du niveau', accueil:'Accueil', dashboard:'Tableau de bord', classement:'Classement', paywall:'Abonnement', labo:'Labo numérique', code:'Éditeur de code', biblio:'Bibliothèque & Vidéothèque', 'paiement-ok':'Paiement confirmé', domaine:'Domaine', matiere:'Matière', chapitre:'Chapitre', apropos:'À propos', profil:'Profil'};

/* =====================================================================
   NAVIGATION & BOUTON RETOUR (téléphone / navigateur)
   La plateforme est une "single page app" : elle n'a qu'une seule page
   HTML et bascule l'affichage entre ses vues en JS. Sans intervention,
   le bouton retour du téléphone n'a donc rien à "défaire" et quitte
   directement l'app/l'onglet. On pousse ici une entrée d'historique à
   chaque changement de vue, et on écoute l'événement `popstate` (déclenché
   par le retour matériel/geste du téléphone, ou Alt+←) pour rejouer la
   vue précédente — y compris son contenu (domaine/matière/chapitre)
   quand il y en a un, pas seulement l'écran vide.

   V2 (routeur) : chaque page a une adresse (#chapitre/Physique/...). Le rafraîchissement
   reste sur la même page, « Retour » remonte sans empiler de doublons, et un onglet
   n'ajoute plus d'entrée quand on passe d'un onglet à l'autre.
   ===================================================================== */
let isRestoringHistory = false;

/* ---- Format des adresses (dans le « # » de l'URL) ------------------------------------
     #accueil   #dashboard   #labo ...                    (pages simples)
     #domaine/Physique?l=L1
     #matiere/Physique/Électrocinétique?l=L1
     #chapitre/Physique/Électrocinétique/2?l=L1
   Chaque page a donc une vraie adresse : le rafraîchissement (F5), un favori ou un lien
   partagé ramènent exactement au même endroit. */
const ESU_ROUTE_ALWAYS_OK = new Set(['accueil','niveau','apropos','paywall','classement','articles','chat-etudiants','metiers','labo','code','biblio','dashboard','profil','badges','domaine','matiere','chapitre']);
const ESU_ROUTE_NEEDS_LOGIN = new Set(['dashboard','profil','badges']);
let esuCurrentView = 'accueil';
let pendingBootRoute = null;
let esuIgnorePop = false;
const esuEnc = encodeURIComponent;
const esuDec = (s) => { try{ return decodeURIComponent(s); }catch(e){ return s; } };

function esuRouteDepth(view){
  return view === 'accueil' ? 0 : view === 'domaine' ? 1 : view === 'matiere' ? 2 : view === 'chapitre' ? 3 : 1;
}
function esuCurrentMatiereName(){
  if(!currentMatiereCtx) return null;
  const m = getMatieres(selectedLevel, currentMatiereCtx.domain)[currentMatiereCtx.index];
  return m ? m.name : null;
}
function esuRouteKey(view){
  const lv = '?l=' + esuEnc(selectedLevel);
  if(view === 'domaine' && currentDomainKtx) return 'domaine/' + esuEnc(currentDomainKtx) + lv;
  if(view === 'matiere' && currentMatiereCtx && esuCurrentMatiereName()){
    return 'matiere/' + esuEnc(currentMatiereCtx.domain) + '/' + esuEnc(esuCurrentMatiereName()) + lv;
  }
  if(view === 'chapitre' && currentChapterCtx){
    return 'chapitre/' + esuEnc(currentChapterCtx.domain) + '/' + esuEnc(currentChapterCtx.matiere) + '/' + currentChapterCtx.index + lv;
  }
  return view;
}
function esuParseRoute(hash){
  let h = String(hash || '').replace(/^#\/?/, '');
  if(!h) return null;
  let level = null;
  const q = h.indexOf('?');
  if(q >= 0){ const m = h.slice(q + 1).match(/(?:^|&)l=([^&]+)/); if(m) level = esuDec(m[1]); h = h.slice(0, q); }
  const p = h.split('/').map(esuDec);
  const view = p[0];
  if(!allViews.includes(view)) return null;
  const r = { view, level, key: null };
  if(view === 'domaine'){ if(!p[1]) return null; r.domain = p[1]; }
  else if(view === 'matiere'){ if(!p[1] || !p[2]) return null; r.domain = p[1]; r.matiere = p[2]; }
  else if(view === 'chapitre'){ if(!p[1] || !p[2] || p[3] === undefined) return null; r.domain = p[1]; r.matiere = p[2]; r.index = parseInt(p[3], 10) || 0; }
  r.key = esuRouteKeyFromRoute(r);
  return r;
}
function esuRouteKeyFromRoute(r){
  const lv = '?l=' + esuEnc(r.level || selectedLevel);
  if(r.view === 'domaine') return 'domaine/' + esuEnc(r.domain) + lv;
  if(r.view === 'matiere') return 'matiere/' + esuEnc(r.domain) + '/' + esuEnc(r.matiere) + lv;
  if(r.view === 'chapitre') return 'chapitre/' + esuEnc(r.domain) + '/' + esuEnc(r.matiere) + '/' + r.index + lv;
  return r.view;
}

/* pile de navigation (miroir de l'historique du navigateur), conservée le temps de l'onglet */
function esuLoadStack(){ try{ return JSON.parse(sessionStorage.getItem('esu-nav-stack') || '[]'); }catch(e){ return []; } }
function esuSaveStack(s){ try{ sessionStorage.setItem('esu-nav-stack', JSON.stringify(s.slice(-60))); }catch(e){} }
const esuScrollMemo = (() => { try{ return JSON.parse(sessionStorage.getItem('esu-scroll') || '{}'); }catch(e){ return {}; } })();
function esuRememberScroll(routeKey){
  if(!routeKey) return;
  esuScrollMemo[routeKey] = Math.round(window.scrollY);
  try{ sessionStorage.setItem('esu-scroll', JSON.stringify(esuScrollMemo)); }catch(e){}
}
function esuRestoreScroll(routeKey){
  const y = esuScrollMemo[routeKey];
  if(!y) return;
  [60, 250, 700].forEach(ms => setTimeout(() => window.scrollTo({ top: y, behavior: 'instant' }), ms));
}
function esuState(key, view, idx){ return { esu: true, route: key, depth: esuRouteDepth(view), idx }; }

/* Appelée par showView() à chaque changement de page. Règles :
   - même page                       -> on remplace l'entrée (pas de doublon)
   - page plus profonde              -> on empile (accueil > domaine > matière > chapitre)
   - même niveau de profondeur       -> on remplace (passer d'un onglet à l'autre n'empile rien)
   - remontée (retour à la matière, Accueil...) -> on revient à l'entrée existante avec
     history.go(-n) au lieu d'en empiler une nouvelle : plus de « boucles » de retour. */
function esuRecordNavigation(view){
  try{
    const key = esuRouteKey(view);
    const cur = (history.state && history.state.esu) ? history.state : null;
    const stack = esuLoadStack();
    if(!cur){
      stack.length = 0; stack.push(key); esuSaveStack(stack);
      history.pushState(esuState(key, view, 0), '', '#' + key);
      return;
    }
    if(key === cur.route){ history.replaceState(esuState(key, view, cur.idx), '', '#' + key); return; }
    esuRememberScroll(cur.route);
    const depth = esuRouteDepth(view);
    if(depth < cur.depth){
      for(let i = cur.idx - 1; i >= 0; i--){
        if(stack[i] === key){ esuIgnorePop = true; history.go(i - cur.idx); return; }
      }
      stack[cur.idx] = key; esuSaveStack(stack);
      history.replaceState(esuState(key, view, cur.idx), '', '#' + key);
      return;
    }
    if(depth === cur.depth){
      stack[cur.idx] = key; esuSaveStack(stack);
      history.replaceState(esuState(key, view, cur.idx), '', '#' + key);
      return;
    }
    stack.length = cur.idx + 1; stack.push(key); esuSaveStack(stack);
    history.pushState(esuState(key, view, cur.idx + 1), '', '#' + key);
  }catch(e){ console.warn('[history]', e); }
}

function esuFindMatiereIndex(domain, name, level){
  const levels = [level, selectedLevel, ...LEVEL_ORDER, 'all'].filter((v, i, a) => v && a.indexOf(v) === i);
  for(const lv of levels){
    const i = getMatieres(lv, domain).findIndex(m => m.name === name);
    if(i >= 0) return { level: lv, index: i };
  }
  return null;
}
function esuUseLevel(level){
  if(level && level !== selectedLevel && (LEVEL_ORDER.includes(level) || level === 'all')){
    selectedLevel = level; renderLevelChips(level); renderSubjects(level);
  }
}
function esuRouteAllowed(r){
  if(!r || !ESU_ROUTE_ALWAYS_OK.has(r.view)) return false;
  if(ESU_ROUTE_NEEDS_LOGIN.has(r.view) && !currentUser) return false;
  return true;
}
/* si la page affichée n'est pas celle de l'adresse (repli : chapitre verrouillé, matière inconnue...), on corrige l'adresse */
function esuSyncUrl(){
  try{
    const st = history.state;
    if(!st || !st.esu) return;
    const k = esuRouteKey(esuCurrentView);
    if(k === st.route) return;
    history.replaceState(esuState(k, esuCurrentView, st.idx), '', '#' + k);
    const stack = esuLoadStack(); stack[st.idx] = k; esuSaveStack(stack);
  }catch(e){}
}
/* Affiche la page décrite par une adresse, sans toucher à l'historique */
function esuApplyRoute(r){
  if(!esuRouteAllowed(r)){ isRestoringHistory = true; try{ showView('accueil'); } finally { isRestoringHistory = false; } return; }
  isRestoringHistory = true;
  try{
    if(r.level) esuUseLevel(r.level);
    if(r.view === 'domaine'){
      if(DOMAINS.some(d => d.key === r.domain)) openDomaine(r.domain); else showView('accueil');
    } else if(r.view === 'matiere'){
      const f = esuFindMatiereIndex(r.domain, r.matiere, r.level);
      if(f){ esuUseLevel(f.level); openMatiereDetail(r.domain, f.index); }
      else if(DOMAINS.some(d => d.key === r.domain)) openDomaine(r.domain); else showView('accueil');
    } else if(r.view === 'chapitre'){
      const f = esuFindMatiereIndex(r.domain, r.matiere, r.level);
      const exists = !!chaptersFor(r.matiere)[r.index];
      const allowed = r.index === 0 || hasFullAccess(currentUser);
      if(exists && allowed){ if(f) esuUseLevel(f.level); openChapitre(r.domain, r.matiere, r.index); }
      else if(f){ esuUseLevel(f.level); openMatiereDetail(r.domain, f.index); esuSyncUrl(); }
      else if(DOMAINS.some(d => d.key === r.domain)){ openDomaine(r.domain); esuSyncUrl(); }
      else { showView('accueil'); esuSyncUrl(); }
    } else {
      showView(r.view);
    }
  } finally { isRestoringHistory = false; }
  if(r.key) esuRestoreScroll(r.key);
}

window.addEventListener('popstate', (e) => {
  if(esuIgnorePop){ esuIgnorePop = false; return; }
  const st = e.state;
  const r = esuParseRoute((st && st.esu) ? ('#' + st.route) : location.hash) || { view: 'accueil', key: 'accueil' };
  if(!(st && st.esu) && r.view !== 'accueil') esuBuildChain(r);
  esuApplyRoute(r);
});

function esuBuildChain(fromHash){
  /* lien direct / favori : on fabrique le fil d'Ariane accueil > … > page, pour que « Retour » ait un sens */
  const lvq = '?l=' + esuEnc(fromHash.level || selectedLevel);
  const chain = [esuParseRoute('#accueil')];
  if(fromHash.view === 'matiere' || fromHash.view === 'chapitre'){
    chain.push(esuParseRoute('#domaine/' + esuEnc(fromHash.domain) + lvq));
    chain.push(esuParseRoute('#matiere/' + esuEnc(fromHash.domain) + '/' + esuEnc(fromHash.matiere) + lvq));
  }
  if(fromHash.view === 'chapitre' || fromHash.view === 'domaine' || (fromHash.view !== 'matiere')) chain.push(fromHash);
  else chain[chain.length - 1] = fromHash;
  const uniq = chain.filter((c, i) => c && (i === 0 || c.key !== chain[i - 1].key));
  const stack = [];
  try{
    uniq.forEach((c, i) => {
      stack.push(c.key);
      const s = esuState(c.key, c.view, i);
      if(i === 0) history.replaceState(s, '', '#' + c.key); else history.pushState(s, '', '#' + c.key);
    });
    esuSaveStack(stack);
  }catch(e){ console.warn('[history]', e); }
}

/* ---- Démarrage : reconstruit un historique cohérent et prépare la restauration ---- */
function esuInitRouting(){
  try{ history.scrollRestoration = 'manual'; }catch(e){}
  const fromHash = esuParseRoute(location.hash);
  const st = history.state;
  if(st && st.esu){
    /* rechargement de la page (F5) : l'historique de l'onglet est déjà le nôtre, on retourne sur la même page */
    pendingBootRoute = fromHash;
  } else if(fromHash && fromHash.view !== 'accueil'){
    esuBuildChain(fromHash);
    pendingBootRoute = fromHash;
  } else {
    try{ history.replaceState(esuState('accueil', 'accueil', 0), '', '#accueil'); esuSaveStack(['accueil']); }catch(e){}
  }
  if(pendingBootRoute && pendingBootRoute.view !== 'accueil'){
    document.documentElement.classList.add('esu-restoring');
    setTimeout(() => document.documentElement.classList.remove('esu-restoring'), 9000);   /* sécurité */
  }
}
function esuFinishBoot(){
  document.documentElement.classList.remove('esu-restoring');
}
/* Après la connexion automatique : on revient à la page où l'étudiant était (au lieu de toujours
   l'envoyer sur le tableau de bord), sinon comportement historique. */
function esuEnterAfterLogin(){
  const r = pendingBootRoute; pendingBootRoute = null;
  if(r && r.view !== 'connexion' && r.view !== 'accueil' && esuRouteAllowed(r)){ esuApplyRoute(r); esuFinishBoot(); return; }
  esuFinishBoot();
  showView(currentUser.level ? 'dashboard' : 'niveau');
}
/* Visiteur non connecté (ou session absente) : on restaure sa page tout de suite */
function esuAfterSession(){
  if(currentUser){ esuFinishBoot(); return; }
  const r = pendingBootRoute; pendingBootRoute = null;
  if(r && esuCurrentView === 'accueil') esuApplyRoute(r);
  esuFinishBoot();
}

/* on mémorise le défilement quand on quitte/rafraîchit la page, pour le retrouver au retour */
window.addEventListener('pagehide', () => { try{ if(history.state && history.state.esu) esuRememberScroll(history.state.route); }catch(e){} });
document.addEventListener('visibilitychange', () => { try{ if(document.visibilityState === 'hidden' && history.state && history.state.esu) esuRememberScroll(history.state.route); }catch(e){} });


/* =====================================================================
   LECTURE AUTOMATIQUE DES VIDÉOS DE FOND
   L'attribut HTML `autoplay` ne suffit pas ici : la plateforme n'affiche
   qu'une seule vue à la fois (les autres sont en `display:none`), et un
   <video> caché au chargement ne démarre pas tout seul quand sa vue
   redevient visible plus tard (connexion, choix du niveau...). On pilote
   donc la lecture explicitement en JS à chaque changement de vue, et on
   met en pause les vidéos qui ne sont plus visibles (économie de
   batterie/données). Toutes ces vidéos sont muettes : la lecture
   automatique est donc autorisée par tous les navigateurs.
   ===================================================================== */
/* Lecture paresseuse (performance) : une vidéo ne se télécharge et ne joue que lorsqu'elle
   est réellement visible à l'écran (IntersectionObserver). Les vidéos masquées (vue
   inactive, thème clair/sombre non affiché) ou situées bien plus bas dans la page ne
   consomment plus de données. En mode « économiseur de données », seule l'affiche
   (poster) est montrée. Les <video> du HTML n'ont plus autoplay, ils sont en preload="none". */
const videoSaveData = !!(navigator.connection && navigator.connection.saveData);
const videoObserver = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const v = entry.target;
    if(entry.isIntersecting && !videoSaveData){
      v.dataset.inView = '1';
      v.muted = true; v.playsInline = true;
      const p = v.play();
      if(p && p.catch) p.catch(() => {});
    } else {
      v.dataset.inView = '0';
      v.pause();
    }
  });
}, { rootMargin: '120px 0px' }) : null;
function observeVideo(v){
  if(v.dataset.lazyObserved) return;
  v.dataset.lazyObserved = '1';
  if(videoObserver){ videoObserver.observe(v); }
  else if(!videoSaveData){ v.muted = true; const p = v.play(); if(p && p.catch) p.catch(() => {}); }
}
function handleViewVideos(activeView){
  document.querySelectorAll('#view-' + activeView + ' video').forEach(observeVideo);
  allViews.forEach(v => {
    if(v === activeView) return;
    const container = document.getElementById('view-' + v);
    if(!container) return;
    container.querySelectorAll('video').forEach(vid => vid.pause());
  });
}
/* Filet de sécurité au tout premier chargement : dès qu'une vidéo a assez
   de données pour démarrer, on retente une lecture explicite (certains
   navigateurs ignorent silencieusement `autoplay` sur les vidéos encore
   masquées ou pas totalement chargées à ce moment-là — ex : `showView('accueil')`
   au chargement appelle déjà `.play()`, mais souvent trop tôt, avant que la
   vidéo ait assez de données ; on retente donc à chaque étape de chargement
   utile, et une dernière fois après un court délai si elle est encore en pause). */
document.querySelectorAll('video').forEach(v => {
  /* filet de sécurité : si la vidéo est visible mais ne joue pas encore quand elle a assez de données, on retente */
  v.addEventListener('canplay', () => {
    if(v.dataset.inView === '1' && v.paused){ const p = v.play(); if(p && p.catch) p.catch(() => {}); }
  });
  /* Si le fichier vidéo est introuvable/corrompu (mauvais chemin, hébergement
     cassé...), on le signale dans la console au lieu de laisser un carré vide
     silencieux : le poster reste visible, donc rien ne casse visuellement. */
  v.addEventListener('error', () => {
    const src = v.currentSrc || v.querySelector('source')?.src || '(source inconnue)';
    console.warn('[video] échec de chargement :', src, '— élément :', v);
  });
  observeVideo(v);
});

function showView(view){
  if(!isRestoringHistory){ esuRecordNavigation(view); }
  esuCurrentView = view;
  allViews.forEach(v => { document.getElementById('view-'+v).style.display = (v === view) ? 'block' : 'none'; });
  handleViewVideos(view);
  const idx = dockViews.indexOf(view);
  const indicator = document.getElementById('protoIndicator');
  indicator.style.opacity = idx > -1 ? '1' : '0';
  if(idx > -1){
    const activeBtn = document.querySelector(`.proto-nav button[data-view="${view}"]`);
    if(activeBtn){
      indicator.style.left = activeBtn.offsetLeft + 'px';
      indicator.style.top = activeBtn.offsetTop + 'px';
      indicator.style.width = activeBtn.offsetWidth + 'px';
      indicator.style.height = activeBtn.offsetHeight + 'px';
    }
  }
  document.getElementById('protoCaption').textContent = viewLabels[view] || view;
  document.querySelectorAll('.proto-nav button').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  window.scrollTo({top:0, behavior:'instant'});
  showProtoDock();
  if(view === 'dashboard'){ animateDashboard(); touchActivity(); loadRealProgress(); loadStudentAnnouncementBanner(); }
  if(view === 'chapitre'){ renderContentWatermark(); }
  if(view === 'admin'){ loadAdminSuspiciousList(); loadAdminPartnerList(); loadAdminOverviewStats(); loadAdminVisitsChart(); loadAdminUserList(); loadAdminPayments(); loadAdminCurrentAnnouncement(); loadAdminArticlesList(); }
  if(view === 'articles'){ loadArticles(); }
  if(view === 'chat-etudiants'){ loadChatRoomMessages(); subscribeChatRoomRealtime(); }
  if(view === 'metiers'){ loadCareers(); }
  if(view === 'classement'){ initClassementPage(); }
  if(view === 'chapitre'){ applyWatermark(); }
  if(view === 'paywall'){ renderPaywallStatus(); updatePaywallPriceDisplay(); loadReferralPartners(); }
  if(view === 'labo'){
    if(!currentUser){ showView('connexion'); return; }
    if(!hasFullAccess(currentUser)){ unlockPrompt('Labo numérique', 'Accès inclus dans Premium'); return; }
    const frame = document.getElementById('laboFrame');
    if(frame && frame.src === 'about:blank'){ frame.src = 'https://e-studentuniversitylabs.lovable.app'; }
  }
  if(view === 'code'){
    if(!currentUser){ showView('connexion'); return; }
    if(!hasFullAccess(currentUser)){ unlockPrompt('Éditeur de code', 'Accès inclus dans Premium'); return; }
    const frame = document.getElementById('codeFrame');
    if(frame && frame.src === 'about:blank'){ frame.src = 'https://e-studentuniversityvirtualcode.lovable.app'; }
  }
  if(view === 'biblio'){
    if(!currentUser){ showView('connexion'); return; }
    if(!hasFullAccess(currentUser)){ unlockPrompt('Bibliothèque & Vidéothèque', 'Accès inclus dans Premium'); return; }
    const frame = document.getElementById('biblioFrame');
    if(frame && frame.src === 'about:blank'){ frame.src = 'https://space-elite-learn.lovable.app'; }
  }
  if(view === 'profil'){ renderProfilePage(); }
  if(view === 'badges'){ renderBadgesPage(); }
}

/* dock flottant type barre de navigation mobile : se cache après inactivité,
   réapparaît au moindre scroll/tap/survol, ou en touchant le bord bas de l'écran */
let dockHideTimer = null;
function showProtoDock(){
  const dock = document.querySelector('.proto-dock');
  if(!dock) return;
  dock.classList.remove('dock-hidden');
  clearTimeout(dockHideTimer);
  dockHideTimer = setTimeout(() => { dock.classList.add('dock-hidden'); }, 2200);
}
function initProtoDockAutoHide(){
  showProtoDock();
  window.addEventListener('scroll', showProtoDock, {passive:true});
  window.addEventListener('touchstart', showProtoDock, {passive:true});
  window.addEventListener('touchmove', showProtoDock, {passive:true});
  window.addEventListener('mousemove', showProtoDock, {passive:true});
  window.addEventListener('click', showProtoDock);
  window.addEventListener('keydown', showProtoDock);
  initIframeDockFix();
}
document.addEventListener('DOMContentLoaded', initProtoDockAutoHide);

/* ---- correctif : le dock ne réapparaissait pas quand on interagissait DANS une iframe
   (labo, éditeur de code, bibliothèque). Une iframe est un contexte de navigation à part :
   les clics/scrolls qui s'y produisent ne remontent jamais aux écouteurs posés sur `window`
   ci-dessus, donc le dock restait caché tant qu'on ne cliquait pas hors de l'iframe.
   Astuce fiable et multiplateforme : dès qu'un clic amène le focus DANS une iframe, la
   fenêtre parente reçoit un événement 'blur' (même si l'iframe est same-origin ou non).
   On détecte ce cas, on affiche le dock, et on le maintient visible tant que le focus reste
   sur l'iframe (impossible d'observer une vraie activité à l'intérieur), en le repointant
   à intervalle régulier — plus court que le délai de masquage automatique de showProtoDock(). */
let iframeDockKeepAlive = null;
function isIframeFocused(){
  const el = document.activeElement;
  return !!el && el.tagName === 'IFRAME';
}
function initIframeDockFix(){
  window.addEventListener('blur', () => {
    /* petit délai : document.activeElement ne pointe vers l'iframe qu'une fois le focus retombé */
    setTimeout(() => {
      if(!isIframeFocused()) return;
      showProtoDock();
      clearInterval(iframeDockKeepAlive);
      iframeDockKeepAlive = setInterval(() => {
        if(isIframeFocused()){ showProtoDock(); }
        else { clearInterval(iframeDockKeepAlive); iframeDockKeepAlive = null; }
      }, 1500);
    }, 0);
  });
  window.addEventListener('focus', () => {
    if(iframeDockKeepAlive){ clearInterval(iframeDockKeepAlive); iframeDockKeepAlive = null; }
    showProtoDock();
  });
}

/* filigrane traçable — dissuasif, pas un blocage (impossible sur le web) */
function applyWatermark(){
  const layer = document.getElementById('watermarkLayer');
  if(!layer) return;
  const tag = currentUser ? `${currentUser.email} · ${new Date().toLocaleDateString('fr-FR')}` : 'invité · non connecté';
  layer.innerHTML = '';
  for(let i = 0; i < 24; i++){
    const s = document.createElement('span');
    s.textContent = tag;
    layer.appendChild(s);
  }
}

/* clic droit désactivé — dissuasion légère, ne bloque pas les captures d'écran (impossible en web) */
document.addEventListener('contextmenu', e => e.preventDefault());

/* ---- contenu par niveau universitaire ---- */
const DOMAINS = [
  {key:'Physique', symbol:'Ph', no:'01', accent:'var(--blue)'},
  {key:'Chimie', symbol:'Ch', no:'02', accent:'var(--teal)'},
  {key:'Mathématiques', symbol:'Ma', no:'03', accent:'var(--amber)'},
  {key:'Informatique', symbol:'Info', no:'04', accent:'var(--violet)'},
  {key:'Autres', symbol:'Au', no:'05', accent:'var(--sage)'}
];
const LEVEL_ORDER = ['L1','L2','L3PF','L3CF'];
const LEVEL_LABELS = {L1:'Licence 1', L2:'Licence 2', L3PF:'L3 — Physique Fondamentale', L3CF:'L3 — Chimie Fondamentale', all:'Toutes les matières'};
const DOMAIN_LEVEL_ORDER = {
  'Physique': ['L1','L2','L3PF'],
  'Chimie': ['L1','L2','L3CF'],
  'Mathématiques': ['L1','L2','L3PF','L3CF'],
  'Informatique': ['L1','L2','L3PF'],
  'Autres': ['L1','L2','L3PF','L3CF']
};
const LEVEL_DATA = {
  L1:{
    'Physique':['Mécanique du point matériel','Électrocinétique','Électromagnétisme','Optique géométrique','Mesures et normes','Instrumentations et manipulation de physique'],
    'Chimie':['Atomistique et liaisons chimiques','Thermochimie et équilibres chimiques','Chimie minérale','Chimie organique générale','Chimie organique spatiale','Instrumentations et manipulation de chimie générale','Instrumentations et manipulation de chimie minérale','Instrumentations et manipulation de chimie organique'],
    'Mathématiques':['Fonction d\'une variable réelle','Intégrales et équations différentielles','Outils mathématiques pour la physique','Algèbre'],
    'Informatique':['Outils informatiques et analyse de données'],
    'Autres':['Technique d\'expression écrite et orale','Sécurité et environnement','Anglais scientifique']
  },
  L2:{
    'Physique':['Mécanique générale','Thermodynamique','Optique physique','Électronique','Ondes électromagnétiques et relativité restreinte','Introduction à la mécanique quantique'],
    'Chimie':['Chimie des solutions','Chimie des matériaux inorganiques','Chimie organique descriptive','Cinétique chimique','Fonctions organiques mixtes et mécanismes réactionnels','Chimie des polymères','Chimie de coordination','Introduction aux terres rares'],
    'Mathématiques':['Convergence et fonctions de plusieurs variables','Probabilité et statistique'],
    'Informatique':['Introduction à la programmation'],
    'Autres':['Histoire des sciences physiques']
  },
  L3PF:{
    'Physique':['Mécanique analytique','Mécanique des fluides','Mécanique quantique non relativiste','Ondes et vibrations','Mécanique des solides déformables','Propriétés de la matière condensée','Thermodynamique macroscopique','Physique statistique'],
    'Chimie':['Introduction à la chimie quantique','Spectroscopie'],
    'Mathématiques':['Méthodes mathématiques pour la physique','Méthodes numériques'],
    'Informatique':['Physique numérique'],
    'Autres':['Anglais scientifique','Planification et gestion']
  },
  L3CF:{
    'Chimie':['Introduction à la chimie quantique','Cristallochimie — radiocristallographie','Synthèse organique','Spectroscopie organique','Chimie numérique','Spectroscopie','Chimie des substances naturelles','Chimie analytique','Métallurgie et transitions de phases','Dynamique moléculaire','Méthodes chromatographiques','Thermodynamique chimique','Électrochimie'],
    'Mathématiques':['Théorie des groupes'],
    'Autres':['Anglais scientifique','Législation et droit du travail','Technique de rédaction de rapport','Planification et gestion']
  }
};

function getMatieres(level, domainKey){
  if(level === 'all'){
    const order = DOMAIN_LEVEL_ORDER[domainKey] || LEVEL_ORDER;
    const items = [];
    order.forEach(lv => {
      const list = LEVEL_DATA[lv] && LEVEL_DATA[lv][domainKey];
      if(list && list.length){
        list.forEach(name => items.push({ name, lv }));
      }
    });
    return items.map((it, i) => ({ name: it.name, lv: it.lv, free: i === 0 }));
  }
  const list = (LEVEL_DATA[level] && LEVEL_DATA[level][domainKey]) || [];
  return list.map((name, i) => ({ name, lv:null, free: i === 0 }));
}

/* Registre complet des chapitres réels pour toutes les matières du programme (L1 à L3),
   avec le contenu pédagogique complet rédigé pour chacune. */
const REAL_CHAPTERS = {
  'Outils mathématiques pour la physique': ['Différentielles et calcul d\'incertitudes','Calcul vectoriel et systèmes de coordonnées','Opérateurs différentiels et théorèmes intégraux','Nombres complexes','Équations différentielles','Notion de torseurs'],
  'Technique d\'expression écrite et orale': ['Rédiger un texte explicatif','Argumenter','Prendre la parole / Gérer une conversation','Produire un texte technique : le compte-rendu','Produire un texte technique : le résumé','Produire un texte technique : l\'exposé'],
  'Anglais scientifique': ['Lecture rapide et compréhension de texte technique','Les parties du discours (Parts of Speech)','Types de phrases et concordance sujet-verbe (Concord)','Les temps verbaux en anglais scientifique (Tenses)','La voix passive en anglais technique (Passive Voice)','Rédaction professionnelle : lettre de candidature et CV','Communication professionnelle : lettres formelles et prise de parole'],
  'Thermochimie et équilibres chimiques': ['Systèmes, transformations et travail thermodynamique','Premier principe et thermochimie','Deuxième principe : entropie et enthalpie libre','Réactions chimiques : oxydoréduction et équilibrage','Équilibres chimiques et loi d\'action de masse','Équilibres ioniques, pH et solubilité','Expression des concentrations et dosages','Méthodologie — exercices type examen'],
  'Algèbre': ['Calcul matriciel et déterminants','Structures algébriques : Groupe-Anneau-Corps','Espaces vectoriels','Applications linéaires','Réduction d\'endomorphismes et de matrices'],
  'Introduction à la programmation': ['Qu\'est-ce qu\'un algorithme ?','Les structures conditionnelles','Les structures répétitives','Les tableaux','Fonctions et procédures'],
  'Chimie organique générale': ['Généralités et nomenclature des molécules organiques','Effets électroniques, réactivité et solvants','Isomérie et stéréochimie','Alcanes, alcènes et alcynes','Hydrocarbures aromatiques','Dérivés halogénés et substitution nucléophile (SN1/SN2)','Réactions d\'élimination (E1/E2) et compétition SN/E','Alcools, éthers et époxydes','Composés carbonylés : aldéhydes et cétones','Acides carboxyliques et dérivés d\'acides','Amines et composés azotés'],
  'Chimie organique descriptive': ['Nomenclature des hydrocarbures : alcanes, alcènes, alcynes et composés aromatiques','Nomenclature des fonctions organiques : halogénés, alcools, éthers, amines, carbonylés, acides et dérivés','Isomérie et stéréoisomérie','Effets électroniques dans la molécule : effet inductif et effet mésomère','Étude des mécanismes réactionnels : substitution, addition, élimination'],
  'Intégrales et équations différentielles': ['Primitives et intégrale indéfinie','Intégration des fonctions trigonométriques','Intégration des fractions rationnelles','Intégrales avec radicaux','Équations différentielles du premier ordre','Équations différentielles du second ordre à coefficients constants'],
  'Chimie minérale': ['Structure de l\'atome et notions fondamentales','Structure électronique et tableau périodique','Chimie de l\'hydrogène','Chimie de l\'oxygène','Les halogènes','Le soufre','L\'azote et le phosphore','Applications industrielles et exercices de synthèse'],
  'Chimie des matériaux inorganiques': ['Introduction aux matériaux inorganiques : classification, liaisons et propriétés','L\'état cristallin : réseaux de Bravais, mailles et systèmes cristallins','Structures cristallines des solides inorganiques et diffraction des rayons X','Défauts cristallins, non-stœchiométrie et solutions solides','Diagrammes de phases et transformations à l\'état solide','Céramiques techniques et matériaux réfractaires','Verres et matériaux amorphes','Matériaux fonctionnels : semi-conducteurs, magnétiques et supraconducteurs'],
  'Chimie des polymères': ['Macromolécules : définitions, types et polymolécularité','La chaîne polymère : structure, stéréochimie et propriétés','Synthèse des polymères : polymérisation, polyaddition et polycondensation','Mécanismes de polymérisation en chaîne et télomérisation'],
  'Fonctions organiques mixtes et mécanismes réactionnels': ['Mécanismes réactionnels : substitutions nucléophiles et β-éliminations','Additions nucléophiles sur les composés carbonylés','Substitution nucléophile sur le carbone acyle : chimie des dérivés d\'acides','Substitution électrophile aromatique (SEAr)','Oxydoréduction et interconversion des fonctions organiques'],
  'Chimie des solutions': ['Généralités sur les solutions aqueuses','Réactions acido-basiques : définitions et constantes','Calculs de pH en solution aqueuse','Titrages acido-basiques','Réactions de complexation','Réactions de précipitation','Réactions d\'oxydoréduction en solution'],
  'Introduction aux terres rares': ['Qu\'est-ce qu\'une terre rare ? Définition, histoire et position dans le tableau périodique','Structure électronique des lanthanides et contraction lanthanidique','Minéralogie et gisements des terres rares','Extraction et séparation des terres rares : de la mine à l\'oxyde pur','Propriétés physico-chimiques et chimie de coordination des lanthanides','Propriétés magnétiques et optiques : magnétisme et luminescence','Applications industrielles et technologiques des terres rares','Enjeux géopolitiques, économiques et environnementaux'],
  'Mécanique du point matériel': ['Outils mathématiques : vecteurs et systèmes de coordonnées','Cinématique du point','Dynamique du point matériel','Moment cinétique et théorèmes généraux','Travail, puissance et énergie','Mouvements particuliers'],
  'Électrocinétique': ['Lois fondamentales des circuits électriques','Dipôles, associations et théorèmes généraux','Régime transitoire : circuits RC et RL','Régime sinusoïdal permanent','Puissance en régime stationnaire','Circuit RLC série : régime transitoire','Puissance en régime sinusoïdal forcé','Filtres du premier ordre','Filtres du second ordre'],
  'Thermodynamique': ['Description des systèmes thermodynamiques : variables d\'état et équilibre','Le gaz parfait et la théorie cinétique des gaz','Premier principe de la thermodynamique','Deuxième principe : entropie et évolutions irréversibles','Machines thermiques : cycles, moteurs et réfrigérateurs','Potentiels thermodynamiques : enthalpie, énergie libre, enthalpie libre','Changements d\'état des corps purs et diagrammes de phases','Transferts thermiques : conduction, convection, rayonnement'],
  'Chimie de coordination': ['Généralités sur les complexes de coordination','Nomenclature des complexes','Isomérie des complexes de coordination','Théorie du champ cristallin — champ octaédrique','Champ cristallin — environnements tétraédrique et plan-carré','Série spectrochimique et couleur des complexes','Énergie de stabilisation du champ cristallin (ESCC)','Magnétisme des complexes et degré d\'oxydation','Théorie du champ des ligands (approche orbitalaire)','Méthodologie — exercices type examen'],
  'Sécurité et environnement': ['Hygiène, sécurité et environnement : concepts et structure HSE','Accidents de travail : danger, risque et enquête','Phénomènes d\'incendie et d\'explosion','Gestion des risques chimiques'],
  'Ondes électromagnétiques et relativité restreinte': ['Mécanique classique et ses limites','Bases de la relativité restreinte','Cinématique relativiste','Espace-temps et quadrivecteurs','Propagation des ondes et relativité','Dynamique relativiste','Électromagnétisme relativiste'],
  'Introduction à la mécanique quantique': ['La crise de la physique classique : vers la mécanique quantique','Dualité onde-corpuscule, longueur d\'onde de De Broglie et principe d\'incertitude','La fonction d\'onde et l\'équation de Schrödinger','Particule dans un puits de potentiel infini','Effet tunnel et franchissement d\'une barrière de potentiel','Opérateurs, observables et postulats de la mesure','L\'oscillateur harmonique quantique','L\'atome d\'hydrogène et le spin de l\'électron'],
  'Introduction à la chimie quantique': ['Postulats de la mécanique quantique et opérateurs en chimie','L\'atome d\'hydrogène : orbitales atomiques et nombres quantiques','Atomes polyélectroniques : approximation orbitale et règles de Slater','Méthode des perturbations : application à l\'atome d\'hélium','L\'ion moléculaire H₂⁺ et la théorie des orbitales moléculaires (LCAO)','Molécules diatomiques : diagrammes d\'orbitales moléculaires','La méthode de Hückel et les systèmes π conjugués','Symétrie moléculaire et éléments de théorie des groupes'],
  'Électromagnétisme': ['Introduction : forces fondamentales, champs et force de Lorentz','Systèmes de coordonnées et calcul vectoriel','Flux d\'un champ vectoriel, loi de Gauss et divergence','Potentiel électrostatique, travail et gradient','Distributions de charges, énergie électrostatique et rotationnel','Conducteurs à l\'équilibre et rigidité diélectrique','Courants électriques, conservation de la charge et loi d\'Ohm','Magnétostatique : loi de Biot-Savart, force de Laplace et loi d\'Ampère','Opérateur nabla et théorèmes intégraux','Induction électromagnétique : loi de Faraday et inductance','Équations de Maxwell et équation de propagation des ondes','Ondes électromagnétiques planes progressives monochromatiques','Énergie électromagnétique et vecteur de Poynting','Propagation dans les milieux matériels : diélectriques et conducteurs','Réflexion et réfraction des ondes électromagnétiques aux interfaces'],
  'Optique géométrique': ['Notions fondamentales sur la lumière','Miroir plan : réflexion et formation des images','Dioptre plan : réfraction et réflexion totale','Le prisme optique','Miroir sphérique','Dioptre sphérique','Lentilles minces','L\'œil : modèle réduit et défauts de la vision'],
  'Optique physique': ['Bases de l\'optique ondulatoire : OPPM et détection de la lumière','Interférences à deux ondes : cohérence et interféromètre de Michelson','Interférences à ondes multiples : réseaux et spectroscopie','Diffraction : fente, ouverture circulaire et limite de résolution'],
  'Électronique': ['Physique des semi-conducteurs : du cristal de silicium à la jonction PN','La diode à jonction : caractéristique, modèles et types particuliers','Applications de la diode : redressement, filtrage et régulation de tension','Le transistor bipolaire : structure, régimes de fonctionnement et polarisation','Le transistor bipolaire en amplification : modèle petits signaux et montages fondamentaux','Le transistor à effet de champ : JFET et MOSFET','L\'amplificateur opérationnel : modèle idéal et montages linéaires fondamentaux','Montages non linéaires, filtres actifs et introduction à l\'électronique numérique','Les quadripôles : représentations matricielles et association','Filtres actifs d\'ordre supérieur, diagrammes de Bode et gabarits'],
  'Atomistique et liaisons chimiques': ['Structure de l\'atome : noyau, électron et identification des éléments','Le modèle de Bohr et la quantification de l\'énergie','Nombres quantiques et description des orbitales atomiques','Configuration électronique des atomes : règles de remplissage','Classification périodique des éléments et propriétés périodiques','Liaisons chimiques fortes : covalente, ionique et dative','Liaisons intermoléculaires et moment dipolaire','Théorie VSEPR et géométrie des molécules','Hybridation des orbitales atomiques','Mésomérie et effets électroniques'],
  'Cinétique chimique': ['Généralités, définitions et vitesse de réaction','Réactions simples d\'ordre 0, 1 et 2','Réactions d\'ordre n et méthodes de détermination de l\'ordre','Cinétique formelle des réactions composées','Cinétique des réactions complexes et mécanismes en chaîne','Influence de la température : loi d\'Arrhenius et théories cinétiques','Catalyse et cinétique chimique hétérogène','Méthodologie — exercices type examen'],
  'Fonction d\'une variable réelle': ['Limites et continuité','Dérivabilité','Étude de fonctions','Développements limités'],
  'Outils informatiques et analyse de données': ['Apprentissage de Word','Apprentissage d\'Excel','Apprentissage de PowerPoint','Concepts fondamentaux de la statistique descriptive','Organisation et représentation des séries à une variable','Caractéristiques de tendance centrale','Caractéristiques de dispersion et de position','Caractéristiques de forme et transformation des données','Séries statistiques à deux variables','Corrélation, régression et corrélation de rang'],
  'Probabilité et statistique': ['Variables aléatoires discrètes','Variables aléatoires absolument continues et cadre probabiliste général','Théorèmes limites : loi des grands nombres et théorème central limite','Vecteurs gaussiens','Estimation paramétrique','Tests d\'hypothèses'],
  'Convergence et fonctions de plusieurs variables': ['Séries numériques','Suites et séries de fonctions','Séries entières','Séries de Fourier','Espaces vectoriels normés','Calcul différentiel','Formes différentielles et intégrales multiples'],
  'Mécanique générale': ['Cinématique du solide indéformable','Éléments cinétiques : centre de masse, quantité de mouvement et moment cinétique','Moments et produits d\'inertie d\'un solide','Théorèmes généraux de la dynamique et rotation autour d\'un axe fixe','Théorème de König et théorème de l\'énergie cinétique','Chocs et collisions','Statique du solide et liaisons mécaniques','Référentiels non galiléens et forces d\'inertie'],
  'Histoire des sciences physiques': ['La physique dans l\'Antiquité et le Moyen Âge : des Grecs au monde islamique','La révolution scientifique du XVIIe siècle : de Copernic à Newton','Le siècle des Lumières et la consolidation de la physique classique','Le XIXe siècle : énergie, thermodynamique et électromagnétisme','La révolution de la physique moderne : relativité et quanta (1900-1930)','La physique contemporaine : du noyau atomique à l\'Univers'],
  'Synthèse organique': ['Analyse rétrosynthétique : stratégies et méthodologie','Groupes protecteurs en synthèse organique','Formation de liaisons C-C par les réactifs organométalliques','Chimie des énolates : alkylation et réactions de condensation','Oléfination : Wittig, HWE et méthodes apparentées','Oxydations et réductions sélectives en synthèse','Cycloadditions et réarrangements sigmatropiques','Couplages pallado-catalysés et catalyse par les métaux de transition','Stéréochimie et synthèse asymétrique','Stratégie de synthèse totale : méthodologie et études de cas'],
  'Cristallochimie — radiocristallographie': ['L\'état cristallin : ordre, réseau et maille élémentaire','Symétrie cristalline : éléments, opérations et réseaux de Bravais','Groupes ponctuels, groupes d\'espace et notation internationale','Plans réticulaires, indices de Miller et distances interréticulaires','Production, spectre et absorption des rayons X','Diffraction des rayons X : loi de Bragg et conditions de diffraction','Facteur de structure, intensités diffractées et extinctions systématiques','Méthodes expérimentales de radiocristallographie : Laue, poudre, monocristal','Résolution et affinement des structures cristallines','Cristallochimie des solides inorganiques : empilements compacts et sites interstitiels'],
  'Spectroscopie organique': ['Spectroscopie UV-visible : transitions électroniques et chromophores','Spectroscopie infrarouge : vibrations moléculaires et groupes caractéristiques','Principes de la RMN : déplacement chimique en RMN du proton','Couplage spin-spin et analyse des spectres de RMN du proton','RMN du carbone-13 et techniques d\'édition spectrale (DEPT)','Spectrométrie de masse : principes, ionisation et détermination de la formule brute','Fragmentation en spectrométrie de masse : mécanismes et réarrangements','Élucidation structurale par couplage des méthodes spectroscopiques'],
  'Théorie des groupes': ['Structure de groupe : axiomes et premiers exemples','Sous-groupes, classes et groupes cycliques','Groupes de symétrie moléculaire','Tables de caractères et représentations irréductibles','Réduction d\'une représentation réductible','Produits directs de groupes et de représentations','Applications : orbitales moléculaires et modes de vibration','Applications en spectroscopie : règles de sélection par symétrie'],
  'Technique de rédaction de rapport': ['Le rapport scientifique : finalités, types et destinataires','La structure IMRaD : architecture d\'un rapport scientifique','Rédiger l\'introduction et poser la problématique','Présenter les résultats : tableaux, figures et légendes','Rédiger la discussion et la conclusion','Références bibliographiques et normes de citation','Le style scientifique : clarté, précision et objectivité','Le rapport de stage et la soutenance orale'],
  'Législation et droit du travail': ['Sources et cadre du droit du travail béninois','Le contrat de travail : CDI, CDD et période d\'essai','Durée du travail, repos et congés payés','Rémunération : SMIG, bulletin de paie et cotisations sociales','Hygiène, sécurité et médecine du travail','Cessation de la relation de travail : démission, licenciement et indemnités','Représentation collective : délégués du personnel et conventions collectives','Protection sociale et règlement des litiges du travail'],
  'Planification et gestion': ['Le projet et son cycle de vie : définir, cadrer, planifier, exécuter, clôturer','Structuration du projet : objectifs SMART et structure de découpage (WBS)','Ordonnancement des tâches : réseau PERT et méthode du chemin critique','Le diagramme de Gantt : planification visuelle et suivi d\'avancement','Estimation des durées et gestion des ressources','Gestion budgétaire et valeur acquise (Earned Value Management)','Gestion des risques du projet','Pilotage, communication et clôture d\'un projet scientifique'],
  'Physique numérique': ['Représentation des nombres et erreurs numériques','Résolution numérique d\'équations non linéaires','Intégration numérique','Résolution numérique des équations différentielles ordinaires','Algèbre linéaire numérique','Interpolation et ajustement de données','Méthode de Monte Carlo','Transformée de Fourier discrète et applications'],
  'Spectroscopie': ['Interaction rayonnement-matière et spectroscopie atomique','Spectroscopie rotationnelle : le rotateur rigide','Spectroscopie vibrationnelle : l\'oscillateur harmonique et anharmonique','Spectroscopie vibration-rotation des molécules diatomiques','Spectroscopie électronique moléculaire et principe de Franck-Condon','Spectroscopie Raman','Principes physiques du laser et applications spectroscopiques'],
  'Méthodes numériques': ['Erreurs, conditionnement et stabilité numérique','Résolution d\'équations non linéaires : convergence et ordre','Interpolation polynomiale : Lagrange, Newton et phénomène de Runge','Intégration numérique : formules de Newton-Cotes et quadrature de Gauss','Systèmes linéaires : méthodes directes (LU, Cholesky) et conditionnement','Systèmes linéaires : méthodes itératives (Jacobi, Gauss-Seidel)','Équations différentielles : consistance, stabilité et convergence','Problèmes aux valeurs propres : méthode de la puissance et algorithme QR'],
  'Méthodes mathématiques pour la physique': ['Opérateurs différentiels et analyse vectorielle en coordonnées curvilignes','Séries de Fourier et transformée de Fourier','Fonctions d\'une variable complexe : holomorphie et séries','Théorème des résidus et calcul d\'intégrales','Équations différentielles linéaires : résolution par séries entières','Fonctions spéciales : polynômes de Legendre et fonctions de Bessel','Équations aux dérivées partielles de la physique : séparation des variables','Distributions, fonction delta de Dirac et fonctions de Green'],
  'Mécanique analytique': ['Principe de moindre action et calcul des variations','Formalisme lagrangien : coordonnées généralisées et équations d\'Euler-Lagrange','Symétries et lois de conservation : théorème de Noether','Petites oscillations autour d\'un équilibre : modes normaux','Formalisme hamiltonien : transformation de Legendre et équations canoniques','Crochets de Poisson et structure de l\'espace des phases','Transformations canoniques et équation de Hamilton-Jacobi','Problème à force centrale et mouvement képlérien'],
  'Mécanique des fluides': ['Statique des fluides : pression et théorème fondamental de l\'hydrostatique','Cinématique des fluides : descriptions eulérienne et lagrangienne','Bilan de masse et équation de continuité','Dynamique des fluides parfaits : équation d\'Euler','Théorème de Bernoulli et applications','Viscosité et fluides newtoniens : équations de Navier-Stokes','Écoulements visqueux exacts : Couette et Poiseuille','Analyse dimensionnelle, similitude et nombre de Reynolds','Écoulements potentiels, vorticité et notion de couche limite'],
  'Mécanique quantique non relativiste': ['Formalisme de Dirac : espace des états, bras, kets et opérateurs','Les postulats de la mécanique quantique','L\'oscillateur harmonique quantique : méthode algébrique','Théorie générale du moment cinétique','Moment cinétique orbital et harmoniques sphériques','Le spin 1/2 et l\'addition de moments cinétiques','L\'atome d\'hydrogène : potentiel central et quantification','Théorie des perturbations stationnaires','Méthode variationnelle et perturbations dépendantes du temps'],
  'Ondes et vibrations': ['De la chaîne d\'oscillateurs couplés au milieu continu','L\'équation de d\'Alembert et les ondes progressives','Ondes planes progressives sinusoïdales et vitesse de phase','La corde vibrante : équation, conditions aux limites et modes propres','Ondes stationnaires et analyse de Fourier','Énergie, puissance et impédance d\'une onde','Réflexion et transmission à une discontinuité','Ondes acoustiques dans les fluides','Dispersion, vitesse de groupe et paquets d\'ondes'],
  'Mesures et normes': ['Grandeurs physiques et système international d\'unités (SI)','Analyse dimensionnelle','Chiffres significatifs et notation scientifique','Incertitudes de mesure : évaluation de type A et de type B','Propagation des incertitudes','Étalonnage, justesse, fidélité et normes métrologiques'],
  'Instrumentations et manipulation de physique': ['Méthodologie expérimentale et sécurité au laboratoire','Instruments de mesure électriques : multimètre et oscilloscope','Instruments de mesure mécaniques et optiques','Acquisition et traitement des données expérimentales','Régression linéaire et exploitation graphique des mesures','Rédaction d\'un compte-rendu de travaux pratiques'],
  'Mécanique des solides déformables': ['Milieu continu déformable : configuration et champ de déplacement','Le tenseur des déformations : dilatations et distorsions','Le tenseur des contraintes et les équations d\'équilibre','Loi de comportement élastique : loi de Hooke généralisée','Élasticité isotrope : coefficients de Lamé, module d\'Young et coefficient de Poisson','Théorie des poutres : flexion et modèle d\'Euler-Bernoulli','Torsion des poutres cylindriques','Énergie de déformation élastique et critères de rupture'],
  'Chimie organique spatiale': ['Représentations spatiales des molécules : Cram, Newman et Fischer','Chiralité et énantiomérie : configuration R/S','Molécules à plusieurs centres stéréogènes : diastéréoisomères et composés méso','Activité optique et pouvoir rotatoire','Analyse conformationnelle des molécules acycliques : éthane et butane','Conformations du cyclohexane et de ses dérivés substitués','Stéréochimie des alcènes : isomérie Z/E','Stéréochimie et réactivité : introduction à la stéréospécificité'],
  'Instrumentations et manipulation de chimie générale': ['Sécurité au laboratoire et verrerie de base','Pesée et préparation de solutions : dilution et concentration','Mesure du pH et pH-métrie','Titrage acido-basique : principe et mise en œuvre','Filtration et techniques de séparation','Cristallisation et recristallisation','Distillation simple et distillation fractionnée','Spectrophotométrie UV-Visible : principe et dosage'],
  'Instrumentations et manipulation de chimie minérale': ['Synthèse de composés inorganiques : principes généraux','Analyse qualitative : identification des cations et anions','Gravimétrie : dosage par précipitation et pesée','Titrages redox : principe et mise en œuvre','Titrages complexométriques : dosage par l\'EDTA','Conductimétrie et son application aux titrages','Potentiométrie et mesures électrochimiques','Synthèse et caractérisation de complexes de coordination'],
  'Instrumentations et manipulation de chimie organique': ['Montages expérimentaux : chauffage à reflux et agitation','Extraction liquide-liquide et ampoule à décanter','Chromatographie sur couche mince (CCM)','Chromatographie sur colonne','Recristallisation et détermination du point de fusion','Distillation des composés organiques : simple, fractionnée et sous vide','Séchage et purification des produits organiques','Caractérisation par spectroscopie infrarouge au laboratoire'],
  'Thermodynamique macroscopique': ['Équilibre thermodynamique, variables d\'état et transformations','Premier principe : énergie interne et enthalpie','Second principe : entropie et sens d\'évolution','Identité thermodynamique et potentiels thermodynamiques','Relations de Maxwell et coefficients thermoélastiques','Conditions d\'équilibre et de stabilité thermodynamique','Changement d\'état des corps purs et diagrammes de phase','Systèmes ouverts : potentiel chimique et équilibre de phases'],
  'Propriétés de la matière condensée': ['Structure cristalline : réseau de Bravais et maille élémentaire','Liaisons dans les solides et énergie de cohésion','Diffraction des rayons X et loi de Bragg','Vibrations du réseau : phonons et capacité thermique des solides','Électrons dans les solides : électron libre et bandes d\'énergie','Semi-conducteurs et propriétés de transport'],
  'Physique statistique': ['Description statistique : microétats, macroétats et postulat fondamental','Ensemble microcanonique et entropie statistique de Boltzmann','Ensemble canonique et fonction de partition','Distribution de Boltzmann et gaz parfait classique','Statistiques quantiques : bosons et fermions','Applications : rayonnement du corps noir et gaz de Fermi'],
  'Thermodynamique chimique': ['Grandeurs standard de réaction','Enthalpie libre de réaction et affinité chimique','Constante d\'équilibre et loi d\'action de masse','Déplacements d\'équilibre : loi de Le Chatelier','Diagrammes binaires liquide-vapeur','Diagrammes binaires liquide-solide et eutectiques'],
  'Électrochimie': ['Couples redox et potentiel d\'électrode','Équation de Nernst et diagrammes potentiel-pH','Piles électrochimiques et force électromotrice','Électrolyse et lois de Faraday','Courbes intensité-potentiel et cinétique électrochimique','Corrosion et protection des métaux'],
  'Chimie numérique': ['De la chimie quantique au calcul numérique','La méthode de Hartree-Fock et le champ moyen','Bases d\'orbitales atomiques','La théorie de la fonctionnelle de la densité (DFT)','Optimisation de géométrie et surfaces d\'énergie potentielle','Applications : spectres calculés et thermochimie computationnelle'],
  'Chimie analytique': ['Validation d\'une méthode analytique','Dosages acido-basiques et courbes de titrage','Dosages redox et complexométriques','Méthodes spectrophotométriques quantitatives','Électrodes spécifiques et potentiométrie','Incertitudes et traitement statistique des données analytiques'],
  'Métallurgie et transitions de phases': ['De l\'élaboration des métaux aux alliages','Diagrammes binaires solide-solide : solutions solides et composés définis','Transformations allotropiques et transformation martensitique','Traitements thermiques des alliages','Diffusion à l\'état solide','Essais mécaniques et relation structure-propriétés'],
  'Dynamique moléculaire': ['Principe de la simulation de dynamique moléculaire','Champs de force et potentiels d\'interaction','Intégration numérique des équations du mouvement','Contrôle de la température et de la pression : thermostats et barostats','Calcul de grandeurs structurales et thermodynamiques','Applications et limites de la dynamique moléculaire'],
  'Méthodes chromatographiques': ['Principe de la séparation chromatographique','Théorie des plateaux et efficacité d\'une colonne','Chromatographie en phase gazeuse (CPG)','Chromatographie liquide haute performance (HPLC)','Couplage chromatographie-spectrométrie de masse','Validation et optimisation d\'une séparation chromatographique'],
  'Chimie des substances naturelles': ['Classification et biosynthèse des métabolites secondaires','Terpènes et terpénoïdes','Alcaloïdes','Flavonoïdes et polyphénols','Stéroïdes et triterpènes','Méthodes d\'extraction et d\'identification des substances naturelles'],
};
function chaptersFor(matiereName){
  return REAL_CHAPTERS[matiereName] || [`Introduction — ${matiereName}`, 'Approfondissement et méthodes', 'Applications et exercices type examen'];
}

function renderSubjects(level){
  const grid = document.getElementById('subjectsGrid');
  grid.innerHTML = '';
  DOMAINS.forEach(d => {
    const matieres = getMatieres(level, d.key);
    if(matieres.length === 0) return;
    const first = matieres[0];
    const matiereNames = matieres.map(m => m.name).join(' | ');
    grid.insertAdjacentHTML('beforeend', `
      <div class="element-card reveal in" data-name="${d.key}" data-chapters="${matiereNames.replace(/"/g,'&quot;')}" style="--accent:${d.accent};" onclick="openDomaine('${d.key}')">
        <div class="tag">
          <div><div class="atomic-no">${d.no}</div><div class="symbol" translate="no">${d.symbol}</div></div>
          <span class="eyebrow">${d.key}</span>
        </div>
        <p class="chap-count">${matieres.length} matière${matieres.length > 1 ? 's' : ''} · 1ère gratuite</p>
        <div class="chap-row" style="border-top:none; padding-top:0;">
          <span>${first.name}</span>
          <span class="free-tag">gratuit</span>
        </div>
      </div>`);
  });
  filterSubjects();
}

/* niveau 1 : domaine → liste des matières (toutes accessibles, le verrou est au niveau chapitre) */
let currentDomainKtx = null;
/* le symbole (Ph, Ch, Ma, Info...) n'est pas une phrase : on interdit la traduction automatique du navigateur
   (Chrome traduisait « In » en « Dans ») et on réduit la police s'il a plus de 2 lettres */
function fitSymbol(el){
  if(!el) return;
  el.setAttribute('translate', 'no');
  el.style.fontSize = el.textContent.length > 2 ? '0.74em' : '';
}
function openDomaine(domainKey){
  currentDomainKtx = domainKey;
  const dom = DOMAINS.find(d => d.key === domainKey);
  const matieres = getMatieres(selectedLevel, domainKey);
  document.getElementById('domaineSymbol').textContent = dom.symbol; fitSymbol(document.getElementById('domaineSymbol'));
  document.getElementById('domaineSymbol').style.background = dom.accent;
  document.getElementById('domaineTitle').textContent = dom.key;
  document.getElementById('domaineLevelTag').textContent = LEVEL_LABELS[selectedLevel] || selectedLevel;
  document.getElementById('domaineBreadcrumb').innerHTML = `Domaines / <b>${dom.key}</b>`;
  const list = document.getElementById('domaineMatiereList');
  list.innerHTML = matieres.map((m, i) => `
    <div class="chapter-item" style="cursor:pointer;" onclick="openMatiereDetail('${domainKey}', ${i})">
      <div class="left"><span class="idx">${String(i+1).padStart(2,'0')}</span><span>${m.name}${m.lv ? ` <span class="lv-badge">${m.lv}</span>` : ''}</span></div>
      <span class="status-todo">${chaptersFor(m.name).length} chapitres</span>
    </div>`).join('');
  showView('domaine');
}

/* niveau 2 : matière → liste des chapitres (1er gratuit, le reste verrouillé) */
let currentMatiereCtx = null;
function openMatiereDetail(domainKey, matiereIndex){
  currentMatiereCtx = { domain: domainKey, index: matiereIndex };
  const dom = DOMAINS.find(d => d.key === domainKey);
  const matieres = getMatieres(selectedLevel, domainKey);
  const mat = matieres[matiereIndex];
  const chapters = chaptersFor(mat.name);
  document.getElementById('matiereSymbol').textContent = dom.symbol; fitSymbol(document.getElementById('matiereSymbol'));
  document.getElementById('matiereSymbol').style.background = dom.accent;
  document.getElementById('matiereTitle').textContent = mat.name;
  document.getElementById('matiereLevelTag').textContent = `${LEVEL_LABELS[selectedLevel] || selectedLevel} · ${dom.key}`;
  document.getElementById('matiereBreadcrumb').innerHTML = `${dom.key} / <b>${mat.name}</b>`;
  document.getElementById('matiereBackLink').onclick = () => { openDomaine(domainKey); return false; };
  const list = document.getElementById('matiereChapterList');
  list.innerHTML = chapters.map((ch, i) => {
    const free = i === 0 || hasFullAccess(currentUser);
    return `
    <div class="chapter-item ${free ? '' : 'locked'}" style="cursor:pointer;" onclick="${free ? `openChapitre('${domainKey}','${mat.name.replace(/'/g,"\\'")}',${i})` : `unlockPrompt('${ch.replace(/'/g,"\\'")}','${mat.name.replace(/'/g,"\\'")}')`}">
      <div class="left"><span class="idx">${String(i+1).padStart(2,'0')}</span><span>${ch}</span></div>
      ${free ? '<span class="status-todo">gratuit</span>' : '<span class="status-locked">verrouillé</span>'}
    </div>`;
  }).join('');
  showView('matiere');
  warmChunkFor(domainKey, mat.name);
}

function renderLevelChips(active){
  const chips = document.getElementById('levelChips');
  chips.innerHTML = '';
  [...LEVEL_ORDER, 'all'].forEach(lv => {
    const b = document.createElement('button');
    b.textContent = LEVEL_LABELS[lv];
    if(lv === active) b.classList.add('active');
    b.onclick = () => { selectedLevel = lv; renderLevelChips(lv); renderSubjects(lv); };
    chips.appendChild(b);
  });
}

/* choix du niveau universitaire */
let selectedLevel = 'L1';
function selectLevel(card){
  document.querySelectorAll('.level-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  selectedLevel = card.dataset.level;
  document.getElementById('continueLevelBtn').disabled = false;
}
function confirmLevel(){
  if(currentUser){ currentUser.level = selectedLevel; persistCurrentUser(); }
  renderLevelChips(selectedLevel);
  renderSubjects(selectedLevel);
  showView('accueil');
  setTimeout(() => document.getElementById('matieres').scrollIntoView({behavior:'smooth'}), 60);
}

/* mur de paiement — nécessite d'être connecté */
function unlockPrompt(chapterName, domainName){
  if(!currentUser){ showView('connexion'); return; }
  if(hasFullAccess(currentUser)){ return; } /* déjà premium ou admin : rien à bloquer */
  document.getElementById('pwDomain').textContent = domainName || 'Contenu';
  document.getElementById('pwChapter').textContent = `« ${chapterName} » est réservé aux membres Premium`;
  showView('paywall');
}
function backToMatiere(){
  if(currentMatiereCtx){ openMatiereDetail(currentMatiereCtx.domain, currentMatiereCtx.index); }
  else { showView('accueil'); }
}

/* ===================================================================
   Ouverture d'un chapitre — routage uniquement. L'accès (gratuit / verrouillé)
   est décidé ailleurs (openMatiereDetail, hasFullAccess) et n'est pas modifié
   ici : cette fonction n'est appelée que pour un chapitre déjà autorisé.
=================================================================== */
const AUTHORED_CHAPTER_KEY = 'Physique|Mécanique du point matériel|Dynamique du point matériel';
let currentChapterCtx = null;
let currentChapterExerciseTally = { correct: 0, total: 0 };
let currentChapterWrongPoints = [];
let chapterProgressCache = [];
let lastBadgeStats = null;

/* 55 badges — chacun basé sur une vraie donnée (progression, série, réussite, temps, abonnement),
   rien n'est purement décoratif : `check` lit toujours des statistiques réellement calculées. */
const BADGES = [
  { cat:'Chapitres complétés', icon:'🎯', name:'Premier pas', desc:'1 chapitre terminé', check:s=>s.chaptersDone>=1 },
  { cat:'Chapitres complétés', icon:'📘', name:'Sur la lancée', desc:'2 chapitres terminés', check:s=>s.chaptersDone>=2 },
  { cat:'Chapitres complétés', icon:'📗', name:'Ça avance', desc:'3 chapitres terminés', check:s=>s.chaptersDone>=3 },
  { cat:'Chapitres complétés', icon:'📙', name:'Cinq chapitres', desc:'5 chapitres terminés', check:s=>s.chaptersDone>=5 },
  { cat:'Chapitres complétés', icon:'📕', name:'Huit chapitres', desc:'8 chapitres terminés', check:s=>s.chaptersDone>=8 },
  { cat:'Chapitres complétés', icon:'📚', name:'Dix chapitres', desc:'10 chapitres terminés', check:s=>s.chaptersDone>=10 },
  { cat:'Chapitres complétés', icon:'🗂️', name:'Quinze chapitres', desc:'15 chapitres terminés', check:s=>s.chaptersDone>=15 },
  { cat:'Chapitres complétés', icon:'🏛️', name:'Vingt chapitres', desc:'20 chapitres terminés', check:s=>s.chaptersDone>=20 },
  { cat:'Chapitres complétés', icon:'🎓', name:'Vingt-cinq chapitres', desc:'25 chapitres terminés', check:s=>s.chaptersDone>=25 },
  { cat:'Chapitres complétés', icon:'🏅', name:'Trente chapitres', desc:'30 chapitres terminés', check:s=>s.chaptersDone>=30 },
  { cat:'Chapitres complétés', icon:'🥇', name:'Quarante chapitres', desc:'40 chapitres terminés', check:s=>s.chaptersDone>=40 },
  { cat:'Chapitres complétés', icon:'👑', name:'Cinquante chapitres', desc:'50 chapitres terminés', check:s=>s.chaptersDone>=50 },

  { cat:'Série de jours', icon:'🔥', name:'2 jours de suite', desc:'', check:s=>s.streak>=2 },
  { cat:'Série de jours', icon:'✨', name:'3 jours de suite', desc:'', check:s=>s.streak>=3 },
  { cat:'Série de jours', icon:'⚡', name:'5 jours de suite', desc:'', check:s=>s.streak>=5 },
  { cat:'Série de jours', icon:'🌟', name:'Une semaine complète', desc:'7 jours de suite', check:s=>s.streak>=7 },
  { cat:'Série de jours', icon:'💫', name:'10 jours de suite', desc:'', check:s=>s.streak>=10 },
  { cat:'Série de jours', icon:'☄️', name:'Deux semaines', desc:'14 jours de suite', check:s=>s.streak>=14 },
  { cat:'Série de jours', icon:'🌠', name:'21 jours de suite', desc:'', check:s=>s.streak>=21 },
  { cat:'Série de jours', icon:'🎇', name:'Un mois complet', desc:'30 jours de suite', check:s=>s.streak>=30 },
  { cat:'Série de jours', icon:'🧨', name:'50 jours de suite', desc:'', check:s=>s.streak>=50 },
  { cat:'Série de jours', icon:'🚀', name:'75 jours de suite', desc:'', check:s=>s.streak>=75 },
  { cat:'Série de jours', icon:'🛸', name:'Régularité exceptionnelle', desc:'100 jours de suite', check:s=>s.streak>=100 },

  { cat:'Réussite aux exercices', icon:'🎲', name:'50% de réussite', desc:'Au moins 3 exercices faits', check:s=>s.successCount>=3 && s.successRate>=50 },
  { cat:'Réussite aux exercices', icon:'📐', name:'60% de réussite', desc:'', check:s=>s.successCount>=3 && s.successRate>=60 },
  { cat:'Réussite aux exercices', icon:'🧮', name:'70% de réussite', desc:'', check:s=>s.successCount>=3 && s.successRate>=70 },
  { cat:'Réussite aux exercices', icon:'📊', name:'80% de réussite', desc:'', check:s=>s.successCount>=3 && s.successRate>=80 },
  { cat:'Réussite aux exercices', icon:'🎯', name:'90% de réussite', desc:'', check:s=>s.successCount>=3 && s.successRate>=90 },
  { cat:'Réussite aux exercices', icon:'💯', name:'Score parfait', desc:'100% de réussite', check:s=>s.successCount>=3 && s.successRate>=100 },

  { cat:'Domaines explorés', icon:'⚛️', name:'Physicien en herbe', desc:'Débuter la Physique', check:s=>(s.domainStats.Physique?.done||0)>=1 },
  { cat:'Domaines explorés', icon:'🧪', name:'Chimiste en herbe', desc:'Débuter la Chimie', check:s=>(s.domainStats.Chimie?.done||0)>=1 },
  { cat:'Domaines explorés', icon:'➗', name:'Matheux en herbe', desc:'Débuter les Mathématiques', check:s=>(s.domainStats['Mathématiques']?.done||0)>=1 },
  { cat:'Domaines explorés', icon:'💻', name:'Codeur en herbe', desc:"Débuter l'Informatique", check:s=>(s.domainStats.Informatique?.done||0)>=1 },
  { cat:'Domaines explorés', icon:'🌍', name:'Curieux de tout', desc:'Débuter Autres', check:s=>(s.domainStats.Autres?.done||0)>=1 },
  { cat:'Domaines explorés', icon:'🧭', name:'Explorateur', desc:'2 domaines touchés', check:s=>s.domainsTouched>=2 },
  { cat:'Domaines explorés', icon:'🗺️', name:'Polyvalent', desc:'3 domaines touchés', check:s=>s.domainsTouched>=3 },
  { cat:'Domaines explorés', icon:'🌐', name:'Touche-à-tout', desc:'4 domaines touchés', check:s=>s.domainsTouched>=4 },
  { cat:'Domaines explorés', icon:'🔭', name:'Toutes les sciences', desc:'Les 5 domaines touchés', check:s=>s.domainsTouched>=5 },

  { cat:'Matières terminées', icon:'🏆', name:'1 matière terminée', desc:'Tous ses chapitres complétés', check:s=>s.matieresCompleted>=1 },
  { cat:'Matières terminées', icon:'🥈', name:'2 matières terminées', desc:'', check:s=>s.matieresCompleted>=2 },
  { cat:'Matières terminées', icon:'🥉', name:'3 matières terminées', desc:'', check:s=>s.matieresCompleted>=3 },
  { cat:'Matières terminées', icon:'🎖️', name:'5 matières terminées', desc:'', check:s=>s.matieresCompleted>=5 },
  { cat:'Matières terminées', icon:'🏵️', name:'8 matières terminées', desc:'', check:s=>s.matieresCompleted>=8 },
  { cat:'Matières terminées', icon:'💎', name:'10 matières terminées', desc:'Un niveau presque bouclé', check:s=>s.matieresCompleted>=10 },

  { cat:"Temps d'étude cumulé", icon:'⏱️', name:'30 minutes', desc:'', check:s=>s.totalMinutes>=30 },
  { cat:"Temps d'étude cumulé", icon:'⏳', name:'1 heure', desc:'', check:s=>s.totalMinutes>=60 },
  { cat:"Temps d'étude cumulé", icon:'🕰️', name:'3 heures', desc:'', check:s=>s.totalMinutes>=180 },
  { cat:"Temps d'étude cumulé", icon:'🌙', name:'5 heures', desc:'', check:s=>s.totalMinutes>=300 },
  { cat:"Temps d'étude cumulé", icon:'☀️', name:'10 heures', desc:'', check:s=>s.totalMinutes>=600 },
  { cat:"Temps d'étude cumulé", icon:'🌅', name:'20 heures', desc:'', check:s=>s.totalMinutes>=1200 },
  { cat:"Temps d'étude cumulé", icon:'🗓️', name:'50 heures', desc:'', check:s=>s.totalMinutes>=3000 },
  { cat:"Temps d'étude cumulé", icon:'🏔️', name:"Marathon d'étude", desc:'100 heures cumulées', check:s=>s.totalMinutes>=6000 },

  { cat:'Abonnement', icon:'⭐', name:'Premium actif', desc:'Abonnement en cours', check:s=>s.premiumActive },
  { cat:'Abonnement', icon:'🌱', name:'Fidèle depuis 7 jours', desc:'', check:s=>s.premiumDays>=7 },
  { cat:'Abonnement', icon:'🌳', name:'Fidèle depuis 30 jours', desc:'', check:s=>s.premiumDays>=30 },

  /* ============================= +45 badges ============================= */

  { cat:'Chapitres complétés', icon:'🛡️', name:'Soixante chapitres', desc:'60 chapitres terminés', check:s=>s.chaptersDone>=60 },
  { cat:'Chapitres complétés', icon:'⚔️', name:'Soixante-dix chapitres', desc:'70 chapitres terminés', check:s=>s.chaptersDone>=70 },
  { cat:'Chapitres complétés', icon:'🏹', name:'Quatre-vingts chapitres', desc:'80 chapitres terminés', check:s=>s.chaptersDone>=80 },
  { cat:'Chapitres complétés', icon:'🗡️', name:'Quatre-vingt-dix chapitres', desc:'90 chapitres terminés', check:s=>s.chaptersDone>=90 },
  { cat:'Chapitres complétés', icon:'👑', name:'Cent chapitres', desc:'100 chapitres terminés', check:s=>s.chaptersDone>=100 },

  { cat:'Série de jours', icon:'🌌', name:'Cinq mois de suite', desc:'150 jours de suite', check:s=>s.streak>=150 },
  { cat:'Série de jours', icon:'🪐', name:'Grande constance', desc:'200 jours de suite', check:s=>s.streak>=200 },
  { cat:'Série de jours', icon:'🌞', name:'Une année de suite', desc:'365 jours de suite', check:s=>s.streak>=365 },

  { cat:"Volume d'exercices", icon:'✏️', name:'10 exercices résolus', desc:'', check:s=>s.successCount>=10 },
  { cat:"Volume d'exercices", icon:'📝', name:'25 exercices résolus', desc:'', check:s=>s.successCount>=25 },
  { cat:"Volume d'exercices", icon:'🖊️', name:'50 exercices résolus', desc:'', check:s=>s.successCount>=50 },
  { cat:"Volume d'exercices", icon:'🗒️', name:'100 exercices résolus', desc:'', check:s=>s.successCount>=100 },
  { cat:"Volume d'exercices", icon:'📒', name:'150 exercices résolus', desc:'', check:s=>s.successCount>=150 },
  { cat:"Volume d'exercices", icon:'📔', name:'250 exercices résolus', desc:'', check:s=>s.successCount>=250 },
  { cat:"Volume d'exercices", icon:'🧠', name:'Quasi-perfection', desc:'95% de réussite sur au moins 10 exercices', check:s=>s.successCount>=10 && s.successRate>=95 },

  { cat:'Progression par domaine', icon:'⚛️', name:'Physique — bases solides', desc:'3 chapitres de Physique terminés', check:s=>(s.domainStats.Physique?.done||0)>=3 },
  { cat:'Progression par domaine', icon:'🔬', name:'Physique — niveau confirmé', desc:'6 chapitres de Physique terminés', check:s=>(s.domainStats.Physique?.done||0)>=6 },
  { cat:'Progression par domaine', icon:'🌌', name:'Physique — expert', desc:'10 chapitres de Physique terminés', check:s=>(s.domainStats.Physique?.done||0)>=10 },
  { cat:'Progression par domaine', icon:'🧪', name:'Chimie — bases solides', desc:'3 chapitres de Chimie terminés', check:s=>(s.domainStats.Chimie?.done||0)>=3 },
  { cat:'Progression par domaine', icon:'⚗️', name:'Chimie — niveau confirmé', desc:'6 chapitres de Chimie terminés', check:s=>(s.domainStats.Chimie?.done||0)>=6 },
  { cat:'Progression par domaine', icon:'🧫', name:'Chimie — expert', desc:'10 chapitres de Chimie terminés', check:s=>(s.domainStats.Chimie?.done||0)>=10 },
  { cat:'Progression par domaine', icon:'➗', name:'Maths — bases solides', desc:'3 chapitres de Mathématiques terminés', check:s=>(s.domainStats['Mathématiques']?.done||0)>=3 },
  { cat:'Progression par domaine', icon:'📐', name:'Maths — niveau confirmé', desc:'6 chapitres de Mathématiques terminés', check:s=>(s.domainStats['Mathématiques']?.done||0)>=6 },
  { cat:'Progression par domaine', icon:'∑', name:'Maths — expert', desc:'10 chapitres de Mathématiques terminés', check:s=>(s.domainStats['Mathématiques']?.done||0)>=10 },
  { cat:'Progression par domaine', icon:'💻', name:'Info — bases solides', desc:"3 chapitres d'Informatique terminés", check:s=>(s.domainStats.Informatique?.done||0)>=3 },
  { cat:'Progression par domaine', icon:'⌨️', name:'Info — niveau confirmé', desc:"6 chapitres d'Informatique terminés", check:s=>(s.domainStats.Informatique?.done||0)>=6 },
  { cat:'Progression par domaine', icon:'🖥️', name:'Info — expert', desc:"10 chapitres d'Informatique terminés", check:s=>(s.domainStats.Informatique?.done||0)>=10 },
  { cat:'Progression par domaine', icon:'🌍', name:'Autres — bases solides', desc:'3 chapitres du domaine Autres terminés', check:s=>(s.domainStats.Autres?.done||0)>=3 },
  { cat:'Progression par domaine', icon:'🗣️', name:'Autres — niveau confirmé', desc:'6 chapitres du domaine Autres terminés', check:s=>(s.domainStats.Autres?.done||0)>=6 },
  { cat:'Progression par domaine', icon:'🎙️', name:'Autres — expert', desc:'10 chapitres du domaine Autres terminés', check:s=>(s.domainStats.Autres?.done||0)>=10 },

  { cat:"Temps d'étude cumulé", icon:'🕐', name:'15 minutes', desc:'', check:s=>s.totalMinutes>=15 },
  { cat:"Temps d'étude cumulé", icon:'🕓', name:'2 heures', desc:'', check:s=>s.totalMinutes>=120 },
  { cat:"Temps d'étude cumulé", icon:'🕗', name:'4 heures', desc:'', check:s=>s.totalMinutes>=240 },
  { cat:"Temps d'étude cumulé", icon:'🕛', name:'15 heures', desc:'', check:s=>s.totalMinutes>=900 },
  { cat:"Temps d'étude cumulé", icon:'🌇', name:'75 heures', desc:'', check:s=>s.totalMinutes>=4500 },

  { cat:'Matières terminées', icon:'🎗️', name:'4 matières terminées', desc:'', check:s=>s.matieresCompleted>=4 },
  { cat:'Matières terminées', icon:'🏵️', name:'6 matières terminées', desc:'', check:s=>s.matieresCompleted>=6 },
  { cat:'Matières terminées', icon:'🎫', name:'7 matières terminées', desc:'', check:s=>s.matieresCompleted>=7 },
  { cat:'Matières terminées', icon:'🎟️', name:'9 matières terminées', desc:'', check:s=>s.matieresCompleted>=9 },
  { cat:'Matières terminées', icon:'👑', name:'12 matières terminées', desc:'', check:s=>s.matieresCompleted>=12 },

  { cat:'Abonnement', icon:'🌾', name:'Fidèle depuis 14 jours', desc:'', check:s=>s.premiumDays>=14 },
  { cat:'Abonnement', icon:'🌿', name:'Fidèle depuis 60 jours', desc:'', check:s=>s.premiumDays>=60 },
  { cat:'Abonnement', icon:'🌴', name:'Fidèle depuis 90 jours', desc:'', check:s=>s.premiumDays>=90 },
  { cat:'Abonnement', icon:'🌲', name:'Fidèle depuis 180 jours', desc:'', check:s=>s.premiumDays>=180 },
  { cat:'Abonnement', icon:'🏞️', name:'Fidèle depuis 365 jours', desc:'', check:s=>s.premiumDays>=365 }
];

function badgeCardHTML(b, earned){
  const title = b.desc ? `${b.name} — ${b.desc}` : b.name;
  return `<div class="badge${earned ? ' earned' : ''}" title="${title.replace(/"/g,'&quot;')}"><span class="badge-icon">${b.icon}</span><span>${b.name}</span></div>`;
}

function renderBadgePreview(){
  if(!lastBadgeStats) return;
  const earnedList = BADGES.filter(b => b.check(lastBadgeStats));
  const countEl = document.getElementById('badgeSummaryCount');
  if(countEl) countEl.textContent = `${earnedList.length} / ${BADGES.length}`;
  const preview = document.getElementById('badgePreviewGrid');
  if(preview){
    const toShow = (earnedList.length ? earnedList : BADGES).slice(0, 6);
    preview.innerHTML = toShow.map(b => badgeCardHTML(b, b.check(lastBadgeStats))).join('');
  }
}

async function renderBadgesPage(){
  if(!lastBadgeStats){ await loadRealProgress(); }
  if(!lastBadgeStats) return;
  const earnedList = BADGES.filter(b => b.check(lastBadgeStats));
  document.getElementById('badgesPageCount').textContent = `${earnedList.length} / ${BADGES.length}`;
  const categories = [...new Set(BADGES.map(b => b.cat))];
  document.getElementById('badgesFullList').innerHTML = categories.map(cat => {
    const items = BADGES.filter(b => b.cat === cat);
    const earnedInCat = items.filter(b => b.check(lastBadgeStats)).length;
    return `<div class="badge-category">
      <h3>${cat} — ${earnedInCat}/${items.length}</h3>
      <div class="badges-grid">${items.map(b => badgeCardHTML(b, b.check(lastBadgeStats))).join('')}</div>
    </div>`;
  }).join('');
}

function jsEsc(str){ return String(str).replace(/'/g, "\\'"); }
function jsEscHtml(str){
  return String(str == null ? '' : str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ---- Retour visuel de chargement (Sprint UX) ----
   withLoading(btn, fn) désactive le bouton et affiche un spinner pendant
   l'exécution de fn (async ou non), puis restaure l'état initial, même
   en cas d'erreur (finally). Usage : withLoading(document.getElementById('x'), async () => { ... }) */
async function withLoading(btn, fn){
  if(!btn){ return fn(); }
  if(btn.classList.contains('is-loading')) return; // évite un double-clic pendant un appel en cours
  btn.classList.add('is-loading');
  btn.disabled = true;
  try{
    return await fn();
  } finally {
    btn.classList.remove('is-loading');
    btn.disabled = false;
  }
}

/* Formatage sûr d'un texte venant d'une source non fiable (LLM distant, saisie
   utilisateur...) : on échappe tout le HTML potentiellement dangereux, puis on
   ré-autorise uniquement les sauts de ligne — jamais de balises arbitraires.
   À utiliser partout où du texte externe est injecté via innerHTML. */
function jsEscHtmlKeepLines(str){
  return jsEscHtml(str).replace(/\n/g, '<br>');
}

/* ---- Protection du contenu pédagogique (Sprint 1) ----
   Filigrane discret, répété, affichant l'identifiant du compte connecté
   par-dessus le contenu de la leçon. N'empêche pas la copie (rien ne le
   peut vraiment sur le web), mais rend une capture d'écran partagée
   publiquement traçable jusqu'au compte qui l'a prise. */
function renderContentWatermark(){
  const host = document.getElementById('chapterContentGuard');
  if(!host) return;
  let wm = host.querySelector('.esu-watermark');
  if(!wm){
    wm = document.createElement('div');
    wm.className = 'esu-watermark';
    host.appendChild(wm);
  }
  const label = (currentUser && (currentUser.email || currentUser.id)) || 'E-Student University';
  const text = `${label} — usage personnel — ne pas partager`;
  const rows = 10;
  wm.innerHTML = Array.from({ length: rows }, (_, i) =>
    `<span style="top:${i * 11}%;">${jsEscHtml((text + '   ').repeat(6))}</span>`
  ).join('');
}

/* (le clic droit est déjà désactivé globalement plus haut dans ce fichier —
   pas besoin d'un second gestionnaire scopé au contenu des leçons) */

/* ---- Accessibilité clavier (Sprint UX) ----
   Certains éléments interactifs (choix du niveau, avatar de déconnexion)
   sont des <div>/<span> et non des <button> natifs, pour des raisons de
   mise en page. Sans ceci, un utilisateur au clavier seul (Tab) peut les
   atteindre (tabindex) mais ne peut pas les activer avec Entrée/Espace
   comme il s'y attend — un seul écouteur ici couvre tous les éléments
   marqués role="button", actuels et futurs, sans dupliquer de logique. */
document.addEventListener('keydown', (e) => {
  if((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role="button"][tabindex]')){
    e.preventDefault();
    e.target.click();
  }
});

/* ---- Espace admin (Sprint 1) ----
   Toutes les actions passent par des fonctions RPC Postgres qui vérifient
   elles-mêmes le rôle admin côté serveur (voir admin-backoffice.sql) —
   masquer le lien de navigation ne suffit pas comme sécurité, ce garde-fou
   serveur est la vraie protection. */
async function adminGrantPremium(){
  const email = (document.getElementById('adminTargetEmail').value || '').trim();
  const note = document.getElementById('adminActionNote');
  if(!email){ return; }
  try{
    const { error } = await supabaseClient.rpc('admin_grant_premium', { target_email: email, days: 30 });
    note.style.display = 'block';
    if(error){ note.style.color = '#B23A44'; note.textContent = 'Échec : ' + error.message; }
    else { note.style.color = 'var(--teal)'; note.textContent = `✓ Premium accordé/prolongé de 30 jours pour ${email}.`; }
  }catch(e){ console.error('[admin_grant_premium]', e); }
}
async function adminRevokePremium(){
  const email = (document.getElementById('adminTargetEmail').value || '').trim();
  const note = document.getElementById('adminActionNote');
  if(!email) return;
  try{
    const { error } = await supabaseClient.rpc('admin_revoke_premium', { target_email: email });
    note.style.display = 'block';
    if(error){ note.style.color = '#B23A44'; note.textContent = 'Échec : ' + error.message; }
    else { note.style.color = 'var(--teal)'; note.textContent = `✓ Premium révoqué pour ${email}.`; }
  }catch(e){ console.error('[admin_revoke_premium]', e); }
}
/* ---- Page Métiers ---- */
const CAREER_LEVEL_LABELS = { L1:'Licence 1', L2:'Licence 2', L3PF:'L3 — Physique Fondamentale', L3CF:'L3 — Chimie Fondamentale', all:'Tous niveaux' };

async function uploadCareerImage(careerId, file){
  const note = document.getElementById('careerImgNote-' + careerId);
  if(!file || !supabaseClient) return;
  if(note){ note.style.display = 'block'; note.style.color = 'var(--ink-soft)'; note.textContent = 'Envoi en cours…'; }
  if(!['image/png','image/jpeg','image/webp'].includes(file.type)){
    if(note){ note.style.color = '#B23A44'; note.textContent = 'Format non supporté (JPG, PNG ou WebP).'; } return;
  }
  if(file.size > 4 * 1024 * 1024){
    if(note){ note.style.color = '#B23A44'; note.textContent = 'Fichier trop lourd (4 Mo maximum).'; } return;
  }
  try{
    const ext = file.name.split('.').pop().toLowerCase();
    const path = `career-${careerId}.${ext}`;
    const { error: uploadError } = await supabaseClient.storage.from('career-images').upload(path, file, { upsert: true });
    if(uploadError){ if(note){ note.style.color = '#B23A44'; note.textContent = 'Échec : ' + uploadError.message; } return; }
    const { data: pub } = supabaseClient.storage.from('career-images').getPublicUrl(path);
    const url = pub.publicUrl + '?t=' + Date.now();
    const { error: dbError } = await supabaseClient.from('careers').update({ image_url: url }).eq('id', careerId);
    if(dbError){ if(note){ note.style.color = '#B23A44'; note.textContent = 'Échec enregistrement : ' + dbError.message; } return; }
    loadCareers();
  }catch(e){ if(note){ note.style.color = '#B23A44'; note.textContent = 'Erreur : ' + e.message; } }
}

async function loadCareers(){
  const grid = document.getElementById('careersGrid');
  const adminPanel = document.getElementById('careersAdminPanel');
  if(adminPanel) adminPanel.style.display = (currentUser && currentUser.role === 'admin') ? 'block' : 'none';
  if(!grid || !supabaseClient) return;
  grid.innerHTML = 'Chargement…';
  try{
    const { data, error } = await supabaseClient.from('careers').select('id, name, description, required_level, image_url').order('name');
    if(error){ grid.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(error.message)}</p>`; return; }
    if(!data || data.length === 0){ grid.innerHTML = '<p class="admin-list-empty">Aucun métier pour l\'instant.</p>'; return; }
    const isAdmin = currentUser && currentUser.role === 'admin';
    grid.innerHTML = data.map(c => `
      <div class="admin-panel career-card">
        ${c.image_url
          ? `<img class="career-card-img" src="${jsEscHtml(c.image_url)}" alt="" loading="lazy">`
          : `<div class="career-card-img-placeholder">🔬</div>`}
        <div class="career-card-body">
          <span class="career-level-tag">${jsEscHtml(CAREER_LEVEL_LABELS[c.required_level] || c.required_level)}</span>
          <h2 style="font-size:1.05rem; margin-bottom:8px;">${jsEscHtml(c.name)}</h2>
          <p style="font-size:0.88rem; color:var(--ink-soft); line-height:1.5;">${jsEscHtml(c.description)}</p>
          ${isAdmin ? `
            <label class="btn btn-ghost" style="margin-top:14px; cursor:pointer; display:inline-block;">Changer l'image
              <input type="file" accept="image/png,image/jpeg,image/webp" style="display:none;" onchange="uploadCareerImage(${c.id}, this.files[0])">
            </label>
            <button class="btn btn-ghost" style="margin-top:14px; margin-left:8px; color:#B23A44;" onclick="deleteCareer(${c.id})">Supprimer</button>
            <p id="careerImgNote-${c.id}" style="display:none; font-size:0.8rem; font-weight:600; margin-top:8px;"></p>
          ` : ''}
        </div>
      </div>`).join('');
  }catch(e){ grid.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(e.message)}</p>`; }
}

async function addCareer(){
  const name = (document.getElementById('careerName').value || '').trim();
  const description = (document.getElementById('careerDesc').value || '').trim();
  const required_level = document.getElementById('careerLevel').value;
  const image_url = (document.getElementById('careerImage').value || '').trim();
  const note = document.getElementById('careerAddNote');
  note.style.display = 'block';
  if(!name || !description){ note.style.color = '#B23A44'; note.textContent = 'Nom et description requis.'; return; }
  if(image_url){
    try{ const u = new URL(image_url); if(!/^https?:$/.test(u.protocol)) throw new Error(); }
    catch(e){ note.style.color = '#B23A44'; note.textContent = 'Lien d\'image invalide.'; return; }
  }
  try{
    const { error } = await supabaseClient.from('careers').insert({ name, description, required_level, image_url: image_url || null });
    if(error){ note.style.color = '#B23A44'; note.textContent = 'Échec : ' + error.message; return; }
    note.style.color = 'var(--teal)'; note.textContent = '✓ Métier ajouté.';
    document.getElementById('careerName').value = '';
    document.getElementById('careerDesc').value = '';
    document.getElementById('careerImage').value = '';
    loadCareers();
  }catch(e){ note.style.color = '#B23A44'; note.textContent = 'Erreur : ' + e.message; }
}

async function deleteCareer(id){
  try{
    const { error } = await supabaseClient.from('careers').delete().eq('id', id);
    if(error){ console.error('[deleteCareer]', error); return; }
    loadCareers();
  }catch(e){ console.error('[deleteCareer]', e); }
}

/* ---- Présence en ligne (façon Facebook) ---- */
const onlineUserIds = new Set();
let presenceChannel = null;

function initPresence(){
  if(!supabaseClient || !currentUser || presenceChannel) return;
  presenceChannel = supabaseClient.channel('presence-etudiants', { config: { presence: { key: currentUser.id } } });
  presenceChannel
    .on('presence', { event: 'sync' }, () => {
      const state = presenceChannel.presenceState();
      onlineUserIds.clear();
      Object.keys(state).forEach(id => onlineUserIds.add(id));
      refreshOnlineIndicators();
    })
    .subscribe(async (status) => {
      if(status === 'SUBSCRIBED'){ await presenceChannel.track({ online_at: new Date().toISOString() }); }
    });
}

function refreshOnlineIndicators(){
  // met à jour le statut affiché dans l'en-tête si une conversation est ouverte
  const statusEl = document.getElementById('privateThreadStatus');
  if(statusEl && currentPrivateOtherId){
    statusEl.textContent = onlineUserIds.has(currentPrivateOtherId) ? '● En ligne' : '';
    statusEl.style.color = '#3BC96B';
  }
}

/* ---- Badge global de messages non lus ---- */
async function refreshUnreadBadge(){
  if(!supabaseClient || !currentUser) return;
  try{
    const { data, error } = await supabaseClient.rpc('count_unread_private');
    if(error) return;
    const count = data || 0;
    [document.getElementById('chatUnreadBadge'), document.getElementById('dockChatBadge')].forEach(el => {
      if(!el) return;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
      el.textContent = count > 9 ? '9+' : String(count);
    });
  }catch(e){ console.error('[refreshUnreadBadge]', e); }
}

function switchChatTab(tab){
  const roomPanel = document.getElementById('chatPanelRoom');
  const privatePanel = document.getElementById('chatPanelPrivate');
  const roomBtn = document.getElementById('chatTabRoomBtn');
  const privateBtn = document.getElementById('chatTabPrivateBtn');
  if(tab === 'room'){
    roomPanel.style.display = 'flex'; privatePanel.style.display = 'none';
    roomBtn.classList.add('active'); privateBtn.classList.remove('active');
  } else {
    roomPanel.style.display = 'none'; privatePanel.style.display = 'flex';
    roomBtn.classList.remove('active'); privateBtn.classList.add('active');
    document.getElementById('privateConversationList').style.display = 'flex';
    document.getElementById('privateSearchView').style.display = 'none';
    document.getElementById('privateThreadView').style.display = 'none';
    loadMyConversations();
  }
}

let studentSearchTimer = null;
function debouncedSearchStudents(){
  clearTimeout(studentSearchTimer);
  studentSearchTimer = setTimeout(searchStudentsToMessage, 350);
}

async function searchStudentsToMessage(){
  const q = (document.getElementById('privateStudentSearch').value || '').trim();
  const host = document.getElementById('privateSearchResults');
  if(!host) return;
  host.innerHTML = 'Chargement…';
  try{
    const { data, error } = await supabaseClient.rpc('search_students', { q });
    if(error){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(error.message)}</p>`; return; }
    if(!data || data.length === 0){ host.innerHTML = '<p class="admin-list-empty">Aucun étudiant trouvé.</p>'; return; }
    host.innerHTML = data.map(s => `
      <div class="admin-row" style="cursor:pointer;" onclick="openPrivateThread('${s.id}', '${jsEscHtml(s.name).replace(/'/g,"\\'")}')">
        <div class="admin-row-main" style="display:flex; align-items:center; gap:10px;">
          <span class="chat-contact-avatar-wrap">
            <span class="chat-thread-avatar" style="width:30px; height:30px; font-size:0.78rem;">${jsEscHtml((s.name||'?').trim().charAt(0).toUpperCase())}</span>
            ${onlineUserIds.has(s.id) ? '<span class="chat-online-dot"></span>' : ''}
          </span>
          <strong>${jsEscHtml(s.name)}</strong>
        </div>
      </div>`).join('');
  }catch(e){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(e.message)}</p>`; }
}

async function loadMyConversations(){
  const host = document.getElementById('privateConversationsList');
  if(!host || !supabaseClient) return;
  host.innerHTML = 'Chargement…';
  try{
    const { data, error } = await supabaseClient.rpc('list_my_conversations');
    if(error){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(error.message)}</p>`; return; }
    if(!data || data.length === 0){ host.innerHTML = '<p class="admin-list-empty">Aucune conversation pour l\'instant.</p>'; return; }
    host.innerHTML = data.map(c => `
      <div class="admin-row" style="cursor:pointer;" onclick="openPrivateThread('${c.other_id}', '${jsEscHtml(c.other_name).replace(/'/g,"\\'")}')">
        <div class="admin-row-main" style="display:flex; align-items:center; gap:10px;">
          <span class="chat-contact-avatar-wrap">
            <span class="chat-thread-avatar" style="width:36px; height:36px;">${jsEscHtml((c.other_name||'?').trim().charAt(0).toUpperCase())}</span>
            ${onlineUserIds.has(c.other_id) ? '<span class="chat-online-dot"></span>' : ''}
          </span>
          <span>
            <strong style="display:block;">${jsEscHtml(c.other_name)}</strong>
            <span class="admin-row-meta">${jsEscHtml((c.last_message||'').slice(0,50))}</span>
          </span>
        </div>
        ${c.unread_count > 0 ? `<span class="chat-badge">${c.unread_count}</span>` : ''}
      </div>`).join('');
  }catch(e){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(e.message)}</p>`; }
}

let currentPrivateOtherId = null;
let privateThreadChannel = null;

async function openPrivateThread(otherId, otherName){
  currentPrivateOtherId = otherId;
  document.getElementById('privateConversationList').style.display = 'none';
  document.getElementById('privateSearchView').style.display = 'none';
  document.getElementById('privateThreadView').style.display = 'flex';
  document.getElementById('privateThreadTitle').textContent = otherName;
  document.getElementById('privateThreadAvatar').textContent = (otherName || '?').trim().charAt(0).toUpperCase();
  refreshOnlineIndicators();
  await loadPrivateThreadMessages();
  subscribePrivateThreadRealtime();
}

function closePrivateThread(){
  currentPrivateOtherId = null;
  if(privateThreadChannel){ supabaseClient.removeChannel(privateThreadChannel); privateThreadChannel = null; }
  document.getElementById('privateThreadView').style.display = 'none';
  document.getElementById('privateConversationList').style.display = 'flex';
  loadMyConversations();
}

function openPrivateSearch(){
  document.getElementById('privateConversationList').style.display = 'none';
  document.getElementById('privateSearchView').style.display = 'flex';
  document.getElementById('privateStudentSearch').value = '';
  document.getElementById('privateStudentSearch').focus();
  searchStudentsToMessage();
}

function closePrivateSearch(){
  document.getElementById('privateSearchView').style.display = 'none';
  document.getElementById('privateConversationList').style.display = 'flex';
}

async function loadPrivateThreadMessages(){
  const host = document.getElementById('privateThreadBody');
  host.innerHTML = 'Chargement…';
  try{
    const { data, error } = await supabaseClient
      .from('chat_messages').select('id, user_id, recipient_id, author_name, body, created_at, read_at')
      .or(`and(user_id.eq.${currentUser.id},recipient_id.eq.${currentPrivateOtherId}),and(user_id.eq.${currentPrivateOtherId},recipient_id.eq.${currentUser.id})`)
      .order('created_at', { ascending: true })
      .limit(200);
    if(error){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(error.message)}</p>`; return; }
    if(!data || data.length === 0){ host.innerHTML = '<p class="admin-list-empty">Dis bonjour !</p>'; }
    else {
      let lastMineIdx = -1;
      data.forEach((m, i) => { if(m.user_id === currentUser.id) lastMineIdx = i; });
      host.innerHTML = data.map((m, i) => renderChatRoomMessage(m, i === lastMineIdx)).join('');
      host.scrollTop = host.scrollHeight;
    }
    // marquer comme lus les messages reçus de cette personne
    await supabaseClient.rpc('mark_thread_read', { other_id: currentPrivateOtherId });
    refreshUnreadBadge();
  }catch(e){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(e.message)}</p>`; }
}

function subscribePrivateThreadRealtime(){
  if(privateThreadChannel){ supabaseClient.removeChannel(privateThreadChannel); }
  privateThreadChannel = supabaseClient
    .channel('private_thread_' + currentPrivateOtherId)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_messages' }, (payload) => {
      const m = payload.new || payload.old;
      const isForThisThread = m.recipient_id && (
        (m.user_id === currentUser.id && m.recipient_id === currentPrivateOtherId) ||
        (m.user_id === currentPrivateOtherId && m.recipient_id === currentUser.id)
      );
      if(!isForThisThread) return;
      loadPrivateThreadMessages(); // recharge tout : recalcule proprement le "vu"
    })
    .subscribe();
}

async function sendPrivateMessage(){
  const input = document.getElementById('privateThreadInput');
  const body = (input.value || '').trim();
  if(!body || !currentUser || !currentPrivateOtherId) return;
  input.value = '';
  const btn = document.getElementById('privateThreadSendBtn');
  await withLoading(btn, async () => {
    try{
      const { error } = await supabaseClient.from('chat_messages').insert({
        user_id: currentUser.id, recipient_id: currentPrivateOtherId, author_name: currentUser.name || 'Étudiant', body
      });
      if(error){ console.error('[sendPrivateMessage]', error); input.value = body; }
    }catch(e){ console.error('[sendPrivateMessage]', e); input.value = body; }
  });
}

/* ---- Chat étudiants (salon commun, expiration 7 jours) ---- */
let chatRoomChannel = null;

function renderChatRoomMessage(m, isLastMineInThread){
  const mine = currentUser && m.user_id === currentUser.id;
  const isAdmin = currentUser && currentUser.role === 'admin';
  const canDelete = mine || isAdmin;
  const time = new Date(m.created_at).toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' });
  const isPrivate = !!m.recipient_id;
  const tickIcon = (checked) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 13 6 18 14 6"/>${checked ? '<polyline points="9 13 14 18 22 6"/>' : ''}</svg>`;
  const tick = (mine && isPrivate) ? `<span class="chat-tick ${m.read_at ? 'read' : ''}">${tickIcon(!!m.read_at)}</span>` : '';
  return `
    <div class="chat-room-msg ${mine ? 'mine' : 'theirs'}" id="chatmsg-${m.id}">
      ${!mine ? `<span class="author">${jsEscHtml(m.author_name)}</span>` : ''}
      ${jsEscHtml(m.body)}
      <span class="meta">${canDelete ? `<button class="del-btn" onclick="deleteChatRoomMessage(${m.id})">supprimer</button>` : ''}${time}${tick}</span>
    </div>`;
}

async function loadChatRoomMessages(){
  const host = document.getElementById('chatRoomBody');
  if(!host || !supabaseClient) return;
  host.innerHTML = 'Chargement…';
  const countEl = document.getElementById('chatRoomMemberCount');
  if(countEl){
    supabaseClient.from('profiles').select('id', { count:'exact', head:true }).then(({ count }) => {
      if(count) countEl.textContent = `${count} membres`;
    });
  }
  try{
    const { data, error } = await supabaseClient
      .from('chat_messages').select('id, user_id, author_name, body, created_at')
      .is('recipient_id', null)
      .order('created_at', { ascending: true })
      .limit(200);
    if(error){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(error.message)}</p>`; return; }
    if(!data || data.length === 0){ host.innerHTML = '<p class="admin-list-empty">Aucun message pour l\'instant — lance la discussion !</p>'; return; }
    host.innerHTML = data.map(renderChatRoomMessage).join('');
    host.scrollTop = host.scrollHeight;
  }catch(e){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(e.message)}</p>`; }
}

function subscribeChatRoomRealtime(){
  if(chatRoomChannel || !supabaseClient) return; // déjà abonné
  chatRoomChannel = supabaseClient
    .channel('chat_messages_realtime')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
      if(payload.new.recipient_id) return; // message privé : ne concerne pas le salon général
      const host = document.getElementById('chatRoomBody');
      if(!host) return;
      const wasAtBottom = host.scrollTop + host.clientHeight >= host.scrollHeight - 40;
      host.insertAdjacentHTML('beforeend', renderChatRoomMessage(payload.new));
      if(wasAtBottom) host.scrollTop = host.scrollHeight;
    })
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'chat_messages' }, (payload) => {
      document.getElementById('chatmsg-' + payload.old.id)?.remove();
    })
    .subscribe();
}

async function sendChatRoomMessage(){
  const input = document.getElementById('chatRoomInput');
  const body = (input.value || '').trim();
  if(!body || !currentUser) return;
  input.value = '';
  const btn = document.getElementById('chatRoomSendBtn');
  await withLoading(btn, async () => {
    try{
      const { error } = await supabaseClient.from('chat_messages').insert({
        user_id: currentUser.id, recipient_id: null, author_name: currentUser.name || 'Étudiant', body
      });
      if(error){ console.error('[sendChatRoomMessage]', error); input.value = body; }
      // pas besoin de recharger : l'abonnement temps réel affiche le message
    }catch(e){ console.error('[sendChatRoomMessage]', e); input.value = body; }
  });
}

async function deleteChatRoomMessage(id){
  try{
    const { error } = await supabaseClient.from('chat_messages').delete().eq('id', id);
    if(error){ console.error('[deleteChatRoomMessage]', error); return; }
    document.getElementById('chatmsg-' + id)?.remove();
  }catch(e){ console.error('[deleteChatRoomMessage]', e); }
}

/* ---- Page Articles ---- */
function renderArticleMedia(a){
  if(!a.media_url) return '';
  if(a.media_type === 'video'){
    return `<video src="${jsEscHtml(a.media_url)}" controls style="width:100%; border-radius:var(--radius-sm); margin:12px 0;"></video>`;
  }
  // par défaut (ou media_type === 'image') : image
  return `<img src="${jsEscHtml(a.media_url)}" alt="" style="width:100%; border-radius:var(--radius-sm); margin:12px 0;" loading="lazy">`;
}

async function loadArticles(){
  const host = document.getElementById('articlesList');
  if(!host || !supabaseClient) return;
  host.innerHTML = 'Chargement…';
  try{
    const { data, error } = await supabaseClient
      .from('articles').select('id, title, body, media_url, media_type, created_at, expires_at')
      .order('created_at', { ascending: false });
    if(error){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(error.message)}</p>`; return; }
    if(!data || data.length === 0){ host.innerHTML = '<p class="admin-list-empty">Aucun article pour le moment.</p>'; return; }
    host.innerHTML = data.map(a => `
      <div class="admin-panel" style="margin-bottom:20px; --accent:var(--blue);">
        <h2 style="margin-bottom:6px;">${jsEscHtml(a.title)}</h2>
        <div class="admin-row-meta" style="margin-bottom:10px;">${new Date(a.created_at).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' })}</div>
        ${renderArticleMedia(a)}
        <p style="white-space:pre-wrap; line-height:1.6;">${jsEscHtml(a.body)}</p>
      </div>`).join('');
  }catch(e){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(e.message)}</p>`; }
}

async function loadAdminArticlesList(){
  const host = document.getElementById('adminArticlesList');
  if(!host || !supabaseClient) return;
  try{
    const { data, error } = await supabaseClient
      .from('articles').select('id, title, expires_at').order('created_at', { ascending: false });
    if(error){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(error.message)}</p>`; return; }
    if(!data || data.length === 0){ host.innerHTML = '<p class="admin-list-empty">Aucun article publié.</p>'; return; }
    host.innerHTML = data.map(a => `
      <div class="admin-row">
        <div class="admin-row-main">
          <strong>${jsEscHtml(a.title)}</strong>
          <div class="admin-row-meta">Expire le ${new Date(a.expires_at).toLocaleDateString('fr-FR')}</div>
        </div>
        <button class="btn btn-ghost" onclick="deleteArticle(${a.id})">Supprimer</button>
      </div>`).join('');
  }catch(e){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(e.message)}</p>`; }
}

async function publishArticle(){
  const title = (document.getElementById('articleTitle').value || '').trim();
  const body = (document.getElementById('articleBody').value || '').trim();
  const mediaUrl = (document.getElementById('articleMediaUrl').value || '').trim();
  const mediaType = document.getElementById('articleMediaType').value || null;
  const note = document.getElementById('articlePublishNote');
  note.style.display = 'block';
  if(!title || !body){ note.style.color = '#B23A44'; note.textContent = 'Titre et contenu requis.'; return; }
  if(mediaUrl){
    try{
      const u = new URL(mediaUrl);
      if(!/^https?:$/.test(u.protocol)) throw new Error('invalide');
    }catch(e){ note.style.color = '#B23A44'; note.textContent = 'Lien média invalide (doit commencer par https://).'; return; }
  }
  try{
    const { error } = await supabaseClient.from('articles').insert({
      title, body, media_url: mediaUrl || null, media_type: mediaUrl ? (mediaType || 'image') : null
    });
    if(error){ note.style.color = '#B23A44'; note.textContent = 'Échec : ' + error.message; return; }
    note.style.color = 'var(--teal)'; note.textContent = '✓ Article publié.';
    document.getElementById('articleTitle').value = '';
    document.getElementById('articleBody').value = '';
    document.getElementById('articleMediaUrl').value = '';
    loadAdminArticlesList();
  }catch(e){ note.style.color = '#B23A44'; note.textContent = 'Erreur : ' + e.message; }
}

async function deleteArticle(id){
  try{
    const { error } = await supabaseClient.from('articles').delete().eq('id', id);
    if(error){ console.error('[deleteArticle]', error); return; }
    loadAdminArticlesList();
  }catch(e){ console.error('[deleteArticle]', e); }
}

async function loadAdminOverviewStats(){
  const grid = document.getElementById('adminStatsGrid');
  if(!grid || !supabaseClient) return;
  const tiles = grid.querySelectorAll('.admin-stat-value');
  try{
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0,10);
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

    const [{ count: total }, { count: active }, { count: premium }, { count: newThisMonth }] = await Promise.all([
      supabaseClient.from('profiles').select('id', { count: 'exact', head: true }),
      supabaseClient.from('profiles').select('id', { count: 'exact', head: true }).gte('last_active_date', sevenDaysAgo),
      supabaseClient.from('profiles').select('id', { count: 'exact', head: true }).eq('premium', true),
      supabaseClient.from('profiles').select('id', { count: 'exact', head: true }).gte('created_at', monthStart),
    ]);

    tiles[0].textContent = total ?? '—';
    tiles[1].textContent = active ?? '—';
    tiles[2].textContent = premium ?? '—';
    tiles[3].textContent = newThisMonth ?? '—';
  }catch(e){ console.error('[adminOverviewStats]', e); }
}

async function loadAdminVisitsChart(){
  const host = document.getElementById('adminVisitsChart');
  if(!host || !supabaseClient) return;
  try{
    const since = new Date(Date.now() - 14 * 86400000).toISOString();
    const { data, error } = await supabaseClient
      .from('sessions').select('created_at').gte('created_at', since);
    if(error){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(error.message)}</p>`; return; }

    const counts = {};
    for(let i = 13; i >= 0; i--){
      const d = new Date(Date.now() - i * 86400000);
      counts[d.toISOString().slice(0,10)] = 0;
    }
    (data || []).forEach(s => {
      const day = s.created_at.slice(0,10);
      if(day in counts) counts[day]++;
    });
    const max = Math.max(1, ...Object.values(counts));
    host.innerHTML = Object.entries(counts).map(([day, n]) => {
      const d = new Date(day + 'T00:00:00');
      const label = d.toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit' });
      const h = Math.max(2, Math.round((n / max) * 100));
      return `<div class="admin-bar-col"><div class="admin-bar" style="height:${h}%;" title="${n} connexion(s)"></div><span class="admin-bar-day">${label}</span></div>`;
    }).join('');
  }catch(e){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(e.message)}</p>`; }
}

let adminUserSearchTimer = null;
function debouncedAdminUserSearch(){
  clearTimeout(adminUserSearchTimer);
  adminUserSearchTimer = setTimeout(loadAdminUserList, 350);
}

async function loadAdminUserList(){
  const host = document.getElementById('adminUserList');
  const q = (document.getElementById('adminUserSearch')?.value || '').trim();
  if(!host || !supabaseClient) return;
  host.innerHTML = 'Recherche…';
  try{
    let query = supabaseClient.from('profiles')
      .select('id, name, email, level, premium, premium_until, streak_count, created_at')
      .order('created_at', { ascending: false })
      .limit(30);
    if(q.length >= 2){ query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`); }
    const { data, error } = await query;
    if(error){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(error.message)}</p>`; return; }
    if(!data || data.length === 0){ host.innerHTML = '<p class="admin-list-empty">Aucun résultat.</p>'; return; }
    host.innerHTML = data.map(u => `
      <div class="admin-row" style="cursor:pointer;" onclick="showAdminUserDetail('${u.id}')">
        <div class="admin-row-main">
          <strong>${jsEscHtml(u.name || '(sans nom)')}</strong>
          <div class="admin-row-meta">${jsEscHtml(u.email)} — ${jsEscHtml(u.level || '?')}</div>
        </div>
        ${u.premium ? '<span class="admin-row-tag" style="background:rgba(31,182,168,0.18); color:#0f6e64;">Premium</span>' : ''}
      </div>`).join('');
  }catch(e){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(e.message)}</p>`; }
}

async function showAdminUserDetail(userId){
  const host = document.getElementById('adminUserDetail');
  if(!host || !supabaseClient) return;
  host.style.display = 'block';
  host.innerHTML = 'Chargement du détail…';
  try{
    const [{ data: profile, error: profErr }, { data: progress }, { data: sessions }] = await Promise.all([
      supabaseClient.from('profiles').select('*').eq('id', userId).maybeSingle(),
      supabaseClient.from('progress').select('domain, matiere, chapter, completed, exercises_correct, exercises_total').eq('user_id', userId),
      supabaseClient.from('sessions').select('device_label, created_at, last_seen').eq('user_id', userId).order('last_seen', { ascending: false }),
    ]);
    if(profErr || !profile){ host.innerHTML = '<p class="admin-list-empty">Étudiant introuvable.</p>'; return; }

    const completedCount = (progress || []).filter(p => p.completed).length;
    const totalCorrect = (progress || []).reduce((s,p) => s + (p.exercises_correct||0), 0);
    const totalEx = (progress || []).reduce((s,p) => s + (p.exercises_total||0), 0);
    const successRate = totalEx > 0 ? Math.round((totalCorrect / totalEx) * 100) : null;

    host.innerHTML = `
      <h3 style="font-size:1.05rem; margin-bottom:14px;">${jsEscHtml(profile.name || '(sans nom)')}</h3>
      <div class="admin-stats-grid" style="margin-bottom:18px;">
        <div class="admin-stat"><span class="admin-stat-value">${completedCount}</span><span class="admin-stat-label">Chapitres terminés</span></div>
        <div class="admin-stat"><span class="admin-stat-value">${successRate !== null ? successRate + '%' : '—'}</span><span class="admin-stat-label">Réussite exercices</span></div>
        <div class="admin-stat"><span class="admin-stat-value">${profile.streak_count || 0}</span><span class="admin-stat-label">Jours d'affilée</span></div>
        <div class="admin-stat"><span class="admin-stat-value">${(sessions||[]).length}</span><span class="admin-stat-label">Appareils connus</span></div>
      </div>
      <div class="admin-row-meta" style="font-size:0.82rem; line-height:1.7;">
        Email : ${jsEscHtml(profile.email)}<br>
        Premium : ${profile.premium ? `oui, jusqu'au ${new Date(profile.premium_until).toLocaleDateString('fr-FR')}` : 'non'}<br>
        Inscrit le : ${new Date(profile.created_at).toLocaleDateString('fr-FR')}
      </div>
      <div class="field" style="margin-top:16px;">
        <label for="adminDetailLevel">Niveau universitaire</label>
        <select id="adminDetailLevel">
          <option value="L1" ${profile.level==='L1'?'selected':''}>Licence 1</option>
          <option value="L2" ${profile.level==='L2'?'selected':''}>Licence 2</option>
          <option value="L3PF" ${profile.level==='L3PF'?'selected':''}>Licence 3 — Physique Fondamentale</option>
          <option value="L3CF" ${profile.level==='L3CF'?'selected':''}>Licence 3 — Chimie Fondamentale</option>
          <option value="all" ${profile.level==='all'?'selected':''}>Toutes matières</option>
        </select>
      </div>
      <div class="admin-actions">
        <button class="btn btn-ghost" onclick="adminSaveLevel('${profile.id}')">Enregistrer le niveau</button>
        <button class="btn btn-ghost" onclick="adminToggleSuspend('${profile.id}', ${!profile.suspended})" style="${profile.suspended ? 'color:var(--teal);' : 'color:#B23A44;'}">${profile.suspended ? 'Réactiver le compte' : 'Suspendre le compte'}</button>
      </div>
      ${profile.suspended ? '<p class="admin-note" style="color:#B23A44;">Ce compte est actuellement suspendu — l\'étudiant ne peut pas se connecter.</p>' : ''}
      <button class="btn btn-ghost" style="margin-top:14px;" onclick="document.getElementById('adminUserDetail').style.display='none';">Fermer</button>
    `;
  }catch(e){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(e.message)}</p>`; }
}

async function adminSaveLevel(userId){
  const level = document.getElementById('adminDetailLevel').value;
  try{
    const { error } = await supabaseClient.from('profiles').update({ level }).eq('id', userId);
    if(error){ console.error('[adminSaveLevel]', error); return; }
    showAdminUserDetail(userId);
  }catch(e){ console.error('[adminSaveLevel]', e); }
}

async function adminToggleSuspend(userId, newSuspended){
  try{
    const { error } = await supabaseClient.from('profiles').update({ suspended: newSuspended }).eq('id', userId);
    if(error){ console.error('[adminToggleSuspend]', error); return; }
    showAdminUserDetail(userId);
    loadAdminUserList();
  }catch(e){ console.error('[adminToggleSuspend]', e); }
}

async function loadAdminPayments(){
  const host = document.getElementById('adminPaymentsList');
  if(!host || !supabaseClient) return;
  try{
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
    const { data, error } = await supabaseClient
      .from('chariow_processed_events')
      .select('email, processed_at')
      .order('processed_at', { ascending: false })
      .limit(30);
    if(error){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(error.message)}</p>`; return; }

    const thisMonth = (data || []).filter(p => p.processed_at >= monthStart);
    const PRIX_ESTIME = 2500; // tarif promo en vigueur — à ajuster ici après la promo
    document.getElementById('adminRevenueCount').textContent = thisMonth.length;
    document.getElementById('adminRevenueEstimate').textContent = (thisMonth.length * PRIX_ESTIME).toLocaleString('fr-FR');

    if(!data || data.length === 0){ host.innerHTML = '<p class="admin-list-empty">Aucun paiement enregistré.</p>'; return; }
    host.innerHTML = data.map(p => `
      <div class="admin-row">
        <div class="admin-row-main"><strong>${jsEscHtml(p.email)}</strong></div>
        <div class="admin-row-meta">${new Date(p.processed_at).toLocaleString('fr-FR')}</div>
      </div>`).join('');
  }catch(e){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(e.message)}</p>`; }
}

async function loadAdminCurrentAnnouncement(){
  const host = document.getElementById('adminCurrentAnnouncement');
  if(!host || !supabaseClient) return;
  try{
    const { data } = await supabaseClient.from('announcements').select('id, message, active').eq('active', true).order('created_at', { ascending: false }).limit(1).maybeSingle();
    if(!data){ host.innerHTML = '<p class="admin-list-empty">Aucune annonce active.</p>'; return; }
    host.innerHTML = `
      <div class="admin-row">
        <div class="admin-row-main"><strong>Annonce active</strong><div class="admin-row-meta">${jsEscHtml(data.message)}</div></div>
        <button class="btn btn-ghost" onclick="adminDeactivateAnnouncement(${data.id})">Retirer</button>
      </div>`;
  }catch(e){ console.error('[adminCurrentAnnouncement]', e); }
}

async function adminPublishAnnouncement(){
  const message = (document.getElementById('adminAnnouncementText').value || '').trim();
  const note = document.getElementById('adminAnnouncementNote');
  note.style.display = 'block';
  if(!message){ note.style.color = '#B23A44'; note.textContent = 'Écris un message.'; return; }
  try{
    // Une seule annonce active à la fois : on désactive les précédentes avant de publier.
    await supabaseClient.from('announcements').update({ active: false }).eq('active', true);
    const { error } = await supabaseClient.from('announcements').insert({ message });
    if(error){ note.style.color = '#B23A44'; note.textContent = 'Échec : ' + error.message; return; }
    note.style.color = 'var(--teal)'; note.textContent = '✓ Annonce publiée.';
    document.getElementById('adminAnnouncementText').value = '';
    loadAdminCurrentAnnouncement();
  }catch(e){ note.style.color = '#B23A44'; note.textContent = 'Erreur : ' + e.message; }
}

async function adminDeactivateAnnouncement(id){
  try{
    await supabaseClient.from('announcements').update({ active: false }).eq('id', id);
    loadAdminCurrentAnnouncement();
  }catch(e){ console.error('[adminDeactivateAnnouncement]', e); }
}

/* ---- Affichage de l'annonce active côté étudiant ----
   Un bandeau discret en haut du tableau de bord, différent à chaque nouvelle
   annonce (clé de dismiss basée sur l'id, donc une nouvelle annonce
   réapparaît même si une précédente avait été fermée). */
async function loadStudentAnnouncementBanner(){
  if(!supabaseClient || !currentUser) return;
  try{
    const { data } = await supabaseClient.from('announcements').select('id, message').eq('active', true).order('created_at', { ascending: false }).limit(1).maybeSingle();
    const dismissed = localStorage.getItem('esu-announcement-dismissed');
    let host = document.getElementById('studentAnnouncementBanner');
    if(!data || String(data.id) === dismissed){
      if(host) host.remove();
      return;
    }
    if(!host){
      host = document.createElement('div');
      host.id = 'studentAnnouncementBanner';
      host.style.cssText = 'position:sticky; top:0; z-index:150; background:linear-gradient(135deg, var(--blue), var(--violet)); color:#fff; padding:10px 20px; font-size:0.85rem; display:flex; justify-content:space-between; align-items:center; gap:12px;';
      document.body.prepend(host);
    }
    host.innerHTML = `<span>${jsEscHtml(data.message)}</span><button aria-label="Fermer" onclick="this.parentElement.remove(); localStorage.setItem('esu-announcement-dismissed','${data.id}');" style="background:none; border:none; color:#fff; font-size:1rem; cursor:pointer; flex-shrink:0;">✕</button>`;
  }catch(e){ console.error('[announcementBanner]', e); }
}

async function loadAdminSuspiciousList(){
  const host = document.getElementById('adminSuspiciousList');
  if(!host || !supabaseClient) return;
  try{
    const { data, error } = await supabaseClient
      .from('progress_audit_log')
      .select('user_id, domain, matiere, chapter, exercises_correct, exercises_total, created_at')
      .eq('suspicious', true)
      .gte('created_at', new Date(Date.now() - 7 * 86400000).toISOString())
      .order('created_at', { ascending: false })
      .limit(50);
    if(error){ host.innerHTML = `<p class="admin-list-empty">Erreur de chargement : ${jsEscHtml(error.message)}</p>`; return; }
    if(!data || data.length === 0){ host.innerHTML = '<p class="admin-list-empty">Rien à signaler cette semaine.</p>'; return; }
    host.innerHTML = data.map(r => `
      <div class="admin-row">
        <div class="admin-row-main">
          <strong>${jsEscHtml(r.domain||'')} / ${jsEscHtml(r.matiere||'')} / ${jsEscHtml(r.chapter||'')}</strong>
          <div class="admin-row-meta">${jsEscHtml(r.user_id)} — ${new Date(r.created_at).toLocaleString('fr-FR')}</div>
        </div>
        <span class="admin-row-tag">${r.exercises_correct}/${r.exercises_total}</span>
      </div>`).join('');
  }catch(e){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(e.message)}</p>`; }
}

async function loadAdminPartnerList(){
  const host = document.getElementById('adminPartnerList');
  if(!host || !supabaseClient) return;
  try{
    const { data, error } = await supabaseClient
      .from('referral_partners').select('id, name, chariow_url, active').order('name');
    if(error){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(error.message)}</p>`; return; }
    host.innerHTML = (data || []).map(p => `
      <div class="admin-row">
        <div class="admin-row-main">
          <strong>${jsEscHtml(p.name)}</strong>
          <div class="admin-row-meta">${jsEscHtml(p.chariow_url)}</div>
        </div>
        ${!p.active ? '<span class="admin-row-tag">Désactivé</span>' : ''}
        <button class="btn btn-ghost" onclick="adminTogglePartner(${p.id}, ${!p.active})">${p.active ? 'Désactiver' : 'Réactiver'}</button>
      </div>`).join('') || '<p class="admin-list-empty">Aucun parrain.</p>';
  }catch(e){ host.innerHTML = `<p class="admin-list-empty">Erreur : ${jsEscHtml(e.message)}</p>`; }
}

async function adminAddPartner(){
  const name = (document.getElementById('adminPartnerName').value || '').trim();
  const url = (document.getElementById('adminPartnerUrl').value || '').trim();
  const note = document.getElementById('adminPartnerNote');
  note.style.display = 'block';
  if(!name || !url){ note.style.color = '#B23A44'; note.textContent = 'Nom et lien requis.'; return; }
  try{
    const u = new URL(url);
    if(!/^https?:$/.test(u.protocol)) throw new Error('protocole invalide');
  }catch(e){ note.style.color = '#B23A44'; note.textContent = 'Lien invalide (doit commencer par https://).'; return; }
  try{
    const { error } = await supabaseClient.from('referral_partners').insert({ name, chariow_url: url });
    if(error){ note.style.color = '#B23A44'; note.textContent = 'Échec : ' + error.message; return; }
    note.style.color = 'var(--teal)'; note.textContent = `✓ ${name} ajouté.`;
    document.getElementById('adminPartnerName').value = '';
    document.getElementById('adminPartnerUrl').value = '';
    loadAdminPartnerList();
  }catch(e){ note.style.color = '#B23A44'; note.textContent = 'Erreur : ' + e.message; }
}

async function adminTogglePartner(id, newActive){
  try{
    const { error } = await supabaseClient.from('referral_partners').update({ active: newActive }).eq('id', id);
    if(error){ console.error('[adminTogglePartner]', error); return; }
    loadAdminPartnerList();
  }catch(e){ console.error('[adminTogglePartner]', e); }
}

/* contenu original du chapitre physique codé en dur dans le HTML : on le sauvegarde une
   seule fois au chargement pour pouvoir le restaurer après avoir affiché un autre chapitre
   rédigé (le registre MATH_TOOLS_CHAPTERS réutilise les mêmes conteneurs DOM). */
const ORIGINAL_AUTHORED_BODY = document.getElementById('coursePanelAuthored').innerHTML;
const ORIGINAL_AUTHORED_EXTRA = document.getElementById('chapAuthoredExtra').innerHTML;

/* (corps historique de openChapitre : appelé par le nouveau openChapitre défini plus bas,
   une fois le chunk de la matière chargé) */
function openChapitreNow(domainKey, matiereName, chapterIndex){
  const chapters = chaptersFor(matiereName);
  const chapterName = chapters[chapterIndex];
  const chapterKey = `${domainKey}|${matiereName}|${chapterName}`;
  currentChapterCtx = { domain: domainKey, matiere: matiereName, index: chapterIndex, chapters, chapterKey };
  currentChapterExerciseTally = { correct: 0, total: 0 };
  currentChapterWrongPoints = [];
  const mathChapter = (typeof MATH_TOOLS_CHAPTERS !== 'undefined') ? MATH_TOOLS_CHAPTERS[chapterKey] : null;
  const isAuthored = (chapterKey === AUTHORED_CHAPTER_KEY) || !!mathChapter;

  document.getElementById('chapitreBreadcrumb').innerHTML = `${domainKey} / ${matiereName} / <b>${chapterName}</b>`;
  document.getElementById('chapEyebrow').textContent = `Chapitre ${String(chapterIndex + 1).padStart(2, '0')} · ${domainKey}`;
  document.getElementById('chapTitle').textContent = chapterName;

  document.getElementById('coursePanelAuthored').style.display = isAuthored ? 'block' : 'none';
  document.getElementById('coursePanelGeneric').style.display = isAuthored ? 'none' : 'block';
  document.getElementById('chapAuthoredExtra').style.display = isAuthored ? 'block' : 'none';
  document.getElementById('chapGenericExtra').style.display = isAuthored ? 'none' : 'block';
  if(!isAuthored) document.getElementById('genericChapterName').textContent = chapterName;

  const metaObj = document.getElementById('chapObjectives');
  const metaPre = document.getElementById('chapPrereqs');

  if(mathChapter){
    document.getElementById('coursePanelAuthored').innerHTML = mathChapter.bodyHtml;
    document.getElementById('chapAuthoredExtra').innerHTML = mathChapter.extraHtml;
    metaObj.innerHTML = mathChapter.objectives.map(o => `<li>${o}</li>`).join('');
    metaPre.innerHTML = mathChapter.prereqs.map(p => `<span class="tag-chip">${p}</span>`).join('');
  } else if(chapterKey === AUTHORED_CHAPTER_KEY){
    document.getElementById('coursePanelAuthored').innerHTML = ORIGINAL_AUTHORED_BODY;
    document.getElementById('chapAuthoredExtra').innerHTML = ORIGINAL_AUTHORED_EXTRA;
    metaObj.innerHTML = `<li>Comprendre la deuxième loi de Newton et sa signification physique</li><li>Appliquer F = m·a pour calculer une accélération ou une force</li><li>Distinguer clairement masse et poids</li>`;
    metaPre.innerHTML = `<span class="tag-chip">Vecteurs</span><span class="tag-chip">Cinématique du point</span><span class="tag-chip">Notion de force</span>`;
  } else {
    metaObj.innerHTML = `<li>Comprendre les notions clés de « ${chapterName} »</li><li>Faire le lien avec les chapitres précédents de ${matiereName}</li><li>Se préparer aux exercices d'application</li>`;
    metaPre.innerHTML = chapterIndex > 0
      ? `<span class="tag-chip">${chapters[chapterIndex - 1]}</span>`
      : `<span class="tag-chip">Aucun — premier chapitre</span>`;
  }

  resetChatForChapter(matiereName, chapterName);
  showView('chapitre');
  refreshChapterCompletionUI();

  /* (ré)initialise les petites simulations JS du chapitre affiché, puis retypeset MathJax
     sur le nouveau contenu injecté (le reste du site n'utilise pas de formules LaTeX). */
  if(mathChapter && typeof mathChapter.init === 'function'){ mathChapter.init(); }
  /* MathJax est chargé à la demande (premier chapitre ouvert), puis retypeset le contenu */
  ensureMathJax().then(() => {
    if(window.MathJax && window.MathJax.typesetPromise){
      window.MathJax.typesetPromise([document.getElementById('coursePanelAuthored'), document.getElementById('chapAuthoredExtra')]).catch(() => {});
    }
  }).catch(() => {});
}

/* commencer directement le premier chapitre gratuit (bouton d'accueil) — n'affecte
   pas la règle d'accès elle-même, seulement le raccourci vers le premier chapitre. */
function startFirstFreeChapter(){
  const matieres = getMatieres(selectedLevel, 'Physique');
  if(matieres.length){ openChapitre('Physique', matieres[0].name, 0); }
  else { showView('accueil'); setTimeout(() => document.getElementById('matieres').scrollIntoView({behavior:'smooth'}), 60); }
}

function refreshChapterCompletionUI(){
  const btn = document.getElementById('completeChapterBtn');
  const status = document.getElementById('completeChapterStatus');
  if(!btn || !status || !currentChapterCtx) return;
  if(!currentUser){
    btn.textContent = 'Se connecter pour valider ce chapitre';
    btn.onclick = () => showView('connexion');
    btn.disabled = false;
    btn.classList.remove('btn-ghost'); btn.classList.add('btn-primary');
    status.textContent = '';
    return;
  }
  btn.onclick = completeCurrentChapter;
  const done = chapterProgressCache.includes(currentChapterCtx.chapterKey);
  btn.textContent = done ? '✓ Chapitre terminé' : 'Marquer ce chapitre comme terminé';
  btn.disabled = done;
  btn.classList.toggle('btn-ghost', done);
  btn.classList.toggle('btn-primary', !done);
  const isLast = currentChapterCtx.index >= currentChapterCtx.chapters.length - 1;
  if(!done){ status.textContent = ''; return; }
  status.innerHTML = isLast
    ? 'Dernier chapitre de cette matière — bravo !'
    : `<a href="#" onclick="openChapitre('${jsEsc(currentChapterCtx.domain)}','${jsEsc(currentChapterCtx.matiere)}',${currentChapterCtx.index + 1}); return false;" style="color:var(--blue); font-weight:600;">Passer au chapitre suivant →</a>`;
}

async function completeCurrentChapter(){
  if(!currentUser){ showView('connexion'); return; }
  if(!currentChapterCtx) return;
  const tally = currentChapterExerciseTally;

  if(tally.total > 0){
    const rate = tally.correct / tally.total;
    if(rate < 0.70){
      startRemediationCooldown(rate);
      return;
    }
  }

  await markChapterComplete(
    currentChapterCtx.domain, currentChapterCtx.matiere, currentChapterCtx.chapters[currentChapterCtx.index],
    tally.total > 0 ? tally.correct : undefined, tally.total > 0 ? tally.total : undefined
  );
  refreshChapterCompletionUI();
  loadRealProgress();
}

/* ---- Règle des 70% : cooldown de remédiation + explication IA ciblée ----
   Sous 70% de bonnes réponses, le chapitre n'est pas validé. On impose une
   pause de 1 min 30 avant de pouvoir retenter (le temps de relire le cours),
   pendant laquelle Nova explique différemment les points ratés. */
let remediationTimer = null;

function startRemediationCooldown(rate){
  const btn = document.getElementById('completeChapterBtn');
  const status = document.getElementById('completeChapterStatus');
  if(!btn || !status) return;

  const exerciseButtons = document.querySelectorAll('#view-chapitre .exercises button, #view-chapitre .exercise-card button');
  exerciseButtons.forEach(b => b.disabled = true);
  btn.disabled = true;

  const pct = Math.round(rate * 100);
  let remaining = 90;
  status.innerHTML = `<strong style="color:#B23A44;">${pct}% de bonnes réponses — il en faut 70% pour valider ce chapitre.</strong><br>Relis le cours ci-dessus pendant la pause. Nouvelle tentative possible dans <span id="remediationCountdown">1:30</span>.`;

  requestRemediationExplanation();

  if(remediationTimer) clearInterval(remediationTimer);
  remediationTimer = setInterval(() => {
    remaining--;
    const el = document.getElementById('remediationCountdown');
    if(el) el.textContent = `${Math.floor(remaining/60)}:${String(remaining%60).padStart(2,'0')}`;
    if(remaining <= 0){
      clearInterval(remediationTimer);
      remediationTimer = null;
      endRemediationCooldown();
    }
  }, 1000);
}

function endRemediationCooldown(){
  // Réinitialise les exercices du chapitre pour une vraie nouvelle tentative.
  Object.keys(examScores).forEach(k => delete examScores[k]);
  currentChapterExerciseTally = { correct: 0, total: 0 };
  currentChapterWrongPoints = [];
  document.querySelectorAll('#view-chapitre .exercises input[type="radio"], #view-chapitre .exercise-card input[type="radio"]').forEach(r => r.checked = false);
  document.querySelectorAll('#view-chapitre .exercises .feedback, #view-chapitre .exercise-card .feedback').forEach(f => { f.style.display = 'none'; f.textContent = ''; });
  document.querySelectorAll('#view-chapitre .exercises button, #view-chapitre .exercise-card button').forEach(b => b.disabled = false);

  const btn = document.getElementById('completeChapterBtn');
  const status = document.getElementById('completeChapterStatus');
  if(btn) btn.disabled = false;
  if(status) status.innerHTML = '✓ Tu peux retenter les exercices — bon courage !';
  appendAiMessage("La pause est terminée — les exercices sont réinitialisés. Prends ton temps, relis un point si besoin, et retente quand tu es prêt(e) 💪");
}

/* Demande à Nova une explication plus claire, ciblée sur ce qui a posé problème,
   sans attendre que l'étudiant tape lui-même la question. */
async function requestRemediationExplanation(){
  if(currentChapterWrongPoints.length === 0) return;
  const pointsList = [...new Set(currentChapterWrongPoints)].slice(0, 4).join(' / ');
  appendAiMessage(`<i style="opacity:.6;">Nova prépare une explication plus détaillée sur les points ratés…</i>`, 'novaRemediation');

  const ctx = buildChapterContext();
  const prompt = `L'étudiant(e) vient d'échouer les exercices de ce chapitre (moins de 70% de réussite), en particulier sur : ${pointsList}. Explique ces points différemment qu'un simple rappel — avec une autre approche, une analogie ou un exemple concret — pour que ce soit plus clair à la deuxième lecture. Reste concis (5-6 phrases), en français.`;

  const finish = (text) => {
    document.getElementById('novaRemediation')?.remove();
    appendAiMessage(text);
    chatHistory.push({ role: 'assistant', content: text });
  };

  if(supabaseClient){
    supabaseClient.functions.invoke('ai-chat', {
      body: { message: prompt, chapterTitle: ctx.title, chapterSummary: ctx.summary, programme: ctx.programme, history: [] }
    }).then(({ data, error }) => {
      if(!error && data && data.reply){ finish(jsEscHtmlKeepLines(data.reply)); }
      else { finish(`Reprenons différemment : ${pointsList}. Relis attentivement le passage du cours qui correspond, souvent une seule relecture ciblée suffit à débloquer ce genre de point.`); }
    }).catch(() => {
      finish(`Reprenons différemment : ${pointsList}. Relis attentivement le passage du cours qui correspond, souvent une seule relecture ciblée suffit à débloquer ce genre de point.`);
    });
  } else {
    finish(`Reprenons différemment : ${pointsList}. Relis attentivement le passage du cours qui correspond.`);
  }
}

/* Redirige réellement vers ta boutique Chariow. L'email est transmis en paramètre
   pour aider à retrouver l'acheteur — mais la vraie activation "premium" doit venir
   du Pulse (webhook) Chariow → Supabase Edge Function, pas de cette redirection.

   Tarif : le lien normal (CHARIOW_URL) sert le premier abonnement, à 3 500 FCFA
   (ou 3 000 FCFA si un lien de parrainage est enregistré, voir plus bas — et 2 500 FCFA
   pendant la promotion en cours jusqu'au 20 novembre 2026, voir PROMO_END ci-dessous,
   qui prime alors sur le tarif de parrainage car c'est le prix le plus bas des deux).
   Dès que l'étudiant renouvelle SANS avoir laissé son abonnement expirer (donc à
   partir de son 2e abonnement, tant que la série de renouvellements est maintenue),
   il est dirigé vers CHARIOW_URL_RENEWAL à 2 500 FCFA (tarif fidélité, indépendant de
   la promo : il reste à 2 500 FCFA même après le 20 novembre 2026). hasFullAccess(currentUser)
   est vrai uniquement si l'abonnement en cours n'est pas encore expiré : c'est
   exactement ce qui distingue un "renouvellement dans la série" d'un nouvel
   abonnement après une interruption (qui repasse alors par le tarif normal). */
const CHARIOW_URL = 'https://asoptooj.mychariow.store/e-studentuniversity';
const CHARIOW_URL_RENEWAL = 'https://asoptooj.mychariow.store/e-studentuniversity2?draft=true';

/* ---- promotion temporaire ----
   Du lancement jusqu'au 20 novembre 2026 inclus, le tarif affiché (hors renouvellement
   qui a son propre tarif fidélité à 2 500 FCFA, inchangé) passe à 2 500 FCFA — que
   l'étudiant ait ou non un lien de parrainage enregistré, puisque 2 500 FCFA est déjà
   inférieur au tarif de parrainage (3 000 FCFA). Passé cette date, l'affichage revient
   automatiquement au tarif normal (3 500 FCFA) ou de parrainage (3 000 FCFA). */
const PROMO_END = new Date('2026-11-20T23:59:59');
function isPromoActive(){ return new Date() <= PROMO_END; }

/* Filet de sécurité : si un visiteur laisse la page d'abonnement ouverte sans la
   recharger ni y renaviguer, ce minuteur revérifie toutes les minutes si la promo
   vient de se terminer et rafraîchit alors le prix, le badge et les textes affichés
   automatiquement — sans qu'il ait besoin de recharger la page lui-même. */
setInterval(() => {
  const paywallEl = document.getElementById('view-paywall');
  if(paywallEl && paywallEl.style.display !== 'none'){ updatePaywallPriceDisplay(); }
}, 60000);

/* ---- lien de paiement personnalisé, transmis par un parrain ----
   Si l'étudiant colle ici le lien de paiement de son parrain, on l'utilise
   à la place des liens Chariow par défaut au moment de payer, et le tarif
   affiché passe à 3 000 FCFA (au lieu de 3 500 FCFA au tarif normal) — sauf
   pendant la promotion, où le tarif promo à 2 500 FCFA prime car plus avantageux. */
/* ---- parrainage : liste fixe de parrains connus ----
   Remplace l'ancien système où l'étudiant collait lui-même une URL de
   paiement arbitraire (risque de phishing : n'importe qui pouvait faire
   passer un faux lien de paiement pour un "lien de parrain" et l'app le
   redirigeait sans aucune vérification). Ici, seuls les liens que TOI tu
   as ajoutés ci-dessous peuvent être utilisés — l'étudiant choisit juste
   un nom dans une liste.

   À REMPLIR : ajoute une entrée par parrain, avec son vrai lien Chariow.
   Exemple :
     'Awa Traoré': 'https://asoptooj.mychariow.store/lien-awa',
*/
/* ---- parrainage : liste chargée depuis Supabase (table referral_partners) ----
   Avant : liste codée en dur dans ce fichier (REFERRAL_PARTNERS), il fallait
   redéployer pour en ajouter un. Maintenant : gérable depuis l'espace admin,
   sans toucher au code. En cache localement pour un affichage instantané et
   un repli si hors-ligne. */
let REFERRAL_PARTNERS = {};
try{
  const cached = JSON.parse(localStorage.getItem('esu-referral-partners-cache') || '{}');
  REFERRAL_PARTNERS = cached;
}catch(e){}

async function loadReferralPartners(){
  if(!supabaseClient) return;
  try{
    const { data, error } = await supabaseClient
      .from('referral_partners').select('name, chariow_url').eq('active', true).order('name');
    if(error){ console.error('[referral_partners]', error); return; }
    REFERRAL_PARTNERS = {};
    (data || []).forEach(p => { REFERRAL_PARTNERS[p.name] = p.chariow_url; });
    try{ localStorage.setItem('esu-referral-partners-cache', JSON.stringify(REFERRAL_PARTNERS)); }catch(e){}
    populateReferralSelect();
  }catch(e){ console.error('[referral_partners]', e); }
}

function getReferralPartnerName(){
  try{ return localStorage.getItem('esu-referral-partner') || ''; }catch(e){ return ''; }
}
function getReferralLink(){
  const name = getReferralPartnerName();
  return (name && REFERRAL_PARTNERS[name]) ? REFERRAL_PARTNERS[name] : '';
}
function populateReferralSelect(){
  const select = document.getElementById('referralSelect');
  if(!select) return;
  const current = getReferralPartnerName();
  const names = Object.keys(REFERRAL_PARTNERS);
  select.innerHTML = '<option value="">— Aucun parrain —</option>'
    + names.map(name => `<option value="${jsEscHtml(name)}"${name === current ? ' selected' : ''}>${jsEscHtml(name)}</option>`).join('');
}
function updatePaywallPriceDisplay(){
  const priceEl = document.getElementById('pwPrice');
  if(!priceEl) return;
  populateReferralSelect();
  const hasReferral = !!getReferralLink();
  const promo = isPromoActive();
  const strikeEl = document.getElementById('pwPriceStrike');
  const mainEl = document.getElementById('pwPriceMain');
  const badgeEl = document.getElementById('pwPromoBadge');
  const promoNoteEl = document.getElementById('pwPromoNote');
  const unlockNoteEl = document.getElementById('pwUnlockNote');
  /* hiérarchie des tarifs, du plus bas au plus haut : promo (2 500) < parrainage (3 000) < normal (3 500).
     La promo l'emporte toujours quand elle est active, car c'est le prix le plus avantageux —
     et ce, peu importe le moyen de paiement utilisé (lien direct ou lien de parrainage). */
  const price = promo ? '2 500 FCFA' : (hasReferral ? '3 000 FCFA' : '3 500 FCFA');
  const showDiscount = promo || hasReferral;
  if(mainEl) mainEl.textContent = price;
  if(strikeEl) strikeEl.style.display = showDiscount ? 'inline' : 'none';
  if(badgeEl) badgeEl.style.display = promo ? 'block' : 'none';
  if(promoNoteEl) promoNoteEl.style.display = promo ? 'block' : 'none';
  if(unlockNoteEl){
    unlockNoteEl.innerHTML = promo
      ? `Tu seras redirigé vers notre page de paiement sécurisée (Chariow), ou vers celle de ton parrain si tu en as choisi un ci-dessus — le tarif promo à <b>2 500 FCFA</b> s'applique dans tous les cas jusqu'au 20 novembre 2026. Utilise <b>le même email</b> que ton compte E-Student pour un déblocage automatique juste après le paiement.`
      : `Tu seras redirigé vers notre page de paiement sécurisée (Chariow), ou vers celle de ton parrain si tu en as choisi un ci-dessus. Utilise <b>le même email</b> que ton compte E-Student pour un déblocage automatique juste après le paiement.`;
  }
  const savedNote = document.getElementById('referralSavedNote');
  if(savedNote) savedNote.style.display = hasReferral ? 'block' : 'none';
}
function saveReferralLink(){
  const select = document.getElementById('referralSelect');
  const name = select ? select.value : '';
  try{
    if(name){ localStorage.setItem('esu-referral-partner', name); }
    else{ localStorage.removeItem('esu-referral-partner'); }
  }catch(e){}
  updatePaywallPriceDisplay();
}

/* Pendant la promotion (jusqu'au 20 novembre 2026), le lien de paiement par défaut
   (celui utilisé quand l'étudiant n'a pas de lien de parrainage enregistré) bascule
   sur CHARIOW_URL_RENEWAL — le lien fidélité à 2 500 FCFA — au lieu du lien normal
   CHARIOW_URL à 3 500 FCFA. Cela garantit que le tarif réellement facturé correspond
   bien au tarif promo affiché sur la page. Un lien de parrainage enregistré garde la
   priorité (l'étudiant a fait un choix explicite), tout comme le lien de renouvellement
   pour un abonné déjà actif. Passé le 20 novembre 2026, le comportement redevient normal. */
function goToPayment(){
  const referralLink = getReferralLink();
  const promo = isPromoActive();
  const baseUrl = referralLink || ((hasFullAccess(currentUser) || promo) ? CHARIOW_URL_RENEWAL : CHARIOW_URL);
  const url = currentUser
    ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}email=${encodeURIComponent(currentUser.email)}`
    : baseUrl;
  window.open(url, '_blank', 'noopener');
}

/* fond vivant : léger parallax du champ d'orbites au scroll */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!prefersReducedMotion){
  const orbitField = document.querySelector('.sky-bg .orbit-field');
  window.addEventListener('scroll', () => {
    if(orbitField) orbitField.style.transform = `translateY(${window.scrollY * 0.04}px)`;
  }, {passive:true});
}

/* scroll reveal — appliqué largement (cartes de contenu, listes de chapitres/
   révisions, points clés...) et pas seulement aux blocs marqués .reveal dans le
   HTML statique. Un MutationObserver couvre aussi le contenu généré dynamiquement
   (listes de chapitres, résultats de recherche...) sans avoir à toucher chaque
   template. */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => { if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('in'), i*60); io.unobserve(e.target); } });
}, {threshold:0.15});
const REVEAL_SELECTOR = '.reveal, .chapter-item, .revision-item, .key-point, .element-card, .search-hit, .overview-card';
function tagAndObserveReveal(root){
  root.querySelectorAll(REVEAL_SELECTOR).forEach(el => {
    if(el.dataset.revealBound) return;
    el.dataset.revealBound = '1';
    el.classList.add('reveal');
    io.observe(el);
  });
}
function processRevealNode(node){
  if(node.nodeType !== 1) return;
  if(node.matches && node.matches(REVEAL_SELECTOR) && !node.dataset.revealBound){
    node.dataset.revealBound = '1'; node.classList.add('reveal'); io.observe(node);
  }
  tagAndObserveReveal(node);
}
tagAndObserveReveal(document);
if(!prefersReducedMotion){
  new MutationObserver((mutations) => {
    mutations.forEach(m => m.addedNodes.forEach(processRevealNode));
  }).observe(document.body, {childList:true, subtree:true});
}

/* affiche le niveau choisi au-dessus du dashboard — la progression réelle
   (jauges, barres, stats) est entièrement gérée par loadRealProgress() */
let dashAnimated = false;
function animateDashboard(){
  document.getElementById('dashLevelBadge').innerHTML = `🎓 ${LEVEL_LABELS[selectedLevel] || selectedLevel} <a href="#" onclick="showView('niveau'); return false;">changer</a>`;
  dashAnimated = true;
}

/* recherche globale de matière, tous niveaux et domaines confondus */
function normalize(str){
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
}
function filterSubjects(){
  const q = normalize(document.getElementById('subjectSearch').value.trim());
  const grid = document.getElementById('subjectsGrid');
  const results = document.getElementById('searchResults');
  const noRes = document.getElementById('noResults');

  if(q.length === 0){
    grid.style.display = '';
    results.style.display = 'none';
    results.innerHTML = '';
    noRes.style.display = 'none';
    return;
  }

  const hits = [];
  LEVEL_ORDER.forEach(lv => {
    DOMAINS.forEach(d => {
      const list = (LEVEL_DATA[lv] && LEVEL_DATA[lv][d.key]) || [];
      list.forEach((name, idx) => {
        if(normalize(name).includes(q)) hits.push({ level: lv, domain: d.key, name, idx, accent: d.accent, symbol: d.symbol });
      });
    });
  });

  grid.style.display = 'none';
  if(hits.length === 0){
    results.style.display = 'none';
    noRes.style.display = 'block';
    return;
  }
  noRes.style.display = 'none';
  results.style.display = 'flex';
  results.innerHTML = hits.map(h => `
    <div class="search-hit" style="--accent:${h.accent};" onclick="jumpToMatiere('${h.level}','${h.domain}',${h.idx})">
      <span class="search-hit-symbol" translate="no">${h.symbol}</span>
      <div><strong>${h.name}</strong><span class="search-hit-meta">${h.domain} · ${LEVEL_LABELS[h.level]}</span></div>
    </div>`).join('');
}

function jumpToMatiere(level, domainKey, idx){
  selectedLevel = level;
  renderLevelChips(level);
  renderSubjects(level);
  document.getElementById('subjectSearch').value = '';
  filterSubjects();
  openMatiereDetail(domainKey, idx);
}
document.getElementById('subjectSearch').addEventListener('input', filterSubjects);

/* exercise checking — alimente aussi l'exercice adaptatif et le vrai comptage par chapitre */
const examScores = {};
function checkAnswer(name, fbId){
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  const fb = document.getElementById(fbId);
  fb.style.display = 'block';
  if(!selected){ fb.className='feedback incorrect'; fb.textContent='Sélectionne une réponse avant de vérifier.'; return; }
  const correct = selected.value === 'right';
  const alreadyAnswered = examScores[name] !== undefined;
  examScores[name] = correct;
  if(!alreadyAnswered){
    currentChapterExerciseTally.total++;
    if(correct) currentChapterExerciseTally.correct++;
  }
  if(correct){
    fb.className='feedback correct';
    fb.textContent='Correct — F = m·a donne directement le résultat en divisant la force par la masse.';
  } else {
    fb.className='feedback incorrect';
    fb.textContent='Pas tout à fait. Reviens à F = m·a : isole l\'accélération en divisant la force par la masse.';
    if(!alreadyAnswered) currentChapterWrongPoints.push('Isoler l\'accélération dans F = m·a (division par la masse, pas la force)');
  }
  maybeRevealAdaptive();
}

/* exercice 3 adapté selon la performance aux deux premiers */
function maybeRevealAdaptive(){
  if(examScores.ex1 === undefined || examScores.ex2 === undefined) return;
  if(currentChapterCtx){
    markChapterComplete(
      currentChapterCtx.domain, currentChapterCtx.matiere, currentChapterCtx.chapters[currentChapterCtx.index],
      currentChapterExerciseTally.correct, currentChapterExerciseTally.total
    );
    loadRealProgress();
  }
  const box = document.getElementById('exercise3');
  const label = document.getElementById('ex3Label');
  const q = document.getElementById('ex3Question');
  const sol = document.getElementById('ex3Solution');
  const bothRight = examScores.ex1 && examScores.ex2;
  box.style.display = 'block';
  if(bothRight){
    label.textContent = 'Exercice 3 — niveau avancé (tu maîtrises bien !)';
    q.textContent = "Deux masses (3 kg et 5 kg) sont reliées par un fil passant sur une poulie sans frottement. Quelle est l'accélération du système ? (g = 9,8 m/s²)";
    sol.textContent = 'Solution : a = (m2 − m1)·g / (m1 + m2) = (5 − 3) × 9,8 / 8 ≈ 2,45 m/s².';
  } else {
    label.textContent = 'Exercice 3 — renforcement';
    q.textContent = "Reprends l'exercice 1 : si la force était de 20 N au lieu de 10 N (même masse de 2 kg), quelle serait l'accélération ?";
    sol.textContent = 'Solution : a = F / m = 20 / 2 = 10 m/s².';
  }
  box.scrollIntoView({behavior:'smooth', block:'nearest'});
}

/* correction d'exercice générique et réutilisable (contrairement à checkAnswer, qui est
   câblée en dur sur les messages du chapitre "Dynamique du point matériel") : chaque
   exercice fournit son propre message de réussite/échec. */
function checkAnswerGeneric(name, fbId, correctMsg, incorrectMsg){
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  const fb = document.getElementById(fbId);
  if(!fb) return;
  fb.style.display = 'block';
  if(!selected){ fb.className = 'feedback incorrect'; fb.textContent = 'Sélectionne une réponse avant de vérifier.'; return; }
  const correct = selected.value === 'right';
  const alreadyAnswered = examScores[name] !== undefined;
  examScores[name] = correct;
  if(!alreadyAnswered){
    currentChapterExerciseTally.total++;
    if(correct){ currentChapterExerciseTally.correct++; }
    else { currentChapterWrongPoints.push(incorrectMsg || 'Un point du cours à revoir'); }
  }
  fb.className = correct ? 'feedback correct' : 'feedback incorrect';
  fb.textContent = correct ? (correctMsg || 'Correct !') : (incorrectMsg || 'Pas tout à fait — relis le point clé ci-dessus et réessaie.');
  if(currentChapterCtx){
    markChapterComplete(
      currentChapterCtx.domain, currentChapterCtx.matiere, currentChapterCtx.chapters[currentChapterCtx.index],
      currentChapterExerciseTally.correct, currentChapterExerciseTally.total
    );
    loadRealProgress();
  }
}

/* simulateur de pendule simple : T = 2π√(L/g) */
function updatePendulum(){
  const L = parseFloat(document.getElementById('lengthSlider').value);
  document.getElementById('lengthValue').textContent = L.toFixed(1);
  const T = 2 * Math.PI * Math.sqrt(L / 9.81);
  document.getElementById('periodValue').textContent = T.toFixed(2);
  document.getElementById('pendulumArm').style.animationDuration = T + 's';
  const rodEnd = 20 + (40 + L * 45);
  document.getElementById('pendulumRod').setAttribute('y2', rodEnd);
  document.getElementById('pendulumBob').setAttribute('cy', rodEnd);
}

/* ===================================================================
   Nova — mentor IA 100% LOCAL et gratuit : aucun appel réseau, aucune
   clé API, aucun coût. Un moteur à base de règles + petit calcul réel,
   propre à chaque chapitre et matière, pensé comme un compagnon
   d'étude — pas une IA généraliste dans le cloud.
=================================================================== */
let chatHistory = [];
const hintAskCount = {};

const NOVA_KB = {
  'Physique|Mécanique du point matériel|Dynamique du point matériel': {
    intro: "Salut, moi c'est Nova ! On est sur le chapitre « Dynamique du point matériel ». Pose-moi une question sur le cours, donne-moi des valeurs (ex : « 2 kg, 10 N ») pour que je calcule, ou demande un indice sur un exercice.",
    rules: [
      { test:/poids|masse/i, replies:[
        "La masse (en kg) mesure l'inertie d'un objet — sa résistance au changement de mouvement. Le poids, lui, est une force (en N) qui dépend de la gravité : P = m·g. Sur la Lune, ta masse ne change pas, mais ton poids diminue.",
        "Astuce pour ne plus confondre : la masse se mesure avec une balance et ne change jamais de valeur ; le poids se calcule (P = m·g) et varie selon où tu es dans l'univers."
      ]},
      { test:/f\s*=\s*m|newton|deuxième loi|2e loi|2ème loi/i, replies:[
        "La deuxième loi de Newton dit que F = m·a : la force résultante appliquée à un objet est proportionnelle à son accélération, avec la masse comme facteur. Double la force → double l'accélération, à masse constante.",
        "Pense à F = m·a comme une balance à trois plateaux : si tu connais deux des trois grandeurs (force, masse, accélération), tu peux toujours trouver la troisième."
      ]},
      { test:/résultante|plusieurs forces|somme.*force/i, replies:[
        "Quand plusieurs forces agissent en même temps, on additionne leurs vecteurs (pas juste leurs valeurs) pour obtenir la force résultante. C'est cette résultante qu'on utilise dans F = m·a."
      ]},
      { test:/exercice\s*1|premier exercice/i, hint: true, replies:[
        "Pour l'exercice 1 : la formule à utiliser est F = m·a. Tu cherches quelle grandeur exactement ?",
        "Indice niveau 2 : isole l'accélération dans F = m·a, donc a = F / m. Remplace avec les valeurs de l'énoncé.",
        "Indice niveau 3 (presque la solution) : ici m = 2 kg et F = 10 N, donc a = 10 / 2 = 5 m/s². Vérifie que tu retrouves bien ce calcul."
      ]},
      { test:/exercice\s*2|deuxième exercice|2e exercice/i, hint: true, replies:[
        "Pour l'exercice 2 : repars de a = F / m et demande-toi ce qui se passe si m double dans cette fraction.",
        "Indice niveau 2 : F/m avec m qui double devient F/(2m) — donc a est divisée par 2, pas multipliée.",
        "Indice niveau 3 : la réponse est « l'accélération est divisée par deux », car m est au dénominateur : plus il grandit, plus a diminue, à force égale."
      ]},
      { test:/pendule|période|oscillation/i, replies:[
        "Le simulateur de pendule montre que T = 2π√(L/g) : la période dépend seulement de la longueur du fil (et de g), pas de la masse du pendule. Essaie de faire varier la longueur pour voir l'effet."
      ]},
      { test:/vecteur/i, replies:[
        "Un vecteur a une direction, un sens et une intensité — contrairement à un simple nombre. F et a sont des vecteurs : leur direction compte autant que leur valeur."
      ]}
    ]
  }
};
/* ===================================================================
   CHARGEMENT À LA DEMANDE DES COURS  (optimisation des performances)
   -------------------------------------------------------------------
   AVANT : tout le contenu pédagogique (≈ 9 Mo) était dans ce fichier, donc
   téléchargé + analysé par le navigateur avant que la moindre page réagisse.
   MAINTENANT : ce fichier ne contient que le noyau de la plateforme (interface,
   comptes, progression, Nova). Le contenu des cours vit dans chunks/<id>.js
   (un fichier par matière) et n'est chargé qu'au premier accès à un chapitre de
   cette matière — voir loadChunk() et openChapitre() ci-dessous.

   ➜ Pour ÉDITER un chapitre : ouvrir chunks/<id>.js (id = nom du registre en
     minuscules : THD -> chunks/thd.js). Rien à changer ici.
   ➜ Pour AJOUTER UNE NOUVELLE MATIÈRE : créer chunks/<id>.js (même schéma que
     les autres), puis ajouter UNE ligne dans CHUNK_INDEX (« Domaine|Matière »),
     et sa liste de chapitres dans la section REAL_CHAPTERS ci-dessous.
   ➜ Pour ajouter/renommer un TITRE de chapitre d'une matière existante : modifier
     la liste REAL_CHAPTERS[...] ci-dessous ET la clé xxxKey('Titre') dans le chunk.
=================================================================== */

/* registre agrégé de tous les chapitres rédigés : chaque chunk y fusionne son
   contenu (Object.assign) au moment où il est chargé */
const MATH_TOOLS_CHAPTERS = {};

/* ===================================================================
   LISTES DE CHAPITRES PAR MATIÈRE
   (extraites des anciens modules : elles sont nécessaires dès l'accueil pour
   afficher les matières et compter les chapitres, donc elles restent dans le
   noyau ; seul le CONTENU des chapitres est chargé à la demande)
=================================================================== */

REAL_CHAPTERS["Chimie des matériaux inorganiques"] = [
  'Introduction aux matériaux inorganiques : classification, liaisons et propriétés',
  'L\'état cristallin : réseaux de Bravais, mailles et systèmes cristallins',
  'Structures cristallines des solides inorganiques et diffraction des rayons X',
  'Défauts cristallins, non-stœchiométrie et solutions solides',
  'Diagrammes de phases et transformations à l\'état solide',
  'Céramiques techniques et matériaux réfractaires',
  'Verres et matériaux amorphes',
  'Matériaux fonctionnels : semi-conducteurs, magnétiques et supraconducteurs'
];

REAL_CHAPTERS["Chimie des polymères"] = [
  'Macromolécules : définitions, types et polymolécularité',
  'La chaîne polymère : structure, stéréochimie et propriétés',
  'Synthèse des polymères : polymérisation, polyaddition et polycondensation',
  'Mécanismes de polymérisation en chaîne et télomérisation'
];

REAL_CHAPTERS["Fonctions organiques mixtes et mécanismes réactionnels"] = [
  'Mécanismes réactionnels : substitutions nucléophiles et β-éliminations',
  'Additions nucléophiles sur les composés carbonylés',
  'Substitution nucléophile sur le carbone acyle : chimie des dérivés d\'acides',
  'Substitution électrophile aromatique (SEAr)',
  'Oxydoréduction et interconversion des fonctions organiques'
];

REAL_CHAPTERS["Chimie des solutions"] = [
  'Généralités sur les solutions aqueuses',
  'Réactions acido-basiques : définitions et constantes',
  'Calculs de pH en solution aqueuse',
  'Titrages acido-basiques',
  'Réactions de complexation',
  'Réactions de précipitation',
  'Réactions d\'oxydoréduction en solution'
];

if(!REAL_CHAPTERS["Électrocinétique"]){
  REAL_CHAPTERS["Électrocinétique"] = ['Lois fondamentales des circuits électriques','Dipôles, associations et théorèmes généraux','Régime transitoire : circuits RC et RL','Régime sinusoïdal permanent'];
}

REAL_CHAPTERS["Thermodynamique"] = [
  'Description des systèmes thermodynamiques : variables d\'état et équilibre',
  'Le gaz parfait et la théorie cinétique des gaz',
  'Premier principe de la thermodynamique',
  'Deuxième principe : entropie et évolutions irréversibles',
  'Machines thermiques : cycles, moteurs et réfrigérateurs',
  'Potentiels thermodynamiques : enthalpie, énergie libre, enthalpie libre',
  'Changements d\'état des corps purs et diagrammes de phases',
  'Transferts thermiques : conduction, convection, rayonnement'
];

if(!REAL_CHAPTERS["Sécurité et environnement"]){
  REAL_CHAPTERS["Sécurité et environnement"] = ['Hygiène, sécurité et environnement : concepts et structure HSE','Accidents de travail : danger, risque et enquête','Phénomènes d\'incendie et d\'explosion','Gestion des risques chimiques'];
}

if(!REAL_CHAPTERS["Ondes électromagnétiques et relativité restreinte"]){
  REAL_CHAPTERS["Ondes électromagnétiques et relativité restreinte"] = ['Mécanique classique et ses limites','Bases de la relativité restreinte','Cinématique relativiste','Espace-temps et quadrivecteurs','Propagation des ondes et relativité','Dynamique relativiste','Électromagnétisme relativiste'];
}

REAL_CHAPTERS["Électromagnétisme"] = [
  'Introduction : forces fondamentales, champs et force de Lorentz',
  'Systèmes de coordonnées et calcul vectoriel',
  'Flux d\'un champ vectoriel, loi de Gauss et divergence',
  'Potentiel électrostatique, travail et gradient',
  'Distributions de charges, énergie électrostatique et rotationnel',
  'Conducteurs à l\'équilibre et rigidité diélectrique',
  'Courants électriques, conservation de la charge et loi d\'Ohm',
  'Magnétostatique : loi de Biot-Savart, force de Laplace et loi d\'Ampère',
  'Opérateur nabla et théorèmes intégraux',
  'Induction électromagnétique : loi de Faraday et inductance',
  'Équations de Maxwell et équation de propagation des ondes',
  'Ondes électromagnétiques planes progressives monochromatiques',
  'Énergie électromagnétique et vecteur de Poynting',
  'Propagation dans les milieux matériels : diélectriques et conducteurs',
  'Réflexion et réfraction des ondes électromagnétiques aux interfaces'
];

REAL_CHAPTERS["Optique géométrique"] = [
  'Notions fondamentales sur la lumière',
  'Miroir plan : réflexion et formation des images',
  'Dioptre plan : réfraction et réflexion totale',
  'Le prisme optique',
  'Miroir sphérique',
  'Dioptre sphérique',
  'Lentilles minces',
  'L\'œil : modèle réduit et défauts de la vision'
];

REAL_CHAPTERS["Optique physique"] = [
  'Bases de l\'optique ondulatoire : OPPM et détection de la lumière',
  'Interférences à deux ondes : cohérence et interféromètre de Michelson',
  'Interférences à ondes multiples : réseaux et spectroscopie',
  'Diffraction : fente, ouverture circulaire et limite de résolution'
];

REAL_CHAPTERS["Électronique"] = [
  'Physique des semi-conducteurs : du cristal de silicium à la jonction PN',
  'La diode à jonction : caractéristique, modèles et types particuliers',
  'Applications de la diode : redressement, filtrage et régulation de tension',
  'Le transistor bipolaire : structure, régimes de fonctionnement et polarisation',
  'Le transistor bipolaire en amplification : modèle petits signaux et montages fondamentaux',
  'Le transistor à effet de champ : JFET et MOSFET',
  'L\'amplificateur opérationnel : modèle idéal et montages linéaires fondamentaux',
  'Montages non linéaires, filtres actifs et introduction à l\'électronique numérique',
  'Les quadripôles : représentations matricielles et association',
  'Filtres actifs d\'ordre supérieur, diagrammes de Bode et gabarits'
];

REAL_CHAPTERS["Atomistique et liaisons chimiques"] = [
  'Structure de l\'atome : noyau, électron et identification des éléments',
  'Le modèle de Bohr et la quantification de l\'énergie',
  'Nombres quantiques et description des orbitales atomiques',
  'Configuration électronique des atomes : règles de remplissage',
  'Classification périodique des éléments et propriétés périodiques',
  'Liaisons chimiques fortes : covalente, ionique et dative',
  'Liaisons intermoléculaires et moment dipolaire',
  'Théorie VSEPR et géométrie des molécules',
  'Hybridation des orbitales atomiques',
  'Mésomérie et effets électroniques'
];


if(!REAL_CHAPTERS["Cinétique chimique"]){
  REAL_CHAPTERS["Cinétique chimique"] = [
    'Généralités, définitions et vitesse de réaction',
    'Réactions simples d\'ordre 0, 1 et 2',
    'Réactions d\'ordre n et méthodes de détermination de l\'ordre',
    'Cinétique formelle des réactions composées',
    'Cinétique des réactions complexes et mécanismes en chaîne',
    'Influence de la température : loi d\'Arrhenius et théories cinétiques',
    'Catalyse et cinétique chimique hétérogène',
    'Méthodologie — exercices type examen'
  ];
}

if(!REAL_CHAPTERS["Histoire des sciences physiques"]){
  REAL_CHAPTERS["Histoire des sciences physiques"] = ['La physique dans l\'Antiquité et le Moyen Âge : des Grecs au monde islamique','La révolution scientifique du XVIIe siècle : de Copernic à Newton','Le siècle des Lumières et la consolidation de la physique classique','Le XIXe siècle : énergie, thermodynamique et électromagnétisme','La révolution de la physique moderne : relativité et quanta (1900-1930)','La physique contemporaine : du noyau atomique à l\'Univers'];
}

REAL_CHAPTERS["Synthèse organique"] = [
  "Analyse rétrosynthétique : stratégies et méthodologie",
  "Groupes protecteurs en synthèse organique",
  "Formation de liaisons C-C par les réactifs organométalliques",
  "Chimie des énolates : alkylation et réactions de condensation",
  "Oléfination : Wittig, HWE et méthodes apparentées",
  "Oxydations et réductions sélectives en synthèse",
  "Cycloadditions et réarrangements sigmatropiques",
  "Couplages pallado-catalysés et catalyse par les métaux de transition",
  "Stéréochimie et synthèse asymétrique",
  "Stratégie de synthèse totale : méthodologie et études de cas"
];

REAL_CHAPTERS["Cristallochimie — radiocristallographie"] = [
  "L'état cristallin : ordre, réseau et maille élémentaire",
  "Symétrie cristalline : éléments, opérations et réseaux de Bravais",
  "Groupes ponctuels, groupes d'espace et notation internationale",
  "Plans réticulaires, indices de Miller et distances interréticulaires",
  "Production, spectre et absorption des rayons X",
  "Diffraction des rayons X : loi de Bragg et conditions de diffraction",
  "Facteur de structure, intensités diffractées et extinctions systématiques",
  "Méthodes expérimentales de radiocristallographie : Laue, poudre, monocristal",
  "Résolution et affinement des structures cristallines",
  "Cristallochimie des solides inorganiques : empilements compacts et sites interstitiels"
];

REAL_CHAPTERS["Spectroscopie organique"] = [
  "Spectroscopie UV-visible : transitions électroniques et chromophores",
  "Spectroscopie infrarouge : vibrations moléculaires et groupes caractéristiques",
  "Principes de la RMN : déplacement chimique en RMN du proton",
  "Couplage spin-spin et analyse des spectres de RMN du proton",
  "RMN du carbone-13 et techniques d'édition spectrale (DEPT)",
  "Spectrométrie de masse : principes, ionisation et détermination de la formule brute",
  "Fragmentation en spectrométrie de masse : mécanismes et réarrangements",
  "Élucidation structurale par couplage des méthodes spectroscopiques"
];

REAL_CHAPTERS["Théorie des groupes"] = [
  "Structure de groupe : axiomes et premiers exemples",
  "Sous-groupes, classes et groupes cycliques",
  "Groupes de symétrie moléculaire",
  "Tables de caractères et représentations irréductibles",
  "Réduction d'une représentation réductible",
  "Produits directs de groupes et de représentations",
  "Applications : orbitales moléculaires et modes de vibration",
  "Applications en spectroscopie : règles de sélection par symétrie"
];

REAL_CHAPTERS["Technique de rédaction de rapport"] = [
  "Le rapport scientifique : finalités, types et destinataires",
  "La structure IMRaD : architecture d'un rapport scientifique",
  "Rédiger l'introduction et poser la problématique",
  "Présenter les résultats : tableaux, figures et légendes",
  "Rédiger la discussion et la conclusion",
  "Références bibliographiques et normes de citation",
  "Le style scientifique : clarté, précision et objectivité",
  "Le rapport de stage et la soutenance orale"
];

REAL_CHAPTERS["Législation et droit du travail"] = [
  "Sources et cadre du droit du travail béninois",
  "Le contrat de travail : CDI, CDD et période d'essai",
  "Durée du travail, repos et congés payés",
  "Rémunération : SMIG, bulletin de paie et cotisations sociales",
  "Hygiène, sécurité et médecine du travail",
  "Cessation de la relation de travail : démission, licenciement et indemnités",
  "Représentation collective : délégués du personnel et conventions collectives",
  "Protection sociale et règlement des litiges du travail"
];

REAL_CHAPTERS["Planification et gestion"] = [
  "Le projet et son cycle de vie : définir, cadrer, planifier, exécuter, clôturer",
  "Structuration du projet : objectifs SMART et structure de découpage (WBS)",
  "Ordonnancement des tâches : réseau PERT et méthode du chemin critique",
  "Le diagramme de Gantt : planification visuelle et suivi d'avancement",
  "Estimation des durées et gestion des ressources",
  "Gestion budgétaire et valeur acquise (Earned Value Management)",
  "Gestion des risques du projet",
  "Pilotage, communication et clôture d'un projet scientifique"
];

REAL_CHAPTERS["Physique numérique"] = [
  "Représentation des nombres et erreurs numériques",
  "Résolution numérique d'équations non linéaires",
  "Intégration numérique",
  "Résolution numérique des équations différentielles ordinaires",
  "Algèbre linéaire numérique",
  "Interpolation et ajustement de données",
  "Méthode de Monte Carlo",
  "Transformée de Fourier discrète et applications"
];

REAL_CHAPTERS["Spectroscopie"] = [
  "Interaction rayonnement-matière et spectroscopie atomique",
  "Spectroscopie rotationnelle : le rotateur rigide",
  "Spectroscopie vibrationnelle : l'oscillateur harmonique et anharmonique",
  "Spectroscopie vibration-rotation des molécules diatomiques",
  "Spectroscopie électronique moléculaire et principe de Franck-Condon",
  "Spectroscopie Raman",
  "Principes physiques du laser et applications spectroscopiques"
];

REAL_CHAPTERS["Méthodes numériques"] = [
  "Erreurs, conditionnement et stabilité numérique",
  "Résolution d'équations non linéaires : convergence et ordre",
  "Interpolation polynomiale : Lagrange, Newton et phénomène de Runge",
  "Intégration numérique : formules de Newton-Cotes et quadrature de Gauss",
  "Systèmes linéaires : méthodes directes (LU, Cholesky) et conditionnement",
  "Systèmes linéaires : méthodes itératives (Jacobi, Gauss-Seidel)",
  "Équations différentielles : consistance, stabilité et convergence",
  "Problèmes aux valeurs propres : méthode de la puissance et algorithme QR"
];

REAL_CHAPTERS["Méthodes mathématiques pour la physique"] = [
  "Opérateurs différentiels et analyse vectorielle en coordonnées curvilignes",
  "Séries de Fourier et transformée de Fourier",
  "Fonctions d'une variable complexe : holomorphie et séries",
  "Théorème des résidus et calcul d'intégrales",
  "Équations différentielles linéaires : résolution par séries entières",
  "Fonctions spéciales : polynômes de Legendre et fonctions de Bessel",
  "Équations aux dérivées partielles de la physique : séparation des variables",
  "Distributions, fonction delta de Dirac et fonctions de Green"
];

REAL_CHAPTERS["Mécanique analytique"] = [
  "Principe de moindre action et calcul des variations",
  "Formalisme lagrangien : coordonnées généralisées et équations d'Euler-Lagrange",
  "Symétries et lois de conservation : théorème de Noether",
  "Petites oscillations autour d'un équilibre : modes normaux",
  "Formalisme hamiltonien : transformation de Legendre et équations canoniques",
  "Crochets de Poisson et structure de l'espace des phases",
  "Transformations canoniques et équation de Hamilton-Jacobi",
  "Problème à force centrale et mouvement képlérien"
];

REAL_CHAPTERS["Mécanique des fluides"] = [
  "Statique des fluides : pression et théorème fondamental de l'hydrostatique",
  "Cinématique des fluides : descriptions eulérienne et lagrangienne",
  "Bilan de masse et équation de continuité",
  "Dynamique des fluides parfaits : équation d'Euler",
  "Théorème de Bernoulli et applications",
  "Viscosité et fluides newtoniens : équations de Navier-Stokes",
  "Écoulements visqueux exacts : Couette et Poiseuille",
  "Analyse dimensionnelle, similitude et nombre de Reynolds",
  "Écoulements potentiels, vorticité et notion de couche limite"
];

REAL_CHAPTERS["Mécanique quantique non relativiste"] = [
  "Formalisme de Dirac : espace des états, bras, kets et opérateurs",
  "Les postulats de la mécanique quantique",
  "L'oscillateur harmonique quantique : méthode algébrique",
  "Théorie générale du moment cinétique",
  "Moment cinétique orbital et harmoniques sphériques",
  "Le spin 1/2 et l'addition de moments cinétiques",
  "L'atome d'hydrogène : potentiel central et quantification",
  "Théorie des perturbations stationnaires",
  "Méthode variationnelle et perturbations dépendantes du temps"
];

REAL_CHAPTERS["Ondes et vibrations"] = [
  "De la chaîne d'oscillateurs couplés au milieu continu",
  "L'équation de d'Alembert et les ondes progressives",
  "Ondes planes progressives sinusoïdales et vitesse de phase",
  "La corde vibrante : équation, conditions aux limites et modes propres",
  "Ondes stationnaires et analyse de Fourier",
  "Énergie, puissance et impédance d'une onde",
  "Réflexion et transmission à une discontinuité",
  "Ondes acoustiques dans les fluides",
  "Dispersion, vitesse de groupe et paquets d'ondes"
];

REAL_CHAPTERS["Mesures et normes"] = [
  "Grandeurs physiques et système international d'unités (SI)",
  "Analyse dimensionnelle",
  "Chiffres significatifs et notation scientifique",
  "Incertitudes de mesure : évaluation de type A et de type B",
  "Propagation des incertitudes",
  "Étalonnage, justesse, fidélité et normes métrologiques"
];

REAL_CHAPTERS["Instrumentations et manipulation de physique"] = [
  "Méthodologie expérimentale et sécurité au laboratoire",
  "Instruments de mesure électriques : multimètre et oscilloscope",
  "Instruments de mesure mécaniques et optiques",
  "Acquisition et traitement des données expérimentales",
  "Régression linéaire et exploitation graphique des mesures",
  "Rédaction d'un compte-rendu de travaux pratiques"
];

REAL_CHAPTERS["Mécanique des solides déformables"] = [
  "Milieu continu déformable : configuration et champ de déplacement",
  "Le tenseur des déformations : dilatations et distorsions",
  "Le tenseur des contraintes et les équations d'équilibre",
  "Loi de comportement élastique : loi de Hooke généralisée",
  "Élasticité isotrope : coefficients de Lamé, module d'Young et coefficient de Poisson",
  "Théorie des poutres : flexion et modèle d'Euler-Bernoulli",
  "Torsion des poutres cylindriques",
  "Énergie de déformation élastique et critères de rupture"
];

REAL_CHAPTERS["Chimie organique spatiale"] = [
  "Représentations spatiales des molécules : Cram, Newman et Fischer",
  "Chiralité et énantiomérie : configuration R/S",
  "Molécules à plusieurs centres stéréogènes : diastéréoisomères et composés méso",
  "Activité optique et pouvoir rotatoire",
  "Analyse conformationnelle des molécules acycliques : éthane et butane",
  "Conformations du cyclohexane et de ses dérivés substitués",
  "Stéréochimie des alcènes : isomérie Z/E",
  "Stéréochimie et réactivité : introduction à la stéréospécificité"
];

REAL_CHAPTERS["Instrumentations et manipulation de chimie générale"] = [
  "Sécurité au laboratoire et verrerie de base",
  "Pesée et préparation de solutions : dilution et concentration",
  "Mesure du pH et pH-métrie",
  "Titrage acido-basique : principe et mise en œuvre",
  "Filtration et techniques de séparation",
  "Cristallisation et recristallisation",
  "Distillation simple et distillation fractionnée",
  "Spectrophotométrie UV-Visible : principe et dosage"
];

REAL_CHAPTERS["Instrumentations et manipulation de chimie minérale"] = [
  "Synthèse de composés inorganiques : principes généraux",
  "Analyse qualitative : identification des cations et anions",
  "Gravimétrie : dosage par précipitation et pesée",
  "Titrages redox : principe et mise en œuvre",
  "Titrages complexométriques : dosage par l'EDTA",
  "Conductimétrie et son application aux titrages",
  "Potentiométrie et mesures électrochimiques",
  "Synthèse et caractérisation de complexes de coordination"
];

REAL_CHAPTERS["Instrumentations et manipulation de chimie organique"] = [
  "Montages expérimentaux : chauffage à reflux et agitation",
  "Extraction liquide-liquide et ampoule à décanter",
  "Chromatographie sur couche mince (CCM)",
  "Chromatographie sur colonne",
  "Recristallisation et détermination du point de fusion",
  "Distillation des composés organiques : simple, fractionnée et sous vide",
  "Séchage et purification des produits organiques",
  "Caractérisation par spectroscopie infrarouge au laboratoire"
];

REAL_CHAPTERS["Thermodynamique macroscopique"] = [
  "Équilibre thermodynamique, variables d'état et transformations",
  "Premier principe : énergie interne et enthalpie",
  "Second principe : entropie et sens d'évolution",
  "Identité thermodynamique et potentiels thermodynamiques",
  "Relations de Maxwell et coefficients thermoélastiques",
  "Conditions d'équilibre et de stabilité thermodynamique",
  "Changement d'état des corps purs et diagrammes de phase",
  "Systèmes ouverts : potentiel chimique et équilibre de phases"
];

REAL_CHAPTERS["Propriétés de la matière condensée"] = [
  "Structure cristalline : réseau de Bravais et maille élémentaire",
  "Liaisons dans les solides et énergie de cohésion",
  "Diffraction des rayons X et loi de Bragg",
  "Vibrations du réseau : phonons et capacité thermique des solides",
  "Électrons dans les solides : électron libre et bandes d'énergie",
  "Semi-conducteurs et propriétés de transport"
];

REAL_CHAPTERS["Physique statistique"] = [
  "Description statistique : microétats, macroétats et postulat fondamental",
  "Ensemble microcanonique et entropie statistique de Boltzmann",
  "Ensemble canonique et fonction de partition",
  "Distribution de Boltzmann et gaz parfait classique",
  "Statistiques quantiques : bosons et fermions",
  "Applications : rayonnement du corps noir et gaz de Fermi"
];

REAL_CHAPTERS["Thermodynamique chimique"] = [
  "Grandeurs standard de réaction",
  "Enthalpie libre de réaction et affinité chimique",
  "Constante d'équilibre et loi d'action de masse",
  "Déplacements d'équilibre : loi de Le Chatelier",
  "Diagrammes binaires liquide-vapeur",
  "Diagrammes binaires liquide-solide et eutectiques"
];

REAL_CHAPTERS["Électrochimie"] = [
  "Couples redox et potentiel d'électrode",
  "Équation de Nernst et diagrammes potentiel-pH",
  "Piles électrochimiques et force électromotrice",
  "Électrolyse et lois de Faraday",
  "Courbes intensité-potentiel et cinétique électrochimique",
  "Corrosion et protection des métaux"
];

REAL_CHAPTERS["Chimie numérique"] = [
  "De la chimie quantique au calcul numérique",
  "La méthode de Hartree-Fock et le champ moyen",
  "Bases d'orbitales atomiques",
  "La théorie de la fonctionnelle de la densité (DFT)",
  "Optimisation de géométrie et surfaces d'énergie potentielle",
  "Applications : spectres calculés et thermochimie computationnelle"
];

REAL_CHAPTERS["Chimie analytique"] = [
  "Validation d'une méthode analytique",
  "Dosages acido-basiques et courbes de titrage",
  "Dosages redox et complexométriques",
  "Méthodes spectrophotométriques quantitatives",
  "Électrodes spécifiques et potentiométrie",
  "Incertitudes et traitement statistique des données analytiques"
];

REAL_CHAPTERS["Métallurgie et transitions de phases"] = [
  "De l'élaboration des métaux aux alliages",
  "Diagrammes binaires solide-solide : solutions solides et composés définis",
  "Transformations allotropiques et transformation martensitique",
  "Traitements thermiques des alliages",
  "Diffusion à l'état solide",
  "Essais mécaniques et relation structure-propriétés"
];

REAL_CHAPTERS["Dynamique moléculaire"] = [
  "Principe de la simulation de dynamique moléculaire",
  "Champs de force et potentiels d'interaction",
  "Intégration numérique des équations du mouvement",
  "Contrôle de la température et de la pression : thermostats et barostats",
  "Calcul de grandeurs structurales et thermodynamiques",
  "Applications et limites de la dynamique moléculaire"
];

REAL_CHAPTERS["Méthodes chromatographiques"] = [
  "Principe de la séparation chromatographique",
  "Théorie des plateaux et efficacité d'une colonne",
  "Chromatographie en phase gazeuse (CPG)",
  "Chromatographie liquide haute performance (HPLC)",
  "Couplage chromatographie-spectrométrie de masse",
  "Validation et optimisation d'une séparation chromatographique"
];

REAL_CHAPTERS["Chimie des substances naturelles"] = [
  "Classification et biosynthèse des métabolites secondaires",
  "Terpènes et terpénoïdes",
  "Alcaloïdes",
  "Flavonoïdes et polyphénols",
  "Stéroïdes et triterpènes",
  "Méthodes d'extraction et d'identification des substances naturelles"
];

/* ===================================================================
   INDEX DES CHUNKS : « Domaine|Matière » -> fichier chunks/<id>.js
=================================================================== */
const CHUNK_INDEX = {
  "Autres|Anglais scientifique": "anglais",
  "Autres|Histoire des sciences physiques": "histsci",
  "Autres|Législation et droit du travail": "legistrav",
  "Autres|Planification et gestion": "plan",
  "Autres|Sécurité et environnement": "secu",
  "Autres|Technique d'expression écrite et orale": "techexpr",
  "Autres|Technique de rédaction de rapport": "redacrap",
  "Chimie|Atomistique et liaisons chimiques": "atom",
  "Chimie|Chimie analytique": "cmd",
  "Chimie|Chimie de coordination": "cord",
  "Chimie|Chimie des matériaux inorganiques": "matin",
  "Chimie|Chimie des polymères": "poly",
  "Chimie|Chimie des solutions": "chimsol",
  "Chimie|Chimie des substances naturelles": "natsub",
  "Chimie|Chimie minérale": "min",
  "Chimie|Chimie numérique": "chnum",
  "Chimie|Chimie organique descriptive": "desc",
  "Chimie|Chimie organique générale": "org",
  "Chimie|Chimie organique spatiale": "stereo",
  "Chimie|Cinétique chimique": "cinet",
  "Chimie|Cristallochimie — radiocristallographie": "cristallo",
  "Chimie|Dynamique moléculaire": "dym",
  "Chimie|Électrochimie": "elchim",
  "Chimie|Fonctions organiques mixtes et mécanismes réactionnels": "fom",
  "Chimie|Instrumentations et manipulation de chimie générale": "instcg",
  "Chimie|Instrumentations et manipulation de chimie minérale": "instcm",
  "Chimie|Instrumentations et manipulation de chimie organique": "instco",
  "Chimie|Introduction à la chimie quantique": "chq",
  "Chimie|Introduction aux terres rares": "terres",
  "Chimie|Métallurgie et transitions de phases": "met",
  "Chimie|Méthodes chromatographiques": "chroma",
  "Chimie|Spectroscopie": "spec",
  "Chimie|Spectroscopie organique": "specorg",
  "Chimie|Synthèse organique": "synth",
  "Chimie|Thermochimie et équilibres chimiques": "thermo",
  "Chimie|Thermodynamique chimique": "tce",
  "Informatique|Introduction à la programmation": "prog",
  "Informatique|Outils informatiques et analyse de données": "stat",
  "Informatique|Physique numérique": "physnum",
  "Mathématiques|Algèbre": "algebre",
  "Mathématiques|Convergence et fonctions de plusieurs variables": "conv",
  "Mathématiques|Fonction d'une variable réelle": "analyse",
  "Mathématiques|Intégrales et équations différentielles": "integ",
  "Mathématiques|Méthodes mathématiques pour la physique": "mathphys",
  "Mathématiques|Méthodes numériques": "methnum",
  "Mathématiques|Outils mathématiques pour la physique": "math_tools",
  "Mathématiques|Probabilité et statistique": "proba",
  "Mathématiques|Théorie des groupes": "tdg",
  "Physique|Électrocinétique": "elec",
  "Physique|Électromagnétisme": "emag",
  "Physique|Électronique": "eln",
  "Physique|Instrumentations et manipulation de physique": "instru",
  "Physique|Introduction à la mécanique quantique": "quant",
  "Physique|Mécanique analytique": "mecan",
  "Physique|Mécanique des fluides": "mecaflu",
  "Physique|Mécanique des solides déformables": "msd",
  "Physique|Mécanique du point matériel": "meca",
  "Physique|Mécanique générale": "mecagen",
  "Physique|Mécanique quantique non relativiste": "mqnr",
  "Physique|Mesures et normes": "mesures",
  "Physique|Ondes électromagnétiques et relativité restreinte": "rela",
  "Physique|Ondes et vibrations": "onde",
  "Physique|Optique géométrique": "optique",
  "Physique|Optique physique": "optphy",
  "Physique|Physique statistique": "pstat",
  "Physique|Propriétés de la matière condensée": "pmc",
  "Physique|Thermodynamique": "thd",
  "Physique|Thermodynamique macroscopique": "thm"
};

const chunkState = {};      /* id -> 'ready' une fois le fichier exécuté */
const chunkPromises = {};   /* id -> Promise (évite les doubles téléchargements) */

function chunkIdFor(domainKey, matiereName){
  return CHUNK_INDEX[domainKey + '|' + matiereName] || null;
}

/* ---- Chargement d'un chunk : robuste (délai maximal, nouvelles tentatives, repli par fetch) ---- */
const CHUNK_TIMEOUT_MS = 15000;
function injectChunkScript(id, attempt){
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    const timer = setTimeout(() => { s.onload = s.onerror = null; s.remove(); reject(new Error('délai dépassé')); }, CHUNK_TIMEOUT_MS);
    s.src = 'chunks/' + id + '.js' + (attempt ? '?r=' + attempt + '-' + Date.now() : '');
    s.async = true;
    s.onload = () => { clearTimeout(timer); resolve(); };
    s.onerror = () => { clearTimeout(timer); s.remove(); reject(new Error('échec du <script>')); };
    document.head.appendChild(s);
  });
}
/* dernier recours : télécharger le texte puis l'exécuter (fonctionne même si le serveur envoie un mauvais type MIME) */
async function fetchChunkScript(id){
  const res = await fetch('chunks/' + id + '.js?r=f' + Date.now(), { cache: 'no-store' });
  if(!res.ok){ const e = new Error('HTTP ' + res.status); e.status = res.status; throw e; }
  const code = await res.text();
  const s = document.createElement('script');
  s.text = code;
  document.head.appendChild(s);
}
async function diagnoseChunk(id){
  if(navigator.onLine === false) return { offline: true };
  try{ const r = await fetch('chunks/' + id + '.js', { method: 'HEAD', cache: 'no-store' }); return { status: r.status }; }
  catch(e){ return { network: true }; }
}
function loadChunk(id){
  if(chunkState[id] === 'ready') return Promise.resolve(id);
  if(chunkPromises[id]) return chunkPromises[id];
  const t0 = Date.now();
  chunkPromises[id] = (async () => {
    for(let attempt = 0; attempt < 2; attempt++){
      try{ await injectChunkScript(id, attempt); chunkState[id] = 'ready'; console.info('[chunk]', id, 'chargé en', Date.now() - t0, 'ms'); return id; }
      catch(e){ console.warn('[chunk]', id, 'tentative', attempt + 1, e.message); await new Promise(r => setTimeout(r, 500)); }
    }
    try{ await fetchChunkScript(id); chunkState[id] = 'ready'; console.info('[chunk]', id, 'chargé (repli fetch) en', Date.now() - t0, 'ms'); return id; }
    catch(e){ console.warn('[chunk]', id, 'repli fetch échoué', e.message); }
    const err = new Error('chunk ' + id + ' indisponible');
    err.diag = await diagnoseChunk(id);
    throw err;
  })().catch(e => { delete chunkPromises[id]; throw e; });
  return chunkPromises[id];
}
function chunkErrorMessage(id, diag){
  if(diag && diag.offline) return 'Tu sembles hors connexion. Reconnecte-toi puis réessaie.';
  if(diag && diag.status === 404) return 'Fichier de cours introuvable sur le serveur (chunks/' + id + '.js). Le dossier « chunks » doit être publié à côté d\'index.html.';
  if(diag && diag.status >= 400) return 'Le serveur a répondu ' + diag.status + ' pour chunks/' + id + '.js. Réessaie dans un instant.';
  return 'Le téléchargement du cours a échoué (réseau instable ou bloqué). Réessaie.';
}
/* réchauffe le chunk d'une matière dès qu'on en ouvre la liste de chapitres : le clic suivant est instantané */
function warmChunkFor(domainKey, matiereName){
  const id = chunkIdFor(domainKey, matiereName);
  if(!id || chunkState[id] === 'ready' || chunkPromises[id]) return;
  if(navigator.connection && navigator.connection.saveData) return;
  loadChunk(id).catch(() => {});
}

/* précharge (sans exécuter) un chunk pendant les temps morts du navigateur */
function prefetchChunk(id){
  if(!id || chunkState[id] === 'ready') return;
  try{
    const l = document.createElement('link');
    l.rel = 'prefetch'; l.as = 'script'; l.href = 'chunks/' + id + '.js';
    document.head.appendChild(l);
  }catch(e){}
}

/* MathJax n'est plus chargé au démarrage (≈ 1 Mo bloquant) : seulement quand un
   chapitre s'ouvre, seul endroit du site qui affiche des formules. */
const MATHJAX_URL = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.min.js';
let mathJaxPromise = null;
function ensureMathJax(){
  if(window.MathJax && window.MathJax.typesetPromise) return Promise.resolve();
  if(mathJaxPromise) return mathJaxPromise;
  mathJaxPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = MATHJAX_URL;
    s.async = true;
    s.onload = () => {
      const ready = window.MathJax && window.MathJax.startup && window.MathJax.startup.promise;
      Promise.resolve(ready).then(() => resolve(), () => resolve());
    };
    s.onerror = () => { mathJaxPromise = null; s.remove(); reject(new Error('MathJax indisponible')); };
    document.head.appendChild(s);
  });
  return mathJaxPromise;
}

/* petit bandeau de statut (chargement d'un cours / erreur réseau) */
let esuStatusEl = null, esuStatusTimer = null;
function esuStatus(message, autoHideMs){
  if(!esuStatusEl){
    esuStatusEl = document.createElement('div');
    esuStatusEl.setAttribute('role', 'status');
    esuStatusEl.style.cssText = 'position:fixed;left:50%;top:84px;transform:translateX(-50%);z-index:9990;max-width:calc(100vw - 32px);padding:10px 18px;border-radius:999px;background:rgba(22,32,74,.94);color:#fff;font:600 .86rem "IBM Plex Sans",system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.3);text-align:center;';
    document.body.appendChild(esuStatusEl);
  }
  clearTimeout(esuStatusTimer);
  if(!message){ esuStatusEl.style.display = 'none'; return; }
  esuStatusEl.textContent = message;
  esuStatusEl.style.display = 'block';
  if(autoHideMs) esuStatusTimer = setTimeout(() => { esuStatusEl.style.display = 'none'; }, autoHideMs);
}

/* Point d'entrée public (inchangé pour tout le reste du site) : charge d'abord le
   chunk de la matière si besoin, puis appelle openChapitreNow (l'ancien corps). */
let openChapitreSeq = 0;
function openChapitre(domainKey, matiereName, chapterIndex){
  const seq = ++openChapitreSeq;
  const id = chunkIdFor(domainKey, matiereName);
  if(!id || chunkState[id] === 'ready'){
    return openChapitreNow(domainKey, matiereName, chapterIndex);
  }
  const restoring = isRestoringHistory;   /* on est dans un retour arrière du navigateur ? */
  const slowTimer = setTimeout(() => esuStatus('Chargement du cours…'), 250);
  return loadChunk(id).then(() => {
    clearTimeout(slowTimer); esuStatus('');
    if(seq !== openChapitreSeq) return;   /* l'utilisateur a demandé autre chose entre-temps */
    const prev = isRestoringHistory;
    isRestoringHistory = restoring;
    try{ openChapitreNow(domainKey, matiereName, chapterIndex); }
    catch(err){
      /* erreur d'affichage (bug dans le chapitre) : on la signale vraiment, sans l'attribuer au réseau */
      console.error('[chapitre]', err);
      esuStatus('Ce chapitre ne s\'est pas affiché correctement (erreur technique). Réessaie ou préviens-nous.', 7000);
    }
    finally { isRestoringHistory = prev; }
  }, (err) => {
    clearTimeout(slowTimer);
    console.warn('[chunk]', err, err && err.diag);
    esuStatus(chunkErrorMessage(id, err && err.diag), 9000);
  });
}

/* pendant les temps morts, on précharge le cours du bouton « Commencer le chapitre 1 » */
window.addEventListener('load', () => {
  const run = () => {
    try{
      const ms = getMatieres(selectedLevel, 'Physique');
      if(ms.length) prefetchChunk(chunkIdFor('Physique', ms[0].name));
    }catch(e){}
  };
  if('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 6000 });
  else setTimeout(run, 3000);
});





















/* connaissances générales par matière — utiles même sans contenu rédigé pour le chapitre précis */
const NOVA_DOMAIN_KB = {
  'Physique': [
    { test:/vitesse|dérivée.*position/i, replies:["En cinématique, la vitesse est la dérivée de la position par rapport au temps, et l'accélération est la dérivée de la vitesse : plus la pente de la courbe position-temps est raide, plus tu vas vite."] },
    { test:/énergie|travail|puissance/i, replies:["Le travail d'une force (en joules) mesure l'énergie qu'elle transfère sur un déplacement : W = F·d·cos(θ). La puissance, c'est ce travail rapporté au temps : P = W/t."] },
    { test:/unité|dimension/i, replies:["Vérifie toujours les unités : ça évite la moitié des erreurs de calcul. m en kg, F en N, a en m/s² — si ça ne tombe pas juste, il y a sûrement une conversion oubliée."] }
  ],
  'Chimie': [
    { test:/mole|avogadro/i, replies:["La mole est une unité de comptage, comme une « douzaine » mais pour 6,022×10²³ particules (nombre d'Avogadro). n = m/M, où M est la masse molaire."] },
    { test:/liaison|covalent|ionique/i, replies:["Une liaison covalente partage des électrons entre deux atomes ; une liaison ionique vient d'un transfert complet d'électrons, créant des ions de charges opposées qui s'attirent."] },
    { test:/\bph\b|acide|basique|base\b/i, replies:["Le pH mesure l'acidité : pH < 7 = acide, pH > 7 = basique, pH = 7 = neutre. Chaque unité de pH correspond à un facteur 10 en concentration d'ions H⁺."] },
    { test:/atome|électron|proton|neutron/i, replies:["Un atome a un noyau (protons + neutrons) entouré d'électrons. Le numéro atomique Z donne le nombre de protons, qui définit l'élément chimique."] }
  ],
  'Mathématiques': [
    { test:/dérivée/i, replies:["La dérivée d'une fonction en un point donne la pente de la tangente à ce point — la vitesse de variation instantanée de la fonction à cet endroit précis."] },
    { test:/intégrale|primitive/i, replies:["Une intégrale calcule une aire sous une courbe (ou une accumulation). C'est l'opération inverse de la dérivée : si F' = f, alors F est une primitive de f."] },
    { test:/limite/i, replies:["Une limite décrit le comportement d'une fonction quand la variable s'approche d'une valeur (ou de l'infini), même si la fonction n'y est pas définie exactement."] },
    { test:/fonction/i, replies:["Une fonction associe à chaque x une unique valeur f(x). Pour l'étudier, regarde son domaine de définition, ses variations, et ses limites aux bornes."] }
  ],
  'Informatique': [
    { test:/algorithme/i, replies:["Un algorithme est une suite d'étapes précises pour résoudre un problème. Avant de coder, écris-le en pseudo-code ou en français structuré : ça clarifie la logique avant la syntaxe."] },
    { test:/boucle|itération/i, replies:["Une boucle répète un bloc d'instructions : `for` quand tu connais le nombre d'itérations à l'avance, `while` quand tu répètes tant qu'une condition reste vraie."] },
    { test:/variable/i, replies:["Une variable est un espace nommé qui stocke une valeur en mémoire. Son type (entier, texte, booléen...) détermine ce qu'on peut en faire."] }
  ]
};

const NOVA_GENERIC_RULES = [
  { test:/qui es-tu|c'est quoi nova|tu es qui|t'es qui/i, replies:["Je suis Nova, ton mentor IA local pour cette plateforme : un assistant simple à base de règles (pas une IA généraliste dans le cloud), gratuit, pensé pour t'aider sur tes cours et exercices."] },
  { test:/bonjour|salut|hello|coucou/i, replies:["Salut ! Dis-moi ce qui te bloque, ou donne-moi un mot-clé précis du cours.", "Hey ! Prêt·e à avancer sur ce chapitre ? Pose ta question."] },
  { test:/merci/i, replies:["Avec plaisir ! N'hésite pas si tu as d'autres questions.", "De rien — bon courage pour la suite du chapitre !"] },
  { test:/comment (faire|réviser|étudier|m'y prendre)|méthode/i, replies:["Une bonne méthode : relis d'abord les objectifs du chapitre, repère la formule ou l'idée centrale, puis essaie de l'expliquer avec tes propres mots avant de passer aux exercices."] },
  { test:/exercice|exo/i, replies:["Pour un exercice, commence par identifier ce qu'on te donne et ce qu'on te demande, puis cherche quelle formule ou relation du cours relie ces grandeurs."] },
  { test:/nul|inutile|sers à rien|marche pas|comprends rien/i, replies:["Je suis volontairement simple — vois-moi comme un pense-bête qui connaît bien ce chapitre plutôt qu'un chatbot généraliste. Donne-moi un mot-clé précis (une formule, une notion), j'y répondrai mieux qu'à une question très large."] },
  { test:/difficile|comprend pas|compris pas|bloqu/i, replies:["Pas de souci, c'est normal de bloquer sur une notion nouvelle. Dis-moi précisément quel mot ou quelle étape te pose problème, je peux t'aider à le décortiquer."] }
];

/* petit moteur de calcul réel pour F = m·a (mieux qu'une réponse générique quand des valeurs sont données) */
function tryPhysicsCalculation(message){
  const num = s => parseFloat(s.replace(',', '.'));
  const mMatch = message.match(/(\d+(?:[.,]\d+)?)\s*kg/i);
  const fMatch = message.match(/(\d+(?:[.,]\d+)?)\s*n\b/i);
  const aMatch = message.match(/(\d+(?:[.,]\d+)?)\s*m\s*\/\s*s\s*[²2]/i);
  if(mMatch && fMatch && !aMatch){
    const m = num(mMatch[1]), F = num(fMatch[1]);
    if(m > 0) return `Avec F = m·a, on isole a = F/m = ${F} / ${m} = ${(F/m).toFixed(2)} m/s². (Je lis ${F} N et ${m} kg dans ton message — dis-moi si je me trompe.)`;
  }
  if(mMatch && aMatch && !fMatch){
    const m = num(mMatch[1]), a = num(aMatch[1]);
    return `Avec F = m·a = ${m} × ${a} = ${(m * a).toFixed(2)} N.`;
  }
  if(fMatch && aMatch && !mMatch){
    const F = num(fMatch[1]), a = num(aMatch[1]);
    if(a > 0) return `Avec m = F/a = ${F} / ${a} = ${(F / a).toFixed(2)} kg.`;
  }
  return null;
}

/* ---- calculatrice arithmétique générale, sûre (aucun eval libre : uniquement chiffres et opérateurs
   après filtrage strict — donc aucun risque d'exécuter du code arbitraire), pour tout calcul de base,
   quelle que soit la matière : additions, pourcentages, racines, puissances... ---- */
function tryMathCalculation(rawMessage){
  const numPattern = '\\d+(?:[.,]\\d+)?';

  // racine carrée : traitée à part (résultat direct, pas besoin du moteur général)
  let m = rawMessage.match(new RegExp(`racine\\s+(?:carr[ée]e?\\s+)?de\\s+(${numPattern})`, 'i'))
       || rawMessage.match(new RegExp(`√\\s*(${numPattern})`));
  if(m){
    const n = parseFloat(m[1].replace(',', '.'));
    if(n >= 0) return `√${n} = ${Math.sqrt(n).toFixed(4).replace(/\.?0+$/, '')}`;
  }

  // pourcentage : "20% de 150" / "20 pourcent de 150"
  m = rawMessage.match(new RegExp(`(${numPattern})\\s*(?:%|pour ?cent)\\s*de\\s*(${numPattern})`, 'i'));
  if(m){
    const p = parseFloat(m[1].replace(',', '.')), base = parseFloat(m[2].replace(',', '.'));
    return `${p}% de ${base} = ${(base * p / 100).toFixed(2).replace(/\.00$/, '')}`;
  }

  // conversion des tournures françaises en opérateurs, pour couvrir "12 fois 8", "20 divisé par 4"...
  let text = rawMessage.toLowerCase()
    .replace(new RegExp(`(${numPattern})\\s*au\\s+carr[ée]`, 'gi'), '($1^2)')
    .replace(new RegExp(`(${numPattern})\\s*au\\s+cube`, 'gi'), '($1^3)')
    .replace(/multipli[ée]s?\s*(par|avec)/gi, '*')
    .replace(/\bfois\b/gi, '*')
    .replace(/divis[ée]s?\s*par/gi, '/')
    .replace(/\bsur\b/gi, '/')
    .replace(/\bplus\b/gi, '+')
    .replace(/\bmoins\b/gi, '-')
    .replace(/puissance/gi, '^')
    .replace(/×/g, '*').replace(/÷/g, '/');

  // n'extrait que la plus longue portion qui ressemble vraiment à un calcul
  // (chiffres, opérateurs, parenthèses) — tout le reste (lettres) est ignoré
  const candidates = text.match(/[0-9+\-*/^().,\s]{3,}/g) || [];
  let best = '';
  for(const c of candidates){
    if(/\d/.test(c) && /[+\-*/^]/.test(c) && c.trim().length > best.length) best = c.trim();
  }
  if(!best) return null;

  const expr = best.replace(/,/g, '.').replace(/\^/g, '**');
  // garde-fou : uniquement chiffres, points, espaces, parenthèses et opérateurs autorisés — donc
  // aucune lettre ni caractère spécial ne peut jamais atteindre l'évaluateur.
  if(!/^[0-9+\-*/().\s]+$/.test(expr.replace(/\*\*/g, ''))) return null;
  try{
    const result = Function(`"use strict"; return (${expr});`)();
    if(typeof result !== 'number' || !isFinite(result)) return null;
    const rounded = Math.round(result * 10000) / 10000;
    return `${best.trim()} = ${rounded}`;
  }catch(e){ return null; }
}

/* répond avec le vrai contenu affiché à l'écran (objectifs / prérequis du chapitre ouvert) */
function tryMetaChapterQuestion(message){
  if(/objectifs?/i.test(message)){
    const list = document.getElementById('chapObjectives');
    const items = list ? Array.from(list.querySelectorAll('li')).map(li => li.textContent) : [];
    if(items.length) return `Les objectifs de ce chapitre : ${items.join(' · ')}`;
  }
  if(/pr[ée]requis|besoin de savoir avant/i.test(message)){
    const tags = document.getElementById('chapPrereqs');
    const items = tags ? Array.from(tags.querySelectorAll('.tag-chip')).map(t => t.textContent) : [];
    if(items.length) return `Pour bien suivre ce chapitre, il vaut mieux déjà maîtriser : ${items.join(', ')}.`;
  }
  return null;
}

/* ---- glossaire : Nova peut vraiment définir des mots, pas seulement réagir à des chapitres précis ---- */
const NOVA_GLOSSARY = {
  // Physique
  'masse': "La masse (en kg) mesure la quantité de matière d'un objet et son inertie — sa résistance au changement de mouvement. Elle ne dépend pas du lieu où l'on se trouve.",
  'poids': "Le poids est une force (en N), pas une masse : P = m·g. Il dépend de la gravité du lieu, donc il change entre la Terre et la Lune, contrairement à la masse.",
  'force': "Une force est une action (poussée, traction, gravité...) capable de modifier le mouvement d'un objet ou de le déformer. Elle se mesure en newtons (N) et se représente par un vecteur.",
  'vecteur': "Un vecteur est une grandeur qui a une direction, un sens et une intensité (une norme) — contrairement à un simple nombre. En physique, force, vitesse et accélération sont des vecteurs.",
  'résultante': "La résultante est la somme vectorielle de toutes les forces appliquées à un objet. C'est elle qu'on utilise dans F = m·a, pas chaque force prise séparément.",
  'accélération': "L'accélération (en m/s²) mesure la variation de la vitesse dans le temps. Elle est liée à la force par F = m·a : plus la force est grande (à masse égale), plus l'accélération l'est.",
  'vitesse': "La vitesse mesure la distance parcourue par unité de temps. C'est la dérivée de la position par rapport au temps — plus la position change vite, plus la vitesse est grande.",
  'inertie': "L'inertie est la tendance d'un objet à conserver son état de mouvement (ou de repos) tant qu'aucune force ne l'oblige à changer. Elle est directement liée à la masse.",
  'référentiel': "Un référentiel est le point de vue (souvent un objet fixe) par rapport auquel on décrit un mouvement. La même trajectoire peut sembler différente selon le référentiel choisi.",
  'trajectoire': "La trajectoire est l'ensemble des positions successives occupées par un objet en mouvement, vue dans un référentiel donné.",
  'énergie': "L'énergie mesure la capacité d'un système à produire un travail ou un changement (mouvement, chaleur, lumière...). Elle se conserve toujours, mais peut changer de forme.",
  'travail': "En physique, le travail (en joules) mesure l'énergie transférée par une force lors d'un déplacement : W = F·d·cos(θ). Ce n'est pas la même notion que le travail au sens courant.",
  'puissance': "La puissance (en watts) mesure la vitesse à laquelle un travail est effectué ou une énergie est transférée : P = W / t.",
  'pression': "La pression (en pascals) mesure une force appliquée sur une surface : P = F / S. Plus la même force est concentrée sur une petite surface, plus la pression est grande.",
  'température': "La température mesure l'agitation moyenne des particules d'un système — plus les particules s'agitent, plus la température est élevée.",
  'chaleur': "La chaleur est un transfert d'énergie thermique entre deux systèmes de températures différentes, toujours du plus chaud vers le plus froid.",
  'oscillation': "Une oscillation est un mouvement qui se répète périodiquement autour d'une position d'équilibre, comme un pendule qui va et vient.",
  'période': "La période (en secondes) est la durée d'un cycle complet d'un phénomène périodique, comme un aller-retour d'un pendule.",
  // Chimie
  'atome': "Un atome est la plus petite unité de matière qui garde les propriétés d'un élément chimique. Il a un noyau (protons + neutrons) entouré d'électrons.",
  'molécule': "Une molécule est un groupe d'atomes liés entre eux par des liaisons chimiques, formant une nouvelle substance avec ses propres propriétés.",
  'électron': "L'électron est une particule chargée négativement qui gravite autour du noyau d'un atome. Ce sont les électrons qui participent aux liaisons chimiques.",
  'proton': "Le proton est une particule chargée positivement, présente dans le noyau de l'atome. Son nombre (numéro atomique Z) définit l'élément chimique.",
  'neutron': "Le neutron est une particule neutre (sans charge électrique) présente dans le noyau de l'atome, aux côtés des protons.",
  'mole': "La mole est une unité de comptage, comme une « douzaine » mais pour 6,022×10²³ particules (nombre d'Avogadro). Elle relie une quantité de matière n à une masse m via n = m/M.",
  'liaison covalente': "Une liaison covalente est une mise en commun d'électrons entre deux atomes, qui les maintient liés ensemble dans une molécule.",
  'liaison ionique': "Une liaison ionique résulte d'un transfert complet d'électrons entre deux atomes, créant des ions de charges opposées qui s'attirent.",
  'ion': "Un ion est un atome (ou groupe d'atomes) qui a gagné ou perdu des électrons, ce qui lui donne une charge électrique positive ou négative.",
  'ph': "Le pH mesure l'acidité d'une solution : pH < 7 = acide, pH > 7 = basique, pH = 7 = neutre. Chaque unité de pH correspond à un facteur 10 en concentration d'ions H⁺.",
  'concentration': "La concentration mesure la quantité de soluté dissous dans un volume de solution (souvent en mol/L). Plus il y a de soluté pour le même volume, plus la concentration est élevée.",
  'catalyseur': "Un catalyseur est une substance qui accélère une réaction chimique sans être elle-même consommée par la réaction.",
  'isotope': "Deux isotopes d'un même élément ont le même nombre de protons (même Z) mais un nombre de neutrons différent, donc une masse différente.",
  // Mathématiques
  'dérivée': "La dérivée d'une fonction en un point donne la pente de la tangente à ce point — la vitesse de variation instantanée de la fonction à cet endroit précis.",
  'intégrale': "Une intégrale calcule une aire sous une courbe (ou une accumulation). C'est l'opération inverse de la dérivée : si F' = f, alors F est une primitive de f.",
  'primitive': "Une primitive F d'une fonction f est une fonction dont la dérivée redonne f (F' = f). Toutes les primitives d'une même fonction diffèrent d'une constante.",
  'limite': "Une limite décrit le comportement d'une fonction quand la variable s'approche d'une valeur (ou de l'infini), même si la fonction n'y est pas définie exactement.",
  'fonction': "Une fonction associe à chaque élément x d'un ensemble de départ une unique valeur f(x). Pour l'étudier, on regarde son domaine de définition, ses variations et ses limites.",
  'ensemble': "En mathématiques, un ensemble est une collection d'éléments distincts, sans ordre ni répétition, définie par une propriété commune ou une liste.",
  'polynôme': "Un polynôme est une expression formée de la somme de termes en puissances d'une variable, comme 3x² + 2x − 1.",
  'matrice': "Une matrice est un tableau rectangulaire de nombres organisés en lignes et colonnes, utilisé notamment pour représenter des systèmes d'équations ou des transformations.",
  'probabilité': "Une probabilité mesure, entre 0 et 1, la chance qu'un événement se produise. 0 signifie impossible, 1 signifie certain.",
  'moyenne': "La moyenne d'une série de valeurs est leur somme divisée par leur nombre — elle résume la tendance centrale d'un ensemble de données.",
  'variance': "La variance mesure la dispersion des valeurs d'une série autour de leur moyenne : plus elle est grande, plus les valeurs sont étalées.",
  'écart-type': "L'écart-type est la racine carrée de la variance. Il mesure, dans la même unité que les données, à quel point les valeurs s'écartent en moyenne de la moyenne.",
  'inéquation': "Une inéquation est une inégalité entre deux expressions contenant une inconnue (avec <, >, ≤ ou ≥), dont la résolution donne un intervalle de solutions plutôt qu'une seule valeur.",
  'équation': "Une équation est une égalité entre deux expressions contenant une ou plusieurs inconnues, qu'on cherche à résoudre pour trouver la ou les valeurs qui la vérifient.",
  // Informatique
  'algorithme': "Un algorithme est une suite d'étapes précises et ordonnées pour résoudre un problème. Avant de coder, l'écrire en pseudo-code aide à clarifier la logique avant la syntaxe.",
  'boucle': "Une boucle répète un bloc d'instructions : `for` quand on connaît le nombre d'itérations à l'avance, `while` quand on répète tant qu'une condition reste vraie.",
  'variable': "Une variable est un espace nommé qui stocke une valeur en mémoire, que le programme peut lire ou modifier. Son type (entier, texte, booléen...) détermine ce qu'on peut en faire.",
  'fonction (info)': "En informatique, une fonction est un bloc de code réutilisable qui prend des entrées (paramètres) et renvoie un résultat, pour éviter de répéter le même code.",
  'tableau': "Un tableau (array) est une structure qui stocke plusieurs valeurs dans un ordre précis, accessibles chacune par un index (souvent à partir de 0).",
  'condition': "Une condition (if/else) permet à un programme de choisir quelles instructions exécuter selon qu'une expression est vraie ou fausse.",
  'complexité': "La complexité algorithmique estime combien de temps ou de mémoire un algorithme consomme en fonction de la taille des données en entrée — utile pour comparer deux solutions.",
  'base de données': "Une base de données est un système organisé pour stocker, retrouver et modifier des données de façon fiable, souvent interrogée avec un langage comme SQL.",
  'binaire': "Le binaire est un système de numération à deux chiffres (0 et 1), la base du fonctionnement des ordinateurs : chaque bit vaut 0 ou 1.",
  'récursivité': "La récursivité, c'est quand une fonction s'appelle elle-même pour résoudre un problème en le découpant en sous-problèmes plus petits, jusqu'à un cas de base simple.",
  'compilateur': "Un compilateur traduit un programme écrit dans un langage de haut niveau (comme C ou Java) en code machine exécutable par l'ordinateur, avant son exécution.",
  // Physique (suite)
  'gravité': "La gravité est la force d'attraction entre deux masses. Sur Terre, elle donne à tous les objets une accélération d'environ g = 9,8 m/s² vers le sol.",
  'frottement': "Le frottement est une force qui s'oppose au mouvement relatif entre deux surfaces en contact, dissipant de l'énergie sous forme de chaleur.",
  'newton': "Le newton (N) est l'unité de force du système international : 1 N est la force qui donne à une masse de 1 kg une accélération de 1 m/s².",
  'joule': "Le joule (J) est l'unité d'énergie et de travail du système international.",
  'watt': "Le watt (W) est l'unité de puissance : 1 W = 1 joule transféré par seconde.",
  'onde': "Une onde est une perturbation qui se propage dans un milieu (ou dans le vide pour la lumière) en transportant de l'énergie, sans transporter la matière elle-même.",
  'fréquence': "La fréquence (en hertz) mesure le nombre de cycles ou d'oscillations qui se produisent par seconde.",
  'longueur d\'onde': "La longueur d'onde est la distance parcourue par une onde pendant une période complète — la distance entre deux crêtes successives.",
  'électricité statique': "L'électricité statique résulte d'une accumulation de charges électriques sur un objet, qui ne circulent pas comme dans un courant.",
  'courant électrique': "Un courant électrique est un déplacement ordonné de charges électriques (souvent des électrons) dans un conducteur, mesuré en ampères.",
  'tension': "La tension électrique (en volts) mesure la différence de potentiel entre deux points d'un circuit — c'est elle qui « pousse » le courant.",
  'résistance': "La résistance électrique (en ohms) mesure l'opposition d'un matériau au passage du courant : U = R·I (loi d'Ohm).",
  // Chimie (suite)
  'réaction chimique': "Une réaction chimique transforme des réactifs en produits par réarrangement des liaisons entre atomes, sans créer ni détruire de matière (conservation de la masse).",
  'équilibre chimique': "Un équilibre chimique est atteint quand les vitesses des réactions directe et inverse deviennent égales — les concentrations restent alors constantes, sans que la réaction s'arrête.",
  'oxydation': "L'oxydation est une réaction où une espèce chimique perd des électrons. Elle va toujours de pair avec une réduction (gain d'électrons) chez une autre espèce.",
  'solution': "Une solution est un mélange homogène d'un soluté dissous dans un solvant (souvent l'eau), où on ne distingue plus les composants à l'œil nu.",
  'stœchiométrie': "La stœchiométrie étudie les proportions (en moles) entre réactifs et produits d'une réaction chimique, à partir de l'équation chimique équilibrée.",
  'tableau périodique': "Le tableau périodique classe tous les éléments chimiques par numéro atomique croissant, en colonnes (familles) qui partagent des propriétés chimiques similaires.",
  // Chimie des solutions
  'pH': "Le pH mesure l'acidité d'une solution aqueuse : pH = -log[H3O+]. Plus il est bas, plus la solution est acide (beaucoup d'ions H3O+) ; plus il est élevé, plus elle est basique.",
  'pKa': "Le pKa caractérise la force d'un couple acide-base AH/A- : pKa = -log(Ka). Plus le pKa est petit, plus l'acide est fort. Il sert aussi de repère pour savoir quelle forme (acide ou basique) prédomine selon le pH.",
  'acide faible': "Un acide faible ne se dissocie que partiellement dans l'eau, contrairement à un acide fort. Son pH se calcule à partir de sa constante Ka et de sa concentration, pas simplement par pH = -log(C).",
  'solution tampon': "Une solution tampon (mélange d'un acide faible et de sa base conjuguée) résiste aux variations de pH lors d'un ajout modéré d'acide, de base, ou d'une dilution. Son pH suit pH = pKa + log([base]/[acide]).",
  'point isoélectrique': "Le point isoélectrique est le pH auquel une espèce amphotère (comme un acide aminé) a une charge globale nulle en moyenne. Il vaut la moyenne des deux pKa qui encadrent la forme neutre.",
  'titrage': "Un titrage détermine la concentration inconnue d'une espèce en la faisant réagir avec une solution de concentration connue jusqu'à l'équivalence, repérée par pH-métrie, conductimétrie ou un indicateur coloré.",
  'complexe (chimie)': "Un complexe est un édifice formé d'un ion ou atome central (avec des lacunes électroniques) entouré de ligands (molécules ou ions porteurs d'un doublet libre), comme [Cu(NH3)4]2+.",
  'ligand': "Un ligand est une molécule ou un ion possédant au moins un doublet d'électrons libres, capable de se lier à un ion central pour former un complexe.",
  'produit de solubilité': "Le produit de solubilité Ks caractérise l'équilibre entre un solide ionique peu soluble et ses ions en solution saturée. Un précipité se forme quand le quotient ionique dépasse Ks.",
  'solubilité (chimie)': "La solubilité s est la quantité maximale d'un soluté qu'on peut dissoudre dans un volume donné de solvant avant saturation, généralement exprimée en mol/L.",
  'oxydant': "Un oxydant est une espèce chimique capable de capter un ou plusieurs électrons (elle est donc réduite au cours de la réaction). Il forme un couple Ox/Red avec son réducteur conjugué.",
  'réducteur': "Un réducteur est une espèce chimique capable de céder un ou plusieurs électrons (elle est donc oxydée au cours de la réaction). Il forme un couple Ox/Red avec son oxydant conjugué.",
  'potentiel redox': "Le potentiel redox (ou potentiel d'électrode) E mesure le pouvoir oxydant ou réducteur d'un couple Ox/Red en solution ; il se calcule par la relation de Nernst à partir du potentiel standard E0.",
  'force ionique': "La force ionique I = (1/2)Σ Ci·zi² mesure l'encombrement électrostatique global d'une solution, tous ions confondus. Elle influence l'activité réelle des ions (coefficient d'activité).",
  // Mathématiques (suite)
  'vecteur (maths)': "En mathématiques, un vecteur représente un déplacement ou une grandeur ayant une direction et une norme, souvent noté avec des coordonnées (x, y).",
  'racine carrée': "La racine carrée d'un nombre positif n est le nombre positif dont le carré redonne n. Par exemple, la racine carrée de 9 est 3, car 3² = 9.",
  'factorielle': "La factorielle d'un entier n (notée n!) est le produit de tous les entiers de 1 à n. Par exemple, 4! = 4×3×2×1 = 24.",
  'trigonométrie': "La trigonométrie étudie les relations entre les angles et les côtés d'un triangle, via le sinus, le cosinus et la tangente.",
  'logarithme': "Le logarithme est l'opération inverse de l'exponentielle : log(x) répond à la question « à quelle puissance faut-il élever la base pour obtenir x ? »",
  'exponentielle': "La fonction exponentielle croît (ou décroît) proportionnellement à sa propre valeur — elle est sa propre dérivée dans le cas de exp(x).",
  'asymptote': "Une asymptote est une droite dont une courbe se rapproche indéfiniment sans jamais tout à fait la toucher, souvent en +∞, -∞ ou près d'une valeur interdite.",
  'discriminant': "Le discriminant (Δ = b² − 4ac) d'une équation du second degré indique le nombre de solutions réelles : 2 si Δ > 0, 1 si Δ = 0, aucune si Δ < 0.",
  'nombre premier': "Un nombre premier est un entier supérieur à 1 qui n'a que deux diviseurs : 1 et lui-même (2, 3, 5, 7, 11...).",
  'coefficient directeur': "Le coefficient directeur d'une droite mesure sa pente : de combien y augmente quand x augmente de 1."
};

function stripAccents(s){ return s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

/* ===================================================================
   Moteur "génératif" ancré dans le cours : au lieu de renvoyer une seule
   phrase toute faite au premier mot-clé trouvé, Nova rassemble TOUT ce
   que la plateforme sait sur la question posée (règles du chapitre,
   connaissances de la matière, glossaire) puis RÉDIGE une réponse sur
   mesure en les combinant — jamais deux fois formulée pareil, et capable
   de traiter une question qui touche plusieurs notions à la fois.
   Tout vient du contenu réel de la plateforme : rien n'est inventé.
=================================================================== */
const NOVA_OPENERS_SINGLE = ["", "Alors : ", "Voici ce que dit le cours : ", "Pour répondre à ça — "];
const NOVA_OPENERS_MULTI = [
  "Ta question touche plusieurs notions du cours, je les rassemble : ",
  "Il y a deux ou trois choses à dire là-dessus. D'abord : ",
  "Bonne question à plusieurs facettes — voici ce que je peux relier : "
];
const NOVA_CONNECTORS = [" Ensuite, ", " Par ailleurs, ", " À noter aussi : ", " Et pour compléter, "];
const NOVA_CLOSERS = [
  " Dis-moi si tu veux un exemple chiffré pour mieux visualiser.",
  " N'hésite pas si tu veux que je détaille un de ces points.",
  " Ça éclaire ta question, ou tu veux que je reformule autrement ?",
  ""
];

function lowerFirst(s){ return s.charAt(0).toLowerCase() + s.slice(1); }

function novaComposeAnswer(userMessage, kb, domainKey){
  const facts = [];
  const seen = new Set();
  const wordSet = (s) => new Set(stripAccents(s.toLowerCase()).match(/[a-z]{4,}/g) || []);
  const tooSimilar = (text) => {
    const ws = wordSet(text);
    return facts.some(f => {
      const fw = wordSet(f);
      const overlap = [...ws].filter(w => fw.has(w)).length;
      return overlap / Math.max(1, Math.min(ws.size, fw.size)) > 0.5;
    });
  };
  const addFact = (text) => { if(text && !seen.has(text) && !tooSimilar(text)){ seen.add(text); facts.push(text); } };

  /* 1) règles propres au chapitre affiché (hors indices d'exercice, gérés à part) */
  const chapterRules = (kb && kb.rules) || [];
  for(const r of chapterRules){
    if(!r.hint && r.test.test(userMessage)) addFact(pick(r.replies));
  }

  /* 2) connaissances générales de la matière (utile même hors du chapitre précis) */
  const domainRules = NOVA_DOMAIN_KB[domainKey] || [];
  for(const r of domainRules){
    if(r.test.test(userMessage)) addFact(pick(r.replies));
  }

  /* 3) glossaire — scan complet du message, peut remonter plusieurs termes à la fois
     (ex: "quelle différence entre masse et poids ?" remonte les deux définitions) */
  const normMsg = stripAccents(userMessage.toLowerCase());
  for(const key in NOVA_GLOSSARY){
    const normKey = stripAccents(key);
    const re = new RegExp(`(^|[^a-z0-9])${normKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}s?([^a-z0-9]|$)`, 'i');
    if(re.test(normMsg)) addFact(NOVA_GLOSSARY[key]);
  }

  if(facts.length === 0) return null;
  if(facts.length === 1) return pick(NOVA_OPENERS_SINGLE) + facts[0];

  /* plusieurs faits pertinents trouvés : on les tisse en un vrai paragraphe rédigé,
     jamais une simple liste à puces — jusqu'à 3 faits pour rester lisible */
  const used = facts.slice(0, 3);
  let answer = pick(NOVA_OPENERS_MULTI) + used[0];
  for(let i = 1; i < used.length; i++){
    answer += pick(NOVA_CONNECTORS) + lowerFirst(used[i]);
  }
  return answer + pick(NOVA_CLOSERS);
}

function novaReply(userMessage, kb, domainKey){
  const meta = tryMetaChapterQuestion(userMessage);
  if(meta) return meta;

  /* indices d'exercice : traités en priorité et à part, car ils suivent une
     progression (niveau 1 → 2 → 3) qui ne doit pas être mélangée à autre chose */
  const chapterRules = (kb && kb.rules) || [];
  for(const r of chapterRules){
    if(r.hint && r.test.test(userMessage)){
      const askKey = `${currentChapterCtx ? currentChapterCtx.chapterKey : ''}::${r.test}`;
      const n = (hintAskCount[askKey] || 0);
      hintAskCount[askKey] = n + 1;
      return r.replies[Math.min(n, r.replies.length - 1)];
    }
  }

  if(domainKey === 'Physique'){
    const calc = tryPhysicsCalculation(userMessage);
    if(calc) return calc;
  }

  const mathCalc = tryMathCalculation(userMessage);
  if(mathCalc) return mathCalc;

  const composed = novaComposeAnswer(userMessage, kb, domainKey);
  if(composed) return composed;

  for(const r of NOVA_GENERIC_RULES){ if(r.test.test(userMessage)) return pick(r.replies); }

  if(/\?/.test(userMessage)){
    const objectives = document.getElementById('chapObjectives');
    const firstObjective = objectives ? objectives.querySelector('li') : null;
    const hint = firstObjective ? ` Par exemple, demande-moi « ${firstObjective.textContent.split(' ').slice(0, 4).join(' ')}... » pour commencer.` : '';
    return `Je ne trouve rien sur ce point précis dans le contenu de la plateforme. Essaie avec le mot exact du cours, ou pose ta question autrement.${hint} Je reste ancré dans les vrais cours de la plateforme plutôt que d'inventer une réponse — plus tu es précis·e, plus je peux t'aider.`;
  }
  return "Je note ! Essaie de reformuler sous forme de question précise (« pourquoi... », « comment... », « c'est quoi... »), ou donne-moi des valeurs chiffrées si c'est un calcul, pour que je puisse t'aider au mieux.";
}

function mascotMiniSVG(){
  return `<svg viewBox="0 0 60 60" width="24" height="26" class="mascot-mini" aria-hidden="true">
    <rect x="14" y="14" width="32" height="26" rx="12" fill="#232C3B"/>
    <circle cx="24" cy="27" r="4.2" fill="#EAF6FF"/><circle cx="36" cy="27" r="4.2" fill="#EAF6FF"/>
    <circle cx="24" cy="27" r="1.9" fill="#13B8A6"/><circle cx="36" cy="27" r="1.9" fill="#13B8A6"/>
    <path d="M23 34 Q30 38 37 34" stroke="#EAF6FF" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`;
}

function appendAiMessage(text, elId){
  const body = document.getElementById('chatBody');
  const row = document.createElement('div');
  row.className = 'msg-row';
  if(elId) row.id = elId;
  row.innerHTML = `${mascotMiniSVG()}<div class="msg ai">${text}</div>`;
  body.appendChild(row);
  body.scrollTop = body.scrollHeight;
  return row;
}

function setMascotState(state){
  const avatar = document.getElementById('mascotAvatar');
  if(!avatar) return;
  avatar.classList.remove('is-thinking', 'is-talking');
  if(state) avatar.classList.add(state);
}

/* réinitialise la conversation quand on ouvre un nouveau chapitre */
function resetChatForChapter(matiereName, chapterName){
  chatHistory = [];
  const body = document.getElementById('chatBody');
  if(!body) return;
  body.innerHTML = '';
  const key = currentChapterCtx ? currentChapterCtx.chapterKey : null;
  const kb = NOVA_KB[key];
  appendAiMessage(kb ? kb.intro : `Salut, moi c'est Nova ! On est sur « ${chapterName} ». Pose-moi une question, ou demande-moi comment aborder ce chapitre.`);
}

/* Résume ce qui est affiché à l'écran pour ce chapitre précis (objectifs + résumé),
   pour que l'IA distante réponde à propos du vrai contenu plutôt qu'au hasard.
   Inclut aussi la progression complète de la matière (chapitres déjà vus / à venir)
   pour que Nova puisse refuser un sujet hors-programme en citant le bon chapitre
   futur au lieu de rester vague. */
function buildChapterContext(){
  const title = document.getElementById('chapTitle')?.textContent.trim()
    || (currentChapterCtx ? currentChapterCtx.chapters[currentChapterCtx.index] : '');
  const objectives = document.getElementById('chapObjectives')?.textContent.trim().replace(/\s+/g, ' ') || '';
  const recap = document.querySelector('#view-chapitre .recap-box')?.textContent.trim().replace(/\s+/g, ' ') || '';
  const course = document.querySelector('#view-chapitre .course-panel')?.textContent.trim().replace(/\s+/g, ' ').slice(0, 2000) || '';
  const summary = [objectives && `Objectifs : ${objectives}`, recap && `Résumé : ${recap}`].filter(Boolean).join(' — ').slice(0, 1500) || course;

  let programme = '';
  if(currentChapterCtx && Array.isArray(currentChapterCtx.chapters)){
    const { chapters, index, matiere } = currentChapterCtx;
    const lines = chapters.map((ch, i) => {
      const tag = i < index ? 'déjà vu' : (i === index ? 'chapitre actuel' : 'pas encore vu');
      return `${i + 1}. ${ch} (${tag})`;
    });
    programme = `Programme complet de ${matiere} : ${lines.join(' | ')}`;
  }

  return { title, summary, programme };
}

function sendDemo(){
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if(!message) return;
  const sendBtn = document.getElementById('chatSendBtn');
  if(sendBtn && sendBtn.classList.contains('is-loading')) return; // déjà en attente d'une réponse
  const body = document.getElementById('chatBody');
  const userMsg = document.createElement('div');
  userMsg.className = 'msg user';
  userMsg.textContent = message;
  body.appendChild(userMsg);
  input.value = '';
  body.scrollTop = body.scrollHeight;
  chatHistory.push({ role: 'user', content: message });
  if(sendBtn){ sendBtn.classList.add('is-loading'); sendBtn.disabled = true; }

  setMascotState('is-thinking');
  appendAiMessage('<i style="opacity:.6;">Nova réfléchit…</i>', 'novaThinking');

  const key = currentChapterCtx ? currentChapterCtx.chapterKey : null;
  const kb = NOVA_KB[key];
  const domainKey = currentChapterCtx ? currentChapterCtx.domain : null;
  const historyForApi = chatHistory.slice(0, -1).slice(-8); /* sans le message qu'on vient d'ajouter */

  const finish = (reply) => {
    document.getElementById('novaThinking')?.remove();
    setMascotState('is-talking');
    appendAiMessage(reply);
    chatHistory.push({ role: 'assistant', content: reply });
    if(sendBtn){ sendBtn.classList.remove('is-loading'); sendBtn.disabled = false; }
    setTimeout(() => setMascotState(null), 1500);
  };

  /* IA distante open source (via Groq — gratuit, sans abonnement) si Supabase est
     connecté ; sinon, ou si l'appel échoue (hors ligne, quota...), repli sur le mentor local
     par mots-clés ci-dessus, pour que Nova reste utilisable même sans connexion fiable. */
  if(supabaseClient){
    const ctx = buildChapterContext();
    /* Sécurité : plus de secret partagé côté client (visible par n'importe
       qui via "Afficher le code source"). Authentification par le JWT de
       session, ajouté automatiquement par le SDK Supabase ; à vérifier
       côté Edge Function avec supabase.auth.getUser(). */
    supabaseClient.functions.invoke('ai-chat', {
      body: { message, chapterTitle: ctx.title, chapterSummary: ctx.summary, programme: ctx.programme, history: historyForApi }
    }).then(({ data, error }) => {
      /* réponse d'un LLM distant : échappée avant injection HTML pour empêcher
         qu'une injection de prompt ne fasse exécuter du HTML/JS dans le chat */
      if(!error && data && data.reply){ finish(jsEscHtmlKeepLines(data.reply)); }
      else {
        if(error) console.error('[ai-chat]', error);
        finish(novaReply(message, kb, domainKey));
      }
    }).catch(e => { console.error('[ai-chat]', e); finish(novaReply(message, kb, domainKey)); });
  } else {
    setTimeout(() => finish(novaReply(message, kb, domainKey)), 400 + Math.random() * 400);
  }
}
document.getElementById('chatInput').addEventListener('keypress', (e) => { if(e.key === 'Enter') sendDemo(); });

/* ===== Bascule de thème (clair / sombre) ===== */
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  try{ localStorage.setItem('esu-theme', theme); }catch(e){}
}
const THEME_TOGGLE_HTML = `<button class="theme-toggle" data-theme-toggle title="Changer de thème" aria-label="Changer de thème">
  <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
  </svg>
  <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
</button>`;
const NAV_BURGER_HTML = `<button class="nav-burger" type="button" aria-label="Ouvrir le menu">
  <svg class="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
</button>`;
/* regroupe (liens + burger + bouton thème) dans un même bloc à droite de chaque nav,
   pour que l'ensemble reste compact et fonctionne à toutes les largeurs d'écran */
function setupNav(){
  document.querySelectorAll('nav').forEach(nav => {
    let right = nav.querySelector(':scope > .nav-right');
    if(!right){
      right = document.createElement('div');
      right.className = 'nav-right';
      nav.appendChild(right);
    }
    const links = nav.querySelector(':scope > .nav-links');
    if(links && !right.contains(links)){
      if(!right.querySelector('.nav-burger')){ right.insertAdjacentHTML('afterbegin', NAV_BURGER_HTML); }
      right.appendChild(links);
    }
    if(!right.querySelector('[data-theme-toggle]')){
      right.insertAdjacentHTML('beforeend', THEME_TOGGLE_HTML);
    }
  });
}
(function initTheme(){
  let saved = null;
  try{ saved = localStorage.getItem('esu-theme'); }catch(e){}
  applyTheme(saved === 'dark' ? 'dark' : 'light');
  setupNav();
})();
document.addEventListener('click', (e) => {
  const burger = e.target.closest('.nav-burger');
  if(burger){
    const links = burger.parentElement.querySelector('.nav-links');
    if(links){ links.classList.toggle('open'); burger.classList.toggle('open'); }
    return;
  }
  if(e.target.closest('[data-theme-toggle]')){
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
    return;
  }
  const openLinks = document.querySelector('.nav-links.open');
  if(openLinks && (e.target.closest('.nav-links a') || !e.target.closest('.nav-links'))){
    openLinks.classList.remove('open');
    document.querySelectorAll('.nav-burger.open').forEach(b => b.classList.remove('open'));
  }
});

/* état initial : niveau L1 par défaut, vue accueil */
esuInitRouting();
restoreSession().finally(esuAfterSession);
updatePendulum();
renderLevelChips(selectedLevel);
renderSubjects(selectedLevel);
isRestoringHistory = true;
showView('accueil');
isRestoringHistory = false;

/* ===== PWA : enregistrement du service worker + bouton d'installation ===== */
(function initPWA(){
  /* Le service worker est enregistré, et l'invite d'installation du navigateur
     (beforeinstallprompt) est capturée, par un petit script en haut de index.html
     (window.__pwa). Avant, ce code vivait ici, tout à la fin d'un app.js de 9 Mo :
     le navigateur émettait l'événement AVANT que ce code n'existe -> l'événement
     était perdu et le bouton n'apparaissait jamais. Ici on ne fait plus que
     l'interface du bouton. */
  const wrap = document.getElementById('pwaInstallWrap');
  const btn = document.getElementById('pwaInstallBtn');
  const dismissBtn = document.getElementById('pwaInstallDismiss');
  const tip = document.getElementById('pwaIosTip');
  const tipText = document.getElementById('pwaTipText');
  const tipClose = document.getElementById('pwaIosClose');
  if(!wrap || !btn) return;
  const state = window.__pwa || (window.__pwa = { prompt: null, installed: false });

  const SNOOZE_MS = 3 * 24 * 3600 * 1000;   /* « Masquer » = on ne réaffiche pas pendant 3 jours */
  const lsGet = (k) => { try{ return localStorage.getItem(k); }catch(e){ return null; } };
  const lsSet = (k, v) => { try{ localStorage.setItem(k, v); }catch(e){} };

  const ua = navigator.userAgent || '';
  const isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /android/i.test(ua);
  const isFirefox = /firefox|fxios/i.test(ua);
  const isSafariDesktop = /safari/i.test(ua) && !/chrome|crios|chromium|fxios|edg|android/i.test(ua) && !isIOS;

  const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true;
  const snoozed = () => {
    const t = parseInt(lsGet('esu-pwa-snooze') || '0', 10);
    return !!t && (Date.now() - t) < SNOOZE_MS;
  };

  function refresh(){
    /* si l'appli a déjà été installée sur cet appareil et que le navigateur ne propose plus
       l'installation, on suppose qu'elle est installée et on masque le bouton */
    const installedGuess = lsGet('esu-pwa-installed') === '1' && !state.prompt;
    const visible = !isStandalone() && !snoozed() && !installedGuess;
    wrap.classList.toggle('show', visible);
    if(!visible && tip) tip.classList.remove('show');
  }

  function helpText(){
    if(location.protocol === 'file:'){
      return "Ouvre la plateforme depuis son adresse en ligne (https) : l'installation ne fonctionne pas depuis un fichier local.";
    }
    if(!window.isSecureContext){
      return "L'installation exige une connexion sécurisée : ouvre le site en https://.";
    }
    if(isIOS){
      return "Touche le bouton Partager (carré avec une flèche), puis « Sur l'écran d'accueil ». Depuis un autre navigateur que Safari, ouvre d'abord le site dans Safari.";
    }
    if(isAndroid){
      return "Ouvre le menu ⋮ de ton navigateur, puis choisis « Installer l'application » (ou « Ajouter à l'écran d'accueil »).";
    }
    if(isFirefox){
      return "Firefox ne permet pas d'installer une application web sur ordinateur : ouvre le site avec Chrome ou Edge pour l'installer.";
    }
    if(isSafariDesktop){
      return "Dans Safari : menu Fichier → « Ajouter au Dock ».";
    }
    return "Clique sur l'icône d'installation à droite de la barre d'adresse, ou ouvre le menu ⋮ → « Installer E-Student University ».";
  }

  function toggleHelp(force){
    if(!tip || !tipText) return;
    const show = (typeof force === 'boolean') ? force : !tip.classList.contains('show');
    if(show) tipText.textContent = helpText();
    tip.classList.toggle('show', show);
  }

  btn.addEventListener('click', async () => {
    const p = state.prompt;
    if(!p){ toggleHelp(); return; }      /* pas d'invite native disponible : on explique comment faire */
    toggleHelp(false);
    state.prompt = null;                 /* une invite ne peut servir qu'une seule fois */
    try{
      p.prompt();
      const choice = await p.userChoice;
      if(choice && choice.outcome === 'accepted'){ wrap.classList.remove('show'); }
    }catch(e){
      console.warn('[pwa]', e);
      toggleHelp(true);
    }
  });

  dismissBtn?.addEventListener('click', () => {
    lsSet('esu-pwa-snooze', String(Date.now()));
    refresh();
  });

  tipClose?.addEventListener('click', () => {
    toggleHelp(false);
    lsSet('esu-ios-tip-dismissed', '1');
  });

  /* le navigateur (re)propose l'installation => l'appli n'est pas installée */
  window.addEventListener('pwa-prompt-ready', () => { lsSet('esu-pwa-installed', '0'); refresh(); });
  window.addEventListener('pwa-installed', () => { lsSet('esu-pwa-installed', '1'); refresh(); });
  try{ window.matchMedia('(display-mode: standalone)').addEventListener('change', refresh); }catch(e){}

  if(state.prompt) lsSet('esu-pwa-installed', '0');
  if(state.installed) lsSet('esu-pwa-installed', '1');
  refresh();

  /* iOS n'a pas d'invite native : on affiche une seule fois l'astuce « Sur l'écran d'accueil » */
  if(isIOS && !isStandalone() && lsGet('esu-ios-tip-dismissed') !== '1'){
    setTimeout(() => { if(wrap.classList.contains('show')) toggleHelp(true); }, 2500);
  }
})();
