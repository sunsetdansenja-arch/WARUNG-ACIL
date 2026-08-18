// File: sw.js
const CACHE_NAME = 'warung-acil-pos-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './test.html',
  './config.js',
  './master.html',
  'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

// Instalasikan Service Worker & Cache Aset
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ambil aset dari cache jika offline
self.addEventListener('fetch', (event) => {
  // Hanya cegat request GET aset lokal
  if (event.request.method === 'GET' && !event.request.url.includes('n8n')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});
