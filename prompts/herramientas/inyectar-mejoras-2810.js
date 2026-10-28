// Inserta (o actualiza) en esquemas.html el bloque de mejoras de prompts/herramientas/mejoras-2810.html, entre <!--MEJORAS2810--> y <!--/MEJORAS2810-->, justo antes de </body>.
const fs = require('fs');
let s = fs.readFileSync('esquemas.html', 'utf8');
const bloque = '<!--MEJORAS2810-->\n' + fs.readFileSync('prompts/herramientas/mejoras-2810.html', 'utf8').trim() + '\n<!--/MEJORAS2810-->\n';
const a = s.indexOf('<!--MEJORAS2810-->');
if (a >= 0) { const b = s.indexOf('<!--/MEJORAS2810-->', a) + '<!--/MEJORAS2810-->'.length; s = s.slice(0, a) + bloque.trim() + s.slice(b).replace(/^\r?\n/, '\n'); }
else { const p = s.lastIndexOf('</body>'); s = s.slice(0, p) + bloque + s.slice(p); }
fs.writeFileSync('esquemas.html', s);
const re = /<script[^>]*>([\s\S]*?)<\/script>/g; let m, n = 0, bad = 0;
while ((m = re.exec(s))) { n++; try { new Function(m[1]); } catch (e) { bad++; console.log('ERR script', n, e.message); } }
console.log('inyectado · scripts', n, 'errores', bad);
