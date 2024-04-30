import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { GitHub } from "arctic";
import { db, Session, User } from "astro:db";
import { Lucia } from "lucia";
import { TimeSpan } from "oslo";
const adapter = new DrizzleSQLiteAdapter(db as any, Session, User); // your adapter

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, "d"),
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: import.meta.env.PROD,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      githubId: attributes.github_id,
      email: attributes.email,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      phone: attributes.phone,
      phoneAlternative: attributes.phoneAlternative,
      street: attributes.street,
      addressNumber: attributes.addressNumber,
      location: attributes.location,
    };
  },
});

export const github = new GitHub(
  import.meta.env.GITHUB_CLIENT_ID,
  import.meta.env.GITHUB_CLIENT_SECRET
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
interface DatabaseUserAttributes {
  github_id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  phoneAlternative: string;
  street: string;
  addressNumber: string;
  location: string;
}
