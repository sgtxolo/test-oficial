// Tema 5 · bloque 23 · Reglamento (UE) 2024/1358 (Eurodac): apartados con círculo EX que no tenían ninguna pregunta (arts. 4.3 y 41.1;
// tema5/cobertura-marcas-t5.js, 17/10/2026) · 2 preguntas IA (5-ia-2101…2102), importantes por la marca EX.
// Uso: node prompts/herramientas/preguntas-t5-b23.js [--json <salida.json>]
const k = 'eur';
const Q = [
{k, r: 'Gestión operativa', a: 'art. 4.3', e: 'La Agencia eu-LISA será responsable de las siguientes funciones relacionadas con la Infraestructura de Comunicación. Señale la INCORRECTA:',
 o: ['supervisión.', 'seguridad.', 'coordinación de las relaciones entre los Estados miembros y el proveedor.', 'adquisición y renovación.'], c: 3,
 t: 'La Agencia eu-LISA será responsable de las siguientes funciones relacionadas con la Infraestructura de Comunicación: a) supervisión; b) seguridad; c) coordinación de las relaciones entre los Estados miembros y el proveedor.',
 p: 'La adquisición y renovación corresponde a la Comisión (apartado 4), junto con la ejecución del presupuesto y las cuestiones contractuales (marca EX).'},
{k, r: 'Conservación de los registros', a: 'art. 41.1', e: 'La Agencia eu-LISA llevará registros de todas las operaciones de tratamiento de datos que se lleven a cabo en Eurodac. En dichos registros se hará constar el objeto, la fecha y la hora del acceso, los datos transmitidos, los datos utilizados para una consulta y el nombre:',
 o: ['de la autoridad verificadora que haya autorizado la consulta y del Estado miembro de origen.', 'tanto de la unidad que los haya introducido o extraído como el de las personas responsables.', 'del Punto de Acceso Nacional y del funcionario de eu-LISA que haya validado la operación.', 'únicamente de la unidad que los haya introducido, sin datos de las personas responsables.'], c: 1,
 t: 'En dichos registros se hará constar el objeto, la fecha y la hora del acceso, los datos transmitidos, los datos utilizados para una consulta y el nombre tanto de la unidad que los haya introducido o extraído como el de las personas responsables.',
 p: 'Se registra el nombre de la unidad y el de las personas responsables (marca EX).'},
];
require('./preguntas-t5-lib.js').run({ bloque: 23, Q, arg: process.argv.slice(2) });
