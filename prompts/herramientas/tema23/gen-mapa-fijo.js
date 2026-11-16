// Tema 23 · ancla a mano las preguntas «sin sitio» del mapa (clase 2/3 de la regla de 4 clases): escribe tema23/mapa-fijo-t23.json {id: 'k-j'}.
// k = ficha (0-based, en orden de esquemas[22].html), j = párrafo; se calculan buscando la ficha por su cabecera y el párrafo por su arranque.
// Uso: node prompts/herramientas/tema23/gen-mapa-fijo.js
require('../esq-virtual.js');
const fs = require('fs'), path = require('path');
const h = fs.readFileSync('esquemas.html', 'utf8');
const lit = k => { const i = h.indexOf('/* T23_' + k + ' */'); const e = h.indexOf('\n', i); const ln = h.slice(i, e); return JSON.parse(ln.slice(ln.indexOf('= "') + 2, ln.length - 1)); };
const html = lit('LSP');
const strip = t => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const fichas = [...html.matchAll(/<div class="articulo">([\s\S]*?<div class="txt">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>)/g)].map(m => ({ cab: strip((m[1].match(/<div class="articulo-head">([\s\S]*?)<\/div>/) || [])[1] || ''), ps: [...m[2].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(x => strip(x[1])) }));
const buscar = (cab, ini) => { const k = fichas.findIndex(f => f.cab === cab || f.cab.startsWith(cab + ' ')); if (k < 0) throw new Error('sin ficha ' + cab); const j = fichas[k].ps.findIndex(p => p.startsWith(ini)); if (j < 0) throw new Error('sin párrafo ' + cab + ' · ' + ini); return k + '-' + j; };
const F = {
  '23-139': buscar('Artículo 6', '1. Quedan fuera'),
  '23-141': buscar('Artículo 66', '1. En el ámbito de la Administración'),
  '23-1': buscar('Artículo 48', '1. Los servicios de investigación'),
  '23-54': buscar('Artículo 55', '1. Los miembros de las Fuerzas'),
  '23-ia-1320': buscar('Artículo 30', 'Además de lo establecido'),
  '23-ia-1340': buscar('Artículo 35', '1. En el ámbito de la empresa'),
  '23-ia-1401': buscar('Artículo 40', '1. Los siguientes servicios'),
  '23-ia-1229': buscar('Artículo 22', '2. Los representantes'),
};
fs.writeFileSync(path.join(__dirname, 'mapa-fijo-t23.json'), JSON.stringify(F, null, 1));
console.log(Object.keys(F).length, 'ancladas', JSON.stringify(F));
