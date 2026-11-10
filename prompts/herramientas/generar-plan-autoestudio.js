/* Genera el calendario (const DATA) de «AUTOESTUDIO GUIADO 26-27.html» y lo escribe dentro del HTML.
   Uso:  node prompts/herramientas/generar-plan-autoestudio.js
   - Los 4 primeros días (5-8 nov 2026) se conservan tal cual están en el HTML.
   - Temas nuevos repartidos por PÁGINAS (≈25 por día): edita PAG si algún tema tiene más o menos páginas.
   - Cada tarea lleva un id estable (n19a, v2-11b…) para que el progreso sincronizado no se descoloque si se vuelve a generar. */
const fs = require('fs'), path = require('path');
const HTML = path.join(__dirname, '..', '..', 'AUTOESTUDIO GUIADO 26-27.html');

const NOMBRE = {1:'Derechos Humanos',2:'Terrorismo internacional',3:'Tratados de la UE',4:'Fronteras de la UE',5:'Bases de datos europeas',6:'Extranjería',7:'Derechos y deberes fundamentales (Constitución)',8:'Poder Judicial',9:'Defensa Nacional',10:'Derecho Civil',11:'Derecho Administrativo',12:'Gobierno y Administración',13:'Jurisdicción Contencioso-Administrativa',14:'Defensor del Pueblo',15:'VioGén',16:'Igualdad entre mujeres y hombres',17:'Menores',18:'Derecho Penal. Parte General',19:'Derecho Penal. Parte Especial',20:'Derecho Procesal Penal (I)',21:'Derecho Procesal Penal (II) y normas complementarias',22:'Seguridad Ciudadana',23:'Seguridad Privada',24:'Estructura orgánica básica',25:'Cooperación y coordinación policial',26:'Estatuto de la Guardia Civil',27:'Deontología profesional'};
/* Páginas aproximadas del resumen subrayado de los temas NUEVOS (T19 y T20 medidos; T21-T27 estimados: corrígelos si no son así) */
const PAG = {19:50, 20:49, 21:50, 22:35, 23:35, 24:30, 25:35, 26:50, 27:30};
const NUEVOS = [19,20,21,22,23,24,25,26,27];
const PARTES_VUELTA = new Set([4,11,19,20,21,26]);   // temas largos: en la vuelta 2 ocupan dos días
const PARTES_V3 = new Set([11,19,21,26]);            // en la vuelta 3 ya los conoces mejor: T4 y T20 caben en un día
const UMBRAL = 85;
const CAL = [20, 'Calentamiento del día en la app: 30 preguntas (10 de hace 1 semana, 10 de hace 1 mes, 10 de fallos).'];
const LETRA = 'abcdef';

const tot = b => b.reduce((s, x) => s + x[0], 0);
const nom = N => 'T' + N + ' ' + NOMBRE[N];
const parte = (i, n) => n > 1 ? ' (parte ' + (i + 1) + '/' + n + ')' : '';
const partesNuevo = N => PAG[N] > 32 ? 2 : 1;
const dia = (d, k, t, b, extra) => Object.assign({d, k, t, n: '', b, m: tot(b)}, extra || {});

