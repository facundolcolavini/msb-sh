// pages/api/signup.ts
import { lucia } from "@lib/auth";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

import type { APIContext } from "astro";
import { User, db } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
	const data = await context.request.json();

	const username = data.username
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return new Response("Invalid username", {
			status: 400
		});
	}
	const password = data.password
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return new Response("Invalid password", {
			status: 400
		});
	}

	const userId = generateId(15);
	const hashedPassword = await new Argon2id().hash(password);

	// TODO: check if username is already used
	

	await db.insert(User).values({
		id: userId,
		username: username,
		password: hashedPassword
	});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	console.log(session)
	console.log(sessionCookie)
	return  new Response("OK", {
		status: 200
	});
}