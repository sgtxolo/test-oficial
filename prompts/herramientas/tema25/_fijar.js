const fs=require('fs');const f='prompts/herramientas/tema25/mapa-fijo-t25.json';const M=JSON.parse(fs.readFileSync(f,'utf8'));
const k2=M['25-ia-2225'].split('-')[0];['25-ia-2211','25-ia-2217','25-ia-2223'].forEach(id=>M[id]=k2+'-0');
// RD art. 17 (adopción de acuerdos de las Juntas de Distrito) y LO arts. 16-26 derogados (nota): se buscan por cabecera
require('../esq-virtual.js');
const h=fs.readFileSync('esquemas.html','utf8');
const lit=k=>{const i=h.indexOf('/* T25_'+k+' */');const e=h.indexOf('\n',i);const ln=h.slice(i,e);return JSON.parse(ln.slice(ln.indexOf('= "')+2,ln.length-1))};
const html=['LOE','L31','RD','EUR','INT'].map(lit).join('');
const heads=[...html.matchAll(/<div class="articulo"><div class="articulo-head">([^<]*)</g)].map(m=>m[1]);
const k=(n)=>heads.findIndex(x=>x.startsWith(n));
M['25-92']=k('Artículo 17 · Juntas')+'-0';
console.log(M['25-92'],heads[k('Artículo 17 · Juntas')]);
fs.writeFileSync(f,JSON.stringify(M,null,1));
