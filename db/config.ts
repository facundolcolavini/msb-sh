import { defineTable, column, defineDb } from 'astro:db';

export interface DatabaseUser {
	id: number;
	username: string;
	password: string;
}

const User = defineTable({
	name: 'User',
	columns: {
		id: column.text({ primaryKey: true }),
		username: column.text(),
		password: column.text(),
	},
});

const Session = defineTable({
  name: 'Session',
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text(),
  },
});
export default defineDb({
  tables: { User,Session },
})