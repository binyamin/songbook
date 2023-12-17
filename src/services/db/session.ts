import { eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot';
import { nanoid } from 'nanoid';
import { type Input, parse, required, omit } from 'valibot';

import { session as model } from './models.ts';
import { db, schema } from '../../../drizzle/index.ts';

const selectSession = createSelectSchema(schema.session, model.entries);
export type Session = Input<typeof selectSession>;

export async function find(id: string): Promise<Session | null> {
	const res = await db
		.select()
		.from(schema.session)
		.limit(1)
		.where(eq(schema.session.id, id))

	return res[0] ?? null;
}

export async function findByUser(userId: string): Promise<Session | null> {
	const res = await db
		.select()
		.from(schema.session)
		.limit(1)
		.where(eq(schema.session.userId, userId))

	return res[0] ?? null;
}

export const inputSchema = omit(createInsertSchema(schema.session, model.entries), ['id']);
export type InputValue = Input<typeof inputSchema>;

export async function insert(input: InputValue): Promise<Session> {
	const data = parse(inputSchema, input);

	const res = await db
		.insert(schema.session)
		.values({ id: nanoid(), ...data, })
		.returning();

	return res[0];
}

export async function update(id: string, input: InputValue): Promise<Session> {
	const _data = parse(required(inputSchema), input);

	const res = await db
		.update(schema.session)
		.set(input)
		.where(eq(schema.session.id, id))
		.returning();

	return res[0];
}

export async function remove(id: string): Promise<boolean> {
	const res = await db
		.delete(schema.session)
		.where(eq(schema.session.id, id))
		.returning();

	return res.length > 0;
}
