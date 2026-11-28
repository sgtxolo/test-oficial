/* Enlaza TODAS las preguntas del T27 con su apartado del esquema clave (repaso-t27-esquema-clave-nuevo.html, escrito a mano: no se regenera).
   - Las preguntas que ya tenían sitio (clave-tests/t27-esq.js) se quedan igual.
   - A las que faltan se les asigna el <h3> de su artículo (ficha del esquema según mapa-preguntas.js) y se añade debajo un desplegable
     solo de pantalla (<!--ENL-->…<!--/ENL-->, no se imprime) con su dato: enunciado → respuesta correcta.
   - Escribe t27-sec.js, t27-esq.js (CLAVE_LINK = todas) y completa t27-todo.js con las preguntas del banco que no estaban.
   Se puede volver a pasar. Uso: node prompts/herramientas/tema27/clave-enlazar-t27.js */
const fs = require("fs"), path = require("path");
const RAIZ = path.resolve(__dirname, "..", "..", "..") + path.sep;
process.chdir(RAIZ);
const auto = fs.readFileSync("prompts/herramientas/clave-auto.js", "utf8");
const corta = (x, y) => { const i = auto.indexOf(x), j = auto.indexOf(y, i); if (i < 0 || j < 0) throw new Error("clave-auto.js: " + x); return auto.slice(i, j); };
const { linea } = new Function(corta("const esc = ", "/* ---- trocea") + corta('const L = "ABCD";', "const claveArt") + "return {linea};")();
const w = {}; const lee = f => new Function("window", fs.readFileSync(f, "utf8"))(w);
["clave-tests/t27-sec.js", "clave-tests/t27-esq.js", "clave-tests/t27-todo.js"].forEach(lee);

/* banco */
const app = fs.readFileSync("test-oficial-conocimiento.html", "utf8"), BS = String.fromCharCode(92);
const banco = new Map();
for (const m of app.matchAll(/\{"id":"(27-(?:ia-)?\d+)","pregunta"/g)) {
  let d = 0, s = false, e = false, j = m.index;
  for (; j < app.length; j++) { const c = app[j]; if (s) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') s = false; continue; } if (c === '"') s = true; else if (c === "{") d++; else if (c === "}" && !--d) break; }
  banco.set(m[1], JSON.parse(app.slice(m.index, j + 1)));
}
const corto = q => ({ i: q.id, p: q.pregunta, o: q.opciones, c: q.correcta, e: q.explicacion || "" });
/* todo: añadir las que faltan, agrupadas por apartado */
const TODO = w.CLAVE_TODO[27].map(g => ({ a: g.a, q: g.q.filter(q => banco.has(q.i)) }));
const ya = new Set(TODO.flatMap(g => g.q.map(q => q.i))); let nuevas = 0;
banco.forEach((q, id) => { if (ya.has(id)) return; const a = q.apartado || "Resto del tema"; let g = TODO.find(x => x.a === a); if (!g) TODO.push(g = { a, q: [] }); g.q.push(corto(q)); nuevas++; });

const mapa = {}; for (const m of fs.readFileSync("esquemas-datos/mapa-preguntas.js", "utf8").matchAll(/"(27-(?:ia-)?\d+)":"27-(\d+)-/g)) mapa[m[1]] = +m[2];
/* ficha del esquema → número de <h2>/<h3> de la página (orden de documento) */
const TRAMOS = [[0, 1], [1, 2], [9, 3], [12, 4], [15, 5], [18, 6], [22, 7], [27, 10], [28, 11], [44, 12], [54, 13], [61, 16], [62, 17], [63, 18], [67, 19], [73, 20], [96, 21], [120, 22], [128, 25], [140, 27], [149, 28], [163, 29], [172, 30], [190, 31], [200, 34], [208, 35], [209, 36], [210, 37], [211, 38], [212, 39], [214, 40]];
const secDe = k => TRAMOS.filter(t => t[0] <= k).pop()[1];

let h = fs.readFileSync("repaso-t27-esquema-clave-nuevo.html", "utf8");
/* lo añadido en una pasada anterior se quita (de la página y de los apartados) y se vuelve a calcular */
const antes = new Set([...h.matchAll(/<!--ENL-->[\s\S]*?<!--\/ENL-->/g)].flatMap(m => [...m[0].matchAll(/data-q="([^"]+)"/g)].map(x => x[1])));
w.CLAVE_SEC[27] = w.CLAVE_SEC[27].map(l => l.filter(i => !antes.has(i)));
h = h.replace(/\n?<!--ENL-->[\s\S]*?<!--\/ENL-->/g, "");
const ini = h.indexOf('<button id="btnQ"');
const pos = [...h.slice(0, ini).matchAll(/<h([23])[\s>]/g)].map(m => ({ i: m.index, n: +m[1] }));
if (pos.length !== w.CLAVE_SEC[27].length || pos[1].n !== 3 || pos[24].n !== 2 || pos[40].n !== 3) throw new Error("los apartados de la página no cuadran (" + pos.length + ")");
const esq = new Set(w.CLAVE_ESQ[27].filter(i => banco.has(i)));
const sec = w.CLAVE_SEC[27].map(l => l.filter(i => banco.has(i)));
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
fs.writeFileSync("repaso-t27-esquema-clave-nuevo.html", h);
const cab = "/* completado por prompts/herramientas/tema27/clave-enlazar-t27.js */\n";
fs.writeFileSync("clave-tests/t27-sec.js", cab + "(window.CLAVE_SEC=window.CLAVE_SEC||{})[27]=" + JSON.stringify(sec) + ";\n");
fs.writeFileSync("clave-tests/t27-esq.js", cab + "(window.CLAVE_ESQ=window.CLAVE_ESQ||{})[27]=" + JSON.stringify([...esq]) + ";\n(window.CLAVE_LINK=window.CLAVE_LINK||{})[27]=" + JSON.stringify([...banco.keys()]) + ";\n");
fs.writeFileSync("clave-tests/t27-todo.js", cab + "(window.CLAVE_TODO=window.CLAVE_TODO||{})[27]=" + JSON.stringify(TODO.filter(g => g.q.length)) + ";\n");
const enSec = new Set(sec.flat());
console.log("banco " + banco.size + " · en el esquema " + esq.size + " · añadidas en desplegable " + Object.values(extra).flat().length + " · sin apartado " + [...banco.keys()].filter(i => !enSec.has(i)).length + " · nuevas en todo " + nuevas);
