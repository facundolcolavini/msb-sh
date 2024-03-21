import {db,Favorites,User} from "astro:db";

/* import {db,insert} from "astro:db"; */

/* import { db,UserAuth,SessionAuth } from 'astro:db';
import { Session } from '../.astro/db-types';
 */
export default async function () {

  //Delete all records from the table and reset the auto incrementing primary key 

  // Seed your database with users here
   
   await db.delete(Favorites) 
   await db.delete(User)

}   