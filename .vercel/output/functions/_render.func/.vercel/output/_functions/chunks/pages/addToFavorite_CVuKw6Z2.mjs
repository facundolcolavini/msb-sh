import { d as db, F as Favorite, U as UserTAuth } from './_id__BW89SIC6.mjs';
import { eq } from '@astrojs/db/dist/runtime/config.js';

const POST = async ({ request }) => {
  const data = await request.json();
  const { userId, publicationId, publicationSuc, isEntrepreneurshipPublic = false } = data;
  if (!publicationId || !publicationSuc) {
    return new Response(
      JSON.stringify({
        message: "La propiedad que intenta agregar a su lista de favoritos no existe.",
        success: false
      }),
      {
        status: 404
      }
    );
  }
  const favorite = (await db.select().from(Favorite).where(eq(Favorite.publicationId, publicationId))).at(0);
  if (favorite) {
    return new Response(
      JSON.stringify({
        message: "La propiedad ya esta en favoritos.",
        success: false
      }),
      {
        status: 404
      }
    );
  }
  const user = (await db.select().from(UserTAuth).where(eq(UserTAuth.id, userId))).at(0);
  if (!userId || !user) {
    return new Response(
      JSON.stringify({
        message: "Por favor registrese para poder agregar la propiedad a favoritos.",
        success: false
      }),
      {
        status: 404
      }
    );
  }
  try {
    const res = await db.insert(Favorite).values({
      userId: Number(userId),
      publicationId,
      publicationSuc,
      isEntrepreneurshipPublic
    });
    if (res) {
      return new Response(
        JSON.stringify({
          message: "Agregado a favoritos.",
          success: true
        })
      );
    } else {
      throw new Error("Ocurrio un problema al agregar la propiedad a favoritos.");
    }
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: e,
        success: false
      }),
      {
        status: 404
      }
    );
  }
};

export { POST };
