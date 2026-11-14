// Cuadros del Tema 15 (VioGén: LO 1/2004, Resolución 28/06/2005, Instrucciones 4/2019, 1/2025, 5/2021, NTF 1/2019…) para el Esquema clave.
// Los 8 cuadros del temario ya están transcritos (texto literal y marcas) dentro del Exprés (expres/t15.js, <div class="vis">); aquí solo se REDIBUJAN en su sitio con la forma del temario
// (tabla de etiqueta | contenido para los «cuadros de dos columnas» de las págs. 20, 75-77; plazos en cuadrícula; flechas para el Protocolo Cero y los tres efectos) y con el fosforito del Exprés.
// Págs. del PDF «TEMA 15 VIOGEN-2026-08-08.pdf»: 20 (Delegación del Gobierno), 75 (pautas de entrevista), 76-77 (Anexo II), 105 (Protocolo Cero), 112-113 (tres efectos).
// Se usa con repaso-hibrido.js (PROP.vis redibuja cada cuadro donde está en el Exprés).
const { colorea } = require('./repaso-cuadros-lib.js');
const BD = 'border:1px solid rgba(60,70,80,.35)';
const COL = { o: '#f3d5c2', v: '#d3e8d6', c: '#e3dbf0', n: '#dfe9f5' };
const lab = (t, c) => `<div style="background:${COL[c] || '#d3e8e1'};padding:6px 8px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center;${BD};color:#1f2a33"><div>${t}</div></div>`;
const cel = t => `<div style="padding:6px 9px;${BD};line-height:1.5">${t}</div>`;
const esq = (tit, inner) => `<div class="esq"><div class="ban">${tit}</div><div class="cuerpo">${inner}</div></div>`;
const caja = (t, e = '') => `<div class="caja ${e}">${t}</div>`;
const fl = '<div class="fl">▼</div>';
const strip = s => s.replace(/<\/?div[^>]*>/g, '').trim();

