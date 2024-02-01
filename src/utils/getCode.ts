/* Funcion que saca del string el codigo  */
/* Ejemplo : 
    Input: "lote-en-venta-en-san-antonio-de-padua-ficha-ms2CODIGOAOBTENER" || edificio-tucuman-1000-en-moron-norte-morn-emprendimiento-44 o tambien condominio-soler-en--ituzaing-norte-ituzaing-norte-emprendimiento-63
    Output: "CODIGOAOBTENER" || 44
*/

export function getCode(str: string): string {
    // Divide la cadena en segmentos usando guiones ("-")
    const segments = str.split('-');
  
    // Encuentra el último segmento que es un número o contiene 'ms'
    const lastSegment = segments.reverse().find(segment => segment.match(/^\d/) || segment.includes('ms'));
  
    let code = '';
  
    if (lastSegment) {
      // Si el último segmento contiene 'ms', extrae el código después de 'ms'
      if (lastSegment.includes('ms')) {
        code = lastSegment.split('ms')[1];
      } else {
        code = lastSegment;
      }
  
      // Elimina el primer número del código
      if (code.match(/^\d/)) {
        code = code.slice(1);
      }
  
      // Elimina el último número del código
      if (code.match(/\d$/)) {
        code = code.slice(0, -1);
      }
    }
  
    console.log(code);
    return code;
  }
  