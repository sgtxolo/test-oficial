# -*- coding: utf-8 -*-
# Analiza el texto oficial (pdftotext -layout) del Tema 14 en una estructura: bloques de títulos y artículos con párrafos.
import re, json, sys
sp = sys.argv[1]
lines = open(sp + '/of14.txt', encoding='utf-8').read().split('\n')

UNI = {'uno':1,'dos':2,'tres':3,'cuatro':4,'cinco':5,'seis':6,'siete':7,'ocho':8,'nueve':9,'diez':10,'once':11,'doce':12,'trece':13,'catorce':14,'quince':15,'dieciséis':16,'diecisiete':17,'dieciocho':18,'diecinueve':19,'veinte':20,'veintiuno':21,'veintidós':22,'veintitrés':23,'veinticuatro':24,'veinticinco':25,'veintiséis':26,'veintisiete':27,'veintiocho':28,'veintinueve':29}
ORD = {'primero':1,'segundo':2,'tercero':3,'cuarto':4,'quinto':5,'sexto':6,'séptimo':7,'octavo':8,'noveno':9,'décimo':10}
DEC = {'treinta':30}
def num_letra(s):
    s = s.lower().strip()
    if s in ORD: return ORD[s]
    if s in UNI: return UNI[s]
    m = re.match(r'^(treinta)(?: y ([a-záéíóú]+))?$', s)
    if m: return 30 + (UNI.get(m.group(2), 0) if m.group(2) else 0)
    return 0

APART = {'Uno':1,'Dos':2,'Tres':3,'Cuatro':4,'Cinco':5,'Seis':6}
out = {'lo': [], 'rg': []}
cur_norma = None      # 'lo' | 'rg'
items = out['lo']
art = None
par = None
pending_title = None   # (tipo) tras TÍTULO/CAPÍTULO: la siguiente línea no vacía es su nombre

def close_par():
    global par
    if par is not None and art is not None and par['t'].strip():
        par['t'] = re.sub(r'\s+', ' ', par['t']).strip()
        art['p'].append(par)
    par = None

def new_art(num, label=None):
    global art
    close_par()
    art = {'k': 'art', 'n': num, 'label': label, 'p': []}
    items.append(art)

def push_block(txt):
    global art
    close_par(); art = None
    items.append({'k': 'bloque', 't': re.sub(r'\s+', ' ', txt).strip()})

