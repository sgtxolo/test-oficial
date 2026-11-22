/* Datos para las mejoras del Esquema clave NUEVO (repaso-tN-esquema-clave-nuevo.html + clave-mejoras.js). Uso: node prompts/herramientas/clave-mejoras-datos.js 4   (varios: ... 1 2 3 4)
   Genera, para cada tema N:
   1) clave-arts/tN.js   -> CLAVE_ART[N]: los artículos del Exprés (con el subrayado del usuario) que cita el esquema ("art. 13", "arts. 5-9"), agrupados por norma,
                            para que al pulsar la cita se despliegue el artículo dentro del esquema.
   2) clave-tests/tN-sec.js -> CLAVE_SEC[N]: ids de preguntas del test por cada <h2>/<h3> del esquema (en orden de documento, solo la parte anterior a #btnQ),
                            para los botones «🎯 Preguntas de esta parte». Aproximación por palabras (respuesta >= 70 %, enunciado >= 30 % dentro del bloque).
   3) clave-tests/tN-amar.js -> CLAVE_AMAR[N]: tríos de palabras (sin acentos) del esquema que salen en la respuesta correcta de preguntas de IA = subrayado AMARILLO
                            (importante, pero menos que lo que ha caído en examen). */
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..', '..') + '/';
const norm = t => t.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const STOP = new Set('para como esta este esos esas sobre entre desde hasta cuando donde segun sera seran podra podran todos todas cada otro otra otros otras estado estados miembro miembros reglamento articulo parte partes'.split(' '));
const words = t => [...new Set(norm(t).split(' ').filter(w => w.length >= 4 && !STOP.has(w)))];

/* grupos de normas en el Exprés: regex del título de bloque donde EMPIEZA cada norma (la primera empieza en el primer bloque) */
const STARTS = {
  1: [null, /LEY ORG/, /^1\.2 /, /FINALIDAD DEL CONSEJO/, /TÍTULO I\. DERECHOS Y LIBERTADES/, /^1\.6 /, /^ANEXO/],
  2: [null, /^2\.2 /, /^2\.3 /, /^2\.4 /, /^2\.5 /, /^2\.6 /, /^2\.7 /],
  3: [null, /^3\.2 /],
  5: [null, /^5\.2 /, /^5\.3 /, /^5\.5 /],
  6: [null, /\(arts\. 1 a 5\)/],   // LO 4/2000 (primeros 17 bloques del Exprés) | Ley 12/2009 (desde su Título preliminar «arts. 1 a 5»)
  9: [null, /^9\.2 /],   // LO 5/2005 | Directiva de Defensa Nacional 2020
  8: [null],   // LO 6/1985 del Poder Judicial: una sola norma (todo el Exprés es un único grupo)
  7: [null, /PREÁMBULO/],   // LO 2/1979 TC (bloques hasta el art. 58) | LO 1/1982 (desde «PREÁMBULO · CAPÍTULO I»)
  4: [null, /^4\.2 /, /^4\.3 /, /^4\.4 /, /^4\.5 /, /^4\.6 /, /^AMPLIACIONES/],
};
/* grupo de cada <h2> numerado "N.M" (por defecto M-1); excepciones por tema */
const H2G = { 3: [0, 0, 0, 1, 1, 1, 1], 5: [0, 1, 2, 3], 6: [0, 1], 7: [0, 1], 8: [0, 0, 0, 0, 0, 0, 0], 9: [0, 1] };

/* sufijos de artículo; la clave se guarda sin acento y en minúsculas: «35 quáter» -> «35quater».
   T1-T5 siguen con la lista corta (así sus datos ya generados salen idénticos); desde el T6 se reconocen también quáter, quinquies, sexies, octies… */
const SUF_CORTO = 'bis|ter|quater', SUF_LARGO = 'bis|ter|qu[aá]ter|quinquies|sexies|septies|octies|nonies|decies|undecies|duodecies|terdecies|quaterdecies|quinquiesdecies';
const CONN = '(?:\\s*,\\s*|\\s*[-–]\\s*|\\s+y\\s+|\\s+a\\s+)';
let SUF = SUF_CORTO, NUM, REF;
function ponSufijos(N) {
  SUF = N >= 6 ? SUF_LARGO : SUF_CORTO;
  NUM = '\\d+(?:\\.\\d+)?(?:\\s?(?:' + SUF + '))?';
  REF = new RegExp('\\b[Aa]rts?\\.\\s*(' + NUM + '(?:' + CONN + '(?=\\d)' + NUM + ')*)', 'g');
}
const SUFN = x => x.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
function expand(s) {
  const out = [];
  s = s.replace(/\.\d+/g, '').replace(/\sy\s/g, ',').replace(/\sa\s/g, '-').replace(/[–—]/g, '-');
  s.split(',').forEach(part => {
    part = part.trim();
    const r = part.match(new RegExp('^(\\d+)\\s*(' + SUF + ')?\\s*-\\s*(\\d+)', 'i'));
    if (r) { const a = +r[1], b = +r[3]; if (r[2]) out.push(a + SUFN(r[2])); for (let k = a + (r[2] ? 1 : 0); k <= Math.min(b, a + 80); k++) out.push(String(k)); }
    else { const m = part.match(new RegExp('^(\\d+)\\s*(' + SUF + ')?', 'i')); if (m) out.push(m[1] + (m[2] ? SUFN(m[2]) : '')); }
  });
  return out;
}

