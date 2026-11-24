// Sustituye el contenido de preguntas OFICIALES ya insertadas (mismo id) por las de un --json de bloque (misma posición).
// Uso: node prompts/herramientas/reemplaza-preguntas.js <json> <id1,id2,...>
const fs = require('fs'); const F = __dirname + '/../../test-oficial-conocimiento.html', BS = String.fromCharCode(92);
const [jf, ids] = process.argv.slice(2); const nuevas = JSON.parse(fs.readFileSync(jf, 'utf8')), lista = ids.split(','); if (nuevas.length !== lista.length) throw new Error('distinto número de preguntas e ids');
let s = fs.readFileSync(F, 'utf8');
lista.forEach((id, k) => {
  const i = s.indexOf('{"id":"' + id + '"'); if (i < 0) throw new Error('no está ' + id);
  let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const c = s[j]; if (inS) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  const o = JSON.parse(s.slice(i, j + 1)), n = nuevas[k];
  const ex = n.explicacion.replace(/\s*<em style="color:var\(--texto-gris\)">\(Pregunta generada por IA\)<\/em>/, '') + ' <i>(asterisco ✱ del temario)</i>';
  if (/generada por IA/.test(ex)) throw new Error('etiqueta IA en ' + id);
  o.pregunta = n.pregunta; o.opciones = n.opciones; o.correcta = n.correcta; o.explicacion = ex; o.apartado = n.apartado;
  s = s.slice(0, i) + JSON.stringify(o) + s.slice(j + 1);
});
fs.writeFileSync(F, s); console.log('sustituidas', lista.length);
