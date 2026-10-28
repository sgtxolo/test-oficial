// 28/10/2026: corrige 16-167 (el plazo de la etapa de la asesoría confidencial es de diez días, no veinte) y pasa al Tema 17 las 4 preguntas de menores que seguían en el 16.
const fs = require('fs'), F = 'test-oficial-conocimiento.html', BS = String.fromCharCode(92);
let s = fs.readFileSync(F, 'utf8');
const rango = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i;
  for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; }
    if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (!d) break; } }
  return [i, j + 1]; };
let r = rango('16-167'), o = JSON.parse(s.slice(r[0], r[1]));
o.correcta = 1;
o.explicacion = '<span class="ex-resp">Respuesta correcta: <b>B</b> · <mark class="ex-key">Diez días.</mark></span>El <span class="ref-norma">apdo. 4.3 del Protocolo (RD 247/2024)</span> dispone: <span class="ref-concepto">"El plazo de esta etapa no será superior a diez días, salvo excepciones justificadas."</span> Los veinte días son el plazo de la etapa del comité de asesoramiento, una vez constituido.';
s = s.slice(0, r[0]) + JSON.stringify(o) + s.slice(r[1]);
const AP = { rd: 'Real Decreto 1774/2004', ins: 'General / Responsabilidad Penal de los Menores' };
let prev = '17-275', n = 276;
for (const id of ['16-28', '16-32', '16-56', '16-57']) {
  r = rango(id); o = JSON.parse(s.slice(r[0], r[1])); let a = r[0], b = r[1]; if (s[b] === ',') b++; else if (s[a - 1] === ',') a--; s = s.slice(0, a) + s.slice(b);
  o.apartado = /1774/.test(o.pregunta) ? AP.rd : AP.ins; o.id = '17-' + n++;
  const p = rango(prev); s = s.slice(0, p[1]) + ',' + JSON.stringify(o) + s.slice(p[1]); prev = o.id;
}
fs.writeFileSync(F, s); console.log('ok', n - 1);
