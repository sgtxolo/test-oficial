// Tema 9 · esquema LITERAL (19/10/2026): sustituye el esquema resumido por el texto íntegro del temario oficial
//   9.1 LO 5/2005 (prompts/temario-limpio/tema9/temario.txt → lo5.txt limpio) y 9.2 Directiva de Defensa Nacional 2020
//   (ddn2020.txt, transcrita del facsímil oficial). Deja las normas como /* T9_LO */ y /* T9_DDN */ (una línea cada una)
//   para marcas-lib.js, aplicar-subrayado-pdf.js y el Exprés. Mantiene el RECUERDA conceptual del esquema anterior.
// Uso: node prompts/herramientas/tema9/esquema-t9.js
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), D = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema9');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---- 1. LO 5/2005 limpia (una unidad por línea; cabecera «Artículo N. Título.» sola)
const raw = fs.readFileSync(path.join(D, 'temario.txt'), 'utf8').replace(/\r/g, '');
const ini = raw.indexOf('EXPOSICIÓN DE MOTIVOS'), fin = raw.indexOf('Por tanto, Mando');
const INICIO = /^(EXPOSICIÓN|TÍTULO|CAPÍTULO|Artículo \d|Disposición |\d+\.\s|[a-z]\)\s)/;
const out = []; let titPend = false;
for (let l of raw.slice(ini, fin).split('\n')) {
  l = l.trim(); if (!l) continue;
  if (titPend) { out.push(out.pop() + ' — ' + l); titPend = false; continue; }   // «TÍTULO I» + «De las atribuciones…»
  if (/^(TÍTULO|CAPÍTULO) [IVXL]+$|^TÍTULO PRELIMINAR$/.test(l)) { out.push(l); titPend = true; continue; }
  let m = l.match(/^((?:Artículo \d+|Disposición (?:derogatoria|final) [a-zá]+)\. [^.]+\.)\s+(.*)$/);   // título + cuerpo en la misma línea
  if (m) { out.push(m[1]); l = m[2]; }
  if (!INICIO.test(l) && out.length && !/^(EXPOSICIÓN|TÍTULO|CAPÍTULO|Artículo|Disposición)/.test(out[out.length - 1]) && !/^(Artículo|Disposición)/.test(l)) { out[out.length - 1] += ' ' + l; continue; }
  if (!INICIO.test(l) && out.length && /^Artículo \d+\.[^.]+\.$|^Disposición .*\.$/.test(out[out.length - 1]) === false && /^(TÍTULO|CAPÍTULO)/.test(out[out.length - 1]) === false && !/^(Artículo|Disposición)/.test(l)) { out[out.length - 1] += ' ' + l; continue; }
  out.push(l);
}
// partir «d) … e) …» y «… 1. …» que vienen en la misma línea
const lo = out.flatMap(l => /^(Artículo|Disposición|TÍTULO|CAPÍTULO|EXPOSICIÓN)/.test(l) ? [l] : l.split(/\s(?=[a-z]\)\s+[A-ZÁÉÍÓÚ])/)).map(l => l.replace(/\s{2,}/g, ' '));
fs.writeFileSync(path.join(D, 'lo5.txt'), lo.filter(l => !/^(TÍTULO|CAPÍTULO|EXPOSICIÓN)/.test(l)).join('\n') + '\n');

// ---- 2. HTML de una norma: bloques, fichas por artículo/apartado, párrafos con <b>1.</b> / sangría para letras
function html(lineas, cabNorma) {
  let h = `<div class="bloque-titulo">${esc(cabNorma)}</div>`, abierta = false;
  const cierra = () => { if (abierta) { h += '</div></div></div>'; abierta = false; } };
  for (const l of lineas) {
    if (/^(TÍTULO|CAPÍTULO|EXPOSICIÓN)/.test(l)) { cierra(); h += `<div class="bloque-titulo">${esc(l)}</div>`; if (/^EXPOSICIÓN/.test(l)) { h += '<div class="articulo"><div class="articulo-head">Exposición de motivos</div><div class="articulo-body"><div class="txt">'; abierta = true; } continue; }
    const m = l.match(/^((?:Artículo|Apartado) \d+|Disposición (?:derogatoria|final) [a-zá]+)\.\s*(.*?)\.?$/);
    if (m) { cierra(); h += `<div class="articulo"><div class="articulo-head">${esc(m[1])} — ${esc(m[2])}</div><div class="articulo-body"><div class="txt">`; abierta = true; continue; }
    const n = l.match(/^(\d+\.|[a-z]\))\s+(.*)$/);
    h += n ? `<p${/\)$/.test(n[1]) ? ' style="margin-left:18px"' : ''}><b>${n[1]}</b> ${esc(n[2])}</p>` : `<p>${esc(l)}</p>`;
  }
  cierra(); return h;
}
const hLO = html(lo, '9.1 — LEY ORGÁNICA 5/2005, DE 17 DE NOVIEMBRE, DE LA DEFENSA NACIONAL (texto consolidado)');
const ddn = fs.readFileSync(path.join(D, 'ddn2020.txt'), 'utf8').replace(/\r/g, '').split('\n').map(x => x.trim()).filter(Boolean);
const hDDN = html(ddn, '9.2 — DIRECTIVA DE DEFENSA NACIONAL 2020, DE 11 DE JUNIO DE 2020 (texto oficial)');

// ---- 3. sustituir el bloque del Tema 9 en esquemas.html
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('// ---- TEMA 9 (Defensa'); if (a < 0 && !s.includes('/* T9_LO */')) throw new Error('no encuentro el Tema 9');
let recItems = '';
if (a >= 0) {
  const b = s.indexOf('})();', a) + 5; const viejo = s.slice(a, b);
  recItems = (viejo.match(/\+ recuerda\(\[([\s\S]*?)\]\);/) || [])[1] || '';
  const nuevo = `const T9 = {};
/* T9_LO */ T9.lo = ${JSON.stringify(hLO)};
/* T9_DDN */ T9.ddn = ${JSON.stringify(hDDN)};
/* T9_RECUERDA + ensamblaje */
(function(){
  const t = esquemas[8];
  t.titulo = "9 — Defensa Nacional: LO 5/2005 de la Defensa Nacional y Directiva de Defensa Nacional 2020 (texto literal con las respuestas de los tests)";
  t.html = leyenda()
    + trampa("Cómo está hecho este esquema", "Texto LITERAL del temario 2026: LO 5/2005 íntegra y Directiva de Defensa Nacional 2020 (transcrita del documento oficial). Las marcas EXOF / EX / ✱ y las fichas R son las de tu temario subrayado; tus colores, los de tu PDF.")
    + T9.lo + T9.ddn
    + recuerda([${recItems}]);
})();`;
  s = s.slice(0, a) + nuevo + s.slice(b);
} else {
  const L = require('../literal-lib.js'); s = L.put(L.put(s, 'T9_LO', hLO), 'T9_DDN', hDDN);
}
fs.writeFileSync(F, s);
console.log('LO 5/2005:', (hLO.match(/class="articulo"/g) || []).length, 'fichas ·', (hLO.match(/<p/g) || []).length, 'párrafos | DDN 2020:', (hDDN.match(/class="articulo"/g) || []).length, 'fichas ·', (hDDN.match(/<p/g) || []).length, 'párrafos');
