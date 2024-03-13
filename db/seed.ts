import { db, Users } from 'astro:db';

export default async function () {

  //Delete all records from the table and reset the auto incrementing primary key 

  // Seed your database with users here
  await db.insert(Users).values([
    { id: Math.floor(Math.random() * 1000000), name: 'John', lastName: 'Doe', password:'', email: 'john@doe.com' },
    { id: Math.floor(Math.random() * 1000000), name: 'Jane', lastName: 'Doe', password:'', email: 'jane@doe.com' },
]);


}   