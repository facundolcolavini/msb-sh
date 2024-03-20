import { column, defineDb, defineTable } from 'astro:db';

export interface DatabaseUser {
	id: number;
	username: string;
	password: string;
}

const UserT = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		username: column.text({ unique: true}),
		password: column.text({  }),
	},
});

const SessionT = defineTable({
	deprecated: true,
	columns: {
		id: column.text({ primaryKey: true }),
		userId: column.text({ }),
	},
});
export default defineDb({
	tables: { UserT, SessionT },
})