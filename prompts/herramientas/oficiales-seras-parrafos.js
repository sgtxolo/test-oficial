// Añade al esquema los párrafos literales de preguntas de los vídeos del 26/11 y las enlaza (aborta si ya está).
// Uso (desde la carpeta del proyecto): node anade.js
const P = process.cwd() + '/prompts/herramientas/';
require(P + 'esq-virtual.js');
const fs = require('fs'), cp = require('child_process');
const R = t => '<mark class="m-resp">' + t + '</mark>';
const B = t => '<b>' + t + '</b> ';
// pos: índice del párrafo donde se inserta (sin pos = al final); sust: párrafo que se sustituye
const OPS = [
 { ids: ['2-301'], t: 2, cab: 'Artículos 62 y 63 —', ps: [B('Art. 64.') + B('1.') + 'El Servicio Ejecutivo de la Comisión determinará si existe o no sospecha fundada de infracción en las comunicaciones recibidas de conformidad con el artículo 63. De no existir sospecha fundada o cuando no se concreten suficientemente los hechos o personas responsables de la infracción, requerirá a la persona comunicante para que aclare el contenido de la comunicación realizada, o lo complemente con nueva información, concediendo ' + R('un plazo para ello no inferior a 15 días') + '. Transcurrido el plazo fijado para la aclaración o aportación de nueva información, sin que pueda determinarse sospecha fundada, se procederá al archivo de la comunicación.'] },
 { ids: ['2-312'], t: 2, cab: 'Artículos 12, 13 y 14 —', pos: 3, ps: [B('Art. 13.') + B('7.') + 'Los Estados Parte podrán denegar la cooperación solicitada con arreglo al presente artículo ' + R('si el delito al que se refiere la solicitud no es un delito comprendido en la presente Convención') + '.'] },
 { ids: ['2-361'], t: 2, cab: 'Artículos 15, 16 y 18 —', ps: [
   B('Art. 18.') + B('6.') + 'Los Estados Parte ' + R('podrán cooperar con las organizaciones internacionales que proceda') + ' para aplicar el presente artículo.',
   B('7.') + 'Las disposiciones del presente artículo ' + R('no menoscabarán ninguno de los derechos reconocidos') + ' a las personas que hayan sido objeto de las conductas enunciadas en el artículo 6 del presente Protocolo por el derecho interno del Estado Parte receptor.',
   B('8.') + 'Nada de lo dispuesto en el presente artículo ' + R('afectará a las obligaciones contraídas con arreglo a cualquier otro tratado bilateral o multilateral aplicable') + ' o a cualquier otro acuerdo o arreglo operacional que rija, parcial o totalmente, la repatriación de las personas que hayan sido objeto de las conductas enunciadas en el artículo 6 del presente Protocolo.'] },
 { ids: ['2-364'], t: 2, cab: 'Artículos 16 a 18 —', pos: 2, ps: [B('Art. 17.') + B('3.') + 'El presente Protocolo estará sujeto a ratificación, aceptación o aprobación. Los instrumentos de ratificación, aceptación o aprobación se depositarán en poder del Secretario General de las Naciones Unidas. Las organizaciones regionales de integración económica podrán depositar su instrumento de ratificación, aceptación o aprobación ' + R('si por lo menos uno de sus Estados miembros') + ' ha procedido de igual manera. En ese instrumento de ratificación, aceptación o aprobación, esas organizaciones declararán el alcance de su competencia con respecto a las cuestiones regidas por el presente Protocolo. Dichas organizaciones comunicarán también al depositario cualquier modificación pertinente del alcance de su competencia.'] },
 { ids: ['5-376'], t: 5, cab: 'Artículo 3 — Definiciones', pos: 7, ps: [B('10') + '«' + R('Estado miembro de concesión') + '»: el Estado miembro que está considerando conceder o prorrogar un permiso de residencia o un visado para estancia de larga duración o que los ha concedido o prorrogado, y que participa en el procedimiento de consulta con otro Estado miembro (…)'] },
 { ids: ['5-381'], t: 5, cab: 'Artículo 36 — Acceso a los datos del SIS', ps: [B('Art. 37.') + B('1.') + 'La Comisión llevará a cabo ' + R('al menos cada cinco años') + ' una evaluación del funcionamiento y la utilización del SIS por parte de Europol y de los equipos mencionados en el artículo 36, apartado 1.'] },
 { ids: ['5-396'], t: 5, cab: 'Artículo 41 — Tratamiento de los datos del SIS', sust: /A tal fin/, ps: [B('5') + 'Todo tratamiento de información del SIS por los Estados miembros con fines distintos de aquellos para los que se introdujo en el SIS deberá guardar relación con algún caso concreto y estar justificado ' + R('por la necesidad de prevenir una amenaza grave e inminente para el orden y la seguridad públicos, por razones graves de seguridad nacional o por la necesidad de prevenir un delito grave') + '. A tal fin, deberá obtenerse autorización previa del Estado miembro emisor.'] },
 { ids: ['5-437', '5-455'], t: 5, cab: 'Artículo 29 — Colocación de la etiqueta de visado', ps: [B('2.') + 'En los casos en que el Estado miembro de expedición del visado no reconozca el documento de viaje del solicitante, ' + R('se utilizará el impreso separado para la colocación del visado') + '.'] },
 { ids: ['5-438'], t: 5, cab: 'Artículo 43 — Cooperación con proveedores', pos: 0, ps: [B('Art. 43.') + B('5.') + 'Los proveedores de servicios externos ' + R('no tendrán acceso al VIS en ningún caso') + '. El acceso al VIS estará reservado exclusivamente al personal debidamente autorizado de los consulados o de las autoridades centrales. (…)'] },
 { ids: ['5-444'], t: 5, cab: 'Artículo 9 — Modalidades prácticas', ps: [B('Art. 10.') + B('3.') + 'Al presentar su solicitud, el solicitante deberá: a) presentar un impreso de solicitud con arreglo a lo dispuesto en el artículo 11; b) presentar pruebas de estar en posesión de un documento de viaje de conformidad con el artículo 12; c) permitir que su imagen facial se tome en vivo de conformidad con el artículo 13 o, cuando sean de aplicación las excepciones contempladas en el artículo 13, apartado 7 bis, presentar una fotografía de conformidad con las normas establecidas en el Reglamento (CE) n.º 1683/95; d) permitir la toma de sus impresiones dactilares, ' + R('de conformidad con el artículo 13, cuando proceda') + '; e) abonar las tasas de tramitación del visado de conformidad con el artículo 16; f) presentar pruebas de los documentos justificativos de conformidad con el artículo 14; g) en su caso, presentar la prueba de poseer un seguro médico de viaje adecuado y válido, de conformidad con el artículo 15.'] },
 { ids: ['5-478', '5-450'], t: 5, cab: 'Artículo 13 — Identificadores biométricos', par: { '5-478': 0, '5-450': 1 }, ps: [
   B('Art. 14.') + B('2.') + 'Al solicitar un visado de tránsito aeroportuario, el solicitante presentará: a) ' + R('prueba de los documentos acreditativos relativos a la continuación del viaje') + ' hasta el destino final tras el tránsito aeroportuario previsto; b) información que permita establecer la intención del solicitante de no entrar en el territorio de los Estados miembros.',
   B('Anexo II. A. 1)') + 'Para los viajes de negocios: a) ' + R('una invitación de una empresa o de una autoridad') + ' para asistir a reuniones, conferencias o acontecimientos relacionados con el comercio, la industria o el trabajo; b) otros documentos que prueben la existencia de relaciones comerciales o relaciones laborales; c) entradas para ferias y congresos, en su caso; d) documentos que demuestren las actividades económicas de la empresa; e) documentos que demuestren que el estatus profesional del solicitante en la empresa.'] },
 { ids: ['11-250'], t: 11, cab: 'Artículo 16 — Procedimiento para el establecimiento de medidas correctoras', ps: [B('Disposición adicional segunda. Personal destinado o comisionado en el extranjero.') + 'Corresponderá ' + R('al Servicio de Prevención') + ' el ejercicio de las funciones relacionadas con el personal incluido en el ámbito de aplicación de este real decreto que esté destinado o en comisión de servicio en el extranjero y que no desempeñe misiones militares. Para ello, tendrá en cuenta las peculiaridades derivadas de su organización, la dispersión geográfica, la naturaleza de las misiones que realizan y, en su caso, la aplicabilidad del derecho local del Estado correspondiente.'] },
];
const BS = String.fromCharCode(92), NL = String.fromCharCode(10);
const esc = t => t.split('"').join(BS + '"');
const MARCA = { 2: '/* T2_', 5: '/* T5_', 11: '/* T11_' };
const src = fs.readFileSync(P + 'mapa-preguntas.js', 'utf8');
const cuerpo = src.slice(src.indexOf('const ESQ ='), src.indexOf('// ---------- 6. Ejecutar'));
const F = new Function('fs', 'require', '__dirname', cuerpo + ';return {cargarEsquemas,unidades,norm};')(fs, require, P);
const lineas = fs.readFileSync('esquemas.html', 'utf8').split(NL);
const enlaces = {}, mueve = [];
for (const o of OPS) {
  const ini = lineas.findIndex(l => l.startsWith(MARCA[o.t]));
  const n = lineas.findIndex((l, i) => i > ini && l.includes('articuloResp("' + o.cab));
  if (ini < 0 || n < 0) throw new Error('sin ficha ' + o.cab);
  const l = lineas[n];
  const nuevos = o.ps.map(p => '<p>' + esc(p) + '</p>');
  if (l.includes(nuevos[0])) throw new Error('ya añadido: ' + o.cab);
  const a = l.indexOf('<p'), b = l.lastIndexOf('</p>') + 4; if (a < 0) throw new Error('sin párrafos ' + o.cab);
  const ps = l.slice(a, b).match(/<p[ >][\s\S]*?<\/p>/g);
  if (ps.join('') !== l.slice(a, b)) throw new Error('hay algo entre párrafos en ' + o.cab);
  let j;
  if (o.sust) { j = ps.findIndex(p => o.sust.test(p)); if (j < 0) throw new Error('no hallo párrafo a sustituir'); console.log('sustituido:', ps[j].replace(/<[^>]+>/g, '')); ps.splice(j, 1, ...nuevos); }
  else { j = o.pos === undefined ? ps.length : o.pos; if (j < ps.length) mueve.push({ cab: o.cab, t: o.t, desde: j, n: nuevos.length }); ps.splice(j, 0, ...nuevos); }
  lineas[n] = l.slice(0, a) + ps.join('') + l.slice(b);
  for (const id of o.ids) enlaces[id] = { t: o.t, cab: o.cab, j: j + (o.par ? o.par[id] : 0) };
}
fs.writeFileSync('esquemas.html', lineas.join(NL));
const limpio = x => F.norm(x).replace(/[^a-z0-9]/g, '');
for (const t of [2, 5, 11]) {
  const us = F.unidades(F.cargarEsquemas()[t - 1], t);
  for (const o of OPS.filter(o => o.t === t)) {
    const g = us.filter(u => u.cab.replace(/[^a-z0-9]/g, '').startsWith(limpio(o.cab)));
    const ks = [...new Set(g.map(u => +u.pid.split('-')[1]))];
    if (!ks.length) throw new Error('sin unidad ' + o.cab);
    // si hay dos fichas con la misma cabecera, vale la que contiene el párrafo nuevo
    const nuevo = limpio(o.ps[0]);
    const k = ks.find(k => us.some(u => u.pid.startsWith(`${t}-${k}-`) && limpio(u.T) === nuevo));
    if (k === undefined) throw new Error('el párrafo nuevo no aparece en ' + o.cab);
    for (const id of o.ids) { const e = enlaces[id]; e.k = k; const u = us.find(u => u.pid === `${t}-${k}-${e.j}`); if (!u || !u.marks.length) throw new Error('sin marca ' + id); e.v = `${k}-${e.j}-0`; e.txt = u.T.slice(0, 90); }
    for (const m of mueve.filter(m => m.t === t && m.cab === o.cab)) m.k = k;
  }
}
const v = Object.fromEntries(Object.entries(enlaces).map(([id, e]) => [id, e.v]));
{ const u = F.unidades(F.cargarEsquemas()[17], 18).find(u => u.pid === '18-95-4'); v['18-353'] = u.marks.length ? '95-4-0' : '95-4'; }
for (const [id, e] of Object.entries(enlaces)) console.log(id, e.v, '|', e.txt);
console.log('18-353', v['18-353']);
console.log('desplazamientos [tema, ficha, desde, cuántos]', JSON.stringify(mueve.map(m => [m.t, m.k, m.desde, m.n])));
// las entradas de fichas con párrafos intercalados se desplazan; después se añaden las nuevas
const desplaza = (t, kj) => { const p = kj.split('-'); for (const m of mueve) if (m.t === t && +p[0] === m.k && p[1] !== undefined && p[1] !== 'x' && +p[1] >= m.desde) { p[1] = String(+p[1] + m.n); break; } return p.join('-'); };
let movidas = 0;
const pon = txt => {
  txt = txt.replace(/"(\d+-[^"]+)":"(\d+)-([0-9x-]+)"/g, (all, qid, t, kj) => { const n = desplaza(+t, kj); if (n !== kj) movidas++; return `"${qid}":"${t}-${n}"`; });
  return txt.replace('window.MAPA_PREG={', () => 'window.MAPA_PREG={' + Object.entries(v).filter(([id]) => !txt.includes('"' + id + '":"')).map(([id, kj]) => `"${id}":"${id.split('-')[0]}-${kj}",`).join(''));
};
const MP = 'esquemas-datos/mapa-preguntas.js';
fs.writeFileSync(MP, pon(fs.readFileSync(MP, 'utf8'))); console.log('entradas desplazadas (copia)', movidas); movidas = 0;
const head = cp.execSync('git show HEAD:' + MP, { maxBuffer: 1e8 }).toString();
fs.writeFileSync(__dirname + '/mapa-head-nuevo.js', pon(head)); console.log('entradas desplazadas (HEAD)', movidas);
for (const t of [2, 5, 11, 18]) {
  const f = P + `tema${t}/mapa-fijo-t${t}.json`; const m = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
  for (const id in m) m[id] = desplaza(t, m[id]);
  for (const id in v) if (id.startsWith(t + '-')) m[id] = v[id];
  fs.writeFileSync(f, JSON.stringify(m, null, 1));
}
