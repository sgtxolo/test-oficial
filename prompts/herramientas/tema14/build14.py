# -*- coding: utf-8 -*-
# Construye los bloques T14.lo y T14.rg (artículos con texto literal oficial + respuestas de los tests marcadas) y los guarda en t14-block.js
import re, json, sys, math, unicodedata, html
sp = sys.argv[1]
E = json.load(open(sp + '/e14.json', encoding='utf-8'))
Q = json.load(open(sp + '/t14d.json', encoding='utf-8'))

TIT_LO = {1:'Carácter del Defensor del Pueblo',2:'Elección y Comisión Mixta',3:'Quién puede ser elegido',4:'Nombramiento y toma de posesión',5:'Cese y vacante',6:'Prerrogativas',7:'Incompatibilidades',8:'Los Adjuntos',9:'Iniciación de la investigación',10:'Quién puede dirigirse al Defensor',11:'La actividad no se interrumpe',12:'Comunidades Autónomas',13:'Administración de Justicia',14:'Administración Militar',15:'Presentación de las quejas',16:'Centros de detención o internamiento',17:'Admisión y rechazo de las quejas',18:'Investigación sumaria e informal',19:'Colaboración de los poderes públicos',20:'Quejas sobre la conducta de funcionarios',21:'Prohibición del superior jerárquico',22:'Documentos reservados o secretos',23:'Abuso, arbitrariedad, error u omisión',24:'Actitud hostil o entorpecedora',25:'Hechos delictivos y Fiscal General',26:'Acción de responsabilidad',27:'Gastos causados a particulares',28:'Sugerencias y modificación de criterios',29:'Recursos de inconstitucionalidad y amparo',30:'Advertencias y recomendaciones',31:'Notificaciones y comunicaciones',32:'Informe a las Cortes',33:'Contenido del informe anual',34:'Asesores',35:'Personal',36:'Cese de Adjuntos y asesores',37:'Dotación económica'}
TIT_RG = {1:'Naturaleza y funciones del Defensor',2:'Inviolabilidad',3:'Responsabilidad',4:'Elección',5:'Funciones rectoras y Junta',6:'Excedencia especial',7:'Tratamiento',8:'Competencias del Defensor del Pueblo',9:'Cese del Defensor',10:'Gabinete Técnico y asistencia',11:'Informes a las Cortes',12:'Competencias de los Adjuntos',13:'Nombramiento de los Adjuntos',14:'Toma de posesión de los Adjuntos',15:'Incompatibilidades de los Adjuntos',16:'Cese de los Adjuntos',17:'Composición de la Junta',18:'Competencias de la Junta',19:'Consejo Asesor del MNP: composición',20:'Designación de los Vocales',21:'Reuniones del Consejo Asesor',22:'Funciones del Consejo Asesor',23:'Competencias del Secretario General',24:'Estructura de la Secretaría General',25:'Servicio de Régimen Económico',26:'Registro, Archivo y Oficina de Información',27:'Presentación de quejas',28:'Coordinación con las Comunidades Autónomas',29:'Administración de Justicia',30:'Documentos secretos o reservados',31:'Personal al servicio del Defensor',32:'Composición del personal',33:'Asesores',34:'Deber de reserva',35:'Dedicación e incompatibilidades',36:'Faltas y prescripción',37:'Sanciones',38:'Procedimiento sancionador',39:'Presupuesto',40:'Estructura y transferencias',41:'Ordenación de pagos',42:'Contratación'}
RCARD = {('lo',1):1,('lo',2):2,('lo',3):3,('lo',7):4,('lo',11):5,('lo',15):6,('lo',19):7,('lo',23):8,('lo',29):9,('rg',5):10,('rg',12):11,('rg',19):12,('rg',26):13,('rg',33):14,('rg',39):15}

STOP = set('para como sera seran esta este estos estas sobre entre todas todos ninguna correcta correctas incorrecta incorrectas anteriores opciones dicho dicha cuando desde hasta segun otros otras tiene haya sido debera podra podran del las los una uno por con que sus son sin mas ser cual cuales donde quien quienes respecto caso casos presente reglamento articulo ley señale senale opcion defensor pueblo organica aprobado mesas congreso senado propuesta reunion conjunta abril'.split())

