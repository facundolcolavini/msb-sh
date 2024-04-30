import { verify } from "@node-rs/argon2";
import type { APIRoute } from "astro";
import { User, db, eq } from "astro:db";
import { Argon2id } from "oslo/password";


export const PATCH: APIRoute = async ({ request }) => {
  const { currentPassword, confirmPassword, password, id } = await request.json();

 
  try {

    const foundUser = (
      await db.select().from(User).where(eq(User.id, id))
    ).at(0);
  
    if (!foundUser) {
      return new Response(
        JSON.stringify({
          message: "Usuario no encontrado",
          success: false,
        }),
        {
          status: 404,
        }
      );
    }
  
    // Check if the current password is correct
    const validPassword = currentPassword ? await verify(foundUser.password as string, currentPassword) : false;
  
    if (!validPassword) {
      return new Response(
        JSON.stringify({
          message: "La contraseña actual no es correcta.",
          success: false,
        }),
        {
          status: 400,
        }
      );
    }
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
  
    if (confirmPassword !== password) {
      return new Response(
        JSON.stringify({
          message: "Las contraseñas no coinciden por favor verifique la información.",
          success: false,
        }),
        {
          status: 400,
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
  


    const hashedPassword = await new Argon2id().hash(password);
    const res = await db.update(User).set({
      password: hashedPassword,
      lastUpdate: Date.now()
    }).where(eq(User.id, id));

    if (res) {
      return new Response(
        JSON.stringify({
          message: "Contraseña actualizada correctamente",
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