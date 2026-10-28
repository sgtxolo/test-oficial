// Tema 17 · esquema LITERAL (28/10/2026) a partir del texto limpio (prompts/temario-limpio/tema17/oficial.txt, que sigue MI PDF subrayado):
//   17.1 LO 5/2000 (Tít. Prel., I, II, III y VIII) · 17.2 RD 1774/2004 (Cap. I y II) · 17.3 Instrucción 1/2017 (sin 3.1, 3.3, 3.4 y punto 4, tachados) · RECUERDA R1-R10, R17-R25.
// Las marcas a mano (EXOF / EX / EXAMEN / ✱ → data-ex; fichas R → data-r) se colocan en su párrafo desde la tabla MARCAS (lectura en marcas-lectura.md).
// Deja cada norma como /* T17_X */ T17.x = "…" (una línea) para aplicar-subrayado-pdf.js y el Exprés. Idempotente.
// Uso: node prompts/herramientas/tema17/esquema-t17.js
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), D = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema17');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---- marcas: clave NORMA|art|token (token = «1.», «e)», «#1» = primer párrafo, «~texto» = párrafo que empieza así). INS: NORMA|punto.|letra
const MARCAS = {
  'LO|1|1.': { ex: ['EX'] }, 'LO|2|3.': { ex: ['EX'] }, 'LO|2|4.': { r: ['R1'] }, 'LO|3|#1': { ex: ['EX'] }, 'LO|4|#1': { ex: ['EX'] },
  'LO|7|1.': { ex: ['EXAMEN'] }, 'LO|7|e)': { ex: ['*'] }, 'LO|7|m)': { ex: ['EX'] }, 'LO|7|2.': { ex: ['EX'] }, 'LO|8|#1': { r: ['R2'] },
  'LO|9|1.': { ex: ['EX'] }, 'LO|9|b)': { ex: ['EX'] }, 'LO|9|4.': { r: ['R3'] },
  'LO|10|2.': { ex: ['EXAMEN'] }, 'LO|10|4.': { ex: ['EX'] }, 'LO|12|2.': { ex: ['EX'] }, 'LO|14|2.': { ex: ['EX'] }, 'LO|15|1.': { ex: ['EXAMEN', 'EX'] },
  'LO|16|1.': { r: ['R4'] }, 'LO|17|1.': { ex: ['EX'] }, 'LO|17|2.': { ex: ['EX'] }, 'LO|17|4.': { ex: ['EX'] }, 'LO|17|5.': { ex: ['EX'] }, 'LO|17|6.': { ex: ['EX'] },
  'LO|18|#1': { ex: ['EX'] }, 'LO|19|1.': { ex: ['EX'] }, 'LO|20|1.': { r: ['R5'] }, 'LO|20|2.': { ex: ['EX'] }, 'LO|20|4.': { ex: ['EX'] },
  'LO|22|d)': { ex: ['EX'] }, 'LO|22|f)': { ex: ['EX'] }, 'LO|22|2.': { ex: ['EX'] }, 'LO|23|2.': { r: ['R6'] }, 'LO|23|4.': { ex: ['EX'] },
  'LO|25|#1': { ex: ['EX'] }, 'LO|26|1.': { ex: ['EX'] }, 'LO|27|1.': { ex: ['EX'] }, 'LO|27|5.': { ex: ['EX'] }, 'LO|28|1.': { ex: ['*'] }, 'LO|28|3.': { r: ['R7'] },
  'RD|2|1.': { ex: ['EXAMEN', 'EX'] }, 'RD|2|2.': { ex: ['EX'] }, 'RD|2|~Salvo la detención': { r: ['R8'] }, 'RD|2|3.': { ex: ['EX'] }, 'RD|2|4.': { ex: ['EXAMEN'] }, 'RD|2|6.': { ex: ['EX'] },
  'RD|3|2.': { ex: ['EX'] }, 'RD|3|3.': { ex: ['EX'] }, 'RD|3|5.': { ex: ['EX'] }, 'RD|4|1.': { ex: ['EX'] }, 'RD|4|2.': { ex: ['EXAMEN', 'EX'], r: ['R9'] }, 'RD|5|a)': { ex: ['EX'] },
  'INS|1.1.1.': { r: ['R10'] }, 'INS|2.1.2.': { ex: ['EX'] }, 'INS|5.1.2.': { ex: ['EX'] }, 'INS|5.2.1.a': { ex: ['EX'] }, 'INS|5.3.1.a': { ex: ['EX'] }, 'INS|5.3.2.': { ex: ['EX'] },
  'INS|5.3.6.': { ex: ['EX'] }, 'INS|5.3.8.': { ex: ['EX'], r: ['R17'] }, 'INS|5.4.2.b': { ex: ['EX'] }, 'INS|6.1.2.': { ex: ['EXOF'] }, 'INS|6.1.3.': { ex: ['EXOF'] }, 'INS|6.1.5.': { r: ['R18'] },
  'INS|6.1.6.b': { ex: ['EX'] }, 'INS|6.1.7.': { ex: ['EX'] }, 'INS|6.1.8.a': { ex: ['EX'] }, 'INS|8.2.2.': { r: ['R19'] }, 'INS|8.2.3.': { r: ['R20'] }, 'INS|8.2.4.': { ex: ['EX'] },
  'INS|8.2.5.': { ex: ['EX'] }, 'INS|8.2.8.': { ex: ['EX'] }, 'INS|8.2.10.': { ex: ['EX'] }, 'INS|8.2.11.': { r: ['R21', 'R22'] }, 'INS|8.2.12.': { ex: ['EX'] },
  'INS|9.1.5.': { ex: ['*'] }, 'INS|9.1.8.': { ex: ['EX'] }, 'INS|9.2.1.b': { ex: ['EX'] }, 'INS|10.2.1.b': { ex: ['EX'] }, 'INS|10.3.5.': { ex: ['EX'] }, 'INS|10.4.1.': { r: ['R23'] }, 'INS|10.4.3.': { ex: ['EX'] },
};
const usadas = new Set();
const attrs = (norma, art, tok, idx, texto) => {
  const claves = art === '' ? [`${norma}|${tok}`] : [`${norma}|${art}|${tok}`, idx === 1 ? `${norma}|${art}|#1` : null, ...Object.keys(MARCAS).filter(k => k.startsWith(`${norma}|${art}|~`) && texto.startsWith(k.split('|')[2].slice(1)))].filter(Boolean);
  const ex = [], r = [];
  for (const k of claves) if (MARCAS[k]) { usadas.add(k); (MARCAS[k].ex || []).forEach(x => !ex.includes(x) && ex.push(x)); (MARCAS[k].r || []).forEach(x => !r.includes(x) && r.push(x)); }
  return (ex.length ? ` data-ex="${ex.join(',')}"` : '') + (r.length ? ` data-r="${r.join(',')}"` : '');
};

