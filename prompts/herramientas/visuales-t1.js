// Genera los esquemas visuales (árboles, flujos, comparaciones, plazos) del Tema 1 y los inserta en esquemas.html
// justo después de la ficha del artículo que ilustran. Idempotente: se puede ejecutar cuantas veces haga falta.
// Uso: node prompts/herramientas/visuales-t1.js
// Texto literal del temario; las respuestas de los tests van en R(...) (mismo marcado dorado/rojo que el articulado).
// Los colores de autoridades (verde) y futuros (lila) los aplica reglas-color.js sobre cada texto.
const fs = require('fs');
const { aplica } = require('./reglas-color.js');
const F = 'esquemas.html';

const CSS = `/* VISUALES: árboles, flujos, comparaciones y plazos (esquemas con cuadros y flechas) */
.vis{margin:14px 0 18px;padding:14px 14px 12px;background:var(--panel);border:1.5px solid var(--borde);border-radius:var(--radio-sm)}
.vis-t{font-weight:800;font-size:.8rem;letter-spacing:.04em;text-transform:uppercase;color:var(--verde-med);margin:0 0 10px}
.vis-t i{font-style:normal;margin-right:6px}
.vis-arbol{display:flex;align-items:center;gap:0;flex-wrap:nowrap}
.vis-raiz{flex:0 0 auto;max-width:34%;background:var(--verde);color:#fff;font-weight:800;border-radius:12px;padding:10px 12px;text-align:center;font-size:.92rem;line-height:1.25}
.vis-ramas{flex:1 1 auto;display:flex;flex-direction:column;gap:7px;margin-left:26px;position:relative}
.vis-ramas:before{content:"";position:absolute;left:-14px;top:14px;bottom:14px;border-left:2.5px solid var(--verde-med)}
.vis-rama{position:relative;background:var(--panel-alt);border:1.5px solid var(--borde);border-radius:10px;padding:7px 10px;font-size:.88rem;line-height:1.35}
.vis-rama:before{content:"";position:absolute;left:-14px;top:50%;width:14px;border-top:2.5px solid var(--verde-med)}
.vis-raiz+.vis-ramas:after{content:"";position:absolute;left:-26px;top:50%;width:12px;border-top:2.5px solid var(--verde-med)}
.vis-rama b{color:var(--verde-osc)}
.vis-sub{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.vis-sub span{background:var(--panel);border:1.5px solid var(--borde);border-radius:8px;padding:4px 8px;font-size:.84rem;line-height:1.3}
.vis-flujo{display:flex;flex-direction:column;align-items:stretch;gap:0}
.vis-paso{background:var(--panel-alt);border:1.5px solid var(--borde);border-radius:10px;padding:8px 12px;font-size:.88rem;line-height:1.35;position:relative}
.vis-paso.si{border-color:#2f8f5b}.vis-paso.no{border-color:#c0392b}
.vis-paso .et{display:inline-block;font-weight:800;font-size:.72rem;border-radius:6px;padding:1px 7px;margin-right:6px;background:var(--verde);color:#fff}
.vis-paso.si .et{background:#2f8f5b}.vis-paso.no .et{background:#c0392b}
.vis-flecha{align-self:center;color:var(--verde-med);font-size:1.25rem;line-height:1;padding:2px 0;font-weight:900}
.vis-bifurca{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.vis-comp{display:grid;grid-template-columns:repeat(var(--n,2),1fr);gap:8px;align-items:stretch}
.vis-comp.med{grid-template-columns:1fr auto 1fr}
.vis-col{background:var(--panel-alt);border:1.5px solid var(--borde);border-radius:10px;padding:8px 11px;font-size:.88rem;line-height:1.35}
.vis-col h5{margin:0 0 5px;font-size:.9rem;color:var(--verde-osc)}
.vis-col ul{margin:0;padding-left:16px}
.vis-mid{align-self:center;font-weight:900;color:var(--verde-med);font-size:1.4rem}
.vis-plazos{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:8px}
.vis-plazo{background:var(--panel-alt);border:1.5px solid var(--borde);border-radius:10px;padding:7px 10px;font-size:.86rem;line-height:1.3}
.vis-plazo .n{display:block;font-weight:900;font-size:1.05rem;color:#0f2c3d;background:#a9d3ea;border-radius:6px;padding:1px 8px;width:max-content;margin-bottom:4px}
[data-theme="dark"] .vis-plazo .n{color:#c8e9fb;background:#1f4a63}
@media(max-width:640px){.vis-arbol{flex-direction:column;align-items:stretch}.vis-raiz{max-width:none}.vis-ramas{margin:12px 0 0 14px}.vis-ramas:before{left:-8px}.vis-rama:before{left:-8px;width:8px}.vis-raiz+.vis-ramas:after{display:none}.vis-bifurca{grid-template-columns:1fr}.vis-comp,.vis-comp.med{grid-template-columns:1fr}.vis-mid{transform:rotate(90deg)}}
`;

// ---------- marcadores de color (como en el articulado)
const R = x => `<mark class="m-resp">${x}</mark>`;       // respuesta de un test
const P = x => `<mark class="m-plazo">${x}</mark>`;      // plazos, cifras
const D = x => `<mark class="m-destacable">${x}</mark>`; // conceptos clave
const Y = x => `<mark class="m-personalizado">${x}</mark>`;
const K = x => `<u class="m-clave">${x}</u>`;            // no, salvo, únicamente, en todo caso…
const X = s => aplica(s);

// ---------- componentes
const arbol = (titulo, raiz, ramas) => `<div class="vis"><div class="vis-t"><i>🌳</i>${titulo}</div><div class="vis-arbol"><div class="vis-raiz">${X(raiz)}</div><div class="vis-ramas">${ramas.map(r => typeof r === 'string' ? `<div class="vis-rama">${X(r)}</div>` : `<div class="vis-rama">${X(r.t)}<div class="vis-sub">${r.sub.map(s => `<span>${X(s)}</span>`).join('')}</div></div>`).join('')}</div></div></div>`;
const paso = p => typeof p === 'string' ? `<div class="vis-paso">${X(p)}</div>` : `<div class="vis-paso ${p.c || ''}">${p.et ? `<span class="et">${p.et}</span>` : ''}${X(p.t)}</div>`;
const flujo = (titulo, pasos) => `<div class="vis"><div class="vis-t"><i>➜</i>${titulo}</div><div class="vis-flujo">${pasos.map(p => p && p.bif ? `<div class="vis-bifurca">${p.bif.map(paso).join('')}</div>` : paso(p)).join('<div class="vis-flecha">↓</div>')}</div></div>`;
const cols = (titulo, columnas, medio) => `<div class="vis"><div class="vis-t"><i>⇄</i>${titulo}</div><div class="vis-comp${medio ? ' med' : ''}" style="--n:${columnas.length}">${columnas.map((c, i) => `<div class="vis-col"><h5>${X(c.t)}</h5><ul>${c.l.map(x => `<li>${X(x)}</li>`).join('')}</ul></div>${medio && i === 0 ? `<div class="vis-mid">${medio}</div>` : ''}`).join('')}</div></div>`;
const plazos = (titulo, items) => `<div class="vis"><div class="vis-t"><i>⏱</i>${titulo}</div><div class="vis-plazos">${items.map(([n, t]) => `<div class="vis-plazo"><span class="n">${n}</span>${X(t)}</div>`).join('')}</div></div>`;

// ---------- diagramas: [después de la ficha cuyo encabezado empieza por…, html]
const V = [];
const v = (despues, html) => V.push([despues, html]);

/* ============ LEY ORGÁNICA 18/2003 ============ */
v('Artículo 3 — De la cooperación activa', cols('Cooperación pasiva vs. activa (LO 18/2003, arts. 2 y 3)',
  [{ t: `${D('PASIVA')} · art. 2`, l: [`España prestará ${R('plena cooperación')} a la Corte`, `${K('en especial')}: ${R('art. 86')} del Estatuto`, 'La presta España a la Corte'] },
   { t: `${D('ACTIVA')} · art. 3`, l: [`Órganos judiciales y Ministerio Fiscal podrán dirigir solicitudes a la Corte`, `Por conducto del ${R('Ministerio de Justicia')}`, `En ${R('un proceso que se siguiere en España')} · ${R('art. 93.10')} del Estatuto`] }], '⇄'));
