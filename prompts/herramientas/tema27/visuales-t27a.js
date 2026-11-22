require('../esq-virtual.js');
// Cuadros visuales del Tema 27 (parte a): recrean los cuadros/esquemas de tu PDF subrayado
// (TEMA 27 DEONTOLOGIA PROFESIONAL-2026-08-08.pdf, págs. 8-24 del PDF, 1-based: Principios básicos ONU, Resolución 690/1979, Código Europeo de Ética de la Policía) con su texto literal.
//   Ley 1 (ONU): pág. 8 (preámbulo, 4 recuadros), 10 (principio 9), 11 (reuniones ilícitas, principio 14), 12 (calificaciones y capacitación, principios 18-19), 13 (asesoramiento, principio 21)
//   Ley 2 (Resolución 690): pág. 17 (B.7), 18 (C.4)
//   Ley 3 (Código Europeo): pág. 19 (punto 1)
// COLORES: leídos de TU PDF (fosforito dentro del cuadro: amarillo Y, salmón D, subrayado rojo K, círculos O, ✱) en págs. 10, 11, 17, 18 y 19 y en el rótulo «PRINCIPIOS» de la pág. 8;
//   el RESTO de cuadros vienen IMPRESOS sin tu fosforito (págs. 8 —salvo el rótulo—, 12 y 13) y van con el MÉTODO: órganos → verde, plazos/cifras → azul,
//   «no / salvo / únicamente» → rojo subrayado, conceptos clave → amarillo/naranja.
// LOCALIZADOR: v(ley, loc, html): ley 1=onu 2=pol 3=cee; loc = cabecera de la ficha del esquema tras la que se inserta.
const { R, P, D, Y, K, X, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const KY = x => K(Y(x)), KD = x => K(D(x));
const O = x => `<span class="m-circulo">${x}</span>`;
const AS = '<span class="m-ast"></span>';
const V = []; const v = (ley, loc, html) => V.push([ley, loc, html]);
const S1 = 'Principios básicos ONU', S2 = 'Declaración sobre la Policía', S3 = 'Código Europeo de Ética de la Policía';

// ───────── ONU · preámbulo (pág. 8): esquema de 4 recuadros ─────────
v(1, `Preámbulo · ${S1}`, arbol('EMPLEO DE LA FUERZA Y ARMAS DE FUEGO (esquema de 4 recuadros · pág. 8 · preámbulo)', `EMPLEO DE LA FUERZA Y ARMAS DE FUEGO · ${D('PRINCIPIOS')}`, [
  `La ${Y('amenaza a la vida')} y a la ${Y('seguridad')} de los funcionarios encargados de hacer cumplir la ley debe considerarse como una ${Y('amenaza a la estabilidad de toda la sociedad')}.`,
  `Desempeñan un ${Y('papel fundamental')} en la protección del ${Y('derecho a la vida, la libertad y la seguridad')} de las personas.`,
  `Podrán usar la fuerza ${KY('sólo')} cuando sea ${Y('estrictamente necesario')} y en la medida que lo requiere el desempeño de sus tareas.`,
  `El empleo de la fuerza y las armas de fuego por los funcionarios encargados de hacer cumplir la ley debe conciliarse con el debido ${Y('respeto de los derechos humanos')}.`,
]));

// ───────── ONU · principio 9 (pág. 10) ─────────
v(1, `Principio 9 · ${S1}`, cols(`CASOS QUE JUSTIFICAN EL EMPLEO DE ARMAS DE FUEGO (cuadro · pág. 10 · principio 9) ${AS}`, [
  { t: D('CASOS QUE JUSTIFICAN EL EMPLEO DE ARMAS DE FUEGO'), l: [
    `${Y('En')} ${KY('DEFENSA PROPIA')}${O('O')}${Y('DE OTRAS PERSONAS')}${O('Y')}${Y('QUE ESTÉ EN')} ${KY('PELIGRO INMINENTE DE MUERTE')}${O('O')}${KY('LESIONES GRAVES.')}`,
    `${Y('PARA')} ${Y('<b>EVITAR</b>')} ${Y('LA COMISIÓN DE UN')} ${KY('DELITO PARTICULARMENTE GRAVE')} ${Y('QUE ENTRAÑE UNA')} ${KY('SERIA AMENAZA PARA LA VIDA.')}`,
    `${Y('PARA')} ${Y('<b>DETENER</b>')} ${Y('A UNA PERSONA QUE REPRESENTE UN')} ${KY('<b>PELIGRO PARA LA VIDA</b>')}${O('Y')}${Y('OPONGA')} ${KY('<b>RESISTENCIA</b>')} ${Y('A SU AUTORIDAD')}${O('O')} ${Y('PARA IMPEDIR SU')} ${Y('<b>FUGA</b>')}, ${Y('SÓLO EN CASO DE QUE RESULTEN')} ${Y('<b>INSUFICIENTES</b> MEDIDAS <b>MENOS EXTREMAS</b> PARA')} LOGRAR DICHOS OBJETIVOS.`,
    `${KY('EN CUALQUIER CASO,')} ${Y('SÓLO SE PODRÁ HACER')} ${Y('<b>USO INTENCIONAL DE ARMAS LETALES</b>')} CUANDO SEA ${KY('ESTRICTAMENTE INEVITABLE')} ${Y('PARA <b>PROTEGER UNA VIDA</b>.')}`,
  ] },
]));

// ───────── ONU · principios 13-14 (pág. 11) ─────────
v(1, `Principio 14 · ${S1}`, cols('REUNIONES ILÍCITAS (cuadro · pág. 11 · principios 13 y 14)', [
  { t: D('NO VIOLENTAS'), l: [`Los funcionarios encargados de hacer cumplir la ley ${Y('evitarán')} el empleo de la ${D('fuerza')}${O('O')}${KY('si no es posible,')} lo ${Y('<b>limitarán al mínimo necesario.</b>')}`] },
  { t: D('VIOLENTAS'), l: [
    `Los funcionarios encargados de hacer cumplir la ley ${Y('podrán utilizar armas de fuego')} cuando ${K(O('no'))} ${Y('se puedan utilizar medios menos peligrosos')}${O('Y')} ${KY('únicamente en la mínima medida')} necesaria.`,
    `Los funcionarios encargados de hacer cumplir la ley ${KY('se abstendrán de emplear las armas')} de fuego en esos casos, ${KY('salvo')} en las ${Y('circunstancias')} previstas en el ${KY('principio 9.')}`,
  ] },
]));

// ───────── ONU · principio 18 (pág. 12): calificaciones ─────────
v(1, `Principio 18 · ${S1}`, arbol('CALIFICACIONES (cuadro impreso, sin fosforito · pág. 12 · principio 18)', D('CALIFICACIONES'), [
  `Deben ser ${Y('seleccionados')} mediante ${Y('<b>procedimientos adecuados.</b>')}`,
  `Deben contar con ${Y('aptitudes éticas, psicológicas y físicas')} apropiadas (${Y('examen periódico')}).`,
]));
// ───────── ONU · principio 19 (pág. 12): capacitación ─────────
v(1, `Principio 19 · ${S1}`, arbol('CAPACITACIÓN (cuadro impreso, sin fosforito · pág. 12 · principio 19)', D('CAPACITACIÓN'), [
  `Recibirán ${Y('capacitación profesional <b>continua y completa.</b>')}`,
  `Deben recibir ${Y('<b>formación en el uso de la fuerza</b>')} y ser ${Y('evaluados')} en su actuación.`,
]));

// ───────── ONU · principio 21 (pág. 13): asesoramiento ─────────
v(1, `Principio 21 · ${S1}`, arbol('ASESORAMIENTO (esquema impreso, sin fosforito · pág. 13 · principio 21)', `${D('ASESORAMIENTO')} · ${Y('Se debe prestar especial atención')}`, [
  D('Ética policial.'), D('Derechos Humanos.'), Y('Solución pacífica de conflictos.'),
  `${Y('Estudio del comportamiento')} de las multitudes y las ${Y('técnicas de persuasión, negociación y mediación.')}`,
  `Desarrollo de los ${Y('medios técnicos')} para ${Y('limitar el empleo de la fuerza')} y de las armas de fuego.`,
]));

// ───────── Resolución 690 · B.7 (pág. 17) ─────────
v(2, `Punto B.7 · ${S2}`, cols('ORGANIZACIÓN PROFESIONAL POLICIAL REPRESENTATIVA (cuadro · pág. 17 · B.7)', [
  { t: `Una ${Y('organización profesional policial,')} supuesto que sea ${Y('representativa,')} ${Y('debe poder:')}`, l: [
    `${Y('Participar en las negociaciones')} relativas al ${KY('status profesional')} de las funciones de Policía.`,
    `${Y('Ser consultada')} sobre la ${Y('gestión')} de los ${Y('Cuerpos')} de Policía.`,
    `${Y('Entablar cualquier acción judicial en beneficio')} de un ${Y('funcionario de Policía o de un grupo')} de funcionarios de Policía;`,
  ] },
]));

// ───────── Resolución 690 · C.4 (pág. 18) ─────────
v(2, `Punto C.4 · ${S2}`, cols('EN CASO DE OCUPACIÓN, UN FUNCIONARIO DE POLICÍA NO DEBE (cuadro · pág. 18 · C.4)', [
  { t: `${Y('En caso de ocupación,')} un funcionario de Policía ${K(O('no'))} ${KY('debe:')}`, l: [
    `${KY('Tomar parte en acciones contra')} los miembros de movimientos de ${KY('resistencia.')}`,
    `${Y('<b>Prestar su colaboración</b>')} a la aplicación de ${Y('medidas')} que tengan por ${KY('finalidad')} emplear la ${Y('población civil a fines militares')}${O('Y')}a la ${Y('vigilancia de instalaciones militares.')}`,
  ] },
]));

// ───────── Código Europeo · punto 1 (pág. 19) ─────────
v(3, `Punto 1 · ${S3}`, cols('OBJETIVOS DE LA POLICÍA (cuadro · pág. 19 · punto 1) ' + AS, [
  { t: `Los ${Y('<b>principales objetivos</b>')} de la policía consisten en:`, l: [
    `a) ${Y('<b>Garantizar</b>')} el mantenimiento de la ${Y('tranquilidad pública,')} el ${Y('respeto de la ley')}${O('y')}del ${Y('orden')} en la sociedad.`,
    `b) ${Y('<b>Proteger y respetar</b>')} las ${Y('libertades y derechos fundamentales')} del individuo tal como son consagrados, principalmente, en el ${Y('Convenio Europeo de Derechos Humanos.')}`,
    `c) ${Y('<b>Prevenir y combatir</b>')} la ${KY('delincuencia.')}`,
    `d) ${D('<b>Seguir el rastro</b>')} de la ${Y('delincuencia.')}`,
    `e) ${Y('<b>Facilitar asistencia y servicios</b>')} a la ${KY('población.')}`,
  ] },
]));

module.exports = V;
if (require.main === module) {
  const fs = require('fs'), path = require('path'), L = require('../literal-lib.js');
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  const CLAVE = { 1: 'T27_ONU', 2: 'T27_POL', 3: 'T27_CEE' };
  let colocados = 0; const por = {};
  for (const k of Object.values(CLAVE)) por[k] = L.get(s, k).html.replace(/<!--VIS27A-->[\s\S]*?<!--\/VIS27A-->/g, '');
  const ins = {};
  for (const [ley, loc, vis] of V) {
    const key = CLAVE[ley], h = por[key], k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; const hd = (h.slice(a, b).match(/articulo-head">([\s\S]*?)<\/div>/) || [])[1] || ''; if (norm(hd) === k || norm(hd).startsWith(k)) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', ley, loc.slice(0, 60)); continue; }
    (ins[key] = ins[key] || []).push([i, vis]);
  }
  for (const key of Object.keys(ins)) {
    let h = por[key]; const orden = ins[key].map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS27A-->' + vis + '<!--/VIS27A-->' + h.slice(i); colocados++; }
    s = L.put(s, key, h);
  }
  for (const key of Object.keys(por)) if (!ins[key]) s = L.put(s, key, por[key]);
  fs.writeFileSync(F, s);
  console.log(`Tema 27 (A): cuadros ${V.length}, colocados ${colocados}`);
}
