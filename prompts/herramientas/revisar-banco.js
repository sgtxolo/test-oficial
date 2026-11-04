// Revisión automática del banco de test-oficial-conocimiento.html (archivo grande: se trabaja por posiciones, nunca se lee entero a mano).
// Uso:  node prompts/herramientas/revisar-banco.js [--aplicar] [fichero.html]
//   sin --aplicar -> solo informe (dry-run). Con --aplicar -> corrige en sitio lo seguro y escribe documentacion/REVISION-BANCO.md.
// Comprueba: (a) repetidas (mismo enunciado + misma respuesta) -> IA repetida se borra, oficiales NUNCA; (b) restos de importación;
//            (c) IA con la correcta más larga; (d) explicaciones que no siguen el formato fijo.
// Oficiales = QUESTIONS={...}; IA = bloques `const seed=[...];syncSeedIA(t,seed)` (ids N-ia-M).
// Tras --aplicar: sube CACHE (bump-cache.js) y regenera mapa/citas si procede.
const fs = require('fs');
const path = require('path');
const APLICAR = process.argv.includes('--aplicar');
const IGUALAR = process.argv.includes('--igualar-largas');
const COLETILLAS = [', según los casos', ' en los términos legalmente previstos', ', conforme a lo que establezca la normativa de desarrollo', ', sin perjuicio de lo dispuesto en otras disposiciones aplicables', ', de acuerdo con el procedimiento que reglamentariamente se determine en cada supuesto', ', en los términos y con las excepciones que establezca la normativa de desarrollo aplicable en cada caso concreto'];
const FILE = process.argv.slice(2).find(a => !a.startsWith('--')) || 'test-oficial-conocimiento.html';
let s = fs.readFileSync(FILE, 'utf8');

