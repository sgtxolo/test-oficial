// Cajas de trampas y trucos del Tema 5 (formato del prompt: «Cifras que se confunden», «Trampa de examen», «Truco…», «Ten en cuenta»).
// Las carga visuales-t5.js; salen debajo de la ficha indicada.
module.exports = (v) => {
  const T = (titulo, html) => `<div class="trampa"><b>⚠ ${titulo}</b><p>${html}</p></div>`;
  const C = (de, ok, no) => T('Cifras que se confunden', `<em>${de}</em><strong>${ok}</strong> — ${no.map(x => 'no ' + x).join(' · ')}`);

  v('Artículo 39 — Plazo de revisión de las descripciones', C('¿Cada cuánto revisa el Estado emisor una descripción del SIS?', '3 años', ['1 año', '2 años', '4 años']));
  v('Artículo 41 — Tratamiento de los datos del SIS', C('¿Cuánto pueden conservarse las copias técnicas fuera de línea?', '48 horas', ['24 horas', '72 horas', '12 horas']));
  v('Artículo 23 — Período de conservación de los datos almacenados', C('¿Cuánto se conserva un expediente de solicitud en el VIS?', '5 años', ['3 años', '10 años', '1 año']));
  v('Artículo 34 — Conservación de registros', C('¿Cuándo se suprimen los registros del VIS tras el período de retención?', '1 año', ['2 años', '5 años', '6 meses']));
  v('Artículo 45 quater — Acceso a los datos para su verificación por los transportistas', C('¿Durante cuánto es facultativa la verificación para los autocares?', '18 meses', ['12 meses', '24 meses', '6 meses']));
  v('Artículo 9 — Modalidades prácticas para la presentación de una solicitud', C('¿Con cuánta antelación máxima se presenta la solicitud de visado?', '6 meses', ['3 meses', '9 meses (solo marinos)', '1 año']));
  v('Artículo 13 — Identificadores biométricos', C('¿Cada cuánto debe volver a comparecer el solicitante para dar sus huellas?', '59 meses', ['60 meses', '48 meses', '3 años']));
  v('Artículo 15 — Seguro médico de viaje', C('¿Cobertura mínima del seguro médico de viaje?', '30.000 EUR', ['50.000 EUR', '20.000 EUR', '10.000 EUR']));
  v('Artículo 16 — Tasas de visado', C('¿Tasa general de visado (y la de los niños de 6 a 12 años)?', '90 EUR (45 EUR)', ['80 EUR (40 EUR): versión antigua del RECUERDA', '60 EUR (35 EUR)', '135 EUR sin decisión del Consejo']));
  v('Artículo 23 — Decisión sobre la solicitud', C('¿Plazo para decidir sobre una solicitud admisible?', '15 días naturales', ['15 días hábiles', '30 días naturales', '10 días naturales']));
  v('Artículo 33 — Prórroga', T('Ojo a la redacción', 'Gratuita solo la prórroga por <strong>razones humanitarias o de fuerza mayor</strong> (se prorroga); por <strong>razones personales graves</strong> «podrá prorrogarse» y se paga <strong>30 EUR</strong>.'));
  v('Artículo 34 — Anulación y retirada', T('Truco para recordarlo', '<strong>Anulación = pasado</strong> (al expedirse no se cumplían las condiciones) · <strong>Retirada = futuro</strong> (han dejado de cumplirse). A petición del titular solo cabe la <strong>retirada</strong>, y entonces no hay recurso.'));
  v('Artículo 15 — Recopilación y transmisión de los datos biométricos', C('¿Plazo ordinario de transmisión a Eurodac?', '72 horas', ['48 horas', '24 horas', '10 días (solo protección temporal)']));
  v('Artículo 29 — Conservación de datos', C('¿Cuánto se conservan en Eurodac los datos de solicitantes de protección internacional?', '10 años', ['5 años', '3 años', '1 año']));
  v('Artículo 38 — Ejecución de la comparación y transmisión del resultado', C('¿En cuánto tramita Eurodac cada solicitud de comparación (y la urgente)?', '24 horas (1 hora)', ['48 horas', '12 horas', '72 horas']));
  v('Artículo 45 — Supervisión a cargo del Supervisor Europeo', T('Ten en cuenta', 'Eurodac: el SEPD audita a eu-LISA <strong>al menos cada 3 años</strong> (art. 45.2) · VIS: cada <strong>4 años</strong> (RECUERDA R18) · auditoría nacional de Eurodac a efectos policiales: <strong>anual</strong>.'));
  v('Artículo 4 — Gestión operativa', T('Trampa de examen', 'Presupuesto, adquisición y contratos de la infraestructura: en el <strong>VIS los ejecuta eu-LISA</strong> (art. 26.2) pero en <strong>Eurodac los ejecuta la Comisión</strong> (art. 4.4).'));
  v('Artículo 4 — Creación de la Autoridad Nacional del VIS', T('Trampa de examen', 'Dos cargos distintos: el <strong>órgano gestor del fichero</strong> depende de la <strong>Subsecretaría</strong> del MAEC; la <strong>Autoridad Nacional del VIS</strong> es el <strong>Director General de Asuntos Consulares y Migratorios</strong>. La protección de datos queda fuera de su supervisión (Agencia de Protección de Datos).'));
};
