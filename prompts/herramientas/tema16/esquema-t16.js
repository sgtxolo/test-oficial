// Tema 16 · esquema LITERAL (28/10/2026) a partir del texto oficial limpio (prompts/temario-limpio/tema16/oficial.txt):
//   16.1 LO 3/2007 (Tít. Prel., I, II cap. I y V) · 16.2 RD 247/2024 (preámbulo, Primero/Segundo y Protocolo anexo con Anexos I, II, V y VI) · RECUERDA R1-R14.
// Las marcas a mano (EXAMEN / EXOF / EX / ✱ → data-ex; fichas R → data-r) se colocan en su párrafo desde la lista MARCAS (lectura de tu PDF subrayado, 28/10/2026).
// Deja cada norma como /* T16_X */ T16.x = "…" (una línea) para aplicar-subrayado-pdf.js y el Exprés. Idempotente.
// Uso: node prompts/herramientas/tema16/esquema-t16.js
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), D = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema16');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---- marcas: { f: ficha, m: regex que casa con el principio del párrafo, ex: [...], r: [...] }
// ficha LO: «LO3» = artículo 3; ficha RD: clave de la sección (RDI, RD2.1, RD2.2.1, …)
const MARCAS = [
  { f: 'LO2', m: /^2\./, r: ['R1'] },
  { f: 'LO3', m: /^El principio de igualdad de trato entre mujeres/, ex: ['EXAMEN', 'EXOF', '*'], r: ['R2'] },
  { f: 'LO4', m: /^La igualdad de trato y de oportunidades/, r: ['R3'] },
  { f: 'LO5', m: /^El principio de igualdad de trato y de oportunidades/, ex: ['*'] },
  { f: 'LO5', m: /^No constituirá discriminación/, ex: ['*'] },
  { f: 'LO6', m: /^1\./, ex: ['EXAMEN'], r: ['R4'] }, { f: 'LO6', m: /^2\./, r: ['R5'] },
  { f: 'LO7', m: /^1\./, ex: ['EX', '*'] }, { f: 'LO7', m: /^4\./, ex: ['*'] },
  { f: 'LO8', m: /^Constituye discriminación directa/, ex: ['*'] },
  { f: 'LO9', m: /^También se considerará/, ex: ['*'] },
  { f: 'LO10', m: /^Los actos y las cláusulas/, r: ['R6', 'R7', 'R8'] },
  { f: 'LO11', m: /^1\./, ex: ['*'] },
  { f: 'LO12', m: /^1\./, ex: ['EXAMEN', 'EXOF'] }, { f: 'LO12', m: /^3\./, ex: ['*'], r: ['R9'] },
  { f: 'LO13', m: /^1\./, ex: ['EXAMEN', 'EXOF'], r: ['R10'] }, { f: 'LO13', m: /^2\./, ex: ['EXOF'] },
  { f: 'LO14', m: /^A los fines de esta Ley/, ex: ['EXOF'] }, { f: 'LO14', m: /^3\./, ex: ['*'] },
  { f: 'LO15', m: /^El principio de igualdad de trato y oportunidades/, ex: ['EXOF'] },
  { f: 'LO18', m: /^En los términos que reglamentariamente/, ex: ['EXOF'] },
  { f: 'LO22', m: /^Con el fin de avanzar/, ex: ['*'] },
  { f: 'LO51', m: /^a\)/, ex: ['EXOF'] }, { f: 'LO51', m: /^b\)/, ex: ['*'] }, { f: 'LO51', m: /^g\)/, ex: ['*'] },
  { f: 'LO54', m: /^La Administración General del Estado y los organismos públicos vinculados o dependientes de ella designarán/, ex: ['*'] }, { f: 'LO54', m: /^Asimismo/, ex: ['*'] },
  { f: 'LO55', m: /^La aprobación de convocatorias/, r: ['R11'] },
  { f: 'LO56', m: /^Sin perjuicio de las mejoras/, ex: ['*'] },
  { f: 'LO60', m: /^1\./, ex: ['*'] }, { f: 'LO60', m: /^2\./, ex: ['EXOF'] },
  { f: 'LO61', m: /^1\./, ex: ['*'] },
  { f: 'LO62', m: /^Para la prevención/, ex: ['*'] }, { f: 'LO62', m: /^b\)/, ex: ['*'] },
  { f: 'LO63', m: /^Todos los Departamentos Ministeriales/, ex: ['*'], r: ['R12'] },
  { f: 'LO64', m: /^El Gobierno aprobará/, ex: ['EXOF', '*'], r: ['R13'] },
  { f: 'LO65', m: /^Las normas sobre personal de las Fuerzas Armadas/, ex: ['*'], r: ['R14'] },
  { f: 'LO67', m: /^Las normas reguladoras/, ex: ['*'] },
  { f: 'LO68', m: /^Las normas referidas/, ex: ['*'] },
  { f: 'RDI', m: /^La igualdad entre mujeres y hombres es un principio jurídico universal/, ex: ['EXOF'] },
  { f: 'RD2.2.1', m: /^Evitar las posibles situaciones/, ex: ['EX'] },
  { f: 'RD2.3', m: /^Las garantías de actuación/, ex: ['*'] },
  { f: 'RD2.4', m: /^• Acoso sexual cualquier comportamiento/, ex: ['*'] },
  { f: 'RD2.5.1', m: /^• Declarar formalmente/, ex: ['EXOF'] }, { f: 'RD2.5.1', m: /^Dichos compromisos han de articularse/, ex: ['EX'] }, { f: 'RD2.5.1', m: /^El inicio de estas actuaciones/, ex: ['EX'] },
  { f: 'RDA1', m: /^• Neutralidad/, ex: ['EX'] }, { f: 'RDA1', m: /^• Presunción de inocencia/, ex: ['EX'] }, { f: 'RDA1', m: /^La Dirección General de la Función Pública/, ex: ['*'] },
  { f: 'RDA2', m: /^• Dos personas del departamento/, ex: ['*'] },
  { f: 'RDA5', m: /^• Contacto físico deliberado/, ex: ['*'] }, { f: 'RDA5', m: /^• Cartas o mensajes/, ex: ['*'] },
];
const usadas = new Set();
const attrs = (f, texto) => {
  const ex = [], r = [];
  MARCAS.forEach((mk, i) => { if (mk.f === f && mk.m.test(texto)) { usadas.add(i); (mk.ex || []).forEach(x => !ex.includes(x) && ex.push(x)); (mk.r || []).forEach(x => !r.includes(x) && r.push(x)); } });
  return (ex.length ? ` data-ex="${ex.join(',')}"` : '') + (r.length ? ` data-r="${r.join(',')}"` : '');
};

