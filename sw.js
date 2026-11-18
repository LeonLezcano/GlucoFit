/**
 * sw.js — Service Worker PWA de Nivel Profesional (Control Anti-Stale)
 * Invariante AiAppFactory: Caché atómica versionada, pre-caché y purga inmediata
 */

const CACHE_NAME = 'glucofit-cache-v1.0.00';
const CRITICAL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './styles.css',
  './app.js',
  './version.json',
  './src/data/exercises.js',
  './src/data/routines.js',
  './src/services/metabolic-guard.js',
  './src/services/storage.js',
  './src/services/session-coach.js',
  './src/utils/sanitizer.js',
  './assets/icon-192.svg',
  './assets/icon-512.svg'
];

// 1. INSTALACIÓN: Pre-caché atómico
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CRITICAL_ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// 2. ACTIVACIÓN: Purga de cachés previas y control inmediato
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key.startsWith('glucofit-cache-')) {
            console.log('[SW] Purgando versión de caché obsoleta:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// 3. FETCH: Estrategia Híbrida (Network-First para HTML, Cache-First para estáticos)
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Bypass para peticiones que no sean GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Bypass para llamadas externas de APIs o Firestore
  if (url.origin !== self.location.origin) return;

  // Network-First para navegación HTML
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('./index.html') || caches.match('./'))
    );
    return;
  }

  // Cache-First con fallback a red para recursos estáticos locales
  event.respondWith(
    caches.match(req).then((cachedResp) => {
      if (cachedResp) {
        // Refresco en background silencioso
        fetch(req).then((networkResp) => {
          if (networkResp && networkResp.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, networkResp));
          }
        }).catch(() => {});
        return cachedResp;
      }
      return fetch(req);
    })
  );
});
