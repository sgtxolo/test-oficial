require('../esq-virtual.js');
// Cuadros visuales del Tema 23: recrean los cuadros de tu temario (PDF 08-08-2026) con su texto literal de la Ley 5/2014.
//   arts. 3, 6.2, 11, 12.2, 14, 16, 22, 24, 27-28 (habilitación), 29, 30, 34, 47, 52, 53, 55, 56, 57-59 (infracciones), 61-63 (sanciones), 66, 68, 70, 71 (págs. 13-75 de tu PDF)
// Colores: tu PDF trae estos cuadros IMPRESOS (sin tu fosforito): van con mi método (órganos → verde; plazos y cifras → azul; «no / salvo / únicamente» → rojo subrayado;
// conceptos → amarillo/naranja). Las notas a boli del temario van como pie. El texto de cada apartado se copia LITERAL del oficial (oficial-compacto.txt).
// Uso: node prompts/herramientas/tema23/visuales-t23.js (idempotente: sustituye los anteriores marcados <!--VIS23-->). Lo usa expres-t23.js (module.exports = V).
const fs = require('fs'), path = require('path');
const L = require('../literal-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const KY = x => K(Y(x)), KD = x => K(D(x));
const pie = t => `<div class="vis-pie" style="font-size:.86em;opacity:.85;margin-top:6px">✎ ${t}</div>`;
const V = []; const v = (norma, loc, html) => V.push([norma, loc, html]);
const OFC = fs.readFileSync(path.join(__dirname, '..', '..', 'temario-limpio', 'tema23', 'oficial-compacto.txt'), 'utf8').replace(/\r/g, '');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// líneas (párrafos) del artículo N, sin la rúbrica
const par = (a, b) => { const i = OFC.indexOf('\nArtículo ' + a + '.'), j = OFC.indexOf('\nArtículo ' + b + '.', i + 5); return OFC.slice(i, j < 0 ? undefined : j).split('\n').map(x => x.trim()).filter(Boolean).slice(1); };
const lets = ls => ls.filter(l => /^[a-zñ]\)\s/.test(l));
const nums = ls => ls.filter(l => /^\d+\.\s/.test(l));
// colorea por método sobre texto literal
const hl = t => esc(t)
  .replace(/(Ministerio del Interior|Ministro del Interior|Secretario de Estado de Seguridad|Director General de la (?:Policía|Guardia Civil)|Delegados y(?: a los)? Subdelegados del Gobierno|Fuerzas y Cuerpos de Seguridad(?: competentes)?|autoridad judicial|órgano autonómico competente|Cuerpo Nacional de Policía|Registro Nacional de Seguridad Privada)/g, m => G(m))
  .replace(/(\d{1,3}(?:\.\d{3})* (?:a|y) \d{1,3}(?:\.\d{3})* euros|\d{1,3}(?:\.\d{3})* euros|quince días|dos meses|seis meses|tres meses|cuatro años|tres años|dos años|un año|diez años|cinco años|treinta días hábiles|quince días hábiles|un mes|entre seis meses y un año|entre uno y dos años)/g, m => P(m))
  .replace(/\b(sin perjuicio|exclusivamente|únicamente|salvo que|salvo|en ningún caso|en todo caso|no podrán|no podrá|no)\b/g, m => /^(no|salvo)/.test(m) && m.length < 3 ? m : K(m));
const quita = l => l.replace(/^[a-zñ]\)\s+/, '').replace(/^\d+\.\s+/, '');
const li = ls => ls.map(l => { const m = l.match(/^([a-zñ]\)|\d+\.)\s+(.*)$/); return m ? `${D(m[1])} ${hl(m[2])}` : hl(l); });

