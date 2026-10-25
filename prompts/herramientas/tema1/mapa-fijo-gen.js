// Genera mapa-fijo-t1.json: id de cada pregunta nueva (lotes 1-5) → 'k-j' de su párrafo marcado. Los ids se asignaron correlativos: oficiales desde 1-168, IA desde 1-ia-1785.
const fs = require('fs'), path = require('path');
// OJO: las anclas a mano de «sin sitio» (1-148, 1-153, 1-ia-3201, 1-ia-3723; 25/10/2026) viven solo en mapa-fijo-t1.json: este generador las conserva
let of = 168, ia = 1785; let F = {}; try { const P = JSON.parse(fs.readFileSync(path.join(__dirname, 'mapa-fijo-t1.json'), 'utf8')); ['1-148', '1-153', '1-ia-3201', '1-ia-3723', '1-ia-3539', '1-ia-3549', '1-ia-3603', '1-ia-3622'].forEach(k => { if (P[k]) F[k] = P[k]; }); } catch (e) {}
for (let n = 1; n <= 5; n++) require('./lotes/lote' + n + '.js').forEach(q => { F[q.ia ? '1-ia-' + (ia++) : '1-' + (of++)] = q.kj[0]; });
fs.writeFileSync(path.join(__dirname, 'mapa-fijo-t1.json'), JSON.stringify(F));
console.log(Object.keys(F).length, 'ids fijados; últimos', of - 1, ia - 1);
