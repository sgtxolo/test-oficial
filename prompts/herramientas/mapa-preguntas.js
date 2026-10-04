// Relaciona cada pregunta de test con el párrafo exacto del esquema donde está su respuesta.
// Uso (desde la carpeta del proyecto):
//   node prompts/herramientas/mapa-preguntas.js            -> calcula, informa y escribe el mapa
//   node prompts/herramientas/mapa-preguntas.js --ver 5    -> además lista las asignaciones del tema 5
// Escribe:
//   esquemas.html                   -> <script id="mapa-preguntas">window.MAPA_PREG={"5-12":"5-30-2-1",...}</script>
//                                      (clave = id de la pregunta; valor = tema-ficha-párrafo[-respuesta], índices desde 0;
//                                       «respuesta» = n.º de <mark class="m-resp"> dentro del párrafo, si la pregunta casa con una)
//   test-oficial-conocimiento.html  -> <script id="esq-temas">window.ESQ_TEMAS=[1,2,...]</script>
// Volver a ejecutarlo SIEMPRE que se añada o cambie un esquema o se añadan preguntas.
const fs = require('fs');
const ESQ = 'esquemas.html', TEST = 'test-oficial-conocimiento.html';
const VER = process.argv.includes('--ver') ? process.argv[process.argv.indexOf('--ver') + 1] : null;

// ---------- 1. Cargar los esquemas (se evalúa su script con un DOM de mentira) ----------
function cargarEsquemas() {
  const h = fs.readFileSync(ESQ, 'utf8');
  const src = [...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(s => s.includes('temasPrograma'));
  const code = src.slice(0, src.search(/\nrender\(\);/)) + ';return esquemas;';
  const fake = () => new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? (() => '') : fake(), apply: () => fake(), set: () => true, construct: () => fake() });
  return new Function('document', 'window', 'localStorage', 'speechSynthesis', code)(fake(), fake(), fake(), fake());
}

// ---------- 2. Cargar las preguntas (oficiales + IA) ----------
function cargarPreguntas(tema) {
  const s = fs.readFileSync(TEST, 'utf8'); const BS = String.fromCharCode(92); const res = new Map();
  const re = new RegExp('\\{"id":"' + tema + '-[^"]*"', 'g'); let m;
  while ((m = re.exec(s))) {
    let d = 0, inS = false, esc = false, j = m.index;
    for (; j < s.length; j++) { const c = s[j]; if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
    try { const q = JSON.parse(s.slice(m.index, j + 1)); if (q.opciones) res.set(q.id, q); } catch (e) {}
  }
  return [...res.values()];
}

// ---------- 3. Utilidades de texto ----------
const norm = t => (t || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ/ ]/g, ' ').replace(/\s+/g, ' ').trim();
const STOP = new Set('para como sera seran esta este estos estas sobre entre todas todos ninguna correcta correctas incorrecta incorrectas anteriores opciones dicho dicha cuando desde hasta segun otros otras tiene haya sido debera podra podran del las los una uno por con que sus son sin mas ser cual cuales donde quien quienes respecto caso casos presente reglamento articulo ley señale senale opcion'.split(' '));
const toks = t => norm(t).split(' ').filter(w => (w.length >= 3 || /^\d/.test(w)) && !STOP.has(w));
const GENERICA = /^(todas|todos|ninguna|ambas|a y b|b y c|a y c|las dos|son correctas)/;
const normasDe = t => new Set((norm(t).match(/\d{1,4}\/\d{2,4}/g) || []));
function articulosDe(t) { // números de artículo citados («art. 39.2», «artículo 9 duodecies», «arts. 11 y 12»)
  const out = new Set(); const s = (t || '').replace(/<[^>]+>/g, ' ');
  for (const m of s.matchAll(/\b(?:art(?:í|i)culos?|arts?\.)\s*((?:\d+(?:\s*(?:bis|ter|quater|quinquies|sexies|septies|octies|nonies|decies|undecies|duodecies|terdecies))?(?:\.\d+)?(?:\s*(?:,|y|a)\s*)?)+)/gi))
    for (const n of m[1].matchAll(/\d+(?:\s*(?:bis|ter|quater|quinquies|sexies|septies|octies|nonies|decies|undecies|duodecies|terdecies))?/gi)) out.add(n[0].toLowerCase().replace(/\s+/g, ' '));
  return out;
}