v('Artículo 4 — De las autoridades competentes', arbol('Autoridades competentes (LO 18/2003, art. 4)', `${D('Autoridades competentes')} para aplicar la ley`, [
  `a) El ${R('Gobierno')}`, `b) El ${R('Ministerio de Justicia')}`,
  `c) El ${R('Ministerio de Asuntos Exteriores')}: ${R('en los casos previstos en esta ley y, en todo caso, cuando intervinieran factores de política exterior')}`,
  'd) Defensa e Interior: cuando el acto de cooperación afecte a sus competencias',
  `e) Órganos judiciales de la jurisdicción ordinaria y, en particular, la ${R('Audiencia Nacional')}`,
  `f) Órganos judiciales militares y, en particular, el ${R('Tribunal Militar Central')}`,
  `g) El ${R('Ministerio Fiscal')}`]));
v('Artículo 5 — De la representación y defensa procesal', arbol('Representación de España ante la Corte (art. 5)', `${D('Representación y defensa en juicio')}`, [
  `Corresponde a los ${R('Abogados del Estado integrados en la Abogacía General del Estado')}`,
  `Instrucciones impartidas ${R('conjuntamente')} por el ${R('Ministerio de Justicia y el Ministerio de Asuntos Exteriores')}`,
  'Si afecta a materias de otro departamento ministerial: se oirá a éste antes',
  `Excepcional: el Gobierno, oído el Abogado General del Estado, puede nombrar un agente de España, que ${R('asumirá las funciones de Abogado del Estado')}`]));
v('Artículo 6 — De los órganos de relación y consulta con la Corte', arbol('Relación y consulta con la Corte (art. 6)', `${R('Ministerio de Justicia')}`, [
  `${R('Único órgano de relación')} entre la Corte y los órganos judiciales y el Ministerio Fiscal`,
  'También órgano de consulta con la Corte: informa antes a Exteriores',
  `Si afecta a Interior o Defensa: ${R('recabará el informe de estos departamentos')}`,
  `Si hay política exterior: ${R('será competente Exteriores, en coordinación con Justicia')}`]));
v('Artículo 8 — Del requerimiento de inhibición al Fiscal de la Corte', flujo('Requerimiento de inhibición (art. 8)', [
  { et: '1', t: 'El Fiscal de la Corte notifica el inicio de una investigación (art. 18.1 del Estatuto) al Ministerio de Justicia' },
  { et: '2', t: 'Justicia pide información urgente al Fiscal General del Estado sobre actuaciones penales' },
  { et: '3', t: `Los Ministros de Justicia y Exteriores elevan propuesta conjunta al Consejo de Ministros en plazo que no podrá rebasar ${R('veinte días')}` },
  { et: '4', t: `El Consejo de Ministros resuelve sostener la competencia española y pedir la inhibición (${R('art. 18.2 del Estatuto')})` },
  { et: '5', t: `Corresponde al ${R('Ministerio de Justicia formular la petición de inhibición')}` }]));
v('Artículo 9 — De la impugnación de la competencia de la Corte', cols('Competencia exclusiva del Gobierno (arts. 7 y 9)',
  [{ t: 'Art. 7 · denunciar una situación', l: [`${K('Exclusivamente')} el ${R('Gobierno, mediante Acuerdo del Consejo de Ministros')}`, 'A propuesta conjunta de Exteriores y Justicia', `${R('Decidir la presentación de la denuncia de una situación ante el Fiscal de la Corte')}`, `Reconsideración: ${R('art. 53.3.a)')} del Estatuto`, `Hechos en otros Estados y autores no españoles: ${R('se abstendrán de todo procedimiento')} e informan de que pueden acudir al Fiscal de la Corte`] },
   { t: 'Art. 9 · impugnar competencia o admisibilidad', l: [`${K('Exclusivamente')} el ${R('Gobierno, mediante Acuerdo del Consejo de Ministros')}`, 'A propuesta conjunta de Justicia y Exteriores', `${R('A la mayor brevedad posible, antes del inicio del juicio en la Corte')}`, `Después del inicio: solo por ${R('haberse producido ya cosa juzgada en España')}`] }], null));
v('Artículo 10 — De la inhibición de la jurisdicción española', flujo('Inhibición a favor de la Corte (arts. 8-10)', [
  { et: '8', t: `${R('Solicitud de inhibición al Fiscal de la Corte (art. 8)')}` }, { et: '9', t: `${R('Impugnación de la competencia o admisibilidad (art. 9)')}` },
  { et: '=', t: `La Sala competente de la Corte ${R('autoriza al Fiscal a proceder a la investigación o mantiene su competencia')}` },
  { et: '10', c: 'si', t: `El órgano jurisdiccional español ${R('se inhibirá a favor de la Corte y a su solicitud le remitirá lo actuado')}` }]));
v('Artículo 12 — De la libertad provisional', flujo('Libertad provisional del detenido (art. 12)', [
  { et: '1', t: 'El detenido solicita su libertad provisional' },
  { et: '2', t: `El JCI acuerda remitir la solicitud a la Corte ${R('a través del Ministerio de Justicia')}, con plazo para recibir recomendaciones que ${R('no será inferior a veinte días')}` },
  { et: '3', t: 'Mientras tanto: prisión provisional por el tiempo estrictamente necesario' },
  { et: '4', t: 'Recibidas las recomendaciones, el JCI podrá acordar la libertad si hay circunstancias urgentes y excepcionales' },
  { et: '5', t: `Si la Corte no remite la documentación del art. 91 en plazo: libertad provisional y medidas cautelares por un ${R('tiempo máximo de ciento ochenta días')}` }]));
v('Artículo 17 — De los recursos', flujo('Detención y entrega a la Corte (LO 18/2003, arts. 11-17)', [
  { et: '1', t: `Detención en cumplimiento de una orden de la Corte (art. 11)` },
  { et: '2', t: `La autoridad que detiene lo comunica inmediatamente ${R('al Ministerio de Justicia y al Juez Central de Instrucción de la Audiencia Nacional')}` },
  { et: '3', t: `A disposición del JCI ${R('sin demora y, en todo caso, dentro del plazo de setenta y dos horas')}` },
  { et: '4', t: `El JCI oye a la persona reclamada (con letrado e intérprete) y al Fiscal ${R('dentro de las setenta y dos horas siguientes')}` },
  { et: '5', t: 'Se pregunta si consiente en su entrega (art. 13)' },
  { bif: [{ c: 'si', et: 'SÍ', t: `Auto de entrega ${R('sin más trámites')} y sin documentación del art. 91 del Estatuto · consentimiento irrevocable` }, { c: 'no', et: 'NO', t: `Audiencia ${R('en el plazo máximo de diez días')} (art. 15) · el JCI resuelve por auto ${R('en el plazo de tres días')}` }] },
  { et: '6', t: `Recursos (art. 17): apelación ${R('ante la Sala de lo Penal de la Audiencia Nacional')} · situación personal: art. 766 LECrim, auto ${R('en el plazo de cinco días')} · los autos de la Sala ${R('no serán susceptibles de recurso alguno')}` }]));
v('Artículo 13 — De la entrega simplificada', plazos('Plazos de la LO 18/2003', [
  ['20 días', `${K('no inferior')}: plazo para recibir las recomendaciones de la Corte sobre la libertad provisional (art. 12)`],
  ['72 h + 72 h', 'Puesta a disposición del JCI y audiencia de la persona reclamada (art. 11)'],
  ['15 días', 'Consentimiento posterior a la entrega, aunque se hubiere opuesto (art. 13.3)'],
  ['10 días', 'Audiencia de entrega: plazo máximo (art. 15.1)'],
  ['3 días', 'El JCI resuelve por auto sobre la entrega (art. 15.3)'],
  ['5 días', 'Auto de la Sala de lo Penal al resolver la apelación sobre situación personal (art. 17.1)'],
  ['20 días', 'Propuesta conjunta Justicia + Exteriores al Consejo de Ministros (art. 8.2)'],
  ['180 días', 'Libertad provisional si la Corte no remite la documentación (art. 12.3)'],
  ['24 h', 'Llegada del recluso al juez de vigilancia penitenciaria (art. 22.1)']]));
