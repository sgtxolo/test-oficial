// Tema 10 · esquema LITERAL (24/10/2026): sustituye el esquema parcial (solo los apartados que preguntaban los tests) por el texto
// íntegro del Código Civil del temario 2026 (prompts/temario-limpio/tema10/cc.txt) con los títulos y capítulos de MI temario.
// Deja la norma como /* T10_CC */ (una línea) para marcas-lib.js, aplicar-subrayado-pdf.js y el Exprés. Conserva el RECUERDA conceptual anterior.
// Uso: node prompts/herramientas/tema10/esquema-t10.js
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), D = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema10');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---- 1. texto limpio: ordinales «1.°» → «1.º», sin artículos suprimidos/derogados, sin restos de cabecera de libro
let raw = fs.readFileSync(path.join(D, 'cc.txt'), 'utf8').replace(/\r/g, '');
raw = raw.replace(/(\d)\.°/g, '$1.º').replace(/\s*LIBRO PRIMERO — De las personas LIBRO PRIMERO De las personas/g, '');
const lineas = raw.split('\n').map(l => l.trim()).filter(Boolean);
const out = []; let cur = null;
for (const l of lineas) {
  if (/^CÓDIGO CIVIL —/.test(l)) continue;
  if (/^Artículo \d+(?: bis| ter)?\.$/.test(l)) { cur = { cab: l.replace(/\.$/, ''), n: parseInt(l.match(/\d+/)[0], 10), ls: [] }; out.push(cur); continue; }
  if (cur) cur.ls.push(l);
}
const arts = out.filter(a => !(a.ls.length === 1 && /^\((Suprimido|Derogado)\)$/.test(a.ls[0])));
fs.writeFileSync(path.join(D, 'cc.txt'), '﻿CÓDIGO CIVIL — Real Decreto de 24 de julio de 1889 (extracto oficial del temario 2026; texto consolidado BOE-A-1889-4763)\n'.replace('﻿', '') + arts.map(a => a.cab + '.\n' + a.ls.join('\n')).join('\n') + '\n');

// ---- 2. títulos y capítulos de MI temario (leídos de las páginas del escaneado), antes del artículo indicado
const TIT = {
  '1': ['TÍTULO PRELIMINAR. DE LAS NORMAS JURÍDICAS, SU APLICACIÓN Y EFICACIA', 'CAPÍTULO I. FUENTES DEL DERECHO'],
  '3': ['CAPÍTULO II. APLICACIÓN DE LAS NORMAS JURÍDICAS'],
  '6': ['CAPÍTULO III. EFICACIA GENERAL DE LAS NORMAS JURÍDICAS'],
  '13': ['CAPÍTULO V. ÁMBITO DE APLICACIÓN DE LOS REGÍMENES JURÍDICOS CIVILES COEXISTENTES EN EL TERRITORIO NACIONAL'],
  '17': ['LIBRO I. DE LAS PERSONAS', 'TÍTULO I. DE LOS ESPAÑOLES Y EXTRANJEROS'],
  '29': ['TÍTULO II. DEL NACIMIENTO Y LA EXTINCIÓN DE LA PERSONALIDAD CIVIL'],
  '35': ['DE LAS PERSONAS JURÍDICAS'],
  '40': ['TÍTULO III. DEL DOMICILIO'],
  '42': ['TÍTULO IV. DEL MATRIMONIO', 'DE LA PROMESA DE MATRIMONIO'],
  '102': ['CAPÍTULO X. DE LAS MEDIDAS PROVISIONALES POR DEMANDA DE NULIDAD, SEPARACIÓN Y DIVORCIO'],
  '108': ['TÍTULO V. DE LA PATERNIDAD Y FILIACIÓN', 'CAPÍTULO I. DE LA FILIACIÓN Y SUS EFECTOS'],
  '142': ['TÍTULO VI. DE LOS ALIMENTOS ENTRE PARIENTES'],
  '154': ['TÍTULO VII. DE LAS RELACIONES PATERNO-FILIALES', 'DISPOSICIONES GENERALES'],
  '199': ['TÍTULO IX. DE LA TUTELA Y DE LA GUARDA DE LOS MENORES', 'CAPÍTULO I. DE LA TUTELA', 'SECCIÓN 1.ª DISPOSICIONES GENERALES'],
  '211': ['SECCIÓN 2.ª DE LA DELACIÓN DE LA TUTELA Y DEL NOMBRAMIENTO DEL TUTOR'],
  '224': ['SECCIÓN 3.ª DEL EJERCICIO DE LA TUTELA'],
  '231': ['SECCIÓN 4.ª DE LA EXTINCIÓN DE LA TUTELA Y DE LA RENDICIÓN FINAL DE CUENTAS'],
  '235': ['CAPÍTULO II. DEL DEFENSOR JUDICIAL DEL MENOR'],
  '237': ['CAPÍTULO III. DE LA GUARDA DE HECHO DEL MENOR'],
  '239': ['TÍTULO X. DE LA MAYOR EDAD Y DE LA EMANCIPACIÓN'],
  '249': ['TÍTULO XI. DE LAS MEDIDAS DE APOYO A LAS PERSONAS CON DISCAPACIDAD PARA EL EJERCICIO DE SU CAPACIDAD JURÍDICA', 'CAPÍTULO I. DISPOSICIONES GENERALES'],
  '254': ['CAPÍTULO II. DE LAS MEDIDAS VOLUNTARIAS DE APOYO', 'SECCIÓN 1.ª DISPOSICIONES GENERALES'],
  '256': ['SECCIÓN 2.ª DE LOS PODERES Y MANDATOS PREVENTIVOS'],
  '263': ['CAPÍTULO III. DE LA GUARDA DE HECHO DE LAS PERSONAS CON DISCAPACIDAD'],
  '268': ['CAPÍTULO IV. DE LA CURATELA', 'SECCIÓN 1.ª DISPOSICIONES GENERALES'],
  '271': ['SECCIÓN 2.ª DE LA AUTOCURATELA Y DEL NOMBRAMIENTO DEL CURADOR', 'SUBSECCIÓN 1.ª DE LA AUTOCURATELA'],
  '275': ['SUBSECCIÓN 2.ª DEL NOMBRAMIENTO DEL CURADOR'],
  '282': ['SECCIÓN 3.ª DEL EJERCICIO DE LA CURATELA'],
  '291': ['SECCIÓN 4.ª DE LA EXTINCIÓN DE LA CURATELA'],
  '295': ['CAPÍTULO V. DEL DEFENSOR JUDICIAL DE LA PERSONA CON DISCAPACIDAD'],
  '299': ['CAPÍTULO VI. RESPONSABILIDAD POR DAÑOS CAUSADOS A OTROS'],
};