function fin(str, a) { // posición del cierre del {..} o [..] que abre en a
  let d = 0, inS = false, esc = false;
  for (let j = a; j < str.length; j++) {
    const c = str[j];
    if (inS) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inS = false; continue; }
    if (c === '"') inS = true; else if (c === '{' || c === '[') d++; else if (c === '}' || c === ']') { d--; if (d === 0) return j; }
  }
  return -1;
}
// Lista de preguntas con su posición exacta [a,b) en el fichero.
function objetos(arrStart, arrEnd, tema, tipo) {
  const out = []; let i = arrStart + 1;
  while (i < arrEnd) {
    while (i < arrEnd && s[i] !== '{') i++;
    if (i >= arrEnd) break;
    const j = fin(s, i);
    out.push({ a: i, b: j + 1, q: JSON.parse(s.slice(i, j + 1)), tema, tipo });
    i = j + 1;
  }
  return out;
}
const todas = [];
{ // oficiales
  const a = s.indexOf('QUESTIONS={') + 10, j = fin(s, a);
  let i = a + 1;
  while (i < j) {
    const m = /"(\d+)":\[/y; m.lastIndex = i;
    const r = m.exec(s); if (!r) { i++; continue; }
    const ar = i + r[0].length - 1, br = fin(s, ar);
    todas.push(...objetos(ar, br, +r[1], 'of'));
    i = br + 1;
  }
}
const nOf = todas.length;
{ // IA
  const re = /const seed=\[/g; let m;
  while ((m = re.exec(s))) {
    const a = m.index + 10, b = fin(s, a);
    const t = +(/^\];syncSeedIA\((\d+),seed\)/.exec(s.slice(b, b + 40)) || [])[1];
    todas.push(...objetos(a, b, t, 'ia'));
  }
}
const norm = x => String(x).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
const texto = x => String(x).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const RESTOS = /\bTEST\s*\d+\b|He analizado las im[aá]genes|analizado las im[aá]genes|\[imagen|\bIMG[_ ]\d+/i;
// Reescrituras manuales de opciones (índice -> texto) para las IA que el script no puede igualar solo.
const PARCHES = {
  '6-ia-1541': { 1: 'quince días hábiles' },
  '14-ia-38': { 1: 'Tres de los nueve puestos.' },
  '13-ia-109': {
    0: 'Todos los actos de los concesionarios de servicios públicos, sin excepción y con independencia de su naturaleza, ante este orden jurisdiccional.',
    1: 'Los actos de control o fiscalización dictados por la Administración concedente sobre los concesionarios que impliquen el ejercicio de potestades administrativas, y los de los propios concesionarios cuando sean recurribles directamente según la legislación sectorial.',
    2: 'Únicamente los actos de los concesionarios de servicios públicos locales, y no los de los concesionarios de servicios estatales o autonómicos, que quedan excluidos de este orden jurisdiccional.',
    3: 'Solo los actos de la Administración concedente sobre contratación y ejecución del contrato, no los dictados por los propios concesionarios de servicios públicos, que quedan fuera del orden contencioso-administrativo, con arreglo a lo previsto en el contrato administrativo suscrito.' },
  '13-ia-119': {
    0: 'Sí, recurso de alzada ante el superior jerárquico de la Administración autora del acto, que deberá resolver en el plazo de tres meses y cuya resolución pondrá fin a la vía administrativa, sin que sea necesario requerimiento previo.',
    1: 'Sí, recurso potestativo de reposición en todo caso, ante el mismo órgano que dictó la disposición o el acto, antes de acudir a la vía jurisdiccional contencioso-administrativa.',
    2: 'No, y tampoco cabe requerimiento previo alguno, de modo que la Administración deberá acudir directamente a la vía jurisdiccional sin trámite ni plazo previo alguno.',
    3: 'No, aunque la Administración que vaya a recurrir podrá requerir previamente a la otra para que derogue la disposición, anule o revoque el acto, haga cesar la actuación material o inicie la actividad debida.' },
  '13-ia-120': {
    0: 'La fecha del requerimiento previo formulado a la Administración y el sentido del silencio administrativo producido, si lo hubiera, transcurrido el plazo legal para resolver, con indicación del órgano ante el que se formuló.',
    1: 'El nombre y cargo del funcionario responsable de la inactividad o de la vía de hecho, así como la fecha en que se produjo el incumplimiento.',
    2: 'El órgano o dependencia al que se atribuya una u otra y, en su caso, el expediente de origen, o cualesquiera otros datos que identifiquen suficientemente el objeto del recurso.',
    3: 'La cuantía del perjuicio causado por la inactividad o la vía de hecho y la resolución administrativa que lo valore o cuantifique de forma expresa.' } };
const ops = []; // {a,b,nuevo|null,motivo}
const inf = { dup: [], dupOfOf: [], restos: [], larga: [], fmt: [], total: todas.length, oficiales: nOf, ia: todas.length - nOf };

// (a) repetidas
const vistas = new Map();
const orden = todas.map((o, i) => i).sort((x, y) => (todas[x].tipo === 'of' ? 0 : 1) - (todas[y].tipo === 'of' ? 0 : 1) || x - y);
const borrar = new Set();
for (const i of orden) {
  const o = todas[i], q = o.q;
  const k = o.tema + '|' + norm(q.pregunta) + '|' + norm(q.opciones[q.correcta]);
  if (vistas.has(k)) {
    const p = todas[vistas.get(k)];
    if (o.tipo === 'of') inf.dupOfOf.push([p.q.id, q.id]);
    else { borrar.add(i); inf.dup.push([q.id, p.q.id]); }
  } else vistas.set(k, i);
}
// (b) restos de importación
const MARCA_COLA = /\s*\**\s*(?:TEST\s*\d+\b|He analizado las im[aá]genes|Analizando las im[aá]genes|Based on the)/i;
function limpiaResto(x, campo) {
  if (campo === 'explicacion') { const m = MARCA_COLA.exec(x); return m ? x.slice(0, m.index).replace(/[\s*]+$/, '') : x; }
  // enunciado/opciones/apartado: se quita solo la etiqueta suelta («[TEST 10]», «y Test 8) »)
  return x.replace(/\s*\[\s*TEST\s*\d+\s*\]/gi, '').replace(/^[^.:?]{0,25}\bTest\s*\d+\)\s*/i, '').replace(/\s{2,}/g, ' ').trim();
}
// (c)(d)
const L = x => texto(x).length;
function fmtProblemas(o) {
  const e = o.q.explicacion || '', p = [];
  const iResp = e.indexOf('ex-resp'), iNorma = e.indexOf('ref-norma'), iConc = e.indexOf('ref-concepto');
  if (iResp < 0) p.push('sin ex-resp'); if (iNorma < 0) p.push('sin ref-norma'); if (iConc < 0) p.push('sin ref-concepto');
  if (iResp >= 0 && iNorma >= 0 && iConc >= 0 && !(iResp < iNorma && iNorma < iConc)) p.push('orden');
  const letra = 'ABCD'[o.q.correcta]; const mk = /Respuesta correcta: <b>([A-D])<\/b>/.exec(e);
  if (iResp >= 0 && (!mk || mk[1] !== letra)) p.push('letra≠correcta');
  const rn = /<span class="ref-norma">([^<]*)<\/span>/.exec(e.replace(/\\"/g, '"'));
  if (rn && !/\b(art\.?|artículo|punto|disposición|apartado|letra|preámbulo|exposición|base|regla|principio|capítulo|título|anexo)/i.test(rn[1])) p.push('norma sin localizador');
  if (/\(verificado con el temario/i.test(e)) p.push('verificado-con-temario');
  if (iConc >= 0 && /<\/span>\s*dispone/i.test(e)) p.push('dispone (la app lo limpia)');
  return p;
}
for (let i = 0; i < todas.length; i++) {
  const o = todas[i], q = o.q;
  if (borrar.has(i)) continue;
  let cambio = false; const nq = JSON.parse(JSON.stringify(q));
  const campos = [['pregunta', null], ['explicacion', null], ['apartado', null]];
  for (const [c] of campos) if (typeof nq[c] === 'string' && RESTOS.test(nq[c])) { const n = limpiaResto(nq[c], c); if (n !== nq[c]) { nq[c] = n; cambio = true; } inf.restos.push([q.id, c]); }
  nq.opciones = nq.opciones.map((x, k) => { if (RESTOS.test(x)) { inf.restos.push([q.id, 'op' + k]); const n = limpiaResto(x, 'op'); if (n !== x) { cambio = true; return n; } } return x; });
  if (o.tipo === 'ia' && PARCHES[q.id]) for (const [k, v] of Object.entries(PARCHES[q.id])) if (nq.opciones[k] !== v) { nq.opciones[k] = v; cambio = true; }
  if (o.tipo === 'ia') {
    const ls = nq.opciones.map(L), c = nq.correcta, mx = Math.max(...ls);
    if (ls[c] === mx && ls.filter(v => v === mx).length === 1 && nq.opciones.length > 1) {
      const mw = Math.max(...ls.filter((v, k) => k !== c));
      if (IGUALAR) {
        // Alarga la falsa más larga con una coletilla neutra (no puede volverla verdadera) hasta superar a la correcta.
        const k = ls.indexOf(mw), op = nq.opciones[k], gap = ls[c] - mw;
        const suf = COLETILLAS.find(x => x.length >= gap);
        if (suf && op.trim().split(/\s+/).length >= 4 && !/[:?]$/.test(op)) {
          nq.opciones[k] = op.replace(/\.?\s*$/, '') + suf + (/\.\s*$/.test(op) ? '.' : '');
          cambio = true; inf.igualadas = (inf.igualadas || []).concat([[q.id, k]]);
        } else inf.larga.push([q.id, ls[c], mw]);
      } else inf.larga.push([q.id, ls[c], mw]);
    }
  }
  const fp = fmtProblemas(o); if (fp.length) inf.fmt.push([q.id, fp.join(', ')]);
  if (cambio) ops.push({ a: o.a, b: o.b, nuevo: JSON.stringify(nq), motivo: 'restos ' + q.id });
}
for (const i of borrar) ops.push({ a: todas[i].a, b: todas[i].b, nuevo: null, motivo: 'dup ' + todas[i].q.id });

// informe
const res = k => inf[k].length;
console.log(`preguntas: ${inf.total} (oficiales ${inf.oficiales}, IA ${inf.ia})`);
console.log(`(a) IA repetidas a borrar: ${res('dup')} | oficiales repetidas entre sí (NO se tocan): ${res('dupOfOf')}`);
console.log(`(b) restos de importación: ${res('restos')} (a limpiar: ${ops.filter(o => o.nuevo).length})`);
console.log(`(c) IA con la correcta la más larga: ${res('larga')}`);
console.log(`(d) explicaciones con formato dudoso: ${res('fmt')}`);
const porMotivo = {}; inf.fmt.forEach(([, m]) => m.split(', ').forEach(x => porMotivo[x] = (porMotivo[x] || 0) + 1)); console.log(porMotivo);
if (process.env.DEBUG_RESTOS) { for (const o of todas) for (const c of ['pregunta', 'explicacion', 'apartado']) { const m = RESTOS.exec(o.q[c] || ''); if (m) console.log(o.q.id, c, '|', JSON.stringify((o.q[c]).slice(Math.max(0, m.index - 40), m.index + 130)), '| fin:', JSON.stringify(o.q[c].slice(-30))); } }
if (process.env.DEBUG_RESTOS) process.exit(0);
if (process.env.DEBUG_ID) for (const o of todas) if (process.env.DEBUG_ID.split(',').includes(o.q.id)) console.log(JSON.stringify(o.q).slice(0, 1500));
if (process.env.DEBUG_ORDEN) for (const [id, m] of inf.fmt) if (/orden|sin ex-resp|letra/.test(m)) console.log(id, m);
if (!APLICAR) { fs.writeFileSync(path.join(__dirname, '_tmp', 'revision-banco.json'), JSON.stringify(inf)); process.exit(0); }

// aplicar (de atrás hacia delante para no mover posiciones)
ops.sort((x, y) => y.a - x.a);
for (const o of ops) {
  if (o.nuevo != null) s = s.slice(0, o.a) + o.nuevo + s.slice(o.b);
  else { let a = o.a, b = o.b; if (s[b] === ',') b++; else if (s[a - 1] === ',') a--; s = s.slice(0, a) + s.slice(b); }
}
// Las IA borradas pueden seguir en el localStorage del usuario: purga por tema (como las «purga IA tema N» existentes).
const temasBorrados = [...new Set([...borrar].map(i => todas[i].tema))];
const faltan = temasBorrados.filter(t => !s.includes('/* purga IA tema ' + t + ' */'));
if (faltan.length) {
  const ult = s.lastIndexOf(',seed)})();');
  const fin2 = s.indexOf('})();', ult) + 5;
  const code = faltan.map(t => `(function(){/* purga IA tema ${t} */const S=window.__seedIdsIA||{};const P=(state.preguntasIA||{})[${t}];if(!P)return;const n=P.length;state.preguntasIA[${t}]=P.filter(q=>!(q&&/^${t}-ia-\\d+$/.test(q.id)&&!S[q.id]));state.preguntasIA[${t}].length!==n&&saveState()})();`).join('');
  s = s.slice(0, fin2) + code + s.slice(fin2);
  console.log('purgas añadidas para temas', faltan.join(','));
}
fs.writeFileSync(FILE, s);
console.log('aplicadas', ops.length, 'operaciones');
fs.writeFileSync(path.join(__dirname, '_tmp', 'revision-banco.json'), JSON.stringify(inf));
// informe
const lst = (arr, f) => arr.length ? arr.map(f).join(', ') : '—';
const md = `# Revisión automática del banco de test-oficial-conocimiento.html

Script: \`prompts/herramientas/revisar-banco.js\` (\`node prompts/herramientas/revisar-banco.js\` = informe; \`--aplicar\` = corrige).

Preguntas revisadas: **${inf.total}** (${inf.oficiales} oficiales + ${inf.ia} IA).

## (a) Repetidas (mismo tema, mismo enunciado y misma respuesta)
- IA repetidas **borradas**: ${inf.dup.length} (si había oficial igual queda la oficial; entre dos IA queda la primera).
  - ${lst(inf.dup, d => d[0] + ' (= ' + d[1] + ')')}
- Oficiales repetidas entre sí: **${inf.dupOfOf.length}** pares. **No se borran** (regla: las oficiales no se borran); el test ya descarta las repetidas al montarse. Lista en \`prompts/herramientas/_tmp/revision-banco.json\` (clave \`dupOfOf\`).

## (b) Restos de importación («TEST n», «He analizado las imágenes…»)
- Corregidos: **${ops.filter(o => o.nuevo).length}** preguntas (se corta la cola basura de la explicación y se quitan etiquetas sueltas del enunciado).
  - ${lst(inf.restos, r => r[0] + '·' + r[1])}

## (c) IA cuya correcta es la opción más larga
- Igualadas automáticamente: **${(inf.igualadas||[]).length}**. Pendientes de revisión manual: **${inf.larga.length}** (la correcta es estrictamente la más larga).
- Con \`--igualar-largas\` se alarga la falsa más larga con una coletilla neutra (solo falsas; nunca la correcta). Quedan listadas las que no se pueden tratar por script (opciones de una palabra o enunciados con hueco). Lista [id, longitud correcta, longitud máxima de las falsas] en \`_tmp/revision-banco.json\` (clave \`larga\`) y abajo:
  - ${lst(inf.larga, l => l[0] + ' (' + l[1] + '/' + l[2] + ')')}

## (d) Explicaciones fuera del formato fijo
- Casos con problema estructural: **${inf.fmt.length}** (guardados tal cual; la app los ordena y completa en ejecución con \`normalizarExplicacion\` y \`citas-preguntas.js\`).
${Object.entries(porMotivo).map(([k, v]) => '  - ' + k + ': ' + v).join('\n')}
- No se reescriben en masa por script: el literal del temario y el localizador de artículo exigen verificación manual (T19–T27 y preguntas sin sitio en el esquema).
`;
fs.writeFileSync(path.join(__dirname, '..', '..', 'documentacion', 'REVISION-BANCO.md'), md);
console.log('informe escrito');