v('Artículo 16 — De las solicitudes concurrentes', arbol('Solicitudes concurrentes (art. 16)', `Entrega a la Corte + extradición u orden europea`, [
  'Se notifica a la Corte y al Estado requirente',
  `${R('Se tramitan conjuntamente ambos procedimientos en el JCI que conoce de la entrega')}`,
  `El JCI se abstiene y eleva ambos procesos a la ${R('Sala de lo Penal de la Audiencia Nacional')}`,
  `Sin tratado con el Estado requirente: ${R('se dará preferencia a la solicitud de la Corte')}`]));
v('Artículo 18 — De la entrega temporal a la Corte', flujo('Entrega temporal (art. 18)', [
  { et: '1', t: `Entrega acordada y la persona está ${R('cumpliendo condena en España o sujeta a proceso por hechos distintos')}` },
  { et: '2', t: `Justicia consulta con la Corte, ${R('si no se opusiere el Tribunal sentenciador o el instructor')}` },
  { et: '3', t: `Resolución motivada, con las modalidades de restitución a España · ${R('se computa el período pasado a disposición de la Corte')}` }]));
v('Artículo 21 — De las personas sujetas a la jurisdicción de la Corte', cols('Peritos y testigos citados por la Corte (art. 21)',
  [{ t: 'Comparecer ante tribunales españoles (comisión rogatoria)', l: [`${R('Mismas obligaciones y responsabilidades que si hubieren sido citadas en una causa en España')}`] },
   { t: 'Comparecer en la sede de la Corte', l: [`${R('Carácter voluntario')}`, `Sin consentimiento: ${R('un condenado por la Corte que cumple condena en España')}`, `Personas en tránsito para comparecer ante la Corte: ${D('inmunidad')} (art. 21.3)`] }], null));
v('Artículo 25 — De la celebración del juicio', arbol('Juicio y actuaciones procesales de la Corte en España (arts. 24 y 25)', `Propuesta de la Corte`, [
  { t: `Art. 24 · «amicus curiae»`, sub: [`${R('Invitación de la Corte')}`, `Justicia consulta con Exteriores ${R('la conveniencia u oportunidad')}`, `y ${R('fija los términos de dicha participación')}`] },
  { t: 'Art. 25 · celebrar el juicio en España', sub: [`Decide y comunica el ${R('Ministerio de Justicia')}`, `Previa consulta con Exteriores, Interior y ${R('otras autoridades competentes')}`, `Aspectos no jurisdiccionales: ${R('acuerdo específico que se celebre con la Corte')}`] }]));

/* ============ CARTA DE LOS DERECHOS FUNDAMENTALES ============ */
v('Datos y estructura de la Carta', arbol('Títulos de la Carta (Niza 2000 · vinculante desde el 1-12-2009)', `${D('Carta de Derechos Fundamentales de la UE')}`, [
  `${R('I. Dignidad')} (arts. 1-5): dignidad, vida, integridad, tortura, esclavitud`, 'II. Libertades (arts. 6-19)', 'III. Igualdad (arts. 20-26)', 'IV. Solidaridad (arts. 27-38)', 'V. Ciudadanía (arts. 39-46)', 'VI. Justicia (arts. 47-50)', 'VII. Disposiciones generales: interpretación y aplicación (arts. 51-54)']));
v('Artículos 1 a 5', arbol('Título I · Dignidad (arts. 1-5)', `${D('Dignidad')}`, [
  `Art. 1 · ${D('dignidad humana')} inviolable: ${R('respetada y protegida')}`, `Art. 2 · ${R('derecho a la vida')} · nadie ${R('condenado a la pena de muerte ni ejecutado')}`,
  `Art. 3 · integridad física y psíquica · ${R('prohibición de las prácticas eugenésicas')}, de lucro con el cuerpo y de clonación reproductora`,
  `Art. 4 · tortura: penas o tratos ${R('inhumanos o degradantes')}`, `Art. 5 · esclavitud, trabajo forzado · ${R('trata de seres humanos')}`]));
v('Artículos 43, 44 y 46', arbol('Título V · Ciudadanía (arts. 39-46)', `${D('Ciudadanía')}`, [
  `Art. 39 · sufragio activo y pasivo · diputados elegidos por ${R('sufragio universal libre, directo y secreto')}`,
  `Art. 41 · buena administración · respuesta ${R('en esa misma lengua')}`,
  `Art. 42 · acceso a ${R('documentos de las instituciones, órganos y organismos de la Unión, cualquiera que sea su soporte')}`,
  `Art. 43 · Defensor del Pueblo Europeo: ${R('mala administración')}, ${R('con exclusión del Tribunal de Justicia en el ejercicio de sus funciones jurisdiccionales')}`,
  `Art. 44 · petición ante el ${R('Parlamento Europeo')}`, `Art. 46 · protección diplomática y consular en tercer país ${R('en el que no esté representado el Estado miembro del que sea nacional')}`]));
v('Artículos 51 y 52', cols('Ámbito y alcance de la Carta (arts. 51 y 52)',
  [{ t: 'Art. 51 · Ámbito', l: ['Instituciones, órganos y organismos de la Unión (subsidiariedad)', `Estados miembros ${K('únicamente')} cuando apliquen el Derecho de la Unión`, `${K('No')} amplía el ámbito del Derecho de la Unión`, `${K('Ni')} crea competencias o misiones nuevas`, `${K('Ni')} modifica las competencias de los Tratados`] },
   { t: 'Art. 52 · Alcance', l: ['Limitaciones: establecidas por ley y respetando el contenido esencial', `Derechos correspondientes al CEDH: ${R('mismo sentido y alcance')}`, `${R('El Derecho de la Unión puede conceder una protección más extensa')}`, 'Principios: se aplican mediante actos legislativos y ejecutivos', `${R('Solo podrán alegarse ante un órgano jurisdiccional para interpretar y controlar la legalidad de dichos actos')}`] }], null));

/* ============ ESTATUTO DEL CONSEJO DE EUROPA ============ */
v('Artículos 3, 4, 5 y 6', arbol('Miembros del Consejo de Europa (arts. 3-6)', `${D('Ser miembro')}`, [
  `Art. 3 · reconoce el principio del ${R('imperio del Derecho')} y de los derechos humanos`,
  `Art. 4 · Estado europeo invitado por el Comité de Ministros: es Miembro ${R('tan pronto como se remita al Secretario General un instrumento de adhesión')}`,
  `Art. 5 · Miembro asociado: solo representado en la ${R('Asamblea Consultiva')}`,
  `Art. 6 · el Comité determina su nº de representantes en la Asamblea y su contribución`]));
v('Artículos 7, 8 y 9', flujo('Retirada y suspensión (arts. 7, 8 y 9)', [
  { et: '7', t: `Retirada: notificar la decisión al Secretario General · efecto ${R('al concluir el año financiero en curso, si tuvo lugar en los primeros nueve meses; al finalizar el año siguiente, si fue en los tres últimos meses')}` },
  { et: '8', t: `Infracción grave del art. 3: el Comité ${R('deja en suspenso el derecho de representación')} ${R('e invita a retirarse')}; si no atiende, cesa como Miembro` },
  { et: '9', t: `Impago de obligaciones financieras: ${R('suspender su derecho de representación en el Comité y en la Asamblea Consultiva mientras no pague')}` }]));
v('Artículos 10, 11 y 12', arbol('Órganos del Consejo de Europa (arts. 10-12)', `${D('Consejo de Europa')}`, [
  `<b>Órganos</b> (art. 10): i) ${R('El Comité de Ministros')} ii) ${R('La Asamblea Consultiva')}`,
  `Ambos serán asistidos por la ${D('Secretaría')} del Consejo de Europa`,
  `<b>Sede</b> (art. 11): ${R('Estrasburgo')}`, `<b>Idiomas oficiales</b> (art. 12): ${R('el francés y el inglés')}`]));
v('Artículos 13, 14 y 15', arbol('El Comité de Ministros (arts. 13-15)', `${D('Comité de Ministros')}`, [
  'Órgano competente que actúa en nombre del Consejo de Europa', `Cada Miembro: un representante y un voto · ${R('los Ministros de Asuntos Exteriores')}`,
  'Suplente (en la medida de lo posible, miembro del Gobierno)', 'Examina medidas por recomendación de la Asamblea o por iniciativa propia · conclusiones: recomendaciones a los Gobiernos']));
