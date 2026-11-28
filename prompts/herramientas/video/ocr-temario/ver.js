// node ver.js r1 [v02] [desde] [hasta]: texto corregido para revisar
const fs=require('fs'),fix=require('./fix.js');
const [r,v,a,b]=process.argv.slice(2);const R=JSON.parse(fs.readFileSync(r+'.json','utf8'));
R.nuevas.forEach((q,i)=>{q.i=i;q.en=fix(q.en);q.op=q.op.map(fix)});
fs.writeFileSync(r+'-fix.json',JSON.stringify(R.nuevas,null,1));
const L=R.nuevas.filter(q=>(!v||q.v===v)&&(!a||(q.i>=+a&&q.i<=+b)));
for(const q of L)console.log(`#${q.i} ${q.v}:${q.f} ${q.en.replace(/^(Carta de los Derechos Fundamentales de la Unión Europea\.|Estatuto del Consejo de Europa\.) /i,'§ ')}\n `+q.op.map((o,n)=>'ABCD'[n]+') '+o).join('\n '));
