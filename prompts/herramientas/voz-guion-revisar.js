// Uso: node prompts/herramientas/voz-guion-revisar.js N  -> recortes visibles sin narración escrita e ids sobrantes
const path = require("path"), R = path.join(__dirname, "..", "..", "expres-subrayado"), t = +process.argv[2];
global.window = {};
require(path.join(R, "datos-t" + t + ".js")); require(path.join(R, "voz-guion-t" + t + ".js"));
const P = window.EXSUB[t].piezas, G = window.VOZ_G[t], ids = new Set(P.map(p => p.id));
const vis = P.filter(p => !p.extra), sin = vis.filter(p => !G[p.id]), sobra = Object.keys(G).filter(k => !ids.has(k));
console.log("Tema " + t + ": " + (vis.length - sin.length) + "/" + vis.length + " recortes narrados, " + Object.values(G).flat().join(" ").split(/\s+/).length + " palabras");
if (sin.length) console.log("Sin guion: " + sin.map(p => p.id).join(" "));
if (sobra.length) console.log("Ids que no existen: " + sobra.join(" "));
