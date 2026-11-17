// Integra el Exprés subrayado del T25: añade (idempotente) una línea para el T25 detrás de la del T23 en expres-subrayado.html, test-oficial-conocimiento.html, service-worker.js y el array TEMAS de esquemas.html.
const fs = require('fs');
const dup = (f, base, nuevo) => { let s = fs.readFileSync(f, 'utf8'); if (s.includes(nuevo)) return 'ya'; if (!s.includes(base)) return 'SIN ANCLA ' + base; s = s.replace(base, base + (f.endsWith('.js') ? '\n  ' : '\n') + nuevo); fs.writeFileSync(f, s); return 'ok'; };
const H = 'expres-subrayado.html';
const out = [];
for (const k of ['cortes', 'bloques', 'revision', 'datos', 'cuadros']) out.push(k + ' ' + dup(H, `<script src="expres-subrayado/${k}-t23.js"></script>`, `<script src="expres-subrayado/${k}-t25.js"></script>`));
out.push('expres ' + dup(H, '<script src="expres/t23.js"></script>', '<script src="expres/t25.js"></script>'));
out.push('test ' + dup('test-oficial-conocimiento.html', '<script src="expres-subrayado/datos-t23.js"></script>', '<script src="expres-subrayado/datos-t25.js"></script>'));
for (const k of ['cortes', 'bloques', 'datos', 'cuadros']) out.push('sw-' + k + ' ' + dup('service-worker.js', `"./expres-subrayado/${k}-t23.js",`, `"./expres-subrayado/${k}-t25.js",`));
{ let s = fs.readFileSync('esquemas.html', 'utf8'); const a = 'var TEMAS = [1, 3, 4, 7, 8, 9, 11, 12, 14, 6, 10, 2, 16, 13, 17, 15, 5, 18, 19, 20, 21, 22, 23]'; if (s.includes(a)) { s = s.replace(a, a.replace('22, 23]', '22, 23, 25]')); fs.writeFileSync('esquemas.html', s); out.push('esquemas ok'); } else out.push('esquemas: ya o sin ancla'); }
console.log(out.join('\n'));
