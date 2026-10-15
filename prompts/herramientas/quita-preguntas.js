// Quita preguntas de un preguntas-t5-bNN.js por un trozo único de su enunciado. Uso: node quita-preguntas.js <fichero> "<trozo>" ...
const fs = require('fs'); const [f, ...qs] = process.argv.slice(2); const L = fs.readFileSync(f, 'utf8').split('\n'); const out = [];
for (let i = 0; i < L.length; i++) { if (/^\{k, /.test(L[i]) && qs.some(q => L[i].includes(q))) { while (i + 1 < L.length && !/^\{k, |^\];/.test(L[i + 1])) i++; continue; } out.push(L[i]); }
fs.writeFileSync(f, out.join('\n')); console.log('preguntas:', out.filter(l => /^\{k, /.test(l)).length);
