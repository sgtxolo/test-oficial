/* Esquema clave del T26 con TODAS las preguntas enlazadas a su artículo (mismo estilo que clave-auto.js).
   Cada ficha del esquema (esquemas-datos/t26.js; la de cada pregunta está en mapa-preguntas.js) tiene su <h3>:
   - se imprime: el texto del Exprés con subrayado + las preguntas oficiales que ese texto no recoge;
   - solo en pantalla (desplegable): el dato de las demás preguntas, y los artículos que solo tienen preguntas sin texto en el resumen.
   Uso:  node prompts/herramientas/tema26/clave-t26.js           → escribe clave-contenido/t26-cuerpo.html, -trampas.html y t26.json (luego clave-armar.js 26)
         node prompts/herramientas/tema26/clave-t26.js enlaces   → (después de clave-mejoras-datos.js 26) escribe clave-tests/t26-sec.js y t26-esq.js */
const fs = require("fs"), path = require("path"), vm = require("vm");
const RAIZ = path.resolve(__dirname, "..", "..", "..") + path.sep;
process.chdir(RAIZ);
const N = 26, dir = RAIZ + "prompts/herramientas/clave-contenido/";

/* funciones comunes copiadas de clave-auto.js (se leen de allí para no duplicarlas) */
const auto = fs.readFileSync(RAIZ + "prompts/herramientas/clave-auto.js", "utf8");
const corta = (x, y) => { const i = auto.indexOf(x), j = auto.indexOf(y, i); if (i < 0 || j < 0) throw new Error("clave-auto.js: " + x); return auto.slice(i, j); };
const F = new Function(corta("const esc = ", "/* ---- trocea") + corta("const norm = t =>", "const setCore") + corta('const L = "ABCD";', "const claveArt") + "return {esc,plano,colorea,words,respuesta,esInc,linea};")();
const { esc, plano, colorea, words, respuesta, esInc, linea } = F;
const cubre = (set, q) => {
  const wa = words(q.o[q.c] || ""), wq = words(q.p); if (!wa.length) return false;
  const sa = wa.filter(x => set.has(x)).length / wa.length, sq = wq.length ? wq.filter(x => set.has(x)).length / wq.length : 0;
  return sa >= 0.7 && sq >= 0.4;
};
global.window = {};
eval(fs.readFileSync("clave-tests/t26-todo.js", "utf8"));
const uniq = new Map(); window.CLAVE_TODO[N].forEach(g => g.q.forEach(q => uniq.set(q.i, q)));
/* clave-tests.js deja en t26.js las preguntas de los artículos del borrador y en -todo.js el resto: aquí se une todo en -todo.js */
eval(fs.readFileSync("clave-tests/t26.js", "utf8"));
const faltan = (window.CLAVE_TEST[N] || []).map(g => ({ a: g.a, q: g.q.filter(q => !uniq.has(q.i)) })).filter(g => g.q.length);
if (faltan.length) {
  faltan.forEach(g => g.q.forEach(q => uniq.set(q.i, q)));
  fs.writeFileSync("clave-tests/t26-todo.js", "/* generado por clave-tests.js + tema26/clave-t26.js (unión de t26.js y el resto); no editar a mano */\n(window.CLAVE_TODO=window.CLAVE_TODO||{})[26]=" + JSON.stringify(window.CLAVE_TODO[N].concat(faltan)) + ";\n");
}
const mapa = {}; for (const m of fs.readFileSync("esquemas-datos/mapa-preguntas.js", "utf8").matchAll(/"(26-(?:ia-)?\d+)":"26-(\d+)-/g)) mapa[m[1]] = +m[2];

if (process.argv[2] === "enlaces") {
  const h = fs.readFileSync("repaso-t26-esquema-clave-nuevo.html", "utf8");
  const main = h.slice(0, h.indexOf('<button id="btnQ"'));
  const pos = [...main.matchAll(/<h([23])([^>]*)>/g)];
  const sec = pos.map(p => { const k = p[2].match(/data-k="(\d+)"/); return { nivel: +p[1], ids: k ? [...uniq.keys()].filter(i => mapa[i] === +k[1]) : [] }; });
  const orden = ids => ids.sort((a, b) => (/-ia-/.test(a) ? 1 : 0) - (/-ia-/.test(b) ? 1 : 0));
  sec.forEach((s, i) => { if (s.nivel !== 2) return; let j = i + 1; while (j < sec.length && sec[j].nivel !== 2) { s.ids.push(...sec[j].ids); j++; } });
  sec.forEach(s => orden(s.ids));
  const enlazadas = new Set(sec.flatMap(s => s.ids));
  const impreso = main.replace(/<!--PANT-->[\s\S]*?<!--\/PANT-->/g, "");
  const set = new Set(words(impreso.slice(impreso.indexOf("<h2"))));
  const conLinea = new Set([...impreso.matchAll(/data-q="([^"]+)"/g)].flatMap(m => m[1].split(" ")));
  const esq = [...uniq.values()].filter(q => conLinea.has(q.i) || cubre(set, q)).map(q => q.i);
  const cab = "/* generado por prompts/herramientas/tema26/clave-t26.js; no editar a mano */\n";
  fs.writeFileSync("clave-tests/t26-sec.js", cab + "(window.CLAVE_SEC=window.CLAVE_SEC||{})[26]=" + JSON.stringify(sec.map(s => s.ids)) + ";\n");
  fs.writeFileSync("clave-tests/t26-esq.js", cab + "(window.CLAVE_ESQ=window.CLAVE_ESQ||{})[26]=" + JSON.stringify(esq) + ";\n(window.CLAVE_LINK=window.CLAVE_LINK||{})[26]=" + JSON.stringify([...enlazadas]) + ";\n");
  const sinLinea = [...uniq.keys()].filter(i => !enlazadas.has(i));
  console.log("enlazadas " + enlazadas.size + "/" + uniq.size + " · en la parte impresa " + esq.length + " · sin sección " + sinLinea.length + " " + sinLinea.slice(0, 10));
  process.exit(0);
}

const cfg = JSON.parse(fs.readFileSync(dir + "t26-auto.json", "utf8"));
/* fichas del esquema (k) */
const win = {}; vm.runInNewContext(fs.readFileSync("esquemas-datos/t26.js", "utf8"), { window: win });
require(RAIZ + "prompts/herramientas/esq-virtual.js");
const txt = ["lo11", "lo12", "l29", "ord", "res1", "res2", "res3"].map(k => global.window.ESQ_TXT && global.window.ESQ_TXT["T26." + k] || win.ESQ_TXT["T26." + k]).join("");
const cabs = [...txt.matchAll(/<div class="articulo-head">([\s\S]*?)<\/div>/g)].map(m => plano(m[1]));
const INICIO = [0, 69, 163, 306, 314, 335, 355];   // primera ficha de cada norma
if (!/^Preámbulo I · Régimen disciplinario/.test(cabs[69]) || !/Régimen del personal/.test(cabs[163]) || !/^PRIMERO\..*sexual/.test(cabs[335]) || cabs.length !== 382) throw new Error("las fichas del esquema no cuadran (" + cabs.length + ")");
const normaDe = k => INICIO.filter(x => x <= k).length - 1;
/* fichas del Exprés por cabecera */
eval(fs.readFileSync("expres/t26.js", "utf8"));
const clave = s => s.toLowerCase().normalize("NFD").replace(/[^a-z0-9]/g, "");
const exp = {};
for (const p of window.EXPRES_T[N].html.split(/(?=<div class="bloque-titulo")|(?=<div class="ex-ficha")|(?=<div class="ex-linea")/)) {
  const mh = p.match(/^<div class="ex-ficha[^"]*"[\s\S]*?<div class="ex-fh">([\s\S]*?)<\/div>\s*<div class="ex-fb">([\s\S]*)$/); if (!mh) continue;
  const c = plano(mh[1]).replace(/\s*:?\s*🎯.*$/, "").replace(/\s+(EXOF|EX|✱|R\d+)(?=\s|$)/g, "").trim();
  exp[clave(c)] = { hdr: mh[1], cuerpo: mh[2] };
}
const ratio = x => { const tot = plano(x).length; let col = 0; (x.match(/<(?:b class="[a-z]"|mark)>[\s\S]*?<\/(?:b|mark)>/g) || []).forEach(y => { col += plano(y).length; }); return col / Math.max(1, tot); };
const core = cabs.map((c, k) => { const f = exp[clave(c)]; return f ? colorea(f.cuerpo).filter(x => ratio(x) >= (cfg.min || 0)) : []; });
const setCore = new Set(words(core.flat().join(" ")));
const porK = cabs.map(() => []); uniq.forEach(q => { const k = mapa[q.i]; if (k === undefined) throw new Error("sin ficha " + q.i); porK[k].push(q); });
porK.forEach(l => l.sort((a, b) => (/-ia-/.test(a.i) ? 1 : 0) - (/-ia-/.test(b.i) ? 1 : 0) || a.i.localeCompare(b.i, "es", { numeric: true })));
const lineas = qs => { const m = new Map(); qs.forEach(q => { const li = linea(q); (m.get(li) || m.set(li, []).get(li)).push(q.i); }); return [...m].map(([li, ids]) => li.replace("<li>", '<li data-q="' + ids.join(" ") + '">')); };

const esOf = q => !/-ia-/.test(q.i);
let nImp = 0, nPant = 0, nOfImp = 0;
const ficha = (c, k) => {
  const f = exp[clave(c)], imp = porK[k].filter(q => esOf(q) && !cubre(setCore, q));
  const set = new Set(words(core[k].concat(imp.map(linea)).join(" ")));
  const resto = porK[k].filter(q => !imp.includes(q) && !cubre(set, q));
  const impresa = core[k].length || imp.length;
  if (!impresa && !porK[k].length) return null;
  const titulo = c.replace(/\s*·\s*(Derechos y deberes|Régimen disciplinario|Régimen del personal|Orden PRE\/1983\/2012|Protocolo[^·]*)$/, "");
  const mA = titulo.match(/^Art[íi]culo\s+(\d+(?:\s*(?:bis|ter))?)$/);
  const h = f ? plano(f.hdr) : "", rs = f ? [...new Set(f.hdr.match(/R\d+/g) || [])] : [];
  const h3 = '<h3 data-k="' + k + '">' + esc(titulo) + (/EXOF/.test(h) ? ' <span class="ex">EXOF</span>' : /(^|[^O])\bEX\b/.test(h.replace(/EXOF/g, "")) ? ' <span class="ex">EX</span>' : "") + (/✱/.test(h) ? ' <span class="as">✱</span>' : "") + (rs.length ? " <em>(" + rs.join(", ") + ")</em>" : "") + (mA ? ' <span class="art">art. ' + mA[1] + "</span>" : "") + "</h3>";
  const li = core[k].map(s => "<li>" + s + "</li>").concat(lineas(imp));
  nOfImp += imp.length;
  let mas = resto.length ? '<details class="mas"><summary>' + (impresa ? "Dato de otras preguntas de este artículo" : "Dato de sus preguntas") + " (" + resto.length + ")</summary>\n<ul>\n" + lineas(resto).join("\n") + "\n</ul></details>" : "";
  if (impresa) { nImp++; return { impresa: true, html: h3 + (li.length ? "\n<ul>\n" + li.join("\n") + "\n</ul>" : "") + (mas ? "\n<!--PANT-->" + mas + "<!--/PANT-->" : "") }; }
  nPant++; return { impresa: false, html: h3 + "\n" + (mas || '<p><em>Las preguntas de este artículo ya salen en otros apartados.</em></p>') };
};
const CSS = "<style>details.mas,details.otros{margin:4px 0 8px}details.mas>summary,details.otros>summary{cursor:pointer;font-size:.82em;color:#475569}details.otros>summary{font-weight:700}li.cl-flash{outline:3px solid #f59e0b;border-radius:4px}@media print{details.mas,details.otros{display:none!important}body{font-size:11px;line-height:1.22}table{font-size:10.4px}h2{font-size:13px}h3{font-size:12px}}</style>\n";
const cuerpoNormas = cfg.h2.map((c, n) => {
  const fs2 = cabs.map((cab, k) => normaDe(k) === n ? ficha(cab, k) : null).filter(Boolean);
  const imp = fs2.filter(x => x.impresa).map(x => x.html).join("\n"), otras = fs2.filter(x => !x.impresa);
  return "<!-- ===================== " + c.t.split(" ")[0] + " ===================== -->\n<h2>" + esc(c.t) + "</h2>\n" + imp +
    (otras.length ? '\n<!--PANT--><details class="otros"><summary>Otros artículos de esta norma con preguntas (' + otras.length + "; solo en pantalla, no se imprimen)</summary>\n" + otras.map(x => x.html).join("\n") + "\n</details><!--/PANT-->" : "");
}).join("\n");

/* COMPARATIVAS y trampas (igual que clave-auto.js) */
const reCif = /(\b\d+\s*(?:%|por ciento|días?|horas?|meses|años?|metros)\b|\b(?:un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|doce|quince|veinte|treinta)\s+(?:días?|horas?|meses|años?|semanas?)\b|\bal menos un \d+%|\bplazo\b)/i;
const oficiales = [...uniq.values()].filter(esOf);
const vistos = new Set(), porNorma = cfg.h2.map(() => []);
cabs.forEach((c, k) => { if (!porK[k].some(esOf)) return; core[k].forEach(s => { const t = plano(s); if (!reCif.test(t) || t.length >= 300 || vistos.has(t.slice(0, 80))) return; vistos.add(t.slice(0, 80)); porNorma[normaDe(k)].push('<tr><td><b class="o">' + esc(c.replace(/\s*·.*$/, "") + " (" + cfg.h2[normaDe(k)].t.split(" ")[0] + ")") + "</b></td><td>" + s + "</td></tr>"); }); });
const filas = []; for (let i = 0; filas.length < cfg.maxFilas && i < 40; i++) porNorma.forEach(l => { if (l[i] && filas.length < cfg.maxFilas) filas.push(l[i]); });
filas.sort((a, b) => a.match(/\((26\.\d)\)/)[1].localeCompare(b.match(/\((26\.\d)\)/)[1]));
const corto = (p, n) => { p = p.replace(/\s+/g, " ").trim().replace(/\s*Se[ñn]ale la \w+\.?$/i, "").replace(/_{3,}/g, "…"); return p.length > n ? "…" + p.slice(-(n - 3)).replace(/^\S*\s+/, "") : p; };
const falsas = oficiales.filter(esInc).slice(0, cfg.maxFalsas).map(q => { const ok = q.o.filter((o, i) => i !== q.c).map(o => o.replace(/\s+/g, " ").trim()).join(" · "); return "<tr><td>" + esc(corto(q.p, 170)) + '</td><td><b class="p">FALSO</b>: ' + esc(q.o[q.c].replace(/\s+/g, " ").trim()) + "</td><td>" + esc(ok.length > 330 ? ok.slice(0, 327) + "…" : ok) + "</td></tr>"; });
const cuerpo = CSS + cuerpoNormas + '\n<!-- ===================== COMPARATIVAS ===================== -->\n<h2>COMPARATIVAS · lo que se confunde dentro del tema</h2>\n<h3>Plazos y cifras del tema (recogidos del esquema, con la norma o artículo)</h3>\n<table>\n<tr><th>Dónde</th><th>Dato</th></tr>\n' + filas.join("\n") + "\n</table>\n<h3>Falsas típicas de «señale la incorrecta» (opción falsa que sale en el test → lo correcto, según las otras opciones)</h3>\n<table>\n<tr><th>Pregunta (resumida)</th><th>Opción FALSA</th><th>Las otras opciones (correctas)</th></tr>\n" + falsas.join("\n") + "\n</table>\n";
const tr = oficiales.filter(q => reCif.test(q.o[q.c] || "") && q.o[q.c].length < 160).slice(0, 25).map(q => "<li><strong>" + esc(corto(q.p, 190)) + "</strong> → <mark>" + esc(respuesta(q)) + "</mark> (las otras opciones del test dan cifras o sujetos distintos: leer qué se pregunta)</li>");
const trF = oficiales.filter(esInc).slice(0, 25).map(q => "<li><strong>Señale la incorrecta</strong> · " + esc(corto(q.p, 150)) + " → FALSA: <mark>" + esc(q.o[q.c].replace(/\s+/g, " ")) + "</mark></li>");
fs.writeFileSync(dir + "t26-cuerpo.html", cuerpo);
fs.writeFileSync(dir + "t26-trampas.html", "<ul>\n" + tr.concat(trF).join("\n") + "\n</ul>");
fs.writeFileSync(dir + "t26.json", JSON.stringify({ titulo: cfg.titulo, h1: cfg.h1, v: cfg.v }));
console.log("T26 fichas impresas " + nImp + " · solo pantalla " + nPant + " · oficiales " + oficiales.length + " (con línea impresa " + nOfImp + ") · cuerpo " + cuerpo.length);
