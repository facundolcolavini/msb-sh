
import type { APIRoute } from 'astro';
import { Users, db } from 'astro:db';


// Astro API endpoint for user CRUD 

export const GET: APIRoute = async (ctx) => {


            await db.insert(Users).values([
                { id: 5, name: 'John', lastName: 'Doe', password:'', email: ' john@ doe.com' },
                { id: 6, name: 'Jane', lastName: 'Doe', password:'',email: ' jane@ doe.com' },
            ]);
              await db.select().from(Users);
    
                return new Response(JSON.stringify( 'OK SEED' ), {
                    headers: {
                        'content-type': 'application/json',
                    },
    });

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