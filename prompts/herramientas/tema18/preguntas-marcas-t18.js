// Tema 18 · fase 2 de las marcas (2/11/2026): apartados con marca suya (EXOF / EXAMEN / EX / ✱ / R) sin pregunta oficial (cobertura-marcas.js 18).
// Todas al banco OFICIAL (18-247…): EXOF, EXAMEN, EX, ✱ y R → oficiales. Cita literal comprobada contra tema18/oficial.txt; la correcta nunca la más larga.
// Uso: node prompts/herramientas/tema18/preguntas-marcas-t18.js [--check]
const N0 = 'Código Penal';
const AP = { pre: 'Título Preliminar: De las Garantías Penales y de la Aplicación de la Ley Penal', inf: 'De la Infracción Penal', resp: 'De las Personas Criminalmente Responsables de los Delitos', pen: 'De las Penas', apl: 'De la Aplicación de las Penas', ms: 'De las Medidas de Seguridad', civ: 'De la Responsabilidad Civil Derivada de los Delitos y de las Costas Procesales', acc: 'De las Consecuencias Accesorias', ext: 'De la Extinción de la Responsabilidad Criminal y sus Efectos' };
const R = []; let k = 0;
// q(apartado, artículo, rúbrica, enunciado, correcta, [3 incorrectas], cita literal) — la correcta rota de posición (A/B/C/D)
const q = (ap, a, r, e, ok, mal, t) => { const pos = (k++ * 3 + 1) % 4; const o = mal.slice(); o.splice(pos, 0, ok); R.push({ n: [N0, N0, AP[ap]], ia: false, a, r, e, o, c: pos, t, p: '' }); };

q('pre', 'art. 7', 'Tiempo del delito', 'A los efectos de determinar la ley penal aplicable en el tiempo, los delitos se consideran cometidos:',
  'En el momento en que el sujeto ejecuta la acción u omite el acto que estaba obligado a realizar.', ['En el momento en que se produce el resultado de la acción u omisión.', 'En el momento en que los hechos llegan a conocimiento de la autoridad judicial.', 'En el momento en que se incoa el procedimiento penal contra el sujeto.'],
  'A los efectos de determinar la ley penal aplicable en el tiempo, los delitos se consideran cometidos en el momento en que el sujeto ejecuta la acción u omite el acto que estaba obligado a realizar');
q('pre', 'art. 8.1.ª', 'Concurso de normas', 'Los hechos susceptibles de ser calificados con arreglo a dos o más preceptos del Código, se castigarán observando, entre otras, la regla según la cual:',
  'El precepto especial se aplicará con preferencia al general.', ['El precepto general se aplicará con preferencia al especial.', 'El precepto subsidiario se aplicará con preferencia al principal.', 'El precepto penal más benigno excluirá a los que castiguen el hecho con pena mayor.'],
  '1.ª El precepto especial se aplicará con preferencia al general');
q('inf', 'art. 15', 'Delito consumado y tentativa', 'Son punibles:',
  'El delito consumado y la tentativa de delito.', ['Únicamente el delito consumado, salvo previsión expresa de la tentativa.', 'El delito consumado, la tentativa y los actos preparatorios en todo caso.', 'El delito consumado y la tentativa, solo si el resultado se hubiera producido en parte.'],
  'Son punibles el delito consumado y la tentativa de delito');
q('inf', 'art. 17.2', 'Conspiración y proposición', 'La proposición existe cuando:',
  'El que ha resuelto cometer un delito invita a otra u otras personas a participar en él.', ['Dos o más personas se conciertan para la ejecución de un delito y resuelven ejecutarlo.', 'Se incita directamente por medio de la imprenta a la perpetración de un delito.', 'El sujeto da principio a la ejecución del delito directamente por hechos exteriores.'],
  '2. La proposición existe cuando el que ha resuelto cometer un delito invita a otra u otras personas a participar en él');
q('inf', 'art. 18.2', 'Provocación', 'Si a la provocación hubiese seguido la perpetración del delito, se castigará como:',
  'Inducción.', ['Conspiración.', 'Proposición.', 'Apología.'],
  'Si a la provocación hubiese seguido la perpetración del delito, se castigará como inducción');
