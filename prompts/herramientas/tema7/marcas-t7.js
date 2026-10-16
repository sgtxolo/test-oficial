// Tema 7 · marcas a mano del temario escaneado (08-08-2026), leídas página a página como imagen el 16/10/2026.
//   data-ex="EXOF,*" en el PÁRRAFO exacto: EXOF = sello «PREGUNTA EXAMEN 2020» o círculo azul «exof» · * = asterisco ✱ azul/rojo
//   data-r="R5" en el párrafo del apartado de cada ficha RECUERDA R1-R13, más el bloque T7.rec con las 13 fichas (págs. 27-28 del escaneado).
// Idempotente. Uso: node prompts/herramientas/tema7/marcas-t7.js [--dry]
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
const X = require('../expres-lib.js')(7);
const limpia = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
// norma: LOTC = fichas antes del Preámbulo de la LO 1/1982
const kLO = X.fichas.findIndex(f => /^Preámbulo/.test(limpia(f.cab)));
const MARCAS = {
  LOTC: ['2.1:EXOF', '2.1b:*', '3:EXOF', '4.1:EXOF', '4.2:*', '5:EXOF', '6.2:*', '7.2:*', '9.1:*', '10.1b:*', '10.1c:*', '10.1d:*', '10.1f:*', '10.1n:*', '10.3:*', '14:*', '15:EXOF',
    '42:EXOF', '43.1:EXOF', '43.3:*', '46.1a:*', '49.1:EXOF', '50.2:*', '50.3:EXOF', '51.1:*', '53:EXOF', '55.1:*', '56.3:*', '56.6:*'],
  LO82: ['1.1:EXOF', '1.3:EXOF', '2.3:*', '3.2:EXOF', '3.2:*', '4.1:EXOF', '4.3:EXOF', '4.3:*', '7.1:*', '7.2:*', '7.3:EXOF', '8.1:*', '8.2a:*', '8.2b:*', '9.2b:*', '9.2c:*', '9.2d:*', '9.5:*', '7:EXOF'],
};
// R1-R13: norma, artículo, apartado, enunciado y respuesta tal como vienen en el temario
const RS = [
  ['R1', 'LOTC', '4', '1', 'LO, del Tribunal Constitucional.', 'En ningún caso se podrá promover:', 'cuestión de jurisdicción o competencia al Tribunal Constitucional.'],
  ['R2', 'LOTC', '5', '', 'LO, del Tribunal Constitucional.', 'El Tribunal Constitucional está integrado por:', 'doce miembros, con el título de Magistrados del Tribunal Constitucional.'],
  ['R3', 'LOTC', '6', '1', 'LO, del Tribunal Constitucional.', 'El Tribunal Constitucional actúa:', 'en Pleno, en Sala o en Sección.'],
  ['R4', 'LOTC', '12', '', 'LO, del Tribunal Constitucional.', 'La distribución de asuntos entre las Salas del Tribunal se efectuará:', 'según un turno establecido por el Pleno a propuesta de su Presidente.'],
  ['R5', 'LOTC', '43', '2', 'LO, del Tribunal Constitucional.', 'El plazo para interponer el recurso de amparo constitucional será el de los:', 'veinte días siguientes a la notificación de la resolución recaída en el previo proceso judicial.'],
  ['R6', 'LOTC', '48', '', 'LO, del Tribunal Constitucional.', 'El conocimiento de los recursos de amparo constitucional corresponde a:', 'las Salas del Tribunal Constitucional y, en su caso, a las Secciones.'],
  ['R7', 'LOTC', '53', '', 'LO, del Tribunal Constitucional.', 'La Sala o, en su caso, la Sección, al conocer del fondo del asunto, pronunciará en su sentencia alguno de estos fallos:', 'otorgamiento de amparo o denegación de amparo.'],
  ['R8', 'LOTC', '56', '1', 'LO, del Tribunal Constitucional.', 'La interposición del recurso de amparo no suspenderá:', 'los efectos del acto o sentencia impugnados.'],
  ['R9', 'LOTC', '58', '2', 'LO, del Tribunal Constitucional.', 'Las peticiones de indemnización, que se sustanciarán por el trámite de los incidentes, deberán presentarse dentro del plazo de:', 'un año a partir de la publicación de la sentencia del Tribunal Constitucional.'],
  ['R10', 'LO82', '1', '3', 'LO, protección civil del derecho al honor, intimidad y propia imagen.', 'El derecho al honor, a la intimidad personal y familiar y a la propia imagen es:', 'irrenunciable, inalienable e imprescriptible.'],
  ['R11', 'LO82', '3', '1', 'LO, protección civil del derecho al honor, intimidad y propia imagen.', 'El consentimiento de los menores e incapaces deberá prestarse por ellos mismos si:', 'sus condiciones de madurez lo permiten, de acuerdo con la legislación civil.'],
  ['R12', 'LO82', '8', '1', 'LO, protección civil del derecho al honor, intimidad y propia imagen.', 'No se reputarán, con carácter general, intromisiones ilegítimas:', 'las actuaciones autorizadas o acordadas por la Autoridad competente de acuerdo con la ley, ni cuando predomine un interés histórico, científico o cultural relevante.'],
  ['R13', 'LO82', '9', '3', 'LO, protección civil del derecho al honor, intimidad y propia imagen.', 'Se presumirá siempre que se acredite la intromisión ilegítima:', 'la existencia de perjuicio.'],
];
// ---- párrafos con su norma, artículo, apartado y letra
const P = [];
X.fichas.forEach((f, k) => {
  const norma = k >= kLO ? 'LO82' : 'LOTC'; const cab = limpia(f.cab); const m0 = cab.match(/^Art[ií]culo (\d+) —/); const art = m0 ? m0[1] : cab.startsWith('Preámbulo') ? 'P' : '';
  let ap = '';
  f.ps.forEach((p, j) => {
    const t = limpia(p.h); let m;
    if ((m = t.match(/^(\d+)\.\s/))) ap = m[1];
    const letra = (m = t.match(/^([a-z])\)(?!\s*bis)\s/)) ? m[1] : '';
    P.push({ k, j, norma, art, ap: /^(\d+)\.\s/.test(t) ? t.match(/^(\d+)\./)[1] : (letra ? ap : ap), apPropio: /^(\d+)\.\s/.test(t) ? t.match(/^(\d+)\./)[1] : '', letra, t, primero: j === 0 });
  });
});
const busca = (norma, spec) => {
  const m = spec.match(/^(\d+)(?:\.(\d+))?([a-z])?$/); if (!m) return [];
  const [, art, ap, letra] = m;
  const cand = P.filter(p => p.norma === norma && p.art === art);
  if (letra) return cand.filter(p => p.letra === letra && (!ap || p.ap === ap)).slice(0, 1);
  if (ap) return cand.filter(p => p.apPropio === ap).slice(0, 1);
  return cand.slice(0, 1);
};
const marcas = [], fallos = [];
for (const [norma, lista] of Object.entries(MARCAS)) for (const e of lista) { const [spec, tipo] = e.split(':'); const r = busca(norma, spec); if (!r.length) fallos.push(norma + ' ' + e); r.forEach(p => marcas.push({ ...p, tipo })); }
const rs = [];
for (const r of RS) { const [id, norma, art, ap] = r; const c = busca(norma, art + (ap ? '.' + ap : '')); if (!c.length) fallos.push('R ' + id); else rs.push({ id, ...c[0] }); }
console.log('marcas situadas', marcas.length, '· R situadas', rs.length, '· no encontradas:', fallos.join(' ') || 'ninguna');
if (process.argv.includes('--dry')) { marcas.slice(0, 80).forEach(p => console.log(p.norma, p.art, p.ap, p.letra, p.tipo, '|', p.t.slice(0, 50))); process.exit(0); }
// ---- aplicar al HTML
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('const T7 = {};'), b = s.indexOf('/* T7_RECUERDA + ensamblaje */');
let seg = s.slice(a, b);
const ORD = { EXOF: 0, EX: 1, '*': 2 };
const poner = (k, j, attr, vals, ord) => {
  const p = X.fichas[k].ps[j]; let ini = -1;
  for (const n of [70, 200, 600, 5000]) { const r = JSON.stringify('>' + p.h.slice(0, n)).slice(1, -1); if (seg.split(r).length === 2) { ini = seg.indexOf(r); break; } }
  if (ini < 0) return false;
  const i = seg.lastIndexOf('<p', ini), fin = ini, tag = seg.slice(i, fin);
  const re = new RegExp(' ' + attr + '=\\\\"([^"\\\\]*)\\\\"'); const prev = (tag.match(re) || [])[1];
  const val = [...new Set([...(prev ? prev.split(',') : []), ...vals])].sort(ord).join(',');
  if (prev === val) return true;
  const nuevo = prev !== undefined ? tag.replace(re, ` ${attr}=\\"${val}\\"`) : tag + ` ${attr}=\\"${val}\\"`;
  seg = seg.slice(0, i) + nuevo + seg.slice(fin); return true;
};
const por = {}; marcas.forEach(m => (por[m.k + '-' + m.j] = por[m.k + '-' + m.j] || new Set()).add(m.tipo));
let ok = 0, mal = [];
for (const [kj, tipos] of Object.entries(por)) { const [k, j] = kj.split('-').map(Number); (poner(k, j, 'data-ex', [...tipos], (x, y) => ORD[x] - ORD[y]) ? ok++ : mal.push(kj)); }
const porR = {}; rs.forEach(r => (porR[r.k + '-' + r.j] = porR[r.k + '-' + r.j] || []).push(r.id));
let okR = 0; for (const [kj, ids] of Object.entries(porR)) { const [k, j] = kj.split('-').map(Number); (poner(k, j, 'data-r', ids, (x, y) => +x.slice(1) - +y.slice(1)) ? okR++ : mal.push('R' + kj)); }
const antes = (seg.match(/", true\)/g) || []).length; seg = seg.replace(/", true\)/g, '", false)');
console.log(`párrafos con data-ex: ${ok} · con data-r: ${okR} · no localizados en el HTML: ${mal.join(' ') || 'ninguno'} · sellos EX automáticos por ficha quitados: ${antes}`);
// ---- bloque RECUERDA del temario (R1-R13)
const card = r => `<p><b>${r[0]}</b> · <i>${r[4].replace(/\.$/, '')}.</i> ${r[5]} <b>→</b> <mark class=\\"m-resp\\">${r[6]}</mark></p>`;
const grupo = (tit, ids) => `  + articuloResp("RECUERDA del temario · ${tit}", [], "${RS.filter(r => ids.includes(r[0])).map(card).join('')}")`;
const rec = `/* T7_REC */ T7.rec = bloqueTitulo("RECUERDA DEL TEMARIO — fichas R1 a R13 (pregunta → respuesta), tal como vienen en las últimas páginas de tu temario")\n${grupo('LO 2/1979 del Tribunal Constitucional — R1 a R9', RS.slice(0, 9).map(r => r[0]))}\n${grupo('LO 1/1982 honor, intimidad e imagen — R10 a R13', RS.slice(9).map(r => r[0]))};\n`;
seg = seg.replace(/\/\* T7_REC \*\/[\s\S]*?(?=\/\* T7_RECUERDA)/, '').replace(/\n*$/, '\n') + rec;
s = s.slice(0, a) + seg + s.slice(b);
s = s.replace('+ T7.lotc + T7.lo82\n', '+ T7.lotc + T7.lo82 + T7.rec\n').replace('+ T7.lotc + T7.lo82 + T7.rec + T7.rec', '+ T7.lotc + T7.lo82 + T7.rec');
fs.writeFileSync(F, s);
console.log('bloque T7.rec insertado:', s.includes('+ T7.lotc + T7.lo82 + T7.rec'));