def nmap(t):
    n = []; mp = []; prev_space = True
    for i, ch in enumerate(t):
        d = unicodedata.normalize('NFD', ch.lower())
        d = ''.join(c for c in d if unicodedata.category(c) != 'Mn')
        for c in d:
            if c.isalnum():
                n.append(c); mp.append(i); prev_space = False
            elif not prev_space:
                n.append(' '); mp.append(i); prev_space = True
    if n and n[-1] == ' ': n.pop(); mp.pop()
    return ''.join(n), mp
norm = lambda t: nmap(t)[0]
toks = lambda t: [w for w in norm(t).split() if (len(w) >= 3 or w.isdigit()) and w not in STOP]

# ---- unidades (párrafos) ----
U = []   # dict(norma, ai (índice artículo en lista), pi, art(n), ap, li, text)
for nk in ('lo', 'rg'):
    for ai, a in enumerate(E[nk]):
        if a['k'] != 'art': continue
        for pi, p in enumerate(a['p']):
            U.append({'nk': nk, 'ai': ai, 'pi': pi, 'n': a['n'], 'lab': a['label'], 'ap': p['ap'], 'li': p['li'], 't': p['t'], 'spans': [], 'tk': set(toks(p['t']))})
df = {}
for u in U:
    for w in u['tk']: df[w] = df.get(w, 0) + 1
N = len(U)
w_ = lambda w: math.log((N + 1) / (df.get(w, 0) + 1)) + 0.1

def best_par(stem, opt, norma=None, art=None):
    qt = set(toks(stem)); ot = set(toks(opt))
    best = None; bs = 0
    for u in U:
        if norma and u['nk'] != norma: continue
        if art is not None and u['n'] != art: continue
        s = sum(w_(w) for w in (qt & u['tk'])) + 2.0 * sum(w_(w) for w in (ot & u['tk']))
        s /= math.sqrt(len(u['tk']) + 12)
        if s > bs: bs, best = s, u
    return best, bs

def find_span(text, opt):
    opt = opt.strip().rstrip('.').strip()
    no = norm(opt)
    if not no: return None
    n, mp = nmap(text)
    pos = n.find(no)
    while pos >= 0:
        okl = pos == 0 or n[pos - 1] == ' '
        okr = pos + len(no) == len(n) or n[pos + len(no)] == ' '
        if okl and okr: break
        pos = n.find(no, pos + 1)
    if pos >= 0:
        return (mp[pos], mp[pos + len(no) - 1] + 1)
    # fallback: tramo de palabras más largo
    ow = no.split(); nw = n.split(' ')
    if len(ow) < 3: return None
    best = (0, None)
    starts = []; p = 0
    for w in nw: starts.append(p); p += len(w) + 1
    for i in range(len(ow)):
        for j in range(len(nw)):
            k = 0
            while i + k < len(ow) and j + k < len(nw) and ow[i + k] == nw[j + k]: k += 1
            if k > best[0]: best = (k, (j, k))
    k, jj = best
    if k >= 3 and k >= 0.5 * len(ow):
        j, k = jj
        a = starts[j]; b = starts[j + k - 1] + len(nw[j + k - 1]) - 1
        return (mp[a], mp[b] + 1)
    return None

GEN = re.compile(r'^(todas|todos|ninguna|ninguno|ambas|a y b|b y c|a y c|las dos|son correctas|y a y b)', re.I)
def clean_stem(s):
    s = re.sub(r'^\(.*?\)\s*', '', s)
    return s

