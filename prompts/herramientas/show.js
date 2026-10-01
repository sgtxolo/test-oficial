const fs=require('fs');const path=require('path');
// Uso: node show.js preguntas.json 5-12 5-40 ...
const qs=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));process.argv.splice(2,1);
const strip=t=>(t||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
for(const id of process.argv.slice(2)){
  const q=qs.find(x=>x.id===id);if(!q){console.log(id,'NOT FOUND');continue}
  console.log(`\n[${id}] ${strip(q.pregunta)}`);
  q.opciones.forEach((o,i)=>console.log(`  ${'ABCD'[i]}${i===q.correcta?'*':' '} ${strip(o)}`));
  console.log('  EX: '+strip(q.explicacion).slice(0,400));
}
