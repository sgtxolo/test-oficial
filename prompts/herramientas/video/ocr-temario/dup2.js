const Q=require('./banco.js')();const p=t=>t.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
const core=t=>{const i=t.indexOf('¿');if(i<0)return null;const m=t.slice(i).replace(/\?.*$/,'');return p(m).length>18?p(m):null};
for(const t of ['1','3']){const first=t==='1'?558:510;const all=Q[t].filter(q=>!/-ia|forma/.test(q.id));
for(const n of all.filter(q=>+q.id.split('-')[1]>=first)){const c=core(n.pregunta);if(!c)continue;
const o=all.find(o=>+o.id.split('-')[1]<+n.id.split('-')[1]&&core(o.pregunta)===c&&o.apartado.slice(0,12)===n.apartado.slice(0,12)&&p(o.pregunta.slice(o.pregunta.indexOf('¿')))===p(n.pregunta.slice(n.pregunta.indexOf('¿'))));
if(o&&!['3-510','3-576','1-694','1-708','1-755'].includes(n.id)){const a=n.pregunta,b=o.pregunta;console.log(n.id,'~',o.id,'\n  ',a.slice(-170),'\n  ',b.slice(-170))}}}
