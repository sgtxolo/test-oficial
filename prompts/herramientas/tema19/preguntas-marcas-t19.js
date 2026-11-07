// Tema 19 · fase 2 de las marcas (9/11/2026): apartados con marca suya (EXOF / EXAMEN / EX / ✱ / R) sin pregunta oficial (cobertura-marcas.js 19).
// Todas al banco OFICIAL (19-276…). Sin penas ni años de prisión en el enunciado. Cita literal comprobada contra tema19/oficial.txt.
// Formato de explicación NUEVO (lila «Art. N · norma» + rojo con la cita). Uso: node prompts/herramientas/tema19/preguntas-marcas-t19.js [--check]
const N0 = 'Código Penal', N1 = 'Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal';
const AP = { per: 'Delitos contra las Personas', sex: 'Delitos contra la Libertad e Indemnidad Sexual', lib: 'Delitos contra la Libertad', pat: 'Delitos contra el Patrimonio y el Orden Socioeconómico', sc: 'Delitos contra la Seguridad Colectiva y el Medio Ambiente', ap: 'Delitos contra la Administración Pública', aj: 'Delitos contra la Administración de Justicia', cons: 'Delitos contra la Constitución', op: 'Delitos contra el Orden Público', ci: 'Delitos contra la Comunidad Internacional', gen: 'General / Derecho Penal - Parte Especial' };
const R = []; let k = 0;
const q = (ap, a, r, e, ok, mal, t) => { const pos = (k++ * 3 + 1) % 4; const o = mal.slice(); o.splice(pos, 0, ok); R.push({ n: [N0, N1, AP[ap]], ia: false, a, r, e, o, c: pos, t, p: '' }); };

q('per', 'art. 143 bis', 'Difusión de contenidos que incitan al suicidio', 'La distribución o difusión pública a través de Internet, del teléfono o de cualquier otra tecnología de la información o de la comunicación de contenidos específicamente destinados a promover, fomentar o incitar al suicidio es delito cuando se dirige a:',
  'Personas menores de edad o personas con discapacidad necesitadas de especial protección.', ['Cualquier persona, con independencia de su edad o condición.', 'Personas menores de edad o mayores de sesenta y cinco años.', 'Personas con una enfermedad mental declarada judicialmente.'],
  'contenidos específicamente destinados a promover, fomentar o incitar al suicidio de personas menores de edad o personas con discapacidad necesitadas de especial protección');
q('lib', 'art. 177 bis.1', 'Trata de seres humanos', 'Comete trata de seres humanos el que, en territorio español, desde España, en tránsito o con destino a ella, capte, transporte, traslade, acoja o reciba a una persona, empleando:',
  'Violencia, intimidación o engaño, o abusando de una situación de superioridad o de necesidad o de vulnerabilidad de la víctima nacional o extranjera.', ['Únicamente violencia o intimidación graves, siendo la víctima siempre de nacionalidad extranjera.', 'Exclusivamente engaño, siempre que la víctima carezca de autorización de residencia.', 'Cualquier medio, siempre que la víctima haya prestado su consentimiento por escrito.'],
  'empleando violencia, intimidación o engaño, o abusando de una situación de superioridad o de necesidad o de vulnerabilidad de la víctima nacional o extranjera');
q('lib', 'art. 177 bis.4.b)', 'Trata de seres humanos', 'En la trata de seres humanos se impondrá la pena superior en grado a la prevista en el tipo básico cuando la víctima sea especialmente vulnerable por razón de:',
  'Enfermedad, estado gestacional, discapacidad o situación personal, o sea menor de edad.', ['Su nacionalidad, su raza o su religión, o sea mayor de sesenta y cinco años.', 'Su situación administrativa irregular o su falta de arraigo familiar.', 'Su orientación sexual, identidad de género o su ideología política.'],
  'la víctima sea especialmente vulnerable por razón de enfermedad, estado gestacional, discapacidad o situación personal, o sea menor de edad');
q('sex', 'art. 178.1', 'Agresión sexual', 'Respecto de la agresión sexual, sólo se entenderá que hay consentimiento cuando:',
  'Se haya manifestado libremente mediante actos que, en atención a las circunstancias del caso, expresen de manera clara la voluntad de la persona.', ['La víctima no haya manifestado oposición expresa y verbal al acto en ningún momento.', 'Se haya prestado por escrito con carácter previo a la realización del acto.', 'La víctima sea mayor de edad y no se encuentre privada de sentido.'],
  'Sólo se entenderá que hay consentimiento cuando se haya manifestado libremente mediante actos que, en atención a las circunstancias del caso, expresen de manera clara la voluntad de la persona');
q('sex', 'art. 187.1', 'Prostitución de personas mayores de edad', 'Comete delito el que determine a una persona mayor de edad a ejercer o a mantenerse en la prostitución:',
  'Empleando violencia, intimidación o engaño, o abusando de una situación de superioridad o de necesidad o vulnerabilidad de la víctima.', ['Aprovechando únicamente la dependencia económica de la víctima respecto del autor.', 'Siempre que medie precio y la víctima no haya prestado su consentimiento por escrito.', 'Cuando concurra la reiteración de los hechos y el ánimo de lucro, sin otros requisitos.'],
  'El que, empleando violencia, intimidación o engaño, o abusando de una situación de superioridad o de necesidad o vulnerabilidad de la víctima, determine a una persona mayor de edad a ejercer o a mantenerse en la prostitución');
q('pat', 'art. 273.1', 'Delitos contra la propiedad industrial: patentes', 'Comete delito el que, con fines industriales o comerciales, sin consentimiento del titular de una patente o modelo de utilidad y con conocimiento de su registro, fabrique, importe, posea, utilice, ofrezca o introduzca en el comercio:',
  'Objetos amparados por tales derechos.', ['Productos sin marca comercial registrada.', 'Servicios prestados bajo licencia obligatoria.', 'Bienes que carezcan de cualquier protección registral.'],
  'fabrique, importe, posea, utilice, ofrezca o introduzca en el comercio objetos amparados por tales derechos');
