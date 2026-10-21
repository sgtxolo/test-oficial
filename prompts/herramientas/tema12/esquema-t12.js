// Tema 12 · esquema LITERAL (21/10/2026): sustituye el esquema resumido (articuloResp + VIS_T12) por el texto íntegro del
//   temario oficial (prompts/temario-limpio/tema12/temario.txt = Ley 50/1997 consolidada a 03/01/2025) → ley50.txt limpio.
//   Deja la norma como /* T12_LEY50 */ (una línea) para marcas-lib.js, aplicar-subrayado-pdf.js y el Exprés.
//   Conserva las cajas de trampas del esquema anterior (pegadas bajo su artículo) y el RECUERDA conceptual.
// Uso: node prompts/herramientas/tema12/esquema-t12.js
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), D = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema12');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---- 1. Ley 50/1997 limpia (una unidad por línea; cabecera «Artículo N. Título.» sola). Las líneas que empiezan en
//         minúscula son continuación de la anterior (saltos de página del PDF oficial).
const raw = fs.readFileSync(path.join(D, 'temario.txt'), 'utf8').replace(/\r/g, '');
const ini = raw.indexOf('EXPOSICIÓN DE MOTIVOS'), fin = raw.indexOf('Por tanto, Mando');
const out = []; let titPend = false;
for (let l of raw.slice(ini, fin).split('\n')) {
  l = l.trim(); if (!l) continue;
  if (titPend) { out.push(out.pop() + ' — ' + l); titPend = false; continue; }   // «TÍTULO I» + «Del Gobierno: …»
  if (/^(TÍTULO|CAPÍTULO) [IVXL]+$/.test(l)) { out.push(l); titPend = true; continue; }
  if (/^[a-zà-ú]/.test(l) && !/^[a-z]\)\s/.test(l) && out.length) { out[out.length - 1] += ' ' + l; continue; }
  out.push(l);
}
// partir «a) … b) …» que vienen en la misma línea
const lineas = out.flatMap(l => /^(Artículo|Disposición|TÍTULO|CAPÍTULO|EXPOSICIÓN)/.test(l) ? [l] : l.split(/\s(?=[a-z]\)\s+[A-ZÁÉÍÓÚ])/)).map(l => l.replace(/\s{2,}/g, ' '));
const ley = lineas.slice(lineas.findIndex(l => /^Artículo 1\./.test(l))).filter(l => !/^(TÍTULO|CAPÍTULO)/.test(l));
fs.writeFileSync(path.join(D, 'ley50.txt'), ley.join('\n') + '\n');

// ---- 2. cajas de trampas y RECUERDA del esquema anterior (se evalúan con la misma función trampa() de esquemas.html)
let s = fs.readFileSync(F, 'utf8');
const trampa = (titulo, html) => `<div class="trampa"><b>⚠ ${titulo || 'Trampa de examen'}</b><p>${html}</p></div>`;
const a = s.indexOf('// ---- TEMA 12 (Gobierno');
const TRAMPAS = {}; let recItems = '';
const VIEJO = a >= 0 && s.slice(a, s.indexOf('/* T12_RECUERDA', a)).includes('articuloResp(');
if (VIEJO) {
  const b = s.indexOf('})();', s.indexOf('/* T12_RECUERDA', a)) + 5; const viejo = s.slice(a, b);
  let cab = null;
  for (const l of viejo.split('\n')) {
    let m = l.match(/^\s*\+ articuloResp\("([^"]+)"/);
    if (m) { cab = m[1]; continue; }
    m = l.match(/^\s*\+ (trampa\(.*\))\s*;?\s*$/);
    if (m && cab) {
      const k = cab;
      (TRAMPAS[k] = TRAMPAS[k] || []).push(eval(m[1]));
    }
  }
  recItems = (viejo.match(/\+ recuerda\(\[([\s\S]*?)\]\);/) || [])[1] || '';
  fs.writeFileSync(path.join(__dirname, '_trampas-t12.json'), JSON.stringify({ TRAMPAS, recItems }, null, 1));
} else {
  const g = JSON.parse(fs.readFileSync(path.join(__dirname, '_trampas-t12.json'), 'utf8')); Object.assign(TRAMPAS, g.TRAMPAS); recItems = g.recItems;
}
// clave = cabecera de la ficha nueva («Artículos 18 y 19 — …» → Artículo 18; «Disposiciones adicionales…» → DA primera)
for (const k of Object.keys(TRAMPAS)) {
  const art = k.match(/^Artículos? (\d+)/);
  const n = /^Exposición/.test(k) ? 'Exposición de motivos' : /^Disposiciones? adicional/.test(k) ? 'Disposición adicional primera' : art ? 'Artículo ' + art[1] : k;
  if (n !== k) { (TRAMPAS[n] = TRAMPAS[n] || []).push(...TRAMPAS[k]); delete TRAMPAS[k]; }
}

