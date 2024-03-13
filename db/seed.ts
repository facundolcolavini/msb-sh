import { db, Users } from 'astro:db';

export default async function() {
    // Seed your database with users here
  await db.insert(Users).values([
    { id: 1, name: 'John', lastName: 'Doe', password:'', email: 'doe@example.com' },
    { id: 2, name: 'Jane', lastName: 'Doe', password:'',email: 'doe@example.com' },
  ])


}   