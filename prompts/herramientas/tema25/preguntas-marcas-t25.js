// Tema 25 · fase 2 de las marcas (17/11/2026): apartados con marca (R / EXAMEN) sin pregunta oficial (cobertura-marcas.js 25). Todas al banco OFICIAL (25-128…).
// Cita literal comprobada contra tema25/oficial-sin-pag.txt; la correcta nunca la más larga.  Uso: node prompts/herramientas/tema25/preguntas-marcas-t25.js
const N = {
  loe: ['Ley Orgánica 2/1986, de 13 de marzo, de Fuerzas y Cuerpos de Seguridad', 'Ley Orgánica 2/1986, de Fuerzas y Cuerpos de Seguridad', 'Ley Orgánica 2/1986, de Fuerzas y Cuerpos de Seguridad'],
  l31: ['Ley 31/2010, de 27 de julio, sobre simplificación del intercambio de información e inteligencia entre los servicios de seguridad de los Estados miembros de la Unión Europea', 'Ley 31/2010, de 27 de julio, sobre simplificación del intercambio de información e inteligencia entre los', 'Ley 31/2010, de 27 de julio, sobre simplificación del intercambio de información e inteligencia entre los'],
  rd: ['Real Decreto 1087/2010, de 3 de septiembre, por el que se aprueba el Reglamento que regula las Juntas Locales de Seguridad', 'Real Decreto 1087/2010, por el que se aprueba el Reglamento que regula las Juntas Locales de Seguridad', 'Real Decreto 1087/2010, por el que se aprueba el Reglamento que regula las Juntas Locales de Seguridad'],
  eur: ['Reglamento (UE) 2016/794 del Parlamento Europeo y del Consejo, de 11 de mayo de 2016, relativo a la Agencia de la Unión Europea para la Cooperación Policial (Europol)', 'Reglamento (UE) 2016/794 de Europol', 'Reglamento (UE) 2016/794, relativo a la Agencia de la Unión Europea para la Cooperación Policial (EUROPOL)'],
};
const R = []; let k = 0;
const q = (n, a, r, e, ok, mal, t) => { const pos = (k++ * 3 + 1) % 4; const o = mal.slice(); o.splice(pos, 0, ok); R.push({ n: N[n], ia: false, a, r, e, o, c: pos, t, p: '' }); };
q('loe', 'art. 1.1', 'Disposiciones generales', 'La Seguridad Pública es:',
  'Competencia exclusiva del Estado, y su mantenimiento corresponde al Gobierno de la Nación.',
  ['Competencia compartida del Estado y las Comunidades Autónomas, y su mantenimiento corresponde al Gobierno de la Nación.', 'Competencia exclusiva del Estado, y su mantenimiento corresponde al Ministro del Interior.', 'Competencia exclusiva del Estado, y su mantenimiento corresponde a las Cortes Generales.'],
  'La Seguridad Pública es competencia exclusiva del Estado. Su mantenimiento corresponde al Gobierno de la Nación.');
q('loe', 'art. 13.1', 'De la Guardia Civil', 'El Cuerpo de la Guardia Civil se estructura jerárquicamente:',
  'Según los diferentes empleos, de conformidad con su naturaleza militar.',
  ['Según las diferentes categorías, de conformidad con su naturaleza civil.', 'Según los diferentes empleos, de conformidad con su naturaleza policial.', 'Según las diferentes escalas, de conformidad con su naturaleza militar.'],
  'El Cuerpo de la Guardia Civil se estructura jerárquicamente según los diferentes empleos, de conformidad con su naturaleza militar.');
q('loe', 'art. 29.2', 'De la organización de Unidades de Policía Judicial', 'Para el cumplimiento de la función de Policía Judicial, tendrán carácter colaborador de las Fuerzas y Cuerpos de Seguridad del Estado:',
  'El personal de Policía de las Comunidades Autónomas y de las Corporaciones Locales.',
  ['El personal de la Policía Local y de las empresas de seguridad privada.', 'El personal de Policía de las Comunidades Autónomas y de las Fuerzas Armadas.', 'Los funcionarios de las Corporaciones Locales y del Servicio de Vigilancia Aduanera.'],
  'tendrán carácter colaborador de las Fuerzas y Cuerpos de Seguridad del Estado el personal de Policía de las Comunidades Autónomas y de las Corporaciones Locales');
