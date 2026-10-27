import { verifyToken } from '#lib/server/session.ts';
import type { Handle } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.isAdmin = verifyToken(event.cookies.get('session'));

	return resolve(event);
};
