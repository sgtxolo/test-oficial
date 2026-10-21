// Tema 12 · NOTAS MANUSCRITAS del usuario (leídas a mano de su temario escaneado 08-08-2026) al final del párrafo exacto del esquema,
// como <span class="m-nota"> («ro» = bolígrafo rojo). Pauta del 21/10/2026: se transcriben sus notas importantes. Idempotente.
// Uso: node prompts/herramientas/tema12/notas-t12.js [--dry]
const fs = require('fs'), path = require('path');
const L = require('../literal-lib.js');
const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
// [texto que localiza el párrafo (literal del oficial), nota, roja?]  · pN = página del PDF escaneado
const NOTAS = [
  ['Las deliberaciones de la Comisión General de Secretarios de Estado y Subsecretarios serán reservadas', 'No secretas', true],                        // p13
  ['El Secretariado del Gobierno, como órgano de apoyo', 'Secretariado del Gobierno: órgano de apoyo del Consejo de Ministros, de las Comisiones Delegadas y de la Comisión General', true], // p13
  ['En el nombramiento de las personas titulares de las Vicepresidencias', 'Mín. 40 %', false],                                                          // p15
  ['Los Secretarios de Estado son nombrados y separados por Real Decreto', 'Real Decreto propuesto por el Presidente o el miembro (Ministro)', true],          // p16
  ['Los Directores de Gabinete de los Secretarios de Estado serán nombrados', 'Orden Ministerial → previo conocimiento del Consejo de Ministros', true],     // p17
  ['El Presidente del Gobierno en funciones no podrá ejercer', 'Que no las mezclen (Presidente en funciones ≠ Gobierno en funciones)', false],                // p19
  ['Sin perjuicio de lo establecido en el artículo 2.1 del Código Civil', '02/01 · 01/07', true],                                                       // p21
  ['El Plan Anual Normativo estará coordinado por el Ministerio de la Presidencia', 'Aprobación antes 30 de abril', true],                               // p22
  ['La consulta pública deberá realizarse de tal forma', 'Opinión: tiempo suficiente, en ningún caso inferior a 15 días naturales', true],                    // p23
  ['El plazo mínimo de esta audiencia e información públicas', '15 días hábiles, puede reducirse a 7 días · consulta pública: no inferior a 15 días naturales', true], // p24
  ['El Consejo de Ministros, a propuesta del Ministerio de la Presidencia, aprobará, antes del 30 de abril', 'Antes 30/04 informe anual · Plan Anual Normativo', true], // p26
];
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const lim = t => t.replace(/<span class="m-nota[^"]*" data-n12="1">[\s\S]*?<\/span>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
let s = fs.readFileSync(F, 'utf8');
let h = L.get(s, 'T12_LEY50').html.replace(/ ?<span class="m-nota[^"]*" data-n12="1">[^<]*<\/span>/g, '');
let puestas = 0; const fallos = [];
for (const [loc, nota, ro] of NOTAS) {
  const ps = [...h.matchAll(/<p[^>]*>[\s\S]*?<\/p>/g)].filter(m => lim(m[0]).includes(loc));
  if (ps.length !== 1) { fallos.push(loc.slice(0, 40) + ' (' + ps.length + ')'); continue; }
  const fin = ps[0].index + ps[0][0].length - 4;
  h = h.slice(0, fin) + ` <span class="m-nota${ro ? ' ro' : ''}" data-n12="1">✎ ${esc(nota)}</span>` + h.slice(fin); puestas++;
}
console.log(`notas puestas ${puestas}/${NOTAS.length}` + (fallos.length ? ' · no localizadas: ' + fallos.join(' | ') : ''));
if (!process.argv.includes('--dry')) fs.writeFileSync(F, L.put(s, 'T12_LEY50', h));
