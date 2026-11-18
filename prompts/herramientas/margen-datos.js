// Genera expres-subrayado/margen-tN.js: dónde cae cada pregunta (y su respuesta) dentro de las imágenes del Exprés subrayado.
// Uso: node prompts/herramientas/margen-datos.js <tema> <ocr.json> <ficheros.json>
//   ocr.json     = salida de ocr-windows.ps1 sobre p001.png… (una por imagen, en el orden de ficheros.json)
//   ficheros.json = [[idPieza, 'img'|'imgr', 'a-1.jpg'], …] en el mismo orden que los PNG
// Alinea (por palabras, en orden) cada párrafo del Exprés (expres/tN.js) con el OCR de la imagen y la cita/respuesta de cada pregunta
// con su frase. Resultado: marcas por párrafo (EXOF/EX/✱/preguntas), corchetes, rectángulos de la respuesta y opciones del test.
const fs = require('fs'), path = require('path');
const B = path.resolve(__dirname, '..', '..') + '/';
const [T, ocrF, filesF] = [process.argv[2], process.argv[3], process.argv[4]];
global.window = {};
require(B + `expres-subrayado/datos-t${T}.js`); require(B + `expres/t${T}.js`); require(B + `expres/q${T}.js`);
['esquemas-datos/citas-temario.js', 'esquemas-datos/citas-temario2.js', `esquemas-datos/citas-manual-t${T}.js`].forEach(f => { try { require(B + f); } catch (e) {} });
const CI = window.CITAS_PREG || {}, QA = window.EXPRES_Q[T], DT = window.EXSUB[T], H = window.EXPRES_T[T].html;
const ocr = JSON.parse(fs.readFileSync(ocrF, 'utf8').replace(/^﻿/, '')), files = JSON.parse(fs.readFileSync(filesF, 'utf8'));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
const toks = s => s.split(/\s+/).map(norm).filter(x => x);
// ---- opciones del test (solo de las preguntas que lo necesitan)
const test = fs.readFileSync(B + 'test-oficial-conocimiento.html', 'utf8');
const opts = id => { const i = test.indexOf('{"id":"' + id + '","pregunta"'); if (i < 0) return null; let dep = 0, inS = false, esc = false, j = i;
  for (; j < test.length; j++) { const c = test[j]; if (inS) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inS = false; } else { if (c === '"') inS = true; else if (c === '{') dep++; else if (c === '}') { dep--; if (!dep) { j++; break; } } } }
  try { const o = JSON.parse(test.slice(i, j)); const cm = /class="ref-concepto">["“]?([\s\S]*?)["”]?<\/span>/.exec(o.explicacion || ''); return { o: o.opciones, c: o.correcta, cita: cm ? cm[1].replace(/<[^>]+>/g, '') : '' }; } catch (e) { return null; } };
