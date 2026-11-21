// Lista k-j de los párrafos de las fichas T26 cuya cabecera case con el regex. Uso: node prompts/herramientas/tema26/ficha.js "^Artículo 44 " [ley]
const fs = require('fs'), vm = require('vm');
const win = {}; vm.runInNewContext(fs.readFileSync('esquemas-datos/t26.js', 'utf8'), { window: win });
const html = ['lo11', 'lo12', 'l29', 'ord', 'res1', 'res2', 'res3'].map(k => win.ESQ_TXT['T26.' + k]).join('');
const strip = t => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const fichas = [...html.matchAll(/<div class="articulo">([\s\S]*?<div class="txt">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>)/g)].map(m => ({ cab: strip((m[1].match(/<div class="articulo-head">([\s\S]*?)<\/div>/) || [])[1] || ''), ps: [...m[2].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(x => strip(x[1])) }));
const re = new RegExp(process.argv[2], 'i'), W = +(process.argv[3] || 160);
fichas.forEach((f, k) => { if (re.test(f.cab)) { console.log('#' + k, f.cab.slice(0, 80)); f.ps.forEach((p, j) => console.log('   ', k + '-' + j, p.slice(0, W))); } });
