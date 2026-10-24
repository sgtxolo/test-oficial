const CACHE_NAME = "oposicion-cache-v201";
// La versión de arriba solo sirve para que el navegador vea que el service worker ha cambiado.
// Los ficheros viven en una caché fija (DATOS) que no se tira en cada versión: así un cambio de
// versión ya no obliga a volver a bajar las tres apps enteras (unos 6 MB comprimidos) en el móvil.
const DATOS = "oposicion-datos";
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
  "./expres/q1.js",
  "./expres/q2.js",
  "./expres/q3.js",
  "./expres/q4.js",
  "./expres/q5.js",
  "./expres/q6.js",
  "./expres/q7.js",
  "./expres/q8.js",
  "./expres/q9.js",
  "./expres/q11.js",
  "./expres/q12.js",
  "./expres/q13.js",
  "./expres/q14.js",
  "./fonts/fira-sans-condensed.css",
  "./fonts/fira-sans-condensed-400-latin-ext.woff2",
  "./fonts/fira-sans-condensed-400-latin.woff2",
  "./fonts/fira-sans-condensed-500-latin-ext.woff2",
  "./fonts/fira-sans-condensed-500-latin.woff2",
  "./fonts/fira-sans-condensed-600-latin-ext.woff2",
  "./fonts/fira-sans-condensed-600-latin.woff2",
  "./fonts/fira-sans-condensed-700-latin-ext.woff2",
  "./fonts/fira-sans-condensed-700-latin.woff2",
  "./fonts/fira-sans-condensed-800-latin-ext.woff2",
  "./fonts/fira-sans-condensed-800-latin.woff2",
  "./manifest-esquemas.json",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-ingles-180.png",
  "./icon-conocimiento-180.png",
  "./icon-esquemas-180.png"
];
// Sin respuesta de la red en este tiempo se abre la copia guardada (red muy lenta o sin cobertura).
const ESPERA_RED = 4000;

self.addEventListener("install", event => {
  self.skipWaiting();
  // Solo se bajan los ficheros que aún no estén guardados (primera instalación).
  event.waitUntil(
    caches.open(DATOS).then(async cache => {
      await migrarCacheAntigua(cache);
      for (const f of APP_SHELL) {
        if (await cache.match(f)) continue;
        try { const r = await fetch(f, { cache: "no-cache" }); if (r.ok) await cache.put(f, r); } catch (e) {}
      }
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== DATOS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Copia lo que tenía la caché por versiones (oposicion-cache-vNNN) para no volver a descargarlo.
async function migrarCacheAntigua(cache) {
  if ((await cache.keys()).length) return;
  const viejas = (await caches.keys()).filter(k => k.indexOf("oposicion-cache-") === 0);
  for (const k of viejas) {
    const c = await caches.open(k);
    for (const req of await c.keys()) {
      if (await cache.match(req)) continue;
      const r = await c.match(req);
      if (r) await cache.put(req, r);
    }
  }
}

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const esPagina = event.request.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname.includes("/expres/");

  if (esPagina) {
    // Red primero, pero preguntando "¿ha cambiado?" (no-cache): si no ha cambiado, el servidor
    // contesta 304 y no se baja nada. Así la app se abre UNA sola vez y ya en la versión buena,
    // sin enseñar primero la antigua y recargar después.
    event.respondWith(caches.open(DATOS).then(async cache => {
      const clave = url.origin + url.pathname;
      const red = fetch(event.request, { cache: "no-cache" }).then(r => {
        if (r && r.status === 200) cache.put(clave, r.clone());
        return r;
      });
      const guardada = await cache.match(clave);
      if (!guardada) return red;
      event.waitUntil(red.catch(() => {}));
      const plazo = new Promise(ok => setTimeout(() => ok(null), ESPERA_RED));
      const r = await Promise.race([red.catch(() => null), plazo]);
      return (r && r.ok) ? r : guardada;
    }));
    return;
  }

  // Iconos y manifiestos: copia guardada al instante y se actualiza en segundo plano.
  event.respondWith(caches.open(DATOS).then(async cache => {
    const guardada = await cache.match(event.request);
    const red = fetch(event.request).then(r => {
      if (r && r.status === 200) cache.put(event.request, r.clone());
      return r;
    });
    if (guardada) { event.waitUntil(red.catch(() => {})); return guardada; }
    return red;
  }));
});
