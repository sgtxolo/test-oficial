// node ver.js v01 5   -> fotogramas donde aparece la pregunta 5 (y líneas del primero y último)
const fs = require('fs');
const [v, n, which] = process.argv.slice(2);
const j = JSON.parse(fs.readFileSync(v + '.json', 'utf8').replace(/^﻿/, ''));
const lines = w => { const rows = []; for (const o of [].concat(w).slice().sort((a, b) => (a.y + a.h / 2) - (b.y + b.h / 2))) { const c = o.y + o.h / 2; let l = rows.find(l => Math.abs(l.c - c) < 7); if (!l) { l = { c, w: [] }; rows.push(l); } l.w.push(o); } return rows.map(l => { l.w.sort((a, b) => a.x - b.x); return Math.round(l.c) + ' ' + Math.round(l.w[0].x) + ' ' + l.w.map(o => o.t).join(' '); }); };
const hits = Object.keys(j).sort().filter(k => new RegExp('(PREGUNTA|n[úu]mero) ?' + n + '( |$)', 'i').test(lines(j[k]).join('\n').replace(/\n/g, ' \n ')));
console.log(hits.join(' '));
const pick = which ? [which] : [hits[0], hits[Math.floor(hits.length / 2)]];
for (const k of pick) if (k) console.log('--', k, '\n' + lines(j[k]).join('\n'));
