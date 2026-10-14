// ⚡ EXPRÉS del Tema 2 (Terrorismo y delincuencia transnacional). Formato LITERAL + CUADROS (pauta del usuario, 14/10/2026), máx. 25 págs:
//   · por artículo, O el literal O el cuadro del temario/esquema (nunca los dos): cuadro solo si recoge la respuesta de ≥ 80 % de las
//     preguntas del artículo (oficiales e IA); si no, el literal recortado: de cada frase con respuesta se ve su arranque y la
//     respuesta con unas palabras delante; lo demás queda en un (…) que se despliega con el texto literal (y se puede subrayar);
//   · fuera las preguntas cuya respuesta es solo «el artículo X» (preguntas-articulo.js).
// Los cuadros son los de visuales-t2.js (los mismos que el esquema normal; los de la Ley 19/2003, Ley 10/2010, Palermo y Protocolos
// salen de esquemas-t2.js). Uso: node prompts/herramientas/expres-t2.js
const X = require('./expres-lib.js')(2);
const V = require('./visuales-t2.js');
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });

// preguntas que el mapa no sitúa en un párrafo: { k: [ids] } → botón «🎯 … más de este artículo» en su ficha
const EXTRAS = { 8: ['2-ia-78'], 11: ['2-17'], 26: ['2-45'] };
const H = X.automatico(V, EXTRAS, { uno: 0.8 });

module.exports = { visuales: () => [] };   // el esquema normal ya tiene sus cuadros (visuales-t2.js)
if (require.main === module) X.publica(H, [
  { nombre: '2.1 Ley 19/2003', k0: 0, k1: 9 }, { nombre: '2.2 Convenio 196', k0: 10, k1: 24 }, { nombre: '2.3 Ley 10/2010', k0: 25, k1: 48 },
  { nombre: '2.4 Palermo', k0: 49, k1: 61 }, { nombre: '2.5 Trata', k0: 62, k1: 70 }, { nombre: '2.6 Migrantes', k0: 71, k1: 77 },
  { nombre: '2.7 Armas', k0: 78, k1: 83 }, { nombre: 'RECUERDA R1-R39', k0: 84, k1: 90 }]);
