// Preguntas OFICIALES de los vídeos de la academia del 28/11/2026 (temas 1 y 3). Idempotente.
// Uso (desde la carpeta del proyecto): node prompts/herramientas/oficiales-seras-28-11.js prompts/herramientas/oficiales-seras-28-11-d1.json
// Cada lote trae: pregunta, opciones, correcta, lila, rojo (párrafo literal del temario), exp, apartado, par (esquema), pz (subrayado), sec (Esquema clave).
// Salta las de enunciado repetido (en los genéricos, solo si además coinciden las opciones). Guarda en el lote el id asignado.
require('./esq-virtual.js');
const fs = require('fs');
const FL = process.argv[2];
const L = JSON.parse(fs.readFileSync(FL, 'utf8'));
const BS = String.fromCharCode(92);
const F = 'test-oficial-conocimiento.html';
let s = fs.readFileSync(F, 'utf8');
const fin = i => { let d = 0, str = false, e = false; for (let j = i; j < s.length; j++) { const c = s[j]; if (str) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') str = false; continue; } if (c === '"') str = true; else if (c === '{' || c === '[') d++; else if ((c === '}' || c === ']') && !--d) return j + 1; } };
const ini = s.indexOf('QUESTIONS={"1":') + 10;
const banco = JSON.parse(s.slice(ini, fin(ini)));
const plano = t => String(t).toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '');
const PREF = /^(del? )?(la |el )?(ley orgánica|convenio|estatuto|carta|acuerdo|tratado|versión consolidada|protocolo)[^.¿?:]*(\.|:)\s*/i;
const sinPref = t => { let x = String(t).trim(), a; do { a = x; const r = x.replace(PREF, ''); if (r.length > 8) x = r; } while (x !== a); return x; };
const generico = t => { const r = sinPref(t); return r.length < 150 && /^([^.¿?]{0,100}[.,:]\s*){0,2}(se[ñn]ale|indique|marque) (la )?(opci[oó]ne?s? |respuesta |afirmaci[oó]n )?(que )?(no es |es )?(in)?correcta\W*$/i.test(r); };
const ops = q => q.opciones.map(plano).sort().join('|');
const previas = Object.values(banco).flat().map(q => ({ id: q.id, p: plano(sinPref(q.pregunta)), o: ops(q) }));
let puestas = 0; const repetidas = [];
for (const q of L) {
  if (q.id && s.includes('{"id":"' + q.id + '"')) continue;
  const p = plano(sinPref(q.pregunta)), o = ops(q);
  const rep = previas.find(x => x.p === p && (!generico(q.pregunta) || x.o === o));
  if (rep) { repetidas.push([q.v, q.i, rep.id]); q.repetidaDe = rep.id; continue; }
  const nums = banco[q.t].map(x => +x.id.split('-')[1]).filter(Number.isFinite);
  const ult = Math.max(...nums);
  q.id = q.t + '-' + (ult + 1);
  const L4 = 'ABCD';
  const n = {
    id: q.id, pregunta: q.pregunta, opciones: q.opciones, correcta: q.correcta,
    explicacion: `<span class="ex-resp">Respuesta correcta: <b>${L4[q.correcta]}</b> · <mark class="ex-key">${q.opciones[q.correcta].replace(/\.$/, '')}</mark></span><span class="ref-norma">${q.lila}</span><span class="ref-concepto">"${q.rojo}"</span>${q.exp}`,
    apartado: q.apartado
  };
  const a = s.indexOf('{"id":"' + q.t + '-' + ult + '"'); if (a < 0) throw new Error('sin ancla ' + q.t + '-' + ult);
  const e = fin(a); s = s.slice(0, e) + ',' + JSON.stringify(n) + s.slice(e);
  banco[q.t].push(n); previas.push({ id: q.id, p, o }); puestas++;
}
fs.writeFileSync(F, s);
const hechas = L.filter(q => q.id);
const temas = [...new Set(hechas.map(q => q.t))];
const lee = f => { const w = {}; new Function('window', fs.readFileSync(f, 'utf8'))(w); return w; };
for (const t of temas) {
  const Q = hechas.filter(q => q.t === t);
  // Esquemas: mapa fijo y mapa generado
  const MF = `prompts/herramientas/tema${t}/mapa-fijo-t${t}.json`;
  const mf = fs.existsSync(MF) ? JSON.parse(fs.readFileSync(MF, 'utf8')) : {};
  Q.forEach(q => { if (q.par) mf[q.id] = q.par; });
  fs.writeFileSync(MF, JSON.stringify(mf, null, 1));
  const MP = 'esquemas-datos/mapa-preguntas.js';
  const mp = fs.readFileSync(MP, 'utf8');
  fs.writeFileSync(MP, mp.replace('window.MAPA_PREG={', () => 'window.MAPA_PREG={' + Q.filter(q => q.par && !mp.includes('"' + q.id + '":')).map(q => `"${q.id}":"${t}-${q.par}",`).join('')));
  // temario subrayado
  const PE = `expres-subrayado/t${t}-preg-extra.json`;
  const pe = fs.existsSync(PE) ? JSON.parse(fs.readFileSync(PE, 'utf8')) : {};
  Q.forEach(q => { if (q.pz) pe[q.id] = q.pz; });
  fs.writeFileSync(PE, JSON.stringify(pe, null, 1));
  const DS = `expres-subrayado/datos-t${t}.js`;
  let ds = fs.readFileSync(DS, 'utf8'); const k = ds.indexOf('"preg":{'); if (k < 0) throw new Error('sin preg en ' + DS);
  const add = Q.filter(q => q.pz && !ds.includes('"' + q.id + '":')).map(q => `"${q.id}":"${q.pz}",`).join('');
  fs.writeFileSync(DS, ds.slice(0, k + 8) + add + ds.slice(k + 8));
  // Esquema clave
  const FE = `clave-tests/t${t}-esq.js`, FS = `clave-tests/t${t}-sec.js`;
  if (fs.existsSync(FE) && fs.existsSync(FS)) {
    const esq = lee(FE).CLAVE_ESQ[t], sec = lee(FS).CLAVE_SEC[t];
    Q.forEach(q => { if (q.sec === undefined || !sec[q.sec]) return; if (!esq.includes(q.id)) esq.push(q.id); if (!sec[q.sec].includes(q.id)) sec[q.sec].push(q.id); });
    const pon = (f, v) => { const x = fs.readFileSync(f, 'utf8'), i = x.indexOf(`[${t}]=`) + `[${t}]=`.length; fs.writeFileSync(f, x.slice(0, i) + JSON.stringify(v) + ';' + String.fromCharCode(10)); };
    pon(FE, esq); pon(FS, sec);
  }
}
fs.writeFileSync(FL, JSON.stringify(L, null, 1));
console.log('añadidas', puestas, '· repetidas', repetidas.length, JSON.stringify(repetidas));
console.log(temas.map(t => 'T' + t + ' ' + hechas.filter(q => q.t === t)[0].id + ' → ' + hechas.filter(q => q.t === t).pop().id).join(' · '));
console.log('sin esquema', hechas.filter(q => !q.par).map(q => q.id).join(), '| sin subrayado', hechas.filter(q => !q.pz).map(q => q.id + ':' + q.refs[0].n + q.refs[0].art).join());
