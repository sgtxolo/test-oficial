const fs=require('fs');const f='prompts/herramientas/preguntas-t25r-lib.js';let s=fs.readFileSync(f,'utf8');
const a=s.indexOf('const NORMAS = {'), b=s.indexOf('};',a)+2;
const N=`const NORMAS = {
  loe: ['Ley Orgánica 2/1986, de 13 de marzo, de Fuerzas y Cuerpos de Seguridad', 'Ley Orgánica 2/1986, de Fuerzas y Cuerpos de Seguridad', 'Ley Orgánica 2/1986, de Fuerzas y Cuerpos de Seguridad'],
  l31: ['Ley 31/2010, de 27 de julio, sobre simplificación del intercambio de información e inteligencia entre los servicios de seguridad de los Estados miembros de la Unión Europea', 'Ley 31/2010, de 27 de julio, sobre simplificación del intercambio de información e inteligencia entre los', 'Ley 31/2010, de 27 de julio, sobre simplificación del intercambio de información e inteligencia entre los'],
  rd: ['Real Decreto 1087/2010, de 3 de septiembre, por el que se aprueba el Reglamento que regula las Juntas Locales de Seguridad', 'Real Decreto 1087/2010, por el que se aprueba el Reglamento que regula las Juntas Locales de Seguridad', 'Real Decreto 1087/2010, por el que se aprueba el Reglamento que regula las Juntas Locales de Seguridad'],
  eur: ['Reglamento (UE) 2016/794 del Parlamento Europeo y del Consejo, de 11 de mayo de 2016, relativo a la Agencia de la Unión Europea para la Cooperación Policial (Europol)', 'Reglamento (UE) 2016/794 de Europol', 'Reglamento (UE) 2016/794, relativo a la Agencia de la Unión Europea para la Cooperación Policial (EUROPOL)'],
  int: ['Estatuto de la Organización Internacional de Policía Criminal (INTERPOL)', 'Estatuto de INTERPOL', 'General / Coordinación y Cooperación Policial'],
};`;
s=s.slice(0,a)+N+s.slice(b);
s=s.replace(/^\/\/ Librería.*\n/,'// Librería de las preguntas IA del Tema 25 (Coordinación y Cooperación Policial: LO 2/1986, Ley 31/2010, RD 1087/2010, Reglamento Europol, Estatuto INTERPOL; sobre lo subrayado en mi PDF). Normas k: loe, l31, rd, eur, int.\n');
fs.writeFileSync(f,s);
