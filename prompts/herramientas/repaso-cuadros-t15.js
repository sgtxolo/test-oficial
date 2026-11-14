// Cuadros del Tema 15 (VioGén: LO 1/2004, Resolución 28/06/2005, Instrucciones 4/2019, 1/2025, 5/2021, NTF 1/2019…) para el Esquema clave.
// Los 8 cuadros del temario ya están transcritos (texto literal y marcas) dentro del Exprés (expres/t15.js, <div class="vis">); aquí solo se REDIBUJAN en su sitio con la forma del temario
// (tabla de etiqueta | contenido para los «cuadros de dos columnas» de las págs. 20, 75-77; plazos en cuadrícula; flechas para el Protocolo Cero y los tres efectos) y con el fosforito del Exprés.
// Págs. del PDF «TEMA 15 VIOGEN-2026-08-08.pdf»: 20 (Delegación del Gobierno), 75 (pautas de entrevista), 76-77 (Anexo II), 105 (Protocolo Cero), 112-113 (tres efectos).
// Se usa con repaso-hibrido.js (PROP.vis redibuja cada cuadro donde está en el Exprés).
const { colorea } = require('./repaso-cuadros-lib.js');
const BD = 'border:1px solid rgba(60,70,80,.35)';
const COL = { o: '#f3d5c2', v: '#d3e8d6', c: '#e3dbf0', n: '#dfe9f5' };
const lab = (t, c) => `<div style="background:${COL[c] || '#d3e8e1'};padding:6px 8px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center;${BD};color:#1f2a33"><div>${t}</div></div>`;
const cel = t => `<div style="padding:6px 9px;${BD};line-height:1.5">${t}</div>`;
const esq = (tit, inner) => `<div class="esq"><div class="ban">${tit}</div><div class="cuerpo">${inner}</div></div>`;
const caja = (t, e = '') => `<div class="caja ${e}">${t}</div>`;
const fl = '<div class="fl">▼</div>';
const strip = s => s.replace(/<\/?div[^>]*>/g, '').trim();

