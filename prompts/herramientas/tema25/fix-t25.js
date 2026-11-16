// Tema 25 · correcciones de las preguntas OFICIALES (25-1…25-127) contra el temario oficial limpio (prompts/temario-limpio/tema25/oficial.txt)
// Cinco normas: LO 2/1986 (págs. 1-29 del oficial), Ley 31/2010 (30-37), RD 1087/2010 (38-43), Reglamento Europol (44-98), Estatuto INTERPOL (99-106).
//  · Las correcciones de fondo van en tema25/fix-edits/*.json: { "25-6": { "c": 3, "o": {"2":"texto"}, "p": ["desde","hasta"] | "enunciado nuevo", "cita": ["Art. 12.1", "texto LITERAL del oficial"] } }
//  · Sin "cita", la cita en rojo se busca automáticamente en la norma de la pregunta (segmento LITERAL más parecido a la respuesta); las de confianza baja se listan (--bajas).
//  · Idempotente. Uso: node prompts/herramientas/tema25/fix-t25.js --dry [--bajas]  |  node prompts/herramientas/tema25/fix-t25.js
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const FILE = path.join(RAIZ, 'test-oficial-conocimiento.html');
const RAW = fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', 'tema25', 'oficial.txt'), 'utf8').replace(/\r/g, '');
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');
const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]+/g, ' ');
const STOP = new Set('para como esta este esos esas sera seran podra podran deberan debera entre sobre desde hasta cuando donde segun cada todo todos toda todas otro otra otros otras puede pueden tendra tendran haya haber siendo tiene tienen sido ley'.split(' '));
const toks = t => [...new Set(norm(t).split(/\s+/).filter(w => (w.length >= 4 || /^\d+$/.test(w)) && !STOP.has(w)))];
const NORMAS = {
  loe: 'Ley Orgánica 2/1986, de 13 de marzo, de Fuerzas y Cuerpos de Seguridad',
  l31: 'Ley 31/2010, de 27 de julio, sobre simplificación del intercambio de información e inteligencia entre los servicios de seguridad de los Estados miembros de la Unión Europea',
  rd: 'Real Decreto 1087/2010, de 3 de septiembre, por el que se aprueba el Reglamento que regula las Juntas Locales de Seguridad',
  eur: 'Reglamento (UE) 2016/794 del Parlamento Europeo y del Consejo, de 11 de mayo de 2016, relativo a la Agencia de la Unión Europea para la Cooperación Policial (Europol)',
  int: 'Estatuto de la Organización Internacional de Policía Criminal (INTERPOL)',
};
const RANGOS = { loe: [1, 29], l31: [30, 37], rd: [38, 43], eur: [44, 98], int: [99, 106] };
// texto por norma
const TXT = {};
{ const pags = RAW.split(/=====PAG (\d+) ?=====/); const por = {}; for (let i = 1; i < pags.length; i += 2) por[+pags[i]] = pags[i + 1];
  for (const k in RANGOS) { let t = ''; for (let p = RANGOS[k][0]; p <= RANGOS[k][1]; p++) t += (por[p] || '') + '\n'; TXT[k] = t.replace(/-\s*\n\s*/g, '').replace(/[ \t]*\n[ \t]*/g, ' ').replace(/\s+/g, ' '); } }
