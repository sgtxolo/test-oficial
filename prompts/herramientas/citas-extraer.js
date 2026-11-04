// Genera esquemas-datos/citas-manual-tN.js a partir de un fichero de especificaciones, copiando el literal del texto
// del temario (y comprobando que existe). Uso: node citas-extraer.js <specs.js> <salida.js>
// specs.js exporta { norma: {clave: "Nombre de la norma"}, fuentes: {clave: "ruta/relativa/a/prompts/temario-limpio"}, items: [[id, localizador, clavNorma, clavFuente, inicio, fin?], ...] }
// El literal va desde «inicio» hasta «fin» (inclusive) en el texto normalizado (guiones de fin de línea arreglados, espacios colapsados). Si falta «fin», el literal es «inicio».
// Separar tramos con «…» en «inicio»: "tramo1 … tramo2" -> cada tramo se busca por separado (el primero con «|fin» si se quiere ampliar: "ini|fin").
const fs = require("fs"), path = require("path");
const [,, specF, outF] = process.argv;
const S = require(path.resolve(specF));
const cache = {};
const norm = s => s.replace(/=====PAG \d+=====/g, " ").replace(/-\n(?=[a-záéíóúñ])/g, "").replace(/\s+/g, " ").trim();
const src = k => cache[k] || (cache[k] = norm(fs.readFileSync(path.resolve(__dirname, "../temario-limpio", S.fuentes[k]), "utf8")));
function tramo(t, k, desde) {
  const [a, b] = t.split("|").map(x => x.trim());
  const T = src(k); const i = T.indexOf(a, desde);
  if (i < 0) throw new Error("no encontrado: " + a);
  if (!b) return [T.slice(i, i + a.length), i + a.length];
  const j = T.indexOf(b, i + a.length - 0);
  if (j < 0) throw new Error("fin no encontrado: " + b + " (inicio " + a + ")");
  return [T.slice(i, j + b.length), j + b.length];
}
const out = {}; let err = 0;
for (const [id, loc, nk, fk, ini, fix] of S.items) {
  try {
    let pos = 0; const partes = [];
    for (const t of ini.split(" … ")) { const [lit, p] = tramo(t, fk, pos); partes.push(lit); pos = p; }
    let L = loc;
    if (loc === "AUTO") { // Directiva: «Apartado N, punto k» a partir de la posición del primer tramo
      const raw = fs.readFileSync(path.resolve(__dirname, "../temario-limpio", S.fuentes[fk]), "utf8").split("\n");
      const f = norm(partes[0].slice(0, 40)); let ap = "", pt = "";
      for (const ln of raw) { const h = ln.match(/^Apartado (\d+)\./); if (h) ap = h[1]; const n = ln.match(/^(\d+)\. /); if (norm(ln).includes(f)) { pt = n ? n[1] : ""; break; } }
      L = "Apartado " + ap + (pt ? ", punto " + pt : "");
    }
    let lit = partes.join(" … "); for (const [a, b] of fix || []) lit = lit.split(a).join(b); // fix: [[de, a],…] arregla erratas del texto fuente
    out[id] = [L, lit, S.norma[nk]];
  } catch (e) { err++; console.error(id + ": " + e.message); }
}
fs.writeFileSync(outF, "window.CITAS_PREG=Object.assign(window.CITAS_PREG||{}," + JSON.stringify(out) + ");\n");
console.log(Object.keys(out).length + " citas escritas, " + err + " errores → " + outF);
