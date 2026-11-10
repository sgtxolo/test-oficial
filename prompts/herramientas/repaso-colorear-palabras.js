// Colorea PALABRA POR PALABRA (código del Método Prefortia) el texto de un repaso en HTML.
// Uso como librería:  const { colorea } = require('./repaso-colorear-palabras.js');  html = colorea(html);
// Quita las <mark> que ya hubiera en el texto corriente y vuelve a colorear. No toca lo que va en <b>, <h3>, <small> ni en las etiquetas (span.b).
// Clases: y amarillo = contenido general · d naranja = conceptos/categorías · a verde = autoridades y órganos · p azul = plazos, cifras, mayorías
//         c morado = acciones · k subrayado rojo = palabras clave (no, sin, podrá, deberá, salvo…)
// Es una pasada por léxicos (listas de abajo): revisar el resultado y ajustar las listas, no el HTML a mano.
const norm = w => w.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const set = s => new Set(s.split(/\s+/).filter(Boolean).map(norm));

const STOP = set('de del la las el los lo y e o u a al en con por que se su sus un una unos unas para como es son ser sea sera seran han ha haya hayan este esta estos estas ese ello sobre entre tras desde hasta ni sino cuando donde cuyo cuya cuyos cuyas le les me nos mas mismo misma mismos mismas tal tales todo toda todos todas cada otro otra otros otras esos esas ante bajo segun durante mediante');
const K = set('no sin salvo excepto podra podran podria deberia debera deberan obligatoria obligatorio simultaneamente unicamente solo siempre nunca ningun ninguna tampoco prohibida prohibido ilegal ilegales intencionadamente imposible exclusivamente');
const ORG_CORE = set('ministerio ministro ministra consejo secretaria secretario comision comite servicio banco gobierno naciones fiscal fiscalia direccion tesoro organo organos autoridad autoridades tribunal parte partes estado estados signatarios notarios registradores auditores entidades intermediarios casinos operadores gestoras sociedades director experto boe comunidad organismos profesiones representante presidente sepblac sujetos obligados');
const ORG_NAME = set('economia industria comercio turismo asuntos economicos transformacion digital justicia interior hacienda ejecutivo europa europea unidas espana permanente general politica financiera empresa apoyo estatuto ministros pabellon requerido requirente inversiones internacional publico publica colegiadas externo nacional nacionales');
const D = set('infraccion infracciones graves leves sancion sanciones sancionador sancionadores multa amonestacion suspension revocacion separacion inhabilitacion decomiso extradicion delito delitos delictivo blanqueo financiacion terrorismo terrorista terroristas diligencia debida titular real titularidad control prescripcion prescribiran graduacion reserva enmienda enmiendas denuncia adhesion competencia jurisdiccion inversiones inversion liberalizacion salvaguardia tentativa complice trata trafico migrantes fabricacion marcacion desactivacion registro registros fichero abstencion examen comunicacion colaboracion asistencia victimas testigos requerimiento secreto incoacion sobreseimiento procedimiento declaracion residentes residente capitales movimientos transacciones autorizacion volumen negocios beneficios contenido economico conservacion informacion identificacion identidad cooperacion extraditar excepcion politica provocacion reclutamiento adiestramiento cuenta consolidada filial matriz sujetos obligados armas fuego piezas componentes municiones corredores licencia');
const C = set('facilitar facilitan remitir remitira adoptara adoptaran adoptar tomara tomaran tomar tipificar someter sometera informar informara informan notificar notificara notificarlo comunicar comunicaran comunicara identificar identificaran identifican comprobar comprobaran comprueban aplicar aplicaran conservar conservaran eliminar eliminaran examinar examinaran abstener abstendran ejecutar ejecutarla solicitar solicitarle pedir pedirle confirme confirmar proporcionar proporcionara proteger ayudar prevenir combatir promover designar designara designaran establecer establecera garantizar garantizara mantener mantendra extradita extraditar entregar trasladar imponer impondra imponerse ampliar retirar modificar denunciar proponer proponerse aprobar aprobara convocar instruir instruye incoar acordar acordara prohibir limitar autorizar obtienen actualizan impulso coordinacion localizar identificacion remiten reseñando seguira presentar presentara invitar invita eliminaran expide verifica difusion incitar incitar instrucciones dar dara asegurar asegurara cometer cometa cometan');

// frases que se colorean enteras (antes de trocear en palabras)
const FRASES = [
  ['p', /(?:(?:más|menos|igual o superior|superior|inferior|máximo|máxima|mínimo|mínima|mín\.|máx\.|hasta|entre|al menos|no inferior|no superior)\s+(?:de\s+|del\s+|a\s+|al\s+)?)?\d[\d.,]*(?:\s+a\s+\d[\d.,]*)?\s*(?:%|€|euros|por ciento|años|año|meses|mes|días|día|millones)(?:\s+(?:más|menos)\s+(?:un|de)\s+\d+\s*(?:%|por ciento))?/gi],
  ['p', /\b(?:un|dos|tres|cuatro|cinco|seis|diez|doce)\s+(?:años?|meses|días?)\b(?:\s+(?:máximo|mínimo|antes|después|siguiente))?/gi],
  ['p', /\b(?:trigésimo|nonagésimo|cuadragésimo|primer)\s+(?:día|instrumento)\b(?:\s+del\s+mes\s+siguiente)?/gi],
  ['p', /\b(?:la mitad|un cuarto|el tanto|el duplo|el triple|el quíntuplo|dos tercios|mayoría de dos tercios|unanimidad|consentimiento unánime|semestralmente|periodicidad|inmediatamente)\b/gi],
  ['d', /\b(?:residentes o no residentes|residentes y no residentes|muy graves|volumen de negocios(?: anual total)?|contenido económico de la operación)\b/gi],
  ['k', /\b(?:o bien|al menos cuatro|sin dilación(?: excesiva)?|sin excepción alguna|en ningún caso|no es necesario|obligatoria en todo caso|no podrá ser denegada)\b/gi],
];

