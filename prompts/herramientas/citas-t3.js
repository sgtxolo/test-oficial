// Tema 3: asigna a cada pregunta OFICIAL la cita literal del temario oficial (artículo + texto) buscando el pasaje que mejor encaja
// con la opción correcta y el enunciado. Uso:
//   node prompts/herramientas/citas-t3.js <preguntas.json> <salida.json>      (solo calcula; el json sale de extraer-preguntas.js)
// La salida es {id: {art, norma, cita, score}}; fix-t3.js la aplica a la app.
const fs = require('fs');
const [,, inF, outF] = process.argv;
const txt = fs.readFileSync('prompts/temario-limpio/tema3/oficial-paginas.txt', 'utf8').replace(/\r\n?/g, '\n').normalize('NFC');
const pages = {}; txt.split(/=====PAG (\d+)=====\n/).slice(1).reduce((_, v, i, a) => { if (i % 2 === 0) pages[+v] = a[i + 1]; return 0; }, 0);
const USAR = []; for (let p = 5; p <= 61; p++) if (p !== 23 && p !== 24) USAR.push(p);
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const STOP = new Set('para como cual cuales esta este estos estas sobre entre desde hasta serán sera seran podra podran sido tiene tienen cada otra otros otras sera ser son los las del con por que una uno unos unas sus lis mas muy segun donde cuando todas todos señale correcta incorrecta opcion opciones union europea estado estados miembros miembro tratado'.split(' '));
const tok = s => (norm(s).match(/[a-z0-9ñ]+/g) || []).filter(w => w.length >= 4 && !STOP.has(w));
// 1) párrafos con artículo / apartado / norma
const paras = []; let norma = 'TUE', art = '', apt = '';
for (const p of USAR) {
  if (p === 31) norma = 'TFUE';
  const lines = pages[p].split('\n').map(l => l.replace(/­/g, '').trimEnd());
  let cur = null;
  const push = () => { if (cur && cur.t.trim().length > 15) paras.push(cur); cur = null; };
  for (let l of lines) {
    if (/^(\d+ \| |\s*\| \d+|TRATADOS DE LA UNIÓN|TOMO 1|T3\s*$|TEMARIO\s*$|DE ASCENSO|A OFICIAL|Todos los derechos|R\d+\s*$|\d{6}\s*$|\d+\s*$|3\.[12]\.\s*$)/.test(l.trim()) || !l.trim()) continue;
    const ma = l.match(/^ARTÍCULO\s+(\d+)/); if (ma) { push(); art = ma[1]; apt = ''; continue; }
    const mn = l.match(/^\s*(\d+)\.\s+(.*)/);
    const ml = l.match(/^\s*([a-z])\)\s+(.*)/);
    const mb = l.match(/^•\s+(.*)/);
    if (mn) { push(); apt = mn[1]; cur = { norma, art, apt, t: mn[2] }; continue; }
    if (ml || mb) { push(); cur = { norma, art, apt, t: (ml ? ml[1] + ') ' + ml[2] : mb[1]) }; continue; }
    if (!cur) cur = { norma, art, apt, t: '' };
    if (/[a-záéíóúñ]-$/.test(cur.t)) cur.t = cur.t.slice(0, -1) + l.trim(); else cur.t += ' ' + l.trim();
    if (/[.:;]$/.test(l.trim()) && !/^[a-z]\)/.test(l.trim()) && l.trim().length < 3) push();
  }
  push();
}
// 2) ventanas de 1..3 párrafos del mismo artículo
const wins = [];
for (let i = 0; i < paras.length; i++) {
  let t = ''; for (let k = 0; k < 3 && i + k < paras.length; k++) {
    if (paras[i + k].art !== paras[i].art || paras[i + k].norma !== paras[i].norma) break;
    t += (t ? ' ' : '') + paras[i + k].t; if (t.length > 800) break;
    wins.push({ ...paras[i], t, set: new Set(tok(t)), n: k + 1 });
  }
}
const COMBO = /^(todas|las opciones|a y|b y|c y|d y|ninguna|todos)/i;
const qs = JSON.parse(fs.readFileSync(inF, 'utf8')).filter(x => !/-ia-/.test(x.id));
const out = {};
for (const q of qs) {
  const stem = q.pregunta.replace(/^\[?(Tratado[^.]*|TUE|TFUE|Derecho[^.]*)\]?\.\s*/i, '');
  let opt = q.opciones[q.correcta];
  if (COMBO.test(opt.trim())) opt = q.opciones.filter((o, i) => i !== q.correcta && !COMBO.test(o.trim())).join(' ');
  const W = new Map(); for (const w of tok(stem)) W.set(w, Math.max(W.get(w) || 0, 1)); for (const w of tok(opt)) W.set(w, 3);
  const tot = [...W.values()].reduce((a, b) => a + b, 0) || 1;
  let best = null;
  for (const w of wins) {
    let c = 0; for (const [k, v] of W) if (w.set.has(k)) c += v;
    const sc = c / tot - w.t.length * 0.00012 - (w.n - 1) * 0.01;
    if (!best || sc > best.sc) best = { sc, c: c / tot, w };
  }
  if (best) {
    let t = best.w.t.replace(/\s+/g, ' ').trim();
    if (t.length > 420) {
      const fr = t.split(/(?<=[.;:])\s+/); let bb = null;
      for (let i = 0; i < fr.length; i++) { let u = ''; for (let j = i; j < fr.length; j++) { u += (u ? ' ' : '') + fr[j]; if (u.length > 520) break; const set = new Set(tok(u)); let c = 0; for (const [k, v] of W) if (set.has(k)) c += v; const sc = c / tot - u.length * 0.0008; if (!bb || sc > bb.sc) bb = { sc, u }; } }
      if (bb) t = bb.u;
    }
    best.w = { ...best.w, t };
  }
  if (best) out[q.id] = { norma: best.w.norma, art: best.w.art, apt: best.w.apt, cita: best.w.t.replace(/\s+/g, ' ').trim(), score: +best.c.toFixed(2), sc: +best.sc.toFixed(2) };
}
fs.writeFileSync(outF, JSON.stringify(out, null, 1));
const v = Object.values(out); console.log('preguntas', v.length, '· score>=0.7:', v.filter(x => x.score >= 0.7).length, '· 0.5-0.7:', v.filter(x => x.score >= 0.5 && x.score < 0.7).length, '· <0.5:', v.filter(x => x.score < 0.5).length);