// ---- limpieza de línea
const limpia = l => l.replace(/ˇ/g, '').replace(/\/%/g, '%').replace(/\s+/g, ' ').trim();
const une = (a, b) => /[a-záéíóúñ]-$/.test(a) && /^[a-záéíóúñ]/.test(b) ? a.slice(0, -1) + b : a + ' ' + b;
const lineas = fs.readFileSync(path.join(D, 'oficial.txt'), 'utf8').replace(/\r/g, '').split('\n');
const iRD = lineas.findIndex(l => /^REAL DECRETO 247\/2024, DE 8 DE MARZO/.test(l));
const loL = lineas.slice(0, iRD), rdL = lineas.slice(iRD);

// ---- LO: fichas por artículo (párrafo nuevo = línea con sangría ≥ 3; continuación = línea sin sangría)
const TITULOS = { '1': 'TÍTULO PRELIMINAR. OBJETO Y ÁMBITO DE LA LEY', '3': 'TÍTULO I. EL PRINCIPIO DE IGUALDAD Y LA TUTELA CONTRA LA DISCRIMINACIÓN', '14': 'TÍTULO II. POLÍTICAS PÚBLICAS PARA LA IGUALDAD · CAPÍTULO I. PRINCIPIOS GENERALES',
  '51': 'TÍTULO V. EL PRINCIPIO DE IGUALDAD EN EL EMPLEO PÚBLICO · CAPÍTULO I. CRITERIOS DE ACTUACIÓN DE LAS ADMINISTRACIONES PÚBLICAS', '52': 'CAPÍTULO II. EL PRINCIPIO DE PRESENCIA EQUILIBRADA EN LA ADMINISTRACIÓN GENERAL DEL ESTADO Y EN LOS ORGANISMOS PÚBLICOS VINCULADOS O DEPENDIENTES DE ELLA',
  '55': 'CAPÍTULO III. MEDIDAS DE IGUALDAD EN EL EMPLEO PARA LA ADMINISTRACIÓN GENERAL DEL ESTADO Y PARA LOS ORGANISMOS PÚBLICOS VINCULADOS O DEPENDIENTES DE ELLA', '65': 'CAPÍTULO IV. FUERZAS ARMADAS', '67': 'CAPÍTULO V. FUERZAS Y CUERPOS DE SEGURIDAD DEL ESTADO' };
