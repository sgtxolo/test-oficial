// Esquemas visuales del Tema 2 (Terrorismo y delincuencia transnacional): recrean los cuadros y esquemas que trae el temario
// (hubs de residentes / no residentes, tablas de prescripción, reservas del Convenio de Varsovia, enmiendas, diagrama del art. 48,
// graduación de sanciones, delito transnacional, finalidad del Protocolo de trata) + dos cuadros propios (sanciones de las dos leyes).
// El contenido sale del texto del temario (los cuadros del PDF son texto); los círculos y notas a mano del usuario se trasladan como énfasis.
// Uso: node prompts/herramientas/visuales-t2.js
const L = require('./visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos } = L;
const V = []; const v = (despues, html) => V.push([despues, html]);

// ---------- 2.1 LEY 19/2003: esquemas generados por esquemas-t2.js (los mismos del ⚡ Exprés, con tu subrayado y enlazados a las preguntas) ----------
require('./esquemas-t2.js').visuales().forEach(([cab, html]) => v(cab, html));

// ---------- 2.2 CONVENIO DE VARSOVIA ----------
v('Artículos 5, 6 y 7 — Provocación pública', arbol('Arts. 5, 6 y 7: los tres delitos del Convenio (cuadro del temario)', `Cada Parte ${D('adoptará medidas')} para ${D('tipificar como delito')}, conforme a su derecho interno, cuando se cometa ${R('ilegal e intencionadamente')}`, [
  `${R('Provocación pública')} (art. 5): la ${R('DIFUSIÓN')} o cualquier otra forma de puesta a disposición del público de mensajes con la intención de incitar a cometer delitos terroristas, preconice o no directamente su comisión, si ${R('crea peligro')} de que se cometan`,
  `${R('Reclutamiento')} (art. 6): ${R('incitar a otra persona')} a cometer o participar en delitos terroristas, o a unirse a una asociación o grupo para contribuir a ello`,
  `${R('Adiestramiento')} (art. 7): ${R('dar instrucciones')} para fabricar o usar explosivos, armas de fuego u otras armas o sustancias nocivas o peligrosas, o para otros métodos y técnicas, sabiendo que la formación sirve a esos fines`,
  `Irrelevancia del resultado (art. 8): ${K('no es necesario')} que el delito terrorista se haya cometido efectivamente`]));

v('Artículos 10 y 11 — Responsabilidad', arbol('Responsabilidad y sanciones (arts. 10 y 11 · cuadros del temario)', `${D('Personas jurídicas')} que participen en los delitos de los arts. 5 a 7 y 9`, [
  `Responsabilidad ${R('penal, civil o administrativa')} (sin perjuicio de los principios jurídicos de la Parte)`,
  `${K('Sin perjuicio')} de la responsabilidad penal de las personas físicas que hayan cometido los delitos`,
  `Penas aplicables a los delitos (arts. 5 a 7 y 9): ${R('EFECTIVAS')}, ${R('PROPORCIONADAS')} y ${R('DISUASORIAS')}`,
  `Personas jurídicas: sanciones efectivas, proporcionadas y disuasorias, ${R('penales o no penales, incluidas las pecuniarias')}`,
  'Una condena firme anterior dictada en un Estado extranjero podrá tenerse en cuenta en la determinación de la pena']));

v('Artículo 20 — Exclusión de la cláusula', flujo('Reserva de no aplicar la cláusula de excepción política (art. 20 · cuadro del temario)', [
  { et: '1', t: `Validez ${P('TRES AÑOS')} desde la entrada en vigor del Convenio para la Parte · ${R('renovable por períodos de igual duración')}` },
  { et: '2', t: `${P('12 MESES')} antes de la expiración: el ${R('Secretario General del Consejo de Europa')} informa a la Parte` },
  { et: '3', t: `${P('3 MESES')} antes: la Parte ${R('notifica su intención')} de ${D('MANTENER')} · ${D('MODIFICAR')} · ${D('RETIRAR')} (si mantiene, da explicaciones)` },
  { et: '4', t: `A falta de notificación: el Secretario General informa de que queda ${R('prorrogada automáticamente por 6 MESES')}` },
  { et: '5', t: `Si sigue sin notificar pasado ese período: la reserva queda ${R('SIN EFECTO')}` }]));

v('Artículos 27 y 28 — Enmiendas', flujo('Enmiendas al Convenio (art. 27 · cuadro del temario)', [
  { et: 'Propone', t: `${R('Cualquiera de las Partes')} · ${R('el Comité de Ministros del Consejo de Europa')} · ${R('la Consulta entre las Partes')}` },
  { et: 'Comunica', t: 'Toda enmienda propuesta se comunica a las Partes por el Secretario General del Consejo de Europa' },
  { et: 'Dictamen', t: 'La propuesta de una Parte o del Comité de Ministros se traslada a la Consulta entre las Partes, que somete su dictamen al Comité de Ministros' },
  { et: 'Aprueba', t: `El ${R('Comité de Ministros')} podrá aprobar la enmienda` },
  { et: 'Acepta', t: 'El texto aprobado se transmite a las Partes para su aceptación' },
  { et: 'Vigor', t: `Entra en vigor el ${P('TRIGÉSIMO DÍA')} siguiente a la fecha en que ${R('todas las Partes')} hayan comunicado su aceptación al Secretario General`, c: 'ok' }]));

v('Artículos 27 y 28 — Enmiendas', arbol('Revisión del anexo (art. 28)', `${D('Anexo')}: lista de tratados universales contra el terrorismo`, [
  `Proponen: ${R('cualquiera de las Partes o el Comité de Ministros')} · solo afectan a tratados ${R('universales de las Naciones Unidas, referidos específicamente al terrorismo internacional y vigentes')}`,
  `El Comité de Ministros puede aprobarla por la mayoría del art. 20.d) del Estatuto del Consejo de Europa · entra en vigor tras ${P('un año')} desde su transmisión a las Partes`,
  `${R('Un tercio de las Partes')} notifica una objeción: ${K('no entra en vigor')}`,
  `${K('Menos de un tercio')}: entra en vigor respecto a las Partes que no hayan formulado objeción`]));

v('Artículos 29, 30 y 31 — Solución', arbol('Consulta entre las Partes (art. 30 · cuadro del temario)', `${D('Las Partes se consultarán periódicamente')} con el fin de:`, [
  'a) Efectuar propuestas para facilitar o mejorar la utilización y la aplicación efectivas del Convenio (problemas y efectos de las declaraciones)',
  'b) Formular su opinión sobre la conformidad de una negativa de extradición sometida en virtud del art. 20.8',
  'c) Efectuar propuestas de enmiendas (art. 27) · d) opinar sobre cualquier propuesta de enmienda (art. 27.3)',
  'e) Opinar sobre cualquier cuestión relativa a la aplicación del Convenio e intercambiar información sobre avances jurídicos, políticos o técnicos',
  `Convocada por el ${R('Secretario General del Consejo de Europa')} cada vez que lo considere necesario y, en todo caso, si lo solicita ${R('la mayoría de las Partes o el Comité de Ministros')} · las Partes están asistidas por el Secretario General`]));

// ---------- 2.3 LEY 10/2010 ----------
v('Artículos 7, 9 y 11 — Aplicación de la diligencia', arbol('Recurso a terceros para la diligencia debida (art. 8 · cuadro del temario)', `Los sujetos obligados ${D('podrán recurrir')} a:`, [
  'Terceros sometidos a la presente Ley · organizaciones o federaciones de estos sujetos',
  'Terceros sometidos a la legislación de prevención de otros Estados miembros o países terceros · organizaciones o federaciones de estas entidades',
  `Exige la previa conclusión de un ${R('ACUERDO ESCRITO')} entre el sujeto obligado y el tercero, formalizando sus obligaciones`,
  `${K('Siempre que')} su cumplimiento sea objeto de ${R('supervisión por las autoridades competentes')}`,
  `Los terceros ponen a ${P('inmediata disposición')} la información y remiten copia de la documentación a instancias del sujeto obligado`]));

v('Artículos 26 ter, 27 y 28', arbol('Órganos centralizados de prevención (art. 27 · cuadro del temario)', `${R('Mediante orden del Ministro de Economía y Empresa')} podrá acordarse la constitución de órganos centralizados de prevención de las profesiones colegiadas sujetas a la Ley`, [
  `Funciones: ${R('INTENSIFICACIÓN')} y ${R('CANALIZACIÓN')} de la colaboración de las profesiones colegiadas con las autoridades judiciales, policiales y administrativas responsables de la prevención y represión del blanqueo y la financiación del terrorismo`,
  `${K('Sin perjuicio')} de la responsabilidad directa de los profesionales incorporados como sujetos obligados`,
  'Examinan, por propia iniciativa o a petición de los profesionales, las operaciones del art. 17 y las comunican al Servicio Ejecutivo cuando concurran las circunstancias del art. 18',
  'El representante del órgano centralizado es el representante de los profesionales incorporados (art. 26 ter)']));

v('Artículos 45 y 46 — Órganos de apoyo', flujo('Régimen de colaboración (art. 48 · cuadro del temario)', [
  { et: 'Autoridad o funcionario', t: `que descubra hechos que puedan constituir ${R('INDICIO')} o ${R('PRUEBA')} de blanqueo o de financiación del terrorismo → ${R('deberán informar al SERVICIO EJECUTIVO de la Comisión')}` },
  { et: 'Supervisores', t: `Banco de España · CNMV · Dirección General de Seguros y Fondos de Pensiones · Dirección General de los Registros y del Notariado · ICAC · colegios profesionales · órganos estatales o autonómicos competentes → ${R('informarán razonadamente')} a la ${R('SECRETARÍA DE LA COMISIÓN')} cuando aprecien posibles infracciones de las obligaciones establecidas` },
  { et: 'Órganos judiciales', t: `${R('De oficio o a instancia del MINISTERIO FISCAL')} → ${R('remiten TESTIMONIO')} a la Secretaría de la Comisión cuando aprecien indicios de incumplimiento de la presente ley` }]));

v('Artículos 56, 57 y 58 — Sanciones', cols('Sanciones de la Ley 10/2010: muy graves, graves y leves (arts. 56 a 61 · cuadro propio con las notas M-G-L del temario)',
  [{ t: 'MUY GRAVES (arts. 51 y 56)', l: [
      `Multa ${R('mínimo 150.000 €')}; máximo: la mayor de ${P('10 % del volumen de negocios')}, ${P('el duplo')} del contenido económico, ${P('el quíntuplo')} de los beneficios o ${P('10.000.000 €')}`,
      'Amonestación pública · suspensión temporal o revocación de la autorización (entidades autorizadas)',
      `Directivos: multa ${P('60.000 a 10.000.000 €')} · separación del cargo e inhabilitación ${P('hasta 10 años')}`,
      `Prescribe a los ${P('5 años')} · la sanción, a los ${P('3 años')}`,
      `Impone: ${R('Consejo de Ministros')} (a propuesta del Ministro de Economía)`] },
   { t: 'GRAVES (arts. 52 y 57)', l: [
      `Multa ${R('mínimo 60.000 €')}; máximo: la mayor de ${P('10 % del volumen de negocios')}, el contenido económico ${P('más un 50 %')}, ${P('el triple')} de los beneficios o ${P('5.000.000 €')}`,
      'Amonestación pública o privada · suspensión temporal de la autorización',
      `Directivos: multa ${P('3.000 a 5.000.000 €')} · separación del cargo e inhabilitación (máx. ${P('5 años')})`,
      `Prescribe a los ${P('5 años')} · la sanción, a los ${P('2 años')}`,
      `Impone: ${R('el Ministro de Economía')} (a propuesta de la Comisión)`] },
   { t: 'LEVES (arts. 53 y 58)', l: [
      `${R('Amonestación privada')} o ${R('multa de hasta 60.000 €')}`,
      'Las sanciones pueden ir acompañadas de un requerimiento para que ponga fin a su conducta',
      `Prescribe a los ${P('2 años')} · la sanción, al ${P('año')}`,
      `Impone: ${R('Director General del Tesoro y Política Financiera')} (a propuesta del instructor)`,
      `Instruye en todos los casos: ${R('la Secretaría de la Comisión')} · plazo máximo ${P('1 año')}`] }]));

v('Artículos 56, 57 y 58 — Sanciones', arbol('Graduación de las sanciones (art. 59 · cuadro del temario)', `${D('Las sanciones se graduarán atendiendo a')}:`, [
  'a) La cuantía de las operaciones afectadas por el incumplimiento',
  'b) Los beneficios obtenidos como consecuencia de las omisiones o actos constitutivos de la infracción',
  `c) La circunstancia de haber procedido o no a la ${R('subsanación')} de la infracción por propia iniciativa`,
  `d) Las sanciones firmes en vía administrativa por infracciones de distinto tipo impuestas al sujeto obligado ${P('en los últimos cinco años')}`,
  'e) El grado de responsabilidad o intencionalidad · f) La gravedad y duración de la infracción',
  'g) Las pérdidas para terceros causadas por el incumplimiento · h) La capacidad económica del inculpado, cuando la sanción sea de multa']));

// ---------- 2.4 PALERMO ----------
v('Artículos 3 y 4 — Ámbito de aplicación', flujo('El delito será de carácter transnacional si (art. 3.2 · cuadro del temario)', [
  { et: 'a', t: `Se comete en ${R('más de un Estado')}` },
  { et: 'b', t: `Se comete dentro de un solo Estado pero ${R('una parte sustancial de su preparación, planificación, dirección o control')} se realiza en otro Estado` },
  { et: 'c', t: `Se comete dentro de un solo Estado pero entraña la participación de un ${R('grupo delictivo organizado que realiza actividades delictivas en más de un Estado')}` },
  { et: 'd', t: `Se comete en un solo Estado pero tiene ${R('efectos sustanciales en otro Estado')}` }]));

// ---------- 2.5 TRATA ----------
v('Artículos 1 y 2 — Relación con la Convención', arbol('Finalidad del Protocolo (art. 2 · cuadro del temario)', `${D('Finalidad del Protocolo')}: los fines son`, [
  `${R('Prevenir y combatir la trata de personas')}, prestando especial atención a ${R('las mujeres y los niños')}`,
  `${R('Proteger y ayudar a las víctimas')} de dicha trata, respetando plenamente sus derechos humanos`,
  `${R('Promover la cooperación')} entre los Estados Parte para lograr esos fines`]));

module.exports = V;
if (require.main === module) L.inserta(2, V);
