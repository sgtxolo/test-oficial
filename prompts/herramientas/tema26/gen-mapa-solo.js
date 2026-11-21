// Genera tema26/mapa-solo-t26.js = mapa-preguntas.js pero SOLO para el Tema 26 (mezcla el resultado con el mapa que ya hay; el mapa completo tarda ~30 min).
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..');
let s = fs.readFileSync(path.join(R, 'mapa-preguntas.js'), 'utf8');
s = s.replace("require('./esq-virtual.js');", "require('../esq-virtual.js');");
s = s.replace("const tema = i + 1; if (!e.html || !e.html.includes('class=\"articulo\"')) return;", "const tema = i + 1; if (tema !== TEMA_SOLO || !e.html || !e.html.includes('class=\"articulo\"')) return;");
s = s.replace("const ESQ = 'esquemas.html'", "const TEMA_SOLO = 26; const ESQ = 'esquemas.html'");
// escritura: mezcla con lo existente
s = s.replace('[2, 7, 9, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]', '[2, 7, 9, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26]');
const a = s.indexOf('// ---------- 7. Escribir ----------');
const nuevo = `// ---------- 7. Escribir (solo Tema 26, mezclando) ----------
const prev = fs.readFileSync('esquemas-datos/mapa-preguntas.js', 'utf8');
const M0 = JSON.parse(prev.match(/window\\.MAPA_PREG=(\\{.*?\\});window\\.TOTAL_PREG/)[1]), T0 = JSON.parse(prev.match(/window\\.TOTAL_PREG=(\\{.*?\\});window\\.MAPA_EXTRA/)[1]), E0 = JSON.parse(prev.match(/window\\.MAPA_EXTRA=(\\{.*?\\});/)[1]);
for (const k of Object.keys(M0)) if (k.startsWith(TEMA_SOLO + '-')) delete M0[k];
for (const k of Object.keys(E0)) if (k.startsWith(TEMA_SOLO + '-')) delete E0[k];
for (const [k, v] of Object.entries(MAPA)) if (k.startsWith(TEMA_SOLO + '-')) M0[k] = v;
for (const [k, v] of Object.entries(EXTRA)) if (k.startsWith(TEMA_SOLO + '-')) E0[k] = v;
T0[TEMA_SOLO] = TOTAL[TEMA_SOLO];
fs.writeFileSync('esquemas-datos/mapa-preguntas.js', 'window.MAPA_PREG=' + JSON.stringify(M0) + ';window.TOTAL_PREG=' + JSON.stringify(T0) + ';window.MAPA_EXTRA=' + JSON.stringify(E0) + ';' + '\\n');
let t = fs.readFileSync(TEST, 'utf8');
const mt = t.match(/<script id="esq-temas">window\\.ESQ_TEMAS=(\\[.*?\\]);<\\/script>/); const temas0 = mt ? JSON.parse(mt[1]) : [];
if (!temas0.includes(TEMA_SOLO)) { temas0.push(TEMA_SOLO); temas0.sort((x, y) => x - y); const bl = '<script id="esq-temas">window.ESQ_TEMAS=' + JSON.stringify(temas0) + ';</script>'; t = mt ? t.replace(/<script id="esq-temas">[\\s\\S]*?<\\/script>/, () => bl) : t.replace(/<\\/body>(?![\\s\\S]*<\\/body>)/, () => bl + '\\n</body>'); fs.writeFileSync(TEST, t); }
console.log('Mapa del Tema ' + TEMA_SOLO + ' mezclado: ' + Object.keys(MAPA).filter(k => k.startsWith(TEMA_SOLO + '-')).length + ' preguntas situadas · extras ' + Object.keys(EXTRA).filter(k => k.startsWith(TEMA_SOLO + '-')).length);
`;
s = s.slice(0, a) + nuevo;
fs.writeFileSync(path.join(__dirname, 'mapa-solo-t26.js'), s);
console.log('ok');
