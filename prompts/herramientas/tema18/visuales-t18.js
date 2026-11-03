require('../esq-virtual.js');   // esquemas.html con los textos de las leyes en su sitio (ver esq-virtual.js)
// Cuadros visuales del Tema 18: recrean los cuadros de tu temario (PDF 08-08-2026) con su TEXTO y estructura.
//   p8 error · p9 tentativa · p10 conspiración/proposición/provocación · p11 legítima defensa · p21/p69 penas (art. 33) · p22 permisos de salida (art. 36)
//   p39 art. 78 bis (cuadro a mano) · p41 medidas de seguridad y art. 97 · p43 art. 98 · p59-64 prescripción de delitos, de penas y de medidas de seguridad
// Colores: tu PDF trae estos cuadros impresos (sin fosforito propio): se colorean con el método (concepto → amarillo, verbo/acción → naranja, órgano → verde,
// plazo/cifra → azul, no/salvo/únicamente → rojo subrayado). Se insertan tras la ficha que contiene el texto localizador. Los usa también expres/t18.js (module.exports = V).
// Uso: node prompts/herramientas/tema18/visuales-t18.js   (idempotente: sustituye los cuadros anteriores marcados con <!--VIS18-->)
const fs = require('fs'), path = require('path');
const L = require('../literal-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const AS = '<span class="m-ast"></span>';
const CA = x => `<span class="m-caja">${x}</span>`;
const pie = t => `<p class="nota-manuscrita" style="font-style:italic;opacity:.85;margin:6px 4px 0">✎ ${t}</p>`;
const V = []; const v = (norma, loc, html) => V.push([norma, loc, html]);

// ───────── p8 · art. 14 · ERROR ─────────
v('cp', 'El error sobre un hecho que cualifique la infracción o sobre una circunstancia agravante', tabla('ERROR (cuadro del temario · art. 14)', ['Error', 'Efecto'], [
  { l: 'DE TIPO (art. 14.1)', c: 'o', h: [
    { p: 'Vencible', c: 'o', t: `Se castiga como ${D('imprudente')}.` },
    { p: 'Invencible', c: 'v', t: `${P('No existe delito')}.` }] },
  { l: 'DE PROHIBICIÓN (art. 14.3)', c: 'v', h: [
    { p: 'Vencible', c: 'o', t: `${D('Se rebaja la pena en uno o dos grados')}.` },
    { p: 'Invencible', c: 'v', t: `${P('No existe delito')}.` }] },
]));

// ───────── p9 · art. 16 · TENTATIVA ─────────
v('cp', 'Quedará exento de responsabilidad penal por el delito intentado', flujo('TENTATIVA · Art. 16 CP (cuadro del temario)', [
  { et: 'Se produce cuando', c: 'o', t: `${D('El sujeto da principio')} a la ejecución del delito: ${Y('directamente')}, y por ${Y('hechos exteriores')} + ${D('practica')} ${Y('todos o parte de los actos')} que objetivamente deberían producir el resultado = el ${Y('resultado del delito no se produce')} por ${Y('causas independientes de la voluntad del autor')}.` },
  { et: 'Quedará EXENTO de responsabilidad penal quien', c: 'v', t: `${D('Evite voluntariamente')} la consumación del delito, bien: ${D('desistiendo')} de la ejecución ya iniciada, bien ${D('impidiendo')} la producción del resultado. ${K('Sin perjuicio')} de la responsabilidad en que pudiera haber incurrido por los actos ejecutados, si éstos fueren ya constitutivos de otro delito.` },
  { et: 'Si intervienen varios sujetos', c: 'c', t: `Quedarán exentos de responsabilidad penal aquél o aquéllos que ${D('desistan')} de la ejecución ya iniciada ${P('e')} ${D('impidan o intenten impedir')}, ${K('seria, firme y decididamente')}, la consumación. (${K('Sin perjuicio')} de la responsabilidad por los actos ejecutados, si éstos fueren ya constitutivos de otro delito.)` },
]));

// ───────── p10 · arts. 17-18 · conspiración, proposición, provocación ─────────
v('cp', 'Si a la provocación hubiese seguido la perpetración del delito', cols('CONSPIRACIÓN · PROPOSICIÓN · PROVOCACIÓN (cuadro del temario · arts. 17 y 18)', [
  { t: 'CONSPIRACIÓN', l: [`Dos o más personas ${D('se conciertan y resuelven')} ejecutar un delito.`] },
  { t: 'PROPOSICIÓN', l: [`El que ha resuelto cometer un delito ${D('invita')} a otro/s a participar en él.`] },
  { t: 'PROVOCACIÓN', l: [`Se ${D('incita')} a otro/s a que cometan un delito.`] },
]));

// ───────── p11 · art. 20.4 · legítima defensa ─────────
v('cp', 'Segundo. Necesidad racional del medio empleado', cols('REQUISITOS DE LA LEGÍTIMA DEFENSA (cuadro del temario · art. 20.4)', [
  { t: G('1.º Agresión ilegítima'), l: [`Defensa de los bienes: el ataque que ${D('constituya delito')} y los ponga en ${D('grave peligro de deterioro o pérdida inminentes')}.`, `Defensa de la morada o sus dependencias: ${Y('la entrada indebida')} en aquélla o éstas.`] },
  { t: G('2.º Necesidad racional del medio empleado'), l: ['Para impedirla o repelerla.'] },
  { t: G('3.º Falta de provocación suficiente'), l: ['Por parte del defensor.'] },
]));

// ───────── p21 y p69 · art. 33 · penas graves, menos graves y leves ─────────
v('cp', 'La responsabilidad personal subsidiaria por impago de multa tendrá naturaleza menos grave o leve', cols('PENAS GRAVES · MENOS GRAVES · LEVES (cuadro del temario · art. 33; con sello EXAMEN)', [
  { t: `${R('GRAVES')}`, l: [`a) ${Y('Prisión permanente revisable')} (siempre grave)`, `b) ${Y('Prisión')} superior a ${P('cinco años')}`, `c) ${Y('Inhabilitación absoluta')} (siempre grave)`, `d) ${Y('Inhabilitaciones especiales')} superior a ${P('cinco años')}`, `e) ${Y('Suspensión de empleo o cargo público')} superior a ${P('cinco años')}`, `f) Privación del derecho a ${Y('conducir')} vehículos a motor y ciclomotores: superior a ${P('ocho años')}`, `g) Privación del derecho a la ${Y('tenencia y porte de armas')}: superior a ${P('ocho años')}`, `h) Privación del derecho a ${Y('residir')} en determinados lugares o acudir a ellos: superior a ${P('cinco años')}`, `i) Prohibición de ${Y('aproximarse')} a la víctima: superior a ${P('cinco años')}`, `j) Prohibición de ${Y('comunicarse')} con la víctima: superior a ${P('cinco años')}`, `k) ${Y('Privación de la patria potestad')} (siempre grave)`] },
  { t: `${D('MENOS GRAVES')}`, l: [`a) ${Y('Prisión')} de ${P('tres meses hasta cinco años')}`, `b) ${Y('Inhabilitaciones especiales')} hasta ${P('cinco años')}`, `c) ${Y('Suspensión de empleo o cargo público')} hasta ${P('cinco años')}`, `d) ${Y('Conducir')}: de ${P('un año y un día a ocho años')}`, `e) ${Y('Tenencia y porte de armas')}: de ${P('un año y un día a ocho años')}`, `f) ${Y('Inhabilitación especial para profesión, oficio o comercio relacionado con los animales y para la tenencia de animales')}: de ${P('un año y un día a cinco años')}`, `g) ${Y('Residir')}: de ${P('seis meses a cinco años')}`, `h) ${Y('Aproximarse')}: de ${P('seis meses a cinco años')}`, `i) ${Y('Comunicarse')}: de ${P('seis meses a cinco años')}`, `j) ${Y('Multa')} de ${P('más de tres meses')}`, `k) ${Y('Multa proporcional')}, cualquiera que fuese su cuantía (salvo lo dispuesto para personas jurídicas)`, `l) ${Y('Trabajos en beneficio de la comunidad')}: de ${P('treinta y un días a un año')}`] },
  { t: `${G('LEVES')}`, l: [`a) ${Y('Conducir')}: de ${P('tres meses a un año')}`, `b) ${Y('Tenencia y porte de armas')}: de ${P('tres meses a un año')}`, `c) ${Y('Animales')} (inhabilitación especial): de ${P('tres meses a un año')}`, `d) ${Y('Residir')}: ${P('inferior a seis meses')}`, `e) ${Y('Aproximarse')}: de ${P('un mes a menos de seis meses')}`, `f) ${Y('Comunicarse')}: de ${P('un mes a menos de seis meses')}`, `g) ${Y('Multa')} de ${P('hasta tres meses')}`, `h) ${Y('Trabajos en beneficio de la comunidad')}: de ${P('uno a treinta días')}`, `i) ${Y('Localización permanente')}: de ${P('un día a tres meses')}`] },
]));

// ───────── p22 · art. 36 · permisos de salida ─────────
v('cp', 'el penado no podrá disfrutar de permisos de salida hasta que haya cumplido un mínimo de doce años de prisión', plazos('PERMISOS DE SALIDA · prisión permanente revisable (cuadro del temario · art. 36.1)', [
  ['12 años', `${K('No podrá disfrutar')} de permisos de salida hasta el cumplimiento de ${P('12 años')} de prisión efectiva, en el caso de que el penado lo sea por un delito del ${Y('Capítulo VII del Título XXII del Libro II')} del Código Penal (terrorismo). Tercer grado: ${P('20 años')}.`],
  ['8 años', `${K('No podrá disfrutar')} de permisos de salida hasta el cumplimiento de ${P('8 años')} de prisión efectiva, en el resto de los casos. Tercer grado: ${P('15 años')}.`],
]));

// ───────── p39 · arts. 78 bis · cuadro a mano de mi temario (PP = prisión permanente revisable) ─────────
v('cp', 'Siempre que los Jueces o Tribunales impongan una pena que lleve consigo otras accesorias', tabla('PRISIÓN PERMANENTE REVISABLE · acceso al tercer grado y suspensión (cuadro a mano de tu temario · art. 78 bis)', ['Supuesto', 'Mínimo de cumplimiento'], [
  { l: 'TERCER GRADO · delitos comunes', c: 'o', h: [
    { p: '18 años', c: 'o', t: `${Y('Varios delitos')}, uno con prisión permanente revisable (PP) y el resto de las penas sumen ${P('más de 5 años')}.` },
    { p: '20 años', c: 'v', t: `Uno con PP y el resto de las penas sumen ${P('más de 15 años')}.` },
    { p: '22 años', c: 'c', t: `${P('Dos o más')} con PP, o uno con PP y el resto sumen ${P('25 años o más')}.` }] },
  { l: 'SUSPENSIÓN DE LA EJECUCIÓN DEL RESTO · delitos comunes', c: 'v', h: [
    { p: '25 años', c: 'o', t: `En los supuestos de las letras ${Y('a) y b)')} (18 y 20 años de tercer grado).` },
    { p: '30 años', c: 'v', t: `En el supuesto de la letra ${Y('c)')} (22 años de tercer grado).` }] },
  { l: 'TERRORISMO u organizaciones criminales · tercer grado', c: 'c', h: [
    { p: '24 años', c: 'o', t: `Supuestos de las letras ${Y('a) y b)')}.` },
    { p: '32 años', c: 'v', t: `Supuesto de la letra ${Y('c)')}.` }] },
  { l: 'TERRORISMO u organizaciones criminales · suspensión', c: 'o', h: [
    { p: '28 años', c: 'o', t: `Supuestos de las letras ${Y('a) y b)')}.` },
    { p: '35 años', c: 'v', t: `Supuesto de la letra ${Y('c)')}.` }] },
]));

// ───────── p41 · art. 96 · medidas de seguridad ─────────
v('cp', 'La custodia familiar. El sometido a esta medida quedará sujeto al cuidado y vigilancia', cols('MEDIDAS DE SEGURIDAD (cuadro del temario · art. 96)', [
  { t: Y('PRIVATIVAS DE LIBERTAD'), l: [`${D('El internamiento')} en centro ${Y('psiquiátrico')}.`, `${D('El internamiento')} en centro de ${Y('deshabituación')}.`, `${D('El internamiento')} en centro ${Y('educativo especial')}.`] },
  { t: Y('NO PRIVATIVAS DE LIBERTAD'), l: [Y('La inhabilitación profesional.'), `${Y('La expulsión del territorio nacional')} de extranjeros ${K('no residentes legalmente')} en España.`, Y('La libertad vigilada.'), Y('La custodia familiar.'), `${Y('La privación del derecho a conducir')} vehículos a motor y ciclomotores.`, Y('La privación del derecho a la tenencia y porte de armas.')] },
]));

// ───────── p41 · art. 97 ─────────
v('cp', 'Dejar en suspenso la ejecución de la medida en atención al resultado ya obtenido', flujo('Art. 97 CP · Durante la ejecución de la sentencia (cuadro del temario)', [
  { et: 'Quién y cuándo', c: 'o', t: `Respecto a las ${Y('medidas de seguridad impuestas')}, el ${G('Juez o Tribunal sentenciador')} ${D('adoptará')} alguna de las siguientes decisiones durante la ejecución de la sentencia:` },
  { bif: [
    { et: 'MANTENER', c: 'v', t: `${D('Mantener')} la ejecución de la medida de seguridad impuesta.` },
    { et: 'DECRETAR EL CESE', c: 'c', t: `${D('Decretar el cese')} en cuanto ${Y('desaparezca la peligrosidad criminal')} del sujeto.` }] },
  { et: 'SUSTITUIR', c: 'o', t: `${D('Sustituir')} la medida por ${Y('otra que estime más adecuada')}, pero en el caso de: ${Y('sustituir la medida')} + ${Y('evolución desfavorable del sujeto')} = ${D('dejar sin efecto')} la sustitución y ${D('volver a aplicar')} la medida sustituida.` },
  { et: 'DEJAR EN SUSPENSO', c: 'v', t: `${D('Dejar en suspenso')} la ejecución de la medida: atendiendo al resultado ya obtenido con la aplicación de la medida · ${K('suspensión por un plazo no superior')} al que reste hasta el máximo señalado en la sentencia que la impuso · ${K('condicionada a que el sujeto no delinca')} durante el plazo fijado (queda sin efecto la suspensión cuando se constate alguna de las circunstancias del art. 95 CP).` },
]));

// ───────── p43 · art. 98 ─────────
v('cp', 'Se oirá asimismo a las víctimas del delito que no estuvieren personadas', flujo('Art. 98 CP · Cuando una medida de seguridad deba ejecutarse DESPUÉS del cumplimiento de una pena privativa de libertad (cuadro del temario)', [
  { bif: [
    { et: 'MEDIDA PRIVATIVA DE LIBERTAD o LIBERTAD VIGILADA', c: 'o', t: `${G('JUEZ DE VIGILANCIA PENITENCIARIA')}: obligado a elevar ${P('al menos anualmente')} propuesta de ${Y('mantenimiento, cese, sustitución o suspensión')} de la medida. Debiendo valorar: ${Y('informes')} de los facultativos · informes de los profesionales que asistan al sometido a medida de seguridad · informes por las ${G('Administraciones Públicas')} competentes · resultados de demás actuaciones que a este fin ordene.` },
    { et: 'CUALQUIER OTRA MEDIDA NO PRIVATIVA DE LIBERTAD', c: 'v', t: `${G('JUEZ o TRIBUNAL SENTENCIADOR')} ${D('recabará directamente')} de las ${G('Administraciones, facultativos y profesionales')} los oportunos informes acerca de la situación y evolución del condenado, su grado de rehabilitación y el pronóstico de reincidencia o reiteración delictiva.` }] },
  { et: 'En todo caso', c: 'c', t: `El ${G('Juez o Tribunal sentenciador')} ${D('resolverá motivadamente')} a la vista de la ${Y('propuesta del JVP o los informes')} · ${D('oirá')} a la persona sometida a la medida, al ${G('Ministerio Fiscal')} y demás partes · ${D('se oirá')} a las ${Y('víctimas del delito que no estuvieren personadas')} cuando así lo hubieran solicitado al inicio o en cualquier momento de la ejecución de la sentencia y permanezcan localizables a tal efecto.` },
]));

// ───────── p59-64 · art. 131 · prescripción de los delitos ─────────
v('cp', 'En los supuestos de concurso de infracciones o de infracciones conexas', tabla('PRESCRIPCIÓN DE LOS DELITOS · pena máxima señalada por la ley (cuadro del temario · art. 131)', ['Prescriben', 'Pena máxima señalada por la ley'], [
  { p: '20 años', c: 'n', t: `${Y('Prisión')} de ${P('quince o más años')}.` },
  { p: '15 años', c: 'o', t: `${Y('Inhabilitación')} por ${P('más de diez años')} · ${Y('prisión')} por ${P('más de diez y menos de quince años')}.` },
  { p: '10 años', c: 'v', t: `${Y('Prisión o inhabilitación')} por ${P('más de cinco años')} y que ${K('no exceda de diez')}.` },
  { p: '5 años', c: 'c', t: `${Y('Los demás delitos')}.` },
  { p: '1 año', c: 'n', t: `${Y('Delitos leves')} y los delitos de ${Y('injurias y calumnias')}.` },
  { l: 'NO PRESCRIBEN', c: 'o', h: [
    { t: `${Y('Delitos de lesa humanidad y de genocidio')} y los ${Y('delitos contra las personas y bienes protegidos en caso de conflicto armado')}, ${K('salvo')} los castigados en el art. 614: ${K('no prescribirán en ningún caso')}.` },
    { t: `${K('Tampoco')} prescribirán los ${Y('delitos de terrorismo')}, si hubieren causado la ${P('muerte de una persona')}.` }] },
]));

// ───────── p63 · art. 133 · prescripción de las penas ─────────
v('cp', 'Tampoco prescribirán las penas impuestas por delitos de terrorismo', tabla('PRESCRIPCIÓN DE LAS PENAS · pena máxima señalada por la ley (cuadro del temario · art. 133)', ['Prescriben', 'Pena impuesta por sentencia firme'], [
  { p: '30 años', c: 'n', t: `${Y('Prisión')} por ${P('más de 20 años')}.` },
  { p: '25 años', c: 'o', t: `${Y('Prisión')} de ${P('15 o más años')} sin que excedan de ${P('20')}.` },
  { p: '20 años', c: 'v', t: `${Y('Inhabilitación')} por ${P('más de 10 años')} y las de ${Y('prisión')} por ${P('más de 10 y menos de 15')}.` },
  { p: '15 años', c: 'c', t: `${Y('Inhabilitación')} por ${P('más de seis años')} y que ${K('no excedan de 10')}, y las de ${Y('prisión')} por ${P('más de cinco años')} y que ${K('no excedan de 10')}.` },
  { p: '10 años', c: 'n', t: `${Y('Las restantes penas graves')}.` },
  { p: '5 años', c: 'o', t: `${Y('Las penas menos graves')}.` },
  { p: '1 año', c: 'v', t: `${Y('Las penas leves')}.` },
  { l: 'NO PRESCRIBEN', c: 'c', h: [
    { t: `Las impuestas por ${Y('delitos de lesa humanidad y de genocidio')} y por los ${Y('delitos contra las personas y bienes protegidos en caso de conflicto armado')}, ${K('salvo')} los castigados en el art. 614.` },
    { t: `${K('Tampoco')} las impuestas por ${Y('delitos de terrorismo')}, si estos hubieren causado la ${P('muerte de una persona')}.` }] },
]));

// ───────── p63 · art. 135 · prescripción de las medidas de seguridad ─────────
v('cp', 'Si el cumplimiento de una medida de seguridad fuere posterior al de una pena', cols('PRESCRIPCIÓN DE LAS MEDIDAS DE SEGURIDAD (cuadro del temario · art. 135)', [
  { t: Y('PRIVATIVAS DE LIBERTAD SUPERIORES A TRES AÑOS'), l: [`A los ${P('diez años')}.`] },
  { t: Y('PRIVATIVAS DE LIBERTAD IGUALES O INFERIORES A TRES AÑOS o con otro contenido'), l: [`A los ${P('cinco años')}.`] },
]));

// ───────── cajas de trampas (3/11/2026): cifras y redacciones que se confunden, todo literal del Código Penal ─────────
const T = (titulo, html) => `<div class="trampa"><b>⚠ ${titulo}</b><p>${html}</p></div>`;
const C = (de, ok, no) => T('Cifras que se confunden', `<em>${de}</em><strong>${ok}</strong> — ${no.map(x => 'no ' + x).join(' · ')}`);
v('cp', 'La pena de inhabilitación absoluta tendrá una duración de seis a 20 años', C('Duración de las penas de inhabilitación y suspensión (art. 40.1)', 'Absoluta 6 a 20 años · especial 3 meses a 20 años · suspensión de empleo o cargo público 3 meses a 6 años', ['absoluta 3 meses a 20', 'suspensión hasta 20 años', 'especial 6 a 20 años']));
v('cp', 'La pena de privación del derecho a conducir vehículos a motor y ciclomotores, y la de privación del derecho a la tenencia y porte de armas', C('Duración de las privaciones y prohibiciones (art. 40.2-4)', 'Conducir y armas 3 meses a 10 años · residir hasta 10 años · aproximarse o comunicarse 1 mes a 10 años · trabajos en beneficio de la comunidad 1 día a 1 año', ['conducir y armas de 1 día a 10 años', 'trabajos de 1 mes a 1 año', 'aproximarse hasta 5 años']));
v('cp', 'La cuota diaria tendrá un mínimo de dos y un máximo de 400 euros', C('Cuota diaria de la multa (art. 50.4)', '2 a 400 euros · personas jurídicas 30 a 5.000 euros', ['3 a 500 euros', 'personas jurídicas 30 a 2.000 euros', 'personas jurídicas 2 a 5.000 euros']));
v('cp', 'La pena de prisión tendrá una duración mínima de tres meses y máxima de veinte', T('Ojo a la redacción', 'Prisión de más de cinco años: el juez <strong>«podrá» ordenar</strong> que el tercer grado no se conceda hasta cumplir <strong>la mitad de la pena</strong>; pero en los delitos enumerados (terrorismo, organización o grupo criminal, art. 183, Capítulo V del Título VIII…) <strong>«en cualquier caso»</strong>, sin potestad del juez.'));
v('cp', 'el penado no podrá disfrutar de permisos de salida hasta que haya cumplido', C('Permisos de salida en la prisión permanente revisable (art. 36.1)', '12 años (tercer grado a los 20, terrorismo) · 8 años (tercer grado a los 15, resto de casos)', ['8 años en terrorismo', '12 años en el resto', '15 y 20 años para los permisos']));
v('cp', 'Cuando concurra sólo una o dos circunstancias agravantes', T('Ojo a la redacción', '<strong>Una o dos agravantes</strong> → «aplicarán» la pena en la mitad superior (obligatorio). <strong>Más de dos agravantes</strong> y ninguna atenuante, o <strong>reincidencia cualificada</strong> → «podrán aplicar» la pena superior en grado (potestativo).'));
v('cp', 'Excepcionalmente, este límite máximo será', C('Límite máximo de cumplimiento (art. 76)', 'Regla general: triple de la pena más grave, máximo 20 años · 25 (alguno hasta 20 años) · 30 (alguno superior a 20) · 40 (dos superiores a 20, o terrorismo)', ['triple sin máximo', '25 si alguno es superior a 20', '30 con dos superiores a 20']));
v('cp', 'la progresión a tercer grado requerirá del cumplimiento', C('Prisión permanente revisable con otras penas (art. 78 bis)', 'Tercer grado: 18 años (resto > 5 años), 20 años (resto > 15), 22 años (dos permanentes, o una más 25 años o más) · suspensión: 25 años (letras a y b) o 30 años (letra c)', ['18 años si el resto excede de 15', '22 años con una sola permanente y 10 años de resto', 'suspensión a los 20 años']));
v('cp', 'A los veinte años, cuando la pena máxima señalada al delito sea prisión de quince o más', C('Prescripción de los delitos (art. 131)', '20 años (prisión de 15 o más) · 15 (inhabilitación más de 10, o prisión más de 10 y menos de 15) · 10 (más de 5 y hasta 10) · 5 (los demás) · 1 año (delitos leves, injurias y calumnias)', ['10 años para prisión de 15 o más', '3 años para los demás', '5 años en injurias y calumnias']));
v('cp', 'A los 30 años, las de prisión por más de 20 años', C('Prescripción de las penas (art. 133)', '30 años (prisión más de 20) · 25 (prisión de 15 a 20) · 20 · 15 · 10 (restantes graves) · 5 (menos graves) · 1 año (leves)', ['25 años para prisión de más de 20', '10 años para las menos graves', '2 años para las leves']));
v('cp', 'Las medidas de seguridad prescribirán a los diez años', C('Prescripción de las medidas de seguridad (art. 135)', '10 años (privativas de libertad de más de 3 años) · 5 años (de 3 años o menos, u otro contenido)', ['5 años para las de más de 3 años', '15 años', '3 años']));
v('cp', 'Seis meses para las penas leves', C('Cancelación de antecedentes penales (art. 136.1)', '6 meses (leves) · 2 años (hasta 12 meses y delitos imprudentes) · 3 años (menos graves < 3 años) · 5 años (menos graves ≥ 3 años) · 10 años (graves) · 50 años si hubo disolución o prohibición definitiva (apdo. 3)', ['1 año para las leves', '20 años en la disolución', '5 años para las graves']));
v('cp', 'La localización permanente tendrá una duración de hasta seis meses', C('Localización permanente (art. 37.1)', 'Hasta 6 meses', ['hasta 1 año', 'hasta 3 meses', 'hasta 12 días']));
v('cp', 'La multa de más de tres meses', T('Cifras que se confunden', '<strong>Multa de más de tres meses</strong> = pena <strong>menos grave</strong> · <strong>hasta tres meses</strong> = pena <strong>leve</strong> · la <strong>multa proporcional</strong>, cualquiera que sea su cuantía, es menos grave (salvo las de personas jurídicas, que son graves).'));

module.exports = V;
if (require.main === module) {
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  let h = L.get(s, 'T18_CP').html.replace(/<!--VIS18-->[\s\S]*?<!--\/VIS18-->/g, '');
  const insertos = []; let colocados = 0;
  for (const [, loc, vis] of V) {
    const k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; if (norm(h.slice(a, b)).includes(k)) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', loc.slice(0, 60)); continue; }
    insertos.push([i, vis]);
  }
  const orden = insertos.map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
  for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS18-->' + vis + '<!--/VIS18-->' + h.slice(i); colocados++; }
  s = L.put(s, 'T18_CP', h);
  fs.writeFileSync(F, s);
  console.log(`Tema 18: cuadros ${V.length}, colocados ${colocados}`);
}
