// Tema 1 · bloque 22 · Carta de los Derechos Fundamentales (arts. 49-52), parecidas a las de ✱ → banco OFICIAL
// Uso: node prompts/herramientas/preguntas-t1r-b22.js --json privado/tmp/b22.json  y luego  node prompts/herramientas/anade-oficiales-ast.js 1 privado/tmp/b22.json
const k = "carta";
const Q = [
{k, a: "art. 49.1", r: "Principios de legalidad y de proporcionalidad de los delitos y las penas", e: "Con arreglo a la Carta, no podrá imponerse una pena más grave que:",
 o: ["la aplicable en el momento en que la infracción haya sido cometida.","la prevista en la ley vigente al dictarse sentencia.","la solicitada por el Ministerio Fiscal.","la más favorable en el momento del enjuiciamiento."],
 t: "no podrá imponerse una pena más grave que la aplicable en el momento en que la infracción haya sido cometida", p: "La pena no puede ser más grave que la aplicable al cometerse la infracción."},
{k, a: "art. 51.1", r: "Ámbito de aplicación", e: "Las disposiciones de la Carta están dirigidas a los Estados miembros únicamente cuando apliquen el Derecho de la Unión. Por consiguiente, éstos respetarán los derechos, observarán los principios y promoverán su aplicación:",
 o: ["con arreglo a sus respectivas competencias y dentro de los límites de las competencias que los Tratados atribuyen a la Unión.","con carácter prioritario sobre su Derecho interno y con independencia de las competencias de la Unión.","con arreglo a lo que dispongan sus Constituciones y sin límite alguno.","bajo la supervisión de la Comisión Europea en cada caso."],
 t: "con arreglo a sus respectivas competencias y dentro de los límites de las competencias que los Tratados atribuyen a la Unión", p: "Se aplica con arreglo a sus competencias y dentro de los límites de las competencias de la Unión.", d: 'dificil'},
{k, a: "art. 51.2", r: "Ámbito de aplicación", e: "La Carta no crea ninguna competencia o misión nuevas para la Unión ni modifica:",
 o: ["las competencias y misiones definidas en los Tratados.","el principio de subsidiariedad.","las competencias reservadas a los Estados miembros.","la jurisprudencia del Tribunal de Justicia."],
 t: "ni modifica las competencias y misiones definidas en los Tratados", p: "No modifica las competencias y misiones definidas en los Tratados."},
{k, a: "art. 52.1", r: "Alcance de los derechos garantizados", e: "Dentro del respeto del principio de proporcionalidad, solo podrán introducirse limitaciones a los derechos y libertades de la Carta cuando sean necesarias y respondan efectivamente a:",
 o: ["objetivos de interés general reconocidos por la Unión o a la necesidad de protección de los derechos y libertades de los demás.","razones de orden público o de seguridad nacional previstas por los Estados miembros.","los objetivos que fije el Consejo Europeo.","las exigencias de una sociedad democrática en todo caso."],
 t: "respondan efectivamente a objetivos de interés general reconocidos por la Unión o a la necesidad de protección de los derechos y libertades de los demás", p: "Las limitaciones deben responder a objetivos de interés general de la Unión o a la protección de derechos y libertades ajenos.", d: 'dificil'},
{k, a: "art. 52.5", r: "Alcance de los derechos garantizados", e: "Las disposiciones de la Carta que contengan principios podrán aplicarse mediante:",
 o: ["actos legislativos y ejecutivos adoptados por las instituciones, órganos y organismos de la Unión, y por actos de los Estados miembros cuando apliquen el Derecho de la Unión.","actos legislativos de la Unión exclusivamente.","sentencias del Tribunal de Justicia de la Unión Europea.","convenios celebrados entre los Estados miembros."],
 t: "podrán aplicarse mediante actos legislativos y ejecutivos adoptados por las instituciones, órganos y organismos de la Unión, y por actos de los Estados miembros cuando apliquen el Derecho de la Unión", p: "Los principios se aplican mediante actos legislativos y ejecutivos de la Unión y de los Estados cuando apliquen el Derecho de la Unión.", d: 'dificil'},
];
require('./preguntas-t1r-lib.js').run({ bloque: 22, Q });
