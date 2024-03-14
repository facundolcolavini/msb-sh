
import type { APIRoute } from 'astro';
import { Users, db } from 'astro:db';
import { insertUser } from 'src/models/users/insertUser';
import type { UserPost } from 'src/models/users/users';



// Astro API endpoint for user CRUD 

export const GET: APIRoute = async (ctx) => {


    /*   await db.insert(Users).values([
          { id: Math.floor(Math.random() * 1000000), name: 'John', lastName: 'Doe', password:'', email: 'john@doe.com' },
          { id: Math.floor(Math.random() * 1000000), name: 'Jane', lastName: 'Doe', password:'', email: 'jane@doe.com' },
      ]); */
    const users = await db.select().from(Users)

    return new Response(JSON.stringify(users), {
        headers: {
            'content-type': 'application/json',
        },
    });

};

export const POST: APIRoute = async ({ request }) => {
    const data: UserPost = await request.json();
    // si los datos son vacios no enviarlos 
    for (const item in data) {
        item.trim()
    }
    if (data.name.trim() === "" || data.email.trim() === "" || data.lastName.trim() === "" || data.password.trim() === "") {
        return new Response(

        )
    }
    try {

        const resDB = await insertUser(data)
        /* const res = await fetch('/api/users.json/', {
            method: 'POST',
            body: JSON.stringify(data)
        }) */
        return new Response(JSON.stringify({
            status: '302',
            message: 'Post Success',

        }), {
            headers: {
                'content-type': 'application/json',
            },
        });
       /*  if(resDB) */
    } catch (error: unknown) {
        const customError = error as { status?: number, message?: string };
        return new Response(
            JSON.stringify({
                status: customError.status,
                message: customError.message
            })
        );
    }
};

/* export const PUT: APIRoute = async (ctx) => {
    const { body } = ctx;
    const user = await db.update(body).from(Users);

    return new Response(JSON.stringify(user), {
        headers: {
            'content-type': 'application/json',
        },
    });
};
 */

/* export const DELETE: APIRoute = async (ctx) => {
    const { body } = ctx;
    const user = await db.delete().from(Users).where(body);

    return new Response(JSON.stringify(user), {
        headers: {
            'content-type': 'application/json',
        },
    });
}; */