v('Artículos 16, 17 y 18', arbol('Funciones internas del Comité (arts. 16-18)', `${D('Comité de Ministros')}`, [
  'Art. 16 · resuelve con carácter obligatorio la organización y régimen interior; adopta los reglamentos financieros y administrativos',
  'Art. 17 · puede constituir Comités o Comisiones de carácter consultivo o técnico',
  { t: 'Art. 18 · su Reglamento interno determina:', sub: [`i) ${R('el quórum')}`, 'ii) designación del Presidente y duración', 'iii) procedimiento para temas y propuestas', 'iv) designación de suplentes'] }]));
v('Artículo 20 — Mayorías del Comité de Ministros', arbol('Mayorías del Comité de Ministros (art. 20)', `${D('Mayorías')}`, [
  { t: `a) <b>Unanimidad</b> de los votos emitidos y mayoría de los representantes: cuestiones importantes`, sub: ['recomendaciones (15 b)', 'informes a la Asamblea (19)', 'reuniones y publicidad (21 a y b)', 'sede de la Asamblea (33)', 'enmiendas a los arts. 1 d), 7, 15, 20 y 22'] },
  `b) ${R('Mayoría simple')} de los representantes con derecho a formar parte del Comité: reglamento interno y regímenes financiero y administrativo`,
  `c) ${R('Mayoría de los dos tercios de los representantes con derecho a participar')}: invitar Miembros y Miembros asociados (arts. 4 y 5)`,
  'd) Todas las demás: dos tercios de los votos emitidos y mayoría de los representantes (incluso el presupuesto)']));
v('Artículo 21 — Reuniones del Comité de Ministros', cols('Reuniones del Comité (art. 21)',
  [{ t: 'Regla general', l: [`${R('A puerta cerrada')}`, `${R('En la sede del Consejo')}`, 'Salvo acuerdo en contrario del Comité'] },
   { t: 'Obligatoriamente', l: ['Antes de la apertura y al comienzo de las reuniones de la Asamblea', 'Además, cuantas veces lo estime conveniente', 'Publicidad de las deliberaciones: lo decide el Comité (por unanimidad y mayoría de representantes)'] }], null));
v('Artículos 29 a 35', cols('Asamblea Consultiva frente al Comité de Ministros',
  [{ t: 'Comité de Ministros', l: ['Órgano competente que actúa en nombre del Consejo', 'Un representante y un voto por Miembro: Ministros de Asuntos Exteriores', 'Reuniones a puerta cerrada y en la sede', 'Decide por unanimidad, mayoría simple o dos tercios según la materia'] },
   { t: 'Asamblea Consultiva', l: [`Órgano ${D('deliberante')}: transmite conclusiones como ${R('recomendaciones')}`, `Representantes elegidos por su Parlamento; ${R('nacionalidad del Miembro y no a la vez miembro del Comité')}`, `Resoluciones por ${R('mayoría de los dos tercios de los votos emitidos')}`, `Sesión ordinaria anual: ${R('no excederá de un mes')}`, `Deliberaciones ${R('públicas, a menos que ella misma acuerde lo contrario')}`, `Presidente: ${R('dirige las deliberaciones, pero no participa en los debates ni en la votación')}`, `España: ${R('12')} representantes`] }], '⇄'));
v('Artículos 36 y 37', arbol('La Secretaría (arts. 36-37)', `${D('Secretaría')}`, [
  'Compuesta por: Secretario General, Secretario General Adjunto y personal necesario',
  `SG y SG Adjunto: ${R('nombrados por la Asamblea Consultiva por recomendación del Comité de Ministros')}`,
  'Los demás miembros: nombrados por el Secretario General', 'Instalada en la sede · el Secretario General responde ante el Comité de Ministros']));
v('Artículos 41 y 42', plazos('Cifras del Estatuto del Consejo de Europa', [
  ['5-5-1949', `${R('Londres, a los cinco días del mes de mayo de 1949')}`], ['24-11-1977', 'España: Instrumento de Adhesión · miembro de pleno derecho'],
  ['7', `Instrumentos de ratificación para entrar en vigor (${R('siete')})`], ['2/3', 'Protocolos de enmienda: firmados y ratificados por las dos terceras partes de los Miembros'],
  ['9 meses', 'Retirada: primeros nueve meses → efecto al concluir el año financiero en curso'], ['6 meses', 'Plazo máximo para abonar la contribución (art. 39)'],
  ['1 mes', 'Duración máxima de las sesiones ordinarias de la Asamblea (art. 32)']]));

/* ============ CONVENIO EUROPEO DE DERECHOS HUMANOS ============ */
v('Artículos 2, 4 y 5', arbol('Uso de la fuerza: la muerte no infringe el art. 2 (CEDH)', `${D('Recurso a la fuerza absolutamente necesario')}`, [
  `a) ${R('En defensa de una persona contra una agresión ilegítima')}`,
  `b) ${R('Para detener a una persona conforme a derecho o para impedir la evasión de un preso o detenido legalmente')}`,
  `c) ${R('Para reprimir, de acuerdo con la ley, una revuelta o insurrección')}`]));
v('Artículos 6, 12, 15 y 16', arbol('Derogación en estado de excepción (art. 15 CEDH)', `${D('Art. 15')}: guerra o peligro público`, [
  'Podrán derogarse obligaciones en la medida estricta que exija la situación',
  `${K('Nunca')} derogables: ${R('artículo 2')} (salvo actos lícitos de guerra)`, `${K('Nunca')} derogables: ${R('artículos 3, 4 (párrafo 1) y 7')} (tortura, esclavitud o servidumbre, legalidad)`,
  `Art. 16: restricciones a la actividad política de los extranjeros pese a los ${R('artículos 10, 11 y 14')}`, 'Informar al Secretario general del Consejo de Europa']));
v('Artículos 19 a 23', arbol('Los jueces del Tribunal (arts. 19-23)', `${D('Tribunal Europeo de Derechos Humanos')}`, [
  `Art. 19 · funcionará ${R('de manera permanente')}`, `Art. 20 · número de jueces ${R('igual al de las Altas Partes Contratantes')}`,
  `Art. 21 · candidatos ${R('menores de 65 años')} · actúan a título individual`,
  `Art. 22 · elegidos ${R('por la Asamblea Parlamentaria')}, ${R('por mayoría absoluta de votos')}, ${R('de una lista de tres candidatos')}`,
  `Art. 23 · mandato de ${R('nueve años')}, ${R('no reelegibles')} · relevo solo si ${R('los demás jueces deciden, por mayoría de dos tercios')}`]));
v('Artículos 25 y 26', arbol('Formaciones del Tribunal (arts. 25 y 26)', `${D('Tribunal')} (Pleno)`, [
  `Pleno (art. 25): elige ${R('por un período de tres años')} al Presidente y a uno o dos Vicepresidentes (${R('reelegibles')}); constituye las Salas`,
  'Juez único (art. 27)', `${R('Comités compuestos por tres jueces')} (art. 28)`, `Salas de siete jueces · ${R('el Comité de Ministros podrá, por decisión unánime, reducir a cinco')} el nº de jueces de las Salas`,
  `${R('Gran Sala de diecisiete jueces')} · en la remisión: del grupo de la Sala solo ${R('el Presidente de la Sala')} ${R('y el Juez de la Alta Parte interesada')}`,
  `Juez único: ${R('ningún juez podrá examinar una solicitud contra la Alta Parte en cuya representación fue elegido')}`]));
v('Artículos 27 y 28', flujo('Camino de una demanda individual (arts. 27, 28, 35, 43-46)', [
  { et: '1', t: `Agotar las vías internas y presentar la demanda ${R('en el plazo de cuatro meses a partir de la fecha de la resolución interna definitiva')} (art. 35)` },
  { et: '2', t: `${D('Juez único')}: puede declarar inadmisible o eliminar del registro · su resolución ${R('será definitiva')} (art. 27)` },
  { et: '3', t: `${D('Comité de 3 jueces')}, ${R('por unanimidad')}: inadmisible, o ${R('admisible y sentencia sobre el fondo si ya hay jurisprudencia bien establecida')} (art. 28)` },
  { et: '4', t: `${D('Sala de 7 jueces')}: examen y sentencia` },
  { et: '5', t: `Remisión excepcional a la Gran Sala: ${R('en el plazo de tres meses a partir de la fecha de la sentencia de una Sala')} · acepta ${R('un colegio de cinco Jueces de la Gran Sala')} (art. 43)` },
  { et: '6', t: `Sentencia definitiva (art. 44) · transmitida al ${R('Comité de Ministros, que velará por su ejecución')} (art. 46)` }]));
