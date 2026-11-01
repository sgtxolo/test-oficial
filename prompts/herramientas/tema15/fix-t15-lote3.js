// Tema 15 · lote 3 de la auditoría (1/11/2026): las 4 oficiales que seguían sin verificar, comprobadas contra MI PDF (págs. 21-22 y Resolución 2005).
// 15-97 y 15-150: art. 30 LO 1/2004 tal y como está en su temario (adscrito al Ministerio de Trabajo y Asuntos Sociales; informe anual al Gobierno y a las CCAA).
// 15-104: opciones A, B y C literales de la Resolución 28/06/2005 (atestado); la incorrecta (D) pasa a decir lo contrario del texto.
module.exports = ({ O }) => [
  ['15-97', q => { O(q, 0, 'Ministerio de Trabajo y Asuntos Sociales.'); O(q, 1, 'Ministerio de Sanidad y Consumo.'); O(q, 2, 'Ministerio de Política Territorial y Administraciones Públicas.'); q.correcta = 0;
    return ['órgano colegiado adscrito al Ministerio de Trabajo y Asuntos Sociales', 'Redacción del art. 30.1 en su temario (pág. 21, sello «PREGUNTA EXAMEN»).', 'img', 'art. 30.1 de la LO 1/2004']; }],
  ['15-150', q => { q.pregunta = 'Ley Orgánica 1/2004, de 28 de diciembre, de Medidas de Protección Integral contra la Violencia de Género. Observatorio Estatal de Violencia sobre la Mujer. Con periodicidad anual, el Observatorio remitirá un informe sobre la evolución de la violencia ejercida sobre la mujer:';
    q.opciones = ['Únicamente al Gobierno.', 'Al Gobierno y a las Comunidades Autónomas.', 'Al Gobierno, al Consejo General del Poder Judicial y a las Comunidades Autónomas.', 'Solo al Gobierno y a las Cortes Generales.']; q.correcta = 1;
    return ['El Observatorio Estatal de Violencia sobre la Mujer remitirá al Gobierno y a las Comunidades Autónomas, con periodicidad anual, un informe sobre la evolución de la violencia ejercida sobre la mujer', null, 'img', 'art. 30.2 de la LO 1/2004']; }],
  ['15-104', q => {
    q.opciones = ['En el atestado se hará constar cuantos datos existan como antecedentes y hagan referencia a malos tratos cualesquiera por parte del presunto agresor.',
      'Las diligencias de inspección ocular y declaración de la víctima se documentarán, siempre que sea posible, mediante fotografías u otros medios técnicos.',
      'Durante la tramitación del atestado se recabará la mayor cantidad de datos que puedan llevar a la identificación, localización y control del presunto agresor.',
      'La Unidad de las Fuerzas y Cuerpos de Seguridad instructora del atestado adoptará las medidas necesarias, con independencia de la Autoridad Judicial, a fin de asegurar la presencia de la víctima o su representante legal, del solicitante, del denunciado o presunto agresor y de los posibles testigos.'];
    q.correcta = 3;
    return ['adoptará las medidas necesarias, de acuerdo con la Autoridad Judicial, a fin de asegurar la presencia de la víctima o su representante legal, del solicitante, del denunciado o presunto agresor y de los posibles testigos', 'La Unidad instructora actúa «de acuerdo con la Autoridad Judicial», no con independencia de ella.', 'img', 'epígrafe del atestado de la Resolución de 28 de junio de 2005']; }],
  ['15-40', q => { q.correcta = 3; return ['k) Garantizar el principio de transversalidad de las medidas, de manera que en su aplicación se tengan en cuenta las necesidades y demandas específicas de todas las mujeres víctimas de violencia de género', 'El principio rector es la transversalidad (la «congruencia» no figura en el art. 2).']; }],
  ['15-69', q => { O(q, 0, 'VPER.'); O(q, 1, 'VPR.'); q.correcta = 0; return ['Formulario VPER (Valoración Policial de la Evolución del Riesgo): Herramienta semiactuarial utilizada en el Sistema VioGén-2 para evaluar periódicamente el nivel de riesgo durante el seguimiento de un Caso', 'El formulario del seguimiento es el VPER (el VPR es el de la valoración inicial o ante reincidencia); «VPFR» no existe.']; }],
  ['15-26', q => { O(q, 0, 'Cometa.'); O(q, 1, 'Controla.'); O(q, 2, 'Correla.'); q.correcta = 0; return ['Centro de Control de Medidas Telemáticas de Alejamiento (Cometa)', 'El Centro de Control se identifica como Cometa; la sigla «CCMTA» no figura en el temario.']; }],
];