q('resp', 'art. 29', 'Cómplices', 'Son cómplices los que, no hallándose comprendidos entre los autores:',
  'Cooperan a la ejecución del hecho con actos anteriores o simultáneos.', ['Inducen directamente a otro u otros a ejecutar el hecho.', 'Cooperan a su ejecución con un acto sin el cual no se habría efectuado.', 'Realizan el hecho por medio de otro del que se sirven como instrumento.'],
  'Son cómplices los que, no hallándose comprendidos en el artículo anterior, cooperan a la ejecución del hecho con actos anteriores o simultáneos');
q('resp', 'art. 31 quater.b)', 'Atenuantes de las personas jurídicas', 'Sólo podrán considerarse circunstancias atenuantes de la responsabilidad penal de las personas jurídicas haber colaborado en la investigación del hecho aportando pruebas, en cualquier momento del proceso, que fueran nuevas y decisivas para:',
  'Esclarecer las responsabilidades penales dimanantes de los hechos.', ['Acreditar la inexistencia del deber de supervisión, vigilancia y control.', 'Determinar la cuantía de la multa que corresponda a la persona jurídica.', 'Demostrar la participación de sus representantes legales en el delito.'],
  'b) Haber colaborado en la investigación del hecho aportando pruebas, en cualquier momento del proceso, que fueran nuevas y decisivas para esclarecer las responsabilidades penales dimanantes de los hechos');
q('pen', 'art. 33.2.g)', 'Penas graves', 'La privación del derecho a la tenencia y porte de armas es pena grave cuando se impone por tiempo superior a:',
  'Ocho años.', ['Cinco años.', 'Diez años.', 'Seis años.'],
  'g) La privación del derecho a la tenencia y porte de armas por tiempo superior a ocho años');
q('pen', 'art. 33.3.d)', 'Penas menos graves', 'La privación del derecho a conducir vehículos a motor y ciclomotores es pena menos grave cuando su duración es:',
  'De un año y un día a ocho años.', ['De tres meses a un año.', 'De seis meses a cinco años.', 'De un año y un día a cinco años.'],
  'd) La privación del derecho a conducir vehículos a motor y ciclomotores de un año y un día a ocho años');
q('pen', 'art. 33.3.f)', 'Penas menos graves', 'La inhabilitación especial para el ejercicio de profesión, oficio o comercio que tenga relación con los animales y para la tenencia de animales es pena menos grave cuando su duración es:',
  'De un año y un día a cinco años.', ['De seis meses a cinco años.', 'De tres meses a un año.', 'De un año y un día a ocho años.'],
  'f) Inhabilitación especial para el ejercicio de profesión, oficio o comercio que tenga relación con los animales y para la tenencia de animales de un año y un día a cinco años');
q('pen', 'art. 33.3.h)', 'Penas menos graves', 'La prohibición de aproximarse a la víctima o a aquellos de sus familiares u otras personas que determine el juez o tribunal es pena menos grave cuando se impone por tiempo de:',
  'Seis meses a cinco años.', ['Un mes a menos de seis meses.', 'Un año y un día a ocho años.', 'Tres meses a cinco años.'],
  'h) La prohibición de aproximarse a la víctima o a aquellos de sus familiares u otras personas que determine el juez o tribunal, por tiempo de seis meses a cinco años');
q('pen', 'art. 33.3.i)', 'Penas menos graves', 'La prohibición de comunicarse con la víctima o con aquellos de sus familiares u otras personas que determine el juez o tribunal es pena menos grave cuando se impone por tiempo de:',
  'Seis meses a cinco años.', ['Un mes a menos de seis meses.', 'Un año y un día a ocho años.', 'Tres meses a cinco años.'],
  'i) La prohibición de comunicarse con la víctima o con aquellos de sus familiares u otras personas que determine el juez o tribunal, por tiempo de seis meses a cinco años');
q('pen', 'art. 33.3.j)', 'Penas menos graves', 'La pena de multa es pena menos grave cuando es:',
  'De más de tres meses.', ['De hasta tres meses.', 'De más de seis meses.', 'De más de un año.'],
  'j) La multa de más de tres meses');
