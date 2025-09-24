const CACHE_NAME = 'weather-dashboard-v1';
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
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            // Cache a copy of the response
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          // Optional fallback for offline
          return caches.match('/');
        });
    })
  );
});
