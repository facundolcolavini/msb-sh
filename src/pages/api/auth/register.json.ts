import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { Resend } from 'resend';
import { lucia } from "../../../auth";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST(context: APIContext): Promise<Response> {
  
  //Parse the form data
  const formData = await context.request.json()
  const { password, email, firstName, lastName, url } = formData;
  const logo = url + '/logo.png'
  //Validate the form data
  //search the user
  try {


    const foundUser = (
      await db.select().from(User).where(eq(User.email, email))
    ).at(0);

    //if user not found
    if (foundUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "El email utilizado ya existe, por favor intenta con otro email.",
        }),
        {
          status: 400,
        }
      );
    }

    if (!password || !email) {
      return new Response(
        JSON.stringify({
          message: `${!email ? "email, " : ""}${!password ? "password, " : ""} son campos requeridos.`,
          success: false,
        }),
        {
          status: 400,
        }
      );
    }

    // Validate email with regex pattern 
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!@#$%^&*()_+<>?])[A-Za-z\d@$!%*?&]{8,50}$/
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (typeof email !== "string" || !emailPattern.test(email.trim())) {
      return new Response(
        JSON.stringify(
          {
            message: "El email debe de tener un formato válido",
            success: false
          }), {
        status: 400,
      });
    }

    if (!regexPassword.test(password)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "La contraseña debe tener entre 8 y 50 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial.",
        }),
        {
          status: 400,
        }
      );
    }
    //minimo 8 caracteres y maximo 50. 
    if (password.length < 8 || password.length > 50) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "La contraseña debe tener entre 8 y 50 caracteres",
        }),
        {
          status: 400,
        }
      );
    }

    // Insert user into db
    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password);

    const res = await db.insert(User).values([
      {
        id: userId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
        creationDate: Date.now(),
        lastUpdate: Date.now(),
      },
    ]);
    if (!res) {
      return new Response(
        JSON.stringify({
          message: ` Hubo un problema al crear tu cuenta, por favor intenta de nuevo.`,
          success: false,
        }),
        {
          status: 500,
        }
      );
    }
    // Generate session
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    if (res) {
      const send = await resend.emails.send({
        from: 'Matias Szpira - Bienvenida  <onboarding@resend.dev>',
        to: [`${email}`],
        subject: 'Bienvenido a la plataforma',

        html: `
        <div style="
          background-color: #939B41;
          color: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          font-family: Arial;
          font-size: 20px;
          font-weight: bold;
          margin: 20px;
        "> 
        <h1> Bienvenido a la plataforma </h1>
        </div>
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: Arial;
          font-size: 20px;
          font-weight: bold;
          margin: 20px;
          border-radius: 10px;
          background-color: white;
          color: black;
        ">
        <div>
          <div style="
            font-size: 30px;
            font-weight: bold;
            color: #1B1B1B;
          ">Cuenta creada con éxito</div>
          <p style="
            font-size: 20px;
            color: gray;
          ">Hola, ${firstName}</p>
          <p style="
            font-size: 20px;
            color: gray;
          ">Te damos la bienvenida a nuestra plataforma, tu cuenta ha sido creada con éxito.</p>
          <p style="
            font-size: 20px;
            color: gray;
          ">Por favor logueate en la plataforma para comenzar a disfrutar de nuestros servicios.</p>
          <p style="
            font-size: 20px;
            color: gray;
          ">
          Gracias por confiar en nosotros.
          </p>
          <p style=" 
            font-size: 20px;
            color: #939B41;
          ">
            Matias Szpira
          </p>
          <a href="${url}" style="
            background-color: #4E5A2B;
            color: white;
            padding: 10px;
            border-radius: 10px;
            text-decoration: none;
            margin-top: 20px;
            display: inline-block;
          ">Iniciar sesión</a>
        </div>
        </div>
        `,
        text: ` 
        Hola , ${firstName}
        Te damos la bienvenida a nuestra plataforma, tu cuenta ha sido creada con éxito.
      `
      })
      if (send.data) {
        return new Response(
          JSON.stringify({
            message: "Gracias por registrarte, revisa tu correo para confirmar tu cuenta.",

            success: true,
            id: send.data.id,
          }), {
          status: 200
        }
        )
      } else {
        // Si no lo puede enviar da un error
        return new Response(
          JSON.stringify({
            message: 'Hubo un problema al enviar el correo',
            success: false,
            statusText: send.error

          }), {
          status: 500
        }
        )
      }
    } else {
      throw new Error("Hubo un problema al registrar tu cuenta, por favor intenta de nuevo.");
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
