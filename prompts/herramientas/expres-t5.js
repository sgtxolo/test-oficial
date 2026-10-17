// ⚡ EXPRÉS del Tema 5 (Bases de datos europeas: SIS, VIS, Código de visados, Rgto. 977/2011, Eurodac y Orden AEC/240/2011,
// SOLO lo subrayado). Mismo formato que los temas 1, 2, 3 y 7 (rehecho el 17/10/2026):
// oficial / marca suya (EXOF, EX, ✱) / ficha R → apartado ENTERO; solo IA → recortado con (…); poco preguntado por IA → título + 🎯;
// por artículo o el literal o el cuadro (cuadro solo si recoge ≥ 80 % de las respuestas); sin RECUERDA final; fuera las preguntas de «solo artículo».
// Tope 40 págs (tema de >300 págs): artículos con solo IA y ≤ 12 preguntas → título + 🎯; el resto de IA con ventana 4/3. Lo oficial/marcas/R, entero.
// Uso: node prompts/herramientas/expres-t5.js     (ajustables: BAJO, CAB, ANT y los de expres-lib)
Object.entries({ VEC_MAX: 0, HUECO_MAX: 1, UNO: 0.8, RUN_MIN: 90, GRIS_PLIEGA: 'cifra' }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const X = require('./expres-lib.js')(5);
const V = require('./visuales-t5.js');
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });
const N = { BAJO: +(process.env.BAJO || 12), CAB: +(process.env.CAB || 4), ANT: +(process.env.ANT || 3) };
const nivel = (k, p, f) => { const marca = f.ps.some(x => /data-ex=|data-r=/.test(x.at));
  if (p.of || marca) return { recorte: 'frases', entero: true, media: { cabeza: N.CAB, antes: N.ANT, umbral: 160 } };
  if (p.ia <= N.BAJO) return 'boton';
  return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 }; };

// Sin la parte final RECUERDA: las preguntas que el mapa colgaba de las fichas «RECUERDA del temario» pasan al párrafo de su R
// en el articulado (donde va el sello «R n»), como en el Tema 2.
const { RS } = require('./tema5/marcas-t5.js');
const MAPA = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '..', '..', 'esquemas.html'), 'utf8').match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const kRec = X.fichaBloque.findIndex(t => /^RECUERDA/.test(t));
let movidas = 0;
if (kRec > 0) Object.entries(MAPA).forEach(([id, v]) => { const m = v.match(/^5-(\d+)-(\d+)/); if (!m || +m[1] < kRec) return;
  const r = (X.fichas[+m[1]].ps[+m[2]].h.match(/<b>(R\d+)<\/b>/) || [])[1]; if (r && RS[r]) { X.mueve(id, RS[r][0], RS[r][1]); movidas++; } });
console.log('preguntas de fichas R llevadas a su párrafo del articulado:', movidas);
const EXTRAS = {};
const H0 = X.automatico(V, EXTRAS, { uno: +process.env.UNO, nivel });
const S = X.asignaSueltas(H0);
const H = X.automatico(V, Object.assign(EXTRAS, S.extras), { uno: +process.env.UNO, nivel }) + S.html;
console.log(`Preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);

module.exports = { visuales: () => [] };   // el esquema normal ya tiene sus cuadros (visuales-t5.js)
const k1 = X.fichaBloque.findIndex(t => /^RECUERDA/.test(t));
const K = k1 > 0 ? k1 : X.fichas.length;
const CORTES = [['5.1 SIS (Rgto. 2018/1861)', 0], ['5.2 VIS (Rgto. 767/2008)', 63], ['5.3 Código de visados (Rgto. 810/2009)', 153], ['5.4 Rgto. 977/2011', 187],
  ['5.5 Eurodac (Rgto. 2024/1358)', 189], ['5.6 Orden AEC/240/2011', 245]];
if (require.main === module) X.publica(H, CORTES.map(([nombre, k0], i) => ({ nombre, k0, k1: (CORTES[i + 1] ? CORTES[i + 1][1] : K) - 1 })));
