// Parchea test-oficial-conocimiento.html para que exista el origen «Forma» junto a Oficial e IA (idempotente).
// - pestaña «Forma» en «Origen de las preguntas» con su contador
// - preguntasPorOrigen / todasPreguntasDe / construirBanco entienden «forma»; «IA» deja de incluir las Forma
// - etiqueta «(Pregunta de Forma)» en la explicación; test rápido y gestor IA tratan Forma como no oficial / no editable
// Uso: node prompts/herramientas/forma-ui.js
const fs = require('fs');
const F = 'test-oficial-conocimiento.html';
let s = fs.readFileSync(F, 'utf8');
const P = [
  ['pestaña',
    `<div class="origen-tab" data-origen="ia" onclick="elegirOrigen('ia')">IA <span class="origen-count" data-count="ia"></span></div>`,
    `<div class="origen-tab" data-origen="ia" onclick="elegirOrigen('ia')">IA <span class="origen-count" data-count="ia"></span></div><div class="origen-tab" data-origen="forma" onclick="elegirOrigen('forma')">Forma <span class="origen-count" data-count="forma"></span></div>`],
  ['contadores',
    `let a=0,o=0;if(esModalidadAlcance()){const b=bancoAlcance();o=b.filter(esPreguntaIA).length,a=b.length-o}else e.forEach(e=>{esPlazos?(a+=preguntasOficialesDe(e).filter(esPreguntaPlazoAutoridad).length,o+=preguntasIADe(e).filter(esPreguntaPlazoAutoridad).length):(a+=preguntasOficialesDe(e).length,o+=preguntasIADe(e).length)});`,
    `let a=0,o=0,fm=0;if(esModalidadAlcance()){const b=bancoAlcance();o=b.filter(esPreguntaIA).length,fm=b.filter(esPreguntaForma).length,a=b.length-o-fm}else e.forEach(e=>{esPlazos?(a+=preguntasOficialesDe(e).filter(esPreguntaPlazoAutoridad).length,o+=preguntasIADe(e).filter(esPreguntaPlazoAutoridad).length,fm+=preguntasFormaDe(e).filter(esPreguntaPlazoAutoridad).length):(a+=preguntasOficialesDe(e).length,o+=preguntasIADe(e).length,fm+=preguntasFormaDe(e).length)});`],
  ['contador-texto',
    `n&&(n.textContent="("+(a+o)+")"),i&&(i.textContent="("+a+")"),t&&(t.textContent="("+o+")")}`,
    `n&&(n.textContent="("+(a+o+fm)+")"),i&&(i.textContent="("+a+")"),t&&(t.textContent="("+o+")");const tf=document.querySelector('.origen-count[data-count="forma"]');tf&&(tf.textContent="("+fm+")")}`],
  ['banco-alcance',
    `return"todas"===o?b:b.filter(q=>"ia"===o?esPreguntaIA(q):!esPreguntaIA(q))}`,
    `return"todas"===o?b:b.filter(q=>"ia"===o?esPreguntaIA(q):"forma"===o?esPreguntaForma(q):!esPreguntaIA(q)&&!esPreguntaForma(q))}`],
  ['funciones-origen',
    `function preguntasIADe(e){return(state.preguntasIA&&state.preguntasIA[e]||[]).filter(q=>!(window.FUERA_RESUMEN&&q&&window.FUERA_RESUMEN[q.id]))}function preguntasPorOrigen(e,a){return"oficial"===a?preguntasOficialesDe(e):"ia"===a?preguntasIADe(e):todasPreguntasDe(e)}function todasPreguntasDe(e){return preguntasOficialesDe(e).concat(preguntasIADe(e))}`,
    `function preguntasIADe(e){return(state.preguntasIA&&state.preguntasIA[e]||[]).filter(q=>!(window.FUERA_RESUMEN&&q&&window.FUERA_RESUMEN[q.id])&&!(q&&q.forma))}function preguntasFormaDe(e){return(state.preguntasIA&&state.preguntasIA[e]||[]).filter(q=>q&&q.forma&&!(window.FUERA_RESUMEN&&window.FUERA_RESUMEN[q.id]))}function esPreguntaForma(q){return preguntasFormaDe(q.temaId).some(x=>x.id===q.id)}function preguntasPorOrigen(e,a){return"oficial"===a?preguntasOficialesDe(e):"ia"===a?preguntasIADe(e):"forma"===a?preguntasFormaDe(e):todasPreguntasDe(e)}function todasPreguntasDe(e){return preguntasOficialesDe(e).concat(preguntasIADe(e),preguntasFormaDe(e))}`],
  ['etiqueta-regex', `(?:generada por IA|de examen oficial|de test oficial)`, `(?:generada por IA|de examen oficial|de test oficial|de Forma)`, 2],
  ['etiqueta-defecto', `if(!etiqueta)etiqueta=esIA?"(Pregunta generada por IA)":`, `if(!etiqueta)etiqueta=q.forma?"(Pregunta de Forma)":esIA?"(Pregunta generada por IA)":`],
  ['test-rapido',
    `var of=ord.filter(function(q){return !/-ia-/.test(q.id)}),ia=ord.filter(function(q){return /-ia-/.test(q.id)})`,
    `var of=ord.filter(function(q){return !/-(ia|forma)-/.test(q.id)}),ia=ord.filter(function(q){return /-(ia|forma)-/.test(q.id)})`],
  ['gestor-ia',
    `function renderGestorIA(){const e=document.getElementById("gestor-ia-lista"),a=state.preguntasIA||{},`,
    `function renderGestorIA(){const e=document.getElementById("gestor-ia-lista"),a=Object.fromEntries(Object.entries(state.preguntasIA||{}).map(([k,v])=>[k,(v||[]).filter(q=>!(q&&q.forma))])),`],
];
let cambios = 0;
for (const [nom, viejo, nuevo, veces = 1] of P) {
  if (s.includes(nuevo) && !s.includes(viejo)) { console.log('ya aplicado:', nom); continue; }
  const n = s.split(viejo).length - 1;
  if (n !== veces) throw new Error(nom + ': esperaba ' + veces + ' coincidencia(s) y hay ' + n);
  s = s.split(viejo).join(nuevo); cambios++; console.log('aplicado:', nom);
}
fs.writeFileSync(F, s);
console.log('parches nuevos:', cambios);