// hijos de primer nivel <div class="…">…</div> de un trozo de HTML (cuenta la profundidad de los div)
function kids(s) {
  const out = []; const re = /<div\b([^>]*)>|<\/div>/g; let m, depth = 0, start = -1, cls = '', innerStart = -1;
  while ((m = re.exec(s))) {
    if (m[0] === '</div>') { depth--; if (depth === 0 && start >= 0) { out.push({ cls, inner: s.slice(innerStart, m.index) }); start = -1; } }
    else { if (depth === 0) { start = m.index; innerStart = re.lastIndex; cls = (m[1].match(/class="([^"]*)"/) || [, ''])[1]; } depth++; }
  }
  return out;
}

function vis(html) {
  const tit = (html.match(/<div class="vis-t">(?:<i>[^<]*<\/i>)?([\s\S]*?)<\/div>/) || [, ''])[1].replace(/ \(cuadro del temario[^)]*\)/, '');
  const root = kids(html)[0].inner;               // contenido de <div class="vis">
  const [, body] = kids(root);                    // [vis-t, cuerpo]
  let inner = '';
  if (/vis-tabla/.test(body.cls)) {
    const filas = kids(body.inner).filter(x => x.cls === 'vt-nodo').map(n => {
      const [et, hijos] = kids(n.inner); const c = (et.cls.match(/vt-et ([a-z]+)/) || [, ''])[1];
      return lab(strip(et.inner), c) + cel(kids(hijos.inner).map(h => strip(h.inner)).join('<br>'));
    });
    inner = `<div style="display:grid;grid-template-columns:170px 1fr">${filas.join('')}</div>`;
  } else if (/vis-comp/.test(body.cls)) {
    const cols = kids(body.inner).filter(x => x.cls === 'vis-col').map(c => ({ h: (c.inner.match(/<h5>([\s\S]*?)<\/h5>/) || [, ''])[1], l: [...c.inner.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(x => x[1]) }));
    if (cols.length > 3) inner = `<div style="display:grid;grid-template-columns:170px 1fr">${cols.map(c => lab(c.h, 'v') + cel(c.l.map(x => '• ' + x).join('<br>'))).join('')}</div>`;
    else inner = `<div class="g2s" style="align-items:start;grid-template-columns:repeat(${cols.length},1fr)">${cols.map(c => `<div class="caja"><div style="font-weight:800;margin:0 0 4px;text-align:center">${c.h}</div>${c.l.map(x => '• ' + x).join('<br>')}</div>`).join('')}</div>`;
  } else if (/vis-plazos/.test(body.cls)) {
    inner = `<div style="display:grid;grid-template-columns:130px 1fr">${kids(body.inner).map(p => lab((p.inner.match(/<span class="n">([\s\S]*?)<\/span>/) || [, ''])[1], 'o') + cel(p.inner.replace(/<span class="n">[\s\S]*?<\/span>/, ''))).join('')}</div>`;
  } else if (/vis-flujo/.test(body.cls)) {
    const paso = p => caja(strip(p.inner.replace(/<span class="et">([\s\S]*?)<\/span>/, '<b>$1</b> · ')));
    inner = kids(body.inner).map(p => p.cls === 'vis-flecha' ? fl : /vis-bifurca/.test(p.cls) ? `<div class="g2s" style="align-items:start">${kids(p.inner).map(paso).join('')}</div>` : paso(p)).join('').replace(/(<div class="fl">▼<\/div>)+/g, fl);
  } else return html;
  let h = '<!--largo-->' + esq(tit, inner);
  h = h.replace(/<mark class="m-resp[^"]*"[^>]*>([\s\S]*?)<\/mark>/g, '$1').replace(/ (data-q|title|data-r|tabindex|onclick)="[^"]*"/g, '')
    .replace(/<span class="m-circulo[^"]*">/g, '<span style="border:1.5px solid #c2185b;border-radius:10px;padding:0 3px">')
    .replace(/<span class="m-caja[^"]*">/g, '<span style="border:1.5px solid #1d4ed8;padding:0 2px">');
  return colorea(h);
}

// R6, R14 y R15 del RECUERDA del temario (págs. 166-167 del PDF) que faltan en el RECUERDA del Exprés: se insertan en su orden numérico
const rExtra = [
  '<p><span class="b r">R6</span> <b>R6</b> · <i>Ley Orgánica de Medidas de Protección Integral contra la VG.</i> Las mujeres víctimas de violencia de género serán consideradas en el acceso a viviendas protegidas y residencias públicas para mayores, en los términos que determine la legislación aplicable: <b>→</b> <mark>colectivos prioritarios.</mark></p>',
  '<p><span class="b r">R14</span> <b>R14</b> · <i>Instrucción núm. 4/2019.</i> El seguimiento de la evolución de los casos se realizará siempre con el Formulario VPER en sus dos modalidades: <b>→</b> <mark>VPER-S y VPER-C.</mark></p>',
  '<p><span class="b r">R15</span> <b>R15</b> · <i>Protocolo de actuación del sistema de seguimiento por medios telemáticos.</i> El DLV se entregará preferentemente: <b>→</b> <mark>en el domicilio de la usuaria.</mark></p>'];
module.exports = { rExtra, soloPropios: true, vis };
if (require.main === module) {
  global.window = {}; eval(require('fs').readFileSync('C:/Users/ruben/Desktop/HTML OFICIAL/expres/t15.js', 'utf8'));
  const H = window.EXPRES_T[15].html; let i = 0, p = 0, n = 0;
  while ((i = H.indexOf('<div class="vis">', p)) >= 0) { const k = kids(H.slice(i - 1 + 1)); const blk = '<div class="vis">' + kids(H.slice(i))[0].inner + '</div>'; n++; console.log(n, vis(blk).length); p = i + blk.length; }
}
