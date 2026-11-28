// Completa los enlaces al esquema y al subrayado de las preguntas del T4 que no los tenían (28/11/2026). Idempotente.
// Uso (desde la carpeta del proyecto): node prompts/herramientas/enlaces-t4-resto.js
const fs = require('fs');
const { us, enlaza, normaDe, artDe, piezaDe, LETRA, F } = require('./enlaces-t4-lib.js');
const Q = F.cargarPreguntas(4);
const MP = 'esquemas-datos/mapa-preguntas.js'; let mp = fs.readFileSync(MP, 'utf8');
const MF = 'prompts/herramientas/tema4/mapa-fijo-t4.json'; const mf = JSON.parse(fs.readFileSync(MF, 'utf8'));
const PE = 'expres-subrayado/t4-preg-extra.json'; const pe = fs.existsSync(PE) ? JSON.parse(fs.readFileSync(PE, 'utf8')) : {};
const DS = 'expres-subrayado/datos-t4.js'; let ds = fs.readFileSync(DS, 'utf8');
const w = {}; new Function('window', ds)(w); const S = w.EXSUB[4], ids = new Set(S.piezas.map(p => p.id));
const MAYLET = { '4.1': 'a', '4.2': 'b', '4.3': 'c', '4.4': 'd', '4.5': 'e', '4.6': 'f' };
let nPar = 0, nPz = 0; const sin = [], nuevosPar = [], nuevosPz = [];
for (const q of Q) {
  const tienePar = mp.includes('"' + q.id + '":');
  const tienePz = ids.has(S.preg[q.id]);
  if (tienePar && tienePz) continue;
  const norma = normaDe(q), art = artDe(q);
  let u = null;
  if (!tienePar) { const e = enlaza(q, norma, art); u = e.u; nuevosPar.push([q.id, e.par]); }
  else { const m = mp.match(new RegExp('"' + q.id + '":"4-(\\d+)')); u = m ? us.find(x => +x.pid.split('-')[1] === +m[1]) : enlaza(q, norma, art).u; }
  if (!tienePz) {
    let letra = norma ? LETRA[norma] : null, a = art;
    if (!letra || !a) { const e = enlaza(q, norma, art); const uu = tienePar ? u : e.u; letra = letra || MAYLET[uu.mayor] || MAYLET[e.u.mayor]; a = a || [...uu.arts][0] || (uu.cab.match(/\d+/) || [])[0]; }
    let pz = letra && a ? piezaDe(letra, a) : null;
    if (!pz) { const e = enlaza(q, norma, null); const l = MAYLET[e.u.mayor] || letra || 'b'; const aa = [...e.u.arts][0] || (e.u.cab.match(/\d+/) || [])[0] || '1'; pz = piezaDe(l, aa) || l + '-1'; sin.push(q.id + ':' + pz); }
    if (!ids.has(pz)) pz = piezaDe(pz.split('-')[0], pz.split('-')[1]) || pz;
    nuevosPz.push([q.id, pz]);
  }
}
for (const [id, par] of nuevosPar) { mf[id] = par; mp = mp.replace('window.MAPA_PREG={', () => `window.MAPA_PREG={"${id}":"4-${par}",`); }
const k = ds.indexOf('"preg":{');
const viejas = new Set(Object.keys(S.preg));
for (const [id, pz] of nuevosPz) { pe[id] = pz; if (viejas.has(id)) ds = ds.replace(new RegExp('"' + id + '":"[^"]*"'), `"${id}":"${pz}"`); else ds = ds.slice(0, k + 8) + `"${id}":"${pz}",` + ds.slice(k + 8); }
fs.writeFileSync(MP, mp); fs.writeFileSync(MF, JSON.stringify(mf, null, 1)); fs.writeFileSync(PE, JSON.stringify(pe, null, 1)); fs.writeFileSync(DS, ds);
console.log('esquema +' + nuevosPar.length, 'subrayado +' + nuevosPz.length, 'por semejanza', sin.length);
