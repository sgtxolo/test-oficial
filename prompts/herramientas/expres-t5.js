// ⚡ EXPRÉS del Tema 5 (Bases de datos europeas: SIS, VIS, Código de visados, Rgto. 977/2011, Eurodac y Orden AEC/240/2011,
// SOLO lo subrayado). Formato LITERAL + CUADROS (pauta del usuario 14/10/2026), máximo 25 págs:
//   · por artículo, O el literal O el cuadro (nunca los dos): cuadro solo si recoge la respuesta de ≥ 80 % de sus preguntas;
//   · literal recortado a lo que preguntan (arranque + respuesta con palabras delante; lo demás en un (…) desplegable);
//   · fuera las preguntas cuya respuesta es solo «el artículo X» (preguntas-articulo.js).
// Uso: node prompts/herramientas/expres-t5.js
const X = require('./expres-lib.js')(5);
const V = require('./visuales-t5.js');
Object.assign(X.opciones, { recorte: 'ventana', cabeza: +(process.env.CABEZA || 1), antes: +(process.env.ANTES || 1), umbral: +(process.env.UMBRAL || 25), sinRespPliega: true, ...(process.env.SOLOOF !== '0' ? { soloOficial: true, iaEnEX: true } : {}) });

// preguntas que el mapa no sitúa en un párrafo: botón «🎯 … más de este artículo» en su ficha (k = n.º de ficha)
const EXTRAS = {};
// 1.ª pasada → qué preguntas quedan sueltas; 2.ª: las que tienen artículo seguro van a su ficha (EXTRAS) y las demás a un grupo final
const UNO = { uno: +(process.env.UNO || 0.6) };
const H0 = X.automatico(V, EXTRAS, UNO);
const S = X.asignaSueltas(H0);
const H = X.automatico(V, Object.assign(EXTRAS, S.extras), UNO) + X.asignaSueltas(H0).html;
console.log(`Preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);

module.exports = { visuales: () => [] };   // el esquema normal ya tiene sus cuadros (visuales-t5.js)
if (require.main === module) X.publica(H, [
  { nombre: '5.1 SIS (Rgto. 2018/1861)', k0: 0, k1: 62 }, { nombre: '5.2 VIS (Rgto. 767/2008)', k0: 63, k1: 152 },
  { nombre: '5.3 Código de visados (Rgto. 810/2009)', k0: 153, k1: 186 }, { nombre: '5.4 Rgto. 977/2011', k0: 187, k1: 188 },
  { nombre: '5.5 Eurodac (Rgto. 2024/1358)', k0: 189, k1: 244 }, { nombre: '5.6 Orden AEC/240/2011', k0: 245, k1: 249 },
  { nombre: '5.7 RECUERDA del temario', k0: 250, k1: 255 }]);
