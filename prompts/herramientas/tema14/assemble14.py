# -*- coding: utf-8 -*-
# Ensambla el Tema 14 (t14-base.js + recuerda + ensamblaje) y lo inserta en esquemas.html justo antes de render();
import json, sys, re
sp = sys.argv[1]
base = open(sp + '/t14-base.js', encoding='utf-8').read()
nq = json.load(open(sp + '/t14d.json', encoding='utf-8'))
n_of = sum(1 for q in nq if '-ia-' not in q['id']); n_ia = len(nq) - n_of

REC = [
 "<b>Concepto (LO art. 1)</b>: alto comisionado de las Cortes Generales para la defensa de los derechos del Título I de la Constitución; supervisa la actividad de la Administración y da cuenta a las Cortes. Elegido por las Cortes para <b>5 años</b> (art. 2).",
 "<b>Elección (art. 2)</b>: la Comisión Mixta Congreso-Senado propone (mayoría simple) · Pleno del Congreso convocado en término <b>no inferior a 10 días</b> · votación favorable de <b>3/5 del Congreso</b> y, <b>en máximo 20 días</b>, ratificación por 3/5 del Senado · si no se alcanza: nueva propuesta en <b>1 mes</b>, 3/5 del Congreso y <b>mayoría absoluta del Senado</b>.",
 "<b>Cese (art. 5)</b>: renuncia · expiración del plazo · muerte o incapacidad sobrevenida · notoria negligencia · condena firme por delito doloso. Vacante: <b>Presidente del Congreso</b> (muerte, renuncia, expiración) o <b>3/5 de cada Cámara</b>, con debate y audiencia (demás casos). Nuevo procedimiento en plazo <b>no superior a 1 mes</b>; mientras tanto, los <b>Adjuntos</b> por su orden.",
 "<b>Prerrogativas (art. 6)</b>: sin mandato imperativo ni instrucciones · inviolabilidad · no puede ser detenido ni retenido sino en <b>flagrante delito</b> · decide en exclusiva la <b>Sala de lo Penal del Tribunal Supremo</b> (también para los Adjuntos). <b>Incompatibilidades (art. 7)</b>: cesar en <b>10 días</b> desde el nombramiento y antes de tomar posesión.",
 "<b>Quejas (arts. 15-18)</b>: firmada y razonada, papel común, plazo máximo de <b>1 año</b> · gratuita, sin Letrado ni Procurador · se acusa recibo · anónimas se rechazan; decisiones sin recurso · con resolución judicial pendiente, no hay examen individual (sí de los problemas generales) · informe del organismo en <b>15 días</b>.",
 "<b>Colaboración (arts. 19-22)</b>: poderes públicos, con carácter <b>preferente y urgente</b> · el afectado responde en plazo <b>no inferior a 10 días</b> (prórroga: la mitad) · documentos secretos: la no remisión la acuerda el <b>Consejo de Ministros</b> (con certificación); si afectan de forma decisiva a la investigación, la <b>Comisión Mixta</b>.",
 "<b>Resoluciones e informes (arts. 28-33)</b>: legitimado para <b>inconstitucionalidad y amparo</b> · recomendaciones: respuesta por escrito en <b>no más de 1 mes</b> · informe <b>anual</b> en periodo ordinario de sesiones; extraordinario a las <b>Diputaciones Permanentes</b>; resumen oral ante los <b>Plenos de ambas Cámaras</b>; se publican.",
 "<b>Reglamento: órganos</b>: <b>Junta de Coordinación y Régimen Interior</b> (Defensor, Adjuntos y Secretario general, que asiste con <b>voz y sin voto</b>) · <b>Consejo Asesor del MNP</b>: Adjuntos (natos) + <b>máximo 10 Vocales</b>, 4 años renovados por mitades cada 2, al menos <b>2 reuniones al año</b>, preside el Adjunto delegado.",
 "<b>Régimen disciplinario (ROF 36-38)</b>: prescriben las faltas leves a los <b>2 meses</b>, las graves a los <b>6 meses</b> y las muy graves al <b>año</b> · leves: apercibimiento o suspensión de 1 a 10 días · graves: hasta 6 meses · muy graves: 6 meses a 6 años · incoación: Secretario general; suspensión y separación, solo el Defensor.",
 "<b>Régimen económico (ROF 39-42)</b>: presupuesto dentro del de las <b>Cortes Generales</b> · contabilidad e intervención: las de las Cortes (Interventor de las Cortes) · ordenación del pago: <b>Defensor del Pueblo</b> · contratación y adquisición: las de las Cortes Generales.",
]
nota = ("Texto LITERAL de la LO 3/1981 y del Reglamento de Organización y Funcionamiento del Defensor del Pueblo (extracto oficial del temario 2026): artículos completos, "
        "con los apartados «Uno, Dos…» numerados 1, 2… y las listas «Uno), Dos)…» como a), b)… "
        "Lo que va <mark class=\\\"m-resp\\\">en rojo con marco dorado</mark> es la respuesta de alguna de las %d preguntas del Tema 14 (%d oficiales y %d IA); arriba de cada artículo tienes el resumen de esas respuestas. EX = artículo con preguntas oficiales. "
        "· R1…R15 = fichas «Recuerda» de tu temario." % (len(nq), n_of, n_ia))

ens = []
ens.append('/* T14_RECUERDA + ensamblaje */')
ens.append('(function(){')
ens.append('  const t = esquemas[13];')
ens.append('  t.titulo = "14 — El Defensor del Pueblo: LO 3/1981 y Reglamento, articulado literal con las respuestas de los tests";')
ens.append('  t.html = leyenda()')
ens.append('    + trampa("Cómo está hecho este esquema", "%s")' % nota)
ens.append('    + T14.lo')
ens.append('    + T14.rg')
ens.append('    + recuerda(' + json.dumps(REC, ensure_ascii=False) + ');')
ens.append('})();')

bloque = '/* ==== TEMA 14 INICIO ==== */\n' + base + '\n' + '\n'.join(ens) + '\n/* ==== TEMA 14 FIN ==== */\n'

F = 'esquemas.html'
raw = open(F, 'rb').read(); crlf = b'\r\n' in raw
s = raw.decode('utf-8')
a = s.find('/* ==== TEMA 14 INICIO ==== */')
if a >= 0:
    b = s.index('/* ==== TEMA 14 FIN ==== */\n') + len('/* ==== TEMA 14 FIN ==== */\n')
    s = s[:a] + bloque.replace('\n', '\r\n' if crlf else '\n') + s[b:]
    print('bloque reemplazado')
else:
    m = re.search(r'(\r?\n)render\(\);', s)
    i = m.start() + len(m.group(1))
    s = s[:i] + bloque.replace('\n', '\r\n' if crlf else '\n') + s[i:]
    print('bloque insertado')
open(F, 'wb').write(s.encode('utf-8'))
