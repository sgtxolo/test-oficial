// Inserta preguntas OFICIALES de los vídeos de la academia (26/11/2026) desde prompts/herramientas/oficiales-seras-t<T>.json
// Uso (desde la carpeta del proyecto): node prompts/herramientas/oficiales-seras.js <T>
// Cada elemento: {en, op[4], c, art (pieza del subrayado), loc, norma, apartado, lit, exp}. Idempotente (mismo enunciado y respuesta = no se repite).
// Añade: pregunta al banco oficial, enlace al temario subrayado (tN-preg-extra.json y datos-tN.js) y apartado del Esquema clave.
// Después: regenerar/mezclar el mapa de Esquemas (mapa-preguntas.js).
const fs = require('fs');
const BS = String.fromCharCode(92);
const T = process.argv[2];
const D = JSON.parse(fs.readFileSync(`prompts/herramientas/oficiales-seras-t${T}.json`, 'utf8'));
const F = 'test-oficial-conocimiento.html';
let s = fs.readFileSync(F, 'utf8');
const fin = i => { let d = 0, str = false, e = false; for (let j = i; j < s.length; j++) { const c = s[j]; if (str) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') str = false; continue; } if (c === '"') str = true; else if (c === '{') d++; else if (c === '}' && !--d) return j + 1; } };
const plano = t => String(t).toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '');
const previas = new Map(); let max = 0, ultima = null;
{ const re = new RegExp('\\{"id":"' + T + '-(\\d+)","pregunta"', 'g'); let m; while ((m = re.exec(s))) { const o = JSON.parse(s.slice(m.index, fin(m.index))); previas.set(plano(o.pregunta) + '|' + plano(o.opciones.join('')), o.id); if (+m[1] > max) max = +m[1]; ultima = o.id; } }
if (!ultima) throw new Error('sin preguntas del tema ' + T);
const L = 'ABCD', pieza = {}; const nuevas = [];
for (const q of D) {
  const k = plano(q.en) + '|' + plano(q.op.join(''));
  if (previas.has(k)) { pieza[previas.get(k)] = q.art; continue; }
  const id = T + '-' + (++max);
  nuevas.push({ id, pregunta: q.en, opciones: q.op, correcta: q.c, explicacion: `<span class="ex-resp">Respuesta correcta: <b>${L[q.c]}</b> · <mark class="ex-key">${q.op[q.c].replace(/\.$/, '')}</mark></span><span class="ref-norma">${q.loc} · ${q.norma}</span><span class="ref-concepto">"${q.lit}"</span>${q.exp}`, apartado: q.apartado });
  previas.set(k, id); pieza[id] = q.art;
}
if (nuevas.length) { const a = s.indexOf('{"id":"' + ultima + '","pregunta"'); const e = fin(a); s = s.slice(0, e) + ',' + nuevas.map(n => JSON.stringify(n)).join(',') + s.slice(e); fs.writeFileSync(F, s); }
// temario subrayado
const PE = `expres-subrayado/t${T}-preg-extra.json`;
const pe = fs.existsSync(PE) ? JSON.parse(fs.readFileSync(PE, 'utf8')) : {};
Object.assign(pe, pieza); fs.writeFileSync(PE, JSON.stringify(pe, null, 1));
const DS = `expres-subrayado/datos-t${T}.js`; let ds = fs.readFileSync(DS, 'utf8');
const k = ds.indexOf('"preg":{'); if (k < 0) throw new Error('datos sin preg');
const add = Object.entries(pieza).filter(([id]) => !ds.includes('"' + id + '":')).map(([id, p]) => `"${id}":"${p}",`).join('');
ds = ds.slice(0, k + 8) + add + ds.slice(k + 8); fs.writeFileSync(DS, ds);
const falta = [...new Set(Object.values(pieza))].filter(p => !ds.includes('"id":"' + p + '"'));
// Esquema clave: apartado = el que ya tiene más preguntas de la misma pieza (o del artículo anterior más cercano de la norma)
const lee = f => { const w = {}; new Function('window', fs.readFileSync(f, 'utf8'))(w); return w; };
const FE = `clave-tests/t${T}-esq.js`, FS = `clave-tests/t${T}-sec.js`; const sinSec = [];
if (fs.existsSync(FE) && fs.existsSync(FS)) {
  const esq = lee(FE).CLAVE_ESQ[T], sec = lee(FS).CLAVE_SEC[T], preg = lee(DS).EXSUB[T].preg;
  for (const [id, p] of Object.entries(pieza)) {
    if (!esq.includes(id)) esq.push(id);
    if (sec.some(a => a && a.includes(id))) continue;
    const [n, a] = [p.split('-')[0], parseInt(p.split('-')[1], 10)];
    let mejor = null;
    for (let d = 0; d < 12 && !mejor; d++) for (const cand of d ? [n + '-' + (a - d), n + '-' + (a + d)] : [p]) {
      let m = 0; sec.forEach((arr, j) => { const c = (arr || []).filter(x => !pieza[x] && preg[x] === cand).length; if (c > m) { m = c; mejor = j; } });
      if (mejor !== null) break;
    }
    if (mejor === null) sinSec.push(id); else sec[mejor].push(id);
  }
  const pon = (f, v) => { const t = fs.readFileSync(f, 'utf8'), i = t.indexOf(`[${T}]=`) + `[${T}]=`.length; fs.writeFileSync(f, t.slice(0, i) + JSON.stringify(v) + ';' + String.fromCharCode(10)); };
  pon(FE, esq); pon(FS, sec);
} else sinSec.push('sin esquema clave');
console.log('tema', T, '· nuevas', nuevas.length, nuevas.length ? nuevas[0].id + ' → ' + nuevas[nuevas.length - 1].id : '', '· sin pieza:', falta.join(',') || 'ninguna', '· sin apartado clave:', sinSec.join(',') || 'ninguna');
