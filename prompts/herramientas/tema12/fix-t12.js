// Tema 12 · auditoría de las preguntas OFICIALES (12-N) contra el temario oficial (Ley 50/1997 consolidada a 03/01/2025, ley50.txt).
// 21/10/2026: auditoria-oficiales.js 12 (35 avisos, revisados a mano) + repaso a mano de las 166. Corrige opciones alteradas
// («INCORRECTA» con dos falsas), enunciados sin hueco, opciones ilegibles, restos de notas al pie («pue2dan», «Cons2ejo»…) y pone a
// TODAS la corrección en formato oficial: respuesta → artículo en morado (etiqueta calculada del texto) → cita LITERAL en rojo.
// Las que ya traían una cita literal verificada y no se tocan conservan su explicación.
// Uso: node prompts/herramientas/tema12/fix-t12.js [--dry]       (idempotente)
const fs = require('fs'), path = require('path');
const C = require('./cita-lib-t12.js');
const RAIZ = path.join(__dirname, '..', '..', '..'), FILE = path.join(RAIZ, 'test-oficial-conocimiento.html');
const BS = String.fromCharCode(92), L = 'ABCD', DRY = process.argv.includes('--dry');
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');
const TODO = nz(C.TODO);
const O = (q, k, t) => { q.opciones[k] = t; };