q('pat', 'art. 276.b)', 'Delitos contra la propiedad industrial: agravación', 'En los delitos relativos a la propiedad industrial, constituye circunstancia de agravación que los hechos revistan especial gravedad, atendiendo:',
  'Al valor de los objetos producidos ilícitamente, distribuidos, comercializados u ofrecidos, o a la especial importancia de los perjuicios ocasionados.', ['Al número de personas que hayan intervenido en la producción, sin atender al valor de los objetos.', 'A la condición de empresario individual o de sociedad mercantil del culpable.', 'Únicamente a la duración de la actividad ilícita y al ámbito territorial de la distribución.'],
  'Que los hechos revistan especial gravedad, atendiendo al valor de los objetos producidos ilícitamente, distribuidos, comercializados u ofrecidos, o a la especial importancia de los perjuicios ocasionados');
q('pat', 'art. 284.1.a)', 'Alteración de precios y manipulación del mercado', 'En la difusión de noticias o rumores con el fin de alterar el precio de cotización de un instrumento financiero, o en la realización de transacciones que proporcionen indicios falsos sobre la oferta, la demanda o el precio, se exige entre otras circunstancias que, como consecuencia de la conducta, se obtuviera para sí o para tercero un beneficio superior a:',
  'Doscientos cincuenta mil euros, o se causara un perjuicio de idéntica cantidad.', ['Quinientos mil euros, o se causara un perjuicio de idéntica cantidad.', 'Cien mil euros, o se causara un perjuicio superior al doble.', 'Seiscientos mil euros, siempre que además se hubiera causado un perjuicio.'],
  'que como consecuencia de su conducta obtuvieran, para sí o para tercero, un beneficio superior a doscientos cincuenta mil euros o causara un perjuicio de idéntica cantidad');
q('pat', 'art. 284.1.b)', 'Alteración de precios y manipulación del mercado', 'En el delito de manipulación del mercado de instrumentos financieros se exige, como alternativa, que el importe de los fondos empleados fuera superior a:',
  'Dos millones de euros.', ['Un millón de euros.', 'Quinientos mil euros.', 'Cinco millones de euros.'],
  'que el importe de los fondos empleados fuera superior a dos millones de euros');
q('pat', 'art. 285.1.a)', 'Uso de información privilegiada', 'Quien realice actos de adquisición, transmisión o cesión de un instrumento financiero utilizando información privilegiada a la que hubiera tenido acceso reservado, incurre en delito siempre que concurra alguna circunstancia, como que obtuviera un beneficio superior a:',
  'Quinientos mil euros, o causara un perjuicio de idéntica cantidad.', ['Doscientos cincuenta mil euros, o causara un perjuicio de idéntica cantidad.', 'Un millón de euros, o causara un perjuicio de idéntica cantidad.', 'Cien mil euros, siempre que además se cause un grave impacto en el mercado.'],
  'que, como consecuencia de su conducta obtuviera, para sí o para tercero, un beneficio superior a quinientos mil euros o causara un perjuicio de idéntica cantidad');
q('pat', 'art. 285.1.b)', 'Uso de información privilegiada', 'En el delito de uso de información privilegiada, constituye una de las circunstancias exigidas que el valor de los instrumentos financieros empleados fuera superior a:',
  'Dos millones de euros.', ['Quinientos mil euros.', 'Un millón de euros.', 'Cinco millones de euros.'],
  'que el valor de los instrumentos financieros empleados fuera superior a dos millones de euros');
q('pat', 'art. 285 quater', 'Actos preparatorios en delitos contra el mercado', 'La provocación, la conspiración y la proposición para cometer los delitos de manipulación e información privilegiada del mercado de valores se castigarán, respectivamente, con:',
  'La pena inferior en uno o dos grados.', ['La pena superior en un grado.', 'La misma pena que el delito consumado.', 'La pena inferior en tres grados.'],
  'La provocación, la conspiración y la proposición para cometer los delitos previstos en los artículos 284 a 285 bis se castigará, respectivamente, con la pena inferior en uno o dos grados');
q('pat', 'art. 286 ter.1', 'Corrupción en las transacciones comerciales internacionales', 'Los que mediante el ofrecimiento, promesa o concesión de cualquier beneficio o ventaja indebidos corrompieren o intentaren corromper a una autoridad o funcionario público, con el fin de que actúen o se abstengan de actuar en relación con el ejercicio de funciones públicas para conseguir o conservar un contrato, negocio o cualquier otra ventaja competitiva, cometen un delito en el marco de:',
  'Las actividades económicas internacionales.', ['Las contrataciones del sector público nacional.', 'Los procedimientos de subvención de las entidades locales.', 'Las relaciones laborales con trabajadores extranjeros.'],
  'para conseguir o conservar un contrato, negocio o cualquier otra ventaja competitiva en la realización de actividades económicas internacionales');
q('pat', 'art. 287.2', 'Perseguibilidad de la corrupción entre particulares', 'No será precisa la denuncia de la persona agraviada para proceder por los delitos de corrupción en los negocios cuando:',
  'La comisión del delito afecte a los intereses generales o a una pluralidad de personas.', ['El autor del delito sea administrador de una sociedad mercantil.', 'El perjuicio causado exceda de la cuantía que se determine por el juez.', 'La persona agraviada sea menor de edad o desvalida.'],
  'No será precisa la denuncia exigida en el apartado anterior cuando la comisión del delito afecte a los intereses generales o a una pluralidad de personas');
q('pat', 'art. 291', 'Acuerdos abusivos', 'Los que, prevaliéndose de su situación mayoritaria en la Junta de accionistas o el órgano de administración de cualquier sociedad, impusieren acuerdos abusivos, con ánimo de lucro propio o ajeno, lo hacen:',
  'En perjuicio de los demás socios, y sin que reporten beneficios a la misma.', ['En perjuicio de los acreedores de la sociedad, aunque reporten beneficios a la misma.', 'En beneficio de la sociedad, aunque perjudiquen a los demás socios.', 'En perjuicio de la Hacienda Pública y de la Seguridad Social.'],
  'impusieren acuerdos abusivos, con ánimo de lucro propio o ajeno, en perjuicio de los demás socios, y sin que reporten beneficios a la misma');
