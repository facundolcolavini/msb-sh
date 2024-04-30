import type { APIRoute } from "astro";
import { Session, User, db, eq } from "astro:db";

export const PATCH: APIRoute = async ({ params, request }) => {
  const { firstName, lastName, /* password */ phone, phoneAlternative, street, addressNumber, location } = await request.json();
  const id = params.id
  /* let newPassword: string; */
  // Handler de los campos requeridos para el registro 
  if (!firstName || !lastName) {
    return new Response(
      JSON.stringify({
        message: `${!firstName ? "Nombre, " : ""}${!lastName ? "Apellido, " : ""} son campos requeridos.`,
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  if (!id) {
    return new Response(
      JSON.stringify({
        message: "El id del usuario es requerido.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  try {
    const user = await db.select().from(User).where(eq(User.id, id));
    console.log(user)
    if (!user) {
      throw new Error("El usuario no existe, por favor verifique la información.");
    }

    const res = await db.update(User).set({
      firstName,
      lastName,
      phone,
      street,
      addressNumber,
      phoneAlternative,
      location,
      lastUpdate: Date.now()
    }).where(eq(User.id, id));

    if (res) {
      return new Response(
        JSON.stringify({
          message: "¡Tus cambios se guardaron con éxito!",
          success: true,
        })
      );
    } else {
      throw new Error("prob, bob");
    }
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: e,
        success: false,
      }),
      {
        status: 404,
      }
    );
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  const id = params.id

  if (!id) {
    return new Response(
      JSON.stringify({
        message: "Id del usuario es requerido.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  try {
    const userSession = await db.delete(Session).where(eq(Session.userId, id));
    const user = await db.delete(User).where(eq(User.id, id));
    if (user && userSession) {
      return new Response(
        JSON.stringify({
          message: "Cuenta eliminada correctamente.",
          success: true,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "No se pudo eliminar la cuenta.",
          success: false
        }),
        { status: 404 }
      )
    }
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: e,
        success: false,
      }),
      {
        status: 404,
      }
    );
  }
};