import type { APIRoute } from "astro";
import { Favorites, UserTAuths, db, eq } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { userId, publicationId, publicationSuc, isEntrepreneurshipPublic = false } = data;

  // Handler de los campos requeridos para el registro
  if (!publicationId || !publicationSuc) {
    return new Response(
      JSON.stringify({
        message: "La propiedad que intenta agregar a su lista de favoritos no existe.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  // Verificar si la propiedad ya esta en favoritos y que no se pueda agregar dos veces
  // y verificar si el usuario existe en paralelo
  const [favorite, user] = await Promise.all([
    db.select().from(Favorites).where(eq(Favorites.publicationId, publicationId)).at(0),
    (await db.select().from(UserTAuths).where(eq(UserTAuths.id, userId))).at(0),
  ]);

  if (favorite) {
    return new Response(
      JSON.stringify({
        message: "La propiedad ya esta en favoritos.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  if (!userId || !user) {
    return new Response(
      JSON.stringify({
        message: "Por favor registrese para poder agregar la propiedad a favoritos.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  try {
    const res = await db.insert(Favorites).values({
      userId: Number(userId),
      publicationId: publicationId,
      publicationSuc: publicationSuc,
      isEntrepreneurshipPublic: isEntrepreneurshipPublic,
    });

    if (res) {
      return new Response(
        JSON.stringify({
          message: "Agregado a favoritos.",
          success: true,
        })
      );
    } else {
      throw new Error("Ocurrio un problema al agregar la propiedad a favoritos.");
    }
  } catch (e) {
    console.log(JSON.stringify(e));
    return new Response(
      JSON.stringify({
        message: (e as Error).message,
        success: false,
      }),
      {
        status: 404,
      }
    );
  }
};