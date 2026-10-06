// Inserta en esquemas.html los componentes visuales (CSS + helpers + diagramas del Tema 1).
// Uso: node prompts/herramientas/visuales-t1.js   (idempotente: reemplaza lo anterior)
const fs = require('fs');
const F = 'esquemas.html';
let s = fs.readFileSync(F, 'utf8');

const CSS = `/* VISUALES: árboles, flujos y comparaciones (esquemas con cuadros y flechas) */
.vis{margin:14px 0 18px;padding:14px 14px 12px;background:var(--panel);border:1.5px solid var(--borde);border-radius:var(--radio-sm)}
.vis-t{font-weight:800;font-size:.8rem;letter-spacing:.04em;text-transform:uppercase;color:var(--verde-med);margin:0 0 10px}
.vis-t i{font-style:normal;margin-right:6px}
.vis-arbol{display:flex;align-items:center;gap:0;flex-wrap:nowrap}
.vis-raiz{flex:0 0 auto;max-width:34%;background:var(--verde);color:#fff;font-weight:800;border-radius:12px;padding:10px 12px;text-align:center;font-size:.92rem;line-height:1.25}
.vis-ramas{flex:1 1 auto;display:flex;flex-direction:column;gap:7px;margin-left:26px;position:relative}
.vis-ramas:before{content:"";position:absolute;left:-14px;top:14px;bottom:14px;border-left:2.5px solid var(--verde-med)}
.vis-rama{position:relative;background:var(--panel-alt);border:1.5px solid var(--borde);border-radius:10px;padding:7px 10px;font-size:.88rem;line-height:1.35}
.vis-rama:before{content:"";position:absolute;left:-14px;top:50%;width:14px;border-top:2.5px solid var(--verde-med)}
.vis-arbol>.vis-raiz:after{content:"";}
.vis-raiz+.vis-ramas:after{content:"";position:absolute;left:-26px;top:50%;width:12px;border-top:2.5px solid var(--verde-med)}
.vis-rama b{color:var(--verde-osc)}
.vis-flujo{display:flex;flex-direction:column;align-items:stretch;gap:0}
.vis-paso{background:var(--panel-alt);border:1.5px solid var(--borde);border-radius:10px;padding:8px 12px;font-size:.88rem;line-height:1.35;position:relative}
.vis-paso.si{border-color:#2f8f5b}.vis-paso.no{border-color:#c0392b}
.vis-paso .et{display:inline-block;font-weight:800;font-size:.72rem;border-radius:6px;padding:1px 7px;margin-right:6px;background:var(--verde);color:#fff}
.vis-paso.si .et{background:#2f8f5b}.vis-paso.no .et{background:#c0392b}
.vis-flecha{align-self:center;color:var(--verde-med);font-size:1.25rem;line-height:1;padding:2px 0;font-weight:900}
.vis-bifurca{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.vis-comp{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:stretch}
.vis-col{background:var(--panel-alt);border:1.5px solid var(--borde);border-radius:10px;padding:8px 11px;font-size:.88rem;line-height:1.35}
.vis-col h5{margin:0 0 5px;font-size:.9rem;color:var(--verde-osc)}
.vis-col ul{margin:0;padding-left:16px}
.vis-mid{align-self:center;font-weight:900;color:var(--verde-med);font-size:1.4rem}
@media(max-width:640px){.vis-arbol{flex-direction:column;align-items:stretch}.vis-raiz{max-width:none}.vis-ramas{margin:12px 0 0 14px}.vis-ramas:before{left:-8px}.vis-rama:before{left:-8px;width:8px}.vis-raiz+.vis-ramas:after{display:none}.vis-bifurca{grid-template-columns:1fr}.vis-comp{grid-template-columns:1fr}.vis-mid{transform:rotate(90deg)}}
`;

const JS = `/* VISUALES helpers */
function visArbol(titulo, raiz, ramas){
  return '<div class="vis"><div class="vis-t"><i>🌳</i>'+titulo+'</div><div class="vis-arbol"><div class="vis-raiz">'+raiz+'</div><div class="vis-ramas">'+ramas.map(r=>'<div class="vis-rama">'+r+'</div>').join('')+'</div></div></div>';
}
function visFlujo(titulo, pasos){
  /* paso: string | {t, c:'si'|'no', et} | {bif:[paso,paso]} */
  const p1=(p)=>{ if(typeof p==='string') return '<div class="vis-paso">'+p+'</div>'; return '<div class="vis-paso '+(p.c||'')+'">'+(p.et?'<span class="et">'+p.et+'</span>':'')+p.t+'</div>'; };
  const f='<div class="vis-flecha">↓</div>';
  return '<div class="vis"><div class="vis-t"><i>➜</i>'+titulo+'</div><div class="vis-flujo">'+pasos.map(p=>p&&p.bif?'<div class="vis-bifurca">'+p.bif.map(p1).join('')+'</div>':p1(p)).join(f)+'</div></div>';
}
function visComp(titulo, izq, der, medio){
  const col=(c)=>'<div class="vis-col"><h5>'+c.t+'</h5><ul>'+c.l.map(x=>'<li>'+x+'</li>').join('')+'</ul></div>';
  return '<div class="vis"><div class="vis-t"><i>⇄</i>'+titulo+'</div><div class="vis-comp">'+col(izq)+'<div class="vis-mid">'+(medio||'⇄')+'</div>'+col(der)+'</div></div>';
}
`;

// ---------- Diagramas (texto literal de los artículos del esquema; colores como en el temario)
const A = x => "<mark class='m-autoridad'>" + x + "</mark>";
const P = x => "<mark class='m-plazo'>" + x + "</mark>";
const D = x => "<mark class='m-destacable'>" + x + "</mark>";
const Y = x => "<mark class='m-personalizado'>" + x + "</mark>";
const M = x => "<mark class='m-accion'>" + x + "</mark>";
const K = x => "<u class='m-clave'>" + x + "</u>";

