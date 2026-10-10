// Tema 1 · completa el esquema con el articulado literal que falta para las preguntas sin sitio (y para cualquier artículo que se indique).
// Para cada artículo tocado: reconstruye el artículo COMPLETO con el texto del temario oficial (t1-texto-oficial.js), lo pinta con los
// colores reales de tu PDF subrayado (aplicar-subrayado-pdf.js, alineado por OCR) y lo mete en esquemas.html:
//   · si el artículo ya estaba en una ficha, sustituye SOLO sus párrafos (conservando las marcas «respuesta» m-resp que ya tenía);
//   · si no estaba, crea una ficha nueva «Artículo N — Título» en su sitio (por orden).
// Uso:  node prompts/herramientas/anadir-esquema-t1.js <texto_oficial.txt> <subrayado.json> [--dry] [--arts lo:12,carta:11,...]
// Sin --arts toma los artículos de las preguntas del Tema 1 que el mapa no sitúa (los lee de esquemas.html + test-oficial-conocimiento.html).
const fs = require('fs'), cp = require('child_process'), os = require('os'), path = require('path');
const [, , TXT, SUB] = process.argv;
const DRY = process.argv.includes('--dry');
const T = require('./t1-texto-oficial.js')(TXT);
const ESQ = 'esquemas.html', TEST = 'test-oficial-conocimiento.html';
const MARCAS = { lo: 'T1_LO', carta: 'T1_CARTA', coe: 'T1_COE', cedh: 'T1_CEDH', roma: 'T1_ROMA', acuerdo: 'T1_ACUERDO' };
const ORDEN = ['lo', 'carta', 'coe', 'cedh', 'roma', 'acuerdo'];
const RANGOS = { T1_ROMA: '4-36', T1_LO: '37-50', T1_CARTA: '51-64', T1_COE: '65-76', T1_CEDH: '77-120', T1_ACUERDO: '121-134' };   // páginas de tu PDF subrayado
const BS = String.fromCharCode(92);
const norm = t => (t || '').replace(/<[^>]+>/g, ' ').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const cap = t => { t = t.toLowerCase(); return t.charAt(0).toUpperCase() + t.slice(1).replace(/\b(de la|del|de los|de las)\b/g, '$1'); };

// ---------- lectura de esquemas.html ----------
let S = fs.readFileSync(ESQ, 'utf8');
function bloque(n) { const a = S.indexOf('/* ' + MARCAS[n] + ' */'); const sig = ORDEN.indexOf(n) + 1; const b = S.indexOf(sig < ORDEN.length ? '/* ' + MARCAS[ORDEN[sig]] + ' */' : '/* T1_RECUERDA', a); return [a, b]; }
// tokenizador de literales JS "…" (con \" escapados)
function lit(s, i) { if (s[i] !== '"') throw new Error('se esperaba " en ' + i); let j = i + 1; while (s[j] !== '"') { if (s[j] === BS) j++; j++; } return [new Function('return ' + s.slice(i, j + 1))(), j + 1]; }
function arr(s, i) { let d = 0, j = i, inS = false; for (; j < s.length; j++) { const c = s[j]; if (inS) { if (c === BS) j++; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '[') d++; else if (c === ']') { d--; if (d === 0) return j + 1; } } throw new Error('array sin cerrar'); }
function fichas(n) {   // todas las llamadas articuloResp(...) del bloque, con sus posiciones absolutas
  const [a, b] = bloque(n); const out = []; let p = a;
  while ((p = S.indexOf('articuloResp("', p)) >= 0 && p < b) {
    const ini = p; let i = p + 'articuloResp('.length;
    const [titulo, i1] = lit(S, i); i = i1; while (S[i] === ',' || S[i] === ' ') i++;
    const fa = arr(S, i); const resps = new Function('return ' + S.slice(i, fa))(); i = fa; while (S[i] === ',' || S[i] === ' ') i++;
    const [html, i2] = lit(S, i); i = i2; let ex = false; if (S.slice(i, i + 6) === ', true') { ex = true; i += 6; }
    if (S[i] !== ')') throw new Error('articuloResp mal cerrado en ' + titulo.slice(0, 40));
    out.push({ ini, fin: i + 1, titulo, resps, html, ex }); p = i + 1;
  }
  return out;
}
const num1 = t => { const m = /(\d+)/.exec(t); return m ? +m[1] : 0; };
function articulosDeTitulo(t) { const m = /^Art[íi]culos?\s+([^—]*)—/.exec(t); if (!m) return []; const s = m[1]; const res = []; const rg = /(\d+)\s*a\s*(\d+)/g; let r; let resto = s; while ((r = rg.exec(s))) { for (let k = +r[1]; k <= +r[2]; k++) res.push(String(k)); } resto = s.replace(/\d+\s*a\s*\d+/g, ' '); (resto.match(/\d+(?:\s*(?:bis|ter))?/g) || []).forEach(x => res.push(x.replace(/\s+/g, ' ').trim().toLowerCase())); return res; }
const ps = html => html.match(/<p>[\s\S]*?<\/p>/g) || [];
function artDeP(p) { const m = /^<p>(?:<b>)?(?:<mark[^>]*>)?\s*(?:<[^>]+>)*\s*Art(?:ículo)?\.?\s*(\d+(?:\s*(?:bis|ter))?)/i.exec(p); return m ? m[1].replace(/\s+/g, ' ').toLowerCase() : null; }

