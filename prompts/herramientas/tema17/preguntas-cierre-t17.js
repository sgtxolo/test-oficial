// Tema 17 · cierre (1/11/2026): marcas que seguían sin pregunta tras contar también el banco IA (cobertura-marcas con IA):
// art. 15 LO 5/2000 (EXAMEN+EX) y R19 (MENA) → oficiales; 6.1.6.b y 8.2.4 de la Instrucción 1/2017 (círculo EX) → IA.
// Uso: node prompts/herramientas/tema17/preguntas-cierre-t17.js [--check]
const LO = ['Ley Orgánica 5/2000, de 12 de enero, reguladora de la responsabilidad penal de los menores', 'LO 5/2000', 'Ley Orgánica 5/2000, de 12 de enero, reguladora de la responsabilidad penal de los menores'];
const IN = ['Instrucción 1/2017, de la Secretaría de Estado de Seguridad, por la que se actualiza el "Protocolo de actuación policial con menores"', 'Instrucción 1/2017', 'General / Responsabilidad Penal de los Menores'];
const Q = [
  { n: LO, a: 'art. 15.1.2.º', r: 'De la prescripción', e: 'Los hechos delictivos cometidos por los menores prescriben a los cinco años, cuando se trate de:', c: 0,
    o: ['Un delito grave sancionado en el Código Penal con pena superior a diez años.', 'Cualquier otro delito grave.', 'Un delito menos grave.', 'Un delito sancionado con pena de prisión igual o superior a quince años.'],
    t: 'A los cinco años, cuando se trate de un delito grave sancionado en el Código Penal con pena superior a diez años' },
  { n: IN, a: 'punto 8.2.2', r: 'Actuación con menores extranjeros no acompañados', e: 'Se entiende por menor extranjero no acompañado (MENA) al extranjero menor de dieciocho años nacional de un Estado al que no le sea de aplicación el régimen de la Unión Europea que llegue a territorio español:', c: 0,
    o: ['Sin un adulto responsable de él, ya sea legalmente o con arreglo a la costumbre, apreciándose riesgo de desprotección del menor.', 'Sin documentación que acredite su identidad, apreciándose indicios de falsedad en la que presente.', 'Sin sus progenitores, siempre que se encuentre bajo la guarda de una entidad pública de protección de menores.', 'Sin un adulto responsable de él, siempre que carezca de domicilio conocido en territorio español.'],
    t: 'que llegue a territorio español sin un adulto responsable de él, ya sea legalmente o con arreglo a la costumbre, apreciándose riesgo de desprotección del menor' },
  { n: IN, ia: true, a: 'punto 6.1.6.b', r: 'Aplicación de la normativa sobre Protección de la Seguridad Ciudadana', e: 'Cuando sea necesario requerir la identidad de un menor de edad en las vías o lugares públicos y realizar un control superficial sobre sus efectos personales, se evitará, en la medida de lo posible:', c: 0,
    o: ['La espectacularidad, el empleo de lenguaje duro, la violencia y la exhibición de armas.', 'La presencia de terceras personas, el empleo de esposas y la exhibición de armas.', 'La información al menor sobre los hechos que motivan la intervención y en qué va a consistir.', 'La espectacularidad, la comunicación a quienes ejerzan su guarda y la exhibición de armas.'],
    t: 'Se evitará, en la medida de lo posible, la espectacularidad, el empleo de lenguaje duro, la violencia y la exhibición de armas' },
  { n: IN, ia: true, a: 'punto 8.2.4', r: 'Actuación con menores extranjeros no acompañados', e: 'Cuando la minoría de edad de los extranjeros no pueda ser establecida con seguridad por encontrarse ________ o por presentar su documentación indicios de falsedad, los funcionarios de la Brigada o Unidad de Extranjería y Fronteras procederán según lo previsto en el Protocolo.', c: 0,
    o: ['indocumentados', 'sin representantes legales', 'en situación irregular en territorio nacional', 'sin domicilio conocido'],
    t: 'cuya minoría de edad no pueda ser establecida con seguridad por encontrarse indocumentados o cuya documentación presente indicios de falsedad' },
];
Q.forEach((q, i) => { const k = (i + 1) % 4, ok = q.o.splice(q.c, 1)[0]; q.o.splice(k, 0, ok); q.c = k; });
require('../preguntas-marcas-lib.js')({ T: 17, fuentes: ['tema17/oficial.txt'], desdeOf: 280, desdeIA: 1700, Q });