const VIS = {
  coe: `visArbol("Órganos del Consejo de Europa (arts. 10-12)", "${D('Consejo de Europa')}", [
    "<b>Órganos</b> (art. 10): i) El ${A('Comité de Ministros')}  ii) La ${A('Asamblea Consultiva')}",
    "Ambos órganos serán ${M('asistidos')} por la ${A('Secretaría')} del Consejo de Europa",
    "<b>Sede</b> (art. 11): ${D('Estrasburgo')}",
    "<b>Idiomas oficiales</b> (art. 12): el ${Y('francés')} y el ${Y('inglés')}"
  ])`,
  coop: `visComp("Cooperación pasiva vs. activa (LO 18/2003, arts. 2 y 3)",
    {t:"${D('PASIVA')} · art. 2", l:["España ${M('presta')} <b>${K('plena')} cooperación</b> a la ${A('Corte')}","${K('en especial')}: art. 86 del Estatuto"]},
    {t:"${D('ACTIVA')} · art. 3", l:["${A('Órganos judiciales')} y ${A('Ministerio Fiscal')} ${M('dirigen')} solicitudes a la ${A('Corte')}","Por conducto del ${A('Ministerio de Justicia')}","En un proceso seguido en España · art. 93.10 del Estatuto"]},
    "⇄")`,
  autor: `visArbol("Autoridades competentes (LO 18/2003, art. 4)", "${D('Autoridades competentes')} para aplicar la ley", [
    "a) El ${A('Gobierno')}",
    "b) El ${A('Ministerio de Justicia')}",
    "c) ${A('Asuntos Exteriores')}: en los casos previstos y, ${K('en todo caso')}, si hay factores de política exterior",
    "d) ${A('Defensa')} e ${A('Interior')}: cuando afecte a sus competencias",
    "e) ${A('Jurisdicción ordinaria')}, en particular la ${A('Audiencia Nacional')}",
    "f) ${A('Órganos judiciales militares')}, en particular el ${A('Tribunal Militar Central')}",
    "g) El ${A('Ministerio Fiscal')}"
  ])`,
  entrega: `visFlujo("Detención y entrega a la Corte (LO 18/2003, arts. 11-17)", [
    {et:"1", t:"${M('Detención')} en cumplimiento de una ${D('orden de la Corte')} (art. 11)"},
    {et:"2", t:"La autoridad que detiene lo comunica ${P('inmediatamente')} al ${A('Ministerio de Justicia')} y al ${A('Juez Central de Instrucción')} de la AN"},
    {et:"3", t:"A disposición del ${A('JCI')} ${P('sin demora y, en todo caso, en 72 horas')}"},
    {et:"4", t:"El ${A('JCI')} oye a la persona reclamada (con letrado e intérprete) y al ${A('Fiscal')} en ${P('otras 72 horas')}"},
    {et:"5", t:"Se pregunta si ${M('consiente')} en la entrega (art. 13)"},
    {bif:[{c:"si", et:"SÍ", t:"Auto de entrega ${K('sin más trámites')} · sin documentación del art. 91 ER"},{c:"no", et:"NO", t:"Entrega ordinaria (art. 15): audiencia en ${P('máximo 10 días')} · ${A('JCI')} resuelve por auto en ${P('3 días')}"}]},
    {et:"6", t:"Recursos (art. 17): apelación ante la ${A('Sala de lo Penal de la AN')} · situación personal: art. 766 LECrim, auto en ${P('5 días')}"}
  ])`
};

const INS = [
  [/^  \+ articuloResp\("Artículos 10, 11 y 12 — Órganos, sede e idiomas/, 'coe'],
  [/^  \+ articuloResp\("Artículo 3 — De la cooperación activa/, 'coop', 'before-trampa'],
  [/^  \+ articuloResp\("Artículo 4 — De las autoridades competentes/, 'autor'],
  [/^  \+ articuloResp\("Artículo 17 — De los recursos/, 'entrega']
];

// limpiar versión anterior
s = s.replace(/\/\* VISUALES: árboles[\s\S]*?(?=\n[^\n]*u\.m-clave\{text-decoration)/, '');
s = s.replace(/\/\* VISUALES helpers \*\/[\s\S]*?(?=\nconst T1 = \{\};)/, '');
s = s.replace(/^  \+ VIS_[a-z]+\(\)\n/gm, '');
s = s.replace(/^  \+ \/\*VIS\*\/.*\n/gm, '');

// CSS: antes de la regla span.m-caja
s = s.replace('span.m-caja{', CSS + 'span.m-caja{');
// JS helpers + diagramas: antes de const T1
s = s.replace('const T1 = {};', JS + 'const VIS_T1 = {\n' + Object.entries(VIS).map(([k, v]) => '  ' + k + ': () => ' + v).join(',\n') + '\n};\nconst T1 = {};');

// insertar tras la línea del artículo (o tras su trampa)
const lines = s.split('\n');
const out = [];
const ini = lines.findIndex(l => l.startsWith('const T1 = {};'));
const fin = lines.findIndex(l => l.startsWith('/* T1_RECUERDA'));
for (let i = 0; i < lines.length; i++) {
  out.push(lines[i]);
  if (i > ini && i < fin) for (const [re, k, modo] of INS) if (re.test(lines[i])) {
    // si la siguiente línea es una trampa, insertar después de ella
    if (/^  \+ trampa\(/.test(lines[i + 1] || '')) { out.push(lines[i + 1]); i++; }
    out.push('  + /*VIS*/ VIS_T1.' + k + '()');
  }
}
fs.writeFileSync(F, out.join('\n'));
console.log('ok');
