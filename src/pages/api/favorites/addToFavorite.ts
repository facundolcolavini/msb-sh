import type { APIRoute } from "astro";
import { Favorites, User, db, eq } from "astro:db";

export const POST: APIRoute = async ({ request ,cookies}) => {
  const data = await request.json();
  const { userId, publicationId, publicationSuc, isEntrepreneurshipPublic } = data;

  // Handler de los campos requeridos para el registro 
  if(userId === undefined || publicationId === undefined || publicationSuc === undefined || isEntrepreneurshipPublic === undefined){

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

  // Verificar si la propiedad ya esta en favoritos y que no se pueda agregar dos veces
  const favorite = (await db.select().from(Favorites).where(eq(Favorites.publicationId, publicationId))

  ).at(0);
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
  const user = (await db.select().from(User).where(eq(User.id, userId ))).at(0);
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
