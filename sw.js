// File: sw.js
const CACHE_NAME = 'warung-acil-pos-v2';

// Daftar aset yang WAJIB di-cache agar aplikasi bisa dibuka offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './test.html',      // Ubah jika nama file kasir Anda berbeda (misal: dashboard.html)
  './master.html',
  './config.js',
  'https://cdn.tailwindcss.com', // Disinkronkan dengan script Tailwind di test.html
  'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

// 1. Install Event: Simpan semua aset ke cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets for offline use');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Activate Event: Bersihkan cache versi lama jika ada pembaruan
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

// 3. Fetch Event: Ambil aset dari cache saat offline, abaikan endpoint n8n webhook
self.addEventListener('fetch', (event) => {
  // Hanya cegat request GET aset lokal/CDN dan abaikan kiriman data webhook ke n8n
  if (event.request.method === 'GET' && !event.request.url.includes('n8n')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).catch(() => {
          // Fallback jika fetch gagal dan tidak ada di cache
          if (event.request.mode === 'navigate') {
            return caches.match('./test.html');
          }
        });
      })
    );
  }
});
