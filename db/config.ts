import { defineTable, column, defineDb } from 'astro:db';
const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    lastName: column.text(),
    email: column.text(),
    password: column.text(),
  }
});

export default defineDb({
  tables: {  Users },
})