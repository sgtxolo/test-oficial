// Genera las fichas del esquema del Tema 5 (solo lo subrayado por el usuario) a partir de las citas LITERALES de las
// preguntas (IA, todas hechas sobre texto subrayado, + oficiales con cita) y las escribe en esquemas.html.
// Uso: node prompts/herramientas/esquema-t5-gen.js [--dry]
// Después: aplicar-subrayado-pdf.js (colores reales del PDF del usuario) y unir-subrayados.js, visuales-t5.js, etc.
const fs = require('fs'), path = require('path'), Module = require('module');
const H = __dirname, ROOT = path.join(H, '..', '..');
const DRY = process.argv.includes('--dry');
const NORMAS = { sis: 'T5_SIS', vis: 'T5_VIS', cv: 'T5_CV', r977: 'T5_R977', eur: 'T5_EUR', aec: 'T5_AEC' };
const SUF = ['bis', 'ter', 'quater', 'quinquies', 'sexies', 'septies', 'octies', 'nonies', 'decies', 'undecies', 'duodecies', 'terdecies', 'quaterdecies', 'quindecies', 'sexdecies', 'septdecies', 'octodecies', 'novodecies', 'vicies', 'unvicies', 'duovicies', 'tervicies'];

// ---- 1. preguntas IA (de los bloques b01…b22) ----
const orig = Module._load; const caps = [];
Module._load = function (req, ...r) { if (/preguntas-t5-lib/.test(req)) return { run: o => caps.push(o) }; return orig.call(this, req, ...r); };
for (let i = 1; i <= 22; i++) require(path.join(H, 'preguntas-t5-b' + String(i).padStart(2, '0') + '.js'));
Module._load = orig;
const items = [];
caps.forEach(c => c.Q.forEach(q => items.push({ k: q.k, r: q.r, a: q.a, t: q.t, ans: q.o[0], p: q.p || '', ia: true, e: q.e })));

// ---- 2. preguntas oficiales con cita ----
const t5 = JSON.parse(fs.readFileSync(process.argv.find(a => a.endsWith('.json')) || path.join(process.env.T5JSON || '', 't5.json'), 'utf8'));
const normaDe = s => /2018\/1861/.test(s) ? 'sis' : /767\/2008/.test(s) ? 'vis' : /810\/2009/.test(s) ? 'cv' : /977\/2011/.test(s) ? 'r977' : /2024\/1358|603\/2013/.test(s) ? 'eur' : /AEC\/240/.test(s) ? 'aec' : null;
const strip = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim();
t5.filter(q => !/-ia-/.test(q.id)).forEach(q => {
  const rn = (q.explicacion.match(/<span class="ref-norma">([\s\S]*?)<\/span>/) || [])[1]; const rc = (q.explicacion.match(/<span class="ref-concepto">([\s\S]*?)<\/span>/) || [])[1];
  if (!rn || !rc) return; const k = normaDe(q.apartado || '') || normaDe(rn); if (!k) return;
  const a = strip(rn).replace(/ del .*$|\s+de la .*$/i, '').replace(/^arts?\.\s*/i, 'art. ');
  items.push({ k, r: null, a, t: strip(rc).replace(/^["“]|["”]$/g, ''), ans: q.opciones[q.correcta], p: '', ia: false, id: q.id });
});

