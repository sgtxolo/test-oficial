// Tema 1 · preguntas «sin sitio» de clase 1 (pauta del usuario 25/10/2026): el esquema NO tenía el pasaje que contesta la pregunta
// (artículo ausente o apartado sustituido por «(…)»). Se restaura / añade el texto LITERAL del oficial (temario-limpio/tema1/temario.txt),
// pintado con los colores reales del PDF escaneado (aplicar-subrayado-pdf.js), y se realinean los anclajes de mapa-fijo-t1.json (k-j).
// Uso: node prompts/herramientas/tema1/anadir-sinsitio-t1.js <subrayado-t1.json> [--dry]     (idempotente)
const fs = require('fs'), path = require('path'), cp = require('child_process');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), FIJO = path.join(__dirname, 'mapa-fijo-t1.json');
const SUB = process.argv.find(a => a.endsWith('.json')); const DRY = process.argv.includes('--dry');
if (!SUB) throw new Error('falta el json del subrayado');

const b = (t) => `<b>${t}</b>`;
// ---- texto literal (temario-limpio/tema1/temario.txt) ----
const T = {
  carta38: `${b('Art. 38.')} En las políticas de la Unión se garantizará un nivel elevado de protección de los consumidores.`,
  carta41a: ', órganos y organismos de la Unión',
  carta41b: `${b('2.')} Este derecho incluye en particular: a) el derecho de toda persona a ser oída antes de que se tome en contra suya una medida individual que la afecte desfavorablemente; b) el derecho de toda persona a acceder al expediente que le concierna, dentro del respeto de los intereses legítimos de la confidencialidad y del secreto profesional y comercial; c) la obligación que incumbe a la administración de motivar sus decisiones. ${b('3.')} Toda persona tiene derecho a la reparación por la Unión de los daños causados por sus instituciones o sus agentes en el ejercicio de sus funciones, de conformidad con los principios generales comunes a los Derechos de los Estados miembros.`,
  carta52: ` ${b('4.')} En la medida en que la presente Carta reconozca derechos fundamentales resultantes de las tradiciones constitucionales comunes a los Estados miembros, dichos derechos se interpretarán en armonía con las citadas tradiciones.`,
  coeInstr: `JUAN CARLOS I REY DE ESPAÑA. Cumplidos los requisitos exigidos por la Legislación Española y debidamente autorizado por las Cortes, extiendo el presente Instrumento de Adhesión de España al Estatuto del Consejo de Europa, hecho en Londres el cinco de mayo de mil novecientos cuarenta y nueve, al efecto de que mediante su depósito, y de conformidad con lo dispuesto en su artículo cuatro, España pase a ser parte del mismo. En fe de lo cual firmo el presente, debidamente sellado y refrendado por el infrascrito Ministro de Asuntos Exteriores. Dado en Madrid a veintidós de noviembre de mil novecientos setenta y siete. JUAN CARLOS I. El Ministro de Asuntos Exteriores, MARCELINO OREJA AGUIRRE.`,
  coe15a: ', incluida la conclusión de convenios y de acuerdos y la adopción por los Gobiernos de una política común respecto a determinados asuntos. Sus conclusiones serán comunicadas a los Miembros por el Secretario General',
  coe15b1: ', si hubiere lugar a ello,',
  coe15b2: ' El Comité podrá invitar a éstos a poner en su conocimiento las medidas que han tomado respecto a dichas recomendaciones.',
  coe17: ' para todas las finalidades específicas que juzgue convenientes',
  coe23: ` ${b('b)')} La Asamblea fijará su programa conforme a lo dispuesto en el precedente apartado a), teniendo en cuenta las actividades de las otras organizaciones intergubernamentales europeas de las cuales formen parte todos o algunos de los Miembros del Consejo. ${b('c)')} El Presidente de la Asamblea decidirá, en caso de duda, si una cuestión suscitada en el curso de una reunión se considera o no incluida en el programa de la Asamblea.`,
  coe36: ' o desempeñar ocupaciones incompatibles con sus deberes',
  lo23: ', pudiendo recabar, a tal efecto, informaciones de organismos competentes',
  cedh10: ` ${b('2.')} El ejercicio de estas libertades, que entrañan deberes y responsabilidades, podrá ser sometido a ciertas formalidades, condiciones, restricciones o sanciones previstas por la ley, que constituyan medidas necesarias, en una sociedad democrática, para la seguridad nacional, la integridad territorial o la seguridad pública, la defensa del orden y la prevención del delito, la protección de la salud o de la moral, la protección de la reputación o de los derechos ajenos, para impedir la divulgación de informaciones confidenciales o para garantizar la autoridad y la imparcialidad del poder judicial.`,
  cedh40: `${b('Art. 40.')} ${b('1.')} La vista es pública, a menos que el Tribunal decida otra cosa por circunstancias excepcionales. ${b('2.')} Los documentos depositados en la Secretaría serán accesibles al público, a menos que el Presidente del Tribunal decida de otro modo.`,
  pa1: `${b('P. Adicional, art. 1.')} Toda persona física o moral tiene derecho al respeto de sus bienes. Nadie podrá ser privado de su propiedad más que por causa de utilidad pública y en las condiciones previstas por la Ley y los principios generales del derecho internacional. Las disposiciones precedentes se entienden sin perjuicio del derecho que poseen los Estados de poner en vigor las Leyes que juzguen necesarias para la reglamentación del uso de los bienes de acuerdo con el interés general o para garantizar el pago de los impuestos u otras contribuciones o de las multas.`,
  pa5: `${b('P. Adicional, art. 5.')} Las Altas Partes Contratantes consideran los artículos 1, 2, 3 y 4 del presente Protocolo como artículos adicionales al Convenio, y todas las disposiciones del Convenio se aplicarán en consecuencia.`,
  p7a2: ' El ejercicio de ese derecho, incluidos los motivos por los que podrá ejercerse, se regularán por la ley.',
  p7a3: `${b('Art. 3.')} Cuando una sentencia penal condenatoria firme resulte posteriormente anulada o se conceda una medida de gracia porque un hecho nuevo o nuevas revelaciones demuestren que ha habido error judicial, la persona que haya sufrido la pena en virtud de esa condena será indemnizada conforme a la ley o al uso vigente en el Estado respectivo, excepto cuando se pruebe que la no revelación en tiempo oportuno del hecho desconocido fuere imputable total o parcialmente a dicha persona.`,
  p7a4: `${b('Art. 4.')} ${b('1.')} Nadie podrá ser inculpado o sancionado penalmente por un órgano jurisdiccional del mismo Estado, por una infracción de la que ya hubiere sido anteriormente absuelto o condenado en virtud de sentencia definitiva conforme a la ley y al procedimiento penal de ese Estado. ${b('2.')} Lo dispuesto en el párrafo anterior no impedirá la reapertura del proceso, conforme a la ley y al procedimiento penal del Estado interesado, si hechos nuevos o nuevas revelaciones o un vicio esencial en el proceso anterior pudieran afectar a la sentencia dictada. ${b('3.')} No se autorizará derogación alguna del presente artículo invocando el artículo 15 del Convenio.`,
  p12a1: `${b('Art. 1.')} ${b('1.')} El goce de todos los derechos reconocidos por la ley han de ser asegurados sin discriminación alguna, en particular por razones de sexo, raza, color, lengua, religión, opiniones políticas o de otro carácter, origen nacional o social, pertenencia a una minoría nacional, fortuna, nacimiento o cualquier otra situación. ${b('2.')} Nadie podrá ser objeto de discriminación por parte de cualquier autoridad pública, basada en particular en los motivos mencionados en el apartado 1.`,
  p12a3: `${b('Art. 3.')} Los Estados Partes considerarán los artículos 1 y 2 del presente Protocolo artículos adicionales al Convenio y todas las disposiciones del Convenio se aplicarán en consecuencia.`,
  er573: `${b('57.3.')} Además de otras funciones que le confiere el presente Estatuto, la Sala de Cuestiones Preliminares podrá: a) A petición del fiscal, dictar las providencias y órdenes que sean necesarias a los fines de una investigación. b) A petición de quien haya sido detenido o haya comparecido en virtud de una orden de comparecencia expedida con arreglo al artículo 58, dictar esas órdenes, incluidas medidas tales como las indicadas en el artículo 56 o solicitar, con arreglo a la Parte IX, la cooperación que sea necesaria para ayudarle a preparar su defensa. c) Cuando sea necesario, asegurar la protección y el respeto de la intimidad de víctimas y testigos, la preservación de pruebas, la protección de personas detenidas o que hayan comparecido en virtud de una orden de comparecencia, así como la protección de información que afecte a la seguridad nacional. d) Autorizar al fiscal a adoptar determinadas medidas de investigación en el territorio de un Estado Parte sin haber obtenido la cooperación de éste con arreglo a la Parte IX en el caso de que la Sala haya determinado, de ser posible teniendo en cuenta las opiniones del Estado de que se trate, que dicho Estado manifiestamente no está en condiciones de cumplir una solicitud de cooperación debido a que no existe autoridad u órgano alguno de su sistema judicial competente para cumplir una solicitud de cooperación con arreglo a la Parte IX. e) Cuando se haya dictado una orden de detención o de comparecencia con arreglo al artículo 58, y habida cuenta del valor de las pruebas y de los derechos de las partes de que se trate, de conformidad con lo dispuesto en el presente Estatuto y las Reglas de Procedimiento y Prueba, recabar la cooperación de los Estados con arreglo al párrafo 1.k) del artículo 93 para adoptar medidas cautelares a los efectos de un decomiso que, en particular, beneficie en última instancia a las víctimas.`,
  er96: `${b('Art. 96.')} ${b('1.')} La solicitud relativa a otras formas de asistencia a que se hace referencia en el artículo 93 deberá hacerse por escrito. En caso de urgencia, se podrá hacer por cualquier otro medio que permita dejar constancia escrita, a condición de que la solicitud sea confirmada en la forma indicada en el párrafo 1.a) del artículo 87. ${b('2.')} La solicitud deberá contener los siguientes elementos o estar acompañada de, según proceda: a) Una exposición concisa de su propósito y de la asistencia solicitada, incluidos los fundamentos jurídicos y los motivos de la solicitud; b) La información más detallada posible acerca del paradero o la identificación de la persona o el lugar objeto de la búsqueda o la identificación, de forma que se pueda prestar la asistencia solicitada; c) Una exposición concisa de los hechos esenciales que fundamentan la solicitud; d) Las razones y la indicación detallada de cualquier procedimiento que deba seguirse o requisito que deba cumplirse; e) Cualquier información que pueda ser necesaria conforme al derecho interno del Estado requerido para cumplir la solicitud, y f) Cualquier otra información pertinente para que pueda prestarse la asistencia solicitada. ${b('3.')} A solicitud de la Corte, todo Estado Parte consultará con la Corte, en general o respecto de un asunto concreto, sobre las disposiciones de su derecho interno que puedan ser aplicables de conformidad con el párrafo 2.e). En esas consultas, los Estados Partes comunicarán a la Corte las disposiciones específicas de su derecho interno. ${b('4.')} Las disposiciones del presente artículo serán también aplicables, según proceda, con respecto a las solicitudes de asistencia hechas a la Corte.`,
  er99_23: ` ${b('2.')} En el caso de una solicitud urgente y cuando la Corte lo pida, los documentos o pruebas incluidos en la respuesta serán transmitidos con urgencia. ${b('3.')} Las respuestas del Estado requerido serán transmitidas en su idioma y forma original.`,
  acu7a: ', y todos los materiales que se envíen a la Corte o que ésta envíe, estén en poder de la Corte o le pertenezcan',
  acu7b: 'La terminación o ausencia de esa inviolabilidad no afectará a las medidas de protección que la Corte ordene de conformidad con el Estatuto y las Reglas de Procedimiento y Prueba con respecto a documentos y materiales que la Corte utilice o le sean facilitados.',
  cedh57: ` ${b('2.')} Toda reserva formulada de conformidad con el presente artículo irá acompañada de una breve exposición de la ley de que se trate.`,
  er99_4: ` a) Cuando el Estado Parte requerido fuere un Estado en cuyo territorio se hubiera cometido presuntamente el crimen, y hubiere habido una decisión de admisibilidad de conformidad con los artículos 18 ó 19, el fiscal podrá ejecutar directamente la solicitud tras celebrar todas las consultas posibles con el Estado Parte requerido. b) En los demás casos, el fiscal podrá ejecutar la solicitud tras celebrar consultas con el Estado Parte requerido y con sujeción a cualquier condición u observación razonable que imponga o haga ese Estado Parte. Cuando el Estado Parte requerido considere que hay problemas para la ejecución de una solicitud de conformidad con el presente apartado, celebrará consultas sin demora con la Corte para resolver la cuestión.`,
};

