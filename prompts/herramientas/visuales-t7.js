// Esquemas visuales del Tema 7 (LO 2/1979 del Tribunal Constitucional y LO 1/1982). Uso: node prompts/herramientas/visuales-t7.js
// Cuadros propios con frases LITERALES del articulado (temario oficial 2026): plazos, legitimación, procedimientos y listas.
const L = require('./visuales-lib.js');
const { R, P, D, K, arbol, flujo, cols, plazos, tabla } = L;
const V = []; const v = (despues, html) => V.push([despues, html]);
const hoja = (t, p, c) => ({ p: p || '', c, t });

// ================================================================ LO 2/1979 · Título I
v('Artículo 9 — Presidente y Vicepresidente', flujo('Elección del Presidente del Tribunal Constitucional (art. 9)', [
  { et: '1', t: `El ${D('Tribunal en Pleno')} elige de entre sus miembros por ${D('votación secreta')} a su Presidente y propone al ${D('Rey')} su nombramiento` },
  { et: '2', t: `En ${P('primera votación')} se requerirá la ${P('mayoría absoluta')}. Si ésta no se alcanzase se procederá a una ${P('segunda votación')}, en la que resultará elegido quien obtuviese ${P('mayor número de votos')}` },
  { et: '3', t: `En caso de ${D('empate')} se efectuará una última votación y si éste se repitiese, será propuesto el de ${D('mayor antigüedad en el cargo')} y en caso de igualdad el de ${D('mayor edad')}` },
  { et: '4', t: `El nombre del elegido se elevará al ${D('Rey')} para su nombramiento por un período de ${P('tres años')}, expirado el cual podrá ser reelegido por ${P('una sola vez')}` },
  { et: '5', t: `El Tribunal en Pleno elegirá entre sus miembros, por el mismo procedimiento y por el mismo período de ${P('tres años')}, un ${D('Vicepresidente')}, al que incumbe sustituir al Presidente en caso de vacante, ausencia u otro motivo legal y presidir la ${D('Sala Segunda')}` }]));

v('Artículo 7 — Las Salas', cols('Quién preside cada órgano del Tribunal Constitucional (arts. 6 y 7)', [
  { t: 'Pleno', l: [`Está integrado por ${D('todos los Magistrados')} del Tribunal`, `Lo preside el ${D('Presidente')} y, en su defecto, el ${D('Vicepresidente')} y, a falta de ambos, el Magistrado más antiguo en el cargo y, en caso de igual antigüedad, el de mayor edad`] },
  { t: 'Sala Primera', l: [`Compuesta por ${P('seis Magistrados')} nombrados por el Tribunal en Pleno`, `La preside el ${D('Presidente del Tribunal')} y, en su defecto, el Magistrado más antiguo y, en caso de igual antigüedad, el de mayor edad`] },
  { t: 'Sala Segunda', l: [`Compuesta por ${P('seis Magistrados')} nombrados por el Tribunal en Pleno`, `La preside el ${D('Vicepresidente del Tribunal')} y, en su defecto, el Magistrado más antiguo y, en caso de igual antigüedad, el de mayor edad`] }]));

v('Artículo 10 — Competencias del Pleno', arbol('Competencias del Tribunal en Pleno (art. 10)', `${D('El Tribunal en Pleno conoce de:')}`, [
  { t: `${D('Control de normas')}`, sub: ['De la constitucionalidad o inconstitucionalidad de los tratados internacionales', 'De los recursos de inconstitucionalidad contra las leyes y demás disposiciones con valor de ley, excepto los de mera aplicación de doctrina', 'De las cuestiones de constitucionalidad que reserve para sí; las demás deberán deferirse a las Salas según un turno objetivo', 'De los recursos previos de inconstitucionalidad contra Proyectos de Estatutos de Autonomía y contra Propuestas de Reforma de los Estatutos de Autonomía'] },
  { t: `${D('Conflictos')}`, sub: ['De los conflictos constitucionales de competencia entre el Estado y las Comunidades Autónomas o de los de éstas entre sí', 'De los conflictos en defensa de la autonomía local', 'De los conflictos entre los órganos constitucionales del Estado', 'De las anulaciones en defensa de la jurisdicción del Tribunal previstas en el artículo 4.3'] },
  { t: `${D('Magistrados y Tribunal')}`, sub: ['De la verificación del cumplimiento de los requisitos exigidos para el nombramiento de Magistrado del Tribunal Constitucional', 'Del nombramiento de los Magistrados que han de integrar cada una de las Salas', 'De la recusación de los Magistrados del Tribunal Constitucional', 'De la aprobación y modificación de los reglamentos del Tribunal'] },
  `De cualquier otro asunto que sea competencia del Tribunal pero recabe para sí el Pleno, a propuesta del ${D('Presidente')} o de ${P('tres Magistrados')}`,
  `En su ${D('autonomía como órgano constitucional')}, el Pleno elabora su presupuesto, que se integra como una ${D('sección independiente')} dentro de los Presupuestos Generales del Estado`]));

