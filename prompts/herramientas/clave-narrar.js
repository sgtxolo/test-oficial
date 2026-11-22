/* Genera el narrado del Esquema clave: clave-audio/tN.js (+ tN-2.js…) SOLO con lo que dice el esquema, las trampas y las preguntas oficiales (nada de memoria).
   Uso: node prompts/herramientas/clave-narrar.js N     → escribe los ficheros y dice cuántas partes (P) y palabras salen; actualiza PARTES a mano en clave-mejoras.js. */
const fs = require("fs"), path = require("path");
const RAIZ = path.resolve(__dirname, "..", "..");
const N = +process.argv[2];
const html = fs.readFileSync(path.join(RAIZ, "repaso-t" + N + "-esquema-clave-nuevo.html"), "utf8");

/* ---------- números en letra ---------- */
const U = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];
const D = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const C = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
function num(n) {
  n = +n; if (n < 30) return U[n];
  if (n < 100) return D[Math.floor(n / 10)] + (n % 10 ? " y " + U[n % 10] : "");
  if (n === 100) return "cien";
  if (n < 1000) return C[Math.floor(n / 100)] + (n % 100 ? " " + num(n % 100) : "");
  if (n < 2000) return "mil" + (n % 1000 ? " " + num(n % 1000) : "");
  if (n < 1000000) return num(Math.floor(n / 1000)) + " mil" + (n % 1000 ? " " + num(n % 1000) : "");
  return String(n);
}
function numTxt(t) {
  t = t.replace(/(\d{1,3})\.(\d{3})(?!\d)/g, "$1$2");                          // 250.000 → 250000
  t = t.replace(/(\d+)\.(\d+)\.(\d+)\.ª/g, (m, a, b, c) => num(a) + ", apartado " + num(b) + ", número " + num(c));
  t = t.replace(/(\d+)\s*%/g, (m, a) => num(a) + " por ciento");
  t = t.replace(/\b(\d+)\/(\d{4})\b/g, (m, a, b) => num(a) + " barra " + num(b));
  t = t.replace(/\b(\d+),(\d+)\b/g, (m, a, b) => num(a) + " coma " + num(b));
  t = t.replace(/\b(\d+)\.(\d+)\b/g, (m, a, b) => num(a) + ", apartado " + num(b));  // 8.1 → ocho, apartado uno
  t = t.replace(/(\d+)º/g, (m, a) => num(a));
  t = t.replace(/\b\d+\b/g, m => num(m));
  return t;
}
function limpia(h) {
  let t = h.replace(/<br\s*\/?>/g, " ; ").replace(/<\/(td|th)>/g, " : ").replace(/<\/tr>/g, " . ").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, " y ").replace(/&lt;/g, " menos de ").replace(/&gt;/g, " más de ");
  t = t.replace(/\bArts?\.\s*/gi, m => /^arts/i.test(m) ? "artículos " : "artículo ");
  t = t.replace(/(artículos? [\d.,a-zA-Z ]*?)(\d+)\s*[-–]\s*(\d+)/g, "$1$2 a $3");
  t = t.replace(/\((R\d+(?:[, ]+R\d+)*|[^)]*pregunta del banco[^)]*)\)/gi, "").replace(/\bR\d+\b/g, "").replace(/\bEXOF\b|\bEX\b/g, "").replace(/[✱⚠▲▼▦⇄🌳🎯]/g, "");
  t = t.replace(/≠/g, " distinto de ").replace(/→/g, ", ").replace(/≥/g, " al menos ").replace(/\s*·\s*/g, ". ").replace(/\s*;\s*/g, ", ").replace(/\s*\|\s*/g, ", ");
  t = t.replace(/\b([a-n])\)\s*/g, "apartado $1: ");
  t = t.replace(/\bCE\b/g, "Constitución").replace(/\bUE\b/g, "Unión Europea").replace(/\bFAS\b/g, "Fuerzas Armadas").replace(/\bAGE\b/g, "Administración General del Estado").replace(/\bJEMAD\b/g, "Jefe de Estado Mayor de la Defensa").replace(/\bEMAD\b/g, "Estado Mayor de la Defensa").replace(/\bCNI\b/g, "Centro Nacional de Inteligencia").replace(/\bLO\b/g, "Ley Orgánica");
  t = numTxt(t);
  t = t.replace(/\s+([,.:;])/g, "$1").replace(/([.:,;])\s*([.:,;])/g, "$2").replace(/\s+/g, " ").trim();
  return t.replace(/(^|[.:?] )([a-záéíóúñ])/g, (m, a, b) => a + b.toUpperCase());
}
const frases = h => h.split(/(?<=[.])\s+/).map(s => s.trim()).filter(s => s.length > 1);

