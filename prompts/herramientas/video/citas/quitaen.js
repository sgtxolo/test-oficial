// Retira las 5 dudosas de inglés del vídeo del 26/11 (el usuario lo pidió el 28/11/2026). Uso (carpeta del proyecto): node quitaen.js
const fs = require('fs'); const NL = String.fromCharCode(10);
const IDS = ['FM530', 'FM532', 'FM566', 'FM580', 'FM583'];
const F = 'prompts/herramientas/psico/ingles-forma-banco.json';
const raw = fs.readFileSync(F, 'utf8'); const B = JSON.parse(raw);
const fuera = B.filter(q => IDS.includes(q.qid)); if (fuera.length !== 5) throw new Error('encontradas ' + fuera.length);
if (B.at(-1).qid !== 'FM609') throw new Error('último ' + B.at(-1).qid);
const ind = (raw.match(/^\[\r?\n( +)/) || [])[1];
fs.writeFileSync(F, JSON.stringify(B.filter(q => !IDS.includes(q.qid)), null, ind ? ind.length : 0) + (raw.endsWith(NL) ? NL : ''));
fs.writeFileSync('prompts/herramientas/video/retiradas-ingles-28-11.json', JSON.stringify(fuera, null, 1) + NL);
console.log('banco', B.length, '→', B.length - 5);
