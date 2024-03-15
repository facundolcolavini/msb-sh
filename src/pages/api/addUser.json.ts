
import type { APIRoute } from 'astro';
import { Users, db } from 'astro:db';
import sanitize from "sanitize-html";



export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();

    try {
        const { name, lastName, email, password } = data;

       // Handler de los campos requeridos para el registro 
        if (!name || !lastName || !email || !password) {
            return new Response(
                JSON.stringify({
                    message: `${!name ? "name, " : ""}${!lastName ? "lastName, " : ""}${!email ? "email, " : ""}${!password ? "password, " : ""} son campos requeridos.`,
                    success: false,
                }),
                {
                    status: 404,
                }
            );
        }

        const res = await db.insert(Users).values({
            name: sanitize(name),
            lastName: sanitize(lastName),
            password: sanitize(password),
            email: sanitize(email),
            phone: sanitize(data.phone),
            alternativePhone: sanitize(data.alternativePhone),
            creationDate: Date.now(),
            lastUpdate: Date.now(),
        });

        if (res) {
            return new Response(
                JSON.stringify({
                    message: "success",
                    data: res,
                    success: true,
                }),
                {
                    status: 200,
                }
            );
        } else {
            throw new Error("There was a problem with the db response.");
        }
    } catch (e) {
        console.error(e);
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
};