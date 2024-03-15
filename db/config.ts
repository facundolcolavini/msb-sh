import { defineTable, column, defineDb } from 'astro:db';

const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true}),
    name: column.text({required: true}),
    lastName: column.text({required: true}),
    email: column.text({unique: true , required: true}),
    password: column.text({required: true}),
    phone: column.text({ optional: true }),
    alternativePhone: column.text({ optional: true }),
    creationDate: column.number({
      default: Date.now()
    }), 
    lastUpdate: column.number({
      default:Date.now()
    }),
  }
});

export default defineDb({
  tables: {  Users },
})