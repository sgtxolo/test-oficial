// Cuadros del Tema 20 rehechos con la forma del temario (ramas, cajas, flechas, ✖, notas a boli) y su fosforito.
// Los usa repaso-hibrido.js (si existe repaso-cuadros-tN.js, sustituye a los cuadros del Exprés). Cada cuadro: { antes: RegExp sobre la cabecera de la ficha ANTES de la cual va, html }.
// Fuente: páginas del PDF escaneado del T20 (págs. 36 → 26/33, 82, 87, 88, 92, 107, 119, 128, 129, 62) y las 3 fotos de cuestiones de competencia.
const fs = require('fs');
const R = 'C:/Users/ruben/Desktop/HTML OFICIAL/';
const y = t => `<mark class="y">${t}</mark>`, d = t => `<mark class="d">${t}</mark>`, a = t => `<mark class="a">${t}</mark>`, p = t => `<mark class="p">${t}</mark>`, c = t => `<mark class="c">${t}</mark>`, k = t => `<mark class="k">${t}</mark>`;
const esq = (tit, sub, inner) => `<div class="esq"><div class="ban">${tit}${sub ? '<small>' + sub + '</small>' : ''}</div><div class="cuerpo">${inner}</div></div>`;
const fl = '<div class="fl">▼</div>';
const bif = (...cols) => `<div class="bif" style="grid-template-columns:repeat(${cols.length},1fr)">${cols.map(x => `<div class="rama">${x}</div>`).join('')}</div>`;
const caja = (t, e = '') => `<div class="caja ${e}">${t}</div>`;
const tabla2 = (h1, h2, filas) => `<div class="tab2"><div class="th">${h1}</div><div class="th">${h2}</div>${filas.map(([x, z]) => `<div class="td">${x}</div><div class="td">${z}</div>`).join('')}</div>`;
const lineaTiempo = pasos => `<div class="lt">${pasos.map(x => `<div class="lt-i ${x.c || ''}">${x.t}</div>`).join('')}</div>`;

const out = [];
// ---- las 3 páginas de cuestiones de competencia (arts. 26-44): ya maquetadas en la propuesta ----
const prop = fs.readFileSync(R + 'repaso-t20-propuesta.html', 'utf8');
const bl = [...prop.matchAll(/<div class="esq">[\s\S]*?(?=<!-- =====|<\/div><\/body>)/g)].map(m => m[0].replace(/\s*$/, ''));
out.push({ antes: /^Artículo 27(?!\d)/, html: bl[0] }, { antes: /^Artículo 36(?!\d)/, html: bl[1] }, { antes: /^Artículo 38(?!\d)/, html: bl[2] });

// ---- recursos contra autos de procesamiento (pág. 82) ----
out.push({ antes: /^Artículo 490(?!\d)/, html: esq('RECURSOS CONTRA AUTOS DE PROCESAMIENTO', 'art. 384', `
  ${caja('Contra autos que dicten los ' + a('Jueces de Instrucción') + '. ' + d('<b>DECRETANDO</b>') + ' el procesamiento:', 'cen')}
  <div class="g2s" style="align-items:start">
   <div>${caja(d('1º Recurso de reforma') + ': dentro de los ' + p('3 días') + ' siguientes de haber sido notificada la resolución')}<div class="fl">▼ y contra el auto denegando la reforma</div>${caja(d('2º Recurso de apelación') + ': dentro de los ' + p('5 días') + ' siguientes de haber sido notificada la resolución denegando el recurso')}</div>
   <div>${caja('También se pueden presentar los recursos ' + y('de forma conjunta') + ':<br>' + d('Recurso de reforma') + ': dentro de los ' + p('3 días') + ' siguientes de haber sido notificada la resolución<div class="cen"><b>+</b></div>' + d('Recurso de apelación') + ' (de forma ' + y('subsidiaria') + ')')}</div>
  </div>
  ${caja('Contra autos que dicten los ' + a('Jueces de Instrucción') + '. ' + d('<b>DENEGANDO</b>') + ' el procesamiento:<br>' + y('Solo podrá recurrir quien haya solicitado el procesamiento'), 'cen')}
  <div class="g2s" style="align-items:start"><div>${caja(d('1º Recurso de reforma') + ': dentro de los ' + p('3 días') + ' siguientes de haber sido notificada la resolución')}<div class="fl">▼ y contra el auto denegando la reforma</div></div>
   <div>${caja(d('2º ' + k('NO CABE RECURSO DE APELACIÓN')) + ' ni ningún otro recurso<br><span class="nota">*Pero podrá reproducirse ante la ' + a('Audiencia') + ' correspondiente la petición de procesamiento formulada por la parte a quien le haya sido denegada*</span>')}</div></div>`) });

