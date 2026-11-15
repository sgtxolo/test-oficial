// Cuadros del Tema 22 (Seguridad Ciudadana: LO 9/1983, LO 7/2021, LO 4/2015) REDIBUJADOS en su sitio con la forma de tu temario (cajas, flechas, columnas, tablas de plazos).
// Los 14 cuadros ya están transcritos en el Exprés (expres/t22.js, <div class="vis">, texto literal); aquí solo se rehacen con su forma. Fosforito = el de mi método
// (tu PDF trae estos cuadros IMPRESOS, sin fosforito). Págs. del PDF «TEMA 22 SEGURIDAD CIUDADANA-2026-08-08.pdf»: 14 (art. 7), 16 (arts. 17 y 18), 29 (art. 15),
// 31 (art. 25), 33 (art. 31), 34 (art. 32), 35 (art. 33), 40-41 (cuadro de infracciones), 42-43 (arts. 38 y 39), 44 (art. 40), 45 (art. 42), 46 (art. 43).
// Se usa con repaso-hibrido.js (PROP.vis redibuja cada cuadro donde está en el Exprés).
const { colorea, y, d, a, p, c, k, esq, fl, bif, caja, lista, tabla2, lineaTiempo, g2, man } = require('./repaso-cuadros-lib.js');
const fs = require('fs'), path = require('path');
const OF = fs.readFileSync(path.join(__dirname, '..', 'temario-limpio', 'tema22', 'oficial.txt'), 'utf8').replace(/\r/g, '');
const items = (cab, fin) => {   // «N. texto» de un artículo del oficial limpio (sin notas del TC)
  const A = OF.indexOf(cab), B = OF.indexOf(fin, A); const out = []; let cur = null, nota = false;
  for (const raw of OF.slice(A, B).split('\n')) { const l = raw.trim(); const sg = raw.length - raw.replace(/^\s+/, '').length;
    if (!l || /^=====PAG/.test(raw) || /^Artículo /.test(l)) continue;
    if (sg >= 8 && /^(Téngase en cuenta|Asimismo, se declara)/.test(l)) { nota = true; continue; }
    if (sg >= 5 && sg < 8) { nota = false; const m = l.match(/^(\d+)\.\s+(.*)$/); if (m) { cur = { n: +m[1], t: m[2] }; out.push(cur); } else cur = null; continue; }
    if (nota || sg >= 3) continue;
    if (cur) cur.t += (/-$/.test(cur.t) ? '' : ' ') + l; }
  return out;
};
const li = (arr) => arr.map(x => `<div style="margin:0 0 4px">${x}</div>`).join('');
const pie = t => `<div style="font-size:.86em;opacity:.85;margin-top:6px">✎ ${t}</div>`;
const mini = (tit, its) => `<div class="caja" style="font-size:.78em;line-height:1.3"><div style="font-weight:800;text-align:center;margin:0 0 4px">${tit}</div>${its.map(x => `<div style="margin:0 0 3px"><b>${x.n}.</b> ${x.t}</div>`).join('')}</div>`;
const B = {};   // título del cuadro (sin etiqueta del temario) → HTML rehecho
B['DEBER DE COLABORACIÓN'] = () => esq('DEBER DE COLABORACIÓN', 'art. 7 · LO 7/2021 · pág. 14',
  g2(caja(d('Administraciones públicas'), 'cen'), caja(d('Cualquier persona física o jurídica'), 'cen')) + fl
  + caja(y('PROPORCIONARÁN') + ' los datos, informes, antecedentes y justificantes que les soliciten y que sean necesarios para la investigación y enjuiciamiento de infracciones penales o para la ejecución de las penas', 'cen') + fl
  + bif(caja(a('Autoridad judicial'), 'cen'), caja(a('Policía Judicial'), 'cen'), caja(a('Ministerio Fiscal'), 'cen'))
  + caja('<b>Policía Judicial</b>: la petición se ajustará ' + k('exclusivamente') + ' al ejercicio de sus funciones y se hará siempre de forma ' + y('motivada') + ', ' + y('concreta') + ' y ' + y('específica') + ', ' + d('dando cuenta en todo caso') + ' a la ' + a('autoridad judicial') + ' y ' + a('fiscal')));
