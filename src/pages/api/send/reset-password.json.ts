import { generatePassword } from "@/utils/get-password";
import type { APIRoute } from "astro";
import { User, db, eq } from "astro:db";
import { Argon2id } from "oslo/password";
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

export const PATCH: APIRoute = async ({ params, request }) => {
    const data = await request.json();
    const { email } = data;
    try {


        const foundUser = (
            await db.select().from(User).where(eq(User.email, email))
        ).at(0);

        //if user not found
        if (!foundUser) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "El email registrado no existe",
                }),
                {
                    status: 400,
                }
            );
        }

        //Genera una password unica autogenerada con una libreria que respete este regex /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!@#$%^&*()_+<>?])[A-Za-z\d@$!%*?&]{8,}$/
        const newPassword = generatePassword();
        // Actualizar la  password actual del usuario  por esta nueva autogenerada , la nueva password debe estar encriptada en la base de datos con Argon.
        const hashedPassword = await new Argon2id().hash(newPassword);
        const res = await db.update(User).set({
            password: hashedPassword,
            lastUpdate: Date.now()
        }).where(eq(User.id, foundUser.id));

        if (res) {
            //Acme <onboarding@resend.dev>
            const send = await resend.emails.send({
                from: 'Matias Szpira - Cambio de clave <onboarding@resend.dev>',
                to: [`${email}`],
                subject: 'Nueva contraseña generada',
                html: `
                <div style="
                background-color:#939B41;
                padding: 20px;
                color: white;
                border-radius: 10px;
                text-align: center;
                font-family: Arial, sans-serif;
                font-size: 20px;
                margin: 20px;
              ">
                <h1 >Restablecimiento de contraseña</h1>
                </div>
                <div style="
                background-color:#f8f9fa;
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                font-family: Arial;
                height: 100%;
                font-size: 20px;
                font-weight: bold;
                margin: 20px;
              "> 
           
              <p style="
                color: #6c757d;
                font-size: 18px;
                margin-bottom: 20px;
              ">Hola ${foundUser.firstName} ${foundUser.lastName},</p>
              <p style="
                color: #6c757d;
                font-size: 18px;
                margin-bottom: 20px;
              ">Hemos restablecido tu contraseña. Tu nueva contraseña es:</p>
              <p style="
                color: #dc3545;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
              ">${newPassword}</p>
              <p style="
                color: #6c757d;
                font-size: 18px;
                margin-bottom: 20px;
              ">Por favor, inicia sesión y cambia tu contraseña lo antes posible por seguridad.</p>
            </div>
            
                `,
                text: `Que tal tu nueva contraseña es : ${newPassword}`
            })

            // Si se envia 

            if (send.data) {
                return new Response(
                    JSON.stringify({
                        message: "Correo enviado con exito",
                        status: 200,
                        success: true,
                        id: send.data.id,
                    })
                )
            } else {
                // Si no lo puede enviar da un error
                return new Response(
                    JSON.stringify({
                        message: 'Hubo un problema al enviar el correo',
                        status: 500,
                        success: false,
                        statusText: send.error

                    })
                )
            }

        } else {
            throw new Error("No se pudo actualizar la contraseña")
        }

    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({
                message: error,
                success: false,
            }),
            {
                status: 404,
            }
        );
    }
}
