// «Sin sitio» clase 1 (pauta 25/10/2026): el esquema tiene la ficha pero con «(…)» o sin el apartado que contesta la pregunta.
// Localiza, para cada pregunta sin sitio de un tema, el pasaje LITERAL del temario que la contesta y el hueco «(…)» del esquema que lo
// debería contener; con --aplicar rellena ese hueco con el texto literal (el resto de «(…)» se respetan).
// Uso: node prompts/herramientas/restaura-sinsitio.js N [--aplicar] [--ids a,b,c] [--json salida.json]
//   Sin --aplicar solo informa (clasificación): huecos «(…)» rellenables / lead-in presente sin hueco / artículo ausente.
// Fuente del literal: prompts/temario-limpio/temaN/temario.txt (OCR del temario oficial; se limpia con arregla()).
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..'); process.chdir(RAIZ);
const N = +process.argv[2]; const APLICAR = process.argv.includes('--aplicar');
const IDS = process.argv.includes('--ids') ? process.argv[process.argv.indexOf('--ids') + 1].split(',') : null;
const src = fs.readFileSync('prompts/herramientas/mapa-preguntas.js', 'utf8');
const ESQ = 'esquemas.html', TEST = 'test-oficial-conocimiento.html';
eval(src.slice(src.indexOf('// ---------- 1.'), src.indexOf('// ---------- 5.')).replace(/^const /gm, 'var '));

