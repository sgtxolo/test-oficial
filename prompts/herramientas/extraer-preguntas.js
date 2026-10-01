// Uso: node extraer-preguntas.js test-oficial-conocimiento.html 5 salida.json
const fs=require('fs');
const [,,file,tema,out]=process.argv;
const s=fs.readFileSync(file,'utf8');const res=[];const BS=String.fromCharCode(92);
const re=new RegExp('\{"id":"'+tema+'-[^"]*"','g');let m;
while((m=re.exec(s))){let d=0,inS=false,esc=false,j=m.index;
 for(;j<s.length;j++){const c=s[j];
  if(inS){if(esc)esc=false;else if(c===BS)esc=true;else if(c==='"')inS=false;continue}
  if(c==='"')inS=true;else if(c==='{')d++;else if(c==='}'){d--;if(d===0)break}}
 res.push(JSON.parse(s.slice(m.index,j+1)));}
fs.writeFileSync(out,JSON.stringify(res,null,1));
const c={};res.forEach(q=>c[q.apartado]=(c[q.apartado]||0)+1);console.log(res.length,'preguntas');console.log(c);
