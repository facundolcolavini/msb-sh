
import { AstroDBAdapter } from "lucia-adapter-astrodb";
import { db, SessionT, UserT } from "astro:db";
import { Lucia } from "lucia";
import type { DatabaseUser } from '../../db/config';
 

const adapter = new AstroDBAdapter(db, SessionT, UserT);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: import.meta.env.PROD
        }
    },
    getUserAttributes: (databaseUserAttributes: { username: string }) => {
        return {
            username: databaseUserAttributes.username
        };
    }
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<DatabaseUser, "id">;
	}
}