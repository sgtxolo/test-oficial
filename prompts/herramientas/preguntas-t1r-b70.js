// Tema 1 · bloque 70 · T1 sustituciones por posición del ✱ → banco OFICIAL
// Uso: node prompts/herramientas/preguntas-t1r-b70.js --json privado/tmp/b70.json  y luego  node prompts/herramientas/anade-oficiales-ast.js 1 privado/tmp/b70.json
const k = "er";
const Q = [
{k: "er", a: "art. 15.1", r: "El fiscal. Investigación de oficio", e: "El fiscal podrá iniciar de oficio una investigación sobre la base de información acerca de:",
 o: ["un crimen de la competencia de la Corte.","cualquier delito grave cometido en el territorio de un Estado Parte.","una situación remitida por el Consejo de Seguridad únicamente.","una denuncia presentada por una víctima."],
 t: "El fiscal podrá iniciar de oficio una investigación sobre la base de información acerca de un crimen de la competencia de la Corte", p: "La investigación de oficio se basa en información sobre un crimen de la competencia de la Corte."},
{k: "er", a: "art. 53.1", r: "Inicio de una investigación", e: "El fiscal, después de evaluar la información de que disponga, iniciará una investigación, a menos que determine que no existe fundamento razonable para proceder a ella con arreglo:",
 o: ["al presente Estatuto.","al derecho interno del Estado territorial.","a las Reglas de Procedimiento y Prueba.","a las resoluciones del Consejo de Seguridad."],
 t: "a menos que determine que no existe fundamento razonable para proceder a ella con arreglo al presente Estatuto", p: "Inicia la investigación salvo que no exista fundamento razonable con arreglo al Estatuto."},
{k: "carta", a: "art. 3.2.b", r: "Derecho a la integridad de la persona", e: "En el marco de la medicina y la biología se respetará en particular la prohibición de las prácticas eugenésicas, en particular las que tienen como finalidad:",
 o: ["la selección de las personas.","el mejoramiento genético de la especie.","la clonación terapéutica.","el diagnóstico prenatal."],
 t: "la prohibición de las prácticas eugenésicas, en particular las que tienen como finalidad la selección de las personas", p: "Se prohíben las prácticas eugenésicas, en particular las de selección de las personas."},
{k: "cde", a: "art. 15.a", r: "Funciones del Comité de Ministros", e: "El Comité de Ministros examinará las medidas adecuadas para realizar la finalidad del Consejo de Europa, incluida la conclusión de convenios y de acuerdos y la adopción por los Gobiernos de:",
 o: ["una política común respecto a determinados asuntos.","una constitución común.","un ejército común.","una moneda común."],
 t: "la adopción por los Gobiernos de una política común respecto a determinados asuntos", p: "Incluye la adopción por los Gobiernos de una política común sobre determinados asuntos."},
{k: "cedh", a: "art. 6.1", r: "Derecho a un proceso equitativo", e: "La causa de toda persona será oída por un Tribunal independiente e imparcial, establecido por la Ley, que decidirá los litigios sobre sus derechos y obligaciones de carácter civil o sobre:",
 o: ["el fundamento de cualquier acusación en materia penal dirigida contra ella.","la legalidad de las decisiones administrativas.","la ejecución de las sentencias firmes.","la responsabilidad patrimonial del Estado."],
 t: "sobre el fundamento de cualquier acusación en materia penal dirigida contra ella", p: "El Tribunal decide los litigios civiles y el fundamento de cualquier acusación penal."},
{k: "cedh", a: "art. 28.1.b", r: "Competencia de los Comités", e: "Un Comité podrá, por unanimidad, declarar admisible una demanda y dictar al mismo tiempo sentencia sobre el fondo si la cuestión subyacente al caso, relativa a la interpretación o la aplicación del Convenio, ya ha dado lugar a:",
 o: ["jurisprudencia bien establecida del Tribunal.","una sentencia anterior de la Gran Sala.","una resolución del Comité de Ministros.","un dictamen consultivo del Tribunal."],
 t: "ya ha dado lugar a jurisprudencia bien establecida del Tribunal", p: "Basta jurisprudencia bien establecida del Tribunal."},
{k: "cedh", a: "art. 47.3", r: "Opiniones consultivas", e: "La resolución del Comité de Ministros de solicitar una opinión consultiva al Tribunal será adoptada por:",
 o: ["voto mayoritario de los representantes que tengan el derecho de intervenir en el Comité.","unanimidad de los miembros del Comité.","dos tercios de los votos emitidos.","mayoría absoluta de los Estados miembros."],
 t: "será adoptada por voto mayoritario de los representantes que tengan el derecho de intervenir en el Comité", p: "Se adopta por voto mayoritario de los representantes con derecho a intervenir en el Comité."},
{k: "ac", a: "art. 6.1", r: "Inmunidad de la Corte, sus bienes, haberes y fondos", e: "La Corte y sus bienes, haberes y fondos gozarán de inmunidad de jurisdicción en todas sus formas, salvo en la medida en que la Corte renuncie expresamente a ella en:",
 o: ["un caso determinado.","cualquier caso en que lo solicite un Estado Parte.","los procedimientos civiles.","los casos que decida la Asamblea de los Estados Partes."],
 t: "renuncie expresamente a ella en un caso determinado", p: "La renuncia expresa se hace en un caso determinado."},
];
require('./preguntas-t1r-lib.js').run({ bloque: 70, Q });
