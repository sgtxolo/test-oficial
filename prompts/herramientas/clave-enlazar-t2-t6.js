/* Enlaza TODAS las preguntas del T2 o del T6 con su apartado del esquema clave (misma técnica que tema27/clave-enlazar-t27.js).
   Las que no estaban en la parte impresa van en un desplegable solo de pantalla (<!--ENL-->…<!--/ENL-->) al final de su apartado,
   con su dato: enunciado → respuesta. El apartado sale de la ficha del esquema (mapa-preguntas.js): norma y primer artículo.
   Escribe tN-sec.js, tN-esq.js (CLAVE_LINK = todas) y completa tN-todo.js. Se puede repetir.
   Uso: node prompts/herramientas/clave-enlazar-t2-t6.js 2   (o 6) */
const fs = require("fs"), path = require("path");
process.chdir(path.resolve(__dirname, "..", ".."));
const T = +process.argv[2];
if (T !== 2 && T !== 6) throw new Error("uso: node clave-enlazar-t2-t6.js 2|6");
const auto = fs.readFileSync("prompts/herramientas/clave-auto.js", "utf8");
const corta = (x, y) => { const i = auto.indexOf(x), j = auto.indexOf(y, i); if (i < 0 || j < 0) throw new Error("clave-auto.js: " + x); return auto.slice(i, j); };
const { linea } = new Function(corta("const esc = ", "/* ---- trocea") + corta('const L = "ABCD";', "const claveArt") + "return {linea};")();
const w = {}; const lee = f => new Function("window", fs.readFileSync(f, "utf8"))(w);
[`clave-tests/t${T}-sec.js`, `clave-tests/t${T}-esq.js`, `clave-tests/t${T}-todo.js`].forEach(lee);