function coloreaTexto(t) {
  // 1) frases
  const marcas = []; // {ini, fin, c}
  FRASES.forEach(([c, re]) => { re.lastIndex = 0; let m; while ((m = re.exec(t))) { if (!m[0].trim()) { re.lastIndex++; continue; } marcas.push({ini: m.index, fin: m.index + m[0].length, c}); } });
  marcas.sort((a, b) => a.ini - b.ini || b.fin - a.fin);
  const libres = []; let pos = 0; const fijas = [];
  marcas.forEach(m => { if (m.ini < pos) return; fijas.push(m); pos = m.fin; });
  // 2) trocear en tokens (palabras y separadores) fuera de las frases
  const toks = []; // {txt, c|null, esPalabra}
  const trocea = (s, off) => { const re = /([A-Za-zÁÉÍÓÚÜÑáéíóúüñ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ\-]*|\d[\d.,]*|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d]+)/g; let m; while ((m = re.exec(s))) toks.push({txt: m[0], pal: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\d]/.test(m[0])}); };
  let cur = 0; fijas.forEach(f => { if (f.ini > cur) trocea(t.slice(cur, f.ini)); toks.push({txt: t.slice(f.ini, f.fin), pal: true, c: f.c, fija: true}); cur = f.fin; });
  if (cur < t.length) trocea(t.slice(cur));
  // 3) clase de cada palabra
  toks.forEach(k => {
    if (k.c || !k.pal) return;
    const n = norm(k.txt);
    if (/^\d/.test(n)) k.c = 'p';
    else if (STOP.has(n)) k.c = null;
    else if (K.has(n)) k.c = 'k';
    else if (ORG_CORE.has(n) || ORG_NAME.has(n)) k.c = 'a?';   // verde provisional
    else if (C.has(n)) k.c = 'c';
    else if (D.has(n)) k.c = 'd';
    else if (n.length <= 2) k.c = null;
    else k.c = 'y';
  });
  // verdes: solo las rachas (con de/del/la/y entre medias) que contengan una palabra núcleo
  const esCore = k => ORG_CORE.has(norm(k.txt));
  for (let i = 0; i < toks.length; i++) {
    if (toks[i].c !== 'a?') continue;
    let j = i, tieneCore = false, ult = i;
    for (; j < toks.length; j++) {
      const k = toks[j];
      if (k.c === 'a?') { if (esCore(k)) tieneCore = true; ult = j; continue; }
      if (!k.pal) { if (/^[\s]+$/.test(k.txt)) continue; break; }
      if (k.c === null && /^(de|del|la|las|el|los|y|e|para)$/.test(norm(k.txt))) continue;
      break;
    }
    for (let q = i; q <= ult; q++) if (toks[q].c === 'a?') toks[q].c = tieneCore ? 'a' : 'y';
    i = ult;
  }
  toks.forEach(k => { if (k.c === 'a?') k.c = 'y'; });
  // 4) unir rachas de la misma clase (se permiten espacios y palabras vacías de relleno entre medias solo si la siguiente tiene la misma clase)
  const out = []; let i = 0;
  while (i < toks.length) {
    const k = toks[i];
    if (!k.pal || !k.c) { out.push(k.txt); i++; continue; }
    let fin = i, j = i + 1;
    while (j < toks.length) {
      const t2 = toks[j];
      if (!t2.pal) { if (/^\s+$/.test(t2.txt)) { j++; continue; } break; }
      if (t2.c === k.c && !t2.fija && !k.fija) { fin = j; j++; continue; }
      if (t2.c === null && k.c !== 'k') { // relleno: continuar solo si la siguiente palabra con clase es igual
        let q = j + 1; while (q < toks.length && (!toks[q].pal && /^\s+$/.test(toks[q].txt))) q++;
        if (q < toks.length && toks[q].pal && toks[q].c === k.c && !toks[q].fija && k.c !== 'p') { j = q; continue; }
      }
      break;
    }
    const txt = toks.slice(i, fin + 1).map(x => x.txt).join('');
    out.push('<mark class="' + k.c + '">' + txt + '</mark>');
    i = fin + 1;
  }
  return out.join('');
}

// recorre el HTML y colorea solo el texto corriente
function colorea(html) {
  html = html.replace(/<mark class="[a-z]">([\s\S]*?)<\/mark>/g, '$1');
  const partes = html.split(/(<[^>]+>)/); let skip = 0, skipSpan = 0; const SK = ['b', 'h3', 'small', 'h1', 'h2', 'mark', 'script', 'style'];
  return partes.map(p => {
    if (p[0] === '<') {
      const m = /^<(\/?)([a-z0-9]+)/i.exec(p);
      if (m && SK.includes(m[2].toLowerCase())) { if (m[1]) skip = Math.max(0, skip - 1); else if (!/\/>$/.test(p)) skip++; }
      if (m && m[2].toLowerCase() === 'span') { if (!m[1] && /class="b /.test(p)) { skip++; skipSpan++; } else if (m[1] && skipSpan) { skip = Math.max(0, skip - 1); skipSpan--; } }
      return p;
    }
    if (skip || !p.trim()) return p;
    return coloreaTexto(p);
  }).join('');
}
module.exports = { colorea, coloreaTexto };
if (require.main === module) {
  const fs = require('fs'); const f = process.argv[2]; if (!f) { console.log('Uso: node repaso-colorear-palabras.js archivo.html'); process.exit(1); }
  fs.writeFileSync(f, colorea(fs.readFileSync(f, 'utf8'))); console.log('coloreado', f);
}