v('Artículo 14 — Quórum de los acuerdos', cols('Quórum de los acuerdos (art. 14)', [
  { t: 'Pleno', l: [`Puede adoptar acuerdos cuando estén presentes, al menos, ${P('dos tercios')} de los miembros que en cada momento lo compongan`] },
  { t: 'Salas', l: [`Los acuerdos de las Salas requerirán asimismo la presencia de ${P('dos tercios')} de los miembros que en cada momento las compongan`] },
  { t: 'Secciones', l: [`Se requerirá la presencia de ${P('dos miembros')}, salvo que haya discrepancia, requiriéndose entonces la de sus ${P('tres miembros')}`] }]));

v('Artículo 15 — El Presidente del Tribunal', arbol('Funciones del Presidente del Tribunal Constitucional (art. 15)', `${D('El Presidente del Tribunal Constitucional')}`, [
  'Ejerce la representación del Tribunal, convoca y preside el Tribunal en Pleno y convoca las Salas',
  'Adopta las medidas precisas para el funcionamiento del Tribunal, de las Salas y de las Secciones',
  'Comunica a las Cámaras, al Gobierno o al Consejo General del Poder Judicial, en cada caso, las vacantes',
  'Nombra a los letrados, convoca los concursos para cubrir las plazas de funcionarios y los puestos de personal laboral',
  'Ejerce las potestades administrativas sobre el personal del Tribunal']));

// ================================================================ LO 2/1979 · Título II
v('Artículo 32 — Legitimación', arbol('Legitimados para el recurso de inconstitucionalidad (art. 32)', `${D('Están legitimados para el recurso de inconstitucionalidad')}`, [
  { t: 'Contra Estatutos de Autonomía y demás Leyes del Estado, normas con fuerza de ley, Tratados y Reglamentos de las Cámaras:', sub: [`El ${D('Presidente del Gobierno')}`, `El ${D('Defensor del Pueblo')}`, `${P('Cincuenta Diputados')}`, `${P('Cincuenta Senadores')}`] },
  { t: 'Contra normas del Estado que puedan afectar a su propio ámbito de autonomía:', sub: [`Los ${D('órganos colegiados ejecutivos')} y las ${D('Asambleas de las Comunidades Autónomas')}, previo acuerdo adoptado al efecto`] }]));

v('Artículo 33 — Plazo del recurso', tabla('Plazo del recurso de inconstitucionalidad (art. 33)', ['Supuesto', 'Plazo y requisitos'], [
  { l: 'REGLA GENERAL', h: [hoja(`Dentro del plazo de ${P('tres meses')} a partir de la publicación de la Ley, disposición o acto con fuerza de Ley impugnado, mediante demanda presentada ante el Tribunal Constitucional`, '3 meses', 'c')] },
  { l: 'EXCEPCIÓN: el Presidente del Gobierno y los órganos colegiados ejecutivos de las Comunidades Autónomas', c: 'v', h: [
    hoja(`Podrán interponer el recurso en el plazo de ${P('nueve meses')} si, con la finalidad de evitar su interposición, se cumplen los requisitos siguientes`, '9 meses', 'v'),
    hoja(`Que se reúna la ${D('Comisión Bilateral de Cooperación')} entre la Administración General del Estado y la respectiva Comunidad Autónoma`),
    hoja(`Que en el seno de la Comisión Bilateral se haya adoptado un acuerdo sobre ${D('iniciación de negociaciones')} para resolver las discrepancias`),
    hoja(`Que el acuerdo sea puesto en conocimiento del Tribunal Constitucional dentro de los ${P('tres meses')} siguientes a la publicación, y se inserte en el «Boletín Oficial del Estado» y en el «Diario Oficial» de la Comunidad Autónoma correspondiente`)] }]));

