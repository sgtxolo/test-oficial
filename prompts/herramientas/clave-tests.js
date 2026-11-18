// Esquema clave → preguntas de TEST de sus artículos: para cada repaso-tN-borrador.html enlaza cada artículo (y cada cuadro «ART. N») con sus
// preguntas de test (oficiales + IA) y las vuelca en clave-tests/tN.js (window.CLAVE_TEST[N]). Las usa clave-extras.js (🧠 Hazme las preguntas tipo test).
// Enlace: 1) por el título, con la ficha del Exprés (expres/tN.js, data-q) avanzando en orden; 2) si no hay ficha (o es un cuadro), por el
// número de artículo que cita el lila de la explicación, cuidando que sea la misma norma (palabras del apartado frente al encabezado).
// Uso: node prompts/herramientas/clave-tests.js        (todos los repasos)   ·   node prompts/herramientas/clave-tests.js 21 5
const fs = require('fs'); const path = require('path');
const R = path.join(__dirname, '..', '..') + '/';
const PA = require('./preguntas-articulo.js');
const plano = h => h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const cierra = (s, from) => { let d = 0; const r = /<div[ >]|<\/div>/g; r.lastIndex = from; let x; while ((x = r.exec(s))) { d += x[0] === '</div>' ? -1 : 1; if (d === 0) return r.lastIndex; } return s.length; };
const nm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ (exof|ex|✱|r\d+)\b/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
const pref = k => k.split(' ').slice(0, 2).join(' ');
const pal = t => nm(t).split(' ').filter(w => w.length > 4);
const RE_ART = /art(?:[ií]culo|\.)?s?\.?\s*(\d+)/i;
const numDe = t => { const m = t.match(RE_ART); return m ? m[1] : null; };
const numRef = q => {
  const e = String(q.explicacion || ''); const m = e.match(/ref-norma">([^<]*)/);
  const t = m ? m[1] : plano(e.replace(/<span class="ex-resp">[\s\S]*?<\/span><\/span>/, '')).slice(0, 250);
  const mm = t.match(RE_ART); return mm ? mm[1] : null;
};
fs.mkdirSync(R + 'clave-tests', { recursive: true });
const sel = process.argv.slice(2).map(Number);
for (const f of fs.readdirSync(R).filter(x => /^repaso-t\d+-borrador\.html$/.test(x))) {
  const N = +f.match(/\d+/)[0]; if (sel.length && !sel.includes(N)) continue;
  let H; try { global.window = {}; eval(fs.readFileSync(R + 'expres/t' + N + '.js', 'utf8')); H = window.EXPRES_T[N].html; } catch (e) { H = ''; }
  const fichas = []; { const re = /<div class="ex-ficha">/g; let m; while ((m = re.exec(H))) { const blk = H.slice(m.index, cierra(H, m.index)); const hd = blk.match(/<div class="ex-fh">([\s\S]*?)<\/div><div class="ex-fb">/); if (!hd) continue;
    fichas.push({ h: plano(hd[1]).replace(/ (EXOF|EX|✱|Rd+)/g, '').trim(), k: nm(plano(hd[1])), ids: [...new Set([...blk.matchAll(/data-q="([^"]+)"/g)].flatMap(x => x[1].split(',')).filter(Boolean))] }); } }
  const Q = {}; PA.preguntas(N).forEach(q => Q[q.id] = q); const todas = Object.values(Q);
  const s = fs.readFileSync(R + f, 'utf8'); const arts = [];
  { let ctx = ''; for (const x of s.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>|<div class="art[^"]*"><h3>([\s\S]*?)<\/h3>|<div class="ban">([\s\S]*?)<\/div>/g)) {
      if (x[1] !== undefined) ctx = plano(x[1]); else arts.push({ t: plano(x[2] !== undefined ? x[2] : x[3]).replace(/ (EXOF|EX|✱)\b/g, '').trim(), ctx, ban: x[3] !== undefined }); } }
  let p = 0, sin = 0; const out = []; const vistos = new Set();
  arts.forEach(au => {
    const a = au.t, k = nm(a); let j = -1;
    if (!au.ban) {
      for (let i = p; i < fichas.length; i++) if (fichas[i].k === k) { j = i; break; }
      if (j < 0) for (let i = p; i < fichas.length; i++) if (pref(fichas[i].k) === pref(k) && /^articulo \S+$/.test(pref(k))) { j = i; break; }
      if (j < 0) for (let i = 0; i < p; i++) if (fichas[i].k === k) { j = i; break; }
    }
    let qs;
    if (j >= 0) { if (j >= p) p = j + 1; qs = fichas[j].ids.map(id => Q[id]).filter(q => q && !vistos.has(q.id)); }
    else {
      const n = numDe(a); if (!n) { sin++; return; }
      let c = todas.filter(q => numRef(q) === n && !vistos.has(q.id)); const nor = new Set(c.map(q => nm(q.apartado || '').slice(0, 25)));
      if (nor.size > 1) { const w = pal(au.ctx + ' ' + a); const sc = q => pal(q.apartado || '').filter(x => w.includes(x)).length; const mx = Math.max(...c.map(sc)); c = mx > 0 ? c.filter(q => sc(q) === mx) : []; }
      qs = c; if (!qs.length) { sin++; return; }
    }
    qs.forEach(q => vistos.add(q.id));
    if (qs.length) out.push({ a, q: qs.map(q => ({ i: q.id, p: q.pregunta, o: q.opciones, c: q.correcta, e: q.explicacion || '' })) });
  });
  // resto del tema (preguntas que no son de los artículos del esquema clave): para la opción «Todo el tema»
  const grupo = {}; fichas.forEach(fc => fc.ids.forEach(id => { if (!grupo[id]) grupo[id] = fc.h; }));
  const resto = {}; todas.filter(q => !vistos.has(q.id)).forEach(q => { const g = grupo[q.id] || q.apartado || 'Resto del tema'; (resto[g] = resto[g] || []).push({ i: q.id, p: q.pregunta, o: q.opciones, c: q.correcta, e: q.explicacion || '' }); });
  fs.writeFileSync(R + 'clave-tests/t' + N + '-todo.js', '/* generado por prompts/herramientas/clave-tests.js; no editar a mano */\n(window.CLAVE_TODO=window.CLAVE_TODO||{})[' + N + ']=' + JSON.stringify(Object.keys(resto).map(a => ({ a, q: resto[a] }))) + ';\n');
  const n = out.reduce((t, x) => t + x.q.length, 0);
  fs.writeFileSync(R + 'clave-tests/t' + N + '.js', '/* generado por prompts/herramientas/clave-tests.js; no editar a mano */\n(window.CLAVE_TEST=window.CLAVE_TEST||{})[' + N + ']=' + JSON.stringify(out) + ';\n');
  console.log('T' + N, 'unidades', arts.length, 'sin preguntas', sin, '| preguntas', n, '| KB', Math.round(fs.statSync(R + 'clave-tests/t' + N + '.js').size / 1024));
}
