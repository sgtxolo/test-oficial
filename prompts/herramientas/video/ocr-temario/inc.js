const R=require('./'+process.argv[2]);const p=t=>String(t||'').toLowerCase().normalize('NFD').replace(/[^a-z]/g,'');
const todos=R.nuevas.concat(R.rep);
for(const q of R.inc){const e=p(q.en);const m=todos.find(x=>x.v===q.v&&Math.abs(x.f-q.f)<40&&e.length>8&&p(x.en).endsWith(e.slice(-25)));console.log(q.v+':'+q.f, m?'cubierta por '+m.f:'FALTA', (q.en||'').slice(-60))}