// ───────── art. 3 · ÁMBITO DE APLICACIÓN (p. 13) ─────────
v('lsp', 'son de aplicación a las empresas de seguridad privada', cols('ÁMBITO DE APLICACIÓN (cuadro del temario · pág. 13 · art. 3)', [
  { t: KD('Apartado 1'), l: [`Empresas de seguridad privada · personal de seguridad privada · despachos de detectives · servicios de seguridad privada · medidas de seguridad · contratos celebrados en este ámbito`] },
  { t: KD('Apartado 2 · «en la medida que resulte pertinente»'), l: [`Establecimientos obligados a disponer de medidas de seguridad · usuarios · ingenieros y técnicos · operadores de seguridad · profesores de centros de formación · empresas de seguridad informática · centrales receptoras de alarmas de ${Y('uso propio')} · centros de formación`] },
  { t: KD('Apartado 3 · intrusismo'), l: [`Régimen sancionador, medidas provisionales y facultades de inspección también aplicables a quien presta servicios o ejerce funciones ${K('sin estar autorizado')}, sin declaración responsable, o sin habilitación o acreditación`] },
]));
// ───────── art. 6.2 · SERVICIOS Y FUNCIONES FUERA DE LA LEY (p. 16) ─────────
{ const p = par('6', '7'); const i2 = p.findIndex(l => /^2\.\s/.test(l)); const i3 = p.findIndex(l => /^3\.\s/.test(l)); const it = lets(p.slice(i2, i3));
  v('lsp', 'Estos servicios y funciones podrán prestarse o realizarse por empresas y personal de seguridad privada', flujo('SERVICIOS Y FUNCIONES FUERA DE LA LEY · a no ser que impliquen servicios o funciones de seguridad privada (cuadro del temario · pág. 16 · art. 6.2)', [
    { et: 'SE REGIRÁN POR LAS NORMAS SECTORIALES', c: 'o', t: it.map(l => `${D(l.slice(0, 2))} ${hl(l.slice(3))}`).join('<br>') },
    { et: 'PUEDEN PRESTARLOS EMPRESAS Y PERSONAL DE SEGURIDAD', c: 'v', t: `Siempre con carácter ${KD('complementario o accesorio')} de las funciones de seguridad privada que se realicen y sin que en ningún caso constituyan el objeto ${KD('principal')} del servicio que se preste.` },
    { et: 'PERSONAL NO HABILITADO', c: 'c', t: `${K('En ningún caso')} podrá ejercer función alguna de las reservadas al personal de seguridad privada, ni portar ni usar ${D('armas ni medios de defensa')}, ni utilizar ${D('distintivos, uniformes o medios')} que puedan confundirse con los previstos para dicho personal.` },
  ])); }
