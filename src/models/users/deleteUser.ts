import { eq } from "astro:dbg";
import { db, Users } from "astro:db";

type DeleteUser = typeof Users.$inferInsert;

 export  const  deleteUser =  async(user: DeleteUser) => {
  return await db.delete().from(Users).where(eq(Users.id, user.id))
}

