require('../esq-virtual.js');
// Cuadros visuales del Tema 25 (parte B): Reglamento (UE) 2016/794 de Europol (págs. 68-133 de tu PDF 08-08-2026; págs. impresas 44-109).
//   arts. 3.2, 9, 10 (cuadro de composición), 17.1, 29, 31.2, 54.3-4, 60.10, 64.2 y Anexo I.
// Texto LITERAL de tu temario (leído de la imagen a 110-150 ppp). Colores:
//   · Con tu fosforito (leído de la imagen): arts. 3.2 a)-b), 9, 10, 17.1, 29.1 (A-X), 31.2, 54.3-4, 64.2.
//   · POR MÉTODO (en tu PDF van impresos, sin fosforito): art. 3.2 c), art. 29.2 (códigos 1)-4)), art. 60.10 y Anexo I (órganos → verde; plazos y cifras → azul; «solo/no» → rojo subrayado; conceptos → amarillo/naranja).
// Los círculos y notas a boli del temario van como pie. Uso: lo carga el Exprés/esquema (module.exports = V); sin git ni tocar esquemas.html desde aquí.
const fs = require('fs'), path = require('path');
const L = require('../literal-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;       // verde: órganos, sujetos
const A = x => `<mark class="m-accion">${x}</mark>`;          // lila/rosa: verbos de acción
const KY = x => K(Y(x)), KD = x => K(D(x));
const pie = t => `<div class="vis-pie" style="font-size:.86em;opacity:.85;margin-top:6px">✎ ${t}</div>`;
const V = []; const v = (norma, loc, html) => V.push([norma, loc, html]);
const conPie = (html, t) => html.replace(/<\/div>$/, pie(t) + '</div>');   // añade el pie dentro del cuadro

// ───────── art. 3.2 · DELITOS CONEXOS (págs. 70-71; impr. 46-47) ─────────
v('eur', 'Artículo 3 · Europol', conPie(arbol('DELITOS CONEXOS (cuadro del temario · págs. 70-71 · art. 3.2)',
  `Además de lo indicado en el apartado 1, ${D('los')} ${G('objetivos de Europol')} ${A('abarcarán')} ${Y('también')} ${D('los delitos conexos')}. Se considerarán delitos conexos:`,
  [
    `${D('a)')} ${D('los delitos')} cometidos ${Y('con objeto')} de procurarse ${Y('los medios')} para ${Y('perpetrar actos')} en los que ${G('Europol')} ${Y('sea competente')};`,
    `${D('b)')} ${D('los delitos')} cometidos para ${Y('facilitar o perpetrar actos')} en los que ${G('Europol')} ${Y('sea competente')};`,
    `${D('c)')} ${D('los delitos')} cometidos para ${Y('asegurar la impunidad')} de quienes cometen estos actos en los que ${G('Europol')} ${Y('sea competente')}.`,
  ]), 'a) y b) con tu fosforito (pág. 70); c) (pág. 71) va impreso sin fosforito: color por método.'));

// ───────── art. 9 · ESTRUCTURA ADMINISTRATIVA Y DE GESTIÓN (pág. 77; impr. 53) ─────────
{ const h = arbol('ESTRUCTURA ADMINISTRATIVA Y DE GESTIÓN DE EUROPOL (organigrama del temario · pág. 77 · art. 9)', 'EUROPOL',
    [`${G('CONSEJO DE ADMINISTRACIÓN')}`, `${G('DIRECTOR EJECUTIVO')}`, `${G('ÓRGANO CONSULTIVO')} (en su caso)`]);
  const lit = `<div class="vis-lit" style="margin:4px 0 8px">La ${G('estructura')} ${D('administrativa y de gestión')} de ${G('Europol')} estará compuesta por:<br>`
    + `${D('a)')} un ${G('Consejo de Administración')};<br>${D('b)')} un ${G('director ejecutivo')};<br>`
    + `${D('c)')} ${K('en su caso')}, otro ${G('órgano consultivo')} ${K('establecido')} por el ${G('Consejo de Administración')} ${K('de conformidad')} con el artículo ${Y('11, apartado 1, letra s)')}.</div>`;
  v('eur', 'Artículo 9 · Europol', conPie(h.replace('<div class="vis-arbol">', lit + '<div class="vis-arbol">'), 'recuadros azules a boli en «en su caso», «establecido» y «de conformidad»; marca a boli junto al encabezado.')); }

// ───────── art. 10 · CONSEJO DE ADMINISTRACIÓN: composición (pág. 78; impr. 54) ─────────
v('eur', 'Artículo 10 · Europol', conPie(tabla('CONSEJO DE ADMINISTRACIÓN (cuadro del temario · pág. 78 · art. 10)', ['Concepto', 'Contenido'], [
  { l: 'COMPOSICIÓN', c: 'o', h: [
    { t: `- ${D('un')} representante de cada ${G('Estado miembro')}. ①` },
    { t: `- ${D('un')} representante de la ${G('Comisión')}. ①` },
    { t: `• ${K('Todos')} ellos tendrán ${D('derecho a voto')}.` } ] },
  { l: 'SE TENDRÁ EN CUENTA', c: 'o', h: [
    { t: `• El ${D('principio de una representación por sexos equilibrada')}.` } ] },
  { l: 'DURACIÓN MANDATO', c: 'o', h: [
    { t: `• ${P('Cuatro años')}.` },
    { t: `• El mandato ${P('será')} ${P('prorrogable')}.` } ] },
]), 'a boli: círculos «1» junto a cada representante, «P» en el margen y un círculo con «Ex…» (lectura dudosa: EXOF/EX); recuadro azul en «Todos».'));

// ───────── art. 17.1 · FUENTES DE INFORMACIÓN (pág. 83; impr. 59) ─────────
v('eur', 'Artículo 17 · Europol', conPie(arbol('FUENTES DE INFORMACIÓN (cuadro del temario · pág. 83 · art. 17.1)',
  `${G('Europol')} ${KY('solamente')} ${A('podrá tratar')} la ${Y('información')} que le haya ${Y('sido facilitada por')}:`,
  [
    `${D('a)')} los ${G('Estados miembros')}, ${K('de conformidad')} con su ${Y('Derecho nacional')} y con el artículo ${Y('7')};`,
    `${D('b)')} ${G('organismos de la Unión, países terceros y organizaciones internacionales')}, ${K('de conformidad')} con el ${Y('capítulo V')};`,
    `${D('c)')} por ${G('entidades privadas y particulares')} de ${K('conformidad')} con el ${Y('capítulo V')}.`,
  ]), 'recuadros azules a boli en «de conformidad» y marca «V» sobre «y».'));

// ───────── art. 29 · CÓDIGOS DE EVALUACIÓN DE FUENTES (págs. 99-100; impr. 75) ─────────
v('eur', 'Artículo 29 · Europol', conPie(cols('CÓDIGOS DE EVALUACIÓN DE FUENTES (art. 29 · pág. 99 · apartados 1 y 2)', [
  { t: D('1. FIABILIDAD DE LA FUENTE · A, B, C, X'), l: [
    `La ${D('fiabilidad de la fuente de la información')} procedente de un Estado miembro ${A('será valorada')} en la ${Y('medida de lo posible')} por el ${G('Estado miembro que haya facilitado los datos')}, utilizando los siguientes ${D('códigos')} de ${D('evaluación de fuentes')}:`,
    `${D('A)')}: cuando ${K('no quepa duda')} sobre la autenticidad, veracidad y competencia de la fuente o si la información es facilitada por una fuente que haya resultado ser fiable en todos los casos;`,
    `${D('B)')}: cuando la información sea facilitada por una fuente que haya resultado ${D('ser fiable en la mayoría de los casos')};`,
    `${D('C)')}: cuando la información sea facilitada por una fuente que haya resultado ${D('ser poco fiable en la mayoría de los casos')};`,
    `${D('X)')}: cuando ${D('no pueda determinarse la fiabilidad de la fuente')}.` ] },
  { t: D('2. EXACTITUD DE LA INFORMACIÓN · 1, 2, 3, 4'), l: [
    `La ${D('exactitud de la información')} procedente de un Estado miembro ${A('será valorada')} en la ${Y('medida de lo posible')} por el ${G('Estado miembro que haya facilitado los datos')} utilizando los siguientes ${D('códigos de evaluación de fuentes')}:`,
    `${D('1)')}: información sobre cuya exactitud ${K('no')} exista duda alguna;`,
    `${D('2)')}: información conocida personalmente por la fuente, pero ${K('no')} conocida personalmente por el funcionario que la transmite;`,
    `${D('3)')}: información ${K('no')} conocida personalmente por la fuente, pero corroborada por otra información ya registrada;`,
    `${D('4)')}: información ${K('no')} conocida personalmente por la fuente y que ${K('no')} puede ser corroborada.` ] },
]), 'apartado 1 con tu fosforito (naranja en «fiabilidad…», «códigos», A-B-C-X); apartado 2 (códigos 1-4) impreso sin fosforito: color por método. Círculo a boli en el «1.»'));

// ───────── art. 31.2 · REEXAMEN DE LA CONSERVACIÓN (pág. 101; impr. 77) ─────────
v('eur', 'Artículo 31 · Europol', conPie(plazos('REEXAMEN DE LA CONSERVACIÓN: 3 AÑOS (cuadro del temario · pág. 101 · art. 31.2)', [
  ['3 años', `${G('Europol')} ${A('reexaminará')}, ${K('en todo caso')}, ${Y('la necesidad de prolongar el período de conservación')} a ${P('más tardar tres años')} después del comienzo del tratamiento inicial de los datos personales.`],
  ['+3 años', `${G('Europol')} ${A('podrá decidir prolongar')} el período de conservación de los datos personales ${Y('hasta el reexamen siguiente')}, que tendrá lugar transcurrido ${P('un nuevo período de tres años')}, si sigue siendo necesario ${Y('para el desempeño de sus tareas')}. Las razones para prolongar el período de conservación ${A('deberán justificarse y registrarse')}.`],
  ['Sin decisión', `De ${Y('no tomarse una decisión')} sobre la prolongación de la conservación de los datos personales, estos se ${D('cancelarán automáticamente')} ${P('al cabo de tres años')}.`],
]), 'pin «R23» a boli junto al apartado 1; marca «R» junto al «2.».'));

// ───────── art. 54.3 y 54.4 · MANDATO DEL DIRECTOR EJECUTIVO (pág. 117; impr. 93) ─────────
v('eur', 'Artículo 54 · Europol', conPie(flujo('MANDATO DEL DIRECTOR EJECUTIVO (cuadros del temario · pág. 117 · art. 54.3 y 54.4)', [
  { et: '54.3 · DURACIÓN Y EVALUACIÓN', c: 'o', t: `${D('El mandato del director ejecutivo')} ${A('tendrá una')} ${P('duración de cuatro años')}. ${Y('Al final de ese período')}, la ${G('Comisión')}, ${D('en asociación')} con el ${G('Consejo de Administración')}, ${D('llevará a cabo')}:<br>${D('a)')} ${Y('una valoración')} teniendo en cuenta una evaluación de la actuación del director ejecutivo, y<br>${D('b)')} ${Y('las futuras tareas y retos')} de Europol.` },
  { et: '54.4 · PRÓRROGA', c: 'v', t: `El ${G('Consejo')}, ${D('a propuesta')} del ${G('Consejo de Administración')}, que tendrá en cuenta la valoración contemplada en el apartado 3, ${A('podrá prorrogar')} el ${Y('mandato del director ejecutivo')} ${KY('solo una vez')} ${P('y por un período máximo de cuatro años')}.` },
]), 'círculos a boli «EXO» junto a cada recuadro (apartados 3 y 4); recuadro azul en «solo una vez (y)».'));

// ───────── art. 60.10 · APROBACIÓN DE LA GESTIÓN (pág. 120; impr. 96) ─────────
v('eur', 'Artículo 60 · Europol', conPie(flujo('APROBACIÓN DE LA GESTIÓN DEL DIRECTOR EJECUTIVO (cuadro del temario · pág. 120 · art. 60.10)', [
  { et: '60.10', c: 'o', t: `El ${G('Parlamento Europeo')}, previa recomendación del ${G('Consejo')} por ${P('mayoría cualificada')}, ${A('aprobará')}, ${P('antes del 15 de mayo del ejercicio N + 2')}, ${D('la gestión del director ejecutivo')} con respecto a la ejecución del presupuesto del ejercicio presupuestario del año N.` },
]), 'cuadro impreso sin fosforito (solo negrita/subrayado de imprenta): color por método.'));

// ───────── art. 64.2 · RÉGIMEN LINGÜÍSTICO (pág. 121; impr. 97) ─────────
v('eur', 'Artículo 64 · Europol', conPie(flujo('RÉGIMEN LINGÜÍSTICO INTERNO (cuadro del temario · pág. 121 · art. 64.2)', [
  { et: '64.2', c: 'o', t: `El ${G('Consejo de Administración')} ${A('decidirá')} por ${D('mayoría de dos tercios')} de sus miembros ${Y('el régimen lingüístico')} interno de ${G('Europol')}.` },
]), 'tu fosforito: lila en «Consejo de Administración decidirá», naranja en «mayoría de dos tercios», amarillo en «el régimen lingüístico».'));

// ───────── ANEXO I · FORMAS DE DELINCUENCIA (pág. 127; impr. 103) ─────────
{ const it = ['terrorismo', 'delincuencia organizada', 'tráfico de estupefacientes', 'actividades de blanqueo de capitales', 'delitos relacionados con materiales nucleares o sustancias radiactivas', 'tráfico de inmigrantes', 'trata de seres humanos', 'delincuencia relacionada con el tráfico de vehículos robados', 'homicidio voluntario y agresión con lesiones graves', 'tráfico ilícito de órganos y tejidos humanos', 'secuestro, retención ilegal y toma de rehenes', 'racismo y xenofobia', 'robo y hurto con agravantes', 'tráfico ilícito de bienes culturales, incluidas las antigüedades y obras de arte', 'fraude y estafa', 'delitos contra los intereses financieros de la Unión', 'operaciones con información privilegiada y manipulación del mercado', 'chantaje y extorsión', 'violación de derechos de propiedad industrial y falsificación de mercancías', 'falsificación de documentos administrativos y tráfico de documentos administrativos falsos', 'falsificación de moneda, falsificación de medios de pago', 'delito informático', 'corrupción', 'tráfico ilícito de armas, municiones y explosivos', 'tráfico ilícito de especies animales protegidas', 'tráfico ilícito de especies y variedades vegetales protegidas', 'delitos contra el medio ambiente, incluida la contaminación procedente de buques', 'tráfico ilícito de sustancias hormonales y otros factores de crecimiento', 'abusos sexuales y explotación sexual, incluido el material sobre abuso de menores y la captación de menores con fines sexuales', 'genocidio, crímenes de lesa humanidad y crímenes de guerra'];
  const fmt = (s, i) => `- ${D(s.split(/[ ,]/)[0])}${s.slice(s.split(/[ ,]/)[0].length)}${i === it.length - 1 ? '.' : ','}`;
  const m = Math.ceil(it.length / 2);
  v('eur', 'ANEXO I · Europol', conPie(cols('ANEXO I · LISTA DE FORMAS DE DELINCUENCIA A LAS QUE HACE REFERENCIA EL ARTÍCULO 3, APARTADO 1 (pág. 127)', [
    { t: D('Formas de delincuencia (1-' + m + ')'), l: it.slice(0, m).map(fmt) },
    { t: D('Formas de delincuencia (' + (m + 1) + '-' + it.length + ')'), l: it.slice(m).map((s, k) => fmt(s, m + k)) },
  ]), 'página impresa sin fosforito ni boli: solo se resalta (naranja) la primera palabra de cada forma, por método.')); }

module.exports = V;
if (require.main === module) {
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  const CLAVE = { eur: 'T25_EUR' };
  let colocados = 0; const por = {};
  for (const k of Object.values(CLAVE)) por[k] = L.get(s, k).html.replace(/<!--VIS25B-->[\s\S]*?<!--\/VIS25B-->/g, '');
  const ins = {};
  for (const [norma, loc, vis] of V) {
    const key = CLAVE[norma], h = por[key], k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; if (norm(h.slice(a, b)).includes(k)) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', norma, loc.slice(0, 60)); continue; }
    (ins[key] = ins[key] || []).push([i, vis]);
  }
  for (const key of Object.keys(ins)) {
    let h = por[key]; const orden = ins[key].map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS25B-->' + vis + '<!--/VIS25B-->' + h.slice(i); colocados++; }
    s = L.put(s, key, h);
  }
  for (const key of Object.keys(por)) if (!ins[key]) s = L.put(s, key, por[key]);
  fs.writeFileSync(F, s);
  console.log(`Tema 25 (B): cuadros ${V.length}, colocados ${colocados}`);
}