v('Artículo 34 — Tramitación del recurso', plazos('Tramitación del recurso de inconstitucionalidad (art. 34)', [
  ['15 días', `Personación y formulación de alegaciones (Congreso, Senado, Gobierno por conducto del ${D('Ministerio de Justicia')} y, si procede, órganos autonómicos)`],
  ['10 días', `Plazo en el que el Tribunal dictará sentencia, transcurrido el de alegaciones`],
  ['30 días', `Máximo en ningún caso excedible, si el Tribunal estima necesario, mediante ${D('resolución motivada')}, un plazo más amplio`]]));

v('Artículo 35 — Planteamiento de la cuestión', flujo('Planteamiento de la cuestión de inconstitucionalidad por un Juez o Tribunal (art. 35)', [
  { et: '1', t: `El Juez o Tribunal, ${D('de oficio o a instancia de parte')}, considera que una norma con rango de Ley aplicable al caso y de cuya validez dependa el fallo pueda ser contraria a la Constitución` },
  { et: '2', t: `Solo puede plantearla una vez ${D('concluso el procedimiento')} y dentro del plazo para dictar sentencia, concretando la ley, el precepto constitucional que se supone infringido y en qué medida el fallo depende de la validez de la norma` },
  { et: '3', t: `Oye a las partes y al Ministerio Fiscal, en plazo común e improrrogable de ${P('10 días')}` },
  { et: '4', t: `Seguidamente y sin más trámite, el juez resolverá en el plazo de ${P('tres días')}. Dicho auto ${K('no será susceptible de recurso')} de ninguna clase` },
  { et: '5', t: `Se produce la ${D('suspensión provisional')} de las actuaciones hasta que el Tribunal Constitucional se pronuncie sobre su admisión; producida ésta, el proceso permanece suspendido hasta que resuelva definitivamente` }]));

v('Artículo 37 — Tramitación ante el Tribunal Constitucional', plazos('Cuestión de inconstitucionalidad ante el Tribunal Constitucional (art. 37)', [
  ['Admisión', `Podrá rechazarla, mediante ${D('auto')} y sin otra audiencia que la del ${D('Fiscal General del Estado')}, si faltaren las condiciones procesales o fuere notoriamente infundada (decisión motivada)`],
  ['15 días', `Las partes del procedimiento judicial podrán personarse, dentro de los 15 días siguientes a la publicación de la admisión en el BOE`],
  ['15 días', `Para formular alegaciones, en el plazo de otros 15 días (Congreso, Senado, Fiscal General del Estado, Gobierno y órganos autonómicos: plazo común improrrogable de quince días)`],
  ['15 días', `Concluido éste, el Tribunal dictará sentencia en el plazo de quince días`],
  ['30 días', `Máximo si estima necesario, mediante resolución motivada, un plazo más amplio`]]));

v('Artículo 38 — Valor y efectos de la sentencia', arbol('Efectos de las sentencias de inconstitucionalidad (arts. 38 a 40)', `${D('Sentencias en procedimientos de inconstitucionalidad')}`, [
  'Tendrán el valor de cosa juzgada, vincularán a todos los Poderes Públicos y producirán efectos generales desde la fecha de su publicación en el «Boletín Oficial del Estado»',
  'Las desestimatorias impedirán cualquier planteamiento ulterior de la cuestión por cualquiera de las dos vías, fundado en la misma infracción de idéntico precepto constitucional',
  'Si la sentencia declara la inconstitucionalidad, declarará igualmente la nulidad de los preceptos impugnados y de los conexos',
  'No permitirán revisar procesos fenecidos mediante sentencia con fuerza de cosa juzgada, salvo en los procesos penales o contencioso-administrativos sancionadores en que resulte una reducción de la pena o de la sanción o una exclusión, exención o limitación de la responsabilidad']));

