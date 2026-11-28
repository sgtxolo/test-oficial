/* Genera el CONTENIDO de un esquema clave (cuerpo + trampas + json) automáticamente desde el Exprés (expres/tN.js, con el subrayado del usuario)
   y las preguntas oficiales (clave-tests/tN-todo.js). Después se monta con clave-armar.js.
   Uso: node prompts/herramientas/clave-auto.js N      (necesita prompts/herramientas/clave-contenido/tN-auto.json)
   tN-auto.json = {"titulo":"…","h1":"…","v":"…","h2":[{"t":"16.1 · LEY ORGÁNICA …","desde":null},{"t":"16.2 · …","desde":"regex sobre el título del bloque o ficha donde empieza"}]}
   Mapa de colores del Exprés → esquema: m-autoridad→b.v · m-plazo→b.n · m-accion→b.p · m-destacable→b.o · m-personalizado→b.y · m-resp (marca de pregunta)→<mark> rojo. */
const fs = require("fs"), path = require("path");
const RAIZ = path.resolve(__dirname, "..", "..") + path.sep;
const N = +process.argv[2];
const dir = path.join(__dirname, "clave-contenido") + path.sep;
const cfg = JSON.parse(fs.readFileSync(dir + "t" + N + "-auto.json", "utf8"));
global.window = {};
eval(fs.readFileSync(RAIZ + "expres/t" + N + ".js", "utf8"));
eval(fs.readFileSync(RAIZ + "clave-tests/t" + N + "-todo.js", "utf8"));
const ex = window.EXPRES_T[N].html;
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const plano = h => h.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();

