import * as v from 'valibot';
import { _nanoid } from './helpers.ts';

export const user = v.object({
	id: v.pipe(v.string(), v.length(15)),
	username: v.pipe(
		v.string(),
		v.minLength(1, 'Please enter your username'),
		v.toLowerCase(),
	),
	password: v.pipe(
		v.string(),
		v.minLength(1, 'Please enter your password'),
		v.minLength(8, 'Passwords must contain at least 8 characters'),
	),
});

export type User = v.InferInput<typeof user>;

export const song = v.object({
	id: v.pipe(v.string(), _nanoid()),
	title: v.pipe(
		v.string(),
		v.minLength(1, 'This field is required'),
	),
	// key: string([musical_key()]),
	content: v.pipe(
		v.string(),
		v.minLength(1, 'This field is required'),
	),
});

export type Song = v.InferInput<typeof song>;