// ---- la detención: supuestos y plazos (pág. 87) y norma del art. 500 (pág. 88) ----
out.push({ antes: /^Artículo 501(?!\d)/, html: esq('LA DETENCIÓN: SUPUESTOS Y PLAZOS', 'arts. 490, 492, 496, 497 y 500', `
  ${caja('<b>Norma del art. 497 (Norma General)</b><br>Aplicable a los siguientes casos del artículo 490 <span class="man">Cualquiera</span>:<ul style="list-style:none;padding-left:10px"><li>1.º Al que ' + y('intentare cometer un delito') + ', ' + p('en el momento') + ' de ir a cometerlo.</li><li>2.º Al delincuente, ' + d('«in fraganti»') + '.</li><li>6.º Al que se ' + d('fugare') + ' estando detenido o preso por causa pendiente.</li><li>7.º Al ' + a('procesado o condenado') + ' que estuviere en ' + d('rebeldía') + '.</li></ul>Y a los siguientes casos del artículo 492:<ul style="list-style:none;padding-left:10px"><li>2.º Al que estuviere ' + a('procesado') + ' por delito que tenga señalada en el Código pena ' + d('superior a la de prisión correccional') + '.</li><li>3.º Al ' + a('procesado') + ' por delito a que esté señalada pena ' + d('inferior') + ', si sus antecedentes o las circunstancias del hecho hicieren presumir que ' + k('no comparecerá') + ' cuando fuere llamado por la Autoridad judicial.</li><li>4.º Al que estuviere en el caso del número anterior, aunque todavía no se hallase procesado, con tal que concurran las dos circunstancias siguientes: 1.º que la Autoridad o agente tenga motivos ' + d('racionalmente bastantes') + ' para creer en la existencia de un hecho que presente los caracteres de ' + d('delito') + '; 2.º que los tenga también bastantes para creer que la persona a quien intente detener ' + d('tuvo participación') + ' en él.</li></ul>')}
  ${lineaTiempo([{ t: 'Momento de la <b>detención</b>' }, { t: 'art. 496 LECrim<br>' + p('24 horas') + ' siguientes', c: 'fl2' }, { t: 'Puesta a <b>disposición judicial</b>' }, { t: 'art. 497 LECrim<br>' + p('72 horas') + ' siguientes', c: 'fl2' }, { t: '<b>Libertad</b><br><b>Prisión preventiva</b>', c: 'fin' }])}
  <div class="cen" style="margin:4px 0 10px"><b>Total: ${p('24 + 72 = 96 horas')}</b> (plazos máximos)</div>
  ${caja('<b>Norma del art. 500</b> · aplicable a los siguientes casos del artículo 490:<ul style="list-style:none;padding-left:10px"><li>3.º Al que se ' + d('fugare del establecimiento') + ' penal en que se halle extinguiendo ' + d('condena') + '.</li><li>4.º Al que se ' + d('fugare de la cárcel') + ' en que estuviere esperando su traslación al establecimiento penal o lugar en que deba cumplir la condena que se le hubiese impuesto por sentencia firme.</li><li>5.º Al que se ' + d('fugare al ser conducido') + ' al establecimiento o lugar mencionado en el número anterior.</li><li>7.º Al ' + a('procesado o condenado') + ' que estuviere en ' + d('rebeldía') + '.</li></ul>')}
  ${lineaTiempo([{ t: 'Momento de la <b>detención</b>' }, { t: '<b>ENTREGA ' + p('INMEDIATA') + '</b>', c: 'fl2' }, { t: '<b>Lugar de cumplimiento</b> de la condena', c: 'fin' }])}`) });