q('pen', 'art. 33.3.k)', 'Penas menos graves', 'La multa proporcional es pena menos grave:',
  'Cualquiera que fuese su cuantía, salvo lo dispuesto para las penas aplicables a las personas jurídicas.', ['Solo cuando su cuantía exceda de seis mil euros.', 'Solo cuando se imponga conjuntamente con una pena privativa de libertad.', 'Únicamente cuando el condenado sea una persona física con antecedentes penales.'],
  'k) La multa proporcional, cualquiera que fuese su cuantía, salvo lo dispuesto en el apartado 7 de este artículo');
q('pen', 'art. 33.7.d)', 'Penas de las personas jurídicas', 'La clausura de los locales y establecimientos de la persona jurídica se impondrá por un plazo que no podrá exceder de:',
  'Cinco años.', ['Quince años.', 'Diez años.', 'Tres años.'],
  'd) Clausura de sus locales y establecimientos por un plazo que no podrá exceder de cinco años');
q('pen', 'art. 36.2', 'Pena de prisión', 'La pena de prisión tendrá una duración mínima de tres meses y máxima de:',
  'Veinte años, salvo lo que excepcionalmente dispongan otros preceptos del presente Código.', ['Quince años, salvo lo que excepcionalmente dispongan otros preceptos del presente Código.', 'Veinticinco años, salvo lo que excepcionalmente dispongan las leyes penales especiales.', 'Treinta años, salvo lo que excepcionalmente dispongan otros preceptos del presente Código.'],
  '2. La pena de prisión tendrá una duración mínima de tres meses y máxima de veinte años, salvo lo que excepcionalmente dispongan otros preceptos del presente Código');
q('pen', 'art. 50.1', 'Pena de multa', 'La pena de multa consistirá en:',
  'La imposición al condenado de una sanción pecuniaria.', ['La imposición al condenado de una sanción administrativa de naturaleza pecuniaria.', 'El pago de la cantidad que fije el Ministerio Fiscal en su escrito de acusación.', 'La privación de determinados bienes del condenado a favor del Estado.'],
  '1. La pena de multa consistirá en la imposición al condenado de una sanción pecuniaria');
q('pen', 'art. 50.3', 'Pena de multa', 'La pena de multa tendrá una extensión mínima de diez días y máxima de dos años. Las penas de multa imponibles a personas jurídicas tendrán una extensión máxima de:',
  'Cinco años.', ['Tres años.', 'Diez años.', 'Dos años.'],
  'Su extensión mínima será de diez días y la máxima de dos años. Las penas de multa imponibles a personas jurídicas tendrán una extensión máxima de cinco años');
q('apl', 'art. 62', 'Penas de la tentativa', 'A los autores de tentativa de delito se les impondrá:',
  'La pena inferior en uno o dos grados a la señalada por la Ley para el delito consumado, en la extensión que se estime adecuada.', ['La pena inferior en un solo grado a la señalada por la Ley para el delito consumado, en la extensión que se estime adecuada.', 'La pena inferior en dos grados a la señalada por la Ley para el delito consumado, en todo caso.', 'La misma pena que a los autores del delito consumado, en su mitad inferior.'],
  'A los autores de tentativa de delito se les impondrá la pena inferior en uno o dos grados a la señalada por la Ley para el delito consumado, en la extensión que se estime adecuada');
q('apl', 'art. 63', 'Penas de la complicidad', 'A los cómplices de un delito consumado o intentado se les impondrá:',
  'La pena inferior en grado a la fijada por la Ley para los autores del mismo delito.', ['La pena inferior en uno o dos grados a la fijada por la Ley para los autores del mismo delito.', 'La misma pena que a los autores, en su mitad inferior.', 'La pena inferior en grado a la señalada para el delito consumado, solo si éste se hubiera consumado.'],
  'A los cómplices de un delito consumado o intentado se les impondrá la pena inferior en grado a la fijada por la Ley para los autores del mismo delito');
q('apl', 'art. 66.1.3.ª', 'Reglas de aplicación de la pena', 'En los delitos dolosos, cuando concurra sólo una o dos circunstancias agravantes y ninguna atenuante, los jueces o tribunales aplicarán la pena:',
  'En la mitad superior de la que fije la ley para el delito.', ['Superior en grado a la establecida por la ley, en su mitad inferior.', 'En la mitad inferior de la que fije la ley para el delito.', 'Superior en grado a la establecida por la ley, en toda su extensión.'],
  '3.ª Cuando concurra sólo una o dos circunstancias agravantes, aplicarán la pena en la mitad superior de la que fije la ley para el delito');