// ---- 3. HTML: bloques, fichas por artículo, párrafos con <b>1.</b> / sangría para ordinales y letras
const INDENT = ' style="margin-left:18px"';
function html() {
  let h = `<div class="bloque-titulo">10.1 — REAL DECRETO DE 24 DE JULIO DE 1889 POR EL QUE SE PUBLICA EL CÓDIGO CIVIL (texto consolidado · extracto oficial del temario 2026)</div>`;
  for (const a of arts) {
    if (!/ (bis|ter)$/.test(a.cab) && TIT[a.n]) for (const t of TIT[a.n]) h += `<div class="bloque-titulo">${esc(t)}</div>`;
    h += `<div class="articulo"><div class="articulo-head">${esc(a.cab)}</div><div class="articulo-body"><div class="txt">`;
    for (const l of a.ls) {
      let m;
      if ((m = l.match(/^(\d+\.)\s+(.*)$/))) h += `<p><b>${m[1]}</b> ${esc(m[2])}</p>`;
      else if ((m = l.match(/^(\d+\.[ºª])\s+(.*)$/)) || (m = l.match(/^(\d+\.[ªa])\s+(.*)$/))) h += `<p${INDENT}><b>${m[1]}</b> ${esc(m[2])}</p>`;
      else if ((m = l.match(/^([a-z]\)(?: bis)?)\s+(.*)$/))) h += `<p${INDENT}><b>${m[1]}</b> ${esc(m[2])}</p>`;
      else h += `<p>${esc(l)}</p>`;
    }
    h += '</div></div></div>';
  }
  return h;
}
const hCC = html();

// ---- 4. sustituir el bloque del Tema 10 en esquemas.html
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('const T10 = {};'); if (a < 0) throw new Error('no encuentro el Tema 10');
const b = s.indexOf('})();', s.indexOf('/* T10_RECUERDA + ensamblaje */', a)) + 5; const viejo = s.slice(a, b);
const recItems = (viejo.match(/\+ recuerda\(\[([\s\S]*?)\]\);\s*\}\)\(\);?$/) || viejo.match(/\+ recuerda\(\[([\s\S]*?)\]\);/) || [])[1];
if (!recItems) throw new Error('no encuentro el RECUERDA conceptual del Tema 10');
const nuevo = `const T10 = {};
/* T10_CC */ T10.cc = ${JSON.stringify(hCC)};
/* T10_RECUERDA + ensamblaje */
(function(){
  const t = esquemas[9];
  t.titulo = "10 — Derecho Civil: Código Civil (Título Preliminar y Libro I: personas, matrimonio, filiación, alimentos, patria potestad, adopción, tutela, emancipación y medidas de apoyo) con las respuestas de los tests";
  t.html = leyenda()
    + trampa("Cómo está hecho este esquema", "Texto LITERAL del extracto oficial del Código Civil del temario 2026 (BOE consolidado, con la reforma de 2021 sobre apoyos a personas con discapacidad), artículo por artículo. Las marcas EXOF / EX / ✱ y las fichas R son las de tu temario subrayado; tus colores, los de tu PDF.")
    + T10.cc
    + recuerda([${recItems}]);
})();`;
s = s.slice(0, a) + nuevo + s.slice(b);
fs.writeFileSync(F, s);
console.log('Código Civil:', (hCC.match(/class="articulo"/g) || []).length, 'fichas ·', (hCC.match(/<p/g) || []).length, 'párrafos');
