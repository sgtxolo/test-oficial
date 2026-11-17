// Tema 25 · fichas «R» (RECUERDA, pregunta → respuesta) de MI PDF «TEMA 25 COOPERACION Y COORDINACION POLICIAL-2026-08-08.pdf» (págs. 135-139), R1…R30.
// Texto literal de la ley; la pregunta es el enunciado de la ficha del temario y la respuesta lo que cierra la frase.
// Uso: node prompts/herramientas/tema25/r-temario-t25.js   (escribe prompts/herramientas/rqa/t25.json para repaso-extras.js)
const fs = require('fs'), path = require('path');
const R = [
  { n: 1, norma: 'LO 2/1986', p: 'La Seguridad Pública es:', r: 'competencia exclusiva del Estado. Su mantenimiento corresponde al Gobierno de la Nación.' },
  { n: 2, norma: 'LO 2/1986', p: 'Los miembros de las Fuerzas y Cuerpos de Seguridad ajustarán su actuación al principio de:', r: 'cooperación recíproca y su coordinación se efectuará a través de los órganos que a tal efecto establece esta Ley.' },
  { n: 3, norma: 'LO 2/1986', p: 'Los Poderes Públicos promoverán las condiciones más favorables para una adecuada promoción profesional, social y humana de los miembros de las Fuerzas y Cuerpos de Seguridad, de acuerdo con los principios de:', r: 'objetividad, igualdad de oportunidades, mérito y capacidad.' },
  { n: 4, norma: 'LO 2/1986', p: 'Los Puestos de Servicio en las respectivas categorías se proveerán conforme a los principios de:', r: 'mérito, capacidad y antigüedad, a tenor de lo dispuesto en la correspondiente reglamentación.' },
  { n: 5, norma: 'LO 2/1986', p: 'En el ejercicio de sus funciones, los miembros de las Fuerzas y Cuerpos de Seguridad tendrán a todos los efectos legales el carácter de:', r: 'Agentes de la Autoridad.' },
  { n: 6, norma: 'LO 2/1986', p: 'Le corresponde la administración general de la seguridad ciudadana y el mando superior de las Fuerzas y Cuerpos de Seguridad del Estado, así como la responsabilidad de las relaciones de colaboración y auxilio con las Autoridades policiales de otros países, conforme a lo establecido en Tratados y Acuerdos Internacionales:', r: 'al Ministro del Interior.' },
  { n: 7, norma: 'LO 2/1986', p: 'El Cuerpo de la Guardia Civil se estructura jerárquicamente según:', r: 'los diferentes empleos, de conformidad con su naturaleza militar.' },
  { n: 8, norma: 'LO 2/1986', p: 'Para el cumplimiento de dicha función tendrán carácter colaborador de las Fuerzas y Cuerpos de Seguridad del Estado:', r: 'el personal de Policía de las Comunidades Autónomas y de las Corporaciones Locales.' },
  { n: 9, norma: 'LO 2/1986', p: 'En el cumplimiento de sus funciones los funcionarios adscritos a Unidades de Policía Judicial dependen:', r: 'orgánicamente del Ministerio del Interior y funcionalmente de los Jueces, Tribunales o Ministerio Fiscal que estén conociendo del asunto objeto de su investigación.' },
  { n: 10, norma: 'LO 2/1986', p: 'Para garantizar la coordinación entre las políticas de seguridad pública del Estado y de las Comunidades Autónomas se crea el Consejo de Política de Seguridad, que estará presidido por el Ministro del Interior e integrado por:', r: 'los Consejeros de Interior o Gobernación de las Comunidades Autónomas y por un número igual de representantes del Estado designados por el Gobierno de la Nación.' },
  { n: 11, norma: 'Ley 31/2010 (simplificación del intercambio de información e inteligencia)', p: 'La lengua utilizada para la solicitud y el intercambio de información será:', r: 'la aplicable para el canal de comunicación empleado.' },
  { n: 12, norma: 'Ley 31/2010 (simplificación del intercambio de información e inteligencia)', p: 'El servicio de seguridad español competente al que se le haya proporcionado información e inteligencia en virtud de esta Ley, sólo podrá utilizarla para los fines que fue facilitada, de conformidad con lo dispuesto en la presente Ley, o para prevenir:', r: 'una amenaza grave e inminente a la seguridad pública.' },
  { n: 13, norma: 'Ley 31/2010 (simplificación del intercambio de información e inteligencia)', p: 'El servicio español de seguridad competente podrá negarse a facilitar la información o inteligencia requerida cuando la solicitud se refiera a un delito castigado con pena de prisión:', r: 'igual o inferior a un año con arreglo a la legislación penal española.' },
  { n: 14, norma: 'RD 1087/2010 (Juntas Locales de Seguridad)', p: 'Las Juntas Locales de Seguridad podrán constituirse en:', r: 'aquellos municipios o agrupaciones de municipios que tengan Cuerpo de Policía propio.' },
  { n: 15, norma: 'RD 1087/2010 (Juntas Locales de Seguridad)', p: 'Las Comisiones Locales de Seguridad serán:', r: 'presididas por el Alcalde y copresididas por el Delegado o Subdelegado del Gobierno si concurre a su reunión, y se integrarán por las correspondientes representaciones de la respectiva Corporación Local, de la Administración Autonómica y del Estado.' },
  { n: 16, norma: 'RD 1087/2010 (Juntas Locales de Seguridad)', p: 'Las Juntas Locales de Seguridad se reunirán en sesión ordinaria:', r: 'al menos una vez al semestre.' },
  { n: 17, norma: 'RD 1087/2010 (Juntas Locales de Seguridad)', p: 'Las decisiones y acuerdos de la Junta Local de Seguridad:', r: 'se adoptarán por mayoría de sus miembros.' },
  { n: 18, norma: 'RD 1087/2010 (Juntas Locales de Seguridad)', p: 'En aquellos municipios en que sus peculiares características demográficas lo aconsejen y su organización municipal lo permita, las Juntas Locales de Seguridad, a propuesta de la Corporación Local, podrán acordar la constitución, bajo su dependencia, de:', r: 'Juntas de Seguridad de Distrito u órganos equivalentes.' },
  { n: 19, norma: 'Reglamento (UE) 2016/794 (Europol)', p: 'Europol no aplicará en la realización de sus tareas:', r: 'medidas coercitivas.' },
  { n: 20, norma: 'Reglamento (UE) 2016/794 (Europol)', p: 'El Consejo de Administración estará compuesto por:', r: 'un representante de cada Estado miembro y un representante de la Comisión.' },
  { n: 21, norma: 'Reglamento (UE) 2016/794 (Europol)', p: 'El Consejo de Administración se reunirá al menos:', r: 'dos veces al año en sesión ordinaria.' },
  { n: 22, norma: 'Reglamento (UE) 2016/794 (Europol)', p: 'El director ejecutivo será:', r: 'el representante legal de Europol.' },
  { n: 23, norma: 'Reglamento (UE) 2016/794 (Europol)', p: 'Los datos personales tratados por Europol solo serán conservados por Europol durante:', r: 'el tiempo que sea necesario y proporcionado para la finalidad para la que se tratan.' },
  { n: 24, norma: 'Reglamento (UE) 2016/794 (Europol)', p: 'El responsable de protección de datos será nombrado por un período de cuatro años. Su mandato será renovable hasta un máximo de:', r: 'ocho años.', nota: 'DESFASADA: esta ficha no aparece ya en el art. 41 actualizado del Reglamento Europol de tu PDF (reforma de 2022); se deja tal cual está en tu RECUERDA.' },
  { n: 25, norma: 'Reglamento (UE) 2016/794 (Europol)', p: 'El Tribunal de Justicia de la Unión Europea será competente para pronunciarse en virtud de:', r: 'cualquier cláusula compromisoria en un contrato celebrado por Europol.' },
  { n: 26, norma: 'Estatuto INTERPOL', p: 'La Organización Internacional de Policía Criminal está formada por:', r: 'la Asamblea General, el Comité Ejecutivo, la Secretaría General, las Oficinas Centrales Nacionales y los Asesores.' },
  { n: 27, norma: 'Estatuto INTERPOL', p: 'La Asamblea General de la Organización celebrará una reunión ordinaria:', r: 'cada año.' },
  { n: 28, norma: 'Estatuto INTERPOL', p: 'El Comité Ejecutivo se reunirá por lo menos:', r: 'una vez al año, convocado por el Presidente de la Organización.' },
  { n: 29, norma: 'Estatuto INTERPOL', p: 'El Secretario General será elegido por la Asamblea General, por un período de cinco años, a propuesta del Comité Ejecutivo. Será reelegible, pero no se le mantendrá en funciones cuando cumpla:', r: '65 años.' },
  { n: 30, norma: 'Estatuto INTERPOL', p: 'Todas las modificaciones del presente Estatuto habrán de ser aprobadas por la Asamblea General por mayoría de:', r: 'dos tercios de los Miembros de la Organización.' },
];
module.exports = R;
if (require.main === module) {
  const out = R.map(x => [x.n, x.norma + '. ' + x.p, x.r + (x.nota ? '  ⚠ ' + x.nota : '')]);
  fs.writeFileSync(path.join(__dirname, '..', 'rqa', 't25.json'), '[\n' + out.map(o => JSON.stringify(o)).join(',\n') + '\n]\n');
  console.log(R.length, 'fichas R escritas en rqa/t25.json');
}
