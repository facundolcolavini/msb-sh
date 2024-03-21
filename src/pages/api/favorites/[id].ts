
import type { APIResponsePropertyDetail } from "@interfaces/detail.properties.interface";
import type { APIResponseDetailEntrepreneurShip } from "@interfaces/entrepreneurship.interfaces";
import type { APIResponseResultsRecords } from "@interfaces/results.records.interfaces";
import { fetchData } from "@utils/fetch-data";
import type { APIContext, APIRoute } from "astro";
import { Favorite, UserT, and, db, eq } from "astro:db";
import { capitalize } from '../../../utils/formats';
import he from 'he';

export const DELETE: APIRoute = async ({ params, request }: APIContext) => {
  const data = await request.json();
  const { userId } = data;
  const { id } = params;
  // Handler de los campos requeridos para el registro 

  if (!id) {
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
  const user = (await db.select().from(UserT).where(eq(UserT.id, userId))).at(0);

  if (!userId || !user) {
    return new Response(
      JSON.stringify({
        message: "Por favor registrese para poder eliminar la propiedad de favoritos.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  try {
    // Remover la propiedad de favoritos para el usuario 
    const res = await db.delete(Favorite).where(and(eq(Favorite.publicationId, id), eq(Favorite.userId, userId)));
    console.log(res)

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
    titulo: string;
    image: string;
  }[] = []
  // Consultamos los favoritos de un usuario en particula y devolvemos sus favoritos
  const favorites = await db
    .select()
    .from(Favorite)
    .where(
      eq(Favorite.userId, userId),

    )

  console.log(favorites)

  // Una vez teniendo los ids lo consultamos a la api de xintel 
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].isEntrepreneurshipPublic) {
      // Fetchea al endpoint de emprendimientos y lo une a mi array de favoritos
      const data = await fetchData<APIResponseDetailEntrepreneurShip>('resultados.emprendimientos',
        {
          ed_idl: favorites[i].publicationId,
        })

      favoritesUser.push(
        {
          id: data.resultado.emprendimiento[0].ed_idl,
          titulo: capitalize(data.resultado.emprendimiento[0].titulo),
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
        titulo: capitalize(he.decode(`${data.resultado.ficha[0].in_cal} ${data.resultado.ficha[0].in_nro} - ${data.resultado.ficha[0].in_tip} en ${data.resultado.ficha[0].in_loc} ${data.resultado.ficha[0].in_bar}`)),
        image: data.resultado?.ficha[0].img_princ
      
      })
    }
  }

  // Reducimos la data para que solo devuelva los campos que necesitamos  y eliminamos los null 



  return new Response(
    JSON.stringify({
      message: "Favoritos",
      success: true,
      data: favoritesUser
    })
  );
}