// ---------- 1. correcciones de contenido (revisadas una a una contra ley50.txt) ----------
const FIX = {
  '12-4': q => O(q, 3, 'A un Vicepresidente del Gobierno o, en su defecto, al Ministro de la Presidencia.'),
  '12-6': q => O(q, 0, 'Examinar las cuestiones de carácter general que tengan relación con varios de los Departamentos Ministeriales que integren la Comisión.'),
  '12-13': q => { q.pregunta = 'Ley 50/1997, de 27 de noviembre, del Gobierno. Disposiciones de entrada en vigor. Sin perjuicio de lo establecido en el artículo 2.1 del Código Civil, las disposiciones de entrada en vigor de __________, cuya aprobación o propuesta corresponda al Gobierno o a sus miembros, y que impongan nuevas obligaciones a las personas físicas o jurídicas que desempeñen una actividad económica o profesional como consecuencia del ejercicio de ésta, preverán el comienzo de su vigencia el 2 de enero o el 1 de julio siguientes a su aprobación:';
    q.opciones = ['Las leyes, los reales decretos-leyes y los reglamentos.', 'Las leyes y los reales decretos-leyes.', 'Las leyes.', 'Las leyes o reglamentos.']; q.correcta = 3;
    return 'Lo previsto en este artículo no se aplica a los reales decretos-leyes.'; },
  '12-22': q => { O(q, 2, 'Las atribuidas por una ley que prohíba expresamente la delegación.'); return 'Las relativas al nombramiento y separación de los altos cargos son indelegables cuando están atribuidas al Consejo de Ministros, no al Presidente del Gobierno.'; },
  '12-25': q => { O(q, 2, 'Al Vicepresidente o Vicepresidentes, cuando existan, les corresponderá el ejercicio de las funciones que les encomiende el Presidente.');
    O(q, 3, 'A las reuniones del Consejo de Ministros podrán asistir los Secretarios de Estado y excepcionalmente otros altos cargos, cuando sean convocados para ello.');
    return 'El Consejo de Ministros aprueba el PROYECTO de Ley de Presupuestos, no la Ley (que aprueban las Cortes). Corregida la opción D, que decía «A los miembros del Consejo de Ministros podrán asistir…» y la hacía también falsa.'; },
  '12-26': q => O(q, 0, 'El Rey, a propuesta del Consejo de Ministros.'),
  '12-33': q => { O(q, 0, 'Análisis sobre la adecuación de la norma propuesta al orden de distribución de competencias.');
    O(q, 1, 'Contenido y análisis jurídico, con referencia al Derecho internacional, que incluirá el listado pormenorizado de las normas que quedarán derogadas.');
    O(q, 2, 'Oportunidad de la propuesta y alternativas de regulación estudiadas, con justificación de la necesidad de la nueva norma frente a la alternativa de no aprobar ninguna regulación.');
    O(q, 3, 'Se identificarán las cargas administrativas que conlleva la propuesta y se cuantificará el coste de su cumplimiento para la Administración y para los obligados a soportarlas.');
    return 'La referencia es al Derecho NACIONAL y de la Unión Europea, no al «Derecho internacional».'; },
  '12-34': q => { q.pregunta = q.pregunta.replace('Procedimiento de elaboración de normas con rango de ley y reglamentos.', 'Del Gobierno en funciones.');
    O(q, 0, 'Facilitar el normal desarrollo del proceso de formación del nuevo Gobierno.'); return 'Presentar proyectos de ley es una de las dos facultades vedadas al Gobierno en funciones.'; },
  '12-47': q => O(q, 3, 'El principio departamental.'),
  '12-55': q => O(q, 0, 'Las atribuidas indirectamente por la Constitución.'),
  '12-89': q => O(q, 0, 'Al Vicepresidente del Gobierno.'),
  '12-93': q => O(q, 0, 'El Consejo de Ministros.'),
  '12-113': q => O(q, 0, 'El Congreso de los Diputados.'),
  '12-135': q => { O(q, 0, 'El Presidente del Gobierno mediante Real Decreto.'); O(q, 1, 'El Consejo de Ministros mediante Real Decreto.'); O(q, 3, 'Las Cortes Generales mediante ley.'); },
  '12-154': q => O(q, 1, 'El Gobierno se compone del Presidente, del Vicepresidente o Vicepresidentes, en su caso, y de los Ministros.'),
  '12-163': q => O(q, 3, 'Todas son correctas.'),
};
// ---------- 2. párrafo que respalda la respuesta cuando la búsqueda automática no acierta ----------
const DONDE = {
  '12-5': 'Ejercer la potestad reglamentaria en las materias propias', '12-10': 'El Director del Secretariado del Gobierno ejercerá la secretaría adjunta',
  '12-13': 'Sin perjuicio de lo establecido en el artículo 2.1', '12-20': 'Las decisiones del Gobierno de la Nación y de sus miembros revisten',
  '12-31': 'Se conservarán en el correspondiente expediente', '12-38': 'El Gobierno se rige, en su organización',
  '12-39': 'De las sesiones del Consejo de Ministros se levantará acta', '12-43': 'Para ser miembro del Gobierno se requiere',
  '12-61': 'Para ser miembro del Gobierno se requiere', '12-150': 'Para ser miembro del Gobierno se requiere',
  '12-47': 'Tres principios configuran', '12-55': 'Las atribuidas directamente por la Constitución',
  '12-60': 'En el informe se incluirán las conclusiones', '12-82': 'El Secretariado del Gobierno, como órgano de apoyo',
  '12-109': 'Asimismo, son delegables a propuesta del Presidente', '12-124': 'La suplencia de los Secretarios de Estado del mismo Departamento',
  '12-130': 'Acuerdos adoptados en Comisiones Delegadas del Gobierno', '12-151': 'Particularmente, los Gabinetes prestan',
  '12-165': 'Los Secretarios de Estado son órganos superiores', '12-34': 'Presentar proyectos de ley al Congreso',
};
// restos de llamadas a notas al pie pegados a las palabras («pue2dan», «Cons2ejo», «organizac8ión», «Gobierno1.», «como 3mínimo»)
const limpia = t => t.replace(/([a-záéíóúñ])\d(?=[a-záéíóúñ])/g, '$1').replace(/(\s)\d(?=[a-záéíóúñ]{3})/g, '$1')
  .replace(/([a-záéíóúñ)])\d(?=[.\s]|$)/g, '$1').replace(/([.:])\d$/, '$1');

