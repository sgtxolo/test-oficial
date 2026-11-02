// Tema 5 · separa las preguntas que NO caen en el resumen subrayado del usuario (lista en resumen-t5.js).
// Lee las preguntas del Tema 5 de test-oficial-conocimiento.html (oficiales + IA), mira el artículo/apartado que cita cada una y escribe
// esquemas-datos/fuera-resumen-t5.js (window.FUERA_RESUMEN = {id:1}), que el test usa para no sacarlas (siguen en la app: se recuperan quitando el id).
// Uso: node prompts/herramientas/tema5/resumen-triaje.js [--dry]     (escribe también prompts/temario-limpio/tema5/triaje-resumen.json)
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..', '..');
const R = require('./resumen-t5.js');
const DRY = process.argv.includes('--dry');
const s = fs.readFileSync(path.join(ROOT, 'test-oficial-conocimiento.html'), 'utf8');
const BS = String.fromCharCode(92);
const qs = []; const re = /\{"id":"5-[^"]*"/g; let m;
while ((m = re.exec(s))) { let d = 0, inS = false, esc = false, j = m.index;
  for (; j < s.length; j++) { const c = s[j];
    if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; }
    if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  try { const q = JSON.parse(s.slice(m.index, j + 1)); if (q.pregunta && q.opciones) qs.push(q); } catch (e) { /* trozo de otro objeto */ } }
const vistos = new Set(); const uniq = qs.filter(q => !vistos.has(q.id) && vistos.add(q.id));
const strip = t => t.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const normaDe = t => /2018\/1861/.test(t) ? 'sis' : /767\/2008/.test(t) ? 'vis' : /810\/2009/.test(t) ? 'cv' : /977\/2011/.test(t) ? 'r977' : /2024\/1358|603\/2013|EURODAC/i.test(t) ? 'eur' : /AEC\/240/.test(t) ? 'aec' : null;
const SUF = 'bis|ter|quater|quinquies|sexies|septies|octies|nonies|decies|undecies|duodecies|terdecies|quaterdecies|quindecies|sexdecies|septdecies|octodecies|novodecies|vicies|unvicies';
const RX = new RegExp('arts?\\.?\\s*(\\d+)(?:\\s+(' + SUF + '))?(?:\\s+(' + SUF + '))?(?:[,.\\s]+(?:apartados?\\s*)?(\\d+))?', 'i');
const fuera = {}, dentro = {}, dudosas = []; const cuenta = {};
uniq.forEach(q => {
  const mm = q.explicacion.match(/<span class="ref-norma">([\s\S]*?)<\/span>/); const rn = mm ? strip(mm[1]) : '';
  const norma = normaDe(q.apartado || '') || normaDe(rn) || normaDe(q.pregunta);
  const ia = /-ia-/.test(q.id); const k = (norma || '?') + (ia ? ' IA' : ' oficial');
  let out = false, motivo = '';
  if (norma === 'r977' || norma === 'aec') { out = true; motivo = 'norma fuera del resumen'; }
  else if (/considerandos?\s+\d/i.test(rn)) { out = true; motivo = 'considerando'; }   // ni el resumen ni el 5.5 nuevo llevan preámbulo
  else if (norma === 'eur') { out = false; }
  else if (norma && R[norma]) {
    const a = RX.exec(rn);
    if (!a) { dudosas.push(q.id); motivo = 'sin cita'; }
    else { const art = a[1] + (a[2] ? ' ' + a[2].toLowerCase() : '') + (a[3] ? ' ' + a[3].toLowerCase() : ''); const ap = a[4] || ''; const w = R[norma][art];
      if (w === undefined) { out = true; motivo = 'art. ' + art + ' no está'; }
      else if (w !== '*' && ap && !w.map(String).includes(ap)) { out = true; motivo = 'art. ' + art + '.' + ap + ' no está'; } }
  } else if (!norma) { dudosas.push(q.id); motivo = 'sin norma'; }
  if (out) fuera[q.id] = 1; else dentro[q.id] = 1;
  cuenta[k] = cuenta[k] || { dentro: 0, fuera: 0 }; cuenta[k][out ? 'fuera' : 'dentro']++;
  q._t = { out, motivo };
});
console.log('preguntas del Tema 5:', uniq.length, '· apartadas:', Object.keys(fuera).length, '· dudosas (se dejan):', dudosas.length);
console.table(cuenta);
if (!DRY) {
  fs.writeFileSync(path.join(ROOT, 'esquemas-datos', 'fuera-resumen-t5.js'), 'window.FUERA_RESUMEN=' + JSON.stringify(fuera) + ';\n');
  fs.writeFileSync(path.join(ROOT, 'prompts', 'temario-limpio', 'tema5', 'triaje-resumen.json'), JSON.stringify(uniq.map(q => ({ id: q.id, out: q._t.out, motivo: q._t.motivo })), null, 0));
  console.log('escrito esquemas-datos/fuera-resumen-t5.js');
}
console.log('dudosas:', dudosas.join(' '));
