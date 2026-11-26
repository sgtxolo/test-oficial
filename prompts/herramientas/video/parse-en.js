// node parse.js v01  -> q-v01.json (preguntas únicas, votadas) en orden de aparición
const fs = require('fs');
const v = process.argv[2];
const j = JSON.parse(fs.readFileSync(v + '.json', 'utf8').replace(/^﻿/, ''));
const norm = t => t.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '');
const found = [];
for (const k of Object.keys(j).sort()) {
  const words = [].concat(j[k] || []);
  // líneas
  const rows = [];
  for (const o of words.slice().sort((a, b) => (a.y + a.h / 2) - (b.y + b.h / 2))) {
    const c = o.y + o.h / 2;
    let l = rows.find(l => Math.abs(l.c - c) < 7);
    if (!l) { l = { c, w: [] }; rows.push(l); }
    l.w.push(o);
  }
  const segs = [];
  for (const l of rows) {
    l.w.sort((a, b) => a.x - b.x);
    let cur = null;
    for (const w of l.w) {
      if (!cur || w.x - cur.x2 > 34 || (cur.x < 100 && w.x > 195)) { cur = { c: l.c, x: w.x, x2: w.x + w.w, t: w.t }; segs.push(cur); }
      else { cur.t += ' ' + w.t; cur.x2 = w.x + w.w; }
    }
  }
  // fusiona las filas de enunciado (columna central) marcando los huecos
  for (const l of rows) {
    const w = segs.filter(s => s.c === l.c && s.x > 205 && s.x < 1100).sort((a, b) => a.x - b.x);
    if (!w.length || segs.some(s => s.c === l.c && s.x >= 245 && s.x < 262 && /^[ABCD]W/.test(s.t))) continue;
    const ws = l.w.filter(o => o.x > 205 && o.x < 1520).sort((a, b) => a.x - b.x);
    if (/^selecc?ione/i.test(ws[0].t) || ws[0].x > 900 || ws[0].x >= 245 && ws[0].x < 262) continue;
    let t = ws[0].x > 262 ? '__________ ' : ''; t += ws[0].t;
    for (let i = 1; i < ws.length; i++) { if (ws[i].x - (ws[i - 1].x + ws[i - 1].w) > 40) t += ' __________'; t += ' ' + ws[i].t; }
    for (const q of w) segs.splice(segs.indexOf(q), 1);
    segs.push({ c: l.c, x: 225, x2: 1000, t });
  }
  segs.sort((a, b) => a.c - b.c || a.x - b.x);
  const sels = segs.filter(s => /^selecc?ione\s*un/i.test(s.t));
  for (const sel of sels) {
    const sx = 225;
    // enunciado
    const stem = []; let top = sel.c;
    for (let i = segs.length - 1; i >= 0; i--) {
      const s = segs[i];
      if (s.c >= sel.c - 8 || Math.abs(s.x - sx) > 14) continue;
      if (top - s.c > (stem.length ? 27 : 42)) break;
      stem.unshift(s); top = s.c;
    }
    if (!stem.length || stem[0].c < 70) continue;
    // opciones
    const opts = []; let last = sel.c, cur = null, end = false;
    const below = segs.filter(s => s.c > sel.c + 8 && s.x > sx + 8 && s.x < sx + 75);
    for (const s of below) {
      if (s.c - last > 46) break;
      const m = s.t.match(/^[OoQ0©®()*•·.\s]{0,3}([ABCDabcd8])(?:\s*[.,:]|(?=\s))\s*(.*)$/);
      const want = 'ABCD'[opts.length];
      let letra = m && m[1].toUpperCase().replace('8', 'B');
      if (m && letra === want && s.x < sx + 40) { cur = { t: m[2], x: s.x }; opts.push(cur); }
      else if (cur && s.x > cur.x - 8 && s.c - last < 25) cur.t += ' ' + s.t;
      else if (cur && opts.length < 4 && s.c - last >= 27 && s.c - last < 40 && s.x >= sx + 25 && s.x < sx + 55 && /^[A-ZÁÉÍÓÚ¿"]/.test(s.t)) { cur = { t: s.t, x: sx + 28 }; opts.push(cur); }
      else break;
      last = s.c;
    }
    if (opts.length !== 4 || opts.some(o => !o.t) || last > 960) continue;
    // el final tiene que verse (algo debajo, para no coger opciones cortadas)
    if (!segs.some(s => s.c > last + 28)) continue;
    // número de pregunta en la etiqueta izquierda
    let num = null;
    for (const s of segs) {
      if (s.x < sx - 60 && s.c > stem[0].c - 45 && s.c < stem[0].c + 12) { const m = s.t.match(/(?:PREGUNTA|n[úu]mero)\s*(\d+)/i); if (m) num = +m[1]; }
    }
    found.push({ f: +k, num, en: stem.map(s => s.t).join(' ').replace(/\s+/g, ' ').trim(), op: opts.map(o => o.t.replace(/\s+/g, ' ').trim()) });
  }
}
// agrupar apariciones (bigramas)
const bg = t => { const s = new Set(), n = norm(t); for (let i = 0; i < n.length - 1; i++) s.add(n.slice(i, i + 2) + (n[i + 2] || '')); return s; };
const sim = (a, b) => { let c = 0; for (const x of a) if (b.has(x)) c++; return c / Math.max(1, a.size + b.size - c); };
const groups = [];
for (const q of found) {
  const full = q.en + ' ' + q.op.join(' ');
  const b = bg(full);
  let g = groups.find(g => sim(g.b, b) > 0.86 && q.op.every((o, i) => sim(bg(o), g.bo[i]) > 0.72));
  if (!g) { g = { b, bo: q.op.map(bg), items: [] }; groups.push(g); }
  g.items.push(q);
}
const vote = a => { const c = {}; a.forEach(x => c[x] = (c[x] || 0) + 1); return Object.entries(c).sort((p, q) => q[1] - p[1] || q[0].length - p[0].length)[0][0]; };
const out = groups.map((g, i) => ({ i: i + 1, fs: g.items.map(x => x.f), f: g.items[0].f, n: g.items.length, num: g.items.map(x => x.num).find(x => x != null) ?? null, en: vote(g.items.map(x => x.en)), op: [0, 1, 2, 3].map(k => vote(g.items.map(x => x.op[k]))) }));
fs.writeFileSync('fr-' + v + '.json', JSON.stringify(found.map(x => ({ num: x.num, f: x.f }))));
fs.writeFileSync('q-' + v + '.json', JSON.stringify(out, null, 1));
console.log(v, 'frames', Object.keys(j).length, 'apariciones', found.length, 'únicas', out.length, 'con n=1:', out.filter(o => o.n === 1).length);
