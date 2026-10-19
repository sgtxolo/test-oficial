// Tema 9 (LO 5/2005 + Directiva de Defensa Nacional 2020) · marcas a mano del temario escaneado 08-08-2026 (marcas-t9.txt)
// + fichas RECUERDA R1-R13 (págs. 29-31). R11-R13 son de la Directiva de 2012 que trae la ficha del temario: no tienen
// apartado en la Directiva 2020 y van solo en el bloque RECUERDA.
// Uso: node prompts/herramientas/tema9/marcas-t9.js [--dry]
require('../marcas-lib.js')({
  T: 9,
  normas: {
    LO: { txt: 'tema9/lo5.txt', bloque: 'T9_LO', nombre: 'LO de la Defensa Nacional', tituloEnLinea: true },
    DDN: { txt: 'tema9/ddn2020.txt', bloque: 'T9_DDN', nombre: 'Directiva de Defensa Nacional', tituloEnLinea: true },
  },
  marcas: 'tema9/marcas-t9.txt',
  RS: [
    ['R1', 'LO', 'El mando supremo de las Fuerzas Armadas y las demás funciones que en materia de defensa le confiere la Constitución y el resto del ordenamiento jurídico corresponden:', 'al Rey.', 'Corresponden al Rey el mando supremo'],
    ['R2', 'LO', 'La dirección de la política de defensa y la determinación de sus objetivos, la gestión de las situaciones de crisis que afecten a la defensa y la dirección estratégica de las operaciones militares en caso de uso de la fuerza corresponde:', 'al Presidente del Gobierno.', 'Corresponde al Presidente del Gobierno la dirección de la política de defensa'],
    ['R3', 'LO', 'Órgano colegiado, coordinador, asesor y consultivo del Presidente del Gobierno en materia de defensa:', 'el Consejo de Defensa Nacional.', 'El Consejo de Defensa Nacional es el órgano colegiado'],
    ['R4', 'LO', 'Las Fuerzas Armadas son el elemento esencial de la defensa y constituyen una entidad única que se concibe como un conjunto integrador de las formas de acción específicas de cada uno de sus componentes:', 'el Ejército de Tierra, la Armada y el Ejército del Aire.', 'Las Fuerzas Armadas son el elemento esencial de la defensa'],
    ['R5', 'LO', 'Constituye el órgano auxiliar de mando y apoyo al Jefe de Estado Mayor de la Defensa:', 'el Estado Mayor de la Defensa.', 'El Estado Mayor de la Defensa constituye el órgano auxiliar'],
    ['R6', 'LO', 'Basan su organización y funcionamiento en el principio de unidad jurisdiccional y administran justicia en el ámbito estrictamente castrense y, en su caso, en las materias que establezca la declaración del estado de sitio, de acuerdo con la Constitución y lo dispuesto en las leyes penales, procesales y disciplinarias militares:', 'los órganos de la jurisdicción militar, integrante del Poder Judicial del Estado.', 'Los órganos de la jurisdicción militar'],
    ['R7', 'LO', 'Para ordenar operaciones en el exterior que no estén directamente relacionadas con la defensa de España o del interés nacional, el Gobierno realizará una consulta previa y recabará la autorización:', 'del Congreso de los Diputados.', 'Para ordenar operaciones en el exterior'],
    ['R8', 'LO', 'El Gobierno informará periódicamente al Congreso de los Diputados sobre el desarrollo de las operaciones de las Fuerzas Armadas en el exterior:', 'en un plazo en ningún caso superior a un año.', 'El Gobierno informará periódicamente'],
    ['R9', 'LO', 'En tiempo de conflicto armado y durante la vigencia del estado de sitio, el sistema de disponibilidad permanente de recursos será coordinado por:', 'el Consejo de Defensa Nacional.', 'En tiempo de conflicto armado y durante la vigencia del estado de sitio, el sistema'],
    ['R10', 'LO', 'El Centro Nacional de Inteligencia contribuirá a la obtención, evaluación e interpretación de la información necesaria para prevenir y evitar riesgos o amenazas que afecten a:', 'la independencia e integridad de España, a los intereses nacionales y a la estabilidad del Estado de Derecho y sus instituciones.', 'El Centro Nacional de Inteligencia contribuirá'],
    ['R11', 'DDN', 'Los EEUU mantienen su liderazgo en la lucha contra los riesgos y amenazas globales, y particularmente contra aquellos que surgen de:', 'organizaciones no estatales.', null],
    ['R12', 'DDN', 'La primera contribución de España a la paz y seguridad internacional no es otra que garantizar la propia con fortaleza y decisión, y para ello procurarse las capacidades que aseguren la disuasión ante las que tradicionalmente se han denominado:', '«amenazas no compartidas».', null],
    ['R13', 'DDN', 'La disuasión comienza con la cohesión nacional, que se traduce en:', 'la voluntad colectiva y la determinación de preservar los valores de nuestra sociedad, los medios materiales para crear prosperidad y la fortaleza del Estado.', null],
  ],
  recTitulo: 'RECUERDA DEL TEMARIO — fichas R1 a R13 (pregunta → respuesta), tal como vienen en las últimas páginas de tu temario',
  grupos: [['LO 5/2005 de la Defensa Nacional — R1 a R10', r => r[1] === 'LO'], ['Directiva de Defensa Nacional — R11 a R13 (ojo: el temario las trae de la Directiva de 2012; no aparecen en la de 2020)', r => r[1] === 'DDN']],
  ensamblaje: ['    + T9.lo + T9.ddn\n', '    + T9.lo + T9.ddn + T9.rec\n'],
});