// ---- operaciones. norma = marcador de páginas del PDF; ficha = prefijo del encabezado de la ficha existente ----
// inline: reemplaza el n-ésimo « (…)» (o « (…)» + lo que sea) del párrafo j · add: añade al final del párrafo j · parr: párrafo nuevo tras el párrafo j (-1 = antes del primero)
const OPS = [
  { id: 'carta38', norma: 'CARTA', tipo: 'ficha', antes: 'Artículo 35 — Protección de la salud', cab: 'Artículo 38 — Protección de los consumidores', ps: [T.carta38] },
  { id: 'carta41a', norma: 'CARTA', tipo: 'inline', ficha: 'Artículos 39, 41 y 42', j: 1, n: 0, txt: T.carta41a, ya: 'instituciones, órganos y organismos de la Unión traten' },
  { id: 'carta41b', norma: 'CARTA', tipo: 'inline', ficha: 'Artículos 39, 41 y 42', j: 1, n: 0, txt: T.carta41b, quitaPunto: false, sep: ' ' },
  { id: 'carta52', norma: 'CARTA', tipo: 'add', ficha: 'Artículos 51 y 52', j: 3, txt: T.carta52 },
  { id: 'coeInstr', norma: 'COE', tipo: 'ficha', antes: 'Preámbulo del Estatuto del Consejo de Europa', cab: 'Instrumento de adhesión de España al Estatuto del Consejo de Europa (Madrid, 22-11-1977)', ps: [T.coeInstr] },
  { id: 'coe15a', norma: 'COE', tipo: 'inline', ficha: 'Artículos 13, 14 y 15', j: 2, n: 0, txt: T.coe15a },
  { id: 'coe15b1', norma: 'COE', tipo: 'inline', ficha: 'Artículos 13, 14 y 15', j: 2, n: 0, txt: T.coe15b1, ya: 'podrán, si hubiere lugar a ello, revestir' },
  { id: 'coe15b2', norma: 'COE', tipo: 'add', ficha: 'Artículos 13, 14 y 15', j: 2, txt: T.coe15b2 },
  { id: 'coe17', norma: 'COE', tipo: 'inline', ficha: 'Artículos 16, 17 y 18', j: 1, n: 0, txt: T.coe17 },
  { id: 'coe23', norma: 'COE', tipo: 'add', ficha: 'Artículo 23 — Competencias de la Asamblea', j: 0, txt: T.coe23 },
  { id: 'coe36', norma: 'COE', tipo: 'inline', ficha: 'Artículos 36 y 37 — La Secretaría', j: 0, n: 0, txt: T.coe36 },
  { id: 'lo23', norma: 'LO', tipo: 'inline', ficha: 'Artículo 23 — De las medidas de reparación', j: 0, n: 0, txt: T.lo23 },
  { id: 'cedh10', norma: 'CEDH', tipo: 'add', ficha: 'Artículo 10 — Libertad de expresión', j: 0, txt: T.cedh10 },
  { id: 'cedh40', norma: 'CEDH', tipo: 'ficha', antes: 'Artículo 41 — Arreglo equitativo', cab: 'Artículo 40 — Vista pública y acceso a los documentos', ps: [T.cedh40] },
  { id: 'pa5', norma: 'CEDH', tipo: 'parr', ficha: 'Protocolo Adicional (París', j: 0, txt: T.pa5 },
  { id: 'pa1', norma: 'CEDH', tipo: 'parr', ficha: 'Protocolo Adicional (París', j: -1, txt: T.pa1 },
  { id: 'p7a2', norma: 'CEDH', tipo: 'inline', ficha: 'Protocolo n.º 7 (Estrasburgo', j: 1, n: 0, txt: T.p7a2 },
  { id: 'p7a3', norma: 'CEDH', tipo: 'parr', ficha: 'Protocolo n.º 7 (Estrasburgo', j: 1, txt: T.p7a3 },
  { id: 'p7a4', norma: 'CEDH', tipo: 'parr', ficha: 'Protocolo n.º 7 (Estrasburgo', j: 2, txt: T.p7a4 },
  { id: 'p12', norma: 'CEDH', tipo: 'ficha', antes: 'Protocolo n.º 12 (Roma, 4-11-2000) — Memoria explicativa', cab: 'Protocolo n.º 12 (Roma, 4-11-2000) — Prohibición general de la discriminación', ps: [T.p12a1, T.p12a3] },
  { id: 'er573', norma: 'ER', tipo: 'parr', ficha: 'Artículos 55 y 57 — Derechos durante la investigación', j: 'ultimo', txt: T.er573 },
  { id: 'er96', norma: 'ER', tipo: 'ficha', antes: 'Artículos 98 y 99', cab: 'Artículo 96 — Contenido de la solicitud relativa a otras formas de asistencia', ps: [T.er96] },
  { id: 'er99_23', norma: 'ER', tipo: 'add', ficha: 'Artículos 98 y 99', j: 1, txt: T.er99_23 },
  { id: 'er99_4', norma: 'ER', tipo: 'add', ficha: 'Artículos 98 y 99', j: 2, txt: T.er99_4 },
  { id: 'cedh57', norma: 'CEDH', tipo: 'add', ficha: 'Artículos 55 y 57 — Renuncia', j: 1, txt: T.cedh57 },
  { id: 'acu7a', norma: 'ACU', tipo: 'inline', ficha: 'Artículos 1, 2, 4, 5, 6 y 7', j: 24, n: 0, txt: T.acu7a, ya: 'su forma, y todos los materiales' },
  { id: 'acu7b', norma: 'ACU', tipo: 'inline', ficha: 'Artículos 1, 2, 4, 5, 6 y 7', j: 24, n: 0, txt: T.acu7b, sep: ' ' },
];

