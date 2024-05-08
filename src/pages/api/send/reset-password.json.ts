import type { APIRoute } from "astro";
import { Resend } from "resend";

/* 
    Requerimientos del endpoint y funcionamiento: 
    - Validar que el email del usuario recibido en el body existe en la base de datos
    - Si existe obtener el userId del usuario sino mandar un alerta.
    - crear una password unica autogenerada con Argon o libreria que respete este regex /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!@#$%^&*()_+<>?])[A-Za-z\d@$!%*?&]{8,}$/
    - Debemos actualizar la  password actual del usuario  por esta nueva autogenerada , la password en la base de datos debe estar encriptada con Argon.
    - Enviar un email al usuario con su nueva password en el cuerpo del email. La password debe ser la autogenerada (SIN ECNRIPTAR) y actualizada. 
    */

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const GET: APIRoute = async ({ params, request }) => {
    const send  = await resend.emails.send({
        from: 'fcolavini@southernhorizon.tech',
        to:['nfinocchi@southernhorizon.tech'],
        subject: 'Sample Email',
        html: '<p>Hola esto es una prueba con Resend</p>',
        text: 'Hola esto es una prueba'
    })

    // Si se envia 

    if(send.data){
        return new Response(
            JSON.stringify({
                message:send.data,
                status:200,
                statusText:"Correo enviado con exito"
            })
        )
    } else {
        // Si no lo puede enviar da un error
        return new Response(
            JSON.stringify({
                message:send.error,
                status:500,
                statusText:`
                    Hubo un problema al enviar el correo
                `

            })
        )
    }

  /*   return new Response(
        JSON.stringify({
            message:"Endpoint de prueba",
            status:200,
            statusText:"Endpoint de prueba"
        })
    ) */
}