// ---- norma del artículo 520 bis (pág. 92) ----
out.push({ antes: /^Artículo 521(?!\d)/, html: esq('NORMA DEL ARTÍCULO 520 BIS', 'detención de presuntos partícipes de delitos del art. 384 bis', `
  ${caja('Aplicable a ' + y('toda persona detenida') + ' como presunto partícipe de alguno de los delitos a que se refiere el artículo 384 bis: (persona integrada o relacionada con ' + d('bandas armadas') + ' o individuos ' + d('terroristas o rebeldes') + ')')}
  ${lineaTiempo([{ t: 'Momento de la <b>detención</b>' }, { t: p('72 horas') + '<br>siguientes', c: 'fl2' }, { t: 'Inicio del plazo de posible <b>prórroga</b>' }, { t: p('48 horas') + '<br>siguientes', c: 'fl2' }, { t: 'Puesto a <b>disposición judicial</b>' }, { t: p('72 horas') + '<br>siguientes', c: 'fl2' }, { t: '<b>Libertad</b><br><b>Prisión preventiva</b>', c: 'fin' }])}
  <div class="cen">${caja(p('<b>48 horas</b>') + ': límite para ' + d('solicitar la prórroga') + ' de la detención', 'cen')}</div>`) });

// ---- diferencias denuncia/querella y exentos de fianza (pág. 62) ----
out.push({ antes: /^Artículo 282\s*bis(?!\d)/, html: esq('ARTÍCULO 281 · EXENTOS DE FIANZA Y DENUNCIA / QUERELLA', 'arts. 259 a 281', `
  ${caja('Quedan ' + d('exentos') + ' de cumplir lo dispuesto en el artículo anterior <span class="man">fianza</span>:<ul style="list-style:none;padding-left:10px"><li>1.º El ' + a('ofendido') + ' y sus ' + a('herederos o representantes legales') + '.</li><li>2.º En los delitos de ' + d('asesinato u homicidio') + ', el ' + a('cónyuge') + ' del difunto o persona vinculada a él por análoga relación de afectividad, los ' + a('ascendientes y descendientes') + ' y sus parientes colaterales ' + p('hasta el segundo grado') + ' inclusive, los herederos de la víctima y los ' + a('padres, madres e hijos') + ' del delincuente.</li><li>3.º Las ' + a('asociaciones y personas jurídicas') + ' a las que la ley reconoce legitimación para defender los derechos de las víctimas, siempre que el ejercicio de la acción penal hubiera sido ' + y('expresamente autorizado por la propia víctima') + '.</li></ul><span class="b r">R18</span> La exención de fianza ' + k('no es aplicable') + ' a los ' + a('extranjeros') + ' si no les correspondiere en virtud de tratados internacionales o por el principio de reciprocidad.')}
  ${tabla2('DENUNCIA', 'QUERELLA', [
    [`Puede formularse ante ${a('cualquier Autoridad judicial')}, funcionario, Ministerio Fiscal o policía.`, `Sólo cabe interponerla ante el ${a('órgano jurisdiccional competente')}.`],
    [`Es un ${d('deber')}, una obligación impuesta por el Estado.`, `Es un ${d('derecho')}.`],
    [`Puede formularse ${y('oralmente')}, por escrito o mediante mandatario con poder especial.`, `Se debe formular ${y('siempre por escrito')}.`],
    [`${k('No')} exige constitución de ${d('fianza')}.`, `Requiere constitución de ${d('fianza')} como presupuesto para ser admitida.`],
    [`Implica una participación de ${d('conocimiento')}.`, `Constituye una ${d('declaración de voluntad')}.`],
    [`El denunciante ${k('no')} viene obligado a probar los hechos.`, `El querellante ${k('viene obligado')} a probar los hechos.`],
    [`Una vez presentada, ${k('no')} requiere ningún otro acto del denunciante.`, `Exige ${y('actos posteriores')} del querellante que, de no llevarlos a cabo, suponen el ${d('abandono del procedimiento')}.`],
    [`El denunciante ${k('no')} tiene la consideración de ${d('parte')} en el proceso.`, `El querellante ${d('es parte')} en el proceso.`]])}`) });

