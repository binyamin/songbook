import { ADMIN_PASSWORD_HASH, ADMIN_PASSWORD_SALT } from '$app/env/private';
import { scryptSync, timingSafeEqual } from 'node:crypto';

export function verify(pw: string) {
	const hash = scryptSync(
		pw,
		Buffer.from(ADMIN_PASSWORD_SALT, 'hex'),
		64,
	);

	const expected = Buffer.from(ADMIN_PASSWORD_HASH, 'hex');

	return hash.length === expected.length && timingSafeEqual(hash, expected);
}
