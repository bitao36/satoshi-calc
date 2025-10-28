const CACHE_NAME = "satoshi-calc-cache-v1";
const URLS_TO_CACHE = [
  "/manifest.json",
  "/satoshi-calc/index.html",
  "/satoshi-calc/css/estilos.css",
  "/satoshi-calc/js/script.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
