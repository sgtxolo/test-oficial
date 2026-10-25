// Tema 1 · fichas LITERALES de los artículos cuyo texto no estaba en el esquema (cobertura-literal-t1.js, 25/10/2026). Texto de prompts/temario-limpio/tema1/temario.txt.
// Normas con numeración propia (Carta, Estatuto CE, CEDH, Roma, Acuerdo): ficha «Artículo N — Título» ordenada por número dentro de su bloque.
// Protocolos al CEDH: ficha «Protocolo n.º X, art. N — Título» detrás de la ficha de su protocolo. Idempotente (no repite una cabecera ya existente).
// Uso: node prompts/herramientas/tema1/anadir-literal-t1.js [--dry] [--texto <salida.txt>]
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), DRY = process.argv.includes('--dry');
const L = fs.readFileSync(path.join(RAIZ, 'prompts/temario-limpio/tema1/temario.txt'), 'utf8').replace(/\r/g, '').split('\n').map(l => l.replace(/^\s*000\d{3}\s+/, ''));
// [bloque, rango de líneas, ids, prefijo de la ficha del protocolo (null = norma con numeración propia), etiqueta]
const NORMAS = [
  ['T1_CARTA', [467, 716], ['15', '34'], null, ''],
  ['T1_COE', [752, 1045], ['5', '18', '35', '37'], null, ''],
  ['T1_CEDH', [1073, 1523], ['1', '8', '29', '51'], null, ''],
  ['T1_CEDH', [1538, 1560], ['2', '4', '6'], /^Protocolo Adicional/, 'Protocolo Adicional'],
  ['T1_CEDH', [1561, 1610], ['2', '3', '4', '5', '7'], /^Protocolo Adicional/, 'Protocolo n.º 4'],
  ['T1_CEDH', [1611, 1656], ['3', '4', '5', '6', '7'], /^Protocolo n\.º 6 /, 'Protocolo n.º 6'],
  ['T1_CEDH', [1657, 1715], ['5', '6', '8', '10'], /^Protocolo n\.º 7 /, 'Protocolo n.º 7'],
  ['T1_CEDH', [1716, 1760], ['2', '4'], /^Protocolo n\.º 12 .*Prohibición general/, 'Protocolo n.º 12'],
  ['T1_CEDH', [1761, 1790], ['2', '3', '5', '6'], /^Protocolo n\.º 13 /, 'Protocolo n.º 13'],
  ['T1_ROMA', [1790, 2762], ['8 BIS', '15 BIS', '15 TER', '17', '21', '56', '89'], null, ''],
  ['T1_ACUERDO', [2777, 3190], ['2', '8', '14', '23', '29', '31', '33', '37', '38', '39'], null, ''],
];
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sentence = t => { t = t.toLowerCase().replace(/\.$/, ''); t = t.charAt(0).toUpperCase() + t.slice(1); return t.replace(/corte/g, 'Corte').replace(/estados/g, 'Estados'); };
function extrae([a, b], id) {
  let i = -1; for (let k = a - 1; k < b; k++) if (new RegExp('^\\s*ART[ÍI]CULO\\s+' + id.replace(' ', '\\s+') + '\\b(?!\\s*BIS|\\s*TER)|^\\s*ART[ÍI]CULO\\s+' + id.replace(' ', '\\s+') + '\\b', 'i').test(L[k]) && (/\s/.test(id) || !new RegExp('^\\s*ART[ÍI]CULO\\s+' + id + '\\s+(BIS|TER)', 'i').test(L[k]))) { i = k; break; }
  if (i < 0) return null; let j = i + 1;
  const PIE = /Todos los derechos reservados|^\s*TOMO 1\b|TEMARIO DE ASCENSO|^\s*T1 DERECHOS HUMANOS|^\s*A OFICIAL\s*$|^\s*\d+\s*\|\s*Todos/i;
  while (j < b && !/^\s*ART[ÍI]CULO\s+\d/i.test(L[j]) && !/^\s*(PROTOCOLO|TÍTULO|CAPÍTULO|SECCIÓN|PARTE)\b/.test(L[j])) j++;
  let t = L.slice(i, j).map(l => l.replace(/\s*\d*\s*\|?\s*Todos los derechos reservados.*$/i, '').replace(/\s*©\s*academiaprefortia.*$/i, '')).filter(l => l.trim() && !PIE.test(l)).join(' ').replace(/\s+/g, ' ').trim();
  t = t.replace(/^ART[ÍI]CULO\s+[\dA-Z ]+?\b\.?\s*/i, m => /^ART[ÍI]CULO\s+\d+\s*$/i.test(m) ? m : m);
  const mt = t.match(/^ART[ÍI]CULO\s+(\d+(?:\s+(?:BIS|TER))?)\.?\s+([A-ZÁÉÍÓÚÑ ,.\-()'ºª]{6,}?)\.\s+(.*)$/);
  let titulo = '', cuerpo = t;
  if (mt) { titulo = sentence(mt[2]); cuerpo = mt[3]; } else { cuerpo = t.replace(/^ART[ÍI]CULO\s+\d+(?:\s+(?:BIS|TER))?\.?\s*/i, ''); }
  cuerpo = cuerpo.replace(/\s*\d*\s*\|?\s*Todos los derechos reservados.*$/i, '').replace(/\s\d+\s*A rtículo.*$/, '').replace(/\s\d+ RECUERDA.*$/, '').replace(/\s*TOMO 1 T1.*$/, '').replace(/\s*El texto supra recoge.*$/, '').replace(/\s\d+\s*R ECUERDA.*$/, '');
  cuerpo = cuerpo.replace(/[\u0000-\u0008]\s?/g, '').replace(/­\s?/g, '').replace(/(\w)- (?=[a-záéíóúñ])/g, '$1').replace(/(\d\.\s)([A-ZÁÉÍÓÚ]) (?=[a-záéíóúñ])/g, '$1$2').replace(/\s000\d{3}\s/g, ' ').trim();
  cuerpo = cuerpo.replace(/\sT1 DERECHOS ?HUMANOS.*$/, '').replace(/\.\d+\s+\d+\s+R ?ECUERDA.*$/, '.').replace(/\s\d+\s+R ?ECUERDA:.*$/, '').replace(/(^|\s)R\d{1,2}(?=\s)/g, '$1').replace(/\s+/g, ' ').trim();   // pies, notas RECUERDA y pines R n del PDF
  return { titulo, cuerpo };
}
function html(cuerpo) {
  const partes = cuerpo.split(/(?<!apartado)\s(?=(?:\d{1,2}\.\s|[a-h]\)\s|[ivx]+\)\s)(?=[A-ZÁÉÍÓÚa-z0-9]))/).map(s => s.trim()).filter(Boolean);
  return partes.map(p => { const m = p.match(/^(\d{1,2}\.|[a-h]\)|[ivx]+\))\s+(.*)$/); return m ? `<p><b>${m[1]}</b> ${esc(m[2])}</p>` : `<p>${esc(p)}</p>`; }).join('');
}
const nombres = txt => { const x = txt.split('—')[0]; const o = []; for (const m of x.matchAll(/(\d{1,3})(?:\s*a\s*(\d{1,3}))?/g)) { const a = +m[1], b = m[2] ? +m[2] : a; if (b >= a && b - a < 60) o.push(a); } return o; };
const F = path.join(RAIZ, 'esquemas.html'); let s = fs.readFileSync(F, 'utf8');
const fichasT1 = src => { const a = src.indexOf('const T1 = {};'), b = src.indexOf('/* T1_RECUERDA'); return [...src.slice(a, b).matchAll(/^  \+ articuloResp\("((?:[^"\\]|\\.)*)"/gm)].map(m => m[1]); };
let n = 0; const salida = [];
for (const [blk, rango, ids, protoRe, etq] of NORMAS) for (const id of ids) {
  const x = extrae(rango, id); if (!x) { console.log('NO está:', etq || blk, id); continue; }
  const num = parseInt(id, 10), suf = / BIS$/i.test(id) ? ' bis' : / TER$/i.test(id) ? ' ter' : '';
  const nombre = protoRe ? `${etq}, art. ${num}` : `Artículo ${num}${suf}`;
  const completo = (blk === 'T1_ROMA' && ['56', '89'].includes(id)) || (blk === 'T1_ACUERDO' && id === '23');   // ya tienen ficha parcial con (…): se añade además la ficha con el texto completo
  const cab = `${nombre} — ${x.titulo || ('Artículo ' + num + suf)}${completo ? ' (texto completo)' : ''}`;
  const i0 = s.indexOf('/* ' + blk + ' */'), i1 = s.indexOf('\n/* T1_', i0 + 5);
  if (new RegExp('^  \\+ articuloResp\\("' + (completo ? cab.replace(/[.()]/g, '\\$&') : nombre.replace(/[.()]/g, '\\$&') + ' — '), 'm').test(s.slice(i0, i1 < 0 ? s.length : i1))) continue;
  salida.push(`### ${cab}\n${x.cuerpo}`);
  const ini = s.indexOf('/* ' + blk + ' */'); const sig = s.indexOf('\n/* T1_', ini + 5); const fin = sig < 0 ? s.length : sig;
  const lineas = s.slice(ini, fin).split('\n'); const linea = `  + articuloResp(${JSON.stringify(cab)}, [], ${JSON.stringify(html(x.cuerpo))}, false)`;
  let pos = -1;
  if (protoRe) { // detrás de la ficha del protocolo (y de sus VIS/trampas) y de las fichas de artículo ya añadidas del mismo protocolo
    let k0 = lineas.findIndex(l => { const m = l.match(/^  \+ articuloResp\("((?:[^"\\]|\\.)*)"/); return m && protoRe.test(m[1].replace(/\\"/g, '"')); });
    if (k0 < 0) { console.log('sin ficha de protocolo', etq); continue; }
    let k = k0 + 1; while (k < lineas.length && (/^  \+ (\/\*VIS\*\/|trampa\()/.test(lineas[k]) || new RegExp('^  \\+ articuloResp\\("' + etq.replace(/[.()]/g, '\\$&') + ', art\\. ').test(lineas[k]))) k++;
    pos = k;
  } else {
    for (let k = 1; k < lineas.length; k++) { const m = lineas[k].match(/^  \+ articuloResp\("(Art[íi]culos?[^"]*)"/); if (m) { const nn = nombres(m[1].replace(/^Art[íi]culos?\s*/, ''))[0]; if (nn > num || (nn === num && suf && !/ bis| ter/.test(m[1].split('—')[0]))) { pos = k; break; } } }
  }
  if (pos < 0 || pos >= lineas.length || !/^  \+ /.test(lineas[pos] || '')) { // al final del bloque (o tras la última línea «  + …»)
    let u = pos >= 0 && pos <= lineas.length ? pos - 1 : lineas.length - 1; while (u > 0 && !/^  \+ /.test(lineas[u])) u--;
    if (pos < 0 || pos >= lineas.length) { u = lineas.length - 1; while (u > 0 && !/^  \+ /.test(lineas[u])) u--; }
    const termina = /;\s*$/.test(lineas[u]); lineas[u] = lineas[u].replace(/;\s*$/, ''); lineas.splice(u + 1, 0, linea + (termina ? ';' : ''));
  } else lineas.splice(pos, 0, linea);
  s = s.slice(0, ini) + lineas.join('\n') + s.slice(fin); n++;
}
console.log('fichas nuevas:', n);
const ti = process.argv.indexOf('--texto'); if (ti > 0) fs.writeFileSync(process.argv[ti + 1], salida.join('\n'));
if (n && !DRY) fs.writeFileSync(F, s);
