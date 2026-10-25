// Vuelca el literal (temario.txt del T1) de los artículos «en rojo» (articulos-rojos.js 1) a un fichero de trabajo. Uso: node prompts/herramientas/tema1/dump-rojos-t1.js <salida.txt>
const fs = require('fs'), path = require('path');
const L = fs.readFileSync(path.join(__dirname, '..', '..', 'temario-limpio', 'tema1', 'temario.txt'), 'utf8').replace(/\r/g, '').split('\n').map(l => l.replace(/^\s*000\d{3}\s+/, ''));
const R = { 'CARTA': [467, 711, '54'], 'CEDH': [1073, 1523, '14,17,18,24,32,33,38,42,48,49'] };
const out = [];
for (const [n, [a, b, ids]] of Object.entries(R)) for (const id of ids.split(',')) {
  let i = -1; for (let k = a - 1; k < b; k++) if (new RegExp('^\\s*ART[ÍI]CULO\\s+' + id + '\\b', 'i').test(L[k])) { i = k; break; }
  if (i < 0) { out.push('### ' + n + ' art ' + id + ' NO'); continue; }
  let j = i + 1; while (j < b && !/^\s*ART[ÍI]CULO\s+\d/i.test(L[j]) && !/^\s*(PROTOCOLO|TÍTULO|CAPÍTULO|SECCIÓN)\b/.test(L[j])) j++;
  out.push('### ' + n + ' art ' + id + ' (l.' + (i + 1) + ')\n' + L.slice(i, j).join(' ').replace(/\s+/g, ' ').slice(0, 1400));
}
fs.writeFileSync(process.argv[2], out.join('\n')); console.log(out.length);
