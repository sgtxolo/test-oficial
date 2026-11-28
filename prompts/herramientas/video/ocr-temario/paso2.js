// Segunda pasada: contrasta cada opción con la cita (literalidad por trigramas de palabras) y marca incoherencias
const fs=require('fs');const P='C:/Users/ruben/Desktop/HTML OFICIAL/prompts/herramientas/';
const n=t=>t.toLowerCase().normalize('NFD').replace(/<br>/g,' ').replace(/[^a-z0-9ñ ]/g,' ').split(/\s+/).filter(Boolean);
const score=(o,c)=>{const a=n(o),s=' '+n(c).join(' ')+' ';const k=Math.min(3,a.length);let h=0,t=0;for(let i=0;i+k<=a.length;i++){t++;if(s.includes(' '+a.slice(i,i+k).join(' ')+' '))h++}return t?h/t:0};
let tot=0,fl=0;
for(const d of ['d1','d2','d3','d4','d5']){for(const q of JSON.parse(fs.readFileSync(P+'oficiales-seras-28-11-'+d+'.json','utf8'))){if(!q.id)continue;tot++;
 const inv=/incorrect|\bNO\b|cuál NO|falsa/.test(q.pregunta);const sc=q.opciones.map(o=>score(o,q.rojo));const meta=q.opciones.map(o=>/^(todas|ninguna)/i.test(o));
 const c=q.correcta;let mal=null;
 if(meta[c]){}
 else if(meta.some(Boolean)){}
 else if(q.opciones[c].split(' ').length<5){}
 else if(inv){const otros=sc.filter((x,i)=>i!==c);if(sc[c]>0.97&&otros.some(x=>x<sc[c]-0.25))mal='INV: la marcada es literal';}
 else{const m=Math.max(...sc.filter((x,i)=>i!==c));if(m>sc[c]+0.15)mal='otra opción más literal';}
 if(mal){fl++;console.log(q.id,mal,sc.map(x=>x.toFixed(2)).join(' '),'['+'ABCD'[c]+']\n  '+q.pregunta.slice(-110)+'\n  '+q.opciones.map((o,i)=>'ABCD'[i]+') '+o.slice(0,110)).join('\n  '))}}}
console.log('revisadas',tot,'marcadas',fl);