// ---- art. 579: correspondencia escrita y telegráfica (pág. 107) ----
out.push({ antes: /^Artículo 579\s*bis(?!\d)/, html: esq('ARTÍCULO 579 · DETENCIÓN DE LA CORRESPONDENCIA', 'escrita y telegráfica', `
  <div class="g2s" style="align-items:start">
   <div>${caja('<b>579.1</b> · El ' + a('juez') + ' ' + c('podrá acordar') + ' la detención de la correspondencia ' + y('privada, postal y telegráfica') + ', incluidos faxes, burofaxes y giros, si hubiera indicios, siempre que la investigación tenga por objeto alguno de los siguientes delitos:')}
   ${caja(`1.º Delitos ${d('dolosos')} castigados con pena con límite máximo de, ${p('al menos, tres años')} de prisión <span class="man">≥ 3</span><br>2.º Delitos cometidos en el seno de un ${d('grupo u organización criminal')}<br>3.º Delitos de ${d('terrorismo')}`)}</div>
   <div>${caja('<b>579.2</b> · Resolución motivada, por un plazo de hasta ' + p('tres meses') + ', ' + c('prorrogable') + ' por iguales o inferiores períodos hasta un máximo de ' + p('dieciocho meses') + '. <span class="man">M.I. o S.E.S.</span>')}
   ${caja('<b>579.3 · URGENCIA</b> (bandas armadas o terrorismo): la ordena el ' + a('Ministro del Interior') + ' o, en su defecto, el ' + a('Secretario de Estado de Seguridad') + '. ' + c('Comunicará inmediatamente') + ' al juez, en todo caso dentro de ' + p('24 horas') + '. El ' + a('juez') + ' ' + c('revocará o confirmará') + ' en un plazo máximo de ' + p('72 horas') + ' desde que fue ordenada.')}</div>
  </div>
  ${caja('<b>579.4 · No se requerirá autorización judicial</b> en:<br>a) ' + d('Envíos postales') + ' que por sus características externas no sean usualmente utilizados para contener correspondencia individual sino para el transporte y tráfico de ' + d('mercancías') + ' (en cuyo exterior se haga constar su contenido).<br>b) ' + d('Formato legal de comunicación abierta') + ': declaración externa de contenido o indicación expresa de que se autoriza su inspección.<br>c) Inspección conforme a la ' + d('normativa aduanera') + ' o a las ' + d('normas postales') + '.')}`) });

// ---- duración de las medidas tecnológicas (pág. 119, cuadro manuscrito) ----
out.push({ antes: /^Artículo 588\s*sexies c(?!\d)/, html: esq('DURACIÓN DE LA MEDIDA', 'cuadro manuscrito del temario · arts. 588 ter g, 579.2, 588 quinquies c, 588 septies', tabla2('MEDIDA', 'PLAZOS', [
    [`<b>1 · ${d('TELEFÓNICAS Y TELEMÁTICAS')}</b>`, `Será de ${p('3 meses')} · ${c('prorrogable')} por periodos de igual duración · máximo ${p('18 meses')}`],
    [`<b>2 · ${d('CORRESPONDENCIA ESCRITA')}</b>`, `Hasta ${p('3 meses')} · prorrogable por iguales o inferiores periodos · máximo ${p('18 meses')}`],
    [`<b>3 · ${d('MEDIOS DE SEGUIMIENTO Y LOCALIZACIÓN')}</b>`, `Máximo de ${p('3 meses')} · ${k('excepcionalmente')}: prórrogas por el mismo o inferior plazo · máximo ${p('18 meses')}`],
    [`<b>4 · ${d('REGISTRO REMOTO DE EQUIPOS INFORMÁTICOS')}</b>`, `Máximo de ${p('1 mes')} · prorrogable por iguales periodos · máximo ${p('3 meses')}`],
    [`<b>ORDEN DE CONSERVACIÓN DE DATOS</b> (588 octies) · ${a('M. Fiscal o P.J.')}`, `Podrá requerir a cualquier persona la conservación y protección de datos · máximo ${p('90 días')} · prorrogable ${p('1 vez')} hasta: el ${a('Juez')} autoriza la cesión o se cumplen ${p('180 días')}`]]) ) });

