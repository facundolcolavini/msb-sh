/* Funcion que saca del string el codigo  */
/* Ejemplo :
    Input: "lote-en-venta-en-san-antonio-de-padua-ficha-ms2CODIGOAOBTENER"
    Output: "CODIGOAOBTENER"
*/

export function getCode(str:string) {
    let code = str.split('-').pop();

    if (code?.includes('ms')) {
        code = code.split('ms')[1];
    }
    // Sacar el primer numero del codigo y devolver el resto 
    if (code?.match(/^\d/)) {
        code = code.slice(1);
    }
    return code;
} 