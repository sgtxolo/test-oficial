// OCR de los fotogramas -> preguntas votadas. Uso: node parse.js v05 [v06 ...]  (lee v/<id>.json, escribe v/<id>-q.json y v/<id>-q.txt)
const fs = require('fs'), path = require('path');
const banco = require('./banco.js');
const D = path.join(__dirname, 'v');
const plano = t => String(t).toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '');
const lev = (a, b) => { if (a === b) return 0; const m = a.length, n = b.length; let p = Array.from({ length: n + 1 }, (_, j) => j); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; };
const sim = (a, b) => 1 - lev(a, b) / Math.max(a.length, b.length, 1);
const FIN = /^(estoy seguro|dudo entre|marcar pregunta|subrayado y|modelo orientativo|s ?modelo|pregunta ?\d|sin responder|se punt|tiempo restante|siguiente|terminar|anterior|navegaci|ser[aá]s$|aulavirtual|[abcd] [abcd] [abcd]|\? ?$)/i;
function lineas(words) {
  const ws = words.slice().sort((a, b) => (a.y + a.h / 2) - (b.y + b.h / 2)); const L = [];
  for (const w of ws) { const cy = w.y + w.h / 2; let l = L.length && Math.abs(L[L.length - 1].cy - cy) < w.h * 0.65 ? L[L.length - 1] : null; if (!l) { l = { cy, ws: [] }; L.push(l); } else l.cy = (l.cy * l.ws.length + cy) / (l.ws.length + 1); l.ws.push(w); }
  return L.map(l => { l.ws.sort((a, b) => a.x - b.x); return { y: l.cy, x: l.ws[0].x, h: Math.max(...l.ws.map(w => w.h)), t: l.ws.map(w => w.t).join(' ').trim() }; });
}
const arregla = t => t.replace(/(^| )10(?= [a-záéíóú])/g, '$1lo').replace(/\bEI\b/g, 'El').replace(/\bAI\b/g, 'Al').replace(/\bdeI\b/g, 'del').replace(/\s+/g, ' ').replace(/ ([,.;:?!)])/g, '$1').replace(/([¿(¡]) /g, '$1').trim();
function une(ls) { let s = ''; for (const l of ls) { if (/[a-záéíóúñ]-$/i.test(s)) s = s.slice(0, -1) + l; else s += (s ? ' ' : '') + l; } return arregla(s); }
const SX = { v01: [270, 2040], v02: [300, 2295], v03: [300, 2295], v04: [300, 2295] };
const out = {};
for (const id of process.argv.slice(2)) {
  let raw = fs.readFileSync(path.join(D, id + '.json'), 'utf8').replace(/^﻿/, '');
  const J = JSON.parse(raw);
  const apar = []; let nf = 0;
  for (const f of Object.keys(J).sort()) {
    nf++;
    const todas = [].concat(J[f] || []); const pant = id <= "v04"; const sx = pant ? (SX[id] || [270, 2020]) : [0, 99999];
    const L = lineas(todas.filter(w => w.x >= sx[0] && w.x < sx[1]));
    for (let i = 0; i < L.length; i++) {
      if (!/sele?c+ione ?un/i.test(L[i].t)) continue;
      const x0 = L[i].x;
      const en = []; let completoEn = false;
      for (let k = i - 1; k >= 0; k--) { const t = L[k].t; if (FIN.test(t) || /^[A-D][.,] /.test(t)) { completoEn = true; break; } if (L[k + 1].y - L[k].y > L[k].h * 3.6) { completoEn = true; break; } if (L[k].x > x0 + 60) { completoEn = true; break; } en.unshift(t); }
      const op = [[], [], [], []]; let cur = -1, fin = false;
      for (let k = i + 1; k < L.length; k++) {
        const t = L[k].t, m = t.match(/^([A-D8])\s?[.,·]\s*(.*)$/);
        if (m) { const n = 'ABCD'.indexOf(m[1] === '8' ? 'B' : m[1]); if (n === cur + 1) { cur = n; op[n].push(m[2]); continue; } }
        if (FIN.test(t) || /^[\d ]*[ABCD]( [ABCD])+$/.test(t) || /^[A-D]$/.test(t) || /sele?c+ione ?un/i.test(t)) { fin = true; break; }
        if (cur < 0) continue;
        if (L[k].y - L[k - 1].y > L[k].h * 3.4) { fin = true; break; }
        op[cur].push(t);
      }
      apar.push({ f: +f, en: completoEn && en.length ? une(en) : null, parcialEn: une(en), op: op.map((o, n) => o.length && (n < cur || fin) ? une(o) : null) });
    }
  }
  // agrupar apariciones: misma pregunta si el enunciado y las opciones se parecen
  const G = [];
  const parecida = (g, a) => {
    const e1 = plano(a.en || a.parcialEn);
    let comun = 0, cont = 0;
    for (let n = 0; n < 4; n++) if (a.op[n] && g.op[n].length) { cont++; if (g.op[n].some(x => sim(plano(x), plano(a.op[n])) > 0.9)) comun++; }
    const eOk = e1.length > 15 && g.en.some(x => { const y = plano(x); const L = Math.min(y.length, e1.length); return sim(y.slice(-L), e1.slice(-L)) > 0.9; });
    if (cont) return comun === cont && (eOk || e1.length < 16);
    return eOk && a.f - g.last < 40;
  };
  for (const a of apar) {
    let g = G.slice(-6).reverse().find(g => a.f - g.last < 80 && parecida(g, a));
    if (!g) { g = { first: a.f, last: a.f, en: [], enp: [], op: [[], [], [], []] }; G.push(g); }
    g.last = a.f; if (a.en) g.en.push(a.en); else if (a.parcialEn) g.enp.push(a.parcialEn);
    a.op.forEach((o, n) => o && g.op[n].push(o));
  }
  const vota = arr => { if (!arr.length) return null; const c = new Map(); arr.forEach(x => c.set(x, (c.get(x) || 0) + 1)); const maxL = Math.max(...arr.map(x => x.length)); return [...c].filter(([x]) => x.length >= maxL * 0.93).sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)[0][0]; };
  const Q = G.map(g => ({ v: id, f: g.first, en: vota(g.en) || null, enp: vota(g.enp), op: g.op.map(vota), n: g.en.length }));
  // descartar grupos que son trozos de otro (sin enunciado completo y opciones ya contenidas)
  const res = Q.filter(q => !( (!q.en || q.op.some(o => !o)) && Q.some(r => r !== q && r.en && r.op.every(Boolean) && Math.abs(r.f - q.f) < 100 && q.op.every((o, n) => !o || sim(plano(o), plano(r.op[n])) > 0.85))));
  // unir duplicadas exactas dentro del vídeo
  const uni = []; for (const q of res) { const d = uni.find(r => r.en && q.en && sim(plano(r.en), plano(q.en)) > 0.97 && q.op.every((o, n) => !o || !r.op[n] || sim(plano(o), plano(r.op[n])) > 0.95)); if (d) continue; uni.push(q); }
  fs.writeFileSync(path.join(D, id + '-q.json'), JSON.stringify(uni, null, 1));
  console.log(id, 'fotogramas', nf, 'grupos', uni.length, 'incompletas', uni.filter(q => !q.en || q.op.some(o => !o)).length);
}
