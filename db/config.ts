import { column, defineDb, defineTable } from 'astro:db';

export interface DatabaseUser {
	id: number;
	username: string;
	password: string;
}
 

const UserTAuth = defineTable({

	columns: {
		id: column.number({ primaryKey: true,optional: false, autoIncrement: true}),
		username: column.text({ unique: true }),
		password: column.text({ optional: false }),
		firstName: column.text({ optional: false }),
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
				references: () => UserTAuth.columns.id
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
		UserTAuth,
		Favorite,

	},
})