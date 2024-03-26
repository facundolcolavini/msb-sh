import { d as db, U as UserTAuth } from './_id__BW89SIC6.mjs';
import bcrypt from 'bcrypt';
import sanitize from 'sanitize-html';

const POST = async ({ request }) => {
  const data = await request.json();
  try {
    const { firstName, lastName, email, password, username } = data;
    if (!firstName || !lastName || !email || !password || !username) {
      return new Response(
        JSON.stringify({
          message: `${!username ? "username, " : ""}${!firstName ? "name, " : ""}${!lastName ? "lastName, " : ""}${!email ? "email, " : ""}${!password ? "password, " : ""} son campos requeridos.`,
          success: false
        }),
        {
          status: 404
        }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sanitize(password), salt);
    const res = await db.insert(UserTAuth).values({
      username: sanitize(username),
      firstName: sanitize(firstName),
      lastName: sanitize(lastName),
      password: hashedPassword,
      email: sanitize(email),
      phone: sanitize(data.phone),
      alternativePhone: sanitize(data.alternativePhone),
      creationDate: Date.now(),
      lastUpdate: Date.now()
    });
    if (res) {
      return new Response(
        JSON.stringify({
          message: "User created",
          data: res,
          success: true
        }),
        {
          status: 200
        }
      );
    } else {
      throw new Error("There was a problem with the db response.");
    }
  } catch (e) {
    console.error(e.message);
    return new Response(
      JSON.stringify({
        message: e,
        success: false
      }),
      {
        status: 404
      }
    );
  }
};

export { POST };
