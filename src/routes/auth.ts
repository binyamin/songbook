import { Hono } from 'hono';
import { validator } from 'hono/validator';

import { protect, user } from '../middleware/auth.ts';
import { views } from '../middleware/render.ts';
import * as auth from '../services/auth/index.ts';
import * as db from '../services/db/index.ts';
import { HttpError, status } from '../../lib/http-error/index.ts';

const loginValidator = validator('form', (value) => {
	const res = auth.validate(value.email, value.password);

	if (res.success) {
		return res.output;
	} else {
		throw new HttpError(status.STATUS_CODE.UnprocessableEntity, 'Ill-formed credentials');
	}
});

const app = new Hono()
	.use('*', views, user)
	.get('/', protect, (c) => c.render())
	.get('/login', (c) => c.render())
	.post('/login', loginValidator, async (c) => {
		const { email, password } = c.req.valid('form');
		const res = await auth.verify(email, password);
		if (!res) {
			throw new HttpError(status.STATUS_CODE.Unauthorized, 'Invalid credentials');
		}

		const user = (await db.user.findByEmail(email))!;
		c.set('user', user);

		// Create Session
		const cookie = await auth.createSession(user.id);
		c.header("Set-Cookie", cookie.serialize());

		// TODO respond appropriately
		return c.text('Success: Logged in', 200);
	})
	.post('/logout', protect, async (c) => {
		const cookie = await auth.deleteSession(c.req.header("Cookie") ?? '');
		c.header("Set-Cookie", cookie.serialize());

		// TODO respond appropriately
		return c.text('Success: logged out', 200);
	})

export default app;