q('apl', 'art. 66.1.5.ª', 'Reglas de aplicación de la pena', 'Cuando el culpable al delinquir hubiera sido condenado ejecutoriamente, al menos, por tres delitos comprendidos en el mismo título del Código, siempre que sean de la misma naturaleza, los jueces o tribunales podrán aplicar:',
  'La pena superior en grado a la prevista por la ley para el delito de que se trate, teniendo en cuenta las condenas precedentes, así como la gravedad del nuevo delito cometido.', ['La pena superior en dos grados a la prevista por la ley para el delito de que se trate, atendidas las condenas precedentes.', 'La pena en su mitad superior, sin que pueda exceder de la pena prevista para el delito.', 'La pena superior en grado, sin tener en cuenta la gravedad del nuevo delito cometido.'],
  'podrán aplicar la pena superior en grado a la prevista por la ley para el delito de que se trate, teniendo en cuenta las condenas precedentes, así como la gravedad del nuevo delito cometido');
q('apl', 'art. 69', 'Mayores de dieciocho y menores de veintiún años', 'Al mayor de dieciocho años y menor de veintiuno que cometa un hecho delictivo, podrán aplicársele las disposiciones de:',
  'La ley que regule la responsabilidad penal del menor en los casos y con los requisitos que ésta disponga.', ['La Ley de Enjuiciamiento Criminal relativas al procedimiento para el enjuiciamiento rápido de delitos.', 'La ley penitenciaria, con cumplimiento de la pena en centros específicos para jóvenes.', 'La ley que regule la responsabilidad penal del menor, en todo caso y sin requisitos.'],
  'Al mayor de dieciocho años y menor de veintiuno que cometa un hecho delictivo, podrán aplicársele las disposiciones de la ley que regule la responsabilidad penal del menor en los casos y con los requisitos que ésta disponga');
q('apl', 'art. 70.3.4.º', 'Pena superior en grado', 'Cuando la pena superior en grado exceda de los límites máximos, tratándose de privación del derecho a conducir vehículos a motor y ciclomotores, se considerará inmediatamente superior la misma pena, con la cláusula de que su duración máxima será de:',
  '15 años.', ['10 años.', '20 años.', '30 años.'],
  '4.º Tratándose de privación del derecho a conducir vehículos a motor y ciclomotores, la misma pena, con la cláusula de que su duración máxima será de 15 años');
q('apl', 'art. 70.3.5.º', 'Pena superior en grado', 'Cuando la pena superior en grado exceda de los límites máximos, tratándose de privación del derecho a la tenencia y porte de armas, se considerará inmediatamente superior la misma pena, con la cláusula de que su duración máxima será de:',
  '20 años.', ['15 años.', '10 años.', '30 años.'],
  '5.º Tratándose de privación del derecho a la tenencia y porte de armas, la misma pena, con la cláusula de que su duración máxima será de 20 años');
q('apl', 'art. 71.2', 'Pena inferior en grado', 'Cuando por aplicación de las reglas de la pena inferior en grado proceda imponer una pena de prisión inferior a tres meses, ésta será en todo caso sustituida por:',
  'Multa, trabajos en beneficio de la comunidad o localización permanente, aunque la ley no prevea estas penas para el delito de que se trate.', ['Multa o trabajos en beneficio de la comunidad, solo si la ley prevé estas penas para el delito de que se trate.', 'Localización permanente, exclusivamente cuando el condenado lo solicite.', 'Suspensión de la ejecución de la pena, con sujeción a plazo de prueba.'],
  'ésta será en todo caso sustituida por multa, trabajos en beneficio de la comunidad, o localización permanente, aunque la ley no prevea estas penas para el delito de que se trate');
q('apl', 'art. 73', 'Concurso real', 'Al responsable de dos o más delitos o faltas se le impondrán todas las penas correspondientes a las diversas infracciones:',
  'Para su cumplimiento simultáneo, si fuera posible, por la naturaleza y efectos de las mismas.', ['Para su cumplimiento sucesivo, por orden de menor a mayor gravedad.', 'Para su cumplimiento simultáneo, en todo caso, cualquiera que sea su naturaleza.', 'Para su cumplimiento sucesivo, por orden cronológico de imposición.'],
  'Al responsable de dos o más delitos o faltas se le impondrán todas las penas correspondientes a las diversas infracciones para su cumplimiento simultáneo, si fuera posible, por la naturaleza y efectos de las mismas');
