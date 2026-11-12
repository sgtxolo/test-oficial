// Cuadros del Tema 4 para el Esquema clave: los 8 cuadros del temario (cuadros-t4.js, tablas de las págs. 97-100 del PDF y recuadros de Schengen/Frontex),
// colocados antes del bloque de su norma. El Exprés del T4 no lleva cuadros, así que hibrido los recibe de aquí.
const fs = require('fs');
const R = 'C:/Users/ruben/Desktop/HTML OFICIAL/';
global.window = global.window || {};
eval(fs.readFileSync(R + 'expres-subrayado/cuadros-t4.js', 'utf8'));
const C = window.EXSUB_C[4];
const j = (...ks) => ks.flatMap(k => (C[k] || []).map(c => c.h)).join('');
module.exports = {
  soloPropios: true,
  cuadros: [
    { antesH: /^RESTABLECIMIENTO TEMPORAL DE LOS CONTROLES/, html: j('a-25') },
    { antesH: /^TÍTULO III CFS/, html: j('a-26') },
    { antesH: /^EUROSUR \(REGLAMENTO/, html: j('b-20') },
    { antesH: /^CAPACIDADES: EL CUERPO PERMANENTE/, html: j('b-54', 'b-56') },
    { antesH: /^MARCO GENERAL Y ORGANIZACIÓN/, html: j('b-67') }
  ]
};
