// Tema 6 · marcas a mano del temario escaneado (08-08-2026) leídas página a página (marcas-t6.txt):
//   data-ex="EXOF,EX,*" en el PÁRRAFO marcado · data-r="R5" en el apartado de cada ficha RECUERDA · bloque T6.rec con R1-R28.
//   Si el apartado marcado no estaba en el esquema, se añade con el texto LITERAL (prompts/temario-limpio/tema6) en su sitio;
//   si faltaba el artículo entero, se crea su ficha. Quita los sellos EX automáticos por ficha. Idempotente.
// Uso: node prompts/herramientas/tema6/marcas-t6.js [--dry]
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html');
const DRY = process.argv.includes('--dry');
const clave = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const limpia = t => t.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const NOM = { bis: 'bis', ter: 'ter', quater: 'quáter', quinquies: 'quinquies', sexies: 'sexies' };

// ---------- texto limpio: artículos y sus párrafos (uno por línea)
function fuente(f) {
  const lineas = fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', 'tema6', f + '.txt'), 'utf8').replace(/\r/g, '').split('\n');
  const arts = []; let cur = null;
  for (let l of lineas) {
    l = l.trim(); if (!l) continue;
    const m = l.match(/^(Artículo (\d+(?: (?:bis|ter|quáter|quinquies|sexies))?)|Disposición (?:adicional|transitoria|derogatoria|final) [a-zéáíóú]+)\.\s*(.*)$/);
    if (m) { cur = { id: m[2] || m[1], cab: m[1], titulo: m[3].replace(/\.$/, ''), us: [] }; arts.push(cur); continue; }
    if (!cur) continue;
    if (cur.us.length === 0 && !/^(\d+|[a-z])[.)]\s/.test(l) && cur.titulo && !/\.$/.test(cur.titulo) && /^[a-záéíóú]/.test(l)) { cur.titulo += ' ' + l.replace(/\.$/, ''); continue; }
    cur.us.push(l);
  }
  // apartado / letra de cada párrafo
  arts.forEach(a => { let ap = ''; a.u = a.us.map(t => { let m; if ((m = t.match(/^(\d+(?: bis)?)\.\s/))) ap = m[1]; const letra = (m = t.match(/^([a-z])\)\s/)) ? m[1] : ''; return { t, ap, letra, k: clave(t) }; }); });
  return arts;
}
const SRC = { LO: fuente('lo4'), L12: fuente('l12') };

