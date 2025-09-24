const CACHE_NAME = 'weather-dashboard-v1';
const API_CACHE_NAME = 'weather-api-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/src/main.tsx',
  '/src/components/SearchBar.tsx',
  '/src/components/WeatherCard.tsx',
  '/src/components/ForecastCard.tsx',
  '/src/components/ErrorMessage.tsx',
  '/src/pages/Home.tsx',
  '/src/pages/About.tsx',
  '/src/pages/NotFound.tsx',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== API_CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event - serve API and static assets from cache
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Handle API requests differently
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(API_CACHE_NAME).then(async (cache) => {
        try {
          const response = await fetch(request);
          cache.put(request, response.clone());
          return response;
        } catch (err) {
          const cachedResponse = await cache.match(request);
          if (cachedResponse) return cachedResponse;
          return new Response(JSON.stringify({ error: 'Offline and no cached data' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      })
    );
    return;
  }

  // Handle static assets
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