q('apl', 'art. 74.3', 'Delito continuado', 'Quedan exceptuadas de las reglas del delito continuado las ofensas a bienes eminentemente personales, salvo las constitutivas de infracciones contra el honor y la libertad e indemnidad sexuales que afecten:',
  'Al mismo sujeto pasivo.', ['A distintos sujetos pasivos.', 'A una generalidad de personas.', 'A personas menores de edad.'],
  'salvo las constitutivas de infracciones contra el honor y la libertad e indemnidad sexuales que afecten al mismo sujeto pasivo');
q('apl', 'art. 76.1.c)', 'Máximo de cumplimiento', 'Cuando el sujeto haya sido condenado por dos o más delitos y, al menos, dos de ellos estén castigados por la ley con pena de prisión superior a 20 años, el límite máximo de cumplimiento será de:',
  '40 años.', ['25 años.', '30 años.', '35 años.'],
  'c) De 40 años, cuando el sujeto haya sido condenado por dos o más delitos y, al menos, dos de ellos estén castigados por la ley con pena de prisión superior a 20 años');
q('apl', 'art. 79', 'Penas accesorias', 'Siempre que los Jueces o Tribunales impongan una pena que lleve consigo otras accesorias, condenarán también expresamente al reo:',
  'A estas últimas.', ['A las penas sustitutivas que procedan.', 'Al pago de las costas procesales.', 'A la responsabilidad civil derivada del delito.'],
  'Siempre que los Jueces o Tribunales impongan una pena que lleve consigo otras accesorias condenarán también expresamente al reo a estas últimas');
q('ms', 'art. 96.2', 'Medidas privativas de libertad', 'Son medidas de seguridad privativas de libertad:',
  'El internamiento en centro psiquiátrico, el internamiento en centro de deshabituación y el internamiento en centro educativo especial.', ['La inhabilitación profesional y la expulsión del territorio nacional de extranjeros no residentes legalmente en España.', 'La libertad vigilada y la custodia familiar.', 'El internamiento en centro psiquiátrico y la libertad vigilada.'],
  '2. Son medidas privativas de libertad: 1.ª El internamiento en centro psiquiátrico. 2.ª El internamiento en centro de deshabituación. 3.ª El internamiento en centro educativo especial');
q('ms', 'art. 105', 'Medidas no privativas de libertad', 'Cuando imponga la medida privativa de libertad o durante la ejecución de la misma, el Juez o Tribunal podrá imponer razonadamente:',
  'Una o varias medidas que se enumeran a continuación.', ['Una única medida de las no privativas de libertad, previo informe del Ministerio Fiscal.', 'Una o varias penas accesorias de las previstas para las penas privativas de derechos.', 'Una medida no privativa de libertad, sin necesidad de razonarlo en la sentencia.'],
  'el Juez o Tribunal podrá imponer razonadamente una o varias medidas que se enumeran a continuación');
q('ms', 'art. 105.2', 'Medidas no privativas de libertad', 'Por un tiempo de hasta diez años, el Juez o Tribunal podrá imponer:',
  'Libertad vigilada, cuando expresamente lo disponga el Código; privación del derecho a la tenencia y porte de armas y privación del derecho a conducir vehículos a motor y ciclomotores.', ['Libertad vigilada y custodia familiar.', 'Custodia familiar y privación del derecho a la tenencia y porte de armas.', 'Inhabilitación profesional y privación del derecho a conducir vehículos a motor y ciclomotores.'],
  '2. Por un tiempo de hasta diez años: a) Libertad vigilada, cuando expresamente lo disponga este Código. b) La privación del derecho a la tenencia y porte de armas. c) La privación del derecho a conducir vehículos a motor y ciclomotores');
