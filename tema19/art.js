// uso: node tema19/art.js 369 467 ... -> imprime el texto de cada artículo del oficial
const fs=require('fs');
const t=fs.readFileSync('prompts/temario-limpio/tema19/oficial.txt','utf8').replace(/=====PAG (\d+) ?=====/g,' [p$1] ').replace(/\s+/g,' ');
for(const n of process.argv.slice(2)){const m=new RegExp('Artículo '+n+'\. .*?(?= Artículo \d+\. |$)','i').exec(t);console.log(m?m[0].slice(0,+process.env.W||1500):'ART '+n+' NO ENCONTRADO');console.log();}