for (const N of process.argv.slice(2).map(Number).filter(Boolean)) {
  ponSufijos(N);
  const f = R + 'repaso-t' + N + '-esquema-clave-nuevo.html';
  if (!fs.existsSync(f)) { console.log('T' + N + ': no existe ' + f); continue; }
  const html = fs.readFileSync(f, 'utf8');
  const bq = html.indexOf('<button id="btnQ"'), main = html.slice(html.indexOf('<h2'), bq > 0 ? bq : undefined);

  /* ---------- 1) artículos ---------- */
  global.window = {}; eval(fs.readFileSync(R + 'expres/t' + N + '.js', 'utf8'));
  const ex = window.EXPRES_T[N].html, S = STARTS[N];
  const FICHAS = []; const re = /<div class="bloque-titulo"[^>]*>([\s\S]*?)<\/div>|<div class="ex-ficha">/g; let m, last = null;
  const marks = []; while ((m = re.exec(ex))) marks.push({ i: m.index, titulo: m[1] !== undefined ? m[1].replace(/<[^>]+>/g, '').trim() : null });
  let g = 0; const grupos = [{ t: '', a: {} }];
  marks.forEach((mk, idx) => {
    if (mk.titulo !== null) { for (let k = g + 1; k < S.length; k++) if (S[k] && S[k].test(mk.titulo)) { g = k; grupos[g] = grupos[g] || { t: mk.titulo, a: {} }; break; } if (!grupos[g].t) grupos[g].t = mk.titulo; return; }
    const fin = idx + 1 < marks.length ? marks[idx + 1].i : ex.length, ch = ex.slice(mk.i, fin);
    const fh = (ch.match(/<div class="ex-fh">([\s\S]*?)<\/div>/) || [])[1]; if (fh === undefined) return;
    const fb = ch.slice(ch.indexOf('<div class="ex-fb">') + 19).replace(/(<\/div>\s*){1,2}$/, '').replace(/ title="[^"]*"/g, '').replace(/ onclick="[^"]*"/g, '').replace(/ tabindex="0"/g, '');
    const head = fh.replace(/\s*[:·]?\s*🎯[^<]*/g, '').replace(/<button[\s\S]*?<\/button>/g, '').trim();
    let txt = head.replace(/<[^>]+>/g, ' ');
    if (N >= 6) txt = txt.replace(/\s+/g, ' ').trim();   // desde el T6: una cabecera con marcas dejaba un espacio inicial y la ficha se quedaba sin clave (T1-T5 no se tocan para que salgan idénticos)
    let keys = [];
    const pr = txt.match(/^Protocolo[^—]*?art\.\s*(\d+)/i);
    if (pr) keys = [pr[1]]; else { const a = txt.match(/^Art[íi]culos?\s+([^—]*?)\s+—/); if (a) keys = expand(a[1]); else if (N === 8) { const b = txt.match(/^Art[íi]culos?\s+(\d+(?:\s*(?:bis|ter|qu[aá]ter|quinquies|sexies|septies|octies|nonies|decies))?)(?![\wáéíóú])/i); if (b) keys = expand(b[1]); } }   // T8: las cabeceras del Exprés son «Artículo 22 bis EXOF ✱ R6» (sin raya)
    const fi = FICHAS.push([head, fb]) - 1; keys.forEach(k => { (grupos[g].a[k] = grupos[g].a[k] || []).push(fi); });
  });
  /* h2 -> grupo */
  const h2s = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(x => x[1].replace(/<[^>]+>/g, ' '));
  const h2g = h2s.map((t, i) => { const n = t.match(/^\s*\d+\.(\d+)\b/); if (!n) return -1; return H2G[N] ? H2G[N][i] : (+n[1] - 1); });
  /* citas por <h2> */
  const needed = grupos.map(() => new Set()); let n2 = -1;
  const secs = main.split(/(?=<h2[\s>])/);
  secs.forEach((sec, i) => {
    const gi = h2g[i]; const txt = sec.replace(/<[^>]+>/g, ' ');
    let r; REF.lastIndex = 0; const ks = [];
    while ((r = REF.exec(txt))) expand(r[1]).forEach(k => ks.push(k));
    ks.forEach(k => { if (gi >= 0) needed[gi].add(k); else grupos.forEach((_, j) => needed[j].add(k)); });
  });
  const outG = grupos.map((gr, j) => { const a = {}; needed[j].forEach(k => { if (gr.a[k]) a[k] = gr.a[k]; }); return { t: gr.t, a }; });
  const nArt = outG.reduce((s, x) => s + Object.keys(x.a).length, 0);
  const usados = [...new Set(outG.flatMap(x => Object.values(x.a).flat()))].sort((a, b) => a - b), remap = new Map(usados.map((x, i) => [x, i]));
  outG.forEach(x => Object.keys(x.a).forEach(k => { x.a[k] = x.a[k].map(i => remap.get(i)); }));
  fs.mkdirSync(R + 'clave-arts', { recursive: true });
  const cab = '/* generado por prompts/herramientas/clave-mejoras-datos.js; no editar a mano */\n';
  fs.writeFileSync(R + 'clave-arts/t' + N + '.js', cab + '(window.CLAVE_ART=window.CLAVE_ART||{})[' + N + ']=' + JSON.stringify({ h2g, g: outG }) + ';\n');
  fs.writeFileSync(R + 'clave-arts/t' + N + '-f.js', cab + '(window.CLAVE_ARTF=window.CLAVE_ARTF||{})[' + N + ']=' + JSON.stringify(usados.map(i => FICHAS[i])) + ';\n');

  /* ---------- 2) preguntas por bloque ---------- */
  global.window = {}; eval(fs.readFileSync(R + 'clave-tests/t' + N + '-todo.js', 'utf8'));
  const uniq = new Map(); (window.CLAVE_TODO[N] || []).forEach(gq => gq.q.forEach(q => uniq.set(q.i, q)));
  const bloques = []; const pos = [...main.matchAll(/<h([23])[\s>]/g)];
  pos.forEach((p, i) => bloques.push({ nivel: +p[1], w: new Set(words(main.slice(p.index, i + 1 < pos.length ? pos[i + 1].index : undefined))), ids: new Set() }));
  const all = new Set(words(main));
  uniq.forEach(q => {
    const wa = words(q.o[q.c] || ''), wq = words(q.p); if (!wa.length) return;
    bloques.forEach(b => { const sa = wa.filter(x => b.w.has(x)).length / wa.length, sq = wq.length ? wq.filter(x => b.w.has(x)).length / wq.length : 0; if (sa >= 0.7 && sq >= 0.3) b.ids.add(q.i); });
  });
  const ordena = ids => [...ids].sort((a, b) => (/-ia-/.test(a) ? 1 : 0) - (/-ia-/.test(b) ? 1 : 0));
  const h2sec = []; bloques.forEach(b => { if (b.nivel === 2) h2sec.push(new Set(b.ids)); else if (h2sec.length) b.ids.forEach(x => h2sec[h2sec.length - 1].add(x)); });
  let k2 = -1; const sec = bloques.map(b => { if (b.nivel === 2) { k2++; return ordena(h2sec[k2]); } return ordena(b.ids); });
  fs.writeFileSync(R + 'clave-tests/t' + N + '-sec.js', '/* generado por prompts/herramientas/clave-mejoras-datos.js; no editar a mano */\n(window.CLAVE_SEC=window.CLAVE_SEC||{})[' + N + ']=' + JSON.stringify(sec) + ';\n');

  /* ---------- 3) amarillo: tríos del esquema que salen en respuestas correctas de preguntas de IA ---------- */
  const triG = ws => { const o = []; for (let i = 0; i + 2 < ws.length; i++) o.push(ws.slice(i, i + 3)); return o; };
  const sig = w => w.length >= 4 && !STOP.has(w);
  const esq = new Set(triG(norm(main).split(' ')).map(x => x.join(' ')));
  const of = new Set(); const ia = new Set();
  uniq.forEach(q => { const t = norm(q.o[q.c] || '').split(' '); triG(t).forEach(x => { if (x.filter(sig).length < 2) return; const k = x.join(' '); if (!esq.has(k)) return; (/-ia-/.test(q.i) ? ia : of).add(k); }); });
  const amar = [...ia].filter(k => !of.has(k));
  fs.writeFileSync(R + 'clave-tests/t' + N + '-amar.js', '/* generado por prompts/herramientas/clave-mejoras-datos.js; no editar a mano */\n(window.CLAVE_AMAR=window.CLAVE_AMAR||{})[' + N + ']=' + JSON.stringify(amar) + ';\n');
  console.log('T' + N + ': artículos desplegables ' + nArt + ' (' + Math.round(fs.statSync(R + 'clave-arts/t' + N + '.js').size / 1024) + ' KB índice + fichas ' + Math.round(fs.statSync(R + 'clave-arts/t' + N + '-f.js').size / 1024) + ' KB) · bloques con preguntas ' + sec.filter(x => x.length).length + '/' + sec.length + ' · amarillo ' + amar.length + ' tríos');
}
