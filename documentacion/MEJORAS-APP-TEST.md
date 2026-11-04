# Mejoras de la app de test de conocimientos (revisión 04/11/2026)

Revisión de `test-oficial-conocimiento.html` con Playwright (Chromium, móvil 390×844, escala 1).
Banco cargado: 6952 preguntas, todas con 4 opciones, `correcta` válida, sin ids repetidos, sin opciones vacías ni opciones iguales dentro de una pregunta. Sin errores JS en la carga; todos los `<script>` pasan `node --check`. Todos los recursos locales que carga la app están en `APP_SHELL` del service worker.

## Fallos corregidos (CACHE v465)
1. **`sinRepetidas`**: la expresión `/s+/g` (sin la barra) sustituía las «s» por espacios en vez de normalizar espacios/saltos de línea. Ahora es `/\s+/g`; una pregunta oficial y otra IA con espacios dobles o saltos de línea distintos se detectan como repetidas.
2. **`barajarOpcionesQ`**: no reconocía «Todos son correctos», «Ninguno…», «Ambos…» ni «Las tres…» (solo femenino). Ahora tampoco se barajan esas preguntas (antes la opción «Todos…» podía acabar en cualquier posición).

Comprobado: la corrección es por índice (`seleccionar`), marca ✅/❌ y pinta correcta/incorrecta; «Todas son correctas» y «A y B son correctas» se quedan en su sitio; el barajado conserva la correcta y reescribe la letra de «Respuesta correcta: X»; sin desbordamiento horizontal en móvil.

## Mejoras opcionales (no implementadas)
- **Barajado demasiado conservador**: ~1758 de 6952 preguntas (25 %) no se barajan porque el filtro salta con cualquier «todas/todos» dentro de una opción («El derecho a la educación de **todas** las personas»). Afinarlo para que solo salte con «Todas son correctas / Ninguna de las anteriores / A y B…» barajaría ~1650 preguntas más. Hay que mantener la detección de «a y b son correctas» en minúscula.
- **Preguntas repetidas en el banco**: 216 pares con el mismo enunciado y respuesta (el test ya las descarta al montarse, pero conviene limpiarlas del banco).
- **Referencias a letras sin cubrir**: opciones tipo «Solo la primera y la tercera» no se detectan; revisar a mano.
- **Erratas en opciones del banco** (p. ej. «Todas son cometidas.», «Hacer que se examine su ca4so.», «…ante esos acciones»): pasar un barrido de erratas.
- **Móvil**: los botones flotantes (micrófono y «?») tapan parte de la opción D y de la explicación; añadir `padding-bottom` al contenedor del test o mover los botones.
- **Cabecera «Tema»**: si la pregunta llega sin `temaId` se ve solo «Tema»; mostrar el tema por el prefijo del id (`N-…`).
- **Service worker**: los `.js` de datos usan «caché primero + actualizar en segundo plano», así que la primera apertura tras una versión nueva puede mezclar HTML nuevo con datos antiguos hasta recargar. Opción: usar la misma estrategia «red primero» que las páginas para `esquemas-datos/` o avisar «hay versión nueva, recargar».
- **Service worker**: `./expres-subrayado/bloques-t2.js` está duplicado en `APP_SHELL` (inofensivo).
- **Peso**: 20 MB de HTML (el banco va inline). Partir el banco en `preguntas/tN.js` cargados bajo demanda reduciría el arranque en móvil.
- La paginación «5 por página» es del banco IA (generación), no de la app: el test muestra una pregunta cada vez.