// ---------- marcas leídas
const MARCAS = [];
for (const l of fs.readFileSync(path.join(__dirname, 'marcas-t6.txt'), 'utf8').split('\n')) {
  if (!/^p\d+:/.test(l)) continue;
  for (const m of l.slice(l.indexOf(':') + 1).matchAll(/(L12 )?([\w.]*)(?:~"([^"]+)")?:(EXOF|EX|\*|R\d+)/g)) MARCAS.push({ norma: m[1] ? 'L12' : 'LO', spec: m[2], txt: m[3], tipo: m[4], linea: l.slice(0, 5) });
}
// R1-R28 (fichas RECUERDA de las últimas páginas): norma, enunciado, respuesta, texto que localiza su apartado
const RS = [
  ['R1', 'LO', 'De conformidad con lo previsto en el artículo 149.1.2.ª de la Constitución, la definición, planificación, regulación y desarrollo de la política de inmigración, sin perjuicio de las competencias que puedan ser asumidas por las Comunidades Autónomas y por las Entidades Locales corresponde:', 'al Gobierno.', 'Corresponde al Gobierno, de conformidad'],
  ['R2', 'LO', 'Los extranjeros residentes en España podrán ser titulares del derecho de sufragio, en:', 'las elecciones municipales, en los términos establecidos en la Constitución, en los tratados internacionales, en su caso, y en la Ley.', 'podrán ser titulares del derecho de sufragio'],
  ['R3', 'LO', 'Tienen el derecho y el deber a la educación, que incluye el acceso a una enseñanza básica, gratuita y obligatoria:', 'los extranjeros menores de dieciséis años.', 'menores de dieciséis años tienen el derecho y el deber'],
  ['R4', 'LO', 'Los extranjeros residentes tienen derecho a acceder a las prestaciones y servicios de la Seguridad Social:', 'en las mismas condiciones que los españoles.', 'Los extranjeros residentes tienen derecho a acceder a las prestaciones y servicios de la Seguridad Social'],
  ['R5', 'LO', 'Informarán sobre la adecuación de la vivienda a los efectos de reagrupación familiar:', 'las Comunidades Autónomas o, en su caso, los Ayuntamientos.', 'adecuación de la vivienda a los efectos de reagrupación'],
  ['R6', 'LO', 'El visado se solicitará y expedirá en:', 'las Misiones Diplomáticas y Oficinas Consulares de España, salvo en los supuestos excepcionales que se contemplen reglamentariamente o en los supuestos en los que el Estado español, de acuerdo con la normativa comunitaria sobre la materia, haya acordado su representación con otro Estado miembro de la Unión Europea en materia de visados de tránsito o estancia.', 'El visado se solicitará y expedirá en las Misiones'],
  ['R7', 'LO', 'Excepcionalmente podrá prohibir la salida del territorio español por razones de seguridad nacional o de salud pública:', 'el Ministro del Interior.', 'Excepcionalmente, el Ministro del Interior podrá prohibir'],
  ['R8', 'LO', 'Los extranjeros podrán encontrarse en España en las situaciones de:', 'estancia o residencia.', 'Los extranjeros podrán encontrarse en España en las situaciones de estancia o residencia'],
  ['R9', 'LO', 'Promoverá el establecimiento de Acuerdos de colaboración con los países de origen que contemplen, integradamente, la prevención de la inmigración irregular, la protección y el retorno de los menores no acompañados:', 'el Gobierno.', 'El Gobierno promoverá el establecimiento de Acuerdos de colaboración'],
  ['R10', 'LO', 'Podrán establecer acuerdos con los países de origen dirigidos a procurar que la atención e integración social de los menores se realice en su entorno de procedencia:', 'las Comunidades Autónomas.', 'Las Comunidades Autónomas podrán establecer acuerdos con los países de origen'],
  ['R11', 'LO', 'La autorización inicial de residencia y trabajo por cuenta propia se limitará a:', 'un ámbito geográfico no superior al de una Comunidad Autónoma, y a un sector de actividad.', 'La autorización inicial de residencia y trabajo por cuenta propia'],
  ['R12', 'LO', 'Los profesionales altamente cualificados según este artículo obtendrán una autorización de residencia y trabajo documentada con:', 'una tarjeta azul de la UE.', 'tarjeta azul de la UE'],
  ['R13', 'LO', 'Los importes de las tasas por tramitación de la solicitud de visado se adecuarán a la revisión que proceda por aplicación del derecho comunitario. Se acomodarán, asimismo, al importe que pueda establecerse por aplicación del principio de:', 'reciprocidad.', 'Los importes de las tasas por tramitación de la solicitud de visado'],
  ['R14', 'LO', 'Para la graduación de las sanciones, el órgano competente en imponerlas se ajustará a:', 'criterios de proporcionalidad, valorando el grado de culpabilidad y, en su caso, el daño producido o el riesgo derivado de la infracción y su trascendencia.', 'Para la graduación de las sanciones'],
  ['R15', 'LO', 'Para la determinación de la cuantía de la sanción se tendrá especialmente en cuenta:', 'la capacidad económica del infractor.', 'Para la determinación de la cuantía de la sanción'],
  ['R16', 'LO', 'En ningún caso podrán imponerse conjuntamente las sanciones de:', 'expulsión y multa.', 'En ningún caso podrán imponerse conjuntamente'],
  ['R17', 'LO', 'La expulsión no podrá ser ejecutada cuando ésta conculcase el principio de:', 'no devolución, o afecte a las mujeres embarazadas, cuando la medida pueda suponer un riesgo para la gestación o la salud de la madre.', 'La expulsión no podrá ser ejecutada cuando'],
  ['R18', 'LO', 'La detención de un extranjero a efectos de proceder al regreso a consecuencia de la denegación de entrada será comunicada:', 'al Ministerio de Asuntos Exteriores y a la embajada o consulado de su país.', 'La detención de un extranjero a efectos de proceder al regreso'],
  ['R19', 'LO', 'El internamiento se mantendrá:', 'por el tiempo imprescindible para los fines del expediente, siendo su duración máxima de 60 días, y sin que pueda acordarse un nuevo internamiento por cualquiera de las causas previstas en un mismo expediente.', 'El internamiento se mantendrá por el tiempo imprescindible'],
  ['R20', 'LO', 'La resolución en que se adopte la expulsión tramitada mediante el procedimiento ordinario incluirá un plazo de cumplimiento voluntario para que el interesado abandone el territorio nacional. La duración de dicho plazo oscilará entre:', 'siete y treinta días y comenzará a contar desde el momento de la notificación de la citada resolución.', 'La resolución en que se adopte la expulsión tramitada mediante el procedimiento ordinario'],
  ['R21', 'LO', 'Es el órgano colegiado adscrito al Ministerio competente en materia de inmigración, de la que forman parte las organizaciones sindicales y empresariales más representativas:', 'la Comisión Laboral Tripartita de Inmigración.', 'La Comisión Laboral Tripartita de Inmigración es el órgano colegiado'],
  ['R22', 'L12', 'En la valoración acerca de si la persona solicitante tiene fundados temores a ser perseguida será indiferente:', 'el hecho de que posea realmente la característica racial, religiosa, nacional, social o política que suscita la persecución, a condición de que el agente de persecución se la atribuya.', 'En la valoración acerca de si la persona solicitante tiene fundados temores'],
  ['R23', 'L12', 'El derecho de asilo se denegará a las personas que constituyan, por razones fundadas, un peligro para la seguridad de España; y las personas que, habiendo sido objeto de una condena firme por delito grave constituyan una amenaza para la comunidad:', 'en todo caso.', 'En todo caso, el derecho de asilo se denegará'],
  ['R24', 'L12', 'El Estado, o los partidos u organizaciones, incluidas las organizaciones internacionales, que controlen el Estado o una parte considerable de su territorio:', 'podrán proporcionar protección.', 'Podrán proporcionar protección'],
  ['R25', 'L12', 'La Oficina de Asilo y Refugio es el órgano competente para la tramitación de las solicitudes de protección internacional, sin perjuicio de las demás funciones que reglamentariamente se le atribuyan:', 'dependiente del Ministerio del Interior.', 'La Oficina de Asilo y Refugio, dependiente del Ministerio del Interior'],
  ['R26', 'L12', 'Las resoluciones previstas en la presente Ley pondrán fin a la vía administrativa, salvo en el caso de que se haya presentado la petición de reexamen prevista en el apartado cuarto del artículo 21, en que se entenderá que pone fin a la vía administrativa la resolución que decida dicha petición, y serán susceptibles de:', 'recurso de reposición con carácter potestativo y de recurso ante la jurisdicción contencioso-administrativa.', 'Las resoluciones previstas en la presente Ley pondrán fin a la vía administrativa, salvo'],
  ['R27', 'L12', 'Será convocado a las sesiones de la Comisión Interministerial de Asilo y Refugio:', 'el representante en España del ACNUR.', 'El representante en España del ACNUR será convocado'],
  ['R28', 'L12', 'Los menores no acompañados solicitantes de protección internacional serán remitidos a los servicios competentes en materia de protección de menores y el hecho se pondrá en conocimiento:', 'del Ministerio Fiscal.', 'Los menores no acompañados solicitantes de protección internacional serán remitidos'],
];

// ---------- localizar el párrafo del texto limpio (artículo + índice)
function artId(spec) { const m = spec.match(/^(\d+)([a-z]+)?/); if (!m) return null; const suf = m[2] && NOM[m[2].replace(/[a-z]$/, '') ] ? null : null; return m; }
function busca(norma, spec, txt) {
  const arts = SRC[norma];
  if (txt) { const k = clave(txt); for (const a of arts) { const i = a.u.findIndex(u => u.k.includes(k)); if (i >= 0) return { a, i }; } return null; }
  const m = spec.match(/^(\d+)(bis|ter|quater|quinquies|sexies)?(?:\.(\d+))?([a-z])?$/); if (!m) return null;
  const id = m[1] + (m[2] ? ' ' + NOM[m[2]] : ''); const a = arts.find(x => x.id === id); if (!a) return null;
  const [, , , ap, letra] = m;
  let i = -1;
  if (letra) i = a.u.findIndex(u => u.letra === letra && (!ap || u.ap === ap));
  else if (ap) i = a.u.findIndex(u => u.ap === ap && !u.letra);
  else i = 0;
  return i < 0 ? null : { a, i };
}
const sitios = [], fallos = [];
for (const x of MARCAS) { if (/^R/.test(x.tipo)) continue; const r = busca(x.norma, x.spec, x.txt); if (!r) fallos.push(`${x.linea} ${x.norma} ${x.spec}${x.txt ? '~' + x.txt : ''}:${x.tipo}`); else sitios.push({ ...r, norma: x.norma, tipo: x.tipo }); }
for (const r of RS) { const x = busca(r[1], '', r[4]); if (!x) fallos.push('R ' + r[0]); else sitios.push({ ...x, norma: r[1], tipo: r[0] }); }
console.log(`marcas: ${MARCAS.filter(m => !/^R/.test(m.tipo)).length} · situadas ${sitios.length} (con R) · no encontradas: ${fallos.join(' | ') || 'ninguna'}`);

// ---------- esquema: fichas de cada norma
const L = require(process.env.TEMP + '/t6lib.js');
let s = fs.readFileSync(F, 'utf8');
const BLOQ = { LO: 'T6_LO', L12: 'T6_L12' };
const ORD = { EXOF: 0, EX: 1, '*': 2 };
let nAttr = 0, nPar = 0, nArt = 0;
for (const norma of ['LO', 'L12']) {
  let h = L.get(s, BLOQ[norma]).html;
  h = h.replace(/<div class="sello-examen">EX<\/div>/g, '');
  const mis = sitios.filter(x => x.norma === norma);
  const porArt = new Map(); mis.forEach(x => { if (!porArt.has(x.a)) porArt.set(x.a, new Map()); const m = porArt.get(x.a); if (!m.has(x.i)) m.set(x.i, new Set()); m.get(x.i).add(x.tipo); });
  const cabDe = a => (a.cab.startsWith('Artículo') ? a.cab : a.cab) + ' — ';
  for (const [a, marcasArt] of porArt) {
    // ficha del artículo en el esquema
    const reCab = new RegExp('<div class="articulo"><div class="articulo-head">' + a.cab.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ' — ');
    let ini = h.search(reCab);
    if (ini < 0) {
      // crear la ficha delante de la siguiente que exista (por orden del texto limpio)
      const arts = SRC[norma]; const pos = arts.indexOf(a); let antes = -1;
      for (let n = pos + 1; n < arts.length && antes < 0; n++) antes = h.search(new RegExp('<div class="articulo"><div class="articulo-head">' + arts[n].cab.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ' — '));
      const tit = a.titulo.charAt(0).toUpperCase() + a.titulo.slice(1);
      const ficha = `<div class="articulo"><div class="articulo-head">${a.cab} — ${esc(tit)}</div><div class="articulo-body"><div class="txt"></div></div></div>`;
      if (antes < 0) { const fin = h.lastIndexOf('</div></div></div>') + 18; h = h.slice(0, fin) + ficha + h.slice(fin); } else h = h.slice(0, antes) + ficha + h.slice(antes);
      ini = h.search(reCab); nArt++;
    }
    const txtI = h.indexOf('<div class="txt">', ini) + 17, txtF = h.indexOf('</div>', txtI);
    let txt = h.slice(txtI, txtF);
    // cada <p> del esquema → índice del párrafo del texto limpio
    const ps = [...txt.matchAll(/<p([^>]*)>([\s\S]*?)<\/p>/g)].map(m => ({ at: m[1], h: m[2], all: m[0], idx: m.index }));
    let desde = 0;
    ps.forEach(p => { const segs = limpia(p.h).split('(…)').map(clave).filter(x => x.length >= 8); p.u = -1; if (!segs.length) return;
      for (let n = desde; n < a.u.length; n++) { let pos = 0, ok = true; for (const sg of segs) { const j = a.u[n].k.indexOf(sg.slice(0, 60), pos); if (j < 0) { ok = false; break; } pos = j; } if (ok) { p.u = n; desde = n; break; } } });
    // aplicar marcas (de atrás hacia delante para no mover los índices)
    const nuevos = [];
    for (const [i, tipos] of marcasArt) {
      const ex = [...tipos].filter(t => !/^R/.test(t)).sort((x, y) => ORD[x] - ORD[y]), rr = [...tipos].filter(t => /^R/.test(t)).sort((x, y) => +x.slice(1) - +y.slice(1));
      const p = ps.find(q => q.u === i);
      if (p) {
        let at = p.at;
        const pon = (attr, vals) => { if (!vals.length) return; const re = new RegExp(' ' + attr + '="([^"]*)"'); const prev = (at.match(re) || [])[1]; const v = [...new Set([...(prev ? prev.split(',') : []), ...vals])].join(','); at = prev !== undefined ? at.replace(re, ` ${attr}="${v}"`) : at + ` ${attr}="${v}"`; };
        pon('data-ex', ex); pon('data-r', rr);
        if (at !== p.at) { p.nuevo = '<p' + at + '>' + p.h + '</p>'; nAttr++; }
      } else {
        const u = a.u[i]; const m = u.t.match(/^(\d+(?: bis)?\.|[a-z]\))\s+(.*)$/);
        const cuerpo = m ? `<b>${m[1]}</b> ${esc(m[2])}` : esc(u.t);
        const at = (m && /\)$/.test(m[1]) ? ' style="margin-left:18px"' : '') + (ex.length ? ` data-ex="${ex.join(',')}"` : '') + (rr.length ? ` data-r="${rr.join(',')}"` : '');
        nuevos.push({ i, html: `<p${at}>${cuerpo}</p>` }); nPar++;
      }
    }
    // reconstruir el txt: los existentes (con sus cambios) y los nuevos en su orden
    let out = '', cursor = 0; const items = ps.map(p => ({ p, i: p.u }));
    nuevos.sort((x, y) => x.i - y.i);
    let k = 0;
    for (const it of items) {
      while (k < nuevos.length && it.i >= 0 && nuevos[k].i < it.i) { out += txt.slice(cursor, it.p.idx); cursor = it.p.idx; out += nuevos[k++].html; }
      out += txt.slice(cursor, it.p.idx) + (it.p.nuevo || it.p.all); cursor = it.p.idx + it.p.all.length;
    }
    out += txt.slice(cursor); while (k < nuevos.length) out += nuevos[k++].html;
    h = h.slice(0, txtI) + out + h.slice(txtF);
  }
  s = L.put(s, BLOQ[norma], h);
}
console.log(`párrafos marcados: ${nAttr} · párrafos añadidos: ${nPar} · fichas nuevas: ${nArt}`);

