// Tema 15 · Exprés subrayado: construye expres-subrayado/t15-manual.json (una pieza f<fx> por ficha del Exprés desde la Resolución de 2005 hasta el final,
// con ventanas del PDF: del arranque de la ficha al arranque de la siguiente) a partir de fichas-pdf-t15.json (localizar-fichas-t15.py) y de las
// posiciones que se corrigieron a ojo (OVR). Las piezas llevan «fx» (índice de ficha del Exprés). Uso: node prompts/herramientas/tema15/montar-manual-t15.js
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..', '..', '..'); process.chdir(R);
const loc = JSON.parse(fs.readFileSync('prompts/herramientas/tema15/fichas-pdf-t15.json', 'utf8'));
const m0 = 0.04, m1 = 0.97;
// piezas fijadas a ojo (págs 0-based, fracciones de altura)
const OVR = {
  27: [[26, 0.25, 0.545]],
  28: [[26, 0.665, m1], [27, m0, m1], [28, m0, m1], [29, m0, 0.57]],
  29: [[29, 0.575, 0.775]],
  30: [[29, 0.775, m1], [30, m0, 0.145]],
  31: [[30, 0.145, 0.46]],
  32: [[30, 0.82, m1]],
  33: [[31, 0.395, 0.72]],
  34: [[31, 0.72, m1], [32, m0, 0.70]],
  35: [[32, 0.705, m1], [33, m0, m1], [34, m0, m1]],
  36: [[35, 0.105, 0.565]],
  37: [[35, 0.565, 0.75]],
  38: [[36, 0.185, 0.67]],
  39: [[37, 0.35, 0.565]],
  40: [[37, 0.565, 0.75]],
  41: [[38, 0.71, m1], [39, m0, 0.165]],
  42: [[42, 0.745, m1], [43, m0, 0.86]],
  43: [[44, 0.095, m1], [45, m0, m1], [46, m0, 0.375]],
  77: [[164, 0.10, 0.92], [165, 0.07, 0.34]],
  78: [[165, 0.34, 0.92]],
  79: [[166, 0.10, 0.64]],
  80: [[166, 0.64, 0.92], [167, 0.10, 0.56]],
};
const ULT = new Set([54, 60, 68, 75, 76]);   // última ficha de cada norma (Instr. 1/2025, 5/2021, protocolo pulseras, NTF-2/2025, Instr. 12/2018)
const GRUPO = fx => fx <= 54 ? 'Instrucción 1/2025' : fx <= 60 ? 'Instrucción 5/2021' : fx <= 68 ? 'Protocolo pulseras' : fx <= 75 ? 'NTF-2/2025' : 'Instrucción 12/2018';
const ventana = (a, b) => {   // a=[pag,y], b=[pag,y]
  const o = [];
  if (a[0] === b[0]) return [[a[0], Math.max(m0, a[1] - 0.006), b[1]]];
  o.push([a[0], Math.max(m0, a[1] - 0.006), m1]);
  for (let p = a[0] + 1; p < b[0]; p++) o.push([p, m0, m1]);
  o.push([b[0], m0, b[1]]); return o;
};
const L = {}; loc.forEach(x => L[x.fx] = x);
const manual = [];
const nombreFx = (fx, x) => (fx >= 77 ? 'RECUERDA · ' + ['LO 1/2004 (R1 a R7)', 'Resolución 2005 (R8 a R11)', 'Instrucción 4/2019 y protocolo telemático (R12 a R16)', 'NTF 1/2019 (R17 a R21)'][fx - 77] : (fx < 44 ? (fx < 42 ? 'Resolución 2005' : 'Acuerdo CGPJ 1/2005') : GRUPO(fx)) + ' · ' + (x ? x.clave.replace(/\s+/g, ' ').slice(0, 42) : ''));
for (let fx = 27; fx <= 80; fx++) {
  let piezas = OVR[fx];
  if (!piezas) {
    const a = L[fx], b = L[fx + 1];
    const A = [a.pag, a.y];
    let B;
    if (!ULT.has(fx) && b && b.pag >= a.pag && (b.pag - a.pag) <= 6 && (b.pag > a.pag || b.y > a.y)) B = [b.pag, b.y];
    else B = [a.pag + 1, 0.55];
    piezas = ventana(A, B);
  }
  manual.push({ id: 'f' + fx, fx, nombre: nombreFx(fx, L[fx]), expres: 1, piezas: piezas.map(p => [p[0], +p[1].toFixed(3), +p[2].toFixed(3)]) });
}
// LO 1/2004: arts. con saltos a mano (art. 30: solo la copia de la pág. 21 y la 22; art. 32: copia nueva de la pág. 25)
const prev = fs.existsSync('expres-subrayado/t15-manual.json') ? JSON.parse(fs.readFileSync('expres-subrayado/t15-manual.json', 'utf8')) : {};
const aMano = (prev.manual || []).filter(x => /^(a-|q\d)/.test(x.id));
fs.writeFileSync('expres-subrayado/t15-manual.json', JSON.stringify({ manual: [...aMano, ...manual], paginas: [] }, null, 1));
console.log(manual.length, 'piezas manuales (+', aMano.length, 'de la LO a mano)');