q('pat', 'art. 304', 'Actos preparatorios en el blanqueo y la receptación', 'La provocación, la conspiración y la proposición para cometer los delitos de receptación y blanqueo se castigará, respectivamente, con:',
  'La pena inferior en uno o dos grados.', ['La pena superior en un grado.', 'La misma pena que el delito consumado.', 'La pena inferior en tres grados.'],
  'La provocación, la conspiración y la proposición para cometer los delitos previstos en los artículos 301 a 303 se castigará, respectivamente, con la pena inferior en uno o dos grados');
q('pat', 'art. 305.1', 'Delito contra la Hacienda Pública', 'Comete delito contra la Hacienda Pública el que, por acción u omisión, defraude eludiendo el pago de tributos, siempre que la cuantía de la cuota defraudada exceda de:',
  'Ciento veinte mil euros.', ['Cincuenta mil euros.', 'Cien mil euros.', 'Doscientos cincuenta mil euros.'],
  'exceda de ciento veinte mil euros');
q('pat', 'art. 305.2.a)', 'Delito contra la Hacienda Pública', 'Para determinar la cuantía del delito contra la Hacienda Pública, si se trata de tributos periódicos o de declaración periódica, se estará a lo defraudado:',
  'En cada período impositivo o de declaración, y si éstos son inferiores a doce meses, el importe se referirá al año natural.', ['Al importe total defraudado durante los cuatro últimos años naturales.', 'A lo defraudado en el ejercicio en que se descubra el fraude.', 'A la suma de lo defraudado en los diez últimos años.'],
  'se estará a lo defraudado en cada período impositivo o de declaración, y si éstos son inferiores a doce meses, el importe de lo defraudado se referirá al año natural');
q('pat', 'art. 307.2', 'Delito contra la Seguridad Social', 'A los efectos de determinar la cuantía defraudada a la Seguridad Social, se estará al importe total defraudado durante:',
  'Cuatro años naturales.', ['Dos años naturales.', 'Cinco años naturales.', 'Un año natural.'],
  'se estará al importe total defraudado durante cuatro años naturales');
q('pat', 'art. 308.1', 'Fraude de subvenciones', 'Comete delito de fraude de subvenciones el que obtenga subvenciones o ayudas de las Administraciones Públicas, incluida la Unión Europea, en una cantidad o por un valor superior a:',
  'Cien mil euros, falseando las condiciones requeridas para su concesión u ocultando las que la hubiesen impedido.', ['Ciento veinte mil euros, falseando las condiciones requeridas para su concesión.', 'Cincuenta mil euros, ocultando las condiciones que la hubiesen impedido.', 'Doscientos mil euros, siempre que se haya falseado la documentación presentada.'],
  'en una cantidad o por un valor superior a cien mil euros falseando las condiciones requeridas para su concesión u ocultando las que la hubiesen impedido');
q('pat', 'art. 310', 'Delito contable', 'Comete delito contable el que, estando obligado por ley tributaria a llevar contabilidad mercantil, libros o registros fiscales, incumpla absolutamente dicha obligación:',
  'En régimen de estimación directa de bases tributarias.', ['En régimen de estimación objetiva de bases tributarias.', 'En régimen de estimación indirecta de bases tributarias.', 'Durante más de dos ejercicios económicos consecutivos.'],
  'Incumpla absolutamente dicha obligación en régimen de estimación directa de bases tributarias');
q('lib', 'art. 311.2.º', 'Delitos contra los derechos de los trabajadores', 'Son castigados los que impongan condiciones ilegales a sus trabajadores:',
  'Mediante su contratación bajo fórmulas ajenas al contrato de trabajo, o las mantengan en contra de requerimiento o sanción administrativa.', ['Mediante engaño o abuso de situación de necesidad, sin más requisitos.', 'Dándoles ocupación sin comunicar su alta en el régimen de la Seguridad Social.', 'Mediante contratos temporales sucesivos para el mismo puesto de trabajo.'],
  'Los que impongan condiciones ilegales a sus trabajadores mediante su contratación bajo fórmulas ajenas al contrato de trabajo, o las mantengan en contra de requerimiento o sanción administrativa');
q('lib', 'art. 311.3.º a)', 'Delitos contra los derechos de los trabajadores', 'Es delito dar ocupación simultáneamente a una pluralidad de trabajadores sin comunicar su alta en la Seguridad Social, siempre que el número de afectados sea al menos de:',
  'El veinticinco por ciento, en las empresas o centros de trabajo que ocupen a más de cien trabajadores.', ['El diez por ciento, en las empresas o centros de trabajo que ocupen a más de cien trabajadores.', 'El cincuenta por ciento, en las empresas o centros de trabajo que ocupen a más de cien trabajadores.', 'El veinticinco por ciento, en las empresas o centros de trabajo que ocupen a más de cincuenta trabajadores.'],
  'el veinticinco por ciento, en las empresas o centros de trabajo que ocupen a más de cien trabajadores');
q('sc', 'art. 326.1', 'Gestión de residuos', 'Se castiga a quienes, contraviniendo las leyes u otras disposiciones de carácter general, recojan, transporten, valoricen, transformen, eliminen o aprovechen residuos, o no controlen o vigilen adecuadamente tales actividades, de modo que:',
  'Causen o puedan causar daños sustanciales a la calidad del aire, del suelo o de las aguas, o a animales o plantas, muerte o lesiones graves a personas, o puedan perjudicar gravemente el equilibrio de los sistemas naturales.', ['Causen un daño efectivo y cuantificado a la calidad de las aguas.', 'Se produzca únicamente un perjuicio económico al patrimonio de la Administración.', 'Causen la muerte de alguna persona, con independencia de otros resultados.'],
  'de modo que causen o puedan causar daños sustanciales a la calidad del aire, del suelo o de las aguas, o a animales o plantas, muerte o lesiones graves a personas, o puedan perjudicar gravemente el equilibrio de los sistemas naturales');
