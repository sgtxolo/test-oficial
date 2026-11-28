// Añade un párrafo literal AL FINAL de una ficha de un esquema escrito en HTML (T26, T27…). Idempotente.
// Uso: node prompts/herramientas/oficiales-seras-28-11-parrafo-html.js <json>
// json: [{ "marca": "T27_ONU", "cab": "Preámbulo · Principios básicos ONU", "p": "texto <mark class=\"m-resp\">…</mark>" }]
require('./esq-virtual.js');
const fs = require('fs');
const BS = String.fromCharCode(92), NL = String.fromCharCode(10);
const OPS = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const L = fs.readFileSync('esquemas.html', 'utf8').split(NL);
const esc = t => t.split('"').join(BS + '"');
for (const o of OPS) {
  const n = L.findIndex(l => l.startsWith('/* ' + o.marca + ' */')); if (n < 0) throw new Error('sin línea ' + o.marca);
  const nuevo = esc('<p>' + o.p + '</p>');
  if (L[n].includes(nuevo)) continue;
  const c = L[n].indexOf('>' + o.cab + '</div>'); if (c < 0) throw new Error('sin ficha ' + o.cab);
  let fin = L[n].indexOf(esc('<div class="articulo">'), c); if (fin < 0) fin = L[n].length;
  const b = L[n].lastIndexOf('</p>', fin) + 4; if (b < c) throw new Error('sin párrafos ' + o.cab);
  L[n] = L[n].slice(0, b) + nuevo + L[n].slice(b);
}
fs.writeFileSync('esquemas.html', L.join(NL));
console.log('párrafos', OPS.length);