function loFichas() {
  let h = `<div class="bloque-titulo">16.1 — LEY ORGÁNICA 3/2007, DE 22 DE MARZO, PARA LA IGUALDAD EFECTIVA DE MUJERES Y HOMBRES (Título Preliminar, Título I, Título II cap. I y Título V)</div>`;
  let abierta = false, art = null, ps = [], saltando = false, titulo = null;
  const cierra = () => {
    if (!abierta) return;
    h += ps.map(p => { const n = p.match(/^(\d+\.|[a-z]\))\s+(.*)$/); const tok = n ? n[1] : '', sg = n ? (/\)$/.test(tok) ? ' style="margin-left:18px"' : '') : '';
      return `<p${sg}${attrs('LO' + art, p)}>${n ? `<b>${esc(tok)}</b> ${esc(n[2])}` : esc(p)}</p>`; }).join('');
    h += '</div></div></div>'; abierta = false; ps = [];
  };
  for (let i = 0; i < loL.length; i++) {
    const raw = loL[i]; if (!raw.trim()) continue;
    if (/^ *(TÍTULO|CAPÍTULO)\b/.test(raw) || /^Título /.test(raw)) { saltando = true; continue; }
    let m = raw.match(/^Artículo (\d+)\. (.*)$/);
    if (m) { saltando = false; cierra(); art = m[1]; let tit = limpia(m[2]);
      while (!/\.$/.test(tit) && i + 1 < loL.length) tit = une(tit, limpia(loL[++i]));
      if (TITULOS[art]) h += `<div class="bloque-titulo">${esc(TITULOS[art])}</div>`;
      h += `<div class="articulo"><div class="articulo-head">Artículo ${art} — ${esc(tit.replace(/\.$/, ''))}</div><div class="articulo-body"><div class="txt">`; abierta = true; continue; }
    if (!abierta || saltando) continue;
    if (/^\s{3,}\S/.test(raw) || !ps.length) ps.push(limpia(raw)); else ps[ps.length - 1] = une(ps[ps.length - 1], limpia(raw));
  }
  cierra(); return h;
}