/* banco */
const app = fs.readFileSync("test-oficial-conocimiento.html", "utf8"), BS = String.fromCharCode(92);
const banco = new Map();
for (const m of app.matchAll(new RegExp('\\{"id":"(' + T + '-(?:ia-)?\\d+)","pregunta"', "g"))) {
  let d = 0, s = false, e = false, j = m.index;
  for (; j < app.length; j++) { const c = app[j]; if (s) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') s = false; continue; } if (c === '"') s = true; else if (c === "{") d++; else if (c === "}" && !--d) break; }
  banco.set(m[1], JSON.parse(app.slice(m.index, j + 1)));
}
const corto = q => ({ i: q.id, p: q.pregunta, o: q.opciones, c: q.correcta, e: q.explicacion || "" });
/* todo: añadir las que faltan, agrupadas por apartado */
const TODO = w.CLAVE_TODO[T].map(g => ({ a: g.a, q: g.q.filter(q => banco.has(q.i)) }));
const ya = new Set(TODO.flatMap(g => g.q.map(q => q.i))); let nuevas = 0;
banco.forEach((q, id) => { if (ya.has(id)) return; const a = q.apartado || "Resto del tema"; let g = TODO.find(x => x.a === a); if (!g) TODO.push(g = { a, q: [] }); g.q.push(corto(q)); nuevas++; });

const mapa = {};
for (const m of fs.readFileSync("esquemas-datos/mapa-preguntas.js", "utf8").matchAll(new RegExp('"(' + T + '-(?:ia-)?\\d+)":"' + T + '-(\\d+)', "g"))) mapa[m[1]] = +m[2];
require("./esq-virtual.js");
const msrc = fs.readFileSync("prompts/herramientas/mapa-preguntas.js", "utf8");
const F = new Function("fs", "require", "__dirname", msrc.slice(msrc.indexOf("const ESQ ="), msrc.indexOf("// ---------- 6. Ejecutar")) + ";return {cargarEsquemas,unidades};")(fs, require, __dirname + "/");
const E = F.cargarEsquemas()[T - 1];
const MAY = [];
{ const re = /<div class="bloque-titulo">([\s\S]*?)<\/div>|<div class="articulo">/g; let m, M = "";
  while ((m = re.exec(E.html))) { if (m[1] !== undefined) { const x = m[1].replace(/<[^>]+>/g, "").match(/^\s*(\d+\.\d+)/); if (x) M = x[1]; } else MAY.push(M); } }
const FICHA = {}; F.unidades(E, T).forEach(u => { const k = +u.pid.split("-")[1]; if (!FICHA[k]) FICHA[k] = u; });
/* [hasta el artículo, nº de apartado (<h2>/<h3>) de la página] */
const TABLA = {
  2: { "2.1": [[2, 1], [3, 2], [7, 3], [999, 4]], "2.2": [[4, 7], [13, 8], [22, 9], [999, 10]], "2.3": [[2, 13], [14, 14], [25, 15], [32, 16], [43, 17], [49, 18], [999, 19]], "2.4": [[4, 23], [11, 24], [15, 25], [18, 26], [999, 27]], "2.5": [[5, 30], [8, 31], [999, 32]], "2.6": [[6, 35], [9, 36], [999, 37]], "2.7": [[4, 40], [9, 41], [999, 42]] },
  6: { "6.1": [[2, 1], [3, 2], [4, 3], [15, 2], [19, 4], [24, 5], [28, 6], [34, 7], [35, 8], [43, 9], [49, 10], [56, 11], [59, 12], [62, 13], [66, 14], [999, 15]], "6.2": [[5, 19], [9, 20], [15, 21], [22, 22], [29, 23], [38, 24], [999, 25]] }
}[T];
const DISP = { 2: { "2.1": 4, "2.3": 20 }, 6: { "6.1": 16, "6.2": 25 } }[T];
const secDe = k => {
  const u = FICHA[k], may = TABLA[MAY[k]] ? MAY[k] : Object.keys(TABLA)[0], r = TABLA[may];
  if (/disposicion/.test(u.cab) && DISP[may] !== undefined) return DISP[may];
  const m = u.cab.match(/articulos? (\d+)/); const n = m ? +m[1] : parseInt([...u.arts][0], 10);
  return n ? r.find(x => n <= x[0])[1] : r[0][1];
};

const PAG = `repaso-t${T}-esquema-clave-nuevo.html`;
let h = fs.readFileSync(PAG, "utf8");
/* lo añadido en una pasada anterior se quita (de la página y de los apartados) y se vuelve a calcular */
const antes = new Set([...h.matchAll(/<!--ENL-->[\s\S]*?<!--\/ENL-->/g)].flatMap(m => [...m[0].matchAll(/data-q="([^"]+)"/g)].map(x => x[1])));
w.CLAVE_SEC[T] = w.CLAVE_SEC[T].map(l => l.filter(i => !antes.has(i)));
h = h.replace(/\n?<!--ENL-->[\s\S]*?<!--\/ENL-->/g, "");
const ini = h.indexOf('<button id="btnQ"');
const pos = [...h.slice(0, ini).matchAll(/<h([23])[\s>]/g)].map(m => ({ i: m.index, n: +m[1] }));
if (pos.length !== w.CLAVE_SEC[T].length) throw new Error("los apartados de la página no cuadran (" + pos.length + ")");
const esq = new Set(w.CLAVE_ESQ[T].filter(i => banco.has(i)));
const sec = w.CLAVE_SEC[T].map(l => l.filter(i => banco.has(i)));
const extra = {};
banco.forEach((q, id) => {
  if (esq.has(id) && sec.some(l => l.includes(id))) return;
  const k = mapa[id]; if (k === undefined) throw new Error("sin ficha en mapa-preguntas: " + id);
  (extra[secDe(k)] = extra[secDe(k)] || []).push(q);
});
Object.keys(extra).map(Number).sort((a, b) => b - a).forEach(s => {
  const qs = extra[s], fin = s + 1 < pos.length ? pos[s + 1].i : ini;
  const trozo = h.slice(pos[s].i, fin);
  const corte = trozo.search(/\n?(<!--[^>]*-->\s*)*$/);
  const lis = qs.map(q => linea(corto(q)).replace("<li>", '<li data-q="' + q.id + '">')).join("\n");
  const bloque = '\n<!--ENL--><details class="mas"><summary>Dato de otras preguntas de este apartado (' + qs.length + ")</summary>\n<ul>\n" + lis + "\n</ul></details><!--/ENL-->";
  h = h.slice(0, pos[s].i) + trozo.slice(0, corte) + bloque + trozo.slice(corte) + h.slice(fin);
  let h2 = s; while (h2 > 0 && pos[h2].n !== 2) h2--;
  qs.forEach(q => { for (const x of [s, h2]) if (!sec[x].includes(q.id)) sec[x].push(q.id); });
});
const CSS = "<!--ENL--><style>details.mas{margin:4px 0 8px}details.mas>summary{cursor:pointer;font-size:.82em;color:#475569}li.cl-flash{outline:3px solid #f59e0b;border-radius:4px}@media print{details.mas{display:none!important}}</style><!--/ENL-->";
h = h.replace("</head>", () => "\n" + CSS + "</head>");
fs.writeFileSync(PAG, h);
const cab = "/* completado por prompts/herramientas/clave-enlazar-t2-t6.js */\n";
fs.writeFileSync(`clave-tests/t${T}-sec.js`, cab + "(window.CLAVE_SEC=window.CLAVE_SEC||{})[" + T + "]=" + JSON.stringify(sec) + ";\n");
fs.writeFileSync(`clave-tests/t${T}-esq.js`, cab + "(window.CLAVE_ESQ=window.CLAVE_ESQ||{})[" + T + "]=" + JSON.stringify([...esq]) + ";\n(window.CLAVE_LINK=window.CLAVE_LINK||{})[" + T + "]=" + JSON.stringify([...banco.keys()]) + ";\n");
fs.writeFileSync(`clave-tests/t${T}-todo.js`, cab + "(window.CLAVE_TODO=window.CLAVE_TODO||{})[" + T + "]=" + JSON.stringify(TODO.filter(g => g.q.length)) + ";\n");
const enSec = new Set(sec.flat());
console.log("T" + T + " banco " + banco.size + " · en el esquema " + esq.size + " · añadidas en desplegable " + Object.values(extra).flat().length + " · sin apartado " + [...banco.keys()].filter(i => !enSec.has(i)).length + " · nuevas en todo " + nuevas);
