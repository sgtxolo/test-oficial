// Preguntas psicotécnicas de v02: por número, fotograma donde se ve entera (enunciado + figura + "Seleccione")
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('v02.json', 'utf8').replace(/^﻿/, ''));
const best = {}; const nums = new Set();
for (const k of Object.keys(j).sort()) {
  const w = [].concat(j[k] || []);
  const rows = [];
  for (const o of w.slice().sort((a, b) => (a.y + a.h / 2) - (b.y + b.h / 2))) {
    const c = o.y + o.h / 2; let l = rows.find(l => Math.abs(l.c - c) < 7); if (!l) { l = { c, w: [] }; rows.push(l); } l.w.push(o);
  }
  const segs = [];
  for (const l of rows) { l.w.sort((a, b) => a.x - b.x); let cur = null; for (const q of l.w) { if (!cur || q.x - cur.x2 > 34) { cur = { c: l.c, x: q.x, x2: q.x + q.w, t: q.t }; segs.push(cur); } else { cur.t += ' ' + q.t; cur.x2 = q.x + q.w; } } }
  for (const s of segs) { const m = s.t.match(/(?:PREGUNTA|n[úu]mero)\s*(\d+)/i); if (m) nums.add(+m[1]); }
  for (const sel of segs.filter(s => /^selecc?ione\s*un/i.test(s.t))) {
    const sx = sel.x;
    const above = segs.filter(s => Math.abs(s.x - sx) < 14 && s.c < sel.c - 60 && sel.c - s.c < 420 && /\?|siguiente|figura|pieza|valor|cuál|qué/i.test(s.t));
    if (!above.length) continue;
    const last = above[above.length - 1];
    let first = last; for (let i = above.length - 2; i >= 0; i--) { if (first.c - above[i].c < 28) first = above[i]; else break; }
    if (first.c < 105) continue;
    let num = null;
    for (const s of segs) { if (s.x < sx - 60 && s.c > first.c - 45 && s.c < first.c + 12) { const m = s.t.match(/(?:PREGUNTA|n[úu]mero)\s*(\d+)/i); if (m) num = +m[1]; } }
    if (num == null) continue;
    const stem = segs.filter(s => Math.abs(s.x - sx) < 14 && s.c >= first.c && s.c <= last.c).map(s => s.t).join(' ');
    const q = { num, f: k, sx: Math.round(sx), y0: Math.round(first.c - 18), y1: Math.round(sel.c - 16), stem, score: Math.min(first.c, 400) };
    // se prefiere el fotograma más tardío con la figura bien separada del borde superior
    if (!best[num] || q.y0 > 90) best[num] = q;
  }
}
fs.writeFileSync('q-v02.json', JSON.stringify(Object.values(best).sort((a, b) => a.num - b.num), null, 1));
const have = new Set(Object.keys(best).map(Number)); const max = Math.max(...nums);
console.log('vistas', have.size, 'max', max, 'faltan', Array.from({ length: max }, (_, i) => i + 1).filter(n => !have.has(n)).join(','));
