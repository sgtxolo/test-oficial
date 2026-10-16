// Ajuste puntual (16/10/2026): alarga distractores de preguntas IA del Tema 7 donde la correcta era claramente la más larga.
const fs = require('fs');
const R = {
  'prompts/herramientas/preguntas-t7-b01.js': [
    ["'desarrollar los derechos fundamentales y las libertades públicas reconocidos en la Constitución.'", "'desarrollar los derechos fundamentales y las libertades públicas reconocidos en la Constitución y regular su ejercicio por las Comunidades Autónomas.'"],
    ["'regular el funcionamiento de las instituciones del Estado y de las Comunidades Autónomas.'", "'regular el funcionamiento de las instituciones del Estado y de las Comunidades Autónomas y el régimen de sus competencias.'"],
    ["'coordinar la actividad legislativa de las Cortes Generales y de las Asambleas autonómicas.'", "'coordinar la actividad legislativa de las Cortes Generales y de las Asambleas autonómicas en materias concurrentes.'"],
    ["'impedirá cualquier planteamiento ulterior de la cuestión por cualquiera de las dos vías.'", "'impedirá cualquier planteamiento ulterior de la cuestión por cualquiera de las dos vías, fundado en la misma infracción de idéntico precepto constitucional.'"],
    ["'solo permitirá un nuevo recurso de inconstitucionalidad en el plazo de tres meses.'", "'solo permitirá un nuevo recurso de inconstitucionalidad en el plazo de tres meses desde la notificación de la sentencia desestimatoria.'"],
    ["'será obstáculo para que la misma Ley pueda ser objeto de una cuestión de inconstitucionalidad en otro proceso.'", "'será obstáculo para que la misma Ley pueda ser objeto de una cuestión de inconstitucionalidad en otro proceso, salvo que la plantee el Ministerio Fiscal.'"],
    ["'en cualquier momento del procedimiento, de oficio o a instancia de parte.'", "'en cualquier momento del procedimiento, de oficio o a instancia de parte, siempre que la norma sea aplicable al caso.'"],
    ["'antes de iniciarse el trámite de prueba y mediante providencia.'", "'antes de iniciarse el trámite de prueba y mediante providencia, oídas las partes y el Ministerio Fiscal.'"],
    ["'una vez firme la sentencia, dentro de los tres meses siguientes.'", "'una vez firme la sentencia, dentro de los tres meses siguientes a su notificación a las partes.'"],
    ["'desistimiento del recurso a cambio de la modificación del texto normativo en el plazo de seis meses.'", "'desistimiento del recurso a cambio de la modificación del texto normativo en el plazo de seis meses desde su publicación.'"],
    ["'suspensión automática de la norma durante las negociaciones.'", "'suspensión automática de la norma durante las negociaciones, hasta que se resuelva el recurso.'"],
  ],
  'prompts/herramientas/preguntas-t7-b02.js': [
    ["'los menores de edad y las personas con la capacidad modificada judicialmente.'", "'los menores de edad y las personas con la capacidad modificada judicialmente que precisen especial protección.'"],
    ["'las personas que hayan sido condenadas por sentencia penal firme.'", "'las personas que hayan sido condenadas por sentencia penal firme por delitos contra el honor.'"],
    ["'los familiares de las personas que ejerzan un cargo público.'", "'los familiares de las personas que ejerzan un cargo público o una profesión de notoriedad.'"],
    ["'únicamente en lugares o momentos de su vida privada.'", "'únicamente en lugares o momentos de su vida privada, y no fuera de ellos.'"],
    ["'en lugares cerrados al público, sin excepciones.'", "'en lugares cerrados al público, sin excepción alguna prevista en la Ley.'"],
    ["'sin consentimiento escrito de la persona afectada, en todo caso.'", "'sin consentimiento escrito de la persona afectada, en todo caso, aunque la Ley prevea excepciones.'"],
    ["'especial trascendencia jurídica, que se apreciará atendiendo a su importancia para la unificación de la jurisprudencia y para la protección de los derechos fundamentales.'", "'especial trascendencia jurídica, que se apreciará atendiendo a su importancia para la unificación de la jurisprudencia, para la aplicación de las leyes orgánicas y para la protección de los derechos fundamentales de los ciudadanos.'"],
    ["'especial relevancia pública, que se apreciará atendiendo a su importancia para la interpretación de la Constitución y de las leyes orgánicas.'", "'especial relevancia pública, que se apreciará atendiendo a su importancia para la interpretación de la Constitución, para su aplicación o para su general eficacia, y para el interés general de los ciudadanos.'"],
  ],
};
for (const [f, lista] of Object.entries(R)) {
  let s = fs.readFileSync(f, 'utf8'); let n = 0;
  for (const [a, b] of lista) { const c = s.split(a).length - 1; if (c !== 1) { console.log('✗', c, 'coincidencias:', a.slice(0, 60)); continue; } s = s.replace(a, () => b); n++; }
  fs.writeFileSync(f, s); console.log(f, n + '/' + lista.length);
}
