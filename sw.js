const CACHE = 'ep-v9';
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(['/yonetici-asistan/', '/yonetici-asistan/index.html', '/yonetici-asistan/manifest.json']))
  );
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  // index.html her zaman internetten al — cache'den ALMA
  if(e.request.url.includes('index.html') || e.request.url.endsWith('/')){
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
