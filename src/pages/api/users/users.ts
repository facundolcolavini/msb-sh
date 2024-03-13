
import type { APIRoute } from 'astro';
import { Users, db } from 'astro:db';



// Astro API endpoint for user CRUD 

export const GET: APIRoute = async (ctx) => {


/*     await db.insert(Users).values([
        { id: Math.floor(Math.random() * 1000000), name: 'John', lastName: 'Doe', password:'', email: 'john@doe.com' },
        { id: Math.floor(Math.random() * 1000000), name: 'Jane', lastName: 'Doe', password:'', email: 'jane@doe.com' },
    ]); */
            const users = await db.select().from(Users)
            //  devuelve los usuarios de la tabla Users
        if(users){
            return new Response(JSON.stringify( users ), {
                headers: {
                    'content-type': 'application/json',
                },
            });
 
   
        }
};
 
/* export const POST: APIRoute = async (ctx) => {
    const { body } = ctx;
    const user = await db.insert(body).into(Users);

    return new Response(JSON.stringify( user ), {
        headers: {
            'content-type': 'application/json',
        },
    });
}; 

export const PUT: APIRoute = async (ctx) => {
    const { body } = ctx;
    const user = await db.update(body).from(Users);

    return new Response(JSON.stringify( user ), {
        headers: {
            'content-type': 'application/json',
        },
    });
};

export const DELETE: APIRoute = async (ctx) => {
    const { body } = ctx;
    const user = await db.delete().from(Users).where(body);

    return new Response(JSON.stringify( user ), {
        headers: {
            'content-type': 'application/json',
        },
    });
}; */