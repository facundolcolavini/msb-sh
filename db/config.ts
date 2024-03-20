import { column, defineDb, defineTable } from 'astro:db';

export interface DatabaseUser {
	id: number;
	username: string;
	password: string;
}

const UserT = defineTable({
	columns: {
		id: column.text({ primaryKey: true, deprecated: true }),
		username: column.text({ unique: true, deprecated: true }),
		password: column.text({ deprecated: true }),
	},
});

const SessionT = defineTable({
	deprecated: true,
	columns: {
		id: column.text({ primaryKey: true, deprecated: true }),
		userId: column.text({ deprecated: true }),
	},
});
export default defineDb({
	tables: { UserT, SessionT },
})