q('sc', 'art. 327.b)', 'Agravación de los delitos contra el medio ambiente', 'Se castigan con la pena superior en grado los delitos contra el medio ambiente cuando concurra, entre otras circunstancias, que:',
  'Se hayan desobedecido las órdenes expresas de la autoridad administrativa de corrección o suspensión de las actividades tipificadas.', ['Se haya presentado una declaración responsable fuera de plazo.', 'La industria cuente con autorización pero haya superado su aforo.', 'El culpable haya sido condenado anteriormente por delito de la misma naturaleza.'],
  'Que se hayan desobedecido las órdenes expresas de la autoridad administrativa de corrección o suspensión de las actividades tipificadas en el artículo anterior');
q('sc', 'art. 327.f)', 'Agravación de los delitos contra el medio ambiente', 'Entre las circunstancias que agravan los delitos contra el medio ambiente figura que:',
  'Se produzca una extracción ilegal de aguas en período de restricciones.', ['Se produzca un vertido en cauces públicos en período de lluvias.', 'Se realice la actividad en espacios naturales protegidos de forma ocasional.', 'Se obtenga un beneficio económico superior al de la multa impuesta.'],
  'Que se produzca una extracción ilegal de aguas en período de restricciones');
q('sc', 'art. 348.4.b)', 'Delitos de riesgo por explosivos', 'Los responsables de las fábricas, talleres, medios de transporte, depósitos y demás establecimientos relativos a explosivos que puedan causar estragos incurren en delito cuando:',
  'Falseen u oculten a la Administración información relevante sobre el cumplimiento de las medidas de seguridad obligatorias relativas a explosivos.', ['Almacenen explosivos sin comunicarlo a los vecinos del establecimiento.', 'Transporten explosivos sin la compañía de agentes de la autoridad.', 'Vendan explosivos a personas que no sean titulares de una licencia de armas.'],
  'Falsear u ocultar a la Administración información relevante sobre el cumplimiento de las medidas de seguridad obligatorias relativas a explosivos');
q('sc', 'art. 356', 'Incendios en zonas de vegetación no forestales', 'Comete delito el que incendiare zonas de vegetación no forestales:',
  'Perjudicando gravemente el medio natural.', ['Poniendo en peligro la vida de las personas.', 'Con propósito de defraudar a terceros.', 'Causando la destrucción total de una explotación agraria.'],
  'El que incendiare zonas de vegetación no forestales perjudicando gravemente el medio natural');
q('sc', 'art. 357', 'Incendio de bienes propios', 'El incendiario de bienes propios será castigado si tuviere propósito de defraudar o perjudicar a terceros, hubiere causado defraudación o perjuicio, o:',
  'Existiere peligro de propagación a edificio, arbolado o plantío ajeno o hubiere perjudicado gravemente las condiciones de la vida silvestre, los bosques o los espacios naturales.', ['Los bienes incendiados estuvieran asegurados con una entidad aseguradora.', 'El incendio se produjera en horas nocturnas o en lugar despoblado.', 'El autor sea propietario único de los bienes incendiados, en todo caso.'],
  'existiere peligro de propagación a edificio, arbolado o plantío ajeno o hubiere perjudicado gravemente las condiciones de la vida silvestre, los bosques o los espacios naturales');
q('sc', 'art. 363.2.º', 'Delitos contra la salud pública', 'Serán castigados los productores, distribuidores o comerciantes que pongan en peligro la salud de los consumidores:',
  'Fabricando o vendiendo bebidas o comestibles destinados al consumo público y nocivos para la salud.', ['Ofreciendo en el mercado productos sin indicar su precio de venta.', 'Importando productos alimentarios sin los certificados sanitarios exigidos.', 'Ocultando información comercial sobre el origen de los productos.'],
  'Fabricando o vendiendo bebidas o comestibles destinados al consumo público y nocivos para la salud');
q('sc', 'art. 365', 'Envenenamiento de aguas y alimentos', 'Comete delito el que envenenare o adulterare con sustancias infecciosas, u otras que puedan ser gravemente nocivas para la salud, las aguas potables o las sustancias alimenticias destinadas:',
  'Al uso público o al consumo de una colectividad de personas.', ['Al consumo exclusivo del propio autor o de su familia.', 'Al comercio alimentario de ámbito internacional.', 'Al uso de las Fuerzas Armadas y de los centros penitenciarios.'],
  'las aguas potables o las sustancias alimenticias destinadas al uso público o al consumo de una colectividad de personas');
q('sc', 'art. 369.1.2.ª', 'Tráfico de drogas: agravación', 'En los delitos de tráfico de drogas se imponen las penas superiores en grado cuando concurra, entre otras, la circunstancia de que el culpable:',
  'Participare en otras actividades organizadas o cuya ejecución se vea facilitada por la comisión del delito.', ['Fuere autoridad, funcionario público, facultativo, trabajador social, docente o educador y obrase fuera del ejercicio de su cargo.', 'Hubiere actuado en solitario y sin ánimo de lucro.', 'Hubiere sido condenado por tráfico de armas con anterioridad.'],
  'El culpable participare en otras actividades organizadas o cuya ejecución se vea facilitada por la comisión del delito');
q('sc', 'art. 370.3.º', 'Tráfico de drogas: agravación especial', 'Se impone la pena superior en uno o dos grados a la señalada para el tráfico de drogas cuando:',
  'Las conductas descritas fuesen de extrema gravedad.', ['El culpable fuese reincidente en delitos contra la salud pública.', 'Las sustancias se hubieran facilitado a mayores de edad.', 'El hecho se hubiera cometido en el domicilio del autor.'],
  'Las conductas descritas en el artículo 368 fuesen de extrema gravedad');
q('sc', 'art. 373', 'Actos preparatorios en el tráfico de drogas', 'La provocación, la conspiración y la proposición para cometer los delitos de tráfico de drogas se castigarán con:',
  'La pena inferior en uno a dos grados a la que corresponde, respectivamente, a los hechos previstos en los preceptos anteriores.', ['La misma pena que corresponda al delito consumado.', 'La pena superior en un grado a la señalada para el delito.', 'La pena inferior en tres grados a la del delito correspondiente.'],
  'se castigarán con la pena inferior en uno a dos grados a la que corresponde, respectivamente, a los hechos previstos en los preceptos anteriores');
