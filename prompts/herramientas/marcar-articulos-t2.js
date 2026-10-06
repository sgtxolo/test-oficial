// Marca en el esquema del Tema 2 los artículos que se mencionan dentro del texto («artículos 4 y 5», «art. 13», «artículo 20.d)»…)
// con <span class="ref-art"> (negrita + punteado rojo). Solo toca texto, nunca etiquetas; no marca las etiquetas en negrita «Art. 4.».
// Uso: node prompts/herramientas/marcar-articulos-t2.js   (idempotente)
const fs = require('fs');
let s = fs.readFileSync('esquemas.html', 'utf8');
const a = s.indexOf('/* T2_LEY19 */'), b = s.indexOf('/* T2_REC */');
if (a < 0 || b < 0) throw new Error('marcas no encontradas');
const bloque = s.slice(a, b);
const REF = /\b(?:[Aa]rtículos?|[Aa]rts?\.)\s*\d+(?:\s*(?:bis|ter|quater))?(?:\.\d+)?(?:\s*\.?[a-z]\))?(?:\s*(?:,|y|a|al|e)\s+\d+(?:\s*(?:bis|ter))?(?:\.\d+)?(?:\s*\.?[a-z]\))?)*/g;
function marca(html) {
  const out = []; let negrita = 0;
  for (const t of html.split(/(<[^>]+>)/)) {
    if (t.startsWith('<')) {
      if (/^<b[\s>]/.test(t)) negrita++; else if (/^<\/b>/.test(t)) negrita = Math.max(0, negrita - 1);
      out.push(t); continue;
    }
    out.push(negrita ? t : t.replace(REF, m => `<span class="ref-art">${m}</span>`));
  }
  return out.join('');
}
let n = 0;
const nuevo = bloque.replace(/"((?:[^"\\\n]|\\.)*)"/g, (lit, inner) => {
  if (inner.length < 40 || !/<p>/.test(inner)) return lit;
  const html = new Function('return "' + inner + '"')();
  const m = marca(html.replace(/<span class="ref-art">([\s\S]*?)<\/span>/g, '$1'));
  n += (m.match(/class="ref-art"/g) || []).length;
  return JSON.stringify(m);
});
s = s.slice(0, a) + nuevo + s.slice(b);
const css = '.ref-art{font-weight:700;border-bottom:2px dotted #c0392b}[data-theme="dark"] .ref-art{border-bottom-color:#ff8a80}';
if (!s.includes('.ref-art{')) s = s.replace('u.m-clave{text-decoration:underline;', css + '\nu.m-clave{text-decoration:underline;');
fs.writeFileSync('esquemas.html', s);
console.log('artículos marcados:', n);
