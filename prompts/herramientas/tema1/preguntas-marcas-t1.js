// Tema 1 · fase 2: preguntas OFICIALES nuevas (ids 1-168 en adelante) para los apartados marcados del temario subrayado (EXOF, sello EXAMEN, asterisco ✱)
// y las fichas R1-R33 que no tenían pregunta oficial (pauta del usuario 16/10/2026: EXOF y asterisco = preguntas oficiales de la academia Prefortia).
// Los apartados con círculo EX (solo EX) van al banco IA (ids 1-ia-…, opción ia:true).
// Cada lote (tema1/lotes/loteN.js) exporta un array de q(...). Cada pregunta se valida: la cita literal debe estar en el párrafo del esquema (kj),
// las 4 opciones distintas, y se informa de la letra de la correcta y de si es la más larga.
// Uso: node prompts/herramientas/tema1/preguntas-marcas-t1.js <N> [--dry]    (N = nº de lote; sin --dry inserta en test-oficial-conocimiento.html)
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const FILE = path.join(RAIZ, 'test-oficial-conocimiento.html'), BS = String.fromCharCode(92), L = 'ABCD';
const NOM = {
  er: ['Estatuto de Roma de la Corte Penal Internacional', 'Estatuto de Roma de la Corte Penal Internacional', 'del Estatuto de Roma'],
  lo: ['Ley Orgánica 18/2003, de 10 de diciembre, de Cooperación con la Corte Penal Internacional', 'Ley Orgánica 18/2003, de 10 de diciembre, de Cooperación con la Corte Penal Internacional', 'de la Ley Orgánica 18/2003'],
  carta: ['Carta de los Derechos Fundamentales de la Unión Europea', 'Carta de los Derechos Fundamentales de la Unión Europea', 'de la Carta de los Derechos Fundamentales de la UE'],
  coe: ['Estatuto del Consejo de Europa', 'Estatuto del Consejo de Europa', 'del Estatuto del Consejo de Europa'],
  cedh: ['Convenio para la protección de los Derechos Humanos y de las Libertades Fundamentales', 'Convenio Europeo de Derechos Humanos', 'del Convenio Europeo de Derechos Humanos'],
  acu: ['Acuerdo sobre Privilegios e Inmunidades de la Corte Penal Internacional', 'Acuerdo sobre Privilegios e Inmunidades de la Corte Penal Internacional', 'del Acuerdo sobre Privilegios e Inmunidades de la CPI'],
};
// q(kj, norma, art, rúbrica, enunciado, [correcta, distractor×3], cita literal, nota, marca)   kj = 'k-j' del párrafo del esquema (o ['k-j', …]); opción ia:true en el 10.º argumento
const q = (kj, k, a, r, e, o, cita, p, m, ia) => ({ kj: [].concat(kj), k, a, r, e, o, cita, p, m: m || '*', ia: !!ia });
module.exports = { q, NOM };
if (require.main !== module) return;

const N = process.argv[2]; if (!N) throw new Error('falta el nº de lote');
const DRY = process.argv.includes('--dry');
const Q = require('./lotes/lote' + N + '.js');
const nrm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const { P } = require('./situa-marcas-t1.js');
const txt = kj => { const p = P.find(x => x.k + '-' + x.j === kj); return p ? nrm(p.t) : ''; };
let s = fs.readFileSync(FILE, 'utf8');
const idsOf = [...s.matchAll(/"id":"1-(\d+)"/g)].map(m => +m[1]), idsIA = [...s.matchAll(/"id":"1-ia-(\d+)"/g)].map(m => +m[1]);
const marca = new RegExp('<!--t1m:lote' + N + '-->');
if (marca.test(s)) { console.log('lote', N, 'ya insertado'); process.exit(0); }
let nOf = Math.max(...idsOf) + 1, nIA = Math.max(...idsIA) + 1;
const uso = [0, 0, 0, 0]; const malas = [], dup = [], larga = [];
const out = Q.map((x, i) => {
  const ops = x.o.slice(), ok = ops.shift(); const c = [0, 1, 2, 3].sort((a, b) => uso[a] - uso[b] || ((a + i) % 4) - ((b + i) % 4))[0]; ops.splice(c, 0, ok); uso[c]++;
  const id = x.ia ? '1-ia-' + (nIA++) : '1-' + (nOf++);
  if (!x.kj.some(kj => txt(kj).includes(nrm(x.cita)))) malas.push(id + ' (' + x.a + ')');
  if (new Set(ops.map(nrm)).size < 4) dup.push(id);
  const l = ops.map(o => o.length); if (l[c] === Math.max(...l) && l.filter(v => v === l[c]).length === 1) larga.push(id);
  const etiqueta = /^R\d/.test(x.m) ? `ficha RECUERDA ${x.m} del temario` : x.m === 'EXOF' ? 'marca EXOF / sello «PREGUNTA EXAMEN» del temario' : x.m === 'EX' ? 'marca EX del temario' : 'asterisco ✱ del temario';
  const ref = x.a ? `${x.a} ${NOM[x.k][2]}` : NOM[x.k][0];
  const expl = `<span class="ex-resp">Respuesta correcta: <b>${L[c]}</b> · <mark class="ex-key">${esc(ok.replace(/\.$/, ''))}</mark></span>Según el <span class="ref-norma">${esc(ref)}</span>: <span class="ref-concepto">"${esc(x.cita)}"</span>. ${esc(x.p)} <i>(${etiqueta})</i><!--t1m:lote${N}-->`;
  return { id, pregunta: `${NOM[x.k][0]}. ${x.r}. ${x.e}`, opciones: ops, correcta: c, explicacion: expl, apartado: NOM[x.k][1], _ia: x.ia };
});
const pct = larga.length / out.length;
console.log(out.length, 'preguntas (' + out.filter(x => !x._ia).length + ' oficiales, ' + out.filter(x => x._ia).length + ' IA) · letras', JSON.stringify(uso), malas.length ? '✗ citas no literales: ' + malas.join(', ') : '✓ citas literales', dup.length ? '✗ opciones repetidas ' + dup : '', `· correcta la más larga en ${larga.length}/${out.length} (${Math.round(pct * 100)} %)`);
if (DRY) { out.forEach(x => console.log(x.id, '|', x.pregunta.slice(-150), '→', x.opciones[x.correcta].slice(0, 60))); process.exit(0); }
if (malas.length || dup.length) process.exit(1);
const cierra = (s, i) => { let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } } return j; };
const of = out.filter(x => !x._ia).map(({ _ia, ...r }) => r), ia = out.filter(x => x._ia).map(({ _ia, ...r }) => r);
if (of.length) { const k = '{"id":"1-' + Math.max(...idsOf) + '"'; const i = s.indexOf(k); if (i < 0) throw new Error('no está ' + k); const j = cierra(s, i); s = s.slice(0, j + 1) + ',' + of.map(x => JSON.stringify(x)).join(',') + s.slice(j + 1); }
if (ia.length) { const k = '{"id":"1-ia-' + Math.max(...idsIA) + '"'; const i = s.indexOf(k); if (i < 0) throw new Error('no está ' + k); const j = cierra(s, i); s = s.slice(0, j + 1) + ',' + ia.map(x => JSON.stringify(x)).join(',') + s.slice(j + 1); }
fs.writeFileSync(FILE, s); console.log('insertadas', of.length, 'oficiales y', ia.length, 'IA');