/* ---- convierte un trozo de HTML del Exprés en HTML de esquema (solo marcas de color) ---- */
function colorea(h) {
  h = h.replace(/<span class="ex-plg-t"[^>]*>/g, "").replace(/<span class="ex-sello[^"]*">[^<]*<\/span>/g, "");
  h = h.replace(/<mark class="m-resp[^"]*"[^>]*>\s*🎯[^<]*<\/mark>/g, "").replace(/🎯\s*\d+\s*preguntas?(\s+más de este artículo)?/g, "");
  const out = []; const pila = [];
  const re = /<(\/?)([a-zA-Z0-9]+)([^>]*)>|([^<]+)/g; let m;
  while ((m = re.exec(h))) {
    if (m[4] !== undefined) { out.push(esc(m[4].replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"))); continue; }
    const cierre = m[1] === "/", tag = m[2].toLowerCase(), at = m[3];
    if (tag === "mark") {
      if (!cierre) {
        let t = "";
        if (/m-resp/.test(at)) t = cfg.rojoOficial && !((at.match(/data-q="([^"]*)"/) || ["", ""])[1].split(",").some(i => i && !/-ia-/.test(i))) ? 'b class="y"' : "mark"; else if (/m-autoridad/.test(at)) t = 'b class="v"'; else if (/m-plazo/.test(at)) t = 'b class="n"';
        else if (/m-accion/.test(at)) t = 'b class="p"'; else if (/m-destacable/.test(at)) t = 'b class="o"'; else if (/m-personalizado/.test(at)) t = 'b class="y"';
        pila.push(t); if (t) out.push("<" + t + ">");
      } else { const t = pila.pop(); if (t) out.push("</" + t.split(" ")[0] + ">"); }
    } else if (tag === "b" && !at.includes("class")) { out.push(cierre ? "</strong>" : "<strong>"); }
    else if (/^(p|div|tr|li|br|h\d)$/.test(tag) || (cierre && /^(td|th)$/.test(tag))) { out.push("\u0001"); }
  }
  return out.join("").replace(/<(b|mark)( class="[a-z]")?>\s*<\/\1>/g, "").replace(/\s+/g, " ").split("\u0001").map(s => s.trim()).filter(s => plano(s).length > 2);
}

/* ---- cuadros del temario (<div class="vis">) → tabla del esquema (cfg.cuadros) ---- */
function bloqueDiv(h, i) { const re = /<(\/?)div\b[^>]*>/g; re.lastIndex = i; let d = 0, m; while ((m = re.exec(h))) { d += m[1] ? -1 : 1; if (!d) return h.slice(i, re.lastIndex); } return h.slice(i); }
function hijos(h, cls) { const o = []; const re = new RegExp('<div class="' + cls + '(?:\\s[^"]*)?"', "g"); let m; while ((m = re.exec(h))) { o.push(bloqueDiv(h, m.index)); } return o; }
const celda = h => colorea(h).join("<br>");
function cuadro(v) {
  const pies = hijos(v, "vis-pie"); pies.forEach(p => { v = v.replace(p, ""); });
  return cuadroBase(v) + (pies.length ? "\n<ul>\n" + pies.map(p => "<li>" + celda(p) + "</li>").join("\n") + "\n</ul>" : "");
}
function cuadroBase(v) {
  const t = plano((v.match(/<div class="vis-t">([\s\S]*?)<\/div>/) || ["", ""])[1]).replace(/^[^A-Za-zÁÉÍÓÚÑ¿(]+/, "");
  const mt = t.match(/^(.*?)\s*\(cuadros? del temario\s*·?\s*([^)]*)\)\s*$/i);
  const cab = "<h3>Cuadro: " + esc(mt ? mt[1] : t) + (mt && mt[2] ? ' <span class="art">' + esc(mt[2]) + "</span>" : "") + "</h3>\n";
  const cuerpo = v.slice(v.indexOf("</div>", v.indexOf('class="vis-t"')) + 6, v.lastIndexOf("</div>"));
  const etq = h => h.replace(/<span class="(?:et|vt-p|n)(?: [^"]*)?">([\s\S]*?)<\/span>/g, "<b>$1:</b> ");
  const nodos = hijos(cuerpo, "vt-nodo");
  if (nodos.length) {   // árbol: una fila por rama
    return cab + "<table>\n" + nodos.map(n => { const et = (hijos(n, "vt-et")[0] || ""); const resto = n.replace(et, ""); return "<tr><td><strong>" + esc(plano(et)) + "</strong></td><td>" + celda(etq(resto)) + "</td></tr>"; }).join("\n") + "\n</table>";
  }
  const ramas = hijos(cuerpo, "vis-rama");
  if (ramas.length) {
    const raiz = hijos(cuerpo, "vis-raiz")[0] || "";
    return cab + "<table>\n" + (raiz ? '<tr><th colspan="2">' + celda(raiz) + "</th></tr>\n" : "") + ramas.map(r => { const sub = hijos(r, "vis-sub")[0] || ""; const hojas = [...sub.matchAll(/<span[^>]*>([\s\S]*?)<\/span>/g)].map(x => celda(x[1])).join("<br>"); return "<tr><td><strong>" + esc(plano(r.replace(sub, ""))) + "</strong></td><td>" + (hojas || celda(sub)) + "</td></tr>"; }).join("\n") + "\n</table>";
  }
  const cols = hijos(cuerpo, "vis-col");
  if (cols.length) {
    const partes = cols.map(c => ({ h: plano((c.match(/<h5>([\s\S]*?)<\/h5>/) || ["", ""])[1]), l: celda(c.replace(/<h5>[\s\S]*?<\/h5>/, "")) }));
    return cab + "<table>\n" + partes.map(p => "<tr><td><strong>" + esc(p.h) + "</strong></td><td>" + p.l + "</td></tr>").join("\n") + "\n</table>";
  }
  const filas = [...cuerpo.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map(r => "<tr>" + [...r[1].matchAll(/<(t[hd])([^>]*)>([\s\S]*?)<\/t[hd]>/g)].map(c => "<" + c[1] + (c[2].match(/\s(?:col|row)span="\d+"/g) || []).join("") + ">" + celda(c[3]) + "</" + c[1] + ">").join("") + "</tr>");
  if (filas.length) return cab + "<table>\n" + filas.join("\n") + "\n</table>";
  const l = colorea(etq(cuerpo)).filter(x => !/^[↓→⇩▼\s]*$/.test(plano(x)));
  return cab + "<ul>\n" + l.map(x => "<li>" + x + "</li>").join("\n") + "\n</ul>";
}

/* ---- trocea el Exprés en piezas (bloque-titulo / ex-ficha) ---- */
let nCuadros = 0; const diferidos = {};
const piezas = ex.split(cfg.cuadros ? /(?=<div class="bloque-titulo")|(?=<div class="ex-ficha")|(?=<div class="ex-linea")|(?=<div class="vis">)/ : /(?=<div class="bloque-titulo")|(?=<div class="ex-ficha")|(?=<div class="ex-linea")/);
const normas = cfg.h2.map(() => []); let cur = 0, bloque = "";
const hdrNorma = {};   // cabecera de ficha (texto plano) → índice de norma
const pend = cfg.h2.map(h => h.desde ? new RegExp(h.desde, "i") : null);
let iLey = -1;
for (const p of piezas) {
  if (cfg.cuadros && /^<div class="vis">/.test(p)) { const v = cuadro(bloqueDiv(p, 0)); const mv = (cfg.moverCuadro || []).find(x => new RegExp(x[0], "i").test(plano(v.split("</h3>")[0]))); (mv ? (diferidos[mv[1]] = diferidos[mv[1]] || []) : normas[cur]).push({ cab: "", vis: v }); nCuadros++; continue; }
  const esBloque = /^<div class="bloque-titulo"/.test(p);
  const esFicha = /^<div class="ex-ficha"/.test(p), esLinea = /^<div class="ex-linea"/.test(p);
  const cab = esBloque ? plano(p.split("</div>")[0]) : (esFicha ? plano((p.match(/<div class="ex-fh">([\s\S]*?)<\/div>/) || ["", ""])[1]) : plano(p));
  for (let k = cur + 1; k < pend.length; k++) if (pend[k] && pend[k].test(cab)) { cur = k; break; }
  if (esBloque && cfg.leyes && cfg.leyes[iLey + 1] && new RegExp(cfg.leyes[iLey + 1][0], "i").test(cab)) iLey++;
  if (esBloque) { bloque = cab; if (/Preguntas que no se pueden/i.test(cab)) cur = Math.min(cur, pend.length - 1); continue; }
  if (esLinea) { hdrNorma[cab.replace(/\s*:?\s*🎯.*$/, "").replace(/\s+/g, " ").trim()] = cur; continue; }
  if (!esFicha) continue;
  const mh = p.match(/<div class="ex-fh">([\s\S]*?)<\/div>\s*<div class="ex-fb">([\s\S]*)$/);
  if (!mh) continue;
  if (/RECUERDA del temario/i.test(cab)) { normas[cur].push({ cab, recuerda: true, cuerpo: mh[2] }); continue; }
  hdrNorma[cab] = cur;
  normas[cur].push({ cab, selloEXOF: /EXOF/.test(mh[1]), selloEX: /(^|[^O])EX\b/.test(plano(mh[1]).replace(/EXOF/g, "")), ast: /✱/.test(mh[1]), cuerpo: mh[2], hdr: mh[1], bloque, ley: iLey >= 0 ? cfg.leyes[iLey][1] : "" });
}
for (const k in diferidos) normas[k].unshift(...diferidos[k]);
function h3(f) {
  let t = plano(f.hdr).replace(/\s*(EXOF|EX\b|✱)/g, "").replace(/\s*R\d+\b/g, "").replace(/\s+/g, " ").trim();
  const mA = t.match(/^Art[íi]culo\s+(\d+(?:\s*(?:bis|ter|quáter|quater|quinquies|sexies))?)\s*(?:[—–-]\s*(.*))?$/i);
  const mP = (f.hdr.match(/R\d+/g) || []);
  const mB = !mA && cfg.artPunto && t.match(/^Art[íi]culo\s+(\d+(?:\s*(?:bis|ter|quáter|quater|quinquies|sexies))?)\s*·\s*(.*)$/i);
  let titulo = mA ? (mA[2] || 'Artículo ' + mA[1]) : t, art = mA ? '<span class="art">art. ' + mA[1] + "</span>" : "";
  if (mB) art = '<span class="art">art. ' + mB[1] + "</span>";
  return "<h3>" + esc(titulo) + (f.ley ? " · " + esc(f.ley) : "") + (f.selloEXOF ? ' <span class="ex">EXOF</span>' : f.selloEX ? ' <span class="ex">EX</span>' : "") + (f.ast ? ' <span class="as">✱</span>' : "") + (mP.length ? " <em>(" + [...new Set(mP)].join(", ") + ")</em>" : "") + (art ? " " + art : "") + "</h3>";
}
let nFichas = 0, nDup = 0;
/* líneas de artículo que ya están enteras dentro de un cuadro (cfg.cuadros): no se repiten */
const enCuadro = cfg.cuadros ? Object.values(normas).flat().filter(f => f.vis).map(f => new Set(plano(f.vis).toLowerCase().match(/[a-záéíóúñ]{4,}/g) || [])) : [];
const repetida = x => { const w = plano(x).toLowerCase().match(/[a-záéíóúñ]{4,}/g) || []; const si = w.length >= 4 && enCuadro.some(c => w.filter(y => c.has(y)).length / w.length >= 0.85); if (si) nDup++; return si; };
const h2html = cfg.h2.map((c, k) => {
  const lis = normas[k].map(f => {
    if (f.vis) return f.vis;
    nFichas++;
    const ratio = x => { const tot = plano(x).length; let col = 0; (x.match(/<(?:b class="[a-z]"|mark)>[\s\S]*?<\/(?:b|mark)>/g) || []).forEach(y => { col += plano(y).length; }); return col / Math.max(1, tot); };
    const l = colorea(f.cuerpo).filter(x => f.recuerda || (cfg.porMarca ? (f.selloEXOF || /<mark>/.test(x) || ((f.selloEX || f.ast || /R\d+/.test(f.hdr)) && ratio(x) >= cfg.porMarca)) : (!cfg.min || ratio(x) >= cfg.min)));
    for (let i = l.length - 1; i >= 0; i--) if (!f.recuerda && repetida(l[i])) l.splice(i, 1);
    if (!l.length) return "";
    const titulo = f.recuerda ? "<h3>" + esc(f.cab.replace(/^RECUERDA del temario · /, "Recuerda del temario · ")) + "</h3>" : h3(f);
    return titulo + "\n<ul>\n" + l.map(s => "<li>" + s + "</li>").join("\n") + "\n</ul>";
  }).filter(Boolean).join("\n");
  return "<!-- ===================== " + c.t.split(" ")[0] + " ===================== -->\n<h2>" + esc(c.t) + "</h2>\n" + lis + "\n<!--OF" + (k + 1) + "-->";
}).join("\n");

/* ---- preguntas oficiales NO recogidas por el esquema generado ---- */
const uniq = new Map(); const ggrp = {};
window.CLAVE_TODO[N].forEach(g => g.q.forEach(q => { uniq.set(q.i, q); ggrp[q.i] = g.a; }));
const norm = t => t.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const STOP = new Set("para como esta este esos esas sobre entre desde hasta cuando donde segun sera seran podra podran todos todas cada otro otra otros otras estado estados miembro miembros reglamento articulo parte partes".split(" "));
const words = t => [...new Set(norm(t).split(" ").filter(w => w.length >= 4 && !STOP.has(w)))];
const setCore = new Set(words(h2html));
const cobertura = q => {
  const wa = words(q.o[q.c] || ""), wq = words(q.p); if (!wa.length) return true;
  const sa = wa.filter(x => setCore.has(x)).length / wa.length, sq = wq.length ? wq.filter(x => setCore.has(x)).length / wq.length : 0;
  return sa >= 0.7 && sq >= 0.4;
};
const L = "ABCD";
const esNada = q => /^\s*(ningun|(todas|todos|ambas|ambos)\b[^.]*(incorrect|fals|err[oó]ne|no son))/i.test(q.o[q.c] || "");
function respuesta(q) {
  if (esNada(q)) return "ninguna de las otras opciones era correcta (" + q.o.filter((o, i) => i !== q.c).map(o => o.replace(/\s+/g, " ").trim()).join(" · ") + ")";
  const a = q.o[q.c].replace(/\s+/g, " ").trim();
  const k = a.match(/^(?:las respuestas |las opciones )?([ABCD])\s*(?:y|,)\s*([ABCD])\b/i);
  if (k) return [k[1], k[2]].map(x => q.o[L.indexOf(x.toUpperCase())].replace(/\s+/g, " ").trim()).join(" · ");
  if (/^(todas|todos|ambas|ambos)\b/i.test(a)) return q.o.filter((o, i) => i !== q.c && !/^\s*ningun/i.test(o)).map(o => o.replace(/\s+/g, " ").trim()).join(" · ");
  return a;
}
const esInc = q => /incorrect|falsa|no es cierta|no es correcta|excepto|\bNO corresponde|\bNO corresponder/i.test(q.p.slice(-190));
function linea(q) {
  let p = q.p.replace(/\s+/g, " ").trim();
  let segs = p.split(/(?<=[.:?)])\s+(?=[A-ZÁÉÍÓÚ(¿])/);
  let titulo = "";
  while (segs.length > 1 && /^(\(.*?\)\s*)?(Ley Org|Instrucci|Protocolo|Norma T|Resoluci|Acuerdo|Real Decreto|Seg[uú]n el Protocolo)/i.test(segs[0]) && segs[0].length < 300) segs.shift();
  if (segs.length > 1 && segs[0].length < 90 && !/\?$/.test(segs[0])) titulo = segs.shift().replace(/[.:]$/, "");
  let resto = segs.join(" ").replace(/\s*\(?señal[ae]\s+la\s+\w+\)?[.:]?\s*$/i, "").replace(/\s*Se[ñn]ale la \w+\.?$/i, "").replace(/_{3,}/g, "…");
  if (!resto && !titulo) resto = p.slice(-230);
  if (resto.length > 230) resto = resto.slice(0, 227).replace(/\s+\S*$/, "") + "…";
  return "<li>" + (titulo ? "<strong>" + esc(titulo) + "</strong>: " : "") + esc(resto) + " → " + (esNada(q) ? '<b class="p">ninguna opción del test era correcta</b> (descartadas: ' + esc(q.o.filter((o, i) => i !== q.c).join(" · ").replace(/\s+/g, " ")) + ")</li>" : (esInc(q) ? '<b class="p">FALSO</b>: ' : "") + "<mark>" + esc(respuesta(q)) + "</mark></li>");
}
const claveArt = s => (s || "").replace(/\s+/g, " ").replace(/\s*:?\s*🎯.*$/, "").trim();
function normaDe(q) {
  let permit = null;
  for (const [re, k] of cfg.fuerza || []) if (new RegExp(re, "i").test(q.p + " " + q.o[q.c])) { if (Array.isArray(k)) { permit = k; break; } return k; }
  const g = claveArt(ggrp[q.i]);
  if (g in hdrNorma) return hdrNorma[g];
  const k = Object.keys(hdrNorma).find(h => h && g && (h.startsWith(g.slice(0, 40)) || g.startsWith(h.slice(0, 40))));
  if (k) return hdrNorma[k];
  if (cfg.porTexto) {   // la norma de la ficha que más palabras comparte con la respuesta y el enunciado
    const w = words(q.o[q.c] + " " + q.p); let mejor = 0, nm = -1;
    if (!normaDe.f) normaDe.f = normas.flatMap((l, k) => l.filter(f => !f.vis && !f.recuerda).map(f => ({ k, w: new Set(words(f.cuerpo)) })));
    for (const f of normaDe.f) { const v = w.filter(x => f.w.has(x)).length / Math.max(1, w.length); if ((!permit || permit.includes(f.k)) && v > mejor) { mejor = v; nm = f.k; } }
    if (mejor >= 0.55 || (permit && nm >= 0)) return nm;
  }
  if (permit) return permit[0];
  const t = q.p + " " + q.o[q.c];
  for (let i = cfg.h2.length - 1; i >= 1; i--) if (cfg.h2[i].texto && new RegExp(cfg.h2[i].texto, "i").test(t)) return i;
  return 0;
}
const oficiales = [...uniq.values()].filter(q => !/-ia-/.test(q.i));
const por = {}; let falta = 0;
const yaQ = new Set();
oficiales.forEach(q => { if (cobertura(q)) return; const kq = norm(q.p + "|" + respuesta(q)); if (cfg.porTexto && yaQ.has(kq)) return; yaQ.add(kq); falta++; const n = normaDe(q); (por[n] = por[n] || []).push(q); });
let cuerpo = h2html;
cfg.h2.forEach((c, k) => {
  const qs = (por[k] || []).sort((a, b) => a.i.localeCompare(b.i, "es", { numeric: true }));
  const h = qs.length ? '<h3>Más preguntas oficiales de esta norma (respuesta literal del test; «FALSO» = la opción incorrecta que se pedía señalar)</h3>\n<ul>\n' + qs.map(linea).join("\n") + "\n</ul>\n" : "";
  cuerpo = cuerpo.replace("<!--OF" + (k + 1) + "-->", h);
});

/* ---- COMPARATIVAS: tabla de cifras y plazos + falsas típicas (todo sacado del texto del esquema y de las oficiales) ---- */
const frases = [];
const reCif = /(\b\d+\s*(?:%|por ciento|días?|horas?|meses|años?|metros)\b|\b(?:un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|doce|quince|veinte|treinta)\s+(?:días?|horas?|meses|años?|semanas?)\b|\bal menos un \d+%|\bplazo\b)/i;
for (const f of Object.values(normas).flat()) {
  if (f.recuerda || f.vis) continue;
  for (const s of colorea(f.cuerpo)) {
    const txt = plano(s);
    if (cfg.sinPenas && /prisi[oó]n|multa|inhabilitaci|localizaci[oó]n permanente|trabajos en beneficio|pena de/i.test(txt)) continue;   // T19: la tabla de plazos no lleva penas
    if (reCif.test(txt) && txt.length < 420) frases.push({ h: plano(f.hdr).replace(/\s*(EXOF|EX\b|✱)/g, "").replace(/\s*R\d+\b/g, "").trim(), s });
  }
}
const vistos = new Set(); const filas = [];
for (const fr of frases) { const k = plano(fr.s).slice(0, 80); if (vistos.has(k)) continue; vistos.add(k); filas.push('<tr><td><b class="o">' + esc(fr.h.slice(0, 90)) + "</b></td><td>" + fr.s + "</td></tr>"); }
const falsas = oficiales.filter(esInc).slice(0, cfg.maxFalsas || 40).map(q => {
  const falsa = q.o[q.c].replace(/\s+/g, " ").trim();
  const ok = q.o.filter((o, i) => i !== q.c).map(o => o.replace(/\s+/g, " ").trim()).join(" · ");
  let p = q.p.replace(/\s+/g, " ").replace(/\s*Se[ñn]ale la \w+\.?$/i, "").replace(/_{3,}/g, "…");
  if (p.length > 170) p = "…" + p.slice(-167).replace(/^\S*\s+/, "");
  return "<tr><td>" + esc(p) + '</td><td><b class="p">FALSO</b>: ' + esc(falsa) + "</td><td>" + esc(ok.length > 330 ? ok.slice(0, 327) + "…" : ok) + "</td></tr>";
});
cuerpo += '\n<!-- ===================== COMPARATIVAS ===================== -->\n<h2>COMPARATIVAS · lo que se confunde dentro del tema</h2>\n' +
  '<h3>Plazos y cifras del tema (recogidos del esquema, con la norma o artículo)</h3>\n<table>\n<tr><th>Dónde</th><th>Dato</th></tr>\n' + filas.slice(0, cfg.maxFilas || 60).join("\n") + "\n</table>\n" +
  (falsas.length ? '<h3>Falsas típicas de «señale la incorrecta» (opción falsa que sale en el test → lo correcto, según las otras opciones)</h3>\n<table>\n<tr><th>Pregunta (resumida)</th><th>Opción FALSA</th><th>Las otras opciones (correctas)</th></tr>\n' + falsas.join("\n") + "\n</table>\n" : "");

/* ---- trampas: las de cifras y plazos del test (preguntas oficiales con cifra en la respuesta) ---- */
const tr = oficiales.filter(q => reCif.test(q.o[q.c] || "") && q.o[q.c].length < 160).slice(0, 25).map(q => {
  let p = q.p.replace(/\s+/g, " ").replace(/\s*Se[ñn]ale la \w+\.?$/i, "").replace(/_{3,}/g, "…");
  if (p.length > 190) p = "…" + p.slice(-187).replace(/^\S*\s+/, "");
  return "<li><strong>" + esc(p) + "</strong> → <mark>" + esc(respuesta(q)) + "</mark>" + (q.o.length > 1 ? " (las otras opciones del test dan cifras o sujetos distintos: leer qué se pregunta)" : "") + "</li>";
});
const trF = oficiales.filter(esInc).slice(0, 25).map(q => "<li><strong>Señale la incorrecta</strong> · …" + esc(q.p.replace(/\s+/g, " ").replace(/_{3,}/g, "…").slice(-150)) + " → FALSA: <mark>" + esc(q.o[q.c].replace(/\s+/g, " ")) + "</mark></li>");
const trampas = "<ul>\n" + tr.concat(trF).join("\n") + "\n</ul>";

for (const [re, av] of cfg.avisos || []) { let n = 0; cuerpo = cuerpo.replace(/<li>(?:(?!<\/li>)[\s\S])*<\/li>/g, li => new RegExp(re, "i").test(plano(li)) ? (n++, li.replace(/<\/li>$/, " <strong>⚠ " + av + "</strong></li>")) : li); console.log("aviso «" + re + "»: " + n + " líneas"); }
// líneas de relleno (cfg.quitar): se borran y, si el artículo se queda sin ninguna, también su título
if (cfg.quitar) cuerpo = cuerpo.replace(/<li>(?:(?!<\/li>)[\s\S])*<\/li>\n?/g, li => new RegExp(cfg.quitar, "i").test(plano(li)) ? "" : li).replace(/<h3>(?:(?!<\/h3>)[\s\S])*<\/h3>\n<ul>\n?<\/ul>\n?/g, "");
fs.writeFileSync(dir + "t" + N + "-cuerpo.html", cuerpo);
fs.writeFileSync(dir + "t" + N + "-trampas.html", trampas);
fs.writeFileSync(dir + "t" + N + ".json", JSON.stringify({ titulo: cfg.titulo, h1: cfg.h1, v: cfg.v || "844" }));
console.log("cuadros " + nCuadros + " · líneas ya en cuadro " + nDup);
console.log("T" + N + " fichas " + nFichas + " · h2 " + cfg.h2.length + " · oficiales " + oficiales.length + " · no cubiertas " + falta + " " + JSON.stringify(Object.fromEntries(Object.entries(por).map(([k, v]) => [k, v.length]))) + " · cuerpo " + cuerpo.length + " bytes · filas cifras " + filas.length + " · falsas " + falsas.length + " · trampas " + tr.length);
