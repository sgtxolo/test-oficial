// Vuelca el texto plano de fichas del Tema 5 de esquemas.html. Uso: node prompts/herramientas/ver-ficha-t5.js "<prefijo de cabecera>" ["<otro>"…]  (norma opcional con NORMA=T5_EUR)
const fs = require('fs'); const h = fs.readFileSync('esquemas.html', 'utf8');
const a = h.indexOf('const T5 = {};'), b = h.indexOf('/* T5_RECUERDA'); let nm = '';
const want = process.argv.slice(2); const N = process.env.NORMA;
for (const l of h.slice(a, b).split('\n')) {
  const mk = /\/\* (T5_[A-Z0-9]+) \*\//.exec(l); if (mk) nm = mk[1];
  const m = /^  \+ articuloResp\(("(?:[^"\\\n]|\\.)*"), (\[.*?\]), ("(?:[^"\\\n]|\\.)*")/.exec(l); if (!m) continue;
  const cab = JSON.parse(m[1]); if (N && nm !== N) continue; if (!want.some(w => cab.startsWith(w))) continue;
  console.log('### [' + nm + '] ' + cab); console.log(JSON.parse(m[3]).replace(/<\/p><p>/g, '\n').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').slice(0, 2400));
}