q('sc', 'art. 376', 'Atenuación por colaboración en el tráfico de drogas', 'En los delitos de tráfico de drogas, los jueces o tribunales, razonándolo en la sentencia, podrán imponer la pena inferior en uno o dos grados siempre que el sujeto:',
  'Haya abandonado voluntariamente sus actividades delictivas y haya colaborado activamente con las autoridades o sus agentes.', ['Haya reparado el daño y satisfecho la responsabilidad civil derivada del delito.', 'Haya confesado los hechos antes de iniciarse el juicio oral.', 'Sea toxicómano y se haya sometido a tratamiento de deshabituación.'],
  'siempre que el sujeto haya abandonado voluntariamente sus actividades delictivas y haya colaborado activamente con las autoridades o sus agentes');
q('sc', 'art. 378', 'Imputación de pagos del penado', 'Los pagos que efectúe el penado por delitos contra la salud pública se imputarán por el orden siguiente, comenzando por:',
  'La reparación del daño causado e indemnización de perjuicios.', ['La indemnización del Estado por los gastos hechos en la causa.', 'La multa.', 'Las costas del acusador particular o privado.'],
  '1.º A la reparación del daño causado e indemnización de perjuicios');
q('ap', 'art. 405', 'Nombramientos ilegales', 'La autoridad o funcionario público que, en el ejercicio de su competencia y a sabiendas de su ilegalidad, propusiere, nombrare o diere posesión para el ejercicio de un determinado cargo público a cualquier persona:',
  'Sin que concurran los requisitos legalmente establecidos para ello.', ['Sin haber oído previamente al órgano consultivo competente.', 'Sin haber convocado el correspondiente proceso selectivo.', 'Sin que medie propuesta del superior jerárquico.'],
  'a cualquier persona sin que concurran los requisitos legalmente establecidos para ello');
q('ap', 'art. 409', 'Abandono colectivo de un servicio público', 'Se castiga a las autoridades o funcionarios públicos que promovieren, dirigieren u organizaren:',
  'El abandono colectivo y manifiestamente ilegal de un servicio público.', ['La suspensión colectiva de un servicio público por causa legítima.', 'El ejercicio colectivo del derecho de huelga en servicios esenciales.', 'La paralización parcial de un servicio mediante acuerdo sindical.'],
  'que promovieren, dirigieren u organizaren el abandono colectivo y manifiestamente ilegal de un servicio público');
q('ap', 'art. 418', 'Uso de secreto o información privilegiada por particular', 'El particular que aprovechare para sí o para un tercero el secreto o la información privilegiada que obtuviere:',
  'De un funcionario público o autoridad.', ['De cualquier medio de comunicación social.', 'De un notario o registrador de la propiedad.', 'De otro particular que ejerza una profesión colegiada.'],
  'El particular que aprovechare para sí o para un tercero el secreto o la información privilegiada que obtuviere de un funcionario público o autoridad');
q('ap', 'art. 444', 'Penas en los delitos contra la Administración Pública y concurso', 'Las penas previstas para los delitos de abusos en el ejercicio de la función pública relacionados con la libertad sexual se impondrán:',
  'Sin perjuicio de las que correspondan por los delitos contra la libertad sexual efectivamente cometidos.', ['Con exclusión de las penas por los delitos contra la libertad sexual.', 'Absorbiendo las penas de los delitos contra la libertad sexual.', 'Únicamente cuando no se haya consumado el delito contra la libertad sexual.'],
  'Las penas previstas en el artículo anterior se impondrán sin perjuicio de las que correspondan por los delitos contra la libertad sexual efectivamente cometidos');
q('ap', 'art. 445', 'Actos preparatorios', 'La provocación, la conspiración y la proposición para cometer los delitos del Título de los delitos de cohecho y tráfico de influencias se castigará, respectivamente, con:',
  'La pena inferior en uno o dos grados.', ['La pena superior en un grado.', 'La misma pena que el delito consumado.', 'La pena inferior en tres grados.'],
  'La provocación, la conspiración y la proposición para cometer los delitos previstos en este Título se castigará, respectivamente, con la pena inferior en uno o dos grados');
q('aj', 'art. 446.1.º', 'Prevaricación judicial', 'El juez o magistrado que, a sabiendas, dictare sentencia o resolución injusta comete prevaricación judicial. En el primer supuesto, se trata de una sentencia injusta:',
  'Contra el reo en causa criminal por delito grave o menos grave.', ['Contra el reo en proceso por delito leve.', 'A favor del reo en causa criminal por delito grave.', 'Dictada en cualquier proceso, civil o criminal.'],
  'si se trata de sentencia injusta contra el reo en causa criminal por delito grave o menos grave');
q('aj', 'art. 455.1', 'Realización arbitraria del propio derecho', 'Comete delito el que, para realizar un derecho propio, actuando fuera de las vías legales:',
  'Empleare violencia, intimidación o fuerza en las cosas.', ['Dejare de acudir al órgano judicial competente.', 'Ocultare bienes para impedir su embargo.', 'Amenazare con acudir a los tribunales sin motivo.'],
  'El que, para realizar un derecho propio, actuando fuera de las vías legales, empleare violencia, intimidación o fuerza en las cosas');
q('cons', 'art. 476.1', 'Delitos de rebelión: omisiones de los militares', 'El militar que no empleare los medios a su alcance para contener la rebelión en las fuerzas de su mando comete un delito:',
  'De omisión de los medios a su alcance para contener la rebelión.', ['De deserción en tiempo de conflicto.', 'De encubrimiento de la rebelión.', 'De abandono de destino.'],
  'El militar que no empleare los medios a su alcance para contener la rebelión en las fuerzas de su mando');
q('cons', 'art. 477', 'Actos preparatorios de la rebelión', 'La provocación, la conspiración y la proposición para cometer rebelión serán castigadas, además de con la inhabilitación prevista, con:',
  'La pena de prisión inferior en uno o dos grados a la del delito correspondiente.', ['La pena de prisión superior en un grado a la del delito.', 'La misma pena de prisión que el delito consumado.', 'La pena de prisión inferior en tres grados a la del delito.'],
  'con la pena de prisión inferior en uno o dos grados a la del delito correspondiente');
