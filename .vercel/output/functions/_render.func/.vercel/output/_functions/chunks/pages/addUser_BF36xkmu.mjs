import { createLocalDatabaseClient, asDrizzleTable, seedLocal } from '@astrojs/db/runtime';
import '@astrojs/db/dist/runtime/config.js';
import sanitize from 'sanitize-html';

const dbUrl$1 = "file:///F:/Mis%20cosas/Programacion/msb-sh/.astro/content.db";
const db$1 = createLocalDatabaseClient({ dbUrl: dbUrl$1 });

const Users$1 = asDrizzleTable("Users", {"columns":{"id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"id","collection":"Users","primaryKey":true}},"name":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"name","collection":"Users","primaryKey":false,"optional":false}},"lastName":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"lastName","collection":"Users","primaryKey":false,"optional":false}},"email":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"email","collection":"Users","primaryKey":false,"optional":false}},"password":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"password","collection":"Users","primaryKey":false,"optional":false}}},"deprecated":false}, false);

async function seed() {
  await db$1.insert(Users$1).values([
    { id: Math.floor(Math.random() * 1e6), name: "John", lastName: "Doe", password: "", email: "john@doe.com" },
    { id: Math.floor(Math.random() * 1e6), name: "Jane", lastName: "Doe", password: "", email: "jane@doe.com" }
  ]);
}

const __vite_glob_0_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: seed
}, Symbol.toStringTag, { value: 'Module' }));

const dbUrl = "file:///F:/Mis%20cosas/Programacion/msb-sh/.astro/content.db";
const db = createLocalDatabaseClient({ dbUrl });

await seedLocal({
	db,
	tables: {"Users":{"columns":{"id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"id","collection":"Users","primaryKey":true}},"name":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"name","collection":"Users","primaryKey":false,"optional":false}},"lastName":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"lastName","collection":"Users","primaryKey":false,"optional":false}},"email":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"email","collection":"Users","primaryKey":false,"optional":false}},"password":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"password","collection":"Users","primaryKey":false,"optional":false}}},"deprecated":false}},
	userSeedGlob: /* #__PURE__ */ Object.assign({"/db/seed.ts": __vite_glob_0_0}),
	integrationSeedFunctions: [],
});

const Users = asDrizzleTable("Users", {"columns":{"id":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"id","collection":"Users","primaryKey":true}},"name":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"name","collection":"Users","primaryKey":false,"optional":false}},"lastName":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"lastName","collection":"Users","primaryKey":false,"optional":false}},"email":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"email","collection":"Users","primaryKey":false,"optional":false}},"password":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"password","collection":"Users","primaryKey":false,"optional":false}}},"deprecated":false}, false);

const POST = async ({ request }) => {
  const data = await request.json();
  try {
    const { name, lastName, email, password } = data;
    if (!name || !lastName || !email || !password) {
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
    const res = await db.insert(Users).values({
      name: sanitize(name),
      lastName: sanitize(lastName),
      password: sanitize(password),
      email: sanitize(email)
    });
    if (res) {
      return new Response(
        JSON.stringify({
          message: "success",
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

const addUser_json = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

export { Users as U, addUser_json as a, db as d };
