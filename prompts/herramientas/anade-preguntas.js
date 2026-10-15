// node /tmp/add.js <fichero bNN.js> <fichero con preguntas a añadir>
const fs=require('fs');const [f,a]=process.argv.slice(2);let s=fs.readFileSync(f,'utf8');const add=fs.readFileSync(a,'utf8').trim();
s=s.replace(/\n\];\nrequire/,'\n'+add+'\n];\nrequire');fs.writeFileSync(f,s);console.log('preguntas:',(s.match(/^\{k, /mg)||[]).length);
