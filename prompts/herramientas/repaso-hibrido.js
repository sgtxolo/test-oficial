// Monta repaso-tN-borrador.html (Esquema clave de ~10-12 págs) desde el Exprés del tema (expres/tN.js): fichas con tu subrayado + cuadros (vis).
// Orden = el del Exprés; los títulos (bloque-titulo) pasan a ser h2. Criterio: EXOF, fichas R, preguntas OFICIALES enlazadas (+ ✱); por presupuesto.
// Uso: node prompts/herramientas/repaso-hibrido.js N [presupuestoCaracteres=17000] [pesoCuadro=1500]
// Formato (plantilla de cabecera/editor): repaso-t2-borrador.html. Medir páginas SIEMPRE con Chrome headless --print-to-pdf.
const fs = require('fs'), crypto = require('crypto');
const R = 'C:/Users/ruben/Desktop/HTML OFICIAL/';
const N = +process.argv[2], PRES = +(process.argv[3] || 17000), PESOVIS = +(process.argv[4] || 1500), LARGA = 2800;
if (!N) { console.log('Uso: node prompts/herramientas/repaso-hibrido.js N [presupuesto] [pesoCuadro]'); process.exit(1); }
global.window = {}; eval(fs.readFileSync(R + 'expres/t' + N + '.js', 'utf8'));
const H = window.EXPRES_T[N].html;
const cierra = (s, from) => { let d = 0; const r = new RegExp('<div[ >]|</div>', 'g'); r.lastIndex = from; let x; while ((x = r.exec(s))) { d += x[0] === '</div>' ? -1 : 1; if (d === 0) return r.lastIndex; } return s.length; };
const plano = h => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
// ---- tokens en orden de documento: título, ficha, cuadro ----
const toks = [], re = /<div class="bloque-titulo">|<div class="ex-ficha">|<div class="vis">/g; let m, ult = 0;
while ((m = re.exec(H))) {
  if (m.index < ult) continue; const fin = cierra(H, m.index), blk = H.slice(m.index, fin); ult = fin;
  if (m[0].includes('bloque')) toks.push({ t: 'h', txt: plano(blk) });
  else if (m[0].includes('vis')) toks.push({ t: 'v', html: blk });
  else {
    const hd = blk.match(/<div class="ex-fh">([\s\S]*?)<\/div><div class="ex-fb">/); if (!hd) continue;
    const body = blk.slice(blk.indexOf('<div class="ex-fb">') + 19, blk.length - 12);
    const qs = new Set(); [...body.matchAll(/data-q="([^"]+)"/g)].forEach(x => x[1].split(',').forEach(q => qs.add(q)));
    const of = [...qs].filter(q => !/ia/.test(q)).length;
    toks.push({ t: 'f', hd: hd[1], body, exof: /EXOF/.test(hd[1]), ast: /✱/.test(hd[1]), r: [...hd[1].matchAll(/>R(\d+)</g)].length, of, len: plano(body).length });
  }
}
let PROP = null; try { PROP = require('./repaso-cuadros-t' + N + '.js'); } catch (e) {}
if (PROP) {
  for (let i = toks.length - 1; i >= 0; i--) if (toks[i].t === 'v') toks.splice(i, 1);
  PROP.cuadros.forEach(cu => { let j = toks.findIndex(k => k.t === 'f' && cu.antes.test(plano(k.hd).replace(/ (EXOF|✱|Rd+)/g, '').trim())); if (j < 0) { console.log('SIN ANCLA', cu.antes); j = toks.length; } else { while (j > 0 && toks[j - 1].t === 'h') j--; } toks.splice(j, 0, { t: 'v', html: cu.html, propio: 1 }); });
}
const esOf = ids => ids.split(',').some(q => !/ia/.test(q));
function limpia(b) {
  b = b.replace(/<span class="ex-plg"[^>]*><span class="ex-plg-t">([\s\S]*?)<\/span><\/span>/g, '$1');
  b = b.replace(/<mark class="m-resp[^"]*"[^>]*>🎯[^<]*<\/mark>/g, '');
  for (let i = 0; i < 3; i++) b = b.replace(/<mark class="m-resp[^"]*"[^>]*>([\s\S]*?)<\/mark>/g, '$1');
  b = b.replace(/<u class="m-clave">([\s\S]*?)<\/u>/g, '<mark class="k">$1</mark>')
    .replace(/class="m-personalizado"/g, 'class="y"').replace(/class="m-destacable"/g, 'class="d"').replace(/class="m-autoridad"/g, 'class="a"')
    .replace(/class="m-plazo"/g, 'class="p"').replace(/class="m-accion"/g, 'class="c"').replace(/<mark class="m-(circulo|caja)[^"]*">([\s\S]*?)<\/mark>/g, '$2')
    .replace(/<span class="ex-sello ex-sello-r">(R\d+)<\/span>/g, '<span class="b r">$1</span>')
    .replace(/<span class="ex-sello">EXOF<\/span>/g, '<span class="b of">EXOF</span>').replace(/<span class="ex-sello">✱<\/span>/g, '<span class="b ex">✱</span>')
    .replace(/ data-(ex|r)="[^"]*"/g, '').replace(/ style="[^"]*"/g, ' style="margin-left:14px"').replace(/<div class="ex-linea">/g, '<div class="lin">');
  return b.replace(/  +/g, ' ');
}
function recorta(f) {   // fichas largas: solo los párrafos con pregunta oficial, EXOF o R
  if (f.len <= LARGA) return { html: f.body, rec: false };
  const ps = f.body.match(/<(p|div)\b[^>]*>[\s\S]*?<\/\1>/g) || [f.body];
  const k = ps.filter(p => /data-ex=|data-r=/.test(p) || [...p.matchAll(/data-q="([^"]+)"[^>]*>🎯/g)].some(x => esOf(x[1])));
  return { html: (k.length ? k : ps.slice(0, 2)).join(''), rec: k.length < ps.length };
}
const score = f => f.exof * 5 + f.r * 3 + Math.min(f.of, 4) * 1.5 + (f.ast ? 1 : 0);
toks.forEach((k, i) => { k.i = i; if (k.t === 'f') { const r = recorta(k); k.rc = r.html; k.recortada = r.rec; k.vis = plano(r.html).length; k.score = score(k); } });
const esRec = k => /^RECUERDA del temario/.test(plano(k.hd));
const cand = toks.filter(k => k.t === 'f' && !esRec(k) && (k.of > 0 || k.exof || k.r));
let usado = 0; const sel = new Set();
// cuadros: todos entran con un peso fijo (son lo que más ayuda a estudiar); después fichas por puntuación/tamaño
toks.filter(k => k.t === 'v').forEach(k => { sel.add(k.i); usado += PESOVIS; });
cand.slice().sort((a, b) => b.score / Math.sqrt(b.vis + 200) - a.score / Math.sqrt(a.vis + 200)).forEach(f => { if (usado + f.vis <= PRES) { sel.add(f.i); usado += f.vis; } });
let body = '', hAct = '', hPend = false, nF = 0, nV = 0;
toks.forEach(k => {
  if (k.t === 'h') { hAct = k.txt; hPend = true; return; }
  if (!sel.has(k.i)) return;
  if (hPend) { body += '<h2>' + hAct + '</h2>'; hPend = false; }
  if (k.t === 'v') { body += '<div class="vis-wrap">' + k.html.split('>true<').join('>⇄<') + '</div>'; nV++; return; }
  nF++; body += '<div class="art' + (k.exof ? ' of' : '') + '"><h3>' + k.hd.replace(/ · R[0-9]+(?: R[0-9]+)*/g, '').replace(/<mark[^>]*>|<\/mark>|<u[^>]*>|<\/u>/g, '') + '</h3>' + limpia(k.rc) + (k.recortada ? '<p class="rec">(…) solo los apartados con pregunta, EXOF o ficha R</p>' : '') + '</div>\n';
});

// ---- AL FINAL, aparte del límite de páginas: R1…Rn (pregunta → respuesta) y preguntas rápidas de cada artículo (como en la app de Esquemas) ----
let extra = '', nR = 0, nQ = 0;
const lineasR = [];
toks.filter(k => k.t === 'f' && esRec(k)).forEach(k => { (k.body.match(/<p data-r="R\d+"[\s\S]*?<\/p>/g) || []).forEach(p => lineasR.push(p)); });
if (lineasR.length) {
  extra += '<div class="rr-wrap"><h2>RECUERDA del temario · fichas R (pregunta → respuesta)</h2>';
  lineasR.forEach(p => {
    let t = limpia(p).replace(/^<p>/, '').replace(/<\/p>$/, '').replace(/<span class="b r">(R\d+)<\/span> <b>R\d+<\/b>/, '<span class="b r">$1</span>');
    t = t.replace(/<b>→<\/b>\s*(?:<mark[^>]*>)?([\s\S]*)$/, (m, a) => '<b class="fl">→</b> <span class="rans">[ ' + a.replace(/<\/mark>\s*$/, '') + ' ]</span>');
    extra += '<div class="rline">' + t + '</div>'; nR++;
  });
  extra += '</div>';
}
let QQ = null; try { global.window = global.window || {}; eval(fs.readFileSync(R + 'expres/q' + N + '.js', 'utf8')); QQ = window.EXPRES_Q[N]; } catch (e) {}
if (QQ) {
  const nrm = x => String(x || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const MALA = /\b(?:son (?:correctas|incorrectas|falsas|verdaderas)|es (?:correcta|incorrecta)|anteriores|ninguna de (?:ellas|las)|todas (?:ellas|las)|ambas)\b|^(?:[a-d]\)?|[a-d] y [a-d]|[a-d], [a-d] y [a-d])$/i;
  const escoger = (qs, n) => { const vistos = new Set(); return qs.filter(([, q]) => !(q[2] & 2) && nrm(q[0]) !== nrm(q[1]) && nrm(q[1]).length > 1 && !MALA.test(q[1]) && !/^se[ñn]ale\b/i.test(q[0]) && q[0].length > 12)
    .sort((a, b) => (b[1][2] & 1) - (a[1][2] & 1) || a[1][0].length - b[1][0].length)
    .filter(([, q]) => { const kk = nrm(q[1]).slice(0, 40), kq = nrm(q[0]).slice(0, 60); if (vistos.has(kk) || vistos.has(kq)) return false; vistos.add(kk); vistos.add(kq); return true; }).slice(0, n); };
  const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let arts = '';
  toks.filter(k => k.t === 'f' && !esRec(k)).forEach(k => {
    const ids = [...new Set([...k.body.matchAll(/data-q="([^"]+)"/g)].flatMap(m => m[1].split(',')).filter(Boolean))];
    const qs = escoger(ids.map(id => [id, QQ[id]]).filter(x => x[1]), 3); if (!qs.length) return;
    arts += '<div class="rq-art"><div class="rq-a">' + plano(k.hd).replace(/ (EXOF|EX|✱|R\d+)\b/g, '').trim() + '</div><ol>' + qs.map(([, q]) => { nQ++; return '<li><span class="rq-q">' + (q[2] & 1 ? '<span class="rq-of">OF</span>' : '') + esc(q[0]).replace(/____/g, '____') + '</span> <span class="rq-r">' + esc(q[1]) + '</span></li>'; }).join('') + '</ol></div>';
  });
  extra += '<div class="rq-wrap"><div class="rq-h">✔ RECUERDA — preguntas rápidas del tema</div><div class="rq-sub">' + nQ + ' preguntas cortas con su respuesta, sacadas de las preguntas de test de cada artículo (<span class="rq-of">OF</span> = oficial).</div><div class="rq-cols">' + arts + '</div></div>';
}
if (!process.env.SIN_EXTRA) body += extra;
body = body.replace(/<span class="ex-sello ex-sello-r">(R\d+)<\/span>/g, '<span class="b r">$1</span>').replace(/<span class="ex-sello">EXOF<\/span>/g, '<span class="b of">EXOF</span>').replace(/<span class="ex-sello">✱<\/span>/g, '<span class="b ex">✱</span>');
for (let k = 0; k < 4; k++) body = body.replace(/<mark class="([a-z]+)">([^<]*)<\/mark>(\s*)<mark class="\1">/g, '<mark class="$1">$2$3');
const TIT = {2: 'Terrorismo y delincuencia transnacional', 3: 'Unión Europea (TUE y TFUE)', 20: 'Derecho Procesal Penal (I)', 21: 'Derecho Procesal Penal (II)'}[N] || ((window.EXPRES_T[N].titulo) || '');
// ---- plantilla: cabecera, editor, tema claro/oscuro y móvil de repaso-t2-borrador.html ----
const T2 = fs.readFileSync(R + 'repaso-t2-borrador.html', 'utf8');
const iH1 = T2.indexOf('<h1>'), iRc = T2.indexOf('<div id="rc"'), iPie = T2.indexOf('</div>\n<p class="pie">');
const CSS = '.lin{margin:2px 0}.rec{color:var(--gris);font-size:.85em;margin:2px 0}/*aireado*/.art{margin:0 0 20px;padding:10px 14px 8px;border:1px solid var(--linea);border-left:4px solid var(--linea);border-radius:10px;background:rgba(127,127,127,.05)}.art.of{border-left-color:var(--of)}'
  + '.art p{margin:0 0 14px;line-height:1.8}.art h3{margin:0 0 10px;font-size:1.08em}.art p:last-child{margin-bottom:2px}.art li{margin:0 0 6px;line-height:1.7}h2{margin:32px 0 14px}.vis-wrap{margin:14px 0 20px}'
  + '@media print{.art{margin:0 0 9px;padding:5px 9px}.art p{margin:0 0 5px;line-height:1.45}.art li{margin:0 0 3px;line-height:1.4}h2{margin:12px 0 7px}}';
const CSSR = '@media print{.rq-cols{column-count:2;column-gap:14px}.rq-wrap{font-size:9.5pt}.rr-wrap{font-size:10.5pt}.rq-art{margin:0 0 5px;padding:4px 8px}.rq-art li{margin:0 0 2px;line-height:1.35}.rline{margin:0 0 3px;line-height:1.4}}.rr-wrap{margin-top:26px;break-before:page}.rline{padding:5px 8px 5px 4px;margin:0 0 5px;border-radius:8px;line-height:1.55}.rline .b.r{margin:0 6px 0 0}.rline .fl{color:#2a9d6a}.rline .rans{font-weight:800;color:#1d3fa8}.rline .rans mark{background:transparent;color:inherit}.rq-wrap{margin-top:26px;border:2px solid #2a9d6a;border-radius:10px;background:rgba(42,157,106,.07);padding:12px 14px;break-before:page}.rq-h{font-weight:900;font-size:1.1em;color:#14532d;margin-bottom:4px}.rq-sub{font-size:.85em;color:var(--gris);margin-bottom:8px}.rq-art{background:var(--fondo);border-radius:10px;padding:7px 12px;margin:6px 0;break-inside:avoid}.rq-a{font-weight:800;color:#c8102e;font-size:.9em;text-transform:uppercase;margin-bottom:3px}.rq-art ol{margin:0;padding-left:20px}.rq-art li{margin:0 0 4px;line-height:1.5}.rq-r{font-weight:800;color:#1d3fa8}.rq-r::before{content:"→ ";color:#2a9d6a}.rq-of{display:inline-block;font-size:.7em;font-weight:900;border:1.5px solid #c0392b;color:#c0392b;border-radius:8px;padding:0 4px;margin-right:4px;vertical-align:1px}:root[data-theme="dark"] .rq-art{background:#1e2227}:root[data-theme="dark"] .rq-r,:root[data-theme="dark"] .rline .rans{color:#8fb0ff}';
const CSSESQ = ':root{--oro:#c9a227;--lin:#3b4a57;--caja:#fff;--fondo2:#faf6e6}:root[data-theme=\"dark\"]{--lin:#8aa0b2;--caja:#1e2227;--fondo2:#262a1c}.esq{margin:0 0 22px;break-inside:avoid;border:1px solid rgba(127,127,127,.35);border-radius:8px;overflow:hidden;background:var(--fondo)}.esq .ban{background:var(--oro);color:#fff;text-align:center;padding:7px 10px;font-weight:800}.esq .ban small{display:block;font-weight:500;font-size:.8em}.esq .cuerpo{padding:12px}.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}.g2s{display:grid;grid-template-columns:1fr 1fr;gap:10px}.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.esq .caja{border:1.5px solid var(--lin);background:var(--caja);padding:6px 9px;margin:0 0 5px;line-height:1.5}.esq .caja ul{margin:3px 0 0}.esq .cen{text-align:center}.esq .tit{font-weight:800;text-align:center}.esq .pie{background:var(--fondo2);padding:6px 10px;margin:4px 0}.esq .fl{text-align:center;color:var(--oro);font-size:15px;line-height:1.1;margin:2px 0 3px}.esq .rama{border-top:2px solid var(--oro);padding-top:14px;position:relative}.esq .rama::before{content:\"▼\";position:absolute;top:-2px;left:50%;transform:translateX(-50%);color:var(--oro);font-size:12px;line-height:1;background:var(--fondo)}.esq .bif{display:grid;gap:10px;margin-top:2px}.esq .pill{display:inline-block;padding:1px 9px;border-radius:4px;font-weight:800}.esq .hd{background:var(--fondo2);padding:4px 8px;font-weight:800;text-align:center;margin:0 0 6px}.esq .nota{font-size:.82em;color:var(--gris)}.esq .x{color:#1f6f6a;font-weight:900}.esq .ex{display:inline-block;border:1.5px solid #1d4ed8;color:#1d4ed8;border-radius:10px;padding:0 6px;font-size:.78em;font-weight:700}.esq .man{font-family:\"Segoe Print\",\"Bradley Hand\",cursive;color:#2d3a9a;font-size:.88em}.esq .tab2{display:grid;grid-template-columns:1fr 1fr;border:1.5px solid var(--lin)}.esq .tab2 .th{background:var(--oro);color:#fff;text-align:center;font-weight:800;padding:5px}.esq .tab2 .td{padding:6px 9px;border-top:1px solid rgba(127,127,127,.4);line-height:1.5}.esq .tab2 .td:nth-child(odd){border-right:1px solid rgba(127,127,127,.4)}.esq .lt{display:flex;align-items:stretch;gap:0;margin:8px 0 4px;flex-wrap:wrap}.esq .lt-i{flex:1;min-width:110px;border:1.5px solid var(--lin);border-radius:30px;padding:8px 10px;text-align:center;background:var(--caja);margin:0 -4px;line-height:1.35}.esq .lt-i.fl2{border-radius:4px;background:var(--fondo2);flex:.9}.esq .lt-i.fin{border-radius:4px}@media (max-width:640px){.g2,.g2s,.g3,.esq .bif{grid-template-columns:1fr!important}.esq .lt{flex-direction:column}.esq .lt-i{margin:2px 0}}@media print{.esq .ban{-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
const head = T2.slice(0, iH1).replace(/<title>[^<]*<\/title>/, '<title>Esquema clave Tema ' + N + '</title>').replace('</style>', CSS + CSSESQ + CSSR + '</style>');
const ed = T2.slice(T2.indexOf('<div class="ed-top">'), iRc);
const cab = '<h1>Tema ' + N + ' \u00b7 ' + TIT + ' \u2014 esquema clave</h1>\n<p class="sub">Construido con tus marcas <span class="b of">EXOF</span>, las fichas <span class="b r">R</span>, las preguntas OFICIALES enlazadas y tu subrayado \u00b7 texto literal (en las fichas largas solo los apartados con pregunta)</p>\n' + T2.slice(T2.indexOf('<div class="leyenda cod">'), T2.indexOf('<div class="ed-top">'));
const VER = crypto.createHash('md5').update(body).digest('hex').slice(0, 8);
const pie = T2.slice(iPie).replace(/<p class="pie">[\s\S]*?<\/p>/, '<p class="pie">Esquema clave del Tema ' + N + ': marcas EXOF, fichas R, preguntas oficiales y cuadros, con tu subrayado.</p>');
fs.writeFileSync(R + 'repaso-t' + N + '-borrador.html', head + cab + ed + '<div id="rc" data-id="t' + N + '" data-ver="' + VER + '">' + body + pie);
console.log('tema', N, '| fichas', nF, 'de', cand.length, 'candidatas | cuadros', nV, '| caracteres', usado);
