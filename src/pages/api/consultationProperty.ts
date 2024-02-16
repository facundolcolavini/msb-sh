import type { APIRoute } from "astro";

// POST CONSULTA 
export const POST: APIRoute  = async ({ request }) => {
    const body = await request.json();
    const { INM, APIK } = import.meta.env;
    if (!INM || !APIK) {
        throw new Error('Se requieren las claves INM y APIK en el archivo .env');
      }

    try {
        const response = await fetch (`https://xintel.com.ar/api?json=consultas&inm=${INM}&apiK=${APIK}`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify({
                json: 'consultas',
                method: 'POST',
                nombre: body.nombre,
                apellido: body.apellido,
                email: body.email,
                telefono: body.telefono,
                comentario: body.comentario,
                id: body.id,
                codsuc: body.codsuc,
                tipo:  body.tipo,
                inm: INM,
                apik: APIK
            })
        });
        
        return new Response( JSON.stringify({ response: response }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};