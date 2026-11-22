/* Arma repaso-tN-esquema-clave-nuevo.html a partir de la plantilla del T8 (CSS, audio, colores, scripts)
   + prompts/herramientas/clave-contenido/tN-cuerpo.html (h2/h3/listas/tablas, lo que va antes de #btnQ)
   + prompts/herramientas/clave-contenido/tN-trampas.html (interior del <div id="trampas">, sin la primera línea)
   + prompts/herramientas/clave-contenido/tN.json  {"titulo":"…","h1":"…","v":"796"}
   Las preguntas rápidas salen de expres/tN.js (cabeceras y marcas 🎯) y expres/qN.js.
   Uso: node prompts/herramientas/clave-armar.js N */
const fs = require("fs"), path = require("path");
const RAIZ = path.resolve(__dirname, "..", "..");
const N = +process.argv[2];
if (!N) { console.log("uso: node clave-armar.js N"); process.exit(1); }
const dir = path.join(RAIZ, "prompts", "herramientas", "clave-contenido");
const cfg = JSON.parse(fs.readFileSync(path.join(dir, "t" + N + ".json"), "utf8"));
const cuerpo = fs.readFileSync(path.join(dir, "t" + N + "-cuerpo.html"), "utf8");
const trampas = fs.readFileSync(path.join(dir, "t" + N + "-trampas.html"), "utf8");
const plantilla = fs.readFileSync(path.join(RAIZ, "repaso-t8-esquema-clave-nuevo.html"), "utf8");

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* --- preguntas rápidas --- */
global.window = {};
eval(fs.readFileSync(path.join(RAIZ, "expres", "t" + N + ".js"), "utf8"));
eval(fs.readFileSync(path.join(RAIZ, "expres", "q" + N + ".js"), "utf8"));
const ex = window.EXPRES_T[N].html, Q = window.EXPRES_Q[N];
const grupos = []; let actual = null;
const re = /<div class="(ex-fh|ex-linea|bloque-titulo)">([\s\S]*?)<\/div>|data-q="([^"]+)"/g; let m;
while ((m = re.exec(ex))) {
  if (m[1]) {
    const t = m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (m[1] === "bloque-titulo") { if (/Preguntas que no se pueden/.test(t)) { actual = { t: "Preguntas generales del tema", ids: [] }; grupos.push(actual); } continue; }
    const limpio = t.replace(/\s*(EXOF|EX|✱|R\d+)\s*/g, " ").replace(/:\s*🎯.*$/, "").replace(/\s+/g, " ").trim();
    actual = { t: limpio + (/✱/.test(t) ? " ✱" : ""), ids: [] }; grupos.push(actual);
  } else if (actual) { m[3].split(",").forEach(i => { if (!actual.ids.includes(i)) actual.ids.push(i); }); }
}
let total = 0;
const bloques = grupos.map(g => {
  const cand = g.ids.map(i => ({ i, q: Q[i] })).filter(o => o.q && !(o.q[2] & 2) && o.q[0].length > 14 && !/^señale|^es correcto/i.test(o.q[0]) && o.q[1].length < 260);
  cand.sort((a, b) => ((b.q[2] & 1) - (a.q[2] & 1)));
  const sel = cand.slice(0, 3); if (!sel.length) return "";
  total += sel.length;
  return '<div class="rq-art"><div class="rq-a">' + esc(g.t) + '</div><ol>' + sel.map(o => '<li><span class="rq-q">' + ((o.q[2] & 1) ? '<span class="rq-of">OF</span>' : '') + esc(o.q[0]) + '</span> <span class="rq-r">' + esc(o.q[1]) + '</span></li>').join("") + '</ol></div>';
}).join("");

/* --- montaje --- */
const iCabeza = plantilla.indexOf("</head><body>") + "</head><body>".length;
let cabeza = plantilla.slice(0, iCabeza).replace(/<title>[\s\S]*?<\/title>/, "<title>" + esc(cfg.titulo) + "</title>");
const leyenda = plantilla.match(/<div class="leyenda">[\s\S]*?<\/div>/)[0];
const iBtnQ = plantilla.indexOf('<button id="btnQ"'), iBtnT = plantilla.indexOf('<button id="btnT"'), iAud = plantilla.indexOf('<div id="aud">');
const btnQ = plantilla.slice(iBtnQ, plantilla.indexOf("</button>", iBtnQ) + 9).replace(/\(241\)/g, "(" + total + ")");
const btnT = plantilla.slice(iBtnT, plantilla.indexOf("</button>", iBtnT) + 9).replace(/tema 8/g, "tema " + N);
let cola = plantilla.slice(iAud);
const h2n = (cuerpo.match(/<h2>/g) || []).length;
let mapa = "n=" + Array.from({ length: h2n }, (_, k) => "/^" + N + "\\." + (k + 1) + "/.test(x)?" + (k + 1) + ":").join("") + "0;";
cola = cola.replace(/n=\/\^8\\\.1\/[^\n]*?:0;/, () => mapa);
if (!cola.includes(mapa)) throw new Error("no se pudo sustituir el mapa de h2");
cola = cola.replace(/clave-mejoras\.js\?v=\d+/, "clave-mejoras.js?v=" + (cfg.v || "796"));
const out = cabeza + "\n<h1>" + esc(cfg.h1) + "</h1>\n" + leyenda + "\n" + cuerpo + "\n\n" + btnQ + "\n" +
  '<div id="rqbox"><div class="rq-wrap"><div class="rq-h">✔ RECUERDA — preguntas rápidas del tema</div><div class="rq-sub">' + total +
  ' preguntas cortas con su respuesta, sacadas de las preguntas de test de cada artículo (<span class="rq-of">OF</span> = oficial).</div><div class="rq-cols">' + bloques + '</div></div></div>\n\n' +
  btnT + '\n<div class="tr" id="trampas"><b class="t">⚠ TRAMPAS DEL TEMA ' + N + ' (lo que se confunde en el test)</b>\n' + trampas + '\n</div>\n\n' + cola;
fs.writeFileSync(path.join(RAIZ, "repaso-t" + N + "-esquema-clave-nuevo.html"), out);
console.log("T" + N + ": escrito; preguntas rápidas " + total + "; h2 " + h2n + "; bytes " + out.length);
