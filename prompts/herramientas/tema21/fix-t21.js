// Tema 21 · correcciones de las preguntas OFICIALES (21-1…) verificadas contra el temario oficial limpio (prompts/temario-limpio/tema21/oficial.txt)
// Cada parte (fix-partes/pN.js) exporta  ({O, L}) => [ [id, q => { …modifica q (correcta / opciones con O(q,k,texto)); return [cita_literal, extra|null]; }], … ]
//   · la cita debe estar LITERAL en oficial.txt (se compara sin tildes/puntuación/saltos de línea); si no, la pregunta NO se aplica y se avisa.
//   · el artículo (lila) se calcula solo desde la cita; la norma sale del campo «apartado» de la pregunta.
// Uso:  node prompts/herramientas/tema21/fix-t21.js --dry     (verifica todas las partes, NO escribe)
//       node prompts/herramientas/tema21/fix-t21.js           (aplica sobre test-oficial-conocimiento.html; idempotente)
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const FILE = path.join(RAIZ, 'test-oficial-conocimiento.html');
const OF = fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', 'tema21', 'oficial.txt'), 'utf8').replace(/\r/g, '').replace(/=====PAG \d+ ?=====/g, ' ').replace(/-\s*\n\s*/g, '').replace(/\s+/g, ' ');
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');
const OFN = nz(OF);
const lab = cita => {
  const a = nz(cita).slice(0, 60); const j = OFN.indexOf(a); if (j < 0) return null;
  const re = /(?:Art[ií]culo|ARTÍCULO) (\d+(?: (?:bis|ter|quater|quinquies|sexies|septies|octies))?)(?=[ .])/g; let m, last = null;
  while ((m = re.exec(OF))) { const antes = nz(OF.slice(0, m.index)).length; if (antes <= j) last = m[1]; else break; }
  return last;
};
const L = 'ABCD';
const O = (q, k, t) => { q.opciones[k] = t; };
const normaDe = q => (/^General/.test(q.apartado || '') ? 'Derecho Procesal Penal (II). Normativa complementaria' : (q.apartado || ''));
const ex = (q, cita, extra, ver) => {
  const art = lab(ver || cita);
  return `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${q.opciones[q.correcta].replace(/\.$/, '')}</mark></span><span class="ref-norma">${art ? 'Art. ' + art + ' · ' : ''}${normaDe(q)}</span><span class="ref-concepto">"${cita}"</span>${extra || ''}`;
};
const dir = path.join(__dirname, 'fix-partes');
const F = []; for (const f of fs.readdirSync(dir).filter(f => /^p\d+\.js$/.test(f)).sort()) F.push(...require(path.join(dir, f))({ O, L }));
const dry = process.argv.includes('--dry');
const BS = String.fromCharCode(92);
let s = fs.readFileSync(FILE, 'utf8'), n = 0; const malas = [], vistos = new Set(), repes = [];
for (const [id, fn] of F) {
  if (vistos.has(id)) repes.push(id); vistos.add(id);
  const key = '{"id":"' + id + '"'; const i = s.indexOf(key); if (i < 0) { console.log('NO ESTÁ', id); continue; }
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j]; if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  const q = JSON.parse(s.slice(i, j + 1));
  const [cita, extra, ver] = fn(q); // ver = texto tal como está (con OCR roto) en oficial.txt, si la cita limpia no coincide letra a letra
  if (!OFN.includes(nz(ver || cita))) { malas.push(id); continue; }
  if (new Set(q.opciones.map(nz)).size < q.opciones.length) { malas.push(id + ' (opciones repetidas)'); continue; }
  q.explicacion = ex(q, cita, extra, ver);
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++;
}
if (repes.length) console.log('⚠ ids repetidos en varias partes:', repes.join(', '));
if (malas.length) console.log('✗ NO SE APLICAN (cita no literal / opciones repetidas):', malas.join(', '));
if (!dry) fs.writeFileSync(FILE, s);
console.log((dry ? '[dry] ' : '') + 'corregidas', n, 'de', F.length);