// ---------- lectura de fichas en esquemas.html ----------
let s = fs.readFileSync(F, 'utf8');
const esc = t => t.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const aT1 = Math.min(...['LO', 'CARTA', 'COE', 'CEDH', 'ROMA', 'ACUERDO'].map(n => s.indexOf('/* T1_' + n + ' */'))), bT1 = s.indexOf('/* T2_LEY19 */');
const lineaFicha = (pref) => { const re = '  + articuloResp("' + pref; const i = s.indexOf(re, aT1); if (i < 0 || i > bT1) throw new Error('no encuentro ficha ' + pref); const e = s.indexOf('\n', i); return [i, e]; };

// ---------- firmas de párrafos antes del cambio (para realinear mapa-fijo) ----------
const ESQ = F, TEST = path.join(RAIZ, 'test-oficial-conocimiento.html');
function unidadesT1() {
  const src = fs.readFileSync(path.join(RAIZ, 'prompts', 'herramientas', 'mapa-preguntas.js'), 'utf8');
  const a = src.indexOf('// ---------- 1.'), z = src.indexOf('// ---------- 5.');
  const cwd = process.cwd(); process.chdir(RAIZ);
  try { const fn = new Function('fs', 'ESQ', 'TEST', src.slice(a, z).replace(/^const /gm, 'var ') + '; return unidades(cargarEsquemas()[0], 1);'); return fn(fs, ESQ === F ? 'esquemas.html' : ESQ, 'test-oficial-conocimiento.html'); }
  finally { process.chdir(cwd); }
}
const antes = unidadesT1().map(u => ({ pid: u.pid, T: u.T.trim().slice(0, 45) }));

