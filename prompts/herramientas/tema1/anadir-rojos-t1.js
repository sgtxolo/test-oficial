// Tema 1 · añade al esquema las fichas de los artículos que estaban «en rojo» (rojos-t1.js), con su texto LITERAL de prompts/temario-limpio/tema1/temario.txt.
// Cada ficha va en su bloque (T1_CARTA, T1_COE, T1_CEDH, T1_ROMA) ordenada por número de artículo; se realinean las anclas de mapa-fijo-t1.json (k = nº de ficha).
// Idempotente. Uso: node prompts/herramientas/tema1/anadir-rojos-t1.js [--dry]
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), DRY = process.argv.includes('--dry');
const L = fs.readFileSync(path.join(RAIZ, 'prompts/temario-limpio/tema1/temario.txt'), 'utf8').replace(/\r/g, '').split('\n').map(l => l.replace(/^\s*000\d{3}\s+/, ''));
const RANGO = { T1_CARTA: [467, 716], T1_COE: [752, 1045], T1_CEDH: [1073, 1523], T1_ROMA: [1790, 2762] };
const SPEC = {
  T1_CARTA: [[6, 'Derecho a la libertad y a la seguridad'], [7, 'Respeto de la vida privada y familiar'], [16, 'Libertad de empresa'], [25, 'Derechos de las personas mayores'], [26, 'Integración de las personas discapacitadas'], [36, 'Acceso a los servicios de interés económico general'], [53, 'Nivel de protección'], [54, 'Prohibición del abuso de derecho']],
  T1_COE: [[2, 'Miembros del Consejo de Europa'], [19, 'Informes del Comité de Ministros a la Asamblea'], [24, 'Comités y Comisiones de la Asamblea Consultiva'], [27, 'Representación del Comité de Ministros en la Asamblea'], [40, 'Inmunidades y privilegios']],
  T1_CEDH: [[14, 'Prohibición de discriminación'], [17, 'Prohibición del abuso de derecho'], [18, 'Limitación de la aplicación de las restricciones de derechos'], [24, 'Secretaría y ponentes'], [32, 'Competencia del Tribunal'], [33, 'Asuntos entre Estados'], [38, 'Examen del asunto'], [42, 'Sentencias de las Salas'], [48, 'Competencia consultiva del Tribunal'], [49, 'Motivación de las opiniones consultivas'], [52, 'Indagaciones del Secretario General'], [53, 'Protección de los derechos humanos reconocidos'], [54, 'Poderes del Comité de Ministros']],
  T1_ROMA: [[10, 'Normas de derecho internacional'], [14, 'Remisión de una situación por un Estado Parte'], [88, 'Procedimientos aplicables en el derecho interno'], [95, 'Aplazamiento de la ejecución por impugnarse la admisibilidad de la causa'], [97, 'Consultas con la Corte']],
};
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function literal(blk, n) {
  const [a, b] = RANGO[blk]; let i = -1;
  for (let k = a - 1; k < b; k++) if (new RegExp('^\\s*ART[ÍI]CULO\\s+' + n + '\\b', 'i').test(L[k])) { i = k; break; }
  if (i < 0) return null; let j = i + 1; while (j < b && !/^\s*ART[ÍI]CULO\s+\d/i.test(L[j]) && !/^\s*(PROTOCOLO|TÍTULO|CAPÍTULO|SECCIÓN|PARTE)\b/.test(L[j]) && !/^Todos los derechos reservados/.test(L[j])) j++;
  let t = L.slice(i, j).join(' ').replace(/\s+/g, ' ').trim();
  t = t.replace(/^ART[ÍI]CULO\s+\d+\.?\s*/i, '').replace(/^[A-ZÁÉÍÓÚÑ ,.\-()]{6,}\.\s*/, '');   // quita el título en mayúsculas
  t = t.replace(/\s*\d*\s*\|?\s*Todos los derechos reservados.*$/i, '').replace(/\s\d+\s*A rtículo.*$/, '').replace(/\s\d+ RECUERDA.*$/, '').replace(/\s*TOMO 1 T1.*$/, '');
  t = t.replace(/\s*El texto supra recoge.*$/, '').replace(/[\u0000-\u0008]\s?/g, '').replace(/­\s?/g, '').replace(/(\w)- (?=[a-záéíóúñ])/g, '$1').replace(/(\d\.\s)([A-ZÁÉÍÓÚ]) (?=[a-záéíóúñ])/g, '$1$2').replace(/\s+([a-h]\))/g, ' $1');
  return t.trim();
}
function html(blk, n) {
  const t = literal(blk, n); if (!t) return null;
  const partes = t.split(/(?<!apartado)\s(?=(?:\d{1,2}\.\s|[a-h]\)\s)(?=[A-ZÁÉÍÓÚa-z0-9]))/).map(s => s.trim()).filter(Boolean);
  return partes.map(p => { const m = p.match(/^(\d{1,2}\.|[a-h]\))\s+(.*)$/); return m ? `<p><b>${m[1]}</b> ${esc(m[2])}</p>` : `<p>${esc(p)}</p>`; }).join('');
}
const F = path.join(RAIZ, 'esquemas.html'); let s = fs.readFileSync(F, 'utf8');
const nombres = txt => { const x = txt.split('—')[0]; const o = []; for (const m of x.matchAll(/(\d{1,3})(?:\s*a\s*(\d{1,3}))?/g)) { const a = +m[1], b = m[2] ? +m[2] : a; if (b >= a && b - a < 60) o.push(a); } return o; };
// ficha: orden de las fichas de T1 en conjunto (para realinear anclas): lista de cabeceras antes/después
const fichasT1 = src => { const a = src.indexOf('const T1 = {};'), b = src.indexOf('/* T1_RECUERDA'); return [...src.slice(a, b).matchAll(/^  \+ articuloResp\("((?:[^"\\]|\\.)*)"/gm)].map(m => m[1]); };
const antes = fichasT1(s); let n = 0;
for (const [blk, lista] of Object.entries(SPEC)) for (const [num, titulo] of lista) {
  const ini = s.indexOf('/* ' + blk + ' */'); if (ini < 0) throw new Error('sin ' + blk);
  const sig = s.indexOf('\n/* T1_', ini + 5); const fin = sig < 0 ? s.length : sig;
  const seg = s.slice(ini, fin); const cab = `Artículo ${num} — ${titulo}`;
  if (nombres(cab).some(() => false)) continue;
  if (new RegExp('^  \\+ articuloResp\\("Art[íi]culos?[^"]*\\b' + num + '\\b', 'm').test(seg) && [...seg.matchAll(/^  \+ articuloResp\("(Art[íi]culos?[^"]*)"/gm)].some(m => nombres(m[1].replace(/^Art[íi]culos?\s*/, '')).includes(num))) continue;   // ya hay ficha
  const h = html(blk, num); if (!h) { console.log('NO está:', blk, num); continue; }
  const linea = `  + articuloResp(${JSON.stringify(cab)}, [], ${JSON.stringify(h)}, false)`;
  const lineas = seg.split('\n'); let pos = -1;
  for (let k = 1; k < lineas.length; k++) { const m = lineas[k].match(/^  \+ articuloResp\("(Art[íi]culos?[^"]*)"/); if (m && nombres(m[1].replace(/^Art[íi]culos?\s*/, ''))[0] > num) { pos = k; break; } }
  if (pos < 0) { // al final del bloque: la última línea «  + …» lleva el «;»
    let u = lineas.length - 1; while (u > 0 && !/^  \+ /.test(lineas[u])) u--;
    // el bloque puede acabar en línea sin '+' (blanco): insertar tras la última línea con contenido
    lineas[u] = lineas[u].replace(/;\s*$/, ''); lineas.splice(u + 1, 0, linea + ';'); }
  else lineas.splice(pos, 0, linea);
  s = s.slice(0, ini) + lineas.join('\n') + s.slice(fin); n++;
}
console.log('fichas nuevas:', n);
if (n && !DRY) {
  fs.writeFileSync(F, s);
  const despues = fichasT1(s);
  const FJ = path.join(__dirname, 'mapa-fijo-t1.json'); const J = JSON.parse(fs.readFileSync(FJ, 'utf8')); let r = 0;
  for (const [q, kj] of Object.entries(J)) { const [k, ...resto] = kj.split('-'); const cab = antes[+k]; if (cab === undefined) continue; const occ = antes.slice(0, +k).filter(x => x === cab).length; let nk = -1, c = 0; despues.forEach((x, i) => { if (x === cab) { if (c === occ) nk = i; c++; } }); if (nk >= 0 && nk !== +k) { J[q] = [nk, ...resto].join('-'); r++; } }
  fs.writeFileSync(FJ, JSON.stringify(J, null, 1)); console.log('anclas realineadas:', r);
}
