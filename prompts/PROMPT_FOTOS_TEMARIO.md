# PROMPT — Pasar fotos del temario al esquema, tal cual las tengo marcadas

Te voy a pasar **fotos de mi temario en papel** (Prefortia, Tomo 2, Ascenso a Oficial) con mi subrayado, mis cuadrados, mis círculos, mis flechas y mis anotaciones. Quiero que lo dejes en `esquemas.html` **exactamente como está en la foto**. La foto manda sobre el PDF con OCR: el PDF solo te sirve para comprobar el texto, nunca para decidir colores ni marcas.

## Qué quiero que hagas con cada foto
1. **Texto literal.** Copia el artículo palabra por palabra, con su numeración (1., 2., a), b)…). Si la foto salta apartados, pon «(…)» solo donde realmente se omite algo. Si la foto está girada, léela girada.
2. **Colores de cada palabra, como el subrayado de la foto** (clases del esquema):
   - naranja → `m-destacable`
   - verde → `m-autoridad` (órganos y autoridades)
   - morado/lila → `m-accion` (verbos: «podrá adoptar», «deberá», «será»…)
   - amarillo → `m-personalizado`
   - azul claro → `m-plazo` (plazos)
   - raya roja bajo la palabra → `<u class="m-clave">`
   - Palabras sin marcar en la foto → sin marcar. No añadas ni quites subrayado por tu cuenta.
   - Junta las palabras contiguas del mismo color en un solo `<mark>`.
3. **Cuadrados** (azul `m-caja`, rojo `m-caja ro`), **círculos** (rojo `m-circulo`, azul `m-circulo az`) y **asterisco rojo** (`m-ast`): en las mismas palabras que en la foto.
4. **Flechas sencillas** junto a una palabra o frase (`m-flecha`, o la flecha alrededor del texto del menú «Subrayar la selección como…»). Las flechas largas dibujadas por la página no se copian: dime cuáles hay y dónde, y lo vemos aparte.
5. **Cajitas** (recuadros con listas, p. ej. proporcionalidad / efectividad / menor onerosidad): recréalas como recuadro redondeado con su lista y los mismos colores y cuadrados.
6. **Anotaciones a mano** («OP», «15 días siguiente adopción», «No sustitución», «sanidad / higiene o seguridad», coletillas y siglas mnemotécnicas): ponlas como nota corta junto al texto al que acompañan. Si no se lee bien, transcribe lo que veas y márcalo con «(?)».
7. **Sello «PREGUNTA EXAMEN»**: si lo lleva el artículo o el apartado, déjalo señalado (etiqueta o marca) para que se vea que ha caído en examen.

## Orden de trabajo: este prompt va DESPUÉS del examinador
El tema ya pasó por el prompt del examinador: banco de preguntas verificado y esquema base con las respuestas de los tests marcadas (`m-resp`, enlazadas a sus preguntas). Estas fotos son el **paso de acabado**: dejan el esquema exactamente como mi temario en papel.

## Dónde y cómo
- **Parte siempre del esquema que ya existe** en `esquemas.html` (`articuloResp("Artículo N — …")`). **No reescribas el artículo desde cero**: aplica sobre el texto existente mi subrayado, cuadrados, círculos, flechas, cajitas y anotaciones de la foto. Conserva **todas las respuestas de test (`m-resp`) y su enlace con las preguntas**, la lista de respuestas del `articuloResp` y los huecos «(…)» que ya estén bien.
- **Si la foto y el esquema discrepan:** la foto manda en colores y marcas; el texto sigue siendo el oficial ya verificado. Si el texto difiere de verdad (palabra distinta, apartado que falta), no lo cambies en silencio: anótalo en el resumen final.
- **Si el artículo o apartado no está en el esquema** (p. ej. un punto que faltaba), créalo desde la foto en su orden, sin duplicar ni tocar los demás apartados.
- Respeta el estilo del esquema (ver `PROMPT_ESQUEMAS.md`).
- No borres ni cambies preguntas oficiales ni de IA de la app; si ves una incoherencia con la foto, avísame.

## Cómo trabajar (por fases: NO hagas nada hasta que yo te lo diga)
**Fase 1 — Recepción.** Te mandaré las fotos por tandas (hasta 19 a la vez), puede que un tema de 100 páginas o más. Mientras tanto **no toques `esquemas.html`, no hagas commit ni push y no empieces el esquema**. En cada tanda solo:
- guarda las fotos en una carpeta del proyecto (p. ej. `prompts/temario-fotos/TemaN/`, numeradas en el orden en que llegan) para no perderlas;
- responde en una línea: «Recibidas X fotos (total Y)», y avisa solo si alguna no se lee bien (borrosa, sombra, marca ambigua) para que la repita;
- no transcribas ni resumas todavía.

**Fase 2 — Esquema.** Solo cuando yo escriba algo como «ya he terminado el temario, hazme el esquema», procesa **todas** las fotos en orden, una a una, con las reglas de arriba, y deja el tema completo en `esquemas.html`.

**Al terminar la fase 2:** haz **commit y push** a origin y dame un **resumen en español** con los artículos añadidos o corregidos, las dudas, y las flechas o anotaciones que has dejado fuera. Si una foto sigue sin leerse bien, no adivines: dime cuál es.

Responde siempre en español.