const OFT = Object.values(TXT).join(' ');
// segmentos por norma
const SEG = {};
for (const k in TXT) {
  const OF = TXT[k]; const marcas = []; let m;
  const re = /Art[ií]culo (\d+)\s?(?:\.-|\.|\s)/g; while ((m = re.exec(OF))) marcas.push([m.index, 'Art. ' + m[1]]);
  const re2 = /Disposici[oó]n (adicional|transitoria|derogatoria|final) (primera|segunda|tercera|cuarta|quinta|sexta|s[eé]ptima|octava|[uú]nica)\./gi; while ((m = re2.exec(OF))) marcas.push([m.index, 'Disposición ' + m[1].toLowerCase() + ' ' + m[2].toLowerCase()]);
  marcas.sort((a, b) => a[0] - b[0]);
  const partes = OF.split(/(?<=[.:;])\s+(?=(?:\d+\.|[a-zñ]\)|[A-ZÁÉÍÓÚÑ«]))/);
  let pos = 0; SEG[k] = [];
  for (const p of partes) { const i = OF.indexOf(p, pos); if (i < 0) continue; pos = i + p.length; let art = ''; for (const mk of marcas) { if (mk[0] <= i) art = mk[1]; else break; } if (p.length >= 25) SEG[k].push({ t: p.trim(), art, tk: toks(p) }); }
}
const mejor = (k, textos) => {
  const q = toks(textos.join(' ')); if (!q.length) return null; const qs = new Set(q); let best = null;
  for (const s of SEG[k]) { let c = 0; for (const w of s.tk) if (qs.has(w)) c++; if (!c) continue; const sc = c / Math.sqrt(s.tk.length + 3) / Math.sqrt(q.length); if (!best || sc > best.sc) best = { s, sc, c }; }
  return best;
};
const qNorma = p => /2016\/794|europol/i.test(p.slice(0, 220)) ? 'eur' : /interpol|Organizaci[oó]n Internacional de Polic/i.test(p.slice(0, 220)) ? 'int' : /1087\/2010|juntas? locales?/i.test(p.slice(0, 220)) ? 'rd' : /31\/2010/.test(p.slice(0, 220)) ? 'l31' : 'loe';
// ---- correcciones a mano
const EDITS = {}; const dirE = path.join(__dirname, 'fix-edits');
if (fs.existsSync(dirE)) for (const f of fs.readdirSync(dirE).filter(f => /\.json$/.test(f)).sort()) Object.assign(EDITS, JSON.parse(fs.readFileSync(path.join(dirE, f), 'utf8')));
for (const id in EDITS) { const c = EDITS[id].cita; if (c && !nz(OFT).includes(nz(c[1]))) console.log('⚠ CITA MANUAL NO LITERAL', id, c[1].slice(0, 70)); }
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const BS = String.fromCharCode(92), L = 'ABCD';
const limpia = s => String(s).replace(/\s*\*\s*$/, '').trim();
const dry = process.argv.includes('--dry');
let s = fs.readFileSync(FILE, 'utf8'), n = 0; const bajas = [];
for (let k = 1; k <= 127; k++) {
  const id = '25-' + k, key = '{"id":"' + id + '"'; const i = s.indexOf(key); if (i < 0) { console.log('NO ESTÁ', id); continue; }
  let d = 0, inS = false, e2 = false, j = i;
  for (; j < s.length; j++) { const c = s[j]; if (inS) { if (e2) e2 = false; else if (c === BS) e2 = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  const q = JSON.parse(s.slice(i, j + 1)); const ed = EDITS[id] || {};
  q.opciones = q.opciones.map(limpia);
  if (ed.p) q.pregunta = Array.isArray(ed.p) ? q.pregunta.replace(ed.p[0], ed.p[1]) : ed.p;
  if (ed.o) for (const kk in ed.o) q.opciones[+kk] = ed.o[kk];
  if (ed.c !== undefined) q.correcta = ed.c;
  const nk = ed.k || qNorma(q.pregunta);
  const ok = q.opciones[q.correcta];
  const stem = q.pregunta.replace(/^[^.]*\d{4}[^.]*\.\s*/, '');
  const gen = /^(todas|ninguna|a y b|las opciones)/i.test(ok) || ok.length < 28;
  const b = mejor(nk, gen ? [stem, ok] : [ok]);
  if ((!b || b.sc < 0.35) && !ed.cita) bajas.push(id + ' ' + (b ? b.sc.toFixed(2) : '–') + ' · ' + ok.slice(0, 60));
  const cita = ed.cita ? ed.cita[1] : (b ? b.s.t : null), art = ed.cita ? ed.cita[0] : (b ? b.s.art : '');
  const inc = /incorrecta/i.test(q.pregunta);
  q.explicacion = `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${esc(ok.replace(/\.$/, ''))}</mark></span><span class="ref-norma">${art ? art + ' · ' : ''}${NORMAS[nk]}</span>${cita ? `<span class="ref-concepto">"${esc(cita)}"</span>` : ''}${ed.nota ? esc(ed.nota) : inc ? 'Es la opción incorrecta: altera el texto de la norma.' : ''}`;
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++;
}
if (process.argv.includes('--bajas') || dry) console.log('Confianza baja:\n  ' + bajas.join('\n  '));
if (!dry) fs.writeFileSync(FILE, s);
console.log((dry ? '[dry] ' : '') + 'corregidas', n, 'de 127 · confianza baja', bajas.length);
