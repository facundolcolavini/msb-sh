
// Ejemplo de la entrada y la salida de la función parseQueryToObjt
// Ejemplo de entrada: 'q=prueba+de+query&limit=10'
// Ejemplo de salida: {q: 'prueba de query', limit: '10'}
export const parseQueryToObjt = (query : string = '') => {   
    // Delete + and replace with space
    query = query.replace(/\+/g, ' ')
    const queryObj = query.split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=')
        return {...acc, [key]: value}
    }, {})
    return queryObj
}
// Funcion para parsear los valores de los query params 
// Ejemplo de la entrada y la salida de la función parseQueryString
// Ejemplo de entrada: 'prueba+de+query'
// Ejemplo de salida: 'prueba de query'


export const parseQueryString = (url: string): string => {
  const queryParams = new URLSearchParams(url);

  const cleanedValues: string[] = [];

  queryParams.forEach((value) => {
    // Decodificar y reemplazar los símbolos "+" con espacios
    const cleanedValue = decodeURIComponent(value.replace(/\+/g, ' '));

    cleanedValues.push(cleanedValue);
  });

  return cleanedValues.join(' ');
};
