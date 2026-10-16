// Genera mapa-fijo-t1.json: id de cada pregunta nueva (lotes 1-5) → 'k-j' de su párrafo marcado. Los ids se asignaron correlativos: oficiales desde 1-168, IA desde 1-ia-1785.
const fs = require('fs'), path = require('path');
let of = 168, ia = 1785; const F = {};
for (let n = 1; n <= 5; n++) require('./lotes/lote' + n + '.js').forEach(q => { F[q.ia ? '1-ia-' + (ia++) : '1-' + (of++)] = q.kj[0]; });
fs.writeFileSync(path.join(__dirname, 'mapa-fijo-t1.json'), JSON.stringify(F));
console.log(Object.keys(F).length, 'ids fijados; últimos', of - 1, ia - 1);
