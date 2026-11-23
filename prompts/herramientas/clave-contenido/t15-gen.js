/* Genera t15-cuerpo.html = t15-core.html (a mano) + bloques «más preguntas oficiales» (respuesta literal) por norma + t15-comparativas.html.
   Uso: node prompts/herramientas/clave-contenido/t15-gen.js */
const fs = require("fs"), path = require("path");
const D = __dirname, R = path.resolve(D, "..", "..", "..") + path.sep;
const core = fs.readFileSync(D + "/t15-core.html", "utf8");
const comp = fs.readFileSync(D + "/t15-comparativas.html", "utf8");
global.window = {};
eval(fs.readFileSync(R + "clave-tests/t15-todo.js", "utf8"));
const uniq = new Map(); window.CLAVE_TODO[15].forEach(g => g.q.forEach(q => uniq.set(q.i, q)));
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const norm = t => t.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const STOP = new Set("para como esta este esos esas sobre entre desde hasta cuando donde segun sera seran podra podran todos todas cada otro otra otros otras estado estados miembro miembros reglamento articulo parte partes".split(" "));
const words = t => [...new Set(norm(t).split(" ").filter(w => w.length >= 4 && !STOP.has(w)))];
const cobertura = (set, q) => {
  const wa = words(q.o[q.c] || ""), wq = words(q.p); if (!wa.length) return true;
  const sa = wa.filter(x => set.has(x)).length / wa.length, sq = wq.length ? wq.filter(x => set.has(x)).length / wq.length : 0;
  return sa >= 0.7 && sq >= 0.4;
};
const setCore = new Set(words(core));
const mapaExpres = JSON.parse(fs.readFileSync(process.env.NORMA_JSON || (D + "/t15-norma.json"), "utf8"));
function norma(q) {
  const t = q.p + " " + q.o[q.c];
  if (/Instrucci[oó]n 12\/2018/i.test(t)) return 7;
  if (/NTF|Norma T[eé]cnica de Funcionamiento|Equipos VIOG/i.test(t)) return 6;
  if (/seguimiento por medios telem|Cometa|\bDLV\b|\bDLI\b|RSPT|brazalete|dispositivo telem/i.test(t)) return 5;
  if (/Instrucci[oó]n 1\/2025|VioG[eé]n|\bVPR\b|\bVPER\b|Plan de Seguridad Personalizado|nivel de riesgo|Casos? en el Sistema/i.test(t)) return 3;
  if (/Instrucci[oó]n 5\/2021|Protocolo Cero|primer contacto/i.test(t)) return 4;
  if (/Resoluci[oó]n de 28 de junio|Acuerdo Reglamentario|Protocolo de [Aa]ctuaci[oó]n de las Fuerzas|Real Decreto de 28 de junio|atestado|alejamiento|Fiscal de Sala/i.test(t)) return 2;
  if (/Ley Org[aá]nica 1\/2004|violencia de g[eé]nero/i.test(t)) return 1;
  const m = mapaExpres[q.i]; return m >= 1 && m <= 7 ? m : 1;
}
const L = "ABCD";
function respuesta(q) {
  let a = q.o[q.c].replace(/\s+/g, " ").trim();
  const k = a.match(/^(?:las respuestas |las opciones )?([ABCD])\s*(?:y|,)\s*([ABCD])\b/i);
  if (k) { return [k[1], k[2]].map(x => q.o[L.indexOf(x.toUpperCase())].replace(/\s+/g, " ").trim()).join(" · "); }
  if (/^(todas|todos|ambas|ambos)\b/i.test(a)) { return q.o.filter((o, i) => i !== q.c).map(o => o.replace(/\s+/g, " ").trim()).join(" · "); }
  return a;
}
function lineas(q) {
  const inc = /incorrect|falsa|no es cierta|no es correcta|excepto|\bNO corresponde|\bNO corresponder/i.test(q.p.slice(-190));
  let p = q.p.replace(/\s+/g, " ").trim();
  let segs = p.split(/(?<=[.:?)])\s+(?=[A-ZÁÉÍÓÚ(¿])/);
  let titulo = "";
  while (segs.length > 1 && /^(\(.*?\)\s*)?(Ley Org|Instrucci|Protocolo|Norma T|Resoluci|Acuerdo|Real Decreto|Seg[uú]n el Protocolo)/i.test(segs[0]) && segs[0].length < 300) segs.shift();
  if (segs.length > 1 && segs[0].length < 90 && !/\?$/.test(segs[0])) titulo = segs.shift().replace(/[.:]$/, "");
  let resto = segs.join(" ").replace(/\s*\(?señal[ae]\s+la\s+\w+\)?[.:]?\s*$/i, "").replace(/\s*Se[ñn]ale la \w+\.?$/i, "").replace(/_{3,}/g, "…");
  if (resto.length > 230) resto = resto.slice(0, 227).replace(/\s+\S*$/, "") + "…";
  const ans = respuesta(q);
  const pre = titulo ? "<strong>" + esc(titulo) + "</strong>: " : "";
  return "<li>" + pre + esc(resto) + " → " + (inc ? '<b class="p">FALSO</b>: ' : "") + "<mark>" + esc(ans) + "</mark></li>";
}
const por = {}; let falta = 0, total = 0;
[...uniq.values()].filter(q => !/-ia-/.test(q.i)).forEach(q => {
  total++; if (cobertura(setCore, q)) return;
  falta++; const n = norma(q); (por[n] = por[n] || []).push(q);
});
let cuerpo = core;
for (let n = 1; n <= 7; n++) {
  const qs = (por[n] || []).sort((a, b) => a.i.localeCompare(b.i, "es", { numeric: true }));
  let h = "";
  if (qs.length) h = '<h3>Más preguntas oficiales de esta norma (respuesta literal del test; «FALSO» = la opción incorrecta que se pedía señalar)</h3>\n<ul>\n' + qs.map(lineas).join("\n") + "\n</ul>\n";
  cuerpo = cuerpo.replace("<!--OF" + n + "-->", h);
}
cuerpo += "\n" + comp;
fs.writeFileSync(D + "/t15-cuerpo.html", cuerpo);
console.log("oficiales " + total + " · no cubiertas por el núcleo " + falta + " · por norma " + JSON.stringify(Object.fromEntries(Object.entries(por).map(([k, v]) => [k, v.length]))));
