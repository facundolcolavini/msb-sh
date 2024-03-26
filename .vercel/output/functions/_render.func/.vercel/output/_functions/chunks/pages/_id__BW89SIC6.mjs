import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import { eq } from '@astrojs/db/dist/runtime/config.js';
import bcrypt from 'bcrypt';
import sanitize from 'sanitize-html';

const db = await createRemoteDatabaseClient("8278a9268cd61e2176d3e5af0b98807e45ac1676:mgmycueeazl8u7iwhk1s5q16dbw4:mgmycueeazl8u7iwhk1s5q16dbw4", {"PUBLIC_GOOGLE_MAPS_API_KEY": "AIzaSyC-ogGcelbNV0lstR2iFzBgdhXvRmzxvBI", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.ASTRO_STUDIO_REMOTE_DB_URL ?? "https://db.services.astro.build");
const UserTAuth = asDrizzleTable("UserTAuth", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "UserTAuth", "primaryKey": true, "optional": false } }, "username": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "username", "collection": "UserTAuth", "primaryKey": false, "optional": false } }, "password": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "password", "collection": "UserTAuth", "primaryKey": false, "optional": false } }, "firstName": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "firstName", "collection": "UserTAuth", "primaryKey": false, "optional": false } }, "lastName": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "lastName", "collection": "UserTAuth", "primaryKey": false, "optional": false } }, "email": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "email", "collection": "UserTAuth", "primaryKey": false, "optional": false } }, "phone": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "phone", "collection": "UserTAuth", "primaryKey": false, "optional": true } }, "alternativePhone": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "alternativePhone", "collection": "UserTAuth", "primaryKey": false, "optional": true } }, "creationDate": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "creationDate", "collection": "UserTAuth", "primaryKey": false, "optional": false } }, "lastUpdate": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "lastUpdate", "collection": "UserTAuth", "primaryKey": false, "optional": false } } }, "deprecated": false }, false);
const Favorite = asDrizzleTable("Favorite", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Favorite", "primaryKey": true, "optional": false } }, "userId": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "userId", "collection": "Favorite", "primaryKey": false, "optional": false, "references": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "UserTAuth", "primaryKey": true, "optional": false } } } }, "publicationId": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "publicationId", "collection": "Favorite", "primaryKey": false, "optional": false } }, "publicationSuc": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "publicationSuc", "collection": "Favorite", "primaryKey": false, "optional": false } }, "isEntrepreneurshipPublic": { "type": "boolean", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "isEntrepreneurshipPublic", "collection": "Favorite" } } }, "deprecated": false }, false);

const DELETE = async ({ params }) => {
  const id = Number(params.id);
  if (!id) {
    return new Response(
      JSON.stringify({
        message: "Please provide all required fields.",
        success: false
      }),
      {
        status: 404
      }
    );
  }
  try {
    const res = await db.delete(UserTAuth).where(eq(UserTAuth.id, id));
    if (res) {
      return new Response(null, { status: 204 });
    } else {
      throw new Error("prob, bob");
    }
  } catch (e) {
    console.error(e);
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
const PATCH = async ({ params, request }) => {
  const { name, lastName, password, email, phone, alternativePhone } = await request.json();
  const id = Number(params.id);
  let newPassword;
  if (!name || !lastName || !email || !password) {
    return new Response(
      JSON.stringify({
        message: `${!name ? "name, " : ""}${!lastName ? "lastName, " : ""}${!email ? "email, " : ""}${!password ? "password, " : ""} son campos requeridos.`,
        success: false
      }),
      {
        status: 404
      }
    );
  }
  if (!id) {
    return new Response(
      JSON.stringify({
        message: "Please provide all required fields.",
        success: false
      }),
      {
        status: 404
      }
    );
  }
  try {
    const user = await db.select().from(UserTAuth).where(eq(UserTAuth.id, id));
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(sanitize(password), salt);
    } else {
      newPassword = user[0].password;
    }
    const res = await db.update(UserTAuth).set({
      name,
      lastName,
      password: newPassword,
      email,
      phone,
      alternativePhone,
      lastUpdate: Date.now()
    }).where(eq(UserTAuth.id, id));
    if (res) {
      return new Response(
        JSON.stringify({
          message: "success",
          success: true
        })
      );
    } else {
      throw new Error("prob, bob");
    }
  } catch (e) {
    console.error(e);
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
const GET = async ({ params }) => {
  const id = Number(params.id);
  if (!id) {
    return new Response(
      JSON.stringify({
        message: "Please provide all required fields.",
        success: false
      }),
      {
        status: 404
      }
    );
  }
  try {
    const res = await db.select().from(UserTAuth).where(eq(UserTAuth.id, id));
    if (res) {
      return new Response(JSON.stringify(res), {
        headers: { "content-type": "application/json" }
      });
    } else {
      throw new Error("prob, bob");
    }
  } catch (e) {
    console.error(e);
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

const _id__json = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	DELETE,
	GET,
	PATCH
}, Symbol.toStringTag, { value: 'Module' }));

export { Favorite as F, UserTAuth as U, _id__json as _, db as d };
