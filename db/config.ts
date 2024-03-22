import { column, defineDb, defineTable } from 'astro:db';

export interface DatabaseUser {
	id: number;
	username: string;
	password: string;
}

/* 
// Auth Tables
const User = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		username: column.text({ unique: true}),
		password: column.text({  }),
	},
});

const Session = defineTable({
	deprecated: true,
	columns: {
		id: column.text({ primaryKey: true }),
		userId: column.text({ }),
	},
}); 

*/

const UserT = defineTable({
	columns: {
		id: column.number({ primaryKey: true,optional: false, autoIncrement: true}),
		username: column.text({ unique: true }),
		password: column.text({ optional: false }),
		name: column.text({ optional: false }),
		lastName: column.text({ optional: false }),
		email: column.text({ unique: true, required: false }),
		phone: column.text({ optional: true }),
		alternativePhone: column.text({ optional: true }),
		creationDate: column.number(),
		lastUpdate: column.number(),
	},
});
// Relacion de un usuarios a muchos Favoritos
// Favorite 
const Favorite = defineTable({
	columns: {
		id: column.number({ primaryKey: true,optional:false, autoIncrement: true}),
		userId: column.number(
			{
				// Referencia al usuario  que tiene el favorito
				references: () => UserT.columns.id
			}
		),
		publicationId: column.text(),
		publicationSuc: column.text(),
		isEntrepreneurshipPublic: column.boolean(),
	},
});
/* const History = defineTable({
	id: column.text({ primaryKey: true }),

}) */
export default defineDb({
	tables: {
		UserT,
		Favorite,
	},
})