/* ---------- secciones ---------- */
const bq = html.indexOf('<button id="btnQ"');
const cuerpo = html.slice(html.indexOf("<h2"), bq);
const secs = []; let h2num = "", h2tit = "";
cuerpo.split(/(?=<h2[\s>]|<h3[\s>])/).forEach(trozo => {
  const mh2 = trozo.match(/^<h2[^>]*>([\s\S]*?)<\/h2>/), mh3 = trozo.match(/^<h3[^>]*>([\s\S]*?)<\/h3>/);
  if (mh2) { const x = limpia(mh2[1]); const nn = mh2[1].match(/^\s*(\d+\.\d+)/); h2num = nn ? nn[1] : ""; h2tit = x; secs.push({ t: x, p: [], cab: true }); return; }
  if (!mh3) return;
  const tit = limpia(mh3[1].replace(/<span class="art">[\s\S]*?<\/span>/g, ""));
  const resto = trozo.slice(trozo.indexOf("</h3>") + 5);
  const items = [...resto.matchAll(/<li>([\s\S]*?)<\/li>|<tr>([\s\S]*?)<\/tr>|<p[^>]*>([\s\S]*?)<\/p>/g)].map(x => limpia(x[1] || x[2] || x[3] || "")).filter(s => s.length > 3);
  const ntit = h2num.replace(/\D*$/, "") ? h2num.replace(/^(\d+\.\d+).*$/, "$1") : "";
  /* el número del h2 en letra no se usa: el título lleva «9.1 …» tal cual para que el esquema siga la voz */
  secs.push({ t: (h2num ? h2num + " " : "") + tit, p: items });
});
/* trampas */
const tr = html.slice(html.indexOf('id="trampas"'), html.indexOf('<div id="aud">'));
const trampas = [...tr.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(x => limpia(x[1]));
/* oficiales: de las preguntas rápidas (OF) */
const rq = html.slice(html.indexOf('id="rqbox"'), html.indexOf('id="btnT"'));
const of = [...rq.matchAll(/<li><span class="rq-q"><span class="rq-of">OF<\/span>([\s\S]*?)<\/span> <span class="rq-r">([\s\S]*?)<\/span><\/li>/g)].filter(x => /\?\s*$/.test(x[1].replace(/<[^>]+>/g, ""))).map(x => "Esto ha caído en examen. " + limpia(x[1]) + " La respuesta es: " + limpia(x[2]).replace(/\.$/, "") + ".");

const cab = secs.filter(s => !s.cab && !/Texto literal/.test(s.t));
const bloques = cab.map(s => ({ t: s.t, p: s.p }));
if (trampas.length) bloques.push({ t: "Trampas del tema", p: ["Ahora, las trampas del tema, lo que más se confunde en el test."].concat(trampas) });
if (of.length) bloques.push({ t: "Preguntas de examen oficiales", p: ["Y para terminar, preguntas de examen oficial con su respuesta."].concat(of.slice(0, 60)) });
const pal = b => b.p.join(" ").split(/\s+/).length + b.t.split(/\s+/).length;
const total = bloques.reduce((s, b) => s + pal(b), 0);
const P = Math.max(1, Math.round(total / 5400));
/* partición contigua equilibrada */
const objetivo = total / P, partes = []; let acum = 0, act = [];
bloques.forEach((b, i) => {
  const w = pal(b);
  if (act.length && partes.length < P - 1 && acum + w / 2 > objetivo) { partes.push(act); act = []; acum = 0; }
  act.push(b); acum += w;
});
partes.push(act);
fs.mkdirSync(path.join(RAIZ, "clave-audio"), { recursive: true });
partes.forEach((pb, k) => {
  const p = k + 1, secciones = [];
  secciones.push({ t: "Introducción", p: ["Bienvenido al esquema clave del tema " + num(N) + ". " + (partes.length > 1 ? "Esta es la parte " + num(p) + " de " + num(partes.length) + ". " : "") + "Vamos a repasar lo que más cae, con plazos, cifras y autoridades. Escucha con atención las trampas y las preguntas que han caído en examen."] });
  pb.forEach(b => secciones.push({ t: b.t, p: b.p.length ? b.p : [b.t] }));
  if (p === partes.length) secciones.push({ t: "Despedida", p: ["Hasta aquí el esquema clave del tema " + num(N) + ". Repásalo otra vez y haz el test del esquema para fijarlo. Mucho ánimo."] });
  else secciones.push({ t: "Cierre de la parte", p: ["Aquí termina la parte " + num(p) + ". Continúa con la parte " + num(p + 1) + "."] });
  const clave = p === 1 ? String(N) : N + "-" + p;
  const tit = "Tema " + N + " · Esquema clave narrado" + (partes.length > 1 ? ", parte " + p + " de " + partes.length : "");
  const fich = path.join(RAIZ, "clave-audio", "t" + N + (p === 1 ? "" : "-" + p) + ".js");
  fs.writeFileSync(fich, "(window.CLAVE_AUDIO=window.CLAVE_AUDIO||{})[" + JSON.stringify(clave) + "]=" + JSON.stringify({ titulo: tit, secciones }) + ";\n");
  console.log(path.basename(fich) + ": " + pb.reduce((s, b) => s + pal(b), 0) + " palabras");
});
console.log("T" + N + ": total " + total + " palabras → P = " + partes.length);
