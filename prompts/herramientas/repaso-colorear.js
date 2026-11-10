// Colorea con el código del Método Prefortia las <mark> sin clase de un repaso en HTML (repaso-tN-borrador.html).
// Uso:  node prompts/herramientas/repaso-colorear.js repaso-t2-borrador.html
// Clases:  d naranja = palabras destacables · a verde = autoridades y órganos · p azul = plazos, cifras y mayorías
//          c morado = acciones · y amarillo = personalizado (nota del usuario) · k subrayado rojo = palabras clave (no, podrá, deberá…)
// Es una primera pasada por reglas: una <mark> que ya lleva clase NO se toca (para corregir a mano basta ponérsela).
const fs = require('fs');
const f = process.argv[2]; if (!f) { console.log('Uso: node prompts/herramientas/repaso-colorear.js archivo.html'); process.exit(1); }
let s = fs.readFileSync(f, 'utf8');
const norm = t => t.replace(/<[^>]+>/g, '').toLowerCase().trim();
const K = /^(no|sin|«?podrá»?|«?adoptará»?|deberá|obligatoria?|obligatoria en todo caso|simultáneamente|o bien|al menos|únicamente|solo|salvo|excepto|no es necesario|no podrá|no incluye|no revelarán|no hay resolución expresa|no se tiene en cuenta|sin excepción alguna|sin dilación|sin dilación excesiva y sin excepción alguna|en ningún caso|queda prohibida|podrán ejecutarla|podrá notificarlo al estado del pabellón|podrá acordar la suspensión|podrá prohibir o limitar|libres|libre consentimiento|no revocación|no es posible o dificulta la investigación|no constituyan|no lo extradita|no lo extradita por ser nacional|no proceda a su extradición|no podrá ser denegada|a sabiendas|sabiendo|con independencia de su cuantía|no\b.*)$/;
const KW = /(^|\s)(no|sin|salvo|excepto|podrá|deberá|obligatori|únicamente|solo\b|en ningún caso|queda prohibida|libre consentimiento|a sabiendas|sabiendo)/;
const P = /(\d|años?\b|meses|mes siguiente|días?\b|trigésimo|nonagésimo|cuadragésimo|primer día|\bun año\b|\btres\b|\bcuatro\b|\bcinco\b|\bdiez\b|\bdos años|cuarto|mitad|\btanto\b|duplo|triple|quíntuplo|dos tercios|mayoría|unanim|semestral|más de un estado|más de 6|más del|igual o superior|superior a|mayor de|\bmayor\b|periodicidad|inmediatamente|a más tardar)/;
const A = /(ministerio|ministro|ministra|banco de españa|consejo de ministros|consejo de europa|consejo de administración|secretar|comisión|comité|servicio ejecutivo|dirección general|^dg\b|\bdg\b|gobierno|naciones unidas|autoridad|órgano|organismos|entidades|intermediarios|empresas de servicios|gestoras|sociedades gestoras|auditores|notarios|casinos|operadores de juego|experto externo|estado del pabellón|estado requirente|estado requerido|comunidad europea|signatarios|fiscal|tesoro|director|presidente|boe|apátrida|nacionales|tribunal|profesiones colegiadas|titular de la actividad|sociedad dominante|ministerio de justicia|miembros del consejo)/;
const C = /^(facilitar|quedan obligadas a facilitar|remitir|remitir la solicitud|presentar la orden|presentar|difusión|incitar|mensajes con la intención de incitar|incitar a otra persona|dar instrucciones|informa|notifica|comunicar|tipificar|someter|mantener|conserv|identificarán|identifican|comprueban|aplicar|ampliar|invita|aceptación|aprueba|dictar|se faculta|designa|eliminarán|instruye|incoar|convoca|obtienen, conservan y actualizan|examinarán|abstendrán|comunicarán|reseñando por escrito|notificarlo|pedirle que confirme la matrícula|solicitarle autorización|visitar|registrarlo|adoptar medidas|captación|conversión o transferencia|ocultación o disimulación|intensificar y canalizar|impulso y coordinación|verifica|autoridad competente verifica|promover|prevenir y combatir|proteger y ayudar|expide|remit|someter el asunto|proporciona|difusión)/;
const Y = /^(la única que «podrá»)$/;
const cls = t => {
  const x = norm(t);
  if (Y.test(x)) return 'y';
  if (/^(«?podrá»?|«?adoptará»?)$/.test(x) || KW.test(x) && x.split(/\s+/).length <= 4 && !P.test(x) && !A.test(x)) return 'k';
  if (P.test(x) && !A.test(x)) return 'p';
  if (A.test(x)) return 'a';
  if (C.test(x)) return 'c';
  return 'd';
};
let n = 0; const cuenta = {};
s = s.replace(/<mark>([\s\S]*?)<\/mark>/g, (m, t) => { const c = cls(t); n++; cuenta[c] = (cuenta[c] || 0) + 1; return '<mark class="' + c + '">' + t + '</mark>'; });
// Correcciones a mano (texto exacto de la marca -> clase). Se aplican siempre, también sobre marcas que ya tenían clase.
const OVERRIDES = {
  d: ['residentes o no residentes','residentes y no residentes','no miembros que participaron','penal o no penal','personas físicas no residentes','nombre del fabricante','nombre y ubicación','sin autorización previa','sin solicitar autorización','proporcionalidad','aceptación','conservación de documentos','cooperación entre las autoridades nacionales','penal, civil o administrativa','autorización administrativa previa','autorización administrativa','uno de sus nacionales','nacionales','nacional o un apátrida','apátrida con residencia habitual','cargo de administración o dirección','5 a 7 y 9','ocasionales o muy limitadas','más de un Estado'],
  k: ['no proceda a su extradición','no excedan de un umbral cuantitativo','no es posible o dificulta la investigación','no lo extradita por ser nacional','consentimiento de la víctima no se tiene en cuenta'],
};
const SPLIT = { // marca completa -> html de sustitución (palabra clave roja + el resto con su color)
  'podrá prohibir o limitar': '<mark class="k">podrá</mark> <mark class="c">prohibir o limitar</mark>',
  'podrá acordar la suspensión': '<mark class="k">podrá</mark> <mark class="c">acordar la suspensión</mark>',
  'podrá acordar': '<mark class="k">podrá</mark> <mark class="c">acordar</mark>',
  'podrán ejecutarla': '<mark class="k">podrán</mark> <mark class="c">ejecutarla</mark>',
  'podrá notificarlo al Estado del pabellón': '<mark class="k">podrá</mark> <mark class="c">notificarlo</mark> al <mark class="a">Estado del pabellón</mark>',
  'podrán transmitir, sin previa solicitud': '<mark class="k">podrán</mark> <mark class="c">transmitir</mark>, <mark class="k">sin previa solicitud</mark>',
};
s = s.replace(/<mark class="([a-z])">([\s\S]*?)<\/mark>/g, (m, c, t) => {
  const x = t.replace(/<[^>]+>/g, '').trim();
  if (SPLIT[x]) return SPLIT[x];
  for (const k of Object.keys(OVERRIDES)) if (OVERRIDES[k].includes(x)) return '<mark class="' + k + '">' + t + '</mark>';
  return m;
});
fs.writeFileSync(f, s);
console.log(n + ' marcas coloreadas', cuenta);
