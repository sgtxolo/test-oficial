// Registra temas nuevos del Exprés subrayado en expres-subrayado.html, service-worker.js, test-oficial-conocimiento.html y esquemas.html.
// Uso: node integrar-tema.js 6 10 …   (idempotente; copia las líneas del tema 12 para cada tema nuevo)
const fs = require('fs');
const B = 'C:/Users/ruben/Desktop/HTML OFICIAL/';
const temas = process.argv.slice(2);
function ins(file, ref, tpl) {
  let s = fs.readFileSync(B + file, 'utf8');
  for (const t of temas) {
    const nuevo = tpl.replace(/12/g, t);
    if (s.includes(nuevo.trim())) continue;
    const re = new RegExp('^.*' + ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '.*\\r?\\n', 'm');
    const m = s.match(re);
    if (!m) { console.log('NO ENCUENTRO', file, ref); continue; }
    const linea = m[0], nl = linea.endsWith('\r\n') ? '\r\n' : '\n';
    s = s.replace(linea, linea + linea.replace(/12/g, t));
  }
  fs.writeFileSync(B + file, s);
}
for (const f of ['bloques', 'cortes', 'revision', 'datos', 'tapa', 'cuadros'])
  ins('expres-subrayado.html', `expres-subrayado/${f}-t12.js`, `<script src="expres-subrayado/${f}-t12.js"></script>`);
ins('expres-subrayado.html', 'expres/t12.js', '<script src="expres/t12.js"></script>');
for (const f of ['bloques', 'cortes', 'revision', 'datos', 'tapa', 'cuadros'])
  ins('service-worker.js', `./expres-subrayado/${f}-t12.js`, `"./expres-subrayado/${f}-t12.js",`);
ins('service-worker.js', './expres/t12.js', '"./expres/t12.js",');
ins('test-oficial-conocimiento.html', 'expres-subrayado/datos-t12.js', '<script src="expres-subrayado/datos-t12.js"></script>');
let e = fs.readFileSync(B + 'esquemas.html', 'utf8');
e = e.replace(/var TEMAS = \[([\d, ]+)\]/, (m, l) => { const a = l.split(',').map(x => +x.trim()); for (const t of temas) if (!a.includes(+t)) a.push(+t); return 'var TEMAS = [' + a.join(', ') + ']'; });
fs.writeFileSync(B + 'esquemas.html', e);
console.log('ok', temas.join(','));