// ---- RD: preámbulo, dispositiva, Protocolo (anexo) con sus apartados y anexos I, II, V y VI
const FICHAS_RD = [
  ['RDP', /^La Constitución española reconoce como derechos fundamentales/, 'Real Decreto 247/2024 · Preámbulo', 'Real Decreto 247/2024'],
  ['RDD', /^Primero\.$/, 'Real Decreto 247/2024 · Parte dispositiva (Primero y Segundo)'],
  ['RDI', /^I\. Introducción$/, 'Protocolo · I. Introducción', 'Protocolo de actuación (Anexo)'],
  ['RD2.1', /^2\.1 Principios rectores\.$/, 'Protocolo · II. Política de prevención · 2.1 Principios rectores', 'II. POLÍTICA DE PREVENCIÓN FRENTE AL ACOSO SEXUAL Y POR RAZÓN DE SEXO'],
  ['RD2.2.1', /^2\.2\.1 Objetivo general/, 'Protocolo · 2.2 Objetivos · 2.2.1 Objetivo general y objetivos específicos'],
  ['RD2.2.2', /^2\.2\.2 Ámbito de aplicación\.$/, 'Protocolo · 2.2 Objetivos · 2.2.2 Ámbito de aplicación'],
  ['RD2.3', /^2\.3 Garantías de actuación\.$/, 'Protocolo · 2.3 Garantías de actuación'],
  ['RD2.4', /^2\.4 Definiciones\.$/, 'Protocolo · 2.4 Definiciones'],
  ['RD2.5.1', /^2\.5\.1 Compromisos de la Administración/, 'Protocolo · 2.5 Compromisos · 2.5.1 Compromisos de la Administración General del Estado'],
  ['RD2.5.2', /^2\.5\.2 Compromisos de la representación/, 'Protocolo · 2.5 Compromisos · 2.5.2 Compromisos de la representación sindical de las empleadas y empleados públicos'],
  ['RDIII', /^III\. Medidas de prevención/, 'Protocolo · III. Medidas de prevención frente al acoso sexual y acoso por razón de sexo', 'III. MEDIDAS DE PREVENCIÓN'],
  ['RD4.1', /^4\.1 Consideraciones generales\.$/, 'Protocolo · IV. Procedimiento · 4.1 Consideraciones generales', 'IV. PROCEDIMIENTO DE DESARROLLO DE LAS ACTUACIONES'],
  ['RD4.2', /^4\.2 Inicio de las actuaciones\.$/, 'Protocolo · IV. Procedimiento · 4.2 Inicio de las actuaciones'],
  ['RD4.3', /^4\.3 Conclusiones e informe\.$/, 'Protocolo · IV. Procedimiento · 4.3 Conclusiones e informe'],
  ['RD4.4', /^4\.4 Constitución del Comité de Asesoramiento\.$/, 'Protocolo · IV. Procedimiento · 4.4 Constitución del Comité de Asesoramiento'],
  ['RD4.5', /^4\.5 Información\.$/, 'Protocolo · IV. Procedimiento · 4.5 Información'],
  ['RDV', /^V\. Evaluación y seguimiento/, 'Protocolo · V. Evaluación y seguimiento del informe de conclusiones', 'V. EVALUACIÓN Y SEGUIMIENTO · VI. IMPLANTACIÓN'],
  ['RDVI', /^VI\. Implantación del protocolo$/, 'Protocolo · VI. Implantación del protocolo'],
  ['RDA1', /^ANEXO I$/, 'Protocolo · Anexo I. Asesoría confidencial', 'ANEXOS DEL PROTOCOLO'],
  ['RDA2', /^ANEXO II$/, 'Protocolo · Anexo II. Comité de Asesoramiento'],
  ['RDA3', /^ANEXO III$/, 'Protocolo · Anexo III. Modelo de comunicación de activación'],
  ['RDA5', /^ANEXO V$/, 'Protocolo · Anexo V. Situaciones de acoso sexual y por razón de sexo'],
  ['RDA6', /^ANEXO VI$/, 'Protocolo · Anexo VI. Referencias normativas'],
];
function rdFichas() {
  let h = `<div class="bloque-titulo">16.2 — REAL DECRETO 247/2024, DE 8 DE MARZO, POR EL QUE SE APRUEBA EL PROTOCOLO DE ACTUACIÓN FRENTE AL ACOSO SEXUAL Y AL ACOSO POR RAZÓN DE SEXO EN EL ÁMBITO DE LA ADMINISTRACIÓN GENERAL DEL ESTADO Y DE SUS ORGANISMOS PÚBLICOS</div>`;
  // recortar: del preámbulo al final, sin el índice del anexo, sin el modelo/diagrama de los Anexos III y IV
  const L = rdL.map(x => x);
  const ini = L.findIndex(l => /^\s*La Constitución española reconoce como derechos fundamentales/.test(l));
  const iAn = L.findIndex(l => /^\s*ANEXO\s*$/.test(l)), iIntro = L.findIndex((l, i) => i > iAn && /^\s*I\. Introducción\s*$/.test(l));
  let i3 = L.findIndex(l => /^\s*ANEXO III\s*$/.test(l)), i5 = L.findIndex(l => /^\s*ANEXO V\s*$/.test(l));
  const lista = [];
  const empuja = (arr) => arr.forEach(l => lista.push(l));
  empuja(L.slice(ini, iAn)); empuja(L.slice(iIntro, i3)); lista.push('        ANEXO III'); lista.push('              (Modelo de comunicación de activación: formulario con el tipo de acoso, datos personales y profesionales, descripción de los hechos, documentación anexa y solicitud de inicio del Protocolo; los datos son confidenciales, LO 3/2018)'); lista.push('        ANEXO IV'); lista.push('              (Diagrama de actuación: ver el cuadro de las dos fases)'); empuja(L.slice(i5));
  let actual = null, ps = [], bloques = [];
  const abre = ([f, re, cab, tit]) => { actual = { f, cab, tit, ps: [] }; bloques.push(actual); };
  const FIC = FICHAS_RD;
  const sangria = l => l.match(/^ */)[0].length;
  const push = t => { if (actual) actual.ps.push(t); };
  let prevIndent = null;
  for (let i = 0; i < lista.length; i++) {
    const raw = lista[i]; if (!raw.trim()) continue;
    const t = limpia(raw);
    const fi = FIC.find(x => x[1].test(t) && !(x[0] === 'RDP' && bloques.some(b => b.f === 'RDP')));
    if (/^públicos\.$/.test(t)) continue;
    if (fi && !(fi[0] === 'RD2.2.1' && actual && actual.f === 'RD2.2.1') ) { abre(fi); if (fi[0] === 'RDD' || fi[0] === 'RDP') {} else continue; }
    if (!actual) { if (/^La Constitución española/.test(t)) abre(FIC[0]); else continue; }
    if (/^(2\.2 Objetivos\.|a\) Objetivo general\.|b\) Objetivos específicos\.|2\.2\.2|2\.5 Compromisos\.|2\.3|2\.4 |2\.1 |II\. Política|III\. |IV\. |V\. |VI\. |I\. )/.test(t) && !fi) { if (/^(a\) Objetivo general\.|b\) Objetivos específicos\.)$/.test(t)) push('<<' + t + '>>'); continue; }
    if (/^(Jueves 28 de marzo|cve: BOE|A-2024-6273|2024-6273|Asesoría confidencial$|Comité de Asesoramiento$|Modelo de Comunicación de Activación$|Situaciones de acoso sexual y por razón de sexo$|Referencias normativas$)/.test(t)) continue;
    if (/^(DISPONGO:|FELIPE R\.|El Ministro de la Presidencia|FÉLIX BOLAÑOS|Dado en Madrid)/.test(t)) { if (/^DISPONGO/.test(t)) continue; push('<<' + t + '>>'); continue; }
    const prev = actual.ps.length ? actual.ps[actual.ps.length - 1] : '';
    if (/^[–•] ?[a-záéíóú]/.test(t) && /\b(y|o|de)$/.test(prev)) { actual.ps[actual.ps.length - 1] = une(prev, t.replace(/^[–•] ?/, '')); continue; }
    const nuevo = sangria(raw) >= 12 || !actual.ps.length || /^(–|•|\d+\.º|\d+\. |[a-z]\) |[A-Z][a-zé]+ (no verbales|verbales)|Ámbito |Listado|Entre sus|Primero\.|Segundo\.)/.test(t);
    if (nuevo || !actual.ps.length) actual.ps.push(t); else actual.ps[actual.ps.length - 1] = une(actual.ps[actual.ps.length - 1], t);
  }
  const bul = t => t.replace(/^– ?/, '• ').replace(/^• ?/, '• ');
  PIEZAS.cab = h;
  for (const b of bloques) {
    const h0 = h.length;
    h += (b.tit ? `<div class="bloque-titulo">${esc(b.tit)}</div>` : '') + `<div class="articulo"><div class="articulo-head">${esc(b.cab)}</div><div class="articulo-body"><div class="txt">`;
    for (let p of b.ps) {
      if (/^<<.*>>$/.test(p)) { h += `<p><b>${esc(p.slice(2, -2))}</b></p>`; continue; }
      const sub = /^•/.test(p) && /(Desistimiento|Falta de objeto|Cuando de las actuaciones previas|Formación general|Formación específica)/.test(p);
      const q = /^–/.test(p) ? bul(p) : p;
      const mg = /^(•|– )/.test(p) ? ' style="margin-left:18px"' : /^\d+\.º|^[a-z]\) |^[a-z]\.? /.test(p) ? ' style="margin-left:18px"' : '';
      h += `<p${mg}${attrs(b.f, q)}>${esc(q)}</p>`;
    }
    h += '</div></div></div>'; PIEZAS.push([b.f, h.slice(h0)]);
  }
  return h;
}
const PIEZAS = [];
const hLO = loFichas(), hRD = rdFichas();
// grupos del RD: cada uno se alinea con SUS páginas de tu PDF (23-34); el preámbulo, la parte dispositiva y el Anexo VI no están en tu PDF subrayado
const GRUPO = { RDP: 'rdp', RDD: 'rdp', RDI: 'rda', 'RD2.1': 'rdb', 'RD2.2.1': 'rdc', 'RD2.2.2': 'rdc', 'RD2.3': 'rdd', 'RD2.4': 'rdd', 'RD2.5.1': 'rde', 'RD2.5.2': 'rdf', RDIII: 'rdf', 'RD4.1': 'rdg', 'RD4.2': 'rdg',
  'RD4.3': 'rdh', 'RD4.4': 'rdh', 'RD4.5': 'rdh', RDV: 'rdh', RDVI: 'rdh', RDA1: 'rdi', RDA2: 'rdj', RDA3: 'rdj', RDA5: 'rdk', RDA6: 'rdl' };
