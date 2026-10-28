// Cuadros visuales del Tema 16: recrean los cuadros de tu temario subrayado (PDF 08-08-2026) con su TEXTO LITERAL y tus marcas, más dos propios (plazos del Protocolo y FFAA/FCSE).
//   LO 3/2007: p7 definiciones (arts. 6-7) · p8 art. 11 · p9 art. 12 · p17 arts. 65 y 67 · p17 art. 64 | RD 247/2024: p25 ámbito, garantías y definiciones · p24 objetivos · p28 4.1 · p30 VI · p32 Anexo II y Anexo IV
// COLORES: los de tu PDF son fosforito sobre imagen; aquí van por el método (concepto → amarillo, verbo → naranja, órgano → verde, plazo/cifra → azul, no/salvo → rojo subrayado). Se avisa en el informe.
// Se insertan en los bloques T16_* de esquemas.html tras la ficha que contiene el texto localizador. Los usa también expres-t16.js (module.exports = V).
// Uso: node prompts/herramientas/tema16/visuales-t16.js   (idempotente: sustituye los cuadros anteriores marcados con <!--VIS16-->)
const fs = require('fs'), path = require('path');
const L = require('../literal-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const U = x => `<u class="m-lapiz">${x}</u>`;
const CA = x => `<span class="m-caja">${x}</span>`;
const O = x => `<span class="m-circulo">${x}</span>`;
const AS = '<span class="m-ast"></span>';
const pie = t => `<p class="nota-manuscrita" style="font-style:italic;opacity:.85;margin:6px 4px 0">✎ ${t}</p>`;
const V = []; const v = (bloque, loc, html) => V.push([bloque, loc, html]);

// ───────── LO · p7 · definiciones (tras el art. 7) ─────────
v('T16_LO', 'El condicionamiento de un derecho o de una expectativa de derecho a la aceptación', tabla('DEFINICIONES · DISCRIMINACIÓN Y ACOSO (cuadro del temario · arts. 6 y 7)', ['Concepto', 'Definición (texto literal)'], [
  { l: `DISCRIMINACIÓN DIRECTA POR RAZÓN DE SEXO`, c: 'o', h: [{ t: `${Y('Situación en que se encuentra una persona')} que ${D('sea, haya sido o pudiera ser tratada')}, en atención a su sexo, de manera ${K('menos favorable')} que otra en situación comparable.` }] },
  { l: `DISCRIMINACIÓN INDIRECTA POR RAZÓN DE SEXO`, c: 'o', h: [{ t: `La situación en que una ${Y('disposición, criterio o práctica aparentemente neutros')} pone a personas de un sexo en ${Y('desventaja particular')} con respecto a personas del otro, ${K('salvo que')} dicha disposición, criterio o práctica puedan justificarse ${Y('objetivamente')} en atención a una ${Y('finalidad legítima')} y que los medios para alcanzar dicha finalidad sean ${Y('necesarios y adecuados')}.` }] },
  { l: `ACOSO SEXUAL`, c: 'v', h: [{ t: `Cualquier ${Y('comportamiento, verbal o físico, de naturaleza sexual')} que tenga el ${Y('propósito o produzca el efecto')} de atentar contra la ${Y('dignidad')} de una persona, en particular cuando se crea un ${Y('entorno intimidatorio, degradante u ofensivo')}.` }] },
  { l: `ACOSO POR RAZÓN DE SEXO`, c: 'v', h: [{ t: `Cualquier ${Y('comportamiento realizado en función del sexo')} de una persona, con el ${Y('propósito o el efecto')} de atentar contra su ${Y('dignidad')} y de crear un ${Y('entorno intimidatorio, degradante u ofensivo')}.` }] },
]));

// ───────── LO · p8 · art. 11 acciones positivas ─────────
v('T16_LO', 'Con el fin de hacer efectivo el derecho constitucional de la igualdad, los Poderes Públicos adoptarán', tabla('ACCIONES POSITIVAS (cuadro del temario · art. 11)', ['Elemento', 'Contenido (texto literal)'], [
  { l: 'Fin', c: 'o', h: [{ t: `${D('Hacer efectivo')} el ${Y('derecho constitucional de la igualdad')}.` }] },
  { l: 'Consisten', c: 'o', h: [{ t: `${Y('Medidas específicas en favor de las mujeres')} para ${D('corregir')} situaciones patentes de ${Y('desigualdad de hecho')} respecto de los hombres.` }] },
  { l: 'Duración', c: 'n', h: [{ t: `${Y('Mientras subsistan')} dichas situaciones.` }] },
  { l: 'Requisitos', c: 'o', h: [{ t: `Habrán de ser ${Y('razonables y proporcionadas')} en relación con el objetivo perseguido en cada caso.` }] },
  { l: '¿Quiénes las adoptan?', c: 'v', h: [
    { t: `Los ${G('Poderes Públicos')} → ${O('adoptarán')}.` },
    { t: `También las ${Y('personas físicas y jurídicas privadas')} ${O('podrán')} adoptar este tipo de medidas en los términos establecidos en la presente Ley. ${AS}` }] },
]) + pie('«adoptarán» (Poderes Públicos) ≠ «podrán» (privados): obligación frente a facultad.'));

// ───────── LO · p9 · art. 12 tutela judicial efectiva ─────────
v('T16_LO', 'Cualquier persona podrá recabar de los tribunales la tutela del derecho a la igualdad', tabla('ART. 12 LEY ORGÁNICA 3/2007 · TUTELA JUDICIAL EFECTIVA (cuadro del temario)', ['Concepto', 'Contenido (texto literal)'], [
  { l: 'TUTELA JUDICIAL EFECTIVA', c: 'o', h: [
    { t: `${Y('CUALQUIER PERSONA')} podrá recabar la tutela del derecho a la igualdad entre mujeres y hombres (conforme artículo 53.2 Constitución).` },
    { t: `Se podrá recabar la tutela, ${K('incluso')} ${Y('tras la terminación de la relación')} en la que supuestamente se ha producido la discriminación.` }] },
  { l: 'Capacidad y legitimación', c: 'v', h: [
    { t: `Para intervenir en los procesos: ${Y('Civiles')}, ${Y('Sociales')}, y ${Y('Contencioso-administrativos')} que versen sobre la defensa del derecho de igualdad.` },
    { t: `Corresponde a: las ${Y('personas físicas y jurídicas con interés legítimo')} (determinadas en las Leyes reguladoras de estos procesos).` }] },
  { l: 'En los litigios sobre acoso', c: 'v', h: [
    { t: `${Y('Acoso sexual')} y ${Y('acoso por razón de sexo')}: corresponde a la ${G('persona acosada')} (será la ${K('única legitimada')}).` }] },
]));

// ───────── LO · p17 · art. 64 Plan de Igualdad ─────────
v('T16_LO', 'El Gobierno aprobará, al inicio de cada legislatura, un Plan para la Igualdad', arbol('PLAN PARA LA IGUALDAD ENTRE MUJERES Y HOMBRES EN LA AGE Y EN LOS ORGANISMOS PÚBLICOS VINCULADOS O DEPENDIENTES DE ELLA (cuadro del temario · art. 64 · «IMPORTANTÍSIMO»)', `${O('EXOF')} Plan para la Igualdad entre Mujeres y Hombres en la Administración General del Estado y en los Organismos Públicos vinculados o dependientes de ella`, [
  `${D('Aprueba')} el ${G('Gobierno')} ${P('al inicio de cada legislatura')}.`,
  `${D('Establecerá')} los ${Y('objetivos a alcanzar')} en materia de promoción de la igualdad de trato y oportunidades en el empleo público, así como las ${Y('estrategias o medidas')} a adoptar para su consecución.`,
  `${Y('Objeto de negociación')}, y en su caso acuerdo, con la representación legal de los empleados públicos en la forma que se determine en la legislación sobre negociación colectiva en la Administración Pública.`,
  `Su cumplimiento será evaluado ${P('anualmente')} por el ${G('Consejo de Ministros')}. ${CA('anualmente')}`,
]));

// ───────── LO · p17 · arts. 65 y 67 FFAA / FCSE ─────────
v('T16_LO', 'Las normas reguladoras de las Fuerzas y Cuerpos de Seguridad del Estado promoverán', cols('FUERZAS ARMADAS (art. 65) · FUERZAS Y CUERPOS DE SEGURIDAD DEL ESTADO (art. 67) · cuadros del temario', [
  { t: `${G('Fuerzas Armadas')} · art. 65`, l: [`Las normas sobre personal ${D('procurarán')} la efectividad del principio de igualdad entre mujeres y hombres, en especial en lo que se refiere al ${O('régimen')} de:`, `${Y('acceso')}`, `${Y('formación')}`, `${Y('ascensos')}`, `${Y('destinos')} y`, `${Y('situaciones administrativas')}`] },
  { t: `${G('Fuerzas y Cuerpos de Seguridad del Estado')} · art. 67`, l: [`Las normas reguladoras ${D('promoverán')} la igualdad efectiva entre mujeres y hombres, ${K('impidiendo')} cualquier situación de discriminación profesional, especialmente, en el ${O('sistema')} de:`, `${Y('acceso')}`, `${Y('formación')}`, `${Y('ascensos')}`, `${Y('destinos')} y`, `${Y('situaciones administrativas')}`] },
]) + pie('Régimen de acceso, formación, ascensos, destinos y situaciones administrativas · «que no pongan claves pasivas» (anotación de tu temario).'));

// ───────── LO · propio · arts. 66 y 68 ─────────
v('T16_LO', 'prevención de la violencia de género y la violencia sexual, y la conciliación de la vida personal, familiar y profesional serán de aplicación en las Fuerzas y Cuerpos de Seguridad', cols('FFAA (art. 66) frente a FCSE (art. 68): aplicación de las normas del personal de las Administraciones públicas', [
  { t: `${G('Fuerzas Armadas')} · art. 66`, l: [`Materias: igualdad, ${Y('protección integral contra la violencia de género')} y la violencia sexual, y la conciliación de la vida personal, familiar y profesional.`, `Serán de aplicación con las ${Y('adaptaciones que resulten necesarias')}.`, `En los términos establecidos en su ${Y('normativa específica')}.`] },
  { t: `${G('Fuerzas y Cuerpos de Seguridad')} · art. 68`, l: [`Materias: igualdad, ${Y('prevención de la violencia de género')} y la violencia sexual, y la conciliación de la vida personal, familiar y profesional.`, `Serán de aplicación ${D('adaptándose')}, en su caso, a las ${Y('peculiaridades de las funciones')} que tienen encomendadas.`, `En los términos establecidos por su ${Y('normativa específica')}.`] },
]));

// ───────── RD · 2.2.1 objetivos ─────────
v('T16_RDC', '2.2.1 Objetivo general y objetivos específicos', arbol('OBJETIVOS DEL PROTOCOLO (cuadro del temario · 2.2.1)', `${Y('Objetivo general')}: ${D('Evitar')} las posibles situaciones de acoso sexual y acoso por razón de sexo en la ${G('Administración General del Estado')} y en los organismos vinculados o dependientes de la misma y ${D('afrontarlas de manera efectiva')} en caso de que éstas lleguen a producirse. ${O('EX')}`, [
  `${Y('1.º Fomentar la cultura preventiva')} del acoso sexual y/o por razón de sexo en todos los ámbitos y estamentos de la Administración General del Estado.`,
  `${Y('2.º Manifestar la tolerancia cero')} de la Administración General del Estado frente a las situaciones de acoso sexual y por razón de sexo que puedan detectarse en cualesquiera estamentos de la organización.`,
  `${Y('3.º Facilitar la identificación')} de las conductas constitutivas de acoso en sus distintas modalidades de acoso sexual y por razón de sexo.`,
  `${Y('4.º Implantar un mecanismo')} sencillo, rápido, accesible y confidencial que permita a las víctimas de acoso realizar una notificación de la situación que está sufriendo.`,
  `${Y('5.º Informar, formar y sensibilizar')} a las empleadas y empleados públicos en materia de acoso sexual y acoso por razón de sexo, dando pautas para identificar dichas situaciones, prevenirlas y evitar que se produzcan.`,
  `${Y('6.º Esclarecer internamente')}, de manera ágil, rápida y confidencial las comunicaciones de acoso en aras a precisar si se ha producido una situación de acoso sexual y/o por razón de sexo.`,
  `${Y('7.º Garantizar la seguridad, integridad y dignidad')} de las personas implicadas, la aplicación de las medidas que en cada caso procedan para la protección de las víctimas en todo momento, apoyando a la persona que ha sufrido el acoso para evitar su victimización secundaria, impulsando la adopción de las medidas que sean oportunas para eliminar el acoso sexual o por razón de sexo.`,
  `${Y('8.º Seguimiento')} de las actuaciones derivadas de la activación del protocolo.`,
]));

// ───────── RD · 2.2.2 ámbito de aplicación ─────────
v('T16_RDC', '2.2.2 Ámbito de aplicación', tabla('ÁMBITO DE APLICACIÓN (cuadro del temario · 2.2.2)', ['Quién', 'Contenido (texto literal)'], [
  { l: 'ÁMBITO DE APLICACIÓN', c: 'o', h: [
    { t: `Todo el ${Y('personal de la AGE')} y de los ${G('organismos públicos vinculados o dependientes')} de la misma.` },
    { t: `Las personas que, ${K('no')} teniendo una relación laboral, ${D('prestan servicios o colaboran')} con la AGE o algunos de sus organismos (personas en formación, prácticas no laborales…).` }] },
  { l: 'PODRÁ ACTIVAR EL PROTOCOLO PARA LA ADOPCIÓN DE MEDIDAS NECESARIAS', c: 'v', h: [
    { t: `El ${Y('personal perteneciente a empresas externas')} que desarrollen su trabajo en centros de la AGE.` },
    { t: `El ${Y('personal dentro del ámbito de aplicación')} del mismo y bajo el ámbito de dirección y organización de la AGE.` },
    { t: `Que se consideren ${Y('víctimas de acoso sexual o por razón de sexo')} por parte del: personal bajo el ámbito de dirección y organización de la Administración · personal de empresas externas que desarrollen su trabajo en centros de la AGE.` }] },
  { l: 'LA ADMINISTRACIÓN COMUNICARÁ', c: 'n', h: [
    { t: `La ${D('activación')} del protocolo a la ${Y('empresa de la presunta persona acosadora')} para que, en su ámbito, se adopten las medidas y procedimientos que correspondan, que ${K('en todo caso')} garantizarán la ${Y('separación física de las personas afectadas')}.` }] },
]));

// ───────── RD · 2.3 garantías de actuación ─────────
v('T16_RDD', '2.3 Garantías de actuación', arbol('GARANTÍAS DE ACTUACIÓN (cuadro del temario · 2.3)', `Las ${Y('garantías de actuación')} que deben respetarse en todas las actuaciones son: ${AS}`, [
  `${Y('Respeto y protección a las personas')}.`, `${Y('Confidencialidad y respeto a la intimidad')}.`, `${Y('Diligencia y celeridad, seguridad, coordinación y colaboración')} en el protocolo.`, `${Y('Imparcialidad')}.`,
  `${Y('Protección de la dignidad')} de las personas implicadas.`, `${Y('Derecho a la información')}.`, `${Y('Prohibición de represalias')}.`,
  { t: `En cualquier caso, se ${D('garantizará')} durante la aplicación del protocolo, los siguientes aspectos:`, sub: [
    `La adopción de ${Y('medidas organizativas')} no han de suponer, en ningún caso, un ${K('menoscabo')} de las condiciones de trabajo y/o salariales de la víctima, que habrán de ser expresamente aceptadas por esta.`,
    `${Y('Apoyo a la persona')} que ha sufrido el acoso para evitar su victimización secundaria.`,
    `Si fuera necesario ${Y('acompañamiento psicosocial')} para la víctima de acoso, se derivará a los servicios propios que a tal efecto existan en el sistema sanitario o en la administración autonómica o local competente.`] },
]));

// ───────── RD · 2.4 definiciones ─────────
v('T16_RDD', '2.4 Definiciones', tabla('DEFINICIONES (cuadro del temario · 2.4 · art. 7 LO 3/2007)', ['Concepto', 'Contenido (texto literal)'], [
  { l: 'ACOSO SEXUAL', c: 'o', h: [{ t: `Cualquier ${Y('comportamiento, verbal o físico, de naturaleza sexual')} que tenga el propósito o produzca el efecto de atentar contra la ${Y('dignidad')} de una persona, en particular cuando se crea un ${Y('entorno intimidatorio, degradante u ofensivo')}. ${AS}` }] },
  { l: 'ACOSO POR RAZÓN DE SEXO', c: 'o', h: [{ t: `Cualquier ${Y('comportamiento realizado en función del sexo')} de una persona, con el propósito o el efecto de atentar contra su dignidad y de crear un ${Y('entorno intimidatorio, degradante u ofensivo')}.` }] },
  { l: 'ELEMENTOS CONFORMADORES (concurrencia de una serie de elementos de un común denominador)', c: 'v', h: [
    { t: `${Y('Hostigamiento')}: toda conducta intimidatoria, degradante, humillante y ofensiva que se origina ${P('externamente')} y que es percibida como tal por quien la sufre.` },
    { t: `${Y('Atentado objetivo')} a la dignidad de la víctima y percibida ${Y('subjetivamente')} por esta como tal.` },
    { t: `${Y('Resultado pluriofensivo')}: el ataque a la dignidad no impide la concurrencia de daño a otros derechos fundamentales de la víctima (derecho a no sufrir discriminación, daños a la salud, psíquica o física).` }] },
]));

// ───────── RD · 4.1 consideraciones generales ─────────
v('T16_RDG', '4.1 Consideraciones generales', tabla('CONSIDERACIONES GENERALES (cuadro del temario · 4.1)', ['Supuesto', 'Quién y qué (texto literal)'], [
  { l: `La persona titular de la ${G('jefatura superior de personal')} del departamento ministerial u organismo público`, c: 'o', h: [{ t: `${D('Deberá identificar')}, específicamente, la ${G('unidad responsable')} de la recepción de la comunicación de activación del protocolo.` }] },
  { l: `Siempre que existan ${P('indicios suficientes')} de la existencia de acoso sexual o acoso por razón de sexo`, c: 'v', h: [
    { t: `La ${G('Unidad receptora')} ${D('propondrá')} en cualquier momento al órgano competente del departamento ministerial o del organismo público la adopción de aquellas medidas que eviten que la situación de acoso perdure y genere un mayor daño a la víctima.` }] },
  { l: `Cuando existan ${P('evidencias suficientes')} de acoso sexual o acoso por razón de sexo`, c: 'v', h: [
    { t: `La ${G('Unidad receptora')} o la ${G('Asesoría Confidencial')} ${D('deberá poner en conocimiento')} del titular de la jefatura superior de personal del departamento ministerial u organismo público los hechos sucedidos, previo conocimiento de la ${Y('víctima')}.` }] },
  { l: `La ${G('Unidad receptora')}`, c: 'n', h: [{ t: `${D('Deberá disponer')} de un ${Y('listado actualizado')} de personas que hayan recibido la formación específica en asesoría confidencial, que dará a conocer y estará a disposición de todo el personal, así como determinará la forma en que se podrá contactar con estas personas.` }] },
]));

// ───────── RD · propio · plazos del Protocolo (tras 4.5) ─────────
v('T16_RDH', '4.5 Información', plazos('PLAZOS DEL PROTOCOLO (cuadro propio, con las cifras literales del texto)', [
  ['24 horas', `Desde la recepción de la comunicación, la unidad receptora la pone ${P('inmediatamente (24 horas)')} en conocimiento de la ${G('Asesoría Confidencial')}.`],
  ['10 días', `Plazo de la ${G('primera fase')} (informe de valoración de la asesoría confidencial): ${K('no superior')} a diez días, salvo excepciones justificadas.`],
  ['10 días', `La ${G('víctima')} en desacuerdo dispone de diez días para presentar ${Y('alegaciones')} a la unidad receptora y solicitar la intervención del comité de asesoramiento.`],
  ['7 días', `La unidad receptora constituye el ${G('comité de asesoramiento')} en el plazo de siete días, manteniéndose las medidas organizativas.`],
  ['20 días', `Plazo de la ${G('segunda fase')} una vez constituido el comité: ${K('no superior')} a veinte días, salvo excepciones justificadas.`],
  ['100 horas', `Módulo del curso de ${Y('asesoría confidencial')}: ${K('no será inferior')} a 100 horas de contenido eminentemente práctico.`],
]));

// ───────── RD · VI implantación ─────────
v('T16_RDH', 'VI. Implantación del protocolo', arbol('LOS PROTOCOLOS DEBERÁN CONTENER CON CARÁCTER EXCLUSIVO (cuadro del temario · VI)', `Cada ${G('departamento ministerial u organismo público')} realizará la ${Y('adaptación')} del protocolo, que deberá contener ${K('con carácter exclusivo')}:`, [
  `${Y('Ámbito de aplicación')}.`, `${Y('Fecha de entrada en vigor')}.`, `${Y('Declaración de compromisos')} establecidos en el punto 2.5 del presente protocolo.`,
  `${Y('Unidad responsable de la recepción')} de comunicaciones y solicitudes de activación del protocolo.`, `${Y('Difusión del listado de personas')} que pueden desempeñar funciones de asesoría confidencial.`, `${Y('Identificación de las formas de publicitar')} el protocolo.`,
  { t: `MEDIDAS (2 tipos)`, sub: [
    `${Y('MEDIDAS PREVENTIVAS')}: con declaración de principios, definición del acoso sexual y acoso por razón de sexo e identificación de conductas que pudieran ser constitutivas de estos tipos de acoso.`,
    `${Y('MEDIDAS PROACTIVAS O PROCEDIMENTALES DE ACTUACIÓN')}: para dar cauce a las comunicaciones y solicitudes de aplicación del protocolo que pudieran producirse y medidas cautelares y/o correctivas aplicables.`] },
  { t: `${D('Se deberá tener en cuenta especialmente')}:`, sub: [`La ${Y('estructura')}.`, `La ${Y('ubicación y dispersión geográfica')} del departamento ministerial u organismo público (procurando que las actuaciones se desarrollen, preferiblemente, en ámbito ${P('provincial')} donde se formule la comunicación).`, `Cualquier otra característica o circunstancia de especial relevancia.`] },
]));

// ───────── RD · Anexo II comité de asesoramiento ─────────
v('T16_RDJ', 'Anexo II. Comité de Asesoramiento', tabla('COMITÉ DE ASESORAMIENTO (cuadro del temario · Anexo II)', ['Apartado', 'Contenido (texto literal)'], [
  { l: 'COMPOSICIÓN (paritario)', c: 'o', h: [
    { t: `${P('Dos personas')} del departamento ministerial u organismo dependiente y que, ${K('al menos una')} de ellas, tengan la condición de ${G('asesores confidenciales')}. ${AS}` },
    { t: `${P('Dos representantes del personal')} del departamento ministerial u organismo público donde preste sus servicios la presunta víctima, elegidos por los representantes de las ${G('organizaciones sindicales presentes en la Mesa Delegada')}.` },
    { t: `Se procurará la ${Y('presencia equilibrada')} de los miembros del Comité.` }] },
  { l: 'DESIGNACIÓN', c: 'v', h: [
    { t: `La ${G('jefatura superior de personal')} del departamento ministerial u organismo público ${D('designará')} a los miembros del Comité de Asesoramiento.` },
    { t: `Se garantizará: la ${Y('distancia de parentesco')}, las relaciones de ${Y('amistad o enemistad manifiesta')} y la relación de ${Y('ascendencia o dependencia funcional u orgánica')} entre ellas y las personas implicadas. Quedarán ${K('automáticamente inhabilitados')} para participar en las actuaciones.` },
    { t: `${K('No')} habrán intervenido en etapas anteriores previas a la constitución del Comité. Obligados a guardar la ${Y('máxima confidencialidad')}.` },
    { t: `Podrá asistirle una ${Y('persona experta')} en materia de igualdad y acoso sexual o por razón de sexo (empleado público de la AGE).` }] },
  { l: 'RÉGIMEN DE FUNCIONAMIENTO', c: 'n', h: [
    { t: `Disposiciones de la ${Y('Ley 40/2015')} sobre órganos colegiados · normativa legal y convencional española en materia de acoso · directivas y recomendaciones de la Unión Europea · previsiones del presente protocolo · normas de funcionamiento que acuerde el comité.` }] },
  { l: 'INFORMES DE CONCLUSIONES Y/O RECOMENDACIONES', c: 'n', h: [
    { t: `Relación nominal de las personas que integran el comité e identificación de la víctima y de la persona supuestamente acosadora mediante el correspondiente ${Y('código numérico')} · antecedentes del caso y circunstancias · actuaciones previas e informe de valoración y propuesta de la asesoría confidencial · otras actuaciones (testimonios, pruebas, resumen de los principales hechos) · informe de conclusiones y medidas propuestas concretas.` }] },
]));

// ───────── RD · Anexo IV diagrama de actuación ─────────
v('T16_RDJ', 'Anexo III. Modelo de comunicación de activación', flujo('ANEXO IV · DIAGRAMA DE ACTUACIÓN (cuadro del temario)', [
  { et: `1.ª FASE ${P('(10 días desde Comunicación Activación)')} ${AS}`, c: 'o', t: `${Y('COMUNICACIÓN')} → ${G('Unidad RECEPTORA')} → ${G('Asesoría Confidencial')} (+ ${Y('Medidas Organizativas')})` },
  { t: `${Y('ESTUDIO')} → ${Y('INFORME')}` },
  { t: `${G('Unidad RECEPTORA')}: conocimiento del informe a las partes` },
  { et: `2.ª FASE`, c: 'v', t: `${K('Sólo en caso')} que la víctima esté en desacuerdo con el informe de la Asesoría Confidencial: ${Y('ALEGACIONES (SOLO VÍCTIMA)')} · ${P('10 días')} a comunicar a la Unidad RECEPTORA` },
  { t: `${G('COMITÉ DE ASESORAMIENTO')} ${P('(20 días desde la constitución del Comité de Asesoramiento)')}` },
  { t: `Valoración COMITÉ DE ASESORAMIENTO → ${Y('INFORME JUSTIFICADO')}` },
  { t: `${G('Unidad RECEPTORA')}: conocimiento del informe a las partes` },
]) + pie('20 días desde la constitución del Comité de Asesoramiento (anotación de tu temario).'));

module.exports = V;
if (require.main === module) {
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  const porBloque = {}; V.forEach(([b, loc, h]) => (porBloque[b] = porBloque[b] || []).push([loc, h]));
  let colocados = 0;
  for (const [b, lista] of Object.entries(porBloque)) {
    let h = L.get(s, b).html.replace(/<!--VIS16-->[\s\S]*?<!--\/VIS16-->/g, '');
    const insertos = [];
    for (const [loc, vis] of lista) {
      const k = norm(loc); let i = -1, pos = 0;
      for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const e = h.indexOf('</div></div></div>', a) + 18; if (norm(h.slice(a, e)).includes(k)) { i = e; break; } pos = a + 20; }
      if (i < 0) { console.error('SIN COLOCAR:', b, loc); continue; }
      insertos.push([i, vis]);
    }
    const orden = insertos.map((x, idx) => [x[0], idx, x[1]]).sort((a, b2) => b2[0] - a[0] || b2[1] - a[1]);
    for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS16-->' + vis + '<!--/VIS16-->' + h.slice(i); colocados++; }
    s = L.put(s, b, h);
  }
  fs.writeFileSync(F, s);
  console.log(`Tema 16: cuadros ${V.length}, colocados ${colocados}`);
}
