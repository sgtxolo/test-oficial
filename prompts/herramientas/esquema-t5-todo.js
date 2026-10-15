// Reconstruye el esquema del Tema 5 (fichas con citas literales de las preguntas + colores reales del PDF subrayado del usuario).
// Uso: S=<carpeta con subrayado.json y t5.json> node prompts/herramientas/esquema-t5-todo.js
//   (t5.json = node extraer-preguntas.js test-oficial-conocimiento.html 5 t5.json ; subrayado.json = py subrayado-pdf.py <pdf> subrayado.json)
// Después: node visuales-t5.js (cuadros), recuerda, mapa-preguntas.js, cobertura.js.
const { execSync } = require('child_process'); const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..'); process.chdir(ROOT);
const S = process.env.S; if (!S) { console.error('Falta S=<carpeta con subrayado.json y t5.json>'); process.exit(1); }
const RG = 'T5_SIS:43-105,T5_VIS:107-223,T5_CV:225-240,T5_CV2:28-36,T5_R977:289-292,T5_EUR:305-374,T5_AEC:293-296';
const run = (c, env = {}) => { const o = execSync(c, { env: { ...process.env, ...env }, stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1 << 28 }); return o.toString(); };
const A = `node prompts/herramientas/aplicar-subrayado-pdf.js "${S}/subrayado.json" esquemas.html "const T5 = {};" "/* T5_RECUERDA" "${RG}"`;
console.log(run(`node prompts/herramientas/esquema-t5-gen.js "${S}/t5.json"`).split('\n')[0]);
try { run(A + ' --dry', { UMBRAL: '0.2', REPORT: S + '/rep.json' }); } catch (e) { console.log(String(e.stderr).split('\n').slice(-3).join('\n')); }
console.log(run(`node prompts/herramientas/podar-t5.js "${S}/rep.json"`).trim());
try { run(A, { UMBRAL: '0.2' }); } catch (e) { console.log(String(e.stderr).split('\n').slice(-3).join('\n')); }
run('node prompts/herramientas/unir-subrayados.js');
// unir-subrayados toca todo el archivo: se deja solo la zona del Tema 5 y el resto como en HEAD
const head = execSync('git show HEAD:esquemas.html', { maxBuffer: 1 << 28 }).toString('utf8').replace(/\r\n/g, '\n');
const cur = fs.readFileSync('esquemas.html', 'utf8').replace(/\r\n/g, '\n');
const X = 'const T5 = {};', Y = '/* T5_RECUERDA';
fs.writeFileSync('esquemas.html', head.slice(0, head.indexOf(X)) + cur.slice(cur.indexOf(X), cur.indexOf(Y)) + head.slice(head.indexOf(Y)));
console.log('esquema del Tema 5 reconstruido');
