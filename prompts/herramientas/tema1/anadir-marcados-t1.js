// Añade al esquema del Tema 1 los apartados que el usuario marcó en su temario (EXOF / EXAMEN / EX / asterisco) y cuyo artículo no estaba:
// texto LITERAL (prompts/temario-limpio/tema1/temario.txt = OCR del temario; la Memoria del Protocolo 12 no tiene capa de texto y se transcribió de la imagen),
// pintado con los colores reales del PDF escaneado (aplicar-subrayado-pdf.js) y con data-ex / data-r en cada párrafo. Idempotente.
// Uso: node prompts/herramientas/tema1/anadir-marcados-t1.js <subrayado-t1.json> [--dry]   (json: py prompts/herramientas/subrayado-pdf.py <pdf> <json>)
const fs = require('fs'), path = require('path'), cp = require('child_process');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html');
const SUB = process.argv.find(a => a.endsWith('.json')); const DRY = process.argv.includes('--dry');
if (!SUB) throw new Error('falta el json del subrayado');
const L = fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', 'tema1', 'temario.txt'), 'utf8').replace(/\r\n?/g, '\n').replace(/[\u0007\u0000]/g, '').replace(/[​ ]/g, ' ').replace(/­/g, '').split('\n');
const RANGO = { ER: [1872, 2772], LO: [39, 338], CARTA: [341, 731], COE: [734, 1066], CEDH: [1069, 1818], ACU: [2775, 3300] };
const PIE = /derechos reservados|^TEMARIO DE|^TOMO 1|^T1 DERECHOS|^A OFICIAL$|^ASCENSO$|^\d+ \|/i;
const arregla = t => t.replace(/-\s+(?=[a-zñáéíóú])/g, '').replace(/(^|[\s(«])([B-DF-NP-TV-XZÁÉÍÓÚÑ]) (?=[a-záéíóúñ])/g, '$1$2').replace(/(^|[\s(«])E (?=[a-záéíóúñ])/g, '$1E').replace(/\bA (?=demás|simismo)/g, 'A')
  .replace(/\s{2,}/g, ' ').replace(/\s+([,.;:])/g, '$1').trim();
// líneas del artículo cuyo encabezado casa con headRe, dentro de la norma, hasta el siguiente ARTÍCULO/CAPÍTULO/DISPOSICIÓN
function articulo(norma, headRe) {
  const [a, b] = RANGO[norma]; let i = -1;
  for (let n = a - 1; n < b; n++) if (headRe.test(L[n])) { i = n; break; }
  if (i < 0) throw new Error('sin encabezado: ' + norma + ' ' + headRe);
  const out = [L[i]]; for (let n = i + 1; n < b; n++) { if (/^(ARTÍCULO|CAPÍTULO|DISPOSICIÓN|PROTOCOLO)\b/.test(L[n])) break; if (PIE.test(L[n].trim()) || !L[n].trim()) continue; out.push(L[n]); }
  return out;
}
// unidades (apartados) del artículo: una unidad empieza en «1.», «a)», «R28 …»; el resto son continuación
function unidades(lineas) {
  const U = []; let titulo = true;
  lineas.forEach((l, k) => { let t = l.trim();
    if (k === 0) { t = t.replace(/^ARTÍCULO\s+[\dA-Z ]+?\.\s*/, '');   // quita «ARTÍCULO 57.»
      const m = t.match(/^((?:[A-ZÁÉÍÓÚÑ0-9 ,;()\-–]+\.)\s+)(.*)$/); t = m ? m[2] : (/^[A-ZÁÉÍÓÚÑ ,;()\-–.]+$/.test(t) ? '' : t); if (!t) return; }
    else if (titulo && /^[A-ZÁÉÍÓÚÑ ,;()\-–.]+$/.test(t) && t.length > 8) return;   // 2.ª línea del título
    else if (titulo && /^\(.*\)$/.test(t)) return;
    else if (titulo && !U.length) t = t.replace(/^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ0-9 ,;()\-–]{3,}\.\s+(?=[A-ZÁÉÍÓÚ«])/, '');   // «EN LA EMPRESA. Deberá…»: la 2.ª línea del título trae ya el texto
    if (!t) return;
    t = t.replace(/Estados16 /g, 'Estados ');   // llamada de nota del OCR
    titulo = false;
    if (/^(R\d+\s+)?(\d+\.|[a-z]\))\s/.test(t) || !U.length) U.push(t); else U[U.length - 1] += ' ' + t; });
  // varias de las unidades pueden venir en una sola línea del OCR («… 3. L as respuestas… 4. Sin perjuicio…», «b) … c) …»): se parten por numeración correlativa
  const out = [];
  const parte = t => { const m = t.match(/^(?:R[0-9]+\s+)?(?:(\d+)\.|([a-z])\))/); if (!m) return out.push(t);
    const sig = m[1] ? new RegExp('\\s(' + (+m[1] + 1) + '\\.)\\s+[A-ZÁÉÍÓÚ]') : new RegExp('\\s(' + String.fromCharCode(m[2].charCodeAt(0) + 1) + '\\))\\s+[A-ZÁÉÍÓÚ]');
    const k = t.search(sig); if (k < 0) return out.push(t); out.push(t.slice(0, k)); parte(t.slice(k + 1)); };
  U.forEach(parte);
  return out.map(arregla);
}
const ap = (u, re) => { const r = u.filter(x => re.test(x.replace(/^R[0-9]+[ ]+/, ''))); if (r.length !== 1) throw new Error('apartado ' + re + ' → ' + r.length); return r[0]; };
const sinR = t => t.replace(/^R\d+\s+/, '');
// artículo n de la norma: lo elegido por regex de inicio de cada apartado
const A = (norma, head, sels) => { const u = unidades(articulo(norma, head)); return sels.map(([re, tipo, r]) => [tipo, sinR(ap(u, re)), r]); };
const prefijo = (n, ps) => { ps[0][1] = `Art. ${n}. ` + ps[0][1]; return ps; };
const MEM1 = 'I. El Protocolo n.º 12 al Convenio para la protección de los Derechos Humanos y de las Libertades Fundamentales ha sido elaborado en el Consejo de Europa por el Comité Director de Derechos Humanos (CDDH). Quedó abierto a la firma de los Estados miembros del Consejo de Europa el 4 de noviembre de 2000.';
const MEM18 = '18. El Tribunal Europeo de Derechos Humanos ha interpretado de manera constante la noción de discriminación en su jurisprudencia relativa al artículo 14 del Convenio. Esta jurisprudencia ha destacado claramente, en particular, que no todas las distinciones o diferencias de tratamiento equivalen a una discriminación. Como ha indicado el Tribunal, por ejemplo, en la sentencia relativa al asunto Abdulaziz, Cabales y Balkandali c/ el Reino Unido, «una distinción es discriminatoria si \'carece de justificación objetiva y razonable\', es decir, si no persigue un \'objetivo legítimo\' o si no existe \'relación razonable de proporcionalidad entre\' los medios empleados y el objetivo perseguido» (sentencia de 28 de mayo de 1985, Serie A, n.º 94, apartado 72). El significado de la palabra «discriminación» en el artículo 1 es idéntica a la que se da en el contexto del artículo 14 del Convenio. La formulación francesa de este artículo 1 («sans discrimination aucune», sin discriminación alguna) difiere ligeramente de la del artículo 14 («sans distinction aucune»), pero no implica un significado diferente; por el contrario, se trata de una adecuación terminológica para ilustrar mejor el concepto de discriminación en el sentido del artículo 14, alineando el texto francés con el texto inglés (véase, sobre este preciso punto, la sentencia de 23 de julio de 1968 en el asunto «lingüística belga», Serie A, n.º 6, apartado 10).';
const U1 = /^1\./, TODO = /./;
const N = [   // m = marcador de norma (para el subrayado), antes = ficha ante la que se inserta
  { m: 'T1N_ER', antes: 'Artículos 16 y 17', cab: 'Artículo 15 ter — Crimen de agresión: ejercicio de la competencia (remisión por el Consejo de Seguridad)', ps: prefijo('15 ter', A('ER', /^ARTÍCULO 15 TER/, [[/^2\./, '*']])) },
  { m: 'T1N_ER', antes: 'Artículos 58 y 59', cab: 'Artículo 56 — Medidas de la Sala de Cuestiones Preliminares ante una oportunidad única de investigar', ps: prefijo('56', [...A('ER', /^ARTÍCULO 56\. DISPOSICIONES/, [[/^b\)\s*La Sala, a petición/, '*'], [/^a\)\s*La Sala de Cuestiones Preliminares, cuando considere/, '*']])]) },
  { m: 'T1N_ER', antes: 'Artículos 100, 101 y 102', cab: 'Artículo 94 — Aplazamiento de la ejecución de una solicitud de asistencia (investigación o enjuiciamiento en curso)', ps: prefijo('94', A('ER', /^ARTÍCULO 94\./, [[U1, '*', 'R28']])) },
  { m: 'T1N_ER', antes: 'Artículos 100, 101 y 102', cab: 'Artículos 98 y 99 — Renuncia a la inmunidad y cumplimiento de las solicitudes de asistencia', ps: [...prefijo('98', A('ER', /^ARTÍCULO 98\./, [[U1, '*']])), ...prefijo('99', A('ER', /^ARTÍCULO 99\./, [[U1, '*'], [/^4\./, '*']]))] },
  { m: 'T1N_CARTA', antes: 'Artículo 28 —', cab: 'Artículo 27 — Derecho a la información y consulta de los trabajadores en la empresa', ps: prefijo('27', A('CARTA', /^ARTÍCULO 27\. DERECHO A LA INFORMACIÓN/, [[TODO, '*']])) },
  { m: 'T1N_CARTA', antes: 'Artículos 39, 41 y 42', cab: 'Artículo 35 — Protección de la salud', ps: prefijo('35', A('CARTA', /^ARTÍCULO 35\. PROTECCIÓN DE LA SALUD/, [[TODO, 'EXOF']])) },
  { m: 'T1N_CARTA', antes: 'Artículos 39, 41 y 42', cab: 'Artículo 40 — Derecho de sufragio activo y pasivo en las elecciones municipales', ps: prefijo('40', A('CARTA', /^ARTÍCULO 40\. DERECHO DE SUFRAGIO/, [[TODO, 'EX']])) },
  { m: 'T1N_COE', antes: 'Artículo 1 — Finalidad', cab: 'Preámbulo del Estatuto del Consejo de Europa', ps: [['EX', arregla(L[739].replace(/^ESTATUTO DEL CONSEJO DE EUROPA\s*/, '')) || arregla(L[740])]] },
  { m: 'T1N_COE', antes: 'Artículos 26 y 28', cab: 'Artículo 23 — Competencias de la Asamblea Consultiva', ps: prefijo('23', A('COE', /^ARTÍCULO 23\s*$/, [[/^a\)/, '*']])) },
  { m: 'T1N_COE', antes: 'Artículos 38 y 39', cab: 'Artículo 36 — La Secretaría (nota: el Secretario General responde ante el Comité de Ministros)', ps: [['EX', arregla(L[1008].replace(/^\d+\s*R\s*ECUERDA:\s*/, 'RECUERDA: ').replace(/Todos los derechos reservados.*$/, ''))]] },
  { m: 'T1N_CEDH', antes: 'Artículo 11 — Libertad de reunión', cab: 'Artículo 10 — Libertad de expresión', ps: prefijo('10', A('CEDH', /^ARTÍCULO 10\. LIBERTAD DE EXPRESIÓN/, [[U1, '*']])) },
  { m: 'T1N_CEDH', antes: 'Artículo 7 — No hay pena', cab: 'Artículo 13 — Derecho a un recurso efectivo', ps: prefijo('13', A('CEDH', /^ARTÍCULO 13\. DERECHO A UN RECURSO/, [[TODO, 'EX']])) },
  { m: 'T1N_CEDH', antes: 'Artículo 31 — Atribuciones', cab: 'Artículos 29 y 30 — Resoluciones de las Salas e inhibición en favor de la Gran Sala', ps: [...prefijo('29', A('CEDH', /^ARTÍCULO 29\. RESOLUCIONES/, [[/^2\./, '*']])), ...prefijo('30', A('CEDH', /^ARTÍCULO 30\. INHIBICIÓN/, [[TODO, '*']]))] },
  { m: 'T1N_CEDH', antes: 'Artículos 43, 45 y 46', cab: 'Artículo 41 — Arreglo equitativo', ps: prefijo('41', A('CEDH', /^ARTÍCULO 41\. ARREGLO/, [[TODO, 'EX']])) },
  { m: 'T1N_CEDH', antes: 'Artículos 56, 58 y 59', cab: 'Artículos 55 y 57 — Renuncia a otros modos de solución de controversias y reservas', ps: [...prefijo('55', A('CEDH', /^ARTÍCULO 55\. RENUNCIA/, [[TODO, '*']])), ...prefijo('57', A('CEDH', /^ARTÍCULO 57\. RESERVAS/, [[U1, '*']]))] },
  { m: 'T1N_CEDH', antes: 'Protocolo n.º 13', cab: 'Protocolo n.º 12 (Roma, 4-11-2000) — Memoria explicativa', ps: [['*', MEM1], ['*', MEM18]] },
  { m: 'T1N_ACU', antes: 'Artículos 8 y 10', cab: 'Artículo 3 — Disposiciones generales acerca de los privilegios e inmunidades de la Corte', ps: prefijo('3', A('ACU', /^ARTÍCULO 3\. DISPOSICIONES GENERALES/, [[TODO, '*']])) },
  { m: 'T1N_ACU', antes: 'Artículo 17 — Personal contratado', cab: 'Artículo 16 — Secretario Adjunto, personal de la Fiscalía y personal de la Secretaría', ps: prefijo('16', A('ACU', /^ARTÍCULO 16\. SECRETARIO ADJUNTO/, [[/^2\./, '*']])) },
  { m: 'T1N_ACU', antes: 'Artículo 24 — Cooperación con las', cab: 'Artículo 23 — Nacionales y residentes permanentes', ps: prefijo('23', A('ACU', /^ARTÍCULO 23\. NACIONALES/, [[/^b\)/, '*']])) },
];
const esc = s => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const par = t => '<p>' + t.replace(/^(Art\. [\d ]+(?:ter)?\.\s*)?(\d+\.|[IV]+\.)\s*/, (m, a, b) => (a ? `<b>${a.trim()}</b> ` : '') + `<b>${b}</b> `).replace(/^(Art\. [\d ]+(?:ter)?\.)\s+(?!<b>)/, '<b>$1</b> ').replace(/(^|\s)([a-zñ]\))\s+/g, '$1<b>$2</b> ') + '</p>';
if (DRY) { N.forEach(x => { console.log('\n== ' + x.cab); x.ps.forEach(([t, h, r]) => console.log(`  [${t}${r ? ' ' + r : ''}] ${h.slice(0, 230)}${h.length > 230 ? ' …(' + h.length + ')' : ''}`)); }); process.exit(0); }
let s = fs.readFileSync(F, 'utf8');
const T1 = ['LO', 'CARTA', 'COE', 'CEDH', 'ROMA', 'ACUERDO'];
const a0 = Math.min(...T1.map(n => s.indexOf('/* T1_' + n + ' */'))), b0 = s.indexOf('/* T2_LEY19 */');
const pend = N.filter(x => !s.slice(a0, b0).includes(`articuloResp("${esc(x.cab)}"`));
console.log('pendientes:', pend.length);
if (pend.length) {
  const dir = path.join(process.env.TEMP || '/tmp', 't1n'); fs.mkdirSync(dir, { recursive: true }); const tmpF = path.join(dir, 'nuevos.html');
  const norm = ['T1N_ER', 'T1N_CARTA', 'T1N_COE', 'T1N_CEDH', 'T1N_ACU'];
  let tmp = '/* T1N_INI */ X = ""\n';
  norm.forEach(nm => { const g = pend.filter(x => x.m === nm); if (!g.length) return; tmp += `/* ${nm} */ X = ` + g.map(x => `articuloResp("${esc(x.cab)}", [], "${esc(x.ps.map(([, t]) => par(t)).join(''))}", false)`).join('\n + ') + ';\n'; });
  tmp += '/* T1N_FIN */\n'; fs.writeFileSync(tmpF, tmp);
  cp.execSync(`node "${path.join(__dirname, '..', 'aplicar-subrayado-pdf.js')}" "${SUB}" "${tmpF}" "/* T1N_INI */" "/* T1N_FIN */" "T1N_ER:3-36,T1N_LO:37-50,T1N_CARTA:51-64,T1N_COE:65-76,T1N_CEDH:77-120,T1N_ACU:121-134"`, { stdio: 'inherit', env: { ...process.env, UMBRAL: '0.15' } });
  const pintado = fs.readFileSync(tmpF, 'utf8');
  const fichas = {}; for (const m of pintado.matchAll(/articuloResp\("((?:[^"\\\n]|\\.)*)", \[\], "((?:[^"\\\n]|\\.)*)", false\)/g)) fichas[new Function('return "' + m[1] + '"')()] = m[2];
  for (const x of pend) {
    let h = fichas[x.cab]; if (!h) throw new Error('sin ficha pintada: ' + x.cab);
    let n = 0; h = h.replace(/<p>/g, () => { const [t, , r] = x.ps[n++]; return '<p' + (t ? ` data-ex=\\"${t}\\"` : '') + (r ? ` data-r=\\"${r}\\"` : '') + '>'; });
    const ficha = `  + articuloResp("${esc(x.cab)}", [], "${h}", false)\n`;
    const aa = Math.min(...T1.map(n => s.indexOf('/* T1_' + n + ' */'))), bb = s.indexOf('/* T2_LEY19 */');
    const i = s.indexOf(`  + articuloResp("${x.antes}`, aa);
    if (i < 0 || i > bb) throw new Error('no encuentro dónde insertar ' + x.cab + ' (antes de ' + x.antes + ')');
    s = s.slice(0, i) + ficha + s.slice(i); console.log('+', x.cab);
  }
}
fs.writeFileSync(F, s);