/* ---------- bloques por tipo de día ---------- */
function bNuevo(N, i, n, rep) {
  const ult = i === n - 1, pp = n > 1 ? Math.round(PAG[N] / n) : PAG[N];
  return [CAL,
    [75, 'Lee lo subrayado de ' + nom(N) + parte(i, n) + ' (≈' + pp + ' págs): solo lo subrayado, de seguido. El objetivo es saber cómo está organizado el tema, no memorizarlo todavía.'],
    [45, 'Recuerdo activo por bloques: divide lo leído en 4-5 bloques; al acabar cada uno cierra el resumen y di o escribe lo que recuerdas (plazos, órganos, listas, excepciones). Ábrelo y comprueba lo que has olvidado.'],
    [30, ult ? "Test del tema completo (40 preguntas, modo 'Un tema'). Anota la nota abajo y marca con '?' las dudas, aunque las aciertes." : "Test de esta parte (20-30 preguntas, modo 'Un tema'). Marca con '?' las dudas, aunque las aciertes."],
    [20, 'Repaso corto de ' + nom(rep) + ": 10 min recordando de memoria y test de 15 preguntas ('Repasar fallos'). Solo vuelves al resumen en lo fallado."],
    [20, "Cierre: repasa los '?' y los fallos de hoy y haz 10 preguntas de 'Plazos y autoridades (tema)'."]];
}
const bV2 = (N, i, n) => [CAL,
  [40, 'Esquema de memoria de ' + nom(N) + parte(i, n) + ', sin mirar el resumen. Después compáralo y corrige.'],
  [35, "Test del tema, 40 preguntas (modo 'Un tema'). Anota la nota abajo: si sacas menos del " + UMBRAL + ' %, el tema pasa a la lista de flojos y vuelve en 3 días.'],
  [45, 'Vuelve al resumen solo en lo fallado o dudoso y completa tu esquema.'],
  [25, "'Plazos y autoridades (tema)' y fichas de pregunta y respuesta del tema."],
  [15, 'Repasar fallos del día y marcar o quitar dudas.']];
const bV3 = (N, i, n) => [CAL,
  [30, 'Esquema de memoria de ' + nom(N) + parte(i, n) + '. Si ya lo dominas (nota ≥ 90 % la última vez) basta con repasarlo a la mitad de tiempo.'],
  [30, "Test del tema, 30 preguntas. Anota la nota abajo."],
  [35, 'Resumen solo en lo fallado; amplía tu esquema con lo que falles.'],
  [20, "'Plazos y autoridades (tema)'."],
  [30, "'Repaso inteligente': las preguntas que la app te pide hoy."],
  [15, 'Repasar fallos del día y dudas.']];
function bPar(ns) {
  const b = [CAL];
  ns.forEach(N => b.push([50, nom(N) + ": esquema de memoria (25 min), test de 20 preguntas (15 min) y 'Plazos y autoridades (tema)' (10 min). Anota la nota abajo."]));
  b.push(ns.length > 1 ? [25, "Test de 30 preguntas mezcladas de los dos temas (modo 'Bloques')."] : [25, "Test de 30 preguntas mezcladas de este tema y de uno anterior (modo 'Bloques')."]);
  b.push([30, "'Repaso inteligente' del día."]);
  b.push([20, 'Repasar fallos del día y dudas.']);
  return b;
}
const bRepaso = [CAL,
  [50, 'T2 Terrorismo internacional: esquema de memoria (25 min) y test de 40 preguntas (25 min). Anota la nota abajo.'],
  [50, 'T5 Bases de datos europeas: esquema de memoria (25 min) y test de 40 preguntas (25 min). Anota la nota abajo.'],
  [50, 'Vuelve al resumen solo en lo fallado de ambos temas y corrige tus esquemas.'],
  [35, "Test de 50 preguntas mezcladas de los temas nuevos (modo 'Bloques')."],
  [15, "Cierre: dudas marcadas del día y 'Repasar fallos'."]];
