require('../esq-virtual.js');
// Cuadros visuales del Tema 22: recrean los cuadros de tu temario (PDF 08-08-2026) con su texto literal.
//   LO 7/2021: art. 7 (deber de colaboración, p. 14) · arts. 17 y 18 (dispositivos móviles; tratamiento y conservación de las imágenes, p. 16)
//   LO 4/2015: arts. 15-16 (entrada en domicilio, p. 29) · art. 25 (actividades relevantes, p. 31) · art. 31.3 (p. 33) · art. 32 (órganos competentes, p. 34)
//              art. 33 (grados de multa, p. 35) · cuadro de infracciones (pp. 40-41) · art. 38 (p. 42) · art. 39 (pp. 42-43) · art. 40 (p. 44) · art. 42 (p. 45) · art. 43 (p. 46)
// Colores: tu PDF trae estos cuadros IMPRESOS (sin tu fosforito): van con mi método (concepto → amarillo; verbo/acción → naranja; órganos → verde; plazos y cifras → azul;
// «no / salvo / únicamente» → rojo subrayado). Las notas a boli (2 años + 1 inf., G: hasta 6 m…) van como pie.
// Uso: node prompts/herramientas/tema22/visuales-t22.js (idempotente: sustituye los anteriores marcados <!--VIS22-->). Lo usa expres-t22.js (module.exports = V).
const fs = require('fs'), path = require('path');
const L = require('../literal-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const KY = x => K(Y(x)), KD = x => K(D(x));
const pie = t => `<div class="vis-pie" style="font-size:.86em;opacity:.85;margin-top:6px">✎ ${t}</div>`;
const V = []; const v = (norma, loc, html) => V.push([norma, loc, html]);
const OF = fs.readFileSync(path.join(__dirname, '..', '..', 'temario-limpio', 'tema22', 'oficial.txt'), 'utf8').replace(/\r/g, '');
// items numerados «N. texto» de un artículo del texto oficial limpio (sin notas del TC)
const items = (cab, fin) => {
  const a = OF.indexOf(cab), b = OF.indexOf(fin, a); const L2 = OF.slice(a, b).split('\n'); const out = []; let cur = null, nota = false;
  for (const raw of L2) { const l = raw.trim(); const sg = raw.length - raw.replace(/^\s+/, '').length;
    if (!l || /^=====PAG/.test(raw) || /^Artículo /.test(l)) continue;
    if (sg >= 8 && /^(Téngase en cuenta|Asimismo, se declara)/.test(l)) { nota = true; continue; }
    if (sg >= 5 && sg < 8) { nota = false; const m = l.match(/^(\d+)\.\s+(.*)$/); if (m) { cur = { n: +m[1], t: m[2] }; out.push(cur); } else cur = null; continue; }
    if (nota || sg >= 3) continue;
    if (cur) cur.t += (/-$/.test(cur.t) ? '' : ' ') + l; }
  return out;
};

// ───────── LO 7/2021 · art. 7 · DEBER DE COLABORACIÓN (p. 14) ─────────
v('datos', 'La peticion de la Policia Judicial se debera ajustar exclusivamente', flujo('DEBER DE COLABORACIÓN (cuadro del temario · pág. 14 · art. 7)', [
  { et: 'OBLIGADOS', c: 'o', t: `${KD('Administraciones públicas')} y ${KD('cualquier persona física o jurídica')} ${D('proporcionarán')} los ${Y('datos, informes, antecedentes y justificantes')} que les soliciten y que sean necesarios para la investigación y enjuiciamiento de infracciones penales o para la ejecución de las penas.` },
  { et: 'DESTINATARIOS', c: 'v', t: `${G('Autoridad judicial')} · ${G('Ministerio Fiscal')} · ${G('Policía Judicial')}` },
  { et: 'FORMA (Policía Judicial)', c: 'c', t: `La petición se deberá ajustar ${K('exclusivamente')} al ejercicio de las funciones que le encomienda la ley y deberá efectuarse siempre de forma ${KY('motivada')}, ${KY('concreta')} y ${KY('específica')}, ${D('dando cuenta en todo caso')} a la ${G('autoridad judicial')} y ${G('fiscal')}.` },
]));
// ───────── LO 7/2021 · art. 17 · DISPOSITIVOS MÓVILES (p. 16) ─────────
v('datos', 'Podran utilizarse dispositivos de toma de imagenes y sonido de caracter movil', flujo('DISPOSITIVOS MÓVILES · toma de imágenes y sonido de carácter móvil (cuadro del temario · pág. 16 · art. 17)', [
  { et: 'REQUISITOS', c: 'o', t: `Ha de ser ${KD('conjunta')} (imagen y sonido) · Supeditada, ${K('en todo caso')}, a la concurrencia de ${D('peligro o evento concreto')} · Principios de tratamiento y ${D('proporcionalidad')}.` },
  { et: 'AUTORIZA', c: 'v', t: `Autorizado por la persona titular de la ${G('Delegación o Subdelegación del Gobierno')}.` },
  { et: 'DURACIÓN', c: 'c', t: `Las autorizaciones ${K('no')} se podrán conceder ${K('en ningún caso')} con carácter ${KD('indefinido o permanente')} (por un periodo máximo de ${P('un mes prorrogable por otro')}).` },
  { et: 'URGENCIA O NECESIDAD INAPLAZABLE', c: 'a', t: `Será competente el ${G('responsable operativo')} de las Fuerzas y Cuerpos de Seguridad competentes. Comunicación con la ${Y('mayor brevedad posible')}, y siempre en el plazo de ${P('24 horas')}, al ${G('Delegado o Subdelegado del Gobierno')} o autoridad competente de las CC.AA.` },
]));
// ───────── LO 7/2021 · art. 18 · TRATAMIENTO Y CONSERVACIÓN DE LAS IMÁGENES (p. 16) ─────────
v('datos', 'Las grabaciones seran destruidas en el plazo maximo de tres meses', cols('TRATAMIENTO Y CONSERVACIÓN DE LAS IMÁGENES (cuadro del temario · pág. 16 · art. 18)', [
  { t: KD('Hechos constitutivos de infracción penal'), l: [`A disposición judicial ${Y('a la mayor brevedad posible')}`, `En el plazo máximo de ${P('72 horas')} desde su grabación`, `De no poder redactarse el atestado en tal plazo, se relatarán ${D('verbalmente')} los hechos a la ${G('autoridad judicial')} o al ${G('Ministerio Fiscal')}, junto con la entrega de la grabación`] },
  { t: KD('Hechos constitutivos de infracción administrativa (seguridad pública)'), l: [`Remisión al ${G('órgano competente')}`, `${P('De inmediato')}`] },
  { t: KD('Destrucción de grabaciones'), l: [`En el plazo máximo de ${P('3 MESES')} desde su captación`, `${K('Salvo')} que estén relacionadas con infracciones penales o administrativas graves o muy graves en materia de seguridad pública, sujetas a una investigación policial en curso o con un procedimiento judicial o administrativo abierto`] },
]));

// ───────── LO 4/2015 · arts. 15-16 · ENTRADA EN DOMICILIO (p. 29) ─────────
v('lopsc', 'remitiran sin dilacion el acta o atestado que instruyan', cols('ENTRADA Y REGISTRO · los agentes de las FFCCSE podrán proceder a (cuadro del temario · pág. 29 · art. 15)', [
  { t: KD('Entrada y registro en domicilio'), l: [`Sólo podrán proceder en los casos permitidos por la ${KY('Constitución')} y en los términos que fijen las ${KY('Leyes')}`] },
  { t: KD('Entrada en domicilio'), l: [`Será ${D('causa legítima')} la necesidad de ${Y('evitar daños inminentes y graves')} a las personas y a las cosas, en supuestos de: ${D('catástrofe, calamidad, ruina inminente')} u otros semejantes de extrema y urgente necesidad`, `Cuando entren en un domicilio particular ${D('remitirán sin dilación')}: ${Y('acta o atestado')} que instruyan a la ${G('autoridad judicial competente')}`] },
  { t: KD('Entrada en edificios ocupados por organismos oficiales o entidades públicas'), l: [`${K('No')} será preciso el ${D('consentimiento')} de la autoridad o funcionario que los tuviere a su cargo`] },
]));
// ───────── LO 4/2015 · art. 25 · ACTIVIDADES RELEVANTES (p. 31) ─────────
v('lopsc', 'quedaran sujetas a las obligaciones de registro documental e informacion', arbol('ACTIVIDADES RELEVANTES PARA LA SEGURIDAD CIUDADANA (cuadro del temario · pág. 31 · art. 25)', `Las personas físicas o jurídicas que ejerzan ${D('actividades relevantes para la seguridad ciudadana')}, como las de… quedarán sujetas a las obligaciones de ${Y('registro documental e información')} en los términos que establezcan las disposiciones aplicables:`, [
  { t: `${D('Hospedaje')} · ${D('transporte de personas')} ✱`, sub: [] },
  { t: `${D('Acceso comercial a servicios telefónicos o telemáticos')} de uso público mediante establecimientos abiertos al público`, sub: [] },
  { t: `${D('Comercio o reparación')} de objetos usados · ${D('alquiler o desguace')} de vehículos de motor`, sub: [] },
  { t: `${D('Compraventa de joyas y metales')}, ya sean preciosos o no, objetos u obras de arte`, sub: [] },
  { t: `${D('Cerrajería de seguridad')} ✱ · centros gestores de residuos metálicos · establecimientos de comercio al por mayor de ${D('chatarra o productos de desecho')} · venta de ${D('productos químicos peligrosos')} a particulares`, sub: [] },
]));
// ───────── LO 4/2015 · art. 31.3 (p. 33) ─────────
v('lopsc', 'no podra ser sancionada como infraccion independiente', flujo('ACCIÓN U OMISIÓN TENIDA EN CUENTA COMO CRITERIO (cuadro del temario · pág. 33 · art. 31.3)', [
  { et: 'CUANDO UNA ACCIÓN U OMISIÓN DEBA TOMARSE EN CONSIDERACIÓN COMO', c: 'o', t: `${D('Criterio de graduación')} de la sanción · o como ${D('circunstancia que determine la calificación')} de la infracción` },
  { et: 'EFECTO', c: 'v', t: `${KD('No podrá ser sancionada como infracción independiente')}.` },
]));
// ───────── LO 4/2015 · art. 32 · ÓRGANOS COMPETENTES (p. 34) ─────────
v('lopsc', 'para la sancion de las infracciones graves y leves', cols('ÓRGANOS COMPETENTES · Administración General del Estado (cuadro del temario · pág. 34 · art. 32)', [
  { t: G('Ministro del Interior'), l: [`Sanción de las infracciones ${P('muy graves en grado máximo')}`] },
  { t: G('Secretario de Estado de Seguridad'), l: [`Sanción de las infracciones ${P('muy graves en grado medio y en grado mínimo')}`] },
  { t: G('Delegados del Gobierno en las comunidades autónomas y en las Ciudades de Ceuta y Melilla'), l: [`Sanción de las infracciones ${P('graves y leves')}`] },
]));
// ───────── LO 4/2015 · art. 33 · GRADOS DE LA MULTA (p. 35) ─────────
v('lopsc', 'Las infracciones solo se sancionaran con multa en grado maximo', cols('INFRACCIONES MUY GRAVES Y GRAVES · GRADOS DE LA MULTA (cuadro del temario · pág. 35 · art. 33)', [
  { t: `${KD('Mínimo')}`, l: [`La ${D('comisión de una infracción')} determinará la imposición de la multa correspondiente en ${P('grado mínimo')}`] },
  { t: `${KD('Medio')} (al menos una circunstancia)`, l: [`${D('Reincidencia')}: más de una infracción de la misma naturaleza en el término de ${P('dos años')}, declarado por resolución firme en vía administrativa`, `${D('Violencia, amenaza o intimidación')}`, `${D('Prenda u objeto que cubra el rostro')}, impidiendo o dificultando la identificación`, `${D('Utilización de menores')} de edad, personas con discapacidad necesitadas de especial protección o en situación de vulnerabilidad`] },
  { t: `${KD('Máximo')} (sólo cuando…)`, l: [`Los hechos revistan ${KY('especial gravedad')} y así se justifique teniendo en cuenta el ${D('número y la entidad de las circunstancias')} concurrentes y los criterios previstos en este apartado`] },
]) + pie('Notas a boli del temario: «2 años + 1 inf.» (reincidencia: dos años y más de una infracción).'));
// ───────── LO 4/2015 · arts. 35-37 · CUADRO DE INFRACCIONES (pp. 40-41) ─────────
{
  const mg = items('Artículo 35. Infracciones muy graves.', 'Artículo 36.'), gr = items('Artículo 36. Infracciones graves.', 'Artículo 37.'), le = items('Artículo 37. Infracciones leves.', 'Artículo 38.');
  const col = (t, a) => ({ t, l: a.map(x => `${D(x.n + '.')} ${x.t}`) });
  v('lopsc', 'Son infracciones leves', cols('CUADRO DE INFRACCIONES · leves, graves y muy graves (cuadro del temario · págs. 40-41 · arts. 35 a 37)', [col(KD('Leves (art. 37)'), le), col(KD('Graves (art. 36)'), gr), col(KD('Muy graves (art. 35)'), mg)]));
}
// ───────── LO 4/2015 · art. 38 · PRESCRIPCIÓN DE LAS INFRACCIONES (p. 42) ─────────
v('lopsc', 'Las infracciones administrativas tipificadas en esta Ley prescribiran a los seis meses', plazos('PRESCRIPCIÓN DE LAS INFRACCIONES (cuadro del temario · pág. 42 · art. 38)', [['6 meses', `Infracciones ${D('leves')}`], ['1 año', `Infracciones ${D('graves')}`], ['2 años', `Infracciones ${D('muy graves')}`]]));
// ───────── LO 4/2015 · art. 39 · SANCIONES Y GRADOS (pp. 42-43) ─────────
v('lopsc', 'Las infracciones muy graves se sancionaran con multa de 30.001 a 600.000 euros', tabla('SANCIONES POR INFRACCIONES (cuadros del temario · págs. 42-43 · art. 39)', ['Infracción · grado', 'Multa'], [
  { l: 'MUY GRAVES · 30.001 a 600.000 €', c: 'o', h: [{ p: 'Mínimo', c: 'n', t: 'de 30.001 a 220.000 euros' }, { p: 'Medio', c: 'n', t: 'de 220.001 a 410.000 euros' }, { p: 'Máximo', c: 'n', t: 'de 410.001 a 600.000 euros' }] },
  { l: 'GRAVES · 601 a 30.000 €', c: 'v', h: [{ p: 'Mínimo', c: 'n', t: 'de 601 a 10.400 euros' }, { p: 'Medio', c: 'n', t: 'de 10.401 a 20.200 euros' }, { p: 'Máximo', c: 'n', t: 'de 20.201 a 30.000 euros' }] },
  { l: 'LEVES', c: 'c', h: [{ p: '100 a 600 €', c: 'n', t: 'multa de 100 a 600 euros' }] },
]) + pie('Notas a boli del temario (art. 39.2): «Suspensión temporal / clausuras»: graves hasta 6 meses; muy graves de 6 meses y 1 día a 2 años · en reincidencia: graves hasta 2 años; muy graves de 2 años y 1 día a 6 años.'));
// ───────── LO 4/2015 · art. 40 · PRESCRIPCIÓN DE LAS SANCIONES (p. 44) ─────────
v('lopsc', 'Las sanciones impuestas por infracciones muy graves prescribiran a los tres anos', plazos('PRESCRIPCIÓN DE LAS SANCIONES (cuadro del temario · pág. 44 · art. 40)', [['3 años', `Sanciones por infracciones ${D('muy graves')}`], ['2 años', `Sanciones por infracciones ${D('graves')}`], ['1 año', `Sanciones por infracciones ${D('leves')}`]]) + pie('Computados desde el <u class="m-clave">día siguiente</u> a aquel en que adquiera firmeza en vía administrativa la resolución por la que se impone la sanción.'));
// ───────── LO 4/2015 · art. 42 · REPARACIÓN DEL DAÑO E INDEMNIZACIÓN (p. 45) ─────────
v('lopsc', 'La responsabilidad civil derivada de una infraccion sera siempre solidaria', flujo('REPARACIÓN DEL DAÑO E INDEMNIZACIÓN (cuadro del temario · pág. 45 · art. 42)', [
  { et: 'SI LAS CONDUCTAS HUBIERAN OCASIONADO DAÑOS O PERJUICIOS A LA ADMINISTRACIÓN PÚBLICA', c: 'o', t: `La ${D('resolución del procedimiento')} contendrá un pronunciamiento expreso acerca de la exigencia al infractor de:` },
  { et: '1.º REPOSICIÓN', c: 'v', t: `A su ${KD('estado originario')} de la situación alterada por la infracción.` },
  { et: '2.º INDEMNIZACIÓN', c: 'c', t: `Cuando ello ${K('no')} fuera posible: por los ${D('daños y perjuicios')} ocasionados, cuando queden determinados durante el procedimiento. Si el importe no quedó establecido: ${D('procedimiento complementario')}, susceptible de terminación convencional, cuya resolución pondrá fin a la vía administrativa.` },
  { et: 'RESPONSABILIDAD CIVIL', c: 'a', t: `Será siempre ${P('solidaria')} entre todos los causantes del daño. Autor menor de 18 años no emancipado o con la capacidad modificada judicialmente: responden solidariamente con él sus ${G('padres, tutores, curadores, acogedores o guardadores legales o de hecho')}, según proceda.` },
]));
// ───────── LO 4/2015 · art. 43 · CANCELACIÓN DE LOS ASIENTOS (p. 46) ─────────
v('lopsc', 'Los asientos se cancelaran de oficio transcurridos tres anos', plazos('CANCELACIÓN DE LOS ASIENTOS POR INFRACCIONES · de oficio (cuadro del temario · pág. 46 · art. 43)', [['3 años', `Infracciones ${D('muy graves')}`], ['2 años', `Infracciones ${D('graves')}`], ['1 año', `Infracciones ${D('leves')}`]]) + pie('A contar desde la <u class="m-clave">firmeza</u> de la sanción.'));

module.exports = V;
if (require.main === module) {
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  const CLAVE = { reunion: 'T22_RE', datos: 'T22_DP', lopsc: 'T22_CP' };
  let colocados = 0; const por = {};
  for (const k of Object.values(CLAVE)) por[k] = L.get(s, k).html.replace(/<!--VIS22-->[\s\S]*?<!--\/VIS22-->/g, '');
  const ins = {};
  for (const [norma, loc, vis] of V) {
    const key = CLAVE[norma], h = por[key], k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; if (norm(h.slice(a, b)).includes(k)) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', norma, loc.slice(0, 60)); continue; }
    (ins[key] = ins[key] || []).push([i, vis]);
  }
  for (const key of Object.keys(ins)) {
    let h = por[key]; const orden = ins[key].map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS22-->' + vis + '<!--/VIS22-->' + h.slice(i); colocados++; }
    s = L.put(s, key, h);
  }
  for (const key of Object.keys(por)) if (!ins[key]) s = L.put(s, key, por[key]);
  fs.writeFileSync(F, s);
  console.log(`Tema 22: cuadros ${V.length}, colocados ${colocados}`);
}