// ---- temario limpio y su versión normalizada con mapa de posiciones ----
const dir = `prompts/temario-limpio/tema${N}`;
const FILES = fs.readdirSync(dir).filter(f => f === 'temario.txt' || /^upd.*\.txt$/.test(f) || (!fs.existsSync(path.join(dir, 'temario.txt')) && f.endsWith('.txt')));
let RAW = '';
for (const f of FILES) RAW += '\n' + fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r\n?/g, '\n').replace(/[\u0007\u0000]/g, '').replace(/[ -​   　]/g, ' ').replace(/­/g, '');
const PIE = /derechos reservados|^TEMARIO DE|^TOMO \d|^T\d+ [A-ZÁÉÍÓÚ]|^A OFICIAL$|^ASCENSO$|^\d+ \|/i;
RAW = RAW.split('\n').filter(l => !PIE.test(l.trim())).join('\n');
RAW = RAW.replace(/-\n(?=[a-zñáéíóú])/g, '');            // guion de fin de línea
const arregla = t => t.replace(/\s*\n\s*/g, ' ').replace(/(^|[\s(«])([B-DF-NP-TV-XZÁÉÍÓÚÑ]) (?=[a-záéíóúñ])/g, '$1$2').replace(/(^|[\s(«])E (?=[a-záéíóúñ])/g, '$1E').replace(/\s{2,}/g, ' ').replace(/\s+([,.;:])/g, '$1').trim();
const NM = []; let NS = '';                               // NS = texto normalizado (a-z0-9), NM[i] = índice en RAW
const fold = c => c.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
for (let i = 0; i < RAW.length; i++) { const f = fold(RAW[i]); for (const ch of f) if (/[a-z0-9]/.test(ch)) { NS += ch; NM.push(i); } }
const nz = t => fold(t.replace(/<[^>]+>/g, ' ')).replace(/[^a-z0-9]/g, '');

// ---- esquema: párrafos con su ficha ----
const esq = cargarEsquemas()[N - 1]; const H = esq.html;
const qs = cargarPreguntas(N);
const mapa = JSON.parse(fs.readFileSync(ESQ, 'utf8').match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
let sin = qs.filter(q => !(q.id in mapa)); if (IDS) sin = qs.filter(q => IDS.includes(q.id));
const unid = unidades(esq, N);
const UN = unid.map(u => ({ pid: u.pid, nz: u.T.replace(/ /g, '') }));

const GEN = /^(todas|todos|ninguna|ambas|a y b|b y c|a y c|las dos|son correctas|las opciones a y b)/i;
const out = [];
for (const q of sin) {
  const ok = q.opciones[q.correcta] || ''; const A = nz(ok); const S = nz(q.pregunta.split(/[.:?] /).slice(-1)[0]);
  const r = { id: q.id, ok, estado: '' };
  if (GEN.test(ok.trim()) || /\bcorrectas?\b/i.test(ok) && ok.length < 60) { r.estado = 'clase3'; out.push(r); continue; }
  // posición del pasaje en el temario: «cola del enunciado + respuesta» contiguos
  let pos = -1, len = 0;
  const tail = S.slice(-24);
  if (tail.length >= 16 && A.length) { const k = NS.indexOf(tail + A.slice(0, 20)); if (k >= 0) { pos = k + tail.length; len = A.length; } }
  if (pos < 0 && A.length >= 24) { const k = NS.indexOf(A.slice(0, 40)); if (k >= 0 && NS.indexOf(A.slice(0, 40), k + 1) < 0) { pos = k; len = A.length; } }
  if (pos < 0 && A.length >= 24) { const k = NS.indexOf(A.slice(0, 24)); if (k >= 0) { pos = k; len = A.length; } }
  if (pos < 0) { // ventanas sueltas de la respuesta y del final del enunciado (el OCR puede romper palabras)
    const cand = []; for (const off of [10, 25, 40, 60]) if (A.length >= off + 22) cand.push([A.slice(off, off + 22), 0]); for (const off of [22, 44, 66]) if (S.length >= off) cand.push([S.slice(S.length - off, S.length - off + 22), 0]);
    for (const [w] of cand) { const k = NS.indexOf(w); if (k >= 0 && NS.indexOf(w, k + 1) < 0) { pos = k; len = Math.max(30, Math.min(A.length, 60)); break; } }
  }
  if (pos < 0) { r.estado = 'no-en-temario'; out.push(r); continue; }
  r.raw0 = NM[pos]; r.raw1 = NM[Math.min(NM.length - 1, pos + len - 1)] + 1;
  // ¿la respuesta ya está en una unidad del esquema?
  if (UN.some(u => u.nz.includes(A.slice(0, 30)) && A.length >= 24 && u.nz.includes(A.slice(-24)))) { r.estado = 'clase2-texto-presente'; out.push(r); continue; }
  // lead-in: los 30 caracteres normalizados anteriores a la respuesta en el temario, ¿están en alguna unidad?
  const lead = NS.slice(Math.max(0, pos - 30), pos);
  const u = UN.filter(x => lead.length >= 20 && x.nz.includes(lead));
  r.lead = u.map(x => x.pid); r.estado = u.length ? 'lead-presente' : 'sin-lead'; out.push(r);
}
const cnt = {}; out.forEach(r => (cnt[r.estado] = cnt[r.estado] || []).push(r.id)); for (const k in cnt) console.log(k, cnt[k].length, cnt[k].join(' '));
if (process.argv.includes('--json')) fs.writeFileSync(process.argv[process.argv.indexOf('--json') + 1], JSON.stringify(out, null, 1));
module.exports = { out, RAW, NS, NM, nz, arregla };

// =====================================================================================================================
// Fase 2: PLAN y APLICACIÓN para los «sin-lead» / «lead-presente» (artículo o apartado ausente del esquema).
// Se añade el APARTADO LITERAL que contiene la respuesta (o el artículo entero si no tiene apartados numerados) a la ficha del mismo
// artículo (tras su último párrafo) o, si no hay ficha, como ficha nueva antes de la primera ficha de la norma con artículo mayor.
// Uso: node prompts/herramientas/restaura-sinsitio.js N --plan                     (informa)
//      node prompts/herramientas/restaura-sinsitio.js N --aplicar <subrayado.json>  (escribe esquemas.html; idempotente)
// Rangos de páginas del PDF por norma: prompts/herramientas/temaN/rangos-pdf.json = {"T2_LEY19":[15,20],...}
// =====================================================================================================================
if (process.argv.includes('--plan') || process.argv.includes('--aplicar')) fase2();
function fase2() {
  const cp = require('child_process');
  let s = fs.readFileSync(ESQ, 'utf8');
  const marcas = [...s.matchAll(/\/\* (T\d+_[A-Z0-9]+) \*\/ T\d+\.\w+ = bloqueTitulo\("([^"]*)"/g)].filter(m => m[1].startsWith('T' + N + '_')).map(m => ({ k: m[1], tit: m[2], i: m.index }));
  if (!marcas.length) throw new Error('sin marcadores T' + N + '_*');
  const sigT = s.indexOf('/* T' + (N + 1) + '_', marcas[0].i); const finT = sigT >= 0 ? sigT : s.length;
  marcas.forEach((m, i) => { m.fin = i + 1 < marcas.length ? marcas[i + 1].i : finT; });
  const norm2 = x => fold(x).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  const bloqueDe = q => {
    const t = new Set(norm2(q.pregunta.slice(0, 200)).split(' ').filter(w => w.length > 3)); let best = null, bs = -1;
    for (const m of marcas) { if (/RECUERDA/.test(m.tit)) continue; const w = norm2(m.tit).split(' ').filter(x => x.length > 3); const sc = w.filter(x => t.has(x)).length / Math.max(1, w.length); if (sc > bs) { bs = sc; best = m; } }
    return best;
  };
  const HDR = [...RAW.matchAll(/\n[ \t]*(ARTÍCULO\s+(\d+(?:\s*(?:BIS|TER|QUATER|QUINQUIES|SEXIES|SEPTIES|OCTIES|NONIES|DECIES))?)\b[.\s]*([^\n]*)|DISPOSICIÓN\s+(?:ADICIONAL|TRANSITORIA|FINAL|DEROGATORIA)[^\n]*)/g)]
    .map(m => ({ i: m.index + 1, num: (m[2] || '').toLowerCase().replace(/\s+/g, ' '), tit: (m[3] || m[1]).trim(), esDA: !m[2] }));
  const cabDe = pos => { let a = -1; for (let i = 0; i < HDR.length; i++) if (HDR[i].i <= pos) a = i; else break; return a; };
  const cap = t => { t = t.replace(/\.\s*$/, '').toLowerCase(); return t.charAt(0).toUpperCase() + t.slice(1); };
  const items = out.filter(r => r.estado === 'sin-lead' || r.estado === 'lead-presente');
  const plan = {};
  for (const r of items) {
    const q = qs.find(x => x.id === r.id); const bl = bloqueDe(q); const hi = cabDe(r.raw0); if (hi < 0) { r.estado = 'sin-cabecera'; continue; }
    const h = HDR[hi], h2 = HDR[hi + 1]; const a0 = h.i, a1 = h2 ? h2.i : RAW.length; const art = RAW.slice(a0, a1);
    const mk = [...art.matchAll(/(?:^|\n)[ \t]*(\d{1,2})\.[ \t]+(?=\S)/g)].map(m => ({ n: +m[1], i: m.index + (m[0].startsWith('\n') ? 1 : 0) }));
    { const l1 = art.indexOf('\n'); const m1 = (l1 < 0 ? art : art.slice(0, l1)).match(/\s(1)\.[ \t]+(?=\S)/); if (m1 && !h.esDA) mk.unshift({ n: 1, i: m1.index + 1 }); }
    let ap0 = 0, ap1 = art.length, apN = null;
    const rel = r.raw0 - a0; const prev = mk.filter(m => m.i <= rel);
    if (!h.esDA && mk.length > 1 && prev.length) { const p = prev[prev.length - 1]; ap0 = p.i; apN = p.n; const nx = mk.find(m => m.i > p.i); ap1 = nx ? nx.i : art.length; }
    const clave = bl.k + '|' + (h.esDA ? h.tit : h.num) + '|' + (apN || 0);
    (plan[clave] = plan[clave] || { bl, hi, h, apN, ap0, ap1, art, a0, ids: [] }).ids.push(r.id);
  }
  const fichasDe = bl => { const lines = []; const seg = s.slice(bl.i, bl.fin); const re = /^  \+ articuloResp\("((?:[^"\\\n]|\\.)*)"/gm; let m; while ((m = re.exec(seg))) lines.push({ cab: m[1], ini: bl.i + m.index }); return lines; };
  const nums = cab => {
    if (!/^Art[íi]culos?\s/i.test(cab)) return []; // «Preámbulo de la Ley 10/2010», «Disposición adicional…» no son artículos
    const h = cab.split(' — ')[0]; const res = []; const t = h.replace(/Art[íi]culos?/i, '').replace(/·.*/, '');
    const re = /(\d+(?:\s*(?:bis|ter|quater|quinquies|sexies|septies|octies))?)(?:\s*a\s*(\d+))?/gi; let m;
    while ((m = re.exec(t))) { const a = m[1].toLowerCase().replace(/\s+/g, ' '); if (m[2]) { for (let x = parseInt(a); x <= +m[2]; x++) res.push(String(x)); } else res.push(a); }
    return res;
  };
  let pl = Object.values(plan);
  { // sin ficha del artículo en el esquema → se añade el artículo ENTERO una sola vez
    const uno = {};
    pl.forEach(g => { const fich = !g.h.esDA && fichasDe(g.bl).find(f => nums(f.cab).includes(g.h.num)); if (fich) return; g.apN = null; const k = g.bl.k + '|' + (g.h.esDA ? g.h.tit : g.h.num); if (uno[k]) { uno[k].ids.push(...g.ids); g.vacio = true; } else uno[k] = g; });
    pl = pl.filter(g => !g.vacio);
  }
  const nuevoTexto = g => { const full = g.apN == null; let raw = full ? g.art : g.art.slice(g.ap0, g.ap1); if (full && !g.h.esDA) { // quita el encabezado «ARTÍCULO N. TÍTULO EN MAYÚSCULAS.» (el texto puede empezar en la misma línea)
      const tk = [...raw.matchAll(/\S+/g)]; let cut = 0;
      for (let i = 2; i < tk.length; i++) { const w = tk[i][0]; if (/[a-záéíóúñ]/.test(w) || (/^\d{1,2}\.$/.test(w) && /\.$/.test(tk[i - 1][0]))) { cut = tk[i].index; break; } }
      raw = raw.slice(cut);
    } else if (full) raw = raw.replace(/^DISPOSICIÓN\s+\S+\s+\S+?\.\s*/, ''); return arregla(raw); };
  // huecos «(…)» de un párrafo del esquema que cubre el temario que contiene la respuesta (RAW/NS/NM)
  const nsDesdeRaw = r => { let lo = 0, hi = NM.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (NM[m] < r) lo = m + 1; else hi = m; } return lo; };
  const buscaGaps = (g, fich) => {
    const e = s.indexOf('\n', fich.ini); const L = s.slice(fich.ini, e); const ps = []; const rx = /<p(?: [^>]*)?>[\s\S]*?<\/p>/g; let m;
    while ((m = rx.exec(L))) ps.push(m[0]);
    const lead = nz(nuevoTexto(g)).replace(/^\d{1,2}/, '').slice(0, 30);
    const pi = ps.findIndex(p => nz(p.replace(/\\"/g, '"')).includes(lead)); if (pi < 0) return null;
    const pieces = ps[pi].split('(…)'); if (pieces.length < 2) return { pi, gaps: [] };
    const base = nsDesdeRaw(g.a0 + (g.apN != null ? g.ap0 : 0)); const finRaw = g.a0 + (g.apN != null ? g.ap1 : g.art.length);
    const gaps = []; let cursor = base;
    for (let i = 0; i < pieces.length - 1; i++) {
      const tail = nz(pieces[i]).slice(-30); const head = nz(pieces[i + 1]).slice(0, 30);
      if (tail.length < 12) { continue; }
      const it = NS.indexOf(tail, Math.max(0, cursor - 60)); if (it < 0 || NM[it] > finRaw) continue;
      const startRaw = NM[it + tail.length - 1] + 1; cursor = it + tail.length;
      let endRaw;
      if (head.length >= 12) { const ih = NS.indexOf(head, cursor); if (ih < 0 || NM[ih] > finRaw + 50) continue; endRaw = NM[ih]; cursor = ih; } else endRaw = finRaw;
      gaps.push({ n: i, start: startRaw, end: endRaw, fill: arregla(RAW.slice(startRaw, endRaw)) });
    }
    return { pi, gaps };
  };
  console.log('\nPLAN fase 2 (' + pl.length + ' grupos):');
  for (const g of pl) {
    const fl = fichasDe(g.bl); const key = g.h.num;
    const fich = !g.h.esDA && fl.find(f => nums(f.cab).includes(key));
    g.dest = fich ? { tipo: 'append', cab: fich.cab } : { tipo: 'ficha' };
    { const fp = fold(s.slice(g.bl.i, g.bl.fin).replace(/<[^>]+>/g, '').replace(/\\"/g, '"')).replace(/[^a-z0-9]/g, ''); const t0 = nz(nuevoTexto(g)).replace(/^\d{1,2}/, ''); g.dup = t0.length > 50 && fp.includes(t0.slice(0, 40)); }
    if (g.dup && fich) {
      const rr = g.ids.map(id => out.find(x => x.id === id));
      const bg = buscaGaps(g, fich);
      if (bg && bg.gaps.length) {
        g.gaps = bg.gaps.filter(h => rr.some(r => r.raw0 >= h.start - 3 && r.raw1 <= h.end + 3)); g.pIdx = bg.pi;
        for (const h of g.gaps) { // solo la(s) frase(s) que contienen la respuesta; el resto del hueco sigue como «(…)»
          const cov = rr.filter(r => r.raw0 >= h.start - 3 && r.raw1 <= h.end + 3); const lo = Math.min(...cov.map(r => r.raw0)), hi = Math.max(...cov.map(r => r.raw1));
          let b0 = lo; while (b0 > h.start) { if (/[.;]/.test(RAW[b0 - 2]) && /\s/.test(RAW[b0 - 1])) break; b0--; }
          let b1 = hi; while (b1 < h.end) { if (/[.;]/.test(RAW[b1 - 1]) && /\s/.test(RAW[b1])) break; b1++; }
          if (h.end - h.start <= 450) { h.fillMin = h.fill; h.izq = false; h.dcha = false; }
          else { h.fillMin = arregla(RAW.slice(b0, b1)); h.izq = b0 > h.start + 3 && RAW.slice(h.start, b0).trim().length > 2; h.dcha = b1 < h.end - 3 && RAW.slice(b1, h.end).trim().length > 2; }
        }
      }
      if ((!g.gaps || !g.gaps.length) && bg && bg.pi >= 0) { // sin «(…)» que la cubra: se añade al final del párrafo la frase de la respuesta, tras un «(…)»
        const lo = Math.min(...rr.map(r => r.raw0)), hi = Math.max(...rr.map(r => r.raw1)); const ini0 = g.a0 + (g.apN != null ? g.ap0 : 0), fin0 = g.a0 + (g.apN != null ? g.ap1 : g.art.length);
        if (lo >= ini0 - 3 && hi <= fin0 + 3) {
          let b0 = lo; while (b0 > ini0) { if (/[.;]/.test(RAW[b0 - 2]) && /\s/.test(RAW[b0 - 1])) break; b0--; }
          let b1 = hi; while (b1 < fin0) { if (/[.;]/.test(RAW[b1 - 1]) && /\s/.test(RAW[b1])) break; b1++; }
          const fillC = arregla(RAW.slice(b0, b1)); const fpB = fold(s.slice(g.bl.i, g.bl.fin).replace(/<[^>]+>/g, '').replace(/\\"/g, '"')).replace(/[^a-z0-9]/g, '');
          if (!fpB.includes(nz(fillC).slice(0, 50))) g.cola = { pi: bg.pi, fill: fillC };
        }
      }
    }
    console.log(`${g.dup ? (g.gaps && g.gaps.length ? 'GAP ' : g.cola ? 'COLA' : 'DUP?') : ''}  ${g.bl.k} · ${g.h.esDA ? g.h.tit.slice(0, 40) : 'art. ' + key}${g.apN ? '.' + g.apN : ' (entero)'} → ${fich ? 'añadir a «' + fich.cab.slice(0, 50) + '»' : 'FICHA NUEVA'} · ${g.ids.join(',')}`);
  }
  pl.filter(g => g.gaps && g.gaps.length).forEach(g => g.gaps.forEach(h => console.log(`     hueco ${g.h.num}.${g.apN || ''} #${h.n}: ${h.izq ? '(…) ' : ''}${h.fillMin.slice(0, 200)}${h.fillMin.length > 200 ? '… (' + h.fillMin.length + ')' : ''}${h.dcha ? ' (…)' : ''}`)));
  out.filter(r => r.estado === 'sin-cabecera').forEach(r => console.log('  sin cabecera:', r.id));
  if (!process.argv.includes('--aplicar')) return;
  const SUB = process.argv[process.argv.indexOf('--aplicar') + 1]; if (!SUB || !SUB.endsWith('.json')) throw new Error('falta el json del subrayado');
  const RNG = JSON.parse(fs.readFileSync(path.join(__dirname, 'tema' + N, 'rangos-pdf.json'), 'utf8'));
  const esc = t => t.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const fmt = (g, t) => {
    t = t.replace(/^(\d{1,2})\.\s+/, (m, a) => `<b>${a}.</b> `).replace(/(^|\s)([a-zñ]\))\s+/g, (m, a, b2) => `${a}<b>${b2}</b> `);
    return g.apN != null ? `<b>Art. ${g.h.num}.</b> ${t}` : t;
  };
  const dirT = path.join(process.env.TEMP || '/tmp', 'rs' + N); fs.mkdirSync(dirT, { recursive: true }); const tmpF = path.join(dirT, 'nuevos.html');
  pl.forEach((g, i) => { g.id = 'RS' + i; g.html = fmt(g, nuevoTexto(g)); });
  const sPlano = () => fold(s.replace(/<[^>]+>/g, '').replace(/\\"/g, '"')).replace(/[^a-z0-9]/g, '');
  const sp0 = sPlano();
  const conGap = pl.filter(g => g.gaps && g.gaps.length);
  const hacer = pl.filter(g => !(g.gaps && g.gaps.length) && !g.dup && !sp0.includes(nz(g.html).slice(0, 60)));
  const conCola = pl.filter(g => g.cola && !(g.gaps && g.gaps.length));
  const dudosos = pl.filter(g => g.dup && !(g.gaps && g.gaps.length) && !g.cola); if (dudosos.length) console.log('SIN TOCAR (artículo ya presente, sin hueco «(…)» que cubra la respuesta; revisar a mano):', dudosos.map(g => g.bl.k + ' art.' + g.h.num + (g.apN ? '.' + g.apN : '') + ' [' + g.ids.join(',') + ']').join(' · '));
  console.log('pendientes de aplicar:', hacer.length, '· huecos:', conGap.reduce((a, g) => a + g.gaps.length, 0)); if (!hacer.length && !conGap.length && !conCola.length) return;
  const entradas = []; // {id, bl, html}
  hacer.forEach(g => entradas.push({ id: g.id, bl: g.bl, html: g.html }));
  conCola.forEach(g => { g.cola.id = g.id + 'c'; entradas.push({ id: g.cola.id, bl: g.bl, html: g.cola.fill }); });
  conGap.forEach(g => g.gaps.forEach(h => { h.id = g.id + 'g' + h.n; entradas.push({ id: h.id, bl: g.bl, html: h.fillMin }); }));
  let tmp = '/* RS_INI */ X = ""\n';
  for (const m of marcas) { const gg = entradas.filter(g => g.bl.k === m.k); if (!gg.length) continue; tmp += `/* ${m.k} */ X = ` + gg.map(g => `articuloResp("${g.id}", [], "${esc('<p>' + g.html + '</p>')}", false)`).join('\n + ') + ';\n'; }
  tmp += '/* RS_FIN */\n'; fs.writeFileSync(tmpF, tmp);
  const rangos = Object.entries(RNG).map(([k, v]) => `${k}:${v[0]}-${v[1]}`).join(',');
  cp.execSync(`node "${path.join(__dirname, 'aplicar-subrayado-pdf.js')}" "${SUB}" "${tmpF}" "/* RS_INI */" "/* RS_FIN */" "${rangos}"`, { stdio: 'inherit', env: { ...process.env, UMBRAL: '0.15' } });
  const pint = fs.readFileSync(tmpF, 'utf8'); const P = {};
  for (const m of pint.matchAll(/articuloResp\("((?:[^"\\\n]|\\.)*)", \[\], "((?:[^"\\\n]|\\.)*)", false\)/g)) P[m[1]] = m[2].replace(/^<p>/, '').replace(/<\/p>$/, '');
  const firmas = () => unidades(cargarEsquemas()[N - 1], N).map(u => ({ pid: u.pid, T: u.T.trim().slice(0, 45) }));
  const antes = firmas();
  const limites = k => { const mi = marcas.findIndex(m => m.k === k); const ini = s.indexOf('/* ' + k + ' */'); const nxt = marcas[mi + 1] ? s.indexOf('/* ' + marcas[mi + 1].k + ' */', ini) : s.indexOf('/* T' + (N + 1) + '_', ini); return [ini, nxt < 0 ? s.length : nxt]; };
  for (const g of conCola) { // frase de la respuesta al final del párrafo, tras «(…)»
    const [ini, fin] = limites(g.bl.k); const seg = s.slice(ini, fin); const cab = fichasDe(g.bl).find(f => nums(f.cab).includes(g.h.num)).cab;
    const pos = seg.indexOf('  + articuloResp("' + cab + '"'); const e = seg.indexOf('\n', pos); let L = seg.slice(pos, e);
    const ps = []; const rx = /<p(?: [^>]*)?>[\s\S]*?<\/p>/g; let m2; while ((m2 = rx.exec(L))) ps.push([m2.index, m2.index + m2[0].length]);
    const ph = P[g.cola.id]; if (!ph) throw new Error('sin pintar cola ' + g.cola.id);
    let par = L.slice(ps[g.cola.pi][0], ps[g.cola.pi][1]); const ya = /\(…\)\s*(<\/[a-z]+>\s*)*\.?<\/p>$/.test(par);
    par = par.replace(/<\/p>$/, (ya ? ' ' : ' (…) ') + ph + '</p>');
    L = L.slice(0, ps[g.cola.pi][0]) + par + L.slice(ps[g.cola.pi][1]); s = s.slice(0, ini + pos) + L + s.slice(ini + e); fs.writeFileSync(ESQ, s);
    console.log('+ frase añadida en «' + cab.slice(0, 50) + '» (' + g.ids.join(',') + ')');
  }
  for (const g of conGap) { // rellenar huecos «(…)» del párrafo (de mayor a menor para no descolocar los índices)
    const [ini, fin] = limites(g.bl.k); const seg = s.slice(ini, fin); const cab = fichasDe(g.bl).find(f => nums(f.cab).includes(g.h.num)).cab;
    const pos = seg.indexOf('  + articuloResp("' + cab + '"'); const e = seg.indexOf('\n', pos); let L = seg.slice(pos, e);
    const ps = []; const rx = /<p(?: [^>]*)?>[\s\S]*?<\/p>/g; let m2; while ((m2 = rx.exec(L))) ps.push([m2.index, m2.index + m2[0].length]);
    let par = L.slice(ps[g.pIdx][0], ps[g.pIdx][1]);
    for (const h of [...g.gaps].sort((a, b) => b.n - a.n)) {
      const ph = P[h.id]; if (!ph) throw new Error('sin pintar hueco ' + h.id);
      let k = -1; const nuevoTxt = (h.izq ? '(…) ' : '') + ph + (h.dcha ? ' (…)' : '');
      par = par.replace(/ ?\(…\)/g, mm => (++k === h.n ? (/^[,.;:]/.test(h.fillMin) && !h.izq ? '' : ' ') + nuevoTxt : mm));
    }
    L = L.slice(0, ps[g.pIdx][0]) + par + L.slice(ps[g.pIdx][1]); s = s.slice(0, ini + pos) + L + s.slice(ini + e); fs.writeFileSync(ESQ, s);
    console.log('+ hueco(s) rellenado(s) en «' + cab.slice(0, 50) + '» (' + g.ids.join(',') + ')');
  }
  for (const g of hacer) {
    const ph = P[g.id]; if (!ph) throw new Error('sin pintar ' + g.id);
    // límites del bloque en el estado actual de s
    const mi = marcas.findIndex(m => m.k === g.bl.k);
    const ini = s.indexOf('/* ' + g.bl.k + ' */'); const nxt = marcas[mi + 1] ? s.indexOf('/* ' + marcas[mi + 1].k + ' */', ini) : s.indexOf('/* T' + (N + 1) + '_', ini);
    const fin = nxt < 0 ? s.length : nxt; const seg = s.slice(ini, fin);
    if (g.dest.tipo === 'append') {
      const pos = seg.indexOf('  + articuloResp("' + g.dest.cab + '"'); if (pos < 0) throw new Error('ficha no encontrada ' + g.dest.cab);
      const e = seg.indexOf('\n', pos); let L = seg.slice(pos, e);
      const ps = []; const rx = /<p(?: [^>]*)?>[\s\S]*?<\/p>/g; let m2; while ((m2 = rx.exec(L))) ps.push([m2.index, m2.index + m2[0].length]);
      if (!ps.length) throw new Error('ficha sin párrafos ' + g.dest.cab);
      const txtP = i => L.slice(ps[i][0], ps[i][1]).replace(/<[^>]+>/g, '').replace(/\\"/g, '"');
      const aN = g.h.num.replace(' ', '\\s*'); const a = ps.findIndex((_, i) => new RegExp('^\\s*Art\\.?\\s*' + aN + '\\b', 'i').test(txtP(i)));
      let ins = ps.length - 1; if (a >= 0) { const b2 = ps.findIndex((_, i) => i > a && /^\s*Art\.?\s*\d/i.test(txtP(i))); ins = b2 < 0 ? ps.length - 1 : b2 - 1; }
      L = L.slice(0, ps[ins][1]) + '<p>' + ph + '</p>' + L.slice(ps[ins][1]);
      s = s.slice(0, ini + pos) + L + s.slice(ini + e);
      console.log('+ añadido a «' + g.dest.cab.slice(0, 50) + '» (' + g.ids.join(',') + ')');
    } else {
      const lines = []; const rx2 = /^  \+ articuloResp\("((?:[^"\\\n]|\\.)*)"/gm; let m3; while ((m3 = rx2.exec(seg))) lines.push({ cab: m3[1], pos: m3.index });
      const num = parseInt(g.h.num) || 0; const prim = c => (nums(c)[0] ? parseInt(nums(c)[0]) : 1e9);
      const tgt = g.h.esDA ? null : lines.find(l => !/RECUERDA|Nueva actualización/i.test(l.cab) && nums(l.cab).length && prim(l.cab) > num);
      const corta = t => t.split(/\.\s{2,}|\.\s(?=\d{1,2}\.\s)/)[0].replace(/\.\s*$/, '');
      const cab = g.h.esDA ? (() => { const m = g.h.tit.match(/^(DISPOSICIÓN\s+\S+\s+\S+?)\.?\s+(.*)$/); const nom = cap(m ? m[1] : g.h.tit); const rest = m ? corta(m[2]) : ''; return rest ? `${nom} — ${rest.charAt(0).toUpperCase() + rest.slice(1)}` : nom; })() : `Artículo ${g.h.num} — ${cap(corta(g.h.tit))}`;
      const ficha = `  + articuloResp("${esc(cab)}", [], "<p>${ph}</p>", false)\n`;
      let at; if (tgt) at = ini + tgt.pos; else { const ult = lines.filter(l => !/RECUERDA/i.test(l.cab)).pop(); at = ult ? ini + ult.pos : fin; /* antes de la última ficha: tras ella puede cerrar el «;» de la expresión */ }
      s = s.slice(0, at) + ficha + s.slice(at); console.log('+ ficha', cab);
    }
    fs.writeFileSync(ESQ, s);
  }
  const FIJO = path.join(__dirname, 'tema' + N, 'mapa-fijo-t' + N + '.json');
  if (fs.existsSync(FIJO)) {
    const despues = firmas(); const mp = {}; let ptr = 0;
    antes.forEach(a => { let f = -1; for (let n = ptr; n < despues.length; n++) if (despues[n].T === a.T) { f = n; break; } if (f < 0) throw new Error('párrafo perdido ' + a.pid); mp[a.pid] = despues[f].pid; ptr = f + 1; });
    const fj = JSON.parse(fs.readFileSync(FIJO, 'utf8')); const nuevo = {};
    Object.entries(fj).forEach(([id, kj]) => { const np = mp[N + '-' + kj]; if (!np) throw new Error('sin realineo ' + id); nuevo[id] = np.replace(new RegExp('^' + N + '-'), ''); });
    fs.writeFileSync(FIJO, JSON.stringify(nuevo)); console.log('mapa-fijo realineado');
  }
}