// ---------- pintado con el PDF ----------
const pendientes = OPS.filter(o => !o.hecho);
const marca = { ER: 'T1N_ER', LO: 'T1N_LO', CARTA: 'T1N_CARTA', COE: 'T1N_COE', CEDH: 'T1N_CEDH', ACU: 'T1N_ACU' };
const snippets = {};   // id → [html por trozo]
OPS.forEach(o => { snippets[o.id] = o.tipo === 'ficha' ? o.ps : [o.txt]; });
// idempotencia: una operación ya aplicada deja su texto (sin pintar) reconocible por su primera frase
const plano = h => h.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ');
const sPlano = plano(s.slice(aT1, bT1).replace(/\\"/g, '"'));
const yaHecho = o => { if (o.tipo === 'ficha') return s.includes('articuloResp("' + esc(o.cab) + '"'); const [i0, e0] = lineaFicha(o.ficha); const pl = plano(s.slice(i0, e0).replace(/\\"/g, '"')); return pl.includes(o.ya || plano(o.txt).trim().slice(0, 90)); };
const hacer = OPS.filter(o => !yaHecho(o));
console.log('pendientes:', hacer.map(o => o.id).join(', ') || '—');
if (!hacer.length) process.exit(0);

const dir = path.join(process.env.TEMP || '/tmp', 't1n'); fs.mkdirSync(dir, { recursive: true }); const tmpF = path.join(dir, 'sinsitio.html');
let tmp = '/* T1N_INI */ X = ""\n';
for (const nm of Object.values(marca)) {
  const g = hacer.filter(o => marca[o.norma] === nm); if (!g.length) continue;
  tmp += `/* ${nm} */ X = ` + g.flatMap(o => snippets[o.id].map((t, i) => `articuloResp("${o.id}_${i}", [], "${esc('<p>' + t + '</p>')}", false)`)).join('\n + ') + ';\n';
}
tmp += '/* T1N_FIN */\n'; fs.writeFileSync(tmpF, tmp);
if (DRY) { console.log('dry: tmp en', tmpF); process.exit(0); }
cp.execSync(`node "${path.join(__dirname, '..', 'aplicar-subrayado-pdf.js')}" "${SUB}" "${tmpF}" "/* T1N_INI */" "/* T1N_FIN */" "T1N_ER:3-36,T1N_LO:37-50,T1N_CARTA:51-64,T1N_COE:65-76,T1N_CEDH:77-120,T1N_ACU:121-134"`, { stdio: 'inherit', env: { ...process.env, UMBRAL: '0.15' } });
const pintado = fs.readFileSync(tmpF, 'utf8'); const P = {};
for (const m of pintado.matchAll(/articuloResp\("((?:[^"\\\n]|\\.)*)", \[\], "((?:[^"\\\n]|\\.)*)", false\)/g)) P[m[1]] = m[2].replace(/^<p>/, '').replace(/<\/p>$/, '');

// ---------- aplicar ----------
const pAbre = /<p[^>]*>/g;
function paragrafos(linea) { // posiciones de cada <p …>…</p> de la ficha (dentro del 3.er argumento)
  const out = []; const r = /<p(?: [^>]*)?>[\s\S]*?<\/p>/g; let m; while ((m = r.exec(linea))) out.push([m.index, m.index + m[0].length]); return out;
}
const nuevaFicha = (o) => `  + articuloResp("${esc(o.cab)}", [], "${o.ps.map((_, i) => '<p>' + P[o.id + '_' + i] + '</p>').join('')}", false)\n`;
for (const o of hacer) {
  if (o.tipo === 'ficha') {
    const i = s.indexOf('  + articuloResp("' + o.antes, aT1); if (i < 0) throw new Error('no encuentro dónde insertar ' + o.cab);
    s = s.slice(0, i) + nuevaFicha(o) + s.slice(i); console.log('+ ficha', o.cab); continue;
  }
  const [i0, e0] = lineaFicha(o.ficha); let L = s.slice(i0, e0); const ps = paragrafos(L);
  const html = P[o.id + '_0'];
  if (o.tipo === 'parr') {
    const j = o.j === 'ultimo' ? ps.length - 1 : o.j; const pos = j < 0 ? ps[0][0] : ps[j][1];
    L = L.slice(0, pos) + '<p>' + html + '</p>' + L.slice(pos);
  } else {
    const [pa, pb] = ps[o.j]; let par = L.slice(pa, pb);
    if (o.tipo === 'add') par = par.replace(/<\/p>$/, html + '</p>');
    else { // inline: sustituye la n-ésima « (…)»
      let k = -1; const rep = par.replace(/ ?\(…\)/g, mm => (++k === o.n ? (o.sep || '') + html : mm));
      if (k < o.n) throw new Error('sin (…) nº ' + o.n + ' en ' + o.id); par = rep;
    }
    L = L.slice(0, pa) + par + L.slice(pb);
  }
  s = s.slice(0, i0) + L + s.slice(e0); console.log('+', o.tipo, o.id);
}
fs.writeFileSync(F, s);

// ---------- realinear mapa-fijo-t1.json (k-j) ----------
const despues = unidadesT1().map(u => ({ pid: u.pid, T: u.T.trim().slice(0, 45) }));
const nuevo = {}; let ptr = 0; const mapaPid = {};
antes.forEach(a => { let f = -1; for (let n = ptr; n < despues.length; n++) if (despues[n].T === a.T) { f = n; break; } if (f < 0) throw new Error('párrafo perdido ' + a.pid + ' ' + a.T); mapaPid[a.pid] = despues[f].pid; ptr = f + 1; });
const fijo = JSON.parse(fs.readFileSync(FIJO, 'utf8')); let cambiados = 0;
Object.entries(fijo).forEach(([id, kj]) => { const np = mapaPid['1-' + kj]; if (!np) throw new Error('sin realineo ' + id + ' ' + kj); const nk = np.replace(/^1-/, ''); if (nk !== kj) cambiados++; nuevo[id] = nk; });
fs.writeFileSync(FIJO, JSON.stringify(nuevo));
console.log('mapa-fijo-t1 realineado:', cambiados, 'de', Object.keys(nuevo).length);
