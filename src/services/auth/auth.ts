import { safeParse } from 'valibot';

import * as lib from '../db/user.ts';
import { HttpError, status } from '../../../lib/http-error/index.ts';

export type { User } from '../db/user.ts';

export async function verify(email: string, password: string) {
	const user = await lib.findByEmail(email);
	if (!user) return false;

	return await Bun.password.verify(password, user.password);
}

export function validate(email: unknown, password: unknown) {
	return safeParse(lib.inputSchema, { email, password });
}

export async function create(email: string, password: string) {
	const user = await lib.findByEmail(email);
	if (user) {
		throw new HttpError(status.STATUS_CODE.Unauthorized, 'Invalid email or password');
	}

	return await lib.insert({
		email,
		password: await Bun.password.hash(password),
	});
}
