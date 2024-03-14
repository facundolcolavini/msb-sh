import type { SqliteDB } from "@astrojs/db/runtime";
import { db, Users } from "astro:db";

export type UpdateUser = typeof Users.$inferInsert;
export const updateUser = async (user: UpdateUser) => {
    return await db.update(Users).set(user).where({ id: user?.id });
}