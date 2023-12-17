import { string, email, type Input, object, minValue, date } from 'valibot';
import { _nanoid } from './helpers.ts';

export const user = object({
	id: string([_nanoid()]),
	email: string([email()]),
	/** Hashed password */
	password: string(),
});

export type User = Input<typeof user>;

export const session = object({
	id: string([_nanoid()]),
	userId: string([_nanoid()]),
	expiry: date([minValue(new Date())]),
});

export type Session = Input<typeof session>;