q('cons', 'art. 493', 'Delitos contra las Instituciones del Estado', 'Los que, sin alzarse públicamente, invadieren con fuerza, violencia o intimidación las sedes del Congreso de los Diputados, del Senado o de una Asamblea Legislativa de Comunidad Autónoma, cometen el delito si:',
  'Están reunidos.', ['Están en período de vacaciones parlamentarias.', 'Se encuentran presentes los miembros del Gobierno.', 'Se celebra sesión solemne de apertura de la legislatura.'],
  'si están reunidos');
q('op', 'art. 513', 'Reuniones o manifestaciones ilícitas', 'Son punibles las reuniones o manifestaciones ilícitas, y tienen tal consideración, entre otras:',
  'Aquéllas a las que concurran personas con armas, artefactos explosivos u objetos contundentes o de cualquier otro modo peligroso.', ['Las que se celebren sin comunicación previa a la autoridad.', 'Las convocadas por asociaciones no inscritas en el registro correspondiente.', 'Las que se celebren en lugares de tránsito público sin autorización escrita.'],
  'Aquéllas a las que concurran personas con armas, artefactos explosivos u objetos contundentes o de cualquier otro modo peligroso');
q('op', 'art. 515.3.º', 'Asociaciones ilícitas', 'Son punibles las asociaciones ilícitas, teniendo tal consideración, entre otras:',
  'Las organizaciones de carácter paramilitar.', ['Las asociaciones sin ánimo de lucro no inscritas en el registro.', 'Las que persigan fines religiosos no reconocidos.', 'Las asociaciones constituidas por menores de edad.'],
  'Las organizaciones de carácter paramilitar');
q('op', 'art. 519', 'Actos preparatorios de la asociación ilícita', 'La provocación, la conspiración y la proposición para cometer el delito de asociación ilícita se castigarán con:',
  'La pena inferior en uno o dos grados a la que corresponda, respectivamente, a los hechos previstos en los artículos anteriores.', ['La pena superior en un grado a la señalada para el delito.', 'La misma pena que la correspondiente al delito consumado.', 'La pena inferior en tres grados a la de los hechos anteriores.'],
  'se castigarán con la pena inferior en uno o dos grados a la que corresponda, respectivamente, a los hechos previstos en los artículos anteriores');
q('op', 'art. 523', 'Delitos contra la libertad de conciencia', 'El que con violencia, amenaza, tumulto o vías de hecho impidiere, interrumpiere o perturbare los actos, funciones, ceremonias o manifestaciones de las confesiones religiosas lo hace sobre las:',
  'Confesiones religiosas inscritas en el correspondiente registro público del Ministerio de Justicia e Interior.', ['Confesiones religiosas con notorio arraigo en España.', 'Confesiones religiosas reconocidas por tratados internacionales.', 'Cualquier confesión religiosa, esté o no inscrita en el registro.'],
  'de las confesiones religiosas inscritas en el correspondiente registro público del Ministerio de Justicia e Interior');
q('op', 'art. 538', 'Delitos cometidos por funcionarios contra el ejercicio de derechos', 'La autoridad o funcionario público que establezca la censura previa o, fuera de los casos permitidos por la Constitución y las Leyes, recoja ediciones de libros o periódicos o suspenda su publicación incurrirá en la pena de:',
  'Inhabilitación absoluta.', ['Multa proporcional al daño causado.', 'Suspensión de empleo o cargo público.', 'Inhabilitación especial para empleo o cargo público.'],
  'incurrirá en la pena de inhabilitación absoluta');
q('op', 'art. 543', 'Ultrajes a España', 'Las ofensas o ultrajes de palabra, por escrito o de hecho a España, a sus Comunidades Autónomas o a sus símbolos o emblemas se castigan cuando se efectúan:',
  'Con publicidad.', ['En lugar destinado a actos oficiales.', 'Con ánimo de menoscabar la unidad del Estado.', 'En presencia de autoridad o agente de la autoridad.'],
  'efectuados con publicidad');
q('op', 'art. 550.1', 'Atentado', 'Son reos de atentado los que agredieren o, con intimidación grave o violencia, opusieren resistencia grave a la autoridad, a sus agentes o funcionarios públicos, o los acometieren, cuando se hallen:',
  'En el ejercicio de las funciones de sus cargos o con ocasión de ellas.', ['Exclusivamente en el ejercicio de sus funciones y en horario de servicio.', 'De uniforme y debidamente identificados.', 'En el desempeño de funciones de policía judicial.'],
  'cuando se hallen en el ejercicio de las funciones de sus cargos o con ocasión de ellas');
q('op', 'art. 551.3.º', 'Atentado: agravación', 'Se impondrán las penas superiores en grado a las previstas para el atentado siempre que se cometa:',
  'Acometiendo a la autoridad, a su agente o al funcionario público haciendo uso de un vehículo de motor.', ['Contra la autoridad en lugar público y con presencia de testigos.', 'Mediando amenazas verbales previas a la agresión.', 'Por dos o más personas sin necesidad de concierto previo.'],
  'Acometiendo a la autoridad, a su agente o al funcionario público haciendo uso de un vehículo de motor');
q('op', 'art. 553', 'Actos preparatorios del atentado', 'La provocación, la conspiración y la proposición para cualquiera de los delitos de atentado, resistencia y desobediencia se castigará con:',
  'La pena inferior en uno o dos grados a la del delito correspondiente.', ['La pena superior en un grado a la del delito.', 'La misma pena que el delito consumado.', 'La pena inferior en tres grados a la del delito.'],
  'será castigada con la pena inferior en uno o dos grados a la del delito correspondiente');
q('op', 'art. 558', 'Desórdenes públicos: perturbación del orden', 'Se castiga a los que perturben gravemente el orden en la audiencia de un tribunal o juzgado, en los actos públicos propios de cualquier autoridad o corporación, en colegio electoral, oficina o establecimiento público, centro docente o:',
  'Con motivo de la celebración de espectáculos deportivos o culturales.', ['Con motivo de la celebración de reuniones o manifestaciones lícitas.', 'En los transportes públicos de viajeros.', 'En los lugares de culto de cualquier confesión religiosa.'],
  'centro docente o con motivo de la celebración de espectáculos deportivos o culturales');