// ================================================================ LO 2/1979 · Título III (amparo)
v('Artículo 44 — Amparo frente a órganos judiciales', tabla('Recurso de amparo: según quién origine la violación (arts. 42 a 46)', ['Origen de la violación', 'Plazo, requisitos y legitimados'], [
  { l: 'DECISIONES O ACTOS SIN VALOR DE LEY DE LAS CORTES O DE LAS ASAMBLEAS DE LAS COMUNIDADES AUTÓNOMAS (art. 42)', h: [
    hoja(`Podrán ser recurridos dentro del plazo de ${P('tres meses')} desde que, con arreglo a las normas internas de las Cámaras o Asambleas, sean firmes`, '3 meses', 'c'),
    hoja(`Legitimados: la ${D('persona directamente afectada')}, el ${D('Defensor del Pueblo')} y el ${D('Ministerio Fiscal')}`)] },
  { l: 'GOBIERNO O SUS AUTORIDADES O FUNCIONARIOS, U ÓRGANOS EJECUTIVOS COLEGIADOS DE LAS COMUNIDADES AUTÓNOMAS (art. 43)', c: 'v', h: [
    hoja(`Una vez que se haya ${D('agotado la vía judicial')} procedente`),
    hoja(`El plazo será el de los ${P('veinte días')} siguientes a la notificación de la resolución recaída en el previo proceso judicial`, '20 días', 'v'),
    hoja(`Legitimados: quienes hayan sido ${D('parte en el proceso judicial')} correspondiente, el Defensor del Pueblo y el Ministerio Fiscal`)] },
  { l: 'ACTO U OMISIÓN DE UN ÓRGANO JUDICIAL (art. 44)', c: 'n', h: [
    hoja(`Que se hayan ${D('agotado todos los medios de impugnación')} previstos por las normas procesales para el caso concreto dentro de la vía judicial`),
    hoja(`Que la violación sea imputable de modo ${D('inmediato y directo')} a una acción u omisión del órgano judicial con independencia de los hechos que dieron lugar al proceso, acerca de los que, en ningún caso, entrará a conocer el Tribunal Constitucional`),
    hoja(`Que se haya ${D('denunciado formalmente')} en el proceso, si hubo oportunidad, la vulneración del derecho constitucional tan pronto como, una vez conocida, hubiera lugar para ello`),
    hoja(`El plazo para interponer el recurso de amparo será de ${P('30 días')}, a partir de la notificación de la resolución recaída en el proceso judicial`, '30 días', 'n'),
    hoja(`Legitimados: quienes hayan sido parte en el proceso judicial correspondiente, el Defensor del Pueblo y el Ministerio Fiscal`)] }]));

v('Artículo 50 — Admisión a trámite', flujo('Tramitación del recurso de amparo (arts. 49 a 52)', [
  { et: '49', t: `Se inicia mediante ${D('demanda')} (hechos, preceptos constitucionales infringidos y amparo que se solicita), que justificará la ${D('especial trascendencia constitucional')} del recurso. Defectos: las ${D('Secretarías de Justicia')} lo ponen de manifiesto en ${P('10 días')}, con apercibimiento de inadmisión` },
  { et: '50', t: `La ${D('Sección')}, por ${D('unanimidad')} de sus miembros, acordará mediante ${D('providencia')} la admisión. Si no hay unanimidad, la Sección traslada la decisión a la ${D('Sala')}. Inadmisión: providencia que especifica el requisito incumplido; solo recurrible en súplica por el Ministerio Fiscal en ${P('tres días')}` },
  { et: '51', t: `Admitida, la Sala requiere con carácter urgente las actuaciones, en plazo que no podrá exceder de ${P('diez días')}, y se emplaza a quienes fueron parte para comparecer en ${P('diez días')}` },
  { et: '52', t: `Vista a quien promovió el amparo, a los personados, al Abogado del Estado (si estuviera interesada la Administración Pública) y al ${D('Ministerio Fiscal')}, por plazo común que no podrá exceder de ${P('veinte días')}` },
  { et: '52', t: `La Sala o la Sección pronunciará la ${D('sentencia')} en el plazo de ${P('10 días')} a partir del día señalado para la vista o deliberación` }]));

