// ⚡ EXPRÉS del Tema 1 (Derechos humanos: Estatuto de Roma, LO 18/2003, Carta UE, Consejo de Europa, CEDH, Acuerdo de
// Privilegios de la CPI). Formato LITERAL + CUADROS (pauta del usuario 14/10/2026: «la literalidad del artículo,
// porque es lo que sale en el examen», máximo 25 págs):
//   · por artículo, O el literal O el cuadro del temario (nunca los dos): cuadro solo si contiene la respuesta de ≥80 % de sus
//     preguntas (oficiales e IA); si no, el literal recortado: de cada frase con respuesta se ve su arranque y la respuesta
//     con unas palabras delante; lo demás queda en un (…) que se despliega con el texto literal;
//   · fuera las preguntas cuya respuesta es solo «el artículo X» (preguntas-articulo.js).
// Uso: node prompts/herramientas/expres-t1.js
const X = require('./expres-lib.js')(1);
const V = require('./visuales-t1.js');
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });

// preguntas que el mapa no sitúa en un párrafo: botón «🎯 … más de este artículo» en su ficha
const H = X.automatico(V, { 1: ['1-148'], 4: ['1-ia-1550'], 7: ['1-ia-1565'], 11: ['1-153'], 16: ['1-ia-1668'], 17: ['1-ia-1678', '1-ia-1679', '1-ia-1681', '1-ia-1684'],
  31: ['1-ia-1032'], 40: ['1-ia-1052'], 61: ['1-ia-1155'], 79: ['1-ia-1309'], 97: ['1-ia-1422', '1-ia-1430', '1-ia-1432'], 107: ['1-ia-1744'] }, { uno: 0.8 });

module.exports = { visuales: () => [] };   // el esquema normal ya tiene sus 67 cuadros (visuales-t1.js)
if (require.main === module) X.publica(H, [
  { nombre: '1.5 Estatuto de Roma', k0: 0, k1: 18 }, { nombre: '1.1 LO 18/2003', k0: 19, k1: 45 }, { nombre: '1.2 Carta UE', k0: 46, k1: 64 },
  { nombre: '1.3 Consejo de Europa', k0: 65, k1: 78 }, { nombre: '1.4 CEDH', k0: 79, k1: 99 }, { nombre: '1.6 Acuerdo de Privilegios', k0: 100, k1: 115 }]);
