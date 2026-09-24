/* Service worker — E-Student University
   Rôle : rendre la plateforme installable (PWA) + ouverture rapide et hors-ligne partielle.

   Stratégies (version allégée, v7) :
   - index.html / app.js / manifest : réseau d'abord, mais si le réseau met plus de 3,5 s à
     répondre on sert la copie en cache (chargement instantané sur connexion lente/hors-ligne).
   - Fichiers de chapitres (<id>.js, à la racine du repository, plus de sous-dossier chunks/) et
     images locales : « stale-while-revalidate » = copie du cache servie tout de suite, mise à
     jour en arrière-plan pour la visite suivante.
   - Vidéos : NON interceptées (le navigateur gère). Avant, les 6 vidéos étaient pré-téléchargées à
     chaque mise à jour du service worker, ce qui ralentissait fortement la première visite.
   - Ressources tierces (polices, MathJax, Supabase) : réseau direct. */

const VERSION = 'v8';
const CACHE_CORE = 'esu-core-' + VERSION;
const CACHE_CHUNKS = 'esu-chunks-' + VERSION;
const CACHE_ASSETS = 'esu-assets-' + VERSION;
const KEEP = [CACHE_CORE, CACHE_CHUNKS, CACHE_ASSETS];

const PRECACHE = [
  './index.html', './app.js', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-512-maskable.png',
  './apple-touch-icon.png', './favicon-32.png', './logo-mark.png', './logo-full-mark.png'
];

self.addEventListener('install', (event) => {
  /* un fichier manquant ne doit pas faire échouer toute l'installation */
  event.waitUntil(
    caches.open(CACHE_CORE).then((cache) => Promise.allSettled(PRECACHE.map((u) => cache.add(u))))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => !KEEP.includes(k)).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

function networkFirst(req, cacheName, timeoutMs) {
  return new Promise((resolve) => {
    let done = false;
    const fromCache = () => caches.match(req, { ignoreSearch: true });
    const timer = setTimeout(async () => {
      const c = await fromCache();
      if (c && !done) { done = true; resolve(c); }
    }, timeoutMs);
    fetch(req).then((res) => {
      clearTimeout(timer);
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(cacheName).then((c) => c.put(req, copy)).catch(() => {});
      }
      if (!done) { done = true; resolve(res); }
    }, async () => {
      clearTimeout(timer);
      const c = await fromCache();
      if (!done) {
        done = true;
        resolve(c || (req.mode === 'navigate' ? await caches.match('./index.html') : null) || Response.error());
      }
    });
  });
}

function staleWhileRevalidate(event, cacheName) {
  const req = event.request;
  const update = caches.open(cacheName).then((cache) =>
    fetch(req).then((res) => {
      if (res && res.ok && res.type === 'basic') cache.put(req, res.clone());
      return res;
    })
  ).catch(() => null);
  event.waitUntil(update);
  return caches.match(req).then((cached) => cached || update.then((r) => r || Response.error()));
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.headers.has('range') || req.destination === 'video' || req.destination === 'audio' ||
      /\.(mp4|webm|mov|m4v)$/i.test(url.pathname)) return;

  const p = url.pathname;
  if (req.mode === 'navigate' || /\/(index\.html|app\.js|manifest\.webmanifest)$/.test(p) || p.endsWith('/')) {
    event.respondWith(networkFirst(req, CACHE_CORE, 3500));
  } else if (/\.js$/.test(p) && !/\/(app|sw)\.js$/.test(p)) {
    event.respondWith(staleWhileRevalidate(event, CACHE_CHUNKS));
  } else {
    event.respondWith(staleWhileRevalidate(event, CACHE_ASSETS));
  }
});
