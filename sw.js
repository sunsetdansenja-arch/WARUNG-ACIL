// File: sw.js
const CACHE_NAME = 'warung-acil-pos-v2';

// Daftar aset yang WAJIB di-cache agar aplikasi bisa berjalan penuh saat offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './test.html',
  './master.html',
  './config.js',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

// 1. Install Event: Pra-cache semua aset statis
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets for offline use');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Activate Event: Hapus cache lama versi sebelumnya
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Event: Strategi Stale-While-Revalidate untuk aset lokal/CDN (mengabaikan request n8n/webhook)
self.addEventListener('fetch', (event) => {
  // Hanya cegat request GET dan abaikan request ke backend/n8n webhook
  if (event.request.method === 'GET' && !event.request.url.includes('n8n')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          // Buat fetch request untuk memperbarui cache di background jika online
          const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => {
              // Fallback navigasi jika jaringan mati dan cache tidak ditemukan
              if (event.request.mode === 'navigate') {
                return caches.match('./test.html');
              }
            });

          // Prioritaskan respon dari cache (jika ada), jika tidak tunggu network
          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});