i0 = next(i for i, l in enumerate(lines) if l.strip().startswith('TÍTULO PRIMERO'))
mode = 'lo'
skip_after = False
for idx in range(i0, len(lines)):
    raw = lines[idx].rstrip()
    s = raw.strip()
    if not s:
        continue
    if s.startswith('Este documento es de carácter informativo') or s.startswith('Este texto consolidado no tiene valor'):
        continue
    # inicio del Reglamento
    if s.startswith('REGLAMENTO DE ORGANIZACIÓN Y FUNCIONAMIENTO DEL'):
        close_par(); mode = 'rg'; items = out['rg']; art = None; skip_header = True; continue
    if mode == 'rg' and re.match(r'^(DEFENSOR DEL PUEBLO \(6 DE ABRIL DE 1983\)|TEXTO CONSOLIDADO|Última modificación|Las Mesas del Congreso y del Senado, en su reunión|de 1983, aprobaron|y Funcionamiento de esta Institución)', s):
        continue
    if mode == 'lo' and re.match(r'^(Por tanto\.|Mando a todos|esta Ley Orgánica\.|Palacio Real|JUAN CARLOS R|El Presidente del Gobierno|LEOPOLDO)', s):
        continue
    if mode == 'rg' and re.match(r'^(Palacio de las Cortes|El Presidente del Congreso de los Diputados, El Presidente|Gregorio Peces)', s):
        continue
    ind = len(raw) - len(raw.lstrip())
    # --- Título / Capítulo
    m = re.match(r'^(TÍTULO|CAPÍTULO) (PRIMERO|SEGUNDO|TERCERO|CUARTO|QUINTO|SEXTO|SÉPTIMO)$', s)
    if m and mode == 'lo':
        close_par(); pending_title = s; continue
    if pending_title and mode == 'lo':
        push_block(pending_title + ' — ' + s); pending_title = None; continue
    # --- artículo
    m = re.match(r'^Artículo ([a-záéíóú ]+)\.$', s) if mode == 'lo' else re.match(r'^Artículo (\d+)\.$', s)
    if m:
        n = num_letra(m.group(1)) if mode == 'lo' else int(m.group(1))
        new_art(n); continue
    # --- disposiciones
    m = re.match(r'^(Disposición (transitoria|adicional|final única|final))\.?(.*)$', s)
    if m:
        t = m.group(1)
        new_art(None, t[0].upper() + t[1:] + (' — ' + m.group(3).strip(' .') if m.group(3).strip(' .') else ''))
        continue
    # --- títulos romanos del Reglamento
    m = re.match(r'^(I|II|III|IV|V|VI|VII|VIII|IX|X)\. (.+)$', s) if mode == 'rg' else None
    if m and ind > 5 or (m and mode == 'rg' and s.isupper()):
        close_par(); art = None
        t = s
        items.append({'k': 'bloque', 't': re.sub(r'\s+', ' ', t)}); continue
    if mode == 'rg' and s.startswith('TORTURA') and items and items[-1]['k'] == 'bloque':
        items[-1]['t'] += ' ' + s; continue
    if mode == 'lo' and s in ('Medios personales y materiales', 'Dotación económica') and False:
        continue
    if art is None:
        # texto entre bloques sin artículo (títulos partidos de capítulos del LO que aparecen flush-left)
        if items and items[-1]['k'] == 'bloque' and mode == 'lo':
            items[-1]['t'] += ' — ' + s
        continue
    # --- apartados
    if mode == 'lo':
        m = re.match(r'^(Uno|Dos|Tres|Cuatro|Cinco|Seis)\. (.*)$', s)
        if m and ind >= 2:
            close_par(); par = {'ap': APART[m.group(1)], 'li': None, 't': m.group(2)}; continue
        m = re.match(r'^(Uno|Dos|Tres|Cuatro|Cinco)\) (.*)$', s)
        if m:
            close_par(); par = {'ap': None, 'li': 'abcde'[APART[m.group(1)] - 1], 't': m.group(2)}; continue
    else:
        m = re.match(r'^(\d+)\. (.*)$', s)
        if m and ind >= 2 and ind < 10:
            close_par(); par = {'ap': int(m.group(1)), 'li': None, 't': m.group(2)}; continue
        m = re.match(r'^([a-zñ])\) (.*)$', s)
        if m and ind >= 2 and ind < 10:
            close_par(); par = {'ap': None, 'li': m.group(1), 't': m.group(2)}; continue
    # primer párrafo sin número (indentado 3) o continuación
    if ind >= 2 and ind < 10 and (par is None or True) and not (par is not None and ind < 2):
        # línea indentada = párrafo nuevo (los saltos de página dejan las continuaciones a ras)
        if par is not None and ind >= 2 and ind < 10 and re.match(r'^[A-ZÁÉÍÓÚ«]', s) and par['t'].rstrip().endswith(('.', ':', ';')):
            close_par(); par = {'ap': None, 'li': None, 't': s}; continue
        if par is None:
            par = {'ap': None, 'li': None, 't': s}; continue
    if par is None:
        par = {'ap': None, 'li': None, 't': s}
    else:
        sep = '' if par['t'].endswith('-') and False else ' '
        par['t'] += sep + s
close_par()
for k in ('lo', 'rg'):
    arts = [a for a in out[k] if a['k'] == 'art']
    print(k, 'bloques', sum(1 for a in out[k] if a['k'] == 'bloque'), 'artículos', len(arts), 'párrafos', sum(len(a['p']) for a in arts))
json.dump(out, open(sp + '/e14.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
