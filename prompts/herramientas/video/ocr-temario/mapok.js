const fs=require('fs');const P=process.cwd()+'/prompts/herramientas/';require(P+'esq-virtual.js');
const src=fs.readFileSync(P+'mapa-preguntas.js','utf8');const c=src.slice(src.indexOf('const ESQ ='),src.indexOf('// ---------- 6. Ejecutar'));
const F=new Function('fs','require','__dirname',c+';return {cargarEsquemas,unidades,norm};')(fs,require,P);const E=F.cargarEsquemas();
const m=fs.readFileSync('esquemas-datos/mapa-preguntas.js','utf8');let mal=[],n=0;const u={1:F.unidades(E[0],1),3:F.unidades(E[2],3)};
for(let d=1;d<=5;d++)for(const q of JSON.parse(fs.readFileSync(P+'oficiales-seras-28-11-d'+d+'.json'))){if(!q.id)continue;const x=m.match(new RegExp('"'+q.id+'":"([^"]*)"'));n++;const p=x[1].split('-');if(!u[q.t].some(v=>v.pid===p.slice(0,3).join('-')))mal.push(q.id+':'+x[1])}
console.log(n,'enlaces; rotos',mal.join(' ')||0);
