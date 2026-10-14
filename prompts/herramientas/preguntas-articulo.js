// Preguntas cuya respuesta correcta es solo una referencia a un artículo («artículo 17.1.a) del Estatuto», «el art. 15»…).
// El usuario (14/10/2026): en el examen nunca preguntan «a qué artículo corresponde…» → el Exprés no las necesita.
// Uso: require('./preguntas-articulo.js')(T) → Set de ids · node preguntas-articulo.js T → lista para revisar
const fs = require('fs');
const path = require('path');
const RE = /^(?:(?:en |por |según |conforme a |de )?(?:el |los |del |la |las )?)?(?:art(?:ículos?|s?\.)|apartados?|párrafos?|letras?|disposici[oó]n(?:es)? (?:adicional|transitoria|final|derogatoria)\w*)\s*[\d.ºª]/i;
const limpia = t => String(t).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
// la respuesta es «un artículo» si empieza por la referencia y lo que queda tras ella no aporta contenido propio
const esArticulo = t => { t = limpia(t); if (!RE.test(t)) return false;
  const resto = t.replace(/^[^\d]*[\d.ºª]+(?:\s*(?:bis|ter))?(?:[.,]?\s*(?:\d+|[a-zñ]\)|apartado \d+|letra [a-z]))*/i, '').replace(/^[\s,.;:()]+/, '');
  return resto.length <= 45 || /^(?:del|de la|de los|de esta|de este|de la presente)\b/i.test(resto) && resto.length <= 70; };
function preguntas(T) {
  const s = fs.readFileSync(path.join(__dirname, '..', '..', 'test-oficial-conocimiento.html'), 'utf8');
  const out = [];
  for (const m of s.matchAll(new RegExp(`\\{"id":"(${T}-(?:ia-)?\\d+)","pregunta":`, 'g'))) {
    let i = m.index, d = 0, j = i; for (; j < s.length; j++) { const c = s[j]; if (c === '"') { j++; while (s[j] !== '"') { if (s[j] === '\\') j++; j++; } continue; } if (c === '{') d++; else if (c === '}' && !--d) break; }
    try { const q = JSON.parse(s.slice(i, j + 1)); out.push(q); } catch (e) {}
  }
  return out;
}
module.exports = T => new Set(preguntas(T).filter(q => esArticulo(q.opciones[q.correcta])).map(q => q.id));
module.exports.preguntas = preguntas;
module.exports.esArticulo = esArticulo;
if (require.main === module) { const T = +process.argv[2] || 1; const qs = preguntas(T).filter(q => esArticulo(q.opciones[q.correcta]));
  qs.forEach(q => console.log(q.id.padEnd(11), '→', limpia(q.opciones[q.correcta]).slice(0, 90))); console.log(qs.length, 'preguntas con respuesta «artículo» de', preguntas(T).length); }
