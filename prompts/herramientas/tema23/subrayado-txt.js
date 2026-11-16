// Genera mio-subrayado.txt (texto subrayado entre «…» por página) y la densidad por página a partir de subrayado.json
const fs = require('fs');
const D = 'prompts/temario-limpio/tema23/';
const j = JSON.parse(fs.readFileSync(D + 'subrayado.json', 'utf8'));
let out = '', dens = [];
j.forEach(p => {
  let t = '=====PAG ' + p.pagina + ' =====\n', cur = [], n = 0, m = 0;
  const flush = () => { if (cur.length) { t += '«' + cur.join(' ') + '» '; cur = []; } };
  p.palabras.forEach(w => { n++; const marc = w[1] || w[4] || w[5]; if (marc) { cur.push(w[0]); m++; } else { flush(); } });
  flush();
  out += t + '\n\n'; dens.push([p.pagina, n, m, Math.round(100 * m / Math.max(1, n))]);
});
fs.writeFileSync(D + 'mio-subrayado.txt', out);
console.log(dens.map(d => d[0] + ':' + d[3] + '%').join(' '));