v('Artículo 55 — Contenido de la sentencia de amparo', arbol('Sentencia de amparo (arts. 53 a 55)', `${D('La Sala o la Sección pronunciará')}`, [
  { t: `${D('Fallos (art. 53)')}`, sub: ['Otorgamiento de amparo', 'Denegación de amparo'] },
  { t: `${D('La sentencia que otorgue el amparo contendrá alguno o algunos de estos pronunciamientos (art. 55)')}`, sub: ['Declaración de nulidad de la decisión, acto o resolución que hayan impedido el pleno ejercicio de los derechos o libertades protegidos, con determinación, en su caso, de la extensión de sus efectos', 'Reconocimiento del derecho o libertad pública, de conformidad con su contenido constitucionalmente declarado', 'Restablecimiento del recurrente en la integridad de su derecho o libertad con la adopción de las medidas apropiadas, en su caso, para su conservación'] },
  `Si el recurso debiera ser estimado porque la ley aplicada lesione derechos fundamentales o libertades públicas, se elevará la cuestión al ${D('Pleno')} con ${D('suspensión del plazo')} para dictar sentencia`]));

v('Artículo 56 — Suspensión y medidas cautelares', tabla('Suspensión y medidas cautelares en el amparo (arts. 56 y 57)', ['Cuestión', 'Contenido'], [
  { l: 'REGLA GENERAL', h: [hoja(`La interposición del recurso de amparo ${K('no suspenderá')} los efectos del acto o sentencia impugnados`)] },
  { l: 'EXCEPCIÓN', c: 'v', h: [hoja(`Cuando la ejecución produzca un perjuicio al recurrente que pudiera hacer perder al amparo su finalidad, la Sala o la Sección, de oficio o a instancia del recurrente, podrá disponer la ${D('suspensión, total o parcial')}, siempre y cuando ${K('no ocasione perturbación grave')} a un interés constitucionalmente protegido, ni a los derechos fundamentales o libertades de otra persona`)] },
  { l: 'PETICIÓN', c: 'n', h: [hoja(`Podrá pedirse en cualquier tiempo, antes de haberse pronunciado la sentencia o decidirse el amparo de otro modo; el incidente se sustancia con audiencia de las partes y del Ministerio Fiscal, por un plazo común que no excederá de ${P('tres días')}`, '3 días', 'n')] },
  { l: 'URGENCIA EXCEPCIONAL', h: [hoja(`Se podrán adoptar en la resolución de admisión a trámite; podrá ser impugnada en el plazo de ${P('cinco días')} desde su notificación, por el Ministerio Fiscal y demás partes personadas; se resuelve mediante auto no susceptible de recurso alguno`, '5 días', 'c')] },
  { l: 'MODIFICACIÓN (art. 57)', h: [hoja(`La suspensión o su denegación puede ser modificada durante el curso del juicio, de oficio o a instancia de parte, en virtud de circunstancias ${D('sobrevenidas')} o que no pudieron ser conocidas al tiempo de sustanciarse el incidente`)] }]));

v('Artículo 58 — Indemnización por la suspensión', plazos('Indemnización por la suspensión en el amparo (art. 58)', [
  ['Competentes', `Los ${D('Jueces o Tribunales')}, a cuya disposición se pondrán las fianzas constituidas, para resolver sobre las peticiones de indemnización de los daños causados como consecuencia de la concesión o denegación de la suspensión`],
  ['1 año', `Plazo de presentación de las peticiones de indemnización, a partir de la publicación de la sentencia del Tribunal Constitucional (se sustancian por el trámite de los incidentes)`]]));

// ================================================================ LO 1/1982
v('Artículo 3 — Consentimiento de menores e incapaces', flujo('Consentimiento de menores e incapaces (art. 3)', [
  { et: '1', t: `Deberá prestarse ${D('por ellos mismos')} si sus condiciones de madurez lo permiten, de acuerdo con la legislación civil` },
  { et: '2', t: `En los restantes casos, mediante ${D('escrito por su representante legal')}, quien estará obligado a poner en conocimiento previo del ${D('Ministerio Fiscal')} el consentimiento proyectado` },
  { et: '3', t: `Si en el plazo de ${P('ocho días')} el Ministerio Fiscal se opusiere, ${D('resolverá el Juez')}` }]));

