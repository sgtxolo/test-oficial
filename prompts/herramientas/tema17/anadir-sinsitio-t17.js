// Tema 17 · «sin sitio» clase 1 (1/11/2026): Segundo y Cuarto de las «Instrucciones» (subrayados en la pág. 47 de su PDF) no estaban en el esquema.
const E = require('../anade-parrafo.js')();
const CAB = 'Instrucciones (texto leído en la imagen de tu temario subrayado)';
E.inserta({ cab: CAB, donde: { antes: '<p>Tercera. Derogación' },
  html: '<p>Segunda. Coordinación con otras administraciones. Los <mark class="m-autoridad">Delegados del Gobierno</mark> en las Comunidades Autónomas y en las ciudades autónomas de Ceuta y Melilla y los <mark class="m-autoridad">Subdelegados del Gobierno</mark> en sus respectivos ámbitos de competencia <mark class="m-accion">establecerán contacto con</mark> las correspondientes <mark class="m-autoridad">Autoridades autonómicas y municipales</mark> a fin de <mark class="m-personalizado">trasladarles oficialmente</mark> el contenido de la presente Instrucción.</p>' });
E.inserta({ cab: CAB, donde: 'fin',
  html: '<p>Cuarto. Entrada en vigor. La presente Instrucción <mark class="m-destacable">surtirá plenos efectos</mark> <mark class="m-plazo">a partir del día siguiente de su publicación.</mark></p>' });
E.guarda();
