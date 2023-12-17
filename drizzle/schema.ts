import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	email: text('email').unique().notNull(),
	/** Hashed password */
	password: text('password').notNull(),
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => user.id),
	expiry: integer('expiry', { mode: 'timestamp_ms' }).notNull(),
});