v('Artículos 35 y 36', arbol('Inadmisibilidad de demandas individuales (art. 35)', `${D('El Tribunal no admitirá…')}`, [
  'a) Demanda anónima', 'b) Esencialmente la misma que una ya examinada por el Tribunal o sometida a otra instancia internacional, sin hechos nuevos',
  'c) Incompatible con el Convenio, manifiestamente mal fundada o abusiva',
  `d) El demandante no ha sufrido un perjuicio importante, ${K('a menos que')} ${R('el respeto de los derechos humanos garantizados por el Convenio y sus Protocolos exija un examen del fondo de la demanda')}`,
  `Art. 36 · tercero que puede presentar observaciones: ${R('el Comisario de Derechos Humanos del Consejo de Europa')}`]));
v('Artículos 43, 45 y 46', cols('Remisión y firmeza de las sentencias (arts. 43-46)',
  [{ t: 'Sentencia de una Sala', l: [`Definitiva si: las partes no solicitarán la remisión, o ${P('tres meses')} sin solicitarla, o el colegio rechaza la remisión`, `Remisión en ${R('tres meses')}; acepta un colegio de ${R('5 jueces')}`] },
   { t: 'Sentencia de la Gran Sala', l: ['Siempre definitiva (art. 44.1)', `${R('Opinión por separado')}: cualquier Juez tiene derecho a unir su opinión (art. 45)`, `Ejecución: ${R('Comité de Ministros')} (art. 46)`, `Remitir al Tribunal un problema de interpretación: mayoría de ${P('dos tercios')} de los representantes del Comité`] }], null));
v('Artículos 47 y 50', arbol('Opiniones consultivas y gastos (arts. 47-50)', `${D('Opinión consultiva')}`, [
  'Pide el Comité de Ministros · el Tribunal emite sobre cuestiones jurídicas de interpretación del Convenio y sus Protocolos',
  `${K('No')} sobre el contenido o extensión de los derechos del Título I`, `La decisión de pedirla: ${R('voto mayoritario de los representantes del Comité')}`, `Gastos de funcionamiento del Tribunal: ${R('Consejo de Europa')}`]));
v('Artículos 56, 58 y 59', plazos('Plazos y cifras del Convenio', [
  ['4 meses', 'Presentar la demanda tras la resolución interna definitiva (art. 35)'], ['3 meses', 'Solicitar la remisión a la Gran Sala (art. 43)'],
  ['9 años', 'Mandato de los jueces, no reelegibles (art. 23)'], ['65 años', 'Edad máxima de los candidatos a juez (art. 21)'],
  ['3 años', 'Mandato del Presidente y Vicepresidentes del Tribunal (art. 25)'], ['30 días', 'Aplicación territorial: desde el trigésimo día siguiente (art. 56)'],
  ['5 años + 6 meses', 'Denuncia: tras cinco años de vigor para la Parte y preaviso de seis meses (art. 58)'], ['10', 'Instrumentos de ratificación para la entrada en vigor del Convenio (art. 59)'],
  ['3 / 7 / 17', 'Jueces de Comité, de Sala y de Gran Sala'], ['4-11-1950', `Hecho en ${R('Roma')} el 4 de noviembre de 1950`]]));
v('Protocolo n.º 13 (Vilna', cols('Pena de muerte: Protocolos 6 y 13',
  [{ t: 'Protocolo n.º 6 (1983)', l: ['Abolida la pena de muerte', `Excepción: ${R('en tiempo de guerra o de peligro inminente de guerra')}`, 'Vigor: 5 Estados miembros del Consejo de Europa', 'Secretario General notifica firmas, depósitos, vigor y otros actos'] },
   { t: 'Protocolo n.º 13 (Vilna, 2002)', l: ['Abolida en todas las circunstancias', `${K('No')} se autoriza excepción alguna (art. 15 del Convenio)`, `${K('No')} se admite reserva alguna (art. 57)`, `Vigor: primer día del mes siguiente a ${R('tres meses')} tras el consentimiento de 10 Estados`] }], null));

/* ============ ESTATUTO DE ROMA ============ */
v('Artículos 5 y 6', arbol('Crímenes de la competencia de la Corte (arts. 5 y 6)', `${D('Competencia de la Corte')}: los crímenes más graves de trascendencia para la comunidad internacional`, [
  { t: `a) ${R('El crimen de genocidio')} (art. 6): intención de destruir total o parcialmente a un ${R('grupo nacional, étnico, racial o religioso')}`, sub: ['matanza de miembros', 'lesión grave a la integridad física o mental', 'sometimiento a condiciones de existencia de destrucción física', 'medidas para impedir nacimientos', 'traslado por la fuerza de niños'] },
  `b) ${R('Los crímenes de lesa humanidad')} (art. 7)`, `c) ${R('Los crímenes de guerra')} (art. 8)`, `d) ${R('El crimen de agresión')} (art. 8 bis)`]));
v('Artículos 7 y 8 — Lesa', cols('Lesa humanidad frente a crímenes de guerra (arts. 7 y 8)',
  [{ t: 'Art. 7 · Lesa humanidad', l: [`Como parte de un ${R('ataque generalizado o sistemático contra una población civil y con conocimiento de dicho ataque')}`, 'Asesinato, exterminio, esclavitud, deportación o traslado forzoso, tortura…', `«Género»: ${R('los dos sexos, masculino y femenino, en el contexto de la sociedad')}`] },
   { t: 'Art. 8 · Crímenes de guerra', l: ['Competencia, en particular, cuando se cometan como parte de un plan o política o en gran escala', `${R('Reclutar o alistar a niños menores de quince años en las fuerzas armadas nacionales')} o utilizarlos para participar activamente en las hostilidades`] }], null));
v('Artículo 8 bis y artículo 9', cols('Agresión y Elementos de los crímenes (arts. 8 bis y 9)',
  [{ t: 'Art. 8 bis · Agresión', l: ['Persona en condiciones de controlar o dirigir efectivamente la acción política o militar de un Estado', 'Acto de agresión: violación manifiesta de la Carta de las Naciones Unidas', `Actos: ${R('resolución 3314 (XXIX) de la Asamblea General, de 14 de diciembre de 1974')}`] },
   { t: 'Art. 9 · Elementos de los crímenes', l: ['Ayudan a la Corte a interpretar los arts. 6, 7, 8 y 8 bis', `Aprobados por ${P('dos tercios')} de la Asamblea de los Estados Partes`, 'Proponen enmiendas: Estado Parte, el fiscal y los magistrados por ' + R('mayoría absoluta'), `Aprobadas por ${R('mayoría de dos tercios')}`] }], null));
v('Artículos 11, 12 y 13 — Competencia temporal', arbol('Cuándo puede actuar la Corte (arts. 11-13)', `${D('Competencia de la Corte')}`, [
  `Art. 11 · temporal: ${K('únicamente')} ${R('crímenes cometidos después de la entrada en vigor del Estatuto')}`,
  `Art. 12 · Estados: territorio de la conducta (o ${R('el Estado de matrícula del buque o la aeronave')}) o Estado nacional del acusado`,
  { t: 'Art. 13 · quién activa la Corte (tres vías):', sub: ['a) un Estado Parte remite una situación al fiscal', `b) el ${R('Consejo de Seguridad, actuando con arreglo al Capítulo VII de la Carta de las Naciones Unidas')}`, 'c) el fiscal inicia una investigación (art. 15)'] }]));
