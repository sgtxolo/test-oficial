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
  const porSitio = {}; Object.entries(MAPA).forEach(([id, p]) => { if (p.startsWith(T + '-')) (porSitio[p] = porSitio[p] || []).push(id); });
  const fichas = [...html.matchAll(/<div class="articulo">([\s\S]*?<div class="txt">([\s\S]*?)<\/div>\s*(?:<div class="sello-examen">EX<\/div>)?\s*<\/div>\s*<\/div>)/g)]
    .map(m => ({ cab: (m[1].match(/<div class="articulo-head">([\s\S]*?)<\/div>/) || [])[1] || '', ex: /sello-examen/.test(m[0]),
      ps: [...m[2].matchAll(/<p([^>]*)>([\s\S]*?)<\/p>/g)].map(x => ({ at: x[1], h: x[2] })) }));
  const usados = new Set();               // ids de preguntas enlazadas en el exprés
  const esIA = id => /-ia-/.test(id);
  const q = (ids) => { ids.forEach(i => usados.add(i)); return ` data-q="${ids.join(',')}"${ids.every(esIA) ? ' title="Pulsa para repasar sus preguntas"' : ' title="Pulsa para repasar sus preguntas (hay oficiales)"'}`; };

  // Respuesta enlazada a sus preguntas
  const REG = [];
  const Rq = (txt, ids) => { const m = `<mark class="m-resp${ids.every(esIA) ? ' r-ia' : ''}"${q(ids)}>`; REG.push({ t: txt.replace(/<[^>]+>/g, ''), m }); return m + txt + '</mark>'; };
  // el coloreado automático (visuales-lib → reglas-color) reescribe las marcas sin atributos: se les devuelve su data-q
  // (en orden: la 1.ª aparición de un texto usa su 1.er registro, la 2.ª el 2.º…, para que dos respuestas iguales no se crucen)
  const restaura = html => { const usadas = new Set(); return html.replace(/<mark class="m-resp">([\s\S]*?)<\/mark>/g, (all, t) => {
    const tt = t.replace(/<[^>]+>/g, '');
    let k = REG.findIndex((x, i) => !usadas.has(i) && x.t === tt);
    if (k < 0) k = REG.findIndex((x, i) => !usadas.has(i) && (x.t.includes(tt) || tt.includes(x.t)));
    if (k < 0) k = REG.findIndex(x => x.t === tt);
    if (k < 0) return all; usadas.add(k); return REG[k].m + t + '</mark>'; }); };

  // Párrafo literal j de la ficha k, con sus marcas de respuesta enlazadas como en el esquema completo
  function parrafo(k, j) {
    const f = fichas[k]; const p = f.ps[j]; const base = `${T}-${k}-${j}`;
    const sueltas = porSitio[base] || [];
    let i = -1; const puestas = new Set();
    const marks = [...p.h.matchAll(/<mark class="m-resp">/g)].map((_, n) => porSitio[`${base}-${n}`] || EXTRA[`${base}-${n}`] || sueltas);
    const out = p.h.replace(/<mark class="m-resp">/g, () => {
      i++; let ids = marks[i];
      for (let d = 1; !ids.length && d < marks.length; d++) ids = (marks[i - d] && marks[i - d].length) ? marks[i - d] : (marks[i + d] || []);
      ids.forEach(x => puestas.add(x));
      return ids.length ? `<mark class="m-resp${ids.every(esIA) ? ' r-ia' : ''}"${q(ids)}>` : '<mark class="m-resp r-ia">';
    });
    // preguntas del párrafo que ninguna marca recoge (párrafo sin respuesta marcada): botón 🎯 al final que las abre
    const resto = sueltas.filter(x => !puestas.has(x));
    const boton = resto.length ? ` <mark class="m-resp ex-q${resto.every(esIA) ? ' r-ia' : ''}"${q(resto)}>🎯 ${resto.length === 1 ? '1 pregunta' : resto.length + ' preguntas'}</mark>` : '';
    return `<p${p.at}>${out}${boton}</p>`;
  }
  // Ficha literal: cabecera original (o la que se indique) + párrafos elegidos ENTEROS
  const literal = (k, js, cab) => {
    const f = fichas[k];
    return `<div class="ex-ficha${f.ex ? ' ex-of' : ''}"><div class="ex-fh">${cab || f.cab}${f.ex ? '<span class="ex-sello">EX</span>' : ''}</div><div class="ex-fb">${js.map(j => parrafo(k, j)).join('')}</div></div>`;
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
  function enlazaCuadro(h, k) {
    const f = fichas[k]; const cand = [];
    f.ps.forEach((p, j) => { const base = `${T}-${k}-${j}`; const sueltas = porSitio[base] || [];
      [...p.h.matchAll(/<mark class="m-resp">([\s\S]*?)<\/mark>/g)].forEach((m, n) => { const ids = porSitio[`${base}-${n}`] || EXTRA[`${base}-${n}`] || sueltas; if (ids.length) cand.push({ t: tok(m[1]), ids }); }); });
    const todas = [...new Set(cand.flatMap(c => c.ids))];
    return h.replace(/<mark class="m-resp">([\s\S]*?)<\/mark>/g, (all, t) => {
      const tv = tok(t); let best = null, bs = 0;
      cand.forEach(c => { let n = 0; tv.forEach(w => { if (c.t.has(w)) n++; }); const sc = tv.size ? n / Math.min(tv.size, Math.max(c.t.size, 1)) * (n / tv.size * 0.5 + 0.5) : 0; if (sc > bs) { bs = sc; best = c; } });
      const ids = best && bs >= 0.5 ? best.ids : todas;
      return ids.length ? `<mark class="m-resp${ids.every(esIA) ? ' r-ia' : ''}"${q(ids)}>${t}</mark>` : all;
    });
  }
  function automatico(V) {
    const re = /<div class="bloque-titulo">([\s\S]*?)<\/div>|<div class="articulo">[\s\S]*?<div class="txt">[\s\S]*?<\/div>\s*(?:<div class="sello-examen">EX<\/div>)?\s*<\/div>\s*<\/div>/g;
    const puestos = new Set(); let m, k = -1, out = '', titulo = '';
    while ((m = re.exec(html))) {
      if (m[1] !== undefined) { titulo = bloque(m[1]); continue; }
      k++; const f = fichas[k]; const cab = limpia(f.cab);
      const js = f.ps.map((p, j) => j).filter(j => conPreg.has(k + '-' + j) || /data-ex|class="ex-p"/.test(f.ps[j].at + f.ps[j].h));
      const cs = V.map((x, i) => [x, i]).filter(([[c], i]) => !puestos.has(i) && (cab.startsWith(c) || cab.includes(c)));
      if (!js.length && !cs.length) continue;
      if (titulo) { out += titulo; titulo = ''; }
      if (js.length) out += literal(k, js);
      cs.forEach(([[, h], i]) => { puestos.add(i); out += enlazaCuadro(subraya(h), k); });
    }
    const sin = V.filter((x, i) => !puestos.has(i)).map(([c]) => c);
    if (sin.length) console.error('Cuadros sin ficha en el Exprés:', sin.join(' | '));
    return out;
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
    const m = s.match(/<script id="expres-datos">window\.EXPRES_T=(\{[\s\S]*?\});<\/script>/);
    const D = m ? JSON.parse(m[1]) : {};
    D[T] = { html: htmlExpres, cob: cob.map(({ nombre, total, ok, pct }) => ({ nombre, total, ok, pct })) };
    const tag = `<script id="expres-datos">window.EXPRES_T=${JSON.stringify(D)};</script>`;
    s = m ? s.replace(m[0], () => tag) : s.replace('<style id="expres-style">', () => tag + '\n<style id="expres-style">');
    fs.writeFileSync(ESQ, s);
    cob.forEach(c => console.log(`${c.nombre}: ${c.ok}/${c.total} preguntas enlazadas (${c.pct} % ponderado)${c.faltan.length ? ' · faltan: ' + c.faltan.join(', ') : ''}`));
    // comprobación final contra TODAS las preguntas del tema en la app (no solo las que el mapa sitúa)
    const test = fs.readFileSync(path.join(RAIZ, 'test-oficial-conocimiento.html'), 'utf8');
    const todas = [...new Set([...test.matchAll(new RegExp(`\\{"id":"(${T}-(?:ia-)?\\d+)"`, 'g'))].map(m => m[1]))];
    const enlazadas = new Set([...htmlExpres.matchAll(/data-q="([^"]+)"/g)].flatMap(m => m[1].split(',')));
    const fuera = todas.filter(i => !enlazadas.has(i));
    console.log(`PREGUNTAS DEL TEMA EN LA APP CON ENLACE EN EL EXPRÉS: ${todas.length - fuera.length}/${todas.length}${fuera.length ? ' · sin enlace (añádelas con Rq): ' + fuera.join(', ') : ' ✔'}`);
    const chars = htmlExpres.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').length;
    console.log(`Texto del exprés: ${chars} caracteres ≈ ${(chars / 3000).toFixed(1)} págs A4`);
  }
  return { ...VL, final: h => restaura(subraya(h)), automatico, Rq, literal, parrafo, cuadro, datos, ex, bloque, trampa, publica, fichas };
};
