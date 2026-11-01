// Vuelca los párrafos del esquema del T15 (k-j, ficha, texto) y la unidad de MAPA_PREG de cada pregunta para preg-extra-t15.py
const fs = require('fs'), path = require('path'); const R = path.join(__dirname, '..', '..', '..'); process.chdir(R);
const src = fs.readFileSync('prompts/herramientas/mapa-preguntas.js', 'utf8'); const ESQ = 'esquemas.html', TEST = 'test-oficial-conocimiento.html';
eval(src.slice(src.indexOf('// ---------- 1.'), src.indexOf('// ---------- 4.')).replace(/^const /gm, 'var ').replace(/^function (\w+)/gm, 'var $1=function $1'));
eval(src.slice(src.indexOf('// ---------- 4.'), src.indexOf('// ---------- 5.')).replace(/^function (\w+)/gm, 'var $1=function $1'));
const us = unidades(cargarEsquemas()[14], 15); const par = {}; us.forEach(u => par[u.pid] = { cab: u.cab, t: u.T.trim() });
const h = fs.readFileSync(ESQ, 'utf8'); const MAPA = JSON.parse(h.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const q = {}; for (const [id, v] of Object.entries(MAPA)) if (id.startsWith('15-')) { const m = v.match(/^(15-\d+-(?:\d+|x))/); if (m) q[id] = m[1]; }
fs.writeFileSync(path.join(process.env.TEMP, 'par15.json'), JSON.stringify({ par, q })); console.log(Object.keys(par).length, 'párrafos', Object.keys(q).length, 'preguntas');
