import { db, Users } from "astro:db";

type NewUser = typeof Users.$inferInsert;

 export  const  insertUser = async (user: NewUser) => {
  return await db.insert(Users).values(user);
}

