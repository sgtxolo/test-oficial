// Cuadros del Tema 23 (Seguridad Privada · Ley 5/2014) REDIBUJADOS en su sitio con la forma de tu temario (cajas, flechas, columnas, tablas de plazos).
// Los 28 cuadros ya están transcritos en el Exprés (expres/t23.js, <div class="vis">, texto literal de la ley); aquí se rehacen con su forma (esq / caja / flecha / columnas / tabla).
// Fosforito = el de mi método (tu PDF trae estos cuadros IMPRESOS, sin fosforito). Págs. del PDF «TEMA 23 SEGURIDAD PRIVADA-2026-08-08.pdf»: 13-75 (ver cada título).
// Se usa con repaso-hibrido.js (PROP.vis redibuja cada cuadro donde está en el Exprés). Convierte la estructura del cuadro (cols / flujo / árbol / plazos / tabla) a la forma de tu temario.
const { colorea, esq, fl, bif, caja, tabla2 } = require('./repaso-cuadros-lib.js');
const fs = require('fs'), path = require('path');
const txt = h => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const lis = h => [...h.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => m[1]);
// Cuadros que se dejan fuera del esquema clave por espacio (solo se redibujan los de KEYS)
const KEYS = ['REQUISITOS GENERALES PARA LA HABILITACIÓN', 'HABILITACIÓN PROFESIONAL', 'ESPECIAL OBLIGACIÓN DE COLABORACIÓN', 'COORDINACIÓN Y PARTICIPACIÓN', 'COMPETENCIAS DE LA ADMINISTRACIÓN GENERAL DEL ESTADO', 'REGISTRO NACIONAL DE SEGURIDAD PRIVADA', 'SERVICIOS Y FUNCIONES FUERA DE LA LEY', 'ÁMBITO DE APLICACIÓN', 'GUARDAS RURALES Y SUS ESPECIALIDADES', 'SERVICIOS DE RESPUESTA ANTE ALARMAS', 'TIPOS DE MEDIDAS DE SEGURIDAD', 'MEDIDAS PROVISIONALES ANTERIORES', 'PRESCRIPCIÓN DE LAS INFRACCIONES', 'INFRACCIONES DEL PERSONAL', 'INFRACCIONES DE LOS USUARIOS', 'INFRACCIONES DE LAS EMPRESAS', 'SANCIONES A LAS EMPRESAS', 'SANCIONES AL PERSONAL', 'SANCIONES A USUARIOS', 'COMPETENCIA SANCIONADORA', 'PRESCRIPCIÓN DE LAS SANCIONES', 'EJECUTORIEDAD', 'PUBLICIDAD DE LAS SANCIONES', 'REPRESENTANTES LEGALES', 'DESPACHOS DE DETECTIVES PRIVADOS', 'ACTUACIONES DE CONTROL', 'FORMACIÓN REQUERIDA', 'PRINCIPIOS BÁSICOS DE ACTUACIÓN'];
const MAXLI = +(process.env.INFR_MAX || 99);
// por espacio (≤ 12 págs) quedan fuera del esquema clave los cuadros de infracciones de las empresas y de los usuarios/centros (siguen en el Exprés y en el Exprés subrayado)
const DROP = (process.env.DROP !== undefined ? process.env.DROP : 'INFRACCIONES DE LAS EMPRESAS|INFRACCIONES DE LOS USUARIOS').split('|').filter(Boolean);
function vis(html) {
  const m = html.match(/<div class="vis-t"><i>[^<]*<\/i>([\s\S]*?)<\/div>/); if (!m) return html;
  const tit0 = txt(m[1]); const tit = tit0.replace(/\s*\((?:cuadro|cuadros) del temario[\s\S]*$/, '').trim();
  const sub = (tit0.match(/\(cuadro del temario · ([^)]*)\)/) || [])[1] || '';
  const key = KEYS.find(x => tit.toUpperCase().includes(x.toUpperCase())); if (!key || DROP.includes(key)) return '';
  let body = '';
  if (/class="vis-comp/.test(html)) {
    const cols = [...html.matchAll(/<div class="vis-col"><h5>([\s\S]*?)<\/h5><ul>([\s\S]*?)<\/ul><\/div>/g)].map(c => caja('<b>' + c[1] + '</b>' + lis(c[2]).slice(0, MAXLI).map(x => '<div style="margin:3px 0 0">▪ ' + x + '</div>').join(''), ''));
    body = bif(...cols);
  } else if (/class="vis-flujo/.test(html)) {
    const pasos = [...html.matchAll(/<div class="vis-paso[^"]*">(?:<span class="et">([\s\S]*?)<\/span>)?([\s\S]*?)<\/div>(?=<div class="vis-flecha">|<\/div><\/div>$|<\/div>$)/g)].map(p => caja((p[1] ? '<b>' + p[1] + '</b><br>' : '') + p[2], 'cen'));
    body = pasos.length ? pasos.join(fl) : '';
  } else if (/class="vis-arbol/.test(html)) {
    const raiz = (html.match(/<div class="vis-raiz">([\s\S]*?)<\/div>/) || [])[1] || '';
    const ramas = [...html.matchAll(/<div class="vis-rama">([\s\S]*?)(?=<div class="vis-rama">|<\/div><\/div><\/div>$)/g)].map(r => r[1].replace(/<\/div>$/, ''));
    body = caja(raiz, 'cen') + fl + bif(...ramas.map(r => caja(r, 'cen')));
  } else if (/class="vis-plazos/.test(html)) {
    body = tabla2('Plazo', 'Supuesto', [...html.matchAll(/<div class="vis-plazo"><span class="n">([\s\S]*?)<\/span>([\s\S]*?)<\/div>/g)].map(p => ['<b>' + p[1] + '</b>', p[2]]));
  } else if (/class="vis-tabla/.test(html)) {
    body = tabla2('Requisito', 'Texto de la ley', [...html.matchAll(/<span class="vt-p[^"]*">([\s\S]*?)<\/span><div class="vt-t">([\s\S]*?)<\/div>/g)].map(p => ['<b>' + p[1] + '</b>', p[2]]));
  } else return '';
  if (!body) return '';
  return colorea(esq(tit, sub, body));
}
// R1…R14 del RECUERDA del temario (págs. 77-79), en pregunta → respuesta (el Exprés no lleva ficha RECUERDA: las R van como pines en su artículo)
const RR = [
  [1, 'El régimen sancionador y las medidas provisionales, así como el ejercicio de las facultades de inspección, serán también aplicables a aquellas empresas y personal que presten servicios o ejerzan funciones de seguridad privada:', 'sin estar autorizadas o haber presentado declaración responsable, o sin estar habilitados o acreditados para el ejercicio legal de los mismos.'],
  [2, 'Queda fuera del ámbito de aplicación de la ley:', 'la obtención por uno mismo de información o datos, así como la contratación de servicios de recepción, recopilación, análisis, comunicación o suministro de información libre obrante en fuentes o registros de acceso público.'],
  [3, 'No podrá prestarse ningún tipo de servicio de seguridad privada:', 'que no haya sido previamente contratado y, en su caso, autorizado.'],
  [4, 'La especial obligación de colaboración de las empresas de seguridad, los despachos de detectives y el personal de seguridad privada con las Fuerzas y Cuerpos de Seguridad se desarrollará:', 'con sujeción al principio de legalidad y se basará exclusivamente en la necesidad de asegurar el buen fin de las actuaciones tendentes a preservar la seguridad pública, garantizándose la debida reserva y confidencialidad cuando sea necesario.'],
  [5, 'En el ámbito de las competencias de la Administración General del Estado se constituirán comisiones mixtas de seguridad privada, nacionales, autonómicas o provinciales, con el carácter de:', 'órganos consultivos y de colaboración entre las administraciones públicas y los representantes del sector.'],
  [6, 'Para la prestación de servicios de seguridad privada, las empresas de seguridad privada deberán obtener:', 'autorización administrativa y serán inscritas de oficio en el registro correspondiente, de acuerdo con el procedimiento que se determine reglamentariamente.'],
  [7, 'Toda empresa de seguridad privada autorizada o que, en su caso, haya presentado la correspondiente declaración responsable será inscrita:', 'de oficio en el Registro Nacional de Seguridad Privada o en el correspondiente registro autonómico.'],
  [8, 'La habilitación de todo el personal de seguridad privada corresponderá a:', 'la Dirección General de la Policía, excepto la de los guardas rurales y sus especialidades que corresponderá a la Dirección General de la Guardia Civil.'],
  [9, 'El Ministerio del Interior elaborará los programas de formación previa y especializada correspondiente al personal de seguridad privada, en cuyo contenido se incluirán materias específicas de respeto a:', 'la diversidad y la igualdad de trato y no discriminación.'],
  [10, 'Los medios utilizados por las empresas de seguridad en la prestación de los servicios de seguridad privada deberán estar homologados por:', 'el Ministerio del Interior.'],
  [11, 'La monitorización, grabación, tratamiento y registro de imágenes y sonidos por parte de los sistemas de videovigilancia estará sometida a lo previsto en la normativa en materia de protección de datos de carácter personal, especialmente a los principios de:', 'proporcionalidad, idoneidad e intervención mínima.'],
  [12, 'Las actuaciones de inspección se atendrán a los principios de:', 'injerencia mínima y proporcionalidad.'],
  [13, 'Cuando la sanción sea de naturaleza pecuniaria y no se haya previsto plazo para satisfacerla, la autoridad que la impuso lo señalará, sin que pueda ser inferior a quince ni superior a:', 'treinta días hábiles, pudiendo acordarse el fraccionamiento del pago.'],
  [14, 'La cuantía de las multas coercitivas no excederá de:', '6.000 euros, pero podrá aumentarse sucesivamente en el 50 por 100 de la cantidad anterior en casos de reiteración del incumplimiento.'],
];
const rExtra = RR.map(([n, p, r]) => '<p><span class="b r">R' + n + '</span> <b>R' + n + '</b> · <i>Ley 5/2014.</i> ' + p + ' <b>→</b> <mark>' + r + '</mark></p>');
module.exports = { rExtra, soloPropios: true, vis, KEYS, RR };
