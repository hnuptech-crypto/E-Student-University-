/* Service worker — E-Student University
   Rôle : rendre la plateforme installable (PWA) et permettre une ouverture
   hors-ligne de la coquille applicative déjà visitée. Les ressources
   externes (polices Google, MathJax, Supabase) restent chargées depuis le
   réseau normalement ; seule la page principale et les icônes locales sont
   mises en cache. */

const CACHE_NAME = 'esu-shell-v4';
const APP_SHELL = [
  './e-student-university-plateforme-chimie-l3cf-complete.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './logo-mark.png',
  './logo-full-mark.png',
  './author.jpg',
  './hero-molecules.mp4',
  './hero-molecules-poster.jpg',
  './labo-experience.mp4',
  './labo-experience-poster.jpg',
  './chalkboard-formulas.mp4',
  './chalkboard-formulas-poster.jpg',
  './code-interface.mp4',
  './code-interface-poster.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (!isSameOrigin) {
    /* Ressources tierces (polices, MathJax, Supabase...) : réseau direct,
       sans faire transiter par le cache pour ne pas gonfler son poids. */
    return;
  }

  /* Coquille applicative : réseau d'abord (pour rester à jour quand la
     connexion est bonne), repli sur le cache si hors-ligne ou en échec. */
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match('./e-student-university-plateforme-chimie-l3cf-complete.html')))
  );
});
