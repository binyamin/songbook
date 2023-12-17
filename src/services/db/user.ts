import { eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot';
import { nanoid } from 'nanoid';
import { type Input, parse, required, omit } from 'valibot';

import { user as model } from './models.ts';
import { db, schema } from '../../../drizzle/index.ts';

const selectUser = createSelectSchema(schema.user, model.entries);
export type User = Input<typeof selectUser>;

export async function list(limit = 25, offset = 0): Promise<Omit<User, 'password'>[]> {
	const list = await db
		.select({
			id: schema.user.id,
			email: schema.user.email,
		})
		.from(schema.user)
		.limit(limit)
		.offset(offset)

	return list;
}

export async function find(id: string): Promise<User | null> {
	const res = await db
		.select()
		.from(schema.user)
		.limit(1)
		.where(eq(schema.user.id, id))

	return res[0] ?? null;
}

export async function findByEmail(email: string): Promise<User | null> {
	const res = await db
		.select()
		.from(schema.user)
		.limit(1)
		.where(eq(schema.user.email, email))

	return res[0] ?? null;
}

export const inputSchema = omit(createInsertSchema(schema.user, model.entries), ['id']);
export type InputValue = Input<typeof inputSchema>;

export async function insert(input: InputValue): Promise<User> {
	const data = parse(inputSchema, input);

	const res = await db
		.insert(schema.user)
		.values({ id: nanoid(), ...data, })
		.returning();

	return res[0];
}

export async function update(id: string, input: InputValue): Promise<User> {
	const _data = parse(required(inputSchema), input);

	const res = await db
		.update(schema.user)
		.set(input)
		.where(eq(schema.user.id, id))
		.returning();

	return res[0];
}

export async function remove(id: string): Promise<boolean> {
	const res = await db
		.delete(schema.user)
		.where(eq(schema.user.id, id))
		.returning();

	return res.length > 0;
}
