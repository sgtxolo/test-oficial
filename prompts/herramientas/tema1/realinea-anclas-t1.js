// Realinea mapa-fijo-t1.json tras añadir fichas al esquema del T1: compara las cabeceras de fichas (numeración de expres-lib, la que usa el mapa) de HEAD y del árbol de trabajo. Uso: node prompts/herramientas/tema1/realinea-anclas-t1.js
const fs = require('fs'), path = require('path'), cp = require('child_process'), os = require('os');
const RAIZ = path.join(__dirname, '..', '..', '..'); const WT = path.join(os.tmpdir(), 'wt-realinea');
const cabs = dir => JSON.parse(cp.execFileSync('node', ['-e', "const X=require(process.cwd()+'/prompts/herramientas/expres-lib.js')(1);console.log(JSON.stringify(X.fichas.map(f=>f.cab.replace(/<[^>]+>/g,''))))"], { cwd: dir, maxBuffer: 1e8 }).toString());
try { cp.execSync(`git worktree remove --force "${WT}"`, { cwd: RAIZ, stdio: 'ignore' }); } catch (e) {}
cp.execSync(`git worktree add -q "${WT}" HEAD`, { cwd: RAIZ });
const o = cabs(WT), n = cabs(RAIZ); cp.execSync(`git worktree remove --force "${WT}"`, { cwd: RAIZ });
const FJ = path.join(__dirname, 'mapa-fijo-t1.json'); const J = JSON.parse(cp.execSync('git show HEAD:prompts/herramientas/tema1/mapa-fijo-t1.json', { cwd: RAIZ, maxBuffer: 1e8 }).toString());
let r = 0;
for (const [q, kj] of Object.entries(J)) { const [k, ...rest] = kj.split('-'); const cab = o[+k]; if (cab === undefined) continue; const occ = o.slice(0, +k).filter(x => x === cab).length; let nk = -1, c = 0;
  n.forEach((x, i) => { if (x === cab) { if (c === occ) nk = i; c++; } }); if (nk >= 0 && nk !== +k) { J[q] = [nk, ...rest].join('-'); r++; } }
fs.writeFileSync(FJ, JSON.stringify(J, null, 1)); console.log('fichas HEAD', o.length, 'ahora', n.length, '· anclas realineadas', r);