/* ---------- Inglés y psicotécnicos (sábados + toques cortos entre semana) ---------- */
/* Inglés: 41 temas de gramática de la app de inglés (test-oficial-ingles.html), 2 por sábado; al acabar, simulacros y flojos. */
const TEMAS_ING = {1:'Present Simple',2:'Pasado Simple',3:'El Artículo',4:'El Plural',5:'Los Adjetivos',6:'Presente Continuo',7:'Past Continuo',8:'Genitivo Sajón',9:'There Be',10:'Question Words',11:'Question Tags',12:'Los Pronombres',13:'Sustantivos Contables e Incontables',14:'Presente Perfecto',15:'For, Since, Ago, Just, Still, Already, Yet',16:'Present Perfect Continuo',17:'Past Perfect',18:'Past Perfect Continuo',19:'Verbos Irregulares',20:'Los Adverbios',21:'Comparativo y Superlativo',22:'Las Preposiciones',23:'Despite, In Spite Of, Although, Though',24:'Conectores',25:'Futuro Simple y Futuro Perfecto',26:'Futuro Continuo y Perfecto Continuo',27:'Verbos Dinámicos y Estáticos',28:'Verbos Modales',29:'Verbos Modales Perfectos',30:'Primer Condicional',31:'Segundo Condicional',32:'Tercer Condicional',33:'Condicional Cero',34:'La Voz Pasiva',35:'El Imperativo',36:'Reported Speech',37:'Relative Clauses',38:'Phrasal Verbs',39:'False Friends',40:'Un poco de todo 1',41:'Un poco de todo 2'};
const NT_ING = 41;
const ingTema = N => 'T' + N + ' ' + TEMAS_ING[N];
/* Psicotécnicos: tipos de prueba que se rotan (no hay banco en la app: se usa el material propio). */
const TIPOS_PSI = [
  ['series numéricas y de letras', 'busca la regla (suma, resta, alternancia, saltos) antes de calcular'],
  ['razonamiento verbal (analogías, sinónimos y antónimos)', 'define la relación entre el primer par y aplícala al segundo'],
  ['razonamiento lógico y deductivo', 'dibuja un esquema o una tabla y descarta opciones por contradicción'],
  ['cálculo y problemas numéricos', 'porcentajes, proporciones, velocidades y reglas de tres; cálculo mental y estimación'],
  ['razonamiento abstracto y series de figuras', 'compara giros, sumas y restas de elementos, colores y posiciones'],
  ['razonamiento espacial (giros, plegados y cubos)', 'rota la figura mentalmente por pasos pequeños'],
  ['atención y percepción (diferencias, búsqueda y comparación rápida)', 'ritmo constante: no te atasques, marca y sigue'],
  ['memoria y ordenación (secuencias, datos y ordenaciones)', 'agrupa la información en bloques y repítela con tus palabras']];
