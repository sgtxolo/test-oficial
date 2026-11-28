// palabras raras en las preguntas de un lote
const fs=require('fs');const BQ=require('./banco.js')();
const v=new Set();const m=t=>(String(t).toLowerCase().match(/[a-záéíóúüñ]+/g)||[]).forEach(w=>v.add(w));
for(const t of [1,3])m(fs.readFileSync('C:/Users/ruben/Desktop/HTML OFICIAL/prompts/temario-limpio/tema'+t+'/temario.txt','utf8'));
Object.values(BQ).flat().forEach(q=>{m(q.pregunta);q.opciones.forEach(m)});
for(const s of require('./'+process.argv[2])){const txt=[s.pregunta,...s.opciones].join(' | ');const r=(txt.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\[\]$_0-9]+/g)||[]).filter(w=>!/^\d+$/.test(w)&&!v.has(w.toLowerCase()));if(r.length)console.log(s.i,r.join(' '));
const odd=txt.match(/ (osf|cl|c|0|o la) |\. [a-záéíóú]{3,}|[A-Za-z]\[|\s[A-Z]{1}\s[a-z]/g);if(odd)console.log(s.i,'??',odd)
const rj=s.rojo.match(/RECUERDA|academia|TOMO|\b[B-DF-HJ-NP-TV-XZ] [a-z]/g);if(rj)console.log(s.i,'CITA',rj)}
