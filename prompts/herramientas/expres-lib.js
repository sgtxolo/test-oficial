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
  const restaura = html => html.replace(/<mark class="m-resp">([\s\S]*?)<\/mark>/g, (all, t) => { const tt = t.replace(/<[^>]+>/g, ''); const r = REG.find(x => x.t === tt) || REG.find(x => x.t.includes(tt) || tt.includes(x.t)); return r ? r.m + t + '</mark>' : all; });

  // Párrafo literal j de la ficha k, con sus marcas de respuesta enlazadas como en el esquema completo
  function parrafo(k, j) {
    const f = fichas[k]; const p = f.ps[j]; const base = `${T}-${k}-${j}`;
    const sueltas = porSitio[base] || [];
    let i = -1;
    const marks = [...p.h.matchAll(/<mark class="m-resp">/g)].map((_, n) => porSitio[`${base}-${n}`] || EXTRA[`${base}-${n}`] || sueltas);
    const out = p.h.replace(/<mark class="m-resp">/g, () => {
      i++; let ids = marks[i];
      for (let d = 1; !ids.length && d < marks.length; d++) ids = (marks[i - d] && marks[i - d].length) ? marks[i - d] : (marks[i + d] || []);
      return ids.length ? `<mark class="m-resp${ids.every(esIA) ? ' r-ia' : ''}"${q(ids)}>` : '<mark class="m-resp r-ia">';
    });
    sueltas.forEach(x => usados.add(x));
    return `<p${p.at}>${out}</p>`;
  }
  // Ficha literal: cabecera original (o la que se indique) + párrafos elegidos ENTEROS
  const literal = (k, js, cab) => {
    const f = fichas[k];
    return `<div class="ex-ficha${f.ex ? ' ex-of' : ''}"><div class="ex-fh">${cab || f.cab}${f.ex ? '<span class="ex-sello">EX</span>' : ''}</div><div class="ex-fb">${js.map(j => parrafo(k, j)).join('')}</div></div>`;
  };
  // Tabla de competencias / comparativa sencilla: filas [etiqueta, celda1, celda2…]
  const cuadro = (titulo, cab, filas) => `<div class="vis"><div class="vis-t"><i>▦</i>${titulo}</div><div class="ex-tab" style="--n:${cab.length}">${cab.map(c => `<div class="ex-th">${c}</div>`).join('')}${filas.map(f => f.map((c, i) => `<div class="${i ? 'ex-td' : 'ex-tl'}">${c}</div>`).join('')).join('')}</div></div>`;
  const datos = (titulo, items) => `<div class="vis ex-datos"><div class="vis-t"><i>•</i>${titulo}</div><ul>${items.map(x => `<li>${x}</li>`).join('')}</ul></div>`;
  const ex = t => `<span class="ex-sello">EX</span>`;
  const bloque = t => `<div class="bloque-titulo">${t}</div>`;
  const trampa = t => `<div class="trampa"><b>⚠ Trampa de examen</b><p>${t}</p></div>`;

  // Preguntas que el mapa sitúa en las fichas [k0..k1] (para medir la cobertura de un bloque)
  const preguntasDe = (k0, k1) => Object.entries(MAPA).filter(([id, p]) => { const [t, k] = p.split('-'); return +t === T && +k >= k0 && +k <= k1; }).map(([id]) => id);

  // Escribe el exprés del tema en esquemas.html (<script id="expres-datos">) y devuelve la cobertura
  function publica(htmlExpres, bloques) {
    htmlExpres = restaura(htmlExpres);
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
    const chars = htmlExpres.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').length;
    console.log(`Texto del exprés: ${chars} caracteres ≈ ${(chars / 3000).toFixed(1)} págs A4`);
  }
  return { ...VL, Rq, literal, parrafo, cuadro, datos, ex, bloque, trampa, publica, fichas };
};
