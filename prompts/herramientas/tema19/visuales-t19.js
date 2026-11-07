require('../esq-virtual.js');
// Cuadros visuales del Tema 19 (CP Parte Especial): recrean los cuadros de tu temario (PDF 08-08-2026) con su texto. Colores copiados de tu fosforito.
//   p5 homicidio y asesinato (arts. 138-140) · p6 delito de aborto (arts. 144-145)
// Uso: node prompts/herramientas/tema19/visuales-t19.js (idempotente: sustituye los anteriores marcados <!--VIS19-->). Lo usará expres/t19.js (module.exports = V).
const fs = require('fs'), path = require('path');
const L = require('../literal-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const V = []; const v = (norma, loc, html) => V.push([norma, loc, html]);

// ───────── p5 · arts. 138-140 · HOMICIDIO Y SUS FORMAS ─────────
v('cp', 'perteneciere a un grupo u organización criminal', cols('HOMICIDIO Y SUS FORMAS (cuadro del temario · arts. 138-140)', [
  { t: 'HOMICIDIO · art. 138', l: [`${D('Matar a otra persona')}.`, `En su forma ${D('agravada')} → ASESINATO.`] },
  { t: 'ASESINATO · arts. 139 y 140', l: [`${D('Alevosía')}.`, `${D('Precio, recompensa o promesa')}.`, `${D('Ensañamiento')}, aumentando deliberada e inhumanamente el dolor del ofendido.`, `Para ${D('facilitar otro delito')} o ${D('evitar que se descubra')}.`] },
  { t: 'PRISIÓN PERMANENTE REVISABLE · art. 140', l: [`Que la víctima sea ${G('menor de dieciséis años')} de edad, o se trate de una persona ${G('especialmente vulnerable')} por razón de su edad, enfermedad o discapacidad.`, `Que el hecho fuera subsiguiente a un delito ${G('contra la libertad sexual')} que el autor hubiera cometido sobre la víctima.`, `Que el delito se hubiera cometido por quien perteneciere a un ${D('grupo u organización criminal')}.`, `${D('Reo de asesinato')} que hubiera sido condenado por la ${D('muerte de más de dos personas')}.`] },
]));

// ───────── p6 · arts. 144-145 · DELITO DE ABORTO ─────────
v('cp', 'consintiere que otra persona se lo cause', tabla('DELITO DE ABORTO · arts. 144 y 145 CP (cuadro del temario)', ['Conducta típica', 'Sujeto activo'], [
  { l: 'Producir el aborto de una mujer SIN su CONSENTIMIENTO', c: 'o', h: [
    { p: 'Sin consentimiento', c: 'o', t: `Habiendo obtenido la anuencia de la mujer ${D('mediante violencia, amenaza o engaño')}.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Cualquier persona')}.` }] },
  { l: 'Producir el aborto de una mujer CON su CONSENTIMIENTO', c: 'v', h: [
    { p: 'Con consentimiento', c: 'v', t: `${D('Fuera de los casos permitidos por la ley')}.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Cualquier persona')}.` }] },
  { l: 'Cuando fuera de los casos permitidos por la ley', c: 'c', h: [
    { p: 'La mujer', c: 'c', t: `${D('Produce su propio aborto')}, o ${D('consiente que otra persona se lo cause')}.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Propia mujer embarazada')}.` }] },
]));

module.exports = V;
if (require.main === module) {
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  let h = L.get(s, 'T19_CP').html.replace(/<!--VIS19-->[\s\S]*?<!--\/VIS19-->/g, '');
  const insertos = []; let colocados = 0;
  for (const [, loc, vis] of V) {
    const k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; if (norm(h.slice(a, b)).includes(k)) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', loc.slice(0, 60)); continue; }
    insertos.push([i, vis]);
  }
  const orden = insertos.map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
  for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS19-->' + vis + '<!--/VIS19-->' + h.slice(i); colocados++; }
  s = L.put(s, 'T19_CP', h);
  fs.writeFileSync(F, s);
  console.log(`Tema 19: cuadros ${V.length}, colocados ${colocados}`);
}
