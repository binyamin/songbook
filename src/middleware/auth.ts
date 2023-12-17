import { createMiddleware } from 'hono/factory';
import * as lib from '../services/db/index.ts';
import * as auth from '../services/auth/index.ts';
import { HttpError, status } from '../../lib/http-error/index.ts';

declare module 'hono' {
	interface ContextVariableMap {
		user?: auth.User;
	}
}

export const user = createMiddleware(async (c, next) => {
	const res = await auth.verifySession(c.req.header("Cookie") ?? '');

	if (res) {
		if (res.cookie) c.header("Set-Cookie", res.cookie.serialize());

		const user = await lib.user.find(res.session.userId) as lib.user.User;

		c.set('user', user);
	}

	return next();
});

export const protect = createMiddleware(async (c, next) => {
	if (!c.get('user')) {
		throw new HttpError(status.STATUS_CODE.Unauthorized, 'You must log in to view this page');
	}

	return next();
});
