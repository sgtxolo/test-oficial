// Tema 15 · marcas a mano del temario escaneado 08-08-2026 (marcas-t15.txt) + fichas RECUERDA R1-R23 (págs. 165-168 y 15.7).
// Aplica data-ex="EXOF,EX,*" y data-r="Rn" a los <p> de cada norma del esquema (bloques T15_*), localizándolos por «artículo.apartado.letra»
// (solo LO 1/2004) o por texto literal ~"…" (resto), y monta el bloque T15.rec (RECUERDA, pregunta → respuesta). Idempotente.
// Orden de la cadena: esquema-t15.js → marcas-t15.js → (subrayado) → visuales-t15.js. Uso: node prompts/herramientas/tema15/marcas-t15.js [--dry]
// OJO: R12-R14 y R17-R21 son fichas de la Instrucción 4/2019 y la NTF 1/2019 (derogadas); se transcriben como vienen impresas y se avisa
// en el enunciado. Los pins «R18-R21» de las páginas de la NTF-2/2025 no coinciden con esas fichas: se marcan con ✱.
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html');
const L = require('../literal-lib.js');
const DRY = process.argv.includes('--dry');
const clave = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const limpia = t => t.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const NORMAS = { lo: ['T15_LO', 'LO 1/2004'], rs: ['T15_RS', 'Resolución de 28 de junio de 2005'], i125: ['T15_I125', 'Instrucción 1/2025'], pc: ['T15_PC', 'Instrucción 5/2021 (Protocolo Cero)'],
  pul: ['T15_PUL', 'Protocolo de seguimiento telemático'], ntf: ['T15_NTF', 'NTF-2/2025'], i1218: ['T15_I1218', 'Instrucción 12/2018'] };
