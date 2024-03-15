import { eq } from "astro:dbg";
import { db, Users } from "astro:db";

type DeleteUser = typeof Users.$inferInsert;

 export  const  deleteUser =  (user: DeleteUser) => {
  return  db.delete().from(Users).where(eq(Users.id, user.id))
}

