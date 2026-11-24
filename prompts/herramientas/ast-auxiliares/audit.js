const fs=require("fs");const BS=String.fromCharCode(92);
const T=process.argv[2],A=+process.argv[3],B=+process.argv[4];
const nrm=t=>t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/-\s+/g,"").replace(/[^a-z0-9]/g,"");
global.window={};eval(fs.readFileSync("esquemas-datos/lila-t"+T+".js","utf8"));const LQ=window.LILA_Q;
global.window={};eval(fs.readFileSync("expres/t"+T+".js","utf8"));const h=window.EXPRES_T[T].html;
const html=fs.readFileSync("test-oficial-conocimiento.html","utf8");
function q(id){const i=html.indexOf('{"id":"'+id+'"');if(i<0)return null;let d=0,inS=false,e=false,j=i;for(;j<html.length;j++){const c=html[j];if(inS){if(e)e=false;else if(c===BS)e=true;else if(c==='"')inS=false;continue}if(c==='"')inS=true;else if(c==="{")d++;else if(c==="}"){d--;if(d===0)break}}return JSON.parse(html.slice(i,j+1))}
const mine=[];for(let n=A;n<=B;n++){const o=q(T+"-"+n);if(!o)continue;const m=o.explicacion.match(/ref-concepto[^>]*>[\s\S]*?"([\s\S]*?)"<\/span>/);mine.push({id:T+"-"+n,t:nrm(m?m[1].replace(/<[^>]+>/g,""):"")})}
const re=/<p data-ex="\*"([^>]*)>([\s\S]*?)<\/p>/g;let m,P=0;const stat={mismo:0,cerca:0,lejos:0,sinoficial:0,sinmia:0};const lejos=[],sin=[];
while((m=re.exec(h))){P++;const txt=nrm(m[2].replace(/<[^>]+>/g,"").replace(/ 🎯.*$/,""));
 const of=Object.keys(LQ).filter(k=>!/-ia-/.test(k)&&!(k.startsWith(T+"-")&&+k.split("-")[1]>=A&&+k.split("-")[1]<=B)).map(k=>{const l=nrm(LQ[k]);return l.length>12&&(txt.indexOf(l.slice(0,40))>=0)?{k,pos:txt.indexOf(l.slice(0,40)),len:l.length}:null}).filter(Boolean);
 const my=mine.map(x=>({id:x.id,pos:x.t.length>12?txt.indexOf(x.t.slice(0,40)):-1})).filter(x=>x.pos>=0);
 if(!my.length){stat.sinmia++;sin.push(P);continue}if(!of.length){stat.sinoficial++;continue}
 const best=Math.min(...my.flatMap(a=>of.map(b=>Math.abs(a.pos-b.pos))));
 if(best<=60)stat.mismo++;else if(best<=300)stat.cerca++;else{stat.lejos++;lejos.push(P+":"+my[0].id+"~"+of[0].k+"("+best+")")}}
console.log("Tema",T,JSON.stringify(stat));console.log("lejos:",lejos.join(" "),"| sinmia:",sin.join(","));
