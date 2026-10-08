// Mide si la opción correcta es la más larga (el fallo que hace las preguntas «adivinables»).
// Uso:  node prompts/herramientas/sesgo-longitud.js <preguntas.json>          (array de preguntas {opciones:[4], correcta:n})
//       node prompts/herramientas/sesgo-longitud.js --banco <tema> [--ia]    (lee test-oficial-conocimiento.html)
// Sale con código 1 si NO cumple el límite (correcta más larga en > 35 %, o > 10 puntos sobre lo esperable).
// Ideal: la correcta es la más larga en ~25 % (azar) y nunca > 35 %.
const fs = require('fs');
const a = process.argv.slice(2);
let qs;
if (a[0] === '--banco') {
  const tema = a[1], soloIA = a.includes('--ia'), BS = String.fromCharCode(92);
  const s = fs.readFileSync('test-oficial-conocimiento.html', 'utf8');
  const pref = '{"id":"' + tema + '-'; qs = []; let i = -1;
  while ((i = s.indexOf(pref, i + 1)) >= 0) {
    let d = 0, inS = false, esc = false, j = i;
    for (; j < s.length; j++) { const c = s[j]; if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
    try { const q = JSON.parse(s.slice(i, j + 1)); if (q.opciones && q.opciones.length === 4 && (!soloIA || /-ia-/.test(q.id))) qs.push(q); } catch (e) {}
    i = j;
  }
} else qs = JSON.parse(fs.readFileSync(a[0], 'utf8'));
let may = 0, dif = [];
qs.forEach(q => {
  const L = q.opciones.map(o => String(o).length), c = L[q.correcta], mx = Math.max(...L);
  if (c === mx && L.filter(x => x === mx).length === 1) may++;
  dif.push(c / ((L.reduce((x, y) => x + y, 0) - c) / 3));
});
const pc = qs.length ? 100 * may / qs.length : 0, med = dif.length ? dif.reduce((x, y) => x + y, 0) / dif.length : 0;
console.log(qs.length + ' preguntas · correcta = la MÁS LARGA en ' + pc.toFixed(0) + ' % (ideal ≈25, máximo 35) · la correcta mide de media ' + (100 * med).toFixed(0) + ' % de lo que miden las falsas (ideal ≈100)');
if (pc > 35 || med > 1.15) { console.log('✗ NO CUMPLE: alarga los distractores (con detalle verosímil) o acorta la correcta y vuelve a medir.'); process.exit(1); }
console.log('✓ cumple');
