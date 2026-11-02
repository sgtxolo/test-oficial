// Cuenta, por tema, las preguntas del test cuya explicación NO lleva norma en lila (ref-norma). Debe dar 0 en el tema que cierras.
// Uso: node comprobar-citas.js [tema]   (sin argumento: todos los temas)
const fs = require("fs"), path = require("path");
const t = fs.readFileSync(path.resolve(__dirname, "../../test-oficial-conocimiento.html"), "utf8");
const solo = process.argv[2];
const re = /\{"id":"(\d+)-((?:ia-)?\d+)","pregunta".*?"explicacion":"((?:[^"\\]|\\.)*)","apartado"/g;
const falta = {}; let m;
while ((m = re.exec(t))) {
  if (solo && m[1] !== solo) continue;
  if (!/ref-norma/.test(m[3])) (falta[m[1]] = falta[m[1]] || []).push(m[1] + "-" + m[2]);
}
const temas = Object.keys(falta).sort((a, b) => a - b);
if (!temas.length) console.log("OK: todas las preguntas llevan norma en lila");
temas.forEach(k => console.log("T" + k + ": " + falta[k].length + " sin cita · " + falta[k].slice(0, 8).join(", ") + (falta[k].length > 8 ? "…" : "")));
process.exitCode = temas.length ? 1 : 0;
