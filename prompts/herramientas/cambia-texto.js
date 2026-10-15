// node /tmp/alarga.js <fichero bNN.js> <json de cambios [[texto único de la opción falsa, texto nuevo], ...]>
const fs = require('fs'); const [f, j] = process.argv.slice(2); let s = fs.readFileSync(f, 'utf8');
for (const [a, b] of JSON.parse(fs.readFileSync(j, 'utf8'))) { if (!s.includes(a)) { console.log('NO', a.slice(0, 60)); continue; } s = s.replace(a, b); }
fs.writeFileSync(f, s);