// ---- 3. clave de artículo y apartados ----
function clave(a) {
  a = (a || '').trim();
  let m = /^considerandos?\s+(\d+)/i.exec(a); if (m) return { sec: 0, base: +m[1], suf: 0, ap: [], etiq: 'Considerando ' + m[1], cons: +m[1] };
  if (/^disp/i.test(a)) return { sec: 2, base: 0, suf: 0, ap: [], etiq: 'Disposición final única' };
  if (/^anexo/i.test(a)) return { sec: 3, base: 0, suf: 0, ap: [], etiq: 'Anexo I' };
  m = new RegExp('^arts?\\.?\\s*(\\d+)(?:\\s+(' + SUF.join('|') + ')(?:\\s+(bis|ter))?)?(?:[.,\\s]+(.*))?$', 'i').exec(a);
  if (!m) return { sec: 1, base: 999, suf: 0, ap: [a], etiq: a };
  const s1 = m[2] ? SUF.indexOf(m[2].toLowerCase()) + 2 : 0, s2 = m[3] ? SUF.indexOf(m[3].toLowerCase()) + 2 : 0;
  const ap = (m[4] || '').replace(/^apartados?\s*/i, '').split(/[.,\s]+|\by\b/).filter(Boolean);
  return { sec: 1, base: +m[1], suf: s1 * 10 + s2, ap, etiq: m[1] + (m[2] ? ' ' + m[2].toLowerCase() : '') + (m[3] ? ' ' + m[3].toLowerCase() : ''), ap0: ap.join('.') };
}
const cmpAp = (x, y) => { for (let i = 0; i < Math.max(x.length, y.length); i++) { const a = x[i], b = y[i]; if (a === undefined) return -1; if (b === undefined) return 1; const na = /^\d+$/.test(a), nb = /^\d+$/.test(b); if (na && nb) { if (+a !== +b) return +a - +b; } else if (a !== b) return a < b ? -1 : 1; } return 0; };

// ---- 4. agrupar por norma y artículo ----
const grupos = {};
items.forEach(it => {
  const c = clave(it.a); const g = (grupos[it.k] = grupos[it.k] || {});
  const key = [c.sec, c.base, c.suf].join('|');
  const f = (g[key] = g[key] || { c, items: [], titulos: {} });
  f.items.push({ ...it, ap: c.ap }); if (it.r) f.titulos[it.r] = (f.titulos[it.r] || 0) + 1;
});

// títulos de las fichas del esquema anterior del Tema 5 (para los artículos que solo tienen preguntas oficiales)
let html = fs.readFileSync(path.join(ROOT, 'esquemas.html'), 'utf8');
const viejo = JSON.parse(fs.readFileSync(path.join(ROOT, 'prompts', 'temario-limpio', 'tema5', 'titulos-antiguos.json'), 'utf8'));
// ---- 5. utilidades de texto ----
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim();
function limpiaCita(t) { return t.replace(/­\s*/g, '').replace(/cve: BOE-A-[\d-]+ BOLETÍN OFICIAL DEL ESTADO Núm\.?(?: \d+)?/g, ' ').replace(/\s+/g, ' ').replace(/^["“]+|["”]+$/g, '').trim(); }
function parrafo(it, texto) {
  let t = limpiaCita(texto); const sinInicio = /^[a-záéíóúñ]/.test(t) && !/^[a-z]\)/.test(t), sinFin = !/[.;:)»"]$/.test(t);
  return (sinInicio ? '(…) ' : '') + t + (sinFin ? ' (…)' : '');
}
// marca (m-resp) la ventana de la cita que mejor coincide con la respuesta correcta
function marcaResp(texto, ans) {
  const a = norm(ans).split(' ').filter(w => w.length > 1 || /\d/.test(w)); if (!a.length) return { html: esc(texto), ok: false };
  const aset = new Set(a); const pal = []; const re = /\S+/g; let m;
  while ((m = re.exec(texto))) pal.push({ w: norm(m[0]), i: m.index, f: m.index + m[0].length });
  let best = null;
  for (let i = 0; i < pal.length; i++) for (let j = i; j < Math.min(pal.length, i + Math.ceil(a.length * 1.6) + 2); j++) {
    const w = pal.slice(i, j + 1).map(x => x.w).join(' ').split(' ').filter(Boolean); if (!pal[i].w || !pal[j].w) continue;
    const hit = w.filter(x => aset.has(x)).length; if (!hit || !aset.has(pal[i].w.split(' ')[0]) || !aset.has(pal[j].w.split(' ').pop())) continue;
    const prec = hit / w.length, rec = new Set(w.filter(x => aset.has(x))).size / aset.size, f1 = 2 * prec * rec / (prec + rec || 1);
    if (!best || f1 > best.f1) best = { f1, i, j };
  }
  if (!best || best.f1 < 0.5 || (a.length >= 4 && best.f1 < 0.6)) return { html: esc(texto), ok: false };
  const x0 = pal[best.i].i, x1 = pal[best.j].f;
  return { html: esc(texto.slice(0, x0)) + '<mark class="m-resp">' + esc(texto.slice(x0, x1)) + '</mark>' + esc(texto.slice(x1)), ok: true, txt: texto.slice(x0, x1) };
}

