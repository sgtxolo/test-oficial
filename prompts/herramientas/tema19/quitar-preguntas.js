// Quita de un bloque las preguntas cuyo id (19-ia-N) esté en la lista, leyendo el --json generado. Uso: node quitar-preguntas.js bloque.js 2401 2405 ...
const fs = require('fs');
const f = process.argv[2], ids = process.argv.slice(3).map(Number);
const ini0 = 1001 + 100 * (Number((f.match(/b(\d+)\.js/) || [])[1]) - 1);
const s = fs.readFileSync(f, 'utf8');
const ini = s.indexOf('\nq('), fin = s.indexOf('\n];', ini);
const trozos = s.slice(ini + 1, fin).split(/\n(?=(?:\/\/[^\n]*\n)*q\()/);
const quitar = new Set(ids.map(i => i - ini0));
fs.writeFileSync(f, s.slice(0, ini + 1) + trozos.filter((t, i) => !quitar.has(i)).join('\n') + s.slice(fin));
console.log('quitadas', quitar.size, 'de', trozos.length);
