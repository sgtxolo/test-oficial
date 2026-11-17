// Completa lila y rojo de las preguntas Forma que no lo traen (T1, T3…) con el párrafo del esquema al que MAPA_PREG las enlaza.
// Uso: node prompts/herramientas/forma-citas-esquema.js   (luego: node prompts/herramientas/forma-insertar.js)
require('./esq-virtual.js');
const fs = require('fs');
const B = 'prompts/herramientas/forma/forma-banco.json';
const bank = JSON.parse(fs.readFileSync(B, 'utf8'));
const w = {}; new Function('window', fs.readFileSync('esquemas-datos/mapa-preguntas.js', 'utf8'))(w);
const MAPA = w.MAPA_PREG;
// cargar esquemas (igual que mapa-preguntas.js)
const h = fs.readFileSync('esquemas.html', 'utf8');
const src = [...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(s => s.includes('temasPrograma'));
const code = src.slice(0, src.search(/\nrender\(\);/)) + ';return esquemas;';
const fake = () => new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? (() => '') : fake(), apply: () => fake(), set: () => true, construct: () => fake() });
const esquemas = new Function('document', 'window', 'localStorage', 'speechSynthesis', 'location', 'matchMedia', 'addEventListener', 'removeEventListener', code)(fake(), fake(), fake(), fake(), fake(), fake(), fake(), fake());
const txt = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const sa = s => txt(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const pal = s => new Set(sa(s).match(/[a-zñ0-9]{5,}/g) || []);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// índice: tema-k-j -> {head, p}
const idx = {};
esquemas.forEach((e, i) => {
  const tema = i + 1; if (!e.html) return;
  const re = /<div class="articulo">([\s\S]*?<div class="txt">([\s\S]*?)<\/div>\s*(?:<div class="sello-examen">EX<\/div>)?\s*<\/div>\s*<\/div>)/g; let m, k = -1;
  while ((m = re.exec(e.html))) {
    k++;
    const head = txt((m[1].match(/<div class="articulo-head">([\s\S]*?)<\/div>/) || [])[1]);
    const ps = [...m[2].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(x => x[1]);
    (ps.length ? ps : [m[2]]).forEach((p, j) => { idx[`${tema}-${k}-${ps.length ? j : 'x'}`] = { head, p: txt(p) }; });
  }
});
function loc(head, p) {
  const par = (p.match(/^(\d+(?:\.\d+)*)\.\s/) || [])[1] || '';
  const art = (head.match(/^Art[íi]culo\s+(\d+(?:\s*(?:bis|ter|quater|quinquies))?)/i) || [])[1];
  if (art) return par && !/\./.test(par) ? `Art. ${art.trim()}.${par}` : `Art. ${art.trim()}`;
  return '';
}
let con = 0, sin = 0, dosCon = 0;
for (const q of bank) {
  if (/ref-concepto/.test(q.explicacion)) continue;
  const pid = (MAPA[q.id] || '').split('-').slice(0, 3).join('-');
  const u = idx[pid]; if (!u) { sin++; continue; }
  const ans = q.opciones[q.correcta];
  const A = pal(ans + ' ' + q.pregunta), P = pal(u.p); let ov = 0; A.forEach(x => { if (P.has(x)) ov++; });
  if (ov < 2) { sin++; continue; }
  const cuerpo = u.p.replace(/^\d+(?:\.\d+)*\.\s+/, '');
  const frases = cuerpo.split(/(?<=[.;:])\s+(?=[A-ZÁÉÍÓÚÑ¿«"“\d]|[a-z]\))/).map(s => s.trim()).filter(Boolean);
  const Aw = pal(ans), Qw = pal(q.pregunta);
  let ib = 0, mx = -1;
  frases.forEach((f, i) => { const fw = pal(f); let s = 0; Aw.forEach(x => fw.has(x) && (s += 3)); Qw.forEach(x => fw.has(x) && s++); if (s > mx) { mx = s; ib = i; } });
  if (!frases.length) { sin++; continue; }
  let lit = frases[ib]; if (lit.length < 90 && frases[ib + 1]) lit += ' ' + frases[ib + 1];
  if (lit.length > 450) lit = lit.slice(0, 450).replace(/\s+\S*$/, '') + '…';
  const l = loc(u.head, u.p);
  let e = q.explicacion;
  const rojo = `<span class="ref-concepto">"${esc(lit)}"</span>`;
  if (/ref-norma/.test(e)) e = e.replace(/(<span class="ref-norma">[^<]*<\/span>)/, '$1' + rojo);
  else if (l) e = e.replace(/(<\/mark><\/span>)/, `$1<span class="ref-norma">${esc(l)} · ${esc(q.apartado)}</span>` + rojo);
  else e = e.replace(/(<\/mark><\/span>)/, `$1<span class="ref-norma">${esc(q.apartado)}</span>` + rojo);
  q.explicacion = e; con++;
}
fs.writeFileSync(B, JSON.stringify(bank, null, 1));
console.log('rojo añadido desde el esquema:', con, '· sin párrafo fiable:', sin, '· con rojo en total:', bank.filter(q => /ref-concepto/.test(q.explicacion)).length, 'de', bank.length);
