// Comprueba que las preguntas de un tema tienen sus tres enlaces: esquema, temario subrayado y esquema clave.
// Uso: node prompts/herramientas/comprobar-enlaces.js 26 [27 ...]
const fs = require('fs'), path = require('path');
process.chdir(path.join(__dirname, '..', '..'));
const w = {};
const lee = f => { if (!fs.existsSync(f)) return false; new Function('window', fs.readFileSync(f, 'utf8'))(w); return true; };
const app = fs.readFileSync('test-oficial-conocimiento.html', 'utf8');
const mapa = new Set([...fs.readFileSync('esquemas-datos/mapa-preguntas.js', 'utf8').matchAll(/"(\d+-(?:ia-)?\d+)":/g)].map(m => m[1]));
for (const t of process.argv.slice(2).map(Number).filter(Boolean)) {
  const ids = [...new Set([...app.matchAll(new RegExp('\\{"id":"(' + t + '-(?:ia-)?\\d+)","pregunta"', 'g'))].map(m => m[1]))];
  lee('expres-subrayado/datos-t' + t + '.js'); lee('clave-tests/t' + t + '-esq.js');
  const S = (w.EXSUB || {})[t], piezas = new Set(S ? S.piezas.map(p => p.id) : []);
  const clave = new Set((w.CLAVE_LINK || {})[t] || (w.CLAVE_ESQ || {})[t] || []);
  const nuevo = fs.existsSync('repaso-t' + t + '-esquema-clave-nuevo.html');
  // el botón ⭐ del test solo sale en los temas de esta lista
  const lista = (app.match(/if \(id && \[([\d, ]+)\]\.includes\(\+t\)\)\{/) || ['', ''])[1].split(',').map(Number);
  console.log('T' + t + ': ' + ids.length + ' preguntas (' + ids.filter(i => !/-ia-/.test(i)).length + ' oficiales)');
  for (const [nombre, falta] of [['esquema', ids.filter(i => !mapa.has(i))], ['subrayado', ids.filter(i => !S || !piezas.has(S.preg[i]))], ['esquema clave', ids.filter(i => !nuevo || !lista.includes(t) || !clave.has(i))]])
    console.log('  sin ' + nombre + ': ' + falta.length + (falta.length ? ' (oficiales ' + falta.filter(i => !/-ia-/.test(i)).length + ') ' + falta.slice(0, 15).join(' ') : ''));
  if (!nuevo) console.log('  OJO: no existe repaso-t' + t + '-esquema-clave-nuevo.html');
}
