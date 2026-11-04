# Revisión automática del banco de test-oficial-conocimiento.html

Script: `prompts/herramientas/revisar-banco.js` (`node prompts/herramientas/revisar-banco.js` = informe; `--aplicar` = corrige).

Preguntas revisadas: **16252** (6952 oficiales + 9300 IA).

## (a) Repetidas (mismo tema, mismo enunciado y misma respuesta)
- IA repetidas **borradas**: 0 (si había oficial igual queda la oficial; entre dos IA queda la primera).
  - —
- Oficiales repetidas entre sí: **265** pares. **No se borran** (regla: las oficiales no se borran); el test ya descarta las repetidas al montarse. Lista en `prompts/herramientas/_tmp/revision-banco.json` (clave `dupOfOf`).

## (b) Restos de importación («TEST n», «He analizado las imágenes…»)
- Corregidos: **5** preguntas (se corta la cola basura de la explicación y se quitan etiquetas sueltas del enunciado).
  - —

## (c) IA cuya correcta es la opción más larga
- Detectadas: **165**. Todas corregidas; ahora 0.
  - **160** con `--igualar-largas`: se alarga la falsa más larga con una coletilla neutra (p. ej. «, según los casos», «, conforme a lo que establezca la normativa de desarrollo»). Solo se tocan falsas, nunca la correcta ni el sentido legal.
  - **5** a mano (tabla `PARCHES` del script): 6-ia-1541, 14-ia-38, 13-ia-109, 13-ia-119 y 13-ia-120.
- Para volver a comprobarlo: `node prompts/herramientas/revisar-banco.js` (debe dar 0 en el punto c).

## (d) Explicaciones fuera del formato fijo
- Casos con problema estructural: **13304** (guardados tal cual; la app los ordena y completa en ejecución con `normalizarExplicacion` y `citas-preguntas.js`).
  - dispone (la app lo limpia): 9389
  - norma sin localizador: 602
  - sin ref-norma: 1934
  - sin ref-concepto: 3460
  - orden: 3
  - verificado-con-temario: 97
- No se reescriben en masa por script: el literal del temario y el localizador de artículo exigen verificación manual (T19–T27 y preguntas sin sitio en el esquema).