const GR = {};
PIEZAS.forEach(([f, html]) => { const g = GRUPO[f]; if (!g) throw new Error('ficha sin grupo ' + f); GR[g] = (GR[g] || '') + html; });
GR.rdp = PIEZAS.cab + GR.rdp;
const ORDEN = ['rdp', 'rda', 'rdb', 'rdc', 'rdd', 'rde', 'rdf', 'rdg', 'rdh', 'rdi', 'rdj', 'rdk', 'rdl'];

// ---- fichas R (pregunta → respuesta) tal como vienen en las págs. 65-67 de tu PDF
const R = [
  ['R1', 'Las obligaciones establecidas en esta Ley serán de aplicación a toda persona, física o jurídica, que se encuentre o actúe en territorio español, cualquiera que fuese su:', 'nacionalidad, domicilio o residencia.'],
  ['R2', 'El principio de igualdad de trato entre mujeres y hombres supone la ausencia de toda discriminación, directa o indirecta, por razón de sexo, y, especialmente:', 'las derivadas de la maternidad, la asunción de obligaciones familiares y el estado civil.'],
  ['R3', 'La igualdad de trato y de oportunidades entre mujeres y hombres es un principio:', 'informador del ordenamiento jurídico.'],
  ['R4', 'La situación en que se encuentra una persona que sea, haya sido o pudiera ser tratada, en atención a su sexo, de manera menos favorable que otra en situación comparable:', 'discriminación directa.'],
  ['R5', 'La situación en que una disposición, criterio o práctica aparentemente neutros pone a personas de un sexo en desventaja particular con respecto a personas del otro, salvo que dicha disposición, criterio o práctica puedan justificarse objetivamente en atención a una finalidad legítima y que los medios para alcanzar dicha finalidad sean necesarios y adecuados:', 'discriminación indirecta.'],
  ['R6', 'Los actos y las cláusulas de los negocios jurídicos que constituyan o causen discriminación por razón de sexo se considerarán:', 'nulos y sin efecto.'],
  ['R7', 'Los actos y las cláusulas de los negocios jurídicos que constituyan o causen discriminación por razón de sexo se considerarán nulos y sin efecto, y darán lugar a responsabilidad a través de un sistema de reparaciones o indemnizaciones que sean:', 'reales, efectivas y proporcionadas al perjuicio sufrido.'],
  ['R8', 'Los actos y las cláusulas de los negocios jurídicos que constituyan o causen discriminación por razón de sexo se considerarán nulos y sin efecto, y darán lugar a responsabilidad a través de un sistema de reparaciones o indemnizaciones que sean reales, efectivas y proporcionadas al perjuicio sufrido, así como, en su caso, a través de un sistema:', 'eficaz y disuasorio de sanciones que prevenga la realización de conductas discriminatorias.'],
  ['R9', 'Será la única legitimada en los litigios sobre acoso sexual y acoso por razón de sexo:', 'la persona acosada.'],
  ['R10', 'De acuerdo con las Leyes procesales, en aquellos procedimientos en los que las alegaciones de la parte actora se fundamenten en actuaciones discriminatorias, por razón de sexo, corresponderá probar la ausencia de discriminación en las medidas adoptadas y su proporcionalidad:', 'a la persona demandada.'],
  ['R11', 'La aprobación de convocatorias de pruebas selectivas para el acceso al empleo público deberá acompañarse de un informe de impacto de género, salvo en:', 'casos de urgencia y siempre sin perjuicio de la prohibición de discriminación por razón de sexo.'],
  ['R12', 'Todos los Departamentos Ministeriales y Organismos Públicos remitirán a los Ministerios de Trabajo y Asuntos Sociales y de Administraciones Públicas, información relativa a la aplicación efectiva en cada uno de ellos del principio de igualdad entre mujeres y hombres, con especificación, mediante la desagregación por sexo de los datos, de la distribución de su plantilla, grupo de titulación, nivel de complemento de destino y retribuciones promediadas de su personal:', 'al menos anualmente.'],
  ['R13', 'Aprobará, al inicio de cada legislatura, un Plan para la Igualdad entre mujeres y hombres en la Administración General del Estado y en los organismos públicos vinculados o dependientes de ella:', 'el Gobierno.'],
  ['R14', 'Las normas sobre personal de las Fuerzas Armadas procurarán la efectividad del principio de igualdad entre mujeres y hombres, en especial en lo que se refiere al régimen de:', 'acceso, formación, ascensos, destinos y situaciones administrativas.'],
];
const hREC = `<div class="bloque-titulo">RECUERDA DEL TEMARIO — fichas R1 a R14 (pregunta → respuesta), tal como vienen en las últimas páginas de tu temario</div><div class="articulo"><div class="articulo-head">RECUERDA del temario · LO 3/2007 (R1 a R14)</div><div class="articulo-body"><div class="txt">`
  + R.map(r => `<p data-r="${r[0]}"><b>${r[0]}</b> · <i>Ley Orgánica Igualdad Mujeres y Hombres.</i> ${esc(r[1])} <b>→</b> <mark class="m-resp">${esc(r[2])}</mark></p>`).join('') + '</div></div></div>';

