/* Estado de los temas (Estudiando / Estudiado / Lo olvidé + fecha) COMPARTIDO entre Esquemas y Exprés subrayado.
   Formato común, clave 'estado-temas-v1':  { "N": { e: 'estudiando'|'estudiado'|'olvidado'|'' , f: 'AAAA-MM-DD', t: ms } }  (e '' = quitado)
   - Misma web (mismo origen): se pasa de una app a otra al abrirla, al volver a la pestaña o al instante (evento «storage»).
   - Otros dispositivos: se sincroniza con backups/estado-temas.json del mismo repositorio privado y token que el resto (localStorage «oficialGhCfg»).
   - Gana siempre lo más reciente por tema. Un cambio hecho a mano cuenta como «ahora»; lo que solo existía en una app se toma con la fecha de estudio.
   Cada app llama a EstadoTemas.init({clave, leer, aplicar, canon}):
     leer()            -> { N: {e, f} } con lo que tiene la app
     aplicar(N, e, f)  -> pone (o quita, si e es '') el estado de ese tema en la app
     canon(e)          -> opcional: estados que la app no distingue (Esquemas no separa «estudiado» de «lo olvidé») */
(function(){
  const K = 'estado-temas-v1', CFG = 'oficialGhCfg', PATH = 'backups/estado-temas.json';
  const rd = (k, d) => { try { return JSON.parse(localStorage.getItem(k) || 'null') || d; } catch (e) { return d; } };
  const wr = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const b64 = s => btoa(unescape(encodeURIComponent(s))), unb64 = s => decodeURIComponent(escape(atob(s.replace(/\s/g, ''))));
  let ad = null, tmrCambio = 0, tmrSync = 0, ocupado = false, aplicando = false;
  const canon = e => (ad && ad.canon ? ad.canon(e) : e) || '';
  const igual = (a, b) => { const x = a || {e: '', f: ''}, y = b || {e: '', f: ''}; if (!canon(x.e) && !canon(y.e)) return true; return canon(x.e) === canon(y.e) && (x.f || '') === (y.f || ''); };
  const tsDe = f => { const t = Date.parse(f || ''); return isFinite(t) ? t : 1; };

  /* lo que hay en esta app frente a lo compartido: el que tenga lo más reciente gana */
  function reconcilia() {
    if (!ad) return;
    const s = rd(K, {}), loc = ad.leer() || {}; let sucio = false, aplicado = false;
    new Set([...Object.keys(s), ...Object.keys(loc)]).forEach(n => {
      const lv = loc[n] && loc[n].e ? loc[n] : null, sv = s[n] || null;
      if (igual(lv, sv)) return;
      if (!sv || (lv && tsDe(lv.f) > (sv.t || 0))) { s[n] = lv ? {e: lv.e, f: lv.f, t: tsDe(lv.f)} : {e: '', f: '', t: Date.now()}; sucio = true; }
      else { aplicando = true; try { ad.aplicar(n, sv.e, sv.f); aplicado = true; } catch (e) {} aplicando = false; }
    });
    if (sucio) wr(K, s);
    if (aplicado && ad.refrescar) { try { ad.refrescar(); } catch (e) {} }
    if (sucio) agendaSync();
  }

  /* cambio hecho por la persona en esta app: lo de aquí pasa a ser lo más nuevo */
  function cambio() {
    if (!ad || aplicando) return;
    const s = rd(K, {}), loc = ad.leer() || {}; let sucio = false;
    new Set([...Object.keys(s), ...Object.keys(loc)]).forEach(n => {
      const lv = loc[n] && loc[n].e ? loc[n] : null, sv = s[n] || null;
      if (igual(lv, sv)) return;
      s[n] = lv ? {e: lv.e, f: lv.f, t: Date.now()} : {e: '', f: '', t: Date.now()}; sucio = true;
    });
    if (sucio) { wr(K, s); agendaSync(); }
  }

  /* ---------- nube ---------- */
  const cfg = () => rd(CFG, {});
  const hayGh = () => { const c = cfg(); return !!(c.repo && c.token); };
  const api = opt => { const c = cfg(); opt = opt || {}; opt.headers = Object.assign({Authorization: 'Bearer ' + c.token, Accept: 'application/vnd.github+json'}, opt.headers || {}); return fetch('https://api.github.com/repos/' + c.repo + '/contents/' + PATH, opt); };
  async function leeNube() {
    const r = await api({cache: 'no-store'}); if (r.status === 404) return {sha: null, temas: {}};
    if (!r.ok) throw new Error('GitHub ' + r.status);
    const j = await r.json(); let d = {}; try { d = JSON.parse(unb64(j.content)) || {}; } catch (e) {} return {sha: j.sha, temas: d.temas || {}};
  }
  function agendaSync() { clearTimeout(tmrSync); if (hayGh()) tmrSync = setTimeout(sincroniza, 3000); }
  async function sincroniza() {
    if (!hayGh() || ocupado) return; ocupado = true;
    try {
      for (let i = 0; i < 2; i++) {
        const rem = await leeNube(), loc = rd(K, {}), mez = {}; let cambiaLoc = false;
        new Set([...Object.keys(loc), ...Object.keys(rem.temas)]).forEach(n => {
          const a = loc[n], b = rem.temas[n]; const g = !a ? b : !b ? a : ((b.t || 0) > (a.t || 0) ? b : a);
          mez[n] = g; if (JSON.stringify(g) !== JSON.stringify(a)) cambiaLoc = true;
        });
        if (cambiaLoc) wr(K, mez);
        if (JSON.stringify(mez) !== JSON.stringify(rem.temas)) {
          const body = {message: 'Estado de los temas ' + new Date().toISOString().slice(0, 16).replace('T', ' '), content: b64(JSON.stringify({v: 1, ts: Date.now(), temas: mez}))};
          if (rem.sha) body.sha = rem.sha;
          const r = await api({method: 'PUT', body: JSON.stringify(body)});
          if (r.status === 409 || r.status === 422) continue;
          if (!r.ok) throw new Error('GitHub ' + r.status + ' al subir');
        }
        if (cambiaLoc) reconcilia();
        break;
      }
    } catch (e) { /* sin red o sin token: se reintenta en el próximo cambio o al reabrir */ }
    finally { ocupado = false; }
  }

  window.EstadoTemas = {
    init(a) {
      ad = a; reconcilia();
      const org = Storage.prototype.setItem;
      Storage.prototype.setItem = function (k, v) { const r = org.apply(this, arguments); if (this === localStorage && k === ad.clave && !aplicando) { clearTimeout(tmrCambio); tmrCambio = setTimeout(cambio, 60); } return r; };
      addEventListener('storage', e => { if (e.key === K) reconcilia(); });
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { reconcilia(); agendaSync(); } });
      addEventListener('focus', reconcilia);
      if (hayGh()) setTimeout(sincroniza, 1800);
    },
    sincroniza
  };
})();