v('Artículos 15 y 15 bis', flujo('Investigación de oficio (art. 15)', [
  { et: '1', t: `El fiscal ${R('inicia de oficio una investigación sobre la base de información acerca de un crimen de la competencia de la Corte')}` },
  { et: '2', t: 'Concluye que hay fundamento suficiente para investigar' },
  { et: '3', t: `Presenta petición de autorización a la ${R('Sala de Cuestiones Preliminares')} · las víctimas podrán presentar observaciones` },
  { bif: [{ c: 'si', et: 'SÍ', t: 'La Sala autoriza: se inicia la investigación' }, { c: 'no', et: 'NO', t: 'La negativa no impide que el fiscal presente otra petición basada en nuevos hechos o pruebas' }] }]));
v('Artículos 15 y 15 bis', flujo('Crimen de agresión (art. 15 bis)', [
  { et: '1', t: `Competencia: ${R('un año después de la ratificación o aceptación de las enmiendas por treinta Estados Partes')}` },
  { et: '2', t: `Estado no Parte: ${R('la Corte no ejercerá su competencia cuando el crimen sea cometido por sus nacionales o en su territorio')}` },
  { et: '3', t: 'El fiscal verifica en primer lugar si el Consejo de Seguridad ha determinado un acto de agresión' },
  { et: '4', t: `Sin determinación en ${R('seis meses')} desde la notificación: el fiscal puede investigar, si la Sección de Cuestiones Preliminares lo autoriza y el Consejo de Seguridad no decide lo contrario (art. 16)` }]));
v('Artículos 16 y 17', cols('Suspensión (art. 16) e inadmisibilidad (art. 17)',
  [{ t: 'Art. 16 · Consejo de Seguridad', l: ['Resolución con arreglo al Capítulo VII', `Pide que no se inicie o suspenda ${R('por un plazo de doce meses')}`, `${R('Podrá ser renovada por el Consejo de Seguridad en las mismas condiciones')}`] },
   { t: 'Art. 17 · Inadmisibilidad', l: ['a) investigada o enjuiciada por un Estado con jurisdicción, salvo que no esté dispuesto o no pueda', 'c) la persona ya fue enjuiciada por la conducta', 'd) el asunto no es de gravedad suficiente', `Incapacidad: ${R('no puede hacer comparecer al acusado, no dispone de las pruebas y los testimonios necesarios o no está por otras razones en condiciones de llevar a cabo el juicio')}`] }], null));
v('Artículo 18 — Decisiones preliminares', flujo('Decisiones preliminares sobre admisibilidad (art. 18)', [
  { et: '1', t: 'El fiscal notifica a todos los Estados Partes y a los Estados que ejercerían normalmente la jurisdicción' },
  { et: '2', t: `El Estado informa de que investiga ${R('dentro del mes siguiente')} a la notificación` },
  { et: '3', t: `A petición del Estado, el fiscal se inhibe, ${K('a menos que')} la Sala de Cuestiones Preliminares, a petición del fiscal, autorice la investigación` },
  { et: '4', t: `Reexamen: ${R('al cabo de seis meses a partir de la fecha de la inhibición o cuando se haya producido un cambio significativo de circunstancias')}` },
  { et: '5', t: `Apelación del Estado o del fiscal ante la ${R('Sala de Apelaciones')} (forma sumaria)` }]));
v('Artículo 19 — Impugnación', arbol('Impugnación de la competencia o la admisibilidad (art. 19)', `${D('Impugnación')}`, [
  { t: 'Quién (19.2):', sub: ['a) el acusado o la persona contra la que se dictó orden de detención o comparecencia', 'b) un Estado con jurisdicción que investiga o enjuicia', 'c) un Estado cuya aceptación se requiera (art. 12)'] },
  `Cuándo: ${K('una sola vez')}, antes del juicio o a su inicio · excepcional: ${R('sólo podrán fundarse en el párrafo 1.c) del artículo 17')} (cosa juzgada)`,
  `Quién resuelve: antes de confirmar los cargos, Sala de Cuestiones Preliminares; después, Sala de Primera Instancia · recurso ante la ${R('Sala de Apelaciones')}`,
  `Efecto (19.7): si impugna un Estado, ${R('el fiscal suspenderá la investigación hasta que la Corte resuelva')}`, 'No afecta a la validez de actos anteriores']));
v('Artículos 20 y 21', flujo('Derecho aplicable por la Corte (art. 21)', [
  { et: '1.º', t: `${K('EN PRIMER LUGAR')}: ${R('el presente Estatuto, los Elementos de los crímenes y sus Reglas de Procedimiento y Prueba')}` },
  { et: '2.º', t: `${K('EN SEGUNDO LUGAR')}: tratados aplicables, principios y normas del derecho internacional` },
  { et: '3.º', t: `${K('EN SU DEFECTO')}: principios generales del derecho que derive la Corte del derecho interno de los sistemas jurídicos del mundo` }]));
v('Artículos 20 y 21', arbol('Cosa juzgada (art. 20)', `${D('Non bis in idem')}`, [
  'Nadie será procesado por la Corte por crímenes por los que ya hubiere sido condenado o absuelto por la Corte',
  'Nadie será procesado por otro tribunal por crímenes del art. 5 por los que la Corte ya le condenó o absolvió',
  { t: `La Corte no procesará a quien ya fue procesado por otro tribunal, ${K('a menos que')} el proceso:`, sub: [`a) ${R('Obedeciera al propósito de sustraer al acusado de su responsabilidad penal')}`, `b) ${R('No hubiere sido instruido en forma independiente o imparcial')}`] }]));
v('Artículos 53 y 54', flujo('Decisión del fiscal de no investigar (art. 53)', [
  { et: '1', t: 'El fiscal inicia la investigación, a menos que determine que no hay fundamento razonable (causa inadmisible o no redundaría en interés de la justicia)' },
  { bif: [{ et: 'a', t: `A petición del Estado remitente o del Consejo de Seguridad: la Sala de Cuestiones Preliminares ${K('podrá')} examinar la decisión y pedir que se reconsidere` }, { et: 'b', t: `${R('De oficio')}, ${R('si la decisión se basare únicamente en el párrafo 1.c) o 2.c)')} (interés de la justicia)` }] },
  { et: '=', t: `La decisión del fiscal ${R('únicamente surtirá efecto si es confirmada por la Sala de Cuestiones Preliminares')}` }]));
v('Artículos 55 y 57', arbol('Derechos de la persona durante la investigación (art. 55)', `${D('Investigación')}`, [
  `a) ${R('Nadie será obligado a declarar contra sí mismo ni a declararse culpable')}`, 'b) Nadie será sometido a coacción, intimidación, amenaza ni torturas',
  'c) Intérprete competente, sin cargo alguno', 'd) Nadie será sometido a arresto o detención arbitrarios',
  'Si hay motivos para creer que ha cometido un crimen: guardar silencio sin que se tenga en cuenta, y ser interrogada en presencia de su abogado',
  `Art. 57: providencias de la Sala de Cuestiones Preliminares (arts. 15, 18 o 19…): aprobadas por ${R('la mayoría de los magistrados que la componen')}`]));
v('Artículos 58 y 59', flujo('Orden de detención y detención en el Estado (arts. 58 y 59)', [
  { et: '1', t: `El fiscal solicita; la Sala de Cuestiones Preliminares dicta orden de detención si hay motivo razonable para creer que se cometió un crimen y la detención parece necesaria (comparecencia, no obstruir, no reincidir)` },
  { et: '2', t: `La orden ${R('seguirá en vigor mientras la Corte no disponga lo contrario')} · en su lugar, orden de comparecencia: notificación ${R('personal')}` },
  { et: '3', t: 'El Estado Parte toma inmediatamente las medidas para la detención; el detenido es llevado sin demora ante la autoridad judicial competente' },
  { et: '4', t: `Libertad provisional: solo si hay circunstancias urgentes y excepcionales y salvaguardias · la autoridad ${R('no podrá examinar si la orden de detención fue dictada conforme a derecho')}` },
  { et: '5', t: `La solicitud se notifica a la ${R('Sala de Cuestiones Preliminares')}, que hace recomendaciones` }]));
