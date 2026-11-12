// Cuadros del Tema 8 para el Esquema clave: los 11 cuadros/esquemas del temario (cuadros-t8.js, págs. 31, 33, 49, 66-67, 71, 75, 90 y 100 del PDF),
// colocados delante de la ficha de su artículo y con los colores del Exprés. Pendiente: rehacerlos con la forma exacta de cada página.
const fs = require('fs');
const { colorea } = require('./repaso-cuadros-lib.js');
global.window = global.window || {};
eval(fs.readFileSync('C:/Users/ruben/Desktop/HTML OFICIAL/expres-subrayado/cuadros-t8.js', 'utf8'));
const C = window.EXSUB_C[8];
const j = (...ks) => ks.flatMap(k => (C[k] || []).map(c => c.h)).join('');
const A = { 'a-58': 58, 'a-61': 61, 'a-65': 65, 'a-82': 82, 'a-87': 87, 'a-88': 88, 'a-89': 89, 'a-99': 99, 'a-542': 542 };
module.exports = { soloPropios: true, cuadros: Object.keys(A).map(k => ({ antes: new RegExp('^Artículo ' + A[k] + '(?!\d)'), html: colorea(j(k)) })) };
