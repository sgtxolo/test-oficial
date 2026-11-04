# Auditoría de test-oficial-ingles.html (04/11/2026)

Probado con Playwright (Chromium, móvil 390×844 y 360×800): los 5 paneles (Inicio, Teoría, Test, Tablas, Perfil), Test del día completo (30 preguntas), Modo examen real, Cero fallos, simulacros cronometrados, modo oscuro y almacenamiento lleno. Además, análisis estático del código y del banco completo.
**No se ha cambiado nada**: solo se informa.

## Lo que está bien
- **Sin errores JavaScript** al cargar ni en ningún flujo; los 8 `<script>` pasan la comprobación de sintaxis.
- **Ligera y rápida**: 3 MB y carga en 0,35 s.
- **Objetivo de 200 preguntas por tema cumplido** en los 41 temas (mínimo 202, en el tema 19; máximo 356, en el 41). En total 9399 preguntas, 5280 de ellas IA.
- **Banco íntegro**: todas las preguntas tienen una respuesta válida (`a` dentro de rango), no hay opciones repetidas dentro de una pregunta y las explicaciones no contradicen la letra correcta.
- **Ids posicionales respetados**: `qid = "Q" + índice`, asignado al arrancar (`QUESTIONS.forEach(...)`), tal como exige CLAUDE.md. Dudas, reportes y estadísticas usan ese id.
- **Test del día**: 30 preguntas priorizadas. La corrección, el contador ✓/✗, la nota (22/30 → 73 %) y el historial cuadran.
- **Modo examen real** muy bien resuelto: navegación por número, «Marcar para revisar», botón **Entregar** que avisa de las preguntas en blanco y de las marcadas, y un **cronómetro con hora real** (no se retrasa con la pantalla bloqueada). Las preguntas en blanco no cuentan como fallo y las estadísticas guardan la respuesta definitiva.
- **Cero fallos**, guardar y salir, repasar las falladas y modo voz están presentes y sin errores.
- **Offline**: comparte el service worker; la app y su manifest están en la caché.
- **Modo oscuro** correcto. No hay desplazamiento horizontal salvo en «Tablas» (ver abajo).

## Fallos

### Graves
1. **Las opciones no se barajan nunca y la respuesta correcta está muy desequilibrada.** En todo el banco las respuestas correctas se reparten así: A 30 %, B 33 %, C 20 % y D 17 %. En las preguntas que no son IA, A+B suman el **78 %** (D solo el 9 %). Con la práctica se aprende «suele ser A o B» en vez de la gramática. La app de conocimientos sí baraja (`barajarOpcionesQ`); aquí `renderQuestion` pinta las opciones en el orden del banco. Al barajar hay que respetar el id posicional: se baraja solo la vista, el banco no se toca.
2. **Si el almacenamiento está lleno, la app se rompe.** `saveStateEN()` no tiene `try/catch`. Simulado: lanza `QuotaExceededError` sin capturar. Como se llama a mitad de `answer()`, la pregunta queda a medias: el marcador no se actualiza, no aparece «Siguiente →» y el test se queda bloqueado. La app de conocimientos ya lo protege.

### Medios
3. **«Tablas» se sale de la pantalla en el móvil.** La tabla maestra de Reported Speech mide unos 465 px en una pantalla de 390. Toda la página se desplaza en horizontal y las columnas 3 y 4 quedan cortadas.
4. **El cronómetro de los simulacros (Tests generales) se retrasa con la pantalla bloqueada.** `iniciarCronometroEN` resta 1 por cada tic de `setInterval`, y el móvil frena esos tics en segundo plano. El examen real ya lo hace bien con `Date.now()`; convendría usar lo mismo.
5. **Hay un carácter «>» suelto en la pantalla de resultado.** `id="resultPanel">>`: se ve un «>» encima del emoji del resultado.
6. **88 preguntas tienen 2 o 3 opciones** en vez de 4 (sobre todo en los temas 4, 41, 3 y 2). Por ejemplo, Q723 «He ___ his bike when he fell» tiene 3 opciones. Cambian la probabilidad de acertar por azar.
7. **62 preguntas repetidas** (mismo enunciado y misma respuesta), por ejemplo Q0 = Q2163 «If you heat ice, it ___.», Q200 = Q2116 y Q6706 = Q7772. El test no las descarta.

