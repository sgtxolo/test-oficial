// Tema 5: busca para cada pregunta OFICIAL el pasaje del temario que mejor encaja con su respuesta correcta y su enunciado.
// Corpus: texto del temario oficial (PDF), texto consolidado del esquema (VIS y Código de visados reformados) y OCR del PDF del usuario.
// Uso: node prompts/herramientas/citas-t5.js <preguntas.json> <salida.json> [--txt revision.txt]
const fs = require('fs');
const [,, inF, outF] = process.argv;
const ti = process.argv.indexOf('--txt'), txtF = ti > 0 ? process.argv[ti + 1] : null;
const D = 'prompts/temario-limpio/tema5/';
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const STOP = new Set('para como cual cuales esta este estos estas sobre entre desde hasta seran sera podra podran sido tiene tienen cada otra otros otras ser son los las del con por que una uno unos unas sus mas muy segun donde cuando todas todos senale correcta incorrecta opcion opciones union europea estado estados miembros miembro reglamento articulo presente dicho dicha datos'.split(' '));
const tok = s => (norm(s).match(/[a-z0-9ñ]+/g) || []).filter(w => (w.length >= 4 || /^\d+$/.test(w)) && !STOP.has(w));
const NORMA_PAG = p => p <= 42 ? 'SIS 2018/1861' : p <= 64 ? 'VIS 767/2008 (original)' : p <= 122 ? 'Código de visados 810/2009 (original)' : p <= 124 ? 'Rgto. 977/2011' : p <= 154 ? 'Rgto. 2019/1155 (modifica el CV)' : p <= 223 ? 'Eurodac 2024/1358' : 'Orden AEC/240/2011';
const paras = [];
const parte = (texto, fuente) => {
  let cur = '', pag = 0;
  for (let l of texto.replace(/\r/g, '').split('\n')) {
    const mp = l.match(/^=====PAG (\d+)=====/); if (mp) { pag = +mp[1]; continue; }
    const mh = l.match(/^#### (.*)/); if (mh) { fuente.n = mh[1].slice(0, 60); continue; }
    l = l.replace(/­/g, '').trim(); if (!l) { if (cur) paras.push({ f: fuente.f(pag), t: cur }); cur = ''; continue; }
    cur = /[a-záéíóúñ]-$/.test(cur) ? cur.slice(0, -1) + l : (cur ? cur + ' ' : '') + l;
    if (/[.;:]$/.test(l) || cur.length > 700) { paras.push({ f: fuente.f(pag), t: cur }); cur = ''; }
  }
  if (cur) paras.push({ f: fuente.f(pag), t: cur });
};
parte(fs.readFileSync(D + 'oficial-paginas.txt', 'utf8'), { f: p => 'OFICIAL p.' + p + ' · ' + NORMA_PAG(p) });
const cons = { n: '', f() { return 'ESQUEMA · ' + this.n; } }; cons.f = cons.f.bind(cons);
parte(fs.readFileSync(D + 'consolidado.txt', 'utf8'), cons);
parte(fs.readFileSync(D + 'escaneado-paginas.txt', 'utf8'), { f: p => 'TU PDF p.' + p });
// ventanas de 1-2 párrafos seguidos de la misma fuente
const wins = [];
for (let i = 0; i < paras.length; i++) for (let k = 0; k < 2 && i + k < paras.length; k++) {
  if (paras[i + k].f.split(' ')[0] !== paras[i].f.split(' ')[0]) break;
  const t = paras.slice(i, i + k + 1).map(p => p.t).join(' ');
  wins.push({ f: paras[i].f, t, set: new Set(tok(t)), n: k + 1 });
}
const COMBO = /^(todas|las opciones|a y|b y|c y|d y|ninguna|todos|son correctas)/i;
const qs = JSON.parse(fs.readFileSync(inF, 'utf8')).filter(x => !/-ia-/.test(x.id));
const out = {}; let rev = '';
for (const q of qs) {
  const stem = q.pregunta;
  let opt = q.opciones[q.correcta];
  if (COMBO.test(opt.trim())) opt = q.opciones.filter((o, i) => i !== q.correcta && !COMBO.test(o.trim())).join(' ');
  const W = new Map(); for (const w of tok(stem)) W.set(w, 1); for (const w of tok(opt)) W.set(w, 3);
  const tot = [...W.values()].reduce((a, b) => a + b, 0) || 1;
  const top = [];
  for (const w of wins) {
    let c = 0; for (const [k, v] of W) if (w.set.has(k)) c += v;
    const pref = w.f.startsWith('OFICIAL') && !/original/.test(w.f) ? 0.04 : w.f.startsWith('ESQUEMA') ? 0.03 : 0;
    const sc = c / tot - w.t.length * 0.00008 - (w.n - 1) * 0.01 + pref;
    top.push({ sc, c: c / tot, w }); if (top.length > 60) { top.sort((a, b) => b.sc - a.sc); top.length = 3; }
  }
  top.sort((a, b) => b.sc - a.sc);
  const b = top[0];
  out[q.id] = { fuente: b.w.f, cita: b.w.t.slice(0, 900), score: +b.c.toFixed(2), alt: top.slice(1, 3).map(x => x.w.f + ' :: ' + x.w.t.slice(0, 300)) };
  rev += `\n### ${q.id} [${b.c.toFixed(2)}] ${q.pregunta}\n` + q.opciones.map((o, i) => (i === q.correcta ? '  *' : '   ') + 'ABCD'[i] + ') ' + o).join('\n') + `\n  → ${b.w.f} :: ${b.w.t.slice(0, 600)}\n  (alt) ${top[1] ? top[1].w.f + ' :: ' + top[1].w.t.slice(0, 250) : ''}\n`;
}
fs.writeFileSync(outF, JSON.stringify(out, null, 1));
if (txtF) fs.writeFileSync(txtF, rev);
const v = Object.values(out); console.log('preguntas', v.length, '· score>=0.7:', v.filter(x => x.score >= 0.7).length, '· 0.5-0.7:', v.filter(x => x.score >= 0.5 && x.score < 0.7).length, '· <0.5:', v.filter(x => x.score < 0.5).length);
