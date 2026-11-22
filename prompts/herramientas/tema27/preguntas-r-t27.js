// Tema 27 · preguntas OFICIALES de las fichas R (R1…R14) sin pregunta oficial equivalente (ids 27-218…). Al banco OFICIAL.
// Ya cubiertas por oficiales existentes y NO duplicadas: R2 (27-63), R4 (27-10), R5 (27-2), R6 (27-7), R7 (27-81), R9 (27-17), R10 (27-79), R12 (27-75), R14 (27-9).
// Nuevas: R1, R3, R8, R11, R13. Cita literal comprobada contra tema27/oficial.txt.
const ONU = ['Principios básicos sobre el empleo de la fuerza y de armas de fuego por los funcionarios encargados de hacer cumplir la ley (VIII Congreso de la ONU, La Habana, 1990)', 'Principios básicos sobre el empleo de la fuerza y de armas de fuego (ONU, 1990)', 'Principios básicos sobre el empleo de la fuerza y de armas de fuego por los funcionarios encargados de hacer'];
const POL = ['Resolución 690 de 1979, de la Asamblea Parlamentaria del Consejo de Europa, Declaración sobre la Policía', 'Resolución 690 de 1979, Declaración sobre la Policía', 'Resolución 690 de 1979, de la Asamblea Parlamentaria del Consejo de Europa, Declaración sobre la Policía'];
const CEE = ['Recomendación Rec. (2001) 10 del Comité de Ministros a los Estados miembros sobre el Código Europeo de Ética de la Policía', 'Código Europeo de Ética de la Policía (Rec. (2001) 10)', 'Recomendación Rec. (2001) 10 del Comité de Ministros a los Estados miembros sobre el Código Europeo de Ética de la Policía'];
const R = [
  { n: ONU, ia: false, a: 'principio 3', r: 'Armas no letales incapacitantes', e: 'Se hará una cuidadosa evaluación de la fabricación y distribución de armas no letales incapacitantes a fin de:',
    o: ['Reducir al mínimo el riesgo de causar lesiones a personas ajenas a los hechos y se controlará con todo cuidado el uso de tales armas.', 'Reducir al mínimo el riesgo de causar la muerte a los autores de los hechos y se controlará su uso por los superiores jerárquicos.', 'Garantizar que todos los funcionarios dispongan de ellas y se autorizará su empleo previa instrucción del mando.', 'Evitar el empleo de armas de fuego en las reuniones lícitas y se controlará su adquisición por los gobiernos.'], c: 0,
    t: 'a fin de reducir al mínimo el riesgo de causar lesiones a personas ajenas a los hechos y se controlará con todo cuidado el uso de tales armas', p: 'El fin es reducir el riesgo de lesiones a personas ajenas a los hechos.' },
  { n: ONU, ia: false, a: 'principio 8', r: 'Circunstancias excepcionales', e: 'No se podrán invocar circunstancias excepcionales tales como la inestabilidad política interna o cualquier otra situación pública de emergencia para:',
    o: ['Justificar el quebrantamiento de estos Principios básicos.', 'Justificar la suspensión temporal de estos Principios básicos.', 'Justificar la modificación de estos Principios básicos por los gobiernos.', 'Justificar la inaplicación de estos Principios básicos en el territorio afectado.'], c: 0,
    t: 'para justificar el quebrantamiento de estos Principios', p: 'Lo que no cabe justificar es el quebrantamiento de los Principios básicos.' },
  { n: ONU, ia: false, a: 'principio 23', r: 'Procedimientos de presentación de informes y recursos', e: 'Las personas afectadas por el empleo de la fuerza y de armas de fuego o sus representantes legales tendrán acceso a un proceso:',
    o: ['Independiente, incluido un proceso judicial.', 'Administrativo, resuelto por la propia institución policial.', 'Reservado, dirigido por el superior jerárquico del funcionario.', 'Sumario, tramitado por el órgano disciplinario competente.'], c: 0,
    t: 'tendrán acceso a un proceso independiente, incluido un proceso judicial', p: 'El proceso debe ser independiente, incluido un proceso judicial.' },
  { n: POL, ia: false, a: 'punto C.2', r: 'Guerra y otras situaciones de excepción', e: 'Las disposiciones de la Cuarta Convención de Ginebra, de 12 de agosto de 1949, relativas a la protección de las personas civiles en tiempo de guerra, son aplicables a:',
    o: ['La Policía civil.', 'La Policía militar.', 'Las fuerzas de ocupación.', 'Los cuerpos de Policía disueltos.'], c: 0,
    t: 'son aplicables a la Policía civil', p: 'Son aplicables a la Policía civil.' },
  { n: CEE, ia: false, a: 'punto 37', r: 'Empleo de la fuerza', e: 'La policía sólo puede recurrir a la fuerza en caso de:',
    o: ['Absoluta necesidad y únicamente para conseguir un objetivo legítimo.', 'Estricta necesidad y siempre que lo autorice un superior jerárquico.', 'Absoluta necesidad y siempre que se haya agotado la vía judicial.', 'Legítima defensa y exclusivamente para proteger la propiedad privada.'], c: 0,
    t: 'sólo puede recurrir a la fuerza en caso de absoluta necesidad y únicamente para conseguir un objetivo legítimo', p: 'Absoluta necesidad y únicamente para conseguir un objetivo legítimo.' },
];
[1, 3, 0, 2, 1].forEach((p, i) => { const q = R[i], ok = q.o.splice(0, 1)[0]; q.o.splice(p, 0, ok); q.c = p; });
require('../preguntas-marcas-lib.js')({ T: 27, fmt: 'nuevo', fuentes: ['tema27/oficial.txt'], desdeOf: 218, desdeIA: 1, Q: R });
