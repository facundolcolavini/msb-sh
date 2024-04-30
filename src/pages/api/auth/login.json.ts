import { lucia } from "@/auth";
import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";
import { Argon2id } from "oslo/password";

export async function POST(context: APIContext): Promise<Response> {
  /*   console.log(context.locals.session) */
  //read the form data
  const formData = await context.request.json()
  const { password, email } = formData;

  //validate the data

  // Handler de los campos requeridos para el registro 
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
  const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //If password is not valid
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!@#\$%\^&*()_+<>?-])[A-Za-z\d@\$!%*?-]{8,}$/;

  if (!regexPassword.test(password.trim())) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial.",
      }),
      {
        status: 400,
      }
    );
  }

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
  //search the user
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
  // verify if user has password
  if (!foundUser.password) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "La contraseña no coincide con el email registrado",
      }),
      {
        status: 400,
      }
    );
  }

  const validPassword = await new Argon2id().verify(
    foundUser.password,
    password
  );

  //If password is not valid
  if (!validPassword) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Contraseña incorrecta",
      }),
      {
        status: 400,
      }
    );
  }

  //Password is valid, user can log in

  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  console.log(sessionCookie)
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return new Response(
    JSON.stringify({
      success: true,
      message: "Inicio de sesión exitoso",
    }),
    {
      status: 200,
    }
  );
}
