const T=process.env.TEMA||'11';global.window={};require('../../../expres/t'+T+'.js');const h=window.EXPRES_T[T].html;
const inst=JSON.parse(require('fs').readFileSync('expres-subrayado/t'+T+'-instrumentos.json','utf8'));
const want=new Set(process.argv.slice(2));let cur=null,k0=-1;
for(const f of h.split(/(?=<div class="bloque-titulo">|<div class="ex-ficha(?: ex-of)?">)/)){
 const t=((f.match(/(?:ex-fh|bloque-titulo)">(.*?)<\/div>/)||[])[1]||'').replace(/<[^>]+>/g,'');
 if(/^ANEXO/.test(t))break;
 const k=inst.findIndex((i,j)=>j>k0&&i.inicio&&new RegExp(i.inicio).test(t));if(k>=0){k0=k;cur=inst[k].id}
 const m=t.match(/^Art[íi]culo\s+(\d+)\b/);if(!m||!f.startsWith('<div class="ex-ficha'))continue;
 const id=cur+'-'+m[1];if(!want.has(id))continue;
 const ps=[...f.matchAll(/<p\b[^>]*>(.*?)<\/p>/gs)].map(x=>x[1].replace(/<span class="ex-sello[^>]*>.*?<\/span>/g,'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim());
 console.log('== '+id);for(const p of ps){const segs=p.split('(…)').map(s=>s.trim()).filter(Boolean);console.log(' P: '+segs.map(s=>s.length>110?s.slice(0,55)+' … '+s.slice(-45):s).join('  (…)  '))}}
