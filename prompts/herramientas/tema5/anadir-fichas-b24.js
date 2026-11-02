// Añade al esquema (T5.vis) las fichas de los arts. 7 bis, 7 ter, 7 quater y 7 quinquies del VIS, tal como están en el resumen del usuario
// (págs. 18-19), con las respuestas de las preguntas 5-ia-2151…2162 en rojo (m-resp). Idempotente.
require('../esq-virtual.js');
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
let h = fs.readFileSync(F, 'utf8');
if (h.includes('Artículo 7 quinquies — Proceso de solicitud')) { console.log('ya estaban'); process.exit(0); }
const R = t => `<mark class="m-resp">${t}</mark>`;
const P = (ap, t) => `<p>${ap ? `<b>${ap}</b> ` : ''}${t}</p>`;
const FICHAS = [
  ['Artículo 7 bis — Información disponible en la PSV de la UE', ['La Comisión y los Estados miembros serán responsables de facilitar la información', 'eu-LISA'],
    P('1', 'La PSV de la UE ofrecerá información general al público. La ' + R('Comisión y los Estados miembros serán responsables de facilitar la información') + ' de conformidad con sus respectivas responsabilidades.')
    + P('2', 'La PSV de la UE mostrará las condiciones de entrada establecidas en el artículo 6 del Reglamento (UE) 2016/399.')
    + P('3', R('eu-LISA') + ' será responsable de publicar y actualizar la siguiente información pública de carácter general en la PSV de la UE, una vez recibida la información de la Comisión o de los Estados miembros (…)')],
  ['Artículo 7 ter — Formulario de solicitud', ['dé su consentimiento libre y explícito a dicho almacenamiento', 'en varias etapas', 'caracteres latinos'],
    P('1', 'Todo solicitante presentará la solicitud mediante la PSV de la UE.')
    + P('2', 'La PSV de la UE facilitará al solicitante la información.')
    + P('4', 'La PSV de la UE también contendrá un servicio de cuenta segura. El servicio de cuenta segura ofrecerá la posibilidad de que el solicitante conserve los datos facilitados para solicitudes posteriores, siempre y cuando el solicitante ' + R('dé su consentimiento libre y explícito a dicho almacenamiento') + '. El servicio de cuenta segura permitirá al solicitante presentar su solicitud ' + R('en varias etapas') + '.')
    + P('5', 'Los caracteres alfabéticos de los datos facilitados por el solicitante serán ' + R('caracteres latinos') + '.')],
  ['Artículo 7 quater — Disposiciones específicas sobre la utilización de la PSV de la UE', ['en persona en el consulado o en las instalaciones del proveedor de servicios externo, a su elección'],
    P('1', 'Un nacional de un tercer país que sea miembro de la familia de un ciudadano de la Unión o de un nacional de un tercer país que disfrute de un derecho de libre circulación equivalente al de los ciudadanos de la Unión en virtud de un acuerdo entre la Unión y sus Estados miembros, por una parte, y un tercer país, por otra, podrá presentar una solicitud de visado sin utilizar la PSV de la UE y tendrá derecho a presentarla ' + R('en persona en el consulado o en las instalaciones del proveedor de servicios externo, a su elección') + '.')],
  ['Artículo 7 quinquies — Proceso de solicitud a través de la PSV de la UE', ['los documentos justificativos y la prueba de un seguro médico de viaje en el formato digital', '59 meses', 'no es necesario realizar ninguna visita al consulado', 'autenticidad, exhaustividad, exactitud y fiabilidad', 'enviará una notificación al consulado o a las autoridades centrales', 'datos de contacto vinculados al servicio de cuenta segura'],
    P('2', 'Los solicitantes podrán utilizar la PSV de la UE para presentar una copia electrónica del documento de viaje en formato digital, así como ' + R('los documentos justificativos y la prueba de un seguro médico de viaje en el formato digital') + ', cuando así se requiera.')
    + P('4', 'La PSV de la UE podrá realizar un control de la copia únicamente de lectura de la base de datos del VIS para comprobar si los identificadores biométricos del solicitante se recabaron en los últimos ' + R('59 meses') + ' y si este ya ha realizado otras solicitudes con el mismo documento de viaje. Cuando así sea, la PSV de la UE notificará al solicitante que ' + R('no es necesario realizar ninguna visita al consulado') + ' ni al centro del proveedor de servicios externo para presentar la solicitud.')
    + P('6', 'El solicitante presentará la solicitud, que incluirá una declaración de la ' + R('autenticidad, exhaustividad, exactitud y fiabilidad') + ' de los datos.')
    + P('8', 'Cuando la solicitud sea admisible, de conformidad con el control previo automatizado de la admisibilidad, la PSV de la UE ' + R('enviará una notificación al consulado o a las autoridades centrales') + ' del Estado miembro de que se trate con el resultado conjunto de los controles previos automatizados de la competencia y de la admisibilidad.')
    + P('10', 'Cuando el consulado competente o las autoridades centrales del Estado miembro competente acepten la solicitud presentada a través de la PSV de la UE, se transferirán los datos desde el almacenamiento temporal al sistema nacional. A su vez, los datos se eliminarán inmediatamente del almacenamiento temporal, con la excepción de los ' + R('datos de contacto vinculados al servicio de cuenta segura') + '.')],
];
const lineas = FICHAS.map(([cab, rs, html]) => `  + articuloResp(${JSON.stringify(cab)}, ${JSON.stringify(rs)}, ${JSON.stringify(html)}, false)`).join('\n') + '\n';
const m = /\n  \+ articuloResp\("Artículo 8 — Introducción de datos al recibirse la solicitud"/.exec(h);
if (!m) throw new Error('no encuentro el art. 8 del VIS');
h = h.slice(0, m.index + 1) + lineas + h.slice(m.index + 1);
fs.writeFileSync(F, h); console.log('fichas añadidas', FICHAS.length);