// ---- partir oficial.txt en normas
const lineas = fs.readFileSync(path.join(D, 'oficial.txt'), 'utf8').replace(/\r/g, '').split('\n').map(l => l.trim()).filter(Boolean);
const iRD = lineas.findIndex(l => /^REAL DECRETO 1774\/2004/.test(l)), iIN = lineas.findIndex(l => /^INSTRUCCIÓN 1\/2017/.test(l));
const loL = lineas.slice(0, iRD), rdL = lineas.slice(iRD, iIN), inL = lineas.slice(iIN);
const sinPag = ls => ls.filter(l => !/^\[\[pag \d+\]\]$/.test(l));

// ---- LO y RD: fichas por artículo
const TITULOS = {
  LO: { '1': 'TÍTULO PRELIMINAR', '2': 'TÍTULO I. DEL ÁMBITO DE APLICACIÓN DE LA LEY', '7': 'TÍTULO II. DE LAS MEDIDAS', '16': 'TÍTULO III. DE LA INSTRUCCIÓN DEL PROCEDIMIENTO · CAPÍTULO I. REGLAS GENERALES', '28': 'CAPÍTULO II. DE LAS MEDIDAS CAUTELARES', '30': 'CAPÍTULO III. DE LA CONCLUSIÓN DE LA INSTRUCCIÓN', '61': 'TÍTULO VIII. DE LA RESPONSABILIDAD CIVIL' },
  RD: { '1': 'CAPÍTULO I. DISPOSICIONES GENERALES', '2': 'CAPÍTULO II. DE LA ACTUACIÓN DE LA POLICÍA JUDICIAL Y DEL EQUIPO TÉCNICO' },
};
function articulos(ls, norma, cab) {
  let h = `<div class="bloque-titulo">${esc(cab)}</div>`, abierta = false, art = null, idx = 0;
  const cierra = () => { if (abierta) { h += '</div></div></div>'; abierta = false; } };
  for (const l of sinPag(ls)) {
    const m = l.match(/^Artículo (\d+)\. (.*)$/);
    if (m) { cierra(); art = m[1]; idx = 0;
      if (TITULOS[norma][art]) h += `<div class="bloque-titulo">${esc(TITULOS[norma][art])}</div>`;
      h += `<div class="articulo"><div class="articulo-head">Artículo ${m[1]} — ${esc(m[2].replace(/\.$/, ''))}</div><div class="articulo-body"><div class="txt">`; abierta = true; continue; }
    if (!abierta || /^(REAL DECRETO|\(Cap)/.test(l)) continue;
    idx++;
    const n = l.match(/^(\d+\.ª|\d+\.|[a-zñ]\))\s+(.*)$/);
    const tok = n ? n[1] : '', sangria = n ? (/ª$/.test(tok) ? ' style="margin-left:36px"' : /\)$/.test(tok) ? ' style="margin-left:18px"' : '') : '';
    h += `<p${sangria}${attrs(norma, art, tok || '~', idx, l)}>${n ? `<b>${esc(tok)}</b> ${esc(n[2])}` : esc(l)}</p>`;
  }
  cierra(); return h;
}
const hLO = articulos(loL.filter(l => !/^LEY ORGÁNICA|^\(Extracto/.test(l)), 'LO', '17.1 — LEY ORGÁNICA 5/2000, DE 12 DE ENERO, REGULADORA DE LA RESPONSABILIDAD PENAL DE LOS MENORES (Título Preliminar, I, II, III y VIII)');
const hRD = articulos(rdL.filter(l => !/^\(Capítulo|^REAL DECRETO/.test(l)), 'RD', '17.2 — REAL DECRETO 1774/2004, DE 30 DE JULIO, POR EL QUE SE APRUEBA EL REGLAMENTO DE LA LEY ORGÁNICA 5/2000 (Capítulos I y II)');

// ---- Instrucción 1/2017: puntos → bloque-titulo, apartados «x.y.» → ficha, «x.y.z.» → párrafos, «a.» → sangría
function instruccion(ls) {
  let h = `<div class="bloque-titulo">17.3 — INSTRUCCIÓN 1/2017, DE LA SECRETARÍA DE ESTADO DE SEGURIDAD, POR LA QUE SE ACTUALIZA EL «PROTOCOLO DE ACTUACIÓN POLICIAL CON MENORES» (excepto los apartados 3.1, 3.3 y 3.4 del punto 3 y el punto 4)</div>`;
  let abierta = false, unidad = '';
  const cierra = () => { if (abierta) { h += '</div></div></div>'; abierta = false; } };
  const abre = cab => { cierra(); h += `<div class="articulo"><div class="articulo-head">${esc(cab)}</div><div class="articulo-body"><div class="txt">`; abierta = true; };
  for (const l of sinPag(ls)) {
    if (/^INSTRUCCIÓN 1\/2017|^\(Extracto/.test(l)) continue;
    if (/^INSTRUCCIONES\./.test(l)) { abre('Instrucciones (texto leído en la imagen de tu temario subrayado)'); continue; }
    let m;
    if ((m = l.match(/^(\d+)\. ([A-ZÁÉÍÓÚÑ ,.]{6,})$/))) { cierra(); h += `<div class="bloque-titulo">${m[1]}. ${esc(m[2])}</div>`; continue; }
    if ((m = l.match(/^(\d+\.\d+)\. ([^.].{2,90})$/)) && !/\d+\.\d+\.\d+/.test(l.split(' ')[0])) { abre(`${m[1]}. ${m[2]}`); continue; }
    if ((m = l.match(/^(\d+\.\d+\.\d+)\. (.*)$/))) { unidad = m[1] + '.'; h += `<p${attrs('INS', '', unidad, 0, l)}><b>${m[1]}.</b> ${esc(m[2])}</p>`; continue; }
    if ((m = l.match(/^([a-z])\. (.*)$/))) { h += `<p style="margin-left:18px"${attrs('INS', '', unidad + m[1], 0, l)}><b>${m[1]}.</b> ${esc(m[2])}</p>`; continue; }
    if (!abierta) abre('Instrucciones');
    h += `<p>${esc(l)}</p>`;
  }
  cierra(); return h;
}
const hIN = instruccion(inL);
// INS: las claves usan «pto.» sin art → normalizamos la comprobación de usadas
// ---- fichas R (pregunta → respuesta) tal como vienen en las págs. 69-73; R11-R16 excluidas (apartados tachados)
const R = [
  ['R1', 'LO', 'La competencia para conocer de los delitos previstos en los artículos 571 a 580 del Código Penal corresponderá:', 'al Juzgado Central de Menores de la Audiencia Nacional.'],
  ['R2', 'LO', 'El Juez de Menores no podrá imponer una medida que suponga una mayor restricción de derechos ni por un tiempo superior a la medida solicitada por:', 'el Ministerio Fiscal o por el acusador particular.'],
  ['R3', 'LO', 'Las acciones u omisiones imprudentes no podrán ser sancionadas:', 'con medidas de internamiento en régimen cerrado.'],
  ['R4', 'LO', 'Corresponde la instrucción de los procedimientos por los hechos a los que se refiere el artículo 1 de esta Ley:', 'al Ministerio Fiscal.'],
  ['R5', 'LO', 'El Ministerio Fiscal incoará un procedimiento por cada hecho delictivo, salvo:', 'cuando se trate de hechos delictivos conexos.'],
  ['R6', 'LO', 'El Ministerio Fiscal deberá dar vista del expediente al letrado del menor y, en su caso, a quien haya ejercitado la acción penal, en un plazo:', 'no superior a veinticuatro horas, tantas veces como aquel lo solicite.'],
  ['R7', 'LO', 'El tiempo máximo de la medida cautelar de internamiento será de:', 'seis meses, y podrá prorrogarse, a instancia del Ministerio Fiscal, previa audiencia del letrado del menor y mediante auto motivado, por otros tres meses como máximo.'],
  ['R8', 'RD', 'Toda diligencia policial restrictiva de derechos fundamentales será interesada al Ministerio Fiscal para que, por su conducto, se realice la oportuna solicitud al juez de menores competente:', 'salvo la detención.'],
  ['R9', 'RD', 'Los profesionales integrantes de los equipos técnicos dependerán orgánicamente del Ministerio de Justicia o de las comunidades autónomas con competencias asumidas y estarán adscritos a:', 'los juzgados de menores.'],
  ['R10', 'INS', 'El presente Protocolo tiene por objeto actualizar y unificar:', 'los criterios de actuación de las Fuerzas y Cuerpos de Seguridad del Estado.'],
  ['R17', 'INS', 'Siempre que existan dudas sobre la mayoría o minoría de edad de la víctima y no pueda ser determinada con certeza, se presumirá:', 'que se trata de una persona menor de edad.'],
  ['R18', 'INS', 'En las actuaciones policiales realizadas para el mantenimiento y restablecimiento de la seguridad ciudadana se tendrá en cuenta que los menores afectados reciban un trato acorde con la protección del superior interés del menor, sin perjuicio:', 'del interés público general.'],
  ['R19', 'INS', 'Extranjero menor de dieciocho años nacional de un Estado al que no le sea de aplicación el régimen de la Unión Europea que llegue a territorio español sin un adulto responsable de él, apreciándose riesgo de desprotección del menor:', 'menor extranjero no acompañado (MENA).'],
  ['R20', 'INS', 'Cuando se localice a un menor extranjero no acompañado se comunicará a la mayor brevedad a:', 'la correspondiente Brigada Provincial de Extranjería y Fronteras de la Policía Nacional, así como a la Delegación o Subdelegación del Gobierno y al Ministerio Fiscal.'],
  ['R21', 'INS', 'La Entidad pública de protección de menores estará facultada para solicitar la autorización de residencia:', 'transcurridos tres meses desde la puesta del menor extranjero a disposición del Centro de protección de menores.'],
  ['R22', 'INS', 'En todo caso, transcurrido el plazo máximo de nueve meses desde la puesta a disposición del menor, sea cual sea el estado de tramitación, otorgará la autorización de residencia:', 'la Delegación o Subdelegación de Gobierno.'],
  ['R23', 'INS', 'La confección y tenencia de álbumes fotográficos de menores detenidos, tanto en soporte físico como digital, corresponderá:', 'a los Grupos o Equipos especializados en el tratamiento policial de menores y, en su caso, a las Unidades de investigación en esta materia.'],
  ['R24', 'I14', 'Los datos tratados de los libros oficiales regulados en la presente Instrucción, cuyo registro corresponde a las Direcciones Generales de la Policía y de la Guardia Civil, se efectuará:', 'de modo inmediato en sus respectivos sistemas informáticos conforme se vayan produciendo las vicisitudes objeto de inscripción.'],
  ['R25', 'I14', 'En todas las dependencias que tengan la obligación de cumplimentar los libros de registro regulados en la presente Instrucción se deberá facilitar el acceso:', 'a las autoridades legitimadas en funciones de control e inspección respecto al/los libros de registro que le correspondan, de conformidad con la normativa reguladora de aplicación.'],
];
const NOM = { LO: 'LO 5/2000', RD: 'RD 1774/2004', INS: 'Instrucción 1/2017', I14: 'Instrucción 14/2018 (libros de registro; solo ficha en tu temario)' };
const grupo = (tit, f) => `<div class="articulo"><div class="articulo-head">${esc(tit)}</div><div class="articulo-body"><div class="txt">${R.filter(f).map(r => `<p data-r="${r[0]}"><b>${r[0]}</b> · <i>${NOM[r[1]]}.</i> ${esc(r[2])} <b>→</b> <mark class="m-resp">${esc(r[3])}</mark></p>`).join('')}</div></div></div>`;
const hREC = `<div class="bloque-titulo">RECUERDA DEL TEMARIO — fichas R1 a R25 (pregunta → respuesta), tal como vienen en las últimas páginas de tu temario (R11 a R16 excluidas: pertenecen a apartados tachados)</div>`
  + grupo('RECUERDA del temario · LO 5/2000 (R1 a R7)', r => r[1] === 'LO') + grupo('RECUERDA del temario · RD 1774/2004 (R8 y R9)', r => r[1] === 'RD')
  + grupo('RECUERDA del temario · Instrucción 1/2017 (R10 y R17 a R23)', r => r[1] === 'INS') + grupo('RECUERDA del temario · Instrucción 14/2018 (R24 y R25)', r => r[1] === 'I14');

// ---- insertar en esquemas.html entre /* T17_BEGIN */ y /* T17_END */ (tras T15_END)
let s = fs.readFileSync(F, 'utf8');
const bloque = `/* T17_BEGIN */
const T17 = {};
/* T17_LO */ T17.lo = ${JSON.stringify(hLO)};
/* T17_RD */ T17.rd = ${JSON.stringify(hRD)};
/* T17_INS */ T17.ins = ${JSON.stringify(hIN)};
/* T17_REC */ T17.rec = ${JSON.stringify(hREC)};
(function(){
  const t = esquemas[16];
  t.titulo = "17 — Responsabilidad Penal de los Menores: LO 5/2000, Reglamento (RD 1774/2004) e Instrucción 1/2017 de la SES (Protocolo de actuación policial con menores)";
  t.html = leyenda()
    + trampa("Cómo está hecho este esquema", "Texto LITERAL de tu temario 2026 (versión de tu PDF subrayado: arts. 4 y 10.2 con las partes «NUEVO»). Las marcas EXOF / EX / ✱ y las fichas R son las de tu temario; los apartados tachados de la Instrucción (3.1, 3.3, 3.4 y punto 4) no están.")
    + T17.lo + T17.rd + T17.ins + T17.rec;
})();
/* T17_END */`;
const a = s.indexOf('/* T17_BEGIN */');
if (a >= 0) { const b = s.indexOf('/* T17_END */', a) + '/* T17_END */'.length; s = s.slice(0, a) + bloque + s.slice(b); }
else { const p = s.indexOf('/* T15_END */'); if (p < 0) throw new Error('sin ancla T15_END'); const q = p + '/* T15_END */'.length; s = s.slice(0, q) + '\n' + bloque + s.slice(q); }
fs.writeFileSync(F, s);
const sin = Object.keys(MARCAS).filter(k => !usadas.has(k));
console.log('LO:', (hLO.match(/class="articulo"/g) || []).length, 'fichas · RD:', (hRD.match(/class="articulo"/g) || []).length, '· INS:', (hIN.match(/class="articulo"/g) || []).length, 'fichas · marcas colocadas', usadas.size, 'de', Object.keys(MARCAS).length);
if (sin.length) console.log('MARCAS SIN COLOCAR:', sin.join(' | '));
