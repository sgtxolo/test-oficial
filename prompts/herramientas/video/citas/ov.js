// ajustes sobre parr.json -> parr2.json
const fs = require('fs'); const P = require('./parr.json');
const D = 'C:/Users/ruben/Desktop/HTML OFICIAL/prompts/temario-limpio/';
const leer = f => fs.readFileSync(D + f, 'utf8').split(/\r?\n/);
const une = ls => ls.join(' ').replace(/([a-záéíóúñ])- (?=[a-záéíóúñ])/g, '$1').replace(/\s+/g, ' ').trim();
const get = id => P.find(o => o.id === id);
const E = leer('tema5/escaneado-paginas.txt');
const trozo = (L, desde, hasta, ini) => { const i = L.findIndex((l, k) => k >= ini && desde.test(l)); const j = L.findIndex((l, k) => k > i && hasta.test(l)); if (i < 0 || j < 0) throw new Error('trozo ' + desde); return L.slice(i, j); };
const parte = (ls, re) => { const out = []; for (const l of ls) { if (!out.length || re.test(l)) out.push([l]); else out[out.length - 1].push(l); } return out.map(une); };
const A1 = trozo(E, /^Artículo 1\. Objeto/, /^3\. El presente Reglamento/, 12600);
get('5-454').cita = parte(A1.slice(1), /^2\. /).slice(0, 1);
get('5-427').cita = parte(A1.slice(A1.findIndex(l => /^2\. /.test(l))).filter(l => l.trim().length > 3), /^[a-c]\) |^\^J/).map(x => x.replace(/^\^J \. /, ''));
get('5-451').cita = ['4. En la aplicación del presente Reglamento, los Estados miembros actuarán dentro del pleno respeto del Derecho de la Unión, en particular la Carta de los Derechos Fundamentales de la Unión Europea. De conformidad con los principios generales del Derecho de la Unión, las decisiones en materia de solicitudes al amparo del presente Reglamento se adoptarán de manera individualizada.'];
for (const id of ['5-435', '5-443']) get(id).cita = ['1. El examen de una solicitud y la decisión al respecto corresponderá al consulado del Estado miembro competente en cuyo ámbito territorial resida legalmente el solicitante.'];
get('5-450').cita = ['Lista no exhaustiva de documentos justificativos. Los documentos justificativos mencionados en el artículo 14 que deberán presentar los solicitantes de visado podrán incluir los siguientes:', 'A. DOCUMENTACIÓN RELACIONADA CON EL PROPÓSITO DEL VIAJE', '1) Para los viajes de negocios:', 'a) una invitación de una empresa o de una autoridad para asistir a reuniones, conferencias o acontecimientos relacionados con el comercio, la industria o el trabajo;', 'b) otros documentos que prueben la existencia de relaciones comerciales o relaciones laborales;', 'c) entradas para ferias y congresos, en su caso;', 'd) documentos que demuestren las actividades económicas de la empresa;', 'e) documentos que demuestren que el estatus profesional del solicitante en la empresa.'];
const EU = leer('tema5/eur.txt'); get('5-500').cita = [EU[1678].trim() && EU.slice(1675, 1685).find(l => /^Los datos transmitidos/.test(l.trim())).trim()];
const R = leer('tema11/5-rd.txt');
const bis = trozo(R, /^\s*Artículo 3 bis/, /^\s*Artículo 4\./, 0).slice(1).filter(l => l.trim());
get('11-254').cita = bis.map(x => x.trim()); get('11-257').cita = get('11-254').cita;
const C = leer('tema18/oficial.txt'); const i34 = C.findIndex(l => /^\s{0,3}Artículo 34\./.test(l)); const j34 = C.findIndex((l, k) => k > i34 && /^\s{0,3}Artículo 35\./.test(l));
const a34 = parte(C.slice(i34 + 1, j34).filter(l => l.trim() && !/^=====|BOE-|^\s*\d+\s*$|^\s*(CAPÍTULO|Sección|De las)/.test(l)), /^ {3,}\S/);
get('18-320').cita = a34; get('18-361').cita = a34;
// listas de definiciones: la frase que las introduce y la definición preguntada, entera
for (const id of ['5-376', '5-392', '5-398', '5-417', '5-483', '5-509']) {
  const o = get(id); const todo = o.cita; const n = o.loc.split('.').pop();
  const re = /^[a-zñ]+$/.test(n) ? new RegExp('^' + n + '[)] ') : new RegExp('^(?:[0-9]+[.] )?' + n + '[)] ');
  const i = todo.findIndex(p => re.test(p)); if (i < 0) { console.log('sin definición', id, n, todo.slice(0, 3)); continue; }
  const sig = /^[a-zñ]{1,2}\) /.test(todo[i]) && /^[a-z]/.test(n) ? /^[a-zñ]{1,2}\) / : /^\d+\) /;
  let j = i + 1; while (j < todo.length && !sig.test(todo[j]) && !/^\d+\. [A-Z]/.test(todo[j])) j++;
  const intro = todo.slice(0, 3).filter(p => /entender[áa] por:$/.test(p));
  o.cita = intro.concat(todo.slice(i, j));
}
get('2-327').cita = get('2-327').cita.filter(p => !/^LA DELINCUENCIA/.test(p));
{ const o = get('2-286'); o.cita = [o.cita[0].replace(/^1\. Alos/, '1. A los').replace(/ TOMO 1 Las personas físicas[\s\S]*?(?= B\) «No residentes»)/, '').replace(/ Las personas físicas que tengan su residencia habitual en territorio extranjero, salvo lo dispuesto en el párrafo b\) correspondiente al epígrafe de «Residentes»\. NO RESIDENTES[\s\S]*$/, '')]; }
fs.writeFileSync(__dirname + '/parr2.json', JSON.stringify(P));
{ const intro = 'A efectos del presente Reglamento, se entenderá por:';
  const L = leer('tema5/sis.txt'); const i = L.findIndex(l => /^2\) «información complementaria»/.test(l.trim())); const j = L.findIndex((l, k) => k > i && /^3\) «datos adicionales»/.test(l.trim()));
  if (i >= 0 && j > i) get('5-392').cita = L.slice(i, j).map(x => x.trim()).filter(x => x && !/Diario Oficial|^L 312|^ES$|^\d{1,2}\.\d{1,2}\.2018$|^\(\d\)/.test(x)); else console.log('392', i, j);
  for (const id of ['5-376', '5-392', '5-398', '5-417']) get(id).cita = [intro].concat(get(id).cita.filter(p => p !== intro)); }
fs.writeFileSync(__dirname + '/parr2.json', JSON.stringify(P));
get('5-392').cita = ['A efectos del presente Reglamento, se entenderá por:', '2) «información complementaria»: información que no forma parte de los datos de una descripción almacenada en el SIS, pero que está relacionada con descripciones del SIS y se intercambiará a través de las oficinas Sirene:', 'a) a fin de que los Estados miembros puedan consultarse o informarse entre sí al introducir una descripción;', 'b) tras la obtención de una respuesta positiva, a fin de poder adoptar la medida adecuada;', 'c) cuando no pueda ejecutarse la medida requerida;', 'd) al tratar de la calidad de los datos del SIS;', 'e) al tratar de la compatibilidad y prioridad de las descripciones;', 'f) al tratar del ejercicio del derecho de acceso;'];
for (const o of P) o.cita = o.cita.filter(p => !/^(L \d+\/\d+|ES|\d{1,2}\.\d{1,2}\.20\d\d|\(\d\) (Reglamento|Directiva)[\s\S]*DO L[\s\S]*)$/.test(p.trim()));
fs.writeFileSync(__dirname + '/parr2.json', JSON.stringify(P));
