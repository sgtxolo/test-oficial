/* Conecta un esquema clave nuevo ya generado: clave-fijos.js, service-worker.js (APP_SHELL + CACHE+1), lista del botón ⭐ del test y PARTES de clave-mejoras.js.
   Uso: node prompts/herramientas/clave-conectar.js N P     (P = partes del narrado) */
const fs = require("fs"), path = require("path");
const R = path.resolve(__dirname, "..", "..") + path.sep;
const N = +process.argv[2], P = +process.argv[3] || 1;
const rd = f => fs.readFileSync(R + f, "utf8"), wr = (f, s) => fs.writeFileSync(R + f, s);

/* 1) clave-fijos.js: comenta cualquier entrada antigua del tema y añade la nueva */
let cf = rd("expres-subrayado/clave-fijos.js");
cf = cf.replace(new RegExp("^(\\s*)" + N + ": \"repaso-t" + N + "-borrador\\.html\",", "m"), (m, sp) => sp + "// (antigua) " + m.trim());
if (!new RegExp("^\\s*" + N + ": \"repaso-t" + N + "-esquema-clave-nuevo").test(cf.split("\n").join("\n"))) {
  cf = cf.replace(/^(\s*)8: "repaso-t8-esquema-clave-nuevo\.html",.*$/m, (m, sp) => m + "\n" + sp + N + ": \"repaso-t" + N + "-esquema-clave-nuevo.html\",   // 22/11/2026: Esquema clave T" + N + " nuevo (listas y cuadros, audio, trampas, rápidas y mejoras comunes)");
}
wr("expres-subrayado/clave-fijos.js", cf);

/* 2) service worker */
let sw = rd("service-worker.js");
const lineas = ["repaso-t" + N + "-esquema-clave-nuevo.html", "clave-tests/t" + N + "-todo.js", "clave-tests/t" + N + "-esq.js", "clave-tests/t" + N + "-sec.js", "clave-tests/t" + N + "-amar.js", "clave-arts/t" + N + ".js", "clave-arts/t" + N + "-f.js", "clave-audio/t" + N + ".js"];
for (let p = 2; p <= P; p++) lineas.push("clave-audio/t" + N + "-" + p + ".js");
if (!sw.includes('"./repaso-t' + N + '-esquema-clave-nuevo.html"')) {
  sw = sw.replace(/^(\s*)"\.\/repaso-t2-esquema-clave-nuevo\.html",/m, (m, sp) => lineas.map(l => sp + '"./' + l + '",').join("\n") + "\n" + m);
}
sw = sw.replace(/CACHE_NAME = "oposicion-cache-v(\d+)"/, (m, v) => 'CACHE_NAME = "oposicion-cache-v' + (+v + 1) + '"');
wr("service-worker.js", sw);

/* 3) botón ⭐ del test */
let t = rd("test-oficial-conocimiento.html");
t = t.replace(/if \(id && \[([\d, ]+)\]\.includes\(\+t\)\)\{/, (m, l) => { const a = l.split(",").map(x => +x.trim()); if (!a.includes(N)) a.push(N); a.sort((x, y) => x - y); return "if (id && [" + a.join(", ") + "].includes(+t)){"; });
wr("test-oficial-conocimiento.html", t);

/* 4) PARTES */
let cm = rd("clave-mejoras.js");
cm = cm.replace(/var PARTES = \(\{([^}]*)\}\)\[NT\]/, (m, l) => { const o = {}; l.split(",").forEach(x => { const k = x.split(":"); if (k.length === 2) o[+k[0].trim()] = +k[1].trim(); }); o[N] = P; return "var PARTES = ({ " + Object.keys(o).sort((a, b) => a - b).map(k => k + ": " + o[k]).join(", ") + " })[NT]"; });
wr("clave-mejoras.js", cm);
console.log("T" + N + " conectado (partes " + P + ")");
