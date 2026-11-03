// uso: node tema19/g.js "regex" [ancho] [maxCoincidencias] [fichero]
const fs=require('fs');const f=process.argv[5]||'oficial';
const t=fs.readFileSync('prompts/temario-limpio/tema19/'+f+'.txt','utf8').replace(/=====PAG (\d+) ?=====/g,' [p$1] ').replace(/\s+/g,' ');
const re=new RegExp(process.argv[2],'gi');const w=+process.argv[3]||300;const mx=+process.argv[4]||3;let m,n=0;
while((m=re.exec(t))&&n++<mx)console.log('··· '+t.slice(Math.max(0,m.index-w/3),m.index+w)+'\n');
if(!n)console.log('SIN COINCIDENCIAS');
