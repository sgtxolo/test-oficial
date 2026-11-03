// Lista las preguntas rápidas que el Exprés MUESTRA de verdad (≤3 por ficha, igual que escogerQ de esquemas.html) para reescribirlas a mano.
// Uso: node prompts/herramientas/rapidas-mostradas.js N salida.json   → {id:[pregunta,respuesta]}; reescribir en rapidas-reescritas/tN-a.json y ejecutar preguntas-rapidas.js N
const fs=require('fs'),T=process.argv[2];global.window={};
require('../../expres/t'+T+'.js');require('../../expres/q'+T+'.js');
const Q=window.EXPRES_Q[T],h=window.EXPRES_T[T].html;
const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9ñ]+/g,' ').trim();
function escogerQ(qs,n){const vistos=new Set();
const MALA=/\b(?:son (?:correctas|incorrectas|falsas|verdaderas)|es (?:correcta|incorrecta)|anteriores|ninguna de (?:ellas|las)|todas (?:ellas|las)|ambas)\b|^(?:[a-d]\)?|[a-d] y [a-d]|[a-d], [a-d] y [a-d])$/i;
return qs.filter(([,q])=>!(q[2]&2)&&norm(q[0])!==norm(q[1])&&norm(q[1]).length>1&&!MALA.test(q[1])&&!/^se[ñn]ale\b/i.test(q[0])&&q[0].length>12)
.sort((a,b)=>(b[1][2]&1)-(a[1][2]&1)||a[1][0].length-b[1][0].length)
.filter(([,q])=>{const k=norm(q[1]).slice(0,40),kq=norm(q[0]).slice(0,60);if(vistos.has(k)||vistos.has(kq))return false;vistos.add(k);vistos.add(kq);return true;}).slice(0,n);}
const out={};let n=0;
for(const f of h.split(/(?=<div class="ex-ficha)/)){ if(!/^<div class="ex-ficha/.test(f))continue;
 const ids=[...new Set(f.split('data-q=').slice(1).map(x=>x.replace(/[\\"]/g,' ').trim().split(' ')[0]).flatMap(s=>s.split(',')).filter(Boolean))];
 const qs=ids.map(id=>[id,Q[id]]).filter(x=>x[1]);
 for(const [id,q] of escogerQ(qs,3)){ if(!out[id]){out[id]=[q[0],q[1]];n++;} } }
fs.writeFileSync(process.argv[3],JSON.stringify(out,null,0).replace(/\],"/g,'],\n"'));console.log(n,Object.keys(Q).length);
