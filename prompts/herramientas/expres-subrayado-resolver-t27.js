// Tema 27: asigna cada pregunta a su pieza del Exprés subrayado buscando la cita literal (ref-concepto) en el esquema literal (esquemas-datos/t27.js).
// Genera expres-subrayado/mapa-t27.js (tabla FIX {idPregunta: pieza}, se evalúa antes que las reglas de artículo del test) y escribe los sin resolver.
// Uso: node prompts/herramientas/expres-subrayado-resolver-t27.js
const fs = require('fs');
global.window = {}; require('../../esquemas-datos/t27.js'); const E = window.ESQ_TXT;
const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
const inst = { onu: 'a', pol: 'b', cee: 'c', rd: 'd', cod: 'e', og: 'f' };
const arts = {};   // instrumento → [{id, n, txt}]
for (const k of Object.keys(inst)) {
  arts[k] = [];
  for (const p of E['T27.' + k].split('<div class="articulo">').slice(1)) {
    const h = p.match(/class="articulo-head">(.*?)<\/div>/)[1].replace(/<[^>]+>/g, '').split(' · ')[0].trim();
    let id = null, n = null, m;
    if (/^Preámbulo/.test(h)) id = inst[k] + '-pre';
    else if ((m = h.match(/^Principio (\d+)/))) { n = +m[1]; id = 'a-' + n; }
    else if ((m = h.match(/^Punto ([ABC])\.(\d+)/))) { n = (m[1] === 'A' ? 0 : m[1] === 'B' ? 100 : 200) + +m[2]; id = 'b-' + n; }
    else if ((m = h.match(/^Punto (\d+)/))) { n = +m[1]; id = 'c-' + n; }
    else if ((m = h.match(/^Artículo (\d+)/))) { n = +m[1]; id = inst[k] + '-' + n; }
    else if (/^Disposici/.test(h)) id = inst[k] + '-fin';
    else if (/^Decálogo/.test(h)) id = 'e-fin';
    else continue;
    arts[k].push({ id, n, h, txt: norm(p.replace(/<div class="articulo-head">.*?<\/div>/, '')) });
  }
}
// B.10 y B.11: el piece b-110 lleva los dos
const th = fs.readFileSync('test-oficial-conocimiento.html', 'utf8');
const RQ = new RegExp('\\{"id":"(27-[^"]+)","pregunta":"((?:[^"\\\\]|\\\\.)*)","opciones"[\\s\\S]{0,3000}?"explicacion":"((?:[^"\\\\]|\\\\.)*)"', 'g');
const fix = {}, sin = [];
for (const m of th.matchAll(RQ)) {
  const id = m[1], raw = m[3].replace(/\\"/g, '"');
  const r = /<span class="ref-norma">([\s\S]*?)<\/span>/.exec(raw);
  const c = (/<span class="ref-concepto">([\s\S]*?)<\/span>/.exec(raw) || [, ''])[1];
  if (!r) { sin.push([id, 'sin ref']); continue; }
  const rf = r[1].replace(/<[^>]+>/g, ''), parts = rf.split(' · '), norma = parts[parts.length - 1], lab = parts.slice(0, -1).join(' · ');
  let ks = [];
  if (/Principios b[áa]sicos/i.test(norma)) ks = ['onu']; else if (/Resoluci[óo]n 690/i.test(norma)) ks = ['pol'];
  else if (/Rec\. \(2001\)|C[óo]digo Europeo/i.test(norma)) ks = ['cee']; else if (/Orden General/i.test(norma)) ks = ['og'];
  else if (/Real Decreto 176\/2022/i.test(norma)) ks = ['rd', 'cod']; else { sin.push([id, 'norma ' + norma.slice(0, 40)]); continue; }
  // etiquetas sin cita
  if (/^Decálogo/i.test(lab)) { fix[id] = 'e-fin'; continue; }
  if (/^Disposici/i.test(lab)) { fix[id] = (ks[0] === 'og' ? 'f' : 'd') + '-fin'; continue; }
  if (/^(Pre[áa]mbulo|Exposici[óo]n de motivos|Considerando)(?! \d)$/i.test(lab.trim())) { fix[id] = inst[ks[0]] + '-pre'; continue; }
  if (/^Campo de aplicaci/i.test(lab)) { fix[id] = 'c-pre'; continue; }
  const num = (lab.match(/(\d+)/) || [])[1]; const sub = (lab.match(/\b([ABC])\)|\bpunto ([C])\./i) || []);
  const q = norm(c).replace(/^"|"$/g, ''); let best = null, bs = 0;
  const frag = q.split(/ (?=\d+ )/).concat([q]);   // la cita puede unir varios puntos
  const palabras = q.split(' ');
  for (const k of ks) for (const a of arts[k]) {
    let sc = 0;
    if (q.length > 12 && a.txt.includes(q)) sc = 1000 + q.length;
    else { for (let i = 0; i + 6 <= palabras.length; i += 3) { const f = palabras.slice(i, i + 6).join(' '); if (a.txt.includes(f)) sc += 10; } }
    if (sc && num !== undefined && a.n !== null) { const lb = +num + (/^Status|B\)/i.test(lab) ? 100 : /^Guerra|punto C|C\)/i.test(lab) ? 200 : 0); if (a.n === lb || a.n === +num) sc += 5; }
    if (sc > bs) { bs = sc; best = a; }
  }
  if (best && bs >= 10) fix[id] = best.id; else sin.push([id, lab + ' | ' + norma.slice(0, 30) + ' | ' + c.slice(0, 60)]);
}
{ const pe = 'expres-subrayado/t27-preg-manual.json'; if (fs.existsSync(pe)) Object.assign(fix, JSON.parse(fs.readFileSync(pe, 'utf8'))); }
// B.11 va dentro del recorte de B.10
for (const q in fix) if (fix[q] === 'b-111') fix[q] = 'b-110';
fs.writeFileSync('expres-subrayado/mapa-t27.js', '// Tema 27: cada pregunta → su pieza (cita literal buscada en el esquema literal; prompts/herramientas/expres-subrayado-resolver-t27.js).\n(window.EXSUB_MAP = window.EXSUB_MAP || {})[27] = (function () {\n  var FIX = ' + JSON.stringify(fix) + ';\n  var f = function (tx, raw, id) { return (id && FIX[id]) || null; };\n  f.primero = true;\n  return f;\n})();\n');
fs.writeFileSync('expres-subrayado/t27-preg-extra.json', JSON.stringify(fix));
console.log('resueltas', Object.keys(fix).length, 'sin resolver', sin.length); sin.forEach(s => console.log(s.join(' :: ')));