// ───────── art. 11 · REGISTRO NACIONAL Y REGISTROS AUTONÓMICOS (pp. 19-20) ─────────
v('lsp', 'Serán objeto de inscripción de oficio en el Registro Nacional', cols('REGISTRO NACIONAL DE SEGURIDAD PRIVADA Y REGISTROS AUTONÓMICOS (cuadro del temario · págs. 19-20 · art. 11)', [
  { t: G('Registro Nacional (Ministerio del Interior)'), l: [`Se inscriben ${D('de oficio')}: el personal de seguridad privada, las empresas de seguridad privada y los despachos de detectives privados, así como delegaciones y sucursales, los centros de formación del personal de seguridad privada y las centrales receptoras de alarma de uso propio, ${K('cuando no sean objeto de inscripción en los registros de las comunidades autónomas')}`, `Igualmente: sanciones impuestas, comunicaciones de los contratos y sus modificaciones y cuantos datos sean necesarios, cuando se refieran a servicios que se presten en un ámbito territorial ${D('distinto al de una comunidad autónoma con competencia')}`] },
  { t: G('Registros de las comunidades autónomas'), l: [`Se inscriben ${D('de oficio')}: las empresas de seguridad privada y los despachos de detectives privados, delegaciones y sucursales, centros de formación y centrales receptoras de alarma de uso propio, que tengan su ${D('domicilio en la comunidad autónoma')} y cuyo ${D('ámbito de actuación esté limitado a su territorio')}`, `Igualmente: sanciones, comunicaciones de los contratos y datos cuando se refieran a servicios que se presten en el ámbito territorial propio de la comunidad`] },
]) + pie('Notas a boli del temario: «Falta el personal de seguridad» (en el listado autonómico no figura el personal de seguridad privada).'));
// ───────── art. 12.2 · DG POLICÍA / DG GUARDIA CIVIL (p. 22) ─────────
v('lsp', 'Corresponde a la Dirección General de la Policía el control', cols('COMPETENCIAS DE LA ADMINISTRACIÓN GENERAL DEL ESTADO · art. 12.2 (cuadro del temario · pág. 22)', [
  { t: G('a) Dirección General de la Policía'), l: [`El ${D('control de las empresas, entidades y servicios privados de seguridad, vigilancia e investigación')}, de su personal, medios y actuaciones.`] },
  { t: G('b) Dirección General de la Guardia Civil'), l: [`El ejercicio de sus competencias en materia de ${D('armas')} sobre las empresas y el personal de seguridad privada, así como el control de los ${D('guardas rurales y sus especialidades')}.`, `Sin afectar a las competencias de la Dirección General de la Policía, podrá ${D('participar en el control de las actuaciones operativas')} del personal de seguridad privada que preste servicios en su ámbito de competencias.`] },
]));
// ───────── art. 14 · ESPECIAL OBLIGACIÓN DE COLABORACIÓN (p. 24) ─────────
v('lsp', 'La especial obligación de colaboración de las empresas de seguridad', flujo('ESPECIAL OBLIGACIÓN DE COLABORACIÓN (cuadro del temario · pág. 24 · art. 14)', [
  { et: 'DE QUIÉN CON QUIÉN', c: 'o', t: `De las ${D('empresas de seguridad, los despachos de detectives y el personal de seguridad privada')} con las ${G('Fuerzas y Cuerpos de Seguridad')}, se desarrollará con sujeción al ${KY('principio de legalidad')} y se basará ${K('exclusivamente')} en la necesidad de asegurar el ${D('buen fin de las actuaciones tendentes a preservar la seguridad pública')}, garantizándose la ${Y('debida reserva y confidencialidad')} cuando sea necesario.` },
  { et: 'LOS PRESTADORES DEBERÁN', c: 'v', t: `${D('Comunicar')} a las ${G('Fuerzas y Cuerpos de Seguridad competentes')}, ${P('tan pronto como sea posible')}, cualesquiera circunstancias o informaciones relevantes para la prevención, el mantenimiento o restablecimiento de la seguridad ciudadana, así como ${D('todo hecho delictivo')} del que tuviesen conocimiento, poniendo a su disposición a los ${D('presuntos delincuentes')}, así como los ${D('instrumentos, efectos y pruebas')}.` },
  { et: 'LAS FUERZAS Y CUERPOS PODRÁN', c: 'c', t: `${D('Facilitar')} al personal de seguridad privada informaciones que faciliten su ${Y('evaluación de riesgos')}. Si contuvieran ${D('datos de carácter personal')}, ${K('sólo')} podrán facilitarse: ${P('en caso de peligro real para la seguridad pública')} o para evitar la comisión de infracciones penales.` },
]));
// ───────── art. 16 · COMISIONES MIXTAS Y ÓRGANOS CONSULTIVOS (p. 25) ─────────
v('lsp', 'se constituirán comisiones mixtas de seguridad privada', cols('COORDINACIÓN Y PARTICIPACIÓN (cuadro del temario · pág. 25 · art. 16)', [
  { t: G('Administración General del Estado'), l: [`${D('Comisiones mixtas')} de seguridad privada: ${P('nacionales, autonómicas o provinciales')}`, `Carácter de ${D('órganos consultivos y de colaboración')} entre las administraciones públicas y los representantes del sector`, `Composición y funciones: ${P('reglamentariamente')}`] },
  { t: G('Comunidades autónomas con competencias'), l: [`${D('Órganos consultivos')} en materia de seguridad privada (${K('podrán')} existir)`, `Composición y funcionamiento: los que en cada caso se determine`] },
]) + pie('Notas a boli del temario: «R5» (pin RECUERDA del art. 16.2) y «Locales» (comisiones y órganos de ámbito local).'));
// ───────── art. 22 · REPRESENTANTES LEGALES (p. 30) ─────────
{ const p = par('22', '23'); const i2 = p.findIndex(l => /^2\.\s/.test(l)); const i3 = p.findIndex(l => /^3\.\s/.test(l));
  v('lsp', 'Los representantes de las empresas de seguridad privada, que se inscribirán', flujo('REPRESENTANTES LEGALES · requisitos (cuadro del temario · pág. 30 · art. 22.2)', [
    { et: 'DEBERÁN', c: 'o', t: li(lets(p.slice(i2, i3))).join('<br>') },
  ])); }
