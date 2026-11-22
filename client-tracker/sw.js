// Offline support for the Client Tracker demo. Online, every file comes fresh from the network
// (so an update can never mix old and new files); the cache is only the fallback when offline.
// Paths are relative to this file, so the demo works from any folder. Bump VERSION when files change.
const VERSION = 'client-tracker-demo-v1';
const SHELL = ['./', 'css/styles.css', 'js/app.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
const HOME = new URL('./', self.location).href;

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin || !url.href.startsWith(HOME)) return;
  const key = e.request.mode === 'navigate' ? HOME : e.request;
  e.respondWith(caches.open(VERSION).then(async (cache) => {
    try {
      const res = await fetch(e.request, { cache: 'no-cache' });
      if (res.ok) cache.put(key, res.clone());
      return res;
    } catch {
      return (await cache.match(key)) || Response.error();
    }
  }));
});
