// Genera prompts/herramientas/expres-t26.js a partir de expres-t25.js (una sola vez). Uso: node prompts/herramientas/tema26/gen-expres-t26.js
const fs = require('fs'), path = require('path');
const P = path.join(__dirname, '..');
let s = fs.readFileSync(path.join(P, 'expres-t25.js'), 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('no encuentro: ' + a.slice(0, 60)); s = s.split(a).join(b); };
s = s.replace(/^\/\/ ⚡ EXPRÉS del Tema 25[^\n]*\n/, '// ⚡ EXPRÉS del Tema 26 (Estatuto del personal de la Guardia Civil: LO 11/2007, LO 12/2007, Ley 29/2014, Orden PRE/1983/2012 y 3 Resoluciones de acoso). Mismas reglas que el Exprés del T25. Uso: node prompts/herramientas/expres-t26.js\n');
rep('(25)', '(26)'); rep('V25', 'V26'); rep('Tema 25', 'Tema 26');
rep("require('./tema25/visuales-t25a.js').concat(require('./tema25/visuales-t25b.js').map(([n, l, h]) => [5, l, h]))", "require('./tema26/visuales-t26a.js').map(([, l, h]) => [l, h]).concat(require('./tema26/visuales-t26b.js')).concat(require('./tema26/visuales-t26c.js').map(([, l, h]) => [l, h]))");
rep("esquemas-datos', 't25.js'", "esquemas-datos', 't26.js'");
rep("['loe', 'l31', 'rd', 'eur', 'int'].map(k => win.ESQ_TXT['T25.' + k])", "['lo11', 'lo12', 'l29', 'ord', 'res1', 'res2', 'res3'].map(k => win.ESQ_TXT['T26.' + k])");
rep('<!--VIS25[AB]-->[\\s\\S]*?<!--\\/VIS25[AB]-->', '<!--VIS26[ABC]-->[\\s\\S]*?<!--\\/VIS26[ABC]-->');
// la cabecera de cada cuadro YA es la cabecera exacta de su ficha (loc)
rep("const CAB = V26.map(([, loc]) => { const k = norm(loc); const f = ARTS.find(([, t]) => t.includes(k)); if (!f) throw new Error('localizador sin artículo: ' + loc.slice(0, 50)); return f[0]; });", "const CAB = V26.map(([loc]) => { const f = ARTS.find(([h]) => norm(h) === norm(loc)); if (!f) throw new Error('cabecera sin ficha: ' + loc.slice(0, 50)); return f[0]; });");
rep("V26.map(([, , h], i) => [CAB[i], h])", "V26.map(([, h], i) => [CAB[i], h])");
rep("const m = ESQ.slice(a, b).match(/articulo-head\">([^<]+)</); ARTS.push([m ? m[1] : ''", "const m = ESQ.slice(a, b).match(/articulo-head\">([\\s\\S]*?)<\\/div>/); ARTS.push([m ? m[1].replace(/<[^>]+>/g, '') : ''");
// SUSTITUYE automático: el cuadro reemplaza a su artículo si recoge ≥ UNO (0,8) de las respuestas correctas de las preguntas que el mapa sitúa en ese artículo
rep("const SUSTITUYE = (process.env.SUSTITUYE || '').split('|').filter(Boolean);", `const UNO = +(process.env.UNO || 0.8);
const SUS_AUTO = (() => {
  const BS = String.fromCharCode(92), app = fs.readFileSync(path.join(__dirname, '..', '..', 'test-oficial-conocimiento.html'), 'utf8');
  const MAPA = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'esquemas-datos', 'mapa-preguntas.js'), 'utf8').match(/window\\.MAPA_PREG=(\\{.*?\\});window\\.TOTAL_PREG/)[1]);
  const obj = id => { const i = app.indexOf('{"id":"' + id + '"'); let d = 0, s = false, e = false, j = i; for (; j < app.length; j++) { const c = app[j]; if (s) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') s = false; continue; } if (c === '"') s = true; else if (c === '{') d++; else if (c === '}') { d--; if (!d) break; } } return JSON.parse(app.slice(i, j + 1)); };
  const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ ]/g, ' ').replace(/ +/g, ' ');
  const porFicha = {}; Object.entries(MAPA).forEach(([id, p]) => { const m = p.match(/^26-(\\d+)-/); if (m && /^26-/.test(id)) (porFicha[m[1]] = porFicha[m[1]] || []).push(id); });
  const txtC = {}; Vcab.forEach(([c, h]) => { txtC[c] = (txtC[c] || '') + ' ' + nz(h); });
  const out = [];
  X.fichas.forEach((f, k) => { const c = Object.keys(txtC).find(x => limpia0(f.cab) === x || limpia0(f.cab).startsWith(x + ' ')); if (!c) return; const ids = porFicha[k] || []; if (!ids.length) return;
    const dentro = ids.filter(id => { const q = obj(id), w = nz(q.opciones[q.correcta]).split(' ').filter(p => p.length > 2); return !w.length || w.filter(p => txtC[c].includes(p)).length / w.length >= 0.8; });
    if (dentro.length / ids.length >= UNO) out.push(limpia0(f.cab)); });
  return out;
})();
const SUSTITUYE = (process.env.SUSTITUYE || '').split('|').filter(Boolean).concat(SUS_AUTO);`);
rep("const limpia = t =>", "const limpia0 = t => t.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\\s+/g, ' ').trim();\nconst limpia = t =>");
// ajuste al tope (T26: >200 págs de temario → 35-40 págs de Exprés): 39,8 págs con estos valores (UNO=0: el cuadro sustituye a su artículo siempre; el resto de preguntas sale por el botón 🎯)
rep("RUN_MIN: 60,", "RUN_MIN: 20, UNO: 0,");
rep("CAB: +(process.env.CAB || 6), ANT: +(process.env.ANT || 5)", "CAB: +(process.env.CAB || 2), ANT: +(process.env.ANT || 2)");
fs.writeFileSync(path.join(P, 'expres-t26.js'), s); console.log('ok');