const RS = [
  ['R1', 'lo', 'La violencia de género a que se refiere la presente Ley comprende todo acto de violencias físicas y psicológicas, incluidas las agresiones a:', 'la libertad sexual, las amenazas, las coacciones o la privación arbitraria de libertad.', 'comprende todo acto de violencia física y psicológica'],
  ['R2', 'lo', 'De acuerdo con lo establecido en la Ley 34/1988, de 11 de noviembre, General de Publicidad, se considerará ilícita la publicidad que utilice la imagen de la mujer con carácter:', 'vejatorio o discriminatorio.', 'se considerará ilícita la publicidad que utilice la imagen de la mujer'],
  ['R3', 'lo', 'La Comisión emitirá un informe anual que será remitido al:', 'Observatorio Estatal de la Violencia sobre la Mujer y al Pleno del Consejo Interterritorial.', 'La Comisión emitirá un informe anual que será remitido'],
  ['R4', 'lo', 'La trabajadora víctima de violencia de género tendrá derecho, en los términos previstos en el Estatuto de los Trabajadores, a la:', 'reducción o a la reordenación de su tiempo de trabajo, a la movilidad geográfica, al cambio de centro de trabajo, a la suspensión de la relación laboral con reserva de puesto de trabajo y a la extinción del contrato de trabajo.', 'La trabajadora víctima de violencia de género tendrá derecho'],
  ['R5', 'lo', 'Ayudas sociales. El importe de esta ayuda será equivalente al de:', 'seis meses de subsidio por desempleo.', 'El importe de esta ayuda será equivalente al de seis meses'],
  ['R6', 'lo', 'Las mujeres víctimas de violencia de género serán consideradas en el acceso a viviendas protegidas y residencias públicas para mayores, en los términos que determine la legislación aplicable:', 'colectivos prioritarios.', 'serán consideradas colectivos prioritarios'],
  ['R7', 'lo', 'La Delegación Especial del Gobierno contra la Violencia sobre la Mujer está adscrita al (ficha del temario con el texto anterior a la reforma; hoy la Delegación del Gobierno contra la Violencia de Género está adscrita al Ministerio de Igualdad):', 'Ministerio de Trabajo y Asuntos Sociales (texto anterior); en la redacción vigente, Ministerio de Igualdad.', 'La Delegación del Gobierno contra la Violencia de Género, adscrita al Ministerio'],
  ['R8', 'rs', 'Una vez valorados los hechos y la situación de riesgo existente, se determinará la conveniencia de adoptar:', 'medidas específicas dirigidas a proteger la vida, la integridad física y los derechos e intereses legítimos de la víctima y sus familiares.', 'Una vez valorados los hechos y la situación de riesgo existente'],
  ['R9', 'rs', 'Ámbito espacial y temporal de la medida de alejamiento. Parece aconsejable que la distancia sea al menos de:', '500 metros.', 'Parece aconsejable que la distancia sea al menos de 500 metros'],
  ['R10', 'rs', 'Para facilitar el examen individualizado de la situación de riesgo en la que se encuentra la víctima, el órgano judicial también remitirá a las Fuerzas y Cuerpos de Seguridad territorialmente competentes copia de los informes obrantes en el proceso penal que se refieran a circunstancias:', 'personales, psicológicas, sociales o de otro tipo de la víctima, del imputado o de su núcleo familiar.', 'Para facilitar el examen individualizado de la situación de riesgo en la que se encuentra la víctima'],
  ['R11', 'rs', 'La Unidad policial que reciba la comunicación dará traslado de ella, sin dilación, a:', 'la Unidad correspondiente de las Fuerzas y Cuerpos de Seguridad competente en materia de violencia doméstica (Cuerpo Nacional de Policía – SAM, UPAP--, Guardia Civil -EMUME- Policía Autonómica o Policías Locales).', 'La Unidad policial que reciba la comunicación dará traslado de ella'],
  ['R12', 'i125', 'Instrucción 4/2019 (derogada; hoy Instrucción 1/2025). La primera evaluación de nueva violencia la realizarán:', 'los agentes policiales que instruyan las diligencias y se ocupen de las primeras investigaciones.', '3.1. La primera valoración policial del riesgo será realizada por el personal policial'],
  ['R13', 'i125', 'Instrucción 4/2019 (derogada). El Sistema VioGén, una vez practicada la valoración en el Caso concreto, asignará automáticamente uno de los siguientes niveles de riesgo:', '«no apreciado», «bajo», «medio», «alto» o «extremo» (la Instrucción 1/2025 suprime «no apreciado»: bajo, medio, alto o extremo).', 'asignará automáticamente uno de los siguientes niveles de riesgo'],
  ['R14', 'i125', 'Instrucción 4/2019 (derogada). El seguimiento de la evolución de los casos se realizará siempre con el Formulario VPER en sus dos modalidades:', 'VPER-S y VPER-C (la Instrucción 1/2025 mantiene el Formulario VPER).', '4.1. El Formulario VPER se utilizará para realizar una evaluación del riesgo durante el seguimiento'],
  ['R15', 'pul', 'Protocolo de actuación del sistema de seguimiento por medios telemáticos. El DLV se entregará preferentemente:', 'en el domicilio de la usuaria.', 'El DLV se entregará preferentemente en el domicilio de la víctima'],
  ['R16', 'pul', 'Protocolo de actuación del sistema de seguimiento por medios telemáticos. Los avisos que genera el sistema son de dos tipos:', 'alarma y alerta, graduados de mayor a menor riesgo.', 'Los avisos que genera el sistema son de dos tipos'],
  ['R17', 'ntf', 'Norma técnica de funcionamiento 1/2019 (hoy NTF-2/2025). Conforman el nivel de respuesta principal dado que atienden la mayoría de los casos, recibiendo las denuncias, atendiendo a las víctimas, informándolas de sus derechos, prestando el auxilio que precisen y garantizando su seguridad, así como actuando sobre el autor:', 'las Unidades de Seguridad Ciudadana (los Puestos).', 'conforma el primer nivel de respuesta dado que atienden'],
  ['R18', 'ntf', 'Norma técnica de funcionamiento 1/2019 (hoy NTF-2/2025). La composición y despliegue de los PAES será:', 'la que en cada momento se establezca por la Jefatura de Policía Judicial (JPJ).', 'La composición y despliegue de los PAEs será'],
  ['R19', 'ntf', 'Norma técnica de funcionamiento 1/2019 (hoy NTF-2/2025). A este respecto, todas las víctimas de violencia de género, en función de la naturaleza del delito sufrido, tienen la consideración de:', 'víctimas con necesidad de especial protección.', 'todas las víctimas de violencia de género tienen la consideración de víctimas con necesidad de especial protección'],
  ['R20', 'i125', 'Norma técnica de funcionamiento 1/2019 (derogada). Una vez realizada la VPR, el Sistema VioGén asignará automáticamente uno de los siguientes niveles de riesgo:', '«no apreciado», «bajo», «medio», «alto» o «extremo», que podrá ser modificado al alza por los agentes si, atendiendo a los indicios que no se reflejen en los indicadores del Sistema, consideran que resulta necesario para una mejor protección a las víctimas (la Instrucción 1/2025 suprime «no apreciado»).', 'podrá ser modificado al alza al final de cada valoración completa'],
  ['R21', 'ntf', 'Norma técnica de funcionamiento 1/2019 (hoy NTF-2/2025, Anexo II). Recibirá una ayuda de pago único, siempre que se presuma que, debido a su edad, falta de preparación general o especializada y circunstancias sociales, tendrá especiales dificultades para obtener un empleo y, por dicha circunstancia, no participará en los programas de empleo establecidos para su inserción profesional:', 'cuando carezca de rentas superiores, en cómputo mensual, al setenta y cinco por ciento del Salario Mínimo Interprofesional, excluida la parte proporcional de dos pagas extraordinarias.', 'Cuando carezca de rentas superiores, en cómputo mensual, al setenta y cinco por ciento'],
  ['R22', 'i1218', 'Instrucción 12/2018. Primera. Por los titulares de los órganos directivos y por los jefes de las Unidades centrales y territoriales de los Cuerpos integrados en el Sistema VioGén se asegurará:', 'tanto la formación necesaria de los agentes que llevan a cabo las valoraciones policiales de riesgo y la protección de las víctimas como la dotación adecuada de recursos humanos y materiales para dicha labor.', 'Por los titulares de los órganos directivos y por los jefes de las Unidades centrales'],
  ['R23', 'i1218', 'Instrucción 12/2018. Segunda. Por los jefes de las Unidades centrales o plantillas policiales territoriales se dispondrán las medidas necesarias para asegurar que:', 'todos los agentes encargados de las valoraciones policiales de riesgo y de las medidas de protección de las mujeres víctimas de violencia de género dispongan en todo momento de los conocimientos específicos para llevar a cabo dichas valoraciones de riesgo y las medidas de protección a implementar.', 'Por los jefes de las Unidades centrales o plantillas policiales territoriales'],
];
const claves = Object.keys(NORMAS);
const MARCAS = [];
for (const l of fs.readFileSync(path.join(__dirname, 'marcas-t15.txt'), 'utf8').split('\n')) {
  if (!/^p\d+:/.test(l)) continue;
  const re = new RegExp('(' + claves.join('|') + ') ([\\w.]*)(?:~"([^"]+)")?:(EXOF|EX|\\*)', 'g');
  for (const m of l.slice(l.indexOf(':') + 1).matchAll(re)) MARCAS.push({ norma: m[1], spec: m[2], txt: m[3], tipo: m[4], linea: l.slice(0, 5) });
}
let s = fs.readFileSync(F, 'utf8');
const H = Object.fromEntries(claves.map(k => [k, L.get(s, NORMAS[k][0]).html]));
// quita marcas anteriores (idempotente)
for (const k of claves) H[k] = H[k].replace(/ data-ex="[^"]*"/g, '').replace(/ data-r="[^"]*"/g, '');
const pAll = h => [...h.matchAll(/<p([^>]*)>([\s\S]*?)<\/p>/g)].map(m => ({ at: m[1], h: m[2], idx: m.index, len: m[0].length, k: clave(limpia(m[2])) }));
const sufijos = { bis: ' bis', ter: ' ter' };
function busca(norma, spec, txt) {
  const h = H[norma], ps = pAll(h);
  if (txt) { const k = clave(txt); const p = ps.find(q => q.k.includes(k)); return p ? p.idx : -1; }
  const m = spec.match(/^(\d+)(bis|ter)?(?:\.(\d+))?\.?([a-z])?$/); if (!m) return -1;
  const id = m[1] + (m[2] ? sufijos[m[2]] : ''); const ini = h.search(new RegExp('<div class="articulo-head">Artículo ' + id + '(?=[. <])'));
  if (ini < 0) return -1;
  const fin = h.indexOf('</div></div></div>', ini); const sub = pAll(h.slice(ini, fin)); let ap = '';
  const filas = sub.map(p => { const mb = p.h.match(/^<b>(\d+)\.<\/b>/); if (mb) ap = mb[1]; const ml = p.h.match(/^<b>([a-z])\)<\/b>/); return { ...p, ap, letra: ml ? ml[1] : '' }; });
  const [, , , apt, letra] = m; let r;
  const sinNum = !filas.some(p => /^<b>\d+\.<\/b>/.test(p.h));   // artículos cuyo texto oficial no numera los apartados: «14.2» = segundo párrafo
  if (letra) r = filas.find(p => p.letra === letra && (!apt || p.ap === apt)); else if (apt && sinNum) r = filas.filter(p => !p.letra)[+apt - 1]; else if (apt) r = filas.find(p => p.ap === apt && !p.letra); else r = filas[0];
  return r ? ini + r.idx : -1;
}
const fallos = [], sitios = [];
for (const x of MARCAS) { const i = busca(x.norma, x.spec, x.txt); if (i < 0) fallos.push(`${x.linea} ${x.norma} ${x.spec}${x.txt ? '~' + x.txt.slice(0, 40) : ''}:${x.tipo}`); else sitios.push({ norma: x.norma, i, tipo: x.tipo }); }
for (const r of RS) { const i = busca(r[1], '', r[4]); if (i < 0) fallos.push('R ' + r[0]); else sitios.push({ norma: r[1], i, tipo: r[0] }); }
console.log(`marcas: ${MARCAS.length} · situadas ${sitios.length} (con ${RS.length} R) · no encontradas: ${fallos.join(' | ') || 'ninguna'}`);
const ORD = { EXOF: 0, EX: 1, '*': 2 };
for (const k of claves) {
  const mios = sitios.filter(x => x.norma === k); if (!mios.length) continue;
  const por = new Map(); mios.forEach(x => { if (!por.has(x.i)) por.set(x.i, new Set()); por.get(x.i).add(x.tipo); });
  let h = H[k];
  for (const i of [...por.keys()].sort((a, b) => b - a)) {   // de atrás adelante para no mover las posiciones
    const tipos = [...por.get(i)], ex = tipos.filter(t => !/^R/.test(t)).sort((a, b) => ORD[a] - ORD[b]), rr = tipos.filter(t => /^R/.test(t)).sort((a, b) => +a.slice(1) - +b.slice(1));
    const fin = h.indexOf('>', i); const tag = h.slice(i, fin);
    h = h.slice(0, i) + tag + (ex.length ? ` data-ex="${ex.join(',')}"` : '') + (rr.length ? ` data-r="${rr.join(',')}"` : '') + h.slice(fin);
  }
  H[k] = h;
}
for (const k of claves) s = L.put(s, NORMAS[k][0], H[k]);
const card = r => `<p data-r="${r[0]}"><b>${r[0]}</b> · <i>${NORMAS[r[1]][1]}.</i> ${esc(r[2])} <b>→</b> <mark class="m-resp">${esc(r[3])}</mark></p>`;
const grupo = (tit, f) => `<div class="articulo"><div class="articulo-head">RECUERDA del temario · ${tit}</div><div class="articulo-body"><div class="txt">${RS.filter(f).map(card).join('')}</div></div></div>`;
const rec = `<div class="bloque-titulo">RECUERDA DEL TEMARIO — fichas R1 a R23 (pregunta → respuesta), tal como vienen en las últimas páginas de tu temario</div>`
  + grupo('Ley Orgánica 1/2004 (R1 a R7)', r => /^R[1-7]$/.test(r[0])) + grupo('Resolución de 28 de junio de 2005 (R8 a R11)', r => /^R(8|9|10|11)$/.test(r[0]))
  + grupo('Instrucción 4/2019 y protocolo telemático (R12 a R16) — fichas del texto anterior', r => /^R(1[2-6])$/.test(r[0])) + grupo('NTF 1/2019 (R17 a R21) — fichas del texto anterior', r => /^R(1[7-9]|2[01])$/.test(r[0]))
  + grupo('Instrucción 12/2018 (R22 y R23)', r => /^R2[23]$/.test(r[0]));
s = L.put(s, 'T15_REC', rec);
if (!DRY) fs.writeFileSync(F, s);
console.log(DRY ? '(dry, sin escribir)' : 'escrito');
