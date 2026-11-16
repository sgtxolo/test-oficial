// Borra del test el bloque semilla antiguo del Tema 25 (25-ia-1..50, rehechas desde cero el 16/11/2026).
const fs=require('fs');const F='test-oficial-conocimiento.html';let s=fs.readFileSync(F,'utf8');
const i=s.indexOf('{"id":"25-ia-1","pregunta"');if(i<0){console.log('no hay IA vieja');process.exit(0)}
const a=s.lastIndexOf('(function(){const seed=[',i);const fin=';syncSeedIA(25,seed)})();';const b=s.indexOf(fin,i)+fin.length;
console.log('quito',b-a,'caracteres');s=s.slice(0,a)+s.slice(b);fs.writeFileSync(F,s);