B['DISPOSITIVOS MÓVILES'] = () => esq('DISPOSITIVOS MÓVILES · toma de imágenes y sonido de carácter móvil', 'art. 17 · LO 7/2021 · pág. 16',
  caja(k('Ha de ser conjunta') + ' (imagen y sonido)', 'cen') + caja('Supeditada, ' + k('en todo caso') + ', a la concurrencia de ' + d('peligro o evento concreto'), 'cen')
  + caja('Autorizado por la persona titular de la ' + a('Delegación o Subdelegación del Gobierno'), 'cen') + caja('Principios de tratamiento y ' + d('proporcionalidad'), 'cen')
  + caja('Las autorizaciones ' + k('no') + ' se podrán conceder en ningún caso con carácter ' + d('indefinido o permanente') + ' (máximo ' + p('un mes prorrogable por otro') + ')', 'cen')
  + bif(caja(d('En caso de urgencia o necesidad inaplazable'), 'cen'), caja('Será competente el ' + a('responsable operativo') + ' de las Fuerzas y Cuerpos de Seguridad competentes<br>' + fl + 'Comunicación con la ' + y('mayor brevedad posible') + ', y siempre en ' + p('24 horas') + ', al ' + a('Delegado o Subdelegado del Gobierno') + ' o autoridad competente de las CC.AA.')));
B['TRATAMIENTO Y CONSERVACIÓN DE LAS IMÁGENES'] = () => esq('TRATAMIENTO Y CONSERVACIÓN DE LAS IMÁGENES', 'art. 18 · LO 7/2021 · pág. 16',
  bif(caja(d('Realizada la filmación, si la grabación captara hechos constitutivos de') + ' <b>infracciones penales</b>: las Fuerzas y Cuerpos de Seguridad pondrán la cinta o soporte original, en su integridad, a ' + a('disposición judicial'))
    + '', caja(y('A la mayor brevedad posible') + '<br>' + fl + 'En el plazo máximo de ' + p('72 horas') + ' desde su grabación<br>' + fl + 'De no poder redactarse el atestado en tal plazo, se relatarán ' + d('verbalmente') + ' los hechos a la autoridad judicial o al Ministerio Fiscal, junto con la entrega de la grabación'))
  + bif(caja(d('Si se captaran hechos constitutivos de') + ' <b>infracciones administrativas</b> (seguridad pública)'), caja('Remisión al ' + a('órgano competente') + '<br>' + fl + p('De inmediato')))
  + bif(caja('<b>Destrucción de grabaciones</b>'), caja('En el plazo máximo de ' + p('3 MESES') + ' desde su captación<br>' + k('Salvo') + ' que estén relacionadas con infracciones penales o administrativas graves o muy graves en materia de seguridad pública, sujetas a una investigación policial en curso o con un procedimiento judicial o administrativo abierto')));
B['ENTRADA Y REGISTRO'] = () => esq('LOS AGENTES DE LAS FFCCSE PODRÁN PROCEDER A', 'art. 15 · LO 4/2015 · pág. 29',
  bif(caja('<b>ENTRADA Y REGISTRO EN DOMICILIO</b><br>Solo podrán proceder en los casos permitidos por:<br>' + caja(k('CONSTITUCIÓN'), 'cen') + '<b>+</b>' + caja(k('LEYES'), 'cen'), 'cen'),
    caja('<b>ENTRADA EN DOMICILIO</b><br>Será ' + d('causa legítima') + ' la necesidad de ' + y('EVITAR') + ' daños inminentes y graves a las personas y a las cosas en supuestos de:' + lista([d('Catástrofe'), d('Calamidad'), d('Ruina inminente') + ', u', 'Otros semejantes de extrema y urgente necesidad']) + 'Cuando entren en un domicilio particular, ' + d('remitirán sin dilación') + ':<br>' + fl + y('Acta o atestado') + ' que instruyan a la ' + a('autoridad judicial competente'), 'cen'),
    caja('<b>ENTRADA EN EDIFICIOS</b> ocupados por:' + lista(['Organismos oficiales, o', 'Entidades públicas']) + k('No') + ' será preciso el ' + d('consentimiento') + ' de la autoridad o funcionario que los tuviere a su cargo', 'cen')));
B['ACTIVIDADES RELEVANTES PARA LA SEGURIDAD CIUDADANA'] = () => esq('ACTIVIDADES RELEVANTES PARA LA SEGURIDAD CIUDADANA', 'art. 25 · LO 4/2015 · pág. 31',
  caja('Las personas físicas o jurídicas que ejerzan ' + d('ACTIVIDADES RELEVANTES PARA LA SEGURIDAD CIUDADANA') + ', como las de:') + g2(
    lista([d('Hospedaje'), d('Transporte de personas') + ' ✱', 'Acceso comercial a servicios telefónicos o telemáticos de uso público mediante establecimientos abiertos al público', 'Comercio o reparación de objetos usados', 'Alquiler o desguace de vehículos de motor']),
    lista([d('Compraventa de joyas y metales') + ', ya sean preciosos o no, objetos u obras de arte', d('Cerrajería de seguridad') + ' ✱', 'Centros gestores de residuos metálicos', 'Establecimientos de comercio al por mayor de chatarra o productos de desecho', 'Venta de productos químicos peligrosos a particulares'])) + fl
  + caja('Quedarán sujetas a las obligaciones de ' + y('registro documental e información') + ' en los términos que establezcan las disposiciones aplicables', 'cen'));
