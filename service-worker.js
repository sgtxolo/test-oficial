const CACHE_NAME = "oposicion-cache-v177";
const APP_SHELL = [
  "./test-oficial-conocimiento.html",
  "./test-oficial-ingles.html",
  "./esquemas.html",
  "./expres/t1.js",
  "./expres/t11.js",
  "./expres/t12.js",
  "./expres/t13.js",
  "./expres/t14.js",
  "./expres/t2.js",
  "./expres/t3.js",
  "./expres/t4.js",
  "./expres/t5.js",
  "./expres/t6.js",
  "./expres/t7.js",
  "./expres/t8.js",
  "./expres/t9.js",
  "./manifest-esquemas.json",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-ingles-180.png",
  "./icon-conocimiento-180.png",
  "./icon-esquemas-180.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isHtml = event.request.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname.includes("/expres/");

  if (url.pathname.endsWith("/esquemas.html")) {
    // Esquemas (10 MB): se abre al instante desde la copia guardada y se actualiza en segundo plano.
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => cache.match(event.request).then(cached => {
        const red = fetch(event.request, { cache: "no-store" }).then(r => { if (r && r.status === 200) cache.put(event.request, r.clone()); return r; });
        if (cached) { event.waitUntil(red.catch(() => {})); return cached; }
        return red;
      }))
    );
    return;
  }

  if (isHtml) {
    // Red primero para HTML: siempre intenta traer la Ãºltima versiÃ³n;
    // si no hay red (offline), sirve la copia cacheada.
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