v('Artículos 60 y 61', flujo('Del primer momento ante la Corte al juicio (arts. 60 y 61)', [
  { et: '60', t: 'Entregado o comparecido el imputado: la Sala de Cuestiones Preliminares comprueba que conoce los crímenes y sus derechos (incluida la libertad provisional)' },
  { et: '60.5', t: `Si es necesario, puede dictar ${R('una orden de detención para hacer comparecer a una persona que haya sido puesta en libertad')}` },
  { et: '61', t: `Audiencia de confirmación de cargos ${R('en presencia del fiscal y del imputado, así como de su defensor')}` },
  { et: '61.2', t: `Ausencia del acusado: ${R('haya renunciado a su derecho a estar presente')} o ${R('haya huido o no sea posible encontrarlo')}` },
  { et: '61.9', t: `Confirmados los cargos, el fiscal puede ${R('modificar los cargos')} con autorización de la Sala` },
  { et: '61.11', t: `La ${R('Presidencia')} constituye una Sala de Primera Instancia para la siguiente fase` }]));
v('Artículos 86 y 87', arbol('Cooperación de los Estados con la Corte (arts. 86 y 87)', `${D('Cooperación')}`, [
  `Art. 86 · los Estados Partes cooperarán ${R('plenamente')}`,
  `Art. 87 · solicitudes por vía diplomática o por el conducto designado por cada Estado · también por conducto de ${R('la Organización Internacional de Policía Criminal o de cualquier organización regional competente')}`,
  'Idioma oficial del Estado requerido (o traducción)', `El Estado requerido ${R('preservará el carácter confidencial de toda solicitud de cooperación y de los documentos que las justifiquen')}, salvo lo necesario para tramitarla`]));
v('Artículo 89', arbol('Entrega y tránsito (art. 89)', `${D('Tránsito de personas entregadas a la Corte')}`, [
  'Cosa juzgada alegada ante tribunal nacional: consultas inmediatas con la Corte; si la causa es admisible, se cumple la entrega',
  `${R('No se requerirá autorización cuando la persona sea transportada por vía aérea y no se prevea aterrizar en el territorio del Estado de tránsito')}`,
  `Aterrizaje imprevisto: el Estado de tránsito la detiene mientras recibe la solicitud · la detención no podrá prolongarse más de ${R('96 horas')}`]));
v('Artículo 90', cols('Solicitudes concurrentes: Corte y extradición (art. 90)',
  [{ t: 'Estado requirente PARTE del Estatuto', l: ['Se notifica a la Corte y al Estado requirente', 'Prioridad a la solicitud de la Corte si ha determinado que la causa es admisible'] },
   { t: 'Estado requirente NO PARTE', l: [`Si ${R('no está obligado por alguna norma internacional a conceder la extradición')}: ${R('dará prioridad a la solicitud de entrega que le haya hecho la Corte si ésta ha determinado que la causa era admisible')}`, `Si se deniega después la extradición: ${R('el Estado requerido notificará su decisión a la Corte')}`] }], null));
v('Artículos 91 y 92', cols('Solicitud de detención y entrega (91) vs. detención provisional (92)',
  [{ t: 'Art. 91 · entrega', l: ['Por escrito; en urgencia, otro medio que deje constancia escrita, con confirmación', 'Contiene: información para identificar a la persona y su paradero; copia de la orden de detención; documentos necesarios', `Los requisitos ${K('no')} podrán ser más onerosos que los de extradición`] },
   { t: 'Art. 92 · detención provisional', l: ['En caso de urgencia, hasta que se presente la solicitud de entrega', 'Por cualquier medio que deje constancia escrita', `Contiene: identificación y paradero · exposición concisa de los crímenes y hechos, ${R('inclusive, de ser posible, la fecha y el lugar en que se cometieron')} · declaración de que existe orden de detención o decisión final condenatoria · declaración de que se presentará solicitud de entrega`] }], null));
v('Artículo 93', arbol('Otras formas de cooperación (art. 93)', `${D('Asistencia')}`, [
  `Denegar solo en el caso del art. 72: ${K('únicamente')} ${R('si la solicitud se refiere a documentos o pruebas que afecten a su seguridad nacional')}`,
  'Antes de denegar: considerar condiciones, fecha posterior u otra manera',
  `Si no se da lugar: comunicar sin demora ${R('los motivos a la Corte o al fiscal')}`, 'Traslado provisional de un detenido: consentimiento libre y con conocimiento + Estado requerido lo acepta',
  `${R('Cooperación activa')} (art. 93.10): la Corte puede asistir a un Estado Parte que investiga (art. 3 LO 18/2003)`]));
v('Artículos 100, 101 y 102', cols('Gastos, especialidad y términos (arts. 100-102)',
  [{ t: 'Gastos (art. 100)', l: [`Ordinarios: ${R('a cargo del Estado requerido')}`, 'A cargo de la Corte: viaje y seguridad de testigos y peritos, traducción, dietas de magistrados y fiscal, informes periciales, transporte del entregado…'] },
   { t: 'Especialidad y términos', l: [`Art. 101: el entregado ${R('no será procesado, castigado o detenido por una conducta anterior a su entrega')}, ${K('a menos que')} sea la base del delito por el que fue entregado`, `Art. 102 · «entrega»: ${R('de una persona por un Estado a la Corte')}; «extradición»: de un Estado a otro Estado`] }], null));

/* ============ ACUERDO SOBRE PRIVILEGIOS E INMUNIDADES ============ */
v('Artículos 1, 2, 4, 5, 6 y 7', arbol('Privilegios de la Corte como institución (arts. 1-7)', `${D('La Corte')}`, [
  `Art. 1 · «la Presidencia»: ${R('el Presidente y los Vicepresidentes primero y segundo')}`,
  `Art. 2 · ${R('personalidad jurídica internacional')} y capacidad jurídica necesaria`, `Art. 4 · locales ${R('inviolables')}`,
  `Art. 5 · pabellón y emblema ${R('en sus locales y en los vehículos y otros medios de transporte que utilice con fines oficiales')}`,
  `Art. 6 · inmunidad de jurisdicción; la renuncia ${R('no es extensible a ninguna medida de ejecución')}`, `Art. 7 · archivos ${R('inviolables')}`]));
v('Artículos 8 y 10', arbol('Impuestos y fondos (arts. 8 y 10)', `${D('Hacienda de la Corte')}`, [
  `Art. 8 · exenta de impuestos directos; ${K('no')} de los gravámenes que sean ${R('la remuneración de servicios públicos prestados a una tarifa fija')}`, 'Exenta de derechos de aduana para uso oficial y publicaciones',
  `Art. 10 · sin controles financieros ni moratorias · cambio ${R('trato no menos favorable')} que a cualquier organización intergubernamental o misión diplomática`]));
v('Artículos 11, 12 y 13 — Comunicaciones', arbol('Comunicaciones, sede y representantes (arts. 11-13)', `${D('Corte')}`, [
  `Art. 11 · correspondencia ${R('no sometida a censura alguna')} · comunicaciones oficiales inviolables`, `Art. 12 · sede: ${R('La Haya (Países Bajos)')}; puede sesionar en otro lugar mediante acuerdo con el Estado`,
  'Art. 13 · representantes de Estados Partes: inmunidad de arresto, de jurisdicción por actos oficiales, e inviolabilidad de documentos',
  `${K('No')} es aplicable entre un representante y ${R('las autoridades del Estado Parte del que sea nacional')}`]));
v('Artículo 15 — Magistrados', cols('Quién goza de qué (arts. 15, 18, 20 y 22)',
  [{ t: 'Magistrados, Fiscal, Fiscales Adjuntos y Secretario (art. 15)', l: [`Privilegios de ${R('los jefes de las misiones diplomáticas')}`, 'Sueldos exentos de impuestos', `Los Estados Partes ${R('no estarán obligados a exonerar del impuesto a la renta')} las pensiones de ex Magistrados`] },
   { t: 'Abogados (art. 18)', l: ['Inmunidad de arresto, de jurisdicción e inviolabilidad de documentos', `Con certificado firmado por ${R('el Secretario')}`] },
   { t: 'Víctimas (20) y otras personas (22)', l: ['Inmunidad de arresto, de incautación de equipaje y de jurisdicción; exención de restricciones de inmigración', `Otras personas: ${R('los apartados a) a d) del párrafo 1 del artículo 20')}`] }], null));
v('Artículo 26 — Renuncia', arbol('Quién puede renunciar a la inmunidad (art. 26)', `${D('Renuncia')}`, [
  `Magistrado o Fiscal: ${R('mayoría absoluta de los Magistrados')}`, `Secretario: ${R('la Presidencia')}`, `Fiscales Adjuntos y personal de la Fiscalía: ${R('el Fiscal')}`,
  'Secretario Adjunto y personal de la Secretaría: el Secretario', 'Abogados, testigos, víctimas y otras personas: la Presidencia', 'Peritos: el jefe del órgano que los designó']));
