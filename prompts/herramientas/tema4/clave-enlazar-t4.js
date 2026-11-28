/* Enlaza TODAS las preguntas del T4 con su apartado del esquema clave (repaso-t4-esquema-clave-nuevo.html, escrito a mano: no se regenera).
   Mismo método que tema27/clave-enlazar-t27.js; se puede volver a pasar. Uso: node prompts/herramientas/tema4/clave-enlazar-t4.js */
const fs = require("fs"), path = require("path");
const RAIZ = path.resolve(__dirname, "..", "..", "..") + path.sep;
process.chdir(RAIZ);
const auto = fs.readFileSync("prompts/herramientas/clave-auto.js", "utf8");
const corta = (x, y) => { const i = auto.indexOf(x), j = auto.indexOf(y, i); if (i < 0 || j < 0) throw new Error("clave-auto.js: " + x); return auto.slice(i, j); };
const { linea } = new Function(corta("const esc = ", "/* ---- trocea") + corta('const L = "ABCD";', "const claveArt") + "return {linea};")();
const w = {}; const lee = f => new Function("window", fs.readFileSync(f, "utf8"))(w);
["clave-tests/t4-sec.js", "clave-tests/t4-esq.js", "clave-tests/t4-todo.js"].forEach(lee);

/* banco */
const app = fs.readFileSync("test-oficial-conocimiento.html", "utf8"), BS = String.fromCharCode(92);
const banco = new Map();
for (const m of app.matchAll(/\{"id":"(4-(?:ia-)?\d+)","pregunta"/g)) {
  let d = 0, s = false, e = false, j = m.index;
  for (; j < app.length; j++) { const c = app[j]; if (s) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') s = false; continue; } if (c === '"') s = true; else if (c === "{") d++; else if (c === "}" && !--d) break; }
  banco.set(m[1], JSON.parse(app.slice(m.index, j + 1)));
}
const corto = q => ({ i: q.id, p: q.pregunta, o: q.opciones, c: q.correcta, e: q.explicacion || "" });
/* todo: añadir las que faltan, agrupadas por apartado */
const TODO = w.CLAVE_TODO[4].map(g => ({ a: g.a, q: g.q.filter(q => banco.has(q.i)) }));
const ya = new Set(TODO.flatMap(g => g.q.map(q => q.i))); let nuevas = 0;
banco.forEach((q, id) => { if (ya.has(id)) return; const a = q.apartado || "Resto del tema"; let g = TODO.find(x => x.a === a); if (!g) TODO.push(g = { a, q: [] }); g.q.push(corto(q)); nuevas++; });

const mapa = {}; for (const m of fs.readFileSync("esquemas-datos/mapa-preguntas.js", "utf8").matchAll(/"(4-(?:ia-)?\d+)":"4-(\d+)-/g)) mapa[m[1]] = +m[2];
/* ficha del esquema → número de <h2>/<h3> de la página (orden de documento), según norma y primer artículo de la ficha */
const { us } = require("../enlaces-t4-lib.js");
const FICHA = {}; us.forEach(u => { const k = +u.pid.split("-")[1]; if (!FICHA[k]) FICHA[k] = u; });
const rango = (n, t) => (t.find(x => n <= x[0]) || t[t.length - 1])[1];
const secDe = k => {
  const u = FICHA[k], c = u.cab, n = parseInt((c.match(/\d+/) || ["0"])[0], 10), anexo = /anexo/.test(c);
  if (u.mayor === "4.1") return anexo ? 8 : rango(n, [[4, 1], [6, 2], [7, 3], [8, / bis| ter| quater| quinquies/.test(c) ? 4 : 3], [12, 3], [20, 4], [21, 5], [29, 6], [99, 7]]);
  if (u.mayor === "4.2") return /considerando|anexo/.test(c) ? 19 : rango(n, [[9, 10], [10, 11], [14, 10], [35, 12], [47, 13], [53, 14], [67, 15], [77, 17], [85, 16], [92, 17], [96, 10], [999, 18]]);
  if (u.mayor === "4.3") return rango(n, [[16, 21], [32, 22], [999, 23]]);
  if (u.mayor === "4.4") return 26;
  if (u.mayor === "4.5") return 27;
  if (u.mayor === "4.6") return 29;
  return /^cfs/.test(c) ? 31 : /^gefc/.test(c) ? 32 : /^prum/.test(c) ? 33 : 34;
};
let h = fs.readFileSync("repaso-t4-esquema-clave-nuevo.html", "utf8");
/* lo añadido en una pasada anterior se quita (de la página y de los apartados) y se vuelve a calcular */
const antes = new Set([...h.matchAll(/<!--ENL-->[\s\S]*?<!--\/ENL-->/g)].flatMap(m => [...m[0].matchAll(/data-q="([^"]+)"/g)].map(x => x[1])));
w.CLAVE_SEC[4] = w.CLAVE_SEC[4].map(l => l.filter(i => !antes.has(i)));
h = h.replace(/\n?<!--ENL-->[\s\S]*?<!--\/ENL-->/g, "");
const ini = h.indexOf('<button id="btnQ"');
const pos = [...h.slice(0, ini).matchAll(/<h([23])[\s>]/g)].map(m => ({ i: m.index, n: +m[1] }));
if (pos.length !== w.CLAVE_SEC[4].length || pos.length !== 39 || pos[9].n !== 2 || pos[29].n !== 3) throw new Error("los apartados de la página no cuadran (" + pos.length + ")");
const esq = new Set(w.CLAVE_ESQ[4].filter(i => banco.has(i)));
const sec = w.CLAVE_SEC[4].map(l => l.filter(i => banco.has(i)));
const extra = {};
banco.forEach((q, id) => {
  if (esq.has(id) && sec.some(l => l.includes(id))) return;
  const k = mapa[id]; if (k === undefined) throw new Error("sin ficha en mapa-preguntas: " + id);
  (extra[secDe(k)] = extra[secDe(k)] || []).push(q);
});
Object.keys(extra).map(Number).sort((a, b) => b - a).forEach(s => {
  const qs = extra[s], fin = s + 1 < pos.length ? pos[s + 1].i : ini;
  let trozo = h.slice(pos[s].i, fin);
  const corte = trozo.search(/\n?(<!--[^>]*-->\s*)*$/);
  const lis = qs.map(q => linea(corto(q)).replace("<li>", '<li data-q="' + q.id + '">')).join("\n");
  const bloque = '\n<!--ENL--><details class="mas"><summary>Dato de otras preguntas de este apartado (' + qs.length + ")</summary>\n<ul>\n" + lis + "\n</ul></details><!--/ENL-->";
  h = h.slice(0, pos[s].i) + trozo.slice(0, corte) + bloque + trozo.slice(corte) + h.slice(fin);
  let h2 = s; while (h2 > 0 && pos[h2].n !== 2) h2--;
  qs.forEach(q => { for (const x of [s, h2]) if (!sec[x].includes(q.id)) sec[x].push(q.id); });
});
const CSS = "<!--ENL--><style>details.mas{margin:4px 0 8px}details.mas>summary{cursor:pointer;font-size:.82em;color:#475569}li.cl-flash{outline:3px solid #f59e0b;border-radius:4px}@media print{details.mas{display:none!important}}</style><!--/ENL-->";
h = h.replace("</head>", () => "\n" + CSS + "</head>");
fs.writeFileSync("repaso-t4-esquema-clave-nuevo.html", h);
const cab = "/* completado por prompts/herramientas/tema4/clave-enlazar-t4.js */\n";
fs.writeFileSync("clave-tests/t4-sec.js", cab + "(window.CLAVE_SEC=window.CLAVE_SEC||{})[4]=" + JSON.stringify(sec) + ";\n");
fs.writeFileSync("clave-tests/t4-esq.js", cab + "(window.CLAVE_ESQ=window.CLAVE_ESQ||{})[4]=" + JSON.stringify([...esq]) + ";\n(window.CLAVE_LINK=window.CLAVE_LINK||{})[4]=" + JSON.stringify([...banco.keys()]) + ";\n");
fs.writeFileSync("clave-tests/t4-todo.js", cab + "(window.CLAVE_TODO=window.CLAVE_TODO||{})[4]=" + JSON.stringify(TODO.filter(g => g.q.length)) + ";\n");
const enSec = new Set(sec.flat());
console.log("banco " + banco.size + " · en el esquema " + esq.size + " · añadidas en desplegable " + Object.values(extra).flat().length + " · sin apartado " + [...banco.keys()].filter(i => !enSec.has(i)).length + " · nuevas en todo " + nuevas);
