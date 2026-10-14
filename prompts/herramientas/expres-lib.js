// Librería del modo ⚡ EXPRÉS (resumen de 1 hora por tema, 17-20 págs): mezcla
//   · fichas LITERALES (párrafos enteros del esquema completo, con su subrayado) para lo muy preguntado / EX,
//   · ESQUEMAS visuales (árbol, columnas, flujo, tabla) para listas, órganos, plazos y comparaciones,
//   · líneas de DATOS SUELTOS.
// Cada respuesta lleva data-q con sus preguntas → al pulsarla abre el test (igual que en el esquema completo).
// Uso desde un script de tema:  const X = require('./expres-lib.js')(2);  ...  X.publica(html, {bloques});
const fs = require('fs');
const path = require('path');
const VL = require('./visuales-lib.js');
const RAIZ = path.join(__dirname, '..', '..');
const ESQ = path.join(RAIZ, 'esquemas.html');

module.exports = function (T) {
  const h = fs.readFileSync(ESQ, 'utf8');
  // esquema completo del tema (evaluando su script con un DOM de mentira, como mapa-preguntas.js)
  const src = [...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(s => s.includes('temasPrograma'));
  const code = src.slice(0, src.search(/\nrender\(\);/)) + ';return esquemas;';
  const fake = () => new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? (() => '') : fake(), apply: () => fake(), set: () => true, construct: () => fake() });
  const E = new Function('document', 'window', 'localStorage', 'speechSynthesis', code)(fake(), fake(), fake(), fake());
  const html = E[T - 1].html;
  const MAPA = JSON.parse(h.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
  const EXTRA = JSON.parse(h.match(/window\.MAPA_EXTRA=(\{.*?\});/)[1]);
  // fuera las preguntas cuya respuesta es solo «el artículo X» (no caen así en el examen; pauta del usuario 14/10/2026)
  const PA = require('./preguntas-articulo.js');
  const FUERA = PA(T);
  const PREG = Object.fromEntries(PA.preguntas(T).map(x => [x.id, x]));
  FUERA.forEach(id => delete MAPA[id]);
  Object.keys(EXTRA).forEach(k => { if (Array.isArray(EXTRA[k])) { EXTRA[k] = EXTRA[k].filter(id => !FUERA.has(id)); if (!EXTRA[k].length) delete EXTRA[k]; } });
  const porSitio = {}; Object.entries(MAPA).forEach(([id, p]) => { if (p.startsWith(T + '-')) (porSitio[p] = porSitio[p] || []).push(id); });
  const fichas = [...html.matchAll(/<div class="articulo">([\s\S]*?<div class="txt">([\s\S]*?)<\/div>\s*(?:<div class="sello-examen">EX<\/div>)?\s*<\/div>\s*<\/div>)/g)]
    .map(m => ({ cab: (m[1].match(/<div class="articulo-head">([\s\S]*?)<\/div>/) || [])[1] || '', ex: /sello-examen/.test(m[0]),
      ps: [...m[2].matchAll(/<p([^>]*)>([\s\S]*?)<\/p>/g)].map(x => ({ at: x[1], h: x[2] })) }));
  // título del bloque (norma) de cada ficha, en el mismo orden que `fichas` (para asignar preguntas sueltas a su artículo)
  const fichaBloque = (() => { const out = []; let tit = ''; const re = /<div class="bloque-titulo">([\s\S]*?)<\/div>|<div class="articulo">[\s\S]*?<div class="txt">[\s\S]*?<\/div>\s*(?:<div class="sello-examen">EX<\/div>)?\s*<\/div>\s*<\/div>/g; let m;
    while ((m = re.exec(html))) { if (m[1] !== undefined) tit = m[1].replace(/<[^>]+>/g, ''); else out.push(tit); } return out; })();
  const usados = new Set();               // ids de preguntas enlazadas en el exprés
  const esIA = id => /-ia-/.test(id);
  const q = (ids) => { ids.forEach(i => usados.add(i)); return ` data-q="${ids.join(',')}"${ids.every(esIA) ? ' title="Doble clic (doble toque en el móvil) para repasar sus preguntas"' : ' title="Doble clic (doble toque en el móvil) para repasar sus preguntas (hay oficiales)"'}`; };

  // Respuesta enlazada a sus preguntas
  const REG = [];
  const Rq = (txt, ids) => { const m = `<mark class="m-resp${ids.every(esIA) ? ' r-ia' : ''}"${q(ids)}>`; REG.push({ t: txt.replace(/<[^>]+>/g, ''), m }); return m + txt + '</mark>'; };
  // el coloreado automático (visuales-lib → reglas-color) reescribe las marcas sin atributos: se les devuelve su data-q
  // (en orden: la 1.ª aparición de un texto usa su 1.er registro, la 2.ª el 2.º…, para que dos respuestas iguales no se crucen)
  // Recorre TODAS las respuestas en orden: las que conservan su data-q (no pasaron por el coloreado) consumen su registro,
  // y las que lo perdieron toman el siguiente registro libre con su mismo texto.
  const restaura = html => { const usadas = new Set(); return html.replace(/(<mark class="m-resp[^"]*"[^>]*>)([\s\S]*?)<\/mark>/g, (all, open, t) => {
    const tt = t.replace(/<[^>]+>/g, '');
    if (open !== '<mark class="m-resp">') { const i = REG.findIndex((x, n) => !usadas.has(n) && x.m === open && x.t === tt); if (i >= 0) usadas.add(i); return all; }
    let k = REG.findIndex((x, i) => !usadas.has(i) && x.t === tt);
    if (k < 0) k = REG.findIndex((x, i) => !usadas.has(i) && (x.t.includes(tt) || tt.includes(x.t)));
    if (k < 0) k = REG.findIndex(x => x.t === tt);
    if (k < 0) return all; usadas.add(k); return REG[k].m + t + '</mark>'; }); };

  // Párrafo literal j de la ficha k, con sus marcas de respuesta enlazadas como en el esquema completo
  function parrafo(k, j) {
    const f = fichas[k]; const p = f.ps[j]; const base = `${T}-${k}-${j}`; fichaEX = f.ex || (OPC.iaEnEX === 'conOficial' && idsFicha(k).some(id => !esIA(id)));
    const sueltas = porSitio[base] || [];
    let i = -1; const puestas = new Set();
    const marks = [...p.h.matchAll(/<mark class="m-resp">/g)].map((_, n) => porSitio[`${base}-${n}`] || EXTRA[`${base}-${n}`] || sueltas);
    const out = p.h.replace(/<mark class="m-resp">/g, () => {
      i++; let ids = marks[i];
      // r-vec = marca sin pregunta propia que toma las de la vecina (enlaza, pero no obliga a mostrar su frase en el recorte)
      const vec = !ids.length;
      for (let d = 1; !ids.length && d < marks.length; d++) ids = (marks[i - d] && marks[i - d].length) ? marks[i - d] : (marks[i + d] || []);
      ids.forEach(x => puestas.add(x));
      return ids.length ? `<mark class="m-resp${ids.every(esIA) ? ' r-ia' : ''}${vec ? ' r-vec' : ''}"${q(ids)}>` : '<mark class="m-resp r-ia">';
    });
    // preguntas del párrafo que ninguna marca recoge (párrafo sin respuesta marcada): botón 🎯 al final que las abre
    // marcas de respuesta que son solo «el artículo X»: se quitan (sus preguntas, si quedan, pasan al 🎯)
    let h2 = out; const perdidas = [];
    h2 = mapaMarcas(h2, (open, inner) => { if (!PA.esArticulo(limpia(inner))) return null; const d = open.match(/data-q="([^"]+)"/); if (d) perdidas.push(...d[1].split(',')); return inner; });
    const enMarcas = new Set([...h2.matchAll(/data-q="([^"]+)"/g)].flatMap(x => x[1].split(',')));
    let resto = [...new Set(sueltas.concat(perdidas))].filter(x => !enMarcas.has(x) && !FUERA.has(x));
    // la respuesta correcta de esas preguntas se busca en el texto y se marca (en vez de dejarla solo en el 🎯)
    resto = resto.filter(id => { const r = marcaRespuesta(h2, id); if (r) { h2 = r; return false; } return true; });
    if (OPC.recorte) h2 = recorta(h2);
    const boton = resto.length ? ` <mark class="m-resp ex-q${resto.every(esIA) ? ' r-ia' : ''}"${q(resto)}>🎯 ${resto.length === 1 ? '1 pregunta' : resto.length + ' preguntas'}</mark>` : '';
    return `<p${p.at}>${h2}${boton}</p>`;
  }
  // posición del cierre de la etiqueta que se abre en i (cuenta anidadas del mismo nombre)
  function cierre(html, i) {
    const nom = html.slice(i + 1).match(/^[a-z0-9]+/i)[0]; const re = new RegExp(`<(/?)${nom}\\b[^>]*>`, 'gi'); re.lastIndex = i; let d = 0, m;
    while ((m = re.exec(html))) { d += m[1] ? -1 : 1; if (!d) return [m.index, m.index + m[0].length]; }
    return [html.length, html.length];
  }
  // aplica fn(open, inner) a cada <mark class="m-resp…">; si devuelve una cadena, sustituye la marca entera
  function mapaMarcas(html, fn) {
    let out = '', i = 0, m; const re = /<mark class="m-resp[^"]*"[^>]*>/g;
    while ((m = re.exec(html))) { const [c0, c1] = cierre(html, m.index); const r = fn(m[0], html.slice(m.index + m[0].length, c0));
      if (r == null) continue; out += html.slice(i, m.index) + r; i = c1; re.lastIndex = c1; }
    return out + html.slice(i);
  }
  const equilibrado = s => { let d = 0; for (const m of s.matchAll(/<(\/?)[a-z]+\b[^>]*>/gi)) { d += m[1] ? -1 : 1; if (d < 0) return false; } return d === 0; };
  function marcaRespuesta(html, id) {
    const x = PREG[id]; if (!x) return null;
    const ans = limpia(x.opciones[x.correcta]).replace(/[.;,:]+$/, '').replace(/^(?:el|la|los|las)\s+(?=\S+\s+\S)/i, '');
    if (ans.length < 6 || PA.esArticulo(ans)) return null;
    const pal = ans.split(/\s+/).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const m = html.match(new RegExp(`(?<![\\p{L}\\p{N}])${pal.join('(?:\\s|&nbsp;|<[^>]+>)+')}(?![\\p{L}\\p{N}])`, 'iu')); if (!m) return null;
    const antes = html.slice(0, m.index);
    // ya dentro de una respuesta marcada → se le añade la pregunta a esa marca
    const ab = antes.lastIndexOf('<mark class="m-resp'); if (ab >= 0 && cierre(html, ab)[0] >= m.index + m[0].length)
      return html.slice(0, ab) + html.slice(ab).replace(/^(<mark class="m-resp)([^"]*)"(?: data-q="([^"]+)")?[^>]*>/, (a, o, cl, ids) => { const l = (ids ? ids.split(',') : []).concat(id); return `${o}${l.every(esIA) ? cl.replace(' r-ia', '') + ' r-ia' : cl.replace(' r-ia', '')}"${q(l)}>`; });
    if (!equilibrado(m[0])) return null;
    return antes + `<mark class="m-resp${esIA(id) ? ' r-ia' : ''}"${q([id])}>` + m[0] + '</mark>' + html.slice(m.index + m[0].length);
  }
  // Recorte por frases: se ven las frases con respuesta; las demás quedan en un «(…)» que al pulsarlo despliega el literal
  const CORTE = /(?<=[.;:])(?<!\b(?:art|arts|núm|apdo|pág|ap|n\.º|Sr|Sra|etc|p)\.)\s+(?=(?:\d+(?:\.|\.º|º)\s|[a-zñ]\)\s|[A-ZÁÉÍÓÚÑ¿«(]))/u;
  // trocea html por el separador sep, solo fuera de etiquetas (las marcas no se parten)
  function trocea(html, sep) {
    const segs = ['']; let d = 0;
    for (const tok of html.split(/(<[^>]+>)/)) {
      if (!tok) continue;
      if (tok[0] === '<') { if (/^<\//.test(tok)) d--; else if (!/\/>$|^<br/i.test(tok)) d++; segs[segs.length - 1] += tok; continue; }
      if (d > 0) { segs[segs.length - 1] += tok; continue; }
      const partes = tok.split(sep); segs[segs.length - 1] += partes[0]; partes.slice(1).forEach(x => segs.push(x));
    }
    return segs;
  }
  const plegable = t => `<span class="ex-plg" tabindex="0" title="Pulsa para ver el texto omitido" onclick="if(event.target===this)this.classList.toggle('on')"><span class="ex-plg-t">${t}</span></span>`;
  // frase larga: se queda el arranque (quién/qué) y los incisos con respuesta; los demás incisos, plegados
  // 'ventana': de cada frase con respuesta se ve el arranque (OPC.cabeza palabras) y cada respuesta con OPC.antes palabras
  // delante; lo demás, plegado. Las marcas (subrayado, respuestas) nunca se parten.
  function ventana(s) {
    const us = []; let d = 0, cur = null;
    for (const tok of s.split(/(<[^>]+>)/)) {
      if (!tok) continue;
      if (tok[0] === '<') { const cierra = /^<\//.test(tok), auto = /\/>$|^<br/i.test(tok);
        if (!cierra && !auto && d === 0) { cur = { h: '', w: true, r: /^<mark class="m-resp/.test(tok) }; us.push(cur); }
        if (cur) cur.h += tok; else us.push({ h: tok, w: false });
        if (cierra) { d--; if (d === 0) cur = null; } else if (!auto) d++;
        continue; }
      if (d > 0) { cur.h += tok; continue; }
      for (const w of tok.split(/(\s+)/)) if (w) us.push({ h: w, w: /\S/.test(w), r: false });
    }
    const pal = us.map((u, i) => [u, i]).filter(([u]) => u.w).map(([, i]) => i);   // índices de «palabras»
    const ver = new Set(); pal.slice(0, OPC.cabeza || 8).forEach(i => ver.add(i));
    pal.forEach((i, n) => { if (us[i].r) { ver.add(i); pal.slice(Math.max(0, n - (OPC.antes || 5)), n).forEach(j => ver.add(j)); if (pal[n + 1] !== undefined && limpia(us[pal[n + 1]].h).length <= 3) ver.add(pal[n + 1]); } });
    if (pal.length) { const ult = pal[pal.length - 1]; if (limpia(us[ult].h).length <= 2) ver.add(ult); }
    let out = '', oc = '';
    const suelta = () => { if (!oc) return; if (limpia(oc).length < 25) out += oc; else out += ' ' + plegable(oc.trim()) + ' '; oc = ''; };
    us.forEach((u, i) => { const vis = ver.has(i) || (!u.w && /^\s+$/.test(u.h) && ver.has(i - 1) && ver.has(i + 1)) || (!u.w && !/^\s+$/.test(u.h));
      if (vis) { suelta(); out += u.h; } else oc += u.h; });
    suelta();
    return out.replace(/\s{2,}/g, ' ');
  }
  function recortaFrase(s) {
    if (OPC.recorte === 'ventana') return limpia(s).length < (OPC.umbral || 160) ? s : ventana(s);
    if (OPC.recorte !== 'incisos' || limpia(s).length < (OPC.umbral || 220)) return s;
    const cl = trocea(s, /(?<=,)\s+(?![a-zñ]\)\s)/u); if (cl.length < 3) return s;
    const vale = esVale;
    let out = cl[0], ocul = [];
    const suelta = () => { if (!ocul.length) return; const t = ocul.join(' '); ocul = []; out += ' ' + (limpia(t).length < 50 ? t : plegable(t)); };
    cl.slice(1).forEach(x => { if (vale(x)) { suelta(); out += ' ' + x; } else ocul.push(x); });
    suelta();
    return out;
  }
  // una frase se muestra si tiene una respuesta con pregunta propia (no r-vec) o es EX
  // soloOficial: frases con pregunta OFICIAL (o EX); las de solo IA se pliegan, salvo en artículos EX si iaEnEX
  let fichaEX = false, tieneCuadro = false;   // iaEnEX: las IA se ven en artículos EX sin cuadro (con cuadro, ya las recoge el cuadro)
  const RX_TODAS = /<mark class="m-resp(?![^"]*r-vec)[^"]*" data-q=|data-ex|class="ex-p"/, RX_OF = /<mark class="m-resp(?![^"]*(?:r-vec|r-ia))[^"]*" data-q=|data-ex|class="ex-p"/;
  const esVale = s => (OPC.soloOficial && !(OPC.iaEnEX && fichaEX && !(OPC.iaEnEX === 'sinCuadro' && tieneCuadro)) ? RX_OF : RX_TODAS).test(s);
  function recorta(html) {
    const segs = trocea(html, CORTE);
    const vale = esVale;
    if (!segs.some(vale) && !OPC.soloOficial) return OPC.recorte === 'ventana' && OPC.sinRespPliega ? ventana(html) : html;
    let out = '', oculto = [];
    const suelta = () => { if (!oculto.length) return; let t = oculto.join(' '); oculto = [];
      const cab = t.match(/^\s*<b>[^<]*<\/b>\s*/); if (cab) { out += cab[0]; t = t.slice(cab[0].length); }
      if (limpia(t).length < 60) { out += t + ' '; return; }
      out += plegable(t) + ' '; };
    segs.forEach(s => { if (vale(s)) { suelta(); out += recortaFrase(s) + ' '; } else oculto.push(s); });
    suelta();
    return out.replace(/\s+$/, '');
  }
  // texto visible (sin lo plegado) para medir páginas
  const sinOcultos = html => { let i; while ((i = html.indexOf('<span class="ex-plg-t">')) >= 0) html = html.slice(0, i) + html.slice(cierre(html, i)[1]); return html; };
  const OPC = { recorte: false };
  const CSS_PLG = `/* (…) plegable del Exprés: frases del artículo sin pregunta; al pulsarlo despliega el literal con su color y se puede subrayar y editar */
.ex-plg{cursor:pointer}
.ex-plg::before{content:"(…)";color:var(--verde-med,#2f6b52);font-weight:800;padding:0 2px;border-radius:4px}
.ex-plg:hover::before,.ex-plg:focus::before{background:var(--panel-alt,#eee)}
.ex-plg>.ex-plg-t{display:none}
.ex-plg.on::before{content:"(−)"}
.ex-plg.on>.ex-plg-t{display:inline;background:rgba(127,127,127,.09);border-radius:4px;-webkit-box-decoration-break:clone;box-decoration-break:clone}
`;
  // Ficha literal: cabecera original (o la que se indique) + párrafos elegidos ENTEROS
  // extra = ids de preguntas que el mapa no sitúa pero son de esta ficha → botón «🎯 n preguntas más» al final
  const botonQ = (ids, txt) => `<mark class="m-resp ex-q${ids.every(esIA) ? ' r-ia' : ''}"${q(ids)}>🎯 ${txt || (ids.length === 1 ? '1 pregunta' : ids.length + ' preguntas')}</mark>`;
  const literal = (k, js, cab, extra) => {
    const f = fichas[k];
    const mas = extra && extra.length ? `<p class="ex-mas">${botonQ(extra, extra.length === 1 ? '1 pregunta más de este artículo' : extra.length + ' preguntas más de este artículo')}</p>` : '';
    return `<div class="ex-ficha${f.ex ? ' ex-of' : ''}"><div class="ex-fh">${cab || f.cab}${f.ex ? '<span class="ex-sello">EX</span>' : ''}</div><div class="ex-fb">${js.map(j => parrafo(k, j)).join('')}${mas}</div></div>`;
  };
  // Tabla de competencias / comparativa sencilla: filas [etiqueta, celda1, celda2…]
  const cuadro = (titulo, cab, filas) => `<div class="vis"><div class="vis-t"><i>▦</i>${titulo}</div><div class="ex-tab" style="--n:${cab.length}">${cab.map(c => `<div class="ex-th">${c}</div>`).join('')}${filas.map(f => f.map((c, i) => `<div class="${i ? 'ex-td' + (c.replace(/<[^>]+>/g, '').length <= 14 ? ' num' : '') : 'ex-tl'}">${c}</div>`).join('')).join('')}</div></div>`;
  const datos = (titulo, items) => `<div class="vis ex-datos"><div class="vis-t"><i>•</i>${titulo}</div><ul>${items.map(x => `<li>${x}</li>`).join('')}</ul></div>`;
  const ex = t => `<span class="ex-sello">EX</span>`;
  const bloque = t => `<div class="bloque-titulo">${t}</div>`;
  const trampa = t => `<div class="trampa"><b>⚠ Trampa de examen</b><p>${t}</p></div>`;

  // ---------- Exprés AUTOMÁTICO (temas cortos que ya tienen cuadros): párrafos literales con pregunta + cuadros del esquema ----------
  // V = [[cabecera de ficha, html del cuadro], …] tal como lo exporta visuales-tN.js. Recorre el esquema completo en orden y,
  // para cada ficha, pone sus párrafos ENTEROS que tienen pregunta (o marca EX) y debajo sus cuadros (con el subrayado del
  // usuario y las respuestas enlazadas a las preguntas de esa ficha). Los títulos de bloque solo salen si su bloque tiene algo.
  const conPreg = new Set(); Object.values(MAPA).concat(Object.keys(EXTRA)).forEach(p => { const [t, k, j] = p.split('-'); if (+t === T) conPreg.add(k + '-' + j); });
  const tok = t => new Set(limpia(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').split(/[^a-z0-9]+/).filter(w => w.length > 2 && !VACIAS.has(w)));
  const recogidas = new Set();   // ids cuya respuesta casa de verdad con una caja de un cuadro (no por defecto)
  function enlazaCuadro(h, k) {
    const f = fichas[k]; const cand = [];
    f.ps.forEach((p, j) => { const base = `${T}-${k}-${j}`; const sueltas = porSitio[base] || [];
      [...p.h.matchAll(/<mark class="m-resp">([\s\S]*?)<\/mark>/g)].forEach((m, n) => { const ids = porSitio[`${base}-${n}`] || EXTRA[`${base}-${n}`] || sueltas; if (ids.length) cand.push({ t: tok(m[1]), ids }); }); });
    const todas = [...new Set(cand.flatMap(c => c.ids))];
    return h.replace(/<mark class="m-resp">([\s\S]*?)<\/mark>/g, (all, t) => {
      const tv = tok(t); let best = null, bs = 0;
      cand.forEach(c => { let n = 0; tv.forEach(w => { if (c.t.has(w)) n++; }); const sc = tv.size ? n / Math.min(tv.size, Math.max(c.t.size, 1)) * (n / tv.size * 0.5 + 0.5) : 0; if (sc > bs) { bs = sc; best = c; } });
      const ids = best && bs >= 0.5 ? best.ids : todas;
      if (best && bs >= 0.5) best.ids.forEach(x => recogidas.add(x));
      return ids.length ? `<mark class="m-resp${ids.every(esIA) ? ' r-ia' : ''}"${q(ids)}>${t}</mark>` : all;
    });
  }
  // extras = { k: [ids] } → preguntas que el mapa no sitúa, asignadas a mano a la ficha k (botón «🎯 … más de este artículo»)
  // omitir = Set de k cuyos párrafos NO se ponen (los condensa un esquema propio), y/o 'conCuadro' = en las fichas con
  //          cuadro se quitan los párrafos cuyas preguntas ya responde el cuadro. Combinables: { fichas: Set, conCuadro: true }
  //          (para que un tema largo quepa en 17-20 págs); las preguntas de esos párrafos que el cuadro no recoja van a un 🎯
  const norm = t => ' ' + limpia(String(t)).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, ' ').trim() + ' ';
  const idsFicha = k =>Object.entries(MAPA).filter(([, p]) => p.startsWith(`${T}-${k}-`)).map(([id]) => id);
  // rango = [k0, k1] → solo esas fichas (para hacer en literal una parte de un tema redactado)
  function automatico(V, extras = {}, omitir = new Set(), rango) {
    const re = /<div class="bloque-titulo">([\s\S]*?)<\/div>|<div class="articulo">[\s\S]*?<div class="txt">[\s\S]*?<\/div>\s*(?:<div class="sello-examen">EX<\/div>)?\s*<\/div>\s*<\/div>/g;
    const puestos = new Set(); let m, k = -1, out = '', titulo = '';
    while ((m = re.exec(html))) {
      if (m[1] !== undefined) { titulo = bloque(m[1]); continue; }
      k++; const f = fichas[k]; const cab = limpia(f.cab);
      if (rango && (k < rango[0] || k > rango[1])) { titulo = ''; continue; }
      let cs = V.map((x, i) => [x, i]).filter(([[c], i]) => !puestos.has(i) && (cab.startsWith(c) || cab.includes(c)));
      const conCuadro = omitir === 'conCuadro' || !!(omitir && omitir.conCuadro);
      // el esquema condensado ('condensa') sustituye en el Exprés a los demás cuadros de su ficha
      if (cs.some(([x]) => x[2] === 'condensa')) { cs.filter(([x]) => x[2] !== 'condensa').forEach(([, i]) => puestos.add(i)); cs = cs.filter(([x]) => x[2] === 'condensa'); }
      let fuera = (omitir instanceof Set ? omitir : (omitir && omitir.fichas) || new Set()).has(k);
      // 'uno' (pauta 14/10/2026): O el literal O el cuadro, nunca los dos. Cuadro si contiene la respuesta de casi todas las
      // preguntas del artículo (≥ omitir.uno, p. ej. 0.8); si no, literal y el cuadro no sale
      if (omitir && omitir.uno && cs.length && !fuera) {
        const ids = idsFicha(k); const txt = norm(cs.map(([x]) => x[1]).join(' '));
        const dentro = ids.filter(id => { const x = PREG[id]; if (!x) return true; const w = norm(x.opciones[x.correcta]).split(' ').filter(p => p.length > 2); return !w.length || w.filter(p => txt.includes(p)).length / w.length >= 0.8; });
        if (ids.length && dentro.length / ids.length >= omitir.uno) fuera = true;
        else { cs.forEach(([, i]) => puestos.add(i)); cs = []; }
      }
      let js = fuera ? [] : f.ps.map((p, j) => j).filter(j => conPreg.has(k + '-' + j) || /data-ex|class="ex-p"/.test(f.ps[j].at + f.ps[j].h));
      if (!js.length && !cs.length && !extras[k]) continue;
      if (titulo) { out += titulo; titulo = ''; }
      const hc = cs.map(([[, h], i]) => { puestos.add(i); return enlazaCuadro(subraya(h), k); }).join('');
      // 'conCuadro': fuera los párrafos cuyas preguntas YA responde el cuadro (casan con una de sus cajas); se quedan los demás
      if (conCuadro && cs.length) js = js.filter(j => { const ids = Object.entries(MAPA).filter(([, p]) => p === `${T}-${k}-${j}` || p.startsWith(`${T}-${k}-${j}-`)).map(([id]) => id); return !ids.length || ids.some(id => !recogidas.has(id)) || /data-ex|class="ex-p"/.test(f.ps[j].at); });
      let extra = extras[k] || [];
      if (fuera) { const enC = new Set([...hc.matchAll(/data-q="([^"]+)"/g)].flatMap(x => x[1].split(','))); extra = [...new Set(extra.concat(idsFicha(k).filter(id => !enC.has(id))))]; }
      tieneCuadro = cs.length > 0;
      if (js.length) out += literal(k, js, null, extra);
      tieneCuadro = false;
      out += hc;
      if (!js.length && extra.length) out += `<div class="ex-linea">${limpia(f.cab)}: ${botonQ(extra, extra.length === 1 ? '1 pregunta más de este artículo' : extra.length + ' preguntas más de este artículo')}</div>`;
    }
    const sin = V.filter((x, i) => !puestos.has(i)).map(([c]) => c);
    if (sin.length) console.error('Cuadros sin ficha en el Exprés:', sin.join(' | '));
    return out;
  }

  // ---------- Preguntas sueltas (que ni el mapa ni las marcas sitúan): se asignan solas a su artículo ----------
  // Las preguntas empiezan «Norma. Título del artículo. Enunciado…»: si el título coincide con el de una ficha del bloque de esa norma
  // → EXTRAS de esa ficha (botón «🎯 … más de este artículo»); si no hay coincidencia segura → grupo «Norma · Título» al final del
  // Exprés con su botón 🎯 (nunca se pone una pregunta en un artículo que no es). htmlExpres = el HTML ya generado.
  function asignaSueltas(htmlExpres) {
    const enl = new Set([...htmlExpres.matchAll(/data-q="([^"]+)"/g)].flatMap(m => m[1].split(',')));
    // título del artículo de cada ficha (sin «Artículo N —» ni lo que va tras «·»), normalizado; solo vale si lo lleva UNA ficha
    const cabs = fichas.map(f => norm(limpia(f.cab).replace(/·.*$/, '').replace(/^.*?—\s*/, '')));
    const extras = {}, grupos = {};
    PA.preguntas(T).filter(x => !FUERA.has(x.id) && !enl.has(x.id)).forEach(x => {
      const segs = x.pregunta.split(/\.\s+/); const norma = segs[0], titulo = (segs[1] || '').trim(), nt = norm(titulo);
      const cand = nt.trim().split(' ').length >= 2 ? fichas.map((f, k) => k).filter(k => cabs[k] === nt) : [];
      if (cand.length === 1) (extras[cand[0]] = extras[cand[0]] || []).push(x.id);
      else { const g = norma.replace(/,\s*de\s.*$/, '') + ' · ' + (titulo || 'varias'); (grupos[g] = grupos[g] || []).push(x.id); }
    });
    const html = Object.keys(grupos).length ? bloque('Preguntas que no se pueden situar en un artículo concreto') + Object.entries(grupos).map(([g, ids]) => `<div class="ex-linea">${g}: ${botonQ(ids, ids.length === 1 ? '1 pregunta' : ids.length + ' preguntas')}</div>`).join('') : '';
    return { extras, html, n: Object.values(extras).flat().length, g: Object.values(grupos).flat().length };
  }

  // Preguntas que el mapa sitúa en las fichas [k0..k1] (para medir la cobertura de un bloque)
  const preguntasDe = (k0, k1) => Object.entries(MAPA).filter(([id, p]) => { const [t, k] = p.split('-'); return +t === T && +k >= k0 && +k <= k1; }).map(([id]) => id);

  // Escribe el exprés del tema en esquemas.html (<script id="expres-datos">) y devuelve la cobertura
  // ---------- Subrayado de los esquemas = el MISMO que el usuario tiene en el esquema completo ----------
  // Diccionario expresión → color sacado de las marcas de todas las fichas del tema; se aplica al texto de los
  // esquemas visuales (no a las fichas literales, que ya llevan su subrayado original).
  const COLORES = ['m-destacable', 'm-personalizado', 'm-autoridad', 'm-accion', 'm-plazo'];
  const limpia = t => t.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  const VACIAS = new Set('por de la el los las del al y e o u en que se a un una con su sus lo es le les como para sin más este esta estos estas ese esa otro otra otros otras sobre entre cada todo toda todos todas así'.split(' '));
  const dicc = (() => {
    const cuenta = {}; const suma = (frase, cls) => { const k = frase.toLowerCase(); if (!k || k.length < 2 || (cls !== 'm-clave' && k.split(/\s+/).every(w => VACIAS.has(w))) || (cls === 'm-clave' && k.split(/\s+/).every(w => VACIAS.has(w)) && !/^(no|ni|sin|solo|sólo)$/.test(k)) || /^[\W\d]+$/.test(k) && cls !== 'm-plazo') return; (cuenta[k] = cuenta[k] || {})[cls] = (cuenta[k][cls] || 0) + 1; };
    fichas.forEach(f => f.ps.forEach(p => {
      for (const m of p.h.matchAll(/<mark class="(m-[a-z]+)">((?:(?!<\/?mark)[\s\S])*?)<\/mark>/g)) if (COLORES.includes(m[1])) suma(limpia(m[2]).replace(/^[,.;:(…)\s]+|[,.;:(…)\s]+$/g, ''), m[1]);
      for (const m of p.h.matchAll(/<u class="m-clave">([\s\S]*?)<\/u>/g)) suma(limpia(m[1]).replace(/^[,.;:\s]+|[,.;:\s]+$/g, ''), 'm-clave');
    }));
    const marcas = [], claves = [];
    Object.entries(cuenta).forEach(([k, c]) => { const cls = Object.entries(c).sort((a, b) => b[1] - a[1])[0][0]; (cls === 'm-clave' ? claves : marcas).push([k, cls]); });
    const rx = l => l.length ? new RegExp('(?<![\\p{L}\\p{N}])(' + l.sort((a, b) => b[0].length - a[0].length).map(([k]) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+')).join('|') + ')(?![\\p{L}\\p{N}])', 'giu') : null;
    return { marcas: rx(marcas), claves: rx(claves), cls: Object.fromEntries(marcas), ncls: marcas.length + claves.length };
  })();
  // Recorre el HTML y aplica fn() solo al texto «libre» (fuera de marcas, títulos, cabeceras y <b>)
  function sobreTexto(html, fn, saltaMarcas) {
    const pila = []; let out = '';
    for (const tok of html.split(/(<[^>]+>)/)) {
      if (!tok) continue;
      if (tok[0] === '<') {
        const cierre = /^<\//.test(tok), auto = /\/>$|^<br/i.test(tok);
        if (cierre) pila.pop(); else if (!auto) pila.push(tok);
        out += tok; continue;
      }
      const bloqueado = pila.some(t => /^<(b|h5|small)\b/i.test(t) || /class="(vis-t|ex-th|ex-fh|ex-sello|et")/.test(t) || /^<mark class="m-resp/.test(t) || /^<u\b/.test(t) || (saltaMarcas && /^<mark/.test(t)));
      out += bloqueado ? tok : fn(tok);
    }
    return out;
  }
  function subraya(html) {
    // 1) fuera los colores puestos a mano / por reglas en los esquemas (se conservan respuestas, plazos y claves puestos a propósito)
    html = html.replace(/<mark class="m-(destacable|personalizado|autoridad|accion)">((?:(?!<\/?mark)[\s\S])*?)<\/mark>/g, '$2');
    // 2) colores del esquema del usuario
    if (dicc.marcas) html = sobreTexto(html, t => t.replace(dicc.marcas, w => `<mark class="${dicc.cls[w.toLowerCase().replace(/\s+/g, ' ')] || 'm-personalizado'}">${w}</mark>`), true);
    if (dicc.claves) html = sobreTexto(html, t => t.replace(dicc.claves, w => `<u class="m-clave">${w}</u>`), false);
    return html;
  }
  // Aplica subraya() a todo menos a las fichas literales
  const subrayaEsquemas = html => html.split(/(<div class="ex-ficha[\s\S]*?<div class="ex-fb">[\s\S]*?<\/div><\/div>)/).map((part, i) => i % 2 ? part : subraya(part)).join('');
  // % de caracteres subrayados (como densidad.js) del texto de los esquemas
  function densidad(html) {
    let col = 0, tot = 0;
    sobreTexto(html.replace(/<div class="ex-ficha[\s\S]*?<div class="ex-fb">[\s\S]*?<\/div><\/div>/g, ''), t => { tot += t.trim().length; return t; }, true);
    for (const m of html.replace(/<div class="ex-ficha[\s\S]*?<div class="ex-fb">[\s\S]*?<\/div><\/div>/g, '').matchAll(/<(mark|u)\b[^>]*>((?:(?!<\/?(?:mark|u)\b)[\s\S])*?)<\/\1>/g)) col += limpia(m[2]).length;
    return Math.round(100 * col / Math.max(1, col + tot));
  }

  function publica(htmlExpres, bloques) {
    htmlExpres = restaura(subrayaEsquemas(htmlExpres));
    console.log(`Subrayado de los esquemas copiado del tuyo: ${dicc.ncls} expresiones · ≈${densidad(htmlExpres)} % del texto de los esquemas coloreado`);
    const cob = bloques.map(b => { const ids = preguntasDe(b.k0, b.k1); const ok = ids.filter(i => usados.has(i));
      const peso = a => a.reduce((s, i) => s + (esIA(i) ? 1 : 3), 0);
      return { nombre: b.nombre, total: ids.length, ok: ok.length, pct: Math.round(100 * peso(ok) / Math.max(1, peso(ids))), faltan: ids.filter(i => !usados.has(i)) }; });
    let s = fs.readFileSync(ESQ, 'utf8');
    if (!s.includes('.ex-plg{')) s = s.replace('<style id="expres-style">', () => '<style id="expres-style">\n' + CSS_PLG);
    const m = s.match(/<script id="expres-datos">window\.EXPRES_T=(\{[\s\S]*?\});<\/script>/);
    const D = m ? JSON.parse(m[1]) : {};
    D[T] = { html: htmlExpres, cob: cob.map(({ nombre, total, ok, pct }) => ({ nombre, total, ok, pct })) };
    const tag = `<script id="expres-datos">window.EXPRES_T=${JSON.stringify(D)};</script>`;
    s = m ? s.replace(m[0], () => tag) : s.replace('<style id="expres-style">', () => tag + '\n<style id="expres-style">');
    fs.writeFileSync(ESQ, s);
    cob.forEach(c => console.log(`${c.nombre}: ${c.ok}/${c.total} preguntas enlazadas (${c.pct} % ponderado)${c.faltan.length ? ' · faltan: ' + c.faltan.join(', ') : ''}`));
    // respuestas fundidas por el coloreado (dos Rq seguidas separadas solo por un espacio): sus ids se pierden
    const perdidas = REG.filter(x => !htmlExpres.includes(x.m));
    if (perdidas.length) console.error(`AVISO: ${perdidas.length} respuestas se han fundido con la de al lado y han perdido su enlace (pon « · » u otra palabra entre dos Rq seguidas): ${perdidas.map(x => '«' + x.t.slice(0, 40) + '»').join(', ')}`);
    // comprobación final contra TODAS las preguntas del tema en la app (no solo las que el mapa sitúa)
    const test = fs.readFileSync(path.join(RAIZ, 'test-oficial-conocimiento.html'), 'utf8');
    const todas = [...new Set([...test.matchAll(new RegExp(`\\{"id":"(${T}-(?:ia-)?\\d+)"`, 'g'))].map(m => m[1]))].filter(i => !FUERA.has(i));
    if (FUERA.size) console.log(`Fuera del Exprés por tener como respuesta solo un artículo: ${FUERA.size} (${[...FUERA].join(', ')})`);
    const enlazadas = new Set([...htmlExpres.matchAll(/data-q="([^"]+)"/g)].flatMap(m => m[1].split(',')));
    const fuera = todas.filter(i => !enlazadas.has(i));
    console.log(`PREGUNTAS DEL TEMA EN LA APP CON ENLACE EN EL EXPRÉS: ${todas.length - fuera.length}/${todas.length}${fuera.length ? ' · sin enlace (añádelas con Rq): ' + fuera.join(', ') : ' ✔'}`);
    const chars = sinOcultos(htmlExpres).replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').length;
    console.log(`Texto del exprés: ${chars} caracteres ≈ ${(chars / 3000).toFixed(1)} págs A4`);
  }
  return { ...VL, fichaBloque, asignaSueltas, botonQ, opciones: OPC, final: h => restaura(subraya(h)), automatico, Rq, literal, parrafo, cuadro, datos, ex, bloque, trampa, publica, fichas };
};
