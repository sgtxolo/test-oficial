// Funciones para enlazar preguntas del T4 con el esquema y el subrayado (usado por enlaces-t4-resto.js). Ejecutar desde la carpeta del proyecto.
const fs = require('fs'), path = require('path');
const P = __dirname + '/';
require(P + 'esq-virtual.js');
const src = fs.readFileSync(P + 'mapa-preguntas.js', 'utf8');
const cuerpo = src.slice(src.indexOf('const ESQ ='), src.indexOf('// ---------- 6. Ejecutar'));
const F = new Function('fs', 'require', '__dirname', cuerpo + ';return {cargarEsquemas,unidades,norm,puntuar,cargarPreguntas,articulosDe};')(fs, require, P);
const E = F.cargarEsquemas();
const us = F.unidades(E[3], 4);
{ // norma de cada ficha por el título mayor «4.M —»
  const h = E[3].html; const re = /<div class="bloque-titulo">([\s\S]*?)<\/div>|<div class="articulo">/g; let m, k = -1, M = ''; const may = {};
  while ((m = re.exec(h))) { if (m[1] !== undefined) { const t = m[1].replace(/<[^>]+>/g, ''); const x = t.match(/^\s*(4\.\d)/); if (x) M = x[1]; if (/AMPLIACIONES/.test(t)) M = 'amp'; } else may[++k] = M; }
  us.forEach(u => u.mayor = may[+u.pid.split('-')[1]]);
}
const MAY = { C: '4.1', G: '4.2', P: '4.3', D: '4.4', R: '4.5', E: '4.6' };
const grams = t => { const w = F.norm(t).split(' ').filter(Boolean); const s = new Set(); for (let i = 0; i + 3 <= w.length; i++) s.add(w.slice(i, i + 3).join(' ')); return s; };
us.forEach(u => u.g = grams(u.T));
const contiene = (t, u) => { const g = grams(t); if (!g.size) return 0; let h = 0; for (const x of g) if (u.g.has(x)) h++; return h / g.size; };
const piezas = (() => { const w = {}; new Function('window', fs.readFileSync('expres-subrayado/datos-t4.js', 'utf8'))(w); return w.EXSUB[4]; })();
const idsPz = new Set(piezas.piezas.map(p => p.id).concat(JSON.parse(fs.readFileSync(P + 'oficiales-seras-t4-piezas.json', 'utf8')).map(b => b.id)));
const FIJO = { 'a-6bis': 'a-6', 'a-8bis': 'a-8', 'a-8ter': 'a-8', 'a-8quater': 'a-8', 'a-8quinquies': 'a-8', 'a-23bis': 'a-23', 'a-25bis': 'a-25', 'a-27bis': 'a-26', 'a-20': 'a-18', 'a-19': 'a-18', 'a-12bis': 'a-12', 'a-21bis': 'a-21', 'a-37bis': 'a-37', 'b-5': 'b-4', 'b-8': 'b-7', 'b-34': 'b-33', 'b-44': 'b-43', 'b-68': 'b-67', 'b-82': 'b-81', 'b-87': 'b-86', 'b-80': 'b-80', 'c-4': 'c-3', 'c-8': 'c-7', 'f-3': 'f-2', 'f-5': 'f-4', 'f-7': 'f-6', 'f-9': 'f-8', 'f-10': 'f-10', 'f-11': 'f-10', 'f-12': 'f-10', 'f-14': 'f-13', 'f-16': 'f-15', 'f-22': 'f-22', 'f-23': 'f-22', 'a-anexoIV': 'a-anexo4', 'a-anexoV': 'a-anexo4', 'a-anexoVI': 'a-anexo6', 'a-anexoVII': 'a-anexo7', 'f-anexo2': 'f-anexo2', 'f-anexo3': 'f-anexo3', 'b-pre': 'b-pre', 'c-pre': 'c-pre' };
const num = s => parseInt(s, 10);
function piezaDe(letra, art) {
  const a = String(art).replace(/ /g, '');
  const k = letra + '-' + a;
  if (FIJO[k]) return FIJO[k];
  if (idsPz.has(k)) return k;
  // la pieza anterior de la misma norma (cada recorte llega hasta el siguiente artículo recortado)
  const n = num(a); if (!n) return null;
  for (let x = n; x > 0; x--) { const c = FIJO[letra + '-' + x] || (idsPz.has(letra + '-' + x) ? letra + '-' + x : null); if (c) return c; }
  return null;
}
const LETRA = { C: 'a', G: 'b', P: 'c', D: 'd', R: 'e', E: 'f' };
function normaDe(q) {
  const a = q.apartado || '', e = ((q.explicacion || '') + ' ' + q.pregunta).replace(/<[^>]+>/g, ' ');
  const t = a + ' ¦ ' + e;
  const prueba = s => /2024\/1349|retorno fronterizo/i.test(s) ? 'R' : /2021\/581|mapas? de situaci[oó]n del sistema|Ejecuci[oó]n.*EUROSUR/i.test(s) ? 'E' : /2008\/615|Decisi[oó]n (de )?Pr[uü]m|Decisi[oó]n 2008/i.test(s) ? 'D' : /(Tratado|Convenio) (de )?Pr[uü]m/i.test(s) ? 'P' : /2019\/1896|Guardia Europea|Guardia de Fronteras y Costas|GEFC|Frontex/i.test(s) ? 'G' : /2016\/399|Schengen|CFS/i.test(s) ? 'C' : null;
  if (/Decisi[oó]n Pr[uü]m/.test(a)) return 'D';
  if (/^Tratado de Pr/.test(a)) return 'P';
  if (/^Convenio de Pr/.test(a)) return /Decisi[oó]n/.test(e) && !/Tratado|Convenio de Pr/.test(e) ? 'D' : 'P';
  if (/Guardia/.test(a)) return 'G';
  if (/[Ff]ronteras Schengen|2016\/399/.test(a)) return 'C';
  if (/EUROSUR/.test(a)) return 'E';
  return prueba(e) || prueba(t) || (/Pr[uü]m/.test(t) ? 'P' : null);
}
function artDe(q) {
  const e = (q.explicacion || '').replace(/<[^>]+>/g, ' ');
  const m = e.match(/(?:art(?:[ií]culos?|s?\.)|Art\.)\s*(\d+(?:\s*(?:bis|ter|quater|quinquies))?)/i);
  if (m) return m[1].toLowerCase().replace(/ /g, '');
  const an = e.match(/Anexo\s+([IVX]+|\d)/i); if (an) return 'anexo' + an[1].toUpperCase();
  const m2 = q.pregunta.match(/art(?:[ií]culos?|\.)\s*(\d+)/i); return m2 ? m2[1] : null;
}
function enlaza(q, norma, art, citaTxt) {
  let cand = norma ? us.filter(u => u.mayor === MAY[norma] || u.mayor === 'amp') : us;
  const fake = { pregunta: q.pregunta, opciones: q.opciones, correcta: q.correcta, explicacion: (citaTxt || q.explicacion || '') + (art ? ' art. ' + art.replace(/(\d)(bis|ter|qu)/, '$1 $2') : ''), apartado: q.apartado };
  let best = null, bs = -1, bm = null, bc = 0;
  const correcta = q.opciones[q.correcta];
  for (const u of cand) {
    const s = F.puntuar(fake, u);
    let c = citaTxt ? contiene(citaTxt, u) : contiene((q.explicacion || '').replace(/<[^>]+>/g, ' '), u);
    const c2 = contiene(correcta, u);
    let tot = s.s + 4 * c + 1.5 * c2;
    if (art) { const a = art.replace(/(\d)(bis|ter|qu)/, '$1 $2'); if (u.arts.has(a)) tot += 1.5; if (/^anexo/.test(art) && u.cab.includes('anexo ' + art.slice(5).toLowerCase())) tot += 2; }
    if (u.mayor === 'amp') tot -= 0.6;
    if (tot > bs) { bs = tot; best = u; bm = s; bc = Math.max(c, bm.fT); }
  }
  return { par: best.pid.slice(2) + (bm.mark >= 0 ? '-' + bm.mark : ''), conf: bc, u: best };
}
module.exports = { us, enlaza, normaDe, artDe, piezaDe, LETRA, F };
