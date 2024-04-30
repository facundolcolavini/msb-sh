import type { APIContext } from "astro";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

import { db, eq, User } from "astro:db";
import { lucia } from "../../../auth";

export async function POST(context: APIContext): Promise<Response> {
  //Parse the form data
  const formData = await context.request.json()
  const { password, email, firstName ,lastName } = formData;
  //Validate the form data
  //search the user
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
  
  if (typeof email !== "string" || !emailPattern.test(email.trim()) ) {
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

  await db.insert(User).values([
    {
      id: userId,
      email:email,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
      creationDate: Date.now(),
      lastUpdate: Date.now(),
    },
  ]);

  // Generate session
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return new Response(
    JSON.stringify({
      success: true,
      message: "Creación de cuenta exitosa",
    }),
    {
      status: 200,
    }
  );
}
