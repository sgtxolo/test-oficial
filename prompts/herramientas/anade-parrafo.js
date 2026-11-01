require('./esq-virtual.js');   // esquemas.html con los textos de las leyes en su sitio (ver esq-virtual.js)
// Añade un párrafo literal del temario a la ficha de un tema en esquemas.html (clase 1 de «sin sitio»: falta el apartado en el esquema).
// Uso desde un script de tema:
//   const E = require('../anade-parrafo.js')();
//   E.inserta({ cab: 'Instrucciones (texto leído…)', donde: 'ini' | 'fin' | { antes: '<p>Tercera.' }, html: '<p><b>Cuarto.</b> …</p>' });
//   E.guarda();
// «cab» es el texto de la cabecera tal como está en esquemas.html: <div class=\"articulo-head\">CAB</div> (T15/T17) o articulo("CAB"… / articuloResp("CAB"… (T4/T5…).
// Idempotente: si el html ya está dentro de la ficha no hace nada. Los índices j de los párrafos posteriores de la ficha se desplazan: repetir mapa-preguntas.js.
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', 'esquemas.html');
module.exports = function () {
  let s = fs.readFileSync(F, 'utf8'); const crlf = /\r\n/.test(s);
  const esc = h => h.replace(/"/g, '\\"');
  const out = { hechas: 0, ya: 0, falta: [] };
  out.inserta = ({ cab, donde = 'ini', html }) => {
    const H = esc(html);
    const pats = ['articulo-head\\">' + cab + '</div>', 'articuloResp("' + cab + '"', 'articulo("' + cab + '"'];
    let i = -1; for (const p of pats) { i = s.indexOf(p); if (i >= 0) break; }
    if (i < 0) { out.falta.push(cab); return false; }
    // fin de la ficha: el siguiente inicio de ficha/bloque o el cierre de la llamada
    const sig = [s.indexOf('<div class=\\"articulo\\">', i + 10), s.indexOf('<div class=\\"bloque-titulo\\">', i + 10), s.indexOf('\n', i)].filter(x => x > 0);
    const fin = Math.min(...sig); const trozo = s.slice(i, fin);
    if (trozo.includes(H)) { out.ya++; return true; }
    let pos;
    if (donde === 'ini') { const q = trozo.search(/<p[ >]/); pos = q < 0 ? -1 : i + q; }
    else if (donde === 'fin') { const q = trozo.lastIndexOf('</p>'); pos = q < 0 ? -1 : i + q + 4; }
    else { const a = trozo.indexOf(esc(donde.antes)); pos = a < 0 ? -1 : i + a; }
    if (pos < 0) { out.falta.push(cab + ' (posición)'); return false; }
    s = s.slice(0, pos) + H + s.slice(pos); out.hechas++; return true;
  };
  out.guarda = () => { fs.writeFileSync(F, s); console.log('párrafos añadidos:', out.hechas, '· ya estaban:', out.ya, out.falta.length ? '· NO ENCONTRADOS: ' + out.falta.join(' | ') : ''); };
  return out;
};
