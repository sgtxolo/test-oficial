// Tema 23 · fase 2 de las marcas (16/11/2026): apartados con marca suya (EXAMEN / ✱ / R) sin pregunta oficial (cobertura-marcas.js 23).
// Todas al banco OFICIAL (23-133…): EXAMEN, ✱ y R → oficiales. Cita literal comprobada contra tema23/oficial.txt; la correcta nunca la más larga.
// Uso: node prompts/herramientas/tema23/preguntas-marcas-t23.js
const NL = 'Ley 5/2014, de 4 de abril, de Seguridad Privada', NC = 'Ley 5/2014 de Seguridad Privada';
const AG = 'General / Seguridad Privada', AS = 'De la Prestación de los Servicios de Seguridad Privada', AR = 'Del Régimen Sancionador: Infracciones y Sanciones';
const R = []; let k = 0;
const q = (ap, a, r, e, ok, mal, t) => { const pos = (k++ * 3 + 1) % 4; const o = mal.slice(); o.splice(pos, 0, ok); R.push({ n: [NL, NC, ap], ia: false, a, r, e, o, c: pos, t, p: '' }); };
q(AG, 'art. 2.4', 'Definiciones', 'A los efectos de la ley, se entiende por funciones de seguridad privada:',
  'Las facultades atribuidas al personal de seguridad privada.',
  ['Los ámbitos de actuación material en que los prestadores de servicios llevan a cabo su acción empresarial y profesional.', 'Las acciones llevadas a cabo por los prestadores de servicios para materializar las actividades de seguridad privada.', 'Las disposiciones adoptadas para el cumplimiento de los fines de prevención o protección pretendidos.'],
  'Funciones de seguridad privada: las facultades atribuidas al personal de seguridad privada');
q(AG, 'art. 2.5', 'Definiciones', 'A los efectos de la ley, se entiende por medidas de seguridad privada:',
  'Las disposiciones adoptadas para el cumplimiento de los fines de prevención o protección pretendidos.',
  ['Las facultades atribuidas al personal de seguridad privada para el cumplimiento de sus fines.', 'Las acciones llevadas a cabo por los prestadores de servicios para materializar las actividades de seguridad privada.', 'Los ámbitos de actuación material en que los prestadores de servicios llevan a cabo su acción profesional.'],
  'Medidas de seguridad privada: las disposiciones adoptadas para el cumplimiento de los fines de prevención o protección pretendidos');
q(AG, 'art. 3.3', 'Ámbito de aplicación', 'El régimen sancionador y las medidas provisionales, así como el ejercicio de las facultades de inspección, serán también aplicables a aquellas empresas y personal que presten servicios o ejerzan funciones de seguridad privada:',
  'Sin estar autorizadas o haber presentado declaración responsable, o sin estar habilitados o acreditados para el ejercicio legal de los mismos.',
  ['Sin estar inscritas en el Registro Nacional de Seguridad Privada, aunque cuenten con autorización administrativa o declaración responsable.', 'Habiendo presentado declaración responsable, pero sin haber comunicado los contratos al Ministerio del Interior.', 'Sin estar autorizadas, aunque estén habilitados o acreditados para el ejercicio legal de los mismos.'],
  'serán también aplicables a aquellas empresas y personal que presten servicios o ejerzan funciones de seguridad privada sin estar autorizadas o haber presentado declaración responsable, o sin estar habilitados o acreditados para el ejercicio legal de los mismos');
q(AG, 'art. 6.1', 'Actividades compatibles', 'Quedan fuera del ámbito de aplicación de la ley, sin perjuicio de la normativa específica que pudiera resultar de aplicación, especialmente en lo que se refiere a la homologación de productos, las siguientes actividades:',
  'La fabricación, comercialización, venta, entrega, instalación o mantenimiento de elementos o productos de seguridad y de cerrajería de seguridad.',
  ['La instalación y mantenimiento de equipos de seguridad conectados a centrales receptoras de alarmas o a centros de control o de videovigilancia.', 'La explotación de centrales para la conexión, recepción y verificación de las señales de alarma.', 'El depósito, custodia y recuento de monedas y billetes, títulos-valores, joyas y metales preciosos.'],
  'La fabricación, comercialización, venta, entrega, instalación o mantenimiento de elementos o productos de seguridad y de cerrajería de seguridad');