// «Cifras que se confunden» automáticas
const CIF = /\d+(?:[.,]\d+)?\s*(?:horas?|días?(?:\s+(?:hábiles|naturales|laborables))?|meses|años|semanas|EUR|euros|minutos?|metros|%)|una hora|un año|un mes|dos años|tres años|cuatro años|cinco años|diez años|seis años|catorce años|dos veces al año|una vez al año|cada dos años|cada cuatro años|cada tres años|anualmente|mensual/gi;
function cifras(f) {
  const out = []; const vistos = new Set();
  for (const it of f.items) {
    if (!it.ia || !it.o) continue;
  }
  return out;
}

// ---- 6. generar ----
const SIDE = {}; const lineasPorNorma = {}; let nFichas = 0, nResp = 0, nCif = 0;
for (const [k, mk] of Object.entries(NORMAS)) {
  const g = grupos[k] || {}; const L = [];
  const claves = Object.values(g).sort((x, y) => x.c.sec - y.c.sec || x.c.base - y.c.base || x.c.suf - y.c.suf);
  // considerandos en una sola ficha
  const cons = claves.filter(f => f.c.sec === 0); const resto = claves.filter(f => f.c.sec !== 0);
  const fichas = [];
  if (cons.length) fichas.push({ c: { sec: 0, base: 0, suf: 0, etiq: 'Considerandos' }, items: cons.flatMap(f => f.items.map(i => ({ ...i, ap: ['(' + f.c.cons + ')'] }))), titulos: {}, cons: cons.map(f => f.c.cons) });
  fichas.push(...resto);
  for (const f of fichas) {
    f.items.sort((x, y) => cmpAp(x.ap, y.ap));
    // unir citas: quitar duplicadas y contenidas en otra
    const lista = [];
    for (const it of f.items) {
      const t = limpiaCita(it.t); const nt = norm(t); if (nt.length < 8) continue;
      const dup = lista.find(l => norm(l.t).includes(nt)); if (dup) { dup.ans.push(it.ans); dup.ia = dup.ia || it.ia; dup.p += ' ' + it.p; dup.of = dup.of || !it.ia; continue; }
      const ya = lista.findIndex(l => nt.includes(norm(l.t))); if (ya >= 0) { const o = lista[ya]; lista[ya] = { ...it, t, ans: [...o.ans, it.ans], of: o.of || !it.ia, p: (o.p || '') + ' ' + it.p }; continue; }
      lista.push({ ...it, t, ans: [it.ans], of: !it.ia });
    }
    // fusiona citas que se solapan (el final de una = el principio de la siguiente)
    for (let ch = true; ch;) { ch = false;
      for (let x = 0; x < lista.length && !ch; x++) for (let y = 0; y < lista.length && !ch; y++) { if (x === y) continue;
        const A = lista[x].t.split(' '), B = lista[y].t.split(' ');
        for (let n = Math.min(A.length, B.length, 40); n >= 5; n--) { if (norm(A.slice(-n).join(' ')) === norm(B.slice(0, n).join(' '))) { lista[x] = { ...lista[x], t: A.concat(B.slice(n)).join(' '), ans: [...lista[x].ans, ...lista[y].ans], of: lista[x].of || lista[y].of, p: lista[x].p + ' ' + lista[y].p }; lista.splice(y, 1); ch = true; break; } } } }
    // título
    const tit = Object.entries(f.titulos).sort((a, b) => b[1] - a[1])[0];
    const base = f.c.sec === 1 ? 'Artículo ' + f.c.etiq : f.c.etiq + (f.cons ? ' ' + f.cons.join(', ') : '');
    const clv = f.c.sec === 1 ? f.c.etiq.toLowerCase() : '';
    const TIT = { 'vis|5': 'Categorías de datos', 'vis|9': 'Datos que se introducirán con motivo de la solicitud', 'vis|12': 'Datos que se añadirán en caso de denegación del visado', 'vis|27': 'Ubicación del Sistema de Información de Visados central', 'cv|11': 'Impreso de solicitud', 'cv|39': 'Conducta del personal', 'cv|43': 'Cooperación con proveedores de servicios externos', 'cv|45': 'Cooperación de los Estados miembros con los intermediarios comerciales', 'eur|17': 'Registro de datos de los solicitantes de protección internacional', 'r977|1': 'Menciones «VIS» y «VIS 0» en la etiqueta de visado', 'r977|2': 'Entrada en vigor, aplicación y expiración' };
    let titulo = (k === 'r977' && TIT[k + '|' + clv]) || (tit ? tit[0] : (TIT[k + '|' + clv] || viejo[mk + '|' + clv] || ''));
    if (titulo.startsWith(base)) titulo = titulo.slice(base.length).replace(/^[.\s—-]+/, '');
    if (k === 'aec' && f.c.sec === 3) titulo = 'Fichero VIS-Nacional (finalidad, datos, cesiones, responsable y seguridad)';
    const cab = titulo ? base + ' — ' + titulo : base;
    const ps = []; const resps = []; let ex = false; const side = [];
    for (const l of lista) {
      const texto = parrafo(l, l.t); let h = esc(texto), ok = false;
      for (const an of l.ans) { if (!an) continue; const r = marcaResp(texto, an); if (r.ok) { h = r.html; ok = true; if (resps.length < 4 && r.txt.length <= 110 && !resps.includes(r.txt) && (r.txt.match(/\(/g) || []).length === (r.txt.match(/\)/g) || []).length) resps.push(r.txt); break; } }
      if (ok) nResp++;
      const ap = l.ap && l.ap.length ? (f.cons ? l.ap[0] : l.ap.join('.') + (l.ap.length > 1 && /^[a-z]$/.test(l.ap[l.ap.length - 1]) ? ')' : '')) : '';
      side.push({ of: !!l.of && !lista.some(z => z === l && z.ia), ia: !!l.ia });
      ps.push('<p>' + (ap ? '<b>' + ap + '</b> ' : '') + h + '</p>');
      if (l.of || /marca EX|EXAMEN|EXOF/.test(l.p)) ex = true;
    }
    if (k === 'cv' && f.c.sec === 1 && f.c.base >= 9 && !L.some(x => /T5_CV2/.test(x)) && L.length) L[L.length - 1] += ' /* T5_CV2 */';   // desde el art. 9 el texto sale del libro resumen (págs. 28-36)
    L.push('  + articuloResp(' + JSON.stringify(cab) + ', ' + JSON.stringify(resps.map(x => x.replace(/^\W+|\W+$/g, ''))) + ', ' + JSON.stringify(ps.join('')) + (ex ? ', true' : '') + ')');
    SIDE[mk + '|' + cab] = side; nFichas++;
  }
  lineasPorNorma[mk] = L;
}

// ---- 7. escribir en esquemas.html ----
const lines = html.split('\n'); const out = []; let i = 0, cambiado = 0;
const reIni = /^\/\* (T5_[A-Z0-9]+) \*\/ T5\./;
while (i < lines.length) {
  const m = reIni.exec(lines[i]);
  if (m && lineasPorNorma[m[1]]) {
    out.push(lines[i]); i++;
    while (i < lines.length && !/^\/\* T5_/.test(lines[i])) i++;      // salta las fichas antiguas
    const L = lineasPorNorma[m[1]]; L[L.length - 1] += ';'; out.push(...L); cambiado++; continue;
  }
  out.push(lines[i]); i++;
}
console.log('fichas', nFichas, '· con respuesta marcada', nResp, '· normas reescritas', cambiado);
for (const [mk, L] of Object.entries(lineasPorNorma)) console.log(mk, L.length, 'fichas');
if (!DRY) {
  fs.writeFileSync(path.join(ROOT, 'esquemas.html'), out.join('\n'));
  fs.writeFileSync(path.join(ROOT, 'prompts', 'temario-limpio', 'tema5', 't5-parrafos.json'), JSON.stringify(SIDE));   // origen de cada párrafo (IA / solo oficial), para podar lo no subrayado
}
