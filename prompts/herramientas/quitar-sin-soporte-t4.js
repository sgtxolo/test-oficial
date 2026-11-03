// Quita del banco las preguntas del T4 que no tienen respaldo en el temario limpio ni en el PDF subrayado (4-79 y 4-87),
// y limpia sus ids de los enlaces del Exprés (expres/t4.js) y del mapa pregunta↔esquema.
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.resolve(__dirname, "../..");
const IDS = ["4-79", "4-87"];
console.log(cp.execFileSync("node", [path.join(__dirname, "borrar-preguntas.js"), path.join(ROOT, "test-oficial-conocimiento.html"), ...IDS], { encoding: "utf8" }));
let e = fs.readFileSync(path.join(ROOT, "expres/t4.js"), "utf8"), n = 0;
for (const id of IDS) e = e.replace(new RegExp('data-q=(\\\\?")' + id + ",", "g"), (m, q) => { n++; return "data-q=" + q; });
fs.writeFileSync(path.join(ROOT, "expres/t4.js"), e); console.log("enlaces del Exprés limpiados:", n);
let m = fs.readFileSync(path.join(ROOT, "esquemas-datos/mapa-preguntas.js"), "utf8"), k = 0;
for (const id of IDS) m = m.replace(new RegExp('"' + id + '":"[^"]*",?', "g"), () => { k++; return ""; });
fs.writeFileSync(path.join(ROOT, "esquemas-datos/mapa-preguntas.js"), m); console.log("entradas del mapa quitadas:", k);
