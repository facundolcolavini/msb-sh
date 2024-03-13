
import type { APIRoute, APIContext } from 'astro';
import { Users, db } from 'astro:db';

// Astro API endpoint for user CRUD 

export const GET: APIRoute = async (ctx: APIContext<Record<string, any>, Record<string, string | undefined>>) => {
    const users = await db.select().from(Users);
    //  devuelve los usuarios de la tabla Users
    if (users) {
        return new Response(JSON.stringify(users), {
            headers: {
                'content-type': 'application/json',
            },
        });
    }
    return new Response(undefined); // Return a default response if users is undefined
};
