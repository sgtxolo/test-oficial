// Tema 14 · fase 2 de las marcas (25/10/2026): apartados con marca suya (EX) sin pregunta oficial (cobertura-marcas.js 14) → banco OFICIAL (14-261…).
// Uso: node prompts/herramientas/tema14/preguntas-marcas-t14.js [--check]
const RG = a => ['Reglamento de Organización y Funcionamiento del Defensor del Pueblo, aprobado por las Mesas del Congreso y del Senado, a propuesta del Defensor del Pueblo, en su reunión conjunta de 6 de abril de 1983', 'Reglamento del Defensor del Pueblo', a];
require('../preguntas-marcas-lib.js')({ T: 14, fuentes: ['tema14/temario.txt'], desdeOf: 261, desdeIA: 9000, Q: [
  { n: RG('Del Defensor del Pueblo'), a: 'art. 24', r: 'Estructura de la Secretaría General', e: 'La Secretaría General estará estructurada en dos servicios: el de Régimen Económico y el de:', c: 1,
    o: ['Régimen Jurídico, Estudios, Documentación y Publicaciones.', 'Régimen Interior, Estudios, Documentación y Publicaciones.', 'Régimen Interior, Personal, Documentación y Publicaciones.', 'Régimen Interior, Estudios, Registro y Archivo.'],
    t: 'La Secretaría General estará estructurada en dos servicios: el de Régimen Económico y el de Régimen Interior, Estudios, Documentación y Publicaciones.', p: 'Los dos servicios: Régimen Económico y Régimen Interior, Estudios, Documentación y Publicaciones.' },
  { n: RG('Del Defensor del Pueblo'), a: 'art. 37.1', r: 'Sanciones del personal', e: 'Las sanciones al personal al servicio del Defensor del Pueblo se impondrán y graduarán de acuerdo con:', c: 2,
    o: ['la mayor o menor antigüedad del funcionario en la Institución.', 'el mayor o menor perjuicio causado al servicio público.', 'la mayor o menor gravedad de la falta.', 'la mayor o menor reiteración de la conducta en el último año.'],
    t: 'Las sanciones se impondrán y graduarán de acuerdo con la mayor o menor gravedad de la falta, y serán las siguientes:', p: 'Graduación por la gravedad de la falta (leves, graves y muy graves).' },
] });
