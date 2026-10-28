// Mueve del Tema 16 al Tema 17 las preguntas de menores (LO 5/2000, RD 1774/2004, Instrucción 1/2017) y borra del T16 las «sin sitio» que el usuario mandó eliminar (28/10/2026).
const fs = require('fs'), F = 'test-oficial-conocimiento.html', BS = String.fromCharCode(92);
let s = fs.readFileSync(F, 'utf8');
const rango = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i;
  for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; }
    if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (!d) break; } }
  return [i, j + 1]; };
const quita = id => { const r = rango(id); if (!r) { console.log('NO', id); return null; } const o = JSON.parse(s.slice(r[0], r[1]));
  let a = r[0], b = r[1]; if (s[b] === ',') b++; else if (s[a - 1] === ',') a--; s = s.slice(0, a) + s.slice(b); return o; };
const MOVER = [23, 24, 26, 30, 34, 35, 37, 38, 40, 51, 54, 55, 58, 59, 60, 61, 62, 63, 64, 65, 66].map(n => '16-' + n);
const BORRAR = ['16-5', '16-98', '16-117', '16-158', '16-160', '16-166', '16-170', '16-173', '16-174', '16-176', 'ia-1112', 'ia-1210', 'ia-1219', 'ia-1222', 'ia-1245', 'ia-1315', 'ia-1317', 'ia-1322', 'ia-1324', 'ia-1332', 'ia-1333', 'ia-1336', 'ia-1342', 'ia-1345'].map(x => x.startsWith('ia-') ? '16-' + x : x);
const AP = { lo: 'Ley Orgánica 5/2000, de 12 de enero, reguladora de la responsabilidad penal de los menores', rd: 'Real Decreto 1774/2004', ins: 'General / Responsabilidad Penal de los Menores' };
const movidas = MOVER.map(quita).filter(Boolean);
BORRAR.forEach(quita);
let prev = '17-254', n = 255;
for (const o of movidas) {
  const t = o.pregunta; o.apartado = /Real Decreto 1774|1774\/2004/.test(t) ? AP.rd : /Instrucci[oó]n|Protocolo de actuaci[oó]n policial|extranjeros no acompa|Libro-Registro/i.test(t + o.explicacion) ? AP.ins : AP.lo;
  o.id = '17-' + n++; const p = rango(prev); s = s.slice(0, p[1]) + ',' + JSON.stringify(o) + s.slice(p[1]); prev = o.id;
}
fs.writeFileSync(F, s); console.log('movidas', movidas.length, '→ 17-255…' + (n - 1), '· borradas', BORRAR.length);
