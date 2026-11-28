const Q=require('./banco.js')();const p=t=>t.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
for(const t of ['1','3']){const first=t==='1'?558:510;const all=Q[t].filter(q=>!/-ia|forma/.test(q.id));
for(const n of all.filter(q=>+q.id.split('-')[1]>=first)){const a=p(n.pregunta);if(n.pregunta.includes('¿')||/se[ñn]ale|indique/i.test(n.pregunta.slice(-70))||a.length<110)continue;const tail=a.slice(-90);
const o=all.find(o=>+o.id.split('-')[1]<+n.id.split('-')[1]&&p(o.pregunta).slice(-90)===tail);if(o)console.log(n.id,'~',o.id,'\n  ',n.pregunta.slice(-150),'\n  ',o.pregunta.slice(-150))}}
