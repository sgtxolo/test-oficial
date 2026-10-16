// Comprueba la sintaxis de todos los <script> de test-oficial-conocimiento.html y cuenta las IA del tema 7.
const s = require('fs').readFileSync('test-oficial-conocimiento.html', 'utf8');
const re = /<script[^>]*>([\s\S]*?)<\/script>/g;
let m, n = 0, bad = 0;
while ((m = re.exec(s))) { n++; try { new Function(m[1]); } catch (e) { bad++; console.log('ERR script', n, e.message); } }
console.log('scripts', n, 'errores', bad);
const ids = s.match(/"id":"7-ia-\d+"/g) || [];
console.log('IA tema 7:', ids.length, '· antiguas (<1000):', ids.filter(x => +x.match(/(\d+)"$/)[1] < 1000).length);
process.exit(bad ? 1 : 0);