q(AG, 'art. 7.2', 'Actividades excluidas', 'Queda fuera del ámbito de aplicación de la ley la obtención por uno mismo de información o datos, así como la contratación de servicios de recepción, recopilación, análisis, comunicación o suministro de información libre obrante en:',
  'Fuentes o registros de acceso público.',
  ['Registros públicos de acceso reservado a las Fuerzas y Cuerpos de Seguridad.', 'Fuentes o registros de las Administraciones públicas, previa autorización.', 'Archivos de entidades privadas, con consentimiento de sus titulares.'],
  'información libre obrante en fuentes o registros de acceso público');
q(AG, 'art. 9.1', 'Contratación y comunicación de servicios', 'No podrá prestarse ningún tipo de servicio de seguridad privada que no haya sido:',
  'Previamente contratado y, en su caso, autorizado.',
  ['Previamente comunicado a las Fuerzas y Cuerpos de Seguridad y, en su caso, inscrito.', 'Previamente contratado por escrito y comunicado al Registro Nacional de Seguridad Privada.', 'Autorizado por el Ministerio del Interior y comunicado a la comunidad autónoma.'],
  'No podrá prestarse ningún tipo de servicio de seguridad privada que no haya sido previamente contratado y, en su caso, autorizado');
q(AS, 'art. 42.5', 'Servicios de videovigilancia', 'La monitorización, grabación, tratamiento y registro de imágenes y sonidos por parte de los sistemas de videovigilancia estará sometida a lo previsto en la normativa en materia de protección de datos de carácter personal, y especialmente a los principios de:',
  'Proporcionalidad, idoneidad e intervención mínima.',
  ['Proporcionalidad, necesidad e injerencia mínima.', 'Legalidad, idoneidad e intervención mínima.', 'Proporcionalidad, idoneidad y reserva profesional.'],
  'y especialmente a los principios de proporcionalidad, idoneidad e intervención mínima');
q(AR, 'art. 57', 'Infracciones de las empresas', 'Pueden incurrir en las infracciones tipificadas en la ley para las empresas que desarrollen actividades de seguridad privada, además de éstas:',
  'Sus representantes legales, los despachos de detectives privados y las centrales de alarma de uso propio.',
  ['Sus representantes legales, los despachos de detectives privados y los centros de formación.', 'Los usuarios de servicios de seguridad privada y las centrales de alarma de uso propio.', 'Sus representantes legales, el personal acreditado y las centrales de alarma de uso propio.'],
  'Las empresas que desarrollen actividades de seguridad privada, sus representantes legales, los despachos de detectives privados y las centrales de alarma de uso propio, podrán incurrir en las siguientes infracciones');
q(AR, 'art. 66.1', 'Competencia sancionadora', 'En el ámbito de la Administración General del Estado, la potestad sancionadora por infracciones leves en materia de seguridad privada corresponderá:',
  'A los Delegados y a los Subdelegados del Gobierno.',
  ['Al Director General de la Policía.', 'Al Secretario de Estado de Seguridad.', 'Al Director General de la Guardia Civil.'],
  'A los Delegados y a los Subdelegados del Gobierno, para imponer las sanciones por infracciones leves');
q(AR, 'art. 72.1', 'Multas coercitivas', 'Para lograr el cumplimiento de las resoluciones sancionadoras, las autoridades competentes podrán imponer, de acuerdo con lo establecido en la legislación de procedimiento administrativo:',
  'Multas coercitivas.', ['Multas accesorias.', 'Medidas cautelares de carácter definitivo.', 'Recargos de apremio.'],
  'podrán imponer multas coercitivas, de acuerdo con lo establecido en la legislación de procedimiento administrativo');
require('../preguntas-marcas-lib.js')({ T: 23, fmt: 'nuevo', fuentes: ['tema23/oficial-sin-pag.txt'], desdeOf: 133, desdeIA: 1700, Q: R });
