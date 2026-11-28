const {arts}=require('./temario.js');const t=arts('ER')['8'].txt;const a=t.indexOf('2. A los efectos'),b=t.indexOf('b) Otras violaciones');
const A=arts('APIC');
module.exports={'ER 8':t.slice(a,b).trim(),'APIC 25':A['25'].txt.replace(/^14\. /,''),'APIC 26':A['26'].txt.replace(/^22\. /,'')};

{const T=arts('TUE')['7'].txt;const a=T.indexOf('1. A'),a2=T.indexOf(' EL CONSEJO PREVIA'),c=T.indexOf('2. El Consejo Europeo, por unanimidad'),d=T.indexOf(' EL CONSEJO EUROPEO POR');
module.exports['TUE 7.1']=T.slice(0,a2).replace(/^1. Apropuesta/,'1. A propuesta').replace(/artículo 2.1 /,'artículo 2. ');module.exports['TUE 7.2']=T.slice(c,d);}

{const T=arts('TUE')['41'].txt;module.exports['TUE 41.3']=T.slice(T.indexOf('3. El Consejo adoptará')).split(/ T3 TRATADOS| FINANCIACIÓN /)[0].trim();}