const PSI_SIM_CADA = 4;   // cada 4.º sábado, un bloque mixto cronometrado en lugar de un solo tipo
function bSabN(k) {      // k = nº de sábado (0 = 14 nov 2026)
  const a = 2 * k + 1, b = 2 * k + 2;
  let ing;
  if (a <= NT_ING) {
    const ts = b <= NT_ING ? [a, b] : [a], nm = ts.map(ingTema).join(' y ');
    ing = [[30, 'Inglés: teoría de ' + nm + ' (apartado Teoría de la app de inglés). Léela y escribe 3 ejemplos propios de cada uno; fíjate en las trampas.'],
           [35, 'Inglés: test de ' + nm + " (30-40 preguntas, modo 'Un tema'). Anota los fallos."],
           [25, "Inglés: repasa los fallos de hoy (modo 'Repasar fallos') y haz 10 preguntas de temas de semanas anteriores."]];
  } else {
    const simu = (k - Math.ceil(NT_ING / 2)) % 2 === 0;
    ing = simu
      ? [[30, 'Inglés: simulacro de inglés completo (apartado Simulacros de la app de inglés), cronometrado y sin ayudas.'],
         [35, 'Inglés: corrige cada fallo con la teoría del tema y apunta la regla en una frase.'],
         [25, 'Inglés: test de 20 preguntas de los 3 temas con peor nota.']]
      : [[30, 'Inglés: repasa la teoría de los 3 temas de gramática con peor nota (míralo en Mi Progreso de la app de inglés).'],
         [35, "Inglés: test de 40 preguntas de esos temas (modo 'Lo que no domino' o 'Repasar fallos')."],
         [25, 'Inglés: phrasal verbs, false friends y verbos irregulares: 20 preguntas rápidas.']];
  }
  const sim = (k + 1) % PSI_SIM_CADA === 0, tp = TIPOS_PSI[k % TIPOS_PSI.length];
  const psi = sim
    ? [[10, 'Psicotécnicos: repasa tus errores recurrentes de las semanas anteriores.'],
       [40, 'Psicotécnicos: bloque mixto cronometrado (series, analogías, lógica, cálculo y figuras) con el tiempo de la prueba real. Anota aciertos y tiempo.'],
       [10, 'Psicotécnicos: revisa los fallos y apunta qué tipo te cuesta más.']]
    : [[15, 'Psicotécnicos: método de ' + tp[0] + ': ' + tp[1] + '.'],
       [35, 'Psicotécnicos: practica ' + tp[0] + ' con tu material, cronometrado. Anota aciertos y tiempo.'],
       [10, 'Psicotécnicos: corrige los fallos y escribe en una línea por qué fallaste.']];
  return [CAL, ...ing, ...psi, [30, "'Plazos y autoridades (general)'."]];
}
const bIngExpres = [10, "Inglés exprés: 15 preguntas en la app de inglés (modo 'Repasar fallos' o un tema ya visto). Mínimo 3 días por semana."];
const bPsiDom = [20, 'Psicotécnicos: test corto cronometrado (20 min) del tipo que peor llevas. Mínimo 1 día por semana, además del sábado.'];
const bColchon = [CAL, [120, 'Recupera lo atrasado del mes: por cada día que no hiciste, un tema o vuelta pendiente (máximo 2). Si vas al día, repasa primero los temas de la lista de flojos y haz el repaso inteligente.'], [40, "'Repasar fallos'."]];
const bDom = [CAL, [40, "'Repasar fallos': todos los de la semana."], [25, "'Repasar dudas'."], [30, "'Plazos y autoridades (general)'."], [15, 'Mira la semana siguiente en el calendario y deja preparado el lunes.']];
const bSim = [CAL,
  [90, 'Simulacro de examen en la app: 105 preguntas y 90 minutos. Sin ayudas ni pausas.'],
  [60, 'Corrección: cada fallo y duda con el resumen o la norma; explícalo en una frase.'],
  [30, "'Lo que no domino': 30 preguntas."],
  [10, 'Anota abajo la nota del simulacro y los 3 temas más flojos: pasarán a refuerzo.']];
const bRef = [CAL,
  [90, "Temas flojos (lista de arriba y 'Temas a reforzar' de Mi Progreso): coge los 2 peores; esquema de memoria y test de 40 preguntas de cada uno. Anota la nota nueva."],
  [40, "'Lo que no domino'."], [30, "'Plazos y autoridades (general)'."], [20, 'Repasar dudas.'], [20, "'Repaso inteligente'."]];
const bCorr = [CAL, [90, "Corrección a fondo de los fallos del simulacro (modo 'Repasar fallos')."], [60, 'Esquema y resumen de los 2 temas más flojos.'], [30, "'Plazos y autoridades (general)'."], [20, 'Repasar dudas.']];
const bAfinar = [CAL, [90, 'Lectura rápida de esquemas: 4 temas al día, empezando por los más flojos.'], [40, "'Plazos y autoridades (general)'."], [30, 'Repasar fallos.'], [20, 'Repasar dudas.']];
const bAfinarLig = [[20, 'Calentamiento ligero del día.'], [40, 'Repasar fallos y dudas.'], [20, "'Plazos y autoridades (general)'."], [10, 'Prepara documentación y material del examen. Cena ligera y a dormir pronto.']];

