/* import type { APIRoute } from "astro";
import { User, db, eq } from "astro:db";
import bcrypt from 'bcrypt';
import sanitize from "sanitize-html";

export const DELETE: APIRoute = async ({ params }) => {
  const id = params.id

  if (!id) {
    return new Response(
      JSON.stringify({
        message: "Please provide all required fields.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  try {
    const res = await db.delete(User).where(eq(User.id, id));
    if (res) {
      return new Response(null, { status: 204 });
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

export const PATCH: APIRoute = async ({ params, request }) => {
  const { username,name, lastName, password, email, phone, alternativePhone } = await request.json();
  const id = Number(params.id);
  let newPassword: string;
  // Handler de los campos requeridos para el registro 
  if (!name || !lastName || !email || !password) {
    return new Response(
      JSON.stringify({
        message: `${!name ? "name, " : ""}${!lastName ? "lastName, " : ""}${!email ? "email, " : ""}${!password ? "password, " : ""} son campos requeridos.`,
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
        message: "Please provide all required fields.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  try {

    // Desencriptar la contraseña del usuario que esta en la base de datos para compararla con la que se esta enviando en el formulario
    const user = await db.select().from(User).where(eq(User.id, id));
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    // Si la contraseña no es igual a la que esta en la base de datos, encriptar la nueva contraseña y guardarla 
    if (!isMatch) {
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(sanitize(password), salt);
    }
    // Si la contraseña es igual  entonces no cambiarla
    else {
      newPassword = user[0].password;
    }

    const res = await db.update(User).set({
      name,
      username,
      lastName,
      password: newPassword,
      email,
      phone,
      alternativePhone,
      lastUpdate: Date.now()
    }).where(eq(User.id, id));

    if (res) {
      return new Response(
        JSON.stringify({
          message: "success",
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

export const GET: APIRoute = async ({ params }) => {
  const id = Number(params.id);
  if (!id) {
    return new Response(
      JSON.stringify({
        message: "Please provide all required fields.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  try {
    const res = await db.select().from(User).where(eq(User.id, id));

    if (res) {
      return new Response(JSON.stringify(res), {
        headers: { "content-type": "application/json" },
      });
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
 */