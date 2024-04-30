
import type { APIContext, APIRoute } from "astro";
import { Favorites, User, and, db, eq } from "astro:db";

export const DELETE: APIRoute = async ({ params, request }: APIContext) => {
  const data = await request.json();
  const { ids } = data;
  const { id:userId } = params;

  // Handler de los campos requeridos para el registro 

  if (!ids) {
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
  const user = (await db.select().from(User).where(and(eq(User.id, userId!), eq(User.id, userId!))))[0];

  if (!userId || !user) {
    return new Response(
      JSON.stringify({
        message: "Por favor, inicia sesión o regístrate para eliminar la propiedad de favoritos.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  try {
 
    // if id is and array of ids  
    if (Array.isArray(ids)) {
      
        if(ids[0] === 'all') {
          // delete all favorites of user
          const res = await db.delete(Favorites).where(eq(Favorites.userId, userId));
          if (res) {
            return new Response(
              JSON.stringify({
                message: "Lista de favoritos eliminada!",
                success: true,
              })
            );
          } else {
            throw new Error("Ocurrio un problema al eliminar la propiedad de favoritos.");
          }
        }
      

      // BATCH and delete in all array of ids to avoid problems 
      const queries = [] as any;

      for (let i = 0; i < ids.length; i++) {
        queries.push(db.delete(Favorites).where(and(eq(Favorites.publicationId, ids[i]), eq(Favorites.userId, userId))));
      }

      await db.batch(queries);

      return new Response(
        JSON.stringify({
          message: "Eliminados de favoritos.",
          success: true,
        })
      );
    } else {
      // Remover la propiedad de favoritos para el usuario 
      const res = await db.delete(Favorites).where(and(eq(Favorites.publicationId, ids), eq(Favorites.userId, userId)));

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


  } catch (e) {

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
}

// GET FAVORITE 
export const GET: APIRoute = async ({ params }: APIContext) => {

  // parsear los search params para obtener el id de la publicacion 

  const { id: userId } = params
  /*   const data = await request.json();
    const { publicationId,publicationSuc } = data; */

  const favoritesUser: {
    id: string;
    title: string;
    image: string;
  }[] = [];
  // Consultamos los favoritos de un usuario en particula y devolvemos sus favoritos
  const favorites = await db
    .select()
    .from(Favorites)
    .where(
      eq(Favorites.userId, userId || ''), // Ensure userId is not undefined
    );

  // Una vez teniendo los ids lo consultamos a la api de xintel 
  /*   for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].isEntrepreneurshipPublic) {
        // Fetchea al endpoint de emprendimientos y lo une a mi array de favoritos
        const data = await fetchData<APIResponseDetailEntrepreneurShip>('resultados.emprendimientos',
          {
            ed_idl: favorites[i].publicationId,
          })
  
        favoritesUser.push(
          {
            id: data.resultado.emprendimiento[0].ed_idl,
            title: capitalize(data.resultado.emprendimiento[0].titulo),
            image: data.resultado.emprendimiento[0].img_princ
          }
        )
      } else {
        // Obtiene la propiedad del endpoint de propiedades y la une a mi array de favoritos 
        const data = await fetchData<APIResponsePropertyDetail>('fichas.propiedades', {
          id: favorites[i].publicationId,
          suc: favorites[i].publicationSuc,
        }) 
       
        favoritesUser.push({
          id: data.resultado.ficha[0].in_fic,
          title: capitalize(he.decode(`${data.resultado.ficha[0].in_cal} ${data.resultado.ficha[0].in_nro} - ${data.resultado.ficha[0].in_tip} en ${data.resultado.ficha[0].in_loc} ${data.resultado.ficha[0].in_bar}`)),
          image: data.resultado?.ficha[0].img_princ
        
        })
      }
    } */

  // Reducimos la data para que solo devuelva los campos que necesitamos  y eliminamos los null 



  return new Response(
    JSON.stringify({
      message: "Favoritos",
      success: true,
      data: favorites
    })
  );
}

// GET FAVORITE BY ID Y SUC 