// ───────── art. 24 · DESPACHOS DE DETECTIVES · requisitos (p. 31) ─────────
{ const p = par('24', '25'); const i2 = p.findIndex(l => /^2\.\s/.test(l)); const i3 = p.findIndex(l => /^3\.\s/.test(l));
  v('lsp', 'Los despachos de detectives privados se inscribirán de oficio', flujo('DESPACHOS DE DETECTIVES PRIVADOS · requisitos generales (cuadro del temario · pág. 31 · art. 24.2)', [
    { et: 'INSCRIPCIÓN DE OFICIO · previa declaración responsable', c: 'v', t: li(lets(p.slice(i2, i3))).join('<br>') },
    { et: 'VALIDEZ', c: 'c', t: `La validez de la declaración responsable será ${P('indefinida')} (art. 24.3).` },
  ])); }
// ───────── arts. 27-28 · HABILITACIÓN PROFESIONAL (p. 35) ─────────
v('lsp', 'se les expedirá la tarjeta de identidad profesional', flujo('HABILITACIÓN PROFESIONAL (cuadro del temario · pág. 35 · arts. 27 y 28)', [
  { et: 'HABILITACIÓN DEL MINISTERIO DEL INTERIOR', c: 'o', t: `Para el ejercicio de las funciones de seguridad privada, el personal habrá de ${D('obtener previamente')} la habilitación del ${G('Ministerio del Interior')}. Todo el personal: ${G('Dirección General de la Policía')} · ${K('excepto')} los guardas rurales y sus especialidades: ${G('Dirección General de la Guardia Civil')}.` },
  { et: 'REQUISITOS', c: 'v', t: `A quienes soliciten la habilitación, previa comprobación de que reúnen los requisitos necesarios, se les ${D('expedirá la tarjeta de identidad profesional')}.` },
  { et: 'TARJETA DE IDENTIDAD PROFESIONAL', c: 'c', t: `Incluirá todas las habilitaciones de las que el titular disponga (ejerciendo exclusivamente las funciones para las que se encuentre habilitado) · constituirá el ${D('documento público de acreditación')} del personal de seguridad privada mientras se encuentra en el ejercicio de sus funciones profesionales.` },
  { et: 'INCOMPATIBILIDADES', c: 'a', t: `${P('Reglamentariamente')} se determinará el régimen de incompatibilidades para el ejercicio de funciones de seguridad privada.` },
]));
// ───────── art. 28 · REQUISITOS GENERALES (pp. 35-36) ─────────
{ const p = par('28', '29'); const it = lets(p.slice(1, p.findIndex(l => /^2\.\s/.test(l))));
  const rot = ['NACIONALIDAD', 'EDAD', 'APTITUDES', 'FORMACIÓN', 'ANTECEDENTES PENALES', 'SANCIONES', 'SEPARACIÓN DEL SERVICIO', 'CONDENAS', 'PRUEBAS DE COMPROBACIÓN'];
  v('lsp', 'Para la obtención de las habilitaciones profesionales indicadas', tabla('REQUISITOS GENERALES PARA LA HABILITACIÓN PROFESIONAL (cuadro del temario · págs. 35-36 · art. 28.1)', ['Requisito', 'Texto de la ley'], it.map((l, k) => ({ p: rot[k] || '', c: ['o', 'v', 'c', 'a', 'o', 'v', 'c', 'a', 'o'][k % 9], t: hl(quita(l)) }))) + pie('Notas a boli del temario: junto a «Antecedentes penales»: «dolosos» (carecer de antecedentes por delitos dolosos).')); }
// ───────── art. 29 · FORMACIÓN (pp. 37-38) ─────────
{ const p = par('29', '30'); const it = lets(p.slice(0, p.findIndex(l => /^2\.\s/.test(l))));
  v('lsp', 'La formación requerida para el personal de seguridad privada consistirá', cols('FORMACIÓN REQUERIDA (cuadro del temario · págs. 37-38 · art. 29.1)', it.map((l, k) => ({ t: KD(['Vigilantes, escoltas, guardas rurales…', 'Jefes y directores de seguridad', 'Detectives privados'][k] || ''), l: [hl(quita(l))] })))); }
