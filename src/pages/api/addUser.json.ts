
import type { APIRoute } from 'astro';
import { User, db } from 'astro:db';
import bcrypt from 'bcrypt';
import sanitize from "sanitize-html";



export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();

    try {
        const { name, lastName, email, password, username } = data;

        // Handler de los campos requeridos para el registro 
        if (!name || !lastName || !email || !password || !username) {
            return new Response(
                JSON.stringify({
                    message: `${!username ? "username, " : ""}${!name ? "name, " : ""}${!lastName ? "lastName, " : ""}${!email ? "email, " : ""}${!password ? "password, " : ""} son campos requeridos.`,
                    success: false,
                }),
                {
                    status: 404,
                }
            );
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(sanitize(password), salt);


        const res = await db.insert(User).values({
            username: sanitize(username),
            name: sanitize(name),
            lastName: sanitize(lastName),
            password: hashedPassword,
            email: sanitize(email),
            phone: sanitize(data.phone),
            alternativePhone: sanitize(data.alternativePhone),
            creationDate: Date.now(),
            lastUpdate: Date.now(),
        });

        if (res) {
            return new Response(
                JSON.stringify({
                    message: "User created",
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