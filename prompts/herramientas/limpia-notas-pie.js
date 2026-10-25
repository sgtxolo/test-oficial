// Quita los dígitos sueltos de NOTAS AL PIE que el OCR/PDF dejó pegados en enunciados y opciones de las preguntas de un tema
// («po1r», «c4onformidad», «institución.3», «7Todas son correctas»). Solo toca preguntas cuyo texto casa con el detector; muestra cada cambio.
// Uso: node prompts/herramientas/limpia-notas-pie.js N [--aplicar]      (idempotente; escribe test-oficial-conocimiento.html)
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..'); process.chdir(RAIZ);
const N = +process.argv[2]; const APLICA = process.argv.includes('--aplicar');
const TEST = 'test-oficial-conocimiento.html', ESQ = 'esquemas.html';
const src = fs.readFileSync('prompts/herramientas/mapa-preguntas.js', 'utf8');
eval(src.slice(src.indexOf('// ---------- 1.'), src.indexOf('// ---------- 5.')).replace(/^const /gm, 'var '));
const CONTEXTO = /\b(art|artículo|artículos|ley|apartado|número|n\.º|nº|nº\.|plazo|meses|días|años|euros)\b/i;
function limpia(t) {
  if (typeof t !== 'string') return t;
  return t
    .replace(/([A-Za-záéíóúñÁÉÍÓÚ])(\d{1,2})(?=[A-Za-záéíóúñ])/g, (m, a, d, off, s) => (CONTEXTO.test(s.slice(Math.max(0, off - 12), off + 1)) ? m : a))   // po1r → por
    .replace(/([a-záéíóúñ])(\d{1,2})(?=[ ,.;:)?¿]|$)/g, (m, a, d, off, s) => (CONTEXTO.test(s.slice(Math.max(0, off - 14), off + 1)) ? m : a))              // del2 Pueblo → del Pueblo
    .replace(/(?<!\d)([.,;:?!])(\d{1,2})(?=\s|$)/g, '$1')                                                                                                         // institución.3 → institución.
    .replace(/(^|\s)(\d{1,2})(?=[A-ZÁÉÍÓÚ][a-záéíóúñ]{2,})/g, '$1');                                                                                          // 7Todas → Todas
}
const BS = String.fromCharCode(92); let s = fs.readFileSync(TEST, 'utf8'); let cambios = 0;
for (const q of cargarPreguntas(N)) {
  const nuevo = { ...q, pregunta: limpia(q.pregunta), opciones: q.opciones.map(limpia) };
  if (nuevo.pregunta === q.pregunta && nuevo.opciones.every((o, i) => o === q.opciones[i])) continue;
  cambios++; console.log(q.id); if (nuevo.pregunta !== q.pregunta) console.log('   P:', q.pregunta.slice(-90), '→', nuevo.pregunta.slice(-90));
  q.opciones.forEach((o, i) => { if (o !== nuevo.opciones[i]) console.log('   ' + 'ABCD'[i] + ':', o.slice(-70), '→', nuevo.opciones[i].slice(-70)); });
  if (APLICA) { const k = '{"id":"' + q.id + '"'; const i = s.indexOf(k); if (i < 0) continue; let d = 0, inS = false, e = false, j = i;
    for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (!d) break; } }
    const obj = JSON.parse(s.slice(i, j + 1)); obj.pregunta = nuevo.pregunta; obj.opciones = nuevo.opciones; s = s.slice(0, i) + JSON.stringify(obj) + s.slice(j + 1); }
}
if (APLICA && cambios) fs.writeFileSync(TEST, s);
console.log(cambios, 'preguntas con notas al pie' + (APLICA ? ' limpiadas' : ' (sin aplicar)'));