### Leves
8. **No se puede ampliar con los dedos en Android**: el viewport lleva `maximum-scale=1`.
9. **Explicaciones mínimas**: 117 preguntas tienen como explicación una sola palabra («IF.», «HAS.», «WAS.»), lo que no sirve para repasar.
10. **Faltan traducción y dificultad**: 1292 preguntas no tienen traducción (`tr`; 271 de ellas son IA) y 1199 no tienen dificultad (`dif`; 271 IA).
11. **La correcta es la opción más larga en 1971 preguntas** (983 IA). En gramática pesa menos que en la parte de leyes, pero la regla de las preguntas IA también aplica.
12. **La barra de progreso no llega al 100 %** en la última pregunta («Pregunta 30 de 30» con la barra al 97 %).
13. **Ids HTML repetidos en plantillas** (`qcard${a}`, `fb${a}`, `nav${a}` y `ia-explain-box-en` aparecen en dos plantillas). Hoy no chocan porque nunca se pintan a la vez, pero es frágil.
14. **Clave de Gemini en `localStorage`** en claro (igual que en la app de conocimientos).

## Prioridad recomendada
1. Barajar las opciones al mostrar cada pregunta, sin cambiar el banco ni los ids, con la misma lógica que la app de conocimientos (no barajar «All of them», «A and B»…).
2. `try/catch` y aviso en `saveStateEN()`.
3. Tabla de Reported Speech con desplazamiento propio en móvil.
4. Cronómetro de los simulacros con hora real, quitar el «>» suelto, permitir el zoom y llevar la barra al 100 %.
5. Banco (por temas): completar las 88 preguntas de 2–3 opciones, quitar las 62 repetidas por la vía que se decida (los ids son posicionales: **no se puede borrar**, hay que corregir en su sitio), y ampliar las 117 explicaciones de una palabra.

## Estado tras las correcciones (CACHE v470–v471)
Corregido y verificado con Playwright:
- **Opciones repartidas**: ahora A/B/C/D salen al ~25 % cada una. Se permutan al arrancar con una semilla fija por pregunta (el banco y los ids `Q<índice>` no cambian, y lo guardado en el historial sigue coincidiendo). No se baraja si una opción remite a otras («Both», «A and B»…) o si la explicación cita una letra. Los tests ya guardados antes del cambio pueden mostrar la opción elegida en otra posición al revisarlos.
- **Guardado seguro** (`saveStateEN` con `try/catch` y aviso en pantalla).
- **Tablas**: `.tbl-wrap` no tenía estilo; ahora desplaza dentro de la tabla y la página ya no se ensancha (390 px).
- **Cronómetro de simulacros** con hora real; **«>» suelto** eliminado; **barra al 100 %** en el resultado; **zoom con los dedos** (iPhone/Android) permitido.
- **Repetidas**: 59 se marcan y se excluyen de los bancos (no se borran: ids posicionales).
- Herramienta nueva `prompts/herramientas/ingles-banco.js` (listar y aplicar ediciones por referencia B/G/E).

**Pendiente (sesiones en marcha; mañana unir sus ramas)**: se lanzaron 9 sesiones que solo suben JSON de ediciones a `documentacion/ediciones-ingles/`:
`claude/ingles-tr-a|b|c` (traducciones, 1021), `claude/ingles-dif-a|b` (dificultad, 928), `claude/ingles-fb-a|b|c` (explicaciones de 1–2 palabras, 1182) y `claude/ingles-opts` (completar 75 preguntas de 2–3 opciones).
Para unirlas: bajar cada rama, copiar su JSON, `node prompts/herramientas/ingles-banco.js aplicar <json>` (sin y con `--aplicar`), `node --check`, subir CACHE, commit y push.

**No se hará**: la correcta más larga en 1971 preguntas de gramática (alargar distractores de una palabra empeoraría la pregunta; con las opciones repartidas el sesgo de posición ya no existe) y la clave de Gemini sin cifrar (app personal sin servidor).
