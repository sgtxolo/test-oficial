// Genera expres-subrayado/datos-tN.js (recortes, mapa pregunta→recorte, reglas de cita, marcas EXOF/EX/✱/R)
// y expres-subrayado/cuadros-tN.js (los cuadros/esquemas visuales de Esquemas asociados a cada artículo).
// Uso: node prompts/herramientas/expres-subrayado-datos.js 7 "Tema 7 · Derechos y deberes fundamentales"
const fs = require('fs'); const T = process.argv[2], titulo = process.argv[3];
const dir = `expres-subrayado/img/t${T}/`; const ix = JSON.parse(fs.readFileSync(dir + 'indice.json', 'utf8'));
const inst = JSON.parse(fs.readFileSync(`expres-subrayado/t${T}-instrumentos.json`, 'utf8'));
const manP = `expres-subrayado/t${T}-manual.json`; const man = fs.existsSync(manP) ? JSON.parse(fs.readFileSync(manP, 'utf8')) : { manual: [] };
const manEx = new Set((man.manual || []).filter(m => m.expres).map(m => m.id));
const orden = id => {
  const [l, n] = id.split('-'); const i = inst.findIndex(x => x.id === l);
  const r = n === 'datos' ? -2 : n === 'pre' ? -1 : n === 'ad' ? 0 : n === 'fin' ? 1e6 : (+n || 0);
  return (i < 0 ? 99 : i) * 1e7 + r;
};
ix.sort((x, y) => orden(x.id) - orden(y.id));
function numeros(t) {
  const s = t.replace(/^Art[íi]culos?\s+/i, '').split(/\s+—\s+/)[0]; const out = new Set();
  for (const m of s.matchAll(/(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)/gi)) for (let n = +m[1]; n <= +m[2]; n++) out.add(n);
  for (const m of s.replace(/(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)/gi, '').matchAll(/\d+/g)) out.add(+m[0]);
  return [...out];
}
global.window = {}; require('../../expres/t' + T + '.js'); const h = window.EXPRES_T[T].html;
const ids = new Set(ix.map(p => p.id)), preg = {}, enEx = new Set(), marcas = {}, fichas = []; let cur = null, ixCur = -1, fi = -1; const fx = {};
const limpia = t => t.replace(/\s*(EXOF|EX|✱|R\d+)(?![\wÁ-ú])/g, '').replace(/\s*[·.]\s*$/, '').replace(/\s+/g, ' ').trim();
const trozos = h.split(/(?=<div class="bloque-titulo">|<div class="ex-ficha(?: ex-of)?">)/);
for (const f of trozos) {
  const t = ((f.match(/(?:ex-fh|bloque-titulo)">(.*?)<\/div>/) || [])[1] || '').replace(/<[^>]+>/g, '');
  if (/^ANEXO/.test(t)) break;
  const k = inst.findIndex((i, j) => j > ixCur && i.inicio && new RegExp(i.inicio).test(t)); if (k >= 0) { ixCur = k; cur = inst[k].id; }
  if (!/^<div class="ex-ficha(?: ex-of)?">/.test(f)) continue;
  fi++;                                   // nº de ficha dentro del Exprés (para sacar su texto al imprimir)
  if (!cur) continue;
  const num = numeros(t); fichas.push({ t: limpia(t), cur, num });
  if (!/^Art[íi]culos?\s+\d/i.test(t)) continue;
  const piezas = num.map(n => cur + '-' + n).filter(p => ids.has(p)); piezas.forEach(p => enEx.add(p));
  if (!piezas.length) continue;
  // marcas del temario: EXOF (examen oficial), EX (examen), ✱ (asterisco de la academia), R<n> (ficha «Recuerda»)
  // Misma regla que Esquemas, párrafo a párrafo: EXOF = data-ex EXOF; EX = data-ex EX (o «1») o el párrafo lleva una pregunta oficial de la app (id sin «-ia-») y no es EXOF;
  // ✱ = data-ex «*»; R<n> = data-r del párrafo o del título. La ficha enseña la unión de los sellos de sus párrafos.
  // Fichas con VARIOS artículos («Artículos 11, 12 y 13»): cada párrafo pertenece al artículo de su último «Art. N»; así cada pieza lleva solo lo suyo
  // (sus marcas y sus preguntas) y al imprimir el Exprés sale solo su parte.
  let art = null; const pars = [...f.matchAll(/<p((?:\s[^>]*)?)>([\s\S]*?)<\/p>/g)].map(pm => { const m = pm[2].match(/^\s*(?:<span[^>]*>[^<]*<\/span>\s*)*<b>Art\.\s*(\d+)/); if (m) art = +m[1]; return {pm, art}; });
  const porArt = {}; pars.forEach(x => { if (x.art !== null) (porArt[x.art] = porArt[x.art] || []).push(x.pm); });
  const hayPorArt = num.length > 1 && num.filter(n => porArt[n]).length >= 2;
  const marcasDe = (lista, conTitulo) => {
    const mk = {}, rs = conTitulo ? [...t.matchAll(/\bR(\d+)\b/g)].map(m => +m[1]) : [];
    if (conTitulo) { if (/\bEXOF\b/.test(t)) mk.exof = 1; if (/✱/.test(t)) mk.ast = 1; }
    for (const pm of lista) {
      const at = pm[1], mx = ((at.match(/data-ex="([^"]*)"/) || [])[1] || '').split(',').filter(Boolean);
      const ofic = [...pm[2].matchAll(/data-q="([^"]+)"/g)].flatMap(x => x[1].split(/[ ,;|]+/)).some(q => q && !/-ia-/.test(q));
      if (mx.includes('EXOF')) mk.exof = 1; else if (mx.includes('EX') || mx.includes('1') || ofic) mk.ex = 1;
      if (mx.includes('*')) mk.ast = 1;
      ((at.match(/data-r="([^"]*)"/) || [])[1] || '').split(',').forEach(r => { const n = +(r.match(/\d+/) || [0])[0]; if (n) rs.push(n); });
    }
    if (rs.length) mk.r = [...new Set(rs)].sort((a, b) => a - b);
    return mk;
  };
  const rsTit = [...t.matchAll(/\bR(\d+)\b/g)].map(m => +m[1]), hayRp = pars.some(x => /data-r=/.test(x.pm[1]));
  piezas.forEach(p => {
    const n = +p.split('-')[1], propia = hayPorArt && porArt[n]; marcas[p] = marcasDe(propia ? propia : pars.map(x => x.pm), !propia); fx[p] = fi;
    if (propia && !hayRp && p === piezas[0] && rsTit.length) marcas[p].r = [...new Set([...(marcas[p].r || []), ...rsTit])].sort((a, b) => a - b);   // ficha R del título sin párrafo concreto: va al primer artículo
  });
  if (hayPorArt) pars.forEach(x => { const pz = x.art !== null && piezas.includes(cur + '-' + x.art) ? cur + '-' + x.art : null; if (pz) for (const m of x.pm[2].matchAll(/data-q="([^"]+)"/g)) m[1].split(/[ ,;|]+/).forEach(q => { if (q && !preg[q]) preg[q] = pz; }); });
  for (const m of f.matchAll(/data-q="([^"]+)"/g)) m[1].split(/[ ,;|]+/).forEach(q => { if (!preg[q]) preg[q] = piezas[0]; });
}
ix.forEach(p => { if (!enEx.has(p.id) && !manEx.has(p.id) && !/^r-/.test(p.id)) p.extra = 1; if (marcas[p.id] && Object.keys(marcas[p.id]).length) p.m = marcas[p.id]; });
// piezas a mano (preámbulos, protocolos…) con «ficha»: regex del título de su ficha del Exprés → también tienen versión Exprés
{ const cab = h.split('<div class="ex-ficha">').slice(1).map(f => ((f.match(/class="ex-fh">(.*?)<\/div>/) || [])[1] || '').replace(/<[^>]+>/g, ''));
  (man.manual || []).filter(m => m.ficha).forEach(m => { const k = cab.findIndex(t => new RegExp(m.ficha).test(t)); if (k >= 0) fx[m.id] = k; else console.log('  ⚠ ficha no encontrada', m.id, m.ficha); }); }
ix.forEach(p => { if (fx[p.id] !== undefined) p.fx = fx[p.id]; });
// preguntas que Esquemas sitúa en una ficha «Artículo N» / «Apartado N» que el Exprés no enlaza: van a la pieza de ese número si es la única (Exprés o fuera del Exprés)
try {
  const X = require('./expres-lib.js')(+T), MP = JSON.parse(fs.readFileSync('esquemas.html', 'utf8').match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
  const cand = {}; for (const p of ix) { const m = p.id.match(/^[a-z]+-(\d+)$/); if (m) { const k0 = (/Apartado/.test(p.nombre) ? 'ap' : 'art') + m[1]; (cand[k0] = cand[k0] || []).push(p.id); } }
  let nuevas = 0;
  for (const [q, anc] of Object.entries(MP)) {
    if (!q.startsWith(T + '-') || preg[q]) continue;
    const f = X.fichas[+anc.split('-')[1]]; if (!f) continue;
    const cabf = f.cab.replace(/<[^>]+>/g, ''), m = cabf.match(/^(?:Art[íi]culo|Apartado)\s+(\d+)\s+—/);
    const kk = (/^Apartado/.test(cabf) ? 'ap' : 'art') + (m ? m[1] : ''); if (m && cand[kk] && cand[kk].length === 1) { preg[q] = cand[kk][0]; nuevas++; }
  }
  // las que Esquemas deja en un RECUERDA o sin ficha: si el tema tiene UNA sola norma con artículos y la explicación cita «artículo N», a esa pieza
  if (inst.filter(i => i.paginas).length === 1) {
    const th = fs.readFileSync('test-oficial-conocimiento.html', 'utf8'), RQ = new RegExp('\\{"id":"(' + T + '-[^"]+)","pregunta":"(?:[^"\\\\]|\\\\.)*","opciones"[\\s\\S]{0,3000}?"explicacion":"((?:[^"\\\\]|\\\\.)*)"', 'g');
    for (const mm of th.matchAll(RQ)) {
      const q = mm[1]; if (preg[q]) continue;
      const ns = [...new Set([...mm[2].replace(/<[^>]+>/g, ' ').matchAll(/\bart(?:ículo|\.)\s*(\d+)(?!\d)([^.;]{0,50})/gi)].filter(x => new RegExp(inst.find(i => i.paginas).cit, 'i').test(x[2]) || !/Constituci|\bCE\b|\bLey\b|C[óo]digo|Tratado|Reglamento|Real Decreto|LECrim|\bLO\b|Directiva/.test(x[2])).map(x => x[1]))];
      if (ns.length === 1 && cand['art' + ns[0]] && cand['art' + ns[0]].length === 1) { preg[q] = cand['art' + ns[0]][0]; nuevas++; }
    }
  }
  if (nuevas) console.log('  preguntas enlazadas desde Esquemas por número de artículo/apartado:', nuevas);
} catch (er) { console.log('  (sin enlace por ficha de Esquemas:', er.message + ')'); }
// primera pregunta de cada artículo: sirve para saltar desde aquí a la ficha de Esquemas (esquemas.html#q=<id>&ex=1)
const primera = {}; for (const q in preg) if (!primera[preg[q]]) primera[preg[q]] = q; ix.forEach(p => { if (primera[p.id]) p.q1 = primera[p.id]; });
// ---- cuadros (esquemas visuales) de visuales-tN.js, tomados ya montados de esquemas.html ----
const cuadros = {}, sinPieza = [];
const mapP = `expres-subrayado/t${T}-cuadros-map.json`; const cmap = fs.existsSync(mapP) ? JSON.parse(fs.readFileSync(mapP, 'utf8')) : {};   // {«despues» o «título del cuadro»: pieza} para los que no se deducen solos
const visP = [`prompts/herramientas/visuales-t${T}.js`, `prompts/herramientas/tema${T}/visuales-t${T}.js`].find(f => fs.existsSync(f)) || `prompts/herramientas/visuales-t${T}.js`;
if (fs.existsSync(visP)) {
  const src = fs.readFileSync(visP, 'utf8'), esq = fs.readFileSync('esquemas.html', 'utf8');
  const rx = /^\s*v\('((?:[^'\\]|\\.)*)',\s*(?:\w+\()+'((?:[^'\\]|\\.)*)'/gm;
  for (const m of src.matchAll(rx)) {
    const despues = m[1].replace(/\\'/g, "'"), tit = m[2].replace(/\\'/g, "'");
    const esc = s => s.replace(/"/g, '\\"');
    const pos = esq.indexOf('</i>' + esc(tit)); if (pos < 0) { sinPieza.push('NO ENCONTRADO en esquemas.html: ' + tit); continue; }
    const ini = esq.lastIndexOf('<div class=\\"vis\\">', pos); let d = 0, i = ini, fin = -1;
    while (ini >= 0 && i < esq.length) { const a = esq.indexOf('<div', i), b = esq.indexOf('</div>', i); if (b < 0) break; if (a >= 0 && a < b) { d++; i = a + 4; } else { d--; i = b + 6; if (d === 0) { fin = i; break; } } }
    if (ini < 0 || fin < 0) { sinPieza.push('BLOQUE SIN CERRAR: ' + tit); continue; }
    const html = new Function('return "' + esq.slice(ini, fin) + '"')();
    // a qué artículo va: la ficha del Exprés cuyo título coincide con «despues»; si no está en el Exprés, por el número y la norma
    const dl = despues.replace(/\s+/g, ' ').trim(); const f = fichas.find(x => x.t === dl) || fichas.find(x => x.t.startsWith(dl)) || fichas.find(x => dl.startsWith(x.t) && x.t.length > 12);
    let pid = cmap[despues] || cmap[tit] || null;
    if (pid) {} else if (f) pid = f.cur + '-' + f.num[0];
    else { const n = (dl.match(/^Art[íi]culo\s+(\d+)/i) || [])[1]; const lg = inst.find(i => i.ley_re && new RegExp(i.ley_re, 'i').test(dl + ' ' + tit)) || inst.find(i => !i.ley_re && ids.has(i.id + '-' + n)); if (n && lg) pid = lg.id + '-' + n; }
    if (!pid || !ids.has(pid)) { sinPieza.push(`SIN ARTÍCULO (${pid || '?'}) «${despues}» → ${tit}`); continue; }
    (cuadros[pid] = cuadros[pid] || []).push({ t: tit, h: html });
  }
}
ix.forEach(p => { if (cuadros[p.id]) p.cu = cuadros[p.id].length; });
// cobertura: cuántas preguntas del banco del tema tendrán botón «Ver en mi temario subrayado»
let cob = { q: 0, e: 0 };
try {
  const th = fs.readFileSync('test-oficial-conocimiento.html', 'utf8'), i0 = th.indexOf('window.piezaSubrayado = function'), i1 = th.indexOf('\n  };\n', i0);
  const S = { piezas: ix, preg, cit: inst.map(i => ({ p: i.id, nombre: i.nombre, re: i.cit, pre: i.pre || null, pre_re: i.pre_re || null, proto: i.proto ? 1 : 0 })) };
  const hw = {}; new Function('window', th.slice(i0, i1 + 5))(hw);
  const RQ = new RegExp('\\{"id":"(' + T + '-[^"]+)","pregunta":"((?:[^"\\\\]|\\\\.)*)","opciones"[\\s\\S]{0,3000}?"explicacion":"((?:[^"\\\\]|\\\\.)*)"', 'g');
  const seen = {}; for (const m of th.matchAll(RQ)) seen[m[1]] = m[3].replace(/\\"/g, '"');
  for (const [id, e] of Object.entries(seen)) { cob.q++; if (hw.piezaSubrayado(S, id, e)) cob.e++; }
} catch (er) { console.log('  (sin cobertura de preguntas:', er.message + ')'); }
const cit = inst.map(i => ({ p: i.id, nombre: i.nombre, re: i.cit, pre: i.pre || null, pre_re: i.pre_re || null, proto: i.proto ? 1 : 0 }));
fs.writeFileSync(`expres-subrayado/datos-t${T}.js`, `(window.EXSUB=window.EXSUB||{})[${T}]=` + JSON.stringify({ titulo, dir, piezas: ix, preg, cit, cob }) + ';');
fs.writeFileSync(`expres-subrayado/cuadros-t${T}.js`, `(window.EXSUB_C=window.EXSUB_C||{})[${T}]=` + JSON.stringify(cuadros) + ';');
console.log('preguntas con botón:', cob.e + '/' + cob.q);
console.log(ix.length, 'recortes (' + ix.filter(p => p.extra).length + ' fuera del Exprés),', Object.keys(preg).length, 'preguntas enlazadas,', ix.filter(p => p.m).length, 'con marcas,', Object.values(cuadros).reduce((s, a) => s + a.length, 0), 'cuadros en', Object.keys(cuadros).length, 'artículos');
sinPieza.forEach(s => console.log('  ⚠', s));
