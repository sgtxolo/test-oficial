// Tema 22 · ancla a mano las preguntas «sin sitio» del mapa (clase 2/3 de la regla de 4 clases): escribe tema22/mapa-fijo-t22.json {id: 'k-j'}.
// k = ficha (0-based, en orden de esquemas[21].html), j = párrafo; se calculan buscando la ficha por su cabecera y el párrafo por su arranque.
// Uso: node prompts/herramientas/tema22/gen-mapa-fijo.js
require('../esq-virtual.js');
const fs = require('fs'), path = require('path');
const h = fs.readFileSync('esquemas.html', 'utf8');
const a = h.indexOf('T22.reunion = ') ; const lit = k => { const i = h.indexOf('/* T22_' + k + ' */'); const e = h.indexOf('\n', i); const ln = h.slice(i, e); return JSON.parse(ln.slice(ln.indexOf('= "') + 2, ln.length - 1)); };
const html = lit('RE') + lit('DP') + lit('CP');
const fichas = [...html.matchAll(/<div class="articulo">([\s\S]*?<div class="txt">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>)/g)].map(m => ({ cab: (m[1].match(/<div class="articulo-head">([\s\S]*?)<\/div>/) || [])[1] || '', ps: [...m[2].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(x => x[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&')) }));
const T = 22;   // el índice k del mapa cuenta las fichas de TODO el esquema
const buscar = (cab, ini) => { const k = fichas.findIndex(f => f.cab.startsWith(cab)); if (k < 0) throw new Error('sin ficha ' + cab); const j = fichas[k].ps.findIndex(p => p.startsWith(ini)); if (j < 0) throw new Error('sin párrafo ' + cab + ' · ' + ini + ' → ' + fichas[k].ps.map(x => x.slice(0, 25)).join(' | ')); return k + '-' + j; };
const RE = 'Derecho de Reunión', DP = 'Protección de datos penal', CP = 'Seguridad Ciudadana';
const F = {
  '22-38': buscar('Artículo tercero · ' + RE, '1. Ninguna reunión'),
  '22-46': buscar('Artículo 4 · ' + DP, '1. Será autoridad competente'),
  '22-60': buscar('Artículo 33 · ' + CP, 'En cada grado'),
  '22-204': buscar('Artículo 12 · ' + CP, '1. La competencia'),
  '22-214': buscar('Artículo 42 · ' + CP, '1. Si las conductas'),
  '22-71': buscar('Artículo 12 · ' + CP, '1. La competencia'),
  '22-112': buscar('Artículo 37 · ' + CP, '1. La celebración de reuniones'),
  '22-113': buscar('Artículo 31 · ' + CP, '1. Los hechos susceptibles'),
  '22-126': buscar('Artículo quinto · ' + RE, 'c) Cuando se hiciere uso de uniformes'),
  '22-163': buscar('Artículo quinto · ' + RE, 'c) Cuando se hiciere uso de uniformes'),
  '22-150': buscar('Artículo 37 · ' + CP, '17. El consumo de bebidas'),
  '22-159': buscar('Artículo 54 · ' + CP, '3. Una vez realizado el pago'),
  '22-195': buscar('Disposición adicional cuarta · ' + CP, 'A efectos de dar cumplimiento'),
  '22-197': buscar('Artículo cuarto · ' + RE, '4. La asistencia de militares'),
  '22-205': buscar('Artículo 16 · ' + CP, '1. En el cumplimiento de sus funciones'),
  '22-ia-1355': buscar('Artículo 39 · ' + CP, '2. La multa podrá llevar'),
  '22-ia-1428': buscar('Artículo 49 · ' + CP, '1. Incoado el expediente'),
  '22-ia-1447': buscar('Disposición adicional sexta · ' + CP, 'A los efectos de lo dispuesto'),
  '22-ia-1455': buscar('Disposición final primera · ' + CP, '1. Se adiciona'),
};
fs.writeFileSync(path.join(__dirname, 'mapa-fijo-t22.json'), JSON.stringify(F, null, 1));
console.log(Object.keys(F).length, 'ancladas');
