// Cuadros visuales del Tema 4 (La gestión de las fronteras de la UE): recrean los cuadros del temario subrayado de Prefortia
// («TEMA 4 FRONTERAS DE LA UE-08-08-2026.pdf», págs. 57, 63, 98-100, 150, 168, 173, 186 y 198) con el TEXTO LITERAL del cuadro y las MARCAS REALES
// del usuario: amarillo (concepto) Y, naranja/rosa (verbo/acción) D, azul (plazo/cifra) P, subrayado rojo K, subrayado a lápiz U,
// cuadrado azul CA, círculo O y asterisco AS. El verde (órganos) y el lila (futuros) los pone reglas-color.js sobre el texto.
// Se insertan tras la ficha del artículo que ilustran (visuales-lib.js → inserta) y los usa también expres-t4.js (module.exports = V).
// Uso: node prompts/herramientas/visuales-t4.js   (idempotente)
const L = require('./visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = L;
const U = x => `<u class="m-lapiz">${x}</u>`;
const CA = x => `<span class="m-caja">${x}</span>`;
const O = x => `<span class="m-circulo">${x}</span>`;
const AS = '<span class="m-ast"></span>';
const KY = x => K(Y(x));
const KD = x => K(D(x));
const pie = (html, txt) => html.replace(/<\/div>$/, `<div class="vis-flujo"><div class="vis-paso">${txt}</div></div></div>`);
const V = []; const v = (tras, html) => V.push([tras, html]);

// ───────── Art. 25-26 · restablecimiento de controles en fronteras interiores (PDF p. 57 = impresa 44; EX) ─────────
v('Artículos 25 y 25 bis', pie(tabla('Procedimiento en los casos de amenaza al orden público o la seguridad interior de un Estado miembro: RESTABLECIMIENTO DE CONTROLES FRONTERIZOS EN FRONTERAS INTERIORES (cuadro del temario · EX)', ['', 'IMPREVISIBLE  ·  PREVISIBLE'], [
  { l: D('¿Cuándo?'), c: 'o', h: [
    { p: 'IMPREVISIBLE', c: 'o', t: P('Inmediatamente.') },
    { p: 'PREVISIBLE', c: 'v', t: P('En fecha prevista.') }] },
  { l: D('Carácter'), c: 'o', h: [
    { p: 'IMPREVISIBLE', c: 'o', t: D('Excepcional.') }] },
  { l: D('Notificación'), c: 'o', h: [
    { p: 'IMPREVISIBLE', c: 'o', t: `• Al ${Y('Parlamento Europeo')}, al ${Y('Consejo')}, a la ${Y('Comisión')} y a los ${Y('demás Estados miembros')}.` },
    { p: 'IMPREVISIBLE', c: 'o', t: `• En el ${P('preciso momento')} de ${P('restablecerlos')} al ${Y('Parlamento Europeo')}.` },
    { p: 'PREVISIBLE', c: 'v', t: `• Al ${Y('Parlamento Europeo')}, al ${Y('Consejo')}, a la ${Y('Comisión')} y a los ${Y('demás Estados miembros')}.` },
    { p: 'PREVISIBLE', c: 'v', t: `${AS} • ${D('4 semanas de antelación')} con respecto al ${Y('restablecimiento')} ${O('o')} ${K('lo antes posible')} si el ${Y('EM adquiere conocimiento')} de las circunstancias que dan lugar a la necesidad de restablecer los controles fronterizos en las fronteras interiores en un ${KY('plazo inferior a')} ${P('4 semanas')} ${K('con respecto a la fecha prevista del restablecimiento.')}` }] },
  { l: D('Plazo'), c: 'o', h: [
    { p: 'IMPREVISIBLE', c: 'o', t: P('Máximo 1 mes.') },
    { p: 'PREVISIBLE', c: 'v', t: P('Hasta 6 meses.') }] },
  { l: D('¿Prórroga si la amenaza grave persiste?'), c: 'o', h: [
    { p: 'IMPREVISIBLE', c: 'o', t: `• Durante ${Y('períodos adicionales')}, hasta una ${P('duración máxima')} que ${CA(K('no'))} supere los ${P('3 meses')}.` },
    { p: 'PREVISIBLE', c: 'v', t: `• Por ${KY('períodos renovables')} de hasta 6 meses hasta una duración máxima que ${Y('no podrá ser superior a 2 años')} (con notificación a Parlamento Europeo, al Consejo, a la Comisión y a los demás Estados miembros).` }] },
  { l: D('Prórroga extra'), c: 'o', h: [
    { p: 'IMPREVISIBLE', c: 'o', t: D('NO') },
    { p: 'PREVISIBLE', c: 'v', t: `${O('Sí,')} período adicional de hasta 6 meses (notificación ${P('4 semanas antes de la prórroga')}, teniendo en cuenta el ${Y('dictamen, evaluación de riesgos, emisión')} ${P('dictamen Comisión 3 meses')} a partir de la notificación y proceso de consulta).` },
    { p: 'PREVISIBLE', c: 'v', t: `• ${Y('Periodo adicional definitivo de hasta 6 meses')}, en consonancia con ${Y('evaluación de riesgos y notificación')} a la Comisión, la cual ${KD('adoptará una recomendación.')}` }] }]),
  `${AS} <i>Tu marca:</i> círculo azul <b>EX</b> a la izquierda del cuadro. Imprevisible = 1 mes (+ prórrogas hasta 3 meses); previsible = hasta 6 meses (hasta 2 años con prórrogas).`));

// ───────── Art. 28 · espacio sin controles en las fronteras interiores (PDF p. 63 = impresa 48; EX ×2) ─────────
v('Artículos 26 a 28', pie(arbol('Art. 28 · ESPACIO SIN CONTROLES EN LAS FRONTERAS INTERIORES (cuadro del temario · EX)', `${Y('Emergencia de salud pública')} a gran escala: ${D('LA COMISIÓN')} → ${D('EL CONSEJO')} → ${D('ESTADOS MIEMBROS')}`, [
  { t: `${O('5×')} <b>LA COMISIÓN</b> · (1) ${AS} ${KD('Determina')} la ${Y('existencia de una emergencia de salud pública')} a gran escala que afecta a ${Y('varios Estados miembros')}, poniendo en peligro el ${Y('funcionamiento general del espacio sin controles en las fronteras interiores')}.`,
    sub: [`(2) ${D('Podrá presentar')} una ${Y('propuesta')} al Consejo para que este adopte una:`] },
  { t: `<b>EL CONSEJO</b> · (3) ${AS} ${KD('Decisión de ejecución')} por la que:`,
    sub: [`• ${D('Se autorice')} el ${Y('restablecimiento de los controles fronterizos')} por parte de los Estados miembros que ${CA('incluya')} las ${Y('medidas de mitigación adecuadas')} que podrán establecerse a escala nacional y de la Unión, ${CA('cuando')} las ${Y('medidas disponibles')} contempladas en los artículos 21 bis y 23 ${K('no sean suficientes')}.`,
      `• ${D('Abarcará')} un ${P('período de hasta 6 meses')} y ${O('podrá renovarse')}, a propuesta de la Comisión, durante ${P('períodos adicionales de hasta 6 meses')} ${CA('mientras')} persista la emergencia.`,
      `(4) ${KD('Revisará periódicamente')} la ${Y('evolución de la emergencia de salud pública')} a gran escala ${CA('así como')} las ${Y('repercusiones de las medidas')} adoptadas de conformidad con la decisión de ejecución del Consejo, con el fin de evaluar si siguen estando justificadas y si no es el caso, proponer la supresión de los ${Y('controles fronterizos')} tan pronto como sea posible.`] },
  { t: `<b>ESTADOS MIEMBROS</b>`,
    sub: [`${CA('Podrán solicitar')} a la Comisión que presente al Consejo dicha propuesta.`,
      `${D('Notificarán inmediatamente')} el ${Y('restablecimiento de controles fronterizos')} ${CA('de conformidad con')} la decisión.`,
      `${D('Podrán adoptar otras medidas')}, que la Comisión ${CA('tendrá en cuenta')} en su revisión.`] }]),
  `${AS} <i>Tu marca:</i> «EX» manuscrito junto al Consejo y «5×» en el círculo de La Comisión.`));

// ───────── EUROSUR (PDF págs. 98-100: 3 págs. apaisadas, Reglamento 2019/1896) ─────────
v('Artículos 20, 21, 23, 25 y 28', tabla('EUROSUR · Reglamento (UE) 2019/1896 (1/3 · págs. 98 del temario)', ['Apartado', 'Contenido'], [
  { l: D('TAREAS DE LA AGENCIA EUROPEA DE LA GUARDIA DE FRONTERAS Y COSTAS (Frontex)'), c: 'o', h: [
    { t: `• ${KY('Apoyar el desarrollo y el funcionamiento de EUROSUR')} es una de las tareas de la Agencia (${P('art. 10.1.f')}).` },
    { t: `• ${KD('Podrá tratar datos personales')} ${Y('solo con el fin')}, entre otros, de desempeñar sus funciones en el marco de EUROSUR (${P('arts. 87.1.f y 89')}).` },
    { t: `• ${KD('Presentará')} al Parlamento Europeo y al Consejo ${KY('un informe sobre el funcionamiento de EUROSUR')} ${P('a más tardar el 1 de diciembre de 2021')}, y posteriormente ${P('cada dos años')}. Los Estados miembros facilitarán a la Agencia la información necesaria para elaborar dichos informes (${P('art. 121.5')}).` }] },
  { l: D('DEFINICIÓN'), c: 'v', h: [
    { t: `El marco para el ${KD('intercambio de información y la cooperación')} entre los Estados miembros y la Agencia Europea de la Guardia de Fronteras y Costas (${P('art. 2.9')}). ${O('EUROSUR')}` }] },
  { l: D('DESTINO Y FINALIDAD'), c: 'c', h: [
    { t: `• ${U('Destinado')} a ${KD('mejorar el conocimiento de la situación')} y ${KD('aumentar la capacidad de reacción')} a efectos de la gestión de las fronteras.` },
    { t: `• ${CA('En particular')} con el fin de ${KD('detectar, prevenir y combatir la inmigración ilegal y la delincuencia transfronteriza.')}` },
    { t: `• Y de contribuir a garantizar la protección y el salvamento de las vidas de los migrantes (${U('art. 18')}).` }] },
  { l: D('ÁMBITO DE APLICACIÓN'), c: 'o', h: [
    { t: `• ${KY('Se utilizará')} para realizar ${KD('inspecciones fronterizas')} en los ${Y('pasos fronterizos autorizados')} y para la ${KD('vigilancia')} de las ${Y('fronteras exteriores')} terrestres, marítimas y aéreas, ${KD('incluido')} el seguimiento, detección, identificación, rastreo, prevención e interceptación del cruce no autorizado de las fronteras, con el ${KD('fin de detectar, prevenir y combatir')} la inmigración ilegal y la delincuencia transfronteriza y de contribuir a garantizar la protección y el salvamento de las vidas de los migrantes.` },
    { t: `• ${KY('No se utilizará')} para ninguna ${KD('medida judicial o administrativa')} que se adopte ${P('a partir del momento')} en que las autoridades competentes de un Estado miembro hayan ${KD('interceptado actividades delictivas')} transfronterizas ${Y('o cruces no autorizados')} de las fronteras exteriores por personas (${U('art. 19')}).` }] }]));

v('Artículos 20, 21, 23, 25 y 28', tabla('EUROSUR · Reglamento (UE) 2019/1896 (2/3 · págs. 99 del temario)', ['Apartado', 'Contenido'], [
  { l: D('GUÍA PRÁCTICA'), c: 'o', h: [
    { t: `• La Comisión, ${KD('en estrecha cooperación')} con la Agencia y con cualquier otro órgano u organismo de la Unión pertinente, ${D('adoptará y facilitará')} una ${KY('guía práctica para la implantación y la gestión de EUROSUR')} (en lo sucesivo, «${KY('Guía práctica de EUROSUR')}»).` },
    { t: `• Dicha Guía práctica de EUROSUR ${D('proporcionará')} ${KD('orientaciones técnicas y operativas, recomendaciones e información sobre las prácticas más idóneas')}, ${CA('en particular')} en lo que se refiere a la ${Y('cooperación con terceros países')}.` },
    { t: `• La Comisión ${D('aprobará')} la Guía práctica de EUROSUR en forma de una ${KD('recomendación')} (${P('art. 22.1')}).` }] },
  { l: D('CONTROL'), c: 'v', h: [
    { t: `• La Agencia y los Estados miembros ${D('se asegurarán')} de que existen ${KD('procedimientos para controlar el funcionamiento técnico y operativo')} de EUROSUR a la luz de los objetivos fijados, es decir, ${KD('lograr un conocimiento de la situación y una capacidad de reacción adecuados')} en las ${Y('fronteras exteriores')}.` },
    { t: `• La Agencia ${D('controlará')} ${KY('de manera continua')} la calidad del servicio ofrecido por la red de comunicación del ${P('art. 14')} y la calidad de los datos compartidos en el mapa de situación europeo (${P('art. 23')}).` }] },
  { l: D('COOPERACIÓN'), c: 'c', h: [
    { t: `• La Agencia ${KD('cooperará con las instituciones, órganos y organismos de la Unión')} y ${KD('podrá cooperar con organizaciones internacionales')}, dentro de sus respectivos marcos jurídicos, y utilizará la ${Y('información')}, los ${Y('recursos')} y los ${Y('sistemas existentes disponibles')} en el marco de EUROSUR (${P('art. 68.1')}).` },
    { t: `• La Agencia ${D('facilitará')} la ${Y('cooperación operativa')} de los Estados miembros con ${KD('Irlanda y el Reino Unido')} en ${Y('actividades concretas')} (${P('art. 70.1')}).` },
    { t: `• A efectos de EUROSUR, el ${Y('intercambio de información y la cooperación')} con Irlanda y el Reino Unido ${D('podrán realizarse')} sobre la base de ${KD('acuerdos bilaterales o multilaterales')} entre cualquiera de dichos países y uno o varios Estados miembros vecinos, ${Y('o a través de redes regionales fundamentadas en esos acuerdos')}. Los centros nacionales de coordinación ${D('serán el punto de contacto')} para el ${Y('intercambio de información')} con las autoridades correspondientes de Irlanda y del Reino Unido en el marco de EUROSUR (${P('art. 70.2')}).` },
    { t: `• La información que, en el contexto de EUROSUR, ${Y('proporcionen')} la Agencia o un Estado miembro que ${KD('no participe en los acuerdos')} a que se refiere el apartado 2, ${KD('no se compartirá con Irlanda o el Reino Unido sin la aprobación previa de la Agencia o de aquel Estado miembro')}. La negativa a ${Y('compartir dicha información')} con Irlanda o con el Reino Unido ${D('será vinculante')} para los Estados miembros y para la Agencia (${P('art. 70.4')}).` },
    { t: `• Los Estados miembros ${KD('podrán cooperar a nivel operativo con uno o varios terceros países')} en los ${Y('ámbitos')} que abarca el ${Y('presente Reglamento')}. La cooperación podrá incluir el intercambio de ${Y('información')} y podrá tener lugar con arreglo a ${Y('acuerdos bilaterales o multilaterales')}, ${CA('mediante')} ${Y('otro tipo de acuerdos')} ${CA('o a través')} de ${Y('redes regionales')} establecidas con arreglo a dichos acuerdos (${P('art. 72.1')}).` }] },
  { l: D('INTERCAMBIO DE INFORMACIÓN'), c: 'o', h: [
    { t: `• Los ${CA('CCNNCC y, cuando proceda,')} la Agencia ${D('serán')} los ${KD('puntos de contacto para el intercambio de información y la cooperación')} con terceros países a efectos de EUROSUR (${P('art. 75.1')}).` }] }]));

v('Artículos 20, 21, 23, 25 y 28', tabla('EUROSUR · Reglamento (UE) 2019/1896 (3/3 · págs. 100 del temario)', ['Apartado', 'Contenido'], [
  { l: D('TRATAMIENTO DE LOS DATOS PERSONALES'), c: 'o', h: [
    { t: `• Los ${Y('intercambios de datos personales')} con terceros países en el contexto de EUROSUR ${KD('se limitarán estrictamente')} a lo que sea ${KY('absolutamente necesario')} para los ${Y('fines del presente Reglamento')}.` },
    { t: `• La Agencia los ${D('realizará')} de conformidad con el capítulo V del ${Y('Reglamento (UE) 2018/1725')}, y los ${Y('Estados miembros')} de conformidad con el capítulo V del ${Y('Reglamento (UE) 2016/679')} y el capítulo V de la ${Y('Directiva (UE) 2016/680')}, ${U('según proceda, y con las disposiciones nacionales aplicables')} sobre protección de datos que transpongan dicha Directiva (${P('art. 89.4')}).` }] },
  { l: D('DEROGACIÓN Y DISPOSICIONES TRANSITORIAS'), c: 'v', h: [
    { t: `${P('Hasta el 5 de diciembre de 2021')}, los Estados miembros ${D('podrán facilitar')} información de forma voluntaria a EUROSUR ${CA('relativa')} a las ${Y('inspecciones fronterizas')} y la ${Y('vigilancia de las fronteras')} ${O('aéreas')} (${P('art. 123.7')}).` }] }]));

// ───────── Art. 34 · niveles de impacto (PDF p. 150 = impresa 120; R15, R16, R17) ─────────
v('Artículos 34 y 35', pie(plazos('Niveles de impacto atribuidos a las secciones de las fronteras exteriores (cuadro del temario · art. 34)', [
  ['BAJO · R15', `${Y('Impacto insignificante')}. «Nivel de impacto bajo», cuando los incidentes relacionados con la inmigración ilegal o la delincuencia transfronteriza que se produzcan en la sección de la frontera en cuestión tengan un impacto ${O('insignificante')} en la seguridad de las fronteras.`],
  ['MEDIO · R16', `${Y('Impacto moderado')}. «Nivel de impacto medio», cuando los incidentes relacionados con la inmigración ilegal o la delincuencia transfronteriza que se produzcan en la sección de la frontera en cuestión tengan un impacto ${O('moderado')} en la seguridad de las fronteras.`],
  ['ALTO · R17', `${Y('Impacto significativo')}. «Nivel de impacto alto», cuando los incidentes relacionados con la inmigración ilegal o la delincuencia transfronteriza que se produzcan en la sección de la frontera en cuestión tengan un impacto ${O('significativo')} en la seguridad de las fronteras.`],
  ['CRÍTICO · art. 34.2', `${D('Temporalmente')}: a fin de abordar rápidamente una situación de crisis, ${CA('cuando')} el análisis de riesgos muestre que los incidentes tengan un ${KY('impacto decisivo')} en la seguridad de las fronteras, la Agencia ${D('atribuirá temporalmente')} a dicha sección un nivel de impacto «${KY('CRÍTICO')}», de acuerdo con el Estado miembro afectado.`]]),
  `${AS} <i>Notas tuyas a mano:</i> «Temporalmente → CRÍTICO → Impacto decisivo».`));

// ───────── Art. 54 · cuerpo permanente: cuatro categorías (PDF p. 168 = impresa 138; R + ✱ + círculo EX) ─────────
v('Artículos 54 y 55', arbol('CUERPO PERMANENTE DE LA GUARDIA EUROPEA DE FRONTERAS Y COSTAS (cuadro del temario · art. 54.1)', `${Y('Cuerpo permanente')} con la capacidad definida en el anexo I · ${KY('cuatro categorías')} de personal`, [
  `<b>CATEGORÍA 1</b>: miembros del ${KY('personal estatutario')} ${D('desplegados')} como miembros de equipos en zonas de operaciones de conformidad con el artículo 55, ${Y('así como personal responsable del funcionamiento de la unidad central SEIAV')}.`,
  `<b>CATEGORÍA 2</b>: ${Y('personal adscrito a la Agencia')} enviado por los Estados miembros a la Agencia para una ${P('larga duración')} como parte del cuerpo permanente de conformidad con el artículo 56.`,
  `<b>CATEGORÍA 3</b>: ${Y('personal de los Estados miembros')} preparado para ser proporcionado a la Agencia para despliegues de ${P('corta duración')} como parte del cuerpo permanente, de conformidad con el artículo 57.`,
  `<b>CATEGORÍA 4</b>: ${KY('una reserva de reacción rápida')} compuesta por personal de los Estados miembros preparado para ser desplegado de conformidad con el artículo 58 a los efectos de ${Y('intervenciones fronterizas rápidas')} conforme al artículo 39.`]));

// ───────── Arts. 56-57 · contribución de los EEMM al cuerpo permanente (PDF p. 173 = impresa 143; notas a mano) ─────────
v('Artículos 56 a 58', pie(flujo('CONTRIBUCIÓN DE LOS EEMM EN EL CUERPO PERMANENTE (cuadro del temario · arts. 56-57)', [
  { t: `${Y('COMISIÓN DE SERVICIOS')} de larga duración · ${KD('Categoría 2')} (miembros de equipos) → ${P('duración')} (individuales)` },
  { t: `${Y('Inicio')}: generalmente, ${D('al principio de un año civil')}.` },
  { t: `${P('24 meses')} + ${KY('posibilidad de 1 prórroga')}: con el ${D('consentimiento')} del EEMM de ${CA('acogida')} y de la Agencia, ${P('por otros 12')} ${O('24 meses')}.` },
  { t: `<b>EEMM</b>: responsables de ${D('garantizar las contribuciones continuas')} de personal operativo en comisión de servicios. <b>EEMM de origen</b>: el que ${CA('envía')} en comisión de servicios al personal operativo.` },
  { t: `• <b>Director ejecutivo</b>: ${KD('decide el lugar/es y duración')} del despliegue/s de los miembros de los equipos en comisión de servicios en función de las necesidades operativas.\n• <b>Agencia</b>: ${D('garantizará')} la formación continua del personal operativo durante su comisión de servicios.\n• ${P('30 de junio de cada año')}: ${Y('fecha límite de designación')}, por cada EEMM, de los candidatos a la comisión de servicios de entre su personal operativo en función del número y los perfiles específicos, a comprobar por la Agencia.\n• ${P('15 de septiembre de cada año')}: fecha límite de la Agencia de ${KD('aceptar/rechazar los candidatos')}.\n• ${KD('Posibilidad de sustitución')} de un miembro de personal operativo en caso de ${KY('fuerza mayor')}.` }]),
  `${AS} <i>Notas tuyas a mano:</i> «≠ 01 de diciembre · CS corta duración» · «CS corta duración: disponible 4 meses dentro de un año civil» · «Complemento lista definitiva 1-12 a más tardar».`));

// ───────── Art. 66-67 · investigación e innovación por la Agencia (PDF p. 186 = impresa 156; «solo esquema») ─────────
v('Artículos 67 a 70', pie(arbol('INVESTIGACIÓN E INNOVACIÓN POR LA AGENCIA (cuadro del temario · «solo esquema»)', `${Y('LA AGENCIA')} · ${KY('investigación e innovación')}`, [
  `${KY('Seguimiento proactivo y contribución')} en actividades de investigación e innovación para la ${Y('gestión europea integrada de las fronteras')}, teniendo en cuenta la hoja de ruta de capacidades.`,
  `${KD('Asistencia')} a los EEMM y a la Comisión en ${KD('determinación de temas clave de investigación')}, teniendo en cuenta la hoja de ruta de capacidades.`,
  `${KD('Asistencia')} a los EEMM y a la Comisión en la ${KD('definición y puesta en marcha de los programas marco de la Unión')} relevantes para las ${Y('actividades de investigación e innovación')}.`,
  { t: `${KD('Aplicación')} de las ${Y('secciones del Programa Marco de Investigación e Innovación relacionadas con la seguridad fronteriza')}. Funciones de la Agencia:`, sub: [`a) ${D('Gestionar')} determinadas etapas de la ejecución de los programas y algunas fases del ciclo de vida de proyectos específicos.`, `b) ${D('Adoptar')} los instrumentos de ejecución presupuestaria relativos a ingresos y gastos.`, `c) ${D('Prestar apoyo')} a la ejecución de los programas.`] },
  `${CA('Podrá')} ${D('programar y realizar proyectos piloto')} de acuerdo con el presente Reglamento.`,
  `${D('Publicará')} información sobre sus proyectos de investigación.`]),
  `${AS} <i>Nota tuya a mano:</i> «SOLO ESQUEMA».`));

// ───────── Art. 81 · código de conducta (PDF p. 198 = impresa 168; R + ✱) ─────────
v('Artículos 82, 84 y 85', arbol('CÓDIGO DE CONDUCTA (cuadro del temario · art. 81)', `${KY('CÓDIGO DE CONDUCTA')}: elaborado y desarrollado por la Agencia en cooperación con el foro consultivo`, [
  { t: `${Y('Aplicable a las operaciones de control fronterizo')} coordinadas por la Agencia y a todas las personas que participen en las actividades de la Agencia, fijando los procedimientos destinados a garantizar los principios del Estado de Derecho y el respeto de los derechos fundamentales.`, sub: [`${KY('Especial atención')} a personas vulnerables, incluidos los niños, los menores no acompañados y otras personas en una situación vulnerable, así como a las personas que tratan de obtener protección internacional.`] },
  { t: `${Y('Aplicable a las operaciones de retorno y las intervenciones de retorno')} coordinadas u organizadas por la Agencia, especificando los procedimientos comunes normalizados para simplificar la organización de las mismas y garantizar que se realicen de forma humanitaria, con pleno respeto de los derechos fundamentales.`, sub: [`${KY('En particular')}, los principios de la dignidad humana, la prohibición de la tortura y de las penas o los tratos inhumanos o degradantes, el derecho a la libertad y a la seguridad, el derecho a la protección de los datos personales y a la no discriminación.`] },
  `El ${Y('código de conducta en materia de retorno')} se centrará especialmente en la obligación de los EEMM de ${KD('establecer un sistema efectivo para el seguimiento del retorno forzoso')}.`]));

module.exports = V;
if (require.main !== module) return;   // al importarlo desde expres-t4.js solo se exportan los cuadros
L.inserta(4, V);
