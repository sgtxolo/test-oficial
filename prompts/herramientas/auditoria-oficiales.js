// AUDITORÍA de las preguntas OFICIALES de un tema contra el temario oficial limpio (prompts/temario-limpio/temaN/*.txt).
// Uso: node prompts/herramientas/auditoria-oficiales.js N   → lista avisos: correcta sin apoyo literal, «Todas/A y B» con opción sin apoyo, «INCORRECTA» invertida, «Ninguna» con opción literal.
// Cada aviso se revisa a mano y se corrige en temaN/fix-tN.js (plantilla tema9/fix-t9.js). Hecha en el T9 (58 correcciones).
// Soporte de CADA opción frente al texto oficial: para las preguntas con "Todas/A y B..." y las de "señale la INCORRECTA" comprueba que lo que se da por correcto está literal.
const fs = require('fs'); const R = require('path').join(__dirname, '..', '..') + '/';
const app = fs.readFileSync(R + 'test-oficial-conocimiento.html', 'utf8'); const BS = String.fromCharCode(92);
function objs(re) { const Q = []; for (const m of app.matchAll(re)) { let i = m.index, d = 0, s = false, e = false, j = i; for (; j < app.length; j++) { const c = app[j]; if (s) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') s = false; continue; } if (c === '"') s = true; else if (c === '{') d++; else if (c === '}') { d--; if (!d) break; } } Q.push(JSON.parse(app.slice(i, j + 1))); } return Q; }
const T = process.argv[2] || '9';
const Q = objs(new RegExp('\\{"id":"' + T + '-\\d+","pregunta":', 'g'));
const dir = R + 'prompts/temario-limpio/tema' + T + '/';
const src = fs.readdirSync(dir).filter(f => /\.txt$/.test(f) && !/^upd|oficial-paginas/.test(f)).map(f => fs.readFileSync(dir + f, 'utf8')).join(' ').replace(/=====PAG \d+=====/g, ' ').replace(/-\s*\n\s*/g, '').replace(/\s+/g, ' ');
const nz = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9ñ ]/g, ' ').split(/\s+/).filter(w => w.length > 0);
const sw = nz(src);
// n-gramas de 3 palabras del texto oficial
const G = new Set(); for (let i = 0; i + 2 < sw.length; i++) G.add(sw[i] + ' ' + sw[i + 1] + ' ' + sw[i + 2]);
const sop = o => { const w = nz(o); if (w.length < 3) return 1; let a = 0, n = 0; for (let i = 0; i + 2 < w.length; i++) { n++; if (G.has(w[i] + ' ' + w[i + 1] + ' ' + w[i + 2])) a++; } return a / n; };
const claimed = (q) => { const c = q.opciones[q.correcta].toLowerCase().trim(); const L = 'abcd'; const idx = [0, 1, 2, 3].filter(k => k !== q.correcta);
  if (/^todas son correctas/.test(c)) return { tipo: 'todas', ok: idx.filter(k => !/^(todas|ninguna|las opciones|[abc] y )/i.test(q.opciones[k].trim())) };
  const m = c.match(/^(?:las opciones )?([abc]) y ([abc]) son correctas/); if (m) return { tipo: 'combo', ok: [L.indexOf(m[1]), L.indexOf(m[2])] };
  if (/^ninguna/.test(c) || /^todas son incorrectas/.test(c)) return { tipo: 'ninguna', ok: [] };
  return { tipo: 'simple', ok: [q.correcta] }; };
const out = [];
for (const q of Q) { const cl = claimed(q); const inc = /incorrect/i.test(q.pregunta);
  const s = q.opciones.map(sop);
  if (cl.tipo === 'todas' || cl.tipo === 'combo') { const bajo = cl.ok.filter(k => s[k] < 0.8); if (bajo.length) out.push({ id: q.id, why: 'dado por correcto sin apoyo literal', det: bajo.map(k => 'ABCD'[k] + ' ' + s[k].toFixed(2) + ' «' + q.opciones[k].slice(0, 110) + '»').join(' | ') }); }
  else if (cl.tipo === 'ninguna') { const alto = [0, 1, 2, 3].filter(k => k !== q.correcta && s[k] >= 0.95); if (alto.length) out.push({ id: q.id, why: 'dice "ninguna" pero hay opción literal', det: alto.map(k => 'ABCD'[k] + ' ' + s[k].toFixed(2) + ' «' + q.opciones[k].slice(0, 110) + '»').join(' | ') }); }
  else if (inc) { // la marcada como INCORRECTA debe ser la de menos apoyo; las demás deben estar apoyadas
    const otras = [0, 1, 2, 3].filter(k => k !== q.correcta && !/^(todas|ninguna|las opciones|[abc] y )/i.test(q.opciones[k].trim())); const baj = otras.filter(k => s[k] < 0.8);
    if (baj.length) out.push({ id: q.id, why: 'INCORRECTA: otra opción también sin apoyo', det: baj.map(k => 'ABCD'[k] + ' ' + s[k].toFixed(2) + ' «' + q.opciones[k].slice(0, 110) + '»').join(' | ') });
    if (s[q.correcta] >= 0.95) out.push({ id: q.id, why: 'INCORRECTA marcada pero literal en el texto', det: s[q.correcta].toFixed(2) + ' «' + q.opciones[q.correcta].slice(0, 110) + '»' }); }
  else if (cl.tipo === 'simple') { if (s[q.correcta] < 0.5) out.push({ id: q.id, why: 'correcta sin apoyo literal', det: s[q.correcta].toFixed(2) + ' «' + q.opciones[q.correcta].slice(0, 120) + '»' }); else { const rival = [0, 1, 2, 3].filter(k => k !== q.correcta && s[k] >= 0.95 && s[k] > s[q.correcta] + 0.2); if (rival.length) out.push({ id: q.id, why: 'otra opción más literal que la correcta', det: rival.map(k => 'ABCD'[k] + ' ' + s[k].toFixed(2) + ' «' + q.opciones[k].slice(0, 110) + '»').join(' | ') + ' vs correcta ' + s[q.correcta].toFixed(2) }); } } }
console.log('preguntas', Q.length, 'avisos', out.length); out.forEach(o => console.log(o.id, '[' + o.why + ']', o.det));