/* ---------- fechas fijas ---------- */
const FESTIVOS = {'2026-12-08': 'Festivo', '2026-12-25': 'Festivo', '2027-01-01': 'Festivo', '2027-01-06': 'Festivo', '2027-04-02': 'Festivo', '2027-05-01': 'Festivo'};
const SIMS = ['2026-12-18','2027-01-15','2027-01-29','2027-02-12','2027-02-26','2027-03-12','2027-03-26','2027-04-09','2027-04-16','2027-04-23','2027-04-30','2027-05-07','2027-05-14'];
const HITOS = {'2027-02-26': [70, 'Hito 1 (fin de febrero): al menos un 70 % en el simulacro. Si no llegas, esta semana vuelven a verse los 3 temas más flojos antes de seguir con vueltas.'],
               '2027-04-30': [80, 'Hito 2 (fin de abril): al menos un 80 % en el simulacro. Si no llegas, los días de refuerzo de mayo van solo a los temas flojos.'],
               '2027-06-11': [88, 'Hito 3 (mitad de junio): al menos un 88 % en el simulacro. Si no llegas, los 8 días antes del examen se dedican solo a los temas flojos y a las normas más preguntadas.']};
const FIN = {  // desde el 24 de mayo, calendario fijo de simulacros, correcciones y refuerzos
  '2027-05-24':'COR','2027-05-25':'SIM','2027-05-26':'REF','2027-05-27':'REF','2027-05-28':'SIM','2027-05-31':'COR','2027-06-01':'SIM','2027-06-02':'REF','2027-06-03':'REF','2027-06-04':'SIM',
  '2027-06-07':'COR','2027-06-08':'SIM','2027-06-09':'REF','2027-06-10':'REF','2027-06-11':'SIM','2027-06-14':'COR','2027-06-15':'SIM','2027-06-16':'REF','2027-06-17':'REF','2027-06-18':'SIM',
  '2027-06-21':'AF','2027-06-22':'AF','2027-06-23':'AF','2027-06-24':'AF','2027-06-25':'AF','2027-06-28':'AF','2027-06-29':'AFL','2027-06-30':'AFL','2027-07-01':'EXA'};
SIMS.push(...Object.keys(FIN).filter(d => FIN[d] === 'SIM'));
const ROD = '2027-05-24';

/* ---------- cola de tareas de estudio (en orden) ---------- */
const cola = [];
const rot = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]; let ri = 0;
NUEVOS.forEach(N => { const n = partesNuevo(N); for (let i = 0; i < n; i++) { const rep = rot[ri++ % rot.length]; cola.push({k: 'NUEVO', id: 'n' + N + LETRA[i], tm: [N], last: i === n - 1, t: 'TEMA NUEVO: ' + nom(N) + parte(i, n), b: bNuevo(N, i, n, rep)}); } });
/* (se quitó el día suelto «Repaso exprés T2 y T5»: cada día de tema nuevo ya lleva su repaso corto y la vuelta 2 empieza enseguida) */
[['V2', bV2], ['V3', bV3]].forEach(([k, fn]) => { for (let N = 1; N <= 27; N++) { const n = (k === 'V2' ? PARTES_VUELTA : PARTES_V3).has(N) ? 2 : 1; for (let i = 0; i < n; i++) cola.push({k, id: k.toLowerCase() + '-' + N + LETRA[i], tm: [N], last: i === n - 1, t: 'Vuelta ' + k[1] + ': ' + nom(N) + parte(i, n), b: fn(N, i, n)}); } });
['V4', 'V5', 'V6'].forEach(k => { for (let N = 1; N <= 27; N += 2) { const ns = N === 27 ? [27] : [N, N + 1]; cola.push({k, id: k.toLowerCase() + '-' + N, tm: ns, last: true, t: 'Vuelta ' + k[1] + ': ' + ns.map(nom).join(' + '), b: bPar(ns)}); } });

/* ---------- los 4 primeros días se conservan del HTML ---------- */
const src = fs.readFileSync(HTML, 'utf8');
const a = src.indexOf('const DATA=') + 11, b = src.indexOf('\nconst TAGS');
const viejo = eval(src.slice(a, b).trim().replace(/;\s*$/, ''));
const out = viejo.slice(0, 4).map((o, i) => i < 2 ? Object.assign({}, o, {id: 't' + i, tm: [i === 0 ? 8 : 18], last: true}) : o);