v('Artículos 27, 28, 29 y 30', arbol('Seguridad social, documentos de viaje y visados (arts. 27-30)', `${D('Garantías')}`, [
  `Art. 27 · exentos de ${R('toda contribución obligatoria a los sistemas nacionales de seguridad social')}`,
  `Art. 28 · el Secretario comunica a los Estados Partes ${R('los nombres de los Magistrados, el Fiscal, los Fiscales Adjuntos, el Secretario, el Secretario Adjunto, el personal de la Fiscalía, el personal de la Secretaría y los abogados')}`,
  `Art. 29 · documentos de viaje válidos: ${R('los laissez passer de las Naciones Unidas o los documentos de viaje expedidos por la Corte')}`,
  `Art. 30 · visados: ${R('con la mayor rapidez posible y con carácter gratuito')}`]));
v('Artículo 32 — Arreglo', flujo('Arreglo de diferencias (art. 32)', [
  { et: '1', t: `Se resuelven ${R('mediante consultas, negociación u otro medio convenido de arreglo')}` },
  { et: '2', t: `Si no se resuelven en ${P('tres meses')} desde la solicitud por escrito: ${R('tribunal arbitral')}` },
  { et: '3', t: `Tres árbitros: uno por cada parte y el tercero (presidente) elegido por los otros dos · si falta nombramiento ${P('dos meses')}: lo hace el ${R('Presidente de la Corte Internacional de Justicia')}` },
  { et: '4', t: 'El laudo es definitivo y obligatorio para las partes' }]));
v('Artículos 34 y 35', flujo('Firma y entrada en vigor del Acuerdo (arts. 34 y 35)', [
  { et: '9-9-2002', t: `Abierto a la firma de todos los Estados ${R('desde el 10 de septiembre de 2002 hasta el 30 de junio de 2004')} en la Sede de la ONU en Nueva York` },
  { et: 'depósito', t: 'Ratificación, aceptación o aprobación en poder del Secretario General de la ONU · abierto a la adhesión' },
  { et: 'vigor', t: `${R('Treinta días después de la fecha en que se deposite el décimo instrumento')}` }]));

/* ============ ANEXO: historia y teoría general ============ */
v('Antecedentes y declaraciones históricas', flujo('Línea del tiempo de los derechos humanos', [
  { et: 'Antigüedad', t: `Primer antecedente directo: ${R('Cilindro de Ciro')}` }, { et: '1215', t: `Primer documento moderno de defensa de los derechos humanos: ${R('Carta Magna de 1215')}` },
  { et: '1776', t: `Primera manifestación moderna: ${R('Declaración de Independencia de los EE. UU.')}` }, { et: '1789', t: `Declaración de los Derechos del Hombre y del Ciudadano: ${R('Francia, 1789')} (Revolución francesa)` },
  { et: 'Siglo XIX', t: `Surge el concepto de «derechos humanos»: ${R('siglo XIX')}` }, { et: '1935', t: `La SDN consintió que Italia bombardease con gases a ${R('Etiopía')}` },
  { et: '1945', t: `Carta de las Naciones Unidas: ${R('26 de junio de 1945')} (San Francisco)` }, { et: '1948', t: `DUDH: ${R('10 de diciembre de 1948')} · resolución ${R('217 A (III)')}` },
  { et: '1966/76', t: `Pactos Internacionales: aprobados en ${R('1966')}, en vigor en ${R('1976')}` }]));
v('Declaración Universal de Derechos Humanos', arbol('Carta Internacional de Derechos Humanos', `${D('Carta Internacional')}`, [
  `${R('DUDH')} (1948): declaración, no vinculante (soft law)`, 'Pacto Internacional de Derechos Civiles y Políticos (PIDCP): vinculante', 'Pacto Internacional de Derechos Económicos, Sociales y Culturales (PIDESC)', 'Protocolos facultativos', `Los dos Pactos: aprobados ${P('1966')}, en vigor ${P('1976')}`]));
v('Generaciones y características', arbol('Las tres generaciones (Karel Vasak)', `${R('Karel Vasak')}`, [
  `1.ª · ${R('derechos civiles y políticos')}: ${R('el derecho del hombre frente al Estado')}`, `2.ª · ${R('derechos económicos, sociales y culturales')} y colectivos (educación, trabajo)`,
  `3.ª · ${R('paz, solidaridad, medio ambiente sano')}: ${R('no tiene carácter vinculante')}`]));
v('Generaciones y características', arbol('Características de los derechos humanos', `${D('Derecho humano')}: facultades inherentes a la condición humana`, [
  `${R('Universalidad')}: para todos y en todos los lugares`, `${R('Inalienabilidad')}: no se puede disponer de ellos, ni total ni parcialmente`, `${R('Irrenunciabilidad')}: nadie puede desprenderse de ellos, ni por su voluntad`,
  `${R('Inviolabilidad')}: no pueden ser lesionados en su goce`, `${R('Progresividad')}: no pueden ser disminuidos`, `${K('No')} son absolutos`]));

// ---------------------------------------------------------------------------------------------
let s = fs.readFileSync(F, 'utf8');
// 1) limpiar versión anterior (CSS, helpers JS, definiciones y líneas insertadas)
s = s.replace(/\/\* VISUALES: [\s\S]*?(?=\nspan\.m-caja\{)/, '');
s = s.replace(/\/\* VISUALES helpers \*\/[\s\S]*?(?=\nconst T1 = \{\};)/, '');
s = s.replace(/^const VIS_T1 = \{[\s\S]*?\n\};\n/m, '');
{ const keep = []; for (const l of s.split('\n')) {
    if (/^  \+ \/\*VIS\*\//.test(l)) { if (/;\s*$/.test(l)) keep[keep.length - 1] = keep[keep.length - 1].replace(/(\s*)$/, ';$1'); continue; }
    keep.push(l); }
  s = keep.join('\n'); }
// 2) CSS
if (!s.includes('\nspan.m-caja{')) throw new Error('no encuentro el ancla span.m-caja');
s = s.replace('\nspan.m-caja{', '\n' + CSS + 'span.m-caja{');
// 3) definiciones
const defs = V.map(([, h], i) => `  v${i}: ${JSON.stringify(h)}`).join(',\n');
s = s.replace('const T1 = {};', `const VIS_T1 = {\n${defs}\n};\nconst T1 = {};`);
// 4) inserciones tras la ficha (y su trampa si va justo debajo)
const lines = s.split('\n');
const ini = lines.findIndex(l => l.startsWith('const T1 = {};'));
const fin = lines.findIndex(l => l.startsWith('/* T1_RECUERDA'));
const out = []; const usados = new Set();
for (let i = 0; i < lines.length; i++) {
  out.push(lines[i]);
  if (i > ini && i < fin && lines[i].startsWith('  + articuloResp("')) {
    const cab = lines[i].slice('  + articuloResp("'.length);
    const idx = V.map((x, k) => [x, k]).filter(([x]) => cab.startsWith(x[0]) || cab.includes(x[0])).map(([, k]) => k).filter(k => !usados.has(k));
    if (!idx.length) continue;
    if (/^  \+ trampa\(/.test(lines[i + 1] || '')) { out.push(lines[i + 1]); i++; }
    // si la última línea de la expresión termina en «;», el punto y coma pasa a la última línea insertada
    let fin_pc = false; const ult = out[out.length - 1];
    if (/;\s*$/.test(ult)) { out[out.length - 1] = ult.replace(/;(\s*)$/, '$1'); fin_pc = true; }
    for (const k of idx) { out.push('  + /*VIS*/ VIS_T1.v' + k); usados.add(k); }
    if (fin_pc) out[out.length - 1] += ';';
  }
}
const faltan = V.map((x, k) => k).filter(k => !usados.has(k));
if (faltan.length) console.error('SIN COLOCAR:', faltan.map(k => V[k][0]).join(' | '));
fs.writeFileSync(F, out.join('\n'));
console.log('diagramas:', V.length, 'colocados:', usados.size);