// hijos de primer nivel <div class="…">…</div> de un trozo de HTML (cuenta la profundidad de los div)
function kids(s) {
  const out = []; const re = /<div\b([^>]*)>|<\/div>/g; let m, depth = 0, start = -1, cls = '', innerStart = -1;
  while ((m = re.exec(s))) {
    if (m[0] === '</div>') { depth--; if (depth === 0 && start >= 0) { out.push({ cls, inner: s.slice(innerStart, m.index) }); start = -1; } }
    else { if (depth === 0) { start = m.index; innerStart = re.lastIndex; cls = (m[1].match(/class="([^"]*)"/) || [, ''])[1]; } depth++; }
  }
  return out;
}

// Los cuadros de las págs. 75-78 en el Exprés están abreviados; aquí van con el texto LITERAL del temario (revisado el 14/11/2026 contra las imágenes)
const Y = t => `<mark class="y">${t}</mark>`, D = t => `<mark class="d">${t}</mark>`, A = t => `<mark class="a">${t}</mark>`, K = t => `<mark class="k">${t}</mark>`;
const b = (...x) => x.map(t => `• ${t}`).join('<br>');
const PAUTAS = '<!--largo-->' + colorea(esq('Pautas básicas para entrevistarse con las víctimas (Instrucción 1/2025, Anexo I)', `<div style="display:grid;grid-template-columns:150px 1fr">`
  + lab('CONSIDERACIONES INICIALES', 'o') + cel(b(
    `${Y('Enfoque personalizado:')} Dentro de lo posible, la entrevista con la víctima debe realizarse por persona del mismo sexo (Ley 4/2015 del Estatuto de la Víctima del Delito), pudiendo estar acompañada de persona de su elección y ser informada de su derecho a la asistencia jurídica gratuita, con asistencia de un/a letrado/as, incluso antes de la denuncia.<br>La entrevista debe centrarse en la recopilación de información, pero también en ofrecer un espacio seguro donde la víctima se sienta cómoda para expresarse.`,
    `${Y('Espacio adecuado:')} La entrevista debe realizarse en un lugar reservado que permita a la víctima expresarse libremente, respetando su intimidad.`,
    `${Y('Tiempo flexible:')} En la medida de lo posible, ${Y('no debe haber un límite de tiempo')} para la entrevista.`))
  + lab('INICIO', 'o') + cel(b(
    `${Y('Presentación inicial:')} El personal policial debe saludar a la víctima, identificarse y acordar el trato mutuo.`,
    `${Y('Romper el hielo:')} Comenzar temas neutros para generar un clima de confianza, que permita evaluar el estado emocional de la víctima y adaptar la intervención en consecuencia.`,
    `${Y('Dinámica de la entrevista:')} Antes de comenzar, se debe explicar el proceso de la entrevista y la intervención en general, para reducir su incertidumbre.`,
    `${Y('Generar actitud positiva:')} Trasladar a la víctima que su bienestar y protección es lo más importante, para que se sienta segura y no limite la información aportada. Es importante obtener información para valorar todos los factores de riesgo recogidos en los distintos formularios, por lo que se debe rastrear la información relevante a tal fin.`))
  + lab('DURANTE TODA LA ENTREVISTA', 'o') + cel(b(
    `${Y('Comunicación empática:')} Cada víctima es única y puede reaccionar de diferente manera al hablar sobre su experiencia. El personal policial debe ser capaz de adaptar su estilo de comunicación a las necesidades emocionales de la víctima.`,
    `${Y('Atención plena:')} Escuchar sin interrumpir, participar mínimamente al principio. ${K('No')} se deben emitir juicios ni valoraciones.`,
    `${Y('Escucha activa:')} Usar técnicas de escucha activa y empática como mantener una mirada atenta, reconocer sus emociones, y repetir aspectos clave de su relato.`,
    `${Y('Comunicación no verbal:')} atender a las señales no verbales de la víctima, como su lenguaje corporal, tono de voz y expresiones faciales. El personal policial también atenderá a su lenguaje no verbal para no trasladar actitudes contradictorias.`,
    `${Y('Respetar los silencios:')} Si la víctima se queda en silencio, es importante darle tiempo para que continúe su relato sin presionarla.`,
    `${Y('Realizar preguntas abiertas:')} En todo momento se debe promover el relato fluido. Después de escuchar, si hay aspectos que no han sido aclarados, es el momento de hacer preguntas, formulándolas de manera abierta para evitar respuestas de «sí» o «no».`))
  + lab('CIERRE Y DESPEDIDA', 'o') + cel(b(
    `${Y('Resumen de la entrevista:')} Resumir con la víctima lo que ha expresado, para completar la información obtenida y/o aclarar posibles ambigüedades o inconsistencias.`,
    `${Y('Recursos:')} No debe cerrarse la intervención sin dejar claro a la víctima cuáles son los recursos que tiene a su disposición.`,
    `${Y('Despedida:')} Este es un momento crucial que puede influir significativamente en la decisión de denunciar y en su relación con el personal policial en el futuro. Es fundamental reconocer y valorar su esfuerzo durante el proceso. Finalmente, es importante que la víctima sea informada claramente sobre los próximos pasos a seguir en el procedimiento, para ayudar a reducir su nivel de incertidumbre y brindarle una mayor sensación de seguridad.`))
  + '</div>'));
const sub = t => `<div style="margin:5px 0 1px"><b>${t}</b></div>`;
const ANEXO2 = '<!--largo-->' + colorea(esq('Medidas policiales de protección para cada nivel de riesgo (Instrucción 1/2025, Anexo II)',
  `<div style="margin:0 0 6px">Para cada nivel de riesgo, además de las medidas de protección específicas, se aplicarán aquellas previstas para los niveles anteriores que no estén implícitas en las nuevas medidas. Asimismo, aparte de las medidas detalladas en el presente Anexo II, podrá implementarse cualquier otra que, a criterio de la unidad policial, se considere recomendable. En la medida de lo posible, resulta recomendable registrar en el Sistema las medidas policiales de protección a través del Módulo de Actuaciones Policiales.<br>La víctima deberá ser informada sobre su nivel de riesgo, los factores más relevantes que lo determinan y los peligros a los que podría enfrentarse.</div>`
  + `<div style="display:grid;grid-template-columns:110px 1fr">`
  + lab('NIVEL DE RIESGO', 'n') + cel('<b>MEDIDAS DE PROTECCIÓN EN FUNCIÓN DEL NIVEL DE RIESGO</b>')
  + lab('', 'n') + cel(sub('DE GESTIÓN DEL CASO EN VIOGÉN:') + b('La Unidad policial que gestione el Caso se ocupará de que los datos contenidos en el mismo sean correctos y se encuentren debidamente actualizados, especialmente en lo relativo a información de contacto, domicilio y demás datos de interés. Igualmente deberá evitar y en su caso subsanar duplicidades de Casos, así como de IDs de VÍCTIMAS y AUTORES principalmente, al objeto de garantizar una adecuada gestión del riesgo del Caso.', `${Y('La víctima deberá ser informada de su nivel de riesgo,')} de sus factores más importantes, que el riesgo puede variar a lo largo del tiempo, así como de los peligros a los que se puede enfrentar.`))
  + lab('BAJO', 'v') + cel(sub('PARA LA VÍCTIMA:') + b(
    `${Y('Las mismas,')} de tipo orientativo, informativo y asistencial que para cualquier otro ciudadano.`, `Facilitar a la víctima ${Y('números de teléfono de contacto')} permanente (24 horas) con las FFCCS de asignación del Caso.`, `Facilitar números de emergencia ${Y('112, 091, 062, 016, 092.')}`,
    `Facilitar información precisa sobre el servicio de ${Y('teleasistencia móvil.')} Indicar la posible descarga de la aplicación ${Y('AlertCops.')}`, `${Y('Información y, en su caso, derivación de la víctima hacia oficinas')} de atención a víctimas del delito (ámbito Justicia) y servicios sociales.`,
    `Facilitar ${Y('recomendaciones en materia de autoprotección,')} pudiendo servir de orientación aquellas incluidas en el PSP y que se adapten a las circunstancias concretas de la víctima.`, `Establecer ${Y('contactos con la víctima')} que, en función de los medios disponibles, podrán ser personales o telefónicos.`,
    `Estas ${Y('entrevistas')} se utilizarán también para intercambiar y actualizar información sobre el contenido de las resoluciones judiciales que se hayan acordado, a fin de que tanto la víctima como el personal policial protector conozcan el alcance de estas.`,
    `En el caso de ${Y('contactos personales,')} estos han de ser ${Y('discretos')} y se deben usar ${Y('vehículos sin distintivos policiales y personal sin uniforme,')} ${K('salvo')} que las circunstancias lo imposibiliten.`,
    `Realizar las siguientes ${Y('recomendaciones')} a la víctima en relación con su ${Y('ciberseguridad:')}<br>&nbsp;&nbsp;– Mantener sus ${Y('perfiles privados')} para tener más control sobre quien accede a las fotos, datos y publicaciones.<br>&nbsp;&nbsp;– ${K('No')} aceptar solicitudes de seguimiento de usuarios que no reconozca.<br>&nbsp;&nbsp;– Evitar publicar información personal y la ubicación de los lugares a los que vaya, para evitar que el agresor pueda localizar.<br>&nbsp;&nbsp;– Concienciar a sus personas cercanas del riesgo que corre al ser mencionada/etiquetada en redes sociales. Las ${Y('fotografías en las que se pueda obtener información')} sobre lugares o personas con las que tiene una relación frecuente pueden constituir una merma de su seguridad personal.<br>&nbsp;&nbsp;– ${Y('Cambiar las contraseñas')} de las diferentes aplicaciones que puedan facilitar información personal o su localización.`)
    + sub('PARA EL DENUNCIADO:') + b(`Se informará al autor, que ${Y('debe estar disponible o localizado')} cuando sea llamado a declarar a presencia policial y/o judicial.`, `Si el autor tuviera ${Y('licencia de armas,')} requerirle la entrega voluntaria de las armas y permiso a la Unidad policial actuante.`)
    + sub('EN EL CASO DE EXISTENCIA DE MEDIDAS JUDICIALES:') + b(`Comunicar al autor de que su caso de violencia de género se encuentra sometido a ${Y('control/protección policial')} y, en su caso, contenido y alcance de las medidas judiciales/orden de protección acordada.`, `Acordar el ${Y('acompañamiento')} del autor al domicilio de la víctima, para ${Y('retirar sus efectos,')} en el caso de que el juez acuerde su salida de este. Si es posible, ${Y('se aconseja')} que el autor haga entrega de las llaves del referido domicilio.`, `Revisar la ${Y('información penitenciaria')} en el Sistema VioGén-2, al objeto de conocer, si las tuviera, los movimientos del autor, informando a la víctima de los permisos/salidas penitenciarias. Contrastar dicha información con el Centro Penitenciario en aquellos supuestos en que la misma suscite dudas.`)
    + '<div style="margin-top:5px">El personal policial que vaya a efectuar tareas de protección deberá disponer de la información actualizada de la víctima y del autor, con los datos más relevantes y hechos significativos del Caso.</div>')
  + lab('MEDIO', 'c') + cel(sub('PARA LA VÍCTIMA:') + b(`${D('Entrevista personal')} con la víctima.`, `${D('Si procede,')} efectuar traslado de la víctima para su ingreso en un centro de acogida.`, `${D('Vigilancia ocasional y aleatoria')} de la víctima en domicilio, lugar de trabajo y centros escolares de los menores en horarios de entrada y salida.`, `${D('Acompañamiento')} a la víctima en actuaciones de carácter judicial, asistencial o administrativo, cuando se considere que puede existir algún tipo de riesgo para ella.`, `${D('Recomendar a la víctima el bloqueo de perfiles')} que puedan ser usados por el agresor para acceder a su perfil o contactar con ella. Denunciar a través de las propias redes sociales cualquier mensaje ofensivo o sospechoso, realizando previamente la salvaguarda de los datos digitales de los citados mensajes.`)
    + sub('PARA EL AUTOR:') + b(`${D('Comprobación periódica')} del cumplimiento por el autor de las ${D('medidas judiciales')} de protección impuestas.`, `${D('Comunicación/entrevista')} con el autor durante permisos penitenciarios y/o excarcelaciones para informarle de que su Caso se encuentra sometido a control/protección policial, así como para contrastar información sobre sus datos de contacto/localización actual.`)
    + sub('EN LOS SUPUESTOS DE CASOS DE ESPECIAL RELEVANCIA:') + b(`${D('Solicitar a')} ${A('Fiscalía')} el ${D('seguimiento obligatorio')} del autor a través de la asignación de un ${D('dispositivo telemático')} de control.`))
  + lab('ALTO', 'o') + cel(sub('PARA LA VÍCTIMA:') + b(`En caso de no haberse podido localizar todavía al autor, hablar con la víctima sobre la posibilidad de ser trasladada a casa de un familiar, domicilio distinto o centro de acogida.`, `Recomendar a la víctima la ${Y('eliminación de los perfiles')} actuales de las redes sociales y ${Y('cambio de número de teléfono,')} que deberá compartir solo con su ${A('Círculo de Fortaleza.')}`)
    + sub('PARA EL AUTOR:') + b(`Entrevista ${D('ocasional')} con el autor.`, `Vigilancia ${D('aleatoria y frecuente')} de los movimientos del autor.`, `${D('Solicitar a')} ${A('Fiscalía')} el seguimiento obligatorio del autor a través de la asignación de un dispositivo telemático de control.`))
  + lab('EXTREMO', 'o') + cel(sub('PARA LA VÍCTIMA:') + b(`${D('Protección permanente')} de la víctima hasta que el autor o sus circunstancias dejen de ser una amenaza inminente, realizándose dicha protección de manera presencial por parte del Cuerpo Policial respectivo.`, `${D('Vigilancia en centros escolares')} de los hijos e hijas de la víctima a la hora de entrada y salida.`, `Aconsejar a la víctima la creación de una ${Y('nueva identidad digital.')}`)
    + sub('PARA EL AUTOR:') + b(`${D('Control intensivo')} de los movimientos del autor hasta que este deje de ser una amenaza inminente para la seguridad de la víctima.`))
  + lab('MENORES', 'v') + cel(sub('MEDIDAS DE PROTECCIÓN ANTE LA EXISTENCIA DE MENORES:') + b(`Solicitar ${Y('información a la víctima de la situación')} en la que se ${Y('encuentran los menores, resoluciones judiciales sobre custodia, domicilios donde pernoctan, centros educativos')} a los que acuden; prestando la protección adecuada acorde a cada situación.`, `Pedir información a ${A('Servicios Sociales')} sobre lo concerniente al Caso y la situación de los menores.`, `${Y('Acompañamiento a los puntos de encuentro,')} solicitando información a los educadores/monitores en relación con cada Caso.`, `${Y('Indagar sobre el posible maltrato')} a los menores, la existencia de ${Y('amenazas')} a la integridad física por parte del presunto agresor, o si la víctima teme por la seguridad del menor. Ante la existencia de alguno de estos indicios, solicitar información tanto a las personas de referencia como al centro educativo, sanitario y/o de servicios sociales. ${Y('Comunicarlo')} a la ${A('Autoridad Judicial y Fiscal')} en el caso de que se esté produciendo.`, `Incidir en la percepción de riesgo de la víctima, explicando a la misma cómo los aprendizajes directos o indirectos de conductas violentas en el contexto familiar, pueden perjudicar el natural desarrollo de los menores.`, `Establecer ${Y('contactos frecuentes')} con ${A('personal policial tutor.')} Este profesional colabora y establece la coordinación entre los centros educativos, otros organismos y familias, a fin de prevenir situaciones que puedan suponer un riesgo en su seguridad.`))
  + '</div>'));

function vis(html) {
  const tit = (html.match(/<div class="vis-t">(?:<i>[^<]*<\/i>)?([\s\S]*?)<\/div>/) || [, ''])[1].replace(/ \(cuadro del temario[^)]*\)/, '');
  if (/Pautas básicas para entrevistarse/.test(tit)) return PAUTAS;
  if (/Medidas policiales de protección para cada nivel/.test(tit)) return ANEXO2;
  const root = kids(html)[0].inner;               // contenido de <div class="vis">
  const [, body] = kids(root);                    // [vis-t, cuerpo]
  let inner = '';
  if (/vis-tabla/.test(body.cls)) {
    const filas = kids(body.inner).filter(x => x.cls === 'vt-nodo').map(n => {
      const [et, hijos] = kids(n.inner); const c = (et.cls.match(/vt-et ([a-z]+)/) || [, ''])[1];
      return lab(strip(et.inner), c) + cel(kids(hijos.inner).map(h => strip(h.inner)).join('<br>'));
    });
    inner = `<div style="display:grid;grid-template-columns:170px 1fr">${filas.join('')}</div>`;
  } else if (/vis-comp/.test(body.cls)) {
    const cols = kids(body.inner).filter(x => x.cls === 'vis-col').map(c => ({ h: (c.inner.match(/<h5>([\s\S]*?)<\/h5>/) || [, ''])[1], l: [...c.inner.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(x => x[1]) }));
    if (cols.length > 3) inner = `<div style="display:grid;grid-template-columns:170px 1fr">${cols.map(c => lab(c.h, 'v') + cel(c.l.map(x => '• ' + x).join('<br>'))).join('')}</div>`;
    else inner = `<div class="g2s" style="align-items:start;grid-template-columns:repeat(${cols.length},1fr)">${cols.map(c => `<div class="caja"><div style="font-weight:800;margin:0 0 4px;text-align:center">${c.h}</div>${c.l.map(x => '• ' + x).join('<br>')}</div>`).join('')}</div>`;
  } else if (/vis-plazos/.test(body.cls)) {
    inner = `<div style="display:grid;grid-template-columns:130px 1fr">${kids(body.inner).map(p => lab((p.inner.match(/<span class="n">([\s\S]*?)<\/span>/) || [, ''])[1], 'o') + cel(p.inner.replace(/<span class="n">[\s\S]*?<\/span>/, ''))).join('')}</div>`;
  } else if (/vis-flujo/.test(body.cls)) {
    const paso = p => caja(strip(p.inner.replace(/<span class="et">([\s\S]*?)<\/span>/, '<b>$1</b> · ')));
    inner = kids(body.inner).map(p => p.cls === 'vis-flecha' ? fl : /vis-bifurca/.test(p.cls) ? `<div class="g2s" style="align-items:start">${kids(p.inner).map(paso).join('')}</div>` : paso(p)).join('').replace(/(<div class="fl">▼<\/div>)+/g, fl);
  } else return html;
  let h = '<!--largo-->' + esq(tit, inner);
  h = h.replace(/<mark class="m-resp[^"]*"[^>]*>([\s\S]*?)<\/mark>/g, '$1').replace(/ (data-q|title|data-r|tabindex|onclick)="[^"]*"/g, '')
    .replace(/<span class="m-circulo[^"]*">/g, '<span style="border:1.5px solid #c2185b;border-radius:10px;padding:0 3px">')
    .replace(/<span class="m-caja[^"]*">/g, '<span style="border:1.5px solid #1d4ed8;padding:0 2px">');
  return colorea(h);
}

// R6, R14 y R15 del RECUERDA del temario (págs. 166-167 del PDF) que faltan en el RECUERDA del Exprés: se insertan en su orden numérico
const rExtra = [
  '<p><span class="b r">R6</span> <b>R6</b> · <i>Ley Orgánica de Medidas de Protección Integral contra la VG.</i> Las mujeres víctimas de violencia de género serán consideradas en el acceso a viviendas protegidas y residencias públicas para mayores, en los términos que determine la legislación aplicable: <b>→</b> <mark>colectivos prioritarios.</mark></p>',
  '<p><span class="b r">R14</span> <b>R14</b> · <i>Instrucción núm. 4/2019.</i> El seguimiento de la evolución de los casos se realizará siempre con el Formulario VPER en sus dos modalidades: <b>→</b> <mark>VPER-S y VPER-C.</mark></p>',
  '<p><span class="b r">R15</span> <b>R15</b> · <i>Protocolo de actuación del sistema de seguimiento por medios telemáticos.</i> El DLV se entregará preferentemente: <b>→</b> <mark>en el domicilio de la usuaria.</mark></p>'];
module.exports = { rExtra, soloPropios: true, vis };
if (require.main === module) {
  global.window = {}; eval(require('fs').readFileSync('C:/Users/ruben/Desktop/HTML OFICIAL/expres/t15.js', 'utf8'));
  const H = window.EXPRES_T[15].html; let i = 0, p = 0, n = 0;
  while ((i = H.indexOf('<div class="vis">', p)) >= 0) { const k = kids(H.slice(i - 1 + 1)); const blk = '<div class="vis">' + kids(H.slice(i))[0].inner + '</div>'; n++; console.log(n, vis(blk).length); p = i + blk.length; }
}