v('Artículo 4 — Acciones de protección de una persona fallecida', flujo('Quién ejerce las acciones de protección de una persona fallecida (arts. 4 a 6)', [
  { et: '1.º', t: `Quien ésta haya ${D('designado en su testamento')} (la designación puede recaer en una persona jurídica)` },
  { et: '2.º', t: `No existiendo designación o habiendo fallecido la persona designada: el ${D('cónyuge, los descendientes, ascendientes y hermanos')} de la persona afectada que viviesen al tiempo de su fallecimiento` },
  { et: '3.º', t: `A falta de todos ellos, el ${D('Ministerio Fiscal')}, de oficio o a instancia de persona interesada, siempre que no hubieren transcurrido más de ${P('ochenta años')} desde el fallecimiento del afectado (el mismo plazo si es una persona jurídica designada en testamento)` },
  { et: 'Víctimas', c: 'si', t: `Delitos (art. 7.8): está legitimado el ${D('ofendido o perjudicado por el delito')}, haya o no ejercido la acción penal o civil, y en todo caso el ${D('Ministerio Fiscal')}` }]));

v('Artículo 7 — Intromisiones ilegítimas', arbol('Intromisiones ilegítimas (art. 7)', `${D('Tendrán la consideración de intromisiones ilegítimas')}`, [
  { t: `${D('Medios de escucha, filmación y grabación')}`, sub: ['El emplazamiento en cualquier lugar de aparatos de escucha, de filmación, de dispositivos ópticos o de cualquier otro medio apto para grabar o reproducir la vida íntima de las personas', 'La utilización de aparatos de escucha, dispositivos ópticos, o de cualquier otro medio para el conocimiento de la vida íntima de las personas o de manifestaciones o cartas privadas no destinadas a quien haga uso de tales medios, así como su grabación, registro o reproducción'] },
  { t: `${D('Divulgación y revelación')}`, sub: ['La divulgación de hechos relativos a la vida privada de una persona o familia que afecten a su reputación y buen nombre, así como la revelación o publicación del contenido de cartas, memorias u otros escritos personales de carácter íntimo', 'La revelación de datos privados de una persona o familia conocidos a través de la actividad profesional u oficial de quien los revela'] },
  { t: `${D('Imagen, nombre y voz')}`, sub: ['La captación, reproducción o publicación por fotografía, filme, o cualquier otro procedimiento, de la imagen de una persona en lugares o momentos de su vida privada o fuera de ellos', 'La utilización del nombre, de la voz o de la imagen de una persona para fines publicitarios, comerciales o de naturaleza análoga'] },
  { t: `${D('Dignidad')}`, sub: ['La imputación de hechos o la manifestación de juicios de valor a través de acciones o expresiones que de cualquier modo lesionen la dignidad de otra persona, menoscabando su fama o atentando contra su propia estimación', 'La utilización del delito por el condenado en sentencia penal firme para conseguir notoriedad pública u obtener provecho económico, o la divulgación de datos falsos sobre los hechos delictivos, cuando ello suponga el menoscabo de la dignidad de las víctimas'] }]));

v('Artículo 8 — Lo que NO es intromisión ilegítima', cols('Lo que no se reputa intromisión ilegítima (art. 8)', [
  { t: 'Con carácter general', l: [`Las actuaciones ${D('autorizadas o acordadas por la Autoridad competente')} de acuerdo con la ley`, `Cuando predomine un ${D('interés histórico, científico o cultural relevante')}`] },
  { t: 'El derecho a la propia imagen no impedirá', l: [`Su captación, reproducción o publicación por cualquier medio cuando se trate de personas que ejerzan un ${D('cargo público')} o una profesión de ${D('notoriedad o proyección pública')} y la imagen se capte durante un acto público o en lugares abiertos al público`, `La utilización de la ${D('caricatura')} de dichas personas, de acuerdo con el uso social`, `La información gráfica sobre un suceso o acaecimiento público cuando la imagen de una persona determinada aparezca como ${D('meramente accesoria')}`] },
  { t: 'Salvedad', l: [`Las excepciones de los párrafos a) y b) ${K('no serán de aplicación')} respecto de las autoridades o personas que desempeñen funciones que por su naturaleza necesiten el ${D('anonimato')} de la persona que las ejerza`] }]));