q('ms', 'art. 106.1.e)', 'Libertad vigilada', 'La libertad vigilada consistirá en el sometimiento del condenado a control judicial a través del cumplimiento de alguna o algunas medidas, entre ellas:',
  'La prohibición de aproximarse a la víctima, o a aquellos de sus familiares u otras personas que determine el Juez o Tribunal.', ['La obligación de ingresar en un centro de deshabituación durante los fines de semana.', 'La prohibición de contraer matrimonio con personas de la familia de la víctima.', 'La obligación de ejercer una actividad laboral determinada por el Juez.'],
  'e) La prohibición de aproximarse a la víctima, o a aquellos de sus familiares u otras personas que determine el Juez o Tribunal');
q('ms', 'art. 106.1.f)', 'Libertad vigilada', 'Entre las medidas de la libertad vigilada figura:',
  'La prohibición de comunicarse con la víctima, o con aquellos de sus familiares u otras personas que determine el Juez o Tribunal.', ['La obligación de comunicar semanalmente a la víctima cada cambio de domicilio.', 'La prohibición de comunicarse con cualquier persona que no pertenezca a su núcleo familiar.', 'La obligación de someter a control judicial todas sus comunicaciones.'],
  'f) La prohibición de comunicarse con la víctima, o con aquellos de sus familiares u otras personas que determine el Juez o Tribunal');
q('ms', 'art. 108.2', 'Expulsión de extranjeros', 'El extranjero no podrá regresar a España en un plazo de 10 años, contados:',
  'Desde la fecha de su expulsión.', ['Desde la firmeza de la sentencia.', 'Desde la fecha de su ingreso en el centro de internamiento de extranjeros.', 'Desde la fecha de la sentencia condenatoria.'],
  'El extranjero no podrá regresar a España en un plazo de 10 años, contados desde la fecha de su expulsión');
q('civ', 'art. 110', 'Responsabilidad civil', 'La responsabilidad civil derivada del delito comprende:',
  'La restitución, la reparación del daño y la indemnización de perjuicios materiales y morales.', ['La restitución, la multa y las costas procesales.', 'La reparación del daño y la indemnización de los gastos de defensa del perjudicado.', 'La restitución y la indemnización de perjuicios materiales, con exclusión de los morales.'],
  '1.º La restitución. 2.º La reparación del daño. 3.º La indemnización de perjuicios materiales y morales');
q('civ', 'art. 111.2', 'Restitución', 'La restitución del mismo bien, aunque se halle en poder de tercero que lo haya adquirido legalmente y de buena fe, no es aplicable:',
  'Cuando el tercero haya adquirido el bien en la forma y con los requisitos establecidos por las Leyes para hacerlo irreivindicable.', ['Cuando el tercero lo haya adquirido a título gratuito de buena fe.', 'Cuando el tercero desconociera el origen delictivo del bien.', 'Cuando hayan transcurrido cinco años desde que el tercero lo adquirió.'],
  '2. Esta disposición no es aplicable cuando el tercero haya adquirido el bien en la forma y con los requisitos establecidos por las Leyes para hacerlo irreivindicable');
q('civ', 'art. 118.1.4.ª', 'Exención de la responsabilidad criminal y civil', 'En el caso de quien actúa impulsado por miedo insuperable, responderán civilmente:',
  'Principalmente los que hayan causado el miedo, y en defecto de ellos, los que hayan ejecutado el hecho.', ['Principalmente los que hayan ejecutado el hecho, y en defecto de ellos, los que hayan causado el miedo.', 'Solidariamente los que hayan causado el miedo y los que hayan ejecutado el hecho.', 'Las personas en cuyo favor se haya precavido el mal, en proporción al perjuicio que se les haya evitado.'],
  '4.ª En el caso del número 6.º, responderán principalmente los que hayan causado el miedo, y en defecto de ellos, los que hayan ejecutado el hecho');
q('civ', 'art. 120.1.º', 'Responsabilidad civil subsidiaria', 'Son también responsables civilmente, en defecto de los que lo sean criminalmente, entre otros:',
  'Los curadores con facultades de representación plena que convivan con la persona a quien prestan apoyo, siempre que haya por su parte culpa o negligencia.', ['Los curadores con facultades de representación plena, aunque no haya por su parte culpa o negligencia.', 'Los profesores y maestros respecto de los delitos cometidos por sus alumnos menores de edad.', 'Las personas que convivan con el condenado, en proporción a sus ingresos.'],
  'Son también responsables civilmente, en defecto de los que lo sean criminalmente: 1.º Los curadores con facultades de representación plena que convivan con la persona a quien prestan apoyo, siempre que haya por su parte culpa o negligencia');