B['ACCIÓN U OMISIÓN TENIDA EN CUENTA COMO CRITERIO'] = () => esq('CUANDO UNA ACCIÓN U OMISIÓN DEBA TOMARSE EN CONSIDERACIÓN COMO', 'art. 31.3 · LO 4/2015 · pág. 33 · R14',
  bif(caja(d('Criterio de graduación') + ' de la sanción', 'cen'), caja('Circunstancia que determine la ' + d('calificación de la infracción'), 'cen')) + fl + caja(k('No podrá ser sancionada como infracción independiente'), 'cen'));
B['ÓRGANOS COMPETENTES'] = () => esq('ÓRGANOS COMPETENTES · Administración General del Estado', 'art. 32 · LO 4/2015 · pág. 34',
  tabla2('ÓRGANO', 'SANCIONA', [[a('MINISTRO DEL INTERIOR'), 'Infracciones ' + p('muy graves en grado máximo')], [a('SECRETARIO DE ESTADO DE SEGURIDAD'), 'Infracciones ' + p('muy graves en grado medio y en grado mínimo')], [a('DELEGADOS DEL GOBIERNO') + ' en las comunidades autónomas y en las Ciudades de Ceuta y Melilla', 'Infracciones ' + p('graves y leves')]]));
B['INFRACCIONES MUY GRAVES Y GRAVES · GRADOS DE LA MULTA'] = () => esq('INFRACCIONES MUY GRAVES Y GRAVES · GRADOS DE MULTA', 'art. 33 · LO 4/2015 · pág. 35',
  lineaTiempo([{ t: '<b>MÍNIMO</b><br>La comisión de una infracción determinará la multa en ' + p('grado mínimo') }, { t: 'al menos<br>una circunstancia', c: 'fl2' }, { t: '<b>MEDIO</b><br>' + d('Reincidencia') + ' (dos años, más de una infracción de la misma naturaleza, resolución firme) · ' + d('violencia, amenaza o intimidación') + ' · ' + d('prenda u objeto que cubra el rostro') + ' · ' + d('utilización de menores') + ', personas con discapacidad o vulnerables' }, { t: 'sólo cuando…', c: 'fl2' }, { t: '<b>MÁXIMO</b><br>Hechos de ' + k('especial gravedad') + ' y así se justifique teniendo en cuenta el número y la entidad de las circunstancias concurrentes y los criterios' }]) + pie('A boli en tu temario: «2 años + 1 inf.».'));
B['CUADRO DE INFRACCIONES'] = () => {
  const mg = items('Artículo 35. Infracciones muy graves.', 'Artículo 36.'), gr = items('Artículo 36. Infracciones graves.', 'Artículo 37.'), le = items('Artículo 37. Infracciones leves.', 'Artículo 38.');
  return '<!--largo-->' + esq('CUADRO DE INFRACCIONES', 'arts. 35 a 37 · LO 4/2015 · págs. 40-41',
    `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;align-items:start">${mini(d('LEVES (art. 37)'), le)}${mini(d('GRAVES (art. 36)'), gr)}${mini(d('MUY GRAVES (art. 35)'), mg)}</div>`);
};
B['PRESCRIPCIÓN DE LAS INFRACCIONES'] = () => esq('PRESCRIPCIÓN INFRACCIONES', 'art. 38 · LO 4/2015 · pág. 42 · R16', tabla2('LEVES · GRAVES · MUY GRAVES', 'PRESCRIBEN', [['Infracciones ' + d('leves'), p('6 meses')], ['Infracciones ' + d('graves'), p('1 año')], ['Infracciones ' + d('muy graves'), p('2 años')]]));
B['SANCIONES POR INFRACCIONES'] = () => esq('SANCIONES POR INFRACCIONES', 'art. 39 · LO 4/2015 · págs. 42-43 · R17',
  tabla2('MUY GRAVES · 30.001 a 600.000 €', 'GRAVES · 601 a 30.000 € · LEVES · 100 a 600 €', [['<b>Mínimo</b>: ' + p('30.001 a 220.000 €') + '<br><b>Medio</b>: ' + p('220.001 a 410.000 €') + '<br><b>Máximo</b>: ' + p('410.001 a 600.000 €'), '<b>Mínimo</b>: ' + p('601 a 10.400 €') + '<br><b>Medio</b>: ' + p('10.401 a 20.200 €') + '<br><b>Máximo</b>: ' + p('20.201 a 30.000 €') + '<br><b>Leves</b>: ' + p('100 a 600 €')]])
  + pie('A boli en tu temario (art. 39.2): suspensión temporal / clausuras · graves: hasta 6 meses · muy graves: de 6 meses y 1 día a 2 años · en reincidencia: graves hasta 2 años; muy graves de 2 años y 1 día a 6 años.'));
