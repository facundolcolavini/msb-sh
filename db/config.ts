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


const Sessions = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    token: column.text({ unique: true }), // token de la sesión
    userId: column.number({ references: () => Users.columns.id }), // referencia al usuario de la sesión
    expiresAt: column.number(), // fecha de expiración de la sesión
    isActive: column.boolean({ default: true }), // si la sesión está activa
    createdAt: column.number({ default: Date.now() }),  // datetime de creación de la sesión
  }
})

export default defineDb({
  tables: {  Users, Sessions },
})