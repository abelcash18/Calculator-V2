self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v3').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './cal.css',
        './cal.js',
        './manifest.json',
        './icon-1.png',
        './icon-192.png',
        './icon-515.png',
        './splashscreen.jpg'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = ['v3'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
          return undefined;
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});

