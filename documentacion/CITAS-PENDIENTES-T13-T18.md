# Citas pendientes de los temas T13–T18

Auditoría de las explicaciones (lila = localizador exacto + norma; rojo = literal del temario) con `normalizarExplicacion` cargado en un navegador, contra `prompts/temario-limpio/temaN`. **No se ha cambiado ninguna respuesta marcada ni se ha borrado ninguna pregunta.**

## Hecho en esta pasada
- **T13**: literal (rojo) añadido a 11 preguntas en `esquemas-datos/citas-manual-t13.js`. 13-119 y 13-133 citaban «Art. 4» / «Art. 8» con un «Fundamento» erróneo: el texto es el **art. 13** (criterios de distribución de competencia); explicación reescrita.
- **T14**: `citas-manual-t14.js` (14-105, 14-116, 14-201). 14-200 citaba «Art. 19.3»; el literal está en el **art. 22.1** de la LO 3/1981 (documentos secretos); explicación reescrita.
- **T15**: 15-130 (Punto 1.2.1 del protocolo telemático).
- **T17**: 8 preguntas de la Instrucción 1/2017 con su punto exacto (5.3.8, 8.2.2, 6.1.5, 6.1.2, 8.2.8, 2.2.2, Instrucción tercera).
- **T18**: 34 preguntas con artículo/apartado y literal del Código Penal (`citas-manual-t18.js`, nuevo, ya en HTML y service worker).
- Service worker `oposicion-cache-v465`.

## Posible contradicción literal ↔ respuesta (no se ha tocado)
- **15-200** (marcada «Seis meses») y **15-247** (marcada «Seis / seis»): el temario (Protocolo telemático, punto 1.3) dice «transcurridos **doce meses** desde la instalación… Dicha comunicación se reiterará cada **doce meses**». Habría que decidir si la respuesta debe ser «Doce meses» / «Doce / doce» (hay opción «Doce / doce» en 15-247).

## Pendientes por tema
### T13
- sin rojo: 13-324 (INCORRECTA; la opción C deforma el art. 7.3, el art. 5 solo respalda A, B y D).
### T15 (el más largo; texto = LO 1/2004 + Instrucción 5/2021 + Instrucción 1/2025 + protocolo telemático + NTF)
- Sin literal: 15-65, 15-70, 15-72, 15-124, 15-200, 15-247, 15-263.
- Lila solo con el nombre de la norma o «temario oficial», sin Punto/Art. (70): 15-9, 15-11, 15-15, 15-20, 15-31, 15-49, 15-50, 15-53, 15-60, 15-72, 15-81, 15-89, 15-101, 15-102, 15-108, 15-111, 15-113, 15-115, 15-124, 15-126, 15-134, 15-137, 15-138, 15-140, 15-151, 15-154, 15-155, 15-158, 15-159, 15-161, 15-165, 15-174, 15-178, 15-182, 15-183, 15-189, 15-192, 15-193, 15-196, 15-197, 15-198, 15-200, 15-223, 15-228, 15-231, 15-241, 15-248, 15-252, 15-255, 15-257, 15-258, 15-259, 15-262, 15-263, 15-264, 15-267, 15-268, 15-279, 15-ia-1841, 15-ia-1842, 15-ia-1843, 15-ia-1844, 15-ia-1845, 15-ia-1846, 15-ia-1847, 15-ia-1848, 15-ia-1849, 15-ia-1850, 15-ia-1851, 15-ia-1852.
- Motivo: la mayoría salen de los protocolos, sin artículos; el buscador automático no es fiable (confunde puntos) y hay que localizar el punto a mano. Las 12 `15-ia-184x/185x` (protocolo telemático, introducción/objeto) necesitan «Introducción»/«Punto 1».
### T17
- 17-19, 17-52, 17-195, 17-232: 17-52 (consentimiento en identificación), 17-195 (menor de 14 años), 17-232 (OEDE) **no están en el extracto** (puntos 3.1, 3.3, 3.4 y 4 excluidos); 17-19 ya lleva «Instrucción tercera» pero sin número.
### T18 (14 sin localizador)
- Sin localizador: 18-23, 18-39, 18-54, 18-79, 18-92, 18-98, 18-101, 18-103, 18-127, 18-134, 18-140, 18-150, 18-166, 18-178.
- Sin literal: 18-51, 18-79, 18-101, 18-103, 18-236, 18-245.
- Casi todas son «Señale la INCORRECTA» o «Todas son correctas» que mezclan varios artículos (17, 20, 31 bis, 33–36, 127, 130, 131…); hace falta decidir qué artículo cita cada una. 18-92, 18-98 y 18-140 no se confirmaron contra el artículo (el candidato automático era erróneo).

## Aviso sobre herramienta
`prompts/herramientas/citas-temario.js` calcula el apartado (`par`) con un paso de retraso cuando el párrafo numerado no va precedido de línea en blanco (p. ej. el art. 1.3 de la LO 1/2004 salía como «1.1»), y trata los textos de protocolos como si fueran de la última ley con artículos. Conviene revisar los apartados de `citas-temario.js` (T19–T27) antes de fiarse de ellos.
