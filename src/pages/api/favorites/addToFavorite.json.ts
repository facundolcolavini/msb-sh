import type { APIRoute } from "astro";
import { Favorites, User, db, eq } from "astro:db";

export const POST: APIRoute = async ({ request ,cookies}) => {
  const data = await request.json();
  const { userId, publicationId, publicationSuc, isEntrepreneurshipPublic } = data;

  // Handler de los campos requeridos para el registro 
  if (!userId ) {
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

  // Obtener el listado de favoritos del usuario 
  const favorites = await db.select().from(Favorites).where(eq(Favorites.userId, userId));

  // Verificar si la propiedad ya esta en favoritos y si la propiedad existe eliminarla
  const favorite = favorites.find((fav) => fav.publicationId === publicationId);

  if (favorite) {
    const res = await db.delete(Favorites).where(eq(Favorites.publicationId, publicationId));
    if (res) {
      return new Response(
        JSON.stringify({
          message: "Eliminado de favoritos.",
          success: true,
        })
      );
    } else {
      throw new Error("Ocurrio un problema al eliminar la propiedad de favoritos.");
    }
  }
  

/*   if (favorite) {
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
 
 */

 
  try {

    const res = await db.insert(Favorites).values({
      userId: userId,
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