q('op', 'art. 560.3', 'Daños que afectan a servicios públicos', 'Se castiga a los que dañen las conducciones o transmisiones de agua, gas o electricidad para las poblaciones:',
  'Interrumpiendo o alterando gravemente el suministro o servicio.', ['Provocando únicamente daños materiales de escasa cuantía.', 'Sin necesidad de que se altere el suministro.', 'Siempre que el daño exceda de cuatrocientos euros.'],
  'interrumpiendo o alterando gravemente el suministro o servicio');
q('op', 'art. 563', 'Tenencia de armas prohibidas', 'La tenencia de armas prohibidas se extiende también a:',
  'Las que sean resultado de la modificación sustancial de las características de fabricación de armas reglamentadas.', ['Las armas reglamentadas con licencia caducada.', 'Las armas de fuego reglamentadas guardadas sin guía de pertenencia.', 'Las armas antiguas inutilizadas y de valor histórico.'],
  'y la de aquellas que sean resultado de la modificación sustancial de las características de fabricación de armas reglamentadas');
q('op', 'art. 564.2', 'Tenencia de armas de fuego reglamentadas: agravación', 'La tenencia de armas de fuego reglamentadas careciendo de licencias se agrava cuando concurra la circunstancia de que las armas:',
  'Carezcan de marcas de fábrica o de número, o los tengan alterados o borrados.', ['Hayan sido adquiridas por herencia o donación.', 'Estén guardadas en un lugar distinto del domicilio del titular.', 'Sean de calibre inferior al reglamentariamente establecido.'],
  'Que las armas carezcan de marcas de fábrica o de número, o los tengan alterados o borrados');
q('op', 'art. 567.1', 'Depósito de armas de guerra', 'Se considera depósito de armas de guerra:',
  'La fabricación, la comercialización o la tenencia de cualquiera de dichas armas, con independencia de su modelo o clase, aun cuando se hallen en piezas desmontadas.', ['La tenencia de más de cinco armas de guerra completas y montadas.', 'Únicamente la fabricación de armas de guerra completas.', 'El almacenamiento de armas de guerra en un establecimiento público.'],
  'Se considera depósito de armas de guerra la fabricación, la comercialización o la tenencia de cualquiera de dichas armas, con independencia de su modelo o clase, aun cuando se hallen en piezas desmontadas');
q('op', 'art. 567.2', 'Armas de guerra y armas químicas', 'Se consideran armas de guerra:',
  'Las determinadas como tales en las disposiciones reguladoras de la defensa nacional.', ['Las determinadas como tales en los tratados o convenios internacionales en los que España sea parte.', 'Las que así se declaren por resolución de la Dirección General de la Guardia Civil.', 'Todas las armas de fuego automáticas, cualquiera que sea su calibre.'],
  'Se consideran armas de guerra las determinadas como tales en las disposiciones reguladoras de la defensa nacional');
q('op', 'art. 570 bis.1', 'Organización criminal', 'Quienes participaren activamente en la organización criminal, formaren parte de ella o cooperaren económicamente o de cualquier otro modo con la misma serán castigados con penas distintas según que la organización tuviere como fin:',
  'La comisión de delitos graves o la comisión de otros delitos.', ['La comisión de delitos contra la vida o contra la integridad física.', 'La comisión de delitos con ánimo de lucro, o sin él.', 'La comisión de delitos en el extranjero o en territorio nacional.'],
  'serán castigados con las penas de prisión de dos a cinco años si tuviere como fin la comisión de delitos graves, y con la pena de prisión de uno a tres años en los demás casos');
q('op', 'art. 573 bis.1', 'Penas del terrorismo', 'Los delitos de terrorismo serán castigados con la pena de prisión por el tiempo máximo previsto en el Código cuando:',
  'Se causara la muerte de una persona.', ['Se causara cualquier otra lesión o se detuviera ilegalmente a una persona.', 'Se causaran estragos o incendio.', 'En los casos de secuestro, no se dé razón del paradero de la persona.'],
  'Con la de prisión por el tiempo máximo previsto en este Código si se causara la muerte de una persona');
q('op', 'art. 577.1', 'Colaboración con organización terrorista', 'Comete delito el que lleve a cabo, recabe o facilite cualquier acto de colaboración con las actividades o las finalidades de:',
  'Una organización, grupo o elemento terrorista, o para cometer cualquiera de los delitos comprendidos en el Capítulo.', ['Una asociación ilícita de cualquier naturaleza.', 'Una organización criminal dedicada al tráfico de armas.', 'Un partido político declarado ilegal.'],
  'el que lleve a cabo, recabe o facilite cualquier acto de colaboración con las actividades o las finalidades de una organización, grupo o elemento terrorista, o para cometer cualquiera de los delitos comprendidos en este Capítulo');
q('op', 'art. 579.3', 'Actos preparatorios en los delitos de terrorismo', 'Los demás actos de provocación, conspiración y proposición para cometer alguno de los delitos de terrorismo se castigarán con:',
  'La pena inferior en uno o dos grados a la que corresponda a los hechos previstos en el Capítulo.', ['La pena superior en un grado a la señalada para el delito.', 'La misma pena que el delito consumado.', 'La pena inferior en tres grados a la del delito correspondiente.'],
  'se castigarán también con la pena inferior en uno o dos grados a la que corresponda respectivamente a los hechos previstos en este Capítulo');
q('ci', 'art. 607 bis.2', 'Delitos de lesa humanidad', 'Los reos de delitos de lesa humanidad serán castigados con la pena de prisión permanente revisable si:',
  'Causaran la muerte de alguna persona.', ['Cometieran una violación.', 'Produjeran alguna de las lesiones del artículo 149.', 'Sometieran a las personas a condiciones de existencia que pongan en peligro su vida.'],
  'Con la pena de prisión permanente revisable si causaran la muerte de alguna persona');
q('ci', 'art. 611.7.º', 'Delitos contra las personas y bienes protegidos en caso de conflicto armado', 'Será castigado el que, con ocasión de un conflicto armado, impida o demore, injustificadamente:',
  'La liberación o la repatriación de prisioneros de guerra o de personas civiles.', ['El traslado de heridos y enfermos a centros sanitarios.', 'El intercambio de rehenes entre las partes en conflicto.', 'El acceso de la ayuda humanitaria a la población civil.'],
  'Impida o demore, injustificadamente, la liberación o la repatriación de prisioneros de guerra o de personas civiles');