q('acc', 'art. 127 bis.1.d)', 'Decomiso ampliado', 'El decomiso ampliado procede, entre otros, por delitos contra el patrimonio y contra el orden socioeconómico:',
  'En los supuestos de continuidad delictiva y reincidencia.', ['En todo caso, cualquiera que sea su cuantía.', 'Únicamente cuando exceda de 6.000 euros el perjuicio causado.', 'Solo cuando se cometan en el seno de una organización o grupo criminal.'],
  'd) Delitos contra el patrimonio y contra el orden socioeconómico en los supuestos de continuidad delictiva y reincidencia');
q('acc', 'art. 127 octies.1', 'Aprehensión de los bienes', 'A fin de garantizar la efectividad del decomiso, los bienes, medios, instrumentos y ganancias podrán ser aprehendidos o embargados y puestos en depósito por:',
  'La autoridad judicial desde el momento de las primeras diligencias.', ['El Ministerio Fiscal desde la apertura del juicio oral.', 'La policía judicial desde la detención del investigado.', 'El Juez de Vigilancia Penitenciaria desde la firmeza de la sentencia.'],
  'podrán ser aprehendidos o embargados y puestos en depósito por la autoridad judicial desde el momento de las primeras diligencias');
q('ext', 'art. 130.1', 'Causas de extinción', 'Entre otras causas, la responsabilidad criminal se extingue:',
  'Por la muerte del reo.', ['Por la reincidencia del condenado.', 'Por la libertad condicional del penado.', 'Por la revocación de la sentencia condenatoria.'],
  '1.º Por la muerte del reo');
q('ext', 'art. 130.2', 'Personas jurídicas', 'No extingue la responsabilidad penal de la persona jurídica:',
  'La disolución encubierta o meramente aparente.', ['La disolución real acordada por la junta general de socios.', 'La muerte de su administrador único.', 'El cumplimiento de la pena de multa impuesta.'],
  'No extingue la responsabilidad penal la disolución encubierta o meramente aparente de la persona jurídica');
q('ext', 'art. 131.1', 'Prescripción de los delitos', 'Los delitos prescriben a los veinte años, cuando la pena máxima señalada al delito sea:',
  'Prisión de quince o más años.', ['Prisión de más de diez años.', 'Prisión de veinte o más años.', 'Inhabilitación por más de diez años.'],
  'A los veinte años, cuando la pena máxima señalada al delito sea prisión de quince o más años');
q('ext', 'art. 132.1', 'Cómputo de la prescripción', 'Los términos de prescripción de los delitos se computarán:',
  'Desde el día en que se haya cometido la infracción punible.', ['Desde el día en que se incoe el procedimiento penal.', 'Desde el día en que la víctima denuncie los hechos.', 'Desde el día en que la sentencia devenga firme.'],
  'los términos previstos en el artículo precedente se computarán desde el día en que se haya cometido la infracción punible');
q('ext', 'art. 132.2.2.ª', 'Interrupción de la prescripción', 'La presentación de querella o la denuncia ante un órgano judicial, en la que se atribuya a una persona determinada su presunta participación en un hecho delictivo, suspenderá el cómputo de la prescripción por un plazo máximo de:',
  'Seis meses, a contar desde la misma fecha de presentación de la querella o de formulación de la denuncia.', ['Tres meses, a contar desde la admisión a trámite de la querella o denuncia.', 'Un año, a contar desde la misma fecha de presentación de la querella o denuncia.', 'Dos meses, a contar desde la misma fecha de presentación de la querella o denuncia.'],
  'suspenderá el cómputo de la prescripción por un plazo máximo de seis meses, a contar desde la misma fecha de presentación de la querella o de formulación de la denuncia');
q('ext', 'art. 133.1', 'Prescripción de las penas', 'Las penas de prisión impuestas por sentencia firme por más de 20 años prescriben:',
  'A los 30 años.', ['A los 25 años.', 'A los 20 años.', 'A los 15 años.'],
  'A los 30 años, las de prisión por más de 20 años');
require('../preguntas-marcas-lib.js')({ T: 18, fuentes: ['tema18/oficial.txt'], desdeOf: 247, desdeIA: 1558, Q: R });
