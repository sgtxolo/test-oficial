const fs=require("fs");const T=process.argv[2],A=+process.argv[3],B=+process.argv[4];const BS=String.fromCharCode(92);
const nrm=t=>t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/-\s+/g,"").replace(/[^a-z0-9]/g,"");
global.window={};eval(fs.readFileSync("esquemas-datos/lila-t"+T+".js","utf8"));const LQ=window.LILA_Q;const ofi=Object.keys(LQ).filter(k=>!/-ia-/.test(k));
global.window={};eval(fs.readFileSync("expres/t"+T+".js","utf8"));const h=window.EXPRES_T[T].html;
const html=fs.readFileSync("test-oficial-conocimiento.html","utf8");
function q(id){const i=html.indexOf('{"id":"'+id+'"');if(i<0)return null;let d=0,inS=false,e=false,j=i;for(;j<html.length;j++){const c=html[j];if(inS){if(e)e=false;else if(c===BS)e=true;else if(c==='"')inS=false;continue}if(c==='"')inS=true;else if(c==="{")d++;else if(c==="}"){d--;if(d===0)break}}return JSON.parse(html.slice(i,j+1))}
const re=/<p data-ex="\*"([^>]*)>([\s\S]*?)<\/p>/g;let m,n=0;
while((m=re.exec(h))){n++;if(n<A||n>B)continue;const txt=m[2].replace(/<[^>]+>/g,"").replace(/\u0007/g,"").replace(/\s+/g," ").replace(/ 🎯.*$/,"").trim();const pt=nrm(txt);
 const of=ofi.filter(k=>{const l=nrm(LQ[k]);return l.length>12&&(pt.includes(l.slice(0,40))||pt.includes(l.slice(-40)))});
 console.log("\n#### P"+n+" ["+of.join(",")+"]\n"+txt.slice(0,900));
 of.slice(0,2).forEach(id=>{const o=q(id);if(o)console.log("  OF "+id+": "+o.pregunta.replace(/^.*?\. (?=[A-ZÁÉÍÓÚ])/,"").slice(-260)+" || "+o.opciones.map((x,k)=>(k===o.correcta?"*":"")+x.slice(0,70)).join(" | "))});}
