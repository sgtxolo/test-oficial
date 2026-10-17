// Tema 5 · genera tema5/mapa-fijo-t5.json (id → 'k-j') para que mapa-preguntas.js ancle a su párrafo marcado:
//   · las preguntas nuevas para las marcas (oficiales 5-315…5-329 e IA 5-ia-2101…2102);
//   · las preguntas que el mapa colgaba de las fichas «RECUERDA del temario», llevadas al párrafo de su R en el articulado.
// Uso: node prompts/herramientas/tema5/mapa-fijo-gen.js   (después: node prompts/herramientas/mapa-preguntas.js)
const fs = require('fs'), path = require('path');
const X = require('../expres-lib.js')(5);
const { RS } = require('./marcas-t5.js');
const OUT = path.join(__dirname, 'mapa-fijo-t5.json');
const F = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const NUEVAS = { '5-315': 'R2', '5-316': 'R3', '5-317': 'R4', '5-318': 'R5', '5-319': 'R8', '5-320': 'R9', '5-321': 'R13', '5-322': 'R14', '5-323': 'R16',
  '5-324': 'R18', '5-325': 'R24', '5-326': 'R25', '5-327': 'R27', '5-328': 'R32', '5-329': 'R33' };
Object.entries(NUEVAS).forEach(([id, r]) => { F[id] = RS[r].join('-'); });
const h = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'esquemas.html'), 'utf8');
const MAPA = JSON.parse(h.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const kRec = X.fichaBloque.findIndex(t => /^RECUERDA/.test(t));
let n = 0;
Object.entries(MAPA).forEach(([id, v]) => { const m = v.match(/^5-(\d+)-(\d+)/); if (!m || +m[1] < kRec) return;
  const r = (X.fichas[+m[1]].ps[+m[2]].h.match(/<b>(R\d+)<\/b>/) || [])[1]; if (r && RS[r]) { F[id] = RS[r].join('-'); n++; } });
F['5-ia-2101'] = '193-6'; F['5-ia-2102'] = '226-0';
Object.entries(NUEVAS).forEach(([id, r]) => { F[id] = RS[r].join('-'); });   // las nuevas mandan sobre lo anterior
fs.writeFileSync(OUT, JSON.stringify(F, null, 1));
console.log('mapa-fijo-t5.json:', Object.keys(F).length, 'preguntas ancladas ·', n, 'venían de las fichas RECUERDA');