q('l31', 'art. 4.1', 'Canales de comunicación', 'En el intercambio de información e inteligencia entre los servicios de seguridad, la lengua utilizada para la solicitud y el intercambio de información será:',
  'La aplicable para el canal de comunicación empleado.',
  ['El castellano, en todo caso, cuando intervenga un servicio de seguridad español.', 'El inglés, como lengua de trabajo de los canales normalizados de cooperación policial.', 'La que acuerden los servicios de seguridad intervinientes en cada intercambio.'],
  'La lengua utilizada para la solicitud y el intercambio de información será la aplicable para el canal de comunicación empleado.');
q('l31', 'art. 11.2', 'Motivos para no comunicar información o inteligencia', 'Cuando la solicitud se refiera a un delito castigado con pena de prisión igual o inferior a un año con arreglo a la legislación penal española, el servicio español de seguridad competente:',
  'Podrá negarse a facilitar la información o inteligencia requerida.',
  ['Se negará a facilitar la información o inteligencia requerida.', 'Deberá facilitar la información o inteligencia requerida en el plazo de ocho horas.', 'Solo podrá negarse previa autorización de la autoridad judicial competente.'],
  'podrá negarse a facilitar la información o inteligencia requerida');
q('rd', 'art. 5.4', 'Composición', 'Las Comisiones Locales de Seguridad serán:',
  'Presididas por el Alcalde y copresididas por el Delegado o Subdelegado del Gobierno si concurre a su reunión.',
  ['Presididas por el Delegado del Gobierno y copresididas por el Alcalde en todo caso.', 'Presididas por el Alcalde y copresididas por el Jefe de la Policía Local si concurre a su reunión.', 'Presididas por el Subdelegado del Gobierno y copresididas por el Jefe de la Guardia Civil.'],
  'Las Comisiones Locales de Seguridad serán presididas por el Alcalde y copresididas por el Delegado o Subdelegado del Gobierno si concurre a su reunión');
q('rd', 'art. 14.2', 'Comisiones de Coordinación Policial', 'La Comisión de Coordinación Policial tendrá la función de asegurar la coordinación y la ejecución operativa de las acciones conjuntas previstas en los Planes de Seguridad o en los programas operativos adoptados o acordados por la Junta Local de Seguridad, a quien corresponde:',
  'Supervisar su desarrollo y evaluar sus resultados.',
  ['Dirigir su ejecución y aprobar sus resultados.', 'Autorizar su desarrollo y ejecutar sus resultados.', 'Supervisar su desarrollo y aprobar sus resultados.'],
  'a quien corresponde supervisar su desarrollo y evaluar sus resultados');
q('eur', 'art. 4.5', 'Funciones', 'Europol, en la realización de sus tareas:',
  'No aplicará medidas coercitivas.',
  ['Podrá aplicar medidas coercitivas con autorización del Consejo de Administración.', 'Podrá aplicar medidas coercitivas en el territorio de los Estados miembros que lo soliciten.', 'No aplicará medidas coercitivas salvo en la lucha contra el terrorismo.'],
  'Europol no aplicará medidas coercitivas en la realización de sus tareas.');
q('eur', 'art. 14.3', 'Reuniones del Consejo de Administración', 'El Consejo de Administración se reunirá, al menos:',
  'Dos veces al año en sesión ordinaria.',
  ['Una vez al año en sesión ordinaria.', 'Tres veces al año en sesión ordinaria.', 'Cuatro veces al año en sesión ordinaria.'],
  'El Consejo de Administración se reunirá al menos dos veces al año en sesión ordinaria.');
q('eur', 'art. 41.3', 'Responsable de protección de datos', 'El responsable de protección de datos será nombrado por un período de cuatro años. Su mandato será renovable hasta un máximo de:',
  'Ocho años.',
  ['Seis años.', 'Diez años.', 'Doce años.'],
  'El responsable de protección de datos será nombrado por un período de cuatro años. Su mandato será renovable hasta un máximo de ocho años.');
q('eur', 'art. 49.2', 'Responsabilidad', 'El Tribunal de Justicia de la Unión Europea será competente para pronunciarse en virtud de cualquier:',
  'Cláusula compromisoria en un contrato celebrado por Europol.',
  ['Acuerdo de colaboración celebrado por Europol con un país tercero.', 'Decisión del Consejo de Administración de Europol.', 'Convenio suscrito por Europol con una organización internacional.'],
  'El Tribunal de Justicia de la Unión Europea será competente para pronunciarse en virtud de cualquier cláusula compromisoria en un contrato celebrado por Europol.');
require('../preguntas-marcas-lib.js')({ T: 25, fmt: 'nuevo', fuentes: ['tema25/oficial-sin-pag.txt'], desdeOf: 128, desdeIA: 1700, Q: R });
