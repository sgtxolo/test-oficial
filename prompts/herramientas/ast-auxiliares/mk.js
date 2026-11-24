// uso: node mk.js <bloque> <norma k por defecto> <datos.json> <titulo> [tema=1]  -> escribe prompts/herramientas/preguntas-t{tema}{r|a}-b{bloque}.js
// fila: [a, r, e, [correcta, f1, f2, f3], t, p, dificil?, k?]
const fs = require("fs"); const [b, k, f, titulo, T = "1"] = process.argv.slice(2); const Q = JSON.parse(fs.readFileSync(f, "utf8"));
const lib = (T === "1" || T === "3" || T === "4") ? "preguntas-t" + T + "r-lib.js" : "preguntas-t" + T + "-lib.js", name = T === "1" ? "preguntas-t1r-b" + b + ".js" : "preguntas-t" + T + "a-b" + b + ".js";
let out = "// Tema " + T + " · bloque " + b + " · " + titulo + " → banco OFICIAL\n// Uso: node prompts/herramientas/" + name + " --json privado/tmp/b" + b + ".json  y luego  node prompts/herramientas/anade-oficiales-ast.js " + T + " privado/tmp/b" + b + ".json\nconst k = " + JSON.stringify(k) + ";\nconst Q = [\n";
for (const [a, r, en, o, t, p, d, kk] of Q) out += "{k: " + (kk ? JSON.stringify(kk) : "k") + ", a: " + JSON.stringify(a) + ", r: " + JSON.stringify(r) + ", e: " + JSON.stringify(en) + ",\n o: " + JSON.stringify(o) + ",\n t: " + JSON.stringify(t) + ", p: " + JSON.stringify(p) + (d ? ", d: 'dificil'" : "") + "},\n";
out += "];\nrequire('./" + lib + "').run({ bloque: " + b + ", Q });\n";
fs.writeFileSync("prompts/herramientas/" + name, out);
console.log("escrito", name);