const optsC = {};
// ---- párrafos del Exprés por pieza (por número de artículo y norma; la norma cambia cuando el número baja)
const prefijos = []; DT.piezas.forEach(p => { const m = /^([a-z]+)-\d+$/.exec(p.id); if (m && m[1] !== 'r' && !prefijos.includes(m[1])) prefijos.push(m[1]); });
const fich = [...H.matchAll(/<div class="ex-fh">(.*?)<\/div><div class="ex-fb">([\s\S]*?)<\/div><\/div>(?=<div class="(?:ex-ficha|bloque)|<\/|$)/g)];
const porPieza = {}; let norma = 0, prev = 0;
for (const f of fich) { const hd = f[1].replace(/<[^>]+>/g, ''), m = /^\s*Art[íi]culos?\s+(\d+)/.exec(hd); if (!m) continue; const n = +m[1]; if (n < prev) norma++; prev = n; let art = n;
  for (const pm of f[2].matchAll(/<p([^>]*)>([\s\S]*?)<\/p>/g)) { const am = pm[2].match(/^\s*(?:<span[^>]*>[^<]*<\/span>\s*)*<b>Art\.\s*(\d+)/); if (am && /^Art[íi]culos\s/.test(hd)) art = +am[1]; const id = (prefijos[norma] || 'a') + '-' + art; (porPieza[id] = porPieza[id] || []).push({ attr: pm[1], html: pm[2] }); } }
const pregPieza = {}; for (const q in DT.preg) (pregPieza[DT.preg[q]] = pregPieza[DT.preg[q]] || []).push(q);
const out = {}; let nDet = 0, nLoc = 0;
files.forEach(([pid, kind, file], k) => {
  const W = (ocr[String(k + 1).padStart(3, '0')] || []).map(w => ({ n: norm(w.t), y: w.y, h: w.h, x: w.x, w: w.w })).filter(w => w.n);
  const piece = DT.piezas.find(p => p.id === pid), wh = kind === 'imgr' ? piece.whr : piece.wh; if (!wh) return;
  // anchura del texto (para pegar los corchetes)
  const rows = []; W.filter(w => w.h > 8 && w.h < 60).sort((a, b) => a.y - b.y).forEach(w => { const r = rows[rows.length - 1]; if (r && Math.abs(w.y - r.y) < 10) { r.min = Math.min(r.min, w.x); r.max = Math.max(r.max, w.x + w.w); r.n++; } else rows.push({ y: w.y, min: w.x, max: w.x + w.w, n: 1 }); });
  const R = rows.filter(r => r.n >= 4), qt = (a, p) => { a = a.slice().sort((x, y) => x - y); return a[Math.floor((a.length - 1) * p)]; };
  const tx = R.length ? [Math.round(qt(R.map(r => r.min), 0.2)), Math.round(qt(R.map(r => r.max), 0.8))] : [Math.round(wh[0] * 0.19), Math.round(wh[0] * 0.88)];
  // localiza un texto: rectángulos por línea
  const loc = (text, lo, hi, minFrac) => { const CT = toks(text); if (CT.length < 2) return []; const K = Math.min(5, CT.length); let b2 = -1, bs = -1;
    for (let s0 = lo; s0 < hi; s0++) { let jj = s0, sc = 0; for (let i = 0; i < K; i++) { let f = -1; for (let q = jj; q < Math.min(W.length, jj + 4); q++) if (W[q].n === CT[i]) { f = q; break; } if (f >= 0) { sc++; jj = f + 1; } } if (sc > bs) { bs = sc; b2 = s0; } if (sc === K) break; }
    if (bs < Math.min(2, K)) return []; let jj = b2, f1 = -1, l1 = b2, hh = 0;
    for (let i = 0; i < CT.length; i++) { let f = -1; for (let q = jj; q < Math.min(W.length, jj + 8); q++) if (W[q].n === CT[i]) { f = q; break; } if (f >= 0) { if (f1 < 0) f1 = f; l1 = f; jj = f + 1; hh++; } }
    if (f1 < 0 || hh < CT.length * minFrac) return []; const rs = []; let cur = null;
    for (let q = f1; q <= l1; q++) { const w = W[q]; if (cur && Math.abs(w.y - cur.y) < 10 && w.x >= cur.x) { cur.w = w.x + w.w - cur.x; cur.h = Math.max(cur.h, w.h); } else { if (cur) rs.push(cur); cur = { x: w.x, y: w.y, w: w.w, h: w.h }; } } if (cur) rs.push(cur);
    return rs.map(r => [Math.round(r.x), Math.round(r.y), Math.round(r.w), Math.round(r.h)]); };
  const locQ = (id, lo, hi) => { const ia = /-ia-/.test(id), c = CI[id] ? CI[id][1] : ((optsC[id] = optsC[id] || opts(id)) || {}).cita, a = QA[id]; let r = [];
    if (c) r = loc(c, lo, hi, 0.3);
    if (!r.length && a && toks(a[1]).length >= (ia ? 3 : 4)) r = loc(a[1], lo, hi, 0.8);
    return r; };
  const marks = []; let cursor = 0;
  for (const p of porPieza[pid] || []) {
    const text = p.html.replace(/<[^>]+>/g, ' ').replace(/🎯.*?preguntas?/g, ''), T2 = toks(text); if (!T2.length) continue;
    let best = -1, bs = -1; const K = Math.min(6, T2.length);
    for (let s = cursor; s < W.length; s++) { let j = s, sc = 0; for (let i = 0; i < K; i++) { let f = -1; for (let q = j; q < Math.min(W.length, j + 4); q++) if (W[q].n === T2[i]) { f = q; break; } if (f >= 0) { sc++; j = f + 1; } } if (sc > bs) { bs = sc; best = s; } if (sc === K) break; }
    if (bs < Math.min(3, K)) continue; let j = best, last = best, first = -1, hit = 0;
    for (let i = 0; i < T2.length; i++) { let f = -1; for (let q = j; q < Math.min(W.length, j + 8); q++) if (W[q].n === T2[i]) { f = q; break; } if (f >= 0) { if (first < 0) first = f; last = f; j = f + 1; hit++; } }
    if (first < 0 || hit < T2.length * 0.35) continue; cursor = last + 1;
    const uq = [...new Set([...p.html.matchAll(/data-q="([^"]*)"/g)].flatMap(m => m[1].split(',')).filter(Boolean))], of = uq.filter(q => !/-ia-/.test(q)), ia = uq.filter(q => /-ia-/.test(q));
    const ex = ((/data-ex="([^"]*)"/.exec(p.attr) || [])[1] || '').split(',').filter(Boolean); if (!uq.length && !ex.length) continue;
    const det = of.concat(ia).map(id => { const a = QA[id], o = opts(id), rects = locQ(id, 0, W.length); nDet++; if (rects.length) nLoc++; return { id, ia: /-ia-/.test(id) ? 1 : 0, ans: a ? a[1] : '', neg: a ? a[2] : 0, rects, o: o ? o.o : undefined, c: o ? o.c : undefined }; });
    marks.push({ a: Math.round(W[first].y), b: Math.round(W[last].y + W[last].h), of: of.length, ia: ia.length, ex, q: of, iaq: ia, det });
  }
  const qr = {}; (pregPieza[pid] || []).forEach(id => { const r = locQ(id, 0, W.length); if (r.length) qr[id] = r; });
  (out[file] = { w: wh[0], h: wh[1], tx, m: marks, qr });
});
const dest = B + `expres-subrayado/margen-t${T}.js`;
fs.writeFileSync(dest, `(window.EXSUB_MARG=window.EXSUB_MARG||{})[${T}]=${JSON.stringify(out)};\n`);
console.log('imágenes', Object.keys(out).length, '· párrafos con marca', Object.values(out).reduce((s, x) => s + x.m.length, 0), '· respuestas de párrafo localizadas', nLoc + '/' + nDet, '· preguntas localizadas (todas)', Object.values(out).reduce((s, x) => s + Object.keys(x.qr).length, 0) + '/' + Object.keys(DT.preg).length, '→', dest);
