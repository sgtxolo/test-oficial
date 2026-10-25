// Correcciones de la auditoría de oficiales del T13 (25/10/2026): opciones corruptas por el OCR y citas de artículo mal puestas. Uso: node prompts/herramientas/tema13/fix-auditoria-t13.js
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'test-oficial-conocimiento.html'); let s = fs.readFileSync(F, 'utf8'); const BS = String.fromCharCode(92);
const rango = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i;
  for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; }
    if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (!d) break; } } return [i, j + 1]; };
const cambia = (id, fn) => { const r = rango(id); if (!r) { console.log('NO', id); return; } const o = JSON.parse(s.slice(r[0], r[1])); const antes = JSON.stringify(o); fn(o); if (JSON.stringify(o) !== antes) { s = s.slice(0, r[0]) + JSON.stringify(o) + s.slice(r[1]); console.log('ok', id); } else console.log('sin cambio', id); };
const ex = (o, de, a) => { o.explicacion = o.explicacion.split(de).join(a); };
const opt = (o, i, t) => { const letra = 'ABCD'[o.correcta]; o.opciones[i] = t; if (i === o.correcta) ex(o, '', ''); };
cambia('13-122', o => opt(o, 1, 'Los particulares cuando obren por delegación o como meros agentes o mandatarios de ella.'));
cambia('13-228', o => opt(o, 1, 'A los Juzgados y Tribunales de cualquier orden jurisdiccional.'));
cambia('13-237', o => { opt(o, 0, 'Secreto oficial.'); o.explicacion = o.explicacion.replace('Secretos u oficiales.', 'Secreto oficial.'); o.explicacion = o.explicacion.replace(/<mark class="ex-key">Secretos u oficiales<\/mark>/, '<mark class="ex-key">Secreto oficial</mark>'); });
cambia('13-220', o => opt(o, 3, 'El Ministerio Fiscal para intervenir en los procesos que determine la Ley.'));
cambia('13-86', o => ex(o, 'artículo 70.1', 'artículo 68.1'));
cambia('13-113', o => ex(o, 'Art. 105.2', 'Art. 105.3'));
cambia('13-186', o => ex(o, 'artículo 76.6', 'artículo 74.6'));
cambia('13-236', o => { o.explicacion = o.explicacion.replace(/\s*TERST 14.*$/s, ''); });
cambia('13-144', o => { o.explicacion = o.explicacion.replace(/\s*\*Se asume que la opción d\)[^.]*\.[^.]*\./, ''); });
cambia('13-135', o => opt(o, 3, 'Tendrán legitimación para recurrir las resoluciones del Tribunal Administrativo del Deporte en asuntos de disciplina deportiva en materia de dopaje, todas las personas mencionadas en el artículo 40.4 de la Ley Orgánica de Protección de la Salud del Deportista y Lucha contra el Dopaje en la Actividad Deportiva.'));
cambia('13-144', o => { o.explicacion = o.explicacion.replace(/ *Se asume[sS]*$/, ''); });
fs.writeFileSync(F, s);
