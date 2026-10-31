const T=process.env.TEMA||'11';global.window={};require('../../../expres/t'+T+'.js');const fs=require('fs');const h=window.EXPRES_T[T].html;
const ix=Object.fromEntries(JSON.parse(fs.readFileSync('expres-subrayado/img/t'+T+'/indice.json','utf8')).map(e=>[e.id,e]));
const inst=JSON.parse(fs.readFileSync('expres-subrayado/t'+T+'-instrumentos.json','utf8'));
let cur=null,k0=-1;const bad=[];let n=0;
for(const f of h.split(/(?=<div class="bloque-titulo">|<div class="ex-ficha(?: ex-of)?">)/)){
 const t=((f.match(/(?:ex-fh|bloque-titulo)">(.*?)<\/div>/)||[])[1]||'').replace(/<[^>]+>/g,'');
 if(/^ANEXO/.test(t))break;
 const k=inst.findIndex((i,j)=>j>k0&&i.inicio&&new RegExp(i.inicio).test(t));if(k>=0){k0=k;cur=inst[k].id}
 const m=t.match(/^Art[íi]culo\s+(\d+)\b/);if(!m||!f.startsWith('<div class="ex-ficha'))continue;
 const id=cur+'-'+m[1],e=ix[id];if(!e||!e.imgr)continue;n++;
 const nums=new Set(),first=[];
 for(const x of f.matchAll(/<p\b[^>]*>(.*?)<\/p>/gs)){const s=x[1].replace(/<span class="ex-sello[^>]*>.*?<\/span>/g,'').replace(/<[^>]+>/g,'').replace(/^\s*(\(…\)\s*)?/,'');const mm=s.match(/^(\d+)\.\s/);if(mm)nums.add(+mm[1]);else if(!/^[a-zñ]\)|^\d\.º/.test(s))first.push(s.slice(0,40))}
 const a=[...nums].sort((p,q)=>p-q).join(','),b=(e.ap||[]).slice().sort((p,q)=>p-q).join(',');
 if(a!==b)bad.push(id+'  Exprés:['+a+']  recorte:['+b+']  sinNumero:'+first.length);}
console.log(n,'piezas;',bad.length,'no coinciden');console.log(bad.join('\n'));