// ---------- objetivo: artículos a completar ----------
function objetivos() {
  const arg = process.argv.indexOf('--arts');
  if (arg > 0) return process.argv[arg + 1].split(',').map(x => x.split(':'));
  const q = []; { const t = fs.readFileSync(TEST, 'utf8'); const re = /\{"id":"1-[^"]*"/g; let m; while ((m = re.exec(t))) { let d = 0, inS = false, e = false, j = m.index; for (; j < t.length; j++) { const c = t[j]; if (inS) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } } try { q.push(JSON.parse(t.slice(m.index, j + 1))); } catch (x) {} } }
  const i0 = S.indexOf('window.MAPA_PREG=') + 'window.MAPA_PREG='.length; const M = JSON.parse(S.slice(i0, S.indexOf('}', i0) + 1));
  const normaDe = ap => /Ley Org/.test(ap) ? 'lo' : /Carta/.test(ap) ? 'carta' : /Consejo/.test(ap) ? 'coe' : /Convenio/.test(ap) ? 'cedh' : /Roma/.test(ap) ? 'roma' : 'acuerdo';
  const set = new Map();
  q.filter(x => !M[x.id] && !/Historia/.test(x.apartado)).forEach(x => { const m = x.pregunta.match(/\. Artículo (\d+(?: bis| ter)?)\./i) || (x.explicacion || '').match(/ref-norma">(?:art\.|artículo) (\d+(?: bis| ter)?)/i); if (m) set.set(normaDe(x.apartado) + ':' + m[1].toLowerCase(), 1); });
  return [...set.keys()].map(k => k.split(':'));
}

// ---------- construcción del html de un artículo ----------
function htmlArticulo(art) {
  return art.unidades.map((u, i) => {
    const t = esc(u.txt);
    if (i === 0) return `<p><b>Art. ${art.num}.</b> ${u.etq && !/^[a-z]\)$/.test(u.etq) ? u.etq + ' ' : u.etq ? u.etq + ' ' : ''}${t}</p>`;
    return u.etq ? `<p><b>${u.etq}</b> ${t}</p>` : `<p>${t}</p>`;
  }).join('');
}
function respsDe(pHtml) { return [...pHtml.matchAll(/<mark class=(?:\\?")m-resp(?:\\?")>([\s\S]*?)<\/mark>/g)].map(x => x[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean); }
function aplicaResp(html, frases) {
  const visto = new Set();
  frases.forEach(fr => {
    const plano = fr.replace(/\s+/g, ' ').replace(/[.;:,]$/, '').trim(); if (plano.length < 4 || visto.has(plano.toLowerCase())) return; visto.add(plano.toLowerCase());
    const rx = new RegExp(plano.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+'), 'i');
    let hecho = false;   // solo la primera aparición de cada frase (sin pisar marcas m-resp ya puestas)
    html = html.replace(/<p>[\s\S]*?<\/p>/g, p => {
      if (hecho) return p;
      return p.split(/(<mark class="m-resp">[\s\S]*?<\/mark>|<[^>]+>)/).map(seg => (hecho || seg[0] === '<') ? seg : seg.replace(rx, x => { hecho = true; return '<mark class="m-resp">' + x + '</mark>'; })).join('');
    });
  });
  return html;
}
// respuestas de las preguntas del Tema 1 que remiten a (norma, artículo): la opción correcta, si es una frase literal del artículo
let PREGS = null;
function respuestasDePreguntas(n, a) {
  if (!PREGS) { PREGS = []; const t = fs.readFileSync(TEST, 'utf8'); const re = /\{"id":"1-[^"]*"/g; let m; while ((m = re.exec(t))) { let d = 0, inS = false, e = false, j = m.index; for (; j < t.length; j++) { const c = t[j]; if (inS) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } } try { PREGS.push(JSON.parse(t.slice(m.index, j + 1))); } catch (x) {} } }
  const normaDe = ap => /Ley Org/.test(ap) ? 'lo' : /Carta/.test(ap) ? 'carta' : /Consejo/.test(ap) ? 'coe' : /Convenio/.test(ap) ? 'cedh' : /Roma/.test(ap) ? 'roma' : 'acuerdo';
  const out = [];
  PREGS.forEach(q => {
    if (normaDe(q.apartado) !== n || /INCORRECT|NO es|no es correct/i.test(q.pregunta)) return;
    const m = q.pregunta.match(/\. Artículo (\d+(?: bis| ter)?)\./i) || (q.explicacion || '').match(/ref-norma">(?:art\.|artículo) (\d+(?: bis| ter)?)/i);
    if (!m || m[1].toLowerCase() !== String(a)) return;
    const c = (q.opciones[q.correcta] || '').replace(/<[^>]+>/g, '').trim();
    if (c.length >= 10 && !/^(todas|ninguna|a y b|b y c|a y c)/i.test(c)) out.push(c);
  });
  return out;
}

function esEX(n, a) {
  respuestasDePreguntas(n, '__'); // carga PREGS
  const normaDe = ap => /Ley Org/.test(ap) ? 'lo' : /Carta/.test(ap) ? 'carta' : /Consejo/.test(ap) ? 'coe' : /Convenio/.test(ap) ? 'cedh' : /Roma/.test(ap) ? 'roma' : 'acuerdo';
  return PREGS.some(q => !/-ia-/.test(q.id) && normaDe(q.apartado) === n && /\((EX|PREGUNTA EXAMEN|EXAMEN 2020|EXOF)/.test(q.pregunta) && (((q.explicacion || '').match(/ref-norma">(?:art\.|artículo) (\d+(?: bis| ter)?)/i) || [])[1] || '').toLowerCase() === String(a));
}
// ---------- plan ----------
const obj = objetivos();
const plan = [];   // {n, a, art, host, nuevoHtml}
const FALLOS = [];
for (const [n, a] of obj) {
  const art = T.articulo(n, a); if (!art) { FALLOS.push(n + ':' + a); continue; }
  const fl = fichas(n);
  const host = fl.find(f => articulosDeTitulo(f.titulo).includes(String(a))) || fl.find(f => ps(f.html).some(p => artDeP(p) === String(a)));
  plan.push({ n, a: String(a), art, host, html: htmlArticulo(art) });
}
// extras: exposición de motivos, preámbulo y datos que solo trae tu PDF subrayado (fechas, declaración y reservas de España)
const para = arr => arr.map(x => '<p>' + esc(x) + '</p>').join('');
const EXTRAS = [
  { n: 'lo', a: 'EM', ord: -1, cab: 'Exposición de motivos', pos: 'inicio', html: para(T.parrafos(5, 6, /^EXPOSICIÓN DE MOTIVOS$/, /^ARTÍCULO 1\./)) },
  { n: 'carta', a: 'PRE', ord: -1, cab: 'Preámbulo', pos: 'antes:bloqueTitulo("TÍTULO I. DIGNIDAD")', html: para(T.parrafos(19, 19, /^PREÁMBULO\s*$/, /^TÍTULO I/)) },
  { n: 'cedh', a: 'X1', ord: 998, cab: 'Convenio — fechas, declaración y reservas de España (datos que solo trae tu PDF subrayado)', pos: 'antes:bloqueTitulo("PROTOCOLOS AL CEDH")', html: para([
    'Hecho en Roma: 4 de noviembre de 1950. Entrada en vigor: 3 de septiembre de 1953.',
    'El presente Convenio entró en vigor el 3 de septiembre de 1953 y para España el 4 de octubre de 1979, fecha del depósito de su Instrumento de Ratificación, de conformidad con el artículo 66, 3, de dicho Convenio.',
    'España declara, de conformidad con las disposiciones del artículo 46, que reconoce, por un período de tres años a partir del 15 de octubre de 1979, como obligatoria de pleno derecho y sin convenio especial, bajo condición de reciprocidad, la jurisdicción del Tribunal Europeo de Derechos Humanos para conocer de todos los asuntos relativos a la interpretación y aplicación de dicho Convenio que se susciten con posterioridad al 14 de octubre de 1979.',
    'España. De conformidad con el artículo 64 del Convenio sobre la Protección de los Derechos Humanos y de las Libertades Fundamentales, España reserva la aplicación de: 1. Los artículos 5 y 6, en la medida en que fueran incompatibles con las disposiciones que, en relación con el régimen disciplinario de las Fuerzas Armadas, se contienen en el título XV del Tratado Segundo y en el título XXIV del Tratado Tercero del Código de Justicia Militar. 2. El artículo 11, en la medida en que fuere incompatible con los artículos 28 y 127 de la Constitución española.']) },
  { n: 'cedh', a: 'X2', ord: 999, cab: 'Protocolos — fechas de entrada en vigor, también para España (datos que solo trae tu PDF subrayado)', pos: 'fin', html: para([
    'Protocolo adicional (París, 20 de marzo de 1952): entró en vigor con carácter general el 18 de mayo de 1954 y para España el 27 de noviembre de 1990, según lo dispuesto en el artículo 6 del mismo.',
    'Protocolo número 6 (Estrasburgo, 28 de abril de 1983): España lo ratificó el 14 de enero de 1985. El presente Protocolo entró en vigor de forma general y para España el día 1 de marzo de 1985, de conformidad con lo establecido en su artículo 8.',
    'Protocolo número 8 (Viena, 19 de marzo de 1985): entró en vigor de forma general y para España el 1 de enero de 1990, de conformidad con lo establecido en el artículo 13 del mismo.',
    'Protocolo número 11 (Estrasburgo, 11 de mayo de 1994): entrará en vigor el primer día del mes siguiente a la expiración de un período de un año a partir de la fecha en que todas las Partes en el Convenio hayan expresado su consentimiento en quedar vinculadas por el Protocolo.',
    'Protocolo número 13 (Vilna, 3 de mayo de 2002): hecho en Vilna, el 3 de mayo de 2002, en francés y en inglés.']) } ];
EXTRAS.forEach(x => plan.push({ n: x.n, a: x.a, ord: x.ord, extra: x, art: { unidades: [], titulo: x.cab }, host: null, html: x.html }));
console.error('artículos a completar:', plan.length, '· no extraídos:', FALLOS.join(', ') || '—');
plan.filter(p => !p.extra).forEach(p => console.error(`  ${p.n}:${p.a} · ${p.art.unidades.length} unidades · ${p.host ? 'sustituye en «' + p.host.titulo.slice(0, 50) + '»' : 'ficha NUEVA'}`));
if (DRY) process.exit(0);

// ---------- pintar con los colores de tu PDF ----------
// 1) conservar m-resp que ya tuviera el artículo; 2) temporal con una ficha por artículo (orden de norma), 3) aplicar-subrayado-pdf.js
plan.forEach(p => {
  let frases = [];
  if (p.host) { const hp = ps(p.host.html); const own = hp.filter((x, i) => { let cur = null; for (let k = 0; k <= i; k++) { const aa = artDeP(hp[k]); if (aa) cur = aa; } const base = articulosDeTitulo(p.host.titulo); return (cur || (base.length === 1 ? base[0] : null)) === p.a; }); frases = own.flatMap(respsDe); }
  if (process.env.DBG) console.error("frases", p.n, p.a, frases.length, frases.map(x => x.slice(0, 40)));
  p.html = aplicaResp(p.html, [...frases, ...respuestasDePreguntas(p.n, p.a)]);
  if (process.env.DBG) console.error("  marcas", p.n, p.a, "frases", frases.length, "→ m-resp en el nuevo:", (p.html.match(/m-resp/g) || []).length);
});
const tmpF = path.join(os.tmpdir(), 'anadir-t1-' + process.pid + '.html');
let tmp = '';
ORDEN.forEach(n => { const ord = p => p.ord != null ? p.ord : num1(p.a); const ls = plan.filter(p => p.n === n).sort((x, y) => ord(x) - ord(y) || x.a.localeCompare(y.a)); if (!ls.length) return; tmp += `/* ${MARCAS[n]} */ X = ` + ls.map(p => `articuloResp(${JSON.stringify('A|' + p.n + '|' + p.a)}, [], ${JSON.stringify(p.html)}, true)`).join('\n + ') + ';\n'; });
tmp += '/* T1_FIN */\n';
fs.writeFileSync(tmpF, tmp);
const rg = Object.entries(RANGOS).map(([k, v]) => k + ':' + v).join(',');
const primera = ORDEN.find(n => plan.some(p => p.n === n));
cp.execFileSync('node', [path.join(__dirname, 'aplicar-subrayado-pdf.js'), SUB, tmpF, '/* ' + MARCAS[primera] + ' */', '/* T1_FIN */', rg], { stdio: 'inherit', env: { ...process.env, UMBRAL: '0.15' } });
const pintado = fs.readFileSync(tmpF, 'utf8');
const nuevos = {};
for (const m of pintado.matchAll(/articuloResp\("A\|(\w+)\|([^"]+)", \[\], ("(?:[^"\\\n]|\\.)*")/g)) nuevos[m[1] + '|' + m[2]] = new Function('return ' + m[3])();
plan.forEach(p => { p.pintado = nuevos[p.n + '|' + p.a] || p.html; if (!nuevos[p.n + '|' + p.a]) console.error('sin pintar (se deja sin color):', p.n, p.a); });

// ---------- escribir en esquemas.html (de atrás hacia delante para no invalidar posiciones) ----------
const q2 = s => JSON.stringify(s);
const cambios = [];   // {ini, fin, texto}
ORDEN.forEach(n => {
  const fl = fichas(n); const delN = plan.filter(p => p.n === n);
  // sustituciones en fichas existentes
  const porHost = new Map();
  delN.filter(p => p.host).forEach(p => { const k = p.host.ini; (porHost.get(k) || porHost.set(k, { host: p.host, ls: [] }).get(k)).ls.push(p); });
  for (const { host, ls } of porHost.values()) {
    let hp = ps(host.html); const base = articulosDeTitulo(host.titulo);
    // asignar artículo a cada <p>
    let cur = base.length === 1 ? base[0] : null; const asg = hp.map(x => { const aa = artDeP(x); if (aa) cur = aa; return cur; });
    ls.forEach(p => {
      const ix = asg.map((x, i) => x === p.a ? i : -1).filter(i => i >= 0);
      const nuevaP = ps(p.pintado);
      if (ix.length) { const a0 = ix[0]; const b0 = ix[ix.length - 1]; hp.splice(a0, b0 - a0 + 1, ...nuevaP); asg.splice(a0, b0 - a0 + 1, ...nuevaP.map(() => p.a)); }
      else { // artículo citado en el título pero sin párrafos: se coloca por orden
        let pos = asg.findIndex(x => x && num1(x) > num1(p.a)); if (pos < 0) pos = hp.length; hp.splice(pos, 0, ...nuevaP); asg.splice(pos, 0, ...nuevaP.map(() => p.a)); }
    });
    cambios.push({ ini: host.ini, fin: host.fin, texto: `articuloResp(${q2(host.titulo)}, ${JSON.stringify(host.resps)}, ${q2(hp.join(''))}${host.ex ? ', true' : ''})` });
  }
  // fichas nuevas
  delN.filter(p => !p.host).forEach(p => {
    let pos;
    if (p.extra) {
      const [a1, b1] = bloque(n); const ps0 = p.extra.pos;
      if (ps0 === 'inicio') pos = S.indexOf('\n', a1) + 1;
      else if (ps0 === 'fin') pos = S.lastIndexOf('\n', b1 - 2) + 1;
      else { const mk = ps0.slice(6); const i = S.indexOf(mk, a1); if (i < 0 || i > b1) throw new Error('no encuentro ' + mk); pos = S.lastIndexOf('\n', i) + 1; }
    } else {
      const prev = fl.filter(f => { const t = articulosDeTitulo(f.titulo).map(num1); return t.length && Math.min(...t) < num1(p.a); }).pop();
      if (prev) { pos = S.indexOf('\n', prev.fin) + 1; for (;;) { const fin = S.indexOf('\n', pos); const ln = S.slice(pos, fin < 0 ? S.length : fin); if (/^\s*\+ (trampa\(|\/\*VIS\*\/)/.test(ln)) pos = fin + 1; else break; } }
      else pos = S.lastIndexOf('\n', fl[0].ini) + 1;
    }
    const cab = p.extra ? p.extra.cab : ('Artículo ' + p.a + ' — ' + cap(p.art.titulo || '')).replace(/ — $/, '');
    let texto = '  + articuloResp(' + q2(cab) + ', [], ' + q2(p.pintado) + (esEX(n, p.a) ? ', true' : '') + ')';
    // si la línea anterior cerraba el bloque con «;», el «;» pasa a la nueva ficha
    const la = S.lastIndexOf('\n', pos - 2) + 1; const lt = S.slice(la, pos);
    if (/;\s*\n?$/.test(lt)) { const k = la + lt.lastIndexOf(';'); cambios.push({ ini: k, fin: k + 1, texto: '', ord: 0 }); texto += ';'; }
    cambios.push({ ini: pos, fin: pos, texto: texto + '\n', nueva: true, ord: p.ord != null ? p.ord : num1(p.a) });
  });
});
cambios.sort((x, y) => y.ini - x.ini || (y.ord || 0) - (x.ord || 0));   // en la misma posición se inserta primero el de mayor artículo (queda detrás)
cambios.forEach(c => { S = S.slice(0, c.ini) + c.texto + S.slice(c.fin); });
fs.writeFileSync(ESQ, S);
console.error('esquemas.html actualizado:', cambios.length, 'cambios');
