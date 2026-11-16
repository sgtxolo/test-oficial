// node ver.js 6 16  -> imprime del "Artículo 6." hasta "Artículo 16." (texto oficial compacto)
const t = require('fs').readFileSync('prompts/temario-limpio/tema23/oficial-compacto.txt', 'utf8').replace(/\n\s*\n/g, '\n').replace(/ +/g, ' ');
const [a, b] = process.argv.slice(2);
const i = t.indexOf('\nArtículo ' + a + '.'); const j = b ? t.indexOf('\nArtículo ' + b + '.') : t.length;
console.log(t.slice(i, j));
