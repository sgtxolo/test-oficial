// Uso: node prompts/herramientas/tema20/articulo.js 45 46 ...  -> imprime el artículo del oficial T20 (LECrim)
const fs = require('fs'), p = require('path');
const t = fs.readFileSync(p.join(__dirname, '..', '..', 'temario-limpio', 'tema20', 'oficial.txt'), 'utf8').replace(/\r/g, '').replace(/=====PAG \d+ ?=====/g, ' ');
const W = +process.env.W || 2500;
for (const n of process.argv.slice(2)) {
  const re = new RegExp('Artículo ' + n + '\\.[\\s\\S]*?(?=\\nArtículo \\d+(?: (?:bis|ter|quater|quinquies))?\\.|$)');
  const m = t.match(re);
  console.log(m ? m[0].replace(/\s+/g, ' ').slice(0, W) : 'NO ' + n);
  console.log('---');
}