// ---------- 3. cita literal + etiqueta ----------
function cita(q) {
  let i;
  if (DONDE[q.id]) { i = C.U.findIndex(u => u.t.includes(DONDE[q.id])); if (i < 0) throw new Error('DONDE no encontrado ' + q.id); }
  else { const st = q.pregunta.replace(/^Ley 50\/1997[^.]*\.( [^.]*del Gobierno\.)?/, ''), c = q.opciones[q.correcta];
    const combo = /^(todas|ninguna|[abc] y [abc])/i.test(c), inc = /incorrect|NO /.test(q.pregunta);
    i = C.mejor(combo ? st + ' ' + q.opciones.filter(o => !/^(todas|ninguna|[abc] y )/i.test(o)).join(' ') : inc ? c : st + ' ' + c); }
  const u = C.U[i]; let t = C.frase(i, q.pregunta + ' ' + q.opciones[q.correcta]);
  // cabecera «…:» → se añaden sus letras (para las de «todas son correctas» y las de enumeraciones)
  if (/:$/.test(u.t)) { const hijos = []; for (let k = i + 1; k < C.U.length && /\)$/.test(C.U[k].lab.split(' de la ')[0]) && hijos.length < 8; k++) hijos.push(C.U[k].lab.split(' de la ')[0].split('.').pop() + ' ' + C.U[k].t); if (hijos.length) t += ' ' + hijos.join(' '); }
  if (t.length > 700) t = t.slice(0, t.lastIndexOf(' ', 690)) + ' […]';
  return { lab: u.lab.replace(/\.(\d+\.º)/, '.$1'), t };
}
const literal = t => t.replace(/ \[…\]$/, '').split(/ (?=[a-z]\) )/).every(p => TODO.includes(nz(p.replace(/^[a-z]\) /, ''))));
const art = lab => (/^art\./.test(lab) ? 'el ' : 'la ') + `<span class="ref-norma">${lab}</span>`;
const ex = (q, ct, nota) => {
  const inc = /incorrect|NO |no le corresponde|no les corresponde|NO cesa|NO dirige|no contendrá/i.test(q.pregunta);
  const auto = inc && !nota ? `La opción ${L[q.correcta]} es la que no se ajusta al texto legal.` : '';
  return `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${q.opciones[q.correcta].replace(/\.$/, '')}</mark></span>${[nota, auto].filter(Boolean).join(' ')}${nota || auto ? ' ' : ''}Según ${art(ct.lab)}: <span class="ref-concepto">"${ct.t}"</span>.`;
};
const yaBien = q => { const m = [...q.explicacion.matchAll(/ref-concepto">([\s\S]*?)<\/span>/g)].map(x => x[1].replace(/<[^>]+>/g, '').replace(/\[\.\.\.\]|\[…\]/g, '|').replace(/["“”«»]/g, ''));
  return m.length && m.every(c => c.split('|').every(p => nz(p).length < 12 || TODO.includes(nz(p)))) && /ref-norma/.test(q.explicacion); };

// ---------- 4. aplicación ----------
let s = fs.readFileSync(FILE, 'utf8'); const re = /\{"id":"12-\d+","pregunta":/g; const pos = [];
for (const m of s.matchAll(re)) pos.push(m.index);
let nFix = 0, nEx = 0, nLimpia = 0; const malas = [], cambios = [];
for (const i of pos.reverse()) {
  let d = 0, inS = false, e = false, j = i;
  for (; j < s.length; j++) { const c = s[j]; if (inS) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (!d) break; } }
  const q = JSON.parse(s.slice(i, j + 1)), antes = JSON.stringify(q);
  const p0 = q.pregunta, o0 = q.opciones.join('|');
  q.pregunta = limpia(q.pregunta); q.opciones = q.opciones.map(limpia);
  if (q.pregunta !== p0 || q.opciones.join('|') !== o0) { nLimpia++; cambios.push(q.id + ': ' + [p0 !== q.pregunta ? 'enunciado' : '', o0 !== q.opciones.join('|') ? 'opciones' : ''].filter(Boolean).join('+')); }
  let nota = null; if (FIX[q.id]) { nota = FIX[q.id](q) || null; nFix++; }
  if (FIX[q.id] || DONDE[q.id] || !yaBien(q)) {
    const ct = cita(q); if (!literal(ct.t)) { malas.push(q.id); continue; }
    q.explicacion = ex(q, ct, nota); nEx++;
  }
  const despues = JSON.stringify(q); if (despues !== antes) s = s.slice(0, i) + despues + s.slice(j + 1);
}
console.log(`oficiales ${pos.length} · contenido corregido ${nFix} · restos de notas al pie ${nLimpia} · explicaciones nuevas ${nEx}`);
if (cambios.length) console.log('limpiadas:', cambios.join(' · '));
if (malas.length) console.log('✗ CITA NO LITERAL (no se aplica):', malas.join(', '));
if (!DRY) fs.writeFileSync(FILE, s);
