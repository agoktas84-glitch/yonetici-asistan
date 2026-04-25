// Service Worker — cache KAPALI, her zaman güncel sürüm
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  // Tüm eski cache'leri sil
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});
// Her isteği direkt internetten al — cache kullanma
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});