// ───────── art. 30 · PRINCIPIOS DE ACTUACIÓN (p. 39) ─────────
{ const p = par('30', '31');
  v('lsp', 'el personal de seguridad privada se atendrá en sus actuaciones', arbol('PRINCIPIOS BÁSICOS DE ACTUACIÓN (cuadro del temario · pág. 39 · art. 30)', `El personal de seguridad privada se atendrá en sus actuaciones a los siguientes ${D('principios básicos')}`, lets(p).map(l => ({ t: hl(l), sub: [] })))); }
// ───────── art. 34 · GUARDAS RURALES Y ESPECIALIDADES (p. 41) ─────────
v('lsp', 'Los guardas rurales ejercerán funciones de vigilancia y protección', arbol('GUARDAS RURALES Y SUS ESPECIALIDADES (cuadro del temario · pág. 41 · art. 34)', `${D('Guardas rurales')}: vigilancia y protección de personas y bienes en fincas rústicas e instalaciones agrícolas, industriales o comerciales (no podrán proteger dinero, valores y objetos valiosos)`, [
  { t: `${D('Guardas de caza')}: las del guarda rural y, además, vigilancia y protección en las fincas de caza (régimen cinegético) y ${Y('espacios de pesca fluvial')}`, sub: [] },
  { t: `${D('Guardapescas marítimos')}: las del guarda rural y, además, vigilancia y protección de los ${Y('establecimientos de acuicultura y zonas marítimas con fines pesqueros')}`, sub: [] },
]));
// ───────── art. 47 · SERVICIOS DE RESPUESTA ANTE ALARMAS (p. 49) ─────────
{ const p = par('47', '48'); const i2 = p.findIndex(l => /^2\.\s/.test(l)); const it = lets(p.slice(i2));
  v('lsp', 'Los servicios de respuesta ante alarmas se prestarán', arbol('SERVICIOS DE RESPUESTA ANTE ALARMAS (cuadro del temario · pág. 49 · art. 47.2)', `Se prestarán por ${D('vigilantes de seguridad o, en su caso, guardas rurales')}, y podrán comprender:`, it.map(l => ({ t: hl(l), sub: [] })))); }
// ───────── art. 52 · TIPOS DE MEDIDAS DE SEGURIDAD (p. 54) ─────────
{ const p = par('52', '53'); const it = lets(p);
  v('lsp', 'se podrán adoptar los siguientes tipos de medidas de seguridad', cols('TIPOS DE MEDIDAS DE SEGURIDAD (cuadro del temario · pág. 54 · art. 52.1)', it.map(l => { const m = l.match(/^([a-z]\))\s+De (seguridad \w+)(.*)$/); return { t: KD(m ? 'De ' + m[2] : l.slice(0, 20)), l: [hl(m ? m[3].replace(/^,\s*/, '') : l)] }; })) + pie('Nota a boli del temario: «5» junto al cuadro (cinco tipos de medidas).')); }
// ───────── art. 53 · ACTUACIONES DE CONTROL (p. 55) ─────────
{ const p = par('53', '54'); const it = nums(p);
  v('lsp', 'Corresponde a las Fuerzas y Cuerpos de Seguridad competentes en el ejercicio de las funciones de control', flujo('ACTUACIONES DE CONTROL (cuadro del temario · pág. 55 · art. 53)', it.map((l, k) => ({ et: 'APARTADO ' + (k + 1), c: ['o', 'v', 'c', 'a', 'o'][k % 5], t: hl(quita(l)) })))); }
// ───────── art. 55 · MEDIDAS PROVISIONALES (p. 57) ─────────
{ const p = par('55', '56'); const it = lets(p.slice(0, p.findIndex(l => /^2\.\s/.test(l))));
  v('lsp', 'podrán acordar excepcionalmente las siguientes medidas provisionales', arbol('MEDIDAS PROVISIONALES ANTERIORES AL PROCEDIMIENTO (cuadro del temario · pág. 57 · art. 55)', `Los miembros de las ${G('Fuerzas y Cuerpos de Seguridad competentes')} podrán acordar ${K('excepcionalmente')} medidas provisionales anteriores a la eventual incoación de un procedimiento sancionador, dando cuenta de ello ${P('inmediatamente')} a la autoridad competente`, it.map(l => ({ t: hl(l), sub: [] }))) + pie('Nota a boli del temario: «15 días» (ratificación, modificación o revocación en el plazo máximo de quince días) y «6 meses» (duración máxima).')); }