// ---- entradas de las listas (los párrafos que abren la enumeración también llevan marca) ----
const qp = (ap, a, r, e, ok, mal, t, p) => { q(ap, a, r, e, ok, mal, t); R[R.length - 1].p = p || ''; };
qp('pat', 'art. 310', 'Delito contable', 'Comete delito contable el que estando obligado por ley tributaria a llevar:',
  'Contabilidad mercantil, libros o registros fiscales.', ['Únicamente contabilidad mercantil, no libros ni registros fiscales.', 'Libros de comercio, siempre que sea empresario individual.', 'Cualquier registro, sea o no exigido por una norma tributaria.'],
  'el que estando obligado por ley tributaria a llevar contabilidad mercantil, libros o registros fiscales');
qp('sc', 'art. 378', 'Imputación de pagos del penado', 'Los pagos que efectúe el penado por uno o varios delitos contra la salud pública se imputarán:',
  'Por el orden que establece el Código Penal.', ['Por el orden que determine libremente el penado.', 'A prorrata entre todos los créditos pendientes.', 'En primer lugar a la multa y a continuación a las costas.'],
  'Los pagos que se efectúen por el penado por uno o varios de los delitos a que se refieren los artículos 361 al 372 se imputarán por el orden siguiente',
  'El primer lugar corresponde a la reparación del daño causado e indemnización de perjuicios.');
qp('aj', 'art. 446', 'Prevaricación judicial', 'Comete prevaricación judicial el juez o magistrado que dictare sentencia o resolución injusta:',
  'A sabiendas.', ['Por imprudencia grave.', 'Por negligencia inexcusable.', 'Con ánimo de lucro, exclusivamente.'],
  'El juez o magistrado que, a sabiendas, dictare sentencia o resolución injusta será castigado');
qp('cons', 'art. 493', 'Delitos contra las Instituciones del Estado', 'Los que invadieren con fuerza, violencia o intimidación las sedes del Congreso de los Diputados, del Senado o de una Asamblea Legislativa de Comunidad Autónoma, si están reunidos, cometen delito:',
  'Aunque no se alcen públicamente.', ['Solo si se alzan pública y tumultuariamente.', 'Solo si portan armas o explosivos.', 'Solo si pretenden derrocar al Gobierno.'],
  'Los que, sin alzarse públicamente, invadieren con fuerza, violencia o intimidación las sedes del Congreso de los Diputados, del Senado o de una Asamblea Legislativa de Comunidad Autónoma, si están reunidos');
qp('op', 'art. 513', 'Reuniones o manifestaciones ilícitas', 'Son punibles las reuniones o manifestaciones ilícitas. Tienen tal consideración, entre otras, las que se celebren:',
  'Con el fin de cometer algún delito.', ['Sin comunicación previa a la autoridad gubernativa.', 'En lugares de tránsito público sin autorización.', 'En horario nocturno.'],
  'Son punibles las reuniones o manifestaciones ilícitas, y tienen tal consideración', '1.º Las que se celebren con el fin de cometer algún delito.');
qp('op', 'art. 515', 'Asociaciones ilícitas', 'Son punibles las asociaciones ilícitas. Tienen tal consideración, entre otras:',
  'Las que tengan por objeto cometer algún delito o, después de constituidas, promuevan su comisión.', ['Las asociaciones sin ánimo de lucro que no se hayan inscrito en el registro.', 'Las que persigan fines religiosos no reconocidos oficialmente.', 'Las constituidas por extranjeros no residentes.'],
  'Son punibles las asociaciones ilícitas, teniendo tal consideración', '1.º Las que tengan por objeto cometer algún delito o, después de constituidas, promuevan su comisión.');
qp('op', 'art. 551', 'Atentado: agravación', 'Se impondrán las penas superiores en grado a las previstas para el atentado siempre que se cometa, entre otras circunstancias:',
  'Haciendo uso de armas u otros objetos peligrosos.', ['Contra la autoridad en lugar público.', 'Por dos o más personas sin concierto previo.', 'Mediando amenazas verbales previas a la agresión.'],
  'Se impondrán las penas superiores en grado a las respectivamente previstas en el artículo anterior siempre que el atentado se cometa', '1.º Haciendo uso de armas u otros objetos peligrosos.');
qp('op', 'art. 564.2', 'Tenencia de armas de fuego reglamentadas: agravación', 'La tenencia de armas de fuego reglamentadas careciendo de las licencias o permisos necesarios se castiga con penas más graves:',
  'Cuando concurra alguna de las circunstancias siguientes: armas sin marcas o con marcas alteradas, introducidas ilegalmente o transformadas.', ['Cuando el titular tenga antecedentes penales, sea cual fuere el arma.', 'Siempre que el arma sea corta y esté cargada.', 'Cuando la tenencia se prolongue por más de un año.'],
  'cuando concurra alguna de las circunstancias siguientes');
qp('op', 'art. 573 bis.1', 'Penas del terrorismo', 'Los delitos de terrorismo a que se refiere el apartado 1 del artículo anterior se castigan con:',
  'Penas graduadas según el resultado causado, que van desde el máximo de prisión previsto en el Código por muerte hasta la pena del delito cometido en su mitad superior.', ['Una pena única de prisión permanente revisable en todos los casos.', 'La pena del delito común correspondiente, sin agravación alguna.', 'Penas idénticas, con independencia del resultado producido.'],
  'serán castigados con las siguientes penas');
qp('ci', 'art. 607 bis.2', 'Delitos de lesa humanidad', 'Los reos de delitos de lesa humanidad serán castigados con una pena que depende:',
  'Del resultado producido y de la conducta realizada.', ['De la nacionalidad de la víctima.', 'Del número de personas de la población civil atacadas, únicamente.', 'De la condición militar o civil del autor.'],
  'Los reos de delitos de lesa humanidad serán castigados');

require('../preguntas-marcas-lib.js')({ T: 19, fuentes: ['tema19/oficial.txt'], desdeOf: 276, desdeIA: 2737, fmt: 'nuevo', Q: R });
