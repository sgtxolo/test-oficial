// uso: node artof.js <tema> <datos.json> -> para cada fila, busca su cita t en el texto oficial y muestra el ARTÍCULO anterior más cercano
const fs = require("fs"); const [T, f] = process.argv.slice(2); const Q = JSON.parse(fs.readFileSync(f, "utf8"));
const nrm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/-\s*\n\s*/g, "").replace(/[^a-z0-9]/g, "");
const raw = fs.readFileSync((require("fs").existsSync("prompts/temario-limpio/tema" + T + "/oficial-paginas.txt") ? "prompts/temario-limpio/tema" + T + "/oficial-paginas.txt" : "prompts/temario-limpio/tema" + T + "/temario.txt"), "utf8");
// índice normalizado con mapa a posiciones originales
let norm = "", map = []; for (let i = 0; i < raw.length; i++) { const c = nrm(raw[i]); if (c) { norm += c; map.push(i); } }
const heads = []; const re = /(?:ART[ÍI]CULO|Art[íi]culo)\s+(\d+[\w ]*?)\.?\s/g; let m; while ((m = re.exec(raw))) heads.push([m.index, m[1].trim()]);
Q.forEach((r, i) => { const t = nrm(r[4]); const p = norm.indexOf(t.slice(0, 60)); if (p < 0) { console.log(i, r[0], "→ ??? no encontrada"); return; } const pos = map[p]; let h = null; for (const x of heads) if (x[0] <= pos) h = x[1]; else break; console.log(i, r[0], "→ artículo del texto:", h); });
