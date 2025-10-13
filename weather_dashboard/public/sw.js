const CACHE_NAME = 'weather-dashboard-v1';
const API_CACHE_NAME = 'weather-api-v1';
const OFFLINE_URL = '/offline.html';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  OFFLINE_URL,
];

// INSTALL - pre-cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVATE - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== API_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH - serve assets and APIs
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Handle only GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Network-first for APIs
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(API_CACHE_NAME).then(async (cache) => {
        try {
          const response = await fetch(request);
          cache.put(request, response.clone());
          return response;
        } catch (error) {
          const cached = await cache.match(request);
          return (
            cached ||
            new Response(JSON.stringify({ error: 'Offline and no cached data' }), {
              status: 503,
              headers: { 'Content-Type': 'application/json' },
            })
          );
        }
      })
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request).catch(() => caches.match(OFFLINE_URL));
    })
  );
});