v('Artículo 9 — Tutela judicial', arbol('Tutela judicial frente a las intromisiones ilegítimas (art. 9)', `${D('La tutela judicial comprenderá todas las medidas necesarias para poner fin a la intromisión ilegítima y, en particular, las necesarias para:')}`, [
  { t: 'El restablecimiento del perjudicado en el pleno disfrute de sus derechos', sub: ['La declaración de la intromisión sufrida, el cese inmediato de la misma y la reposición del estado anterior', 'En el honor: sin perjuicio del derecho de réplica, la publicación total o parcial de la sentencia condenatoria a costa del condenado con al menos la misma difusión pública que tuvo la intromisión sufrida'] },
  'Prevenir intromisiones inminentes o ulteriores',
  'La indemnización de los daños y perjuicios causados: la existencia de perjuicio se presumirá siempre que se acredite la intromisión ilegítima, y se extenderá al daño moral',
  'La apropiación por el perjudicado del lucro obtenido con la intromisión ilegítima en sus derechos',
  `Las acciones de protección caducarán transcurridos ${P('cuatro años')} desde que el legitimado pudo ejercitarlas`]));


// ---------------------------------------------------------------- Cuadros que faltaban (sin-esquema.js)
v('Artículo 2 — Competencias', arbol('El Tribunal Constitucional conocerá de… (art. 2)', `${D('El Tribunal Constitucional conocerá en los casos y en la forma que esta Ley determina')}`, [
  { t: `${D('Normas')}`, sub: ['Del recurso y de la cuestión de inconstitucionalidad contra Leyes, disposiciones normativas o actos con fuerza de Ley', 'De la declaración sobre la constitucionalidad de los Tratados Internacionales', 'Del control previo de inconstitucionalidad en el supuesto previsto en la presente Ley'] },
  { t: `${D('Amparo y conflictos')}`, sub: ['Del recurso de amparo por violación de los derechos y libertades públicos', 'De los conflictos constitucionales de competencia entre el Estado y las Comunidades Autónomas o de los de éstas entre sí', 'De los conflictos entre los órganos constitucionales del Estado', 'De los conflictos en defensa de la autonomía local'] },
  `De la verificación de los nombramientos de los Magistrados del Tribunal Constitucional, para juzgar si los mismos reúnen los requisitos requeridos por la Constitución y la presente Ley`,
  `De las demás materias que le atribuyen la Constitución y las Leyes orgánicas`,
  `Podrá dictar ${D('reglamentos')} sobre su propio funcionamiento y organización, aprobados por el ${D('Pleno')} y publicados en el BOE, autorizados por su ${D('Presidente')}`]));

v('Artículo 4 — Defensa de su jurisdicción', arbol('Defensa de la jurisdicción del Tribunal (art. 4)', `${D('Jurisdicción del Tribunal Constitucional')}`, [
  `${K('En ningún caso')} se podrá promover cuestión de jurisdicción o competencia al Tribunal Constitucional`,
  `El Tribunal delimitará el ámbito de su jurisdicción y adoptará cuantas medidas sean necesarias para preservarla, incluyendo la declaración de nulidad de aquellos actos o resoluciones que la menoscaben; podrá apreciar ${D('de oficio o a instancia de parte')} su competencia o incompetencia`,
  `Sus resoluciones ${K('no podrán ser enjuiciadas')} por ningún órgano jurisdiccional del Estado`,
  `Si anula un acto o resolución que contravenga lo anterior, lo ha de hacer ${D('motivadamente')} y previa audiencia al ${D('Ministerio Fiscal')} y al órgano autor del acto o resolución`]));