// ---- procedimiento abreviado: recursos contra autos y recurso de apelación (págs. 128 y 129) ----
out.push({ antes: /^Artículo 768(?!\d)/, html: esq('PROCEDIMIENTO ABREVIADO · RECURSOS', 'art. 766', `
  <div class="g2s" style="align-items:center">${caja('En el ' + d('procedimiento abreviado') + ', contra los:<br>• Autos del ' + a('Juez de Instrucción') + '<br>• Autos del ' + a('Juez de lo Penal') + '<br>' + y('que no estén exceptuados de recurso'))}
   <div>${caja('Podrán ejercitarse: <b>' + d('RECURSO DE REFORMA') + '</b> / <b>' + d('RECURSO DE APELACIÓN') + '</b>')}${caja(k('No suspenderán') + ' el curso del procedimiento (salvo que lo disponga la ley).<br>La apelación se podrá interponer ' + y('subsidiariamente') + ' con la reforma o ' + y('por separado') + '.<br>' + k('En ningún caso') + ' será necesario interponer previamente la reforma (la reforma es ' + d('potestativa') + ').')}</div></div>`) });
out.push({ antes: /^Artículo 768(?!\d)/, html: esq('PROCEDIMIENTOS · RECURSO DE APELACIÓN', 'art. 766.3, 4 y 5', `
  <div class="g3">
   <div><div class="hd">Cuando se interponga <u>por separado</u></div>
    ${caja('<b>1º ' + d('PRESENTACIÓN') + '</b> de apelación: dentro de los ' + p('5 días') + ' siguientes a la notificación del auto recurrido o del auto resolutorio del recurso de reforma. Mediante ' + y('escrito') + ' donde se expondrán motivos, se señalarán los particulares que hayan de testimoniarse y se acompañarán documentos justificativos.')}${fl}
    ${caja('<b>2º ' + d('ADMITIDO') + '</b> a trámite: el ' + a('Secretario Judicial') + ' da traslado a las demás partes personadas, que podrán por un plazo de ' + p('5 días') + ' formular alegaciones por escrito, señalar otros particulares y presentar documentos. Finalizado el plazo, en los ' + p('2 días') + ' siguientes se remite ' + d('testimonio') + ' a la ' + a('Audiencia') + ' respectiva.')}</div>
   <div><div class="hd">Cuando se interponga <u>subsidiariamente</u> con el de reforma</div>
    ${caja('Recurso de reforma resulta ' + y('total o parcialmente desestimatorio'))}${fl}
    ${caja('<b>1º</b> El ' + a('Secretario Judicial') + ' dará traslado al recurrente para que, en un plazo de ' + p('5 días') + ': formule alegaciones y pueda presentar documentos justificativos.')}${fl}
    ${caja('<b>2º</b> Se dará traslado a las demás partes personadas.')}</div>
   <div><div class="hd">Cuando se interponga contra autos que acuerden:</div>
    ${caja(d('Prisión provisional') + ' de alguno de los investigados o encausados: se ' + c('podrá solicitar') + ', en el escrito de interposición, la celebración de ' + d('vista') + '; la acordará la Audiencia respectiva.')}
    ${caja(d('Otras medidas cautelares') + ': la Audiencia ' + c('podrá acordar') + ' la celebración de una vista si lo estima conveniente.')}
    ${caja('El ' + a('Secretario Judicial') + ' señalará la vista dentro de los ' + p('10 días') + ' siguientes a la recepción de la causa en la Audiencia.')}</div>
  </div>${fl}
  ${caja('<b>3º ' + d('RESOLUCIÓN') + '</b> por la ' + a('Audiencia respectiva') + ': dentro de los ' + p('5 días') + ' siguientes. ' + k('Excepcionalmente') + ', podrá reclamar las actuaciones para su consulta (siempre que no se obstaculice la tramitación de aquéllas), debiendo devolverse al Juez en el plazo máximo de ' + p('3 días') + '.')}`) });

module.exports = { cuadros: out, soloPropios: true };
