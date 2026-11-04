# Mejoras de la app de test de conocimientos (revisión 04/11/2026)

Revisión de `test-oficial-conocimiento.html` con Playwright (Chromium, móvil 390×844, escala 1).
Banco cargado: 6952 preguntas, todas con 4 opciones, `correcta` válida, sin ids repetidos, sin opciones vacías ni opciones iguales dentro de una pregunta. Sin errores JS en la carga; todos los `<script>` pasan `node --check`. Todos los recursos locales que carga la app están en `APP_SHELL` del service worker.

## Fallos corregidos (CACHE v465)
1. **`sinRepetidas`**: la expresión `/s+/g` (sin la barra) sustituía las «s» por espacios en vez de normalizar espacios/saltos de línea. Ahora es `/\s+/g`; una pregunta oficial y otra IA con espacios dobles o saltos de línea distintos se detectan como repetidas.
2. **`barajarOpcionesQ`**: no reconocía «Todos son correctos», «Ninguno…», «Ambos…» ni «Las tres…» (solo femenino). Ahora tampoco se barajan esas preguntas (antes la opción «Todos…» podía acabar en cualquier posición).

Comprobado: la corrección es por índice (`seleccionar`), marca ✅/❌ y pinta correcta/incorrecta; «Todas son correctas» y «A y B son correctas» se quedan en su sitio; el barajado conserva la correcta y reescribe la letra de «Respuesta correcta: X»; sin desbordamiento horizontal en móvil.

## Segunda tanda (CACHE v466)
3. **Barajado afinado** (`opcionRemite`): «Todas/Todos/Ninguna/Ninguno» solo bloquea el barajado si está al principio de la opción y remite a otras («Todas son correctas», «Ninguna de las anteriores»…); «A y B» en mayúsculas o «a y b son correctas»; «Es/Son correcta(s)» en opciones cortas. Probado contra las 6952 preguntas: **198 preguntas más se barajan** (todas eran falsos positivos como «el derecho de todas las personas») y 0 preguntas nuevas dejan de barajarse. Ojo: la estimación anterior de ~1650 era errónea; la mayoría de las ~1775 que siguen sin barajar son «Todas son correctas» de verdad.
4. **Móvil**: `.q-wrap` pasa de 30 px a 130 px de relleno inferior; al hacer scroll al final, la explicación queda por encima del micrófono flotante.
5. **Offline**: el service worker sirve los `.js` con «red primero» (con espera de 4 s y caída a la copia guardada), igual que las páginas, para no mezclar HTML nuevo con datos antiguos. Probado con Playwright sobre http: se instala, controla la página y recarga sin red con el banco (27 temas) y las citas cargados.

## Mejoras opcionales (no implementadas)
- **Preguntas repetidas en el banco**: 216 pares con el mismo enunciado y respuesta (el test ya las descarta al montarse, pero conviene limpiarlas del banco).
- **Referencias a letras sin cubrir**: opciones tipo «Solo la primera y la tercera» no se detectan; revisar a mano.
- **Opciones de remisión con errata** (no se barajan gracias a una regla genérica, pero conviene corregirlas): 21-32 «Toda las opciones son correctas.», 24-81 «O y D son correctas.», 26-19 «Si y C son correctas.».
- **Erratas en opciones del banco** (p. ej. «Todas son cometidas.», «Hacer que se examine su ca4so.», «…ante esos acciones»): pasar un barrido de erratas.
- **Cabecera «Tema»**: si la pregunta llega sin `temaId` se ve solo «Tema»; mostrar el tema por el prefijo del id (`N-…`).
- **Service worker**: `./expres-subrayado/bloques-t2.js` está duplicado en `APP_SHELL` (inofensivo).
- **Peso**: 20 MB de HTML (el banco va inline). Partir el banco en `preguntas/tN.js` cargados bajo demanda reduciría el arranque en móvil.
- La paginación «5 por página» es del banco IA (generación), no de la app: el test muestra una pregunta cada vez.