asign = []   # (q, unit, score, marcado)
for q in Q:
    qid = q['id']; ia = '-ia-' in qid
    opt = q['opciones'][q['correcta']] if isinstance(q['correcta'], int) else ''
    stem = clean_stem(q['pregunta'])
    gen = bool(GEN.match(norm(opt)))
    incorrecta = bool(re.search(r'incorrect|no (será|serán|podrá|cesarán|tomarán|corresponderán)|NO ', stem)) and not ia
    u = None; sc = 0
    if ia:
        m = re.match(r'^(LO 3/1981|Reglamento del Defensor del Pueblo), del Defensor del Pueblo, art\. ([^.]+(?:\.[^. ]+)*)\.|^(LO 3/1981|Reglamento del Defensor del Pueblo), art\. (.+?)\. ', stem)
        pref = m.group(1) or m.group(3); arts = m.group(2) or m.group(4)
        nk = 'lo' if pref.startswith('LO') else 'rg'
        ref = arts.strip()
        if ref.startswith('disp'):
            kind = 'transitoria' if 'disp. transitoria' in stem else ('adicional' if 'disp. adicional' in stem else 'final')
            cands = [x for x in U if x['nk'] == nk and x['n'] is None and kind in (x['lab'] or '').lower()]
            u = cands[0] if cands else None
        else:
            mm = re.match(r'^(\d+)(?:\.(\d+))?(?:\.?([a-zñ]))?\)?$', ref.replace(' ', ''))
            an = int(mm.group(1)); ap = int(mm.group(2)) if mm.group(2) else None; li = mm.group(3)
            c = [x for x in U if x['nk'] == nk and x['n'] == an]
            if li and not ap: c2 = [x for x in c if x['li'] == li]
            elif li and ap: c2 = [x for x in c if x['li'] == li]
            elif ap: c2 = [x for x in c if x['ap'] == ap and not x['li']]
            else: c2 = []
            u = (c2 or c)[0] if (c2 or c) else None
            if u and not (c2) and len(c) > 1:
                u, sc = best_par(stem, opt, nk, an)
        sc = 9.0
    else:
        nk = 'rg' if re.search(r'Reglamento|\[ROF\]|\(ROF', q['pregunta']) else ('lo' if re.search(r'Ley Orgánica|\[LO\]|\(LO', q['pregunta']) else None)
        u, sc = best_par(stem, opt if not (gen or incorrecta) else '', nk)
    marcado = False
    if u is not None and not gen and not incorrecta and opt and (ia or sc >= 0.55):
        # buscar el tramo de la respuesta en el párrafo (y, si no está, en el resto del artículo)
        cand = [u] + [x for x in U if x['nk'] == u['nk'] and x['n'] == u['n'] and x is not u]
        for x in cand:
            sp_ = find_span(x['t'], opt)
            if sp_ and (sp_[1] - sp_[0]) >= 4:
                x['spans'].append((sp_[0], sp_[1], opt.strip().rstrip('.'))); marcado = True; u = x; break
    asign.append((q, u, sc, marcado, ia))

# respuestas de las IA cuya opción es una paráfrasis: tramos literales a marcar en el artículo (clave = id)
MAN = {
 '14-ia-5': ['con cargo a su presupuesto una vez justificados debidamente'],
 '14-ia-17': ['el internamiento en un centro penitenciario o de reclusión'],
 '14-ia-18': ['no interrumpirán la actividad del Defensor del Pueblo, ni el derecho de los ciudadanos de acceder al mismo, sin perjuicio de lo dispuesto en el artículo cincuenta y cinco de la Constitución'],
 '14-ia-20': ['no entrará en el examen individual de aquellas quejas sobre las que esté pendiente resolución judicial', 'la investigación sobre los problemas generales planteados en las quejas presentadas'],
 '14-ia-27': ['el Defensor del Pueblo informará al parlamentario o Comisión competente que lo hubiese solicitado y al término de sus investigaciones, de los resultados alcanzados', 'cuando decida no intervenir informará razonando su desestimación'],
 '14-ia-36': ['el cese exigirá una propuesta razonada del Defensor del Pueblo, que habrá de ser aprobada por la Comisión mixta Congreso-Senado'],
 '14-ia-40': ['en régimen de dedicación a tiempo parcial y sin que puedan menoscabar la prestación del servicio en el Defensor del Pueblo'],
 '14-ia-43': ['sin perjuicio de lo dispuesto en el artículo veinticuatro punto uno'],
}
for i, (q, u, sc, marcado, ia) in enumerate(asign):
    if q['id'] in MAN and u is not None:
        ok = False
        for frag in MAN[q['id']]:
            for x in [u] + [y for y in U if y['nk'] == u['nk'] and y['n'] == u['n'] and y is not u]:
                s_ = find_span(x['t'], frag)
                if s_ and (s_[1] - s_[0]) >= 8:
                    x['spans'].append((s_[0], s_[1], frag)); ok = True; break
        asign[i] = (q, u, sc, ok, ia)