B['PRESCRIPCIÓN DE LAS SANCIONES'] = () => esq('PRESCRIPCIÓN SANCIONES POR INFRACCIONES', 'art. 40 · LO 4/2015 · pág. 44 · R18', tabla2('SANCIONES POR INFRACCIONES', 'PRESCRIBEN', [['<b>MUY GRAVES</b>', p('3 años')], ['<b>GRAVES</b>', p('2 años')], ['<b>LEVES</b>', p('1 año')]]) + caja('Computados desde el ' + k('día siguiente') + ' a aquel en que adquiera firmeza en vía administrativa la resolución por la que se impone la sanción', 'cen'));
B['REPARACIÓN DEL DAÑO E INDEMNIZACIÓN'] = () => esq('REPARACIÓN DEL DAÑO E INDEMNIZACIÓN', 'art. 42 · LO 4/2015 · pág. 45',
  caja('Si las conductas sancionadas hubieran ocasionado ' + d('daños o perjuicios a la administración pública') + ':<br>la resolución del procedimiento contendrá un pronunciamiento expreso acerca de la exigencia al infractor de:', 'cen') + fl
  + bif(caja('<b>1.º REPOSICIÓN</b><br>a su ' + d('estado originario') + ' de la situación alterada por la infracción', 'cen'), caja('<b>2.º INDEMNIZACIÓN</b><br>cuando ello ' + k('no') + ' fuera posible, por los ' + d('daños y perjuicios') + ' ocasionados (si quedan determinados durante el procedimiento). Si el importe no quedó establecido: ' + d('procedimiento complementario') + ', susceptible de terminación convencional, que pone fin a la vía administrativa', 'cen')) + fl
  + caja('La responsabilidad civil derivada de la infracción será siempre ' + p('SOLIDARIA') + ' entre todos los causantes del daño', 'cen')
  + bif(caja('Autor de los hechos <b>menor de 18 años no emancipado</b>', 'cen'), caja('Autor de los hechos con la <b>capacidad modificada judicialmente</b>', 'cen')) + fl
  + caja('Respondiendo solidariamente con él sus ' + a('padres, tutores, curadores, acogedores o guardadores legales o de hecho') + ', según proceda', 'cen'));
B['CANCELACIÓN DE LOS ASIENTOS POR INFRACCIONES'] = () => esq('CANCELACIÓN DE LOS ASIENTOS POR INFRACCIONES (de oficio)', 'art. 43 · LO 4/2015 · pág. 46', tabla2('INFRACCIONES', 'SE CANCELAN A LOS', [['<b>MUY GRAVES</b>', p('3 años')], ['<b>GRAVES</b>', p('2 años')], ['<b>LEVES</b>', p('1 año')]]) + caja('A contar desde la ' + k('firmeza') + ' de la sanción', 'cen'));
const KEYS = Object.keys(B);
// redibuja un cuadro del Exprés: localiza su título (<div class="vis-t"><i>…</i>TÍTULO (cuadro del temario · pág. N · art. X)</div>)
function vis(html) {
  const m = html.match(/<div class="vis-t"><i>[^<]*<\/i>([\s\S]*?)<\/div>/); if (!m) return html;
  const tit = m[1].replace(/<[^>]+>/g, '').replace(/\s*\((?:cuadro|cuadros) del temario[\s\S]*$/, '').trim();
  const key = KEYS.find(x => tit.toUpperCase().startsWith(x.toUpperCase()) || tit.toUpperCase().includes(x.toUpperCase()));
  if (!key) return html;
  return colorea(B[key]());
}
module.exports = { soloPropios: true, vis, KEYS };
if (require.main === module) { global.window = {}; eval(fs.readFileSync(path.join(__dirname, '..', '..', 'expres', 't22.js'), 'utf8')); const H = window.EXPRES_T[22].html; let n = 0, i = 0, pp = 0; while ((i = H.indexOf('<div class="vis">', pp)) >= 0) { n++; const t = H.slice(i, i + 400).match(/vis-t"><i>[^<]*<\/i>([^<]*)/); console.log(n, (t || [, ''])[1].slice(0, 70), '→', vis(H.slice(i, i + 4000)) === H.slice(i, i + 4000) ? 'SIN REDIBUJAR' : 'ok'); pp = i + 20; } }