// ---- 3. HTML de la norma: bloques, una ficha por artículo, párrafos con <b>1.</b> / sangría para letras
function html(lineas) {
  let h = `<div class="bloque-titulo">12.1 — LEY 50/1997, DE 27 DE NOVIEMBRE, DEL GOBIERNO (texto consolidado · última modificación: 03/01/2025)</div>`, abierta = null;
  const cierra = () => { if (abierta) { h += '</div></div></div>' + (TRAMPAS[abierta] || []).join(''); abierta = null; } };
  for (const l of lineas) {
    if (/^(TÍTULO|CAPÍTULO|EXPOSICIÓN)/.test(l)) { cierra(); h += `<div class="bloque-titulo">${esc(l)}</div>`;
      if (/^EXPOSICIÓN/.test(l)) { h += '<div class="articulo"><div class="articulo-head">Exposición de motivos</div><div class="articulo-body"><div class="txt">'; abierta = 'Exposición de motivos'; } continue; }
    const m = l.match(/^(Artículo \d+|Disposición (?:adicional|transitoria|derogatoria) [a-záéíóú]+)\.\s*(.*?)\.?$/);
    if (m) { cierra(); h += `<div class="articulo"><div class="articulo-head">${esc(m[1])}${m[2] ? ' — ' + esc(m[2]) : ''}</div><div class="articulo-body"><div class="txt">`; abierta = m[1]; continue; }
    const n = l.match(/^(\d+ bis\.|\d+\.º|\d+\.|[a-z]\))\s+(.*)$/);
    const ex = /^Tres principios configuran/.test(l) ? ' data-ex="EX"' : '';   // círculo EX de la exposición de motivos (PDF p. 5)
    h += n ? `<p${/\)$/.test(n[1]) ? ' style="margin-left:18px"' : /º$/.test(n[1]) ? ' style="margin-left:18px"' : ''}${ex}><b>${n[1]}</b> ${esc(n[2])}</p>` : `<p${ex}>${esc(l)}</p>`;
  }
  cierra(); return h;
}
const hLey = html(lineas);

// ---- 4. sustituir el bloque del Tema 12 en esquemas.html
if (a >= 0) {
  const b = s.indexOf('})();', s.indexOf('/* T12_RECUERDA', a)) + 5;
  const nuevo = `// ---- TEMA 12 (Gobierno y Administración) ----
const T12 = {};
/* T12_LEY50 */ T12.ley50 = ${JSON.stringify(hLey)};
/* T12_RECUERDA + ensamblaje */
(function(){
  const t = esquemas[11];
  t.titulo = "12 — Ley 50/1997, del Gobierno: texto literal con las respuestas de los tests";
  t.html = leyenda()
    + trampa("Cómo está hecho este esquema", "Texto LITERAL de la Ley 50/1997 (temario oficial 2026, texto consolidado a 03/01/2025). Las marcas EXOF / EX / ✱ y las fichas R son las de tu temario subrayado (08/08/2026); los colores, los de tu PDF.")
    + T12.ley50
    + recuerda([${recItems}]);
})();`;
  s = s.slice(0, a) + nuevo + s.slice(b);
} else {
  const L = require('../literal-lib.js'); s = L.put(s, 'T12_LEY50', hLey);
}
fs.writeFileSync(F, s);
console.log('Ley 50/1997:', (hLey.match(/class="articulo"/g) || []).length, 'fichas ·', (hLey.match(/<p/g) || []).length, 'párrafos · trampas', Object.values(TRAMPAS).flat().length, '· ley50.txt', ley.length, 'líneas');