if (process.env.DEBUG) { const txt = x => x.split('</p>').join('\n').split('<div class="articulo-head">').join('\n=== ').replace(/<[^>]+>/g, ''); console.log(txt(process.env.DEBUG === 'LO' ? hLO : hRD)); process.exit(0); }
// ---- insertar en esquemas.html entre /* T16_BEGIN */ y /* T16_END */ (antes de T17_BEGIN)
let s = fs.readFileSync(F, 'utf8');
const bloque = `/* T16_BEGIN */
const T16 = {};
/* T16_LO */ T16.lo = ${JSON.stringify(hLO)};
${ORDEN.map(g => `/* T16_${g.toUpperCase()} */ T16.${g} = ${JSON.stringify(GR[g])};`).join('\n')}
/* T16_REC */ T16.rec = ${JSON.stringify(hREC)};
(function(){
  const t = esquemas[15];
  t.titulo = "16 — Igualdad efectiva de mujeres y hombres y actuación frente al acoso sexual y por razón de sexo: LO 3/2007 y RD 247/2024 (Protocolo)";
  t.html = leyenda()
    + trampa("Cómo está hecho este esquema", "Texto LITERAL del temario oficial. Las marcas EXAMEN / EXOF / EX / ✱ y las fichas R1-R14 son las de tu temario subrayado (tus fotos del 08-08-2026); el subrayado, el de tu PDF.")
    + T16.lo + ${ORDEN.map(g => 'T16.' + g).join(' + ')} + T16.rec;
})();
/* T16_END */`;
const a = s.indexOf('/* T16_BEGIN */');
if (a >= 0) { const b = s.indexOf('/* T16_END */', a) + '/* T16_END */'.length; s = s.slice(0, a) + bloque + s.slice(b); }
else { const p = s.indexOf('/* T17_BEGIN */'); if (p < 0) throw new Error('sin ancla T17_BEGIN'); s = s.slice(0, p) + bloque + '\n' + s.slice(p); }
fs.writeFileSync(F, s);
const sin = MARCAS.filter((m, i) => !usadas.has(i)).map(m => m.f + ' ' + m.m);
console.log('LO:', (hLO.match(/class="articulo"/g) || []).length, 'fichas · RD:', (hRD.match(/class="articulo"/g) || []).length, 'fichas · marcas colocadas', usadas.size, 'de', MARCAS.length);
if (sin.length) console.log('MARCAS SIN COLOCAR:\n  ' + sin.join('\n  '));
