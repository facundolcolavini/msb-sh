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

    if (typeof password !== "string" || password.length < 4) {
      return new Response(
        JSON.stringify(
          {
            message: "La contraseña debe de contener 4 caracteres de largo",
            success: false
          }), {
        status: 400,
      });
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
      <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <div class="text-xl font-medium text-black">Cuenta creada con éxito</div>
        <p class="text-gray-500">Hola, ${firstName}</p>
        <p class="text-gray-500">Te damos la bienvenida a nuestra plataforma, tu cuenta ha sido creada con éxito.</p>
        <p class="text-gray-500">Por favor logueate en la plataforma para comenzar a disfrutar de nuestros servicios.</p>
        <a href="${url}" class="mt-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Iniciar sesión</a>
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
