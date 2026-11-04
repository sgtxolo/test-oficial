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

## Tercera tanda (CACHE v467): erratas del banco
- Herramienta nueva `prompts/herramientas/limpia-erratas-banco.js` (sustituciones de texto exacto con recuento; sin `--aplicar` solo cuenta).
- Corregidos 81 restos de importación: dígitos de nota al pie pegados dentro de palabras («obligat1orio», «ca4so», «aleg1ato», «pú1blica»…) y números de nota al final de frase («expulsión.3», «buque.5», «VIS.3»), más «de de», «administrativa administrativa», «Toda las opciones son correctas» → «Todas…» (21-32) y «O y D son correctas» → «C y D son correctas» (24-81; encaja con las opciones y la explicación).
- No tocados (necesitan el temario): 26-19 «Si y C son correctas.» (la correcta es B, «El derecho»; no se sabe qué letras quería decir); el texto OCR muy degradado de 21-32 («funcionario consultar», «pie de ofensa consulta»); y los números tras el punto en las **explicaciones** («art. 8 bis.1», «24 horas.24»), que en su mayoría son legítimos o necesitan revisión manual.

## Mejoras opcionales (no implementadas)
- **Preguntas repetidas en el banco**: 211 grupos (221 copias; 3 grupos más aparecieron al corregir erratas), todas oficiales entre sí. Listadas en `documentacion/REPETIDAS-BANCO-TEST.md`; sin borrar (decisión del usuario: las oficiales no se borran). El test ya las descarta al montarse.
- **Referencias a letras sin cubrir**: opciones tipo «Solo la primera y la tercera» no se detectan; revisar a mano.
- **Opciones de remisión con errata** (no se barajan gracias a una regla genérica, pero conviene corregirlas): 21-32 «Toda las opciones son correctas.», 24-81 «O y D son correctas.», 26-19 «Si y C son correctas.».
- **Erratas del banco**: ver sección «Tercera tanda».
- **Cabecera «Tema»**: si la pregunta llega sin `temaId` se ve solo «Tema»; mostrar el tema por el prefijo del id (`N-…`).
- **Service worker**: `./expres-subrayado/bloques-t2.js` está duplicado en `APP_SHELL` (inofensivo).
- **Peso**: 20 MB de HTML (el banco va inline). Partir el banco en `preguntas/tN.js` cargados bajo demanda reduciría el arranque en móvil.
- La paginación «5 por página» es del banco IA (generación), no de la app: el test muestra una pregunta cada vez.
