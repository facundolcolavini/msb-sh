import {db,Favorites,UserT} from "astro:db";

/* import {db,insert} from "astro:db"; */

/* import { db,UserAuth,SessionAuth } from 'astro:db';
import { Session } from '../.astro/db-types';
 */
export default async function () {

  //Delete all records from the table and reset the auto incrementing primary key 

  // Seed your database with users here
   
   // await db.delete(Favorites)
   await db.delete(UserT)
    await db.insert(UserT).values({
      username: "admin",
      password: "admin",
      name: "admin",
      lastName: "admin",
      email: "admin@admin.com",
      phone: "123456789",
      alternativePhone: "123456789",
      creationDate: Date.now(),
      lastUpdate: Date.now(),
    })

}   