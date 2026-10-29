// Sube en 1 el número de CACHE_NAME de service-worker.js (oposicion-cache-vNNN)
const fs = require('fs'); let s = fs.readFileSync('service-worker.js', 'utf8');
s = s.replace(/(oposicion-cache-v)(\d+)/, (m, a, b) => a + (+b + 1)); fs.writeFileSync('service-worker.js', s);
