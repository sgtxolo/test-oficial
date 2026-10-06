// Esquemas visuales del Tema 13 (Ley 29/1998 LJCA). Uso: node prompts/herramientas/visuales-t13.js
const L = require('./visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = L;
const V = []; const v = (despues, html) => V.push([despues, html]);

v('Artículo 1 — Ámbito', arbol('Qué controla el orden contencioso-administrativo (art. 1)', `${D('Orden contencioso-administrativo')}`, [
  `Actuación de las Administraciones públicas sujeta al Derecho Administrativo · disposiciones generales ${R('de rango inferior a la Ley')} · ${R('Decretos legislativos cuando excedan los límites de la delegación')}`,
  { t: 'Son Administraciones públicas (1.2):', sub: ['a) Administración General del Estado', 'b) Administraciones de las Comunidades Autónomas', 'c) Entidades que integran la Administración local', 'd) Entidades de Derecho público dependientes o vinculadas'] },
  { t: 'También (1.3):', sub: ['personal, administración y gestión patrimonial del Congreso, Senado, TC, Tribunal de Cuentas y Defensor del Pueblo', 'actos del CGPJ y de los órganos de gobierno de Juzgados y Tribunales', `${R('Administración electoral, en los términos de la LOREG')}`] }]));
v('Artículo 3 — Lo que NO', cols('Qué conoce y qué NO conoce (arts. 2 y 3)',
  [{ t: 'Art. 2 · SÍ conoce', l: [`Actos del ${R('Gobierno o de los Consejos de Gobierno de las CC. AA.')}: derechos fundamentales, elementos reglados e indemnizaciones`, 'Contratos administrativos y actos de preparación y adjudicación', `${R('Actos y disposiciones de las Corporaciones de Derecho público, adoptados en el ejercicio de funciones públicas')}`, 'Actos de control sobre concesionarios de servicios públicos', 'Responsabilidad patrimonial de las Administraciones públicas (no ante civil o social)', 'Materias que atribuya expresamente una Ley'] },
   { t: `Art. 3 · ${K('NO')} conoce`, l: ['Cuestiones atribuidas a los órdenes civil, penal y social', 'El recurso contencioso-disciplinario militar', 'Conflictos de jurisdicción y conflictos de atribuciones entre órganos de una misma Administración', 'Normas Forales fiscales de las Juntas Generales de Álava, Guipúzcoa y Vizcaya: exclusivamente el Tribunal Constitucional'] }], '⇄'));
v('Artículo 4 — Cuestiones prejudiciales', arbol('Jurisdicción: prejudiciales, falta de jurisdicción e incompetencia (arts. 4, 5 y 7)', `${D('Competencia')}`, [
  `Prejudiciales e incidentales no administrativas: conoce el orden, salvo constitucionales y penales · la decisión ${R('no producirá efectos fuera del proceso y no vinculará al orden jurisdiccional correspondiente')}`,
  `Falta de jurisdicción: se aprecia ${R('de oficio, previa audiencia de las partes y del Ministerio Fiscal por plazo común de diez días')} · nueva demanda en ${R('un mes')}`,
  `Competencia ${K('no prorrogable')}: apreciada incluso de oficio, audiencia común de ${P('diez días')}`,
  `Incompetencia: ${R('auto, antes de la sentencia')}; se remiten las actuaciones y se emplaza a las partes diez días`]));
v('Artículo 6 — Órganos', arbol('Órganos del orden contencioso-administrativo (art. 6)', `${D('Órganos')}`, [
  'a) Juzgados de lo Contencioso-administrativo', 'b) Juzgados Centrales de lo Contencioso-administrativo', 'c) Salas de lo Contencioso-administrativo de los Tribunales Superiores de Justicia',
  'd) Sala de lo Contencioso-administrativo de la Audiencia Nacional', 'e) Sala de lo Contencioso-administrativo del Tribunal Supremo']));
v('Artículo 8 — Juzgados de lo', arbol('Juzgados de lo Contencioso-administrativo (art. 8)', `${D('Juzgados')}: única o primera instancia`, [
  `Actos de las entidades locales, ${K('excluidas')} ${R('las impugnaciones de cualquier clase de instrumentos de planeamiento urbanístico')}`,
  { t: 'Actos de las CC. AA. (salvo del Consejo de Gobierno):', sub: ['personal (no nacimiento o extinción de la relación de servicio de carrera)', `sanciones: multas ${P('no superiores a 60.000 euros')} y ceses o privación de derechos ${P('no superior a seis meses')}`, `responsabilidad patrimonial: ${P('30.050 euros')}`] },
  `Administración periférica del Estado y CC. AA. · excepción: más de 60.000 € o ${R('dominio público, obras públicas del Estado, expropiación forzosa y propiedades especiales')}`,
  'Extranjería (Administración periférica del Estado o CC. AA.)',
  `${R('Juntas Electorales de Zona')} y proclamación de candidaturas`,
  { t: 'Autorizaciones de entrada:', sub: [`${R('Juzgados de lo Contencioso-administrativo')}: domicilios para ejecución forzosa de actos (salvo protección de menores)`, 'medidas sanitarias que limiten derechos fundamentales de particulares identificados', 'inspección acordada por la CNMC', `${R('Administración Tributaria')}: entrada en domicilios en procedimientos de aplicación de los tributos`] }]));
v('Artículo 9 — Juzgados Centrales', arbol('Juzgados Centrales de lo Contencioso-administrativo (art. 9)', `${D('Juzgados Centrales')}`, [
  'Personal: actos de Ministros y Secretarios de Estado (salvo nacimiento o extinción de la relación de servicio de carrera)',
  'Actos de órganos centrales de la AGE (art. 8.2.b)', 'Disposiciones y actos de organismos públicos con competencia en todo el territorio nacional',
  `Responsabilidad patrimonial de Ministros y Secretarios de Estado: hasta ${P('30.050 euros')}`, 'Inadmisión de peticiones de asilo político', 'Comité Español de Disciplina Deportiva (vía de fiscalización)',
  `Autorización de la ${R('Sección Segunda de la Comisión de Propiedad Intelectual')} · procedimiento del art. 12 bis de la Ley de Partidos Políticos`]));
v('Artículo 12 — Sala del Tribunal Supremo', cols('Quién conoce de qué (arts. 10, 11 y 12)',
  [{ t: 'Salas de los TSJ (art. 10)', l: [`${R('Salas de lo Contencioso-Administrativo de los Tribunales Superiores de Justicia')}: única instancia (actos de entidades locales y CC. AA. no atribuidos a Juzgados…)`, `${R('Tribunal Económico-Administrativo Central en materia de tributos cedidos')}`, `Órganos de la AGE de ${R('nivel orgánico inferior al de Ministro o Secretario de Estado')} (personal, propiedades especiales y expropiación)`, `${R('Ley de Defensa de la Competencia')} (órganos de las CC. AA.)`, `${R('En segunda instancia')}: apelaciones contra Juzgados · ${R('recursos de queja')}`, `${R('Recurso de casación en interés de la ley (art. 101)')}`] },
   { t: 'Audiencia Nacional (art. 11)', l: ['Única instancia: disposiciones generales y actos de Ministros y Secretarios de Estado', `Actos de Ministros y SE que ${R('rectifiquen en vía de recurso o en procedimiento de fiscalización o de tutela')}`, `${R('Resoluciones del Tribunal Administrativo Central de Recursos Contractuales')}`, `${R('Recursos de la CNMC en defensa de la unidad de mercado')}`, 'Segunda instancia: apelaciones contra Juzgados Centrales · recursos de revisión', 'Actos del Banco de España, CNMV y FROB (Ley 11/2015)'] },
   { t: 'Tribunal Supremo (art. 12)', l: [`${R('Actos y disposiciones del Consejo de Ministros y de las Comisiones Delegadas del Gobierno')}`, 'Actos del CGPJ y del Fiscal General del Estado', 'Personal y gestión patrimonial de Congreso, Senado, TC, Tribunal de Cuentas y Defensor del Pueblo', 'Recursos de casación de cualquier modalidad y recursos de queja', `Recursos de revisión contra sentencias firmes de ${R('las Salas de lo Contencioso-administrativo de los TSJ')}, AN y TS`, 'Junta Electoral Central'] }], null));
v('Artículo 13 — Criterios', arbol('Reglas de competencia territorial (art. 13)', `${D('Distribución de competencia')}`, [
  `Referencias al Estado, CC. AA. y Entidades locales: ${R('comprenden a las Entidades y Corporaciones dependientes o vinculadas')}`,
  `Salvo disposición en contrario, ${R('la competencia por razón de la materia prevalece sobre la del órgano administrativo autor del acto')}`,
  { t: 'Reglas territoriales:', sub: ['Segunda · a elección del demandante: su domicilio o la sede del órgano autor (responsabilidad patrimonial, personal, propiedades especiales y sanciones)', `CC. AA. y Entidades locales: ${R('limitada a la circunscripción del TSJ en que tenga su sede el órgano que dictó el acto')}`, `Tercera · ${R('el órgano en cuya circunscripción radiquen los inmuebles afectados')} (planes de ordenación urbana, expropiación…)`] },
  `Pluralidad de destinatarios: ${R('el órgano en cuya circunscripción tenga su sede el órgano que dictó el acto')}`]));
v('Artículo 19 — Legitimación', arbol('Capacidad y legitimación (arts. 18 y 19)', `${D('Quién puede litigar')}`, [
  `Capacidad (art. 18): ${R('menores de edad para la defensa de aquellos derechos e intereses cuya actuación les esté permitida sin asistencia de quien ejerza la patria potestad, tutela o curatela')}`,
  `${R('Grupos de afectados, uniones sin personalidad o patrimonios independientes o autónomos')}: capacidad cuando la Ley lo declare expresamente`,
  `Acción popular: ${R('cualquier ciudadano')}, en los casos expresamente previstos por las Leyes`,
  `Acoso sexual y acoso discriminatorio: ${R('la persona acosada será la única legitimada')}`,
  'Administraciones (AGE, CC. AA., Entidades locales): para impugnar actos que afecten a su autonomía · corporaciones, asociaciones y sindicatos: intereses colectivos',
  `Vecinos en nombre de las Entidades locales: ${R('legislación de régimen local')}`]));
v('Artículo 20 — Quiénes NO', arbol('Quiénes NO pueden recurrir (art. 20)', `${K('No')} pueden impugnar la actividad de la Administración de la que dependan`, [
  'a) Los órganos de la misma y los miembros de sus órganos colegiados, salvo que una Ley lo autorice expresamente',
  'b) Los particulares cuando obren por delegación o como meros agentes o mandatarios de ella',
  'c) Las Entidades de Derecho público dependientes o vinculadas, respecto de la Administración de la que dependan (salvo estatuto específico de autonomía)']));
v('Artículo 21 — Parte demandada', arbol('Parte demandada (art. 21)', `${D('Parte demandada')}`, [
  'a) Las Administraciones públicas u órganos del art. 1.3 contra cuya actividad se dirige el recurso',
  `b) ${R('Las personas o entidades cuyos derechos o intereses legítimos pudieran quedar afectados por la estimación de las pretensiones del demandante')}`,
  `c) Las aseguradoras de las Administraciones, que ${R('siempre serán parte codemandada junto con la Administración a quien aseguren')}`,
  `Recursos contra órganos de contratación: ${R('no tendrán la consideración de parte demandada, siéndolo las personas o Administraciones favorecidas por el acto')}`,
  `Causahabiente: puede ${R('suceder en cualquier estado del proceso a la persona que inicialmente hubiere actuado como parte')}`]));
v('Artículo 24 — Representación y defensa de las Administraciones', cols('Representación y defensa (arts. 23 y 24)',
  [{ t: 'Partes (art. 23)', l: ['Órganos unipersonales: Procurador (potestativo) y siempre Abogado', `Órganos colegiados: ${R('las partes deberán conferir su representación a un Procurador y ser asistidas por')} Abogado`, `Funcionarios por sí mismos: ${R('cuestiones de personal que no impliquen separación de empleados públicos inamovibles')}`, `Representación conferida ${R('electrónicamente')}`] },
   { t: 'Administraciones (art. 24)', l: [`${R('Ley Orgánica del Poder Judicial')}`, `${R('Ley de Asistencia Jurídica al Estado e Instituciones Públicas')}`, 'Normas de las Comunidades Autónomas en el marco de sus competencias'] }], null));
v('Artículo 27 — Cuestión de ilegalidad', arbol('Actividad impugnable y cuestión de ilegalidad (arts. 25-28)', `${D('Recurso contencioso-administrativo')}`, [
  'Art. 25 · disposiciones generales y actos expresos y presuntos que pongan fin a la vía administrativa (definitivos o de trámite cualificados)',
  `También ${R('contra la inactividad de la Administración y contra sus actuaciones materiales que constituyan vía de hecho')}`,
  { t: 'Art. 27 · cuestión de ilegalidad:', sub: [`sentencia firme estimatoria por ilegalidad de la disposición: se plantea ${R('ante el Tribunal competente para conocer del recurso directo contra la disposición')}`, `mismo Tribunal: ${R('la sentencia declarará la validez o nulidad de la disposición general')}`, `${R('Sin necesidad de plantear cuestión de ilegalidad')}, ${R('el Tribunal Supremo')} anula la disposición`] },
  'Art. 28 · NO es admisible contra actos reproducción de otros definitivos y firmes ni confirmatorios de actos consentidos']));
v('Artículo 30 — Vía de hecho', cols('Inactividad y vía de hecho (arts. 29 y 30)',
  [{ t: 'Inactividad · prestación concreta (29.1)', l: ['Reclamación a la Administración', `${P('Tres meses')}: ${R('en el plazo de tres meses desde la fecha de la reclamación')} sin cumplir ni llegar a un acuerdo`, 'Recurso: dos meses desde el vencimiento'] },
   { t: 'Inactividad · actos firmes (29.2)', l: ['Solicitar su ejecución', `${R('En el plazo de un mes')} desde la petición`, `Recurso por el ${R('procedimiento abreviado')} (art. 78)`] },
   { t: 'Vía de hecho (30)', l: ['Requerimiento a la Administración actuante intimando su cesación', `${R('Dentro de los diez días siguientes a la presentación del requerimiento')}`, 'Después: recurso directamente'] }], null));
v('Artículo 44 — Litigios entre Administraciones', cols('Lesividad y litigios entre Administraciones (arts. 43 y 44)',
  [{ t: 'Lesividad (art. 43)', l: ['La propia Administración autora de un acto quiere demandar su anulación', `Debe, ${R('previamente, declararlo lesivo para el interés público')}`, `Recurso: ${P('dos meses')} desde el día siguiente a la declaración (art. 46.5) · se inicia por demanda`] },
   { t: 'Entre Administraciones (art. 44)', l: [`${R('No cabrá interponer recurso en vía administrativa')}`, 'Requerimiento previo (potestativo): derogar, anular o revocar, cesar o modificar la actuación, o iniciar la actividad obligada', `Plazo del requerimiento: ${R('dos meses')} desde la publicación o desde que se conoció o pudo conocer`] }], null));
v('Artículo 45 — Escrito de interposición', flujo('Interposición del recurso (art. 45)', [
  { et: '1', t: `Escrito ${R('reducido a citar la disposición, acto, inactividad o actuación constitutiva de vía de hecho que se impugne')} y a solicitar que se tenga por interpuesto` },
  { et: '2', t: `Documentos: representación (${R('salvo si figurase unido a otro recurso pendiente ante el mismo Juzgado o Tribunal')}); copia de la disposición o acto; si hay inactividad o vía de hecho, ${R('se mencionará el órgano o dependencia al que se atribuya')}` },
  { et: '3', t: `El Secretario judicial examina la validez; si faltan documentos, requiere subsanación en ${R('diez días')}; si no, archivo` },
  { bif: [{ et: 'Lesividad', t: `Se inicia ${R('por demanda formulada con arreglo al artículo 56.1')}, con la declaración de lesividad y el expediente` }, { et: 'Sin terceros', t: `El recurso contra disposición, acto, inactividad o vía de hecho sin terceros interesados ${R('podrá iniciarse también mediante demanda')}` }] }]));
v('Artículo 46 — Plazos para interponer', tabla('Recurso contencioso-administrativo: plazos de interposición y cómputo (arts. 45 y 46 · EX)', ['Objeto del recurso', 'Plazo de interposición y cómputo'], [
  { l: 'DISPOSICIÓN GENERAL', h: [
    { p: '2 meses', t: `${R('Contados desde el día siguiente al de la publicación de la disposición')} impugnada` }] },
  { l: 'ACTO', h: [
    { l: 'EXPRESO', c: 'o', h: [
      { p: '2 meses', t: `${R('Contados desde el día siguiente al de la notificación o publicación del acto que ponga fin a la vía administrativa')}, si fuera expreso` }] },
    { l: 'PRESUNTO', c: 'o', h: [
      { p: '6 meses*', c: 'o', t: `El artículo 46.1 LJCA dispone que el plazo es de ${P('6 meses')}, ${R('a partir del día siguiente a aquel en que, de acuerdo con la normativa específica, se produzca el acto presunto')}` },
      { p: 'NOTA', c: 'n', t: `Sin embargo, el <mark class="m-autoridad">Tribunal Constitucional</mark> ha interpretado que el plazo de caducidad de 6 meses ${K('no')} resulta aplicable a los supuestos de silencio negativo: queda abierta (${D('sine die')}) la vía de recurso mientras la Administración ${K('no')} resuelva expresamente` }] },
    { l: 'Si se utilizó recurso potestativo de reposición (actos que causan estado)', c: 'o', h: [
      { p: '2 meses', t: `${R('Desde el día siguiente a aquel en que se notifique la resolución expresa del recurso potestativo de reposición')}` },
      { p: '6 meses', c: 'o', t: `Desde el día siguiente a aquel en que el recurso deba entenderse ${R('presuntamente desestimado')}` }] }] },
  { l: 'VÍA DE HECHO', h: [
    { l: 'Con requerimiento previo de cesación', c: 'v', h: [
      { p: '10 días', c: 'v', t: `${R('Diez días')} desde el día siguiente a la terminación del plazo para atender el requerimiento (que es de ${P('10 días')})` }] },
    { l: `Sin requerimiento previo de cesación`, c: 'v', h: [
      { p: '20 días', c: 'v', t: `${R('Veinte días desde el día en que se inició la actuación')} administrativa en vía de hecho` }] }] },
  { l: 'INACTIVIDAD DE LA ADMINISTRACIÓN (obligación de realizar una prestación · inejecución de actos firmes)', h: [
    { l: 'Reclamación previa (3 meses)', c: 'c', h: [
      { p: '2 meses', t: `${R('A partir del día siguiente al vencimiento de los plazos señalados')}: transcurso del plazo de ${P('3 meses')} sin que la Administración atendiese la reclamación o no hubiera llegado a un acuerdo con los interesados` }] },
    { l: 'Solicitud de ejecución (1 mes)', c: 'c', h: [
      { p: '2 meses', t: `Desde el día siguiente al transcurso del plazo de ${P('1 mes')} sin que la Administración ejecute sus actos firmes. Tramitación por el procedimiento abreviado` }] }] },
  { l: 'RECURSO DE LESIVIDAD (demanda)', h: [
    { p: '2 meses', t: `${R('Dos meses')} desde el día siguiente a la fecha de la declaración de lesividad` }] },
  { l: 'LITIGIOS ENTRE ADMINISTRACIONES PÚBLICAS (no cabe interponer recurso en vía administrativa)', h: [
    { l: 'Sin requerimiento previo', c: 'v', h: [
      { p: '2 meses', t: `${R('Dos meses, salvo que por Ley se establezca otra cosa')}` }] },
    { l: 'Con requerimiento previo', c: 'v', h: [
      { p: '2 meses', t: `${R('Desde el día siguiente a aquel en que se reciba la comunicación del acuerdo expreso o se entienda presuntamente rechazado')} (transcurso de ${P('1 mes')} sin contestación al requerimiento)` }] }] }]));
v('Artículo 47 — Anuncio', flujo('Anuncio y expediente administrativo (arts. 47 y 48)', [
  { et: '47', t: `El letrado de la Administración de Justicia, ${R('en el siguiente día hábil')}, acuerda anunciar la interposición si lo solicita el recurrente` },
  { et: '48.1', t: `Requiere a la Administración el expediente: se reclama al ${R('órgano autor de la disposición o acto impugnado o a aquél al que se impute la inactividad o vía de hecho')}` },
  { et: '48.3', t: `Remisión en el plazo ${K('improrrogable')} de ${R('veinte días')}, a contar ${R('desde que la comunicación judicial tenga entrada en el registro general del órgano requerido')}` },
  { et: '48.4', t: `${R('Completo, en soporte electrónico, foliado, autentificado y acompañado de un índice, asimismo autentificado')}` },
  { et: '48.7', t: `Si no llega: multa coercitiva de ${P('300 a 1.200 euros')}, reiterada ${R('cada veinte días')}` },
  { et: '48.10', t: `Tres multas sin éxito: ${R('pondrá los hechos en conocimiento del Ministerio Fiscal, sin perjuicio de seguir imponiendo nuevas multas')}` },
  { et: '48.8-9', t: `Contra el auto de multa: ${R('recurso de reposición')} · multas firmes: ${R('por vía judicial de apremio')}` }]));
v('Artículo 69 — Inadmisibilidad', arbol('Inadmisibilidad (art. 69)', `${D('Sentencia de inadmisibilidad')}`, [
  'a) Falta de jurisdicción', 'b) Persona incapaz, no debidamente representada o no legitimada', 'c) Objeto no susceptible de impugnación',
  'd) Cosa juzgada o litispendencia', 'e) Escrito inicial presentado fuera de plazo', `Art. 67: sentencia en ${P('diez días')} desde que el pleito esté concluso · art. 68: fallo con ${R('pronunciamiento respecto de las costas')}`]));
v('Artículo 71 — Contenido', cols('Desestimación, estimación y efectos (arts. 70-72)',
  [{ t: 'Art. 70 · Desestimación y estimación', l: [`${R('Desestimará')} el recurso si se ajustan a Derecho`, `${R('Estimará')} si hay cualquier infracción del ordenamiento, incluso desviación de poder`, `Desviación de poder: ${R('el ejercicio de potestades administrativas para fines distintos de los fijados por el ordenamiento jurídico')}`, `Indemnización: ${R('cuando lo pida expresamente el demandante y consten probados elementos suficientes')} (si no, bases)`] },
   { t: 'Art. 72 · Efectos', l: [`Inadmisibilidad o desestimación: solo ${R('entre las partes')}`, `Anulación de disposición general: efectos generales desde ${R('el día en que sea publicado su fallo y preceptos anulados en el mismo periódico oficial')}`, `Se publican también los actos que afecten ${R('a una pluralidad indeterminada de personas')}`, `Reconocimiento de situación individualizada: ${R('solo producirá efectos entre las partes')} (extensión: arts. 110 y 111)`] }], null));
v('Artículo 77 — Acuerdo entre las partes', cols('Formas de terminación del proceso (arts. 74-77)',
  [{ t: 'Desistimiento (74)', l: [`${R('En cualquier momento anterior a la sentencia')}`, `Del representante: ${R('que lo ratifique el recurrente o esté autorizado')}`, `Traslado a las partes: ${P('cinco días')}`, `Varios recurrentes: ${R('continuará respecto de los que no hubieren desistido')}`, `${R('No implicará necesariamente la condena en costas')}`] },
   { t: 'Allanamiento (75)', l: ['Sentencia conforme con el demandante', `Si infringe manifiestamente el ordenamiento: audiencia común de ${P('diez días')}`, `Varios demandados: ${R('seguirá respecto de los que no se allanaron')}`] },
   { t: 'Reconocimiento en vía administrativa (76)', l: [`${R('Cualquiera de las partes')} puede ponerlo en conocimiento`, `Audiencia común: ${P('cinco días')}`, 'Auto de terminación y archivo'] },
   { t: 'Acuerdo (77)', l: [`${R('Una vez formuladas la demanda y la contestación')}`, 'Materias susceptibles de transacción', `${R('No suspenderá el curso de las actuaciones salvo que todas las partes personadas lo solicitasen')}`] }], null));
v('Artículo 104 — Ejecución: comunicación y plazo', flujo('Ejecución de la sentencia (arts. 103-105)', [
  { et: '103', t: `Corresponde ${K('exclusivamente')} a los ${R('juzgados y tribunales de este orden')}; ejercicio: ${R('el que haya conocido del asunto en primera o única instancia')}` },
  { et: '103.4', t: `${R('Serán nulos de pleno derecho')} los actos contrarios a la sentencia dictados para eludir su cumplimiento` },
  { et: '104.1', t: `Sentencia firme: el LAJ lo comunica en ${P('diez días')} al órgano responsable` },
  { et: '104.2', t: `Transcurridos ${P('dos meses')} (o el plazo fijado): cualquiera de las partes puede instar la ${D('ejecución forzosa')}` },
  { et: '105', t: `${R('No podrá suspenderse el cumplimiento ni declararse la inejecución total o parcial del fallo')} · imposibilidad: se manifiesta al juez ${R('a través del representante procesal de la Administración')}` }]));
v('Artículo 106 — Condena al pago', arbol('Condena al pago de cantidad (art. 106)', `${D('Pago')}`, [
  `Pago con cargo a crédito ampliable · si hace falta modificación presupuestaria: ${R('los tres meses siguientes al día de notificación de la resolución judicial')}`,
  `Interés legal del dinero: ${R('desde la fecha de notificación de la sentencia dictada en única o primera instancia')}`,
  `Tras tres meses, ejecución forzosa: puede incrementarse en ${R('dos puntos')} el interés legal si falta diligencia`,
  `Trastorno grave a su Hacienda: ${R('propuesta razonada')} al Juez`, `Se aplica a ${R('la ejecución provisional de las sentencias')}`, `Cualquiera puede pedir la ${R('compensación con créditos que la Administración ostente contra el recurrente')}`]));
v('Artículo 108 — Condena a hacer', arbol('Condena a hacer o dictar un acto (art. 108) y publicación (art. 107)', `${D('Incumplimiento')}`, [
  'Ejecutar con medios propios o con colaboración de las autoridades de la Administración condenada u otras',
  `Medidas para el fallo: ${R('ejecución subsidiaria con cargo a la Administración condenada')}`,
  `Actividad contraria al fallo: ${R('a reponer la situación al estado exigido por el fallo')} y fijar daños y perjuicios`,
  `Demolición: condición previa, ${R('la prestación de garantías suficientes para responder del pago de las indemnizaciones debidas a terceros de buena fe')}`,
  `Art. 107: ${R('inscripción del fallo en los registros públicos')} · publicación en ${P('diez días')} desde la firmeza si anula una disposición general`]));
v('Artículo 109 — Incidente de ejecución', flujo('Incidente de ejecución (art. 109)', [
  { et: '1', t: 'Cualquier parte o persona afectada, mientras no conste la total ejecución, promueve el incidente: órgano responsable, plazo máximo, medios y procedimiento' },
  { et: '2', t: `Traslado a las partes: ${R('en plazo común que no excederá de veinte días')}` },
  { et: '3', t: `El Juez o Tribunal dicta auto ${R('en el plazo de diez días')}` }]));
v('Artículo 111 — Extensión en recursos suspendidos', flujo('Extensión de efectos de las sentencias (arts. 110 y 111)', [
  { et: '1', t: 'Materias: tributaria, de personal al servicio de la Administración y de unidad de mercado' },
  { et: '2', t: `Requisitos: idéntica situación jurídica · el mismo juez o tribunal competente por razón del territorio · solicitud en ${P('un año')} desde la última notificación` },
  { et: '3', t: `Solicitud ${R('directamente al órgano jurisdiccional competente que hubiera dictado la resolución')}` },
  { et: '4', t: `${R('En los veinte días siguientes')}, el Secretario recaba informe de la Administración · alegaciones ${P('cinco días')} · auto` },
  { et: '5', t: `Se desestima si ${R('existiera cosa juzgada')} o doctrina contraria a la jurisprudencia del TS` },
  { et: '6', t: `Recurso de revisión o casación en interés de la ley pendiente: ${R('quedará en suspenso la decisión del incidente')}` },
  { et: '111', t: `Recursos suspendidos (art. 37.2): ${P('cinco días')} para pedir extensión, continuar o desistir` }]));
v('Artículo 113 — Ejecución del acuerdo', cols('Multas coercitivas y ejecución del acuerdo (arts. 48, 112 y 113)',
  [{ t: 'Multas coercitivas', l: [`Art. 48.7 (expediente): ${P('300 a 1.200 euros')} · reiterada cada 20 días`, `Art. 112 (efectividad de la sentencia): ${R('de ciento cincuenta a mil quinientos euros')} a autoridades, funcionarios o agentes · reiterables`, 'Testimonio de particulares para exigir responsabilidad penal'] },
   { t: 'Ejecución del acuerdo (art. 113)', l: [`Vencido el plazo fijado: cualquiera de las partes puede ${R('instar su ejecución forzosa')}`, `Sin plazo: requerir a la otra parte y ${P('transcurridos dos meses')} instar la ejecución forzosa`] }], null));
v('Artículo 114 — Amparo judicial', arbol('Procedimiento de amparo judicial (arts. 114 y 115)', `${D('Amparo judicial')} (art. 53.2 CE)`, [
  `Pretensiones: ${R('restablecer o preservar los derechos o libertades por razón de los cuales el recurso hubiere sido formulado')}`, `Tramitación de carácter ${R('preferente')}`,
  `Plazo: ${P('diez días')}, desde el día siguiente a la notificación, publicación, requerimiento o transcurso del plazo · inactividad, recurso potestativo o vía de hecho sin requerimiento: ${R('transcurridos veinte días desde la reclamación')}, presentación o inicio`,
  `Escrito: ${R('con precisión y claridad el derecho o derechos cuya tutela se pretende')}`]));
v('Artículo 121 — Sentencia', flujo('Tramitación del amparo judicial (arts. 116-121)', [
  { et: '116.1', t: `${R('En el mismo día de la presentación del recurso o en el siguiente')}, se reclama el expediente: remisión en ${P('cinco días')}` },
  { et: '116.2', t: `Emplazamiento de interesados para comparecer como demandados: ${R('plazo de cinco días')}` },
  { et: '116.4-5', t: `Falta de envío del expediente: ${R('no suspenderá el curso de los autos')} · expediente tardío: ${R('cuarenta y ocho horas, en el que podrán hacer alegaciones')}` },
  { et: '117', t: `Decreto mandando seguir las actuaciones el siguiente día · posible inadmisión: comparecencia ${R('antes de transcurrir cinco días')}` },
  { et: '118', t: `Demanda: plazo improrrogable de ${R('ocho días')}` },
  { et: '119', t: `Alegaciones de los demandados y del Ministerio Fiscal: plazo común e improrrogable de ${R('ocho días')}` },
  { et: '120', t: `Prueba: se decide el siguiente día · nunca superior a ${R('veinte días comunes para su proposición y práctica')}` },
  { et: '121', t: `Sentencia ${R('en el plazo de cinco días')} · contra sentencias de los Juzgados: ${R('apelación en un solo efecto')}` }]));
v('Artículo 122 — Prohibición de reuniones', flujo('Prohibición de reuniones (art. 122)', [
  { et: '1', t: `Los promotores recurren ${R('dentro de las cuarenta y ocho horas siguientes a la notificación de la prohibición o modificación')}` },
  { et: '2', t: `El LAJ convoca a una audiencia ${R('en el plazo improrrogable de cuatro días')}` },
  { et: '3', t: `El tribunal resuelve sin ulterior recurso: ${R('mantener o revocar la prohibición o las modificaciones propuestas')}` }]));
v('Artículo 122 bis — Autorización judicial: sociedad', flujo('Autorización judicial: sociedad de la información (art. 122 bis)', [
  { et: '1', t: `Solicitud de los órganos competentes · el Juzgado, ${R('en el plazo de 24 horas siguientes a la petición')} y previa audiencia del Ministerio Fiscal, resuelve` },
  { et: '2', t: `Medidas de la Sección Segunda de la Comisión de Propiedad Intelectual: autorización previa · traslado ${R('plazo improrrogable de dos días')} · alegaciones escritas ${P('cinco días')}` },
  { et: '3', t: `Sin nuevos hechos: el Juez resuelve en ${R('dos días')} por auto · solo puede autorizar o denegar la ejecución` }]));
v('Artículo 122 ter', flujo('Autorización judicial: transferencia internacional de datos (art. 122 ter)', [
  { et: '1', t: 'Solicitud de la autoridad de protección de datos al Tribunal competente (decisión de la Comisión Europea sobre transferencia internacional)' },
  { et: '2', t: `Partes: la autoridad, quienes lo fueran ante ella y, en todo caso, ${R('la Comisión Europea')}` },
  { et: '3', t: `La admisión o inadmisión ${R('confirmará, modificará o levantará la suspensión')} del procedimiento ante la autoridad` },
  { et: '4', t: `Personación: ${R('tres días')}` }, { et: '5', t: `Alegaciones: ${R('plazo de diez días')}, pudiendo pedir prueba` },
  { et: '6', t: `Vista: ${R('si alguna de las partes lo hubiese solicitado y el órgano jurisdiccional lo estimase pertinente')}` }]));
v('Artículo 122 ter', plazos('Plazos del Tema 13 (resumen)', [
  ['10 días', 'Audiencia por falta de jurisdicción (art. 5) · LAJ comunica sentencia firme (art. 104) · sentencia (art. 67) · vía de hecho (arts. 30 y 46)'],
  ['1 mes', 'Nueva demanda tras falta de jurisdicción (art. 5.3) · ejecución de actos firmes (art. 29.2)'],
  ['2 meses', 'Recurso ordinario (art. 46) · requerimiento entre Administraciones (art. 44) · lesividad · ejecución forzosa (art. 104.2)'],
  ['6 meses', 'Recurso contra acto presunto (art. 46.1)'], ['20 días', 'Remisión del expediente (art. 48.3) · vía de hecho sin requerimiento (art. 46.3) · alegaciones del incidente (art. 109)'],
  ['3 meses', 'Inactividad: reclamación (art. 29.1) · modificación presupuestaria para pagar (art. 106)'], ['1 año', 'Solicitar la extensión de efectos de una sentencia (art. 110)'],
  ['8 días', 'Demanda y alegaciones en el amparo judicial (arts. 118 y 119)'], ['48 horas', 'Recurso contra la prohibición de reuniones (art. 122) · expediente tardío en amparo (art. 116.5)'],
  ['24 h / 2 días', 'Autorización judicial del art. 122 bis'], ['5 días', 'Sentencia de amparo (art. 121) · desistimiento (art. 74) · expediente (art. 116)']]));

L.inserta(13, V);