// ───────── art. 56 · PRESCRIPCIÓN (p. 58) ─────────
v('lsp', 'Las infracciones leves prescribirán a los seis meses', plazos('PRESCRIPCIÓN DE LAS INFRACCIONES (cuadro del temario · pág. 58 · art. 56)', [['6 meses', `Infracciones ${D('leves')}`], ['1 año', `Infracciones ${D('graves')}`], ['2 años', `Infracciones ${D('muy graves')}`]]));
// ───────── arts. 57-59 · CUADROS DE INFRACCIONES (págs. 59-64) ─────────
const infr = (a, b, ttl, pg, loc) => {
  const p = par(a, b); const sec = k => { const i = p.findIndex(l => new RegExp('^' + k + '\\.\\s').test(l)); const j = p.findIndex(l => new RegExp('^' + (k + 1) + '\\.\\s').test(l)); return lets(p.slice(i + 1, j < 0 ? undefined : j)); };
  const col = (t, ls) => ({ t, l: li(ls) });
  v('lsp', loc, cols(`${ttl} · muy graves, graves y leves (cuadro del temario · págs. ${pg} · arts. ${a})`, [col(KD('Muy graves'), sec(1)), col(KD('Graves'), sec(2)), col(KD('Leves'), sec(3))]));
};
infr('57', '58', 'INFRACCIONES DE LAS EMPRESAS, REPRESENTANTES LEGALES, DESPACHOS DE DETECTIVES Y CENTRALES DE ALARMA DE USO PROPIO', '59-61', 'La prestación de servicios de seguridad privada sin formalizar los correspondientes contratos');
infr('58', '59', 'INFRACCIONES DEL PERSONAL', '62-63', 'El ejercicio de funciones de seguridad privada para terceros careciendo de la habilitación');
infr('59', '60', 'INFRACCIONES DE LOS USUARIOS Y CENTROS DE FORMACIÓN', '64', 'La contratación o utilización a sabiendas de los servicios de empresas de seguridad o despachos');
// ───────── arts. 61-63 · SANCIONES (págs. 65-67) ─────────
const sanc = (a, b, ttl, pg, loc) => {
  const p = par(a, b); const sec = k => { const i = p.findIndex(l => new RegExp('^' + k + '\\.\\s').test(l)); const j = p.findIndex(l => new RegExp('^' + (k + 1) + '\\.\\s').test(l)); return lets(p.slice(i + 1, j < 0 ? undefined : j)); };
  v('lsp', loc, cols(`${ttl} (cuadro del temario · págs. ${pg} · art. ${a})`, [{ t: KD('Muy graves'), l: li(sec(1)) }, { t: KD('Graves'), l: li(sec(2)) }, { t: KD('Leves'), l: li(sec(3)) }]));
};
sanc('61', '62', 'SANCIONES A LAS EMPRESAS Y DESPACHOS', '65', 'Extinción de la autorización, o cierre de la empresa o despacho');
sanc('62', '63', 'SANCIONES AL PERSONAL', '66', 'Extinción de la habilitación, que comportará la prohibición');
sanc('63', '64', 'SANCIONES A USUARIOS Y CENTROS DE FORMACIÓN', '66', 'Cierre del centro de formación, que comportará');
// ───────── art. 66 · COMPETENCIA SANCIONADORA (p. 72) ─────────
v('lsp', 'la potestad sancionadora corresponderá', cols('COMPETENCIA SANCIONADORA · Administración General del Estado (cuadro del temario · pág. 72 · art. 66.1)', [
  { t: G('Ministro del Interior'), l: [`Impone las sanciones de ${D('extinción de las autorizaciones, habilitaciones y declaraciones responsables')}`] },
  { t: G('Secretario de Estado de Seguridad'), l: [`Impone las ${D('restantes sanciones por infracciones muy graves')}`] },
  { t: G('Director General de la Policía'), l: [`Impone las sanciones por infracciones ${D('graves')}. También cuando, en las inspecciones de la Guardia Civil de los cursos para guardas rurales impartidos por centros de formación ${K('no exclusivos')} de éstos, se detecten posibles infracciones`] },
  { t: G('Director General de la Guardia Civil'), l: [`Sanciones por infracciones ${D('graves')} en relación con los ${D('guardas rurales')} y centros y cursos de formación ${K('exclusivos')} para este personal`] },
  { t: G('Delegados y Subdelegados del Gobierno'), l: [`Sanciones por infracciones ${D('leves')}`] },
]) + pie('Nota a boli del temario: «EXAMEN 2020» (sello PREGUNTA EXAMEN en el art. 66.1).'));
// ───────── art. 68 · PRESCRIPCIÓN DE LAS SANCIONES (p. 73) ─────────
v('lsp', 'Las sanciones impuestas por infracciones leves, graves o muy graves prescribirán', plazos('PRESCRIPCIÓN DE LAS SANCIONES (cuadro del temario · pág. 73 · art. 68)', [['1 año', `Sanciones por infracciones ${D('leves')}`], ['2 años', `Sanciones por infracciones ${D('graves')}`], ['4 años', `Sanciones por infracciones ${D('muy graves')}`]]));
// ───────── art. 70 · EJECUTORIEDAD (p. 77) ─────────
v('lsp', 'Las sanciones impuestas serán inmediatamente ejecutivas', flujo('EJECUTORIEDAD (cuadro del temario · pág. 77 · art. 70)', [
  { et: 'LAS SANCIONES IMPUESTAS SERÁN', c: 'o', t: `${KD('Inmediatamente ejecutivas')} desde que la resolución adquiera ${D('firmeza en vía administrativa')}.` },
  { et: 'SANCIÓN PECUNIARIA SIN PLAZO PREVISTO', c: 'v', t: `La autoridad que la impuso señalará un plazo que ${K('no')} pueda ser inferior a ${P('quince días hábiles')} ni superior a ${P('treinta días hábiles')}, pudiendo acordarse el ${D('fraccionamiento del pago')}.` },
  { et: 'SUSPENSIÓN TEMPORAL, EXTINCIÓN DE EFICACIA Y PROHIBICIÓN DE LA REPRESENTACIÓN LEGAL', c: 'c', t: `Plazo de ejecución suficiente: ${K('no')} inferior a ${P('quince días hábiles')} ni superior a ${P('dos meses')}, ${Y('oyendo al sancionado y a los terceros')} que pudieran resultar directamente afectados.` },
]));
// ───────── art. 71 · PUBLICIDAD DE LAS SANCIONES (p. 75) ─────────
v('lsp', 'podrán ser hechas públicas, en virtud de acuerdo', arbol('PUBLICIDAD DE LAS SANCIONES (cuadro del temario · pág. 75 · art. 71)', `Sanciones por infracciones ${D('muy graves')} y nombres de los responsables, cuando hayan adquirido ${D('firmeza en vía administrativa')}: podrán ser hechas públicas, por acuerdo de la autoridad competente para su imposición, siempre que concurra:`, [
  { t: `${D('Riesgo para la seguridad de los usuarios o ciudadanos')}`, sub: [] }, { t: `${D('Reincidencia')} en infracciones de naturaleza análoga`, sub: [] }, { t: `${D('Acreditada intencionalidad')}`, sub: [] },
]));

module.exports = V;
if (require.main === module) {
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  const CLAVE = { lsp: 'T23_LSP' };
  let colocados = 0; const por = {};
  for (const k of Object.values(CLAVE)) por[k] = L.get(s, k).html.replace(/<!--VIS23-->[\s\S]*?<!--\/VIS23-->/g, '');
  const ins = {};
  for (const [norma, loc, vis] of V) {
    const key = CLAVE[norma], h = por[key], k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; if (norm(h.slice(a, b)).includes(k)) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', norma, loc.slice(0, 60)); continue; }
    (ins[key] = ins[key] || []).push([i, vis]);
  }
  for (const key of Object.keys(ins)) {
    let h = por[key]; const orden = ins[key].map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS23-->' + vis + '<!--/VIS23-->' + h.slice(i); colocados++; }
    s = L.put(s, key, h);
  }
  for (const key of Object.keys(por)) if (!ins[key]) s = L.put(s, key, por[key]);
  fs.writeFileSync(F, s);
  console.log(`Tema 23: cuadros ${V.length}, colocados ${colocados}`);
}
