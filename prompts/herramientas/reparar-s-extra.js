// Repara textos donde la extracción perdió las «s» minúsculas (cada «s» quedó como un espacio: «lo  dato  per onale»).
// Reconstruye cada palabra con un diccionario sacado del texto limpio de todos los temas (prompts/temario-limpio/**.txt).
// Uso: node prompts/herramientas/reparar-s-extra.js <ruta _extra.json> [--escribe]
// Sin --escribe solo muestra los cambios y las palabras desconocidas para revisarlas a mano.
const fs = require('fs'), path = require('path');
const LET = 'a-záéíóúüñA-ZÁÉÍÓÚÜÑ0-9';

function leer(d, out) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) leer(p, out);
    else if (f.endsWith('.txt')) for (const l of fs.readFileSync(p, 'utf8').split('\n')) {
      if ((l.match(/s/gi) || []).length / Math.max(1, l.length) < 0.03 && l.length > 60) continue;   // líneas que también perdieron la s
      for (const w of l.match(new RegExp('[' + LET + ']+', 'g')) || []) { const k = w.toLowerCase(); out[k] = (out[k] || 0) + 1; }
    }
  }
}
const V = {}; leer('prompts/temario-limpio', V);
// también el texto ya montado de los esquemas (sin los «(…)» corruptos) y de los Exprés: más palabras de derecho administrativo
{ const add = t => { for (const w of t.match(new RegExp('[' + LET + ']+', 'g')) || []) { const k = w.toLowerCase(); V[k] = (V[k] || 0) + 1; } };
  try { const h = fs.readFileSync('esquemas.html', 'utf8'), a = h.indexOf('<script id="huecos-temario">'), b = h.indexOf('</script>', a);
    add((a >= 0 ? h.slice(0, a) + h.slice(b) : h).replace(/<[^>]+>/g, ' ')); } catch (e) {}
  try { for (const f of fs.readdirSync('expres')) if (/^t[0-9]+[.]js$/.test(f)) add(fs.readFileSync('expres/' + f, 'utf8').replace(/<[^>]+>/g, ' ')); } catch (e) {} }
// palabras cortas válidas (las demás de 1-2 letras suelen ser trozos de una palabra partida)
// arreglos a mano de palabras raras que el diccionario no conoce (se aplican al final)
const FIX = [['esindicándole', 'e indicándole'], ['deudore,', 'deudores,'], ['repre entatividad', 'representatividad'], ['entramadosssocietarios', 'entramados societarios'],
  ['favorecido smediante', 'favorecidos mediante'], ['su tanciándose', 'sustanciándose'], ['ses olucione', 'se solucione'], ['menor onero idad', 'menor onerosidad'],
  ['fungiblesscomputable sen', 'fungibles computables en'], ['esinmutabilidad', 'e inmutabilidad'], ['caducado sno', 'caducados no'], ['se su tancien', 'se sustancien'],
  ['Presidencia sde', 'Presidencias de'], ['Serás ancionable', 'Será sancionable']];
const CORTAS = new Set(['a', 'o', 'y','de', 'la', 'el', 'en', 'es', 'se', 'no', 'ni', 'su', 'un', 'lo', 'al', 'ha', 'le', 'me', 'te', 'si', 'ya', 'mi', 'tu', 'del', 'las', 'los', 'por', 'con', 'que', 'una', 'uno', 'sin', 'sus', 'ser', 'han', 'hay', 'fue', 'art', 'ley', 'rd', 'ue', 'ii', 'iii', 'iv', 'vi', 'ix', 'xi', 'xii']);
function known(w) {
  const l = w.toLowerCase();
  if (/^[0-9]+$/.test(l) || /^[ivxlc]+$/.test(l)) return 5;                 // números y romanos
  if (l.length <= 2) return CORTAS.has(l) && (w === l || w === l[0].toUpperCase() + l.slice(1)) ? 50 : 0;
  if (V[l] >= 4) return V[l];
  if (/rse$/.test(l) && V[l.slice(0, -2)] >= 4) return 3;                         // ejercerse, aplicarse…
  return 0;
}

// Un trozo de letras y espacios (sin puntuación): cada espacio es un espacio real o una «s» perdida.
function trozo(t) {
  const n = t.length, memo = new Map();
  function f(i) {
    if (i >= n) return { s: 0, w: [] };
    if (memo.has(i)) return memo.get(i);
    let mejor = null;
    for (let e = i + 1; e <= Math.min(n, i + 24); e++) {
      const raw = t.slice(i, e), cand = raw.replace(/ /g, 's');
      if (!/[^s]/i.test(cand) && cand.length > 1) continue;       // solo «s»
      let k = known(cand);
      if (k && /^[^ ]+( [^ ]+)+$/.test(raw) && raw.split(' ').every(p => known(p))) k = 0;   // «de acuerdo», «a un»: son dos palabras reales, no una con la s perdida
      if (/^e$/i.test(cand) && /^(i|hi)/i.test(t.slice(e + 1))) k = 50;      // «e» conjunción solo ante i-/hi-; si no, es «se» sin la s
      if (/^u$/i.test(cand) && /^(o|ho)/i.test(t.slice(e + 1))) k = 50;
      const sc = k ? cand.length + Math.min(0.4, Math.log10(k + 1) / 10) : -2 - cand.length;
      let sig;
      if (e >= n) sig = { s: 0, w: [] };
      else if (t[e] === ' ') sig = f(e + 1);          // separador real
      else continue;
      const tot = sc + sig.s;
      if (!mejor || tot > mejor.s) mejor = { s: tot, w: [cand, ...sig.w] };
    }
    if (!mejor) mejor = { s: -99, w: [t.slice(i).replace(/ /g, 's')] };
    memo.set(i, mejor); return mejor;
  }
  return f(0).w;
}
function repara(txt, desc) {
  // separa por puntuación (todo lo que no es letra/dígito/espacio) y repara cada trozo
  const partes = txt.split(new RegExp('([^' + LET + ' ]+)'));
  return partes.map((p, i) => {
    if (i % 2) return p;
    if (!p.trim()) return p;
    const sp = i > 0 && p[0] === ' ' ? ' ' : '';                  // el espacio real tras la puntuación
    let cuerpo = sp ? p.slice(1) : p, fin = '';
    if (/ $/.test(cuerpo) && /^[(«¿¡"“]/.test(partes[i + 1] || '')) { cuerpo = cuerpo.slice(0, -1); fin = ' '; }   // «Reglamento (UE)»: ese espacio es real
    const w = trozo(cuerpo);
    w.forEach(x => { if (!known(x) && /[a-záéíóúñ]{3,}/i.test(x)) desc.add(x); });
    return sp + w.join(' ') + fin;
  }).join('');
}
module.exports = { repara, trozo, known };
if (require.main === module) {
  const f = process.argv[2], ex = JSON.parse(fs.readFileSync(f, 'utf8')), desc = new Set(), out = {};
  for (const k in ex) { let o = repara(ex[k], desc); for (const [a, b] of FIX) o = o.split(a).join(b); out[k] = o; }
  const ks = Object.keys(ex);
  for (const k of ks.slice(0, 5)) console.log('ANTES  ', ex[k].slice(0, 200), '\nDESPUÉS', out[k].slice(0, 200), '\n');
  console.log('palabras desconocidas:', [...desc].join(' '));
  if (process.argv.includes('--escribe')) { fs.writeFileSync(f, JSON.stringify(out, null, 1)); console.log('escrito'); }
}