v('Artículo 27 — Objeto y normas susceptibles', arbol('Normas susceptibles de declaración de inconstitucionalidad (art. 27)', `${D('Son susceptibles de declaración de inconstitucionalidad')}`, [
  'Los Estatutos de Autonomía y las demás Leyes orgánicas',
  'Las demás Leyes, disposiciones normativas y actos del Estado con fuerza de Ley',
  'Los Tratados Internacionales',
  'Los Reglamentos de las Cámaras y de las Cortes Generales',
  'Las Leyes, actos y disposiciones normativas con fuerza de Ley de las Comunidades Autónomas',
  'Los Reglamentos de las Asambleas legislativas de las Comunidades Autónomas']));

v('Artículo 42 — Actos sin valor de Ley de las Cortes y Asambleas', plazos('Amparo contra actos sin valor de Ley de las Cortes y Asambleas (art. 42)', [
  ['3 meses', `Las decisiones o actos sin valor de Ley, emanados de las Cortes o de cualquiera de sus órganos, o de las Asambleas legislativas de las Comunidades Autónomas, o de sus órganos, podrán ser recurridos dentro del plazo de ${P('tres meses')} desde que, con arreglo a las normas internas de las Cámaras o Asambleas, sean ${D('firmes')}`]]));

v('Artículo 43 — Amparo frente al Gobierno y sus autoridades', plazos('Amparo frente al Gobierno y sus autoridades (art. 43)', [
  ['Antes', `Podrán dar lugar al recurso de amparo una vez que se haya ${D('agotado la vía judicial procedente')}`],
  ['20 días', `El plazo para interponer el recurso de amparo constitucional será el de los ${P('veinte días')} siguientes a la ${D('notificación')} de la resolución recaída en el previo proceso judicial`],
  ['Fundamento', `El recurso sólo podrá fundarse en la infracción por una ${D('resolución firme')} de los preceptos constitucionales que reconocen los derechos o libertades susceptibles de amparo`]]));

v('Artículo 49 — La demanda', plazos('La demanda de amparo (art. 49)', [
  ['Contenido', `Se expondrán con claridad y concisión los hechos, se citarán los preceptos constitucionales que se estimen infringidos y se fijará con precisión el amparo que se solicita; la demanda justificará la ${D('especial trascendencia constitucional')} del recurso`],
  ['Se acompañan', `El documento que acredite la representación del solicitante, la copia, traslado o certificación de la resolución recaída y tantas copias literales como partes en el previo proceso, y una más para el ${D('Ministerio Fiscal')}`],
  ['10 días', `Si se incumplen los requisitos, las ${D('Secretarías de Justicia')} lo pondrán de manifiesto al interesado en el plazo de ${P('10 días')}, con el apercibimiento de que, de no subsanarse el defecto, se acordará la ${D('inadmisión')} del recurso`]]));

v('Artículo 51 — Requerimiento de las actuaciones', plazos('Requerimiento de las actuaciones (art. 51)', [
  ['10 días', `La Sala requerirá con carácter urgente al órgano o autoridad, o al Juez o Tribunal, para que, en plazo que no podrá exceder de ${P('diez días')}, remita las actuaciones o testimonio de ellas`],
  ['10 días', `Emplazará a quienes fueron parte en el procedimiento antecedente para que puedan comparecer en el proceso constitucional en el plazo de ${P('diez días')}`]]));

v('Artículo 52 — Vista y sentencia', plazos('Vista y sentencia en el amparo (art. 52)', [
  ['20 días', `La Sala dará vista a quien promovió el amparo, a los personados, al ${D('Abogado del Estado')} (si estuviera interesada la Administración Pública) y al ${D('Ministerio Fiscal')}: plazo común que no podrá exceder de ${P('veinte días')}`],
  ['Doctrina', `La Sala podrá deferir la resolución a una de sus Secciones cuando sea aplicable ${D('doctrina consolidada')} del Tribunal Constitucional, o señalar día para la vista, en su caso, o deliberación y votación`],
  ['10 días', `La Sala, o en su caso la Sección, pronunciará la sentencia en el plazo de ${P('10 días')} a partir del día señalado para la vista o deliberación`]]));
module.exports = V;
if (require.main === module) L.inserta(7, V);
