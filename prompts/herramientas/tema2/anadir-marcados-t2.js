// Añade al esquema del Tema 2 los apartados que el usuario marcó en su temario (EX / EXOF / asterisco) y que no estaban:
// texto LITERAL del temario (prompts/temario-limpio/tema2/temario.txt), pintado con los colores reales de su PDF escaneado
// (aplicar-subrayado-pdf.js sobre un html temporal) y con data-ex en cada párrafo. Marca además data-ex en tres párrafos que
// ya estaban (DA 3.ª.1, art. 20.2 del Convenio y art. 46.1). Idempotente.
// Uso: node prompts/herramientas/tema2/anadir-marcados-t2.js <subrayado-t2.json>   (json: py prompts/herramientas/subrayado-pdf.py <pdf> <json>)
const fs = require('fs'), path = require('path'), cp = require('child_process');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html');
const SUB = process.argv[2]; if (!SUB) throw new Error('falta el json del subrayado');
const T = fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', 'tema2', 'temario.txt'), 'utf8')
  .replace(/\r\n?/g, '\n').replace(/[\u0007\u0000]/g, '').replace(/[ -​ ]/g, ' ');
// texto literal entre dos frases (ambas incluidas), limpio de cabeceras de página, guiones de fin de línea y letras partidas del OCR
function lit(desde, hasta) {
  const rx = (t, g) => new RegExp(t.trim().split(/\s+/).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('[\\s\\u00a0]+'), g);
  const mi = rx(desde).exec(T); if (!mi) throw new Error('no está: ' + desde);
  const r2 = rx(hasta, 'g'); r2.lastIndex = mi.index; const mj = r2.exec(T); if (!mj) throw new Error('no está: ' + hasta);
  return T.slice(mi.index, mj.index + mj[0].length).split('\n').filter(l => !/derechos reservados|^TEMARIO DE|^TOMO 1|^T2 TERRORISMO|^A OFICIAL$|^\d{6}$|^\s*$/.test(l.trim()) || !l.trim() && false).join('\n')
    .replace(/-\n(?=[a-zñáéíóú])/g, '').replace(/\s*\n\s*/g, ' ')
    .replace(/(^|[\s(«])([B-DF-NP-TV-XZÁÉÍÓÚÑ]) (?=[a-záéíóúñ])/g, '$1$2').replace(/(^|[\s(«])E (?=[a-záéíóúñ])/g, '$1E').replace(/\bA (?=demás|simismo|demas)/g, 'A')
    .replace(/\s{2,}/g, ' ').trim();
}
// párrafo: «1. texto» → <b>1.</b> texto · letras a) b) … en negrita
const par = t => '<p>' + t.replace(/^(\d+\.)\s*/, '<b>$1</b> ').replace(/(^|\s)([a-zñ]\))\s+/g, '$1<b>$2</b> ') + '</p>';
const N = [
  { m: 'T2N_L19', antes: ';\n/* T2_VARSOVIA */', cab: 'Disposición adicional primera — Modificación de la Ley 19/1993 (declaración de medios de pago)', ps: [
    ['EX', lit('b)  M ovimientos por territorio nacional de medios de pago', 'por importe superior a 80.500 euros.')]] },
  { m: 'T2N_L10', antes: '  + articuloResp("Artículos 7, 9 y 11', cab: 'Artículo 4 bis — Información de titularidad real de personas jurídicas', ps: [
    ['*', lit('1. Sin perjuicio de las obligaciones que les fueran exigibles por su normativa reguladora, las sociedades', 'en los términos establecidos reglamentariamente.')],
    ['EX', lit('3. L a información actualizada sobre la titularidad real será mantenida por:', 'd)  E l órgano de representación de la asociación y el secretario.')]] },
  { m: 'T2N_L10', antes: '  + bloqueTitulo("CAPÍTULOS V y VI', cab: 'Artículo 31 — Sucursales y filiales en terceros países', ps: [
    ['*', lit('2. C uando el derecho del tercer país no permita la aplicación de medidas equivalentes', 'en el plazo máximo de siete días después de identificar al tercer país')]] },
  { m: 'T2N_L10', antes: '  + bloqueTitulo("CAPÍTULOS V y VI', cab: 'Artículo 32 ter — Sistemas comunes de información', ps: [
    ['', lit('1. L os sujetos obligados pertenecientes a una misma categoría', 'regulada en el artículo 6.')],
    ['*', lit('Los sujetos obligados corresponsables deberán comunicar', 'obligaciones de notificación a que estén sujetas.')]] },
  { m: 'T2N_L10', antes: '  + articuloResp("Artículo 49 —', cab: 'Artículo 48 bis — Cooperación internacional (suspensión de transacciones)', ps: [
    ['*', lit('6. A requerimiento de la Unidad de Inteligencia Financiera de otro Estado miembro', 'a solicitud del Ministerio Fiscal.')]] },
  { m: 'T2N_L10', antes: '  + articuloResp("Artículos 60 y 61', cab: 'Artículo 59 — Graduación de las sanciones', ps: [
    ['EXOF', lit('1. L as sanciones se graduarán atendiendo a las siguientes circunstancias:', 'que el cumplimiento de las normas infringidas.').replace(/ LAS SANCIONES SE GRADUARÁN ATENDIENDO A:/, '')]] },
  { m: 'T2N_L10', antes: ';\n/* T2_PALERMO */', cab: 'Disposiciones adicionales cuarta, quinta y sexta — Acceso al Registro de Titularidades Reales y plazos', ps: [
    ['*', 'DA 4.ª ' + lit('1. C orresponderá al Ministerio de Justicia garantizar y controlar el acceso', 'reglamentariamente se determinen.')],
    ['*', lit('La persona titular de la Dirección General de Seguridad Jurídica y Fe Pública será la encargada del Registro.', 'cuyas resoluciones pondrán fin a la vía administrativa.').replace('en alzada ante en alzada ante', 'en alzada ante')],
    ['*', 'DA 5.ª ' + lit('En el plazo máximo de doce meses desde la entrada en vigor de esta ley', 'que se encuentren activas a la fecha que se indique.')],
    ['*', 'DA 6.ª ' + lit('En el plazo de seis meses, el Gobierno, a propuesta del Ministro de Justicia', 'Registro de Titularidades Reales, registro central y único en todo el territorio nacional')]] },
  { m: 'T2N_PAL', antes: '  + articuloResp("Artículos 31, 35 y 37', cab: 'Artículos 29 y 32 — Capacitación y asistencia técnica y Conferencia de las Partes', ps: [
    ['EX', 'Art. 29. ' + lit('1. C ada Estado Parte, en la medida necesaria, formulará, desarrollará o perfeccionará programas de capa', 'Esos programas podrán incluir adscripciones e intercambios de personal.')],
    ['EX', 'Art. 32. ' + lit('2. El Secretario General de las Naciones Unidas convocará la Conferencia de las Partes a más tardar un', 'después de la entrada en vigor de la presente Convención.')]] },
  { m: 'T2N_ARM', antes: '  + articuloResp("Artículos 16 a 18', cab: 'Artículo 14 — Capacitación y asistencia técnica', ps: [
    ['*', lit('Los Estados Parte cooperarán entre sí y con las organizaciones internacionales pertinentes, según proceda, a fin de que', 'municiones')]] },
  // apartados de las fichas RECUERDA que no estaban en el articulado (pauta 15/10/2026: la R va en su artículo, no al final);
  // tercer elemento = data-r (la app y el Exprés ponen el sello «R n»)
  { m: 'T2N_L10', antes: '  + articuloResp("Artículo 43 —', cab: 'Artículo 42 — Sanciones y contramedidas financieras internacionales', ps: [
    ['', lit('2. S in perjuicio del efecto directo de los reglamentos comunitarios', 'armas de destrucción masiva.'), 'R16']] },
  { m: 'T2N_L10', antes: '  + articuloResp("Artículos 50 y 51', cab: 'Artículo 49 — Deber de secreto (testimonio de los órganos judiciales)', ps: [
    ['', lit('3. L os órganos judiciales, de oficio o a instancia del Ministerio Fiscal, remitirán testimonio a la Secretaría', 'que no sean constitutivos de delito.'), 'R18']] },
  { m: 'T2N_L10', antes: '  + articuloResp("Artículos 62 y 63', cab: 'Artículo 61 — Ejecución de las resoluciones sancionadoras', ps: [
    ['', lit('5. L a ejecución de las resoluciones sancionadoras firmes', 'corresponderá a la Secretaría de la Comisión.'), 'R22']] },
  { m: 'T2N_PAL', antes: '  + articuloResp("Artículos 8, 10 y 11', cab: 'Artículo 7 — Medidas para combatir el blanqueo de dinero (cooperación)', ps: [
    ['', lit('4. Los Estados Parte se esforzarán por establecer y promover la cooperación a escala mundial', 'a fin de combatir el blanqueo de dinero.'), 'R24']] },
  { m: 'T2N_PAL', antes: '  + articuloResp("Artículo 18 — Asistencia', cab: 'Artículo 17 — Traslado de personas condenadas a cumplir una pena', ps: [
    ['', lit('Los Estados Parte podrán considerar la posibilidad de celebrar acuerdos o arreglos bilaterales o multilaterales sobre el traslado', 'a fin de que complete allí su condena.'), 'R25']] },
  { m: 'T2N_PAL', antes: '  + articuloResp("Artículos 36, 38', cab: 'Artículos 31 y 33 — Prevención (evaluación de instrumentos) y Secretaría', ps: [
    ['*', 'Art. 31. ' + lit('4. Los Estados Parte procurarán evaluar periódicamente los instrumentos', 'utilizados indebidamente por grupos delictivos organizados.'), 'R28'],
    ['', 'Art. 33. ' + lit('1. El Secretario General de las Naciones Unidas prestará los servicios de secretaría', 'ferencia de las Partes en la Convención.'), 'R29']] },
  { m: 'T2N_TRA', antes: ';\n/* T2_MIGRANTES */', cab: 'Artículo 20 — Depositario e idiomas', ps: [
    ['', lit('2. El original del presente Protocolo, cuyos textos en árabe', 'se depositará en poder del Secretario General de las Naciones Unidas.'), 'R35']] },
  { m: 'T2N_ARM', antes: '  + articuloResp("Artículos 10 y 11 — Licencias', cab: 'Artículo 10 — Requisitos generales para sistemas de licencias o autorizaciones', ps: [
    ['', lit('1. Cada Estado Parte establecerá o mantendrá un sistema eficaz de licencias', 'sus piezas y componentes y municiones.'), 'R38']] },
];
const esc = s => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
let s = fs.readFileSync(F, 'utf8');
const A = s.indexOf('/* T2_LEY19 */'), B = s.indexOf('/* T2_REC */');
const pend = N.filter(x => !s.slice(A, B).includes(`articuloResp("${esc(x.cab)}"`));
if (pend.length) {
  // 1) pintar con el subrayado del usuario
  const dir = path.join(process.env.TEMP || '/tmp', 't2n'); fs.mkdirSync(dir, { recursive: true }); const tmpF = path.join(dir, 'nuevos.html');
  let tmp = '', cur = '';
  pend.forEach(x => { if (x.m !== cur) { tmp += (cur ? ';\n' : '') + `/* ${x.m} */ X = `; cur = x.m; } else tmp += '\n + ';
    tmp += `articuloResp("${esc(x.cab)}", [], "${esc(x.ps.map(([, t]) => par(t)).join(''))}", false)`; });
  tmp += ';\n/* T2N_FIN */\n'; fs.writeFileSync(tmpF, tmp);
  cp.execSync(`node "${path.join(__dirname, '..', 'aplicar-subrayado-pdf.js')}" "${SUB}" "${tmpF}" "/* ${pend[0].m} */" "/* T2N_FIN */" "T2N_L19:15-20,T2N_L10:41-124,T2N_PAL:125-164,T2N_TRA:165-176,T2N_ARM:191-202"`, { stdio: 'inherit', env: { ...process.env, UMBRAL: '0.15' } });
  const pintado = fs.readFileSync(tmpF, 'utf8');
  const fichas = {}; for (const m of pintado.matchAll(/articuloResp\("((?:[^"\\\n]|\\.)*)", \[\], "((?:[^"\\\n]|\\.)*)", false\)/g)) fichas[new Function('return "' + m[1] + '"')()] = m[2];
  // 2) insertar con data-ex en cada párrafo
  for (const x of pend) {
    let h = fichas[x.cab]; if (!h) throw new Error('sin ficha pintada: ' + x.cab);
    let n = 0; h = h.replace(/<p>/g, () => { const [t, , r] = x.ps[n++]; return '<p' + (t ? ` data-ex=\\"${t}\\"` : '') + (r ? ` data-r=\\"${r}\\"` : '') + '>'; });
    const ficha = `  + articuloResp("${esc(x.cab)}", [], "${h}", false)\n`;
    const a = s.indexOf('/* T2_LEY19 */'), b = s.indexOf('/* T2_REC */'); const i = s.indexOf(x.antes, a);
    if (i < 0 || i > b) throw new Error('no encuentro dónde insertar ' + x.cab);
    s = x.antes.startsWith(';') ? s.slice(0, i) + '\n' + ficha.replace(/\n$/, '') + s.slice(i) : s.slice(0, i) + ficha + s.slice(i);
    console.log('+', x.cab);
  }
}
// 3) marcas en párrafos que ya estaban
const YA = [['Mediante real decreto se creará en el Ministerio de Justicia el Registro de Titularidades Reales', '*'], ['se reservan el derecho de no aplicar', '*'], ['no tendrán valor probatorio', '*']];
for (const [frase, t] of YA) {
  const a = s.indexOf('/* T2_LEY19 */'), b = s.indexOf('/* T2_REC */'); const seg = s.slice(a, b);
  const plain = seg.replace(/<[^>]+>/g, ''); if (!plain.includes(frase)) { console.log('no está:', frase); continue; }
  // localiza el <p…> que contiene la frase (permitiendo etiquetas entre palabras)
  const re = new RegExp(frase.split(' ').map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('(?:\\s|<[^>]+>)+'));
  const m = re.exec(seg); if (!m) { console.log('no localizo:', frase); continue; }
  const pi = seg.lastIndexOf('<p', m.index); const pf = seg.indexOf('>', pi); const tag = seg.slice(pi, pf);
  if (/data-ex/.test(tag)) continue;
  s = s.slice(0, a + pf) + ` data-ex=\\"${t}\\"` + s.slice(a + pf); console.log('marca', t, '→', frase.slice(0, 40));
}
fs.writeFileSync(F, s);