// ---------- 4. Partir cada esquema en unidades (párrafos de cada ficha) ----------
function unidades(esq, tema) {
  const h = esq.html; const out = []; let bloque = '';
  const re = /<div class="bloque-titulo">([\s\S]*?)<\/div>|<div class="articulo">([\s\S]*?<div class="txt">([\s\S]*?)<\/div>\s*(?:<div class="sello-examen">EX<\/div>)?\s*<\/div>\s*<\/div>)/g;
  let m, k = -1;
  while ((m = re.exec(h))) {
    if (m[1] !== undefined) { bloque = norm(m[1]); continue; }
    k++;
    const cab = (m[2].match(/<div class="articulo-head">([\s\S]*?)<\/div>/) || [])[1] || '';
    const ps = [...m[3].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(x => x[1]);
    const partes = ps.length ? ps : [m[3]];
    const artsCab = articulosDe(cab.replace(/^(Art[íi]culos?)/i, 'artículo'));
    let artActual = artsCab.size === 1 ? [...artsCab] : [];
    partes.forEach((p, j) => {
      const lead = p.match(/^\s*<b>\s*(?:Art(?:í|i)culos?|Art\.)\s*([^<]*?)<\/b>/i);
      if (lead) { const a = articulosDe('art. ' + lead[1]); if (a.size) artActual = [...a]; }
      const marks = [...p.matchAll(/<mark class="m-resp">([\s\S]*?)<\/mark>/g)].map(x => ' ' + norm(x[1]) + ' ');
      const resp = marks.join(' ');
      out.push({ pid: `${tema}-${k}-${ps.length ? j : 'x'}`, cab: norm(cab), bloque, normas: normasDe(bloque + ' ' + cab),
        arts: new Set(artActual.length ? artActual : [...artsCab]), T: ' ' + norm(p) + ' ', R: ' ' + resp + ' ', marks });
    });
  }
  return out;
}

// ---------- 5. Puntuar ----------
function puntuar(q, u) {
  const correcta = q.opciones[q.correcta] || '';
  const generica = GENERICA.test(norm(correcta));
  // «Señale la INCORRECTA»: la opción marcada es la falsa; las verdaderas son las demás
  const inversa = /incorrect|no es correct|no es cierto|falsa|no corresponde|no sera|no podra|no figura|no se encuentra|no es una|no es un |no enviara|no se mencion|no se recoge|no se incluye|no aparece|no forma parte|no se contempla|no se prev|no es propio|no es funcion|no es competencia/i.test(q.pregunta || '');
  const variantes = [generica ? q.opciones.filter(o => !GENERICA.test(norm(o))).join(' ') : correcta];
  if (inversa) variantes.push(q.opciones.filter((o, i) => i !== q.correcta && !GENERICA.test(norm(o))).join(' '));
  const st = [...new Set(toks(q.pregunta))];
  const has = (S, w) => S.includes(' ' + w + ' ') || (w.length > 5 && S.includes(' ' + w.slice(0, w.length - 2)));
  let fR = 0, fT = 0;
  for (const v of variantes) {
    const at = [...new Set(toks(v))]; if (!at.length) continue;
    const r = at.filter(w => has(u.R, w)).length / at.length, t = at.filter(w => has(u.T, w)).length / at.length;
    if (3 * r + 2 * t > 3 * fR + 2 * fT) { fR = r; fT = t; }
  }
  const fS = st.length ? st.filter(w => has(u.T, w) || u.cab.includes(w)).length / st.length : 0;
  let s = 3 * fR + 2 * fT + 1.5 * fS;
  const qa = articulosDe(q.pregunta + ' ' + (q.explicacion || ''));
  if (qa.size && [...u.arts].some(a => qa.has(a))) s += 1.2;
  const qn = normasDe(q.pregunta + ' ' + (q.explicacion || '') + ' ' + (q.apartado || ''));
  if (qn.size && u.normas.size) s += [...qn].some(n => u.normas.has(n)) ? 0.8 : -0.8;
  // respuesta marcada concreta (índice del <mark class="m-resp"> dentro del párrafo) que mejor casa
  let mark = -1, mb = 0;
  for (const v of variantes) { const at = [...new Set(toks(v))]; if (!at.length) continue;
    u.marks.forEach((m, i) => { const f = at.filter(w => has(m, w)).length / at.length + 0.15 * at.filter(w => has(m, w)).length / Math.max(1, toks(m).length); if (f > mb) { mb = f; mark = i; } }); }
  return { s, fR, fT, mark: mb >= 0.25 ? mark : -1 };
}

// ---------- 6. Ejecutar ----------
const esquemas = cargarEsquemas();
const MAPA = {}; const EXTRA = {}; const temas = []; const TOTAL = {};
esquemas.forEach((e, i) => {
  const tema = i + 1; if (!e.html || !e.html.includes('class="articulo"')) return;
  temas.push(tema);
  const us = unidades(e, tema); const qs = cargarPreguntas(tema); TOTAL[tema] = qs.length;
  let ok = 0, flojas = [], sin = [], conMarca = 0;
  for (const q of qs) {
    let best = null, bs = -1, bf = null;
    for (const u of us) { const r = puntuar(q, u); if (r.s > bs) { bs = r.s; best = u; bf = r; } }
    if (!best || (bf.fR + bf.fT) < 0.34) { sin.push(q.id); continue; }
    MAPA[q.id] = bf.mark >= 0 ? best.pid + '-' + bf.mark : best.pid; ok++; if (bf.mark >= 0) conMarca++;
    if (bs < 2.2) flojas.push(q.id);
    if (VER == tema) console.log(q.id.padEnd(9), best.pid.padEnd(9), bs.toFixed(2), '| Q:', norm(q.pregunta).slice(-70), '| A:', norm(q.opciones[q.correcta]).slice(0, 50), '| P:', best.T.slice(0, 90));
  }
  // Segunda pasada: marcas de respuesta que ninguna pregunta ha reclamado -> la pregunta que mejor casa con ESA marca
  // (una pregunta puede ser la de varias marcas, p. ej. a) genocidio; b) lesa humanidad; c) guerra; d) agresión)
  const cubiertas = new Set(Object.values(MAPA).filter(v => v.startsWith(tema + '-')));
  let extras = 0;
  for (const u of us) {
    u.marks.forEach((mk, i) => {
      if (cubiertas.has(u.pid + '-' + i)) return;
      const mt = [...new Set(toks(mk))]; if (mt.length < 1) return;
      let mejor = null, ms = 0;
      for (const q of qs) {
        const r = puntuar(q, u); if ((r.fR + r.fT) < 0.5) continue;
        const correcta = q.opciones[q.correcta] || ''; const generica = GENERICA.test(norm(correcta));
        const vs = [generica ? q.opciones.filter(o => !GENERICA.test(norm(o))).join(' ') : correcta];
        if (/incorrect|no es correct|falsa|no figura|no se menciona|no corresponde/i.test(q.pregunta || '')) vs.push(q.opciones.filter((o, k) => k !== q.correcta).join(' '));
        let f = 0; for (const v of vs) { const at = [...new Set(toks(v))]; if (!at.length) continue;
          const c = at.filter(w => mk.includes(' ' + w + ' ') || (w.length > 5 && mk.includes(' ' + w.slice(0, w.length - 2)))).length;
          f = Math.max(f, c / at.length, c / mt.length * 0.9); }
        const sc = f + 0.3 * (r.fR + r.fT);
        if (f >= 0.6 && sc > ms) { ms = sc; mejor = q.id; }
      }
      if (mejor) { EXTRA[u.pid + '-' + i] = [mejor]; extras++; }
    });
  }
  console.log(`Tema ${tema}: ${qs.length} preguntas · ${ok} situadas · ${sin.length} sin sitio${sin.length ? ' (' + sin.slice(0, 12).join(', ') + (sin.length > 12 ? '…' : '') + ')' : ''} · ${conMarca} en su respuesta marcada · ${flojas.length} con coincidencia floja`);
});

// ---------- 7. Escribir ----------
const bloqueMapa = `<script id="mapa-preguntas">window.MAPA_PREG=${JSON.stringify(MAPA)};window.TOTAL_PREG=${JSON.stringify(TOTAL)};window.MAPA_EXTRA=${JSON.stringify(EXTRA)};</script>`;
let h = fs.readFileSync(ESQ, 'utf8');
h = /<script id="mapa-preguntas">[\s\S]*?<\/script>/.test(h) ? h.replace(/<script id="mapa-preguntas">[\s\S]*?<\/script>/, () => bloqueMapa) : h.replace('<script>\n// ---- ESQUEMAS ----', () => bloqueMapa + '\n<script>\n// ---- ESQUEMAS ----');
fs.writeFileSync(ESQ, h);
const bloqueTemas = `<script id="esq-temas">window.ESQ_TEMAS=${JSON.stringify(temas)};</script>`;
let t = fs.readFileSync(TEST, 'utf8');
t = /<script id="esq-temas">[\s\S]*?<\/script>/.test(t) ? t.replace(/<script id="esq-temas">[\s\S]*?<\/script>/, () => bloqueTemas) : t.replace(/<\/body>(?![\s\S]*<\/body>)/, () => bloqueTemas + '\n</body>');
fs.writeFileSync(TEST, t);
console.log('Marcas con pregunta propia añadidas:', Object.keys(EXTRA).length);
console.log('Mapa escrito:', Object.keys(MAPA).length, 'preguntas situadas · temas con esquema:', temas.join(', '));
