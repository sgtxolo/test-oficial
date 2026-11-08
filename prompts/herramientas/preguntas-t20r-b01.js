// Tema 20 · bloque 1 · LECrim, págs. 1-10 de mi PDF subrayado (arts. 8-14: competencia) · IA estilo examen (20-ia-1001…)
// Uso: node prompts/herramientas/preguntas-t20r-b01.js [--json <salida.json>]
const AP = 'De la competencia';
const q = (a, r, e, o, t, p, d) => ({ k: 'lecrim', a, r, e, o, t, p, d, ap: AP });
const R = 'De las reglas por donde se determina la competencia';
const Q = [
// ---- pág. 5
q("art. 8", R, "La jurisdicción criminal es siempre __________:",
 ["improrrogable", "prorrogable a petición de parte", "indelegable", "irrenunciable"],
 "La jurisdicción criminal es siempre improrrogable", "La nota que la ley atribuye a la jurisdicción criminal es la improrrogabilidad.", "media"),
q("art. 9", R, "Los Jueces y Tribunales que tengan competencia para conocer de una causa determinada la tendrán también:",
 ["para todas sus incidencias, para llevar a efecto las providencias de tramitación y para la ejecución de las sentencias.", "para sus incidencias, pero no para la ejecución de las sentencias, que corresponderá siempre al Juez de Vigilancia Penitenciaria.", "para las incidencias y para dictar sentencia, pero no para las providencias de tramitación de otras causas conexas.", "para sus incidencias únicamente cuando lo solicite expresamente el Ministerio Fiscal en su primer escrito."],
 "la tendrán también para todas sus incidencias, para llevar a efecto las providencias de tramitación y para la ejecución de las sentencias", "La competencia para la causa se extiende a incidencias, tramitación y ejecución de las sentencias.", "media"),
q("art. 10", R, "Corresponde a la jurisdicción ordinaria el conocimiento de las causas y juicios criminales, con excepción de los casos reservados por las leyes. Señale la INCORRECTA. Es caso reservado por las leyes a otra jurisdicción o autoridad:",
 ["El que corresponda al Tribunal de Jurado.", "El reservado al Senado.", "El reservado a los Tribunales de Guerra y Marina.", "El reservado a las Autoridades administrativas o de policía."],
 "con excepción de los casos reservados por las leyes al Senado, a los Tribunales de Guerra y Marina y a las Autoridades administrativas o de policía", "El Tribunal del Jurado es órgano de la jurisdicción ordinaria y no figura entre las excepciones.", "dificil"),
q("art. 11", R, "En los delitos en que aparezcan a la vez culpables personas sujetas a la jurisdicción ordinaria y otras aforadas, el conocimiento de las causas corresponderá:",
 ["a la ordinaria, salvo las excepciones consignadas expresamente en las Leyes.", "a la jurisdicción a la que pertenezcan los aforados, sin excepción alguna, por razón de su fuero.", "a la jurisdicción ordinaria en todo caso, aunque otra Ley atribuya la competencia a una jurisdicción distinta.", "a la jurisdicción que primero hubiera iniciado las diligencias, con independencia de la condición de los culpables."],
 "corresponderá a la ordinaria, salvo las excepciones consignadas expresamente en las Leyes", "Corresponde a la ordinaria, pero cabe excepción expresa en las leyes respecto a la competencia de otra jurisdicción.", "dificil"),
q("art. 12", R, "La jurisdicción ordinaria será siempre competente para __________ las causas por delitos que cometan los aforados:",
 ["prevenir", "instruir y fallar", "archivar", "juzgar"],
 "la jurisdicción ordinaria será siempre competente para prevenir las causas por delitos que cometan los aforados", "La ley habla de prevenir las causas, limitándose luego a las primeras diligencias.", "media"),
// ---- pág. 6
q("art. 12", R, "Respecto de los delitos que cometan los aforados, la jurisdicción ordinaria limita su competencia a instruir las primeras diligencias. Concluidas estas:",
 ["remitirá las actuaciones al Juez o Tribunal que deba conocer de la causa y pondrá a su disposición a los detenidos y los efectos ocupados.", "continuará la instrucción hasta su conclusión y remitirá solo la pieza de convicción a la jurisdicción especial competente.", "archivará provisionalmente las actuaciones hasta que la jurisdicción especial reclame los detenidos y los efectos.", "remitirá las actuaciones al Ministerio Fiscal para que decida a qué jurisdicción deben pasar los detenidos."],
 "concluidas las cuales la jurisdicción ordinaria remitirá las actuaciones al Juez o Tribunal que deba conocer de la causa con arreglo a las Leyes, y pondrá a su disposición a los detenidos y los efectos ocupados", "Tras las primeras diligencias se remite todo, incluidos detenidos y efectos, al órgano que deba conocer.", "media"),
q("art. 12", R, "Los autos de inhibición que pronuncien los Jueces instructores de la jurisdicción ordinaria en las primeras diligencias seguidas por delitos de aforados son apelables ante:",
 ["la respectiva Audiencia.", "el Juez de Instrucción de mayor antigüedad del partido.", "el Tribunal Supremo.", "la Sala de lo Penal de la Audiencia Nacional."],
 "Los autos de inhibición de esta clase que pronuncien los Jueces instructores de la jurisdicción ordinaria son apelables ante la respectiva Audiencia", "El recurso se resuelve por la respectiva Audiencia.", "media"),
q("art. 12", R, "La jurisdicción ordinaria cesará en las primeras diligencias seguidas por delito de un aforado:",
 ["tan luego como conste que la especial competente instruye causa sobre el mismo delito.", "cuando transcurran setenta y dos horas desde que se pusieron los detenidos a disposición del Juez.", "cuando la Audiencia respectiva lo ordene mediante auto motivado y dé audiencia al Ministerio Fiscal.", "cuando se hayan practicado todas las diligencias de investigación necesarias para el esclarecimiento del hecho."],
 "La jurisdicción ordinaria cesará en las primeras diligencias tan luego como conste que la especial competente instruye causa sobre el mismo delito", "Cesa en cuanto consta que la jurisdicción especial instruye causa sobre el mismo delito.", "dificil"),
q("art. 13", R, "Señale la INCORRECTA. Se consideran primeras diligencias:",
 ["La de interrogar al presunto responsable en presencia de su Letrado.", "La de consignar las pruebas del delito que puedan desaparecer.", "La de recoger y poner en custodia cuanto conduzca a su comprobación y a la identificación del delincuente.", "La de detener, en su caso, a los presuntos responsables del delito."],
 "la de consignar las pruebas del delito que puedan desaparecer, la de recoger y poner en custodia cuanto conduzca a su comprobación y a la identificación del delincuente, la de detener, en su caso, a los presuntos responsables del delito", "El interrogatorio con Letrado no está en la enumeración legal de primeras diligencias.", "dificil"),
q("art. 13", R, "Se considera primera diligencia la de proteger a los ofendidos o perjudicados por el delito, a sus familiares o a otras personas, o evitar la __________:",
 ["reiteración delictiva", "reincidencia", "fuga del presunto responsable", "ocultación de efectos del delito"],
 "la de proteger a los ofendidos o perjudicados por el mismo, a sus familiares o a otras personas, o evitar la reiteración delictiva", "La finalidad añadida es evitar la reiteración delictiva.", "media"),
q("art. 14.4", R, "Para el conocimiento y fallo de las causas por delitos en los demás casos (los no atribuidos a las Secciones de lo Penal ni a las de violencia), son competentes:",
 ["la Audiencia Provincial de la circunscripción donde el delito se haya cometido, o la Sala de lo Penal de la Audiencia Nacional.", "la Sección de Instrucción del Tribunal de Instancia del partido en que el delito se hubiere cometido.", "el Juez Central de lo Penal en el ámbito que le es propio, en todo caso.", "la Sala de lo Penal del Tribunal Superior de Justicia de la Comunidad Autónoma donde se cometió el delito."],
 "Para el conocimiento y fallo de las causas en los demás casos la Audiencia Provincial de la circunscripción donde el delito se haya cometido, o la Audiencia Provincial correspondiente a la circunscripción del Juzgado de Violencia sobre la Mujer en su caso, o la Sala de lo Penal de la Audiencia Nacional", "En los demás casos conoce y falla la Audiencia Provincial (o la Sala de lo Penal de la Audiencia Nacional).", "dificil"),
q("art. 14.4", R, "En los supuestos de competencia de la Audiencia Provincial, si el delito fuere de los atribuidos al Tribunal de Jurado:",
 ["el conocimiento y fallo corresponderá a éste.", "la Audiencia Provincial conoce y falla, y el Jurado solo emite veredicto sobre los hechos.", "la instrucción se atribuirá al Juez Central de Instrucción.", "la competencia pasará a la Sala de lo Penal de la Audiencia Nacional."],
 "si el delito fuere de los atribuidos al Tribunal de Jurado, el conocimiento y fallo corresponderá a éste", "Si el delito es de los atribuidos al Jurado, a este corresponde el conocimiento y fallo.", "media"),
// ---- pág. 9
q("art. 9", R, "Los Jueces y Tribunales con competencia para conocer de una causa determinada la tendrán también para llevar a efecto las providencias de __________:",
 ["tramitación", "ejecución", "notificación", "instrucción"],
 "para llevar a efecto las providencias de tramitación", "Son las providencias de tramitación.", "media"),
q("art. 11", R, "El conocimiento de las causas por delitos en que aparezcan a la vez culpables personas sujetas a la jurisdicción ordinaria y otras __________ corresponderá a la ordinaria:",
 ["aforadas", "inmunes", "privilegiadas", "exentas"],
 "personas sujetas a la jurisdicción ordinaria y otras aforadas corresponderá a la ordinaria", "El término legal es «aforadas».", "media"),
q("art. 12", R, "Esta competencia de la jurisdicción ordinaria respecto de los aforados se limitará a instruir las primeras __________:",
 ["diligencias", "actuaciones", "pesquisas", "investigaciones"],
 "Esta competencia se limitará a instruir las primeras diligencias", "La fórmula literal es «primeras diligencias».", "media"),
q("art. 12", R, "Entre tanto que se sustancia y decide el recurso de apelación contra el auto de inhibición de esta clase, para la sustanciación del recurso se remitirá:",
 ["el correspondiente testimonio.", "la causa original con las piezas de convicción.", "una certificación del Secretario con los efectos ocupados.", "el informe del Ministerio Fiscal."],
 "para la sustanciación del recurso se remitirá el correspondiente testimonio", "Se remite testimonio y no los autos originales.", "dificil"),
];
require('./preguntas-t20r-lib.js').run({ bloque: 1, Q });
