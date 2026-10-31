// Lista las preguntas del banco de un tema que NO llevan botón «Ver en mi temario subrayado» y qué citan.
// Uso: node prompts/herramientas/expres-subrayado-sinboton.js 11        (resumen)      |   ... 11 todo   (una línea por pregunta)
const fs = require('fs'); const T = process.argv[2]; const TODO = process.argv[3] === 'todo'; global.window = {};
require('../../expres-subrayado/datos-t' + T + '.js'); const S = window.EXSUB[T];
const th = fs.readFileSync('test-oficial-conocimiento.html', 'utf8'), i0 = th.indexOf('window.piezaSubrayado = function'), i1 = th.indexOf('\n  };\n', i0);
const hw = {}; new Function('window', th.slice(i0, i1 + 5))(hw);
const RQ = new RegExp('\\{"id":"(' + T + '-[^"]+)","pregunta":"((?:[^"\\\\]|\\\\.)*)","opciones"[\\s\\S]{0,3000}?"explicacion":"((?:[^"\\\\]|\\\\.)*)"', 'g');
const CIT = /(?:art(?:ículo|\.)\s*\d+[^,;:."]{0,60}|disposici[óo]n(?:es)?\s+(?:adicional|transitoria|final|derogatoria)[^,;:."]{0,70}|pre[áa]mbulo[^,;:."]{0,70}|exposici[óo]n de motivos[^,;:."]{0,60})/i;
const sin = []; let n = 0;
for (const m of th.matchAll(RQ)) {
  n++; const e = m[3].replace(/\\"/g, '"');
  if (!hw.piezaSubrayado(S, m[1], e)) {
    const txt = e.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
    sin.push([m[1], (txt.match(CIT) || ['(sin cita reconocible) ' + txt.slice(0, 60)])[0]]);
  }
}
console.log(n + ' preguntas; ' + sin.length + ' sin botón');
if (TODO) { sin.forEach(([id, c]) => console.log(id + ' | ' + c)); }
else {
  const por = {}; sin.forEach(([id, c]) => { const k = c.replace(/\s+/g, ' ').slice(0, 75); (por[k] = por[k] || []).push(id); });
  Object.entries(por).sort((a, b) => b[1].length - a[1].length).forEach(([k, v]) => console.log(v.length + '  ' + k + '  ej: ' + v.slice(0, 2).join(',')));
}