# informe de revisión de las marcas de las preguntas oficiales
rep = []
for q, u, sc, marcado, ia in asign:
    if ia or u is None: continue
    opt = q['opciones'][q['correcta']].strip().rstrip('.')
    mk = ''
    if marcado:
        for a, b, o in u['spans']:
            if o == opt: mk = u['t'][a:b]
    rep.append('%s | %s%s ap%s%s | s=%.2f | %s | opc=%s | marca=%s' % (q['id'], u['nk'], u['n'], u['ap'], u['li'] or '', sc, 'OK' if marcado else '--', opt[:60], mk[:90]))
open(sp + '/marks14.txt', 'w', encoding='utf-8').write('\n'.join(rep))

# ---- HTML ----
def esc(t): return html.escape(t, quote=False)
def render_par(u):
    t = u['t']; spans = sorted(u['spans'])
    merged = []
    for a, b, o in spans:
        if merged and a <= merged[-1][1]: merged[-1][1] = max(merged[-1][1], b)
        else: merged.append([a, b])
    out = ''; pos = 0
    for a, b in merged:
        out += esc(t[pos:a]) + '<mark class="m-resp">' + esc(t[a:b]) + '</mark>'; pos = b
    out += esc(t[pos:])
    lead = ''
    if u['ap']: lead = '<b>%d.</b> ' % u['ap']
    elif u['li']: lead = '<b>%s)</b> ' % u['li']
    return '<p>' + lead + out + '</p>'

by_art = {}
for u in U: by_art.setdefault((u['nk'], u['ai']), []).append(u)
ex_art = {}; resp_art = {}
for q, u, sc, marcado, ia in asign:
    if u is None: continue
    key = (u['nk'], u['ai'])
    if not ia and (marcado or sc >= 0.9): ex_art[key] = True
    if marcado:
        opt = q['opciones'][q['correcta']].strip().rstrip('.')
        resp_art.setdefault(key, [])
        if opt not in resp_art[key] and len(opt) <= 110: resp_art[key].append(opt)

def build(nk, titulo):
    out = []
    out.append('bloqueTitulo(%s)' % json.dumps(titulo, ensure_ascii=False))
    tit = TIT_LO if nk == 'lo' else TIT_RG
    for ai, a in enumerate(E[nk]):
        if a['k'] == 'bloque':
            out.append('bloqueTitulo(%s)' % json.dumps(a['t'], ensure_ascii=False)); continue
        if a['n'] is not None:
            lab = 'Artículo %d — %s' % (a['n'], tit[a['n']])
            r = RCARD.get((nk, a['n']))
            if r: lab += ' · R%d' % r
        else:
            lab = a['label']
        ps = ''.join(render_par(u) for u in by_art[(nk, ai)])
        resps = resp_art.get((nk, ai), [])[:6]
        out.append('articuloResp(%s, %s, %s, %s)' % (json.dumps(lab, ensure_ascii=False), json.dumps(resps, ensure_ascii=False), json.dumps(ps, ensure_ascii=False), 'true' if ex_art.get((nk, ai)) else 'false'))
    return '\n  + '.join(out)

js = []
js.append('const T14 = {};')
js.append('/* T14_LO */ T14.lo = ' + build('lo', '14.1 — LEY ORGÁNICA 3/1981, DE 6 DE ABRIL, DEL DEFENSOR DEL PUEBLO') + ';')
js.append('/* T14_RG */ T14.rg = ' + build('rg', '14.2 — REGLAMENTO DE ORGANIZACIÓN Y FUNCIONAMIENTO DEL DEFENSOR DEL PUEBLO (6 DE ABRIL DE 1983)') + ';')
open(sp + '/t14-base.js', 'w', encoding='utf-8').write('\n'.join(js))

tot = len(asign); marc = sum(1 for x in asign if x[3]); sin_u = sum(1 for x in asign if x[1] is None)
print('preguntas', tot, 'con respuesta marcada', marc, 'sin párrafo', sin_u, '| EX:', len(ex_art), 'artículos con oficiales')
no = [(x[0]['id'], round(x[2], 2), x[0]['pregunta'][:70]) for x in asign if not x[3] and '-ia-' in x[0]['id']]
print('IA sin marcar:', len(no)); [print('  ', n) for n in no]
json.dump([[x[0]['id'], (x[1]['nk'], x[1]['n'], x[1]['ap'], x[1]['li']) if x[1] else None, round(x[2], 2), x[3]] for x in asign], open(sp + '/asign14.json', 'w'), ensure_ascii=False)