const iso = d => d.toISOString().slice(0, 10);
const sumaDias = (f, n) => { const d = new Date(f + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
let sig = 0, domN = 1, sabN = 0;   // sabN: 0 = sábado 14 nov 2026
const conIng = (f, o) => { if ([1, 3, 5].includes(new Date(f + 'T12:00:00Z').getUTCDay())) { o.b = [...o.b, bIngExpres]; o.m = tot(o.b); } return o; };   // el domingo 8 nov (colchón) era el primero del ciclo
for (let f = '2026-11-09'; f <= '2027-07-01'; f = sumaDias(f, 1)) {
  const dow = new Date(f + 'T12:00:00Z').getUTCDay();
  if (FESTIVOS[f]) { out.push({d: f, k: 'LIBRE', t: 'Festivo', n: 'Libre. Si vas atrasado, úsalo para recuperar (hasta 3 h) siguiendo el orden del calendario.'}); continue; }
  if (dow === 6) { out.push(dia(f, 'SAB', 'Inglés y psicotécnicos', bSabN(sabN++))); continue; }
  if (dow === 0) {
    const ciclo = domN++ % 4;   // colchón · descanso · ligero · descanso  (un descanso real cada dos semanas)
    if (ciclo === 0) out.push(dia(f, 'COLCHON', 'Domingo colchón', [...bColchon, bPsiDom]));
    else if (ciclo === 2) out.push(dia(f, 'DOM', 'Domingo ligero', [...bDom, bPsiDom]));
    else out.push({d: f, k: 'LIBRE', t: 'Descanso', n: 'Día libre de verdad: no estudies. Descansar también forma parte del plan (y la memoria se consolida mientras descansas).'});
    continue;
  }
  if (f >= ROD && FIN[f]) {
    const c = FIN[f];
    if (c === 'SIM') out.push(dia(f, 'SIMULACRO', 'SIMULACRO', bSim, {sim: 1}));
    else if (c === 'COR') out.push(dia(f, 'CORRECCIÓN', 'Corrección de simulacro', bCorr));
    else if (c === 'REF') out.push(dia(f, 'REFUERZO', 'Refuerzo de puntos débiles', bRef));
    else if (c === 'AF') out.push(dia(f, 'AFINAR', 'Afinar', bAfinar));
    else if (c === 'AFL') out.push(dia(f, 'AFINAR', 'Afinar', bAfinarLig));
    else out.push(dia(f, 'EXAMEN', 'EXAMEN', [[30, 'Calentamiento ligero si el horario lo permite.']]));
    continue;
  }
  if (SIMS.includes(f)) { const o = dia(f, 'SIMULACRO', 'SIMULACRO', bSim, {sim: 1}); if (HITOS[f]) { o.h = HITOS[f][0]; o.ht = HITOS[f][1]; } out.push(o); continue; }
  if (sig < cola.length) { const c = cola[sig++]; out.push(conIng(f, dia(f, c.k, c.t, c.b, {id: c.id, tm: c.tm, last: c.last}))); continue; }
  out.push(conIng(f, dia(f, 'REFUERZO', 'Refuerzo de puntos débiles', bRef)));
}
if (HITOS['2027-06-11']) { const o = out.find(x => x.d === '2027-06-11'); o.h = HITOS['2027-06-11'][0]; o.ht = HITOS['2027-06-11'][1]; }
if (sig < cola.length) console.log('AVISO: no caben ' + (cola.length - sig) + ' tareas antes del ' + ROD + ' (la app las recortará; revisa PAG o PARTES_VUELTA).');
const ultima = out.filter(o => o.k === 'V6').pop();
console.log('Días:', out.length, '· tareas de estudio:', cola.length, '· última vuelta 6:', ultima && ultima.d, '· temas nuevos hasta:', out.filter(o => o.k === 'NUEVO').pop().d);

const nuevo = src.slice(0, a) + JSON.stringify(out) + src.slice(b);
fs.writeFileSync(HTML, nuevo);