// ---------- bloque RECUERDA R1-R28
const card = r => `<p data-r="${r[0]}"><b>${r[0]}</b> · <i>${r[1] === 'LO' ? 'LO 4/2000' : 'Ley 12/2009'}.</i> ${esc(r[2])} <b>→</b> <mark class="m-resp">${esc(r[3])}</mark></p>`;
const grupo = (tit, rs) => `<div class="articulo"><div class="articulo-head">RECUERDA del temario · ${tit}</div><div class="articulo-body"><div class="txt">${rs.map(card).join('')}</div></div></div>`;
const rec = '<div class="bloque-titulo">RECUERDA DEL TEMARIO — fichas R1 a R28 (pregunta → respuesta), tal como vienen en las últimas páginas de tu temario</div>'
  + grupo('LO 4/2000 de extranjería — R1 a R21', RS.filter(r => r[1] === 'LO')) + grupo('Ley 12/2009 de asilo — R22 a R28', RS.filter(r => r[1] === 'L12'));
const recLinea = '/* T6_REC */ T6.rec = ' + JSON.stringify(rec) + ';';
if (s.includes('/* T6_REC */')) { const i = s.indexOf('/* T6_REC */'); s = s.slice(0, i) + recLinea + s.slice(s.indexOf('\n', i)); }
else { const i = s.indexOf('/* T6_RECUERDA + ensamblaje */'); s = s.slice(0, i) + recLinea + '\n' + s.slice(i); }
s = s.replace('    + T6.lo + T6.l12\n', '    + T6.lo + T6.l12 + T6.rec\n');
if (!DRY) fs.writeFileSync(F, s);
console.log('bloque T6.rec:', s.includes('+ T6.lo + T6.l12 + T6.rec'), DRY ? '(dry, sin escribir)' : 'escrito');
