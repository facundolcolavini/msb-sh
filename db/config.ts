import { defineDb, defineTable, column } from "astro:db";

// https://astro.build/db/config

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ unique: true, optional: false }),
    password: column.text({ optional: true }),
    github_id: column.text({ optional: true, unique: true }),
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }),
    userId: column.text({ optional: false, references: () => User.columns.id }),
    expiresAt: column.number({ optional: false }),
  },
});

const Favorites = defineTable({
	columns: {
		id: column.number({ primaryKey: true,optional:false, autoIncrement: true}),
		userId: column.text(
			{
				// Referencia al usuario  que tiene el favorito
				references: () => User.columns.id
			}
		),
		publicationId: column.text(),
		publicationSuc: column.text(),
		isEntrepreneurshipPublic: column.boolean(),
	},
});

export default defineDb({
  tables: {
    User,
    Session,
    Favorites
  },
});
