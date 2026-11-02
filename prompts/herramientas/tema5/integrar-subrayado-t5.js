// Integra el Exprés subrayado del T5 en las apps (idempotente): scripts en expres-subrayado.html y el test, TEMAS en esquemas.html, service worker.
const fs = require('fs'), path = require('path'); const R = path.join(__dirname, '..', '..', '..');
const ed = (f, fn) => { const p = path.join(R, f); const a = fs.readFileSync(p, 'utf8'); const b = fn(a); if (a !== b) { fs.writeFileSync(p, b); console.log('editado', f); } };
ed('expres-subrayado.html', s => { let t = s;
  if (!t.includes('expres-subrayado/datos-t5.js')) t = t.replace('<script src="expres-subrayado/datos-t7.js"></script>', m => '<script src="expres-subrayado/datos-t5.js"></script>\n' + m);
  if (!t.includes('<script src="expres/t5.js"></script>')) t = t.replace('<script src="expres/t7.js"></script>', m => '<script src="expres/t5.js"></script>\n' + m); return t; });
ed('test-oficial-conocimiento.html', s => s.includes('expres-subrayado/datos-t5.js') ? s : s.replace('<script src="expres-subrayado/datos-t7.js"></script>', m => '<script src="expres-subrayado/datos-t5.js"></script>\n' + m));
ed('esquemas.html', s => s.replace('TEMAS = [1, 3, 7, 8, 9, 11, 12, 14, 6, 10, 2, 16, 13, 17, 15]', '$&'.replace('$&', 'TEMAS = [1, 3, 7, 8, 9, 11, 12, 14, 6, 10, 2, 16, 13, 17, 15, 5]')));
ed('service-worker.js', s => { let t = s; if (!t.includes('./expres-subrayado/datos-t5.js')) t = t.replace('  "./expres-subrayado/datos-t7.js",', m => '  "./expres-subrayado/datos-t5.js",\n' + m); return t; });
