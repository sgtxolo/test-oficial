require('../esq-virtual.js');
// Cuadros visuales del Tema 21: recrean los cuadros de tu temario (PDF 08-08-2026) con su texto. Colores copiados de tu fosforito.
//   p169 art. 2 víctima directa/indirecta · p173 traducción e interpretación (art. 9) · p180 y p181-182 medidas de protección (arts. 23-25) — Ley 4/2015
// Uso: node prompts/herramientas/tema21/visuales-t21.js (idempotente: sustituye los anteriores marcados <!--VIS21-->). Lo usará expres/t21.js (module.exports = V).
const fs = require('fs'), path = require('path');
const L = require('../literal-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const KY = x => K(Y(x)), KD = x => K(D(x));
const V = []; const v = (norma, loc, html) => V.push([norma, loc, html]);

// ───────── p169 · art. 2 · CONCEPTO GENERAL DE VÍCTIMA ─────────
v('l4-2015', 'no seran aplicables a terceros que hubieran sufrido', cols('VÍCTIMA · CONCEPTO (cuadro del temario · pág. 169 · art. 2)', [
  { t: `${KD('Víctima directa')}`, l: [`${D('Toda persona física')} que haya sufrido un ${Y('daño o perjuicio')} sobre su propia persona o patrimonio`, `En especial: lesiones físicas o psíquicas, daños emocionales o perjuicios económicos directamente causados por la comisión de un delito`] },
  { t: `${KD('Víctima indirecta')}`, l: [`En los casos de ${Y('muerte o desaparición')} de una persona causada directamente por un delito, salvo que se trate de los responsables de los hechos`, `1.º ${D('Cónyuge no separado')} legalmente o de hecho e ${D('hijos')} del fallecido o desaparecido que convivieran con él; la persona unida a ella por análoga relación de afectividad; ${D('progenitores y parientes')} en línea recta o colateral dentro del ${P('tercer grado')} que se encontraren bajo su guarda`, `2.º En caso de no existir los anteriores: ${D('demás parientes en línea recta y sus hermanos')}, con preferencia, entre ellos, del que ostentara la representación legal de la víctima`] },
]));

// ───────── p173 · art. 9 · DERECHO A LA TRADUCCIÓN E INTERPRETACIÓN ─────────
v('l4-2015', 'la asistencia de interprete se podra prestar por medio de videoconferencia', flujo('DERECHO A LA TRADUCCIÓN E INTERPRETACIÓN (cuadro del temario · pág. 173 · art. 9)', [
  { et: 'DESTINATARIOS', c: 'o', t: `Toda víctima que ${KY('no hable')} o ${KY('no entienda')}: el ${Y('castellano')}, o la ${Y('lengua oficial')} que se utilice en la actuación de que se trate.` },
  { et: 'DERECHOS', c: 'v', t: `${D('A ser asistido gratuitamente')} por un intérprete que hable una lengua que comprenda (declaración en fase de investigación ante Juez, Fiscal o funcionarios de policía; testigo en el juicio o en cualquier otra vista oral) · ${D('A la traducción gratuita')} de las resoluciones de los arts. 7.1 y 12 (con ${K('breve resumen del fundamento')}) y de la ${Y('información esencial')} para el ejercicio de sus derechos del Título II (solicitud motivada) · ${D('A ser informada')}, en una lengua que comprenda, de ${P('fecha, lugar y hora')} del juicio. Aplicable también a personas con limitaciones auditivas o de expresión oral.` },
  { et: 'FORMA', c: 'c', t: `La asistencia de intérprete se podrá prestar por ${Y('videoconferencia')} o cualquier medio de telecomunicación (salvo que se acuerde la presencia física). La traducción es ${Y('escrita')}; ${K('excepcionalmente')}, podrá sustituirse por un ${Y('resumen oral')} si se garantiza suficientemente la equidad del proceso.` },
  { et: 'RECURSOS', c: 'a', t: `En actuaciones policiales: la decisión de no facilitar interpretación o traducción ${R('podrá ser recurrida ante el Juez de Instrucción')}. La decisión judicial de no facilitarla ${R('podrá ser recurrida en apelación')}.` },
]));

// ───────── p180 · arts. 23-24 · MEDIDAS DE PROTECCIÓN: VALORACIÓN Y COMPETENCIA ─────────
v('l4-2015', 'Cualquier modificacion relevante de las circunstancias en que se hubiera basado', arbol('MEDIDAS DE PROTECCIÓN · VALORACIÓN (cuadro del temario · pág. 180 · arts. 23-24)', `La valoración tendrá especialmente en consideración:`, [
  { t: `${D('Características y circunstancias personales')} de la víctima`, sub: ['Víctima con discapacidad', 'Relación de dependencia con el autor', 'Menor de edad / necesitada de especial protección', 'Factores de especial vulnerabilidad'] },
  { t: `${D('Naturaleza del delito')}, gravedad de los perjuicios y riesgo de reiteración`, sub: ['Terrorismo', 'Organización criminal', 'Cónyuge / persona ligada por análoga relación, descendientes, ascendientes, hermanos', 'Libertad o indemnidad sexual', 'Trata de seres humanos', 'Desaparición forzada', 'Motivos racistas, antisemitas, ideología…'] },
  { t: `${D('Circunstancias del delito')}`, sub: ['En particular, si se trata de delitos violentos'] },
]));
v('l4-2015', 'Cualquier modificacion relevante de las circunstancias en que se hubiera basado', flujo('COMPETENCIA PARA VALORAR Y DETERMINAR MEDIDAS (cuadro del temario · pág. 180 · art. 24)', [
  { et: 'FASE DE INVESTIGACIÓN', c: 'o', t: `${G('Juez de Instrucción o Juez de Violencia sobre la Mujer')}, sin perjuicio de la evaluación y resolución provisionales que deberán realizar y adoptar el ${G('Fiscal')} (en sus diligencias de investigación o en procedimientos de la LO de Responsabilidad Penal de los Menores) o los ${G('funcionarios de policía')} que actúen en la fase inicial.` },
  { et: 'FASE DE ENJUICIAMIENTO', c: 'v', t: `${G('Juez o Tribunal')} a los que corresponda el conocimiento de la causa.` },
  { et: 'SIEMPRE', c: 'c', t: `La valoración incluirá ${K('siempre')} la de aquellas necesidades manifestadas por la víctima y su voluntad. En menores o personas con discapacidad necesitadas de especial protección: se tomarán en consideración ${K('sus opiniones e intereses')}.` },
]));

// ───────── p181-182 · art. 25 · MEDIDAS DE PROTECCIÓN POR FASES ─────────
v('l4-2015', 'adopcion de alguna o algunas de las medidas de proteccion a que se refiere el articulo 2 de la Ley Organica 19/1994', cols('MEDIDAS DE PROTECCIÓN · FASES (cuadro del temario · pág. 182 · art. 25)', [
  { t: `${KD('Fase de investigación')} (podrán ser adoptadas)`, l: [`${D('Declaración')} en dependencias especialmente concebidas o adaptadas a tal fin`, `Declaración por ${D('profesionales')} con formación especial, con perspectiva de género`, `Que todas las tomas de declaración a una misma víctima las realice ${D('la misma persona')}, salvo perjuicio relevante, y directamente por un Juez o un Fiscal`, `Víctimas de cónyuge/persona análoga, libertad o indemnidad sexual, trata con fines de explotación sexual: toma por persona del ${Y('mismo sexo')} que la víctima, si así lo solicita`, `Medidas que ${D('eviten el contacto visual')} con el supuesto autor, incluso durante la prueba (tecnologías de la comunicación)`, `Evitar preguntas sobre la ${D('vida privada')} sin relevancia con el hecho`] },
  { t: `${KD('Fase de enjuiciamiento')} (podrán ser adoptadas)`, l: [`Medidas para garantizar que la víctima pueda ser ${D('oída sin estar presente')} en la sala de vistas, mediante tecnologías de la comunicación`, `${D('Celebración de la vista oral sin presencia de público')}: el Juez o Presidente podrá autorizar la presencia de personas que acrediten un especial interés en la causa`, `Evitar preguntas sobre la ${D('vida privada')} sin relevancia (salvo excepción)`, `Las letras a) y c) también podrán adoptarse durante la ${P('fase de investigación')}`, `También podrán acordarse medidas del art. 2 de la ${Y('LO 19/1994')} de protección de testigos y peritos`] },
]));

module.exports = V;
if (require.main === module) {
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  let h = L.get(s, 'T21_CP').html.replace(/<!--VIS21-->[\s\S]*?<!--\/VIS21-->/g, '');
  const insertos = []; let colocados = 0;
  for (const [, loc, vis] of V) {
    const k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; if (norm(h.slice(a, b)).includes(k)) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', loc.slice(0, 60)); continue; }
    insertos.push([i, vis]);
  }
  const orden = insertos.map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
  for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS21-->' + vis + '<!--/VIS21-->' + h.slice(i); colocados++; }
  s = L.put(s, 'T21_CP', h);
  fs.writeFileSync(F, s);
  console.log(`Tema 21: cuadros ${V.length}, colocados ${colocados}`);
}
